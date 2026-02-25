import React from 'react';
import { Phone, MapPin, FlaskConical, Loader2, User, IndianRupee, Navigation, CheckCircle, XCircle } from 'lucide-react';
import { useGetAllHomeCollectionRequests, useUpdateHomeCollectionStatus } from '../../hooks/useQueries';

export default function HomeCollectionQueuePage() {
  const { data: tasks = [], isLoading } = useGetAllHomeCollectionRequests();
  const updateStatusMutation = useUpdateHomeCollectionStatus();

  const handleStatusUpdate = (id: string, status: string) => {
    updateStatusMutation.mutate({ id, status });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center space-y-3">
        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
          <MapPin className="h-8 w-8 text-primary/60" />
        </div>
        <p className="text-base font-semibold text-foreground">No home collections assigned.</p>
        <p className="text-sm text-muted-foreground">New assignments will appear here automatically.</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4 max-w-lg mx-auto">
      <h2 className="text-lg font-bold text-foreground">Home Collections</h2>
      <p className="text-xs text-muted-foreground">{tasks.length} task{tasks.length !== 1 ? 's' : ''} assigned</p>

      {tasks.map((task: any) => {
        const isUpdating = updateStatusMutation.isPending && updateStatusMutation.variables?.id === task.id;
        const statusKey = typeof task.status === 'object' ? Object.keys(task.status)[0] : task.status;

        return (
          <div key={task.id} className="bg-white rounded-2xl border border-border shadow-sm p-4 space-y-3">
            {/* Patient Info */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-sm text-foreground">{task.patientName || 'Patient'}</p>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    statusKey === 'completed' ? 'bg-green-100 text-green-700' :
                    statusKey === 'assigned' ? 'bg-blue-100 text-blue-700' :
                    statusKey === 'canceled' ? 'bg-red-100 text-red-700' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {statusKey?.charAt(0).toUpperCase() + statusKey?.slice(1)}
                  </span>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-1.5">
              {task.address && (
                <div className="flex items-start gap-2 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-primary/60" />
                  <span className="font-medium">{task.address}</span>
                </div>
              )}
              {(task.phone || task.contactNumber) && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Phone className="h-3.5 w-3.5 flex-shrink-0 text-primary/60" />
                  <span className="font-medium">{task.phone || task.contactNumber}</span>
                </div>
              )}
              {task.tests && task.tests.length > 0 && (
                <div className="flex items-start gap-2 text-xs text-muted-foreground">
                  <FlaskConical className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-primary/60" />
                  <span className="font-medium">{task.tests.map((t: any) => t.name).join(', ')}</span>
                </div>
              )}
              {(task.payableAmount !== undefined || task.finalAmount !== undefined) && (
                <div className="flex items-center gap-2 text-xs font-bold text-primary">
                  <IndianRupee className="h-3.5 w-3.5 flex-shrink-0" />
                  <span>₹{(task.payableAmount ?? task.finalAmount ?? 0).toFixed(2)}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              {/* Call Button */}
              {(task.phone || task.contactNumber) && (
                <a
                  href={`tel:${task.phone || task.contactNumber}`}
                  className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-green-50 border border-green-200 text-green-700 font-semibold text-xs hover:bg-green-100 transition-colors"
                >
                  <Phone className="h-3.5 w-3.5" /> Call
                </a>
              )}

              {/* Start Visit */}
              {statusKey !== 'completed' && statusKey !== 'canceled' && (
                <button
                  onClick={() => handleStatusUpdate(task.id, 'in-progress')}
                  disabled={isUpdating || statusKey === 'in-progress'}
                  className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 font-semibold text-xs hover:bg-blue-100 transition-colors disabled:opacity-50"
                >
                  {isUpdating ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Navigation className="h-3.5 w-3.5" />}
                  Start Visit
                </button>
              )}

              {/* Mark as Collected */}
              {statusKey !== 'completed' && statusKey !== 'canceled' && (
                <button
                  onClick={() => handleStatusUpdate(task.id, 'completed')}
                  disabled={isUpdating}
                  className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary font-semibold text-xs hover:bg-primary/20 transition-colors disabled:opacity-50"
                >
                  {isUpdating ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <CheckCircle className="h-3.5 w-3.5" />}
                  Mark Collected
                </button>
              )}

              {/* Mark as Not Available */}
              {statusKey !== 'completed' && statusKey !== 'canceled' && (
                <button
                  onClick={() => handleStatusUpdate(task.id, 'not-available')}
                  disabled={isUpdating}
                  className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-red-50 border border-red-200 text-red-600 font-semibold text-xs hover:bg-red-100 transition-colors disabled:opacity-50"
                >
                  {isUpdating ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <XCircle className="h-3.5 w-3.5" />}
                  Not Available
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
