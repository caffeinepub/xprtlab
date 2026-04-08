import React, { useEffect, useState } from "react";
import { getUserByMobile } from "../../services/backendService";
import { saveSession } from "../../utils/sessionUtils";
import HealthcareBg from "../shared/HealthcareBg";
import OTPLoginScreen from "./OTPLoginScreen";

export default function StaffLoginScreen() {
  const [authError, setAuthError] = useState("");

  // Clear stale session only when on the login/root path
  useEffect(() => {
    const path = window.location.pathname;
    if (path === "/" || path === "/login") {
      localStorage.removeItem("xpertlab_session");
    }
  }, []);

  const handleOTPSuccess = async (mobile: string) => {
    setAuthError("");
    try {
      const user = await getUserByMobile(mobile);
      if (!user) {
        setAuthError("Account not found. Please contact administrator.");
        return;
      }

      console.log("USER:", user);

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

      console.log("Session after login:", session);
      saveSession(session);
      console.log(
        "SESSION:",
        JSON.parse(localStorage.getItem("xpertlab_session") || "{}"),
      );

      // Role-based navigation
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
