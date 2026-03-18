# XpertLab — Phase 2: UI + Role Control + Profile

## Current State
- StaffProfilePage exists at `src/frontend/src/pages/staff/StaffProfilePage.tsx` with name/mobile/role/hospital fields and password update, accessible via profile icon in `StaffAppLayout`
- StaffAppLayout header has UserCircle icon that navigates to `staff-profile` — profile page already wired
- StaffProfilePage does NOT have a Logout button
- BottomNavigation uses gradient pill for active tab with white icons — already styled with `#2563EB → #06B6D4`
- Role-based access is partially enforced in StaffApp.tsx (switch/case with AccessDenied), but nav items for phlebotomist still include "Sample" and "My Samples" which could allow hospital/test access via page navigation
- Phlebotomist nav: Home, Tasks, Visits, Sample, My Samples — no hospital/test tabs (good)
- No frontend role guard on AddHospitalSamplePage, HospitalManagementPage, TestManagementPage to hide "Add" buttons for unauthorized roles
- Modals in HospitalManagementPage and TestManagementPage may have hidden buttons on mobile (no max-height/overflow-y/sticky footer)
- PhlebotomistAttendancePage GPS accuracy limit may still be set to 150m — needs to be 4000m
- Selfie capture button visibility may be low contrast on white background
- authToken not consistently sent in API calls for Add Hospital / Add Test

## Requested Changes (Diff)

### Add
- Logout button in StaffProfilePage: clear `localStorage` key `xpertlab_session` (and `session`) then call `onNavigate('logout')` or trigger logout callback
- LogOut handler in StaffApp that resets demoMode and redirects to login

### Modify
- StaffProfilePage: add Logout button (red/destructive style) below the Go Back button
- StaffApp: add `logout` navigation case that calls `clearSession()` and resets state
- Role-based UI restrictions:
  - Phlebotomist: hide "Add Hospital" and "Add Test" buttons, hide hospital management pages, hide admin-only nav items if any
  - Lab Admin: hide "Add Hospital" button (view-only for hospitals), can view tests but not add
  - Super Admin: full access unchanged
- Pass `role` prop down to HospitalManagementPage and TestManagementPage to conditionally show/hide add/edit buttons
- All modals (TestManagementPage modal, HospitalManagementPage modal): add `max-height: 90vh`, `overflow-y: auto` to modal body, and `position: sticky; bottom: 0; background: white` to buttons container
- PhlebotomistAttendancePage GPS accuracy: change threshold from 150 to 4000 meters
- Selfie capture button: increase contrast — use solid gradient background `#2563EB → #06B6D4` with white text, add `box-shadow`, ensure visible over white
- BottomNavigation: confirm gradient `#2563EB → #06B6D4` with active tab pill highlight (already done, verify and ensure it applies to all 3 staff roles)
- Ensure authToken from session is read and passed as header in createHospital / createTest API calls

### Remove
- Nothing removed

## Implementation Plan
1. **StaffProfilePage** — add Logout button that clears session and calls logout callback
2. **StaffApp** — add `logout` nav case that calls `clearSession()` + resets all state to log out
3. **Role-based UI** — pass `role` to HospitalManagementPage and TestManagementPage; hide Add/Edit buttons for Phlebotomist (no access) and Lab Admin (view-only for hospitals); also hide in AddHospitalSamplePage if needed
4. **Modal scrollability** — in TestManagementPage and HospitalManagementPage modals add `maxHeight: '90vh'`, `overflowY: 'auto'` to modal content; make button footer `position: sticky; bottom: 0; background: #fff; padding: 12px 0; zIndex: 1`
5. **GPS accuracy** — in PhlebotomistAttendancePage find accuracy check and change `<= 150` (or similar) to `<= 4000`
6. **Selfie button** — find selfie capture button in PhlebotomistAttendancePage/AttendancePage; apply gradient background, white text, shadow for visibility
7. **authToken in API calls** — read `xpertlab_session` from localStorage and pass `authToken` in API headers for createHospital and createTest
8. **Navigation gradient** — verify BottomNavigation active pill uses `#2563EB → #06B6D4` (already implemented, just confirm no regression)
