import React, { useState, lazy, Suspense } from 'react';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { useGetCallerUserProfile } from './hooks/useQueries';
import { AppRole } from './types/models';
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
    case 'phlebotomist':
      return 'phlebotomist-attendance';
    case 'labAdmin':
      return 'admin-bookings';
    case 'superAdmin':
      return 'audit-logs';
    default:
      return 'tasks';
  }
}

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

const phlebotomistNavItems = [
  { label: 'Attendance', path: 'phlebotomist-attendance', icon: '📅' },
  { label: 'Tasks', path: 'tasks', icon: '📋' },
  { label: 'Collections', path: 'home-collections', icon: '🏠' },
  { label: 'Add Sample', path: 'hospital-sample-entry', icon: '🧪' },
  { label: 'Profile', path: 'profile', icon: '👤' },
];

const labAdminNavItems = [
  { label: 'Bookings', path: 'admin-bookings', icon: '📅' },
  { label: 'Reports', path: 'admin-reports', icon: '📄' },
  { label: 'Samples', path: 'hospital-samples', icon: '🧪' },
  { label: 'Attendance', path: 'attendance', icon: '🕐' },
  { label: 'Profile', path: 'profile', icon: '👤' },
];

const superAdminNavItems = [
  { label: 'Bookings', path: 'admin-bookings', icon: '📅' },
  { label: 'Audit', path: 'audit-logs', icon: '📊' },
  { label: 'Samples', path: 'hospital-samples', icon: '🧪' },
  { label: 'Security', path: 'security-logs', icon: '🛡️' },
  { label: 'Profile', path: 'profile', icon: '👤' },
];

function getNavItems(role?: AppRole) {
  switch (role) {
    case 'labAdmin': return labAdminNavItems;
    case 'superAdmin': return superAdminNavItems;
    default: return phlebotomistNavItems;
  }
}

function getRoleLabel(role?: AppRole): string {
  switch (role) {
    case 'phlebotomist': return 'Phlebotomist';
    case 'labAdmin': return 'Lab Admin';
    case 'superAdmin': return 'Super Admin';
    default: return 'Staff';
  }
}

function StaffAppInner() {
  const { identity, isInitializing } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const queryClient = useQueryClient();

  const [demoRole, setDemoRole] = useState<AppRole | null>(null);
  const isDemoMode = demoRole !== null;

  const {
    data: userProfile,
    isLoading: profileLoading,
    isFetched: profileFetched,
  } = useGetCallerUserProfile();

  const isPatient = userProfile?.appRole === 'patient';
  const isWrongRole = isAuthenticated && profileFetched && userProfile !== null && isPatient;
  const showProfileSetup = isAuthenticated && !profileLoading && profileFetched && userProfile === null;

  const effectiveRole: AppRole | undefined = isDemoMode
    ? demoRole!
    : (userProfile?.appRole as AppRole | undefined);

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

  if (!isDemoMode && (isInitializing || (isAuthenticated && profileLoading))) {
    return <LoadingScreen message="Loading Staff App..." />;
  }

  if (!isDemoMode && !isAuthenticated) {
    return <StaffLoginScreen onDemoMode={handleEnterDemoMode} />;
  }

  if (!isDemoMode && isWrongRole) {
    return <StaffLoginScreen onDemoMode={handleEnterDemoMode} />;
  }

  // All navigation uses string to avoid contravariance issues
  const navigate = (route: string) => {
    const staffRoute = route as StaffRoute;
    if (effectiveRole === 'phlebotomist' && ADMIN_ONLY_ROUTES.includes(staffRoute)) {
      setCurrentRoute('phlebotomist-attendance');
      return;
    }
    setCurrentRoute(staffRoute);
  };

  const renderPage = () => {
    switch (activeRoute) {
      case 'phlebotomist-attendance':
        return <PhlebotomistAttendancePage />;

      case 'hospital-sample-entry':
        return (
          <ShiftGuard onNavigate={navigate} userRole={effectiveRole}>
            <AddHospitalSamplePage onNavigate={navigate} />
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

      case 'admin-bookings':
        return <AdminBookingsPage onNavigate={navigate} />;
      case 'admin-reports':
        return <AdminReportsPage onNavigate={navigate} />;
      case 'upload-report':
        return <UploadReportPage onNavigate={navigate} />;
      case 'incidents':
        return <IncidentsPage onNavigate={navigate} />;
      case 'audit-logs':
        return <AuditLogsPage onNavigate={navigate} />;
      case 'create-camp':
        return <CreateCampPage />;
      case 'hospital-samples':
        return <AdminHospitalSamplesPage onNavigate={navigate} />;
      case 'attendance':
        return <AdminAttendancePage onNavigate={navigate} />;
      case 'security-logs':
        return <SecurityLogsPage onNavigate={navigate} />;

      case 'profile':
        return <ProfilePage onNavigate={navigate} />;

      default:
        if (effectiveRole === 'phlebotomist') {
          return <PhlebotomistAttendancePage />;
        }
        return <AdminBookingsPage onNavigate={navigate} />;
    }
  };

  return (
    <Suspense fallback={<LoadingScreen message="Loading..." />}>
      {!isDemoMode && showProfileSetup && (
        <ProfileSetupModal
          open={showProfileSetup}
          appType="staff"
          onComplete={() => queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] })}
        />
      )}
      <StaffAppLayout
        currentPath={activeRoute}
        onNavigate={navigate}
        navItems={getNavItems(effectiveRole)}
        userRole={getRoleLabel(effectiveRole)}
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
