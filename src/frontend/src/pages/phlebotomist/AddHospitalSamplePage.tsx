import {
  Building2,
  CheckCircle,
  IndianRupee,
  Loader2,
  Minus,
  Phone,
  Plus,
  Search,
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
  const [hospitalSearch, setHospitalSearch] = useState("");
  const [testSearch, setTestSearch] = useState("");
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
  const maxAllowedDiscount = Math.floor(totalMrp * 0.05);
  const effectiveDiscount = Math.min(discountAmount, maxAllowedDiscount);
  const finalAmount = totalMrp - effectiveDiscount;
  const pendingAmount = Math.max(0, finalAmount - amountReceived);

  const filteredHospitals = hospitals.filter(
    (h) =>
      h.name.toLowerCase().includes(hospitalSearch.toLowerCase()) ||
      (h.address || "").toLowerCase().includes(hospitalSearch.toLowerCase()) ||
      (h.area || "").toLowerCase().includes(hospitalSearch.toLowerCase()),
  );

  const filteredTests = DEMO_AVAILABLE_TESTS.filter(
    (t) =>
      t.testName.toLowerCase().includes(testSearch.toLowerCase()) ||
      t.testCode.toLowerCase().includes(testSearch.toLowerCase()),
  );

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
    setHospitalSearch("");
    setTestSearch("");
    if (hospitals.length !== 1) setSelectedHospitalId("");
  };

  if (isSuccess) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{ background: "#F7F9FC" }}
      >
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "24px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            padding: "32px",
            textAlign: "center",
            maxWidth: "360px",
            width: "100%",
          }}
          data-ocid="add_sample.success_state"
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              background: "#F0FDF4",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
            }}
          >
            <CheckCircle
              style={{ width: "32px", height: "32px", color: "#16A34A" }}
            />
          </div>
          <h2
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#111827",
              marginBottom: "8px",
            }}
          >
            Sample Added!
          </h2>
          <p
            style={{ color: "#6B7280", fontSize: "14px", marginBottom: "24px" }}
          >
            Sample for <strong>{patientName}</strong> has been recorded
            successfully.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <button
              type="button"
              onClick={() => onNavigate?.("my-samples")}
              style={{
                width: "100%",
                background: "linear-gradient(135deg, #2563EB, #06B6D4)",
                color: "white",
                padding: "12px",
                borderRadius: "12px",
                fontWeight: 600,
                fontSize: "14px",
                border: "none",
                cursor: "pointer",
              }}
              data-ocid="add_sample.primary_button"
            >
              View My Samples
            </button>
            <button
              type="button"
              onClick={handleReset}
              style={{
                width: "100%",
                background: "#F3F4F6",
                color: "#374151",
                padding: "12px",
                borderRadius: "12px",
                fontWeight: 600,
                fontSize: "14px",
                border: "none",
                cursor: "pointer",
              }}
              data-ocid="add_sample.secondary_button"
            >
              Add Another Sample
            </button>
          </div>
        </div>
      </div>
    );
  }

  const inputStyle = {
    width: "100%",
    border: "1.5px solid #E5E7EB",
    borderRadius: "12px",
    padding: "10px 14px",
    fontSize: "14px",
    outline: "none",
    background: "white",
    boxSizing: "border-box" as const,
  };

  const cardStyle = {
    background: "#FFFFFF",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
    padding: "16px",
  };

  return (
    <div className="min-h-screen pb-[90px]" style={{ background: "#F7F9FC" }}>
      <div className="px-4 pt-4">
        <PageHeroHeader
          title="Add Sample"
          description="Record a new hospital sample collection"
        />
      </div>

      <div className="px-4 space-y-4">
        {error && (
          <div
            style={{
              background: "#FEF2F2",
              border: "1px solid #FECACA",
              borderRadius: "12px",
              padding: "12px",
              fontSize: "14px",
              color: "#DC2626",
            }}
            data-ocid="add_sample.error_state"
          >
            {error}
          </div>
        )}

        {/* Hospital selection */}
        <div style={cardStyle}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "12px",
            }}
          >
            <Building2
              style={{ width: "16px", height: "16px", color: "#2563EB" }}
            />
            <p
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#1F2937",
                margin: 0,
              }}
            >
              Select Hospital
            </p>
          </div>

          {/* Hospital search */}
          {hospitals.length > 2 && (
            <div style={{ position: "relative", marginBottom: "12px" }}>
              <Search
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "16px",
                  height: "16px",
                  color: "#9CA3AF",
                }}
              />
              <input
                type="text"
                value={hospitalSearch}
                onChange={(e) => setHospitalSearch(e.target.value)}
                placeholder="Search Hospital..."
                style={{ ...inputStyle, paddingLeft: "38px" }}
                data-ocid="add_sample.search_input"
              />
            </div>
          )}

          {filteredHospitals.length === 0 ? (
            <p style={{ fontSize: "14px", color: "#9CA3AF" }}>
              No hospitals assigned.
            </p>
          ) : (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              {filteredHospitals.map((h) => (
                <button
                  type="button"
                  key={h.id}
                  onClick={() => setSelectedHospitalId(h.id)}
                  data-ocid="add_sample.select"
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "12px",
                    borderRadius: "12px",
                    border:
                      selectedHospitalId === h.id
                        ? "2px solid #2563EB"
                        : "2px solid #E5E7EB",
                    background:
                      selectedHospitalId === h.id ? "#EFF6FF" : "white",
                    cursor: "pointer",
                    transition: "all 150ms ease",
                  }}
                >
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#111827",
                      margin: 0,
                    }}
                  >
                    {h.name}
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#6B7280",
                      margin: "2px 0 0",
                    }}
                  >
                    {h.area}, {h.city}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Patient info */}
        <div style={cardStyle}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "12px",
            }}
          >
            <User style={{ width: "16px", height: "16px", color: "#2563EB" }} />
            <p
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#1F2937",
                margin: 0,
              }}
            >
              Patient Details
            </p>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <div>
              <label
                htmlFor="sample-patient-name"
                style={{
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#374151",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                Patient Name
              </label>
              <input
                id="sample-patient-name"
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="Enter patient name"
                style={inputStyle}
                data-ocid="add_sample.input"
              />
            </div>
            <div>
              <label
                htmlFor="sample-phone"
                style={{
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#374151",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                Phone Number
              </label>
              <div style={{ position: "relative" }}>
                <Phone
                  style={{
                    position: "absolute",
                    left: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "16px",
                    height: "16px",
                    color: "#9CA3AF",
                  }}
                />
                <input
                  id="sample-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  style={{ ...inputStyle, paddingLeft: "38px" }}
                  data-ocid="add_sample.input"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Test selection */}
        <div style={cardStyle}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "12px",
            }}
          >
            <TestTube
              style={{ width: "16px", height: "16px", color: "#2563EB" }}
            />
            <p
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#1F2937",
                margin: 0,
              }}
            >
              Select Tests
            </p>
          </div>

          {/* Test search */}
          <div style={{ position: "relative", marginBottom: "12px" }}>
            <Search
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "16px",
                height: "16px",
                color: "#9CA3AF",
              }}
            />
            <input
              type="text"
              value={testSearch}
              onChange={(e) => setTestSearch(e.target.value)}
              placeholder="Search Tests..."
              style={{ ...inputStyle, paddingLeft: "38px" }}
              data-ocid="add_sample.search_input"
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {filteredTests.length === 0 ? (
              <p
                style={{
                  fontSize: "13px",
                  color: "#9CA3AF",
                  textAlign: "center",
                  padding: "12px",
                }}
              >
                No tests match your search.
              </p>
            ) : (
              filteredTests.map((test) => {
                const isSelected = !!selectedTests.find(
                  (t) => t.testId === test.testId,
                );
                return (
                  <button
                    type="button"
                    key={test.testId}
                    onClick={() => toggleTest(test)}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px",
                      borderRadius: "12px",
                      border: isSelected
                        ? "2px solid #2563EB"
                        : "2px solid #E5E7EB",
                      background: isSelected ? "#EFF6FF" : "white",
                      cursor: "pointer",
                      transition: "all 150ms ease",
                    }}
                    data-ocid="add_sample.toggle"
                  >
                    <div style={{ textAlign: "left" }}>
                      <p
                        style={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#111827",
                          margin: 0,
                        }}
                      >
                        {test.testName}
                      </p>
                      <p
                        style={{
                          fontSize: "12px",
                          color: "#6B7280",
                          margin: "2px 0 0",
                        }}
                      >
                        {test.testCode}
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#374151",
                        }}
                      >
                        ₹{test.price}
                      </span>
                      {isSelected ? (
                        <Minus
                          style={{
                            width: "16px",
                            height: "16px",
                            color: "#2563EB",
                          }}
                        />
                      ) : (
                        <Plus
                          style={{
                            width: "16px",
                            height: "16px",
                            color: "#9CA3AF",
                          }}
                        />
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Billing */}
        {selectedTests.length > 0 && (
          <div style={cardStyle}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "16px",
              }}
            >
              <IndianRupee
                style={{ width: "16px", height: "16px", color: "#2563EB" }}
              />
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#1F2937",
                  margin: 0,
                }}
              >
                Billing
              </p>
            </div>

            {/* Billing rows */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: "14px", color: "#6B7280" }}>
                  Total MRP
                </span>
                <span
                  style={{
                    fontSize: "14px",
                    color: "#374151",
                    fontWeight: 500,
                  }}
                >
                  ₹{totalMrp}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: "14px", color: "#6B7280" }}>
                  Discount (max ₹{maxAllowedDiscount})
                </span>
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
                  style={{
                    width: "80px",
                    border: "1.5px solid #E5E7EB",
                    borderRadius: "8px",
                    padding: "4px 8px",
                    textAlign: "right",
                    fontSize: "14px",
                    outline: "none",
                  }}
                  data-ocid="add_sample.input"
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderTop: "1.5px solid #F3F4F6",
                  paddingTop: "10px",
                }}
              >
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#2563EB",
                  }}
                >
                  Final Amount
                </span>
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#2563EB",
                  }}
                >
                  ₹{finalAmount}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: "14px", color: "#6B7280" }}>
                  Amount Received
                </span>
                <input
                  type="number"
                  value={amountReceived}
                  onChange={(e) => setAmountReceived(Number(e.target.value))}
                  min={0}
                  max={finalAmount}
                  style={{
                    width: "80px",
                    border: "1.5px solid #E5E7EB",
                    borderRadius: "8px",
                    padding: "4px 8px",
                    textAlign: "right",
                    fontSize: "14px",
                    outline: "none",
                  }}
                  data-ocid="add_sample.input"
                />
              </div>
              {pendingAmount > 0 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#DC2626",
                    }}
                  >
                    Pending Amount
                  </span>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "#DC2626",
                    }}
                  >
                    ₹{pendingAmount}
                  </span>
                </div>
              )}
            </div>

            {/* Payment mode toggle */}
            <div>
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#374151",
                  marginBottom: "8px",
                }}
              >
                Payment Mode
              </p>
              <div style={{ display: "flex", gap: "8px" }}>
                {(["CASH", "UPI"] as const).map((mode) => (
                  <button
                    type="button"
                    key={mode}
                    onClick={() => setPaymentMode(mode)}
                    data-ocid="add_sample.toggle"
                    style={{
                      flex: 1,
                      padding: "10px",
                      borderRadius: "12px",
                      fontSize: "14px",
                      fontWeight: 600,
                      border: "none",
                      cursor: "pointer",
                      transition: "all 150ms ease",
                      background:
                        paymentMode === mode
                          ? "linear-gradient(135deg, #2563EB, #06B6D4)"
                          : "white",
                      color: paymentMode === mode ? "white" : "#374151",
                      boxShadow:
                        paymentMode === mode
                          ? "0 4px 12px rgba(13,71,161,0.25)"
                          : "0 0 0 1.5px #E5E7EB inset",
                    }}
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
          data-ocid="add_sample.submit_button"
          style={{
            width: "100%",
            background: "linear-gradient(135deg, #2563EB, #06B6D4)",
            color: "white",
            padding: "14px",
            borderRadius: "16px",
            fontWeight: 600,
            fontSize: "15px",
            border: "none",
            cursor: isSubmitting ? "not-allowed" : "pointer",
            opacity: isSubmitting ? 0.6 : 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            boxShadow: "0 4px 16px rgba(13,71,161,0.3)",
          }}
        >
          {isSubmitting ? (
            <>
              <Loader2
                style={{ width: "16px", height: "16px" }}
                className="animate-spin"
              />
              Saving...
            </>
          ) : (
            <>
              <CheckCircle style={{ width: "16px", height: "16px" }} />
              Add Sample
            </>
          )}
        </button>
      </div>
    </div>
  );
}
