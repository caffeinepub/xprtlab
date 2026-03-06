import {
  AlertCircle,
  CheckCircle,
  ClipboardList,
  Clock,
  MapPin,
  RefreshCw,
  TestTube,
} from "lucide-react";
import React, { useState, useEffect, useCallback } from "react";
import {
  type DemoHomeCollection,
  type DemoSample,
  getDemoHomeCollections,
  getDemoSamples,
} from "../../utils/demoStorage";

interface TaskQueuePageProps {
  isDemoMode?: boolean;
  role?: string;
  onNavigate?: (path: string) => void;
}

type TaskItem =
  | { kind: "homeCollection"; data: DemoHomeCollection }
  | { kind: "hospitalSample"; data: DemoSample };

function getTaskStatusColor(status: string): string {
  switch (status) {
    case "ASSIGNED":
      return "bg-gray-100 text-gray-700";
    case "EN_ROUTE":
      return "bg-blue-100 text-blue-700";
    case "SAMPLE_COLLECTED":
      return "bg-teal-100 text-teal-700";
    case "COMPLETED":
      return "bg-green-100 text-green-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
}

function getTaskStatusLabel(status: string): string {
  switch (status) {
    case "ASSIGNED":
      return "Assigned";
    case "EN_ROUTE":
      return "En Route";
    case "SAMPLE_COLLECTED":
      return "Collected";
    case "COMPLETED":
      return "Completed";
    default:
      return status;
  }
}

export default function TaskQueuePage({
  isDemoMode = false,
  onNavigate,
}: TaskQueuePageProps) {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadTasks = useCallback(() => {
    if (!isDemoMode) return;

    const homeCollections = getDemoHomeCollections();
    const pendingCollections = homeCollections.filter(
      (hc) => hc.status !== "COMPLETED",
    );

    const samples = getDemoSamples();
    const pendingSamples = samples.filter(
      (s) => s.status === "SAMPLE_COLLECTED" || s.status === "DISPATCHED",
    );

    const combined: TaskItem[] = [
      ...pendingCollections.map(
        (hc): TaskItem => ({ kind: "homeCollection", data: hc }),
      ),
      ...pendingSamples.map(
        (s): TaskItem => ({ kind: "hospitalSample", data: s }),
      ),
    ];

    // Sort by timestamp descending
    combined.sort((a, b) => {
      const tA =
        a.kind === "homeCollection" ? a.data.timestamp : a.data.createdAt;
      const tB =
        b.kind === "homeCollection" ? b.data.timestamp : b.data.createdAt;
      return tB - tA;
    });

    setTasks(combined);
    setLastUpdated(new Date());
  }, [isDemoMode]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    if (!isDemoMode) return;
    const interval = setInterval(loadTasks, 30_000);
    return () => clearInterval(interval);
  }, [isDemoMode, loadTasks]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    loadTasks();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  if (!isDemoMode) {
    // Live mode — use existing backend-connected implementation
    return (
      <div className="min-h-screen bg-gray-50 pb-24">
        <div className="bg-white border-b border-gray-100 px-4 pt-4 pb-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">Task Queue</h1>
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
          <p className="text-xs text-gray-400 mt-1">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>
        <div className="p-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
            <ClipboardList className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No tasks yet.</p>
            <p className="text-gray-400 text-sm mt-1">
              Stay available — new assignments will appear automatically.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const pendingCount = tasks.filter((t) => {
    if (t.kind === "homeCollection") return t.data.status === "ASSIGNED";
    return t.data.status === "SAMPLE_COLLECTED";
  }).length;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 pt-4 pb-3">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-gray-900">Task Queue</h1>
            {pendingCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {pendingCount}
              </span>
            )}
          </div>
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

      {/* Summary */}
      <div className="px-4 pt-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Active Tasks
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-medium text-blue-700">
                  Home Visits
                </span>
              </div>
              <p className="text-2xl font-bold text-blue-700">
                {tasks.filter((t) => t.kind === "homeCollection").length}
              </p>
            </div>
            <div className="bg-teal-50 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1">
                <TestTube className="w-4 h-4 text-teal-600" />
                <span className="text-xs font-medium text-teal-700">
                  Hospital Samples
                </span>
              </div>
              <p className="text-2xl font-bold text-teal-700">
                {tasks.filter((t) => t.kind === "hospitalSample").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Task list */}
      <div className="px-4 space-y-3">
        {tasks.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
            <ClipboardList className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No tasks yet.</p>
            <p className="text-gray-400 text-sm mt-1">
              Stay available — new assignments will appear automatically.
            </p>
          </div>
        ) : (
          tasks.map((task) => {
            if (task.kind === "homeCollection") {
              const hc = task.data;
              return (
                <div
                  key={`hc-${hc.id}`}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                          Home Visit
                        </p>
                        <p className="font-semibold text-gray-900 text-sm">
                          {hc.patientName}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getTaskStatusColor(
                        hc.status,
                      )}`}
                    >
                      {getTaskStatusLabel(hc.status)}
                    </span>
                  </div>
                  <div className="flex items-start gap-1.5 mb-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {hc.address}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-xs text-gray-500">{hc.slot}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {hc.tests.map((t) => (
                        <span
                          key={t.testId}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                        >
                          {t.testCode}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate?.("home-collection")}
                    className="mt-3 w-full text-xs text-blue-600 font-medium bg-blue-50 py-2 rounded-xl"
                  >
                    View Details →
                  </button>
                </div>
              );
            }

            // hospitalSample
            const s = task.data;
            return (
              <div
                key={`s-${s.id}`}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center">
                      <TestTube className="w-4 h-4 text-teal-600" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-teal-600 uppercase tracking-wide">
                        Hospital Sample
                      </p>
                      <p className="font-semibold text-gray-900 text-sm">
                        {s.patientName}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-teal-100 text-teal-700">
                    {s.status === "SAMPLE_COLLECTED"
                      ? "Collected"
                      : "Dispatched"}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs text-gray-500">
                    {s.paymentMode} · ₹{s.finalAmount}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {s.tests.map((t) => (
                    <span
                      key={t.testId}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                    >
                      {t.testCode}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate?.("my-samples")}
                  className="w-full text-xs text-teal-600 font-medium bg-teal-50 py-2 rounded-xl"
                >
                  View Sample →
                </button>
              </div>
            );
          })
        )}
      </div>

      {tasks.length > 0 && (
        <div className="px-4 mt-4">
          <div className="flex items-center gap-2 text-xs text-green-600 bg-green-50 rounded-xl p-3">
            <CheckCircle className="w-4 h-4" />
            <span>
              You have {tasks.length} active task{tasks.length !== 1 ? "s" : ""}{" "}
              today
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
