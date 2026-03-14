import { j as jsxRuntimeExports } from "./index-77iKE7z5.js";
import { P as Plus } from "./plus-B03gg-WC.js";
function PageHeroHeader({
  title,
  description,
  actionLabel,
  onAction
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-ocid": "page.hero.section",
      style: {
        background: "linear-gradient(135deg, #F5F7FF, #EDF2FF)",
        borderRadius: "16px",
        padding: "20px",
        marginBottom: "18px",
        width: "100%",
        boxSizing: "border-box"
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h1",
                {
                  style: {
                    fontSize: "20px",
                    fontWeight: 600,
                    color: "#111827",
                    margin: 0,
                    lineHeight: 1.3
                  },
                  children: title
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  style: {
                    fontSize: "14px",
                    color: "#6B7280",
                    marginTop: "4px",
                    marginBottom: 0,
                    lineHeight: 1.4
                  },
                  children: description
                }
              )
            ] }),
            actionLabel && onAction && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "data-ocid": "page.hero.primary_button",
                onClick: onAction,
                style: {
                  height: "44px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #0D47A1, #1976D2)",
                  color: "white",
                  fontWeight: 600,
                  padding: "0 16px",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "14px",
                  transition: "transform 0.15s ease, box-shadow 0.15s ease",
                  boxShadow: "0 2px 8px rgba(13,71,161,0.3)",
                  whiteSpace: "nowrap"
                },
                onMouseEnter: (e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                  e.currentTarget.style.boxShadow = "0 4px 16px rgba(13,71,161,0.4)";
                },
                onMouseLeave: (e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(13,71,161,0.3)";
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16 }),
                  actionLabel
                ]
              }
            )
          ]
        }
      )
    }
  );
}
export {
  PageHeroHeader as P
};
