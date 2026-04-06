/**
 * backendService.ts
 *
 * Unified backend service — single source of truth.
 * ALL business data reads/writes go through here.
 * localStorage is used ONLY for session tokens.
 */

import { AuthClient } from "@dfinity/auth-client";
import type {
  AppTask,
  AppUser,
  Hospital,
  SampleInput,
  SampleRecord,
  TestInput,
  TestOutput,
} from "../backend.d";
import { createActorWithConfig } from "../config";

// Module-level singleton actor
let actorInstance: Awaited<ReturnType<typeof createActorWithConfig>> | null =
  null;

/** Called by StaffApp after II login (or on page load when delegation is restored). */
export function setAuthenticatedActor(
  actor: Awaited<ReturnType<typeof createActorWithConfig>> | null,
) {
  actorInstance = actor;
  console.log(
    "[backendService] setAuthenticatedActor called, actor:",
    actor !== null ? "set" : "null",
  );
}

export async function getActor() {
  if (actorInstance) return actorInstance;

  const authClient = await AuthClient.create();
  const identity = authClient.getIdentity();

  actorInstance = await createActorWithConfig({
    agentOptions: {
      identity,
    },
  });

  return actorInstance;
}

export function resetActorCache() {
  actorInstance = null;
}

// ─── Samples ─────────────────────────────────────────────────────────────────

export async function createSample(
  sampleData: SampleInput,
): Promise<string | null> {
  try {
    const actor = await getActor();
    return await actor.createSample(sampleData);
  } catch (e) {
    console.error("[backendService] createSample failed:", e);
    return null;
  }
}

export async function getSamplesByMobile(
  mobile: string,
): Promise<SampleRecord[]> {
  try {
    const actor = await getActor();
    return await actor.getSamplesByMobile(mobile);
  } catch (e) {
    console.error("[backendService] getSamplesByMobile failed:", e);
    return [];
  }
}

export async function getSamplesByHospital(
  hospitalId: string,
): Promise<SampleRecord[]> {
  try {
    const actor = await getActor();
    return await actor.getSamplesByHospital(hospitalId);
  } catch (e) {
    console.error("[backendService] getSamplesByHospital failed:", e);
    return [];
  }
}

export async function getAllSamples(): Promise<SampleRecord[]> {
  try {
    const actor = await getActor();
    return await actor.getAllSamples();
  } catch (e) {
    console.error("[backendService] getAllSamples failed:", e);
    return [];
  }
}

export async function updateSampleStatus(sampleId: string, status: string) {
  try {
    const actor = await getActor();
    return await actor.updateSampleStatus(sampleId, status);
  } catch (e) {
    console.error("[backendService] updateSampleStatus failed:", e);
    return null;
  }
}

export async function deleteAllSampleData(): Promise<bigint | null> {
  try {
    const actor = await getActor();
    return await actor.deleteAllSampleData();
  } catch (e) {
    console.error("[backendService] deleteAllSampleData failed:", e);
    return null;
  }
}

// ─── Hospitals ───────────────────────────────────────────────────────────────

export async function getHospitals(search?: string): Promise<Hospital[]> {
  try {
    const actor = await getActor();
    return await actor.getHospitals(search ?? null);
  } catch (e) {
    console.error("[backendService] getHospitals failed:", e);
    return [];
  }
}

export async function addHospital(
  name: string,
  city: string,
  address: string,
  area: string,
  contactNumber: string,
): Promise<Hospital | null> {
  try {
    const actor = await getActor();
    return await actor.addHospital(name, city, address, area, contactNumber);
  } catch (e) {
    console.error("[backendService] addHospital failed:", e);
    return null;
  }
}

export async function updateHospital(
  id: string,
  name: string,
  city: string,
  address: string,
  area: string,
  contactNumber: string,
): Promise<Hospital | null> {
  try {
    const actor = await getActor();
    return await actor.updateHospital(
      id,
      name,
      city,
      address,
      area,
      contactNumber,
    );
  } catch (e) {
    console.error("[backendService] updateHospital failed:", e);
    return null;
  }
}

export async function disableHospital(id: string): Promise<Hospital | null> {
  try {
    const actor = await getActor();
    return await actor.disableHospital(id);
  } catch (e) {
    console.error("[backendService] disableHospital failed:", e);
    return null;
  }
}

// ─── Tests ───────────────────────────────────────────────────────────────────

export async function getTests(): Promise<TestOutput[]> {
  try {
    const actor = await getActor();
    return await actor.getAllTests();
  } catch (e) {
    console.error("[backendService] getTests failed:", e);
    return [];
  }
}

export async function createTest(input: TestInput) {
  console.log("Creating test with payload:", {
    name: input.name,
    code: input.code,
    sample_type: input.sampleType,
    mrp: Number(input.mrp),
    lab_cost: Number(input.lab_cost),
    commission_amount: Number(input.commission_amount),
    profit: Number(input.profit),
  });
  console.log("Auth actor available:", actorInstance !== null);

  try {
    const actor = await getActor();
    const res = await actor.addTest(input);
    if (res && typeof res === "object" && "ok" in res)
      return (res as { ok: unknown }).ok;
    if (res && typeof res === "object" && "err" in res)
      throw new Error(String((res as { err: unknown }).err));
    return res;
  } catch (e) {
    console.error("[backendService] createTest failed:", e);
    throw e;
  }
}

export async function updateTest(code: string, input: TestInput) {
  try {
    const actor = await getActor();
    return await actor.updateTest(code, input);
  } catch (e) {
    console.error("[backendService] updateTest failed:", e);
    return null;
  }
}

export async function disableTest(code: string) {
  try {
    const actor = await getActor();
    return await actor.disableTest(code);
  } catch (e) {
    console.error("[backendService] disableTest failed:", e);
    return null;
  }
}

export async function setTestStatus(testId: string, isActive: boolean) {
  try {
    const actor = await getActor();
    return await actor.setTestStatus(testId, isActive);
  } catch (e) {
    console.error("[backendService] setTestStatus failed:", e);
    return null;
  }
}

// ─── Tasks ───────────────────────────────────────────────────────────────────

export async function createTask(
  assigned_to_mobile: string,
  assigned_by: string,
  hospital_id: string,
  patient_name: string,
  status = "assigned",
): Promise<AppTask | null> {
  try {
    const actor = await getActor();
    return await actor.createTask(
      assigned_to_mobile,
      assigned_by,
      hospital_id,
      patient_name,
      status,
    );
  } catch (e) {
    console.error("[backendService] createTask failed:", e);
    return null;
  }
}

export async function getTasksByUser(mobile: string): Promise<AppTask[]> {
  try {
    const actor = await getActor();
    return await actor.getTasksByUser(mobile);
  } catch (e) {
    console.error("[backendService] getTasksByUser failed:", e);
    return [];
  }
}

export async function getAllTasks(): Promise<AppTask[]> {
  try {
    const actor = await getActor();
    return await actor.getAllTasks();
  } catch (e) {
    console.error("[backendService] getAllTasks failed:", e);
    return [];
  }
}

export async function deleteAllTasks(): Promise<bigint | null> {
  try {
    const actor = await getActor();
    return await actor.deleteAllTasks();
  } catch (e) {
    console.error("[backendService] deleteAllTasks failed:", e);
    return null;
  }
}

// ─── Reset All Data ──────────────────────────────────────────────────────────

export async function deleteAllData(): Promise<boolean> {
  try {
    const actor = await getActor();
    await actor.deleteAllData();
    return true;
  } catch (e) {
    console.error("[backendService] deleteAllData failed:", e);
    return false;
  }
}

// ─── Dashboard ───────────────────────────────────────────────────────────────

export interface DashboardMetricsJS {
  samplesTotal: number;
  samplesToday: number;
  revenueToday: number;
  activeHospitals: number;
  pendingReports: number;
  collectionsToday: number;
}

export async function getDashboardMetrics(): Promise<DashboardMetricsJS | null> {
  try {
    const actor = await getActor();
    const result = await actor.getDashboardMetrics();
    return {
      samplesTotal: Number(result.samplesTotal),
      samplesToday: Number(result.samplesToday),
      revenueToday: Number(result.revenueToday),
      activeHospitals: Number(result.activeHospitals),
      pendingReports: Number(result.pendingReports),
      collectionsToday: Number(result.collectionsToday),
    };
  } catch (e) {
    console.error("[backendService] getDashboardMetrics failed:", e);
    return null;
  }
}

// ─── Users ───────────────────────────────────────────────────────────────────

export async function getUserByMobile(mobile: string): Promise<AppUser | null> {
  try {
    const actor = await getActor();
    const result = await actor.getUserByMobile(mobile);
    // Motoko optional: result is [] (None) or [user] (Some)
    if (Array.isArray(result)) {
      return result.length > 0 ? (result[0] as AppUser) : null;
    }
    // Handle plain object Result variants just in case
    const r = result as unknown as
      | { ok?: AppUser; err?: string }
      | AppUser
      | null
      | undefined;
    if (r && typeof r === "object" && "ok" in r)
      return (r as { ok: AppUser }).ok;
    if (r && typeof r === "object" && "err" in r) return null;
    return (r as AppUser | null | undefined) ?? null;
  } catch (e) {
    console.error("[backendService] getUserByMobile failed:", e);
    return null;
  }
}

export async function getAllAppUsers(): Promise<AppUser[]> {
  try {
    const actor = await getActor();
    return await actor.getAllAppUsers();
  } catch (e) {
    console.error("[backendService] getAllAppUsers failed:", e);
    return [];
  }
}

export async function registerAppUser(
  mobile: string,
  name: string,
  role: string,
  assignedHospitalId: string | null,
): Promise<AppUser | null> {
  try {
    const actor = await getActor();
    const result = await actor.registerAppUser(
      mobile,
      name,
      role,
      assignedHospitalId,
    );
    console.log("[backendService] registerAppUser result:", result);
    return result as AppUser;
  } catch (e) {
    console.error("[backendService] registerAppUser failed:", e);
    throw e;
  }
}

export async function claimSuperAdmin(): Promise<
  { ok: string } | { err: string }
> {
  try {
    const actor = await getActor();
    const result = await actor.claimSuperAdmin();
    console.log("[backendService] claimSuperAdmin result:", result);
    if ("ok" in result) return { ok: result.ok as string };
    return { err: result.err as string };
  } catch (e) {
    console.error("[backendService] claimSuperAdmin failed:", e);
    throw e;
  }
}

export async function seedTestUsers(): Promise<bigint | null> {
  try {
    const actor = await getActor();
    return await actor.seedTestUsers();
  } catch (e) {
    console.error("[backendService] seedTestUsers failed:", e);
    return null;
  }
}
