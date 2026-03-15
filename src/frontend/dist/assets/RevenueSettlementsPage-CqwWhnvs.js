import { r as reactExports, j as jsxRuntimeExports, V as Variant_Partial_Settled } from "./index-BcSF07MB.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-ByzmsOo8.js";
import { c as getDemoSamples, f as getDemoHospitals, D as DEMO_PHLEBO_ID, o as getDemoSettlements, s as saveDemoSettlement } from "./demoData-Nk0_-YUY.js";
import { I as IndianRupee } from "./indian-rupee-l2gyERnG.js";
import { C as Calendar } from "./calendar-CsQhAJiE.js";
import { c as CalendarDays, b as TrendingUp, B as Banknote } from "./StaffApp-4vOjvg9B.js";
import { C as Clock } from "./clock-Bi5ilDhW.js";
import { T as Tag } from "./tag-CXTDw1C4.js";
import { B as Building2 } from "./building-2-2WTSU1FY.js";
import { d as createLucideIcon, X, ar as useGetSettlementHistory, as as useMarkSettlement, L as LoaderCircle } from "./ProfileSetupModal-DZhF98LT.js";
import { C as ChevronLeft } from "./chevron-left-BxC5P6FU.js";
import { C as ChevronRight } from "./chevron-right-DMGKFxFM.js";
import { S as Search } from "./search-DHbyPuXy.js";
import { E as Eye } from "./eye-CkrBJxxC.js";
import { U as Users } from "./users-CRIG9gwK.js";
import { C as CircleCheckBig } from "./circle-check-big-CN4w7Yzd.js";
import { P as Plus } from "./plus-Be-trJXM.js";
import { P as PageHeroHeader } from "./PageHeroHeader-CPzgo-wN.js";
import "./index-DQcsENVr.js";
import "./user-BR4Wwed5.js";
import "./map-pin-Ddp8nwPv.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
  ["path", { d: "M12 7v5l4 2", key: "1fdv2h" }]
];
const History = createLucideIcon("history", __iconNode);
function computeMetrics(samples) {
  const startOfToday = /* @__PURE__ */ new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const todayMs = startOfToday.getTime();
  const startOfWeek = /* @__PURE__ */ new Date();
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  const weekMs = startOfWeek.getTime();
  const startOfMonth = /* @__PURE__ */ new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);
  const monthMs = startOfMonth.getTime();
  let revenueToday = 0;
  let revenueThisWeek = 0;
  let revenueThisMonth = 0;
  let pendingCollections = 0;
  let totalDiscountsGiven = 0;
  for (const sample of samples) {
    const ts = sample.createdAt;
    if (ts >= todayMs) revenueToday += sample.finalAmount;
    if (ts >= weekMs) revenueThisWeek += sample.finalAmount;
    if (ts >= monthMs) revenueThisMonth += sample.finalAmount;
    pendingCollections += sample.pendingAmount;
    totalDiscountsGiven += sample.discountAmount;
  }
  return {
    revenueToday,
    revenueThisWeek,
    revenueThisMonth,
    pendingCollections,
    totalDiscountsGiven
  };
}
function formatCurrency$5(amount) {
  if (amount >= 1e5) {
    return `₹${(amount / 1e5).toFixed(1)}L`;
  }
  if (amount >= 1e3) {
    return `₹${(amount / 1e3).toFixed(1)}K`;
  }
  return `₹${amount.toLocaleString("en-IN")}`;
}
function MetricCard({
  title,
  value,
  subtitle,
  icon,
  gradient,
  iconBg
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `premium-card p-5 ${gradient} relative overflow-hidden`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-gray-500 mb-1", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-gray-900 mb-1", children: value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400", children: subtitle })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `w-11 h-11 rounded-xl ${iconBg} flex items-center justify-center shadow-sm flex-shrink-0`,
        children: icon
      }
    )
  ] }) });
}
function DailyRevenueOverviewModule({
  isDemoMode = false
}) {
  const metrics = reactExports.useMemo(() => {
    if (isDemoMode) {
      const samples = getDemoSamples();
      return computeMetrics(samples);
    }
    return {
      revenueToday: 0,
      revenueThisWeek: 0,
      revenueThisMonth: 0,
      pendingCollections: 0,
      totalDiscountsGiven: 0
    };
  }, [isDemoMode]);
  const cards = [
    {
      title: "Revenue Today",
      value: formatCurrency$5(metrics.revenueToday),
      subtitle: "Today's total billing",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "w-5 h-5 text-blue-600" }),
      gradient: "bg-gradient-to-br from-blue-50 to-white",
      iconBg: "bg-blue-100"
    },
    {
      title: "Revenue This Week",
      value: formatCurrency$5(metrics.revenueThisWeek),
      subtitle: "Current week total",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-5 h-5 text-indigo-600" }),
      gradient: "bg-gradient-to-br from-indigo-50 to-white",
      iconBg: "bg-indigo-100"
    },
    {
      title: "Revenue This Month",
      value: formatCurrency$5(metrics.revenueThisMonth),
      subtitle: "Current month total",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-5 h-5 text-violet-600" }),
      gradient: "bg-gradient-to-br from-violet-50 to-white",
      iconBg: "bg-violet-100"
    },
    {
      title: "Pending Collections",
      value: formatCurrency$5(metrics.pendingCollections),
      subtitle: "Awaiting payment",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-5 h-5 text-amber-600" }),
      gradient: "bg-gradient-to-br from-amber-50 to-white",
      iconBg: "bg-amber-100"
    },
    {
      title: "Total Discounts Given",
      value: formatCurrency$5(metrics.totalDiscountsGiven),
      subtitle: "All-time discounts",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-5 h-5 text-rose-600" }),
      gradient: "bg-gradient-to-br from-rose-50 to-white",
      iconBg: "bg-rose-100"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-5 h-5 text-brand-start" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-gray-900", children: "Daily Revenue Overview" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4", children: cards.map((card) => /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { ...card }, card.title)) }),
    !isDemoMode && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 p-3 bg-blue-50 border border-blue-100 rounded-xl text-sm text-blue-600 text-center", children: "Connect to live backend to see real revenue data." })
  ] });
}
const PAGE_SIZE$1 = 10;
function formatCurrency$4(amount) {
  return `₹${amount.toLocaleString("en-IN")}`;
}
function formatDate$2(ts) {
  return new Date(ts).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function getStatusColor(status) {
  switch (status) {
    case "SAMPLE_COLLECTED":
      return "bg-gray-100 text-gray-600";
    case "DISPATCHED":
      return "bg-blue-100 text-blue-600";
    case "RECEIVED_AT_LAB":
      return "bg-indigo-100 text-indigo-600";
    case "PROCESSING":
      return "bg-orange-100 text-orange-600";
    case "REPORT_READY":
      return "bg-green-100 text-green-600";
    case "REPORT_DELIVERED":
      return "bg-emerald-100 text-emerald-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
}
function getStatusLabel(status) {
  switch (status) {
    case "SAMPLE_COLLECTED":
      return "Collected";
    case "DISPATCHED":
      return "Dispatched";
    case "RECEIVED_AT_LAB":
      return "At Lab";
    case "PROCESSING":
      return "Processing";
    case "REPORT_READY":
      return "Ready";
    case "REPORT_DELIVERED":
      return "Delivered";
    default:
      return status;
  }
}
function getPaymentModeLabel(mode) {
  switch (mode) {
    case "CASH":
      return "Cash";
    case "UPI":
      return "UPI";
    case "CREDIT":
      return "Credit";
    case "ONLINE":
      return "Online";
    default:
      return mode;
  }
}
function HospitalDetailedLedgerModal({
  hospital,
  isDemoMode = false,
  onClose
}) {
  const [page, setPage] = reactExports.useState(1);
  const samples = reactExports.useMemo(() => {
    if (!isDemoMode) return [];
    return getDemoSamples().filter((s) => s.hospitalId === hospital.hospitalId);
  }, [isDemoMode, hospital.hospitalId]);
  const totalPages = Math.max(1, Math.ceil(samples.length / PAGE_SIZE$1));
  const paginatedSamples = samples.slice(
    (page - 1) * PAGE_SIZE$1,
    page * PAGE_SIZE$1
  );
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute inset-0 bg-black/50 backdrop-blur-sm",
        onClick: onClose,
        onKeyDown: (e) => e.key === "Escape" && onClose(),
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-brand-start/5 to-brand-end/5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-gradient-to-br from-brand-start to-brand-end flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-4 h-4 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-bold text-gray-900", children: hospital.hospitalName }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-500", children: [
              "Detailed Ledger — ",
              samples.length,
              " records"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onClose,
            className: "p-2 rounded-xl hover:bg-gray-100 transition-colors",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5 text-gray-500" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-0 border-b border-gray-100", children: [
        {
          label: "Total Revenue",
          value: `₹${hospital.totalRevenue.toLocaleString("en-IN")}`,
          color: "text-gray-900"
        },
        {
          label: "Received",
          value: `₹${hospital.totalReceived.toLocaleString("en-IN")}`,
          color: "text-emerald-600"
        },
        {
          label: "Pending",
          value: `₹${hospital.pendingAmount.toLocaleString("en-IN")}`,
          color: "text-amber-600"
        },
        {
          label: "Discount",
          value: `₹${hospital.discountGiven.toLocaleString("en-IN")}`,
          color: "text-rose-500"
        }
      ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "px-4 py-3 text-center border-r border-gray-100 last:border-r-0",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-base font-bold ${item.color}`, children: item.value }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-400", children: item.label })
          ]
        },
        item.label
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "sticky top-0 bg-gray-50 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-gray-600 whitespace-nowrap", children: "Patient" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-gray-600 whitespace-nowrap", children: "Test(s)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-semibold text-gray-600 whitespace-nowrap", children: "MRP" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-semibold text-gray-600 whitespace-nowrap", children: "Discount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-semibold text-gray-600 whitespace-nowrap", children: "Final Amt" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-semibold text-gray-600 whitespace-nowrap", children: "Received" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-semibold text-gray-600 whitespace-nowrap", children: "Pending" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center px-4 py-3 font-semibold text-gray-600 whitespace-nowrap", children: "Mode" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center px-4 py-3 font-semibold text-gray-600 whitespace-nowrap", children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center px-4 py-3 font-semibold text-gray-600 whitespace-nowrap", children: "Status" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: paginatedSamples.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 10, className: "text-center py-12 text-gray-400", children: "No records found for this hospital." }) }) : paginatedSamples.map((sample) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "border-b border-gray-50 hover:bg-blue-50/30 transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-gray-900", children: sample.patientName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-400", children: sample.phone })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gray-700 text-xs", children: sample.tests.map((t) => t.testCode).join(", ") }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right text-gray-700", children: formatCurrency$4(sample.totalMrp) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right text-rose-500", children: formatCurrency$4(sample.discountAmount) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-semibold text-gray-900", children: formatCurrency$4(sample.finalAmount) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right text-emerald-600", children: formatCurrency$4(sample.amountReceived) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right text-amber-600", children: formatCurrency$4(sample.pendingAmount) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600", children: getPaymentModeLabel(sample.paymentMode) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center text-xs text-gray-500 whitespace-nowrap", children: formatDate$2(sample.createdAt) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(sample.status)}`,
                  children: getStatusLabel(sample.status)
                }
              ) })
            ]
          },
          sample.id
        )) })
      ] }) }),
      samples.length > PAGE_SIZE$1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-6 py-3 border-t border-gray-100 bg-gray-50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-gray-500", children: [
          "Showing ",
          (page - 1) * PAGE_SIZE$1 + 1,
          "–",
          Math.min(page * PAGE_SIZE$1, samples.length),
          " of ",
          samples.length
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => handlePageChange(page - 1),
              disabled: page === 1,
              className: "p-1.5 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-100 transition-colors",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-gray-700", children: [
            page,
            " / ",
            totalPages
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => handlePageChange(page + 1),
              disabled: page === totalPages,
              className: "p-1.5 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-100 transition-colors",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
            }
          )
        ] })
      ] })
    ] })
  ] });
}
const PAGE_SIZE = 10;
function formatCurrency$3(amount) {
  return `₹${amount.toLocaleString("en-IN")}`;
}
function formatDate$1(ts) {
  if (!ts) return "—";
  return new Date(ts).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function HospitalLedgerModule({
  isDemoMode = false
}) {
  const [searchHospital, setSearchHospital] = reactExports.useState("");
  const [dateFrom, setDateFrom] = reactExports.useState("");
  const [dateTo, setDateTo] = reactExports.useState("");
  const [page, setPage] = reactExports.useState(1);
  const [selectedHospital, setSelectedHospital] = reactExports.useState(null);
  const ledgerData = reactExports.useMemo(() => {
    if (!isDemoMode) return [];
    const samples = getDemoSamples();
    const hospitals = getDemoHospitals();
    const hospitalMap = /* @__PURE__ */ new Map();
    for (const h of hospitals) hospitalMap.set(h.id, h);
    const aggregated = /* @__PURE__ */ new Map();
    for (const sample of samples) {
      if (dateFrom) {
        const fromTs = new Date(dateFrom).getTime();
        if (sample.createdAt < fromTs) continue;
      }
      if (dateTo) {
        const toTs = new Date(dateTo).getTime() + 864e5;
        if (sample.createdAt > toTs) continue;
      }
      const hospital = hospitalMap.get(sample.hospitalId);
      const hospitalName = (hospital == null ? void 0 : hospital.name) ?? `Hospital ${sample.hospitalId}`;
      if (!aggregated.has(sample.hospitalId)) {
        aggregated.set(sample.hospitalId, {
          hospitalId: sample.hospitalId,
          hospitalName,
          totalSamples: 0,
          totalRevenue: 0,
          totalReceived: 0,
          pendingAmount: 0,
          discountGiven: 0,
          lastTransactionDate: null
        });
      }
      const row = aggregated.get(sample.hospitalId);
      row.totalSamples += 1;
      row.totalRevenue += sample.finalAmount;
      row.totalReceived += sample.amountReceived;
      row.pendingAmount += sample.pendingAmount;
      row.discountGiven += sample.discountAmount;
      if (!row.lastTransactionDate || sample.createdAt > row.lastTransactionDate) {
        row.lastTransactionDate = sample.createdAt;
      }
    }
    return Array.from(aggregated.values());
  }, [isDemoMode, dateFrom, dateTo]);
  const filteredData = reactExports.useMemo(() => {
    if (!searchHospital.trim()) return ledgerData;
    const q = searchHospital.toLowerCase();
    return ledgerData.filter(
      (row) => row.hospitalName.toLowerCase().includes(q)
    );
  }, [ledgerData, searchHospital]);
  const totalPages = Math.max(1, Math.ceil(filteredData.length / PAGE_SIZE));
  const paginatedData = filteredData.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-5 h-5 text-brand-start" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-gray-900", children: "Hospital Ledger" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "premium-card p-4 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            placeholder: "Search hospital...",
            value: searchHospital,
            onChange: (e) => {
              setSearchHospital(e.target.value);
              setPage(1);
            },
            className: "w-full pl-9 pr-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-start transition-colors"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "date",
          value: dateFrom,
          onChange: (e) => {
            setDateFrom(e.target.value);
            setPage(1);
          },
          className: "w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-start transition-colors",
          placeholder: "From date"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "date",
          value: dateTo,
          onChange: (e) => {
            setDateTo(e.target.value);
            setPage(1);
          },
          className: "w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-start transition-colors",
          placeholder: "To date"
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "premium-card overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-gray-50 border-b border-gray-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-gray-600", children: "Hospital" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-semibold text-gray-600", children: "Samples" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-semibold text-gray-600", children: "Revenue" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-semibold text-gray-600", children: "Received" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-semibold text-gray-600", children: "Pending" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-semibold text-gray-600", children: "Discount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-semibold text-gray-600", children: "Last Txn" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center px-4 py-3 font-semibold text-gray-600", children: "Action" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: paginatedData.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 8, className: "text-center py-12 text-gray-400", children: isDemoMode ? "No data found for the selected filters." : "Connect to live backend to view hospital ledger." }) }) : paginatedData.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "border-b border-gray-50 hover:bg-blue-50/40 transition-colors cursor-pointer",
            onClick: () => setSelectedHospital(row),
            onKeyDown: (e) => (e.key === "Enter" || e.key === " ") && setSelectedHospital(row),
            tabIndex: 0,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-gray-900", children: row.hospitalName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-400", children: row.hospitalId })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-medium text-gray-700", children: row.totalSamples }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-semibold text-gray-900", children: formatCurrency$3(row.totalRevenue) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-medium text-emerald-600", children: formatCurrency$3(row.totalReceived) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-medium text-amber-600", children: formatCurrency$3(row.pendingAmount) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-medium text-rose-500", children: formatCurrency$3(row.discountGiven) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right text-gray-500 text-xs", children: formatDate$1(row.lastTransactionDate) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: (e) => {
                    e.stopPropagation();
                    setSelectedHospital(row);
                  },
                  className: "inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors text-xs font-medium",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5" }),
                    "View"
                  ]
                }
              ) })
            ]
          },
          row.hospitalId
        )) })
      ] }) }),
      filteredData.length > PAGE_SIZE && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-gray-50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-gray-500", children: [
          "Showing ",
          (page - 1) * PAGE_SIZE + 1,
          "–",
          Math.min(page * PAGE_SIZE, filteredData.length),
          " of",
          " ",
          filteredData.length
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => handlePageChange(page - 1),
              disabled: page === 1,
              className: "p-1.5 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-100 transition-colors",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-gray-700", children: [
            page,
            " / ",
            totalPages
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => handlePageChange(page + 1),
              disabled: page === totalPages,
              className: "p-1.5 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-100 transition-colors",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
            }
          )
        ] })
      ] })
    ] }),
    selectedHospital && /* @__PURE__ */ jsxRuntimeExports.jsx(
      HospitalDetailedLedgerModal,
      {
        hospital: selectedHospital,
        isDemoMode,
        onClose: () => setSelectedHospital(null)
      }
    )
  ] });
}
const DEPOSIT_STATUS_KEY = "xpertlab_phlebo_deposit_status";
function loadDepositStatuses() {
  try {
    const raw = localStorage.getItem(DEPOSIT_STATUS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
function saveDepositStatus(phlebotomistId, depositStatus) {
  const map = loadDepositStatuses();
  map[phlebotomistId] = {
    depositStatus,
    updatedBy: "Super Admin",
    updatedAt: Date.now()
  };
  localStorage.setItem(DEPOSIT_STATUS_KEY, JSON.stringify(map));
}
function formatCurrency$2(amount) {
  return `₹${amount.toLocaleString("en-IN")}`;
}
const DEMO_PHLEBO_NAME = "Ravi Kumar";
function getPhlebotomistName(id) {
  if (id === DEMO_PHLEBO_ID) return DEMO_PHLEBO_NAME;
  return `Phlebotomist ${id.slice(-4)}`;
}
const DEPOSIT_STATUS_LABELS = {
  not_submitted: "Not Submitted",
  partially_submitted: "Partially Submitted",
  submitted: "Submitted"
};
const DEPOSIT_STATUS_STYLES = {
  not_submitted: "bg-red-100 text-red-700 border border-red-200",
  partially_submitted: "bg-amber-100 text-amber-700 border border-amber-200",
  submitted: "bg-green-100 text-green-700 border border-green-200"
};
function PhlebotomistCollectionsModule({
  isDemoMode = false
}) {
  const [dateFrom, setDateFrom] = reactExports.useState("");
  const [dateTo, setDateTo] = reactExports.useState("");
  const [selectedHospital, setSelectedHospital] = reactExports.useState("");
  const [depositStatuses, setDepositStatuses] = reactExports.useState(loadDepositStatuses);
  const hospitals = reactExports.useMemo(() => {
    if (!isDemoMode) return [];
    return getDemoHospitals();
  }, [isDemoMode]);
  const rows = reactExports.useMemo(() => {
    if (!isDemoMode) return [];
    const samples = getDemoSamples();
    const aggregated = /* @__PURE__ */ new Map();
    for (const sample of samples) {
      if (dateFrom) {
        const fromTs = new Date(dateFrom).getTime();
        if (sample.createdAt < fromTs) continue;
      }
      if (dateTo) {
        const toTs = new Date(dateTo).getTime() + 864e5;
        if (sample.createdAt > toTs) continue;
      }
      if (selectedHospital && sample.hospitalId !== selectedHospital) continue;
      const id = sample.phlebotomistId;
      if (!aggregated.has(id)) {
        aggregated.set(id, {
          phlebotomistId: id,
          phlebotomistName: getPhlebotomistName(id),
          samplesCollected: 0,
          totalAmountCollected: 0,
          cashCollected: 0,
          upiCollected: 0,
          creditGiven: 0,
          pendingBalance: 0
        });
      }
      const row = aggregated.get(id);
      row.samplesCollected += 1;
      row.totalAmountCollected += sample.finalAmount;
      row.pendingBalance += sample.pendingAmount;
      const mode = sample.paymentMode.toUpperCase();
      if (mode === "CASH") {
        row.cashCollected += sample.amountReceived;
      } else if (mode === "UPI" || mode === "ONLINE") {
        row.upiCollected += sample.amountReceived;
      } else if (mode === "CREDIT") {
        row.creditGiven += sample.finalAmount;
      }
    }
    return Array.from(aggregated.values()).map((row) => {
      const stored = depositStatuses[row.phlebotomistId];
      return {
        ...row,
        depositStatus: (stored == null ? void 0 : stored.depositStatus) ?? "not_submitted",
        updatedBy: stored == null ? void 0 : stored.updatedBy,
        updatedAt: stored == null ? void 0 : stored.updatedAt
      };
    });
  }, [isDemoMode, dateFrom, dateTo, selectedHospital, depositStatuses]);
  const handleDepositStatusChange = reactExports.useCallback(
    (phlebotomistId, status) => {
      saveDepositStatus(phlebotomistId, status);
      setDepositStatuses(loadDepositStatuses());
    },
    []
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5 text-brand-start" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-gray-900", children: "Phlebotomist Collections" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "premium-card p-4 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "phlebo-date-from",
            className: "block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1",
            children: "From Date"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: "phlebo-date-from",
            type: "date",
            value: dateFrom,
            onChange: (e) => setDateFrom(e.target.value),
            className: "w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-start transition-colors"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "phlebo-date-to",
            className: "block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1",
            children: "To Date"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: "phlebo-date-to",
            type: "date",
            value: dateTo,
            onChange: (e) => setDateTo(e.target.value),
            className: "w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-start transition-colors"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "phlebo-hospital-filter",
            className: "block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1",
            children: "Hospital"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            id: "phlebo-hospital-filter",
            value: selectedHospital,
            onChange: (e) => setSelectedHospital(e.target.value),
            className: "w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-start transition-colors bg-white",
            "data-ocid": "collections.hospital.select",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All Hospitals" }),
              hospitals.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: h.id, children: h.name }, h.id))
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "premium-card overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-gray-50 border-b border-gray-100", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-gray-600", children: "Phlebotomist" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-semibold text-gray-600", children: "Samples" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-semibold text-gray-600", children: "Total Collected" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-semibold text-gray-600", children: "Cash" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-semibold text-gray-600", children: "UPI" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-semibold text-gray-600", children: "Credit" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-semibold text-gray-600", children: "Pending" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center px-4 py-3 font-semibold text-gray-600", children: "Deposit Status" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: rows.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "td",
        {
          colSpan: 8,
          className: "text-center py-12 text-gray-400",
          "data-ocid": "collections.empty_state",
          children: isDemoMode ? "No phlebotomist data found for the selected filters." : "Connect to live backend to view phlebotomist collections."
        }
      ) }) : rows.map((row, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          "data-ocid": `collections.row.item.${idx + 1}`,
          className: "border-b border-gray-50 hover:bg-blue-50/40 transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-gray-900", children: row.phlebotomistName }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-gray-400 font-mono", children: [
                row.phlebotomistId.slice(0, 16),
                "..."
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-medium text-gray-700", children: row.samplesCollected }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-semibold text-gray-900", children: formatCurrency$2(row.totalAmountCollected) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right text-emerald-600", children: formatCurrency$2(row.cashCollected) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right text-blue-600", children: formatCurrency$2(row.upiCollected) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right text-orange-500", children: formatCurrency$2(row.creditGiven) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right text-amber-600 font-medium", children: formatCurrency$2(row.pendingBalance) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1.5 min-w-[160px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${DEPOSIT_STATUS_STYLES[row.depositStatus]}`,
                  children: DEPOSIT_STATUS_LABELS[row.depositStatus]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  value: row.depositStatus,
                  onChange: (e) => handleDepositStatusChange(
                    row.phlebotomistId,
                    e.target.value
                  ),
                  className: "text-xs px-2 py-1 border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-blue-400 w-full",
                  "data-ocid": `collections.deposit_status.select.${idx + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "not_submitted", children: "Not Submitted" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "partially_submitted", children: "Partially Submitted" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "submitted", children: "Submitted" })
                  ]
                }
              ),
              row.updatedAt && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-gray-400 text-center", children: [
                "Updated by ",
                row.updatedBy,
                " at",
                " ",
                new Date(row.updatedAt).toLocaleTimeString(
                  "en-IN",
                  {
                    hour: "2-digit",
                    minute: "2-digit"
                  }
                )
              ] })
            ] }) })
          ]
        },
        row.phlebotomistId
      )) })
    ] }) }) })
  ] });
}
function formatCurrency$1(amount) {
  return `₹${amount.toLocaleString("en-IN")}`;
}
function formatDate(ts) {
  return new Date(ts).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function SettlementHistoryPanel({
  hospitalId,
  hospitalName,
  isDemoMode = false,
  refreshKey: _refreshKey = 0
}) {
  const liveHistory = useGetSettlementHistory(isDemoMode ? null : hospitalId);
  const settlements = reactExports.useMemo(() => {
    if (isDemoMode) {
      try {
        return getDemoSettlements().filter((s) => s.hospitalId === hospitalId);
      } catch {
        return [];
      }
    }
    return (liveHistory.data ?? []).map((s) => ({
      id: s.timestamp.toString(),
      hospitalId: s.hospitalId,
      amount: Number(s.amount),
      settlementType: s.settlementType === "Settled" ? "Settled" : "Partial",
      timestamp: Number(s.timestamp) / 1e6,
      // nanoseconds to ms
      notes: s.notes
    }));
  }, [isDemoMode, hospitalId, liveHistory.data]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "premium-card overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 border-b border-gray-100 bg-gray-50 flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "w-4 h-4 text-gray-500" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-gray-700", children: [
        "Settlement History — ",
        hospitalName
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-xs text-gray-400", children: [
        settlements.length,
        " records"
      ] })
    ] }),
    settlements.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-10 text-center text-gray-400 text-sm", children: "No settlement records found for this hospital." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-100", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-gray-600", children: "Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-semibold text-gray-600", children: "Amount" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center px-4 py-3 font-semibold text-gray-600", children: "Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-gray-600", children: "Notes" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: settlements.slice().sort((a, b) => b.timestamp - a.timestamp).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: "border-b border-gray-50 hover:bg-gray-50/60 transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-gray-600 text-xs whitespace-nowrap", children: formatDate(s.timestamp) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-semibold text-gray-900", children: formatCurrency$1(s.amount) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: s.settlementType === "Settled" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3" }),
              "Settled"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
              "Partial"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-gray-500 text-xs", children: s.notes ?? "—" })
          ]
        },
        s.id
      )) })
    ] }) })
  ] });
}
function formatCurrency(amount) {
  return `₹${amount.toLocaleString("en-IN")}`;
}
function SettlementMarkingModule({
  isDemoMode = false
}) {
  var _a;
  const [selectedHospitalId, setSelectedHospitalId] = reactExports.useState("");
  const [showModal, setShowModal] = reactExports.useState(false);
  const [settlementType, setSettlementType] = reactExports.useState(
    "Settled"
  );
  const [amount, setAmount] = reactExports.useState("");
  const [notes, setNotes] = reactExports.useState("");
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const [successMsg, setSuccessMsg] = reactExports.useState("");
  const [errorMsg, setErrorMsg] = reactExports.useState("");
  const [refreshKey, setRefreshKey] = reactExports.useState(0);
  const markSettlementMutation = useMarkSettlement();
  const hospitalBalances = reactExports.useMemo(() => {
    if (!isDemoMode) return [];
    const hospitals = getDemoHospitals();
    const samples = getDemoSamples();
    return hospitals.map((h) => {
      const hospitalSamples = samples.filter((s) => s.hospitalId === h.id);
      const totalRevenue = hospitalSamples.reduce(
        (sum, s) => sum + s.finalAmount,
        0
      );
      const totalReceived = hospitalSamples.reduce(
        (sum, s) => sum + s.amountReceived,
        0
      );
      const pendingAmount = hospitalSamples.reduce(
        (sum, s) => sum + s.pendingAmount,
        0
      );
      return {
        hospitalId: h.id,
        hospitalName: h.name,
        totalRevenue,
        totalReceived,
        pendingAmount
      };
    });
  }, [isDemoMode, refreshKey]);
  const selectedBalance = hospitalBalances.find(
    (h) => h.hospitalId === selectedHospitalId
  );
  const handleOpenModal = (hospitalId) => {
    setSelectedHospitalId(hospitalId);
    setAmount("");
    setNotes("");
    setSettlementType("Settled");
    setErrorMsg("");
    setShowModal(true);
  };
  const handleSubmit = async () => {
    if (!selectedHospitalId) return;
    const amountNum = Number.parseFloat(amount);
    if (Number.isNaN(amountNum) || amountNum <= 0) {
      setErrorMsg("Please enter a valid amount.");
      return;
    }
    setIsSubmitting(true);
    setErrorMsg("");
    try {
      if (isDemoMode) {
        const settlement = {
          id: `settlement-${Date.now()}`,
          hospitalId: selectedHospitalId,
          amount: amountNum,
          settlementType,
          timestamp: Date.now(),
          notes: notes.trim() || void 0
        };
        saveDemoSettlement(settlement);
        setRefreshKey((k) => k + 1);
        setSuccessMsg(
          `Settlement of ${formatCurrency(amountNum)} marked as ${settlementType}.`
        );
        setShowModal(false);
        setTimeout(() => setSuccessMsg(""), 4e3);
      } else {
        await markSettlementMutation.mutateAsync({
          hospitalId: selectedHospitalId,
          amount: BigInt(Math.round(amountNum)),
          settlementType: settlementType === "Settled" ? Variant_Partial_Settled.Settled : Variant_Partial_Settled.Partial_,
          notes: notes.trim() || null
        });
        setSuccessMsg("Settlement marked successfully.");
        setShowModal(false);
        setTimeout(() => setSuccessMsg(""), 4e3);
      }
    } catch (_e) {
      setErrorMsg("Failed to mark settlement. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-5 h-5 text-brand-start" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-gray-900", children: "Settlement Marking System" })
    ] }),
    successMsg && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-700 flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 flex-shrink-0" }),
      successMsg
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "premium-card overflow-hidden mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-3 border-b border-gray-100 bg-gray-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-gray-700", children: "Hospital Outstanding Balances" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-gray-600", children: "Hospital" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-semibold text-gray-600", children: "Total Revenue" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-semibold text-gray-600", children: "Received" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-semibold text-gray-600", children: "Pending" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center px-4 py-3 font-semibold text-gray-600", children: "Action" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: hospitalBalances.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 5, className: "text-center py-12 text-gray-400", children: isDemoMode ? "No hospital data available." : "Connect to live backend to view balances." }) }) : hospitalBalances.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: `border-b border-gray-50 hover:bg-blue-50/40 transition-colors cursor-pointer ${selectedHospitalId === h.hospitalId ? "bg-blue-50" : ""}`,
            onClick: () => setSelectedHospitalId(h.hospitalId),
            onKeyDown: (e) => (e.key === "Enter" || e.key === " ") && setSelectedHospitalId(h.hospitalId),
            tabIndex: 0,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-gray-900", children: h.hospitalName }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-semibold text-gray-900", children: formatCurrency(h.totalRevenue) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right text-emerald-600", children: formatCurrency(h.totalReceived) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right text-amber-600 font-medium", children: formatCurrency(h.pendingAmount) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: (e) => {
                    e.stopPropagation();
                    handleOpenModal(h.hospitalId);
                  },
                  className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-brand-start to-brand-end hover:opacity-90 transition-opacity shadow-sm",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" }),
                    "Mark Settlement"
                  ]
                }
              ) })
            ]
          },
          h.hospitalId
        )) })
      ] }) })
    ] }),
    selectedHospitalId && /* @__PURE__ */ jsxRuntimeExports.jsx(
      SettlementHistoryPanel,
      {
        hospitalId: selectedHospitalId,
        hospitalName: ((_a = hospitalBalances.find((h) => h.hospitalId === selectedHospitalId)) == null ? void 0 : _a.hospitalName) ?? "",
        isDemoMode,
        refreshKey
      }
    ),
    showModal && selectedBalance && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute inset-0 bg-black/50 backdrop-blur-sm",
          onClick: () => setShowModal(false),
          onKeyDown: (e) => e.key === "Escape" && setShowModal(false),
          "aria-hidden": "true"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-gradient-to-br from-brand-start to-brand-end flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-bold text-gray-900", children: "Mark Settlement" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: selectedBalance.hospitalName })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-50 border border-amber-100 rounded-xl p-3 mb-4 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-amber-700 font-medium", children: [
            "Pending Balance:",
            " "
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-amber-800 font-bold", children: formatCurrency(selectedBalance.pendingAmount) })
        ] }),
        errorMsg && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600", children: errorMsg }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "settlement-type",
              className: "block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2",
              children: "Settlement Type"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: ["Settled", "Partial"].map((type) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setSettlementType(type),
              className: `py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${settlementType === type ? type === "Settled" ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-amber-500 bg-amber-50 text-amber-700" : "border-gray-200 text-gray-500 hover:border-gray-300"}`,
              children: type === "Settled" ? "✓ Fully Settled" : "◑ Partially Settled"
            },
            type
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "settlement-amount",
              className: "block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1",
              children: "Amount (₹)"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "settlement-amount",
              type: "number",
              value: amount,
              onChange: (e) => setAmount(e.target.value),
              placeholder: "Enter amount",
              className: "w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-start transition-colors"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "settlement-notes",
              className: "block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1",
              children: "Notes (optional)"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              id: "settlement-notes",
              value: notes,
              onChange: (e) => setNotes(e.target.value),
              placeholder: "Add notes about this settlement...",
              rows: 2,
              className: "w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-start transition-colors resize-none"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 justify-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setShowModal(false),
              disabled: isSubmitting,
              className: "px-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: handleSubmit,
              disabled: isSubmitting,
              className: "px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-start to-brand-end hover:opacity-90 transition-opacity shadow-sm disabled:opacity-50 flex items-center gap-2",
              children: [
                isSubmitting && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                "Confirm Settlement"
              ]
            }
          )
        ] })
      ] })
    ] })
  ] });
}
function RevenueSettlementsPage({
  onNavigate: _onNavigate,
  isDemoMode = false
}) {
  const [activeTab, setActiveTab] = reactExports.useState("overview");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gray-50 pb-[90px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeroHeader,
      {
        title: "💰 Revenue & Settlements",
        description: "Track collections, hospital ledgers, and settlements"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white border-b border-gray-100 px-4 py-5 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-gradient-to-br from-brand-start to-brand-end flex items-center justify-center shadow-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Banknote, { className: "w-5 h-5 text-white" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-gray-900", children: "Revenue & Settlements" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-500", children: [
          "Financial overview, ledger management, and settlement tracking",
          isDemoMode && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700", children: "Demo Mode" })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "grid grid-cols-2 md:grid-cols-4 w-full mb-6 bg-white border border-gray-200 rounded-xl p-1 shadow-sm h-auto gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "overview",
            className: "flex items-center gap-2 rounded-lg py-2.5 text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-start data-[state=active]:to-brand-end data-[state=active]:text-white",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Daily Overview" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sm:hidden", children: "Overview" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "ledger",
            className: "flex items-center gap-2 rounded-lg py-2.5 text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-start data-[state=active]:to-brand-end data-[state=active]:text-white",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Hospital Ledger" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sm:hidden", children: "Ledger" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "phlebotomist",
            className: "flex items-center gap-2 rounded-lg py-2.5 text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-start data-[state=active]:to-brand-end data-[state=active]:text-white",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Phlebotomist" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sm:hidden", children: "Phlebo" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "settlements",
            className: "flex items-center gap-2 rounded-lg py-2.5 text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-start data-[state=active]:to-brand-end data-[state=active]:text-white",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Settlements" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sm:hidden", children: "Settle" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "overview", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DailyRevenueOverviewModule, { isDemoMode }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "ledger", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HospitalLedgerModule, { isDemoMode }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "phlebotomist", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PhlebotomistCollectionsModule, { isDemoMode }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "settlements", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SettlementMarkingModule, { isDemoMode }) })
    ] }) })
  ] });
}
export {
  RevenueSettlementsPage as default
};
