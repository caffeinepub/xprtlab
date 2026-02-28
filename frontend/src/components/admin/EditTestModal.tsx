import React, { useEffect } from 'react';
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
import { useUpdateTest } from '../../hooks/useQueries';
import { TestOutput, TestError } from '../../backend';

interface EditTestFormValues {
  name: string;
  code: string;
  sampleType: string;
  mrp: number;
  isActive: boolean;
}

interface EditTestModalProps {
  open: boolean;
  test: TestOutput | null;
  onClose: () => void;
}

export default function EditTestModal({ open, test, onClose }: EditTestModalProps) {
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
      name: '',
      code: '',
      sampleType: '',
      mrp: 0,
      isActive: true,
    },
  });

  const isActive = watch('isActive');

  // Pre-populate form when test changes
  useEffect(() => {
    if (test) {
      reset({
        name: test.name,
        code: test.code,
        sampleType: test.sampleType,
        mrp: Number(test.price),
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

      if (result.__kind__ === 'err') {
        if (result.err === TestError.duplicateCode) {
          setError('code', {
            type: 'manual',
            message: 'Test code already exists.',
          });
          return; // Do not close modal
        }
        toast.error('Failed to update test. Please try again.');
        return;
      }

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
    <Dialog open={open} onOpenChange={(o) => { if (!o) handleClose(); }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Test</DialogTitle>
          <DialogDescription>
            Update the details for this test. You may also change the Test Code.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
          {/* Test Name */}
          <div className="space-y-1">
            <Label htmlFor="edit-name">Test Name <span className="text-destructive">*</span></Label>
            <Input
              id="edit-name"
              placeholder="e.g. Complete Blood Count"
              {...register('name', { required: 'Test name is required' })}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Test Code (now editable) */}
          <div className="space-y-1">
            <Label htmlFor="edit-code">Test Code <span className="text-destructive">*</span></Label>
            <Input
              id="edit-code"
              placeholder="e.g. CBC"
              className="uppercase"
              {...register('code', {
                required: 'Test code is required',
                pattern: {
                  value: /^[A-Za-z0-9_-]+$/,
                  message: 'Only letters, numbers, hyphens and underscores allowed',
                },
              })}
            />
            {errors.code && (
              <p className="text-xs text-destructive">{errors.code.message}</p>
            )}
          </div>

          {/* Sample Type */}
          <div className="space-y-1">
            <Label htmlFor="edit-sampleType">Sample Type <span className="text-destructive">*</span></Label>
            <Input
              id="edit-sampleType"
              placeholder="e.g. Blood, Urine, Serum"
              {...register('sampleType', { required: 'Sample type is required' })}
            />
            {errors.sampleType && (
              <p className="text-xs text-destructive">{errors.sampleType.message}</p>
            )}
          </div>

          {/* MRP */}
          <div className="space-y-1">
            <Label htmlFor="edit-mrp">MRP (₹) <span className="text-destructive">*</span></Label>
            <Input
              id="edit-mrp"
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
            <Button type="button" variant="outline" onClick={handleClose} disabled={updateTest.isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={updateTest.isPending}>
              {updateTest.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
