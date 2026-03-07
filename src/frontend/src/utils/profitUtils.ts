import type { DemoTestMaster } from "./demoStorage";

/**
 * Compute profit per test instance.
 * Profit = MRP − (Lab Cost + Doctor Commission Amount)
 */
export function computeProfitPerTest(
  mrp: number,
  labCost: number,
  doctorCommissionPct: number,
): number {
  const commissionAmt = mrp * (doctorCommissionPct / 100);
  return mrp - labCost - commissionAmt;
}

/**
 * Get profit status colour based on profit-to-MRP ratio.
 * Green  → profit ≥ 30% of MRP
 * Yellow → profit 10–29% of MRP
 * Red    → profit < 10% of MRP, or negative
 */
export function getProfitStatusColor(
  mrp: number,
  profitPerTest: number,
): "green" | "yellow" | "red" {
  if (mrp <= 0) return "red";
  const pct = (profitPerTest / mrp) * 100;
  if (pct >= 30) return "green";
  if (pct >= 10) return "yellow";
  return "red";
}

/**
 * Returns true when the test will generate a negative profit.
 */
export function isLossTest(
  mrp: number,
  labCost: number,
  doctorCommissionPct: number,
): boolean {
  return computeProfitPerTest(mrp, labCost, doctorCommissionPct) < 0;
}

// Re-export the type so callers can import from a single place when needed
export type { DemoTestMaster };
