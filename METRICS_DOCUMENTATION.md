# SME Resilience Simulator V2 - Complete Metrics Documentation

## Overview
This document provides a comprehensive list of all input parameters (Left Sidebar) and output calculations (Right Side Results) available in the SME Resilience Simulator V2.

---

## 📥 INPUT PARAMETERS (Left Sidebar)

### 1. Company Profile
| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| **Industry** | Dropdown | Business sector (Manufacturing, Services, Food, Logistics) | Manufacturing |
| **Horizon** | Dropdown | Forecast period in years | 7 Years |

### 2. Baseline Financials
| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| **Initial Sales** | Number (€) | Starting annual sales | €1,000,000 |
| **Fixed Costs** | Number (€) | Annual fixed operational costs | €200,000 |
| **Variable Costs %** | Slider (0-100%) | Variable costs as percentage of sales | 40% |
| **Sales Growth %** | Slider (0-100%) | Annual sales growth rate | 5% |

### 3. Sustainability Strategy
| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| **Sustainability CAPEX** | Number (€) | Initial sustainability investment | €100,000 |
| **Energy Efficiency %** | Slider (0-100%) | Energy efficiency improvement | 15% |
| **Waste Reduction %** | Slider (0-100%) | Waste reduction percentage | 10% |
| **Resource Efficiency %** | Slider (0-100%) | Resource efficiency improvement | 8% |
| **Circular Economy %** | Slider (0-100%) | Circular economy initiatives | 5% |
| **Reputation Uplift %** | Slider (0-100%) | Brand reputation improvement | 3% |
| **Green Market Access %** | Slider (0-100%) | Access to green market segments | 5% |

### 4. Employee & Productivity *(NEW)*
| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| **Employees** | Number | Total number of employees | 50 |
| **Employee Growth %** | Slider (0-100%) | Annual employee growth rate | 2% |
| **Productivity Gain %** | Slider (0-100%) | Productivity improvement percentage | 10% |
| **Turnover Reduction %** | Slider (0-100%) | Employee turnover reduction | 20% |

### 5. Additional Financials *(NEW)*
| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| **Initial CAPEX** | Number (€) | Initial capital expenditure | €50,000 |
| **Reinvest %** | Slider (0-100%) | Annual reinvestment percentage | 1% |
| **Government Subsidies** | Number (€) | Government subsidy amount | €15,000 |
| **WACC** | Slider (0-100%) | Weighted Average Cost of Capital | 7% |

### 6. Impact Potentials
| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| **Disruption Impact** | Slider (0-100) | Climate disruption impact level | 20 |
| **Carbon Reduction %** | Slider (0-100%) | Potential carbon reduction | 25% |
| **Scope 1 Reduction %** | Slider (0-100%) | Direct emissions reduction | 25% |
| **Scope 2 Reduction %** | Slider (0-100%) | Indirect emissions reduction | 25% |
| **Scope 3 Reduction %** | Slider (0-100%) | Value chain emissions reduction | 20% |

### 7. Financial Settings (Advanced)
| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| **Tax Rate** | Number (0-100%) | Corporate tax rate | 25% |
| **Discount Rate** | Number (0-100%) | Discount rate for NPV calculations | 8% |
| **Depreciation Years** | Number | Asset depreciation period | 5 Years |
| **Inflation Rate** | Number (0-100%) | Annual inflation rate | 2% |

**Inputs and display:** Every percentage slider has a numeric input box for precise entry. Percent sliders use step 1%; monetary fields use sensible steps (e.g. 100 or 500). Currency is displayed with auto-scaling (€, K€, M€); energy as kWh or MWh; water as L or m³ where appropriate. Display formatting only; internal values are unchanged.

---

## 📊 OUTPUT CALCULATIONS (Right Side Results)

### Top-Level Scores
| Metric | Description | Range |
|--------|-------------|-------|
| **Economic Score** | Financial performance indicator | 0-100 |
| **Environmental Score** | Environmental impact indicator | 0-100 |
| **Strategic Score** | Strategic positioning indicator | 0-100 |
| **Overall Score** | Weighted composite score | 0-100 |

### Deep Dive Indicators

#### 📈 FINANCE Section (8 Metrics)

| Metric | Description | Unit | Status |
|--------|-------------|------|--------|
| **ROI** | Return on Investment (incremental only; see formula) | % | Updated |
| **IRR** | Internal Rate of Return (incremental cash flows) | % | **NEW** |
| **NPV** | Net Present Value (incremental; see formula) | € | **NEW** |
| **Payback** | Simple payback period (incremental gain vs investment) | Years | Updated |
| **Disc. Payback** | Discounted payback period (incremental DCF) | Years | **NEW** |
| **Break Even** | Year when Scenario B exceeds Scenario A | Year | **NEW** |
| **Viability** | Financial viability score (NPV normalized) | /100 | Original |
| **TCO** | Total Cost of Ownership | K€ | **NEW** |

#### 🌍 CARBON Section (4 Metrics)

| Metric | Description | Unit | Status |
|--------|-------------|------|--------|
| **Reduction (Proxy)** | Estimated carbon reduction - synthetic proxy for directional comparison | tCO2e | Original |
| **Cost/Ton CO2** | Cost efficiency per ton of CO2 reduced | € | **NEW** |
| **Carbon Intensity** | kg CO2e per €1,000 sales (index for comparison; see formula below) | kg CO2e/€1k | **NEW** |
| **Net Zero** | Net zero progress percentage | % | Original |

#### ⚡ EFFICIENCY Section (4 Metrics) *(NEW SECTION)*

| Metric | Description | Unit | Status |
|--------|-------------|------|--------|
| **Energy Savings (Proxy)** | Estimated energy savings - proxy estimate based on efficiency assumptions | MWh | **NEW** |
| **Water Savings (Proxy)** | Estimated water savings - proxy estimate using fixed assumptions | KL | **NEW** |
| **Waste Diversion (Index)** | Waste diversion index - calculated from linear combinations for comparison | % | **NEW** |
| **Res. Efficiency (Index)** | Resource efficiency composite index - weighted combination of efficiency factors | /100 | **NEW** |

#### 🛡️ RISK & ESG Section (4 Metrics)

| Metric | Description | Unit | Status |
|--------|-------------|------|--------|
| **ESG Score** | Environmental, Social, Governance composite score | /100 | **NEW** |
| **Resilience** | Resilience index | Idx | Original |
| **Emp. Engage** | Employee engagement index | /100 | **NEW** |
| **Exec Risk** | Execution risk factor | High/Med/Low | Original |

### Projection Charts
- **Sales Projection**: Annual sales comparison (Scenario A vs Scenario B)
- **Net Profit Projection**: Annual profit comparison (Scenario A vs Scenario B)
- Charts use consistent labels **Scenario A** (traditional) and **Scenario B** (sustainable), with a persistent legend and toggles to show/hide each scenario. Scenario A and B use consistent colors across all views.

### Impact Matrix
A 3x3 matrix showing:
- **Rows**: Economic, Environmental, Strategic
- **Columns**: Upside, Risk, Feasibility
- **Values**: Color-coded scores (Green/Yellow/Red)

### System Alerts
Automated alerts for:
- Greenwashing Risk
- Financial Risk
- Strategic Risk
- Execution Risk
- Profitability Alerts

### Strategy Balance
Radar chart visualizing the balance between:
- Economic performance
- Environmental performance
- Strategic positioning

---

## 🧮 CALCULATION FORMULAS & METHODOLOGY

### ⚠️ Important Methodology Notes

#### 1. Proxy and Index-Based Metrics

Several environmental and efficiency metrics in this simulator are **synthetic proxies and index-based estimates** used for directional comparison, not literal real-world accounting measurements. These include:

- **Carbon Reduction (Proxy)**: Derived from savings calculations + a potential slider input. This is a simplified directional estimate, not a precise carbon accounting measurement.
- **Energy Savings (Proxy)**: Estimated based on efficiency percentage and OPEX assumptions. Uses simplified assumptions (energy costs as 20% of OPEX, average €0.15/kWh).
- **Water Savings (Proxy)**: Based on fixed assumption (1L per €1 sales for manufacturing) multiplied by resource efficiency. This is a directional estimate, not actual water usage measurement.
- **Waste Diversion (Index)**: Calculated from linear combinations of waste reduction and circular economy percentages. This is an index-based metric for comparison, not actual waste diversion tracking.
- **Carbon Intensity**: kg CO2e per €1,000 sales; index for comparison (see formula in §5).
- **Resource Efficiency Index**: A composite index combining multiple efficiency factors.

*These metrics are intentionally simplified to enable scenario comparison and decision support. They should be interpreted as directional indicators rather than precise measurements.*

#### 2. Environmental Outputs Are Proxies

**Environmental outputs are proxies intended for directional comparison, not certified reporting.** Use them for scenario comparison and decision support, not as audited or regulatory figures.

#### 3. Key Default Assumptions

- **Energy cost share default:** 20% of OPEX  
- **Electricity price default:** €0.15/kWh  
- **Water intensity default:** 1 L per €1 sales (manufacturing baseline) unless otherwise specified  
- **Waste proxy and resource efficiency** are indicative indices, not measured quantities  

#### 4. Scoring Calibration

**Score outputs are normalized and clamped to a 0–100 range.** The Economic, Environmental, Strategic, and Overall scores use weighted combinations and this clamping. They are design calibrations for interpretability and decision support, not empirically derived constants. Current weights: Economic (40%), Environmental (30%), Strategic (30%). Adjustable for different contexts.

### How Inputs Affect Outputs - Calculation Flow

The simulator uses a scenario-based approach comparing two business futures:
- **Scenario A (Traditional)**: Baseline business without sustainability investments
- **Scenario B (Sustainable)**: Includes sustainability CAPEX, efficiency gains, and market benefits

### 1. Sales Projections

**Scenario A (Traditional - Grey Line):**
```
Sales_A(t) = Sales_A(t-1) × (1 + Sales Growth Rate + Inflation Rate + 0.01)
```
*Note: Added inflation + 1% base market growth to make traditional scenario more realistic and less flat*

**Scenario B (Sustainable - Teal Line):**
```
Sales_B(t) = Sales_B(t-1) × (1 + Sales Growth Rate + Reputation Uplift % + Green Market Access %)
```
*How it changes: Increasing "Reputation Uplift" or "Green Market Access" sliders increases sales growth rate for Scenario B*

### 2. Operating Expenses (OPEX)

**Both Scenarios:**
```
OPEX = Sales × Variable Costs % + Fixed Costs
```

**Scenario B Savings:**
```
Savings = OPEX_B × (Energy Efficiency % + Resource Efficiency % + Waste Reduction % + Circular Economy %)
```
*How it changes: Increasing efficiency sliders directly increases savings, which improves profit in Scenario B*

### 3. Profit Calculations

**Scenario A:**
```
EBIT_A = Sales_A - OPEX_A
Tax_A = max(0, EBIT_A × Tax Rate)
Profit_A = EBIT_A - Tax_A
```

**Scenario B:**
```
EBITDA_B = Sales_B - OPEX_B + Savings
EBIT_B = EBITDA_B - Depreciation
Tax_B = max(0, EBIT_B × Tax Rate)
Profit_B = EBIT_B - Tax_B
```
*How it changes: Higher efficiency gains → More savings → Higher profit. Higher tax rate → Lower profit*

### 4. Financial Metrics Calculations (Incremental Only)

All financial metrics use **incremental** cash flows: **Profit_B − Profit_A** only. Savings are already included in Profit_B, so they are **not** added again (avoids double-counting).

**Total Incremental Investment** (B vs A):
```
Total_Incremental_Investment = Sustainability CAPEX + Cumulative Reinvestments over horizon
                             = (Cumulative_Investment_B at end of horizon) − Initial CAPEX
```

#### ROI (Return on Investment)
```
ROI = Cumulative(Profit_B − Profit_A) / Total_Incremental_Investment × 100
```
*Do NOT add "Cumulative Savings" separately; savings are already embedded in Profit_B.*  
*How it changes: Higher sustainability CAPEX initially lowers ROI; higher efficiency and sales growth improve incremental profit and ROI.*

#### IRR (Internal Rate of Return)
```
IRR = rate r where NPV(r) = 0
NPV(r) = −Total_Incremental_Investment + Σ [ (Profit_B − Profit_A) / (1 + r)^t ] = 0
```
*How it changes: Higher incremental cash flows (Profit_B − Profit_A) → Higher IRR.*

#### NPV (Net Present Value)
```
NPV = −Total_Incremental_Investment + Σ [ (Profit_B − Profit_A) / (1 + Discount Rate)^t ]
```
*Do NOT add "Savings" separately; they are already in Profit_B.*  
*How it changes: Lower discount rate → Higher NPV. Higher efficiency gains → Higher incremental cash flows → Higher NPV.*

#### Payback Period
```
Payback = First year when Cumulative(Profit_B − Profit_A) ≥ Total_Incremental_Investment
```
*How it changes: Higher efficiency gains → Faster payback. Higher Total_Incremental_Investment → Longer payback.*

#### Discounted Payback Period
```
Discounted Payback = First year when Cumulative DCF ≥ Total_Incremental_Investment
Discounted CF_t = (Profit_B − Profit_A)_t / (1 + Discount Rate)^t
```
*How it changes: Accounts for time value of money; typically longer than simple payback.*

#### Break-Even Year **NEW**
```
Break-Even = First year where Profit_B > Profit_A
```
*How it changes: Higher efficiency gains and sales growth → Earlier break-even point*

#### TCO (Total Cost of Ownership) **NEW**
```
TCO = Initial CAPEX + Sustainability CAPEX + Σ(OPEX_B) + Cumulative Reinvestments
```
*How it changes: Higher reinvestment % → Higher TCO. Higher efficiency → Lower OPEX → Lower TCO*

### 5. Environmental Metrics Calculations

#### Carbon Reduction (Proxy) (tCO2e)
```
Carbon Reduction = (Total Savings × 0.05) + (Carbon Reduction Potential × 10)
```
*Note: This is a synthetic proxy estimate for directional comparison, not a precise carbon accounting measurement.*
*How it changes: Higher efficiency gains → More savings → More carbon reduction. Higher "Carbon Reduction %" slider → More reduction*

#### Cost per Ton CO2 **NEW**
```
Cost/Ton CO2 = Sustainability CAPEX / Carbon Reduction (tons)
```
*How it changes: Lower sustainability CAPEX or higher carbon reduction → Better cost efficiency*

#### Carbon Intensity (kg CO2e per €1,000 sales)
```
Carbon Intensity (kg/€1k) = (Carbon Reduction_tCO2e × 1000) / (Total Sales_B / 1000)
```
**Units:** kg CO2e per €1,000 sales (kg CO2e/€1k). Carbon reduction in tons is converted to kg (×1000); sales in € is expressed per €1k (÷1000).  
*Note: This is an index for directional comparison, not certified reporting.*  
*How it changes: Higher sales or lower carbon reduction → Lower intensity (better).*

#### Net Zero Progress
```
Net Zero Progress = Environmental Score
Environmental Score = (Efficiency × 20%) + (Scope Reductions × 40%) + (Carbon Potential × 40%)
```
*How it changes: Increasing Scope 1/2/3 reductions or Carbon Reduction % slider directly improves net zero progress*

### 6. Efficiency Metrics Calculations **NEW**

#### Energy Savings (Proxy) (kWh)
```
Energy Savings = (Total OPEX_B × Energy Efficiency % × 20%) / €0.15 per kWh
```
*Note: This is a proxy estimate based on simplified assumptions (energy costs as 20% of OPEX, average €0.15/kWh).*
*How it changes: Higher "Energy Efficiency %" slider → More energy savings. Assumes energy costs are 20% of OPEX*

#### Water Savings (Proxy) (Liters)
```
Water Savings = Total Sales_B × Resource Efficiency %
```
Assumes 1L water per €1 sales for manufacturing
*Note: This is a proxy estimate using fixed assumptions. It is a directional estimate, not actual water usage measurement.*
*How it changes: Higher "Resource Efficiency %" slider → More water savings*

#### Waste Diversion (Index)
```
Waste Diversion = (Waste Reduction % × 100) + (Circular Economy % × 30)
```
Capped at 100%
*Note: This is an index-based metric calculated from linear combinations for comparison, not actual waste diversion tracking.*
*How it changes: Both "Waste Reduction %" and "Circular Economy %" sliders contribute to waste diversion*

#### Resource Efficiency Index
```
Resource Efficiency = (Energy × 30% + Resource × 30% + Waste × 20% + Circular × 20%) × 100
```
*How it changes: Weighted average of all efficiency metrics. Increasing any efficiency slider improves the index*

### 7. Strategic & ESG Metrics Calculations

#### ESG Score **NEW**
```
ESG Score = (Environmental × 40%) + (Social × 30%) + (Governance × 30%)
Social = (Reputation × 50% + Productivity × 30% + Turnover Reduction × 20%) × 100
Governance = 100 - Execution Risk
```
*How it changes: Improving environmental metrics, reputation, productivity, or reducing execution risk improves ESG score*

#### Employee Engagement Index **NEW**
```
Employee Engagement = (Productivity Gain × 40% + Turnover Reduction × 30% + Reputation × 30%) × 100
```
*How it changes: Higher productivity gains, lower turnover, better reputation → Higher engagement*

#### Resilience Index
```
Resilience = Strategic Score
Strategic Score = (Reputation × 3 + Productivity × 3 + Turnover Reduction × 2 + Green Market × 2 + Disruption Impact/100) × 10
```
*Note on Disruption Impact: In this formula, "Disruption Impact" represents **strategic urgency and adaptation incentive** (a contextual driver), not risk exposure. Higher values indicate greater strategic motivation to adapt and build resilience through sustainability investments, which is why it contributes positively to the Strategic Score. This reflects the model's assumption that awareness of climate disruption creates strategic urgency that drives better adaptation outcomes.*
*How it changes: Higher reputation, productivity, green market access → Higher resilience. Higher disruption impact (as strategic urgency driver) → Higher resilience through increased adaptation incentive*

### 8. Score Calculations

#### Economic Score
```
Economic Score = 50 + (ROI × 20)
```
ROI used here is the **incremental** ROI defined above. Clamped to 0–100 range.  
*How it changes: Higher incremental ROI → Higher economic score.*

#### Environmental Score
```
Environmental Score = (Efficiency Gains × 20%) + (Scope Reductions × 40%) + (Carbon Potential × 40%)
Efficiency Gains = (Energy + Resource + Waste + Circular) × 25
Scope Reductions = (Scope 1 + Scope 2 + Scope 3) / 3
```
*How it changes: Increasing any efficiency slider or scope reduction slider improves environmental score*

#### Strategic Score
```
Strategic Score = (Reputation × 3 + Productivity × 3 + Turnover Reduction × 2 + Green Market × 2 + Disruption Impact/100) × 10
```
Clamped to 0-100 range
*Note on Disruption Impact: "Disruption Impact" in this formula represents **strategic urgency and adaptation incentive** (contextual driver), not risk exposure. Higher values indicate greater strategic motivation to adapt, which drives better resilience outcomes through sustainability investments.*
*How it changes: Multiple factors contribute. Higher reputation and productivity have the most impact. Higher disruption impact (as strategic urgency) increases adaptation incentive and thus contributes positively to strategic positioning*

#### Overall Score
```
Overall Score = (Economic × 40%) + (Environmental × 30%) + (Strategic × 30%)
```
*Scoring Calibration Note: The weights (Economic 40%, Environmental 30%, Strategic 30%) and the clamping to 0-100 range are **design calibrations for interpretability and decision support**, not empirically derived constants from academic research. These weights reflect the model's decision-support purpose and can be adjusted for different contexts or use cases to emphasize different priorities.*
*How it changes: Weighted average. Economic performance has the highest weight (40%)*

### 9. How Input Changes Affect Graphs

#### Sales Graph (Grey vs Teal Lines):
- **Sales Growth Rate**: Affects both lines. Higher value → Steeper growth for both scenarios
- **Reputation Uplift %**: Only affects teal line (Scenario B). Higher value → Teal line grows faster
- **Green Market Access %**: Only affects teal line. Higher value → Teal line grows faster
- **Inflation Rate**: Affects grey line (Scenario A). Higher inflation → Grey line grows slightly more

#### Net Profit Graph (Grey vs Teal Lines):
- **Energy/Resource/Waste/Circular Efficiency %**: Only affects teal line. Higher values → More savings → Higher profit for Scenario B
- **Variable Costs %**: Affects both lines. Higher value → Lower profit for both
- **Fixed Costs**: Affects both lines. Higher value → Lower profit for both
- **Tax Rate**: Affects both lines. Higher value → Lower profit for both
- **Sustainability CAPEX**: Affects teal line initially (depreciation), but long-term benefits from efficiency gains

### 10. Key Drivers (Results UX)

For **ROI, IRR, NPV, Payback, Break-even**, and **ESG/Strategic Score**, the app displays a short **"Key drivers"** snippet (2–4 items) under each headline value. These are computed by a lightweight sensitivity approach: each major input (e.g. Sustainability CAPEX, sales growth, energy efficiency, discount rate) is nudged by +5% one at a time; the absolute impact on the output is measured and the top drivers are shown. This helps users understand *why* the results look the way they do.

### 11. Real-Time Calculation Updates

When you adjust any input parameter in the left sidebar:

1. **Immediate Recalculation**: All formulas are recalculated instantly (200ms debounce)
2. **Graph Updates**: Both sales and profit graphs update to show new projections
3. **Score Updates**: All four top-level scores (Economic, Environmental, Strategic, Overall) recalculate
4. **Deep Metrics Update**: All 20 detailed metrics in Deep Dive Indicators (including NPV and key drivers) recalculate
5. **Impact Matrix Update**: The 3x3 matrix updates with new Upside, Risk, and Feasibility values
6. **Alerts Update**: System checks for new risk alerts based on updated scores

**Example**: Increasing "Energy Efficiency %" from 15% to 30% will:
- Increase savings in Scenario B
- Improve profit for purple line
- Increase Energy Savings metric
- Improve Resource Efficiency Index
- Potentially improve Environmental Score
- May improve ROI and payback period

---

## 📋 Summary Statistics

### Input Parameters
- **Total Input Parameters**: 32
  - Original: 24
  - **Newly Added**: 8

### Output Calculations
- **Total Output Metrics**: 19
  - Original: 7
  - **Newly Added**: 12

### Breakdown by Category

#### Inputs:
- Company Profile: 2 parameters
- Baseline Financials: 4 parameters
- Sustainability Strategy: 7 parameters
- Employee & Productivity: 4 parameters *(NEW)*
- Additional Financials: 4 parameters *(NEW)*
- Impact Potentials: 5 parameters
- Financial Settings: 4 parameters

#### Outputs:
- Top-Level Scores: 4 metrics
- Finance Section: 7 metrics (2 new)
- Carbon Section: 4 metrics (2 new)
- Efficiency Section: 4 metrics (all new)
- Risk & ESG Section: 4 metrics (2 new)

---

## 🔄 Calculation Flow

1. **Input Parameters** → User adjusts values in left sidebar
2. **Backend Processing** → Simulator calculates all metrics
3. **Output Display** → Results shown in right side panels:
   - Scorecards (top)
   - Projection Charts (middle)
   - Deep Dive Indicators (bottom)
   - Impact Matrix (right)
   - Alerts & Balance (right)

---

## 📝 Notes

- All percentages are displayed as 0-100 scale
- Financial values are in Euros (€)
- Time periods are in years
- Scores are normalized to 0-100 range
- Real-time updates: Changes to inputs immediately recalculate all outputs
- All new calculations are marked with **NEW** label

---

## 🎯 Academic Purpose

This simulator provides comprehensive financial and sustainability analysis for academic research, allowing students and researchers to:
- Compare traditional vs sustainable business scenarios
- Analyze financial viability of sustainability investments
- Evaluate environmental impact metrics
- Assess strategic positioning and risk factors
- Study ESG performance indicators

---

*Document Version: 2.0*  
*Last Updated: 2025*  
*Total Metrics: 51 (32 inputs + 19 outputs)*

