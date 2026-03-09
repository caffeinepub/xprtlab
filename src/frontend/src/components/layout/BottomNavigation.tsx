import {
  Banknote,
  BarChart3,
  Building2,
  CalendarCheck,
  CalendarDays,
  ClipboardList,
  Clock,
  FileText,
  FlaskConical,
  Home,
  LayoutDashboard,
  MapPin,
  Package,
  ShieldAlert,
  TestTube,
  TrendingUp,
  User,
} from "lucide-react";
import type React from "react";

export interface NavItem {
  label: string;
  path: string;
  icon: string;
  badgeCount?: number;
}

interface BottomNavigationProps {
  items: NavItem[];
  currentPath: string;
  onNavigate: (path: string) => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Home,
  ClipboardList,
  MapPin,
  FileText,
  User,
  FlaskConical,
  Package,
  CalendarDays,
  TestTube,
  Building2,
  BarChart3,
  CalendarCheck,
  Clock,
  ShieldAlert,
  LayoutDashboard,
  Banknote,
  TrendingUp,
};

export default function BottomNavigation({
  items,
  currentPath,
  onNavigate,
}: BottomNavigationProps) {
  return (
    <nav
      className="bottom-nav flex items-stretch"
      style={{
        background: "#FFFFFF",
        borderTop: "1px solid #E5E7EB",
        boxShadow: "0 -8px 25px rgba(0,0,0,0.08)",
        height: "70px",
      }}
    >
      {items.map((item) => {
        const isActive = currentPath === item.path;
        const IconComponent = iconMap[item.icon] ?? Home;

        return (
          <button
            type="button"
            key={item.path}
            data-ocid={`nav.${item.path.replace(/\//g, "")}.tab`}
            onClick={() => onNavigate(item.path)}
            className="flex-1 flex flex-col items-center justify-center py-2 px-1 relative transition-all duration-200"
            style={{
              color: isActive ? "#0D47A1" : "#9CA3AF",
            }}
          >
            {/* Pill highlight for active tab */}
            {isActive && (
              <span
                className="absolute inset-x-2 top-1 bottom-1 rounded-xl"
                style={{
                  background: "rgba(13,71,161,0.07)",
                  zIndex: 0,
                }}
              />
            )}

            {/* Icon with badge */}
            <span
              className="relative flex items-center justify-center transition-all duration-200"
              style={{
                transform: isActive ? "scale(1.1)" : "scale(1)",
                zIndex: 1,
              }}
            >
              <IconComponent className="w-[22px] h-[22px]" />
              {item.badgeCount != null && item.badgeCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 px-0.5 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center leading-none">
                  {item.badgeCount > 99 ? "99+" : item.badgeCount}
                </span>
              )}
            </span>

            <span
              className="mt-0.5 leading-tight transition-all duration-200"
              style={{
                fontSize: "11px",
                fontWeight: isActive ? 700 : 500,
                zIndex: 1,
              }}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
