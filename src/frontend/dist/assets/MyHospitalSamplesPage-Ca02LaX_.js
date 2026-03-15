import { r as reactExports, j as jsxRuntimeExports } from "./index-BcSF07MB.js";
import { D as DeliveryMethodSelectionDialog, W as WhatsAppShareConfirmDialog } from "./WhatsAppShareConfirmDialog-BD_9-42I.js";
import { f as getDemoHospitals, c as getDemoSamples, h as getDemoStatusHistory, j as updateDemoSampleDelivery, D as DEMO_PHLEBO_ID, k as updateDemoSampleStatus, l as addDemoDeliveryTracking } from "./demoData-Nk0_-YUY.js";
import { R as RefreshCw } from "./refresh-cw-C-Eluhow.js";
import { T as TestTube } from "./StaffApp-4vOjvg9B.js";
import { P as Phone } from "./user-BR4Wwed5.js";
import { B as Building2 } from "./building-2-2WTSU1FY.js";
import { I as IndianRupee } from "./indian-rupee-l2gyERnG.js";
import { d as createLucideIcon, L as LoaderCircle } from "./ProfileSetupModal-DZhF98LT.js";
import { T as Truck } from "./truck-e21IFt35.js";
import { C as CircleCheckBig } from "./circle-check-big-CN4w7Yzd.js";
import { C as ChevronUp, a as ChevronDown } from "./chevron-up-C2hw6zZX.js";
import "./button-wOnNUJ71.js";
import "./index-hKQIW38e.js";
import "./label-DzAGXiXR.js";
import "./index-DQcsENVr.js";
import "./index-BC_oSiPt.js";
import "./alert-dialog--_6hdaiC.js";
import "./clock-Bi5ilDhW.js";
import "./map-pin-Ddp8nwPv.js";
import "./search-DHbyPuXy.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode);
const STATUS_LABELS = {
  SAMPLE_COLLECTED: "Collected",
  DISPATCHED: "Dispatched",
  PROCESSING: "Processing",
  REPORT_READY: "Report Ready",
  REPORT_DELIVERED: "Delivered"
};
const STATUS_STYLES = {
  SAMPLE_COLLECTED: { background: "#F3F4F6", color: "#6B7280" },
  DISPATCHED: { background: "#EFF6FF", color: "#3B82F6" },
  PROCESSING: { background: "#FFFBEB", color: "#F59E0B" },
  REPORT_READY: { background: "#F0FDF4", color: "#16A34A" },
  REPORT_DELIVERED: { background: "#F0FDF4", color: "#16A34A" }
};
const WORKFLOW_STAGES = [
  "SAMPLE_COLLECTED",
  "DISPATCHED",
  "PROCESSING",
  "REPORT_READY",
  "REPORT_DELIVERED"
];
function buildSampleForDialog(sample) {
  return {
    patientName: sample.patientName,
    phone: sample.phone,
    hospitalId: sample.hospitalId,
    phlebotomistId: sample.phlebotomistId,
    tests: sample.tests.map((t) => ({
      testId: t.testId,
      testName: t.testName,
      testCode: t.testCode,
      price: BigInt(t.price)
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
    status: sample.status,
    statusHistory: []
  };
}
function MyHospitalSamplesPage({
  isDemoMode = false,
  onNavigate: _onNavigate
}) {
  const [samples, setSamples] = reactExports.useState([]);
  const [expandedId, setExpandedId] = reactExports.useState(null);
  const [updatingId, setUpdatingId] = reactExports.useState(null);
  const [isRefreshing, setIsRefreshing] = reactExports.useState(false);
  const [deliveryDialogSampleId, setDeliveryDialogSampleId] = reactExports.useState(null);
  const [whatsappDialogSampleId, setWhatsappDialogSampleId] = reactExports.useState(null);
  const hospitals = getDemoHospitals();
  const getHospitalName = (hospitalId) => {
    const h = hospitals.find((h2) => h2.id === hospitalId);
    return (h == null ? void 0 : h.name) ?? hospitalId;
  };
  const loadSamples = reactExports.useCallback(() => {
    if (isDemoMode) {
      const data = getDemoSamples(DEMO_PHLEBO_ID);
      setSamples(data);
    }
  }, [isDemoMode]);
  reactExports.useEffect(() => {
    loadSamples();
  }, [loadSamples]);
  const handleRefresh = () => {
    setIsRefreshing(true);
    loadSamples();
    setTimeout(() => setIsRefreshing(false), 600);
  };
  const handleMarkDispatched = async (sampleId) => {
    if (!isDemoMode) return;
    setUpdatingId(sampleId);
    await new Promise((r) => setTimeout(r, 400));
    updateDemoSampleStatus(
      sampleId,
      "DISPATCHED",
      DEMO_PHLEBO_ID,
      "Sample dispatched to lab"
    );
    loadSamples();
    setUpdatingId(null);
  };
  const handleDeliveryMethodConfirm = async (method) => {
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
      deliveredBy: DEMO_PHLEBO_ID
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
      DEMO_PHLEBO_ID
    );
    addDemoDeliveryTracking({
      id: `dt-${sampleId}-${Date.now()}`,
      sampleId,
      deliveryMethod: "WHATSAPP",
      deliveredAt: Date.now(),
      deliveredBy: DEMO_PHLEBO_ID
    });
    loadSamples();
    setUpdatingId(null);
  };
  if (!isDemoMode) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Live hospital samples — connect to backend." }) });
  }
  const whatsappSample = whatsappDialogSampleId ? samples.find((s) => s.id === whatsappDialogSampleId) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen pb-[90px]", style: { background: "#F7F9FC" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: {
          background: "linear-gradient(135deg, #2563EB, #06B6D4)",
          padding: "20px",
          marginBottom: "0"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h1",
                  {
                    style: {
                      fontSize: "20px",
                      fontWeight: 700,
                      color: "white",
                      margin: 0
                    },
                    children: "My Samples"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    style: {
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.8)",
                      margin: "4px 0 0"
                    },
                    children: [
                      samples.length,
                      " sample",
                      samples.length !== 1 ? "s" : "",
                      " total"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: handleRefresh,
                  style: {
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
                    fontWeight: 600
                  },
                  "data-ocid": "my_samples.button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      RefreshCw,
                      {
                        style: { width: "15px", height: "15px" },
                        className: isRefreshing ? "animate-spin" : ""
                      }
                    ),
                    "Refresh"
                  ]
                }
              )
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: {
          background: "#FFFFFF",
          borderRadius: "16px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          padding: "16px",
          marginBottom: "16px"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              style: {
                fontSize: "11px",
                fontWeight: 600,
                color: "#9CA3AF",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "12px"
              },
              children: "Status Overview"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-5 gap-1", children: WORKFLOW_STAGES.map((stage) => {
            const count = samples.filter((s) => s.status === stage).length;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  style: {
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "#1F2937"
                  },
                  children: count
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  style: {
                    fontSize: "11px",
                    color: "#9CA3AF",
                    marginTop: "2px",
                    lineHeight: 1.2
                  },
                  children: STATUS_LABELS[stage].split(" ")[0]
                }
              )
            ] }, stage);
          }) })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 space-y-3", children: samples.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: {
          background: "#FFFFFF",
          borderRadius: "16px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          padding: "32px",
          textAlign: "center"
        },
        "data-ocid": "my_samples.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TestTube,
            {
              style: {
                width: "40px",
                height: "40px",
                color: "#D1D5DB",
                margin: "0 auto 12px"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#6B7280", fontWeight: 500 }, children: "No samples yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#9CA3AF", fontSize: "14px", marginTop: "4px" }, children: "Samples you collect will appear here." })
        ]
      }
    ) : samples.map((sample, idx) => {
      const isExpanded = expandedId === sample.id;
      const isUpdating = updatingId === sample.id;
      const history = getDemoStatusHistory(
        sample.id
      );
      const currentStageIdx = WORKFLOW_STAGES.indexOf(sample.status);
      const statusStyle = STATUS_STYLES[sample.status];
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": `my_samples.item.${idx + 1}`,
          style: {
            background: "#FFFFFF",
            borderRadius: "16px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            overflow: "hidden",
            transition: "all 200ms ease"
          },
          onMouseEnter: (e) => {
            e.currentTarget.style.boxShadow = "0 12px 32px rgba(13,71,161,0.12)";
          },
          onMouseLeave: (e) => {
            e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "16px" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      style: {
                        fontWeight: 700,
                        fontSize: "16px",
                        color: "#111827"
                      },
                      children: sample.patientName
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-0.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Phone,
                      {
                        style: {
                          width: "12px",
                          height: "12px",
                          color: "#9CA3AF"
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: "12px", color: "#6B7280" }, children: sample.phone })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    style: {
                      ...statusStyle,
                      fontSize: "11px",
                      fontWeight: 600,
                      padding: "4px 10px",
                      borderRadius: "999px"
                    },
                    children: STATUS_LABELS[sample.status]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Building2,
                  {
                    style: {
                      width: "13px",
                      height: "13px",
                      color: "#9CA3AF"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: "13px", color: "#6B7280" }, children: getHospitalName(sample.hospitalId) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 mb-3", children: sample.tests.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  style: {
                    fontSize: "11px",
                    background: "#F3F4F6",
                    color: "#4B5563",
                    padding: "2px 8px",
                    borderRadius: "999px"
                  },
                  children: t.testCode
                },
                t.testId
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-3 mb-3",
                  style: { fontSize: "12px", color: "#6B7280" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { style: { width: "12px", height: "12px" } }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontWeight: 600, color: "#374151" }, children: [
                        "₹",
                        sample.finalAmount
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: sample.paymentMode }),
                    sample.pendingAmount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "#DC2626", fontWeight: 600 }, children: [
                        "₹",
                        sample.pendingAmount,
                        " pending"
                      ] })
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                sample.status === "SAMPLE_COLLECTED" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => handleMarkDispatched(sample.id),
                    disabled: isUpdating,
                    "data-ocid": `my_samples.primary_button.${idx + 1}`,
                    style: {
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      fontSize: "12px",
                      background: "linear-gradient(135deg, #2563EB, #06B6D4)",
                      color: "white",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "10px",
                      fontWeight: 600,
                      cursor: isUpdating ? "not-allowed" : "pointer",
                      opacity: isUpdating ? 0.6 : 1
                    },
                    children: [
                      isUpdating ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                        LoaderCircle,
                        {
                          style: { width: "13px", height: "13px" },
                          className: "animate-spin"
                        }
                      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { style: { width: "13px", height: "13px" } }),
                      isUpdating ? "Updating..." : "Mark Dispatched"
                    ]
                  }
                ),
                sample.status === "REPORT_READY" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => setDeliveryDialogSampleId(sample.id),
                    disabled: isUpdating,
                    "data-ocid": `my_samples.secondary_button.${idx + 1}`,
                    style: {
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      fontSize: "12px",
                      background: "linear-gradient(135deg, #2563EB, #06B6D4)",
                      color: "white",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "10px",
                      fontWeight: 600,
                      cursor: isUpdating ? "not-allowed" : "pointer",
                      opacity: isUpdating ? 0.6 : 1
                    },
                    children: [
                      isUpdating ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                        LoaderCircle,
                        {
                          style: { width: "13px", height: "13px" },
                          className: "animate-spin"
                        }
                      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { style: { width: "13px", height: "13px" } }),
                      isUpdating ? "Updating..." : "Deliver Report"
                    ]
                  }
                ),
                sample.status === "REPORT_DELIVERED" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "12px",
                      color: "#16A34A",
                      fontWeight: 500
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        CircleCheckBig,
                        {
                          style: { width: "13px", height: "13px" }
                        }
                      ),
                      "Delivered",
                      sample.deliveryMethod && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "#9CA3AF", marginLeft: "4px" }, children: [
                        "via ",
                        sample.deliveryMethod
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => setExpandedId(isExpanded ? null : sample.id),
                    style: {
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
                      cursor: "pointer"
                    },
                    children: [
                      "Timeline",
                      isExpanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { style: { width: "13px", height: "13px" } }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                        ChevronDown,
                        {
                          style: { width: "13px", height: "13px" }
                        }
                      )
                    ]
                  }
                )
              ] })
            ] }),
            isExpanded && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  borderTop: "1px solid #F3F4F6",
                  background: "#FAFAFA",
                  padding: "16px"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      style: {
                        fontSize: "11px",
                        fontWeight: 600,
                        color: "#9CA3AF",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        marginBottom: "12px"
                      },
                      children: "Workflow Timeline"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      style: {
                        marginBottom: "16px",
                        padding: "12px",
                        background: "#F0F9FF",
                        borderRadius: "10px",
                        border: "1px solid #BAE6FD"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            style: {
                              fontSize: "11px",
                              fontWeight: 600,
                              color: "#0369A1",
                              textTransform: "uppercase",
                              letterSpacing: "0.05em",
                              marginBottom: "8px"
                            },
                            children: "Delivery Method"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: [
                          { value: "WHATSAPP", label: "📱 WhatsApp" },
                          { value: "EMAIL", label: "📧 Email" },
                          { value: "APP_DOWNLOAD", label: "📲 App Download" }
                        ].map(({ value, label }) => {
                          const isSelected = (sample.deliveryMethod ?? "").toUpperCase() === value;
                          return /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "button",
                            {
                              type: "button",
                              "data-ocid": `my_samples.delivery_method.toggle.${WORKFLOW_STAGES.indexOf(sample.status) + 1}`,
                              onClick: () => {
                                if (isDemoMode) {
                                  updateDemoSampleDelivery(
                                    sample.id,
                                    value,
                                    "phlebotomist",
                                    DEMO_PHLEBO_ID
                                  );
                                  loadSamples();
                                }
                              },
                              style: {
                                padding: "5px 12px",
                                borderRadius: "999px",
                                fontSize: "12px",
                                fontWeight: 500,
                                border: isSelected ? "2px solid #2563EB" : "1.5px solid #D1D5DB",
                                background: isSelected ? "#2563EB" : "#FFFFFF",
                                color: isSelected ? "#FFFFFF" : "#4B5563",
                                cursor: "pointer",
                                transition: "all 150ms ease"
                              },
                              children: label
                            },
                            value
                          );
                        }) })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-0", children: WORKFLOW_STAGES.map((stage, stageIdx) => {
                    const isCompleted = stageIdx <= currentStageIdx;
                    const isCurrent = stageIdx === currentStageIdx;
                    const historyEntry = history.find(
                      (h) => h.status === stage
                    );
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            style: {
                              width: "24px",
                              height: "24px",
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                              background: isCompleted ? isCurrent ? "#2563EB" : "#16A34A" : "#E5E7EB",
                              boxShadow: isCurrent ? "0 0 0 3px rgba(13,71,161,0.15)" : "none"
                            },
                            children: isCompleted ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                              CircleCheckBig,
                              {
                                style: {
                                  width: "13px",
                                  height: "13px",
                                  color: "white"
                                }
                              }
                            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                style: {
                                  width: "8px",
                                  height: "8px",
                                  borderRadius: "50%",
                                  background: "#9CA3AF"
                                }
                              }
                            )
                          }
                        ),
                        stageIdx < WORKFLOW_STAGES.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            style: {
                              width: "2px",
                              height: "32px",
                              background: stageIdx < currentStageIdx ? "#16A34A" : "#E5E7EB"
                            }
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { paddingBottom: "16px", flex: 1 }, children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            style: {
                              fontSize: "12px",
                              fontWeight: 600,
                              color: isCurrent ? "#2563EB" : isCompleted ? "#16A34A" : "#9CA3AF"
                            },
                            children: STATUS_LABELS[stage]
                          }
                        ),
                        historyEntry && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            style: {
                              fontSize: "11px",
                              color: "#9CA3AF",
                              marginTop: "2px"
                            },
                            children: new Date(
                              historyEntry.timestamp
                            ).toLocaleString()
                          }
                        ),
                        (historyEntry == null ? void 0 : historyEntry.note) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            style: {
                              fontSize: "11px",
                              color: "#6B7280",
                              marginTop: "2px",
                              fontStyle: "italic"
                            },
                            children: historyEntry.note
                          }
                        )
                      ] })
                    ] }, stage);
                  }) })
                ]
              }
            )
          ]
        },
        sample.id
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DeliveryMethodSelectionDialog,
      {
        open: !!deliveryDialogSampleId,
        onOpenChange: (open) => {
          if (!open) setDeliveryDialogSampleId(null);
        },
        onConfirm: handleDeliveryMethodConfirm,
        isDemoMode
      }
    ),
    whatsappSample && /* @__PURE__ */ jsxRuntimeExports.jsx(
      WhatsAppShareConfirmDialog,
      {
        open: !!whatsappDialogSampleId,
        onOpenChange: (open) => {
          if (!open) setWhatsappDialogSampleId(null);
        },
        sample: buildSampleForDialog(whatsappSample),
        onConfirm: handleWhatsAppConfirm,
        isDemoMode
      }
    )
  ] });
}
export {
  MyHospitalSamplesPage as default
};
