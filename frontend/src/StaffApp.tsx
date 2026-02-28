import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import StaffLoginScreen from './components/auth/StaffLoginScreen';
import LoadingScreen from './components/shared/LoadingScreen';
import ErrorBoundary from './components/shared/ErrorBoundary';
import { useGetCallerUserProfile } from './hooks/useQueries';
import ProfileSetupModal from './components/auth/ProfileSetupModal';
import StaffAppLayout from './components/layout/StaffAppLayout';
import { NavItem } from './components/layout/BottomNavigation';

type AppRole = 'patient' | 'phlebotomist' | 'labAdmin' | 'superAdmin';

// Lazy load all staff pages
const TaskQueuePage = lazy(() => import('./pages/phlebotomist/TaskQueuePage'));
const ScanCampQRPage = lazy(() => import('./pages/phlebotomist/ScanCampQRPage'));
const RecordVitalsPage = lazy(() => import('./pages/phlebotomist/RecordVitalsPage'));
const HomeCollectionQueuePage = lazy(() => import('./pages/phlebotomist/HomeCollectionQueuePage'));
const PhlebotomistAttendancePage = lazy(() => import('./pages/phlebotomist/PhlebotomistAttendancePage'));
const AddHospitalSamplePage = lazy(() => import('./pages/phlebotomist/AddHospitalSamplePage'));
const MyHospitalSamplesPage = lazy(() => import('./pages/phlebotomist/MyHospitalSamplesPage'));
const AdminBookingsPage = lazy(() => import('./pages/admin/AdminBookingsPage'));
const UploadReportPage = lazy(() => import('./pages/admin/UploadReportPage'));
const AdminReportsPage = lazy(() => import('./pages/admin/AdminReportsPage'));
const IncidentsPage = lazy(() => import('./pages/admin/IncidentsPage'));
const AuditLogsPage = lazy(() => import('./pages/admin/AuditLogsPage'));
const CreateCampPage = lazy(() => import('./pages/admin/CreateCampPage'));
const SubmitIncidentPage = lazy(() => import('./pages/staff/SubmitIncidentPage'));
const AdminHospitalSamplesPage = lazy(() => import('./pages/admin/AdminHospitalSamplesPage'));
const AdminAttendancePage = lazy(() => import('./pages/admin/AdminAttendancePage'));
const SecurityLogsPage = lazy(() => import('./pages/admin/SecurityLogsPage'));
const ProfilePage = lazy(() => import('./pages/patient/ProfilePage'));
const TestManagementPage = lazy(() => import('./pages/admin/TestManagementPage'));
const HospitalManagementPage = lazy(() => import('./pages/admin/HospitalManagementPage'));
const HospitalDetailsPage = lazy(() => import('./pages/admin/HospitalDetailsPage'));

function getNavItems(role: AppRole): NavItem[] {
  if (role === 'phlebotomist') {
    return [
      { label: 'Home', path: 'phlebotomist-attendance', icon: 'Home' },
      { label: 'Tasks', path: 'tasks', icon: 'ClipboardList' },
      { label: 'Visits', path: 'home-collections', icon: 'MapPin' },
      { label: 'Sample', path: 'hospital-sample-entry', icon: 'FlaskConical' },
      { label: 'My Samples', path: 'my-hospital-samples', icon: 'Package' },
    ];
  }
  if (role === 'labAdmin') {
    return [
      { label: 'Bookings', path: 'admin-bookings', icon: 'CalendarDays' },
      { label: 'Reports', path: 'admin-reports', icon: 'FileText' },
      { label: 'Samples', path: 'admin-samples', icon: 'FlaskConical' },
      { label: 'Tests', path: 'test-management', icon: 'TestTube' },
      { label: 'Hospitals', path: 'hospital-management', icon: 'Building2' },
    ];
  }
  if (role === 'superAdmin') {
    return [
      { label: 'Bookings', path: 'admin-bookings', icon: 'CalendarDays' },
      { label: 'Tests', path: 'test-management', icon: 'TestTube' },
      { label: 'Hospitals', path: 'hospital-management', icon: 'Building2' },
      { label: 'Audit', path: 'audit-logs', icon: 'BarChart3' },
      { label: 'Security', path: 'security-logs', icon: 'Shield' },
    ];
  }
  return [];
}

function getRoleLabel(role: AppRole): string {
  switch (role) {
    case 'phlebotomist': return 'Phlebotomist';
    case 'labAdmin': return 'Lab Admin';
    case 'superAdmin': return 'Super Admin';
    default: return 'Staff';
  }
}

function getDefaultPage(role: AppRole): string {
  return role === 'phlebotomist' ? 'phlebotomist-attendance' : 'admin-bookings';
}

export default function StaffApp() {
  const { identity, isInitializing } = useInternetIdentity();
  const queryClient = useQueryClient();
  const isAuthenticated = !!identity;

  const [demoMode, setDemoMode] = useState(false);
  const [demoRole, setDemoRole] = useState<AppRole>('phlebotomist');
  const [currentPage, setCurrentPage] = useState<string>('');
  const [pageParams, setPageParams] = useState<Record<string, string>>({});

  const {
    data: userProfile,
    isLoading: profileLoading,
    isFetched: profileFetched,
  } = useGetCallerUserProfile();

  const effectiveRole: AppRole = demoMode
    ? demoRole
    : ((userProfile?.appRole as AppRole) ?? 'phlebotomist');

  // Set default page based on role once known
  useEffect(() => {
    if (currentPage) return;
    const role = demoMode ? demoRole : (userProfile?.appRole as AppRole | undefined);
    if (!role) return;
    setCurrentPage(getDefaultPage(role));
  }, [userProfile, demoMode, demoRole, currentPage]);

  const handleNavigate = (page: string, params?: Record<string, string>) => {
    setCurrentPage(page);
    setPageParams(params ?? {});
  };

  const showProfileSetup =
    !demoMode &&
    isAuthenticated &&
    !profileLoading &&
    profileFetched &&
    userProfile === null;

  if (!demoMode && isInitializing) {
    return <LoadingScreen message="Initializing..." />;
  }

  if (!demoMode && !isAuthenticated) {
    return (
      <StaffLoginScreen
        onDemoMode={(role) => {
          setDemoMode(true);
          setDemoRole(role as AppRole);
          setCurrentPage(getDefaultPage(role as AppRole));
        }}
      />
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'phlebotomist-attendance':
        return <PhlebotomistAttendancePage onNavigate={handleNavigate} />;
      case 'tasks':
        return <TaskQueuePage />;
      case 'home-collections':
        return <HomeCollectionQueuePage isDemoMode={demoMode} />;
      case 'attendance':
        return <TaskQueuePage />;
      case 'hospital-sample-entry':
        return <AddHospitalSamplePage isDemoMode={demoMode} />;
      case 'my-hospital-samples':
        return <MyHospitalSamplesPage isDemoMode={demoMode} role={effectiveRole} />;
      case 'scan-qr':
        return <ScanCampQRPage />;
      case 'record-vitals':
        return <RecordVitalsPage />;
      case 'submit-incident':
        return <SubmitIncidentPage />;
      case 'admin-bookings':
        return <AdminBookingsPage onNavigate={handleNavigate} />;
      case 'upload-report':
        return <UploadReportPage onNavigate={handleNavigate} />;
      case 'admin-reports':
        return <AdminReportsPage onNavigate={handleNavigate} />;
      case 'incidents':
        return <IncidentsPage />;
      case 'audit-logs':
        return <AuditLogsPage onNavigate={handleNavigate} />;
      case 'create-camp':
        return <CreateCampPage />;
      case 'admin-samples':
        return <AdminHospitalSamplesPage />;
      case 'admin-attendance':
        return <AdminAttendancePage />;
      case 'security-logs':
        return <SecurityLogsPage />;
      case 'test-management':
        if (effectiveRole === 'superAdmin' || effectiveRole === 'labAdmin') {
          return <TestManagementPage role={effectiveRole} />;
        }
        return <AccessDenied message="You do not have permission to access Test Management." />;
      case 'hospital-management':
        if (effectiveRole === 'superAdmin' || effectiveRole === 'labAdmin') {
          return <HospitalManagementPage role={effectiveRole} onNavigate={handleNavigate} />;
        }
        return <AccessDenied message="You do not have permission to access Hospital Management." />;
      case 'hospital-details':
        if (effectiveRole === 'superAdmin' || effectiveRole === 'labAdmin') {
          return (
            <HospitalDetailsPage
              hospitalId={pageParams.hospitalId ?? ''}
              role={effectiveRole}
              onNavigate={handleNavigate}
            />
          );
        }
        return <AccessDenied message="You do not have permission to view hospital details." />;
      case 'profile':
        return <ProfilePage onNavigate={handleNavigate} currentUserRole={effectiveRole} />;
      default:
        if (effectiveRole === 'phlebotomist') {
          return <PhlebotomistAttendancePage onNavigate={handleNavigate} />;
        }
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
            queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
          }}
        />
      )}
      <StaffAppLayout
        currentPath={currentPage}
        onNavigate={handleNavigate}
        navItems={getNavItems(effectiveRole)}
        roleLabel={getRoleLabel(effectiveRole)}
        isDemoMode={demoMode}
        onExitDemo={() => {
          setDemoMode(false);
          setDemoRole('phlebotomist');
          setCurrentPage('');
          setPageParams({});
          queryClient.clear();
        }}
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

function AccessDenied({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full py-20 text-center px-4">
      <p className="text-lg font-semibold text-foreground">Access Denied</p>
      <p className="text-sm text-muted-foreground mt-1">{message}</p>
    </div>
  );
}
