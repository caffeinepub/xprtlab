import React, { useState } from 'react';
import {
  ClipboardList,
  MapPin,
  Clock,
  FlaskConical,
  Home,
  QrCode,
  Activity,
} from 'lucide-react';
import MedicalCard from '../../components/shared/MedicalCard';
import StatusBadge from '../../components/shared/StatusBadge';
import {
  useGetMyBookings,
  useGetMyHomeCollectionRequests,
  useUpdateBookingStatus,
  useUpdateHomeCollectionStatus,
} from '../../hooks/useQueries';
import {
  Variant_canceled_pending_completed_confirmed,
  Variant_assigned_requested_canceled_completed,
} from '../../backend';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type StaffRoute = 'tasks' | 'home-collections' | 'record-vitals' | 'scan-qr' | 'admin-bookings' | 'admin-reports' | 'upload-report' | 'incidents' | 'audit-logs' | 'create-camp' | 'submit-incident' | 'profile';

interface TaskQueuePageProps {
  onNavigate?: (route: StaffRoute) => void;
}

type TaskType = 'booking' | 'home_collection';

interface Task {
  id: string;
  type: TaskType;
  patientId: string;
  tests: string[];
  slot: string;
  status: string;
  timestamp: bigint;
  address?: string;
}

export default function TaskQueuePage({ onNavigate }: TaskQueuePageProps) {
  const { data: bookings = [], isLoading: bookingsLoading } = useGetMyBookings();
  const { data: homeCollections = [], isLoading: hcLoading } = useGetMyHomeCollectionRequests();
  const updateBooking = useUpdateBookingStatus();
  const updateHC = useUpdateHomeCollectionStatus();
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const isLoading = bookingsLoading || hcLoading;

  const tasks: Task[] = [
    ...bookings.map((b) => ({
      id: b.id,
      type: 'booking' as TaskType,
      patientId: b.patient.toString(),
      tests: b.tests.map((t) => t.name),
      slot: b.slot,
      status: b.status,
      timestamp: b.timestamp,
    })),
    ...homeCollections.map((hc) => ({
      id: hc.id,
      type: 'home_collection' as TaskType,
      patientId: hc.patient.toString(),
      tests: hc.tests.map((t) => t.name),
      slot: hc.slot,
      status: hc.status,
      timestamp: hc.timestamp,
      address: hc.address,
    })),
  ].sort((a, b) => Number(b.timestamp) - Number(a.timestamp));

  const handleBookingStatusChange = async (id: string, status: string) => {
    setUpdatingId(id);
    try {
      await updateBooking.mutateAsync({
        id,
        status: status as Variant_canceled_pending_completed_confirmed,
      });
    } finally {
      setUpdatingId(null);
    }
  };

  const handleHCStatusChange = async (id: string, status: string) => {
    setUpdatingId(id);
    try {
      await updateHC.mutateAsync({
        requestId: id,
        status: status as Variant_assigned_requested_canceled_completed,
      });
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="px-4 py-5 space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Task Queue</h1>
          <p className="text-sm text-muted-foreground">{tasks.length} tasks assigned</p>
        </div>
        {onNavigate && (
          <div className="flex gap-2">
            <button
              onClick={() => onNavigate('scan-qr')}
              className="gradient-btn px-3 py-2 text-xs flex items-center gap-1"
            >
              <QrCode className="w-3.5 h-3.5" />
              Scan QR
            </button>
            <button
              onClick={() => onNavigate('record-vitals')}
              className="gradient-btn px-3 py-2 text-xs flex items-center gap-1"
            >
              <Activity className="w-3.5 h-3.5" />
              Vitals
            </button>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-36 rounded-card" />
          ))}
        </div>
      ) : tasks.length === 0 ? (
        <MedicalCard className="text-center py-12">
          <ClipboardList className="w-12 h-12 mx-auto text-muted-foreground/30 mb-3" />
          <p className="text-muted-foreground font-medium">No tasks assigned</p>
          <p className="text-xs text-muted-foreground mt-1">
            New tasks will appear here when assigned
          </p>
        </MedicalCard>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <MedicalCard key={`${task.type}-${task.id}`}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                    {task.type === 'booking' ? (
                      <FlaskConical className="w-4 h-4 text-white" />
                    ) : (
                      <Home className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div>
                    <span className="text-xs font-semibold bg-gradient-primary-soft text-brand-blue px-2 py-0.5 rounded-full">
                      {task.type === 'booking' ? 'Lab Booking' : 'Home Collection'}
                    </span>
                  </div>
                </div>
                <StatusBadge status={task.status as any} />
              </div>

              <div className="space-y-1.5 mb-3">
                <div className="flex flex-wrap gap-1">
                  {task.tests.map((t, i) => (
                    <span
                      key={i}
                      className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>{task.slot}</span>
                </div>
                {task.address && (
                  <div className="flex items-start gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-1">{task.address}</span>
                  </div>
                )}
                <p className="text-xs text-muted-foreground font-mono">
                  Patient: {task.patientId.slice(0, 16)}...
                </p>
              </div>

              {task.type === 'booking' ? (
                <Select
                  value={task.status}
                  onValueChange={(val) => handleBookingStatusChange(task.id, val)}
                  disabled={updatingId === task.id}
                >
                  <SelectTrigger className="rounded-xl text-xs h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={Variant_canceled_pending_completed_confirmed.pending}>
                      Pending
                    </SelectItem>
                    <SelectItem value={Variant_canceled_pending_completed_confirmed.confirmed}>
                      Confirmed
                    </SelectItem>
                    <SelectItem value={Variant_canceled_pending_completed_confirmed.completed}>
                      Completed
                    </SelectItem>
                    <SelectItem value={Variant_canceled_pending_completed_confirmed.canceled}>
                      Canceled
                    </SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Select
                  value={task.status}
                  onValueChange={(val) => handleHCStatusChange(task.id, val)}
                  disabled={updatingId === task.id}
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
              )}
            </MedicalCard>
          ))}
        </div>
      )}
    </div>
  );
}
