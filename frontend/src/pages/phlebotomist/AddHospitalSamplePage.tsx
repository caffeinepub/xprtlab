import React, { useState } from 'react';
import {
  ArrowLeft,
  User,
  Phone,
  Building2,
  FlaskConical,
  IndianRupee,
  Lock,
  CreditCard,
  FileText,
  CheckCircle,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import MedicalCard from '../../components/shared/MedicalCard';
import SearchableTestSelector from '../../components/shared/SearchableTestSelector';
import { useCreateHospitalSample } from '../../hooks/useQueries';
import { useGetCallerUserProfile } from '../../hooks/useQueries';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { Test } from '../../backend';

interface AddHospitalSamplePageProps {
  onNavigate?: (route: string) => void;
}

const PAYMENT_MODES = ['Cash', 'UPI', 'Credit'] as const;
type PaymentMode = (typeof PAYMENT_MODES)[number];

export default function AddHospitalSamplePage({ onNavigate }: AddHospitalSamplePageProps) {
  const { identity } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();
  const createSample = useCreateHospitalSample();

  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);
  const [discount, setDiscount] = useState('');
  const [amountReceived, setAmountReceived] = useState('');
  const [paymentMode, setPaymentMode] = useState<PaymentMode>('Cash');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');

  const hospitalId = userProfile?.phone ? `hospital_${userProfile.phone}` : 'default_hospital';
  const phlebotomistId = identity?.getPrincipal().toString() || '';

  const mrp = selectedTest ? Number(selectedTest.price) : 0;
  const maxDiscount = (mrp / 1000) * 50;
  const discountVal = parseFloat(discount) || 0;
  const finalAmount = Math.max(0, mrp - discountVal);
  const amountReceivedVal = parseFloat(amountReceived) || 0;
  const pendingAmount = Math.max(0, finalAmount - amountReceivedVal);

  const discountError =
    discountVal > maxDiscount && mrp > 0
      ? `Discount exceeds the allowed maximum of ₹${maxDiscount.toFixed(2)}`
      : '';

  const isFormValid =
    patientName.trim().length > 0 &&
    phone.trim().length === 10 &&
    /^\d{10}$/.test(phone.trim()) &&
    selectedTest !== null &&
    !discountError;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || !selectedTest) return;
    setServerError('');

    try {
      await createSample.mutateAsync({
        patientName: patientName.trim(),
        phone: phone.trim(),
        hospitalId,
        phlebotomistId,
        testId: selectedTest.id,
        mrp,
        discount: discountVal,
        finalAmount,
        amountReceived: amountReceivedVal,
        pendingAmount,
        paymentMode,
      });
      setSubmitted(true);
    } catch (err: any) {
      setServerError(err?.message || 'Failed to save hospital sample. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="px-4 py-8 flex flex-col items-center justify-center min-h-[60vh] space-y-4 animate-fade-in">
        <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center shadow-lg">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-xl font-bold text-foreground">Sample Recorded!</h2>
        <p className="text-sm text-muted-foreground text-center max-w-xs">
          Hospital sample for <strong>{patientName}</strong> has been saved with status{' '}
          <span className="text-primary font-semibold">SAMPLE_COLLECTED</span>.
        </p>
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <Lock className="w-3 h-3" /> Billing fields are now locked for editing.
        </p>
        <div className="flex gap-3 mt-2">
          <button
            onClick={() => {
              setSubmitted(false);
              setPatientName('');
              setPhone('');
              setSelectedTest(null);
              setDiscount('');
              setAmountReceived('');
              setPaymentMode('Cash');
              setNotes('');
            }}
            className="gradient-btn px-5 py-2.5 text-sm"
          >
            Add Another
          </button>
          {onNavigate && (
            <button
              onClick={() => onNavigate('tasks')}
              className="px-5 py-2.5 text-sm border border-border rounded-xl text-foreground hover:bg-muted/50 transition-colors"
            >
              Back to Tasks
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-5 space-y-4 animate-fade-in pb-8">
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
          <h1 className="text-xl font-bold text-foreground">Add Hospital Sample</h1>
          <p className="text-xs text-muted-foreground">Record a new patient sample</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Patient Details */}
        <MedicalCard className="p-4 space-y-4">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            Patient Details
          </h2>

          {/* Patient Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">
              Patient Name <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              placeholder="Enter patient full name"
              className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              required
            />
          </div>

          {/* Mobile Number */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">
              Mobile Number <span className="text-destructive">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder="10-digit mobile number"
                className="w-full border border-border rounded-xl pl-9 pr-3 py-2.5 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                required
              />
            </div>
            {phone.length > 0 && phone.length < 10 && (
              <p className="text-xs text-destructive">Enter a valid 10-digit mobile number</p>
            )}
          </div>

          {/* Hospital (read-only) */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
              <Building2 className="w-3 h-3" />
              Hospital
            </label>
            <div className="flex items-center gap-2 bg-muted/50 border border-border rounded-xl px-3 py-2.5">
              <Building2 className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <span className="text-sm text-foreground flex-1">
                {userProfile?.name ? `${userProfile.name}'s Hospital` : 'Assigned Hospital'}
              </span>
              <Lock className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground">Auto-filled from your profile</p>
          </div>
        </MedicalCard>

        {/* Test Selection */}
        <MedicalCard className="p-4 space-y-4">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <FlaskConical className="w-4 h-4 text-primary" />
            Test Selection
          </h2>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">
              Select Test <span className="text-destructive">*</span>
            </label>
            <SearchableTestSelector
              value={selectedTest}
              onChange={setSelectedTest}
              disabled={false}
            />
          </div>

          {/* MRP (auto-filled, read-only) */}
          {selectedTest && (
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                <IndianRupee className="w-3 h-3" />
                MRP
              </label>
              <div className="flex items-center gap-2 bg-muted/50 border border-border rounded-xl px-3 py-2.5">
                <IndianRupee className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <span className="text-sm font-semibold text-foreground flex-1">
                  ₹{mrp.toLocaleString('en-IN')}
                </span>
                <Lock className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
            </div>
          )}
        </MedicalCard>

        {/* Billing Details */}
        <MedicalCard className="p-4 space-y-4">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <IndianRupee className="w-4 h-4 text-primary" />
            Billing Details
          </h2>

          {/* Discount */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Discount (₹)</label>
            {mrp > 0 && (
              <p className="text-xs text-accent font-medium">
                Max allowed: ₹{maxDiscount.toFixed(2)} (₹50 per ₹1000 of MRP)
              </p>
            )}
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="0.00"
              min="0"
              step="0.01"
              className={`w-full border rounded-xl px-3 py-2.5 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors ${
                discountError ? 'border-destructive focus:border-destructive' : 'border-border focus:border-primary'
              }`}
            />
            {discountError && (
              <p className="text-xs text-destructive flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {discountError}
              </p>
            )}
          </div>

          {/* Final Amount (computed) */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Final Amount (₹)</label>
            <div className="flex items-center gap-2 bg-primary/5 border border-primary/20 rounded-xl px-3 py-2.5">
              <IndianRupee className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-sm font-bold text-primary flex-1">
                ₹{finalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </span>
              <Lock className="w-3.5 h-3.5 text-primary/50" />
            </div>
            <p className="text-xs text-muted-foreground">MRP − Discount = Final Amount</p>
          </div>

          {/* Amount Received */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Amount Received (₹)</label>
            <input
              type="number"
              value={amountReceived}
              onChange={(e) => setAmountReceived(e.target.value)}
              placeholder="0.00"
              min="0"
              step="0.01"
              className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
          </div>

          {/* Pending Amount (computed) */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Pending Amount (₹)</label>
            <div
              className={`flex items-center gap-2 rounded-xl px-3 py-2.5 border ${
                pendingAmount > 0
                  ? 'bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-800'
                  : 'bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800'
              }`}
            >
              <IndianRupee
                className={`w-4 h-4 flex-shrink-0 ${pendingAmount > 0 ? 'text-amber-600' : 'text-green-600'}`}
              />
              <span
                className={`text-sm font-bold flex-1 ${pendingAmount > 0 ? 'text-amber-700 dark:text-amber-400' : 'text-green-700 dark:text-green-400'}`}
              >
                ₹{pendingAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </span>
              <Lock className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground">Final Amount − Amount Received</p>
          </div>

          {/* Payment Mode */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
              <CreditCard className="w-3 h-3" />
              Payment Mode
            </label>
            <div className="flex gap-2">
              {PAYMENT_MODES.map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setPaymentMode(mode)}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
                    paymentMode === mode
                      ? 'gradient-primary text-white shadow-sm'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </MedicalCard>

        {/* Notes */}
        <MedicalCard className="p-4 space-y-3">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            Notes (Optional)
          </h2>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any additional notes..."
            rows={3}
            className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
          />
        </MedicalCard>

        {/* Server Error */}
        {serverError && (
          <div className="flex items-start gap-2 bg-destructive/10 border border-destructive/20 rounded-xl p-3">
            <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
            <p className="text-sm text-destructive">{serverError}</p>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={!isFormValid || createSample.isPending}
          className="w-full gradient-btn py-3.5 text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {createSample.isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <CheckCircle className="w-4 h-4" />
              Save Hospital Sample
            </>
          )}
        </button>
      </form>
    </div>
  );
}
