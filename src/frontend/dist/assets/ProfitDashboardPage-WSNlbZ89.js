import { r as reactExports, j as jsxRuntimeExports } from "./index-D697BR3C.js";
import { p as getDemoTests, c as getDemoSamples, f as getDemoHospitals } from "./demoData-CZHON6-0.js";
import { c as formatCurrency } from "./formatters-DgcbtmQq.js";
import { g as getProfitStatusColor, c as computeProfitPerTest } from "./profitUtils-CU3rQSve.js";
import { b as TrendingUp, d as ChartColumn } from "./StaffApp-Bgr9nRQ5.js";
import { C as CircleAlert } from "./circle-alert-CCHbMBBN.js";
import { I as IndianRupee } from "./indian-rupee-BzAM3mAD.js";
import { d as createLucideIcon, F as FlaskConical } from "./ProfileSetupModal-DNPvAtBR.js";
import { R as ResponsiveContainer, L as LineChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, a as Line } from "./LineChart-D-iRYM7u.js";
import { B as Building2 } from "./building-2-BB1jEukF.js";
import { C as ChevronLeft } from "./chevron-left-DmfjEULv.js";
import { C as ChevronRight } from "./chevron-right-DkRj9Bd1.js";
import "./user-C7D6O3S1.js";
import "./clock-BGIpFsM8.js";
import "./map-pin-DEb5FcpZ.js";
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
      d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
      key: "1yiouv"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }]
];
const Award = createLucideIcon("award", __iconNode);
function generateDemoProfitData(filter) {
  const now = Date.now();
  const dayMs = 24 * 60 * 60 * 1e3;
  const allTests = [
    {
      testName: "CBC",
      testCode: "CBC001",
      mrp: 300,
      labCost: 40,
      doctorCommission: 150,
      totalTests: 80,
      profitPerTest: 110,
      totalProfit: 8800
    },
    {
      testName: "Blood Sugar Fasting",
      testCode: "BSF001",
      mrp: 150,
      labCost: 20,
      doctorCommission: 60,
      totalTests: 120,
      profitPerTest: 70,
      totalProfit: 8400
    },
    {
      testName: "Lipid Profile",
      testCode: "LP001",
      mrp: 600,
      labCost: 80,
      doctorCommission: 300,
      totalTests: 55,
      profitPerTest: 220,
      totalProfit: 12100
    },
    {
      testName: "Thyroid Profile",
      testCode: "TP001",
      mrp: 700,
      labCost: 90,
      doctorCommission: 350,
      totalTests: 42,
      profitPerTest: 260,
      totalProfit: 10920
    },
    {
      testName: "Vitamin D",
      testCode: "VD001",
      mrp: 1200,
      labCost: 500,
      doctorCommission: 682,
      totalTests: 30,
      profitPerTest: 18,
      totalProfit: 540
    },
    {
      testName: "Urine Routine",
      testCode: "UR001",
      mrp: 200,
      labCost: 30,
      doctorCommission: 100,
      totalTests: 95,
      profitPerTest: 70,
      totalProfit: 6650
    },
    {
      testName: "Liver Function Test",
      testCode: "LFT001",
      mrp: 800,
      labCost: 100,
      doctorCommission: 400,
      totalTests: 38,
      profitPerTest: 300,
      totalProfit: 11400
    },
    {
      testName: "Kidney Function Test",
      testCode: "KFT001",
      mrp: 750,
      labCost: 95,
      doctorCommission: 375,
      totalTests: 41,
      profitPerTest: 280,
      totalProfit: 11480
    },
    {
      testName: "HbA1c",
      testCode: "HBA001",
      mrp: 500,
      labCost: 70,
      doctorCommission: 250,
      totalTests: 62,
      profitPerTest: 180,
      totalProfit: 11160
    },
    {
      testName: "Dengue NS1",
      testCode: "DN001",
      mrp: 900,
      labCost: 150,
      doctorCommission: 450,
      totalTests: 25,
      profitPerTest: 300,
      totalProfit: 7500
    }
  ];
  const multiplier = filter === "today" ? 0.03 : filter === "week" ? 0.25 : 1;
  const filteredTests = allTests.map((t) => ({
    ...t,
    totalTests: Math.max(1, Math.round(t.totalTests * multiplier)),
    totalProfit: Math.round(t.totalProfit * multiplier)
  }));
  const totalProfit = filteredTests.reduce((sum, t) => sum + t.totalProfit, 0);
  const totalTests = filteredTests.reduce((sum, t) => sum + t.totalTests, 0);
  const byPerTest = [...allTests].sort(
    (a, b) => b.profitPerTest - a.profitPerTest
  );
  const mostProfitable = byPerTest[0];
  const leastProfitable = byPerTest[byPerTest.length - 1];
  const profitChart = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(now - (29 - i) * dayMs);
    const label = d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short"
    });
    const base = 800 + Math.round(Math.sin(i * 0.4) * 400 + i * 25);
    return { date: label, profit: base };
  });
  const hospitalProfits = [
    {
      id: "1",
      name: "City General Hospital",
      totalTests: Math.round(142 * multiplier),
      revenue: Math.round(38500 * multiplier),
      commission: Math.round(19250 * multiplier),
      profit: Math.round(13200 * multiplier)
    },
    {
      id: "2",
      name: "Apollo Diagnostics",
      totalTests: Math.round(98 * multiplier),
      revenue: Math.round(27200 * multiplier),
      commission: Math.round(13600 * multiplier),
      profit: Math.round(9200 * multiplier)
    },
    {
      id: "3",
      name: "Sunrise Medical Centre",
      totalTests: Math.round(76 * multiplier),
      revenue: Math.round(19800 * multiplier),
      commission: Math.round(9900 * multiplier),
      profit: Math.round(6800 * multiplier)
    },
    {
      id: "4",
      name: "Metro Health Clinic",
      totalTests: Math.round(54 * multiplier),
      revenue: Math.round(14600 * multiplier),
      commission: Math.round(7300 * multiplier),
      profit: Math.round(5100 * multiplier)
    },
    {
      id: "5",
      name: "Green Valley Hospital",
      totalTests: Math.round(31 * multiplier),
      revenue: Math.round(8900 * multiplier),
      commission: Math.round(4450 * multiplier),
      profit: Math.round(3100 * multiplier)
    }
  ];
  return {
    profitToday: filter === "today" ? 1980 : filter === "week" ? 14200 : totalProfit,
    profitMonth: filter === "month" || filter === "custom" ? totalProfit : Math.round(totalProfit * 0.8),
    avgProfitPerTest: totalTests > 0 ? Math.round(totalProfit / totalTests) : 0,
    mostProfitableTest: {
      name: mostProfitable.testName,
      profit: mostProfitable.profitPerTest
    },
    leastProfitableTest: {
      name: leastProfitable.testName,
      profit: leastProfitable.profitPerTest
    },
    totalProfit: 348500,
    profitChart,
    hospitalProfits,
    testProfits: filteredTests
  };
}
function computeRealProfitData(filter) {
  const now = Date.now();
  const dayMs = 24 * 60 * 60 * 1e3;
  const testMasters = getDemoTests();
  if (testMasters.length === 0) {
    return generateDemoProfitData(filter);
  }
  const masterMap = new Map(
    testMasters.map((t) => [t.testCode.toUpperCase(), t])
  );
  const filterStart = filter === "today" ? now - dayMs : filter === "week" ? now - 7 * dayMs : filter === "month" ? now - 30 * dayMs : 0;
  const allSamples = getDemoSamples();
  const filteredSamples = allSamples.filter((s) => s.createdAt >= filterStart);
  const todaySamples = allSamples.filter((s) => s.createdAt >= now - dayMs);
  const monthSamples = allSamples.filter(
    (s) => s.createdAt >= now - 30 * dayMs
  );
  function sampleTestProfit(testId, mrpFallback) {
    const master = masterMap.get(testId.toUpperCase());
    if (master) {
      const commissionAmt2 = master.mrp * (master.doctorCommissionPct / 100);
      return {
        profit: computeProfitPerTest(
          master.mrp,
          master.labCost,
          master.doctorCommissionPct
        ),
        commissionAmt: commissionAmt2,
        mrp: master.mrp
      };
    }
    const commissionAmt = mrpFallback * 0.5;
    return { profit: mrpFallback * 0.5, commissionAmt, mrp: mrpFallback };
  }
  function totalProfitFromSamples(samples) {
    return samples.reduce((sum, s) => {
      const sProfit = s.tests.reduce(
        (acc, t) => acc + sampleTestProfit(t.testId, t.price).profit,
        0
      );
      return sum + sProfit;
    }, 0);
  }
  const profitToday = totalProfitFromSamples(todaySamples);
  const profitMonth = totalProfitFromSamples(monthSamples);
  const filteredProfit = totalProfitFromSamples(filteredSamples);
  const totalProfit = totalProfitFromSamples(allSamples);
  const totalTestCount = filteredSamples.reduce(
    (sum, s) => sum + s.tests.length,
    0
  );
  const avgProfitPerTest = totalTestCount > 0 ? Math.round(filteredProfit / totalTestCount) : 0;
  const testProfitMap = /* @__PURE__ */ new Map();
  for (const master of testMasters) {
    const ppt = computeProfitPerTest(
      master.mrp,
      master.labCost,
      master.doctorCommissionPct
    );
    testProfitMap.set(master.testCode.toUpperCase(), {
      name: master.testName,
      profitPerTest: ppt
    });
  }
  const byProfit = Array.from(testProfitMap.values()).sort(
    (a, b) => b.profitPerTest - a.profitPerTest
  );
  const mostProfitableTest = byProfit.length > 0 ? {
    name: byProfit[0].name,
    profit: Math.round(byProfit[0].profitPerTest)
  } : { name: "N/A", profit: 0 };
  const leastProfitableTest = byProfit.length > 0 ? {
    name: byProfit[byProfit.length - 1].name,
    profit: Math.round(byProfit[byProfit.length - 1].profitPerTest)
  } : { name: "N/A", profit: 0 };
  const profitChart = Array.from({ length: 30 }, (_, i) => {
    const dayStart = now - (29 - i) * dayMs;
    const dayEnd = dayStart + dayMs;
    const label = new Date(dayStart).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short"
    });
    const dayProfit = allSamples.filter((s) => s.createdAt >= dayStart && s.createdAt < dayEnd).reduce(
      (sum, s) => sum + s.tests.reduce(
        (acc, t) => acc + sampleTestProfit(t.testId, t.price).profit,
        0
      ),
      0
    );
    return { date: label, profit: Math.max(0, dayProfit) };
  });
  const hospitals = getDemoHospitals();
  const hospitalMap = new Map(hospitals.map((h) => [h.id, h.name]));
  const hospitalAggMap = /* @__PURE__ */ new Map();
  for (const s of filteredSamples) {
    const hId = s.hospitalId;
    if (!hospitalAggMap.has(hId)) {
      hospitalAggMap.set(hId, {
        revenue: 0,
        commission: 0,
        profit: 0,
        tests: 0
      });
    }
    const agg = hospitalAggMap.get(hId);
    for (const t of s.tests) {
      const { profit, commissionAmt, mrp } = sampleTestProfit(
        t.testId,
        t.price
      );
      agg.revenue += mrp;
      agg.commission += commissionAmt;
      agg.profit += profit;
      agg.tests += 1;
    }
  }
  const hospitalProfits = Array.from(
    hospitalAggMap.entries()
  ).map(([id, agg]) => ({
    id,
    name: hospitalMap.get(id) ?? `Hospital ${id}`,
    totalTests: agg.tests,
    revenue: Math.round(agg.revenue),
    commission: Math.round(agg.commission),
    profit: Math.round(agg.profit)
  }));
  const finalHospitalProfits = hospitalProfits.length > 0 ? hospitalProfits : generateDemoProfitData(filter).hospitalProfits;
  const testAggMap = /* @__PURE__ */ new Map();
  for (const s of filteredSamples) {
    for (const t of s.tests) {
      const key = t.testId.toUpperCase();
      const master = masterMap.get(key);
      if (!testAggMap.has(key)) {
        const mrp = (master == null ? void 0 : master.mrp) ?? t.price;
        const labCost = (master == null ? void 0 : master.labCost) ?? 0;
        const commPct = (master == null ? void 0 : master.doctorCommissionPct) ?? 50;
        const ppt = computeProfitPerTest(mrp, labCost, commPct);
        testAggMap.set(key, {
          testName: (master == null ? void 0 : master.testName) ?? t.testName,
          testCode: (master == null ? void 0 : master.testCode) ?? t.testCode,
          mrp,
          labCost,
          doctorCommission: Math.round(mrp * (commPct / 100)),
          profitPerTest: ppt,
          count: 0,
          totalProfit: 0
        });
      }
      const agg = testAggMap.get(key);
      agg.count += 1;
      agg.totalProfit += agg.profitPerTest;
    }
  }
  let testProfits = Array.from(testAggMap.values()).map((a) => ({
    testName: a.testName,
    testCode: a.testCode,
    mrp: a.mrp,
    labCost: a.labCost,
    doctorCommission: a.doctorCommission,
    totalTests: a.count,
    profitPerTest: Math.round(a.profitPerTest),
    totalProfit: Math.round(a.totalProfit)
  }));
  if (testProfits.length === 0) {
    testProfits = generateDemoProfitData(filter).testProfits;
  }
  return {
    profitToday: Math.round(profitToday),
    profitMonth: Math.round(profitMonth),
    avgProfitPerTest,
    mostProfitableTest,
    leastProfitableTest,
    totalProfit: Math.round(totalProfit),
    profitChart,
    hospitalProfits: finalHospitalProfits,
    testProfits
  };
}
function ProfitCard({
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
      className: "premium-card p-5 flex items-start gap-4",
      "data-ocid": "profit_dashboard.card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center ${iconBg}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: iconColor, children: icon })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground leading-tight", children: value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: subtitle })
        ] })
      ]
    }
  );
}
function ProfitTooltip({
  active,
  payload,
  label
}) {
  if (active && payload && payload.length) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-border rounded-xl shadow-card px-4 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground mb-1", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-bold text-foreground", children: formatCurrency(payload[0].value) })
    ] });
  }
  return null;
}
function FilterBar({ active, onChange }) {
  const filters = [
    { key: "today", label: "Today" },
    { key: "week", label: "This Week" },
    { key: "month", label: "This Month" },
    { key: "custom", label: "All Time" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "flex gap-2 flex-wrap",
      "data-ocid": "profit_dashboard.filter.tab",
      children: filters.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => onChange(f.key),
          className: `px-4 py-1.5 rounded-full text-xs font-semibold transition-all border ${active === f.key ? "bg-gradient-to-r from-[#0D47A1] to-[#26C6DA] text-white border-transparent shadow-sm" : "bg-white text-muted-foreground border-border hover:border-primary/40"}`,
          children: f.label
        },
        f.key
      ))
    }
  );
}
const ROWS_PER_PAGE = 5;
function ProfitDashboardPage({
  isDemoMode = false
}) {
  const [filter, setFilter] = reactExports.useState("month");
  const [hospitalPage, setHospitalPage] = reactExports.useState(0);
  const [testPage, setTestPage] = reactExports.useState(0);
  const data = reactExports.useMemo(() => computeRealProfitData(filter), [filter]);
  const totalHospitalPages = Math.max(
    1,
    Math.ceil(data.hospitalProfits.length / ROWS_PER_PAGE)
  );
  const paginatedHospitals = data.hospitalProfits.slice(
    hospitalPage * ROWS_PER_PAGE,
    (hospitalPage + 1) * ROWS_PER_PAGE
  );
  const totalTestPages = Math.max(
    1,
    Math.ceil(data.testProfits.length / ROWS_PER_PAGE)
  );
  const paginatedTests = data.testProfits.slice(
    testPage * ROWS_PER_PAGE,
    (testPage + 1) * ROWS_PER_PAGE
  );
  const filterLabel = filter === "today" ? "Today" : filter === "week" ? "This Week" : filter === "month" ? "This Month" : "All Time";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen bg-gray-50 pb-[90px]",
      "data-ocid": "profit_dashboard.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white border-b border-border px-4 py-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-5 h-5 text-white" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-foreground", children: "Profit Dashboard" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Business Profit Analytics" })
            ] })
          ] }),
          isDemoMode && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold border border-amber-200", children: "Demo Data" })
        ] }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 py-6 space-y-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-2xl px-4 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-blue-700", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Profit formula:" }),
              " MRP − (Lab Cost + Doctor Commission). All figures below are based on this calculation."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FilterBar,
            {
              active: filter,
              onChange: (f) => {
                setFilter(f);
                setHospitalPage(0);
                setTestPage(0);
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4", children: [
              "Profit Overview — ",
              filterLabel
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ProfitCard,
                {
                  title: "Profit Today",
                  value: formatCurrency(data.profitToday),
                  subtitle: "Earned today",
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "w-5 h-5" }),
                  iconBg: "bg-green-50",
                  iconColor: "text-green-600"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ProfitCard,
                {
                  title: "Profit This Month",
                  value: formatCurrency(data.profitMonth),
                  subtitle: "Current month profit",
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-5 h-5" }),
                  iconBg: "bg-emerald-50",
                  iconColor: "text-emerald-600"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ProfitCard,
                {
                  title: "Avg Profit / Test",
                  value: formatCurrency(data.avgProfitPerTest),
                  subtitle: "Per completed test",
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { className: "w-5 h-5" }),
                  iconBg: "bg-teal-50",
                  iconColor: "text-teal-600"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ProfitCard,
                {
                  title: "Most Profitable Test",
                  value: data.mostProfitableTest.name,
                  subtitle: `₹${data.mostProfitableTest.profit} profit per test`,
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-5 h-5" }),
                  iconBg: "bg-blue-50",
                  iconColor: "text-blue-600"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ProfitCard,
                {
                  title: "Least Profitable Test",
                  value: data.leastProfitableTest.name,
                  subtitle: `₹${data.leastProfitableTest.profit} profit per test`,
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "w-5 h-5" }),
                  iconBg: "bg-orange-50",
                  iconColor: "text-orange-500"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ProfitCard,
                {
                  title: "Total Profit Generated",
                  value: formatCurrency(data.totalProfit),
                  subtitle: "All-time cumulative",
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "w-5 h-5" }),
                  iconBg: "bg-purple-50",
                  iconColor: "text-purple-600"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("section", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "premium-card p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-5 h-5 text-green-600" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-semibold text-foreground", children: "Profit Trend — Last 30 Days" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-56", "data-ocid": "profit_dashboard.chart_point", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              LineChart,
              {
                data: data.profitChart,
                margin: { top: 4, right: 8, left: 0, bottom: 0 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "linearGradient",
                    {
                      id: "profitGradient",
                      x1: "0",
                      y1: "0",
                      x2: "1",
                      y2: "0",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#10b981" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#059669" })
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
                      dataKey: "date",
                      tick: {
                        fontSize: 10,
                        fill: "#888",
                        fontFamily: "Poppins, sans-serif"
                      },
                      axisLine: false,
                      tickLine: false,
                      interval: 4
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    YAxis,
                    {
                      tick: {
                        fontSize: 10,
                        fill: "#888",
                        fontFamily: "Poppins, sans-serif"
                      },
                      axisLine: false,
                      tickLine: false,
                      tickFormatter: (v) => `₹${(v / 1e3).toFixed(0)}k`,
                      width: 42
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { content: /* @__PURE__ */ jsxRuntimeExports.jsx(ProfitTooltip, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Line,
                    {
                      type: "monotone",
                      dataKey: "profit",
                      stroke: "url(#profitGradient)",
                      strokeWidth: 3,
                      dot: false,
                      activeDot: {
                        r: 6,
                        fill: "#10b981",
                        strokeWidth: 2,
                        stroke: "#fff"
                      }
                    }
                  )
                ]
              }
            ) }) })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("section", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "premium-card overflow-hidden",
              "data-ocid": "profit_dashboard.hospital.table",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-5 py-4 border-b border-border", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-5 h-5 text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-semibold text-foreground", children: "Hospital Profit Breakdown" })
                ] }),
                data.hospitalProfits.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "py-12 flex flex-col items-center justify-center text-center px-4",
                    "data-ocid": "profit_dashboard.hospital.empty_state",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-10 h-10 text-muted-foreground/30 mb-3" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No hospital data available." })
                    ]
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-gray-50 border-b border-border", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Hospital" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Tests" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Revenue" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Commission" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide text-green-700", children: "Profit" })
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: paginatedHospitals.map((h, idx) => {
                      const hProfitPct = h.revenue > 0 ? h.profit / h.revenue * 100 : 0;
                      const hColor = hProfitPct >= 30 ? "green" : hProfitPct >= 10 ? "yellow" : "red";
                      const hDotCls = hColor === "green" ? "bg-green-500" : hColor === "yellow" ? "bg-yellow-500" : "bg-red-500";
                      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "tr",
                        {
                          className: `border-b border-border last:border-0 transition-colors hover:bg-gray-50/80 ${idx % 2 === 0 ? "" : "bg-gray-50/30"}`,
                          "data-ocid": `profit_dashboard.hospital.row.${idx + 1}`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-3.5 h-3.5 text-purple-600" }) }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground text-sm", children: h.name }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "span",
                                {
                                  className: `w-2 h-2 rounded-full flex-shrink-0 ${hDotCls}`
                                }
                              )
                            ] }) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5 text-right font-semibold text-foreground", children: h.totalTests }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5 text-right font-semibold text-foreground", children: formatCurrency(h.revenue) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5 text-right font-semibold text-orange-600", children: formatCurrency(h.commission) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5 text-right font-bold text-green-700", children: formatCurrency(h.profit) })
                          ]
                        },
                        h.id
                      );
                    }) })
                  ] }) }),
                  totalHospitalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-3 border-t border-border bg-gray-50/50", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                      "Showing ",
                      hospitalPage * ROWS_PER_PAGE + 1,
                      "–",
                      Math.min(
                        (hospitalPage + 1) * ROWS_PER_PAGE,
                        data.hospitalProfits.length
                      ),
                      " ",
                      "of ",
                      data.hospitalProfits.length
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => setHospitalPage((p) => Math.max(0, p - 1)),
                          disabled: hospitalPage === 0,
                          className: "w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-white hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed transition-all",
                          "data-ocid": "profit_dashboard.hospital.pagination_prev",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => setHospitalPage(
                            (p) => Math.min(totalHospitalPages - 1, p + 1)
                          ),
                          disabled: hospitalPage === totalHospitalPages - 1,
                          className: "w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-white hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed transition-all",
                          "data-ocid": "profit_dashboard.hospital.pagination_next",
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
              className: "premium-card overflow-hidden",
              "data-ocid": "profit_dashboard.test.table",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-5 py-4 border-b border-border", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { className: "w-5 h-5 text-teal-600" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-semibold text-foreground", children: "Test-wise Profit Breakdown" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-gray-50 border-b border-border", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Test" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "MRP" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Lab Cost" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Commission" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Tests" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide text-green-700", children: "Total Profit" })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: paginatedTests.map((t, idx) => {
                    const tColor = getProfitStatusColor(t.mrp, t.profitPerTest);
                    const tDotCls = tColor === "green" ? "bg-green-500" : tColor === "yellow" ? "bg-yellow-500" : "bg-red-500";
                    const isLoss = t.profitPerTest < 0;
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "tr",
                      {
                        className: `border-b border-border last:border-0 transition-colors hover:bg-gray-50/80 ${isLoss ? "bg-red-50/50" : idx % 2 === 0 ? "" : "bg-gray-50/30"}`,
                        "data-ocid": `profit_dashboard.test.row.${idx + 1}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: `mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${tDotCls}`
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: t.testName }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t.testCode })
                            ] })
                          ] }) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5 text-right font-medium text-foreground", children: formatCurrency(t.mrp) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5 text-right text-muted-foreground", children: formatCurrency(t.labCost) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5 text-right text-orange-600", children: formatCurrency(t.doctorCommission) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5 text-right font-semibold text-foreground", children: t.totalTests }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "td",
                            {
                              className: `px-4 py-3.5 text-right font-bold ${isLoss ? "text-red-600" : "text-green-700"}`,
                              children: formatCurrency(t.totalProfit)
                            }
                          )
                        ]
                      },
                      t.testCode
                    );
                  }) })
                ] }) }),
                totalTestPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-3 border-t border-border bg-gray-50/50", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    "Showing ",
                    testPage * ROWS_PER_PAGE + 1,
                    "–",
                    Math.min(
                      (testPage + 1) * ROWS_PER_PAGE,
                      data.testProfits.length
                    ),
                    " ",
                    "of ",
                    data.testProfits.length
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setTestPage((p) => Math.max(0, p - 1)),
                        disabled: testPage === 0,
                        className: "w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-white hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed transition-all",
                        "data-ocid": "profit_dashboard.test.pagination_prev",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setTestPage((p) => Math.min(totalTestPages - 1, p + 1)),
                        disabled: testPage === totalTestPages - 1,
                        className: "w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-white hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed transition-all",
                        "data-ocid": "profit_dashboard.test.pagination_next",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
                      }
                    )
                  ] })
                ] })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
export {
  ProfitDashboardPage as default
};
