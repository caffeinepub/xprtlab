import { j as jsxRuntimeExports } from "./index-BcSF07MB.js";
import { M as MedicalCard } from "./MedicalCard-sow8Qu1z.js";
import { P as PageHeroHeader } from "./PageHeroHeader-CPzgo-wN.js";
import { k as useGetMyReports, b as FileText } from "./ProfileSetupModal-DZhF98LT.js";
import { E as Eye } from "./eye-CkrBJxxC.js";
import { D as Download } from "./download-hSuMNOtA.js";
import "./plus-Be-trJXM.js";
function ReportsPage({ onNavigate }) {
  const { data: reports = [], isLoading } = useGetMyReports();
  const sorted = [...reports].sort(
    (a, b) => Number(b.timestamp) - Number(a.timestamp)
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeroHeader,
      {
        title: "My Reports",
        description: "View and download your diagnostic reports"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => onNavigate("home"),
          className: "text-muted-foreground hover:text-foreground",
          children: "←"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-bold text-foreground", children: "My Reports" })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary" }) }) : sorted.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-12 h-12 mx-auto mb-3 opacity-30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "No reports yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", children: "Your lab reports will appear here" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: sorted.map((report) => {
      const url = report.file.getDirectURL();
      const date = new Date(
        Number(report.timestamp) / 1e6
      ).toLocaleDateString();
      return /* @__PURE__ */ jsxRuntimeExports.jsx(MedicalCard, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-5 h-5 text-primary flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground truncate", children: [
              "Report #",
              report.id.slice(-8)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "Booking: ",
              report.bookingId.slice(-8)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: date })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: url,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4 text-primary" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: url,
              download: true,
              className: "w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center hover:bg-accent/20 transition-colors",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4 text-accent" })
            }
          )
        ] })
      ] }) }, report.id);
    }) })
  ] });
}
export {
  ReportsPage as default
};
