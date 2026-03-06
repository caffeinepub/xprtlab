import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Principal } from "@dfinity/principal";
import { useQueryClient } from "@tanstack/react-query";
import {
  Building2,
  ChevronRight,
  Info,
  LogOut,
  Phone,
  Shield,
  User,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { useInternetIdentity } from "../../hooks/useInternetIdentity";
import {
  useGetAssignedHospitals,
  useGetCallerUserProfile,
  useGetHospitalsByPhlebotomist,
  useHospitals,
  useRemovePhlebotomistFromHospital,
} from "../../hooks/useQueries";

const APP_VERSION = "v1.0.0";
const ADMIN_PHONE = "+919876543210";

interface ProfilePageProps {
  onNavigate?: (route: string) => void;
  viewingPrincipal?: string; // if superAdmin is viewing a phlebotomist profile
  viewingRole?: string;
  currentUserRole?: string;
}

export default function ProfilePage({
  onNavigate: _onNavigate,
  viewingPrincipal,
  viewingRole,
  currentUserRole,
}: ProfilePageProps) {
  const { identity, clear } = useInternetIdentity();
  const queryClient = useQueryClient();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [removeHospitalTarget, setRemoveHospitalTarget] = useState<
    string | null
  >(null);
  const [removalReason, setRemovalReason] = useState("");

  const { data: userProfile, isLoading: profileLoading } =
    useGetCallerUserProfile();
  const {
    data: assignedHospitalsLegacy = [],
    isLoading: hospitalsLegacyLoading,
  } = useGetAssignedHospitals();

  const isAuthenticated = !!identity;
  const principalId = identity?.getPrincipal().toString();

  // Determine if we're showing phlebotomist's assigned hospitals via new system
  const effectiveRole = viewingRole ?? (userProfile?.appRole as string) ?? "";
  const isPhlebotomistView = effectiveRole === "phlebotomist";
  const isSuperAdminViewer = currentUserRole === "superAdmin";

  const phlebotomistPrincipal: Principal | null = viewingPrincipal
    ? Principal.fromText(viewingPrincipal)
    : principalId
      ? Principal.fromText(principalId)
      : null;

  const { data: assignedHospitalIds = [], isLoading: hospitalIdsLoading } =
    useGetHospitalsByPhlebotomist(
      isPhlebotomistView ? phlebotomistPrincipal : null,
    );

  const { data: allHospitals = [], isLoading: allHospitalsLoading } =
    useHospitals();

  const removeMutation = useRemovePhlebotomistFromHospital();

  // Map hospital IDs to full hospital objects
  const assignedHospitals = allHospitals.filter((h) =>
    assignedHospitalIds.includes(h.id),
  );

  const hospitalsLoading = isPhlebotomistView
    ? hospitalIdsLoading || allHospitalsLoading
    : hospitalsLegacyLoading;

  const handleLogoutConfirm = async () => {
    await clear();
    queryClient.clear();
    setShowLogoutDialog(false);
  };

  const handleRemoveHospital = async () => {
    if (!removeHospitalTarget || !phlebotomistPrincipal) return;
    try {
      await removeMutation.mutateAsync({
        hospitalId: removeHospitalTarget,
        phlebotomist: phlebotomistPrincipal,
        removalReason: removalReason.trim() || "Removed by admin",
      });
      toast.success("Hospital removed from phlebotomist profile.");
    } catch (err: any) {
      toast.error(`Failed to remove: ${err?.message ?? err}`);
    } finally {
      setRemoveHospitalTarget(null);
      setRemovalReason("");
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "phlebotomist":
        return "bg-blue-100 text-blue-700";
      case "labAdmin":
        return "bg-purple-100 text-purple-700";
      case "superAdmin":
        return "bg-red-100 text-red-700";
      default:
        return "bg-green-100 text-green-700";
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
                {userProfile?.name || "User"}
              </p>
              {userProfile?.appRole && (
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${getRoleBadgeColor(String(userProfile.appRole))}`}
                >
                  {String(userProfile.appRole).charAt(0).toUpperCase() +
                    String(userProfile.appRole).slice(1)}
                </span>
              )}
              {userProfile?.phone && (
                <p className="text-xs text-muted-foreground mt-1">
                  {userProfile.phone}
                </p>
              )}
              {userProfile?.area && (
                <p className="text-xs text-muted-foreground">
                  Zone: {userProfile.area}
                </p>
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
          <p className="text-xs text-muted-foreground font-mono break-all">
            {principalId}
          </p>
        </div>
      )}

      {/* Assigned Hospitals */}
      <div className="bg-white rounded-2xl border border-border shadow-sm p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-bold text-foreground">
              Assigned Hospitals
            </h3>
          </div>
        </div>

        {hospitalsLoading ? (
          <div className="space-y-2">
            {[1, 2].map((i) => (
              <div key={i} className="h-12 bg-muted rounded-xl animate-pulse" />
            ))}
          </div>
        ) : isPhlebotomistView ? (
          assignedHospitals.length === 0 ? (
            <p className="text-xs text-muted-foreground">
              No hospitals assigned yet. Contact admin.
            </p>
          ) : (
            <div className="space-y-2">
              {assignedHospitals.map((h) => (
                <div
                  key={h.id}
                  className="flex items-start justify-between gap-2 p-3 bg-muted/40 rounded-xl"
                >
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <Building2 className="h-4 w-4 text-primary/60 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">
                        {h.name}
                      </p>
                      {h.city && (
                        <p className="text-xs text-muted-foreground">
                          {h.city}
                        </p>
                      )}
                      {h.area && (
                        <p className="text-xs text-muted-foreground">
                          Zone: {h.area}
                        </p>
                      )}
                      <Badge
                        variant={h.isActive ? "default" : "secondary"}
                        className={`text-xs mt-0.5 ${h.isActive ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-gray-100 text-gray-500 border-gray-200"}`}
                      >
                        {h.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>
                  {isSuperAdminViewer && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-destructive hover:bg-destructive/10 flex-shrink-0"
                      onClick={() => setRemoveHospitalTarget(h.id)}
                    >
                      <X className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )
        ) : // Legacy assigned hospitals (non-phlebotomist roles)
        assignedHospitalsLegacy.length === 0 ? (
          <p className="text-xs text-muted-foreground">
            No hospitals assigned yet. Contact admin.
          </p>
        ) : (
          <div className="space-y-2">
            {assignedHospitalsLegacy.map((h: any) => (
              <div
                key={h.id}
                className="flex items-start gap-3 p-3 bg-muted/40 rounded-xl"
              >
                <Building2 className="h-4 w-4 text-primary/60 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {h.name}
                  </p>
                  {h.address && (
                    <p className="text-xs text-muted-foreground">{h.address}</p>
                  )}
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
          type="button"
          onClick={() => setShowLogoutDialog(true)}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-destructive/30 text-destructive hover:bg-destructive/5 transition-colors font-semibold text-sm"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      )}

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to log out? You will need to sign in again
              to access your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLogoutConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Remove Hospital Confirmation Dialog */}
      <AlertDialog
        open={!!removeHospitalTarget}
        onOpenChange={(open) => {
          if (!open) {
            setRemoveHospitalTarget(null);
            setRemovalReason("");
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Hospital Assignment</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove the phlebotomist from this hospital. Please
              provide a reason.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="px-1 pb-2">
            <Input
              placeholder="Reason for removal (optional)"
              value={removalReason}
              onChange={(e) => setRemovalReason(e.target.value)}
              className="text-sm"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRemoveHospital}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
