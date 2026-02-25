import React, { useState, useEffect } from 'react';
import { Lock, Loader2, AlertCircle, CheckCircle, ChevronDown } from 'lucide-react';
import { useGetAllTests, useCreateHospitalSample, useGetAssignedHospitals } from '../../hooks/useQueries';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface AddHospitalSamplePageProps {
  onNavigate?: (route: string) => void;
}

const PAYMENT_MODES = [
  { value: 'CASH', label: 'Cash Collected' },
  { value: 'UPI', label: 'UPI Received' },
  { value: 'CREDIT', label: 'Hospital Credit' },
];

export default function AddHospitalSamplePage({ onNavigate }: AddHospitalSamplePageProps) {
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [selectedHospitalId, setSelectedHospitalId] = useState('');
  const [selectedTestId, setSelectedTestId] = useState('');
  const [paymentMode, setPaymentMode] = useState('CASH');
  const [notes, setNotes] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const { data: tests = [], isLoading: testsLoading } = useGetAllTests();
  const { data: assignedHospitals = [], isLoading: hospitalsLoading } = useGetAssignedHospitals();
  const createSampleMutation = useCreateHospitalSample();

  const selectedTest = tests.find((t: any) => t.id === selectedTestId);
  const mrp: number = selectedTest ? Number(selectedTest.price) : 0;
  const offerPrice: number = selectedTest ? Number(selectedTest.offerPrice ?? selectedTest.price) : 0;
  const finalAmount: number = offerPrice;
  const amountReceived: number = (paymentMode === 'CASH' || paymentMode === 'UPI') ? finalAmount : 0;
  const pendingAmount: number = finalAmount - amountReceived;

  const selectedHospital = assignedHospitals.find((h: any) => h.id === selectedHospitalId);

  const validatePhone = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length !== 10) {
      setPhoneError('Enter a valid 10-digit mobile number');
    } else {
      setPhoneError('');
    }
    return digits.length === 10;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhone(digits);
    if (digits.length > 0) validatePhone(digits);
    else setPhoneError('');
  };

  const handleSubmitClick = () => {
    setSubmitError('');
    if (!patientName.trim()) { setSubmitError('Patient name is required.'); return; }
    if (!validatePhone(phone)) return;
    if (!selectedHospitalId) { setSubmitError('Please select a hospital.'); return; }
    if (!selectedTestId) { setSubmitError('Please select a test.'); return; }
    setShowConfirmDialog(true);
  };

  const handleConfirmSubmit = async () => {
    try {
      await createSampleMutation.mutateAsync({
        patientName,
        phone,
        hospitalId: selectedHospitalId,
        testId: selectedTestId,
        mrp,
        discount: mrp - offerPrice,
        finalAmount,
        amountReceived,
        pendingAmount,
        paymentMode,
        notes,
      });
      setShowConfirmDialog(false);
      // Reset form
      setPatientName('');
      setPhone('');
      setSelectedHospitalId('');
      setSelectedTestId('');
      setPaymentMode('CASH');
      setNotes('');
      if (onNavigate) onNavigate('task-queue');
    } catch (err: any) {
      setShowConfirmDialog(false);
      setSubmitError(err?.message || 'Failed to save sample. Please try again.');
    }
  };

  return (
    <div className="p-4 space-y-4 max-w-lg mx-auto">
      <h2 className="text-lg font-bold text-foreground">Add Hospital Sample</h2>

      {/* Patient Details */}
      <div className="bg-white rounded-2xl border border-border shadow-sm p-4 space-y-3">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Patient Details</h3>

        {/* Patient Name */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-foreground">Patient Name *</label>
          <input
            type="text"
            value={patientName}
            onChange={e => setPatientName(e.target.value)}
            placeholder="Enter patient name"
            className="w-full px-3 py-2 rounded-xl border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        {/* Phone */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-foreground">Mobile Number *</label>
          <input
            type="tel"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="10-digit mobile number"
            maxLength={10}
            inputMode="numeric"
            className={`w-full px-3 py-2 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 ${phoneError ? 'border-red-400 bg-red-50' : 'border-border'}`}
          />
          {phoneError && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" /> {phoneError}
            </p>
          )}
        </div>

        {/* Hospital — read-only dropdown */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-foreground">Hospital *</label>
          {hospitalsLoading ? (
            <div className="flex items-center gap-2 py-2 text-xs text-muted-foreground">
              <Loader2 className="h-3 w-3 animate-spin" /> Loading hospitals...
            </div>
          ) : assignedHospitals.length === 0 ? (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-700 font-medium">
              No hospitals assigned. Contact admin.
            </div>
          ) : (
            <Select value={selectedHospitalId} onValueChange={setSelectedHospitalId}>
              <SelectTrigger className="w-full rounded-xl border-border text-sm font-medium">
                <SelectValue placeholder="Select hospital" />
              </SelectTrigger>
              <SelectContent>
                {assignedHospitals.map((h: any) => (
                  <SelectItem key={h.id} value={h.id}>
                    <div>
                      <p className="font-semibold">{h.name}</p>
                      {h.address && <p className="text-xs text-muted-foreground">{h.address}</p>}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      {/* Test Selection */}
      <div className="bg-white rounded-2xl border border-border shadow-sm p-4 space-y-3">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Test & Billing</h3>

        {/* Test */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-foreground">Select Test *</label>
          {testsLoading ? (
            <div className="flex items-center gap-2 py-2 text-xs text-muted-foreground">
              <Loader2 className="h-3 w-3 animate-spin" /> Loading tests...
            </div>
          ) : (
            <Select value={selectedTestId} onValueChange={setSelectedTestId}>
              <SelectTrigger className="w-full rounded-xl border-border text-sm font-medium">
                <SelectValue placeholder="Select test" />
              </SelectTrigger>
              <SelectContent>
                {tests.map((t: any) => (
                  <SelectItem key={t.id} value={t.id}>
                    <div>
                      <p className="font-semibold">{t.name}</p>
                      <p className="text-xs text-muted-foreground">₹{t.price}</p>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Price Fields — shown after test selection */}
        {selectedTest && (
          <div className="space-y-2 pt-1">
            {/* MRP */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground flex items-center gap-1">
                MRP <Lock className="h-3 w-3 text-muted-foreground" />
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={`₹${mrp.toFixed(2)}`}
                  disabled
                  className="w-full px-3 py-2 rounded-xl border border-border bg-muted text-sm font-medium text-muted-foreground cursor-not-allowed"
                />
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/60" />
              </div>
            </div>

            {/* Offer Price */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground flex items-center gap-1">
                Offer Price <Lock className="h-3 w-3 text-muted-foreground" />
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={`₹${offerPrice.toFixed(2)}`}
                  disabled
                  className="w-full px-3 py-2 rounded-xl border border-border bg-muted text-sm font-medium text-muted-foreground cursor-not-allowed"
                />
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/60" />
              </div>
            </div>

            {/* Final Amount */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground flex items-center gap-1">
                Final Amount <Lock className="h-3 w-3 text-muted-foreground" />
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={`₹${finalAmount.toFixed(2)}`}
                  disabled
                  className="w-full px-3 py-2 rounded-xl border border-primary/30 bg-primary/5 text-sm font-bold text-primary cursor-not-allowed"
                />
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-primary/60" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Payment */}
      <div className="bg-white rounded-2xl border border-border shadow-sm p-4 space-y-3">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Payment</h3>

        {/* Payment Mode */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-foreground">Payment Mode *</label>
          <Select value={paymentMode} onValueChange={setPaymentMode}>
            <SelectTrigger className="w-full rounded-xl border-border text-sm font-medium">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PAYMENT_MODES.map(pm => (
                <SelectItem key={pm.value} value={pm.value}>
                  {pm.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Amount Received — auto-filled, read-only */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-foreground flex items-center gap-1">
            Amount Received <Lock className="h-3 w-3 text-muted-foreground" />
          </label>
          <div className="relative">
            <input
              type="text"
              value={`₹${amountReceived.toFixed(2)}`}
              disabled
              className="w-full px-3 py-2 rounded-xl border border-border bg-muted text-sm font-medium text-muted-foreground cursor-not-allowed"
            />
            <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/60" />
          </div>
          {(paymentMode === 'CASH' || paymentMode === 'UPI') && selectedTest && (
            <p className="text-xs text-green-600 font-medium flex items-center gap-1">
              <CheckCircle className="h-3 w-3" /> Auto-filled from Final Amount
            </p>
          )}
        </div>

        {/* Pending Amount */}
        {selectedTest && (
          <div className="space-y-1">
            <label className="text-xs font-semibold text-foreground flex items-center gap-1">
              Pending Amount <Lock className="h-3 w-3 text-muted-foreground" />
            </label>
            <div className="relative">
              <input
                type="text"
                value={`₹${pendingAmount.toFixed(2)}`}
                disabled
                className={`w-full px-3 py-2 rounded-xl border bg-muted text-sm font-bold cursor-not-allowed ${pendingAmount > 0 ? 'border-orange-300 text-orange-600' : 'border-border text-muted-foreground'}`}
              />
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/60" />
            </div>
          </div>
        )}
      </div>

      {/* Notes */}
      <div className="bg-white rounded-2xl border border-border shadow-sm p-4 space-y-2">
        <label className="text-xs font-semibold text-foreground">Notes (Optional)</label>
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="Any additional notes..."
          rows={3}
          className="w-full px-3 py-2 rounded-xl border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
        />
      </div>

      {/* Error */}
      {submitError && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-red-600 font-medium">{submitError}</p>
        </div>
      )}

      {/* Submit */}
      <button
        onClick={handleSubmitClick}
        disabled={createSampleMutation.isPending}
        className="w-full py-3 rounded-xl bg-primary text-white font-bold text-sm shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {createSampleMutation.isPending ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> Saving...</>
        ) : (
          'Save Sample Entry'
        )}
      </button>

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Sample Entry</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-3">
                <p>Confirm submission? Billing details cannot be edited after saving.</p>
                <div className="bg-muted rounded-xl p-3 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-medium">Patient:</span>
                    <span className="font-bold text-foreground">{patientName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-medium">Hospital:</span>
                    <span className="font-bold text-foreground">{selectedHospital?.name || selectedHospitalId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-medium">Test:</span>
                    <span className="font-bold text-foreground">{selectedTest?.name || selectedTestId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-medium">Final Amount:</span>
                    <span className="font-bold text-primary">₹{finalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-medium">Payment Mode:</span>
                    <span className="font-bold text-foreground">{PAYMENT_MODES.find(p => p.value === paymentMode)?.label}</span>
                  </div>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmSubmit} disabled={createSampleMutation.isPending}>
              {createSampleMutation.isPending ? (
                <><Loader2 className="h-4 w-4 animate-spin mr-1" /> Saving...</>
              ) : 'Confirm & Save'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
