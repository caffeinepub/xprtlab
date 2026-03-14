import { r as reactExports, j as jsxRuntimeExports } from "./index-77iKE7z5.js";
import { x as useGetAllIncidents, L as LoaderCircle } from "./ProfileSetupModal-BB_monh5.js";
import { S as ShieldAlert } from "./StaffApp-BNhKtWAK.js";
import "./user-EeFrjssy.js";
import "./demoData-wn8GRowF.js";
import "./clock-BEcvoIYA.js";
import "./building-2-63YCEJlt.js";
import "./map-pin-BZNwjx3t.js";
import "./search-Bq-Fk22W.js";
function IncidentsPage({
  onNavigate: _onNavigate
}) {
  const [severityFilter, setSeverityFilter] = reactExports.useState("all");
  const { data: incidents = [], isLoading } = useGetAllIncidents();
  const getSeverityKey = (severity) => {
    if (typeof severity === "string") return severity;
    if (typeof severity === "object" && severity !== null)
      return Object.keys(severity)[0];
    return "low";
  };
  const filtered = incidents.filter((inc) => {
    const sev = getSeverityKey(inc.severity);
    return severityFilter === "all" || sev === severityFilter;
  });
  const severityColors = {
    low: "bg-green-100 text-green-700 border-green-200",
    medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
    high: "bg-red-100 text-red-700 border-red-200"
  };
  const formatTime = (ts) => {
    const ms = ts > 1e12 ? ts / 1e6 : ts;
    return new Date(ms).toLocaleString("en-IN");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-4 max-w-2xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-foreground", children: "Incidents" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: ["all", "low", "medium", "high"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setSeverityFilter(s),
        className: `px-3 py-1 rounded-full text-xs font-semibold transition-colors ${severityFilter === s ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"}`,
        children: s.charAt(0).toUpperCase() + s.slice(1)
      },
      s
    )) }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-primary" }) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-12 text-center space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "h-10 w-10 text-muted-foreground/40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "No incidents found" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: filtered.map((incident) => {
      var _a, _b, _c;
      const sevKey = getSeverityKey(incident.severity);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `bg-white rounded-2xl border shadow-sm p-4 space-y-2 ${severityColors[sevKey] || "border-border"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-xs font-bold px-2 py-0.5 rounded-full border ${severityColors[sevKey]}`,
                  children: sevKey.toUpperCase()
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: formatTime(Number(incident.timestamp)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: incident.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-mono", children: [
              "Reporter: ",
              (_a = incident.reporter) == null ? void 0 : _a.toString()
            ] }),
            incident.photo && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: typeof incident.photo === "string" ? incident.photo : (_c = (_b = incident.photo) == null ? void 0 : _b.getDirectURL) == null ? void 0 : _c.call(_b),
                alt: "Incident",
                className: "w-full max-h-40 object-cover rounded-xl"
              }
            ) })
          ]
        },
        incident.id
      );
    }) })
  ] });
}
export {
  IncidentsPage as default
};
