import {
  Activity,
  ArrowRight,
  Calendar,
  FileText,
  FlaskConical,
  Home,
} from "lucide-react";
import React from "react";
import HealthcareBg from "../../components/shared/HealthcareBg";
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
      color: "text-blue-600",
      bg: "bg-blue-50",
      ocid: "patient_home.book_test.card",
    },
    {
      icon: Home,
      label: "Home Collection",
      desc: "Request sample pickup",
      route: "home-collection" as PatientRoute,
      color: "text-green-600",
      bg: "bg-green-50",
      ocid: "patient_home.home_collection.card",
    },
    {
      icon: FileText,
      label: "My Reports",
      desc: "View lab results",
      route: "reports" as PatientRoute,
      color: "text-purple-600",
      bg: "bg-purple-50",
      ocid: "patient_home.reports.card",
    },
    {
      icon: Activity,
      label: "My Vitals",
      desc: "Track health metrics",
      route: "my-vitals" as PatientRoute,
      color: "text-orange-600",
      bg: "bg-orange-50",
      ocid: "patient_home.vitals.card",
    },
  ];

  return (
    <div
      className="relative p-4 space-y-5 page-fade-in"
      style={{ background: "#F7F9FC" }}
    >
      <HealthcareBg variant="minimal" opacity={0.04} />

      <div className="relative z-10 space-y-5">
        {/* Welcome Banner */}
        <div
          className="rounded-2xl p-5 text-white"
          style={{
            background: "linear-gradient(135deg, #0D47A1 0%, #26A69A 100%)",
            boxShadow: "0 8px 24px rgba(13,71,161,0.25)",
          }}
        >
          <p className="text-white/80 text-sm">Welcome back,</p>
          <h2 className="font-bold mt-0.5" style={{ fontSize: "22px" }}>
            {profile?.name || "Patient"} 👋
          </h2>
          <p className="text-white/70 text-sm mt-1">
            How can we help you today?
          </p>
        </div>

        {/* Quick Actions */}
        <section>
          <h3
            className="font-semibold text-foreground mb-3"
            style={{ fontSize: "16px" }}
          >
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map(
              ({ icon: Icon, label, desc, route, color, bg, ocid }) => (
                <MedicalCard
                  key={route}
                  onClick={() => onNavigate(route)}
                  data-ocid={ocid}
                  hoverable
                  style={{ padding: "18px", borderRadius: "16px" }}
                >
                  <div
                    className={`${bg} flex items-center justify-center mb-3`}
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "12px",
                    }}
                  >
                    <Icon className={`w-5 h-5 ${color}`} />
                  </div>
                  <p
                    className="font-semibold text-foreground leading-tight"
                    style={{ fontSize: "15px" }}
                  >
                    {label}
                  </p>
                  <p
                    className="text-muted-foreground mt-0.5"
                    style={{ fontSize: "12px" }}
                  >
                    {desc}
                  </p>
                </MedicalCard>
              ),
            )}
          </div>
        </section>

        {/* My Bookings Shortcut */}
        <section>
          <button
            type="button"
            onClick={() => onNavigate("my-bookings")}
            data-ocid="patient_home.bookings.card"
            className="w-full flex items-center justify-between bg-white rounded-2xl p-4 transition-all duration-200"
            style={{
              borderRadius: "16px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 12px 32px rgba(13,71,161,0.12)";
              (e.currentTarget as HTMLButtonElement).style.transform =
                "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 8px 24px rgba(0,0,0,0.08)";
              (e.currentTarget as HTMLButtonElement).style.transform = "";
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="bg-blue-50 flex items-center justify-center flex-shrink-0"
                style={{ width: "42px", height: "42px", borderRadius: "12px" }}
              >
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-left">
                <p
                  className="font-semibold text-foreground"
                  style={{ fontSize: "15px" }}
                >
                  My Bookings
                </p>
                <p
                  className="text-muted-foreground"
                  style={{ fontSize: "12px" }}
                >
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
            data-ocid="patient_home.home_collections.card"
            className="w-full flex items-center justify-between bg-white rounded-2xl p-4 transition-all duration-200"
            style={{
              borderRadius: "16px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 12px 32px rgba(13,71,161,0.12)";
              (e.currentTarget as HTMLButtonElement).style.transform =
                "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 8px 24px rgba(0,0,0,0.08)";
              (e.currentTarget as HTMLButtonElement).style.transform = "";
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="bg-green-50 flex items-center justify-center flex-shrink-0"
                style={{ width: "42px", height: "42px", borderRadius: "12px" }}
              >
                <Home className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-left">
                <p
                  className="font-semibold text-foreground"
                  style={{ fontSize: "15px" }}
                >
                  Home Collections
                </p>
                <p
                  className="text-muted-foreground"
                  style={{ fontSize: "12px" }}
                >
                  Track your pickup requests
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
          </button>
        </section>
      </div>
    </div>
  );
}
