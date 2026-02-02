/**
 * Yearly projections: Scenario A (Traditional) vs Scenario B (Sustainable).
 * Matches backend/sme_simulator.py _calculate_projections exactly.
 * METRICS_DOCUMENTATION.md §1 Revenue, §2 OPEX, §3 Profit.
 */

/**
 * @param {Object} i - SmeInputs (same shape as backend models.SmeInputs)
 * @returns {Array<{year: number, revenue_a: number, revenue_b: number, opex_a: number, opex_b: number, profit_a: number, profit_b: number, savings: number, cumulative_investment: number}>}
 */
export function calculateProjections(i) {
  const projections = [];
  let revA = i.initial_revenue;
  let revB = i.initial_revenue;
  let cumInvB = i.initial_capex + i.sustainability_capex;
  const depreciation =
    i.depreciation_years > 0 ? i.sustainability_capex / i.depreciation_years : 0;

  for (let t = 1; t <= i.forecast_horizon; t++) {
    const growthA = i.revenue_growth_rate + i.inflation_rate + 0.01;
    const growthB =
      i.revenue_growth_rate + i.reputation_uplift_pct + i.green_market_access_pct;

    revA = revA * (1 + growthA);
    revB = revB * (1 + growthB);

    const opexA = revA * i.variable_costs_pct + i.fixed_costs;
    const opexB = revB * i.variable_costs_pct + i.fixed_costs;

    const totalSavingPct =
      i.energy_efficiency_pct +
      i.resource_efficiency_pct +
      i.waste_reduction_pct +
      i.circular_economy_pct;
    const savings = totalSavingPct * opexB;

    const annualReinvest = revB * i.reinvest_pct;
    cumInvB += annualReinvest;

    const ebitA = revA - opexA;
    const taxA = Math.max(0, ebitA * i.tax_rate);
    const profitA = ebitA - taxA;

    const ebitdaB = revB - opexB + savings;
    const ebitB =
      ebitdaB - (t <= i.depreciation_years ? depreciation : 0);
    const taxB = Math.max(0, ebitB * i.tax_rate);
    const profitB = ebitB - taxB;

    projections.push({
      year: t,
      revenue_a: Math.round(revA),
      revenue_b: Math.round(revB),
      opex_a: Math.round(opexA),
      opex_b: Math.round(opexB),
      profit_a: Math.round(profitA),
      profit_b: Math.round(profitB),
      savings: Math.round(savings),
      cumulative_investment: Math.round(cumInvB),
    });
  }

  return projections;
}
