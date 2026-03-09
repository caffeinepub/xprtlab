import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import type React from "react";

interface GradientButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "outline";
}

export default function GradientButton({
  loading,
  children,
  size = "md",
  variant = "primary",
  className,
  disabled,
  ...props
}: GradientButtonProps) {
  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { padding: "0.5rem 1rem", fontSize: "0.8125rem", height: "36px" },
    md: { padding: "0.75rem 1.5rem", fontSize: "0.875rem", height: "44px" },
    lg: { padding: "0.875rem 2rem", fontSize: "1rem", height: "52px" },
  };

  if (variant === "outline") {
    return (
      <button
        {...props}
        disabled={disabled || loading}
        className={cn(
          "rounded-xl font-semibold border-2 transition-all duration-200 flex items-center justify-center gap-2",
          "hover:shadow-md active:scale-[0.98]",
          (disabled || loading) && "opacity-60 cursor-not-allowed",
          className,
        )}
        style={{
          ...sizeStyles[size],
          borderColor: "#0D47A1",
          color: "#0D47A1",
          background: "transparent",
          ...(props.style ?? {}),
        }}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
      </button>
    );
  }

  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={cn(
        "btn-ripple flex items-center justify-center gap-2 font-semibold transition-all duration-200",
        "active:scale-[0.98]",
        (disabled || loading) && "opacity-60 cursor-not-allowed",
        className,
      )}
      style={{
        ...sizeStyles[size],
        borderRadius: "12px",
        background:
          disabled || loading
            ? "#9CA3AF"
            : "linear-gradient(135deg, #0D47A1 0%, #1976D2 100%)",
        color: "#FFFFFF",
        border: "none",
        cursor: disabled || loading ? "not-allowed" : "pointer",
        boxShadow: disabled || loading ? "none" : undefined,
        ...(props.style ?? {}),
      }}
      onMouseEnter={(e) => {
        if (!disabled && !loading) {
          (e.currentTarget as HTMLButtonElement).style.boxShadow =
            "0 6px 20px rgba(13,71,161,0.4)";
          (e.currentTarget as HTMLButtonElement).style.transform =
            "translateY(-1px)";
        }
        props.onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        if (!disabled && !loading) {
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "";
          (e.currentTarget as HTMLButtonElement).style.transform = "";
        }
        props.onMouseLeave?.(e);
      }}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
}
