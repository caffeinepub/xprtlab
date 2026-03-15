import {
  CheckCircle,
  Clock,
  Loader2,
  MapPin,
  Navigation,
  Phone,
  RefreshCw,
  User,
} from "lucide-react";
import React, { useState, useEffect, useCallback } from "react";
import {
  type DemoHomeCollection,
  getDemoHomeCollections,
  updateDemoHomeCollectionStatus,
} from "../../utils/demoStorage";
import { formatPremiumTimeDisplay } from "../../utils/formatters";

interface HomeCollectionQueuePageProps {
  isDemoMode?: boolean;
  role?: string;
  onNavigate?: (path: string) => void;
}

const STATUS_ORDER: DemoHomeCollection["status"][] = [
  "ASSIGNED",
  "EN_ROUTE",
  "SAMPLE_COLLECTED",
  "COMPLETED",
];

function getNextStatus(
  current: DemoHomeCollection["status"],
): DemoHomeCollection["status"] | null {
  const idx = STATUS_ORDER.indexOf(current);
  if (idx === -1 || idx === STATUS_ORDER.length - 1) return null;
  return STATUS_ORDER[idx + 1];
}

function getStatusLabel(status: DemoHomeCollection["status"]): string {
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

function getStatusStyle(status: DemoHomeCollection["status"]): {
  background: string;
  color: string;
} {
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

function getNextActionLabel(
  status: DemoHomeCollection["status"],
): string | null {
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

export default function HomeCollectionQueuePage({
  isDemoMode = false,
  onNavigate: _onNavigate,
}: HomeCollectionQueuePageProps) {
  const [collections, setCollections] = useState<DemoHomeCollection[]>([]);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadCollections = useCallback(() => {
    if (isDemoMode) {
      const data = getDemoHomeCollections();
      setCollections(data);
      setLastUpdated(new Date());
    }
  }, [isDemoMode]);

  useEffect(() => {
    loadCollections();
  }, [loadCollections]);

  useEffect(() => {
    if (!isDemoMode) return;
    const interval = setInterval(loadCollections, 30_000);
    return () => clearInterval(interval);
  }, [isDemoMode, loadCollections]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    loadCollections();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const handleStatusTransition = async (collection: DemoHomeCollection) => {
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
    (c) => c.status === "SAMPLE_COLLECTED",
  ).length;
  const completed = collections.filter((c) => c.status === "COMPLETED").length;

  if (!isDemoMode) {
    return (
      <div className="p-4">
        <p className="text-muted-foreground text-sm">
          Live home collection queue — connect to backend.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-[90px]" style={{ background: "#F7F9FC" }}>
      <div className="px-4 pt-4">
        {/* Gradient Header Card */}
        <div
          style={{
            background: "linear-gradient(135deg, #2563EB, #06B6D4)",
            borderRadius: "16px",
            padding: "20px",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  margin: 0,
                  color: "white",
                }}
              >
                Home Visits
              </h2>
              <p
                style={{
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.8)",
                  margin: "4px 0 0",
                }}
              >
                Today's home collection queue
              </p>
            </div>
            <button
              type="button"
              onClick={handleRefresh}
              style={{
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
                fontWeight: 600,
              }}
              data-ocid="home_collection.button"
            >
              <RefreshCw
                style={{ width: "15px", height: "15px" }}
                className={isRefreshing ? "animate-spin" : ""}
              />
              Refresh
            </button>
          </div>
          <p
            style={{
              fontSize: "12px",
              color: "rgba(255,255,255,0.6)",
              margin: "8px 0 0",
            }}
          >
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>

        {/* Today's Overview */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "16px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            padding: "16px",
            marginBottom: "16px",
          }}
        >
          <p
            style={{
              fontSize: "11px",
              fontWeight: 600,
              color: "#9CA3AF",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: "12px",
            }}
          >
            Today's Overview
          </p>
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: "Assigned", count: assigned, color: "#6B7280" },
              { label: "En Route", count: enRoute, color: "#3B82F6" },
              { label: "Collected", count: collected, color: "#0D9488" },
              { label: "Done", count: completed, color: "#16A34A" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <p
                  style={{
                    fontSize: "24px",
                    fontWeight: 700,
                    color: item.color,
                  }}
                >
                  {item.count}
                </p>
                <p
                  style={{
                    fontSize: "11px",
                    color: "#9CA3AF",
                    marginTop: "2px",
                  }}
                >
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Collection Cards */}
      <div className="px-4 space-y-3">
        {collections.length === 0 ? (
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "16px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
              padding: "32px",
              textAlign: "center",
            }}
            data-ocid="home_collection.empty_state"
          >
            <MapPin
              style={{
                width: "40px",
                height: "40px",
                color: "#D1D5DB",
                margin: "0 auto 12px",
              }}
            />
            <p style={{ color: "#6B7280", fontWeight: 500 }}>
              No home visits today
            </p>
            <p style={{ color: "#9CA3AF", fontSize: "14px", marginTop: "4px" }}>
              New assignments will appear here automatically.
            </p>
          </div>
        ) : (
          collections.map((collection, idx) => {
            const timeDisplay = formatPremiumTimeDisplay(collection.timestamp);
            const nextAction = getNextActionLabel(collection.status);
            const isUpdating = updatingId === collection.id;
            const statusStyle = getStatusStyle(collection.status);

            return (
              <div
                key={collection.id}
                data-ocid={`home_collection.item.${idx + 1}`}
                style={{
                  background: "#FFFFFF",
                  borderRadius: "16px",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                  padding: "16px",
                  transition: "all 200ms ease",
                  opacity: collection.status === "COMPLETED" ? 0.75 : 1,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 12px 32px rgba(13,71,161,0.12)";
                  (e.currentTarget as HTMLDivElement).style.transform =
                    "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 8px 24px rgba(0,0,0,0.08)";
                  (e.currentTarget as HTMLDivElement).style.transform = "";
                }}
              >
                {/* Status badge + time */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    style={{
                      ...statusStyle,
                      fontSize: "11px",
                      fontWeight: 600,
                      padding: "4px 10px",
                      borderRadius: "999px",
                    }}
                  >
                    {getStatusLabel(collection.status)}
                  </span>
                  <div className="text-right">
                    <p
                      style={{
                        fontSize: "12px",
                        fontWeight: 500,
                        color: "#374151",
                      }}
                    >
                      {timeDisplay.line1}
                    </p>
                    <p style={{ fontSize: "11px", color: "#9CA3AF" }}>
                      {timeDisplay.line2}
                    </p>
                  </div>
                </div>

                {/* Patient info */}
                <div className="flex items-start gap-3 mb-3">
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "#EFF6FF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <User
                      style={{
                        width: "16px",
                        height: "16px",
                        color: "#3B82F6",
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      style={{
                        fontWeight: 700,
                        color: "#111827",
                        fontSize: "15px",
                      }}
                    >
                      {collection.patientName}
                    </p>
                    <p style={{ fontSize: "12px", color: "#6B7280" }}>
                      {collection.phone}
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-2 mb-2">
                  <MapPin
                    style={{
                      width: "14px",
                      height: "14px",
                      color: "#9CA3AF",
                      marginTop: "2px",
                      flexShrink: 0,
                    }}
                  />
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#4B5563",
                      lineHeight: 1.5,
                    }}
                  >
                    {collection.address}
                  </p>
                </div>

                {/* Slot + Distance */}
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1.5">
                    <Clock
                      style={{
                        width: "14px",
                        height: "14px",
                        color: "#9CA3AF",
                      }}
                    />
                    <span style={{ fontSize: "12px", color: "#6B7280" }}>
                      {collection.slot}
                    </span>
                  </div>
                  {collection.distance !== undefined && (
                    <div className="flex items-center gap-1.5">
                      <Navigation
                        style={{
                          width: "14px",
                          height: "14px",
                          color: "#9CA3AF",
                        }}
                      />
                      <span style={{ fontSize: "12px", color: "#6B7280" }}>
                        {collection.distance} km away
                      </span>
                    </div>
                  )}
                </div>

                {/* Tests */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {collection.tests.map((t) => (
                    <span
                      key={t.testId}
                      style={{
                        fontSize: "11px",
                        background: "#F3F4F6",
                        color: "#4B5563",
                        padding: "2px 8px",
                        borderRadius: "999px",
                      }}
                    >
                      {t.testCode}
                    </span>
                  ))}
                </div>

                {/* Action buttons */}
                {collection.status !== "COMPLETED" && (
                  <div className="flex gap-2 mt-1">
                    {/* Navigate button - outline style */}
                    {(collection.status === "ASSIGNED" ||
                      collection.status === "EN_ROUTE") &&
                      collection.lat &&
                      collection.lng && (
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${collection.lat},${collection.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            fontSize: "12px",
                            background: "white",
                            color: "#2563EB",
                            border: "1.5px solid #2563EB",
                            padding: "6px 12px",
                            borderRadius: "10px",
                            fontWeight: 600,
                            textDecoration: "none",
                          }}
                        >
                          <Navigation
                            style={{ width: "13px", height: "13px" }}
                          />
                          Navigate
                        </a>
                      )}

                    {/* Call button - outline style */}
                    <a
                      href={`tel:${collection.phone}`}
                      style={{
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
                        textDecoration: "none",
                      }}
                    >
                      <Phone style={{ width: "13px", height: "13px" }} />
                      Call
                    </a>

                    {/* Status transition - primary gradient */}
                    {nextAction && (
                      <button
                        type="button"
                        onClick={() => handleStatusTransition(collection)}
                        disabled={isUpdating}
                        style={{
                          flex: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "6px",
                          fontSize: "12px",
                          background:
                            "linear-gradient(135deg, #2563EB, #06B6D4)",
                          color: "white",
                          border: "none",
                          padding: "6px 12px",
                          borderRadius: "10px",
                          fontWeight: 600,
                          cursor: isUpdating ? "not-allowed" : "pointer",
                          opacity: isUpdating ? 0.6 : 1,
                          transition: "all 200ms ease",
                        }}
                        data-ocid={`home_collection.primary_button.${idx + 1}`}
                      >
                        {isUpdating ? (
                          <Loader2
                            style={{ width: "13px", height: "13px" }}
                            className="animate-spin"
                          />
                        ) : (
                          <CheckCircle
                            style={{ width: "13px", height: "13px" }}
                          />
                        )}
                        {isUpdating ? "Updating..." : nextAction}
                      </button>
                    )}
                  </div>
                )}

                {collection.status === "COMPLETED" && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "12px",
                      color: "#16A34A",
                      fontWeight: 500,
                      marginTop: "4px",
                    }}
                  >
                    <CheckCircle style={{ width: "14px", height: "14px" }} />
                    Visit completed
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
