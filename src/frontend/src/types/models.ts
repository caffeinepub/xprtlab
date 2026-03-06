// Local TypeScript type definitions for the XpertLab application

export type AppRole = "patient" | "phlebotomist" | "labAdmin" | "superAdmin";

export interface Test {
  id: string;
  name: string;
  description: string;
  price: number;
  testCode: string;
  mrp: number;
  sampleType: string;
  isActive: boolean;
}

export interface UserProfile {
  name: string;
  appRole: AppRole;
  phone: string;
}

export type HomeCollectionStatus =
  | "ASSIGNED"
  | "EN_ROUTE"
  | "SAMPLE_COLLECTED"
  | "COMPLETED";

export interface HomeCollectionRequest {
  id: string;
  patient: string;
  address: string;
  lat?: number;
  lng?: number;
  tests: Test[];
  slot: string;
  assignedPhlebotomist?: string;
  status: HomeCollectionStatus;
  timestamp: number;
}

// Sample workflow status — defined locally since backend.d.ts no longer exports it
export type SampleStatus =
  | "SAMPLE_COLLECTED"
  | "DISPATCHED"
  | "RECEIVED_AT_LAB"
  | "PROCESSING"
  | "REPORT_READY"
  | "REPORT_DELIVERED";

// Delivery method — defined locally since backend.d.ts no longer exports it
export type DeliveryMethod =
  | "WHATSAPP"
  | "PHYSICAL"
  | "EMAIL"
  | "HOSPITAL_PICKUP";

// Hospital sample test reference — defined locally
export interface HospitalSampleTestRef {
  testId: string;
  testName: string;
  testCode: string;
  price: bigint;
}

// Test search result — defined locally
export interface TestSearchResult {
  testId: string;
  testName: string;
  testCode: string;
  mrp: number;
  sampleType: string;
}

export interface HospitalSample {
  id?: string;
  patientName: string;
  phone: string;
  hospitalId: string;
  phlebotomistId: string;
  tests: HospitalSampleTestRef[];
  totalMrp: bigint;
  discountAmount: bigint;
  maxAllowedDiscount: bigint;
  finalAmount: bigint;
  amountReceived: bigint;
  pendingAmount: bigint;
  paymentMode: string;
  billingLocked: boolean;
  createdByRole: string;
  updatedByAdmin: boolean;
  createdAt: bigint;
  status: SampleStatus;
  statusHistory: Array<[SampleStatus, bigint, string, string]>;
  deliveryMethod?: DeliveryMethod;
  deliveredAt?: bigint;
  deliveredByRole?: string;
  deliveredById?: string;
  reportUrl?: string;
}
