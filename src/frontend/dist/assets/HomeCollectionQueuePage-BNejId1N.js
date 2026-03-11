import { r as reactExports, j as jsxRuntimeExports } from "./index-D697BR3C.js";
import { b as getDemoHomeCollections, u as updateDemoHomeCollectionStatus } from "./demoData-CZHON6-0.js";
import { a as formatPremiumTimeDisplay } from "./formatters-DgcbtmQq.js";
import { R as RefreshCw } from "./refresh-cw-BP1p1zTT.js";
import { M as MapPin } from "./map-pin-DEb5FcpZ.js";
import { U as User, P as Phone } from "./user-C7D6O3S1.js";
import { C as Clock } from "./clock-BGIpFsM8.js";
import { N as Navigation } from "./navigation-dX9Jh2TN.js";
import { L as LoaderCircle } from "./ProfileSetupModal-DNPvAtBR.js";
import { C as CircleCheckBig } from "./circle-check-big-CAXkezlx.js";
const STATUS_ORDER = [
  "ASSIGNED",
  "EN_ROUTE",
  "SAMPLE_COLLECTED",
  "COMPLETED"
];
function getNextStatus(current) {
  const idx = STATUS_ORDER.indexOf(current);
  if (idx === -1 || idx === STATUS_ORDER.length - 1) return null;
  return STATUS_ORDER[idx + 1];
}
function getStatusLabel(status) {
  switch (status) {
    case "ASSIGNED":
      return "Assigned";
    case "EN_ROUTE":
      return "En Route";
    case "SAMPLE_COLLECTED":
      return "Sample Collected";
    case "COMPLETED":
      return "Completed";
  }
}
function getStatusColor(status) {
  switch (status) {
    case "ASSIGNED":
      return "bg-gray-100 text-gray-700";
    case "EN_ROUTE":
      return "bg-blue-100 text-blue-700";
    case "SAMPLE_COLLECTED":
      return "bg-teal-100 text-teal-700";
    case "COMPLETED":
      return "bg-green-100 text-green-700";
  }
}
function getNextActionLabel(status) {
  switch (status) {
    case "ASSIGNED":
      return "Start Journey";
    case "EN_ROUTE":
      return "Mark Collected";
    case "SAMPLE_COLLECTED":
      return "Mark Completed";
    case "COMPLETED":
      return null;
  }
}
function HomeCollectionQueuePage({
  isDemoMode = false,
  onNavigate: _onNavigate
}) {
  const [collections, setCollections] = reactExports.useState([]);
  const [updatingId, setUpdatingId] = reactExports.useState(null);
  const [lastUpdated, setLastUpdated] = reactExports.useState(/* @__PURE__ */ new Date());
  const [isRefreshing, setIsRefreshing] = reactExports.useState(false);
  const loadCollections = reactExports.useCallback(() => {
    if (isDemoMode) {
      const data = getDemoHomeCollections();
      setCollections(data);
      setLastUpdated(/* @__PURE__ */ new Date());
    }
  }, [isDemoMode]);
  reactExports.useEffect(() => {
    loadCollections();
  }, [loadCollections]);
  reactExports.useEffect(() => {
    if (!isDemoMode) return;
    const interval = setInterval(loadCollections, 3e4);
    return () => clearInterval(interval);
  }, [isDemoMode, loadCollections]);
  const handleRefresh = async () => {
    setIsRefreshing(true);
    loadCollections();
    setTimeout(() => setIsRefreshing(false), 600);
  };
  const handleStatusTransition = async (collection) => {
    const next = getNextStatus(collection.status);
    if (!next || !isDemoMode) return;
    setUpdatingId(collection.id);
    await new Promise((r) => setTimeout(r, 400));
    updateDemoHomeCollectionStatus(collection.id, next);
    loadCollections();
    setUpdatingId(null);
  };
  const assigned = collections.filter((c) => c.status === "ASSIGNED").length;
  const enRoute = collections.filter((c) => c.status === "EN_ROUTE").length;
  const collected = collections.filter(
    (c) => c.status === "SAMPLE_COLLECTED"
  ).length;
  const completed = collections.filter((c) => c.status === "COMPLETED").length;
  if (!isDemoMode) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Live home collection queue — connect to backend." }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gray-50 pb-[90px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border-b border-gray-100 px-4 pt-4 pb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-gray-900", children: "Home Visits" }),
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
        "Last updated: ",
        lastUpdated.toLocaleTimeString()
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3", children: "Today's Overview" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-2", children: [
        { label: "Assigned", count: assigned, color: "text-gray-600" },
        { label: "En Route", count: enRoute, color: "text-blue-600" },
        { label: "Collected", count: collected, color: "text-teal-600" },
        { label: "Done", count: completed, color: "text-green-600" }
      ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-2xl font-bold ${item.color}`, children: item.count }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 mt-0.5", children: item.label })
      ] }, item.label)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 space-y-3", children: collections.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-10 h-10 text-gray-300 mx-auto mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 font-medium", children: "No home visits today" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-sm mt-1", children: "New assignments will appear here automatically." })
    ] }) : collections.map((collection) => {
      const timeDisplay = formatPremiumTimeDisplay(collection.timestamp);
      const nextAction = getNextActionLabel(collection.status);
      const isUpdating = updatingId === collection.id;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `bg-white rounded-2xl shadow-sm border border-gray-100 p-4 transition-all duration-300 ${collection.status === "COMPLETED" ? "opacity-70" : ""}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-xs font-semibold px-2.5 py-1 rounded-full ${getStatusColor(
                    collection.status
                  )}`,
                  children: getStatusLabel(collection.status)
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-gray-700", children: timeDisplay.line1 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400", children: timeDisplay.line2 })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4 text-blue-600" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-gray-900 text-sm", children: collection.patientName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: collection.phone })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-600 leading-relaxed", children: collection.address })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5 text-gray-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-500", children: collection.slot })
              ] }),
              collection.distance !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { className: "w-3.5 h-3.5 text-gray-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-gray-500", children: [
                  collection.distance,
                  " km away"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 mb-3", children: collection.tests.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full",
                children: t.testCode
              },
              t.testId
            )) }),
            collection.status !== "COMPLETED" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-1", children: [
              (collection.status === "ASSIGNED" || collection.status === "EN_ROUTE") && collection.lat && collection.lng && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: `https://www.google.com/maps/dir/?api=1&destination=${collection.lat},${collection.lng}`,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "flex items-center gap-1.5 text-xs bg-blue-50 text-blue-700 px-3 py-2 rounded-xl font-medium",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { className: "w-3.5 h-3.5" }),
                    "Navigate"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: `tel:${collection.phone}`,
                  className: "flex items-center gap-1.5 text-xs bg-green-50 text-green-700 px-3 py-2 rounded-xl font-medium",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3.5 h-3.5" }),
                    "Call"
                  ]
                }
              ),
              nextAction && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => handleStatusTransition(collection),
                  disabled: isUpdating,
                  className: "flex-1 flex items-center justify-center gap-1.5 text-xs bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-3 py-2 rounded-xl font-medium disabled:opacity-60",
                  children: [
                    isUpdating ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3.5 h-3.5" }),
                    isUpdating ? "Updating..." : nextAction
                  ]
                }
              )
            ] }),
            collection.status === "COMPLETED" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-green-600 font-medium mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3.5 h-3.5" }),
              "Visit completed"
            ] })
          ]
        },
        collection.id
      );
    }) })
  ] });
}
export {
  HomeCollectionQueuePage as default
};
