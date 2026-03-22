import {
  ClipboardList,
  Loader2,
  MapPin,
  Phone,
  Plus,
  RefreshCw,
  TestTube,
  User,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import type { AppTask, AppUser } from "../../backend";
import type { Hospital } from "../../backend";
import {
  createTask,
  getAllAppUsers,
  getAllTasks,
  getHospitals,
} from "../../services/backendService";

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  assigned: { bg: "#F3F4F6", color: "#6B7280" },
  Assigned: { bg: "#F3F4F6", color: "#6B7280" },
  in_progress: { bg: "#DBEAFE", color: "#1D4ED8" },
  "In Progress": { bg: "#DBEAFE", color: "#1D4ED8" },
  completed: { bg: "#D1FAE5", color: "#065F46" },
  Completed: { bg: "#D1FAE5", color: "#065F46" },
};

const FILTER_TABS = ["All", "assigned", "completed"] as const;
type FilterTab = (typeof FILTER_TABS)[number];

export default function TasksManagementPage({ role }: { role: string }) {
  const [tasks, setTasks] = useState<AppTask[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<FilterTab>("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [phlebotomists, setPhlebotomists] = useState<AppUser[]>([]);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);

  const [form, setForm] = useState({
    patientName: "",
    assignedToMobile: "",
    hospitalId: "",
  });

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [taskList, users, hospList] = await Promise.all([
        getAllTasks(),
        getAllAppUsers(),
        getHospitals(),
      ]);
      setTasks(taskList);
      setPhlebotomists(users.filter((u) => u.role === "phlebotomist"));
      setHospitals(hospList);
    } catch {
      toast.error("Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const filteredTasks =
    filter === "All" ? tasks : tasks.filter((t) => t.status === filter);

  const handleAddTask = async () => {
    if (!form.patientName.trim()) {
      toast.error("Patient name is required.");
      return;
    }
    if (!form.assignedToMobile) {
      toast.error("Please select a phlebotomist.");
      return;
    }
    const session = (() => {
      try {
        const s = localStorage.getItem("xpertlab_session");
        return s ? JSON.parse(s) : null;
      } catch {
        return null;
      }
    })();
    const assignedBy = session?.mobileNumber ?? session?.mobile ?? "admin";
    setSubmitting(true);
    try {
      const created = await createTask(
        form.assignedToMobile,
        assignedBy,
        form.hospitalId,
        form.patientName.trim(),
        "assigned",
      );
      if (created) {
        toast.success("Task created successfully.");
        setModalOpen(false);
        setForm({ patientName: "", assignedToMobile: "", hospitalId: "" });
        await loadData();
      } else {
        toast.error("Failed to create task. Please try again.");
      }
    } catch {
      toast.error("Failed to create task.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ background: "#F7F9FC", minHeight: "100vh" }}>
      {/* Hero Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #2563EB, #06B6D4)",
          padding: "20px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <ClipboardList className="w-5 h-5" />
            Tasks
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.8)",
              fontSize: 13,
              marginTop: 4,
            }}
          >
            Manage and assign patient visits
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            type="button"
            onClick={loadData}
            disabled={loading}
            style={{
              background: "rgba(255,255,255,0.15)",
              border: "1.5px solid rgba(255,255,255,0.3)",
              borderRadius: 10,
              color: "white",
              padding: "6px 10px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          {(role === "superAdmin" || role === "labAdmin") && (
            <button
              type="button"
              data-ocid="tasks.open_modal_button"
              onClick={() => setModalOpen(true)}
              style={{
                height: 44,
                background: "rgba(255,255,255,0.2)",
                color: "white",
                border: "1.5px solid rgba(255,255,255,0.4)",
                borderRadius: 12,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "0 16px",
              }}
            >
              <Plus className="w-4 h-4" />
              Add Task
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div
        style={{
          display: "flex",
          gap: 8,
          padding: "12px 16px",
          overflowX: "auto",
        }}
      >
        {FILTER_TABS.map((tab) => (
          <button
            type="button"
            key={tab}
            data-ocid={`tasks.${tab.toLowerCase().replace(" ", "_")}.tab`}
            onClick={() => setFilter(tab)}
            style={{
              padding: "7px 16px",
              borderRadius: 20,
              border: "none",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "all 150ms",
              background:
                filter === tab
                  ? "linear-gradient(135deg, #2563EB, #06B6D4)"
                  : "#FFFFFF",
              color: filter === tab ? "white" : "#6B7280",
              boxShadow:
                filter === tab
                  ? "0 4px 12px rgba(37,99,235,0.25)"
                  : "0 1px 4px rgba(0,0,0,0.06)",
            }}
          >
            {tab === "All" ? "All" : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div style={{ padding: "0 16px 16px" }}>
        {loading ? (
          <div
            style={{
              textAlign: "center",
              padding: "48px 24px",
              background: "white",
              borderRadius: 16,
              boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            }}
          >
            <Loader2
              className="w-8 h-8 mx-auto animate-spin"
              style={{ color: "#2563EB" }}
            />
            <div style={{ marginTop: 12, fontSize: 14, color: "#6B7280" }}>
              Loading tasks...
            </div>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div
            data-ocid="tasks.empty_state"
            style={{
              textAlign: "center",
              padding: "48px 24px",
              background: "white",
              borderRadius: 16,
              boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            }}
          >
            <ClipboardList
              className="w-12 h-12 mx-auto"
              style={{ color: "#D1D5DB" }}
            />
            <div
              style={{
                marginTop: 12,
                fontSize: 15,
                fontWeight: 600,
                color: "#374151",
              }}
            >
              No tasks found
            </div>
            <div style={{ fontSize: 13, color: "#9CA3AF", marginTop: 4 }}>
              {filter === "All"
                ? "Create your first task using the Add Task button"
                : `No ${filter} tasks`}
            </div>
          </div>
        ) : (
          filteredTasks.map((task, idx) => (
            <div
              key={task.task_id}
              data-ocid={`tasks.item.${idx + 1}`}
              style={{
                background: "white",
                borderRadius: 16,
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                padding: 16,
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 10,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: "#111827",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <User className="w-4 h-4" style={{ color: "#2563EB" }} />
                    {task.patient_name}
                  </div>
                  <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>
                    {task.task_id}
                  </div>
                </div>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "3px 10px",
                    borderRadius: 20,
                    background: STATUS_STYLES[task.status]?.bg ?? "#F3F4F6",
                    color: STATUS_STYLES[task.status]?.color ?? "#6B7280",
                  }}
                >
                  {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  fontSize: 13,
                  color: "#4B5563",
                }}
              >
                {task.assigned_to_mobile && (
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <Phone className="w-3.5 h-3.5 text-gray-400" />
                    Assigned to: {task.assigned_to_mobile}
                  </div>
                )}
                {task.hospital_id && (
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    Hospital ID: {task.hospital_id}
                  </div>
                )}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    marginTop: 4,
                    paddingTop: 8,
                    borderTop: "1px solid #F3F4F6",
                  }}
                >
                  <User className="w-3.5 h-3.5 text-gray-400" />
                  <span style={{ color: "#9CA3AF" }}>
                    Assigned by: {task.assigned_by}
                  </span>
                  <span style={{ color: "#9CA3AF", marginLeft: 8 }}>
                    {new Date(
                      Number(task.created_at) / 1_000_000,
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Task Modal */}
      {modalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 200,
            display: "flex",
            alignItems: "flex-end",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalOpen(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") setModalOpen(false);
          }}
        >
          <div
            data-ocid="tasks.modal"
            style={{
              background: "white",
              borderRadius: "20px 20px 0 0",
              width: "100%",
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: "16px 20px",
                borderBottom: "1px solid #F3F4F6",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              <div style={{ fontSize: 17, fontWeight: 700, color: "#111827" }}>
                Add New Task
              </div>
              <button
                type="button"
                data-ocid="tasks.close_button"
                onClick={() => setModalOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#9CA3AF",
                  padding: 4,
                }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div
              style={{
                overflowY: "auto",
                padding: "16px 20px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div>
                <label
                  htmlFor="task-patientName"
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#6B7280",
                    display: "block",
                    marginBottom: 4,
                  }}
                >
                  Patient Name *
                </label>
                <input
                  id="task-patientName"
                  data-ocid="tasks.patientName.input"
                  type="text"
                  value={form.patientName}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      patientName: e.target.value,
                    }))
                  }
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: 8,
                    border: "1.5px solid #E5E7EB",
                    fontSize: 14,
                    outline: "none",
                    background: "#F7F9FC",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="task-phlebotomist"
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#6B7280",
                    display: "block",
                    marginBottom: 4,
                  }}
                >
                  Assigned Phlebotomist *
                </label>
                <select
                  id="task-phlebotomist"
                  data-ocid="tasks.select"
                  value={form.assignedToMobile}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      assignedToMobile: e.target.value,
                    }))
                  }
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: 8,
                    border: "1.5px solid #E5E7EB",
                    fontSize: 14,
                    outline: "none",
                    background: "#F7F9FC",
                    cursor: "pointer",
                  }}
                >
                  <option value="">Select phlebotomist...</option>
                  {phlebotomists.map((p) => (
                    <option key={p.mobile} value={p.mobile}>
                      {p.name} ({p.mobile})
                    </option>
                  ))}
                </select>
                {phlebotomists.length === 0 && (
                  <p style={{ fontSize: 12, color: "#EF4444", marginTop: 4 }}>
                    No phlebotomists found. Ask Super Admin to add
                    phlebotomists.
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="task-hospital"
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#6B7280",
                    display: "block",
                    marginBottom: 4,
                  }}
                >
                  Hospital
                </label>
                <select
                  id="task-hospital"
                  data-ocid="tasks.hospital.select"
                  value={form.hospitalId}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      hospitalId: e.target.value,
                    }))
                  }
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: 8,
                    border: "1.5px solid #E5E7EB",
                    fontSize: 14,
                    outline: "none",
                    background: "#F7F9FC",
                    cursor: "pointer",
                  }}
                >
                  <option value="">Select hospital...</option>
                  {hospitals.map((h) => (
                    <option key={h.id} value={h.id}>
                      {h.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Modal Footer */}
            <div
              style={{
                padding: "12px 20px 24px",
                borderTop: "1px solid #F3F4F6",
                flexShrink: 0,
                display: "flex",
                gap: 10,
              }}
            >
              <button
                type="button"
                data-ocid="tasks.cancel_button"
                onClick={() => setModalOpen(false)}
                style={{
                  flex: 1,
                  height: 48,
                  background: "#F3F4F6",
                  border: "none",
                  borderRadius: 12,
                  fontSize: 15,
                  fontWeight: 600,
                  color: "#6B7280",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                data-ocid="tasks.submit_button"
                onClick={handleAddTask}
                disabled={submitting}
                style={{
                  flex: 2,
                  height: 48,
                  background: "linear-gradient(135deg, #2563EB, #06B6D4)",
                  border: "none",
                  borderRadius: 12,
                  fontSize: 15,
                  fontWeight: 600,
                  color: "white",
                  cursor: submitting ? "not-allowed" : "pointer",
                  opacity: submitting ? 0.7 : 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                {submitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
                {submitting ? "Creating..." : "Create Task"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
