import { j as jsxRuntimeExports } from "./index-vGeq55gD.js";
import { c as cn, L as LoaderCircle } from "./ProfileSetupModal-DOcw6VTl.js";
function GradientButton({
  loading,
  children,
  size = "md",
  variant = "primary",
  className,
  disabled,
  ...props
}) {
  const sizeStyles = {
    sm: { padding: "0.5rem 1rem", fontSize: "0.8125rem", height: "36px" },
    md: { padding: "0.75rem 1.5rem", fontSize: "0.875rem", height: "44px" },
    lg: { padding: "0.875rem 2rem", fontSize: "1rem", height: "52px" }
  };
  if (variant === "outline") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        ...props,
        disabled: disabled || loading,
        className: cn(
          "rounded-xl font-semibold border-2 transition-all duration-200 flex items-center justify-center gap-2",
          "hover:shadow-md active:scale-[0.98]",
          (disabled || loading) && "opacity-60 cursor-not-allowed",
          className
        ),
        style: {
          ...sizeStyles[size],
          borderColor: "#0D47A1",
          color: "#0D47A1",
          background: "transparent",
          ...props.style ?? {}
        },
        children: [
          loading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
          children
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      ...props,
      disabled: disabled || loading,
      className: cn(
        "btn-ripple flex items-center justify-center gap-2 font-semibold transition-all duration-200",
        "active:scale-[0.98]",
        (disabled || loading) && "opacity-60 cursor-not-allowed",
        className
      ),
      style: {
        ...sizeStyles[size],
        borderRadius: "12px",
        background: disabled || loading ? "#9CA3AF" : "linear-gradient(135deg, #0D47A1 0%, #1976D2 100%)",
        color: "#FFFFFF",
        border: "none",
        cursor: disabled || loading ? "not-allowed" : "pointer",
        boxShadow: disabled || loading ? "none" : void 0,
        ...props.style ?? {}
      },
      onMouseEnter: (e) => {
        var _a;
        if (!disabled && !loading) {
          e.currentTarget.style.boxShadow = "0 6px 20px rgba(13,71,161,0.4)";
          e.currentTarget.style.transform = "translateY(-1px)";
        }
        (_a = props.onMouseEnter) == null ? void 0 : _a.call(props, e);
      },
      onMouseLeave: (e) => {
        var _a;
        if (!disabled && !loading) {
          e.currentTarget.style.boxShadow = "";
          e.currentTarget.style.transform = "";
        }
        (_a = props.onMouseLeave) == null ? void 0 : _a.call(props, e);
      },
      children: [
        loading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
        children
      ]
    }
  );
}
export {
  GradientButton as G
};
