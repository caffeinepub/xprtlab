import { cn } from "@/lib/utils";
import type React from "react";

interface NavItem {
  label: string;
  path: string;
  icon: string;
}

interface PatientAppLayoutProps {
  children: React.ReactNode;
  onNavigate: (route: string) => void;
  currentPath: string;
  navItems: NavItem[];
}

export default function PatientAppLayout({
  children,
  onNavigate,
  currentPath,
  navItems,
}: PatientAppLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header
        className="sticky top-0 z-40 px-4 py-2"
        style={{
          background: "#FFFFFF",
          borderBottom: "1px solid #E5E7EB",
          boxShadow: "0 2px 12px rgba(13,71,161,0.06)",
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="/assets/uploads/logo-6-1.png"
              alt="XpertLab"
              className="h-[36px] w-auto object-contain"
              onError={(e) => {
                const img = e.currentTarget;
                img.src = "/assets/uploads/logo-6-1.png";
                img.onerror = () => {
                  img.style.display = "none";
                  const fallback = img.nextElementSibling as HTMLElement | null;
                  if (fallback) fallback.style.display = "block";
                };
              }}
            />
            <span
              className="hidden text-lg font-extrabold tracking-tight"
              style={{
                background: "linear-gradient(135deg, #0D47A1, #26A69A)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              XpertLab
            </span>
          </div>
          <span
            className="text-xs font-semibold px-3 py-1 rounded-full border"
            style={{
              background: "rgba(13,71,161,0.06)",
              color: "#0D47A1",
              borderColor: "rgba(13,71,161,0.18)",
            }}
          >
            Patient
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-[90px]">{children}</main>

      {/* Premium Floating Bottom Navigation */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md">
        <div
          className="flex items-center justify-around rounded-2xl px-2 py-2"
          style={{
            background: "#FFFFFF",
            boxShadow:
              "0 -4px 20px rgba(13,71,161,0.08), 0 8px 24px rgba(0,0,0,0.12)",
            border: "1px solid rgba(229,231,235,0.8)",
          }}
        >
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <button
                type="button"
                key={item.path}
                data-ocid={`nav.${item.path.replace(/\//g, "")}.tab`}
                onClick={() => onNavigate(item.path)}
                className={cn(
                  "relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 min-w-0",
                )}
                style={{ color: isActive ? "#0D47A1" : "#9CA3AF" }}
              >
                {isActive && (
                  <span
                    className="absolute inset-x-1 top-0.5 bottom-0.5 rounded-xl"
                    style={{ background: "rgba(13,71,161,0.07)", zIndex: -1 }}
                  />
                )}
                <span
                  className="text-base leading-none transition-transform duration-200"
                  style={{
                    transform: isActive ? "scale(1.15)" : "scale(1)",
                  }}
                >
                  {item.icon}
                </span>
                <span
                  className="text-[10px] font-semibold leading-tight truncate max-w-[56px]"
                  style={{
                    color: isActive ? "#0D47A1" : "#6B7280",
                    fontWeight: isActive ? 700 : 500,
                  }}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
