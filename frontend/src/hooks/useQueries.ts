import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import {
  UserProfile,
  Booking,
  HomeCollectionRequest,
  Report,
  BPReading,
  RBSTest,
  Incident,
  AuditLog,
  HospitalSample,
  Attendance,
  SecurityLog,
  Variant_canceled_pending_completed_confirmed,
  Variant_assigned_requested_canceled_completed,
  Variant_low_high_medium,
  ExternalBlob,
} from '../backend';

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

  return useQuery<Booking[]>({
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

  return useQuery<Booking[]>({
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
    mutationFn: async (params: { id: string; status: Variant_canceled_pending_completed_confirmed }) => {
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

  return useQuery<HomeCollectionRequest[]>({
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

  return useQuery<HomeCollectionRequest[]>({
    queryKey: ['allHomeCollections'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllHomeCollectionRequests();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateHomeCollectionRequest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      id: string;
      address: string;
      latitude: number | null;
      longitude: number | null;
      selectedTests: any[];
      slot: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createHomeCollectionRequest(
        params.id,
        params.address,
        params.latitude,
        params.longitude,
        params.selectedTests,
        params.slot
      );
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
    mutationFn: async (params: { requestId: string; status: Variant_assigned_requested_canceled_completed }) => {
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

  return useQuery<Report[]>({
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

  return useQuery<Report[]>({
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
    mutationFn: async (params: {
      id: string;
      patient: any;
      bookingId: string;
      file: ExternalBlob;
    }) => {
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
        params.pulse
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

// ── Incidents ─────────────────────────────────────────────────────────────

export function useGetAllIncidents() {
  const { actor, isFetching } = useActor();

  return useQuery<Incident[]>({
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

  return useQuery<Incident[]>({
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
      severity: Variant_low_high_medium;
      photo: ExternalBlob | null;
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

  return useQuery<AuditLog[]>({
    queryKey: ['allAuditLogs'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllAuditLogs();
    },
    enabled: !!actor && !isFetching,
  });
}

// ── Hospital Samples ──────────────────────────────────────────────────────

export function useGetHospitalSamplesByHospital(hospitalId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<HospitalSample[]>({
    queryKey: ['hospitalSamples', 'byHospital', hospitalId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getHospitalSamplesByHospital(hospitalId);
    },
    enabled: !!actor && !isFetching && hospitalId.trim() !== '',
  });
}

export function useGetHospitalSamplesByPhlebotomist(phlebotomistId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<HospitalSample[]>({
    queryKey: ['hospitalSamples', 'byPhlebotomist', phlebotomistId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getHospitalSamplesByPhlebotomist(phlebotomistId);
    },
    enabled: !!actor && !isFetching && phlebotomistId.trim() !== '',
  });
}

export function useGetHospitalSamplesByPhone(phone: string) {
  const { actor, isFetching } = useActor();

  return useQuery<{
    samples: HospitalSample[];
    count: bigint;
    totalAmount: number;
    totalDiscount: number;
    totalReceived: number;
    totalPending: number;
  }>({
    queryKey: ['hospitalSamples', 'byPhone', phone],
    queryFn: async () => {
      if (!actor) return {
        samples: [],
        count: BigInt(0),
        totalAmount: 0,
        totalDiscount: 0,
        totalReceived: 0,
        totalPending: 0,
      };
      return actor.getHospitalSamplesByPhone(phone);
    },
    enabled: !!actor && !isFetching && phone.trim() !== '',
  });
}

export function useUpdateHospitalSampleBilling() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      id: string;
      discount: number;
      finalAmount: number;
      amountReceived: number;
      pendingAmount: number;
      paymentMode: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateHospitalSampleBilling(
        params.id,
        params.discount,
        params.finalAmount,
        params.amountReceived,
        params.pendingAmount,
        params.paymentMode
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hospitalSamples'] });
    },
  });
}

export function useCreateHospitalSample() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      patientName: string;
      phone: string;
      hospitalId: string;
      phlebotomistId: string;
      testId: string;
      mrp: number;
      discount: number;
      finalAmount: number;
      amountReceived: number;
      pendingAmount: number;
      paymentMode: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createHospitalSample(
        params.patientName,
        params.phone,
        params.hospitalId,
        params.phlebotomistId,
        params.testId,
        params.mrp,
        params.discount,
        params.finalAmount,
        params.amountReceived,
        params.pendingAmount,
        params.paymentMode
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hospitalSamples'] });
    },
  });
}

// ── Attendance ────────────────────────────────────────────────────────────

export function useGetActiveShift(phlebotomistId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Attendance | null>({
    queryKey: ['activeShift', phlebotomistId],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getActiveShift(phlebotomistId);
    },
    enabled: !!actor && !isFetching && phlebotomistId.trim() !== '',
    refetchInterval: 30000,
  });
}

export function useGetAllActiveShifts() {
  const { actor, isFetching } = useActor();

  return useQuery<Attendance[]>({
    queryKey: ['activeShifts'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllActiveShifts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAttendanceByPhlebotomist(phlebotomistId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Attendance[]>({
    queryKey: ['attendance', 'byPhlebotomist', phlebotomistId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAttendanceByPhlebotomist(phlebotomistId);
    },
    enabled: !!actor && !isFetching && phlebotomistId.trim() !== '',
  });
}

export function useStartShift() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      phlebotomistId: string;
      hospitalId: string;
      checkInLat: number;
      checkInLong: number;
      checkInSelfieUrl: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.startShift(
        params.phlebotomistId,
        params.hospitalId,
        params.checkInLat,
        params.checkInLong,
        params.checkInSelfieUrl
      );
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['activeShift', variables.phlebotomistId] });
      queryClient.invalidateQueries({ queryKey: ['activeShifts'] });
      queryClient.invalidateQueries({ queryKey: ['attendance'] });
    },
  });
}

export function useEndShift() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      phlebotomistId: string;
      hospitalId: string;
      checkOutLat: number;
      checkOutLong: number;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.endShift(
        params.phlebotomistId,
        params.hospitalId,
        params.checkOutLat,
        params.checkOutLong
      );
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['activeShift', variables.phlebotomistId] });
      queryClient.invalidateQueries({ queryKey: ['activeShifts'] });
      queryClient.invalidateQueries({ queryKey: ['attendance'] });
    },
  });
}

// ── Security Logs ─────────────────────────────────────────────────────────

export function useGetSecurityLogs(userId: string, eventType: string) {
  const { actor, isFetching } = useActor();

  return useQuery<SecurityLog[]>({
    queryKey: ['securityLogs', userId, eventType],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSecurityLogs(userId, eventType);
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
      return actor.resetDeviceBinding(userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['securityLogs'] });
    },
  });
}

export function useCreateSecurityLog() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (params: {
      userId: string;
      eventType: string;
      deviceId: string;
      latitude: number | null;
      longitude: number | null;
      reason: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createSecurityLog(
        params.userId,
        params.eventType,
        params.deviceId,
        params.latitude,
        params.longitude,
        params.reason
      );
    },
  });
}
