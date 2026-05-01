import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  TrendingUp, Box, Database, Users, Calculator, 
  MapPin, Clock, Layers, Send, CheckCircle, 
  ArrowRight, Activity, Cpu, Shield, Zap, GitBranch, Terminal,
  Network, MessageCircle, Factory, Scale, Check,
  Server, Lock, Globe, Leaf, Briefcase, HeartPulse, BarChart3, 
  LineChart, Target, Fingerprint, Codesandbox, HardDrive, 
  ZapOff, Route, Workflow, Radio, Building
} from 'lucide-react';

// --- Supercharged Global Animation Utility ---
const Reveal = ({ children, delay = 0, duration = 1000, animation = "fade-up", className = "" }) => {
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
      { threshold: 0.05, rootMargin: '0px 0px 50px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  let hiddenClasses = "";
  const visibleClasses = "opacity-100 translate-y-0 translate-x-0 scale-100 blur-none";

  switch (animation) {
    case "fade-up": hiddenClasses = "opacity-0 translate-y-20 scale-95 blur-md"; break;
    case "fade-left": hiddenClasses = "opacity-0 translate-x-20 blur-md"; break;
    case "fade-right": hiddenClasses = "opacity-0 -translate-x-20 blur-md"; break;
    case "scale-up": hiddenClasses = "opacity-0 scale-50 blur-xl"; break;
    case "blur-in": hiddenClasses = "opacity-0 scale-105 blur-2xl"; break;
    default: hiddenClasses = "opacity-0 translate-y-20";
  }

  return (
    <div 
      ref={ref} 
      className={`transition-all ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? visibleClasses : hiddenClasses} ${className}`}
      style={{ transitionDelay: `${delay}ms`, transitionDuration: `${duration}ms` }}
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
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => { if(e.isIntersecting) setInView(true); }, {threshold: 0.2});
    if(ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);

  return (
    <Reveal animation="scale-up" delay={150} duration={1200} className="bg-[#050505] p-6 sm:p-10 rounded-[2.5rem] my-16 relative overflow-hidden group border border-slate-800 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
      <div ref={ref} className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] opacity-20"></div>
      <div className={`absolute -top-32 -right-32 w-96 h-96 bg-${theme.colorName}-500/20 blur-[120px] rounded-full pointer-events-none transition-all duration-1000 group-hover:scale-125 group-hover:bg-${theme.colorName}-400/20`}></div>
      <div className={`absolute -bottom-32 -left-32 w-96 h-96 bg-slate-500/10 blur-[100px] rounded-full pointer-events-none`}></div>
      
      <div className="flex justify-between items-end mb-12 relative z-10">
        <div>
          <h4 className="text-2xl font-bold mb-2 flex items-center gap-3 text-white tracking-tight">
            <LineChart className={`w-6 h-6 text-${theme.colorName}-400 animate-pulse`}/> 
            {data.title}
          </h4>
          <p className="text-xs text-slate-400 font-mono tracking-widest uppercase">{data.subtitle}</p>
        </div>
      </div>
      
      <div className="flex items-end gap-3 sm:gap-8 h-64 relative z-10 border-b border-slate-700/50 pb-2">
        {data.points.map((d, i) => (
          <div key={i} className="flex-1 flex flex-col justify-end gap-3 h-full group/bar relative">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-max flex flex-col items-center text-[10px] font-mono text-slate-400 opacity-0 group-hover/bar:opacity-100 transition-all duration-300 translate-y-2 group-hover/bar:translate-y-0 bg-slate-800/90 backdrop-blur-md border border-slate-700 px-3 py-2 rounded-lg shadow-2xl z-20">
              <span className={`text-${theme.colorName}-400 font-bold mb-1`}>{d.val1Label}: {d.val1}</span>
              <span className="text-slate-300 font-bold">{d.val2Label}: {d.val2}</span>
            </div>
            <div className="w-full flex items-end gap-1.5 h-full bg-slate-900/50 rounded-t-xl p-1.5 relative overflow-hidden border border-slate-800/50 border-b-0">
              <div 
                className={`w-1/2 bg-gradient-to-t from-${theme.colorName}-900 via-${theme.colorName}-500 to-${theme.colorName}-300 rounded-t-lg transition-all duration-[1500ms] ease-out relative group-hover/bar:brightness-125 shadow-[0_0_15px_rgba(var(--tw-colors-${theme.colorName}-500),0.5)]`} 
                style={{ height: inView ? `${d.val1Pct}%` : '0%', transitionDelay: `${i * 100}ms` }}>
              </div>
              <div 
                className={`w-1/2 bg-gradient-to-t from-slate-800 via-slate-500 to-slate-300 rounded-t-lg transition-all duration-[1500ms] ease-out relative group-hover/bar:brightness-125`} 
                style={{ height: inView ? `${d.val2Pct}%` : '0%', transitionDelay: `${i * 100 + 50}ms` }}>
              </div>
            </div>
            <div className="text-center text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-2">{d.label}</div>
          </div>
        ))}
      </div>
      
      <div className="flex gap-8 mt-8 justify-center relative z-10 text-xs font-mono font-bold tracking-wider">
        <div className="flex items-center gap-3"><div className={`w-4 h-4 bg-gradient-to-br from-${theme.colorName}-400 to-${theme.colorName}-600 rounded shadow-[0_0_12px_rgba(255,255,255,0.1)]`}></div> <span className="text-slate-300">{data.points[0].val1Label}</span></div>
        <div className="flex items-center gap-3"><div className="w-4 h-4 bg-gradient-to-br from-slate-400 to-slate-600 rounded"></div> <span className="text-slate-300">{data.points[0].val2Label}</span></div>
      </div>
    </Reveal>
  );
};

// --- Dynamic Case Study Renderer ---
const CaseStudyViewer = ({ study, onReturnToHub }) => {
  const theme = study.theme;
  
  return (
    <div className="w-full px-[3%] py-12 flex flex-col lg:flex-row gap-12 lg:gap-16 relative">
      {/* Sidebar Index - Glassmorphic */}
      <aside className="hidden lg:block w-[300px] shrink-0">
        <Reveal animation="fade-left" className="sticky top-32 bg-white/60 backdrop-blur-3xl border border-slate-200/80 p-8 rounded-[2.5rem] shadow-[0_20px_60px_rgb(0,0,0,0.03)] transition-all duration-500 hover:shadow-[0_20px_60px_rgb(0,0,0,0.06)] hover:-translate-y-1">
          <button onClick={onReturnToHub} className="mb-8 flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-slate-400 hover:text-slate-900 transition-colors cursor-pointer group">
             <div className="bg-slate-100 p-2 rounded-full group-hover:bg-slate-200 transition-colors"><ArrowRight className="w-3 h-3 rotate-180" /></div> Back to Hub
          </button>
          
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold tracking-tighter text-slate-900 leading-tight mb-2">{study.title}</h1>
            <h2 className="text-xs font-bold mt-2 tracking-widest uppercase">
              <span className={`text-transparent bg-clip-text bg-gradient-to-r animate-sweep ${theme.gradientText}`}>{study.subtitle}</span>
            </h2>
          </div>
          
          <h5 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-5 flex items-center gap-2"><Network className="w-3 h-3"/> Directory Architecture</h5>
          <nav className="space-y-4 text-xs text-slate-600 font-semibold border-l-2 border-slate-100 pl-5 max-h-[35vh] overflow-y-auto no-scrollbar relative group">
            {study.sections.map((sec, i) => (
              <a key={i} href={`#sec-${study.id}-${i}`} className={`block hover:${theme.text} transition-all duration-300 leading-snug hover:translate-x-1.5`}>
                {sec.index ? <span className="opacity-40 mr-2 font-mono">{String(sec.index).padStart(2,'0')}</span> : ''}{sec.title}
              </a>
            ))}
            <a href={`#sim-${study.id}`} className={`block ${theme.text} transition-all duration-300 hover:translate-x-1.5 flex items-center gap-2 font-bold mt-6 pt-6 border-t border-slate-100`}>
              <Calculator className="w-4 h-4 animate-pulse" /> Launch ROI Simulator
            </a>
          </nav>
          
          <div className={`mt-10 pt-8 border-t border-slate-100`}>
            <h5 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-900 mb-4 flex items-center gap-2"><Cpu className="w-3 h-3"/> Core Specification</h5>
            <ul className="space-y-3 text-xs text-slate-500 font-mono">
              <li className="flex justify-between items-center bg-slate-50 p-2.5 rounded-lg"><span className="opacity-70">Target:</span> <span className="text-slate-900 font-bold truncate max-w-[130px] text-right">{study.spec.target}</span></li>
              <li className="flex justify-between items-center bg-slate-50 p-2.5 rounded-lg"><span className="opacity-70">Scale:</span> <span className="text-slate-900 font-bold truncate max-w-[130px] text-right">{study.spec.scale}</span></li>
              <li className="flex justify-between items-center bg-slate-50 p-2.5 rounded-lg border border-slate-200/50"><span className="opacity-70">Metric:</span> <span className={`${theme.text} font-bold truncate max-w-[130px] text-right`}>{study.spec.metric}</span></li>
            </ul>
          </div>
        </Reveal>
      </aside>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl pb-32">
        <Reveal animation="fade-right">
          <header className="mb-12 lg:hidden bg-white/80 backdrop-blur-2xl border border-slate-200/80 p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgb(0,0,0,0.03)] relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-32 h-32 bg-${theme.colorName}-500/10 rounded-full blur-[40px] pointer-events-none`}></div>
            <button onClick={onReturnToHub} className="absolute top-6 right-6 flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-slate-400 hover:text-slate-900 transition-colors cursor-pointer group">
               <div className="bg-slate-100 p-1.5 rounded-full group-hover:bg-slate-200 transition-colors"><ArrowRight className="w-3 h-3 rotate-180" /></div> Hub
            </button>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tighter text-slate-900 leading-tight mb-3 mt-4 relative z-10">{study.title}</h1>
            <h2 className="text-sm font-bold tracking-widest uppercase relative z-10">
              <span className={`text-transparent bg-clip-text bg-gradient-to-r animate-sweep ${theme.gradientText}`}>{study.subtitle}</span>
            </h2>
          </header>
        </Reveal>

        {/* Engineering Trust Telemetry Banner */}
        <Reveal delay={100} animation="scale-up" duration={800} className="mb-16">
          <div className="flex flex-wrap items-center justify-between gap-4 sm:gap-8 border border-slate-200/80 p-5 text-xs font-mono text-slate-600 bg-white/60 backdrop-blur-xl rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3"><Shield className={`w-4 h-4 ${theme.text}`} /> <span className="font-bold text-slate-900 tracking-wide">{study.trust.compliance}</span></div>
            <div className="hidden sm:block w-px h-6 bg-slate-200"></div>
            <div className="flex items-center gap-3"><Activity className={`w-4 h-4 ${theme.text}`} /> <span className="font-bold text-slate-900 tracking-wide">SLA: {study.trust.uptime}</span></div>
            <div className="hidden md:block w-px h-6 bg-slate-200"></div>
            <div className="flex items-center gap-3"><HardDrive className={`w-4 h-4 ${theme.text}`} /> <span className="font-bold text-slate-900 tracking-wide">{study.trust.dataVolume}</span></div>
          </div>
        </Reveal>

        {study.sections.map((section, idx) => (
          <React.Fragment key={idx}>
            <Reveal delay={idx * 30} animation="fade-up" duration={900}>
              <div className="pt-16 mt-16 border-t border-slate-200/50 scroll-mt-40 relative group" id={`sec-${study.id}-${idx}`}>
                <div className={`absolute -top-[1px] left-0 w-16 h-[3px] bg-gradient-to-r from-${theme.colorName}-500 to-transparent group-hover:w-32 transition-all duration-700`}></div>
                {section.index && (
                  <span className={`inline-block px-3 py-1 bg-${theme.colorName}-50 text-[10px] font-mono font-bold ${theme.text} mb-5 tracking-widest uppercase rounded shadow-sm border border-${theme.colorName}-100`}>
                    // SEC_{String(section.index).padStart(2, '0')}
                  </span>
                )}
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8 tracking-tight leading-tight">{section.title}</h2>
              </div>
            </Reveal>
            <Reveal delay={(idx * 30) + 100} animation="fade-up" duration={1000}>
              <div className="text-base sm:text-lg text-slate-600 leading-relaxed sm:leading-[1.8] mb-8 font-light tracking-wide space-y-6" dangerouslySetInnerHTML={{__html: section.content}} />
            </Reveal>

            {/* Inject Interactive Chart dynamically at optimal reading point */}
            {idx === 4 && study.chartData && (
              <DynamicChart data={study.chartData} theme={theme} />
            )}

            {/* Render Metrics after specific sections if defined */}
            {idx === 7 && study.metrics && (
              <div className="grid sm:grid-cols-2 gap-8 my-16">
                {study.metrics.map((m, i) => (
                  <Reveal key={i} delay={i * 150} animation="scale-up" duration={800} className={`p-8 rounded-[2.5rem] bg-white border border-slate-200/80 shadow-[0_10px_40px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-slate-50/80 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className={`absolute -right-10 -top-10 w-32 h-32 bg-${theme.colorName}-500/5 rounded-full blur-[30px] group-hover:bg-${theme.colorName}-500/10 transition-colors duration-700`}></div>
                    <div className={`w-14 h-14 ${theme.bgSoft} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 ease-out relative z-10 shadow-sm border border-${theme.colorName}-200/50`}>
                      <m.icon className={`w-7 h-7 ${theme.text}`} />
                    </div>
                    <h4 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-[0.2em] mb-3 relative z-10">{m.title}</h4>
                    <div className="text-5xl font-light text-slate-900 mb-4 tracking-tighter relative z-10">{m.value}</div>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed relative z-10">{m.detail}</p>
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
    <Reveal animation="blur-in" duration={1500} className={`w-full ${theme.simBg} rounded-[3rem] sm:rounded-[4rem] mt-32 px-[3%] sm:px-[5%] relative overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.5)] border ${theme.simBorder} min-h-[90vh] flex flex-col justify-center py-24 group`}>
      <div id={id} className="absolute -top-40"></div>
      
      {/* Intense Background Layers */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30 group-hover:opacity-60 transition-opacity duration-1000"></div>
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-full ${theme.simGlow} blur-[140px] rounded-[100%] pointer-events-none transition-all duration-[2000ms] ease-in-out group-hover:scale-110 group-hover:opacity-80 opacity-50`}></div>
      <div className={`absolute bottom-0 right-0 w-96 h-96 bg-${theme.colorName}-600/10 blur-[100px] rounded-full pointer-events-none`}></div>

      <div className="relative z-10 w-full mx-auto">
        <div className="text-center mb-20 w-full mx-auto">
          <div className={`inline-flex items-center justify-center p-5 ${theme.bgSoft} border ${theme.borderSoft} rounded-3xl mb-8 backdrop-blur-2xl shadow-[0_0_40px_rgba(var(--tw-colors-${theme.colorName}-500),0.2)] relative overflow-hidden`}>
            <div className={`absolute inset-0 ${theme.bgSoft} animate-pulse`}></div>
            <Calculator className={`w-10 h-10 ${theme.text} relative z-10 animate-float`} />
          </div>
          <h2 className="text-5xl sm:text-6xl font-extrabold tracking-tighter text-white mb-6 leading-tight drop-shadow-lg">{config.title}</h2>
          <p className="text-slate-300 text-lg sm:text-xl font-light leading-relaxed max-w-3xl mx-auto opacity-80">{config.description}</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Sliders Block */}
          <div className="lg:col-span-5 space-y-12 min-w-0 bg-slate-900/50 p-8 sm:p-12 rounded-[3rem] border border-slate-800/80 backdrop-blur-xl shadow-2xl relative">
            <div className="absolute top-6 left-6 text-[10px] font-mono text-slate-500 flex items-center gap-2 tracking-widest"><Codesandbox className="w-3 h-3"/> Interactive Variables</div>
            <div className="pt-6 space-y-10">
              {config.sliders.map((slider, idx) => (
                <div key={idx} className="group/slider relative">
                  <div className="flex justify-between items-end mb-5">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest truncate mr-4">{slider.label}</label>
                    <span className={`text-3xl font-mono font-bold ${theme.text} tabular-nums whitespace-nowrap drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]`}>
                      {slider.format ? slider.format(values[slider.key]) : values[slider.key]}
                    </span>
                  </div>
                  <div className="relative pt-2">
                    <input 
                      type="range" min={slider.min} max={slider.max} step={slider.step} 
                      value={values[slider.key]} 
                      onChange={(e) => handleSliderChange(slider.key, e.target.value)} 
                      className={`w-full h-3 bg-slate-950 rounded-full appearance-none cursor-pointer ${theme.accent} relative z-10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]`} 
                    />
                    <div className={`absolute top-1/2 left-0 h-3 -translate-y-1/2 rounded-full pointer-events-none ${theme.simGlow} opacity-60 blur-md`} style={{ width: `${((values[slider.key] - slider.min) / (slider.max - slider.min)) * 100}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Results Block */}
          <div className={`lg:col-span-7 bg-slate-950/90 rounded-[3rem] p-10 sm:p-16 border border-slate-800 shadow-[inset_0_0_80px_rgba(0,0,0,0.8),0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden min-w-0 h-full flex flex-col justify-center`}>
            <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-${theme.colorName}-400 to-transparent opacity-50 scanline-animation`}></div>
            <div className="absolute -top-32 -right-32 w-80 h-80 bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>
            
            <div className="absolute top-8 right-8 text-[10px] font-mono text-slate-600 flex items-center gap-2 tracking-widest animate-pulse"><Radio className="w-3 h-3"/> Live Computation</div>

            <div className="space-y-14 relative z-10">
              {results.map((res, idx) => (
                <div key={idx} className={res.primary ? "relative p-8 -m-8 rounded-[2rem] bg-gradient-to-br from-slate-900/50 to-transparent border border-slate-800/50 shadow-2xl" : ""}>
                  <div className={`text-xs font-extrabold uppercase tracking-[0.2em] mb-4 flex items-center gap-3 truncate ${res.primary ? theme.text : 'text-slate-500'}`}>
                    {res.primary ? <Zap className="w-4 h-4 animate-pulse" /> : <Database className="w-4 h-4 opacity-50" />} 
                    {res.label}
                  </div>
                  <div className={`tabular-nums truncate leading-[1.1] ${res.primary ? 'text-6xl sm:text-[5.5rem] font-bold tracking-tighter text-white mb-6 drop-shadow-[0_0_35px_rgba(255,255,255,0.2)]' : 'text-4xl font-mono text-slate-400 opacity-50 line-through decoration-slate-700 decoration-[3px]'}`}>
                    {res.value}
                  </div>
                  {res.subtext && (
                    <div className={`inline-flex items-center gap-2 px-5 py-2.5 ${theme.bgSoft} border border-${theme.colorName}-500/30 ${theme.text} text-xs font-extrabold tracking-widest uppercase rounded-full tabular-nums whitespace-nowrap shadow-[0_0_20px_rgba(var(--tw-colors-${theme.colorName}-500),0.2)]`}>
                      {res.subtext}
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

// --- MASSIVE EXPANDED DATA: Case Studies Configuration ---
const caseStudiesData = [
  {
    id: 'psu',
    industry: 'GovTech',
    title: 'National PSU ERP Overhaul',
    subtitle: 'The Sovereign Cloud Migration.',
    theme: { colorName: 'amber', text: 'text-amber-500', bgSoft: 'bg-amber-500/10', borderSoft: 'border-amber-500/30', accent: 'accent-amber-500', gradientText: 'from-amber-600 to-orange-500', simBg: 'bg-[#0f0a05]', simBorder: 'border-amber-900/30', simGlow: 'bg-amber-900/20' },
    spec: { target: '2x State Energy PSUs', scale: '14,000+ Employees', metric: '100% Legacy Modules Deprecated' },
    trust: { compliance: 'FedRAMP / ISO 27001', uptime: '99.999%', dataVolume: '4.2 PB Processed' },
    chartData: { title: 'Legacy vs Modern Query Latency', subtitle: 'P99 Latency (ms) across Financial Ledgers', points: [ {label: 'Q1', val1: 4200, val1Pct: 90, val1Label: 'Oracle EBS', val2: 120, val2Pct: 10, val2Label: 'New ERP'}, {label: 'Q2', val1: 4800, val1Pct: 100, val1Label: 'Oracle EBS', val2: 110, val2Pct: 9, val2Label: 'New ERP'}, {label: 'Q3', val1: 0, val1Pct: 0, val1Label: 'Oracle EBS', val2: 95, val2Pct: 8, val2Label: 'New ERP'}, {label: 'Q4', val1: 0, val1Pct: 0, val1Label: 'Oracle EBS', val2: 88, val2Pct: 7, val2Label: 'New ERP'} ] },
    metrics: [
      { icon: Server, title: 'Legacy DBs Deprecated', value: '42 Nodes', detail: 'Consolidated into a single unified hybrid-cloud lake.' },
      { icon: Lock, title: 'Licensing Capital Freed', value: '$18.4M/yr', detail: 'Eliminated monolithic SAP/Oracle seat licenses.' }
    ],
    sections: [
      { title: 'Executive Abstract', content: 'InvadeCode secured the mandate to completely decommission and replace the fragmented, legacy ERP systems of two major Public Sector Undertakings (PSUs) in the energy and mining sector. We architected a sovereign, custom-built Enterprise OS from scratch, migrating 100% of their operational modules with zero operational downtime. The transformation resulted in reclaiming $18.4M in recurring licensing fees while increasing data velocity by a factor of 40x.' },
      { index: 1, title: 'The Legacy Paralysis', content: 'The PSUs were paralyzed by decades of technological debt. They operated on deeply fragmented, heavily customized legacy monolithic instances (SAP ECC6 and Oracle EBS) deployed on decaying on-premise hardware. Upgrades were mathematically impossible without breaking custom logic. The entities were bleeding over $18M annually purely in licensing and maintenance fees to legacy vendors.' },
      { index: 2, title: 'Data Gravity & The Silo Problem', content: 'Data across Finance, HR, and Procurement was completely siloed. A simple reconciliation report required 30 days to process because 42 separate databases had to be manually merged via CSV extracts. B-tree index fragmentation on their aging Oracle servers caused P99 query latencies to spike to 4.8 seconds during peak grid-load hours, halting critical supply chain approvals.' },
      { index: 3, title: 'The Core Engineering Problem', content: 'The primary bottleneck was the database schema mismatch and the sheer volume of unstructured historical data. We had to extract, transform, and load (ETL) 20 years of unstructured financial ledgers—over 4.2 Petabytes of data—into a modern relational schema without triggering strict state compliance violations or interrupting the 24/7 power grid operations.' },
      { index: 4, title: 'Sovereign Cloud & Kubernetes Strategy', content: 'We deployed a microservices-based, event-driven architecture. To adhere to strict government data residency laws, the entire infrastructure was containerized using Kubernetes and deployed on a sovereign, air-gapped private cloud environment. This decoupled the application layer from the hardware, ensuring infinite horizontal scaling.' },
      { index: 5, title: 'Real-Time Kafka Event Streaming', content: 'To solve the silo problem, we implemented an Apache Kafka event mesh. Every action—whether a truck entering a mining facility or a clerk approving a paycheck—publishes an event to the Kafka bus. All modules subscribe to this bus, ensuring global state synchronization in under 12 milliseconds.' },
      { index: 6, title: 'Automated Procurement Engine', content: 'We deprecated the legacy procurement portal, replacing it with a custom-built, smart-contract anchored tendering module. This ensured 100% immutable audit trails for Comptroller and Auditor General (CAG) audits. It auto-validates vendor compliances against national APIs in real-time, drastically reducing procurement cycles from 90 days to 14 days.' },
      { index: 7, title: 'IoT Edge Computing for HR', content: 'The legacy HR system required massive manual intervention for shift allowances. Our replacement module ingested IoT data directly from biometric and RFID scanners across 450 deep-mining facilities. This automated complex, union-negotiated payroll calculations via AWS Lambda-style edge functions, reducing HR administrative overhead by 94%.' },
      { index: 8, title: 'Predictive Asset Maintenance', content: 'A custom predictive maintenance module was built to track over 12,000 heavy machineries and high-voltage grid assets. By ingesting massive telemetry data (vibration, heat, load), the ERP utilizes Kalman filters to automatically schedule downtime and procure spare parts 12 days before predicted mechanical failure occurs.' },
      { index: 9, title: 'High-Throughput Financial Ledger', content: 'We built a unified, double-entry accounting engine capable of processing 10,000+ transactions per second. Reconciliation happens instantaneously using Redis caching layers. This provides the Ministry of Power with real-time, granular financial dashboards rather than delayed, inaccurate quarterly reports.' },
      { index: 10, title: 'Zero-Downtime Migration Pipeline', content: 'We engineered a Change Data Capture (CDC) pipeline using Debezium. It asynchronously replicated live transactions from the legacy databases into our new PostgreSQL clusters over a 6-month parallel run. This allowed a seamless, zero-downtime DNS cutover on launch day without losing a single financial row.' },
      { index: 11, title: 'Zero-Trust IAM & Security', content: 'The system adheres to Military-Grade Zero-Trust principles. All data is AES-GCM-256 encrypted at rest. We implemented strict Role-Based Access Control (RBAC) integrated directly via OIDC with the National Identity APIs, entirely mitigating both external cyber threats and internal actor manipulations.' },
      { index: 12, title: 'Empirical Yield & Boardroom ROI', content: 'The PSUs achieved a unified, hyper-fast operational state, processing 14.2 Billion rows daily with sub-90ms latency. Eliminating recurring monolithic licenses reclaimed $18.4M annually, which was reallocated to actual grid CAPEX. For InvadeCode, executing a zero-fault replacement of this scale solidified our capability to handle the most complex, high-compliance government architectures in the world.' }
    ],
    simulator: {
      title: 'Sovereign ERP ROI Calculator',
      description: 'Model the compounding capital reclamation by deprecating legacy monolithic ERP licenses in favor of a custom InvadeCode sovereign ecosystem.',
      initialValues: { employees: 14000, legacyCost: 1200, maintenance: 4.5 },
      sliders: [
        { key: 'employees', label: 'Total Enterprise Headcount', min: 1000, max: 50000, step: 1000, format: formatNumber },
        { key: 'legacyCost', label: 'Legacy License Cost / User / Yr', min: 200, max: 3000, step: 100, format: v => `$${v}` },
        { key: 'maintenance', label: 'Annual Maintenance AMC ($M)', min: 1, max: 20, step: 0.5, format: v => `$${v}M` }
      ],
      calculate: (v) => {
        const licenseBleed = v.employees * v.legacyCost;
        const totalBleed = licenseBleed + (v.maintenance * 1000000);
        return [
          { label: 'Current Annual Monolithic Bleed', value: formatCurrency(totalBleed), primary: false },
          { label: 'Capital Freed (Year 1)', value: formatCurrency(totalBleed * 0.92), primary: true, subtext: 'Reallocated from OPEX to CAPEX' }
        ];
      }
    }
  },
  {
    id: 'invade-agro',
    industry: 'AgriTech',
    title: 'Invade Agro',
    subtitle: 'Predictive Crop & Supply Chain Matrix.',
    theme: { colorName: 'emerald', text: 'text-emerald-500', bgSoft: 'bg-emerald-500/10', borderSoft: 'border-emerald-500/30', accent: 'accent-emerald-500', gradientText: 'from-emerald-400 to-green-600', simBg: 'bg-[#020a06]', simBorder: 'border-emerald-900/30', simGlow: 'bg-emerald-900/20' },
    spec: { target: 'National Agri-Conglomerate', scale: '12M+ Hectares', metric: 'Yield Optimization +22%' },
    trust: { compliance: 'ISO 22000 / GAP', uptime: '99.99%', dataVolume: '8 PB Satellite Imagery' },
    chartData: { title: 'Predictive Yield vs Actual Output', subtitle: 'Tons per Hectare Analysis', points: [ {label: 'Phase 1', val1: 4.2, val1Pct: 60, val1Label: 'Legacy Yield', val2: 4.5, val2Pct: 65, val2Label: 'Agro Model'}, {label: 'Phase 2', val1: 4.1, val1Pct: 58, val1Label: 'Legacy Yield', val2: 5.1, val2Pct: 75, val2Label: 'Agro Model'}, {label: 'Phase 3', val1: 4.3, val1Pct: 62, val1Label: 'Legacy Yield', val2: 6.2, val2Pct: 95, val2Label: 'Agro Model'} ] },
    metrics: [
      { icon: Leaf, title: 'Crop Spoilage Eliminated', value: '-41%', detail: 'By dynamic route calculation to processing plants.' },
      { icon: Activity, title: 'Fertilizer Optimization', value: '-18%', detail: 'Saved via algorithmic variable-rate micro-dosing.' }
    ],
    sections: [
      { title: 'Executive Abstract', content: 'Invade Agro represents a hyper-scalable satellite imagery and IoT pipeline engineered to predict crop yields, automate variable-rate fertilization, and orchestrate cold-chain logistics for a national agricultural conglomerate spanning 12 million hectares. The system moved the client from reactive farming to absolute mathematical precision.' },
      { index: 1, title: 'The Agronomic Guesswork', content: 'Farming at a national scale relied heavily on localized intuition. Agronomists guessed fertilizer requirements, and harvesting was initiated based on static calendars rather than actual biological readiness. This resulted in massive fertilizer runoff, sub-optimal yields, and catastrophic post-harvest spoilage.' },
      { index: 2, title: 'The Core Engineering Problem', content: 'We had to build a spatial-temporal database capable of digesting multi-spectral satellite imagery (NDVI data), terrestrial soil sensors, and highly localized weather APIs simultaneously, translating petabytes of unstructured raster data into actionable, per-acre directives for autonomous machinery.' },
      { index: 3, title: 'Satellite & Terrestrial Ingestion', content: 'The architecture utilizes a distributed edge-computing mesh. Terrestrial IoT sensors monitor soil NPK (Nitrogen, Phosphorus, Potassium) and moisture levels, pushing MQTT packets to the cloud. Simultaneously, automated pipelines pull multi-spectral imagery from Sentinel-2 satellites every 48 hours.' },
      { index: 4, title: 'Computer Vision & NDVI Analysis', content: 'We deployed Convolutional Neural Networks (CNNs) to analyze the satellite raster data. By tracking the Normalized Difference Vegetation Index (NDVI) across 12 million hectares, the system can instantly identify micro-regions experiencing drought stress or pest infestations weeks before they are visible to the human eye.' },
      { index: 5, title: 'Variable-Rate Micro-Dosing (VRM)', content: 'The Invade Agro engine translates stress maps into exact GPS-coordinated shapefiles. These files are transmitted directly to autonomous, GPS-guided tractors, which apply exact micro-doses of fertilizer and pesticide only to the square meters that mathematically require it, cutting chemical OPEX by 18%.' },
      { index: 6, title: 'Algorithmic Yield Prediction', content: 'By cross-referencing biological growth models with forecasted meteorological data, the machine learning matrix predicts the exact tonnage of output per region with 96% accuracy, up to 45 days before the harvest begins.' },
      { index: 7, title: 'Predictive Cold-Chain Routing', content: 'Harvested goods are highly perishable. The ERP calculates the transit time from rural farms to centralized processing plants. It dynamically dispatches refrigerated fleets based on predicted yield density and real-time highway traffic APIs, completely preventing processing bottlenecks.' },
      { index: 8, title: 'Blockchain Provenance Ledger', content: 'To satisfy strict export regulations, the lifecycle of every batch—from seed origin and chemical application to harvest date and transit temperature—is hashed onto an immutable ledger, providing verifiable Farm-to-Fork traceability for international regulators.' },
      { index: 9, title: 'Commodity Market Sync', content: 'The predictive yield data interfaces directly with global commodity pricing APIs. The system advises the corporate trading desk on exactly when to hedge forward contracts, maximizing arbitrage opportunities based on our proprietary knowledge of upcoming supply gluts.' },
      { index: 10, title: 'Empirical Yield & Sustainability ROI', content: 'Invade Agro pushed aggregate crop yields up by 22% while dropping chemical runoff by 18%. Post-harvest spoilage was slashed by 41%. The conglomerate achieved unprecedented margins, turning chaotic biological variables into an optimized, predictable assembly line.' }
    ],
    simulator: {
      title: 'Precision Agriculture ROI Simulator',
      description: 'Model the capital reclaimed by optimizing yields and eliminating chemical waste via Invade Agro.',
      initialValues: { hectares: 2000000, yieldValue: 1500, chemCost: 300 },
      sliders: [
        { key: 'hectares', label: 'Managed Hectares', min: 100000, max: 10000000, step: 100000, format: formatNumber },
        { key: 'yieldValue', label: 'Avg Yield Value per Hectare ($)', min: 500, max: 5000, step: 100, format: v => `$${v}` },
        { key: 'chemCost', label: 'Legacy Chemical Cost per Hectare ($)', min: 50, max: 1000, step: 50, format: v => `$${v}` }
      ],
      calculate: (v) => {
        const baseRevenue = v.hectares * v.yieldValue;
        const optimizedYield = baseRevenue * 1.22; // 22% increase
        const chemSavings = v.hectares * v.chemCost * 0.18; // 18% savings
        return [
          { label: 'Chemical OPEX Eliminated', value: formatCurrency(chemSavings), primary: false },
          { label: 'New Revenue via Yield Optimization', value: formatCurrency(optimizedYield - baseRevenue), primary: true, subtext: 'Pure Top-Line Addition' }
        ];
      }
    }
  },
  {
    id: 'invade-mill',
    industry: 'Manufacturing',
    title: 'Invade Mill',
    subtitle: 'Autonomous Factory Orchestration.',
    theme: { colorName: 'stone', text: 'text-stone-400', bgSoft: 'bg-stone-500/10', borderSoft: 'border-stone-500/30', accent: 'accent-stone-500', gradientText: 'from-stone-400 to-yellow-600', simBg: 'bg-[#0a0a0a]', simBorder: 'border-stone-800/50', simGlow: 'bg-yellow-900/20' },
    spec: { target: 'Global Steel/Textile Mill', scale: '45 Global Facilities', metric: 'Unplanned Downtime -45%' },
    trust: { compliance: 'IEC 62443 / ISO 9001', uptime: '99.999%', dataVolume: '4M IoT Pings/Sec' },
    chartData: { title: 'Machine Uptime vs QA Defect Rate', subtitle: 'OEE (Overall Equipment Effectiveness) Gain', points: [ {label: 'Month 1', val1: 65, val1Pct: 65, val1Label: 'Legacy OEE', val2: 78, val2Pct: 78, val2Label: 'Mill OS'}, {label: 'Month 3', val1: 68, val1Pct: 68, val1Label: 'Legacy OEE', val2: 89, val2Pct: 89, val2Label: 'Mill OS'}, {label: 'Month 6', val1: 66, val1Pct: 66, val1Label: 'Legacy OEE', val2: 96, val2Pct: 96, val2Label: 'Mill OS'} ] },
    metrics: [
      { icon: Factory, title: 'Unplanned Downtime', value: '-45.8%', detail: 'Eliminated via acoustic and thermal anomaly detection.' },
      { icon: Box, title: 'QA Defect Rate', value: '0.02%', detail: 'Achieved via sub-millimeter computer vision inspection.' }
    ],
    sections: [
      { title: 'Executive Abstract', content: 'Invade Mill is an ultra-low-latency Manufacturing Execution System (MES) designed to orchestrate heavy industrial operations. Deployed across 45 facilities for a global manufacturing conglomerate, the system leverages high-frequency IoT telemetry and computer vision to achieve near-autonomous Quality Assurance (QA) and predictive maintenance, eliminating catastrophic downtime.' },
      { index: 1, title: 'The Industrial Bottleneck', content: 'The client’s heavy machinery (blast furnaces, high-speed looms) operated blindly. Bearings and motors would fail unpredictably, causing multi-day line stoppages. Furthermore, QA relied on manual human sampling, allowing micro-defects to slip into the supply chain, triggering million-dollar vendor penalties.' },
      { index: 2, title: 'The Core Engineering Problem', content: 'We needed to ingest and process 4 million IoT sensor pings per second (vibration, acoustic, thermal) directly from the factory floor, identifying micro-anomalies and actuating machine-braking protocols in under 5 milliseconds to prevent catastrophic mechanical failures.' },
      { index: 3, title: 'Edge Computing Fabric', content: 'Cloud latency is too slow for physical safety protocols. We deployed heavy Edge-Compute nodes directly on the factory floor using Kubernetes. These nodes process acoustic and vibration telemetry using localized neural networks, communicating with Programmable Logic Controllers (PLCs) instantly via the OPC-UA protocol.' },
      { index: 4, title: 'Predictive Acoustic Matrices', content: 'The AI model listens to the specific acoustic signature of spinning turbines. By mapping Fourier transforms of the audio against historical degradation data, the system predicts bearing failures with 98% accuracy up to 3 weeks before the metal physically shears.' },
      { index: 5, title: 'Computer Vision QA Automation', content: 'We mounted high-speed 4K cameras directly over the production line. A custom Convolutional Neural Network (CNN) analyzes the fast-moving product (textile weaves or steel sheets) for sub-millimeter defects in real-time. If a defect is detected, the line is instantly halted or the specific section is tagged for robotic removal.' },
      { index: 6, title: 'Algorithmic Queue Shuffling', content: 'If a specific machine requires predictive maintenance, the Invade Mill OS automatically re-shuffles the global manufacturing queue. It routes high-priority orders to redundant lines or alternate facilities seamlessly, ensuring zero disruption to client delivery SLAs.' },
      { index: 7, title: 'Digital Twin Telemetry', content: 'Floor managers are provided with a complete 3D WebGL Digital Twin of the facility. They can view the real-time thermal output, stress loads, and queue status of every single machine overlaid on the visual model, completely eradicating physical clipboard tracking.' },
      { index: 8, title: 'Just-In-Time Spare Parts', content: 'The predictive maintenance engine integrates directly with the ERP procurement module. When a failure is predicted for next month, the system autonomously queries global supply chains and purchases the specific OEM spare part, ensuring it arrives exactly one day before the scheduled repair.' },
      { index: 9, title: 'OT/IT Air-Gapped Security', content: 'Industrial Control Systems (ICS) are prime targets for ransomware. We strictly segregated the Operational Technology (OT) from Information Technology (IT) networks using unidirectional data diodes, making it physically impossible for web-based malware to manipulate factory machines.' },
      { index: 10, title: 'Empirical Yield & Operational Alpha', content: 'Invade Mill increased Overall Equipment Effectiveness (OEE) from 65% to 96%. Unplanned downtime dropped by 45.8%, and automated QA virtually eliminated vendor return penalties. The factories transitioned from chaotic break-fix environments to perfectly tuned algorithmic engines.' }
    ],
    simulator: {
      title: 'Industrial OEE & Uptime Simulator',
      description: 'Model the massive capital recovered by algorithmically predicting machine failure and eliminating unplanned downtime.',
      initialValues: { machines: 5000, downtimeHrs: 15000, costPerHr: 10000 },
      sliders: [
        { key: 'machines', label: 'Active Heavy Machinery', min: 100, max: 20000, step: 100, format: formatNumber },
        { key: 'downtimeHrs', label: 'Annual Unplanned Downtime (Hrs)', min: 1000, max: 100000, step: 1000, format: formatNumber },
        { key: 'costPerHr', label: 'Cost of Line Stoppage ($/Hr)', min: 1000, max: 50000, step: 1000, format: v => `$${v}` }
      ],
      calculate: (v) => {
        const legacyBleed = v.downtimeHrs * v.costPerHr;
        const recoveredHrs = v.downtimeHrs * 0.458; // 45.8% reduction
        const recoveredCapital = recoveredHrs * v.costPerHr;
        return [
          { label: 'Unplanned Hours Eliminated', value: formatNumber(Math.floor(recoveredHrs)), primary: false },
          { label: 'Capital Reclaimed via Predictive Uptime', value: formatCurrency(recoveredCapital), primary: true, subtext: 'Recaptured Gross Margin' }
        ];
      }
    }
  },
  {
    id: 'iit-nzi',
    industry: 'EdTech',
    title: 'IIT Delhi COE NZI',
    subtitle: 'Net Zero Initiative Matrix.',
    theme: { colorName: 'teal', text: 'text-teal-400', bgSoft: 'bg-teal-500/10', borderSoft: 'border-teal-500/30', accent: 'accent-teal-500', gradientText: 'from-teal-400 to-emerald-500', simBg: 'bg-[#020a0a]', simBorder: 'border-teal-900/30', simGlow: 'bg-teal-900/20' },
    spec: { target: 'Center of Excellence (COE)', scale: 'Campus Wide Grid', metric: 'Absolute Zero Trajectory' },
    trust: { compliance: 'GHG Protocol / ISO 14064', uptime: '99.99%', dataVolume: 'Smart Grid Telemetry' },
    chartData: { title: 'Projected Carbon Deceleration', subtitle: 'CO2e (Tons) vs Year', points: [ {label: '2024', val1: 45000, val1Pct: 100, val1Label: 'Baseline', val2: 40000, val2Pct: 90, val2Label: 'Optimized'}, {label: '2026', val1: 46000, val1Pct: 100, val1Label: 'Baseline', val2: 28000, val2Pct: 60, val2Label: 'Optimized'}, {label: '2030', val1: 48000, val1Pct: 100, val1Label: 'Baseline', val2: 12000, val2Pct: 25, val2Label: 'Optimized'} ] },
    metrics: [
      { icon: Leaf, title: 'Scope 3 Accuracy', value: '+85%', detail: 'Via algorithmic supply chain vendor tracing.' },
      { icon: Activity, title: 'Audit Reporting', value: 'Instant', detail: 'Eliminated 6 weeks of manual spreadsheet calculations.' }
    ],
    sections: [
      { title: 'Executive Abstract', content: 'InvadeCode partnered with the IIT Delhi Center of Excellence to architect a comprehensive digital matrix for their ambitious Net Zero Initiative (NZI). We built a highly complex Scope Emissions Calculator capable of ingesting vast, disparate campus telemetry to mathematically model and enforce the trajectory to carbon neutrality.' },
      { index: 1, title: 'The Carbon Data Fragmentation', content: 'Before our intervention, emissions data was dangerously scattered across utility bills, disorganized procurement ledgers, subjective staff commuting surveys, and heavy laboratory equipment telemetry. Manual calculation of CO2e was prone to massive margins of error, making verifiable progress impossible.' },
      { index: 2, title: 'The Core Engineering Problem', content: 'We needed to build a unified mathematical engine that could convert chaotic raw data (liters of diesel, KWh of grid electricity, tons of procured steel for construction) into standardized CO2e metrics in real-time, adapting instantly to fluctuating global emission factors.' },
      { index: 3, title: 'Data Ingestion & Normalization API', content: 'We deployed a suite of RESTful APIs to hook directly into the campus facility management systems. The engine automatically pulls live smart-meter readings, HVAC chiller power consumption, and diesel generator logs, ensuring human error is entirely removed from Scope 1 and 2 tracking.' },
      { index: 4, title: 'Algorithmic Scope Engine', content: 'The core backend is a high-performance calculation matrix built on Rust. It strictly categorizes inputs into Scope 1, Scope 2, and the highly complex Scope 3 emissions using dynamic emission factors updated continuously via external global environmental databases (EPA, DEFRA).' },
      { index: 5, title: 'Scope 3 Supply Chain Tracing', content: 'Scope 3 (indirect emissions) is notoriously difficult to track. We built a vendor portal where suppliers input their manufacturing metrics. The algorithm dynamically traces the embedded carbon of all procured campus materials (from laptops to concrete), enforcing strict emission caps on university vendors.' },
      { index: 6, title: 'Predictive Reduction Modeling', content: 'The tool functions as an active simulator. Campus administrators can manipulate variables ("What if we install 2MW of solar on the library?" or "What if we switch 40% of the shuttle fleet to EV?"), and the engine instantly recalculates the multi-year trajectory towards the Net Zero date.' },
      { index: 7, title: 'Interactive GIS Campus Mapping', content: 'Emissions data is visualized on a 3D digital twin of the IIT campus. Heatmaps instantly identify high-emission buildings or inefficient laboratory clusters, allowing facilities management to perform highly targeted, data-driven energy audits.' },
      { index: 8, title: 'Automated Compliance Reporting', content: 'The system auto-generates exhaustive, audit-ready compliance reports formatted perfectly to international standards (GHG Protocol, ISO 14064) with a single click, completely eliminating the grueling 6-week manual auditing process.' },
      { index: 9, title: 'Threat Vector & Data Isolation', content: 'Operating within a premier research institute requires strict data governance. The architecture features OIDC-based authentication and secure multi-tenant isolation, protecting sensitive vendor pricing and proprietary laboratory energy profiles from lateral access.' },
      { index: 10, title: 'Empirical Yield', content: 'The tool provided unprecedented, mathematical clarity on the institution\'s exact footprint, enabling aggressive fast-tracking of Net Zero goals. It established InvadeCode\'s capability to build rigorous, compliance-grade environmental algorithmic modeling for massive institutions.' }
    ],
    simulator: {
      title: 'Scope Emission Trajectory Simulator',
      description: 'Model the impact of infrastructural shifts on campus-wide CO2e metrics to hit Net Zero milestones.',
      initialValues: { fleetEV: 10, solarMW: 2, hvacEff: 5 },
      sliders: [
        { key: 'fleetEV', label: 'Fleet Converted to EV (%)', min: 0, max: 100, step: 5, format: v => `${v}%` },
        { key: 'solarMW', label: 'Solar Capacity Installed (MW)', min: 0, max: 20, step: 0.5, format: v => `${v} MW` },
        { key: 'hvacEff', label: 'HVAC Optimization Gain (%)', min: 0, max: 30, step: 1, format: v => `${v}%` }
      ],
      calculate: (v) => {
        const baseEmissions = 45000; // Tons
        const reduction = (v.fleetEV * 20) + (v.solarMW * 800) + (v.hvacEff * 150);
        return [
          { label: 'CO2e Tons Eliminated Annually', value: formatNumber(reduction), primary: false },
          { label: 'Projected Campus Emissions (CO2e)', value: formatNumber(Math.max(0, baseEmissions - reduction)), primary: true, subtext: 'Towards Absolute Zero' }
        ];
      }
    }
  },
  {
    id: 'iit-ra',
    industry: 'EdTech',
    title: 'IIT Delhi CEO RA',
    subtitle: 'Resource Allocation Engine.',
    theme: { colorName: 'blue', text: 'text-blue-400', bgSoft: 'bg-blue-500/10', borderSoft: 'border-blue-500/30', accent: 'accent-blue-500', gradientText: 'from-blue-400 to-indigo-500', simBg: 'bg-[#02060a]', simBorder: 'border-blue-900/30', simGlow: 'bg-blue-900/20' },
    spec: { target: 'Chief Executive Office', scale: '$500M+ Research Grants', metric: 'Capital Utilization 99%' },
    trust: { compliance: 'SOC2 / Academic ISO', uptime: '99.99%', dataVolume: 'Distributed Compute Sync' },
    chartData: { title: 'Grant Utilization Velocity', subtitle: 'Capital Deployed vs Time', points: [ {label: 'Q1', val1: 45, val1Pct: 45, val1Label: 'Manual Spreadsheets', val2: 85, val2Pct: 85, val2Label: 'RA Engine'}, {label: 'Q2', val1: 60, val1Pct: 60, val1Label: 'Manual Spreadsheets', val2: 92, val2Pct: 92, val2Label: 'RA Engine'}, {label: 'Q3', val1: 75, val1Pct: 75, val1Label: 'Manual Spreadsheets', val2: 99, val2Pct: 99, val2Label: 'RA Engine'} ] },
    metrics: [
      { icon: Cpu, title: 'HPC Cluster Idle Time', value: '-88%', detail: 'Optimized via algorithmic compute task queuing.' },
      { icon: Briefcase, title: 'Grant Leakage', value: '0.0%', detail: 'Perfect compliance enforced via smart-contracts.' }
    ],
    sections: [
      { title: 'Executive Abstract', content: 'InvadeCode engineered the Chief Executive Office Resource Allocation (RA) engine for IIT Delhi. We built a mathematical scheduler that dynamically routes high-performance compute (HPC) bandwidth, heavy laboratory hardware, and multi-million dollar grant funding across 400+ simultaneous advanced research projects, eliminating idle time and capital leakage.' },
      { index: 1, title: 'The Academic Bottleneck', content: 'Managing hundreds of competing research projects using legacy software resulted in massive inefficiencies. Million-dollar supercomputers sat idle due to poor scheduling, while researchers waited months for basic procurement approvals. Unspent grant money risked being recalled by federal agencies due to lack of velocity.' },
      { index: 2, title: 'The Core Engineering Problem', content: 'We had to design an autonomous multi-variable scheduler that could balance strict financial compliances, fluctuating hardware availability, and prioritized deadlines without human arbitration, ensuring 99% utilization of all institutional assets.' },
      { index: 3, title: 'HPC & Cloud Cluster Orchestration', content: 'The RA engine interfaces directly with the university’s High-Performance Computing (HPC) clusters via Kubernetes APIs. It automatically profiles the compute requirements of submitted research code (e.g., fluid dynamics simulations) and queues them during mathematically optimal micro-windows, slashing idle server time by 88%.' },
      { index: 4, title: 'Smart-Contract Grant Management', content: 'Federal grants come with extreme compliance requirements. The system tokenizes grant budgets using internal smart-contracts. Funds are algorithmically locked to specific approved vendors and research milestones, making unauthorized capital diversion physically impossible.' },
      { index: 5, title: 'Predictive Procurement & SCM', content: 'Research delays were largely driven by slow procurement of specialized equipment. The RA engine predicts lead times for rare chemicals or hardware based on global supply chain analytics, automatically initiating purchase orders weeks before the researcher actually needs the asset in the lab.' },
      { index: 6, title: 'Dynamic Lab Hardware Routing', content: 'Heavy equipment (like Electron Microscopes) is tracked via IoT tags. The system functions as a dynamic ride-sharing app for hardware. It schedules time-slots across multiple departments, calculating the exact transit time between labs to maximize the asset’s uptime.' },
      { index: 7, title: 'Automated Financial Reconciliation', content: 'As compute time is used or chemicals are delivered, the RA engine instantly burns down the specific grant ledger in real-time. This eliminates the end-of-year accounting nightmare, allowing the CEO’s office to view the exact financial burn-rate of every project on a live dashboard.' },
      { index: 8, title: 'Machine Learning Prioritization', content: 'When resource conflicts occur (e.g., two projects need the same supercomputer), the ML matrix weighs the prestige of the grant, the imminent deadline, and historical velocity to algorithmically prioritize the queue, removing academic politics from the equation.' },
      { index: 9, title: 'Zero-Trust Academic Security', content: 'Protecting un-published, multi-million dollar research data is critical. The system utilizes strict RBAC and field-level encryption. A researcher in the physics department cannot query the compute parameters or vendor list of a defense-funded engineering project.' },
      { index: 10, title: 'Empirical Yield', content: 'The RA Engine accelerated institutional research velocity by orders of magnitude. Capital utilization hit 99%, ensuring zero federal grants were recalled. InvadeCode successfully applied Wall Street-grade high-frequency scheduling logic to the pinnacle of academia.' }
    ],
    simulator: {
      title: 'Institutional Resource ROI Simulator',
      description: 'Model the research capital unlocked by algorithmically eliminating HPC idle time and administrative overhead.',
      initialValues: { grants: 500, idleCompute: 35, adminOverhead: 20 },
      sliders: [
        { key: 'grants', label: 'Total Active Grants ($M)', min: 50, max: 2000, step: 50, format: v => `$${v}M` },
        { key: 'idleCompute', label: 'Legacy Compute Idle Time (%)', min: 10, max: 80, step: 5, format: v => `${v}%` },
        { key: 'adminOverhead', label: 'Grant Admin Overhead (%)', min: 5, max: 40, step: 1, format: v => `${v}%` }
      ],
      calculate: (v) => {
        const computeSaved = (v.grants * 0.2) * (v.idleCompute / 100); // Assume 20% of grant goes to compute
        const adminSaved = v.grants * (v.adminOverhead / 100) * 0.8; // Save 80% of admin overhead
        const totalUnlocked = (computeSaved + adminSaved) * 1000000;
        return [
          { label: 'Admin Overhead Eliminated', value: formatCurrency(adminSaved * 1000000), primary: false },
          { label: 'Total Capital Unlocked for R&D', value: formatCurrency(totalUnlocked), primary: true, subtext: 'Accelerated Research Velocity' }
        ];
      }
    }
  },
  {
    id: 'fintech',
    industry: 'Finance',
    title: 'Global FinTech Ledger',
    subtitle: 'Cross-Border Reconciliation Matrix.',
    theme: { colorName: 'indigo', text: 'text-indigo-400', bgSoft: 'bg-indigo-500/10', borderSoft: 'border-indigo-500/30', accent: 'accent-indigo-500', gradientText: 'from-indigo-400 to-blue-500', simBg: 'bg-[#050510]', simBorder: 'border-indigo-900/30', simGlow: 'bg-indigo-900/20' },
    spec: { target: 'Tier-1 Payment Gateway', scale: '140+ Countries', metric: 'Reconciliation < 12ms' },
    trust: { compliance: 'PCI-DSS Level 1', uptime: '99.9999%', dataVolume: '8.4B Tx/Day' },
    chartData: { title: 'Reconciliation Latency vs Volume', subtitle: 'P99 Latency (ms) Scaling Trajectory', points: [ {label: '10M Tx', val1: 450, val1Pct: 80, val1Label: 'Legacy Mainframe', val2: 11, val2Pct: 5, val2Label: 'Distributed Ledger'}, {label: '50M Tx', val1: 800, val1Pct: 90, val1Label: 'Legacy Mainframe', val2: 12, val2Pct: 6, val2Label: 'Distributed Ledger'}, {label: '100M Tx', val1: 2400, val1Pct: 100, val1Label: 'Legacy Mainframe', val2: 12, val2Pct: 6, val2Label: 'Distributed Ledger'} ] },
    metrics: [
      { icon: Globe, title: 'Nostro/Vostro Sync', value: 'Real-Time', detail: 'Replaced archaic T+2 day batch processing.' },
      { icon: Shield, title: 'Fraud False Positives', value: '-82%', detail: 'Dropped via ML graph-node relationship analysis.' }
    ],
    sections: [
      { title: 'Executive Abstract', content: 'InvadeCode overhauled the core transaction switching engine for a Tier-1 Global Payment Gateway handling 8.4 Billion daily requests. By systematically deprecating their monolithic mainframe architecture, we engineered a distributed, multi-region ledger capable of sub-15ms real-time cross-border reconciliation, unlocking hundreds of millions in trapped liquidity.' },
      { index: 1, title: 'The Mainframe Paralysis', content: 'The client’s legacy system relied on AS400 mainframes executing T+2 day batch processing for Nostro/Vostro account settlement. This latency induced massive FX (Foreign Exchange) exposure risk across volatile emerging markets. Worse, it required locking up over $400M+ in collateral liquidity daily to guarantee clearing across 140 countries.' },
      { index: 2, title: 'The Concurrency Bottleneck', content: 'The primary engineering challenge was the CAP theorem. We had to achieve strictly consistent, ACID-compliant ledger writes across geographically dispersed datacenter nodes (Tokyo, London, NY) while maintaining a P99 transaction latency of under 15ms. If latency spiked, point-of-sale terminals globally would time out, causing cascading transaction failures.' },
      { index: 3, title: 'Distributed SQL Architecture', content: 'We deployed a distributed SQL database matrix utilizing true consensus algorithms (Raft). This allowed us to shard financial data geographically—ensuring European data stays in the EU for GDPR—while maintaining strict global serializability for every transaction, eliminating the need for manual end-of-day reconciliation.' },
      { index: 4, title: 'Real-Time FX Routing Matrix', content: 'The custom routing engine continuously ingests live liquidity APIs from global Tier-1 banks. It dynamically calculates the mathematically optimal route for cross-border transactions using Dijkstra’s algorithm modified for spread costs, instantly minimizing FX spread loss for the gateway on every single swipe.' },
      { index: 5, title: 'Graph Neural Network Fraud Engine', content: 'We replaced rigid, rule-based fraud engines with a continuous Graph Neural Network (GNN). The model analyzes 400+ metadata points per transaction, mapping complex device telemetry and sub-second behavioral patterns. This contextual analysis slashed false-positive card declines by 82%, rescuing $85M in blocked legitimate revenue.' },
      { index: 6, title: 'Smart Contract Settlement Layer', content: 'For large B2B wholesale transactions, we integrated a private enterprise blockchain module. This executes highly programmable smart contracts that automatically release held escrow funds upon digital bill-of-lading verification, completely removing the need for manual clearinghouse intervention.' },
      { index: 7, title: 'Active-Active Multi-Region Failover', content: 'The architecture features active-active multi-region deployments with zero single points of failure. If the EU-West node drops due to a fiber cut, traffic is instantly BGP-routed to US-East. State is preserved via the consensus protocol, resulting in zero data loss and zero impact on the consumer checkout experience.' },
      { index: 8, title: 'Automated AML & Regulatory Compliance', content: 'The system automatically formats and dispatches SARs (Suspicious Activity Reports) to FinCEN and Interpol APIs in real-time. By applying NLP to transaction memos and correlating watchlists, the system removed thousands of hours of manual compliance overhead.' },
      { index: 9, title: 'PCI-DSS Cryptographic Security', content: 'All PAN (Primary Account Number) data is aggressively tokenized at the extreme edge of the network. Cryptographic keys are rotated autonomously every 60 minutes via Hardware Security Modules (HSMs), ensuring military-grade transaction security that exceeds PCI-DSS Level 1 requirements.' },
      { index: 10, title: 'Empirical Yield & Capital Efficiency', content: 'The gateway now comfortably processes 8.4B transactions daily with a flat P99 latency of 12ms regardless of load spikes. The shift to real-time reconciliation unlocked over $412M in daily trapped collateral, redefining the client’s capital efficiency and allowing them to aggressively fund new market acquisitions.' }
    ],
    simulator: {
      title: 'Liquidity & Latency ROI Simulator',
      description: 'Model the exact capital unlocked by shifting from T+2 batch processing to InvadeCode\'s real-time distributed ledgers.',
      initialValues: { volume: 50, fxSpread: 2.5, trappedCap: 400 },
      sliders: [
        { key: 'volume', label: 'Daily Tx Volume (Millions)', min: 1, max: 200, step: 1, format: v => `${v}M` },
        { key: 'fxSpread', label: 'Avg FX Spread Optimization (bps)', min: 0.5, max: 10, step: 0.5, format: v => `${v} bps` },
        { key: 'trappedCap', label: 'Trapped T+2 Collateral ($M)', min: 50, max: 2000, step: 50, format: v => `$${v}M` }
      ],
      calculate: (v) => {
        const spreadSavings = (v.volume * 1000000) * 50 * (v.fxSpread / 10000) * 365; // Assume $50 avg tx
        return [
          { label: 'T+2 Collateral Unlocked Instantly', value: formatCurrency(v.trappedCap * 1000000), primary: false },
          { label: 'Annual FX Spread Recaptured', value: formatCurrency(spreadSavings), primary: true, subtext: 'Pure Profit Margin Addition' }
        ];
      }
    }
  },
  {
    id: 'telecom',
    industry: 'Telecom',
    title: '5G Network Auto-Scaler',
    subtitle: 'Predictive Bandwidth Allocation.',
    theme: { colorName: 'lime', text: 'text-lime-500', bgSoft: 'bg-lime-500/10', borderSoft: 'border-lime-500/30', accent: 'accent-lime-500', gradientText: 'from-lime-400 to-green-500', simBg: 'bg-[#050a02]', simBorder: 'border-lime-900/30', simGlow: 'bg-lime-900/20' },
    spec: { target: 'Tier-1 Telco Provider', scale: '85,000+ Cell Nodes', metric: 'Energy Costs -32.4%' },
    trust: { compliance: '3GPP / SOC2 Type II', uptime: '99.999%', dataVolume: '5.2TB/Hr Handshake Logs' },
    chartData: { title: 'Node Power Consumption', subtitle: 'KW/h vs Density Over 24Hrs', points: [ {label: '02:00', val1: 450, val1Pct: 100, val1Label: 'Static Load', val2: 120, val2Pct: 26, val2Label: 'Auto-Scaled'}, {label: '14:00', val1: 450, val1Pct: 100, val1Label: 'Static Load', val2: 440, val2Pct: 98, val2Label: 'Auto-Scaled'}, {label: '22:00', val1: 450, val1Pct: 100, val1Label: 'Static Load', val2: 210, val2Pct: 46, val2Label: 'Auto-Scaled'} ] },
    metrics: [
      { icon: ZapOff, title: 'Energy OPEX Reduced', value: '32.4%', detail: 'Saved by dynamically sleeping idle cellular antennas.' },
      { icon: Route, title: 'Packet Drop Rate', value: '< 0.01%', detail: 'Maintained pristine QoS during unpredictable peak loads.' }
    ],
    sections: [
      { title: 'Executive Abstract', content: 'InvadeCode built a deep-learning Network Orchestrator for a Tier-1 5G Telecom provider. The system autonomously scales cellular tower power up and down based on predictive human density modeling. By replacing static power matrices with dynamic ML routing, we slashed energy costs by tens of millions without impacting Quality of Service (QoS).' },
      { index: 1, title: 'The Energy OPEX Hemorrhage', content: '5G massive MIMO antennas consume significantly more electricity than legacy 4G nodes. The provider\'s network ran at 100% transmit capacity 24/7. Even at 3:00 AM when a commercial sector was entirely empty, the towers were blasting full RF (Radio Frequency), resulting in a massive, unnecessary OPEX hemorrhage.' },
      { index: 2, title: 'The Engineering Tightrope', content: 'Powering down a node arbitrarily risks dropping active VoLTE calls or degrading emergency 911 services. We needed a model that could predict hyper-local human density down to the minute, adjusting RF tilt, power bands, and sleep cycles instantly without human intervention.' },
      { index: 3, title: 'LSTM Density Mapping', content: 'We trained a Long Short-Term Memory (LSTM) neural network on 3 years of historical tower handshake logs (anonymized device pings). The model learned to perfectly map the ebb and flow of human traffic—daily rush hours, spontaneous stadium events, and quiet residential nights.' },
      { index: 4, title: 'Autonomous Micro-Sleeping', content: 'During predicted low-load windows, the orchestrator issues commands via the O-RAN (Open Radio Access Network) interface to selectively put massive antenna arrays into deep sleep micro-cycles. It maintains a thin, low-power coverage layer for baseline connectivity, waking the heavy arrays only when load requires it.' },
      { index: 5, title: 'Dynamic Bandwidth Steering', content: 'During anomalous spikes (e.g., an unannounced concert or protest), the system detects connection density deviations instantly. It wakes adjacent sleeping towers and steers bandwidth using intelligent beamforming to prevent gridlock, effectively acting as an automated traffic cop for the RF spectrum.' },
      { index: 6, title: 'Self-Healing Mesh Integration', content: 'If a tower experiences sudden hardware failure, the ERP detects the packet loss. It automatically commands surrounding nodes to increase their transmit power and alter their physical tilt to cover the newly created physical blind spot, ensuring continuous service while a repair truck is dispatched.' },
      { index: 7, title: 'Real-Time Kafka Billing Sync', content: 'Network usage telemetry is piped directly into the enterprise billing module via Apache Kafka. This ensures data-caps, throttling limits, and international roaming charges are resolved and applied instantaneously, rather than relying on delayed overnight batch files.' },
      { index: 8, title: 'Predictive Hardware Degradation', content: 'By analyzing internal antenna temperatures, voltage draw, and environmental weather data, the system predicts hardware degradation. It dispatches technicians to replace failing transceivers days before they actually break, eliminating unplanned network outages.' },
      { index: 9, title: 'RAN-Level Zero-Trust Security', content: 'The orchestration layer operates behind a strict, air-gapped DMZ. All commands transmitted to the Radio Access Network (RAN) are cryptographically signed using rotating keys to prevent malicious state-actors from hijacking tower frequencies or initiating denial-of-service attacks.' },
      { index: 10, title: 'Empirical Yield & Boardroom Impact', content: 'The telco slashed their gross network energy consumption by 32.4%, realizing over $85M in annualized OPEX savings. Furthermore, because the network now breathes with the population, peak-time connection speeds actually improved, proving that InvadeCode can optimize planetary-scale infrastructure.' }
    ],
    simulator: {
      title: '5G Node Auto-Scaler Simulator',
      description: 'Model the massive energy OPEX savings achieved by dynamically sleeping idle cellular arrays using predictive ML.',
      initialValues: { nodes: 85000, costPerKwh: 0.15, sleepGain: 32 },
      sliders: [
        { key: 'nodes', label: 'Active 5G Nodes', min: 1000, max: 200000, step: 1000, format: formatNumber },
        { key: 'costPerKwh', label: 'Commercial Power Cost ($/kWh)', min: 0.05, max: 0.50, step: 0.01, format: v => `$${v}` },
        { key: 'sleepGain', label: 'Energy Reduction (%)', min: 10, max: 50, step: 1, format: v => `${v}%` }
      ],
      calculate: (v) => {
        const annualUsage = v.nodes * 25000; // Average 5G node uses 25,000 kWh annually
        const legacyCost = annualUsage * v.costPerKwh;
        const savings = legacyCost * (v.sleepGain / 100);
        return [
          { label: 'Legacy Annual Power OPEX', value: formatCurrency(legacyCost), primary: false },
          { label: 'Capital Reclaimed via Auto-Scale', value: formatCurrency(savings), primary: true, subtext: 'Pure Profit Margin Addition' }
        ];
      }
    }
  },
  {
    id: 'kerala',
    industry: 'Healthcare',
    title: 'State-Wide Dengue Predictor',
    subtitle: 'Epidemiological Decision Support System.',
    theme: { colorName: 'rose', text: 'text-rose-500', bgSoft: 'bg-rose-500/10', borderSoft: 'border-rose-500/30', accent: 'accent-rose-500', gradientText: 'from-rose-500 to-pink-600', simBg: 'bg-[#100508]', simBorder: 'border-rose-900/30', simGlow: 'bg-rose-900/20' },
    spec: { target: 'Southern State Health Ministry', scale: '14 Districts', metric: 'Predictive Lead Time: 18 Days' },
    trust: { compliance: 'HIPAA / ISO 27799', uptime: '99.99%', dataVolume: '1.2B Clinical Rows' },
    metrics: [
      { icon: HeartPulse, title: 'Outbreak Mitigation', value: '34% Drop', detail: 'In severe localized cluster outbreaks year-over-year.' },
      { icon: MapPin, title: 'Spatial Accuracy', value: '92.4%', detail: 'Precision in predicting micro-ward vector breeding.' }
    ],
    sections: [
      { title: 'Executive Abstract', content: 'InvadeCode partnered with a Southern State Government to architect a predictive Epidemiological Decision Support System (DSS). The objective was to transition the state\'s dengue fever response from reactive crisis management to proactive, algorithmic intervention using climatic and clinical data overlays.' },
      { index: 1, title: 'The Epidemiological Chaos', content: 'Historically, the State Health Department relied on delayed, manual reporting from over 4,000 public and private clinics. By the time a dengue cluster was identified on a spreadsheet, the outbreak had already exponentially expanded, making fogging and vector-control interventions mathematically futile.' },
      { index: 2, title: 'The Core Engineering Problem', content: 'The primary bottleneck was data ingestion latency. We had to correlate unstructured, disparate clinical records with highly volatile external APIs tracking micro-climatic humidity, standing water accumulation, and municipal population density in real-time to find hidden mathematical correlations.' },
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
      title: 'Epidemiological Intervention Simulator',
      description: 'Model the impact of predictive lead time on mitigating state-wide viral vector clusters.',
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
  {
    id: 'retail',
    industry: 'Retail',
    title: 'Omni-Channel Retail ERP',
    subtitle: 'Algorithmic Pricing & SCM.',
    theme: { colorName: 'fuchsia', text: 'text-fuchsia-400', bgSoft: 'bg-fuchsia-500/10', borderSoft: 'border-fuchsia-500/30', accent: 'accent-fuchsia-500', gradientText: 'from-fuchsia-400 to-purple-500', simBg: 'bg-[#100410]', simBorder: 'border-fuchsia-900/30', simGlow: 'bg-fuchsia-900/20' },
    spec: { target: 'Global Fashion Brand', scale: '4,500+ Locations', metric: 'Dead Stock -82%' },
    trust: { compliance: 'PCI-DSS / GDPR', uptime: '99.99%', dataVolume: '18M Tx/Day' },
    chartData: { title: 'Dead Stock vs Inventory Turn', subtitle: 'Turn Rate (Days) vs Unsold Units', points: [ {label: 'Q1', val1: 45, val1Pct: 100, val1Label: 'Legacy Turn', val2: 12000, val2Pct: 100, val2Label: 'Dead Stock'}, {label: 'Q2', val1: 28, val1Pct: 60, val1Label: 'Legacy Turn', val2: 5000, val2Pct: 40, val2Label: 'Dead Stock'}, {label: 'Q3', val1: 14, val1Pct: 30, val1Label: 'Legacy Turn', val2: 2100, val2Pct: 15, val2Label: 'Dead Stock'} ] },
    metrics: [
      { icon: TrendingUp, title: 'Margin Optimization', value: '+14%', detail: 'Via algorithmic dynamic pricing.' },
      { icon: Box, title: 'Dead Stock', value: '-82%', detail: 'Prevented via predictive geographic routing.' }
    ],
    sections: [
      { title: 'Executive Abstract', content: 'We built a hyper-intelligent Omni-Channel ERP for a massive global fashion retailer. The system unifies physical POS, e-commerce, and warehouse data to dynamically price items and algorithmically shift inventory to prevent dead stock.' },
      { index: 1, title: 'The Inventory Silo Problem', content: 'The brand suffered from localized overstock. Winter coats would sit dead in Miami while selling out in New York. Disjointed e-commerce and physical POS ledgers meant online shoppers couldn\'t access physical store inventory.' },
      { index: 2, title: 'The Core Engineering Problem', content: 'We needed a highly concurrent database that could sync 18 million daily transactions across 4,500 physical stores and global web-traffic, providing a single, instantaneous source of truth for every SKU.' },
      { index: 3, title: 'Unified Graph Ledger', content: 'We deployed a distributed GraphQL database. Now, an online purchase instantly decrements the inventory of the nearest physical store, allowing the store to act as a micro-fulfillment center.' },
      { index: 4, title: 'Algorithmic Dynamic Pricing', content: 'The ERP continuously scrapes competitor prices and analyzes local demand elasticity. If an item is moving slowly in a specific zip code, the system autonomously drops the price by micro-increments until velocity recovers.' },
      { index: 5, title: 'Predictive Inventory Routing', content: 'Before items become dead stock, the ML engine identifies demand clusters. It automatically generates shipping manifests to transfer unsold inventory from low-demand to high-demand nodes within the network.' },
      { index: 6, title: 'Computer Vision Store Analytics', content: 'We integrated computer vision APIs with store cameras to track customer footfall and gaze duration on specific racks. This physical telemetry feeds directly into the digital pricing algorithms.' },
      { index: 7, title: 'Automated Procurement', content: 'When high-velocity items drop below a predictive threshold, the ERP autonomously triggers purchase orders to manufacturing facilities in Southeast Asia, accounting for 45-day maritime shipping delays.' },
      { index: 8, title: 'Hyper-Personalized CRM', content: 'The system unifies customer identities across physical cards and web cookies. It pushes dynamically generated discount codes via SMS for items the user physically examined in-store but didn\'t purchase.' },
      { index: 9, title: 'PCI-DSS & GDPR Compliance', content: 'All financial data is tokenized via Stripe APIs. Customer behavioral data is heavily anonymized and GDPR-compliant, ensuring the brand faces zero regulatory exposure.' },
      { index: 10, title: 'Empirical Yield', content: 'The brand reduced dead stock by 82% and increased overall margin by 14% via dynamic pricing. E-commerce conversion spiked as physical stores became instant-delivery fulfillment hubs.' }
    ],
    simulator: {
      title: 'Dead Stock Recovery Simulator',
      description: 'Model the capital reclaimed by algorithmically shifting inventory and utilizing dynamic pricing.',
      initialValues: { inventory: 500, deadPct: 15, marginGain: 14 },
      sliders: [
        { key: 'inventory', label: 'Total Annual Inventory ($M)', min: 100, max: 2000, step: 50, format: v => `$${v}M` },
        { key: 'deadPct', label: 'Legacy Dead Stock Rate (%)', min: 1, max: 30, step: 1, format: v => `${v}%` },
        { key: 'marginGain', label: 'Dynamic Pricing Gain (%)', min: 1, max: 25, step: 1, format: v => `+${v}%` }
      ],
      calculate: (v) => {
        const deadLoss = v.inventory * (v.deadPct / 100) * 1000000;
        const reclaimed = deadLoss * 0.82; // 82% recovery
        const pricingBonus = v.inventory * (v.marginGain / 100) * 1000000;
        return [
          { label: 'Dead Stock Capital Reclaimed', value: formatCurrency(reclaimed), primary: false },
          { label: 'Total Margin Recaptured', value: formatCurrency(reclaimed + pricingBonus), primary: true, subtext: 'Via Routing & Dynamic Pricing' }
        ];
      }
    }
  },
  {
    id: 'defense',
    industry: 'Defense',
    title: 'Munitions Logistics Network',
    subtitle: 'Air-Gapped SCM Matrix.',
    theme: { colorName: 'emerald', text: 'text-emerald-500', bgSoft: 'bg-emerald-500/10', borderSoft: 'border-emerald-500/30', accent: 'accent-emerald-500', gradientText: 'from-emerald-400 to-green-500', simBg: 'bg-[#020a06]', simBorder: 'border-emerald-900/30', simGlow: 'bg-emerald-900/20' },
    spec: { target: 'NATO Allied Command', scale: 'Global Theater', metric: '100% Cryptographic Audit' },
    trust: { compliance: 'DoD IL6 / NIST 800-171', uptime: '99.999%', dataVolume: 'Classified' },
    metrics: [
      { icon: Target, title: 'Fulfillment Velocity', value: '+400%', detail: 'Algorithmically routed through safe corridors.' },
      { icon: Fingerprint, title: 'Data Breaches', value: '0', detail: 'Impenetrable air-gapped quantum cryptography.' }
    ],
    sections: [
      { title: 'Executive Abstract', content: 'InvadeCode was cleared to build an ultra-secure, air-gapped Supply Chain Management system for a coalition military force. The ERP orchestrates the global movement of munitions, medical supplies, and armor while remaining cryptographically dark to adversarial interception.' },
      { index: 1, title: 'The Theater of Chaos', content: 'Military logistics rely on antiquated databases. Frontline requests took days to process, and physical supply lines were vulnerable because route data was fragmented and lacked real-time threat-intel correlation.' },
      { index: 2, title: 'The Core Engineering Problem', content: 'We had to build a globally synchronized database that operates entirely without public internet access, capable of reconciling supply states using intermittent, highly-encrypted satellite bursts.' },
      { index: 3, title: 'Air-Gapped Mesh Architecture', content: 'The system uses a decentralized mesh. Forward Operating Bases (FOBs) run localized instances of the ERP on ruggedized servers. When satellite windows open, they transmit heavily compressed, differential state-updates to Central Command.' },
      { index: 4, title: 'Algorithmic Threat Routing', content: 'The logistics module ingests classified threat-intelligence feeds. It algorithmically calculates supply routes that minimize exposure to enemy radar and kinetic threats, updating convoy manifests dynamically.' },
      { index: 5, title: 'Predictive Munitions Depletion', content: 'By analyzing live expenditure rates from smart-weapon systems during engagements, the ML engine predicts ammunition depletion, autonomously requesting resupply drops before the FOB hits critical bingo fuel.' },
      { index: 6, title: 'Cryptographic Chain of Custody', content: 'Every asset is tracked using highly classified RFID/NFC tags. The movement is logged to an internal, permissioned blockchain, ensuring that diversion or theft of military hardware is mathematically impossible to hide.' },
      { index: 7, title: 'Automated Medical Triage Sync', content: 'The system integrates with field medic telemetry. It anticipates the need for specific blood types and surgical kits based on casualty reports, automatically prioritizing these payloads on MedEvac flights.' },
      { index: 8, title: 'Zero-Knowledge Maintenance', content: 'Maintenance for complex hardware (fighter jets, armor) is scheduled predictively. The AI sends encrypted repair instructions without ever exposing the underlying schematic blueprints to the edge node.' },
      { index: 9, title: 'DoD IL6 Security Standards', content: 'The platform meets the absolute highest security clearance. It utilizes Quantum-Resistant cryptographic algorithms for all state transfers, ensuring data remains secure even against future adversarial supercomputing.' },
      { index: 10, title: 'Empirical Yield', content: 'Fulfillment velocity increased by 400%, turning days of logistical planning into hours. The system proved that InvadeCode can architect software where human lives and global security are the ultimate metrics.' }
    ],
    simulator: {
      title: 'Logistical Velocity Simulator',
      description: 'Model the impact of algorithmic routing and predictive depletion on military supply chain velocity.',
      initialValues: { requests: 5000, legacyTime: 120, velocityGain: 400 },
      sliders: [
        { key: 'requests', label: 'Monthly Supply Requests', min: 1000, max: 20000, step: 1000, format: formatNumber },
        { key: 'legacyTime', label: 'Legacy Fulfillment (Hours)', min: 24, max: 300, step: 12, format: v => `${v} Hrs` },
        { key: 'velocityGain', label: 'Algorithmic Velocity Gain (%)', min: 100, max: 800, step: 50, format: v => `+${v}%` }
      ],
      calculate: (v) => {
        const newTime = v.legacyTime / (v.velocityGain / 100);
        const hoursSaved = (v.legacyTime - newTime) * v.requests;
        return [
          { label: 'Cumulative Hours Saved/Mo', value: formatNumber(Math.floor(hoursSaved)), primary: false },
          { label: 'New Fulfillment Time', value: `${newTime.toFixed(1)} Hours`, primary: true, subtext: 'Mission-Critical Velocity' }
        ];
      }
    }
  }
];

// --- Showcase Gallery Hub ---
const GalleryView = ({ studies, onSelect }) => {
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  
  const industries = ['All', ...new Set(studies.map(s => s.industry))];
  const filteredStudies = selectedIndustry === 'All' ? studies : studies.filter(s => s.industry === selectedIndustry);

  return (
    <div className="w-full px-[3%] py-24 sm:py-32 relative z-10">
      <Reveal animation="scale-up" duration={1200} className="text-center mb-24 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-64 bg-slate-400/20 blur-[120px] rounded-full pointer-events-none animate-pulse-glow"></div>
        <h1 className="text-6xl sm:text-8xl font-extrabold tracking-tighter text-slate-900 mb-8 relative z-10 drop-shadow-sm">
          Engineering <span className="text-transparent bg-clip-text bg-gradient-to-b from-slate-600 to-slate-900">Excellence.</span>
        </h1>
        <p className="text-xl sm:text-2xl text-slate-500 font-light max-w-4xl mx-auto relative z-10 leading-relaxed">
          Explore how we systematically eradicate legacy bottlenecks, deploying autonomous, hyper-scalable algorithmic ecosystems across global industries.
        </p>
      </Reveal>

      {/* Filter Pills - Safe Scrollable Row */}
      <Reveal animation="fade-up" delay={200} duration={800} className="relative z-10 mb-16 w-full flex justify-center">
        <div className="max-w-full overflow-x-auto no-scrollbar py-2">
          <div className="flex items-center gap-3 px-4 w-max mx-auto">
            {industries.map(ind => (
              <button
                key={ind}
                onClick={() => setSelectedIndustry(ind)}
                className={`shrink-0 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-500 ${
                  selectedIndustry === ind 
                  ? 'bg-slate-900 text-white shadow-[0_10px_20px_rgba(0,0,0,0.2)] scale-105 border border-slate-700' 
                  : 'bg-white/80 backdrop-blur text-slate-500 border border-slate-200 shadow-sm hover:bg-slate-50 hover:text-slate-800 hover:shadow-md'
                }`}
              >
                {ind}
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {filteredStudies.map((study, idx) => (
          <Reveal key={study.id} delay={idx * 100} animation="fade-up" duration={1000} className="h-full">
            <button 
              onClick={() => onSelect(study.id)} 
              className="group relative w-full text-left bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-[3rem] p-10 shadow-[0_10px_40px_rgb(0,0,0,0.03)] hover:shadow-[0_30px_80px_rgb(0,0,0,0.08)] transition-all duration-700 hover:-translate-y-3 overflow-hidden flex flex-col h-full"
            >
              <div className={`absolute -top-20 -right-20 w-80 h-80 bg-${study.theme.colorName}-500/10 rounded-full blur-[80px] group-hover:scale-150 group-hover:bg-${study.theme.colorName}-500/20 transition-all duration-1000`}></div>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-slate-50/80 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              
              <div className="relative z-10 flex-1">
                <div className="flex justify-between items-start mb-8">
                   <h4 className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 bg-slate-100/50 px-3 py-1 rounded-full border border-slate-200/50">{study.industry}</h4>
                   <div className={`w-12 h-12 rounded-[1.2rem] ${study.theme.bgSoft} flex items-center justify-center border border-${study.theme.colorName}-200/50 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                      <Workflow className={`w-5 h-5 ${study.theme.text}`} />
                   </div>
                </div>
                <h3 className="text-3xl font-extrabold text-slate-900 mb-3 group-hover:text-slate-700 transition-colors tracking-tight">{study.title}</h3>
                <p className={`text-sm font-bold uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r ${study.theme.gradientText} mb-10`}>{study.subtitle}</p>
                
                <div className="space-y-4 mb-12">
                  <div className="flex justify-between items-center text-[13px] font-mono border-b border-slate-100 pb-3">
                     <span className="text-slate-500 font-semibold">Scale</span>
                     <span className="text-slate-900 font-bold truncate">{study.spec.scale}</span>
                  </div>
                  <div className="flex justify-between items-center text-[13px] font-mono">
                     <span className="text-slate-500 font-semibold">Yield</span>
                     <span className={`font-extrabold ${study.theme.text} truncate`}>{study.spec.metric}</span>
                  </div>
                </div>
              </div>

              <div className={`relative z-10 w-full pt-6 border-t border-slate-100 flex items-center justify-between`}>
                 <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest group-hover:text-slate-900 transition-colors duration-300">Explore Matrix</span>
                 <div className={`w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-${study.theme.colorName}-50 transition-colors duration-500 shadow-sm border border-slate-100 group-hover:border-${study.theme.colorName}-200/50`}>
                    <ArrowRight className={`w-5 h-5 text-slate-400 group-hover:${study.theme.text} transition-all duration-500 group-hover:translate-x-1.5`} />
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

  const [leadForm, setLeadForm] = useState({ name: '', email: '', company: '', problem: '' });
  const [submitStatus, setSubmitStatus] = useState('idle');

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('loading');
    setTimeout(() => { setSubmitStatus('success'); }, 1500); // Simulated network request for demo
  };

  return (
    <div className="w-full overflow-x-hidden min-h-screen bg-[#F4F4F5] text-slate-900 selection:bg-slate-900 selection:text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        @keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(800px); } }
        .scanline-animation { animation: scanline 6s linear infinite; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        .animate-float { animation: float 6s ease-in-out infinite; }
        @keyframes pulse-glow { 0%, 100% { opacity: 0.4; transform: scale(1); } 50% { opacity: 0.8; transform: scale(1.05); filter: drop-shadow(0 0 30px currentColor); } }
        .animate-pulse-glow { animation: pulse-glow 4s infinite alternate; }
        @keyframes sweep { 0% { background-position: 200% center; } 100% { background-position: -200% center; } }
        .animate-sweep { background-size: 200% auto; animation: sweep 6s linear infinite; }
      `}} />
      
      {/* Dynamic Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:32px_32px] opacity-40"></div>
        <div className={`absolute top-0 right-0 w-[800px] h-[800px] ${activeStudy ? `bg-${activeStudy.theme.colorName}-500/10` : 'bg-slate-400/10'} rounded-full blur-[120px] transition-colors duration-[2000ms] animate-float`}></div>
        <div className={`absolute bottom-0 left-0 w-[1000px] h-[1000px] ${activeStudy ? `bg-${activeStudy.theme.colorName}-400/5` : 'bg-slate-300/10'} rounded-full blur-[150px] transition-colors duration-[2000ms] animate-float`} style={{ animationDelay: '-3s' }}></div>
      </div>
      
      {/* Global Floating Glassmorphic Nav */}
      <div className="w-full px-[3%] sticky top-6 z-50 transition-all">
        <div className="w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 backdrop-blur-2xl py-4 px-6 sm:px-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-slate-700/50 rounded-2xl flex justify-between items-center">
          <button onClick={() => { setActiveStudyId(null); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="flex items-center space-x-6 text-slate-300 text-xs font-mono hover:text-white transition-colors cursor-pointer text-left focus:outline-none group">
            <span className="font-bold text-white flex items-center gap-3 text-[13px] tracking-widest">
              <Terminal className={`w-4 h-4 ${activeStudy ? `text-${activeStudy.theme.colorName}-400` : 'text-slate-400'} transition-colors duration-500 group-hover:scale-110`} /> 
              INVADECODE_CORE
            </span>
            <span className="hidden lg:inline text-slate-700">|</span>
            <span className="hidden lg:inline text-slate-500 font-semibold tracking-widest">SOLUTIONS_HUB_V4</span>
          </button>
          
          {activeStudy ? (
            <button onClick={() => { setActiveStudyId(null); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="flex items-center gap-2 text-[10px] sm:text-xs font-bold font-mono text-slate-400 hover:text-white transition-colors bg-slate-800/50 px-5 py-2.5 rounded-full border border-slate-700 shadow-inner hover:bg-slate-700 cursor-pointer group">
               <div className="bg-slate-900 p-1 rounded-full group-hover:bg-slate-800 transition-colors"><ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 rotate-180" /></div> RETURN TO HUB
            </button>
          ) : (
            <span className="flex items-center gap-2.5 bg-slate-800/50 text-slate-300 px-4 py-2 text-xs font-mono font-bold tracking-widest rounded-full border border-slate-700/50 backdrop-blur-md shadow-inner">
              <div className="w-2.5 h-2.5 rounded-full animate-pulse bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div> SYSTEM ONLINE
            </span>
          )}
        </div>
      </div>

      <div key={activeStudyId || 'gallery'} className="relative z-10">
        {activeStudy ? (
          <>
            <CaseStudyViewer study={activeStudy} onReturnToHub={() => { setActiveStudyId(null); window.scrollTo({top: 0, behavior: 'smooth'}); }} />
            
            {/* Seamless Next Case Study CTA */}
            <div className="w-full px-[3%] py-32 relative z-10 flex justify-center">
              <Reveal animation="blur-in" duration={1200} className="w-full">
                <button 
                  onClick={handleNextStudy}
                  className="group relative w-full overflow-hidden rounded-[3rem] sm:rounded-[4rem] bg-white/60 backdrop-blur-2xl border border-slate-200 shadow-[0_20px_60px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_100px_rgba(0,0,0,0.1)] transition-all duration-700 hover:-translate-y-2 p-10 sm:p-16 flex flex-col sm:flex-row items-center justify-between gap-10 text-left"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${nextStudyPreview.theme.gradientText} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-700`}></div>
                  <div className={`absolute -right-20 -top-20 w-80 h-80 bg-${nextStudyPreview.theme.colorName}-500/20 rounded-full blur-[100px] group-hover:scale-150 transition-transform duration-1000`}></div>
                  
                  <div>
                    <h5 className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-slate-400 mb-4 flex items-center gap-2"><Route className="w-4 h-4"/> Next Architecture</h5>
                    <h3 className="text-4xl sm:text-5xl font-extrabold tracking-tighter text-slate-900 mb-3 group-hover:text-slate-700 transition-colors">
                      {nextStudyPreview.title}
                    </h3>
                    <p className="text-base font-bold text-slate-500 uppercase tracking-widest">
                      <span className={`text-transparent bg-clip-text bg-gradient-to-r animate-sweep ${nextStudyPreview.theme.gradientText}`}>{nextStudyPreview.subtitle}</span>
                    </p>
                  </div>
                  
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center bg-slate-100 group-hover:bg-${nextStudyPreview.theme.colorName}-100 transition-colors duration-500 shrink-0 border border-slate-200 group-hover:border-${nextStudyPreview.theme.colorName}-300/50 shadow-sm`}>
                    <ArrowRight className={`w-8 h-8 text-slate-400 group-hover:text-${nextStudyPreview.theme.colorName}-600 transition-all duration-500 group-hover:translate-x-2`} />
                  </div>
                </button>
              </Reveal>
            </div>
          </>
        ) : (
          <GalleryView studies={caseStudiesData} onSelect={(id) => { setActiveStudyId(id); window.scrollTo({top: 0, behavior: 'smooth'}); }} />
        )}
      </div>

      {/* --- Massive Dark Global Footer / Contact Form --- */}
      <footer className="w-full bg-[#020617] relative overflow-hidden border-t border-slate-800 pt-40 pb-16 mt-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(15,23,42,1),transparent_80%)]"></div>
        <div className={`absolute top-0 left-0 w-[1000px] h-[1000px] rounded-full blur-[150px] opacity-20 pointer-events-none transition-colors duration-1000 ${activeStudy ? `bg-${activeStudy.theme.colorName}-600` : 'bg-slate-600'} -translate-x-1/2 -translate-y-1/2 animate-pulse-glow`}></div>
        <div className={`absolute bottom-0 right-0 w-[800px] h-[800px] rounded-full blur-[120px] opacity-15 pointer-events-none transition-colors duration-1000 ${activeStudy ? `bg-${activeStudy.theme.colorName}-400` : 'bg-slate-500'} translate-x-1/3 translate-y-1/3 animate-float`}></div>

        <div className="w-full px-[3%] relative z-10 flex flex-col lg:flex-row gap-20 lg:gap-24 items-center">
          
          <div className="lg:w-1/2 text-center lg:text-left">
            <Reveal animation="fade-right" duration={1200}>
              <h2 className="text-6xl sm:text-7xl font-extrabold tracking-tighter text-white mb-8 leading-[1.1] drop-shadow-2xl">
                Deploy your <br/><span className={`text-transparent bg-clip-text bg-gradient-to-r animate-sweep ${activeStudy ? activeStudy.theme.gradientText : 'from-slate-400 via-white to-slate-300'} transition-all duration-1000`}>Algorithmic Future.</span>
              </h2>
              <p className="text-xl text-slate-400 font-light leading-relaxed mb-12 max-w-xl mx-auto lg:mx-0">
                Stop relying on heuristic guesswork. We engineer bespoke, hyper-scalable ERPs and predictive ecosystems that turn operational bottlenecks into massive revenue multipliers.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <div className="flex items-center justify-center lg:justify-start gap-3 text-slate-300 font-mono text-xs font-bold tracking-widest bg-slate-900/50 px-5 py-3 rounded-full border border-slate-800 backdrop-blur-md">
                   <Shield className={`w-4 h-4 ${activeStudy ? activeStudy.theme.text : 'text-slate-400'} transition-colors duration-500`} /> ZERO-TRUST SECURE
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-3 text-slate-300 font-mono text-xs font-bold tracking-widest bg-slate-900/50 px-5 py-3 rounded-full border border-slate-800 backdrop-blur-md">
                   <Database className={`w-4 h-4 ${activeStudy ? activeStudy.theme.text : 'text-slate-400'} transition-colors duration-500`} /> CUSTOM ML PIPELINES
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:w-1/2 w-full max-w-xl relative group">
            <Reveal animation="blur-in" duration={1500}>
              <div className={`absolute -inset-1 bg-gradient-to-r ${activeStudy ? activeStudy.theme.gradientText : 'from-slate-600 to-slate-400'} rounded-[3rem] blur-2xl opacity-20 group-hover:opacity-50 transition duration-1000`}></div>
              <div className="bg-slate-950/80 border border-slate-800/80 backdrop-blur-3xl rounded-[3rem] p-10 sm:p-14 relative shadow-2xl">
                {submitStatus === 'success' ? (
                  <div className="text-center py-20 animate-fade-in-up">
                    <div className={`w-24 h-24 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-inner ${activeStudy ? `${activeStudy.theme.bgSoft} ${activeStudy.theme.text} border-${activeStudy.theme.colorName}-500/30` : 'bg-slate-800 text-slate-300 border-slate-700'} border transition-colors duration-500 animate-pulse`}>
                      <CheckCircle className="w-12 h-12" />
                    </div>
                    <h3 className="text-3xl font-extrabold text-white mb-3 tracking-tight">Spec Transmitted</h3>
                    <p className="text-slate-400 text-sm font-mono tracking-wide">An InvadeCode architect will initiate contact via secure channel shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleLeadSubmit} className="space-y-6 relative z-10">
                    <div className="mb-10 text-center sm:text-left">
                       <h3 className="text-3xl font-extrabold text-white mb-3 tracking-tight">Initiate Review</h3>
                       <p className="text-[10px] text-slate-500 font-mono tracking-[0.2em] flex items-center justify-center sm:justify-start gap-2"><Lock className="w-3 h-3"/> SECURE_TRANSMISSION</p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <input required type="text" value={leadForm.name} onChange={(e) => setLeadForm({...leadForm, name: e.target.value})}
                          className="w-full px-6 py-4 bg-slate-900/50 border border-slate-800 rounded-2xl focus:bg-slate-900 focus:ring-2 focus:ring-slate-600 outline-none transition-all text-sm font-medium text-white placeholder-slate-600 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]"
                          placeholder="Operator Name"
                        />
                      </div>
                      <div>
                        <input required type="email" value={leadForm.email} onChange={(e) => setLeadForm({...leadForm, email: e.target.value})}
                          className="w-full px-6 py-4 bg-slate-900/50 border border-slate-800 rounded-2xl focus:bg-slate-900 focus:ring-2 focus:ring-slate-600 outline-none transition-all text-sm font-medium text-white placeholder-slate-600 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]"
                          placeholder="Secure Email"
                        />
                      </div>
                    </div>
                    <div>
                      <input required type="text" value={leadForm.company} onChange={(e) => setLeadForm({...leadForm, company: e.target.value})}
                        className="w-full px-6 py-4 bg-slate-900/50 border border-slate-800 rounded-2xl focus:bg-slate-900 focus:ring-2 focus:ring-slate-600 outline-none transition-all text-sm font-medium text-white placeholder-slate-600 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]"
                        placeholder="Enterprise Designation (Company)"
                      />
                    </div>
                    <div>
                      <textarea required rows={4} value={leadForm.problem} onChange={(e) => setLeadForm({...leadForm, problem: e.target.value})}
                        className="w-full px-6 py-5 bg-slate-900/50 border border-slate-800 rounded-[2rem] focus:bg-slate-900 focus:ring-2 focus:ring-slate-600 outline-none transition-all text-sm font-medium text-white placeholder-slate-600 resize-y shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]"
                        placeholder="Define operational bottlenecks..."
                      />
                    </div>
                    
                    <div className="pt-6">
                      <button type="submit" disabled={submitStatus === 'loading'}
                        className={`w-full px-8 py-5 text-slate-950 text-sm font-extrabold tracking-widest uppercase rounded-full flex items-center justify-center gap-3 transition-all duration-500 disabled:opacity-70 shadow-[0_10px_30px_rgba(0,0,0,0.3)] ${activeStudy ? `bg-${activeStudy.theme.colorName}-500 hover:bg-${activeStudy.theme.colorName}-400 hover:shadow-[0_15px_40px_rgba(var(--tw-colors-${activeStudy.theme.colorName}-500),0.4)]` : 'bg-slate-200 hover:bg-white hover:shadow-slate-200/30'} hover:-translate-y-1`}
                      >
                        {submitStatus === 'loading' ? (
                          <div className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
                        ) : (
                          <><span>Transmit Spec</span><Send className="w-4 h-4" /></>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>

        <div className="w-full px-[3%] mt-32 pt-10 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono font-bold tracking-widest text-slate-600 relative z-10">
          <div className="flex items-center gap-3"><Terminal className="w-4 h-4" /><span>END OF DOCUMENT_STREAM</span></div>
          <div>© {new Date().getFullYear()} INVADECODE_CORE. ALL RIGHTS RESERVED.</div>
        </div>
      </footer>
    </div>
  );
}
