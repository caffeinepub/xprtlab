import React from 'react';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useAddHospital } from '../../hooks/useQueries';
import { toast } from 'sonner';

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

export default function AddHospitalModal({ open, onOpenChange }: AddHospitalModalProps) {
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
      name: '',
      city: '',
      address: '',
      area: '',
      contactNumber: '',
      isActive: true,
    },
  });

  const isActive = watch('isActive');

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

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Hospital</DialogTitle>
          <DialogDescription>Fill in the details to add a new hospital.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Hospital Name */}
          <div className="space-y-1">
            <Label htmlFor="name">
              Hospital Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              placeholder="e.g. City General Hospital"
              {...register('name', { required: 'Hospital name is required' })}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* City */}
          <div className="space-y-1">
            <Label htmlFor="city">City</Label>
            <Input id="city" placeholder="e.g. Mumbai" {...register('city')} />
          </div>

          {/* Address */}
          <div className="space-y-1">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              placeholder="Full address..."
              rows={2}
              {...register('address')}
            />
          </div>

          {/* Area / Zone */}
          <div className="space-y-1">
            <Label htmlFor="area">Area / Zone</Label>
            <Input id="area" placeholder="e.g. North Zone" {...register('area')} />
          </div>

          {/* Contact Number */}
          <div className="space-y-1">
            <Label htmlFor="contactNumber">Contact Number</Label>
            <Input
              id="contactNumber"
              type="tel"
              placeholder="e.g. +91 98765 43210"
              {...register('contactNumber')}
            />
          </div>

          {/* Active Toggle */}
          <div className="flex items-center justify-between p-3 bg-muted/40 rounded-lg">
            <div>
              <p className="text-sm font-medium text-foreground">Status</p>
              <p className="text-xs text-muted-foreground">
                {isActive ? 'Hospital is Active' : 'Hospital is Inactive'}
              </p>
            </div>
            <Switch
              checked={isActive}
              onCheckedChange={(val) => setValue('isActive', val)}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose} disabled={addHospital.isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={addHospital.isPending}>
              {addHospital.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Add Hospital
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
