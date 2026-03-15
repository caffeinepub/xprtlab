import { r as reactExports, j as jsxRuntimeExports } from "./index-BcSF07MB.js";
import { I as Input } from "./input-BiZ8Warn.js";
import { L as Label } from "./label-DzAGXiXR.js";
import { u as ue } from "./index-BPXqeWHC.js";
import { G as GradientButton } from "./GradientButton-tEwhP6kz.js";
import { M as MedicalCard } from "./MedicalCard-sow8Qu1z.js";
import { C as CircleCheckBig } from "./circle-check-big-CN4w7Yzd.js";
import { Q as QrCode } from "./qr-code-C0urOWJi.js";
import { d as createLucideIcon } from "./ProfileSetupModal-DZhF98LT.js";
import { T as Tag } from "./tag-CXTDw1C4.js";
import { C as Calendar } from "./calendar-CsQhAJiE.js";
import { M as MapPin } from "./map-pin-Ddp8nwPv.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
];
const Copy = createLucideIcon("copy", __iconNode);
function generateId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}
function CreateCampPage() {
  const [campName, setCampName] = reactExports.useState("");
  const [campDate, setCampDate] = reactExports.useState("");
  const [campLocation, setCampLocation] = reactExports.useState("");
  const [createdCamp, setCreatedCamp] = reactExports.useState(null);
  const [copied, setCopied] = reactExports.useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!campName.trim() || !campDate || !campLocation.trim()) return;
    const camp = {
      id: generateId(),
      name: campName.trim(),
      date: campDate,
      location: campLocation.trim()
    };
    const existing = JSON.parse(localStorage.getItem("xprtlab_camps") || "[]");
    localStorage.setItem("xprtlab_camps", JSON.stringify([...existing, camp]));
    setCreatedCamp(camp);
    ue.success("Camp created successfully!");
  };
  const handleCopyId = () => {
    if (createdCamp) {
      navigator.clipboard.writeText(createdCamp.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2e3);
      ue.success("Camp ID copied!");
    }
  };
  if (createdCamp) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-5 space-y-5 animate-fade-in", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-7 h-7 text-white" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-foreground", children: "Camp Created!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: createdCamp.name })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(MedicalCard, { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground mb-3", children: "QR Code for Check-in" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-48 h-48 mx-auto bg-white border-2 border-border rounded-xl flex items-center justify-center mb-3 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "w-16 h-16 text-brand-blue mx-auto mb-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-mono text-muted-foreground break-all", children: [
            createdCamp.id.slice(0, 16),
            "..."
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-3", children: "Share this QR code with phlebotomists for camp check-in" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: handleCopyId,
            className: "flex items-center gap-2 mx-auto text-xs font-semibold text-brand-blue hover:opacity-80 transition-opacity",
            children: [
              copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-4 h-4" }),
              copied ? "Copied!" : "Copy Camp ID"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(MedicalCard, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold text-foreground mb-3", children: "Camp Details" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-4 h-4 text-brand-blue" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Name:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: createdCamp.name })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4 text-brand-blue" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Date:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: createdCamp.date })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-brand-blue" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Location:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: createdCamp.location })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        GradientButton,
        {
          onClick: () => {
            setCreatedCamp(null);
            setCampName("");
            setCampDate("");
            setCampLocation("");
          },
          className: "w-full",
          children: "Create Another Camp"
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-5 space-y-5 animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-foreground", children: "Create Camp" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Set up a society health camp event" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MedicalCard, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-medium", children: "Camp Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "e.g. Sector 12 Health Camp",
                value: campName,
                onChange: (e) => setCampName(e.target.value),
                required: true,
                className: "pl-9 rounded-xl"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-medium", children: "Camp Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "date",
                value: campDate,
                onChange: (e) => setCampDate(e.target.value),
                required: true,
                min: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
                className: "pl-9 rounded-xl"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-medium", children: "Location" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "e.g. Community Hall, Sector 12, Noida",
                value: campLocation,
                onChange: (e) => setCampLocation(e.target.value),
                required: true,
                className: "pl-9 rounded-xl"
              }
            )
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        GradientButton,
        {
          type: "submit",
          disabled: !campName.trim() || !campDate || !campLocation.trim(),
          className: "w-full",
          size: "lg",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "w-4 h-4" }),
            "Create Camp & Generate QR"
          ]
        }
      )
    ] })
  ] });
}
export {
  CreateCampPage as default
};
