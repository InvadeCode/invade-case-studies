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
    <div className="w-full flex flex-col">
      <div className="w-full px-[3%] py-12 flex flex-col lg:flex-row gap-12 lg:gap-16 relative mx-auto max-w-[1600px]">
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

      {/* Main Content - Expanded to fill right space */}
      <main className="flex-1 min-w-0 pb-16 lg:pr-8">
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
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">{section.title}</h2>
              </div>
            </Reveal>
            <Reveal delay={(idx * 30) + 100} animation="fade-up" duration={1000}>
              <div className="text-sm sm:text-base text-slate-600 leading-relaxed sm:leading-[1.7] mb-8 font-normal tracking-wide space-y-5" dangerouslySetInnerHTML={{__html: section.content}} />
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
          </main>
        </div>

        {/* Dynamic Simulator Full Screen Block */}
        <div className="w-full px-[3%] pb-32 pt-16">
          <DynamicSimulator config={study.simulator} theme={theme} id={`sim-${study.id}`} />
        </div>
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
    <Reveal animation="blur-in" duration={1500} className={`w-full ${theme.simBg} rounded-[3rem] sm:rounded-[4rem] px-6 sm:px-12 lg:px-20 relative overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.5)] border ${theme.simBorder} min-h-[90vh] flex flex-col justify-center py-24 group`}>
      <div id={id} className="absolute -top-40"></div>
      
      {/* Intense Background Layers */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30 group-hover:opacity-60 transition-opacity duration-1000"></div>
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-full ${theme.simGlow} blur-[140px] rounded-[100%] pointer-events-none transition-all duration-[2000ms] ease-in-out group-hover:scale-110 group-hover:opacity-80 opacity-50`}></div>
      <div className={`absolute bottom-0 right-0 w-96 h-96 bg-${theme.colorName}-600/10 blur-[100px] rounded-full pointer-events-none`}></div>

      <div className="relative z-10 w-full mx-auto max-w-7xl">
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
    excerpt: 'Engineered a sovereign, air-gapped Enterprise OS to replace 42 fragmented Oracle/SAP instances, processing 14.2B rows daily with sub-90ms latency and saving $18.4M in licensing.',
    techStack: ['Kubernetes', 'Apache Kafka', 'PostgreSQL', 'Rust'],
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
    title: 'IAG Retail OS',
    subtitle: 'Predictive Forecasting & Agronomic Cross-Sell Matrix.',
    excerpt: 'A unified ERP orchestrating 1000+ stores serving 1M+ farmers, leveraging a 100-parameter predictive engine to guarantee inventory 6 days prior to demand and algorithmically drive +2 basket size.',
    techStack: ['React', 'Python', 'XGBoost', 'Redis'],
    theme: { colorName: 'emerald', text: 'text-emerald-500', bgSoft: 'bg-emerald-500/10', borderSoft: 'border-emerald-500/30', accent: 'accent-emerald-500', gradientText: 'from-emerald-400 to-green-600', simBg: 'bg-[#020a06]', simBorder: 'border-emerald-900/30', simGlow: 'bg-emerald-900/20' },
    spec: { target: 'InvadeAgro (Parent)', scale: '1,000 Stores / 21 States', metric: '+2 Products/Txn & 0 Stockouts' },
    trust: { compliance: 'SOC2 / ISO 27001', uptime: '99.99%', dataVolume: '2.4M Transactions/Mo' },
    chartData: { title: 'Average Basket Size Over Time', subtitle: 'Items Per Farmer Transaction', points: [ {label: 'Q1', val1: 1.5, val1Pct: 35, val1Label: 'Legacy POS', val2: 2.1, val2Pct: 50, val2Label: 'IAG Engine'}, {label: 'Q2', val1: 1.4, val1Pct: 32, val1Label: 'Legacy POS', val2: 2.8, val2Pct: 75, val2Label: 'IAG Engine'}, {label: 'Q3', val1: 1.6, val1Pct: 40, val1Label: 'Legacy POS', val2: 3.5, val2Pct: 100, val2Label: 'IAG Engine'} ] },
    metrics: [
      { icon: Box, title: 'Store Stockouts', value: '0.0%', detail: 'Eliminated via 6-day predictive demand routing.' },
      { icon: TrendingUp, title: 'Basket Size', value: '+2.1 Items', detail: 'Cross-selling driven by algorithmic agronomic consulting.' }
    ],
    sections: [
      { title: 'Executive Abstract', content: 'InvadeCode was forged to construct the ultimate technological backbone for our parent company, IAG (InvadeAgro). Managing 1,000+ retail stores across 21 Indian states, the business required a unified ERP that moved beyond basic ledgering. We engineered a predictive Retail OS that connects Logistics, HR, and Sales, leveraging machine learning to forecast exact local demand 6 days in advance and algorithmically driving store-level cross-selling.' },
      { index: 1, title: 'The Multi-State Retail Chaos', content: 'IAG caters to over 1,000,000 farmers. The retail footprint stretches from the humid south to the arid west. Previously, store inventory was managed via gut-feel and static historicals. If pest-pressure spiked in a specific district, stores sold out of pesticides immediately, forcing farmers to defect to competitors while millions in capital sat locked in over-stocked seeds at neighboring stores.' },
      { index: 2, title: 'The Core Engineering Problem', content: 'We had to completely obliterate the silos between regional warehouses, logistics fleets, and the 1,000 front-line Point-Of-Sale (POS) terminals. The system required a spatial-temporal engine that could ingest highly-localized, unstructured variables to predict exactly what a specific farmer would need before they even walked into the store.' },
      { index: 3, title: 'Unified Data Fabric', content: 'We replaced dozens of disjointed systems with a single, highly concurrent SQL matrix. Every transaction, HR shift, regional invoice, and warehouse manifest is instantly synchronized across all 21 states. The central command dashboard now reflects a perfectly reconciled state of the entire multi-million dollar corporation in under 40 milliseconds.' },
      { index: 4, title: '6-Day Predictive SCM Matrix', content: 'To solve the stockout crisis, we built a predictive routing engine. It analyzes historical sales, live district weather APIs, and hyper-local crop-sowing data to forecast exact SKU demand. The system autonomously generates warehouse dispatch manifests to ensure the required seeds and fertilizers arrive at the precise retail store exactly 6 days before the predicted demand surge.' },
      { index: 5, title: 'The Agronomic Consultation Engine', content: 'Store clerks needed to become expert agronomists instantly. We built a rapid-prototyping consultation module right into the POS. The engine ingests over 100 influencing parameters: specific soil NPK composition of the district, current weather patterns, crop age, and pest prevalence.' },
      { index: 6, title: 'Algorithmic Cross-Selling', content: 'When a farmer approaches the counter to buy a basic urea fertilizer, the Consultation Engine processes the 100+ parameters and prompts the clerk with a mathematically optimal cross-sell script. It suggests specific micro-nutrients or fungal preventatives explicitly designed to boost that specific farmer\'s yield in those specific current weather conditions.' },
      { index: 7, title: 'Automated Commission & HR Routing', content: 'Because the ERP is unified, when a clerk successfully executes an algorithmic cross-sell, the HR module instantly calculates and logs their performance commission. This gamifies the retail experience, driving aggressive internal adoption of the software.' },
      { index: 8, title: 'Logistics Fleet Tracking', content: 'The engine interfaces directly with GPS telemetry on IAG’s logistics fleets. Store managers receive live tracking links for their incoming 6-day predictive restock, allowing them to confidently take pre-orders from high-value farmers without fear of supply chain failure.' },
      { index: 9, title: 'Empirical Yield & Massive Scale', content: 'The deployment of the IAG Retail OS completely eradicated understocking and overstocking. The Agronomic Consultation Engine consistently drives an additional 2+ products per transaction. The resulting inflation in gross sales and captured margin established InvadeCode not just as an IT arm, but as the primary profit-multiplier for the entire conglomerate.' }
    ],
    simulator: {
      title: 'Retail Cross-Sell ROI Simulator',
      description: 'Model the compounding top-line revenue generated by using algorithmic consultation to increase the average basket size across the network.',
      initialValues: { stores: 1000, txns: 50, crossSellValue: 12 },
      sliders: [
        { key: 'stores', label: 'Active Retail Stores', min: 100, max: 2000, step: 50, format: formatNumber },
        { key: 'txns', label: 'Avg Daily Transactions per Store', min: 10, max: 200, step: 10, format: formatNumber },
        { key: 'crossSellValue', label: 'Avg Value of +2 Cross-Sell Products ($)', min: 5, max: 50, step: 1, format: v => `$${v}` }
      ],
      calculate: (v) => {
        // Daily cross-sell revenue = Stores * Daily Txns * Added Value
        const dailyExtra = v.stores * v.txns * v.crossSellValue;
        const annualExtra = dailyExtra * 365; // Assuming year-round operation
        return [
          { label: 'Daily Revenue Added via Engine', value: formatCurrency(dailyExtra), primary: false },
          { label: 'Annual Top-Line Revenue Injection', value: formatCurrency(annualExtra), primary: true, subtext: 'Pure Algorithmic Growth' }
        ];
      }
    }
  },
  {
    id: 'invade-mill',
    industry: 'Manufacturing',
    title: 'Invade Mill ERP Integration',
    subtitle: 'Autonomous Sourcing & Predictive Inventory.',
    excerpt: 'An automated procurement matrix scraping 1000+ WhatsApp trading groups and APMC/FPO APIs to algorithmically secure the best commodity pricing, coupled with predictive inventory analytics.',
    techStack: ['Python NLP', 'WhatsApp Graph API', 'PostgreSQL', 'React'],
    theme: { colorName: 'stone', text: 'text-stone-400', bgSoft: 'bg-stone-500/10', borderSoft: 'border-stone-500/30', accent: 'accent-stone-500', gradientText: 'from-stone-400 to-yellow-600', simBg: 'bg-[#0a0a0a]', simBorder: 'border-stone-800/50', simGlow: 'bg-yellow-900/20' },
    spec: { target: 'Invade Mill', scale: '1000+ Sourcing Channels', metric: 'Procurement Alpha Generated' },
    trust: { compliance: 'SOC2 Type II', uptime: '99.99%', dataVolume: '50k+ Msgs Parsed/Day' },
    chartData: { title: 'Procurement Price vs Market Average', subtitle: 'Cost per Ton ($) - Lower is Better', points: [ {label: 'Week 1', val1: 420, val1Pct: 90, val1Label: 'Market Avg (APMC)', val2: 390, val2Pct: 80, val2Label: 'Bot Sourced'}, {label: 'Week 2', val1: 440, val1Pct: 95, val1Label: 'Market Avg (APMC)', val2: 395, val2Pct: 82, val2Label: 'Bot Sourced'}, {label: 'Week 3', val1: 460, val1Pct: 100, val1Label: 'Market Avg (APMC)', val2: 405, val2Pct: 85, val2Label: 'Bot Sourced'} ] },
    metrics: [
      { icon: MessageCircle, title: 'Unstructured Data Mined', value: '1000+', detail: 'WhatsApp groups scraped continuously.' },
      { icon: TrendingUp, title: 'Procurement Spread', value: '-8.4%', detail: 'Average savings below standard APMC market rates.' }
    ],
    sections: [
      { title: 'Executive Abstract', content: 'For the heavy manufacturing operations of Invade Mill, sourcing raw agricultural commodities at the exact right price is the primary driver of gross margin. We replaced manual, phone-based procurement with a hyper-intelligent ERP integration featuring an NLP-driven WhatsApp scraping bot that autonomously finds, verifies, and secures the best commodity prices across the country.' },
      { index: 1, title: 'The Commodity Sourcing Chaos', content: 'Commodity pricing in emerging markets is heavily fragmented. Prices fluctuate wildly across thousands of informal WhatsApp trading groups and localized broker networks. The procurement team was manually reading messages, making it physically impossible to spot arbitrage opportunities or secure the absolute bottom-dollar price before the market shifted.' },
      { index: 2, title: 'The Core Engineering Problem', content: 'We had to build a system that could bypass formal API limitations by directly ingesting unstructured, colloquial text from over 1,000 highly active WhatsApp groups. It needed to instantly extract the commodity type, volume, and asking price, standardizing the data into a queryable ledger.' },
      { index: 3, title: 'NLP WhatsApp Scraping Matrix', content: 'We deployed a distributed bot network utilizing Natural Language Processing (NLP) models tuned specifically for regional trading dialects and abbreviations. The bots continuously monitor 1,000+ groups, extracting intent and pricing data in milliseconds and pipelining it directly into the Invade Mill ERP.' },
      { index: 4, title: 'APMC & FPO Validation APIs', content: 'Scraped prices are dangerous without context. To prevent spoofing, the ERP cross-references the bot’s findings with live API feeds from government Agricultural Produce Market Committees (APMCs) and Farmer Producer Organizations (FPOs). This provides a strict, trusted benchmark to calculate the true spread.' },
      { index: 5, title: 'Algorithmic Arbitrage Engine', content: 'When the NLP bot identifies a highly-verified seller offering a commodity at a mathematically significant discount to the APMC benchmark (Procurement Alpha), the system instantly alerts the trading desk via push notification, allowing them to secure the volume before competitors even see the message.' },
      { index: 6, title: 'Predictive Inventory Analytics', content: 'Sourcing cheap commodities is only useful if the mill has the capacity to process and store them. We integrated the sourcing engine directly with the mill’s internal telemetry. The system uses predictive analytics to forecast exactly when the mill will run out of raw materials based on current burn rates.' },
      { index: 7, title: 'Automated Procurement Timing', content: 'By merging the predictive inventory burn-rate with the live WhatsApp pricing ledger, the ERP advises the procurement team exactly *when* to buy. If prices are high but inventory is stable, it advises holding. If a price crash is detected and inventory space is available, it signals an aggressive buy.' },
      { index: 8, title: 'Supplier Trust Scoring', content: 'Every transaction is logged against the specific WhatsApp broker. The system algorithmically builds a "Trust Score" based on successful deliveries, quality of the commodity upon arrival at the mill, and pricing accuracy, filtering out unreliable noise from the data feeds over time.' },
      { index: 9, title: 'Empirical Yield & Alpha Generation', content: 'The integration transformed Invade Mill’s procurement desk into a high-frequency trading floor. By continuously mining unstructured networks and perfectly timing purchases via predictive analytics, the ERP drove average procurement costs 8.4% below APMC market benchmarks, injecting massive capital directly into the bottom line.' }
    ],
    simulator: {
      title: 'Commodity Sourcing ROI Simulator',
      description: 'Model the direct capital saved by utilizing the NLP Bot Matrix to secure commodity pricing below standard market benchmarks.',
      initialValues: { volume: 50000, pricePerTon: 450, spread: 8.4 },
      sliders: [
        { key: 'volume', label: 'Monthly Sourcing Volume (Tons)', min: 1000, max: 200000, step: 1000, format: formatNumber },
        { key: 'pricePerTon', label: 'Avg Market Price ($/Ton)', min: 100, max: 2000, step: 50, format: v => `$${v}` },
        { key: 'spread', label: 'Alpha Generated via Bot (%)', min: 1, max: 20, step: 0.1, format: v => `${v}% Below Mkt` }
      ],
      calculate: (v) => {
        const totalSpend = v.volume * v.pricePerTon;
        const savings = totalSpend * (v.spread / 100);
        const annualSavings = savings * 12;
        return [
          { label: 'Monthly Capital Saved', value: formatCurrency(savings), primary: false },
          { label: 'Annual Procurement Alpha', value: formatCurrency(annualSavings), primary: true, subtext: 'Recaptured Margin' }
        ];
      }
    }
  },
  {
    id: 'iit-nzi',
    industry: 'EdTech',
    title: 'IIT Delhi COE NZI',
    subtitle: 'Net Zero Initiative Matrix.',
    excerpt: 'Compliance-grade environmental algorithmic modeling matrix computing absolute zero trajectories by digesting smart grid telemetry and Scope 3 supply chain vendor APIs.',
    techStack: ['Rust', 'GraphQL', 'TimescaleDB', 'Node.js'],
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
    excerpt: 'Autonomous multi-variable scheduler dynamically routing HPC bandwidth and multi-million dollar grant funding across 400+ simultaneous research projects with 99% utilization.',
    techStack: ['Go', 'Kubernetes', 'Redis', 'Solidity'],
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
              
              <div className="relative z-10 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-8">
                   <h4 className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 bg-slate-100/50 px-3 py-1 rounded-full border border-slate-200/50">{study.industry}</h4>
                   <div className={`w-12 h-12 rounded-[1.2rem] ${study.theme.bgSoft} flex items-center justify-center border border-${study.theme.colorName}-200/50 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                      <Workflow className={`w-5 h-5 ${study.theme.text}`} />
                   </div>
                </div>
                <h3 className="text-3xl font-extrabold text-slate-900 mb-3 group-hover:text-slate-700 transition-colors tracking-tight">{study.title}</h3>
                <p className={`text-sm font-bold uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r ${study.theme.gradientText} mb-6`}>{study.subtitle}</p>
                
                <p className="text-sm text-slate-600 font-medium line-clamp-3 mb-6 leading-relaxed flex-1">
                  {study.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {study.techStack.map(tech => (
                    <span key={tech} className="px-2.5 py-1 text-[10px] font-bold font-mono uppercase bg-slate-100/80 text-slate-500 rounded-md border border-slate-200/80">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="space-y-4 mb-8">
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
              <Reveal animation="blur-in" duration={1200} className="w-full max-w-[1600px]">
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

        <div className="w-full px-[3%] relative z-10 flex flex-col lg:flex-row gap-20 lg:gap-24 items-center max-w-[1600px] mx-auto">
          
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

          <div className="lg:w-1/2 w-full max-w-xl relative group mx-auto lg:ml-auto">
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

        <div className="w-full px-[3%] mt-32 pt-10 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono font-bold tracking-widest text-slate-600 relative z-10 max-w-[1600px] mx-auto">
          <div className="flex items-center gap-3"><Terminal className="w-4 h-4" /><span>END OF DOCUMENT_STREAM</span></div>
          <div>© {new Date().getFullYear()} INVADECODE_CORE. ALL RIGHTS RESERVED.</div>
        </div>
      </footer>
    </div>
  );
}
