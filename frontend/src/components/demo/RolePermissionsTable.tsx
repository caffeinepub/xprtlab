import React from 'react';
import { Check, X } from 'lucide-react';
import { AppRole } from '../../backend';
import MedicalCard from '../shared/MedicalCard';

interface PermissionRow {
  module: string;
  icon: string;
  permissions: Record<AppRole, boolean>;
}

const permissionsData: PermissionRow[] = [
  {
    module: 'Test Booking',
    icon: '🧪',
    permissions: {
      [AppRole.patient]: true,
      [AppRole.phlebotomist]: false,
      [AppRole.labAdmin]: true,
      [AppRole.superAdmin]: true,
    },
  },
  {
    module: 'Home Collection',
    icon: '🏠',
    permissions: {
      [AppRole.patient]: true,
      [AppRole.phlebotomist]: true,
      [AppRole.labAdmin]: true,
      [AppRole.superAdmin]: true,
    },
  },
  {
    module: 'PDF Reports',
    icon: '📄',
    permissions: {
      [AppRole.patient]: true,
      [AppRole.phlebotomist]: false,
      [AppRole.labAdmin]: true,
      [AppRole.superAdmin]: true,
    },
  },
  {
    module: 'BP/RBS Entry',
    icon: '💉',
    permissions: {
      [AppRole.patient]: false,
      [AppRole.phlebotomist]: true,
      [AppRole.labAdmin]: true,
      [AppRole.superAdmin]: true,
    },
  },
  {
    module: 'Phlebotomist Task Queue',
    icon: '📋',
    permissions: {
      [AppRole.patient]: false,
      [AppRole.phlebotomist]: true,
      [AppRole.labAdmin]: true,
      [AppRole.superAdmin]: true,
    },
  },
  {
    module: 'Society Camp QR',
    icon: '📷',
    permissions: {
      [AppRole.patient]: false,
      [AppRole.phlebotomist]: true,
      [AppRole.labAdmin]: true,
      [AppRole.superAdmin]: true,
    },
  },
  {
    module: 'Incident Log',
    icon: '⚠️',
    permissions: {
      [AppRole.patient]: false,
      [AppRole.phlebotomist]: true,
      [AppRole.labAdmin]: true,
      [AppRole.superAdmin]: true,
    },
  },
  {
    module: 'Audit Log',
    icon: '🔍',
    permissions: {
      [AppRole.patient]: false,
      [AppRole.phlebotomist]: false,
      [AppRole.labAdmin]: false,
      [AppRole.superAdmin]: true,
    },
  },
  {
    module: 'User Management',
    icon: '👥',
    permissions: {
      [AppRole.patient]: false,
      [AppRole.phlebotomist]: false,
      [AppRole.labAdmin]: false,
      [AppRole.superAdmin]: true,
    },
  },
];

const roleColumns: { role: AppRole; label: string; shortLabel: string }[] = [
  { role: AppRole.patient, label: 'Patient', shortLabel: 'Patient' },
  { role: AppRole.phlebotomist, label: 'Phlebotomist', shortLabel: 'Phlebo' },
  { role: AppRole.labAdmin, label: 'Lab Admin', shortLabel: 'Lab' },
  { role: AppRole.superAdmin, label: 'Super Admin', shortLabel: 'Super' },
];

export default function RolePermissionsTable() {
  return (
    <MedicalCard className="p-0 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[420px]">
          <thead>
            <tr>
              <th
                className="text-left px-4 py-3 text-sm font-semibold text-white"
                style={{ background: 'linear-gradient(135deg, #0D47A1 0%, #26C6DA 100%)' }}
              >
                Module / Feature
              </th>
              {roleColumns.map((col) => (
                <th
                  key={col.role}
                  className="px-3 py-3 text-center text-xs font-semibold text-white whitespace-nowrap"
                  style={{ background: 'linear-gradient(135deg, #0D47A1 0%, #26C6DA 100%)' }}
                >
                  <span className="hidden sm:inline">{col.label}</span>
                  <span className="sm:hidden">{col.shortLabel}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {permissionsData.map((row, idx) => (
              <tr
                key={row.module}
                className={idx % 2 === 0 ? 'bg-card' : 'bg-muted/40'}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-base leading-none">{row.icon}</span>
                    <span className="text-sm font-medium text-foreground">{row.module}</span>
                  </div>
                </td>
                {roleColumns.map((col) => (
                  <td key={col.role} className="px-3 py-3 text-center">
                    {row.permissions[col.role] ? (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 mx-auto">
                        <Check className="w-3.5 h-3.5 text-green-600" strokeWidth={2.5} />
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-50 mx-auto">
                        <X className="w-3.5 h-3.5 text-red-400" strokeWidth={2.5} />
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MedicalCard>
  );
}
