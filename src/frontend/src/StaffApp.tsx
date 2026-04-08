import { useQueryClient } from "@tanstack/react-query";
import React, { useState, useEffect, useRef, Suspense, lazy } from "react";
import ProfileSetupModal from "./components/auth/ProfileSetupModal";
import StaffLoginScreen from "./components/auth/StaffLoginScreen";
import type { NavItem } from "./components/layout/BottomNavigation";
import StaffAppLayout from "./components/layout/StaffAppLayout";
import ErrorBoundary from "./components/shared/ErrorBoundary";
import LoadingScreen from "./components/shared/LoadingScreen";
import { useGetCallerUserProfile } from "./hooks/useQueries";
import { getSession } from "./utils/sessionUtils";

type AppRole = "patient" | "phlebotomist" | "labAdmin" | "superAdmin";

// Lazy load all staff pages
const TaskQueuePage = lazy(() => import("./pages/phlebotomist/TaskQueuePage"));
const ScanCampQRPage = lazy(
  () => import("./pages/phlebotomist/ScanCampQRPage"),
);
const RecordVitalsPage = lazy(
  () => import("./pages/phlebotomist/RecordVitalsPage"),
);
const HomeCollectionQueuePage = lazy(
  () => import("./pages/phlebotomist/HomeCollectionQueuePage"),
);
const PhlebotomistAttendancePage = lazy(
  () => import("./pages/phlebotomist/PhlebotomistAttendancePage"),
);
const AddHospitalSamplePage = lazy(
  () => import("./pages/phlebotomist/AddHospitalSamplePage"),
);
const MyHospitalSamplesPage = lazy(
  () => import("./pages/phlebotomist/MyHospitalSamplesPage"),
);
const AdminBookingsPage = lazy(() => import("./pages/admin/AdminBookingsPage"));
const UploadReportPage = lazy(() => import("./pages/admin/UploadReportPage"));
const AdminReportsPage = lazy(() => import("./pages/admin/AdminReportsPage"));
const IncidentsPage = lazy(() => import("./pages/admin/IncidentsPage"));
const AuditLogsPage = lazy(() => import("./pages/admin/AuditLogsPage"));
const CreateCampPage = lazy(() => import("./pages/admin/CreateCampPage"));
const SubmitIncidentPage = lazy(
  () => import("./pages/staff/SubmitIncidentPage"),
);
const AdminHospitalSamplesPage = lazy(
  () => import("./pages/admin/AdminHospitalSamplesPage"),
);
const AdminAttendancePage = lazy(
  () => import("./pages/admin/AdminAttendancePage"),
);
const SecurityLogsPage = lazy(() => import("./pages/admin/SecurityLogsPage"));
const TestManagementPage = lazy(
  () => import("./pages/admin/TestManagementPage"),
);
const HospitalManagementPage = lazy(
  () => import("./pages/admin/HospitalManagementPage"),
);
const HospitalDetailsPage = lazy(
  () => import("./pages/admin/HospitalDetailsPage"),
);
const SuperAdminDashboardPage = lazy(
  () => import("./pages/admin/SuperAdminDashboardPage"),
);
const RevenueSettlementsPage = lazy(
  () => import("./pages/admin/RevenueSettlementsPage"),
);
const ProfitDashboardPage = lazy(
  () => import("./pages/admin/ProfitDashboardPage"),
);
const SuperAdminSettingsPage = lazy(
  () => import("./pages/admin/SuperAdminSettingsPage"),
);
const StaffProfilePage = lazy(() => import("./pages/staff/StaffProfilePage"));
const TasksManagementPage = lazy(
  () => import("./pages/admin/TasksManagementPage"),
);

function getNavItems(role: AppRole): NavItem[] {
  if (role === "phlebotomist") {
    return [
      { label: "Home", path: "phlebotomist-attendance", icon: "Home" },
      { label: "Tasks", path: "task-queue", icon: "ClipboardList" },
      { label: "Visits", path: "home-collection-queue", icon: "MapPin" },
      { label: "Sample", path: "hospital-sample-entry", icon: "FlaskConical" },
      { label: "My Samples", path: "my-hospital-samples", icon: "Package" },
    ];
  }
  if (role === "labAdmin") {
    return [
      { label: "Dashboard", path: "admin-bookings", icon: "LayoutDashboard" },
      { label: "Hospitals", path: "hospital-management", icon: "Building2" },
      { label: "Tests", path: "test-management", icon: "TestTube" },
      {
        label: "Samples",
        path: "admin-hospital-samples",
        icon: "FlaskConical",
      },
      { label: "Revenue", path: "revenue-settlements", icon: "Banknote" },
    ];
  }
  if (role === "superAdmin") {
    return [
      {
        label: "Dashboard",
        path: "super-admin-dashboard",
        icon: "LayoutDashboard",
      },
      { label: "Tests", path: "test-management", icon: "TestTube" },
      { label: "Hospitals", path: "hospital-management", icon: "Building2" },
      { label: "Revenue", path: "revenue-settlements", icon: "Banknote" },
      { label: "Settings", path: "super-admin-settings", icon: "Settings" },
    ];
  }
  return [];
}

function getRoleLabel(role: AppRole): string {
  switch (role) {
    case "phlebotomist":
      return "Phlebotomist";
    case "labAdmin":
      return "Lab Admin";
    case "superAdmin":
      return "Super Admin";
    default:
      return "Staff";
  }
}

function getDefaultPage(role: AppRole): string {
  if (role === "phlebotomist") return "phlebotomist-attendance";
  if (role === "superAdmin") return "super-admin-dashboard";
  return "admin-bookings";
}

function AccessDenied({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full py-20 text-center px-4">
      <p className="text-lg font-semibold text-foreground">Access Denied</p>
      <p className="text-sm text-muted-foreground mt-1">{message}</p>
    </div>
  );
}

export default function StaffApp() {
  const queryClient = useQueryClient();

  const [sessionRole, setSessionRole] = useState<AppRole | null>(null);
  const [currentPage, setCurrentPage] = useState<string>("");
  const [pageParams, setPageParams] = useState<Record<string, string>>({});

  // Block rendering until we've finished reading localStorage
  const [sessionLoading, setSessionLoading] = useState(true);

  const _initRef = useRef(false);

  // Hard logout: clear all storage, hard navigate to "/"
  const handleLogout = () => {
    try {
      localStorage.clear();
    } catch (e) {
      console.error(e);
    }
    window.location.replace("/");
  };

  // Restore session on page load — but NOT on the login/selector page
  useEffect(() => {
    const path = window.location.pathname;
    console.log("SESSION ON LOAD:", localStorage.getItem("xpertlab_session"));
    console.log("CURRENT PATH:", path);

    // On the root or login path there is no session to restore
    if (path === "/" || path === "/login") {
      setSessionLoading(false);
      return;
    }

    const session = getSession();
    if (session?.role) {
      const role: AppRole = session.role as AppRole;
      setSessionRole(role);
      setCurrentPage(getDefaultPage(role));
    }

    setSessionLoading(false);
  }, []);

  const {
    data: userProfile,
    isLoading: profileLoading,
    isFetched: profileFetched,
  } = useGetCallerUserProfile();

  // Effective role: session-based role takes priority, then fall back to superAdmin
  const effectiveRole: AppRole = sessionRole ?? "superAdmin";

  useEffect(() => {
    if (currentPage) return;
    const role = sessionRole ?? (userProfile?.appRole as AppRole | undefined);
    if (!role) return;
    setCurrentPage(getDefaultPage(role));
  }, [userProfile, sessionRole, currentPage]);

  const handleNavigate = (page: string, params?: Record<string, string>) => {
    if (page === "logout") {
      handleLogout();
      return;
    }
    setCurrentPage(page);
    setPageParams(params ?? {});
  };

  const showProfileSetup =
    !sessionRole && !profileLoading && profileFetched && userProfile === null;

  // Block UI until we've finished reading the session from localStorage
  if (sessionLoading) return <LoadingScreen message="Loading app..." />;

  // After session is loaded: if no role from localStorage, show the login screen
  if (!sessionRole) {
    return <StaffLoginScreen />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case "super-admin-dashboard":
        return <SuperAdminDashboardPage />;
      case "phlebotomist-attendance":
        return <PhlebotomistAttendancePage onNavigate={handleNavigate} />;
      case "tasks":
      case "task-queue":
        return (
          <TaskQueuePage role={effectiveRole} onNavigate={handleNavigate} />
        );
      case "home-collections":
      case "home-collection-queue":
        return <HomeCollectionQueuePage />;
      case "hospital-sample-entry":
        return <AddHospitalSamplePage />;
      case "my-hospital-samples":
        return <MyHospitalSamplesPage role={effectiveRole} />;
      case "scan-qr":
        return <ScanCampQRPage />;
      case "record-vitals":
        return <RecordVitalsPage />;
      case "submit-incident":
        return <SubmitIncidentPage />;
      case "admin-bookings":
        return <AdminBookingsPage onNavigate={handleNavigate} />;
      case "upload-report":
        return <UploadReportPage onNavigate={handleNavigate} />;
      case "admin-reports":
        return <AdminReportsPage onNavigate={handleNavigate} />;
      case "incidents":
        return <IncidentsPage />;
      case "audit-logs":
        return <AuditLogsPage onNavigate={handleNavigate} />;
      case "create-camp":
        return <CreateCampPage />;
      case "admin-samples":
      case "admin-hospital-samples":
        return <AdminHospitalSamplesPage />;
      case "admin-attendance":
        return <AdminAttendancePage />;
      case "security-logs":
        return <SecurityLogsPage />;
      case "test-management":
        if (effectiveRole === "superAdmin" || effectiveRole === "labAdmin") {
          return <TestManagementPage role={effectiveRole} />;
        }
        return (
          <AccessDenied message="You do not have permission to access Test Management." />
        );
      case "hospital-management":
        if (effectiveRole === "superAdmin" || effectiveRole === "labAdmin") {
          return (
            <HospitalManagementPage
              role={effectiveRole}
              onNavigate={handleNavigate}
            />
          );
        }
        return (
          <AccessDenied message="You do not have permission to access Hospital Management." />
        );
      case "hospital-details":
        if (effectiveRole === "superAdmin" || effectiveRole === "labAdmin") {
          return (
            <HospitalDetailsPage
              hospitalId={pageParams.hospitalId ?? ""}
              role={effectiveRole}
              onNavigate={handleNavigate}
            />
          );
        }
        return (
          <AccessDenied message="You do not have permission to view hospital details." />
        );
      case "revenue-settlements":
        if (effectiveRole === "superAdmin" || effectiveRole === "labAdmin") {
          return <RevenueSettlementsPage onNavigate={handleNavigate} />;
        }
        return (
          <AccessDenied message="You do not have permission to access Revenue & Settlements." />
        );
      case "profit-dashboard":
        if (effectiveRole === "superAdmin") {
          return <ProfitDashboardPage />;
        }
        return (
          <AccessDenied message="You do not have permission to access the Profit Dashboard." />
        );
      case "super-admin-settings":
        if (effectiveRole === "superAdmin") {
          return <SuperAdminSettingsPage onNavigate={handleNavigate} />;
        }
        return (
          <AccessDenied message="You do not have permission to access Settings." />
        );
      case "tasks-management":
        if (effectiveRole === "superAdmin" || effectiveRole === "labAdmin") {
          return <TasksManagementPage role={effectiveRole} />;
        }
        return <AccessDenied message="No permission to access Tasks." />;
      case "staff-profile":
      case "profile":
        return <StaffProfilePage onNavigate={handleNavigate} />;
      default:
        if (effectiveRole === "phlebotomist")
          return <PhlebotomistAttendancePage onNavigate={handleNavigate} />;
        if (effectiveRole === "superAdmin") return <SuperAdminDashboardPage />;
        return <AdminBookingsPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <>
      {showProfileSetup && (
        <ProfileSetupModal
          open={showProfileSetup}
          appType="staff"
          onComplete={() => {
            queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
          }}
        />
      )}
      <StaffAppLayout
        currentPath={currentPage}
        onNavigate={handleNavigate}
        navItems={getNavItems(effectiveRole)}
        roleLabel={getRoleLabel(effectiveRole)}
        onExitDemo={handleLogout}
      >
        <ErrorBoundary>
          <Suspense fallback={<LoadingScreen message="Loading page..." />}>
            {renderPage()}
          </Suspense>
        </ErrorBoundary>
      </StaffAppLayout>
    </>
  );
}
