import {
  Building2,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  IndianRupee,
  Loader2,
  Phone,
  RefreshCw,
  Send,
  TestTube,
  Truck,
} from "lucide-react";
import React, { useState, useEffect, useCallback } from "react";
import DeliveryMethodSelectionDialog from "../../components/shared/DeliveryMethodSelectionDialog";
import WhatsAppShareConfirmDialog from "../../components/shared/WhatsAppShareConfirmDialog";
import type { DeliveryMethod } from "../../types/models";
import {
  DEMO_PHLEBO_ID,
  type DemoSample,
  type DemoStatusHistoryEntry,
  addDemoDeliveryTracking,
  getDemoHospitals,
  getDemoSamples,
  getDemoStatusHistory,
  updateDemoSampleDelivery,
  updateDemoSampleStatus,
} from "../../utils/demoStorage";

interface MyHospitalSamplesPageProps {
  isDemoMode?: boolean;
  role?: string;
  onNavigate?: (path: string) => void;
}

const STATUS_LABELS: Record<DemoSample["status"], string> = {
  SAMPLE_COLLECTED: "Collected",
  DISPATCHED: "Dispatched",
  PROCESSING: "Processing",
  REPORT_READY: "Report Ready",
  REPORT_DELIVERED: "Delivered",
};

const STATUS_COLORS: Record<DemoSample["status"], string> = {
  SAMPLE_COLLECTED: "bg-gray-100 text-gray-700",
  DISPATCHED: "bg-blue-100 text-blue-700",
  PROCESSING: "bg-orange-100 text-orange-700",
  REPORT_READY: "bg-green-100 text-green-700",
  REPORT_DELIVERED: "bg-emerald-100 text-emerald-700",
};

const WORKFLOW_STAGES: DemoSample["status"][] = [
  "SAMPLE_COLLECTED",
  "DISPATCHED",
  "PROCESSING",
  "REPORT_READY",
  "REPORT_DELIVERED",
];

// Build a minimal HospitalSample-like object for WhatsAppShareConfirmDialog
function buildSampleForDialog(sample: DemoSample) {
  return {
    patientName: sample.patientName,
    phone: sample.phone,
    hospitalId: sample.hospitalId,
    phlebotomistId: sample.phlebotomistId,
    tests: sample.tests.map((t) => ({
      testId: t.testId,
      testName: t.testName,
      testCode: t.testCode,
      price: BigInt(t.price),
    })),
    totalMrp: BigInt(sample.totalMrp),
    discountAmount: BigInt(sample.discountAmount),
    maxAllowedDiscount: BigInt(sample.maxAllowedDiscount),
    finalAmount: BigInt(sample.finalAmount),
    amountReceived: BigInt(sample.amountReceived),
    pendingAmount: BigInt(sample.pendingAmount),
    paymentMode: sample.paymentMode,
    billingLocked: sample.billingLocked,
    createdByRole: sample.createdByRole,
    updatedByAdmin: sample.updatedByAdmin,
    createdAt: BigInt(sample.createdAt),
    status: sample.status as any,
    statusHistory: [] as any[],
  };
}

export default function MyHospitalSamplesPage({
  isDemoMode = false,
  onNavigate: _onNavigate,
}: MyHospitalSamplesPageProps) {
  const [samples, setSamples] = useState<DemoSample[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [deliveryDialogSampleId, setDeliveryDialogSampleId] = useState<
    string | null
  >(null);
  const [whatsappDialogSampleId, setWhatsappDialogSampleId] = useState<
    string | null
  >(null);

  const hospitals = getDemoHospitals();

  const getHospitalName = (hospitalId: string): string => {
    const h = hospitals.find((h) => h.id === hospitalId);
    return h?.name ?? hospitalId;
  };

  const loadSamples = useCallback(() => {
    if (isDemoMode) {
      const data = getDemoSamples(DEMO_PHLEBO_ID);
      setSamples(data);
    }
  }, [isDemoMode]);

  useEffect(() => {
    loadSamples();
  }, [loadSamples]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    loadSamples();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const handleMarkDispatched = async (sampleId: string) => {
    if (!isDemoMode) return;
    setUpdatingId(sampleId);
    await new Promise((r) => setTimeout(r, 400));
    updateDemoSampleStatus(
      sampleId,
      "DISPATCHED",
      DEMO_PHLEBO_ID,
      "Sample dispatched to lab",
    );
    loadSamples();
    setUpdatingId(null);
  };

  const handleDeliveryMethodConfirm = async (method: DeliveryMethod) => {
    const sampleId = deliveryDialogSampleId;
    if (!sampleId || !isDemoMode) {
      setDeliveryDialogSampleId(null);
      return;
    }
    setDeliveryDialogSampleId(null);

    if (method === "WHATSAPP") {
      setWhatsappDialogSampleId(sampleId);
      return;
    }

    setUpdatingId(sampleId);
    await new Promise((r) => setTimeout(r, 400));

    // Use updateDemoSampleDelivery for delivery status updates
    updateDemoSampleDelivery(sampleId, method, "phlebotomist", DEMO_PHLEBO_ID);

    addDemoDeliveryTracking({
      id: `dt-${sampleId}-${Date.now()}`,
      sampleId,
      deliveryMethod: method,
      deliveredAt: Date.now(),
      deliveredBy: DEMO_PHLEBO_ID,
    });
    loadSamples();
    setUpdatingId(null);
  };

  const handleWhatsAppConfirm = async () => {
    const sampleId = whatsappDialogSampleId;
    if (!sampleId || !isDemoMode) {
      setWhatsappDialogSampleId(null);
      return;
    }
    setWhatsappDialogSampleId(null);
    setUpdatingId(sampleId);
    await new Promise((r) => setTimeout(r, 400));

    // Use updateDemoSampleDelivery for delivery status updates
    updateDemoSampleDelivery(
      sampleId,
      "WHATSAPP",
      "phlebotomist",
      DEMO_PHLEBO_ID,
    );

    addDemoDeliveryTracking({
      id: `dt-${sampleId}-${Date.now()}`,
      sampleId,
      deliveryMethod: "WHATSAPP",
      deliveredAt: Date.now(),
      deliveredBy: DEMO_PHLEBO_ID,
    });
    loadSamples();
    setUpdatingId(null);
  };

  if (!isDemoMode) {
    return (
      <div className="p-4">
        <p className="text-muted-foreground text-sm">
          Live hospital samples — connect to backend.
        </p>
      </div>
    );
  }

  // Find the sample for the whatsapp dialog
  const whatsappSample = whatsappDialogSampleId
    ? samples.find((s) => s.id === whatsappDialogSampleId)
    : null;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 pt-4 pb-3">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-xl font-bold text-gray-900">My Samples</h1>
          <button
            type="button"
            onClick={handleRefresh}
            className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
        </div>
        <p className="text-xs text-gray-400">
          {samples.length} sample{samples.length !== 1 ? "s" : ""} total
        </p>
      </div>

      {/* Status summary */}
      <div className="px-4 pt-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Status Overview
          </p>
          <div className="grid grid-cols-5 gap-1">
            {WORKFLOW_STAGES.map((stage) => {
              const count = samples.filter((s) => s.status === stage).length;
              return (
                <div key={stage} className="text-center">
                  <p className="text-xl font-bold text-gray-800">{count}</p>
                  <p className="text-xs text-gray-400 mt-0.5 leading-tight">
                    {STATUS_LABELS[stage].split(" ")[0]}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sample cards */}
      <div className="px-4 space-y-3">
        {samples.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
            <TestTube className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No samples yet</p>
            <p className="text-gray-400 text-sm mt-1">
              Samples you collect will appear here.
            </p>
          </div>
        ) : (
          samples.map((sample) => {
            const isExpanded = expandedId === sample.id;
            const isUpdating = updatingId === sample.id;
            const history: DemoStatusHistoryEntry[] = getDemoStatusHistory(
              sample.id,
            );
            const currentStageIdx = WORKFLOW_STAGES.indexOf(sample.status);

            return (
              <div
                key={sample.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              >
                {/* Card header */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {sample.patientName}
                      </p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Phone className="w-3 h-3 text-gray-400" />
                        <p className="text-xs text-gray-500">{sample.phone}</p>
                      </div>
                    </div>
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLORS[sample.status]}`}
                    >
                      {STATUS_LABELS[sample.status]}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 mb-2">
                    <Building2 className="w-3.5 h-3.5 text-gray-400" />
                    <p className="text-xs text-gray-600">
                      {getHospitalName(sample.hospitalId)}
                    </p>
                  </div>

                  {/* Tests */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {sample.tests.map((t) => (
                      <span
                        key={t.testId}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                      >
                        {t.testCode}
                      </span>
                    ))}
                  </div>

                  {/* Billing summary */}
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <IndianRupee className="w-3 h-3" />
                      <span>₹{sample.finalAmount}</span>
                    </div>
                    <span>·</span>
                    <span>{sample.paymentMode}</span>
                    {sample.pendingAmount > 0 && (
                      <>
                        <span>·</span>
                        <span className="text-red-500">
                          ₹{sample.pendingAmount} pending
                        </span>
                      </>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-2">
                    {sample.status === "SAMPLE_COLLECTED" && (
                      <button
                        type="button"
                        onClick={() => handleMarkDispatched(sample.id)}
                        disabled={isUpdating}
                        className="flex-1 flex items-center justify-center gap-1.5 text-xs bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-3 py-2 rounded-xl font-medium disabled:opacity-60"
                      >
                        {isUpdating ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Truck className="w-3.5 h-3.5" />
                        )}
                        {isUpdating ? "Updating..." : "Mark Dispatched"}
                      </button>
                    )}

                    {sample.status === "REPORT_READY" && (
                      <button
                        type="button"
                        onClick={() => setDeliveryDialogSampleId(sample.id)}
                        disabled={isUpdating}
                        className="flex-1 flex items-center justify-center gap-1.5 text-xs bg-gradient-to-r from-green-600 to-emerald-500 text-white px-3 py-2 rounded-xl font-medium disabled:opacity-60"
                      >
                        {isUpdating ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Send className="w-3.5 h-3.5" />
                        )}
                        {isUpdating ? "Updating..." : "Deliver Report"}
                      </button>
                    )}

                    {sample.status === "REPORT_DELIVERED" && (
                      <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Delivered
                        {sample.deliveryMethod && (
                          <span className="text-gray-400 ml-1">
                            via {sample.deliveryMethod}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Expand/collapse timeline */}
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedId(isExpanded ? null : sample.id)
                      }
                      className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-3 py-2 rounded-xl ml-auto"
                    >
                      Timeline
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Expandable timeline */}
                {isExpanded && (
                  <div className="border-t border-gray-100 bg-gray-50 p-4">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                      Workflow Timeline
                    </p>
                    <div className="space-y-0">
                      {WORKFLOW_STAGES.map((stage, idx) => {
                        const isCompleted = idx <= currentStageIdx;
                        const isCurrent = idx === currentStageIdx;
                        const historyEntry = history.find(
                          (h) => h.status === stage,
                        );

                        return (
                          <div key={stage} className="flex gap-3">
                            {/* Connector line */}
                            <div className="flex flex-col items-center">
                              <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                                  isCompleted
                                    ? isCurrent
                                      ? "bg-blue-600 ring-2 ring-blue-200"
                                      : "bg-emerald-500"
                                    : "bg-gray-200"
                                }`}
                              >
                                {isCompleted ? (
                                  <CheckCircle className="w-3.5 h-3.5 text-white" />
                                ) : (
                                  <div className="w-2 h-2 rounded-full bg-gray-400" />
                                )}
                              </div>
                              {idx < WORKFLOW_STAGES.length - 1 && (
                                <div
                                  className={`w-0.5 h-8 ${
                                    idx < currentStageIdx
                                      ? "bg-emerald-400"
                                      : "bg-gray-200"
                                  }`}
                                />
                              )}
                            </div>

                            {/* Stage info */}
                            <div className="pb-4 flex-1">
                              <p
                                className={`text-xs font-semibold ${
                                  isCurrent
                                    ? "text-blue-700"
                                    : isCompleted
                                      ? "text-emerald-700"
                                      : "text-gray-400"
                                }`}
                              >
                                {STATUS_LABELS[stage]}
                              </p>
                              {historyEntry && (
                                <p className="text-xs text-gray-400 mt-0.5">
                                  {new Date(
                                    historyEntry.timestamp,
                                  ).toLocaleString()}
                                </p>
                              )}
                              {historyEntry?.note && (
                                <p className="text-xs text-gray-500 mt-0.5 italic">
                                  {historyEntry.note}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Delivery method dialog */}
      <DeliveryMethodSelectionDialog
        open={!!deliveryDialogSampleId}
        onOpenChange={(open) => {
          if (!open) setDeliveryDialogSampleId(null);
        }}
        onConfirm={handleDeliveryMethodConfirm}
        isDemoMode={isDemoMode}
      />

      {/* WhatsApp confirm dialog */}
      {whatsappSample && (
        <WhatsAppShareConfirmDialog
          open={!!whatsappDialogSampleId}
          onOpenChange={(open) => {
            if (!open) setWhatsappDialogSampleId(null);
          }}
          sample={buildSampleForDialog(whatsappSample)}
          onConfirm={handleWhatsAppConfirm}
          isDemoMode={isDemoMode}
        />
      )}
    </div>
  );
}
