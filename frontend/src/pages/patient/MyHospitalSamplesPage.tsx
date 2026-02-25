import React from 'react';
import {
  ArrowLeft,
  FlaskConical,
  IndianRupee,
  Phone,
  Calendar,
  CreditCard,
  ClipboardList,
  TrendingUp,
  CheckCircle,
  Clock,
} from 'lucide-react';
import MedicalCard from '../../components/shared/MedicalCard';
import { useGetHospitalSamplesByPhone, useGetAllTests } from '../../hooks/useQueries';
import { useGetCallerUserProfile } from '../../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';

type PatientRoute = string;

interface MyHospitalSamplesPageProps {
  onNavigate?: (route: PatientRoute) => void;
}

function formatDate(ts: bigint): string {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export default function PatientMyHospitalSamplesPage({ onNavigate }: MyHospitalSamplesPageProps) {
  const { data: userProfile } = useGetCallerUserProfile();
  const phone = userProfile?.phone || '';
  const { data: result, isLoading } = useGetHospitalSamplesByPhone(phone);
  const { data: allTests = [] } = useGetAllTests();

  const samples = result?.samples || [];
  const totalAmount = result?.totalAmount || 0;
  const totalReceived = result?.totalReceived || 0;
  const totalPending = result?.totalPending || 0;
  const totalDiscount = result?.totalDiscount || 0;
  const count = result?.count ? Number(result.count) : 0;

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
            onClick={() => onNavigate('home')}
            className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-foreground" />
          </button>
        )}
        <div>
          <h1 className="text-xl font-bold text-foreground">Hospital Samples</h1>
          <p className="text-xs text-muted-foreground">{count} records linked to your number</p>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-28 rounded-card" />
          {[1, 2].map((i) => (
            <Skeleton key={i} className="h-44 rounded-card" />
          ))}
        </div>
      ) : (
        <>
          {/* Summary Card */}
          {count > 0 && (
            <MedicalCard className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">Summary</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-primary/5 rounded-xl p-3">
                  <p className="text-xs text-muted-foreground">Total Amount</p>
                  <p className="text-base font-bold text-primary">
                    ₹{totalAmount.toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="bg-green-50 dark:bg-green-950/20 rounded-xl p-3">
                  <p className="text-xs text-muted-foreground">Paid</p>
                  <p className="text-base font-bold text-green-600">
                    ₹{totalReceived.toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="bg-amber-50 dark:bg-amber-950/20 rounded-xl p-3">
                  <p className="text-xs text-muted-foreground">Pending</p>
                  <p className="text-base font-bold text-amber-600">
                    ₹{totalPending.toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="bg-muted/50 rounded-xl p-3">
                  <p className="text-xs text-muted-foreground">Total Discount</p>
                  <p className="text-base font-bold text-foreground">
                    ₹{totalDiscount.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            </MedicalCard>
          )}

          {/* Sample Records */}
          {samples.length === 0 ? (
            <MedicalCard className="text-center py-12">
              <ClipboardList className="w-12 h-12 mx-auto text-muted-foreground/30 mb-3" />
              <p className="text-muted-foreground font-medium">No hospital samples found</p>
              <p className="text-xs text-muted-foreground mt-1">
                Records linked to your phone number will appear here
              </p>
            </MedicalCard>
          ) : (
            <div className="space-y-3">
              {[...samples]
                .sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
                .map((sample, idx) => (
                  <MedicalCard key={idx} className="p-4 space-y-3">
                    {/* Test & Status */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                          <FlaskConical className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-foreground">
                            {getTestName(sample.testId)}
                          </p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(sample.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                      <span className="text-xs bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400 px-2 py-0.5 rounded-full font-medium">
                        {sample.status}
                      </span>
                    </div>

                    {/* Billing */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-primary/5 rounded-lg p-2">
                        <p className="text-muted-foreground">Final Amount</p>
                        <p className="font-bold text-primary text-sm">
                          ₹{sample.finalAmount.toLocaleString('en-IN')}
                        </p>
                      </div>
                      <div
                        className={`rounded-lg p-2 ${
                          sample.pendingAmount > 0
                            ? 'bg-amber-50 dark:bg-amber-950/20'
                            : 'bg-green-50 dark:bg-green-950/20'
                        }`}
                      >
                        <p className="text-muted-foreground">Pending</p>
                        <p
                          className={`font-bold text-sm ${sample.pendingAmount > 0 ? 'text-amber-600' : 'text-green-600'}`}
                        >
                          ₹{sample.pendingAmount.toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>

                    {/* Payment Mode */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <CreditCard className="w-3 h-3" />
                        <span>{sample.paymentMode}</span>
                      </div>
                      {sample.pendingAmount === 0 ? (
                        <div className="flex items-center gap-1 text-green-600">
                          <CheckCircle className="w-3 h-3" />
                          <span>Fully Paid</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-amber-600">
                          <Clock className="w-3 h-3" />
                          <span>Payment Pending</span>
                        </div>
                      )}
                    </div>
                  </MedicalCard>
                ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
