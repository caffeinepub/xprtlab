const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/PatientHomePage-DrTeIkYK.js","assets/index-BK7lPPsB.js","assets/index-qSTn9hol.css","assets/HealthcareBg-T8Kj1xzZ.js","assets/MedicalCard-BT3wLZJL.js","assets/utils-KmUdzQwa.js","assets/clsx-DgYk2OaC.js","assets/useQueries-BMbaoAfY.js","assets/flask-conical-DtVlMrm9.js","assets/createLucideIcon-s8YgMXFI.js","assets/house-8jM1cFHV.js","assets/file-text-CFCimBJ5.js","assets/activity-Bc12x_xi.js","assets/calendar-5frW4VHZ.js","assets/arrow-right-D1_-W5W3.js","assets/BookTestPage-BLqsHEve.js","assets/button-BxLujega.js","assets/index-BXp3fiLI.js","assets/index-CF10SUlR.js","assets/index-BHpUy2Ix.js","assets/input-0SRRIr50.js","assets/PageHeroHeader-UaovnKFJ.js","assets/plus-DplFQ6eN.js","assets/search-Cu2LYKjw.js","assets/minus-DFaQKGiv.js","assets/SlotSelectionPage-CNUL26Iq.js","assets/index-Be0uMqXm.js","assets/GradientButton-De2AId2g.js","assets/loader-circle-zhFaIokB.js","assets/clock-BqS4pGGT.js","assets/circle-check-DlPZ2peO.js","assets/MyBookingsPage-PtMyeULf.js","assets/StatusBadge-BKVysLfr.js","assets/MyHomeCollectionsPage-C7-pDBOb.js","assets/map-pin-BE2sXuKA.js","assets/HomeCollectionPage-CO5KWyKm.js","assets/navigation-Dy6dEYOC.js","assets/ReportsPage-Bu3cznWc.js","assets/eye-DqveZslY.js","assets/download-DFoiaNL3.js","assets/MyVitalsPage-D0k3ryzY.js","assets/heart-kOZtIpOA.js","assets/ProfilePage-M1MGCVD9.js","assets/alert-dialog-CCSl5RFm.js","assets/index-B-aSBqD5.js","assets/badge-BxNjZKWl.js","assets/sessionUtils-LZZGFXI5.js","assets/building-2-CNp2QmKX.js","assets/x-BZ3r2hsm.js","assets/chevron-right-Dy3pobxB.js","assets/log-out-l9TsYczd.js","assets/MyHospitalSamplesPage-CwpyHXg4.js","assets/deliveryHelpers-COBcm6wT.js","assets/truck-CTQsvjRq.js","assets/microscope-BErAJRYX.js","assets/package-6TDstU0_.js","assets/chevron-up-gMzxD18y.js"])))=>i.map(i=>d[i]);
import { j as jsxRuntimeExports, a as useQueryClient, r as reactExports, E as ErrorBoundary, L as LoadingScreen, _ as __vitePreload } from "./index-BK7lPPsB.js";
import { u as useGetCallerUserProfile } from "./useQueries-BMbaoAfY.js";
import { c as cn } from "./utils-KmUdzQwa.js";
import "./clsx-DgYk2OaC.js";
function PatientAppLayout({
  children,
  onNavigate,
  currentPath,
  navItems
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "header",
      {
        className: "sticky top-0 z-40 px-4 py-2",
        style: {
          background: "#FFFFFF",
          borderBottom: "1px solid #E5E7EB",
          boxShadow: "0 2px 12px rgba(13,71,161,0.06)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: "/assets/logo.png",
              alt: "XpertLab",
              className: "h-[36px] w-auto object-contain"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-xs font-semibold px-3 py-1 rounded-full border",
              style: {
                background: "rgba(13,71,161,0.06)",
                color: "#2563EB",
                borderColor: "rgba(13,71,161,0.18)"
              },
              children: "Patient"
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 pb-[90px]", children }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex items-center justify-around rounded-2xl px-2 py-2",
        style: {
          background: "#FFFFFF",
          boxShadow: "0 -4px 20px rgba(13,71,161,0.08), 0 8px 24px rgba(0,0,0,0.12)",
          border: "1px solid rgba(229,231,235,0.8)"
        },
        children: navItems.map((item) => {
          const isActive = currentPath === item.path;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-ocid": `nav.${item.path.replace(/\//g, "")}.tab`,
              onClick: () => onNavigate(item.path),
              className: cn(
                "relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 min-w-0"
              ),
              style: { color: isActive ? "#2563EB" : "#9CA3AF" },
              children: [
                isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "absolute inset-x-1 top-0.5 bottom-0.5 rounded-xl",
                    style: { background: "rgba(13,71,161,0.07)", zIndex: -1 }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-base leading-none transition-transform duration-200",
                    style: {
                      transform: isActive ? "scale(1.15)" : "scale(1)"
                    },
                    children: item.icon
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-[10px] font-semibold leading-tight truncate max-w-[56px]",
                    style: {
                      color: isActive ? "#2563EB" : "#6B7280",
                      fontWeight: isActive ? 700 : 500
                    },
                    children: item.label
                  }
                )
              ]
            },
            item.path
          );
        })
      }
    ) })
  ] });
}
const PatientHomePage = reactExports.lazy(() => __vitePreload(() => import("./PatientHomePage-DrTeIkYK.js"), true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]) : void 0));
const BookTestPage = reactExports.lazy(() => __vitePreload(() => import("./BookTestPage-BLqsHEve.js"), true ? __vite__mapDeps([15,1,2,16,17,18,19,6,5,20,21,22,9,7,23,24,14]) : void 0));
const SlotSelectionPage = reactExports.lazy(
  () => __vitePreload(() => import("./SlotSelectionPage-CNUL26Iq.js"), true ? __vite__mapDeps([25,1,2,26,27,5,6,28,9,7,29,30]) : void 0)
);
const MyBookingsPage = reactExports.lazy(() => __vitePreload(() => import("./MyBookingsPage-PtMyeULf.js"), true ? __vite__mapDeps([31,1,2,4,5,6,21,22,9,32,7,13,8,29]) : void 0));
const MyHomeCollectionsPage = reactExports.lazy(
  () => __vitePreload(() => import("./MyHomeCollectionsPage-C7-pDBOb.js"), true ? __vite__mapDeps([33,1,2,4,5,6,32,7,10,9,34,29]) : void 0)
);
const HomeCollectionPage = reactExports.lazy(
  () => __vitePreload(() => import("./HomeCollectionPage-CO5KWyKm.js"), true ? __vite__mapDeps([35,1,2,16,17,18,19,6,5,20,26,21,22,9,7,34,36,24,29,14]) : void 0)
);
const ReportsPage = reactExports.lazy(() => __vitePreload(() => import("./ReportsPage-Bu3cznWc.js"), true ? __vite__mapDeps([37,1,2,4,5,6,21,22,9,7,11,38,39]) : void 0));
const MyVitalsPage = reactExports.lazy(() => __vitePreload(() => import("./MyVitalsPage-D0k3ryzY.js"), true ? __vite__mapDeps([40,1,2,4,5,6,12,9,41]) : void 0));
const ProfilePage = reactExports.lazy(() => __vitePreload(() => import("./ProfilePage-M1MGCVD9.js"), true ? __vite__mapDeps([42,1,2,43,44,18,16,17,19,6,5,45,20,46,9,26,7,47,48,49,50]) : void 0));
const PatientMyHospitalSamplesPage = reactExports.lazy(
  () => __vitePreload(() => import("./MyHospitalSamplesPage-CwpyHXg4.js"), true ? __vite__mapDeps([51,1,2,45,17,18,19,6,5,52,30,9,8,53,47,54,11,7,55,56]) : void 0)
);
const NAV_ITEMS = [
  { label: "Home", path: "home", icon: "🏠" },
  { label: "Book Test", path: "book-test", icon: "🧪" },
  { label: "Collections", path: "home-collection", icon: "📍" },
  { label: "Reports", path: "reports", icon: "📄" },
  { label: "Profile", path: "profile", icon: "👤" }
];
function PatientApp() {
  useQueryClient();
  const [currentRoute, setCurrentRoute] = reactExports.useState("home");
  const [selectedTests, setSelectedTests] = reactExports.useState([]);
  const {
    isLoading: profileLoading,
    isFetched: profileFetched
  } = useGetCallerUserProfile();
  const showProfileSetup = !profileLoading && profileFetched;
  const handleNavigate = (route, ctx) => {
    if (route === "slot-selection" && (ctx == null ? void 0 : ctx.selectedTests)) {
      setSelectedTests(ctx.selectedTests);
    }
    setCurrentRoute(route);
  };
  const renderPage = () => {
    switch (currentRoute) {
      case "home":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(PatientHomePage, { onNavigate: handleNavigate });
      case "book-test":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(BookTestPage, { onNavigate: handleNavigate });
      case "slot-selection":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          SlotSelectionPage,
          {
            onNavigate: handleNavigate,
            selectedTests
          }
        );
      case "my-bookings":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(MyBookingsPage, { onNavigate: handleNavigate });
      case "home-collection":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(HomeCollectionPage, { onNavigate: handleNavigate });
      case "my-home-collections":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(MyHomeCollectionsPage, { onNavigate: handleNavigate });
      case "reports":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(ReportsPage, { onNavigate: handleNavigate });
      case "my-vitals":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(MyVitalsPage, { onNavigate: handleNavigate });
      case "profile":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(ProfilePage, { onNavigate: handleNavigate });
      case "my-hospital-samples":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(PatientMyHospitalSamplesPage, {});
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(PatientHomePage, { onNavigate: handleNavigate });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    showProfileSetup,
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PatientAppLayout,
      {
        currentPath: currentRoute,
        onNavigate: handleNavigate,
        navItems: NAV_ITEMS,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingScreen, { message: "Loading page..." }), children: renderPage() }) })
      }
    )
  ] });
}
export {
  PatientApp as default
};
