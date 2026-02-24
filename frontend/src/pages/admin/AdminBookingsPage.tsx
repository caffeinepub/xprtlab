import React, { useState } from 'react';
import {
  FlaskConical,
  Clock,
  Search,
  Upload,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import MedicalCard from '../../components/shared/MedicalCard';
import StatusBadge from '../../components/shared/StatusBadge';
import {
  useGetAllBookings,
  useUpdateBookingStatus,
} from '../../hooks/useQueries';
import { formatCurrency } from '../../utils/formatters';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Variant_canceled_pending_completed_confirmed } from '../../backend';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

type StaffRoute = 'tasks' | 'home-collections' | 'record-vitals' | 'scan-qr' | 'admin-bookings' | 'admin-reports' | 'upload-report' | 'incidents' | 'audit-logs' | 'create-camp' | 'submit-incident' | 'profile';

interface AdminBookingsPageProps {
  onNavigate: (route: StaffRoute) => void;
}

export default function AdminBookingsPage({ onNavigate }: AdminBookingsPageProps) {
  const { data: bookings = [], isLoading } = useGetAllBookings();
  const updateStatus = useUpdateBookingStatus();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const filtered = bookings
    .filter((b) => {
      const matchSearch =
        b.id.toLowerCase().includes(search.toLowerCase()) ||
        b.tests.some((t) => t.name.toLowerCase().includes(search.toLowerCase()));
      const matchStatus = statusFilter === 'all' || b.status === statusFilter;
      return matchSearch && matchStatus;
    })
    .sort((a, b) => Number(b.timestamp) - Number(a.timestamp));

  const handleStatusChange = async (id: string, status: string) => {
    setUpdatingId(id);
    try {
      await updateStatus.mutateAsync({
        id,
        status: status as Variant_canceled_pending_completed_confirmed,
      });
      toast.success('Booking status updated');
    } catch {
      toast.error('Failed to update status');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="px-4 py-5 space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">All Bookings</h1>
          <p className="text-sm text-muted-foreground">{bookings.length} total</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onNavigate('upload-report')}
            className="gradient-btn px-3 py-2 text-xs flex items-center gap-1"
          >
            <Upload className="w-3.5 h-3.5" />
            Upload Report
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search bookings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 rounded-xl"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-32 rounded-xl">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
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
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-36 rounded-card" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <MedicalCard className="text-center py-12">
          <FlaskConical className="w-12 h-12 mx-auto text-muted-foreground/30 mb-3" />
          <p className="text-muted-foreground font-medium">No bookings found</p>
        </MedicalCard>
      ) : (
        <div className="space-y-3">
          {filtered.map((booking) => (
            <MedicalCard key={booking.id}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
                    <FlaskConical className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Booking ID</p>
                    <p className="text-xs font-mono font-semibold">{booking.id.slice(0, 14)}...</p>
                  </div>
                </div>
                <StatusBadge status={booking.status as any} />
              </div>

              <div className="space-y-1.5 mb-3">
                <div className="flex flex-wrap gap-1">
                  {booking.tests.map((t) => (
                    <span
                      key={t.id}
                      className="bg-gradient-primary-soft text-brand-blue text-xs px-2 py-0.5 rounded-full font-medium"
                    >
                      {t.name}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {booking.slot}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground font-mono">
                  Patient: {booking.patient.toString().slice(0, 16)}...
                </p>
                <p className="text-sm font-bold gradient-primary-text">
                  {formatCurrency(booking.tests.reduce((s, t) => s + Number(t.price), 0))}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Select
                  value={booking.status}
                  onValueChange={(val) => handleStatusChange(booking.id, val)}
                  disabled={updatingId === booking.id}
                >
                  <SelectTrigger className="flex-1 rounded-xl text-xs h-9">
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
                <button
                  onClick={() => onNavigate('upload-report')}
                  className="px-3 py-2 rounded-xl border border-border text-xs font-medium hover:bg-muted transition-colors"
                >
                  Report
                </button>
              </div>
            </MedicalCard>
          ))}
        </div>
      )}
    </div>
  );
}
