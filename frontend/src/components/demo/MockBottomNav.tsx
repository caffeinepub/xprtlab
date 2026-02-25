import React, { useState } from 'react';
import {
  Home,
  FlaskConical,
  FileText,
  User,
  ClipboardList,
  QrCode,
  Calendar,
  Shield,
  LayoutDashboard,
  CheckSquare,
  Activity,
  Clock,
  ShieldAlert,
  BarChart3,
  CalendarCheck,
} from 'lucide-react';
import { AppRole } from '../../backend';
import { roleNavConfig } from '../../utils/roleConfig';

interface MockBottomNavProps {
  role: AppRole;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Home,
  FlaskConical,
  FileText,
  User,
  ClipboardList,
  CheckSquare,
  QrCode,
  Calendar,
  Shield,
  LayoutDashboard,
  Activity,
  Clock,
  ShieldAlert,
  BarChart3,
  CalendarCheck,
};

export default function MockBottomNav({ role }: MockBottomNavProps) {
  const navItems = roleNavConfig[role] || [];
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative">
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-md">
        <div className="bg-amber-50 border-b border-amber-200 px-3 py-1 text-center">
          <span className="text-[10px] text-amber-700 font-medium">⚠️ Demo preview only</span>
        </div>
        <div className="flex items-center justify-around h-16 px-1">
          {navItems.map((item, index) => {
            const isActive = index === activeIndex;
            const IconComponent = iconMap[item.iconName] || Home;
            return (
              <button
                key={item.path + item.label}
                onClick={() => setActiveIndex(index)}
                title="Demo only — no navigation"
                className={`flex flex-col items-center gap-0.5 px-2 py-2 rounded-xl transition-all duration-200 min-w-0 flex-1 ${
                  isActive
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <IconComponent className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-primary' : ''}`} />
                <span className={`text-[10px] font-medium truncate w-full text-center ${isActive ? 'text-primary' : ''}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
