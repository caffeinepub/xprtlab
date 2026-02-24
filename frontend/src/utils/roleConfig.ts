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
    { label: 'Home', path: '/tasks', iconName: 'ClipboardList' },
    { label: 'Tasks', path: '/tasks', iconName: 'CheckSquare' },
    { label: 'Scan QR', path: '/scan-camp', iconName: 'QrCode' },
    { label: 'Profile', path: '/profile', iconName: 'User' },
  ],
  [AppRole.labAdmin]: [
    { label: 'Home', path: '/admin/bookings', iconName: 'LayoutDashboard' },
    { label: 'Bookings', path: '/admin/bookings', iconName: 'Calendar' },
    { label: 'Reports', path: '/admin/reports', iconName: 'FileText' },
    { label: 'Profile', path: '/profile', iconName: 'User' },
  ],
  [AppRole.superAdmin]: [
    { label: 'Home', path: '/admin/bookings', iconName: 'LayoutDashboard' },
    { label: 'Bookings', path: '/admin/bookings', iconName: 'Calendar' },
    { label: 'Audit', path: '/admin/audit-logs', iconName: 'Shield' },
    { label: 'Profile', path: '/profile', iconName: 'User' },
  ],
};

export function getDefaultPath(role: AppRole): string {
  switch (role) {
    case AppRole.patient: return '/home';
    case AppRole.phlebotomist: return '/tasks';
    case AppRole.labAdmin: return '/admin/bookings';
    case AppRole.superAdmin: return '/admin/bookings';
    default: return '/home';
  }
}
