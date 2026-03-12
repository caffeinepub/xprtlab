import { r as reactExports, j as jsxRuntimeExports } from "./index-lVn_hGWr.js";
import { H as HealthcareBg } from "./ProfileSetupModal-BYStubB_.js";
import { P as PageHeroHeader } from "./PageHeroHeader-iVDMtqNX.js";
import { b as getDemoHomeCollections, c as getDemoSamples } from "./demoData-B0MQ4MOM.js";
import { R as RefreshCw } from "./refresh-cw-DhSWkTpS.js";
import { C as ClipboardList, T as TestTube } from "./StaffApp-GSTH_5VV.js";
import { M as MapPin } from "./map-pin-D6z2p51m.js";
import { C as Clock } from "./clock-fiwY_hPt.js";
import { C as CircleAlert } from "./circle-alert-Byqvf5bL.js";
import { C as CircleCheckBig } from "./circle-check-big-CKsn2ZsM.js";
import "./plus-BegRxyQ4.js";
import "./user-D8SUbWXo.js";
import "./building-2-CzOXe9xM.js";
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
function TaskQueuePage({
  isDemoMode = false,
  onNavigate
}) {
  const [tasks, setTasks] = reactExports.useState([]);
  const [lastUpdated, setLastUpdated] = reactExports.useState(/* @__PURE__ */ new Date());
  const [isRefreshing, setIsRefreshing] = reactExports.useState(false);
  const loadTasks = reactExports.useCallback(() => {
    if (!isDemoMode) return;
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
  }, [isDemoMode]);
  reactExports.useEffect(() => {
    loadTasks();
  }, [loadTasks]);
  reactExports.useEffect(() => {
    if (!isDemoMode) return;
    const interval = setInterval(loadTasks, 3e4);
    return () => clearInterval(interval);
  }, [isDemoMode, loadTasks]);
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              PageHeroHeader,
              {
                title: "My Tasks",
                description: "View and manage your assigned collection tasks"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "px-4 pt-5 pb-4",
                style: {
                  background: "linear-gradient(135deg, #0D47A1, #26A69A)",
                  boxShadow: "0 4px 16px rgba(13,71,161,0.2)"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-white", children: "Task Queue" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-white/70 mt-0.5", children: [
                      "Last updated: ",
                      lastUpdated.toLocaleTimeString()
                    ] })
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "bg-white rounded-2xl p-8 text-center",
                style: { boxShadow: "0 8px 24px rgba(0,0,0,0.08)" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "w-10 h-10 text-gray-300 mx-auto mb-3" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 font-medium", children: "No tasks yet." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-sm mt-1", children: "Stay available — new assignments will appear automatically." })
                ]
              }
            ) })
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
              className: "px-4 pt-5 pb-5",
              style: {
                background: "linear-gradient(135deg, #0D47A1, #26A69A)",
                boxShadow: "0 4px 20px rgba(13,71,161,0.2)"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-white", children: "Task Queue" }),
                    pendingCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full", children: pendingCount })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-white/70 mt-0.5", children: [
                    "Last updated: ",
                    lastUpdated.toLocaleTimeString()
                  ] })
                ] }) }),
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
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-white rounded-2xl p-4 mb-4",
              style: { boxShadow: "0 8px 24px rgba(0,0,0,0.08)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "font-semibold text-gray-500 uppercase tracking-wide mb-3",
                    style: { fontSize: "12px" },
                    children: "Active Tasks"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl p-3", style: { background: "#EFF6FF" }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "bg-blue-100 flex items-center justify-center",
                          style: {
                            width: "28px",
                            height: "28px",
                            borderRadius: "8px"
                          },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5 text-blue-600" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-blue-700", children: "Home Visits" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-blue-700", children: tasks.filter((t) => t.kind === "homeCollection").length })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl p-3", style: { background: "#F0FDFA" }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "bg-teal-100 flex items-center justify-center",
                          style: {
                            width: "28px",
                            height: "28px",
                            borderRadius: "8px"
                          },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(TestTube, { className: "w-3.5 h-3.5 text-teal-600" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-teal-700", children: "Hospital Samples" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-teal-700", children: tasks.filter((t) => t.kind === "hospitalSample").length })
                  ] })
                ] })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 space-y-3", children: tasks.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-white rounded-2xl p-8 text-center",
              style: { boxShadow: "0 8px 24px rgba(0,0,0,0.08)" },
              "data-ocid": "task_queue.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "w-10 h-10 text-gray-300 mx-auto mb-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 font-medium", children: "No tasks yet." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-sm mt-1", children: "Stay available — new assignments will appear automatically." })
              ]
            }
          ) : tasks.map((task, idx) => {
            if (task.kind === "homeCollection") {
              const hc = task.data;
              const statusStyle = getTaskStatusColor(hc.status);
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  "data-ocid": `task_queue.item.${idx + 1}`,
                  className: "bg-white rounded-2xl p-4 transition-all duration-200",
                  style: {
                    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                    borderRadius: "16px"
                  },
                  onMouseEnter: (e) => {
                    e.currentTarget.style.boxShadow = "0 12px 32px rgba(13,71,161,0.12)";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  },
                  onMouseLeave: (e) => {
                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";
                    e.currentTarget.style.transform = "";
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "bg-blue-50 flex items-center justify-center flex-shrink-0",
                            style: {
                              width: "42px",
                              height: "42px",
                              borderRadius: "12px"
                            },
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-5 h-5 text-blue-600" })
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-blue-600 uppercase tracking-wide", children: "Home Visit" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              className: "font-semibold text-gray-900",
                              style: { fontSize: "15px" },
                              children: hc.patientName
                            }
                          )
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-xs font-semibold px-2.5 py-1 rounded-full",
                          style: {
                            background: statusStyle.bg,
                            color: statusStyle.text
                          },
                          children: getTaskStatusLabel(hc.status)
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-1.5 mb-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-600 leading-relaxed", children: hc.address })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5 text-gray-400" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-500", children: hc.slot })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1", children: hc.tests.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full",
                          children: t.testCode
                        },
                        t.testId
                      )) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => onNavigate == null ? void 0 : onNavigate("home-collection"),
                        className: "mt-3 w-full text-xs text-blue-600 font-semibold bg-blue-50 py-2 rounded-xl transition-colors hover:bg-blue-100",
                        children: "View Details →"
                      }
                    )
                  ]
                },
                `hc-${hc.id}`
              );
            }
            const s = task.data;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": `task_queue.item.${idx + 1}`,
                className: "bg-white rounded-2xl p-4 transition-all duration-200",
                style: {
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                  borderRadius: "16px"
                },
                onMouseEnter: (e) => {
                  e.currentTarget.style.boxShadow = "0 12px 32px rgba(13,71,161,0.12)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                },
                onMouseLeave: (e) => {
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";
                  e.currentTarget.style.transform = "";
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "bg-teal-50 flex items-center justify-center flex-shrink-0",
                          style: {
                            width: "42px",
                            height: "42px",
                            borderRadius: "12px"
                          },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(TestTube, { className: "w-5 h-5 text-teal-600" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-teal-600 uppercase tracking-wide", children: "Hospital Sample" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "font-semibold text-gray-900",
                            style: { fontSize: "15px" },
                            children: s.patientName
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold px-2.5 py-1 rounded-full bg-teal-50 text-teal-700", children: s.status === "SAMPLE_COLLECTED" ? "Collected" : "Dispatched" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3.5 h-3.5 text-gray-400" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-gray-500", children: [
                      s.paymentMode,
                      " · ₹",
                      s.finalAmount
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1 mb-2", children: s.tests.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full",
                      children: t.testCode
                    },
                    t.testId
                  )) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => onNavigate == null ? void 0 : onNavigate("my-samples"),
                      className: "w-full text-xs text-teal-600 font-semibold bg-teal-50 py-2 rounded-xl transition-colors hover:bg-teal-100",
                      children: "View Sample →"
                    }
                  )
                ]
              },
              `s-${s.id}`
            );
          }) }),
          tasks.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 mt-4 pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-2 text-xs text-green-600 bg-green-50 rounded-xl p-3",
              style: { borderRadius: "12px" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "You have ",
                  tasks.length,
                  " active task",
                  tasks.length !== 1 ? "s" : "",
                  " today"
                ] })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
export {
  TaskQueuePage as default
};
