import { useQueryClient } from "@tanstack/react-query";
import { Activity, FileText, FlaskConical, Heart, Home } from "lucide-react";
import React from "react";
import { useInternetIdentity } from "../../hooks/useInternetIdentity";
import GradientButton from "../shared/GradientButton";
import HealthcareBg from "../shared/HealthcareBg";

interface PatientLoginScreenProps {
  showRoleError?: boolean;
}

export default function PatientLoginScreen({
  showRoleError = false,
}: PatientLoginScreenProps) {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const isLoggingIn = loginStatus === "logging-in";

  const handleLogin = async () => {
    if (identity) {
      await clear();
      queryClient.clear();
      return;
    }
    try {
      await login();
    } catch (error: any) {
      if (error?.message === "User is already authenticated") {
        await clear();
        setTimeout(() => login(), 300);
      }
    }
  };

  const features = [
    {
      icon: FlaskConical,
      label: "Book Diagnostic Tests",
      desc: "Choose from 100+ tests",
    },
    {
      icon: Home,
      label: "Home Collection",
      desc: "Sample pickup at your door",
    },
    {
      icon: FileText,
      label: "Digital Reports",
      desc: "Access reports anytime",
    },
    {
      icon: Activity,
      label: "Health Vitals",
      desc: "Track BP, glucose & more",
    },
  ];

  return (
    <div
      className="relative min-h-screen flex flex-col"
      style={{
        background:
          "linear-gradient(160deg, #0D47A1 0%, #1565C0 40%, #26A69A 100%)",
      }}
    >
      <HealthcareBg variant="ecg" opacity={0.04} />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-4 pt-8 pb-4">
        <div className="flex items-center gap-3">
          <div
            className="bg-white rounded-xl px-3 py-2"
            style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}
          >
            <img
              src="/assets/logo.png"
              alt="XpertLab"
              className="h-[36px] w-auto object-contain"
            />
          </div>
        </div>
        <a
          href="/"
          className="text-white/70 text-xs underline hover:text-white transition-colors"
        >
          ← Back
        </a>
      </header>

      {/* Hero image */}
      <div className="relative z-10 px-4 mb-6">
        <div className="rounded-2xl overflow-hidden shadow-xl">
          <img
            src="/assets/generated/hero-banner.dim_1200x400.png"
            alt="XpertLab"
            className="w-full h-36 object-cover"
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center px-4 pb-8">
        <div className="w-full max-w-md">
          {showRoleError && (
            <div className="bg-white/15 border border-white/25 rounded-xl p-4 mb-5 text-center">
              <p className="text-white font-semibold text-sm">
                ⚠️ Staff Account Detected
              </p>
              <p className="text-white/80 text-xs mt-1">
                This app is for patients only. Please use the{" "}
                <a href="/staff-app" className="underline font-medium">
                  XpertLab Staff App
                </a>
                .
              </p>
            </div>
          )}

          {/* Login Card */}
          <div
            className="bg-white rounded-2xl p-6 mb-6"
            style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.18)" }}
          >
            <div className="text-center mb-6">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-md"
                style={{
                  background: "linear-gradient(135deg, #0D47A1, #26A69A)",
                }}
              >
                <Heart className="w-7 h-7 text-white" />
              </div>
              <h2
                className="font-bold text-gray-900 leading-tight"
                style={{ fontSize: "20px" }}
              >
                Your Health. Simplified.
              </h2>
              <p className="text-gray-500 mt-2" style={{ fontSize: "14px" }}>
                Secure access to your diagnostic tests and reports.
              </p>
            </div>

            <GradientButton
              onClick={handleLogin}
              loading={isLoggingIn}
              className="w-full"
              size="lg"
              data-ocid="login.primary_button"
            >
              {isLoggingIn
                ? "Signing in..."
                : identity
                  ? "Sign Out"
                  : "Continue Secure Login"}
            </GradientButton>

            <p className="text-center text-xs text-gray-400 mt-3">
              Secure, private authentication — no passwords needed
            </p>
          </div>

          {/* Features grid */}
          <div className="grid grid-cols-2 gap-3">
            {features.map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="rounded-xl p-3 border"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  backdropFilter: "blur(8px)",
                  borderColor: "rgba(255,255,255,0.2)",
                }}
              >
                <Icon className="w-5 h-5 text-white mb-2" />
                <p className="text-white text-xs font-semibold leading-tight">
                  {label}
                </p>
                <p className="text-white/70 text-xs mt-0.5">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="relative z-10 text-center py-3 text-white/50 text-xs">
        © XpertLab
      </footer>
    </div>
  );
}
