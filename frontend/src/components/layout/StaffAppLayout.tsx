import React from 'react';
import {
  ClipboardList, Home, Upload, AlertTriangle, BarChart3,
  User, QrCode, Activity, BookOpen, FileText, Shield, PlusCircle
} from 'lucide-react';
import { AppRole } from '../../backend';

type StaffRoute =
  | 'tasks'
  | 'home-collections'
  | 'record-vitals'
  | 'scan-qr'
  | 'admin-bookings'
  | 'admin-reports'
  | 'upload-report'
  | 'incidents'
  | 'audit-logs'
  | 'create-camp'
  | 'submit-incident'
  | 'profile';

interface StaffAppLayoutProps {
  children: React.ReactNode;
  currentRoute: StaffRoute;
  onNavigate: (route: StaffRoute) => void;
  userRole?: AppRole;
}

const phlebotomistNav = [
  { route: 'tasks' as StaffRoute, icon: ClipboardList, label: 'Tasks' },
  { route: 'home-collections' as StaffRoute, icon: Home, label: 'Collections' },
  { route: 'record-vitals' as StaffRoute, icon: Activity, label: 'Vitals' },
  { route: 'scan-qr' as StaffRoute, icon: QrCode, label: 'Scan QR' },
  { route: 'profile' as StaffRoute, icon: User, label: 'Profile' },
];

const labAdminNav = [
  { route: 'admin-bookings' as StaffRoute, icon: BookOpen, label: 'Bookings' },
  { route: 'admin-reports' as StaffRoute, icon: FileText, label: 'Reports' },
  { route: 'upload-report' as StaffRoute, icon: Upload, label: 'Upload' },
  { route: 'incidents' as StaffRoute, icon: AlertTriangle, label: 'Incidents' },
  { route: 'profile' as StaffRoute, icon: User, label: 'Profile' },
];

const superAdminNav = [
  { route: 'audit-logs' as StaffRoute, icon: BarChart3, label: 'Audit' },
  { route: 'admin-bookings' as StaffRoute, icon: BookOpen, label: 'Bookings' },
  { route: 'incidents' as StaffRoute, icon: AlertTriangle, label: 'Incidents' },
  { route: 'create-camp' as StaffRoute, icon: PlusCircle, label: 'Camps' },
  { route: 'profile' as StaffRoute, icon: User, label: 'Profile' },
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

export default function StaffAppLayout({ children, currentRoute, onNavigate, userRole }: StaffAppLayoutProps) {
  const navItems = getNavItems(userRole);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-secondary to-primary shadow-md">
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
              <span className="text-white/70 text-xs leading-tight block">{getRoleLabel(userRole)} Portal</span>
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
        <div className="flex items-center justify-around h-16 px-2 max-w-lg mx-auto">
          {navItems.map(({ route, icon: Icon, label }) => {
            const isActive = currentRoute === route;
            return (
              <button
                key={route}
                onClick={() => onNavigate(route)}
                className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all duration-200 min-w-0 flex-1 ${
                  isActive
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-primary' : ''}`} />
                <span className={`text-xs font-medium truncate ${isActive ? 'text-primary' : ''}`}>
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
