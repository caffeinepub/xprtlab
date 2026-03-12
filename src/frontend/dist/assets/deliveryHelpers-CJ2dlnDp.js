import { j as jsxRuntimeExports } from "./index-lVn_hGWr.js";
import { C as CircleCheck } from "./circle-check-BzUR3sMR.js";
import { d as createLucideIcon, F as FlaskConical, b as FileText } from "./ProfileSetupModal-BYStubB_.js";
import { T as Truck } from "./truck-wv6q1hym.js";
import { B as Building2 } from "./building-2-CzOXe9xM.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M6 18h8", key: "1borvv" }],
  ["path", { d: "M3 22h18", key: "8prr45" }],
  ["path", { d: "M14 22a7 7 0 1 0 0-14h-1", key: "1jwaiy" }],
  ["path", { d: "M9 14h2", key: "197e7h" }],
  ["path", { d: "M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z", key: "1bmzmy" }],
  ["path", { d: "M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3", key: "1drr47" }]
];
const Microscope = createLucideIcon("microscope", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m16 16 2 2 4-4", key: "gfu2re" }],
  [
    "path",
    {
      d: "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",
      key: "e7tb2h"
    }
  ],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }],
  ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
  ["line", { x1: "12", x2: "12", y1: "22", y2: "12", key: "a4e8g8" }]
];
const PackageCheck = createLucideIcon("package-check", __iconNode);
const STAGES = [
  {
    status: "SAMPLE_COLLECTED",
    label: "Sample Collected",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { className: "h-4 w-4" })
  },
  {
    status: "DISPATCHED",
    label: "Dispatched",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "h-4 w-4" })
  },
  {
    status: "RECEIVED_AT_LAB",
    label: "Received at Lab",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-4 w-4" })
  },
  {
    status: "PROCESSING",
    label: "Processing",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Microscope, { className: "h-4 w-4" })
  },
  {
    status: "REPORT_READY",
    label: "Report Ready",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4" })
  },
  {
    status: "REPORT_DELIVERED",
    label: "Report Delivered",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(PackageCheck, { className: "h-4 w-4" })
  }
];
const STATUS_ORDER = [
  "SAMPLE_COLLECTED",
  "DISPATCHED",
  "RECEIVED_AT_LAB",
  "PROCESSING",
  "REPORT_READY",
  "REPORT_DELIVERED"
];
function getStageIndex(status) {
  return STATUS_ORDER.indexOf(status);
}
function SampleWorkflowTimeline({
  currentStatus
}) {
  const currentIndex = getStageIndex(currentStatus);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-0", children: STAGES.map((stage, idx) => {
    const isCompleted = idx < currentIndex;
    const isCurrent = idx === currentIndex;
    const isDelivered = currentStatus === "REPORT_DELIVERED";
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: [
              "flex items-center justify-center rounded-full transition-all duration-300",
              isCurrent ? `w-9 h-9 border-[2.5px] shadow-sm ${isDelivered ? "border-emerald-500 bg-emerald-50 text-emerald-600" : "border-primary bg-primary/10 text-primary"} scale-110` : isCompleted ? "w-8 h-8 bg-emerald-500 text-white" : "w-8 h-8 bg-muted text-muted-foreground opacity-65"
            ].join(" "),
            children: isCompleted ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }) : stage.icon
          }
        ),
        idx < STAGES.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: [
              "w-0.5 h-6 mt-0.5 transition-colors duration-300",
              isCompleted ? "bg-emerald-400" : "bg-border"
            ].join(" ")
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: [
            "pt-1.5 pb-5 text-sm transition-all duration-300",
            isCurrent ? `font-semibold ${isDelivered ? "text-emerald-700" : "text-primary"}` : isCompleted ? "font-medium text-emerald-700" : "text-muted-foreground opacity-65"
          ].join(" "),
          children: stage.label
        }
      )
    ] }, stage.status);
  }) });
}
function getSampleStatusColor(status) {
  switch (status) {
    case "SAMPLE_COLLECTED":
      return "bg-gray-100 text-gray-700 border-gray-200";
    case "DISPATCHED":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "RECEIVED_AT_LAB":
      return "bg-purple-100 text-purple-700 border-purple-200";
    case "PROCESSING":
      return "bg-orange-100 text-orange-700 border-orange-200";
    case "REPORT_READY":
      return "bg-green-100 text-green-700 border-green-200";
    case "REPORT_DELIVERED":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
}
export {
  SampleWorkflowTimeline as S,
  getSampleStatusColor as g
};
