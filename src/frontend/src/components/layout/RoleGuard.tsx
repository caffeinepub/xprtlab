import type React from "react";
import type { AppRole } from "../../types/models";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: AppRole[];
  userRole?: AppRole | string;
  fallback?: React.ReactNode;
}

export default function RoleGuard({
  children,
  allowedRoles,
  userRole,
  fallback,
}: RoleGuardProps) {
  if (!userRole || !allowedRoles.includes(userRole as AppRole)) {
    if (fallback) return <>{fallback}</>;
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center space-y-3">
        <p className="text-base font-semibold text-foreground">Access Denied</p>
        <p className="text-sm text-muted-foreground">
          You don't have permission to view this page.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
