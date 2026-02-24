import React from 'react';
import { Outlet, useNavigate } from '@tanstack/react-router';
import BottomNavigation from './BottomNavigation';
import NotificationBell from './NotificationBell';
import { useAuth } from '../../hooks/useAuth';

export default function AppLayout() {
  const { userProfile } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background max-w-md mx-auto relative">
      {/* App Bar */}
      <header className="gradient-primary sticky top-0 z-40 shadow-gradient-glow">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => navigate({ to: '/' })}
            className="flex items-center gap-2"
          >
            <img
              src="/assets/generated/logo.png"
              alt="XpertLab"
              className="h-9 w-auto object-contain"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </button>

          <div className="flex items-center gap-2">
            <NotificationBell />
            {userProfile && (
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-white text-xs font-bold">
                  {userProfile.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
