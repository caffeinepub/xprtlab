import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Float "mo:core/Float";
import List "mo:core/List";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";

import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

// Persistent actor with data migration enabled

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

  type HospitalSample = {
    patientName : Text;
    phone : Text;
    hospitalId : Text;
    phlebotomistId : Text;
    testId : Text;
    mrp : Float;
    discount : Float;
    finalAmount : Float;
    amountReceived : Float;
    pendingAmount : Float;
    paymentMode : Text;
    status : Text;
    createdAt : Int;
  };

  type Attendance = {
    phlebotomistId : Text;
    hospitalId : Text;
    checkInTime : Int;
    checkOutTime : ?Int;
    checkInLat : Float;
    checkInLong : Float;
    checkOutLat : ?Float;
    checkOutLong : ?Float;
    checkInSelfieUrl : Text;
    totalWorkingMinutes : ?Int;
    status : Text;
  };

  type DeviceBinding = {
    userId : Text;
    deviceId : Text;
    deviceModel : Text;
    osVersion : Text;
    boundAt : Int;
  };

  type Session = {
    userId : Text;
    sessionToken : Text;
    createdAt : Int;
    status : Text;
  };

  type SecurityLog = {
    userId : Text;
    eventType : Text;
    deviceId : Text;
    latitude : ?Float;
    longitude : ?Float;
    timestamp : Int;
    reason : Text;
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

  let hospitalSamples = Map.empty<Text, HospitalSample>();
  let attendances = Map.empty<Text, Attendance>();
  let deviceBindings = Map.empty<Text, DeviceBinding>();
  let sessions = Map.empty<Text, Session>();
  let securityLogs = Map.empty<Text, SecurityLog>();

  // Constants
  let allowedDiscountPercentage = 20.0;
  let maxDistance = 100.0;

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

  /// Registered users can view their own bookings
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

  /// Registered users can view their own home collection requests
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

  /// Registered users can view their own reports
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

  // ── Hospital Sample ───────────────────────────────────────────────────────

  /// Phlebotomist-only (registered user): create a hospital sample with status SAMPLE_COLLECTED
  public shared ({ caller }) func createHospitalSample(
    patientName : Text,
    phone : Text,
    hospitalId : Text,
    phlebotomistId : Text,
    testId : Text,
    mrp : Float,
    discount : Float,
    finalAmount : Float,
    amountReceived : Float,
    pendingAmount : Float,
    paymentMode : Text,
  ) : async () {
    // Only authenticated (registered) users — i.e. phlebotomists — may create samples
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only phlebotomists can create hospital samples");
    };

    // Server-side discount cap validation
    if (mrp <= 0.0) {
      Runtime.trap("MRP must be greater than zero");
    };
    let discountPercentage = (discount / mrp) * 100.0;
    if (discountPercentage > allowedDiscountPercentage) {
      Runtime.trap("Discount exceeds the allowed limit of 20%");
    };

    let id = hospitalId # ":" # testId # ":" # Time.now().toText();
    let sample : HospitalSample = {
      patientName;
      phone;
      hospitalId;
      phlebotomistId;
      testId;
      mrp;
      discount;
      finalAmount;
      amountReceived;
      pendingAmount;
      paymentMode;
      status = "SAMPLE_COLLECTED";
      createdAt = Time.now();
    };
    hospitalSamples.add(id, sample);
    addAuditLog(caller, "CreateHospitalSample", id);
  };

  /// Admin-only: get hospital samples filtered by hospitalId
  public query ({ caller }) func getHospitalSamplesByHospital(hospitalId : Text) : async [HospitalSample] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view hospital samples by hospital");
    };
    let all = hospitalSamples.values().toArray();
    all.filter(func(sample : HospitalSample) : Bool { sample.hospitalId == hospitalId });
  };

  /// Admin-only: get hospital samples filtered by phlebotomistId
  public query ({ caller }) func getHospitalSamplesByPhlebotomist(phlebotomistId : Text) : async [HospitalSample] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view hospital samples by phlebotomist");
    };
    let all = hospitalSamples.values().toArray();
    all.filter(func(sample : HospitalSample) : Bool { sample.phlebotomistId == phlebotomistId });
  };

  /// Patient (registered user) or admin: get hospital samples filtered by phone number.
  /// This supports the patient-linked view. Any authenticated user may query by phone
  /// (patients look up their own records; admins may look up any).
  public query ({ caller }) func getHospitalSamplesByPhone(phone : Text) : async {
    samples : [HospitalSample];
    totalAmount : Float;
    totalDiscount : Float;
    totalReceived : Float;
    totalPending : Float;
    count : Nat;
  } {
    // Must be at least a registered user (patient or admin); guests are blocked
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only registered users or admins can view samples by phone");
    };

    let all = hospitalSamples.values().toArray();
    let filtered = all.filter(func(sample : HospitalSample) : Bool { sample.phone == phone });

    let count = filtered.size();
    let totals = filtered.foldLeft(
      {
        totalAmount = 0.0;
        totalDiscount = 0.0;
        totalReceived = 0.0;
        totalPending = 0.0;
      },
      func(
        acc : {
          totalAmount : Float;
          totalDiscount : Float;
          totalReceived : Float;
          totalPending : Float;
        },
        sample : HospitalSample,
      ) : {
        totalAmount : Float;
        totalDiscount : Float;
        totalReceived : Float;
        totalPending : Float;
      } {
        {
          totalAmount = acc.totalAmount + sample.finalAmount;
          totalDiscount = acc.totalDiscount + sample.discount;
          totalReceived = acc.totalReceived + sample.amountReceived;
          totalPending = acc.totalPending + sample.pendingAmount;
        };
      },
    );

    {
      samples = filtered;
      count;
      totalAmount = totals.totalAmount;
      totalDiscount = totals.totalDiscount;
      totalReceived = totals.totalReceived;
      totalPending = totals.totalPending;
    };
  };

  /// Admin-only: update billing fields of a hospital sample
  public shared ({ caller }) func updateHospitalSampleBilling(
    id : Text,
    discount : Float,
    finalAmount : Float,
    amountReceived : Float,
    pendingAmount : Float,
    paymentMode : Text,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update hospital sample billing");
    };

    switch (hospitalSamples.get(id)) {
      case (null) { Runtime.trap("Hospital sample not found") };
      case (?sample) {
        // Server-side discount cap validation on update as well
        if (sample.mrp <= 0.0) {
          Runtime.trap("MRP must be greater than zero");
        };
        let discountPercentage = (discount / sample.mrp) * 100.0;
        if (discountPercentage > allowedDiscountPercentage) {
          Runtime.trap("Discount exceeds the allowed limit of 20%");
        };

        let updatedSample : HospitalSample = {
          sample with
          discount;
          finalAmount;
          amountReceived;
          pendingAmount;
          paymentMode;
        };
        hospitalSamples.add(id, updatedSample);
        addAuditLog(caller, "UpdateHospitalSampleBilling", id);
      };
    };
  };

  // ── Attendance Management ──────────────────────────────────────────────────

  /// Phlebotomist-only (registered user): start a shift.
  /// The caller must be the phlebotomist identified by phlebotomistId (ownership check).
  /// Validates: no existing ACTIVE shift for this phlebotomist.
  public shared ({ caller }) func startShift(
    phlebotomistId : Text,
    hospitalId : Text,
    checkInLat : Float,
    checkInLong : Float,
    checkInSelfieUrl : Text,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only phlebotomists can start a shift");
    };
    // Ownership: the caller must be the phlebotomist whose ID is provided
    if (caller.toText() != phlebotomistId) {
      Runtime.trap("Unauthorized: You can only start your own shift");
    };

    // Check for an existing ACTIVE shift
    let activeKey = phlebotomistId # ":ACTIVE";
    switch (attendances.get(activeKey)) {
      case (?existing) {
        if (existing.status == "ACTIVE") {
          Runtime.trap("Active shift already exists for this phlebotomist");
        };
      };
      case (null) {};
    };

    let shiftKey = phlebotomistId # ":" # Time.now().toText();
    let newShift : Attendance = {
      phlebotomistId;
      hospitalId;
      checkInTime = Time.now();
      checkOutTime = null;
      checkInLat;
      checkInLong;
      checkOutLat = null;
      checkOutLong = null;
      checkInSelfieUrl;
      totalWorkingMinutes = null;
      status = "ACTIVE";
    };
    attendances.add(shiftKey, newShift);
    attendances.add(activeKey, newShift);
    addAuditLog(caller, "StartShift", phlebotomistId);
  };

  /// Phlebotomist-only (registered user): end their own active shift.
  /// The caller must be the phlebotomist identified by phlebotomistId (ownership check).
  public shared ({ caller }) func endShift(
    phlebotomistId : Text,
    hospitalId : Text,
    checkOutLat : Float,
    checkOutLong : Float,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only phlebotomists can end a shift");
    };
    // Ownership: the caller must be the phlebotomist whose ID is provided
    if (caller.toText() != phlebotomistId) {
      Runtime.trap("Unauthorized: You can only end your own shift");
    };

    let activeKey = phlebotomistId # ":ACTIVE";
    switch (attendances.get(activeKey)) {
      case (null) { Runtime.trap("No active shift found for this phlebotomist") };
      case (?shift) {
        if (shift.status != "ACTIVE") {
          Runtime.trap("No active shift found for this phlebotomist");
        };
        let checkOutTime = Time.now();
        // totalWorkingMinutes = (checkOutTime - checkInTime) / 60_000_000_000 (nanoseconds to minutes)
        let totalWorkingMinutes = (checkOutTime - shift.checkInTime) / 60_000_000_000;
        let updatedShift : Attendance = {
          shift with
          checkOutTime = ?checkOutTime;
          checkOutLat = ?checkOutLat;
          checkOutLong = ?checkOutLong;
          totalWorkingMinutes = ?totalWorkingMinutes;
          status = "COMPLETED";
        };
        attendances.add(activeKey, updatedShift);
        addAuditLog(caller, "EndShift", phlebotomistId);
      };
    };
  };

  /// Phlebotomist-only (registered user): get their own active shift.
  /// The caller must be the phlebotomist identified by phlebotomistId (ownership check).
  public query ({ caller }) func getActiveShift(phlebotomistId : Text) : async ?Attendance {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only phlebotomists can get their active shift");
    };
    // Ownership: the caller may only retrieve their own active shift
    if (caller.toText() != phlebotomistId) {
      Runtime.trap("Unauthorized: You can only view your own active shift");
    };

    let key = phlebotomistId # ":ACTIVE";
    switch (attendances.get(key)) {
      case (null) { null };
      case (?shift) {
        if (shift.status == "ACTIVE") { ?shift } else { null };
      };
    };
  };

  /// Admin-only: get all attendance records for a specific phlebotomist
  public query ({ caller }) func getAttendanceByPhlebotomist(phlebotomistId : Text) : async [Attendance] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view attendance records");
    };
    let all = attendances.values().toArray();
    all.filter(func(shift : Attendance) : Bool { shift.phlebotomistId == phlebotomistId });
  };

  /// Admin-only: get all currently active shifts
  public query ({ caller }) func getAllActiveShifts() : async [Attendance] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all active shifts");
    };
    let all = attendances.values().toArray();
    all.filter(func(shift : Attendance) : Bool { shift.status == "ACTIVE" });
  };

  // ── Device Binding ────────────────────────────────────────────────────────

  /// Authenticated users only: bind a device on first login.
  /// If a binding already exists for a different deviceId, returns an error.
  /// The caller must be the user identified by userId (ownership check).
  public shared ({ caller }) func bindDevice(
    userId : Text,
    deviceId : Text,
    deviceModel : Text,
    osVersion : Text,
  ) : async () {
    // Must be an authenticated user — guests cannot bind devices
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can bind a device");
    };
    // Ownership: the caller may only bind their own userId
    if (caller.toText() != userId) {
      Runtime.trap("Unauthorized: You can only bind a device to your own account");
    };

    switch (deviceBindings.get(userId)) {
      case (null) {
        // No existing binding — store the new one
        let newBinding : DeviceBinding = {
          userId;
          deviceId;
          deviceModel;
          osVersion;
          boundAt = Time.now();
        };
        deviceBindings.add(userId, newBinding);
        addAuditLog(caller, "BindDevice", userId);
      };
      case (?existing) {
        if (existing.deviceId != deviceId) {
          // A different device is already bound — block and surface the error
          Runtime.trap("This account is already registered on another device. Contact admin.");
        };
        // Same device — silently succeed (idempotent)
      };
    };
  };

  /// Admin-only: remove the device binding for a given userId
  public shared ({ caller }) func resetDeviceBinding(userId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can reset device bindings");
    };
    deviceBindings.remove(userId);
    addAuditLog(caller, "ResetDeviceBinding", userId);
  };

  // ── Session Management ────────────────────────────────────────────────────

  /// Authenticated users only: create (or replace) a session token.
  /// On login, a new ACTIVE session is written and any previous session for the
  /// same userId is implicitly superseded (the map entry is overwritten).
  /// The caller must be the user identified by userId (ownership check).
  public shared ({ caller }) func createSession(userId : Text, sessionToken : Text) : async () {
    // Must be an authenticated user — guests cannot create sessions
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can create sessions");
    };
    // Ownership: the caller may only create a session for their own userId
    if (caller.toText() != userId) {
      Runtime.trap("Unauthorized: You can only create a session for your own account");
    };

    // Always write the new ACTIVE session, overwriting any previous one
    let newSession : Session = {
      userId;
      sessionToken;
      createdAt = Time.now();
      status = "ACTIVE";
    };
    sessions.add(userId, newSession);
    addAuditLog(caller, "CreateSession", userId);
  };

  /// Authenticated users only: validate that the presented session token matches
  /// the current ACTIVE session for the given userId.
  /// Returns true if valid, false if the session has been superseded.
  /// The caller must be the user identified by userId (ownership check).
  public query ({ caller }) func validateSession(userId : Text, sessionToken : Text) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can validate sessions");
    };
    if (caller.toText() != userId) {
      Runtime.trap("Unauthorized: You can only validate your own session");
    };

    switch (sessions.get(userId)) {
      case (null) { false };
      case (?session) {
        session.status == "ACTIVE" and session.sessionToken == sessionToken;
      };
    };
  };

  // ── Security Logging ──────────────────────────────────────────────────────

  /// Authenticated users (phlebotomists) or system: write a security log entry.
  /// No role restriction beyond being an authenticated user — guests are blocked.
  public shared ({ caller }) func createSecurityLog(
    userId : Text,
    eventType : Text,
    deviceId : Text,
    latitude : ?Float,
    longitude : ?Float,
    reason : Text,
  ) : async () {
    // Must be at least a registered (authenticated) user; anonymous guests are blocked
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can create security logs");
    };

    let logId = userId # ":" # eventType # ":" # Time.now().toText();
    let newLog : SecurityLog = {
      userId;
      eventType;
      deviceId;
      latitude;
      longitude;
      timestamp = Time.now();
      reason;
    };
    securityLogs.add(logId, newLog);
  };

  /// Admin/super-admin only: retrieve security logs, optionally filtered by userId and eventType.
  /// Pass empty strings to skip a filter.
  public query ({ caller }) func getSecurityLogs(userId : Text, eventType : Text) : async [SecurityLog] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view security logs");
    };

    let all = securityLogs.values().toArray();
    all.filter(
      func(log : SecurityLog) : Bool {
        let matchesUser = userId == "" or log.userId == userId;
        let matchesEvent = eventType == "" or log.eventType == eventType;
        matchesUser and matchesEvent;
      }
    );
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
