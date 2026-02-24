import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import {
  ArrowLeft,
  ShieldCheck,
  User,
  Stethoscope,
  FlaskConical,
  Crown,
  Info,
} from 'lucide-react';
import { AppRole } from '../../backend';
import { roleNavConfig } from '../../utils/roleConfig';
import MedicalCard from '../../components/shared/MedicalCard';
import RolePermissionsTable from '../../components/demo/RolePermissionsTable';
import MockBottomNav from '../../components/demo/MockBottomNav';
import {
  Home,
  FileText,
  User as UserIcon,
  ClipboardList,
  QrCode,
  Calendar,
  Shield,
  LayoutDashboard,
  CheckSquare,
  Activity,
} from 'lucide-react';

// ── Role metadata ──────────────────────────────────────────────────────────

interface RoleMeta {
  role: AppRole;
  label: string;
  shortLabel: string;
  description: string;
  responsibilities: string[];
  color: string;
  bgColor: string;
  icon: React.ReactNode;
  emoji: string;
}

const roleMeta: RoleMeta[] = [
  {
    role: AppRole.patient,
    label: 'Patient',
    shortLabel: 'Patient',
    description: 'End-users who book diagnostic tests, request home collection, and view their reports and vitals.',
    responsibilities: [
      'Book diagnostic tests online',
      'Request home sample collection',
      'View and download PDF reports',
      'Track booking status',
      'View personal vitals history',
    ],
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    icon: <User className="w-6 h-6" />,
    emoji: '👤',
  },
  {
    role: AppRole.phlebotomist,
    label: 'Phlebotomist',
    shortLabel: 'Phlebo',
    description: 'Field staff responsible for sample collection, home visits, camp check-ins, and recording patient vitals.',
    responsibilities: [
      'View and manage task queue',
      'Update task/collection status',
      'Scan QR codes at society camps',
      'Record BP and RBS readings',
      'Submit incident reports',
    ],
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    icon: <Stethoscope className="w-6 h-6" />,
    emoji: '🩺',
  },
  {
    role: AppRole.labAdmin,
    label: 'Lab Admin',
    shortLabel: 'Lab Admin',
    description: 'Laboratory administrators who manage bookings, upload reports, oversee home collections, and review incidents.',
    responsibilities: [
      'Manage all patient bookings',
      'Upload PDF lab reports',
      'Assign phlebotomists to requests',
      'Create society camp events',
      'Review incident reports',
    ],
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    icon: <FlaskConical className="w-6 h-6" />,
    emoji: '🔬',
  },
  {
    role: AppRole.superAdmin,
    label: 'Super Admin',
    shortLabel: 'Super',
    description: 'System administrators with full access including audit logs, user management, and all admin capabilities.',
    responsibilities: [
      'All Lab Admin capabilities',
      'View full audit log history',
      'Manage user roles and access',
      'Monitor system-wide activity',
      'Access all modules and data',
    ],
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    icon: <Crown className="w-6 h-6" />,
    emoji: '👑',
  },
];

// ── Icon map for nav items ─────────────────────────────────────────────────

const iconMap: Record<string, React.ReactNode> = {
  Home: <Home className="w-4 h-4" />,
  FlaskConical: <FlaskConical className="w-4 h-4" />,
  FileText: <FileText className="w-4 h-4" />,
  User: <UserIcon className="w-4 h-4" />,
  ClipboardList: <ClipboardList className="w-4 h-4" />,
  CheckSquare: <CheckSquare className="w-4 h-4" />,
  QrCode: <QrCode className="w-4 h-4" />,
  Calendar: <Calendar className="w-4 h-4" />,
  Shield: <Shield className="w-4 h-4" />,
  LayoutDashboard: <LayoutDashboard className="w-4 h-4" />,
  Activity: <Activity className="w-4 h-4" />,
};

// ── Main Page ──────────────────────────────────────────────────────────────

export default function RBACDemoPage() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<AppRole>(AppRole.patient);

  const activeMeta = roleMeta.find((m) => m.role === selectedRole)!;
  const navItems = roleNavConfig[selectedRole] || [];

  return (
    <div className="px-4 py-5 space-y-6 animate-fade-in pb-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate({ to: '/' })}
          className="w-9 h-9 rounded-xl border border-border flex items-center justify-center hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-foreground" />
        </button>
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand-blue" />
            <h1 className="text-xl font-bold text-foreground">Role-Based Access Control</h1>
          </div>
          <p className="text-sm text-muted-foreground">Module 2 — RBAC Demo</p>
        </div>
      </div>

      {/* Info banner */}
      <MedicalCard className="p-3">
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 text-brand-blue mt-0.5 shrink-0" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            XpertLab uses four distinct roles. Each role sees only the screens and features relevant to their responsibilities. Select a role below to explore its access level.
          </p>
        </div>
      </MedicalCard>

      {/* Role Switcher */}
      <div>
        <h2 className="text-sm font-semibold text-foreground mb-3">Select Role</h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {roleMeta.map((meta) => {
            const isActive = selectedRole === meta.role;
            return (
              <button
                key={meta.role}
                onClick={() => setSelectedRole(meta.role)}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border-2 transition-all font-medium text-xs ${
                  isActive
                    ? 'border-transparent text-white shadow-md'
                    : 'border-border text-muted-foreground hover:border-brand-blue/40 hover:text-foreground bg-card'
                }`}
                style={
                  isActive
                    ? { background: 'linear-gradient(135deg, #0D47A1 0%, #26C6DA 100%)' }
                    : {}
                }
              >
                <span className="text-xl">{meta.emoji}</span>
                <span>{meta.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Role Overview Panel */}
      <div>
        <h2 className="text-sm font-semibold text-foreground mb-3">Role Overview</h2>
        <MedicalCard>
          {/* Role header */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md"
              style={{ background: 'linear-gradient(135deg, #0D47A1 0%, #26C6DA 100%)' }}
            >
              {activeMeta.icon}
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">{activeMeta.label}</h3>
              <p className="text-xs text-muted-foreground">{activeMeta.description}</p>
            </div>
          </div>

          {/* Responsibilities */}
          <div className="mb-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Key Responsibilities
            </p>
            <ul className="space-y-1.5">
              {activeMeta.responsibilities.map((r) => (
                <li key={r} className="flex items-center gap-2 text-sm text-foreground">
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: 'linear-gradient(135deg, #0D47A1 0%, #26C6DA 100%)' }}
                  />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation items */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Navigation Items ({navItems.length})
            </p>
            <div className="flex flex-wrap gap-2">
              {navItems.map((item) => (
                <div
                  key={item.path + item.label}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-muted text-xs font-medium text-foreground"
                >
                  <span className="text-brand-blue">
                    {iconMap[item.iconName] || <Home className="w-4 h-4" />}
                  </span>
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </MedicalCard>
      </div>

      {/* Interactive Navigation Preview */}
      <div>
        <h2 className="text-sm font-semibold text-foreground mb-1">Navigation Simulation</h2>
        <p className="text-xs text-muted-foreground mb-3">
          Preview the bottom navigation bar for the <strong>{activeMeta.label}</strong> role. Tap items to see the active state — no real navigation occurs.
        </p>
        <MockBottomNav role={selectedRole} />
      </div>

      {/* Access Control Matrix */}
      <div>
        <h2 className="text-sm font-semibold text-foreground mb-1">Access Control Matrix</h2>
        <p className="text-xs text-muted-foreground mb-3">
          A full overview of which modules each role can access.
        </p>
        <RolePermissionsTable />
      </div>

      {/* Legend */}
      <MedicalCard className="p-3">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Legend</p>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-100">
              <span className="w-2.5 h-2.5 text-green-600 font-bold text-[10px]">✓</span>
            </span>
            <span className="text-xs text-foreground">Access granted</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-50">
              <span className="w-2.5 h-2.5 text-red-400 font-bold text-[10px]">✕</span>
            </span>
            <span className="text-xs text-foreground">No access</span>
          </div>
        </div>
      </MedicalCard>
    </div>
  );
}
