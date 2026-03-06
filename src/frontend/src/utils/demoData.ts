/**
 * demoData.ts
 *
 * Compatibility shim + re-exports for legacy imports.
 * All persistent state is now managed by demoStorage.ts.
 */

import {
  DEMO_HOSPITAL_ID_1,
  DEMO_PHLEBO_ID,
  type DemoHomeCollection,
  type DemoHospital,
  type DemoSample,
  addDemoSample as _addDemoSample,
  getDemoHomeCollections as _getDemoHomeCollections,
  getDemoSamples as _getDemoSamples,
  updateDemoHomeCollectionStatus as _updateDemoHomeCollectionStatus,
  updateDemoSampleStatus as _updateDemoSampleStatus,
  getDemoHospitals,
  getDemoHospitalsByPhlebotomist,
} from "./demoStorage";

// ─── Re-export constants used by other files ──────────────────────────────────
export const DEMO_USER_ID = "demo-patient-001";
export const DEMO_HOSPITAL_ID = DEMO_HOSPITAL_ID_1;
export { DEMO_PHLEBO_ID };

// ─── isDemoMode ───────────────────────────────────────────────────────────────
export function isDemoMode(): boolean {
  try {
    return localStorage.getItem("demo_mode") === "true";
  } catch {
    return false;
  }
}

// ─── HomeCollectionStatus type (kept for backward compat) ─────────────────────
export type HomeCollectionStatus =
  | "ASSIGNED"
  | "EN_ROUTE"
  | "SAMPLE_COLLECTED"
  | "COMPLETED";

// ─── DemoHomeCollection type re-export ────────────────────────────────────────
export type { DemoHomeCollection };

// ─── Home collection helpers ──────────────────────────────────────────────────
export function seedDemoHomeCollections(): void {
  // No-op: seeding is handled by initializeDemoStorage in demoStorage.ts
}

export function getDemoHomeCollections(
  phlebotomistId?: string,
): DemoHomeCollection[] {
  return _getDemoHomeCollections(phlebotomistId);
}

export function setDemoHomeCollections(
  collections: DemoHomeCollection[],
): void {
  try {
    localStorage.setItem("demo_home_collections", JSON.stringify(collections));
  } catch (e) {
    console.warn("[demoData] Failed to write demo_home_collections:", e);
  }
}

export function updateDemoHomeCollectionStatus(
  id: string,
  status: HomeCollectionStatus,
): void {
  _updateDemoHomeCollectionStatus(id, status);
}

export function updateDemoHomeCollection(
  id: string,
  updates: Partial<DemoHomeCollection>,
): void {
  try {
    const raw = localStorage.getItem("demo_home_collections");
    if (!raw) return;
    const collections: DemoHomeCollection[] = JSON.parse(raw);
    const updated = collections.map((hc) =>
      hc.id === id ? { ...hc, ...updates } : hc,
    );
    localStorage.setItem("demo_home_collections", JSON.stringify(updated));
  } catch (e) {
    console.warn("[demoData] Failed to update demo home collection:", e);
  }
}

// ─── Sample helpers ───────────────────────────────────────────────────────────

// Legacy type alias
export type DemoHospitalSample = DemoSample;

export function getDemoSamples(phlebotomistId?: string): DemoSample[] {
  return _getDemoSamples(phlebotomistId);
}

export function getDemoSampleId(): string {
  return `sample-${Date.now()}`;
}

export function updateDemoSampleStatus(
  sampleId: string,
  newStatus: DemoSample["status"],
  updatedBy?: string,
  note?: string,
): void {
  _updateDemoSampleStatus(
    sampleId,
    newStatus,
    updatedBy ?? DEMO_PHLEBO_ID,
    note ?? `Status updated to ${newStatus}`,
  );
}

export function resetDemoSamples(): void {
  // No-op in new implementation — we never reset existing data
}

export function addDemoHospitalSample(sample: DemoSample): void {
  _addDemoSample(sample);
}

// ─── Hospital helpers ─────────────────────────────────────────────────────────

export const DEMO_HOSPITAL_RECORD: DemoHospital = {
  id: DEMO_HOSPITAL_ID_1,
  name: "City Care Hospital",
  city: "Mumbai",
  address: "12, Link Road, Andheri West",
  area: "Andheri West",
  contactNumber: "022-12345678",
  isActive: true,
  createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000,
};

export const DEMO_HOSPITAL = DEMO_HOSPITAL_RECORD;

export function getDemoPhlebotomistHospitals(
  phlebotomistId?: string,
): DemoHospital[] {
  const id = phlebotomistId ?? DEMO_PHLEBO_ID;
  return getDemoHospitalsByPhlebotomist(id);
}

export { getDemoHospitals };
export type { DemoHospital };
