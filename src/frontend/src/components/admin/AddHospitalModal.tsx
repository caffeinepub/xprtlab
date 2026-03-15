import { Switch } from "@/components/ui/switch";
import { AlertCircle, Loader2, X } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAddHospital } from "../../hooks/useQueries";

interface AddHospitalFormValues {
  name: string;
  city: string;
  address: string;
  area: string;
  contactNumber: string;
  isActive: boolean;
}

interface AddHospitalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddHospitalModal({
  open,
  onOpenChange,
}: AddHospitalModalProps) {
  const addHospital = useAddHospital();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AddHospitalFormValues>({
    defaultValues: {
      name: "",
      city: "",
      address: "",
      area: "",
      contactNumber: "",
      isActive: true,
    },
  });

  const isActive = watch("isActive");

  // Lock body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const onSubmit = async (values: AddHospitalFormValues) => {
    try {
      await addHospital.mutateAsync({
        name: values.name.trim(),
        city: values.city.trim(),
        address: values.address.trim(),
        area: values.area.trim(),
        contactNumber: values.contactNumber.trim(),
      });
      toast.success(`Hospital "${values.name}" added successfully.`);
      reset();
      onOpenChange(false);
    } catch (err: any) {
      toast.error(`Failed to add hospital: ${err?.message ?? err}`);
    }
  };

  const handleClose = () => {
    if (addHospital.isPending) return;
    reset();
    onOpenChange(false);
  };

  if (!open) return null;

  const hasGeneralError = addHospital.isError;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ animation: "modalBackdropIn 200ms ease-in-out forwards" }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={handleClose}
        onKeyDown={(e) => e.key === "Escape" && handleClose()}
        aria-hidden="true"
      />

      {/* Modal Panel */}
      <dialog
        open
        className="relative w-full max-w-md bg-white rounded-2xl border-0 flex flex-col"
        style={{
          boxShadow:
            "0 8px 40px rgba(0,0,0,0.18), 0 2px 12px rgba(13,71,161,0.10)",
          animation: "modalPanelIn 200ms ease-in-out forwards",
          maxHeight: "90vh",
          overflow: "hidden",
        }}
        aria-labelledby="add-hospital-title"
      >
        {/* Sticky Header */}
        <div className="flex-shrink-0 flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100 bg-white">
          <div>
            <h2
              id="add-hospital-title"
              className="text-lg font-bold text-gray-900 tracking-tight"
            >
              Add Hospital
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Fill in the details to add a new hospital.
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            disabled={addHospital.isPending}
            className="ml-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form
          id="add-hospital-form"
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 overflow-y-auto px-6 py-5 space-y-5"
          style={{ overflowY: "auto", WebkitOverflowScrolling: "touch" }}
        >
          {/* Error Banner */}
          {hasGeneralError && (
            <div className="flex items-start gap-3 rounded-xl bg-red-50 border border-red-200 px-4 py-3">
              <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
              <p className="text-sm text-red-700 font-medium">
                Failed to add hospital. Please check your inputs and try again.
              </p>
            </div>
          )}

          {/* Hospital Name */}
          <div className="space-y-1.5">
            <label
              htmlFor="hosp-name"
              className="block text-xs font-semibold text-gray-700 uppercase tracking-wide"
            >
              Hospital Name <span className="text-red-500">*</span>
            </label>
            <input
              id="hosp-name"
              placeholder="e.g. City General Hospital"
              className={`w-full rounded-xl border-2 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 bg-white outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${
                errors.name ? "border-red-400" : "border-gray-200"
              }`}
              {...register("name", { required: "Hospital name is required" })}
            />
            {errors.name && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.name.message}
              </p>
            )}
          </div>

          {/* City */}
          <div className="space-y-1.5">
            <label
              htmlFor="hosp-city"
              className="block text-xs font-semibold text-gray-700 uppercase tracking-wide"
            >
              City
            </label>
            <input
              id="hosp-city"
              placeholder="e.g. Mumbai"
              className="w-full rounded-xl border-2 border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 bg-white outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              {...register("city")}
            />
          </div>

          {/* Address */}
          <div className="space-y-1.5">
            <label
              htmlFor="hosp-address"
              className="block text-xs font-semibold text-gray-700 uppercase tracking-wide"
            >
              Address
            </label>
            <textarea
              id="hosp-address"
              placeholder="Full address..."
              rows={2}
              className="w-full rounded-xl border-2 border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 bg-white outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none"
              {...register("address")}
            />
          </div>

          {/* Area / Zone */}
          <div className="space-y-1.5">
            <label
              htmlFor="hosp-area"
              className="block text-xs font-semibold text-gray-700 uppercase tracking-wide"
            >
              Area / Zone
            </label>
            <input
              id="hosp-area"
              placeholder="e.g. North Zone"
              className="w-full rounded-xl border-2 border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 bg-white outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              {...register("area")}
            />
          </div>

          {/* Contact Number */}
          <div className="space-y-1.5">
            <label
              htmlFor="hosp-contact"
              className="block text-xs font-semibold text-gray-700 uppercase tracking-wide"
            >
              Contact Number
            </label>
            <input
              id="hosp-contact"
              type="tel"
              placeholder="e.g. +91 98765 43210"
              className="w-full rounded-xl border-2 border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 bg-white outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              {...register("contactNumber")}
            />
          </div>

          {/* Active Toggle */}
          <div className="flex items-center justify-between rounded-xl border-2 border-gray-200 px-4 py-3 bg-gray-50">
            <div>
              <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                Status
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                {isActive ? "Hospital is Active" : "Hospital is Inactive"}
              </p>
            </div>
            <Switch
              checked={isActive}
              onCheckedChange={(val) => setValue("isActive", val)}
            />
          </div>
        </form>

        {/* Sticky Footer with Action Buttons */}
        <div className="flex-shrink-0 flex items-center gap-3 px-6 py-4 border-t border-gray-100 bg-white">
          <button
            type="button"
            onClick={handleClose}
            disabled={addHospital.isPending}
            className="flex-1 h-10 rounded-xl border-2 border-gray-300 bg-transparent text-sm font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            data-ocid="add-hospital.cancel_button"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="add-hospital-form"
            disabled={addHospital.isPending}
            className="flex-[2] flex items-center justify-center gap-2 h-10 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed disabled:hover:scale-100"
            style={{
              background: addHospital.isPending
                ? undefined
                : "linear-gradient(to right, #2563EB, #26C6DA)",
              backgroundColor: addHospital.isPending ? "#9ca3af" : undefined,
            }}
            data-ocid="add-hospital.submit_button"
          >
            {addHospital.isPending && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}
            Add Hospital
          </button>
        </div>
      </dialog>
    </div>
  );
}
