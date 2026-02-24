import React from 'react';
import { Navigate } from '@tanstack/react-router';
import { AppRole } from '../../backend';
import { useAuth } from '../../hooks/useAuth';
import { getDefaultPath } from '../../utils/roleConfig';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: AppRole[];
}

export default function RoleGuard({ children, allowedRoles }: RoleGuardProps) {
  const { userProfile, isAuthenticated } = useAuth();

  if (!isAuthenticated || !userProfile) {
    return <Navigate to="/" />;
  }

  if (!allowedRoles.includes(userProfile.appRole)) {
    const defaultPath = getDefaultPath(userProfile.appRole);
    return <Navigate to={defaultPath} />;
  }

  return <>{children}</>;
}
