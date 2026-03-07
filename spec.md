# XprtLab — Profit Dashboard Real Calculation

## Current State

- `TestOutput` and `TestInput` types do NOT include `labCost` or `doctorCommission` fields.
- `ProfitDashboardPage` uses hardcoded `generateDemoProfitData()` with fixed numbers; it does not read from actual test or sample data.
- `AddTestModal` and `EditTestModal` do not have Lab Cost or Doctor Commission fields.
- `demoStorage.ts` has no test master list — tests are only referenced by ID/name in sample records.
- There is no profit status indicator (green/yellow/red) in tables.
- There is no loss detection warning in the Add/Edit Test forms.

## Requested Changes (Diff)

### Add

- `TESTS` key to `demoStorage.ts` for a persistent test master list (with `labCost` and `doctorCommissionPct` fields).
- `getDemoTests()`, `saveDemoTests()`, `addDemoTest()`, `updateDemoTest()` helpers in `demoStorage.ts`.
- Lab Cost (₹) field to `AddTestModal` — numeric, optional (default 0).
- Doctor Commission (%) field to `AddTestModal` — numeric 0–100, optional (default 0).
- Real-time loss detection warning in both modals: if `(labCost + mrp * doctorCommissionPct / 100) > mrp`, show "Warning: This test will generate negative profit."
- Same two fields and warning logic to `EditTestModal`.
- `getProfitColor(profitPct: number)` utility: green ≥30%, yellow 10–29%, red <10%.
- Profit status indicator column / color coding in Test-wise Profit Table rows.
- Profit status indicator in Hospital Profit Breakdown rows.
- `computeRealProfitData(filter, tests, samples, hospitals)` pure function that derives all dashboard metrics from live demo data.
- `ProfitDashboardPage` now uses `computeRealProfitData` when tests data is available, falling back to demo generator otherwise.

### Modify

- `demoStorage.ts`: add `TESTS` key, `DemoTestMaster` interface, seed 10 demo tests (each with `labCost` and `doctorCommissionPct`), export read/write helpers. Seed logic: only seed if key is empty.
- `AddTestModal`: add `labCost` and `doctorCommission` fields + live warning banner.
- `EditTestModal`: same fields + warning, pre-populated from test data.
- `TestManagementPage`: pass `labCost` / `doctorCommission` to modals and display columns in the table.
- `ProfitDashboardPage`: replace static demo generator with a computed version sourced from demo tests + samples. Use profit status color indicators on table rows. Highlight loss tests in red.

### Remove

- Nothing removed — existing UI layout of `ProfitDashboardPage` is preserved unchanged.

## Implementation Plan

1. Extend `demoStorage.ts`:
   - Add `TESTS` key.
   - Add `DemoTestMaster` interface: `{ id, testName, testCode, mrp, labCost, doctorCommissionPct, sampleType, isActive }`.
   - Seed 10 demo tests matching existing sample test codes (CBC, LFT, RBS, TSH, LIPID, HBA1C, KFT, etc.).
   - Export `getDemoTests()`, `saveDemoTests()`, `addDemoTest()`, `updateDemoTest()` helpers.

2. Update `AddTestModal`:
   - Add `labCost: number` (default 0) and `doctorCommission: number` 0–100 (default 0) to form values.
   - Watch all three numeric fields; compute `commissionAmt = mrp * doctorCommission / 100`, `totalExpense = labCost + commissionAmt`, `profitPerTest = mrp - totalExpense`.
   - Show warning banner when `profitPerTest < 0`.
   - When saving in demo mode, also persist to `demoStorage` tests.

3. Update `EditTestModal`:
   - Same two fields, same live warning logic.
   - Pre-populate from test record's `labCost` / `doctorCommission` (if available in the object; use 0 default).

4. Add profit utility function in `src/utils/profitUtils.ts`:
   - `getProfitStatusColor(profitPct: number): 'green' | 'yellow' | 'red'`
   - `computeProfitPerTest(mrp, labCost, doctorCommissionPct): number`
   - `computeRealProfitData(filter, tests, samples, hospitals): DemoProfitData`

5. Update `ProfitDashboardPage`:
   - Import demo tests and samples from `demoStorage`.
   - Use `computeRealProfitData` to drive dashboard metrics.
   - Add profit status color dot/badge to each row in Test-wise and Hospital tables.
   - Highlight negative-profit rows with a red tint.

6. Update `TestManagementPage`:
   - Show Lab Cost and Doctor Commission columns for superAdmin.
   - Rows with negative profit highlighted in red.
