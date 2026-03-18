import {
  ClipboardList,
  MapPin,
  Phone,
  Plus,
  TestTube,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Task {
  id: string;
  patientName: string;
  phone: string;
  address: string;
  tests: string;
  assignedPhlebotomistId: string;
  assignedPhlebotomistName: string;
  assignedPhlebotomistMobile: string;
  visitTime: string;
  priority: "Normal" | "Urgent";
  status: "Assigned" | "In Progress" | "Completed";
  createdAt: string;
}

interface Phlebotomist {
  id: string;
  name: string;
  mobile?: string;
}

function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem("xpertlab_tasks");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveTasks(tasks: Task[]) {
  localStorage.setItem("xpertlab_tasks", JSON.stringify(tasks));
}

function loadPhlebotomists(): Phlebotomist[] {
  try {
    const raw = localStorage.getItem("xpertlab_phlebotomists");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  Assigned: { bg: "#F3F4F6", color: "#6B7280" },
  "In Progress": { bg: "#DBEAFE", color: "#1D4ED8" },
  Completed: { bg: "#D1FAE5", color: "#065F46" },
};

const PRIORITY_STYLES: Record<string, { bg: string; color: string }> = {
  Normal: { bg: "#F0FDF4", color: "#16A34A" },
  Urgent: { bg: "#FEF2F2", color: "#DC2626" },
};

const FILTER_TABS = ["All", "Assigned", "In Progress", "Completed"] as const;
type FilterTab = (typeof FILTER_TABS)[number];

export default function TasksManagementPage({ role }: { role: string }) {
  const [tasks, setTasks] = useState<Task[]>(loadTasks);
  const [filter, setFilter] = useState<FilterTab>("All");
  const [modalOpen, setModalOpen] = useState(false);
  const phlebotomists = loadPhlebotomists();

  const [form, setForm] = useState({
    patientName: "",
    phone: "",
    address: "",
    tests: "",
    assignedPhlebotomistId: "",
    visitTime: "",
    priority: "Normal" as "Normal" | "Urgent",
  });

  const filteredTasks =
    filter === "All" ? tasks : tasks.filter((t) => t.status === filter);

  const handleAddTask = () => {
    if (!form.patientName.trim()) {
      toast.error("Patient name is required.");
      return;
    }
    if (!form.assignedPhlebotomistId) {
      toast.error("Please select a phlebotomist.");
      return;
    }
    const phlebo = phlebotomists.find(
      (p) => p.id === form.assignedPhlebotomistId,
    );
    const newTask: Task = {
      id: `TASK-${Date.now()}`,
      patientName: form.patientName,
      phone: form.phone,
      address: form.address,
      tests: form.tests,
      assignedPhlebotomistId: form.assignedPhlebotomistId,
      assignedPhlebotomistName: phlebo?.name ?? "Unknown",
      assignedPhlebotomistMobile: phlebo?.mobile ?? "",
      visitTime: form.visitTime,
      priority: form.priority,
      status: "Assigned",
      createdAt: new Date().toISOString(),
    };
    const updated = [newTask, ...tasks];
    saveTasks(updated);
    setTasks(updated);
    setModalOpen(false);
    setForm({
      patientName: "",
      phone: "",
      address: "",
      tests: "",
      assignedPhlebotomistId: "",
      visitTime: "",
      priority: "Normal",
    });
    toast.success("Task created successfully.");
  };

  const handleStatusChange = (taskId: string, newStatus: Task["status"]) => {
    const updated = tasks.map((t) =>
      t.id === taskId ? { ...t, status: newStatus } : t,
    );
    saveTasks(updated);
    setTasks(updated);
    toast.success("Task status updated.");
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
            {tab}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div style={{ padding: "0 16px 16px" }}>
        {filteredTasks.length === 0 ? (
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
              key={task.id}
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
                    {task.patientName}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "#9CA3AF",
                      marginTop: 2,
                    }}
                  >
                    {task.id}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      padding: "3px 10px",
                      borderRadius: 20,
                      background:
                        PRIORITY_STYLES[task.priority]?.bg ?? "#F3F4F6",
                      color: PRIORITY_STYLES[task.priority]?.color ?? "#6B7280",
                    }}
                  >
                    {task.priority}
                  </span>
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
                    {task.status}
                  </span>
                </div>
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
                {task.phone && (
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <Phone className="w-3.5 h-3.5 text-gray-400" />
                    {task.phone}
                  </div>
                )}
                {task.address && (
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    {task.address}
                  </div>
                )}
                {task.tests && (
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <TestTube className="w-3.5 h-3.5 text-gray-400" />
                    {task.tests}
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
                  <span style={{ fontWeight: 600, color: "#2563EB" }}>
                    {task.assignedPhlebotomistName}
                  </span>
                  {task.visitTime && (
                    <span style={{ color: "#9CA3AF", marginLeft: 8 }}>
                      {new Date(task.visitTime).toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              {(role === "superAdmin" || role === "labAdmin") && (
                <div style={{ marginTop: 12 }}>
                  <select
                    data-ocid={`tasks.select.${idx + 1}`}
                    value={task.status}
                    onChange={(e) =>
                      handleStatusChange(
                        task.id,
                        e.target.value as Task["status"],
                      )
                    }
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      borderRadius: 8,
                      border: "1.5px solid #E5E7EB",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#374151",
                      background: "#F7F9FC",
                      cursor: "pointer",
                      outline: "none",
                    }}
                  >
                    <option value="Assigned">Assigned</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              )}
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
              {[
                {
                  key: "patientName" as const,
                  label: "Patient Name *",
                  id: "task-patientName",
                  type: "text",
                },
                {
                  key: "phone" as const,
                  label: "Phone",
                  type: "text",
                  id: "task-phone",
                },
                {
                  key: "address" as const,
                  label: "Address",
                  type: "text",
                  id: "task-address",
                },
                {
                  key: "tests" as const,
                  label: "Tests",
                  type: "text",
                  id: "task-tests",
                },
              ].map((field) => (
                <div key={field.key}>
                  <label
                    htmlFor={field.id}
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#6B7280",
                      display: "block",
                      marginBottom: 4,
                    }}
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    data-ocid={`tasks.${field.key}.input`}
                    type={field.type}
                    value={form[field.key]}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        [field.key]: e.target.value,
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
              ))}

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
                  value={form.assignedPhlebotomistId}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      assignedPhlebotomistId: e.target.value,
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
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="task-visittime"
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#6B7280",
                    display: "block",
                    marginBottom: 4,
                  }}
                >
                  Visit Time
                </label>
                <input
                  id="task-visittime"
                  data-ocid="tasks.visittime.input"
                  type="datetime-local"
                  value={form.visitTime}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, visitTime: e.target.value }))
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
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#6B7280",
                    display: "block",
                    marginBottom: 8,
                  }}
                >
                  Priority
                </span>
                <div style={{ display: "flex", gap: 8 }}>
                  {(["Normal", "Urgent"] as const).map((p) => (
                    <button
                      type="button"
                      key={p}
                      data-ocid={`tasks.priority_${p.toLowerCase()}.toggle`}
                      onClick={() =>
                        setForm((prev) => ({ ...prev, priority: p }))
                      }
                      style={{
                        flex: 1,
                        padding: "10px",
                        borderRadius: 10,
                        border: "1.5px solid",
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "all 150ms",
                        background:
                          form.priority === p
                            ? p === "Urgent"
                              ? "#FEF2F2"
                              : "#F0FDF4"
                            : "#F7F9FC",
                        borderColor:
                          form.priority === p
                            ? p === "Urgent"
                              ? "#DC2626"
                              : "#16A34A"
                            : "#E5E7EB",
                        color:
                          form.priority === p
                            ? p === "Urgent"
                              ? "#DC2626"
                              : "#16A34A"
                            : "#6B7280",
                      }}
                    >
                      {p}
                    </button>
                  ))}
                </div>
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
                style={{
                  flex: 2,
                  height: 48,
                  background: "linear-gradient(135deg, #2563EB, #06B6D4)",
                  border: "none",
                  borderRadius: 12,
                  fontSize: 15,
                  fontWeight: 600,
                  color: "white",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                <Plus className="w-4 h-4" />
                Create Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
