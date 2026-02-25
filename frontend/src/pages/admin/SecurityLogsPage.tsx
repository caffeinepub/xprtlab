import React, { useState, useMemo } from 'react';
import {
  ShieldAlert,
  Search,
  Filter,
  AlertTriangle,
  MapPin,
  Smartphone,
  Loader2,
  RefreshCw,
  X,
  CheckCircle,
} from 'lucide-react';
import MedicalCard from '../../components/shared/MedicalCard';
import { useGetSecurityLogs, useResetDeviceBinding } from '../../hooks/useQueries';
import { SecurityLog } from '../../backend';
import { Skeleton } from '@/components/ui/skeleton';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const EVENT_TYPES = [
  'MOCK_LOCATION_DETECTED',
  'DEVICE_MISMATCH',
  'MULTIPLE_SESSION_ATTEMPT',
  'OUTSIDE_GEOFENCE',
  'LOW_GPS_ACCURACY',
];

function getEventBadgeStyle(eventType: string): string {
  switch (eventType) {
    case 'MOCK_LOCATION_DETECTED':
      return 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400';
    case 'DEVICE_MISMATCH':
      return 'bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400';
    case 'MULTIPLE_SESSION_ATTEMPT':
      return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-400';
    case 'OUTSIDE_GEOFENCE':
      return 'bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400';
    case 'LOW_GPS_ACCURACY':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400';
    default:
      return 'bg-muted text-muted-foreground';
  }
}

function formatDateTime(ts: bigint): string {
  const d = new Date(Number(ts) / 1_000_000);
  return d.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

interface SecurityLogCardProps {
  log: SecurityLog;
  onResetDevice: (userId: string) => void;
  resettingUserId: string | null;
}

function SecurityLogCard({ log, onResetDevice, resettingUserId }: SecurityLogCardProps) {
  const isResetting = resettingUserId === log.userId;

  return (
    <MedicalCard className="p-4 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <span
            className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${getEventBadgeStyle(
              log.eventType
            )}`}
          >
            {log.eventType.replace(/_/g, ' ')}
          </span>
          <p className="text-xs text-muted-foreground mt-1">{formatDateTime(log.timestamp)}</p>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              disabled={isResetting}
              className="flex items-center gap-1 text-xs text-destructive font-medium border border-destructive/30 rounded-lg px-2 py-1 hover:bg-destructive/10 transition-colors disabled:opacity-50 flex-shrink-0"
            >
              {isResetting ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <RefreshCw className="w-3 h-3" />
              )}
              Reset Device
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Reset Device Binding?</AlertDialogTitle>
              <AlertDialogDescription>
                This will remove the device binding for user{' '}
                <strong className="font-mono text-xs">
                  {log.userId.length > 20 ? log.userId.slice(0, 20) + '…' : log.userId}
                </strong>
                . They will need to re-bind their device on next login.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => onResetDevice(log.userId)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Reset Binding
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="space-y-1.5 text-xs">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Smartphone className="w-3 h-3 flex-shrink-0" />
          <span className="font-mono truncate">{log.deviceId || '—'}</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <MapPin className="w-3 h-3 flex-shrink-0" />
          <span>
            {log.latitude != null && log.longitude != null
              ? `${log.latitude.toFixed(5)}, ${log.longitude.toFixed(5)}`
              : 'No coordinates'}
          </span>
        </div>
        <div className="flex items-start gap-1.5 text-muted-foreground">
          <AlertTriangle className="w-3 h-3 flex-shrink-0 mt-0.5" />
          <span className="italic">{log.reason || '—'}</span>
        </div>
        <div className="text-muted-foreground/70 font-mono text-[10px] truncate">
          User: {log.userId}
        </div>
      </div>
    </MedicalCard>
  );
}

export default function SecurityLogsPage() {
  const [userIdFilter, setUserIdFilter] = useState('');
  const [userIdInput, setUserIdInput] = useState('');
  const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>([]);
  const [resettingUserId, setResettingUserId] = useState<string | null>(null);
  const [resetSuccess, setResetSuccess] = useState<string | null>(null);

  const { data: logs = [], isLoading, refetch } = useGetSecurityLogs(userIdFilter, '');
  const resetDevice = useResetDeviceBinding();

  const filteredLogs = useMemo(() => {
    if (selectedEventTypes.length === 0) return logs;
    return logs.filter((log) => selectedEventTypes.includes(log.eventType));
  }, [logs, selectedEventTypes]);

  const handleSearch = () => {
    setUserIdFilter(userIdInput.trim());
  };

  const handleClearUser = () => {
    setUserIdInput('');
    setUserIdFilter('');
  };

  const toggleEventType = (et: string) => {
    setSelectedEventTypes((prev) =>
      prev.includes(et) ? prev.filter((e) => e !== et) : [...prev, et]
    );
  };

  const handleResetDevice = async (userId: string) => {
    setResettingUserId(userId);
    setResetSuccess(null);
    try {
      await resetDevice.mutateAsync(userId);
      setResetSuccess(userId);
      setTimeout(() => setResetSuccess(null), 3000);
    } catch {
      // error handled by mutation
    } finally {
      setResettingUserId(null);
    }
  };

  return (
    <div className="px-4 py-5 space-y-4 animate-fade-in">
      <div>
        <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-primary" />
          Security Logs
        </h1>
        <p className="text-xs text-muted-foreground">Monitor security events and device bindings</p>
      </div>

      {/* Success toast */}
      {resetSuccess && (
        <div className="flex items-center gap-2 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-xl p-3">
          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
          <p className="text-xs text-green-700 dark:text-green-400">
            Device binding reset successfully.
          </p>
        </div>
      )}

      {/* Filters */}
      <MedicalCard className="p-4 space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <Filter className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Filters</h3>
        </div>

        {/* User ID filter */}
        <div>
          <label className="text-xs font-medium text-muted-foreground">User ID</label>
          <div className="flex gap-2 mt-1">
            <div className="relative flex-1">
              <input
                type="text"
                value={userIdInput}
                onChange={(e) => setUserIdInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Filter by user principal ID..."
                className="w-full border border-border rounded-xl px-3 py-2 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 pr-8"
              />
              {userIdInput && (
                <button
                  onClick={handleClearUser}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <button
              onClick={handleSearch}
              className="gradient-btn px-3 py-2 text-sm font-semibold rounded-xl flex items-center gap-1"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Event type multi-select */}
        <div>
          <label className="text-xs font-medium text-muted-foreground">Event Types</label>
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {EVENT_TYPES.map((et) => (
              <button
                key={et}
                onClick={() => toggleEventType(et)}
                className={`text-[10px] font-semibold px-2 py-1 rounded-full border transition-all ${
                  selectedEventTypes.includes(et)
                    ? `${getEventBadgeStyle(et)} border-current`
                    : 'bg-muted text-muted-foreground border-border hover:border-primary/40'
                }`}
              >
                {et.replace(/_/g, ' ')}
              </button>
            ))}
            {selectedEventTypes.length > 0 && (
              <button
                onClick={() => setSelectedEventTypes([])}
                className="text-[10px] font-medium text-muted-foreground hover:text-foreground px-2 py-1 rounded-full border border-border"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </MedicalCard>

      {/* Stats bar */}
      {!isLoading && logs.length > 0 && (
        <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
          <span>
            Showing <strong className="text-foreground">{filteredLogs.length}</strong> of{' '}
            <strong className="text-foreground">{logs.length}</strong> events
          </span>
          <button
            onClick={() => refetch()}
            className="flex items-center gap-1 text-primary hover:underline"
          >
            <RefreshCw className="w-3 h-3" />
            Refresh
          </button>
        </div>
      )}

      {/* Loading */}
      {isLoading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-36 rounded-2xl" />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && filteredLogs.length === 0 && (
        <MedicalCard className="text-center py-10">
          <ShieldAlert className="w-10 h-10 mx-auto text-muted-foreground/30 mb-2" />
          <p className="text-sm text-muted-foreground">
            {logs.length === 0
              ? 'No security events recorded yet'
              : 'No events match the selected filters'}
          </p>
        </MedicalCard>
      )}

      {/* Log cards */}
      {!isLoading && filteredLogs.length > 0 && (
        <div className="space-y-3">
          {[...filteredLogs]
            .sort((a, b) => Number(b.timestamp) - Number(a.timestamp))
            .map((log, idx) => (
              <SecurityLogCard
                key={`${log.userId}-${log.timestamp}-${idx}`}
                log={log}
                onResetDevice={handleResetDevice}
                resettingUserId={resettingUserId}
              />
            ))}
        </div>
      )}
    </div>
  );
}
