import React, { useState } from 'react';
import { useGetAllAuditLogs } from '../../hooks/useQueries';
import { Search, Loader2, FileText } from 'lucide-react';

interface AuditLogsPageProps {
  onNavigate?: (route: string) => void;
}

export default function AuditLogsPage({ onNavigate }: AuditLogsPageProps) {
  const [search, setSearch] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 20;

  const { data: logs = [], isLoading } = useGetAllAuditLogs();

  const filtered = logs.filter((log: any) => {
    const matchSearch =
      !search ||
      log.actionType?.toLowerCase().includes(search.toLowerCase()) ||
      log.actorId?.toString().includes(search) ||
      log.targetDocument?.toLowerCase().includes(search.toLowerCase());

    const ts = Number(log.timestamp) / 1_000_000;
    const matchStart = !startDate || ts >= new Date(startDate).getTime();
    const matchEnd = !endDate || ts <= new Date(endDate).getTime() + 86400000;

    return matchSearch && matchStart && matchEnd;
  });

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  const formatTime = (ts: number) => {
    const ms = ts > 1e12 ? ts / 1_000_000 : ts;
    return new Date(ms).toLocaleString('en-IN');
  };

  return (
    <div className="p-4 space-y-4 max-w-2xl mx-auto">
      <h2 className="text-lg font-bold text-foreground">Audit Logs</h2>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-border shadow-sm p-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search by action, user, or document..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-foreground">From</label>
            <input
              type="date"
              value={startDate}
              onChange={e => { setStartDate(e.target.value); setPage(1); }}
              className="w-full px-3 py-2 rounded-xl border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-foreground">To</label>
            <input
              type="date"
              value={endDate}
              onChange={e => { setEndDate(e.target.value); setPage(1); }}
              className="w-full px-3 py-2 rounded-xl border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : paginated.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center space-y-2">
          <FileText className="h-10 w-10 text-muted-foreground/40" />
          <p className="text-sm font-semibold text-foreground">No audit logs found</p>
        </div>
      ) : (
        <div className="space-y-2">
          {paginated.map((log: any, i: number) => (
            <div key={i} className="bg-white rounded-2xl border border-border shadow-sm p-4 space-y-1">
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                  {log.actionType}
                </span>
                <span className="text-xs text-muted-foreground flex-shrink-0">
                  {formatTime(Number(log.timestamp))}
                </span>
              </div>
              <p className="text-xs text-muted-foreground font-mono truncate">
                Actor: {log.actorId?.toString()}
              </p>
              {log.targetDocument && (
                <p className="text-xs text-muted-foreground">Target: {log.targetDocument}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1.5 rounded-xl border border-border text-xs font-semibold disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-xs text-muted-foreground font-medium">
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1.5 rounded-xl border border-border text-xs font-semibold disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
