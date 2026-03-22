import { ClipboardList, Loader2, MapPin, RefreshCw, User } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { AppTask } from "../../backend";
import HealthcareBg from "../../components/shared/HealthcareBg";
import { getTasksByUser } from "../../services/backendService";

interface TaskQueuePageProps {
  isDemoMode?: boolean;
  role?: string;
  onNavigate?: (path: string) => void;
}

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  assigned: { bg: "#F3F4F6", color: "#6B7280" },
  in_progress: { bg: "#DBEAFE", color: "#1D4ED8" },
  completed: { bg: "#D1FAE5", color: "#065F46" },
};

function getSessionMobile(): string {
  try {
    const s = localStorage.getItem("xpertlab_session");
    if (!s) return "";
    const parsed = JSON.parse(s);
    return parsed?.mobileNumber ?? parsed?.mobile ?? "";
  } catch {
    return "";
  }
}

function TaskCard({ task, idx }: { task: AppTask; idx: number }) {
  const s = STATUS_STYLES[task.status.toLowerCase()] ?? STATUS_STYLES.assigned;
  return (
    <div
      data-ocid={`taskqueue.item.${idx + 1}`}
      style={{
        background: "white",
        borderRadius: 16,
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        padding: 16,
        borderLeft: "4px solid #2563EB",
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
          {task.patient_name}
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
          {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
        </span>
      </div>
      <div
        style={{
          fontSize: 12,
          color: "#9CA3AF",
          marginBottom: 6,
        }}
      >
        {task.task_id}
      </div>
      {task.hospital_id && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 13,
            color: "#6B7280",
          }}
        >
          <MapPin className="w-3.5 h-3.5" />
          Hospital: {task.hospital_id}
        </div>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          fontSize: 12,
          color: "#9CA3AF",
          marginTop: 6,
        }}
      >
        <User className="w-3 h-3" />
        Assigned by: {task.assigned_by} &middot;{" "}
        {new Date(Number(task.created_at) / 1_000_000).toLocaleDateString()}
      </div>
    </div>
  );
}

export default function TaskQueuePage(_props: TaskQueuePageProps) {
  const [tasks, setTasks] = useState<AppTask[]>([]);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadTasks = useCallback(async () => {
    const mobile = getSessionMobile();
    if (!mobile) {
      setTasks([]);
      return;
    }
    try {
      const result = await getTasksByUser(mobile);
      setTasks(result);
    } catch {
      setTasks([]);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    loadTasks().finally(() => setLoading(false));
  }, [loadTasks]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadTasks();
    setIsRefreshing(false);
  };

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

        <div className="p-4 space-y-3">
          {loading ? (
            <div
              className="bg-white rounded-2xl p-8 text-center"
              style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
            >
              <Loader2 className="w-8 h-8 text-blue-500 mx-auto animate-spin mb-3" />
              <p className="text-gray-400 text-sm">Loading your tasks...</p>
            </div>
          ) : tasks.length === 0 ? (
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
            tasks.map((task, idx) => (
              <TaskCard key={task.task_id} task={task} idx={idx} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
