import { Users } from "lucide-react";
import React, { useState, useMemo } from "react";
import {
  DEMO_PHLEBO_ID,
  type DemoSample,
  getDemoHospitals,
  getDemoSamples,
} from "../../utils/demoStorage";

interface PhlebotomistCollectionsModuleProps {
  isDemoMode?: boolean;
}

interface PhlebotomistRow {
  phlebotomistId: string;
  phlebotomistName: string;
  samplesCollected: number;
  totalAmountCollected: number;
  cashCollected: number;
  upiCollected: number;
  creditGiven: number;
  pendingBalance: number;
}

function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

const DEMO_PHLEBO_NAME = "Ravi Kumar";

function getPhlebotomistName(id: string): string {
  if (id === DEMO_PHLEBO_ID) return DEMO_PHLEBO_NAME;
  return `Phlebotomist ${id.slice(-4)}`;
}

export default function PhlebotomistCollectionsModule({
  isDemoMode = false,
}: PhlebotomistCollectionsModuleProps) {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selectedHospital, setSelectedHospital] = useState("");

  const hospitals = useMemo(() => {
    if (!isDemoMode) return [];
    return getDemoHospitals();
  }, [isDemoMode]);

  const rows = useMemo<PhlebotomistRow[]>(() => {
    if (!isDemoMode) return [];

    const samples = getDemoSamples();
    const aggregated = new Map<string, PhlebotomistRow>();

    for (const sample of samples) {
      // Date filter
      if (dateFrom) {
        const fromTs = new Date(dateFrom).getTime();
        if (sample.createdAt < fromTs) continue;
      }
      if (dateTo) {
        const toTs = new Date(dateTo).getTime() + 86400000;
        if (sample.createdAt > toTs) continue;
      }
      // Hospital filter
      if (selectedHospital && sample.hospitalId !== selectedHospital) continue;

      const id = sample.phlebotomistId;
      if (!aggregated.has(id)) {
        aggregated.set(id, {
          phlebotomistId: id,
          phlebotomistName: getPhlebotomistName(id),
          samplesCollected: 0,
          totalAmountCollected: 0,
          cashCollected: 0,
          upiCollected: 0,
          creditGiven: 0,
          pendingBalance: 0,
        });
      }

      const row = aggregated.get(id)!;
      row.samplesCollected += 1;
      row.totalAmountCollected += sample.finalAmount;
      row.pendingBalance += sample.pendingAmount;

      const mode = sample.paymentMode.toUpperCase();
      if (mode === "CASH") {
        row.cashCollected += sample.amountReceived;
      } else if (mode === "UPI" || mode === "ONLINE") {
        row.upiCollected += sample.amountReceived;
      } else if (mode === "CREDIT") {
        row.creditGiven += sample.finalAmount;
      }
    }

    return Array.from(aggregated.values());
  }, [isDemoMode, dateFrom, dateTo, selectedHospital]);

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
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-400">
                    {isDemoMode
                      ? "No phlebotomist data found for the selected filters."
                      : "Connect to live backend to view phlebotomist collections."}
                  </td>
                </tr>
              ) : (
                rows.map((row) => (
                  <tr
                    key={row.phlebotomistId}
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
