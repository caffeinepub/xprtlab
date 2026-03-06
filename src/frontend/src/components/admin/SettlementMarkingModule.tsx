import { Building2, CheckCircle, Loader2, Plus } from "lucide-react";
import React, { useState, useMemo } from "react";
import { Variant_Partial_Settled } from "../../backend";
import { useMarkSettlement } from "../../hooks/useQueries";
import {
  type DemoHospital,
  type DemoSettlement,
  getDemoHospitals,
  getDemoSamples,
  getDemoSettlements,
  saveDemoSettlement,
} from "../../utils/demoStorage";
import SettlementHistoryPanel from "./SettlementHistoryPanel";

interface SettlementMarkingModuleProps {
  isDemoMode?: boolean;
}

interface HospitalBalance {
  hospitalId: string;
  hospitalName: string;
  totalRevenue: number;
  totalReceived: number;
  pendingAmount: number;
}

function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export default function SettlementMarkingModule({
  isDemoMode = false,
}: SettlementMarkingModuleProps) {
  const [selectedHospitalId, setSelectedHospitalId] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [settlementType, setSettlementType] = useState<"Settled" | "Partial">(
    "Settled",
  );
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const markSettlementMutation = useMarkSettlement();

  // biome-ignore lint/correctness/useExhaustiveDependencies: refreshKey forces re-computation intentionally
  const hospitalBalances = useMemo<HospitalBalance[]>(() => {
    if (!isDemoMode) return [];
    const hospitals = getDemoHospitals();
    const samples = getDemoSamples();

    return hospitals.map((h) => {
      const hospitalSamples = samples.filter((s) => s.hospitalId === h.id);
      const totalRevenue = hospitalSamples.reduce(
        (sum, s) => sum + s.finalAmount,
        0,
      );
      const totalReceived = hospitalSamples.reduce(
        (sum, s) => sum + s.amountReceived,
        0,
      );
      const pendingAmount = hospitalSamples.reduce(
        (sum, s) => sum + s.pendingAmount,
        0,
      );
      return {
        hospitalId: h.id,
        hospitalName: h.name,
        totalRevenue,
        totalReceived,
        pendingAmount,
      };
    });
  }, [isDemoMode, refreshKey]);

  const selectedBalance = hospitalBalances.find(
    (h) => h.hospitalId === selectedHospitalId,
  );

  const handleOpenModal = (hospitalId: string) => {
    setSelectedHospitalId(hospitalId);
    setAmount("");
    setNotes("");
    setSettlementType("Settled");
    setErrorMsg("");
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (!selectedHospitalId) return;
    const amountNum = Number.parseFloat(amount);
    if (Number.isNaN(amountNum) || amountNum <= 0) {
      setErrorMsg("Please enter a valid amount.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      if (isDemoMode) {
        const settlement: DemoSettlement = {
          id: `settlement-${Date.now()}`,
          hospitalId: selectedHospitalId,
          amount: amountNum,
          settlementType,
          timestamp: Date.now(),
          notes: notes.trim() || undefined,
        };
        saveDemoSettlement(settlement);
        setRefreshKey((k) => k + 1);
        setSuccessMsg(
          `Settlement of ${formatCurrency(amountNum)} marked as ${settlementType}.`,
        );
        setShowModal(false);
        setTimeout(() => setSuccessMsg(""), 4000);
      } else {
        await markSettlementMutation.mutateAsync({
          hospitalId: selectedHospitalId,
          amount: BigInt(Math.round(amountNum)),
          settlementType:
            settlementType === "Settled"
              ? Variant_Partial_Settled.Settled
              : Variant_Partial_Settled.Partial_,
          notes: notes.trim() || null,
        });
        setSuccessMsg("Settlement marked successfully.");
        setShowModal(false);
        setTimeout(() => setSuccessMsg(""), 4000);
      }
    } catch (_e) {
      setErrorMsg("Failed to mark settlement. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <CheckCircle className="w-5 h-5 text-brand-start" />
        <h2 className="text-lg font-bold text-gray-900">
          Settlement Marking System
        </h2>
      </div>

      {successMsg && (
        <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-700 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          {successMsg}
        </div>
      )}

      {/* Hospital Balances Table */}
      <div className="premium-card overflow-hidden mb-6">
        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
          <h3 className="text-sm font-semibold text-gray-700">
            Hospital Outstanding Balances
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-4 py-3 font-semibold text-gray-600">
                  Hospital
                </th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600">
                  Total Revenue
                </th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600">
                  Received
                </th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600">
                  Pending
                </th>
                <th className="text-center px-4 py-3 font-semibold text-gray-600">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {hospitalBalances.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-gray-400">
                    {isDemoMode
                      ? "No hospital data available."
                      : "Connect to live backend to view balances."}
                  </td>
                </tr>
              ) : (
                hospitalBalances.map((h) => (
                  <tr
                    key={h.hospitalId}
                    className={`border-b border-gray-50 hover:bg-blue-50/40 transition-colors cursor-pointer ${selectedHospitalId === h.hospitalId ? "bg-blue-50" : ""}`}
                    onClick={() => setSelectedHospitalId(h.hospitalId)}
                    onKeyDown={(e) =>
                      (e.key === "Enter" || e.key === " ") &&
                      setSelectedHospitalId(h.hospitalId)
                    }
                    tabIndex={0}
                  >
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">
                        {h.hospitalName}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-gray-900">
                      {formatCurrency(h.totalRevenue)}
                    </td>
                    <td className="px-4 py-3 text-right text-emerald-600">
                      {formatCurrency(h.totalReceived)}
                    </td>
                    <td className="px-4 py-3 text-right text-amber-600 font-medium">
                      {formatCurrency(h.pendingAmount)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenModal(h.hospitalId);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-brand-start to-brand-end hover:opacity-90 transition-opacity shadow-sm"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Mark Settlement
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Settlement History */}
      {selectedHospitalId && (
        <SettlementHistoryPanel
          hospitalId={selectedHospitalId}
          hospitalName={
            hospitalBalances.find((h) => h.hospitalId === selectedHospitalId)
              ?.hospitalName ?? ""
          }
          isDemoMode={isDemoMode}
          refreshKey={refreshKey}
        />
      )}

      {/* Settlement Modal */}
      {showModal && selectedBalance && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
            onKeyDown={(e) => e.key === "Escape" && setShowModal(false)}
            aria-hidden="true"
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-start to-brand-end flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">
                  Mark Settlement
                </h3>
                <p className="text-xs text-gray-500">
                  {selectedBalance.hospitalName}
                </p>
              </div>
            </div>

            {/* Pending info */}
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 mb-4 text-sm">
              <span className="text-amber-700 font-medium">
                Pending Balance:{" "}
              </span>
              <span className="text-amber-800 font-bold">
                {formatCurrency(selectedBalance.pendingAmount)}
              </span>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                {errorMsg}
              </div>
            )}

            {/* Settlement Type */}
            <div className="mb-4">
              <label
                htmlFor="settlement-type"
                className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2"
              >
                Settlement Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(["Settled", "Partial"] as const).map((type) => (
                  <button
                    type="button"
                    key={type}
                    onClick={() => setSettlementType(type)}
                    className={`py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${
                      settlementType === type
                        ? type === "Settled"
                          ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                          : "border-amber-500 bg-amber-50 text-amber-700"
                        : "border-gray-200 text-gray-500 hover:border-gray-300"
                    }`}
                  >
                    {type === "Settled"
                      ? "✓ Fully Settled"
                      : "◑ Partially Settled"}
                  </button>
                ))}
              </div>
            </div>

            {/* Amount */}
            <div className="mb-4">
              <label
                htmlFor="settlement-amount"
                className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1"
              >
                Amount (₹)
              </label>
              <input
                id="settlement-amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-start transition-colors"
              />
            </div>

            {/* Notes */}
            <div className="mb-5">
              <label
                htmlFor="settlement-notes"
                className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1"
              >
                Notes (optional)
              </label>
              <textarea
                id="settlement-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes about this settlement..."
                rows={2}
                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-start transition-colors resize-none"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                disabled={isSubmitting}
                className="px-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-start to-brand-end hover:opacity-90 transition-opacity shadow-sm disabled:opacity-50 flex items-center gap-2"
              >
                {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                Confirm Settlement
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
