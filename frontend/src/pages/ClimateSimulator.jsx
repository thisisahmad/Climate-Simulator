import React, { useState, useEffect } from 'react';
import { calculateSmeImpact } from '../services/api';
import { NumericInput, SliderControl, ScoreCard, ImpactHeatmap, RadarPlot, AlertBox, DeepMetricsPanel, ProjectionChart } from '../components/DashboardComponents';
import { ChevronDown, ChevronUp, Settings, Activity, Zap, BarChart3, Globe, Shield, AlertTriangle, TrendingUp, DollarSign, Leaf, Users } from 'lucide-react';

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
        <div className="flex flex-col min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-800 via-slate-950 to-black text-slate-100 font-sans overflow-x-hidden">
            {/* -- Top Header Bar -- */}
            <div className="flex-none h-12 sm:h-14 border-b border-indigo-500/10 flex items-center justify-between px-4 sm:px-6 bg-slate-900/40 backdrop-blur-md">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <Activity className="text-white w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="min-w-0">
                        <h1 className="text-xs sm:text-sm font-black tracking-tighter text-slate-100 uppercase truncate">SME Resilience Simulator V2</h1>
                        <p className="hidden sm:block text-[9px] font-bold text-indigo-400/60 uppercase tracking-widest leading-none">Scenario-Driven Financial Analysis</p>
                    </div>
                </div>
            </div>

            {/* -- Main Content -- */}
            <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-2 p-2 sm:p-3 overflow-y-auto overflow-x-hidden">

                {/* -- Left Panel: Inputs -- */}
                <div className="w-full lg:w-[380px] lg:flex-none flex flex-col glass-panel rounded-xl overflow-hidden border-indigo-500/10 shadow-2xl lg:max-h-[calc(100vh-5rem)]">
                    <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-white/5 bg-slate-800/20 flex items-center gap-3">
                        <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400 flex-shrink-0" />
                        <h2 className="text-[11px] sm:text-[12px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-slate-300">Parameters</h2>
                    </div>

                    <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 customized-scrollbar max-h-[60vh] lg:max-h-none">

                        {/* 1. General Info */}
                        <div className="space-y-4">
                            <h3 className="text-[11px] font-black text-indigo-400 mb-4 flex items-center gap-3 uppercase tracking-[0.25em]">
                                <Users className="w-4 h-4" /> Company Profile
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="text-[9px] uppercase font-black text-slate-500 tracking-wider">Industry</label>
                                    <select value={inputs.industry} onChange={e => h('industry', e.target.value)} className="input-field w-full">
                                        {['Manufacturing', 'Services', 'Food', 'Logistics'].map(opt => <option key={opt}>{opt}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] uppercase font-black text-slate-500 tracking-wider">Horizon</label>
                                    <select value={inputs.forecast_horizon} onChange={e => h('forecast_horizon', parseInt(e.target.value))} className="input-field w-full">
                                        {[5, 7, 10].map(opt => <option key={opt} value={opt}>{opt} Years</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* 2. Baseline Financials */}
                        <div className="space-y-6">
                            <h3 className="text-[11px] font-black text-emerald-400 mb-4 flex items-center gap-3 uppercase tracking-[0.25em]">
                                <DollarSign className="w-4 h-4" /> Baseline Financials
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
                                <NumericInput label="Init. Revenue" value={inputs.initial_revenue} onChange={v => h('initial_revenue', v)} prefix="€" compact />
                                <NumericInput label="Fixed Costs" value={inputs.fixed_costs} onChange={v => h('fixed_costs', v)} prefix="€" compact />
                                <SliderControl label="Var. Costs" value={Math.round(inputs.variable_costs_pct * 100)} onChange={v => h('variable_costs_pct', v / 100)} suffix="%" compact />
                                <SliderControl label="Rev. Growth" value={Math.round(inputs.revenue_growth_rate * 100)} onChange={v => h('revenue_growth_rate', v / 100)} suffix="%" compact />
                            </div>
                        </div>

                        {/* 3. Sustainability Strategy */}
                        <div className="space-y-6">
                            <h3 className="text-[11px] font-black text-indigo-400 mb-4 flex items-center gap-3 uppercase tracking-[0.25em]">
                                <Leaf className="w-4 h-4" /> Sustainability Strategy
                            </h3>
                            <NumericInput label="Sustainability CAPEX" value={inputs.sustainability_capex} onChange={v => h('sustainability_capex', v)} prefix="€" />
                            <div className="space-y-4">
                                <h4 className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Efficiency Gains</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <SliderControl label="Energy Efficiency" value={Math.round(inputs.energy_efficiency_pct * 100)} onChange={v => h('energy_efficiency_pct', v / 100)} suffix="%" compact />
                                    <SliderControl label="Waste Reduction" value={Math.round(inputs.waste_reduction_pct * 100)} onChange={v => h('waste_reduction_pct', v / 100)} suffix="%" compact />
                                    <SliderControl label="Resource Efficiency" value={Math.round(inputs.resource_efficiency_pct * 100)} onChange={v => h('resource_efficiency_pct', v / 100)} suffix="%" compact />
                                    <SliderControl label="Circular Economy" value={Math.round(inputs.circular_economy_pct * 100)} onChange={v => h('circular_economy_pct', v / 100)} suffix="%" compact />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Market & Reputation</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <SliderControl label="Reputation Uplift" value={Math.round(inputs.reputation_uplift_pct * 100)} onChange={v => h('reputation_uplift_pct', v / 100)} suffix="%" compact />
                                    <SliderControl label="Green Market Access" value={Math.round(inputs.green_market_access_pct * 100)} onChange={v => h('green_market_access_pct', v / 100)} suffix="%" compact />
                                </div>
                            </div>
                        </div>

                        {/* 4. Employee & Productivity (METRICS_DOC) */}
                        <div className="space-y-6">
                            <h3 className="text-[11px] font-black text-cyan-400 mb-4 flex items-center gap-3 uppercase tracking-[0.25em]">
                                <Users className="w-4 h-4" /> Employee & Productivity
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
                                <NumericInput label="Employees" value={inputs.num_employees} onChange={v => h('num_employees', v)} compact />
                                <SliderControl label="Employee Growth" value={Math.round(inputs.employee_growth_rate * 100)} onChange={v => h('employee_growth_rate', v / 100)} suffix="%" compact />
                                <SliderControl label="Productivity Gain" value={Math.round(inputs.productivity_gain_pct * 100)} onChange={v => h('productivity_gain_pct', v / 100)} suffix="%" compact />
                                <SliderControl label="Turnover Reduction" value={Math.round(inputs.turnover_reduction_pct * 100)} onChange={v => h('turnover_reduction_pct', v / 100)} suffix="%" compact />
                            </div>
                        </div>

                        {/* 5. Additional Financials (METRICS_DOC) */}
                        <div className="space-y-6">
                            <h3 className="text-[11px] font-black text-emerald-400 mb-4 flex items-center gap-3 uppercase tracking-[0.25em]">
                                <DollarSign className="w-4 h-4" /> Additional Financials
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
                                <NumericInput label="Initial CAPEX" value={inputs.initial_capex} onChange={v => h('initial_capex', v)} prefix="€" compact />
                                <SliderControl label="Reinvest %" value={Math.round(inputs.reinvest_pct * 100)} onChange={v => h('reinvest_pct', v / 100)} suffix="%" compact />
                                <NumericInput label="Gov. Subsidies" value={inputs.gov_subsidies} onChange={v => h('gov_subsidies', v)} prefix="€" compact />
                                <SliderControl label="WACC" value={Math.round(inputs.wacc * 100)} onChange={v => h('wacc', v / 100)} suffix="%" compact />
                            </div>
                        </div>

                        {/* 4. Impact Potentials (instructions (1).docx Mandatory) */}
                        <div className="space-y-6">
                            <h3 className="text-[11px] font-black text-amber-400 mb-4 flex items-center gap-3 uppercase tracking-[0.25em]">
                                <Zap className="w-4 h-4" /> Impact Potentials
                            </h3>
                            <div className="space-y-4">
                                <SliderControl label="Disruption Impact" value={inputs.disruption_impact} onChange={v => h('disruption_impact', v)} suffix="" compact />
                                <SliderControl label="Carbon Reduction" value={inputs.carbon_reduction_potential} onChange={v => h('carbon_reduction_potential', v)} suffix="%" compact />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <SliderControl label="Scope 1" value={inputs.scope_1_reduction} onChange={v => h('scope_1_reduction', v)} suffix="%" compact />
                                    <SliderControl label="Scope 2" value={inputs.scope_2_reduction} onChange={v => h('scope_2_reduction', v)} suffix="%" compact />
                                </div>
                                <SliderControl label="Scope 3" value={inputs.scope_3_reduction} onChange={v => h('scope_3_reduction', v)} suffix="%" compact />
                            </div>
                        </div>

                        {/* 5. Advanced Settings */}
                        <div className="pt-2 border-t border-slate-700/50">
                            <button
                                onClick={() => setShowAdvanced(!showAdvanced)}
                                className="flex items-center justify-between w-full py-2 px-3 bg-slate-800/40 border border-slate-700/50 rounded-lg text-xs font-semibold hover:bg-slate-700/50 transition-all group"
                            >
                                <span className="group-hover:text-indigo-400 transition-colors tracking-widest uppercase text-[10px]">Financial Settings</span>
                                {showAdvanced ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            </button>

                            {showAdvanced && (
                                <div className="mt-4 space-y-4 pl-4 border-l border-indigo-500/20 animate-fade-in">
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

                {/* -- Right Panel: Results -- */}
                <div className="flex-1 flex flex-col gap-3 min-h-0 min-w-0">

                    {/* Row 1: Scorecards - 2x2 on mobile, 4 cols on md+ */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 flex-none">
                        <ScoreCard title="Economic" score={outputs?.scores?.economic || 0} icon={DollarSign} color="blue" />
                        <ScoreCard title="Environmental" score={outputs?.scores?.environmental || 0} icon={Leaf} color="green" />
                        <ScoreCard title="Strategic" score={outputs?.scores?.strategic || 0} icon={TrendingUp} color="amber" />
                        <ScoreCard title="Overall Score" score={outputs?.scores?.overall || 0} icon={Zap} isMain />
                    </div>

                    {/* Row 2: Projection Charts & Heatmap - stack on mobile/tablet, 3 cols on lg+ */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-2 sm:gap-3 flex-none">
                        <div className="lg:col-span-4 min-h-[260px] sm:min-h-[300px] lg:min-h-[340px] glass-panel rounded-xl animate-fade-in shadow-xl bg-slate-900/40" style={{ animationDelay: '0.1s' }}>
                            <ProjectionChart
                                data={outputs?.projections}
                                title="Revenue"
                                dataKeyA="revenue_a"
                                dataKeyB="revenue_b"
                            />
                        </div>
                        <div className="lg:col-span-4 min-h-[260px] sm:min-h-[300px] lg:min-h-[340px] glass-panel rounded-xl animate-fade-in shadow-xl bg-slate-900/40" style={{ animationDelay: '0.2s' }}>
                            <ProjectionChart
                                data={outputs?.projections}
                                title="Net Profit"
                                dataKeyA="profit_a"
                                dataKeyB="profit_b"
                            />
                        </div>
                        <div className="md:col-span-2 lg:col-span-4 min-h-[220px] sm:min-h-[260px] lg:min-h-[340px] glass-panel rounded-xl animate-fade-in shadow-xl bg-slate-900/40" style={{ animationDelay: '0.3s' }}>
                            <ImpactHeatmap cells={outputs?.heatmap} />
                        </div>
                    </div>

                    {/* Row 3: Deep Metrics & Balance/Alerts - stack on mobile, side-by-side on lg+ */}
                    <div className="flex-1 min-h-[400px] lg:min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-3 overflow-auto">
                        <div className="lg:col-span-12 glass-panel rounded-xl animate-fade-in overflow-hidden relative shadow-lg min-h-0" style={{ animationDelay: '0.4s' }}>
                            <div className="grid grid-cols-1 lg:grid-cols-12 h-full min-h-[360px] lg:min-h-0">
                                <div className="lg:col-span-8 border-b lg:border-b-0 lg:border-r border-white/5 min-h-[280px]">
                                    <DeepMetricsPanel details={outputs?.details} />
                                </div>
                                <div className="lg:col-span-4 flex flex-col min-h-[240px]">
                                    <div className="flex-1 min-h-[120px] border-b border-white/5 overflow-hidden">
                                        <AlertBox alerts={outputs?.alerts} />
                                    </div>
                                    <div className="h-36 sm:h-44 p-3 sm:p-4 flex-shrink-0">
                                        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Strategy Balance</h3>
                                        <RadarPlot scores={outputs?.scores} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <style jsx>{`
                .input-field {
                    @apply bg-slate-900 border border-indigo-500/30 rounded px-3 py-2 text-[12px] font-black text-white focus:border-indigo-500 outline-none transition-all cursor-pointer shadow-xl;
                    font-family: 'Inter', sans-serif;
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    appearance: none;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23818cf8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
                    background-repeat: no-repeat;
                    background-position: right 0.75rem center;
                    background-size: 1rem;
                    padding-right: 2.5rem;
                }
                .input-field option {
                    background-color: #0f172a !important;
                    color: #ffffff !important;
                    padding: 12px;
                    font-weight: 700;
                }
                .glass-panel {
                    @apply bg-slate-900/60 backdrop-blur-xl border border-white/5;
                }
                .customized-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .customized-scrollbar::-webkit-scrollbar-track {
                    @apply bg-transparent;
                }
                .customized-scrollbar::-webkit-scrollbar-thumb {
                    @apply bg-slate-700/50 rounded-full hover:bg-slate-600/50;
                }
            `}</style>
        </div>
    );
};

export default ClimateSimulator;
