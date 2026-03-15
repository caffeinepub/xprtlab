import { Loader2, Phone, Shield } from "lucide-react";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";

interface OTPLoginScreenProps {
  isDemoMode?: boolean;
  onSuccess: (mobile: string) => void;
}

type Step = "mobile" | "otp";

const DEMO_OTP = "123456";
const OTP_EXPIRY_SECONDS = 300; // 5 minutes
const RESEND_COOLDOWN_SECONDS = 30;
const MAX_ATTEMPTS = 3;

export default function OTPLoginScreen({
  isDemoMode = false,
  onSuccess,
}: OTPLoginScreenProps) {
  const [step, setStep] = useState<Step>("mobile");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Timers
  const [resendCooldown, setResendCooldown] = useState(0);
  const [otpExpiry, setOtpExpiry] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const resendTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const expiryTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimers = useCallback(() => {
    if (resendTimerRef.current) clearInterval(resendTimerRef.current);
    if (expiryTimerRef.current) clearInterval(expiryTimerRef.current);
  }, []);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  const startTimers = useCallback(() => {
    clearTimers();

    setResendCooldown(RESEND_COOLDOWN_SECONDS);
    setOtpExpiry(OTP_EXPIRY_SECONDS);

    resendTimerRef.current = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          if (resendTimerRef.current) clearInterval(resendTimerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    expiryTimerRef.current = setInterval(() => {
      setOtpExpiry((prev) => {
        if (prev <= 1) {
          if (expiryTimerRef.current) clearInterval(expiryTimerRef.current);
          setError("OTP has expired. Please request a new one.");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [clearTimers]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleSendOTP = async () => {
    if (mobile.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setError("");
    setIsLoading(true);

    // Simulate OTP send (demo mode or real backend)
    await new Promise((r) => setTimeout(r, 800));
    setIsLoading(false);
    setAttempts(0);
    setOtp(["", "", "", "", "", ""]);
    setStep("otp");
    startTimers();

    // Auto-focus first OTP input
    setTimeout(() => otpInputRefs.current[0]?.focus(), 100);
  };

  const handleOtpChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    setError("");

    if (digit && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
    if (e.key === "Enter") {
      handleVerifyOTP();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (pasted.length === 6) {
      const newOtp = pasted.split("");
      setOtp(newOtp);
      otpInputRefs.current[5]?.focus();
      e.preventDefault();
    }
  };

  const handleVerifyOTP = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) {
      setError("Please enter the complete 6-digit OTP.");
      return;
    }

    if (otpExpiry === 0) {
      setError("OTP has expired. Please request a new one.");
      return;
    }

    if (attempts >= MAX_ATTEMPTS) {
      setError("Maximum attempts reached. Please request a new OTP.");
      return;
    }

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600));

    const isValid = isDemoMode
      ? enteredOtp === DEMO_OTP
      : enteredOtp === DEMO_OTP;

    if (isValid) {
      clearTimers();
      setIsLoading(false);
      onSuccess(mobile);
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setIsLoading(false);
      const remaining = MAX_ATTEMPTS - newAttempts;
      if (remaining > 0) {
        setError(
          `Invalid OTP. ${remaining} attempt${remaining !== 1 ? "s" : ""} remaining.`,
        );
      } else {
        setError("Maximum attempts reached. Please request a new OTP.");
      }
      // Clear OTP input on wrong entry
      setOtp(["", "", "", "", "", ""]);
      setTimeout(() => otpInputRefs.current[0]?.focus(), 50);
    }
  };

  const handleResendOTP = async () => {
    if (resendCooldown > 0) return;
    setError("");
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setIsLoading(false);
    setAttempts(0);
    setOtp(["", "", "", "", "", ""]);
    startTimers();
    setTimeout(() => otpInputRefs.current[0]?.focus(), 100);
  };

  return (
    <div className="w-full space-y-5">
      {/* Demo Mode Banner */}
      {isDemoMode && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 flex items-start gap-2">
          <span className="text-blue-500 text-base leading-none mt-0.5">ℹ️</span>
          <p className="text-xs text-blue-700 font-medium leading-relaxed">
            <strong>Demo Mode</strong> — enter any 10-digit number. OTP is{" "}
            <code className="bg-blue-100 px-1.5 py-0.5 rounded font-mono font-bold">
              123456
            </code>
          </p>
        </div>
      )}

      {step === "mobile" ? (
        <>
          {/* Step 1: Mobile Number */}
          <div className="space-y-3">
            <label
              htmlFor="mobile-input"
              className="block text-sm font-semibold text-gray-700"
            >
              Mobile Number
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Phone className="w-4 h-4" />
              </span>
              <input
                id="mobile-input"
                type="tel"
                inputMode="numeric"
                maxLength={10}
                value={mobile}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                  setMobile(val);
                  setError("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendOTP();
                }}
                placeholder="Enter 10-digit number"
                data-ocid="otp.mobile.input"
                className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
              />
            </div>

            {error && (
              <p
                data-ocid="otp.mobile.error_state"
                className="text-xs text-red-600 font-medium"
              >
                {error}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleSendOTP}
            disabled={isLoading || mobile.length !== 10}
            data-ocid="otp.send_otp.primary_button"
            className="w-full h-12 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
            style={{
              background: "linear-gradient(135deg, #2563EB, #26C6DA)",
            }}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Sending OTP...
              </>
            ) : (
              <>
                <Shield className="w-4 h-4" />
                Send OTP
              </>
            )}
          </button>
        </>
      ) : (
        <>
          {/* Step 2: OTP Verification */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-700">Enter OTP</p>
              {otpExpiry > 0 && (
                <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                  Expires in {formatTime(otpExpiry)}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500">Sent to +91 {mobile}</p>
          </div>

          {/* 6-digit OTP boxes */}
          <div className="flex gap-2 justify-center" data-ocid="otp.otp.input">
            {otp.map((digit, index) => (
              <input
                // biome-ignore lint/suspicious/noArrayIndexKey: stable index
                key={index}
                ref={(el) => {
                  otpInputRefs.current[index] = el;
                }}
                type="tel"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                onPaste={index === 0 ? handleOtpPaste : undefined}
                data-ocid={`otp.digit.input.${index + 1}`}
                className="w-10 h-12 text-center text-lg font-bold rounded-xl border-2 bg-gray-50 transition-all focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                style={{
                  borderColor: digit
                    ? "#2563EB"
                    : error
                      ? "#EF4444"
                      : "#E5E7EB",
                  color: "#2563EB",
                }}
              />
            ))}
          </div>

          {/* Attempts info */}
          {attempts > 0 && attempts < MAX_ATTEMPTS && (
            <p className="text-xs text-amber-600 text-center font-medium">
              {MAX_ATTEMPTS - attempts} attempt
              {MAX_ATTEMPTS - attempts !== 1 ? "s" : ""} remaining
            </p>
          )}

          {error && (
            <p
              data-ocid="otp.verify.error_state"
              className="text-xs text-red-600 font-medium text-center"
            >
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={handleVerifyOTP}
            disabled={
              isLoading ||
              otp.join("").length !== 6 ||
              otpExpiry === 0 ||
              attempts >= MAX_ATTEMPTS
            }
            data-ocid="otp.verify_otp.primary_button"
            className="w-full h-12 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
            style={{
              background:
                isLoading ||
                otp.join("").length !== 6 ||
                otpExpiry === 0 ||
                attempts >= MAX_ATTEMPTS
                  ? "#9CA3AF"
                  : "linear-gradient(135deg, #2563EB, #26C6DA)",
            }}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                <Shield className="w-4 h-4" />
                Verify OTP
              </>
            )}
          </button>

          {/* Resend + Back */}
          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={() => {
                setStep("mobile");
                setOtp(["", "", "", "", "", ""]);
                setError("");
                clearTimers();
              }}
              data-ocid="otp.back.button"
              className="text-xs text-gray-500 hover:text-gray-700 transition-colors underline"
            >
              ← Change number
            </button>

            <button
              type="button"
              onClick={handleResendOTP}
              disabled={resendCooldown > 0 || isLoading}
              data-ocid="otp.resend.button"
              className="text-xs font-semibold transition-colors disabled:cursor-not-allowed"
              style={{
                color: resendCooldown > 0 ? "#9CA3AF" : "#2563EB",
              }}
            >
              {resendCooldown > 0
                ? `Resend in ${resendCooldown}s`
                : "Resend OTP"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
