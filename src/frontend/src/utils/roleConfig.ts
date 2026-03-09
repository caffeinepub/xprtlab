export interface NavItem {
  label: string;
  path: string;
  icon: string;
  badgeCount?: number;
}

type AppRole = "patient" | "phlebotomist" | "labAdmin" | "superAdmin";

export const roleNavConfig: Record<AppRole, NavItem[]> = {
  patient: [
    { label: "Home", path: "home", icon: "Home" },
    { label: "Book Test", path: "book-test", icon: "FlaskConical" },
    { label: "Collections", path: "home-collection", icon: "MapPin" },
    { label: "Reports", path: "reports", icon: "FileText" },
    { label: "Profile", path: "profile", icon: "User" },
  ],
  phlebotomist: [
    { label: "Home", path: "phlebotomist-attendance", icon: "Home" },
    { label: "Tasks", path: "task-queue", icon: "ClipboardList" },
    { label: "Visits", path: "home-collection-queue", icon: "MapPin" },
    { label: "Sample", path: "hospital-sample-entry", icon: "FlaskConical" },
    { label: "My Samples", path: "my-hospital-samples", icon: "Package" },
  ],
  labAdmin: [
    { label: "Home", path: "admin-bookings", icon: "Home" },
    { label: "Samples", path: "admin-hospital-samples", icon: "FlaskConical" },
    { label: "Reports", path: "admin-reports", icon: "FileText" },
    { label: "Hospitals", path: "hospital-management", icon: "Building2" },
    { label: "Settings", path: "test-management", icon: "LayoutDashboard" },
  ],
  superAdmin: [
    {
      label: "Dashboard",
      path: "super-admin-dashboard",
      icon: "LayoutDashboard",
    },
    { label: "Tests", path: "test-management", icon: "TestTube" },
    { label: "Hospitals", path: "hospital-management", icon: "Building2" },
    { label: "Revenue", path: "revenue-settlements", icon: "Banknote" },
    { label: "Settings", path: "audit-logs", icon: "BarChart3" },
  ],
};
