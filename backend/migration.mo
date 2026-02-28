import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import List "mo:core/List";
import Text "mo:core/Text";

module {
  type OldUserProfile = {
    name : Text;
    appRole : {
      #patient;
      #phlebotomist;
      #labAdmin;
      #superAdmin;
    };
    phone : Text;
  };

  type OldHospital = {
    id : Text;
    name : Text;
    address : Text;
  };

  type OldActor = {
    hospitals : Map.Map<Text, OldHospital>;
    userProfiles : Map.Map<Principal, OldUserProfile>;
  };

  type NewUserProfile = {
    name : Text;
    appRole : {
      #patient;
      #phlebotomist;
      #labAdmin;
      #superAdmin;
    };
    phone : Text;
    area : ?Text;
  };

  type NewHospital = {
    id : Text;
    name : Text;
    city : Text;
    address : Text;
    area : Text;
    contactNumber : Text;
    isActive : Bool;
    createdAt : Int;
  };

  type HospitalPhlebotomistAssignment = {
    hospitalId : Text;
    phlebotomist : Principal;
    assignedBy : Principal;
    assignedAt : Int;
    isActive : Bool;
    removedAt : ?Int;
    removalReason : ?Text;
  };

  type NewActor = {
    hospitals : Map.Map<Text, NewHospital>;
    userProfiles : Map.Map<Principal, NewUserProfile>;
    assignments : Map.Map<Text, [HospitalPhlebotomistAssignment]>;
  };

  public func run(old : OldActor) : NewActor {
    let newHospitals = old.hospitals.map<Text, OldHospital, NewHospital>(
      func(_id, oldHospital) {
        {
          id = oldHospital.id;
          name = oldHospital.name;
          city = "";
          address = oldHospital.address;
          area = "";
          contactNumber = "";
          isActive = true;
          createdAt = Time.now();
        };
      }
    );

    let newUserProfiles = old.userProfiles.map<Principal, OldUserProfile, NewUserProfile>(
      func(_principal, oldProfile) {
        { oldProfile with area = null };
      }
    );

    let emptyAssignments = Map.empty<Text, [HospitalPhlebotomistAssignment]>();

    {
      hospitals = newHospitals;
      userProfiles = newUserProfiles;
      assignments = emptyAssignments;
    };
  };
};

