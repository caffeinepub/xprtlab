import { j as jsxRuntimeExports } from "./index-vGeq55gD.js";
const statusStyles = {
  // ── Booking ──────────────────────────────────────────────────────────────
  pending: {
    bg: "rgba(245,158,11,0.15)",
    color: "#B45309",
    label: "Pending"
  },
  confirmed: {
    bg: "rgba(59,130,246,0.15)",
    color: "#1D4ED8",
    label: "Confirmed"
  },
  completed: {
    bg: "rgba(22,163,74,0.15)",
    color: "#16A34A",
    label: "Completed"
  },
  canceled: {
    bg: "rgba(239,68,68,0.15)",
    color: "#DC2626",
    label: "Canceled"
  },
  // ── Incident severity ────────────────────────────────────────────────────
  low: {
    bg: "rgba(34,197,94,0.15)",
    color: "#16A34A",
    label: "Low"
  },
  medium: {
    bg: "rgba(245,158,11,0.15)",
    color: "#B45309",
    label: "Medium"
  },
  high: {
    bg: "rgba(239,68,68,0.15)",
    color: "#DC2626",
    label: "High"
  },
  // ── Home Collection statuses ─────────────────────────────────────────────
  ASSIGNED: {
    bg: "rgba(107,114,128,0.15)",
    color: "#6B7280",
    label: "Assigned"
  },
  EN_ROUTE: {
    bg: "rgba(59,130,246,0.15)",
    color: "#3B82F6",
    label: "En Route"
  },
  SAMPLE_COLLECTED: {
    bg: "rgba(34,197,94,0.15)",
    color: "#22C55E",
    label: "Collected"
  },
  COMPLETED: {
    bg: "rgba(22,163,74,0.15)",
    color: "#16A34A",
    label: "Completed"
  },
  // ── Hospital Sample statuses ─────────────────────────────────────────────
  DISPATCHED: {
    bg: "rgba(59,130,246,0.15)",
    color: "#3B82F6",
    label: "Dispatched"
  },
  RECEIVED_AT_LAB: {
    bg: "rgba(139,92,246,0.15)",
    color: "#7C3AED",
    label: "Received at Lab"
  },
  PROCESSING: {
    bg: "rgba(245,158,11,0.15)",
    color: "#F59E0B",
    label: "Processing"
  },
  REPORT_READY: {
    bg: "rgba(139,92,246,0.15)",
    color: "#8B5CF6",
    label: "Report Ready"
  },
  REPORT_DELIVERED: {
    bg: "rgba(22,163,74,0.15)",
    color: "#16A34A",
    label: "Report Delivered"
  }
};
const StatusBadge = ({
  status,
  className = ""
}) => {
  const style = statusStyles[status];
  if (!style) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: `inline-flex items-center rounded-full font-medium transition-all duration-300 ease-in-out ${className}`,
        style: {
          padding: "4px 10px",
          borderRadius: "999px",
          fontSize: "12px",
          fontWeight: 500,
          background: "rgba(107,114,128,0.12)",
          color: "#6B7280"
        },
        children: status
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-flex items-center transition-all duration-300 ease-in-out ${className}`,
      style: {
        padding: "4px 10px",
        borderRadius: "999px",
        fontSize: "12px",
        fontWeight: 500,
        background: style.bg,
        color: style.color
      },
      children: style.label
    }
  );
};
export {
  StatusBadge as S
};
