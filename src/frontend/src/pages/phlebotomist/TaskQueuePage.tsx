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
import HealthcareBg from "../../components/shared/HealthcareBg";
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

function getTaskStatusColor(status: string): { bg: string; text: string } {
  switch (status) {
    case "ASSIGNED":
      return { bg: "#F3F4F6", text: "#374151" };
    case "EN_ROUTE":
      return { bg: "#EFF6FF", text: "#1D4ED8" };
    case "SAMPLE_COLLECTED":
      return { bg: "#F0FDFA", text: "#0F766E" };
    case "COMPLETED":
      return { bg: "#F0FDF4", text: "#15803D" };
    default:
      return { bg: "#F3F4F6", text: "#6B7280" };
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
    return (
      <div
        className="relative min-h-screen pb-[90px] page-fade-in"
        style={{ background: "#F7F9FC" }}
      >
        <HealthcareBg variant="minimal" opacity={0.04} />
        <div className="relative z-10">
          {/* Header */}
          <div
            className="px-4 pt-5 pb-4"
            style={{
              background: "linear-gradient(135deg, #0D47A1, #26A69A)",
              boxShadow: "0 4px 16px rgba(13,71,161,0.2)",
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-white">Task Queue</h1>
                <p className="text-xs text-white/70 mt-0.5">
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </p>
              </div>
              <button
                type="button"
                onClick={handleRefresh}
                className="flex items-center gap-1.5 text-xs text-white/80 bg-white/20 px-3 py-1.5 rounded-full hover:bg-white/30 transition-colors"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`}
                />
                Refresh
              </button>
            </div>
          </div>
          <div className="p-4">
            <div
              className="bg-white rounded-2xl p-8 text-center"
              style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
            >
              <ClipboardList className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">No tasks yet.</p>
              <p className="text-gray-400 text-sm mt-1">
                Stay available — new assignments will appear automatically.
              </p>
            </div>
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
    <div
      className="relative min-h-screen pb-[90px] page-fade-in"
      style={{ background: "#F7F9FC" }}
    >
      <HealthcareBg variant="minimal" opacity={0.04} />

      <div className="relative z-10">
        {/* Gradient Header */}
        <div
          className="px-4 pt-5 pb-5"
          style={{
            background: "linear-gradient(135deg, #0D47A1, #26A69A)",
            boxShadow: "0 4px 20px rgba(13,71,161,0.2)",
          }}
        >
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold text-white">Task Queue</h1>
                  {pendingCount > 0 && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {pendingCount}
                    </span>
                  )}
                </div>
                <p className="text-xs text-white/70 mt-0.5">
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleRefresh}
              className="flex items-center gap-1.5 text-xs text-white/80 bg-white/20 px-3 py-1.5 rounded-full hover:bg-white/30 transition-colors"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
          </div>
        </div>

        {/* Summary cards */}
        <div className="px-4 pt-4">
          <div
            className="bg-white rounded-2xl p-4 mb-4"
            style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
          >
            <p
              className="font-semibold text-gray-500 uppercase tracking-wide mb-3"
              style={{ fontSize: "12px" }}
            >
              Active Tasks
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl p-3" style={{ background: "#EFF6FF" }}>
                <div className="flex items-center gap-2 mb-1.5">
                  <div
                    className="bg-blue-100 flex items-center justify-center"
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "8px",
                    }}
                  >
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <span className="text-xs font-semibold text-blue-700">
                    Home Visits
                  </span>
                </div>
                <p className="text-2xl font-bold text-blue-700">
                  {tasks.filter((t) => t.kind === "homeCollection").length}
                </p>
              </div>
              <div className="rounded-xl p-3" style={{ background: "#F0FDFA" }}>
                <div className="flex items-center gap-2 mb-1.5">
                  <div
                    className="bg-teal-100 flex items-center justify-center"
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "8px",
                    }}
                  >
                    <TestTube className="w-3.5 h-3.5 text-teal-600" />
                  </div>
                  <span className="text-xs font-semibold text-teal-700">
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
            <div
              className="bg-white rounded-2xl p-8 text-center"
              style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
              data-ocid="task_queue.empty_state"
            >
              <ClipboardList className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">No tasks yet.</p>
              <p className="text-gray-400 text-sm mt-1">
                Stay available — new assignments will appear automatically.
              </p>
            </div>
          ) : (
            tasks.map((task, idx) => {
              if (task.kind === "homeCollection") {
                const hc = task.data;
                const statusStyle = getTaskStatusColor(hc.status);
                return (
                  <div
                    key={`hc-${hc.id}`}
                    data-ocid={`task_queue.item.${idx + 1}`}
                    className="bg-white rounded-2xl p-4 transition-all duration-200"
                    style={{
                      boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                      borderRadius: "16px",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow =
                        "0 12px 32px rgba(13,71,161,0.12)";
                      (e.currentTarget as HTMLDivElement).style.transform =
                        "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow =
                        "0 8px 24px rgba(0,0,0,0.08)";
                      (e.currentTarget as HTMLDivElement).style.transform = "";
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="bg-blue-50 flex items-center justify-center flex-shrink-0"
                          style={{
                            width: "42px",
                            height: "42px",
                            borderRadius: "12px",
                          }}
                        >
                          <MapPin className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                            Home Visit
                          </p>
                          <p
                            className="font-semibold text-gray-900"
                            style={{ fontSize: "15px" }}
                          >
                            {hc.patientName}
                          </p>
                        </div>
                      </div>
                      <span
                        className="text-xs font-semibold px-2.5 py-1 rounded-full"
                        style={{
                          background: statusStyle.bg,
                          color: statusStyle.text,
                        }}
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
                      className="mt-3 w-full text-xs text-blue-600 font-semibold bg-blue-50 py-2 rounded-xl transition-colors hover:bg-blue-100"
                    >
                      View Details →
                    </button>
                  </div>
                );
              }

              const s = task.data;
              return (
                <div
                  key={`s-${s.id}`}
                  data-ocid={`task_queue.item.${idx + 1}`}
                  className="bg-white rounded-2xl p-4 transition-all duration-200"
                  style={{
                    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                    borderRadius: "16px",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      "0 12px 32px rgba(13,71,161,0.12)";
                    (e.currentTarget as HTMLDivElement).style.transform =
                      "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      "0 8px 24px rgba(0,0,0,0.08)";
                    (e.currentTarget as HTMLDivElement).style.transform = "";
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="bg-teal-50 flex items-center justify-center flex-shrink-0"
                        style={{
                          width: "42px",
                          height: "42px",
                          borderRadius: "12px",
                        }}
                      >
                        <TestTube className="w-5 h-5 text-teal-600" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-teal-600 uppercase tracking-wide">
                          Hospital Sample
                        </p>
                        <p
                          className="font-semibold text-gray-900"
                          style={{ fontSize: "15px" }}
                        >
                          {s.patientName}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-teal-50 text-teal-700">
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
                    className="w-full text-xs text-teal-600 font-semibold bg-teal-50 py-2 rounded-xl transition-colors hover:bg-teal-100"
                  >
                    View Sample →
                  </button>
                </div>
              );
            })
          )}
        </div>

        {tasks.length > 0 && (
          <div className="px-4 mt-4 pb-2">
            <div
              className="flex items-center gap-2 text-xs text-green-600 bg-green-50 rounded-xl p-3"
              style={{ borderRadius: "12px" }}
            >
              <CheckCircle className="w-4 h-4" />
              <span>
                You have {tasks.length} active task
                {tasks.length !== 1 ? "s" : ""} today
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
