import React, { useState } from 'react';
import { Home, MapPin, Clock, User, Navigation } from 'lucide-react';
import MedicalCard from '../../components/shared/MedicalCard';
import StatusBadge from '../../components/shared/StatusBadge';
import { useGetAllHomeCollectionRequests, useUpdateHomeCollectionStatus } from '../../hooks/useQueries';
import { formatDateTime } from '../../utils/formatters';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Variant_assigned_requested_canceled_completed } from '../../backend';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

export default function HomeCollectionQueuePage() {
  const { data: requests = [], isLoading } = useGetAllHomeCollectionRequests();
  const updateStatus = useUpdateHomeCollectionStatus();
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const sorted = [...requests].sort((a, b) => Number(b.timestamp) - Number(a.timestamp));

  const handleStatusChange = async (requestId: string, status: string) => {
    setUpdatingId(requestId);
    try {
      await updateStatus.mutateAsync({
        requestId,
        status: status as Variant_assigned_requested_canceled_completed,
      });
      toast.success('Status updated');
    } catch {
      toast.error('Failed to update status');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="px-4 py-5 space-y-4 animate-fade-in">
      <div>
        <h1 className="text-xl font-bold text-foreground">Home Collection Queue</h1>
        <p className="text-sm text-muted-foreground">{requests.length} requests</p>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <Skeleton key={i} className="h-36 rounded-card" />
          ))}
        </div>
      ) : sorted.length === 0 ? (
        <MedicalCard className="text-center py-12">
          <Home className="w-12 h-12 mx-auto text-muted-foreground/30 mb-3" />
          <p className="text-muted-foreground font-medium">No home collection requests</p>
        </MedicalCard>
      ) : (
        <div className="space-y-3">
          {sorted.map((req) => (
            <MedicalCard key={req.id}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
                    <Home className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Request ID</p>
                    <p className="text-xs font-mono font-semibold">{req.id.slice(0, 12)}...</p>
                  </div>
                </div>
                <StatusBadge status={req.status as any} />
              </div>

              <div className="space-y-1.5 mb-3">
                <div className="flex items-start gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                  <span className="line-clamp-2">{req.address}</span>
                </div>

                {/* GPS Coordinates */}
                {req.latitude != null && req.longitude != null ? (
                  <div className="flex items-center gap-1.5 rounded-lg bg-gradient-primary-soft border border-brand-blue/20 px-2 py-1">
                    <Navigation className="w-3.5 h-3.5 text-brand-blue flex-shrink-0" />
                    <span className="text-xs font-mono text-brand-blue font-medium">
                      Lat: {req.latitude.toFixed(6)}, Lng: {req.longitude.toFixed(6)}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground/60">
                    <Navigation className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="italic">No GPS data</span>
                  </div>
                )}

                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{req.slot}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <User className="w-3.5 h-3.5" />
                  <span className="font-mono">{req.patient.toString().slice(0, 16)}...</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {req.tests.map((t) => (
                    <span
                      key={t.id}
                      className="bg-gradient-primary-soft text-brand-blue text-xs px-2 py-0.5 rounded-full font-medium"
                    >
                      {t.name}
                    </span>
                  ))}
                </div>
              </div>

              <Select
                value={req.status}
                onValueChange={(val) => handleStatusChange(req.id, val)}
                disabled={updatingId === req.id}
              >
                <SelectTrigger className="rounded-xl text-xs h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={Variant_assigned_requested_canceled_completed.requested}>
                    Requested
                  </SelectItem>
                  <SelectItem value={Variant_assigned_requested_canceled_completed.assigned}>
                    Assigned
                  </SelectItem>
                  <SelectItem value={Variant_assigned_requested_canceled_completed.completed}>
                    Completed
                  </SelectItem>
                  <SelectItem value={Variant_assigned_requested_canceled_completed.canceled}>
                    Canceled
                  </SelectItem>
                </SelectContent>
              </Select>
            </MedicalCard>
          ))}
        </div>
      )}
    </div>
  );
}
