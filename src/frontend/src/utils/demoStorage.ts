/**
 * demoStorage.ts
 *
 * ALL DATA-RETURNING FUNCTIONS THROW: Demo data is removed.
 * Use backendService for all data operations.
 * Void functions remain as no-ops for compatibility.
 */

// ─── Storage Keys ────────────────────────────────────────────────────────────
export const KEYS = {
  USERS: "demo_users",
  HOSPITAL_ASSIGNMENTS: "demo_hospital_assignments",
  PHLEBO_TESTS: "demo_phlebo_tests",
  HOME_COLLECTIONS: "demo_home_collections",
  SAMPLES: "demo_samples",
  STATUS_HISTORY: "demo_status_history",
  DELIVERY_TRACKING: "demo_delivery_tracking",
  HOSPITALS: "demo_hospitals",
  SETTLEMENTS: "demo_settlements",
  TESTS: "demo_tests",
  REGISTERED_USERS: "xpertlab_registered_users",
  SESSION: "xpertlab_session",
} as const;

// ─── Demo IDs (emptied) ───────────────────────────────────────────────────────
export const DEMO_PHLEBO_ID = "";
export const DEMO_HOSPITAL_ID_1 = "";
export const DEMO_HOSPITAL_ID_2 = "";
export const DEMO_HOSPITAL_ID_3 = "";
export const DEMO_USER_ID = "demo-patient-001";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface DemoUser {
  id: string;
  name: string;
  phone: string;
  role: "phlebotomist" | "patient" | "labAdmin" | "superAdmin";
  area?: string;
}

export interface DemoHospitalAssignment {
  id: string;
  hospitalId: string;
  phlebotomistId: string;
  assignedAt: number;
  isActive: boolean;
}

export interface DemoPhlebotomistTest {
  id: string;
  phlebotomistId: string;
  testId: string;
  testName: string;
  testCode: string;
}

export interface DemoHomeCollection {
  id: string;
  patientName: string;
  phone: string;
  address: string;
  lat?: number;
  lng?: number;
  tests: Array<{
    testId: string;
    testName: string;
    testCode: string;
    price: number;
  }>;
  slot: string;
  assignedPhlebotomistId: string;
  status: "ASSIGNED" | "EN_ROUTE" | "SAMPLE_COLLECTED" | "COMPLETED";
  timestamp: number;
  distance?: number;
}

export interface DemoSample {
  id: string;
  sampleId?: string;
  patientName: string;
  phone: string;
  hospitalId: string;
  phlebotomistId: string;
  tests: Array<{
    testId: string;
    testName: string;
    testCode: string;
    price: number;
  }>;
  totalMrp: number;
  discountAmount: number;
  maxAllowedDiscount: number;
  finalAmount: number;
  amountReceived: number;
  pendingAmount: number;
  paymentMode: string;
  billingLocked: boolean;
  createdByRole: string;
  updatedByAdmin: boolean;
  createdAt: number;
  status:
    | "SAMPLE_COLLECTED"
    | "DISPATCHED"
    | "PROCESSING"
    | "REPORT_READY"
    | "REPORT_DELIVERED";
  statusHistory?: Array<{
    status: string;
    timestamp: number;
    note: string;
    updatedBy: string;
  }>;
  deliveryMethod?: string;
  deliveredAt?: number;
  deliveredByRole?: string;
  deliveredById?: string;
  reportUrl?: string;
}

export interface DemoStatusHistoryEntry {
  id: string;
  sampleId: string;
  status: string;
  timestamp: number;
  updatedBy: string;
  note: string;
}

export interface DemoDeliveryTracking {
  id: string;
  sampleId: string;
  deliveryMethod: string;
  deliveredAt: number;
  deliveredBy: string;
  recipientPhone?: string;
}

export interface DemoHospital {
  id: string;
  name: string;
  city: string;
  address: string;
  area: string;
  contactNumber: string;
  isActive: boolean;
  createdAt: number;
}

export interface DemoSettlement {
  id: string;
  hospitalId: string;
  amount: number;
  settlementType: "Settled" | "Partial";
  timestamp: number;
  notes?: string;
}

export interface DemoTestMaster {
  id: string;
  testName: string;
  testCode: string;
  mrp: number;
  labCost: number;
  doctorCommissionPct: number;
  sampleType: string;
  isActive: boolean;
}

export interface RegisteredUser {
  id: string;
  name: string;
  mobile: string;
  role: "phlebotomist" | "labAdmin" | "superAdmin" | "patient";
  hospitalIds?: string[];
  isActive: boolean;
  isTestAccount?: boolean;
}

export interface XpertLabSession {
  userId: string;
  mobile: string;
  role: "phlebotomist" | "labAdmin" | "superAdmin" | "patient";
  name: string;
  loginAt: number;
}

// ─── Void / no-op functions (safe to call) ───────────────────────────────────

export function initializeDemoStorage(): void {
  // no-op: demo storage is disabled
}

export function addDemoTestMaster(_test: DemoTestMaster): void {
  // no-op
}

export function saveDemoTests(_tests: DemoTestMaster[]): void {
  // no-op
}

export function addDemoSample(_sample: DemoSample): void {
  // no-op
}

export function updateDemoSampleStatus(
  _sampleId: string,
  _newStatus: DemoSample["status"],
  _updatedBy?: string,
  _note?: string,
): void {
  // no-op
}

export function updateDemoHomeCollectionStatus(
  _id: string,
  _status: DemoHomeCollection["status"],
): void {
  // no-op
}

export function registerUser(_user: RegisteredUser): void {
  // no-op
}

export function setSystemMode(_mode: string): void {
  // no-op
}

export function updateDemoTestMaster(
  _id: string,
  _updates: Partial<DemoTestMaster>,
): void {
  // no-op
}

export function saveDemoSettlement(_settlement: DemoSettlement): void {
  // no-op
}

export function addDemoDeliveryTracking(_tracking: DemoDeliveryTracking): void {
  // no-op
}

export function updateDemoSampleDelivery(
  _sampleId: string,
  _deliveryMethod: string,
  _deliveredBy?: string,
  _deliveredById?: string,
): void {
  // no-op
}

// ─── getSystemMode: non-demo config, safe to return constant ─────────────────

export function getSystemMode(): string {
  return "production";
}

// ─── DATA-RETURNING FUNCTIONS: all throw — use backendService instead ─────────

export function getDemoUsers(): DemoUser[] {
  return [];
}

export function getDemoHospitals(): DemoHospital[] {
  return [];
}

export function getDemoHospitalsByPhlebotomist(
  _phlebotomistId: string,
): DemoHospital[] {
  return [];
}

export function getDemoHospitalAssignments(): DemoHospitalAssignment[] {
  return [];
}

export function getDemoPhlebotomistTests(
  _phlebotomistId?: string,
): DemoPhlebotomistTest[] {
  return [];
}

export function getDemoHomeCollections(
  _phlebotomistId?: string,
): DemoHomeCollection[] {
  return [];
}

export function getDemoSamples(_phlebotomistId?: string): DemoSample[] {
  return [];
}

export function getDemoStatusHistory(
  _sampleId?: string,
): DemoStatusHistoryEntry[] {
  return [];
}

export function getDemoDeliveryTracking(
  _sampleId?: string,
): DemoDeliveryTracking[] {
  return [];
}

export function getDemoSettlements(_hospitalId?: string): DemoSettlement[] {
  return [];
}

export function getDemoTests(): DemoTestMaster[] {
  return [];
}

export function buildDefaultHospitals(): DemoHospital[] {
  return [];
}

export function buildDefaultSamples(): DemoSample[] {
  return [];
}

export function buildDefaultTestMasters(): DemoTestMaster[] {
  return [];
}

export function getRegisteredUser(_mobile: string): RegisteredUser | null {
  return null;
}
