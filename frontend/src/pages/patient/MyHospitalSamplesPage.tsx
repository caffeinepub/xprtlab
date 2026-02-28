import React, { useState } from 'react';
import { SampleStatus } from '../../types/models';
import { useGetHospitalSamplesByPhone } from '../../hooks/useQueries';
import { getDemoSamples, isDemoMode as checkDemoMode } from '../../utils/demoData';
import { getSampleStatusColor, getStatusDescription } from '../../utils/deliveryHelpers';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp, FlaskConical, Package } from 'lucide-react';
import SampleWorkflowTimeline from '../../components/shared/SampleWorkflowTimeline';

interface MyHospitalSamplesPageProps {
  isDemoMode?: boolean;
}

export default function MyHospitalSamplesPage({ isDemoMode = false }: MyHospitalSamplesPageProps) {
  const { data: backendSamples = [], isLoading } = useGetHospitalSamplesByPhone();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const demoSamples = isDemoMode ? getDemoSamples() : [];

  const allSamples = isDemoMode
    ? [
        ...demoSamples.map((s) => ({ ...s, id: s.id ?? 'demo' })),
        ...backendSamples,
      ]
    : backendSamples;

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  if (isLoading && !isDemoMode) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (allSamples.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center px-4">
        <Package className="h-12 w-12 text-muted-foreground mb-3" />
        <p className="text-sm font-medium text-foreground">No lab samples yet</p>
        <p className="text-xs text-muted-foreground mt-1">
          Your hospital sample records will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 py-4 space-y-3">
      <div className="flex items-center gap-2 mb-2">
        <FlaskConical className="h-5 w-5 text-primary" />
        <h2 className="text-base font-semibold text-foreground">My Lab Samples</h2>
        <Badge variant="secondary" className="text-xs">{allSamples.length}</Badge>
      </div>

      {allSamples.map((sample: any) => {
        const sampleId = sample.id ?? sample.patientName;
        const isExpanded = expandedId === sampleId;
        const status: SampleStatus = sample.status ?? 'SAMPLE_COLLECTED';

        return (
          <div
            key={sampleId}
            className="rounded-xl border border-border bg-card overflow-hidden"
          >
            {/* Summary row */}
            <button
              className="w-full flex items-center justify-between p-3 text-left"
              onClick={() => toggleExpand(sampleId)}
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{sample.patientName}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {sample.phone} · {new Date(Number(sample.createdAt)).toLocaleDateString('en-IN')}
                </p>
              </div>
              <div className="flex items-center gap-2 ml-2 shrink-0">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full border font-medium ${getSampleStatusColor(status)}`}
                >
                  {status.replace(/_/g, ' ')}
                </span>
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            </button>

            {/* Expanded details */}
            {isExpanded && (
              <div className="border-t border-border px-3 py-3 space-y-3">
                {/* Summary grid */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-muted/50 rounded-lg p-2 text-center">
                    <p className="text-xs text-muted-foreground">MRP</p>
                    <p className="text-sm font-semibold text-foreground">
                      ₹{Number(sample.totalMrp).toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-2 text-center">
                    <p className="text-xs text-muted-foreground">Discount</p>
                    <p className="text-sm font-semibold text-foreground">
                      ₹{Number(sample.discountAmount).toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-2 text-center">
                    <p className="text-xs text-muted-foreground">Final</p>
                    <p className="text-sm font-semibold text-foreground">
                      ₹{Number(sample.finalAmount).toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>

                {/* Tests */}
                {sample.tests && sample.tests.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">Tests</p>
                    <div className="space-y-1">
                      {sample.tests.map((t: any, i: number) => (
                        <div key={i} className="flex justify-between text-xs">
                          <span className="text-foreground">{t.testName}</span>
                          <span className="text-muted-foreground">₹{Number(t.price).toLocaleString('en-IN')}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Delivery info */}
                {sample.deliveryMethod && (
                  <div className="bg-emerald-50 rounded-lg p-2">
                    <p className="text-xs text-emerald-700 font-medium">
                      Delivered via {String(sample.deliveryMethod).replace(/_/g, ' ')}
                    </p>
                    {sample.deliveredAt && (
                      <p className="text-xs text-emerald-600 mt-0.5">
                        {new Date(Number(sample.deliveredAt)).toLocaleString('en-IN')}
                      </p>
                    )}
                  </div>
                )}

                {/* Timeline */}
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">Status Timeline</p>
                  <SampleWorkflowTimeline currentStatus={status} />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
