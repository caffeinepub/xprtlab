import React, { useState, lazy, Suspense } from 'react';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { useGetCallerUserProfile } from './hooks/useQueries';
import { AppRole } from './backend';
import LoadingScreen from './components/shared/LoadingScreen';
import StaffLoginScreen from './components/auth/StaffLoginScreen';
import ProfileSetupModal from './components/auth/ProfileSetupModal';
import ShiftGuard from './components/layout/ShiftGuard';

// Lazy-load staff pages
const TaskQueuePage = lazy(() => import('./pages/phlebotomist/TaskQueuePage'));
const HomeCollectionQueuePage = lazy(() => import('./pages/phlebotomist/HomeCollectionQueuePage'));
const RecordVitalsPage = lazy(() => import('./pages/phlebotomist/RecordVitalsPage'));
const ScanCampQRPage = lazy(() => import('./pages/phlebotomist/ScanCampQRPage'));
const PhlebotomistAttendancePage = lazy(() => import('./pages/phlebotomist/PhlebotomistAttendancePage'));
const AddHospitalSamplePage = lazy(() => import('./pages/phlebotomist/AddHospitalSamplePage'));
const AdminBookingsPage = lazy(() => import('./pages/admin/AdminBookingsPage'));
const AdminReportsPage = lazy(() => import('./pages/admin/AdminReportsPage'));
const UploadReportPage = lazy(() => import('./pages/admin/UploadReportPage'));
const IncidentsPage = lazy(() => import('./pages/admin/IncidentsPage'));
const AuditLogsPage = lazy(() => import('./pages/admin/AuditLogsPage'));
const CreateCampPage = lazy(() => import('./pages/admin/CreateCampPage'));
const AdminHospitalSamplesPage = lazy(() => import('./pages/admin/AdminHospitalSamplesPage'));
const AdminAttendancePage = lazy(() => import('./pages/admin/AdminAttendancePage'));
const SecurityLogsPage = lazy(() => import('./pages/admin/SecurityLogsPage'));
const SubmitIncidentPage = lazy(() => import('./pages/staff/SubmitIncidentPage'));
const ProfilePage = lazy(() => import('./pages/patient/ProfilePage'));
const StaffAppLayout = lazy(() => import('./components/layout/StaffAppLayout'));

export type StaffRoute =
  | 'tasks'
  | 'home-collections'
  | 'record-vitals'
  | 'scan-qr'
  | 'phlebotomist-attendance'
  | 'hospital-sample-entry'
  | 'admin-bookings'
  | 'admin-reports'
  | 'upload-report'
  | 'incidents'
  | 'audit-logs'
  | 'create-camp'
  | 'hospital-samples'
  | 'attendance'
  | 'security-logs'
  | 'submit-incident'
  | 'profile';

function getDefaultRouteForRole(role: AppRole): StaffRoute {
  switch (role) {
    case AppRole.phlebotomist:
      return 'phlebotomist-attendance';
    case AppRole.labAdmin:
      return 'admin-bookings';
    case AppRole.superAdmin:
      return 'audit-logs';
    default:
      return 'tasks';
  }
}

/** Routes that require an active shift for phlebotomist role */
const SHIFT_GATED_ROUTES: StaffRoute[] = [
  'tasks',
  'home-collections',
  'record-vitals',
  'scan-qr',
  'hospital-sample-entry',
  'submit-incident',
];

/** Routes that are admin-only — phlebotomist should never see these */
const ADMIN_ONLY_ROUTES: StaffRoute[] = [
  'admin-bookings',
  'admin-reports',
  'upload-report',
  'incidents',
  'audit-logs',
  'create-camp',
  'hospital-samples',
  'attendance',
  'security-logs',
];

function StaffAppInner() {
  const { identity, isInitializing } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const queryClient = useQueryClient();

  // Demo mode state — in-memory only, cleared on reload
  const [demoRole, setDemoRole] = useState<AppRole | null>(null);
  const isDemoMode = demoRole !== null;

  const {
    data: userProfile,
    isLoading: profileLoading,
    isFetched: profileFetched,
  } = useGetCallerUserProfile();

  const isPatient = userProfile?.appRole === AppRole.patient;
  const isWrongRole = isAuthenticated && profileFetched && userProfile !== null && isPatient;
  const showProfileSetup = isAuthenticated && !profileLoading && profileFetched && userProfile === null;

  // Determine effective role: demo role takes precedence over real profile
  const effectiveRole: AppRole | undefined = isDemoMode
    ? demoRole!
    : userProfile?.appRole;

  const defaultRoute = effectiveRole ? getDefaultRouteForRole(effectiveRole) : 'phlebotomist-attendance';
  const [currentRoute, setCurrentRoute] = useState<StaffRoute | null>(null);

  const activeRoute: StaffRoute = currentRoute ?? defaultRoute;

  const handleEnterDemoMode = (role: AppRole) => {
    setDemoRole(role);
    setCurrentRoute(getDefaultRouteForRole(role));
  };

  const handleExitDemoMode = () => {
    setDemoRole(null);
    setCurrentRoute(null);
  };

  // Show loading only for real auth flow
  if (!isDemoMode && (isInitializing || (isAuthenticated && profileLoading))) {
    return <LoadingScreen message="Loading Staff App..." />;
  }

  // Show login if not authenticated and not in demo mode
  if (!isDemoMode && !isAuthenticated) {
    return <StaffLoginScreen onDemoMode={handleEnterDemoMode} />;
  }

  // Show role error for patient accounts (not in demo mode)
  if (!isDemoMode && isWrongRole) {
    return <StaffLoginScreen showRoleError onDemoMode={handleEnterDemoMode} />;
  }

  const navigate = (route: StaffRoute) => {
    // Prevent phlebotomist from accessing admin-only routes
    if (effectiveRole === AppRole.phlebotomist && ADMIN_ONLY_ROUTES.includes(route)) {
      setCurrentRoute('phlebotomist-attendance');
      return;
    }
    setCurrentRoute(route);
  };

  // A string-accepting wrapper for components that type onNavigate as (route: string) => void
  const navigateFromString = (route: string) => navigate(route as StaffRoute);

  const renderPage = () => {
    switch (activeRoute) {
      // ── Phlebotomist-only routes ──────────────────────────────────────────
      case 'phlebotomist-attendance':
        // Attendance page is always accessible — no ShiftGuard
        return <PhlebotomistAttendancePage />;

      case 'hospital-sample-entry':
        return (
          <ShiftGuard onNavigate={navigate} userRole={effectiveRole}>
            <AddHospitalSamplePage onNavigate={navigateFromString} />
          </ShiftGuard>
        );

      case 'tasks':
        return (
          <ShiftGuard onNavigate={navigate} userRole={effectiveRole}>
            <TaskQueuePage onNavigate={navigate} />
          </ShiftGuard>
        );

      case 'home-collections':
        return (
          <ShiftGuard onNavigate={navigate} userRole={effectiveRole}>
            <HomeCollectionQueuePage />
          </ShiftGuard>
        );

      case 'record-vitals':
        return (
          <ShiftGuard onNavigate={navigate} userRole={effectiveRole}>
            <RecordVitalsPage />
          </ShiftGuard>
        );

      case 'scan-qr':
        return (
          <ShiftGuard onNavigate={navigate} userRole={effectiveRole}>
            <ScanCampQRPage />
          </ShiftGuard>
        );

      case 'submit-incident':
        return (
          <ShiftGuard onNavigate={navigate} userRole={effectiveRole}>
            <SubmitIncidentPage onNavigate={navigate} />
          </ShiftGuard>
        );

      // ── Admin-only routes ─────────────────────────────────────────────────
      case 'admin-bookings':
        return <AdminBookingsPage onNavigate={navigate} />;
      case 'admin-reports':
        return <AdminReportsPage onNavigate={navigate} />;
      case 'upload-report':
        return <UploadReportPage onNavigate={navigate} />;
      case 'incidents':
        return <IncidentsPage />;
      case 'audit-logs':
        return <AuditLogsPage />;
      case 'create-camp':
        return <CreateCampPage />;
      case 'hospital-samples':
        return <AdminHospitalSamplesPage onNavigate={navigate} userRole={effectiveRole} />;
      case 'attendance':
        return <AdminAttendancePage />;
      case 'security-logs':
        return <SecurityLogsPage />;

      // ── Shared routes ─────────────────────────────────────────────────────
      case 'profile':
        return <ProfilePage onNavigate={(r: string) => navigate(r as StaffRoute)} appType="staff" />;

      default:
        if (effectiveRole === AppRole.phlebotomist) {
          return <PhlebotomistAttendancePage />;
        }
        return <AdminBookingsPage onNavigate={navigate} />;
    }
  };

  return (
    <Suspense fallback={<LoadingScreen message="Loading..." />}>
      {!isDemoMode && showProfileSetup && (
        <ProfileSetupModal
          onComplete={() => queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] })}
          defaultRole={AppRole.phlebotomist}
        />
      )}
      <StaffAppLayout
        currentRoute={activeRoute}
        onNavigate={navigate}
        userRole={effectiveRole}
        isDemoMode={isDemoMode}
        onExitDemoMode={handleExitDemoMode}
      >
        {renderPage()}
      </StaffAppLayout>
    </Suspense>
  );
}

export default function StaffApp() {
  return (
    <Suspense fallback={<LoadingScreen message="Loading Staff App..." />}>
      <StaffAppInner />
    </Suspense>
  );
}
