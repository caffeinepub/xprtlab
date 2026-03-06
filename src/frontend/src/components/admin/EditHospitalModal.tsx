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
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { Hospital } from "../../backend";
import { useUpdateHospital } from "../../hooks/useQueries";

interface EditHospitalFormValues {
  name: string;
  city: string;
  address: string;
  area: string;
  contactNumber: string;
  isActive: boolean;
}

interface EditHospitalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hospital: Hospital;
}

export default function EditHospitalModal({
  open,
  onOpenChange,
  hospital,
}: EditHospitalModalProps) {
  const updateHospital = useUpdateHospital();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EditHospitalFormValues>({
    defaultValues: {
      name: hospital.name,
      city: hospital.city,
      address: hospital.address,
      area: hospital.area,
      contactNumber: hospital.contactNumber,
      isActive: hospital.isActive,
    },
  });

  // Re-populate when hospital changes
  useEffect(() => {
    reset({
      name: hospital.name,
      city: hospital.city,
      address: hospital.address,
      area: hospital.area,
      contactNumber: hospital.contactNumber,
      isActive: hospital.isActive,
    });
  }, [hospital, reset]);

  const isActive = watch("isActive");

  const onSubmit = async (values: EditHospitalFormValues) => {
    try {
      await updateHospital.mutateAsync({
        id: hospital.id,
        name: values.name.trim(),
        city: values.city.trim(),
        address: values.address.trim(),
        area: values.area.trim(),
        contactNumber: values.contactNumber.trim(),
      });
      toast.success(`Hospital "${values.name}" updated successfully.`);
      onOpenChange(false);
    } catch (err: any) {
      toast.error(`Failed to update hospital: ${err?.message ?? err}`);
    }
  };

  const handleClose = () => {
    if (updateHospital.isPending) return;
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Hospital</DialogTitle>
          <DialogDescription>
            Update the hospital details below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Hospital Name */}
          <div className="space-y-1">
            <Label htmlFor="edit-name">
              Hospital Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="edit-name"
              placeholder="e.g. City General Hospital"
              {...register("name", { required: "Hospital name is required" })}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* City */}
          <div className="space-y-1">
            <Label htmlFor="edit-city">City</Label>
            <Input
              id="edit-city"
              placeholder="e.g. Mumbai"
              {...register("city")}
            />
          </div>

          {/* Address */}
          <div className="space-y-1">
            <Label htmlFor="edit-address">Address</Label>
            <Textarea
              id="edit-address"
              placeholder="Full address..."
              rows={2}
              {...register("address")}
            />
          </div>

          {/* Area / Zone */}
          <div className="space-y-1">
            <Label htmlFor="edit-area">Area / Zone</Label>
            <Input
              id="edit-area"
              placeholder="e.g. North Zone"
              {...register("area")}
            />
          </div>

          {/* Contact Number */}
          <div className="space-y-1">
            <Label htmlFor="edit-contactNumber">Contact Number</Label>
            <Input
              id="edit-contactNumber"
              type="tel"
              placeholder="e.g. +91 98765 43210"
              {...register("contactNumber")}
            />
          </div>

          {/* Active Toggle */}
          <div className="flex items-center justify-between p-3 bg-muted/40 rounded-lg">
            <div>
              <p className="text-sm font-medium text-foreground">Status</p>
              <p className="text-xs text-muted-foreground">
                {isActive ? "Hospital is Active" : "Hospital is Inactive"}
              </p>
            </div>
            <Switch
              checked={isActive}
              onCheckedChange={(val) => setValue("isActive", val)}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={updateHospital.isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={updateHospital.isPending}>
              {updateHospital.isPending && (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              )}
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
