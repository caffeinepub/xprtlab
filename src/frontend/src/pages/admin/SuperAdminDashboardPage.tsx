import {
  Activity,
  Building2,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileCheck,
  FileText,
  FlaskConical,
  IndianRupee,
  LayoutDashboard,
  TestTube,
  TrendingUp,
  Users,
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
import HealthcareBg from "../../components/shared/HealthcareBg";
import PageHeroHeader from "../../components/shared/PageHeroHeader";
import { useGetAllTests, useHospitals } from "../../hooks/useQueries";
import { formatCurrency } from "../../utils/formatters";

function getRelativeTime(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

interface DemoDashboardData {
  revenueTodayAmount: number;
  revenueMonthAmount: number;
  samplesToday: number;
  activeHospitals: number;
  activePhlebotomists: number;
  pendingReports: number;
  revenueChart: { day: string; revenue: number }[];
  hospitalPerformance: {
    id: string;
    name: string;
    totalSamples: number;
    revenue: number;
    isActive: boolean;
  }[];
  recentActivity: {
    id: string;
    action: string;
    actionType:
      | "test_added"
      | "hospital_added"
      | "sample_created"
      | "report_delivered";
    user: string;
    timestamp: number;
  }[];
}

function generateDemoDashboardData(): DemoDashboardData {
  const now = Date.now();
  const dayMs = 24 * 60 * 60 * 1000;
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const revenueChart = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now - (6 - i) * dayMs);
    return {
      day: dayNames[d.getDay()],
      revenue: 3200 + Math.round(Math.sin(i * 0.9) * 1200 + i * 400),
    };
  });

  return {
    revenueTodayAmount: 4850,
    revenueMonthAmount: 112400,
    samplesToday: 18,
    activeHospitals: 6,
    activePhlebotomists: 4,
    pendingReports: 3,
    revenueChart,
    hospitalPerformance: [
      {
        id: "1",
        name: "City General Hospital",
        totalSamples: 142,
        revenue: 38500,
        isActive: true,
      },
      {
        id: "2",
        name: "Apollo Diagnostics",
        totalSamples: 98,
        revenue: 27200,
        isActive: true,
      },
      {
        id: "3",
        name: "Sunrise Medical Centre",
        totalSamples: 76,
        revenue: 19800,
        isActive: true,
      },
      {
        id: "4",
        name: "Metro Health Clinic",
        totalSamples: 54,
        revenue: 14600,
        isActive: true,
      },
      {
        id: "5",
        name: "Green Valley Hospital",
        totalSamples: 31,
        revenue: 8900,
        isActive: false,
      },
      {
        id: "6",
        name: "Lifeline Diagnostics",
        totalSamples: 22,
        revenue: 6200,
        isActive: true,
      },
    ],
    recentActivity: [
      {
        id: "1",
        action: "Report delivered to Priya Sharma",
        actionType: "report_delivered",
        user: "Lab Admin",
        timestamp: now - 5 * 60 * 1000,
      },
      {
        id: "2",
        action: "Sample created for Rajesh Kumar",
        actionType: "sample_created",
        user: "Phlebotomist A",
        timestamp: now - 18 * 60 * 1000,
      },
      {
        id: "3",
        action: "New test CBC added",
        actionType: "test_added",
        user: "Super Admin",
        timestamp: now - 45 * 60 * 1000,
      },
      {
        id: "4",
        action: "Hospital Apollo Diagnostics added",
        actionType: "hospital_added",
        user: "Super Admin",
        timestamp: now - 2 * 60 * 60 * 1000,
      },
      {
        id: "5",
        action: "Sample created for Anita Verma",
        actionType: "sample_created",
        user: "Phlebotomist B",
        timestamp: now - 3 * 60 * 60 * 1000,
      },
      {
        id: "6",
        action: "Report delivered to Suresh Patel",
        actionType: "report_delivered",
        user: "Lab Admin",
        timestamp: now - 4 * 60 * 60 * 1000,
      },
      {
        id: "7",
        action: "New test LFT added",
        actionType: "test_added",
        user: "Super Admin",
        timestamp: now - 5 * 60 * 60 * 1000,
      },
      {
        id: "8",
        action: "Sample created for Meena Gupta",
        actionType: "sample_created",
        user: "Phlebotomist A",
        timestamp: now - 6 * 60 * 60 * 1000,
      },
      {
        id: "9",
        action: "Hospital City General added",
        actionType: "hospital_added",
        user: "Super Admin",
        timestamp: now - 8 * 60 * 60 * 1000,
      },
      {
        id: "10",
        action: "Report delivered to Vikram Singh",
        actionType: "report_delivered",
        user: "Lab Admin",
        timestamp: now - 10 * 60 * 60 * 1000,
      },
    ],
  };
}

interface SummaryCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}

function SummaryCard({
  title,
  value,
  subtitle,
  icon,
  iconBg,
  iconColor,
}: SummaryCardProps) {
  return (
    <div
      className="bg-white flex items-start gap-4 transition-all duration-200"
      style={{
        borderRadius: "16px",
        padding: "18px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 12px 32px rgba(13,71,161,0.12)";
        (e.currentTarget as HTMLDivElement).style.transform =
          "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 8px 24px rgba(0,0,0,0.08)";
        (e.currentTarget as HTMLDivElement).style.transform = "";
      }}
    >
      <div
        className="flex-shrink-0 flex items-center justify-center"
        style={{
          width: "42px",
          height: "42px",
          borderRadius: "12px",
          background: iconBg,
        }}
      >
        <span style={{ color: iconColor }}>{icon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p
          className="font-semibold text-gray-500 uppercase tracking-wide mb-1"
          style={{ fontSize: "11px" }}
        >
          {title}
        </p>
        <p className="text-2xl font-bold text-gray-900 leading-tight">
          {value}
        </p>
        <p className="text-gray-400 mt-0.5" style={{ fontSize: "12px" }}>
          {subtitle}
        </p>
      </div>
    </div>
  );
}

type ActivityType =
  | "test_added"
  | "hospital_added"
  | "sample_created"
  | "report_delivered";

function ActivityIcon({ type }: { type: ActivityType }) {
  const configs: Record<ActivityType, { bg: string; icon: React.ReactNode }> = {
    test_added: {
      bg: "#EFF6FF",
      icon: <TestTube className="w-4 h-4 text-blue-600" />,
    },
    hospital_added: {
      bg: "#F5F3FF",
      icon: <Building2 className="w-4 h-4 text-purple-600" />,
    },
    sample_created: {
      bg: "#F0FDFA",
      icon: <FlaskConical className="w-4 h-4 text-teal-600" />,
    },
    report_delivered: {
      bg: "#F0FDF4",
      icon: <FileCheck className="w-4 h-4 text-green-600" />,
    },
  };
  const { bg, icon } = configs[type];
  return (
    <div
      className="flex items-center justify-center flex-shrink-0"
      style={{
        width: "34px",
        height: "34px",
        borderRadius: "10px",
        background: bg,
      }}
    >
      {icon}
    </div>
  );
}

function RevenueTooltip({
  active,
  payload,
  label,
}: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div
        className="bg-white border border-gray-100 rounded-xl px-4 py-3"
        style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
      >
        <p className="text-xs font-semibold text-gray-400 mb-1">{label}</p>
        <p className="text-base font-bold text-gray-900">
          {formatCurrency(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
}

interface SuperAdminDashboardPageProps {
  isDemoMode?: boolean;
}

const ROWS_PER_PAGE = 5;

export default function SuperAdminDashboardPage({
  isDemoMode = false,
}: SuperAdminDashboardPageProps) {
  const [hospitalPage, setHospitalPage] = useState(0);

  const { data: hospitals = [] } = useHospitals();
  const { data: allTests = [] } = useGetAllTests();
  void allTests;

  const demoData = useMemo(() => generateDemoDashboardData(), []);

  const metrics = useMemo(() => {
    if (isDemoMode) {
      return {
        revenueToday: demoData.revenueTodayAmount,
        revenueMonth: demoData.revenueMonthAmount,
        samplesToday: demoData.samplesToday,
        activeHospitals: demoData.activeHospitals,
        activePhlebotomists: demoData.activePhlebotomists,
        pendingReports: demoData.pendingReports,
      };
    }
    const activeHospitals = (hospitals as { isActive: boolean }[]).filter(
      (h) => h.isActive,
    ).length;
    return {
      revenueToday: 0,
      revenueMonth: 0,
      samplesToday: 0,
      activeHospitals,
      activePhlebotomists: 0,
      pendingReports: 0,
    };
  }, [isDemoMode, demoData, hospitals]);

  const revenueChartData = useMemo(() => {
    if (isDemoMode) return demoData.revenueChart;
    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(now - (6 - i) * dayMs);
      return { day: dayNames[d.getDay()], revenue: 0 };
    });
  }, [isDemoMode, demoData]);

  const hasRevenueData = revenueChartData.some((d) => d.revenue > 0);

  const hospitalPerformanceData = useMemo(() => {
    if (isDemoMode) return demoData.hospitalPerformance;
    return (hospitals as { id: string; name: string; isActive: boolean }[]).map(
      (h) => ({
        id: h.id,
        name: h.name,
        totalSamples: 0,
        revenue: 0,
        isActive: h.isActive,
      }),
    );
  }, [isDemoMode, demoData, hospitals]);

  const recentActivity = useMemo(() => {
    if (isDemoMode) return demoData.recentActivity;
    return [];
  }, [isDemoMode, demoData]);

  const totalHospitalPages = Math.max(
    1,
    Math.ceil(hospitalPerformanceData.length / ROWS_PER_PAGE),
  );
  const paginatedHospitals = hospitalPerformanceData.slice(
    hospitalPage * ROWS_PER_PAGE,
    (hospitalPage + 1) * ROWS_PER_PAGE,
  );

  return (
    <div
      className="relative min-h-screen pb-[90px] page-fade-in"
      style={{ background: "#F7F9FC" }}
    >
      <HealthcareBg variant="minimal" opacity={0.035} />

      <div className="relative z-10">
        <div className="px-4 pt-4">
          <PageHeroHeader
            title="Dashboard"
            description="Overview of platform performance and key metrics"
          />
        </div>
        {/* Gradient Page Header */}
        <div
          className="px-4 py-5"
          style={{
            background: "linear-gradient(135deg, #0D47A1 0%, #26A69A 100%)",
            boxShadow: "0 4px 20px rgba(13,71,161,0.2)",
          }}
        >
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3">
              <div
                className="flex items-center justify-center"
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.2)",
                }}
              >
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1
                  className="font-bold text-white"
                  style={{ fontSize: "20px" }}
                >
                  Dashboard
                </h1>
                <p className="text-white/70" style={{ fontSize: "12px" }}>
                  Super Admin Overview
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-6 space-y-8">
          {/* ── 1. Summary Cards ─────────────────────────────────────────── */}
          <section>
            <h2
              className="font-semibold text-gray-400 uppercase tracking-wider mb-4"
              style={{ fontSize: "12px" }}
            >
              Key Metrics
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <SummaryCard
                title="Revenue Today"
                value={formatCurrency(metrics.revenueToday)}
                subtitle="Collected today"
                icon={<IndianRupee className="w-5 h-5" />}
                iconBg="#EFF6FF"
                iconColor="#1D4ED8"
              />
              <SummaryCard
                title="Revenue This Month"
                value={formatCurrency(metrics.revenueMonth)}
                subtitle="Current month total"
                icon={<TrendingUp className="w-5 h-5" />}
                iconBg="#EEF2FF"
                iconColor="#4338CA"
              />
              <SummaryCard
                title="Samples Today"
                value={String(metrics.samplesToday)}
                subtitle="Collected today"
                icon={<FlaskConical className="w-5 h-5" />}
                iconBg="#F0FDFA"
                iconColor="#0D9488"
              />
              <SummaryCard
                title="Active Hospitals"
                value={String(metrics.activeHospitals)}
                subtitle="Currently active"
                icon={<Building2 className="w-5 h-5" />}
                iconBg="#F5F3FF"
                iconColor="#7C3AED"
              />
              <SummaryCard
                title="Active Phlebotomists"
                value={String(metrics.activePhlebotomists)}
                subtitle="On shift today"
                icon={<Users className="w-5 h-5" />}
                iconBg="#FFF7ED"
                iconColor="#EA580C"
              />
              <SummaryCard
                title="Pending Reports"
                value={String(metrics.pendingReports)}
                subtitle="Awaiting delivery"
                icon={<FileText className="w-5 h-5" />}
                iconBg="#FEF2F2"
                iconColor="#DC2626"
              />
            </div>
          </section>

          {/* ── 2. Revenue Chart ─────────────────────────────────────────── */}
          <section>
            <div
              className="bg-white p-5"
              style={{
                borderRadius: "16px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
              }}
            >
              <div className="flex items-center gap-2.5 mb-5">
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "10px",
                    background: "rgba(13,71,161,0.08)",
                  }}
                >
                  <Activity className="w-4 h-4 text-primary" />
                </div>
                <h2
                  className="font-semibold text-gray-900"
                  style={{ fontSize: "16px" }}
                >
                  Revenue Last 7 Days
                </h2>
              </div>

              {hasRevenueData ? (
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={revenueChartData}
                      margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="revenueGradient"
                          x1="0"
                          y1="0"
                          x2="1"
                          y2="0"
                        >
                          <stop offset="0%" stopColor="#0D47A1" />
                          <stop offset="100%" stopColor="#26A69A" />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#f0f0f0"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="day"
                        tick={{
                          fontSize: 11,
                          fill: "#9CA3AF",
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                        }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{
                          fontSize: 11,
                          fill: "#9CA3AF",
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                        }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(v: number) =>
                          `₹${(v / 1000).toFixed(0)}k`
                        }
                        width={42}
                      />
                      <Tooltip content={<RevenueTooltip />} />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="url(#revenueGradient)"
                        strokeWidth={3}
                        dot={{ fill: "#0D47A1", strokeWidth: 2, r: 4 }}
                        activeDot={{
                          r: 6,
                          fill: "#26A69A",
                          strokeWidth: 2,
                          stroke: "#fff",
                        }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-56 flex flex-col items-center justify-center text-center">
                  <Activity className="w-10 h-10 text-gray-200 mb-3" />
                  <p className="text-sm text-gray-400">
                    No revenue data available.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* ── 3. Hospital Performance Table ────────────────────────────── */}
          <section>
            <div
              className="bg-white overflow-hidden"
              style={{
                borderRadius: "16px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
              }}
            >
              <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-100">
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "10px",
                    background: "rgba(124,58,237,0.08)",
                  }}
                >
                  <Building2 className="w-4 h-4 text-purple-600" />
                </div>
                <h2
                  className="font-semibold text-gray-900"
                  style={{ fontSize: "16px" }}
                >
                  Hospital Performance
                </h2>
              </div>

              {hospitalPerformanceData.length === 0 ? (
                <div className="py-12 flex flex-col items-center justify-center text-center px-4">
                  <Building2 className="w-10 h-10 text-gray-200 mb-3" />
                  <p className="text-sm text-gray-400">
                    No hospitals available.
                  </p>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                          <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                            Hospital Name
                          </th>
                          <th className="text-right px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                            Samples
                          </th>
                          <th className="text-right px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                            Revenue
                          </th>
                          <th className="text-center px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedHospitals.map((h, idx) => (
                          <tr
                            key={h.id}
                            className={`border-b border-gray-50 last:border-0 transition-colors hover:bg-gray-50/60 ${idx % 2 === 0 ? "" : "bg-gray-50/20"}`}
                          >
                            <td className="px-5 py-3.5">
                              <div className="flex items-center gap-2.5">
                                <div
                                  className="flex items-center justify-center flex-shrink-0"
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                    borderRadius: "8px",
                                    background: "#F5F3FF",
                                  }}
                                >
                                  <Building2 className="w-3.5 h-3.5 text-purple-600" />
                                </div>
                                <span className="font-medium text-gray-800 text-sm">
                                  {h.name}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-3.5 text-right">
                              <span className="font-semibold text-gray-800">
                                {h.totalSamples}
                              </span>
                            </td>
                            <td className="px-4 py-3.5 text-right">
                              <span className="font-semibold text-gray-800">
                                {formatCurrency(h.revenue)}
                              </span>
                            </td>
                            <td className="px-4 py-3.5 text-center">
                              {h.isActive ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-100">
                                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                                  Active
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-500 border border-gray-200">
                                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 inline-block" />
                                  Inactive
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {totalHospitalPages > 1 && (
                    <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100 bg-gray-50/50">
                      <p className="text-xs text-gray-400">
                        Showing {hospitalPage * ROWS_PER_PAGE + 1}–
                        {Math.min(
                          (hospitalPage + 1) * ROWS_PER_PAGE,
                          hospitalPerformanceData.length,
                        )}{" "}
                        of {hospitalPerformanceData.length}
                      </p>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          data-ocid="dashboard.hospital_table.pagination_prev"
                          onClick={() =>
                            setHospitalPage((p) => Math.max(0, p - 1))
                          }
                          disabled={hospitalPage === 0}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-white hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        {Array.from(
                          { length: totalHospitalPages },
                          (_, i) => i,
                        ).map((pageIdx) => (
                          <button
                            type="button"
                            key={`hosp-page-btn-${pageIdx}`}
                            onClick={() => setHospitalPage(pageIdx)}
                            className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all ${
                              pageIdx === hospitalPage
                                ? "text-white shadow-sm"
                                : "text-gray-400 hover:bg-white hover:shadow-sm"
                            }`}
                            style={
                              pageIdx === hospitalPage
                                ? {
                                    background:
                                      "linear-gradient(135deg, #0D47A1, #1976D2)",
                                  }
                                : {}
                            }
                          >
                            {pageIdx + 1}
                          </button>
                        ))}
                        <button
                          type="button"
                          data-ocid="dashboard.hospital_table.pagination_next"
                          onClick={() =>
                            setHospitalPage((p) =>
                              Math.min(totalHospitalPages - 1, p + 1),
                            )
                          }
                          disabled={hospitalPage === totalHospitalPages - 1}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-white hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed transition-all"
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

          {/* ── 4. Recent Activity ───────────────────────────────────────── */}
          <section>
            <div
              className="bg-white overflow-hidden"
              style={{
                borderRadius: "16px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
              }}
            >
              <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-100">
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "10px",
                    background: "rgba(13,71,161,0.08)",
                  }}
                >
                  <Clock className="w-4 h-4 text-primary" />
                </div>
                <h2
                  className="font-semibold text-gray-900"
                  style={{ fontSize: "16px" }}
                >
                  Recent Activity
                </h2>
              </div>

              {recentActivity.length === 0 ? (
                <div className="py-12 flex flex-col items-center justify-center text-center px-4">
                  <Clock className="w-10 h-10 text-gray-200 mb-3" />
                  <p className="text-sm text-gray-400">No recent activity.</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {recentActivity.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-3 px-5 py-3.5 hover:bg-gray-50/50 transition-colors"
                    >
                      <ActivityIcon type={item.actionType} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 leading-snug">
                          {item.action}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-gray-400">
                            {item.user}
                          </span>
                          <span className="text-gray-300 text-xs">·</span>
                          <span className="text-xs text-gray-400">
                            {getRelativeTime(item.timestamp)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
