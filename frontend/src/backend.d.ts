import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Hospital {
    id: string;
    name: string;
    address: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAssignedHospitals(): Promise<Array<Hospital>>;
    getCallerUserRole(): Promise<UserRole>;
    getTodaySummary(): Promise<{
        cashCollected: number;
        upiCollected: number;
        pendingAmount: number;
        totalSamplesCollected: bigint;
    }>;
    isCallerAdmin(): Promise<boolean>;
}
