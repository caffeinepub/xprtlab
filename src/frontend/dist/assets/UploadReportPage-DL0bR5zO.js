import { r as reactExports, j as jsxRuntimeExports } from "./index-77iKE7z5.js";
import { I as Input } from "./input-BUljrT4O.js";
import { L as Label } from "./label-D5X5n7nv.js";
import { u as ue } from "./index-DnGMpjq-.js";
import { G as GradientButton } from "./GradientButton-CD5g_dqu.js";
import { M as MedicalCard } from "./MedicalCard-DDeCY5r4.js";
import { v as useUploadReport, b as FileText } from "./ProfileSetupModal-BB_monh5.js";
import { C as CircleCheckBig } from "./circle-check-big-DbLdUdcS.js";
import { U as Upload } from "./upload-zSRfKq77.js";
import { C as CircleAlert } from "./circle-alert-TSpHor6V.js";
function generateId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}
function UploadReportPage({
  onNavigate
}) {
  const [bookingId, setBookingId] = reactExports.useState("");
  const [patientId, setPatientId] = reactExports.useState("");
  const [selectedFile, setSelectedFile] = reactExports.useState(null);
  const [uploadProgress, setUploadProgress] = reactExports.useState(0);
  const fileInputRef = reactExports.useRef(null);
  const uploadMutation = useUploadReport();
  const handleFileSelect = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (file) {
      if (file.type !== "application/pdf") {
        ue.error("Please select a PDF file");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        ue.error("File size must be less than 10MB");
        return;
      }
      setSelectedFile(file);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile || !bookingId.trim() || !patientId.trim()) return;
    try {
      setUploadProgress(0);
      const reportId = generateId();
      await uploadMutation.mutateAsync({
        reportId,
        bookingId: bookingId.trim(),
        patientId: patientId.trim(),
        file: selectedFile,
        onProgress: (pct) => setUploadProgress(pct)
      });
      ue.success("Report uploaded successfully!");
      onNavigate("admin-reports");
    } catch (_err) {
      ue.error("Failed to upload report. Please try again.");
    }
  };
  if (uploadMutation.isSuccess) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-5 space-y-5 animate-fade-in", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-8 h-8 text-white" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-foreground", children: "Report Uploaded!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2", children: "The lab report has been successfully uploaded and is now available to the patient." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        GradientButton,
        {
          onClick: () => onNavigate("admin-reports"),
          className: "w-full",
          children: "View All Reports"
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-5 space-y-5 animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => onNavigate("admin-reports"),
          className: "text-muted-foreground hover:text-foreground",
          children: "←"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-foreground", children: "Upload Report" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Upload a PDF lab report for a patient" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MedicalCard, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-medium", children: "Booking ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Enter booking ID",
              value: bookingId,
              onChange: (e) => setBookingId(e.target.value),
              required: true,
              className: "rounded-xl"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-medium", children: "Patient Principal ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Enter patient principal ID",
              value: patientId,
              onChange: (e) => setPatientId(e.target.value),
              required: true,
              className: "rounded-xl"
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(MedicalCard, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => {
              var _a;
              return (_a = fileInputRef.current) == null ? void 0 : _a.click();
            },
            className: `w-full border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${selectedFile ? "border-brand-blue bg-gradient-primary-soft" : "border-border hover:border-brand-blue/50"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  ref: fileInputRef,
                  type: "file",
                  accept: ".pdf",
                  onChange: handleFileSelect,
                  className: "hidden"
                }
              ),
              selectedFile ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-8 h-8 text-brand-blue flex-shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: selectedFile.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    (selectedFile.size / 1024 / 1024).toFixed(2),
                    " MB"
                  ] })
                ] })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-8 h-8 text-muted-foreground mx-auto mb-2" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Click to select PDF" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Maximum file size: 10MB" })
              ] })
            ]
          }
        ),
        uploadMutation.isPending && uploadProgress > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Uploading..." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              uploadProgress,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-full gradient-primary rounded-full transition-all duration-300",
              style: { width: `${uploadProgress}%` }
            }
          ) })
        ] })
      ] }),
      uploadMutation.isError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-destructive text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 flex-shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Upload failed. Please try again." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        GradientButton,
        {
          type: "submit",
          loading: uploadMutation.isPending,
          disabled: !selectedFile || !bookingId.trim() || !patientId.trim(),
          className: "w-full",
          size: "lg",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4" }),
            "Upload Report"
          ]
        }
      )
    ] })
  ] });
}
export {
  UploadReportPage as default
};
