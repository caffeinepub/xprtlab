import React from 'react';
import {
  ArrowLeft,
  FlaskConical,
  Lock,
  IndianRupee,
  Phone,
  Calendar,
  CreditCard,
  ClipboardList,
} from 'lucide-react';
import MedicalCard from '../../components/shared/MedicalCard';
import { useGetHospitalSamplesByPhlebotomist, useGetAllTests } from '../../hooks/useQueries';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { Skeleton } from '@/components/ui/skeleton';

type StaffRoute = string;

interface MyHospitalSamplesPageProps {
  onNavigate?: (route: StaffRoute) => void;
}

function formatDate(ts: bigint): string {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export default function MyHospitalSamplesPage({ onNavigate }: MyHospitalSamplesPageProps) {
  const { identity } = useInternetIdentity();
  const phlebotomistId = identity?.getPrincipal().toString() || '';
  const { data: samples = [], isLoading } = useGetHospitalSamplesByPhlebotomist(phlebotomistId);
  const { data: allTests = [] } = useGetAllTests();

  const getTestName = (testId: string) => {
    const test = allTests.find((t) => t.id === testId);
    return test?.name || testId;
  };

  return (
    <div className="px-4 py-5 space-y-4 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        {onNavigate && (
          <button
            onClick={() => onNavigate('tasks')}
            className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-foreground" />
          </button>
        )}
        <div>
          <h1 className="text-xl font-bold text-foreground">My Hospital Samples</h1>
          <p className="text-xs text-muted-foreground">{samples.length} records</p>
        </div>
      </div>

      {/* Billing Locked Notice */}
      <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl px-3 py-2.5">
        <Lock className="w-4 h-4 text-amber-600 flex-shrink-0" />
        <p className="text-xs text-amber-700 dark:text-amber-400 font-medium">
          Billing fields are locked after submission. Contact admin for changes.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-48 rounded-card" />
          ))}
        </div>
      ) : samples.length === 0 ? (
        <MedicalCard className="text-center py-12">
          <ClipboardList className="w-12 h-12 mx-auto text-muted-foreground/30 mb-3" />
          <p className="text-muted-foreground font-medium">No samples recorded yet</p>
          <p className="text-xs text-muted-foreground mt-1">
            Samples you record will appear here
          </p>
        </MedicalCard>
      ) : (
        <div className="space-y-3">
          {[...samples]
            .sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
            .map((sample, idx) => (
              <MedicalCard key={idx} className="p-4 space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-foreground">{sample.patientName}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                      <Phone className="w-3 h-3" />
                      <span>{sample.phone}</span>
                    </div>
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400 px-2 py-0.5 rounded-full font-medium">
                    {sample.status}
                  </span>
                </div>

                {/* Test & Date */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <FlaskConical className="w-3 h-3" />
                    <span className="font-medium text-foreground">{getTestName(sample.testId)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(sample.createdAt)}</span>
                  </div>
                </div>

                {/* Billing (locked) */}
                <div className="bg-muted/40 rounded-xl p-3 space-y-2">
                  <div className="flex items-center gap-1 mb-1">
                    <Lock className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground font-medium">Billing Locked</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">MRP</span>
                      <p className="font-semibold text-foreground">
                        ₹{sample.mrp.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Discount</span>
                      <p className="font-semibold text-foreground">
                        ₹{sample.discount.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Final Amount</span>
                      <p className="font-semibold text-primary">
                        ₹{sample.finalAmount.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Received</span>
                      <p className="font-semibold text-green-600">
                        ₹{sample.amountReceived.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Pending</span>
                      <p
                        className={`font-semibold ${sample.pendingAmount > 0 ? 'text-amber-600' : 'text-green-600'}`}
                      >
                        ₹{sample.pendingAmount.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Payment</span>
                      <div className="flex items-center gap-1">
                        <CreditCard className="w-3 h-3 text-muted-foreground" />
                        <p className="font-semibold text-foreground">{sample.paymentMode}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </MedicalCard>
            ))}
        </div>
      )}
    </div>
  );
}
