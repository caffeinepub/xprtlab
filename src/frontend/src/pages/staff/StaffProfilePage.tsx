import { Eye, EyeOff, Lock, LogOut, Save, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Session {
  userId?: string;
  mobileNumber?: string;
  role?: string;
  name?: string;
  loginType?: string;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function getRoleLabel(role?: string): string {
  switch (role) {
    case "phlebotomist":
      return "Phlebotomist";
    case "labAdmin":
      return "Lab Admin";
    case "superAdmin":
      return "Super Admin";
    default:
      return role ?? "Staff";
  }
}

function getAssignedHospital(mobile?: string, role?: string): string {
  if (!mobile) return "—";
  try {
    if (role === "phlebotomist") {
      const raw = localStorage.getItem("xpertlab_phlebotomists");
      if (raw) {
        const list = JSON.parse(raw) as {
          mobile?: string;
          assignedHospitals?: string[];
          hospitals?: string[];
        }[];
        const found = list.find((p) => p.mobile === mobile);
        const hosp =
          found?.assignedHospitals?.[0] ?? found?.hospitals?.[0] ?? null;
        if (hosp) return hosp;
      }
    }
    if (role === "labAdmin") {
      const raw = localStorage.getItem("xpertlab_lab_admins");
      if (raw) {
        const list = JSON.parse(raw) as {
          mobile?: string;
          assignedHospitals?: string[];
        }[];
        const found = list.find((p) => p.mobile === mobile);
        if (found?.assignedHospitals?.[0]) return found.assignedHospitals[0];
      }
    }
  } catch {
    /* noop */
  }
  return "—";
}

export default function StaffProfilePage({
  onNavigate,
}: {
  onNavigate?: (path: string) => void;
}) {
  const session: Session = (() => {
    try {
      const raw = localStorage.getItem("xpertlab_session");
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  })();

  const name = session.name ?? "Staff User";
  const mobile = session.mobileNumber ?? "";
  const role = session.role;
  const hospital = getAssignedHospital(mobile, role);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSavePassword = () => {
    if (!newPassword || newPassword.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    setSaving(true);
    try {
      const raw = localStorage.getItem("xpertlab_passwords");
      const passwords = raw ? JSON.parse(raw) : {};
      passwords[mobile] = newPassword;
      localStorage.setItem("xpertlab_passwords", JSON.stringify(passwords));
      toast.success("Password updated successfully.");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      toast.error("Failed to save password.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    if (!window.confirm("Are you sure you want to log out?")) return;
    try {
      localStorage.clear();
    } catch (e) {
      console.error(e);
    }
    window.location.replace("/");
  };

  return (
    <div
      style={{ background: "#F7F9FC", minHeight: "100vh", paddingBottom: 24 }}
    >
      {/* Gradient Hero Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #2563EB, #06B6D4)",
          padding: "32px 20px 48px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Healthcare bg decoration */}
        <svg
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            opacity: 0.06,
            width: 160,
            height: 160,
          }}
          viewBox="0 0 100 100"
          fill="white"
          aria-hidden="true"
        >
          <title>Medical cross decoration</title>
          <circle cx="50" cy="50" r="40" />
          <rect x="45" y="20" width="10" height="60" />
          <rect x="20" y="45" width="60" height="10" />
        </svg>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 700,
              color: "white",
              border: "3px solid rgba(255,255,255,0.4)",
            }}
          >
            {getInitials(name)}
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "white", fontSize: 20, fontWeight: 700 }}>
              {name}
            </div>
            <span
              style={{
                display: "inline-block",
                marginTop: 6,
                background: "rgba(255,255,255,0.22)",
                color: "white",
                borderRadius: 20,
                padding: "3px 14px",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              {getRoleLabel(role)}
            </span>
          </div>
        </div>
      </div>

      {/* Profile Info Card */}
      <div style={{ padding: "0 16px", marginTop: -24 }}>
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: 16,
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            padding: 20,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#111827",
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <User className="w-5 h-5" style={{ color: "#2563EB" }} />
            Profile Information
          </div>

          {[
            { label: "Name", value: name },
            { label: "Mobile Number", value: mobile || "—" },
            { label: "Role", value: getRoleLabel(role) },
            { label: "Assigned Hospital", value: hospital },
          ].map((row) => (
            <div
              key={row.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: 12,
                marginBottom: 12,
                borderBottom: "1px solid #F3F4F6",
              }}
            >
              <span style={{ fontSize: 13, color: "#6B7280" }}>
                {row.label}
              </span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>
                {row.value}
              </span>
            </div>
          ))}
        </div>

        {/* Password Update Card */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: 16,
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            padding: 20,
          }}
        >
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#111827",
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Lock className="w-5 h-5" style={{ color: "#2563EB" }} />
            Update Password
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ position: "relative" }}>
              <input
                data-ocid="profile.input"
                type={showNew ? "text" : "password"}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 44px 12px 14px",
                  borderRadius: 10,
                  border: "1.5px solid #E5E7EB",
                  fontSize: 14,
                  outline: "none",
                  background: "#F7F9FC",
                  boxSizing: "border-box",
                }}
              />
              <button
                type="button"
                onClick={() => setShowNew((v) => !v)}
                style={{
                  position: "absolute",
                  right: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#9CA3AF",
                  padding: 0,
                }}
              >
                {showNew ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            <div style={{ position: "relative" }}>
              <input
                data-ocid="profile.textarea"
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 44px 12px 14px",
                  borderRadius: 10,
                  border: "1.5px solid #E5E7EB",
                  fontSize: 14,
                  outline: "none",
                  background: "#F7F9FC",
                  boxSizing: "border-box",
                }}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                style={{
                  position: "absolute",
                  right: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#9CA3AF",
                  padding: 0,
                }}
              >
                {showConfirm ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            <button
              type="button"
              data-ocid="profile.save_button"
              onClick={handleSavePassword}
              disabled={saving}
              style={{
                width: "100%",
                height: 48,
                background: "linear-gradient(135deg, #2563EB, #06B6D4)",
                color: "white",
                border: "none",
                borderRadius: 12,
                fontSize: 15,
                fontWeight: 600,
                cursor: saving ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                opacity: saving ? 0.7 : 1,
                transition: "opacity 200ms",
              }}
            >
              <Save className="w-4 h-4" />
              {saving ? "Saving..." : "Save Password"}
            </button>
          </div>
        </div>

        {onNavigate && (
          <>
            <button
              type="button"
              data-ocid="profile.cancel_button"
              onClick={() => onNavigate("-1")}
              style={{
                width: "100%",
                marginTop: 12,
                height: 44,
                background: "transparent",
                border: "1.5px solid #E5E7EB",
                borderRadius: 12,
                fontSize: 14,
                fontWeight: 600,
                color: "#6B7280",
                cursor: "pointer",
              }}
            >
              ← Go Back
            </button>

            <button
              type="button"
              data-ocid="profile.delete_button"
              onClick={handleLogout}
              style={{
                width: "100%",
                marginTop: 10,
                height: 48,
                background: "#EF4444",
                color: "white",
                border: "none",
                borderRadius: 12,
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                boxShadow: "0 4px 12px rgba(239,68,68,0.25)",
              }}
            >
              <LogOut className="w-4 h-4" />
              Log Out
            </button>
          </>
        )}
      </div>
    </div>
  );
}
