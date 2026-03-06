import { Activity, Droplets, Heart } from "lucide-react";
import React from "react";
import MedicalCard from "../../components/shared/MedicalCard";

type PatientRoute =
  | "home"
  | "book-test"
  | "slot-selection"
  | "my-bookings"
  | "home-collection"
  | "my-home-collections"
  | "reports"
  | "my-vitals"
  | "profile";

interface MyVitalsPageProps {
  onNavigate: (route: PatientRoute) => void;
}

export default function MyVitalsPage({ onNavigate }: MyVitalsPageProps) {
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onNavigate("home")}
          className="text-muted-foreground hover:text-foreground"
        >
          ←
        </button>
        <h1 className="text-lg font-bold text-foreground">My Vitals</h1>
      </div>

      <div className="text-center py-12 text-muted-foreground">
        <Activity className="w-12 h-12 mx-auto mb-3 opacity-30" />
        <p className="font-medium">No vitals recorded yet</p>
        <p className="text-sm mt-1">
          Your health vitals will appear here once recorded by a phlebotomist
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <MedicalCard className="p-4 text-center">
          <Heart className="w-6 h-6 text-destructive mx-auto mb-2" />
          <p className="text-xs text-muted-foreground">Blood Pressure</p>
          <p className="text-sm font-bold text-foreground mt-1">— / —</p>
          <p className="text-xs text-muted-foreground">mmHg</p>
        </MedicalCard>
        <MedicalCard className="p-4 text-center">
          <Droplets className="w-6 h-6 text-accent mx-auto mb-2" />
          <p className="text-xs text-muted-foreground">Blood Glucose</p>
          <p className="text-sm font-bold text-foreground mt-1">—</p>
          <p className="text-xs text-muted-foreground">mg/dL</p>
        </MedicalCard>
      </div>
    </div>
  );
}
