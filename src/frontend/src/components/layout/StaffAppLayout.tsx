import { Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
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

interface SearchResult {
  id: string;
  name: string;
  category: string;
  categoryColor: string;
}

function useGlobalSearch(query: string): SearchResult[] {
  return React.useMemo(() => {
    if (query.length < 2) return [];
    const q = query.toLowerCase();
    const results: SearchResult[] = [];

    // Hospitals
    try {
      const raw = localStorage.getItem("xpertlab_hospitals");
      if (raw) {
        const hospitals = JSON.parse(raw) as { id: string; name: string }[];
        for (const h of hospitals) {
          if (h.name.toLowerCase().includes(q)) {
            results.push({
              id: `hospital-${h.id}`,
              name: h.name,
              category: "Hospital",
              categoryColor: "#7C3AED",
            });
          }
        }
      }
    } catch {
      /* noop */
    }

    // Phlebotomists
    try {
      const raw = localStorage.getItem("xpertlab_phlebotomists");
      if (raw) {
        const phlebs = JSON.parse(raw) as { id: string; name: string }[];
        for (const p of phlebs) {
          if (p.name.toLowerCase().includes(q)) {
            results.push({
              id: `phlebotomist-${p.id}`,
              name: p.name,
              category: "Phlebotomist",
              categoryColor: "#0D9488",
            });
          }
        }
      }
    } catch {
      /* noop */
    }

    // Tests
    try {
      const raw = localStorage.getItem("xpertlab_tests");
      if (raw) {
        const tests = JSON.parse(raw) as { id: string; testName: string }[];
        for (const t of tests) {
          if (t.testName?.toLowerCase().includes(q)) {
            results.push({
              id: `test-${t.id}`,
              name: t.testName,
              category: "Test",
              categoryColor: "#1D4ED8",
            });
          }
        }
      }
    } catch {
      /* noop */
    }

    return results.slice(0, 5);
  }, [query]);
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
  const isSuperAdmin = roleLabel === "Super Admin";

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

  // Global search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchResults = useGlobalSearch(searchQuery);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

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
        className="sticky top-0 z-40 px-4 py-2.5 flex items-center justify-between gap-3"
        style={{
          background: "#FFFFFF",
          borderBottom: "1px solid #E5E7EB",
          boxShadow: "0 2px 12px rgba(13,71,161,0.06)",
        }}
      >
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <img
            src="/assets/logo.png"
            alt="XpertLab"
            className="h-[36px] w-auto object-contain"
          />
        </div>

        {/* Global search — Super Admin only */}
        {isSuperAdmin && (
          <div
            ref={searchContainerRef}
            className="relative flex-1 max-w-xs mx-2"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
              <input
                data-ocid="superadmin.search.input"
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchOpen(true);
                }}
                onFocus={() => setSearchOpen(true)}
                placeholder="Search hospitals, tests..."
                className="w-full py-2 pl-9 pr-3 text-sm outline-none transition-all"
                style={{
                  background: "#F7F9FC",
                  border: "1px solid #E5E7EB",
                  borderRadius: "10px",
                  fontSize: "14px",
                }}
              />
            </div>

            {/* Dropdown results */}
            {searchOpen && searchQuery.length >= 2 && (
              <div
                className="absolute left-0 right-0 top-full mt-1 bg-white rounded-xl overflow-hidden z-50"
                style={{
                  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                  border: "1px solid #E5E7EB",
                }}
              >
                {searchResults.length === 0 ? (
                  <div className="px-4 py-3 text-xs text-gray-400">
                    No results found for "{searchQuery}"
                  </div>
                ) : (
                  searchResults.map((r) => (
                    <button
                      type="button"
                      key={r.id}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-gray-50 cursor-pointer transition-colors text-left"
                      onClick={() => {
                        setSearchOpen(false);
                        setSearchQuery("");
                      }}
                    >
                      <div
                        className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                        style={{ background: `${r.categoryColor}18` }}
                      >
                        <Search
                          className="w-3 h-3"
                          style={{ color: r.categoryColor }}
                        />
                      </div>
                      <span className="text-sm text-gray-700 font-medium flex-1 truncate">
                        {r.name}
                      </span>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-semibold flex-shrink-0"
                        style={{
                          background: `${r.categoryColor}18`,
                          color: r.categoryColor,
                        }}
                      >
                        {r.category}
                      </span>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        )}

        {roleLabel && (
          <span
            className="text-xs font-semibold px-3 py-1 rounded-full border flex-shrink-0"
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
