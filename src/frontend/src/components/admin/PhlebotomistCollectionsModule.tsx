import { Users } from "lucide-react";
import React, { useState, useMemo, useCallback } from "react";

interface PhlebotomistCollectionsModuleProps {
  isDemoMode?: boolean;
}

type DepositStatus = "not_submitted" | "partially_submitted" | "submitted";

interface PhlebotomistRow {
  phlebotomistId: string;
  phlebotomistName: string;
  samplesCollected: number;
  totalAmountCollected: number;
  cashCollected: number;
  upiCollected: number;
  creditGiven: number;
  pendingBalance: number;
  depositStatus: DepositStatus;
  updatedBy?: string;
  updatedAt?: number;
}

const DEPOSIT_STATUS_KEY = "xpertlab_phlebo_deposit_status";

type DepositStatusMap = Record<
  string,
  { depositStatus: DepositStatus; updatedBy: string; updatedAt: number }
>;

function loadDepositStatuses(): DepositStatusMap {
  try {
    const raw = localStorage.getItem(DEPOSIT_STATUS_KEY);
    return raw ? (JSON.parse(raw) as DepositStatusMap) : {};
  } catch {
    return {};
  }
}

function saveDepositStatus(
  phlebotomistId: string,
  depositStatus: DepositStatus,
) {
  const map = loadDepositStatuses();
  map[phlebotomistId] = {
    depositStatus,
    updatedBy: "Super Admin",
    updatedAt: Date.now(),
  };
  localStorage.setItem(DEPOSIT_STATUS_KEY, JSON.stringify(map));
}

function formatCurrency(amount: number): string {
  return `\u20b9${amount.toLocaleString("en-IN")}`;
}

const DEPOSIT_STATUS_LABELS: Record<DepositStatus, string> = {
  not_submitted: "Not Submitted",
  partially_submitted: "Partially Submitted",
  submitted: "Submitted",
};

const DEPOSIT_STATUS_STYLES: Record<DepositStatus, string> = {
  not_submitted: "bg-red-100 text-red-700 border border-red-200",
  partially_submitted: "bg-amber-100 text-amber-700 border border-amber-200",
  submitted: "bg-green-100 text-green-700 border border-green-200",
};

export default function PhlebotomistCollectionsModule({
  isDemoMode = false,
}: PhlebotomistCollectionsModuleProps) {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selectedHospital, setSelectedHospital] = useState("");
  const [_depositStatuses, setDepositStatuses] =
    useState<DepositStatusMap>(loadDepositStatuses);

  const hospitals = useMemo<{ id: string; name: string }[]>(() => {
    return [];
  }, []);

  const rows = useMemo<PhlebotomistRow[]>(() => {
    return [];
  }, []);

  const handleDepositStatusChange = useCallback(
    (phlebotomistId: string, status: DepositStatus) => {
      saveDepositStatus(phlebotomistId, status);
      setDepositStatuses(loadDepositStatuses());
    },
    [],
  );

  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <Users className="w-5 h-5 text-brand-start" />
        <h2 className="text-lg font-bold text-gray-900">
          Phlebotomist Collections
        </h2>
      </div>

      {/* Filters */}
      <div className="premium-card p-4 mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label
              htmlFor="phlebo-date-from"
              className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1"
            >
              From Date
            </label>
            <input
              id="phlebo-date-from"
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-start transition-colors"
            />
          </div>
          <div>
            <label
              htmlFor="phlebo-date-to"
              className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1"
            >
              To Date
            </label>
            <input
              id="phlebo-date-to"
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-start transition-colors"
            />
          </div>
          <div>
            <label
              htmlFor="phlebo-hospital-filter"
              className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1"
            >
              Hospital
            </label>
            <select
              id="phlebo-hospital-filter"
              value={selectedHospital}
              onChange={(e) => setSelectedHospital(e.target.value)}
              className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-start transition-colors bg-white"
              data-ocid="collections.hospital.select"
            >
              <option value="">All Hospitals</option>
              {hospitals.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="premium-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-4 py-3 font-semibold text-gray-600">
                  Phlebotomist
                </th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600">
                  Samples
                </th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600">
                  Total Collected
                </th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600">
                  Cash
                </th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600">
                  UPI
                </th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600">
                  Credit
                </th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600">
                  Pending
                </th>
                <th className="text-center px-4 py-3 font-semibold text-gray-600">
                  Deposit Status
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="text-center py-12 text-gray-400"
                    data-ocid="collections.empty_state"
                  >
                    {isDemoMode
                      ? "No phlebotomist data found for the selected filters."
                      : "Connect to live backend to view phlebotomist collections."}
                  </td>
                </tr>
              ) : (
                rows.map((row, idx) => (
                  <tr
                    key={row.phlebotomistId}
                    data-ocid={`collections.row.item.${idx + 1}`}
                    className="border-b border-gray-50 hover:bg-blue-50/40 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">
                        {row.phlebotomistName}
                      </div>
                      <div className="text-xs text-gray-400 font-mono">
                        {row.phlebotomistId.slice(0, 16)}...
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-gray-700">
                      {row.samplesCollected}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-gray-900">
                      {formatCurrency(row.totalAmountCollected)}
                    </td>
                    <td className="px-4 py-3 text-right text-emerald-600">
                      {formatCurrency(row.cashCollected)}
                    </td>
                    <td className="px-4 py-3 text-right text-blue-600">
                      {formatCurrency(row.upiCollected)}
                    </td>
                    <td className="px-4 py-3 text-right text-orange-500">
                      {formatCurrency(row.creditGiven)}
                    </td>
                    <td className="px-4 py-3 text-right text-amber-600 font-medium">
                      {formatCurrency(row.pendingBalance)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col items-center gap-1.5 min-w-[160px]">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${DEPOSIT_STATUS_STYLES[row.depositStatus]}`}
                        >
                          {DEPOSIT_STATUS_LABELS[row.depositStatus]}
                        </span>
                        <select
                          value={row.depositStatus}
                          onChange={(e) =>
                            handleDepositStatusChange(
                              row.phlebotomistId,
                              e.target.value as DepositStatus,
                            )
                          }
                          className="text-xs px-2 py-1 border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-blue-400 w-full"
                          data-ocid={`collections.deposit_status.select.${idx + 1}`}
                        >
                          <option value="not_submitted">Not Submitted</option>
                          <option value="partially_submitted">
                            Partially Submitted
                          </option>
                          <option value="submitted">Submitted</option>
                        </select>
                        {row.updatedAt && (
                          <p className="text-[10px] text-gray-400 text-center">
                            Updated by {row.updatedBy} at{" "}
                            {new Date(row.updatedAt).toLocaleTimeString(
                              "en-IN",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )}
                          </p>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
