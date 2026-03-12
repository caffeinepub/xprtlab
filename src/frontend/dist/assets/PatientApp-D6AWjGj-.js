const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/PatientHomePage-1Hsqh529.js","assets/index-lVn_hGWr.js","assets/index-Ch84AzrI.css","assets/ProfileSetupModal-BYStubB_.js","assets/MedicalCard-CxuFN6PU.js","assets/activity-DEUxtl3x.js","assets/calendar-kZhudRmb.js","assets/arrow-right-CkX2pVhG.js","assets/BookTestPage-Ca2aTf5f.js","assets/button-CiKsIGuP.js","assets/index-BVenjb96.js","assets/input-CIfQ8nBJ.js","assets/PageHeroHeader-iVDMtqNX.js","assets/plus-BegRxyQ4.js","assets/search-DSrwGjs-.js","assets/minus-CKDBsE2O.js","assets/SlotSelectionPage-DjhPqzje.js","assets/index-CMkDufv6.js","assets/GradientButton-2eGpzbAP.js","assets/clock-fiwY_hPt.js","assets/circle-check-BzUR3sMR.js","assets/MyBookingsPage-Eimml-yh.js","assets/StatusBadge-DGLIbzGy.js","assets/MyHomeCollectionsPage-lclmb3sz.js","assets/map-pin-D6z2p51m.js","assets/HomeCollectionPage-XUrXgzQb.js","assets/textarea-C1JLlhmI.js","assets/navigation-DVwA-0N_.js","assets/ReportsPage-Iy0WvMm1.js","assets/eye-kuaOPOm_.js","assets/download-q74NccQK.js","assets/MyVitalsPage-WcTzjrrF.js","assets/heart-B-7x8O1e.js","assets/ProfilePage-BcvSkKPm.js","assets/alert-dialog-CzbPOvyV.js","assets/badge-Bh2MLGly.js","assets/user-D8SUbWXo.js","assets/building-2-CzOXe9xM.js","assets/chevron-right-B18SUE64.js","assets/MyHospitalSamplesPage-Dglh9hLq.js","assets/deliveryHelpers-CJ2dlnDp.js","assets/truck-wv6q1hym.js","assets/demoData-B0MQ4MOM.js"])))=>i.map(i=>d[i]);
import { a as useInternetIdentity, b as useQueryClient, j as jsxRuntimeExports, r as reactExports, L as LoadingScreen, E as ErrorBoundary, _ as __vitePreload } from "./index-lVn_hGWr.js";
import { G as GradientButton } from "./GradientButton-2eGpzbAP.js";
import { H as HealthcareBg, F as FlaskConical, a as House, b as FileText, c as cn, u as useGetCallerUserProfile, P as ProfileSetupModal } from "./ProfileSetupModal-BYStubB_.js";
import { H as Heart } from "./heart-B-7x8O1e.js";
import { A as Activity } from "./activity-DEUxtl3x.js";
function PatientLoginScreen({
  showRoleError = false
}) {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const isLoggingIn = loginStatus === "logging-in";
  const handleLogin = async () => {
    if (identity) {
      await clear();
      queryClient.clear();
      return;
    }
    try {
      await login();
    } catch (error) {
      if ((error == null ? void 0 : error.message) === "User is already authenticated") {
        await clear();
        setTimeout(() => login(), 300);
      }
    }
  };
  const features = [
    {
      icon: FlaskConical,
      label: "Book Diagnostic Tests",
      desc: "Choose from 100+ tests"
    },
    {
      icon: House,
      label: "Home Collection",
      desc: "Sample pickup at your door"
    },
    {
      icon: FileText,
      label: "Digital Reports",
      desc: "Access reports anytime"
    },
    {
      icon: Activity,
      label: "Health Vitals",
      desc: "Track BP, glucose & more"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative min-h-screen flex flex-col",
      style: {
        background: "linear-gradient(160deg, #0D47A1 0%, #1565C0 40%, #26A69A 100%)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(HealthcareBg, { variant: "ecg", opacity: 0.04 }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "relative z-10 flex items-center justify-between px-4 pt-8 pb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "bg-white rounded-xl px-3 py-2",
              style: { boxShadow: "0 4px 16px rgba(0,0,0,0.15)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: "/assets/logo.png",
                  alt: "XpertLab",
                  className: "h-[36px] w-auto object-contain"
                }
              )
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: "/",
              className: "text-white/70 text-xs underline hover:text-white transition-colors",
              children: "← Back"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 px-4 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl overflow-hidden shadow-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: "/assets/generated/hero-banner.dim_1200x400.png",
            alt: "XpertLab",
            className: "w-full h-36 object-cover"
          }
        ) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "relative z-10 flex-1 flex flex-col items-center px-4 pb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md", children: [
          showRoleError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/15 border border-white/25 rounded-xl p-4 mb-5 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-semibold text-sm", children: "⚠️ Staff Account Detected" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white/80 text-xs mt-1", children: [
              "This app is for patients only. Please use the",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/staff-app", className: "underline font-medium", children: "XpertLab Staff App" }),
              "."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-white rounded-2xl p-6 mb-6",
              style: { boxShadow: "0 12px 40px rgba(0,0,0,0.18)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-md",
                      style: {
                        background: "linear-gradient(135deg, #0D47A1, #26A69A)"
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-7 h-7 text-white" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h2",
                    {
                      className: "font-bold text-gray-900 leading-tight",
                      style: { fontSize: "20px" },
                      children: "Your Health. Simplified."
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 mt-2", style: { fontSize: "14px" }, children: "Secure access to your diagnostic tests and reports." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  GradientButton,
                  {
                    onClick: handleLogin,
                    loading: isLoggingIn,
                    className: "w-full",
                    size: "lg",
                    "data-ocid": "login.primary_button",
                    children: isLoggingIn ? "Signing in..." : identity ? "Sign Out" : "Continue Secure Login"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-gray-400 mt-3", children: "Secure, private authentication — no passwords needed" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: features.map(({ icon: Icon, label, desc }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-xl p-3 border",
              style: {
                background: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(8px)",
                borderColor: "rgba(255,255,255,0.2)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5 text-white mb-2" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white text-xs font-semibold leading-tight", children: label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 text-xs mt-0.5", children: desc })
              ]
            },
            label
          )) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "relative z-10 text-center py-3 text-white/50 text-xs", children: "© XpertLab" })
      ]
    }
  );
}
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
                color: "#0D47A1",
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
              style: { color: isActive ? "#0D47A1" : "#9CA3AF" },
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
                      color: isActive ? "#0D47A1" : "#6B7280",
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
const PatientHomePage = reactExports.lazy(() => __vitePreload(() => import("./PatientHomePage-1Hsqh529.js"), true ? __vite__mapDeps([0,1,2,3,4,5,6,7]) : void 0));
const BookTestPage = reactExports.lazy(() => __vitePreload(() => import("./BookTestPage-Ca2aTf5f.js"), true ? __vite__mapDeps([8,1,2,9,3,10,11,12,13,14,15,7]) : void 0));
const SlotSelectionPage = reactExports.lazy(
  () => __vitePreload(() => import("./SlotSelectionPage-DjhPqzje.js"), true ? __vite__mapDeps([16,1,2,17,18,3,19,20]) : void 0)
);
const MyBookingsPage = reactExports.lazy(() => __vitePreload(() => import("./MyBookingsPage-Eimml-yh.js"), true ? __vite__mapDeps([21,1,2,4,3,12,13,22,6,19]) : void 0));
const MyHomeCollectionsPage = reactExports.lazy(
  () => __vitePreload(() => import("./MyHomeCollectionsPage-lclmb3sz.js"), true ? __vite__mapDeps([23,1,2,4,3,22,24,19]) : void 0)
);
const HomeCollectionPage = reactExports.lazy(
  () => __vitePreload(() => import("./HomeCollectionPage-XUrXgzQb.js"), true ? __vite__mapDeps([25,1,2,9,3,10,11,26,17,12,13,24,27,15,19,7]) : void 0)
);
const ReportsPage = reactExports.lazy(() => __vitePreload(() => import("./ReportsPage-Iy0WvMm1.js"), true ? __vite__mapDeps([28,1,2,4,3,12,13,29,30]) : void 0));
const MyVitalsPage = reactExports.lazy(() => __vitePreload(() => import("./MyVitalsPage-WcTzjrrF.js"), true ? __vite__mapDeps([31,1,2,4,3,5,32]) : void 0));
const ProfilePage = reactExports.lazy(() => __vitePreload(() => import("./ProfilePage-BcvSkKPm.js"), true ? __vite__mapDeps([33,1,2,34,3,9,10,35,11,17,36,37,38]) : void 0));
const PatientMyHospitalSamplesPage = reactExports.lazy(
  () => __vitePreload(() => import("./MyHospitalSamplesPage-Dglh9hLq.js"), true ? __vite__mapDeps([39,1,2,35,3,10,40,20,41,37,42]) : void 0)
);
const NAV_ITEMS = [
  { label: "Home", path: "home", icon: "🏠" },
  { label: "Book Test", path: "book-test", icon: "🧪" },
  { label: "Collections", path: "home-collection", icon: "📍" },
  { label: "Reports", path: "reports", icon: "📄" },
  { label: "Profile", path: "profile", icon: "👤" }
];
function PatientApp() {
  const { identity, isInitializing } = useInternetIdentity();
  const queryClient = useQueryClient();
  const isAuthenticated = !!identity;
  const [currentRoute, setCurrentRoute] = reactExports.useState("home");
  const [selectedTests, setSelectedTests] = reactExports.useState([]);
  const {
    data: userProfile,
    isLoading: profileLoading,
    isFetched: profileFetched
  } = useGetCallerUserProfile();
  const showProfileSetup = isAuthenticated && !profileLoading && profileFetched && userProfile === null;
  const handleNavigate = (route, ctx) => {
    if (route === "slot-selection" && (ctx == null ? void 0 : ctx.selectedTests)) {
      setSelectedTests(ctx.selectedTests);
    }
    setCurrentRoute(route);
  };
  if (isInitializing) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingScreen, { message: "Initializing..." });
  }
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(PatientLoginScreen, {});
  }
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
    showProfileSetup && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ProfileSetupModal,
      {
        open: showProfileSetup,
        appType: "patient",
        onComplete: () => {
          queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
        }
      }
    ),
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
