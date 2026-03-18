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
  Settings,
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
  Settings,
};

export default function BottomNavigation({
  items,
  currentPath,
  onNavigate,
}: BottomNavigationProps) {
  return (
    <nav
      style={{
        background: "#FFFFFF",
        borderTop: "1px solid #E5E7EB",
        boxShadow: "0 -8px 32px rgba(37,99,235,0.10)",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
        height: "70px",
        zIndex: 100,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
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
            style={{
              flex: 1,
              color: isActive ? "#FFFFFF" : "#9CA3AF",
              background: "none",
              border: "none",
              cursor: "pointer",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "8px 4px",
              position: "relative",
              transition: "all 200ms ease",
            }}
          >
            {/* Gradient pill highlight for active tab */}
            {isActive && (
              <span
                style={{
                  position: "absolute",
                  left: "8px",
                  right: "8px",
                  top: "4px",
                  bottom: "4px",
                  borderRadius: "14px",
                  background: "linear-gradient(135deg, #2563EB, #06B6D4)",
                  zIndex: 0,
                  transition: "all 200ms ease",
                  boxShadow: "0 4px 12px rgba(37,99,235,0.30)",
                }}
              />
            )}

            {/* Icon with badge */}
            <span
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: isActive ? "scale(1.08)" : "scale(1)",
                zIndex: 1,
                transition: "transform 200ms ease",
              }}
            >
              <IconComponent className="w-[22px] h-[22px]" />
              {item.badgeCount != null && item.badgeCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-6px",
                    right: "-6px",
                    minWidth: "16px",
                    height: "16px",
                    padding: "0 2px",
                    borderRadius: "999px",
                    background: "#EF4444",
                    color: "white",
                    fontSize: "9px",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    lineHeight: 1,
                  }}
                >
                  {item.badgeCount > 99 ? "99+" : item.badgeCount}
                </span>
              )}
            </span>

            <span
              style={{
                marginTop: "2px",
                fontSize: "12px",
                fontWeight: isActive ? 700 : 500,
                lineHeight: 1.2,
                zIndex: 1,
                transition: "all 200ms ease",
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
