import { AppRole } from '../backend';
import type { UserProfile } from '../types/models';

export function isPatient(profile: UserProfile | null | undefined): boolean {
  return profile?.appRole === AppRole.patient;
}

export function isPhlebotomist(profile: UserProfile | null | undefined): boolean {
  return profile?.appRole === AppRole.phlebotomist;
}

export function isLabAdmin(profile: UserProfile | null | undefined): boolean {
  return profile?.appRole === AppRole.labAdmin;
}

export function isSuperAdmin(profile: UserProfile | null | undefined): boolean {
  return profile?.appRole === AppRole.superAdmin;
}

export function isAdmin(profile: UserProfile | null | undefined): boolean {
  return isLabAdmin(profile) || isSuperAdmin(profile);
}

export function isStaff(profile: UserProfile | null | undefined): boolean {
  return isPhlebotomist(profile) || isLabAdmin(profile) || isSuperAdmin(profile);
}

export function getRoleLabel(role: AppRole): string {
  switch (role) {
    case AppRole.patient: return 'Patient';
    case AppRole.phlebotomist: return 'Phlebotomist';
    case AppRole.labAdmin: return 'Lab Admin';
    case AppRole.superAdmin: return 'Super Admin';
    default: return 'Unknown';
  }
}

export function getDefaultPath(profile: UserProfile | null | undefined): string {
  if (!profile) return '/';
  switch (profile.appRole) {
    case AppRole.patient: return '/home';
    case AppRole.phlebotomist: return '/tasks';
    case AppRole.labAdmin: return '/admin/bookings';
    case AppRole.superAdmin: return '/admin/audit-logs';
    default: return '/home';
  }
}
