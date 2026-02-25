import React, { useState, useEffect } from 'react';
import {
  ClipboardList,
  Home,
  User,
  BookOpen,
  FileText,
  FlaskConical,
  X,
  Clock,
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
  const [activeRoute, setActiveRoute] = useState<StaffRoute>(currentRoute);

  useEffect(() => {
    setActiveRoute(currentRoute);
  }, [currentRoute]);

  const handleNavigate = (route: StaffRoute) => {
    setActiveRoute(route);
    onNavigate(route);
  };

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
            onClick={() => handleNavigate('profile')}
            className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <User className="w-4 h-4 text-white" />
          </button>
        </div>
      </header>

      {/* Main Content — extra bottom padding to clear the floating nav */}
      <main
        className="flex-1 overflow-y-auto"
        style={{ paddingBottom: 'calc(80px + 16px + env(safe-area-inset-bottom, 0px))' }}
      >
        {children}
      </main>

      {/* Floating Bottom Navigation */}
      <nav
        className="floating-bottom-nav"
        style={{
          position: 'fixed',
          bottom: 'calc(14px + env(safe-area-inset-bottom, 0px))',
          left: '18px',
          right: '18px',
          zIndex: 50,
          borderRadius: '24px',
          background: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.35)',
          boxShadow: '0 6px 24px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)',
          willChange: 'transform',
        }}
      >
        {isDemoMode && (
          <div
            style={{
              background: 'rgba(251, 191, 36, 0.15)',
              borderBottom: '1px solid rgba(251, 191, 36, 0.3)',
              padding: '3px 12px',
              textAlign: 'center',
              borderRadius: '24px 24px 0 0',
            }}
          >
            <span style={{ fontSize: '10px', color: '#92400e', fontWeight: 500 }}>
              ⚠️ Demo — read-only, no data saved
            </span>
          </div>
        )}
        <div className="flex items-center justify-around h-16 px-2">
          {navItems.map(({ route, icon: Icon, label }) => {
            const isActive = activeRoute === route;
            return (
              <button
                key={route}
                onClick={() => handleNavigate(route)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '2px',
                  flex: 1,
                  minWidth: 0,
                  padding: '6px 4px',
                  borderRadius: '16px',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  transform: isActive ? 'scale(1.08)' : 'scale(1)',
                  outline: 'none',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '2px',
                    padding: isActive ? '6px 14px' : '6px 8px',
                    borderRadius: '14px',
                    background: isActive
                      ? 'linear-gradient(135deg, #0D47A1 0%, #26C6DA 100%)'
                      : 'transparent',
                    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                    minWidth: isActive ? '56px' : 'auto',
                  }}
                >
                  <Icon
                    style={{
                      width: '20px',
                      height: '20px',
                      flexShrink: 0,
                      color: isActive ? '#ffffff' : '#94A3B8',
                      transition: 'color 0.25s ease',
                    }}
                  />
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 600,
                      color: isActive ? '#ffffff' : '#94A3B8',
                      transition: 'color 0.25s ease',
                      whiteSpace: 'nowrap',
                      lineHeight: 1.2,
                    }}
                  >
                    {label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
