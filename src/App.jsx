import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, TrendingUp, ShieldCheck, Briefcase, 
  Map, ChevronRight, Bot, Sparkles, PieChart, 
  ArrowRight, Phone, Mail, MapPin, Activity, Check,
  Target, Zap, Users, Calculator, BookOpen, Star, 
  ArrowUpRight, BarChart3, Quote, ChevronDown, ChevronsDown,
  Facebook, Twitter, Instagram, Linkedin, Download, Lock
} from 'lucide-react';

// --- AIO & SEO Metadata Simulation ---
const schemaData = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "name": "Ask Geo",
  "description": "Expert financial planning, wealth management, and portfolio management in Pune, India.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Jai Ganesh Vision, B Wing, BR-2, Office No. 319",
    "addressLocality": "Akurdi, Pune",
    "postalCode": "411035",
    "addressCountry": "IN"
  },
  "telephone": "+919960624271"
};

// --- Custom Animation Wrapper Component ---
const FadeIn = ({ children, delay = 0, direction = 'up', className = "" }) => {
  const domRef = useRef();
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  const translateMap = {
    up: 'translate-y-8',
    down: '-translate-y-8',
    left: 'translate-x-8',
    right: '-translate-x-8',
    none: 'translate-y-0 translate-x-0 scale-95'
  };

  return (
    <div 
      ref={domRef} 
      className={`transition-all duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] text-left ${
        isVisible ? 'opacity-100 translate-y-0 translate-x-0 scale-100' : `opacity-0 ${translateMap[direction]}`
      } ${className}`} 
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- Animated Number Component ---
const AnimatedNumber = ({ end, suffix = "", prefix = "", decimals = 0, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const domRef = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    });
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setCount(easeProgress * end);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [isVisible, end, duration]);

  return (
    <span ref={domRef}>
      {prefix}{(count).toFixed(decimals)}{suffix}
    </span>
  );
};

// --- Animated Progress Bar Component ---
const AnimatedProgress = ({ width, delay = 0 }) => {
  const domRef = useRef();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setTimeout(() => setIsVisible(true), delay);
        observer.disconnect();
      }
    });
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden" ref={domRef}>
      <div 
        className="h-full bg-emerald-500 rounded-full transition-all duration-[1500ms] ease-out relative"
        style={{ width: isVisible ? width : '0%' }}
      >
        <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-white/40 rounded-full blur-[2px] animate-pulse"></div>
      </div>
    </div>
  );
};

// --- Shared General Contact Lightbox / Modal ---
const GeneralContactModal = ({ isOpen, onClose, title }) => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({ name: '', phone: '', email: '' });
      setIsSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate API submission
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 text-left">
      <div className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="bg-zinc-950 px-8 py-6 flex justify-between items-center relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none"></div>
           <div>
             <h3 className="text-white text-lg font-medium tracking-tight">{title}</h3>
             <p className="text-emerald-400 text-[10px] font-medium tracking-widest uppercase mt-1">Provide your details</p>
           </div>
           <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
             <X className="w-4 h-4" />
           </button>
        </div>
        <div className="p-8">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-8 text-center animate-in zoom-in duration-300">
               <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                 <Check className="w-8 h-8" strokeWidth={2} />
               </div>
               <h4 className="text-xl font-medium text-zinc-900 mb-2">Request Received</h4>
               <p className="text-sm text-zinc-500">Our advisory team will contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[10px] font-medium text-zinc-500 uppercase tracking-widest mb-2">Full Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-zinc-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all text-sm text-zinc-900 bg-zinc-50 focus:bg-white" placeholder="e.g. Rajesh Sharma" />
              </div>
              <div>
                <label className="block text-[10px] font-medium text-zinc-500 uppercase tracking-widest mb-2">Phone Number</label>
                <div className="flex">
                  <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-zinc-200 bg-zinc-100 text-zinc-500 text-sm font-medium">+91</span>
                  <input required type="tel" maxLength="10" pattern="[0-9]{10}" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 rounded-r-lg border border-zinc-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all text-sm text-zinc-900 bg-zinc-50 focus:bg-white" placeholder="10-digit mobile number" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-medium text-zinc-500 uppercase tracking-widest mb-2">Email Address</label>
                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-zinc-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all text-sm text-zinc-900 bg-zinc-50 focus:bg-white" placeholder="you@example.com" />
              </div>
              <button type="submit" disabled={isProcessing} className="w-full mt-4 bg-zinc-950 hover:bg-emerald-600 text-white text-sm font-medium py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70">
                {isProcessing ? <span className="flex items-center gap-2"><Activity className="w-4 h-4 animate-spin" /> Submitting...</span> : <>Continue <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

// --- CALCULATOR WIDGETS ---
const formatCurrency = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

// --- PDF Report Generator Utility ---
const generateSipReport = (calcData, leadData, allocation) => {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert("Please allow popups to download the report.");
    return;
  }

  const today = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
  const formatCurrencyLocal = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Ask Geo - Wealth Projection Blueprint</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        @page { size: A4; margin: 0; }
        * { box-sizing: border-box; text-align: left; }
        body { font-family: 'Inter', sans-serif; margin: 0; padding: 0; color: #18181b; background: #ffffff; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        .page-container { width: 210mm; min-height: 297mm; margin: 0 auto; position: relative; overflow: hidden; }
        .header { background: #09090b; color: #ffffff; padding: 50px 50px 40px 50px; position: relative; overflow: hidden; }
        .header::after { content: ''; position: absolute; top: -50%; right: -10%; width: 400px; height: 400px; background: radial-gradient(circle, rgba(16, 185, 129, 0.25), transparent 70%); border-radius: 50%; filter: blur(40px); pointer-events: none; }
        .logo-container { display: flex; align-items: center; gap: 12px; margin-bottom: 25px; }
        .logo-img { height: 40px; filter: brightness(0) invert(1); }
        .report-title { font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #10b981; margin-bottom: 10px; }
        .main-heading { font-size: 36px; font-weight: 300; letter-spacing: -1px; margin: 0 0 10px 0; line-height: 1.1; }
        .client-info { display: flex; justify-content: space-between; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px; margin-top: 30px; }
        .info-block p { margin: 0 0 5px 0; font-size: 9px; text-transform: uppercase; letter-spacing: 1px; color: #a1a1aa; }
        .info-block h4 { margin: 0; font-size: 14px; font-weight: 500; }
        .content { padding: 40px 50px; }
        .chart-container { background: #09090b; border-radius: 16px; padding: 30px; color: white; margin-bottom: 30px; }
        .chart-title { font-size: 11px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: #a1a1aa; margin-bottom: 15px; }
        .highlight-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
        .metric-card { background: #f4f4f5; border-radius: 12px; padding: 20px; border: 1px solid #e4e4e7; }
        .metric-label { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #71717a; margin-bottom: 8px; }
        .metric-value { font-size: 28px; font-weight: 300; margin: 0; color: #18181b; letter-spacing: -1px; }
        .metric-value.success { color: #059669; font-weight: 500; }
        .allocation-table { width: 100%; border-collapse: collapse; border: 1px solid #e4e4e7; border-radius: 12px; overflow: hidden; background: white; }
        .allocation-table th { background: #f4f4f5; text-align: left; padding: 12px 16px; font-size: 10px; color: #71717a; text-transform: uppercase; letter-spacing: 0.5px; }
        .allocation-table td { padding: 14px 16px; border-bottom: 1px solid #e4e4e7; font-size: 13px; text-align: left; }
        .allocation-table tr:last-child td { border-bottom: none; }
        .footer { position: absolute; bottom: 0; width: 100%; padding: 30px 50px; border-top: 1px solid #e4e4e7; background: #ffffff; box-sizing: border-box; }
      </style>
    </head>
    <body>
      <div class="page-container">
        <div class="header">
          <div class="logo-container">
            <img src="https://static.wixstatic.com/media/c12706_95ffde7d7fdf43fcb12e87a36b56eef6~mv2.png" alt="Ask Geo" class="logo-img" />
          </div>
          <div class="report-title">Wealth Projection Blueprint</div>
          <h1 class="main-heading">Systematic Investment<br/>& Allocation Plan</h1>
          <div class="client-info">
            <div class="info-block">
              <p>Prepared For</p>
              <h4>${leadData.name}</h4>
              <h4 style="color: #a1a1aa; font-weight: 400; font-size: 12px; margin-top: 4px;">${leadData.email}</h4>
            </div>
            <div class="info-block" style="text-align: right;">
              <p>Date</p>
              <h4>${today}</h4>
              <h4 style="color: #a1a1aa; font-weight: 400; font-size: 12px; margin-top: 4px;">Ref: AG-SIP-${Math.floor(Math.random() * 10000)}</h4>
            </div>
          </div>
        </div>
        <div class="content">
          <p style="font-size: 14px; color: #52525b; line-height: 1.6; font-weight: 400; margin-bottom: 25px;">
            Based on a monthly investment of <strong>${formatCurrencyLocal(calcData.monthlyInvestment)}</strong> over <strong>${calcData.years} years</strong> at an expected return of <strong>${calcData.expectedReturn}% p.a.</strong>, here is your customized trajectory and live market allocation strategy.
          </p>
          <div class="chart-container">
            <div class="chart-title">Projected Future Value</div>
            <div style="font-size: 48px; font-weight: 300; letter-spacing: -2px; margin-bottom: 15px;">${formatCurrencyLocal(calcData.maturityValue)}</div>
            <svg style="width: 100%; height: 100px; display: block; overflow: visible;" viewBox="0 0 1000 200" preserveAspectRatio="none">
              <path d="M0,200 L1000,100" stroke="#52525b" stroke-width="2" fill="none" />
              <path d="M0,200 Q600,180 1000,0" stroke="#10b981" stroke-width="4" fill="none" />
              <path d="M0,200 Q600,180 1000,0 L1000,200 Z" fill="rgba(16, 185, 129, 0.2)" />
            </svg>
          </div>
          <div class="highlight-grid">
            <div class="metric-card">
              <div class="metric-label">Total Invested Amount</div>
              <div class="metric-value">${formatCurrencyLocal(calcData.totalInvested)}</div>
            </div>
            <div class="metric-card" style="background: #ecfdf5; border-color: #a7f3d0;">
              <div class="metric-label" style="color: #065f46;">Total Wealth Gained</div>
              <div class="metric-value success">+${formatCurrencyLocal(calcData.wealthGained)}</div>
            </div>
          </div>
          <div style="margin-top: 25px;">
            <div style="font-size: 14px; font-weight: 600; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; color: #18181b;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              Live Market Allocation Strategy
            </div>
            <p style="font-size: 11px; color: #71717a; margin-bottom: 12px;">AI-driven recommended deployment for your ₹${calcData.monthlyInvestment.toLocaleString('en-IN')} monthly SIP based on current market valuations.</p>
            <table class="allocation-table">
              <thead><tr><th>Fund Name / AMC</th><th>Category</th><th>Allocation (%)</th><th>Monthly (₹)</th></tr></thead>
              <tbody>
                ${allocation.map(fund => `
                  <tr>
                    <td><strong style="color: #18181b;">${fund.name}</strong></td>
                    <td><span style="background: #f4f4f5; padding: 4px 6px; border-radius: 4px; font-size: 10px;">${fund.category}</span></td>
                    <td><strong>${fund.percent}%</strong></td>
                    <td style="color: #10b981; font-weight: 600;">${formatCurrencyLocal(fund.amount)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
        <div class="footer">
          <p style="font-size: 8px; color: #71717a; text-align: left; margin-bottom: 8px;">Disclaimer: This blueprint is generated by Ask Geo AI Tools for educational and planning purposes only. Mutual Fund investments are subject to market risks. The fund names listed are model recommendations reflecting current market logic and do not constitute formal financial advice.</p>
          <div style="text-align: right; font-size: 11px; font-weight: 600;">Ask Geo Financial Services<br/><span style="color: #71717a; font-weight: 400; font-size: 10px;">www.askgeo.in | +91 99606 24271</span></div>
        </div>
      </div>
      <script>window.onload = function() { setTimeout(() => { window.print(); }, 500); };</script>
    </body>
    </html>
  `;
  printWindow.document.write(htmlContent);
  printWindow.document.close();
};

// --- Lead Capture Modal Component (Specifically for PDF Download) ---
const LeadCaptureModal = ({ isOpen, onClose, onDownloadComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isProcessing, setIsProcessing] = useState(false);
  const otpRefs = [useRef(), useRef(), useRef(), useRef()];

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setFormData({ name: '', phone: '', email: '' });
      setOtp(['', '', '', '']);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(2);
    }, 1000);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp.join('').length < 4) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onDownloadComplete(formData);
    }, 1200);
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value !== '' && index < 3) otpRefs[index + 1].current.focus();
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) otpRefs[index - 1].current.focus();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 text-left">
      <div className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="bg-zinc-950 px-8 py-6 flex justify-between items-center relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none"></div>
           <div>
             <h3 className="text-white text-lg font-medium tracking-tight">Download Report</h3>
             <p className="text-emerald-400 text-[10px] font-medium tracking-widest uppercase mt-1">Free PDF Blueprint</p>
           </div>
           <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
             <X className="w-4 h-4" />
           </button>
        </div>
        <div className="p-8">
          {step === 1 ? (
            <form onSubmit={handleSendOtp} className="space-y-5 animate-in slide-in-from-left-4 duration-300">
              <p className="text-xs text-zinc-500 font-light mb-4">Enter your details to generate your customized wealth projection and market allocation blueprint.</p>
              <div>
                <label className="block text-[10px] font-medium text-zinc-500 uppercase tracking-widest mb-2">Full Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-zinc-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all text-sm text-zinc-900 bg-zinc-50 focus:bg-white" placeholder="e.g. Rajesh Sharma" />
              </div>
              <div>
                <label className="block text-[10px] font-medium text-zinc-500 uppercase tracking-widest mb-2">Phone Number</label>
                <div className="flex">
                  <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-zinc-200 bg-zinc-100 text-zinc-500 text-sm font-medium">+91</span>
                  <input required type="tel" maxLength="10" pattern="[0-9]{10}" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 rounded-r-lg border border-zinc-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all text-sm text-zinc-900 bg-zinc-50 focus:bg-white" placeholder="10-digit mobile number" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-medium text-zinc-500 uppercase tracking-widest mb-2">Email Address</label>
                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-zinc-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all text-sm text-zinc-900 bg-zinc-50 focus:bg-white" placeholder="you@example.com" />
              </div>
              <button type="submit" disabled={isProcessing} className="w-full mt-4 bg-zinc-950 hover:bg-emerald-600 text-white text-sm font-medium py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70">
                {isProcessing ? <span className="flex items-center gap-2"><Activity className="w-4 h-4 animate-spin" /> Verifying...</span> : <>Continue <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              <div className="text-left mb-6">
                <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mb-4 border border-emerald-100">
                  <Lock className="w-5 h-5 text-emerald-600" />
                </div>
                <h4 className="text-lg font-medium text-zinc-900 mb-1">Verify your number</h4>
                <p className="text-xs text-zinc-500 font-light">We've sent a 4-digit security code to <br/><strong className="font-medium">+91 {formData.phone}</strong></p>
              </div>
              <div className="flex justify-start gap-3">
                {otp.map((digit, index) => (
                  <input key={index} ref={otpRefs[index]} type="text" maxLength="1" value={digit} onChange={(e) => handleOtpChange(index, e.target.value)} onKeyDown={(e) => handleOtpKeyDown(index, e)} className="w-12 h-12 text-center text-xl font-medium text-zinc-900 bg-zinc-50 border border-zinc-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all" />
                ))}
              </div>
              <button type="submit" disabled={isProcessing || otp.join('').length < 4} className="w-full mt-6 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-600/20">
                {isProcessing ? <span className="flex items-center gap-2"><Activity className="w-4 h-4 animate-spin" /> Generating PDF...</span> : <>Verify & Download <Download className="w-4 h-4" strokeWidth={2.5} /></>}
              </button>
              <button type="button" onClick={() => setStep(1)} className="w-full text-left text-[10px] font-medium tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors uppercase mt-2">Change Number</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const SipCalculatorWidget = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(25000);
  const [years, setYears] = useState(15);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  const ratePerMonth = expectedReturn / 12 / 100;
  const totalMonths = years * 12;
  const totalInvested = monthlyInvestment * totalMonths;
  const maturityValue = monthlyInvestment * ((Math.pow(1 + ratePerMonth, totalMonths) - 1) / ratePerMonth) * (1 + ratePerMonth);
  const wealthGained = maturityValue - totalInvested;

  const getMarketAllocation = (amount, returnRate) => {
    let distribution = [];
    if (returnRate >= 14) { 
      distribution = [
        { name: 'Nippon India Small Cap Fund', category: 'Small Cap', percent: 40 },
        { name: 'Motilal Oswal Midcap Fund', category: 'Mid Cap', percent: 35 },
        { name: 'Parag Parikh Flexi Cap Fund', category: 'Flexi Cap', percent: 25 },
      ];
    } else if (returnRate >= 10) { 
      distribution = [
        { name: 'HDFC Index Fund Nifty 50 Plan', category: 'Large Cap', percent: 40 },
        { name: 'Parag Parikh Flexi Cap Fund', category: 'Flexi Cap', percent: 40 },
        { name: 'SBI Magnum Midcap Fund', category: 'Mid Cap', percent: 20 },
      ];
    } else { 
      distribution = [
        { name: 'ICICI Prudential Bluechip Fund', category: 'Large Cap', percent: 50 },
        { name: 'Kotak Balanced Advantage Fund', category: 'Hybrid', percent: 30 },
        { name: 'Aditya Birla Sun Life Liquid Fund', category: 'Debt', percent: 20 },
      ];
    }
    return distribution.map(fund => ({ ...fund, amount: Math.round(amount * (fund.percent / 100)) }));
  };

  const currentAllocation = getMarketAllocation(monthlyInvestment, expectedReturn);

  const handleDownloadInitiate = () => setIsLeadModalOpen(true);
  const handleDownloadComplete = (leadData) => {
    setIsLeadModalOpen(false);
    const calcData = { monthlyInvestment, years, expectedReturn, totalInvested, wealthGained, maturityValue };
    generateSipReport(calcData, leadData, currentAllocation);
  };

  return (
    <>
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 animate-in fade-in zoom-in-95 duration-500 text-left">
        <div className="lg:col-span-7 space-y-8">
          <FadeIn delay={100}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-4">
              <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Monthly Investment</label>
              <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-lg border border-zinc-200 w-full sm:w-auto">{formatCurrency(monthlyInvestment)}</div>
            </div>
            <input type="range" min="1000" max="200000" step="1000" value={monthlyInvestment} onChange={(e) => setMonthlyInvestment(Number(e.target.value))} className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
          </FadeIn>
          <FadeIn delay={200}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-4">
              <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Investment Period</label>
              <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-lg border border-zinc-200 w-full sm:w-auto">{years} Years</div>
            </div>
            <input type="range" min="1" max="40" step="1" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
          </FadeIn>
          <FadeIn delay={300}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-4">
              <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Expected Return (p.a)</label>
              <div className="text-xl sm:text-2xl font-light text-emerald-600 bg-emerald-50 px-4 py-2 rounded-lg border border-emerald-100 w-full sm:w-auto">{expectedReturn}%</div>
            </div>
            <input type="range" min="5" max="25" step="0.5" value={expectedReturn} onChange={(e) => setExpectedReturn(Number(e.target.value))} className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
          </FadeIn>

          <FadeIn delay={400}>
             <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-5 mt-6">
               <div className="flex items-center gap-2 mb-3 text-emerald-600">
                  <Bot className="w-4 h-4" />
                  <h4 className="text-xs font-semibold tracking-widest uppercase">Live Market Allocation</h4>
               </div>
               <p className="text-xs text-zinc-600 mb-4">To achieve {expectedReturn}% p.a., Ask Geo AI recommends deploying your {formatCurrency(monthlyInvestment)} across these specific funds:</p>
               <div className="space-y-2">
                  {currentAllocation.map((fund, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs border-b border-zinc-200 pb-2 last:border-0 last:pb-0">
                      <div>
                        <p className="font-medium text-zinc-900">{fund.name}</p>
                        <p className="text-[10px] text-zinc-500">{fund.category} • {fund.percent}%</p>
                      </div>
                      <p className="font-semibold text-emerald-600">{formatCurrency(fund.amount)}/mo</p>
                    </div>
                  ))}
               </div>
             </div>
          </FadeIn>
        </div>

        <div className="lg:col-span-5 relative">
          <FadeIn delay={400} className="bg-zinc-950 text-white p-6 sm:p-8 lg:p-10 rounded-2xl h-full flex flex-col justify-between relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-600/20 to-transparent rounded-full blur-[40px] pointer-events-none"></div>
            
            <div className="space-y-6 relative z-10 mb-8">
              <div>
                <p className="text-[10px] sm:text-xs font-medium tracking-widest text-zinc-400 uppercase mb-1">Total Invested</p>
                <p className="text-xl sm:text-2xl font-light">{formatCurrency(totalInvested)}</p>
              </div>
              <div>
                <p className="text-[10px] sm:text-xs font-medium tracking-widest text-zinc-400 uppercase mb-1">Wealth Gained</p>
                <p className="text-xl sm:text-2xl font-light text-emerald-400">+{formatCurrency(wealthGained)}</p>
              </div>
            </div>
            
            <div className="pt-6 border-t border-zinc-800 relative z-10">
              <p className="text-[10px] sm:text-xs font-bold tracking-widest text-zinc-500 uppercase mb-2">Future Value</p>
              <p className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight leading-none mb-6">{formatCurrency(maturityValue)}</p>
              
              <button onClick={handleDownloadInitiate} className="w-full py-3 text-sm bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-zinc-950 border border-emerald-500/30 rounded-lg font-medium tracking-wide transition-all duration-300 flex items-center justify-center gap-2 group">
                <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                <span>Download Strategy Report</span>
              </button>
            </div>
          </FadeIn>
        </div>
      </div>
      <LeadCaptureModal isOpen={isLeadModalOpen} onClose={() => setIsLeadModalOpen(false)} onDownloadComplete={handleDownloadComplete} />
    </>
  );
};

const StepUpCalculatorWidget = () => {
  const [initialSip, setInitialSip] = useState(20000);
  const [stepUpPercent, setStepUpPercent] = useState(10);
  const [years, setYears] = useState(15);
  const [expectedReturn, setExpectedReturn] = useState(12);

  let currentSip = initialSip;
  let totalInvested = 0;
  let futureValue = 0;
  const monthlyRate = expectedReturn / 12 / 100;

  for (let year = 1; year <= years; year++) {
    for (let month = 1; month <= 12; month++) {
      futureValue = (futureValue + currentSip) * (1 + monthlyRate);
      totalInvested += currentSip;
    }
    currentSip = currentSip * (1 + stepUpPercent / 100);
  }
  const wealthGained = futureValue - totalInvested;

  return (
    <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 animate-in fade-in zoom-in-95 duration-500 text-left">
      <div className="lg:col-span-7 space-y-6 lg:space-y-8">
        <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-xl mb-4">
          <p className="text-xs text-emerald-800 font-medium">Step-Up SIP dramatically compresses your wealth creation timeline by aligning your investments with your annual salary hikes.</p>
        </div>
        <FadeIn delay={100}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
            <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Initial Monthly SIP</label>
            <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-lg border border-zinc-200 w-full sm:w-auto">{formatCurrency(initialSip)}</div>
          </div>
          <input type="range" min="1000" max="200000" step="1000" value={initialSip} onChange={(e) => setInitialSip(Number(e.target.value))} className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
        </FadeIn>
        <FadeIn delay={150}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
            <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Annual Step-Up</label>
            <div className="text-xl sm:text-2xl font-light text-emerald-600 bg-emerald-50 px-4 py-2 rounded-lg border border-emerald-100 w-full sm:w-auto">{stepUpPercent}%</div>
          </div>
          <input type="range" min="1" max="25" step="1" value={stepUpPercent} onChange={(e) => setStepUpPercent(Number(e.target.value))} className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
        </FadeIn>
        <FadeIn delay={200}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
            <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Period (Years)</label>
            <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-lg border border-zinc-200 w-full sm:w-auto">{years} Years</div>
          </div>
          <input type="range" min="1" max="30" step="1" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
        </FadeIn>
        <FadeIn delay={250}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
             <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Expected Return</label>
            <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-lg border border-zinc-200 w-full sm:w-auto">{expectedReturn}%</div>
          </div>
          <input type="range" min="5" max="25" step="0.5" value={expectedReturn} onChange={(e) => setExpectedReturn(Number(e.target.value))} className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
        </FadeIn>
      </div>
      <div className="lg:col-span-5">
        <FadeIn delay={300} className="bg-zinc-950 text-white p-6 sm:p-8 lg:p-10 rounded-2xl h-full flex flex-col justify-between relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-600/20 to-transparent rounded-full blur-[40px] pointer-events-none"></div>
          <div className="space-y-6 relative z-10 mb-8">
            <div>
              <p className="text-[10px] sm:text-xs font-medium tracking-widest text-zinc-400 uppercase mb-1">Total Invested</p>
              <p className="text-xl sm:text-2xl font-light">{formatCurrency(totalInvested)}</p>
            </div>
            <div>
              <p className="text-[10px] sm:text-xs font-medium tracking-widest text-zinc-400 uppercase mb-1">Wealth Gained</p>
              <p className="text-xl sm:text-2xl font-light text-amber-400">+{formatCurrency(wealthGained)}</p>
            </div>
          </div>
          <div className="pt-6 border-t border-zinc-800 relative z-10">
            <p className="text-[10px] sm:text-xs font-bold tracking-widest text-zinc-500 uppercase mb-2">Accelerated Future Value</p>
            <p className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight leading-none">{formatCurrency(futureValue)}</p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

const EmiVsSipCalculatorWidget = () => {
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [tenureYears, setTenureYears] = useState(15);
  const [loanInterest, setLoanInterest] = useState(8.5);
  const [marketReturn, setMarketReturn] = useState(12);

  const ratePerMonth = loanInterest / 12 / 100;
  const totalMonths = tenureYears * 12;
  const emi = loanAmount * ratePerMonth * (Math.pow(1 + ratePerMonth, totalMonths)) / (Math.pow(1 + ratePerMonth, totalMonths) - 1);
  const totalPaidToBank = emi * totalMonths;
  const totalInterestPaid = totalPaidToBank - loanAmount;

  const sipRatePerMonth = marketReturn / 12 / 100;
  const projectedWealth = emi * ((Math.pow(1 + sipRatePerMonth, totalMonths) - 1) / sipRatePerMonth) * (1 + sipRatePerMonth);
  const wealthLost = projectedWealth - totalPaidToBank;

  return (
    <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 animate-in fade-in zoom-in-95 duration-500 text-left">
      <div className="lg:col-span-7 space-y-6 lg:space-y-8">
        <div className="bg-red-50 border border-red-100 p-5 rounded-xl mb-4">
          <p className="text-xs text-red-800 font-medium">The Cost of Debt: See the exact wealth you forfeit when you choose to pay an EMI instead of investing it.</p>
        </div>
        <FadeIn delay={100}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
            <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Loan Amount</label>
            <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-lg border border-zinc-200 w-full sm:w-auto">{formatCurrency(loanAmount)}</div>
          </div>
          <input type="range" min="100000" max="50000000" step="100000" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-red-600" />
        </FadeIn>
        <FadeIn delay={150}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
            <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Loan Tenure</label>
            <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-lg border border-zinc-200 w-full sm:w-auto">{tenureYears} Years</div>
          </div>
          <input type="range" min="1" max="30" step="1" value={tenureYears} onChange={(e) => setTenureYears(Number(e.target.value))} className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-red-600" />
        </FadeIn>
        <FadeIn delay={200}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
            <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Loan Interest Rate</label>
            <div className="text-xl sm:text-2xl font-light text-red-600 bg-red-50 px-4 py-2 rounded-lg border border-red-100 w-full sm:w-auto">{loanInterest}%</div>
          </div>
          <input type="range" min="5" max="20" step="0.1" value={loanInterest} onChange={(e) => setLoanInterest(Number(e.target.value))} className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-red-600" />
        </FadeIn>
        <FadeIn delay={250}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
             <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Potential Market Return</label>
            <div className="text-xl sm:text-2xl font-light text-emerald-600 bg-emerald-50 px-4 py-2 rounded-lg border border-emerald-100 w-full sm:w-auto">{marketReturn}%</div>
          </div>
          <input type="range" min="5" max="25" step="0.5" value={marketReturn} onChange={(e) => setMarketReturn(Number(e.target.value))} className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
        </FadeIn>
      </div>
      <div className="lg:col-span-5">
        <FadeIn delay={300} className="bg-zinc-950 text-white p-6 sm:p-8 lg:p-10 rounded-2xl h-full flex flex-col justify-between relative overflow-hidden shadow-2xl">
          <div className="space-y-6 relative z-10 mb-8">
            <div>
              <p className="text-[10px] sm:text-xs font-medium tracking-widest text-zinc-400 uppercase mb-1">Your Monthly EMI</p>
              <p className="text-2xl sm:text-3xl font-light text-red-400">{formatCurrency(emi)}</p>
            </div>
            <div>
              <p className="text-[10px] sm:text-xs font-medium tracking-widest text-zinc-400 uppercase mb-1">Total Paid to Bank</p>
              <p className="text-xl sm:text-2xl font-light text-zinc-300">{formatCurrency(totalPaidToBank)} <span className="text-[10px] sm:text-xs text-red-400 block sm:inline sm:ml-2">({formatCurrency(totalInterestPaid)} interest)</span></p>
            </div>
          </div>
          <div className="pt-6 border-t border-zinc-800 relative z-10">
            <p className="text-[10px] sm:text-xs font-bold tracking-widest text-zinc-500 uppercase mb-2">If invested in SIP instead:</p>
            <p className="text-3xl sm:text-4xl lg:text-5xl font-light text-emerald-400 tracking-tight leading-none mb-3">{formatCurrency(projectedWealth)}</p>
            <p className="text-xs text-emerald-500/80 font-light bg-emerald-900/30 inline-block px-3 py-1 rounded-md">Opportunity Cost: {formatCurrency(wealthLost)}</p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

const ExtraEmiCalculatorWidget = () => {
  const [loanAmount, setLoanAmount] = useState(13000000);
  const [originalRate, setOriginalRate] = useState(8.75);
  const [originalTenure, setOriginalTenure] = useState(20);
  const [currentRate, setCurrentRate] = useState(7.50);
  const [extraEmisPerYear, setExtraEmisPerYear] = useState(4);
  const [extraEmiAmount, setExtraEmiAmount] = useState(104000);

  const rOrg = originalRate / 12 / 100;
  const nOrg = originalTenure * 12;
  const originalEMI = loanAmount * rOrg * Math.pow(1 + rOrg, nOrg) / (Math.pow(1 + rOrg, nOrg) - 1);
  const totalInterestOrg = (originalEMI * nOrg) - loanAmount;

  const rCur = currentRate / 12 / 100;
  let nRateDrop = 0;
  if (originalEMI > loanAmount * rCur) {
      nRateDrop = Math.log(originalEMI / (originalEMI - loanAmount * rCur)) / Math.log(1 + rCur);
  } else {
      nRateDrop = nOrg; 
  }
  const monthsRateDrop = Math.ceil(nRateDrop);
  const totalInterestRateDrop = (originalEMI * monthsRateDrop) - loanAmount;

  let bal = loanAmount;
  let mPrepay = 0;
  let totPaidPrepay = 0;
  while(bal > 0 && mPrepay < 1200) { 
      mPrepay++;
      let int = bal * rCur;
      let pay = originalEMI;
      if (mPrepay % 12 === 0) pay += (extraEmisPerYear * extraEmiAmount);
      if (pay > bal + int) pay = bal + int;
      bal = bal + int - pay;
      totPaidPrepay += pay;
  }
  const totalInterestPrepay = totPaidPrepay - loanAmount;

  const savedTimeRateDrop = nOrg - monthsRateDrop;
  const savedMoneyRateDrop = totalInterestOrg - totalInterestRateDrop;
  const savedTimePrepay = monthsRateDrop - mPrepay;
  const savedMoneyPrepay = totalInterestRateDrop - totalInterestPrepay;
  const totalSavedTime = nOrg - mPrepay;
  const totalSavedMoney = totalInterestOrg - totalInterestPrepay;

  const formatYM = (totalMonths) => {
      if (totalMonths <= 0) return '0m';
      const y = Math.floor(totalMonths / 12);
      const m = Math.round(totalMonths % 12);
      if (y === 0) return `${m}m`;
      if (m === 0) return `${y}y 0m`;
      return `${y}y ${m}m`;
  };
  const formatShortAmt = (val) => {
      if (val >= 10000000) return `₹${(val/10000000).toFixed(2)} Cr`;
      if (val >= 100000) return `₹${(val/100000).toFixed(2)} L`;
      return formatCurrency(val);
  }
  const safeTime = (val) => val > 0 ? val : 0;
  const safeMoney = (val) => val > 0 ? val : 0;

  return (
    <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 animate-in fade-in zoom-in-95 duration-500 text-left">
      <div className="lg:col-span-7 space-y-6 lg:space-y-8">
        <div className="bg-blue-50 border border-blue-200 p-5 rounded-xl mb-4">
          <p className="text-xs text-blue-900 font-medium">Prepayment Accelerator: See exactly how much time and interest you save by maintaining your original EMI after a rate drop, combined with extra yearly payments.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FadeIn delay={100} className="space-y-3">
              <label className="text-[10px] sm:text-xs font-medium tracking-widest text-zinc-500 uppercase flex justify-between"><span>Loan Amount</span> <span className="text-zinc-900 font-bold">{formatShortAmt(loanAmount)}</span></label>
              <input type="range" min="1000000" max="50000000" step="500000" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
            </FadeIn>
            <FadeIn delay={150} className="space-y-3">
              <label className="text-[10px] sm:text-xs font-medium tracking-widest text-zinc-500 uppercase flex justify-between"><span>Original Tenure</span> <span className="text-zinc-900 font-bold">{originalTenure} Years</span></label>
              <input type="range" min="5" max="30" step="1" value={originalTenure} onChange={(e) => setOriginalTenure(Number(e.target.value))} className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
            </FadeIn>
            <FadeIn delay={200} className="space-y-3">
              <label className="text-[10px] sm:text-xs font-medium tracking-widest text-zinc-500 uppercase flex justify-between"><span>Original Rate</span> <span className="text-zinc-900 font-bold">{originalRate}%</span></label>
              <input type="range" min="6" max="15" step="0.1" value={originalRate} onChange={(e) => setOriginalRate(Number(e.target.value))} className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
            </FadeIn>
            <FadeIn delay={250} className="space-y-3">
              <label className="text-[10px] sm:text-xs font-medium tracking-widest text-zinc-500 uppercase flex justify-between"><span>Current Rate</span> <span className="text-emerald-600 font-bold">{currentRate}%</span></label>
              <input type="range" min="6" max="15" step="0.1" value={currentRate} onChange={(e) => setCurrentRate(Number(e.target.value))} className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
            </FadeIn>
        </div>

        <div className="pt-4 border-t border-zinc-100">
            <FadeIn delay={300} className="mb-6 space-y-3">
              <label className="text-[10px] sm:text-xs font-medium tracking-widest text-zinc-500 uppercase flex justify-between"><span>Extra EMIs per year</span> <span className="text-zinc-900 font-bold">{extraEmisPerYear}</span></label>
              <input type="range" min="0" max="12" step="1" value={extraEmisPerYear} onChange={(e) => setExtraEmisPerYear(Number(e.target.value))} className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
            </FadeIn>
            <FadeIn delay={350} className="space-y-3">
              <label className="text-[10px] sm:text-xs font-medium tracking-widest text-zinc-500 uppercase flex justify-between"><span>Extra EMI amount (₹)</span> <span className="text-zinc-900 font-bold">{formatCurrency(extraEmiAmount)}</span></label>
              <input type="range" min="10000" max="500000" step="10000" value={extraEmiAmount} onChange={(e) => setExtraEmiAmount(Number(e.target.value))} className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
            </FadeIn>
        </div>
      </div>
      
      <div className="lg:col-span-5">
        <FadeIn delay={400} className="bg-zinc-950 text-white p-6 sm:p-8 lg:p-10 rounded-2xl h-full flex flex-col justify-between relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-600/20 to-transparent rounded-full blur-[40px] pointer-events-none"></div>
          
          <div className="space-y-5 relative z-10 mb-6">
            <div className="grid grid-cols-2 gap-3 border-b border-zinc-800 pb-5">
              <div>
                <p className="text-[9px] font-medium tracking-widest text-zinc-400 uppercase mb-0.5">Loan amount</p>
                <p className="text-base font-light">{formatShortAmt(loanAmount)}</p>
              </div>
              <div>
                <p className="text-[9px] font-medium tracking-widest text-zinc-400 uppercase mb-0.5">Monthly EMI</p>
                <p className="text-base font-light">{formatCurrency(originalEMI)}</p>
              </div>
              <div>
                <p className="text-[9px] font-medium tracking-widest text-zinc-400 uppercase mb-0.5">Original Rate</p>
                <p className="text-base font-light">{originalRate}%</p>
              </div>
               <div>
                <p className="text-[9px] font-medium tracking-widest text-zinc-400 uppercase mb-0.5">Current Rate</p>
                <p className="text-base font-light text-emerald-400">{currentRate}%</p>
              </div>
            </div>

            <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
               <p className="text-[10px] font-medium tracking-widest text-zinc-400 uppercase mb-3">Tenure comparison</p>
               <div className="grid grid-cols-3 gap-2">
                  <div>
                     <p className="text-[9px] text-zinc-500 mb-0.5">At {originalRate}% (org)</p>
                     <p className="text-sm font-medium">{formatYM(nOrg)}</p>
                  </div>
                  <div>
                     <p className="text-[9px] text-zinc-500 mb-0.5">At {currentRate}% (same EMI)</p>
                     <p className="text-sm font-medium text-blue-400">{formatYM(monthsRateDrop)}</p>
                  </div>
                  <div>
                     <p className="text-[9px] text-zinc-500 mb-0.5">At {currentRate}% + prepay</p>
                     <p className="text-sm font-medium text-emerald-400">{formatYM(mPrepay)}</p>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-4">
               <div>
                  <p className="text-[8px] font-medium tracking-widest text-zinc-400 uppercase mb-0.5">Saved by rate drop</p>
                  <p className="text-sm font-medium text-blue-400 mb-0.5">{formatYM(safeTime(savedTimeRateDrop))}</p>
                  <p className="text-[9px] text-zinc-500">{formatShortAmt(safeMoney(savedMoneyRateDrop))}</p>
               </div>
               <div>
                  <p className="text-[8px] font-medium tracking-widest text-zinc-400 uppercase mb-0.5">Saved by prepay</p>
                  <p className="text-sm font-medium text-emerald-400 mb-0.5">{formatYM(safeTime(savedTimePrepay))}</p>
                  <p className="text-[9px] text-zinc-500">{formatShortAmt(safeMoney(savedMoneyPrepay))}</p>
               </div>
               <div className="border-l border-zinc-800 pl-2">
                  <p className="text-[8px] font-medium tracking-widest text-zinc-400 uppercase mb-0.5">Total saved</p>
                  <p className="text-sm font-medium text-white mb-0.5">{formatYM(safeTime(totalSavedTime))}</p>
                  <p className="text-[9px] text-emerald-500 bg-emerald-900/30 rounded-md inline-block px-1.5 py-0.5">{formatShortAmt(safeMoney(totalSavedMoney))}</p>
               </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

const SmartEmiCalculatorWidget = () => {
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [tenureYears, setTenureYears] = useState(20);
  const [loanInterest, setLoanInterest] = useState(8.5);
  const [sipReturn, setSipReturn] = useState(12);

  const r = loanInterest / 12 / 100;
  const n = tenureYears * 12;
  const emi = loanAmount * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
  const totalPaidToBank = emi * n;
  const totalInterestPaid = totalPaidToBank - loanAmount;

  const i = sipReturn / 12 / 100;
  const sipFactor = ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
  const requiredSip = totalInterestPaid / sipFactor;
  const sipPercentageOfEmi = ((requiredSip / emi) * 100).toFixed(1);

  return (
    <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 animate-in fade-in zoom-in-95 duration-500 text-left">
      <div className="lg:col-span-7 space-y-6 lg:space-y-8">
        <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-xl mb-4">
          <p className="text-xs text-emerald-900 font-medium">The Magical Math: Start a fractional parallel SIP alongside your EMI. By the end of your loan tenure, your SIP corpus will recover <strong className="font-bold">100% of the interest</strong> you paid to the bank.</p>
        </div>
        <FadeIn delay={100}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
            <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Loan Amount</label>
            <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-lg border border-zinc-200 w-full sm:w-auto">{formatCurrency(loanAmount)}</div>
          </div>
          <input type="range" min="500000" max="50000000" step="100000" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
        </FadeIn>
        <FadeIn delay={150}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
            <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Loan Tenure</label>
            <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-lg border border-zinc-200 w-full sm:w-auto">{tenureYears} Years</div>
          </div>
          <input type="range" min="5" max="30" step="1" value={tenureYears} onChange={(e) => setTenureYears(Number(e.target.value))} className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
        </FadeIn>
        <FadeIn delay={200}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
            <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Home Loan Interest</label>
            <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-lg border border-zinc-200 w-full sm:w-auto">{loanInterest}%</div>
          </div>
          <input type="range" min="6" max="15" step="0.1" value={loanInterest} onChange={(e) => setLoanInterest(Number(e.target.value))} className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
        </FadeIn>
        <FadeIn delay={250}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
             <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Expected SIP Return</label>
            <div className="text-xl sm:text-2xl font-light text-emerald-600 bg-emerald-50 px-4 py-2 rounded-lg border border-emerald-200 w-full sm:w-auto">{sipReturn}%</div>
          </div>
          <input type="range" min="8" max="25" step="0.5" value={sipReturn} onChange={(e) => setSipReturn(Number(e.target.value))} className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
        </FadeIn>
      </div>
      <div className="lg:col-span-5">
        <FadeIn delay={300} className="bg-zinc-950 text-white p-6 sm:p-8 lg:p-10 rounded-2xl h-full flex flex-col justify-between relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-600/30 to-transparent rounded-full blur-[60px] pointer-events-none"></div>
          
          <div className="space-y-5 relative z-10 mb-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end border-b border-zinc-800 pb-3 gap-1">
              <p className="text-[10px] sm:text-xs font-medium tracking-widest text-zinc-400 uppercase">Your EMI</p>
              <p className="text-xl font-light text-white">{formatCurrency(emi)}</p>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end border-b border-zinc-800 pb-3 gap-1">
              <p className="text-[10px] sm:text-xs font-medium tracking-widest text-zinc-400 uppercase">Total Interest Paid</p>
              <p className="text-xl font-light text-red-400">{formatCurrency(totalInterestPaid)}</p>
            </div>
          </div>

          <div className="pt-6 relative z-10">
            <p className="text-[10px] sm:text-xs font-bold tracking-widest text-emerald-400 uppercase mb-4">Required Monthly SIP to recover 100% of interest</p>
            <p className="text-5xl sm:text-6xl md:text-7xl font-light text-white tracking-tight leading-none mb-6">{formatCurrency(requiredSip)}</p>
            <div className="inline-flex items-center gap-2 bg-emerald-900/40 border border-emerald-500/30 text-emerald-300 text-sm font-medium px-4 py-2 rounded-full">
              <Sparkles className="w-4 h-4" /> That's just {sipPercentageOfEmi}% of your EMI amount!
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

const EarlyClosureWidget = () => {
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [originalTenure, setOriginalTenure] = useState(20);
  const [targetTenure, setTargetTenure] = useState(10);
  const [loanInterest, setLoanInterest] = useState(8.5);
  const [sipReturn, setSipReturn] = useState(12);

  useEffect(() => {
    if (targetTenure >= originalTenure) {
      setTargetTenure(originalTenure - 1 || 1);
    }
  }, [originalTenure, targetTenure]);

  const r = loanInterest / 12 / 100;
  const n = originalTenure * 12;
  const emi = loanAmount * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);

  const t = targetTenure * 12;
  const outstandingPrincipal = loanAmount * (Math.pow(1 + r, n) - Math.pow(1 + r, t)) / (Math.pow(1 + r, n) - 1);

  const i = sipReturn / 12 / 100;
  const sipFactor = ((Math.pow(1 + i, t) - 1) / i) * (1 + i);
  const requiredSip = outstandingPrincipal / sipFactor;

  const originalTotalOutflow = emi * n;
  const newTotalOutflow = (emi * t) + (requiredSip * t);
  const totalSavings = originalTotalOutflow - newTotalOutflow;
  const yearsSaved = originalTenure - targetTenure;

  return (
    <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 animate-in fade-in zoom-in-95 duration-500 text-left">
      <div className="lg:col-span-7 space-y-6 lg:space-y-8">
        <div className="bg-indigo-50 border border-indigo-200 p-5 rounded-xl mb-4">
          <p className="text-xs text-indigo-900 font-medium">The Debt Destroyer: Calculate the exact parallel SIP required to build a corpus large enough to foreclose your home loan years ahead of schedule.</p>
        </div>
        <FadeIn delay={100}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
            <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Loan Amount</label>
            <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-lg border border-zinc-200 w-full sm:w-auto">{formatCurrency(loanAmount)}</div>
          </div>
          <input type="range" min="500000" max="50000000" step="100000" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
        </FadeIn>
        <FadeIn delay={150}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
            <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Original Loan Tenure</label>
            <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-lg border border-zinc-200 w-full sm:w-auto">{originalTenure} Years</div>
          </div>
          <input type="range" min="5" max="30" step="1" value={originalTenure} onChange={(e) => setOriginalTenure(Number(e.target.value))} className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
        </FadeIn>
        <FadeIn delay={200}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
            <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Target Closure Time</label>
            <div className="text-xl sm:text-2xl font-light text-indigo-600 bg-indigo-50 px-4 py-2 rounded-lg border border-indigo-200 w-full sm:w-auto">{targetTenure} Years</div>
          </div>
          <input type="range" min="1" max={originalTenure - 1} step="1" value={targetTenure} onChange={(e) => setTargetTenure(Number(e.target.value))} className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
        </FadeIn>
        <FadeIn delay={250}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
            <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Loan Interest Rate</label>
            <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-lg border border-zinc-200 w-full sm:w-auto">{loanInterest}%</div>
          </div>
          <input type="range" min="6" max="15" step="0.1" value={loanInterest} onChange={(e) => setLoanInterest(Number(e.target.value))} className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
        </FadeIn>
        <FadeIn delay={300}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
             <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Expected SIP Return</label>
            <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-lg border border-zinc-200 w-full sm:w-auto">{sipReturn}%</div>
          </div>
          <input type="range" min="8" max="25" step="0.5" value={sipReturn} onChange={(e) => setSipReturn(Number(e.target.value))} className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
        </FadeIn>
      </div>
      <div className="lg:col-span-5">
        <FadeIn delay={350} className="bg-zinc-950 text-white p-6 sm:p-8 lg:p-10 rounded-2xl h-full flex flex-col justify-between relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-600/30 to-transparent rounded-full blur-[60px] pointer-events-none"></div>
          
          <div className="space-y-5 relative z-10 mb-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end border-b border-zinc-800 pb-3 gap-1">
              <p className="text-[10px] sm:text-xs font-medium tracking-widest text-zinc-400 uppercase">Your Regular EMI</p>
              <p className="text-xl font-light text-white">{formatCurrency(emi)}</p>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end border-b border-zinc-800 pb-3 gap-1">
              <div>
                 <p className="text-[10px] sm:text-xs font-medium tracking-widest text-zinc-400 uppercase">Loan Balance at Year {targetTenure}</p>
                 <p className="text-[9px] text-zinc-500 mt-0.5">Corpus needed to foreclose</p>
              </div>
              <p className="text-xl font-light text-red-400">{formatCurrency(outstandingPrincipal)}</p>
            </div>
          </div>

          <div className="pt-4 relative z-10">
            <p className="text-[10px] sm:text-xs font-bold tracking-widest text-indigo-400 uppercase mb-2">Required Monthly SIP to close early</p>
            <p className="text-5xl sm:text-6xl md:text-7xl font-light text-white tracking-tight leading-none mb-6">{formatCurrency(requiredSip)}</p>
            
            <div className="flex flex-col gap-2">
              <div className="inline-flex items-center gap-2 bg-indigo-900/40 border border-indigo-500/30 text-indigo-300 text-[10px] sm:text-xs font-medium px-3 py-1.5 rounded-md w-fit">
                <Activity className="w-3 h-3 shrink-0" /> Save {yearsSaved} years of EMIs
              </div>
              <div className="inline-flex items-center gap-2 bg-emerald-900/40 border border-emerald-500/30 text-emerald-300 text-[10px] sm:text-xs font-medium px-3 py-1.5 rounded-md w-fit">
                <Check className="w-3 h-3 shrink-0" /> Wealth Saved: {formatCurrency(totalSavings)}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

const FireCalculatorWidget = () => {
  const [monthlyExpenses, setMonthlyExpenses] = useState(80000);
  const [yearsToRetire, setYearsToRetire] = useState(15);
  const [inflation, setInflation] = useState(6);

  const currentAnnualExp = monthlyExpenses * 12;
  const futureAnnualExp = currentAnnualExp * Math.pow(1 + inflation / 100, yearsToRetire);
  const requiredCorpus = futureAnnualExp * 30; 

  return (
    <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 animate-in fade-in zoom-in-95 duration-500 text-left">
      <div className="lg:col-span-7 space-y-6 lg:space-y-8">
        <div className="bg-blue-50 border border-blue-100 p-5 rounded-xl mb-4">
          <p className="text-xs text-blue-800 font-medium">Financial Independence, Retire Early. Calculate the exact corpus required to stop working and live purely off your portfolio yields.</p>
        </div>
        <FadeIn delay={100}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
            <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Current Monthly Expenses</label>
            <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-lg border border-zinc-200 w-full sm:w-auto">{formatCurrency(monthlyExpenses)}</div>
          </div>
          <input type="range" min="20000" max="500000" step="5000" value={monthlyExpenses} onChange={(e) => setMonthlyExpenses(Number(e.target.value))} className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
        </FadeIn>
        <FadeIn delay={200}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
            <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Years to Retirement</label>
            <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-lg border border-zinc-200 w-full sm:w-auto">{yearsToRetire} Years</div>
          </div>
          <input type="range" min="1" max="40" step="1" value={yearsToRetire} onChange={(e) => setYearsToRetire(Number(e.target.value))} className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
        </FadeIn>
        <FadeIn delay={300}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
            <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Expected Inflation</label>
            <div className="text-xl sm:text-2xl font-light text-blue-600 bg-blue-50 px-4 py-2 rounded-lg border border-blue-100 w-full sm:w-auto">{inflation}%</div>
          </div>
          <input type="range" min="3" max="12" step="0.5" value={inflation} onChange={(e) => setInflation(Number(e.target.value))} className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
        </FadeIn>
      </div>
      <div className="lg:col-span-5">
        <FadeIn delay={400} className="bg-zinc-950 text-white p-6 sm:p-8 lg:p-10 rounded-2xl h-full flex flex-col justify-between relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-600/20 to-transparent rounded-full blur-[60px] pointer-events-none"></div>
          <div className="space-y-6 relative z-10 mb-8">
            <div>
              <p className="text-[10px] sm:text-xs font-medium tracking-widest text-zinc-400 uppercase mb-1">Projected Future Monthly Expense</p>
              <p className="text-2xl sm:text-3xl font-light text-zinc-300">{formatCurrency(futureAnnualExp / 12)}</p>
              <p className="text-[10px] text-zinc-500 mt-0.5">Adjusted for {inflation}% inflation</p>
            </div>
          </div>
          <div className="pt-6 border-t border-zinc-800 relative z-10">
            <p className="text-[10px] sm:text-xs font-bold tracking-widest text-blue-400 uppercase mb-2">Target F.I.R.E. Corpus</p>
            <p className="text-4xl sm:text-5xl md:text-6xl font-light text-white tracking-tight leading-none mb-8">{formatCurrency(requiredCorpus)}</p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

const LumpsumCalculatorWidget = () => {
  const [lumpsum, setLumpsum] = useState(1000000);
  const [years, setYears] = useState(10);
  const [expectedReturn, setExpectedReturn] = useState(12);

  const maturityValue = lumpsum * Math.pow(1 + expectedReturn / 100, years);
  const wealthGained = maturityValue - lumpsum;

  return (
    <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 animate-in fade-in zoom-in-95 duration-500 text-left">
      <div className="lg:col-span-7 space-y-6 lg:space-y-8">
        <FadeIn delay={100}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
            <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">One-time Investment</label>
            <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-lg border border-zinc-200 w-full sm:w-auto">{formatCurrency(lumpsum)}</div>
          </div>
          <input type="range" min="10000" max="50000000" step="10000" value={lumpsum} onChange={(e) => setLumpsum(Number(e.target.value))} className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
        </FadeIn>
        <FadeIn delay={200}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
            <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Investment Period</label>
            <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-lg border border-zinc-200 w-full sm:w-auto">{years} Years</div>
          </div>
          <input type="range" min="1" max="40" step="1" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
        </FadeIn>
        <FadeIn delay={300}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
            <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Expected Return (p.a)</label>
            <div className="text-xl sm:text-2xl font-light text-emerald-600 bg-emerald-50 px-4 py-2 rounded-lg border border-emerald-100 w-full sm:w-auto">{expectedReturn}%</div>
          </div>
          <input type="range" min="5" max="25" step="0.5" value={expectedReturn} onChange={(e) => setExpectedReturn(Number(e.target.value))} className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
        </FadeIn>
      </div>
      <div className="lg:col-span-5">
        <FadeIn delay={400} className="bg-zinc-950 text-white p-6 sm:p-8 lg:p-10 rounded-2xl h-full flex flex-col justify-between relative overflow-hidden shadow-2xl">
           <div className="space-y-6 relative z-10 mb-8">
            <div>
              <p className="text-[10px] sm:text-xs font-medium tracking-widest text-zinc-400 uppercase mb-1">Total Invested</p>
              <p className="text-xl sm:text-2xl font-light">{formatCurrency(lumpsum)}</p>
            </div>
            <div>
              <p className="text-[10px] sm:text-xs font-medium tracking-widest text-zinc-400 uppercase mb-1">Wealth Gained</p>
              <p className="text-xl sm:text-2xl font-light text-emerald-400">+{formatCurrency(wealthGained)}</p>
            </div>
          </div>
          <div className="pt-6 border-t border-zinc-800 relative z-10">
            <p className="text-[10px] sm:text-xs font-bold tracking-widest text-zinc-500 uppercase mb-2">Future Value</p>
            <p className="text-4xl sm:text-5xl md:text-6xl font-light text-white tracking-tight leading-none">{formatCurrency(maturityValue)}</p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

const GoalCalculatorWidget = () => {
  const [targetAmount, setTargetAmount] = useState(10000000);
  const [years, setYears] = useState(10);
  const [expectedReturn, setExpectedReturn] = useState(12);

  const ratePerMonth = expectedReturn / 12 / 100;
  const totalMonths = years * 12;
  const requiredSip = targetAmount / (((Math.pow(1 + ratePerMonth, totalMonths) - 1) / ratePerMonth) * (1 + ratePerMonth));

  return (
    <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 animate-in fade-in zoom-in-95 duration-500 text-left">
      <div className="lg:col-span-7 space-y-6 lg:space-y-8">
        <FadeIn delay={100}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
            <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Target Goal Amount</label>
            <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-lg border border-zinc-200 w-full sm:w-auto">{formatCurrency(targetAmount)}</div>
          </div>
          <input type="range" min="100000" max="100000000" step="100000" value={targetAmount} onChange={(e) => setTargetAmount(Number(e.target.value))} className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
        </FadeIn>
        <FadeIn delay={200}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
            <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Time to Goal</label>
            <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-lg border border-zinc-200 w-full sm:w-auto">{years} Years</div>
          </div>
          <input type="range" min="1" max="40" step="1" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
        </FadeIn>
        <FadeIn delay={300}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
            <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Expected Return (p.a)</label>
            <div className="text-xl sm:text-2xl font-light text-indigo-600 bg-indigo-50 px-4 py-2 rounded-lg border border-indigo-100 w-full sm:w-auto">{expectedReturn}%</div>
          </div>
          <input type="range" min="5" max="25" step="0.5" value={expectedReturn} onChange={(e) => setExpectedReturn(Number(e.target.value))} className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
        </FadeIn>
      </div>
      <div className="lg:col-span-5">
        <FadeIn delay={400} className="bg-zinc-950 text-white p-6 sm:p-8 lg:p-10 rounded-2xl h-full flex flex-col justify-between relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-600/20 to-transparent rounded-full blur-[60px] pointer-events-none"></div>
          <div className="space-y-6 relative z-10 mb-8">
            <div>
              <p className="text-[10px] sm:text-xs font-medium tracking-widest text-zinc-400 uppercase mb-1">To reach your goal of</p>
              <p className="text-xl sm:text-2xl font-light text-zinc-300">{formatCurrency(targetAmount)}</p>
            </div>
          </div>
          <div className="pt-6 border-t border-zinc-800 relative z-10">
            <p className="text-[10px] sm:text-xs font-bold tracking-widest text-indigo-400 uppercase mb-2">Required Monthly SIP</p>
            <p className="text-4xl sm:text-5xl md:text-6xl font-light text-white tracking-tight leading-none">{formatCurrency(requiredSip)}</p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

const AIAssistantWidget = ({ openContactModal }) => {
  const [queryState, setQueryState] = useState('idle'); 
  const [selectedGoal, setSelectedGoal] = useState(null);

  const goals = [
    { id: 'retire', label: 'Early Retirement', icon: Map },
    { id: 'wealth', label: 'Wealth Multiplication', icon: TrendingUp },
    { id: 'tax', label: 'Tax Optimization', icon: ShieldCheck },
  ];

  const handleGoalSelect = (goal) => {
    setSelectedGoal(goal);
    setQueryState('analyzing');
    setTimeout(() => setQueryState('result'), 1800);
  };

  return (
    <div className="bg-white rounded-3xl border border-zinc-100 p-8 md:p-10 shadow-2xl shadow-zinc-200/50 max-w-4xl transition-all duration-500 text-left">
      <div className="flex items-center justify-between mb-8 border-b border-zinc-100 pb-6">
        <div>
          <h3 className="text-2xl font-light tracking-tight mb-1">Select an Objective</h3>
          <p className="text-zinc-500 text-sm font-light">Let AI draft a baseline strategy for you instantly.</p>
        </div>
        {queryState !== 'idle' && (
          <button onClick={() => setQueryState('idle')} className="text-[10px] font-medium tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors px-3 py-1.5 border border-zinc-200 rounded-md">
            RESET
          </button>
        )}
      </div>

      <div className="min-h-[200px] flex flex-col justify-center">
        {queryState === 'idle' && (
          <div className="grid md:grid-cols-3 gap-4">
            {goals.map((goal, idx) => (
              <button 
                key={goal.id}
                onClick={() => handleGoalSelect(goal)}
                className="group relative text-left p-6 rounded-2xl border border-zinc-200 hover:border-zinc-900 bg-white hover:shadow-xl hover:shadow-zinc-200/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-zinc-50 rounded-full blur-2xl -z-10 group-hover:bg-emerald-50 transition-colors"></div>
                <goal.icon className="text-zinc-400 w-6 h-6 mb-4 group-hover:text-zinc-900 group-hover:scale-110 transition-all duration-300" strokeWidth={1.5} />
                <h4 className="font-normal text-base text-zinc-900">{goal.label}</h4>
              </button>
            ))}
          </div>
        )}

        {queryState === 'analyzing' && (
          <div className="flex flex-col items-center justify-center space-y-4 opacity-100 transition-opacity duration-500">
            <div className="relative w-12 h-12 flex items-center justify-center">
               <div className="absolute inset-0 border-2 border-zinc-100 rounded-full"></div>
               <div className="absolute inset-0 border-2 border-emerald-500 rounded-full border-t-transparent animate-spin"></div>
               <Sparkles className="w-4 h-4 text-emerald-500" strokeWidth={1.5} />
            </div>
            <p className="text-zinc-500 font-medium tracking-widest text-[10px] uppercase animate-pulse">Running AI Models...</p>
          </div>
        )}

        {queryState === 'result' && selectedGoal && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            <div className="flex flex-col sm:flex-row items-start gap-5">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <Check className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-lg font-normal mb-2">{selectedGoal.label} Strategy</h4>
                <p className="text-sm text-zinc-600 font-light leading-relaxed mb-6 max-w-2xl">
                  {selectedGoal.id === 'retire' && "To achieve early retirement, our AI model suggests shifting 60% to high-yield Equity Mutual Funds and 40% in stable Debt Funds. We recommend starting an aggressive SIP to match the 12% historic XIRR benchmark."}
                  {selectedGoal.id === 'wealth' && "For aggressive wealth multiplication, consider our Direct Equity & ETF portfolio management. Historical data indicates a diversified tech & infra portfolio outpaces inflation by 8%. Let Ask Geo map this out."}
                  {selectedGoal.id === 'tax' && "Tax optimization requires utilizing ELSS (Equity Linked Savings Scheme) under Section 80C, which not only saves tax but historically provides superior equity returns compared to traditional PPF."}
                </p>
                <button 
                  onClick={() => openContactModal('Consult on AI Strategy')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900 text-white text-sm font-medium rounded-lg hover:bg-emerald-600 transition-colors shadow-md shadow-zinc-200"
                >
                  Consult on this plan <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


// --- ABOUT PAGE COMPONENT ---
const AboutPage = ({ setCurrentPage, openContactModal }) => {
  return (
    <div className="pt-32 pb-10 animate-in fade-in duration-700 text-left">
      <section className="px-6 sm:px-10 lg:px-16 xl:px-24 w-full max-w-[1800px] mx-auto py-16">
        <FadeIn>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tighter text-zinc-950 mb-6 leading-[1.05]">
            Driven by data. <br />
            <span className="font-medium text-emerald-600">Defined by trust.</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-zinc-500 font-light max-w-3xl leading-relaxed mb-8">
            Ask Geo was founded on a singular vision: to bring institutional-grade financial strategies to individual investors with absolute transparency.
          </p>
        </FadeIn>
      </section>

      <section className="px-6 sm:px-10 lg:px-16 xl:px-24 w-full max-w-[1800px] mx-auto py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeIn>
            <div className="aspect-square sm:aspect-[4/3] lg:aspect-square bg-zinc-50 rounded-3xl p-8 sm:p-10 flex flex-col justify-end relative overflow-hidden group border border-zinc-100">
              <div className="absolute inset-0 bg-gradient-to-tr from-zinc-200 to-zinc-50 group-hover:scale-105 transition-transform duration-700"></div>
              <Quote className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-600/20 relative z-10 mb-6" strokeWidth={1}/>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light relative z-10 text-zinc-900 leading-tight">"Wealth creation shouldn't be a black box. Our goal is absolute clarity."</h3>
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tighter mb-6">Our Genesis</h2>
            <p className="text-sm sm:text-base lg:text-lg text-zinc-500 font-light leading-relaxed mb-5">
              For years, the financial advisory industry has thrived on complexity, jargon, and hidden fees. Ask Geo was created to dismantle that complexity. 
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-zinc-500 font-light leading-relaxed mb-8">
              We realized that true financial freedom comes when clients deeply understand their portfolios. By combining advanced AI analytics with human empathy, we've built a platform where your goals are the only metrics that matter. We don't just manage money; we educate, empower, and elevate our investors.
            </p>
            <div className="flex gap-8 sm:gap-12 border-t border-zinc-100 pt-6">
               <div>
                 <p className="text-2xl sm:text-3xl font-medium text-zinc-900 mb-1">2015</p>
                 <p className="text-[10px] sm:text-xs text-zinc-400 tracking-widest uppercase">Established</p>
               </div>
               <div>
                 <p className="text-2xl sm:text-3xl font-medium text-zinc-900 mb-1">Pune</p>
                 <p className="text-[10px] sm:text-xs text-zinc-400 tracking-widest uppercase">Headquarters</p>
               </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="bg-zinc-950 text-white py-24 px-6 sm:px-10 lg:px-16 xl:px-24 my-16">
        <div className="w-full max-w-[1800px] mx-auto">
          <FadeIn className="mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tighter mb-4">The Ask Geo Pillars</h2>
            <p className="text-base sm:text-lg text-zinc-400 font-light max-w-2xl">The non-negotiable principles that guide every portfolio decision we make.</p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { title: "Radical Transparency", desc: "No hidden loads, no opaque commissions. You see exactly what we see." },
              { title: "Data-Backed", desc: "Emotions destroy wealth. We rely on quantitative models and AI insights." },
              { title: "Fiduciary Duty", desc: "Your interests always precede ours. We grow only when your portfolio grows." },
              { title: "Holistic Planning", desc: "We look beyond mere returns, focusing on taxation, risk, and succession." }
            ].map((item, idx) => (
              <FadeIn key={idx} delay={idx * 100} direction="up" className="bg-zinc-900 border border-zinc-800 p-6 sm:p-8 rounded-2xl hover:border-emerald-500/30 transition-colors">
                <div className="text-emerald-500 font-mono text-xs sm:text-sm mb-4">0{idx + 1}</div>
                <h4 className="text-lg sm:text-xl font-medium mb-3">{item.title}</h4>
                <p className="text-zinc-400 font-light text-sm leading-relaxed">{item.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 sm:px-10 lg:px-16 xl:px-24 w-full max-w-[1800px] mx-auto py-16">
         <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            <FadeIn className="lg:w-1/3">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tighter mb-6">Leadership</h2>
              <div className="aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] bg-zinc-100 rounded-3xl relative overflow-hidden group">
                 <img src="https://static.wixstatic.com/media/548938_3bb01f88ba6541a195f21b0b543cd613~mv2.png" alt="Geo Thomas" className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                 <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/20 to-transparent"></div>
                 <div className="absolute bottom-6 left-6 right-6 z-10">
                    <h3 className="text-xl sm:text-2xl font-medium text-white">Geo Thomas</h3>
                    <p className="text-emerald-400 text-[10px] sm:text-xs font-medium tracking-widest uppercase mt-1">Founder & Chief Advisor</p>
                 </div>
              </div>
            </FadeIn>
            <FadeIn delay={200} className="lg:w-2/3 flex flex-col justify-center">
              <Quote className="w-10 h-10 text-zinc-200 mb-6" strokeWidth={1} />
              <p className="text-xl sm:text-2xl lg:text-3xl font-light leading-relaxed text-zinc-800 mb-6">
                "I started Ask Geo because I saw a massive gap between what institutions were doing to grow wealth and what retail investors were being sold. I wanted to level the playing field."
              </p>
              <p className="text-sm sm:text-base lg:text-lg font-light text-zinc-500 leading-relaxed mb-4">
                Geo brings over 15 years of deep market experience, holding AMFI certifications and a profound understanding of macroeconomic cycles. His approach combines rigorous mathematical modeling with a deep understanding of human behavioral finance.
              </p>
              <p className="text-sm sm:text-base lg:text-lg font-light text-zinc-500 leading-relaxed">
                Under his leadership, Ask Geo has grown to manage over 133K Crore in AUM, maintaining an impressive historic XIRR benchmark by staying disciplined, avoiding market noise, and focusing strictly on compounding.
              </p>
            </FadeIn>
         </div>
      </section>
    </div>
  );
};

// --- SERVICES PAGE COMPONENT ---
const ServicesPage = ({ setCurrentPage, openContactModal }) => {
  return (
    <div className="pt-32 pb-10 animate-in fade-in duration-700 text-left">
      <section className="px-6 sm:px-10 lg:px-16 xl:px-24 w-full max-w-[1800px] mx-auto py-16">
        <FadeIn>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tighter text-zinc-950 mb-6 leading-[1.05]">
            Comprehensive <br />
            <span className="font-medium text-emerald-600">Financial Architecture.</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-zinc-500 font-light max-w-3xl leading-relaxed mb-8">
            We don't just pick funds. We build robust, tax-efficient, and inflation-beating systems tailored to your exact life stage.
          </p>
        </FadeIn>
      </section>

      <section className="px-6 sm:px-10 lg:px-16 xl:px-24 w-full max-w-[1800px] mx-auto py-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <FadeIn className="order-2 lg:order-1">
            <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center mb-6">
              <Briefcase className="w-6 h-6 text-zinc-900" strokeWidth={1.5} />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tighter mb-4">Wealth Management</h2>
            <p className="text-sm sm:text-base lg:text-lg text-zinc-500 font-light leading-relaxed mb-6">
              Our core offering. We look at your entire financial landscape—assets, liabilities, cash flow, and goals—to engineer a comprehensive strategy that preserves capital while seeking aggressive growth where appropriate.
            </p>
            <ul className="space-y-3 mb-8">
              {['Goal-based SIP structuring', 'Lumpsum deployment strategies', 'Asset allocation modeling', 'Retirement corpus planning'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-zinc-700 font-light text-sm sm:text-base"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> {item}</li>
              ))}
            </ul>
            <button onClick={() => openContactModal('Wealth Management')} className="text-xs font-medium tracking-widest text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-2 group">
              REQUEST DETAILED STRATEGY <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
            </button>
          </FadeIn>
          <FadeIn delay={200} className="order-1 lg:order-2">
            <div className="aspect-[4/3] bg-zinc-50 rounded-3xl border border-zinc-100 relative overflow-hidden">
               <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-100/50 to-transparent"></div>
               <PieChart className="absolute -bottom-10 -right-10 w-64 h-64 text-zinc-200" strokeWidth={0.5} />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="px-6 sm:px-10 lg:px-16 xl:px-24 w-full max-w-[1800px] mx-auto py-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <FadeIn>
            <div className="aspect-[4/3] bg-zinc-950 rounded-3xl border border-zinc-800 relative overflow-hidden">
               <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-emerald-900/30 to-transparent"></div>
               <TrendingUp className="absolute -top-10 -left-10 w-64 h-64 text-zinc-800" strokeWidth={0.5} />
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center mb-6">
              <Activity className="w-6 h-6 text-zinc-900" strokeWidth={1.5} />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tighter mb-4">Portfolio Management</h2>
            <p className="text-sm sm:text-base lg:text-lg text-zinc-500 font-light leading-relaxed mb-6">
              For High Net Worth Individuals (HNIs) requiring active oversight. We utilize our AI Insight Engine alongside macro-economic research to actively rebalance and optimize your exposure to Equity, Debt, and Alternative assets.
            </p>
            <ul className="space-y-3 mb-8">
              {['Active ETF & Direct Equity advisory', 'Dynamic debt fund rotation', 'Quarterly rebalancing', 'Tax-loss harvesting'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-zinc-700 font-light text-sm sm:text-base"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> {item}</li>
              ))}
            </ul>
            <button onClick={() => openContactModal('Portfolio Management')} className="text-xs font-medium tracking-widest text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-2 group">
              EXPLORE PMS CAPABILITIES <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
            </button>
          </FadeIn>
        </div>
      </section>

      <section className="bg-zinc-50 py-24 px-6 sm:px-10 lg:px-16 xl:px-24 my-16 border-y border-zinc-100">
        <div className="w-full max-w-[1800px] mx-auto">
          <FadeIn className="mb-16 max-w-3xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tighter mb-4">Our Onboarding Protocol</h2>
            <p className="text-sm sm:text-base lg:text-lg text-zinc-500 font-light leading-relaxed">A systematic, friction-free process designed to transition you into a fully optimized portfolio within weeks.</p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
             <div className="hidden lg:block absolute top-10 left-0 w-full h-px bg-zinc-200 z-0"></div>
             {[
               { step: "01", title: "Discovery", desc: "A deep dive into your current assets, liabilities, and aspirations." },
               { step: "02", title: "Audit", desc: "Our AI Engine analyzes your existing portfolio for inefficiencies and hidden risks." },
               { step: "03", title: "Architecture", desc: "We present a mathematical, newly structured portfolio blueprint." },
               { step: "04", title: "Execution", desc: "Seamless deployment and the start of 24/7 active monitoring." }
             ].map((item, i) => (
               <FadeIn key={i} delay={i * 100} direction="up" className="relative z-10 bg-white p-6 rounded-2xl border border-zinc-100 shadow-xl shadow-zinc-200/20">
                 <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-medium mb-5">{item.step}</div>
                 <h4 className="text-lg font-medium mb-2">{item.title}</h4>
                 <p className="text-zinc-500 font-light text-sm leading-relaxed">{item.desc}</p>
               </FadeIn>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// --- CALCULATORS PAGE COMPONENT ---
const CalculatorsPage = ({ setCurrentPage, openContactModal }) => {
  const [activeTab, setActiveTab] = useState('sip');

  const tabs = [
    { id: 'sip', name: 'SIP Pro', icon: TrendingUp },
    { id: 'stepup', name: 'Step-Up SIP', icon: Zap },
    { id: 'lumpsum', name: 'Lumpsum', icon: Briefcase },
    { id: 'emivssip', name: 'EMI vs SIP', icon: PieChart },
    { id: 'prepayment', name: 'EMI Prepayment', icon: ChevronsDown },
    { id: 'smartemi', name: 'Zero-Cost EMI', icon: Sparkles },
    { id: 'earlyclosure', name: 'Early Debt Freedom', icon: ShieldCheck },
    { id: 'fire', name: 'F.I.R.E Target', icon: Map },
    { id: 'goal', name: 'Goal Planner', icon: Target },
  ];

  return (
    <div className="pt-32 pb-10 animate-in fade-in duration-700 text-left">
      <section className="px-6 sm:px-10 lg:px-16 xl:px-24 w-full max-w-[1800px] mx-auto py-16">
        <FadeIn className="max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tighter text-zinc-950 mb-6 leading-[1.05]">
            The Math of <br />
            <span className="font-medium text-emerald-600">Wealth Creation.</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-zinc-500 font-light leading-relaxed mb-8">
            A suite of advanced, precision tools designed to help you visualize compounding, plan for retirement, and map out your definitive path to financial freedom.
          </p>
        </FadeIn>
      </section>

      <section className="px-6 sm:px-10 lg:px-16 xl:px-24 w-full max-w-[1800px] mx-auto py-6">
        <div className="bg-zinc-50 border border-zinc-100 rounded-3xl p-6 sm:p-10 lg:p-12 overflow-hidden">
          <FadeIn className="mb-10">
            <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-3 snap-x border-b border-zinc-200">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`snap-start whitespace-nowrap flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 border ${
                    activeTab === tab.id 
                      ? 'bg-zinc-950 text-white border-zinc-950 shadow-md' 
                      : 'bg-white text-zinc-500 border-zinc-200 hover:border-zinc-400 hover:text-zinc-900'
                  }`}
                >
                  <tab.icon className={`w-4 h-4 shrink-0 ${activeTab === tab.id && (tab.id === 'smartemi' || tab.id === 'earlyclosure') ? 'text-emerald-400' : ''}`} strokeWidth={activeTab === tab.id ? 2 : 1.5} />
                  {tab.name}
                </button>
              ))}
            </div>
          </FadeIn>

          <div className="min-h-[500px]">
            {activeTab === 'sip' && <SipCalculatorWidget />}
            {activeTab === 'stepup' && <StepUpCalculatorWidget />}
            {activeTab === 'lumpsum' && <LumpsumCalculatorWidget />}
            {activeTab === 'emivssip' && <EmiVsSipCalculatorWidget />}
            {activeTab === 'prepayment' && <ExtraEmiCalculatorWidget />}
            {activeTab === 'smartemi' && <SmartEmiCalculatorWidget />}
            {activeTab === 'earlyclosure' && <EarlyClosureWidget />}
            {activeTab === 'fire' && <FireCalculatorWidget />}
            {activeTab === 'goal' && <GoalCalculatorWidget />}
          </div>
        </div>
      </section>

      <section className="px-6 sm:px-10 lg:px-16 xl:px-24 w-full max-w-[1800px] mx-auto py-16 flex flex-col items-start text-left">
        <FadeIn>
          <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center mb-4">
            <Calculator className="w-6 h-6 text-zinc-600" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-light tracking-tighter mb-3">Numbers look good?</h2>
          <p className="text-zinc-500 font-light max-w-xl mb-6 text-sm sm:text-base">Calculators show possibilities. Our experts turn them into realities. Let Ask Geo build the portfolio that executes your math.</p>
          <button onClick={() => openContactModal('Execute My Plan')} className="px-6 py-3 text-sm bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition-colors shadow-lg shadow-emerald-600/20 inline-flex items-center gap-2">
            Schedule a Strategy Session <ArrowRight className="w-4 h-4" />
          </button>
        </FadeIn>
      </section>
    </div>
  );
};

// --- INSIGHTS PAGE COMPONENT ---
const InsightsPage = ({ setCurrentPage, openContactModal }) => {
  const articles = [
    { tag: "MACRO", date: "Oct 24, 2023", title: "The Fed's Pivot: What it means for Emerging Markets and Indian Debt", read: "6 min read" },
    { tag: "EQUITY", date: "Oct 12, 2023", title: "Navigating Volatility: Why Tech ETFs remain a stronghold in Q4.", read: "5 min read" },
    { tag: "TAX PLANNING", date: "Sep 28, 2023", title: "Maximizing Section 80C: A mathematical comparison of ELSS vs PPF.", read: "8 min read" },
    { tag: "WEALTH", date: "Sep 15, 2023", title: "The Psychology of Holding: Why idle portfolios often beat active trading.", read: "4 min read" },
    { tag: "ALTERNATIVES", date: "Aug 30, 2023", title: "Demystifying InvITs and REITs for the modern passive income investor.", read: "7 min read" },
    { tag: "RETIREMENT", date: "Aug 12, 2023", title: "The 4% Rule: Is it still viable for modern Indian retirement planning?", read: "6 min read" },
  ];

  return (
    <div className="pt-32 pb-10 animate-in fade-in duration-700 text-left">
      <section className="px-6 sm:px-10 lg:px-16 xl:px-24 w-full max-w-[1800px] mx-auto py-16">
        <FadeIn className="max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tighter text-zinc-950 mb-6 leading-[1.05]">
            Market <br />
            <span className="font-medium text-emerald-600">Intelligence.</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-zinc-500 font-light leading-relaxed mb-8">
            Institutional-grade research, macroeconomic breakdowns, and tactical strategies to keep you ahead of the curve.
          </p>
        </FadeIn>
      </section>

      <section className="px-6 sm:px-10 lg:px-16 xl:px-24 w-full max-w-[1800px] mx-auto py-10">
        <FadeIn delay={100}>
          <div className="bg-zinc-950 text-white rounded-3xl p-8 sm:p-12 flex flex-col lg:flex-row gap-10 items-center group cursor-pointer relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-900/20 to-transparent group-hover:scale-105 transition-transform duration-700"></div>
            <div className="w-full lg:w-1/2 relative z-10">
              <div className="aspect-[16/9] lg:aspect-[4/3] bg-zinc-900 rounded-2xl flex items-center justify-center border border-zinc-800">
                <BookOpen className="w-12 h-12 lg:w-16 lg:h-16 text-zinc-700 group-hover:text-emerald-500 transition-colors duration-500" strokeWidth={1} />
              </div>
            </div>
            <div className="w-full lg:w-1/2 relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[9px] sm:text-[10px] font-bold tracking-widest text-zinc-950 bg-emerald-400 px-2 py-1 rounded-md">SPECIAL REPORT</span>
                <span className="text-[10px] sm:text-xs text-zinc-400 font-light">November 2023</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tighter mb-4 group-hover:text-emerald-400 transition-colors duration-300 leading-tight">
                The 2024 Blueprint: Positioning portfolios for the next election cycle.
              </h2>
              <p className="text-zinc-400 font-light leading-relaxed mb-6 text-sm sm:text-base">
                An exhaustive 40-page analysis of historical market behaviors preceding Indian general elections, identifying tactical overweight opportunities in infrastructure, manufacturing, and consumption sectors.
              </p>
              <button onClick={() => openContactModal('Request Special Report')} className="inline-flex items-center gap-2 font-medium text-white group-hover:text-emerald-400 transition-colors text-sm">
                Request Full Report <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="px-6 sm:px-10 lg:px-16 xl:px-24 w-full max-w-[1800px] mx-auto py-16 border-t border-zinc-100 mt-10">
        <FadeIn className="mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tighter">Latest Publications</h2>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {articles.map((post, idx) => (
            <FadeIn key={idx} delay={idx * 100} direction="up" className="group cursor-pointer flex flex-col h-full">
              <div className="aspect-[16/10] bg-zinc-50 rounded-2xl mb-5 overflow-hidden relative border border-zinc-100">
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-100 to-zinc-50 transition-transform duration-700 group-hover:scale-105"></div>
                <BookOpen className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-zinc-300 group-hover:text-emerald-400 transition-colors duration-500" strokeWidth={1} />
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[9px] font-bold tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-md">{post.tag}</span>
                <span className="text-[10px] text-zinc-400 font-medium">{post.date}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-normal tracking-tight text-zinc-900 group-hover:text-emerald-600 transition-colors duration-300 pr-6 relative mb-3 leading-snug">
                {post.title}
                <ArrowUpRight className="absolute right-0 top-1 w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300 text-emerald-600" strokeWidth={1.5} />
              </h3>
              <p className="text-[9px] font-medium tracking-widest text-zinc-400 uppercase mt-auto">{post.read}</p>
            </FadeIn>
          ))}
        </div>
      </section>
    </div>
  );
};

// --- Main Application ---
const AskGeoApp = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [isContactModalOpen, setContactModalOpen] = useState(false);
  const [contactModalTitle, setContactModalTitle] = useState('');

  const openContactModal = (title) => {
    setContactModalTitle(title);
    setContactModalOpen(true);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-emerald-200 selection:text-zinc-900 overflow-x-hidden text-left">
      
      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .animate-float-delayed { animation: float 7s ease-in-out infinite 2s; }
        .animate-float-slow { animation: float 8s ease-in-out infinite 1s; }
        @keyframes blob { 0% { transform: translate(0px, 0px) scale(1); } 33% { transform: translate(30px, -50px) scale(1.1); } 66% { transform: translate(-20px, 20px) scale(0.9); } 100% { transform: translate(0px, 0px) scale(1); } }
        .animate-blob { animation: blob 10s infinite alternate ease-in-out; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        @keyframes pulse-ring { 0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); } 70% { box-shadow: 0 0 0 20px rgba(16, 185, 129, 0); } 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); } }
        .animate-pulse-ring { animation: pulse-ring 2.5s infinite cubic-bezier(0.66, 0, 0, 1); }
      `}</style>

      {/* --- Minimal Navigation --- */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/90 backdrop-blur-xl border-b border-zinc-100 py-3 shadow-sm' : 'bg-transparent py-5'
      }`}>
        <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => { setCurrentPage('home'); window.scrollTo(0,0); }}>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-zinc-900 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-600 transition-all duration-300">
              <TrendingUp className="text-white w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.5} />
            </div>
            <span className="text-xl sm:text-2xl font-normal tracking-tight text-zinc-900">Ask <span className="text-zinc-500 transition-colors duration-300 group-hover:text-emerald-600">Geo</span></span>
          </div>

          <div className="hidden lg:flex items-center gap-8 xl:gap-12">
            {['HOME', 'ABOUT', 'SERVICES', 'INSIGHTS'].map((item) => {
              const pageKey = item.toLowerCase();
              const isActive = currentPage === pageKey;
              return (
                <button 
                  key={item} 
                  onClick={() => { setCurrentPage(pageKey); window.scrollTo(0,0); }} 
                  className={`text-[9px] xl:text-[10px] font-semibold tracking-widest transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-zinc-900 after:transition-all after:duration-300 ${isActive ? 'text-zinc-900 after:w-full' : 'text-zinc-500 hover:text-zinc-900 after:w-0 hover:after:w-full'}`}
                >
                  {item}
                </button>
              );
            })}
            
            <button 
              onClick={() => { setCurrentPage('tools'); window.scrollTo(0,0); }} 
              className={`text-[9px] xl:text-[10px] font-bold tracking-widest px-5 py-2.5 rounded-md border transition-all flex items-center gap-2 ${currentPage === 'tools' ? 'bg-emerald-50 border-emerald-200 text-emerald-700 shadow-sm' : 'bg-zinc-950 border-zinc-950 text-white hover:bg-emerald-600 hover:border-emerald-600 shadow-md'}`}
            >
              <Sparkles className="w-3 h-3" /> ADVANCED TOOLS
            </button>
          </div>

          <button className="lg:hidden text-zinc-900 p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X strokeWidth={1.5} className="w-5 h-5" /> : <Menu strokeWidth={1.5} className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden absolute top-full left-0 w-full bg-white border-b border-zinc-100 py-6 px-6 flex flex-col gap-6 shadow-xl transition-all duration-300 origin-top ${mobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`}>
          {['HOME', 'ABOUT', 'SERVICES', 'INSIGHTS'].map((item) => {
            const pageKey = item.toLowerCase();
            const isActive = currentPage === pageKey;
            return (
              <button 
                key={item} 
                onClick={() => { setCurrentPage(pageKey); setMobileMenuOpen(false); window.scrollTo(0,0); }} 
                className={`text-xs font-medium tracking-widest text-left flex items-center gap-2 ${isActive ? 'text-zinc-900' : 'text-zinc-500'}`}
              >
                {item}
              </button>
            );
          })}
          <div className="h-px bg-zinc-100 w-full"></div>
          <button 
            onClick={() => { setCurrentPage('tools'); setMobileMenuOpen(false); window.scrollTo(0,0); }} 
            className="mt-2 bg-zinc-950 text-white text-xs font-medium tracking-widest py-3 rounded-lg flex items-center justify-center gap-2 active:bg-emerald-600 transition-colors"
          >
            <Sparkles className="w-4 h-4" /> ADVANCED TOOLS
          </button>
        </div>
      </nav>

      {/* --- PAGE ROUTER MAIN --- */}
      <main>
        {currentPage === 'about' && <AboutPage setCurrentPage={setCurrentPage} openContactModal={openContactModal} />}
        {currentPage === 'services' && <ServicesPage setCurrentPage={setCurrentPage} openContactModal={openContactModal} />}
        {currentPage === 'tools' && <CalculatorsPage setCurrentPage={setCurrentPage} openContactModal={openContactModal} />}
        {currentPage === 'insights' && <InsightsPage setCurrentPage={setCurrentPage} openContactModal={openContactModal} />}
        
        {currentPage === 'home' && (
          <>
      {/* --- Minimal Hero Section --- */}
      <section id="home" className="relative pt-32 sm:pt-40 pb-20 sm:pb-24 lg:pt-48 lg:pb-32 px-6 sm:px-10 lg:px-16 xl:px-24 w-full max-w-[1800px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <div className="lg:w-1/2 z-10 relative">
          <FadeIn delay={0}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-zinc-100 text-zinc-600 text-[9px] sm:text-[10px] font-semibold tracking-widest mb-6">
              <Activity className="w-3 h-3 text-emerald-500" strokeWidth={1.5} /> AI-OPTIMIZED PLANNING
            </div>
          </FadeIn>
          
          <FadeIn delay={100}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tighter leading-[1.05] text-zinc-950 mb-6">
              For expert advice, <br />
              <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400">
                Ask Geo.
              </span>
            </h1>
          </FadeIn>
          
          <FadeIn delay={200}>
            <p className="text-sm sm:text-base lg:text-lg text-zinc-500 mb-8 max-w-xl font-light leading-relaxed">
              We build, manage, and preserve your wealth with highly customized, data-driven financial strategies.
            </p>
          </FadeIn>
          
          <FadeIn delay={300}>
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <button onClick={() => openContactModal('Ask Geo Now')} className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-zinc-950 text-white rounded-lg font-medium overflow-hidden transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-0.5 w-full sm:w-auto text-center flex justify-center text-xs sm:text-sm">
                <span className="relative z-10 flex items-center gap-2">
                  Ask Geo Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
                </span>
                <div className="absolute inset-0 bg-emerald-600 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out z-0"></div>
              </button>
              <button onClick={() => { setCurrentPage('services'); window.scrollTo(0,0); }} className="px-6 py-3 text-zinc-600 font-medium hover:text-zinc-900 transition-colors w-full sm:w-auto text-left text-xs sm:text-sm">
                Explore Services
              </button>
            </div>
          </FadeIn>
        </div>

        {/* Hero Abstract Graphic */}
        <div className="lg:w-1/2 relative w-full h-[400px] sm:h-[500px] lg:h-[600px] mt-8 lg:mt-0 perspective-1000">
          <FadeIn delay={400} direction="left" className="w-full h-full relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-emerald-50/80 rounded-full blur-[60px] sm:blur-[100px] -z-10 animate-blob"></div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] max-w-[280px] sm:max-w-[340px] lg:max-w-[380px] z-10 relative">
              <div className="w-full bg-white border border-zinc-100 rounded-[2rem] sm:rounded-[2.5rem] lg:rounded-[3rem] shadow-2xl shadow-zinc-200/50 p-6 sm:p-8 lg:p-10 flex flex-col justify-between overflow-hidden group relative">
                <div className="absolute top-1/2 right-0 -translate-y-1/2 opacity-10 group-hover:opacity-20 transition-opacity">
                   <TrendingUp className="w-32 h-32 sm:w-48 sm:h-48 text-zinc-500" strokeWidth={1} />
                </div>
                
                <div className="relative z-10">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-emerald-100 text-emerald-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-6 sm:mb-8">
                    <PieChart className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-medium tracking-tight mb-2 text-zinc-900">Portfolio Metrics</h3>
                  <p className="text-zinc-500 text-xs sm:text-sm lg:text-base font-light mb-8 lg:mb-10">Historical data & active management</p>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4 relative z-10">
                  <div className="bg-zinc-50 p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl border border-zinc-100">
                    <p className="text-[10px] sm:text-xs lg:text-sm font-semibold text-zinc-400 tracking-widest uppercase mb-1 sm:mb-2">AUM</p>
                    <p className="text-2xl sm:text-3xl lg:text-4xl font-light text-zinc-900">133K<span className="text-zinc-400 text-sm sm:text-base lg:text-lg ml-1">Cr</span></p>
                  </div>
                  <div className="bg-emerald-50 p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl border border-emerald-100/50">
                    <p className="text-[10px] sm:text-xs lg:text-sm font-semibold text-emerald-600/60 tracking-widest uppercase mb-1 sm:mb-2">XIRR</p>
                    <p className="text-2xl sm:text-3xl lg:text-4xl font-light text-emerald-700">+12%</p>
                  </div>
                </div>
              </div>

              {/* Floating Card 1: AI Engine */}
              <div className="absolute -left-8 sm:-left-20 lg:-left-28 top-8 sm:top-12 bg-zinc-950 border border-zinc-800 text-white p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-2xl animate-float z-20 flex items-center gap-3 sm:gap-4 hover:scale-105 transition-transform cursor-default w-max">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-900/50 flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" strokeWidth={1.5} />
                </div>
                <div className="pr-2 sm:pr-4">
                  <p className="text-[8px] sm:text-[10px] font-bold text-emerald-500 tracking-widest uppercase mb-0.5">AI Engine</p>
                  <p className="text-xs sm:text-sm font-light text-white">Optimizing...</p>
                </div>
              </div>

              {/* Floating Card 2: Trust/Clients */}
              <div className="absolute -right-8 sm:-right-20 lg:-right-28 top-[35%] bg-white border border-zinc-100 p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-xl animate-float-delayed z-20 flex items-center gap-3 sm:gap-4 hover:scale-105 transition-transform cursor-default w-max">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-600" strokeWidth={1.5} />
                </div>
                <div className="pr-2 sm:pr-4">
                  <p className="text-[8px] sm:text-[10px] font-bold text-zinc-400 tracking-widest uppercase mb-0.5">Trust</p>
                  <p className="text-xs sm:text-sm font-light text-zinc-900">26L+ Clients</p>
                </div>
              </div>

              {/* Floating Card 3: Live Sync */}
              <div className="absolute -left-4 sm:-left-16 lg:-left-20 bottom-12 sm:bottom-20 bg-white border border-zinc-100 p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-xl animate-float z-30 flex items-center gap-3 sm:gap-4 hover:scale-105 transition-transform cursor-default w-max">
                 <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                  <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" strokeWidth={1.5} />
                </div>
                <div className="pr-2 sm:pr-4">
                  <p className="text-[8px] sm:text-[10px] font-bold text-zinc-400 tracking-widest uppercase mb-0.5">Live Sync</p>
                  <p className="text-xs sm:text-sm font-light text-zinc-900">Market Data</p>
                </div>
              </div>

            </div>
          </FadeIn>
        </div>
      </section>

      {/* --- Clean Divider Stats --- */}
      <section className="border-y border-zinc-100 bg-zinc-50/50 py-12 lg:py-16">
        <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 divide-y sm:divide-y-0 sm:divide-x divide-zinc-200">
          <FadeIn delay={100} direction="none" className="py-2 sm:pr-6 text-left">
            <h4 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tighter text-zinc-900 mb-1">
              <AnimatedNumber end={26} suffix="L+" />
            </h4>
            <p className="text-[10px] font-semibold tracking-widest text-zinc-500 uppercase">Active Investors</p>
          </FadeIn>
          <FadeIn delay={200} direction="none" className="py-6 sm:py-2 sm:px-6 text-left">
            <h4 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tighter text-zinc-900 mb-1">
              <AnimatedNumber end={133} suffix="K" />
            </h4>
            <p className="text-[10px] font-semibold tracking-widest text-zinc-500 uppercase">Crore AUM</p>
          </FadeIn>
          <FadeIn delay={300} direction="none" className="py-6 sm:py-2 sm:pl-6 text-left sm:col-span-2 lg:col-span-1 sm:border-t lg:border-t-0 sm:pt-6 lg:pt-2">
            <h4 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tighter text-emerald-600 mb-1">
              <AnimatedNumber end={12} suffix="%" />
            </h4>
            <p className="text-[10px] font-semibold tracking-widest text-zinc-500 uppercase">Historic XIRR</p>
          </FadeIn>
        </div>
      </section>

      {/* --- Core Philosophy --- */}
      <section className="py-20 sm:py-24 lg:py-32 px-6 sm:px-10 lg:px-16 xl:px-24 w-full max-w-[1800px] mx-auto">
        <FadeIn className="mb-12 max-w-3xl text-left">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tighter mb-4">Our Core Philosophy</h2>
          <p className="text-sm sm:text-base lg:text-lg text-zinc-500 font-light leading-relaxed">
            We operate on principles that prioritize your long-term security, utilizing data-driven precision to eliminate guesswork from your financial future.
          </p>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {[
            { icon: Target, title: "Absolute Precision", desc: "Every portfolio is mathematically optimized to align perfectly with your risk appetite and timelines." },
            { icon: ShieldCheck, title: "Unwavering Trust", desc: "100% transparency in fee structures and investment logic. We win only when your portfolio wins." },
            { icon: Zap, title: "Dynamic Agility", desc: "Market conditions change rapidly. Our strategies adapt in real-time to protect and grow your wealth." }
          ].map((item, idx) => (
            <FadeIn key={idx} delay={idx * 150} direction="up" className="group text-left">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-zinc-50 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-105 group-hover:bg-emerald-50 transition-all duration-500">
                <item.icon className="w-6 h-6 sm:w-8 sm:h-8 text-zinc-400 group-hover:text-emerald-600 transition-colors duration-500" strokeWidth={1} />
              </div>
              <h3 className="text-lg sm:text-xl font-normal tracking-tight mb-2">{item.title}</h3>
              <p className="text-zinc-500 font-light text-sm sm:text-base leading-relaxed">{item.desc}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* --- AI Tool Section --- */}
      <section id="ai-tools" className="py-20 sm:py-24 lg:py-32 px-6 sm:px-10 lg:px-16 xl:px-24 w-full max-w-[1800px] mx-auto relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] aspect-square bg-emerald-50/50 rounded-full blur-[80px] -z-10 animate-blob animation-delay-2000"></div>
        
        <FadeIn className="mb-12 max-w-2xl text-left">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white border border-zinc-100 shadow-md mb-6 group hover:shadow-emerald-200/50 transition-all duration-500">
            <Bot className="w-6 h-6 text-emerald-600 group-hover:animate-bounce" strokeWidth={1.5} />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight mb-4">Geo AI Insight Engine</h2>
          <p className="text-sm sm:text-base lg:text-lg text-zinc-500 font-light leading-relaxed">
            Experience the future of financial planning. Our proprietary AI tools analyze market trends, risk tolerance, and your unique goals to provide real-time strategies.
          </p>
        </FadeIn>

        <FadeIn delay={200}>
          <AIAssistantWidget openContactModal={openContactModal} />
        </FadeIn>
      </section>

      {/* --- Philosophy Section --- */}
      <section id="about" className="py-20 sm:py-24 lg:py-32 bg-zinc-950 text-white px-6 sm:px-10 lg:px-16 xl:px-24 text-left">
        <div className="w-full max-w-[1800px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <FadeIn>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tighter mb-6 leading-[1.1]">
                Let's talk about <br/><span className="text-emerald-400">wealth.</span>
              </h2>
            </FadeIn>
            <FadeIn delay={100}>
              <p className="text-zinc-400 text-sm sm:text-base lg:text-lg font-light leading-relaxed mb-6">
                Wealth is not just about accumulating assets, but managing them in a way that aligns with your values. It requires a personalized plan factoring in risk tolerance, goals, and life circumstances.
              </p>
            </FadeIn>
            <FadeIn delay={200}>
              <blockquote className="border-l-2 border-emerald-500 pl-5 py-1 mb-8 text-base sm:text-lg font-normal text-zinc-300 leading-snug">
                "The ‘know-nothing’ investor should practice diversification, but it is crazy if you are an expert."
              </blockquote>
            </FadeIn>
            <FadeIn delay={300}>
              <button onClick={() => openContactModal('Let\'s Build Wealth')} className="inline-flex items-center gap-2 text-white font-medium text-sm hover:text-emerald-400 transition-colors group">
                Let's Build Wealth <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" strokeWidth={1.5} />
              </button>
            </FadeIn>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 relative">
            <FadeIn delay={100} direction="right" className="space-y-4 sm:space-y-6 sm:pt-8">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 hover:bg-zinc-800 transition-colors">
                <PieChart className="text-white w-6 h-6 mb-4" strokeWidth={1.5} />
                <h4 className="font-normal text-lg mb-1">Mutual Funds</h4>
                <p className="text-zinc-400 text-xs font-light">Expertly curated schemes for optimal growth.</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 hover:bg-zinc-800 transition-colors">
                <TrendingUp className="text-white w-6 h-6 mb-4" strokeWidth={1.5} />
                <h4 className="font-normal text-lg mb-1">Equity & ETFs</h4>
                <p className="text-zinc-400 text-xs font-light">Direct market participation with strategy.</p>
              </div>
            </FadeIn>
            <FadeIn delay={200} direction="right" className="space-y-4 sm:space-y-6">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 hover:bg-zinc-800 transition-colors">
                <ShieldCheck className="text-white w-6 h-6 mb-4" strokeWidth={1.5} />
                <h4 className="font-normal text-lg mb-1">Bonds & FD</h4>
                <p className="text-zinc-400 text-xs font-light">Secure, fixed-income instruments.</p>
              </div>
              <div className="bg-emerald-600 rounded-2xl p-6 sm:p-8 text-white flex flex-col justify-center min-h-[160px] hover:scale-105 transition-transform duration-500">
                <h4 className="font-light text-4xl sm:text-5xl mb-1">12%</h4>
                <p className="text-emerald-100 font-medium tracking-widest text-[9px] uppercase">Historic XIRR</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* --- Services Section --- */}
      <section id="services" className="py-20 sm:py-24 lg:py-32 px-6 sm:px-10 lg:px-16 xl:px-24 w-full max-w-[1800px] mx-auto text-left">
        <FadeIn className="mb-12 max-w-3xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tighter mb-4">Our Expertise</h2>
            <p className="text-sm sm:text-base lg:text-lg text-zinc-500 font-light leading-relaxed">
              As a financial advisor, I offer a range of services designed to help my clients achieve their ultimate financial freedom.
            </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[
            { title: "Wealth Management", icon: Briefcase, desc: "Building and preserving wealth through personalized, high-yield management strategies." },
            { title: "Portfolio Management", icon: TrendingUp, desc: "Recommending and adjusting the diversity of investments to ensure the best possible long-term outcome." },
            { title: "Insurance Management", icon: ShieldCheck, desc: "Managing risk by assessing needs, identifying coverage gaps and recommending policies." }
          ].map((service, idx) => (
            <FadeIn key={idx} delay={idx * 150} direction="up" className="group">
              <div className="bg-zinc-50 border border-zinc-100 p-8 sm:p-10 rounded-3xl hover:bg-white hover:shadow-xl hover:shadow-zinc-200/50 hover:-translate-y-1 transition-all duration-500 h-full flex flex-col">
                <div className="w-12 h-12 bg-white border border-zinc-100 rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:bg-zinc-900 group-hover:text-white group-hover:border-zinc-900 transition-all duration-500">
                  <service.icon className="w-5 h-5 transition-colors group-hover:-rotate-12 duration-500" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl sm:text-2xl font-light tracking-tight mb-3">{service.title}</h3>
                <p className="text-zinc-500 font-light text-sm sm:text-base leading-relaxed mt-auto">{service.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* --- Interactive Tools Teaser --- */}
      <section className="py-20 sm:py-24 lg:py-32 bg-zinc-950 text-white px-6 sm:px-10 lg:px-16 xl:px-24 relative overflow-hidden text-left">
        <div className="absolute top-0 right-0 w-full max-w-[600px] aspect-square bg-emerald-900/20 rounded-full blur-[100px] pointer-events-none animate-blob animation-delay-4000"></div>
        <div className="w-full max-w-[1800px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20 relative z-10">
          <div className="w-full lg:w-1/2">
            <FadeIn className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-zinc-900 border border-zinc-800 text-emerald-400 text-[10px] font-medium tracking-widest mb-6">
                <Calculator className="w-3 h-3" strokeWidth={1.5} /> INTERACTIVE TOOLS
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tighter mb-4 leading-[1.1]">
                Visualize your <br/><span className="font-medium text-emerald-400">financial trajectory.</span>
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base lg:text-lg font-light leading-relaxed mb-8">
                Don't guess your future. Use our advanced SIP, Lumpsum, and Retirement calculators to mathematically map out your path to financial freedom.
              </p>
              <button onClick={() => { setCurrentPage('tools'); window.scrollTo(0,0); }} className="inline-flex items-center gap-2 px-6 py-3 bg-white text-zinc-950 rounded-lg font-medium hover:bg-emerald-400 hover:text-white transition-colors duration-300 text-xs sm:text-sm justify-start">
                Try Calculators <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </FadeIn>
          </div>
          <div className="w-full lg:w-1/2">
            <FadeIn delay={200} direction="left">
              <div className="bg-zinc-900/80 border border-zinc-800 backdrop-blur-md p-6 sm:p-8 lg:p-10 rounded-3xl shadow-2xl">
                <div className="flex justify-between items-center mb-6 border-b border-zinc-800 pb-5">
                  <div>
                    <h4 className="text-lg sm:text-xl font-medium text-white mb-1">SIP Calculator Pro</h4>
                    <p className="text-[9px] sm:text-[10px] font-light text-zinc-500 uppercase tracking-widest">Projected Growth</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-emerald-500" strokeWidth={1.5} />
                </div>
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between text-xs sm:text-sm mb-2"><span className="text-zinc-400 font-light">Monthly Investment</span><span className="text-white font-medium">₹25,000</span></div>
                    <AnimatedProgress width="33%" delay={200} />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs sm:text-sm mb-2"><span className="text-zinc-400 font-light">Time Period</span><span className="text-white font-medium">15 Years</span></div>
                    <AnimatedProgress width="50%" delay={500} />
                  </div>
                  <div className="pt-6 mt-6 border-t border-zinc-800">
                    <p className="text-zinc-400 font-light text-[10px] sm:text-xs mb-1">Estimated Future Value</p>
                    <p className="text-2xl sm:text-3xl lg:text-4xl font-light text-emerald-400">
                      ₹<AnimatedNumber end={1.26} decimals={2} duration={2500} /> Cr.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* --- Pre-Footer CTA --- */}
      <section className="py-24 sm:py-32 lg:py-40 px-6 sm:px-10 lg:px-16 xl:px-24 relative overflow-hidden text-left border-t border-zinc-100">
        <div className="absolute inset-0 bg-white z-0"></div>
        <div className="w-full max-w-[1800px] mx-auto relative z-10">
          <FadeIn>
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 border border-emerald-100">
              <TrendingUp className="w-8 h-8 text-emerald-600" strokeWidth={1.5} />
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tighter text-zinc-950 mb-6 leading-[1.05]">
              Ready to build your <br />
              <span className="font-medium text-emerald-600">
                financial fortress?
              </span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-zinc-500 font-light max-w-2xl mb-8 leading-relaxed">
              Join over 26 Lakh investors who trust Ask Geo to navigate the complexities of wealth creation and preservation.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-start items-start sm:items-center">
              <button onClick={() => openContactModal('Start Your Journey')} className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center gap-2 text-sm w-full sm:w-auto justify-center">
                Start Your Journey <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </button>
              <button onClick={() => openContactModal('Request a Callback')} className="px-8 py-4 bg-transparent border border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50 text-zinc-900 rounded-lg font-medium transition-all duration-300 w-full sm:w-auto justify-center flex text-sm">
                Request a Callback
              </button>
            </div>
          </FadeIn>
        </div>
      </section>
          </>
        )}
      </main>

      {/* --- Clean Align-Left Footer --- */}
      <footer className="bg-[#09090b] text-[#a1a1aa] pt-20 pb-10 px-6 sm:px-10 lg:px-16 xl:px-24 border-t border-zinc-900 text-left">
        <div className="w-full max-w-[1800px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 mb-16 border-b border-zinc-800 pb-16">
            
            {/* Brand Column */}
            <div className="lg:col-span-5 xl:col-span-6">
              <div className="mb-6">
                <img 
                  src="https://static.wixstatic.com/media/c12706_95ffde7d7fdf43fcb12e87a36b56eef6~mv2.png" 
                  alt="Ask Geo Logo" 
                  className="h-10 w-auto object-contain filter brightness-0 invert" 
                />
              </div>
              <p className="text-sm font-light leading-relaxed mb-8 max-w-sm text-zinc-400">
                A premier financial advisory firm dedicated to building, managing, and preserving wealth through highly customized, data-driven strategies and AI-optimized planning.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-zinc-500 hover:text-emerald-400 transition-colors duration-300">
                  <Linkedin className="w-5 h-5" strokeWidth={1.5} />
                </a>
                <a href="#" className="text-zinc-500 hover:text-emerald-400 transition-colors duration-300">
                  <Twitter className="w-5 h-5" strokeWidth={1.5} />
                </a>
                <a href="#" className="text-zinc-500 hover:text-emerald-400 transition-colors duration-300">
                  <Facebook className="w-5 h-5" strokeWidth={1.5} />
                </a>
                <a href="#" className="text-zinc-500 hover:text-emerald-400 transition-colors duration-300">
                  <Instagram className="w-5 h-5" strokeWidth={1.5} />
                </a>
              </div>
            </div>

            {/* Quick Links Column */}
            <div className="lg:col-span-3 lg:col-start-7">
              <h4 className="text-white font-medium mb-6 text-sm">Quick Links</h4>
              <ul className="space-y-4 text-sm font-light text-zinc-400 flex flex-col items-start">
                <li><button onClick={() => { setCurrentPage('home'); window.scrollTo(0,0); }} className="hover:text-emerald-400 transition-colors text-left">Home</button></li>
                <li><button onClick={() => { setCurrentPage('about'); window.scrollTo(0,0); }} className="hover:text-emerald-400 transition-colors text-left">About Geo</button></li>
                <li><button onClick={() => { setCurrentPage('home'); setTimeout(() => document.getElementById('ai-tools')?.scrollIntoView({behavior: 'smooth'}), 100); }} className="hover:text-emerald-400 transition-colors text-left pl-4 border-l border-zinc-800">AI Insight Engine</button></li>
                <li><button onClick={() => { setCurrentPage('insights'); window.scrollTo(0,0); }} className="hover:text-emerald-400 transition-colors text-left pl-4 border-l border-zinc-800">Market Intelligence</button></li>
                <li><button onClick={() => openContactModal('Contact Us')} className="hover:text-emerald-400 transition-colors text-left">Contact Us</button></li>
              </ul>
            </div>

            {/* Services Column */}
            <div className="lg:col-span-3 lg:col-start-10">
              <h4 className="text-white font-medium mb-6 text-sm">Our Services</h4>
              <ul className="space-y-4 text-sm font-light text-zinc-400 flex flex-col items-start">
                <li><button onClick={() => { setCurrentPage('services'); window.scrollTo(0,0); }} className="hover:text-emerald-400 transition-colors text-left">Wealth Management</button></li>
                <li><button onClick={() => { setCurrentPage('services'); window.scrollTo(0,0); }} className="hover:text-emerald-400 transition-colors text-left">Portfolio Analysis</button></li>
                <li><button onClick={() => { setCurrentPage('services'); window.scrollTo(0,0); }} className="hover:text-emerald-400 transition-colors text-left">Insurance Planning</button></li>
                <li><button onClick={() => { setCurrentPage('tools'); window.scrollTo(0,0); }} className="hover:text-emerald-400 transition-colors text-left">Retirement Strategy</button></li>
                <li><button onClick={() => { setCurrentPage('services'); window.scrollTo(0,0); }} className="hover:text-emerald-400 transition-colors text-left">Tax Optimization</button></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-start gap-6 text-[10px] font-medium tracking-widest uppercase text-zinc-500">
            <p>© {new Date().getFullYear()} Ask Geo Financial Services.</p>
            <div className="flex flex-wrap gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">SEBI Registration</a>
            </div>
          </div>
        </div>
      </footer>
      <GeneralContactModal isOpen={isContactModalOpen} onClose={() => setContactModalOpen(false)} title={contactModalTitle} />
    </div>
  );
};

export default AskGeoApp;
