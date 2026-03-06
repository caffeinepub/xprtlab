import {
  Activity,
  ArrowRight,
  Calendar,
  FileText,
  FlaskConical,
  Home,
} from "lucide-react";
import React from "react";
import MedicalCard from "../../components/shared/MedicalCard";
import { useGetCallerUserProfile } from "../../hooks/useQueries";

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

interface PatientHomePageProps {
  onNavigate: (route: PatientRoute) => void;
}

export default function PatientHomePage({ onNavigate }: PatientHomePageProps) {
  const { data: profile } = useGetCallerUserProfile();

  const quickActions = [
    {
      icon: FlaskConical,
      label: "Book a Test",
      desc: "Schedule diagnostic tests",
      route: "book-test" as PatientRoute,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      icon: Home,
      label: "Home Collection",
      desc: "Request sample pickup",
      route: "home-collection" as PatientRoute,
      color: "text-accent",
      bg: "bg-accent/10",
    },
    {
      icon: FileText,
      label: "My Reports",
      desc: "View lab results",
      route: "reports" as PatientRoute,
      color: "text-secondary",
      bg: "bg-secondary/10",
    },
    {
      icon: Activity,
      label: "My Vitals",
      desc: "Track health metrics",
      route: "my-vitals" as PatientRoute,
      color: "text-primary",
      bg: "bg-primary/10",
    },
  ];

  return (
    <div className="p-4 space-y-5">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-5 text-white shadow-lg">
        <p className="text-white/80 text-sm">Welcome back,</p>
        <h2 className="text-2xl font-bold mt-0.5">
          {profile?.name || "Patient"} 👋
        </h2>
        <p className="text-white/70 text-sm mt-1">How can we help you today?</p>
      </div>

      {/* Quick Actions */}
      <section>
        <h3 className="text-base font-semibold text-foreground mb-3">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map(({ icon: Icon, label, desc, route, color, bg }) => (
            <MedicalCard
              key={route}
              onClick={() => onNavigate(route)}
              className="p-4 cursor-pointer hover:shadow-md transition-shadow"
            >
              <div
                className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-3`}
              >
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <p className="font-semibold text-sm text-foreground leading-tight">
                {label}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
            </MedicalCard>
          ))}
        </div>
      </section>

      {/* My Bookings Shortcut */}
      <section>
        <button
          type="button"
          onClick={() => onNavigate("my-bookings")}
          className="w-full flex items-center justify-between bg-card border border-border rounded-2xl p-4 hover:bg-muted/30 transition-colors shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-sm text-foreground">
                My Bookings
              </p>
              <p className="text-xs text-muted-foreground">
                View all your appointments
              </p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-muted-foreground" />
        </button>
      </section>

      {/* Home Collections Shortcut */}
      <section>
        <button
          type="button"
          onClick={() => onNavigate("my-home-collections")}
          className="w-full flex items-center justify-between bg-card border border-border rounded-2xl p-4 hover:bg-muted/30 transition-colors shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <Home className="w-5 h-5 text-accent" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-sm text-foreground">
                Home Collections
              </p>
              <p className="text-xs text-muted-foreground">
                Track your pickup requests
              </p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-muted-foreground" />
        </button>
      </section>
    </div>
  );
}
