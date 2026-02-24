import React from 'react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { useGetCallerUserProfile } from '../../hooks/useQueries';
import { User, Phone, Shield, LogOut, ChevronRight, Heart } from 'lucide-react';
import { AppRole } from '../../backend';

interface ProfilePageProps {
  onNavigate: (route: string) => void;
  appType?: 'patient' | 'staff';
}

function getRoleLabel(role?: AppRole): string {
  switch (role) {
    case AppRole.patient: return 'Patient';
    case AppRole.phlebotomist: return 'Phlebotomist';
    case AppRole.labAdmin: return 'Lab Admin';
    case AppRole.superAdmin: return 'Super Admin';
    default: return 'User';
  }
}

function getRoleColor(role?: AppRole): string {
  switch (role) {
    case AppRole.patient: return 'bg-accent/10 text-accent';
    case AppRole.phlebotomist: return 'bg-primary/10 text-primary';
    case AppRole.labAdmin: return 'bg-secondary/10 text-secondary';
    case AppRole.superAdmin: return 'bg-destructive/10 text-destructive';
    default: return 'bg-muted text-muted-foreground';
  }
}

export default function ProfilePage({ onNavigate, appType = 'patient' }: ProfilePageProps) {
  const { identity, clear } = useInternetIdentity();
  const queryClient = useQueryClient();
  const { data: profile, isLoading } = useGetCallerUserProfile();

  const handleSignOut = async () => {
    await clear();
    queryClient.clear();
  };

  const principal = identity?.getPrincipal().toString();
  const shortPrincipal = principal
    ? `${principal.slice(0, 8)}...${principal.slice(-6)}`
    : 'Unknown';

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4 max-w-lg mx-auto">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-5 text-white shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
            <User className="w-8 h-8 text-white" />
          </div>
          <div className="min-w-0">
            <h2 className="text-xl font-bold truncate">{profile?.name || 'User'}</h2>
            <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mt-1 bg-white/20 text-white`}>
              {getRoleLabel(profile?.appRole)}
            </span>
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold text-sm text-foreground">Account Details</h3>
        </div>
        <div className="divide-y divide-border">
          <div className="flex items-center gap-3 p-4">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Full Name</p>
              <p className="text-sm font-medium text-foreground truncate">{profile?.name || '—'}</p>
            </div>
          </div>
          {profile?.phone && (
            <div className="flex items-center gap-3 p-4">
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4 text-accent" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="text-sm font-medium text-foreground">{profile.phone}</p>
              </div>
            </div>
          )}
          <div className="flex items-center gap-3 p-4">
            <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
              <Shield className="w-4 h-4 text-secondary" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Principal ID</p>
              <p className="text-xs font-mono text-foreground truncate">{shortPrincipal}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sign Out */}
      <button
        onClick={handleSignOut}
        className="w-full flex items-center justify-between bg-destructive/5 border border-destructive/20 rounded-2xl p-4 hover:bg-destructive/10 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center">
            <LogOut className="w-4 h-4 text-destructive" />
          </div>
          <span className="text-sm font-medium text-destructive">Sign Out</span>
        </div>
        <ChevronRight className="w-4 h-4 text-destructive/60" />
      </button>

      {/* Footer */}
      <div className="text-center py-2 text-xs text-muted-foreground">
        <p>
          Built with <Heart className="inline w-3 h-3 text-red-400 mx-0.5" /> using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname || 'xpertlab')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground"
          >
            caffeine.ai
          </a>
        </p>
        <p className="mt-0.5">© {new Date().getFullYear()} XpertLab</p>
      </div>
    </div>
  );
}
