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
    <nav className="bottom-nav fixed bottom-0 left-0 right-0 z-50 flex items-stretch">
      {items.map((item) => {
        const isActive = currentPath === item.path;
        const IconComponent = iconMap[item.icon] ?? Home;

        return (
          <button
            type="button"
            key={item.path}
            onClick={() => onNavigate(item.path)}
            className={`flex-1 flex flex-col items-center justify-center py-2 px-1 relative transition-all duration-200 ${
              isActive
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {/* Active indicator */}
            {isActive && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-gradient-brand" />
            )}

            {/* Icon with badge */}
            <span className="relative">
              <IconComponent
                className={`w-5 h-5 transition-all duration-200 ${isActive ? "scale-110" : ""}`}
              />
              {item.badgeCount != null && item.badgeCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 px-0.5 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center leading-none">
                  {item.badgeCount > 99 ? "99+" : item.badgeCount}
                </span>
              )}
            </span>

            <span
              className={`text-[10px] mt-0.5 font-medium leading-tight transition-all duration-200 ${
                isActive ? "font-semibold" : ""
              }`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
