import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Ban,
  Building2,
  MapPin,
  Pencil,
  Phone,
  Plus,
  RefreshCw,
  Search,
} from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import type { Hospital } from "../../backend";
import PageHeroHeader from "../../components/shared/PageHeroHeader";
import {
  useAddHospital,
  useDisableHospital,
  useHospitals,
  useUpdateHospital,
} from "../../hooks/useQueries";

interface HospitalManagementPageProps {
  role?: string;
  onNavigate?: (route: string) => void;
}

interface HospitalFormState {
  name: string;
  city: string;
  address: string;
  area: string;
  contactNumber: string;
}

const emptyForm = (): HospitalFormState => ({
  name: "",
  city: "",
  address: "",
  area: "",
  contactNumber: "",
});

export default function HospitalManagementPage({
  role = "superAdmin",
  onNavigate: _onNavigate,
}: HospitalManagementPageProps) {
  const isSuperAdmin = role === "superAdmin";
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<HospitalFormState>(emptyForm());
  const [formError, setFormError] = useState("");

  const {
    data: hospitals = [],
    isLoading,
    refetch,
  } = useHospitals(search || undefined);
  const addHospital = useAddHospital();
  const updateHospital = useUpdateHospital();
  const disableHospital = useDisableHospital();

  const openAdd = () => {
    setForm(emptyForm());
    setEditingId(null);
    setFormError("");
    setShowModal(true);
  };

  const openEdit = (h: Hospital) => {
    setForm({
      name: h.name,
      city: h.city,
      address: h.address,
      area: h.area,
      contactNumber: h.contactNumber,
    });
    setEditingId(h.id);
    setFormError("");
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      setFormError("Hospital name is required.");
      return;
    }
    if (!form.city.trim()) {
      setFormError("City is required.");
      return;
    }
    setFormError("");
    try {
      if (editingId) {
        await updateHospital.mutateAsync({
          id: editingId,
          name: form.name,
          city: form.city,
          address: form.address,
          area: form.area,
          contactNumber: form.contactNumber,
        });
        toast.success("Hospital updated successfully");
      } else {
        await addHospital.mutateAsync({
          name: form.name,
          city: form.city,
          address: form.address,
          area: form.area,
          contactNumber: form.contactNumber,
        });
        toast.success("Hospital added successfully");
      }
      setShowModal(false);
    } catch (err: any) {
      setFormError(err?.message ?? "Failed to save hospital.");
    }
  };

  const handleDisable = async (h: Hospital) => {
    if (
      !window.confirm(
        `Disable "${h.name}"? This will prevent new samples from being assigned.`,
      )
    )
      return;
    try {
      await disableHospital.mutateAsync(h.id);
      toast.success(`${h.name} disabled.`);
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to disable hospital.");
    }
  };

  const isBusy = addHospital.isPending || updateHospital.isPending;

  return (
    <div className="min-h-screen bg-background pb-[90px]">
      <div className="px-4 pt-4">
        <PageHeroHeader
          title="🏥 Hospital Management"
          description="Manage hospitals, assignments, and phlebotomist coverage"
          actionLabel={isSuperAdmin ? "+ Add Hospital" : undefined}
          onAction={isSuperAdmin ? openAdd : undefined}
        />
      </div>

      {/* Gradient header bar */}
      <div
        className="px-4 py-4 mb-4"
        style={{
          background: "linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)",
        }}
      >
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-white" style={{ fontSize: "20px" }}>
              🏥 Hospital Management
            </h1>
            <p className="text-white/70" style={{ fontSize: "12px" }}>
              Super Admin Control
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 space-y-4">
        {/* Search + refresh */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search hospitals..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
              data-ocid="hospitals.search_input"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => refetch()}
            disabled={isLoading}
          >
            <RefreshCw
              className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
            />
          </Button>
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-border overflow-hidden shadow-card bg-card">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Hospital Name</TableHead>
                <TableHead className="font-semibold">Location</TableHead>
                <TableHead className="font-semibold">Contact</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                {isSuperAdmin && (
                  <TableHead className="font-semibold text-right">
                    Actions
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }, (_, i) => `skel-${i}`).map((k) => (
                  <TableRow key={k}>
                    <TableCell>
                      <Skeleton className="h-4 w-40" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-28" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-24" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-16" />
                    </TableCell>
                    {isSuperAdmin && (
                      <TableCell>
                        <Skeleton className="h-4 w-20 ml-auto" />
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : hospitals.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={isSuperAdmin ? 5 : 4}
                    className="text-center text-muted-foreground py-10"
                    data-ocid="hospitals.empty_state"
                  >
                    {search
                      ? "No hospitals match your search."
                      : "No hospitals found. Add your first hospital."}
                  </TableCell>
                </TableRow>
              ) : (
                (hospitals as Hospital[]).map((h, idx) => (
                  <TableRow
                    key={h.id}
                    className="hover:bg-muted/30 transition-colors"
                    data-ocid={`hospitals.table.item.${idx + 1}`}
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                          <Building2 className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="font-medium">{h.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-muted-foreground text-sm">
                        <MapPin className="w-3.5 h-3.5" />
                        {h.city}
                        {h.area ? `, ${h.area}` : ""}
                      </div>
                    </TableCell>
                    <TableCell>
                      {h.contactNumber ? (
                        <div className="flex items-center gap-1 text-muted-foreground text-sm">
                          <Phone className="w-3.5 h-3.5" />
                          {h.contactNumber}
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={h.isActive ? "default" : "secondary"}
                        className={
                          h.isActive
                            ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                            : ""
                        }
                      >
                        {h.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    {isSuperAdmin && (
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => openEdit(h)}
                            title="Edit hospital"
                            data-ocid={`hospitals.table.edit_button.${idx + 1}`}
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => handleDisable(h)}
                            title="Disable hospital"
                            disabled={!h.isActive || disableHospital.isPending}
                            data-ocid={`hospitals.table.delete_button.${idx + 1}`}
                          >
                            <Ban className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <button
            type="button"
            className="absolute inset-0 bg-black/40 cursor-default"
            onClick={() => setShowModal(false)}
            aria-label="Close modal"
          />
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 flex flex-col"
            style={{ maxHeight: "90vh" }}
            data-ocid="hospitals.modal.dialog"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">
                {editingId ? "Edit Hospital" : "Add New Hospital"}
              </h2>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-400"
                data-ocid="hospitals.modal.close_button"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto flex-1 px-6 py-4 space-y-4">
              {formError && (
                <div
                  className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3"
                  data-ocid="hospitals.modal.error_state"
                >
                  {formError}
                </div>
              )}
              {(
                [
                  {
                    label: "Hospital Name *",
                    key: "name" as const,
                    placeholder: "e.g. City Care Hospital",
                  },
                  {
                    label: "City *",
                    key: "city" as const,
                    placeholder: "e.g. Hyderabad",
                  },
                  {
                    label: "Area / Zone",
                    key: "area" as const,
                    placeholder: "e.g. Banjara Hills",
                  },
                  {
                    label: "Address",
                    key: "address" as const,
                    placeholder: "Full address",
                  },
                  {
                    label: "Contact Number",
                    key: "contactNumber" as const,
                    placeholder: "e.g. 9800000000",
                  },
                ] as const
              ).map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label
                    htmlFor={`hosp-field-${key}`}
                    className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1"
                  >
                    {label}
                  </label>
                  <input
                    id={`hosp-field-${key}`}
                    type="text"
                    value={form[key]}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, [key]: e.target.value }))
                    }
                    placeholder={placeholder}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                    data-ocid="hospitals.modal.input"
                  />
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors"
                data-ocid="hospitals.modal.cancel_button"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={isBusy}
                className="px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90 disabled:opacity-60"
                style={{
                  background: "linear-gradient(135deg,#2563EB,#1976D2)",
                }}
                data-ocid="hospitals.modal.submit_button"
              >
                {isBusy
                  ? "Saving..."
                  : editingId
                    ? "Save Changes"
                    : "Add Hospital"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
