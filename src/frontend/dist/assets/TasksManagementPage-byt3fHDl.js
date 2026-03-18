import { r as reactExports, j as jsxRuntimeExports } from "./index-6Cz_hrmF.js";
import { u as ue } from "./index-C0FG7l8-.js";
import { C as ClipboardList, T as TestTube } from "./StaffApp-CSa1Gag-.js";
import { P as Plus } from "./plus-SXo463js.js";
import { U as User, P as Phone } from "./user-WH1kTo4q.js";
import { M as MapPin } from "./map-pin-B58qI1cI.js";
import { X } from "./ProfileSetupModal-C_51Oj8J.js";
import "./demoData-C6jm_gYk.js";
import "./clock-CmWyAOgz.js";
import "./building-2-DNcPJVX3.js";
import "./search-CHXiDQZp.js";
function loadTasks() {
  try {
    const raw = localStorage.getItem("xpertlab_tasks");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function saveTasks(tasks) {
  localStorage.setItem("xpertlab_tasks", JSON.stringify(tasks));
}
function loadPhlebotomists() {
  try {
    const raw = localStorage.getItem("xpertlab_phlebotomists");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
const STATUS_STYLES = {
  Assigned: { bg: "#F3F4F6", color: "#6B7280" },
  "In Progress": { bg: "#DBEAFE", color: "#1D4ED8" },
  Completed: { bg: "#D1FAE5", color: "#065F46" }
};
const PRIORITY_STYLES = {
  Normal: { bg: "#F0FDF4", color: "#16A34A" },
  Urgent: { bg: "#FEF2F2", color: "#DC2626" }
};
const FILTER_TABS = ["All", "Assigned", "In Progress", "Completed"];
function TasksManagementPage({ role }) {
  const [tasks, setTasks] = reactExports.useState(loadTasks);
  const [filter, setFilter] = reactExports.useState("All");
  const [modalOpen, setModalOpen] = reactExports.useState(false);
  const phlebotomists = loadPhlebotomists();
  const [form, setForm] = reactExports.useState({
    patientName: "",
    phone: "",
    address: "",
    tests: "",
    assignedPhlebotomistId: "",
    visitTime: "",
    priority: "Normal"
  });
  const filteredTasks = filter === "All" ? tasks : tasks.filter((t) => t.status === filter);
  const handleAddTask = () => {
    if (!form.patientName.trim()) {
      ue.error("Patient name is required.");
      return;
    }
    if (!form.assignedPhlebotomistId) {
      ue.error("Please select a phlebotomist.");
      return;
    }
    const phlebo = phlebotomists.find(
      (p) => p.id === form.assignedPhlebotomistId
    );
    const newTask = {
      id: `TASK-${Date.now()}`,
      patientName: form.patientName,
      phone: form.phone,
      address: form.address,
      tests: form.tests,
      assignedPhlebotomistId: form.assignedPhlebotomistId,
      assignedPhlebotomistName: (phlebo == null ? void 0 : phlebo.name) ?? "Unknown",
      assignedPhlebotomistMobile: (phlebo == null ? void 0 : phlebo.mobile) ?? "",
      visitTime: form.visitTime,
      priority: form.priority,
      status: "Assigned",
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    const updated = [newTask, ...tasks];
    saveTasks(updated);
    setTasks(updated);
    setModalOpen(false);
    setForm({
      patientName: "",
      phone: "",
      address: "",
      tests: "",
      assignedPhlebotomistId: "",
      visitTime: "",
      priority: "Normal"
    });
    ue.success("Task created successfully.");
  };
  const handleStatusChange = (taskId, newStatus) => {
    const updated = tasks.map(
      (t) => t.id === taskId ? { ...t, status: newStatus } : t
    );
    saveTasks(updated);
    setTasks(updated);
    ue.success("Task status updated.");
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
            children: tab
          },
          tab
        ))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { padding: "0 16px 16px" }, children: filteredTasks.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
      var _a, _b, _c, _d;
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
                          task.patientName
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: {
                          fontSize: 12,
                          color: "#9CA3AF",
                          marginTop: 2
                        },
                        children: task.id
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 6 }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        style: {
                          fontSize: 11,
                          fontWeight: 700,
                          padding: "3px 10px",
                          borderRadius: 20,
                          background: ((_a = PRIORITY_STYLES[task.priority]) == null ? void 0 : _a.bg) ?? "#F3F4F6",
                          color: ((_b = PRIORITY_STYLES[task.priority]) == null ? void 0 : _b.color) ?? "#6B7280"
                        },
                        children: task.priority
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        style: {
                          fontSize: 11,
                          fontWeight: 700,
                          padding: "3px 10px",
                          borderRadius: 20,
                          background: ((_c = STATUS_STYLES[task.status]) == null ? void 0 : _c.bg) ?? "#F3F4F6",
                          color: ((_d = STATUS_STYLES[task.status]) == null ? void 0 : _d.color) ?? "#6B7280"
                        },
                        children: task.status
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
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  fontSize: 13,
                  color: "#4B5563"
                },
                children: [
                  task.phone && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      style: { display: "flex", alignItems: "center", gap: 6 },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3.5 h-3.5 text-gray-400" }),
                        task.phone
                      ]
                    }
                  ),
                  task.address && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      style: { display: "flex", alignItems: "center", gap: 6 },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5 text-gray-400" }),
                        task.address
                      ]
                    }
                  ),
                  task.tests && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      style: { display: "flex", alignItems: "center", gap: 6 },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(TestTube, { className: "w-3.5 h-3.5 text-gray-400" }),
                        task.tests
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
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontWeight: 600, color: "#2563EB" }, children: task.assignedPhlebotomistName }),
                        task.visitTime && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#9CA3AF", marginLeft: 8 }, children: new Date(task.visitTime).toLocaleString() })
                      ]
                    }
                  )
                ]
              }
            ),
            (role === "superAdmin" || role === "labAdmin") && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginTop: 12 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                "data-ocid": `tasks.select.${idx + 1}`,
                value: task.status,
                onChange: (e) => handleStatusChange(
                  task.id,
                  e.target.value
                ),
                style: {
                  width: "100%",
                  padding: "8px 12px",
                  borderRadius: 8,
                  border: "1.5px solid #E5E7EB",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#374151",
                  background: "#F7F9FC",
                  cursor: "pointer",
                  outline: "none"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Assigned", children: "Assigned" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "In Progress", children: "In Progress" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Completed", children: "Completed" })
                ]
              }
            ) })
          ]
        },
        task.id
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
                    [
                      {
                        key: "patientName",
                        label: "Patient Name *",
                        id: "task-patientName",
                        type: "text"
                      },
                      {
                        key: "phone",
                        label: "Phone",
                        type: "text",
                        id: "task-phone"
                      },
                      {
                        key: "address",
                        label: "Address",
                        type: "text",
                        id: "task-address"
                      },
                      {
                        key: "tests",
                        label: "Tests",
                        type: "text",
                        id: "task-tests"
                      }
                    ].map((field) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "label",
                        {
                          htmlFor: field.id,
                          style: {
                            fontSize: 12,
                            fontWeight: 600,
                            color: "#6B7280",
                            display: "block",
                            marginBottom: 4
                          },
                          children: field.label
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: field.id,
                          "data-ocid": `tasks.${field.key}.input`,
                          type: field.type,
                          value: form[field.key],
                          onChange: (e) => setForm((prev) => ({
                            ...prev,
                            [field.key]: e.target.value
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
                    ] }, field.key)),
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
                          value: form.assignedPhlebotomistId,
                          onChange: (e) => setForm((prev) => ({
                            ...prev,
                            assignedPhlebotomistId: e.target.value
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
                            phlebotomists.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: p.id, children: p.name }, p.id))
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "label",
                        {
                          htmlFor: "task-visittime",
                          style: {
                            fontSize: 12,
                            fontWeight: 600,
                            color: "#6B7280",
                            display: "block",
                            marginBottom: 4
                          },
                          children: "Visit Time"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: "task-visittime",
                          "data-ocid": "tasks.visittime.input",
                          type: "datetime-local",
                          value: form.visitTime,
                          onChange: (e) => setForm((prev) => ({ ...prev, visitTime: e.target.value })),
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
                        "span",
                        {
                          style: {
                            fontSize: 12,
                            fontWeight: 600,
                            color: "#6B7280",
                            display: "block",
                            marginBottom: 8
                          },
                          children: "Priority"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: 8 }, children: ["Normal", "Urgent"].map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          "data-ocid": `tasks.priority_${p.toLowerCase()}.toggle`,
                          onClick: () => setForm((prev) => ({ ...prev, priority: p })),
                          style: {
                            flex: 1,
                            padding: "10px",
                            borderRadius: 10,
                            border: "1.5px solid",
                            fontSize: 13,
                            fontWeight: 600,
                            cursor: "pointer",
                            transition: "all 150ms",
                            background: form.priority === p ? p === "Urgent" ? "#FEF2F2" : "#F0FDF4" : "#F7F9FC",
                            borderColor: form.priority === p ? p === "Urgent" ? "#DC2626" : "#16A34A" : "#E5E7EB",
                            color: form.priority === p ? p === "Urgent" ? "#DC2626" : "#16A34A" : "#6B7280"
                          },
                          children: p
                        },
                        p
                      )) })
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
                        style: {
                          flex: 2,
                          height: 48,
                          background: "linear-gradient(135deg, #2563EB, #06B6D4)",
                          border: "none",
                          borderRadius: 12,
                          fontSize: 15,
                          fontWeight: 600,
                          color: "white",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 8
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                          "Create Task"
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
