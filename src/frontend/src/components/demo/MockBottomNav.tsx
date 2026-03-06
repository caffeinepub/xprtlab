import { cn } from "@/lib/utils";
import {
  BarChart3,
  Calendar,
  CalendarCheck,
  ClipboardList,
  Clock,
  FileText,
  FlaskConical,
  Home,
  MapPin,
  Shield,
  ShieldAlert,
  User,
} from "lucide-react";
import type React from "react";
import type { AppRole } from "../../types/models";

const iconMap: Record<string, React.ReactNode> = {
  Home: <Home className="h-4 w-4" />,
  FlaskConical: <FlaskConical className="h-4 w-4" />,
  MapPin: <MapPin className="h-4 w-4" />,
  FileText: <FileText className="h-4 w-4" />,
  User: <User className="h-4 w-4" />,
  ClipboardList: <ClipboardList className="h-4 w-4" />,
  CalendarCheck: <CalendarCheck className="h-4 w-4" />,
  Clock: <Clock className="h-4 w-4" />,
  Shield: <Shield className="h-4 w-4" />,
  BarChart3: <BarChart3 className="h-4 w-4" />,
  Calendar: <Calendar className="h-4 w-4" />,
  ShieldAlert: <ShieldAlert className="h-4 w-4" />,
};

interface NavItem {
  label: string;
  path: string;
  icon: string;
}

interface MockBottomNavProps {
  navItems: NavItem[];
  activeItem?: string;
  onItemClick?: (path: string) => void;
  userRole?: AppRole | string;
}

export default function MockBottomNav({
  navItems,
  activeItem,
  onItemClick,
}: MockBottomNavProps) {
  return (
    <div
      className="flex items-center justify-around rounded-2xl px-2 py-2 w-full"
      style={{
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 6px 14px rgba(0,0,0,0.12)",
      }}
    >
      {navItems.map((item) => {
        const isActive = activeItem === item.path;
        return (
          <button
            type="button"
            key={item.path}
            onClick={() => onItemClick?.(item.path)}
            className={cn(
              "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 min-w-0",
              isActive
                ? "bg-primary text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <span>{iconMap[item.icon] || <User className="h-4 w-4" />}</span>
            <span className="text-[10px] font-semibold leading-tight truncate max-w-[56px]">
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
