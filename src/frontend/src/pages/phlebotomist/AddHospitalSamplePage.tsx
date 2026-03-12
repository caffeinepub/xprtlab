import {
  Building2,
  CheckCircle,
  IndianRupee,
  Loader2,
  Minus,
  Phone,
  Plus,
  TestTube,
  User,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import PageHeroHeader from "../../components/shared/PageHeroHeader";
import {
  DEMO_PHLEBO_ID,
  type DemoHospital,
  addDemoSample,
  getDemoHospitalsByPhlebotomist,
} from "../../utils/demoStorage";

interface AddHospitalSamplePageProps {
  isDemoMode?: boolean;
  role?: string;
  onNavigate?: (path: string) => void;
}

interface TestEntry {
  testId: string;
  testName: string;
  testCode: string;
  price: number;
}

const DEMO_AVAILABLE_TESTS: TestEntry[] = [
  {
    testId: "CBC",
    testName: "Complete Blood Count",
    testCode: "CBC",
    price: 350,
  },
  {
    testId: "LFT",
    testName: "Liver Function Test",
    testCode: "LFT",
    price: 600,
  },
  {
    testId: "RBS",
    testName: "Random Blood Sugar",
    testCode: "RBS",
    price: 150,
  },
  {
    testId: "KFT",
    testName: "Kidney Function Test",
    testCode: "KFT",
    price: 500,
  },
  {
    testId: "TFT",
    testName: "Thyroid Function Test",
    testCode: "TFT",
    price: 450,
  },
  { testId: "LIPID", testName: "Lipid Profile", testCode: "LIPID", price: 400 },
];

export default function AddHospitalSamplePage({
  isDemoMode = false,
  onNavigate,
}: AddHospitalSamplePageProps) {
  const [hospitals, setHospitals] = useState<DemoHospital[]>([]);
  const [selectedHospitalId, setSelectedHospitalId] = useState("");
  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedTests, setSelectedTests] = useState<TestEntry[]>([]);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [amountReceived, setAmountReceived] = useState(0);
  const [paymentMode, setPaymentMode] = useState<"CASH" | "UPI">("CASH");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isDemoMode) {
      const assignedHospitals = getDemoHospitalsByPhlebotomist(DEMO_PHLEBO_ID);
      setHospitals(assignedHospitals);
      if (assignedHospitals.length === 1) {
        setSelectedHospitalId(assignedHospitals[0].id);
      }
    }
  }, [isDemoMode]);

  const totalMrp = selectedTests.reduce((sum, t) => sum + t.price, 0);
  const maxAllowedDiscount = Math.floor(totalMrp * 0.05); // 5% max
  const effectiveDiscount = Math.min(discountAmount, maxAllowedDiscount);
  const finalAmount = totalMrp - effectiveDiscount;
  const pendingAmount = Math.max(0, finalAmount - amountReceived);

  const toggleTest = (test: TestEntry) => {
    setSelectedTests((prev) => {
      const exists = prev.find((t) => t.testId === test.testId);
      if (exists) return prev.filter((t) => t.testId !== test.testId);
      return [...prev, test];
    });
  };

  const handleSubmit = async () => {
    setError("");
    if (!selectedHospitalId) {
      setError("Please select a hospital.");
      return;
    }
    if (!patientName.trim()) {
      setError("Please enter patient name.");
      return;
    }
    if (!phone.trim() || phone.length < 10) {
      setError("Please enter a valid phone number.");
      return;
    }
    if (selectedTests.length === 0) {
      setError("Please select at least one test.");
      return;
    }

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));

    if (isDemoMode) {
      const now = Date.now();
      const newSample = {
        id: `sample-${now}`,
        patientName: patientName.trim(),
        phone: phone.trim(),
        hospitalId: selectedHospitalId,
        phlebotomistId: DEMO_PHLEBO_ID,
        tests: selectedTests,
        totalMrp,
        discountAmount: effectiveDiscount,
        maxAllowedDiscount,
        finalAmount,
        amountReceived,
        pendingAmount,
        paymentMode,
        billingLocked: false,
        createdByRole: "phlebotomist",
        updatedByAdmin: false,
        createdAt: now,
        status: "SAMPLE_COLLECTED" as const,
        statusHistory: [
          {
            status: "SAMPLE_COLLECTED",
            timestamp: now,
            note: "Sample collected",
            updatedBy: DEMO_PHLEBO_ID,
          },
        ],
      };
      addDemoSample(newSample);
    }

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleReset = () => {
    setPatientName("");
    setPhone("");
    setSelectedTests([]);
    setDiscountAmount(0);
    setAmountReceived(0);
    setPaymentMode("CASH");
    setError("");
    setIsSuccess(false);
    if (hospitals.length !== 1) setSelectedHospitalId("");
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-center max-w-sm w-full">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Sample Added!
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Sample for <strong>{patientName}</strong> has been recorded
            successfully.
          </p>
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => onNavigate?.("my-samples")}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-xl font-semibold text-sm"
            >
              View My Samples
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold text-sm"
            >
              Add Another Sample
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-[90px]">
      <div className="px-4 pt-4">
        <PageHeroHeader
          title="Add Sample"
          description="Record a new hospital sample collection"
        />
      </div>
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 pt-4 pb-3">
        <h1 className="text-xl font-bold text-gray-900">Add Hospital Sample</h1>
        <p className="text-xs text-gray-400 mt-0.5">
          Record a new patient sample
        </p>
      </div>

      <div className="px-4 pt-4 space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Hospital selection */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Building2 className="w-4 h-4 text-blue-600" />
            <p className="text-sm font-semibold text-gray-800">
              Select Hospital
            </p>
          </div>
          {hospitals.length === 0 ? (
            <p className="text-sm text-gray-400">No hospitals assigned.</p>
          ) : (
            <div className="space-y-2">
              {hospitals.map((h) => (
                <button
                  type="button"
                  key={h.id}
                  onClick={() => setSelectedHospitalId(h.id)}
                  className={`w-full text-left p-3 rounded-xl border-2 transition-all ${
                    selectedHospitalId === h.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <p className="text-sm font-semibold text-gray-900">
                    {h.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {h.area}, {h.city}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Patient info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-2 mb-3">
            <User className="w-4 h-4 text-blue-600" />
            <p className="text-sm font-semibold text-gray-800">
              Patient Details
            </p>
          </div>
          <div className="space-y-3">
            <div>
              <label
                htmlFor="sample-patient-name"
                className="text-xs font-medium text-gray-600 mb-1 block"
              >
                Patient Name
              </label>
              <input
                id="sample-patient-name"
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="Enter patient name"
                className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="sample-phone"
                className="text-xs font-medium text-gray-600 mb-1 block"
              >
                Phone Number
              </label>
              <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden focus-within:border-blue-500">
                <Phone className="w-4 h-4 text-gray-400 ml-3" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  className="flex-1 px-3 py-2.5 text-sm focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Test selection */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-2 mb-3">
            <TestTube className="w-4 h-4 text-blue-600" />
            <p className="text-sm font-semibold text-gray-800">Select Tests</p>
          </div>
          <div className="space-y-2">
            {DEMO_AVAILABLE_TESTS.map((test) => {
              const isSelected = !!selectedTests.find(
                (t) => t.testId === test.testId,
              );
              return (
                <button
                  type="button"
                  key={test.testId}
                  onClick={() => toggleTest(test)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all ${
                    isSelected
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">
                      {test.testName}
                    </p>
                    <p className="text-xs text-gray-500">{test.testCode}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-700">
                      ₹{test.price}
                    </span>
                    {isSelected ? (
                      <Minus className="w-4 h-4 text-blue-600" />
                    ) : (
                      <Plus className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Billing */}
        {selectedTests.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center gap-2 mb-3">
              <IndianRupee className="w-4 h-4 text-blue-600" />
              <p className="text-sm font-semibold text-gray-800">Billing</p>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Total MRP</span>
                <span>₹{totalMrp}</span>
              </div>
              <div className="flex justify-between items-center text-gray-600">
                <span>Discount (max ₹{maxAllowedDiscount})</span>
                <input
                  type="number"
                  value={discountAmount}
                  onChange={(e) =>
                    setDiscountAmount(
                      Math.min(Number(e.target.value), maxAllowedDiscount),
                    )
                  }
                  min={0}
                  max={maxAllowedDiscount}
                  className="w-20 border border-gray-200 rounded-lg px-2 py-1 text-right text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex justify-between font-semibold text-gray-900 border-t border-gray-100 pt-2">
                <span>Final Amount</span>
                <span>₹{finalAmount}</span>
              </div>
              <div className="flex justify-between items-center text-gray-600">
                <span>Amount Received</span>
                <input
                  type="number"
                  value={amountReceived}
                  onChange={(e) => setAmountReceived(Number(e.target.value))}
                  min={0}
                  max={finalAmount}
                  className="w-20 border border-gray-200 rounded-lg px-2 py-1 text-right text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              {pendingAmount > 0 && (
                <div className="flex justify-between text-red-600 font-medium">
                  <span>Pending</span>
                  <span>₹{pendingAmount}</span>
                </div>
              )}
            </div>

            {/* Payment mode */}
            <div className="mt-3">
              <p className="text-xs font-medium text-gray-600 mb-2">
                Payment Mode
              </p>
              <div className="flex gap-2">
                {(["CASH", "UPI"] as const).map((mode) => (
                  <button
                    type="button"
                    key={mode}
                    onClick={() => setPaymentMode(mode)}
                    className={`flex-1 py-2 rounded-xl text-sm font-medium border-2 transition-all ${
                      paymentMode === mode
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 text-gray-600"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Submit */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-4 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <CheckCircle className="w-4 h-4" />
              Add Sample
            </>
          )}
        </button>
      </div>
    </div>
  );
}
