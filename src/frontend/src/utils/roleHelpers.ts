import type { AppRole } from "../types/models";

export function isPhlebotomist(role?: AppRole | string): boolean {
  return role === "phlebotomist";
}

export function isLabAdmin(role?: AppRole | string): boolean {
  return role === "labAdmin";
}

export function isSuperAdmin(role?: AppRole | string): boolean {
  return role === "superAdmin";
}

export function isAdmin(role?: AppRole | string): boolean {
  return role === "labAdmin" || role === "superAdmin";
}

export function isPatient(role?: AppRole | string): boolean {
  return role === "patient";
}

export function getRoleDisplayName(role?: AppRole | string): string {
  switch (role) {
    case "phlebotomist":
      return "Phlebotomist";
    case "labAdmin":
      return "Lab Admin";
    case "superAdmin":
      return "Super Admin";
    case "patient":
      return "Patient";
    default:
      return "User";
  }
}
