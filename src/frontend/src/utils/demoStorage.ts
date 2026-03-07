/**
 * demoStorage.ts
 *
 * Centralized demo-mode localStorage service.
 * STRICT "seed only if empty" policy:
 *   - Each key is checked individually before seeding.
 *   - If a key already holds a non-empty valid JSON array/object, it is NEVER overwritten.
 *   - On JSON parse failure the key is treated as empty and re-seeded (only that key).
 *   - localStorage.clear() and localStorage.removeItem() are NEVER called for demo_* keys.
 *   - All reads/writes are wrapped in try/catch.
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
} as const;

// ─── Demo IDs ─────────────────────────────────────────────────────────────────
export const DEMO_PHLEBO_ID = "demo-phlebo-001";
export const DEMO_HOSPITAL_ID_1 = "demo-hospital-001";
export const DEMO_HOSPITAL_ID_2 = "demo-hospital-002";
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
  doctorCommissionPct: number; // percentage 0–100
  sampleType: string;
  isActive: boolean;
}

// ─── Safe read/write helpers ──────────────────────────────────────────────────

function safeRead<T>(key: string): T[] | null {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return null;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) return parsed as T[];
    if (Array.isArray(parsed) && parsed.length === 0) return []; // empty array — treat as empty
    return null; // not an array
  } catch {
    console.warn(`[demoStorage] Failed to parse key "${key}", will re-seed.`);
    return null;
  }
}

function safeWrite<T>(key: string, data: T[]): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn(`[demoStorage] Failed to write key "${key}":`, e);
  }
}

/** Only writes if the key is absent, null, or holds an empty/corrupted value */
function seedIfEmpty<T>(key: string, defaultData: T[]): void {
  const existing = safeRead<T>(key);
  if (existing === null || existing.length === 0) {
    safeWrite(key, defaultData);
  }
}

// ─── Default seed data ────────────────────────────────────────────────────────

function buildDefaultUsers(): DemoUser[] {
  return [
    {
      id: DEMO_PHLEBO_ID,
      name: "Ravi Kumar",
      phone: "9876543210",
      role: "phlebotomist",
      area: "Andheri West",
    },
    {
      id: DEMO_USER_ID,
      name: "Priya Sharma",
      phone: "9123456780",
      role: "patient",
    },
  ];
}

function buildDefaultHospitals(): DemoHospital[] {
  return [
    {
      id: DEMO_HOSPITAL_ID_1,
      name: "City Care Hospital",
      city: "Mumbai",
      address: "12, Link Road, Andheri West",
      area: "Andheri West",
      contactNumber: "022-12345678",
      isActive: true,
      createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000,
    },
    {
      id: DEMO_HOSPITAL_ID_2,
      name: "Sunrise Medical Centre",
      city: "Mumbai",
      address: "45, SV Road, Borivali East",
      area: "Borivali East",
      contactNumber: "022-87654321",
      isActive: true,
      createdAt: Date.now() - 20 * 24 * 60 * 60 * 1000,
    },
  ];
}

function buildDefaultHospitalAssignments(): DemoHospitalAssignment[] {
  return [
    {
      id: "assign-001",
      hospitalId: DEMO_HOSPITAL_ID_1,
      phlebotomistId: DEMO_PHLEBO_ID,
      assignedAt: Date.now() - 10 * 24 * 60 * 60 * 1000,
      isActive: true,
    },
    {
      id: "assign-002",
      hospitalId: DEMO_HOSPITAL_ID_2,
      phlebotomistId: DEMO_PHLEBO_ID,
      assignedAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
      isActive: true,
    },
  ];
}

function buildDefaultPhlebotomistTests(): DemoPhlebotomistTest[] {
  return [
    {
      id: "ptest-001",
      phlebotomistId: DEMO_PHLEBO_ID,
      testId: "CBC",
      testName: "Complete Blood Count",
      testCode: "CBC",
    },
    {
      id: "ptest-002",
      phlebotomistId: DEMO_PHLEBO_ID,
      testId: "LFT",
      testName: "Liver Function Test",
      testCode: "LFT",
    },
    {
      id: "ptest-003",
      phlebotomistId: DEMO_PHLEBO_ID,
      testId: "RBS",
      testName: "Random Blood Sugar",
      testCode: "RBS",
    },
  ];
}

function buildDefaultHomeCollections(): DemoHomeCollection[] {
  const now = Date.now();
  return [
    {
      id: "hc-001",
      patientName: "Anita Desai",
      phone: "9876501234",
      address: "Flat 3B, Shanti Niwas, Andheri West, Mumbai - 400058",
      lat: 19.1364,
      lng: 72.8296,
      tests: [
        {
          testId: "CBC",
          testName: "Complete Blood Count",
          testCode: "CBC",
          price: 350,
        },
        {
          testId: "LFT",
          testName: "Liver Function Test",
          testCode: "LFT",
          price: 600,
        },
      ],
      slot: "08:00 AM - 09:00 AM",
      assignedPhlebotomistId: DEMO_PHLEBO_ID,
      status: "ASSIGNED",
      timestamp: now - 2 * 60 * 60 * 1000,
      distance: 1.2,
    },
    {
      id: "hc-002",
      patientName: "Suresh Mehta",
      phone: "9988776655",
      address: "201, Lotus Apartments, Borivali East, Mumbai - 400066",
      lat: 19.2307,
      lng: 72.8567,
      tests: [
        {
          testId: "RBS",
          testName: "Random Blood Sugar",
          testCode: "RBS",
          price: 150,
        },
      ],
      slot: "09:00 AM - 10:00 AM",
      assignedPhlebotomistId: DEMO_PHLEBO_ID,
      status: "EN_ROUTE",
      timestamp: now - 1 * 60 * 60 * 1000,
      distance: 3.5,
    },
    {
      id: "hc-003",
      patientName: "Kavita Joshi",
      phone: "9123456789",
      address: "7, Rose Garden Society, Malad West, Mumbai - 400064",
      lat: 19.1872,
      lng: 72.8484,
      tests: [
        {
          testId: "CBC",
          testName: "Complete Blood Count",
          testCode: "CBC",
          price: 350,
        },
      ],
      slot: "10:00 AM - 11:00 AM",
      assignedPhlebotomistId: DEMO_PHLEBO_ID,
      status: "SAMPLE_COLLECTED",
      timestamp: now - 30 * 60 * 1000,
      distance: 2.1,
    },
  ];
}

function buildDefaultSamples(): DemoSample[] {
  const now = Date.now();
  const dayMs = 24 * 60 * 60 * 1000;
  return [
    {
      id: "sample-001",
      patientName: "Ramesh Gupta",
      phone: "9001122334",
      hospitalId: DEMO_HOSPITAL_ID_1,
      phlebotomistId: DEMO_PHLEBO_ID,
      tests: [
        {
          testId: "CBC",
          testName: "Complete Blood Count",
          testCode: "CBC",
          price: 350,
        },
      ],
      totalMrp: 350,
      discountAmount: 0,
      maxAllowedDiscount: 17,
      finalAmount: 350,
      amountReceived: 350,
      pendingAmount: 0,
      paymentMode: "CASH",
      billingLocked: false,
      createdByRole: "phlebotomist",
      updatedByAdmin: false,
      createdAt: now - 5 * 60 * 60 * 1000,
      status: "SAMPLE_COLLECTED",
      statusHistory: [
        {
          status: "SAMPLE_COLLECTED",
          timestamp: now - 5 * 60 * 60 * 1000,
          note: "Sample collected at City Care Hospital",
          updatedBy: DEMO_PHLEBO_ID,
        },
      ],
    },
    {
      id: "sample-002",
      patientName: "Sunita Patil",
      phone: "9112233445",
      hospitalId: DEMO_HOSPITAL_ID_1,
      phlebotomistId: DEMO_PHLEBO_ID,
      tests: [
        {
          testId: "LFT",
          testName: "Liver Function Test",
          testCode: "LFT",
          price: 600,
        },
        {
          testId: "RBS",
          testName: "Random Blood Sugar",
          testCode: "RBS",
          price: 150,
        },
      ],
      totalMrp: 750,
      discountAmount: 50,
      maxAllowedDiscount: 37,
      finalAmount: 700,
      amountReceived: 700,
      pendingAmount: 0,
      paymentMode: "UPI",
      billingLocked: true,
      createdByRole: "phlebotomist",
      updatedByAdmin: false,
      createdAt: now - 8 * 60 * 60 * 1000,
      status: "DISPATCHED",
      statusHistory: [
        {
          status: "SAMPLE_COLLECTED",
          timestamp: now - 9 * 60 * 60 * 1000,
          note: "Sample collected at City Care Hospital",
          updatedBy: DEMO_PHLEBO_ID,
        },
        {
          status: "DISPATCHED",
          timestamp: now - 8 * 60 * 60 * 1000,
          note: "Sample dispatched to lab",
          updatedBy: DEMO_PHLEBO_ID,
        },
      ],
    },
    {
      id: "sample-003",
      patientName: "Mohan Verma",
      phone: "9223344556",
      hospitalId: DEMO_HOSPITAL_ID_2,
      phlebotomistId: DEMO_PHLEBO_ID,
      tests: [
        {
          testId: "CBC",
          testName: "Complete Blood Count",
          testCode: "CBC",
          price: 350,
        },
        {
          testId: "LFT",
          testName: "Liver Function Test",
          testCode: "LFT",
          price: 600,
        },
      ],
      totalMrp: 950,
      discountAmount: 0,
      maxAllowedDiscount: 47,
      finalAmount: 950,
      amountReceived: 500,
      pendingAmount: 450,
      paymentMode: "CASH",
      billingLocked: false,
      createdByRole: "phlebotomist",
      updatedByAdmin: false,
      createdAt: now - 12 * 60 * 60 * 1000,
      status: "PROCESSING",
      statusHistory: [
        {
          status: "SAMPLE_COLLECTED",
          timestamp: now - 14 * 60 * 60 * 1000,
          note: "Sample collected at Sunrise Medical Centre",
          updatedBy: DEMO_PHLEBO_ID,
        },
        {
          status: "DISPATCHED",
          timestamp: now - 13 * 60 * 60 * 1000,
          note: "Sample dispatched to lab",
          updatedBy: DEMO_PHLEBO_ID,
        },
        {
          status: "PROCESSING",
          timestamp: now - 12 * 60 * 60 * 1000,
          note: "Sample received and processing started",
          updatedBy: "lab-admin",
        },
      ],
    },
    {
      id: "sample-004",
      patientName: "Geeta Nair",
      phone: "9334455667",
      hospitalId: DEMO_HOSPITAL_ID_2,
      phlebotomistId: DEMO_PHLEBO_ID,
      tests: [
        {
          testId: "RBS",
          testName: "Random Blood Sugar",
          testCode: "RBS",
          price: 150,
        },
      ],
      totalMrp: 150,
      discountAmount: 0,
      maxAllowedDiscount: 7,
      finalAmount: 150,
      amountReceived: 150,
      pendingAmount: 0,
      paymentMode: "UPI",
      billingLocked: true,
      createdByRole: "phlebotomist",
      updatedByAdmin: false,
      createdAt: now - 1 * dayMs,
      status: "REPORT_READY",
      statusHistory: [
        {
          status: "SAMPLE_COLLECTED",
          timestamp: now - 26 * 60 * 60 * 1000,
          note: "Sample collected at Sunrise Medical Centre",
          updatedBy: DEMO_PHLEBO_ID,
        },
        {
          status: "DISPATCHED",
          timestamp: now - 25 * 60 * 60 * 1000,
          note: "Sample dispatched to lab",
          updatedBy: DEMO_PHLEBO_ID,
        },
        {
          status: "PROCESSING",
          timestamp: now - 24 * 60 * 60 * 1000,
          note: "Processing started",
          updatedBy: "lab-admin",
        },
        {
          status: "REPORT_READY",
          timestamp: now - 1 * dayMs,
          note: "Report generated and ready",
          updatedBy: "lab-admin",
        },
      ],
    },
    {
      id: "sample-005",
      patientName: "Arun Sharma",
      phone: "9445566778",
      hospitalId: DEMO_HOSPITAL_ID_1,
      phlebotomistId: DEMO_PHLEBO_ID,
      tests: [
        {
          testId: "CBC",
          testName: "Complete Blood Count",
          testCode: "CBC",
          price: 350,
        },
        {
          testId: "RBS",
          testName: "Random Blood Sugar",
          testCode: "RBS",
          price: 150,
        },
      ],
      totalMrp: 500,
      discountAmount: 25,
      maxAllowedDiscount: 25,
      finalAmount: 475,
      amountReceived: 475,
      pendingAmount: 0,
      paymentMode: "CASH",
      billingLocked: true,
      createdByRole: "phlebotomist",
      updatedByAdmin: false,
      createdAt: now - 2 * dayMs,
      status: "REPORT_DELIVERED",
      statusHistory: [
        {
          status: "SAMPLE_COLLECTED",
          timestamp: now - 50 * 60 * 60 * 1000,
          note: "Sample collected at City Care Hospital",
          updatedBy: DEMO_PHLEBO_ID,
        },
        {
          status: "DISPATCHED",
          timestamp: now - 49 * 60 * 60 * 1000,
          note: "Sample dispatched to lab",
          updatedBy: DEMO_PHLEBO_ID,
        },
        {
          status: "PROCESSING",
          timestamp: now - 48 * 60 * 60 * 1000,
          note: "Processing started",
          updatedBy: "lab-admin",
        },
        {
          status: "REPORT_READY",
          timestamp: now - 4 * 60 * 60 * 1000,
          note: "Report generated and ready",
          updatedBy: "lab-admin",
        },
        {
          status: "REPORT_DELIVERED",
          timestamp: now - 2 * 60 * 60 * 1000,
          note: "Report delivered via WhatsApp",
          updatedBy: DEMO_PHLEBO_ID,
        },
      ],
      deliveryMethod: "WHATSAPP",
      deliveredAt: now - 2 * 60 * 60 * 1000,
      deliveredByRole: "phlebotomist",
      deliveredById: DEMO_PHLEBO_ID,
    },
    // Additional samples for better revenue data (today's samples)
    {
      id: "sample-006",
      patientName: "Kavita Joshi",
      phone: "9876501006",
      hospitalId: DEMO_HOSPITAL_ID_1,
      phlebotomistId: DEMO_PHLEBO_ID,
      tests: [
        {
          testId: "TSH",
          testName: "Thyroid Stimulating Hormone",
          testCode: "TSH",
          price: 600,
        },
      ],
      totalMrp: 600,
      discountAmount: 50,
      maxAllowedDiscount: 120,
      finalAmount: 550,
      amountReceived: 550,
      pendingAmount: 0,
      paymentMode: "UPI",
      billingLocked: true,
      createdByRole: "phlebotomist",
      updatedByAdmin: false,
      createdAt: now - 3 * 60 * 60 * 1000,
      status: "REPORT_DELIVERED",
      statusHistory: [
        {
          status: "SAMPLE_COLLECTED",
          timestamp: now - 3 * 60 * 60 * 1000,
          note: "Sample collected",
          updatedBy: DEMO_PHLEBO_ID,
        },
        {
          status: "REPORT_DELIVERED",
          timestamp: now - 1 * 60 * 60 * 1000,
          note: "Delivered via Email",
          updatedBy: "lab-admin",
        },
      ],
      deliveryMethod: "EMAIL",
      deliveredAt: now - 1 * 60 * 60 * 1000,
    },
    {
      id: "sample-007",
      patientName: "Mohan Das",
      phone: "9876501007",
      hospitalId: DEMO_HOSPITAL_ID_2,
      phlebotomistId: DEMO_PHLEBO_ID,
      tests: [
        {
          testId: "LIPID",
          testName: "Lipid Profile",
          testCode: "LIPID",
          price: 500,
        },
        { testId: "HBA1C", testName: "HbA1c", testCode: "HBA1C", price: 450 },
      ],
      totalMrp: 950,
      discountAmount: 100,
      maxAllowedDiscount: 190,
      finalAmount: 850,
      amountReceived: 850,
      pendingAmount: 0,
      paymentMode: "CASH",
      billingLocked: true,
      createdByRole: "phlebotomist",
      updatedByAdmin: false,
      createdAt: now - 2 * 60 * 60 * 1000,
      status: "PROCESSING",
      statusHistory: [
        {
          status: "SAMPLE_COLLECTED",
          timestamp: now - 2 * 60 * 60 * 1000,
          note: "Sample collected",
          updatedBy: DEMO_PHLEBO_ID,
        },
        {
          status: "PROCESSING",
          timestamp: now - 1 * 60 * 60 * 1000,
          note: "Processing",
          updatedBy: "lab-admin",
        },
      ],
    },
    {
      id: "sample-008",
      patientName: "Deepa Rao",
      phone: "9876501008",
      hospitalId: DEMO_HOSPITAL_ID_1,
      phlebotomistId: DEMO_PHLEBO_ID,
      tests: [
        {
          testId: "CBC",
          testName: "Complete Blood Count",
          testCode: "CBC",
          price: 350,
        },
        {
          testId: "LFT",
          testName: "Liver Function Test",
          testCode: "LFT",
          price: 600,
        },
        {
          testId: "KFT",
          testName: "Kidney Function Test",
          testCode: "KFT",
          price: 500,
        },
      ],
      totalMrp: 1450,
      discountAmount: 200,
      maxAllowedDiscount: 290,
      finalAmount: 1250,
      amountReceived: 1250,
      pendingAmount: 0,
      paymentMode: "UPI",
      billingLocked: true,
      createdByRole: "phlebotomist",
      updatedByAdmin: false,
      createdAt: now - 3 * dayMs,
      status: "REPORT_DELIVERED",
      statusHistory: [
        {
          status: "SAMPLE_COLLECTED",
          timestamp: now - 3 * dayMs,
          note: "Sample collected",
          updatedBy: DEMO_PHLEBO_ID,
        },
        {
          status: "REPORT_DELIVERED",
          timestamp: now - 2 * dayMs,
          note: "Delivered",
          updatedBy: "lab-admin",
        },
      ],
      deliveryMethod: "WHATSAPP",
      deliveredAt: now - 2 * dayMs,
    },
  ];
}

function buildDefaultStatusHistory(): DemoStatusHistoryEntry[] {
  const now = Date.now();
  return [
    {
      id: "sh-001-1",
      sampleId: "sample-001",
      status: "SAMPLE_COLLECTED",
      timestamp: now - 5 * 60 * 60 * 1000,
      updatedBy: DEMO_PHLEBO_ID,
      note: "Sample collected at City Care Hospital",
    },
    {
      id: "sh-002-1",
      sampleId: "sample-002",
      status: "SAMPLE_COLLECTED",
      timestamp: now - 9 * 60 * 60 * 1000,
      updatedBy: DEMO_PHLEBO_ID,
      note: "Sample collected at City Care Hospital",
    },
    {
      id: "sh-002-2",
      sampleId: "sample-002",
      status: "DISPATCHED",
      timestamp: now - 8 * 60 * 60 * 1000,
      updatedBy: DEMO_PHLEBO_ID,
      note: "Sample dispatched to lab",
    },
    {
      id: "sh-003-1",
      sampleId: "sample-003",
      status: "SAMPLE_COLLECTED",
      timestamp: now - 14 * 60 * 60 * 1000,
      updatedBy: DEMO_PHLEBO_ID,
      note: "Sample collected at Sunrise Medical Centre",
    },
    {
      id: "sh-003-2",
      sampleId: "sample-003",
      status: "DISPATCHED",
      timestamp: now - 13 * 60 * 60 * 1000,
      updatedBy: DEMO_PHLEBO_ID,
      note: "Sample dispatched to lab",
    },
    {
      id: "sh-003-3",
      sampleId: "sample-003",
      status: "PROCESSING",
      timestamp: now - 12 * 60 * 60 * 1000,
      updatedBy: "lab-admin",
      note: "Sample received and processing started",
    },
    {
      id: "sh-004-1",
      sampleId: "sample-004",
      status: "SAMPLE_COLLECTED",
      timestamp: now - 26 * 60 * 60 * 1000,
      updatedBy: DEMO_PHLEBO_ID,
      note: "Sample collected at Sunrise Medical Centre",
    },
    {
      id: "sh-004-2",
      sampleId: "sample-004",
      status: "DISPATCHED",
      timestamp: now - 25 * 60 * 60 * 1000,
      updatedBy: DEMO_PHLEBO_ID,
      note: "Sample dispatched to lab",
    },
    {
      id: "sh-004-3",
      sampleId: "sample-004",
      status: "PROCESSING",
      timestamp: now - 24 * 60 * 60 * 1000,
      updatedBy: "lab-admin",
      note: "Processing started",
    },
    {
      id: "sh-004-4",
      sampleId: "sample-004",
      status: "REPORT_READY",
      timestamp: now - 24 * 60 * 60 * 1000,
      updatedBy: "lab-admin",
      note: "Report generated and ready",
    },
    {
      id: "sh-005-1",
      sampleId: "sample-005",
      status: "SAMPLE_COLLECTED",
      timestamp: now - 50 * 60 * 60 * 1000,
      updatedBy: DEMO_PHLEBO_ID,
      note: "Sample collected at City Care Hospital",
    },
    {
      id: "sh-005-2",
      sampleId: "sample-005",
      status: "DISPATCHED",
      timestamp: now - 49 * 60 * 60 * 1000,
      updatedBy: DEMO_PHLEBO_ID,
      note: "Sample dispatched to lab",
    },
    {
      id: "sh-005-3",
      sampleId: "sample-005",
      status: "PROCESSING",
      timestamp: now - 48 * 60 * 60 * 1000,
      updatedBy: "lab-admin",
      note: "Processing started",
    },
    {
      id: "sh-005-4",
      sampleId: "sample-005",
      status: "REPORT_READY",
      timestamp: now - 4 * 60 * 60 * 1000,
      updatedBy: "lab-admin",
      note: "Report generated and ready",
    },
    {
      id: "sh-005-5",
      sampleId: "sample-005",
      status: "REPORT_DELIVERED",
      timestamp: now - 2 * 60 * 60 * 1000,
      updatedBy: DEMO_PHLEBO_ID,
      note: "Report delivered via WhatsApp",
    },
  ];
}

function buildDefaultDeliveryTracking(): DemoDeliveryTracking[] {
  const now = Date.now();
  return [
    {
      id: "dt-001",
      sampleId: "sample-005",
      deliveryMethod: "WHATSAPP",
      deliveredAt: now - 2 * 60 * 60 * 1000,
      deliveredBy: DEMO_PHLEBO_ID,
      recipientPhone: "9445566778",
    },
  ];
}

function buildDefaultTestMasters(): DemoTestMaster[] {
  return [
    {
      id: "CBC001",
      testName: "CBC",
      testCode: "CBC001",
      mrp: 300,
      labCost: 40,
      doctorCommissionPct: 50,
      sampleType: "Blood",
      isActive: true,
    },
    {
      id: "BSF001",
      testName: "Blood Sugar Fasting",
      testCode: "BSF001",
      mrp: 150,
      labCost: 20,
      doctorCommissionPct: 40,
      sampleType: "Blood",
      isActive: true,
    },
    {
      id: "LP001",
      testName: "Lipid Profile",
      testCode: "LP001",
      mrp: 600,
      labCost: 80,
      doctorCommissionPct: 50,
      sampleType: "Blood",
      isActive: true,
    },
    {
      id: "TP001",
      testName: "Thyroid Profile",
      testCode: "TP001",
      mrp: 700,
      labCost: 90,
      doctorCommissionPct: 50,
      sampleType: "Blood",
      isActive: true,
    },
    {
      id: "VD001",
      testName: "Vitamin D",
      testCode: "VD001",
      mrp: 1200,
      labCost: 500,
      doctorCommissionPct: 56.8,
      sampleType: "Blood",
      isActive: true,
    },
    {
      id: "UR001",
      testName: "Urine Routine",
      testCode: "UR001",
      mrp: 200,
      labCost: 30,
      doctorCommissionPct: 50,
      sampleType: "Urine",
      isActive: true,
    },
    {
      id: "LFT001",
      testName: "Liver Function Test",
      testCode: "LFT001",
      mrp: 800,
      labCost: 100,
      doctorCommissionPct: 50,
      sampleType: "Blood",
      isActive: true,
    },
    {
      id: "KFT001",
      testName: "Kidney Function Test",
      testCode: "KFT001",
      mrp: 750,
      labCost: 95,
      doctorCommissionPct: 50,
      sampleType: "Blood",
      isActive: true,
    },
    {
      id: "HBA001",
      testName: "HbA1c",
      testCode: "HBA001",
      mrp: 500,
      labCost: 70,
      doctorCommissionPct: 50,
      sampleType: "Blood",
      isActive: true,
    },
    {
      id: "DN001",
      testName: "Dengue NS1",
      testCode: "DN001",
      mrp: 900,
      labCost: 150,
      doctorCommissionPct: 50,
      sampleType: "Blood",
      isActive: true,
    },
  ];
}

function buildDefaultSettlements(): DemoSettlement[] {
  const now = Date.now();
  return [
    {
      id: "settlement-001",
      hospitalId: DEMO_HOSPITAL_ID_1,
      amount: 15000,
      settlementType: "Settled",
      timestamp: now - 7 * 24 * 60 * 60 * 1000,
      notes: "Full payment received via NEFT transfer",
    },
    {
      id: "settlement-002",
      hospitalId: DEMO_HOSPITAL_ID_1,
      amount: 8500,
      settlementType: "Partial",
      timestamp: now - 2 * 24 * 60 * 60 * 1000,
      notes: "Partial payment - remaining to be collected next week",
    },
    {
      id: "settlement-003",
      hospitalId: DEMO_HOSPITAL_ID_2,
      amount: 12000,
      settlementType: "Settled",
      timestamp: now - 5 * 24 * 60 * 60 * 1000,
      notes: "Monthly settlement completed",
    },
  ];
}

// ─── Public initialization ────────────────────────────────────────────────────

/**
 * Idempotent initialization — safe to call multiple times.
 * Only seeds keys that are absent, empty, or corrupted.
 * Never overwrites existing valid data.
 */
export function initializeDemoStorage(): void {
  seedIfEmpty(KEYS.USERS, buildDefaultUsers());
  seedIfEmpty(KEYS.HOSPITALS, buildDefaultHospitals());
  seedIfEmpty(KEYS.HOSPITAL_ASSIGNMENTS, buildDefaultHospitalAssignments());
  seedIfEmpty(KEYS.PHLEBO_TESTS, buildDefaultPhlebotomistTests());
  seedIfEmpty(KEYS.HOME_COLLECTIONS, buildDefaultHomeCollections());
  seedIfEmpty(KEYS.SAMPLES, buildDefaultSamples());
  seedIfEmpty(KEYS.STATUS_HISTORY, buildDefaultStatusHistory());
  seedIfEmpty(KEYS.DELIVERY_TRACKING, buildDefaultDeliveryTracking());
  seedIfEmpty(KEYS.SETTLEMENTS, buildDefaultSettlements());
  seedIfEmpty(KEYS.TESTS, buildDefaultTestMasters());
}

// ─── Read helpers ─────────────────────────────────────────────────────────────

export function getDemoUsers(): DemoUser[] {
  return safeRead<DemoUser>(KEYS.USERS) ?? [];
}

export function getDemoHospitals(): DemoHospital[] {
  return safeRead<DemoHospital>(KEYS.HOSPITALS) ?? [];
}

export function getDemoHospitalAssignments(): DemoHospitalAssignment[] {
  return safeRead<DemoHospitalAssignment>(KEYS.HOSPITAL_ASSIGNMENTS) ?? [];
}

export function getDemoHospitalsByPhlebotomist(
  phlebotomistId: string,
): DemoHospital[] {
  const assignments = getDemoHospitalAssignments().filter(
    (a) => a.phlebotomistId === phlebotomistId && a.isActive,
  );
  const hospitals = getDemoHospitals();
  return assignments
    .map((a) => hospitals.find((h) => h.id === a.hospitalId))
    .filter((h): h is DemoHospital => h !== undefined);
}

export function getDemoHomeCollections(
  phlebotomistId?: string,
): DemoHomeCollection[] {
  const all = safeRead<DemoHomeCollection>(KEYS.HOME_COLLECTIONS) ?? [];
  if (!phlebotomistId) return all;
  return all.filter((hc) => hc.assignedPhlebotomistId === phlebotomistId);
}

export function updateDemoHomeCollectionStatus(
  id: string,
  status: DemoHomeCollection["status"],
): void {
  const all = safeRead<DemoHomeCollection>(KEYS.HOME_COLLECTIONS) ?? [];
  const updated = all.map((hc) => (hc.id === id ? { ...hc, status } : hc));
  safeWrite(KEYS.HOME_COLLECTIONS, updated);
}

export function getDemoSamples(phlebotomistId?: string): DemoSample[] {
  const all = safeRead<DemoSample>(KEYS.SAMPLES) ?? [];
  if (!phlebotomistId) return all;
  return all.filter((s) => s.phlebotomistId === phlebotomistId);
}

export function addDemoSample(sample: DemoSample): void {
  const all = safeRead<DemoSample>(KEYS.SAMPLES) ?? [];
  all.push(sample);
  safeWrite(KEYS.SAMPLES, all);
}

export function updateDemoSampleStatus(
  sampleId: string,
  newStatus: DemoSample["status"],
  updatedBy: string,
  note: string,
): void {
  const all = safeRead<DemoSample>(KEYS.SAMPLES) ?? [];
  const updated = all.map((s) => {
    if (s.id !== sampleId) return s;
    const historyEntry = {
      status: newStatus,
      timestamp: Date.now(),
      note,
      updatedBy,
    };
    return {
      ...s,
      status: newStatus,
      statusHistory: [...(s.statusHistory ?? []), historyEntry],
    };
  });
  safeWrite(KEYS.SAMPLES, updated);
}

export function updateDemoSampleDelivery(
  sampleId: string,
  deliveryMethod: string,
  deliveredByRole: string,
  deliveredById: string,
): void {
  const all = safeRead<DemoSample>(KEYS.SAMPLES) ?? [];
  const now = Date.now();
  const updated = all.map((s) => {
    if (s.id !== sampleId) return s;
    const historyEntry = {
      status: "REPORT_DELIVERED",
      timestamp: now,
      note: `Report delivered via ${deliveryMethod}`,
      updatedBy: deliveredById,
    };
    return {
      ...s,
      status: "REPORT_DELIVERED" as const,
      deliveryMethod,
      deliveredAt: now,
      deliveredByRole,
      deliveredById,
      statusHistory: [...(s.statusHistory ?? []), historyEntry],
    };
  });
  safeWrite(KEYS.SAMPLES, updated);
}

export function getDemoStatusHistory(
  sampleId?: string,
): DemoStatusHistoryEntry[] {
  const all = safeRead<DemoStatusHistoryEntry>(KEYS.STATUS_HISTORY) ?? [];
  if (!sampleId) return all;
  return all.filter((h) => h.sampleId === sampleId);
}

export function addDemoDeliveryTracking(tracking: DemoDeliveryTracking): void {
  const all = safeRead<DemoDeliveryTracking>(KEYS.DELIVERY_TRACKING) ?? [];
  all.push(tracking);
  safeWrite(KEYS.DELIVERY_TRACKING, all);
}

export function getDemoDeliveryTracking(
  sampleId?: string,
): DemoDeliveryTracking[] {
  const all = safeRead<DemoDeliveryTracking>(KEYS.DELIVERY_TRACKING) ?? [];
  if (!sampleId) return all;
  return all.filter((d) => d.sampleId === sampleId);
}

// ─── Settlement helpers ───────────────────────────────────────────────────────

export function getDemoSettlements(hospitalId?: string): DemoSettlement[] {
  const all = safeRead<DemoSettlement>(KEYS.SETTLEMENTS) ?? [];
  if (!hospitalId) return all;
  return all.filter((s) => s.hospitalId === hospitalId);
}

export function saveDemoSettlement(settlement: DemoSettlement): void {
  const all = safeRead<DemoSettlement>(KEYS.SETTLEMENTS) ?? [];
  all.push(settlement);
  safeWrite(KEYS.SETTLEMENTS, all);
}

// ─── Test Master helpers ───────────────────────────────────────────────────────

export function getDemoTests(): DemoTestMaster[] {
  return safeRead<DemoTestMaster>(KEYS.TESTS) ?? [];
}

export function saveDemoTests(tests: DemoTestMaster[]): void {
  safeWrite(KEYS.TESTS, tests);
}

export function addDemoTestMaster(test: DemoTestMaster): void {
  const all = getDemoTests();
  // Prevent duplicate testCode
  const exists = all.some(
    (t) => t.testCode.toUpperCase() === test.testCode.toUpperCase(),
  );
  if (exists) {
    // Update existing instead
    updateDemoTestMaster(test.testCode, test);
    return;
  }
  all.push(test);
  safeWrite(KEYS.TESTS, all);
}

export function updateDemoTestMaster(
  testCode: string,
  updates: Partial<DemoTestMaster>,
): void {
  const all = getDemoTests();
  const updated = all.map((t) =>
    t.testCode.toUpperCase() === testCode.toUpperCase()
      ? { ...t, ...updates }
      : t,
  );
  safeWrite(KEYS.TESTS, updated);
}
