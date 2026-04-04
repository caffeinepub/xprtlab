import { Loader2, Shield } from "lucide-react";
import React, { useEffect, useState } from "react";
import { createActorWithConfig } from "../../config";
import { useInternetIdentity } from "../../hooks/useInternetIdentity";
import {
  claimSuperAdmin,
  getUserByMobile,
  setAuthenticatedActor,
} from "../../services/backendService";
import { saveSession } from "../../utils/sessionUtils";
import HealthcareBg from "../shared/HealthcareBg";
import OTPLoginScreen from "./OTPLoginScreen";

export default function StaffLoginScreen() {
  const { login, isLoggingIn, isLoginSuccess, loginError, identity } =
    useInternetIdentity();
  const [authError, setAuthError] = useState("");

  // Only clear stale session when we are actually on the login/root path.
  // Do NOT clear unconditionally — this was causing the login loop when the
  // component remounted after a successful login on /admin-app or /staff-app.
  useEffect(() => {
    const path = window.location.pathname;
    if (path === "/" || path === "/login") {
      localStorage.removeItem("xpertlab_session");
    }
  }, []);

  // Handle Internet Identity success
  useEffect(() => {
    if (!isLoginSuccess || !identity) return;

    const principal = identity.getPrincipal().toText();
    console.log("Logged in principal:", principal);

    (window as any).ic = (window as any).ic || {};
    (window as any).ic.identity = identity;

    (async () => {
      try {
        const authActor = await createActorWithConfig({
          agentOptions: { identity },
        });
        setAuthenticatedActor(authActor);
        console.log("Identity:", identity);
      } catch (e) {
        console.warn("Failed to create authenticated actor:", e);
      }

      try {
        const result = await claimSuperAdmin();
        if ("ok" in result) {
          console.log("Super admin claimed:", result.ok);
        } else {
          console.log("claimSuperAdmin info:", result.err);
        }
      } catch (e) {
        console.warn("claimSuperAdmin call failed (non-critical):", e);
      }

      localStorage.clear();
      saveSession({
        userId: principal,
        role: "superAdmin",
        loginType: "identity",
        loginAt: Date.now(),
      });
      console.log(
        "Session after login:",
        localStorage.getItem("xpertlab_session"),
      );
      window.location.href = "/admin-app";
    })();
  }, [isLoginSuccess, identity]);

  const handleOTPSuccess = async (mobile: string) => {
    setAuthError("");
    try {
      const user = await getUserByMobile(mobile);
      if (!user) {
        setAuthError("Account not found. Please contact administrator.");
        return;
      }

      console.log("User from backend:", user);

      // Map backend role strings to AppRole values
      const roleMap: Record<string, string> = {
        super_admin: "superAdmin",
        lab_admin: "labAdmin",
        phlebotomist: "phlebotomist",
      };

      const mappedRole = roleMap[user.role];
      if (!mappedRole) {
        setAuthError("Invalid role. Please contact administrator.");
        return;
      }

      // Clear all old data before saving new session
      localStorage.clear();
      const session = {
        userId: mobile,
        mobileNumber: mobile,
        mobile,
        role: mappedRole as
          | "phlebotomist"
          | "labAdmin"
          | "superAdmin"
          | "patient",
        loginType: "otp" as const,
        loginAt: Date.now(),
        assignedHospitalId: user.assignedHospitalId || "",
      };
      console.log("USER:", user);
      console.log(
        "SESSION:",
        JSON.parse(localStorage.getItem("xpertlab_session") || "{}"),
      );
      console.log("Session after login:", session);
      saveSession(session);

      // Role-based navigation — always use window.location for hard nav
      if (user.role === "super_admin") {
        window.location.href = "/admin-app";
      } else if (user.role === "lab_admin") {
        window.location.href = "/staff-app";
      } else if (user.role === "phlebotomist") {
        window.location.href = "/staff-app";
      } else {
        setAuthError("Invalid role. Please contact administrator.");
      }
    } catch (e) {
      console.error("Login error:", e);
      setAuthError("Login failed. Please try again.");
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
            <p className="text-sm text-gray-500 mt-1">Sign in to continue</p>
          </div>
        </div>

        {/* Login card */}
        <div
          className="bg-white rounded-2xl p-6 space-y-5"
          style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
        >
          {/* Internet Identity Button */}
          <button
            type="button"
            onClick={login}
            disabled={isLoggingIn}
            data-ocid="login.primary_button"
            className="w-full flex items-center justify-center gap-3 h-12 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
            style={{
              background: "linear-gradient(to right, #2563EB, #06B6D4)",
            }}
          >
            {isLoggingIn ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Shield className="h-4 w-4" />
            )}
            Continue with Internet Identity
          </button>

          {loginError && (
            <p className="text-xs text-red-600 text-center">
              {loginError.message}
            </p>
          )}

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              OR
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* OTP Login */}
          <OTPLoginScreen onSuccess={handleOTPSuccess} />

          {authError && (
            <div
              className="mt-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3"
              data-ocid="login.error_state"
            >
              <p className="text-xs text-red-700 font-medium">{authError}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
