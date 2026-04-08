import { j as jsxRuntimeExports, r as reactExports } from "./index-BK7lPPsB.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-ByyORR1A.js";
import { u as ue } from "./index-Be0uMqXm.js";
import { P as PageHeroHeader } from "./PageHeroHeader-UaovnKFJ.js";
import { i as useHospitals } from "./useQueries-BMbaoAfY.js";
import { k as getAllAppUsers, r as registerAppUser } from "./StaffApp-CfX1i34b.js";
import { F as FlaskConical } from "./flask-conical-DtVlMrm9.js";
import { S as Shield, U as User } from "./sessionUtils-LZZGFXI5.js";
import { P as Plus } from "./plus-DplFQ6eN.js";
import { P as Pen } from "./pen-N9dnGyPJ.js";
import { c as createLucideIcon } from "./createLucideIcon-s8YgMXFI.js";
import { U as UserCheck } from "./user-check-Czg6H0I9.js";
import { X } from "./x-BZ3r2hsm.js";
import { C as ChevronUp, a as ChevronDown } from "./chevron-up-gMzxD18y.js";
import "./index-B-aSBqD5.js";
import "./index-CF10SUlR.js";
import "./index-BExKIHfZ.js";
import "./utils-KmUdzQwa.js";
import "./clsx-DgYk2OaC.js";
import "./HealthcareBg-T8Kj1xzZ.js";
import "./loader-circle-zhFaIokB.js";
import "./clock-BqS4pGGT.js";
import "./building-2-CNp2QmKX.js";
import "./package-6TDstU0_.js";
import "./file-text-CFCimBJ5.js";
import "./map-pin-BE2sXuKA.js";
import "./house-8jM1cFHV.js";
import "./search-Cu2LYKjw.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "17", x2: "22", y1: "8", y2: "13", key: "3nzzx3" }],
  ["line", { x1: "22", x2: "17", y1: "8", y2: "13", key: "1swrse" }]
];
const UserX = createLucideIcon("user-x", __iconNode);
function StatusBadge({ status }) {
  if (status === "Active") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-100", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-green-500 inline-block" }),
      "Active"
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-500 border border-gray-200", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-gray-400 inline-block" }),
    "Disabled"
  ] });
}
function MultiSelect({
  options,
  selected,
  onChange,
  placeholder
}) {
  const [open, setOpen] = reactExports.useState(false);
  const ref = reactExports.useRef(null);
  reactExports.useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target))
        setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);
  const toggle = (opt) => {
    if (selected.includes(opt)) {
      onChange(selected.filter((s) => s !== opt));
    } else {
      onChange([...selected, opt]);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref, className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setOpen((o) => !o),
        className: "w-full flex items-center justify-between gap-2 px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-left",
        style: { background: "#F7F9FC" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-600 truncate", children: selected.length === 0 ? placeholder ?? "Select hospitals..." : selected.join(", ") }),
          open ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4 text-gray-400 flex-shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-gray-400 flex-shrink-0" })
        ]
      }
    ),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute z-50 left-0 right-0 mt-1 bg-white border border-gray-100 rounded-xl overflow-hidden",
        style: { boxShadow: "0 8px 24px rgba(0,0,0,0.12)" },
        children: options.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-3 py-3 text-xs text-gray-400", children: "No hospitals available" }) : options.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => toggle(opt),
            className: "w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-gray-50 text-sm transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-4 h-4 rounded border flex items-center justify-center flex-shrink-0",
                  style: {
                    borderColor: selected.includes(opt) ? "#2563EB" : "#D1D5DB",
                    background: selected.includes(opt) ? "#2563EB" : "#fff"
                  },
                  children: selected.includes(opt) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "svg",
                    {
                      viewBox: "0 0 12 12",
                      className: "w-3 h-3",
                      fill: "none",
                      "aria-hidden": "true",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "path",
                        {
                          d: "M2 6l3 3 5-5",
                          stroke: "#fff",
                          strokeWidth: "1.5",
                          strokeLinecap: "round",
                          strokeLinejoin: "round"
                        }
                      )
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-700", children: opt })
            ]
          },
          opt
        ))
      }
    )
  ] });
}
const emptyLabAdminForm = () => ({
  name: "",
  mobile: "",
  email: "",
  assignedLab: "",
  loginMethod: "OTP",
  assignedHospitals: [],
  status: "Active"
});
const emptyPhlebotomistForm = () => ({
  name: "",
  mobile: "",
  assignedHospitals: [],
  status: "Active"
});
function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  id
}) {
  if (!open) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center p-4",
      style: { background: "rgba(0,0,0,0.45)" },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": id,
          className: "w-full max-w-lg bg-white flex flex-col",
          style: {
            borderRadius: "16px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
            animation: "modalIn 200ms ease-out",
            maxHeight: "92vh"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: "@keyframes modalIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-gray-900", style: { fontSize: "18px" }, children: title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 text-gray-400" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "overflow-y-auto flex-1 px-6 py-4",
                style: { maxHeight: "70vh" },
                children
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 flex-shrink-0 bg-white",
                style: { borderRadius: "0 0 16px 16px" },
                children: footer
              }
            )
          ]
        }
      )
    }
  );
}
function LabAdminsTab({ hospitals }) {
  const [admins, setAdmins] = reactExports.useState([]);
  reactExports.useEffect(() => {
    getAllAppUsers().then((users) => {
      const labAdmins = users.filter((u) => u.role === "lab_admin").map((u) => ({
        id: u.mobile,
        name: u.name,
        mobile: u.mobile,
        email: "",
        assignedLab: "",
        loginMethod: "OTP",
        assignedHospitals: u.assignedHospitalId ? [u.assignedHospitalId] : [],
        status: u.isActive ? "Active" : "Disabled",
        lastLogin: "Never",
        isDemo: false
      }));
      setAdmins(labAdmins);
    }).catch(() => setAdmins([])).catch(() => setAdmins([]));
  }, []);
  const [showModal, setShowModal] = reactExports.useState(false);
  const [editingId, setEditingId] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(emptyLabAdminForm());
  const [error, setError] = reactExports.useState("");
  const openAdd = () => {
    setForm(emptyLabAdminForm());
    setEditingId(null);
    setError("");
    setShowModal(true);
  };
  const openEdit = (admin) => {
    setForm({
      name: admin.name,
      mobile: admin.mobile,
      email: admin.email,
      assignedLab: admin.assignedLab,
      loginMethod: admin.loginMethod,
      assignedHospitals: admin.assignedHospitals,
      status: admin.status
    });
    setEditingId(admin.id);
    setError("");
    setShowModal(true);
  };
  const handleSave = async () => {
    if (!form.name.trim()) {
      setError("Name is required.");
      return;
    }
    if (!form.mobile.trim()) {
      setError("Mobile number is required.");
      return;
    }
    setError("");
    const payload = {
      name: form.name.trim(),
      mobile: form.mobile.trim(),
      role: "lab_admin",
      assigned_hospitals: form.assignedHospitals || []
    };
    console.log("Creating lab admin:", payload);
    try {
      const res = await registerAppUser(
        payload.mobile,
        payload.name,
        payload.role,
        payload.assigned_hospitals[0] ?? null
      );
      console.log("User response:", res);
      if (!res) throw new Error("User creation failed");
      const newAdmin = {
        id: res.mobile,
        name: res.name,
        mobile: res.mobile,
        email: form.email,
        assignedLab: form.assignedLab,
        loginMethod: "OTP",
        assignedHospitals: res.assignedHospitalId ? [res.assignedHospitalId] : form.assignedHospitals,
        status: "Active",
        lastLogin: "Never",
        isDemo: false
      };
      setAdmins((prev) => [
        newAdmin,
        ...prev.filter((a) => a.mobile !== res.mobile)
      ]);
      ue.success("Lab Admin created successfully");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "User creation failed";
      setError(msg);
      ue.error(msg);
      return;
    }
    setShowModal(false);
  };
  const handleToggleStatus = (id) => {
    setAdmins(
      (prev) => prev.map(
        (a) => a.id === id ? { ...a, status: a.status === "Active" ? "Disabled" : "Active" } : a
      )
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-500", children: [
        admins.length,
        " lab admin",
        admins.length !== 1 ? "s" : ""
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          "data-ocid": "settings.add_lab_admin.open_modal_button",
          onClick: openAdd,
          className: "flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90 active:scale-95",
          style: {
            background: "linear-gradient(135deg, #2563EB, #1976D2)",
            boxShadow: "0 4px 12px rgba(37,99,235,0.3)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " Add Lab Admin"
          ]
        }
      )
    ] }),
    admins.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "py-14 flex flex-col items-center justify-center text-center",
        "data-ocid": "settings.lab_admins.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-7 h-7 text-blue-400" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-gray-700", children: "No lab admins yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400 mt-1", children: "Add the first lab admin to get started." })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-gray-100", children: [
        "Name",
        "Assigned Lab",
        "Mobile",
        "Status",
        "Last Login",
        "Actions"
      ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "th",
        {
          className: "text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wide",
          children: h
        },
        h
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: admins.map((admin, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          "data-ocid": `settings.lab_admin_table.item.${idx + 1}`,
          className: "border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                  style: {
                    background: "linear-gradient(135deg, #2563EB, #1976D2)"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white text-xs font-bold", children: admin.name.charAt(0) })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-gray-800", children: admin.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-gray-400",
                    style: { fontSize: "11px" },
                    children: admin.email
                  }
                )
              ] }),
              admin.isDemo && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-1.5 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-600 border border-amber-100", children: "Demo" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 px-4 text-gray-600", children: admin.assignedLab }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 px-4 text-gray-600 font-mono text-xs", children: admin.mobile }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: admin.status }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 px-4 text-gray-400 text-xs", children: admin.lastLogin }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": `settings.lab_admin_table.edit_button.${idx + 1}`,
                  onClick: () => openEdit(admin),
                  className: "w-7 h-7 rounded-lg flex items-center justify-center hover:bg-blue-50 transition-colors",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-3.5 h-3.5 text-blue-500" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": `settings.lab_admin_table.toggle.${idx + 1}`,
                  onClick: () => handleToggleStatus(admin.id),
                  className: "w-7 h-7 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors",
                  children: admin.status === "Active" ? /* @__PURE__ */ jsxRuntimeExports.jsx(UserX, { className: "w-3.5 h-3.5 text-gray-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "w-3.5 h-3.5 text-green-500" })
                }
              )
            ] }) })
          ]
        },
        admin.id
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        open: showModal,
        onClose: () => setShowModal(false),
        title: editingId ? "Edit Lab Admin" : "Add Lab Admin",
        id: "settings.lab_admin_modal.dialog",
        footer: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": "settings.lab_admin_modal.cancel_button",
              onClick: () => setShowModal(false),
              className: "px-4 py-2 rounded-xl text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": "settings.lab_admin_modal.submit_button",
              onClick: handleSave,
              className: "px-5 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90",
              style: {
                background: "linear-gradient(135deg, #2563EB, #1976D2)"
              },
              children: editingId ? "Save Changes" : "Add Lab Admin"
            }
          )
        ] }),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-red-50 border border-red-100 text-red-600 text-sm px-3 py-2.5 rounded-xl", children: error }),
          [
            {
              label: "Name",
              key: "name",
              type: "text",
              placeholder: "Full name",
              required: true,
              ocid: "settings.lab_admin_modal.input"
            },
            {
              label: "Mobile Number",
              key: "mobile",
              type: "tel",
              placeholder: "10-digit mobile number",
              required: true
            },
            {
              label: "Email",
              key: "email",
              type: "email",
              placeholder: "email@example.com"
            },
            {
              label: "Assigned Lab / Branch",
              key: "assignedLab",
              type: "text",
              placeholder: "Lab or branch name"
            }
          ].map(({ label, key, type, placeholder, required, ocid }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "block text-xs font-semibold text-gray-500 mb-1.5", children: [
              label,
              required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500 ml-0.5", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                "data-ocid": ocid,
                type,
                value: form[key],
                onChange: (e) => setForm((f) => ({ ...f, [key]: e.target.value })),
                placeholder,
                className: "w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm",
                style: { background: "#F7F9FC" }
              }
            )
          ] }, key)),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "block text-xs font-semibold text-gray-500 mb-1.5", children: "Login Method" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                value: form.loginMethod,
                onChange: (e) => setForm((f) => ({
                  ...f,
                  loginMethod: e.target.value
                })),
                className: "w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm",
                style: { background: "#F7F9FC" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "OTP", children: "OTP (Mobile)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Password", children: "Password" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "block text-xs font-semibold text-gray-500 mb-1.5", children: "Assigned Hospitals" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              MultiSelect,
              {
                options: hospitals.map((h) => h.name),
                selected: form.assignedHospitals,
                onChange: (val) => setForm((f) => ({ ...f, assignedHospitals: val }))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "block text-xs font-semibold text-gray-500 mb-1.5", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: ["Active", "Disabled"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setForm((f) => ({ ...f, status: s })),
                className: "flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-semibold transition-all",
                style: {
                  borderColor: form.status === s ? "#2563EB" : "#E5E7EB",
                  background: form.status === s ? "#EFF6FF" : "#fff",
                  color: form.status === s ? "#2563EB" : "#6B7280"
                },
                children: [
                  s === "Active" ? /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(UserX, { className: "w-3.5 h-3.5" }),
                  s
                ]
              },
              s
            )) })
          ] })
        ] })
      }
    )
  ] });
}
function PhlebotomistsTab({ hospitals }) {
  const [phlebs, setPhlebs] = reactExports.useState([]);
  reactExports.useEffect(() => {
    getAllAppUsers().then((users) => {
      const phlebotomists = users.filter((u) => u.role === "phlebotomist").map((u) => ({
        id: u.mobile,
        name: u.name,
        mobile: u.mobile,
        assignedHospitals: u.assignedHospitalId ? [u.assignedHospitalId] : [],
        status: u.isActive ? "Active" : "Disabled",
        samplesToday: 0,
        lastLogin: "Never",
        isDemo: false
      }));
      setPhlebs(phlebotomists);
    }).catch(() => setPhlebs([]));
  }, []);
  const [showModal, setShowModal] = reactExports.useState(false);
  const [editingId, setEditingId] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(
    emptyPhlebotomistForm()
  );
  const [error, setError] = reactExports.useState("");
  const openAdd = () => {
    setForm(emptyPhlebotomistForm());
    setEditingId(null);
    setError("");
    setShowModal(true);
  };
  const openEdit = (p) => {
    setForm({
      name: p.name,
      mobile: p.mobile,
      assignedHospitals: p.assignedHospitals,
      status: p.status
    });
    setEditingId(p.id);
    setError("");
    setShowModal(true);
  };
  const handleSave = async () => {
    if (!form.name.trim()) {
      setError("Name is required.");
      return;
    }
    if (!form.mobile.trim()) {
      setError("Mobile number is required.");
      return;
    }
    setError("");
    const payload = {
      name: form.name.trim(),
      mobile: form.mobile.trim(),
      role: "phlebotomist",
      assigned_hospitals: form.assignedHospitals || []
    };
    console.log("Creating phlebotomist:", payload);
    try {
      const res = await registerAppUser(
        payload.mobile,
        payload.name,
        payload.role,
        payload.assigned_hospitals[0] ?? null
      );
      console.log("User response:", res);
      if (!res) throw new Error("User creation failed");
      const newPhleb = {
        id: res.mobile,
        name: res.name,
        mobile: res.mobile,
        assignedHospitals: res.assignedHospitalId ? [res.assignedHospitalId] : form.assignedHospitals,
        status: "Active",
        samplesToday: 0,
        lastLogin: "Never",
        isDemo: false
      };
      setPhlebs((prev) => [
        newPhleb,
        ...prev.filter((p) => p.mobile !== res.mobile)
      ]);
      ue.success("Phlebotomist created successfully");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "User creation failed";
      setError(msg);
      ue.error(msg);
      return;
    }
    setShowModal(false);
  };
  const handleToggleStatus = (id) => {
    setPhlebs(
      (prev) => prev.map(
        (p) => p.id === id ? { ...p, status: p.status === "Active" ? "Disabled" : "Active" } : p
      )
    );
  };
  const handleResetDevice = (id) => {
    const phleb = phlebs.find((p) => p.id === id);
    if (!phleb) return;
    const confirmed = window.confirm(
      `Reset device for ${phleb.name}? They will need to log in again from their device.`
    );
    if (!confirmed) return;
    const updated = phlebs.map(
      (p) => p.id === id ? { ...p, deviceId: null, deviceBound: false } : p
    );
    setPhlebs(updated);
    window.alert(
      "Device reset successfully. Phlebotomist will need to log in again."
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-500", children: [
        phlebs.length,
        " phlebotomist",
        phlebs.length !== 1 ? "s" : ""
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          "data-ocid": "settings.add_phlebotomist.open_modal_button",
          onClick: openAdd,
          className: "flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90 active:scale-95",
          style: {
            background: "linear-gradient(135deg, #2563EB, #1976D2)",
            boxShadow: "0 4px 12px rgba(37,99,235,0.3)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " Add Phlebotomist"
          ]
        }
      )
    ] }),
    phlebs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "py-14 flex flex-col items-center justify-center text-center",
        "data-ocid": "settings.phlebotomists.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-7 h-7 text-teal-400" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-gray-700", children: "No phlebotomists added yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400 mt-1", children: "Add field staff to manage sample collections." })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-gray-100", children: [
        "Name",
        "Mobile",
        "Assigned Hospital",
        "Samples Today",
        "Last Login",
        "Status",
        "Actions"
      ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "th",
        {
          className: "text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wide",
          children: h
        },
        h
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: phlebs.map((p, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          "data-ocid": `settings.phlebotomist_table.item.${idx + 1}`,
          className: "border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                  style: {
                    background: "linear-gradient(135deg, #06B6D4, #2563EB)"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white text-xs font-bold", children: p.name.charAt(0) })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-gray-800", children: p.name })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 px-4 text-gray-600 font-mono text-xs", children: p.mobile }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 px-4", children: p.assignedHospitals.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400 text-xs", children: "None assigned" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1", children: [
              p.assignedHospitals.slice(0, 2).map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "px-2 py-0.5 rounded-full text-xs bg-blue-50 text-blue-700 border border-blue-100",
                  children: h
                },
                h
              )),
              p.assignedHospitals.length > 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-500", children: [
                "+",
                p.assignedHospitals.length - 2
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 px-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-gray-800", children: p.samplesToday }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 px-4 text-gray-400 text-xs", children: p.lastLogin }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: p.status }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": `settings.phlebotomist_table.edit_button.${idx + 1}`,
                  onClick: () => openEdit(p),
                  className: "w-7 h-7 rounded-lg flex items-center justify-center hover:bg-blue-50 transition-colors",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-3.5 h-3.5 text-blue-500" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": `settings.phlebotomist_table.toggle.${idx + 1}`,
                  onClick: () => handleToggleStatus(p.id),
                  className: "w-7 h-7 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors",
                  children: p.status === "Active" ? /* @__PURE__ */ jsxRuntimeExports.jsx(UserX, { className: "w-3.5 h-3.5 text-gray-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "w-3.5 h-3.5 text-green-500" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": `settings.phlebotomist_table.reset_button.${idx + 1}`,
                  onClick: () => handleResetDevice(p.id),
                  className: "px-2 py-1 text-xs rounded-lg border border-orange-300 text-orange-600 hover:bg-orange-50 transition-colors",
                  children: "Reset Device"
                }
              )
            ] }) })
          ]
        },
        p.id
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        open: showModal,
        onClose: () => setShowModal(false),
        title: editingId ? "Edit Phlebotomist" : "Add Phlebotomist",
        id: "settings.phlebotomist_modal.dialog",
        footer: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": "settings.phlebotomist_modal.cancel_button",
              onClick: () => setShowModal(false),
              className: "px-4 py-2 rounded-xl text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": "settings.phlebotomist_modal.submit_button",
              onClick: handleSave,
              className: "px-5 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90",
              style: {
                background: "linear-gradient(135deg, #2563EB, #1976D2)"
              },
              children: editingId ? "Save Changes" : "Add Phlebotomist"
            }
          )
        ] }),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-red-50 border border-red-100 text-red-600 text-sm px-3 py-2.5 rounded-xl", children: error }),
          [
            {
              label: "Name",
              key: "name",
              type: "text",
              placeholder: "Full name",
              required: true,
              ocid: "settings.phlebotomist_modal.input"
            },
            {
              label: "Mobile Number",
              key: "mobile",
              type: "tel",
              placeholder: "10-digit mobile number",
              required: true
            }
          ].map(({ label, key, type, placeholder, required, ocid }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "block text-xs font-semibold text-gray-500 mb-1.5", children: [
              label,
              required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500 ml-0.5", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                "data-ocid": ocid,
                type,
                value: form[key],
                onChange: (e) => setForm((f) => ({ ...f, [key]: e.target.value })),
                placeholder,
                className: "w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm",
                style: { background: "#F7F9FC" }
              }
            )
          ] }, key)),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "block text-xs font-semibold text-gray-500 mb-1.5", children: "Assign Hospitals" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              MultiSelect,
              {
                options: hospitals.map((h) => h.name),
                selected: form.assignedHospitals,
                onChange: (val) => setForm((f) => ({ ...f, assignedHospitals: val }))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "block text-xs font-semibold text-gray-500 mb-1.5", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: ["Active", "Disabled"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setForm((f) => ({ ...f, status: s })),
                className: "flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-semibold transition-all",
                style: {
                  borderColor: form.status === s ? "#2563EB" : "#E5E7EB",
                  background: form.status === s ? "#EFF6FF" : "#fff",
                  color: form.status === s ? "#2563EB" : "#6B7280"
                },
                children: [
                  s === "Active" ? /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(UserX, { className: "w-3.5 h-3.5" }),
                  s
                ]
              },
              s
            )) })
          ] })
        ] })
      }
    )
  ] });
}
function SuperAdminSettingsPage(_props) {
  const { data: hospitalsData = [] } = useHospitals();
  const hospitals = hospitalsData.map((h) => ({
    id: String(h.id),
    name: h.name,
    isActive: h.isActive
  }));
  console.log("Hospitals from backend:", hospitals);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen pb-[90px] page-fade-in",
      style: { background: "#F7F9FC" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto px-4 pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          PageHeroHeader,
          {
            title: "Settings",
            description: "System configuration and user management"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "px-4 py-5",
            style: {
              background: "linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)",
              boxShadow: "0 4px 20px rgba(37,99,235,0.2)"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex items-center justify-center",
                  style: {
                    width: "42px",
                    height: "42px",
                    borderRadius: "12px",
                    background: "rgba(255,255,255,0.2)"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { className: "w-5 h-5 text-white" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-bold text-white", style: { fontSize: "20px" }, children: "Settings" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70", style: { fontSize: "12px" }, children: "System Mode & User Management" })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto px-4 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "lab-admins", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TabsList,
            {
              className: "mb-6 bg-white border border-gray-100 p-1 rounded-xl",
              style: { boxShadow: "0 2px 8px rgba(0,0,0,0.06)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  TabsTrigger,
                  {
                    value: "lab-admins",
                    "data-ocid": "settings.lab_admins.tab",
                    className: "rounded-lg text-sm font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#2563EB] data-[state=active]:to-[#1976D2] data-[state=active]:text-white data-[state=active]:shadow-sm",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 mr-1.5" }),
                      " Lab Admins"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  TabsTrigger,
                  {
                    value: "phlebotomists",
                    "data-ocid": "settings.phlebotomists.tab",
                    className: "rounded-lg text-sm font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#2563EB] data-[state=active]:to-[#1976D2] data-[state=active]:text-white data-[state=active]:shadow-sm",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4 mr-1.5" }),
                      " Phlebotomists"
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-white",
              style: {
                borderRadius: "16px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                padding: "24px"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "lab-admins", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LabAdminsTab, { hospitals }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "phlebotomists", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PhlebotomistsTab, { hospitals }) })
              ]
            }
          )
        ] }) })
      ]
    }
  );
}
export {
  SuperAdminSettingsPage as default
};
