/**
 * Key drivers: sensitivity by nudging each major input +5%, ranking absolute impact, top 3.
 * Used for ROI, IRR, NPV, Payback, Break-even, ESG/Strategic Score.
 */

import { calculateProjections } from "./projections.js";
import { calculateScores } from "./scores.js";
import { calculateDetails } from "./indicators.js";

const NUDGE = 1.05;
const DRIVER_KEYS = [
  "sustainability_capex",
  "revenue_growth_rate",
  "energy_efficiency_pct",
  "reputation_uplift_pct",
  "green_market_access_pct",
  "productivity_gain_pct",
  "discount_rate",
  "variable_costs_pct",
  "reinvest_pct",
  "carbon_reduction_potential",
];
const DRIVER_LABELS = {
  sustainability_capex: "Sustainability CAPEX",
  revenue_growth_rate: "Sales growth",
  energy_efficiency_pct: "Energy efficiency",
  reputation_uplift_pct: "Reputation uplift",
  green_market_access_pct: "Green market access",
  productivity_gain_pct: "Productivity gain",
  discount_rate: "Discount rate",
  variable_costs_pct: "Variable costs",
  reinvest_pct: "Reinvest %",
  carbon_reduction_potential: "Carbon reduction",
};

function nudgeInput(inputs, key) {
  const v = inputs[key];
  if (v == null) return inputs;
  const out = { ...inputs };
  if (typeof v === "number") {
    out[key] = key === "discount_rate" || key.includes("_pct") ? Math.min(1, v * NUDGE) : Math.round(v * NUDGE);
  }
  return out;
}

/**
 * @param {Object} inputs - SmeInputs
 * @param {Object} outputs - current SmeOutputs (scores, details, projections)
 * @returns {Object} key_drivers: { roi: string[], irr: string[], npv: string[], payback_years: string[], break_even_year: string[], esg_score: string[] }
 */
export function computeKeyDrivers(inputs, outputs) {
  if (!inputs || !outputs?.details || !outputs?.projections) {
    return {
      roi: [],
      irr: [],
      npv: [],
      payback_years: [],
      break_even_year: [],
      esg_score: [],
    };
  }
  const baseDetails = outputs.details;
  const baseScores = outputs.scores;
  const metrics = [
    "roi_percent",
    "irr_percent",
    "payback_years",
    "break_even_year",
    "esg_score",
  ];
  const npvKey = "npv"; // we'll compute NPV in details - actually details doesn't return npv. So we need to compute npv in this loop. calculateDetails doesn't return npv. So we have to compute npv from projections and totalIncrementalInv. Let me check - we don't export npv from details. So for "npv" we need to compute it from the detailed logic or add it to details. I'll add npv to the details return in indicators.js so we can use it for key drivers. Let me check indicators - we compute npv but don't return it. I'll add npv to the return object of calculateDetails.
  const impacts = { roi_percent: {}, irr_percent: {}, npv: {}, payback_years: {}, break_even_year: {}, esg_score: {} };
  const baseNpv = baseDetails.npv ?? 0;

  for (const key of DRIVER_KEYS) {
    const nudged = nudgeInput(inputs, key);
    const proj = calculateProjections(nudged);
    const scores = calculateScores(nudged, proj);
    const details = calculateDetails(nudged, proj, scores.economic, scores.environmental, scores.strategic);
    const label = DRIVER_LABELS[key] || key;

    const dRoi = Math.abs((details.roi_percent ?? 0) - (baseDetails.roi_percent ?? 0));
    const dIrr = Math.abs((details.irr_percent ?? 0) - (baseDetails.irr_percent ?? 0));
    const dNpv = Math.abs((details.npv ?? 0) - baseNpv);
    const dPayback = Math.abs((details.payback_years ?? 0) - (baseDetails.payback_years ?? 0));
    const dBreakEven = Math.abs((details.break_even_year ?? 0) - (baseDetails.break_even_year ?? 0));
    const dEsg = Math.abs((details.esg_score ?? 0) - (baseDetails.esg_score ?? 0));

    if (dRoi > 0) impacts.roi_percent[label] = dRoi;
    if (dIrr > 0) impacts.irr_percent[label] = dIrr;
    if (dNpv > 0) impacts.npv[label] = dNpv;
    if (dPayback > 0) impacts.payback_years[label] = dPayback;
    if (dBreakEven > 0) impacts.break_even_year[label] = dBreakEven;
    if (dEsg > 0) impacts.esg_score[label] = dEsg;
  }

  const top3 = (obj) =>
    Object.entries(obj)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([name]) => name);

  return {
    roi: top3(impacts.roi_percent),
    irr: top3(impacts.irr_percent),
    npv: top3(impacts.npv),
    payback_years: top3(impacts.payback_years),
    break_even_year: top3(impacts.break_even_year),
    esg_score: top3(impacts.esg_score),
  };
}
