import React, { useState, lazy, Suspense } from 'react';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { useGetCallerUserProfile } from './hooks/useQueries';
import { AppRole } from './backend';
import LoadingScreen from './components/shared/LoadingScreen';
import StaffLoginScreen from './components/auth/StaffLoginScreen';
import ProfileSetupModal from './components/auth/ProfileSetupModal';

// Lazy-load staff pages
const TaskQueuePage = lazy(() => import('./pages/phlebotomist/TaskQueuePage'));
const HomeCollectionQueuePage = lazy(() => import('./pages/phlebotomist/HomeCollectionQueuePage'));
const RecordVitalsPage = lazy(() => import('./pages/phlebotomist/RecordVitalsPage'));
const ScanCampQRPage = lazy(() => import('./pages/phlebotomist/ScanCampQRPage'));
const AdminBookingsPage = lazy(() => import('./pages/admin/AdminBookingsPage'));
const AdminReportsPage = lazy(() => import('./pages/admin/AdminReportsPage'));
const UploadReportPage = lazy(() => import('./pages/admin/UploadReportPage'));
const IncidentsPage = lazy(() => import('./pages/admin/IncidentsPage'));
const AuditLogsPage = lazy(() => import('./pages/admin/AuditLogsPage'));
const CreateCampPage = lazy(() => import('./pages/admin/CreateCampPage'));
const SubmitIncidentPage = lazy(() => import('./pages/staff/SubmitIncidentPage'));
const ProfilePage = lazy(() => import('./pages/patient/ProfilePage'));
const StaffAppLayout = lazy(() => import('./components/layout/StaffAppLayout'));

type StaffRoute =
  | 'tasks'
  | 'home-collections'
  | 'record-vitals'
  | 'scan-qr'
  | 'admin-bookings'
  | 'admin-reports'
  | 'upload-report'
  | 'incidents'
  | 'audit-logs'
  | 'create-camp'
  | 'submit-incident'
  | 'profile';

function getDefaultRouteForRole(role: AppRole): StaffRoute {
  switch (role) {
    case AppRole.phlebotomist:
      return 'tasks';
    case AppRole.labAdmin:
      return 'admin-bookings';
    case AppRole.superAdmin:
      return 'audit-logs';
    default:
      return 'tasks';
  }
}

function StaffAppInner() {
  const { identity, isInitializing } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const queryClient = useQueryClient();

  const {
    data: userProfile,
    isLoading: profileLoading,
    isFetched: profileFetched,
  } = useGetCallerUserProfile();

  const isPatient = userProfile?.appRole === AppRole.patient;
  const isWrongRole = isAuthenticated && profileFetched && userProfile !== null && isPatient;
  const showProfileSetup = isAuthenticated && !profileLoading && profileFetched && userProfile === null;

  const defaultRoute = userProfile ? getDefaultRouteForRole(userProfile.appRole) : 'tasks';
  const [currentRoute, setCurrentRoute] = useState<StaffRoute | null>(null);

  const activeRoute: StaffRoute = currentRoute ?? defaultRoute;

  if (isInitializing || (isAuthenticated && profileLoading)) {
    return <LoadingScreen message="Loading Staff App..." />;
  }

  if (!isAuthenticated) {
    return <StaffLoginScreen />;
  }

  if (isWrongRole) {
    return <StaffLoginScreen showRoleError />;
  }

  const navigate = (route: StaffRoute) => setCurrentRoute(route);

  const renderPage = () => {
    switch (activeRoute) {
      case 'tasks':
        return <TaskQueuePage onNavigate={navigate} />;
      case 'home-collections':
        return <HomeCollectionQueuePage />;
      case 'record-vitals':
        return <RecordVitalsPage />;
      case 'scan-qr':
        return <ScanCampQRPage />;
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
      case 'submit-incident':
        return <SubmitIncidentPage onNavigate={navigate} />;
      case 'profile':
        return <ProfilePage onNavigate={(r: string) => navigate(r as StaffRoute)} appType="staff" />;
      default:
        return <TaskQueuePage onNavigate={navigate} />;
    }
  };

  return (
    <Suspense fallback={<LoadingScreen message="Loading..." />}>
      {showProfileSetup && (
        <ProfileSetupModal
          onComplete={() => queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] })}
          defaultRole={AppRole.phlebotomist}
        />
      )}
      <StaffAppLayout currentRoute={activeRoute} onNavigate={navigate} userRole={userProfile?.appRole}>
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
