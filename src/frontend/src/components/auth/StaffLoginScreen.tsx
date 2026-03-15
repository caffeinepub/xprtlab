import { BarChart3, FlaskConical, Shield } from "lucide-react";
import type React from "react";
import { useSystemMode } from "../../hooks/useSystemMode";
import type { AppRole } from "../../types/models";
import HealthcareBg from "../shared/HealthcareBg";
import OTPLoginScreen from "./OTPLoginScreen";

interface StaffLoginScreenProps {
  onDemoMode?: (role: AppRole) => void;
}

export default function StaffLoginScreen({
  onDemoMode,
}: StaffLoginScreenProps) {
  const { systemMode, isTestMode } = useSystemMode();

  // Demo role buttons only show when NOT in test mode and NOT in production mode
  const showDemoButtons =
    !isTestMode && systemMode !== "production" && !!onDemoMode;

  // OTP 123456 works in demo mode and test mode; disabled only in production
  const isDemoMode = systemMode !== "production";

  const demoRoles: {
    role: AppRole;
    label: string;
    icon: React.ReactNode;
    color: string;
    bg: string;
    border: string;
  }[] = [
    {
      role: "phlebotomist",
      label: "Phlebotomist",
      icon: <FlaskConical className="h-5 w-5" />,
      color: "#1565C0",
      bg: "#EFF6FF",
      border: "#BFDBFE",
    },
    {
      role: "labAdmin",
      label: "Lab Admin",
      icon: <BarChart3 className="h-5 w-5" />,
      color: "#7C3AED",
      bg: "#F5F3FF",
      border: "#DDD6FE",
    },
    {
      role: "superAdmin",
      label: "Super Admin",
      icon: <Shield className="h-5 w-5" />,
      color: "#B91C1C",
      bg: "#FEF2F2",
      border: "#FECACA",
    },
  ];

  const handleOTPSuccess = (_mobile: string) => {
    try {
      const stored = localStorage.getItem("xpertlab_demo_user");
      if (stored) {
        const parsed = JSON.parse(stored);
        const role = parsed.role as AppRole;
        if (role && onDemoMode) {
          onDemoMode(role);
          return;
        }
      }
    } catch {
      // ignore parse errors
    }
    if (onDemoMode) {
      onDemoMode("phlebotomist");
    }
  };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center p-4"
      style={{ background: "#F7F9FC" }}
    >
      <HealthcareBg variant="default" opacity={0.04} />

      <div className="relative z-10 w-full max-w-sm">
        {/* Logo header */}
        <div className="flex flex-col items-center mb-6">
          <div
            className="bg-white rounded-2xl px-5 py-3.5 shadow-md mb-4"
            style={{ boxShadow: "0 8px 24px rgba(37,99,235,0.10)" }}
          >
            <img
              src="/assets/logo.png"
              alt="XpertLab"
              className="h-[36px] w-auto object-contain"
            />
          </div>
          <div className="text-center">
            <h1
              className="font-bold text-gray-900"
              style={{ fontSize: "20px" }}
            >
              Staff Secure Login
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Enter your mobile number to continue
            </p>
          </div>
        </div>

        {/* Login card */}
        <div
          className="bg-white rounded-2xl p-6 space-y-5"
          style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
        >
          <OTPLoginScreen
            isDemoMode={isDemoMode}
            onSuccess={handleOTPSuccess}
          />

          {/* Demo Mode Role Picker - hidden in test/production mode */}
          {showDemoButtons && (
            <>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Quick Demo
                </span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>
              <div className="space-y-2">
                <p className="text-xs text-center text-gray-500">
                  Select a role to jump directly into demo mode
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {demoRoles.map(
                    ({ role, label, icon, color, bg, border }, idx) => (
                      <button
                        type="button"
                        key={role}
                        onClick={() => onDemoMode!(role)}
                        data-ocid={`login.demo_button.${idx + 1}`}
                        className="flex flex-col items-center gap-1.5 p-3 rounded-xl border font-semibold text-xs transition-all hover:opacity-80 active:scale-95"
                        style={{ color, background: bg, borderColor: border }}
                      >
                        {icon}
                        <span className="text-center leading-tight">
                          {label}
                        </span>
                      </button>
                    ),
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
