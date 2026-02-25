import React, { useState, useEffect, useMemo } from 'react';
import {
  Clock,
  Users,
  MapPin,
  Calendar,
  Activity,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import MedicalCard from '../../components/shared/MedicalCard';
import { useGetAllActiveShifts, useGetAttendanceByPhlebotomist } from '../../hooks/useQueries';
import { Attendance } from '../../backend';
import { Skeleton } from '@/components/ui/skeleton';

function formatTime(ts: bigint): string {
  return new Date(Number(ts) / 1_000_000).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

function formatDate(ts: bigint): string {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function formatDateTime(ts: bigint): string {
  return `${formatDate(ts)}, ${formatTime(ts)}`;
}

function getElapsedTime(checkInTs: bigint): string {
  const now = Date.now();
  const checkIn = Number(checkInTs) / 1_000_000;
  const diffMs = now - checkIn;
  const totalMinutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

function ActiveStaffCard({ shift, tick }: { shift: Attendance; tick: number }) {
  const elapsed = getElapsedTime(shift.checkInTime);
  return (
    <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-2xl p-4 space-y-2">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-semibold text-foreground text-sm truncate max-w-[160px]">
            {shift.phlebotomistId.length > 14 ? shift.phlebotomistId.slice(0, 14) + '…' : shift.phlebotomistId}
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3" />
            {shift.hospitalId}
          </p>
        </div>
        <span className="flex items-center gap-1 text-xs font-semibold text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/40 px-2 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          ACTIVE
        </span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground flex items-center gap-1">
          <Clock className="w-3 h-3" />
          In: {formatTime(shift.checkInTime)}
        </span>
        <span className="font-bold text-green-700 dark:text-green-400">
          ⏱ {elapsed}
        </span>
      </div>
      <div className="text-xs text-muted-foreground">
        📍 {shift.checkInLat.toFixed(4)}, {shift.checkInLong.toFixed(4)}
      </div>
    </div>
  );
}

function ShiftHistoryCard({ shift }: { shift: Attendance }) {
  const isActive = shift.status === 'ACTIVE';
  const totalMins = shift.totalWorkingMinutes ? Number(shift.totalWorkingMinutes) : null;
  const hours = totalMins !== null ? Math.floor(totalMins / 60) : null;
  const mins = totalMins !== null ? totalMins % 60 : null;

  return (
    <div className={`border rounded-2xl p-4 space-y-2 ${isActive ? 'border-green-300 bg-green-50/50 dark:bg-green-950/10' : 'border-border bg-card'}`}>
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-muted-foreground truncate max-w-[180px]">
          {shift.phlebotomistId.length > 18 ? shift.phlebotomistId.slice(0, 18) + '…' : shift.phlebotomistId}
        </p>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
          isActive
            ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400'
            : 'bg-muted text-muted-foreground'
        }`}>
          {shift.status}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <p className="text-muted-foreground">Check In</p>
          <p className="font-medium">{formatDateTime(shift.checkInTime)}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Check Out</p>
          <p className="font-medium">
            {shift.checkOutTime ? formatDateTime(shift.checkOutTime) : '—'}
          </p>
        </div>
      </div>
      {totalMins !== null && (
        <div className="flex items-center gap-1 text-xs text-primary font-semibold">
          <Activity className="w-3 h-3" />
          Total: {hours}h {mins}m
        </div>
      )}
      <p className="text-xs text-muted-foreground">🏥 {shift.hospitalId}</p>
    </div>
  );
}

export default function AdminAttendancePage() {
  const [tick, setTick] = useState(0);
  const [phlebotomistFilter, setPhlebotomistFilter] = useState('');
  const [phlebotomistInput, setPhlebotomistInput] = useState('');

  // Live elapsed-time counter — updates every minute
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 60000);
    return () => clearInterval(interval);
  }, []);

  const { data: activeShifts = [], isLoading: activeLoading } = useGetAllActiveShifts();
  const { data: shiftHistory = [], isLoading: historyLoading } =
    useGetAttendanceByPhlebotomist(phlebotomistFilter);

  const handleSearch = () => {
    setPhlebotomistFilter(phlebotomistInput.trim());
  };

  // Daily summary for the selected phlebotomist
  const dailySummary = useMemo(() => {
    if (!shiftHistory.length) return null;
    const today = new Date().toDateString();
    const todayShifts = shiftHistory.filter((s) => {
      const d = new Date(Number(s.checkInTime) / 1_000_000);
      return d.toDateString() === today;
    });
    const totalMins = todayShifts.reduce((sum, s) => {
      return sum + (s.totalWorkingMinutes ? Number(s.totalWorkingMinutes) : 0);
    }, 0);
    return {
      count: todayShifts.length,
      totalHours: Math.floor(totalMins / 60),
      totalMins: totalMins % 60,
    };
  }, [shiftHistory]);

  return (
    <div className="px-4 py-5 space-y-5 animate-fade-in">
      <div>
        <h1 className="text-xl font-bold text-foreground">Attendance</h1>
        <p className="text-xs text-muted-foreground">Monitor staff shifts and working hours</p>
      </div>

      {/* Currently Active Staff */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">
            Currently Active Staff
            {activeShifts.length > 0 && (
              <span className="ml-2 text-xs bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 px-2 py-0.5 rounded-full font-medium">
                {activeShifts.length} online
              </span>
            )}
          </h2>
        </div>

        {activeLoading && (
          <div className="grid grid-cols-1 gap-3">
            {[1, 2].map((i) => <Skeleton key={i} className="h-28 rounded-2xl" />)}
          </div>
        )}

        {!activeLoading && activeShifts.length === 0 && (
          <MedicalCard className="text-center py-8">
            <Clock className="w-8 h-8 mx-auto text-muted-foreground/30 mb-2" />
            <p className="text-sm text-muted-foreground">No active shifts right now</p>
          </MedicalCard>
        )}

        {!activeLoading && activeShifts.length > 0 && (
          <div className="grid grid-cols-1 gap-3">
            {activeShifts.map((shift, idx) => (
              <ActiveStaffCard
                key={`${shift.phlebotomistId}-${idx}`}
                shift={shift}
                tick={tick}
              />
            ))}
          </div>
        )}
      </section>

      {/* Shift History Filter */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">Shift History</h2>
        </div>

        <MedicalCard className="p-4 space-y-3">
          <label className="text-xs font-medium text-muted-foreground">Phlebotomist Principal ID</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={phlebotomistInput}
              onChange={(e) => setPhlebotomistInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Enter principal ID..."
              className="flex-1 border border-border rounded-xl px-3 py-2 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <button
              onClick={handleSearch}
              className="gradient-btn px-4 py-2 text-sm font-semibold rounded-xl"
            >
              Search
            </button>
          </div>
        </MedicalCard>

        {/* Daily Summary */}
        {dailySummary && phlebotomistFilter && (
          <MedicalCard className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">Today's Summary</h3>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-muted/40 rounded-xl p-2.5">
                <p className="text-xs text-muted-foreground">Shifts</p>
                <p className="text-lg font-bold text-foreground">{dailySummary.count}</p>
              </div>
              <div className="bg-primary/5 rounded-xl p-2.5">
                <p className="text-xs text-muted-foreground">Hours</p>
                <p className="text-lg font-bold text-primary">{dailySummary.totalHours}h</p>
              </div>
              <div className="bg-green-50 dark:bg-green-950/20 rounded-xl p-2.5">
                <p className="text-xs text-muted-foreground">Minutes</p>
                <p className="text-lg font-bold text-green-600">{dailySummary.totalMins}m</p>
              </div>
            </div>
          </MedicalCard>
        )}

        {/* History Loading */}
        {historyLoading && phlebotomistFilter && (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => <Skeleton key={i} className="h-32 rounded-2xl" />)}
          </div>
        )}

        {/* No filter */}
        {!phlebotomistFilter && (
          <MedicalCard className="text-center py-8">
            <Activity className="w-8 h-8 mx-auto text-muted-foreground/30 mb-2" />
            <p className="text-sm text-muted-foreground">
              Enter a phlebotomist ID to view shift history
            </p>
          </MedicalCard>
        )}

        {/* Empty state */}
        {!historyLoading && phlebotomistFilter && shiftHistory.length === 0 && (
          <MedicalCard className="text-center py-8">
            <AlertCircle className="w-8 h-8 mx-auto text-muted-foreground/30 mb-2" />
            <p className="text-sm text-muted-foreground">
              No shift records found for this phlebotomist
            </p>
          </MedicalCard>
        )}

        {/* Shift History List */}
        {!historyLoading && shiftHistory.length > 0 && (
          <div className="space-y-3">
            {[...shiftHistory]
              .sort((a, b) => Number(b.checkInTime) - Number(a.checkInTime))
              .map((shift, idx) => (
                <ShiftHistoryCard
                  key={`${shift.phlebotomistId}-${shift.checkInTime}-${idx}`}
                  shift={shift}
                />
              ))}
          </div>
        )}
      </section>
    </div>
  );
}
