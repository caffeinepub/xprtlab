import {
  Building2,
  ChevronLeft,
  ChevronRight,
  Eye,
  Search,
} from "lucide-react";
import React, { useState, useMemo } from "react";
import {
  type DemoHospital,
  type DemoSample,
  getDemoHospitals,
  getDemoSamples,
} from "../../utils/demoStorage";
import HospitalDetailedLedgerModal from "./HospitalDetailedLedgerModal";

interface HospitalLedgerModuleProps {
  isDemoMode?: boolean;
}

interface HospitalLedgerRow {
  hospitalId: string;
  hospitalName: string;
  totalSamples: number;
  totalRevenue: number;
  totalReceived: number;
  pendingAmount: number;
  discountGiven: number;
  lastTransactionDate: number | null;
}

const PAGE_SIZE = 10;

function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

function formatDate(ts: number | null): string {
  if (!ts) return "—";
  return new Date(ts).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function HospitalLedgerModule({
  isDemoMode = false,
}: HospitalLedgerModuleProps) {
  const [searchHospital, setSearchHospital] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [page, setPage] = useState(1);
  const [selectedHospital, setSelectedHospital] =
    useState<HospitalLedgerRow | null>(null);

  const ledgerData = useMemo<HospitalLedgerRow[]>(() => {
    if (!isDemoMode) return [];

    const samples = getDemoSamples();
    const hospitals = getDemoHospitals();

    const hospitalMap = new Map<string, DemoHospital>();
    for (const h of hospitals) hospitalMap.set(h.id, h);

    const aggregated = new Map<string, HospitalLedgerRow>();

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

      const hospital = hospitalMap.get(sample.hospitalId);
      const hospitalName = hospital?.name ?? `Hospital ${sample.hospitalId}`;

      if (!aggregated.has(sample.hospitalId)) {
        aggregated.set(sample.hospitalId, {
          hospitalId: sample.hospitalId,
          hospitalName,
          totalSamples: 0,
          totalRevenue: 0,
          totalReceived: 0,
          pendingAmount: 0,
          discountGiven: 0,
          lastTransactionDate: null,
        });
      }

      const row = aggregated.get(sample.hospitalId)!;
      row.totalSamples += 1;
      row.totalRevenue += sample.finalAmount;
      row.totalReceived += sample.amountReceived;
      row.pendingAmount += sample.pendingAmount;
      row.discountGiven += sample.discountAmount;
      if (
        !row.lastTransactionDate ||
        sample.createdAt > row.lastTransactionDate
      ) {
        row.lastTransactionDate = sample.createdAt;
      }
    }

    return Array.from(aggregated.values());
  }, [isDemoMode, dateFrom, dateTo]);

  const filteredData = useMemo(() => {
    if (!searchHospital.trim()) return ledgerData;
    const q = searchHospital.toLowerCase();
    return ledgerData.filter((row) =>
      row.hospitalName.toLowerCase().includes(q),
    );
  }, [ledgerData, searchHospital]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / PAGE_SIZE));
  const paginatedData = filteredData.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <Building2 className="w-5 h-5 text-brand-start" />
        <h2 className="text-lg font-bold text-gray-900">Hospital Ledger</h2>
      </div>

      {/* Filters */}
      <div className="premium-card p-4 mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search hospital..."
              value={searchHospital}
              onChange={(e) => {
                setSearchHospital(e.target.value);
                setPage(1);
              }}
              className="w-full pl-9 pr-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-start transition-colors"
            />
          </div>
          <div>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => {
                setDateFrom(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-start transition-colors"
              placeholder="From date"
            />
          </div>
          <div>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => {
                setDateTo(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-start transition-colors"
              placeholder="To date"
            />
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
                  Hospital
                </th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600">
                  Samples
                </th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600">
                  Revenue
                </th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600">
                  Received
                </th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600">
                  Pending
                </th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600">
                  Discount
                </th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600">
                  Last Txn
                </th>
                <th className="text-center px-4 py-3 font-semibold text-gray-600">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-gray-400">
                    {isDemoMode
                      ? "No data found for the selected filters."
                      : "Connect to live backend to view hospital ledger."}
                  </td>
                </tr>
              ) : (
                paginatedData.map((row) => (
                  <tr
                    key={row.hospitalId}
                    className="border-b border-gray-50 hover:bg-blue-50/40 transition-colors cursor-pointer"
                    onClick={() => setSelectedHospital(row)}
                    onKeyDown={(e) =>
                      (e.key === "Enter" || e.key === " ") &&
                      setSelectedHospital(row)
                    }
                    tabIndex={0}
                  >
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">
                        {row.hospitalName}
                      </div>
                      <div className="text-xs text-gray-400">
                        {row.hospitalId}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-gray-700">
                      {row.totalSamples}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-gray-900">
                      {formatCurrency(row.totalRevenue)}
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-emerald-600">
                      {formatCurrency(row.totalReceived)}
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-amber-600">
                      {formatCurrency(row.pendingAmount)}
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-rose-500">
                      {formatCurrency(row.discountGiven)}
                    </td>
                    <td className="px-4 py-3 text-right text-gray-500 text-xs">
                      {formatDate(row.lastTransactionDate)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedHospital(row);
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors text-xs font-medium"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredData.length > PAGE_SIZE && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-gray-50">
            <span className="text-sm text-gray-500">
              Showing {(page - 1) * PAGE_SIZE + 1}–
              {Math.min(page * PAGE_SIZE, filteredData.length)} of{" "}
              {filteredData.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="p-1.5 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-sm font-medium text-gray-700">
                {page} / {totalPages}
              </span>
              <button
                type="button"
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className="p-1.5 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-100 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Detailed Ledger Modal */}
      {selectedHospital && (
        <HospitalDetailedLedgerModal
          hospital={selectedHospital}
          isDemoMode={isDemoMode}
          onClose={() => setSelectedHospital(null)}
        />
      )}
    </div>
  );
}
