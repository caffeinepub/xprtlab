# Specification

## Summary
**Goal:** Split the existing single-bundle frontend into two separate logical apps (Patient App and Staff App) accessible from a shared root landing page, without changing the backend or any existing page functionality.

**Planned changes:**
- Add a root landing page (`/`) with two cards — "Patient App" and "Staff App" — using XpertLab gradient branding, allowing users to self-select their app. Already-authenticated users are redirected directly to their role's home screen.
- Create a Patient App entry (`PatientApp.tsx`) with its own route configuration covering only patient-facing pages. Login screen shows XpertLab branding; non-patient roles see an error message.
- Create a Staff App entry (`StaffApp.tsx`) with its own route configuration covering only staff-facing pages (Phlebotomist, Lab Admin, Super Admin). Login screen shows XpertLab Staff branding; patient-role users see an error message.
- Role-based post-login redirects: patients → `/patient/home`, phlebotomists → `/phlebotomist/tasks`, Lab Admin → `/admin/bookings`, Super Admin → `/admin/audit-logs`.
- Patient App bottom navigation shows only patient nav items; Staff App bottom navigation shows only phlebotomist/admin nav items based on role.
- Neither app's bundle imports or references the other app's page components; shared components remain shared and are not duplicated.

**User-visible outcome:** Users visiting the app see a branded landing page to choose between the Patient App and the Staff App. Each app loads only its relevant pages and navigation, and prevents access by users with the wrong role.
