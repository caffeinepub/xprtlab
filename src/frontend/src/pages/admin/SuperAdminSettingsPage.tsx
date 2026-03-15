import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building2,
  ChevronDown,
  ChevronUp,
  Edit2,
  FlaskConical,
  Plus,
  Shield,
  User,
  UserCheck,
  UserX,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import PageHeroHeader from "../../components/shared/PageHeroHeader";
import { useSystemMode } from "../../hooks/useSystemMode";

// biome-ignore lint/correctness/noUnusedVariables: used below
void Building2;

export interface SuperAdminSettingsPageProps {
  isDemoMode?: boolean;
  onNavigate?: (path: string) => void;
}

interface LabAdmin {
  id: string;
  name: string;
  mobile: string;
  email: string;
  assignedLab: string;
  loginMethod: "OTP" | "Password";
  assignedHospitals: string[];
  status: "Active" | "Disabled";
  lastLogin: string;
  isDemo?: boolean;
}

interface Phlebotomist {
  id: string;
  name: string;
  mobile: string;
  assignedHospitals: string[];
  samplesToday: number;
  lastLogin: string;
  status: "Active" | "Disabled";
  isDemo?: boolean;
}

interface Hospital {
  id: string;
  name: string;
  isActive: boolean;
}

const DEMO_LAB_ADMINS: LabAdmin[] = [
  {
    id: "demo-la-1",
    name: "Rahul Sharma",
    mobile: "9876543210",
    email: "rahul@citycare.com",
    assignedLab: "City Care Lab",
    loginMethod: "OTP",
    assignedHospitals: ["City Care Hospital"],
    status: "Active",
    lastLogin: "Today, 09:30 AM",
    isDemo: true,
  },
  {
    id: "demo-la-2",
    name: "Priya Mehta",
    mobile: "9876543211",
    email: "priya@vijaya.com",
    assignedLab: "Vijaya Lab",
    loginMethod: "OTP",
    assignedHospitals: ["Vijaya Hospital"],
    status: "Active",
    lastLogin: "Today, 08:45 AM",
    isDemo: true,
  },
];

function loadLabAdmins(): LabAdmin[] {
  try {
    const raw = localStorage.getItem("xpertlab_lab_admins");
    if (raw) return JSON.parse(raw) as LabAdmin[];
  } catch {
    /* noop */
  }
  localStorage.setItem("xpertlab_lab_admins", JSON.stringify(DEMO_LAB_ADMINS));
  return DEMO_LAB_ADMINS;
}

function saveLabAdmins(admins: LabAdmin[]) {
  localStorage.setItem("xpertlab_lab_admins", JSON.stringify(admins));
}

function loadPhlebotomists(): Phlebotomist[] {
  try {
    const raw = localStorage.getItem("xpertlab_phlebotomists");
    if (raw) return JSON.parse(raw) as Phlebotomist[];
  } catch {
    /* noop */
  }
  return [];
}

function savePhlebotomists(phlebs: Phlebotomist[]) {
  localStorage.setItem("xpertlab_phlebotomists", JSON.stringify(phlebs));
}

function loadHospitals(): Hospital[] {
  try {
    const raw = localStorage.getItem("xpertlab_hospitals");
    if (raw) return JSON.parse(raw) as Hospital[];
  } catch {
    /* noop */
  }
  return [
    { id: "h1", name: "City Care Hospital", isActive: true },
    { id: "h2", name: "Vijaya Hospital", isActive: true },
    { id: "h3", name: "Sunrise Medical Centre", isActive: true },
    { id: "h4", name: "Apollo Diagnostics", isActive: true },
  ];
}

function StatusBadge({ status }: { status: "Active" | "Disabled" }) {
  if (status === "Active") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-100">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
        Active
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-500 border border-gray-200">
      <span className="w-1.5 h-1.5 rounded-full bg-gray-400 inline-block" />
      Disabled
    </span>
  );
}

interface MultiSelectProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
}

function MultiSelect({
  options,
  selected,
  onChange,
  placeholder,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const toggle = (opt: string) => {
    if (selected.includes(opt)) {
      onChange(selected.filter((s) => s !== opt));
    } else {
      onChange([...selected, opt]);
    }
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-2 px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-left"
        style={{ background: "#F7F9FC" }}
      >
        <span className="text-gray-600 truncate">
          {selected.length === 0
            ? (placeholder ?? "Select hospitals...")
            : selected.join(", ")}
        </span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
        )}
      </button>
      {open && (
        <div
          className="absolute z-50 left-0 right-0 mt-1 bg-white border border-gray-100 rounded-xl overflow-hidden"
          style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
        >
          {options.length === 0 ? (
            <p className="px-3 py-3 text-xs text-gray-400">
              No hospitals available
            </p>
          ) : (
            options.map((opt) => (
              <button
                type="button"
                key={opt}
                onClick={() => toggle(opt)}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-gray-50 text-sm transition-colors"
              >
                <div
                  className="w-4 h-4 rounded border flex items-center justify-center flex-shrink-0"
                  style={{
                    borderColor: selected.includes(opt) ? "#2563EB" : "#D1D5DB",
                    background: selected.includes(opt) ? "#2563EB" : "#fff",
                  }}
                >
                  {selected.includes(opt) && (
                    <svg
                      viewBox="0 0 12 12"
                      className="w-3 h-3"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M2 6l3 3 5-5"
                        stroke="#fff"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <span className="text-gray-700">{opt}</span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}

interface LabAdminFormState {
  name: string;
  mobile: string;
  email: string;
  assignedLab: string;
  loginMethod: "OTP" | "Password";
  assignedHospitals: string[];
  status: "Active" | "Disabled";
}

const emptyLabAdminForm = (): LabAdminFormState => ({
  name: "",
  mobile: "",
  email: "",
  assignedLab: "",
  loginMethod: "OTP",
  assignedHospitals: [],
  status: "Active",
});

interface PhlebotomistFormState {
  name: string;
  mobile: string;
  assignedHospitals: string[];
  status: "Active" | "Disabled";
}

const emptyPhlebotomistForm = (): PhlebotomistFormState => ({
  name: "",
  mobile: "",
  assignedHospitals: [],
  status: "Active",
});

function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  id,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer: React.ReactNode;
  id?: string;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.45)" }}
    >
      <div
        data-ocid={id}
        className="w-full max-w-lg bg-white flex flex-col"
        style={{
          borderRadius: "16px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
          animation: "modalIn 200ms ease-out",
          maxHeight: "92vh",
        }}
      >
        <style>
          {
            "@keyframes modalIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }"
          }
        </style>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <h3 className="font-bold text-gray-900" style={{ fontSize: "18px" }}>
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>
        <div
          className="overflow-y-auto flex-1 px-6 py-4"
          style={{ maxHeight: "70vh" }}
        >
          {children}
        </div>
        <div
          className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 flex-shrink-0 bg-white"
          style={{ borderRadius: "0 0 16px 16px" }}
        >
          {footer}
        </div>
      </div>
    </div>
  );
}

// ─── Lab Admins Tab ──────────────────────────────────────────────────────────

function LabAdminsTab({ hospitals }: { hospitals: Hospital[] }) {
  const [admins, setAdmins] = useState<LabAdmin[]>(() => loadLabAdmins());
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<LabAdminFormState>(emptyLabAdminForm());
  const [error, setError] = useState("");

  const openAdd = () => {
    setForm(emptyLabAdminForm());
    setEditingId(null);
    setError("");
    setShowModal(true);
  };

  const openEdit = (admin: LabAdmin) => {
    setForm({
      name: admin.name,
      mobile: admin.mobile,
      email: admin.email,
      assignedLab: admin.assignedLab,
      loginMethod: admin.loginMethod,
      assignedHospitals: admin.assignedHospitals,
      status: admin.status,
    });
    setEditingId(admin.id);
    setError("");
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.name.trim()) {
      setError("Name is required.");
      return;
    }
    if (!form.mobile.trim()) {
      setError("Mobile number is required.");
      return;
    }
    setError("");
    if (editingId) {
      const updated = admins.map((a) =>
        a.id === editingId ? { ...a, ...form } : a,
      );
      setAdmins(updated);
      saveLabAdmins(updated);
    } else {
      const newAdmin: LabAdmin = {
        ...form,
        id: `la-${Date.now()}`,
        lastLogin: "Never",
        isDemo: false,
      };
      const updated = [newAdmin, ...admins];
      setAdmins(updated);
      saveLabAdmins(updated);
    }
    setShowModal(false);
  };

  const handleToggleStatus = (id: string) => {
    const updated = admins.map((a) =>
      a.id === id
        ? { ...a, status: a.status === "Active" ? "Disabled" : "Active" }
        : a,
    ) as LabAdmin[];
    setAdmins(updated);
    saveLabAdmins(updated);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">
          {admins.length} lab admin{admins.length !== 1 ? "s" : ""}
        </p>
        <button
          type="button"
          data-ocid="settings.add_lab_admin.open_modal_button"
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
          style={{
            background: "linear-gradient(135deg, #2563EB, #1976D2)",
            boxShadow: "0 4px 12px rgba(37,99,235,0.3)",
          }}
        >
          <Plus className="w-4 h-4" /> Add Lab Admin
        </button>
      </div>

      {admins.length === 0 ? (
        <div
          className="py-14 flex flex-col items-center justify-center text-center"
          data-ocid="settings.lab_admins.empty_state"
        >
          <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-3">
            <Shield className="w-7 h-7 text-blue-400" />
          </div>
          <p className="font-semibold text-gray-700">No lab admins yet</p>
          <p className="text-sm text-gray-400 mt-1">
            Add the first lab admin to get started.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {[
                  "Name",
                  "Assigned Lab",
                  "Mobile",
                  "Status",
                  "Last Login",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wide"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {admins.map((admin, idx) => (
                <tr
                  key={admin.id}
                  data-ocid={`settings.lab_admin_table.item.${idx + 1}`}
                  className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors"
                >
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          background:
                            "linear-gradient(135deg, #2563EB, #1976D2)",
                        }}
                      >
                        <span className="text-white text-xs font-bold">
                          {admin.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">
                          {admin.name}
                        </p>
                        <p
                          className="text-gray-400"
                          style={{ fontSize: "11px" }}
                        >
                          {admin.email}
                        </p>
                      </div>
                      {admin.isDemo && (
                        <span className="px-1.5 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-600 border border-amber-100">
                          Demo
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-gray-600">
                    {admin.assignedLab}
                  </td>
                  <td className="py-3.5 px-4 text-gray-600 font-mono text-xs">
                    {admin.mobile}
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={admin.status} />
                  </td>
                  <td className="py-3.5 px-4 text-gray-400 text-xs">
                    {admin.lastLogin}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        data-ocid={`settings.lab_admin_table.edit_button.${idx + 1}`}
                        onClick={() => openEdit(admin)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-blue-50 transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5 text-blue-500" />
                      </button>
                      <button
                        type="button"
                        data-ocid={`settings.lab_admin_table.toggle.${idx + 1}`}
                        onClick={() => handleToggleStatus(admin.id)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                      >
                        {admin.status === "Active" ? (
                          <UserX className="w-3.5 h-3.5 text-gray-400" />
                        ) : (
                          <UserCheck className="w-3.5 h-3.5 text-green-500" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title={editingId ? "Edit Lab Admin" : "Add Lab Admin"}
        id="settings.lab_admin_modal.dialog"
        footer={
          <>
            <button
              type="button"
              data-ocid="settings.lab_admin_modal.cancel_button"
              onClick={() => setShowModal(false)}
              className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              data-ocid="settings.lab_admin_modal.submit_button"
              onClick={handleSave}
              className="px-5 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #2563EB, #1976D2)",
              }}
            >
              {editingId ? "Save Changes" : "Add Lab Admin"}
            </button>
          </>
        }
      >
        <div className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-3 py-2.5 rounded-xl">
              {error}
            </div>
          )}
          {[
            {
              label: "Name",
              key: "name",
              type: "text",
              placeholder: "Full name",
              required: true,
              ocid: "settings.lab_admin_modal.input",
            },
            {
              label: "Mobile Number",
              key: "mobile",
              type: "tel",
              placeholder: "10-digit mobile number",
              required: true,
            },
            {
              label: "Email",
              key: "email",
              type: "email",
              placeholder: "email@example.com",
            },
            {
              label: "Assigned Lab / Branch",
              key: "assignedLab",
              type: "text",
              placeholder: "Lab or branch name",
            },
          ].map(({ label, key, type, placeholder, required, ocid }) => (
            <div key={key}>
              <p className="block text-xs font-semibold text-gray-500 mb-1.5">
                {label}
                {required && <span className="text-red-500 ml-0.5">*</span>}
              </p>
              <input
                data-ocid={ocid}
                type={type}
                value={(form as any)[key]}
                onChange={(e) =>
                  setForm((f) => ({ ...f, [key]: e.target.value }))
                }
                placeholder={placeholder}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm"
                style={{ background: "#F7F9FC" }}
              />
            </div>
          ))}
          <div>
            <p className="block text-xs font-semibold text-gray-500 mb-1.5">
              Login Method
            </p>
            <select
              value={form.loginMethod}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  loginMethod: e.target.value as "OTP" | "Password",
                }))
              }
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm"
              style={{ background: "#F7F9FC" }}
            >
              <option value="OTP">OTP (Mobile)</option>
              <option value="Password">Password</option>
            </select>
          </div>
          <div>
            <p className="block text-xs font-semibold text-gray-500 mb-1.5">
              Assigned Hospitals
            </p>
            <MultiSelect
              options={hospitals.map((h) => h.name)}
              selected={form.assignedHospitals}
              onChange={(val) =>
                setForm((f) => ({ ...f, assignedHospitals: val }))
              }
            />
          </div>
          <div>
            <p className="block text-xs font-semibold text-gray-500 mb-1.5">
              Status
            </p>
            <div className="flex items-center gap-3">
              {(["Active", "Disabled"] as const).map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => setForm((f) => ({ ...f, status: s }))}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-semibold transition-all"
                  style={{
                    borderColor: form.status === s ? "#2563EB" : "#E5E7EB",
                    background: form.status === s ? "#EFF6FF" : "#fff",
                    color: form.status === s ? "#2563EB" : "#6B7280",
                  }}
                >
                  {s === "Active" ? (
                    <UserCheck className="w-3.5 h-3.5" />
                  ) : (
                    <UserX className="w-3.5 h-3.5" />
                  )}
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// ─── Phlebotomists Tab ───────────────────────────────────────────────────────

function PhlebotomistsTab({ hospitals }: { hospitals: Hospital[] }) {
  const [phlebs, setPhlebs] = useState<Phlebotomist[]>(() =>
    loadPhlebotomists(),
  );
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<PhlebotomistFormState>(
    emptyPhlebotomistForm(),
  );
  const [error, setError] = useState("");

  const openAdd = () => {
    setForm(emptyPhlebotomistForm());
    setEditingId(null);
    setError("");
    setShowModal(true);
  };

  const openEdit = (p: Phlebotomist) => {
    setForm({
      name: p.name,
      mobile: p.mobile,
      assignedHospitals: p.assignedHospitals,
      status: p.status,
    });
    setEditingId(p.id);
    setError("");
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.name.trim()) {
      setError("Name is required.");
      return;
    }
    if (!form.mobile.trim()) {
      setError("Mobile number is required.");
      return;
    }
    setError("");
    if (editingId) {
      const updated = phlebs.map((p) =>
        p.id === editingId ? { ...p, ...form } : p,
      );
      setPhlebs(updated);
      savePhlebotomists(updated);
    } else {
      const newPhleb: Phlebotomist = {
        ...form,
        id: `ph-${Date.now()}`,
        samplesToday: 0,
        lastLogin: "Never",
        isDemo: false,
      };
      const updated = [newPhleb, ...phlebs];
      setPhlebs(updated);
      savePhlebotomists(updated);
    }
    setShowModal(false);
  };

  const handleToggleStatus = (id: string) => {
    const updated = phlebs.map((p) =>
      p.id === id
        ? { ...p, status: p.status === "Active" ? "Disabled" : "Active" }
        : p,
    ) as Phlebotomist[];
    setPhlebs(updated);
    savePhlebotomists(updated);
  };

  const handleResetDevice = (id: string) => {
    const phleb = phlebs.find((p) => p.id === id);
    if (!phleb) return;
    const confirmed = window.confirm(
      `Reset device for ${phleb.name}? They will need to log in again from their device.`,
    );
    if (!confirmed) return;
    const updated = phlebs.map((p) =>
      p.id === id ? { ...p, deviceId: null, deviceBound: false } : p,
    ) as Phlebotomist[];
    setPhlebs(updated);
    savePhlebotomists(updated);
    window.alert(
      "Device reset successfully. Phlebotomist will need to log in again.",
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">
          {phlebs.length} phlebotomist{phlebs.length !== 1 ? "s" : ""}
        </p>
        <button
          type="button"
          data-ocid="settings.add_phlebotomist.open_modal_button"
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
          style={{
            background: "linear-gradient(135deg, #2563EB, #1976D2)",
            boxShadow: "0 4px 12px rgba(37,99,235,0.3)",
          }}
        >
          <Plus className="w-4 h-4" /> Add Phlebotomist
        </button>
      </div>

      {phlebs.length === 0 ? (
        <div
          className="py-14 flex flex-col items-center justify-center text-center"
          data-ocid="settings.phlebotomists.empty_state"
        >
          <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center mb-3">
            <User className="w-7 h-7 text-teal-400" />
          </div>
          <p className="font-semibold text-gray-700">
            No phlebotomists added yet
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Add field staff to manage sample collections.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {[
                  "Name",
                  "Mobile",
                  "Assigned Hospital",
                  "Samples Today",
                  "Last Login",
                  "Status",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wide"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {phlebs.map((p, idx) => (
                <tr
                  key={p.id}
                  data-ocid={`settings.phlebotomist_table.item.${idx + 1}`}
                  className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors"
                >
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          background:
                            "linear-gradient(135deg, #06B6D4, #2563EB)",
                        }}
                      >
                        <span className="text-white text-xs font-bold">
                          {p.name.charAt(0)}
                        </span>
                      </div>
                      <span className="font-semibold text-gray-800">
                        {p.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-gray-600 font-mono text-xs">
                    {p.mobile}
                  </td>
                  <td className="py-3.5 px-4">
                    {p.assignedHospitals.length === 0 ? (
                      <span className="text-gray-400 text-xs">
                        None assigned
                      </span>
                    ) : (
                      <div className="flex flex-wrap gap-1">
                        {p.assignedHospitals.slice(0, 2).map((h) => (
                          <span
                            key={h}
                            className="px-2 py-0.5 rounded-full text-xs bg-blue-50 text-blue-700 border border-blue-100"
                          >
                            {h}
                          </span>
                        ))}
                        {p.assignedHospitals.length > 2 && (
                          <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-500">
                            +{p.assignedHospitals.length - 2}
                          </span>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="font-semibold text-gray-800">
                      {p.samplesToday}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-400 text-xs">
                    {p.lastLogin}
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={p.status} />
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        data-ocid={`settings.phlebotomist_table.edit_button.${idx + 1}`}
                        onClick={() => openEdit(p)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-blue-50 transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5 text-blue-500" />
                      </button>
                      <button
                        type="button"
                        data-ocid={`settings.phlebotomist_table.toggle.${idx + 1}`}
                        onClick={() => handleToggleStatus(p.id)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                      >
                        {p.status === "Active" ? (
                          <UserX className="w-3.5 h-3.5 text-gray-400" />
                        ) : (
                          <UserCheck className="w-3.5 h-3.5 text-green-500" />
                        )}
                      </button>
                      <button
                        type="button"
                        data-ocid={`settings.phlebotomist_table.reset_button.${idx + 1}`}
                        onClick={() => handleResetDevice(p.id)}
                        className="px-2 py-1 text-xs rounded-lg border border-orange-300 text-orange-600 hover:bg-orange-50 transition-colors"
                      >
                        Reset Device
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title={editingId ? "Edit Phlebotomist" : "Add Phlebotomist"}
        id="settings.phlebotomist_modal.dialog"
        footer={
          <>
            <button
              type="button"
              data-ocid="settings.phlebotomist_modal.cancel_button"
              onClick={() => setShowModal(false)}
              className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              data-ocid="settings.phlebotomist_modal.submit_button"
              onClick={handleSave}
              className="px-5 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #2563EB, #1976D2)",
              }}
            >
              {editingId ? "Save Changes" : "Add Phlebotomist"}
            </button>
          </>
        }
      >
        <div className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-3 py-2.5 rounded-xl">
              {error}
            </div>
          )}
          {[
            {
              label: "Name",
              key: "name",
              type: "text",
              placeholder: "Full name",
              required: true,
              ocid: "settings.phlebotomist_modal.input",
            },
            {
              label: "Mobile Number",
              key: "mobile",
              type: "tel",
              placeholder: "10-digit mobile number",
              required: true,
            },
          ].map(({ label, key, type, placeholder, required, ocid }) => (
            <div key={key}>
              <p className="block text-xs font-semibold text-gray-500 mb-1.5">
                {label}
                {required && <span className="text-red-500 ml-0.5">*</span>}
              </p>
              <input
                data-ocid={ocid}
                type={type}
                value={(form as any)[key]}
                onChange={(e) =>
                  setForm((f) => ({ ...f, [key]: e.target.value }))
                }
                placeholder={placeholder}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm"
                style={{ background: "#F7F9FC" }}
              />
            </div>
          ))}
          <div>
            <p className="block text-xs font-semibold text-gray-500 mb-1.5">
              Assign Hospitals
            </p>
            <MultiSelect
              options={hospitals.map((h) => h.name)}
              selected={form.assignedHospitals}
              onChange={(val) =>
                setForm((f) => ({ ...f, assignedHospitals: val }))
              }
            />
          </div>
          <div>
            <p className="block text-xs font-semibold text-gray-500 mb-1.5">
              Status
            </p>
            <div className="flex items-center gap-3">
              {(["Active", "Disabled"] as const).map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => setForm((f) => ({ ...f, status: s }))}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-semibold transition-all"
                  style={{
                    borderColor: form.status === s ? "#2563EB" : "#E5E7EB",
                    background: form.status === s ? "#EFF6FF" : "#fff",
                    color: form.status === s ? "#2563EB" : "#6B7280",
                  }}
                >
                  {s === "Active" ? (
                    <UserCheck className="w-3.5 h-3.5" />
                  ) : (
                    <UserX className="w-3.5 h-3.5" />
                  )}
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// ─── System Mode Section ──────────────────────────────────────────────────────

function SystemModeSection() {
  const { systemMode, isTestMode, setSystemMode } = useSystemMode();
  const [saving, setSaving] = useState(false);

  const handleSetMode = async (mode: "test" | "production") => {
    setSaving(true);
    try {
      await setSystemMode(mode);
      if (mode === "test") {
        try {
          const phleboRaw = localStorage.getItem("xpertlab_phlebotomists");
          const phlebos: any[] = phleboRaw ? JSON.parse(phleboRaw) : [];
          if (!phlebos.find((p: any) => p.id === "test-phlebo-1")) {
            phlebos.push({
              id: "test-phlebo-1",
              name: "Test Phlebo",
              mobile: "9999999999",
              assignedHospitals: ["Vijaya Hospital"],
              status: "Active",
              samplesToday: 0,
              lastLogin: "Never",
              isTestAccount: true,
            });
            localStorage.setItem(
              "xpertlab_phlebotomists",
              JSON.stringify(phlebos),
            );
          }
          const labRaw = localStorage.getItem("xpertlab_lab_admins");
          const labs: any[] = labRaw ? JSON.parse(labRaw) : [];
          if (!labs.find((l: any) => l.id === "test-lab-admin-1")) {
            labs.push({
              id: "test-lab-admin-1",
              name: "Test Lab Admin",
              mobile: "8888888888",
              email: "test@lab.com",
              assignedLab: "Test Lab",
              loginMethod: "OTP",
              assignedHospitals: ["Vijaya Hospital"],
              status: "Active",
              lastLogin: "Never",
              isTestAccount: true,
            });
            localStorage.setItem("xpertlab_lab_admins", JSON.stringify(labs));
          }
          localStorage.setItem(
            "xpertlab_test_super_admin",
            JSON.stringify({ mobile: "7777777777", role: "superAdmin" }),
          );
        } catch {
          /* noop */
        }
        toast.success("TEST MODE enabled. Test accounts created.");
      } else {
        toast.success("PRODUCTION MODE enabled. OTP 123456 is disabled.");
      }
    } catch {
      toast.error("Failed to update system mode. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleResetTestData = () => {
    localStorage.removeItem("xpertlab_hospital_samples");
    localStorage.removeItem("xpertlab_home_collection");
    toast.success("Test data reset successfully.");
  };

  return (
    <div
      className="bg-white rounded-2xl p-6 mb-6"
      style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
    >
      <div className="flex items-center gap-2 mb-1">
        <Shield className="w-5 h-5 text-blue-600" />
        <h2 className="font-bold text-gray-900" style={{ fontSize: "16px" }}>
          System Mode
        </h2>
      </div>
      <p className="text-sm text-gray-500 mb-4">
        Control whether the system operates in test or production mode.
      </p>

      <div className="flex gap-3 mb-4">
        <button
          type="button"
          data-ocid="system_mode.test_button"
          disabled={saving}
          onClick={() => handleSetMode("test")}
          className="flex-1 py-3 px-4 rounded-xl font-semibold text-sm border-2 transition-all"
          style={
            isTestMode
              ? {
                  background: "linear-gradient(135deg, #2563EB, #06B6D4)",
                  color: "#fff",
                  borderColor: "transparent",
                  boxShadow: "0 4px 12px rgba(37,99,235,0.3)",
                }
              : { background: "#fff", color: "#6B7280", borderColor: "#E5E7EB" }
          }
        >
          TEST MODE
        </button>
        <button
          type="button"
          data-ocid="system_mode.production_button"
          disabled={saving}
          onClick={() => handleSetMode("production")}
          className="flex-1 py-3 px-4 rounded-xl font-semibold text-sm border-2 transition-all"
          style={
            systemMode === "production"
              ? {
                  background: "linear-gradient(135deg, #2563EB, #06B6D4)",
                  color: "#fff",
                  borderColor: "transparent",
                  boxShadow: "0 4px 12px rgba(37,99,235,0.3)",
                }
              : { background: "#fff", color: "#6B7280", borderColor: "#E5E7EB" }
          }
        >
          PRODUCTION MODE
        </button>
      </div>

      <div className="text-xs text-gray-500 mb-5">
        {isTestMode &&
          "TEST MODE active — OTP 123456 is enabled, test accounts are available, demo banner is hidden."}
        {systemMode === "production" &&
          "PRODUCTION MODE active — OTP 123456 is disabled. Real SMS required."}
        {systemMode === "demo" &&
          "Default demo mode — OTP 123456 works, demo banner is visible."}
      </div>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button
            type="button"
            data-ocid="system_mode.reset_button"
            className="text-sm font-semibold border-2 border-red-200 text-red-600 rounded-xl px-4 py-2 hover:bg-red-50 transition-colors"
          >
            Reset Test Data
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset Test Data?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete all hospital samples and home
              collection records. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="system_mode.reset_cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              data-ocid="system_mode.reset_confirm_button"
              onClick={handleResetTestData}
              className="bg-red-600 hover:bg-red-700"
            >
              Reset Data
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function SuperAdminSettingsPage({
  isDemoMode = false,
}: SuperAdminSettingsPageProps) {
  void isDemoMode;
  const [hospitals] = useState<Hospital[]>(() => loadHospitals());

  return (
    <div
      className="min-h-screen pb-[90px] page-fade-in"
      style={{ background: "#F7F9FC" }}
    >
      <div className="max-w-5xl mx-auto px-4 pt-4">
        <PageHeroHeader
          title="Settings"
          description="System configuration and user management"
        />
      </div>

      <div
        className="px-4 py-5"
        style={{
          background: "linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)",
          boxShadow: "0 4px 20px rgba(37,99,235,0.2)",
        }}
      >
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <div
            className="flex items-center justify-center"
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "12px",
              background: "rgba(255,255,255,0.2)",
            }}
          >
            <FlaskConical className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-white" style={{ fontSize: "20px" }}>
              Settings
            </h1>
            <p className="text-white/70" style={{ fontSize: "12px" }}>
              System Mode &amp; User Management
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        <SystemModeSection />

        <Tabs defaultValue="lab-admins">
          <TabsList
            className="mb-6 bg-white border border-gray-100 p-1 rounded-xl"
            style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
          >
            <TabsTrigger
              value="lab-admins"
              data-ocid="settings.lab_admins.tab"
              className="rounded-lg text-sm font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#2563EB] data-[state=active]:to-[#1976D2] data-[state=active]:text-white data-[state=active]:shadow-sm"
            >
              <Shield className="w-4 h-4 mr-1.5" /> Lab Admins
            </TabsTrigger>
            <TabsTrigger
              value="phlebotomists"
              data-ocid="settings.phlebotomists.tab"
              className="rounded-lg text-sm font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#2563EB] data-[state=active]:to-[#1976D2] data-[state=active]:text-white data-[state=active]:shadow-sm"
            >
              <User className="w-4 h-4 mr-1.5" /> Phlebotomists
            </TabsTrigger>
          </TabsList>

          <div
            className="bg-white"
            style={{
              borderRadius: "16px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
              padding: "24px",
            }}
          >
            <TabsContent value="lab-admins">
              <LabAdminsTab hospitals={hospitals} />
            </TabsContent>
            <TabsContent value="phlebotomists">
              <PhlebotomistsTab hospitals={hospitals} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
