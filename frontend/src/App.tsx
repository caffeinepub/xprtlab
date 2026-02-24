import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet, redirect } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';
import AppSelectorPage from './pages/AppSelectorPage';
import PatientApp from './PatientApp';
import StaffApp from './StaffApp';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 30_000 },
  },
});

const rootRoute = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light">
        <Outlet />
        <Toaster richColors position="top-center" />
      </ThemeProvider>
    </QueryClientProvider>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: AppSelectorPage,
});

const patientAppRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/patient-app',
  component: PatientApp,
});

const patientAppWildcardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/patient-app/$',
  component: PatientApp,
});

const staffAppRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/staff-app',
  component: StaffApp,
});

const staffAppWildcardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/staff-app/$',
  component: StaffApp,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  patientAppRoute,
  patientAppWildcardRoute,
  staffAppRoute,
  staffAppWildcardRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
