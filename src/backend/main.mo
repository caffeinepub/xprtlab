import List "mo:core/List";
import Time "mo:core/Time";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Order "mo:core/Order";
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
    lab_cost : Nat;
    commission_amount : Nat;
    profit : Nat;
    sampleType : Text;
    isActive : Bool;
  };

  public type TestInput = {
    name : Text;
    code : Text;
    price : Nat;
    mrp : Nat;
    lab_cost : Nat;
    commission_amount : Nat;
    profit : Nat;
    sampleType : Text;
    isActive : Bool;
  };

  public type TestOutput = {
    id : Text;
    name : Text;
    code : Text;
    price : Nat;
    mrp : Nat;
    lab_cost : Nat;
    commission_amount : Nat;
    profit : Nat;
    sampleType : Text;
    isActive : Bool;
  };

  public type TestError = {
    #duplicateCode;
    #notFound;
  };

  public type AppTask = {
    task_id : Text;
    assigned_to_mobile : Text;
    assigned_by : Text;
    hospital_id : Text;
    patient_name : Text;
    status : Text;
    created_at : Int;
  };

  type Booking = {
    id : Text;
    patient : Principal.Principal;
    tests : [Test];
    slot : Text;
    status : { #pending; #confirmed; #completed; #canceled };
    timestamp : Int;
  };

  type HomeCollectionRequest = {
    id : Text;
    patient : Principal.Principal;
    address : Text;
    latitude : ?Float;
    longitude : ?Float;
    tests : [Test];
    slot : Text;
    assignedPhlebotomist : ?Principal.Principal;
    status : { #ASSIGNED; #EN_ROUTE; #SAMPLE_COLLECTED; #COMPLETED };
    timestamp : Int;
  };

  type Report = {
    id : Text;
    patient : Principal.Principal;
    bookingId : Text;
    file : Storage.ExternalBlob;
    uploadedBy : Principal.Principal;
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
    actorId : Principal.Principal;
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
    reporter : Principal.Principal;
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
    phlebotomist : Principal.Principal;
    assignedBy : Principal.Principal;
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

  public type SampleError = {
    #validData;
    #invalidData;
    #unexpected;
  };

  // BLOB STORAGE (do not remove)
  include MixinStorage();

  // SYSTEM MODE PERSISTENCE
  var currentSystemMode : SystemMode = #production;

  // ROLES & PERMISSION MAP initialization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Data
  let userProfiles = Map.empty<Principal.Principal, UserProfile>();
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
  let tasks = Map.empty<Text, AppTask>();

  let allowedDiscountPercentage = 20.0;
  let maxDistance = 100.0;

  func calculateMaxAllowedDiscount(mrp : Nat) : Nat {
    (mrp / 1000) * 50;
  };

  func logDiscountAction(actorId : Principal.Principal, role : Text, actionType : Text, sampleId : ?Text, discountAmountAttempted : Nat, maxAllowedDiscount : Nat, mrp : Nat, finalAmount : Nat, outcome : Text) {
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

  func getCallerAppRole(caller : Principal.Principal) : ?AppRole {
    switch (userProfiles.get(caller)) {
      case (null) { null };
      case (?profile) { ?profile.appRole };
    };
  };

  func isAdminOrSuperAdmin(caller : Principal.Principal) : Bool {
    if (AccessControl.isAdmin(accessControlState, caller)) {
      return true;
    };
    switch (getCallerAppRole(caller)) {
      case (?(#superAdmin)) { true };
      case (?(#labAdmin)) { true };
      case (_) { false };
    };
  };

  func isPhlebotomist(caller : Principal.Principal) : Bool {
    switch (getCallerAppRole(caller)) {
      case (?(#phlebotomist)) { true };
      case (_) { false };
    };
  };

  func phlebotomistCanAccessSample(_caller : Principal.Principal, _sample : HospitalSample) : Bool {
    false;
  };

  func assertSuperAdmin(caller : Principal.Principal, errMsg : Text) {
    let isSuperAdmin = switch (getCallerAppRole(caller)) {
      case (?(#superAdmin)) { true };
      case (_) { false };
    };
    if (not (AccessControl.isAdmin(accessControlState, caller) or isSuperAdmin)) {
      Runtime.trap("Unauthorized: " # errMsg);
    };
  };

  func assertLabAdminOrSuperAdmin(caller : Principal.Principal, errMsg : Text) {
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

  func compareByCreatedAt(a : SampleRecord, b : SampleRecord) : Order.Order {
    if (a.createdAt < b.createdAt) { #less } else if (a.createdAt > b.createdAt) {
      #greater;
    } else {
      #equal;
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

  // TASK MANAGEMENT

  public shared ({ caller }) func createTask(
    assigned_to_mobile : Text,
    assigned_by : Text,
    hospital_id : Text,
    patient_name : Text,
    status : Text,
  ) : async AppTask {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can create tasks");
    };

    let task_id = "TASK-" # Time.now().toText() # "-" # (tasks.size() + 1).toText();

    let task : AppTask = {
      task_id;
      assigned_to_mobile;
      assigned_by;
      hospital_id;
      patient_name;
      status;
      created_at = Time.now();
    };

    tasks.add(task_id, task);
    task;
  };

  public query ({ caller }) func getTasksByUser(mobile : Text) : async [AppTask] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view tasks");
    };

    let filtered = List.empty<AppTask>();
    tasks.forEach(
      func(v) {
        let task = v.1;
        if (task.assigned_to_mobile == mobile) {
          filtered.add(task);
        };
      }
    );
    filtered.toArray();
  };

  public query ({ caller }) func getAllTasks() : async [AppTask] {
    assertSuperAdmin(caller, "Only SUPER_ADMIN role can get all tasks");

    let allTasks = List.empty<AppTask>();
    tasks.forEach(
      func(v) {
        let task = v.1;
        allTasks.add(task);
      }
    );
    allTasks.toArray();
  };

  public shared ({ caller }) func deleteAllTasks() : async Nat {
    assertSuperAdmin(caller, "Only SUPER_ADMIN role can delete all tasks");

    let deletedCount = tasks.size();
    tasks.clear();
    deletedCount;
  };

  // TEST MANAGEMENT

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
      mrp = input.mrp;
      lab_cost = input.lab_cost;
      commission_amount = input.commission_amount;
      profit = input.profit;
      isActive = input.isActive;
    };

    tests.add(input.code, test);

    #ok({
      id = test.id;
      name = test.name;
      code = test.testCode;
      price = test.price;
      mrp = test.mrp;
      lab_cost = test.lab_cost;
      commission_amount = test.commission_amount;
      profit = test.profit;
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
          mrp = test.mrp;
          lab_cost = test.lab_cost;
          commission_amount = test.commission_amount;
          profit = test.profit;
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
          mrp = test.mrp;
          lab_cost = test.lab_cost;
          commission_amount = test.commission_amount;
          profit = test.profit;
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
            mrp = test.mrp;
            lab_cost = test.lab_cost;
            commission_amount = test.commission_amount;
            profit = test.profit;
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
      mrp = input.mrp;
      lab_cost = input.lab_cost;
      commission_amount = input.commission_amount;
      profit = input.profit;
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
      mrp = updatedTest.mrp;
      lab_cost = updatedTest.lab_cost;
      commission_amount = updatedTest.commission_amount;
      profit = updatedTest.profit;
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
      lab_cost = current.lab_cost;
      commission_amount = current.commission_amount;
      profit = current.profit;
      sampleType = current.sampleType;
      isActive = false;
    };

    tests.add(code, disabledTest);

    {
      id = disabledTest.id;
      name = disabledTest.name;
      code = disabledTest.testCode;
      price = disabledTest.price;
      mrp = disabledTest.mrp;
      lab_cost = disabledTest.lab_cost;
      commission_amount = disabledTest.commission_amount;
      profit = disabledTest.profit;
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
      lab_cost = current.lab_cost;
      commission_amount = current.commission_amount;
      profit = current.profit;
      sampleType = current.sampleType;
      isActive = isActive;
    };

    tests.add(testId, updatedTest);

    #ok({
      id = updatedTest.id;
      name = updatedTest.name;
      code = updatedTest.testCode;
      price = updatedTest.price;
      mrp = updatedTest.mrp;
      lab_cost = updatedTest.lab_cost;
      commission_amount = updatedTest.commission_amount;
      profit = updatedTest.profit;
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

  public query ({ caller }) func getUserProfile(user : Principal.Principal) : async ?UserProfile {
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
          mrp = input.mrp;
          lab_cost = input.lab_cost;
          commission_amount = input.commission_amount;
          profit = input.profit;
          isActive = input.isActive;
        };

        tests.add(input.code, test);

        let output : TestOutput = {
          id = test.id;
          name = test.name;
          code = test.testCode;
          price = test.price;
          mrp = test.mrp;
          lab_cost = test.lab_cost;
          commission_amount = test.commission_amount;
          profit = test.profit;
          sampleType = test.sampleType;
          isActive = test.isActive;
        };

        outputList.add(output);
      };
    };
    outputList.toArray();
  };

  /// HOSPITAL MANAGEMENT

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

  func generateAssignmentId(hospitalId : Text, phlebotomist : Principal.Principal) : Text {
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

  public shared ({ caller }) func assignPhlebotomistToHospital(hospitalId : Text, phlebotomist : Principal.Principal) : async HospitalPhlebotomistAssignment {
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

  public shared ({ caller }) func removePhlebotomistFromHospital(hospitalId : Text, phlebotomist : Principal.Principal, removalReason : Text) : async HospitalPhlebotomistAssignment {
    assertLabAdminOrSuperAdmin(caller, "Only LAB_ADMIN or SUPER_ADMIN role can remove phlebotomists from hospitals");

    let assignmentId = generateAssignmentId(hospitalId, phlebotomist);
    let latestAssignment = ensureActiveAssignmentExists(assignmentId, "removePhlebotomistFromHospital");

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

  public query ({ caller }) func getPhlebotomistsByHospital(hospitalId : Text) : async [Principal.Principal] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view phlebotomist assignments");
    };

    let phlebotomists = List.empty<Principal.Principal>();
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

  public query ({ caller }) func getHospitalsByPhlebotomist(phlebotomist : Principal.Principal) : async [Text] {
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

  /////////////////////// SAMPLES ///////////////////////
  public type SampleRecord = {
    sampleId : Text;
    createdByMobile : Text;
    hospitalId : Text;
    tests : [SampleTestItem];
    totalAmount : Nat;
    paymentType : Text;
    status : Text;
    createdAt : Int;
    patientName : Text;
    phone : Text;
    deliveryMethod : ?Text;
  };

  public type SampleTestItem = {
    testId : Text;
    testName : Text;
    testCode : Text;
    price : Nat;
  };

  public type SampleInput = {
    createdByMobile : Text;
    hospitalId : Text;
    tests : [?SampleTestItem];
    totalAmount : Nat;
    paymentType : Text;
    patientName : Text;
    phone : Text;
    deliveryMethod : ?Text;
  };

  public type AppUser = {
    mobile : Text;
    name : Text;
    role : Text;
    assignedHospitalId : ?Text;
    isActive : Bool;
    createdAt : Int;
  };

  public type DashboardMetrics = {
    samplesTotal : Nat;
    samplesToday : Nat;
    revenueToday : Nat;
    activeHospitals : Nat;
    pendingReports : Nat;
    collectionsToday : Nat;
  };

  let samples = Map.empty<Text, SampleRecord>();
  let dailyCounters = Map.empty<Text, Nat>();
  var users = Map.empty<Text, AppUser>();

  public shared ({ caller }) func createSample(input : SampleInput) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create samples");
    };

    let sampleId = await generateSampleId();

    let validatedTests = input.tests.filter(
      func(testOpt) {
        switch (testOpt) {
          case (null) { false };
          case (?_test) { true };
        };
      }
    ).map(
      func(testOpt) {
        testOpt.get({ testId = ""; testName = ""; testCode = ""; price = 0 });
      }
    );

    let sample : SampleRecord = {
      sampleId;
      createdByMobile = input.createdByMobile;
      hospitalId = input.hospitalId;
      tests = validatedTests;
      totalAmount = input.totalAmount;
      paymentType = input.paymentType;
      status = "COLLECTED";
      createdAt = Time.now();
      patientName = input.patientName;
      phone = input.phone;
      deliveryMethod = input.deliveryMethod;
    };

    samples.add(sampleId, sample);
    sampleId;
  };

  func generateSampleId() : async Text {
    let currentDate = Time.now().toText();

    let currentCount = switch (dailyCounters.get(currentDate)) {
      case (null) { 0 };
      case (?count) { count };
    };
    let newCount = currentCount + 1;
    dailyCounters.add(currentDate, newCount);

    let counterStr = createCounterStr(newCount);
    "XRPT-" # currentDate # "-" # counterStr;
  };

  func createCounterStr(count : Nat) : Text {
    let countText = count.toText();
    let countLen = countText.size();

    let zerosNeeded = if (countLen >= 4) { 0 } else { 4 - countLen };
    var zeros = "";
    var i = 0;
    while (i < zerosNeeded) {
      zeros #= "0";
      i += 1;
    };
    zeros # countText;
  };

  func filterSamplesByMobile(mobile : Text) : [SampleRecord] {
    let filteredList = List.empty<SampleRecord>();
    samples.forEach(
      func(v) {
        let sample = v.1;
        if (sample.createdByMobile == mobile) {
          filteredList.add(sample);
        };
      }
    );
    filteredList.toArray().sort(compareByCreatedAt);
  };

  func filterSamplesByHospital(hospitalId : Text) : [SampleRecord] {
    let filteredList = List.empty<SampleRecord>();
    samples.forEach(
      func(v) {
        let sample = v.1;
        if (sample.hospitalId == hospitalId) {
          filteredList.add(sample);
        };
      }
    );
    filteredList.toArray().sort(compareByCreatedAt);
  };

  public query ({ caller }) func getSamplesByMobile(mobile : Text) : async [SampleRecord] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view samples");
    };
    if (not isAdminOrSuperAdmin(caller)) {
      switch (userProfiles.get(caller)) {
        case (null) { Runtime.trap("Unauthorized: User profile not found") };
        case (?profile) {
          if (profile.phone != mobile) {
            Runtime.trap("Unauthorized: Can only view your own samples");
          };
        };
      };
    };

    filterSamplesByMobile(mobile);
  };

  public query ({ caller }) func getSamplesByHospital(hospitalId : Text) : async [SampleRecord] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view samples");
    };

    filterSamplesByHospital(hospitalId);
  };

  public query ({ caller }) func getAllSamples() : async [SampleRecord] {
    assertSuperAdmin(caller, "Only SUPER_ADMIN role can get all samples");
    let allSamples = List.empty<SampleRecord>();
    samples.forEach(
      func(v) {
        let sample = v.1;
        allSamples.add(sample);
      }
    );
    allSamples.toArray().sort(compareByCreatedAt);
  };

  public shared ({ caller }) func updateSampleStatus(sampleId : Text, status : Text) : async { #ok; #notFound } {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update sample status");
    };

    switch (samples.get(sampleId)) {
      case (null) { #notFound };
      case (?sample) {
        let updatedSample : SampleRecord = {
          sample with status;
        };
        samples.add(sampleId, updatedSample);
        #ok;
      };
    };
  };

  public shared ({ caller }) func registerAppUser(mobile : Text, name : Text, role : Text, assignedHospitalId : ?Text) : async AppUser {
    assertSuperAdmin(caller, "Only SUPER_ADMIN role can register app users");
    let user : AppUser = {
      mobile;
      name;
      role;
      assignedHospitalId;
      isActive = true;
      createdAt = Time.now();
    };
    users.add(mobile, user);
    user;
  };

  public query ({ caller }) func getUserByMobile(mobile : Text) : async ?AppUser {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get user data");
    };
    users.get(mobile);
  };

  public query ({ caller }) func getAllAppUsers() : async [AppUser] {
    assertSuperAdmin(caller, "Only SUPER_ADMIN role can get all app users");
    let usersList = List.empty<AppUser>();
    users.forEach(
      func(v) {
        let user = v.1;
        usersList.add(user);
      }
    );
    usersList.toArray();
  };

  public shared ({ caller }) func seedTestUsers() : async Nat {
    assertSuperAdmin(caller, "Only SUPER_ADMIN role can seed test users");
    let testUsers : [AppUser] = [
      { mobile = "9999990001"; name = "Test User 1"; role = "phlebotomist"; assignedHospitalId = null; isActive = true; createdAt = Time.now() },
      { mobile = "9999990002"; name = "Test User 2"; role = "labAdmin"; assignedHospitalId = null; isActive = true; createdAt = Time.now() },
      { mobile = "9999990003"; name = "Test User 3"; role = "patient"; assignedHospitalId = null; isActive = true; createdAt = Time.now() },
    ];

    var addedCount : Nat = 0;

    for (testUser in testUsers.values()) {
      if (not users.containsKey(testUser.mobile)) {
        users.add(testUser.mobile, testUser);
        addedCount += 1;
      };
    };

    addedCount;
  };

  public shared ({ caller }) func deleteTestUser(mobile : Text) : async Bool {
    assertSuperAdmin(caller, "Only SUPER_ADMIN role can delete test users");
    users.remove(mobile);
    true;
  };

  public query ({ caller }) func getDashboardMetrics() : async DashboardMetrics {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get dashboard metrics");
    };

    let currentDate = Time.now().toText();
    var samplesToday = 0;
    var revenueToday = 0;
    var pendingReports = 0;
    var collectionsToday = 0;

    var activeHospitals = 0;
    hospitals.forEach(
      func(_k, hospital) {
        if (hospital.isActive) { activeHospitals += 1 };
      }
    );

    samples.forEach(
      func(_k, sample) {
        if (sample.createdAt.toText() == currentDate) {
          samplesToday += 1;
          revenueToday += sample.totalAmount;
          collectionsToday += sample.totalAmount;
        };

        if (sample.status != "DELIVERED") {
          pendingReports += 1;
        };
      }
    );

    let metrics : DashboardMetrics = {
      samplesTotal = samples.size();
      samplesToday;
      revenueToday;
      activeHospitals;
      pendingReports;
      collectionsToday;
    };

    metrics;
  };

  public shared ({ caller }) func deleteAllSampleData() : async Nat {
    assertSuperAdmin(caller, "Only SUPER_ADMIN role can delete all sample data");
    let deletedCount = samples.size();
    samples.clear();
    deletedCount;
  };

  public shared ({ caller }) func deleteAllData() : async () {
    assertSuperAdmin(caller, "Only SUPER_ADMIN role can delete all data");

    samples.clear();
    tests.clear();
    hospitals.clear();
    tasks.clear();
    dailyCounters.clear();
  };
};
