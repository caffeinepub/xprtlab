import { BarChart3, FlaskConical, Loader2, Shield } from "lucide-react";
import type React from "react";
import { useInternetIdentity } from "../../hooks/useInternetIdentity";
import type { AppRole } from "../../types/models";

interface StaffLoginScreenProps {
  onDemoMode?: (role: AppRole) => void;
}

export default function StaffLoginScreen({
  onDemoMode,
}: StaffLoginScreenProps) {
  const { login, loginStatus, identity } = useInternetIdentity();

  const isLoggingIn = loginStatus === "logging-in";
  const isAuthenticated = !!identity;

  const demoRoles: {
    role: AppRole;
    label: string;
    icon: React.ReactNode;
    color: string;
  }[] = [
    {
      role: "phlebotomist",
      label: "Phlebotomist",
      icon: <FlaskConical className="h-4 w-4" />,
      color: "bg-blue-50 border-blue-200 text-blue-700",
    },
    {
      role: "labAdmin",
      label: "Lab Admin",
      icon: <BarChart3 className="h-4 w-4" />,
      color: "bg-purple-50 border-purple-200 text-purple-700",
    },
    {
      role: "superAdmin",
      label: "Super Admin",
      icon: <Shield className="h-4 w-4" />,
      color: "bg-red-50 border-red-200 text-red-700",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-sm space-y-6">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3">
          <img
            src="/assets/logo-1.png"
            alt="Xpertlab"
            className="h-14 w-auto object-contain"
          />
          <p className="text-sm text-muted-foreground font-medium text-center">
            Staff Portal
          </p>
        </div>

        {/* Role Info */}
        <div className="bg-muted/50 rounded-xl p-3 space-y-1.5">
          <p className="text-xs font-bold text-foreground">Access Levels:</p>
          {[
            {
              icon: <FlaskConical className="h-3 w-3" />,
              label: "Phlebotomist — Sample collection & attendance",
            },
            {
              icon: <BarChart3 className="h-3 w-3" />,
              label: "Lab Admin — Bookings, reports & billing",
            },
            {
              icon: <Shield className="h-3 w-3" />,
              label: "Super Admin — Full system access",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 text-xs text-muted-foreground"
            >
              <span className="text-primary">{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        {/* Sign In */}
        <button
          type="button"
          onClick={login}
          disabled={isLoggingIn || isAuthenticated}
          className="w-full py-3 rounded-xl bg-primary text-white font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50 hover:bg-primary/90 transition-colors shadow-sm"
        >
          {isLoggingIn ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Signing in...
            </>
          ) : (
            <>
              <Shield className="h-4 w-4" /> Sign In with Internet Identity
            </>
          )}
        </button>

        {/* Demo Mode */}
        {onDemoMode && (
          <>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs font-semibold text-muted-foreground">
                OR TRY DEMO MODE
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {demoRoles.map(({ role, label, icon, color }) => (
                <button
                  type="button"
                  key={role}
                  onClick={() => onDemoMode(role)}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border font-semibold text-xs transition-colors hover:opacity-80 ${color}`}
                >
                  {icon}
                  <span className="text-center leading-tight">{label}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
