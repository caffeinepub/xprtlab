import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
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
import { Switch } from '@/components/ui/switch';
import { Loader2 } from 'lucide-react';
import { useAddTest } from '../../hooks/useQueries';
import { TestError } from '../../backend';

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
      name: '',
      code: '',
      sampleType: '',
      mrp: 0,
      isActive: true,
    },
  });

  const isActive = watch('isActive');

  const onSubmit = async (values: AddTestFormValues) => {
    try {
      const result = await addTest.mutateAsync({
        name: values.name.trim(),
        code: values.code.trim().toUpperCase(),
        sampleType: values.sampleType.trim(),
        price: BigInt(Math.round(values.mrp)),
        isActive: values.isActive,
      });

      if (result.__kind__ === 'err') {
        if (result.err === TestError.duplicateCode) {
          setError('code', {
            type: 'manual',
            message: 'Test code already exists.',
          });
          return; // Do not close modal
        }
        toast.error('Failed to add test. Please try again.');
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
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) handleClose(); }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Test</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new test to the master list.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
          {/* Test Name */}
          <div className="space-y-1">
            <Label htmlFor="add-name">Test Name <span className="text-destructive">*</span></Label>
            <Input
              id="add-name"
              placeholder="e.g. Complete Blood Count"
              {...register('name', { required: 'Test name is required' })}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Test Code */}
          <div className="space-y-1">
            <Label htmlFor="add-code">Test Code <span className="text-destructive">*</span></Label>
            <Input
              id="add-code"
              placeholder="e.g. CBC"
              className="uppercase"
              {...register('code', {
                required: 'Test code is required',
                pattern: {
                  value: /^[A-Za-z0-9_-]+$/,
                  message: 'Only letters, numbers, hyphens and underscores allowed',
                },
                onChange: () => {
                  // Clear duplicate error when user edits the code field
                  if (errors.code?.type === 'manual') {
                    // react-hook-form clears on re-register; explicit clear via setError not needed
                  }
                },
              })}
            />
            {errors.code && (
              <p className="text-xs text-destructive">{errors.code.message}</p>
            )}
          </div>

          {/* Sample Type */}
          <div className="space-y-1">
            <Label htmlFor="add-sampleType">Sample Type <span className="text-destructive">*</span></Label>
            <Input
              id="add-sampleType"
              placeholder="e.g. Blood, Urine, Serum"
              {...register('sampleType', { required: 'Sample type is required' })}
            />
            {errors.sampleType && (
              <p className="text-xs text-destructive">{errors.sampleType.message}</p>
            )}
          </div>

          {/* MRP */}
          <div className="space-y-1">
            <Label htmlFor="add-mrp">MRP (₹) <span className="text-destructive">*</span></Label>
            <Input
              id="add-mrp"
              type="number"
              min={0}
              step={1}
              placeholder="e.g. 500"
              {...register('mrp', {
                required: 'MRP is required',
                min: { value: 0, message: 'MRP must be 0 or more' },
                valueAsNumber: true,
              })}
            />
            {errors.mrp && (
              <p className="text-xs text-destructive">{errors.mrp.message}</p>
            )}
          </div>

          {/* Active Toggle */}
          <div className="flex items-center justify-between rounded-lg border border-border p-3">
            <div>
              <p className="text-sm font-medium">Status</p>
              <p className="text-xs text-muted-foreground">
                {isActive ? 'Test is Active' : 'Test is Inactive'}
              </p>
            </div>
            <Switch
              checked={isActive}
              onCheckedChange={(val) => setValue('isActive', val)}
            />
          </div>

          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" onClick={handleClose} disabled={addTest.isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={addTest.isPending}>
              {addTest.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Add Test
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
