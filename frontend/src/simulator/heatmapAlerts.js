/**
 * Impact matrix (3x3) and system alerts.
 * Matches backend/sme_simulator.py _calculate_heatmap and _generate_alerts.
 */

function getColor(val, invert = false) {
  if (invert) {
    if (val < 33) return "green";
    if (val < 66) return "yellow";
    return "red";
  }
  if (val < 33) return "red";
  if (val < 66) return "yellow";
  return "green";
}

function executionRisk(i) {
  return (i.sustainability_capex / (i.initial_revenue || 1)) * 50;
}

/**
 * @param {Object} i - SmeInputs
 * @param {number} econ - economic score
 * @param {number} env - environmental score
 * @param {number} strat - strategic score
 * @returns {Array<{row: string, col: string, value: number, color: string}>}
 */
export function calculateHeatmap(i, econ, env, strat) {
  const cells = [];
  cells.push({
    row: "Economic",
    col: "Upside",
    value: Math.round(econ),
    color: getColor(econ),
  });
  cells.push({
    row: "Economic",
    col: "Risk",
    value: Math.round(i.sustainability_capex / 10000),
    color: getColor(i.sustainability_capex / 10000, true),
  });
  cells.push({
    row: "Economic",
    col: "Feasibility",
    value: Math.round(75 - i.disruption_impact / 4),
    color: getColor(75 - i.disruption_impact / 4),
  });
  cells.push({
    row: "Environmental",
    col: "Upside",
    value: Math.round(env),
    color: getColor(env),
  });
  cells.push({
    row: "Environmental",
    col: "Risk",
    value: Math.round(100 - i.carbon_reduction_potential),
    color: getColor(100 - i.carbon_reduction_potential, true),
  });
  cells.push({
    row: "Environmental",
    col: "Feasibility",
    value: Math.round(80 - i.scope_3_reduction / 5),
    color: getColor(80 - i.scope_3_reduction / 5),
  });
  cells.push({
    row: "Strategic",
    col: "Upside",
    value: Math.round(strat),
    color: getColor(strat),
  });
  cells.push({
    row: "Strategic",
    col: "Risk",
    value: Math.round(i.disruption_impact),
    color: getColor(i.disruption_impact, true),
  });
  cells.push({
    row: "Strategic",
    col: "Feasibility",
    value: Math.round(90 - executionRisk(i)),
    color: getColor(90 - executionRisk(i)),
  });
  return cells;
}

/**
 * @param {Object} i - SmeInputs
 * @param {Array} projections
 * @param {number} econ
 * @param {number} env
 * @param {number} strat
 * @returns {Array<{message: string, severity: string}>}
 */
export function generateAlerts(i, projections, econ, env, strat) {
  const alerts = [];
  const last = projections[projections.length - 1];
  if (!last) return alerts;

  if (econ > 70 && env < 40) {
    alerts.push({
      message:
        "Greenwashing Risk: High economic projection with low environmental impact scores.",
      severity: "high",
    });
  }
  if (env > 70 && econ < 40) {
    alerts.push({
      message:
        "Financial Risk: Strong environmental results but weak economic sustainability.",
      severity: "high",
    });
  }
  if (econ > 70 && env < 40) {
    alerts.push({
      message:
        "Strategic Risk: High economic growth without corresponding environmental transformation.",
      severity: "medium",
    });
  }
  if (econ > 70 && i.sustainability_capex > i.initial_revenue * 0.5) {
    alerts.push({
      message:
        "Execution Risk: High complexity and investment relative to current sales.",
      severity: "medium",
    });
  }
  if (last.profit_b < last.profit_a) {
    alerts.push({
      message:
        "Long-term Profitability Alert: Scenario B annual profit remains below Scenario A.",
      severity: "medium",
    });
  }
  return alerts;
}
