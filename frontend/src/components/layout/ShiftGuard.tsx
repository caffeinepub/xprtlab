import React, { useEffect } from 'react';
import { Loader2, CalendarCheck, LogIn } from 'lucide-react';
import { AppRole } from '../../backend';
import { useGetActiveShift, useGetCallerUserProfile } from '../../hooks/useQueries';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import type { StaffRoute } from '../../StaffApp';

interface ShiftGuardProps {
  children: React.ReactNode;
  onNavigate: (route: StaffRoute) => void;
  userRole?: AppRole;
}

/**
 * ShiftGuard wraps phlebotomist-only routes (excluding /attendance itself).
 * If the current user is a phlebotomist with no active shift, it blocks
 * rendering and redirects to the attendance page.
 * Lab Admin and Super Admin users pass through freely.
 */
export default function ShiftGuard({ children, onNavigate, userRole }: ShiftGuardProps) {
  const { identity } = useInternetIdentity();
  const phlebotomistId = identity?.getPrincipal().toString() || '';

  // Only enforce shift gate for phlebotomist role
  const isPhlebotomist = userRole === AppRole.phlebotomist;

  const { data: activeShift, isLoading: shiftLoading } = useGetActiveShift(
    isPhlebotomist ? phlebotomistId : '',
  );

  const hasActiveShift = activeShift?.status === 'ACTIVE';

  // Auto-redirect if no active shift
  useEffect(() => {
    if (isPhlebotomist && !shiftLoading && !hasActiveShift && phlebotomistId) {
      onNavigate('phlebotomist-attendance');
    }
  }, [isPhlebotomist, shiftLoading, hasActiveShift, phlebotomistId, onNavigate]);

  // Non-phlebotomist roles pass through freely
  if (!isPhlebotomist) {
    return <>{children}</>;
  }

  // Loading state
  if (shiftLoading) {
    return (
      <div className="px-4 py-8 flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary mb-3" />
        <p className="text-sm text-muted-foreground">Checking shift status...</p>
      </div>
    );
  }

  // No active shift — show gate screen
  if (!hasActiveShift) {
    return (
      <div className="px-4 py-8 flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
          <CalendarCheck className="w-10 h-10 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-bold text-foreground text-center">Shift Required</h2>
        <p className="text-sm text-muted-foreground text-center max-w-xs">
          You must start your shift before accessing this feature.
        </p>
        <button
          onClick={() => onNavigate('phlebotomist-attendance')}
          className="gradient-btn px-6 py-3 text-sm font-semibold flex items-center gap-2"
        >
          <LogIn className="w-4 h-4" />
          Go to Attendance
        </button>
      </div>
    );
  }

  // Active shift — render children
  return <>{children}</>;
}
