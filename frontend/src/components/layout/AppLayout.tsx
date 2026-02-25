import React from 'react';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

interface AppLayoutProps {
  children: React.ReactNode;
  onNavigate?: (route: string) => void;
  currentPath?: string;
  navItems?: NavItem[];
}

export default function AppLayout({
  children,
  onNavigate,
  currentPath,
  navItems,
}: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-primary to-primary/80 shadow-md">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-2">
            <img
              src="/assets/generated/xprtlab-logo.dim_256x256.png"
              alt="XprtLab"
              className="h-9 w-auto object-contain"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={cn('flex-1', navItems && navItems.length > 0 ? 'pb-24' : '')}>
        {children}
      </main>

      {/* Floating Bottom Navigation */}
      {navItems && navItems.length > 0 && onNavigate && (
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
                  <span className="text-base">{item.icon}</span>
                  <span className="text-[10px] font-semibold leading-tight truncate max-w-[56px]">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
}
