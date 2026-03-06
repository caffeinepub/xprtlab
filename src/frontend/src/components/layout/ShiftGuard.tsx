import { Button } from "@/components/ui/button";
import { Clock, Loader2 } from "lucide-react";
import type React from "react";
import { useActor } from "../../hooks/useActor";
import { useInternetIdentity } from "../../hooks/useInternetIdentity";

interface ShiftGuardProps {
  children: React.ReactNode;
  onNavigate?: (page: string) => void;
}

/**
 * ShiftGuard wraps phlebotomist routes that require an active shift.
 * Since shift state is managed locally in PhlebotomistAttendancePage,
 * this guard simply ensures auth + actor are ready before rendering children.
 * It no longer blocks on "no active shift" since the backend has no getActiveShift method.
 */
export default function ShiftGuard({
  children,
  onNavigate: _onNavigate,
}: ShiftGuardProps) {
  const { isFetching: actorFetching } = useActor();
  const { isInitializing, identity } = useInternetIdentity();

  const isLoading = isInitializing || actorFetching;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-muted-foreground text-sm">Loading...</p>
      </div>
    );
  }

  if (!identity) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 p-6 text-center">
        <Clock className="w-12 h-12 text-muted-foreground" />
        <h2 className="text-lg font-semibold">Authentication Required</h2>
        <p className="text-muted-foreground text-sm">
          Please log in to access this page.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
