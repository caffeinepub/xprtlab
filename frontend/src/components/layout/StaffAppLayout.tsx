import React from 'react';
import BottomNavigation, { NavItem } from './BottomNavigation';
import { getDemoHomeCollections } from '../../utils/demoData';

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
  // Calculate pending home collection count for badge — recomputes on path change
  const pendingCount = React.useMemo(() => {
    const collections = getDemoHomeCollections();
    return collections.filter((c) => c.status !== 'COMPLETED').length;
  }, [currentPath]);

  // Inject badge count into the Home Visits nav item for phlebotomist
  const navItemsWithBadge: NavItem[] = navItems.map((item) => {
    if (
      (item.path === 'home-collection-queue' || item.path === '/home-collection-queue') &&
      pendingCount > 0
    ) {
      return { ...item, badgeCount: pendingCount };
    }
    return item;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Demo mode banner */}
      {isDemoMode && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 flex items-center justify-between">
          <span className="text-xs text-amber-700 font-medium">
            🎭 Demo Mode — data is not saved to the blockchain
          </span>
          {onExitDemo && (
            <button
              onClick={onExitDemo}
              className="text-xs text-amber-600 underline hover:text-amber-800 transition-colors"
            >
              Exit Demo
            </button>
          )}
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-3">
          <img
            src="/assets/logo-1.png"
            alt="XpertLab"
            className="h-8 object-contain"
          />
        </div>
        {roleLabel && (
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
            {roleLabel}
          </span>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto pb-20">{children}</main>

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
