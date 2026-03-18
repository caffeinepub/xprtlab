import {
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

interface AssignedTask {
  id: string;
  patientName: string;
  phone: string;
  address: string;
  tests: string;
  assignedPhlebotomistMobile: string;
  visitTime: string;
  priority: string;
  status: string;
  createdAt: string;
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

function AssignedTaskCard({
  task,
  idx,
}: {
  task: AssignedTask;
  idx: number;
}) {
  const statusStyles: Record<string, { bg: string; color: string }> = {
    Assigned: { bg: "#F3F4F6", color: "#6B7280" },
    "In Progress": { bg: "#DBEAFE", color: "#1D4ED8" },
    Completed: { bg: "#D1FAE5", color: "#065F46" },
  };
  const s = statusStyles[task.status] ?? { bg: "#F3F4F6", color: "#6B7280" };
  const isUrgent = task.priority === "Urgent";
  return (
    <div
      data-ocid={`taskqueue.item.${idx + 1}`}
      style={{
        background: "white",
        borderRadius: 16,
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        padding: 16,
        borderLeft: isUrgent ? "4px solid #DC2626" : "4px solid #2563EB",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        <div style={{ fontWeight: 700, fontSize: 15, color: "#111827" }}>
          {task.patientName}
        </div>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            padding: "3px 10px",
            borderRadius: 20,
            background: s.bg,
            color: s.color,
          }}
        >
          {task.status}
        </span>
      </div>
      {task.phone && (
        <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 4 }}>
          Phone: {task.phone}
        </div>
      )}
      {task.address && (
        <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 4 }}>
          Address: {task.address}
        </div>
      )}
      {task.tests && (
        <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 4 }}>
          Tests: {task.tests}
        </div>
      )}
      {task.visitTime && (
        <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 6 }}>
          Visit: {new Date(task.visitTime).toLocaleString()}
        </div>
      )}
      {isUrgent && (
        <div
          style={{
            marginTop: 8,
            fontSize: 11,
            fontWeight: 700,
            color: "#DC2626",
          }}
        >
          URGENT
        </div>
      )}
    </div>
  );
}

export default function TaskQueuePage({
  isDemoMode = false,
}: TaskQueuePageProps) {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [assignedTasks, setAssignedTasks] = useState<AssignedTask[]>([]);

  // Load tasks assigned from admin
  const loadAssignedTasks = useCallback(() => {
    try {
      const sessionRaw = localStorage.getItem("xpertlab_session");
      const session = sessionRaw ? JSON.parse(sessionRaw) : null;
      const myMobile = session?.mobileNumber ?? "";
      const raw = localStorage.getItem("xpertlab_tasks");
      const all: AssignedTask[] = raw ? JSON.parse(raw) : [];
      setAssignedTasks(
        all.filter((t) => t.assignedPhlebotomistMobile === myMobile),
      );
    } catch {
      setAssignedTasks([]);
    }
  }, []);

  const loadTasks = useCallback(() => {
    loadAssignedTasks();
    if (!isDemoMode) {
      setLastUpdated(new Date());
      return;
    }

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
  }, [isDemoMode, loadAssignedTasks]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  useEffect(() => {
    const interval = setInterval(loadTasks, 30_000);
    return () => clearInterval(interval);
  }, [loadTasks]);

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
              background: "linear-gradient(135deg, #2563EB, #06B6D4)",
              boxShadow: "0 4px 16px rgba(37,99,235,0.2)",
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-white">My Tasks</h1>
                <p className="text-xs text-white/70 mt-0.5">
                  Your assigned patient visits
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
          <div className="p-4 space-y-3">
            {assignedTasks.length === 0 ? (
              <div
                data-ocid="taskqueue.empty_state"
                className="bg-white rounded-2xl p-8 text-center"
                style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
              >
                <ClipboardList className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">
                  No tasks assigned yet.
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Stay available — new assignments will appear here.
                </p>
              </div>
            ) : (
              assignedTasks.map((task, idx) => (
                <AssignedTaskCard key={task.id} task={task} idx={idx} />
              ))
            )}
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
        {/* Header */}
        <div
          style={{
            background: "linear-gradient(135deg, #2563EB, #06B6D4)",
            padding: "20px 16px 16px",
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white">Task Queue</h1>
              <p className="text-xs text-white/70 mt-0.5">
                {pendingCount} pending tasks
              </p>
            </div>
            <button
              type="button"
              data-ocid="taskqueue.refresh.button"
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

        {/* Assigned tasks section */}
        {assignedTasks.length > 0 && (
          <div className="px-4 pt-4">
            <h2
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#374151",
                marginBottom: 10,
              }}
            >
              Admin Assigned Tasks
            </h2>
            <div className="space-y-3">
              {assignedTasks.map((task, idx) => (
                <AssignedTaskCard key={task.id} task={task} idx={idx} />
              ))}
            </div>
          </div>
        )}

        {/* Demo tasks */}
        <div className="p-4">
          {tasks.length === 0 ? (
            <div
              data-ocid="taskqueue.empty_state"
              className="bg-white rounded-2xl p-8 text-center"
              style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
            >
              <ClipboardList className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">All tasks completed!</p>
              <p className="text-gray-400 text-sm mt-1">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {tasks.map((item, idx) => {
                if (item.kind === "homeCollection") {
                  const hc = item.data;
                  const statusStyle = getTaskStatusColor(hc.status);
                  return (
                    <div
                      key={hc.id}
                      data-ocid={`taskqueue.item.${idx + 1}`}
                      className="bg-white rounded-2xl p-4"
                      style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-gray-800 text-sm">
                            {hc.patientName}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            Home Collection
                          </p>
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
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{hc.address}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
                        <TestTube className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">
                          {hc.tests
                            .map((t: { testName: string }) => t.testName)
                            .join(", ")}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-1">
                        <Clock className="w-3 h-3 flex-shrink-0" />
                        <span>
                          {new Date(hc.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  );
                }
                const s = item.data;
                const statusStyle = getTaskStatusColor(s.status);
                return (
                  <div
                    key={s.id}
                    data-ocid={`taskqueue.item.${idx + 1}`}
                    className="bg-white rounded-2xl p-4"
                    style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">
                          {s.patientName}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Hospital Sample
                        </p>
                      </div>
                      <span
                        className="text-xs font-semibold px-2.5 py-1 rounded-full"
                        style={{
                          background: statusStyle.bg,
                          color: statusStyle.text,
                        }}
                      >
                        {getTaskStatusLabel(s.status)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <TestTube className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">
                        {s.tests
                          .map((t: { testName: string }) => t.testName)
                          .join(", ")}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-1">
                      <CheckCircle className="w-3 h-3 flex-shrink-0" />
                      <span>Sample #{s.sampleId ?? s.id.slice(-6)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
