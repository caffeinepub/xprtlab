import type { Principal } from "@dfinity/principal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  Hospital,
  Settlement,
  TestInput,
  TestOutput,
  UserProfile,
  Variant_Partial_Settled,
} from "../backend";
import {
  type DeliveryMethod,
  HospitalSampleTestRef,
  type SampleStatus,
  type TestSearchResult,
} from "../types/models";
import { useActor } from "./useActor";

// ─── User Profile ────────────────────────────────────────────────────────────

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ["currentUserProfile"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
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
      if (!actor) throw new Error("Actor not available");
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
    },
  });
}

// Alias used by ProfileSetupModal
export const useSaveCaller = useSaveCallerUserProfile;

// ─── Tests ───────────────────────────────────────────────────────────────────

export function useGetAllTests() {
  const { actor, isFetching } = useActor();

  return useQuery<TestOutput[]>({
    queryKey: ["allTests"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllTests();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddTest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: TestInput) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addTest(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allTests"] });
    },
  });
}

export function useUpdateTest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ code, input }: { code: string; input: TestInput }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateTest(code, input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allTests"] });
    },
  });
}

export function useDisableTest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (code: string) => {
      if (!actor) throw new Error("Actor not available");
      return actor.disableTest(code);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allTests"] });
    },
  });
}

export function useBulkAddTests() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (testInputs: TestInput[]) => {
      if (!actor) throw new Error("Actor not available");
      return actor.bulkAddTests(testInputs);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allTests"] });
    },
  });
}

export function useSetTestStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      testId,
      isActive,
    }: { testId: string; isActive: boolean }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.setTestStatus(testId, isActive);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allTests"] });
    },
  });
}

export function useSearchTests(searchQuery: string) {
  const { actor, isFetching } = useActor();

  return useQuery<TestSearchResult[]>({
    queryKey: ["searchTests", searchQuery],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as any).searchTests(searchQuery);
    },
    enabled: !!actor && !isFetching && searchQuery.trim().length > 0,
  });
}

// ─── Bookings ────────────────────────────────────────────────────────────────

export function useGetMyBookings() {
  const { actor, isFetching } = useActor();

  return useQuery<any[]>({
    queryKey: ["myBookings"],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as any).getMyBookings?.() ?? [];
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllBookings() {
  const { actor, isFetching } = useActor();

  return useQuery<any[]>({
    queryKey: ["allBookings"],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as any).getAllBookings?.() ?? [];
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateBooking() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      if (!actor) throw new Error("Actor not available");
      return (actor as any).createBooking(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myBookings"] });
      queryClient.invalidateQueries({ queryKey: ["allBookings"] });
    },
  });
}

export function useUpdateBookingStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: any }) => {
      if (!actor) throw new Error("Actor not available");
      return (actor as any).updateBookingStatus(id, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myBookings"] });
      queryClient.invalidateQueries({ queryKey: ["allBookings"] });
    },
  });
}

// ─── Home Collection ─────────────────────────────────────────────────────────

export function useGetMyHomeCollectionRequests() {
  const { actor, isFetching } = useActor();

  return useQuery<any[]>({
    queryKey: ["myHomeCollections"],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as any).getMyHomeCollectionRequests?.() ?? [];
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllHomeCollectionRequests() {
  const { actor, isFetching } = useActor();

  return useQuery<any[]>({
    queryKey: ["allHomeCollections"],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as any).getAllHomeCollectionRequests?.() ?? [];
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
      if (!actor) throw new Error("Actor not available");
      return (actor as any).createHomeCollectionRequest(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myHomeCollections"] });
      queryClient.invalidateQueries({ queryKey: ["allHomeCollections"] });
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
      if (!actor) throw new Error("Actor not available");
      return (actor as any).updateHomeCollectionStatus(id, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allHomeCollections"] });
      queryClient.invalidateQueries({ queryKey: ["myHomeCollections"] });
    },
  });
}

// ─── Reports ─────────────────────────────────────────────────────────────────

export function useGetMyReports() {
  const { actor, isFetching } = useActor();

  return useQuery<any[]>({
    queryKey: ["myReports"],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as any).getMyReports?.() ?? [];
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllReports() {
  const { actor, isFetching } = useActor();

  return useQuery<any[]>({
    queryKey: ["allReports"],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as any).getAllReports?.() ?? [];
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUploadReport() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      if (!actor) throw new Error("Actor not available");
      return (actor as any).uploadReport(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myReports"] });
      queryClient.invalidateQueries({ queryKey: ["allReports"] });
    },
  });
}

// ─── Vitals ──────────────────────────────────────────────────────────────────

export function useGetMyVitals() {
  const { actor, isFetching } = useActor();

  return useQuery<any>({
    queryKey: ["myVitals"],
    queryFn: async () => {
      if (!actor) return null;
      return (actor as any).getMyVitals?.() ?? null;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRecordVitals() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      if (!actor) throw new Error("Actor not available");
      return (actor as any).recordVitals(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myVitals"] });
    },
  });
}

export function useRecordBPReading() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      systolic: number;
      diastolic: number;
      pulse: number;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return (actor as any).recordBPReading?.(data) ?? null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myVitals"] });
    },
  });
}

export function useRecordRBSReading() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { glucoseLevel: number }) => {
      if (!actor) throw new Error("Actor not available");
      return (actor as any).recordRBSReading?.(data) ?? null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myVitals"] });
    },
  });
}

// ─── Incidents ───────────────────────────────────────────────────────────────

export function useGetAllIncidents() {
  const { actor, isFetching } = useActor();

  return useQuery<any[]>({
    queryKey: ["allIncidents"],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as any).getAllIncidents?.() ?? [];
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitIncident() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      if (!actor) throw new Error("Actor not available");
      return (actor as any).submitIncident(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allIncidents"] });
    },
  });
}

// ─── Audit Logs ──────────────────────────────────────────────────────────────

export function useGetAuditLogs() {
  const { actor, isFetching } = useActor();

  return useQuery<any[]>({
    queryKey: ["auditLogs"],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as any).getAuditLogs?.() ?? [];
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── Hospital Samples ─────────────────────────────────────────────────────────

export function useGetAllHospitalSamples() {
  const { actor, isFetching } = useActor();

  return useQuery<any[]>({
    queryKey: ["allHospitalSamples"],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as any).getAllHospitalSamples?.() ?? [];
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetHospitalSamplesByPhone(phone = "") {
  const { actor, isFetching } = useActor();

  return useQuery<any[]>({
    queryKey: ["hospitalSamplesByPhone", phone],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as any).getHospitalSamplesByPhone?.(phone) ?? [];
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateHospitalSample() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      if (!actor) throw new Error("Actor not available");
      return (actor as any).createHospitalSample(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allHospitalSamples"] });
    },
  });
}

export function useUpdateHospitalSampleStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      sampleId,
      status,
      note,
      role,
    }: {
      sampleId: string;
      status: SampleStatus;
      note: string;
      role: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return (actor as any).updateHospitalSampleStatus(
        sampleId,
        status,
        note,
        role,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allHospitalSamples"] });
    },
  });
}

export function useUpdateHospitalSampleBilling() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      if (!actor) throw new Error("Actor not available");
      return (actor as any).updateHospitalSampleBilling(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allHospitalSamples"] });
    },
  });
}

export function useMarkAsDispatched() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (sampleId: string) => {
      if (!actor) throw new Error("Actor not available");
      return (actor as any).markAsDispatched?.(sampleId) ?? null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allHospitalSamples"] });
    },
  });
}

export function useMarkSampleDelivered() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      sampleId: string;
      deliveryMethod: DeliveryMethod;
      deliveredByRole?: string;
      deliveredById?: string;
      role?: string;
      userId?: string;
      action?: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      const role = data.role ?? data.deliveredByRole ?? "";
      const userId = data.userId ?? data.deliveredById ?? "";
      return (
        (actor as any).markSampleDelivered?.(
          data.sampleId,
          data.deliveryMethod,
          role,
          userId,
        ) ?? null
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allHospitalSamples"] });
    },
  });
}

export function useConfirmWhatsAppDelivery() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (sampleId: string) => {
      if (!actor) throw new Error("Actor not available");
      return (actor as any).confirmWhatsAppDelivery?.(sampleId) ?? null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allHospitalSamples"] });
    },
  });
}

// ─── Attendance ───────────────────────────────────────────────────────────────

export function useGetAllAttendance() {
  const { actor, isFetching } = useActor();

  return useQuery<any[]>({
    queryKey: ["allAttendance"],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as any).getAllAttendance?.() ?? [];
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllActiveShifts() {
  const { actor, isFetching } = useActor();

  return useQuery<any[]>({
    queryKey: ["allActiveShifts"],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as any).getAllActiveShifts?.() ?? [];
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 60000,
  });
}

export function useGetAttendanceByPhlebotomist() {
  const { actor, isFetching } = useActor();

  return useQuery<any[]>({
    queryKey: ["attendanceByPhlebotomist"],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as any).getAllAttendance?.() ?? [];
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetTodaySummary() {
  const { actor, isFetching } = useActor();

  return useQuery<any>({
    queryKey: ["todaySummary"],
    queryFn: async () => {
      if (!actor) return null;
      return (actor as any).getTodaySummary?.() ?? null;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useStartShift() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data?: any) => {
      if (!actor) throw new Error("Actor not available");
      return (actor as any).startShift?.(data) ?? null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allAttendance"] });
      queryClient.invalidateQueries({ queryKey: ["myAttendance"] });
      queryClient.invalidateQueries({ queryKey: ["allActiveShifts"] });
      queryClient.invalidateQueries({ queryKey: ["todaySummary"] });
    },
  });
}

export function useEndShift() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data?: any) => {
      if (!actor) throw new Error("Actor not available");
      return (actor as any).endShift?.(data) ?? null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allAttendance"] });
      queryClient.invalidateQueries({ queryKey: ["myAttendance"] });
      queryClient.invalidateQueries({ queryKey: ["allActiveShifts"] });
      queryClient.invalidateQueries({ queryKey: ["todaySummary"] });
    },
  });
}

// ─── Hospitals ────────────────────────────────────────────────────────────────

export function useHospitals(search?: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Hospital[]>({
    queryKey: ["hospitals", search],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getHospitals(search ?? null);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useHospitalById(id: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Hospital | null>({
    queryKey: ["hospital", id],
    queryFn: async () => {
      if (!actor || !id) return null;
      return actor.getHospitalById(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useAddHospital() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      name: string;
      city: string;
      address: string;
      area: string;
      contactNumber: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addHospital(
        params.name,
        params.city,
        params.address,
        params.area,
        params.contactNumber,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hospitals"] });
    },
  });
}

export function useUpdateHospital() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      id: string;
      name: string;
      city: string;
      address: string;
      area: string;
      contactNumber: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateHospital(
        params.id,
        params.name,
        params.city,
        params.address,
        params.area,
        params.contactNumber,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hospitals"] });
    },
  });
}

export function useDisableHospital() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Actor not available");
      return actor.disableHospital(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hospitals"] });
    },
  });
}

export function useAssignPhlebotomist() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      hospitalId,
      phlebotomist,
    }: {
      hospitalId: string;
      phlebotomist: Principal;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.assignPhlebotomistToHospital(hospitalId, phlebotomist);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hospitals"] });
      queryClient.invalidateQueries({ queryKey: ["phlebotomistsByHospital"] });
    },
  });
}

// Alias for backward compatibility
export const useAssignPhlebotomistToHospital = useAssignPhlebotomist;

export function useGetPhlebotomistsByHospital(hospitalId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Principal[]>({
    queryKey: ["phlebotomistsByHospital", hospitalId],
    queryFn: async () => {
      if (!actor || !hospitalId) return [];
      return actor.getPhlebotomistsByHospital(hospitalId);
    },
    enabled: !!actor && !isFetching && !!hospitalId,
  });
}

export function useGetHospitalsByPhlebotomist(phlebotomist: Principal | null) {
  const { actor, isFetching } = useActor();

  return useQuery<string[]>({
    queryKey: ["hospitalsByPhlebotomist", phlebotomist?.toString()],
    queryFn: async () => {
      if (!actor || !phlebotomist) return [];
      return actor.getHospitalsByPhlebotomist(phlebotomist);
    },
    enabled: !!actor && !isFetching && !!phlebotomist,
  });
}

export function useRemovePhlebotomistFromHospital() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      hospitalId,
      phlebotomist,
      removalReason,
    }: {
      hospitalId: string;
      phlebotomist: Principal;
      removalReason: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.removePhlebotomistFromHospital(
        hospitalId,
        phlebotomist,
        removalReason,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hospitals"] });
      queryClient.invalidateQueries({ queryKey: ["phlebotomistsByHospital"] });
    },
  });
}

// ─── Security Logs ────────────────────────────────────────────────────────────

export function useGetSecurityLogs() {
  const { actor, isFetching } = useActor();

  return useQuery<any[]>({
    queryKey: ["securityLogs"],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as any).getSecurityLogs?.() ?? [];
    },
    enabled: !!actor && !isFetching,
  });
}

export function useResetDeviceBinding() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      if (!actor) throw new Error("Actor not available");
      return (actor as any).resetDeviceBinding?.(userId) ?? null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["securityLogs"] });
    },
  });
}

// ─── Assigned Hospitals (patient) ─────────────────────────────────────────────

export function useGetAssignedHospitals() {
  const { actor, isFetching } = useActor();

  return useQuery<Hospital[]>({
    queryKey: ["assignedHospitals"],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as any).getAssignedHospitals?.() ?? [];
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── Settlements ──────────────────────────────────────────────────────────────

export function useMarkSettlement() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      hospitalId: string;
      amount: bigint;
      settlementType: Variant_Partial_Settled;
      notes: string | null;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.markSettlement(
        params.hospitalId,
        params.amount,
        params.settlementType,
        params.notes,
      );
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["settlementHistory", variables.hospitalId],
      });
    },
  });
}

export function useGetSettlementHistory(hospitalId: string | null) {
  const { actor, isFetching } = useActor();

  return useQuery<Settlement[]>({
    queryKey: ["settlementHistory", hospitalId],
    queryFn: async () => {
      if (!actor || !hospitalId) return [];
      return actor.getSettlementHistory(hospitalId);
    },
    enabled: !!actor && !isFetching && !!hospitalId,
  });
}
