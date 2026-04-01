import { r as reactExports, j as jsxRuntimeExports } from "./index-Bcmd4xG5.js";
import { u as ue } from "./index-D4gW9l6B.js";
import { m as resetActorCache } from "./StaffApp-D9cZHpEr.js";
import { U as User } from "./user-CYAWgUBB.js";
import { L as Lock } from "./lock-Db1GqJEM.js";
import { d as createLucideIcon } from "./ProfileSetupModal-dN4aTMS5.js";
import { E as Eye } from "./eye-BVbKFtZY.js";
import { L as LogOut } from "./log-out-BmWY-KRC.js";
import "./clock-akqxMlCy.js";
import "./building-2-CK1Yhuxk.js";
import "./package-xI7MCH8Q.js";
import "./map-pin-CUZHlx4h.js";
import "./search-D-jiUz-0.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f"
    }
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
const EyeOff = createLucideIcon("eye-off", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode);
function getInitials(name) {
  return name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
}
function getRoleLabel(role) {
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
function getAssignedHospital(mobile, role) {
  var _a, _b, _c;
  if (!mobile) return "—";
  try {
    if (role === "phlebotomist") {
      const raw = localStorage.getItem("xpertlab_phlebotomists");
      if (raw) {
        const list = JSON.parse(raw);
        const found = list.find((p) => p.mobile === mobile);
        const hosp = ((_a = found == null ? void 0 : found.assignedHospitals) == null ? void 0 : _a[0]) ?? ((_b = found == null ? void 0 : found.hospitals) == null ? void 0 : _b[0]) ?? null;
        if (hosp) return hosp;
      }
    }
    if (role === "labAdmin") {
      const raw = localStorage.getItem("xpertlab_lab_admins");
      if (raw) {
        const list = JSON.parse(raw);
        const found = list.find((p) => p.mobile === mobile);
        if ((_c = found == null ? void 0 : found.assignedHospitals) == null ? void 0 : _c[0]) return found.assignedHospitals[0];
      }
    }
  } catch {
  }
  return "—";
}
function StaffProfilePage({
  onNavigate
}) {
  const session = (() => {
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
  const [newPassword, setNewPassword] = reactExports.useState("");
  const [confirmPassword, setConfirmPassword] = reactExports.useState("");
  const [showNew, setShowNew] = reactExports.useState(false);
  const [showConfirm, setShowConfirm] = reactExports.useState(false);
  const [saving, setSaving] = reactExports.useState(false);
  const handleSavePassword = () => {
    if (!newPassword || newPassword.length < 6) {
      ue.error("Password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      ue.error("Passwords do not match.");
      return;
    }
    setSaving(true);
    try {
      const raw = localStorage.getItem("xpertlab_passwords");
      const passwords = raw ? JSON.parse(raw) : {};
      passwords[mobile] = newPassword;
      localStorage.setItem("xpertlab_passwords", JSON.stringify(passwords));
      ue.success("Password updated successfully.");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      ue.error("Failed to save password.");
    } finally {
      setSaving(false);
    }
  };
  const handleLogout = () => {
    if (!window.confirm("Are you sure you want to log out?")) return;
    try {
      resetActorCache();
      localStorage.clear();
    } catch (e) {
      console.error(e);
    }
    window.location.replace("/");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: { background: "#F7F9FC", minHeight: "100vh", paddingBottom: 24 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              background: "linear-gradient(135deg, #2563EB, #06B6D4)",
              padding: "32px 20px 48px",
              position: "relative",
              overflow: "hidden"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "svg",
                {
                  style: {
                    position: "absolute",
                    right: 0,
                    top: 0,
                    opacity: 0.06,
                    width: 160,
                    height: 160
                  },
                  viewBox: "0 0 100 100",
                  fill: "white",
                  "aria-hidden": "true",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Medical cross decoration" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "50", cy: "50", r: "40" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "45", y: "20", width: "10", height: "60" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "20", y: "45", width: "60", height: "10" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 12
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: {
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
                          border: "3px solid rgba(255,255,255,0.4)"
                        },
                        children: getInitials(name)
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "center" }, children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "white", fontSize: 20, fontWeight: 700 }, children: name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          style: {
                            display: "inline-block",
                            marginTop: 6,
                            background: "rgba(255,255,255,0.22)",
                            color: "white",
                            borderRadius: 20,
                            padding: "3px 14px",
                            fontSize: 13,
                            fontWeight: 600
                          },
                          children: getRoleLabel(role)
                        }
                      )
                    ] })
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "0 16px", marginTop: -24 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                background: "#FFFFFF",
                borderRadius: 16,
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                padding: 20,
                marginBottom: 16
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      fontSize: 16,
                      fontWeight: 700,
                      color: "#111827",
                      marginBottom: 16,
                      display: "flex",
                      alignItems: "center",
                      gap: 8
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-5 h-5", style: { color: "#2563EB" } }),
                      "Profile Information"
                    ]
                  }
                ),
                [
                  { label: "Name", value: name },
                  { label: "Mobile Number", value: mobile || "—" },
                  { label: "Role", value: getRoleLabel(role) },
                  { label: "Assigned Hospital", value: hospital }
                ].map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingBottom: 12,
                      marginBottom: 12,
                      borderBottom: "1px solid #F3F4F6"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 13, color: "#6B7280" }, children: row.label }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 14, fontWeight: 600, color: "#111827" }, children: row.value })
                    ]
                  },
                  row.label
                ))
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                background: "#FFFFFF",
                borderRadius: 16,
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                padding: 20
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      fontSize: 16,
                      fontWeight: 700,
                      color: "#111827",
                      marginBottom: 16,
                      display: "flex",
                      alignItems: "center",
                      gap: 8
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-5 h-5", style: { color: "#2563EB" } }),
                      "Update Password"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 12 }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "relative" }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        "data-ocid": "profile.input",
                        type: showNew ? "text" : "password",
                        placeholder: "New Password",
                        value: newPassword,
                        onChange: (e) => setNewPassword(e.target.value),
                        style: {
                          width: "100%",
                          padding: "12px 44px 12px 14px",
                          borderRadius: 10,
                          border: "1.5px solid #E5E7EB",
                          fontSize: 14,
                          outline: "none",
                          background: "#F7F9FC",
                          boxSizing: "border-box"
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setShowNew((v) => !v),
                        style: {
                          position: "absolute",
                          right: 12,
                          top: "50%",
                          transform: "translateY(-50%)",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: "#9CA3AF",
                          padding: 0
                        },
                        children: showNew ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "relative" }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        "data-ocid": "profile.textarea",
                        type: showConfirm ? "text" : "password",
                        placeholder: "Confirm Password",
                        value: confirmPassword,
                        onChange: (e) => setConfirmPassword(e.target.value),
                        style: {
                          width: "100%",
                          padding: "12px 44px 12px 14px",
                          borderRadius: 10,
                          border: "1.5px solid #E5E7EB",
                          fontSize: 14,
                          outline: "none",
                          background: "#F7F9FC",
                          boxSizing: "border-box"
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setShowConfirm((v) => !v),
                        style: {
                          position: "absolute",
                          right: 12,
                          top: "50%",
                          transform: "translateY(-50%)",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: "#9CA3AF",
                          padding: 0
                        },
                        children: showConfirm ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      "data-ocid": "profile.save_button",
                      onClick: handleSavePassword,
                      disabled: saving,
                      style: {
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
                        transition: "opacity 200ms"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
                        saving ? "Saving..." : "Save Password"
                      ]
                    }
                  )
                ] })
              ]
            }
          ),
          onNavigate && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": "profile.cancel_button",
                onClick: () => onNavigate("-1"),
                style: {
                  width: "100%",
                  marginTop: 12,
                  height: 44,
                  background: "transparent",
                  border: "1.5px solid #E5E7EB",
                  borderRadius: 12,
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#6B7280",
                  cursor: "pointer"
                },
                children: "← Go Back"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "data-ocid": "profile.delete_button",
                onClick: handleLogout,
                style: {
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
                  boxShadow: "0 4px 12px rgba(239,68,68,0.25)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4" }),
                  "Log Out"
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
}
export {
  StaffProfilePage as default
};
