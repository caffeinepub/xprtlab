import { r as reactExports, j as jsxRuntimeExports } from "./index-vGeq55gD.js";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-URaVzQX0.js";
import { Z as useGetSecurityLogs, _ as useResetDeviceBinding, L as LoaderCircle } from "./ProfileSetupModal-DOcw6VTl.js";
import { S as Shield } from "./user-3cqi50I0.js";
import { M as MapPin } from "./map-pin-d1n1VtEa.js";
import "./button-C2phJ2Qv.js";
import "./index-xt4aa7P0.js";
const EVENT_TYPES = [
  "all",
  "login",
  "logout",
  "device_bound",
  "suspicious",
  "failed_auth"
];
const eventColors = {
  login: "bg-green-100 text-green-700",
  logout: "bg-gray-100 text-gray-600",
  device_bound: "bg-blue-100 text-blue-700",
  suspicious: "bg-red-100 text-red-700",
  failed_auth: "bg-orange-100 text-orange-700"
};
function SecurityLogsPage({
  onNavigate: _onNavigate
}) {
  const [userIdFilter, setUserIdFilter] = reactExports.useState("");
  const [selectedEventTypes, setSelectedEventTypes] = reactExports.useState([]);
  const [resetTarget, setResetTarget] = reactExports.useState(null);
  const { data: logs = [], isLoading } = useGetSecurityLogs();
  const resetMutation = useResetDeviceBinding();
  const filtered = logs.filter((log) => {
    var _a;
    const matchUser = !userIdFilter || ((_a = log.userId) == null ? void 0 : _a.includes(userIdFilter));
    const matchEvent = selectedEventTypes.length === 0 || selectedEventTypes.includes(log.eventType);
    return matchUser && matchEvent;
  });
  const toggleEventType = (type) => {
    setSelectedEventTypes(
      (prev) => prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };
  const handleResetConfirm = async () => {
    if (!resetTarget) return;
    try {
      await resetMutation.mutateAsync(resetTarget);
      setResetTarget(null);
    } catch (err) {
      console.error("Failed to reset device binding", err);
    }
  };
  const formatTime = (ts) => {
    const ms = ts > 1e12 ? ts / 1e6 : ts;
    return new Date(ms).toLocaleString("en-IN");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-4 max-w-2xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-foreground", children: "Security Logs" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-border shadow-sm p-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          value: userIdFilter,
          onChange: (e) => setUserIdFilter(e.target.value),
          placeholder: "Filter by user ID...",
          className: "w-full px-3 py-2 rounded-xl border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: EVENT_TYPES.slice(1).map((type) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => toggleEventType(type),
          className: `px-3 py-1 rounded-full text-xs font-semibold transition-colors border ${selectedEventTypes.includes(type) ? "bg-primary text-white border-primary" : `${eventColors[type] || "bg-muted text-muted-foreground"} border-transparent`}`,
          children: type.replace("_", " ")
        },
        type
      )) })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-primary" }) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-12 text-center space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-10 w-10 text-muted-foreground/40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "No security logs found" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: filtered.map((log, i) => {
      var _a, _b;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-white rounded-2xl border border-border shadow-sm p-4 space-y-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-xs font-bold px-2 py-0.5 rounded-full ${eventColors[log.eventType] || "bg-gray-100 text-gray-600"}`,
                  children: log.eventType.replace("_", " ").toUpperCase()
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: formatTime(Number(log.timestamp)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-mono text-muted-foreground", children: [
              "User: ",
              log.userId
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "Device: ",
              log.deviceId
            ] }),
            log.reason && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "Reason: ",
              log.reason
            ] }),
            (log.latitude || log.longitude) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                (_a = log.latitude) == null ? void 0 : _a.toFixed(4),
                ", ",
                (_b = log.longitude) == null ? void 0 : _b.toFixed(4)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setResetTarget(log.userId),
                className: "text-xs font-semibold text-red-600 hover:text-red-700 underline",
                children: "Reset Device Binding"
              }
            )
          ]
        },
        `${log.userId ?? ""}-${log.eventType ?? ""}-${i}`
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: !!resetTarget,
        onOpenChange: (open) => !open && setResetTarget(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Reset Device Binding" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
              "Are you sure you want to reset the device binding for user",
              " ",
              resetTarget,
              "? This will require them to re-bind their device."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              AlertDialogAction,
              {
                onClick: handleResetConfirm,
                className: "bg-red-600 hover:bg-red-700 text-white",
                children: [
                  resetMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin mr-1" }) : null,
                  "Reset Binding"
                ]
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  SecurityLogsPage as default
};
