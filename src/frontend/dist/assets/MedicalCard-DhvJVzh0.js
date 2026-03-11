import { j as jsxRuntimeExports } from "./index-D697BR3C.js";
import { c as cn } from "./ProfileSetupModal-DNPvAtBR.js";
function MedicalCard({
  children,
  className,
  style,
  onClick,
  hoverable,
  "data-ocid": dataOcid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      onClick,
      onKeyDown: onClick ? (e) => (e.key === "Enter" || e.key === " ") && onClick() : void 0,
      tabIndex: onClick ? 0 : void 0,
      role: onClick ? "button" : void 0,
      "data-ocid": dataOcid,
      style: {
        background: "#FFFFFF",
        borderRadius: "16px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        padding: "18px",
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
        ...style
      },
      className: cn(
        hoverable && "cursor-pointer hover:shadow-card-hover hover:-translate-y-0.5",
        className
      ),
      onMouseEnter: hoverable ? (e) => {
        e.currentTarget.style.boxShadow = "0 12px 32px rgba(13,71,161,0.12)";
        e.currentTarget.style.transform = "translateY(-2px)";
      } : void 0,
      onMouseLeave: hoverable ? (e) => {
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";
        e.currentTarget.style.transform = "";
      } : void 0,
      children
    }
  );
}
export {
  MedicalCard as M
};
