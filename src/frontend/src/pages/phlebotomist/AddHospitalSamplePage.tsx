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
import type { Hospital, TestOutput } from "../../backend";
import PageHeroHeader from "../../components/shared/PageHeroHeader";
import {
  createSample,
  getHospitals,
  getTests,
} from "../../services/backendService";

interface AddHospitalSamplePageProps {
  isDemoMode?: boolean;
  role?: string;
  onNavigate?: (path: string) => void;
}

interface TestEntry {
  testId: string;
  testName: string;
  testCode: string;
  price: number; // mrp
  mrp: number;
  lab_cost: number;
  profit: number;
}

export default function AddHospitalSamplePage({
  onNavigate,
}: AddHospitalSamplePageProps) {
  const [_allHospitals, setAllHospitals] = useState<Hospital[]>([]);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [availableTests, setAvailableTests] = useState<TestEntry[]>([]);

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
  const [backendSampleId, setBackendSampleId] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log("Loading data directly...");
        const hospitalsData = await getHospitals();
        const testsData = await getTests();

        console.log("Hospitals:", hospitalsData);
        console.log("Tests:", testsData);

        setAllHospitals(hospitalsData || []);

        const session = (() => {
          try {
            const s = localStorage.getItem("xpertlab_session");
            return s ? JSON.parse(s) : {};
          } catch {
            return {};
          }
        })();

        console.log("Session:", session);

        const filteredHospitals = (hospitalsData || []).filter(
          (h: Hospital) => {
            if (session.assignedHospitalId) {
              return String(h.id) === String(session.assignedHospitalId);
            }
            return true;
          },
        );

        console.log("Filtered hospitals:", filteredHospitals);
        setHospitals(filteredHospitals);

        if (filteredHospitals.length === 1) {
          setSelectedHospitalId(filteredHospitals[0].id);
        }

        setAvailableTests(
          (testsData || []).map((t: TestOutput) => ({
            testId: t.id,
            testName: t.name,
            testCode: t.code,
            price: Number(t.mrp),
            mrp: Number(t.mrp),
            lab_cost: Number(t.lab_cost),
            profit: Number(t.profit),
          })),
        );
      } catch (e) {
        console.error("ERROR:", e);
      }
    };

    loadData();
  }, []);

  const totalMrp = selectedTests.reduce(
    (sum, t) => sum + Number(t.mrp || 0),
    0,
  );
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

  const filteredTests = availableTests.filter(
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
    try {
      const session = (() => {
        try {
          const s = localStorage.getItem("xpertlab_session");
          return s ? JSON.parse(s) : null;
        } catch {
          return null;
        }
      })();
      const createdByMobile = session?.mobileNumber ?? session?.mobile ?? "";
      const sampleInput = {
        patientName: patientName.trim(),
        phone: phone.trim(),
        hospitalId: selectedHospitalId,
        tests: selectedTests.map((t) => ({
          testId: t.testId,
          testName: t.testName,
          testCode: t.testCode,
          price: BigInt(Math.round(t.mrp)),
        })),
        totalAmount: BigInt(Math.round(finalAmount)),
        paymentType: paymentMode,
        createdByMobile,
        deliveryMethod: undefined,
      };
      const sampleId = await createSample(sampleInput);
      if (sampleId) {
        setBackendSampleId(sampleId);
        setIsSuccess(true);
      } else {
        setError("Failed to create sample. Please try again.");
      }
    } catch (e) {
      console.error("[AddSample] Backend write failed:", e);
      setError("Failed to save sample. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
            style={{
              color: "#6B7280",
              fontSize: "14px",
              marginBottom: backendSampleId ? "8px" : "24px",
            }}
          >
            Sample for <strong>{patientName}</strong> has been recorded
            successfully.
          </p>
          {backendSampleId && (
            <p
              style={{
                color: "#2563EB",
                fontSize: "13px",
                fontWeight: 600,
                marginBottom: "24px",
                background: "#EFF6FF",
                borderRadius: "8px",
                padding: "8px 12px",
              }}
            >
              Sample ID: {backendSampleId}
            </p>
          )}
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

          {hospitals.length === 0 ? (
            <p
              style={{
                fontSize: "14px",
                color: "#9CA3AF",
                textAlign: "center",
                padding: "12px",
              }}
              data-ocid="add_sample.empty_state"
            >
              No hospitals found. Ask Super Admin to add hospitals.
            </p>
          ) : (
            <>
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

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
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
                      {h.area}
                      {h.area && h.city ? ", " : ""}
                      {h.city}
                    </p>
                  </button>
                ))}
              </div>
            </>
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

          {availableTests.length === 0 ? (
            <p
              style={{
                fontSize: "14px",
                color: "#9CA3AF",
                textAlign: "center",
                padding: "12px",
              }}
              data-ocid="add_sample.empty_state"
            >
              No tests available. Ask Super Admin to add test.
            </p>
          ) : (
            <>
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
                  placeholder="Search test..."
                  style={{ ...inputStyle, paddingLeft: "38px" }}
                  data-ocid="add_sample.search_input"
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                {filteredTests.length === 0 ? (
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#9CA3AF",
                      textAlign: "center",
                      padding: "12px",
                    }}
                  >
                    No matching tests found
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
                          textAlign: "left",
                        }}
                        data-ocid="add_sample.toggle"
                      >
                        <div style={{ flex: 1 }}>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "2px",
                            }}
                          >
                            <div
                              style={{
                                fontWeight: 600,
                                fontSize: "14px",
                                color: "#111827",
                              }}
                            >
                              {test.testName}
                            </div>
                            {test.testCode && (
                              <div
                                style={{ fontSize: "11px", color: "#6b7280" }}
                              >
                                Code: {test.testCode}
                              </div>
                            )}
                            <div
                              style={{
                                display: "flex",
                                gap: "12px",
                                fontSize: "12px",
                                marginTop: "2px",
                                flexWrap: "wrap",
                              }}
                            >
                              <span
                                style={{ color: "#2563EB", fontWeight: 600 }}
                              >
                                MRP: ₹{Number(test.mrp || 0)}
                              </span>
                              <span style={{ color: "#6b7280" }}>
                                Lab: ₹{Number(test.lab_cost || 0)}
                              </span>
                              <span
                                style={{
                                  color:
                                    test.profit && Number(test.profit) > 0
                                      ? "#16a34a"
                                      : "#dc2626",
                                  fontWeight: 500,
                                }}
                              >
                                Profit: ₹{Number(test.profit || 0)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            marginLeft: "8px",
                            flexShrink: 0,
                          }}
                        >
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
            </>
          )}
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
