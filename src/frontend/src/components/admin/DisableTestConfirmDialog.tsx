import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import type { TestOutput } from "../../backend";
import { useDisableTest } from "../../hooks/useQueries";

interface DisableTestConfirmDialogProps {
  open: boolean;
  test: TestOutput | null;
  onClose: () => void;
}

export default function DisableTestConfirmDialog({
  open,
  test,
  onClose,
}: DisableTestConfirmDialogProps) {
  const disableTest = useDisableTest();

  const handleConfirm = async () => {
    if (!test) return;
    try {
      await disableTest.mutateAsync(test.code);
      toast.success(`Test "${test.name}" has been disabled`);
      onClose();
    } catch (err: any) {
      const msg = err?.message ?? String(err);
      toast.error(`Failed to disable test: ${msg}`);
    }
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={(o) => {
        if (!o) onClose();
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Disable Test</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to disable{" "}
            <span className="font-semibold text-foreground">{test?.name}</span>?
            <br />
            The test will be marked as{" "}
            <span className="font-semibold">Inactive</span> and will not be
            permanently deleted. You can re-enable it later by editing the test.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={disableTest.isPending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={disableTest.isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {disableTest.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Disable Test
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
