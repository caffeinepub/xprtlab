import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface HospitalPhlebotomistAssignment {
    assignedAt: bigint;
    assignedBy: Principal;
    isActive: boolean;
    hospitalId: string;
    removedAt?: bigint;
    removalReason?: string;
    phlebotomist: Principal;
}
export interface TestInput {
    code: string;
    name: string;
    sampleType: string;
    isActive: boolean;
    price: bigint;
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
export interface TestOutput {
    id: string;
    code: string;
    name: string;
    sampleType: string;
    isActive: boolean;
    price: bigint;
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
export enum TestError {
    notFound = "notFound",
    duplicateCode = "duplicateCode"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
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
    disableHospital(id: string): Promise<Hospital>;
    disableTest(code: string): Promise<TestOutput>;
    getAllTests(): Promise<Array<TestOutput>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getHospitalById(id: string): Promise<Hospital>;
    getHospitals(search: string | null): Promise<Array<Hospital>>;
    getHospitalsByPhlebotomist(phlebotomist: Principal): Promise<Array<string>>;
    getPhlebotomistsByHospital(hospitalId: string): Promise<Array<Principal>>;
    getTest(code: string): Promise<TestOutput | null>;
    getTestByCode(testCode: string): Promise<TestOutput | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    removePhlebotomistFromHospital(hospitalId: string, phlebotomist: Principal, removalReason: string): Promise<HospitalPhlebotomistAssignment>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setTestStatus(testId: string, isActive: boolean): Promise<{
        __kind__: "ok";
        ok: TestOutput;
    } | {
        __kind__: "err";
        err: TestError;
    }>;
    updateHospital(id: string, name: string, city: string, address: string, area: string, contactNumber: string): Promise<Hospital>;
    updateTest(code: string, input: TestInput): Promise<{
        __kind__: "ok";
        ok: TestOutput;
    } | {
        __kind__: "err";
        err: TestError;
    }>;
}
