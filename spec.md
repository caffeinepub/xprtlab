# Specification

## Summary
**Goal:** Add a comprehensive demo mode to the XpertLab app that bypasses GPS, device checks, and authentication so every feature can be tested end-to-end without real hardware or an Internet Identity.

**Planned changes:**
- Add a global demo mode context/state that stores `demoMode: true` and the selected role, activated from demo role buttons on `StaffLoginScreen`.
- Show a persistent demo-mode banner in `StaffAppLayout` (and `PatientAppLayout`) while demo mode is active.
- In demo mode, bypass all GPS geofencing, accuracy checks, mock-location detection, and speed-jump anomaly checks in attendance pages; inject fixed mock coordinates so geofence validation always passes.
- In demo mode, skip device fingerprinting/binding enforcement and auto-pass the selfie capture step with a placeholder image so shift check-in/check-out completes without a real camera.
- Bypass `ShiftGuard` in demo mode by providing a simulated active shift, making all phlebotomist sub-pages (task queue, home collection queue, vitals, hospital samples, QR scan, etc.) accessible without starting a real shift.
- Seed all data-dependent pages with realistic role-appropriate mock data (bookings, home collection queue, hospital samples, reports, audit logs, incidents, security logs, attendance history, notifications) so no screen shows an empty state in demo mode.
- Make all mutating actions (status updates, report uploads, vitals submission, QR scan, incident submission, billing edits) optimistically succeed with a success toast and local UI update without real backend calls in demo mode.
- Add a "Demo Patient" entry point on the patient login/app selector screen that enters patient demo mode with a mock profile and populates all patient pages with mock data.

**User-visible outcome:** Testers can click a demo role button (phlebotomist, lab admin, super admin, or demo patient) and immediately explore every feature of the app — including attendance, shift workflows, task queues, reports, admin logs, and patient pages — with realistic mock data and no GPS, camera, or Internet Identity required.
