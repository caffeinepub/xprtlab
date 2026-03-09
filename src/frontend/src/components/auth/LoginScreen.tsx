import { Activity, FileText, FlaskConical, Shield } from "lucide-react";
import React, { useState } from "react";
import OTPLoginScreen from "./OTPLoginScreen";

interface LoginScreenProps {
  onAuthenticated?: () => void;
}

export default function LoginScreen({ onAuthenticated }: LoginScreenProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleOTPSuccess = (_mobile: string) => {
    setIsAuthenticated(true);
    if (onAuthenticated) onAuthenticated();
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-sm text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Login Successful
          </h2>
          <p className="text-sm text-muted-foreground">
            You are now securely logged in.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex flex-col items-center justify-center p-4">
      {/* Logo Card */}
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-sm space-y-6">
        <div className="flex flex-col items-center gap-4">
          <img
            src="/assets/uploads/logo-6-1.png"
            alt="XpertLab"
            className="h-[34px] w-auto object-contain"
            onError={(e) => {
              const img = e.currentTarget;
              img.style.display = "none";
              const fallback = img.nextElementSibling as HTMLElement | null;
              if (fallback) fallback.style.display = "block";
            }}
          />
          <span
            className="hidden text-xl font-extrabold tracking-tight"
            style={{
              background: "linear-gradient(to right, #0D47A1, #26C6DA)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            XpertLab
          </span>
          <div className="text-center">
            <h1 className="text-xl font-bold text-gray-900">Secure Login</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Enter your mobile number to continue
            </p>
          </div>
          <p className="text-xs text-muted-foreground font-medium">
            Phlebotomist Portal
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-3">
          {[
            {
              icon: <FlaskConical className="h-4 w-4" />,
              label: "Sample Collection",
            },
            {
              icon: <Activity className="h-4 w-4" />,
              label: "Vitals Tracking",
            },
            { icon: <FileText className="h-4 w-4" />, label: "Lab Reports" },
            { icon: <Shield className="h-4 w-4" />, label: "Secure Access" },
          ].map((f) => (
            <div
              key={f.label}
              className="flex items-center gap-2 bg-muted/50 rounded-xl p-2.5"
            >
              <span className="text-primary">{f.icon}</span>
              <span className="text-xs font-semibold text-foreground">
                {f.label}
              </span>
            </div>
          ))}
        </div>

        {/* OTP Login */}
        <OTPLoginScreen isDemoMode={true} onSuccess={handleOTPSuccess} />
      </div>
    </div>
  );
}
