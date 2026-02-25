import Map "mo:core/Map";
import Text "mo:core/Text";

module {
  type OldActor = {}; // Empty old actor type for migration

  type Hospital = {
    id : Text;
    name : Text;
    address : Text;
  };

  type NewActor = {
    hospitals : Map.Map<Text, Hospital>;
    assignedHospitals : Map.Map<Text, [Text]>;
  };

  public func run(_ : OldActor) : NewActor {
    let hospitals = Map.empty<Text, Hospital>(); // Initialize new empty hospitals structure
    let assignedHospitals = Map.empty<Text, [Text]>(); // Initialize new empty assigned hospitals structure
    {
      hospitals;
      assignedHospitals;
    };
  };
};
