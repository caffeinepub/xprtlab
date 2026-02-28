import Map "mo:core/Map";
import Text "mo:core/Text";
import Principal "mo:core/Principal";

module {
  type HospitalPhlebotomistAssignment = {
    hospitalId : Text;
    phlebotomist : Principal;
    assignedBy : Principal;
    assignedAt : Int;
    isActive : Bool;
    removedAt : ?Int;
    removalReason : ?Text;
  };

  type OldActor = {
    assignedHospitals : Map.Map<Text, [Text]>;
    assignments : Map.Map<Text, [HospitalPhlebotomistAssignment]>;
  };

  type NewActor = {
    assignments : Map.Map<Text, [HospitalPhlebotomistAssignment]>;
  };

  public func run(old : OldActor) : NewActor {
    { assignments = old.assignments };
  };
};
