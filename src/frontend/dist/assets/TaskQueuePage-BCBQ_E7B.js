import { r as reactExports, j as jsxRuntimeExports } from "./index-6Cz_hrmF.js";
import { H as HealthcareBg } from "./ProfileSetupModal-C_51Oj8J.js";
import { e as getDemoHomeCollections, f as getDemoSamples } from "./demoData-C6jm_gYk.js";
import { R as RefreshCw } from "./refresh-cw-L_CofhJ9.js";
import { C as ClipboardList, T as TestTube } from "./StaffApp-CSa1Gag-.js";
import { M as MapPin } from "./map-pin-B58qI1cI.js";
import { C as Clock } from "./clock-CmWyAOgz.js";
import { C as CircleCheckBig } from "./circle-check-big-DAMhI8Ry.js";
import "./user-WH1kTo4q.js";
import "./building-2-DNcPJVX3.js";
import "./search-CHXiDQZp.js";
function getTaskStatusColor(status) {
  switch (status) {
    case "ASSIGNED":
      return { bg: "#F3F4F6", text: "#374151" };
    case "EN_ROUTE":
      return { bg: "#EFF6FF", text: "#1D4ED8" };
    case "SAMPLE_COLLECTED":
      return { bg: "#F0FDFA", text: "#0F766E" };
    case "COMPLETED":
      return { bg: "#F0FDF4", text: "#15803D" };
    default:
      return { bg: "#F3F4F6", text: "#6B7280" };
  }
}
function getTaskStatusLabel(status) {
  switch (status) {
    case "ASSIGNED":
      return "Assigned";
    case "EN_ROUTE":
      return "En Route";
    case "SAMPLE_COLLECTED":
      return "Collected";
    case "COMPLETED":
      return "Completed";
    default:
      return status;
  }
}
function AssignedTaskCard({
  task,
  idx
}) {
  const statusStyles = {
    Assigned: { bg: "#F3F4F6", color: "#6B7280" },
    "In Progress": { bg: "#DBEAFE", color: "#1D4ED8" },
    Completed: { bg: "#D1FAE5", color: "#065F46" }
  };
  const s = statusStyles[task.status] ?? { bg: "#F3F4F6", color: "#6B7280" };
  const isUrgent = task.priority === "Urgent";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `taskqueue.item.${idx + 1}`,
      style: {
        background: "white",
        borderRadius: 16,
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        padding: 16,
        borderLeft: isUrgent ? "4px solid #DC2626" : "4px solid #2563EB"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontWeight: 700, fontSize: 15, color: "#111827" }, children: task.patientName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  style: {
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "3px 10px",
                    borderRadius: 20,
                    background: s.bg,
                    color: s.color
                  },
                  children: task.status
                }
              )
            ]
          }
        ),
        task.phone && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: 13, color: "#6B7280", marginBottom: 4 }, children: [
          "Phone: ",
          task.phone
        ] }),
        task.address && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: 13, color: "#6B7280", marginBottom: 4 }, children: [
          "Address: ",
          task.address
        ] }),
        task.tests && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: 13, color: "#6B7280", marginBottom: 4 }, children: [
          "Tests: ",
          task.tests
        ] }),
        task.visitTime && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: 12, color: "#9CA3AF", marginTop: 6 }, children: [
          "Visit: ",
          new Date(task.visitTime).toLocaleString()
        ] }),
        isUrgent && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              marginTop: 8,
              fontSize: 11,
              fontWeight: 700,
              color: "#DC2626"
            },
            children: "URGENT"
          }
        )
      ]
    }
  );
}
function TaskQueuePage({
  isDemoMode = false
}) {
  const [tasks, setTasks] = reactExports.useState([]);
  const [lastUpdated, setLastUpdated] = reactExports.useState(/* @__PURE__ */ new Date());
  const [isRefreshing, setIsRefreshing] = reactExports.useState(false);
  const [assignedTasks, setAssignedTasks] = reactExports.useState([]);
  const loadAssignedTasks = reactExports.useCallback(() => {
    try {
      const sessionRaw = localStorage.getItem("xpertlab_session");
      const session = sessionRaw ? JSON.parse(sessionRaw) : null;
      const myMobile = (session == null ? void 0 : session.mobileNumber) ?? "";
      const raw = localStorage.getItem("xpertlab_tasks");
      const all = raw ? JSON.parse(raw) : [];
      setAssignedTasks(
        all.filter((t) => t.assignedPhlebotomistMobile === myMobile)
      );
    } catch {
      setAssignedTasks([]);
    }
  }, []);
  const loadTasks = reactExports.useCallback(() => {
    loadAssignedTasks();
    if (!isDemoMode) {
      setLastUpdated(/* @__PURE__ */ new Date());
      return;
    }
    const homeCollections = getDemoHomeCollections();
    const pendingCollections = homeCollections.filter(
      (hc) => hc.status !== "COMPLETED"
    );
    const samples = getDemoSamples();
    const pendingSamples = samples.filter(
      (s) => s.status === "SAMPLE_COLLECTED" || s.status === "DISPATCHED"
    );
    const combined = [
      ...pendingCollections.map(
        (hc) => ({ kind: "homeCollection", data: hc })
      ),
      ...pendingSamples.map(
        (s) => ({ kind: "hospitalSample", data: s })
      )
    ];
    combined.sort((a, b) => {
      const tA = a.kind === "homeCollection" ? a.data.timestamp : a.data.createdAt;
      const tB = b.kind === "homeCollection" ? b.data.timestamp : b.data.createdAt;
      return tB - tA;
    });
    setTasks(combined);
    setLastUpdated(/* @__PURE__ */ new Date());
  }, [isDemoMode, loadAssignedTasks]);
  reactExports.useEffect(() => {
    loadTasks();
  }, [loadTasks]);
  reactExports.useEffect(() => {
    const interval = setInterval(loadTasks, 3e4);
    return () => clearInterval(interval);
  }, [loadTasks]);
  const handleRefresh = async () => {
    setIsRefreshing(true);
    loadTasks();
    setTimeout(() => setIsRefreshing(false), 600);
  };
  if (!isDemoMode) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "relative min-h-screen pb-[90px] page-fade-in",
        style: { background: "#F7F9FC" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(HealthcareBg, { variant: "minimal", opacity: 0.04 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "px-4 pt-5 pb-4",
                style: {
                  background: "linear-gradient(135deg, #2563EB, #06B6D4)",
                  boxShadow: "0 4px 16px rgba(37,99,235,0.2)"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-white", children: "My Tasks" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/70 mt-0.5", children: "Your assigned patient visits" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: handleRefresh,
                      className: "flex items-center gap-1.5 text-xs text-white/80 bg-white/20 px-3 py-1.5 rounded-full hover:bg-white/30 transition-colors",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          RefreshCw,
                          {
                            className: `w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`
                          }
                        ),
                        "Refresh"
                      ]
                    }
                  )
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-3", children: assignedTasks.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": "taskqueue.empty_state",
                className: "bg-white rounded-2xl p-8 text-center",
                style: { boxShadow: "0 8px 24px rgba(0,0,0,0.08)" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "w-10 h-10 text-gray-300 mx-auto mb-3" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 font-medium", children: "No tasks assigned yet." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-sm mt-1", children: "Stay available — new assignments will appear here." })
                ]
              }
            ) : assignedTasks.map((task, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(AssignedTaskCard, { task, idx }, task.id)) })
          ] })
        ]
      }
    );
  }
  const pendingCount = tasks.filter((t) => {
    if (t.kind === "homeCollection") return t.data.status === "ASSIGNED";
    return t.data.status === "SAMPLE_COLLECTED";
  }).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative min-h-screen pb-[90px] page-fade-in",
      style: { background: "#F7F9FC" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(HealthcareBg, { variant: "minimal", opacity: 0.04 }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                background: "linear-gradient(135deg, #2563EB, #06B6D4)",
                padding: "20px 16px 16px"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-white", children: "Task Queue" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-white/70 mt-0.5", children: [
                    pendingCount,
                    " pending tasks"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "taskqueue.refresh.button",
                    onClick: handleRefresh,
                    className: "flex items-center gap-1.5 text-xs text-white/80 bg-white/20 px-3 py-1.5 rounded-full hover:bg-white/30 transition-colors",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        RefreshCw,
                        {
                          className: `w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`
                        }
                      ),
                      "Refresh"
                    ]
                  }
                )
              ] })
            }
          ),
          assignedTasks.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h2",
              {
                style: {
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#374151",
                  marginBottom: 10
                },
                children: "Admin Assigned Tasks"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: assignedTasks.map((task, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(AssignedTaskCard, { task, idx }, task.id)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4", children: tasks.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": "taskqueue.empty_state",
              className: "bg-white rounded-2xl p-8 text-center",
              style: { boxShadow: "0 8px 24px rgba(0,0,0,0.08)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "w-10 h-10 text-gray-300 mx-auto mb-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 font-medium", children: "All tasks completed!" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-400 text-sm mt-1", children: [
                  "Last updated: ",
                  lastUpdated.toLocaleTimeString()
                ] })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: tasks.map((item, idx) => {
            if (item.kind === "homeCollection") {
              const hc = item.data;
              const statusStyle2 = getTaskStatusColor(hc.status);
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  "data-ocid": `taskqueue.item.${idx + 1}`,
                  className: "bg-white rounded-2xl p-4",
                  style: { boxShadow: "0 8px 24px rgba(0,0,0,0.08)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-gray-800 text-sm", children: hc.patientName }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mt-0.5", children: "Home Collection" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-xs font-semibold px-2.5 py-1 rounded-full",
                          style: {
                            background: statusStyle2.bg,
                            color: statusStyle2.text
                          },
                          children: getTaskStatusLabel(hc.status)
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-gray-500", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3 flex-shrink-0" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: hc.address })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-gray-500 mt-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TestTube, { className: "w-3 h-3 flex-shrink-0" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: hc.tests.map((t) => t.testName).join(", ") })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-gray-400 mt-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3 flex-shrink-0" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: new Date(hc.timestamp).toLocaleTimeString() })
                    ] })
                  ]
                },
                hc.id
              );
            }
            const s = item.data;
            const statusStyle = getTaskStatusColor(s.status);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": `taskqueue.item.${idx + 1}`,
                className: "bg-white rounded-2xl p-4",
                style: { boxShadow: "0 8px 24px rgba(0,0,0,0.08)" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-gray-800 text-sm", children: s.patientName }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mt-0.5", children: "Hospital Sample" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "text-xs font-semibold px-2.5 py-1 rounded-full",
                        style: {
                          background: statusStyle.bg,
                          color: statusStyle.text
                        },
                        children: getTaskStatusLabel(s.status)
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-gray-500", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TestTube, { className: "w-3 h-3 flex-shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: s.tests.map((t) => t.testName).join(", ") })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-gray-400 mt-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3 flex-shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "Sample #",
                      s.sampleId ?? s.id.slice(-6)
                    ] })
                  ] })
                ]
              },
              s.id
            );
          }) }) })
        ] })
      ]
    }
  );
}
export {
  TaskQueuePage as default
};
