import React from 'react';
import { AppRole } from '../../types/models';
import { Check, X } from 'lucide-react';

interface Permission {
  module: string;
  patient: boolean;
  phlebotomist: boolean;
  labAdmin: boolean;
  superAdmin: boolean;
}

const permissions: Permission[] = [
  { module: 'Book Tests', patient: true, phlebotomist: false, labAdmin: false, superAdmin: true },
  { module: 'Home Collection', patient: true, phlebotomist: true, labAdmin: false, superAdmin: true },
  { module: 'View Reports', patient: true, phlebotomist: false, labAdmin: true, superAdmin: true },
  { module: 'Upload Reports', patient: false, phlebotomist: false, labAdmin: true, superAdmin: true },
  { module: 'Record Vitals', patient: false, phlebotomist: true, labAdmin: false, superAdmin: true },
  { module: 'Attendance', patient: false, phlebotomist: true, labAdmin: true, superAdmin: true },
  { module: 'Hospital Samples', patient: false, phlebotomist: true, labAdmin: true, superAdmin: true },
  { module: 'Incidents', patient: false, phlebotomist: true, labAdmin: false, superAdmin: true },
  { module: 'Audit Logs', patient: false, phlebotomist: false, labAdmin: false, superAdmin: true },
];

const roles: { key: keyof Omit<Permission, 'module'>; label: string }[] = [
  { key: 'patient', label: 'Patient' },
  { key: 'phlebotomist', label: 'Phlebotomist' },
  { key: 'labAdmin', label: 'Lab Admin' },
  { key: 'superAdmin', label: 'Super Admin' },
];

export default function RolePermissionsTable() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gradient-to-r from-primary to-primary/80">
            <th className="text-left px-4 py-3 text-white font-bold text-xs">Module</th>
            {roles.map(r => (
              <th key={r.key} className="px-3 py-3 text-white font-bold text-xs text-center">{r.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {permissions.map((perm, i) => (
            <tr key={perm.module} className={i % 2 === 0 ? 'bg-white' : 'bg-muted/30'}>
              <td className="px-4 py-2.5 font-semibold text-foreground text-xs">{perm.module}</td>
              {roles.map(r => (
                <td key={r.key} className="px-3 py-2.5 text-center">
                  {perm[r.key] ? (
                    <Check className="h-4 w-4 text-green-500 mx-auto" />
                  ) : (
                    <X className="h-4 w-4 text-red-400 mx-auto" />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
