import { r as reactExports, j as jsxRuntimeExports } from "./index-lVn_hGWr.js";
import { A as useSubmitIncident, X, L as LoaderCircle } from "./ProfileSetupModal-BYStubB_.js";
import { C as CircleCheckBig } from "./circle-check-big-CKsn2ZsM.js";
import { C as Camera } from "./camera-CCm_syBC.js";
import { T as TriangleAlert } from "./triangle-alert-DHn0HLZP.js";
function SubmitIncidentPage({
  onNavigate
}) {
  const [description, setDescription] = reactExports.useState("");
  const [severity, setSeverity] = reactExports.useState("low");
  const [photoFile, setPhotoFile] = reactExports.useState(null);
  const [photoPreview, setPhotoPreview] = reactExports.useState(null);
  const [submitted, setSubmitted] = reactExports.useState(false);
  const fileInputRef = reactExports.useRef(null);
  const submitMutation = useSubmitIncident();
  const handlePhotoChange = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onload = () => setPhotoPreview(reader.result);
    reader.readAsDataURL(file);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) return;
    try {
      await submitMutation.mutateAsync({
        description,
        severity,
        photo: photoFile
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Failed to submit incident", err);
    }
  };
  const severityColors = {
    low: "bg-green-50 border-green-300 text-green-700",
    medium: "bg-yellow-50 border-yellow-300 text-yellow-700",
    high: "bg-red-50 border-red-300 text-red-700"
  };
  if (submitted) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center min-h-[60vh] p-8 text-center space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 rounded-full bg-green-100 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-8 w-8 text-green-600" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-foreground", children: "Incident Submitted" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Your incident report has been submitted successfully." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => {
              setSubmitted(false);
              setDescription("");
              setPhotoFile(null);
              setPhotoPreview(null);
              setSeverity("low");
            },
            className: "px-4 py-2 rounded-xl bg-primary text-white font-semibold text-sm",
            children: "Submit Another"
          }
        ),
        onNavigate && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => onNavigate("tasks"),
            className: "px-4 py-2 rounded-xl border border-border text-sm font-semibold text-foreground",
            children: "Back to Tasks"
          }
        )
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-4 max-w-lg mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-foreground", children: "Submit Incident" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-border shadow-sm p-4 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "incident-severity",
            className: "text-xs font-bold text-muted-foreground uppercase tracking-wider",
            children: "Severity *"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: ["low", "medium", "high"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setSeverity(s),
            className: `py-2 rounded-xl border font-semibold text-xs transition-colors ${severity === s ? severityColors[s] : "border-border text-muted-foreground hover:bg-muted/30"}`,
            children: s.charAt(0).toUpperCase() + s.slice(1)
          },
          s
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-border shadow-sm p-4 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "incident-description",
            className: "text-xs font-bold text-muted-foreground uppercase tracking-wider",
            children: "Description *"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            id: "incident-description",
            value: description,
            onChange: (e) => setDescription(e.target.value),
            placeholder: "Describe the incident in detail...",
            rows: 4,
            required: true,
            className: "w-full px-3 py-2 rounded-xl border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-border shadow-sm p-4 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-muted-foreground uppercase tracking-wider", children: "Photo (Optional)" }),
        photoPreview ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: photoPreview,
              alt: "Incident",
              className: "w-full rounded-xl object-cover max-h-48"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => {
                setPhotoFile(null);
                setPhotoPreview(null);
              },
              className: "absolute top-2 right-2 h-7 w-7 rounded-full bg-black/60 text-white flex items-center justify-center",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => {
              var _a;
              return (_a = fileInputRef.current) == null ? void 0 : _a.click();
            },
            className: "w-full py-8 rounded-xl border-2 border-dashed border-border text-muted-foreground flex flex-col items-center gap-2 hover:bg-muted/30 transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "h-6 w-6" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold", children: "Tap to add photo" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            ref: fileInputRef,
            type: "file",
            accept: "image/*",
            capture: "environment",
            onChange: handlePhotoChange,
            className: "hidden"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "submit",
          disabled: submitMutation.isPending || !description.trim(),
          className: "w-full py-3 rounded-xl bg-primary text-white font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50 shadow-sm",
          children: submitMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
            " Submitting..."
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4" }),
            " Submit Incident"
          ] })
        }
      )
    ] })
  ] });
}
export {
  SubmitIncidentPage as default
};
