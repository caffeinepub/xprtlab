import {
  AlertCircle,
  Award,
  BarChart3,
  Building2,
  ChevronLeft,
  ChevronRight,
  FlaskConical,
  IndianRupee,
  TrendingUp,
} from "lucide-react";
import type React from "react";
import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  getDemoHospitals,
  getDemoSamples,
  getDemoTests,
} from "../../utils/demoStorage";
import { formatCurrency } from "../../utils/formatters";
import {
  computeProfitPerTest,
  getProfitStatusColor,
} from "../../utils/profitUtils";

// ─── Types ────────────────────────────────────────────────────────────────────

type FilterPeriod = "today" | "week" | "month" | "custom";

interface TestProfit {
  testName: string;
  testCode: string;
  mrp: number;
  labCost: number;
  doctorCommission: number;
  totalTests: number;
  profitPerTest: number;
  totalProfit: number;
}

interface HospitalProfit {
  id: string;
  name: string;
  totalTests: number;
  revenue: number;
  commission: number;
  profit: number;
}

interface DemoProfitData {
  profitToday: number;
  profitMonth: number;
  avgProfitPerTest: number;
  mostProfitableTest: { name: string; profit: number };
  leastProfitableTest: { name: string; profit: number };
  totalProfit: number;
  profitChart: { date: string; profit: number }[];
  hospitalProfits: HospitalProfit[];
  testProfits: TestProfit[];
}

// ─── Demo Data ────────────────────────────────────────────────────────────────

function generateDemoProfitData(filter: FilterPeriod): DemoProfitData {
  const now = Date.now();
  const dayMs = 24 * 60 * 60 * 1000;

  const allTests: TestProfit[] = [
    {
      testName: "CBC",
      testCode: "CBC001",
      mrp: 300,
      labCost: 40,
      doctorCommission: 150,
      totalTests: 80,
      profitPerTest: 110,
      totalProfit: 8800,
    },
    {
      testName: "Blood Sugar Fasting",
      testCode: "BSF001",
      mrp: 150,
      labCost: 20,
      doctorCommission: 60,
      totalTests: 120,
      profitPerTest: 70,
      totalProfit: 8400,
    },
    {
      testName: "Lipid Profile",
      testCode: "LP001",
      mrp: 600,
      labCost: 80,
      doctorCommission: 300,
      totalTests: 55,
      profitPerTest: 220,
      totalProfit: 12100,
    },
    {
      testName: "Thyroid Profile",
      testCode: "TP001",
      mrp: 700,
      labCost: 90,
      doctorCommission: 350,
      totalTests: 42,
      profitPerTest: 260,
      totalProfit: 10920,
    },
    {
      testName: "Vitamin D",
      testCode: "VD001",
      mrp: 1200,
      labCost: 500,
      doctorCommission: 682,
      totalTests: 30,
      profitPerTest: 18,
      totalProfit: 540,
    },
    {
      testName: "Urine Routine",
      testCode: "UR001",
      mrp: 200,
      labCost: 30,
      doctorCommission: 100,
      totalTests: 95,
      profitPerTest: 70,
      totalProfit: 6650,
    },
    {
      testName: "Liver Function Test",
      testCode: "LFT001",
      mrp: 800,
      labCost: 100,
      doctorCommission: 400,
      totalTests: 38,
      profitPerTest: 300,
      totalProfit: 11400,
    },
    {
      testName: "Kidney Function Test",
      testCode: "KFT001",
      mrp: 750,
      labCost: 95,
      doctorCommission: 375,
      totalTests: 41,
      profitPerTest: 280,
      totalProfit: 11480,
    },
    {
      testName: "HbA1c",
      testCode: "HBA001",
      mrp: 500,
      labCost: 70,
      doctorCommission: 250,
      totalTests: 62,
      profitPerTest: 180,
      totalProfit: 11160,
    },
    {
      testName: "Dengue NS1",
      testCode: "DN001",
      mrp: 900,
      labCost: 150,
      doctorCommission: 450,
      totalTests: 25,
      profitPerTest: 300,
      totalProfit: 7500,
    },
  ];

  const multiplier = filter === "today" ? 0.03 : filter === "week" ? 0.25 : 1;

  const filteredTests = allTests.map((t) => ({
    ...t,
    totalTests: Math.max(1, Math.round(t.totalTests * multiplier)),
    totalProfit: Math.round(t.totalProfit * multiplier),
  }));

  const totalProfit = filteredTests.reduce((sum, t) => sum + t.totalProfit, 0);
  const totalTests = filteredTests.reduce((sum, t) => sum + t.totalTests, 0);

  // Sort for most/least profitable
  const byPerTest = [...allTests].sort(
    (a, b) => b.profitPerTest - a.profitPerTest,
  );
  const mostProfitable = byPerTest[0];
  const leastProfitable = byPerTest[byPerTest.length - 1];

  // Chart — last 30 days
  const profitChart = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(now - (29 - i) * dayMs);
    const label = d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    });
    const base = 800 + Math.round(Math.sin(i * 0.4) * 400 + i * 25);
    return { date: label, profit: base };
  });

  const hospitalProfits: HospitalProfit[] = [
    {
      id: "1",
      name: "City General Hospital",
      totalTests: Math.round(142 * multiplier),
      revenue: Math.round(38500 * multiplier),
      commission: Math.round(19250 * multiplier),
      profit: Math.round(13200 * multiplier),
    },
    {
      id: "2",
      name: "Apollo Diagnostics",
      totalTests: Math.round(98 * multiplier),
      revenue: Math.round(27200 * multiplier),
      commission: Math.round(13600 * multiplier),
      profit: Math.round(9200 * multiplier),
    },
    {
      id: "3",
      name: "Sunrise Medical Centre",
      totalTests: Math.round(76 * multiplier),
      revenue: Math.round(19800 * multiplier),
      commission: Math.round(9900 * multiplier),
      profit: Math.round(6800 * multiplier),
    },
    {
      id: "4",
      name: "Metro Health Clinic",
      totalTests: Math.round(54 * multiplier),
      revenue: Math.round(14600 * multiplier),
      commission: Math.round(7300 * multiplier),
      profit: Math.round(5100 * multiplier),
    },
    {
      id: "5",
      name: "Green Valley Hospital",
      totalTests: Math.round(31 * multiplier),
      revenue: Math.round(8900 * multiplier),
      commission: Math.round(4450 * multiplier),
      profit: Math.round(3100 * multiplier),
    },
  ];

  return {
    profitToday:
      filter === "today" ? 1980 : filter === "week" ? 14200 : totalProfit,
    profitMonth:
      filter === "month" || filter === "custom"
        ? totalProfit
        : Math.round(totalProfit * 0.8),
    avgProfitPerTest: totalTests > 0 ? Math.round(totalProfit / totalTests) : 0,
    mostProfitableTest: {
      name: mostProfitable.testName,
      profit: mostProfitable.profitPerTest,
    },
    leastProfitableTest: {
      name: leastProfitable.testName,
      profit: leastProfitable.profitPerTest,
    },
    totalProfit: 348500,
    profitChart,
    hospitalProfits,
    testProfits: filteredTests,
  };
}

// ─── Real Profit Calculation from localStorage ────────────────────────────────

function computeRealProfitData(filter: FilterPeriod): DemoProfitData {
  const now = Date.now();
  const dayMs = 24 * 60 * 60 * 1000;

  const testMasters = getDemoTests();

  // Fall back to generated demo data when no test masters are stored
  if (testMasters.length === 0) {
    return generateDemoProfitData(filter);
  }

  // Build test master lookup by testCode (case-insensitive)
  const masterMap = new Map(
    testMasters.map((t) => [t.testCode.toUpperCase(), t]),
  );

  // Date boundary for filter
  const filterStart =
    filter === "today"
      ? now - dayMs
      : filter === "week"
        ? now - 7 * dayMs
        : filter === "month"
          ? now - 30 * dayMs
          : 0; // "custom" = all time

  const allSamples = getDemoSamples();
  const filteredSamples = allSamples.filter((s) => s.createdAt >= filterStart);
  const todaySamples = allSamples.filter((s) => s.createdAt >= now - dayMs);
  const monthSamples = allSamples.filter(
    (s) => s.createdAt >= now - 30 * dayMs,
  );

  // Helper: compute profit for a single sample-test pair
  function sampleTestProfit(
    testId: string,
    mrpFallback: number,
  ): { profit: number; commissionAmt: number; mrp: number } {
    const master = masterMap.get(testId.toUpperCase());
    if (master) {
      const commissionAmt = master.mrp * (master.doctorCommissionPct / 100);
      return {
        profit: computeProfitPerTest(
          master.mrp,
          master.labCost,
          master.doctorCommissionPct,
        ),
        commissionAmt,
        mrp: master.mrp,
      };
    }
    // No master found — estimate: assume 50% commission, 0 lab cost
    const commissionAmt = mrpFallback * 0.5;
    return { profit: mrpFallback * 0.5, commissionAmt, mrp: mrpFallback };
  }

  // Total profit from a sample array
  function totalProfitFromSamples(samples: typeof allSamples): number {
    return samples.reduce((sum, s) => {
      const sProfit = s.tests.reduce(
        (acc, t) => acc + sampleTestProfit(t.testId, t.price).profit,
        0,
      );
      return sum + sProfit;
    }, 0);
  }

  const profitToday = totalProfitFromSamples(todaySamples);
  const profitMonth = totalProfitFromSamples(monthSamples);
  const filteredProfit = totalProfitFromSamples(filteredSamples);
  const totalProfit = totalProfitFromSamples(allSamples);

  // Average profit per test in filtered set
  const totalTestCount = filteredSamples.reduce(
    (sum, s) => sum + s.tests.length,
    0,
  );
  const avgProfitPerTest =
    totalTestCount > 0 ? Math.round(filteredProfit / totalTestCount) : 0;

  // Most / Least profitable test
  const testProfitMap = new Map<
    string,
    { name: string; profitPerTest: number }
  >();
  for (const master of testMasters) {
    const ppt = computeProfitPerTest(
      master.mrp,
      master.labCost,
      master.doctorCommissionPct,
    );
    testProfitMap.set(master.testCode.toUpperCase(), {
      name: master.testName,
      profitPerTest: ppt,
    });
  }
  const byProfit = Array.from(testProfitMap.values()).sort(
    (a, b) => b.profitPerTest - a.profitPerTest,
  );
  const mostProfitableTest =
    byProfit.length > 0
      ? {
          name: byProfit[0].name,
          profit: Math.round(byProfit[0].profitPerTest),
        }
      : { name: "N/A", profit: 0 };
  const leastProfitableTest =
    byProfit.length > 0
      ? {
          name: byProfit[byProfit.length - 1].name,
          profit: Math.round(byProfit[byProfit.length - 1].profitPerTest),
        }
      : { name: "N/A", profit: 0 };

  // Profit chart — last 30 days
  const profitChart = Array.from({ length: 30 }, (_, i) => {
    const dayStart = now - (29 - i) * dayMs;
    const dayEnd = dayStart + dayMs;
    const label = new Date(dayStart).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    });
    const dayProfit = allSamples
      .filter((s) => s.createdAt >= dayStart && s.createdAt < dayEnd)
      .reduce(
        (sum, s) =>
          sum +
          s.tests.reduce(
            (acc, t) => acc + sampleTestProfit(t.testId, t.price).profit,
            0,
          ),
        0,
      );
    // Add small variance so chart doesn't look flat when little data
    return { date: label, profit: Math.max(0, dayProfit) };
  });

  // Hospital profit breakdown
  const hospitals = getDemoHospitals();
  const hospitalMap = new Map(hospitals.map((h) => [h.id, h.name]));
  const hospitalAggMap = new Map<
    string,
    { revenue: number; commission: number; profit: number; tests: number }
  >();
  for (const s of filteredSamples) {
    const hId = s.hospitalId;
    if (!hospitalAggMap.has(hId)) {
      hospitalAggMap.set(hId, {
        revenue: 0,
        commission: 0,
        profit: 0,
        tests: 0,
      });
    }
    const agg = hospitalAggMap.get(hId)!;
    for (const t of s.tests) {
      const { profit, commissionAmt, mrp } = sampleTestProfit(
        t.testId,
        t.price,
      );
      agg.revenue += mrp;
      agg.commission += commissionAmt;
      agg.profit += profit;
      agg.tests += 1;
    }
  }
  const hospitalProfits: HospitalProfit[] = Array.from(
    hospitalAggMap.entries(),
  ).map(([id, agg]) => ({
    id,
    name: hospitalMap.get(id) ?? `Hospital ${id}`,
    totalTests: agg.tests,
    revenue: Math.round(agg.revenue),
    commission: Math.round(agg.commission),
    profit: Math.round(agg.profit),
  }));

  // If no hospital data from samples, fall back to the demo hospital profits
  const finalHospitalProfits =
    hospitalProfits.length > 0
      ? hospitalProfits
      : generateDemoProfitData(filter).hospitalProfits;

  // Test-wise profit table
  const testAggMap = new Map<
    string,
    {
      testName: string;
      testCode: string;
      mrp: number;
      labCost: number;
      doctorCommission: number;
      profitPerTest: number;
      count: number;
      totalProfit: number;
    }
  >();

  for (const s of filteredSamples) {
    for (const t of s.tests) {
      const key = t.testId.toUpperCase();
      const master = masterMap.get(key);
      if (!testAggMap.has(key)) {
        const mrp = master?.mrp ?? t.price;
        const labCost = master?.labCost ?? 0;
        const commPct = master?.doctorCommissionPct ?? 50;
        const ppt = computeProfitPerTest(mrp, labCost, commPct);
        testAggMap.set(key, {
          testName: master?.testName ?? t.testName,
          testCode: master?.testCode ?? t.testCode,
          mrp,
          labCost,
          doctorCommission: Math.round(mrp * (commPct / 100)),
          profitPerTest: ppt,
          count: 0,
          totalProfit: 0,
        });
      }
      const agg = testAggMap.get(key)!;
      agg.count += 1;
      agg.totalProfit += agg.profitPerTest;
    }
  }

  let testProfits: TestProfit[] = Array.from(testAggMap.values()).map((a) => ({
    testName: a.testName,
    testCode: a.testCode,
    mrp: a.mrp,
    labCost: a.labCost,
    doctorCommission: a.doctorCommission,
    totalTests: a.count,
    profitPerTest: Math.round(a.profitPerTest),
    totalProfit: Math.round(a.totalProfit),
  }));

  // If no test data from samples, fall back to demo test profits
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
    testProfits,
  };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface ProfitCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}

function ProfitCard({
  title,
  value,
  subtitle,
  icon,
  iconBg,
  iconColor,
}: ProfitCardProps) {
  return (
    <div
      className="premium-card p-5 flex items-start gap-4"
      data-ocid="profit_dashboard.card"
    >
      <div
        className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center ${iconBg}`}
      >
        <span className={iconColor}>{icon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
          {title}
        </p>
        <p className="text-2xl font-bold text-foreground leading-tight">
          {value}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}

function ProfitTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-border rounded-xl shadow-card px-4 py-3">
        <p className="text-xs font-semibold text-muted-foreground mb-1">
          {label}
        </p>
        <p className="text-base font-bold text-foreground">
          {formatCurrency(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
}

// ─── Filter Bar ───────────────────────────────────────────────────────────────

interface FilterBarProps {
  active: FilterPeriod;
  onChange: (f: FilterPeriod) => void;
}

function FilterBar({ active, onChange }: FilterBarProps) {
  const filters: { key: FilterPeriod; label: string }[] = [
    { key: "today", label: "Today" },
    { key: "week", label: "This Week" },
    { key: "month", label: "This Month" },
    { key: "custom", label: "All Time" },
  ];

  return (
    <div
      className="flex gap-2 flex-wrap"
      data-ocid="profit_dashboard.filter.tab"
    >
      {filters.map((f) => (
        <button
          type="button"
          key={f.key}
          onClick={() => onChange(f.key)}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all border ${
            active === f.key
              ? "bg-gradient-to-r from-[#0D47A1] to-[#26C6DA] text-white border-transparent shadow-sm"
              : "bg-white text-muted-foreground border-border hover:border-primary/40"
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const ROWS_PER_PAGE = 5;

interface ProfitDashboardPageProps {
  isDemoMode?: boolean;
}

export default function ProfitDashboardPage({
  isDemoMode = false,
}: ProfitDashboardPageProps) {
  const [filter, setFilter] = useState<FilterPeriod>("month");
  const [hospitalPage, setHospitalPage] = useState(0);
  const [testPage, setTestPage] = useState(0);

  const data = useMemo(() => computeRealProfitData(filter), [filter]);

  // Hospital pagination
  const totalHospitalPages = Math.max(
    1,
    Math.ceil(data.hospitalProfits.length / ROWS_PER_PAGE),
  );
  const paginatedHospitals = data.hospitalProfits.slice(
    hospitalPage * ROWS_PER_PAGE,
    (hospitalPage + 1) * ROWS_PER_PAGE,
  );

  // Test pagination
  const totalTestPages = Math.max(
    1,
    Math.ceil(data.testProfits.length / ROWS_PER_PAGE),
  );
  const paginatedTests = data.testProfits.slice(
    testPage * ROWS_PER_PAGE,
    (testPage + 1) * ROWS_PER_PAGE,
  );

  const filterLabel =
    filter === "today"
      ? "Today"
      : filter === "week"
        ? "This Week"
        : filter === "month"
          ? "This Month"
          : "All Time";

  return (
    <div
      className="min-h-screen bg-gray-50 pb-[90px]"
      data-ocid="profit_dashboard.page"
    >
      {/* Page Header */}
      <div className="bg-white border-b border-border px-4 py-5">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  Profit Dashboard
                </h1>
                <p className="text-xs text-muted-foreground">
                  Business Profit Analytics
                </p>
              </div>
            </div>
            {isDemoMode && (
              <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold border border-amber-200">
                Demo Data
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6 space-y-8">
        {/* Formula Info Banner */}
        <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-2xl px-4 py-3">
          <AlertCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-blue-700">
            <span className="font-semibold">Profit formula:</span> MRP − (Lab
            Cost + Doctor Commission). All figures below are based on this
            calculation.
          </p>
        </div>

        {/* Filter Bar */}
        <FilterBar
          active={filter}
          onChange={(f) => {
            setFilter(f);
            setHospitalPage(0);
            setTestPage(0);
          }}
        />

        {/* ── 1. Summary Cards ─────────────────────────────────────────── */}
        <section>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Profit Overview — {filterLabel}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <ProfitCard
              title="Profit Today"
              value={formatCurrency(data.profitToday)}
              subtitle="Earned today"
              icon={<IndianRupee className="w-5 h-5" />}
              iconBg="bg-green-50"
              iconColor="text-green-600"
            />
            <ProfitCard
              title="Profit This Month"
              value={formatCurrency(data.profitMonth)}
              subtitle="Current month profit"
              icon={<TrendingUp className="w-5 h-5" />}
              iconBg="bg-emerald-50"
              iconColor="text-emerald-600"
            />
            <ProfitCard
              title="Avg Profit / Test"
              value={formatCurrency(data.avgProfitPerTest)}
              subtitle="Per completed test"
              icon={<FlaskConical className="w-5 h-5" />}
              iconBg="bg-teal-50"
              iconColor="text-teal-600"
            />
            <ProfitCard
              title="Most Profitable Test"
              value={data.mostProfitableTest.name}
              subtitle={`₹${data.mostProfitableTest.profit} profit per test`}
              icon={<Award className="w-5 h-5" />}
              iconBg="bg-blue-50"
              iconColor="text-blue-600"
            />
            <ProfitCard
              title="Least Profitable Test"
              value={data.leastProfitableTest.name}
              subtitle={`₹${data.leastProfitableTest.profit} profit per test`}
              icon={<BarChart3 className="w-5 h-5" />}
              iconBg="bg-orange-50"
              iconColor="text-orange-500"
            />
            <ProfitCard
              title="Total Profit Generated"
              value={formatCurrency(data.totalProfit)}
              subtitle="All-time cumulative"
              icon={<IndianRupee className="w-5 h-5" />}
              iconBg="bg-purple-50"
              iconColor="text-purple-600"
            />
          </div>
        </section>

        {/* ── 2. Profit Trend Chart (Last 30 Days) ─────────────────────── */}
        <section>
          <div className="premium-card p-5">
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <h2 className="text-base font-semibold text-foreground">
                Profit Trend — Last 30 Days
              </h2>
            </div>
            <div className="h-56" data-ocid="profit_dashboard.chart_point">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={data.profitChart}
                  margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="profitGradient"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="0"
                    >
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#f0f0f0"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="date"
                    tick={{
                      fontSize: 10,
                      fill: "#888",
                      fontFamily: "Poppins, sans-serif",
                    }}
                    axisLine={false}
                    tickLine={false}
                    interval={4}
                  />
                  <YAxis
                    tick={{
                      fontSize: 10,
                      fill: "#888",
                      fontFamily: "Poppins, sans-serif",
                    }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v: number) => `₹${(v / 1000).toFixed(0)}k`}
                    width={42}
                  />
                  <Tooltip content={<ProfitTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="profit"
                    stroke="url(#profitGradient)"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{
                      r: 6,
                      fill: "#10b981",
                      strokeWidth: 2,
                      stroke: "#fff",
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* ── 3. Hospital Profit Breakdown ──────────────────────────────── */}
        <section>
          <div
            className="premium-card overflow-hidden"
            data-ocid="profit_dashboard.hospital.table"
          >
            <div className="flex items-center gap-2 px-5 py-4 border-b border-border">
              <Building2 className="w-5 h-5 text-primary" />
              <h2 className="text-base font-semibold text-foreground">
                Hospital Profit Breakdown
              </h2>
            </div>

            {data.hospitalProfits.length === 0 ? (
              <div
                className="py-12 flex flex-col items-center justify-center text-center px-4"
                data-ocid="profit_dashboard.hospital.empty_state"
              >
                <Building2 className="w-10 h-10 text-muted-foreground/30 mb-3" />
                <p className="text-sm text-muted-foreground">
                  No hospital data available.
                </p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b border-border">
                        <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                          Hospital
                        </th>
                        <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                          Tests
                        </th>
                        <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                          Revenue
                        </th>
                        <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                          Commission
                        </th>
                        <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide text-green-700">
                          Profit
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedHospitals.map((h, idx) => {
                        const hProfitPct =
                          h.revenue > 0 ? (h.profit / h.revenue) * 100 : 0;
                        const hColor =
                          hProfitPct >= 30
                            ? "green"
                            : hProfitPct >= 10
                              ? "yellow"
                              : "red";
                        const hDotCls =
                          hColor === "green"
                            ? "bg-green-500"
                            : hColor === "yellow"
                              ? "bg-yellow-500"
                              : "bg-red-500";
                        return (
                          <tr
                            key={h.id}
                            className={`border-b border-border last:border-0 transition-colors hover:bg-gray-50/80 ${idx % 2 === 0 ? "" : "bg-gray-50/30"}`}
                            data-ocid={`profit_dashboard.hospital.row.${idx + 1}`}
                          >
                            <td className="px-5 py-3.5">
                              <div className="flex items-center gap-2.5">
                                <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0">
                                  <Building2 className="w-3.5 h-3.5 text-purple-600" />
                                </div>
                                <span className="font-medium text-foreground text-sm">
                                  {h.name}
                                </span>
                                <span
                                  className={`w-2 h-2 rounded-full flex-shrink-0 ${hDotCls}`}
                                />
                              </div>
                            </td>
                            <td className="px-4 py-3.5 text-right font-semibold text-foreground">
                              {h.totalTests}
                            </td>
                            <td className="px-4 py-3.5 text-right font-semibold text-foreground">
                              {formatCurrency(h.revenue)}
                            </td>
                            <td className="px-4 py-3.5 text-right font-semibold text-orange-600">
                              {formatCurrency(h.commission)}
                            </td>
                            <td className="px-4 py-3.5 text-right font-bold text-green-700">
                              {formatCurrency(h.profit)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {totalHospitalPages > 1 && (
                  <div className="flex items-center justify-between px-5 py-3 border-t border-border bg-gray-50/50">
                    <p className="text-xs text-muted-foreground">
                      Showing {hospitalPage * ROWS_PER_PAGE + 1}–
                      {Math.min(
                        (hospitalPage + 1) * ROWS_PER_PAGE,
                        data.hospitalProfits.length,
                      )}{" "}
                      of {data.hospitalProfits.length}
                    </p>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() =>
                          setHospitalPage((p) => Math.max(0, p - 1))
                        }
                        disabled={hospitalPage === 0}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-white hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                        data-ocid="profit_dashboard.hospital.pagination_prev"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setHospitalPage((p) =>
                            Math.min(totalHospitalPages - 1, p + 1),
                          )
                        }
                        disabled={hospitalPage === totalHospitalPages - 1}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-white hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                        data-ocid="profit_dashboard.hospital.pagination_next"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* ── 4. Test-wise Profit Table ─────────────────────────────────── */}
        <section>
          <div
            className="premium-card overflow-hidden"
            data-ocid="profit_dashboard.test.table"
          >
            <div className="flex items-center gap-2 px-5 py-4 border-b border-border">
              <FlaskConical className="w-5 h-5 text-teal-600" />
              <h2 className="text-base font-semibold text-foreground">
                Test-wise Profit Breakdown
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-border">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Test
                    </th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      MRP
                    </th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Lab Cost
                    </th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Commission
                    </th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Tests
                    </th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide text-green-700">
                      Total Profit
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedTests.map((t, idx) => {
                    const tColor = getProfitStatusColor(t.mrp, t.profitPerTest);
                    const tDotCls =
                      tColor === "green"
                        ? "bg-green-500"
                        : tColor === "yellow"
                          ? "bg-yellow-500"
                          : "bg-red-500";
                    const isLoss = t.profitPerTest < 0;
                    return (
                      <tr
                        key={t.testCode}
                        className={`border-b border-border last:border-0 transition-colors hover:bg-gray-50/80 ${isLoss ? "bg-red-50/50" : idx % 2 === 0 ? "" : "bg-gray-50/30"}`}
                        data-ocid={`profit_dashboard.test.row.${idx + 1}`}
                      >
                        <td className="px-5 py-3.5">
                          <div className="flex items-start gap-2">
                            <span
                              className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${tDotCls}`}
                            />
                            <div>
                              <p className="font-semibold text-foreground text-sm">
                                {t.testName}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {t.testCode}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3.5 text-right font-medium text-foreground">
                          {formatCurrency(t.mrp)}
                        </td>
                        <td className="px-4 py-3.5 text-right text-muted-foreground">
                          {formatCurrency(t.labCost)}
                        </td>
                        <td className="px-4 py-3.5 text-right text-orange-600">
                          {formatCurrency(t.doctorCommission)}
                        </td>
                        <td className="px-4 py-3.5 text-right font-semibold text-foreground">
                          {t.totalTests}
                        </td>
                        <td
                          className={`px-4 py-3.5 text-right font-bold ${isLoss ? "text-red-600" : "text-green-700"}`}
                        >
                          {formatCurrency(t.totalProfit)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {totalTestPages > 1 && (
              <div className="flex items-center justify-between px-5 py-3 border-t border-border bg-gray-50/50">
                <p className="text-xs text-muted-foreground">
                  Showing {testPage * ROWS_PER_PAGE + 1}–
                  {Math.min(
                    (testPage + 1) * ROWS_PER_PAGE,
                    data.testProfits.length,
                  )}{" "}
                  of {data.testProfits.length}
                </p>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setTestPage((p) => Math.max(0, p - 1))}
                    disabled={testPage === 0}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-white hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    data-ocid="profit_dashboard.test.pagination_prev"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setTestPage((p) => Math.min(totalTestPages - 1, p + 1))
                    }
                    disabled={testPage === totalTestPages - 1}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-white hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    data-ocid="profit_dashboard.test.pagination_next"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
