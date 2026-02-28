import { useState, Suspense, lazy } from 'react';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import PatientLoginScreen from './components/auth/PatientLoginScreen';
import LoadingScreen from './components/shared/LoadingScreen';
import ErrorBoundary from './components/shared/ErrorBoundary';
import { useGetCallerUserProfile } from './hooks/useQueries';
import ProfileSetupModal from './components/auth/ProfileSetupModal';
import PatientAppLayout from './components/layout/PatientAppLayout';

type PatientRoute =
  | 'home'
  | 'book-test'
  | 'slot-selection'
  | 'my-bookings'
  | 'home-collection'
  | 'my-home-collections'
  | 'reports'
  | 'my-vitals'
  | 'profile'
  | 'my-hospital-samples';

const PatientHomePage = lazy(() => import('./pages/patient/PatientHomePage'));
const BookTestPage = lazy(() => import('./pages/patient/BookTestPage'));
const SlotSelectionPage = lazy(() => import('./pages/patient/SlotSelectionPage'));
const MyBookingsPage = lazy(() => import('./pages/patient/MyBookingsPage'));
const MyHomeCollectionsPage = lazy(() => import('./pages/patient/MyHomeCollectionsPage'));
const HomeCollectionPage = lazy(() => import('./pages/patient/HomeCollectionPage'));
const ReportsPage = lazy(() => import('./pages/patient/ReportsPage'));
const MyVitalsPage = lazy(() => import('./pages/patient/MyVitalsPage'));
const ProfilePage = lazy(() => import('./pages/patient/ProfilePage'));
const PatientMyHospitalSamplesPage = lazy(() => import('./pages/patient/MyHospitalSamplesPage'));

const NAV_ITEMS = [
  { label: 'Home', path: 'home', icon: '🏠' },
  { label: 'Book Test', path: 'book-test', icon: '🧪' },
  { label: 'Collections', path: 'home-collection', icon: '📍' },
  { label: 'Reports', path: 'reports', icon: '📄' },
  { label: 'Profile', path: 'profile', icon: '👤' },
];

export default function PatientApp() {
  const { identity, isInitializing } = useInternetIdentity();
  const queryClient = useQueryClient();
  const isAuthenticated = !!identity;

  const [currentRoute, setCurrentRoute] = useState<PatientRoute>('home');
  const [selectedTests, setSelectedTests] = useState<string[]>([]);

  const {
    data: userProfile,
    isLoading: profileLoading,
    isFetched: profileFetched,
  } = useGetCallerUserProfile();

  const showProfileSetup =
    isAuthenticated && !profileLoading && profileFetched && userProfile === null;

  const handleNavigate = (route: string, ctx?: { selectedTests?: string[] }) => {
    if (route === 'slot-selection' && ctx?.selectedTests) {
      setSelectedTests(ctx.selectedTests);
    }
    setCurrentRoute(route as PatientRoute);
  };

  if (isInitializing) {
    return <LoadingScreen message="Initializing..." />;
  }

  if (!isAuthenticated) {
    return <PatientLoginScreen />;
  }

  const renderPage = () => {
    switch (currentRoute) {
      case 'home':
        return <PatientHomePage onNavigate={handleNavigate} />;
      case 'book-test':
        return <BookTestPage onNavigate={handleNavigate} />;
      case 'slot-selection':
        return <SlotSelectionPage onNavigate={handleNavigate} selectedTests={selectedTests} />;
      case 'my-bookings':
        return <MyBookingsPage onNavigate={handleNavigate} />;
      case 'home-collection':
        return <HomeCollectionPage onNavigate={handleNavigate} />;
      case 'my-home-collections':
        return <MyHomeCollectionsPage onNavigate={handleNavigate} />;
      case 'reports':
        return <ReportsPage onNavigate={handleNavigate} />;
      case 'my-vitals':
        return <MyVitalsPage onNavigate={handleNavigate} />;
      case 'profile':
        return <ProfilePage onNavigate={handleNavigate} />;
      case 'my-hospital-samples':
        return <PatientMyHospitalSamplesPage />;
      default:
        return <PatientHomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <>
      {showProfileSetup && (
        <ProfileSetupModal
          open={showProfileSetup}
          appType="patient"
          onComplete={() => {
            queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
          }}
        />
      )}
      <PatientAppLayout
        currentPath={currentRoute}
        onNavigate={handleNavigate}
        navItems={NAV_ITEMS}
      >
        <ErrorBoundary>
          <Suspense fallback={<LoadingScreen message="Loading page..." />}>
            {renderPage()}
          </Suspense>
        </ErrorBoundary>
      </PatientAppLayout>
    </>
  );
}
