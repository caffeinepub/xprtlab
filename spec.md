# XpertLab – Phase 1: TEST_MODE, Browser Permissions, Gradient Update

## Current State

- Super Admin Settings page has User Management (Lab Admins + Phlebotomists) but no System Mode section.
- `StaffLoginScreen.tsx` has `isDemoMode={true}` hardcoded, always showing demo UI and quick-role buttons.
- Demo banner and quick-role buttons are always visible on the staff login screen.
- Gradient across all panels uses `#0D47A1 → #26A69A`.
- Camera/location permissions are used but may lack proper error handling for browser API prompts.
- Backend (Motoko) has no `setSystemMode` / `getSystemMode` method; TEST_MODE was previously stored nowhere (not persisted).

## Requested Changes (Diff)

### Add
- `setSystemMode(mode: SystemMode): Promise<void>` and `getSystemMode(): Promise<SystemMode>` to Motoko backend, where `SystemMode` is `"test"` or `"production"`.
- System Mode section in Super Admin → Settings with TEST MODE / PRODUCTION MODE toggle, reading/writing via backend API.
- Auto-seed logic: when TEST_MODE is enabled, check localStorage for test accounts (Test Phlebo 9999999999, Test Lab Admin 8888888888, Super Admin 7777777777 assigned to Vijaya Hospital); create them if missing.
- Browser permission utility (`usePermissions` hook or inline guards) for camera (`getUserMedia`), location (`Geolocation API`), and file upload — with graceful denial messages, PWA-compatible.

### Modify
- `StaffLoginScreen.tsx`: make `isDemoMode` prop dynamic based on system mode flag fetched from backend; hide demo banner and quick-role buttons when in TEST or PRODUCTION mode.
- All global gradient references: replace `#0D47A1` → `#2563EB` and `#26A69A` → `#06B6D4` across all panel CSS, inline styles, Tailwind config, and component gradient strings (headers, active nav tabs, primary buttons, card accents).
- `PhlebotomistAttendancePage.tsx`: use `navigator.mediaDevices.getUserMedia` with proper permission prompt and error handling for selfie capture.
- `AttendancePage.tsx` / GPS steps: use `navigator.geolocation.getCurrentPosition` with proper permission prompt, timeout, and error messages.

### Remove
- Nothing removed permanently; demo banner and role buttons are conditionally hidden (not deleted) based on system mode.

## Implementation Plan

1. **Backend**: Add `setSystemMode` and `getSystemMode` Motoko methods. SystemMode type = variant `#test` / `#production`. Stored in a stable var.
2. **System Mode UI** (SuperAdminSettingsPage): New "System Mode" section at top of Settings. Pill toggle: TEST MODE / PRODUCTION MODE. On toggle, call `backend.setSystemMode(...)`. On page load, call `backend.getSystemMode()` to hydrate UI.
3. **Demo UI conditional rendering**: Fetch system mode from backend (or fall back to localStorage cache) on app load. Store in React context or a lightweight hook `useSystemMode`. When mode is `test` or `production`, set `isDemoMode=false` on `StaffLoginScreen`, hiding demo banner and quick-role buttons.
4. **Test account auto-seed**: When Super Admin switches to TEST MODE, check `xpertlab_phlebotomists` and `xpertlab_lab_admins` in localStorage; insert test accounts if not present. Test OTP `123456` already works via existing demo OTP logic when `isDemoMode=true` equivalent; ensure test accounts are allowed OTP 123456 in TEST MODE.
5. **Browser permissions**: Add `useCameraPermission` and `useLocationPermission` utility hooks with `getUserMedia` / `geolocation` prompts, graceful denied error messages, and retry buttons. Apply to selfie capture and GPS steps in attendance flows.
6. **Gradient replacement**: Global find/replace `#0D47A1` → `#2563EB` and `#26A69A` → `#06B6D4` in all component files, inline styles, and any CSS/Tailwind config. Update `index.css` CSS variables if defined there.
