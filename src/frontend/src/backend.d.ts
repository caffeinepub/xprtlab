import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Settlement {
    settlementType: Variant_Partial_Settled;
    hospitalId: string;
    notes?: string;
    timestamp: bigint;
    amount: bigint;
}
export interface SampleTestItem {
    testCode: string;
    testName: string;
    price: bigint;
    testId: string;
}
export interface TestOutput {
    id: string;
    mrp: bigint;
    lab_cost: bigint;
    code: string;
    name: string;
    sampleType: string;
    isActive: boolean;
    commission_amount: bigint;
    profit: bigint;
    price: bigint;
}
export type Principal = Principal;
export interface AppTask {
    status: string;
    patient_name: string;
    hospital_id: string;
    task_id: string;
    created_at: bigint;
    assigned_by: string;
    assigned_to_mobile: string;
}
export interface HospitalPhlebotomistAssignment {
    assignedAt: bigint;
    assignedBy: Principal;
    isActive: boolean;
    hospitalId: string;
    removedAt?: bigint;
    removalReason?: string;
    phlebotomist: Principal;
}
export interface AppUser {
    name: string;
    createdAt: bigint;
    role: string;
    assignedHospitalId?: string;
    isActive: boolean;
    mobile: string;
}
export interface TestInput {
    mrp: bigint;
    lab_cost: bigint;
    code: string;
    name: string;
    sampleType: string;
    isActive: boolean;
    commission_amount: bigint;
    profit: bigint;
    price: bigint;
}
export interface SampleInput {
    tests: Array<SampleTestItem | null>;
    deliveryMethod?: string;
    hospitalId: string;
    totalAmount: bigint;
    patientName: string;
    paymentType: string;
    createdByMobile: string;
    phone: string;
}
export interface Hospital {
    id: string;
    area: string;
    city: string;
    name: string;
    createdAt: bigint;
    isActive: boolean;
    address: string;
    contactNumber: string;
}
export interface DashboardMetrics {
    pendingReports: bigint;
    revenueToday: bigint;
    samplesToday: bigint;
    samplesTotal: bigint;
    collectionsToday: bigint;
    activeHospitals: bigint;
}
export interface SampleRecord {
    status: string;
    tests: Array<SampleTestItem>;
    createdAt: bigint;
    deliveryMethod?: string;
    hospitalId: string;
    totalAmount: bigint;
    patientName: string;
    paymentType: string;
    createdByMobile: string;
    phone: string;
    sampleId: string;
}
export interface UserProfile {
    appRole: AppRole;
    area?: string;
    name: string;
    phone: string;
}
export enum AppRole {
    patient = "patient",
    superAdmin = "superAdmin",
    labAdmin = "labAdmin",
    phlebotomist = "phlebotomist"
}
export enum SystemMode {
    production = "production",
    test = "test"
}
export enum TestError {
    notFound = "notFound",
    duplicateCode = "duplicateCode"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum Variant_Partial_Settled {
    Partial_ = "Partial",
    Settled = "Settled"
}
export enum Variant_ok_notFound {
    ok = "ok",
    notFound = "notFound"
}
export interface backendInterface {
    /**
     * / HOSPITAL MANAGEMENT
     */
    addHospital(name: string, city: string, address: string, area: string, contactNumber: string): Promise<Hospital>;
    addTest(input: TestInput): Promise<{
        __kind__: "ok";
        ok: TestOutput;
    } | {
        __kind__: "err";
        err: TestError;
    }>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    assignPhlebotomistToHospital(hospitalId: string, phlebotomist: Principal): Promise<HospitalPhlebotomistAssignment>;
    bulkAddTests(testInputs: Array<TestInput>): Promise<Array<TestOutput>>;
    createSample(input: SampleInput): Promise<string>;
    createTask(assigned_to_mobile: string, assigned_by: string, hospital_id: string, patient_name: string, status: string): Promise<AppTask>;
    deleteAllData(): Promise<void>;
    deleteAllSampleData(): Promise<bigint>;
    deleteAllTasks(): Promise<bigint>;
    deleteTestUser(mobile: string): Promise<boolean>;
    disableHospital(id: string): Promise<Hospital>;
    disableTest(code: string): Promise<TestOutput>;
    getAllAppUsers(): Promise<Array<AppUser>>;
    getAllSamples(): Promise<Array<SampleRecord>>;
    getAllTasks(): Promise<Array<AppTask>>;
    getAllTests(): Promise<Array<TestOutput>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getDashboardMetrics(): Promise<DashboardMetrics>;
    getHospitalById(id: string): Promise<Hospital>;
    getHospitals(search: string | null): Promise<Array<Hospital>>;
    getHospitalsByPhlebotomist(phlebotomist: Principal): Promise<Array<string>>;
    getPhlebotomistsByHospital(hospitalId: string): Promise<Array<Principal>>;
    getSamplesByHospital(hospitalId: string): Promise<Array<SampleRecord>>;
    getSamplesByMobile(mobile: string): Promise<Array<SampleRecord>>;
    getSettlementHistory(hospitalId: string): Promise<Array<Settlement>>;
    getSystemMode(): Promise<SystemMode>;
    getTasksByUser(mobile: string): Promise<Array<AppTask>>;
    getTest(code: string): Promise<TestOutput | null>;
    getTestByCode(testCode: string): Promise<TestOutput | null>;
    getUserByMobile(mobile: string): Promise<AppUser | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    markSettlement(hospitalId: string, amount: bigint, settlementType: Variant_Partial_Settled, notes: string | null): Promise<Settlement>;
    registerAppUser(mobile: string, name: string, role: string, assignedHospitalId: string | null): Promise<AppUser>;
    removePhlebotomistFromHospital(hospitalId: string, phlebotomist: Principal, removalReason: string): Promise<HospitalPhlebotomistAssignment>;
    claimSuperAdmin(): Promise<{ __kind__: "ok"; ok: string } | { __kind__: "err"; err: string }>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    seedTestUsers(): Promise<bigint>;
    setSystemMode(mode: SystemMode): Promise<void>;
    setTestStatus(testId: string, isActive: boolean): Promise<{
        __kind__: "ok";
        ok: TestOutput;
    } | {
        __kind__: "err";
        err: TestError;
    }>;
    updateHospital(id: string, name: string, city: string, address: string, area: string, contactNumber: string): Promise<Hospital>;
    updateSampleStatus(sampleId: string, status: string): Promise<Variant_ok_notFound>;
    updateTest(code: string, input: TestInput): Promise<{
        __kind__: "ok";
        ok: TestOutput;
    } | {
        __kind__: "err";
        err: TestError;
    }>;
}
