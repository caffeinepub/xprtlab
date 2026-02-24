import React, { useState, lazy, Suspense } from 'react';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { useGetCallerUserProfile } from './hooks/useQueries';
import { AppRole } from './backend';
import LoadingScreen from './components/shared/LoadingScreen';
import PatientLoginScreen from './components/auth/PatientLoginScreen';
import ProfileSetupModal from './components/auth/ProfileSetupModal';

// Lazy-load patient pages
const PatientHomePage = lazy(() => import('./pages/patient/PatientHomePage'));
const BookTestPage = lazy(() => import('./pages/patient/BookTestPage'));
const SlotSelectionPage = lazy(() => import('./pages/patient/SlotSelectionPage'));
const MyBookingsPage = lazy(() => import('./pages/patient/MyBookingsPage'));
const HomeCollectionPage = lazy(() => import('./pages/patient/HomeCollectionPage'));
const MyHomeCollectionsPage = lazy(() => import('./pages/patient/MyHomeCollectionsPage'));
const ReportsPage = lazy(() => import('./pages/patient/ReportsPage'));
const MyVitalsPage = lazy(() => import('./pages/patient/MyVitalsPage'));
const ProfilePage = lazy(() => import('./pages/patient/ProfilePage'));
const PatientAppLayout = lazy(() => import('./components/layout/PatientAppLayout'));

type PatientRoute =
  | 'home'
  | 'book-test'
  | 'slot-selection'
  | 'my-bookings'
  | 'home-collection'
  | 'my-home-collections'
  | 'reports'
  | 'my-vitals'
  | 'profile';

function PatientAppInner() {
  const { identity, isInitializing } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const queryClient = useQueryClient();

  const [currentRoute, setCurrentRoute] = useState<PatientRoute>('home');
  const [bookingContext, setBookingContext] = useState<{ selectedTests?: string[] } | null>(null);

  const {
    data: userProfile,
    isLoading: profileLoading,
    isFetched: profileFetched,
  } = useGetCallerUserProfile();

  const showProfileSetup = isAuthenticated && !profileLoading && profileFetched && userProfile === null;

  const isPatient = userProfile?.appRole === AppRole.patient;
  const isWrongRole = isAuthenticated && profileFetched && userProfile !== null && !isPatient;

  if (isInitializing || (isAuthenticated && profileLoading)) {
    return <LoadingScreen message="Loading Patient App..." />;
  }

  if (!isAuthenticated) {
    return <PatientLoginScreen />;
  }

  if (isWrongRole) {
    return <PatientLoginScreen showRoleError />;
  }

  const navigate = (route: PatientRoute, ctx?: { selectedTests?: string[] }) => {
    setCurrentRoute(route);
    if (ctx) setBookingContext(ctx);
  };

  const renderPage = () => {
    switch (currentRoute) {
      case 'home':
        return <PatientHomePage onNavigate={navigate} />;
      case 'book-test':
        return <BookTestPage onNavigate={navigate} />;
      case 'slot-selection':
        return (
          <SlotSelectionPage
            selectedTests={bookingContext?.selectedTests || []}
            onNavigate={navigate}
          />
        );
      case 'my-bookings':
        return <MyBookingsPage onNavigate={navigate} />;
      case 'home-collection':
        return <HomeCollectionPage onNavigate={navigate} />;
      case 'my-home-collections':
        return <MyHomeCollectionsPage onNavigate={navigate} />;
      case 'reports':
        return <ReportsPage onNavigate={navigate} />;
      case 'my-vitals':
        return <MyVitalsPage onNavigate={navigate} />;
      case 'profile':
        return <ProfilePage onNavigate={(r: string) => navigate(r as PatientRoute)} appType="patient" />;
      default:
        return <PatientHomePage onNavigate={navigate} />;
    }
  };

  return (
    <Suspense fallback={<LoadingScreen message="Loading..." />}>
      {showProfileSetup && (
        <ProfileSetupModal
          onComplete={() => queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] })}
          defaultRole={AppRole.patient}
        />
      )}
      <PatientAppLayout currentRoute={currentRoute} onNavigate={navigate}>
        {renderPage()}
      </PatientAppLayout>
    </Suspense>
  );
}

export default function PatientApp() {
  return (
    <Suspense fallback={<LoadingScreen message="Loading Patient App..." />}>
      <PatientAppInner />
    </Suspense>
  );
}
