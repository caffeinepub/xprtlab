# XprtLab

## Current State
The app has a Super Admin panel with a Dashboard, Test Management, Hospital Management, Revenue & Settlements, and other modules. The existing Dashboard shows revenue/samples/hospitals metrics and a revenue chart. There is no Profit Dashboard.

## Requested Changes (Diff)

### Add
- New `ProfitDashboardPage.tsx` in `src/pages/admin/` — separate from `SuperAdminDashboardPage`
- "Profit Dashboard" menu item in Super Admin bottom nav (alongside existing Dashboard, Bookings, Tests, Hospitals, Revenue)
- Route `profit-dashboard` in `StaffApp.tsx`

### Modify
- `StaffApp.tsx`: add lazy import for `ProfitDashboardPage`, add route case, add nav item for Super Admin

### Remove
- Nothing

## Implementation Plan

1. Create `ProfitDashboardPage.tsx` with:
   - Profit formula: MRP − (labCost + doctorCommission), defaults: labCost=40, doctorCommission=150 (per test, configurable via demo data)
   - Summary cards: Profit Today, Profit This Month, Avg Profit/Test, Most Profitable Test, Least Profitable Test, Total Profit
   - Line chart: Daily profit last 30 days
   - Hospital profit breakdown table: Hospital | Tests | Revenue | Commission | Profit
   - Test-wise profit table: Test Name | MRP | Lab Cost | Commission | Total Tests | Total Profit
   - Date range filters: Today, This Week, This Month, Custom
   - Demo mode: generate realistic demo data inline
   - Card UI matching existing SuperAdminDashboardPage style (premium-card, SummaryCard pattern)

2. Register route `profit-dashboard` in `StaffApp.tsx` renderPage switch

3. Add "Profit" nav item for superAdmin role pointing to `profit-dashboard`
