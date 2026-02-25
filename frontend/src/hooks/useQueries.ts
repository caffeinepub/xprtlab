import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Hospital } from '../backend';
import type { UserProfile } from '../types/models';

// ─── User Profile ────────────────────────────────────────────────────────────

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return (actor as any).getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return (actor as any).saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

// Alias used by ProfileSetupModal
export const useSaveCaller = useSaveCallerUserProfile;

// ─── Tests ───────────────────────────────────────────────────────────────────

export function useGetAllTests() {
  const { actor, isFetching } = useActor();

  return useQuery<any[]>({
    queryKey: ['tests'],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as any).getAllTests();
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── Bookings ────────────────────────────────────────────────────────────────

export function useGetMyBookings() {
  const { actor, isFetching } = useActor();

  return useQuery<any[]>({
    queryKey: ['myBookings'],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as any).getMyBookings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllBookings() {
  const { actor, isFetching } = useActor();

  return useQuery<any[]>({
    queryKey: ['allBookings'],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as any).getAllBookings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateBooking() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      if (!actor) throw new Error('Actor not available');
      return (actor as any).createBooking(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myBookings'] });
      queryClient.invalidateQueries({ queryKey: ['allBookings'] });
    },
  });
}

export function useUpdateBookingStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: any }) => {
      if (!actor) throw new Error('Actor not available');
      return (actor as any).updateBookingStatus(id, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myBookings'] });
      queryClient.invalidateQueries({ queryKey: ['allBookings'] });
    },
  });
}

// ─── Home Collection ─────────────────────────────────────────────────────────

export function useGetMyHomeCollectionRequests() {
  const { actor, isFetching } = useActor();

  return useQuery<any[]>({
    queryKey: ['myHomeCollections'],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as any).getMyHomeCollectionRequests();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllHomeCollectionRequests() {
  const { actor, isFetching } = useActor();

  return useQuery<any[]>({
    queryKey: ['allHomeCollections'],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as any).getAllHomeCollectionRequests();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 15000,
  });
}

export function useCreateHomeCollectionRequest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      if (!actor) throw new Error('Actor not available');
      return (actor as any).createHomeCollectionRequest(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myHomeCollections'] });
      queryClient.invalidateQueries({ queryKey: ['allHomeCollections'] });
    },
  });
}

// Alias for backward compatibility
export const useCreateHomeCollection = useCreateHomeCollectionRequest;

export function useUpdateHomeCollectionStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: any }) => {
      if (!actor) throw new Error('Actor not available');
      return (actor as any).updateHomeCollectionStatus(id, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allHomeCollections'] });
      queryClient.invalidateQueries({ queryKey: ['myHomeCollections'] });
    },
  });
}

// ─── Reports ─────────────────────────────────────────────────────────────────

export function useGetMyReports() {
  const { actor, isFetching } = useActor();

  return useQuery<any[]>({
    queryKey: ['myReports'],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as any).getMyReports();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllReports() {
  const { actor, isFetching } = useActor();

  return useQuery<any[]>({
    queryKey: ['allReports'],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as any).getAllReports();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUploadReport() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      if (!actor) throw new Error('Actor not available');
      return (actor as any).uploadReport(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myReports'] });
      queryClient.invalidateQueries({ queryKey: ['allReports'] });
    },
  });
}

// ─── Vitals ──────────────────────────────────────────────────────────────────

export function useGetMyVitals() {
  const { actor, isFetching } = useActor();

  return useQuery<any>({
    queryKey: ['myVitals'],
    queryFn: async () => {
      if (!actor) return null;
      return (actor as any).getMyVitals();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRecordBP() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      if (!actor) throw new Error('Actor not available');
      return (actor as any).recordBP(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myVitals'] });
    },
  });
}

// Alias used by RecordVitalsPage
export const useRecordBPReading = useRecordBP;

export function useRecordRBS() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      if (!actor) throw new Error('Actor not available');
      return (actor as any).recordRBS(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myVitals'] });
    },
  });
}

// Alias used by RecordVitalsPage
export const useRecordRBSReading = useRecordRBS;

// ─── Incidents ───────────────────────────────────────────────────────────────

export function useGetAllIncidents() {
  const { actor, isFetching } = useActor();

  return useQuery<any[]>({
    queryKey: ['incidents'],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as any).getAllIncidents();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitIncident() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      if (!actor) throw new Error('Actor not available');
      return (actor as any).submitIncident(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incidents'] });
    },
  });
}

// ─── Audit Logs ──────────────────────────────────────────────────────────────

export function useGetAuditLogs() {
  const { actor, isFetching } = useActor();

  return useQuery<any[]>({
    queryKey: ['auditLogs'],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as any).getAuditLogs();
    },
    enabled: !!actor && !isFetching,
  });
}

// Alias used by AuditLogsPage
export const useGetAllAuditLogs = useGetAuditLogs;

// ─── Hospital Samples ────────────────────────────────────────────────────────

export function useGetAllHospitalSamples() {
  const { actor, isFetching } = useActor();

  return useQuery<any[]>({
    queryKey: ['hospitalSamples'],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as any).getAllHospitalSamples();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetHospitalSamplesByPhone() {
  const { actor, isFetching } = useActor();

  return useQuery<any[]>({
    queryKey: ['hospitalSamplesByPhone'],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as any).getHospitalSamplesByPhone();
    },
    enabled: !!actor && !isFetching,
  });
}

// Aliases used by admin and phlebotomist pages
export const useGetHospitalSamplesByHospital = useGetAllHospitalSamples;
export const useGetHospitalSamplesByPhlebotomist = useGetAllHospitalSamples;

export function useCreateHospitalSample() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      if (!actor) throw new Error('Actor not available');
      return (actor as any).createHospitalSample(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hospitalSamples'] });
      queryClient.invalidateQueries({ queryKey: ['todaySummary'] });
    },
  });
}

export function useUpdateHospitalSampleBilling() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      if (!actor) throw new Error('Actor not available');
      return (actor as any).updateHospitalSampleBilling(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hospitalSamples'] });
    },
  });
}

// ─── Attendance ──────────────────────────────────────────────────────────────

export function useGetActiveShift() {
  const { actor, isFetching } = useActor();

  return useQuery<any>({
    queryKey: ['activeShift'],
    queryFn: async () => {
      if (!actor) return null;
      return (actor as any).getActiveShift();
    },
    enabled: !!actor && !isFetching,
  });
}

// Alias used by AdminAttendancePage
export const useGetAllActiveShifts = useGetActiveShift;

export function useGetAllAttendances() {
  const { actor, isFetching } = useActor();

  return useQuery<any[]>({
    queryKey: ['allAttendances'],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as any).getAllAttendances();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAttendanceByPhlebotomist() {
  const { actor, isFetching } = useActor();

  return useQuery<any[]>({
    queryKey: ['attendanceByPhlebotomist'],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as any).getAllAttendances();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useStartShift() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      if (!actor) throw new Error('Actor not available');
      return (actor as any).startShift(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activeShift'] });
      queryClient.invalidateQueries({ queryKey: ['allAttendances'] });
    },
  });
}

export function useEndShift() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      if (!actor) throw new Error('Actor not available');
      return (actor as any).endShift(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activeShift'] });
      queryClient.invalidateQueries({ queryKey: ['allAttendances'] });
      queryClient.invalidateQueries({ queryKey: ['todaySummary'] });
    },
  });
}

// ─── Device Binding ──────────────────────────────────────────────────────────

export function useGetDeviceBinding() {
  const { actor, isFetching } = useActor();

  return useQuery<any>({
    queryKey: ['deviceBinding'],
    queryFn: async () => {
      if (!actor) return null;
      return (actor as any).getDeviceBinding();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useBindDevice() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      if (!actor) throw new Error('Actor not available');
      return (actor as any).bindDevice(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deviceBinding'] });
    },
  });
}

// ─── Security Logs ───────────────────────────────────────────────────────────

export function useGetSecurityLogs() {
  const { actor, isFetching } = useActor();

  return useQuery<any[]>({
    queryKey: ['securityLogs'],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as any).getSecurityLogs();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useResetDeviceBinding() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      if (!actor) throw new Error('Actor not available');
      return (actor as any).resetDeviceBinding(userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['securityLogs'] });
      queryClient.invalidateQueries({ queryKey: ['deviceBinding'] });
    },
  });
}

// ─── Camps ───────────────────────────────────────────────────────────────────

export function useGetAllCamps() {
  const { actor, isFetching } = useActor();

  return useQuery<any[]>({
    queryKey: ['camps'],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as any).getAllCamps();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateCamp() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      if (!actor) throw new Error('Actor not available');
      return (actor as any).createCamp(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['camps'] });
    },
  });
}

// ─── Assigned Hospitals ──────────────────────────────────────────────────────

export function useGetAssignedHospitals() {
  const { actor, isFetching } = useActor();

  return useQuery<Hospital[]>({
    queryKey: ['assignedHospitals'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAssignedHospitals();
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── Today Summary ───────────────────────────────────────────────────────────

export function useGetTodaySummary() {
  const { actor, isFetching } = useActor();

  return useQuery<{
    totalSamplesCollected: bigint;
    cashCollected: number;
    upiCollected: number;
    pendingAmount: number;
  }>({
    queryKey: ['todaySummary'],
    queryFn: async () => {
      if (!actor) {
        return { totalSamplesCollected: BigInt(0), cashCollected: 0, upiCollected: 0, pendingAmount: 0 };
      }
      return actor.getTodaySummary();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30000,
  });
}
