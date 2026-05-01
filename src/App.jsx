import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  TrendingUp, Box, Database, Users, Calculator, 
  MapPin, Clock, Layers, Send, CheckCircle, 
  ArrowRight, Activity, Cpu, Shield, Zap, GitBranch, Terminal,
  Network, MessageCircle, Factory, Scale, Check,
  Server, Lock, Globe, Leaf, Briefcase, HeartPulse, BarChart3, LineChart, Target
} from 'lucide-react';

// --- Global Animation Utility ---
const Reveal = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-16 scale-95'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- Formatters ---
const formatCurrency = (value) => {
  if (value == null || isNaN(value)) return '$0';
  if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
  return `$${value.toFixed(0)}`;
};
const formatNumber = (value) => {
  if (value == null || isNaN(value)) return '0';
  if (value >= 1000000) return `${(value / 1000000).toFixed(2)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return value.toLocaleString();
};

// --- Dynamic Interactive Chart Component ---
const DynamicChart = ({ data, theme }) => {
  return (
    <Reveal delay={100} className="bg-slate-900 p-5 sm:p-6 md:p-8 rounded-3xl md:rounded-[2.5rem] my-8 sm:my-12 relative overflow-hidden group border border-slate-800 shadow-2xl">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px] sm:bg-[size:20px_20px] opacity-20"></div>
      <div className={`absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-${theme.colorName}-500/10 blur-[60px] sm:blur-[80px] rounded-full pointer-events-none transition-all duration-1000 group-hover:scale-110`}></div>
      
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-8 sm:mb-10 relative z-10 gap-4">
        <div>
          <h4 className="text-lg sm:text-xl font-bold mb-1 flex items-center gap-2 text-white">
            <BarChart3 className={`w-4 h-4 sm:w-5 sm:h-5 text-${theme.colorName}-400 shrink-0`}/> 
            <span className="truncate">{data.title}</span>
          </h4>
          <p className="text-[10px] sm:text-xs text-slate-400 font-mono tracking-widest uppercase truncate">{data.subtitle}</p>
        </div>
      </div>
      
      <div className="flex items-end gap-2 sm:gap-4 md:gap-6 h-40 sm:h-48 md:h-56 relative z-10 border-b border-slate-700/50 pb-2">
        {data.points.map((d, i) => (
          <div key={i} className="flex-1 flex flex-col justify-end gap-1 sm:gap-2 h-full group/bar relative">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-max flex flex-col items-center text-[8px] sm:text-[10px] font-mono text-slate-400 opacity-0 group-hover/bar:opacity-100 transition-opacity bg-slate-800 px-2 py-1 rounded shadow-lg z-20 pointer-events-none">
              <span className={`text-${theme.colorName}-400`}>{d.val1Label}: {d.val1}</span>
              <span className="text-slate-300">{d.val2Label}: {d.val2}</span>
            </div>
            <div className="w-full flex items-end gap-0.5 sm:gap-1 h-full bg-slate-800/30 rounded-t-xl sm:rounded-t-2xl p-0.5 sm:p-1 relative overflow-hidden">
              <div className={`w-1/2 bg-gradient-to-t from-${theme.colorName}-800 to-${theme.colorName}-400 rounded-t-lg sm:rounded-t-xl transition-all duration-1000 relative group-hover/bar:from-${theme.colorName}-600 group-hover/bar:to-${theme.colorName}-300`} style={{ height: `${d.val1Pct}%` }}></div>
              <div className={`w-1/2 bg-gradient-to-t from-slate-700 to-slate-400 rounded-t-lg sm:rounded-t-xl transition-all duration-1000 relative group-hover/bar:from-slate-600 group-hover/bar:to-slate-300`} style={{ height: `${d.val2Pct}%` }}></div>
            </div>
            <div className="text-center text-[8px] sm:text-xs font-bold text-slate-500 mt-1 sm:mt-2 truncate w-full">{d.label}</div>
          </div>
        ))}
      </div>
      
      <div className="flex flex-wrap gap-3 sm:gap-6 mt-4 sm:mt-6 justify-center relative z-10 text-[8px] sm:text-xs font-mono">
        <div className="flex items-center gap-1.5 sm:gap-2"><div className={`w-2 h-2 sm:w-3 sm:h-3 shrink-0 bg-${theme.colorName}-500 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.2)]`}></div> <span className="text-slate-300 truncate">{data.points[0].val1Label}</span></div>
        <div className="flex items-center gap-1.5 sm:gap-2"><div className="w-2 h-2 sm:w-3 sm:h-3 shrink-0 bg-slate-400 rounded-full"></div> <span className="text-slate-300 truncate">{data.points[0].val2Label}</span></div>
      </div>
    </Reveal>
  );
};

// --- Dynamic Case Study Renderer ---
const CaseStudyViewer = ({ study, onReturnToHub }) => {
  const theme = study.theme;
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12 flex flex-col lg:flex-row gap-8 lg:gap-14 relative w-full overflow-hidden lg:overflow-visible">
      {/* Sidebar Index - Glassmorphic */}
      <aside className="hidden lg:block w-[260px] xl:w-[280px] shrink-0">
        <div className="sticky top-32 bg-white/60 backdrop-blur-2xl border border-slate-200/60 p-5 xl:p-6 rounded-[2rem] xl:rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
          <button onClick={onReturnToHub} className="mb-6 flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-slate-400 hover:text-slate-900 transition-colors cursor-pointer w-full text-left">
             <ArrowRight className="w-3 h-3 rotate-180 shrink-0" /> <span className="truncate">Back to Hub</span>
          </button>
          
          <div className="mb-8">
            <h1 className="text-xl xl:text-2xl font-bold tracking-tighter text-slate-900 leading-tight break-words">{study.title}</h1>
            <h2 className="text-[10px] xl:text-xs font-semibold text-slate-500 mt-2 tracking-wide uppercase break-words">
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.gradientText}`}>{study.subtitle}</span>
            </h2>
          </div>
          <h5 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Index Directory</h5>
          
          <nav className="space-y-3 text-xs text-slate-600 font-medium border-l-2 border-slate-100 pl-4 max-h-[35vh] overflow-y-auto no-scrollbar relative group">
            {study.sections.map((sec, i) => (
              <a key={i} href={`#sec-${study.id}-${i}`} className={`block hover:${theme.text} transition-all duration-300 truncate hover:translate-x-1 pr-2`}>
                {sec.index ? `${sec.index}. ` : ''}{sec.title}
              </a>
            ))}
            <a href={`#sim-${study.id}`} className={`block ${theme.text} transition-all duration-300 hover:translate-x-1 flex items-center gap-2 font-bold mt-4 pt-4 border-t border-slate-100 pr-2`}>
              <Calculator className="w-3.5 h-3.5 shrink-0" /> <span className="truncate">ROI Simulator</span>
            </a>
          </nav>
          <div className={`mt-8 pt-6 border-t border-slate-100`}>
            <h5 className="text-[10px] font-bold uppercase tracking-widest text-slate-900 mb-3">Specification</h5>
            <ul className="space-y-2 text-[10px] xl:text-xs text-slate-500 font-mono">
              <li className="flex justify-between items-center gap-2"><span className="opacity-70 shrink-0">Target:</span> <span className="text-slate-900 font-semibold truncate text-right">{study.spec.target}</span></li>
              <li className="flex justify-between items-center gap-2"><span className="opacity-70 shrink-0">Scale:</span> <span className="text-slate-900 font-semibold truncate text-right">{study.spec.scale}</span></li>
              <li className="flex justify-between items-center gap-2"><span className="opacity-70 shrink-0">Metric:</span> <span className={`${theme.text} font-bold truncate text-right`}>{study.spec.metric}</span></li>
            </ul>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full min-w-0 max-w-full lg:max-w-4xl pb-16 md:pb-32">
        <Reveal>
          <header className="mb-6 lg:hidden bg-white/60 backdrop-blur-xl border border-slate-200/60 p-5 sm:p-6 rounded-[2rem] shadow-sm relative">
            <button onClick={onReturnToHub} className="absolute top-4 sm:top-5 right-4 sm:right-6 flex items-center gap-1.5 sm:gap-2 text-[8px] sm:text-[10px] font-bold tracking-widest uppercase text-slate-400 hover:text-slate-900 transition-colors cursor-pointer bg-slate-100/50 p-1.5 sm:px-3 sm:py-1.5 rounded-full">
               <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 rotate-180 shrink-0" /> <span className="hidden sm:inline">Hub</span>
            </button>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter text-slate-900 leading-tight mb-2 mt-4 sm:mt-2 pr-12 sm:pr-20 break-words">{study.title}</h1>
            <h2 className="text-xs sm:text-sm font-semibold text-slate-500 tracking-wide uppercase break-words">
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.gradientText}`}>{study.subtitle}</span>
            </h2>
          </header>
        </Reveal>

        {/* Engineering Trust Telemetry Banner */}
        <Reveal delay={50} className="mb-8 md:mb-12 overflow-x-auto no-scrollbar pb-2">
          <div className="flex flex-nowrap sm:flex-wrap items-center gap-4 sm:gap-6 md:gap-8 border-y border-slate-200/80 py-3 sm:py-4 px-2 text-[10px] sm:text-xs font-mono text-slate-600 bg-white/40 backdrop-blur-sm rounded-xl min-w-max sm:min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2"><Shield className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${theme.text} shrink-0`} /> <span className="font-bold text-slate-900 whitespace-nowrap">{study.trust.compliance}</span></div>
            <div className="w-px h-3 sm:h-4 bg-slate-300 shrink-0"></div>
            <div className="flex items-center gap-1.5 sm:gap-2"><Activity className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${theme.text} shrink-0`} /> <span className="font-bold text-slate-900 whitespace-nowrap">Uptime: {study.trust.uptime}</span></div>
            <div className="w-px h-3 sm:h-4 bg-slate-300 shrink-0"></div>
            <div className="flex items-center gap-1.5 sm:gap-2"><Database className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${theme.text} shrink-0`} /> <span className="font-bold text-slate-900 whitespace-nowrap">{study.trust.dataVolume}</span></div>
          </div>
        </Reveal>

        {study.sections.map((section, idx) => (
          <React.Fragment key={idx}>
            <Reveal delay={Math.min(idx * 20, 200)}>
              <div className="pt-8 md:pt-10 mt-8 md:mt-10 border-t border-slate-200/60 scroll-mt-24 md:scroll-mt-40 relative" id={`sec-${study.id}-${idx}`}>
                <div className="absolute -top-[1px] left-0 w-8 md:w-12 h-[2px] bg-gradient-to-r from-slate-300 to-transparent"></div>
                {section.index && (
                  <span className={`block text-[8px] sm:text-[10px] font-mono font-bold ${theme.text} mb-2 sm:mb-3 tracking-widest uppercase`}>
                    // {String(section.index).padStart(2, '0')}. {section.title}
                  </span>
                )}
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-900 mb-4 sm:mb-6 tracking-tight break-words">{section.title}</h2>
              </div>
            </Reveal>
            <Reveal delay={Math.min((idx * 20) + 20, 250)}>
              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-light tracking-wide space-y-4 sm:space-y-5 break-words" dangerouslySetInnerHTML={{__html: section.content}} />
            </Reveal>

            {/* Inject Interactive Chart dynamically after section 4 */}
            {idx === 4 && study.chartData && (
              <DynamicChart data={study.chartData} theme={theme} />
            )}

            {/* Render Metrics after section 8 if defined */}
            {idx === 8 && study.metrics && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 my-8 sm:my-12">
                {study.metrics.map((m, i) => (
                  <Reveal key={i} delay={i * 100} className="p-5 sm:p-6 rounded-3xl sm:rounded-[2rem] bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 group relative overflow-hidden flex flex-col items-start w-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-slate-50/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 ${theme.bgSoft} rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-500 ease-out relative z-10 shrink-0`}>
                      <m.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${theme.text}`} />
                    </div>
                    <div className="w-full">
                      <h4 className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 sm:mb-2 relative z-10 truncate">{m.title}</h4>
                      <div className="text-3xl sm:text-4xl font-light text-slate-900 mb-2 sm:mb-3 tracking-tighter relative z-10 truncate">{m.value}</div>
                      <p className="text-[10px] sm:text-xs text-slate-500 font-medium leading-relaxed relative z-10">{m.detail}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
          </React.Fragment>
        ))}

        {/* Dynamic Simulator Full Screen Block */}
        <DynamicSimulator config={study.simulator} theme={theme} id={`sim-${study.id}`} />
      </main>
    </div>
  );
};

// --- Dynamic 100vh Simulator Component ---
const DynamicSimulator = ({ config, theme, id }) => {
  const [values, setValues] = useState(config.initialValues);

  const handleSliderChange = (key, val) => {
    setValues(prev => ({ ...prev, [key]: Number(val) }));
  };

  const results = config.calculate(values);

  return (
    <Reveal className={`w-full ${theme.simBg} rounded-3xl sm:rounded-[3rem] mt-16 sm:mt-24 px-4 sm:px-6 md:px-12 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] border ${theme.simBorder} min-h-[100vh] flex flex-col justify-center py-12 sm:py-16 group`}>
      <div id={id} className="absolute -top-40"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] sm:bg-[size:40px_40px] opacity-50 group-hover:opacity-100 transition-opacity duration-1000"></div>
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full ${theme.simGlow} blur-[100px] sm:blur-[120px] rounded-[100%] pointer-events-none transition-all duration-1000 group-hover:scale-105`}></div>

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col gap-8 sm:gap-16">
        <div className="text-center max-w-3xl mx-auto px-2">
          <div className={`inline-flex items-center justify-center p-3 sm:p-4 ${theme.bgSoft} border ${theme.borderSoft} rounded-xl sm:rounded-2xl mb-4 sm:mb-6 backdrop-blur-xl shadow-lg relative overflow-hidden`}>
            <div className={`absolute inset-0 ${theme.bgSoft} animate-pulse`}></div>
            <Calculator className={`w-6 h-6 sm:w-8 sm:h-8 ${theme.text} relative z-10`} />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 sm:mb-6 leading-tight break-words">{config.title}</h2>
          <p className="text-slate-400 text-xs sm:text-sm md:text-base font-light leading-relaxed max-w-2xl mx-auto break-words">{config.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 xl:gap-20 items-stretch">
          <div className="space-y-6 sm:space-y-8 md:space-y-10 min-w-0 bg-slate-900/40 p-5 sm:p-6 md:p-8 rounded-3xl sm:rounded-[2.5rem] border border-slate-800/50 backdrop-blur-sm w-full">
            {config.sliders.map((slider, idx) => (
              <div key={idx} className="group/slider relative w-full">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-3 sm:mb-4 gap-1 sm:gap-4">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest break-words">{slider.label}</label>
                  <span className={`text-lg sm:text-xl md:text-2xl font-mono font-bold ${theme.text} tabular-nums break-words drop-shadow-[0_0_12px_rgba(255,255,255,0.1)]`}>
                    {slider.format ? slider.format(values[slider.key]) : values[slider.key]}
                  </span>
                </div>
                <div className="relative w-full">
                  <input 
                    type="range" min={slider.min} max={slider.max} step={slider.step} 
                    value={values[slider.key]} 
                    onChange={(e) => handleSliderChange(slider.key, e.target.value)} 
                    className={`w-full h-1.5 sm:h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer ${theme.accent} relative z-10 shadow-inner`} 
                  />
                  <div className={`absolute top-1/2 left-0 h-1.5 sm:h-2 -translate-y-1/2 rounded-lg pointer-events-none ${theme.simGlow} opacity-50 blur-sm`} style={{ width: `${((values[slider.key] - slider.min) / (slider.max - slider.min)) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>

          <div className={`bg-slate-950/80 rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-8 md:p-12 border ${theme.simBorder} shadow-[inset_0_0_40px_rgba(0,0,0,0.5),0_10px_40px_rgba(0,0,0,0.4)] relative overflow-hidden min-w-0 h-full flex flex-col justify-center`}>
            <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-${theme.colorName}-400 to-transparent opacity-50 scanline-animation`}></div>
            <div className="absolute -top-16 -right-16 sm:-top-32 sm:-right-32 w-48 h-48 sm:w-64 sm:h-64 bg-white/5 rounded-full blur-[60px] sm:blur-[80px] pointer-events-none"></div>
            
            <div className="space-y-8 sm:space-y-10 md:space-y-12 relative z-10 w-full">
              {results.map((res, idx) => (
                <div key={idx} className={`${res.primary ? "relative" : ""} w-full`}>
                  <div className={`text-[8px] sm:text-[10px] font-bold uppercase tracking-widest mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2 break-words ${res.primary ? theme.text : 'text-slate-500'}`}>
                    <Activity className={`w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 ${res.primary ? 'animate-pulse' : ''}`} /> {res.label}
                  </div>
                  <div className={`tabular-nums break-words leading-tight ${res.primary ? 'text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-bold tracking-tighter text-white mb-3 sm:mb-5 drop-shadow-[0_0_25px_rgba(255,255,255,0.15)]' : 'text-2xl sm:text-3xl font-mono text-slate-400 opacity-60 line-through decoration-slate-700 decoration-2'}`}>
                    {res.value}
                  </div>
                  {res.subtext && (
                    <div className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 ${theme.bgSoft} border ${theme.borderSoft} ${theme.text} text-[10px] sm:text-xs font-bold tracking-wide uppercase rounded-full tabular-nums shadow-lg break-words max-w-full`}>
                      <span className="truncate">{res.subtext}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
};

// --- DATA: 5 Core Industries ---
const caseStudiesData = [
  // 1. PSU ERP (Public Sector)
  {
    id: 'psu', industry: 'Public Sector', title: 'National PSU ERP Overhaul', subtitle: 'The Sovereign Cloud Migration.',
    theme: { colorName: 'amber', text: 'text-amber-500', bgSoft: 'bg-amber-500/10', borderSoft: 'border-amber-500/30', accent: 'accent-amber-500', gradientText: 'from-amber-600 to-orange-500', simBg: 'bg-[#0f0a05]', simBorder: 'border-amber-900/30', simGlow: 'bg-amber-900/20' },
    spec: { target: '2x State Energy PSUs', scale: '14,000+ Personnel', metric: '100% Legacy Modules Deprecated' },
    trust: { compliance: 'FedRAMP / ISO 27001', uptime: '99.999%', dataVolume: '4.2 PB Processed' },
    chartData: { title: 'Legacy vs Modern Query Latency', subtitle: 'P99 Latency (ms) across Financial Ledgers', points: [ {label: 'Q1', val1: 4200, val1Pct: 90, val1Label: 'Oracle EBS', val2: 120, val2Pct: 10, val2Label: 'New ERP'}, {label: 'Q2', val1: 4800, val1Pct: 100, val1Label: 'Oracle EBS', val2: 110, val2Pct: 9, val2Label: 'New ERP'}, {label: 'Q3', val1: 0, val1Pct: 0, val1Label: 'Oracle EBS', val2: 95, val2Pct: 8, val2Label: 'New ERP'}, {label: 'Q4', val1: 0, val1Pct: 0, val1Label: 'Oracle EBS', val2: 88, val2Pct: 7, val2Label: 'New ERP'} ] },
    metrics: [ { icon: Server, title: 'Legacy DBs Deprecated', value: '42', detail: 'Consolidated into a single unified hybrid-cloud lake.' }, { icon: Lock, title: 'Licensing Capital Freed', value: '$18.4M', detail: 'Eliminated monolithic SAP/Oracle seat licenses.' } ],
    sections: [
      { title: 'Executive Abstract', content: 'We secured the mandate to completely decommission and replace the fragmented, legacy ERP systems of two major Public Sector Undertakings (PSUs). We architected a sovereign, custom-built Enterprise OS from scratch, migrating 100% of their operational modules with zero operational downtime, reclaiming $18.4M in recurring licensing fees.' },
      { index: 1, title: 'The Legacy Paralysis', content: 'The PSUs were paralyzed by technological debt. They operated on 42 fragmented Oracle EBS and SAP ECC6 instances. B-tree index fragmentation caused P99 query latencies to spike to 4.8s during peak hours, costing $1.2M/min in dropped supply chain transactions.' },
      { index: 2, title: 'The Core Engineering Problem', content: 'The primary bottleneck was the database schema mismatch. We had to extract, transform, and load (ETL) 20 years of unstructured financial ledgers—over 4.2 Petabytes of data—into a modern relational schema without triggering state compliance violations.' },
      { index: 3, title: 'Sovereign Cloud Architecture', content: 'We deployed a microservices-based, event-driven architecture utilizing Apache Kafka for real-time state sync. To adhere to strict government data residency laws, the entire infrastructure was containerized via Kubernetes and deployed on a sovereign, air-gapped private cloud.' },
      { index: 4, title: 'Automated Procurement Module', content: 'We deprecated the legacy procurement portal, replacing it with a blockchain-anchored tendering module. This ensured 100% immutable audit trails for Comptroller audits, reducing average procurement cycles from 90 days to 14 days.' },
      { index: 5, title: 'Automated HR & Payroll Sync', content: 'The legacy HR system required manual intervention. Our module ingested IoT data from biometric scanners across 450 facilities, automating complex union-negotiated payroll calculations via AWS Lambda functions, reducing administrative overhead by 94%.' },
      { index: 6, title: 'Predictive Fleet Management', content: 'A custom predictive maintenance module was built to track over 12,000 grid assets. By processing high-frequency telemetry data via Kalman filters, the ERP automatically procures spare parts 12 days before predicted mechanical failure.' },
      { index: 7, title: 'Real-Time Financial Ledger', content: 'We built a unified accounting engine capable of 10,000+ TPS. Reconciliation happens instantaneously using Redis caching, providing the Ministry of Power with real-time semantic dashboards rather than 30-day delayed reports.' },
      { index: 8, title: 'Zero-Downtime Data Pipeline', content: 'We engineered a Change Data Capture (CDC) pipeline using Debezium. It asynchronously replicated transactions from the legacy databases into PostgreSQL clusters over a 6-month parallel run, allowing a seamless DNS cutover on launch.' },
      { index: 9, title: 'Military-Grade Security Vector', content: 'The system adheres to Zero-Trust principles. All data is AES-GCM-256 encrypted at rest. We implemented strict Role-Based Access Control (RBAC) integrated with National Identity APIs, eliminating insider threat vectors.' },
      { index: 10, title: 'Empirical Yield', content: 'The PSUs achieved a unified operational state, processing 14.2B rows daily with sub-90ms latency. Eliminating recurring monolithic licenses reclaimed $18.4M annually, solidifying our dominance in sovereign public-sector engineering.' }
    ],
    simulator: {
      title: 'Sovereign ERP ROI Calculator', description: 'Model the capital reclamation by deprecating legacy monolithic ERP licenses.',
      initialValues: { employees: 14000, legacyCost: 1200, maintenance: 4.5 },
      sliders: [
        { key: 'employees', label: 'Enterprise Headcount', min: 1000, max: 50000, step: 1000, format: formatNumber },
        { key: 'legacyCost', label: 'Legacy License Cost/Yr', min: 200, max: 3000, step: 100, format: v => `$${v}` },
        { key: 'maintenance', label: 'Annual AMC ($M)', min: 1, max: 20, step: 0.5, format: v => `$${v}M` }
      ],
      calculate: (v) => {
        const totalBleed = (v.employees * v.legacyCost) + (v.maintenance * 1000000);
        return [
          { label: 'Current Monolithic Bleed', value: formatCurrency(totalBleed), primary: false },
          { label: 'Capital Freed (Year 1)', value: formatCurrency(totalBleed * 0.92), primary: true, subtext: 'Reallocated to CAPEX' }
        ];
      }
    }
  },
  // 2. Kerala Dengue (Healthcare)
  {
    id: 'kerala', industry: 'Healthcare', title: 'Southern State Dengue Predictor', subtitle: 'Epidemiological Support System.',
    theme: { colorName: 'rose', text: 'text-rose-500', bgSoft: 'bg-rose-500/10', borderSoft: 'border-rose-500/30', accent: 'accent-rose-500', gradientText: 'from-rose-500 to-pink-600', simBg: 'bg-[#100508]', simBorder: 'border-rose-900/30', simGlow: 'bg-rose-900/20' },
    spec: { target: 'Southern State Health Min.', scale: '14 Districts', metric: '18-Day Predictive Lead Time' },
    trust: { compliance: 'HIPAA / ISO 27799', uptime: '99.99%', dataVolume: '1.2B Clinical Rows' },
    chartData: { title: 'Outbreak Mitigation vs Time', subtitle: 'Cluster Formations (Pre vs Post ERP)', points: [ {label: 'Jun', val1: 450, val1Pct: 90, val1Label: 'Legacy', val2: 320, val2Pct: 65, val2Label: 'Algo'}, {label: 'Jul', val1: 890, val1Pct: 100, val1Label: 'Legacy', val2: 410, val2Pct: 45, val2Label: 'Algo'}, {label: 'Aug', val1: 720, val1Pct: 80, val1Label: 'Legacy', val2: 280, val2Pct: 30, val2Label: 'Algo'}, {label: 'Sep', val1: 310, val1Pct: 40, val1Label: 'Legacy', val2: 95, val2Pct: 10, val2Label: 'Algo'} ] },
    metrics: [ { icon: HeartPulse, title: 'Outbreak Mitigation', value: '34% Drop', detail: 'In severe localized cluster outbreaks year-over-year.' }, { icon: MapPin, title: 'Spatial Accuracy', value: '92.4%', detail: 'Precision in predicting micro-ward vector breeding.' } ],
    sections: [
      { title: 'Executive Abstract', content: 'We partnered with a Southern State Government to architect a predictive Epidemiological Decision Support System (DSS). The objective was to transition the state\'s dengue fever response from reactive crisis management to proactive, algorithmic intervention using climatic and clinical data overlays.' },
      { index: 1, title: 'The Epidemiological Chaos', content: 'The Health Department relied on delayed, manual reporting from 4,000+ clinics. Data lag averaged 9 days. By the time a dengue cluster was identified on a spreadsheet, the outbreak had exponentially expanded, rendering fogging and vector-control interventions mathematically futile.' },
      { index: 2, title: 'The Core Engineering Problem', content: 'The primary bottleneck was data ingestion latency. We had to correlate unstructured, disparate clinical records with highly volatile external APIs tracking micro-climatic humidity, standing water accumulation, and municipal population density in real-time.' },
      { index: 3, title: 'Data Ingestion Architecture', content: 'We deployed an NLP-driven ingestion API capable of parsing unstructured PDFs, WhatsApp field reports, and legacy EMR data from rural clinics. This normalized 1.2B historical records into a centralized, highly-available semantic data lake.' },
      { index: 4, title: 'Climatic Correlation Engine', content: 'We integrated real-time WebSocket feeds from the Meteorological Department, tracking highly localized rainfall and temperature spikes. The engine calculates the precise ecological parameters required for *Aedes aegypti* mosquito gestation.' },
      { index: 5, title: 'The Machine Learning Pipeline', content: 'Using an ensemble of XGBoost and spatial clustering algorithms (DBSCAN), the ML pipeline analyzes the intersection of early-symptom clinical data and climatic vectors. The system forecasts outbreak probabilities with an unprecedented 18-day lead time.' },
      { index: 6, title: 'Spatial GIS Integration', content: 'The raw statistical output is rendered onto an interactive GIS topographical map using WebGL. It dynamically highlights hyper-local "Red Zones" down to the specific 100-meter municipal ward level.' },
      { index: 7, title: 'Automated Intervention Recommender', content: 'The DSS automatically generates prescriptive field interventions. It assigns mathematically optimized fogging routes to local sanitation fleets and prioritizes intravenous fluid supply routing to at-risk clinics via gRPC.' },
      { index: 8, title: 'Multi-Departmental Sync', content: 'The architecture breaks institutional silos by providing unified, permissioned dashboards to the Ministry of Health, Sanitation Department, and Disaster Management Authority, syncing state response vectors instantaneously.' },
      { index: 9, title: 'HIPAA-grade Security', content: 'Patient data is aggressively tokenized and stripped of PII at the edge node before ingestion. The entire analytical environment operates under strict AES-256 encryption, ensuring total compliance with global healthcare privacy standards.' },
      { index: 10, title: 'Empirical Yield', content: 'The predictive architecture reduced severe dengue cluster formations by 34% in its first monsoon season. Spatial accuracy hit 92.4%, preserving critical ICU capacity and establishing our DSS framework as a masterclass in public health engineering.' }
    ],
    simulator: {
      title: 'Epidemiological Intervention Simulator', description: 'Model the impact of predictive lead time on mitigating state-wide viral vector clusters.',
      initialValues: { clinics: 4000, leadTime: 18, casesBase: 25000 },
      sliders: [
        { key: 'clinics', label: 'Clinics Ingested', min: 500, max: 10000, step: 100, format: formatNumber },
        { key: 'leadTime', label: 'Predictive Lead Time (Days)', min: 1, max: 30, step: 1, format: v => `${v} Days` },
        { key: 'casesBase', label: 'Baseline Historical Cases', min: 10000, max: 100000, step: 5000, format: formatNumber }
      ],
      calculate: (v) => {
        const prevented = v.casesBase * ((v.leadTime / 30) * 0.45);
        return [
          { label: 'Critical ICU Beds Preserved', value: formatNumber(Math.floor(prevented * 0.15)), primary: false },
          { label: 'Severe Cases Prevented', value: formatNumber(Math.floor(prevented)), primary: true, subtext: 'Via Pre-Emptive Fogging' }
        ];
      }
    }
  },
  // 3. Global FinTech Ledger (Finance)
  {
    id: 'fintech', industry: 'Finance', title: 'Global FinTech Ledger', subtitle: 'Cross-Border Reconciliation Matrix.',
    theme: { colorName: 'indigo', text: 'text-indigo-400', bgSoft: 'bg-indigo-500/10', borderSoft: 'border-indigo-500/30', accent: 'accent-indigo-500', gradientText: 'from-indigo-400 to-blue-500', simBg: 'bg-[#050510]', simBorder: 'border-indigo-900/30', simGlow: 'bg-indigo-900/20' },
    spec: { target: 'Tier-1 Payment Gateway', scale: '140+ Countries', metric: 'Reconciliation < 12ms' },
    trust: { compliance: 'PCI-DSS Level 1', uptime: '99.9999%', dataVolume: '8.4B Tx/Day' },
    chartData: { title: 'Reconciliation Latency', subtitle: 'P99 Latency (ms) vs Transaction Volume (M)', points: [ {label: '10M', val1: 450, val1Pct: 100, val1Label: 'Legacy', val2: 11, val2Pct: 5, val2Label: 'New'}, {label: '50M', val1: 800, val1Pct: 100, val1Label: 'Legacy', val2: 12, val2Pct: 6, val2Label: 'New'}, {label: '100M', val1: 2400, val1Pct: 100, val1Label: 'Legacy', val2: 12, val2Pct: 6, val2Label: 'New'} ] },
    metrics: [ { icon: Globe, title: 'Nostro/Vostro Sync', value: 'Real-Time', detail: 'Replaced T+2 day batch processing.' }, { icon: Shield, title: 'Fraud False Positives', value: '-82%', detail: 'Dropped via ML graph-node analysis.' } ],
    sections: [
      { title: 'Executive Abstract', content: 'We overhauled the core transaction switching engine for a Tier-1 Global Payment Gateway. By deprecating their monolithic mainframe architecture, we engineered a distributed, multi-region ledger capable of real-time cross-border reconciliation.' },
      { index: 1, title: 'The Batch Processing Bottleneck', content: 'The legacy system relied on AS400 mainframes executing T+2 day batch processing for Nostro/Vostro accounts. This induced massive FX (Foreign Exchange) exposure risk and locked up $400M+ in collateral liquidity daily across 140 countries.' },
      { index: 2, title: 'Core Engineering Problem', content: 'We had to achieve strictly consistent, ACID-compliant ledger writes across geographically dispersed nodes (Tokyo, London, NY) while maintaining a P99 transaction latency of under 15ms to prevent point-of-sale timeouts.' },
      { index: 3, title: 'Distributed Ledger Architecture', content: 'We deployed a distributed SQL database (CockroachDB/Spanner hybrid) utilizing true consensus algorithms (Raft). This allowed us to shard financial data geographically while maintaining strict global serializability for every transaction.' },
      { index: 4, title: 'Real-Time FX Routing Matrix', content: 'The custom routing engine continuously ingests live liquidity APIs from global liquidity providers. It dynamically calculates the mathematically optimal route for cross-border transactions, instantly minimizing spread loss.' },
      { index: 5, title: 'Algorithmic Fraud Detection', content: 'Replaced rule-based fraud engines with a Graph Neural Network (GNN). The model analyzes 400+ metadata points per transaction, correlating sub-second device telemetry to slash false-positive card declines by 82%.' },
      { index: 6, title: 'Smart Contract Settlement', content: 'For B2B wholesale transactions, we integrated a private enterprise blockchain module. This executes programmable smart contracts that automatically release funds upon digital bill-of-lading verification.' },
      { index: 7, title: 'Zero-Downtime Multi-Region Failover', content: 'The architecture features active-active multi-region deployments. If the EU-West node drops, traffic is instantly BGP-routed to US-East with zero data loss and zero impact on the consumer POS experience.' },
      { index: 8, title: 'Automated Regulatory Reporting', content: 'The system automatically formats and dispatches SARs (Suspicious Activity Reports) to FinCEN and Interpol APIs in real-time, removing thousands of hours of manual compliance overhead.' },
      { index: 9, title: 'PCI-DSS Cryptographic Security', content: 'All PAN (Primary Account Number) data is aggressively tokenized at the edge. Cryptographic keys are rotated autonomously via Hardware Security Modules (HSMs) ensuring military-grade transaction security.' },
      { index: 10, title: 'Empirical Yield', content: 'The gateway now processes 8.4B transactions daily with a P99 latency of 12ms. Real-time reconciliation unlocked over $412M in daily trapped collateral, redefining the client’s capital efficiency.' }
    ],
    simulator: {
      title: 'Liquidity & Latency ROI Simulator', description: 'Model capital unlocked by shifting from T+2 batch processing to real-time distributed ledgers.',
      initialValues: { volume: 50, fxSpread: 2.5, trappedCap: 400 },
      sliders: [
        { key: 'volume', label: 'Daily Tx Volume (Millions)', min: 1, max: 200, step: 1, format: v => `${v}M` },
        { key: 'fxSpread', label: 'Avg FX Spread Optimization (bps)', min: 0.5, max: 10, step: 0.5, format: v => `${v} bps` },
        { key: 'trappedCap', label: 'Trapped T+2 Collateral ($M)', min: 50, max: 2000, step: 50, format: v => `$${v}M` }
      ],
      calculate: (v) => {
        const spreadSavings = (v.volume * 1000000) * 50 * (v.fxSpread / 10000) * 365; // Assume $50 avg tx
        return [
          { label: 'T+2 Collateral Unlocked', value: formatCurrency(v.trappedCap * 1000000), primary: false },
          { label: 'Annual FX Spread Recaptured', value: formatCurrency(spreadSavings), primary: true, subtext: 'Pure Profit Margin' }
        ];
      }
    }
  },
  // 4. FMCG Choco (Supply Chain)
  {
    id: 'choco', industry: 'Supply Chain', title: 'FMCG Global Chocolate SCM', subtitle: 'Predictive Farm-to-Factory ERP.',
    theme: { colorName: 'yellow', text: 'text-yellow-500', bgSoft: 'bg-yellow-500/10', borderSoft: 'border-yellow-500/30', accent: 'accent-yellow-500', gradientText: 'from-yellow-400 to-amber-600', simBg: 'bg-[#100d05]', simBorder: 'border-yellow-900/30', simGlow: 'bg-yellow-900/20' },
    spec: { target: '3rd Largest Chocolate Mfg.', scale: 'Global Logistics', metric: 'Spoilage Reduced by 18%' },
    trust: { compliance: 'ISO 22000 / FDA', uptime: '99.98%', dataVolume: '45M IoT Pings/Day' },
    chartData: { title: 'Raw Cocoa Spoilage Metrics', subtitle: 'Spoilage % vs Transit Days', points: [ {label: 'Day 5', val1: 2, val1Pct: 10, val1Label: 'Legacy', val2: 0.5, val2Pct: 2, val2Label: 'IoT Algo'}, {label: 'Day 10', val1: 8, val1Pct: 40, val1Label: 'Legacy', val2: 1.2, val2Pct: 6, val2Label: 'IoT Algo'}, {label: 'Day 15', val1: 18, val1Pct: 100, val1Label: 'Legacy', val2: 3.1, val2Pct: 15, val2Label: 'IoT Algo'} ] },
    metrics: [ { icon: Box, title: 'Raw Cocoa Spoilage', value: '-18.4%', detail: 'Eliminated through predictive IoT routing.' }, { icon: Clock, title: 'Dispatch Efficiency', value: '+42%', detail: 'Faster turnaround to distribution fleets.' } ],
    sections: [
      { title: 'Executive Abstract', content: 'We engineered an end-to-end SCM ERP for the world’s 3rd largest chocolate manufacturer. The system digitizes every variable from raw cocoa procurement in equatorial regions to the final dispatch of temperature-sensitive consumer goods globally.' },
      { index: 1, title: 'The Supply Chain Chaos', content: 'Chocolate manufacturing is highly volatile. The client relied on disjointed procurement software and blind logistics, resulting in massive write-offs due to temperature fluctuations during maritime transit.' },
      { index: 2, title: 'The Core Engineering Problem', content: 'We needed to build a globally distributed state machine capable of tracking the temperature, humidity, and geospatial location of millions of tons of raw materials, dynamically adjusting factory queues based on transit delays.' },
      { index: 3, title: 'Architecture Strategy', content: 'We deployed a high-throughput event streaming architecture using Apache Kafka. Edge nodes (IoT sensors on shipping containers) continuously ping telemetry data, ensuring sub-second visibility into the global supply chain.' },
      { index: 4, title: 'Procurement & Pricing Module', content: 'The module integrates directly with agricultural commodity pricing APIs, using algorithmic triggers to purchase raw materials only when global spread margins are mathematically optimal.' },
      { index: 5, title: 'Temperature-Controlled Routing', content: 'The ERP maps live IoT telemetry against global weather patterns. If a container is delayed in a high-heat zone and cooling fails, the system automatically reroutes it to the nearest processing facility to salvage the mass.' },
      { index: 6, title: 'Predictive Batch Manufacturing', content: 'Factory floor machinery is synced. If a specific grade of raw material is delayed, the predictive engine automatically re-shuffles the manufacturing queue, swapping in a different SKU to ensure zero idle time.' },
      { index: 7, title: 'Automated Dispatch Logistics', content: 'Final produce is highly perishable. The dispatch module dynamically assigns fleet vehicles based on real-time traffic, refrigeration capacity, and retailer demand windows, optimizing the "Last Mile" cold chain.' },
      { index: 8, title: 'Inventory Matrix Visualization', content: 'Warehouse managers utilize a 3D digital twin interface generated by the ERP. It provides real-time heat-maps of inventory aging, ensuring strict FIFO (First-In-First-Out) compliance.' },
      { index: 9, title: 'Trade Secret Security', content: 'Recipe formulations are highly classified. The formulation database is air-gapped and heavily encrypted. Access is strictly audited via cryptographic ledgers to prevent industrial espionage.' },
      { index: 10, title: 'Empirical Yield & Strategic Gain', content: 'The integration slashed raw material spoilage by 18.4% and increased factory utilization by 42%. This cemented our architecture as the gold standard for hyper-perishable, globally distributed FMCG chains.' }
    ],
    simulator: {
      title: 'Cold-Chain SCM ROI Simulator', description: 'Calculate the reclaimed capital by utilizing predictive IoT routing to eliminate transit spoilage.',
      initialValues: { volume: 500000, spoilRate: 4.5, valuePerTon: 3200 },
      sliders: [
        { key: 'volume', label: 'Annual Transit Volume (Tons)', min: 10000, max: 1000000, step: 10000, format: formatNumber },
        { key: 'spoilRate', label: 'Legacy Spoilage Rate (%)', min: 1, max: 15, step: 0.1, format: v => `${v}%` },
        { key: 'valuePerTon', label: 'Avg Value Per Ton ($)', min: 1000, max: 10000, step: 100, format: v => `$${v}` }
      ],
      calculate: (v) => {
        const legacyLoss = v.volume * (v.spoilRate / 100) * v.valuePerTon;
        return [
          { label: 'Capital Lost to Spoilage', value: formatCurrency(legacyLoss), primary: false },
          { label: 'Capital Reclaimed via Smart Routing', value: formatCurrency(legacyLoss * 0.85), primary: true, subtext: 'Added directly to gross margin' }
        ];
      }
    }
  },
  // 5. Autonomous HR/PM (Enterprise IT)
  {
    id: 'hrpm', industry: 'Enterprise IT', title: 'Autonomous Enterprise OS', subtitle: 'Zero-Leak PM & HR Ecosystem.',
    theme: { colorName: 'purple', text: 'text-purple-400', bgSoft: 'bg-purple-500/10', borderSoft: 'border-purple-500/30', accent: 'accent-purple-500', gradientText: 'from-purple-400 to-indigo-500', simBg: 'bg-[#0a0510]', simBorder: 'border-purple-900/30', simGlow: 'bg-purple-900/20' },
    spec: { target: 'Global IT Enterprise', scale: '10,000+ Personnel', metric: '100% Automated PM Routing' },
    trust: { compliance: 'SOC2 Type II / GDPR', uptime: '99.95%', dataVolume: '500k Tasks/Mo' },
    chartData: { title: 'Engineering Utilization Rates', subtitle: 'Billable Hours % vs Team Size', points: [ {label: 'Q1', val1: 68, val1Pct: 68, val1Label: 'Legacy', val2: 88, val2Pct: 88, val2Label: 'Auto-OS'}, {label: 'Q2', val1: 71, val1Pct: 71, val1Label: 'Legacy', val2: 94, val2Pct: 94, val2Label: 'Auto-OS'}, {label: 'Q3', val1: 65, val1Pct: 65, val1Label: 'Legacy', val2: 98, val2Pct: 98, val2Label: 'Auto-OS'} ] },
    metrics: [ { icon: Activity, title: 'Resource Utilization', value: '98.5%', detail: 'Optimized via algorithmic task assignment.' }, { icon: Users, title: 'HR Leakage', value: '0.0%', detail: 'Perfect compliance from onboarding to exit.' } ],
    sections: [
      { title: 'Executive Abstract', content: 'InvadeCode developed a fully autonomous Enterprise OS combining Project Management (PM) and Human Resources (HR) for a global IT firm. The system translates legal contracts directly into executable, assigned engineering tasks with zero human intervention.' },
      { index: 1, title: 'The Enterprise Chaos', content: 'The client suffered from massive resource leakage. PMs spent weeks manually deciphering Master Service Agreements (MSAs), creating tickets, and hunting for engineers. HR operated in a separate silo, leading to payroll errors and blindspots.' },
      { index: 2, title: 'Core Problem: The MSA Bottleneck', content: 'The fundamental engineering challenge was bridging the gap between unstructured legal text (MSAs) and highly structured operational workflows (Jira-style task assignment) without semantic context loss.' },
      { index: 3, title: 'NLP Task Generation Engine', content: 'We built an advanced NLP pipeline that ingests signed PDF contracts. It semantically extracts deliverables, deadlines, and technical stacks, automatically generating a comprehensive WBS (Work Breakdown Structure).' },
      { index: 4, title: 'Algorithmic Resource Assignment', content: 'The OS queries the HR matrix. It algorithms cross-references required skills, current bandwidth, timezone availability, and historical velocity, automatically assigning tickets to the mathematically optimal engineer.' },
      { index: 5, title: '100% Automated HR Lifecycle', content: 'The HR module handles the employee lifecycle seamlessly—from automated offer letter generation and background check API integrations, to seamless provisioning of software licenses and VPN access on day one.' },
      { index: 6, title: 'Zero-Leak Exit Protocols', content: 'When an employee resigns, the system triggers a "Zero-Leak" off-boarding protocol. It instantly revokes all internal access tokens, re-assigns active PM tasks back into the algorithmic pool, and processes final payroll.' },
      { index: 7, title: 'Payroll & Utilization Sync', content: 'Because PM and HR are a single brain, payroll is strictly mapped to actual task completion and utilization rates, automatically calculating bonuses, overtime, and client billing invoices.' },
      { index: 8, title: 'Predictive Hiring Module', content: 'By analyzing the pipeline of incoming MSAs and current bandwidth, the system predicts skill-shortages 6 months in advance, automatically posting job requisitions to external APIs (LinkedIn, Workday).' },
      { index: 9, title: 'Threat Vector Security', content: 'Handling classified MSAs requires impenetrable security. We deployed field-level encryption, multi-factor biometric authentication, and strict partition-tolerance to isolate client data across global nodes.' },
      { index: 10, title: 'Empirical Yield & Strategic Gain', content: 'The OS eliminated thousands of hours of manual PM overhead and drove resource utilization to 98.5%. For InvadeCode, it proved our ability to build hyper-intelligent, self-managing enterprise software.' }
    ],
    simulator: {
      title: 'Autonomous Utilization Simulator', description: 'Model the financial yield of eliminating manual PM overhead and maximizing utilization.',
      initialValues: { engineers: 2500, billRate: 150, utilGain: 12 },
      sliders: [
        { key: 'engineers', label: 'Engineering Headcount', min: 100, max: 10000, step: 100, format: formatNumber },
        { key: 'billRate', label: 'Avg Blended Bill Rate ($/Hr)', min: 50, max: 300, step: 10, format: v => `$${v}` },
        { key: 'utilGain', label: 'Utilization Gain via Algo (%)', min: 1, max: 25, step: 1, format: v => `+${v}%` }
      ],
      calculate: (v) => {
        const revenueCaptured = v.engineers * ((v.utilGain / 100) * 2000) * v.billRate;
        return [
          { label: 'Manual PM Overhead Eliminated', value: formatNumber(v.engineers * 40) + ' Hrs', primary: false },
          { label: 'New Revenue Yield', value: formatCurrency(revenueCaptured), primary: true, subtext: 'Pure margin from optimized billing' }
        ];
      }
    }
  }
];

// --- Showcase Gallery Hub ---
const GalleryView = ({ studies, onSelect }) => {
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  
  // Enforced 5 specific industries
  const coreIndustries = ['Public Sector', 'Healthcare', 'Finance', 'Supply Chain', 'Enterprise IT'];
  const filteredStudies = selectedIndustry === 'All' ? studies : studies.filter(s => s.industry === selectedIndustry);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16 sm:py-24 md:py-32 relative z-10 animate-fade-in-up">
      <div className="text-center mb-12 sm:mb-16 md:mb-24 relative px-4">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-48 sm:h-64 bg-slate-200/50 blur-[80px] sm:blur-[100px] rounded-full pointer-events-none"></div>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-slate-900 mb-4 sm:mb-6 relative z-10 leading-tight">
          Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-500 to-slate-900 block sm:inline">Excellence.</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-500 font-light max-w-2xl mx-auto relative z-10 px-4 sm:px-0">
          Explore how we systematically eradicate legacy bottlenecks, deploying autonomous, hyper-scalable algorithmic ecosystems across 5 core industries.
        </p>
      </div>

      {/* Industry Filter Pills */}
      <div className="flex flex-nowrap sm:flex-wrap overflow-x-auto sm:justify-center gap-2 sm:gap-3 mb-10 sm:mb-16 relative z-10 pb-4 sm:pb-0 px-2 sm:px-0 no-scrollbar">
        {['All', ...coreIndustries].map(ind => (
          <button
            key={ind}
            onClick={() => setSelectedIndustry(ind)}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all duration-300 shrink-0 ${
              selectedIndustry === ind 
              ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20 sm:scale-105' 
              : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50 hover:text-slate-700'
            }`}
          >
            {ind}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-2 sm:px-0">
        {filteredStudies.map((study, idx) => (
          <Reveal key={study.id} delay={Math.min(idx * 50, 300)}>
            <button 
              onClick={() => onSelect(study.id)} 
              className="group relative w-full text-left bg-white border border-slate-200/80 rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-8 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-slate-300/60 transition-all duration-700 hover:-translate-y-1 sm:hover:-translate-y-2 overflow-hidden flex flex-col h-full focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
            >
              <div className={`absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-${study.theme.colorName}-500/10 rounded-full blur-[40px] sm:blur-[60px] group-hover:scale-150 group-hover:bg-${study.theme.colorName}-500/20 transition-all duration-1000`}></div>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-slate-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              
              <div className="relative z-10 flex-1 w-full">
                <div className="flex justify-between items-start mb-4 sm:mb-6">
                   <h4 className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-slate-400 break-words pr-2">{study.industry}</h4>
                   <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl ${study.theme.bgSoft} flex items-center justify-center shrink-0`}>
                      <Terminal className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${study.theme.text}`} />
                   </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1.5 sm:mb-2 group-hover:text-slate-700 transition-colors break-words">{study.title}</h3>
                <p className={`text-xs sm:text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r ${study.theme.gradientText} mb-6 sm:mb-8 break-words`}>{study.subtitle}</p>
                
                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-10 w-full">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-[10px] sm:text-xs font-mono border-b border-slate-100 pb-2 sm:pb-3 gap-1 sm:gap-0">
                     <span className="text-slate-500">Target</span>
                     <span className="text-slate-900 font-semibold truncate sm:text-right w-full sm:max-w-[140px]">{study.spec.target}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-[10px] sm:text-xs font-mono border-b border-slate-100 pb-2 sm:pb-3 gap-1 sm:gap-0">
                     <span className="text-slate-500">Scale</span>
                     <span className="text-slate-900 font-semibold truncate sm:text-right w-full sm:max-w-[140px]">{study.spec.scale}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-[10px] sm:text-xs font-mono gap-1 sm:gap-0">
                     <span className="text-slate-500">Yield</span>
                     <span className={`font-bold ${study.theme.text} truncate sm:text-right w-full sm:max-w-[140px]`}>{study.spec.metric}</span>
                  </div>
                </div>
              </div>

              <div className={`relative z-10 w-full pt-4 sm:pt-6 border-t border-slate-100 flex items-center justify-between mt-auto`}>
                 <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest group-hover:text-slate-900 transition-colors duration-300">View Architecture</span>
                 <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-${study.theme.colorName}-50 transition-colors duration-500 shrink-0`}>
                    <ArrowRight className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 group-hover:${study.theme.text} transition-all duration-500 group-hover:translate-x-1`} />
                 </div>
              </div>
            </button>
          </Reveal>
        ))}
      </div>
    </div>
  );
};

// --- Global Master Layout ---
export default function App() {
  const [activeStudyId, setActiveStudyId] = useState(null);
  const activeStudy = useMemo(() => activeStudyId ? caseStudiesData.find(s => s.id === activeStudyId) : null, [activeStudyId]);

  // Handle "Next Case Study" seamless transition
  const handleNextStudy = () => {
    if (!activeStudyId) return;
    const currentIndex = caseStudiesData.findIndex(s => s.id === activeStudyId);
    const nextIndex = (currentIndex + 1) % caseStudiesData.length;
    setActiveStudyId(caseStudiesData[nextIndex].id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextStudyPreview = useMemo(() => {
    if (!activeStudyId) return null;
    const currentIndex = caseStudiesData.findIndex(s => s.id === activeStudyId);
    const nextIndex = (currentIndex + 1) % caseStudiesData.length;
    return caseStudiesData[nextIndex];
  }, [activeStudyId]);

  // Global Form State
  const [leadForm, setLeadForm] = useState({ name: '', email: '', company: '', problem: '' });
  const [submitStatus, setSubmitStatus] = useState('idle');

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('loading');
    
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer re_Vio9231Z_Nwgcq6iy9vJaEU37WYH2ckMC` },
        body: JSON.stringify({
          from: 'leads@emails.liaisonit.com',
          to: 'anant@invadecode.com',
          subject: `Architecture Request: ${leadForm.name} from ${leadForm.company}`,
          html: `
            <h2>New Architecture Review Request</h2>
            <p><strong>Name:</strong> ${leadForm.name}</p>
            <p><strong>Email:</strong> ${leadForm.email}</p>
            <p><strong>Company:</strong> ${leadForm.company}</p>
            <p><strong>Context:</strong> Viewing ${activeStudy ? activeStudy.title : 'Solutions Hub'}</p>
            <h3>Operational Bottlenecks:</h3>
            <p>${leadForm.problem.replace(/\n/g, '<br/>')}</p>
          `
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setTimeout(() => {
          setSubmitStatus('idle');
          setLeadForm({ name: '', email: '', company: '', problem: '' });
        }, 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error("Failed to send email", error);
      setSubmitStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 selection:bg-slate-300 selection:text-slate-900 overflow-x-hidden w-full" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        @keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(500px); } }
        .scanline-animation { animation: scanline 4s linear infinite; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}} />
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] bg-[size:16px_16px] sm:bg-[size:24px_24px] opacity-40"></div>
        <div className={`absolute top-0 right-0 w-64 sm:w-96 md:w-[600px] h-64 sm:h-96 md:h-[600px] ${activeStudy ? `bg-${activeStudy.theme.colorName}-500/10` : 'bg-slate-400/10'} rounded-full blur-[60px] sm:blur-[80px] md:blur-[100px] transition-colors duration-1000`}></div>
        <div className={`absolute bottom-0 left-0 w-80 sm:w-[600px] md:w-[800px] h-80 sm:h-[600px] md:h-[800px] ${activeStudy ? `bg-${activeStudy.theme.colorName}-400/5` : 'bg-slate-300/10'} rounded-full blur-[80px] sm:blur-[100px] md:blur-[120px] transition-colors duration-1000`}></div>
      </div>
      
      {/* Global Top Nav */}
      <div className="w-full bg-slate-950/80 backdrop-blur-2xl py-3 sm:py-4 px-4 sm:px-6 md:px-8 z-50 sticky top-0 shadow-[0_10px_40px_rgba(0,0,0,0.1)] border-b border-slate-800/80 flex flex-wrap sm:flex-nowrap justify-between items-center transition-all gap-2 sm:gap-0">
        <button onClick={() => { setActiveStudyId(null); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="flex items-center space-x-2 sm:space-x-4 md:space-x-6 text-slate-300 text-[10px] sm:text-xs font-mono hover:text-white transition-colors cursor-pointer text-left focus:outline-none shrink-0 w-auto">
          <span className="font-bold text-white flex items-center gap-1.5 sm:gap-2">
            <Terminal className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${activeStudy ? `text-${activeStudy.theme.colorName}-400` : 'text-slate-400'} transition-colors duration-500 shrink-0`} /> 
            <span className="hidden sm:inline">INVADECODE_CORE</span>
            <span className="sm:hidden">IC_CORE</span>
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400 truncate max-w-[100px] sm:max-w-none">HUB_V3</span>
        </button>
        
        {activeStudy ? (
          <button onClick={() => { setActiveStudyId(null); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] md:text-xs font-bold font-mono text-slate-400 hover:text-white transition-colors bg-slate-900 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-slate-700 shadow-inner hover:bg-slate-800 cursor-pointer shrink-0">
             <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 rotate-180 shrink-0" /> <span className="hidden sm:inline">RETURN TO HUB</span><span className="sm:hidden">HUB</span>
          </button>
        ) : (
          <span className="flex items-center gap-1.5 sm:gap-2 bg-slate-900/50 text-slate-300 px-2 sm:px-3 py-1 sm:py-1.5 text-[9px] sm:text-[10px] md:text-xs font-mono rounded-full border border-slate-700/50 backdrop-blur-md shadow-inner shrink-0">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-pulse bg-emerald-500 shrink-0"></div> <span className="hidden sm:inline">System Online</span><span className="sm:hidden">Online</span>
          </span>
        )}
      </div>

      {/* Dynamic Content Routing with Re-Mount Key for Animation */}
      <div key={activeStudyId || 'gallery'} className="relative z-10 animate-fade-in-up w-full">
        {activeStudy ? (
          <>
            <CaseStudyViewer study={activeStudy} onReturnToHub={() => { setActiveStudyId(null); window.scrollTo({top: 0, behavior: 'smooth'}); }} />
            
            {/* --- SEAMLESS NEXT CASE STUDY CTA --- */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-16 sm:py-24 relative z-10 flex justify-center w-full">
              <button 
                onClick={handleNextStudy}
                className="group relative w-full overflow-hidden rounded-3xl sm:rounded-[3rem] bg-white border border-slate-200 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-300/60 transition-all duration-700 hover:-translate-y-1 sm:hover:-translate-y-2 p-6 sm:p-8 md:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-8 text-left focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${nextStudyPreview.theme.gradientText} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700`}></div>
                <div className={`absolute -right-10 -top-10 sm:-right-20 sm:-top-20 w-48 h-48 sm:w-64 sm:h-64 bg-${nextStudyPreview.theme.colorName}-500/20 rounded-full blur-[60px] sm:blur-[80px] group-hover:scale-150 transition-transform duration-1000 pointer-events-none`}></div>
                
                <div className="w-full sm:w-auto relative z-10">
                  <h5 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 mb-1.5 sm:mb-2">Explore Next Architecture</h5>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-1.5 sm:mb-2 group-hover:text-slate-700 transition-colors break-words pr-4 sm:pr-0">
                    {nextStudyPreview.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-slate-500 break-words">
                    {nextStudyPreview.subtitle}
                  </p>
                </div>
                
                <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center bg-slate-50 group-hover:bg-${nextStudyPreview.theme.colorName}-50 transition-colors duration-500 shrink-0 self-end sm:self-auto relative z-10`}>
                  <ArrowRight className={`w-5 h-5 sm:w-6 sm:h-6 text-slate-400 group-hover:text-${nextStudyPreview.theme.colorName}-500 transition-colors duration-500 group-hover:translate-x-1`} />
                </div>
              </button>
            </div>
          </>
        ) : (
          <GalleryView studies={caseStudiesData} onSelect={(id) => { setActiveStudyId(id); window.scrollTo({top: 0, behavior: 'smooth'}); }} />
        )}
      </div>

      {/* --- THE DAMN NICE GLOBAL FOOTER / CONTACT FORM --- */}
      <footer className="w-full bg-[#020617] relative overflow-hidden border-t border-slate-800 pt-20 sm:pt-24 md:pt-32 pb-10 sm:pb-12 md:pb-16 px-4 sm:px-6 md:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(15,23,42,1),transparent_70%)]"></div>
        {/* Glowing Orbs mapping to active theme or default */}
        <div className={`absolute top-0 left-0 w-96 sm:w-[600px] md:w-[800px] h-96 sm:h-[600px] md:h-[800px] rounded-full blur-[80px] sm:blur-[100px] md:blur-[120px] opacity-20 pointer-events-none transition-colors duration-1000 ${activeStudy ? `bg-${activeStudy.theme.colorName}-600` : 'bg-slate-600'} -translate-x-1/2 -translate-y-1/2`}></div>
        <div className={`absolute bottom-0 right-0 w-64 sm:w-[400px] md:w-[600px] h-64 sm:h-[400px] md:h-[600px] rounded-full blur-[60px] sm:blur-[80px] md:blur-[100px] opacity-15 pointer-events-none transition-colors duration-1000 ${activeStudy ? `bg-${activeStudy.theme.colorName}-400` : 'bg-slate-500'} translate-x-1/3 translate-y-1/3`}></div>

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row gap-12 sm:gap-16 lg:gap-24 items-center">
          
          <div className="lg:w-1/2 text-center lg:text-left w-full">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-white mb-4 sm:mb-6 leading-tight break-words px-2 sm:px-0">
              Let's build your <br className="hidden sm:block"/><span className={`text-transparent bg-clip-text bg-gradient-to-r ${activeStudy ? activeStudy.theme.gradientText : 'from-slate-400 to-slate-200'} transition-all duration-1000`}>Algorithmic Future.</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-400 font-light leading-relaxed mb-8 sm:mb-10 max-w-lg mx-auto lg:mx-0 px-4 sm:px-0">
              Stop relying on heuristic guesswork. We engineer bespoke, hyper-scalable ERPs and predictive ecosystems that turn operational bottlenecks into massive revenue multipliers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start px-4 sm:px-0">
              <div className="flex items-center justify-center lg:justify-start gap-2.5 sm:gap-3 text-slate-300 font-mono text-xs sm:text-sm">
                 <CheckCircle className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 ${activeStudy ? activeStudy.theme.text : 'text-slate-400'} transition-colors duration-500`} /> <span>Zero-Trust Security</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2.5 sm:gap-3 text-slate-300 font-mono text-xs sm:text-sm">
                 <CheckCircle className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 ${activeStudy ? activeStudy.theme.text : 'text-slate-400'} transition-colors duration-500`} /> <span>Custom ML Pipelines</span>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 w-full max-w-lg relative group">
            <div className={`absolute -inset-1 bg-gradient-to-r ${activeStudy ? activeStudy.theme.gradientText : 'from-slate-600 to-slate-400'} rounded-3xl sm:rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200`}></div>
            <div className="bg-slate-900/60 border border-slate-700/50 backdrop-blur-2xl rounded-3xl sm:rounded-[3rem] p-6 sm:p-8 md:p-12 relative shadow-2xl w-full">
              {submitStatus === 'success' ? (
                <div className="text-center py-12 sm:py-16 animate-fade-in-up">
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-[2rem] flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-inner ${activeStudy ? `${activeStudy.theme.bgSoft} ${activeStudy.theme.text} border-${activeStudy.theme.colorName}-500/30` : 'bg-slate-800 text-slate-300 border-slate-700'} border transition-colors duration-500`}>
                    <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Spec Received</h3>
                  <p className="text-slate-400 text-xs sm:text-sm">An InvadeCode architect will initiate contact via secure channel shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleLeadSubmit} className="space-y-4 sm:space-y-5">
                  <div className="mb-6 sm:mb-8 text-center sm:text-left">
                     <h3 className="text-xl sm:text-2xl font-bold text-white mb-1.5 sm:mb-2">Initiate Architecture Review</h3>
                     <p className="text-[10px] sm:text-xs text-slate-400 font-mono break-words">SECURE_TRANSMISSION_PROTOCOL</p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <input required type="text" value={leadForm.name} onChange={(e) => setLeadForm({...leadForm, name: e.target.value})}
                        className="w-full px-4 sm:px-5 py-3.5 sm:py-4 bg-slate-950/50 border border-slate-800 rounded-full sm:rounded-full focus:bg-slate-900 focus:ring-2 focus:ring-slate-700 outline-none transition-all text-xs sm:text-sm font-medium text-white placeholder-slate-600 shadow-inner"
                        placeholder="Operator Name"
                      />
                    </div>
                    <div>
                      <input required type="email" value={leadForm.email} onChange={(e) => setLeadForm({...leadForm, email: e.target.value})}
                        className="w-full px-4 sm:px-5 py-3.5 sm:py-4 bg-slate-950/50 border border-slate-800 rounded-full sm:rounded-full focus:bg-slate-900 focus:ring-2 focus:ring-slate-700 outline-none transition-all text-xs sm:text-sm font-medium text-white placeholder-slate-600 shadow-inner"
                        placeholder="Secure Email"
                      />
                    </div>
                  </div>
                  <div>
                    <input required type="text" value={leadForm.company} onChange={(e) => setLeadForm({...leadForm, company: e.target.value})}
                      className="w-full px-4 sm:px-5 py-3.5 sm:py-4 bg-slate-950/50 border border-slate-800 rounded-full sm:rounded-full focus:bg-slate-900 focus:ring-2 focus:ring-slate-700 outline-none transition-all text-xs sm:text-sm font-medium text-white placeholder-slate-600 shadow-inner"
                      placeholder="Enterprise Designation (Company)"
                    />
                  </div>
                  <div>
                    <textarea required rows={4} value={leadForm.problem} onChange={(e) => setLeadForm({...leadForm, problem: e.target.value})}
                      className="w-full px-4 sm:px-5 py-3.5 sm:py-4 bg-slate-950/50 border border-slate-800 rounded-2xl sm:rounded-[2rem] focus:bg-slate-900 focus:ring-2 focus:ring-slate-700 outline-none transition-all text-xs sm:text-sm font-medium text-white placeholder-slate-600 resize-y shadow-inner"
                      placeholder="Define operational bottlenecks..."
                    />
                  </div>
                  
                  {submitStatus === 'error' && (
                    <div className="bg-red-950/50 text-red-400 text-[10px] sm:text-xs font-mono p-3 sm:p-4 rounded-xl sm:rounded-[2rem] border border-red-900/50 flex items-center gap-2 sm:gap-3">
                      <Activity className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" /> Transmission failed. Retry.
                    </div>
                  )}

                  <div className="pt-2 sm:pt-4">
                    <button type="submit" disabled={submitStatus === 'loading'}
                      className={`w-full px-6 sm:px-8 py-3.5 sm:py-4 text-slate-950 text-xs sm:text-sm font-bold tracking-wide uppercase rounded-full flex items-center justify-center gap-2 sm:gap-3 transition-all duration-500 disabled:opacity-70 shadow-xl ${activeStudy ? `bg-${activeStudy.theme.colorName}-500 hover:bg-${activeStudy.theme.colorName}-400 hover:shadow-${activeStudy.theme.colorName}-500/30` : 'bg-slate-200 hover:bg-white hover:shadow-slate-200/30'} hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-900`}
                    >
                      {submitStatus === 'loading' ? (
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
                      ) : (
                        <><span>Transmit Spec</span><Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" /></>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-16 sm:mt-24 pt-6 sm:pt-8 border-t border-slate-800/50 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-[9px] sm:text-[10px] md:text-xs font-mono text-slate-600 relative z-10 w-full text-center sm:text-left">
          <div className="flex items-center gap-1.5 sm:gap-2"><Terminal className="w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0" /><span>END OF DOCUMENT_STREAM</span></div>
          <div>© {new Date().getFullYear()} INVADECODE_CORE. ALL RIGHTS RESERVED.</div>
        </div>
      </footer>
    </div>
  );
}
