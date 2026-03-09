import React from "react";
import { getDemoHomeCollections } from "../../utils/demoData";
import BottomNavigation, { type NavItem } from "./BottomNavigation";

interface StaffAppLayoutProps {
  children: React.ReactNode;
  currentPath: string;
  navItems: NavItem[];
  onNavigate: (path: string) => void;
  roleLabel?: string;
  isDemoMode?: boolean;
  onExitDemo?: () => void;
}

const StaffAppLayout: React.FC<StaffAppLayoutProps> = ({
  children,
  currentPath,
  navItems,
  onNavigate,
  roleLabel,
  isDemoMode = false,
  onExitDemo,
}) => {
  // biome-ignore lint/correctness/useExhaustiveDependencies: currentPath intentionally used to force recompute
  const pendingCount = React.useMemo(() => {
    const collections = getDemoHomeCollections();
    return collections.filter((c) => c.status !== "COMPLETED").length;
  }, [currentPath]);

  const navItemsWithBadge: NavItem[] = navItems.map((item) => {
    if (
      (item.path === "home-collection-queue" ||
        item.path === "/home-collection-queue") &&
      pendingCount > 0
    ) {
      return { ...item, badgeCount: pendingCount };
    }
    return item;
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Demo mode banner */}
      {isDemoMode && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 flex items-center justify-between">
          <span className="text-xs text-amber-700 font-medium">
            🎭 Demo Mode — data is not saved to the blockchain
          </span>
          {onExitDemo && (
            <button
              type="button"
              onClick={onExitDemo}
              className="text-xs text-amber-600 underline hover:text-amber-800 transition-colors"
            >
              Exit Demo
            </button>
          )}
        </div>
      )}

      {/* Header */}
      <header
        className="sticky top-0 z-40 px-4 py-2.5 flex items-center justify-between"
        style={{
          background: "#FFFFFF",
          borderBottom: "1px solid #E5E7EB",
          boxShadow: "0 2px 12px rgba(13,71,161,0.06)",
        }}
      >
        <div className="flex items-center gap-2.5">
          <img
            src="/assets/uploads/logo-4-1.png"
            alt="XpertLab"
            className="h-[36px] object-contain"
            onError={(e) => {
              const img = e.currentTarget;
              img.src = "/assets/uploads/logo-5-2.png";
              img.onerror = () => {
                img.style.display = "none";
                const fallback = img.nextElementSibling as HTMLElement | null;
                if (fallback) fallback.style.display = "flex";
              };
            }}
          />
          <span
            className="hidden items-center gap-1 text-lg font-extrabold tracking-tight"
            style={{
              background: "linear-gradient(135deg, #0D47A1, #26A69A)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            XpertLab
          </span>
        </div>
        {roleLabel && (
          <span
            className="text-xs font-semibold px-3 py-1 rounded-full border"
            style={{
              background: "rgba(13,71,161,0.06)",
              color: "#0D47A1",
              borderColor: "rgba(13,71,161,0.18)",
            }}
          >
            {roleLabel}
          </span>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto pb-[90px]">{children}</main>

      {/* Bottom navigation */}
      <BottomNavigation
        items={navItemsWithBadge}
        currentPath={currentPath}
        onNavigate={onNavigate}
      />
    </div>
  );
};

export default StaffAppLayout;
