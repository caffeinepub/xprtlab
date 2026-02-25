import React from 'react';
import {
  ClipboardList,
  Home,
  User,
  QrCode,
  Activity,
  BookOpen,
  FileText,
  FlaskConical,
  X,
  Clock,
  Shield,
  ShieldAlert,
  BarChart3,
  CalendarCheck,
} from 'lucide-react';
import { AppRole } from '../../backend';
import type { StaffRoute } from '../../StaffApp';

interface StaffAppLayoutProps {
  children: React.ReactNode;
  currentRoute: StaffRoute;
  onNavigate: (route: StaffRoute) => void;
  userRole?: AppRole;
  isDemoMode?: boolean;
  onExitDemoMode?: () => void;
}

const phlebotomistNav = [
  { route: 'phlebotomist-attendance' as StaffRoute, icon: CalendarCheck, label: 'Attendance' },
  { route: 'tasks' as StaffRoute, icon: ClipboardList, label: 'Tasks' },
  { route: 'home-collections' as StaffRoute, icon: Home, label: 'Collections' },
  { route: 'hospital-sample-entry' as StaffRoute, icon: FlaskConical, label: 'Add Sample' },
  { route: 'profile' as StaffRoute, icon: User, label: 'Profile' },
];

const labAdminNav = [
  { route: 'admin-bookings' as StaffRoute, icon: BookOpen, label: 'Bookings' },
  { route: 'admin-reports' as StaffRoute, icon: FileText, label: 'Reports' },
  { route: 'hospital-samples' as StaffRoute, icon: FlaskConical, label: 'Samples' },
  { route: 'attendance' as StaffRoute, icon: Clock, label: 'Attendance' },
  { route: 'profile' as StaffRoute, icon: User, label: 'Profile' },
];

const superAdminNav = [
  { route: 'audit-logs' as StaffRoute, icon: BarChart3, label: 'Audit' },
  { route: 'admin-bookings' as StaffRoute, icon: BookOpen, label: 'Bookings' },
  { route: 'hospital-samples' as StaffRoute, icon: FlaskConical, label: 'Samples' },
  { route: 'attendance' as StaffRoute, icon: Clock, label: 'Attendance' },
  { route: 'security-logs' as StaffRoute, icon: ShieldAlert, label: 'Security' },
];

function getNavItems(role?: AppRole) {
  switch (role) {
    case AppRole.labAdmin:
      return labAdminNav;
    case AppRole.superAdmin:
      return superAdminNav;
    case AppRole.phlebotomist:
    default:
      return phlebotomistNav;
  }
}

function getRoleLabel(role?: AppRole) {
  switch (role) {
    case AppRole.phlebotomist: return 'Phlebotomist';
    case AppRole.labAdmin: return 'Lab Admin';
    case AppRole.superAdmin: return 'Super Admin';
    default: return 'Staff';
  }
}

function getDemoRoleEmoji(role?: AppRole) {
  switch (role) {
    case AppRole.phlebotomist: return '🩸';
    case AppRole.labAdmin: return '🔬';
    case AppRole.superAdmin: return '👑';
    default: return '👤';
  }
}

export default function StaffAppLayout({
  children,
  currentRoute,
  onNavigate,
  userRole,
  isDemoMode = false,
  onExitDemoMode,
}: StaffAppLayoutProps) {
  const navItems = getNavItems(userRole);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Demo Mode Banner */}
      {isDemoMode && (
        <div className="sticky top-0 z-50 bg-amber-500 text-white px-4 py-2 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            <FlaskConical className="w-4 h-4 flex-shrink-0" />
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold uppercase tracking-wide">Demo Mode</span>
              <span className="text-xs text-amber-100">·</span>
              <span className="text-xs text-amber-100">
                {getDemoRoleEmoji(userRole)} {getRoleLabel(userRole)} view
              </span>
            </div>
          </div>
          <button
            onClick={onExitDemoMode}
            className="flex items-center gap-1 text-xs font-semibold bg-white/20 hover:bg-white/30 active:bg-white/40 rounded-lg px-2.5 py-1 transition-colors"
          >
            <X className="w-3 h-3" />
            Exit
          </button>
        </div>
      )}

      {/* Header */}
      <header className={`sticky z-40 bg-gradient-to-r from-secondary to-primary shadow-md ${isDemoMode ? 'top-9' : 'top-0'}`}>
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-2">
            <div className="bg-white/20 rounded-lg p-1">
              <img
                src="/assets/generated/xprtlab-logo.dim_256x256.png"
                alt="XpertLab"
                className="w-7 h-7 object-contain brightness-0 invert"
              />
            </div>
            <div>
              <span className="text-white font-bold text-base leading-tight block">XpertLab</span>
              <span className="text-white/70 text-xs leading-tight block">
                {getRoleLabel(userRole)} Portal
                {isDemoMode && <span className="ml-1 text-amber-300 font-semibold">(Demo)</span>}
              </span>
            </div>
          </div>
          <button
            onClick={() => onNavigate('profile')}
            className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <User className="w-4 h-4 text-white" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border shadow-lg">
        {isDemoMode && (
          <div className="bg-amber-50 border-b border-amber-200 px-3 py-0.5 text-center">
            <span className="text-[10px] text-amber-700 font-medium">⚠️ Demo — read-only, no data saved</span>
          </div>
        )}
        <div className="flex items-center justify-around h-16 px-1 max-w-lg mx-auto">
          {navItems.map(({ route, icon: Icon, label }) => {
            const isActive = currentRoute === route;
            return (
              <button
                key={route}
                onClick={() => onNavigate(route)}
                className={`flex flex-col items-center gap-0.5 px-2 py-2 rounded-xl transition-all duration-200 min-w-0 flex-1 ${
                  isActive
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-primary' : ''}`} />
                <span className={`text-[10px] font-medium truncate w-full text-center ${isActive ? 'text-primary' : ''}`}>
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
