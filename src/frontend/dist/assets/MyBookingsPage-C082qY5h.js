import { j as jsxRuntimeExports } from "./index-77iKE7z5.js";
import { M as MedicalCard } from "./MedicalCard-DDeCY5r4.js";
import { P as PageHeroHeader } from "./PageHeroHeader-DMNNWZUS.js";
import { S as StatusBadge } from "./StatusBadge-BYhnnOmo.js";
import { g as useGetMyBookings, F as FlaskConical } from "./ProfileSetupModal-BB_monh5.js";
import { C as Calendar } from "./calendar-CFbJdD6f.js";
import { C as Clock } from "./clock-BEcvoIYA.js";
import "./plus-B03gg-WC.js";
function MyBookingsPage({ onNavigate }) {
  const { data: bookings = [], isLoading } = useGetMyBookings();
  const sorted = [...bookings].sort(
    (a, b) => Number(b.timestamp) - Number(a.timestamp)
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeroHeader,
      {
        title: "My Bookings",
        description: "Track your upcoming and past test bookings"
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
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-bold text-foreground", children: "My Bookings" })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary" }) }) : sorted.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-12 h-12 mx-auto mb-3 opacity-30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "No bookings yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", children: "Book a test to get started" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => onNavigate("book-test"),
          className: "mt-4 text-primary text-sm font-medium underline",
          children: "Book a Test"
        }
      )
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: sorted.map((booking) => /* @__PURE__ */ jsxRuntimeExports.jsxs(MedicalCard, { className: "p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { className: "w-4 h-4 text-primary flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-muted-foreground truncate max-w-[120px]", children: [
            "#",
            booking.id.slice(-8)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: booking.status })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1 mb-2", children: booking.tests.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full",
          children: t.name
        },
        t.id
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: booking.slot })
      ] })
    ] }, booking.id)) })
  ] });
}
export {
  MyBookingsPage as default
};
