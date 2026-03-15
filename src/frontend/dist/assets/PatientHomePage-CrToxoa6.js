import { j as jsxRuntimeExports } from "./index-BcSF07MB.js";
import { u as useGetCallerUserProfile, H as HealthcareBg, F as FlaskConical, a as House, b as FileText } from "./ProfileSetupModal-DZhF98LT.js";
import { M as MedicalCard } from "./MedicalCard-sow8Qu1z.js";
import { A as Activity } from "./activity-CQ1u7ODL.js";
import { C as Calendar } from "./calendar-CsQhAJiE.js";
import { A as ArrowRight } from "./arrow-right-C-FR2Xam.js";
function PatientHomePage({ onNavigate }) {
  const { data: profile } = useGetCallerUserProfile();
  const quickActions = [
    {
      icon: FlaskConical,
      label: "Book a Test",
      desc: "Schedule diagnostic tests",
      route: "book-test",
      color: "text-blue-600",
      bg: "bg-blue-50",
      ocid: "patient_home.book_test.card"
    },
    {
      icon: House,
      label: "Home Collection",
      desc: "Request sample pickup",
      route: "home-collection",
      color: "text-green-600",
      bg: "bg-green-50",
      ocid: "patient_home.home_collection.card"
    },
    {
      icon: FileText,
      label: "My Reports",
      desc: "View lab results",
      route: "reports",
      color: "text-purple-600",
      bg: "bg-purple-50",
      ocid: "patient_home.reports.card"
    },
    {
      icon: Activity,
      label: "My Vitals",
      desc: "Track health metrics",
      route: "my-vitals",
      color: "text-orange-600",
      bg: "bg-orange-50",
      ocid: "patient_home.vitals.card"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative p-4 space-y-5 page-fade-in",
      style: { background: "#F7F9FC" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(HealthcareBg, { variant: "minimal", opacity: 0.04 }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-2xl p-5 text-white",
              style: {
                background: "linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)",
                boxShadow: "0 8px 24px rgba(13,71,161,0.25)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 text-sm", children: "Welcome back," }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-bold mt-0.5", style: { fontSize: "22px" }, children: [
                  (profile == null ? void 0 : profile.name) || "Patient",
                  " 👋"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 text-sm mt-1", children: "How can we help you today?" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h3",
              {
                className: "font-semibold text-foreground mb-3",
                style: { fontSize: "16px" },
                children: "Quick Actions"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: quickActions.map(
              ({ icon: Icon, label, desc, route, color, bg, ocid }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                MedicalCard,
                {
                  onClick: () => onNavigate(route),
                  "data-ocid": ocid,
                  hoverable: true,
                  style: { padding: "18px", borderRadius: "16px" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: `${bg} flex items-center justify-center mb-3`,
                        style: {
                          width: "42px",
                          height: "42px",
                          borderRadius: "12px"
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-5 h-5 ${color}` })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "font-semibold text-foreground leading-tight",
                        style: { fontSize: "15px" },
                        children: label
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-muted-foreground mt-0.5",
                        style: { fontSize: "12px" },
                        children: desc
                      }
                    )
                  ]
                },
                route
              )
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("section", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => onNavigate("my-bookings"),
              "data-ocid": "patient_home.bookings.card",
              className: "w-full flex items-center justify-between bg-white rounded-2xl p-4 transition-all duration-200",
              style: {
                borderRadius: "16px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)"
              },
              onMouseEnter: (e) => {
                e.currentTarget.style.boxShadow = "0 12px 32px rgba(13,71,161,0.12)";
                e.currentTarget.style.transform = "translateY(-2px)";
              },
              onMouseLeave: (e) => {
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";
                e.currentTarget.style.transform = "";
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "bg-blue-50 flex items-center justify-center flex-shrink-0",
                      style: { width: "42px", height: "42px", borderRadius: "12px" },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-5 h-5 text-blue-600" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "font-semibold text-foreground",
                        style: { fontSize: "15px" },
                        children: "My Bookings"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-muted-foreground",
                        style: { fontSize: "12px" },
                        children: "View all your appointments"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 text-muted-foreground" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("section", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => onNavigate("my-home-collections"),
              "data-ocid": "patient_home.home_collections.card",
              className: "w-full flex items-center justify-between bg-white rounded-2xl p-4 transition-all duration-200",
              style: {
                borderRadius: "16px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)"
              },
              onMouseEnter: (e) => {
                e.currentTarget.style.boxShadow = "0 12px 32px rgba(13,71,161,0.12)";
                e.currentTarget.style.transform = "translateY(-2px)";
              },
              onMouseLeave: (e) => {
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";
                e.currentTarget.style.transform = "";
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "bg-green-50 flex items-center justify-center flex-shrink-0",
                      style: { width: "42px", height: "42px", borderRadius: "12px" },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "w-5 h-5 text-green-600" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "font-semibold text-foreground",
                        style: { fontSize: "15px" },
                        children: "Home Collections"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-muted-foreground",
                        style: { fontSize: "12px" },
                        children: "Track your pickup requests"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 text-muted-foreground" })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
export {
  PatientHomePage as default
};
