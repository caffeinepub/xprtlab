import type React from "react";

type StatusKey =
  // Booking statuses
  | "pending"
  | "confirmed"
  | "completed"
  | "canceled"
  // Incident severities
  | "low"
  | "medium"
  | "high"
  // Home Collection statuses
  | "ASSIGNED"
  | "EN_ROUTE"
  | "SAMPLE_COLLECTED"
  | "COMPLETED"
  // Hospital Sample statuses
  | "DISPATCHED"
  | "RECEIVED_AT_LAB"
  | "PROCESSING"
  | "REPORT_READY"
  | "REPORT_DELIVERED";

interface StatusConfig {
  label: string;
  className: string;
}

const statusConfig: Record<StatusKey, StatusConfig> = {
  // ── Booking ──────────────────────────────────────────────────────────────
  pending: {
    label: "Pending",
    className: "bg-amber-100 text-amber-800 border border-amber-200",
  },
  confirmed: {
    label: "Confirmed",
    className: "bg-blue-100 text-blue-800 border border-blue-200",
  },
  completed: {
    label: "Completed",
    className: "bg-emerald-100 text-emerald-800 border border-emerald-200",
  },
  canceled: {
    label: "Canceled",
    className: "bg-red-100 text-red-800 border border-red-200",
  },

  // ── Incident severity ────────────────────────────────────────────────────
  low: {
    label: "Low",
    className: "bg-green-100 text-green-800 border border-green-200",
  },
  medium: {
    label: "Medium",
    className: "bg-yellow-100 text-yellow-800 border border-yellow-200",
  },
  high: {
    label: "High",
    className: "bg-red-100 text-red-800 border border-red-200",
  },

  // ── Home Collection statuses ─────────────────────────────────────────────
  ASSIGNED: {
    label: "Assigned",
    className: "bg-gray-100 text-gray-700 border border-gray-200",
  },
  EN_ROUTE: {
    label: "En Route",
    className: "bg-blue-100 text-blue-700 border border-blue-200",
  },
  SAMPLE_COLLECTED: {
    label: "Sample Collected",
    className: "bg-teal-100 text-teal-700 border border-teal-200",
  },
  COMPLETED: {
    label: "Completed",
    className: "bg-emerald-100 text-emerald-800 border border-emerald-200",
  },

  // ── Hospital Sample statuses ─────────────────────────────────────────────
  DISPATCHED: {
    label: "Dispatched",
    className: "bg-blue-100 text-blue-700 border border-blue-200",
  },
  RECEIVED_AT_LAB: {
    label: "Received at Lab",
    className: "bg-purple-100 text-purple-700 border border-purple-200",
  },
  PROCESSING: {
    label: "Processing",
    className: "bg-orange-100 text-orange-700 border border-orange-200",
  },
  REPORT_READY: {
    label: "Report Ready",
    className: "bg-green-100 text-green-700 border border-green-200",
  },
  REPORT_DELIVERED: {
    label: "Report Delivered",
    className: "bg-emerald-100 text-emerald-800 border border-emerald-200",
  },
};

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  className = "",
}) => {
  const config = statusConfig[status as StatusKey];

  if (!config) {
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200 transition-all duration-300 ease-in-out ${className}`}
      >
        {status}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-all duration-300 ease-in-out ${config.className} ${className}`}
    >
      {config.label}
    </span>
  );
};

export default StatusBadge;
