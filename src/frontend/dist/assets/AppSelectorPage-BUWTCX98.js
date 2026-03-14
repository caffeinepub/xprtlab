import { u as useNavigate, j as jsxRuntimeExports } from "./index-vGeq55gD.js";
function AppSelectorPage() {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gradient-to-br from-background to-muted flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "bg-card shadow-sm px-4 py-4 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: "/assets/logo.png",
        alt: "XpertLab",
        className: "h-[36px] w-auto object-contain"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: "/assets/generated/hero-banner.dim_1200x400.png",
          alt: "XpertLab Hero",
          className: "w-full h-40 object-cover",
          onError: (e) => {
            e.target.style.display = "none";
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-primary/60 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-white px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold mb-1", children: "Welcome to XpertLab" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm opacity-90", children: "Your trusted diagnostic partner" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1 flex flex-col items-center justify-center px-4 py-8 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-foreground mb-1", children: "Select Your Portal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Choose the app that matches your role" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm flex flex-col gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => navigate({ to: "/patient-app" }),
            className: "w-full bg-card rounded-2xl shadow-card p-6 text-left hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] border border-border",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "svg",
                {
                  className: "w-7 h-7 text-primary",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  "aria-hidden": "true",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    }
                  )
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-bold text-foreground mb-0.5", children: "Patient App" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Book tests, view reports & track health" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "svg",
                {
                  className: "w-5 h-5 text-muted-foreground",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  "aria-hidden": "true",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M9 5l7 7-7 7"
                    }
                  )
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => navigate({ to: "/staff-app" }),
            className: "w-full bg-card rounded-2xl shadow-card p-6 text-left hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] border border-border",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "svg",
                {
                  className: "w-7 h-7 text-secondary",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  "aria-hidden": "true",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    }
                  )
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-bold text-foreground mb-0.5", children: "Staff App" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Manage samples, attendance & reports" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "svg",
                {
                  className: "w-5 h-5 text-muted-foreground",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  "aria-hidden": "true",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M9 5l7 7-7 7"
                    }
                  )
                }
              )
            ] })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "py-4 px-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " XpertLab"
    ] }) })
  ] });
}
export {
  AppSelectorPage as default
};
