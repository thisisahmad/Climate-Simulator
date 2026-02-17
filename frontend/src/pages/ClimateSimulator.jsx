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
        <div className="min-h-screen text-slate-800 font-sans overflow-x-hidden bg-slate-100 pt-14">
            {/* ── Header ── Fixed, always on top */}
            <header className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-teal-700/30 flex items-center justify-between px-5 sm:px-6 bg-gradient-to-r from-teal-700 via-teal-600 to-teal-700 shadow-lg">
                <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 flex-shrink-0 rounded-lg bg-white/15 flex items-center justify-center ring-1 ring-white/25 backdrop-blur-sm">
                        <Activity className="text-white w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                        <h1 className="text-base sm:text-lg font-black tracking-tight text-white uppercase truncate">Green Investment Impact Simulator</h1>
                        <p className="hidden sm:block text-[10px] font-semibold text-teal-100 uppercase tracking-[0.2em] leading-none">Scenario-Driven Financial Analysis</p>
                    </div>
                </div>
                <button type="button" onClick={() => setMethodologyOpen(true)} className="hidden sm:flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-teal-100 hover:text-white transition-colors">
                    <FileText className="w-3.5 h-3.5" /> Methodology
                </button>
            </header>

            {/* ── Body: Fixed Sidebar + Scrollable Main ── */}
            <div className="flex flex-col lg:block">

                {/* ── Sidebar (Parameters) ── Fixed on desktop, always full height, no blank space */}
                <aside className="order-2 lg:order-none bg-white border-r border-slate-200 lg:fixed lg:top-14 lg:left-0 lg:w-[360px] lg:h-[calc(100vh-3.5rem)] lg:z-30 flex flex-col">
                    {/* Sidebar header */}
                    <div className="px-5 py-3.5 border-b border-slate-200 flex items-center gap-3 bg-slate-50/80 flex-shrink-0">
                        <div className="w-7 h-7 rounded-md bg-teal-600 flex items-center justify-center">
                            <Settings className="w-3.5 h-3.5 text-white" />
                        </div>
                        <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-700">Parameters</h2>
                    </div>

                    {/* Sidebar scrollable content */}
                    <div className="flex-1 overflow-y-auto px-5 py-5 space-y-7 customized-scrollbar min-h-0">

                        {/* 1. General Info */}
                        <div className="space-y-3">
                            <h3 className="text-[11px] font-black text-teal-700 flex items-center gap-2.5 uppercase tracking-[0.2em]">
                                <Users className="w-3.5 h-3.5" /> Company Profile
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Industry</label>
                                    <select value={inputs.industry} onChange={e => h('industry', e.target.value)} className="input-field w-full">
                                        {['Manufacturing', 'Services', 'Food', 'Logistics'].map(opt => <option key={opt}>{opt}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Horizon</label>
                                    <select value={inputs.forecast_horizon} onChange={e => h('forecast_horizon', parseInt(e.target.value))} className="input-field w-full">
                                        {[5, 7, 10].map(opt => <option key={opt} value={opt}>{opt} Years</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* 2. Baseline Financials */}
                        <div className="space-y-3">
                            <h3 className="text-[11px] font-black text-emerald-700 flex items-center gap-2.5 uppercase tracking-[0.2em]">
                                <DollarSign className="w-3.5 h-3.5" /> Baseline Financials
                            </h3>
                            <div className="grid grid-cols-2 gap-x-3 gap-y-3">
                                <NumericInput label="Init. Sales" value={inputs.initial_revenue} onChange={v => h('initial_revenue', v)} prefix="€" compact step={500} />
                                <NumericInput label="Fixed Costs" value={inputs.fixed_costs} onChange={v => h('fixed_costs', v)} prefix="€" compact step={500} />
                                <SliderControl label="Var. Costs" value={Math.round(inputs.variable_costs_pct * 100)} onChange={v => h('variable_costs_pct', v / 100)} suffix="%" compact step={1} showNumericInput numericValue={Math.round(inputs.variable_costs_pct * 100)} onNumericChange={v => h('variable_costs_pct', v / 100)} />
                                <SliderControl label="Sales Growth" value={Math.round(inputs.revenue_growth_rate * 100)} onChange={v => h('revenue_growth_rate', v / 100)} suffix="%" compact step={1} showNumericInput numericValue={Math.round(inputs.revenue_growth_rate * 100)} onNumericChange={v => h('revenue_growth_rate', v / 100)} />
                            </div>
                        </div>

                        {/* 3. Sustainability Strategy */}
                        <div className="space-y-3">
                            <h3 className="text-[11px] font-black text-teal-700 flex items-center gap-2.5 uppercase tracking-[0.2em]">
                                <Leaf className="w-3.5 h-3.5" /> Sustainability Strategy
                            </h3>
                            <NumericInput label="Sustainability CAPEX" value={inputs.sustainability_capex} onChange={v => h('sustainability_capex', v)} prefix="€" step={500} />
                            <div className="space-y-3 mt-2">
                                <h4 className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Efficiency Gains</h4>
                                <div className="grid grid-cols-2 gap-3">
                                    <SliderControl label="Energy Efficiency" value={Math.round(inputs.energy_efficiency_pct * 100)} onChange={v => h('energy_efficiency_pct', v / 100)} suffix="%" compact step={1} showNumericInput numericValue={Math.round(inputs.energy_efficiency_pct * 100)} onNumericChange={v => h('energy_efficiency_pct', v / 100)} />
                                    <SliderControl label="Waste Reduction" value={Math.round(inputs.waste_reduction_pct * 100)} onChange={v => h('waste_reduction_pct', v / 100)} suffix="%" compact step={1} showNumericInput numericValue={Math.round(inputs.waste_reduction_pct * 100)} onNumericChange={v => h('waste_reduction_pct', v / 100)} />
                                    <SliderControl label="Resource Efficiency" value={Math.round(inputs.resource_efficiency_pct * 100)} onChange={v => h('resource_efficiency_pct', v / 100)} suffix="%" compact step={1} showNumericInput numericValue={Math.round(inputs.resource_efficiency_pct * 100)} onNumericChange={v => h('resource_efficiency_pct', v / 100)} />
                                    <SliderControl label="Circular Economy" value={Math.round(inputs.circular_economy_pct * 100)} onChange={v => h('circular_economy_pct', v / 100)} suffix="%" compact step={1} showNumericInput numericValue={Math.round(inputs.circular_economy_pct * 100)} onNumericChange={v => h('circular_economy_pct', v / 100)} />
                                </div>
                            </div>
                            <div className="space-y-3 mt-2">
                                <h4 className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Market & Reputation</h4>
                                <div className="grid grid-cols-2 gap-3">
                                    <SliderControl label="Reputation Uplift" value={Math.round(inputs.reputation_uplift_pct * 100)} onChange={v => h('reputation_uplift_pct', v / 100)} suffix="%" compact step={1} showNumericInput numericValue={Math.round(inputs.reputation_uplift_pct * 100)} onNumericChange={v => h('reputation_uplift_pct', v / 100)} />
                                    <SliderControl label="Green Market Access" value={Math.round(inputs.green_market_access_pct * 100)} onChange={v => h('green_market_access_pct', v / 100)} suffix="%" compact step={1} showNumericInput numericValue={Math.round(inputs.green_market_access_pct * 100)} onNumericChange={v => h('green_market_access_pct', v / 100)} />
                                </div>
                            </div>
                        </div>

                        {/* 4. Employee & Productivity */}
                        <div className="space-y-3">
                            <h3 className="text-[11px] font-black text-cyan-700 flex items-center gap-2.5 uppercase tracking-[0.2em]">
                                <Users className="w-3.5 h-3.5" /> Employee & Productivity
                            </h3>
                            <div className="grid grid-cols-2 gap-x-3 gap-y-3">
                                <NumericInput label="Employees" value={inputs.num_employees} onChange={v => h('num_employees', v)} compact />
                                <SliderControl label="Employee Growth" value={Math.round(inputs.employee_growth_rate * 100)} onChange={v => h('employee_growth_rate', v / 100)} suffix="%" compact step={1} showNumericInput numericValue={Math.round(inputs.employee_growth_rate * 100)} onNumericChange={v => h('employee_growth_rate', v / 100)} />
                                <SliderControl label="Productivity Gain" value={Math.round(inputs.productivity_gain_pct * 100)} onChange={v => h('productivity_gain_pct', v / 100)} suffix="%" compact step={1} showNumericInput numericValue={Math.round(inputs.productivity_gain_pct * 100)} onNumericChange={v => h('productivity_gain_pct', v / 100)} />
                                <SliderControl label="Turnover Reduction" value={Math.round(inputs.turnover_reduction_pct * 100)} onChange={v => h('turnover_reduction_pct', v / 100)} suffix="%" compact step={1} showNumericInput numericValue={Math.round(inputs.turnover_reduction_pct * 100)} onNumericChange={v => h('turnover_reduction_pct', v / 100)} />
                            </div>
                        </div>

                        {/* 5. Additional Financials */}
                        <div className="space-y-3">
                            <h3 className="text-[11px] font-black text-emerald-700 flex items-center gap-2.5 uppercase tracking-[0.2em]">
                                <DollarSign className="w-3.5 h-3.5" /> Additional Financials
                            </h3>
                            <div className="grid grid-cols-2 gap-x-3 gap-y-3">
                                <NumericInput label="Initial CAPEX" value={inputs.initial_capex} onChange={v => h('initial_capex', v)} prefix="€" compact step={100} />
                                <SliderControl label="Reinvest %" value={Math.round(inputs.reinvest_pct * 100)} onChange={v => h('reinvest_pct', v / 100)} suffix="%" compact step={1} showNumericInput numericValue={Math.round(inputs.reinvest_pct * 100)} onNumericChange={v => h('reinvest_pct', v / 100)} />
                                <NumericInput label="Gov. Subsidies" value={inputs.gov_subsidies} onChange={v => h('gov_subsidies', v)} prefix="€" compact step={100} />
                                <SliderControl label="WACC" value={Math.round(inputs.wacc * 100)} onChange={v => h('wacc', v / 100)} suffix="%" compact step={1} showNumericInput numericValue={Math.round(inputs.wacc * 100)} onNumericChange={v => h('wacc', v / 100)} />
                            </div>
                        </div>

                        {/* 6. Impact Potentials */}
                        <div className="space-y-3">
                            <h3 className="text-[11px] font-black text-amber-700 flex items-center gap-2.5 uppercase tracking-[0.2em]">
                                <Zap className="w-3.5 h-3.5" /> Impact Potentials
                            </h3>
                            <div className="space-y-3">
                                <SliderControl label="Disruption Impact" value={inputs.disruption_impact} onChange={v => h('disruption_impact', v)} suffix="" compact />
                                <SliderControl label="Carbon Reduction" value={inputs.carbon_reduction_potential} onChange={v => h('carbon_reduction_potential', v)} suffix="%" compact step={1} showNumericInput numericValue={inputs.carbon_reduction_potential} onNumericChange={v => h('carbon_reduction_potential', v)} />
                                <div className="grid grid-cols-2 gap-3">
                                    <SliderControl label="Scope 1" value={inputs.scope_1_reduction} onChange={v => h('scope_1_reduction', v)} suffix="%" compact step={1} showNumericInput numericValue={inputs.scope_1_reduction} onNumericChange={v => h('scope_1_reduction', v)} />
                                    <SliderControl label="Scope 2" value={inputs.scope_2_reduction} onChange={v => h('scope_2_reduction', v)} suffix="%" compact step={1} showNumericInput numericValue={inputs.scope_2_reduction} onNumericChange={v => h('scope_2_reduction', v)} />
                                </div>
                                <SliderControl label="Scope 3" value={inputs.scope_3_reduction} onChange={v => h('scope_3_reduction', v)} suffix="%" compact step={1} showNumericInput numericValue={inputs.scope_3_reduction} onNumericChange={v => h('scope_3_reduction', v)} />
                            </div>
                        </div>

                        {/* 7. Advanced Settings */}
                        <div className="pt-3 border-t border-slate-200">
                            <button
                                onClick={() => setShowAdvanced(!showAdvanced)}
                                className="flex items-center justify-between w-full py-2.5 px-3 rounded-lg text-xs font-semibold transition-all group border border-slate-200 bg-slate-50 hover:bg-teal-50 hover:border-teal-400 text-slate-600"
                            >
                                <span className="group-hover:text-teal-700 transition-colors tracking-widest uppercase text-[10px]">Financial Settings</span>
                                {showAdvanced ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            </button>

                            {showAdvanced && (
                                <div className="mt-3 space-y-3 pl-3 border-l-2 border-teal-400 animate-fade-in">
                                    <div className="grid grid-cols-2 gap-3">
                                        <NumericInput label="Tax Rate" value={Math.round(inputs.tax_rate * 100)} onChange={v => h('tax_rate', v / 100)} suffix="%" compact />
                                        <NumericInput label="Discount" value={Math.round(inputs.discount_rate * 100)} onChange={v => h('discount_rate', v / 100)} suffix="%" compact />
                                        <NumericInput label="Depr. Years" value={Math.round(inputs.depreciation_years)} onChange={v => h('depreciation_years', v)} suffix="Y" compact />
                                        <NumericInput label="Inflation" value={Math.round(inputs.inflation_rate * 100)} onChange={v => h('inflation_rate', v / 100)} suffix="%" compact />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Mobile methodology link */}
                        <div className="sm:hidden pt-3 border-t border-slate-200">
                            <button type="button" onClick={() => setMethodologyOpen(true)} className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-teal-600 hover:text-teal-700">
                                <FileText className="w-3.5 h-3.5" /> Methodology & assumptions
                            </button>
                        </div>
                    </div>
                </aside>

                {/* ── Main Content (Results) ── Offset by sidebar width on desktop */}
                <main className="order-1 lg:order-none bg-slate-50 p-3 sm:p-4 lg:p-5 space-y-3 sm:space-y-4 lg:ml-[360px]">

                    {/* Row 1: Scorecards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
                        <ScoreCard title="Economic" score={outputs?.scores?.economic || 0} icon={DollarSign} color="blue" tooltipText="Index: normalized score 0–100. See Methodology & assumptions for details." />
                        <ScoreCard title="Environmental" score={outputs?.scores?.environmental || 0} icon={Leaf} color="green" tooltipText="Index: normalized score 0–100. Environmental outputs are proxies for directional comparison." />
                        <ScoreCard title="Strategic" score={outputs?.scores?.strategic || 0} icon={TrendingUp} color="amber" tooltipText="Index: normalized score 0–100. See Methodology & assumptions for details." />
                        <ScoreCard title="Overall Score" score={outputs?.scores?.overall || 0} icon={Zap} isMain tooltipText="Composite index normalized to 0–100. See Methodology & assumptions for details." />
                    </div>

                    {/* Row 2: Projection Charts & Heatmap */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
                        <div className="min-h-[280px] sm:min-h-[320px] bg-white rounded-xl border border-slate-200 shadow-sm animate-fade-in" style={{ animationDelay: '0.1s' }}>
                            <ProjectionChart
                                data={outputs?.projections}
                                title="Sales"
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
                        <div className="min-h-[280px] sm:min-h-[320px] bg-white rounded-xl border border-slate-200 shadow-sm animate-fade-in" style={{ animationDelay: '0.15s' }}>
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
                        <div className="md:col-span-2 lg:col-span-1 min-h-[280px] sm:min-h-[320px] bg-white rounded-xl border border-slate-200 shadow-sm animate-fade-in" style={{ animationDelay: '0.2s' }}>
                            <ImpactHeatmap cells={outputs?.heatmap} />
                        </div>
                    </div>

                    {/* Row 3: Deep Metrics */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm animate-fade-in" style={{ animationDelay: '0.25s' }}>
                        <DeepMetricsPanel details={outputs?.details} keyDrivers={outputs?.key_drivers} />
                    </div>

                    {/* Row 4: Alerts & Strategy Balance */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-2.5 sm:gap-3">
                        <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200 shadow-sm animate-fade-in" style={{ animationDelay: '0.3s' }}>
                            <AlertBox alerts={outputs?.alerts} />
                        </div>
                        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm animate-fade-in p-4 sm:p-5" style={{ animationDelay: '0.35s' }}>
                            <RadarPlot scores={outputs?.scores} />
                        </div>
                    </div>

                    {/* Footer inside main */}
                    <footer className="pt-4 mt-2 border-t border-slate-200 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-[10px] sm:text-xs text-slate-500 pb-2">
                        <button type="button" onClick={() => setMethodologyOpen(true)} className="font-bold uppercase tracking-widest text-teal-600 hover:text-teal-700 hover:underline">
                            Methodology & assumptions
                        </button>
                        <span className="font-medium">Green Investment Impact Simulator</span>
                    </footer>
                </main>
            </div>

            <MethodologyPanel isOpen={methodologyOpen} onClose={() => setMethodologyOpen(false)} />

            <style jsx>{`
                .input-field {
                    background-color: #ffffff;
                    border: 1px solid #e2e8f0;
                    border-radius: 0.5rem;
                    padding: 0.5rem 0.75rem;
                    font-size: 12px;
                    font-weight: 700;
                    color: #0f172a;
                    outline: none;
                    cursor: pointer;
                    transition: border-color 0.2s, box-shadow 0.2s;
                    font-family: 'Outfit', sans-serif;
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
                .input-field:focus { border-color: #0d9488; box-shadow: 0 0 0 2px rgba(13, 148, 136, 0.15); }
                .input-field option {
                    background-color: #ffffff !important;
                    color: #0f172a !important;
                    padding: 12px;
                    font-weight: 700;
                }
                .customized-scrollbar::-webkit-scrollbar { width: 5px; }
                .customized-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .customized-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 9999px; }
                .customized-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
            `}</style>
        </div>
    );
};

export default ClimateSimulator;
