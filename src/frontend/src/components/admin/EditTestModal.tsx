import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { AlertTriangle, Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { TestError, type TestOutput } from "../../backend";
import { useUpdateTest } from "../../hooks/useQueries";
import { updateDemoTestMaster } from "../../utils/demoStorage";
import { computeProfitPerTest } from "../../utils/profitUtils";

interface EditTestFormValues {
  name: string;
  code: string;
  sampleType: string;
  mrp: number;
  labCost: number;
  doctorCommission: number;
  isActive: boolean;
}

interface EditTestModalProps {
  open: boolean;
  test: TestOutput | null;
  onClose: () => void;
}

export default function EditTestModal({
  open,
  test,
  onClose,
}: EditTestModalProps) {
  const updateTest = useUpdateTest();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    setError,
    formState: { errors },
  } = useForm<EditTestFormValues>({
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
  const profitPerTest = computeProfitPerTest(
    watchedMrp ?? 0,
    watchedLabCost ?? 0,
    watchedDoctorCommission ?? 0,
  );
  const showLossWarning = profitPerTest < 0 && (watchedMrp ?? 0) > 0;

  // Pre-populate form when test changes
  useEffect(() => {
    if (test) {
      reset({
        name: test.name,
        code: test.code,
        sampleType: test.sampleType,
        mrp: Number(test.price),
        labCost: (test as any).labCost ?? 0,
        doctorCommission: (test as any).doctorCommission ?? 0,
        isActive: test.isActive,
      });
    }
  }, [test, reset]);

  const onSubmit = async (values: EditTestFormValues) => {
    if (!test) return;
    try {
      const result = await updateTest.mutateAsync({
        code: test.code,
        input: {
          name: values.name.trim(),
          code: values.code.trim().toUpperCase(),
          sampleType: values.sampleType.trim(),
          price: BigInt(Math.round(values.mrp)),
          isActive: values.isActive,
        },
      });

      if (result.__kind__ === "err") {
        if (result.err === TestError.duplicateCode) {
          setError("code", {
            type: "manual",
            message: "Test code already exists.",
          });
          return; // Do not close modal
        }
        toast.error("Failed to update test. Please try again.");
        return;
      }

      // Persist labCost & doctorCommission to demo storage
      updateDemoTestMaster(test.code, {
        labCost: values.labCost ?? 0,
        doctorCommissionPct: values.doctorCommission ?? 0,
        mrp: values.mrp,
      });

      toast.success(`Test "${values.name}" updated successfully`);
      onClose();
    } catch (err: any) {
      const msg = err?.message ?? String(err);
      toast.error(`Failed to update test: ${msg}`);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o) handleClose();
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Test</DialogTitle>
          <DialogDescription>
            Update the details for this test. You may also change the Test Code.
          </DialogDescription>
        </DialogHeader>

        {/* Loss Warning Banner */}
        {showLossWarning && (
          <div className="flex items-start gap-3 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 mt-2">
            <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
            <p className="text-sm text-amber-800 font-medium">
              Warning: This test will generate negative profit. (MRP ₹
              {watchedMrp} − Lab Cost ₹{watchedLabCost ?? 0} − Commission ₹
              {Math.round(commissionAmt)} = ₹{Math.round(profitPerTest)})
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
          {/* Test Name */}
          <div className="space-y-1">
            <Label htmlFor="edit-name">
              Test Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="edit-name"
              placeholder="e.g. Complete Blood Count"
              {...register("name", { required: "Test name is required" })}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Test Code (now editable) */}
          <div className="space-y-1">
            <Label htmlFor="edit-code">
              Test Code <span className="text-destructive">*</span>
            </Label>
            <Input
              id="edit-code"
              placeholder="e.g. CBC"
              className="uppercase"
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
              <p className="text-xs text-destructive">{errors.code.message}</p>
            )}
          </div>

          {/* Sample Type */}
          <div className="space-y-1">
            <Label htmlFor="edit-sampleType">
              Sample Type <span className="text-destructive">*</span>
            </Label>
            <Input
              id="edit-sampleType"
              placeholder="e.g. Blood, Urine, Serum"
              {...register("sampleType", {
                required: "Sample type is required",
              })}
            />
            {errors.sampleType && (
              <p className="text-xs text-destructive">
                {errors.sampleType.message}
              </p>
            )}
          </div>

          {/* MRP */}
          <div className="space-y-1">
            <Label htmlFor="edit-mrp">
              MRP (₹) <span className="text-destructive">*</span>
            </Label>
            <Input
              id="edit-mrp"
              type="number"
              min={0}
              step={1}
              placeholder="e.g. 500"
              {...register("mrp", {
                required: "MRP is required",
                min: { value: 0, message: "MRP must be 0 or more" },
                valueAsNumber: true,
              })}
            />
            {errors.mrp && (
              <p className="text-xs text-destructive">{errors.mrp.message}</p>
            )}
          </div>

          {/* Lab Cost */}
          <div className="space-y-1">
            <Label htmlFor="edit-labCost">Lab Cost (₹)</Label>
            <Input
              id="edit-labCost"
              type="number"
              min={0}
              step={1}
              placeholder="e.g. 40"
              {...register("labCost", {
                min: { value: 0, message: "Lab cost must be 0 or more" },
                valueAsNumber: true,
              })}
            />
            {errors.labCost && (
              <p className="text-xs text-destructive">
                {errors.labCost.message}
              </p>
            )}
          </div>

          {/* Doctor Commission */}
          <div className="space-y-1">
            <Label htmlFor="edit-doctorCommission">Doctor Commission (%)</Label>
            <Input
              id="edit-doctorCommission"
              type="number"
              min={0}
              max={100}
              step={0.01}
              placeholder="e.g. 50"
              {...register("doctorCommission", {
                min: { value: 0, message: "Commission must be 0 or more" },
                max: { value: 100, message: "Commission cannot exceed 100%" },
                valueAsNumber: true,
              })}
            />
            {errors.doctorCommission && (
              <p className="text-xs text-destructive">
                {errors.doctorCommission.message}
              </p>
            )}
          </div>

          {/* Profit Preview */}
          {(watchedMrp ?? 0) > 0 && (
            <div className="rounded-lg bg-muted/50 border border-border px-4 py-2.5 text-xs flex items-center gap-3">
              <span className="text-muted-foreground">
                Commission: ₹{Math.round(commissionAmt)}
              </span>
              <span className="text-muted-foreground">|</span>
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
          <div className="flex items-center justify-between rounded-lg border border-border p-3">
            <div>
              <p className="text-sm font-medium">Status</p>
              <p className="text-xs text-muted-foreground">
                {isActive ? "Test is Active" : "Test is Inactive"}
              </p>
            </div>
            <Switch
              checked={isActive}
              onCheckedChange={(val) => setValue("isActive", val)}
            />
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={updateTest.isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={updateTest.isPending}>
              {updateTest.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
