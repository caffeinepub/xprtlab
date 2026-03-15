const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/PatientHomePage-CrToxoa6.js","assets/index-BcSF07MB.js","assets/index-BY9yDnm7.css","assets/ProfileSetupModal-DZhF98LT.js","assets/MedicalCard-sow8Qu1z.js","assets/activity-CQ1u7ODL.js","assets/calendar-CsQhAJiE.js","assets/arrow-right-C-FR2Xam.js","assets/BookTestPage-DUcm526y.js","assets/button-wOnNUJ71.js","assets/index-hKQIW38e.js","assets/input-BiZ8Warn.js","assets/PageHeroHeader-CPzgo-wN.js","assets/plus-Be-trJXM.js","assets/search-DHbyPuXy.js","assets/minus-vP_YIqwB.js","assets/SlotSelectionPage-CsPuqjMb.js","assets/index-BPXqeWHC.js","assets/GradientButton-tEwhP6kz.js","assets/clock-Bi5ilDhW.js","assets/circle-check-Dw9Il_Ru.js","assets/MyBookingsPage-C2mDii2p.js","assets/StatusBadge-DhJzudWm.js","assets/MyHomeCollectionsPage-BY7i4Zfz.js","assets/map-pin-Ddp8nwPv.js","assets/HomeCollectionPage-2qwkzdf2.js","assets/navigation-D1JT1Fbz.js","assets/ReportsPage-B3vYWPWU.js","assets/eye-CkrBJxxC.js","assets/download-hSuMNOtA.js","assets/MyVitalsPage-D0_-WhnB.js","assets/heart-BF8huN7A.js","assets/ProfilePage-Bx-YzwT0.js","assets/alert-dialog--_6hdaiC.js","assets/badge-D6H4sPB8.js","assets/user-BR4Wwed5.js","assets/building-2-2WTSU1FY.js","assets/chevron-right-DMGKFxFM.js","assets/MyHospitalSamplesPage-BMN7FoL7.js","assets/deliveryHelpers-CKEFD6Yi.js","assets/truck-e21IFt35.js","assets/microscope-CxfXRB9A.js","assets/demoData-Nk0_-YUY.js","assets/chevron-up-C2hw6zZX.js"])))=>i.map(i=>d[i]);
import { a as useInternetIdentity, b as useQueryClient, j as jsxRuntimeExports, r as reactExports, L as LoadingScreen, E as ErrorBoundary, _ as __vitePreload } from "./index-BcSF07MB.js";
import { G as GradientButton } from "./GradientButton-tEwhP6kz.js";
import { H as HealthcareBg, F as FlaskConical, a as House, b as FileText, c as cn, u as useGetCallerUserProfile, P as ProfileSetupModal } from "./ProfileSetupModal-DZhF98LT.js";
import { H as Heart } from "./heart-BF8huN7A.js";
import { A as Activity } from "./activity-CQ1u7ODL.js";
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
        background: "linear-gradient(160deg, #2563EB 0%, #1565C0 40%, #06B6D4 100%)"
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
                        background: "linear-gradient(135deg, #2563EB, #06B6D4)"
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
const PatientHomePage = reactExports.lazy(() => __vitePreload(() => import("./PatientHomePage-CrToxoa6.js"), true ? __vite__mapDeps([0,1,2,3,4,5,6,7]) : void 0));
const BookTestPage = reactExports.lazy(() => __vitePreload(() => import("./BookTestPage-DUcm526y.js"), true ? __vite__mapDeps([8,1,2,9,3,10,11,12,13,14,15,7]) : void 0));
const SlotSelectionPage = reactExports.lazy(
  () => __vitePreload(() => import("./SlotSelectionPage-CsPuqjMb.js"), true ? __vite__mapDeps([16,1,2,17,18,3,19,20]) : void 0)
);
const MyBookingsPage = reactExports.lazy(() => __vitePreload(() => import("./MyBookingsPage-C2mDii2p.js"), true ? __vite__mapDeps([21,1,2,4,3,12,13,22,6,19]) : void 0));
const MyHomeCollectionsPage = reactExports.lazy(
  () => __vitePreload(() => import("./MyHomeCollectionsPage-BY7i4Zfz.js"), true ? __vite__mapDeps([23,1,2,4,3,22,24,19]) : void 0)
);
const HomeCollectionPage = reactExports.lazy(
  () => __vitePreload(() => import("./HomeCollectionPage-2qwkzdf2.js"), true ? __vite__mapDeps([25,1,2,9,3,10,11,17,12,13,24,26,15,19,7]) : void 0)
);
const ReportsPage = reactExports.lazy(() => __vitePreload(() => import("./ReportsPage-B3vYWPWU.js"), true ? __vite__mapDeps([27,1,2,4,3,12,13,28,29]) : void 0));
const MyVitalsPage = reactExports.lazy(() => __vitePreload(() => import("./MyVitalsPage-D0_-WhnB.js"), true ? __vite__mapDeps([30,1,2,4,3,5,31]) : void 0));
const ProfilePage = reactExports.lazy(() => __vitePreload(() => import("./ProfilePage-Bx-YzwT0.js"), true ? __vite__mapDeps([32,1,2,33,3,9,10,34,11,17,35,36,37]) : void 0));
const PatientMyHospitalSamplesPage = reactExports.lazy(
  () => __vitePreload(() => import("./MyHospitalSamplesPage-BMN7FoL7.js"), true ? __vite__mapDeps([38,1,2,34,3,10,39,20,40,36,41,42,43]) : void 0)
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
