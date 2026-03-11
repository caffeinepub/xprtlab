import { r as reactExports, j as jsxRuntimeExports } from "./index-D697BR3C.js";
import { s as useGetAllBookings, t as useUpdateBookingStatus, L as LoaderCircle } from "./ProfileSetupModal-DNPvAtBR.js";
import { S as Search } from "./search-CTGOQP-G.js";
import { C as Calendar } from "./calendar-CMje97JC.js";
function AdminBookingsPage({
  onNavigate
}) {
  const [search, setSearch] = reactExports.useState("");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const { data: bookings = [], isLoading } = useGetAllBookings();
  const updateStatusMutation = useUpdateBookingStatus();
  const getStatusKey = (status) => {
    if (typeof status === "string") return status;
    if (typeof status === "object" && status !== null)
      return Object.keys(status)[0];
    return "unknown";
  };
  const filtered = bookings.filter((b) => {
    var _a, _b, _c;
    const statusKey = getStatusKey(b.status);
    const matchStatus = statusFilter === "all" || statusKey === statusFilter;
    const matchSearch = !search || ((_a = b.patientName) == null ? void 0 : _a.toLowerCase().includes(search.toLowerCase())) || ((_b = b.patient) == null ? void 0 : _b.toString().includes(search)) || ((_c = b.id) == null ? void 0 : _c.includes(search));
    return matchStatus && matchSearch;
  });
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
    canceled: "bg-red-100 text-red-700"
  };
  const formatTime = (ts) => {
    const ms = ts > 1e12 ? ts / 1e6 : ts;
    return new Date(ms).toLocaleString("en-IN");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-4 max-w-2xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-foreground", children: "Bookings" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-border shadow-sm p-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            placeholder: "Search by patient or booking ID...",
            className: "w-full pl-9 pr-3 py-2 rounded-xl border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: [
        "all",
        "pending",
        "confirmed",
        "completed",
        "canceled"
      ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setStatusFilter(s),
          className: `px-3 py-1 rounded-full text-xs font-semibold transition-colors ${statusFilter === s ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"}`,
          children: s.charAt(0).toUpperCase() + s.slice(1)
        },
        s
      )) })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-primary" }) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-12 text-center space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-10 w-10 text-muted-foreground/40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "No bookings found" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: filtered.map((booking) => {
      const statusKey = getStatusKey(booking.status);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-white rounded-2xl border border-border shadow-sm p-4 space-y-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm text-foreground", children: booking.patientName || "Patient" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono", children: booking.id })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-xs font-semibold px-2 py-0.5 rounded-full ${statusColors[statusKey] || "bg-gray-100 text-gray-600"}`,
                  children: statusKey
                }
              )
            ] }),
            booking.tests && booking.tests.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "Tests: ",
              booking.tests.map((t) => t.name).join(", ")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "Slot: ",
              booking.slot
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: formatTime(Number(booking.timestamp)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap pt-1", children: [
              ["confirmed", "completed", "canceled"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => updateStatusMutation.mutate({
                    id: booking.id,
                    status: s
                  }),
                  disabled: updateStatusMutation.isPending || statusKey === s,
                  className: `px-3 py-1 rounded-xl text-xs font-semibold border transition-colors disabled:opacity-40 ${statusKey === s ? "bg-primary/10 border-primary/20 text-primary" : "border-border hover:bg-muted/50"}`,
                  children: s.charAt(0).toUpperCase() + s.slice(1)
                },
                s
              )),
              onNavigate && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => onNavigate("upload-report"),
                  className: "px-3 py-1 rounded-xl text-xs font-semibold border border-primary/20 text-primary hover:bg-primary/5 transition-colors",
                  children: "Upload Report"
                }
              )
            ] })
          ]
        },
        booking.id
      );
    }) })
  ] });
}
export {
  AdminBookingsPage as default
};
