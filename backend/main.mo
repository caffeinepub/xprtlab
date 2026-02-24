import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";


// Apply migration for persistent state changes

actor {
  // Application-level role stored in user profile (informational, for UI routing)
  public type AppRole = {
    #patient;
    #phlebotomist;
    #labAdmin;
    #superAdmin;
  };

  public type UserProfile = {
    name : Text;
    appRole : AppRole;
    phone : Text;
  };

  type Test = {
    id : Text;
    name : Text;
    description : Text;
    price : Nat;
  };

  type Booking = {
    id : Text;
    patient : Principal;
    tests : [Test];
    slot : Text;
    status : { #pending; #confirmed; #completed; #canceled };
    timestamp : Int;
  };

  type HomeCollectionRequest = {
    id : Text;
    patient : Principal;
    address : Text;
    latitude : ?Float;
    longitude : ?Float;
    tests : [Test];
    slot : Text;
    assignedPhlebotomist : ?Principal;
    status : { #requested; #assigned; #completed; #canceled };
    timestamp : Int;
  };

  type Report = {
    id : Text;
    patient : Principal;
    bookingId : Text;
    file : Storage.ExternalBlob;
    uploadedBy : Principal;
    timestamp : Int;
  };

  type BPReading = {
    systolic : Nat;
    diastolic : Nat;
    pulse : Nat;
    timestamp : Int;
  };

  type RBSTest = {
    glucoseLevel : Nat;
    timestamp : Int;
  };

  type AuditLog = {
    actorId : Principal;
    actionType : Text;
    targetDocument : Text;
    timestamp : Int;
  };

  type Incident = {
    id : Text;
    reporter : Principal;
    description : Text;
    severity : { #low; #medium; #high };
    photo : ?Storage.ExternalBlob;
    timestamp : Int;
  };

  include MixinStorage();

  // Initialize the access control state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let userProfiles = Map.empty<Principal, UserProfile>();
  let tests = Map.empty<Text, Test>();
  let bookings = Map.empty<Text, Booking>();
  let homeCollectionRequests = Map.empty<Text, HomeCollectionRequest>();
  let reports = Map.empty<Text, Report>();
  let bpReadings = Map.empty<Text, [BPReading]>();
  let rbsReadings = Map.empty<Text, [RBSTest]>();
  let incidents = Map.empty<Text, Incident>();
  let auditLogs = Map.empty<Int, AuditLog>();

  // ── User Profile ──────────────────────────────────────────────────────────

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get their profile");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
    addAuditLog(caller, "SaveUserProfile", caller.toText());
  };

  // ── Tests ─────────────────────────────────────────────────────────────────

  /// Admin-only: create a diagnostic test entry
  public shared ({ caller }) func createTest(id : Text, name : Text, description : Text, price : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create tests");
    };
    if (tests.containsKey(id)) {
      Runtime.trap("Test with this ID already exists");
    };
    let test : Test = { id; name; description; price };
    tests.add(id, test);
    addAuditLog(caller, "CreateTest", id);
  };

  /// Public: any caller (including guests) can browse available tests
  public query func getTest(id : Text) : async Test {
    switch (tests.get(id)) {
      case (null) { Runtime.trap("Test not found") };
      case (?test) { test };
    };
  };

  /// Public: any caller (including guests) can list all available tests
  public query func getAllTests() : async [Test] {
    tests.values().toArray();
  };

  /// Admin-only: remove a diagnostic test
  public shared ({ caller }) func deleteTest(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete tests");
    };
    if (not tests.containsKey(id)) {
      Runtime.trap("Test not found");
    };
    tests.remove(id);
    addAuditLog(caller, "DeleteTest", id);
  };

  // ── Bookings ──────────────────────────────────────────────────────────────

  /// Registered users (patients) can create bookings
  public shared ({ caller }) func createBooking(id : Text, selectedTests : [Test], slot : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only registered users can create bookings");
    };
    let booking : Booking = {
      id;
      patient = caller;
      tests = selectedTests;
      slot;
      status = #pending;
      timestamp = Time.now();
    };
    bookings.add(id, booking);
    addAuditLog(caller, "CreateBooking", id);
  };

  /// Admin-only: update booking status
  public shared ({ caller }) func updateBookingStatus(id : Text, status : { #pending; #confirmed; #completed; #canceled }) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update booking status");
    };
    switch (bookings.get(id)) {
      case (null) { Runtime.trap("Booking not found") };
      case (?booking) {
        let updatedBooking : Booking = { booking with status };
        bookings.add(id, updatedBooking);
        addAuditLog(caller, "UpdateBookingStatus", id);
      };
    };
  };

  /// Registered users can view their own bookings; admins can view all
  public query ({ caller }) func getMyBookings() : async [Booking] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only registered users can view bookings");
    };
    let all = bookings.values().toArray();
    all.filter(func(b : Booking) : Bool { b.patient == caller });
  };

  /// Admin-only: view all bookings
  public query ({ caller }) func getAllBookings() : async [Booking] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all bookings");
    };
    bookings.values().toArray();
  };

  // ── Home Collection ───────────────────────────────────────────────────────

  /// Registered users (patients) can request home collection
  public shared ({ caller }) func createHomeCollectionRequest(
    id : Text,
    address : Text,
    latitude : ?Float,
    longitude : ?Float,
    selectedTests : [Test],
    slot : Text,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only registered users can request home collection");
    };
    let request : HomeCollectionRequest = {
      id;
      patient = caller;
      address;
      latitude;
      longitude;
      tests = selectedTests;
      slot;
      assignedPhlebotomist = null;
      status = #requested;
      timestamp = Time.now();
    };
    homeCollectionRequests.add(id, request);
    addAuditLog(caller, "CreateHomeCollectionRequest", id);
  };

  /// Admin-only: assign a phlebotomist to a home collection request
  public shared ({ caller }) func assignPhlebotomist(requestId : Text, phlebotomist : Principal) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can assign phlebotomists");
    };
    switch (homeCollectionRequests.get(requestId)) {
      case (null) { Runtime.trap("Home collection request not found") };
      case (?request) {
        let updatedRequest : HomeCollectionRequest = {
          request with
          assignedPhlebotomist = ?phlebotomist;
          status = #assigned;
        };
        homeCollectionRequests.add(requestId, updatedRequest);
        addAuditLog(caller, "AssignPhlebotomist", requestId);
      };
    };
  };

  /// Registered users can view their own home collection requests; admins see all
  public query ({ caller }) func getMyHomeCollectionRequests() : async [HomeCollectionRequest] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only registered users can view home collection requests");
    };
    let all = homeCollectionRequests.values().toArray();
    all.filter(func(r : HomeCollectionRequest) : Bool { r.patient == caller });
  };

  /// Admin-only: view all home collection requests
  public query ({ caller }) func getAllHomeCollectionRequests() : async [HomeCollectionRequest] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all home collection requests");
    };
    homeCollectionRequests.values().toArray();
  };

  /// Registered users can update the status of a home collection request they are assigned to or own
  public shared ({ caller }) func updateHomeCollectionStatus(requestId : Text, status : { #requested; #assigned; #completed; #canceled }) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only registered users can update home collection status");
    };
    switch (homeCollectionRequests.get(requestId)) {
      case (null) { Runtime.trap("Home collection request not found") };
      case (?request) {
        // Only the assigned phlebotomist, the patient, or an admin may update
        let isAssigned = switch (request.assignedPhlebotomist) {
          case (?p) { p == caller };
          case (null) { false };
        };
        let isOwner = request.patient == caller;
        let isAdminCaller = AccessControl.isAdmin(accessControlState, caller);
        if (not isAssigned and not isOwner and not isAdminCaller) {
          Runtime.trap("Unauthorized: You are not allowed to update this request");
        };
        let updatedRequest : HomeCollectionRequest = { request with status };
        homeCollectionRequests.add(requestId, updatedRequest);
        addAuditLog(caller, "UpdateHomeCollectionStatus", requestId);
      };
    };
  };

  // ── Reports ───────────────────────────────────────────────────────────────

  /// Admin-only: upload a PDF report linked to a booking
  public shared ({ caller }) func uploadReport(id : Text, patient : Principal, bookingId : Text, file : Storage.ExternalBlob) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can upload reports");
    };
    let report : Report = {
      id;
      patient;
      bookingId;
      file;
      uploadedBy = caller;
      timestamp = Time.now();
    };
    reports.add(id, report);
    addAuditLog(caller, "UploadReport", id);
  };

  /// Registered users can view their own reports; admins can view all
  public query ({ caller }) func getMyReports() : async [Report] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only registered users can view reports");
    };
    let all = reports.values().toArray();
    all.filter(func(r : Report) : Bool { r.patient == caller });
  };

  /// Admin-only: view all reports
  public query ({ caller }) func getAllReports() : async [Report] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all reports");
    };
    reports.values().toArray();
  };

  // ── BP / RBS Readings ─────────────────────────────────────────────────────

  /// Registered users (phlebotomists/lab staff) can record BP readings for a patient
  public shared ({ caller }) func recordBPReading(patientId : Principal, bookingId : Text, systolic : Nat, diastolic : Nat, pulse : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only registered users can record BP readings");
    };
    let reading : BPReading = {
      systolic;
      diastolic;
      pulse;
      timestamp = Time.now();
    };
    let key = patientId.toText() # ":" # bookingId;
    let existing = switch (bpReadings.get(key)) {
      case (null) { [] };
      case (?arr) { arr };
    };
    bpReadings.add(key, existing.concat([reading]));
    addAuditLog(caller, "RecordBPReading", patientId.toText());
  };

  /// Registered users (phlebotomists/lab staff) can record RBS readings for a patient
  public shared ({ caller }) func recordRBSReading(patientId : Principal, bookingId : Text, glucoseLevel : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only registered users can record RBS readings");
    };
    let test : RBSTest = {
      glucoseLevel;
      timestamp = Time.now();
    };
    let key = patientId.toText() # ":" # bookingId;
    let existing = switch (rbsReadings.get(key)) {
      case (null) { [] };
      case (?arr) { arr };
    };
    rbsReadings.add(key, existing.concat([test]));
    addAuditLog(caller, "RecordRBSReading", patientId.toText());
  };

  /// Registered users can view BP readings for themselves; admins can view any
  public query ({ caller }) func getBPReadings(patientId : Principal, bookingId : Text) : async [BPReading] {
    if (caller != patientId and not AccessControl.isAdmin(accessControlState, caller)) {
      if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
        Runtime.trap("Unauthorized: Only registered users can view BP readings");
      };
      // Non-admin registered users can only view their own readings
      Runtime.trap("Unauthorized: Can only view your own BP readings");
    };
    let key = patientId.toText() # ":" # bookingId;
    switch (bpReadings.get(key)) {
      case (null) { [] };
      case (?arr) { arr };
    };
  };

  /// Registered users can view RBS readings for themselves; admins can view any
  public query ({ caller }) func getRBSReadings(patientId : Principal, bookingId : Text) : async [RBSTest] {
    if (caller != patientId and not AccessControl.isAdmin(accessControlState, caller)) {
      if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
        Runtime.trap("Unauthorized: Only registered users can view RBS readings");
      };
      Runtime.trap("Unauthorized: Can only view your own RBS readings");
    };
    let key = patientId.toText() # ":" # bookingId;
    switch (rbsReadings.get(key)) {
      case (null) { [] };
      case (?arr) { arr };
    };
  };

  // ── Incidents ─────────────────────────────────────────────────────────────

  /// Registered users (any staff) can submit incidents
  public shared ({ caller }) func submitIncident(id : Text, description : Text, severity : { #low; #medium; #high }, photo : ?Storage.ExternalBlob) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only registered users can submit incidents");
    };
    let incident : Incident = {
      id;
      reporter = caller;
      description;
      severity;
      photo;
      timestamp = Time.now();
    };
    incidents.add(id, incident);
    addAuditLog(caller, "SubmitIncident", id);
  };

  /// Admin-only: view all incidents
  public query ({ caller }) func getAllIncidents() : async [Incident] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all incidents");
    };
    incidents.values().toArray();
  };

  /// Registered users can view incidents they reported
  public query ({ caller }) func getMyIncidents() : async [Incident] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only registered users can view their incidents");
    };
    let all = incidents.values().toArray();
    all.filter(func(i : Incident) : Bool { i.reporter == caller });
  };

  // ── Audit Logs ────────────────────────────────────────────────────────────

  /// Admin-only: view all audit logs
  public query ({ caller }) func getAllAuditLogs() : async [AuditLog] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view audit logs");
    };
    auditLogs.values().toArray();
  };

  // ── Internal helpers ──────────────────────────────────────────────────────

  func addAuditLog(actorId : Principal, actionType : Text, targetDocument : Text) {
    let timestamp = Time.now();
    let log : AuditLog = {
      actorId;
      actionType;
      targetDocument;
      timestamp;
    };
    auditLogs.add(timestamp, log);
  };
};
