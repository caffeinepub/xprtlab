import { j as jsxRuntimeExports } from "./index-BK7lPPsB.js";
function HealthcareBg({
  variant = "default",
  opacity = 0.035
}) {
  if (variant === "ecg") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute inset-0 overflow-hidden pointer-events-none",
        style: { opacity, zIndex: 0 },
        "aria-hidden": "true",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "svg",
          {
            width: "100%",
            height: "100%",
            xmlns: "http://www.w3.org/2000/svg",
            preserveAspectRatio: "xMidYMid slice",
            role: "presentation",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "pattern",
                {
                  id: "ecg-bg",
                  x: "0",
                  y: "0",
                  width: "200",
                  height: "80",
                  patternUnits: "userSpaceOnUse",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "polyline",
                    {
                      points: "0,40 20,40 30,15 40,65 50,40 70,40 80,20 90,60 100,40 120,40 130,10 140,70 150,40 170,40 180,25 190,55 200,40",
                      fill: "none",
                      stroke: "#2563EB",
                      strokeWidth: "1.5"
                    }
                  )
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "100%", height: "100%", fill: "url(#ecg-bg)" })
            ]
          }
        )
      }
    );
  }
  if (variant === "minimal") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute inset-0 overflow-hidden pointer-events-none",
        style: { opacity, zIndex: 0 },
        "aria-hidden": "true",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "svg",
          {
            width: "100%",
            height: "100%",
            xmlns: "http://www.w3.org/2000/svg",
            preserveAspectRatio: "xMidYMid slice",
            role: "presentation",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "pattern",
                {
                  id: "minimal-bg",
                  x: "0",
                  y: "0",
                  width: "60",
                  height: "60",
                  patternUnits: "userSpaceOnUse",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "30", cy: "30", r: "2", fill: "#06B6D4" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "0", cy: "0", r: "1.5", fill: "#2563EB" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "60", cy: "60", r: "1.5", fill: "#2563EB" })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "100%", height: "100%", fill: "url(#minimal-bg)" })
            ]
          }
        )
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "absolute inset-0 overflow-hidden pointer-events-none",
      style: { opacity, zIndex: 0 },
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "svg",
        {
          width: "100%",
          height: "100%",
          xmlns: "http://www.w3.org/2000/svg",
          preserveAspectRatio: "xMidYMid slice",
          role: "presentation",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "pattern",
              {
                id: "medical-bg",
                x: "0",
                y: "0",
                width: "100",
                height: "100",
                patternUnits: "userSpaceOnUse",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "path",
                    {
                      d: "M44 30 L44 40 L34 40 L34 48 L44 48 L44 58 L52 58 L52 48 L62 48 L62 40 L52 40 L52 30 Z",
                      fill: "#2563EB"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "10", cy: "10", r: "4", fill: "#06B6D4", opacity: "0.6" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "90", cy: "90", r: "4", fill: "#06B6D4", opacity: "0.6" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "10", cy: "90", r: "2.5", fill: "#2563EB", opacity: "0.4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "90", cy: "10", r: "2.5", fill: "#2563EB", opacity: "0.4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "25", cy: "70", r: "2", fill: "#06B6D4", opacity: "0.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "35", cy: "80", r: "2", fill: "#2563EB", opacity: "0.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "75", cy: "20", r: "2", fill: "#06B6D4", opacity: "0.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "85", cy: "30", r: "2", fill: "#2563EB", opacity: "0.5" })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "100%", height: "100%", fill: "url(#medical-bg)" })
          ]
        }
      )
    }
  );
}
export {
  HealthcareBg as H
};
