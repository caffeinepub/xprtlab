import { j as jsxRuntimeExports } from "./index-lVn_hGWr.js";
import { M as MedicalCard } from "./MedicalCard-CxuFN6PU.js";
import { A as Activity } from "./activity-DEUxtl3x.js";
import { H as Heart } from "./heart-B-7x8O1e.js";
import { d as createLucideIcon } from "./ProfileSetupModal-BYStubB_.js";
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
      d: "M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z",
      key: "1ptgy4"
    }
  ],
  [
    "path",
    {
      d: "M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97",
      key: "1sl1rz"
    }
  ]
];
const Droplets = createLucideIcon("droplets", __iconNode);
function MyVitalsPage({ onNavigate }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => onNavigate("home"),
          className: "text-muted-foreground hover:text-foreground",
          children: "←"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-bold text-foreground", children: "My Vitals" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-12 h-12 mx-auto mb-3 opacity-30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "No vitals recorded yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", children: "Your health vitals will appear here once recorded by a phlebotomist" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(MedicalCard, { className: "p-4 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-6 h-6 text-destructive mx-auto mb-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Blood Pressure" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-foreground mt-1", children: "— / —" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "mmHg" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(MedicalCard, { className: "p-4 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Droplets, { className: "w-6 h-6 text-accent mx-auto mb-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Blood Glucose" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-foreground mt-1", children: "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "mg/dL" })
      ] })
    ] })
  ] });
}
export {
  MyVitalsPage as default
};
