/**
 * SME Resilience Simulator - Frontend-only entry.
 * Same output shape as backend SmeOutputs (scores, heatmap, alerts, details, projections).
 * METRICS_DOCUMENTATION.md is the source of truth for formulas.
 */

import { calculateProjections } from "./projections.js";
import { calculateScores } from "./scores.js";
import { calculateHeatmap, generateAlerts } from "./heatmapAlerts.js";
import { calculateDetails } from "./indicators.js";
import { computeKeyDrivers } from "./keyDrivers.js";

/** Default SmeInputs (match backend models.py) */
const DEFAULT_INPUTS = {
  industry: "Manufacturing",
  company_size: "SME",
  region: "EU",
  forecast_horizon: 7,
  initial_revenue: 1000000,
  num_employees: 50,
  fixed_costs: 200000,
  variable_costs_pct: 0.4,
  initial_capex: 50000,
  operating_margin_pct: 0.15,
  revenue_growth_rate: 0.05,
  employee_growth_rate: 0.02,
  sustainability_capex: 100000,
  reinvest_pct: 0.01,
  energy_efficiency_pct: 0.15,
  resource_efficiency_pct: 0.08,
  waste_reduction_pct: 0.1,
  circular_economy_pct: 0.05,
  reputation_uplift_pct: 0.03,
  green_market_access_pct: 0.05,
  turnover_reduction_pct: 0.2,
  productivity_gain_pct: 0.1,
  gov_subsidies: 15000,
  disruption_impact: 20,
  carbon_reduction_potential: 25,
  scope_1_reduction: 25,
  scope_2_reduction: 25,
  scope_3_reduction: 20,
  tax_rate: 0.25,
  discount_rate: 0.08,
  inflation_rate: 0.02,
  depreciation_years: 5,
  wacc: 0.07,
};

/**
 * Merge user inputs with defaults (backend would use Pydantic defaults).
 * @param {Object} inputs - partial or full SmeInputs from UI
 * @returns {Object} full SmeInputs
 */
function withDefaults(inputs) {
  return { ...DEFAULT_INPUTS, ...inputs };
}

/**
 * Run full SME simulation. Same API as backend POST /api/sme/calculate.
 * @param {Object} inputs - SmeInputs (32 params, same keys as backend)
 * @returns {Object} SmeOutputs: { scores, heatmap, alerts, details, projections }
 */
export function calculateSme(inputs) {
  const i = withDefaults(inputs);
  const projections = calculateProjections(i);
  const scores = calculateScores(i, projections);
  const { economic: econ, environmental: env, strategic: strat } = scores;
  const heatmap = calculateHeatmap(i, econ, env, strat);
  const alerts = generateAlerts(i, projections, econ, env, strat);
  const details = calculateDetails(i, projections, econ, env, strat);

  const key_drivers = computeKeyDrivers(i, {
    scores: { economic: scores.economic, environmental: scores.environmental, strategic: scores.strategic, overall: scores.overall },
    details,
    projections,
  });

  return {
    scores: {
      economic: scores.economic,
      environmental: scores.environmental,
      strategic: scores.strategic,
      overall: scores.overall,
    },
    heatmap,
    alerts,
    details,
    projections,
    key_drivers,
  };
}
