import { r as reactExports, j as jsxRuntimeExports } from "./index-lVn_hGWr.js";
import { D as DeliveryMethodSelectionDialog, W as WhatsAppShareConfirmDialog } from "./WhatsAppShareConfirmDialog-DlPf8H6Y.js";
import { f as getDemoHospitals, c as getDemoSamples, h as getDemoStatusHistory, D as DEMO_PHLEBO_ID, j as updateDemoSampleStatus, k as updateDemoSampleDelivery, l as addDemoDeliveryTracking } from "./demoData-B0MQ4MOM.js";
import { R as RefreshCw } from "./refresh-cw-DhSWkTpS.js";
import { T as TestTube } from "./StaffApp-GSTH_5VV.js";
import { P as Phone } from "./user-D8SUbWXo.js";
import { B as Building2 } from "./building-2-CzOXe9xM.js";
import { I as IndianRupee } from "./indian-rupee-oPr-AmVC.js";
import { d as createLucideIcon, L as LoaderCircle } from "./ProfileSetupModal-BYStubB_.js";
import { T as Truck, C as ChevronUp, a as ChevronDown } from "./truck-wv6q1hym.js";
import { C as CircleCheckBig } from "./circle-check-big-CKsn2ZsM.js";
import "./button-CiKsIGuP.js";
import "./index-BVenjb96.js";
import "./label-a7i21b1Q.js";
import "./index-LMV2eLk6.js";
import "./index-C8SF2zjx.js";
import "./alert-dialog-CzbPOvyV.js";
import "./clock-fiwY_hPt.js";
import "./map-pin-D6z2p51m.js";
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
const STATUS_COLORS = {
  SAMPLE_COLLECTED: "bg-gray-100 text-gray-700",
  DISPATCHED: "bg-blue-100 text-blue-700",
  PROCESSING: "bg-orange-100 text-orange-700",
  REPORT_READY: "bg-green-100 text-green-700",
  REPORT_DELIVERED: "bg-emerald-100 text-emerald-700"
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gray-50 pb-[90px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border-b border-gray-100 px-4 pt-4 pb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-gray-900", children: "My Samples" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: handleRefresh,
            className: "flex items-center gap-1.5 text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                RefreshCw,
                {
                  className: `w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`
                }
              ),
              "Refresh"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-400", children: [
        samples.length,
        " sample",
        samples.length !== 1 ? "s" : "",
        " total"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3", children: "Status Overview" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-5 gap-1", children: WORKFLOW_STAGES.map((stage) => {
        const count = samples.filter((s) => s.status === stage).length;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-gray-800", children: count }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 mt-0.5 leading-tight", children: STATUS_LABELS[stage].split(" ")[0] })
        ] }, stage);
      }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 space-y-3", children: samples.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TestTube, { className: "w-10 h-10 text-gray-300 mx-auto mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 font-medium", children: "No samples yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-sm mt-1", children: "Samples you collect will appear here." })
    ] }) : samples.map((sample) => {
      const isExpanded = expandedId === sample.id;
      const isUpdating = updatingId === sample.id;
      const history = getDemoStatusHistory(
        sample.id
      );
      const currentStageIdx = WORKFLOW_STAGES.indexOf(sample.status);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-gray-900", children: sample.patientName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-0.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3 h-3 text-gray-400" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: sample.phone })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLORS[sample.status]}`,
                    children: STATUS_LABELS[sample.status]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-3.5 h-3.5 text-gray-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-600", children: getHospitalName(sample.hospitalId) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 mb-3", children: sample.tests.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full",
                  children: t.testCode
                },
                t.testId
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs text-gray-500 mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "w-3 h-3" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "₹",
                    sample.finalAmount
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: sample.paymentMode }),
                sample.pendingAmount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-red-500", children: [
                    "₹",
                    sample.pendingAmount,
                    " pending"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                sample.status === "SAMPLE_COLLECTED" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => handleMarkDispatched(sample.id),
                    disabled: isUpdating,
                    className: "flex-1 flex items-center justify-center gap-1.5 text-xs bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-3 py-2 rounded-xl font-medium disabled:opacity-60",
                    children: [
                      isUpdating ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-3.5 h-3.5" }),
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
                    className: "flex-1 flex items-center justify-center gap-1.5 text-xs bg-gradient-to-r from-green-600 to-emerald-500 text-white px-3 py-2 rounded-xl font-medium disabled:opacity-60",
                    children: [
                      isUpdating ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-3.5 h-3.5" }),
                      isUpdating ? "Updating..." : "Deliver Report"
                    ]
                  }
                ),
                sample.status === "REPORT_DELIVERED" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-emerald-600 font-medium", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3.5 h-3.5" }),
                  "Delivered",
                  sample.deliveryMethod && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gray-400 ml-1", children: [
                    "via ",
                    sample.deliveryMethod
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => setExpandedId(isExpanded ? null : sample.id),
                    className: "flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-3 py-2 rounded-xl ml-auto",
                    children: [
                      "Timeline",
                      isExpanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3.5 h-3.5" })
                    ]
                  }
                )
              ] })
            ] }),
            isExpanded && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-gray-100 bg-gray-50 p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3", children: "Workflow Timeline" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-0", children: WORKFLOW_STAGES.map((stage, idx) => {
                const isCompleted = idx <= currentStageIdx;
                const isCurrent = idx === currentStageIdx;
                const historyEntry = history.find(
                  (h) => h.status === stage
                );
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: `w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${isCompleted ? isCurrent ? "bg-blue-600 ring-2 ring-blue-200" : "bg-emerald-500" : "bg-gray-200"}`,
                        children: isCompleted ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3.5 h-3.5 text-white" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-gray-400" })
                      }
                    ),
                    idx < WORKFLOW_STAGES.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: `w-0.5 h-8 ${idx < currentStageIdx ? "bg-emerald-400" : "bg-gray-200"}`
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-4 flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: `text-xs font-semibold ${isCurrent ? "text-blue-700" : isCompleted ? "text-emerald-700" : "text-gray-400"}`,
                        children: STATUS_LABELS[stage]
                      }
                    ),
                    historyEntry && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 mt-0.5", children: new Date(
                      historyEntry.timestamp
                    ).toLocaleString() }),
                    (historyEntry == null ? void 0 : historyEntry.note) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mt-0.5 italic", children: historyEntry.note })
                  ] })
                ] }, stage);
              }) })
            ] })
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
