import React, { useState, useEffect } from 'react';
import { calculateSmeImpact } from '../services/api';
import { NumericInput, SliderControl, ScoreCard, ImpactHeatmap, RadarPlot, AlertBox, DeepMetricsPanel, ProjectionChart, MethodologyPanel } from '../components/DashboardComponents';
import { ChevronDown, ChevronUp, Settings, Activity, Zap, BarChart3, Globe, Shield, AlertTriangle, TrendingUp, DollarSign, Leaf, Users, FileText } from 'lucide-react';

const ClimateSimulator = () => {
    // -- Inputs State --
    const [inputs, setInputs] = useState({
        // Basic Business Info
        industry: "Manufacturing",
        company_size: "SME",
        region: "EU",
        forecast_horizon: 7,

        // Financial Baseline
        initial_revenue: 1000000,
        num_employees: 50,
        fixed_costs: 200000,
        variable_costs_pct: 0.4,
        initial_capex: 50000,
        revenue_growth_rate: 0.05,
        employee_growth_rate: 0.02,

        // Sustainability Strategy (Scenario B)
        sustainability_capex: 100000,
        reinvest_pct: 0.01,
        energy_efficiency_pct: 0.15,
        resource_efficiency_pct: 0.08,
        waste_reduction_pct: 0.10,
        circular_economy_pct: 0.05,
        reputation_uplift_pct: 0.03,
        green_market_access_pct: 0.05,
        turnover_reduction_pct: 0.20,
        productivity_gain_pct: 0.10,
        gov_subsidies: 15000,

        // Economic Settings
        tax_rate: 0.25,
        discount_rate: 0.08,
        inflation_rate: 0.02,
        depreciation_years: 5,
        wacc: 0.07,

        // Impact Potentials (instructions (1).docx Mandatory)
        disruption_impact: 20,
        carbon_reduction_potential: 25,
        scope_1_reduction: 25,
        scope_2_reduction: 25,
        scope_3_reduction: 20
    });

    const [activePreset, setActivePreset] = useState("Baseline");
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [outputs, setOutputs] = useState(null);
    const [loading, setLoading] = useState(false);
    const [methodologyOpen, setMethodologyOpen] = useState(false);
    const [chartShowA, setChartShowA] = useState(true);
    const [chartShowB, setChartShowB] = useState(true);

    // -- Effects --
    useEffect(() => {
        const fetchResults = async () => {
            setLoading(true);
            try {
                const data = await calculateSmeImpact(inputs);
                setOutputs(data);
            } catch (err) {
                console.error("Simulation failed", err);
            } finally {
                setLoading(false);
            }
        };
        const debounce = setTimeout(fetchResults, 200);
        return () => clearTimeout(debounce);
    }, [inputs]);

    // -- Helpers --
    const h = (key, val) => {
        setInputs(prev => ({ ...prev, [key]: val }));
    };

    return (
        <div className="flex flex-col min-h-screen text-slate-800 font-sans overflow-x-hidden bg-gradient-to-b from-slate-100 to-slate-50">
            {/* -- Top Header Bar -- */}
            <div className="flex-none h-12 sm:h-14 border-b border-teal-200 flex items-center justify-between px-4 sm:px-6 bg-teal-600 shadow-md">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 rounded-lg bg-white/20 flex items-center justify-center ring-2 ring-white/30">
                        <Activity className="text-white w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="min-w-0">
                        <h1 className="text-xs sm:text-sm font-black tracking-tighter text-white uppercase truncate">SME Resilience Simulator V2</h1>
                        <p className="hidden sm:block text-[9px] font-semibold text-teal-100 uppercase tracking-widest leading-none">Scenario-Driven Financial Analysis</p>
                    </div>
                </div>
            </div>

            {/* -- Main Content -- On mobile: single column, full page scroll so charts are visible below. On lg: side-by-side. */}
            <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-2 p-2 sm:p-3 overflow-y-auto overflow-x-hidden">

                {/* -- Left Panel: Inputs -- On mobile: max height so Results can appear sooner when scrolling. */}
                <div className="w-full lg:w-[380px] flex-none lg:flex-none flex flex-col glass-panel rounded-xl overflow-hidden shadow-2xl max-h-[65vh] sm:max-h-[70vh] lg:max-h-[calc(100vh-5rem)] shrink-0">
                    <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50 flex-shrink-0">
                        <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 flex-shrink-0" />
                        <h2 className="text-[11px] sm:text-[12px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-slate-700">Parameters</h2>
                    </div>

                    <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 customized-scrollbar min-h-0">

                        {/* 1. General Info */}
                        <div className="space-y-4">
                            <h3 className="text-[11px] font-black text-teal-700 mb-4 flex items-center gap-3 uppercase tracking-[0.25em]">
                                <Users className="w-4 h-4" /> Company Profile
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="text-[9px] uppercase font-bold text-slate-600 tracking-wider">Industry</label>
                                    <select value={inputs.industry} onChange={e => h('industry', e.target.value)} className="input-field w-full">
                                        {['Manufacturing', 'Services', 'Food', 'Logistics'].map(opt => <option key={opt}>{opt}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] uppercase font-bold text-slate-600 tracking-wider">Horizon</label>
                                    <select value={inputs.forecast_horizon} onChange={e => h('forecast_horizon', parseInt(e.target.value))} className="input-field w-full">
                                        {[5, 7, 10].map(opt => <option key={opt} value={opt}>{opt} Years</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* 2. Baseline Financials */}
                        <div className="space-y-6">
                            <h3 className="text-[11px] font-black text-emerald-700 mb-4 flex items-center gap-3 uppercase tracking-[0.25em]">
                                <DollarSign className="w-4 h-4" /> Baseline Financials
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
                                <NumericInput label="Init. Revenue" value={inputs.initial_revenue} onChange={v => h('initial_revenue', v)} prefix="€" compact step={500} />
                                <NumericInput label="Fixed Costs" value={inputs.fixed_costs} onChange={v => h('fixed_costs', v)} prefix="€" compact step={500} />
                                <SliderControl label="Var. Costs" value={Math.round(inputs.variable_costs_pct * 100)} onChange={v => h('variable_costs_pct', v / 100)} suffix="%" compact step={1} showNumericInput numericValue={Math.round(inputs.variable_costs_pct * 100)} onNumericChange={v => h('variable_costs_pct', v / 100)} />
                                <SliderControl label="Rev. Growth" value={Math.round(inputs.revenue_growth_rate * 100)} onChange={v => h('revenue_growth_rate', v / 100)} suffix="%" compact step={1} showNumericInput numericValue={Math.round(inputs.revenue_growth_rate * 100)} onNumericChange={v => h('revenue_growth_rate', v / 100)} />
                            </div>
                        </div>

                        {/* 3. Sustainability Strategy */}
                        <div className="space-y-6">
                            <h3 className="text-[11px] font-black text-teal-700 mb-4 flex items-center gap-3 uppercase tracking-[0.25em]">
                                <Leaf className="w-4 h-4" /> Sustainability Strategy
                            </h3>
                            <NumericInput label="Sustainability CAPEX" value={inputs.sustainability_capex} onChange={v => h('sustainability_capex', v)} prefix="€" step={500} />
                            <div className="space-y-4">
                                <h4 className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Efficiency Gains</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <SliderControl label="Energy Efficiency" value={Math.round(inputs.energy_efficiency_pct * 100)} onChange={v => h('energy_efficiency_pct', v / 100)} suffix="%" compact step={1} showNumericInput numericValue={Math.round(inputs.energy_efficiency_pct * 100)} onNumericChange={v => h('energy_efficiency_pct', v / 100)} />
                                    <SliderControl label="Waste Reduction" value={Math.round(inputs.waste_reduction_pct * 100)} onChange={v => h('waste_reduction_pct', v / 100)} suffix="%" compact step={1} showNumericInput numericValue={Math.round(inputs.waste_reduction_pct * 100)} onNumericChange={v => h('waste_reduction_pct', v / 100)} />
                                    <SliderControl label="Resource Efficiency" value={Math.round(inputs.resource_efficiency_pct * 100)} onChange={v => h('resource_efficiency_pct', v / 100)} suffix="%" compact step={1} showNumericInput numericValue={Math.round(inputs.resource_efficiency_pct * 100)} onNumericChange={v => h('resource_efficiency_pct', v / 100)} />
                                    <SliderControl label="Circular Economy" value={Math.round(inputs.circular_economy_pct * 100)} onChange={v => h('circular_economy_pct', v / 100)} suffix="%" compact step={1} showNumericInput numericValue={Math.round(inputs.circular_economy_pct * 100)} onNumericChange={v => h('circular_economy_pct', v / 100)} />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Market & Reputation</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <SliderControl label="Reputation Uplift" value={Math.round(inputs.reputation_uplift_pct * 100)} onChange={v => h('reputation_uplift_pct', v / 100)} suffix="%" compact step={1} showNumericInput numericValue={Math.round(inputs.reputation_uplift_pct * 100)} onNumericChange={v => h('reputation_uplift_pct', v / 100)} />
                                    <SliderControl label="Green Market Access" value={Math.round(inputs.green_market_access_pct * 100)} onChange={v => h('green_market_access_pct', v / 100)} suffix="%" compact step={1} showNumericInput numericValue={Math.round(inputs.green_market_access_pct * 100)} onNumericChange={v => h('green_market_access_pct', v / 100)} />
                                </div>
                            </div>
                        </div>

                        {/* 4. Employee & Productivity (METRICS_DOC) */}
                        <div className="space-y-6">
                            <h3 className="text-[11px] font-black text-cyan-700 mb-4 flex items-center gap-3 uppercase tracking-[0.25em]">
                                <Users className="w-4 h-4" /> Employee & Productivity
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
                                <NumericInput label="Employees" value={inputs.num_employees} onChange={v => h('num_employees', v)} compact />
                                <SliderControl label="Employee Growth" value={Math.round(inputs.employee_growth_rate * 100)} onChange={v => h('employee_growth_rate', v / 100)} suffix="%" compact step={1} showNumericInput numericValue={Math.round(inputs.employee_growth_rate * 100)} onNumericChange={v => h('employee_growth_rate', v / 100)} />
                                <SliderControl label="Productivity Gain" value={Math.round(inputs.productivity_gain_pct * 100)} onChange={v => h('productivity_gain_pct', v / 100)} suffix="%" compact step={1} showNumericInput numericValue={Math.round(inputs.productivity_gain_pct * 100)} onNumericChange={v => h('productivity_gain_pct', v / 100)} />
                                <SliderControl label="Turnover Reduction" value={Math.round(inputs.turnover_reduction_pct * 100)} onChange={v => h('turnover_reduction_pct', v / 100)} suffix="%" compact step={1} showNumericInput numericValue={Math.round(inputs.turnover_reduction_pct * 100)} onNumericChange={v => h('turnover_reduction_pct', v / 100)} />
                            </div>
                        </div>

                        {/* 5. Additional Financials (METRICS_DOC) */}
                        <div className="space-y-6">
                            <h3 className="text-[11px] font-black text-emerald-700 mb-4 flex items-center gap-3 uppercase tracking-[0.25em]">
                                <DollarSign className="w-4 h-4" /> Additional Financials
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
                                <NumericInput label="Initial CAPEX" value={inputs.initial_capex} onChange={v => h('initial_capex', v)} prefix="€" compact step={100} />
                                <SliderControl label="Reinvest %" value={Math.round(inputs.reinvest_pct * 100)} onChange={v => h('reinvest_pct', v / 100)} suffix="%" compact step={1} showNumericInput numericValue={Math.round(inputs.reinvest_pct * 100)} onNumericChange={v => h('reinvest_pct', v / 100)} />
                                <NumericInput label="Gov. Subsidies" value={inputs.gov_subsidies} onChange={v => h('gov_subsidies', v)} prefix="€" compact step={100} />
                                <SliderControl label="WACC" value={Math.round(inputs.wacc * 100)} onChange={v => h('wacc', v / 100)} suffix="%" compact step={1} showNumericInput numericValue={Math.round(inputs.wacc * 100)} onNumericChange={v => h('wacc', v / 100)} />
                            </div>
                        </div>

                        {/* 4. Impact Potentials (instructions (1).docx Mandatory) */}
                        <div className="space-y-6">
                            <h3 className="text-[11px] font-black text-amber-700 mb-4 flex items-center gap-3 uppercase tracking-[0.25em]">
                                <Zap className="w-4 h-4" /> Impact Potentials
                            </h3>
                            <div className="space-y-4">
                                <SliderControl label="Disruption Impact" value={inputs.disruption_impact} onChange={v => h('disruption_impact', v)} suffix="" compact />
                                <SliderControl label="Carbon Reduction" value={inputs.carbon_reduction_potential} onChange={v => h('carbon_reduction_potential', v)} suffix="%" compact step={1} showNumericInput numericValue={inputs.carbon_reduction_potential} onNumericChange={v => h('carbon_reduction_potential', v)} />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <SliderControl label="Scope 1" value={inputs.scope_1_reduction} onChange={v => h('scope_1_reduction', v)} suffix="%" compact step={1} showNumericInput numericValue={inputs.scope_1_reduction} onNumericChange={v => h('scope_1_reduction', v)} />
                                    <SliderControl label="Scope 2" value={inputs.scope_2_reduction} onChange={v => h('scope_2_reduction', v)} suffix="%" compact step={1} showNumericInput numericValue={inputs.scope_2_reduction} onNumericChange={v => h('scope_2_reduction', v)} />
                                </div>
                                <SliderControl label="Scope 3" value={inputs.scope_3_reduction} onChange={v => h('scope_3_reduction', v)} suffix="%" compact step={1} showNumericInput numericValue={inputs.scope_3_reduction} onNumericChange={v => h('scope_3_reduction', v)} />
                            </div>
                        </div>

                        {/* 5. Advanced Settings */}
                        <div className="pt-2 border-t border-slate-200">
                            <button
                                onClick={() => setShowAdvanced(!showAdvanced)}
                                className="flex items-center justify-between w-full py-2 px-3 rounded-lg text-xs font-semibold transition-all group border border-slate-300 bg-slate-100 hover:bg-teal-50 hover:border-teal-400 text-slate-700"
                            >
                                <span className="group-hover:text-teal-700 transition-colors tracking-widest uppercase text-[10px]">Financial Settings</span>
                                {showAdvanced ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            </button>

                            {showAdvanced && (
                                <div className="mt-4 space-y-4 pl-4 border-l-2 border-teal-400 animate-fade-in">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <NumericInput label="Tax Rate" value={Math.round(inputs.tax_rate * 100)} onChange={v => h('tax_rate', v / 100)} suffix="%" compact />
                                        <NumericInput label="Discount" value={Math.round(inputs.discount_rate * 100)} onChange={v => h('discount_rate', v / 100)} suffix="%" compact />
                                        <NumericInput label="Depr. Years" value={Math.round(inputs.depreciation_years)} onChange={v => h('depreciation_years', v)} suffix="Y" compact />
                                        <NumericInput label="Inflation" value={Math.round(inputs.inflation_rate * 100)} onChange={v => h('inflation_rate', v / 100)} suffix="%" compact />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* -- Right Panel: Results -- On mobile: flex-none = natural height so scorecards + charts + metrics all in scroll flow. On lg: flex-1 + scroll. */}
                <div id="results" className="flex-none lg:flex-1 flex flex-col gap-3 min-h-0 min-w-0 overflow-y-auto overflow-x-hidden customized-scrollbar lg:max-h-[calc(100vh-5rem)]">
                    {/* Methodology link - top right of results */}
                    <div className="flex justify-end flex-none">
                        <button type="button" onClick={() => setMethodologyOpen(true)} className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-teal-600 hover:text-teal-700 hover:underline">
                            <FileText className="w-3.5 h-3.5" /> Methodology & assumptions
                        </button>
                    </div>

                    {/* Row 1: Scorecards - 2x2 on mobile, 4 cols on md+ */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 flex-none">
                        <ScoreCard title="Economic" score={outputs?.scores?.economic || 0} icon={DollarSign} color="blue" tooltipText="Index: normalized score 0–100. See Methodology & assumptions for details." />
                        <ScoreCard title="Environmental" score={outputs?.scores?.environmental || 0} icon={Leaf} color="green" tooltipText="Index: normalized score 0–100. Environmental outputs are proxies for directional comparison." />
                        <ScoreCard title="Strategic" score={outputs?.scores?.strategic || 0} icon={TrendingUp} color="amber" tooltipText="Index: normalized score 0–100. See Methodology & assumptions for details." />
                        <ScoreCard title="Overall Score" score={outputs?.scores?.overall || 0} icon={Zap} isMain tooltipText="Composite index normalized to 0–100. See Methodology & assumptions for details." />
                    </div>

                    {/* Row 2: Projection Charts & Heatmap - stack on mobile with fixed height so graphs visible */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-2 sm:gap-3 flex-none">
                        <div className="lg:col-span-4 min-h-[280px] sm:min-h-[300px] lg:min-h-[340px] glass-panel rounded-xl animate-fade-in shadow-xl" style={{ animationDelay: '0.1s' }}>
                            <ProjectionChart
                                data={outputs?.projections}
                                title="Revenue"
                                dataKeyA="revenue_a"
                                dataKeyB="revenue_b"
                                labelA="Scenario A"
                                labelB="Scenario B"
                                showLineA={chartShowA}
                                showLineB={chartShowB}
                                onToggleA={setChartShowA}
                                onToggleB={setChartShowB}
                            />
                        </div>
                        <div className="lg:col-span-4 min-h-[260px] sm:min-h-[300px] lg:min-h-[340px] glass-panel rounded-xl animate-fade-in shadow-xl" style={{ animationDelay: '0.2s' }}>
                            <ProjectionChart
                                data={outputs?.projections}
                                title="Net Profit"
                                dataKeyA="profit_a"
                                dataKeyB="profit_b"
                                labelA="Scenario A"
                                labelB="Scenario B"
                                showLineA={chartShowA}
                                showLineB={chartShowB}
                                onToggleA={setChartShowA}
                                onToggleB={setChartShowB}
                            />
                        </div>
                        <div className="md:col-span-2 lg:col-span-4 min-h-[260px] sm:min-h-[280px] lg:min-h-[340px] glass-panel rounded-xl animate-fade-in shadow-xl" style={{ animationDelay: '0.3s' }}>
                            <ImpactHeatmap cells={outputs?.heatmap} />
                        </div>
                    </div>

                    {/* Row 3: Deep Metrics & Balance/Alerts - stack on mobile, side-by-side on lg+ */}
                    <div className="flex-1 min-h-[400px] lg:min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-3 overflow-auto">
                        <div className="lg:col-span-12 glass-panel rounded-xl animate-fade-in overflow-hidden relative shadow-lg min-h-0" style={{ animationDelay: '0.4s' }}>
                            <div className="grid grid-cols-1 lg:grid-cols-12 h-full min-h-[360px] lg:min-h-0">
                                <div className="lg:col-span-8 border-b lg:border-b-0 lg:border-r border-slate-200 min-h-[280px]">
                                    <DeepMetricsPanel details={outputs?.details} keyDrivers={outputs?.key_drivers} />
                                </div>
                                <div className="lg:col-span-4 flex flex-col min-h-[240px]">
                                    <div className="flex-1 min-h-[120px] border-b border-slate-200 overflow-hidden">
                                        <AlertBox alerts={outputs?.alerts} />
                                    </div>
                                    <div className="h-36 sm:h-44 p-3 sm:p-4 flex-shrink-0">
                                        <h3 className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2">Strategy Balance</h3>
                                        <RadarPlot scores={outputs?.scores} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Footer with Methodology link */}
            <footer className="flex-none border-t border-slate-200 bg-slate-50/80 px-4 py-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-[10px] sm:text-xs text-slate-600">
                <button type="button" onClick={() => setMethodologyOpen(true)} className="font-bold uppercase tracking-widest text-teal-600 hover:text-teal-700 hover:underline">
                    Methodology & assumptions
                </button>
                <span className="font-semibold">SME Resilience Simulator V2 — Scenario-driven financial analysis</span>
            </footer>

            <MethodologyPanel isOpen={methodologyOpen} onClose={() => setMethodologyOpen(false)} />

            <style jsx>{`
                .input-field {
                    background-color: #ffffff;
                    border: 1px solid #cbd5e1;
                    border-radius: 0.5rem;
                    padding: 0.5rem 0.75rem;
                    font-size: 12px;
                    font-weight: 700;
                    color: #0f172a;
                    outline: none;
                    cursor: pointer;
                    transition: border-color 0.2s, box-shadow 0.2s;
                    font-family: 'Inter', sans-serif;
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    appearance: none;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%230d9488'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
                    background-repeat: no-repeat;
                    background-position: right 0.75rem center;
                    background-size: 1rem;
                    padding-right: 2.5rem;
                }
                .input-field:hover { border-color: #94a3b8; }
                .input-field:focus { border-color: #0d9488; box-shadow: 0 0 0 2px rgba(13, 148, 136, 0.2); }
                .input-field option {
                    background-color: #ffffff !important;
                    color: #0f172a !important;
                    padding: 12px;
                    font-weight: 700;
                }
                .customized-scrollbar::-webkit-scrollbar { width: 6px; }
                .customized-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; }
                .customized-scrollbar::-webkit-scrollbar-thumb { background: #94a3b8; border-radius: 9999px; }
                .customized-scrollbar::-webkit-scrollbar-thumb:hover { background: #64748b; }
            `}</style>
        </div>
    );
};

export default ClimateSimulator;
