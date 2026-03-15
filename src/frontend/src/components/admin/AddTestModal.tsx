import { Switch } from "@/components/ui/switch";
import { AlertCircle, AlertTriangle, Loader2, X } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { TestError } from "../../backend";
import { useAddTest } from "../../hooks/useQueries";
import { addDemoTestMaster } from "../../utils/demoStorage";
import { computeProfitPerTest } from "../../utils/profitUtils";

interface AddTestFormValues {
  name: string;
  code: string;
  sampleType: string;
  mrp: number;
  labCost: number;
  doctorCommission: number;
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
      labCost: 0,
      doctorCommission: 0,
      isActive: true,
    },
  });

  const isActive = watch("isActive");
  const watchedMrp = watch("mrp");
  const watchedLabCost = watch("labCost");
  const watchedDoctorCommission = watch("doctorCommission");

  const commissionAmt =
    (watchedMrp ?? 0) * ((watchedDoctorCommission ?? 0) / 100);
  const profitPerTest =
    (watchedMrp ?? 0) - (watchedLabCost ?? 0) - commissionAmt;
  const showLossWarning = profitPerTest < 0 && (watchedMrp ?? 0) > 0;

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

      // Persist labCost & doctorCommission to demo storage
      const code = values.code.trim().toUpperCase();
      addDemoTestMaster({
        id: code,
        testName: values.name.trim(),
        testCode: code,
        mrp: values.mrp,
        labCost: values.labCost ?? 0,
        doctorCommissionPct: values.doctorCommission ?? 0,
        sampleType: values.sampleType.trim(),
        isActive: values.isActive,
      });

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
        className="relative w-full max-w-md bg-white rounded-2xl border-0 flex flex-col"
        style={{
          boxShadow:
            "0 8px 40px rgba(0,0,0,0.18), 0 2px 12px rgba(13,71,161,0.10)",
          animation: "modalPanelIn 200ms ease-in-out forwards",
          maxHeight: "90vh",
          overflow: "hidden",
        }}
        aria-labelledby="add-test-title"
      >
        {/* Sticky Header */}
        <div className="flex-shrink-0 flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100 bg-white">
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

        {/* Scrollable Form Body */}
        <form
          id="add-test-form"
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 overflow-y-auto px-6 py-5 space-y-5"
          style={{ overflowY: "auto", WebkitOverflowScrolling: "touch" }}
        >
          {/* Error Banner */}
          {hasGeneralError && (
            <div className="flex items-start gap-3 rounded-xl bg-red-50 border border-red-200 px-4 py-3">
              <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
              <p className="text-sm text-red-700 font-medium">
                Failed to add test. Please check your inputs and try again.
              </p>
            </div>
          )}

          {/* Loss Warning Banner */}
          {showLossWarning && (
            <div className="flex items-start gap-3 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3">
              <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
              <p className="text-sm text-amber-800 font-medium">
                Warning: This test will generate negative profit. (MRP ₹
                {watchedMrp} − Lab Cost ₹{watchedLabCost ?? 0} − Commission ₹
                {Math.round(commissionAmt)} = ₹{Math.round(profitPerTest)})
              </p>
            </div>
          )}

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

          {/* Lab Cost */}
          <div className="space-y-1.5">
            <label
              htmlFor="add-labCost"
              className="block text-xs font-semibold text-gray-700 uppercase tracking-wide"
            >
              Lab Cost (₹)
            </label>
            <input
              id="add-labCost"
              type="number"
              min={0}
              step={1}
              placeholder="e.g. 40"
              className="w-full rounded-xl border-2 border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 bg-white outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              {...register("labCost", {
                min: { value: 0, message: "Lab cost must be 0 or more" },
                valueAsNumber: true,
              })}
            />
            {errors.labCost && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.labCost.message}
              </p>
            )}
          </div>

          {/* Doctor Commission */}
          <div className="space-y-1.5">
            <label
              htmlFor="add-doctorCommission"
              className="block text-xs font-semibold text-gray-700 uppercase tracking-wide"
            >
              Doctor Commission (%)
            </label>
            <input
              id="add-doctorCommission"
              type="number"
              min={0}
              max={100}
              step={0.01}
              placeholder="e.g. 50"
              className="w-full rounded-xl border-2 border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 bg-white outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              {...register("doctorCommission", {
                min: { value: 0, message: "Commission must be 0 or more" },
                max: { value: 100, message: "Commission cannot exceed 100%" },
                valueAsNumber: true,
              })}
            />
            {errors.doctorCommission && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.doctorCommission.message}
              </p>
            )}
          </div>

          {/* Profit Preview */}
          {(watchedMrp ?? 0) > 0 && (
            <div className="rounded-xl bg-gray-50 border border-gray-200 px-4 py-2.5 text-xs flex items-center gap-3">
              <span className="text-gray-500">
                Commission: ₹{Math.round(commissionAmt)}
              </span>
              <span className="text-gray-400">|</span>
              <span
                className={
                  profitPerTest >= 0
                    ? "text-green-600 font-semibold"
                    : "text-red-600 font-semibold"
                }
              >
                Profit per Test: ₹{Math.round(profitPerTest)}
              </span>
            </div>
          )}

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
        </form>

        {/* Sticky Footer with Action Buttons */}
        <div className="flex-shrink-0 flex items-center gap-3 px-6 py-4 border-t border-gray-100 bg-white">
          <button
            type="button"
            onClick={handleClose}
            disabled={addTest.isPending}
            className="flex-1 h-10 rounded-xl border-2 border-gray-300 bg-transparent text-sm font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            data-ocid="add-test.cancel_button"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="add-test-form"
            disabled={addTest.isPending}
            className="flex-[2] flex items-center justify-center gap-2 h-10 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed disabled:hover:scale-100"
            style={{
              background: addTest.isPending
                ? undefined
                : "linear-gradient(to right, #2563EB, #26C6DA)",
              backgroundColor: addTest.isPending ? "#9ca3af" : undefined,
            }}
            data-ocid="add-test.submit_button"
          >
            {addTest.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            Add Test
          </button>
        </div>
      </dialog>
    </div>
  );
}
