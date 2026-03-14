import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import {
  AlertTriangle,
  Building2,
  CheckCircle2,
  Clock,
  CreditCard,
  DollarSign,
  Download,
  FlaskConical,
  Loader2,
  Lock,
  RefreshCw,
  Search,
  Shield,
  User,
  XCircle,
} from "lucide-react";
import React, { useMemo, useState } from "react";
import { useActor } from "../../hooks/useActor";

interface AuditLogsPageProps {
  onNavigate?: (route: string) => void;
}

interface AuditLogEntry {
  id?: string;
  actorId?: string;
  phlebotomistId?: string;
  hospitalId?: string;
  paymentMode?: string;
  finalAmount?: number;
  actionType?: string;
  reason?: string;
  targetDocument?: string;
  timestamp: number | bigint;
  status?: "success" | "rejected" | "suspicious";
  submittedAmount?: number;
  expectedAmount?: number;
}

type FilterType = "all" | "success" | "rejected" | "suspicious";

function formatTimestamp(ts: number | bigint): string {
  const ms =
    typeof ts === "bigint"
      ? Number(ts) / 1_000_000
      : ts > 1e12
        ? ts / 1_000_000
        : ts;
  return new Date(ms).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function getLogStatus(
  log: AuditLogEntry,
): "success" | "rejected" | "suspicious" {
  if (log.status) return log.status;
  const reason = (log.reason ?? log.actionType ?? "").toUpperCase();
  if (
    reason.includes("UNAUTHORIZED") ||
    reason.includes("REJECTED") ||
    reason.includes("MISMATCH") ||
    reason.includes("SHIFT_CLOSED")
  ) {
    return "rejected";
  }
  if (reason.includes("SUSPICIOUS") || reason.includes("ATTEMPT")) {
    return "suspicious";
  }
  return "success";
}

function getStatusIcon(status: "success" | "rejected" | "suspicious") {
  switch (status) {
    case "success":
      return <CheckCircle2 className="w-4 h-4 text-success" />;
    case "rejected":
      return <XCircle className="w-4 h-4 text-destructive" />;
    case "suspicious":
      return <AlertTriangle className="w-4 h-4 text-warning" />;
  }
}

function getStatusBadgeVariant(
  status: "success" | "rejected" | "suspicious",
): "default" | "destructive" | "secondary" | "outline" {
  switch (status) {
    case "success":
      return "default";
    case "rejected":
      return "destructive";
    case "suspicious":
      return "secondary";
  }
}

function getRejectionLabel(log: AuditLogEntry): string {
  const reason = (log.reason ?? log.actionType ?? "").toUpperCase();
  if (reason.includes("UNAUTHORIZED_HOSPITAL")) return "Unauthorized Hospital";
  if (reason.includes("SHIFT_CLOSED")) return "Shift Closed";
  if (reason.includes("PAYMENT_MISMATCH") || reason.includes("AMOUNT_MISMATCH"))
    return "Payment Mismatch";
  if (reason.includes("UNAUTHORIZED")) return "Unauthorized";
  return log.reason ?? log.actionType ?? "Unknown";
}

const MOCK_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: "1",
    phlebotomistId: "phleb-001",
    hospitalId: "HOSP-A",
    paymentMode: "CASH",
    finalAmount: 750,
    actionType: "SAMPLE_CREATED",
    timestamp: Date.now() - 300000,
    status: "success",
  },
  {
    id: "2",
    phlebotomistId: "phleb-002",
    hospitalId: "HOSP-B",
    paymentMode: "UPI",
    finalAmount: 0,
    actionType: "UNAUTHORIZED_HOSPITAL",
    reason: "UNAUTHORIZED_HOSPITAL",
    timestamp: Date.now() - 600000,
    status: "rejected",
  },
  {
    id: "3",
    phlebotomistId: "phleb-001",
    hospitalId: "HOSP-A",
    paymentMode: "CASH",
    finalAmount: 0,
    actionType: "SHIFT_CLOSED",
    reason: "SHIFT_CLOSED",
    timestamp: Date.now() - 900000,
    status: "rejected",
  },
  {
    id: "4",
    phlebotomistId: "phleb-003",
    hospitalId: "HOSP-C",
    paymentMode: "CREDIT",
    finalAmount: 1200,
    actionType: "SAMPLE_CREATED",
    timestamp: Date.now() - 1200000,
    status: "success",
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
    timestamp: Date.now() - 1500000,
    status: "suspicious",
  },
];

function downloadCSV(rows: AuditLogEntry[]) {
  const headers = [
    "ID",
    "Phlebotomist",
    "Hospital",
    "Action Type",
    "Status",
    "Amount",
    "Timestamp",
  ];
  const csvRows = rows.map((log) => [
    log.id ?? "",
    log.phlebotomistId ?? log.actorId ?? "",
    log.hospitalId ?? "",
    log.actionType ?? "",
    getLogStatus(log),
    log.finalAmount !== undefined ? String(log.finalAmount) : "",
    formatTimestamp(log.timestamp),
  ]);
  const csv = [headers, ...csvRows]
    .map((row) =>
      row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","),
    )
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "audit-logs-export.csv";
  a.click();
  URL.revokeObjectURL(url);
}

export default function AuditLogsPage({
  onNavigate: _onNavigate,
}: AuditLogsPageProps) {
  const { actor, isFetching: actorFetching } = useActor();
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [filterPhlebotomist, setFilterPhlebotomist] = useState("");
  const [filterHospital, setFilterHospital] = useState("");
  const [filterActionType, setFilterActionType] = useState("");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 20;

  const {
    data: rawLogs,
    isLoading,
    error,
    refetch,
  } = useQuery<AuditLogEntry[]>({
    queryKey: ["auditLogs"],
    queryFn: async () => {
      if (!actor) return MOCK_AUDIT_LOGS;
      try {
        const logs = await (actor as any).getAuditLogs?.();
        if (!logs || logs.length === 0) return MOCK_AUDIT_LOGS;
        return logs as AuditLogEntry[];
      } catch {
        return MOCK_AUDIT_LOGS;
      }
    },
    enabled: !!actor && !actorFetching,
    staleTime: 30000,
  });

  const logs = rawLogs ?? MOCK_AUDIT_LOGS;

  // Derive unique dropdown options
  const phlebotomistOptions = useMemo(() => {
    const ids = new Set<string>();
    for (const log of logs) {
      const id = log.phlebotomistId ?? log.actorId;
      if (id) ids.add(id);
    }
    return Array.from(ids).sort();
  }, [logs]);

  const hospitalOptions = useMemo(() => {
    const ids = new Set<string>();
    for (const log of logs) {
      if (log.hospitalId) ids.add(log.hospitalId);
    }
    return Array.from(ids).sort();
  }, [logs]);

  const actionTypeOptions = useMemo(() => {
    const types = new Set<string>();
    for (const log of logs) {
      if (log.actionType) types.add(log.actionType);
    }
    return Array.from(types).sort();
  }, [logs]);

  const filtered = logs.filter((log) => {
    const status = getLogStatus(log);
    if (filterType !== "all" && status !== filterType) return false;

    // Phlebotomist filter
    if (filterPhlebotomist) {
      const id = log.phlebotomistId ?? log.actorId ?? "";
      if (id !== filterPhlebotomist) return false;
    }

    // Hospital filter
    if (filterHospital && log.hospitalId !== filterHospital) return false;

    // Action type filter
    if (filterActionType && log.actionType !== filterActionType) return false;

    const searchLower = search.toLowerCase();
    if (search) {
      const matchesPhlebotomist = (log.phlebotomistId ?? log.actorId ?? "")
        .toLowerCase()
        .includes(searchLower);
      const matchesHospital = (log.hospitalId ?? "")
        .toLowerCase()
        .includes(searchLower);
      const matchesAction = (log.actionType ?? "")
        .toLowerCase()
        .includes(searchLower);
      const matchesReason = (log.reason ?? "")
        .toLowerCase()
        .includes(searchLower);
      if (
        !matchesPhlebotomist &&
        !matchesHospital &&
        !matchesAction &&
        !matchesReason
      )
        return false;
    }

    if (dateFrom || dateTo) {
      const ts =
        typeof log.timestamp === "bigint"
          ? Number(log.timestamp) / 1_000_000
          : (log.timestamp as number) > 1e12
            ? (log.timestamp as number) / 1_000_000
            : (log.timestamp as number);
      const logDate = new Date(ts);
      if (dateFrom && logDate < new Date(dateFrom)) return false;
      if (dateTo && logDate > new Date(`${dateTo}T23:59:59`)) return false;
    }

    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const counts = {
    all: logs.length,
    success: logs.filter((l) => getLogStatus(l) === "success").length,
    rejected: logs.filter((l) => getLogStatus(l) === "rejected").length,
    suspicious: logs.filter((l) => getLogStatus(l) === "suspicious").length,
  };

  const selectClass =
    "w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30";

  return (
    <div className="min-h-screen bg-background pb-[90px]">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">
                🛡️ Audit Logs
              </h1>
              <p className="text-xs text-muted-foreground">
                All system actions &amp; security events
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => refetch()}
            disabled={isLoading}
          >
            <RefreshCw
              className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
            />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4 max-w-3xl mx-auto">
        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-2">
          {[
            {
              key: "all" as FilterType,
              label: "Total",
              color: "text-foreground",
              bg: "bg-muted",
            },
            {
              key: "success" as FilterType,
              label: "Success",
              color: "text-success",
              bg: "bg-success/10",
            },
            {
              key: "rejected" as FilterType,
              label: "Rejected",
              color: "text-destructive",
              bg: "bg-destructive/10",
            },
            {
              key: "suspicious" as FilterType,
              label: "Suspicious",
              color: "text-warning",
              bg: "bg-warning/10",
            },
          ].map((stat) => (
            <button
              type="button"
              key={stat.key}
              onClick={() => {
                setFilterType(stat.key);
                setPage(1);
              }}
              className={`${stat.bg} rounded-xl p-2.5 text-center transition-all ${filterType === stat.key ? "ring-2 ring-primary" : ""}`}
              data-ocid={`audit.${stat.key}.tab`}
            >
              <p className={`text-lg font-bold ${stat.color}`}>
                {counts[stat.key]}
              </p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-card rounded-2xl shadow-card p-4 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by phlebotomist, hospital, action..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="pl-9"
                data-ocid="audit.search_input"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => downloadCSV(filtered)}
              className="flex items-center gap-1.5 text-xs shrink-0"
              data-ocid="audit.download.button"
            >
              <Download className="w-3.5 h-3.5" />
              Download CSV
            </Button>
          </div>

          {/* Additional dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <label
                htmlFor="audit-filter-phlebo"
                className="text-xs text-muted-foreground mb-1 block"
              >
                Phlebotomist
              </label>
              <select
                value={filterPhlebotomist}
                onChange={(e) => {
                  setFilterPhlebotomist(e.target.value);
                  setPage(1);
                }}
                className={selectClass}
                id="audit-filter-phlebo"
                data-ocid="audit.phlebotomist.select"
              >
                <option value="">All Phlebotomists</option>
                {phlebotomistOptions.map((id) => (
                  <option key={id} value={id}>
                    {id}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="audit-filter-hospital"
                className="text-xs text-muted-foreground mb-1 block"
              >
                Hospital
              </label>
              <select
                value={filterHospital}
                onChange={(e) => {
                  setFilterHospital(e.target.value);
                  setPage(1);
                }}
                className={selectClass}
                id="audit-filter-hospital"
                data-ocid="audit.hospital.select"
              >
                <option value="">All Hospitals</option>
                {hospitalOptions.map((id) => (
                  <option key={id} value={id}>
                    {id}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="audit-filter-action"
                className="text-xs text-muted-foreground mb-1 block"
              >
                Action Type
              </label>
              <select
                value={filterActionType}
                onChange={(e) => {
                  setFilterActionType(e.target.value);
                  setPage(1);
                }}
                className={selectClass}
                id="audit-filter-action"
                data-ocid="audit.action_type.select"
              >
                <option value="">All Actions</option>
                {actionTypeOptions.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <label
                htmlFor="audit-date-from"
                className="text-xs text-muted-foreground mb-1 block"
              >
                From
              </label>
              <input
                id="audit-date-from"
                type="date"
                value={dateFrom}
                onChange={(e) => {
                  setDateFrom(e.target.value);
                  setPage(1);
                }}
                className={selectClass}
                data-ocid="audit.date_from.input"
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="audit-date-to"
                className="text-xs text-muted-foreground mb-1 block"
              >
                To
              </label>
              <input
                id="audit-date-to"
                type="date"
                value={dateTo}
                onChange={(e) => {
                  setDateTo(e.target.value);
                  setPage(1);
                }}
                className={selectClass}
                data-ocid="audit.date_to.input"
              />
            </div>
          </div>
        </div>

        {/* Log Entries */}
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-card rounded-2xl shadow-card p-4">
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-3 w-1/2 mb-2" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            ))}
          </div>
        ) : error ? (
          <Alert variant="destructive">
            <AlertDescription>Failed to load audit logs.</AlertDescription>
          </Alert>
        ) : paginated.length === 0 ? (
          <div
            className="bg-card rounded-2xl shadow-card p-8 text-center"
            data-ocid="audit.empty_state"
          >
            <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">
              No audit logs found matching your filters.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {paginated.map((log, idx) => {
              const status = getLogStatus(log);
              const isRejected = status === "rejected";
              const isSuspicious = status === "suspicious";

              return (
                <div
                  key={log.id ?? idx}
                  data-ocid={`audit.log.item.${idx + 1}`}
                  className={`bg-card rounded-2xl shadow-card p-4 border-l-4 ${
                    isRejected
                      ? "border-l-destructive"
                      : isSuspicious
                        ? "border-l-warning"
                        : "border-l-success"
                  }`}
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(status)}
                      <span className="font-semibold text-sm text-foreground">
                        {log.actionType ?? "SYSTEM_ACTION"}
                      </span>
                    </div>
                    <Badge
                      variant={getStatusBadgeVariant(status)}
                      className="text-xs shrink-0"
                    >
                      {status.toUpperCase()}
                    </Badge>
                  </div>

                  {/* Details grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                    {(log.phlebotomistId ?? log.actorId) && (
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <User className="w-3 h-3 shrink-0" />
                        <span className="truncate font-mono">
                          {log.phlebotomistId ?? log.actorId}
                        </span>
                      </div>
                    )}
                    {log.hospitalId && (
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Building2 className="w-3 h-3 shrink-0" />
                        <span className="truncate">{log.hospitalId}</span>
                      </div>
                    )}
                    {log.paymentMode && (
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <CreditCard className="w-3 h-3 shrink-0" />
                        <span>{log.paymentMode}</span>
                      </div>
                    )}
                    {log.finalAmount !== undefined && log.finalAmount > 0 && (
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <DollarSign className="w-3 h-3 shrink-0" />
                        <span className="flex items-center gap-1">
                          ₹{log.finalAmount.toFixed(2)}
                          <Lock className="w-2.5 h-2.5" />
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Rejection reason */}
                  {(isRejected || isSuspicious) &&
                    (log.reason ?? log.actionType) && (
                      <div
                        className={`rounded-lg px-3 py-2 text-xs mb-3 ${
                          isRejected
                            ? "bg-destructive/10 text-destructive"
                            : "bg-warning/10 text-warning"
                        }`}
                      >
                        <span className="font-medium">Reason: </span>
                        {getRejectionLabel(log)}
                        {log.submittedAmount !== undefined &&
                          log.expectedAmount !== undefined && (
                            <span className="ml-1">
                              (submitted: ₹{log.submittedAmount}, expected: ₹
                              {log.expectedAmount})
                            </span>
                          )}
                      </div>
                    )}

                  {/* Timestamp */}
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{formatTimestamp(log.timestamp)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              data-ocid="audit.pagination_prev"
            >
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {page} of {totalPages} ({filtered.length} entries)
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              data-ocid="audit.pagination_next"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
