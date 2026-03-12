import { r as reactExports, j as jsxRuntimeExports } from "./index-lVn_hGWr.js";
import { W as useGetAllActiveShifts, Y as useGetAttendanceByPhlebotomist, L as LoaderCircle } from "./ProfileSetupModal-BYStubB_.js";
import { C as Clock } from "./clock-fiwY_hPt.js";
import { U as User } from "./user-D8SUbWXo.js";
function AdminAttendancePage({
  onNavigate: _onNavigate
}) {
  const [phlebotomistFilter, setPhlebotomistFilter] = reactExports.useState("");
  const [elapsedTimes, setElapsedTimes] = reactExports.useState({});
  const { data: activeShifts, isLoading: activeLoading } = useGetAllActiveShifts();
  const { data: allAttendances = [], isLoading: historyLoading } = useGetAttendanceByPhlebotomist();
  const activeShiftsArray = activeShifts ? Array.isArray(activeShifts) ? activeShifts : [activeShifts] : [];
  reactExports.useEffect(() => {
    const update = () => {
      const now = Date.now();
      const times = {};
      for (const shift of activeShiftsArray) {
        const checkIn = Number(shift.checkInTime) / 1e6;
        times[shift.phlebotomistId] = Math.floor((now - checkIn) / 6e4);
      }
      setElapsedTimes(times);
    };
    update();
    const interval = setInterval(update, 6e4);
    return () => clearInterval(interval);
  }, [activeShiftsArray]);
  const filteredHistory = allAttendances.filter(
    (a) => {
      var _a;
      return !phlebotomistFilter || ((_a = a.phlebotomistId) == null ? void 0 : _a.includes(phlebotomistFilter));
    }
  );
  const formatTime = (ts) => {
    const ms = ts > 1e12 ? ts / 1e6 : ts;
    return new Date(ms).toLocaleString("en-IN");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-4 max-w-2xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-foreground", children: "Attendance Monitoring" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-border shadow-sm p-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-bold text-foreground flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 text-green-500" }),
        "Currently Active Staff"
      ] }),
      activeLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin text-primary" }) }) : activeShiftsArray.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "No staff currently on duty." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: activeShiftsArray.map((shift) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-200",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4 text-green-600" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-green-700", children: shift.phlebotomistId }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-green-600", children: [
                  "Since ",
                  formatTime(Number(shift.checkInTime))
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-bold text-green-700", children: [
                elapsedTimes[shift.phlebotomistId] || 0,
                "m"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-green-600", children: "elapsed" })
            ] })
          ]
        },
        shift.phlebotomistId
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-border shadow-sm p-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold text-foreground", children: "Shift History" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          value: phlebotomistFilter,
          onChange: (e) => setPhlebotomistFilter(e.target.value),
          placeholder: "Filter by phlebotomist ID...",
          className: "w-full px-3 py-2 rounded-xl border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30"
        }
      ),
      historyLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin text-primary" }) }) : filteredHistory.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "No attendance records found." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: filteredHistory.map((att, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "p-3 bg-muted/30 rounded-xl space-y-1",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-foreground", children: att.phlebotomistId }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-xs font-semibold px-2 py-0.5 rounded-full ${att.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`,
                  children: att.status
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "In: ",
              formatTime(Number(att.checkInTime))
            ] }),
            att.checkOutTime && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "Out: ",
              formatTime(Number(att.checkOutTime))
            ] }),
            att.totalWorkingMinutes && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-primary", children: [
              att.totalWorkingMinutes,
              " min worked"
            ] })
          ]
        },
        att.phlebotomistId ?? i
      )) })
    ] })
  ] });
}
export {
  AdminAttendancePage as default
};
