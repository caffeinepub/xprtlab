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
import PageHeroHeader from "../../components/shared/PageHeroHeader";
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

function getStatusColor(status: DemoHomeCollection["status"]): string {
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

  // Auto-refresh every 30 seconds in demo mode
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

  // Summary counts
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
    <div className="min-h-screen bg-gray-50 pb-[90px]">
      <div className="px-4 pt-4">
        <PageHeroHeader
          title="Home Visits"
          description="Manage home collection visits and patient appointments"
        />
      </div>
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 pt-4 pb-3">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-xl font-bold text-gray-900">Home Visits</h1>
          <button
            type="button"
            onClick={handleRefresh}
            className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
        </div>
        <p className="text-xs text-gray-400">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </p>
      </div>

      {/* Today's Overview */}
      <div className="px-4 pt-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Today's Overview
          </p>
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: "Assigned", count: assigned, color: "text-gray-600" },
              { label: "En Route", count: enRoute, color: "text-blue-600" },
              { label: "Collected", count: collected, color: "text-teal-600" },
              { label: "Done", count: completed, color: "text-green-600" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <p className={`text-2xl font-bold ${item.color}`}>
                  {item.count}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Collection Cards */}
      <div className="px-4 space-y-3">
        {collections.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
            <MapPin className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No home visits today</p>
            <p className="text-gray-400 text-sm mt-1">
              New assignments will appear here automatically.
            </p>
          </div>
        ) : (
          collections.map((collection) => {
            // formatPremiumTimeDisplay returns { line1, line2 }
            const timeDisplay = formatPremiumTimeDisplay(collection.timestamp);
            const nextAction = getNextActionLabel(collection.status);
            const isUpdating = updatingId === collection.id;

            return (
              <div
                key={collection.id}
                className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-4 transition-all duration-300 ${
                  collection.status === "COMPLETED" ? "opacity-70" : ""
                }`}
              >
                {/* Status badge + time */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getStatusColor(
                      collection.status,
                    )}`}
                  >
                    {getStatusLabel(collection.status)}
                  </span>
                  <div className="text-right">
                    <p className="text-xs font-medium text-gray-700">
                      {timeDisplay.line1}
                    </p>
                    <p className="text-xs text-gray-400">{timeDisplay.line2}</p>
                  </div>
                </div>

                {/* Patient info */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm">
                      {collection.patientName}
                    </p>
                    <p className="text-xs text-gray-500">{collection.phone}</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-2 mb-2">
                  <MapPin className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {collection.address}
                  </p>
                </div>

                {/* Slot + Distance */}
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-xs text-gray-500">
                      {collection.slot}
                    </span>
                  </div>
                  {collection.distance !== undefined && (
                    <div className="flex items-center gap-1.5">
                      <Navigation className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-xs text-gray-500">
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
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                    >
                      {t.testCode}
                    </span>
                  ))}
                </div>

                {/* Action buttons */}
                {collection.status !== "COMPLETED" && (
                  <div className="flex gap-2 mt-1">
                    {/* Navigate button */}
                    {(collection.status === "ASSIGNED" ||
                      collection.status === "EN_ROUTE") &&
                      collection.lat &&
                      collection.lng && (
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${collection.lat},${collection.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs bg-blue-50 text-blue-700 px-3 py-2 rounded-xl font-medium"
                        >
                          <Navigation className="w-3.5 h-3.5" />
                          Navigate
                        </a>
                      )}

                    {/* Call button */}
                    <a
                      href={`tel:${collection.phone}`}
                      className="flex items-center gap-1.5 text-xs bg-green-50 text-green-700 px-3 py-2 rounded-xl font-medium"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      Call
                    </a>

                    {/* Status transition button */}
                    {nextAction && (
                      <button
                        type="button"
                        onClick={() => handleStatusTransition(collection)}
                        disabled={isUpdating}
                        className="flex-1 flex items-center justify-center gap-1.5 text-xs bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-3 py-2 rounded-xl font-medium disabled:opacity-60"
                      >
                        {isUpdating ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <CheckCircle className="w-3.5 h-3.5" />
                        )}
                        {isUpdating ? "Updating..." : nextAction}
                      </button>
                    )}
                  </div>
                )}

                {collection.status === "COMPLETED" && (
                  <div className="flex items-center gap-1.5 text-xs text-green-600 font-medium mt-1">
                    <CheckCircle className="w-3.5 h-3.5" />
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
