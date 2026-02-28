import { AppRole } from '../types/models';

export interface NavItem {
  label: string;
  path: string;
  icon: string;
  badgeCount?: number;
}

export const roleNavConfig: Record<AppRole, NavItem[]> = {
  patient: [
    { label: 'Home', path: 'home', icon: 'Home' },
    { label: 'Book Test', path: 'book-test', icon: 'FlaskConical' },
    { label: 'Collections', path: 'home-collection', icon: 'MapPin' },
    { label: 'Reports', path: 'reports', icon: 'FileText' },
    { label: 'Profile', path: 'profile', icon: 'User' },
  ],
  phlebotomist: [
    { label: 'Tasks', path: 'task-queue', icon: 'ClipboardList' },
    { label: 'Attendance', path: 'phlebotomist-attendance', icon: 'CalendarCheck' },
    { label: 'Add Sample', path: 'hospital-sample-entry', icon: 'FlaskConical' },
    { label: 'Home Visits', path: 'home-collection-queue', icon: 'Home' },
    { label: 'Profile', path: 'profile', icon: 'User' },
  ],
  labAdmin: [
    { label: 'Bookings', path: 'admin-bookings', icon: 'Calendar' },
    { label: 'Samples', path: 'admin-hospital-samples', icon: 'FlaskConical' },
    { label: 'Reports', path: 'admin-reports', icon: 'FileText' },
    { label: 'Tests', path: 'test-management', icon: 'TestTube' },
    { label: 'Hospitals', path: 'hospital-management', icon: 'Building2' },
  ],
  superAdmin: [
    { label: 'Bookings', path: 'admin-bookings', icon: 'Calendar' },
    { label: 'Tests', path: 'test-management', icon: 'TestTube' },
    { label: 'Hospitals', path: 'hospital-management', icon: 'Building2' },
    { label: 'Incidents', path: 'incidents', icon: 'ShieldAlert' },
    { label: 'Audit', path: 'audit-logs', icon: 'BarChart3' },
  ],
};
