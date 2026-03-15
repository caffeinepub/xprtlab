import { j as jsxRuntimeExports, r as reactExports } from "./index-BcSF07MB.js";
import { c as cva } from "./index-hKQIW38e.js";
import { d as createLucideIcon, c as cn, e as useActor, z as useQuery } from "./ProfileSetupModal-DZhF98LT.js";
import { B as Badge } from "./badge-D6H4sPB8.js";
import { B as Button } from "./button-wOnNUJ71.js";
import { I as Input } from "./input-BiZ8Warn.js";
import { S as Skeleton } from "./skeleton-j2Ru2Hzr.js";
import { S as Shield, U as User } from "./user-BR4Wwed5.js";
import { R as RefreshCw } from "./refresh-cw-C-Eluhow.js";
import { S as Search } from "./search-DHbyPuXy.js";
import { D as Download } from "./download-hSuMNOtA.js";
import { B as Building2 } from "./building-2-2WTSU1FY.js";
import { C as CreditCard, D as DollarSign } from "./dollar-sign-Bk7aZk9j.js";
import { C as Clock } from "./clock-Bi5ilDhW.js";
import { T as TriangleAlert } from "./triangle-alert-DREXHRAq.js";
import { C as CircleCheck } from "./circle-check-Dw9Il_Ru.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode);
const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive: "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Alert({
  className,
  variant,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "alert",
      role: "alert",
      className: cn(alertVariants({ variant }), className),
      ...props
    }
  );
}
function AlertDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "alert-description",
      className: cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className
      ),
      ...props
    }
  );
}
function formatTimestamp(ts) {
  const ms = typeof ts === "bigint" ? Number(ts) / 1e6 : ts > 1e12 ? ts / 1e6 : ts;
  return new Date(ms).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}
function getLogStatus(log) {
  if (log.status) return log.status;
  const reason = (log.reason ?? log.actionType ?? "").toUpperCase();
  if (reason.includes("UNAUTHORIZED") || reason.includes("REJECTED") || reason.includes("MISMATCH") || reason.includes("SHIFT_CLOSED")) {
    return "rejected";
  }
  if (reason.includes("SUSPICIOUS") || reason.includes("ATTEMPT")) {
    return "suspicious";
  }
  return "success";
}
function getStatusIcon(status) {
  switch (status) {
    case "success":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-success" });
    case "rejected":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4 text-destructive" });
    case "suspicious":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 text-warning" });
  }
}
function getStatusBadgeVariant(status) {
  switch (status) {
    case "success":
      return "default";
    case "rejected":
      return "destructive";
    case "suspicious":
      return "secondary";
  }
}
function getRejectionLabel(log) {
  const reason = (log.reason ?? log.actionType ?? "").toUpperCase();
  if (reason.includes("UNAUTHORIZED_HOSPITAL")) return "Unauthorized Hospital";
  if (reason.includes("SHIFT_CLOSED")) return "Shift Closed";
  if (reason.includes("PAYMENT_MISMATCH") || reason.includes("AMOUNT_MISMATCH"))
    return "Payment Mismatch";
  if (reason.includes("UNAUTHORIZED")) return "Unauthorized";
  return log.reason ?? log.actionType ?? "Unknown";
}
const MOCK_AUDIT_LOGS = [
  {
    id: "1",
    phlebotomistId: "phleb-001",
    hospitalId: "HOSP-A",
    paymentMode: "CASH",
    finalAmount: 750,
    actionType: "SAMPLE_CREATED",
    timestamp: Date.now() - 3e5,
    status: "success"
  },
  {
    id: "2",
    phlebotomistId: "phleb-002",
    hospitalId: "HOSP-B",
    paymentMode: "UPI",
    finalAmount: 0,
    actionType: "UNAUTHORIZED_HOSPITAL",
    reason: "UNAUTHORIZED_HOSPITAL",
    timestamp: Date.now() - 6e5,
    status: "rejected"
  },
  {
    id: "3",
    phlebotomistId: "phleb-001",
    hospitalId: "HOSP-A",
    paymentMode: "CASH",
    finalAmount: 0,
    actionType: "SHIFT_CLOSED",
    reason: "SHIFT_CLOSED",
    timestamp: Date.now() - 9e5,
    status: "rejected"
  },
  {
    id: "4",
    phlebotomistId: "phleb-003",
    hospitalId: "HOSP-C",
    paymentMode: "CREDIT",
    finalAmount: 1200,
    actionType: "SAMPLE_CREATED",
    timestamp: Date.now() - 12e5,
    status: "success"
  },
  {
    id: "5",
    phlebotomistId: "phleb-002",
    hospitalId: "HOSP-A",
    paymentMode: "CASH",
    submittedAmount: 500,
    expectedAmount: 750,
    finalAmount: 0,
    actionType: "PAYMENT_MISMATCH",
    reason: "PAYMENT_MISMATCH",
    timestamp: Date.now() - 15e5,
    status: "suspicious"
  }
];
function downloadCSV(rows) {
  const headers = [
    "ID",
    "Phlebotomist",
    "Hospital",
    "Action Type",
    "Status",
    "Amount",
    "Timestamp"
  ];
  const csvRows = rows.map((log) => [
    log.id ?? "",
    log.phlebotomistId ?? log.actorId ?? "",
    log.hospitalId ?? "",
    log.actionType ?? "",
    getLogStatus(log),
    log.finalAmount !== void 0 ? String(log.finalAmount) : "",
    formatTimestamp(log.timestamp)
  ]);
  const csv = [headers, ...csvRows].map(
    (row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
  ).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "audit-logs-export.csv";
  a.click();
  URL.revokeObjectURL(url);
}
function AuditLogsPage({
  onNavigate: _onNavigate
}) {
  const { actor, isFetching: actorFetching } = useActor();
  const [search, setSearch] = reactExports.useState("");
  const [dateFrom, setDateFrom] = reactExports.useState("");
  const [dateTo, setDateTo] = reactExports.useState("");
  const [filterType, setFilterType] = reactExports.useState("all");
  const [filterPhlebotomist, setFilterPhlebotomist] = reactExports.useState("");
  const [filterHospital, setFilterHospital] = reactExports.useState("");
  const [filterActionType, setFilterActionType] = reactExports.useState("");
  const [page, setPage] = reactExports.useState(1);
  const PAGE_SIZE = 20;
  const {
    data: rawLogs,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ["auditLogs"],
    queryFn: async () => {
      var _a;
      if (!actor) return MOCK_AUDIT_LOGS;
      try {
        const logs2 = await ((_a = actor.getAuditLogs) == null ? void 0 : _a.call(actor));
        if (!logs2 || logs2.length === 0) return MOCK_AUDIT_LOGS;
        return logs2;
      } catch {
        return MOCK_AUDIT_LOGS;
      }
    },
    enabled: !!actor && !actorFetching,
    staleTime: 3e4
  });
  const logs = rawLogs ?? MOCK_AUDIT_LOGS;
  const phlebotomistOptions = reactExports.useMemo(() => {
    const ids = /* @__PURE__ */ new Set();
    for (const log of logs) {
      const id = log.phlebotomistId ?? log.actorId;
      if (id) ids.add(id);
    }
    return Array.from(ids).sort();
  }, [logs]);
  const hospitalOptions = reactExports.useMemo(() => {
    const ids = /* @__PURE__ */ new Set();
    for (const log of logs) {
      if (log.hospitalId) ids.add(log.hospitalId);
    }
    return Array.from(ids).sort();
  }, [logs]);
  const actionTypeOptions = reactExports.useMemo(() => {
    const types = /* @__PURE__ */ new Set();
    for (const log of logs) {
      if (log.actionType) types.add(log.actionType);
    }
    return Array.from(types).sort();
  }, [logs]);
  const filtered = logs.filter((log) => {
    const status = getLogStatus(log);
    if (filterType !== "all" && status !== filterType) return false;
    if (filterPhlebotomist) {
      const id = log.phlebotomistId ?? log.actorId ?? "";
      if (id !== filterPhlebotomist) return false;
    }
    if (filterHospital && log.hospitalId !== filterHospital) return false;
    if (filterActionType && log.actionType !== filterActionType) return false;
    const searchLower = search.toLowerCase();
    if (search) {
      const matchesPhlebotomist = (log.phlebotomistId ?? log.actorId ?? "").toLowerCase().includes(searchLower);
      const matchesHospital = (log.hospitalId ?? "").toLowerCase().includes(searchLower);
      const matchesAction = (log.actionType ?? "").toLowerCase().includes(searchLower);
      const matchesReason = (log.reason ?? "").toLowerCase().includes(searchLower);
      if (!matchesPhlebotomist && !matchesHospital && !matchesAction && !matchesReason)
        return false;
    }
    if (dateFrom || dateTo) {
      const ts = typeof log.timestamp === "bigint" ? Number(log.timestamp) / 1e6 : log.timestamp > 1e12 ? log.timestamp / 1e6 : log.timestamp;
      const logDate = new Date(ts);
      if (dateFrom && logDate < new Date(dateFrom)) return false;
      if (dateTo && logDate > /* @__PURE__ */ new Date(`${dateTo}T23:59:59`)) return false;
    }
    return true;
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const counts = {
    all: logs.length,
    success: logs.filter((l) => getLogStatus(l) === "success").length,
    rejected: logs.filter((l) => getLogStatus(l) === "rejected").length,
    suspicious: logs.filter((l) => getLogStatus(l) === "suspicious").length
  };
  const selectClass = "w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background pb-[90px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border px-4 py-4 sticky top-0 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-5 h-5 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-bold text-foreground", children: "🛡️ Audit Logs" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "All system actions & security events" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "icon",
          onClick: () => refetch(),
          disabled: isLoading,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            RefreshCw,
            {
              className: `w-4 h-4 ${isLoading ? "animate-spin" : ""}`
            }
          )
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-4 max-w-3xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-2", children: [
        {
          key: "all",
          label: "Total",
          color: "text-foreground",
          bg: "bg-muted"
        },
        {
          key: "success",
          label: "Success",
          color: "text-success",
          bg: "bg-success/10"
        },
        {
          key: "rejected",
          label: "Rejected",
          color: "text-destructive",
          bg: "bg-destructive/10"
        },
        {
          key: "suspicious",
          label: "Suspicious",
          color: "text-warning",
          bg: "bg-warning/10"
        }
      ].map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => {
            setFilterType(stat.key);
            setPage(1);
          },
          className: `${stat.bg} rounded-xl p-2.5 text-center transition-all ${filterType === stat.key ? "ring-2 ring-primary" : ""}`,
          "data-ocid": `audit.${stat.key}.tab`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-lg font-bold ${stat.color}`, children: counts[stat.key] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: stat.label })
          ]
        },
        stat.key
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl shadow-card p-4 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Search by phlebotomist, hospital, action...",
                value: search,
                onChange: (e) => {
                  setSearch(e.target.value);
                  setPage(1);
                },
                className: "pl-9",
                "data-ocid": "audit.search_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => downloadCSV(filtered),
              className: "flex items-center gap-1.5 text-xs shrink-0",
              "data-ocid": "audit.download.button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
                "Download CSV"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "audit-filter-phlebo",
                className: "text-xs text-muted-foreground mb-1 block",
                children: "Phlebotomist"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                value: filterPhlebotomist,
                onChange: (e) => {
                  setFilterPhlebotomist(e.target.value);
                  setPage(1);
                },
                className: selectClass,
                id: "audit-filter-phlebo",
                "data-ocid": "audit.phlebotomist.select",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All Phlebotomists" }),
                  phlebotomistOptions.map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: id, children: id }, id))
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "audit-filter-hospital",
                className: "text-xs text-muted-foreground mb-1 block",
                children: "Hospital"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                value: filterHospital,
                onChange: (e) => {
                  setFilterHospital(e.target.value);
                  setPage(1);
                },
                className: selectClass,
                id: "audit-filter-hospital",
                "data-ocid": "audit.hospital.select",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All Hospitals" }),
                  hospitalOptions.map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: id, children: id }, id))
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "audit-filter-action",
                className: "text-xs text-muted-foreground mb-1 block",
                children: "Action Type"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                value: filterActionType,
                onChange: (e) => {
                  setFilterActionType(e.target.value);
                  setPage(1);
                },
                className: selectClass,
                id: "audit-filter-action",
                "data-ocid": "audit.action_type.select",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All Actions" }),
                  actionTypeOptions.map((type) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: type, children: type }, type))
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "audit-date-from",
                className: "text-xs text-muted-foreground mb-1 block",
                children: "From"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "audit-date-from",
                type: "date",
                value: dateFrom,
                onChange: (e) => {
                  setDateFrom(e.target.value);
                  setPage(1);
                },
                className: selectClass,
                "data-ocid": "audit.date_from.input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "audit-date-to",
                className: "text-xs text-muted-foreground mb-1 block",
                children: "To"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "audit-date-to",
                type: "date",
                value: dateTo,
                onChange: (e) => {
                  setDateTo(e.target.value);
                  setPage(1);
                },
                className: selectClass,
                "data-ocid": "audit.date_to.input"
              }
            )
          ] })
        ] })
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl shadow-card p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4 mb-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/2 mb-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-2/3" })
      ] }, i)) }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { variant: "destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { children: "Failed to load audit logs." }) }) : paginated.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card rounded-2xl shadow-card p-8 text-center",
          "data-ocid": "audit.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-12 h-12 text-muted-foreground mx-auto mb-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No audit logs found matching your filters." })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: paginated.map((log, idx) => {
        const status = getLogStatus(log);
        const isRejected = status === "rejected";
        const isSuspicious = status === "suspicious";
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": `audit.log.item.${idx + 1}`,
            className: `bg-card rounded-2xl shadow-card p-4 border-l-4 ${isRejected ? "border-l-destructive" : isSuspicious ? "border-l-warning" : "border-l-success"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  getStatusIcon(status),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm text-foreground", children: log.actionType ?? "SYSTEM_ACTION" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: getStatusBadgeVariant(status),
                    className: "text-xs shrink-0",
                    children: status.toUpperCase()
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 text-xs mb-3", children: [
                (log.phlebotomistId ?? log.actorId) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3 h-3 shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate font-mono", children: log.phlebotomistId ?? log.actorId })
                ] }),
                log.hospitalId && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-3 h-3 shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: log.hospitalId })
                ] }),
                log.paymentMode && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-3 h-3 shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: log.paymentMode })
                ] }),
                log.finalAmount !== void 0 && log.finalAmount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "w-3 h-3 shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                    "₹",
                    log.finalAmount.toFixed(2),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-2.5 h-2.5" })
                  ] })
                ] })
              ] }),
              (isRejected || isSuspicious) && (log.reason ?? log.actionType) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: `rounded-lg px-3 py-2 text-xs mb-3 ${isRejected ? "bg-destructive/10 text-destructive" : "bg-warning/10 text-warning"}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Reason: " }),
                    getRejectionLabel(log),
                    log.submittedAmount !== void 0 && log.expectedAmount !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1", children: [
                      "(submitted: ₹",
                      log.submittedAmount,
                      ", expected: ₹",
                      log.expectedAmount,
                      ")"
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatTimestamp(log.timestamp) })
              ] })
            ]
          },
          log.id ?? idx
        );
      }) }),
      totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => setPage((p) => Math.max(1, p - 1)),
            disabled: page === 1,
            "data-ocid": "audit.pagination_prev",
            children: "Previous"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
          "Page ",
          page,
          " of ",
          totalPages,
          " (",
          filtered.length,
          " entries)"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => setPage((p) => Math.min(totalPages, p + 1)),
            disabled: page === totalPages,
            "data-ocid": "audit.pagination_next",
            children: "Next"
          }
        )
      ] })
    ] })
  ] });
}
export {
  AuditLogsPage as default
};
