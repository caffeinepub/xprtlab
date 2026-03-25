# XprtLab — Remove Test Mode Completely

## Current State
- `useSystemMode.ts` hook manages TEST/PRODUCTION/demo mode stored in localStorage
- `SuperAdminSettingsPage.tsx` shows a System Mode section with TEST MODE / PRODUCTION MODE toggle buttons and Reset Test Data button
- `StaffLoginScreen.tsx` uses hardcoded `ALLOWED_MOBILES` map (9999999999/8888888888/7777777777)
- `OTPLoginScreen.tsx` accepts `isDemoMode` prop; shows demo mode banner when true
- Multiple files import `useSystemMode` and check `isTestMode`/`systemMode`
- `demoData.ts` has `isDemoMode()` function
- `StaffApp.tsx` passes `isDemoMode={false}` to many pages

## Requested Changes (Diff)

### Add
- Nothing new to add

### Modify
- `SuperAdminSettingsPage.tsx`: Remove the entire SystemModeSection component and its UI (TEST MODE / PRODUCTION MODE toggle + Reset Test Data button). Keep Lab Admins and Phlebotomists tabs.
- `OTPLoginScreen.tsx`: Remove `isDemoMode` prop entirely. Remove demo mode banner. OTP validation always uses `DEMO_OTP = '123456'` (already hardcoded for all paths).
- `StaffLoginScreen.tsx`: Remove `ALLOWED_MOBILES` hardcoded map. Login success must call `backendService.getUserByMobile(mobile)` to validate user exists and get their role. If not found, show 'Account not found. Please contact administrator.'
- `StaffApp.tsx`: Remove all `isDemoMode={false}` prop passing to pages. Remove any systemMode/isTestMode checks.
- `demoData.ts`: Remove `isDemoMode()` function or replace with a stub that always returns false.

### Remove
- `useSystemMode.ts` hook (or gut it to be a no-op)
- `xpertlab_system_mode` localStorage key cleanup
- SystemModeSection component from settings
- All `isTestMode`/`systemMode` conditional logic across all files
- Demo mode banner from OTPLoginScreen
- `isDemoMode` prop from all components

## Implementation Plan
1. Delete/gut `useSystemMode.ts` — export a no-op that always returns production values so existing imports don't break during transition
2. Remove SystemModeSection from `SuperAdminSettingsPage.tsx`; remove `useSystemMode` import
3. Update `OTPLoginScreen.tsx` — remove `isDemoMode` prop, remove demo banner, keep OTP validation as-is (123456 always works)
4. Update `StaffLoginScreen.tsx` — remove `ALLOWED_MOBILES`, after OTP success call `backendService.getUserByMobile(mobile)` to get role; show 'Account not found' if null
5. Update `StaffApp.tsx` — remove `isDemoMode` props from page renders
6. Remove `isDemoMode()` from `demoData.ts`
7. Remove `useSystemMode` imports from all other files that use it
8. Run validate to ensure no TypeScript errors
