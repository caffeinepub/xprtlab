import React, { useState, useEffect } from 'react';
import { Heart, FlaskConical, Home, FileText, Activity, User } from 'lucide-react';

type PatientRoute =
  | 'home'
  | 'book-test'
  | 'slot-selection'
  | 'my-bookings'
  | 'home-collection'
  | 'my-home-collections'
  | 'reports'
  | 'my-vitals'
  | 'profile';

interface PatientAppLayoutProps {
  children: React.ReactNode;
  currentRoute: PatientRoute;
  onNavigate: (route: PatientRoute) => void;
}

const navItems = [
  { route: 'home' as PatientRoute, icon: Home, label: 'Home' },
  { route: 'book-test' as PatientRoute, icon: FlaskConical, label: 'Book Test' },
  { route: 'my-bookings' as PatientRoute, icon: FileText, label: 'Bookings' },
  { route: 'reports' as PatientRoute, icon: Activity, label: 'Reports' },
  { route: 'profile' as PatientRoute, icon: User, label: 'Profile' },
];

export default function PatientAppLayout({ children, currentRoute, onNavigate }: PatientAppLayoutProps) {
  const [activeRoute, setActiveRoute] = useState<PatientRoute>(currentRoute);

  useEffect(() => {
    setActiveRoute(currentRoute);
  }, [currentRoute]);

  const handleNavigate = (route: PatientRoute) => {
    setActiveRoute(route);
    onNavigate(route);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-primary to-accent shadow-md">
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
              <span className="text-white/70 text-xs leading-tight block">Patient Portal</span>
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
      <main className="flex-1 overflow-y-auto" style={{ paddingBottom: 'calc(80px + 16px + env(safe-area-inset-bottom, 0px))' }}>
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
        <div className="flex items-center justify-around h-16 px-2">
          {navItems.map(({ route, icon: Icon, label }) => {
            const isActive = activeRoute === route;
            return (
              <button
                key={route}
                onClick={() => handleNavigate(route)}
                className="floating-nav-item"
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
