import { r as reactExports, j as jsxRuntimeExports } from "./index-D697BR3C.js";
import { p as useRecordBPReading, q as useRecordRBSReading, L as LoaderCircle } from "./ProfileSetupModal-DNPvAtBR.js";
import { H as Heart } from "./heart-Biq16MZF.js";
import { A as Activity } from "./activity-C55ZXODG.js";
function RecordVitalsPage() {
  const [activeTab, setActiveTab] = reactExports.useState("bp");
  const [systolic, setSystolic] = reactExports.useState("");
  const [diastolic, setDiastolic] = reactExports.useState("");
  const [pulse, setPulse] = reactExports.useState("");
  const [glucose, setGlucose] = reactExports.useState("");
  const recordBPMutation = useRecordBPReading();
  const recordRBSMutation = useRecordRBSReading();
  const handleBPSubmit = async (e) => {
    e.preventDefault();
    if (!systolic || !diastolic || !pulse) return;
    try {
      await recordBPMutation.mutateAsync({
        systolic: Number.parseInt(systolic),
        diastolic: Number.parseInt(diastolic),
        pulse: Number.parseInt(pulse)
      });
      setSystolic("");
      setDiastolic("");
      setPulse("");
    } catch (err) {
      console.error("Failed to record BP", err);
    }
  };
  const handleRBSSubmit = async (e) => {
    e.preventDefault();
    if (!glucose) return;
    try {
      await recordRBSMutation.mutateAsync({
        glucoseLevel: Number.parseInt(glucose)
      });
      setGlucose("");
    } catch (err) {
      console.error("Failed to record RBS", err);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-4 max-w-lg mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-foreground", children: "Record Vitals" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 bg-muted rounded-xl p-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setActiveTab("bp"),
          className: `flex-1 py-2 rounded-lg text-xs font-bold transition-colors ${activeTab === "bp" ? "bg-white text-foreground shadow-sm" : "text-muted-foreground"}`,
          children: "Blood Pressure"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setActiveTab("rbs"),
          className: `flex-1 py-2 rounded-lg text-xs font-bold transition-colors ${activeTab === "rbs" ? "bg-white text-foreground shadow-sm" : "text-muted-foreground"}`,
          children: "Blood Glucose"
        }
      )
    ] }),
    activeTab === "bp" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-border shadow-sm p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-5 w-5 text-red-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-sm text-foreground", children: "Blood Pressure Reading" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleBPSubmit, className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "vitals-systolic",
                className: "text-xs font-semibold text-foreground",
                children: "Systolic"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "vitals-systolic",
                type: "number",
                value: systolic,
                onChange: (e) => setSystolic(e.target.value),
                placeholder: "120",
                min: "60",
                max: "250",
                required: true,
                className: "w-full px-3 py-2 rounded-xl border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "vitals-diastolic",
                className: "text-xs font-semibold text-foreground",
                children: "Diastolic"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "vitals-diastolic",
                type: "number",
                value: diastolic,
                onChange: (e) => setDiastolic(e.target.value),
                placeholder: "80",
                min: "40",
                max: "150",
                required: true,
                className: "w-full px-3 py-2 rounded-xl border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "vitals-pulse",
                className: "text-xs font-semibold text-foreground",
                children: "Pulse"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "vitals-pulse",
                type: "number",
                value: pulse,
                onChange: (e) => setPulse(e.target.value),
                placeholder: "72",
                min: "40",
                max: "200",
                required: true,
                className: "w-full px-3 py-2 rounded-xl border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "submit",
            disabled: recordBPMutation.isPending,
            className: "w-full py-3 rounded-xl bg-primary text-white font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50",
            children: recordBPMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
              " Recording..."
            ] }) : "Record BP"
          }
        ),
        recordBPMutation.isSuccess && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-green-600 font-semibold text-center", children: "BP recorded successfully!" })
      ] })
    ] }),
    activeTab === "rbs" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-border shadow-sm p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-5 w-5 text-blue-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-sm text-foreground", children: "Blood Glucose (RBS)" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleRBSSubmit, className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "vitals-glucose",
              className: "text-xs font-semibold text-foreground",
              children: "Glucose Level (mg/dL)"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "vitals-glucose",
              type: "number",
              value: glucose,
              onChange: (e) => setGlucose(e.target.value),
              placeholder: "100",
              min: "20",
              max: "600",
              required: true,
              className: "w-full px-3 py-2 rounded-xl border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "submit",
            disabled: recordRBSMutation.isPending,
            className: "w-full py-3 rounded-xl bg-primary text-white font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50",
            children: recordRBSMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
              " Recording..."
            ] }) : "Record Glucose"
          }
        ),
        recordRBSMutation.isSuccess && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-green-600 font-semibold text-center", children: "Glucose recorded successfully!" })
      ] })
    ] })
  ] });
}
export {
  RecordVitalsPage as default
};
