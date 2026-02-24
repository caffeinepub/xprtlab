import React, { useState, useMemo } from 'react';
import { Shield, Search, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import MedicalCard from '../../components/shared/MedicalCard';
import { useGetAllAuditLogs } from '../../hooks/useQueries';
import { formatDateTime, formatPrincipal } from '../../utils/formatters';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

const PAGE_SIZE = 20;

export default function AuditLogsPage() {
  const { data: logs = [], isLoading } = useGetAllAuditLogs();
  const [search, setSearch] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return logs
      .filter((log) => {
        const matchSearch =
          log.actionType.toLowerCase().includes(search.toLowerCase()) ||
          log.targetDocument.toLowerCase().includes(search.toLowerCase()) ||
          log.actorId.toString().toLowerCase().includes(search.toLowerCase());

        const ts = Number(log.timestamp) / 1_000_000;
        const matchFrom = !dateFrom || ts >= new Date(dateFrom).getTime();
        const matchTo = !dateTo || ts <= new Date(dateTo + 'T23:59:59').getTime();

        return matchSearch && matchFrom && matchTo;
      })
      .sort((a, b) => Number(b.timestamp) - Number(a.timestamp));
  }, [logs, search, dateFrom, dateTo]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  return (
    <div className="px-4 py-5 space-y-4 animate-fade-in">
      <div>
        <h1 className="text-xl font-bold text-foreground">Audit Logs</h1>
        <p className="text-sm text-muted-foreground">{filtered.length} entries</p>
      </div>

      {/* Filters */}
      <div className="space-y-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search action, target, or actor..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9 rounded-xl"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground font-medium">From</label>
            <Input
              type="date"
              value={dateFrom}
              onChange={(e) => { setDateFrom(e.target.value); setPage(1); }}
              className="rounded-xl text-xs"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground font-medium">To</label>
            <Input
              type="date"
              value={dateTo}
              onChange={(e) => { setDateTo(e.target.value); setPage(1); }}
              className="rounded-xl text-xs"
            />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-12 rounded-xl" />
          ))}
        </div>
      ) : paginated.length === 0 ? (
        <MedicalCard className="text-center py-12">
          <Shield className="w-12 h-12 mx-auto text-muted-foreground/30 mb-3" />
          <p className="text-muted-foreground font-medium">No audit logs found</p>
        </MedicalCard>
      ) : (
        <>
          <MedicalCard className="p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs w-36">Timestamp</TableHead>
                    <TableHead className="text-xs">Action</TableHead>
                    <TableHead className="text-xs">Target</TableHead>
                    <TableHead className="text-xs">Actor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginated.map((log, i) => (
                    <TableRow key={i}>
                      <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                        {formatDateTime(log.timestamp)}
                      </TableCell>
                      <TableCell>
                        <span className="text-xs font-semibold bg-gradient-primary-soft text-brand-blue px-2 py-0.5 rounded-full">
                          {log.actionType}
                        </span>
                      </TableCell>
                      <TableCell className="text-xs font-mono text-muted-foreground max-w-[100px] truncate">
                        {log.targetDocument}
                      </TableCell>
                      <TableCell className="text-xs font-mono text-muted-foreground">
                        {formatPrincipal(log.actorId)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </MedicalCard>

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              Page {page} of {totalPages} · {filtered.length} entries
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-8 h-8 rounded-xl border border-border flex items-center justify-center disabled:opacity-40 hover:bg-muted transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-8 h-8 rounded-xl border border-border flex items-center justify-center disabled:opacity-40 hover:bg-muted transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
