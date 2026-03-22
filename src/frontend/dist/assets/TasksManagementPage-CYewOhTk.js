import { r as reactExports, j as jsxRuntimeExports } from "./index-WR58nuq7.js";
import { u as ue } from "./index-B7ov5umw.js";
import { h as getAllTasks, i as getAllAppUsers, a as getHospitals, j as createTask } from "./backendService-BpklohjF.js";
import { C as ClipboardList } from "./StaffApp-Dmn-J2zS.js";
import { R as RefreshCw } from "./refresh-cw-J292PXtC.js";
import { P as Plus } from "./plus-BxRvoqyl.js";
import { L as LoaderCircle, X } from "./ProfileSetupModal-COkNxNJQ.js";
import { U as User, P as Phone } from "./user-CsdUA_VC.js";
import { M as MapPin } from "./map-pin-D-95OTFC.js";
import "./clock-BrRDaHVx.js";
import "./building-2-VWtpBH9c.js";
import "./package-BuILCwKm.js";
import "./search-BHltAGtY.js";
const STATUS_STYLES = {
  assigned: { bg: "#F3F4F6", color: "#6B7280" },
  Assigned: { bg: "#F3F4F6", color: "#6B7280" },
  in_progress: { bg: "#DBEAFE", color: "#1D4ED8" },
  "In Progress": { bg: "#DBEAFE", color: "#1D4ED8" },
  completed: { bg: "#D1FAE5", color: "#065F46" },
  Completed: { bg: "#D1FAE5", color: "#065F46" }
};
const FILTER_TABS = ["All", "assigned", "completed"];
function TasksManagementPage({ role }) {
  const [tasks, setTasks] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [filter, setFilter] = reactExports.useState("All");
  const [modalOpen, setModalOpen] = reactExports.useState(false);
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [phlebotomists, setPhlebotomists] = reactExports.useState([]);
  const [hospitals, setHospitals] = reactExports.useState([]);
  const [form, setForm] = reactExports.useState({
    patientName: "",
    assignedToMobile: "",
    hospitalId: ""
  });
  const loadData = reactExports.useCallback(async () => {
    setLoading(true);
    try {
      const [taskList, users, hospList] = await Promise.all([
        getAllTasks(),
        getAllAppUsers(),
        getHospitals()
      ]);
      setTasks(taskList);
      setPhlebotomists(users.filter((u) => u.role === "phlebotomist"));
      setHospitals(hospList);
    } catch {
      ue.error("Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  }, []);
  reactExports.useEffect(() => {
    loadData();
  }, [loadData]);
  const filteredTasks = filter === "All" ? tasks : tasks.filter((t) => t.status === filter);
  const handleAddTask = async () => {
    if (!form.patientName.trim()) {
      ue.error("Patient name is required.");
      return;
    }
    if (!form.assignedToMobile) {
      ue.error("Please select a phlebotomist.");
      return;
    }
    const session = (() => {
      try {
        const s = localStorage.getItem("xpertlab_session");
        return s ? JSON.parse(s) : null;
      } catch {
        return null;
      }
    })();
    const assignedBy = (session == null ? void 0 : session.mobileNumber) ?? (session == null ? void 0 : session.mobile) ?? "admin";
    setSubmitting(true);
    try {
      const created = await createTask(
        form.assignedToMobile,
        assignedBy,
        form.hospitalId,
        form.patientName.trim(),
        "assigned"
      );
      if (created) {
        ue.success("Task created successfully.");
        setModalOpen(false);
        setForm({ patientName: "", assignedToMobile: "", hospitalId: "" });
        await loadData();
      } else {
        ue.error("Failed to create task. Please try again.");
      }
    } catch {
      ue.error("Failed to create task.");
    } finally {
      setSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: "#F7F9FC", minHeight: "100vh" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: {
          background: "linear-gradient(135deg, #2563EB, #06B6D4)",
          padding: "20px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  color: "white",
                  fontSize: 20,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  gap: 8
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "w-5 h-5" }),
                  "Tasks"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  color: "rgba(255,255,255,0.8)",
                  fontSize: 13,
                  marginTop: 4
                },
                children: "Manage and assign patient visits"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: loadData,
                disabled: loading,
                style: {
                  background: "rgba(255,255,255,0.15)",
                  border: "1.5px solid rgba(255,255,255,0.3)",
                  borderRadius: 10,
                  color: "white",
                  padding: "6px 10px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 4
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: `w-4 h-4 ${loading ? "animate-spin" : ""}` })
              }
            ),
            (role === "superAdmin" || role === "labAdmin") && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "data-ocid": "tasks.open_modal_button",
                onClick: () => setModalOpen(true),
                style: {
                  height: 44,
                  background: "rgba(255,255,255,0.2)",
                  color: "white",
                  border: "1.5px solid rgba(255,255,255,0.4)",
                  borderRadius: 12,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "0 16px"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                  "Add Task"
                ]
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: {
          display: "flex",
          gap: 8,
          padding: "12px 16px",
          overflowX: "auto"
        },
        children: FILTER_TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": `tasks.${tab.toLowerCase().replace(" ", "_")}.tab`,
            onClick: () => setFilter(tab),
            style: {
              padding: "7px 16px",
              borderRadius: 20,
              border: "none",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "all 150ms",
              background: filter === tab ? "linear-gradient(135deg, #2563EB, #06B6D4)" : "#FFFFFF",
              color: filter === tab ? "white" : "#6B7280",
              boxShadow: filter === tab ? "0 4px 12px rgba(37,99,235,0.25)" : "0 1px 4px rgba(0,0,0,0.06)"
            },
            children: tab === "All" ? "All" : tab.charAt(0).toUpperCase() + tab.slice(1)
          },
          tab
        ))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { padding: "0 16px 16px" }, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: {
          textAlign: "center",
          padding: "48px 24px",
          background: "white",
          borderRadius: 16,
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            LoaderCircle,
            {
              className: "w-8 h-8 mx-auto animate-spin",
              style: { color: "#2563EB" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginTop: 12, fontSize: 14, color: "#6B7280" }, children: "Loading tasks..." })
        ]
      }
    ) : filteredTasks.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "tasks.empty_state",
        style: {
          textAlign: "center",
          padding: "48px 24px",
          background: "white",
          borderRadius: 16,
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ClipboardList,
            {
              className: "w-12 h-12 mx-auto",
              style: { color: "#D1D5DB" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                marginTop: 12,
                fontSize: 15,
                fontWeight: 600,
                color: "#374151"
              },
              children: "No tasks found"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 13, color: "#9CA3AF", marginTop: 4 }, children: filter === "All" ? "Create your first task using the Add Task button" : `No ${filter} tasks` })
        ]
      }
    ) : filteredTasks.map((task, idx) => {
      var _a, _b;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": `tasks.item.${idx + 1}`,
          style: {
            background: "white",
            borderRadius: 16,
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            padding: 16,
            marginBottom: 12
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 10
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        style: {
                          fontSize: 15,
                          fontWeight: 700,
                          color: "#111827",
                          display: "flex",
                          alignItems: "center",
                          gap: 6
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4", style: { color: "#2563EB" } }),
                          task.patient_name
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 12, color: "#9CA3AF", marginTop: 2 }, children: task.task_id })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      style: {
                        fontSize: 11,
                        fontWeight: 700,
                        padding: "3px 10px",
                        borderRadius: 20,
                        background: ((_a = STATUS_STYLES[task.status]) == null ? void 0 : _a.bg) ?? "#F3F4F6",
                        color: ((_b = STATUS_STYLES[task.status]) == null ? void 0 : _b.color) ?? "#6B7280"
                      },
                      children: task.status.charAt(0).toUpperCase() + task.status.slice(1)
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  fontSize: 13,
                  color: "#4B5563"
                },
                children: [
                  task.assigned_to_mobile && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      style: { display: "flex", alignItems: "center", gap: 6 },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3.5 h-3.5 text-gray-400" }),
                        "Assigned to: ",
                        task.assigned_to_mobile
                      ]
                    }
                  ),
                  task.hospital_id && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      style: { display: "flex", alignItems: "center", gap: 6 },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5 text-gray-400" }),
                        "Hospital ID: ",
                        task.hospital_id
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      style: {
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        marginTop: 4,
                        paddingTop: 8,
                        borderTop: "1px solid #F3F4F6"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3.5 h-3.5 text-gray-400" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "#9CA3AF" }, children: [
                          "Assigned by: ",
                          task.assigned_by
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#9CA3AF", marginLeft: 8 }, children: new Date(
                          Number(task.created_at) / 1e6
                        ).toLocaleDateString() })
                      ]
                    }
                  )
                ]
              }
            )
          ]
        },
        task.task_id
      );
    }) }),
    modalOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: {
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
          zIndex: 200,
          display: "flex",
          alignItems: "flex-end"
        },
        onClick: (e) => {
          if (e.target === e.currentTarget) setModalOpen(false);
        },
        onKeyDown: (e) => {
          if (e.key === "Escape") setModalOpen(false);
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "tasks.modal",
            style: {
              background: "white",
              borderRadius: "20px 20px 0 0",
              width: "100%",
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    padding: "16px 20px",
                    borderBottom: "1px solid #F3F4F6",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexShrink: 0
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 17, fontWeight: 700, color: "#111827" }, children: "Add New Task" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        "data-ocid": "tasks.close_button",
                        onClick: () => setModalOpen(false),
                        style: {
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: "#9CA3AF",
                          padding: 4
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    overflowY: "auto",
                    padding: "16px 20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 12
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "label",
                        {
                          htmlFor: "task-patientName",
                          style: {
                            fontSize: 12,
                            fontWeight: 600,
                            color: "#6B7280",
                            display: "block",
                            marginBottom: 4
                          },
                          children: "Patient Name *"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: "task-patientName",
                          "data-ocid": "tasks.patientName.input",
                          type: "text",
                          value: form.patientName,
                          onChange: (e) => setForm((prev) => ({
                            ...prev,
                            patientName: e.target.value
                          })),
                          style: {
                            width: "100%",
                            padding: "10px 12px",
                            borderRadius: 8,
                            border: "1.5px solid #E5E7EB",
                            fontSize: 14,
                            outline: "none",
                            background: "#F7F9FC",
                            boxSizing: "border-box"
                          }
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "label",
                        {
                          htmlFor: "task-phlebotomist",
                          style: {
                            fontSize: 12,
                            fontWeight: 600,
                            color: "#6B7280",
                            display: "block",
                            marginBottom: 4
                          },
                          children: "Assigned Phlebotomist *"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "select",
                        {
                          id: "task-phlebotomist",
                          "data-ocid": "tasks.select",
                          value: form.assignedToMobile,
                          onChange: (e) => setForm((prev) => ({
                            ...prev,
                            assignedToMobile: e.target.value
                          })),
                          style: {
                            width: "100%",
                            padding: "10px 12px",
                            borderRadius: 8,
                            border: "1.5px solid #E5E7EB",
                            fontSize: 14,
                            outline: "none",
                            background: "#F7F9FC",
                            cursor: "pointer"
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select phlebotomist..." }),
                            phlebotomists.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: p.mobile, children: [
                              p.name,
                              " (",
                              p.mobile,
                              ")"
                            ] }, p.mobile))
                          ]
                        }
                      ),
                      phlebotomists.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: 12, color: "#EF4444", marginTop: 4 }, children: "No phlebotomists found. Ask Super Admin to add phlebotomists." })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "label",
                        {
                          htmlFor: "task-hospital",
                          style: {
                            fontSize: 12,
                            fontWeight: 600,
                            color: "#6B7280",
                            display: "block",
                            marginBottom: 4
                          },
                          children: "Hospital"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "select",
                        {
                          id: "task-hospital",
                          "data-ocid": "tasks.hospital.select",
                          value: form.hospitalId,
                          onChange: (e) => setForm((prev) => ({
                            ...prev,
                            hospitalId: e.target.value
                          })),
                          style: {
                            width: "100%",
                            padding: "10px 12px",
                            borderRadius: 8,
                            border: "1.5px solid #E5E7EB",
                            fontSize: 14,
                            outline: "none",
                            background: "#F7F9FC",
                            cursor: "pointer"
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select hospital..." }),
                            hospitals.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: h.id, children: h.name }, h.id))
                          ]
                        }
                      )
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    padding: "12px 20px 24px",
                    borderTop: "1px solid #F3F4F6",
                    flexShrink: 0,
                    display: "flex",
                    gap: 10
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        "data-ocid": "tasks.cancel_button",
                        onClick: () => setModalOpen(false),
                        style: {
                          flex: 1,
                          height: 48,
                          background: "#F3F4F6",
                          border: "none",
                          borderRadius: 12,
                          fontSize: 15,
                          fontWeight: 600,
                          color: "#6B7280",
                          cursor: "pointer"
                        },
                        children: "Cancel"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        "data-ocid": "tasks.submit_button",
                        onClick: handleAddTask,
                        disabled: submitting,
                        style: {
                          flex: 2,
                          height: 48,
                          background: "linear-gradient(135deg, #2563EB, #06B6D4)",
                          border: "none",
                          borderRadius: 12,
                          fontSize: 15,
                          fontWeight: 600,
                          color: "white",
                          cursor: submitting ? "not-allowed" : "pointer",
                          opacity: submitting ? 0.7 : 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 8
                        },
                        children: [
                          submitting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                          submitting ? "Creating..." : "Create Task"
                        ]
                      }
                    )
                  ]
                }
              )
            ]
          }
        )
      }
    )
  ] });
}
export {
  TasksManagementPage as default
};
