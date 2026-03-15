import { r as reactExports, j as jsxRuntimeExports } from "./index-BcSF07MB.js";
import { I as Input } from "./input-BiZ8Warn.js";
import { S as Skeleton } from "./skeleton-j2Ru2Hzr.js";
import { M as MedicalCard } from "./MedicalCard-sow8Qu1z.js";
import { P as PageHeroHeader } from "./PageHeroHeader-CPzgo-wN.js";
import { x as useGetAllReports, b as FileText } from "./ProfileSetupModal-DZhF98LT.js";
import { b as formatDate } from "./formatters-DgcbtmQq.js";
import { U as Upload } from "./upload-CAZ75PVW.js";
import { S as Search } from "./search-DHbyPuXy.js";
import { C as Calendar } from "./calendar-CsQhAJiE.js";
import { E as Eye } from "./eye-CkrBJxxC.js";
import { D as Download } from "./download-hSuMNOtA.js";
import "./plus-Be-trJXM.js";
function AdminReportsPage({
  onNavigate
}) {
  const { data: reports = [], isLoading } = useGetAllReports();
  const [search, setSearch] = reactExports.useState("");
  const filtered = reports.filter(
    (r) => r.id.toLowerCase().includes(search.toLowerCase()) || r.bookingId.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => Number(b.timestamp) - Number(a.timestamp));
  const handleView = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };
  const handleDownload = (url, id) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = `report-${id}.pdf`;
    a.target = "_blank";
    a.click();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-5 space-y-4 animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeroHeader,
      {
        title: "Reports",
        description: "View and manage diagnostic reports"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-foreground", children: "All Reports" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          reports.length,
          " reports"
        ] })
      ] }),
      onNavigate && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => onNavigate("upload-report"),
          className: "gradient-btn px-3 py-2 text-xs flex items-center gap-1",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-3.5 h-3.5" }),
            "Upload"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          placeholder: "Search by ID or booking...",
          value: search,
          onChange: (e) => setSearch(e.target.value),
          className: "pl-9 rounded-xl"
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 rounded-card" }, i)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(MedicalCard, { className: "text-center py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-12 h-12 mx-auto text-muted-foreground/30 mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-medium", children: "No reports found" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: filtered.map((report) => {
      const fileUrl = report.file.getDirectURL();
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(MedicalCard, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-5 h-5 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Lab Report" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "Booking: ",
              report.bookingId.slice(0, 14),
              "..."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-mono", children: [
              "Patient: ",
              report.patient.toString().slice(0, 14),
              "..."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-0.5 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDate(report.timestamp) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => handleView(fileUrl),
              className: "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border-2 border-brand-blue text-brand-blue text-xs font-semibold hover:bg-gradient-primary-soft transition-colors",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5" }),
                "View"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => handleDownload(fileUrl, report.id),
              className: "flex-1 gradient-btn flex items-center justify-center gap-1.5 py-2 text-xs",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
                "Download"
              ]
            }
          )
        ] })
      ] }, report.id);
    }) })
  ] });
}
export {
  AdminReportsPage as default
};
