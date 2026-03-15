import { r as reactExports, j as jsxRuntimeExports } from "./index-BcSF07MB.js";
import { P as PageHeroHeader } from "./PageHeroHeader-CPzgo-wN.js";
import { d as getDemoHospitalsByPhlebotomist, e as addDemoSample, D as DEMO_PHLEBO_ID } from "./demoData-Nk0_-YUY.js";
import { C as CircleCheckBig } from "./circle-check-big-CN4w7Yzd.js";
import { B as Building2 } from "./building-2-2WTSU1FY.js";
import { S as Search } from "./search-DHbyPuXy.js";
import { U as User, P as Phone } from "./user-BR4Wwed5.js";
import { T as TestTube } from "./StaffApp-4vOjvg9B.js";
import { M as Minus } from "./minus-vP_YIqwB.js";
import { P as Plus } from "./plus-Be-trJXM.js";
import { I as IndianRupee } from "./indian-rupee-l2gyERnG.js";
import { L as LoaderCircle } from "./ProfileSetupModal-DZhF98LT.js";
import "./clock-Bi5ilDhW.js";
import "./map-pin-Ddp8nwPv.js";
const DEMO_AVAILABLE_TESTS = [
  {
    testId: "CBC",
    testName: "Complete Blood Count",
    testCode: "CBC",
    price: 350
  },
  {
    testId: "LFT",
    testName: "Liver Function Test",
    testCode: "LFT",
    price: 600
  },
  {
    testId: "RBS",
    testName: "Random Blood Sugar",
    testCode: "RBS",
    price: 150
  },
  {
    testId: "KFT",
    testName: "Kidney Function Test",
    testCode: "KFT",
    price: 500
  },
  {
    testId: "TFT",
    testName: "Thyroid Function Test",
    testCode: "TFT",
    price: 450
  },
  { testId: "LIPID", testName: "Lipid Profile", testCode: "LIPID", price: 400 }
];
function AddHospitalSamplePage({
  isDemoMode = false,
  onNavigate
}) {
  const [hospitals, setHospitals] = reactExports.useState([]);
  const [selectedHospitalId, setSelectedHospitalId] = reactExports.useState("");
  const [hospitalSearch, setHospitalSearch] = reactExports.useState("");
  const [testSearch, setTestSearch] = reactExports.useState("");
  const [patientName, setPatientName] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [selectedTests, setSelectedTests] = reactExports.useState([]);
  const [discountAmount, setDiscountAmount] = reactExports.useState(0);
  const [amountReceived, setAmountReceived] = reactExports.useState(0);
  const [paymentMode, setPaymentMode] = reactExports.useState("CASH");
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const [isSuccess, setIsSuccess] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  reactExports.useEffect(() => {
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
    (h) => h.name.toLowerCase().includes(hospitalSearch.toLowerCase()) || (h.address || "").toLowerCase().includes(hospitalSearch.toLowerCase()) || (h.area || "").toLowerCase().includes(hospitalSearch.toLowerCase())
  );
  const filteredTests = DEMO_AVAILABLE_TESTS.filter(
    (t) => t.testName.toLowerCase().includes(testSearch.toLowerCase()) || t.testCode.toLowerCase().includes(testSearch.toLowerCase())
  );
  const toggleTest = (test) => {
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
        status: "SAMPLE_COLLECTED",
        statusHistory: [
          {
            status: "SAMPLE_COLLECTED",
            timestamp: now,
            note: "Sample collected",
            updatedBy: DEMO_PHLEBO_ID
          }
        ]
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
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "min-h-screen flex items-center justify-center p-4",
        style: { background: "#F7F9FC" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              background: "#FFFFFF",
              borderRadius: "24px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
              padding: "32px",
              textAlign: "center",
              maxWidth: "360px",
              width: "100%"
            },
            "data-ocid": "add_sample.success_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    width: "64px",
                    height: "64px",
                    background: "#F0FDF4",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    CircleCheckBig,
                    {
                      style: { width: "32px", height: "32px", color: "#16A34A" }
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h2",
                {
                  style: {
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "#111827",
                    marginBottom: "8px"
                  },
                  children: "Sample Added!"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "p",
                {
                  style: { color: "#6B7280", fontSize: "14px", marginBottom: "24px" },
                  children: [
                    "Sample for ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: patientName }),
                    " has been recorded successfully."
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "8px" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => onNavigate == null ? void 0 : onNavigate("my-samples"),
                    style: {
                      width: "100%",
                      background: "linear-gradient(135deg, #2563EB, #06B6D4)",
                      color: "white",
                      padding: "12px",
                      borderRadius: "12px",
                      fontWeight: 600,
                      fontSize: "14px",
                      border: "none",
                      cursor: "pointer"
                    },
                    "data-ocid": "add_sample.primary_button",
                    children: "View My Samples"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: handleReset,
                    style: {
                      width: "100%",
                      background: "#F3F4F6",
                      color: "#374151",
                      padding: "12px",
                      borderRadius: "12px",
                      fontWeight: 600,
                      fontSize: "14px",
                      border: "none",
                      cursor: "pointer"
                    },
                    "data-ocid": "add_sample.secondary_button",
                    children: "Add Another Sample"
                  }
                )
              ] })
            ]
          }
        )
      }
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
    boxSizing: "border-box"
  };
  const cardStyle = {
    background: "#FFFFFF",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
    padding: "16px"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen pb-[90px]", style: { background: "#F7F9FC" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeroHeader,
      {
        title: "Add Sample",
        description: "Record a new hospital sample collection"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 space-y-4", children: [
      error && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: {
            background: "#FEF2F2",
            border: "1px solid #FECACA",
            borderRadius: "12px",
            padding: "12px",
            fontSize: "14px",
            color: "#DC2626"
          },
          "data-ocid": "add_sample.error_state",
          children: error
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: cardStyle, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "12px"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Building2,
                {
                  style: { width: "16px", height: "16px", color: "#2563EB" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  style: {
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#1F2937",
                    margin: 0
                  },
                  children: "Select Hospital"
                }
              )
            ]
          }
        ),
        hospitals.length > 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "relative", marginBottom: "12px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Search,
            {
              style: {
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "16px",
                height: "16px",
                color: "#9CA3AF"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: hospitalSearch,
              onChange: (e) => setHospitalSearch(e.target.value),
              placeholder: "Search Hospital...",
              style: { ...inputStyle, paddingLeft: "38px" },
              "data-ocid": "add_sample.search_input"
            }
          )
        ] }),
        filteredHospitals.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: "14px", color: "#9CA3AF" }, children: "No hospitals assigned." }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: { display: "flex", flexDirection: "column", gap: "8px" },
            children: filteredHospitals.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setSelectedHospitalId(h.id),
                "data-ocid": "add_sample.select",
                style: {
                  width: "100%",
                  textAlign: "left",
                  padding: "12px",
                  borderRadius: "12px",
                  border: selectedHospitalId === h.id ? "2px solid #2563EB" : "2px solid #E5E7EB",
                  background: selectedHospitalId === h.id ? "#EFF6FF" : "white",
                  cursor: "pointer",
                  transition: "all 150ms ease"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      style: {
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#111827",
                        margin: 0
                      },
                      children: h.name
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "p",
                    {
                      style: {
                        fontSize: "12px",
                        color: "#6B7280",
                        margin: "2px 0 0"
                      },
                      children: [
                        h.area,
                        ", ",
                        h.city
                      ]
                    }
                  )
                ]
              },
              h.id
            ))
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: cardStyle, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "12px"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { style: { width: "16px", height: "16px", color: "#2563EB" } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  style: {
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#1F2937",
                    margin: 0
                  },
                  children: "Patient Details"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: { display: "flex", flexDirection: "column", gap: "12px" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "sample-patient-name",
                    style: {
                      fontSize: "12px",
                      fontWeight: 500,
                      color: "#374151",
                      display: "block",
                      marginBottom: "4px"
                    },
                    children: "Patient Name"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "sample-patient-name",
                    type: "text",
                    value: patientName,
                    onChange: (e) => setPatientName(e.target.value),
                    placeholder: "Enter patient name",
                    style: inputStyle,
                    "data-ocid": "add_sample.input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "sample-phone",
                    style: {
                      fontSize: "12px",
                      fontWeight: 500,
                      color: "#374151",
                      display: "block",
                      marginBottom: "4px"
                    },
                    children: "Phone Number"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "relative" }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Phone,
                    {
                      style: {
                        position: "absolute",
                        left: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: "16px",
                        height: "16px",
                        color: "#9CA3AF"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "sample-phone",
                      type: "tel",
                      value: phone,
                      onChange: (e) => setPhone(e.target.value),
                      placeholder: "10-digit mobile number",
                      maxLength: 10,
                      style: { ...inputStyle, paddingLeft: "38px" },
                      "data-ocid": "add_sample.input"
                    }
                  )
                ] })
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: cardStyle, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "12px"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                TestTube,
                {
                  style: { width: "16px", height: "16px", color: "#2563EB" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  style: {
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#1F2937",
                    margin: 0
                  },
                  children: "Select Tests"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "relative", marginBottom: "12px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Search,
            {
              style: {
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "16px",
                height: "16px",
                color: "#9CA3AF"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: testSearch,
              onChange: (e) => setTestSearch(e.target.value),
              placeholder: "Search Tests...",
              style: { ...inputStyle, paddingLeft: "38px" },
              "data-ocid": "add_sample.search_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: "8px" }, children: filteredTests.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            style: {
              fontSize: "13px",
              color: "#9CA3AF",
              textAlign: "center",
              padding: "12px"
            },
            children: "No tests match your search."
          }
        ) : filteredTests.map((test) => {
          const isSelected = !!selectedTests.find(
            (t) => t.testId === test.testId
          );
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => toggleTest(test),
              style: {
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px",
                borderRadius: "12px",
                border: isSelected ? "2px solid #2563EB" : "2px solid #E5E7EB",
                background: isSelected ? "#EFF6FF" : "white",
                cursor: "pointer",
                transition: "all 150ms ease"
              },
              "data-ocid": "add_sample.toggle",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "left" }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      style: {
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#111827",
                        margin: 0
                      },
                      children: test.testName
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      style: {
                        fontSize: "12px",
                        color: "#6B7280",
                        margin: "2px 0 0"
                      },
                      children: test.testCode
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: "8px"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "span",
                        {
                          style: {
                            fontSize: "14px",
                            fontWeight: 600,
                            color: "#374151"
                          },
                          children: [
                            "₹",
                            test.price
                          ]
                        }
                      ),
                      isSelected ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Minus,
                        {
                          style: {
                            width: "16px",
                            height: "16px",
                            color: "#2563EB"
                          }
                        }
                      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Plus,
                        {
                          style: {
                            width: "16px",
                            height: "16px",
                            color: "#9CA3AF"
                          }
                        }
                      )
                    ]
                  }
                )
              ]
            },
            test.testId
          );
        }) })
      ] }),
      selectedTests.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: cardStyle, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "16px"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                IndianRupee,
                {
                  style: { width: "16px", height: "16px", color: "#2563EB" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  style: {
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#1F2937",
                    margin: 0
                  },
                  children: "Billing"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginBottom: "16px"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "14px", color: "#6B7280" }, children: "Total MRP" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        style: {
                          fontSize: "14px",
                          color: "#374151",
                          fontWeight: 500
                        },
                        children: [
                          "₹",
                          totalMrp
                        ]
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontSize: "14px", color: "#6B7280" }, children: [
                      "Discount (max ₹",
                      maxAllowedDiscount,
                      ")"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "number",
                        value: discountAmount,
                        onChange: (e) => setDiscountAmount(
                          Math.min(Number(e.target.value), maxAllowedDiscount)
                        ),
                        min: 0,
                        max: maxAllowedDiscount,
                        style: {
                          width: "80px",
                          border: "1.5px solid #E5E7EB",
                          borderRadius: "8px",
                          padding: "4px 8px",
                          textAlign: "right",
                          fontSize: "14px",
                          outline: "none"
                        },
                        "data-ocid": "add_sample.input"
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTop: "1.5px solid #F3F4F6",
                    paddingTop: "10px"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        style: {
                          fontSize: "16px",
                          fontWeight: 700,
                          color: "#2563EB"
                        },
                        children: "Final Amount"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        style: {
                          fontSize: "18px",
                          fontWeight: 700,
                          color: "#2563EB"
                        },
                        children: [
                          "₹",
                          finalAmount
                        ]
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "14px", color: "#6B7280" }, children: "Amount Received" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "number",
                        value: amountReceived,
                        onChange: (e) => setAmountReceived(Number(e.target.value)),
                        min: 0,
                        max: finalAmount,
                        style: {
                          width: "80px",
                          border: "1.5px solid #E5E7EB",
                          borderRadius: "8px",
                          padding: "4px 8px",
                          textAlign: "right",
                          fontSize: "14px",
                          outline: "none"
                        },
                        "data-ocid": "add_sample.input"
                      }
                    )
                  ]
                }
              ),
              pendingAmount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        style: {
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#DC2626"
                        },
                        children: "Pending Amount"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        style: {
                          fontSize: "14px",
                          fontWeight: 700,
                          color: "#DC2626"
                        },
                        children: [
                          "₹",
                          pendingAmount
                        ]
                      }
                    )
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              style: {
                fontSize: "12px",
                fontWeight: 500,
                color: "#374151",
                marginBottom: "8px"
              },
              children: "Payment Mode"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: "8px" }, children: ["CASH", "UPI"].map((mode) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setPaymentMode(mode),
              "data-ocid": "add_sample.toggle",
              style: {
                flex: 1,
                padding: "10px",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                transition: "all 150ms ease",
                background: paymentMode === mode ? "linear-gradient(135deg, #2563EB, #06B6D4)" : "white",
                color: paymentMode === mode ? "white" : "#374151",
                boxShadow: paymentMode === mode ? "0 4px 12px rgba(13,71,161,0.25)" : "0 0 0 1.5px #E5E7EB inset"
              },
              children: mode
            },
            mode
          )) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: handleSubmit,
          disabled: isSubmitting,
          "data-ocid": "add_sample.submit_button",
          style: {
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
            boxShadow: "0 4px 16px rgba(13,71,161,0.3)"
          },
          children: isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              LoaderCircle,
              {
                style: { width: "16px", height: "16px" },
                className: "animate-spin"
              }
            ),
            "Saving..."
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { style: { width: "16px", height: "16px" } }),
            "Add Sample"
          ] })
        }
      )
    ] })
  ] });
}
export {
  AddHospitalSamplePage as default
};
