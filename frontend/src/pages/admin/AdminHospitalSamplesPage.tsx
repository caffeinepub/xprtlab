import React, { useState, useMemo } from 'react';
import {
  FlaskConical,
  Search,
  Edit2,
  ChevronDown,
  Loader2,
  AlertCircle,
  TrendingUp,
  DollarSign,
  X,
  CheckCircle,
} from 'lucide-react';
import MedicalCard from '../../components/shared/MedicalCard';
import {
  useGetHospitalSamplesByHospital,
  useGetHospitalSamplesByPhlebotomist,
  useUpdateHospitalSampleBilling,
} from '../../hooks/useQueries';
import { HospitalSample, AppRole } from '../../backend';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import type { StaffRoute } from '../../StaffApp';

interface AdminHospitalSamplesPageProps {
  onNavigate?: (route: StaffRoute) => void;
  userRole?: AppRole;
}

const PAYMENT_MODES = ['CASH', 'UPI', 'CARD', 'ONLINE', 'CREDIT'];

function formatDate(ts: bigint): string {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function SampleRow({
  sample,
  sampleId,
  onEdit,
}: {
  sample: HospitalSample;
  sampleId: string;
  onEdit: (id: string, sample: HospitalSample) => void;
}) {
  const hasPending = sample.pendingAmount > 0;
  return (
    <div
      className={`border rounded-2xl p-4 space-y-3 ${
        hasPending
          ? 'border-orange-300 bg-orange-50/50 dark:bg-orange-950/10'
          : 'border-border bg-card'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-foreground text-sm truncate">{sample.patientName}</p>
          <p className="text-xs text-muted-foreground">{sample.phone}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {hasPending && (
            <span className="text-[10px] font-bold text-orange-600 bg-orange-100 dark:bg-orange-900/40 px-2 py-0.5 rounded-full">
              PENDING
            </span>
          )}
          <span className="text-[10px] font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
            {sample.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-xs">
        <div>
          <p className="text-muted-foreground">MRP</p>
          <p className="font-semibold">₹{sample.mrp.toFixed(0)}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Discount</p>
          <p className="font-semibold text-green-600">₹{sample.discount.toFixed(0)}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Final</p>
          <p className="font-semibold text-primary">₹{sample.finalAmount.toFixed(0)}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Received</p>
          <p className="font-semibold text-green-700">₹{sample.amountReceived.toFixed(0)}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Pending</p>
          <p className={`font-semibold ${hasPending ? 'text-orange-600' : 'text-muted-foreground'}`}>
            ₹{sample.pendingAmount.toFixed(0)}
          </p>
        </div>
        <div>
          <p className="text-muted-foreground">Mode</p>
          <p className="font-semibold">{sample.paymentMode}</p>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Test: {sample.testId}</span>
        <span>{formatDate(sample.createdAt)}</span>
      </div>

      <button
        onClick={() => onEdit(sampleId, sample)}
        className="w-full flex items-center justify-center gap-1.5 text-xs font-semibold text-primary border border-primary/30 rounded-xl py-2 hover:bg-primary/5 transition-colors"
      >
        <Edit2 className="w-3.5 h-3.5" />
        Edit Billing
      </button>
    </div>
  );
}

interface EditBillingModalProps {
  open: boolean;
  onClose: () => void;
  sampleId: string;
  sample: HospitalSample;
}

function EditBillingModal({ open, onClose, sampleId, sample }: EditBillingModalProps) {
  const [discount, setDiscount] = useState(sample.discount.toString());
  const [amountReceived, setAmountReceived] = useState(sample.amountReceived.toString());
  const [paymentMode, setPaymentMode] = useState(sample.paymentMode);
  const updateBilling = useUpdateHospitalSampleBilling();

  const finalAmount = sample.mrp - parseFloat(discount || '0');
  const pendingAmount = finalAmount - parseFloat(amountReceived || '0');

  const handleSave = async () => {
    const discountVal = parseFloat(discount) || 0;
    const receivedVal = parseFloat(amountReceived) || 0;
    const finalVal = sample.mrp - discountVal;
    const pendingVal = Math.max(0, finalVal - receivedVal);

    await updateBilling.mutateAsync({
      id: sampleId,
      discount: discountVal,
      finalAmount: finalVal,
      amountReceived: receivedVal,
      pendingAmount: pendingVal,
      paymentMode,
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-sm mx-4">
        <DialogHeader>
          <DialogTitle>Edit Billing — {sample.patientName}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div>
            <label className="text-xs font-medium text-muted-foreground">MRP (fixed)</label>
            <p className="text-sm font-bold text-foreground mt-0.5">₹{sample.mrp.toFixed(2)}</p>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Discount (₹)</label>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              min={0}
              max={sample.mrp * 0.2}
              className="w-full border border-border rounded-xl px-3 py-2 text-sm bg-background text-foreground mt-1 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <p className="text-[10px] text-muted-foreground mt-0.5">Max 20% = ₹{(sample.mrp * 0.2).toFixed(2)}</p>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Amount Received (₹)</label>
            <input
              type="number"
              value={amountReceived}
              onChange={(e) => setAmountReceived(e.target.value)}
              min={0}
              className="w-full border border-border rounded-xl px-3 py-2 text-sm bg-background text-foreground mt-1 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Payment Mode</label>
            <select
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value)}
              className="w-full border border-border rounded-xl px-3 py-2 text-sm bg-background text-foreground mt-1 focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {PAYMENT_MODES.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          <div className="bg-muted/40 rounded-xl p-3 space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Final Amount</span>
              <span className="font-semibold">₹{Math.max(0, finalAmount).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Pending</span>
              <span className={`font-semibold ${pendingAmount > 0 ? 'text-orange-600' : 'text-green-600'}`}>
                ₹{Math.max(0, pendingAmount).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
        <DialogFooter className="gap-2">
          <DialogClose asChild>
            <button className="flex-1 border border-border rounded-xl py-2 text-sm font-medium text-muted-foreground hover:bg-muted/50 transition-colors">
              Cancel
            </button>
          </DialogClose>
          <button
            onClick={handleSave}
            disabled={updateBilling.isPending}
            className="flex-1 gradient-btn rounded-xl py-2 text-sm font-semibold flex items-center justify-center gap-1.5 disabled:opacity-60"
          >
            {updateBilling.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <CheckCircle className="w-4 h-4" />
            )}
            Save
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function AdminHospitalSamplesPage({
  onNavigate,
  userRole,
}: AdminHospitalSamplesPageProps) {
  const [hospitalId, setHospitalId] = useState('');
  const [hospitalInput, setHospitalInput] = useState('');
  const [phlebotomistId, setPhlebotomistId] = useState('');
  const [phlebotomistInput, setPhlebotomistInput] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingSample, setEditingSample] = useState<HospitalSample | null>(null);

  const { data: hospitalSamples = [], isLoading: hospitalLoading } =
    useGetHospitalSamplesByHospital(hospitalId);
  const { data: phlebotomistSamples = [], isLoading: phlebotomistLoading } =
    useGetHospitalSamplesByPhlebotomist(phlebotomistId);

  // Merge and deduplicate samples from both filters
  const allSamples = useMemo(() => {
    if (hospitalId && phlebotomistId) {
      // Intersection: samples matching both
      const phlebIds = new Set(phlebotomistSamples.map((s) => s.phlebotomistId + s.createdAt));
      return hospitalSamples.filter((s) => phlebIds.has(s.phlebotomistId + s.createdAt));
    }
    if (hospitalId) return hospitalSamples;
    if (phlebotomistId) return phlebotomistSamples;
    return [];
  }, [hospitalSamples, phlebotomistSamples, hospitalId, phlebotomistId]);

  const isLoading = hospitalLoading || phlebotomistLoading;

  // Revenue summary
  const summary = useMemo(() => {
    return allSamples.reduce(
      (acc, s) => ({
        totalMrp: acc.totalMrp + s.mrp,
        totalFinal: acc.totalFinal + s.finalAmount,
        totalCollected: acc.totalCollected + s.amountReceived,
        totalPending: acc.totalPending + s.pendingAmount,
      }),
      { totalMrp: 0, totalFinal: 0, totalCollected: 0, totalPending: 0 }
    );
  }, [allSamples]);

  const handleHospitalSearch = () => setHospitalId(hospitalInput.trim());
  const handlePhlebotomistSearch = () => setPhlebotomistId(phlebotomistInput.trim());

  const handleEdit = (id: string, sample: HospitalSample) => {
    setEditingId(id);
    setEditingSample(sample);
  };

  const handleCloseEdit = () => {
    setEditingId(null);
    setEditingSample(null);
  };

  // Generate a stable key for each sample (hospitalId:testId:createdAt)
  const getSampleKey = (s: HospitalSample) =>
    `${s.hospitalId}:${s.testId}:${s.createdAt}`;

  return (
    <div className="px-4 py-5 space-y-4 animate-fade-in">
      <div>
        <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
          <FlaskConical className="w-5 h-5 text-primary" />
          Hospital Samples
        </h1>
        <p className="text-xs text-muted-foreground">View and manage sample billing records</p>
      </div>

      {/* Filters */}
      <MedicalCard className="p-4 space-y-3">
        <div>
          <label className="text-xs font-medium text-muted-foreground">Hospital ID</label>
          <div className="flex gap-2 mt-1">
            <input
              type="text"
              value={hospitalInput}
              onChange={(e) => setHospitalInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleHospitalSearch()}
              placeholder="Enter hospital ID..."
              className="flex-1 border border-border rounded-xl px-3 py-2 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <button
              onClick={handleHospitalSearch}
              className="gradient-btn px-3 py-2 text-sm font-semibold rounded-xl flex items-center gap-1"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">Phlebotomist ID (optional)</label>
          <div className="flex gap-2 mt-1">
            <input
              type="text"
              value={phlebotomistInput}
              onChange={(e) => setPhlebotomistInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handlePhlebotomistSearch()}
              placeholder="Enter phlebotomist ID..."
              className="flex-1 border border-border rounded-xl px-3 py-2 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <button
              onClick={handlePhlebotomistSearch}
              className="gradient-btn px-3 py-2 text-sm font-semibold rounded-xl flex items-center gap-1"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </MedicalCard>

      {/* Revenue Summary */}
      {allSamples.length > 0 && (
        <MedicalCard className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Revenue Summary</h3>
            <span className="text-xs text-muted-foreground ml-auto">{allSamples.length} records</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-muted/40 rounded-xl p-2.5 text-center">
              <p className="text-[10px] text-muted-foreground">Total MRP</p>
              <p className="text-sm font-bold text-foreground">₹{summary.totalMrp.toFixed(0)}</p>
            </div>
            <div className="bg-primary/5 rounded-xl p-2.5 text-center">
              <p className="text-[10px] text-muted-foreground">Final Amount</p>
              <p className="text-sm font-bold text-primary">₹{summary.totalFinal.toFixed(0)}</p>
            </div>
            <div className="bg-green-50 dark:bg-green-950/20 rounded-xl p-2.5 text-center">
              <p className="text-[10px] text-muted-foreground">Collected</p>
              <p className="text-sm font-bold text-green-600">₹{summary.totalCollected.toFixed(0)}</p>
            </div>
            <div className="bg-orange-50 dark:bg-orange-950/20 rounded-xl p-2.5 text-center">
              <p className="text-[10px] text-muted-foreground">Pending</p>
              <p className="text-sm font-bold text-orange-600">₹{summary.totalPending.toFixed(0)}</p>
            </div>
          </div>
        </MedicalCard>
      )}

      {/* Loading */}
      {isLoading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => <Skeleton key={i} className="h-48 rounded-2xl" />)}
        </div>
      )}

      {/* Empty state — no filter */}
      {!isLoading && !hospitalId && !phlebotomistId && (
        <MedicalCard className="text-center py-10">
          <FlaskConical className="w-10 h-10 mx-auto text-muted-foreground/30 mb-2" />
          <p className="text-sm text-muted-foreground">Enter a Hospital ID to view samples</p>
        </MedicalCard>
      )}

      {/* Empty state — filter applied but no results */}
      {!isLoading && (hospitalId || phlebotomistId) && allSamples.length === 0 && (
        <MedicalCard className="text-center py-10">
          <AlertCircle className="w-10 h-10 mx-auto text-muted-foreground/30 mb-2" />
          <p className="text-sm text-muted-foreground">No samples found for the selected filters</p>
        </MedicalCard>
      )}

      {/* Sample cards */}
      {!isLoading && allSamples.length > 0 && (
        <div className="space-y-3">
          {[...allSamples]
            .sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
            .map((sample) => {
              const key = getSampleKey(sample);
              return (
                <SampleRow
                  key={key}
                  sample={sample}
                  sampleId={key}
                  onEdit={handleEdit}
                />
              );
            })}
        </div>
      )}

      {/* Edit Billing Modal */}
      {editingId && editingSample && (
        <EditBillingModal
          open={true}
          onClose={handleCloseEdit}
          sampleId={editingId}
          sample={editingSample}
        />
      )}
    </div>
  );
}
