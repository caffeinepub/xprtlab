import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertCircle,
  CalendarCheck,
  Clock,
  CreditCard,
  DollarSign,
  FlaskConical,
  Loader2,
  Lock,
  Smartphone,
  TrendingUp,
} from "lucide-react";
import React, { useState } from "react";
import {
  useEndShift,
  useGetTodaySummary,
  useStartShift,
} from "../../hooks/useQueries";

export default function AttendancePage() {
  const {
    data: summary,
    isLoading: summaryLoading,
    error: summaryError,
  } = useGetTodaySummary();
  const _startShiftMutation = useStartShift();
  const endShiftMutation = useEndShift();
  const [shiftEnded, setShiftEnded] = useState(false);

  // Convert bigint fields to number for display
  const totalSamples = summary ? Number(summary.totalSamplesCollected) : 0;
  const cashCollected = summary ? Number(summary.cashCollected) : 0;
  const upiCollected = summary ? Number(summary.upiCollected) : 0;
  const pendingAmount = summary ? Number(summary.pendingAmount) : 0;
  const hospitalCredit = 0;

  const summaryCards = [
    {
      label: "Total Samples",
      value: totalSamples.toString(),
      icon: FlaskConical,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Cash Collected",
      value: `₹${cashCollected.toFixed(2)}`,
      icon: DollarSign,
      color: "text-success",
      bg: "bg-success/10",
    },
    {
      label: "UPI Collected",
      value: `₹${upiCollected.toFixed(2)}`,
      icon: Smartphone,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Hospital Credit",
      value: `₹${hospitalCredit.toFixed(2)}`,
      icon: CreditCard,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      label: "Pending Amount",
      value: `₹${pendingAmount.toFixed(2)}`,
      icon: AlertCircle,
      color: "text-warning",
      bg: "bg-warning/10",
    },
  ];

  if (shiftEnded) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md bg-card rounded-2xl shadow-card p-8 text-center">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CalendarCheck className="w-8 h-8 text-success" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">
            Shift Ended
          </h2>
          <p className="text-muted-foreground mb-6">
            Your shift has been closed. All records are locked for today.
          </p>
          <div className="bg-muted rounded-xl p-4 space-y-2 text-sm text-left">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Samples</span>
              <span className="font-semibold">{totalSamples}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Cash Collected</span>
              <span className="font-semibold text-success">
                ₹{cashCollected.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">UPI Collected</span>
              <span className="font-semibold text-blue-600">
                ₹{upiCollected.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Pending Amount</span>
              <span className="font-semibold text-warning">
                ₹{pendingAmount.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-[90px]">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center">
            <CalendarCheck className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">
              Today's Attendance
            </h1>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Lock className="w-3 h-3" />
              Totals aggregated server-side
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4 max-w-lg mx-auto">
        {/* Active Shift Warning */}
        <Alert>
          <Clock className="h-4 w-4" />
          <AlertDescription>
            Shift is active. Once you end the shift, all records for today will
            be locked and no new samples can be added.
          </AlertDescription>
        </Alert>

        {/* Summary Error */}
        {summaryError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to load today's summary. Please refresh.
            </AlertDescription>
          </Alert>
        )}

        {/* Today's Summary */}
        <div className="bg-card rounded-2xl shadow-card p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-foreground">Today's Summary</h2>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Lock className="w-3 h-3" />
              <span>Server-aggregated</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {summaryCards.map((card) => (
              <div key={card.label} className={`${card.bg} rounded-xl p-3`}>
                <div className="flex items-center gap-2 mb-1">
                  <card.icon className={`w-4 h-4 ${card.color}`} />
                  <span className="text-xs text-muted-foreground">
                    {card.label}
                  </span>
                </div>
                {summaryLoading ? (
                  <Skeleton className="h-6 w-16" />
                ) : (
                  <p className={`text-lg font-bold ${card.color}`}>
                    {card.value}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* End Shift Button */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              type="button"
              disabled={summaryLoading || endShiftMutation.isPending}
              className="w-full h-12 bg-destructive text-destructive-foreground rounded-xl font-semibold text-base flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              {endShiftMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Ending Shift...
                </>
              ) : (
                <>
                  <TrendingUp className="w-4 h-4" />
                  End Shift &amp; Submit Summary
                </>
              )}
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>End Shift &amp; Lock Records?</AlertDialogTitle>
              <AlertDialogDescription asChild>
                <div className="space-y-3">
                  <p>
                    Once you end your shift, all records for today will be
                    locked. You will not be able to add, edit, or delete samples
                    for today.
                  </p>
                  <div className="bg-muted rounded-lg p-3 space-y-1.5 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Total Samples
                      </span>
                      <span className="font-semibold">{totalSamples}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Cash Collected
                      </span>
                      <span className="font-semibold">
                        ₹{cashCollected.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        UPI Collected
                      </span>
                      <span className="font-semibold">
                        ₹{upiCollected.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Pending Amount
                      </span>
                      <span className="font-semibold text-warning">
                        ₹{pendingAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  endShiftMutation.mutate(undefined, {
                    onSuccess: () => setShiftEnded(true),
                  });
                }}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                End Shift
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
