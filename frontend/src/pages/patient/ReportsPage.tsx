import React from 'react';
import { useGetMyReports } from '../../hooks/useQueries';
import { FileText, Download, Eye } from 'lucide-react';
import MedicalCard from '../../components/shared/MedicalCard';

type PatientRoute = 'home' | 'book-test' | 'slot-selection' | 'my-bookings' | 'home-collection' | 'my-home-collections' | 'reports' | 'my-vitals' | 'profile';

interface ReportsPageProps {
  onNavigate: (route: PatientRoute) => void;
}

export default function ReportsPage({ onNavigate }: ReportsPageProps) {
  const { data: reports = [], isLoading } = useGetMyReports();

  const sorted = [...reports].sort((a, b) => Number(b.timestamp) - Number(a.timestamp));

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={() => onNavigate('home')} className="text-muted-foreground hover:text-foreground">
          ←
        </button>
        <h1 className="text-lg font-bold text-foreground">My Reports</h1>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      ) : sorted.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="font-medium">No reports yet</p>
          <p className="text-sm mt-1">Your lab reports will appear here</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sorted.map((report) => {
            const url = report.file.getDirectURL();
            const date = new Date(Number(report.timestamp) / 1_000_000).toLocaleDateString();
            return (
              <MedicalCard key={report.id} className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <FileText className="w-5 h-5 text-primary flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">
                        Report #{report.id.slice(-8)}
                      </p>
                      <p className="text-xs text-muted-foreground">Booking: {report.bookingId.slice(-8)}</p>
                      <p className="text-xs text-muted-foreground">{date}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                    >
                      <Eye className="w-4 h-4 text-primary" />
                    </a>
                    <a
                      href={url}
                      download
                      className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center hover:bg-accent/20 transition-colors"
                    >
                      <Download className="w-4 h-4 text-accent" />
                    </a>
                  </div>
                </div>
              </MedicalCard>
            );
          })}
        </div>
      )}
    </div>
  );
}
