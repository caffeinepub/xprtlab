import React, { useState } from 'react';
import { LogOut, User, Shield, Phone, Building2, Info, Loader2, ChevronRight } from 'lucide-react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { useGetCallerUserProfile, useGetAssignedHospitals } from '../../hooks/useQueries';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const APP_VERSION = 'v1.0.0';
const ADMIN_PHONE = '+919876543210';

interface ProfilePageProps {
  onNavigate?: (route: string) => void;
}

export default function ProfilePage({ onNavigate }: ProfilePageProps) {
  const { identity, clear } = useInternetIdentity();
  const queryClient = useQueryClient();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const { data: userProfile, isLoading: profileLoading } = useGetCallerUserProfile();
  const { data: assignedHospitals = [], isLoading: hospitalsLoading } = useGetAssignedHospitals();

  const isAuthenticated = !!identity;
  const principalId = identity?.getPrincipal().toString();

  const handleLogoutConfirm = async () => {
    await clear();
    queryClient.clear();
    setShowLogoutDialog(false);
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'phlebotomist': return 'bg-blue-100 text-blue-700';
      case 'labAdmin': return 'bg-purple-100 text-purple-700';
      case 'superAdmin': return 'bg-red-100 text-red-700';
      default: return 'bg-green-100 text-green-700';
    }
  };

  return (
    <div className="p-4 space-y-4 max-w-lg mx-auto">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl border border-border shadow-sm p-5 flex items-center gap-4">
        <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <User className="h-7 w-7 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          {profileLoading ? (
            <div className="space-y-1.5">
              <div className="h-4 w-32 bg-muted rounded animate-pulse" />
              <div className="h-3 w-24 bg-muted rounded animate-pulse" />
            </div>
          ) : (
            <>
              <p className="font-bold text-base text-foreground truncate">
                {userProfile?.name || 'User'}
              </p>
              {userProfile?.appRole && (
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${getRoleBadgeColor(String(userProfile.appRole))}`}>
                  {String(userProfile.appRole).charAt(0).toUpperCase() + String(userProfile.appRole).slice(1)}
                </span>
              )}
              {userProfile?.phone && (
                <p className="text-xs text-muted-foreground mt-1">{userProfile.phone}</p>
              )}
            </>
          )}
        </div>
      </div>

      {/* Principal ID */}
      {principalId && (
        <div className="bg-white rounded-2xl border border-border shadow-sm p-4">
          <div className="flex items-center gap-2 mb-1">
            <Shield className="h-4 w-4 text-primary" />
            <p className="text-xs font-bold text-foreground">Principal ID</p>
          </div>
          <p className="text-xs text-muted-foreground font-mono break-all">{principalId}</p>
        </div>
      )}

      {/* Assigned Hospitals */}
      <div className="bg-white rounded-2xl border border-border shadow-sm p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-bold text-foreground">Assigned Hospitals</h3>
        </div>
        {hospitalsLoading ? (
          <div className="space-y-2">
            {[1, 2].map(i => (
              <div key={i} className="h-12 bg-muted rounded-xl animate-pulse" />
            ))}
          </div>
        ) : assignedHospitals.length === 0 ? (
          <p className="text-xs text-muted-foreground">No hospitals assigned yet. Contact admin.</p>
        ) : (
          <div className="space-y-2">
            {assignedHospitals.map((h: any) => (
              <div key={h.id} className="flex items-start gap-3 p-3 bg-muted/40 rounded-xl">
                <Building2 className="h-4 w-4 text-primary/60 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground">{h.name}</p>
                  {h.address && <p className="text-xs text-muted-foreground">{h.address}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Support / Call Admin */}
      <div className="bg-white rounded-2xl border border-border shadow-sm p-4">
        <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
          <Phone className="h-4 w-4 text-primary" /> Support
        </h3>
        <a
          href={`tel:${ADMIN_PHONE}`}
          className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-green-600" />
            <div>
              <p className="text-sm font-semibold text-green-700">Call Admin</p>
              <p className="text-xs text-green-600">{ADMIN_PHONE}</p>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-green-600" />
        </a>
      </div>

      {/* App Info */}
      <div className="bg-white rounded-2xl border border-border shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-primary" />
            <p className="text-sm font-bold text-foreground">App Version</p>
          </div>
          <span className="text-xs font-semibold text-muted-foreground bg-muted px-2 py-1 rounded-full">
            {APP_VERSION}
          </span>
        </div>
      </div>

      {/* Logout */}
      {isAuthenticated && (
        <button
          onClick={() => setShowLogoutDialog(true)}
          className="w-full py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 font-bold text-sm flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
        >
          <LogOut className="h-4 w-4" /> Sign Out
        </button>
      )}

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sign Out</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to log out? You will need to sign in again to access the app.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLogoutConfirm}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Sign Out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
