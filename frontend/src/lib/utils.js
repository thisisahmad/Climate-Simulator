import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

/** Display only: €, K€, M€ */
export function formatCurrency(value) {
    if (value == null || typeof value !== "number") return "–";
    const abs = Math.abs(value);
    if (abs >= 1e6) return (value / 1e6).toFixed(1).replace(/\.0$/, "") + " M€";
    if (abs >= 1e3) return (value / 1e3).toFixed(1).replace(/\.0$/, "") + " K€";
    return Math.round(value) + " €";
}

/** Display only: kWh, MWh */
export function formatEnergy(valueKwh) {
    if (valueKwh == null || typeof valueKwh !== "number") return "–";
    if (Math.abs(valueKwh) >= 1000) return (valueKwh / 1000).toFixed(2) + " MWh";
    return Math.round(valueKwh) + " kWh";
}

/** Display only: L, m³ */
export function formatWater(valueLiters) {
    if (valueLiters == null || typeof valueLiters !== "number") return "–";
    if (Math.abs(valueLiters) >= 1000) return (valueLiters / 1000).toFixed(2) + " m³";
    return Math.round(valueLiters) + " L";
}
