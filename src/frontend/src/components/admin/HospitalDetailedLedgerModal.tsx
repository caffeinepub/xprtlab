import { Building2, ChevronLeft, ChevronRight, X } from "lucide-react";
import React, { useState, useMemo } from "react";
import { type DemoSample, getDemoSamples } from "../../utils/demoStorage";

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

interface HospitalDetailedLedgerModalProps {
  hospital: HospitalLedgerRow;
  isDemoMode?: boolean;
  onClose: () => void;
}

const PAGE_SIZE = 10;

function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getStatusColor(status: string): string {
  switch (status) {
    case "SAMPLE_COLLECTED":
      return "bg-gray-100 text-gray-600";
    case "DISPATCHED":
      return "bg-blue-100 text-blue-600";
    case "RECEIVED_AT_LAB":
      return "bg-indigo-100 text-indigo-600";
    case "PROCESSING":
      return "bg-orange-100 text-orange-600";
    case "REPORT_READY":
      return "bg-green-100 text-green-600";
    case "REPORT_DELIVERED":
      return "bg-emerald-100 text-emerald-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
}

function getStatusLabel(status: string): string {
  switch (status) {
    case "SAMPLE_COLLECTED":
      return "Collected";
    case "DISPATCHED":
      return "Dispatched";
    case "RECEIVED_AT_LAB":
      return "At Lab";
    case "PROCESSING":
      return "Processing";
    case "REPORT_READY":
      return "Ready";
    case "REPORT_DELIVERED":
      return "Delivered";
    default:
      return status;
  }
}

function getPaymentModeLabel(mode: string): string {
  switch (mode) {
    case "CASH":
      return "Cash";
    case "UPI":
      return "UPI";
    case "CREDIT":
      return "Credit";
    case "ONLINE":
      return "Online";
    default:
      return mode;
  }
}

export default function HospitalDetailedLedgerModal({
  hospital,
  isDemoMode = false,
  onClose,
}: HospitalDetailedLedgerModalProps) {
  const [page, setPage] = useState(1);

  const samples = useMemo<DemoSample[]>(() => {
    if (!isDemoMode) return [];
    return getDemoSamples().filter((s) => s.hospitalId === hospital.hospitalId);
  }, [isDemoMode, hospital.hospitalId]);

  const totalPages = Math.max(1, Math.ceil(samples.length / PAGE_SIZE));
  const paginatedSamples = samples.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-brand-start/5 to-brand-end/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-start to-brand-end flex items-center justify-center">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">
                {hospital.hospitalName}
              </h2>
              <p className="text-xs text-gray-500">
                Detailed Ledger — {samples.length} records
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Summary Strip */}
        <div className="grid grid-cols-4 gap-0 border-b border-gray-100">
          {[
            {
              label: "Total Revenue",
              value: `₹${hospital.totalRevenue.toLocaleString("en-IN")}`,
              color: "text-gray-900",
            },
            {
              label: "Received",
              value: `₹${hospital.totalReceived.toLocaleString("en-IN")}`,
              color: "text-emerald-600",
            },
            {
              label: "Pending",
              value: `₹${hospital.pendingAmount.toLocaleString("en-IN")}`,
              color: "text-amber-600",
            },
            {
              label: "Discount",
              value: `₹${hospital.discountGiven.toLocaleString("en-IN")}`,
              color: "text-rose-500",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="px-4 py-3 text-center border-r border-gray-100 last:border-r-0"
            >
              <div className={`text-base font-bold ${item.color}`}>
                {item.value}
              </div>
              <div className="text-xs text-gray-400">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-gray-50 z-10">
              <tr className="border-b border-gray-100">
                <th className="text-left px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                  Patient
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                  Test(s)
                </th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                  MRP
                </th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                  Discount
                </th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                  Final Amt
                </th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                  Received
                </th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                  Pending
                </th>
                <th className="text-center px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                  Mode
                </th>
                <th className="text-center px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                  Date
                </th>
                <th className="text-center px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedSamples.length === 0 ? (
                <tr>
                  <td colSpan={10} className="text-center py-12 text-gray-400">
                    No records found for this hospital.
                  </td>
                </tr>
              ) : (
                paginatedSamples.map((sample) => (
                  <tr
                    key={sample.id}
                    className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">
                        {sample.patientName}
                      </div>
                      <div className="text-xs text-gray-400">
                        {sample.phone}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-gray-700 text-xs">
                        {sample.tests.map((t) => t.testCode).join(", ")}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right text-gray-700">
                      {formatCurrency(sample.totalMrp)}
                    </td>
                    <td className="px-4 py-3 text-right text-rose-500">
                      {formatCurrency(sample.discountAmount)}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-gray-900">
                      {formatCurrency(sample.finalAmount)}
                    </td>
                    <td className="px-4 py-3 text-right text-emerald-600">
                      {formatCurrency(sample.amountReceived)}
                    </td>
                    <td className="px-4 py-3 text-right text-amber-600">
                      {formatCurrency(sample.pendingAmount)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                        {getPaymentModeLabel(sample.paymentMode)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-xs text-gray-500 whitespace-nowrap">
                      {formatDate(sample.createdAt)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(sample.status)}`}
                      >
                        {getStatusLabel(sample.status)}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {samples.length > PAGE_SIZE && (
          <div className="flex items-center justify-between px-6 py-3 border-t border-gray-100 bg-gray-50">
            <span className="text-sm text-gray-500">
              Showing {(page - 1) * PAGE_SIZE + 1}–
              {Math.min(page * PAGE_SIZE, samples.length)} of {samples.length}
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
    </div>
  );
}
