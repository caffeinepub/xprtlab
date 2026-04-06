import { r as reactExports, j as jsxRuntimeExports } from "./index-B7xknVMR.js";
import { H as HealthcareBg, L as LoaderCircle } from "./ProfileSetupModal-DfInIjYJ.js";
import { g as getTasksByUser, C as ClipboardList } from "./StaffApp--zLW7ypP.js";
import { R as RefreshCw } from "./refresh-cw-CAKX9LJQ.js";
import { M as MapPin } from "./map-pin-BcAKlV_x.js";
import { U as User } from "./user-CRVyV4pa.js";
import "./clock-ARlzPVqV.js";
import "./building-2-BVyd-as-.js";
import "./package-CGMzBpeW.js";
import "./search-CLhvwCdA.js";
const STATUS_STYLES = {
  assigned: { bg: "#F3F4F6", color: "#6B7280" },
  in_progress: { bg: "#DBEAFE", color: "#1D4ED8" },
  completed: { bg: "#D1FAE5", color: "#065F46" }
};
function getSessionMobile() {
  try {
    const s = localStorage.getItem("xpertlab_session");
    if (!s) return "";
    const parsed = JSON.parse(s);
    return (parsed == null ? void 0 : parsed.mobileNumber) ?? (parsed == null ? void 0 : parsed.mobile) ?? "";
  } catch {
    return "";
  }
}
function TaskCard({ task, idx }) {
  const s = STATUS_STYLES[task.status.toLowerCase()] ?? STATUS_STYLES.assigned;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `taskqueue.item.${idx + 1}`,
      style: {
        background: "white",
        borderRadius: 16,
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        padding: 16,
        borderLeft: "4px solid #2563EB"
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
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontWeight: 700, fontSize: 15, color: "#111827" }, children: task.patient_name }),
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
                  children: task.status.charAt(0).toUpperCase() + task.status.slice(1)
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              fontSize: 12,
              color: "#9CA3AF",
              marginBottom: 6
            },
            children: task.task_id
          }
        ),
        task.hospital_id && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 13,
              color: "#6B7280"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5" }),
              "Hospital: ",
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
              fontSize: 12,
              color: "#9CA3AF",
              marginTop: 6
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3 h-3" }),
              "Assigned by: ",
              task.assigned_by,
              " ·",
              " ",
              new Date(Number(task.created_at) / 1e6).toLocaleDateString()
            ]
          }
        )
      ]
    }
  );
}
function TaskQueuePage(_props) {
  const [tasks, setTasks] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [isRefreshing, setIsRefreshing] = reactExports.useState(false);
  const loadTasks = reactExports.useCallback(async () => {
    const mobile = getSessionMobile();
    if (!mobile) {
      setTasks([]);
      return;
    }
    try {
      const result = await getTasksByUser(mobile);
      setTasks(result);
    } catch {
      setTasks([]);
    }
  }, []);
  reactExports.useEffect(() => {
    setLoading(true);
    loadTasks().finally(() => setLoading(false));
  }, [loadTasks]);
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadTasks();
    setIsRefreshing(false);
  };
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
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-3", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-white rounded-2xl p-8 text-center",
              style: { boxShadow: "0 8px 24px rgba(0,0,0,0.08)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-8 h-8 text-blue-500 mx-auto animate-spin mb-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-sm", children: "Loading your tasks..." })
              ]
            }
          ) : tasks.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
          ) : tasks.map((task, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(TaskCard, { task, idx }, task.task_id)) })
        ] })
      ]
    }
  );
}
export {
  TaskQueuePage as default
};
