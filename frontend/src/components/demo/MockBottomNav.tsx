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
} from 'lucide-react';
import { AppRole } from '../../backend';
import { roleNavConfig } from '../../utils/roleConfig';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const iconMap: Record<string, React.ReactNode> = {
  Home: <Home className="w-5 h-5" />,
  FlaskConical: <FlaskConical className="w-5 h-5" />,
  FileText: <FileText className="w-5 h-5" />,
  User: <User className="w-5 h-5" />,
  ClipboardList: <ClipboardList className="w-5 h-5" />,
  CheckSquare: <CheckSquare className="w-5 h-5" />,
  QrCode: <QrCode className="w-5 h-5" />,
  Calendar: <Calendar className="w-5 h-5" />,
  Shield: <Shield className="w-5 h-5" />,
  LayoutDashboard: <LayoutDashboard className="w-5 h-5" />,
  Activity: <Activity className="w-5 h-5" />,
};

interface MockBottomNavProps {
  role: AppRole;
}

export default function MockBottomNav({ role }: MockBottomNavProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const navItems = roleNavConfig[role] || [];

  return (
    <TooltipProvider>
      <div className="bg-card border border-border rounded-2xl shadow-card overflow-hidden">
        {/* Phone frame top bar */}
        <div className="flex items-center justify-center gap-1.5 py-2 border-b border-border bg-muted/30">
          <div className="w-12 h-1 rounded-full bg-muted-foreground/30" />
        </div>

        {/* Mock screen content area */}
        <div className="h-20 bg-gradient-to-br from-muted/20 to-muted/40 flex items-center justify-center">
          <p className="text-xs text-muted-foreground italic">App screen content</p>
        </div>

        {/* Mock bottom nav */}
        <nav className="bg-card border-t border-border">
          <div className="flex items-center justify-around px-2 py-2">
            {navItems.map((item, idx) => {
              const isActive = idx === activeIndex;
              return (
                <Tooltip key={item.path + item.label}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setActiveIndex(idx)}
                      className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all ${
                        isActive
                          ? 'text-white'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                      style={
                        isActive
                          ? { background: 'linear-gradient(135deg, #0D47A1 0%, #26C6DA 100%)' }
                          : {}
                      }
                    >
                      {iconMap[item.iconName] || <Home className="w-5 h-5" />}
                      <span className="text-[10px] font-medium">{item.label}</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p className="text-xs">Demo only — navigates to {item.path}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </nav>
      </div>
    </TooltipProvider>
  );
}
