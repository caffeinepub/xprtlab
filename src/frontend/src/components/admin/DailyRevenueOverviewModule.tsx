import {
  Calendar,
  CalendarDays,
  Clock,
  IndianRupee,
  Tag,
  TrendingUp,
} from "lucide-react";
import type React from "react";
import { useMemo } from "react";
import { type DemoSample, getDemoSamples } from "../../utils/demoStorage";

interface DailyRevenueOverviewModuleProps {
  isDemoMode?: boolean;
}

interface RevenueMetrics {
  revenueToday: number;
  revenueThisWeek: number;
  revenueThisMonth: number;
  pendingCollections: number;
  totalDiscountsGiven: number;
}

function computeMetrics(samples: DemoSample[]): RevenueMetrics {
  const _now = Date.now();
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const todayMs = startOfToday.getTime();

  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  const weekMs = startOfWeek.getTime();

  const startOfMonth = new Date();
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
    totalDiscountsGiven,
  };
}

function formatCurrency(amount: number): string {
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`;
  }
  if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1)}K`;
  }
  return `₹${amount.toLocaleString("en-IN")}`;
}

interface MetricCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  gradient: string;
  iconBg: string;
}

function MetricCard({
  title,
  value,
  subtitle,
  icon,
  gradient,
  iconBg,
}: MetricCardProps) {
  return (
    <div className={`premium-card p-5 ${gradient} relative overflow-hidden`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
          <p className="text-xs text-gray-400">{subtitle}</p>
        </div>
        <div
          className={`w-11 h-11 rounded-xl ${iconBg} flex items-center justify-center shadow-sm flex-shrink-0`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

export default function DailyRevenueOverviewModule({
  isDemoMode = false,
}: DailyRevenueOverviewModuleProps) {
  const metrics = useMemo<RevenueMetrics>(() => {
    if (isDemoMode) {
      const samples = getDemoSamples();
      return computeMetrics(samples);
    }
    // Live mode: return zeros (backend integration would go here)
    return {
      revenueToday: 0,
      revenueThisWeek: 0,
      revenueThisMonth: 0,
      pendingCollections: 0,
      totalDiscountsGiven: 0,
    };
  }, [isDemoMode]);

  const cards: MetricCardProps[] = [
    {
      title: "Revenue Today",
      value: formatCurrency(metrics.revenueToday),
      subtitle: "Today's total billing",
      icon: <IndianRupee className="w-5 h-5 text-blue-600" />,
      gradient: "bg-gradient-to-br from-blue-50 to-white",
      iconBg: "bg-blue-100",
    },
    {
      title: "Revenue This Week",
      value: formatCurrency(metrics.revenueThisWeek),
      subtitle: "Current week total",
      icon: <Calendar className="w-5 h-5 text-indigo-600" />,
      gradient: "bg-gradient-to-br from-indigo-50 to-white",
      iconBg: "bg-indigo-100",
    },
    {
      title: "Revenue This Month",
      value: formatCurrency(metrics.revenueThisMonth),
      subtitle: "Current month total",
      icon: <CalendarDays className="w-5 h-5 text-violet-600" />,
      gradient: "bg-gradient-to-br from-violet-50 to-white",
      iconBg: "bg-violet-100",
    },
    {
      title: "Pending Collections",
      value: formatCurrency(metrics.pendingCollections),
      subtitle: "Awaiting payment",
      icon: <Clock className="w-5 h-5 text-amber-600" />,
      gradient: "bg-gradient-to-br from-amber-50 to-white",
      iconBg: "bg-amber-100",
    },
    {
      title: "Total Discounts Given",
      value: formatCurrency(metrics.totalDiscountsGiven),
      subtitle: "All-time discounts",
      icon: <Tag className="w-5 h-5 text-rose-600" />,
      gradient: "bg-gradient-to-br from-rose-50 to-white",
      iconBg: "bg-rose-100",
    },
  ];

  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <TrendingUp className="w-5 h-5 text-brand-start" />
        <h2 className="text-lg font-bold text-gray-900">
          Daily Revenue Overview
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {cards.map((card) => (
          <MetricCard key={card.title} {...card} />
        ))}
      </div>

      {!isDemoMode && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-xl text-sm text-blue-600 text-center">
          Connect to live backend to see real revenue data.
        </div>
      )}
    </div>
  );
}
