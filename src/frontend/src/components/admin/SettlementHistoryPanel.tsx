import { CheckCircle, Clock, History } from "lucide-react";
import React, { useMemo } from "react";
import { useGetSettlementHistory } from "../../hooks/useQueries";
import {
  type DemoSettlement,
  getDemoSettlements,
} from "../../utils/demoStorage";

interface SettlementHistoryPanelProps {
  hospitalId: string;
  hospitalName: string;
  isDemoMode?: boolean;
  refreshKey?: number;
}

function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function SettlementHistoryPanel({
  hospitalId,
  hospitalName,
  isDemoMode = false,
  refreshKey: _refreshKey = 0,
}: SettlementHistoryPanelProps) {
  const liveHistory = useGetSettlementHistory(isDemoMode ? null : hospitalId);

  const settlements = useMemo(() => {
    if (isDemoMode) {
      try {
        return getDemoSettlements().filter((s) => s.hospitalId === hospitalId);
      } catch {
        return [];
      }
    }
    return (liveHistory.data ?? []).map((s) => ({
      id: s.timestamp.toString(),
      hospitalId: s.hospitalId,
      amount: Number(s.amount),
      settlementType:
        s.settlementType === "Settled"
          ? "Settled"
          : ("Partial" as "Settled" | "Partial"),
      timestamp: Number(s.timestamp) / 1_000_000, // nanoseconds to ms
      notes: s.notes,
    }));
  }, [isDemoMode, hospitalId, liveHistory.data]);

  return (
    <div className="premium-card overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
        <History className="w-4 h-4 text-gray-500" />
        <h3 className="text-sm font-semibold text-gray-700">
          Settlement History — {hospitalName}
        </h3>
        <span className="ml-auto text-xs text-gray-400">
          {settlements.length} records
        </span>
      </div>

      {settlements.length === 0 ? (
        <div className="py-10 text-center text-gray-400 text-sm">
          No settlement records found for this hospital.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-4 py-3 font-semibold text-gray-600">
                  Date
                </th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600">
                  Amount
                </th>
                <th className="text-center px-4 py-3 font-semibold text-gray-600">
                  Type
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody>
              {settlements
                .slice()
                .sort((a, b) => b.timestamp - a.timestamp)
                .map((s) => (
                  <tr
                    key={s.id}
                    className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors"
                  >
                    <td className="px-4 py-3 text-gray-600 text-xs whitespace-nowrap">
                      {formatDate(s.timestamp)}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-gray-900">
                      {formatCurrency(s.amount)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {s.settlementType === "Settled" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                          <CheckCircle className="w-3 h-3" />
                          Settled
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
                          <Clock className="w-3 h-3" />
                          Partial
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">
                      {s.notes ?? "—"}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
