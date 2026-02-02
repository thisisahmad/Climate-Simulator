/**
 * Top-level scores (Economic, Environmental, Strategic, Overall).
 * Matches backend/sme_simulator.py score calculations.
 * METRICS_DOCUMENTATION.md §8.
 */

function clamp(val) {
  return Math.max(0, Math.min(100, val));
}

/**
 * @param {Object} i - SmeInputs
 * @param {Array} projections - from calculateProjections(i)
 * @returns {{ economic: number, environmental: number, strategic: number, overall: number }}
 */
export function calculateScores(i, projections) {
  const totalProfitB = projections.reduce((s, p) => s + p.profit_b, 0);
  const totalSavings = projections.reduce((s, p) => s + p.savings, 0);
  const totalInv =
    i.initial_capex +
    i.sustainability_capex +
    projections.reduce((s, p) => s + p.revenue_b, 0) * i.reinvest_pct;
  const roi = totalInv > 0 ? (totalProfitB + totalSavings) / totalInv : 0;
  const econScore = clamp(Math.round(50 + roi * 20));

  const efficiencyContrib =
    (i.energy_efficiency_pct +
      i.resource_efficiency_pct +
      i.waste_reduction_pct +
      i.circular_economy_pct) *
    25;
  const scopeContrib =
    (i.scope_1_reduction + i.scope_2_reduction + i.scope_3_reduction) / 3;
  const carbonContrib = i.carbon_reduction_potential;
  const envScore = clamp(
    Math.round(
      efficiencyContrib * 0.2 + scopeContrib * 0.4 + carbonContrib * 0.4
    )
  );

  const stratScore = clamp(
    Math.round(
      (i.reputation_uplift_pct * 3 +
        i.productivity_gain_pct * 3 +
        i.turnover_reduction_pct * 2 +
        i.green_market_access_pct * 2 +
        i.disruption_impact / 100) *
        10
    )
  );

  const overallScore = Math.round(
    econScore * 0.4 + envScore * 0.3 + stratScore * 0.3
  );

  return {
    economic: econScore,
    environmental: envScore,
    strategic: stratScore,
    overall: overallScore,
  };
}
