import React from 'react';
import { useNavigate, useLocation } from '@tanstack/react-router';
import {
  Home,
  FlaskConical,
  FileText,
  User,
  ClipboardList,
  QrCode,
  Calendar,
  Shield,
  LayoutDashboard,
  CheckSquare,
  Activity,
} from 'lucide-react';
import { AppRole } from '../../backend';
import { useAuth } from '../../hooks/useAuth';
import { roleNavConfig } from '../../utils/roleConfig';

const iconMap: Record<string, React.ReactNode> = {
  Home: <Home className="w-5 h-5" />,
  FlaskConical: <FlaskConical className="w-5 h-5" />,
  FileText: <FileText className="w-5 h-5" />,
  User: <User className="w-5 h-5" />,
  ClipboardList: <ClipboardList className="w-5 h-5" />,
  CheckSquare: <CheckSquare className="w-5 h-5" />,
  QrCode: <QrCode className="w-5 h-5" />,
  Calendar: <Calendar className="w-5 h-5" />,
  Shield: <Shield className="w-5 h-5" />,
  LayoutDashboard: <LayoutDashboard className="w-5 h-5" />,
  Activity: <Activity className="w-5 h-5" />,
};

export default function BottomNavigation() {
  const { userProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!userProfile) return null;

  const navItems = roleNavConfig[userProfile.appRole] || [];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-card border-t border-border z-40 shadow-card">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path ||
            (item.path !== '/' && location.pathname.startsWith(item.path));

          return (
            <button
              key={item.path + item.label}
              onClick={() => navigate({ to: item.path })}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all ${
                isActive
                  ? 'text-white'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              style={
                isActive
                  ? { background: 'linear-gradient(135deg, #0D47A1 0%, #26C6DA 100%)' }
                  : {}
              }
            >
              {iconMap[item.iconName] || <Home className="w-5 h-5" />}
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
