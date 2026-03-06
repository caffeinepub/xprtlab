import { Calendar, Loader2, Search } from "lucide-react";
import React, { useState } from "react";
import {
  useGetAllBookings,
  useUpdateBookingStatus,
} from "../../hooks/useQueries";

type BookingStatusFilter =
  | "all"
  | "pending"
  | "confirmed"
  | "completed"
  | "canceled";

interface AdminBookingsPageProps {
  onNavigate?: (route: string) => void;
}

export default function AdminBookingsPage({
  onNavigate,
}: AdminBookingsPageProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<BookingStatusFilter>("all");

  const { data: bookings = [], isLoading } = useGetAllBookings();
  const updateStatusMutation = useUpdateBookingStatus();

  const getStatusKey = (status: any): string => {
    if (typeof status === "string") return status;
    if (typeof status === "object" && status !== null)
      return Object.keys(status)[0];
    return "unknown";
  };

  const filtered = bookings.filter((b: any) => {
    const statusKey = getStatusKey(b.status);
    const matchStatus = statusFilter === "all" || statusKey === statusFilter;
    const matchSearch =
      !search ||
      b.patientName?.toLowerCase().includes(search.toLowerCase()) ||
      b.patient?.toString().includes(search) ||
      b.id?.includes(search);
    return matchStatus && matchSearch;
  });

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
    canceled: "bg-red-100 text-red-700",
  };

  const formatTime = (ts: number) => {
    const ms = ts > 1e12 ? ts / 1_000_000 : ts;
    return new Date(ms).toLocaleString("en-IN");
  };

  return (
    <div className="p-4 space-y-4 max-w-2xl mx-auto">
      <h2 className="text-lg font-bold text-foreground">Bookings</h2>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-border shadow-sm p-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by patient or booking ID..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {(
            [
              "all",
              "pending",
              "confirmed",
              "completed",
              "canceled",
            ] as BookingStatusFilter[]
          ).map((s) => (
            <button
              type="button"
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                statusFilter === s
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center space-y-2">
          <Calendar className="h-10 w-10 text-muted-foreground/40" />
          <p className="text-sm font-semibold text-foreground">
            No bookings found
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((booking: any) => {
            const statusKey = getStatusKey(booking.status);
            return (
              <div
                key={booking.id}
                className="bg-white rounded-2xl border border-border shadow-sm p-4 space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-bold text-sm text-foreground">
                      {booking.patientName || "Patient"}
                    </p>
                    <p className="text-xs text-muted-foreground font-mono">
                      {booking.id}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusColors[statusKey] || "bg-gray-100 text-gray-600"}`}
                  >
                    {statusKey}
                  </span>
                </div>
                {booking.tests && booking.tests.length > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Tests: {booking.tests.map((t: any) => t.name).join(", ")}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  Slot: {booking.slot}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatTime(Number(booking.timestamp))}
                </p>

                {/* Status Update */}
                <div className="flex gap-2 flex-wrap pt-1">
                  {["confirmed", "completed", "canceled"].map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() =>
                        updateStatusMutation.mutate({
                          id: booking.id,
                          status: s,
                        })
                      }
                      disabled={
                        updateStatusMutation.isPending || statusKey === s
                      }
                      className={`px-3 py-1 rounded-xl text-xs font-semibold border transition-colors disabled:opacity-40 ${
                        statusKey === s
                          ? "bg-primary/10 border-primary/20 text-primary"
                          : "border-border hover:bg-muted/50"
                      }`}
                    >
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  ))}
                  {onNavigate && (
                    <button
                      type="button"
                      onClick={() => onNavigate("upload-report")}
                      className="px-3 py-1 rounded-xl text-xs font-semibold border border-primary/20 text-primary hover:bg-primary/5 transition-colors"
                    >
                      Upload Report
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
