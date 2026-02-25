import React from 'react';
import { useGetHospitalSamplesByPhlebotomist, useGetAllTests } from '../../hooks/useQueries';
import { Loader2, FlaskConical, IndianRupee } from 'lucide-react';

export default function PhlebotomistMyHospitalSamplesPage() {
  const { data: samples = [], isLoading } = useGetHospitalSamplesByPhlebotomist();

  const formatTime = (ts: number) => {
    const ms = ts > 1e12 ? ts / 1_000_000 : ts;
    return new Date(ms).toLocaleDateString('en-IN');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4 max-w-lg mx-auto">
      <h2 className="text-lg font-bold text-foreground">My Collected Samples</h2>

      {samples.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center space-y-2">
          <FlaskConical className="h-10 w-10 text-muted-foreground/40" />
          <p className="text-sm font-semibold text-foreground">No samples collected yet</p>
          <p className="text-xs text-muted-foreground">Samples you collect will appear here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {samples.map((sample: any, i: number) => (
            <div key={i} className="bg-white rounded-2xl border border-border shadow-sm p-4 space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-bold text-sm text-foreground">{sample.patientName}</p>
                  <p className="text-xs text-muted-foreground">{sample.phone}</p>
                </div>
                <span className="text-xs text-muted-foreground">{formatTime(Number(sample.createdAt))}</span>
              </div>
              <div className="grid grid-cols-2 gap-1 text-xs">
                <span className="text-muted-foreground">Hospital: <span className="font-semibold text-foreground">{sample.hospitalId}</span></span>
                <span className="text-muted-foreground">Test: <span className="font-semibold text-foreground">{sample.testId}</span></span>
                <span className="text-muted-foreground">Final: <span className="font-bold text-primary">₹{Number(sample.finalAmount).toFixed(0)}</span></span>
                <span className="text-muted-foreground">Mode: <span className="font-semibold text-foreground">{sample.paymentMode}</span></span>
              </div>
              {Number(sample.pendingAmount) > 0 && (
                <div className="flex items-center gap-1 text-xs font-bold text-orange-600">
                  <IndianRupee className="h-3 w-3" />
                  Pending: ₹{Number(sample.pendingAmount).toFixed(0)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
