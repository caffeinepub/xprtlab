import { r as reactExports, j as jsxRuntimeExports } from "./index-lVn_hGWr.js";
import { P as PageHeroHeader } from "./PageHeroHeader-iVDMtqNX.js";
import { d as getDemoHospitalsByPhlebotomist, e as addDemoSample, D as DEMO_PHLEBO_ID } from "./demoData-B0MQ4MOM.js";
import { C as CircleCheckBig } from "./circle-check-big-CKsn2ZsM.js";
import { B as Building2 } from "./building-2-CzOXe9xM.js";
import { U as User, P as Phone } from "./user-D8SUbWXo.js";
import { T as TestTube } from "./StaffApp-GSTH_5VV.js";
import { M as Minus } from "./minus-CKDBsE2O.js";
import { P as Plus } from "./plus-BegRxyQ4.js";
import { I as IndianRupee } from "./indian-rupee-oPr-AmVC.js";
import { L as LoaderCircle } from "./ProfileSetupModal-BYStubB_.js";
import "./clock-fiwY_hPt.js";
import "./map-pin-D6z2p51m.js";
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
    if (hospitals.length !== 1) setSelectedHospitalId("");
  };
  if (isSuccess) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-center max-w-sm w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-8 h-8 text-green-600" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-gray-900 mb-2", children: "Sample Added!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-500 text-sm mb-6", children: [
        "Sample for ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: patientName }),
        " has been recorded successfully."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => onNavigate == null ? void 0 : onNavigate("my-samples"),
            className: "w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-xl font-semibold text-sm",
            children: "View My Samples"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: handleReset,
            className: "w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold text-sm",
            children: "Add Another Sample"
          }
        )
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gray-50 pb-[90px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeroHeader,
      {
        title: "Add Sample",
        description: "Record a new hospital sample collection"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border-b border-gray-100 px-4 pt-4 pb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-gray-900", children: "Add Hospital Sample" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 mt-0.5", children: "Record a new patient sample" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-4 space-y-4", children: [
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl shadow-sm border border-gray-100 p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-4 h-4 text-blue-600" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-gray-800", children: "Select Hospital" })
        ] }),
        hospitals.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400", children: "No hospitals assigned." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: hospitals.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setSelectedHospitalId(h.id),
            className: `w-full text-left p-3 rounded-xl border-2 transition-all ${selectedHospitalId === h.id ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-gray-900", children: h.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-500", children: [
                h.area,
                ", ",
                h.city
              ] })
            ]
          },
          h.id
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl shadow-sm border border-gray-100 p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4 text-blue-600" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-gray-800", children: "Patient Details" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "sample-patient-name",
                className: "text-xs font-medium text-gray-600 mb-1 block",
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
                className: "w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "sample-phone",
                className: "text-xs font-medium text-gray-600 mb-1 block",
                children: "Phone Number"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center border-2 border-gray-200 rounded-xl overflow-hidden focus-within:border-blue-500", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4 text-gray-400 ml-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "tel",
                  value: phone,
                  onChange: (e) => setPhone(e.target.value),
                  placeholder: "10-digit mobile number",
                  maxLength: 10,
                  className: "flex-1 px-3 py-2.5 text-sm focus:outline-none"
                }
              )
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl shadow-sm border border-gray-100 p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TestTube, { className: "w-4 h-4 text-blue-600" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-gray-800", children: "Select Tests" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: DEMO_AVAILABLE_TESTS.map((test) => {
          const isSelected = !!selectedTests.find(
            (t) => t.testId === test.testId
          );
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => toggleTest(test),
              className: `w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all ${isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-gray-900", children: test.testName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: test.testCode })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-gray-700", children: [
                    "₹",
                    test.price
                  ] }),
                  isSelected ? /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-4 h-4 text-blue-600" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 text-gray-400" })
                ] })
              ]
            },
            test.testId
          );
        }) })
      ] }),
      selectedTests.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl shadow-sm border border-gray-100 p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "w-4 h-4 text-blue-600" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-gray-800", children: "Billing" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-gray-600", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total MRP" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "₹",
              totalMrp
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-gray-600", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
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
                className: "w-20 border border-gray-200 rounded-lg px-2 py-1 text-right text-sm focus:outline-none focus:border-blue-500"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-semibold text-gray-900 border-t border-gray-100 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Final Amount" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "₹",
              finalAmount
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-gray-600", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Amount Received" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "number",
                value: amountReceived,
                onChange: (e) => setAmountReceived(Number(e.target.value)),
                min: 0,
                max: finalAmount,
                className: "w-20 border border-gray-200 rounded-lg px-2 py-1 text-right text-sm focus:outline-none focus:border-blue-500"
              }
            )
          ] }),
          pendingAmount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-red-600 font-medium", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Pending" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "₹",
              pendingAmount
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-gray-600 mb-2", children: "Payment Mode" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: ["CASH", "UPI"].map((mode) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setPaymentMode(mode),
              className: `flex-1 py-2 rounded-xl text-sm font-medium border-2 transition-all ${paymentMode === mode ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-600"}`,
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
          className: "w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-4 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-60",
          children: isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
            "Saving..."
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4" }),
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
