import React, { useState, useEffect } from 'react';
import { FlaskConical, Plus, Minus, Search, Building2, User, Phone, CreditCard, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useGetAllTests, useCreateHospitalSample, useHospitals, useGetHospitalsByPhlebotomist } from '../../hooks/useQueries';
import { useActor } from '../../hooks/useActor';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { TestOutput } from '../../backend';
import { Principal } from '@dfinity/principal';
import {
  getDemoPhlebotomistHospitals,
  getDemoSampleId,
  addDemoHospitalSample,
  DEMO_HOSPITAL_ID,
} from '../../utils/demoData';
import { toast } from 'sonner';

interface Hospital {
  id: string;
  name: string;
  address: string;
  city?: string;
  area?: string;
  isActive?: boolean;
}

interface SelectedTest {
  test: TestOutput;
  quantity: number;
}

interface AddHospitalSamplePageProps {
  isDemoMode?: boolean;
}

export default function AddHospitalSamplePage({ isDemoMode = false }: AddHospitalSamplePageProps) {
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const userId = identity?.getPrincipal().toString() ?? 'demo-user';

  const { data: allTests = [], isLoading: testsLoading } = useGetAllTests();
  const createSample = useCreateHospitalSample();

  // Fetch assigned hospital IDs for this phlebotomist
  const phlebotomistPrincipal = identity?.getPrincipal();
  const { data: assignedHospitalIds = [], isLoading: assignedIdsLoading } =
    useGetHospitalsByPhlebotomist(!isDemoMode ? phlebotomistPrincipal : undefined);

  // Fetch all hospitals to get full details
  const { data: allHospitals = [], isLoading: allHospitalsLoading } = useHospitals();

  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedTests, setSelectedTests] = useState<SelectedTest[]>([]);
  const [testSearch, setTestSearch] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [amountReceived, setAmountReceived] = useState(0);
  const [paymentMode, setPaymentMode] = useState('CASH');
  const [submitted, setSubmitted] = useState(false);

  // Demo mode hospitals
  const [demoHospitals, setDemoHospitals] = useState<Hospital[]>([]);

  useEffect(() => {
    if (isDemoMode) {
      const h = getDemoPhlebotomistHospitals();
      setDemoHospitals(h);
      if (h.length === 1) setSelectedHospital(h[0]);
    }
  }, [isDemoMode]);

  // Filter hospitals: only active + assigned to this phlebotomist
  const hospitals: Hospital[] = isDemoMode
    ? demoHospitals
    : allHospitals.filter(
        (h) => h.isActive && assignedHospitalIds.includes(h.id)
      );

  // Auto-select if only one
  useEffect(() => {
    if (!isDemoMode && hospitals.length === 1 && !selectedHospital) {
      setSelectedHospital(hospitals[0]);
    }
  }, [hospitals, isDemoMode, selectedHospital]);

  const hospitalsLoading = !isDemoMode && (assignedIdsLoading || allHospitalsLoading);

  const activeTests = allTests.filter((t) => t.isActive);
  const filteredTests = activeTests.filter(
    (t) =>
      t.name.toLowerCase().includes(testSearch.toLowerCase()) ||
      t.code.toLowerCase().includes(testSearch.toLowerCase())
  );

  const addTest = (test: TestOutput) => {
    setSelectedTests((prev) => {
      const existing = prev.find((st) => st.test.id === test.id);
      if (existing) return prev;
      return [...prev, { test, quantity: 1 }];
    });
  };

  const removeTest = (testId: string) => {
    setSelectedTests((prev) => prev.filter((st) => st.test.id !== testId));
  };

  const totalMrp = selectedTests.reduce((sum, st) => sum + Number(st.test.price) * st.quantity, 0);
  const maxAllowedDiscount = Math.floor(totalMrp / 1000) * 50;
  const finalAmount = Math.max(0, totalMrp - Math.min(discountAmount, maxAllowedDiscount));
  const pendingAmount = Math.max(0, finalAmount - amountReceived);

  const handleSubmit = async () => {
    if (!selectedHospital || !patientName.trim() || !phone.trim() || selectedTests.length === 0) {
      toast.error('Please fill in all required fields and select at least one test');
      return;
    }

    if (isDemoMode) {
      const sampleId = getDemoSampleId();
      addDemoHospitalSample({
        id: sampleId,
        patientName: patientName.trim(),
        phone: phone.trim(),
        hospitalId: selectedHospital.id,
        phlebotomistId: userId,
        tests: selectedTests.map((st) => ({
          testId: st.test.id,
          testName: st.test.name,
          testCode: st.test.code,
          price: BigInt(Math.round(Number(st.test.price))),
        })),
        totalMrp,
        discountAmount: Math.min(discountAmount, maxAllowedDiscount),
        maxAllowedDiscount,
        finalAmount,
        amountReceived,
        pendingAmount,
        paymentMode,
        billingLocked: false,
        createdByRole: 'phlebotomist',
        updatedByAdmin: false,
        createdAt: Date.now(),
        status: 'SAMPLE_COLLECTED',
        statusHistory: [['SAMPLE_COLLECTED', Date.now(), 'phlebotomist', 'Initial collection']],
      });
      toast.success('Sample recorded successfully (Demo Mode)');
      setSubmitted(true);
      return;
    }

    try {
      await createSample.mutateAsync({
        patientName: patientName.trim(),
        phone: phone.trim(),
        hospitalId: selectedHospital.id,
        phlebotomistId: userId,
        tests: selectedTests.map((st) => ({
          testId: st.test.id,
          testName: st.test.name,
          testCode: st.test.code,
          mrp: Number(st.test.price),
        })),
        totalMrp,
        discountAmount: Math.min(discountAmount, maxAllowedDiscount),
        amountReceived,
        paymentMode,
        createdByRole: 'phlebotomist',
      });
      toast.success('Sample recorded successfully');
      setSubmitted(true);
    } catch (err: any) {
      toast.error(`Failed to record sample: ${err?.message ?? err}`);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-16 text-center px-4">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
          <FlaskConical className="h-8 w-8 text-emerald-600" />
        </div>
        <h2 className="text-lg font-semibold text-foreground mb-1">Sample Recorded!</h2>
        <p className="text-sm text-muted-foreground mb-6">
          The hospital sample has been successfully recorded.
        </p>
        <Button
          onClick={() => {
            setSubmitted(false);
            setPatientName('');
            setPhone('');
            setSelectedTests([]);
            setDiscountAmount(0);
            setAmountReceived(0);
            setPaymentMode('CASH');
            setSelectedHospital(null);
          }}
        >
          Record Another Sample
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-4 pb-3 border-b border-border bg-background">
        <div className="flex items-center gap-2">
          <FlaskConical className="h-5 w-5 text-primary" />
          <h1 className="text-lg font-semibold text-foreground">Add Hospital Sample</h1>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-4 py-4 space-y-5">
        {/* Hospital Selection */}
        {hospitalsLoading ? (
          <div className="h-16 bg-muted rounded-xl animate-pulse" />
        ) : hospitals.length === 0 ? (
          <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-800">No active hospitals assigned</p>
              <p className="text-xs text-amber-700 mt-0.5">
                No active hospitals are assigned to you. Please contact your administrator.
              </p>
            </div>
          </div>
        ) : hospitals.length > 1 ? (
          <div className="space-y-2">
            <Label className="flex items-center gap-1.5">
              <Building2 className="h-4 w-4" />
              Select Hospital *
            </Label>
            <div className="space-y-1.5">
              {hospitals.map((h) => (
                <button
                  key={h.id}
                  onClick={() => setSelectedHospital(h)}
                  className={[
                    'w-full text-left p-3 rounded-lg border transition-all',
                    selectedHospital?.id === h.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/40',
                  ].join(' ')}
                >
                  <p className="text-sm font-medium text-foreground">{h.name}</p>
                  {(h.city || h.address) && (
                    <p className="text-xs text-muted-foreground">{h.city || h.address}</p>
                  )}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {selectedHospital && (
          <div className="flex items-center gap-2 p-2 bg-primary/5 rounded-lg border border-primary/20">
            <Building2 className="h-4 w-4 text-primary shrink-0" />
            <div>
              <p className="text-xs font-medium text-primary">{selectedHospital.name}</p>
              {(selectedHospital.city || selectedHospital.address) && (
                <p className="text-xs text-muted-foreground">{selectedHospital.city || selectedHospital.address}</p>
              )}
            </div>
          </div>
        )}

        {/* Block form if no hospital available */}
        {hospitals.length === 0 ? null : (
          <>
            {/* Patient Info */}
            <div className="space-y-3">
              <div className="space-y-1">
                <Label className="flex items-center gap-1.5">
                  <User className="h-4 w-4" />
                  Patient Name *
                </Label>
                <Input
                  placeholder="Enter patient name"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label className="flex items-center gap-1.5">
                  <Phone className="h-4 w-4" />
                  Phone Number *
                </Label>
                <Input
                  type="tel"
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            {/* Test Selection */}
            <div className="space-y-2">
              <Label className="flex items-center gap-1.5">
                <FlaskConical className="h-4 w-4" />
                Select Tests *
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  className="pl-9"
                  placeholder="Search tests..."
                  value={testSearch}
                  onChange={(e) => setTestSearch(e.target.value)}
                />
              </div>
              <div className="space-y-1.5 max-h-40 overflow-y-auto">
                {testsLoading ? (
                  <p className="text-xs text-muted-foreground py-2">Loading tests...</p>
                ) : filteredTests.length === 0 ? (
                  <p className="text-xs text-muted-foreground py-2">No tests found</p>
                ) : (
                  filteredTests.map((test) => {
                    const isAdded = selectedTests.some((st) => st.test.id === test.id);
                    return (
                      <div
                        key={test.id}
                        className={[
                          'flex items-center justify-between p-2.5 rounded-lg border transition-all',
                          isAdded ? 'border-primary bg-primary/5' : 'border-border',
                        ].join(' ')}
                      >
                        <div>
                          <p className="text-xs font-medium text-foreground">{test.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {test.code} · ₹{Number(test.price)}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant={isAdded ? 'destructive' : 'outline'}
                          className="h-7 text-xs"
                          onClick={() => (isAdded ? removeTest(test.id) : addTest(test))}
                        >
                          {isAdded ? <Minus className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                        </Button>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Selected Tests Summary */}
            {selectedTests.length > 0 && (
              <div className="space-y-2">
                <Label>Selected Tests</Label>
                <div className="space-y-1">
                  {selectedTests.map((st) => (
                    <div key={st.test.id} className="flex items-center justify-between text-xs p-2 bg-muted/40 rounded-lg">
                      <span className="font-medium text-foreground">{st.test.name}</span>
                      <span className="text-muted-foreground">₹{Number(st.test.price)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Billing */}
            {selectedTests.length > 0 && (
              <div className="space-y-3 p-3 bg-muted/30 rounded-xl border border-border">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                  <CreditCard className="h-4 w-4" /> Billing
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs">Discount (max ₹{maxAllowedDiscount})</Label>
                    <Input
                      type="number"
                      min={0}
                      max={maxAllowedDiscount}
                      value={discountAmount}
                      onChange={(e) => setDiscountAmount(Math.min(Number(e.target.value), maxAllowedDiscount))}
                      className="h-8 text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Amount Received</Label>
                    <Input
                      type="number"
                      min={0}
                      value={amountReceived}
                      onChange={(e) => setAmountReceived(Number(e.target.value))}
                      className="h-8 text-sm"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Payment Mode</Label>
                  <div className="flex gap-2">
                    {['CASH', 'UPI', 'CARD'].map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setPaymentMode(mode)}
                        className={[
                          'flex-1 py-1.5 rounded-lg text-xs font-medium border transition-all',
                          paymentMode === mode
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border text-muted-foreground hover:border-primary/40',
                        ].join(' ')}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">MRP Total</span>
                    <span className="font-medium">₹{totalMrp}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{Math.min(discountAmount, maxAllowedDiscount)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-foreground border-t border-border pt-1">
                    <span>Final Amount</span>
                    <span>₹{finalAmount}</span>
                  </div>
                  {pendingAmount > 0 && (
                    <div className="flex justify-between text-amber-600">
                      <span>Pending</span>
                      <span>₹{pendingAmount}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Submit */}
            <Button
              className="w-full"
              onClick={handleSubmit}
              disabled={
                createSample.isPending ||
                !selectedHospital ||
                !patientName.trim() ||
                !phone.trim() ||
                selectedTests.length === 0
              }
            >
              {createSample.isPending ? (
                <>
                  <span className="animate-spin mr-2">⏳</span> Recording...
                </>
              ) : (
                'Record Sample'
              )}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
