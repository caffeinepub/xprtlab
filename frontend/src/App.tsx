import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import {
  createRouter,
  RouterProvider,
  createRoute,
  createRootRoute,
  Outlet,
} from '@tanstack/react-router';
import { Suspense, lazy } from 'react';
import ErrorBoundary from './components/shared/ErrorBoundary';
import LoadingScreen from './components/shared/LoadingScreen';

const AppSelectorPage = lazy(() => import('./pages/AppSelectorPage'));
const PatientApp = lazy(() => import('./PatientApp'));
const StaffApp = lazy(() => import('./StaffApp'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
    },
  },
});

const rootRoute = createRootRoute({
  component: () => (
    <Suspense fallback={<LoadingScreen message="Loading..." />}>
      <Outlet />
    </Suspense>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => (
    <ErrorBoundary>
      <Suspense fallback={<LoadingScreen message="Loading..." />}>
        <AppSelectorPage />
      </Suspense>
    </ErrorBoundary>
  ),
});

const patientAppRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/patient-app',
  component: () => (
    <ErrorBoundary>
      <Suspense fallback={<LoadingScreen message="Loading Patient App..." />}>
        <PatientApp />
      </Suspense>
    </ErrorBoundary>
  ),
});

const staffAppRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/staff-app',
  component: () => (
    <ErrorBoundary>
      <Suspense fallback={<LoadingScreen message="Loading Staff App..." />}>
        <StaffApp />
      </Suspense>
    </ErrorBoundary>
  ),
});

const routeTree = rootRoute.addChildren([indexRoute, patientAppRoute, staffAppRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
