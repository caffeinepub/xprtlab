import type React from "react";

interface ShiftGuardProps {
  children: React.ReactNode;
  onNavigate?: (page: string) => void;
}

/**
 * ShiftGuard wraps phlebotomist routes that require an active shift.
 * Internet Identity has been removed — this guard simply renders its
 * children immediately without any auth-based loading state.
 */
export default function ShiftGuard({
  children,
  onNavigate: _onNavigate,
}: ShiftGuardProps) {
  return <>{children}</>;
}
