import React from 'react';
import type { LucideProps } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

export interface NavItem {
  label: string;
  path: string;
  icon: string;
  badgeCount?: number;
}

interface BottomNavigationProps {
  items: NavItem[];
  currentPath: string;
  onNavigate: (path: string) => void;
}

type LucideIconComponent = React.ForwardRefExoticComponent<
  Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
>;

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  items,
  currentPath,
  onNavigate,
}) => {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: '0 -4px 24px rgba(13, 71, 161, 0.10), 0 -1px 0 rgba(0,0,0,0.06)',
        borderTop: '1px solid rgba(255,255,255,0.6)',
      }}
    >
      <div className="flex items-center justify-around px-2 py-2 max-w-lg mx-auto">
        {items.map((item) => {
          const isActive = currentPath === item.path;
          const IconComponent = (LucideIcons as unknown as Record<string, LucideIconComponent>)[item.icon];

          return (
            <button
              key={item.path}
              onClick={() => onNavigate(item.path)}
              className="relative flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-200 min-w-[56px]"
              style={{
                background: isActive
                  ? 'linear-gradient(135deg, rgba(13,71,161,0.10) 0%, rgba(38,198,218,0.10) 100%)'
                  : 'transparent',
              }}
            >
              {/* Icon with optional badge */}
              <div className="relative">
                <span
                  className="transition-all duration-200"
                  style={{
                    color: isActive ? '#0D47A1' : '#9CA3AF',
                    filter: isActive
                      ? 'drop-shadow(0 0 4px rgba(38,198,218,0.4))'
                      : 'none',
                    transform: isActive ? 'scale(1.12)' : 'scale(1)',
                    display: 'block',
                  }}
                >
                  {IconComponent ? (
                    <IconComponent className="w-5 h-5" />
                  ) : (
                    <span className="w-5 h-5 block text-center text-base leading-5">{item.icon}</span>
                  )}
                </span>

                {/* Badge indicator */}
                {item.badgeCount !== undefined && item.badgeCount > 0 && (
                  <span
                    className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 px-0.5 rounded-full bg-red-500 text-white flex items-center justify-center leading-none font-bold"
                    style={{ fontSize: '9px' }}
                  >
                    {item.badgeCount > 99 ? '99+' : item.badgeCount}
                  </span>
                )}
              </div>

              <span
                className="text-xs font-semibold transition-all duration-200"
                style={{
                  color: isActive ? '#0D47A1' : '#9CA3AF',
                  fontFamily: "'Poppins', 'Inter', sans-serif",
                }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
