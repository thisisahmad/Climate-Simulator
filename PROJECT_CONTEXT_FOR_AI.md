# Project Context for AI (ChatGPT / Cursor)

Use this file to give an AI assistant full context about this project. Copy-paste it (or parts of it) when asking for help.

---

## What This Project Is

**SME Resilience Simulator** – A full-stack web app that compares two business scenarios:

- **Scenario A (Traditional):** Baseline business, no sustainability investment.
- **Scenario B (Sustainable):** Same business + sustainability CAPEX, efficiency gains, and market/reputation benefits.

The user adjusts **32 input parameters** in a left sidebar. The backend recalculates **19 output metrics**, four top-level scores, projection charts, a 3×3 impact matrix, alerts, and a strategy balance radar. Everything updates in real time (debounced).

---

## Tech Stack

| Layer    | Tech |
|----------|------|
| Frontend | React 19, Vite, Tailwind CSS, Recharts, Lucide React, Axios |
| Backend  | Python 3.9+, FastAPI, Pydantic, NumPy |
| API      | Single POST endpoint: `/api/sme/calculate` – sends JSON inputs, returns full outputs |

No database – all calculations are in-memory from the request body.

---

## Project Structure (What Lives Where)

```
Climate-Simulator/
├── backend/
│   ├── main.py          # FastAPI app, CORS, mounts router at /api
│   ├── api.py           # POST /api/sme/calculate → SmeSimulator.calculate(inputs)
│   ├── models.py        # Pydantic: SmeInputs (32 fields), SmeOutputs, SmeDeepIndicators (19 fields), etc.
│   ├── sme_simulator.py # All business logic: projections, scores, ROI, IRR, TCO, carbon, ESG, etc.
│   └── config.py        # App config (optional)
├── frontend/
│   ├── src/
│   │   ├── pages/ClimateSimulator.jsx   # Main page: sidebar inputs + results panels
│   │   ├── components/DashboardComponents.jsx  # ScoreCard, SliderControl, DeepMetricsPanel, ProjectionChart, ImpactHeatmap, AlertBox, RadarPlot, NumericInput
│   │   └── services/api.js              # calculateSmeImpact(inputs) → POST to backend
│   ├── package.json
│   └── vite.config.js
├── METRICS_DOCUMENTATION.md   # Authoritative list of all 32 inputs + 19 outputs + formulas (client-approved)
├── requirements.txt           # fastapi, uvicorn, pydantic, python-dotenv, numpy
└── README.md                  # User-facing setup/run instructions
```

---

## Data Flow

1. **Frontend** (`ClimateSimulator.jsx`) holds all 32 inputs in React state (e.g. `initial_revenue`, `sustainability_capex`, `energy_efficiency_pct`, …).
2. On any input change, after a 200 ms debounce it calls `calculateSmeImpact(inputs)` in `services/api.js`.
3. **API** (`api.js`) POSTs `inputs` as JSON to `http://localhost:8000/api/sme/calculate` (or the deployed backend URL).
4. **Backend** (`api.py`) receives the body as `SmeInputs`, runs `SmeSimulator().calculate(inputs)`, returns `SmeOutputs` as JSON.
5. **Simulator** (`sme_simulator.py`) builds yearly projections (revenue A/B, OPEX, savings, profit A/B), then computes scores, deep indicators, heatmap, and alerts.
6. **Frontend** stores the response in `outputs` state; ScoreCards, ProjectionChart, DeepMetricsPanel, ImpactHeatmap, AlertBox, and RadarPlot read from `outputs`.

---

## Inputs (32) – Summary

- **Company profile:** Industry, Horizon (forecast years).
- **Baseline financials:** Initial Revenue, Fixed Costs, Variable Costs %, Revenue Growth %.
- **Sustainability strategy:** Sustainability CAPEX, Energy / Waste / Resource / Circular efficiency %, Reputation Uplift %, Green Market Access %.
- **Employee & productivity:** Employees, Employee Growth %, Productivity Gain %, Turnover Reduction %.
- **Additional financials:** Initial CAPEX, Reinvest %, Government Subsidies, WACC.
- **Impact potentials:** Disruption Impact, Carbon Reduction %, Scope 1/2/3 Reduction %.
- **Financial settings (advanced):** Tax Rate, Discount Rate, Depreciation Years, Inflation Rate.

All formulas and exact names are in **METRICS_DOCUMENTATION.md**.

---

## Outputs – Summary

- **Top-level scores (4):** Economic, Environmental, Strategic, Overall (0–100).
- **Deep indicators (19):** ROI, IRR, Payback, Disc. Payback, Break Even, Viability, TCO; Carbon Reduction, Cost/Ton CO2, Intensity, Net Zero; Energy Savings (MWh), Water Savings (KL), Waste Diversion, Res. Efficiency; ESG Score, Resilience, Employee Engagement, Exec Risk (High/Med/Low).
- **Projections:** Per-year revenue_a, revenue_b, profit_a, profit_b, savings, cumulative_investment.
- **Heatmap:** 3×3 (Economic / Environmental / Strategic × Upside / Risk / Feasibility), color-coded.
- **Alerts:** e.g. Greenwashing Risk, Financial Risk, Strategic Risk, Execution Risk, Profitability Alert.

---

## Where Logic Lives

- **Formulas and methodology:** `METRICS_DOCUMENTATION.md` (client-approved; e.g. Revenue A = previous × (1 + growth + inflation + 0.01), ROI, IRR, TCO, carbon proxy, ESG, etc.).
- **Implementation:** `backend/sme_simulator.py` – `_calculate_projections()`, `_calculate_payback()`, `_calculate_discounted_payback()`, `_calculate_break_even()`, `_calculate_irr()`, score and deep-indicator calculations, heatmap, alerts.
- **Request/response shapes:** `backend/models.py` (Pydantic models). Frontend expects the same field names as in these models.

---

## How to Run

- **Backend (project root):** `pip install -r requirements.txt` then `uvicorn backend.main:app --reload` → http://localhost:8000
- **Frontend:** `cd frontend`, `npm install`, `npm run dev` → http://localhost:5173

Frontend is configured to call the API at the same host (or set in env); for local dev both run on the same machine.

---

## Conventions

- Percentages in **models** are decimals (e.g. 0.05 = 5%); frontend often shows/store as 0–100 and converts when sending (e.g. `/100`).
- Currency is Euros (€). No database; no auth.
- **METRICS_DOCUMENTATION.md** is the single source of truth for what each input/output means and how it is calculated.

---

*Last updated to match METRICS_DOCUMENTATION v2.0 (32 inputs, 19 deep indicators).*
