import React, { useEffect } from 'react';
import { useGetActiveShift } from '../../hooks/useQueries';
import { Loader2 } from 'lucide-react';

interface ShiftGuardProps {
  children: React.ReactNode;
  userRole?: string;
  onNavigate?: (route: string) => void;
}

export default function ShiftGuard({ children, userRole, onNavigate }: ShiftGuardProps) {
  const isPhlebotomist = userRole === 'phlebotomist';
  const isAdmin = userRole === 'labAdmin' || userRole === 'superAdmin';

  // Admins bypass the shift guard
  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <ShiftGuardInner onNavigate={onNavigate} isPhlebotomist={isPhlebotomist}>
      {children}
    </ShiftGuardInner>
  );
}

interface ShiftGuardInnerProps {
  children: React.ReactNode;
  onNavigate?: (route: string) => void;
  isPhlebotomist: boolean;
}

function ShiftGuardInner({ children, onNavigate, isPhlebotomist }: ShiftGuardInnerProps) {
  const { data: activeShift, isLoading } = useGetActiveShift();

  useEffect(() => {
    if (!isLoading && isPhlebotomist && !activeShift && onNavigate) {
      onNavigate('phlebotomist-attendance');
    }
  }, [isLoading, activeShift, isPhlebotomist, onNavigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isPhlebotomist && !activeShift) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center space-y-3">
        <p className="text-base font-semibold text-foreground">No active shift</p>
        <p className="text-sm text-muted-foreground">Please start your shift from the Attendance page.</p>
      </div>
    );
  }

  return <>{children}</>;
}
