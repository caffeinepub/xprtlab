// Local type definitions since the backend interface only exposes minimal types
// These mirror the Motoko backend types but are defined locally for frontend use

export type AppRole = 'patient' | 'phlebotomist' | 'labAdmin' | 'superAdmin';

export interface UserProfile {
  name: string;
  appRole: AppRole;
  phone: string;
}

export interface Test {
  id: string;
  name: string;
  description: string;
  price: number;
  offerPrice?: number;
}

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'canceled';

export interface Booking {
  id: string;
  patient: string;
  tests: Test[];
  slot: string;
  status: BookingStatus | { pending: null } | { confirmed: null } | { completed: null } | { canceled: null };
  timestamp: number;
  patientName?: string;
  phone?: string;
}

export type HomeCollectionStatus = 'requested' | 'assigned' | 'completed' | 'canceled' | 'in-progress' | 'not-available';

export interface HomeCollectionRequest {
  id: string;
  patient: string;
  address: string;
  latitude?: number;
  longitude?: number;
  tests: Test[];
  slot: string;
  assignedPhlebotomist?: string;
  status: HomeCollectionStatus | { requested: null } | { assigned: null } | { completed: null } | { canceled: null };
  timestamp: number;
  patientName?: string;
  phone?: string;
  contactNumber?: string;
  payableAmount?: number;
  finalAmount?: number;
}

export interface Report {
  id: string;
  patient: string;
  bookingId: string;
  file: any;
  uploadedBy: string;
  timestamp: number;
}

export type IncidentSeverity = 'low' | 'medium' | 'high';

export interface Incident {
  id: string;
  reporter: string;
  description: string;
  severity: IncidentSeverity | { low: null } | { medium: null } | { high: null };
  photo?: any;
  timestamp: number;
}

export interface AuditLog {
  actorId: string;
  actionType: string;
  targetDocument: string;
  timestamp: number;
}

export interface BPReading {
  systolic: number;
  diastolic: number;
  pulse: number;
  timestamp: number;
}

export interface RBSTest {
  glucoseLevel: number;
  timestamp: number;
}

export interface HospitalSample {
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
  status: string;
  createdAt: number;
}

export interface Attendance {
  phlebotomistId: string;
  hospitalId: string;
  checkInTime: number;
  checkOutTime?: number;
  checkInLat: number;
  checkInLong: number;
  checkOutLat?: number;
  checkOutLong?: number;
  checkInSelfieUrl: string;
  totalWorkingMinutes?: number;
  status: string;
}

export interface SecurityLog {
  userId: string;
  eventType: string;
  deviceId: string;
  latitude?: number;
  longitude?: number;
  timestamp: number;
  reason: string;
}

export interface DeviceBinding {
  userId: string;
  deviceId: string;
  deviceModel: string;
  osVersion: string;
  boundAt: number;
}
