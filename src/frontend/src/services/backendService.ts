/**
 * backendService.ts
 *
 * Unified backend service that wraps all Motoko canister calls.
 * All functions have try/catch and return null/empty array on error.
 */

import type { SampleInput } from "../backend.d";
import { createActorWithConfig } from "../config";

let _actorPromise: ReturnType<typeof createActorWithConfig> | null = null;

async function getActor() {
  if (!_actorPromise) {
    _actorPromise = createActorWithConfig();
  }
  return _actorPromise;
}

// Invalidate cached actor (call if something goes wrong)
export function resetActorCache() {
  _actorPromise = null;
}

// ─── Samples ─────────────────────────────────────────────────────────────────

export async function createSample(
  sampleData: SampleInput,
): Promise<string | null> {
  try {
    const actor = await getActor();
    const result = await actor.createSample(sampleData);
    return result;
  } catch (e) {
    console.error("[backendService] createSample failed:", e);
    return null;
  }
}

export async function getSamplesByMobile(mobile: string) {
  try {
    const actor = await getActor();
    return await actor.getSamplesByMobile(mobile);
  } catch (e) {
    console.error("[backendService] getSamplesByMobile failed:", e);
    return [];
  }
}

export async function getSamplesByHospital(hospitalId: string) {
  try {
    const actor = await getActor();
    return await actor.getSamplesByHospital(hospitalId);
  } catch (e) {
    console.error("[backendService] getSamplesByHospital failed:", e);
    return [];
  }
}

export async function getAllSamples() {
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

export async function getUserByMobile(mobile: string) {
  try {
    const actor = await getActor();
    return await actor.getUserByMobile(mobile);
  } catch (e) {
    console.error("[backendService] getUserByMobile failed:", e);
    return null;
  }
}

export async function getAllAppUsers() {
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
) {
  try {
    const actor = await getActor();
    return await actor.registerAppUser(mobile, name, role, assignedHospitalId);
  } catch (e) {
    console.error("[backendService] registerAppUser failed:", e);
    return null;
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
