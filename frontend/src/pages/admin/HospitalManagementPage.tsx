import React, { useState, useMemo } from 'react';
import {
  Building2,
  Plus,
  Search,
  Edit2,
  PowerOff,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Phone,
  Eye,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useHospitals, useDisableHospital } from '../../hooks/useQueries';
import { Hospital } from '../../backend';
import AddHospitalModal from '../../components/admin/AddHospitalModal';
import EditHospitalModal from '../../components/admin/EditHospitalModal';
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
import { toast } from 'sonner';

const PAGE_SIZE = 20;

interface HospitalManagementPageProps {
  role?: string;
  onNavigate?: (page: string, params?: Record<string, string>) => void;
}

export default function HospitalManagementPage({ role, onNavigate }: HospitalManagementPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editHospital, setEditHospital] = useState<Hospital | null>(null);
  const [disableTarget, setDisableTarget] = useState<Hospital | null>(null);

  const { data: hospitals = [], isLoading } = useHospitals(searchTerm);
  const disableMutation = useDisableHospital();

  const isSuperAdmin = role === 'superAdmin';

  // Client-side pagination
  const totalPages = Math.max(1, Math.ceil(hospitals.length / PAGE_SIZE));
  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return hospitals.slice(start, start + PAGE_SIZE);
  }, [hospitals, page]);

  const handleDisableConfirm = async () => {
    if (!disableTarget) return;
    try {
      await disableMutation.mutateAsync(disableTarget.id);
      toast.success(`Hospital "${disableTarget.name}" has been disabled.`);
    } catch (err: any) {
      toast.error(`Failed to disable hospital: ${err?.message ?? err}`);
    } finally {
      setDisableTarget(null);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 border-b border-border bg-background">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            <h1 className="text-lg font-semibold text-foreground">Hospital Management</h1>
          </div>
          {isSuperAdmin && (
            <Button size="sm" onClick={() => setShowAddModal(true)} className="gap-1.5">
              <Plus className="h-4 w-4" />
              Add Hospital
            </Button>
          )}
        </div>

        {/* Search */}
        <div className="relative mt-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            className="pl-9"
            placeholder="Search by name, city, or area..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-4 py-4 space-y-3">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-muted rounded-xl animate-pulse" />
            ))}
          </div>
        ) : hospitals.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Building2 className="h-12 w-12 text-muted-foreground/40 mb-3" />
            <p className="text-base font-semibold text-foreground">No hospitals added yet.</p>
            <p className="text-sm text-muted-foreground mt-1">
              {isSuperAdmin ? 'Click "Add Hospital" to get started.' : 'Contact your Super Admin to add hospitals.'}
            </p>
          </div>
        ) : paginated.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Search className="h-10 w-10 text-muted-foreground/40 mb-3" />
            <p className="text-base font-semibold text-foreground">No results found.</p>
            <p className="text-sm text-muted-foreground mt-1">Try a different search term.</p>
          </div>
        ) : (
          paginated.map((hospital) => (
            <HospitalCard
              key={hospital.id}
              hospital={hospital}
              isSuperAdmin={isSuperAdmin}
              onEdit={() => setEditHospital(hospital)}
              onDisable={() => setDisableTarget(hospital)}
              onViewDetails={() => onNavigate?.('hospital-details', { hospitalId: hospital.id })}
            />
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-4 py-3 border-t border-border flex items-center justify-between bg-background">
          <p className="text-xs text-muted-foreground">
            Page {page} of {totalPages} · {hospitals.length} hospitals
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Modals */}
      <AddHospitalModal open={showAddModal} onOpenChange={setShowAddModal} />
      {editHospital && (
        <EditHospitalModal
          open={!!editHospital}
          onOpenChange={(open) => { if (!open) setEditHospital(null); }}
          hospital={editHospital}
        />
      )}

      {/* Disable Confirmation */}
      <AlertDialog open={!!disableTarget} onOpenChange={(open) => { if (!open) setDisableTarget(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Disable Hospital</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to disable <strong>{disableTarget?.name}</strong>? The hospital will be marked
              inactive. Phlebotomists will not be able to add new samples for it. This action can be reversed by
              editing the hospital.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDisableConfirm}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
              disabled={disableMutation.isPending}
            >
              {disableMutation.isPending ? 'Disabling...' : 'Disable'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

interface HospitalCardProps {
  hospital: Hospital;
  isSuperAdmin: boolean;
  onEdit: () => void;
  onDisable: () => void;
  onViewDetails: () => void;
}

function HospitalCard({ hospital, isSuperAdmin, onEdit, onDisable, onViewDetails }: HospitalCardProps) {
  return (
    <div className="bg-white rounded-xl border border-border shadow-sm p-4 space-y-2">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-bold text-foreground truncate">{hospital.name}</h3>
            <Badge
              variant={hospital.isActive ? 'default' : 'secondary'}
              className={hospital.isActive ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-gray-100 text-gray-500 border-gray-200'}
            >
              {hospital.isActive ? 'Active' : 'Inactive'}
            </Badge>
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1">
            {hospital.city && (
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {hospital.city}
              </span>
            )}
            {hospital.area && (
              <span className="text-xs text-muted-foreground">Zone: {hospital.area}</span>
            )}
            {hospital.contactNumber && (
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Phone className="h-3 w-3" /> {hospital.contactNumber}
              </span>
            )}
          </div>
          {hospital.address && (
            <p className="text-xs text-muted-foreground mt-0.5 truncate">{hospital.address}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 pt-1">
        <Button variant="outline" size="sm" onClick={onViewDetails} className="gap-1.5 text-xs h-7">
          <Eye className="h-3 w-3" /> Details
        </Button>
        {isSuperAdmin && (
          <>
            <Button variant="outline" size="sm" onClick={onEdit} className="gap-1.5 text-xs h-7">
              <Edit2 className="h-3 w-3" /> Edit
            </Button>
            {hospital.isActive && (
              <Button
                variant="outline"
                size="sm"
                onClick={onDisable}
                className="gap-1.5 text-xs h-7 text-destructive border-destructive/30 hover:bg-destructive/5"
              >
                <PowerOff className="h-3 w-3" /> Disable
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
