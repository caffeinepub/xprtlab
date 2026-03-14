import { r as reactExports, j as jsxRuntimeExports } from "./index-77iKE7z5.js";
import { b as getDemoHomeCollections, u as updateDemoHomeCollectionStatus } from "./demoData-wn8GRowF.js";
import { a as formatPremiumTimeDisplay } from "./formatters-DgcbtmQq.js";
import { R as RefreshCw } from "./refresh-cw-DhGnwtx0.js";
import { M as MapPin } from "./map-pin-BZNwjx3t.js";
import { U as User, P as Phone } from "./user-EeFrjssy.js";
import { C as Clock } from "./clock-BEcvoIYA.js";
import { N as Navigation } from "./navigation-DSXQqF3D.js";
import { L as LoaderCircle } from "./ProfileSetupModal-BB_monh5.js";
import { C as CircleCheckBig } from "./circle-check-big-DbLdUdcS.js";
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
function getStatusStyle(status) {
  switch (status) {
    case "ASSIGNED":
      return { background: "#F3F4F6", color: "#6B7280" };
    case "EN_ROUTE":
      return { background: "#EFF6FF", color: "#3B82F6" };
    case "SAMPLE_COLLECTED":
      return { background: "#F0FDFA", color: "#0D9488" };
    case "COMPLETED":
      return { background: "#F0FDF4", color: "#16A34A" };
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen pb-[90px]", style: { background: "#F7F9FC" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          style: {
            background: "linear-gradient(135deg, #0D47A1, #26A69A)",
            borderRadius: "16px",
            padding: "20px",
            marginBottom: "16px"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
                      "h2",
                      {
                        style: {
                          fontSize: "20px",
                          fontWeight: 700,
                          margin: 0,
                          color: "white"
                        },
                        children: "Home Visits"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        style: {
                          fontSize: "13px",
                          color: "rgba(255,255,255,0.8)",
                          margin: "4px 0 0"
                        },
                        children: "Today's home collection queue"
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
                      "data-ocid": "home_collection.button",
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
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "p",
              {
                style: {
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.6)",
                  margin: "8px 0 0"
                },
                children: [
                  "Last updated: ",
                  lastUpdated.toLocaleTimeString()
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
                children: "Today's Overview"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-2", children: [
              { label: "Assigned", count: assigned, color: "#6B7280" },
              { label: "En Route", count: enRoute, color: "#3B82F6" },
              { label: "Collected", count: collected, color: "#0D9488" },
              { label: "Done", count: completed, color: "#16A34A" }
            ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  style: {
                    fontSize: "24px",
                    fontWeight: 700,
                    color: item.color
                  },
                  children: item.count
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  style: {
                    fontSize: "11px",
                    color: "#9CA3AF",
                    marginTop: "2px"
                  },
                  children: item.label
                }
              )
            ] }, item.label)) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 space-y-3", children: collections.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: {
          background: "#FFFFFF",
          borderRadius: "16px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          padding: "32px",
          textAlign: "center"
        },
        "data-ocid": "home_collection.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MapPin,
            {
              style: {
                width: "40px",
                height: "40px",
                color: "#D1D5DB",
                margin: "0 auto 12px"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#6B7280", fontWeight: 500 }, children: "No home visits today" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#9CA3AF", fontSize: "14px", marginTop: "4px" }, children: "New assignments will appear here automatically." })
        ]
      }
    ) : collections.map((collection, idx) => {
      const timeDisplay = formatPremiumTimeDisplay(collection.timestamp);
      const nextAction = getNextActionLabel(collection.status);
      const isUpdating = updatingId === collection.id;
      const statusStyle = getStatusStyle(collection.status);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": `home_collection.item.${idx + 1}`,
          style: {
            background: "#FFFFFF",
            borderRadius: "16px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            padding: "16px",
            transition: "all 200ms ease",
            opacity: collection.status === "COMPLETED" ? 0.75 : 1
          },
          onMouseEnter: (e) => {
            e.currentTarget.style.boxShadow = "0 12px 32px rgba(13,71,161,0.12)";
            e.currentTarget.style.transform = "translateY(-2px)";
          },
          onMouseLeave: (e) => {
            e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";
            e.currentTarget.style.transform = "";
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
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
                  children: getStatusLabel(collection.status)
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    style: {
                      fontSize: "12px",
                      fontWeight: 500,
                      color: "#374151"
                    },
                    children: timeDisplay.line1
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: "11px", color: "#9CA3AF" }, children: timeDisplay.line2 })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "#EFF6FF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    User,
                    {
                      style: {
                        width: "16px",
                        height: "16px",
                        color: "#3B82F6"
                      }
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    style: {
                      fontWeight: 700,
                      color: "#111827",
                      fontSize: "15px"
                    },
                    children: collection.patientName
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: "12px", color: "#6B7280" }, children: collection.phone })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                MapPin,
                {
                  style: {
                    width: "14px",
                    height: "14px",
                    color: "#9CA3AF",
                    marginTop: "2px",
                    flexShrink: 0
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  style: {
                    fontSize: "12px",
                    color: "#4B5563",
                    lineHeight: 1.5
                  },
                  children: collection.address
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Clock,
                  {
                    style: {
                      width: "14px",
                      height: "14px",
                      color: "#9CA3AF"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "12px", color: "#6B7280" }, children: collection.slot })
              ] }),
              collection.distance !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Navigation,
                  {
                    style: {
                      width: "14px",
                      height: "14px",
                      color: "#9CA3AF"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontSize: "12px", color: "#6B7280" }, children: [
                  collection.distance,
                  " km away"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 mb-3", children: collection.tests.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
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
            collection.status !== "COMPLETED" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-1", children: [
              (collection.status === "ASSIGNED" || collection.status === "EN_ROUTE") && collection.lat && collection.lng && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: `https://www.google.com/maps/dir/?api=1&destination=${collection.lat},${collection.lng}`,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "12px",
                    background: "white",
                    color: "#0D47A1",
                    border: "1.5px solid #0D47A1",
                    padding: "6px 12px",
                    borderRadius: "10px",
                    fontWeight: 600,
                    textDecoration: "none"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Navigation,
                      {
                        style: { width: "13px", height: "13px" }
                      }
                    ),
                    "Navigate"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: `tel:${collection.phone}`,
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "12px",
                    background: "white",
                    color: "#16A34A",
                    border: "1.5px solid #16A34A",
                    padding: "6px 12px",
                    borderRadius: "10px",
                    fontWeight: 600,
                    textDecoration: "none"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { style: { width: "13px", height: "13px" } }),
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
                  style: {
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    fontSize: "12px",
                    background: "linear-gradient(135deg, #0D47A1, #26A69A)",
                    color: "white",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "10px",
                    fontWeight: 600,
                    cursor: isUpdating ? "not-allowed" : "pointer",
                    opacity: isUpdating ? 0.6 : 1,
                    transition: "all 200ms ease"
                  },
                  "data-ocid": `home_collection.primary_button.${idx + 1}`,
                  children: [
                    isUpdating ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      LoaderCircle,
                      {
                        style: { width: "13px", height: "13px" },
                        className: "animate-spin"
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                      CircleCheckBig,
                      {
                        style: { width: "13px", height: "13px" }
                      }
                    ),
                    isUpdating ? "Updating..." : nextAction
                  ]
                }
              )
            ] }),
            collection.status === "COMPLETED" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "12px",
                  color: "#16A34A",
                  fontWeight: 500,
                  marginTop: "4px"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { style: { width: "14px", height: "14px" } }),
                  "Visit completed"
                ]
              }
            )
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
