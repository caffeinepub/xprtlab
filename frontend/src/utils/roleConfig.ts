import { AppRole } from '../backend';

export interface NavItem {
  label: string;
  path: string;
  iconName: string;
}

export const roleNavConfig: Record<AppRole, NavItem[]> = {
  [AppRole.patient]: [
    { label: 'Home', path: '/home', iconName: 'Home' },
    { label: 'Book Test', path: '/book-test', iconName: 'FlaskConical' },
    { label: 'Reports', path: '/reports', iconName: 'FileText' },
    { label: 'Profile', path: '/profile', iconName: 'User' },
  ],
  [AppRole.phlebotomist]: [
    { label: 'Attendance', path: '/phlebotomist-attendance', iconName: 'CalendarCheck' },
    { label: 'Tasks', path: '/tasks', iconName: 'ClipboardList' },
    { label: 'Collections', path: '/home-collections', iconName: 'Home' },
    { label: 'Add Sample', path: '/hospital-sample-entry', iconName: 'FlaskConical' },
    { label: 'Profile', path: '/profile', iconName: 'User' },
  ],
  [AppRole.labAdmin]: [
    { label: 'Bookings', path: '/admin/bookings', iconName: 'Calendar' },
    { label: 'Reports', path: '/admin/reports', iconName: 'FileText' },
    { label: 'Samples', path: '/admin/hospital-samples', iconName: 'FlaskConical' },
    { label: 'Attendance', path: '/admin/attendance', iconName: 'Clock' },
    { label: 'Profile', path: '/profile', iconName: 'User' },
  ],
  [AppRole.superAdmin]: [
    { label: 'Bookings', path: '/admin/bookings', iconName: 'Calendar' },
    { label: 'Audit', path: '/admin/audit-logs', iconName: 'Shield' },
    { label: 'Samples', path: '/admin/hospital-samples', iconName: 'FlaskConical' },
    { label: 'Attendance', path: '/admin/attendance', iconName: 'Clock' },
    { label: 'Security', path: '/admin/security-logs', iconName: 'ShieldAlert' },
  ],
};

export function getDefaultPath(role: AppRole): string {
  switch (role) {
    case AppRole.patient: return '/home';
    case AppRole.phlebotomist: return '/phlebotomist-attendance';
    case AppRole.labAdmin: return '/admin/bookings';
    case AppRole.superAdmin: return '/admin/bookings';
    default: return '/home';
  }
}
