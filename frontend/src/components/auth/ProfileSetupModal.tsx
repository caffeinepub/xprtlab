import React, { useState } from 'react';
import { useSaveCallerUserProfile } from '../../hooks/useQueries';
import { AppRole } from '../../backend';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import GradientButton from '../shared/GradientButton';

interface ProfileSetupModalProps {
  onComplete: () => void;
  defaultRole?: AppRole;
}

export default function ProfileSetupModal({ onComplete, defaultRole = AppRole.patient }: ProfileSetupModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<AppRole>(defaultRole);
  const saveProfile = useSaveCallerUserProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    await saveProfile.mutateAsync({
      name: name.trim(),
      phone: phone.trim(),
      appRole: role,
    });
    onComplete();
  };

  const isStaffDefault = defaultRole !== AppRole.patient;

  return (
    <Dialog open>
      <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Complete Your Profile</DialogTitle>
          <DialogDescription>
            Please provide your details to get started with XpertLab.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-1.5">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 XXXXX XXXXX"
              type="tel"
            />
          </div>
          {isStaffDefault && (
            <div className="space-y-1.5">
              <Label htmlFor="role">Your Role</Label>
              <Select value={role} onValueChange={(v) => setRole(v as AppRole)}>
                <SelectTrigger id="role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={AppRole.phlebotomist}>Phlebotomist</SelectItem>
                  <SelectItem value={AppRole.labAdmin}>Lab Admin</SelectItem>
                  <SelectItem value={AppRole.superAdmin}>Super Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          <GradientButton
            type="submit"
            loading={saveProfile.isPending}
            className="w-full"
          >
            Save Profile & Continue
          </GradientButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}
