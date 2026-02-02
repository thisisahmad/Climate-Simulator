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
import { AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react';

export const SliderControl = ({ label, value, min = 0, max = 100, step = 1, onChange, suffix = "", compact = false }) => (
    <div className="group w-full">
        <div className={`flex justify-between ${compact ? 'mb-2' : 'mb-3'}`}>
            <label className={`${compact ? 'text-[11px]' : 'text-xs'} font-black text-slate-400 uppercase tracking-[0.15em] group-hover:text-indigo-400 transition-colors`}>
                {label} {suffix && <span className="text-[10px] opacity-60 ml-1">{suffix}</span>}
            </label>
            <span className={`${compact ? 'text-[11px]' : 'text-sm'} font-black text-indigo-400 tabular-nums`}>{Math.round(value)}</span>
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
            height: 5px;
            background: linear-gradient(to right, #6366f1 0%, #0ea5e9 var(--value), #334155 var(--value), #334155 100%);
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
            box-shadow: 0 0 12px rgba(99, 102, 241, 0.6);
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
            box-shadow: 0 0 12px rgba(99, 102, 241, 0.6);
            border: none;
            transition: transform 0.1s;
        }
        input[type=range]::-moz-range-thumb:hover {
            transform: scale(1.2);
        }
    `}</style>
    </div>
);

export const ScoreCard = ({ title, score, icon: Icon, isMain = false, color = "blue" }) => {
    const getGradient = () => {
        if (isMain) return "from-purple-500 to-indigo-600";
        if (color === "blue") return "from-amber-400 to-orange-500"; // Economic (Yellow in image)
        if (color === "green") return "from-orange-400 to-amber-500"; // Environmental (Orange in image)
        if (color === "amber") return "from-rose-500 to-red-600"; // Strategic (Red in image)
        return "from-emerald-500 to-teal-400";
    };

    const getBorder = () => {
        if (isMain) return "border-purple-500/30";
        return "border-slate-800/80 hover:border-slate-700/80";
    }

    return (
        <div className={`glass-card rounded-lg p-3 sm:p-4 lg:p-5 flex flex-col items-start justify-between min-h-[88px] sm:min-h-[96px] lg:h-full relative overflow-hidden group ${getBorder()} ${isMain ? 'bg-indigo-900/10' : 'bg-slate-900/40'}`}>
            <div className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-white/5 to-transparent rounded-full -mr-6 -mt-6 sm:-mr-8 sm:-mt-8 pointer-events-none"></div>

            <div className="flex justify-between w-full items-start z-10">
                <h3 className={`text-[9px] sm:text-[10px] lg:text-[11px] font-black uppercase tracking-[0.15em] sm:tracking-[0.25em] truncate max-w-[70%] ${isMain ? 'text-indigo-300/80' : 'text-slate-500'}`}>{title}</h3>
                {Icon && <Icon className={`w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 ${isMain ? 'text-indigo-400' : 'text-slate-700'}`} />}
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
        if (color === 'red') return 'bg-rose-900/30 text-rose-400 border border-rose-500/20';
        if (color === 'yellow') return 'bg-amber-900/30 text-amber-400 border border-amber-500/20';
        if (color === 'green') return 'bg-emerald-900/30 text-emerald-400 border border-emerald-500/20';
        return 'bg-slate-800/40 text-slate-500 border border-slate-700/50';
    };

    return (
        <div className="h-full flex flex-col p-3 sm:p-4 lg:p-6">
            <h3 className="text-[10px] sm:text-[12px] font-black text-slate-500 uppercase tracking-[0.2em] sm:tracking-[0.25em] mb-4 sm:mb-6 lg:mb-8">Impact Matrix</h3>
            <div className="flex-1 grid grid-cols-4 gap-x-2 gap-y-2 sm:gap-x-4 sm:gap-y-4 min-w-0">
                {/* Header IPs */}
                <div className="col-span-1"></div>
                {cols.map(c => (
                    <div key={c} className="flex items-center justify-center font-black text-[8px] sm:text-[10px] uppercase text-slate-600 tracking-[0.1em] sm:tracking-[0.2em] text-center truncate">{c}</div>
                ))}

                {/* Rows IPs */}
                {rows.map(r => (
                    <React.Fragment key={r}>
                        <div className="flex items-center text-[8px] sm:text-[10px] font-black uppercase text-slate-500 tracking-[0.1em] sm:tracking-[0.2em] truncate">{r}</div>
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
            <h3 className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 sm:mb-2 w-full text-left">Balance</h3>
            <div className="flex-1 min-h-[120px] -ml-2 sm:-ml-4">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="85%" data={data}>
                        <PolarGrid stroke="#334155" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 9, fontWeight: 800 }} />
                        <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar
                            name="Score"
                            dataKey="A"
                            stroke="#6366f1"
                            strokeWidth={2}
                            fill="#6366f1"
                            fillOpacity={0.4}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc' }}
                            itemStyle={{ color: '#818cf8' }}
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
            <div className="h-full flex flex-col items-center justify-center text-slate-600">
                <CheckCircle className="mb-3 h-8 w-8 opacity-20" />
                <p className="text-sm font-medium">System nominal. No critical alerts.</p>
            </div>
        )
    }

    const getSeverityStyles = (s) => {
        switch (s) {
            case 'high': return 'bg-rose-950/30 border-l-rose-500 text-rose-200';
            case 'medium': return 'bg-amber-950/30 border-l-amber-500 text-amber-200';
            case 'low': return 'bg-indigo-950/30 border-l-indigo-500 text-indigo-200';
            default: return 'bg-slate-800 border-l-slate-500';
        }
    }

    return (
        <div className="h-full flex flex-col overflow-hidden">
            <h3 className="text-[10px] sm:text-[12px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 sm:mb-6 flex items-center gap-2 sm:gap-3 px-3 sm:px-6 pt-3 sm:pt-6">
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
                            <div key={idx} className={`p-3 sm:p-5 rounded-xl border border-white/5 border-l-[4px] sm:border-l-[6px] text-xs sm:text-sm shadow-sm ${getSeverityStyles(alert.severity)}`}>
                                <div className="font-black uppercase mb-1 sm:mb-1.5 opacity-80 text-[9px] sm:text-[10px] tracking-[0.2em]">{alert.severity} Priority</div>
                                <div className="leading-relaxed font-bold">{alert.message}</div>
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

export const DeepMetricsPanel = ({ details }) => {
    if (!details) return null;

    const MetricBox = ({ label, value, unit, color }) => (
        <div className="bg-slate-800/10 rounded-lg p-2 sm:p-3 border border-slate-700/30 flex flex-col items-center justify-center text-center group hover:bg-slate-800/40 transition-colors min-w-0">
            <span className="text-[7px] sm:text-[8px] uppercase font-black text-slate-600 tracking-[0.15em] sm:tracking-[0.2em] mb-0.5 sm:mb-1 group-hover:text-slate-500 truncate w-full">{label}</span>
            <div className={`text-sm sm:text-base lg:text-lg font-black ${color || 'text-slate-200'} tabular-nums leading-none`}>
                {formatMetric(value, unit)}<span className="text-[8px] sm:text-[9px] ml-0.5 font-black opacity-30">{unit}</span>
            </div>
        </div>
    );

    return (
        <div className="h-full flex flex-col p-2 sm:p-4 overflow-hidden">
            <h3 className="text-[9px] sm:text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 sm:mb-4">Deep Dive Indicators (19)</h3>

            <div className="flex-1 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 customized-scrollbar pr-1">
                {/* Finance (7) */}
                <div>
                    <h4 className="text-[8px] sm:text-[9px] font-black text-indigo-400/80 uppercase mb-1 sm:mb-2 tracking-[0.2em] border-l-4 border-indigo-500/40 pl-2">Finance</h4>
                    <div className="grid grid-cols-1 gap-1.5">
                        <MetricBox label="ROI" value={details.roi_percent} unit="%" color={details.roi_percent > 0 ? "text-emerald-400" : "text-rose-400"} />
                        <MetricBox label="IRR" value={details.irr_percent} unit="%" />
                        <MetricBox label="Payback" value={details.payback_years} unit="Yrs" />
                        <MetricBox label="Disc. Payback" value={details.discounted_payback_years} unit="Yrs" />
                        <MetricBox label="Break Even" value={details.break_even_year} unit="Yr" />
                        <MetricBox label="Viability" value={details.financial_viability} unit="/100" />
                        <MetricBox label="TCO" value={details.tco_k} unit="K€" />
                    </div>
                </div>

                {/* Carbon (4) */}
                <div>
                    <h4 className="text-[8px] sm:text-[9px] font-black text-emerald-400/80 uppercase mb-1 sm:mb-2 tracking-[0.2em] border-l-4 border-emerald-500/40 pl-2">Carbon</h4>
                    <div className="grid grid-cols-1 gap-1.5">
                        <MetricBox label="Reduction (Proxy)" value={details.carbon_reduction_tons} unit="tCO2e" color="text-emerald-300" />
                        <MetricBox label="Cost/Ton CO2" value={details.cost_per_ton_co2} unit="€" />
                        <MetricBox label="Intensity (Index)" value={details.carbon_intensity_index} unit="kg/1K€" />
                        <MetricBox label="Net Zero" value={details.net_zero_progress} unit="%" />
                    </div>
                </div>

                {/* Efficiency (4) */}
                <div>
                    <h4 className="text-[8px] sm:text-[9px] font-black text-cyan-400/80 uppercase mb-1 sm:mb-2 tracking-[0.2em] border-l-4 border-cyan-500/40 pl-2">Efficiency</h4>
                    <div className="grid grid-cols-1 gap-1.5">
                        <MetricBox label="Energy Savings" value={details.energy_savings_mwh} unit="MWh" />
                        <MetricBox label="Water Savings" value={details.water_savings_kl} unit="KL" />
                        <MetricBox label="Waste Diversion" value={details.waste_diversion_index} unit="%" />
                        <MetricBox label="Res. Efficiency" value={details.resource_efficiency_index} unit="/100" />
                    </div>
                </div>

                {/* Risk & ESG (4) */}
                <div>
                    <h4 className="text-[8px] sm:text-[9px] font-black text-amber-400/80 uppercase mb-1 sm:mb-2 tracking-[0.2em] border-l-4 border-amber-500/40 pl-2">Risk & ESG</h4>
                    <div className="grid grid-cols-1 gap-1.5">
                        <MetricBox label="ESG Score" value={details.esg_score} unit="/100" />
                        <MetricBox label="Resilience" value={details.resilience_index} unit="Idx" color="text-amber-200" />
                        <MetricBox label="Emp. Engage" value={details.employee_engagement} unit="/100" />
                        <div className="bg-slate-800/10 rounded-lg p-2 sm:p-2.5 border border-slate-700/30 flex flex-col items-center justify-center text-center">
                            <span className="text-[7px] sm:text-[8px] uppercase font-black text-slate-600 tracking-[0.2em] mb-0.5 sm:mb-1">Exec Risk</span>
                            <div className={`text-[9px] sm:text-[10px] font-black uppercase px-1.5 sm:px-2 py-0.5 rounded ${details.execution_risk_factor === 'High' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' : (details.execution_risk_factor === 'Medium' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30')}`}>
                                {details.execution_risk_factor}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const NumericInput = ({ label, value, onChange, prefix = "", suffix = "", type = "number", compact = false }) => (
    <div className="group w-full">
        <label className={`block ${compact ? 'text-[9px] sm:text-[10px]' : 'text-[10px] sm:text-xs'} font-black text-slate-500 uppercase tracking-[0.15em] mb-1 sm:mb-1.5 group-hover:text-indigo-400 transition-colors`}>
            {label}
        </label>
        <div className="relative">
            {prefix && <span className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-[10px] sm:text-[11px]">{prefix}</span>}
            <input
                type={type}
                value={type === "number" ? Math.round(value) : value}
                onChange={(e) => onChange(type === "number" ? Math.round(parseFloat(e.target.value)) || 0 : e.target.value)}
                className={`w-full bg-slate-800/40 border border-slate-700/50 rounded-lg min-h-[44px] sm:min-h-0 ${compact ? 'py-2 sm:py-1.5' : 'py-2.5'} ${prefix ? 'pl-6 sm:pl-7' : 'pl-3'} pr-7 sm:pr-8 text-[11px] font-bold text-slate-200 outline-none focus:border-indigo-500 transition-all shadow-inner`}
            />
            {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-[11px]">{suffix}</span>}
        </div>
    </div>
);

export const ProjectionChart = ({ data, title, dataKeyA, dataKeyB, labelA = "Traditional", labelB = "Sustainable", prefix = "" }) => {
    if (!data || data.length === 0) return null;

    const formatYAxis = (tickItem) => {
        if (tickItem >= 1000000) return `${Math.round(tickItem / 1000000)}M`;
        if (tickItem >= 1000) return `${Math.round(tickItem / 1000)}K`;
        return Math.round(tickItem);
    };

    return (
        <div className="h-full w-full flex flex-col p-2 sm:p-4 min-h-0">
            <h3 className="text-[10px] sm:text-[12px] font-black text-slate-500 uppercase tracking-[0.2em] sm:tracking-[0.25em] mb-2 sm:mb-4 flex-shrink-0">{title}</h3>
            <div className="flex-1 w-full min-h-[180px] sm:min-h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                        <XAxis
                            dataKey="year"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 9, fontWeight: 700 }}
                            label={{ value: 'Years', position: 'insideBottom', offset: -5, fill: '#475569', fontSize: 9, fontWeight: 900, textAnchor: 'middle' }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 9, fontWeight: 700 }}
                            tickFormatter={formatYAxis}
                            width={32}
                        />
                        <Tooltip
                            formatter={(value) => [Math.round(value), ""]}
                            contentStyle={{
                                backgroundColor: '#0f172a',
                                border: '1px solid #334155',
                                borderRadius: '8px',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.4)'
                            }}
                            labelStyle={{ color: '#94a3b8', fontWeight: 900, marginBottom: '5px' }}
                        />
                        <Legend
                            verticalAlign="top"
                            height={28}
                            iconType="circle"
                            wrapperStyle={{ fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em' }}
                        />
                        <Line
                            type="monotone"
                            dataKey={dataKeyA}
                            name={labelA}
                            stroke="#94a3b8"
                            strokeWidth={2}
                            dot={{ fill: '#64748b', r: 3 }}
                            activeDot={{ r: 5, strokeWidth: 0 }}
                        />
                        <Line
                            type="monotone"
                            dataKey={dataKeyB}
                            name={labelB}
                            stroke="#6366f1"
                            strokeWidth={2}
                            dot={{ fill: '#4f46e5', r: 3 }}
                            activeDot={{ r: 5, strokeWidth: 0 }}
                            animationDuration={1500}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
