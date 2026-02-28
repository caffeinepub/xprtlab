import React, { useState } from 'react';
import { SampleStatus, DeliveryMethod } from '../../types/models';
import { useGetAllHospitalSamples, useMarkAsDispatched, useMarkSampleDelivered, useConfirmWhatsAppDelivery } from '../../hooks/useQueries';
import { getDemoSamples, isDemoMode as checkDemoMode, updateDemoSampleStatus, DEMO_HOSPITAL_ID } from '../../utils/demoData';
import { getSampleStatusColor } from '../../utils/deliveryHelpers';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp, FlaskConical, Package } from 'lucide-react';
import SampleWorkflowTimeline from '../../components/shared/SampleWorkflowTimeline';
import SampleActionControls from '../../components/shared/SampleActionControls';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { toast } from 'sonner';

interface MyHospitalSamplesPageProps {
  isDemoMode?: boolean;
  role?: string;
}

export default function MyHospitalSamplesPage({ isDemoMode = false, role = 'phlebotomist' }: MyHospitalSamplesPageProps) {
  const { identity } = useInternetIdentity();
  const userId = identity?.getPrincipal().toString() ?? 'demo-user';

  const { data: backendSamples = [], isLoading } = useGetAllHospitalSamples();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [demoSamplesState, setDemoSamplesState] = useState(() => getDemoSamples());

  const markDispatched = useMarkAsDispatched();
  const markDelivered = useMarkSampleDelivered();
  const confirmWhatsApp = useConfirmWhatsAppDelivery();

  const allSamples = isDemoMode
    ? [
        ...demoSamplesState.map((s) => ({ ...s, id: s.id ?? 'demo' })),
        ...backendSamples,
      ]
    : backendSamples;

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleMarkDispatched = async (sampleId: string) => {
    if (isDemoMode) {
      updateDemoSampleStatus(sampleId, 'DISPATCHED', role, 'Dispatched by phlebotomist');
      setDemoSamplesState(getDemoSamples());
      toast.success('Sample marked as dispatched');
      return;
    }
    try {
      await markDispatched.mutateAsync(sampleId);
      toast.success('Sample marked as dispatched');
    } catch (err: any) {
      toast.error(`Failed: ${err?.message ?? err}`);
    }
  };

  const handleMarkDelivered = async (
    sampleId: string,
    method: DeliveryMethod,
    deliveredByRole: string,
    deliveredById: string
  ) => {
    if (isDemoMode) {
      updateDemoSampleStatus(sampleId, 'REPORT_DELIVERED', role, `Delivered via ${method}`);
      setDemoSamplesState(getDemoSamples());
      toast.success('Report marked as delivered');
      return;
    }
    try {
      await markDelivered.mutateAsync({ sampleId, deliveryMethod: method, deliveredByRole, deliveredById, action: 'deliver' });
      toast.success('Report marked as delivered');
    } catch (err: any) {
      toast.error(`Failed: ${err?.message ?? err}`);
    }
  };

  const handleConfirmWhatsApp = async (sampleId: string) => {
    if (isDemoMode) {
      updateDemoSampleStatus(sampleId, 'REPORT_DELIVERED', role, 'Delivered via WhatsApp');
      setDemoSamplesState(getDemoSamples());
      toast.success('WhatsApp delivery confirmed');
      return;
    }
    try {
      await confirmWhatsApp.mutateAsync(sampleId);
      toast.success('WhatsApp delivery confirmed');
    } catch (err: any) {
      toast.error(`Failed: ${err?.message ?? err}`);
    }
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
        <p className="text-sm font-medium text-foreground">No samples yet</p>
        <p className="text-xs text-muted-foreground mt-1">
          Samples you collect will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 py-4 space-y-3">
      <div className="flex items-center gap-2 mb-2">
        <FlaskConical className="h-5 w-5 text-primary" />
        <h2 className="text-base font-semibold text-foreground">My Collected Samples</h2>
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

            {isExpanded && (
              <div className="border-t border-border px-3 py-3 space-y-3">
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

                <SampleActionControls
                  sampleId={sampleId}
                  status={status}
                  reportUrl={sample.reportUrl}
                  userRole={role}
                  userId={userId}
                  phlebotomistId={sample.phlebotomistId}
                  isDemoMode={isDemoMode}
                  onMarkDispatched={handleMarkDispatched}
                  onMarkDelivered={handleMarkDelivered}
                  onConfirmWhatsApp={handleConfirmWhatsApp}
                />

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
