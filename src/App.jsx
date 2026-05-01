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
    <Reveal delay={100} className="bg-slate-900 p-6 sm:p-8 rounded-[2.5rem] my-12 relative overflow-hidden group border border-slate-800 shadow-2xl">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20"></div>
      <div className={`absolute top-0 right-0 w-64 h-64 bg-${theme.colorName}-500/10 blur-[80px] rounded-full pointer-events-none transition-all duration-1000 group-hover:scale-110`}></div>
      
      <div className="flex justify-between items-end mb-10 relative z-10">
        <div>
          <h4 className="text-xl font-bold mb-1 flex items-center gap-2 text-white">
            <BarChart3 className={`w-5 h-5 text-${theme.colorName}-400`}/> 
            {data.title}
          </h4>
          <p className="text-xs text-slate-400 font-mono tracking-widest uppercase">{data.subtitle}</p>
        </div>
      </div>
      
      <div className="flex items-end gap-2 sm:gap-6 h-56 relative z-10 border-b border-slate-700/50 pb-2">
        {data.points.map((d, i) => (
          <div key={i} className="flex-1 flex flex-col justify-end gap-2 h-full group/bar relative">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-max flex flex-col items-center text-[10px] font-mono text-slate-400 opacity-0 group-hover/bar:opacity-100 transition-opacity bg-slate-800 px-2 py-1 rounded shadow-lg z-20">
              <span className={`text-${theme.colorName}-400`}>{d.val1Label}: {d.val1}</span>
              <span className="text-slate-300">{d.val2Label}: {d.val2}</span>
            </div>
            <div className="w-full flex items-end gap-1 h-full bg-slate-800/30 rounded-t-2xl p-1 relative overflow-hidden">
              <div className={`w-1/2 bg-gradient-to-t from-${theme.colorName}-800 to-${theme.colorName}-400 rounded-t-xl transition-all duration-1000 relative group-hover/bar:from-${theme.colorName}-600 group-hover/bar:to-${theme.colorName}-300`} style={{ height: `${d.val1Pct}%` }}></div>
              <div className={`w-1/2 bg-gradient-to-t from-slate-700 to-slate-400 rounded-t-xl transition-all duration-1000 relative group-hover/bar:from-slate-600 group-hover/bar:to-slate-300`} style={{ height: `${d.val2Pct}%` }}></div>
            </div>
            <div className="text-center text-xs font-bold text-slate-500 mt-2">{d.label}</div>
          </div>
        ))}
      </div>
      
      <div className="flex gap-6 mt-6 justify-center relative z-10 text-xs font-mono">
        <div className="flex items-center gap-2"><div className={`w-3 h-3 bg-${theme.colorName}-500 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.2)]`}></div> <span className="text-slate-300">{data.points[0].val1Label}</span></div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-slate-400 rounded-full"></div> <span className="text-slate-300">{data.points[0].val2Label}</span></div>
      </div>
    </Reveal>
  );
};

// --- Dynamic Case Study Renderer ---
const CaseStudyViewer = ({ study, onReturnToHub }) => {
  const theme = study.theme;
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 flex flex-col lg:flex-row gap-12 lg:gap-14 relative">
      {/* Sidebar Index - Glassmorphic */}
      <aside className="hidden lg:block w-[280px] shrink-0">
        <div className="sticky top-32 bg-white/60 backdrop-blur-2xl border border-slate-200/60 p-6 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
          <button onClick={onReturnToHub} className="mb-6 flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-slate-400 hover:text-slate-900 transition-colors cursor-pointer">
             <ArrowRight className="w-3 h-3 rotate-180" /> Back to Hub
          </button>
          
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tighter text-slate-900 leading-tight">{study.title}</h1>
            <h2 className="text-xs font-semibold text-slate-500 mt-2 tracking-wide uppercase">
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.gradientText}`}>{study.subtitle}</span>
            </h2>
          </div>
          <h5 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Index Directory</h5>
          
          <nav className="space-y-3 text-xs text-slate-600 font-medium border-l-2 border-slate-100 pl-4 max-h-[35vh] overflow-y-auto no-scrollbar relative group">
            {study.sections.map((sec, i) => (
              <a key={i} href={`#sec-${study.id}-${i}`} className={`block hover:${theme.text} transition-all duration-300 truncate hover:translate-x-1`}>
                {sec.index ? `${sec.index}. ` : ''}{sec.title}
              </a>
            ))}
            <a href={`#sim-${study.id}`} className={`block ${theme.text} transition-all duration-300 hover:translate-x-1 flex items-center gap-2 font-bold mt-4 pt-4 border-t border-slate-100`}>
              <Calculator className="w-3.5 h-3.5" /> ROI Simulator
            </a>
          </nav>
          <div className={`mt-8 pt-6 border-t border-slate-100`}>
            <h5 className="text-[10px] font-bold uppercase tracking-widest text-slate-900 mb-3">Specification</h5>
            <ul className="space-y-2 text-xs text-slate-500 font-mono">
              <li className="flex justify-between items-center"><span className="opacity-70">Target:</span> <span className="text-slate-900 font-semibold truncate max-w-[120px] text-right">{study.spec.target}</span></li>
              <li className="flex justify-between items-center"><span className="opacity-70">Scale:</span> <span className="text-slate-900 font-semibold truncate max-w-[120px] text-right">{study.spec.scale}</span></li>
              <li className="flex justify-between items-center"><span className="opacity-70">Metric:</span> <span className={`${theme.text} font-bold truncate max-w-[120px] text-right`}>{study.spec.metric}</span></li>
            </ul>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl pb-32">
        <Reveal>
          <header className="mb-6 lg:hidden bg-white/60 backdrop-blur-xl border border-slate-200/60 p-6 rounded-[2rem] shadow-sm relative">
            <button onClick={onReturnToHub} className="absolute top-4 right-4 flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-slate-400 hover:text-slate-900 transition-colors cursor-pointer">
               <ArrowRight className="w-3 h-3 rotate-180" /> Hub
            </button>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tighter text-slate-900 leading-tight mb-2 mt-4">{study.title}</h1>
            <h2 className="text-sm font-semibold text-slate-500 tracking-wide uppercase">
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.gradientText}`}>{study.subtitle}</span>
            </h2>
          </header>
        </Reveal>

        {/* Engineering Trust Telemetry Banner */}
        <Reveal delay={50} className="mb-12">
          <div className="flex flex-wrap items-center gap-4 sm:gap-8 border-y border-slate-200/80 py-4 px-2 text-xs font-mono text-slate-600 bg-white/40 backdrop-blur-sm rounded-xl">
            <div className="flex items-center gap-2"><Shield className={`w-4 h-4 ${theme.text}`} /> <span className="font-bold text-slate-900">{study.trust.compliance}</span></div>
            <div className="hidden sm:block w-px h-4 bg-slate-300"></div>
            <div className="flex items-center gap-2"><Activity className={`w-4 h-4 ${theme.text}`} /> <span className="font-bold text-slate-900">Uptime: {study.trust.uptime}</span></div>
            <div className="hidden sm:block w-px h-4 bg-slate-300"></div>
            <div className="flex items-center gap-2"><Database className={`w-4 h-4 ${theme.text}`} /> <span className="font-bold text-slate-900">{study.trust.dataVolume}</span></div>
          </div>
        </Reveal>

        {study.sections.map((section, idx) => (
          <React.Fragment key={idx}>
            <Reveal delay={idx * 20}>
              <div className="pt-10 mt-10 border-t border-slate-200/60 scroll-mt-40 relative" id={`sec-${study.id}-${idx}`}>
                <div className="absolute -top-[1px] left-0 w-12 h-[2px] bg-gradient-to-r from-slate-300 to-transparent"></div>
                {section.index && (
                  <span className={`block text-[10px] font-mono font-bold ${theme.text} mb-3 tracking-widest uppercase`}>
                    // {String(section.index).padStart(2, '0')}. {section.title}
                  </span>
                )}
                <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-6 tracking-tight">{section.title}</h2>
              </div>
            </Reveal>
            <Reveal delay={(idx * 20) + 20}>
              <div className="text-sm text-slate-600 leading-relaxed mb-6 font-light tracking-wide space-y-5" dangerouslySetInnerHTML={{__html: section.content}} />
            </Reveal>

            {/* Inject Interactive Chart dynamically after section 4 */}
            {idx === 4 && study.chartData && (
              <DynamicChart data={study.chartData} theme={theme} />
            )}

            {/* Render Metrics after section 8 if defined */}
            {idx === 8 && study.metrics && (
              <div className="grid sm:grid-cols-2 gap-6 my-12">
                {study.metrics.map((m, i) => (
                  <Reveal key={i} delay={i * 100} className="p-6 rounded-[2rem] bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-slate-50/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className={`w-12 h-12 ${theme.bgSoft} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 ease-out relative z-10`}>
                      <m.icon className={`w-6 h-6 ${theme.text}`} />
                    </div>
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 relative z-10">{m.title}</h4>
                    <div className="text-4xl font-light text-slate-900 mb-3 tracking-tighter relative z-10">{m.value}</div>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed relative z-10">{m.detail}</p>
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
    <Reveal className={`w-full ${theme.simBg} rounded-[3rem] mt-24 px-4 sm:px-12 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] border ${theme.simBorder} min-h-[100vh] flex flex-col justify-center py-16 group`}>
      <div id={id} className="absolute -top-40"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-50 group-hover:opacity-100 transition-opacity duration-1000"></div>
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full ${theme.simGlow} blur-[120px] rounded-[100%] pointer-events-none transition-all duration-1000 group-hover:scale-105`}></div>

      <div className="relative z-10 w-full max-w-5xl mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className={`inline-flex items-center justify-center p-4 ${theme.bgSoft} border ${theme.borderSoft} rounded-2xl mb-6 backdrop-blur-xl shadow-lg relative overflow-hidden`}>
            <div className={`absolute inset-0 ${theme.bgSoft} animate-pulse`}></div>
            <Calculator className={`w-8 h-8 ${theme.text} relative z-10`} />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">{config.title}</h2>
          <p className="text-slate-400 text-base font-light leading-relaxed max-w-2xl mx-auto">{config.description}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-10 min-w-0 bg-slate-900/40 p-8 rounded-[2.5rem] border border-slate-800/50 backdrop-blur-sm">
            {config.sliders.map((slider, idx) => (
              <div key={idx} className="group/slider relative">
                <div className="flex justify-between items-end mb-4">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate mr-4">{slider.label}</label>
                  <span className={`text-2xl font-mono font-bold ${theme.text} tabular-nums whitespace-nowrap drop-shadow-[0_0_12px_rgba(255,255,255,0.1)]`}>
                    {slider.format ? slider.format(values[slider.key]) : values[slider.key]}
                  </span>
                </div>
                <div className="relative">
                  <input 
                    type="range" min={slider.min} max={slider.max} step={slider.step} 
                    value={values[slider.key]} 
                    onChange={(e) => handleSliderChange(slider.key, e.target.value)} 
                    className={`w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer ${theme.accent} relative z-10 shadow-inner`} 
                  />
                  <div className={`absolute top-1/2 left-0 h-2 -translate-y-1/2 rounded-lg pointer-events-none ${theme.simGlow} opacity-50 blur-sm`} style={{ width: `${((values[slider.key] - slider.min) / (slider.max - slider.min)) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>

          <div className={`bg-slate-950/80 rounded-[2.5rem] p-8 sm:p-12 border ${theme.simBorder} shadow-[inset_0_0_40px_rgba(0,0,0,0.5),0_10px_40px_rgba(0,0,0,0.4)] relative overflow-hidden min-w-0 h-full flex flex-col justify-center`}>
            <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-${theme.colorName}-400 to-transparent opacity-50 scanline-animation`}></div>
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-white/5 rounded-full blur-[80px] pointer-events-none"></div>
            
            <div className="space-y-12 relative z-10">
              {results.map((res, idx) => (
                <div key={idx} className={res.primary ? "relative" : ""}>
                  <div className={`text-[10px] font-bold uppercase tracking-widest mb-3 flex items-center gap-2 truncate ${res.primary ? theme.text : 'text-slate-500'}`}>
                    <Activity className={`w-3.5 h-3.5 ${res.primary ? 'animate-pulse' : ''}`} /> {res.label}
                  </div>
                  <div className={`tabular-nums truncate leading-tight ${res.primary ? 'text-5xl lg:text-[4.5rem] font-bold tracking-tighter text-white mb-5 drop-shadow-[0_0_25px_rgba(255,255,255,0.15)]' : 'text-3xl font-mono text-slate-400 opacity-60 line-through decoration-slate-700 decoration-2'}`}>
                    {res.value}
                  </div>
                  {res.subtext && (
                    <div className={`inline-flex items-center gap-2 px-4 py-2 ${theme.bgSoft} border ${theme.borderSoft} ${theme.text} text-xs font-bold tracking-wide uppercase rounded-full tabular-nums whitespace-nowrap shadow-lg`}>
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

// --- DATA: Reduced to exactly 5 core industries ---
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
  },
  // 6. IIT Delhi Net Zero (Public Sector)
  {
    id: 'iit-netzero', industry: 'Public Sector', title: 'Premier Institute Net Zero', subtitle: 'Algorithmic Scope Emission Calculator.',
    theme: { colorName: 'emerald', text: 'text-emerald-500', bgSoft: 'bg-emerald-500/10', borderSoft: 'border-emerald-500/30', accent: 'accent-emerald-500', gradientText: 'from-emerald-400 to-teal-500', simBg: 'bg-[#020a06]', simBorder: 'border-emerald-900/30', simGlow: 'bg-emerald-900/20' },
    spec: { target: 'Institute COE', scale: 'Campus Wide', metric: 'Scope 1, 2 & 3 Precision' },
    trust: { compliance: 'GHG Protocol / ISO 14064', uptime: '99.9%', dataVolume: '150M IoT Pings' },
    chartData: { title: 'Projected Carbon Deceleration', subtitle: 'CO2e (Tons) vs Year', points: [ {label: '2024', val1: 45000, val1Pct: 100, val1Label: 'Baseline', val2: 40000, val2Pct: 90, val2Label: 'Optimized'}, {label: '2026', val1: 46000, val1Pct: 100, val1Label: 'Baseline', val2: 28000, val2Pct: 60, val2Label: 'Optimized'}, {label: '2030', val1: 48000, val1Pct: 100, val1Label: 'Baseline', val2: 12000, val2Pct: 25, val2Label: 'Optimized'} ] },
    metrics: [ { icon: Leaf, title: 'Scope 3 Accuracy', value: '+85%', detail: 'Via algorithmic supply chain tracing.' }, { icon: Activity, title: 'Audit Reporting', value: 'Instant', detail: 'Eliminated 6 weeks of manual spreadsheet calcs.' } ],
    sections: [
      { title: 'Executive Abstract', content: 'InvadeCode partnered with a Premier Technical Institute\'s Center of Excellence (COE) to architect a comprehensive digital tool for their Net Zero Initiative. We built a highly complex Scope Emissions Calculator capable of ingesting vast, disparate campus data.' },
      { index: 1, title: 'The Carbon Data Fragmentation', content: 'Data was scattered across utility bills, procurement ledgers, staff commuting surveys, and heavy laboratory telemetry. Manual calculation was prone to massive margins of error.' },
      { index: 2, title: 'The Core Engineering Problem', content: 'We needed to build a unified mathematical engine that could convert chaotic raw data (liters of fuel, KWh of grid electricity, tons of procured steel) into standardized CO2e metrics in real-time.' },
      { index: 3, title: 'Data Ingestion & Normalization API', content: 'We deployed a suite of RESTful APIs to hook directly into the campus facility management systems, automatically pulling live meter readings, HVAC power consumption, and generator logs.' },
      { index: 4, title: 'Algorithmic Scope Engine', content: 'The core backend is a high-performance calculation matrix. It strictly categorizes inputs into Scope 1, Scope 2, and Scope 3 emissions using dynamic emission factors updated via global environmental databases.' },
      { index: 5, title: 'Scope 3 Supply Chain Tracing', content: 'We built a vendor portal where suppliers input their manufacturing metrics, allowing the algorithm to dynamically trace the embedded carbon of all procured campus materials.' },
      { index: 6, title: 'Predictive Reduction Modeling', content: 'The tool is a simulator. Administrators can manipulate variables ("What if we install 2MW of solar?") and the engine recalculates the trajectory towards the Net Zero date.' },
      { index: 7, title: 'Interactive GIS Campus Mapping', content: 'Emissions data is visualized on a 3D digital twin of the campus. Heatmaps instantly identify high-emission buildings, allowing facilities management to perform targeted energy audits.' },
      { index: 8, title: 'Automated Compliance Reporting', content: 'The system auto-generates exhaustive, audit-ready compliance reports formatted to international standards (GHG Protocol, ISO 14064) with a single click.' },
      { index: 9, title: 'Threat Vector & Security', content: 'Operating within a premier research institute, the architecture features strict OIDC-based authentication and secure multi-tenant isolation, protecting sensitive vendor data.' },
      { index: 10, title: 'Empirical Yield', content: 'The tool provided unprecedented, mathematical clarity on the footprint, enabling aggressive fast-tracking of Net Zero goals. It established our dominance in complex environmental algorithmic modeling.' }
    ],
    simulator: {
      title: 'Scope Emission Trajectory Simulator', description: 'Model the impact of infrastructural shifts on campus-wide CO2e metrics to hit Net Zero milestones.',
      initialValues: { fleetEV: 10, solarMW: 2, hvacEff: 5 },
      sliders: [
        { key: 'fleetEV', label: 'Fleet Converted to EV (%)', min: 0, max: 100, step: 5, format: v => `${v}%` },
        { key: 'solarMW', label: 'Solar Capacity Installed (MW)', min: 0, max: 20, step: 0.5, format: v => `${v} MW` },
        { key: 'hvacEff', label: 'HVAC Optimization Gain (%)', min: 0, max: 30, step: 1, format: v => `${v}%` }
      ],
      calculate: (v) => {
        const baseEmissions = 45000;
        const reduction = (v.fleetEV * 20) + (v.solarMW * 800) + (v.hvacEff * 150);
        return [
          { label: 'CO2e Tons Eliminated Annually', value: formatNumber(reduction), primary: false },
          { label: 'Projected Campus Emissions (CO2e)', value: formatNumber(Math.max(0, baseEmissions - reduction)), primary: true, subtext: 'Towards Absolute Zero' }
        ];
      }
    }
  },
  // 7. Aviation Fleet Predictor (Supply Chain)
  {
    id: 'aviation', industry: 'Supply Chain', title: 'Commercial Fleet Predictor', subtitle: 'Aeronautical Maintenance ERP.',
    theme: { colorName: 'sky', text: 'text-sky-400', bgSoft: 'bg-sky-500/10', borderSoft: 'border-sky-500/30', accent: 'accent-sky-500', gradientText: 'from-sky-400 to-blue-500', simBg: 'bg-[#020810]', simBorder: 'border-sky-900/30', simGlow: 'bg-sky-900/20' },
    spec: { target: 'Tier-1 Airline', scale: '450+ Aircraft', metric: 'AOG (Aircraft On Ground) -40%' },
    trust: { compliance: 'FAA / EASA Part 145', uptime: '99.999%', dataVolume: '12TB Telemetry/Flight' },
    chartData: { title: 'AOG Maintenance Delays', subtitle: 'Unplanned Ground Hours vs Fleet Size', points: [ {label: 'Q1', val1: 4500, val1Pct: 100, val1Label: 'Reactive', val2: 2700, val2Pct: 60, val2Label: 'Predictive'}, {label: 'Q2', val1: 4800, val1Pct: 100, val1Label: 'Reactive', val2: 2100, val2Pct: 43, val2Label: 'Predictive'}, {label: 'Q3', val1: 4900, val1Pct: 100, val1Label: 'Reactive', val2: 1800, val2Pct: 36, val2Label: 'Predictive'} ] },
    metrics: [ { icon: Activity, title: 'AOG Reduction', value: '41.2%', detail: 'Fewer unplanned maintenance groundings.' }, { icon: Box, title: 'Part Inventory Costs', value: '-22%', detail: 'Just-in-time procurement via predictive engine.' } ],
    sections: [
      { title: 'Executive Abstract', content: 'We built a predictive maintenance ERP for a Tier-1 commercial airline. The system ingests massive inflight telemetry data to predict mechanical failures before they occur, drastically reducing costly AOG (Aircraft On Ground) incidents.' },
      { index: 1, title: 'The Reactive Maintenance Crisis', content: 'The airline relied on scheduled maintenance and reactive repairs. Unplanned part failures grounded aircraft, costing upwards of $150,000 per hour in passenger compensation, gate fees, and rerouting logistics.' },
      { index: 2, title: 'The Core Engineering Problem', content: 'Modern aircraft generate 12TB of sensor data per flight. We needed a high-throughput pipeline to ingest, parse, and analyze this multi-dimensional telemetry (vibration, heat, pressure) in real-time.' },
      { index: 3, title: 'Inflight Telemetry Ingestion', content: 'We deployed an edge-computing module on the aircraft that pre-processes sensor data, transmitting critical anomaly flags via satellite comms to our cloud Kafka clusters before the plane even lands.' },
      { index: 4, title: 'Digital Twin Modeling', content: 'The ERP maintains a strict Digital Twin for every engine and APU in the fleet. It models wear-and-tear using historical physics-based degradation matrices.' },
      { index: 5, title: 'Predictive Failure ML Engine', content: 'Using Deep Neural Networks (LSTMs), the system detects micro-anomalies in engine spool speeds. It predicts component failure with 96% accuracy, generating repair tickets up to 14 days in advance.' },
      { index: 6, title: 'Just-In-Time Procurement Sync', content: 'When a failure is predicted, the ERP cross-references the flight schedule. It automatically routes the necessary spare parts to the specific airport where the plane will undergo its next overnight layover.' },
      { index: 7, title: 'Crew & Bay Allocation', content: 'The system optimizes ground operations, auto-assigning certified engineering crews and maintenance bays precisely when the aircraft touches down, eliminating idle waiting time.' },
      { index: 8, title: 'Regulatory Audit Ledger', content: 'Every predictive repair is logged immutably. The system auto-generates compliance documents for the FAA/EASA, proving airworthiness without manual data entry.' },
      { index: 9, title: 'Zero-Trust Architecture', content: 'Flight telemetry is hyper-sensitive. We implemented strict zero-trust access, ensuring only cleared engineering terminals can query the physics matrices.' },
      { index: 10, title: 'Empirical Yield', content: 'The airline reduced AOG incidents by 41.2%, saving an estimated $210M annually in operational disruptions, proving our capacity to handle mission-critical aviation infrastructure.' }
    ],
    simulator: {
      title: 'Aviation AOG Recovery Simulator', description: 'Model the capital saved by algorithmically predicting and preventing unplanned aircraft groundings.',
      initialValues: { fleet: 450, aogHours: 12000, costPerHour: 150000 },
      sliders: [
        { key: 'fleet', label: 'Fleet Size', min: 50, max: 1000, step: 10, format: formatNumber },
        { key: 'aogHours', label: 'Annual AOG Hours (Legacy)', min: 1000, max: 50000, step: 1000, format: formatNumber },
        { key: 'costPerHour', label: 'Cost Per AOG Hour ($)', min: 50000, max: 300000, step: 10000, format: v => `$${v / 1000}K` }
      ],
      calculate: (v) => {
        const legacyCost = v.aogHours * v.costPerHour;
        const preventedHours = v.aogHours * 0.412;
        const saved = preventedHours * v.costPerHour;
        return [
          { label: 'Unplanned Ground Hours Eliminated', value: formatNumber(Math.floor(preventedHours)), primary: false },
          { label: 'Annual Capital Recaptured', value: formatCurrency(saved), primary: true, subtext: 'Prevented AOG Disruptions' }
        ];
      }
    }
  },
  // 8. Smart City Grid (Public Sector)
  {
    id: 'smartcity', industry: 'Public Sector', title: 'Smart City Power Grid', subtitle: 'Adaptive Traffic & Energy Routing.',
    theme: { colorName: 'fuchsia', text: 'text-fuchsia-400', bgSoft: 'bg-fuchsia-500/10', borderSoft: 'border-fuchsia-500/30', accent: 'accent-fuchsia-500', gradientText: 'from-fuchsia-400 to-purple-500', simBg: 'bg-[#100410]', simBorder: 'border-fuchsia-900/30', simGlow: 'bg-fuchsia-900/20' },
    spec: { target: 'Tier-1 Metro Node', scale: '12M+ Population', metric: 'Grid Blackouts -98%' },
    trust: { compliance: 'NERC CIP / ISO 27001', uptime: '99.9999%', dataVolume: '2.5B IoT Pings/Hr' },
    chartData: { title: 'Peak Load Shaving', subtitle: 'Grid MW Demand vs Hour of Day', points: [ {label: '12 PM', val1: 4500, val1Pct: 80, val1Label: 'Unmanaged', val2: 4400, val2Pct: 78, val2Label: 'Adaptive'}, {label: '4 PM', val1: 6800, val1Pct: 100, val1Label: 'Unmanaged', val2: 5100, val2Pct: 75, val2Label: 'Adaptive'}, {label: '8 PM', val1: 5200, val1Pct: 90, val1Label: 'Unmanaged', val2: 4800, val2Pct: 70, val2Label: 'Adaptive'} ] },
    metrics: [ { icon: Zap, title: 'Peak Load Reduced', value: '-25%', detail: 'Saved via dynamic smart-meter throttling.' }, { icon: Activity, title: 'Traffic Flow', value: '+18%', detail: 'Velocity increased via algorithmic light sequencing.' } ],
    sections: [
      { title: 'Executive Abstract', content: 'InvadeCode engineered a unified Smart City Operating System for a Tier-1 metropolis. The system autonomously manages municipal power grids and traffic light sequences, adapting in real-time to population density and micro-loads.' },
      { index: 1, title: 'The Infrastructure Breaking Point', content: 'The city suffered rolling blackouts during summer peaks and crippling gridlock. Legacy SCADA systems operated in isolation, incapable of communicating with the traffic management APIs.' },
      { index: 2, title: 'The Core Engineering Problem', content: 'We had to ingest 2.5 Billion IoT pings per hour from smart meters, traffic cameras, and EV charging stations, processing them with sub-10ms latency to make automated load-balancing decisions.' },
      { index: 3, title: 'Unified Data Fabric', content: 'We built a decentralized data mesh using Apache Pulsar. It normalizes disparate telemetry—from high-voltage substations to intersection induction loops—into a single queryable semantic state.' },
      { index: 4, title: 'Algorithmic Peak Load Shaving', content: 'During peak heat, the ML engine predicts grid stress. It automatically interfaces with residential smart meters, micro-throttling non-critical loads (like AC units enrolled in the savings program) by 1-2 degrees, shaving 25% off peak demand.' },
      { index: 5, title: 'Adaptive Traffic Sequencing', content: 'Computer vision models at intersections analyze traffic density. The system dynamically alters red-light durations city-wide to clear congestion waves, improving average transit velocity by 18%.' },
      { index: 6, title: 'EV Charging Orchestration', content: 'As EV adoption scales, unmanaged charging melts local transformers. Our OS dynamically prices and limits public EV charging speeds based on the real-time capacity of the hyper-local neighborhood grid.' },
      { index: 7, title: 'Predictive Transformer Maintenance', content: 'By analyzing thermal profiles and load variations, the system predicts transformer blowouts weeks in advance, automatically dispatching municipal repair crews.' },
      { index: 8, title: 'Citizen Emergency Broadcast', content: 'In severe events (floods), the OS automatically calculates safe evacuation routes and pushes targeted push notifications/SMS to specific cellular towers via telecom APIs.' },
      { index: 9, title: 'Nation-State Threat Vectors', content: 'City grids are targets for cyber-warfare. The entire system sits behind an air-gapped, military-grade firewall, utilizing continuous AI-driven penetration testing to flag anomalous lateral movement.' },
      { index: 10, title: 'Empirical Yield', content: 'The Smart City OS eliminated 98% of rolling blackouts and deferred $1.2B in required power plant construction by optimizing existing infrastructure.' }
    ],
    simulator: {
      title: 'Infrastructure Optimization Simulator', description: 'Model the capital deferred by algorithmically shaving peak grid loads and preventing blackouts.',
      initialValues: { pop: 12, peakLoad: 6800, plantCost: 1200 },
      sliders: [
        { key: 'pop', label: 'Metro Population (Millions)', min: 1, max: 30, step: 1, format: v => `${v}M` },
        { key: 'peakLoad', label: 'Legacy Peak Demand (MW)', min: 1000, max: 15000, step: 100, format: v => `${v} MW` },
        { key: 'plantCost', label: 'Cost per New Plant ($M)', min: 500, max: 3000, step: 100, format: v => `$${v}M` }
      ],
      calculate: (v) => {
        const mwSaved = v.peakLoad * 0.25; // 25% peak shaving
        const plantsDeferred = mwSaved / 500;
        const capexDeferred = plantsDeferred * v.plantCost * 1000000;
        return [
          { label: 'Peak Capacity Shaved (MW)', value: formatNumber(Math.floor(mwSaved)), primary: false },
          { label: 'CAPEX Deferred', value: formatCurrency(capexDeferred), primary: true, subtext: 'Prevented new plant construction' }
        ];
      }
    }
  },
  // 9. Telecom Network Optimizer (Enterprise IT)
  {
    id: 'telecom', industry: 'Enterprise IT', title: '5G Network Auto-Scaler', subtitle: 'Dynamic Bandwidth Allocation.',
    theme: { colorName: 'lime', text: 'text-lime-500', bgSoft: 'bg-lime-500/10', borderSoft: 'border-lime-500/30', accent: 'accent-lime-500', gradientText: 'from-lime-400 to-green-500', simBg: 'bg-[#050a02]', simBorder: 'border-lime-900/30', simGlow: 'bg-lime-900/20' },
    spec: { target: 'Tier-1 Telco Provider', scale: '85,000+ Cell Nodes', metric: 'Energy Costs -32%' },
    trust: { compliance: '3GPP / SOC2', uptime: '99.999%', dataVolume: '5.2TB/Hr Logs' },
    chartData: { title: 'Node Power Consumption', subtitle: 'KW/h vs Density', points: [ {label: '02:00', val1: 450, val1Pct: 100, val1Label: 'Static', val2: 120, val2Pct: 26, val2Label: 'Auto-Scaled'}, {label: '14:00', val1: 450, val1Pct: 100, val1Label: 'Static', val2: 440, val2Pct: 98, val2Label: 'Auto-Scaled'}, {label: '22:00', val1: 450, val1Pct: 100, val1Label: 'Static', val2: 210, val2Pct: 46, val2Label: 'Auto-Scaled'} ] },
    metrics: [ { icon: Leaf, title: 'Energy OPEX', value: '-32.4%', detail: 'Saved by sleeping idle cellular antennas.' }, { icon: Activity, title: 'Packet Drop', value: '< 0.01%', detail: 'Maintained pristine QoS during peak loads.' } ],
    sections: [
      { title: 'Executive Abstract', content: 'We built a deep-learning Network Optimizer for a Tier-1 5G Telecom provider. The system autonomously scales cellular tower power up and down based on predictive human density modeling, slashing energy costs without impacting QoS.' },
      { index: 1, title: 'The Energy OPEX Hemorrhage', content: '5G massive MIMO antennas consume vast amounts of electricity. The legacy network ran at 100% capacity 24/7, even at 3 AM when the sector was empty, resulting in tens of millions in wasted energy OPEX.' },
      { index: 2, title: 'The Core Engineering Problem', content: 'Powering down a node risks dropping active calls or degrading emergency services. We needed a model that could predict hyper-local human density down to the minute, adjusting RF (Radio Frequency) tilt and power instantly.' },
      { index: 3, title: 'Predictive Density Modeling', content: 'We trained an LSTM network on 3 years of historical tower handshake logs. The model perfectly maps the ebb and flow of human traffic—rush hours, stadium events, and quiet nights.' },
      { index: 4, title: 'Autonomous Node Sleeping', content: 'During predicted low-load windows, the orchestrator issues commands via the O-RAN interface to selectively put antenna arrays into deep sleep micro-cycles, maintaining a thin coverage layer for baseline connectivity.' },
      { index: 5, title: 'Dynamic Bandwidth Steering', content: 'During anomalous spikes (e.g., an unannounced concert), the system detects connection density deviations. It instantly wakes adjacent towers and steers bandwidth using beamforming to prevent congestion.' },
      { index: 6, title: 'Self-Healing Mesh Integration', content: 'If a tower experiences hardware failure, the ERP detects the packet loss and automatically commands surrounding nodes to increase their transmit power to cover the physical blind spot.' },
      { index: 7, title: 'Real-Time Billing Sync', content: 'Network usage telemetry is piped directly into the enterprise billing module via Kafka, ensuring data-caps and roaming charges are resolved instantaneously rather than via batch files.' },
      { index: 8, title: 'Predictive Hardware Maintenance', content: 'By analyzing internal antenna temperatures and power draw, the system predicts hardware degradation, dispatching technicians before the transceiver fails completely.' },
      { index: 9, title: 'Telco-Grade Security', content: 'The orchestration layer operates behind a strict DMZ. All commands to the Radio Access Network (RAN) are cryptographically signed to prevent malicious actor interference.' },
      { index: 10, title: 'Empirical Yield', content: 'The telco slashed their network energy consumption by 32.4%, realizing over $85M in annual OPEX savings while actually improving peak-time connection speeds.' }
    ],
    simulator: {
      title: '5G Node Auto-Scaler Simulator', description: 'Model the energy OPEX savings achieved by dynamically sleeping idle cellular arrays.',
      initialValues: { nodes: 85000, costPerKwh: 0.15, sleepGain: 32 },
      sliders: [
        { key: 'nodes', label: 'Active 5G Nodes', min: 1000, max: 200000, step: 1000, format: formatNumber },
        { key: 'costPerKwh', label: 'Commercial Power Cost ($/kWh)', min: 0.05, max: 0.50, step: 0.01, format: v => `$${v}` },
        { key: 'sleepGain', label: 'Energy Reduction (%)', min: 10, max: 50, step: 1, format: v => `${v}%` }
      ],
      calculate: (v) => {
        const annualUsage = v.nodes * 20000;
        const legacyCost = annualUsage * v.costPerKwh;
        const savings = legacyCost * (v.sleepGain / 100);
        return [
          { label: 'Legacy Annual Power OPEX', value: formatCurrency(legacyCost), primary: false },
          { label: 'Capital Reclaimed via Auto-Scale', value: formatCurrency(savings), primary: true, subtext: 'Pure Profit Margin' }
        ];
      }
    }
  },
  // 10. BioPharma Cold Chain (Healthcare)
  {
    id: 'biopharma', industry: 'Healthcare', title: 'BioPharma Cold Chain ERP', subtitle: 'Vaccine Integrity Matrix.',
    theme: { colorName: 'sky', text: 'text-sky-400', bgSoft: 'bg-sky-500/10', borderSoft: 'border-sky-500/30', accent: 'accent-sky-500', gradientText: 'from-sky-400 to-cyan-500', simBg: 'bg-[#02070a]', simBorder: 'border-sky-900/30', simGlow: 'bg-sky-900/20' },
    spec: { target: 'Global Pharma Giant', scale: '120+ Countries', metric: '0.00% Batch Spoilage' },
    trust: { compliance: 'FDA 21 CFR Part 11', uptime: '99.999%', dataVolume: '500M IoT Pings/Day' },
    chartData: { title: 'Temperature Excursion Events', subtitle: 'Violations vs Transit Time', points: [ {label: 'Q1', val1: 450, val1Pct: 100, val1Label: 'Legacy', val2: 12, val2Pct: 2, val2Label: 'ERP'}, {label: 'Q2', val1: 410, val1Pct: 90, val1Label: 'Legacy', val2: 4, val2Pct: 1, val2Label: 'ERP'}, {label: 'Q3', val1: 390, val1Pct: 85, val1Label: 'Legacy', val2: 0, val2Pct: 0, val2Label: 'ERP'} ] },
    metrics: [ { icon: Box, title: 'Batch Integrity', value: '100%', detail: 'Zero regulatory spoilage write-offs.' }, { icon: Shield, title: 'Audit Reporting', value: 'Instant', detail: 'Automated cryptographic compliance logs.' } ],
    sections: [
      { title: 'Executive Abstract', content: 'InvadeCode engineered a hyper-secure cold chain ERP for a global pharmaceutical giant. The system ensures the absolute thermodynamic integrity of mRNA vaccines and biologics from the laboratory floor to the patient’s arm.' },
      { index: 1, title: 'The Cold Chain Fragility', content: 'Biologics must be kept at strict cryogenic temperatures (-70°C). A temperature excursion of just 2 degrees for 15 minutes destroys the efficacy of a $5M batch. The client relied on post-transit data loggers, leading to massive delayed write-offs.' },
      { index: 2, title: 'The Core Engineering Problem', content: 'We had to build an active, real-time telemetry network that could ingest data from deep-frozen pallets worldwide, predicting thermal degradation *before* an irreversible excursion occurred.' },
      { index: 3, title: 'Cryogenic IoT Mesh', content: 'We integrated with ultra-low-temperature IoT beacons. The data is piped via MQTT into our stream-processing engine, mapping exact thermodynamic states of 500,000+ individual vials simultaneously.' },
      { index: 4, title: 'Predictive Thermal Degradation', content: 'Our ML models analyze the cooling curve of each pallet. If a compressor is failing, the system predicts the exact minute the payload will breach -70°C, triggering an emergency SOS to the logistics crew.' },
      { index: 5, title: 'Algorithmic Re-Routing', content: 'If a customs delay at an airport threatens the thermal window, the ERP autonomously contacts local dry-ice vendors via API, dispatching emergency coolant to the tarmac.' },
      { index: 6, title: 'Blockchain Chain of Custody', content: 'To combat counterfeit drugs, every vial scan, GPS ping, and temperature log is hashed and written to a private Hyperledger blockchain. This proves provenance beyond cryptographic doubt.' },
      { index: 7, title: 'Automated FDA Compliance', content: 'The system auto-generates 21 CFR Part 11 compliant audit trails. Regulatory bodies can instantly verify that a batch never experienced a thermal excursion during its 8,000-mile journey.' },
      { index: 8, title: 'Demand-Driven Manufacturing', content: 'The ERP syncs global clinical utilization rates with the factory floor, pacing batch production strictly to matched demand, preventing overstocking of highly perishable assets.' },
      { index: 9, title: 'Zero-Trust Architecture', content: 'Given the high value of the cargo, transit routes and API endpoints are heavily obfuscated. We deployed mutual TLS (mTLS) for all IoT comms to prevent man-in-the-middle attacks.' },
      { index: 10, title: 'Empirical Yield', content: 'The ERP achieved a 0.00% batch spoilage rate globally, saving $140M+ in annual write-offs and guaranteeing the efficacy of life-saving medical payloads.' }
    ],
    simulator: {
      title: 'Biologic Payload Integrity Simulator', description: 'Model the capital saved by completely eliminating temperature excursion write-offs in pharmaceutical cold chains.',
      initialValues: { batches: 5000, valuePerBatch: 5, excursionRate: 1.5 },
      sliders: [
        { key: 'batches', label: 'Annual Batches Shipped', min: 100, max: 20000, step: 100, format: formatNumber },
        { key: 'valuePerBatch', label: 'Value per Batch ($M)', min: 0.5, max: 20, step: 0.5, format: v => `$${v}M` },
        { key: 'excursionRate', label: 'Legacy Excursion Rate (%)', min: 0.1, max: 10, step: 0.1, format: v => `${v}%` }
      ],
      calculate: (v) => {
        const legacyLoss = v.batches * (v.excursionRate / 100) * v.valuePerBatch * 1000000;
        return [
          { label: 'Capital Lost to Thermal Spoilage', value: formatCurrency(legacyLoss), primary: false },
          { label: 'Capital Reclaimed via 0% Spoilage', value: formatCurrency(legacyLoss), primary: true, subtext: 'Total Payload Integrity' }
        ];
      }
    }
  },
  // 11. Retail Omni-Channel (Supply Chain)
  {
    id: 'retail', industry: 'Supply Chain', title: 'Omni-Channel Retail ERP', subtitle: 'Algorithmic Pricing & SCM.',
    theme: { colorName: 'fuchsia', text: 'text-fuchsia-400', bgSoft: 'bg-fuchsia-500/10', borderSoft: 'border-fuchsia-500/30', accent: 'accent-fuchsia-500', gradientText: 'from-fuchsia-400 to-purple-500', simBg: 'bg-[#100410]', simBorder: 'border-fuchsia-900/30', simGlow: 'bg-fuchsia-900/20' },
    spec: { target: 'Global Fashion Brand', scale: '4,500+ Locations', metric: 'Dead Stock -82%' },
    trust: { compliance: 'PCI-DSS / GDPR', uptime: '99.99%', dataVolume: '18M Tx/Day' },
    chartData: { title: 'Dead Stock vs Inventory Turn', subtitle: 'Turn Rate (Days) vs Unsold Units', points: [ {label: 'Q1', val1: 45, val1Pct: 100, val1Label: 'Legacy Turn', val2: 12000, val2Pct: 100, val2Label: 'Dead Stock'}, {label: 'Q2', val1: 28, val1Pct: 60, val1Label: 'Legacy Turn', val2: 5000, val2Pct: 40, val2Label: 'Dead Stock'}, {label: 'Q3', val1: 14, val1Pct: 30, val1Label: 'Legacy Turn', val2: 2100, val2Pct: 15, val2Label: 'Dead Stock'} ] },
    metrics: [ { icon: TrendingUp, title: 'Margin Optimization', value: '+14%', detail: 'Via algorithmic dynamic pricing.' }, { icon: Box, title: 'Dead Stock', value: '-82%', detail: 'Prevented via predictive geographic routing.' } ],
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
      title: 'Dead Stock Recovery Simulator', description: 'Model the capital reclaimed by algorithmically shifting inventory and utilizing dynamic pricing.',
      initialValues: { inventory: 500, deadPct: 15, marginGain: 14 },
      sliders: [
        { key: 'inventory', label: 'Total Annual Inventory ($M)', min: 100, max: 2000, step: 50, format: v => `$${v}M` },
        { key: 'deadPct', label: 'Legacy Dead Stock Rate (%)', min: 1, max: 30, step: 1, format: v => `${v}%` },
        { key: 'marginGain', label: 'Dynamic Pricing Gain (%)', min: 1, max: 25, step: 1, format: v => `+${v}%` }
      ],
      calculate: (v) => {
        const deadLoss = v.inventory * (v.deadPct / 100) * 1000000;
        const reclaimed = deadLoss * 0.82;
        const pricingBonus = v.inventory * (v.marginGain / 100) * 1000000;
        return [
          { label: 'Dead Stock Capital Reclaimed', value: formatCurrency(reclaimed), primary: false },
          { label: 'Total Margin Recaptured', value: formatCurrency(reclaimed + pricingBonus), primary: true, subtext: 'Via Routing & Dynamic Pricing' }
        ];
      }
    }
  },
  // 12. Defense Supply Chain (Public Sector)
  {
    id: 'defense', industry: 'Public Sector', title: 'Munitions Logistics Network', subtitle: 'Air-Gapped SCM Matrix.',
    theme: { colorName: 'emerald', text: 'text-emerald-500', bgSoft: 'bg-emerald-500/10', borderSoft: 'border-emerald-500/30', accent: 'accent-emerald-500', gradientText: 'from-emerald-400 to-green-500', simBg: 'bg-[#020a06]', simBorder: 'border-emerald-900/30', simGlow: 'bg-emerald-900/20' },
    spec: { target: 'NATO Allied Command', scale: 'Global Theater', metric: '100% Cryptographic Audit' },
    trust: { compliance: 'DoD IL6 / NIST 800-171', uptime: '99.999%', dataVolume: 'Classified' },
    chartData: { title: 'Supply Line Velocity', subtitle: 'Request to Fulfillment (Hours)', points: [ {label: 'T1', val1: 120, val1Pct: 100, val1Label: 'Legacy', val2: 24, val2Pct: 20, val2Label: 'Algorithmic'}, {label: 'T2', val1: 140, val1Pct: 100, val1Label: 'Legacy', val2: 28, val2Pct: 20, val2Label: 'Algorithmic'}, {label: 'T3', val1: 180, val1Pct: 100, val1Label: 'Legacy', val2: 36, val2Pct: 20, val2Label: 'Algorithmic'} ] },
    metrics: [ { icon: Target, title: 'Fulfillment Velocity', value: '+400%', detail: 'Algorithmically routed through safe corridors.' }, { icon: Shield, title: 'Data Breaches', value: '0', detail: 'Impenetrable air-gapped cryptography.' } ],
    sections: [
      { title: 'Executive Abstract', content: 'InvadeCode was cleared to build an ultra-secure, air-gapped Supply Chain Management system for a coalition military force. The ERP orchestrates the global movement of munitions, medical supplies, and armor while remaining cryptographically dark to adversarial interception.' },
      { index: 1, title: 'The Theater of Chaos', content: 'Military logistics rely on antiquated, slow databases. Frontline requests took days to process, and physical supply lines were vulnerable because route data was fragmented and lacked real-time threat-intel correlation.' },
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
      title: 'Logistical Velocity Simulator', description: 'Model the impact of algorithmic routing and predictive depletion on military supply chain velocity.',
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
  },
  // 13. IIT Reg (Public Sector)
  {
    id: 'iit-reg', industry: 'Public Sector', title: 'Premier Institute Regulatory Affairs', subtitle: 'National Grid Policy Ecosystem.',
    theme: { colorName: 'cyan', text: 'text-cyan-400', bgSoft: 'bg-cyan-500/10', borderSoft: 'border-cyan-500/30', accent: 'accent-cyan-500', gradientText: 'from-cyan-400 to-blue-500', simBg: 'bg-[#02080a]', simBorder: 'border-cyan-900/30', simGlow: 'bg-cyan-900/20' },
    spec: { target: 'Institute COE', scale: 'National Grid Data', metric: '100% Policy Automation' },
    trust: { compliance: 'SOC2 Type II / ISO 27001', uptime: '99.99%', dataVolume: '500M+ Telemetry Nodes' },
    chartData: { title: 'Policy Extraction Velocity', subtitle: 'Documents Parsed vs Time (Hours)', points: [ {label: 'State 1', val1: 120, val1Pct: 100, val1Label: 'Manual', val2: 2, val2Pct: 5, val2Label: 'NLP'}, {label: 'State 2', val1: 90, val1Pct: 80, val1Label: 'Manual', val2: 1.5, val2Pct: 3, val2Label: 'NLP'}, {label: 'State 3', val1: 150, val1Pct: 100, val1Label: 'Manual', val2: 2.5, val2Pct: 6, val2Label: 'NLP'} ] },
    metrics: [ { icon: Layers, title: 'Data Ingestion', value: '10x Faster', detail: 'Automated scraping from disparate SLDCs.' }, { icon: Shield, title: 'Policy Insights', value: 'Real-Time', detail: 'Instant NLP query results.' } ],
    sections: [
      { title: 'Executive Abstract', content: 'InvadeCode was selected to build the digital infrastructure for a Premier Institute\'s Center of Excellence for Regulatory Affairs in Electricity. We engineered a massive, interconnected web ecosystem that scrapes, normalizes, and visualizes policy APIs and grid telemetry to support national policy-making.' },
      { index: 1, title: 'The Regulatory Black Box', content: 'National electricity regulation is bogged down by fragmented data. Policy researchers had to manually hunt down load-dispatch data, tariff orders, and disparate state APIs, crippling the speed of vital academic and regulatory research.' },
      { index: 2, title: 'Core Engineering Problem', content: 'The challenge was building a high-throughput middleware capable of connecting to diverse, often legacy, state-grid APIs, scraping unstructured regulatory PDFs, and unifying it all into a queryable semantic data lake.' },
      { index: 3, title: 'Automated API Discovery & Ingestion', content: 'We built a custom web scraper and API polling engine. It continuously monitors state load dispatch centers (SLDCs), automatically ingesting real-time data on grid frequency, power exchange pricing, and renewable energy injection.' },
      { index: 4, title: 'Semantic NLP Policy Parsing', content: 'To handle textual regulatory orders, we deployed an NLP model trained on legal-electrical vernacular. It reads thousands of pages of tariff orders, extracting key metadata (dates, tariff rates, mandates) and structuring it into a relational database.' },
      { index: 5, title: 'The Research Web Portal', content: 'We built a high-performance, Next.js-powered web interface. Researchers can run complex, cross-state comparative queries instantly (e.g., "Compare solar tariff trajectories in West vs South grids over 5 years").' },
      { index: 6, title: 'Real-Time Grid Telemetry Dashboard', content: 'A live dashboard visualizes the health of the national grid. It plots complex metrics like the Deviation Settlement Mechanism (DSM) and ancillary service deployments in real-time using WebSockets.' },
      { index: 7, title: 'Algorithmic Impact Modeling', content: 'Researchers can use the platform to simulate policy shifts. If a new renewable energy mandate is proposed, the system algorithms calculate the estimated financial impact on distribution companies (DISCOMs) based on historical load data.' },
      { index: 8, title: 'Open API Provisioning', content: 'To foster academic collaboration, we built an API gateway wrapper. The COE can securely issue API keys to other global research institutions, allowing them to query the normalized Indian grid dataset.' },
      { index: 9, title: 'Threat Vector & Data Redundancy', content: 'Given the sensitivity of national infrastructure data, the platform utilizes strict DDoS protection, rate-limiting, and geo-fenced database redundancy, ensuring 99.99% uptime for researchers.' },
      { index: 10, title: 'Empirical Yield & Strategic Gain', content: 'The platform accelerated national regulatory research cycles by 10x, turning months of data-gathering into instant queries. For InvadeCode, it proved our capability to architect massive, data-heavy public-policy platforms.' }
    ],
    simulator: {
      title: 'Policy Research Acceleration Simulator', description: 'Model the time and academic resources saved by automating national grid telemetry ingestion and NLP policy parsing.',
      initialValues: { states: 15, dataPoints: 500000, researchers: 40 },
      sliders: [
        { key: 'states', label: 'State Grids Monitored', min: 1, max: 29, step: 1, format: v => v },
        { key: 'dataPoints', label: 'Telemetry Points / Day', min: 100000, max: 5000000, step: 100000, format: formatNumber },
        { key: 'researchers', label: 'Active Researchers', min: 10, max: 200, step: 5, format: v => v }
      ],
      calculate: (v) => {
        const manualHoursPerState = 120;
        const totalManualHoursSaved = v.states * manualHoursPerState * 12;
        const researchVelocity = v.researchers * 4.5;
        return [
          { label: 'Manual Data Mining Hours Eliminated', value: formatNumber(totalManualHoursSaved), primary: false },
          { label: 'Research Output Velocity', value: `+${researchVelocity}%`, primary: true, subtext: 'Accelerated Time-to-Publication' }
        ];
      }
    }
  },
  // 14. IAG (Supply Chain)
  {
    id: 'iag', industry: 'Supply Chain', title: 'InvadeAgro ERP', subtitle: 'The Algorithmic Supply Chain.',
    theme: { colorName: 'teal', text: 'text-teal-400', bgSoft: 'bg-teal-500/10', borderSoft: 'border-teal-500/30', accent: 'accent-teal-500', gradientText: 'from-teal-400 to-cyan-500', simBg: 'bg-[#030712]', simBorder: 'border-teal-900/30', simGlow: 'bg-teal-900/20' },
    spec: { target: 'IAG Enterprise', scale: '1,000+ POS', metric: '0.0% Stock-out Rate' },
    trust: { compliance: 'SOC2 Type II / ISO 27001', uptime: '99.99%', dataVolume: '8.4B Telemetry Nodes' },
    chartData: { title: 'Procurement Accuracy Vector', subtitle: 'Accuracy % vs Sales Volume ($M)', points: [ {label: 'Y1', val1: 72, val1Pct: 72, val1Label: 'Accuracy', val2: 12, val2Pct: 40, val2Label: 'Volume'}, {label: 'Y2', val1: 88, val1Pct: 88, val1Label: 'Accuracy', val2: 24, val2Pct: 70, val2Label: 'Volume'}, {label: 'Y3', val1: 98, val1Pct: 98, val1Label: 'Accuracy', val2: 38, val2Pct: 100, val2Label: 'Volume'} ] },
    metrics: [ { icon: Box, title: 'Stock-Outs', value: '0.0%', detail: 'Via 6-day predictive algorithm.' }, { icon: TrendingUp, title: 'Avg Upsell', value: '+2.1x', detail: 'Algorithmic cross-sell suggestions.' } ],
    sections: [
      { title: 'Executive Abstract', content: 'InvadeCode was contracted as the core engineering division for InvadeAgro ERP, a massive agricultural inputs trading enterprise managing procurement across a highly fragmented network of 1,000 retail store nodes spanning 21 geographic territories.' },
      { index: 1, title: 'The Fragmentation Horizon', content: 'Operating across 21 distinct territories introduces severe chaotic variables. Standard centralized supply chain software fails because agricultural demand is hyper-local. A micro-climate shift alters needs in a 50-mile radius overnight.' },
      { index: 2, title: 'Neural Architecture & Solution', content: 'We engineered a bespoke, event-driven ERP that collapses traditional functional silos. The architecture ensures a transaction at a remote node instantaneously updates global logistics queues, financial ledgers, and inventory health.' },
      { index: 3, title: 'Pre-Emptive SCM Engine', content: 'Relying on human intuition results in catastrophic capital waste. We built a Time-Series forecasting model (localized Random Forest regressions). It calculates probability matrixes; when thresholds exceed 94.5%, procurement auto-triggers 144 hours prior to demand.' },
      { index: 4, title: 'Consultative Upsell UI', content: 'The point-of-sale interface was rebuilt. By synthesizing real-time micro-climate and agronomic profiles, it renders tailored cross-sell recommendations directly to the clerk, systematically inflating transaction values.' },
      { index: 5, title: 'Omni-Module Ledger Sync', content: 'We eliminated data silos entirely. Finance, HR, and Operations modules operate on a single source of truth, preventing the classic state-mismatches found in deeply distributed retail networks.' },
      { index: 6, title: 'Data Ingestion Architecture', content: 'The system ingests 100+ variables continually, including long-range precipitation forecasts, localized pest-migration tracking, and historical yield data via high-throughput messaging queues.' },
      { index: 7, title: 'Threat Vector & Security', content: 'Processing profiles for over 1 million individual farmers requires rigorous data compartmentalization. The IAG ERP system utilizes a Zero-Trust architecture with End-to-end AES-256 encryption at rest and in transit.' },
      { index: 8, title: 'Decentralized Edge Processing', content: 'To handle rural network latency, localized ML inferences happen at the edge-node. Store databases sync asynchronously with the cloud core, ensuring zero operational downtime.' },
      { index: 9, title: 'Lifetime Telemetry & Scale', content: 'Over the lifecycle, the network evolved from a reactive cluster into a deterministic organism, processing over 8.4 billion distinct telemetry points to create a self-healing inventory network.' },
      { index: 10, title: 'Empirical Yield', content: 'The transition from heuristic guesswork to algorithmic determinism completely redefined IAG ERP\'s margins, eliminating stock-outs and increasing upsells by 2.1x per transaction.' }
    ],
    simulator: {
      title: 'Enterprise ROI Simulator', description: 'Dynamically model the compounding financial impact of integrating the InvadeCode predictive SCM and consultative engine into a fragmented retail network.',
      initialValues: { stores: 1850, farmers: 3600, upsell: 3.5, accuracy: 98 },
      sliders: [
        { key: 'stores', label: 'Active Network Nodes', min: 100, max: 2500, step: 50, format: formatNumber },
        { key: 'farmers', label: 'Client Base per Node', min: 200, max: 5000, step: 100, format: formatNumber },
        { key: 'upsell', label: 'Algorithmic Upsell (Items/Tx)', min: 0, max: 5, step: 0.5, format: v => `+${v}` },
        { key: 'accuracy', label: 'Predictive Model Accuracy (%)', min: 50, max: 100, step: 1, format: v => `${v}%` }
      ],
      calculate: (v) => {
        const baseTrans = v.stores * v.farmers;
        const baseRev = baseTrans * 45;
        const upRev = baseTrans * v.upsell * 30;
        const total = baseRev + (upRev * (v.accuracy / 100));
        return [
          { label: 'Baseline Legacy Revenue', value: formatCurrency(baseRev), primary: false },
          { label: 'Optimized Ecosystem Yield', value: formatCurrency(total), primary: true, subtext: `+${(((total-baseRev)/baseRev)*100).toFixed(1)}% Multiplier` }
        ];
      }
    }
  },
  // 15. Mill (Supply Chain)
  {
    id: 'mill', industry: 'Supply Chain', title: 'Invade Mill ERP', subtitle: 'The Automated Sourcing Engine.',
    theme: { colorName: 'blue', text: 'text-blue-400', bgSoft: 'bg-blue-500/10', borderSoft: 'border-blue-500/30', accent: 'accent-blue-500', gradientText: 'from-blue-400 to-indigo-500', simBg: 'bg-[#020617]', simBorder: 'border-blue-900/30', simGlow: 'bg-blue-900/20' },
    spec: { target: 'Invade Mill', scale: '1000+ WA Groups', metric: 'Real-Time Oracle Validation' },
    trust: { compliance: 'SOC2 Type II / ISO 27001', uptime: '99.99%', dataVolume: '10k+ Msgs/Day' },
    chartData: { title: 'Pricing Spread Oracle', subtitle: 'Market Delta vs Optimization', points: [ {label: 'Commodity A', val1: 300, val1Pct: 100, val1Label: 'Legacy Cost', val2: 285, val2Pct: 90, val2Label: 'Algo Cost'}, {label: 'Commodity B', val1: 450, val1Pct: 100, val1Label: 'Legacy Cost', val2: 410, val2Pct: 85, val2Label: 'Algo Cost'}, {label: 'Commodity C', val1: 150, val1Pct: 100, val1Label: 'Legacy Cost', val2: 138, val2Pct: 88, val2Label: 'Algo Cost'} ] },
    metrics: [ { icon: MessageCircle, title: 'NLP Extraction', value: '99.2%', detail: 'Semantic parsing of unstructured regional text.' }, { icon: Scale, title: 'Margin Spread', value: '+4.5%', detail: 'Yielded via real-time APMC indexing.' } ],
    sections: [
      { title: 'Executive Abstract', content: 'InvadeCode integrated a massive automation framework into Invade Mill ERP. The core objective was to eliminate manual sourcing bottlenecks and secure optimal commodity pricing using NLP.' },
      { index: 1, title: 'The Sourcing Chaos', content: 'Sourcing agricultural commodities is notoriously opaque. Traders rely on fragmented WhatsApp messages and delayed physical boards. This chaos results in sub-optimal margins and volatile inventory levels.' },
      { index: 2, title: 'The Core Engineering Problem', content: 'Extracting clean, highly-structured procurement data (Commodity, Price, Volume) from thousands of slang-heavy, unstructured chat messages in real-time.' },
      { index: 3, title: 'WhatsApp Intelligence Bot', content: 'We deployed an NLP-driven bot capable of scraping unstructured data from over 1,000 localized farmer and trader groups, bypassing the noise and identifying firm trade offers instantly.' },
      { index: 4, title: 'APMC Validation Oracle', content: 'Extracted offers are piped into our Validation Oracle, which queries real-time APMC (Agricultural Produce Market Committee) and FPO networks to flag favorable spreads mathematically.' },
      { index: 5, title: 'Predictive Analytics Inventory', content: 'Validated sourcing data feeds directly into the Mill’s inventory module. By correlating incoming raw material, processing speed, and demand, the system automatically adjusts sourcing aggression.' },
      { index: 6, title: 'Dynamic Price Tolerance', content: 'If analytics predict a supply dip in 14 days, the bot algorithmically increases its price tolerance today to stockpile reserves before market rates spike.' },
      { index: 7, title: 'Automated Ledger Sync', content: 'Once a trade is validated and executed, it bypasses manual entry, syncing instantly with the Mill’s financial ledgers and calculating landed cost including logistics.' },
      { index: 8, title: 'Multi-Lingual Processing', content: 'The NLP engine was custom-trained to understand regional dialects, abbreviations, and informal trade vernacular, ensuring zero missed opportunities across diverse Indian states.' },
      { index: 9, title: 'Threat Vector & Security', content: 'Scraping and processing sensitive pricing data requires strict OPSEC. Data is anonymized, and trading algorithms are secured behind VPN tunnels to prevent reverse engineering of our pricing strategies.' },
      { index: 10, title: 'Empirical Yield', content: 'The engine eliminated thousands of hours of manual verification, recapturing millions in annualized margins via instant spread detection and automated execution.' }
    ],
    simulator: {
      title: 'Sourcing Automation Simulator', description: 'Model the impact of automated WA scraping and APMC validation on procurement margins and operational velocity.',
      initialValues: { volume: 500, groups: 1000, spread: 4.5 },
      sliders: [
        { key: 'volume', label: 'Daily Sourcing Volume (MT)', min: 50, max: 2000, step: 50, format: formatNumber },
        { key: 'groups', label: 'WhatsApp Groups Monitored', min: 100, max: 5000, step: 100, format: formatNumber },
        { key: 'spread', label: 'Spread Optimization (%)', min: 1, max: 10, step: 0.5, format: v => `${v}%` }
      ],
      calculate: (v) => {
        const dailySpend = v.volume * 350;
        const savings = dailySpend * (v.spread / 100) * 300;
        const hours = v.groups * 0.15;
        return [
          { label: 'Automation Time Yield', value: `${formatNumber(hours)} Hrs/Day`, primary: false },
          { label: 'Annualized Margin Recaptured', value: formatCurrency(savings), primary: true, subtext: 'Via APMC Oracle Spread Detection' }
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
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-24 sm:py-32 relative z-10 animate-fade-in-up">
      <div className="text-center mb-16 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-64 bg-slate-200/50 blur-[100px] rounded-full pointer-events-none"></div>
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter text-slate-900 mb-6 relative z-10">
          Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-500 to-slate-900">Excellence.</span>
        </h1>
        <p className="text-xl text-slate-500 font-light max-w-2xl mx-auto relative z-10">
          Explore how we systematically eradicate legacy bottlenecks, deploying autonomous, hyper-scalable algorithmic ecosystems across 5 core industries.
        </p>
      </div>

      {/* Industry Filter Pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-16 relative z-10">
        {['All', ...coreIndustries].map(ind => (
          <button
            key={ind}
            onClick={() => setSelectedIndustry(ind)}
            className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
              selectedIndustry === ind 
              ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20 scale-105' 
              : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50 hover:text-slate-700'
            }`}
          >
            {ind}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredStudies.map((study, idx) => (
          <Reveal key={study.id} delay={idx * 50}>
            <button 
              onClick={() => onSelect(study.id)} 
              className="group relative w-full text-left bg-white border border-slate-200/80 rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-slate-300/60 transition-all duration-700 hover:-translate-y-2 overflow-hidden flex flex-col h-full"
            >
              <div className={`absolute top-0 right-0 w-64 h-64 bg-${study.theme.colorName}-500/10 rounded-full blur-[60px] group-hover:scale-150 group-hover:bg-${study.theme.colorName}-500/20 transition-all duration-1000`}></div>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-slate-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              
              <div className="relative z-10 flex-1">
                <div className="flex justify-between items-start mb-6">
                   <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{study.industry}</h4>
                   <div className={`w-10 h-10 rounded-2xl ${study.theme.bgSoft} flex items-center justify-center`}>
                      <Terminal className={`w-4 h-4 ${study.theme.text}`} />
                   </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-slate-700 transition-colors">{study.title}</h3>
                <p className={`text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r ${study.theme.gradientText} mb-8`}>{study.subtitle}</p>
                
                <div className="space-y-4 mb-10">
                  <div className="flex justify-between items-center text-xs font-mono border-b border-slate-100 pb-3">
                     <span className="text-slate-500">Target</span>
                     <span className="text-slate-900 font-semibold truncate max-w-[140px] text-right">{study.spec.target}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-mono border-b border-slate-100 pb-3">
                     <span className="text-slate-500">Scale</span>
                     <span className="text-slate-900 font-semibold truncate max-w-[140px] text-right">{study.spec.scale}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-mono">
                     <span className="text-slate-500">Yield</span>
                     <span className={`font-bold ${study.theme.text} truncate max-w-[140px] text-right`}>{study.spec.metric}</span>
                  </div>
                </div>
              </div>

              <div className={`relative z-10 w-full pt-6 border-t border-slate-100 flex items-center justify-between`}>
                 <span className="text-xs font-bold text-slate-400 uppercase tracking-widest group-hover:text-slate-900 transition-colors duration-300">View Architecture</span>
                 <div className={`w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-${study.theme.colorName}-50 transition-colors duration-500`}>
                    <ArrowRight className={`w-4 h-4 text-slate-400 group-hover:${study.theme.text} transition-all duration-500 group-hover:translate-x-1`} />
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
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 selection:bg-slate-300 selection:text-slate-900" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        @keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(500px); } }
        .scanline-animation { animation: scanline 4s linear infinite; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}} />
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>
        <div className={`absolute top-0 right-0 w-[600px] h-[600px] ${activeStudy ? `bg-${activeStudy.theme.colorName}-500/10` : 'bg-slate-400/10'} rounded-full blur-[100px] transition-colors duration-1000`}></div>
        <div className={`absolute bottom-0 left-0 w-[800px] h-[800px] ${activeStudy ? `bg-${activeStudy.theme.colorName}-400/5` : 'bg-slate-300/10'} rounded-full blur-[120px] transition-colors duration-1000`}></div>
      </div>
      
      {/* Global Top Nav */}
      <div className="w-full bg-slate-950/80 backdrop-blur-2xl py-4 px-4 sm:px-8 z-50 sticky top-0 shadow-[0_10px_40px_rgba(0,0,0,0.1)] border-b border-slate-800/80 flex justify-between items-center transition-all">
        <button onClick={() => { setActiveStudyId(null); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="flex items-center space-x-6 text-slate-300 text-xs font-mono hover:text-white transition-colors cursor-pointer text-left focus:outline-none">
          <span className="font-bold text-white flex items-center gap-2">
            <Terminal className={`w-4 h-4 ${activeStudy ? `text-${activeStudy.theme.colorName}-400` : 'text-slate-400'} transition-colors duration-500`} /> 
            INVADECODE_CORE
          </span>
          <span className="hidden lg:inline text-slate-600">|</span>
          <span className="hidden lg:inline text-slate-400">SOLUTIONS_HUB_V3</span>
        </button>
        
        {activeStudy ? (
          <button onClick={() => { setActiveStudyId(null); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="flex items-center gap-2 text-[10px] sm:text-xs font-bold font-mono text-slate-400 hover:text-white transition-colors bg-slate-900 px-4 py-2 rounded-full border border-slate-700 shadow-inner hover:bg-slate-800 cursor-pointer">
             <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 rotate-180" /> RETURN TO HUB
          </button>
        ) : (
          <span className="flex items-center gap-2 bg-slate-900/50 text-slate-300 px-3 py-1.5 text-xs font-mono rounded-full border border-slate-700/50 backdrop-blur-md shadow-inner">
            <div className="w-2 h-2 rounded-full animate-pulse bg-emerald-500"></div> System Online
          </span>
        )}
      </div>

      {/* Dynamic Content Routing with Re-Mount Key for Animation */}
      <div key={activeStudyId || 'gallery'} className="relative z-10 animate-fade-in-up">
        {activeStudy ? (
          <>
            <CaseStudyViewer study={activeStudy} onReturnToHub={() => { setActiveStudyId(null); window.scrollTo({top: 0, behavior: 'smooth'}); }} />
            
            {/* --- SEAMLESS NEXT CASE STUDY CTA --- */}
            <div className="max-w-4xl mx-auto px-4 sm:px-8 py-24 relative z-10 flex justify-center">
              <button 
                onClick={handleNextStudy}
                className="group relative w-full overflow-hidden rounded-[3rem] bg-white border border-slate-200 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-300/60 transition-all duration-700 hover:-translate-y-2 p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-8 text-left"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${nextStudyPreview.theme.gradientText} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700`}></div>
                <div className={`absolute -right-20 -top-20 w-64 h-64 bg-${nextStudyPreview.theme.colorName}-500/20 rounded-full blur-[80px] group-hover:scale-150 transition-transform duration-1000`}></div>
                
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Explore Next Architecture</h5>
                  <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-2 group-hover:text-slate-700 transition-colors">
                    {nextStudyPreview.title}
                  </h3>
                  <p className="text-sm font-medium text-slate-500">
                    {nextStudyPreview.subtitle}
                  </p>
                </div>
                
                <div className={`w-16 h-16 rounded-full flex items-center justify-center bg-slate-50 group-hover:bg-${nextStudyPreview.theme.colorName}-50 transition-colors duration-500 shrink-0`}>
                  <ArrowRight className={`w-6 h-6 text-slate-400 group-hover:text-${nextStudyPreview.theme.colorName}-500 transition-colors duration-500 group-hover:translate-x-1`} />
                </div>
              </button>
            </div>
          </>
        ) : (
          <GalleryView studies={caseStudiesData} onSelect={(id) => { setActiveStudyId(id); window.scrollTo({top: 0, behavior: 'smooth'}); }} />
        )}
      </div>

      {/* --- THE DAMN NICE GLOBAL FOOTER / CONTACT FORM --- */}
      <footer className="w-full bg-[#020617] relative overflow-hidden border-t border-slate-800 pt-32 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(15,23,42,1),transparent_70%)]"></div>
        {/* Glowing Orbs mapping to active theme or default */}
        <div className={`absolute top-0 left-0 w-[800px] h-[800px] rounded-full blur-[120px] opacity-20 pointer-events-none transition-colors duration-1000 ${activeStudy ? `bg-${activeStudy.theme.colorName}-600` : 'bg-slate-600'} -translate-x-1/2 -translate-y-1/2`}></div>
        <div className={`absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full blur-[100px] opacity-15 pointer-events-none transition-colors duration-1000 ${activeStudy ? `bg-${activeStudy.theme.colorName}-400` : 'bg-slate-500'} translate-x-1/3 translate-y-1/3`}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-5xl sm:text-6xl font-bold tracking-tighter text-white mb-6 leading-tight">
              Let's build your <br/><span className={`text-transparent bg-clip-text bg-gradient-to-r ${activeStudy ? activeStudy.theme.gradientText : 'from-slate-400 to-slate-200'} transition-all duration-1000`}>Algorithmic Future.</span>
            </h2>
            <p className="text-xl text-slate-400 font-light leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0">
              Stop relying on heuristic guesswork. We engineer bespoke, hyper-scalable ERPs and predictive ecosystems that turn operational bottlenecks into massive revenue multipliers.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <div className="flex items-center justify-center lg:justify-start gap-3 text-slate-300 font-mono text-sm">
                 <CheckCircle className={`w-5 h-5 ${activeStudy ? activeStudy.theme.text : 'text-slate-400'} transition-colors duration-500`} /> Zero-Trust Security
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-3 text-slate-300 font-mono text-sm">
                 <CheckCircle className={`w-5 h-5 ${activeStudy ? activeStudy.theme.text : 'text-slate-400'} transition-colors duration-500`} /> Custom ML Pipelines
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 w-full max-w-lg relative group">
            <div className={`absolute -inset-1 bg-gradient-to-r ${activeStudy ? activeStudy.theme.gradientText : 'from-slate-600 to-slate-400'} rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200`}></div>
            <div className="bg-slate-900/60 border border-slate-700/50 backdrop-blur-2xl rounded-[3rem] p-8 sm:p-12 relative shadow-2xl">
              {submitStatus === 'success' ? (
                <div className="text-center py-16 animate-fade-in-up">
                  <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-inner ${activeStudy ? `${activeStudy.theme.bgSoft} ${activeStudy.theme.text} border-${activeStudy.theme.colorName}-500/30` : 'bg-slate-800 text-slate-300 border-slate-700'} border transition-colors duration-500`}>
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Spec Received</h3>
                  <p className="text-slate-400 text-sm">An InvadeCode architect will initiate contact via secure channel shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleLeadSubmit} className="space-y-5">
                  <div className="mb-8">
                     <h3 className="text-2xl font-bold text-white mb-2">Initiate Architecture Review</h3>
                     <p className="text-xs text-slate-400 font-mono">SECURE_TRANSMISSION_PROTOCOL</p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <input required type="text" value={leadForm.name} onChange={(e) => setLeadForm({...leadForm, name: e.target.value})}
                        className="w-full px-5 py-4 bg-slate-950/50 border border-slate-800 rounded-full focus:bg-slate-900 focus:ring-2 focus:ring-slate-700 outline-none transition-all text-sm font-medium text-white placeholder-slate-600 shadow-inner"
                        placeholder="Operator Name"
                      />
                    </div>
                    <div>
                      <input required type="email" value={leadForm.email} onChange={(e) => setLeadForm({...leadForm, email: e.target.value})}
                        className="w-full px-5 py-4 bg-slate-950/50 border border-slate-800 rounded-full focus:bg-slate-900 focus:ring-2 focus:ring-slate-700 outline-none transition-all text-sm font-medium text-white placeholder-slate-600 shadow-inner"
                        placeholder="Secure Email"
                      />
                    </div>
                  </div>
                  <div>
                    <input required type="text" value={leadForm.company} onChange={(e) => setLeadForm({...leadForm, company: e.target.value})}
                      className="w-full px-5 py-4 bg-slate-950/50 border border-slate-800 rounded-full focus:bg-slate-900 focus:ring-2 focus:ring-slate-700 outline-none transition-all text-sm font-medium text-white placeholder-slate-600 shadow-inner"
                      placeholder="Enterprise Designation (Company)"
                    />
                  </div>
                  <div>
                    <textarea required rows={4} value={leadForm.problem} onChange={(e) => setLeadForm({...leadForm, problem: e.target.value})}
                      className="w-full px-5 py-4 bg-slate-950/50 border border-slate-800 rounded-[2rem] focus:bg-slate-900 focus:ring-2 focus:ring-slate-700 outline-none transition-all text-sm font-medium text-white placeholder-slate-600 resize-y shadow-inner"
                      placeholder="Define operational bottlenecks..."
                    />
                  </div>
                  
                  {submitStatus === 'error' && (
                    <div className="bg-red-950/50 text-red-400 text-xs font-mono p-4 rounded-[2rem] border border-red-900/50 flex items-center gap-3">
                      <Activity className="w-4 h-4" /> Transmission failed. Retry.
                    </div>
                  )}

                  <div className="pt-4">
                    <button type="submit" disabled={submitStatus === 'loading'}
                      className={`w-full px-8 py-4 text-slate-950 text-sm font-bold tracking-wide uppercase rounded-full flex items-center justify-center gap-3 transition-all duration-500 disabled:opacity-70 shadow-xl ${activeStudy ? `bg-${activeStudy.theme.colorName}-500 hover:bg-${activeStudy.theme.colorName}-400 hover:shadow-${activeStudy.theme.colorName}-500/30` : 'bg-slate-200 hover:bg-white hover:shadow-slate-200/30'} hover:-translate-y-1`}
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
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 mt-24 pt-8 border-t border-slate-800/50 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-slate-600 relative z-10">
          <div className="flex items-center gap-2"><Terminal className="w-3 h-3" /><span>END OF DOCUMENT_STREAM</span></div>
          <div>© {new Date().getFullYear()} INVADECODE_CORE. ALL RIGHTS RESERVED.</div>
        </div>
      </footer>
    </div>
  );
}
