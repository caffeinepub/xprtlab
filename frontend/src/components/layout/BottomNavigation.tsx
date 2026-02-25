import React from 'react';
import { cn } from '@/lib/utils';
import { AppRole } from '../../types/models';
import {
  Home, FlaskConical, MapPin, FileText, User, ClipboardList,
  CalendarCheck, Shield, BarChart3, Calendar, ShieldAlert
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Home: <Home className="h-4 w-4" />,
  FlaskConical: <FlaskConical className="h-4 w-4" />,
  MapPin: <MapPin className="h-4 w-4" />,
  FileText: <FileText className="h-4 w-4" />,
  User: <User className="h-4 w-4" />,
  ClipboardList: <ClipboardList className="h-4 w-4" />,
  CalendarCheck: <CalendarCheck className="h-4 w-4" />,
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

interface BottomNavigationProps {
  navItems: NavItem[];
  currentPath: string;
  onNavigate: (path: string) => void;
  userRole?: AppRole | string;
}

export default function BottomNavigation({ navItems, currentPath, onNavigate }: BottomNavigationProps) {
  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md">
      <div
        className="flex items-center justify-around rounded-2xl px-2 py-2"
        style={{
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: '0 6px 14px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)',
        }}
      >
        {navItems.map((item) => {
          const isActive = currentPath === item.path;
          return (
            <button
              key={item.path}
              onClick={() => onNavigate(item.path)}
              className={cn(
                'flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 min-w-0',
                isActive
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <span className="text-base">{iconMap[item.icon] || <User className="h-4 w-4" />}</span>
              <span className="text-[10px] font-semibold leading-tight truncate max-w-[56px]">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
