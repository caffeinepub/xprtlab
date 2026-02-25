import React, { useState } from 'react';
import {
  useGetAllHospitalSamples,
  useUpdateHospitalSampleBilling,
} from '../../hooks/useQueries';
import { HospitalSample } from '../../types/models';
import { Search, Loader2, FlaskConical, Edit2, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface AdminHospitalSamplesPageProps {
  onNavigate?: (route: string) => void;
}

export default function AdminHospitalSamplesPage({ onNavigate }: AdminHospitalSamplesPageProps) {
  const [hospitalFilter, setHospitalFilter] = useState('');
  const [phlebotomistFilter, setPhlebotomistFilter] = useState('');
  const [editingSample, setEditingSample] = useState<(HospitalSample & { id?: string }) | null>(null);
  const [editAmount, setEditAmount] = useState('');

  const { data: samples = [], isLoading } = useGetAllHospitalSamples();
  const updateBillingMutation = useUpdateHospitalSampleBilling();

  const filtered = samples.filter((s: any) => {
    const matchHospital = !hospitalFilter || s.hospitalId?.toLowerCase().includes(hospitalFilter.toLowerCase());
    const matchPhlebotomist = !phlebotomistFilter || s.phlebotomistId?.toLowerCase().includes(phlebotomistFilter.toLowerCase());
    return matchHospital && matchPhlebotomist;
  });

  const totalRevenue = filtered.reduce((sum: number, s: any) => sum + Number(s.finalAmount || 0), 0);
  const totalReceived = filtered.reduce((sum: number, s: any) => sum + Number(s.amountReceived || 0), 0);
  const totalPending = filtered.reduce((sum: number, s: any) => sum + Number(s.pendingAmount || 0), 0);

  const handleEditSave = async () => {
    if (!editingSample) return;
    try {
      await updateBillingMutation.mutateAsync({
        ...editingSample,
        amountReceived: parseFloat(editAmount) || 0,
      });
      setEditingSample(null);
    } catch (err) {
      console.error('Failed to update billing', err);
    }
  };

  const formatTime = (ts: number) => {
    const ms = ts > 1e12 ? ts / 1_000_000 : ts;
    return new Date(ms).toLocaleDateString('en-IN');
  };

  return (
    <div className="p-4 space-y-4 max-w-2xl mx-auto">
      <h2 className="text-lg font-bold text-foreground">Hospital Samples</h2>

      {/* Revenue Summary */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-blue-50 rounded-xl p-3 text-center border border-blue-100">
          <p className="text-xs text-blue-600 font-semibold">Total</p>
          <p className="text-base font-bold text-blue-700">₹{totalRevenue.toFixed(0)}</p>
        </div>
        <div className="bg-green-50 rounded-xl p-3 text-center border border-green-100">
          <p className="text-xs text-green-600 font-semibold">Received</p>
          <p className="text-base font-bold text-green-700">₹{totalReceived.toFixed(0)}</p>
        </div>
        <div className="bg-orange-50 rounded-xl p-3 text-center border border-orange-100">
          <p className="text-xs text-orange-600 font-semibold">Pending</p>
          <p className="text-base font-bold text-orange-700">₹{totalPending.toFixed(0)}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-border shadow-sm p-4 space-y-2">
        <input
          type="text"
          value={hospitalFilter}
          onChange={e => setHospitalFilter(e.target.value)}
          placeholder="Filter by hospital..."
          className="w-full px-3 py-2 rounded-xl border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        <input
          type="text"
          value={phlebotomistFilter}
          onChange={e => setPhlebotomistFilter(e.target.value)}
          placeholder="Filter by phlebotomist..."
          className="w-full px-3 py-2 rounded-xl border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center space-y-2">
          <FlaskConical className="h-10 w-10 text-muted-foreground/40" />
          <p className="text-sm font-semibold text-foreground">No samples found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((sample: any, i: number) => (
            <div
              key={i}
              className={`bg-white rounded-2xl border shadow-sm p-4 space-y-2 ${
                Number(sample.pendingAmount) > 0 ? 'border-orange-200' : 'border-border'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-bold text-sm text-foreground">{sample.patientName}</p>
                  <p className="text-xs text-muted-foreground">{sample.phone}</p>
                </div>
                <button
                  onClick={() => { setEditingSample(sample); setEditAmount(String(sample.amountReceived)); }}
                  className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-1 text-xs">
                <span className="text-muted-foreground">Hospital: <span className="font-semibold text-foreground">{sample.hospitalId}</span></span>
                <span className="text-muted-foreground">Test: <span className="font-semibold text-foreground">{sample.testId}</span></span>
                <span className="text-muted-foreground">Final: <span className="font-bold text-primary">₹{Number(sample.finalAmount).toFixed(0)}</span></span>
                <span className="text-muted-foreground">Received: <span className="font-bold text-green-600">₹{Number(sample.amountReceived).toFixed(0)}</span></span>
                {Number(sample.pendingAmount) > 0 && (
                  <span className="col-span-2 text-orange-600 font-bold">Pending: ₹{Number(sample.pendingAmount).toFixed(0)}</span>
                )}
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{sample.paymentMode}</span>
                <span>{formatTime(Number(sample.createdAt))}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={!!editingSample} onOpenChange={open => !open && setEditingSample(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit Billing</DialogTitle>
          </DialogHeader>
          {editingSample && (
            <div className="space-y-4">
              <div className="bg-muted/50 rounded-xl p-3 text-sm space-y-1">
                <p><span className="font-semibold">Patient:</span> {editingSample.patientName}</p>
                <p><span className="font-semibold">Final Amount:</span> ₹{Number(editingSample.finalAmount).toFixed(2)}</p>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-foreground">Amount Received</label>
                <input
                  type="number"
                  value={editAmount}
                  onChange={e => setEditAmount(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingSample(null)}
                  className="flex-1 py-2 rounded-xl border border-border text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditSave}
                  disabled={updateBillingMutation.isPending}
                  className="flex-1 py-2 rounded-xl bg-primary text-white text-sm font-bold disabled:opacity-50"
                >
                  {updateBillingMutation.isPending ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
