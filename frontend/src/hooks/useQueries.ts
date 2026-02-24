import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { UserProfile, AppRole } from '../backend';

// ── User Profile ──────────────────────────────────────────────────────────

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
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
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

// ── Tests ─────────────────────────────────────────────────────────────────

export function useGetAllTests() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['tests'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllTests();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateTest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { id: string; name: string; description: string; price: bigint }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createTest(params.id, params.name, params.description, params.price);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tests'] });
    },
  });
}

export function useDeleteTest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteTest(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tests'] });
    },
  });
}

// ── Bookings ──────────────────────────────────────────────────────────────

export function useGetMyBookings() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['myBookings'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyBookings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllBookings() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['allBookings'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBookings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateBooking() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { id: string; selectedTests: any[]; slot: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createBooking(params.id, params.selectedTests, params.slot);
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
    mutationFn: async (params: { id: string; status: any }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateBookingStatus(params.id, params.status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allBookings'] });
      queryClient.invalidateQueries({ queryKey: ['myBookings'] });
    },
  });
}

// ── Home Collection ───────────────────────────────────────────────────────

export function useGetMyHomeCollectionRequests() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['myHomeCollections'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyHomeCollectionRequests();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllHomeCollectionRequests() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['allHomeCollections'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllHomeCollectionRequests();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateHomeCollection() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      id: string;
      address: string;
      latitude?: number | null;
      longitude?: number | null;
      selectedTests: any[];
      slot: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createHomeCollectionRequest(
        params.id,
        params.address,
        params.latitude ?? null,
        params.longitude ?? null,
        params.selectedTests,
        params.slot,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myHomeCollections'] });
      queryClient.invalidateQueries({ queryKey: ['allHomeCollections'] });
    },
  });
}

export function useUpdateHomeCollectionStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { requestId: string; status: any }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateHomeCollectionStatus(params.requestId, params.status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allHomeCollections'] });
      queryClient.invalidateQueries({ queryKey: ['myHomeCollections'] });
    },
  });
}

export function useAssignPhlebotomist() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { requestId: string; phlebotomist: any }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.assignPhlebotomist(params.requestId, params.phlebotomist);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allHomeCollections'] });
    },
  });
}

// ── Reports ───────────────────────────────────────────────────────────────

export function useGetMyReports() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['myReports'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyReports();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllReports() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['allReports'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllReports();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUploadReport() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { id: string; patient: any; bookingId: string; file: any }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.uploadReport(params.id, params.patient, params.bookingId, params.file);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allReports'] });
      queryClient.invalidateQueries({ queryKey: ['myReports'] });
    },
  });
}

// ── Vitals ────────────────────────────────────────────────────────────────

export function useRecordBPReading() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      patientId: any;
      bookingId: string;
      systolic: bigint;
      diastolic: bigint;
      pulse: bigint;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.recordBPReading(
        params.patientId,
        params.bookingId,
        params.systolic,
        params.diastolic,
        params.pulse,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bpReadings'] });
    },
  });
}

export function useRecordRBSReading() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { patientId: any; bookingId: string; glucoseLevel: bigint }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.recordRBSReading(params.patientId, params.bookingId, params.glucoseLevel);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rbsReadings'] });
    },
  });
}

export function useGetBPReadings(patientId: any, bookingId: string) {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['bpReadings', patientId?.toString(), bookingId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getBPReadings(patientId, bookingId);
    },
    enabled: !!actor && !isFetching && !!patientId && !!bookingId,
  });
}

export function useGetRBSReadings(patientId: any, bookingId: string) {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['rbsReadings', patientId?.toString(), bookingId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getRBSReadings(patientId, bookingId);
    },
    enabled: !!actor && !isFetching && !!patientId && !!bookingId,
  });
}

// ── Incidents ─────────────────────────────────────────────────────────────

export function useGetAllIncidents() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['allIncidents'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllIncidents();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetMyIncidents() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['myIncidents'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyIncidents();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitIncident() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      id: string;
      description: string;
      severity: any;
      photo: any | null;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitIncident(params.id, params.description, params.severity, params.photo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allIncidents'] });
      queryClient.invalidateQueries({ queryKey: ['myIncidents'] });
    },
  });
}

// ── Audit Logs ────────────────────────────────────────────────────────────

export function useGetAllAuditLogs() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['auditLogs'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllAuditLogs();
    },
    enabled: !!actor && !isFetching,
  });
}
