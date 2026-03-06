import { Switch } from "@/components/ui/switch";
import { AlertCircle, Loader2, X } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { TestError } from "../../backend";
import { useAddTest } from "../../hooks/useQueries";

interface AddTestFormValues {
  name: string;
  code: string;
  sampleType: string;
  mrp: number;
  isActive: boolean;
}

interface AddTestModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AddTestModal({ open, onClose }: AddTestModalProps) {
  const addTest = useAddTest();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    setError,
    formState: { errors },
  } = useForm<AddTestFormValues>({
    defaultValues: {
      name: "",
      code: "",
      sampleType: "",
      mrp: 0,
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

  const onSubmit = async (values: AddTestFormValues) => {
    try {
      const result = await addTest.mutateAsync({
        name: values.name.trim(),
        code: values.code.trim().toUpperCase(),
        sampleType: values.sampleType.trim(),
        price: BigInt(Math.round(values.mrp)),
        isActive: values.isActive,
      });

      if (result.__kind__ === "err") {
        if (result.err === TestError.duplicateCode) {
          setError("code", {
            type: "manual",
            message: "Test code already exists.",
          });
          return;
        }
        toast.error("Failed to add test. Please try again.");
        return;
      }

      toast.success(`Test "${values.name}" added successfully`);
      reset();
      onClose();
    } catch (err: any) {
      const msg = err?.message ?? String(err);
      toast.error(`Failed to add test: ${msg}`);
    }
  };

  const handleClose = () => {
    if (addTest.isPending) return;
    reset();
    onClose();
  };

  if (!open) return null;

  const hasGeneralError = addTest.isError;

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
        className="relative w-full max-w-md bg-white rounded-2xl overflow-hidden p-0 border-0"
        style={{
          boxShadow:
            "0 8px 40px rgba(0,0,0,0.18), 0 2px 12px rgba(13,71,161,0.10)",
          animation: "modalPanelIn 200ms ease-in-out forwards",
        }}
        aria-labelledby="add-test-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-7 pt-7 pb-4 border-b border-gray-100">
          <div>
            <h2
              id="add-test-title"
              className="text-lg font-bold text-gray-900 tracking-tight"
            >
              Add New Test
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Fill in the details below to add a new test to the master list.
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            disabled={addTest.isPending}
            className="ml-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Error Banner */}
        {hasGeneralError && (
          <div className="mx-7 mt-5 flex items-start gap-3 rounded-xl bg-red-50 border border-red-200 px-4 py-3">
            <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
            <p className="text-sm text-red-700 font-medium">
              Failed to add test. Please check your inputs and try again.
            </p>
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-7 pt-5 pb-7 space-y-5"
        >
          {/* Test Name */}
          <div className="space-y-1.5">
            <label
              htmlFor="add-name"
              className="block text-xs font-semibold text-gray-700 uppercase tracking-wide"
            >
              Test Name <span className="text-red-500">*</span>
            </label>
            <input
              id="add-name"
              placeholder="e.g. Complete Blood Count"
              className={`w-full rounded-xl border-2 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 bg-white outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${
                errors.name ? "border-red-400" : "border-gray-200"
              }`}
              {...register("name", { required: "Test name is required" })}
            />
            {errors.name && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Test Code */}
          <div className="space-y-1.5">
            <label
              htmlFor="add-code"
              className="block text-xs font-semibold text-gray-700 uppercase tracking-wide"
            >
              Test Code <span className="text-red-500">*</span>
            </label>
            <input
              id="add-code"
              placeholder="e.g. CBC"
              className={`w-full rounded-xl border-2 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 bg-white outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100 uppercase ${
                errors.code ? "border-red-400" : "border-gray-200"
              }`}
              {...register("code", {
                required: "Test code is required",
                pattern: {
                  value: /^[A-Za-z0-9_-]+$/,
                  message:
                    "Only letters, numbers, hyphens and underscores allowed",
                },
              })}
            />
            {errors.code && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.code.message}
              </p>
            )}
          </div>

          {/* Sample Type */}
          <div className="space-y-1.5">
            <label
              htmlFor="add-sampleType"
              className="block text-xs font-semibold text-gray-700 uppercase tracking-wide"
            >
              Sample Type <span className="text-red-500">*</span>
            </label>
            <input
              id="add-sampleType"
              placeholder="e.g. Blood, Urine, Serum"
              className={`w-full rounded-xl border-2 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 bg-white outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${
                errors.sampleType ? "border-red-400" : "border-gray-200"
              }`}
              {...register("sampleType", {
                required: "Sample type is required",
              })}
            />
            {errors.sampleType && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.sampleType.message}
              </p>
            )}
          </div>

          {/* MRP */}
          <div className="space-y-1.5">
            <label
              htmlFor="add-mrp"
              className="block text-xs font-semibold text-gray-700 uppercase tracking-wide"
            >
              MRP (₹) <span className="text-red-500">*</span>
            </label>
            <input
              id="add-mrp"
              type="number"
              min={0}
              step={1}
              placeholder="e.g. 500"
              className={`w-full rounded-xl border-2 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 bg-white outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${
                errors.mrp ? "border-red-400" : "border-gray-200"
              }`}
              {...register("mrp", {
                required: "MRP is required",
                min: { value: 0, message: "MRP must be 0 or more" },
                valueAsNumber: true,
              })}
            />
            {errors.mrp && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.mrp.message}
              </p>
            )}
          </div>

          {/* Active Toggle */}
          <div className="flex items-center justify-between rounded-xl border-2 border-gray-200 px-4 py-3 bg-gray-50">
            <div>
              <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                Status
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                {isActive ? "Test is Active" : "Test is Inactive"}
              </p>
            </div>
            <Switch
              checked={isActive}
              onCheckedChange={(val) => setValue("isActive", val)}
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col items-center gap-3 pt-2">
            {/* Primary Submit Button */}
            <button
              type="submit"
              disabled={addTest.isPending}
              className="w-full flex items-center justify-center gap-2 h-12 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed disabled:hover:scale-100"
              style={{
                background: addTest.isPending
                  ? undefined
                  : "linear-gradient(to right, #0D47A1, #26C6DA)",
                backgroundColor: addTest.isPending ? "#9ca3af" : undefined,
              }}
            >
              {addTest.isPending && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
              Add Test
            </button>

            {/* Cancel Button */}
            <button
              type="button"
              onClick={handleClose}
              disabled={addTest.isPending}
              className="h-10 px-6 rounded-xl border-2 border-gray-300 bg-transparent text-sm font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
}
