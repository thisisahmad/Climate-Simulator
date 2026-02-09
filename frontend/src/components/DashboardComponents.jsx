import React from 'react';
import {
    ResponsiveContainer,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from 'recharts';
import { AlertTriangle, Info, CheckCircle, CheckCircle2, XCircle, X } from 'lucide-react';

const MetricTooltip = ({ text, id }) => {
    const [show, setShow] = React.useState(false);
    return (
        <span className="relative inline-flex ml-0.5">
            <button type="button" aria-label="Info" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} className="text-slate-400 hover:text-teal-600 focus:outline-none">
                <Info className="w-3 h-3" />
            </button>
            {show && (
                <span className="absolute left-0 top-6 z-50 w-48 sm:w-56 p-2 text-[10px] font-medium text-slate-700 bg-white border border-slate-200 rounded-lg shadow-lg" role="tooltip">
                    {text}
                </span>
            )}
        </span>
    );
};

export const SliderControl = ({ label, value, min = 0, max = 100, step = 1, onChange, suffix = "", compact = false, showNumericInput = false, numericValue, onNumericChange }) => (
    <div className="group w-full">
        <div className={`flex justify-between items-center gap-2 ${compact ? 'mb-2' : 'mb-3'}`}>
            <label className={`${compact ? 'text-[11px]' : 'text-xs'} font-bold text-slate-600 uppercase tracking-[0.15em] group-hover:text-teal-600 transition-colors`}>
                {label} {suffix && <span className="text-[10px] text-slate-500 ml-1">{suffix}</span>}
            </label>
            <div className="flex items-center gap-1.5 shrink-0">
                {showNumericInput && onNumericChange != null && (
                    <input type="number" min={min} max={max} step={step} value={numericValue ?? value} onChange={(e) => onNumericChange(parseFloat(e.target.value) || 0)} className="w-12 sm:w-14 text-right rounded border border-slate-300 px-1.5 py-0.5 text-[11px] font-bold text-teal-600 focus:border-teal-500 focus:ring-1 focus:ring-teal-500" />
                )}
                {!showNumericInput && <span className={`${compact ? 'text-[11px]' : 'text-sm'} font-black text-teal-600 tabular-nums`}>{Math.round(value)}</span>}
            </div>
        </div>
        <div className="relative flex items-center min-h-[44px] py-2 sm:py-0 sm:h-6">
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(parseFloat(e.target.value))}
                className="w-full cursor-pointer appearance-none bg-transparent touch-none sm:touch-auto"
                style={{
                    '--value': `${((value - min) / (max - min)) * 100}%`
                }}
            />
        </div>
        <style jsx>{`
        input[type=range] {
            height: 6px;
            background: linear-gradient(to right, #0d9488 0%, #14b8a6 var(--value), #cbd5e1 var(--value), #cbd5e1 100%);
            border-radius: 9999px;
            outline: none;
            transition: background 0.1s ease-in-out;
        }
        input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: ${compact ? '20px' : '24px'};
            width: ${compact ? '20px' : '24px'};
            border-radius: 50%;
            background: white;
            cursor: pointer;
            box-shadow: 0 0 12px rgba(13, 148, 136, 0.4);
            margin-top: ${compact ? '-7.5px' : '-9.5px'}; 
            transition: transform 0.1s;
        }
        input[type=range]::-webkit-slider-thumb:hover {
            transform: scale(1.2);
        }
        input[type=range]::-moz-range-thumb {
            height: ${compact ? '20px' : '24px'};
            width: ${compact ? '20px' : '24px'};
            border-radius: 50%;
            background: white;
            cursor: pointer;
            box-shadow: 0 0 12px rgba(13, 148, 136, 0.4);
            border: none;
            transition: transform 0.1s;
        }
        input[type=range]::-moz-range-thumb:hover {
            transform: scale(1.2);
        }
    `}</style>
    </div>
);

export const ScoreCard = ({ title, score, icon: Icon, isMain = false, color = "blue", tooltipText }) => {
    const getGradient = () => {
        if (isMain) return "from-teal-600 to-teal-700";
        if (color === "blue") return "from-amber-500 to-orange-600";
        if (color === "green") return "from-emerald-500 to-teal-600";
        if (color === "amber") return "from-rose-500 to-red-600";
        return "from-cyan-500 to-teal-600";
    };

    const getBorder = () => {
        if (isMain) return "border-teal-300";
        return "border-slate-200 hover:border-slate-300";
    }

    return (
        <div className={`glass-card rounded-lg p-3 sm:p-4 lg:p-5 flex flex-col items-start justify-between min-h-[88px] sm:min-h-[96px] lg:h-full relative overflow-hidden group ${getBorder()} ${isMain ? 'bg-teal-50' : 'bg-white'}`}>
            <div className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-slate-100 to-transparent rounded-full -mr-6 -mt-6 sm:-mr-8 sm:-mt-8 pointer-events-none"></div>

            <div className="flex justify-between w-full items-start z-10">
                <h3 className={`text-[9px] sm:text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.25em] truncate max-w-[70%] flex items-center gap-0.5 ${isMain ? 'text-teal-700' : 'text-slate-600'}`}>
                    {title} {tooltipText && <MetricTooltip text={tooltipText} />}
                </h3>
                {Icon && <Icon className={`w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 ${isMain ? 'text-teal-600' : 'text-slate-500'}`} />}
            </div>

            <div className="z-10 mt-auto">
                <div className={`text-4xl sm:text-5xl lg:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r ${getGradient()} tracking-tighter leading-none`}>
                    {Math.round(score)}
                </div>
            </div>
        </div>
    );
};

export const ImpactHeatmap = ({ cells, rows = ['Economic', 'Environmental', 'Strategic'], cols = ['Upside', 'Risk', 'Feasibility'] }) => {
    if (!cells || cells.length === 0) return null;

    const getCell = (r, c) => cells.find(cell => cell.row === r && cell.col === c);

    const getColorClass = (val, color) => {
        if (color === 'red') return 'bg-rose-100 text-rose-700 border border-rose-300';
        if (color === 'yellow') return 'bg-amber-100 text-amber-800 border border-amber-300';
        if (color === 'green') return 'bg-emerald-100 text-emerald-700 border border-emerald-300';
        return 'bg-slate-100 text-slate-700 border border-slate-300';
    };

    return (
        <div className="h-full flex flex-col p-3 sm:p-4 lg:p-6">
            <h3 className="text-[10px] sm:text-[12px] font-bold text-slate-700 uppercase tracking-[0.2em] sm:tracking-[0.25em] mb-4 sm:mb-6 lg:mb-8">Impact Matrix</h3>
            <div className="flex-1 grid grid-cols-4 gap-x-2 gap-y-2 sm:gap-x-4 sm:gap-y-4 min-w-0">
                {/* Header IPs */}
                <div className="col-span-1"></div>
                {cols.map(c => (
                    <div key={c} className="flex items-center justify-center font-bold text-[8px] sm:text-[10px] uppercase text-slate-600 tracking-[0.1em] sm:tracking-[0.2em] text-center truncate">{c}</div>
                ))}

                {/* Rows IPs */}
                {rows.map(r => (
                    <React.Fragment key={r}>
                        <div className="flex items-center text-[8px] sm:text-[10px] font-bold uppercase text-slate-600 tracking-[0.1em] sm:tracking-[0.2em] truncate">{r}</div>
                        {cols.map(c => {
                            const cell = getCell(r, c);
                            return (
                                <div key={`${r}-${c}`} className={`h-8 sm:h-10 lg:h-11 rounded-full flex items-center justify-center transition-all hover:scale-[1.05] min-w-0 ${getColorClass(cell?.value, cell?.color)}`}>
                                    <span className="text-sm sm:text-base lg:text-xl font-black tracking-tight">{cell ? Math.round(cell.value) : '-'}</span>
                                </div>
                            );
                        })}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export const RadarPlot = ({ scores }) => {
    if (!scores) return null;
    const data = [
        { subject: 'Economic', A: scores.economic, fullMark: 100 },
        { subject: 'Strategy', A: scores.strategic, fullMark: 100 },
        { subject: 'Environ.', A: scores.environmental, fullMark: 100 },
    ];

    return (
        <div className="h-full w-full flex flex-col min-h-[140px]">
            <h3 className="text-[10px] sm:text-xs font-bold text-slate-600 uppercase tracking-wider mb-1 sm:mb-2 w-full text-left">Balance</h3>
            <div className="flex-1 min-h-[120px] -ml-2 sm:-ml-4">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="85%" data={data}>
                        <PolarGrid stroke="#94a3b8" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 9, fontWeight: 700 }} />
                        <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar
                            name="Score"
                            dataKey="A"
                            stroke="#0d9488"
                            strokeWidth={2}
                            fill="#0d9488"
                            fillOpacity={0.35}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', color: '#0f172a', border: '1px solid #e2e8f0' }}
                            itemStyle={{ color: '#0d9488' }}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export const AlertBox = ({ alerts }) => {
    if (!alerts || alerts.length === 0) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-slate-500">
                <CheckCircle className="mb-3 h-8 w-8 text-emerald-500" />
                <p className="text-sm font-medium text-slate-600">System nominal. No critical alerts.</p>
            </div>
        )
    }

    const getSeverityStyles = (s) => {
        switch (s) {
            case 'high': return 'bg-rose-50 border-l-rose-500 text-rose-800';
            case 'medium': return 'bg-amber-50 border-l-amber-500 text-amber-800';
            case 'low': return 'bg-blue-50 border-l-blue-500 text-blue-800';
            default: return 'bg-slate-50 border-l-slate-400 text-slate-700';
        }
    }

    return (
        <div className="h-full flex flex-col overflow-hidden">
            <h3 className="text-[10px] sm:text-[12px] font-bold text-slate-700 uppercase tracking-[0.2em] mb-3 sm:mb-6 flex items-center gap-2 sm:gap-3 px-3 sm:px-6 pt-3 sm:pt-6">
                <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 text-amber-500 flex-shrink-0" /> System Alerts
            </h3>
            <div className="flex-1 overflow-y-auto customized-scrollbar px-3 sm:px-6 pb-3 sm:pb-6">
                {alerts.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-slate-600">
                        <CheckCircle2 className="h-16 w-16 mb-5 opacity-20" />
                        <span className="text-base font-black opacity-40 tracking-[0.2em] uppercase">System nominal</span>
                        <span className="text-[11px] font-medium opacity-30 tracking-widest mt-2 uppercase">No critical alerts detected.</span>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {alerts.map((alert, idx) => (
                            <div key={idx} className={`p-3 sm:p-5 rounded-xl border border-slate-200 border-l-[4px] sm:border-l-[6px] text-xs sm:text-sm shadow-sm ${getSeverityStyles(alert.severity)}`}>
                                <div className="font-black uppercase mb-1 sm:mb-1.5 text-[9px] sm:text-[10px] tracking-[0.2em] opacity-90">{alert.severity} Priority</div>
                                <div className="leading-relaxed font-semibold">{alert.message}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const formatMetric = (value, unit) => {
    if (value == null || value === undefined) return '–';
    if (typeof value === 'string') return value;
    if (Number.isInteger(value)) return value;
    return Number(value).toFixed(1);
};

const KeyDriversSnippet = ({ drivers }) => {
    if (!drivers || drivers.length === 0) return null;
    return (
        <p className="text-[9px] text-slate-500 mt-1 leading-tight">Key drivers: {drivers.slice(0, 3).join(', ')}</p>
    );
};

export const DeepMetricsPanel = ({ details, keyDrivers }) => {
    if (!details) return null;

    const MetricBox = ({ label, value, unit, color, tooltipText }) => (
        <div className="bg-slate-50 rounded-lg p-2 sm:p-3 border border-slate-200 flex flex-col items-center justify-center text-center group hover:bg-slate-100 transition-colors min-w-0">
            <span className="text-[7px] sm:text-[8px] uppercase font-bold text-slate-600 tracking-[0.15em] sm:tracking-[0.2em] mb-0.5 sm:mb-1 group-hover:text-slate-700 truncate w-full flex items-center justify-center gap-0.5">
                {label} {tooltipText && <MetricTooltip text={tooltipText} />}
            </span>
            <div className={`text-sm sm:text-base lg:text-lg font-black ${color || 'text-slate-800'} tabular-nums leading-none`}>
                {formatMetric(value, unit)}<span className="text-[8px] sm:text-[9px] ml-0.5 font-bold text-slate-500">{unit}</span>
            </div>
        </div>
    );

    const MetricWithDrivers = ({ label, value, unit, color, tooltipText, drivers }) => (
        <div className="min-w-0">
            <div className="bg-slate-50 rounded-lg p-2 sm:p-3 border border-slate-200 flex flex-col items-center justify-center text-center group hover:bg-slate-100 transition-colors">
                <span className="text-[7px] sm:text-[8px] uppercase font-bold text-slate-600 tracking-[0.15em] sm:tracking-[0.2em] mb-0.5 sm:mb-1 flex items-center justify-center gap-0.5">
                    {label} {tooltipText && <MetricTooltip text={tooltipText} />}
                </span>
                <div className={`text-sm sm:text-base lg:text-lg font-black ${color || 'text-slate-800'} tabular-nums leading-none`}>
                    {formatMetric(value, unit)}<span className="text-[8px] sm:text-[9px] ml-0.5 font-bold text-slate-500">{unit}</span>
                </div>
                <KeyDriversSnippet drivers={drivers} />
            </div>
        </div>
    );

    return (
        <div className="h-full flex flex-col p-2 sm:p-4 overflow-hidden">
            <h3 className="text-[9px] sm:text-[11px] font-bold text-slate-700 uppercase tracking-[0.2em] mb-2 sm:mb-4">Deep Dive Indicators (19)</h3>

            <div className="flex-1 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 customized-scrollbar pr-1">
                {/* Finance */}
                <div>
                    <h4 className="text-[8px] sm:text-[9px] font-bold text-blue-700 uppercase mb-1 sm:mb-2 tracking-[0.2em] border-l-4 border-blue-500 pl-2">Finance</h4>
                    <div className="grid grid-cols-1 gap-1.5">
                        <MetricWithDrivers label="ROI" value={details.roi_percent} unit="%" color={details.roi_percent > 0 ? "text-emerald-400" : "text-rose-400"} drivers={keyDrivers?.roi} />
                        <MetricWithDrivers label="IRR" value={details.irr_percent} unit="%" drivers={keyDrivers?.irr} />
                        <MetricWithDrivers label="NPV" value={details.npv != null ? Math.round(details.npv) : null} unit="€" drivers={keyDrivers?.npv} />
                        <MetricWithDrivers label="Payback" value={details.payback_years} unit="Yrs" drivers={keyDrivers?.payback_years} />
                        <MetricBox label="Disc. Payback" value={details.discounted_payback_years} unit="Yrs" />
                        <MetricWithDrivers label="Break Even" value={details.break_even_year} unit="Yr" drivers={keyDrivers?.break_even_year} />
                        <MetricBox label="Viability" value={details.financial_viability} unit="/100" />
                        <MetricBox label="TCO" value={details.tco_k} unit="K€" />
                    </div>
                </div>

                {/* Carbon (4) */}
                <div>
                    <h4 className="text-[8px] sm:text-[9px] font-bold text-emerald-700 uppercase mb-1 sm:mb-2 tracking-[0.2em] border-l-4 border-emerald-500 pl-2">Carbon</h4>
                    <div className="grid grid-cols-1 gap-1.5">
                        <MetricBox label="Reduction (Proxy)" value={details.carbon_reduction_tons} unit="tCO2e" color="text-emerald-300" tooltipText="Estimated carbon reduction from efficiency and targets. Proxy for directional comparison, not certified reporting." />
                        <MetricBox label="Cost/Ton CO2" value={details.cost_per_ton_co2} unit="€" />
                        <MetricBox label="Carbon Intensity" value={details.carbon_intensity_kg_per_1k_revenue} unit="kg CO2e/€1k" tooltipText="Index: kg CO2e per €1,000 revenue. Derived from carbon reduction proxy and revenue; for comparison only." />
                        <MetricBox label="Net Zero" value={details.net_zero_progress} unit="%" />
                    </div>
                </div>

                {/* Efficiency (4) */}
                <div>
                    <h4 className="text-[8px] sm:text-[9px] font-bold text-cyan-700 uppercase mb-1 sm:mb-2 tracking-[0.2em] border-l-4 border-cyan-500 pl-2">Efficiency</h4>
                    <div className="grid grid-cols-1 gap-1.5">
                        <MetricBox label="Energy Savings" value={details.energy_savings_mwh} unit="MWh" />
                        <MetricBox label="Water Savings" value={details.water_savings_kl} unit="KL" />
                        <MetricBox label="Waste Diversion" value={details.waste_diversion_index} unit="%" tooltipText="Indicative index from waste reduction and circular economy inputs, not measured quantities." />
                        <MetricBox label="Res. Efficiency" value={details.resource_efficiency_index} unit="/100" tooltipText="Indicative index combining energy, resource, waste and circular inputs; not measured quantities." />
                    </div>
                </div>

                {/* Risk & ESG (4) */}
                <div>
                    <h4 className="text-[8px] sm:text-[9px] font-bold text-amber-700 uppercase mb-1 sm:mb-2 tracking-[0.2em] border-l-4 border-amber-500 pl-2">Risk & ESG</h4>
                    <div className="grid grid-cols-1 gap-1.5">
                        <MetricWithDrivers label="ESG Score" value={details.esg_score} unit="/100" drivers={keyDrivers?.esg_score} />
                        <MetricBox label="Resilience" value={details.resilience_index} unit="Idx" color="text-amber-200" tooltipText="Strategic resilience index from reputation, productivity, turnover and market access; normalized 0–100." />
                        <MetricBox label="Emp. Engage" value={details.employee_engagement} unit="/100" />
                        <div className="bg-slate-50 rounded-lg p-2 sm:p-2.5 border border-slate-200 flex flex-col items-center justify-center text-center">
                            <span className="text-[7px] sm:text-[8px] uppercase font-bold text-slate-600 tracking-[0.2em] mb-0.5 sm:mb-1">Exec Risk</span>
                            <div className={`text-[9px] sm:text-[10px] font-black uppercase px-1.5 sm:px-2 py-0.5 rounded ${details.execution_risk_factor === 'High' ? 'bg-rose-100 text-rose-700 border border-rose-300' : (details.execution_risk_factor === 'Medium' ? 'bg-amber-100 text-amber-700 border border-amber-300' : 'bg-emerald-100 text-emerald-700 border border-emerald-300')}`}>
                                {details.execution_risk_factor}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const NumericInput = ({ label, value, onChange, prefix = "", suffix = "", type = "number", compact = false, step }) => (
    <div className="group w-full">
        <label className={`block ${compact ? 'text-[9px] sm:text-[10px]' : 'text-[10px] sm:text-xs'} font-bold text-slate-600 uppercase tracking-[0.15em] mb-1 sm:mb-1.5 group-hover:text-teal-600 transition-colors`}>
            {label}
        </label>
        <div className="relative">
            {prefix && <span className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-[10px] sm:text-[11px]">{prefix}</span>}
            <input
                type={type}
                step={step}
                value={type === "number" ? Math.round(value) : value}
                onChange={(e) => onChange(type === "number" ? Math.round(parseFloat(e.target.value)) || 0 : e.target.value)}
                className={`w-full rounded-lg min-h-[44px] sm:min-h-0 border ${compact ? 'py-2 sm:py-1.5' : 'py-2.5'} ${prefix ? 'pl-6 sm:pl-7' : 'pl-3'} pr-7 sm:pr-8 text-[11px] font-bold text-slate-800 outline-none transition-all bg-white border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 placeholder:text-slate-400`}
            />
            {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-[11px]">{suffix}</span>}
        </div>
    </div>
);

export const ProjectionChart = ({ data, title, dataKeyA, dataKeyB, labelA = "Scenario A", labelB = "Scenario B", prefix = "", showLineA = true, showLineB = true, onToggleA, onToggleB }) => {
    if (!data || data.length === 0) return null;

    const formatYAxis = (tickItem) => {
        if (tickItem >= 1000000) return `${Math.round(tickItem / 1000000)}M`;
        if (tickItem >= 1000) return `${Math.round(tickItem / 1000)}K`;
        return Math.round(tickItem);
    };

    return (
        <div className="h-full w-full flex flex-col p-2 sm:p-4 min-h-0">
            <div className="flex items-center justify-between gap-2 mb-2 sm:mb-4 flex-shrink-0">
                <h3 className="text-[10px] sm:text-[12px] font-bold text-slate-700 uppercase tracking-[0.2em] sm:tracking-[0.25em]">{title}</h3>
                <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-wider">
                    {onToggleA && (
                        <label className="flex items-center gap-1 cursor-pointer text-slate-600">
                            <input type="checkbox" checked={showLineA !== false} onChange={(e) => onToggleA(e.target.checked)} className="rounded border-slate-400 text-teal-600 focus:ring-teal-500" />
                            <span style={{ color: '#64748b' }}>{labelA}</span>
                        </label>
                    )}
                    {onToggleB && (
                        <label className="flex items-center gap-1 cursor-pointer text-slate-600">
                            <input type="checkbox" checked={showLineB !== false} onChange={(e) => onToggleB(e.target.checked)} className="rounded border-slate-400 text-teal-600 focus:ring-teal-500" />
                            <span style={{ color: '#0d9488' }}>{labelB}</span>
                        </label>
                    )}
                </div>
            </div>
            <div className="w-full h-[220px] sm:h-[260px] lg:min-h-[220px] lg:h-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" vertical={false} />
                        <XAxis
                            dataKey="year"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#475569', fontSize: 9, fontWeight: 700 }}
                            label={{ value: 'Years', position: 'insideBottom', offset: -5, fill: '#64748b', fontSize: 9, fontWeight: 700, textAnchor: 'middle' }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#475569', fontSize: 9, fontWeight: 700 }}
                            tickFormatter={formatYAxis}
                            width={32}
                        />
                        <Tooltip
                            formatter={(value) => [Math.round(value), ""]}
                            contentStyle={{
                                backgroundColor: '#ffffff',
                                border: '1px solid #e2e8f0',
                                borderRadius: '8px',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                            }}
                            labelStyle={{ color: '#0f172a', fontWeight: 700, marginBottom: '5px' }}
                        />
                        <Legend
                            verticalAlign="top"
                            height={28}
                            iconType="circle"
                            wrapperStyle={{ fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em' }}
                        />
                        {showLineA !== false && (
                            <Line
                                type="monotone"
                                dataKey={dataKeyA}
                                name={labelA}
                                stroke="#64748b"
                                strokeWidth={2}
                                dot={{ fill: '#475569', r: 3 }}
                                activeDot={{ r: 5, strokeWidth: 0 }}
                            />
                        )}
                        {showLineB !== false && (
                            <Line
                                type="monotone"
                                dataKey={dataKeyB}
                                name={labelB}
                                stroke="#0d9488"
                                strokeWidth={2}
                                dot={{ fill: '#0f766e', r: 3 }}
                                activeDot={{ r: 5, strokeWidth: 0 }}
                                animationDuration={1500}
                            />
                        )}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export const MethodologyPanel = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto customized-scrollbar p-6 sm:p-8" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-start mb-6">
                    <h2 className="text-lg sm:text-xl font-black text-slate-800 uppercase tracking-wider">Methodology & assumptions</h2>
                    <button type="button" onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 text-slate-500" aria-label="Close">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <p className="text-sm font-semibold text-slate-700 mb-6 leading-relaxed">
                    Environmental outputs are proxies intended for directional comparison, not certified reporting.
                </p>
                <h3 className="text-xs font-black text-slate-600 uppercase tracking-widest mb-3">Key default assumptions</h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-slate-700 mb-6">
                    <li>Energy cost share default: 20% of OPEX</li>
                    <li>Electricity price default: €0.15/kWh</li>
                    <li>Water intensity default: 1 L per €1 revenue (manufacturing baseline) unless otherwise specified</li>
                    <li>Waste proxy and resource efficiency are indicative indices, not measured quantities</li>
                </ul>
                <p className="text-sm text-slate-600">
                    Score outputs are normalized and clamped to a 0–100 range.
                </p>
            </div>
        </div>
    );
};
