import { r as reactExports, j as jsxRuntimeExports } from "./index-BcSF07MB.js";
import { B as Badge } from "./badge-D6H4sPB8.js";
import { g as getSampleStatusColor, S as SampleWorkflowTimeline } from "./deliveryHelpers-CKEFD6Yi.js";
import { p as useGetHospitalSamplesByPhone, F as FlaskConical } from "./ProfileSetupModal-DZhF98LT.js";
import { a as getDemoSamples, P as Package } from "./demoData-Nk0_-YUY.js";
import { C as ChevronUp, a as ChevronDown } from "./chevron-up-C2hw6zZX.js";
import "./index-hKQIW38e.js";
import "./circle-check-Dw9Il_Ru.js";
import "./truck-e21IFt35.js";
import "./building-2-2WTSU1FY.js";
import "./microscope-CxfXRB9A.js";
function MyHospitalSamplesPage({
  isDemoMode = false
}) {
  const { data: backendSamples = [], isLoading } = useGetHospitalSamplesByPhone();
  const [expandedId, setExpandedId] = reactExports.useState(null);
  const demoSamples = isDemoMode ? getDemoSamples() : [];
  const allSamples = isDemoMode ? [
    ...demoSamples.map((s) => ({ ...s, id: s.id ?? "demo" })),
    ...backendSamples
  ] : backendSamples;
  const toggleExpand = (id) => {
    setExpandedId((prev) => prev === id ? null : id);
  };
  if (isLoading && !isDemoMode) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary" }) });
  }
  if (allSamples.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-16 text-center px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-12 w-12 text-muted-foreground mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "No lab samples yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Your hospital sample records will appear here." })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-4 space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { className: "h-5 w-5 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-semibold text-foreground", children: "My Lab Samples" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: allSamples.length })
    ] }),
    allSamples.map((sample) => {
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
                      " ·",
                      " ",
                      new Date(Number(sample.createdAt)).toLocaleDateString(
                        "en-IN"
                      )
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
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground", children: [
                    "₹",
                    Number(sample.totalMrp).toLocaleString("en-IN")
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/50 rounded-lg p-2 text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Discount" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground", children: [
                    "₹",
                    Number(sample.discountAmount).toLocaleString("en-IN")
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/50 rounded-lg p-2 text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Final" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground", children: [
                    "₹",
                    Number(sample.finalAmount).toLocaleString("en-IN")
                  ] })
                ] })
              ] }),
              sample.tests && sample.tests.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mb-1", children: "Tests" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: sample.tests.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex justify-between text-xs",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: t.testName }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                        "₹",
                        Number(t.price).toLocaleString("en-IN")
                      ] })
                    ]
                  },
                  t.testName ?? i
                )) })
              ] }),
              sample.deliveryMethod && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-emerald-50 rounded-lg p-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-emerald-700 font-medium", children: [
                  "Delivered via",
                  " ",
                  String(sample.deliveryMethod).replace(/_/g, " ")
                ] }),
                sample.deliveredAt && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-emerald-600 mt-0.5", children: new Date(Number(sample.deliveredAt)).toLocaleString(
                  "en-IN"
                ) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mb-2", children: "Status Timeline" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SampleWorkflowTimeline, { currentStatus: status })
              ] })
            ] })
          ]
        },
        sampleId
      );
    })
  ] });
}
export {
  MyHospitalSamplesPage as default
};
