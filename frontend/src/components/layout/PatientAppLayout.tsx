import React from 'react';
import { Heart, FlaskConical, Home, FileText, Activity, User, ChevronLeft } from 'lucide-react';

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
