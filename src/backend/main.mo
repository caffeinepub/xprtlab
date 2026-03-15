import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Text "mo:core/Text";
import Storage "blob-storage/Storage";


import MixinStorage "blob-storage/Mixin";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";


actor {
  public type SystemMode = { #test; #production };

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
    area : ?Text;
  };

  public type Hospital = {
    id : Text;
    name : Text;
    city : Text;
    address : Text;
    area : Text;
    contactNumber : Text;
    isActive : Bool;
    createdAt : Int;
  };

  public type Test = {
    id : Text;
    name : Text;
    description : Text;
    price : Nat;
    testCode : Text;
    mrp : Nat;
    sampleType : Text;
    isActive : Bool;
  };

  public type TestInput = {
    name : Text;
    code : Text;
    price : Nat;
    sampleType : Text;
    isActive : Bool;
  };

  public type TestOutput = {
    id : Text;
    name : Text;
    code : Text;
    price : Nat;
    sampleType : Text;
    isActive : Bool;
  };

  public type TestError = {
    #duplicateCode;
    #notFound;
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
    status : { #ASSIGNED; #EN_ROUTE; #SAMPLE_COLLECTED; #COMPLETED };
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
    sampleId : ?Text;
    role : ?Text;
    discountAmountAttempted : ?Nat;
    maxAllowedDiscount : ?Nat;
    mrp : ?Nat;
    finalAmount : ?Nat;
    outcome : ?Text;
    deliveryMethod : ?Text;
  };

  type Incident = {
    id : Text;
    reporter : Principal;
    description : Text;
    severity : { #low; #medium; #high };
    photo : ?Storage.ExternalBlob;
    timestamp : Int;
  };

  public type SampleStatus = {
    #SAMPLE_COLLECTED;
    #DISPATCHED;
    #RECEIVED_AT_LAB;
    #PROCESSING;
    #REPORT_READY;
    #REPORT_DELIVERED;
  };

  public type HospitalSample = {
    patientName : Text;
    phone : Text;
    hospitalId : Text;
    phlebotomistId : Text;
    tests : [HospitalSampleTestRef];
    totalMrp : Nat;
    discountAmount : Nat;
    maxAllowedDiscount : Nat;
    finalAmount : Nat;
    amountReceived : Nat;
    pendingAmount : Nat;
    paymentMode : Text;
    billingLocked : Bool;
    createdByRole : Text;
    updatedByAdmin : Bool;
    createdAt : Int;
    status : SampleStatus;
    statusHistory : [(SampleStatus, Int, Text, Text)];
    deliveryMethod : ?DeliveryMethod;
    deliveredAt : ?Int;
    deliveredByRole : ?Text;
    deliveredById : ?Text;
    reportUrl : ?Text;
  };

  public type DeliveryMethod = {
    #WHATSAPP;
    #PHYSICAL;
    #EMAIL;
    #HOSPITAL_PICKUP;
  };

  type HospitalSampleTestRef = {
    testId : Text;
    testName : Text;
    testCode : Text;
    price : Nat;
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

  public type HospitalSummaryResult = {
    totalSamplesCollected : Nat;
    cashCollected : Nat;
    upiCollected : Nat;
    pendingAmount : Nat;
  };

  type DailyTotals = {
    samplesCollected : Nat;
    totalCashAmount : Nat;
    totalOnlineAmount : Nat;
  };

  type TestSearchResult = {
    testId : Text;
    testName : Text;
    testCode : Text;
    mrp : Nat;
    sampleType : Text;
  };

  public type HospitalPhlebotomistAssignment = {
    hospitalId : Text;
    phlebotomist : Principal;
    assignedBy : Principal;
    assignedAt : Int;
    isActive : Bool;
    removedAt : ?Int;
    removalReason : ?Text;
  };

  public type Settlement = {
    hospitalId : Text;
    amount : Nat;
    settlementType : { #Settled; #Partial };
    timestamp : Int;
    notes : ?Text;
  };

  // BLOB STORAGE (do not remove)
  include MixinStorage();

  // SYSTEM MODE PERSISTENCE
  var currentSystemMode : SystemMode = #production;

  // ROLES & PERMISSION MAP initialization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Data
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
  let hospitals = Map.empty<Text, Hospital>();
  let assignments = Map.empty<Text, [HospitalPhlebotomistAssignment]>();
  let settlements = Map.empty<Text, Settlement>();

  let allowedDiscountPercentage = 20.0;
  let maxDistance = 100.0;

  func calculateMaxAllowedDiscount(mrp : Nat) : Nat {
    (mrp / 1000) * 50;
  };

  func logDiscountAction(actorId : Principal, role : Text, actionType : Text, sampleId : ?Text, discountAmountAttempted : Nat, maxAllowedDiscount : Nat, mrp : Nat, finalAmount : Nat, outcome : Text) {
    let logEntry : AuditLog = {
      actorId;
      actionType;
      targetDocument = switch (sampleId) { case (null) { "" }; case (?id) { id } };
      timestamp = Time.now();
      sampleId;
      role = ?role;
      discountAmountAttempted = ?discountAmountAttempted;
      maxAllowedDiscount = ?maxAllowedDiscount;
      mrp = ?mrp;
      finalAmount = ?finalAmount;
      outcome = ?outcome;
      deliveryMethod = null;
    };

    auditLogs.add(Time.now(), logEntry);
  };

  func getCallerAppRole(caller : Principal) : ?AppRole {
    switch (userProfiles.get(caller)) {
      case (null) { null };
      case (?profile) { ?profile.appRole };
    };
  };

  func isAdminOrSuperAdmin(caller : Principal) : Bool {
    if (AccessControl.isAdmin(accessControlState, caller)) {
      return true;
    };
    switch (getCallerAppRole(caller)) {
      case (?(#superAdmin)) { true };
      case (?(#labAdmin)) { true };
      case (_) { false };
    };
  };

  func isPhlebotomist(caller : Principal) : Bool {
    switch (getCallerAppRole(caller)) {
      case (?(#phlebotomist)) { true };
      case (_) { false };
    };
  };

  func phlebotomistCanAccessSample(_caller : Principal, _sample : HospitalSample) : Bool {
    false;
  };

  func assertSuperAdmin(caller : Principal, errMsg : Text) {
    let isSuperAdmin = switch (getCallerAppRole(caller)) {
      case (?(#superAdmin)) { true };
      case (_) { false };
    };
    if (not (AccessControl.isAdmin(accessControlState, caller) or isSuperAdmin)) {
      Runtime.trap("Unauthorized: " # errMsg);
    };
  };

  func assertLabAdminOrSuperAdmin(caller : Principal, errMsg : Text) {
    if (isPhlebotomist(caller)) {
      Runtime.trap("Unauthorized: Phlebotomists are not allowed to access test functions");
    };
    let isLabAdmin = switch (getCallerAppRole(caller)) {
      case (?(#labAdmin)) { true };
      case (_) { false };
    };
    let isSuperAdmin = switch (getCallerAppRole(caller)) {
      case (?(#superAdmin)) { true };
      case (_) { false };
    };
    if (not (AccessControl.isAdmin(accessControlState, caller) or isLabAdmin or isSuperAdmin)) {
      Runtime.trap("Unauthorized: " # errMsg);
    };
  };

  func testCodeExists(code : Text, excludeId : ?Text) : Bool {
    var found = false;
    tests.forEach(func(v) {
      let test = v.1;
      let isExcluded = switch (excludeId) {
        case (null) { false };
        case (?eid) { test.id == eid };
      };
      if (test.testCode == code and not isExcluded) {
        found := true;
      };
    });
    found;
  };

  public shared ({ caller }) func addTest(input : TestInput) : async { #ok : TestOutput; #err : TestError } {
    assertSuperAdmin(caller, "Only SUPER_ADMIN role can add tests");

    if (testCodeExists(input.code, null)) {
      return #err(#duplicateCode);
    };

    let test : Test = {
      id = input.code;
      name = input.name;
      testCode = input.code;
      sampleType = input.sampleType;
      description = "";
      price = input.price;
      mrp = input.price;
      isActive = input.isActive;
    };

    tests.add(input.code, test);

    #ok({
      id = test.id;
      name = test.name;
      code = test.testCode;
      price = test.price;
      sampleType = test.sampleType;
      isActive = test.isActive;
    });
  };

  public query ({ caller }) func getTest(code : Text) : async ?TestOutput {
    assertLabAdminOrSuperAdmin(caller, "Only LAB_ADMIN or SUPER_ADMIN role can get tests");
    switch (tests.get(code)) {
      case (null) { null };
      case (?test) {
        ?{
          id = test.id;
          name = test.name;
          code = test.testCode;
          price = test.price;
          sampleType = test.sampleType;
          isActive = test.isActive;
        };
      };
    };
  };

  public query ({ caller }) func getTestByCode(testCode : Text) : async ?TestOutput {
    assertLabAdminOrSuperAdmin(caller, "Only LAB_ADMIN or SUPER_ADMIN role can get tests");
    switch (tests.get(testCode)) {
      case (null) { null };
      case (?test) {
        ?{
          id = test.id;
          name = test.name;
          code = test.testCode;
          price = test.price;
          sampleType = test.sampleType;
          isActive = test.isActive;
        };
      };
    };
  };

  public query ({ caller }) func getAllTests() : async [TestOutput] {
    assertLabAdminOrSuperAdmin(caller, "Only LAB_ADMIN or SUPER_ADMIN role can get tests");
    let testsList = List.empty<TestOutput>();
    if (tests.size() > 0) {
      tests.forEach(
        func(v) {
          let test = v.1;
          testsList.add({
            id = test.id;
            name = test.name;
            code = test.testCode;
            price = test.price;
            sampleType = test.sampleType;
            isActive = test.isActive;
          });
        }
      );
    };
    testsList.toArray();
  };

  public shared ({ caller }) func updateTest(code : Text, input : TestInput) : async { #ok : TestOutput; #err : TestError } {
    assertSuperAdmin(caller, "Only SUPER_ADMIN role can update tests");
    let current = switch (tests.get(code)) {
      case (null) { Runtime.trap("Test " # code # " does not exist") };
      case (?test) { test };
    };

    if (input.code != code) {
      if (testCodeExists(input.code, ?current.id)) {
        return #err(#duplicateCode);
      };
    };

    let updatedTest : Test = {
      id = current.id;
      name = input.name;
      description = current.description;
      price = input.price;
      testCode = input.code;
      mrp = input.price;
      sampleType = input.sampleType;
      isActive = input.isActive;
    };

    if (input.code != code) {
      tests.remove(code);
    };
    tests.add(input.code, updatedTest);

    #ok({
      id = updatedTest.id;
      name = updatedTest.name;
      code = updatedTest.testCode;
      price = updatedTest.price;
      sampleType = updatedTest.sampleType;
      isActive = updatedTest.isActive;
    });
  };

  public shared ({ caller }) func disableTest(code : Text) : async TestOutput {
    assertSuperAdmin(caller, "Only SUPER_ADMIN role can disable tests");
    let current = switch (tests.get(code)) {
      case (null) { Runtime.trap("Test " # code # " does not exist") };
      case (?test) { test };
    };

    let disabledTest : Test = {
      id = current.id;
      name = current.name;
      description = current.description;
      price = current.price;
      testCode = current.testCode;
      mrp = current.mrp;
      sampleType = current.sampleType;
      isActive = false;
    };

    tests.add(code, disabledTest);

    {
      id = disabledTest.id;
      name = disabledTest.name;
      code = disabledTest.testCode;
      price = disabledTest.price;
      sampleType = disabledTest.sampleType;
      isActive = disabledTest.isActive;
    };
  };

  public shared ({ caller }) func setTestStatus(testId : Text, isActive : Bool) : async { #ok : TestOutput; #err : TestError } {
    assertSuperAdmin(caller, "Only SUPER_ADMIN role can set test status");
    let current = switch (tests.get(testId)) {
      case (null) { return #err(#notFound) };
      case (?test) { test };
    };

    let updatedTest : Test = {
      id = current.id;
      name = current.name;
      description = current.description;
      price = current.price;
      testCode = current.testCode;
      mrp = current.mrp;
      sampleType = current.sampleType;
      isActive = isActive;
    };

    tests.add(testId, updatedTest);

    #ok({
      id = updatedTest.id;
      name = updatedTest.name;
      code = updatedTest.testCode;
      price = updatedTest.price;
      sampleType = updatedTest.sampleType;
      isActive = updatedTest.isActive;
    });
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get their profile");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public shared ({ caller }) func bulkAddTests(testInputs : [TestInput]) : async [TestOutput] {
    assertSuperAdmin(caller, "Only SUPER_ADMIN role can bulk add tests");
    let outputList = List.empty<TestOutput>();

    for (input in testInputs.values()) {
      if (not testCodeExists(input.code, null)) {
        let test : Test = {
          id = input.code;
          name = input.name;
          testCode = input.code;
          sampleType = input.sampleType;
          description = "";
          price = input.price;
          mrp = input.price;
          isActive = input.isActive;
        };

        tests.add(input.code, test);

        let output : TestOutput = {
          id = test.id;
          name = test.name;
          code = test.testCode;
          price = test.price;
          sampleType = test.sampleType;
          isActive = test.isActive;
        };

        outputList.add(output);
      };
    };
    outputList.toArray();
  };

  /// HOSPITAL MANAGEMENT

  // addHospital: only labAdmin or superAdmin may create hospitals
  public shared ({ caller }) func addHospital(name : Text, city : Text, address : Text, area : Text, contactNumber : Text) : async Hospital {
    assertLabAdminOrSuperAdmin(caller, "Only LAB_ADMIN or SUPER_ADMIN role can add hospitals");

    let id = (hospitals.size() + 1).toText();

    let hospital : Hospital = {
      id;
      name;
      city;
      address;
      area;
      contactNumber;
      isActive = true;
      createdAt = Time.now();
    };

    hospitals.add(id, hospital);
    hospital;
  };

  // updateHospital: only labAdmin or superAdmin may update hospitals
  public shared ({ caller }) func updateHospital(id : Text, name : Text, city : Text, address : Text, area : Text, contactNumber : Text) : async Hospital {
    assertLabAdminOrSuperAdmin(caller, "Only LAB_ADMIN or SUPER_ADMIN role can update hospitals");

    let existing = switch (hospitals.get(id)) {
      case (null) { Runtime.trap("Hospital " # id # " does not exist") };
      case (?hospital) { hospital };
    };

    let updatedHospital : Hospital = {
      id = existing.id;
      name;
      city;
      address;
      area;
      contactNumber;
      isActive = existing.isActive;
      createdAt = existing.createdAt;
    };

    hospitals.add(id, updatedHospital);
    updatedHospital;
  };

  // disableHospital: only labAdmin or superAdmin may disable hospitals
  public shared ({ caller }) func disableHospital(id : Text) : async Hospital {
    assertLabAdminOrSuperAdmin(caller, "Only LAB_ADMIN or SUPER_ADMIN role can disable hospitals");

    let hospital = switch (hospitals.get(id)) {
      case (null) { Runtime.trap("Hospital " # id # " does not exist") };
      case (?h) { h };
    };

    let disabledHospital : Hospital = {
      id = hospital.id;
      name = hospital.name;
      city = hospital.city;
      address = hospital.address;
      area = hospital.area;
      contactNumber = hospital.contactNumber;
      isActive = false;
      createdAt = hospital.createdAt;
    };

    hospitals.add(id, disabledHospital);
    disabledHospital;
  };

  // getHospitals: accessible to any authenticated user (labAdmin, superAdmin, phlebotomist)
  public query ({ caller }) func getHospitals(search : ?Text) : async [Hospital] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view hospitals");
    };

    let filtered = List.empty<Hospital>();
    hospitals.forEach(
      func(v) {
        let hospital = v.1;
        switch (search) {
          case (null) { filtered.add(hospital) };
          case (?searchTerm) {
            if (
              hospital.name.contains(#text searchTerm) or
              hospital.city.contains(#text searchTerm) or
              hospital.area.contains(#text searchTerm)
            ) {
              filtered.add(hospital);
            };
          };
        };
      }
    );
    filtered.toArray();
  };

  // getHospitalById: accessible to any authenticated user
  public query ({ caller }) func getHospitalById(id : Text) : async Hospital {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view hospitals");
    };

    switch (hospitals.get(id)) {
      case (null) { Runtime.trap("Hospital " # id # " does not exist") };
      case (?hospital) { hospital };
    };
  };

  /// HOSPITAL-PHLEBOTOMIST ASSIGNMENTS

  func generateAssignmentId(hospitalId : Text, phlebotomist : Principal) : Text {
    (hospitalId.size() + 1).toText() # phlebotomist.toText();
  };

  func ensureActiveAssignmentExists(assignmentId : Text, funcName : Text) : HospitalPhlebotomistAssignment {
    let existingAssignments = switch (assignments.get(assignmentId)) {
      case (null) { Runtime.trap("Assignment " # assignmentId # " does not exist") };
      case (?as) { as };
    };

    if (existingAssignments.size() == 0) {
      Runtime.trap("Assignment " # assignmentId # " does not exist");
    };
    let latestAssignment = existingAssignments[0];
    if (not latestAssignment.isActive) {
      Runtime.trap("Assignment " # assignmentId # " is already inactive in " # funcName);
    };
    latestAssignment;
  };

  // assignPhlebotomistToHospital: only labAdmin or superAdmin may manage assignments
  public shared ({ caller }) func assignPhlebotomistToHospital(hospitalId : Text, phlebotomist : Principal) : async HospitalPhlebotomistAssignment {
    assertLabAdminOrSuperAdmin(caller, "Only LAB_ADMIN or SUPER_ADMIN role can assign phlebotomists to hospitals");

    let assignmentId = generateAssignmentId(hospitalId, phlebotomist);

    switch (assignments.get(assignmentId)) {
      case (null) {};
      case (?assignmentsList) {
        let activeExists = assignmentsList.any(func(a) { a.isActive });
        if (activeExists) {
          Runtime.trap("Phlebotomist is already assigned to this hospital");
        };
      };
    };

    let assignment : HospitalPhlebotomistAssignment = {
      hospitalId;
      phlebotomist;
      assignedBy = caller;
      assignedAt = Time.now();
      isActive = true;
      removedAt = null;
      removalReason = null;
    };

    let updatedAssignments = switch (assignments.get(assignmentId)) {
      case (null) { [assignment] };
      case (?existing) { [assignment].concat(existing) };
    };

    assignments.add(assignmentId, updatedAssignments);
    assignment;
  };

  // removePhlebotomistFromHospital: only labAdmin or superAdmin may manage assignments
  public shared ({ caller }) func removePhlebotomistFromHospital(hospitalId : Text, phlebotomist : Principal, removalReason : Text) : async HospitalPhlebotomistAssignment {
    assertLabAdminOrSuperAdmin(caller, "Only LAB_ADMIN or SUPER_ADMIN role can remove phlebotomists from hospitals");

    let assignmentId = generateAssignmentId(hospitalId, phlebotomist);
    let latestAssignment = ensureActiveAssignmentExists(assignmentId, "removePhlebotomistFromHospital");

    // Create a new inactive historical record preserving original assignment data
    let removedAssignment : HospitalPhlebotomistAssignment = {
      hospitalId = latestAssignment.hospitalId;
      phlebotomist = latestAssignment.phlebotomist;
      assignedBy = latestAssignment.assignedBy;
      assignedAt = latestAssignment.assignedAt;
      isActive = false;
      removedAt = ?Time.now();
      removalReason = ?removalReason;
    };

    let updatedAssignments = switch (assignments.get(assignmentId)) {
      case (null) { [removedAssignment] };
      case (?existing) { [removedAssignment].concat(existing) };
    };
    assignments.add(assignmentId, updatedAssignments);

    removedAssignment;
  };

  // getPhlebotomistsByHospital: accessible to any authenticated user
  public query ({ caller }) func getPhlebotomistsByHospital(hospitalId : Text) : async [Principal] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view phlebotomist assignments");
    };

    let phlebotomists = List.empty<Principal>();
    assignments.forEach(
      func(v) {
        let assignmentList = v.1;
        if (assignmentList.size() > 0) {
          let assignment = assignmentList[0];
          if (assignment.hospitalId == hospitalId and assignment.isActive) {
            phlebotomists.add(assignment.phlebotomist);
          };
        };
      }
    );
    phlebotomists.toArray();
  };

  // getHospitalsByPhlebotomist: accessible to any authenticated user
  public query ({ caller }) func getHospitalsByPhlebotomist(phlebotomist : Principal) : async [Text] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view hospital assignments");
    };

    let hospitalIds = List.empty<Text>();
    assignments.forEach(
      func(v) {
        let assignmentList = v.1;
        if (assignmentList.size() > 0) {
          let assignment = assignmentList[0];
          if (assignment.phlebotomist == phlebotomist and assignment.isActive) {
            hospitalIds.add(assignment.hospitalId);
          };
        };
      }
    );
    hospitalIds.toArray();
  };

  // SETTLEMENT MARKING SYSTEM

  public shared ({ caller }) func markSettlement(
    hospitalId : Text,
    amount : Nat,
    settlementType : { #Settled; #Partial },
    notes : ?Text,
  ) : async Settlement {
    assertLabAdminOrSuperAdmin(caller, "Unauthorized: Only labAdmin or superAdmin can mark settlements");

    if (not hospitals.containsKey(hospitalId)) {
      Runtime.trap("Hospital does not exist");
    };

    let settlement : Settlement = {
      hospitalId;
      amount;
      settlementType;
      timestamp = Time.now();
      notes;
    };

    settlements.add(settlement.timestamp.toText(), settlement);
    settlement;
  };

  public query ({ caller }) func getSettlementHistory(hospitalId : Text) : async [Settlement] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view settlement history");
    };

    let filtered = List.empty<Settlement>();
    settlements.forEach(
      func(entry) {
        let settlement = entry.1;
        if (settlement.hospitalId == hospitalId) {
          filtered.add(settlement);
        };
      }
    );
    filtered.toArray();
  };

  // SYSTEM MODE MANAGEMENT

  public shared ({ caller }) func setSystemMode(mode : SystemMode) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can change system mode");
    };
    currentSystemMode := mode;
  };

  public query ({ caller }) func getSystemMode() : async SystemMode {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view system mode");
    };
    currentSystemMode;
  };
};
