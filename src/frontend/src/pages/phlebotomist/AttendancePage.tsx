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

  const totalSamples = summary ? Number(summary.totalSamplesCollected) : 0;
  const cashCollected = summary ? Number(summary.cashCollected) : 0;
  const upiCollected = summary ? Number(summary.upiCollected) : 0;
  const pendingAmount = summary ? Number(summary.pendingAmount) : 0;
  const hospitalCredit = 0;

  const summaryCards = [
    {
      label: "Samples Collected",
      value: totalSamples.toString(),
      icon: FlaskConical,
      color: "#2563EB",
      bg: "#EFF6FF",
    },
    {
      label: "Cash Collected",
      value: `₹${cashCollected.toFixed(2)}`,
      icon: DollarSign,
      color: "#16A34A",
      bg: "#F0FDF4",
    },
    {
      label: "UPI Collected",
      value: `₹${upiCollected.toFixed(2)}`,
      icon: Smartphone,
      color: "#7C3AED",
      bg: "#F5F3FF",
    },
    {
      label: "Hospital Credit",
      value: `₹${hospitalCredit.toFixed(2)}`,
      icon: CreditCard,
      color: "#0891B2",
      bg: "#ECFEFF",
    },
    {
      label: "Payment Pending",
      value: `₹${pendingAmount.toFixed(2)}`,
      icon: AlertCircle,
      color: "#D97706",
      bg: "#FFFBEB",
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
              <span className="text-muted-foreground">Samples Collected</span>
              <span className="font-semibold">{totalSamples}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Cash Collected</span>
              <span className="font-semibold" style={{ color: "#16A34A" }}>
                ₹{cashCollected.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">UPI Collected</span>
              <span className="font-semibold" style={{ color: "#7C3AED" }}>
                ₹{upiCollected.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Payment Pending</span>
              <span className="font-semibold" style={{ color: "#D97706" }}>
                ₹{pendingAmount.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-[90px]" style={{ background: "#F7F9FC" }}>
      {/* Gradient Hero Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #2563EB, #06B6D4)",
          borderRadius: "0 0 24px 24px",
          padding: "28px 20px 32px",
          marginBottom: "20px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle cross pattern */}
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: 0.05,
          }}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="crosses"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path d="M18 8h4v24h-4zM8 18h24v4H8z" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#crosses)" />
        </svg>
        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "6px",
            }}
          >
            <CalendarCheck color="white" size={24} />
            <h1
              style={{
                color: "white",
                fontSize: "22px",
                fontWeight: 700,
                margin: 0,
              }}
            >
              Start Attendance
            </h1>
          </div>
          <p
            style={{
              color: "rgba(255,255,255,0.85)",
              fontSize: "14px",
              margin: 0,
            }}
          >
            Mark your attendance to begin today's collections
          </p>
        </div>
      </div>

      <div className="px-4 space-y-4 max-w-lg mx-auto">
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

        {/* Today's Collections */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "16px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            padding: "16px",
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2
              style={{
                fontWeight: 600,
                fontSize: "15px",
                color: "#111827",
                margin: 0,
              }}
            >
              Today's Collections
            </h2>
            <div
              className="flex items-center gap-1"
              style={{ fontSize: "11px", color: "#9CA3AF" }}
            >
              <Lock className="w-3 h-3" />
              <span>Server-aggregated</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {summaryCards.map((card) => (
              <div
                key={card.label}
                style={{
                  background: card.bg,
                  borderRadius: "12px",
                  padding: "12px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "4px",
                  }}
                >
                  <card.icon
                    style={{ width: "16px", height: "16px", color: card.color }}
                  />
                  <span style={{ fontSize: "11px", color: "#6B7280" }}>
                    {card.label}
                  </span>
                </div>
                {summaryLoading ? (
                  <Skeleton className="h-6 w-16" />
                ) : (
                  <p
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color: card.color,
                      margin: 0,
                    }}
                  >
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
              style={{
                width: "100%",
                height: "48px",
                background: "linear-gradient(135deg, #DC2626, #B91C1C)",
                color: "white",
                borderRadius: "12px",
                fontWeight: 600,
                fontSize: "15px",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                opacity: summaryLoading || endShiftMutation.isPending ? 0.5 : 1,
              }}
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
                        Samples Collected
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
                        Payment Pending
                      </span>
                      <span
                        className="font-semibold"
                        style={{ color: "#D97706" }}
                      >
                        ₹{pendingAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel data-ocid="attendance.cancel_button">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                data-ocid="attendance.confirm_button"
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
