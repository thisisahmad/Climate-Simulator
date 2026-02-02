/**
 * SME Simulator - frontend-only (no backend).
 * Uses local calculateSme for GitHub Pages / static deployment.
 */

import { calculateSme } from "../simulator/index.js";

/**
 * Run SME simulation locally. Same response shape as former backend API.
 * @param {Object} inputs - SmeInputs (32 params)
 * @returns {Promise<Object>} SmeOutputs: { scores, heatmap, alerts, details, projections }
 */
export function calculateSmeImpact(inputs) {
  return Promise.resolve(calculateSme(inputs));
}
