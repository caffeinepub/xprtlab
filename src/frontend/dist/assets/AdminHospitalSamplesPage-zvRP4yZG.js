import { r as reactExports, j as jsxRuntimeExports, a as useInternetIdentity } from "./index-77iKE7z5.js";
import { B as Button } from "./button-DrsLRlpx.js";
import { d as createLucideIcon, B as useGetAllHospitalSamples, C as useUpdateHospitalSampleBilling, D as useMarkAsDispatched, E as useMarkSampleDelivered, G as useConfirmWhatsAppDelivery, F as FlaskConical, I as Dialog, J as DialogContent, K as DialogHeader, M as DialogTitle, N as DialogDescription, O as DialogFooter } from "./ProfileSetupModal-BB_monh5.js";
import { I as Input } from "./input-BUljrT4O.js";
import { L as Label } from "./label-D5X5n7nv.js";
import { u as ue } from "./index-DnGMpjq-.js";
import { P as PageHeroHeader } from "./PageHeroHeader-DMNNWZUS.js";
import { D as DeliveryMethodSelectionDialog, W as WhatsAppShareConfirmDialog } from "./WhatsAppShareConfirmDialog-DKj3k0FF.js";
import { C as CircleCheckBig } from "./circle-check-big-DbLdUdcS.js";
import { E as Eye } from "./eye-CweXo0nh.js";
import { D as Download } from "./download-BJ2bWgmm.js";
import { g as getSampleStatusColor, S as SampleWorkflowTimeline } from "./deliveryHelpers-BurkprDa.js";
import { S as Search } from "./search-Bq-Fk22W.js";
import { C as ChevronUp, a as ChevronDown } from "./chevron-up--esJi3jb.js";
import { P as Pen } from "./pen-Y1v-2q_s.js";
import "./index-fFFU_iCT.js";
import "./plus-B03gg-WC.js";
import "./index-Bj2r48aT.js";
import "./index-CAiqAleQ.js";
import "./alert-dialog-D0ku9KB2.js";
import "./circle-check-BE62QPGq.js";
import "./truck-Bmubkk6r.js";
import "./building-2-63YCEJlt.js";
import "./microscope-BLReGr-F.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }],
  ["circle", { cx: "6", cy: "12", r: "3", key: "w7nqdw" }],
  ["circle", { cx: "18", cy: "19", r: "3", key: "1xt0gg" }],
  ["line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49", key: "47mynk" }],
  ["line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49", key: "1n3mei" }]
];
const Share2 = createLucideIcon("share-2", __iconNode);
function SampleActionControls({
  sampleId,
  status,
  reportUrl,
  userRole,
  userId,
  phlebotomistId,
  patientName = "",
  tests = [],
  isDemoMode = false,
  onMarkDispatched,
  onMarkDelivered,
  onConfirmWhatsApp
}) {
  const [deliveryDialogOpen, setDeliveryDialogOpen] = reactExports.useState(false);
  const [whatsAppDialogOpen, setWhatsAppDialogOpen] = reactExports.useState(false);
  const isLabAdmin = userRole === "labAdmin";
  const isSuperAdmin = userRole === "superAdmin";
  const isPhlebotomist = userRole === "phlebotomist";
  const isOwnSample = isDemoMode || phlebotomistId === userId;
  const canActOnSample = isLabAdmin || isSuperAdmin || isPhlebotomist && isOwnSample;
  if (!canActOnSample) return null;
  const sampleForDialog = {
    patientName,
    phone: "",
    hospitalId: "",
    phlebotomistId: phlebotomistId ?? "",
    tests,
    totalMrp: BigInt(0),
    discountAmount: BigInt(0),
    maxAllowedDiscount: BigInt(0),
    finalAmount: BigInt(0),
    amountReceived: BigInt(0),
    pendingAmount: BigInt(0),
    paymentMode: "",
    billingLocked: false,
    createdByRole: "",
    updatedByAdmin: false,
    createdAt: BigInt(0),
    status,
    statusHistory: []
  };
  const handleDeliveryConfirm = (method) => {
    onMarkDelivered == null ? void 0 : onMarkDelivered(sampleId, method, userRole, userId);
    setDeliveryDialogOpen(false);
  };
  const handleWhatsAppConfirm = () => {
    onConfirmWhatsApp == null ? void 0 : onConfirmWhatsApp(sampleId);
    setWhatsAppDialogOpen(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mt-2", children: [
    status === "SAMPLE_COLLECTED" && onMarkDispatched && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        size: "sm",
        variant: "outline",
        className: "gap-1.5 text-xs",
        onClick: () => onMarkDispatched(sampleId),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-3.5 w-3.5" }),
          "Mark Dispatched"
        ]
      }
    ),
    status === "REPORT_READY" && (isLabAdmin || isSuperAdmin) && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      reportUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "outline",
            className: "gap-1.5 text-xs",
            onClick: () => window.open(reportUrl, "_blank"),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3.5 w-3.5" }),
              "View Report"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "outline",
            className: "gap-1.5 text-xs",
            onClick: () => {
              const a = document.createElement("a");
              a.href = reportUrl;
              a.download = `report-${sampleId}.pdf`;
              a.click();
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3.5 w-3.5" }),
              "Download Report"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "outline",
            className: "gap-1.5 text-xs text-green-700 border-green-300 hover:bg-green-50",
            onClick: () => setWhatsAppDialogOpen(true),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "h-3.5 w-3.5" }),
              "Share via WhatsApp"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          className: "gap-1.5 text-xs",
          onClick: () => setDeliveryDialogOpen(true),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-3.5 w-3.5" }),
            "Mark Delivered"
          ]
        }
      )
    ] }),
    status === "REPORT_DELIVERED" && reportUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          variant: "outline",
          className: "gap-1.5 text-xs",
          onClick: () => window.open(reportUrl, "_blank"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3.5 w-3.5" }),
            "View Report"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          variant: "outline",
          className: "gap-1.5 text-xs",
          onClick: () => {
            const a = document.createElement("a");
            a.href = reportUrl;
            a.download = `report-${sampleId}.pdf`;
            a.click();
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3.5 w-3.5" }),
            "Download Report"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DeliveryMethodSelectionDialog,
      {
        open: deliveryDialogOpen,
        onOpenChange: setDeliveryDialogOpen,
        onConfirm: handleDeliveryConfirm,
        isDemoMode
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      WhatsAppShareConfirmDialog,
      {
        open: whatsAppDialogOpen,
        onOpenChange: setWhatsAppDialogOpen,
        sample: sampleForDialog,
        onConfirm: handleWhatsAppConfirm,
        isDemoMode
      }
    )
  ] });
}
const DELIVERY_FILTER_OPTIONS = [
  { value: "all", label: "All" },
  { value: "WHATSAPP", label: "WhatsApp" },
  { value: "PHYSICAL", label: "Physical" },
  { value: "EMAIL", label: "Email" },
  { value: "HOSPITAL_PICKUP", label: "Hospital Pickup" },
  { value: "pending", label: "Pending Delivery" }
];
function AdminHospitalSamplesPage() {
  const { identity } = useInternetIdentity();
  const userId = (identity == null ? void 0 : identity.getPrincipal().toString()) ?? "";
  const { data: samples = [], isLoading } = useGetAllHospitalSamples();
  const updateBilling = useUpdateHospitalSampleBilling();
  const markDispatched = useMarkAsDispatched();
  const markDelivered = useMarkSampleDelivered();
  const confirmWhatsApp = useConfirmWhatsAppDelivery();
  const [search, setSearch] = reactExports.useState("");
  const [deliveryFilter, setDeliveryFilter] = reactExports.useState("all");
  const [expandedId, setExpandedId] = reactExports.useState(null);
  const [billingEdit, setBillingEdit] = reactExports.useState(null);
  const [_deliveryDialogSampleId, _setDeliveryDialogSampleId] = reactExports.useState(null);
  const [_whatsAppDialogSampleId, _setWhatsAppDialogSampleId] = reactExports.useState(null);
  const filteredSamples = samples.filter((s) => {
    var _a, _b;
    const matchesSearch = !search || ((_a = s.patientName) == null ? void 0 : _a.toLowerCase().includes(search.toLowerCase())) || ((_b = s.phone) == null ? void 0 : _b.includes(search));
    const matchesDelivery = deliveryFilter === "all" || deliveryFilter === "pending" && !s.deliveryMethod || s.deliveryMethod === deliveryFilter;
    return matchesSearch && matchesDelivery;
  });
  const toggleExpand = (id) => {
    setExpandedId((prev) => prev === id ? null : id);
  };
  const handleMarkDispatched = async (sampleId) => {
    try {
      await markDispatched.mutateAsync(sampleId);
      ue.success("Sample marked as dispatched");
    } catch (err) {
      ue.error(`Failed: ${(err == null ? void 0 : err.message) ?? err}`);
    }
  };
  const handleMarkDelivered = async (sampleId, method, deliveredByRole, deliveredById) => {
    try {
      await markDelivered.mutateAsync({
        sampleId,
        deliveryMethod: method,
        deliveredByRole,
        deliveredById,
        action: "deliver"
      });
      ue.success("Report marked as delivered");
    } catch (err) {
      ue.error(`Failed: ${(err == null ? void 0 : err.message) ?? err}`);
    }
  };
  const handleConfirmWhatsApp = async (sampleId) => {
    try {
      await confirmWhatsApp.mutateAsync(sampleId);
      ue.success("WhatsApp delivery confirmed");
    } catch (err) {
      ue.error(`Failed: ${(err == null ? void 0 : err.message) ?? err}`);
    }
  };
  const handleBillingSave = async () => {
    if (!billingEdit) return;
    try {
      await updateBilling.mutateAsync({
        sampleId: billingEdit.sampleId,
        newDiscountAmount: billingEdit.discountAmount,
        newAmountReceived: billingEdit.amountReceived,
        paymentMode: billingEdit.paymentMode
      });
      ue.success("Billing updated");
      setBillingEdit(null);
    } catch (err) {
      ue.error(`Failed: ${(err == null ? void 0 : err.message) ?? err}`);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeroHeader,
      {
        title: "Samples",
        description: "Track and manage hospital sample collections"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-4 pb-3 border-b border-border bg-background", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { className: "h-5 w-5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-semibold text-foreground", children: "Hospital Samples" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            className: "pl-9",
            placeholder: "Search by patient name or phone...",
            value: search,
            onChange: (e) => setSearch(e.target.value)
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2 flex gap-2 overflow-x-auto border-b border-border bg-background", children: DELIVERY_FILTER_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setDeliveryFilter(opt.value),
        className: [
          "shrink-0 text-xs px-3 py-1 rounded-full border transition-colors",
          deliveryFilter === opt.value ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary/40"
        ].join(" "),
        children: opt.label
      },
      opt.value
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-auto px-4 py-3 space-y-2", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary" }) }) : filteredSamples.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { className: "h-10 w-10 text-muted-foreground mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "No samples found" })
    ] }) : filteredSamples.map((sample) => {
      var _a;
      const sampleId = sample.id ?? sample.patientName;
      const isExpanded = expandedId === sampleId;
      const status = sample.status ?? "SAMPLE_COLLECTED";
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-xl border border-border bg-card overflow-hidden",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                className: "w-full flex items-center justify-between p-3 text-left",
                onClick: () => toggleExpand(sampleId),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: sample.patientName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                      sample.phone,
                      " · ₹",
                      Number(sample.finalAmount).toLocaleString("en-IN"),
                      " ·",
                      " ",
                      sample.paymentMode
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 ml-2 shrink-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `text-xs px-2 py-0.5 rounded-full border font-medium ${getSampleStatusColor(status)}`,
                        children: status.replace(/_/g, " ")
                      }
                    ),
                    isExpanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-4 w-4 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 text-muted-foreground" })
                  ] })
                ]
              }
            ),
            isExpanded && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border px-3 py-3 space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/50 rounded-lg p-2 text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "MRP" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold", children: [
                    "₹",
                    Number(sample.totalMrp).toLocaleString("en-IN")
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/50 rounded-lg p-2 text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Discount" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold", children: [
                    "₹",
                    Number(sample.discountAmount).toLocaleString(
                      "en-IN"
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/50 rounded-lg p-2 text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Final" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold", children: [
                    "₹",
                    Number(sample.finalAmount).toLocaleString("en-IN")
                  ] })
                ] })
              ] }),
              ((_a = sample.tests) == null ? void 0 : _a.length) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mb-1", children: "Tests" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: sample.tests.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex justify-between text-xs",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t.testName }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                        "₹",
                        Number(t.price).toLocaleString("en-IN")
                      ] })
                    ]
                  },
                  t.testName ?? i
                )) })
              ] }),
              !sample.billingLocked && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  className: "gap-1.5 text-xs",
                  onClick: () => setBillingEdit({
                    sampleId,
                    discountAmount: Number(sample.discountAmount),
                    amountReceived: Number(sample.amountReceived),
                    paymentMode: sample.paymentMode,
                    totalMrp: Number(sample.totalMrp),
                    maxAllowedDiscount: Number(
                      sample.maxAllowedDiscount
                    )
                  }),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "h-3.5 w-3.5" }),
                    "Edit Billing"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SampleActionControls,
                {
                  sampleId,
                  status,
                  reportUrl: sample.reportUrl,
                  userRole: "labAdmin",
                  userId,
                  phlebotomistId: sample.phlebotomistId,
                  onMarkDispatched: handleMarkDispatched,
                  onMarkDelivered: handleMarkDelivered,
                  onConfirmWhatsApp: handleConfirmWhatsApp
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mb-2", children: "Status Timeline" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SampleWorkflowTimeline, { currentStatus: status })
              ] })
            ] })
          ]
        },
        sampleId
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: !!billingEdit,
        onOpenChange: (o) => {
          if (!o) setBillingEdit(null);
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Edit Billing" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Update discount and payment details for this sample." })
          ] }),
          billingEdit && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Discount Amount (₹)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "number",
                  min: 0,
                  max: billingEdit.maxAllowedDiscount,
                  value: billingEdit.discountAmount,
                  onChange: (e) => setBillingEdit(
                    (prev) => prev ? { ...prev, discountAmount: Number(e.target.value) } : prev
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "Max allowed: ₹",
                billingEdit.maxAllowedDiscount.toLocaleString("en-IN")
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Amount Received (₹)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "number",
                  min: 0,
                  value: billingEdit.amountReceived,
                  onChange: (e) => setBillingEdit(
                    (prev) => prev ? { ...prev, amountReceived: Number(e.target.value) } : prev
                  )
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Payment Mode" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  className: "w-full border border-border rounded-md px-3 py-2 text-sm bg-background",
                  value: billingEdit.paymentMode,
                  onChange: (e) => setBillingEdit(
                    (prev) => prev ? { ...prev, paymentMode: e.target.value } : prev
                  ),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "CASH", children: "Cash" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "UPI", children: "UPI" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "CARD", children: "Card" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "CREDIT", children: "Credit" })
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setBillingEdit(null), children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: handleBillingSave,
                disabled: updateBilling.isPending,
                children: updateBilling.isPending ? "Saving..." : "Save"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  AdminHospitalSamplesPage as default
};
