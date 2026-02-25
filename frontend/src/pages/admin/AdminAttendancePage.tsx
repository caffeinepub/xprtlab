import React, { useState, useEffect } from 'react';
import { useGetAllActiveShifts, useGetAttendanceByPhlebotomist } from '../../hooks/useQueries';
import { Loader2, Clock, User, MapPin } from 'lucide-react';

interface AdminAttendancePageProps {
  onNavigate?: (route: string) => void;
}

export default function AdminAttendancePage({ onNavigate }: AdminAttendancePageProps) {
  const [phlebotomistFilter, setPhlebotomistFilter] = useState('');
  const [elapsedTimes, setElapsedTimes] = useState<Record<string, number>>({});

  const { data: activeShifts, isLoading: activeLoading } = useGetAllActiveShifts();
  const { data: allAttendances = [], isLoading: historyLoading } = useGetAttendanceByPhlebotomist();

  // Normalize active shifts to array
  const activeShiftsArray: any[] = activeShifts
    ? Array.isArray(activeShifts) ? activeShifts : [activeShifts]
    : [];

  // Update elapsed times every minute
  useEffect(() => {
    const update = () => {
      const now = Date.now();
      const times: Record<string, number> = {};
      activeShiftsArray.forEach((shift: any) => {
        const checkIn = Number(shift.checkInTime) / 1_000_000;
        times[shift.phlebotomistId] = Math.floor((now - checkIn) / 60000);
      });
      setElapsedTimes(times);
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, [activeShiftsArray.length]);

  const filteredHistory = allAttendances.filter((a: any) =>
    !phlebotomistFilter || a.phlebotomistId?.includes(phlebotomistFilter)
  );

  const formatTime = (ts: number) => {
    const ms = ts > 1e12 ? ts / 1_000_000 : ts;
    return new Date(ms).toLocaleString('en-IN');
  };

  return (
    <div className="p-4 space-y-4 max-w-2xl mx-auto">
      <h2 className="text-lg font-bold text-foreground">Attendance Monitoring</h2>

      {/* Active Shifts */}
      <div className="bg-white rounded-2xl border border-border shadow-sm p-4 space-y-3">
        <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
          <Clock className="h-4 w-4 text-green-500" />
          Currently Active Staff
        </h3>
        {activeLoading ? (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
          </div>
        ) : activeShiftsArray.length === 0 ? (
          <p className="text-xs text-muted-foreground">No staff currently on duty.</p>
        ) : (
          <div className="space-y-2">
            {activeShiftsArray.map((shift: any) => (
              <div key={shift.phlebotomistId} className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-200">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-green-600" />
                  <div>
                    <p className="text-xs font-bold text-green-700">{shift.phlebotomistId}</p>
                    <p className="text-xs text-green-600">Since {formatTime(Number(shift.checkInTime))}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-green-700">
                    {elapsedTimes[shift.phlebotomistId] || 0}m
                  </p>
                  <p className="text-xs text-green-600">elapsed</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Shift History */}
      <div className="bg-white rounded-2xl border border-border shadow-sm p-4 space-y-3">
        <h3 className="text-sm font-bold text-foreground">Shift History</h3>
        <input
          type="text"
          value={phlebotomistFilter}
          onChange={e => setPhlebotomistFilter(e.target.value)}
          placeholder="Filter by phlebotomist ID..."
          className="w-full px-3 py-2 rounded-xl border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        {historyLoading ? (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
          </div>
        ) : filteredHistory.length === 0 ? (
          <p className="text-xs text-muted-foreground">No attendance records found.</p>
        ) : (
          <div className="space-y-2">
            {filteredHistory.map((att: any, i: number) => (
              <div key={i} className="p-3 bg-muted/30 rounded-xl space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-foreground">{att.phlebotomistId}</p>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    att.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {att.status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">In: {formatTime(Number(att.checkInTime))}</p>
                {att.checkOutTime && (
                  <p className="text-xs text-muted-foreground">Out: {formatTime(Number(att.checkOutTime))}</p>
                )}
                {att.totalWorkingMinutes && (
                  <p className="text-xs font-semibold text-primary">{att.totalWorkingMinutes} min worked</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
