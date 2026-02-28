import React, { useState, useMemo } from 'react';
import {
  Building2,
  ArrowLeft,
  Users,
  Plus,
  X,
  Search,
  MapPin,
  Phone,
  Loader2,
  UserCheck,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  useHospitalById,
  useGetPhlebotomistsByHospital,
  useAssignPhlebotomistToHospital,
  useRemovePhlebotomistFromHospital,
} from '../../hooks/useQueries';
import { useActor } from '../../hooks/useActor';
import { Principal } from '@dfinity/principal';
import { toast } from 'sonner';
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
import { UserProfile } from '../../backend';

interface HospitalDetailsPageProps {
  hospitalId: string;
  role?: string;
  onNavigate?: (page: string) => void;
}

export default function HospitalDetailsPage({ hospitalId, role, onNavigate }: HospitalDetailsPageProps) {
  const isSuperAdmin = role === 'superAdmin';
  const { actor } = useActor();

  const { data: hospital, isLoading: hospitalLoading } = useHospitalById(hospitalId);
  const { data: assignedPrincipals = [], isLoading: assignedLoading, refetch: refetchAssigned } =
    useGetPhlebotomistsByHospital(hospitalId);

  const assignMutation = useAssignPhlebotomistToHospital();
  const removeMutation = useRemovePhlebotomistFromHospital();

  // All phlebotomists (fetched from backend user profiles)
  const [allPhlebotomists, setAllPhlebotomists] = useState<Array<{ principal: string; profile: UserProfile }>>([]);
  const [phlebotomistsLoading, setPhlebotomistsLoading] = useState(false);

  const [showAssignPanel, setShowAssignPanel] = useState(false);
  const [assignSearch, setAssignSearch] = useState('');
  const [selectedToAssign, setSelectedToAssign] = useState<string[]>([]);
  const [removeTarget, setRemoveTarget] = useState<string | null>(null);
  const [removalReason, setRemovalReason] = useState('');

  const assignedSet = useMemo(
    () => new Set(assignedPrincipals.map((p) => p.toString())),
    [assignedPrincipals]
  );

  const loadAllPhlebotomists = async () => {
    if (!actor) return;
    setPhlebotomistsLoading(true);
    try {
      // We use getUserProfile for each known principal — but since we don't have a listUsers endpoint,
      // we rely on the phlebotomists already assigned or use a workaround via any available method.
      // The backend doesn't expose a listAllUsers endpoint, so we fetch what we can.
      const result = await (actor as any).getAllPhlebotomists?.();
      if (result && Array.isArray(result)) {
        setAllPhlebotomists(result);
      }
    } catch {
      // fallback: empty list
    } finally {
      setPhlebotomistsLoading(false);
    }
  };

  const handleOpenAssignPanel = () => {
    setShowAssignPanel(true);
    setSelectedToAssign([]);
    setAssignSearch('');
    loadAllPhlebotomists();
  };

  const filteredPhlebotomists = useMemo(() => {
    const term = assignSearch.toLowerCase();
    return allPhlebotomists.filter((p) => {
      const name = p.profile.name.toLowerCase();
      const area = (p.profile.area ?? '').toLowerCase();
      return (
        !assignedSet.has(p.principal) &&
        (name.includes(term) || area.includes(term) || p.principal.toLowerCase().includes(term))
      );
    });
  }, [allPhlebotomists, assignSearch, assignedSet]);

  const handleSaveAssignments = async () => {
    if (selectedToAssign.length === 0) {
      toast.error('Please select at least one phlebotomist.');
      return;
    }
    let successCount = 0;
    for (const principalStr of selectedToAssign) {
      try {
        await assignMutation.mutateAsync({
          hospitalId,
          phlebotomist: Principal.fromText(principalStr),
        });
        successCount++;
      } catch (err: any) {
        toast.error(`Failed to assign ${principalStr}: ${err?.message ?? err}`);
      }
    }
    if (successCount > 0) {
      toast.success(`${successCount} phlebotomist(s) assigned successfully.`);
      refetchAssigned();
    }
    setShowAssignPanel(false);
    setSelectedToAssign([]);
  };

  const handleRemoveConfirm = async () => {
    if (!removeTarget) return;
    try {
      await removeMutation.mutateAsync({
        hospitalId,
        phlebotomist: Principal.fromText(removeTarget),
        removalReason: removalReason.trim() || 'Removed by admin',
      });
      toast.success('Phlebotomist removed from hospital.');
      refetchAssigned();
    } catch (err: any) {
      toast.error(`Failed to remove: ${err?.message ?? err}`);
    } finally {
      setRemoveTarget(null);
      setRemovalReason('');
    }
  };

  if (hospitalLoading) {
    return (
      <div className="flex items-center justify-center h-full py-20">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!hospital) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-20 text-center px-4">
        <Building2 className="h-12 w-12 text-muted-foreground/40 mb-3" />
        <p className="text-base font-semibold text-foreground">Hospital not found.</p>
        <Button variant="outline" className="mt-4" onClick={() => onNavigate?.('hospital-management')}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Hospitals
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 border-b border-border bg-background">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onNavigate?.('hospital-management')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-base font-bold text-foreground truncate">{hospital.name}</h1>
              <Badge
                variant={hospital.isActive ? 'default' : 'secondary'}
                className={hospital.isActive ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-gray-100 text-gray-500 border-gray-200'}
              >
                {hospital.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-4 py-4 space-y-4">
        {/* Hospital Info Card */}
        <div className="bg-white rounded-xl border border-border shadow-sm p-4 space-y-2">
          <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Building2 className="h-4 w-4 text-primary" /> Hospital Details
          </h2>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {hospital.city && (
              <div>
                <p className="text-muted-foreground">City</p>
                <p className="font-medium text-foreground flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> {hospital.city}
                </p>
              </div>
            )}
            {hospital.area && (
              <div>
                <p className="text-muted-foreground">Area / Zone</p>
                <p className="font-medium text-foreground">{hospital.area}</p>
              </div>
            )}
            {hospital.contactNumber && (
              <div>
                <p className="text-muted-foreground">Contact</p>
                <p className="font-medium text-foreground flex items-center gap-1">
                  <Phone className="h-3 w-3" /> {hospital.contactNumber}
                </p>
              </div>
            )}
            {hospital.address && (
              <div className="col-span-2">
                <p className="text-muted-foreground">Address</p>
                <p className="font-medium text-foreground">{hospital.address}</p>
              </div>
            )}
          </div>
        </div>

        {/* Assigned Phlebotomists */}
        <div className="bg-white rounded-xl border border-border shadow-sm p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" /> Assigned Phlebotomists
              {assignedPrincipals.length > 0 && (
                <span className="text-xs font-normal text-muted-foreground">({assignedPrincipals.length})</span>
              )}
            </h2>
            {isSuperAdmin && !showAssignPanel && (
              <Button size="sm" variant="outline" onClick={handleOpenAssignPanel} className="gap-1.5 text-xs h-7">
                <Plus className="h-3 w-3" /> Assign
              </Button>
            )}
          </div>

          {/* Assign Panel */}
          {showAssignPanel && isSuperAdmin && (
            <div className="border border-border rounded-lg p-3 space-y-3 bg-muted/20">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                <Input
                  className="pl-8 h-8 text-xs"
                  placeholder="Search phlebotomists..."
                  value={assignSearch}
                  onChange={(e) => setAssignSearch(e.target.value)}
                />
              </div>

              {phlebotomistsLoading ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                </div>
              ) : filteredPhlebotomists.length === 0 ? (
                <p className="text-xs text-muted-foreground text-center py-3">
                  {allPhlebotomists.length === 0
                    ? 'No phlebotomists available.'
                    : 'All phlebotomists are already assigned or no matches found.'}
                </p>
              ) : (
                <div className="space-y-1.5 max-h-48 overflow-y-auto">
                  {filteredPhlebotomists.map((p) => {
                    const isSelected = selectedToAssign.includes(p.principal);
                    const sameArea = hospital.area && p.profile.area && hospital.area.toLowerCase() === (p.profile.area ?? '').toLowerCase();
                    return (
                      <button
                        key={p.principal}
                        onClick={() =>
                          setSelectedToAssign((prev) =>
                            isSelected ? prev.filter((x) => x !== p.principal) : [...prev, p.principal]
                          )
                        }
                        className={[
                          'w-full text-left p-2.5 rounded-lg border transition-all flex items-center justify-between gap-2',
                          isSelected ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40',
                        ].join(' ')}
                      >
                        <div>
                          <p className="text-xs font-semibold text-foreground">{p.profile.name}</p>
                          {p.profile.area && (
                            <p className="text-xs text-muted-foreground">Zone: {p.profile.area}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          {sameArea && (
                            <span className="text-xs text-amber-600 flex items-center gap-0.5 bg-amber-50 px-1.5 py-0.5 rounded-full border border-amber-200">
                              <Sparkles className="h-2.5 w-2.5" /> Same area
                            </span>
                          )}
                          {isSelected && <UserCheck className="h-4 w-4 text-primary" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleSaveAssignments}
                  disabled={selectedToAssign.length === 0 || assignMutation.isPending}
                  className="flex-1 text-xs h-8"
                >
                  {assignMutation.isPending && <Loader2 className="h-3 w-3 mr-1.5 animate-spin" />}
                  Assign ({selectedToAssign.length})
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => { setShowAssignPanel(false); setSelectedToAssign([]); }}
                  className="text-xs h-8"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Assigned List */}
          {assignedLoading ? (
            <div className="space-y-2">
              {[1, 2].map((i) => (
                <div key={i} className="h-10 bg-muted rounded-lg animate-pulse" />
              ))}
            </div>
          ) : assignedPrincipals.length === 0 ? (
            <p className="text-xs text-muted-foreground text-center py-4">
              No phlebotomists assigned to this hospital yet.
            </p>
          ) : (
            <div className="space-y-2">
              {assignedPrincipals.map((principal) => {
                const principalStr = principal.toString();
                return (
                  <AssignedPhlebotomistRow
                    key={principalStr}
                    principalStr={principalStr}
                    hospitalArea={hospital.area}
                    isSuperAdmin={isSuperAdmin}
                    onRemove={() => setRemoveTarget(principalStr)}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Remove Confirmation */}
      <AlertDialog open={!!removeTarget} onOpenChange={(open) => { if (!open) { setRemoveTarget(null); setRemovalReason(''); } }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Phlebotomist</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this phlebotomist from <strong>{hospital.name}</strong>?
              The assignment history will be preserved.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="px-6 pb-2">
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
              onClick={handleRemoveConfirm}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
              disabled={removeMutation.isPending}
            >
              {removeMutation.isPending ? 'Removing...' : 'Remove'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

interface AssignedPhlebotomistRowProps {
  principalStr: string;
  hospitalArea: string;
  isSuperAdmin: boolean;
  onRemove: () => void;
}

function AssignedPhlebotomistRow({ principalStr, hospitalArea, isSuperAdmin, onRemove }: AssignedPhlebotomistRowProps) {
  const { actor } = useActor();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  React.useEffect(() => {
    if (!actor) return;
    actor.getUserProfile(Principal.fromText(principalStr)).then((p) => {
      if (p) setProfile(p);
    }).catch(() => {});
  }, [actor, principalStr]);

  const sameArea = hospitalArea && profile?.area && hospitalArea.toLowerCase() === (profile.area ?? '').toLowerCase();

  return (
    <div className="flex items-center justify-between gap-2 p-2.5 bg-muted/30 rounded-lg border border-border">
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-foreground truncate">
          {profile?.name ?? principalStr.slice(0, 16) + '...'}
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          {profile?.area && (
            <p className="text-xs text-muted-foreground">Zone: {profile.area}</p>
          )}
          {sameArea && (
            <span className="text-xs text-amber-600 flex items-center gap-0.5">
              <Sparkles className="h-2.5 w-2.5" /> Same area
            </span>
          )}
        </div>
      </div>
      {isSuperAdmin && (
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-destructive hover:bg-destructive/10 flex-shrink-0"
          onClick={onRemove}
        >
          <X className="h-3.5 w-3.5" />
        </Button>
      )}
    </div>
  );
}
