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

const STATUS_STYLES: Record<
  DemoSample["status"],
  { background: string; color: string }
> = {
  SAMPLE_COLLECTED: { background: "#F3F4F6", color: "#6B7280" },
  DISPATCHED: { background: "#EFF6FF", color: "#3B82F6" },
  PROCESSING: { background: "#FFFBEB", color: "#F59E0B" },
  REPORT_READY: { background: "#F0FDF4", color: "#16A34A" },
  REPORT_DELIVERED: { background: "#F0FDF4", color: "#16A34A" },
};

const WORKFLOW_STAGES: DemoSample["status"][] = [
  "SAMPLE_COLLECTED",
  "DISPATCHED",
  "PROCESSING",
  "REPORT_READY",
  "REPORT_DELIVERED",
];

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

  const whatsappSample = whatsappDialogSampleId
    ? samples.find((s) => s.id === whatsappDialogSampleId)
    : null;

  return (
    <div className="min-h-screen pb-[90px]" style={{ background: "#F7F9FC" }}>
      {/* Gradient Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #2563EB, #06B6D4)",
          padding: "20px",
          marginBottom: "0",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "white",
                margin: 0,
              }}
            >
              My Samples
            </h1>
            <p
              style={{
                fontSize: "13px",
                color: "rgba(255,255,255,0.8)",
                margin: "4px 0 0",
              }}
            >
              {samples.length} sample{samples.length !== 1 ? "s" : ""} total
            </p>
          </div>
          <button
            type="button"
            onClick={handleRefresh}
            style={{
              background: "rgba(255,255,255,0.2)",
              border: "none",
              borderRadius: "10px",
              padding: "8px 12px",
              color: "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "13px",
              fontWeight: 600,
            }}
            data-ocid="my_samples.button"
          >
            <RefreshCw
              style={{ width: "15px", height: "15px" }}
              className={isRefreshing ? "animate-spin" : ""}
            />
            Refresh
          </button>
        </div>
      </div>

      {/* Status summary */}
      <div className="px-4 pt-4">
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "16px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            padding: "16px",
            marginBottom: "16px",
          }}
        >
          <p
            style={{
              fontSize: "11px",
              fontWeight: 600,
              color: "#9CA3AF",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: "12px",
            }}
          >
            Status Overview
          </p>
          <div className="grid grid-cols-5 gap-1">
            {WORKFLOW_STAGES.map((stage) => {
              const count = samples.filter((s) => s.status === stage).length;
              return (
                <div key={stage} className="text-center">
                  <p
                    style={{
                      fontSize: "20px",
                      fontWeight: 700,
                      color: "#1F2937",
                    }}
                  >
                    {count}
                  </p>
                  <p
                    style={{
                      fontSize: "11px",
                      color: "#9CA3AF",
                      marginTop: "2px",
                      lineHeight: 1.2,
                    }}
                  >
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
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "16px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
              padding: "32px",
              textAlign: "center",
            }}
            data-ocid="my_samples.empty_state"
          >
            <TestTube
              style={{
                width: "40px",
                height: "40px",
                color: "#D1D5DB",
                margin: "0 auto 12px",
              }}
            />
            <p style={{ color: "#6B7280", fontWeight: 500 }}>No samples yet</p>
            <p style={{ color: "#9CA3AF", fontSize: "14px", marginTop: "4px" }}>
              Samples you collect will appear here.
            </p>
          </div>
        ) : (
          samples.map((sample, idx) => {
            const isExpanded = expandedId === sample.id;
            const isUpdating = updatingId === sample.id;
            const history: DemoStatusHistoryEntry[] = getDemoStatusHistory(
              sample.id,
            );
            const currentStageIdx = WORKFLOW_STAGES.indexOf(sample.status);
            const statusStyle = STATUS_STYLES[sample.status];

            return (
              <div
                key={sample.id}
                data-ocid={`my_samples.item.${idx + 1}`}
                style={{
                  background: "#FFFFFF",
                  borderRadius: "16px",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                  overflow: "hidden",
                  transition: "all 200ms ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 12px 32px rgba(13,71,161,0.12)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 8px 24px rgba(0,0,0,0.08)";
                }}
              >
                <div style={{ padding: "16px" }}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p
                        style={{
                          fontWeight: 700,
                          fontSize: "16px",
                          color: "#111827",
                        }}
                      >
                        {sample.patientName}
                      </p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Phone
                          style={{
                            width: "12px",
                            height: "12px",
                            color: "#9CA3AF",
                          }}
                        />
                        <p style={{ fontSize: "12px", color: "#6B7280" }}>
                          {sample.phone}
                        </p>
                      </div>
                    </div>
                    <span
                      style={{
                        ...statusStyle,
                        fontSize: "11px",
                        fontWeight: 600,
                        padding: "4px 10px",
                        borderRadius: "999px",
                      }}
                    >
                      {STATUS_LABELS[sample.status]}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 mb-2">
                    <Building2
                      style={{
                        width: "13px",
                        height: "13px",
                        color: "#9CA3AF",
                      }}
                    />
                    <p style={{ fontSize: "13px", color: "#6B7280" }}>
                      {getHospitalName(sample.hospitalId)}
                    </p>
                  </div>

                  {/* Tests */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {sample.tests.map((t) => (
                      <span
                        key={t.testId}
                        style={{
                          fontSize: "11px",
                          background: "#F3F4F6",
                          color: "#4B5563",
                          padding: "2px 8px",
                          borderRadius: "999px",
                        }}
                      >
                        {t.testCode}
                      </span>
                    ))}
                  </div>

                  {/* Billing summary */}
                  <div
                    className="flex items-center gap-3 mb-3"
                    style={{ fontSize: "12px", color: "#6B7280" }}
                  >
                    <div className="flex items-center gap-1">
                      <IndianRupee style={{ width: "12px", height: "12px" }} />
                      <span style={{ fontWeight: 600, color: "#374151" }}>
                        ₹{sample.finalAmount}
                      </span>
                    </div>
                    <span>·</span>
                    <span>{sample.paymentMode}</span>
                    {sample.pendingAmount > 0 && (
                      <>
                        <span>·</span>
                        <span style={{ color: "#DC2626", fontWeight: 600 }}>
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
                        data-ocid={`my_samples.primary_button.${idx + 1}`}
                        style={{
                          flex: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "6px",
                          fontSize: "12px",
                          background:
                            "linear-gradient(135deg, #2563EB, #06B6D4)",
                          color: "white",
                          border: "none",
                          padding: "8px 12px",
                          borderRadius: "10px",
                          fontWeight: 600,
                          cursor: isUpdating ? "not-allowed" : "pointer",
                          opacity: isUpdating ? 0.6 : 1,
                        }}
                      >
                        {isUpdating ? (
                          <Loader2
                            style={{ width: "13px", height: "13px" }}
                            className="animate-spin"
                          />
                        ) : (
                          <Truck style={{ width: "13px", height: "13px" }} />
                        )}
                        {isUpdating ? "Updating..." : "Mark Dispatched"}
                      </button>
                    )}

                    {sample.status === "REPORT_READY" && (
                      <button
                        type="button"
                        onClick={() => setDeliveryDialogSampleId(sample.id)}
                        disabled={isUpdating}
                        data-ocid={`my_samples.secondary_button.${idx + 1}`}
                        style={{
                          flex: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "6px",
                          fontSize: "12px",
                          background:
                            "linear-gradient(135deg, #2563EB, #06B6D4)",
                          color: "white",
                          border: "none",
                          padding: "8px 12px",
                          borderRadius: "10px",
                          fontWeight: 600,
                          cursor: isUpdating ? "not-allowed" : "pointer",
                          opacity: isUpdating ? 0.6 : 1,
                        }}
                      >
                        {isUpdating ? (
                          <Loader2
                            style={{ width: "13px", height: "13px" }}
                            className="animate-spin"
                          />
                        ) : (
                          <Send style={{ width: "13px", height: "13px" }} />
                        )}
                        {isUpdating ? "Updating..." : "Deliver Report"}
                      </button>
                    )}

                    {sample.status === "REPORT_DELIVERED" && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          fontSize: "12px",
                          color: "#16A34A",
                          fontWeight: 500,
                        }}
                      >
                        <CheckCircle
                          style={{ width: "13px", height: "13px" }}
                        />
                        Delivered
                        {sample.deliveryMethod && (
                          <span style={{ color: "#9CA3AF", marginLeft: "4px" }}>
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
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        fontSize: "12px",
                        color: "#6B7280",
                        background: "#F3F4F6",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: "10px",
                        marginLeft: "auto",
                        cursor: "pointer",
                      }}
                    >
                      Timeline
                      {isExpanded ? (
                        <ChevronUp style={{ width: "13px", height: "13px" }} />
                      ) : (
                        <ChevronDown
                          style={{ width: "13px", height: "13px" }}
                        />
                      )}
                    </button>
                  </div>
                </div>

                {/* Expandable timeline */}
                {isExpanded && (
                  <div
                    style={{
                      borderTop: "1px solid #F3F4F6",
                      background: "#FAFAFA",
                      padding: "16px",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        color: "#9CA3AF",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        marginBottom: "12px",
                      }}
                    >
                      Workflow Timeline
                    </p>
                    {/* Delivery Method */}
                    <div
                      style={{
                        marginBottom: "16px",
                        padding: "12px",
                        background: "#F0F9FF",
                        borderRadius: "10px",
                        border: "1px solid #BAE6FD",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "11px",
                          fontWeight: 600,
                          color: "#0369A1",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          marginBottom: "8px",
                        }}
                      >
                        Delivery Method
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {(
                          [
                            { value: "WHATSAPP", label: "📱 WhatsApp" },
                            { value: "EMAIL", label: "📧 Email" },
                            { value: "APP_DOWNLOAD", label: "📲 App Download" },
                          ] as const
                        ).map(({ value, label }) => {
                          const isSelected =
                            (sample.deliveryMethod ?? "").toUpperCase() ===
                            value;
                          return (
                            <button
                              key={value}
                              type="button"
                              data-ocid={`my_samples.delivery_method.toggle.${WORKFLOW_STAGES.indexOf(sample.status) + 1}`}
                              onClick={() => {
                                if (isDemoMode) {
                                  updateDemoSampleDelivery(
                                    sample.id,
                                    value,
                                    "phlebotomist",
                                    DEMO_PHLEBO_ID,
                                  );
                                  loadSamples();
                                }
                              }}
                              style={{
                                padding: "5px 12px",
                                borderRadius: "999px",
                                fontSize: "12px",
                                fontWeight: 500,
                                border: isSelected
                                  ? "2px solid #2563EB"
                                  : "1.5px solid #D1D5DB",
                                background: isSelected ? "#2563EB" : "#FFFFFF",
                                color: isSelected ? "#FFFFFF" : "#4B5563",
                                cursor: "pointer",
                                transition: "all 150ms ease",
                              }}
                            >
                              {label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <div className="space-y-0">
                      {WORKFLOW_STAGES.map((stage, stageIdx) => {
                        const isCompleted = stageIdx <= currentStageIdx;
                        const isCurrent = stageIdx === currentStageIdx;
                        const historyEntry = history.find(
                          (h) => h.status === stage,
                        );

                        return (
                          <div key={stage} className="flex gap-3">
                            <div className="flex flex-col items-center">
                              <div
                                style={{
                                  width: "24px",
                                  height: "24px",
                                  borderRadius: "50%",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  flexShrink: 0,
                                  background: isCompleted
                                    ? isCurrent
                                      ? "#2563EB"
                                      : "#16A34A"
                                    : "#E5E7EB",
                                  boxShadow: isCurrent
                                    ? "0 0 0 3px rgba(13,71,161,0.15)"
                                    : "none",
                                }}
                              >
                                {isCompleted ? (
                                  <CheckCircle
                                    style={{
                                      width: "13px",
                                      height: "13px",
                                      color: "white",
                                    }}
                                  />
                                ) : (
                                  <div
                                    style={{
                                      width: "8px",
                                      height: "8px",
                                      borderRadius: "50%",
                                      background: "#9CA3AF",
                                    }}
                                  />
                                )}
                              </div>
                              {stageIdx < WORKFLOW_STAGES.length - 1 && (
                                <div
                                  style={{
                                    width: "2px",
                                    height: "32px",
                                    background:
                                      stageIdx < currentStageIdx
                                        ? "#16A34A"
                                        : "#E5E7EB",
                                  }}
                                />
                              )}
                            </div>
                            <div style={{ paddingBottom: "16px", flex: 1 }}>
                              <p
                                style={{
                                  fontSize: "12px",
                                  fontWeight: 600,
                                  color: isCurrent
                                    ? "#2563EB"
                                    : isCompleted
                                      ? "#16A34A"
                                      : "#9CA3AF",
                                }}
                              >
                                {STATUS_LABELS[stage]}
                              </p>
                              {historyEntry && (
                                <p
                                  style={{
                                    fontSize: "11px",
                                    color: "#9CA3AF",
                                    marginTop: "2px",
                                  }}
                                >
                                  {new Date(
                                    historyEntry.timestamp,
                                  ).toLocaleString()}
                                </p>
                              )}
                              {historyEntry?.note && (
                                <p
                                  style={{
                                    fontSize: "11px",
                                    color: "#6B7280",
                                    marginTop: "2px",
                                    fontStyle: "italic",
                                  }}
                                >
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
