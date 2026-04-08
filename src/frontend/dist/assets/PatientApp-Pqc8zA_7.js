const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/PatientHomePage-DtsAVBMC.js","assets/index-CAVbGvzl.js","assets/index-qSTn9hol.css","assets/HealthcareBg-Sk2CFm3k.js","assets/MedicalCard-C6mCgfsK.js","assets/utils-KmUdzQwa.js","assets/clsx-DgYk2OaC.js","assets/useQueries-vGFyea1k.js","assets/flask-conical-CFhGjS3E.js","assets/createLucideIcon-bRRpT3Pk.js","assets/house-Dw1alAnO.js","assets/file-text-BtxrcuZn.js","assets/activity-CZiA_lFB.js","assets/calendar-DxIVEyoP.js","assets/arrow-right-C0vcqqx6.js","assets/BookTestPage-DbDY6rOV.js","assets/button-BTcB_mnN.js","assets/index-SZKVjfoy.js","assets/index-D-h_6i0m.js","assets/index-BHpUy2Ix.js","assets/input-DbUXAvIk.js","assets/PageHeroHeader-D3XhRaFv.js","assets/plus-CIuwFXUl.js","assets/search-CgxYwnaq.js","assets/minus-Da9MJ8eb.js","assets/SlotSelectionPage-DWr-lBr6.js","assets/index-nAdPOPfy.js","assets/GradientButton-Bgn_PRNs.js","assets/loader-circle-5OMa56qp.js","assets/clock-CQL-yB6V.js","assets/circle-check-SZuG2LSK.js","assets/MyBookingsPage-CdtfJyeZ.js","assets/StatusBadge-BPAO-fkY.js","assets/MyHomeCollectionsPage-F6PU5ZnF.js","assets/map-pin-gEvqlTUL.js","assets/HomeCollectionPage-_O8AGDGJ.js","assets/navigation-BZPwE5AU.js","assets/ReportsPage-WVRT6VtM.js","assets/eye-BpS76GPa.js","assets/download-CQBtQB6X.js","assets/MyVitalsPage-CTyqQRiS.js","assets/heart-CXf9-SB2.js","assets/ProfilePage-Ct4BxgA-.js","assets/alert-dialog-Bl9Pu_hS.js","assets/index-Dg69IWz_.js","assets/badge-CGjZVSz3.js","assets/sessionUtils-D-kS_i2l.js","assets/building-2-TkMcg0B9.js","assets/x-C7U3vMdp.js","assets/chevron-right-DYqQ6M8h.js","assets/log-out-CzT9_g4Y.js","assets/MyHospitalSamplesPage-DQ2AYkaK.js","assets/deliveryHelpers-Bz-xczlK.js","assets/truck-qcxGzjzO.js","assets/microscope-BPK3k_V4.js","assets/package-j11zyfQM.js","assets/chevron-up-CNdgNkN5.js"])))=>i.map(i=>d[i]);
import { j as jsxRuntimeExports, a as useQueryClient, r as reactExports, E as ErrorBoundary, L as LoadingScreen, _ as __vitePreload } from "./index-CAVbGvzl.js";
import { u as useGetCallerUserProfile } from "./useQueries-vGFyea1k.js";
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
const PatientHomePage = reactExports.lazy(() => __vitePreload(() => import("./PatientHomePage-DtsAVBMC.js"), true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]) : void 0));
const BookTestPage = reactExports.lazy(() => __vitePreload(() => import("./BookTestPage-DbDY6rOV.js"), true ? __vite__mapDeps([15,1,2,16,17,18,19,6,5,20,21,22,9,7,23,24,14]) : void 0));
const SlotSelectionPage = reactExports.lazy(
  () => __vitePreload(() => import("./SlotSelectionPage-DWr-lBr6.js"), true ? __vite__mapDeps([25,1,2,26,27,5,6,28,9,7,29,30]) : void 0)
);
const MyBookingsPage = reactExports.lazy(() => __vitePreload(() => import("./MyBookingsPage-CdtfJyeZ.js"), true ? __vite__mapDeps([31,1,2,4,5,6,21,22,9,32,7,13,8,29]) : void 0));
const MyHomeCollectionsPage = reactExports.lazy(
  () => __vitePreload(() => import("./MyHomeCollectionsPage-F6PU5ZnF.js"), true ? __vite__mapDeps([33,1,2,4,5,6,32,7,10,9,34,29]) : void 0)
);
const HomeCollectionPage = reactExports.lazy(
  () => __vitePreload(() => import("./HomeCollectionPage-_O8AGDGJ.js"), true ? __vite__mapDeps([35,1,2,16,17,18,19,6,5,20,26,21,22,9,7,34,36,24,29,14]) : void 0)
);
const ReportsPage = reactExports.lazy(() => __vitePreload(() => import("./ReportsPage-WVRT6VtM.js"), true ? __vite__mapDeps([37,1,2,4,5,6,21,22,9,7,11,38,39]) : void 0));
const MyVitalsPage = reactExports.lazy(() => __vitePreload(() => import("./MyVitalsPage-CTyqQRiS.js"), true ? __vite__mapDeps([40,1,2,4,5,6,12,9,41]) : void 0));
const ProfilePage = reactExports.lazy(() => __vitePreload(() => import("./ProfilePage-Ct4BxgA-.js"), true ? __vite__mapDeps([42,1,2,43,44,18,16,17,19,6,5,45,20,46,9,26,7,47,48,49,50]) : void 0));
const PatientMyHospitalSamplesPage = reactExports.lazy(
  () => __vitePreload(() => import("./MyHospitalSamplesPage-DQ2AYkaK.js"), true ? __vite__mapDeps([51,1,2,45,17,18,19,6,5,52,30,9,8,53,47,54,11,7,55,56]) : void 0)
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
