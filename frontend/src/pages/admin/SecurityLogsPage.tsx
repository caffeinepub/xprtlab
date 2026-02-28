import React, { useState } from 'react';
import { useGetSecurityLogs, useResetDeviceBinding } from '../../hooks/useQueries';
import { Loader2, Shield, MapPin } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

// Local type definition — not imported from models to avoid coupling
interface SecurityLogEntry {
  userId: string;
  eventType: string;
  deviceId: string;
  latitude?: number;
  longitude?: number;
  timestamp: number;
  reason: string;
}

const EVENT_TYPES = ['all', 'login', 'logout', 'device_bound', 'suspicious', 'failed_auth'];

const eventColors: Record<string, string> = {
  login: 'bg-green-100 text-green-700',
  logout: 'bg-gray-100 text-gray-600',
  device_bound: 'bg-blue-100 text-blue-700',
  suspicious: 'bg-red-100 text-red-700',
  failed_auth: 'bg-orange-100 text-orange-700',
};

interface SecurityLogsPageProps {
  onNavigate?: (route: string) => void;
}

export default function SecurityLogsPage({ onNavigate }: SecurityLogsPageProps) {
  const [userIdFilter, setUserIdFilter] = useState('');
  const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>([]);
  const [resetTarget, setResetTarget] = useState<string | null>(null);

  const { data: logs = [], isLoading } = useGetSecurityLogs();
  const resetMutation = useResetDeviceBinding();

  const filtered = (logs as SecurityLogEntry[]).filter((log) => {
    const matchUser = !userIdFilter || log.userId?.includes(userIdFilter);
    const matchEvent = selectedEventTypes.length === 0 || selectedEventTypes.includes(log.eventType);
    return matchUser && matchEvent;
  });

  const toggleEventType = (type: string) => {
    setSelectedEventTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleResetConfirm = async () => {
    if (!resetTarget) return;
    try {
      await resetMutation.mutateAsync(resetTarget);
      setResetTarget(null);
    } catch (err) {
      console.error('Failed to reset device binding', err);
    }
  };

  const formatTime = (ts: number) => {
    const ms = ts > 1e12 ? ts / 1_000_000 : ts;
    return new Date(ms).toLocaleString('en-IN');
  };

  return (
    <div className="p-4 space-y-4 max-w-2xl mx-auto">
      <h2 className="text-lg font-bold text-foreground">Security Logs</h2>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-border shadow-sm p-4 space-y-3">
        <input
          type="text"
          value={userIdFilter}
          onChange={e => setUserIdFilter(e.target.value)}
          placeholder="Filter by user ID..."
          className="w-full px-3 py-2 rounded-xl border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        <div className="flex gap-2 flex-wrap">
          {EVENT_TYPES.slice(1).map(type => (
            <button
              key={type}
              onClick={() => toggleEventType(type)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors border ${
                selectedEventTypes.includes(type)
                  ? 'bg-primary text-white border-primary'
                  : `${eventColors[type] || 'bg-muted text-muted-foreground'} border-transparent`
              }`}
            >
              {type.replace('_', ' ')}
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
          <Shield className="h-10 w-10 text-muted-foreground/40" />
          <p className="text-sm font-semibold text-foreground">No security logs found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((log, i) => (
            <div key={i} className="bg-white rounded-2xl border border-border shadow-sm p-4 space-y-2">
              <div className="flex items-start justify-between">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${eventColors[log.eventType] || 'bg-gray-100 text-gray-600'}`}>
                  {log.eventType.replace('_', ' ').toUpperCase()}
                </span>
                <span className="text-xs text-muted-foreground">{formatTime(Number(log.timestamp))}</span>
              </div>
              <p className="text-xs font-mono text-muted-foreground">User: {log.userId}</p>
              <p className="text-xs text-muted-foreground">Device: {log.deviceId}</p>
              {log.reason && <p className="text-xs text-muted-foreground">Reason: {log.reason}</p>}
              {(log.latitude || log.longitude) && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>{log.latitude?.toFixed(4)}, {log.longitude?.toFixed(4)}</span>
                </div>
              )}
              <button
                onClick={() => setResetTarget(log.userId)}
                className="text-xs font-semibold text-red-600 hover:text-red-700 underline"
              >
                Reset Device Binding
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Reset Confirmation */}
      <AlertDialog open={!!resetTarget} onOpenChange={open => !open && setResetTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset Device Binding</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to reset the device binding for user {resetTarget}? This will require them to re-bind their device.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleResetConfirm}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {resetMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin mr-1" />
              ) : null}
              Reset Binding
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
