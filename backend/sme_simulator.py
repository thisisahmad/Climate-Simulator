from typing import Dict, List, Any
import numpy as np
from .models import SmeInputs, SmeOutputs, Alert, SmeScore, HeatmapCell, SmeDeepIndicators, YearlyProjection

class SmeSimulator:
    """
    SME Resilience Simulator - Financial Version
    Implements Scenario A (Traditional) vs Scenario B (Sustainable)
    """

    def calculate(self, i: SmeInputs) -> SmeOutputs:
        projections = self._calculate_projections(i)
        
        # Calculate scores based on the final year or cumulative metrics
        # Final Year Metrics
        last = projections[-1]
        
        # Economic Score: Based on Cumulative ROI and NPV
        total_inv = i.initial_capex + i.sustainability_capex + (sum(p.revenue_b for p in projections) * i.reinvest_pct)
        total_profit_b = sum(p.profit_b for p in projections)
        total_savings = sum(p.savings for p in projections)
        
        # ROI = (Cumulative Net Profit + Cumulative Savings) / Cumulative Investment
        roi = (total_profit_b + total_savings) / total_inv if total_inv > 0 else 0
        
        # NPV Calculation (Simplified)
        npv = -i.sustainability_capex
        for t, p in enumerate(projections):
            # Cash flow B - Cash flow A (Incremental profit)
            incremental_cf = (p.profit_b + p.savings) - p.profit_a
            npv += incremental_cf / ((1 + i.discount_rate) ** (t + 1))

        econ_score = self._clamp(round(50 + (roi * 20)))
        
        # Environmental Score: Based on efficiency gains AND mandatory Scope reduction potentials
        # Increased sensitivity to make UI changes more apparent
        efficiency_contrib = (i.energy_efficiency_pct + i.resource_efficiency_pct + i.waste_reduction_pct + i.circular_economy_pct) * 25
        scope_contrib = (i.scope_1_reduction + i.scope_2_reduction + i.scope_3_reduction) / 3
        carbon_contrib = i.carbon_reduction_potential
        
        # New weights: 20% Efficiency, 40% Scope, 40% Carbon (emphasize mandatory docx requirements)
        env_score = self._clamp(round(efficiency_contrib * 0.2 + scope_contrib * 0.4 + carbon_contrib * 0.4))
        
        # Strategic Score: Based on productivity, reputation, and disruption resilience
        strat_score = self._clamp(
            round((i.reputation_uplift_pct * 3 + 
             i.productivity_gain_pct * 3 + 
             i.turnover_reduction_pct * 2 + 
             i.green_market_access_pct * 2 + 
             (i.disruption_impact / 100)) * 10)
        )
        
        overall_score = round(econ_score * 0.4 + env_score * 0.3 + strat_score * 0.3)

        heatmap = self._calculate_heatmap(i, projections, econ_score, env_score, strat_score)
        alerts = self._generate_alerts(i, projections, econ_score, env_score, strat_score)

        # Total investment = Initial CAPEX + Sustainability CAPEX + Cumulative Reinvestments (METRICS_DOC)
        total_inv = i.initial_capex + i.sustainability_capex + sum(p.revenue_b for p in projections) * i.reinvest_pct
        roi_pct = (total_profit_b + total_savings) / total_inv * 100 if total_inv > 0 else 0

        carbon_reduction = (total_savings * 0.05) + (i.carbon_reduction_potential * 10)
        total_revenue_b = sum(p.revenue_b for p in projections)
        total_opex_b = sum(p.opex_b for p in projections)
        cum_reinvest = sum(p.revenue_b for p in projections) * i.reinvest_pct
        tco = i.initial_capex + i.sustainability_capex + total_opex_b + cum_reinvest

        exec_risk_pct = self._clamp((i.sustainability_capex / (i.initial_revenue or 1)) * 100)
        social_score = (i.reputation_uplift_pct * 0.5 + i.productivity_gain_pct * 0.3 + i.turnover_reduction_pct * 0.2) * 100
        governance_score = 100 - exec_risk_pct
        esg_score = env_score * 0.4 + social_score * 0.3 + governance_score * 0.3
        employee_engagement = (i.productivity_gain_pct * 0.4 + i.turnover_reduction_pct * 0.3 + i.reputation_uplift_pct * 0.3) * 100

        waste_diversion = min(100.0, (i.waste_reduction_pct * 100) + (i.circular_economy_pct * 30))
        res_eff_index = (i.energy_efficiency_pct * 0.30 + i.resource_efficiency_pct * 0.30 + i.waste_reduction_pct * 0.20 + i.circular_economy_pct * 0.20) * 100
        energy_savings_kwh = (total_opex_b * i.energy_efficiency_pct * 0.20) / 0.15 if 0.15 != 0 else 0
        energy_savings_mwh = energy_savings_kwh / 1000.0
        water_savings_l = total_revenue_b * i.resource_efficiency_pct
        water_savings_kl = water_savings_l / 1000.0

        details = SmeDeepIndicators(
            roi_percent=round(roi_pct, 1),
            irr_percent=round(self._calculate_irr(i, projections), 1),
            payback_years=round(self._calculate_payback(i, projections), 1),
            discounted_payback_years=round(self._calculate_discounted_payback(i, projections), 1),
            break_even_year=round(self._calculate_break_even(projections), 1),
            financial_viability=self._clamp(round(50 + (npv / (i.sustainability_capex or 1)) * 50)),
            tco_k=round(tco / 1000.0, 1),
            carbon_reduction_tons=round(carbon_reduction, 1),
            cost_per_ton_co2=round(i.sustainability_capex / carbon_reduction, 0) if carbon_reduction > 0 else 0.0,
            carbon_intensity_index=round((carbon_reduction / total_revenue_b) * 1000, 1) if total_revenue_b > 0 else 0.0,
            net_zero_progress=round(env_score, 1),
            energy_savings_mwh=round(energy_savings_mwh, 2),
            water_savings_kl=round(water_savings_kl, 1),
            waste_diversion_index=round(waste_diversion, 1),
            resource_efficiency_index=round(res_eff_index, 1),
            esg_score=round(self._clamp(esg_score), 1),
            resilience_index=round(strat_score, 1),
            employee_engagement=round(self._clamp(employee_engagement), 1),
            execution_risk_factor="High" if exec_risk_pct >= 50 else ("Medium" if exec_risk_pct >= 20 else "Low"),
        )

        return SmeOutputs(
            scores=SmeScore(
                economic=float(econ_score),
                environmental=float(env_score),
                strategic=float(strat_score),
                overall=float(overall_score)
            ),
            heatmap=heatmap,
            alerts=alerts,
            details=details,
            projections=projections
        )

    def _calculate_projections(self, i: SmeInputs) -> List[YearlyProjection]:
        projections = []
        
        rev_a = i.initial_revenue
        rev_b = i.initial_revenue
        cum_inv_b = i.initial_capex + i.sustainability_capex
        
        depreciation = i.sustainability_capex / i.depreciation_years if i.depreciation_years > 0 else 0
        
        for t in range(1, i.forecast_horizon + 1):
            # Growth rates (METRICS_DOC: A = growth + inflation + 0.01; B = growth + reputation + green market)
            growth_a = i.revenue_growth_rate + i.inflation_rate + 0.01
            growth_b = i.revenue_growth_rate + i.reputation_uplift_pct + i.green_market_access_pct
            
            rev_a = rev_a * (1 + growth_a)
            rev_b = rev_b * (1 + growth_b)
            
            # OPEX
            opex_a = rev_a * i.variable_costs_pct + i.fixed_costs
            opex_b = rev_b * i.variable_costs_pct + i.fixed_costs
            
            # Savings (Scenario B)
            total_saving_pct = (i.energy_efficiency_pct + i.resource_efficiency_pct + 
                                i.waste_reduction_pct + i.circular_economy_pct)
            savings = total_saving_pct * opex_b
            
            # Annual Reinvestment
            annual_reinvest = rev_b * i.reinvest_pct
            cum_inv_b += annual_reinvest
            
            # Profit A
            ebit_a = rev_a - opex_a
            tax_a = max(0, ebit_a * i.tax_rate)
            profit_a = ebit_a - tax_a
            
            # Profit B
            ebitda_b = rev_b - opex_b + savings
            ebit_b = ebitda_b - (depreciation if t <= i.depreciation_years else 0)
            tax_b = max(0, ebit_b * i.tax_rate)
            profit_b = ebit_b - tax_b
            
            projections.append(YearlyProjection(
                year=t,
                revenue_a=round(rev_a),
                revenue_b=round(rev_b),
                opex_a=round(opex_a),
                opex_b=round(opex_b),
                profit_a=round(profit_a),
                profit_b=round(profit_b),
                savings=round(savings),
                cumulative_investment=round(cum_inv_b)
            ))
            
        return projections

    def _calculate_payback(self, i: SmeInputs, projections: List[YearlyProjection]) -> float:
        cum_gain = 0
        total_inv = i.sustainability_capex
        for p in projections:
            gain = (p.profit_b + p.savings) - p.profit_a
            cum_gain += gain
            if cum_gain >= total_inv:
                return float(p.year)
        return float(i.forecast_horizon + 1)

    def _calculate_discounted_payback(self, i: SmeInputs, projections: List[YearlyProjection]) -> float:
        cum_dcf = 0.0
        inv = i.sustainability_capex
        for t, p in enumerate(projections):
            dcf = ((p.profit_b + p.savings) - p.profit_a) / ((1 + i.discount_rate) ** (t + 1))
            cum_dcf += dcf
            if cum_dcf >= inv:
                return float(p.year)
        return float(i.forecast_horizon + 1)

    def _calculate_break_even(self, projections: List[YearlyProjection]) -> float:
        for p in projections:
            if p.profit_b > p.profit_a:
                return float(p.year)
        return float(projections[-1].year + 1) if projections else 0.0

    def _calculate_irr(self, i: SmeInputs, projections: List[YearlyProjection]) -> float:
        inv = i.sustainability_capex
        def npv(r: float) -> float:
            s = 0.0
            for t, p in enumerate(projections):
                cf = (p.profit_b + p.savings) - p.profit_a
                s += cf / ((1 + r) ** (t + 1))
            return -inv + s
        low, high = 0.0, 2.0
        for _ in range(50):
            mid = (low + high) / 2
            if npv(mid) >= 0:
                low = mid
            else:
                high = mid
        return (low + high) / 2 * 100

    def _calculate_heatmap(self, i: SmeInputs, projections: List[YearlyProjection], econ: float, env: float, strat: float) -> List[HeatmapCell]:
        cells = []
        # Economic
        cells.append(HeatmapCell(row='Economic', col='Upside', value=round(econ), color=self._get_color(econ)))
        cells.append(HeatmapCell(row='Economic', col='Risk', value=round(i.sustainability_capex/10000), color=self._get_color(i.sustainability_capex/10000, invert=True)))
        cells.append(HeatmapCell(row='Economic', col='Feasibility', value=round(75 - i.disruption_impact/4), color=self._get_color(75 - i.disruption_impact/4)))
        
        # Environmental
        cells.append(HeatmapCell(row='Environmental', col='Upside', value=round(env), color=self._get_color(env)))
        cells.append(HeatmapCell(row='Environmental', col='Risk', value=round(100 - i.carbon_reduction_potential), color=self._get_color(100 - i.carbon_reduction_potential, invert=True)))
        cells.append(HeatmapCell(row='Environmental', col='Feasibility', value=round(80 - i.scope_3_reduction/5), color=self._get_color(80 - i.scope_3_reduction/5)))

        # Strategic
        cells.append(HeatmapCell(row='Strategic', col='Upside', value=round(strat), color=self._get_color(strat)))
        cells.append(HeatmapCell(row='Strategic', col='Risk', value=round(i.disruption_impact), color=self._get_color(i.disruption_impact, invert=True)))
        cells.append(HeatmapCell(row='Strategic', col='Feasibility', value=round(90 - self.execution_risk(i)), color=self._get_color(90 - self.execution_risk(i))))
        
        return cells

    def execution_risk(self, i: SmeInputs) -> float:
        return (i.sustainability_capex / (i.initial_revenue or 1)) * 50

    def _generate_alerts(self, i: SmeInputs, projections: List[YearlyProjection], econ: float, env: float, strat: float) -> List[Alert]:
        alerts = []
        last = projections[-1]
        
        # trade-off alerts from instructions (1).docx
        if econ > 70 and env < 40:
            alerts.append(Alert(message="Greenwashing Risk: High economic projection with low environmental impact scores.", severity="high"))
        
        if env > 70 and econ < 40:
            alerts.append(Alert(message="Financial Risk: Strong environmental results but weak economic sustainability.", severity="high"))
            
        if econ > 70 and env < 40: # Note: repeated in docx but slightly different wording
             alerts.append(Alert(message="Strategic Risk: High economic growth without corresponding environmental transformation.", severity="medium"))

        if econ > 70 and i.sustainability_capex > i.initial_revenue * 0.5:
             alerts.append(Alert(message="Execution Risk: High complexity and investment relative to current revenue.", severity="medium"))

        # Original alerts
        if last.profit_b < last.profit_a:
            alerts.append(Alert(message="Long-term Profitability Alert: Scenario B annual profit remains below Scenario A.", severity="medium"))
            
        return alerts

    def _clamp(self, val: float) -> float:
        return max(0.0, min(100.0, val))

    def _get_color(self, val: float, invert: bool = False) -> str:
        if invert:
            if val < 33: return "green"
            if val < 66: return "yellow"
            return "red"
        else:
            if val < 33: return "red"
            if val < 66: return "yellow"
            return "green"
