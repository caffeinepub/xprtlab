function computeProfitPerTest(mrp, labCost, doctorCommissionPct) {
  const commissionAmt = mrp * (doctorCommissionPct / 100);
  return mrp - labCost - commissionAmt;
}
function getProfitStatusColor(mrp, profitPerTest) {
  if (mrp <= 0) return "red";
  const pct = profitPerTest / mrp * 100;
  if (pct >= 30) return "green";
  if (pct >= 10) return "yellow";
  return "red";
}
export {
  computeProfitPerTest as c,
  getProfitStatusColor as g
};
