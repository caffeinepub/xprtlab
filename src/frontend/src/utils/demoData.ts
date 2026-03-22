/**
 * demoData.ts
 *
 * DATA-RETURNING FUNCTIONS THROW: Demo data is removed.
 * Use backendService for all data operations.
 * Void/constant exports kept intact for compatibility.
 */

import {
  DEMO_PHLEBO_ID,
  type DemoHomeCollection,
  type DemoHospital,
  type DemoSample,
} from "./demoStorage";

export const DEMO_USER_ID = "demo-patient-001";
export const DEMO_HOSPITAL_ID = "";
export { DEMO_PHLEBO_ID };

export function isDemoMode(): boolean {
  return false;
}

export type HomeCollectionStatus =
  | "ASSIGNED"
  | "EN_ROUTE"
  | "SAMPLE_COLLECTED"
  | "COMPLETED";

export type { DemoHomeCollection };

export function seedDemoHomeCollections(): void {
  // no-op
}

export function getDemoHomeCollections(
  _phlebotomistId?: string,
): DemoHomeCollection[] {
  return [];
}

export function setDemoHomeCollections(
  _collections: DemoHomeCollection[],
): void {
  // no-op
}

export function updateDemoHomeCollectionStatus(
  _id: string,
  _status: HomeCollectionStatus,
): void {
  // no-op
}

export function updateDemoHomeCollection(
  _id: string,
  _updates: Partial<DemoHomeCollection>,
): void {
  // no-op
}

export type DemoHospitalSample = DemoSample;

export function getDemoSamples(_phlebotomistId?: string): DemoSample[] {
  return [];
}

export function getDemoSampleId(): string {
  return "";
}

export function updateDemoSampleStatus(
  _sampleId: string,
  _newStatus: DemoSample["status"],
  _updatedBy?: string,
  _note?: string,
): void {
  // no-op
}

export function resetDemoSamples(): void {
  // no-op
}

export function addDemoHospitalSample(_sample: DemoSample): void {
  // no-op
}

export const DEMO_HOSPITAL_RECORD: DemoHospital | null = null;
export const DEMO_HOSPITAL: DemoHospital | null = null;

export function getDemoPhlebotomistHospitals(
  _phlebotomistId?: string,
): DemoHospital[] {
  return [];
}

export function getDemoHospitals(): DemoHospital[] {
  return [];
}

export function getDemoHospitalsByPhlebotomist(
  _phlebotomistId?: string,
): DemoHospital[] {
  return [];
}

export type { DemoHospital };
