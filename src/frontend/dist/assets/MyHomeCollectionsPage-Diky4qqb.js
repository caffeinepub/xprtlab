import { j as jsxRuntimeExports } from "./index-vGeq55gD.js";
import { M as MedicalCard } from "./MedicalCard-CnWiIuj2.js";
import { S as StatusBadge } from "./StatusBadge-pAfNALge.js";
import { h as useGetMyHomeCollectionRequests, a as House } from "./ProfileSetupModal-DOcw6VTl.js";
import { M as MapPin } from "./map-pin-d1n1VtEa.js";
import { C as Clock } from "./clock-D_f6oRgJ.js";
function MyHomeCollectionsPage({
  onNavigate
}) {
  const { data: requests = [], isLoading } = useGetMyHomeCollectionRequests();
  const sorted = [...requests].sort(
    (a, b) => Number(b.timestamp) - Number(a.timestamp)
  );
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
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-bold text-foreground", children: "Home Collections" })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary" }) }) : sorted.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "w-12 h-12 mx-auto mb-3 opacity-30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "No home collection requests" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", children: "Request a home collection to get started" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => onNavigate("home-collection"),
          className: "mt-4 text-primary text-sm font-medium underline",
          children: "Request Collection"
        }
      )
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: sorted.map((req) => /* @__PURE__ */ jsxRuntimeExports.jsxs(MedicalCard, { className: "p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-muted-foreground", children: [
          "#",
          req.id.slice(-8)
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: req.status })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-1 text-xs text-muted-foreground mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3 mt-0.5 flex-shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-clamp-2", children: req.address })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1 mb-2", children: req.tests.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full",
          children: t.name
        },
        t.id
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: req.slot })
      ] })
    ] }, req.id)) })
  ] });
}
export {
  MyHomeCollectionsPage as default
};
