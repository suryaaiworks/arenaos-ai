"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useTheme } from "@/features/app/providers/ThemeProvider";
import { 
  Shield, 
  Activity, 
  MapPin, 
  Compass, 
  ArrowDown
} from "lucide-react";

type LayerId = "crowd" | "parking" | "medical" | "security" | "food" | "utilities" | "emergency" | "accessibility" | "gates";

export default function LandingPage() {
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStep, setLoadingStep] = useState(0);
  
  const [activeStep, setActiveStep] = useState(0);
  const [activeLayer, setActiveLayer] = useState<LayerId>("crowd");
  const [selectedServiceZone, setSelectedServiceZone] = useState<string | null>("crowd");
  const [hoveredAgent, setHoveredAgent] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [liveMetrics, setLiveMetrics] = useState({
    crowd: 82413,
    agents: 18,
    medical: 12,
    alerts: 1,
    weather: 28
  });

  // Loading Steps
  const loadingSteps = [
    "Initializing ArenaMind core...",
    "Loading Stadium Digital Twin...",
    "Establishing telemetry networks...",
    "Connecting security and crowd agents...",
    "ArenaOS Ready."
  ];

  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        const diff = Math.random() * 20 + 8;
        return Math.min(prev + diff, 100);
      });
    }, 180);
    return () => clearInterval(interval);
  }, [loading]);

  useEffect(() => {
    if (loadingProgress < 20) setLoadingStep(0);
    else if (loadingProgress < 45) setLoadingStep(1);
    else if (loadingProgress < 70) setLoadingStep(2);
    else if (loadingProgress < 95) setLoadingStep(3);
    else setLoadingStep(4);
  }, [loadingProgress]);

  // Fluctuating telemetry simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveMetrics((prev) => ({
        ...prev,
        crowd: prev.crowd + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 4),
        alerts: Math.random() > 0.9 ? (prev.alerts === 0 ? 1 : 0) : prev.alerts
      }));
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  // Workflow steps cycler
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 7);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Header scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Features list
  const features = [
    { title: "Interactive 3D Digital Twin", desc: "Real-time visual replica of stands, corridors, pitch, and transit lanes for situational monitoring.", icon: "🗺️" },
    { title: "Arena Copilot", desc: "Conversational stadium concierge providing instant action execution and status reporting.", icon: "🤖" },
    { title: "Indoor Navigation", desc: "Step-free elevator paths, gate routing, and seating directions optimized for crowd density.", icon: "🧭" },
    { title: "Parking Assistant", desc: "Auto-detects vehicle coordinates, maps North/South zones, and directs fans back post-match.", icon: "🚗" },
    { title: "Emergency Dispatch", desc: "Instantly alerts responder units and redirects crowd corridors to open gates during alerts.", icon: "🚨" },
    { title: "Official Merchandise", desc: "Reserve team jerseys and finals memorabilia via desaturated pre-ordering.", icon: "🛍️" },
    { title: "Food Ordering Queue-Bypass", desc: "Smart concession checkout with pickup slots based on seat proximity.", icon: "🍔" },
    { title: "Accessibility Pathing", desc: "Dynamic elevator routing and corridor maps for spectators with mobility requirements.", icon: "♿" },
    { title: "Predictive Analytics", desc: "Ingress and egress models forecasts bottleneck zones before they occur.", icon: "📈" },
    { title: "Telemetry Analytics", desc: "Aggregate noise level peaks, queue waits, and security marshals dispatch history.", icon: "📊" },
    { title: "Crowd Flow Intelligence", desc: "Analyzes CCTV biometric gates load data to adjust turnstile speed margins.", icon: "👥" },
    { title: "Incident Management", desc: "Consolidated logs for safety operators to resolve alerts in real time.", icon: "🛡️" }
  ];

  // ── Theme-aware class tokens ───────────────────────────────
  const pageBg       = isDark ? "bg-[#050814] text-slate-100" : "bg-[#F8FAFC] text-slate-900";
  const headerBg     = isDark
    ? (scrolled ? "bg-[#050814]/88 border-white/6 shadow-2xl backdrop-blur-md" : "bg-transparent border-transparent")
    : (scrolled ? "bg-white/90 border-slate-200/60 shadow-sm backdrop-blur-md" : "bg-transparent border-transparent");
  const navLinkCls   = isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-blue-600 font-semibold";
  const logoTxtCls   = isDark ? "text-white" : "text-slate-900";
  
  const txtH         = isDark ? "text-white" : "text-[#0f172a]";
  const txtSub       = isDark ? "text-slate-300" : "text-[#334155]";
  const txtBody      = isDark ? "text-slate-400" : "text-[#475569] leading-relaxed";
  const txtMono      = isDark ? "text-slate-500" : "text-slate-400";
  
  const cardCls      = isDark
    ? "bg-white/5 border-white/8 hover:border-blue-500/30 shadow-none"
    : "bg-white border border-slate-200/70 shadow-[0_12px_24px_rgba(0,0,0,0.01)] hover:shadow-[0_20px_35px_rgba(0,0,0,0.05)] hover:border-blue-500/30 transition-all duration-300";
  const cardAltCls   = isDark
    ? "bg-slate-900/60 border-white/8 hover:border-blue-500/30"
    : "bg-white border border-slate-200/70 shadow-[0_12px_24px_rgba(0,0,0,0.01)] hover:shadow-[0_20px_35px_rgba(0,0,0,0.05)] hover:border-blue-500/30 transition-all duration-300";
  
  const statBarBg    = isDark ? "bg-blue-950/20 border-white/6" : "bg-gradient-to-r from-blue-50/40 via-white to-blue-50/40 border-y border-slate-200/60";
  const twinPanel    = isDark ? "bg-white/5 border-white/8" : "bg-white border border-slate-200/70 shadow-[0_16px_36px_rgba(0,0,0,0.03)]";
  const footerCls    = "border-t border-slate-800/80 bg-[#0A0E1A]";
  const footerTxt    = "text-slate-400";
  const footerHdg    = "text-white";

  return (
    <div className={`min-h-screen font-sans overflow-x-hidden relative transition-colors duration-300 ${pageBg}`}>
      
      {/* ── LOADING EXPERIENCE SCREEN ── */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-[#050814] flex flex-col items-center justify-center text-white p-6 select-none"
          >
            <div className="max-w-md w-full text-center space-y-6">
              <motion.div
                animate={{ scale: [0.98, 1.02, 0.98] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-3xl font-black tracking-widest text-white uppercase flex items-center justify-center gap-2"
              >
                🏟 ArenaOS <span className="text-blue-500 animate-pulse">AI</span>
              </motion.div>
              
              <div className="space-y-3">
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
                    style={{ width: `${loadingProgress}%` }}
                  />
                </div>
                <div className="flex justify-between font-mono text-[9px] text-slate-400">
                  <span className="uppercase animate-pulse tracking-wider">{loadingSteps[loadingStep]}</span>
                  <span>{Math.floor(loadingProgress)}%</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Blueprint Grid & Telemetry Backdrop lines */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        {/* Subtle grid pattern */}
        <div className={`absolute inset-0 opacity-15 bg-[size:32px_32px] ${
          isDark 
            ? "bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]"
            : "bg-[linear-gradient(rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.03)_1px,transparent_1px)]"
        }`} />
        
        {/* Telemetry connection channels */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <path d="M -100 100 L 400 300 Q 600 100 1200 400" fill="none" stroke={isDark ? "#3B82F6" : "#2563EB"} strokeWidth="1" strokeDasharray="5 15" />
          <path d="M 100 800 Q 300 600 800 900 L 1500 700" fill="none" stroke={isDark ? "#3B82F6" : "#2563EB"} strokeWidth="1" strokeDasharray="10 20" />
        </svg>
      </div>

      {/* ==================== GLOBAL HEADER ==================== */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? `py-4 ${headerBg}` : `py-6 ${headerBg}`
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-4">
          {/* Logo - clickable, cursor pointer, non-draggable */}
          <Link 
            href="/" 
            className="flex items-center gap-2 shrink-0 select-none cursor-pointer group hover:opacity-85 transition-opacity duration-300"
            draggable={false}
            role="link"
            aria-label="Go to ArenaOS Home"
          >
            <span className="text-xl">🏟</span>
            <span className={`text-lg font-black tracking-widest uppercase ${logoTxtCls}`}>
              ArenaOS <span className="text-blue-500">AI</span>
            </span>
          </Link>

          {/* Center Nav Links with animated underlines */}
          <nav className="hidden md:flex items-center gap-6 font-mono text-[11px] font-bold">
            {["Home", "Features", "Architecture", "Technology", "Contact"].map((item) => (
              <a 
                key={item}
                href={item === "Home" ? "#" : `#${item.toLowerCase()}`} 
                className={`relative group py-1 transition-colors ${navLinkCls}`}
              >
                <span>{item}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3 font-mono text-xs font-bold shrink-0">
            <ThemeToggle size="md" />

            <Link
              href="/app"
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-full border border-solid transition-all hover:scale-102 hover:-translate-y-0.5 ${
                isDark
                  ? "border-white/10 text-slate-300 hover:text-white hover:border-white/20 bg-white/5"
                  : "border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 bg-white/70 shadow-sm"
              }`}
            >
              <span>🖥️</span><span className="hidden lg:inline">Operations Console</span>
            </Link>

            <Link
              href="/fan"
              className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition-all shadow-md shadow-blue-500/20 hover:scale-102 hover:-translate-y-0.5"
            >
              <span>🏟️</span><span>Fan Companion</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ==================== SECTION 1: HERO SECTION ==================== */}
      <section className="min-h-screen flex flex-col justify-between pt-32 pb-12 px-6 relative z-10 max-w-7xl mx-auto">
        <div /> {/* Spacer */}
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-8 text-left relative"
          >
            {/* Live System Status Widget (Floating) */}
            <div className="inline-block relative">
              <div className={`p-4 rounded-2xl border border-solid backdrop-blur-md flex items-center gap-4 shadow-xl ${
                isDark ? "bg-[#0A0F24]/90 border-blue-500/25 shadow-blue-500/5" : "bg-white/95 border-slate-200 shadow-slate-200/30"
              }`}>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-[10px] font-mono font-bold text-emerald-500 uppercase tracking-widest">LIVE</span>
                </div>
                <div className="h-4 w-px bg-slate-300/40" />
                <div className="grid grid-cols-3 gap-4 text-left font-mono">
                  <div>
                    <span className="block text-[8px] text-slate-500">CROWD</span>
                    <span className={`text-xs font-bold ${txtH}`}>{liveMetrics.crowd.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="block text-[8px] text-slate-500">AGENTS</span>
                    <span className="text-xs font-bold text-purple-500">{liveMetrics.agents} Active</span>
                  </div>
                  <div>
                    <span className="block text-[8px] text-slate-500">ALERTS</span>
                    <span className={`text-xs font-bold ${liveMetrics.alerts > 0 ? "text-red-500" : "text-emerald-500"}`}>{liveMetrics.alerts}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border border-solid font-mono text-[10px] font-bold uppercase tracking-widest ${
                isDark ? "bg-blue-500/10 border-blue-500/20 text-blue-400" : "bg-blue-100 border-blue-300/60 text-blue-700"
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
                FIFA Smart Stadium Operating System
              </div>
              <h1 className={`text-5xl md:text-7.5xl font-black tracking-tight leading-none ${txtH}`}>
                ArenaOS <span className="text-blue-500">AI</span>
              </h1>
              <h2 className={`text-xl md:text-2xl font-bold leading-snug ${txtSub}`}>
                The Intelligent Operating System powering the next generation of Smart Stadiums.
              </h2>
              <p className={`text-sm max-w-lg leading-relaxed ${txtBody}`}>
                Connecting fans, operators, AI agents and stadium infrastructure into one unified platform. Engineered for real-time digital twins, predictive safety flows, and smart spectator assistance.
              </p>
            </div>

            {/* Premium Buttons with Hover Lift & Glow */}
            <div className="flex flex-wrap gap-4 font-mono text-xs font-bold">
              <Link 
                href="/app" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-1 transform duration-300 text-center cursor-pointer flex items-center justify-center"
              >
                Launch Platform
              </Link>
              <a 
                href="#architecture" 
                className={`border border-solid px-8 py-4 rounded-xl transition-all hover:-translate-y-1 transform duration-300 text-center cursor-pointer ${
                  isDark ? "bg-white/5 hover:bg-white/10 text-white border-white/10" : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300 shadow-sm"
                }`}
              >
                Explore Architecture
              </a>
            </div>
          </motion.div>

          {/* Premium semi-3D stadium illustration */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="lg:col-span-6 flex justify-center relative w-full min-h-[300px] lg:min-h-[400px]"
          >
            <div className="absolute inset-0 bg-blue-500/5 rounded-full blur-[80px]" />
            
            <svg viewBox="0 0 600 400" className="w-full h-full max-w-[480px] lg:max-w-[500px] relative z-10 select-none overflow-visible">
              <defs>
                <radialGradient id="heroGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="pitchGrass" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#059669" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
                <linearGradient id="lightBeam" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#00F0FF" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="tier1Grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#1E293B" />
                  <stop offset="100%" stopColor="#0F172A" />
                </linearGradient>
                <linearGradient id="tier2Grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#334155" />
                  <stop offset="100%" stopColor="#1E293B" />
                </linearGradient>
                <linearGradient id="glowGlow" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
              </defs>

              {/* Ambient Glow */}
              <ellipse cx="300" cy="200" rx="250" ry="150" fill="url(#heroGlow)" />

              {/* Stadium Outer Shadow / Foundation */}
              <ellipse cx="300" cy="212" rx="240" ry="125" fill="rgba(0,0,0,0.35)" />

              {/* Stadium Exterior Wall (3D Ring) */}
              <ellipse cx="300" cy="200" rx="230" ry="120" stroke="#475569" strokeWidth="6" fill="#1E293B" />
              <ellipse cx="300" cy="195" rx="224" ry="114" stroke="#64748B" strokeWidth="2" fill="none" />

              {/* Seating Tier 3 (Outer) */}
              <ellipse cx="300" cy="200" rx="210" ry="105" fill="url(#tier2Grad)" stroke="#0F172A" strokeWidth="1.5" />
              
              {/* Seating exits/dividers */}
              <g stroke="#0F172A" strokeWidth="2.5" opacity="0.6">
                <line x1="300" y1="95" x2="300" y2="70" />
                <line x1="300" y1="305" x2="300" y2="330" />
                <line x1="90" y1="200" x2="115" y2="200" />
                <line x1="510" y1="200" x2="485" y2="200" />
                <line x1="160" y1="120" x2="175" y2="105" />
                <line x1="440" y1="120" x2="425" y2="105" />
                <line x1="160" y1="280" x2="175" y2="295" />
                <line x1="440" y1="280" x2="425" y2="295" />
              </g>

              {/* Seating Tier 2 (Middle) */}
              <ellipse cx="300" cy="200" rx="180" ry="90" fill="url(#tier1Grad)" stroke="#0F172A" strokeWidth="1.5" />
              
              {/* Seating Tier 1 (Inner) */}
              <ellipse cx="300" cy="200" rx="150" ry="75" fill="#1E1B4B" stroke="#0F172A" strokeWidth="1.5" />

              {/* VIP Box Suites (Glowing Glass Panels) */}
              <path d="M 170 160 Q 300 130 430 160 Q 300 135 170 160 Z" fill="rgba(59, 130, 246, 0.15)" stroke="#3B82F6" strokeWidth="1" />
              <path d="M 170 240 Q 300 270 430 240 Q 300 265 170 240 Z" fill="rgba(59, 130, 246, 0.15)" stroke="#3B82F6" strokeWidth="1" />

              {/* Spectator Glow Points (Concentric pulsing circles) */}
              <ellipse cx="300" cy="200" rx="195" ry="97" stroke="url(#glowGlow)" strokeWidth="4" fill="none" strokeDasharray="5 20" className="animate-pulse" />
              <ellipse cx="300" cy="200" rx="165" ry="82" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="3" fill="none" strokeDasharray="8 25" />
              
              {/* Football Pitch (Depth Ovalized) */}
              <ellipse cx="300" cy="200" rx="120" ry="60" fill="url(#pitchGrass)" stroke="#fff" strokeWidth="1.5" />
              
              {/* Pitch center line & circle */}
              <line x1="300" y1="140" x2="300" y2="260" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" />
              <ellipse cx="300" cy="200" rx="25" ry="12.5" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" fill="none" />
              
              {/* Goal boxes */}
              <path d="M 180 185 L 195 188 L 195 212 L 180 215" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" fill="none" />
              <path d="M 420 185 L 405 188 L 405 212 L 420 215" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" fill="none" />

              {/* Technical / media rooms inside stand blocks */}
              <rect x="290" y="86" width="20" height="4" fill="#3B82F6" opacity="0.8" />
              <rect x="290" y="310" width="20" height="4" fill="#3B82F6" opacity="0.8" />

              {/* Parking indicators at corner perimeters */}
              <g fill="#475569" className="opacity-70">
                <rect x="75" y="80" width="20" height="10" rx="1" transform="rotate(-15, 75, 80)" />
                <rect x="500" y="80" width="20" height="10" rx="1" transform="rotate(15, 500, 80)" />
                <text x="85" y="76" fill="#64748B" fontFamily="monospace" fontSize="6">P1</text>
                <text x="510" y="76" fill="#64748B" fontFamily="monospace" fontSize="6">P2</text>
              </g>

              {/* Emergency exits */}
              <g fill="#10B981" fontSize="6" fontWeight="bold" fontFamily="sans-serif">
                <rect x="290" y="66" width="20" height="5" rx="1" fill="#065F46" />
                <text x="300" y="70" textAnchor="middle" fill="#10B981">EXIT</text>
                <rect x="290" y="329" width="20" height="5" rx="1" fill="#065F46" />
                <text x="300" y="333" textAnchor="middle" fill="#10B981">EXIT</text>
              </g>

              {/* Gate Markers */}
              <g fill="#94A3B8" fontFamily="monospace" fontSize="8" fontWeight="bold">
                <text x="300" y="55" textAnchor="middle">GATE 1</text>
                <text x="515" y="204" textAnchor="start">GATE 2</text>
                <text x="300" y="352" textAnchor="middle">GATE 3</text>
                <text x="85" y="204" textAnchor="end">GATE 5</text>
              </g>

              {/* Dynamic floodlights sweep */}
              <g className="opacity-40">
                <polygon points="50,40 220,180 270,220" fill="url(#lightBeam)" />
                <polygon points="550,40 380,180 330,220" fill="url(#lightBeam)" />
                <polygon points="50,360 220,220 270,180" fill="url(#lightBeam)" />
                <polygon points="550,360 380,220 330,180" fill="url(#lightBeam)" />
              </g>

              {/* Floodlight structures */}
              <circle cx="50" cy="40" r="5" fill="#fff" className="animate-pulse" />
              <line x1="50" y1="40" x2="50" y2="80" stroke="#475569" strokeWidth="3" />
              <circle cx="550" cy="40" r="5" fill="#fff" className="animate-pulse" />
              <line x1="550" y1="40" x2="550" y2="80" stroke="#475569" strokeWidth="3" />
              <circle cx="50" cy="360" r="5" fill="#fff" className="animate-pulse" />
              <line x1="50" y1="360" x2="50" y2="320" stroke="#475569" strokeWidth="3" />
              <circle cx="550" cy="360" r="5" fill="#fff" className="animate-pulse" />
              <line x1="550" y1="360" x2="550" y2="320" stroke="#475569" strokeWidth="3" />

              {/* Electronic Scoreboards (LIVE status) */}
              <rect x="265" y="10" width="70" height="24" rx="2" fill="#020617" stroke="#334155" strokeWidth="1" />
              <text x="300" y="18" fill="#EF4444" fontFamily="monospace" fontSize="6.5" textAnchor="middle" fontWeight="bold" className="animate-pulse">⏱ 88&apos; LIVE</text>
              <text x="300" y="25" fill="#10B981" fontFamily="monospace" fontSize="6" textAnchor="middle" fontWeight="bold">ARG 2-1 FRA</text>
              <text x="300" y="31" fill="#94A3B8" fontFamily="monospace" fontSize="4.5" textAnchor="middle">CROWD: 82,413</text>
            </svg>
          </motion.div>
        </div>

        {/* Scroll Indicator (Refined floating arrow) */}
        <div className="flex flex-col items-center gap-1 mt-8 select-none">
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="text-blue-500"
          >
            <ArrowDown className="w-4 h-4" />
          </motion.div>
          <span className={`font-mono text-[9px] tracking-widest uppercase font-bold ${txtMono}`}>
            SCROLL TO EXPLORE
          </span>
        </div>
      </section>

      {/* ==================== SECTION 2: LIVE MATCH EXPERIENCE ==================== */}
      <section className={`border-y border-solid py-8 overflow-hidden relative z-10 ${statBarBg}`}>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-6 gap-6 font-mono text-center">
          <div className="space-y-1">
            <span className={`block text-[9px] uppercase tracking-widest ${txtMono}`}>STADIUM STATUS</span>
            <span className="block text-xs font-bold text-emerald-500 flex items-center justify-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              🟢 Open
            </span>
          </div>
          <div className="space-y-1">
            <span className={`block text-[9px] uppercase tracking-widest ${txtMono}`}>LIVE FIXTURE</span>
            <span className={`block text-xs font-bold ${txtH}`}>⚽ ARG vs FRA</span>
          </div>
          <div className="space-y-1">
            <span className={`block text-[9px] uppercase tracking-widest ${txtMono}`}>MATCH MINUTE</span>
            <span className="block text-xs font-bold text-red-500 animate-pulse">⏱ 72&apos;</span>
          </div>
          <div className="space-y-1">
            <span className={`block text-[9px] uppercase tracking-widest ${txtMono}`}>OCCUPANCY</span>
            <span className={`block text-xs font-bold ${txtH}`}>👥 98.4%</span>
          </div>
          <div className="space-y-1">
            <span className={`block text-[9px] uppercase tracking-widest ${txtMono}`}>ACTIVE AI AGENTS</span>
            <span className="block text-xs font-bold text-purple-500">🤖 14 Online</span>
          </div>
          <div className="space-y-1">
            <span className={`block text-[9px] uppercase tracking-widest ${txtMono}`}>EMERGENCY STATUS</span>
            <span className="block text-xs font-bold text-emerald-500">🚑 Clear</span>
          </div>
        </div>
      </section>

      {/* ==================== SECTION 3: STADIUM SERVICE MAP ==================== */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className={`w-full ${isDark ? "bg-transparent" : "bg-white"} py-14 border-b border-solid ${isDark ? "border-transparent" : "border-slate-200/50"}`}
      >
        <section className="px-6 relative z-10 max-w-7xl mx-auto space-y-10">
          <div className="text-center space-y-5 max-w-2xl mx-auto">
            <span className="text-xs font-mono font-bold text-blue-500 uppercase tracking-widest block">INTERACTIVE PLATFORM CHECKPOINT</span>
            <h2 className={`text-3xl md:text-5xl font-black tracking-tight ${txtH}`}>
              Stadium Service Map
            </h2>
            <div className="w-12 h-1 bg-blue-600 mx-auto rounded-full mt-2" />
            <p className={`text-sm leading-relaxed ${txtBody}`}>
              Click on the service cards below to visualize and highlight active AI operations zones within the stadium top view blueprint.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Cards */}
            <div className="lg:col-span-3 flex flex-col space-y-4">
              {[
                { key: "food", title: "🍔 Food Courts", desc: "Proximity concession pre-ordering loops. Highlight east & west service courts." },
                { key: "parking", title: "🚗 Parking Lots", desc: "Biometric lot space bookings. Highlight external parking access regions." },
                { key: "gates", title: "🚪 Entry Gates", desc: "Turnstiles ingress throughput control. Highlight North & South perimeter arches." },
                { key: "security", title: "🛡 Security Perimeter", desc: "CCTV safety scanner zones audit. Highlight restricted boundary stands." }
              ].map((card) => {
                const isActive = selectedServiceZone === card.key;
                return (
                  <button 
                    key={card.key} 
                    onClick={() => setSelectedServiceZone(card.key)}
                    className={`text-left border border-solid rounded-2xl p-5 space-y-2 transition-all duration-300 relative overflow-hidden cursor-pointer select-none ${
                      isActive 
                        ? "bg-gradient-to-br from-blue-600/10 to-indigo-600/10 border-blue-500 shadow-md shadow-blue-500/10 scale-102" 
                        : cardCls
                    }`}
                  >
                    <h4 className={`text-xs font-extrabold uppercase font-mono ${isActive ? "text-blue-500" : txtH}`}>{card.title}</h4>
                    <p className={`text-[11px] leading-relaxed ${txtBody}`}>{card.desc}</p>
                  </button>
                );
              })}
            </div>

            {/* Center Stadium top-view interactive representation */}
            <div className="lg:col-span-6 flex justify-center relative aspect-square items-center">
              <div className="absolute inset-0 bg-blue-500/5 rounded-full blur-[80px]" />
              
              <svg viewBox="0 0 500 500" className="w-full h-full max-w-[380px] overflow-visible">
                <defs>
                  <linearGradient id="mapPitch" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#047857" stopOpacity="0.05" />
                  </linearGradient>
                </defs>

                {/* Outer concentric shell */}
                <ellipse cx="250" cy="250" rx="200" ry="110" stroke={isDark ? "rgba(255,255,255,0.06)" : "rgba(15,23,42,0.06)"} strokeWidth="10" fill="none" />
                <ellipse cx="250" cy="250" rx="180" ry="90" stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(15,23,42,0.1)"} strokeWidth="2" fill="none" />
                
                {/* Seating Sectors highlight logic */}
                {/* North Stand */}
                <path d="M 120 180 Q 250 120 380 180 Q 250 140 120 180 Z" 
                  fill={selectedServiceZone === "navigation" ? "rgba(59, 130, 246, 0.4)" : selectedServiceZone === "gates" ? "rgba(245, 158, 11, 0.4)" : "rgba(255,255,255,0.02)"} 
                  stroke={selectedServiceZone === "navigation" || selectedServiceZone === "gates" ? "#3b82f6" : "rgba(255,255,255,0.1)"} 
                  strokeWidth="1.5" 
                  className="transition-all duration-300"
                />
                
                {/* South Stand */}
                <path d="M 120 320 Q 250 380 380 320 Q 250 360 120 320 Z" 
                  fill={selectedServiceZone === "emergency" ? "rgba(239, 68, 68, 0.4)" : selectedServiceZone === "gates" ? "rgba(245, 158, 11, 0.4)" : "rgba(255,255,255,0.02)"} 
                  stroke={selectedServiceZone === "emergency" || selectedServiceZone === "gates" ? "#ef4444" : "rgba(255,255,255,0.1)"} 
                  strokeWidth="1.5"
                  className="transition-all duration-300"
                />

                {/* West Stand */}
                <path d="M 110 190 Q 70 250 110 310 Q 140 250 110 190 Z" 
                  fill={selectedServiceZone === "food" ? "rgba(250, 204, 21, 0.4)" : selectedServiceZone === "security" ? "rgba(239, 68, 68, 0.3)" : "rgba(255,255,255,0.02)"} 
                  stroke={selectedServiceZone === "food" ? "#facc15" : selectedServiceZone === "security" ? "#ef4444" : "rgba(255,255,255,0.1)"} 
                  strokeWidth="1.5"
                  className="transition-all duration-300"
                />

                {/* East Stand */}
                <path d="M 390 190 Q 430 250 390 310 Q 360 250 390 190 Z" 
                  fill={selectedServiceZone === "food" ? "rgba(250, 204, 21, 0.4)" : selectedServiceZone === "crowd" ? "rgba(16, 185, 129, 0.4)" : "rgba(255,255,255,0.02)"} 
                  stroke={selectedServiceZone === "food" ? "#facc15" : selectedServiceZone === "crowd" ? "#10b981" : "rgba(255,255,255,0.1)"} 
                  strokeWidth="1.5"
                  className="transition-all duration-300"
                />

                {/* Stadium Center pitch */}
                <ellipse cx="250" cy="250" rx="90" ry="40" stroke="#10b981" strokeWidth="2" fill="url(#mapPitch)" />
                <circle cx="250" cy="250" r="12" stroke="#10b981" strokeWidth="1.2" fill="none" />
                <line x1="250" y1="210" x2="250" y2="290" stroke="#10b981" strokeWidth="1.2" />

                {/* Highlight marker overlays based on state */}
                {selectedServiceZone === "food" && (
                  <g fill="#EAB308" className="animate-bounce">
                    <circle cx="105" cy="230" r="6" stroke="#fff" strokeWidth="1" />
                    <circle cx="395" cy="270" r="6" stroke="#fff" strokeWidth="1" />
                    <text x="105" y="220" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#EAB308">🍴 F1</text>
                    <text x="395" y="260" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#EAB308">🍴 F2</text>
                  </g>
                )}

                {selectedServiceZone === "parking" && (
                  <g fill="#10B981" className="animate-pulse">
                    <rect x="20" y="230" width="24" height="14" rx="2" stroke="#fff" strokeWidth="1.2" fill="#065f46" />
                    <text x="32" y="240" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#fff">P1</text>
                    <rect x="450" y="230" width="24" height="14" rx="2" stroke="#fff" strokeWidth="1.2" fill="#065f46" />
                    <text x="462" y="240" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#fff">P2</text>
                  </g>
                )}

                {selectedServiceZone === "gates" && (
                  <g fill="#2563EB">
                    <circle cx="250" cy="115" r="7" stroke="#fff" strokeWidth="1" className="animate-ping" />
                    <circle cx="250" cy="115" r="5" stroke="#fff" strokeWidth="1" />
                    <circle cx="250" cy="385" r="7" stroke="#fff" strokeWidth="1" className="animate-ping" />
                    <circle cx="250" cy="385" r="5" stroke="#fff" strokeWidth="1" />
                  </g>
                )}

                {selectedServiceZone === "security" && (
                  <ellipse cx="250" cy="250" rx="180" ry="90" stroke="#EF4444" strokeWidth="3" strokeDasharray="6 6" fill="none" className="animate-pulse" />
                )}

                {selectedServiceZone === "navigation" && (
                  <g stroke="#3B82F6" strokeWidth="2.5" fill="none" className="animate-pulse">
                    <path d="M 250 115 C 210 150 210 250 250 250" strokeDasharray="3 3" />
                    <circle cx="250" cy="250" r="5" fill="#3B82F6" stroke="#fff" strokeWidth="1" />
                  </g>
                )}

                {selectedServiceZone === "crowd" && (
                  <ellipse cx="375" cy="250" rx="30" ry="20" fill="rgba(16, 185, 129, 0.3)" stroke="#10B981" strokeWidth="1.5" className="animate-pulse" />
                )}

                {selectedServiceZone === "medical" && (
                  <g fill="#DC2626" className="animate-bounce">
                    <circle cx="160" cy="160" r="6" stroke="#fff" strokeWidth="1" />
                    <text x="160" y="150" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#EF4444">➕ ER</text>
                  </g>
                )}

                {selectedServiceZone === "emergency" && (
                  <g stroke="#DC2626" strokeWidth="2" fill="none" className="animate-pulse">
                    <line x1="250" y1="360" x2="250" y2="420" strokeDasharray="4 4" />
                    <circle cx="250" cy="420" r="4" fill="#DC2626" />
                  </g>
                )}
              </svg>
            </div>

            {/* Right Cards */}
            <div className="lg:col-span-3 flex flex-col space-y-4">
              {[
                { key: "navigation", title: "📍 Navigation Guides", desc: "Elevation step-free path routes. Highlight accessible escalators loops." },
                { key: "crowd", title: "👥 Crowd Heatmap", desc: "Egress flow density algorithms tracking. Highlight high density sectors." },
                { key: "medical", title: "🚑 Medical Rescue", desc: "First responder coordinates allocation. Highlight emergency response bay." },
                { key: "emergency", title: "🚨 Emergency Egress", desc: "Gate evacuation dispatch override. Highlight safety evacuation lines." }
              ].map((card) => {
                const isActive = selectedServiceZone === card.key;
                return (
                  <button 
                    key={card.key} 
                    onClick={() => setSelectedServiceZone(card.key)}
                    className={`text-left border border-solid rounded-2xl p-5 space-y-2 transition-all duration-300 relative overflow-hidden cursor-pointer select-none ${
                      isActive 
                        ? "bg-gradient-to-br from-blue-600/10 to-indigo-600/10 border-blue-500 shadow-md shadow-blue-500/10 scale-102" 
                        : cardCls
                    }`}
                  >
                    <h4 className={`text-xs font-extrabold uppercase font-mono ${isActive ? "text-blue-500" : txtH}`}>{card.title}</h4>
                    <p className={`text-[11px] leading-relaxed ${txtBody}`}>{card.desc}</p>
                  </button>
                );
              })}
            </div>

          </div>
        </section>
      </motion.div>

      {/* ==================== SECTION 4: ONE PLATFORM ==================== */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        id="experience" 
        className={`w-full ${isDark ? "bg-transparent" : "bg-gradient-to-b from-white via-blue-50/20 to-white"} py-12 border-b border-solid ${isDark ? "border-transparent" : "border-slate-200/50"}`}
      >
        <section className="px-6 relative z-10 max-w-7xl mx-auto space-y-10">
          <div className="text-center space-y-5 max-w-2xl mx-auto">
            <h2 className={`text-3xl md:text-5xl font-black tracking-tight ${txtH}`}>
              One Platform. Two Experiences.
            </h2>
            <div className="w-12 h-1 bg-blue-600 mx-auto rounded-full mt-2" />
            <p className={`text-sm leading-relaxed ${txtBody}`}>
              ArenaOS AI serves both the stadium operator controlling dynamic telemetry, and the fan navigating match day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Fan Experience Card */}
            <motion.div 
              whileHover={{ y: -6, scale: 1.01 }}
              className={`border border-solid p-8 rounded-3xl space-y-6 text-left shadow-lg transition-all group duration-300 relative overflow-hidden ${
                isDark
                  ? "bg-gradient-to-br from-slate-900 to-indigo-950/80 border-white/10 hover:border-blue-500/40"
                  : "bg-white border border-slate-200/70 shadow-[0_16px_36px_rgba(0,0,0,0.02)] hover:shadow-[0_24px_50px_rgba(0,0,0,0.05)] hover:border-blue-500/30 transition-all duration-300"
              }`}
            >
              <div className={`absolute top-0 right-0 p-8 text-9xl font-black pointer-events-none select-none ${isDark ? "opacity-5" : "opacity-[0.03]"}`}>👤</div>
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-blue-500 uppercase tracking-widest block">SPECTATOR SYSTEM</span>
                <h3 className={`text-2xl font-bold ${txtH}`}>👤 Fan Experience</h3>
                <p className={`text-xs leading-relaxed ${txtBody}`}>
                  Empower spectators with smart seat maps, queue wait telemetry, automated digital ticket entry, and AI-powered return navigation to their vehicle.
                </p>
              </div>
              
              <div className={`h-px ${isDark ? "bg-white/10" : "bg-slate-200/60"}`} />

              <ul className={`grid grid-cols-2 gap-3 text-[10px] font-mono ${txtSub}`}>
                <li>✓ Digital ticket entry</li>
                <li>✓ Indoor seat navigation</li>
                <li>✓ AI parking assistant</li>
                <li>✓ Concession pre-ordering</li>
                <li>✓ Queue telemetry checks</li>
                <li>✓ Live match analytics</li>
              </ul>

              <Link href="/fan" className="inline-flex items-center gap-2 bg-blue-600 group-hover:bg-blue-700 text-white font-mono text-xs font-bold py-3 px-6 rounded-xl transition-all shadow-md shadow-blue-500/20 hover:scale-102 transform duration-200">
                Launch Fan Experience <span>➔</span>
              </Link>
            </motion.div>

            {/* Operations Card */}
            <motion.div 
              whileHover={{ y: -6, scale: 1.01 }}
              className={`border border-solid p-8 rounded-3xl space-y-6 text-left shadow-lg transition-all group duration-300 relative overflow-hidden ${
                isDark
                  ? "bg-gradient-to-br from-slate-900 to-blue-950/80 border-white/10 hover:border-blue-500/40"
                  : "bg-white border-slate-200/70 shadow-[0_16px_36px_rgba(0,0,0,0.02)] hover:shadow-[0_24px_50px_rgba(0,0,0,0.05)] hover:border-blue-500/30 transition-all duration-300"
              }`}
            >
              <div className={`absolute top-0 right-0 p-8 text-9xl font-black pointer-events-none select-none ${isDark ? "opacity-5" : "opacity-[0.03]"}`}>🖥️</div>
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-blue-500 uppercase tracking-widest block">OPERATING SYSTEM</span>
                <h3 className={`text-2xl font-bold ${txtH}`}>🖥️ Stadium Operations Center</h3>
                <p className={`text-xs leading-relaxed ${txtBody}`}>
                  Provide security coordinators, paramedics, transit fleets, and stadium directors with unified telemetry metrics, incident overrides, and simulated scenarios.
                </p>
              </div>
              
              <div className={`h-px ${isDark ? "bg-white/10" : "bg-slate-200/60"}`} />

              <ul className={`grid grid-cols-2 gap-3 text-[10px] font-mono ${txtSub}`}>
                <li>✓ Interactive digital twin</li>
                <li>✓ CCTV flow scanners</li>
                <li>✓ Incident overrides log</li>
                <li>✓ Clinic emergency dispatch</li>
                <li>✓ Transit queue rerouting</li>
                <li>✓ Volumetrics dashboard</li>
              </ul>

              <Link href="/app" className="inline-flex items-center gap-2 bg-blue-600 group-hover:bg-blue-700 text-white font-mono text-xs font-bold py-3 px-6 rounded-xl transition-all shadow-md shadow-blue-500/20 hover:scale-102 transform duration-200">
                Launch Operations Center <span>➔</span>
              </Link>
            </motion.div>

          </div>
        </section>
      </motion.div>

      {/* ==================== SECTION 5: ARENAMIND ==================== */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        id="architecture" 
        className={`w-full ${isDark ? "bg-transparent" : "bg-white"} py-12 border-b border-solid ${isDark ? "border-transparent" : "border-slate-200/50"}`}
      >
        <section className="px-6 relative z-10 max-w-7xl mx-auto space-y-10">
          <div className="text-center space-y-5 max-w-2xl mx-auto">
            <h2 className={`text-3xl md:text-5xl font-black tracking-tight ${txtH}`}>
              ArenaMind™ AI Core Architecture
            </h2>
            <div className="w-12 h-1 bg-blue-600 mx-auto rounded-full mt-2" />
            <p className={`text-sm leading-relaxed ${txtBody}`}>
              An orchestrator matching live spectator sensors, turnstile telemetry, and ticket coordinates with dedicated AI agents.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
            
            {/* Agent column left */}
            <div className="lg:col-span-4 space-y-4 relative z-10">
              {[
                { idx: 0, name: "Navigation Agent", desc: "Tracks elevators state and maps wheelchair routes.", icon: <Compass className="w-5 h-5 text-blue-500" /> },
                { idx: 1, name: "Medical Agent", desc: "Coordinates responder dispatches and clinic wait telemetry.", icon: <Activity className="w-5 h-5 text-emerald-500" /> },
                { idx: 2, name: "Security Agent", desc: "Monitors turnstiles gates ingress density alerts.", icon: <Shield className="w-5 h-5 text-red-500" /> },
                { idx: 3, name: "Parking Agent", desc: "Saves vehicle location registry upon turnstile scan.", icon: <MapPin className="w-5 h-5 text-indigo-500" /> }
              ].map((agent) => (
                <motion.div 
                  key={agent.idx} 
                  whileHover={{ y: -4, scale: 1.01 }}
                  onHoverStart={() => setHoveredAgent(agent.idx)}
                  onHoverEnd={() => setHoveredAgent(null)}
                  className={`border border-solid rounded-2xl p-4 flex items-start gap-4 transition-all duration-300 ${cardAltCls} hover:border-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] cursor-pointer`}
                >
                  <span className={`p-2 rounded-xl shrink-0 ${isDark ? "bg-white/5" : "bg-slate-100"}`}>{agent.icon}</span>
                  <div className="space-y-1 text-left">
                    <h4 className={`text-xs font-extrabold ${txtH}`}>{agent.name}</h4>
                    <p className={`text-[10px] leading-relaxed ${txtBody}`}>{agent.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Central Glowing AI Core - orbit rings and neural connections */}
            <div className="lg:col-span-4 flex justify-center relative aspect-square items-center">
              <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-[100px]" />
              
              <div className="w-80 h-80 rounded-full flex items-center justify-center relative">
                {/* Orbit Ring 1 (Outer) */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                  className="absolute inset-0 border border-dashed border-blue-500/20 rounded-full"
                />

                {/* Orbit Ring 2 (Middle) */}
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                  className="absolute w-64 h-64 border border-dashed border-cyan-500/30 rounded-full"
                />

                {/* Orbit Ring 3 (Inner) */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                  className="absolute w-48 h-48 border border-blue-500/40 rounded-full flex items-center justify-center"
                />

                {/* Glowing AI Core Spherical Container */}
                <motion.div 
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="w-36 h-36 rounded-full bg-gradient-to-br from-blue-600/30 to-indigo-600/30 border border-blue-500/60 shadow-[0_0_30px_rgba(59,130,246,0.3)] flex flex-col items-center justify-center z-10"
                >
                  {/* Neural Pulses sphere center */}
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex flex-col items-center justify-center shadow-[inset_0_0_20px_rgba(255,255,255,0.4)]">
                    <span className="text-4xl animate-pulse">🤖</span>
                    <span className="text-[10px] font-mono font-black text-white tracking-widest mt-1">CORE</span>
                  </div>
                </motion.div>
                
                {/* Animated Connection Paths overlay */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-visible">
                  {/* Left connections */}
                  <path 
                    d="M 0 60 Q 100 100 150 140" 
                    fill="none" 
                    stroke={hoveredAgent === 0 ? "#3B82F6" : "rgba(59,130,246,0.2)"} 
                    strokeWidth={hoveredAgent === 0 ? "2.5" : "1.5"} 
                    className="transition-all duration-300"
                  />
                  <path 
                    d="M 0 140 Q 80 160 150 170" 
                    fill="none" 
                    stroke={hoveredAgent === 1 ? "#10B981" : "rgba(59,130,246,0.2)"} 
                    strokeWidth={hoveredAgent === 1 ? "2.5" : "1.5"} 
                    className="transition-all duration-300"
                  />
                  <path 
                    d="M 0 220 Q 80 200 150 200" 
                    fill="none" 
                    stroke={hoveredAgent === 2 ? "#EF4444" : "rgba(59,130,246,0.2)"} 
                    strokeWidth={hoveredAgent === 2 ? "2.5" : "1.5"} 
                    className="transition-all duration-300"
                  />
                  <path 
                    d="M 0 300 Q 100 240 150 220" 
                    fill="none" 
                    stroke={hoveredAgent === 3 ? "#8B5CF6" : "rgba(59,130,246,0.2)"} 
                    strokeWidth={hoveredAgent === 3 ? "2.5" : "1.5"} 
                    className="transition-all duration-300"
                  />
                  
                  {/* Left flow dots */}
                  <circle r="3" className="fill-cyan-400">
                    <animateMotion dur={hoveredAgent === 0 ? "1.5s" : "3.5s"} repeatCount="indefinite" path="M 0 60 Q 100 100 150 140" />
                  </circle>
                  <circle r="3" className="fill-cyan-400">
                    <animateMotion dur={hoveredAgent === 1 ? "1.5s" : "3s"} repeatCount="indefinite" path="M 0 140 Q 80 160 150 170" />
                  </circle>
                  <circle r="3" className="fill-cyan-400">
                    <animateMotion dur={hoveredAgent === 2 ? "1.5s" : "4.5s"} repeatCount="indefinite" path="M 0 220 Q 80 200 150 200" />
                  </circle>

                  {/* Right connections */}
                  <path 
                    d="M 320 140 Q 280 100 400 60" 
                    fill="none" 
                    stroke={hoveredAgent === 4 ? "#EAB308" : "rgba(59,130,246,0.2)"} 
                    strokeWidth={hoveredAgent === 4 ? "2.5" : "1.5"} 
                    className="transition-all duration-300"
                  />
                  <path 
                    d="M 320 170 Q 280 160 400 140" 
                    fill="none" 
                    stroke={hoveredAgent === 5 ? "#10B981" : "rgba(59,130,246,0.2)"} 
                    strokeWidth={hoveredAgent === 5 ? "2.5" : "1.5"} 
                    className="transition-all duration-300"
                  />
                  <path 
                    d="M 320 200 Q 280 200 400 220" 
                    fill="none" 
                    stroke={hoveredAgent === 6 ? "#8B5CF6" : "rgba(59,130,246,0.2)"} 
                    strokeWidth={hoveredAgent === 6 ? "2.5" : "1.5"} 
                    className="transition-all duration-300"
                  />
                  <path 
                    d="M 320 220 Q 280 240 400 300" 
                    fill="none" 
                    stroke={hoveredAgent === 7 ? "#EC4899" : "rgba(59,130,246,0.2)"} 
                    strokeWidth={hoveredAgent === 7 ? "2.5" : "1.5"} 
                    className="transition-all duration-300"
                  />

                  {/* Right flow dots */}
                  <circle r="3" className="fill-cyan-400">
                    <animateMotion dur={hoveredAgent === 4 ? "1.5s" : "4s"} repeatCount="indefinite" path="M 400 60 Q 280 100 320 140" />
                  </circle>
                  <circle r="3" className="fill-cyan-400">
                    <animateMotion dur={hoveredAgent === 5 ? "1.5s" : "3.2s"} repeatCount="indefinite" path="M 400 140 Q 280 160 320 170" />
                  </circle>
                  <circle r="3" className="fill-cyan-400">
                    <animateMotion dur={hoveredAgent === 6 ? "1.5s" : "4.2s"} repeatCount="indefinite" path="M 400 220 Q 280 200 320 200" />
                  </circle>
                </svg>
              </div>
            </div>

            {/* Agent column right */}
            <div className="lg:col-span-4 space-y-4 relative z-10">
              {[
                { idx: 4, name: "Food Agent", desc: "Pre-order queues wait metrics calculations.", icon: "🍔" },
                { idx: 5, name: "Crowd Agent", desc: "Egress flow density algorithms.", icon: "👥" },
                { idx: 6, name: "Accessibility Agent", desc: "Biometric turnstile check-in assistance.", icon: "♿" },
                { idx: 7, name: "Notification Agent", desc: "Constructs prioritized telemetry logs feeds.", icon: "🔔" }
              ].map((agent) => (
                <motion.div 
                  key={agent.idx} 
                  whileHover={{ y: -4, scale: 1.01 }}
                  onHoverStart={() => setHoveredAgent(agent.idx)}
                  onHoverEnd={() => setHoveredAgent(null)}
                  className={`border border-solid rounded-2xl p-4 flex items-start gap-4 transition-all duration-300 ${cardAltCls} hover:border-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] cursor-pointer`}
                >
                  <span className={`text-lg p-2 rounded-xl shrink-0 ${isDark ? "bg-white/5" : "bg-slate-100"}`}>{agent.icon}</span>
                  <div className="space-y-1 text-left">
                    <h4 className={`text-xs font-extrabold ${txtH}`}>{agent.name}</h4>
                    <p className={`text-[10px] leading-relaxed ${txtBody}`}>{agent.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </motion.div>

      {/* ==================== SECTION 6: DIGITAL TWIN INTERACTIVE VIEWER ==================== */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className={`w-full ${isDark ? "bg-transparent" : "bg-gradient-to-b from-white via-slate-100/40 to-white"} py-12 border-b border-solid ${isDark ? "border-transparent" : "border-slate-200/50"}`}
      >
        <section className="px-6 relative z-10 max-w-7xl mx-auto space-y-10">
          <div className="text-center space-y-5 max-w-2xl mx-auto">
            <h2 className={`text-3xl md:text-5xl font-black tracking-tight ${txtH}`}>
              Dynamic Layers Digital Twin
            </h2>
            <div className="w-12 h-1 bg-blue-600 mx-auto rounded-full mt-2" />
            <p className={`text-sm leading-relaxed ${txtBody}`}>
              Select interactive overlays to view how the ArenaOS digital twin maps telemetry metrics in real-time.
            </p>
          </div>

          {/* Premium operations chips */}
          <div className="flex flex-wrap justify-center gap-3 font-mono text-[10px] font-bold max-w-4xl mx-auto select-none">
            {[
              { label: "👥 Crowd Flow", key: "crowd" },
              { label: "🚪 Entry Gates", key: "gates" },
              { label: "🚗 Parking Lots", key: "parking" },
              { label: "🚑 Medical Units", key: "medical" },
              { label: "🛡 Security Guards", key: "security" },
              { label: "🍔 Concessions", key: "food" },
              { label: "⚡ Utilities", key: "utilities" },
              { label: "🚨 Emergency Routes", key: "emergency" },
              { label: "♿ Accessibility", key: "accessibility" }
            ].map((tab) => {
              const isActive = activeLayer === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveLayer(tab.key as LayerId)}
                  className={`px-4.5 py-2.5 rounded-full border border-solid transition-all cursor-pointer font-bold duration-200 transform hover:scale-104 hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59,130,246,0.25)] ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 border-blue-500 text-white shadow-md shadow-blue-500/20"
                      : isDark
                        ? "bg-white/5 border-white/10 text-slate-400 hover:border-slate-500 hover:text-slate-200"
                        : "bg-white border-slate-200 text-slate-600 hover:border-slate-400 hover:text-slate-800 shadow-sm"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-solid p-8 rounded-3xl ${twinPanel}`}>
            <div className="lg:col-span-8 flex justify-center relative aspect-video overflow-hidden bg-black/5 rounded-2xl border border-white/5">
              <svg viewBox="0 0 600 350" className="w-full h-full max-w-2xl overflow-visible">
                <defs>
                  <linearGradient id="pitchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#047857" stopOpacity="0.03" />
                  </linearGradient>
                  <linearGradient id="stadiumGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="#6366F1" stopOpacity="0.03" />
                  </linearGradient>
                  {/* Neon pulsing gradients */}
                  <linearGradient id="scanBeam" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Tech grid coordinates corner labels */}
                <g className="opacity-40 font-mono text-[8px]" fill={isDark ? "#94A3B8" : "#64748B"}>
                  <text x="35" y="40">SYS_TWIN_OK: 98.4%</text>
                  <text x="35" y="52">GPS: 34.5294 N, 58.5301 W</text>
                  <text x="475" y="40">REFRESH: 800MS</text>
                  <text x="475" y="52">LAYERS: ACTIVE</text>
                </g>

                {/* AI Scan line sweeps */}
                <line x1="80" y1="50" x2="520" y2="50" stroke="#00F0FF" strokeWidth="1" opacity="0.3" className="animate-pulse" />
                <line x1="80" y1="300" x2="520" y2="300" stroke="#00F0FF" strokeWidth="1" opacity="0.3" className="animate-pulse" />

                {/* Stadium outer outline */}
                <ellipse cx="300" cy="175" rx="220" ry="110" stroke={isDark ? "#334155" : "#94A3B8"} strokeWidth="2" fill="url(#stadiumGrad)" />
                <ellipse cx="300" cy="175" rx="190" ry="90" stroke={isDark ? "#1e293b" : "#cbd5e1"} strokeWidth="10" fill="none" className="opacity-40" />
                
                {/* Sector Dividing Lines */}
                <g stroke={isDark ? "rgba(255,255,255,0.06)" : "rgba(30,41,59,0.08)"} strokeWidth="1.5">
                  <line x1="300" y1="65" x2="300" y2="85" />
                  <line x1="300" y1="265" x2="300" y2="285" />
                  <line x1="80" y1="175" x2="110" y2="175" />
                  <line x1="520" y1="175" x2="490" y2="175" />
                  <line x1="145" y1="95" x2="165" y2="110" />
                  <line x1="455" y1="95" x2="435" y2="110" />
                  <line x1="145" y1="255" x2="165" y2="240" />
                  <line x1="455" y1="255" x2="435" y2="240" />
                </g>

                {/* Pitch center line & circle */}
                <ellipse cx="300" cy="175" rx="90" ry="40" stroke="#10B981" strokeWidth="2" fill="url(#pitchGrad)" />
                <line x1="300" y1="135" x2="300" y2="215" stroke="#10B981" strokeWidth="1.5" />
                <ellipse cx="300" cy="175" rx="20" ry="9" stroke="#10B981" strokeWidth="1.5" fill="none" />

                {/* moving telemetry particles / flow arrows */}
                <g opacity="0.8">
                  <circle cx="210" cy="155" r="1.5" fill="#3B82F6" className="animate-ping" />
                  <circle cx="390" cy="195" r="1.5" fill="#10B981" className="animate-ping" />
                  <circle cx="300" cy="155" r="1.5" fill="#EF4444" className="animate-ping" />
                </g>

                {/* Interactive Dynamic Layer Overlays */}
                <AnimatePresence mode="wait">
                  {activeLayer === "crowd" && (
                    <g key="crowd" className="animate-fade-in">
                      {/* Dynamic crowd heatmap */}
                      <ellipse cx="140" cy="130" rx="30" ry="15" fill="rgba(239, 68, 68, 0.45)" className="animate-pulse" />
                      <ellipse cx="450" cy="200" rx="40" ry="20" fill="rgba(245, 158, 11, 0.4)" className="animate-pulse" />
                      {/* Moving people dots */}
                      <circle cx="130" cy="130" r="2.5" fill="#fff" />
                      <circle cx="150" cy="125" r="2.5" fill="#fff" />
                      <circle cx="440" cy="195" r="2.5" fill="#fff" />
                      <circle cx="460" cy="205" r="2.5" fill="#fff" />
                      {/* Wayfinding arrows */}
                      <path d="M 230 110 L 250 110 L 245 105" stroke="#60A5FA" strokeWidth="1.5" fill="none" />
                      <path d="M 370 240 L 350 240 L 355 245" stroke="#60A5FA" strokeWidth="1.5" fill="none" />
                    </g>
                  )}

                  {activeLayer === "gates" && (
                    <g key="gates" className="animate-fade-in">
                      {/* Entry gates scanners */}
                      <circle cx="300" cy="75" r="6" fill="#10B981" stroke="#fff" strokeWidth="1.2" />
                      <circle cx="300" cy="275" r="6" fill="#10B981" stroke="#fff" strokeWidth="1.2" />
                      {/* AI scan pulses */}
                      <circle cx="300" cy="75" r="14" fill="none" stroke="#10B981" strokeWidth="1" className="animate-ping" />
                      <circle cx="300" cy="275" r="14" fill="none" stroke="#10B981" strokeWidth="1" className="animate-ping" />
                      {/* Flow lines */}
                      <line x1="300" y1="40" x2="300" y2="70" stroke="#10B981" strokeWidth="2" strokeDasharray="3 3" />
                      <line x1="300" y1="310" x2="300" y2="280" stroke="#10B981" strokeWidth="2" strokeDasharray="3 3" />
                    </g>
                  )}

                  {activeLayer === "parking" && (
                    <g key="parking" className="animate-fade-in">
                      {/* Parking occupancy indicators */}
                      <circle cx="85" cy="85" r="3" fill="#EF4444" />
                      <circle cx="95" cy="80" r="3" fill="#10B981" />
                      <circle cx="105" cy="75" r="3" fill="#10B981" />
                      <circle cx="495" cy="85" r="3" fill="#EF4444" />
                      <circle cx="505" cy="80" r="3" fill="#EF4444" />
                      {/* Parking guidance wayfinding */}
                      <text x="130" y="70" fill="#3B82F6" fontFamily="sans-serif" fontSize="7" fontWeight="bold">← PARKING FULL</text>
                      <text x="470" y="70" fill="#10B981" fontFamily="sans-serif" fontSize="7" fontWeight="bold">PARKING FREE →</text>
                    </g>
                  )}

                  {activeLayer === "medical" && (
                    <g key="medical" className="animate-fade-in">
                      {/* Medical responders / Ambulance location */}
                      <circle cx="150" cy="140" r="6" fill="#DC2626" stroke="#fff" strokeWidth="1" className="animate-bounce" />
                      <text x="150" y="130" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#EF4444">➕ responder 1</text>
                      <circle cx="450" cy="210" r="6" fill="#DC2626" stroke="#fff" strokeWidth="1" className="animate-bounce" />
                      <text x="450" y="200" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#EF4444">➕ responder 2</text>
                    </g>
                  )}

                  {activeLayer === "security" && (
                    <g key="security" className="animate-fade-in">
                      {/* Restricted zones red bounds */}
                      <ellipse cx="300" cy="175" rx="140" ry="60" stroke="#EF4444" strokeWidth="2" strokeDasharray="5 5" fill="none" />
                      {/* Camera icons with light cones */}
                      <polygon points="120,110 160,150 180,130" fill="rgba(59,130,246,0.15)" />
                      <circle cx="120" cy="110" r="4" fill="#3B82F6" />
                      <polygon points="480,110 440,150 420,130" fill="rgba(59,130,246,0.15)" />
                      <circle cx="480" cy="110" r="4" fill="#3B82F6" />
                      {/* Security guards */}
                      <circle cx="210" cy="120" r="3" fill="#3B82F6" stroke="#fff" strokeWidth="0.5" />
                      <circle cx="390" cy="230" r="3" fill="#3B82F6" stroke="#fff" strokeWidth="0.5" />
                    </g>
                  )}

                  {activeLayer === "food" && (
                    <g key="food" className="animate-fade-in">
                      {/* Food courts indicators */}
                      <circle cx="200" cy="120" r="5" fill="#F59E0B" stroke="#fff" strokeWidth="1" />
                      <text x="200" y="112" fontSize="7" fill="#F59E0B" textAnchor="middle" fontWeight="bold">🍔 Stall B1</text>
                      <circle cx="400" cy="230" r="5" fill="#F59E0B" stroke="#fff" strokeWidth="1" />
                      <text x="400" y="222" fontSize="7" fill="#F59E0B" textAnchor="middle" fontWeight="bold">🍔 Stall E4</text>
                    </g>
                  )}

                  {activeLayer === "utilities" && (
                    <g key="utilities" className="animate-fade-in">
                      {/* Utilities grid overlay */}
                      <ellipse cx="300" cy="175" rx="150" ry="70" stroke="#6366F1" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
                      <path d="M 150 175 L 300 245 L 450 175" fill="none" stroke="#00F0FF" strokeWidth="1.5" strokeDasharray="4 4" className="animate-flow-line" />
                    </g>
                  )}

                  {activeLayer === "emergency" && (
                    <g key="emergency" className="animate-fade-in">
                      {/* Flashing alerts */}
                      <circle cx="300" cy="175" r="20" fill="none" stroke="#EF4444" strokeWidth="2" className="animate-ping" />
                      {/* Evacuation paths */}
                      <path d="M 300 175 Q 220 220 100 200" fill="none" stroke="#EF4444" strokeWidth="3.5" strokeDasharray="6 4" className="animate-pulse" />
                      <path d="M 300 175 Q 380 220 500 200" fill="none" stroke="#EF4444" strokeWidth="3.5" strokeDasharray="6 4" className="animate-pulse" />
                      {/* Fire exit tags */}
                      <text x="90" y="190" fill="#EF4444" fontSize="8" fontWeight="bold">🚨 EXIT</text>
                      <text x="510" y="190" fill="#EF4444" fontSize="8" fontWeight="bold">🚨 EXIT</text>
                    </g>
                  )}

                  {activeLayer === "accessibility" && (
                    <g key="accessibility" className="animate-fade-in">
                      {/* Step-free path guides */}
                      <path d="M 300 175 C 260 210 240 240 250 280" fill="none" stroke="#8B5CF6" strokeWidth="2.5" strokeDasharray="4 2" />
                      <circle cx="250" cy="280" r="5" fill="#8B5CF6" stroke="#fff" strokeWidth="1" />
                      <text x="250" y="293" fill="#8B5CF6" fontSize="7" fontWeight="bold" textAnchor="middle">♿ ELEVATOR</text>
                    </g>
                  )}
                </AnimatePresence>
              </svg>
            </div>

            <div className="lg:col-span-4 text-left space-y-4">
              <h3 className={`text-xl font-bold capitalize ${txtH}`}>{activeLayer} Overlay Telemetry</h3>
              <p className={`text-xs leading-relaxed ${txtBody}`}>
                {activeLayer === "crowd" && "CCTV density sensors indicate high load near Gate 3 (Main Public Entrance). Dynamic turnstile speeds adjusted."}
                {activeLayer === "gates" && "Entry gate scanners running checks at 100% capacity. Flow logs synchronized."}
                {activeLayer === "parking" && "VIP Parking Area locked. Exit queue load rates mapped to parking assistant."}
                {activeLayer === "medical" && "Paramedic dispatches mapped. responder unit 3 dispatched to corridor G."}
                {activeLayer === "security" && "Biometric gate turnstile scanner operational. Gate ingress telemetry checked."}
                {activeLayer === "food" && "Food Court Section 4 queue bypass active. wait times under 3 minutes."}
                {activeLayer === "utilities" && "Biometric gate energy load and fiber telemetry running at 98.4%."}
                {activeLayer === "emergency" && "Corridor redirection triggers activated. exit route redirected away from Gate 2 Exit Choke Points."}
                {activeLayer === "accessibility" && "Accessibility dispatcher active. Elevators checked at peak match loads."}
              </p>
              <div className={`h-px ${isDark ? "bg-white/10" : "bg-slate-200"}`} />
              <div className="font-mono text-[10px] text-blue-500 space-y-1">
                <div>STATUS: ACTIVE</div>
                <div>TELEMETRY REFRESH RATE: 800ms</div>
              </div>
            </div>
          </div>
        </section>
      </motion.div>

      {/* ==================== SECTION 7: FEATURES GRID ==================== */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        id="features" 
        className={`w-full ${isDark ? "bg-transparent" : "bg-white"} py-14 border-b border-solid ${isDark ? "border-transparent" : "border-slate-200/50"}`}
      >
        <section className="px-6 relative z-10 max-w-7xl mx-auto space-y-10">
          <div className="text-center space-y-5 max-w-2xl mx-auto">
            <h2 className={`text-3xl md:text-5xl font-black tracking-tight ${txtH}`}>
              Platform Capabilities
            </h2>
            <div className="w-12 h-1 bg-blue-600 mx-auto rounded-full mt-2" />
            <p className={`text-sm leading-relaxed ${txtBody}`}>
              A comprehensive suite of tools built for Next-Gen Smart Stadium Ingress &amp; Egress operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {features.map((feat, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ y: -5, scale: 1.02 }}
                className={`border border-solid p-6 rounded-2xl text-left space-y-3 transition-all duration-300 ${cardCls}`}
              >
                <span className="text-2xl block">{feat.icon}</span>
                <h4 className={`text-sm font-bold leading-tight ${txtH}`}>{feat.title}</h4>
                <p className={`text-[11px] leading-relaxed ${txtBody}`}>{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </motion.div>

      {/* ==================== SECTION 8: HOW AI WORKS ==================== */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className={`w-full ${isDark ? "bg-transparent" : "bg-gradient-to-b from-white via-blue-50/20 to-white"} py-12 border-b border-solid ${isDark ? "border-transparent" : "border-slate-200/50"}`}
      >
        <section className="px-6 relative z-10 max-w-7xl mx-auto space-y-10">
          <div className="text-center space-y-5 max-w-2xl mx-auto">
            <h2 className={`text-3xl md:text-5xl font-black tracking-tight ${txtH}`}>
              Platform Workflow
            </h2>
            <div className="w-12 h-1 bg-blue-600 mx-auto rounded-full mt-2" />
            <p className={`text-sm leading-relaxed ${txtBody}`}>
              Real-time pipeline routing data from biometric turnstiles up to the spectator digital ticket wallet pass.
            </p>
          </div>

          {/* Vertical connected workflow */}
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4 font-mono text-[10px] font-bold items-start relative max-w-4xl mx-auto">
            {[
              { step: "1. Spectator", desc: "Enters Gate 3", icon: "👤" },
              { step: "2. Sensors", desc: "Turnstile load scan", icon: "📡" },
              { step: "3. ArenaMind", desc: "Data orchestrator", icon: "🧠" },
              { step: "4. AI Agents", desc: "Route optimizations", icon: "🤖" },
              { step: "5. Operations", desc: "Telemetry logs updated", icon: "🖥️" },
              { step: "6. Dispatch", desc: "Emergency redirection", icon: "⚡" },
              { step: "7. Fan Wallet", desc: "Wallet pass routing", icon: "📱" }
            ].map((item, idx) => {
              const isActive = activeStep === idx;
              return (
                <div key={idx} className={`flex flex-col items-center p-4 rounded-xl border border-solid transition-all duration-500 relative ${
                  isActive
                    ? "bg-blue-600/10 border-blue-500 text-blue-500 scale-105"
                    : isDark
                      ? "bg-white/5 border-white/10 text-slate-500 opacity-60"
                      : "bg-white border border-slate-200/80 text-slate-700 shadow-[0_8px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.05)] hover:border-blue-400/50"
                }`}>
                  <span className="text-xl block mb-2">{item.icon}</span>
                  <span className="block text-[9px] uppercase tracking-wider mb-1">{item.step}</span>
                  <span className={`text-[10px] text-center leading-snug ${txtBody}`}>{item.desc}</span>
                  
                  {/* Connector line (desktop only) - strengthened */}
                  {idx < 6 && (
                    <div className={`hidden md:block absolute top-1/2 -right-3 w-6 h-[2px] z-0 ${isDark ? "bg-white/15" : "bg-blue-400"}`} />
                  )}
              </div>
            );
          })}
        </div>
      </section>
      </motion.div>

      {/* ==================== SECTION 9: TECHNOLOGY ==================== */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className={`w-full ${isDark ? "bg-transparent" : "bg-white"} py-14 border-b border-solid ${isDark ? "border-transparent" : "border-slate-200/50"}`}
      >
        <section className="px-6 relative z-10 max-w-7xl mx-auto space-y-10">
          <div className="text-center space-y-5 max-w-2xl mx-auto">
            <h2 className={`text-3xl md:text-5xl font-black tracking-tight ${txtH}`}>
              Architecture &amp; Integrations
            </h2>
            <div className="w-12 h-1 bg-blue-600 mx-auto rounded-full mt-2" />
            <p className={`text-sm leading-relaxed ${txtBody}`}>
              Built on enterprise technology with future production interfaces for camera telemetry networks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`border border-solid p-6 rounded-2xl text-left space-y-3 ${cardAltCls}`}>
              <span className="text-[10px] font-mono font-bold text-blue-500 uppercase tracking-widest block">FRONTEND STACK</span>
              <h4 className={`text-lg font-bold ${txtH}`}>Next.js Framework</h4>
              <p className={`text-xs leading-relaxed ${txtBody}`}>
                Provides dynamic Server components, fast static generation, and high-performance loading parameters for turnstile maps.
              </p>
            </div>
            <div className={`border border-solid p-6 rounded-2xl text-left space-y-3 ${cardAltCls}`}>
              <span className="text-[10px] font-mono font-bold text-purple-500 uppercase tracking-widest block">AI ORCHESTRATION</span>
              <h4 className={`text-lg font-bold ${txtH}`}>Gemini &amp; LangGraph</h4>
              <p className={`text-xs leading-relaxed ${txtBody}`}>
                Orchestrates multiple specialized AI agents, utilizing RAG pipelines to return route directions during match day.
              </p>
            </div>
            <div className={`border border-solid p-6 rounded-2xl text-left space-y-3 ${cardAltCls}`}>
              <span className="text-[10px] font-mono font-bold text-amber-500 uppercase tracking-widest block">FUTURE INTEGRATIONS</span>
              <h4 className="text-lg font-bold text-amber-500">CCTV Computer Vision</h4>
              <p className={`text-xs leading-relaxed ${txtBody}`}>
                Clearly labeled for future Vertex AI Vision configurations, live CCTV processing, and IoT sensor integration as future production integrations—not features already implemented.
              </p>
            </div>
          </div>
        </section>
      </motion.div>

      {/* ==================== SECTION 10: CHOOSE EXPERIENCE (CTA) ==================== */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        id="contact" 
        className={`w-full ${isDark ? "bg-transparent" : "bg-gradient-to-b from-white to-[#F8FAFC]"} py-12 border-b border-solid ${isDark ? "border-transparent" : "border-slate-200/50"}`}
      >
        <section className="px-6 relative z-10 max-w-7xl mx-auto space-y-10">
          <div className="text-center space-y-5 max-w-2xl mx-auto">
            <h2 className={`text-3xl md:text-6xl font-black tracking-tight ${txtH}`}>
              Choose Your Experience
            </h2>
            <div className="w-12 h-1 bg-blue-600 mx-auto rounded-full mt-2" />
            <p className={`text-sm leading-relaxed ${txtBody}`}>
              Enter the future of smart stadiums today. Select your spectator card or operations panel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Spectator Experience Card */}
            <Link href="/fan" className={`border border-solid p-8 rounded-3xl text-left transition-all flex flex-col justify-between h-80 shadow-md group cursor-pointer ${
              isDark
                ? "bg-gradient-to-br from-slate-900 to-indigo-950 border-white/10 hover:border-blue-500/40"
                : "bg-white border border-slate-200/70 shadow-[0_16px_36px_rgba(0,0,0,0.02)] hover:shadow-[0_24px_50px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 hover:border-blue-500/40 transition-all duration-300"
            }`}>
              <div className="space-y-4">
                <span className="text-5xl block">👤</span>
                <h3 className={`text-2xl font-bold group-hover:text-blue-500 transition-colors ${txtH}`}>Spectator Experience</h3>
                <p className={`text-xs leading-relaxed ${txtBody}`}>
                  Access your ticket wallet, check queue loads, and retrieve AI-powered parking spots return directions.
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-blue-500 group-hover:underline">
                Enter Fan Portal ➔
              </span>
            </Link>

            {/* Operations Card */}
            <Link href="/app" className={`border border-solid p-8 rounded-3xl text-left transition-all flex flex-col justify-between h-80 shadow-md group cursor-pointer ${
              isDark
                ? "bg-gradient-to-br from-slate-900 to-blue-950 border-white/10 hover:border-blue-500/40"
                : "bg-white border border-slate-200/70 shadow-[0_16px_36px_rgba(0,0,0,0.02)] hover:shadow-[0_24px_50px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 hover:border-blue-500/40 transition-all duration-300"
            }`}>
              <div className="space-y-4">
                <span className="text-5xl block">🖥️</span>
                <h3 className={`text-2xl font-bold group-hover:text-blue-500 transition-colors ${txtH}`}>Operations Command</h3>
                <p className={`text-xs leading-relaxed ${txtBody}`}>
                  Monitor 3D digital twins, toggle heatmaps layers, dispatch clinics, and trigger incident simulation overrides.
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-blue-500 group-hover:underline">
                Enter Operations Center ➔
              </span>
            </Link>
          </div>
        </section>
      </motion.div>

      {/* ==================== FOOTER ==================== */}
      <footer className={`border-t border-solid py-12 relative z-10 ${footerCls}`}>
        <div className={`max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 text-left text-xs ${footerTxt}`}>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">🏟</span>
              <span className={`text-lg font-black tracking-widest uppercase ${footerHdg}`}>
                ArenaOS <span className="text-blue-500">AI</span>
              </span>
            </div>
            <p className="leading-relaxed">
              Official landing page for the next-generation FIFA Smart Stadium Operating System.
            </p>
            <div className="text-[10px] text-slate-500 font-mono mt-2">
              Google Build with AI Project
            </div>
            <div className="flex gap-4 pt-2">
              {/* Social icons */}
              <a href="#" className="hover:text-blue-500 transition-colors">𝕏</a>
              <a href="#" className="hover:text-blue-500 transition-colors">🐙 GitHub</a>
              <a href="#" className="hover:text-blue-500 transition-colors">💬 Discord</a>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className={`font-bold font-mono uppercase ${footerHdg}`}>Platforms</h4>
            <ul className="space-y-1">
              <li><Link href="/fan" className="transition-colors hover:text-white">Fan Experience Portal</Link></li>
              <li><Link href="/app" className="transition-colors hover:text-white">Operations Dashboard</Link></li>
              <li><Link href="/app/scenarios" className="transition-colors hover:text-white">Simulation Center</Link></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className={`font-bold font-mono uppercase ${footerHdg}`}>Architecture</h4>
            <ul className="space-y-1">
              <li><a href="#architecture" className="transition-colors hover:text-white">ArenaMind™ Core</a></li>
              <li><a href="#features" className="transition-colors hover:text-white">Capability Registry</a></li>
              <li><a href="#" className="transition-colors hover:text-white">Documentation API</a></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className={`font-bold font-mono uppercase ${footerHdg}`}>Platform Info</h4>
            <p className="leading-relaxed">
              Built for FIFA Smart Stadium Innovation. Standardizing turnstiles, clinic responders, and concessions databases.
            </p>
            <p className="text-[10px] text-slate-500 font-mono mt-2">© 2026 ArenaOS. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
