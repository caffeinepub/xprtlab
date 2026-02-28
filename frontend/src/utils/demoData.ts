import { SampleStatus, DeliveryMethod, HospitalSampleTestRef } from '../types/models';

export const isDemoMode = (): boolean => {
  return localStorage.getItem('demoMode') === 'true';
};

export const DEMO_USER_ID = 'demo-user-001';
export const DEMO_HOSPITAL_ID = 'demo-hospital-001';

export const DEMO_HOSPITAL = {
  id: DEMO_HOSPITAL_ID,
  name: 'Demo City Hospital',
  address: '123 Demo Street, Demo City',
};

export const DEMO_HOSPITAL_RECORD = DEMO_HOSPITAL;

export interface DemoHospitalSample {
  id: string;
  patientName: string;
  phone: string;
  hospitalId: string;
  phlebotomistId: string;
  tests: HospitalSampleTestRef[];
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
  status: SampleStatus;
  statusHistory: Array<[SampleStatus, number, string, string]>;
  deliveryMethod?: DeliveryMethod;
  deliveredAt?: number;
  deliveredByRole?: string;
  deliveredById?: string;
  reportUrl?: string;
}

const DEMO_SAMPLES_KEY = 'demoHospitalSamples';

export function getDemoSamples(): DemoHospitalSample[] {
  try {
    const raw = localStorage.getItem(DEMO_SAMPLES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function getDemoSampleId(): string {
  return `demo-sample-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function addDemoHospitalSample(sample: DemoHospitalSample): void {
  const samples = getDemoSamples();
  samples.unshift(sample);
  localStorage.setItem(DEMO_SAMPLES_KEY, JSON.stringify(samples));
}

export function updateDemoSampleStatus(
  sampleId: string,
  newStatus: SampleStatus,
  updatedBy: string = 'demo',
  note: string = ''
): void {
  const samples = getDemoSamples();
  const idx = samples.findIndex((s) => s.id === sampleId);
  if (idx === -1) return;
  const sample = samples[idx];
  sample.status = newStatus;
  sample.statusHistory = [
    ...(sample.statusHistory ?? []),
    [newStatus, Date.now(), updatedBy, note],
  ];
  samples[idx] = sample;
  localStorage.setItem(DEMO_SAMPLES_KEY, JSON.stringify(samples));
}

export function resetDemoSamples(): void {
  localStorage.removeItem(DEMO_SAMPLES_KEY);
}

// ─── Demo Home Collections ────────────────────────────────────────────────────

export type HomeCollectionStatus =
  | 'ASSIGNED'
  | 'EN_ROUTE'
  | 'SAMPLE_COLLECTED'
  | 'COMPLETED';

export interface DemoHomeCollection {
  id: string;
  patientName: string;
  address: string;
  lat?: number;
  lng?: number;
  tests: Array<{ id: string; name: string; price: number }>;
  slot: string;
  status: HomeCollectionStatus;
  timestamp: number;
  phone?: string;
  distance?: number;
}

const DEMO_HOME_COLLECTIONS_KEY = 'demoHomeCollections';

export function getDemoHomeCollections(): DemoHomeCollection[] {
  try {
    const raw = localStorage.getItem(DEMO_HOME_COLLECTIONS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function setDemoHomeCollections(collections: DemoHomeCollection[]): void {
  localStorage.setItem(DEMO_HOME_COLLECTIONS_KEY, JSON.stringify(collections));
}

export function updateDemoHomeCollectionStatus(
  id: string,
  status: HomeCollectionStatus
): void {
  const collections = getDemoHomeCollections();
  const idx = collections.findIndex((c) => c.id === id);
  if (idx === -1) return;
  collections[idx] = { ...collections[idx], status };
  setDemoHomeCollections(collections);
}

export function updateDemoHomeCollection(
  id: string,
  updates: Partial<DemoHomeCollection>
): void {
  const collections = getDemoHomeCollections();
  const idx = collections.findIndex((c) => c.id === id);
  if (idx === -1) return;
  collections[idx] = { ...collections[idx], ...updates };
  setDemoHomeCollections(collections);
}

export function seedDemoHomeCollections(): void {
  const existing = getDemoHomeCollections();
  if (existing.length > 0) return;

  const seed: DemoHomeCollection[] = [
    {
      id: 'demo-hc-001',
      patientName: 'Priya Sharma',
      address: '12, Rose Garden Colony, Sector 5, Noida',
      lat: 28.5355,
      lng: 77.391,
      tests: [
        { id: 'CBC', name: 'Complete Blood Count', price: 350 },
        { id: 'LFT', name: 'Liver Function Test', price: 600 },
      ],
      slot: '9:00 AM - 10:00 AM',
      status: 'ASSIGNED',
      timestamp: Date.now() - 30 * 60 * 1000,
      phone: '9876543210',
      distance: 2.4,
    },
    {
      id: 'demo-hc-002',
      patientName: 'Rajesh Kumar',
      address: '45, Lajpat Nagar, New Delhi',
      lat: 28.5672,
      lng: 77.2434,
      tests: [{ id: 'TSH', name: 'Thyroid Profile', price: 450 }],
      slot: '10:00 AM - 11:00 AM',
      status: 'EN_ROUTE',
      timestamp: Date.now() - 15 * 60 * 1000,
      phone: '9123456789',
      distance: 5.1,
    },
    {
      id: 'demo-hc-003',
      patientName: 'Anita Verma',
      address: '78, Vasant Kunj, New Delhi',
      lat: 28.5244,
      lng: 77.1577,
      tests: [
        { id: 'HBA1C', name: 'HbA1c', price: 700 },
        { id: 'FBS', name: 'Fasting Blood Sugar', price: 150 },
      ],
      slot: '11:00 AM - 12:00 PM',
      status: 'SAMPLE_COLLECTED',
      timestamp: Date.now() - 5 * 60 * 1000,
      phone: '9988776655',
      distance: 3.7,
    },
  ];

  setDemoHomeCollections(seed);
}

export function getDemoPhlebotomistHospitals(): Array<{ id: string; name: string; address: string }> {
  const stored = localStorage.getItem('demoPhlebotomistHospitals');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // fall through
    }
  }
  const defaults = [DEMO_HOSPITAL];
  localStorage.setItem('demoPhlebotomistHospitals', JSON.stringify(defaults));
  return defaults;
}
