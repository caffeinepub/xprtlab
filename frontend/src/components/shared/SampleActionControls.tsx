import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Share2, Eye, CheckCircle } from 'lucide-react';
import { SampleStatus, DeliveryMethod, HospitalSample, HospitalSampleTestRef } from '../../types/models';
import DeliveryMethodSelectionDialog from './DeliveryMethodSelectionDialog';
import WhatsAppShareConfirmDialog from './WhatsAppShareConfirmDialog';

interface SampleActionControlsProps {
  sampleId: string;
  status: SampleStatus;
  reportUrl?: string | null;
  userRole: string;
  userId: string;
  phlebotomistId?: string;
  patientName?: string;
  tests?: HospitalSampleTestRef[];
  isDemoMode?: boolean;
  onMarkDispatched?: (sampleId: string) => void;
  onMarkDelivered?: (sampleId: string, method: DeliveryMethod, role: string, id: string) => void;
  onConfirmWhatsApp?: (sampleId: string) => void;
}

export default function SampleActionControls({
  sampleId,
  status,
  reportUrl,
  userRole,
  userId,
  phlebotomistId,
  patientName = '',
  tests = [],
  isDemoMode = false,
  onMarkDispatched,
  onMarkDelivered,
  onConfirmWhatsApp,
}: SampleActionControlsProps) {
  const [deliveryDialogOpen, setDeliveryDialogOpen] = useState(false);
  const [whatsAppDialogOpen, setWhatsAppDialogOpen] = useState(false);

  const isLabAdmin = userRole === 'labAdmin';
  const isSuperAdmin = userRole === 'superAdmin';
  const isPhlebotomist = userRole === 'phlebotomist';

  const isOwnSample = isDemoMode || phlebotomistId === userId;
  const canActOnSample = isLabAdmin || isSuperAdmin || (isPhlebotomist && isOwnSample);

  if (!canActOnSample) return null;

  // Build a minimal HospitalSample for dialogs that require it
  const sampleForDialog: HospitalSample = {
    patientName,
    phone: '',
    hospitalId: '',
    phlebotomistId: phlebotomistId ?? '',
    tests,
    totalMrp: BigInt(0),
    discountAmount: BigInt(0),
    maxAllowedDiscount: BigInt(0),
    finalAmount: BigInt(0),
    amountReceived: BigInt(0),
    pendingAmount: BigInt(0),
    paymentMode: '',
    billingLocked: false,
    createdByRole: '',
    updatedByAdmin: false,
    createdAt: BigInt(0),
    status,
    statusHistory: [],
  };

  const handleDeliveryConfirm = (method: DeliveryMethod) => {
    onMarkDelivered?.(sampleId, method, userRole, userId);
    setDeliveryDialogOpen(false);
  };

  const handleWhatsAppConfirm = () => {
    onConfirmWhatsApp?.(sampleId);
    setWhatsAppDialogOpen(false);
  };

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {/* SAMPLE_COLLECTED → Dispatched (phlebotomist or admin) */}
      {status === 'SAMPLE_COLLECTED' && onMarkDispatched && (
        <Button
          size="sm"
          variant="outline"
          className="gap-1.5 text-xs"
          onClick={() => onMarkDispatched(sampleId)}
        >
          <CheckCircle className="h-3.5 w-3.5" />
          Mark Dispatched
        </Button>
      )}

      {/* REPORT_READY → Delivered (admin only) */}
      {status === 'REPORT_READY' && (isLabAdmin || isSuperAdmin) && (
        <>
          {reportUrl && (
            <>
              <Button
                size="sm"
                variant="outline"
                className="gap-1.5 text-xs"
                onClick={() => window.open(reportUrl, '_blank')}
              >
                <Eye className="h-3.5 w-3.5" />
                View Report
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="gap-1.5 text-xs"
                onClick={() => {
                  const a = document.createElement('a');
                  a.href = reportUrl;
                  a.download = `report-${sampleId}.pdf`;
                  a.click();
                }}
              >
                <Download className="h-3.5 w-3.5" />
                Download Report
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="gap-1.5 text-xs text-green-700 border-green-300 hover:bg-green-50"
                onClick={() => setWhatsAppDialogOpen(true)}
              >
                <Share2 className="h-3.5 w-3.5" />
                Share via WhatsApp
              </Button>
            </>
          )}
          <Button
            size="sm"
            className="gap-1.5 text-xs"
            onClick={() => setDeliveryDialogOpen(true)}
          >
            <CheckCircle className="h-3.5 w-3.5" />
            Mark Delivered
          </Button>
        </>
      )}

      {/* REPORT_DELIVERED — view/download only */}
      {status === 'REPORT_DELIVERED' && reportUrl && (
        <>
          <Button
            size="sm"
            variant="outline"
            className="gap-1.5 text-xs"
            onClick={() => window.open(reportUrl, '_blank')}
          >
            <Eye className="h-3.5 w-3.5" />
            View Report
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="gap-1.5 text-xs"
            onClick={() => {
              const a = document.createElement('a');
              a.href = reportUrl;
              a.download = `report-${sampleId}.pdf`;
              a.click();
            }}
          >
            <Download className="h-3.5 w-3.5" />
            Download Report
          </Button>
        </>
      )}

      <DeliveryMethodSelectionDialog
        open={deliveryDialogOpen}
        onOpenChange={setDeliveryDialogOpen}
        onConfirm={handleDeliveryConfirm}
        isDemoMode={isDemoMode}
      />

      <WhatsAppShareConfirmDialog
        open={whatsAppDialogOpen}
        onOpenChange={setWhatsAppDialogOpen}
        sample={sampleForDialog}
        onConfirm={handleWhatsAppConfirm}
        isDemoMode={isDemoMode}
      />
    </div>
  );
}
