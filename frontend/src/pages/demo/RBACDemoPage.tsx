import React, { useState } from 'react';
import { AppRole } from '../../types/models';
import RolePermissionsTable from '../../components/demo/RolePermissionsTable';
import MockBottomNav from '../../components/demo/MockBottomNav';
import { roleNavConfig } from '../../utils/roleConfig';

const roleDescriptions: Record<AppRole, { title: string; responsibilities: string[] }> = {
  patient: {
    title: 'Patient',
    responsibilities: ['Book lab tests', 'Request home collection', 'View reports', 'Track vitals'],
  },
  phlebotomist: {
    title: 'Phlebotomist',
    responsibilities: ['Manage attendance', 'Collect hospital samples', 'Handle home visits', 'Record vitals'],
  },
  labAdmin: {
    title: 'Lab Admin',
    responsibilities: ['Manage bookings', 'Upload reports', 'View billing', 'Monitor attendance'],
  },
  superAdmin: {
    title: 'Super Admin',
    responsibilities: ['Full system access', 'View audit logs', 'Security monitoring', 'Manage incidents'],
  },
};

export default function RBACDemoPage() {
  const [selectedRole, setSelectedRole] = useState<AppRole>('patient');
  const [activeNav, setActiveNav] = useState<string>('');

  const navItems = roleNavConfig[selectedRole];
  const desc = roleDescriptions[selectedRole];

  const roleColors: Record<AppRole, string> = {
    patient: 'bg-green-50 border-green-200 text-green-700',
    phlebotomist: 'bg-blue-50 border-blue-200 text-blue-700',
    labAdmin: 'bg-purple-50 border-purple-200 text-purple-700',
    superAdmin: 'bg-red-50 border-red-200 text-red-700',
  };

  return (
    <div className="p-4 space-y-6 max-w-2xl mx-auto">
      <div>
        <h2 className="text-xl font-bold text-foreground">RBAC Demo</h2>
        <p className="text-sm text-muted-foreground">Role-Based Access Control demonstration</p>
      </div>

      {/* Role Switcher */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {(Object.keys(roleDescriptions) as AppRole[]).map(role => (
          <button
            key={role}
            onClick={() => { setSelectedRole(role); setActiveNav(''); }}
            className={`p-3 rounded-xl border font-semibold text-xs transition-colors ${
              selectedRole === role ? roleColors[role] : 'bg-white border-border text-muted-foreground hover:bg-muted/30'
            }`}
          >
            {roleDescriptions[role].title}
          </button>
        ))}
      </div>

      {/* Role Overview */}
      <div className={`rounded-2xl border p-4 space-y-2 ${roleColors[selectedRole]}`}>
        <h3 className="font-bold text-sm">{desc.title} Role</h3>
        <ul className="space-y-1">
          {desc.responsibilities.map((r, i) => (
            <li key={i} className="text-xs flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-current flex-shrink-0" />
              {r}
            </li>
          ))}
        </ul>
      </div>

      {/* Mock Bottom Nav */}
      <div className="space-y-2">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Navigation Preview</p>
        <MockBottomNav
          navItems={navItems}
          activeItem={activeNav}
          onItemClick={setActiveNav}
          userRole={selectedRole}
        />
      </div>

      {/* Permissions Table */}
      <div className="space-y-2">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Access Matrix</p>
        <RolePermissionsTable />
      </div>
    </div>
  );
}
