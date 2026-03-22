import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";
import { Suspense, lazy, useEffect } from "react";
import ErrorBoundary from "./components/shared/ErrorBoundary";
import LoadingScreen from "./components/shared/LoadingScreen";

const AppSelectorPage = lazy(() => import("./pages/AppSelectorPage"));
const PatientApp = lazy(() => import("./PatientApp"));
const StaffApp = lazy(() => import("./StaffApp"));

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
  path: "/",
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
  path: "/patient-app",
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
  path: "/staff-app",
  component: () => (
    <ErrorBoundary>
      <Suspense fallback={<LoadingScreen message="Loading Staff App..." />}>
        <StaffApp />
      </Suspense>
    </ErrorBoundary>
  ),
});

const adminAppRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin-app",
  component: () => (
    <ErrorBoundary>
      <Suspense fallback={<LoadingScreen message="Loading Admin App..." />}>
        <StaffApp />
      </Suspense>
    </ErrorBoundary>
  ),
});
const routeTree = rootRoute.addChildren([
  indexRoute,
  patientAppRoute,
  staffAppRoute,
  adminAppRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function StaleDataCleaner() {
  useEffect(() => {
    const STALE_KEYS = [
      "xpertlab_hospitals",
      "xpertlab_tests",
      "xpertlab_samples",
      "xpertlab_demo_samples",
      "demo_mode",
      "xpertlab_test_metadata",
      "xpertlab_tasks",
      "xpertlab_payments",
      "xpertlab_collections",
      "xpertlab_audit_logs",
      "xpertlab_users",
      "xpertlab_system_mode",
      "system_mode",
      "test_mode",
    ];
    if (!localStorage.getItem("xpertlab_data_cleaned_v2")) {
      for (const k of STALE_KEYS) localStorage.removeItem(k);
      localStorage.setItem("xpertlab_data_cleaned_v2", "1");
    }
  }, []);
  return null;
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
      >
        <QueryClientProvider client={queryClient}>
          <StaleDataCleaner />
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
