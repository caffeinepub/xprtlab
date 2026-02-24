import React, { useState } from 'react';
import { FileText, Eye, Download, Calendar, Search, Upload } from 'lucide-react';
import { Input } from '@/components/ui/input';
import MedicalCard from '../../components/shared/MedicalCard';
import { useGetAllReports } from '../../hooks/useQueries';
import { formatDateTime } from '../../utils/formatters';
import { Skeleton } from '@/components/ui/skeleton';

type StaffRoute = 'tasks' | 'home-collections' | 'record-vitals' | 'scan-qr' | 'admin-bookings' | 'admin-reports' | 'upload-report' | 'incidents' | 'audit-logs' | 'create-camp' | 'submit-incident' | 'profile';

interface AdminReportsPageProps {
  onNavigate?: (route: StaffRoute) => void;
}

export default function AdminReportsPage({ onNavigate }: AdminReportsPageProps) {
  const { data: reports = [], isLoading } = useGetAllReports();
  const [search, setSearch] = useState('');

  const filtered = reports
    .filter(
      (r) =>
        r.id.toLowerCase().includes(search.toLowerCase()) ||
        r.bookingId.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => Number(b.timestamp) - Number(a.timestamp));

  const handleView = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleDownload = (url: string, id: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = `report-${id}.pdf`;
    a.target = '_blank';
    a.click();
  };

  return (
    <div className="px-4 py-5 space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">All Reports</h1>
          <p className="text-sm text-muted-foreground">{reports.length} reports</p>
        </div>
        {onNavigate && (
          <button
            onClick={() => onNavigate('upload-report')}
            className="gradient-btn px-3 py-2 text-xs flex items-center gap-1"
          >
            <Upload className="w-3.5 h-3.5" />
            Upload
          </button>
        )}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by ID or booking..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 rounded-xl"
        />
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <Skeleton key={i} className="h-28 rounded-card" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <MedicalCard className="text-center py-12">
          <FileText className="w-12 h-12 mx-auto text-muted-foreground/30 mb-3" />
          <p className="text-muted-foreground font-medium">No reports found</p>
        </MedicalCard>
      ) : (
        <div className="space-y-3">
          {filtered.map((report) => {
            const fileUrl = report.file.getDirectURL();
            return (
              <MedicalCard key={report.id}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">Lab Report</p>
                    <p className="text-xs text-muted-foreground">
                      Booking: {report.bookingId.slice(0, 14)}...
                    </p>
                    <p className="text-xs text-muted-foreground font-mono">
                      Patient: {report.patient.toString().slice(0, 14)}...
                    </p>
                    <div className="flex items-center gap-1 mt-0.5 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDateTime(report.timestamp)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleView(fileUrl)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border-2 border-brand-blue text-brand-blue text-xs font-semibold hover:bg-gradient-primary-soft transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    View
                  </button>
                  <button
                    onClick={() => handleDownload(fileUrl, report.id)}
                    className="flex-1 gradient-btn flex items-center justify-center gap-1.5 py-2 text-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download
                  </button>
                </div>
              </MedicalCard>
            );
          })}
        </div>
      )}
    </div>
  );
}
