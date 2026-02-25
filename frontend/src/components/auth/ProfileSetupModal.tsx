import React, { useState } from 'react';
import { AppRole } from '../../types/models';
import { useSaveCallerUserProfile } from '../../hooks/useQueries';
import { Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface ProfileSetupModalProps {
  open: boolean;
  appType?: 'patient' | 'staff';
  onComplete?: () => void;
}

export default function ProfileSetupModal({ open, appType = 'patient', onComplete }: ProfileSetupModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<AppRole>('patient');
  const saveMutation = useSaveCallerUserProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      await saveMutation.mutateAsync({ name, phone, appRole: role });
      onComplete?.();
    } catch (err) {
      console.error('Failed to save profile', err);
    }
  };

  const staffRoles: { value: AppRole; label: string }[] = [
    { value: 'phlebotomist', label: 'Phlebotomist' },
    { value: 'labAdmin', label: 'Lab Admin' },
    { value: 'superAdmin', label: 'Super Admin' },
  ];

  return (
    <Dialog open={open}>
      <DialogContent className="max-w-sm mx-auto">
        <DialogHeader>
          <DialogTitle>Complete Your Profile</DialogTitle>
          <DialogDescription>
            Please provide your details to get started.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-foreground">Full Name *</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter your full name"
              required
              className="w-full px-3 py-2 rounded-xl border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-foreground">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
              placeholder="10-digit mobile number"
              className="w-full px-3 py-2 rounded-xl border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          {appType === 'staff' && (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">Role *</label>
              <select
                value={role}
                onChange={e => setRole(e.target.value as AppRole)}
                className="w-full px-3 py-2 rounded-xl border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white"
              >
                {staffRoles.map(r => (
                  <option key={r.value} value={r.value}>{r.label}</option>
                ))}
              </select>
            </div>
          )}
          <button
            type="submit"
            disabled={saveMutation.isPending || !name.trim()}
            className="w-full py-3 rounded-xl bg-primary text-white font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {saveMutation.isPending ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Saving...</>
            ) : 'Save Profile'}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
