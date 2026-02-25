import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface AuditLog {
    actionType: string;
    actorId: Principal;
    timestamp: bigint;
    targetDocument: string;
}
export interface BPReading {
    systolic: bigint;
    timestamp: bigint;
    diastolic: bigint;
    pulse: bigint;
}
export interface Attendance {
    status: string;
    totalWorkingMinutes?: bigint;
    checkInSelfieUrl: string;
    checkInLong: number;
    checkInTime: bigint;
    phlebotomistId: string;
    hospitalId: string;
    checkOutLong?: number;
    checkOutTime?: bigint;
    checkInLat: number;
    checkOutLat?: number;
}
export interface Test {
    id: string;
    name: string;
    description: string;
    price: bigint;
}
export interface Incident {
    id: string;
    description: string;
    timestamp: bigint;
    severity: Variant_low_high_medium;
    photo?: ExternalBlob;
    reporter: Principal;
}
export interface Report {
    id: string;
    patient: Principal;
    bookingId: string;
    file: ExternalBlob;
    timestamp: bigint;
    uploadedBy: Principal;
}
export interface HomeCollectionRequest {
    id: string;
    status: Variant_assigned_requested_canceled_completed;
    latitude?: number;
    patient: Principal;
    tests: Array<Test>;
    slot: string;
    longitude?: number;
    address: string;
    timestamp: bigint;
    assignedPhlebotomist?: Principal;
}
export interface HospitalSample {
    mrp: number;
    status: string;
    finalAmount: number;
    createdAt: bigint;
    phlebotomistId: string;
    hospitalId: string;
    patientName: string;
    discount: number;
    paymentMode: string;
    phone: string;
    pendingAmount: number;
    amountReceived: number;
    testId: string;
}
export interface SecurityLog {
    latitude?: number;
    userId: string;
    longitude?: number;
    deviceId: string;
    timestamp: bigint;
    eventType: string;
    reason: string;
}
export interface RBSTest {
    glucoseLevel: bigint;
    timestamp: bigint;
}
export interface Booking {
    id: string;
    status: Variant_canceled_pending_completed_confirmed;
    patient: Principal;
    tests: Array<Test>;
    slot: string;
    timestamp: bigint;
}
export interface UserProfile {
    appRole: AppRole;
    name: string;
    phone: string;
}
export enum AppRole {
    patient = "patient",
    superAdmin = "superAdmin",
    labAdmin = "labAdmin",
    phlebotomist = "phlebotomist"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum Variant_assigned_requested_canceled_completed {
    assigned = "assigned",
    requested = "requested",
    canceled = "canceled",
    completed = "completed"
}
export enum Variant_canceled_pending_completed_confirmed {
    canceled = "canceled",
    pending = "pending",
    completed = "completed",
    confirmed = "confirmed"
}
export enum Variant_low_high_medium {
    low = "low",
    high = "high",
    medium = "medium"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    /**
     * / Admin-only: assign a phlebotomist to a home collection request
     */
    assignPhlebotomist(requestId: string, phlebotomist: Principal): Promise<void>;
    /**
     * / Authenticated users only: bind a device on first login.
     * / If a binding already exists for a different deviceId, returns an error.
     * / The caller must be the user identified by userId (ownership check).
     */
    bindDevice(userId: string, deviceId: string, deviceModel: string, osVersion: string): Promise<void>;
    /**
     * / Registered users (patients) can create bookings
     */
    createBooking(id: string, selectedTests: Array<Test>, slot: string): Promise<void>;
    /**
     * / Registered users (patients) can request home collection
     */
    createHomeCollectionRequest(id: string, address: string, latitude: number | null, longitude: number | null, selectedTests: Array<Test>, slot: string): Promise<void>;
    /**
     * / Phlebotomist-only (registered user): create a hospital sample with status SAMPLE_COLLECTED
     */
    createHospitalSample(patientName: string, phone: string, hospitalId: string, phlebotomistId: string, testId: string, mrp: number, discount: number, finalAmount: number, amountReceived: number, pendingAmount: number, paymentMode: string): Promise<void>;
    /**
     * / Authenticated users (phlebotomists) or system: write a security log entry.
     * / No role restriction beyond being an authenticated user — guests are blocked.
     */
    createSecurityLog(userId: string, eventType: string, deviceId: string, latitude: number | null, longitude: number | null, reason: string): Promise<void>;
    /**
     * / Authenticated users only: create (or replace) a session token.
     * / On login, a new ACTIVE session is written and any previous session for the
     * / same userId is implicitly superseded (the map entry is overwritten).
     * / The caller must be the user identified by userId (ownership check).
     */
    createSession(userId: string, sessionToken: string): Promise<void>;
    /**
     * / Admin-only: create a diagnostic test entry
     */
    createTest(id: string, name: string, description: string, price: bigint): Promise<void>;
    /**
     * / Admin-only: remove a diagnostic test
     */
    deleteTest(id: string): Promise<void>;
    /**
     * / Phlebotomist-only (registered user): end their own active shift.
     * / The caller must be the phlebotomist identified by phlebotomistId (ownership check).
     */
    endShift(phlebotomistId: string, hospitalId: string, checkOutLat: number, checkOutLong: number): Promise<void>;
    /**
     * / Phlebotomist-only (registered user): get their own active shift.
     * / The caller must be the phlebotomist identified by phlebotomistId (ownership check).
     */
    getActiveShift(phlebotomistId: string): Promise<Attendance | null>;
    /**
     * / Admin-only: get all currently active shifts
     */
    getAllActiveShifts(): Promise<Array<Attendance>>;
    /**
     * / Admin-only: view all audit logs
     */
    getAllAuditLogs(): Promise<Array<AuditLog>>;
    /**
     * / Admin-only: view all bookings
     */
    getAllBookings(): Promise<Array<Booking>>;
    /**
     * / Admin-only: view all home collection requests
     */
    getAllHomeCollectionRequests(): Promise<Array<HomeCollectionRequest>>;
    /**
     * / Admin-only: view all incidents
     */
    getAllIncidents(): Promise<Array<Incident>>;
    /**
     * / Admin-only: view all reports
     */
    getAllReports(): Promise<Array<Report>>;
    /**
     * / Public: any caller (including guests) can list all available tests
     */
    getAllTests(): Promise<Array<Test>>;
    /**
     * / Admin-only: get all attendance records for a specific phlebotomist
     */
    getAttendanceByPhlebotomist(phlebotomistId: string): Promise<Array<Attendance>>;
    /**
     * / Registered users can view BP readings for themselves; admins can view any
     */
    getBPReadings(patientId: Principal, bookingId: string): Promise<Array<BPReading>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    /**
     * / Admin-only: get hospital samples filtered by hospitalId
     */
    getHospitalSamplesByHospital(hospitalId: string): Promise<Array<HospitalSample>>;
    /**
     * / Admin-only: get hospital samples filtered by phlebotomistId
     */
    getHospitalSamplesByPhlebotomist(phlebotomistId: string): Promise<Array<HospitalSample>>;
    /**
     * / Patient (registered user) or admin: get hospital samples filtered by phone number.
     * / This supports the patient-linked view. Any authenticated user may query by phone
     * / (patients look up their own records; admins may look up any).
     */
    getHospitalSamplesByPhone(phone: string): Promise<{
        totalReceived: number;
        count: bigint;
        samples: Array<HospitalSample>;
        totalAmount: number;
        totalPending: number;
        totalDiscount: number;
    }>;
    /**
     * / Registered users can view their own bookings
     */
    getMyBookings(): Promise<Array<Booking>>;
    /**
     * / Registered users can view their own home collection requests
     */
    getMyHomeCollectionRequests(): Promise<Array<HomeCollectionRequest>>;
    /**
     * / Registered users can view incidents they reported
     */
    getMyIncidents(): Promise<Array<Incident>>;
    /**
     * / Registered users can view their own reports
     */
    getMyReports(): Promise<Array<Report>>;
    /**
     * / Registered users can view RBS readings for themselves; admins can view any
     */
    getRBSReadings(patientId: Principal, bookingId: string): Promise<Array<RBSTest>>;
    /**
     * / Admin/super-admin only: retrieve security logs, optionally filtered by userId and eventType.
     * / Pass empty strings to skip a filter.
     */
    getSecurityLogs(userId: string, eventType: string): Promise<Array<SecurityLog>>;
    /**
     * / Public: any caller (including guests) can browse available tests
     */
    getTest(id: string): Promise<Test>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    /**
     * / Registered users (phlebotomists/lab staff) can record BP readings for a patient
     */
    recordBPReading(patientId: Principal, bookingId: string, systolic: bigint, diastolic: bigint, pulse: bigint): Promise<void>;
    /**
     * / Registered users (phlebotomists/lab staff) can record RBS readings for a patient
     */
    recordRBSReading(patientId: Principal, bookingId: string, glucoseLevel: bigint): Promise<void>;
    /**
     * / Admin-only: remove the device binding for a given userId
     */
    resetDeviceBinding(userId: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    /**
     * / Phlebotomist-only (registered user): start a shift.
     * / The caller must be the phlebotomist identified by phlebotomistId (ownership check).
     * / Validates: no existing ACTIVE shift for this phlebotomist.
     */
    startShift(phlebotomistId: string, hospitalId: string, checkInLat: number, checkInLong: number, checkInSelfieUrl: string): Promise<void>;
    /**
     * / Registered users (any staff) can submit incidents
     */
    submitIncident(id: string, description: string, severity: Variant_low_high_medium, photo: ExternalBlob | null): Promise<void>;
    /**
     * / Admin-only: update booking status
     */
    updateBookingStatus(id: string, status: Variant_canceled_pending_completed_confirmed): Promise<void>;
    /**
     * / Registered users can update the status of a home collection request they are assigned to or own
     */
    updateHomeCollectionStatus(requestId: string, status: Variant_assigned_requested_canceled_completed): Promise<void>;
    /**
     * / Admin-only: update billing fields of a hospital sample
     */
    updateHospitalSampleBilling(id: string, discount: number, finalAmount: number, amountReceived: number, pendingAmount: number, paymentMode: string): Promise<void>;
    /**
     * / Admin-only: upload a PDF report linked to a booking
     */
    uploadReport(id: string, patient: Principal, bookingId: string, file: ExternalBlob): Promise<void>;
    /**
     * / Authenticated users only: validate that the presented session token matches
     * / the current ACTIVE session for the given userId.
     * / Returns true if valid, false if the session has been superseded.
     * / The caller must be the user identified by userId (ownership check).
     */
    validateSession(userId: string, sessionToken: string): Promise<boolean>;
}
