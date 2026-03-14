import { r as reactExports, j as jsxRuntimeExports } from "./index-77iKE7z5.js";
import { d as createLucideIcon, m as useHospitals, e as useGetAllTests, H as HealthcareBg, F as FlaskConical, b as FileText } from "./ProfileSetupModal-BB_monh5.js";
import { P as PageHeroHeader } from "./PageHeroHeader-DMNNWZUS.js";
import { c as getDemoSamples } from "./demoData-wn8GRowF.js";
import { c as formatCurrency } from "./formatters-DgcbtmQq.js";
import { L as LayoutDashboard, b as TrendingUp, T as TestTube } from "./StaffApp-BNhKtWAK.js";
import { I as IndianRupee } from "./indian-rupee-BzLOa6t8.js";
import { B as Building2 } from "./building-2-63YCEJlt.js";
import { U as Users } from "./users-rtMoCxo9.js";
import { C as CircleAlert } from "./circle-alert-TSpHor6V.js";
import { M as Microscope } from "./microscope-BLReGr-F.js";
import { A as Activity } from "./activity-C1inOyT9.js";
import { g as generateCategoricalChart, B as Bar, X as XAxis, Y as YAxis, f as formatAxisMap, R as ResponsiveContainer, L as LineChart, C as CartesianGrid, T as Tooltip, a as Line } from "./LineChart-WALzetUU.js";
import { C as ChevronLeft } from "./chevron-left-zLC_5pvl.js";
import { C as ChevronRight } from "./chevron-right-CLMqCVcQ.js";
import { C as Clock } from "./clock-BEcvoIYA.js";
import { T as TriangleAlert } from "./triangle-alert-BL3rmyJL.js";
import "./plus-B03gg-WC.js";
import "./user-EeFrjssy.js";
import "./map-pin-BZNwjx3t.js";
import "./search-Bq-Fk22W.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "m9 15 2 2 4-4", key: "1grp1n" }]
];
const FileCheck = createLucideIcon("file-check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",
      key: "18etb6"
    }
  ],
  ["path", { d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4", key: "xoc0q4" }]
];
const Wallet = createLucideIcon("wallet", __iconNode);
var BarChart = generateCategoricalChart({
  chartName: "BarChart",
  GraphicalChild: Bar,
  defaultTooltipEventType: "axis",
  validateTooltipEventTypes: ["axis", "item"],
  axisComponents: [{
    axisType: "xAxis",
    AxisComp: XAxis
  }, {
    axisType: "yAxis",
    AxisComp: YAxis
  }],
  formatAxisMap
});
function getRelativeTime(timestamp) {
  const diff = Date.now() - timestamp;
  const mins = Math.floor(diff / 6e4);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}
function generateDemoDashboardData() {
  const now = Date.now();
  const dayMs = 24 * 60 * 60 * 1e3;
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const revenueChart = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now - (6 - i) * dayMs);
    return {
      day: dayNames[d.getDay()],
      revenue: 3200 + Math.round(Math.sin(i * 0.9) * 1200 + i * 400)
    };
  });
  const sampleCounts = [12, 18, 14, 22, 16, 20, 18];
  const samplesChart = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now - (6 - i) * dayMs);
    return { day: dayNames[d.getDay()], samples: sampleCounts[i] };
  });
  return {
    revenueTodayAmount: 4850,
    revenueMonthAmount: 112400,
    samplesToday: 18,
    activeHospitals: 6,
    activePhlebotomists: 4,
    pendingReports: 3,
    collectionsTodayAmount: 3240,
    pendingPayments: 8750,
    samplesInProcessing: 12,
    revenueChart,
    samplesChart,
    hospitalPerformance: [
      {
        id: "1",
        name: "City General Hospital",
        totalSamples: 142,
        revenue: 38500,
        isActive: true
      },
      {
        id: "2",
        name: "Apollo Diagnostics",
        totalSamples: 98,
        revenue: 27200,
        isActive: true
      },
      {
        id: "3",
        name: "Sunrise Medical Centre",
        totalSamples: 76,
        revenue: 19800,
        isActive: true
      },
      {
        id: "4",
        name: "Metro Health Clinic",
        totalSamples: 54,
        revenue: 14600,
        isActive: true
      },
      {
        id: "5",
        name: "Green Valley Hospital",
        totalSamples: 31,
        revenue: 8900,
        isActive: false
      },
      {
        id: "6",
        name: "Lifeline Diagnostics",
        totalSamples: 22,
        revenue: 6200,
        isActive: true
      }
    ],
    recentActivity: [
      {
        id: "1",
        action: "Report delivered to Priya Sharma",
        actionType: "report_delivered",
        user: "Lab Admin",
        timestamp: now - 5 * 60 * 1e3
      },
      {
        id: "2",
        action: "Sample created for Rajesh Kumar",
        actionType: "sample_created",
        user: "Phlebotomist A",
        timestamp: now - 18 * 60 * 1e3
      },
      {
        id: "3",
        action: "New test CBC added",
        actionType: "test_added",
        user: "Super Admin",
        timestamp: now - 45 * 60 * 1e3
      },
      {
        id: "4",
        action: "Hospital Apollo Diagnostics added",
        actionType: "hospital_added",
        user: "Super Admin",
        timestamp: now - 2 * 60 * 60 * 1e3
      },
      {
        id: "5",
        action: "Sample created for Anita Verma",
        actionType: "sample_created",
        user: "Phlebotomist B",
        timestamp: now - 3 * 60 * 60 * 1e3
      },
      {
        id: "6",
        action: "Report delivered to Suresh Patel",
        actionType: "report_delivered",
        user: "Lab Admin",
        timestamp: now - 4 * 60 * 60 * 1e3
      },
      {
        id: "7",
        action: "New test LFT added",
        actionType: "test_added",
        user: "Super Admin",
        timestamp: now - 5 * 60 * 60 * 1e3
      },
      {
        id: "8",
        action: "Sample created for Meena Gupta",
        actionType: "sample_created",
        user: "Phlebotomist A",
        timestamp: now - 6 * 60 * 60 * 1e3
      },
      {
        id: "9",
        action: "Hospital City General added",
        actionType: "hospital_added",
        user: "Super Admin",
        timestamp: now - 8 * 60 * 60 * 1e3
      },
      {
        id: "10",
        action: "Report delivered to Vikram Singh",
        actionType: "report_delivered",
        user: "Lab Admin",
        timestamp: now - 10 * 60 * 60 * 1e3
      }
    ]
  };
}
function SummaryCard({
  title,
  value,
  subtitle,
  icon,
  iconBg,
  iconColor
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-white flex items-start gap-4 transition-all duration-200",
      style: {
        borderRadius: "16px",
        padding: "18px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)"
      },
      onMouseEnter: (e) => {
        e.currentTarget.style.boxShadow = "0 12px 32px rgba(13,71,161,0.12)";
        e.currentTarget.style.transform = "translateY(-2px)";
      },
      onMouseLeave: (e) => {
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";
        e.currentTarget.style.transform = "";
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex-shrink-0 flex items-center justify-center",
            style: {
              width: "42px",
              height: "42px",
              borderRadius: "12px",
              background: iconBg
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: iconColor }, children: icon })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "font-semibold text-gray-500 uppercase tracking-wide mb-1",
              style: { fontSize: "11px" },
              children: title
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-gray-900 leading-tight", children: value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 mt-0.5", style: { fontSize: "12px" }, children: subtitle })
        ] })
      ]
    }
  );
}
function ActivityIcon({ type }) {
  const configs = {
    test_added: {
      bg: "#EFF6FF",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TestTube, { className: "w-4 h-4 text-blue-600" })
    },
    hospital_added: {
      bg: "#F5F3FF",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-4 h-4 text-purple-600" })
    },
    sample_created: {
      bg: "#F0FDFA",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { className: "w-4 h-4 text-teal-600" })
    },
    report_delivered: {
      bg: "#F0FDF4",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileCheck, { className: "w-4 h-4 text-green-600" })
    }
  };
  const { bg, icon } = configs[type];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "flex items-center justify-center flex-shrink-0",
      style: {
        width: "34px",
        height: "34px",
        borderRadius: "10px",
        background: bg
      },
      children: icon
    }
  );
}
function RevenueTooltip({
  active,
  payload,
  label
}) {
  if (active && payload && payload.length) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-white border border-gray-100 rounded-xl px-4 py-3",
        style: { boxShadow: "0 8px 24px rgba(0,0,0,0.12)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-gray-400 mb-1", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-bold text-gray-900", children: formatCurrency(payload[0].value) })
        ]
      }
    );
  }
  return null;
}
function SamplesTooltip({
  active,
  payload,
  label
}) {
  if (active && payload && payload.length) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-white border border-gray-100 rounded-xl px-4 py-3",
        style: { boxShadow: "0 8px 24px rgba(0,0,0,0.12)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-gray-400 mb-1", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-base font-bold text-gray-900", children: [
            payload[0].value,
            " samples"
          ] })
        ]
      }
    );
  }
  return null;
}
const DEPOSIT_STATUS_KEY = "xpertlab_phlebo_deposit_status";
function getUnsubmittedCount(isDemoMode) {
  try {
    const samples = isDemoMode ? getDemoSamples() : [];
    const phlebotomistIds = new Set(samples.map((s) => s.phlebotomistId));
    if (phlebotomistIds.size === 0) {
      phlebotomistIds.add("demo-phleb-1");
      phlebotomistIds.add("demo-phleb-2");
    }
    const raw = localStorage.getItem(DEPOSIT_STATUS_KEY);
    const statusMap = raw ? JSON.parse(raw) : {};
    let count = 0;
    for (const id of phlebotomistIds) {
      const entry = statusMap[id];
      if (!entry || entry.depositStatus !== "submitted") count++;
    }
    return count;
  } catch {
    return 0;
  }
}
function SettlementAlert({
  isDemoMode,
  onNavigate
}) {
  const unsubmittedCount = reactExports.useMemo(
    () => getUnsubmittedCount(isDemoMode),
    [isDemoMode]
  );
  if (unsubmittedCount === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      className: "w-full bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center gap-3 cursor-pointer hover:bg-amber-100 transition-colors text-left",
      onClick: () => onNavigate == null ? void 0 : onNavigate("revenue-settlements"),
      "data-ocid": "dashboard.settlement.card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-6 h-6 text-amber-600 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-amber-800", children: [
            unsubmittedCount,
            " phlebotomist",
            unsubmittedCount !== 1 ? "s" : "",
            " ",
            "have not submitted today's collections"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-amber-600", children: "Click to view Phlebotomist Collections" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5 text-amber-600 shrink-0" })
      ]
    }
  );
}
const ROWS_PER_PAGE = 5;
function SuperAdminDashboardPage({
  isDemoMode = false,
  onNavigate
}) {
  const [hospitalPage, setHospitalPage] = reactExports.useState(0);
  const [chartTab, setChartTab] = reactExports.useState("revenue");
  const { data: hospitals = [] } = useHospitals();
  const { data: allTests = [] } = useGetAllTests();
  const demoData = reactExports.useMemo(() => generateDemoDashboardData(), []);
  const metrics = reactExports.useMemo(() => {
    if (isDemoMode) {
      return {
        revenueToday: demoData.revenueTodayAmount,
        revenueMonth: demoData.revenueMonthAmount,
        samplesToday: demoData.samplesToday,
        activeHospitals: demoData.activeHospitals,
        activePhlebotomists: demoData.activePhlebotomists,
        pendingReports: demoData.pendingReports,
        collectionsToday: demoData.collectionsTodayAmount,
        pendingPayments: demoData.pendingPayments,
        samplesInProcessing: demoData.samplesInProcessing
      };
    }
    const activeHospitals = hospitals.filter(
      (h) => h.isActive
    ).length;
    return {
      revenueToday: 0,
      revenueMonth: 0,
      samplesToday: 0,
      activeHospitals,
      activePhlebotomists: 0,
      pendingReports: 0,
      collectionsToday: 0,
      pendingPayments: 0,
      samplesInProcessing: 0
    };
  }, [isDemoMode, demoData, hospitals]);
  const revenueChartData = reactExports.useMemo(() => {
    if (isDemoMode) return demoData.revenueChart;
    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1e3;
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(now - (6 - i) * dayMs);
      return { day: dayNames[d.getDay()], revenue: 0 };
    });
  }, [isDemoMode, demoData]);
  const samplesChartData = reactExports.useMemo(() => {
    if (isDemoMode) return demoData.samplesChart;
    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1e3;
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(now - (6 - i) * dayMs);
      return { day: dayNames[d.getDay()], samples: 0 };
    });
  }, [isDemoMode, demoData]);
  const hasRevenueData = revenueChartData.some((d) => d.revenue > 0);
  const hasSamplesData = samplesChartData.some((d) => d.samples > 0);
  const hospitalPerformanceData = reactExports.useMemo(() => {
    if (isDemoMode) return demoData.hospitalPerformance;
    return hospitals.map(
      (h) => ({
        id: h.id,
        name: h.name,
        totalSamples: 0,
        revenue: 0,
        isActive: h.isActive
      })
    );
  }, [isDemoMode, demoData, hospitals]);
  const recentActivity = reactExports.useMemo(() => {
    if (isDemoMode) return demoData.recentActivity;
    return [];
  }, [isDemoMode, demoData]);
  const totalHospitalPages = Math.max(
    1,
    Math.ceil(hospitalPerformanceData.length / ROWS_PER_PAGE)
  );
  const paginatedHospitals = hospitalPerformanceData.slice(
    hospitalPage * ROWS_PER_PAGE,
    (hospitalPage + 1) * ROWS_PER_PAGE
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative min-h-screen pb-[90px] page-fade-in",
      style: { background: "#F7F9FC" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(HealthcareBg, { variant: "minimal", opacity: 0.035 }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            PageHeroHeader,
            {
              title: "📊 Dashboard",
              description: "Overview of platform performance and key metrics"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "px-4 py-5",
              style: {
                background: "linear-gradient(135deg, #0D47A1 0%, #26A69A 100%)",
                boxShadow: "0 4px 20px rgba(13,71,161,0.2)"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "flex items-center justify-center",
                    style: {
                      width: "42px",
                      height: "42px",
                      borderRadius: "12px",
                      background: "rgba(255,255,255,0.2)"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { className: "w-5 h-5 text-white" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h1",
                    {
                      className: "font-bold text-white",
                      style: { fontSize: "20px" },
                      children: "Dashboard"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70", style: { fontSize: "12px" }, children: "Super Admin Overview" })
                ] })
              ] }) })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 py-6 space-y-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SettlementAlert, { isDemoMode, onNavigate }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h2",
                {
                  className: "font-semibold text-gray-400 uppercase tracking-wider mb-4",
                  style: { fontSize: "12px" },
                  children: "Key Metrics"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SummaryCard,
                  {
                    title: "Revenue Today",
                    value: formatCurrency(metrics.revenueToday),
                    subtitle: "Collected today",
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "w-5 h-5" }),
                    iconBg: "#EFF6FF",
                    iconColor: "#1D4ED8"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SummaryCard,
                  {
                    title: "Revenue This Month",
                    value: formatCurrency(metrics.revenueMonth),
                    subtitle: "Current month total",
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-5 h-5" }),
                    iconBg: "#EEF2FF",
                    iconColor: "#4338CA"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SummaryCard,
                  {
                    title: "Samples Today",
                    value: String(metrics.samplesToday),
                    subtitle: "Collected today",
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { className: "w-5 h-5" }),
                    iconBg: "#F0FDFA",
                    iconColor: "#0D9488"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SummaryCard,
                  {
                    title: "Active Hospitals",
                    value: String(metrics.activeHospitals),
                    subtitle: "Currently active",
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-5 h-5" }),
                    iconBg: "#F5F3FF",
                    iconColor: "#7C3AED"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SummaryCard,
                  {
                    title: "Active Phlebotomists",
                    value: String(metrics.activePhlebotomists),
                    subtitle: "On shift today",
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5" }),
                    iconBg: "#FFF7ED",
                    iconColor: "#EA580C"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SummaryCard,
                  {
                    title: "Pending Reports",
                    value: String(metrics.pendingReports),
                    subtitle: "Awaiting delivery",
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-5 h-5" }),
                    iconBg: "#FEF2F2",
                    iconColor: "#DC2626"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SummaryCard,
                  {
                    title: "Collections Today",
                    value: formatCurrency(metrics.collectionsToday),
                    subtitle: "Cash + UPI today",
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-5 h-5" }),
                    iconBg: "#F0FDF4",
                    iconColor: "#16A34A"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SummaryCard,
                  {
                    title: "Pending Payments",
                    value: formatCurrency(metrics.pendingPayments),
                    subtitle: "Outstanding balance",
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-5 h-5" }),
                    iconBg: "#FEF3C7",
                    iconColor: "#D97706"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SummaryCard,
                  {
                    title: "Samples in Processing",
                    value: String(metrics.samplesInProcessing),
                    subtitle: "Currently in lab",
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Microscope, { className: "w-5 h-5" }),
                    iconBg: "#EFF6FF",
                    iconColor: "#2563EB"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("section", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "bg-white p-5",
                style: {
                  borderRadius: "16px",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "flex items-center justify-center",
                          style: {
                            width: "34px",
                            height: "34px",
                            borderRadius: "10px",
                            background: "rgba(13,71,161,0.08)"
                          },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-4 h-4 text-primary" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "h2",
                        {
                          className: "font-semibold text-gray-900",
                          style: { fontSize: "16px" },
                          children: chartTab === "revenue" ? "Revenue Last 7 Days" : "Daily Sample Count"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex items-center gap-1 p-1 rounded-xl",
                        style: { background: "#F7F9FC", border: "1px solid #E5E7EB" },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "button",
                            {
                              type: "button",
                              "data-ocid": "dashboard.chart.revenue_tab",
                              onClick: () => setChartTab("revenue"),
                              className: "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                              style: {
                                background: chartTab === "revenue" ? "linear-gradient(135deg, #0D47A1, #1976D2)" : "transparent",
                                color: chartTab === "revenue" ? "#fff" : "#9CA3AF",
                                boxShadow: chartTab === "revenue" ? "0 2px 6px rgba(13,71,161,0.25)" : "none"
                              },
                              children: "Revenue"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "button",
                            {
                              type: "button",
                              "data-ocid": "dashboard.chart.samples_tab",
                              onClick: () => setChartTab("samples"),
                              className: "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                              style: {
                                background: chartTab === "samples" ? "linear-gradient(135deg, #0D47A1, #1976D2)" : "transparent",
                                color: chartTab === "samples" ? "#fff" : "#9CA3AF",
                                boxShadow: chartTab === "samples" ? "0 2px 6px rgba(13,71,161,0.25)" : "none"
                              },
                              children: "Samples"
                            }
                          )
                        ]
                      }
                    )
                  ] }),
                  chartTab === "revenue" ? hasRevenueData ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-56", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    LineChart,
                    {
                      data: revenueChartData,
                      margin: { top: 4, right: 8, left: 0, bottom: 0 },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "linearGradient",
                          {
                            id: "revenueGradient",
                            x1: "0",
                            y1: "0",
                            x2: "1",
                            y2: "0",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#0D47A1" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#26A69A" })
                            ]
                          }
                        ) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          CartesianGrid,
                          {
                            strokeDasharray: "3 3",
                            stroke: "#f0f0f0",
                            vertical: false
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          XAxis,
                          {
                            dataKey: "day",
                            tick: {
                              fontSize: 11,
                              fill: "#9CA3AF",
                              fontFamily: "'Plus Jakarta Sans', sans-serif"
                            },
                            axisLine: false,
                            tickLine: false
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          YAxis,
                          {
                            tick: {
                              fontSize: 11,
                              fill: "#9CA3AF",
                              fontFamily: "'Plus Jakarta Sans', sans-serif"
                            },
                            axisLine: false,
                            tickLine: false,
                            tickFormatter: (v) => `₹${(v / 1e3).toFixed(0)}k`,
                            width: 42
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { content: /* @__PURE__ */ jsxRuntimeExports.jsx(RevenueTooltip, {}) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Line,
                          {
                            type: "monotone",
                            dataKey: "revenue",
                            stroke: "url(#revenueGradient)",
                            strokeWidth: 3,
                            dot: { fill: "#0D47A1", strokeWidth: 2, r: 4 },
                            activeDot: {
                              r: 6,
                              fill: "#26A69A",
                              strokeWidth: 2,
                              stroke: "#fff"
                            }
                          }
                        )
                      ]
                    }
                  ) }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-56 flex flex-col items-center justify-center text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-10 h-10 text-gray-200 mb-3" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400", children: "No revenue data available." })
                  ] }) : hasSamplesData ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-56", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    BarChart,
                    {
                      data: samplesChartData,
                      margin: { top: 4, right: 8, left: 0, bottom: 0 },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "linearGradient",
                          {
                            id: "samplesGradient",
                            x1: "0",
                            y1: "0",
                            x2: "0",
                            y2: "1",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "stop",
                                {
                                  offset: "0%",
                                  stopColor: "#0D47A1",
                                  stopOpacity: 0.9
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "stop",
                                {
                                  offset: "100%",
                                  stopColor: "#26A69A",
                                  stopOpacity: 0.7
                                }
                              )
                            ]
                          }
                        ) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          CartesianGrid,
                          {
                            strokeDasharray: "3 3",
                            stroke: "#f0f0f0",
                            vertical: false
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          XAxis,
                          {
                            dataKey: "day",
                            tick: {
                              fontSize: 11,
                              fill: "#9CA3AF",
                              fontFamily: "'Plus Jakarta Sans', sans-serif"
                            },
                            axisLine: false,
                            tickLine: false
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          YAxis,
                          {
                            tick: {
                              fontSize: 11,
                              fill: "#9CA3AF",
                              fontFamily: "'Plus Jakarta Sans', sans-serif"
                            },
                            axisLine: false,
                            tickLine: false,
                            width: 32
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { content: /* @__PURE__ */ jsxRuntimeExports.jsx(SamplesTooltip, {}) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Bar,
                          {
                            dataKey: "samples",
                            fill: "url(#samplesGradient)",
                            radius: [6, 6, 0, 0]
                          }
                        )
                      ]
                    }
                  ) }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-56 flex flex-col items-center justify-center text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-10 h-10 text-gray-200 mb-3" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400", children: "No sample data available." })
                  ] })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("section", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "bg-white overflow-hidden",
                style: {
                  borderRadius: "16px",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 px-5 py-4 border-b border-gray-100", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "flex items-center justify-center",
                        style: {
                          width: "34px",
                          height: "34px",
                          borderRadius: "10px",
                          background: "rgba(124,58,237,0.08)"
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-4 h-4 text-purple-600" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "h2",
                      {
                        className: "font-semibold text-gray-900",
                        style: { fontSize: "16px" },
                        children: "Hospital Performance"
                      }
                    )
                  ] }),
                  hospitalPerformanceData.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-12 flex flex-col items-center justify-center text-center px-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-10 h-10 text-gray-200 mb-3" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400", children: "No hospitals available." })
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-gray-50 border-b border-gray-100", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide", children: "Hospital Name" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide", children: "Samples" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide", children: "Revenue" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide", children: "Status" })
                      ] }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: paginatedHospitals.map((h, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "tr",
                        {
                          className: `border-b border-gray-50 last:border-0 transition-colors hover:bg-gray-50/60 ${idx % 2 === 0 ? "" : "bg-gray-50/20"}`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "div",
                                {
                                  className: "flex items-center justify-center flex-shrink-0",
                                  style: {
                                    width: "30px",
                                    height: "30px",
                                    borderRadius: "8px",
                                    background: "#F5F3FF"
                                  },
                                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-3.5 h-3.5 text-purple-600" })
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-gray-800 text-sm", children: h.name })
                            ] }) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-gray-800", children: h.totalSamples }) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-gray-800", children: formatCurrency(h.revenue) }) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5 text-center", children: h.isActive ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-100", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-green-500 inline-block" }),
                              "Active"
                            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-500 border border-gray-200", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-gray-400 inline-block" }),
                              "Inactive"
                            ] }) })
                          ]
                        },
                        h.id
                      )) })
                    ] }) }),
                    totalHospitalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-3 border-t border-gray-100 bg-gray-50/50", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-400", children: [
                        "Showing ",
                        hospitalPage * ROWS_PER_PAGE + 1,
                        "–",
                        Math.min(
                          (hospitalPage + 1) * ROWS_PER_PAGE,
                          hospitalPerformanceData.length
                        ),
                        " ",
                        "of ",
                        hospitalPerformanceData.length
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            "data-ocid": "dashboard.hospital_table.pagination_prev",
                            onClick: () => setHospitalPage((p) => Math.max(0, p - 1)),
                            disabled: hospitalPage === 0,
                            className: "w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-white hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed transition-all",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" })
                          }
                        ),
                        Array.from(
                          { length: totalHospitalPages },
                          (_, i) => i
                        ).map((pageIdx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            onClick: () => setHospitalPage(pageIdx),
                            className: `w-8 h-8 rounded-lg text-xs font-semibold transition-all ${pageIdx === hospitalPage ? "text-white shadow-sm" : "text-gray-400 hover:bg-white hover:shadow-sm"}`,
                            style: pageIdx === hospitalPage ? {
                              background: "linear-gradient(135deg, #0D47A1, #1976D2)"
                            } : {},
                            children: pageIdx + 1
                          },
                          `hosp-page-btn-${pageIdx}`
                        )),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            "data-ocid": "dashboard.hospital_table.pagination_next",
                            onClick: () => setHospitalPage(
                              (p) => Math.min(totalHospitalPages - 1, p + 1)
                            ),
                            disabled: hospitalPage === totalHospitalPages - 1,
                            className: "w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-white hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed transition-all",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
                          }
                        )
                      ] })
                    ] })
                  ] })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("section", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "bg-white overflow-hidden",
                style: {
                  borderRadius: "16px",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 px-5 py-4 border-b border-gray-100", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "flex items-center justify-center",
                        style: {
                          width: "34px",
                          height: "34px",
                          borderRadius: "10px",
                          background: "rgba(13,71,161,0.08)"
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-primary" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "h2",
                      {
                        className: "font-semibold text-gray-900",
                        style: { fontSize: "16px" },
                        children: "Recent Activity"
                      }
                    )
                  ] }),
                  recentActivity.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-12 flex flex-col items-center justify-center text-center px-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-10 h-10 text-gray-200 mb-3" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400", children: "No recent activity." })
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-gray-50", children: recentActivity.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-start gap-3 px-5 py-3.5 hover:bg-gray-50/50 transition-colors",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ActivityIcon, { type: item.actionType }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-gray-800 leading-snug", children: item.action }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-0.5", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-400", children: item.user }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-300 text-xs", children: "·" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-400", children: getRelativeTime(item.timestamp) })
                          ] })
                        ] })
                      ]
                    },
                    item.id
                  )) })
                ]
              }
            ) })
          ] })
        ] })
      ]
    }
  );
}
export {
  SuperAdminDashboardPage as default
};
