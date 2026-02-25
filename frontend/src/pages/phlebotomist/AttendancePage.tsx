import React, { useState } from 'react';
import { MapPin, Clock, CheckCircle, AlertCircle, Loader2, RefreshCw, TrendingUp, DollarSign, Lock } from 'lucide-react';
import { useGetActiveShift, useStartShift, useEndShift, useGetTodaySummary } from '../../hooks/useQueries';
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

export default function AttendancePage() {
  const [showEndShiftDialog, setShowEndShiftDialog] = useState(false);

  const { data: activeShift, isLoading: shiftLoading, refetch: refetchShift } = useGetActiveShift();
  const { data: todaySummary, isLoading: summaryLoading, isFetched: summaryFetched } = useGetTodaySummary();
  const startShiftMutation = useStartShift();
  const endShiftMutation = useEndShift();

  const hasActiveShift = !!activeShift;

  const handleStartShift = async () => {
    if (hasActiveShift) return;
    try {
      await startShiftMutation.mutateAsync({});
      refetchShift();
    } catch (err) {
      console.error('Failed to start shift', err);
    }
  };

  const handleEndShiftConfirm = async () => {
    try {
      await endShiftMutation.mutateAsync({});
      setShowEndShiftDialog(false);
      refetchShift();
    } catch (err) {
      console.error('Failed to end shift', err);
    }
  };

  const totalSamples = todaySummary ? Number(todaySummary.totalSamplesCollected) : 0;
  const cashCollected = todaySummary?.cashCollected ?? 0;
  const upiCollected = todaySummary?.upiCollected ?? 0;
  const pendingAmount = todaySummary?.pendingAmount ?? 0;

  if (shiftLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4 max-w-lg mx-auto">
      {/* Status Banner */}
      <div className={`rounded-2xl p-4 text-center font-bold text-lg shadow-sm ${hasActiveShift ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-gray-50 text-gray-500 border border-gray-200'}`}>
        {hasActiveShift ? (
          <div className="flex items-center justify-center gap-2">
            <CheckCircle className="h-5 w-5" />
            <span>ON DUTY</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <Clock className="h-5 w-5" />
            <span>OFF DUTY</span>
          </div>
        )}
      </div>

      {/* Active Shift Warning */}
      {hasActiveShift && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-amber-700 font-medium">
            You have an active shift. Please end it before starting a new one.
          </p>
        </div>
      )}

      {/* Today Summary — shown when shift is active */}
      {hasActiveShift && (
        <div className="bg-white rounded-2xl border border-border shadow-sm p-4 space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h3 className="font-bold text-sm text-foreground">Today's Summary</h3>
            {summaryLoading && <Loader2 className="h-3 w-3 animate-spin text-muted-foreground ml-auto" />}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 rounded-xl p-3 text-center">
              <p className="text-xs text-blue-600 font-semibold">Total Samples</p>
              <p className="text-2xl font-bold text-blue-700">{totalSamples}</p>
            </div>
            <div className="bg-green-50 rounded-xl p-3 text-center">
              <p className="text-xs text-green-600 font-semibold">Cash Collected</p>
              <p className="text-xl font-bold text-green-700">₹{cashCollected.toFixed(0)}</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-3 text-center">
              <p className="text-xs text-purple-600 font-semibold">UPI Collected</p>
              <p className="text-xl font-bold text-purple-700">₹{upiCollected.toFixed(0)}</p>
            </div>
            <div className="bg-orange-50 rounded-xl p-3 text-center">
              <p className="text-xs text-orange-600 font-semibold">Pending Amount</p>
              <p className="text-xl font-bold text-orange-700">₹{pendingAmount.toFixed(0)}</p>
            </div>
          </div>
        </div>
      )}

      {/* Shift Actions */}
      <div className="space-y-3">
        {!hasActiveShift ? (
          <button
            onClick={handleStartShift}
            disabled={startShiftMutation.isPending || hasActiveShift}
            className="w-full py-3 rounded-xl bg-primary text-white font-bold text-sm shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {startShiftMutation.isPending ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Starting Shift...</>
            ) : (
              <><MapPin className="h-4 w-4" /> Start Shift</>
            )}
          </button>
        ) : (
          <button
            onClick={() => setShowEndShiftDialog(true)}
            disabled={endShiftMutation.isPending || summaryLoading || !summaryFetched}
            className="w-full py-3 rounded-xl bg-red-600 text-white font-bold text-sm shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {endShiftMutation.isPending ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Ending Shift...</>
            ) : (
              <><Lock className="h-4 w-4" /> End Shift & Submit Summary</>
            )}
          </button>
        )}
      </div>

      {/* End Shift Confirmation Dialog */}
      <AlertDialog open={showEndShiftDialog} onOpenChange={setShowEndShiftDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>End Shift & Submit Summary</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-3">
                <p>Are you sure you want to end shift? After submission, today's entries cannot be edited.</p>
                <div className="bg-muted rounded-xl p-3 space-y-2 text-sm">
                  <p className="font-semibold text-foreground">Today's Summary:</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-muted-foreground">Total Samples:</span>
                      <span className="font-bold ml-1 text-foreground">{totalSamples}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Cash:</span>
                      <span className="font-bold ml-1 text-foreground">₹{cashCollected.toFixed(0)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">UPI:</span>
                      <span className="font-bold ml-1 text-foreground">₹{upiCollected.toFixed(0)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Pending:</span>
                      <span className="font-bold ml-1 text-orange-600">₹{pendingAmount.toFixed(0)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleEndShiftConfirm}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Confirm & End Shift
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
