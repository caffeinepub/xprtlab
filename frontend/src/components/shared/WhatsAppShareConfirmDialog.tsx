import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { MessageCircle, Loader2 } from 'lucide-react';
import type { HospitalSample } from '../../types/models';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sample: HospitalSample;
  onConfirm: () => void | Promise<void>;
  isLoading?: boolean;
  /** When true, skips backend mutation and updates local demo state only */
  isDemoMode?: boolean;
}

export default function WhatsAppShareConfirmDialog({
  open,
  onOpenChange,
  sample,
  onConfirm,
  isLoading = false,
  isDemoMode = false,
}: Props) {
  const handleConfirm = async () => {
    await onConfirm();
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-green-600" />
            Share Report via WhatsApp
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <span className="block">
              Confirm that you have shared the lab report for{' '}
              <strong>{sample.patientName}</strong> via WhatsApp.
            </span>
            <span className="block text-sm">
              Tests: {sample.tests.map((t) => t.testName).join(', ')}
            </span>
            {isDemoMode && (
              <span className="block text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded px-2 py-1 mt-2">
                Demo Mode — this action will update local UI state only, no backend call will be made.
              </span>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Confirming…
              </span>
            ) : (
              'Confirm Delivery'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
