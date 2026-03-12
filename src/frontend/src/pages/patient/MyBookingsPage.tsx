import { Calendar, Clock, FlaskConical } from "lucide-react";
import React from "react";
import MedicalCard from "../../components/shared/MedicalCard";
import PageHeroHeader from "../../components/shared/PageHeroHeader";
import StatusBadge from "../../components/shared/StatusBadge";
import { useGetMyBookings } from "../../hooks/useQueries";

type PatientRoute =
  | "home"
  | "book-test"
  | "slot-selection"
  | "my-bookings"
  | "home-collection"
  | "my-home-collections"
  | "reports"
  | "my-vitals"
  | "profile";

interface MyBookingsPageProps {
  onNavigate: (route: PatientRoute) => void;
}

export default function MyBookingsPage({ onNavigate }: MyBookingsPageProps) {
  const { data: bookings = [], isLoading } = useGetMyBookings();

  const sorted = [...bookings].sort(
    (a, b) => Number(b.timestamp) - Number(a.timestamp),
  );

  return (
    <div className="p-4 space-y-4">
      <PageHeroHeader
        title="My Bookings"
        description="Track your upcoming and past test bookings"
      />
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onNavigate("home")}
          className="text-muted-foreground hover:text-foreground"
        >
          ←
        </button>
        <h1 className="text-lg font-bold text-foreground">My Bookings</h1>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      ) : sorted.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="font-medium">No bookings yet</p>
          <p className="text-sm mt-1">Book a test to get started</p>
          <button
            type="button"
            onClick={() => onNavigate("book-test")}
            className="mt-4 text-primary text-sm font-medium underline"
          >
            Book a Test
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {sorted.map((booking) => (
            <MedicalCard key={booking.id} className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <FlaskConical className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-xs font-mono text-muted-foreground truncate max-w-[120px]">
                    #{booking.id.slice(-8)}
                  </span>
                </div>
                <StatusBadge status={booking.status as any} />
              </div>
              <div className="flex flex-wrap gap-1 mb-2">
                {booking.tests.map((t) => (
                  <span
                    key={t.id}
                    className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full"
                  >
                    {t.name}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{booking.slot}</span>
              </div>
            </MedicalCard>
          ))}
        </div>
      )}
    </div>
  );
}
