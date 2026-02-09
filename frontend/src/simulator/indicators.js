/**
 * Deep indicators: payback, IRR, NPV, TCO, carbon, efficiency, ESG.
 * ROI and NPV use INCREMENTAL only: (Profit_B - Profit_A), no separate savings (savings are already in Profit_B).
 * Total_Incremental_Investment = all B-vs-A investment (sustainability_capex + cumulative reinvest).
 */

function clamp(val) {
  return Math.max(0, Math.min(100, val));
}

/** Total incremental investment (B vs A): sustainability CAPEX + all reinvest over horizon. */
function getTotalIncrementalInvestment(i, projections) {
  if (!projections.length) return i.sustainability_capex;
  const last = projections[projections.length - 1];
  return Math.max(0, (last.cumulative_investment || 0) - (i.initial_capex || 0));
}

function calculatePayback(i, projections) {
  const totalInv = getTotalIncrementalInvestment(i, projections);
  if (totalInv <= 0) return 0;
  let cumGain = 0;
  for (const p of projections) {
    cumGain += p.profit_b - p.profit_a;
    if (cumGain >= totalInv) return p.year;
  }
  return i.forecast_horizon + 1;
}

function calculateDiscountedPayback(i, projections) {
  const totalInv = getTotalIncrementalInvestment(i, projections);
  if (totalInv <= 0) return 0;
  let cumDcf = 0;
  for (let t = 0; t < projections.length; t++) {
    const p = projections[t];
    const dcf = (p.profit_b - p.profit_a) / Math.pow(1 + i.discount_rate, t + 1);
    cumDcf += dcf;
    if (cumDcf >= totalInv) return p.year;
  }
  return i.forecast_horizon + 1;
}

function calculateBreakEven(projections) {
  for (const p of projections) {
    if (p.profit_b > p.profit_a) return p.year;
  }
  return projections.length ? projections[projections.length - 1].year + 1 : 0;
}

/**
 * IRR by bisection: NPV(r) = -Total_Incremental_Investment + Σ (Profit_B - Profit_A)/(1+r)^t = 0.
 * Returns rate as percentage (e.g. 25 for 25%).
 */
function calculateIRR(i, projections) {
  const totalInv = getTotalIncrementalInvestment(i, projections);
  function npv(r) {
    let s = 0;
    for (let t = 0; t < projections.length; t++) {
      const p = projections[t];
      s += (p.profit_b - p.profit_a) / Math.pow(1 + r, t + 1);
    }
    return -totalInv + s;
  }
  let low = 0;
  let high = 2;
  for (let iter = 0; iter < 50; iter++) {
    const mid = (low + high) / 2;
    if (npv(mid) >= 0) low = mid;
    else high = mid;
  }
  return ((low + high) / 2) * 100;
}

/**
 * @param {Object} i - SmeInputs
 * @param {Array} projections
 * @param {number} econScore
 * @param {number} envScore
 * @param {number} stratScore
 * @returns {Object} - SmeDeepIndicators (19 fields, same keys as backend)
 */
export function calculateDetails(i, projections, econScore, envScore, stratScore) {
  const totalRevenueB = projections.reduce((s, p) => s + p.revenue_b, 0);
  const totalOpexB = projections.reduce((s, p) => s + p.opex_b, 0);
  const totalIncrementalInv = getTotalIncrementalInvestment(i, projections);
  const cumulativeIncrementalProfit = projections.reduce(
    (s, p) => s + (p.profit_b - p.profit_a),
    0
  );
  const roiPct =
    totalIncrementalInv > 0
      ? (cumulativeIncrementalProfit / totalIncrementalInv) * 100
      : 0;

  let npv = -totalIncrementalInv;
  for (let t = 0; t < projections.length; t++) {
    const p = projections[t];
    npv += (p.profit_b - p.profit_a) / Math.pow(1 + i.discount_rate, t + 1);
  }

  const totalSavings = projections.reduce((s, p) => s + p.savings, 0);
  const carbonReductionTons = totalSavings * 0.05 + i.carbon_reduction_potential * 10;
  const cumReinvest = totalRevenueB * i.reinvest_pct;
  const tco = i.initial_capex + i.sustainability_capex + totalOpexB + cumReinvest;

  const execRiskPct = clamp((i.sustainability_capex / (i.initial_revenue || 1)) * 100);
  const socialScore =
    (i.reputation_uplift_pct * 0.5 +
      i.productivity_gain_pct * 0.3 +
      i.turnover_reduction_pct * 0.2) *
    100;
  const governanceScore = 100 - execRiskPct;
  const esgScore =
    envScore * 0.4 + socialScore * 0.3 + governanceScore * 0.3;
  const employeeEngagement =
    (i.productivity_gain_pct * 0.4 +
      i.turnover_reduction_pct * 0.3 +
      i.reputation_uplift_pct * 0.3) *
    100;

  const wasteDiversion = Math.min(
    100,
    i.waste_reduction_pct * 100 + i.circular_economy_pct * 30
  );
  const resEffIndex =
    (i.energy_efficiency_pct * 0.3 +
      i.resource_efficiency_pct * 0.3 +
      i.waste_reduction_pct * 0.2 +
      i.circular_economy_pct * 0.2) *
    100;
  const energySavingsKwh =
    0.15 !== 0 ? (totalOpexB * i.energy_efficiency_pct * 0.2) / 0.15 : 0;
  const energySavingsMwh = energySavingsKwh / 1000;
  const waterSavingsL = totalRevenueB * i.resource_efficiency_pct;
  const waterSavingsKl = waterSavingsL / 1000;

  const financialViability = clamp(
    Math.round(50 + (npv / (totalIncrementalInv || 1)) * 50)
  );
  const costPerTonCo2 =
    carbonReductionTons > 0
      ? Math.round(i.sustainability_capex / carbonReductionTons)
      : 0;
  // Carbon Intensity: kg CO2e per €1,000 revenue. Carbon in tons → *1000 for kg; revenue in € → /1000 for €1k.
  const carbonIntensityKgPer1kRevenue =
    totalRevenueB > 0
      ? (carbonReductionTons * 1000) / (totalRevenueB / 1000)
      : 0;

  const executionRiskFactor =
    execRiskPct >= 50 ? "High" : execRiskPct >= 20 ? "Medium" : "Low";

  return {
    npv,
    roi_percent: Math.round(roiPct * 10) / 10,
    irr_percent: Math.round(calculateIRR(i, projections) * 10) / 10,
    payback_years: Math.round(calculatePayback(i, projections) * 10) / 10,
    discounted_payback_years:
      Math.round(calculateDiscountedPayback(i, projections) * 10) / 10,
    break_even_year: Math.round(calculateBreakEven(projections) * 10) / 10,
    financial_viability: financialViability,
    tco_k: Math.round((tco / 1000) * 10) / 10,
    carbon_reduction_tons: Math.round(carbonReductionTons * 10) / 10,
    cost_per_ton_co2: costPerTonCo2,
    carbon_intensity_kg_per_1k_revenue: Math.round(carbonIntensityKgPer1kRevenue * 10) / 10,
    net_zero_progress: Math.round(envScore * 10) / 10,
    energy_savings_mwh: Math.round(energySavingsMwh * 100) / 100,
    water_savings_kl: Math.round(waterSavingsKl * 10) / 10,
    waste_diversion_index: Math.round(wasteDiversion * 10) / 10,
    resource_efficiency_index: Math.round(resEffIndex * 10) / 10,
    esg_score: Math.round(clamp(esgScore) * 10) / 10,
    resilience_index: Math.round(stratScore * 10) / 10,
    employee_engagement: Math.round(clamp(employeeEngagement) * 10) / 10,
    execution_risk_factor: executionRiskFactor,
  };
}
