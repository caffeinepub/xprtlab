import type { Principal } from '@icp-sdk/core/principal';
import type {
  AppRole,
  Booking,
  HomeCollectionRequest,
  Report,
  Incident,
  AuditLog,
  Test,
  BPReading,
  RBSTest,
  UserProfile,
  Variant_canceled_pending_completed_confirmed,
  Variant_assigned_requested_canceled_completed,
  Variant_low_high_medium,
} from '../backend';

export type {
  AppRole,
  Booking,
  HomeCollectionRequest,
  Report,
  Incident,
  AuditLog,
  Test,
  BPReading,
  RBSTest,
  UserProfile,
  Variant_canceled_pending_completed_confirmed as BookingStatus,
  Variant_assigned_requested_canceled_completed as HomeCollectionStatus,
  Variant_low_high_medium as IncidentSeverity,
};

export interface CartItem {
  test: Test;
  quantity: number;
}

export interface CampEvent {
  id: string;
  name: string;
  date: string;
  location: string;
  createdAt: number;
}

export interface CheckIn {
  campId: string;
  participantId: string;
  timestamp: number;
  scannedBy: string;
}

export interface NavItem {
  label: string;
  path: string;
  icon: string;
}

export interface RoleNavConfig {
  items: NavItem[];
  defaultPath: string;
}
