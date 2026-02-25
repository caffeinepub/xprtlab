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
import Migration "migration";

// Persistent actor with data migration enabled
(with migration = Migration.run)
actor {
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

  type Hospital = {
    id : Text;
    name : Text;
    address : Text;
  };

  include MixinStorage();

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
  let hospitals = Map.empty<Text, Hospital>();
  let assignedHospitals = Map.empty<Text, [Text]>();

  let allowedDiscountPercentage = 20.0;
  let maxDistance = 100.0;

  public query ({ caller }) func getAssignedHospitals() : async [Hospital] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only phlebotomists can get assigned hospitals");
    };

    let assignedIds = assignedHospitals.get(caller.toText());
    switch (assignedIds) {
      case (null) { [] };
      case (?ids) {
        let hospitalsArray = hospitals.values().toArray();
        let idsList = List.fromArray(ids);
        let result = List.empty<Hospital>();
        hospitalsArray.forEach(
          func(hospital) {
            if (idsList.contains(hospital.id)) {
              result.add(hospital);
            };
          }
        );
        result.toArray();
      };
    };
  };

  public query ({ caller }) func getTodaySummary() : async {
    totalSamplesCollected : Nat;
    cashCollected : Float;
    upiCollected : Float;
    pendingAmount : Float;
  } {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only phlebotomists can get summary");
    };

    let now = Time.now();
    let startOfDay = now - (now % 86400000000000);

    let todaySamples = switch (hospitalSamples.isEmpty()) {
      case (true) { [] };
      case (false) {
        let samplesList = List.empty<HospitalSample>();
        hospitalSamples.entries().forEach(
          func((id, sample)) {
            if (sample.phlebotomistId == caller.toText() and sample.createdAt >= startOfDay) {
              samplesList.add(sample);
            };
          }
        );
        samplesList.toArray();
      };
    };

    let totalSamples = todaySamples.size();

    let totals = todaySamples.foldLeft(
      {
        cash = 0.0;
        upi = 0.0;
        pending = 0.0;
      },
      func(acc, sample) {
        let currentCash = if (sample.paymentMode == "CASH") {
          sample.amountReceived;
        } else {
          0.0;
        };

        let currentUpi = if (sample.paymentMode == "UPI") {
          sample.amountReceived;
        } else {
          0.0;
        };

        {
          cash = acc.cash + currentCash;
          upi = acc.upi + currentUpi;
          pending = acc.pending + sample.pendingAmount;
        };
      },
    );

    {
      totalSamplesCollected = totalSamples;
      cashCollected = totals.cash;
      upiCollected = totals.upi;
      pendingAmount = totals.pending;
    };
  };
};
