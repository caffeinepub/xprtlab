import React, { useState, useEffect } from 'react';
import { RefreshCw, Clock, Loader2, ClipboardList, Home, FlaskConical } from 'lucide-react';
import { useGetAllBookings, useGetAllHomeCollectionRequests } from '../../hooks/useQueries';

interface TaskQueuePageProps {
  onNavigate?: (route: string) => void;
}

export default function TaskQueuePage({ onNavigate }: TaskQueuePageProps) {
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const {
    data: bookings = [],
    isLoading: bookingsLoading,
    refetch: refetchBookings,
    dataUpdatedAt: bookingsUpdatedAt,
  } = useGetAllBookings();

  const {
    data: homeCollections = [],
    isLoading: homeLoading,
    refetch: refetchHome,
    dataUpdatedAt: homeUpdatedAt,
  } = useGetAllHomeCollectionRequests();

  const isLoading = bookingsLoading || homeLoading;

  useEffect(() => {
    if (bookingsUpdatedAt || homeUpdatedAt) {
      setLastUpdated(new Date());
    }
  }, [bookingsUpdatedAt, homeUpdatedAt]);

  const handleRefresh = () => {
    refetchBookings();
    refetchHome();
    setLastUpdated(new Date());
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const pendingBookings = bookings.filter((b: any) => b.status === 'pending' || b.status?.pending !== undefined);
  const assignedCollections = homeCollections.filter((h: any) => h.status === 'assigned' || h.status?.assigned !== undefined);

  const totalTasks = pendingBookings.length + assignedCollections.length;

  return (
    <div className="p-4 space-y-4 max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground">Task Queue</h2>
          {lastUpdated && (
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
              <Clock className="h-3 w-3" />
              Last Updated: {formatTime(lastUpdated)}
            </p>
          )}
        </div>
        <button
          onClick={handleRefresh}
          disabled={isLoading}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary/10 text-primary font-semibold text-xs disabled:opacity-50 hover:bg-primary/20 transition-colors"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      )}

      {/* Empty State */}
      {!isLoading && totalTasks === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center space-y-3">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <ClipboardList className="h-8 w-8 text-primary/60" />
          </div>
          <p className="text-base font-semibold text-foreground">No tasks yet.</p>
          <p className="text-sm text-muted-foreground max-w-xs">
            Stay available — new assignments will appear automatically.
          </p>
        </div>
      )}

      {/* Hospital Bookings */}
      {!isLoading && pendingBookings.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
            <FlaskConical className="h-3.5 w-3.5" /> Hospital Samples ({pendingBookings.length})
          </h3>
          {pendingBookings.map((booking: any) => (
            <div key={booking.id} className="bg-white rounded-2xl border border-border shadow-sm p-4 space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-bold text-sm text-foreground">{booking.patientName || 'Patient'}</p>
                  <p className="text-xs text-muted-foreground">{booking.phone || booking.patient?.toString?.()?.slice(0, 12) + '...'}</p>
                </div>
                <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                  Pending
                </span>
              </div>
              {booking.tests && booking.tests.length > 0 && (
                <p className="text-xs text-muted-foreground">
                  Tests: {booking.tests.map((t: any) => t.name).join(', ')}
                </p>
              )}
              {onNavigate && (
                <button
                  onClick={() => onNavigate('hospital-sample-entry')}
                  className="w-full py-2 rounded-xl bg-primary text-white font-semibold text-xs mt-1"
                >
                  Add Sample
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Home Collections */}
      {!isLoading && assignedCollections.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
            <Home className="h-3.5 w-3.5" /> Home Collections ({assignedCollections.length})
          </h3>
          {assignedCollections.map((task: any) => (
            <div key={task.id} className="bg-white rounded-2xl border border-border shadow-sm p-4 space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-bold text-sm text-foreground">{task.patientName || 'Patient'}</p>
                  <p className="text-xs text-muted-foreground">{task.address}</p>
                </div>
                <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                  Assigned
                </span>
              </div>
              {onNavigate && (
                <button
                  onClick={() => onNavigate('home-collection-queue')}
                  className="w-full py-2 rounded-xl bg-green-600 text-white font-semibold text-xs mt-1"
                >
                  View Details
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
