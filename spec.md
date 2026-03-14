# XprtLab

## Current State

The Super Admin panel includes:
- `AuditLogsPage.tsx`: Shows log entries with search, date range, and status filter tabs. No per-field dropdowns for phlebotomist/hospital/action type. No CSV export.
- `PhlebotomistCollectionsModule.tsx`: Shows columns: Phlebotomist, Samples, Total Collected, Cash, UPI, Credit, Pending. No Deposit Status column, no status update UI.
- `SuperAdminDashboardPage.tsx`: Shows 9 metric cards and revenue/samples chart. No settlement alert card.
- `TestManagementPage.tsx`: Shows test table with Lab Cost and Commission % columns. No Profit column. Commission stored as percentage.
- `RevenueSettlementsPage.tsx`: Has 4 tabs — Daily Overview, Hospital Ledger, Phlebotomist, Settlements. Tab navigation uses `activeTab` state.
- Sample detail views exist in phlebotomist panel. No delivery method tracking stored on sample records.
- `SuperAdminSettingsPage.tsx`: Contains User Management with Lab Admins and Phlebotomists sections. Phlebotomist management lacks "Reset Device" action.

## Requested Changes (Diff)

### Add
- **Audit Logs**: Phlebotomist dropdown filter, Hospital dropdown filter, Action Type dropdown filter, Download CSV button
- **Phlebotomist Collections table**: Deposit Status column with 3 states (Not Submitted=red, Partially Submitted=amber, Submitted=green); Super Admin can update status; store `updatedBy` and `updatedAt` per row
- **Dashboard**: Persistent settlement alert card showing count of phlebotomists with Deposit Status = Not Submitted; clicking navigates to Revenue & Settlements → phlebotomist tab
- **Test Management**: Profit column calculated as `MRP - Lab Cost - Commission` (Commission as flat ₹ value); green if positive, red if negative
- **Sample detail view**: Delivery Method field (WhatsApp / Email / App Download) stored as `sample.deliveryMethod` on the sample record in demo storage
- **Phlebotomist Management (Settings)**: Reset Device action per phlebotomist (clears device binding, forces re-login)
- **Page header icons**: Add emoji/icon to Dashboard, Hospital Management, Test Management, Revenue & Settlements, Audit Logs, Lab Admins page headers

### Modify
- `AuditLogsPage.tsx`: Add phlebotomist, hospital, and action type dropdown filters alongside existing search/date filters; add Download CSV button
- `PhlebotomistCollectionsModule.tsx`: Add Deposit Status column with color-coded badge; add inline dropdown to update status; persist `depositStatus`, `updatedBy`, `updatedAt` per phlebotomist in demo storage
- `SuperAdminDashboardPage.tsx`: Add amber alert card above metric cards; reads deposit status from demo storage to count unsubmitted phlebotomists
- `TestManagementPage.tsx`: Add Profit column; treat stored commission as flat ₹ (fall back to computing from % if only % stored); color-code green/red
- Sample detail components: Add Delivery Method selector that saves to sample record
- `SuperAdminSettingsPage.tsx`: Add Reset Device button in phlebotomist list; clears device ID in demo storage

### Remove
- Nothing removed

## Implementation Plan

1. **demoStorage utils**: Add `depositStatus`, `updatedBy`, `updatedAt` fields to phlebotomist collection records; add `deliveryMethod` field to sample records; add `deviceId` field to phlebotomist records for device reset.

2. **AuditLogsPage.tsx**: 
   - Derive unique phlebotomist IDs, hospital IDs, and action types from log data for dropdown options
   - Add three `<select>` dropdowns (Phlebotomist, Hospital, Action Type) to filter section
   - Wire dropdowns to filter the log entries
   - Add Download CSV button that exports filtered rows as CSV file download

3. **PhlebotomistCollectionsModule.tsx**:
   - Add Deposit Status column with colored badge pill
   - Add inline `<select>` per row to update status (Not Submitted / Partially Submitted / Submitted)
   - Persist status updates to demo storage with `updatedBy: 'Super Admin'` and `updatedAt: Date.now()`
   - Show `updatedAt` timestamp below status badge

4. **SuperAdminDashboardPage.tsx**:
   - Read phlebotomist collection deposit statuses from demo storage
   - Count phlebotomists with status = Not Submitted
   - Render persistent amber alert card if count > 0: "⚠ X phlebotomists have not submitted today's collections"
   - Card onClick sets Revenue tab active (via `onNavigate` prop or tab state)

5. **TestManagementPage.tsx**:
   - Add Profit column after existing columns
   - Formula: `profit = mrp - labCost - commission` where commission is treated as flat ₹ (use `doctorCommission` field directly as ₹ amount)
   - Green text if profit > 0, red if ≤ 0

6. **Sample detail views** (phlebotomist MySamples / sample detail):
   - Add Delivery Method section showing 3 pill options: WhatsApp, Email, App Download
   - On select, save `deliveryMethod` to the sample record in demo storage
   - Show currently selected method highlighted

7. **SuperAdminSettingsPage.tsx** (Phlebotomist section):
   - Add Reset Device button per phlebotomist row
   - On click, show confirmation; on confirm, clear `deviceId` field in demo storage for that phlebotomist
   - Show success toast: "Device reset. Phlebotomist will need to log in again."

8. **Page header icons**: Add emoji icons to page section headers for Dashboard (📊), Hospital Management (🏥), Test Management (🧪), Revenue & Settlements (💰), Audit Logs (🛡), Lab Admins (👥)
