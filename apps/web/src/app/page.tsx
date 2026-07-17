"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useTheme } from "@/features/app/providers/ThemeProvider";

type LayerId = "crowd" | "parking" | "medical" | "security" | "food" | "utilities" | "emergency";

export default function LandingPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeLayer, setActiveLayer] = useState<LayerId>("crowd");
  const [scrolled, setScrolled] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Workflow steps cyclist
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 7);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Header scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
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
    ? (scrolled ? "bg-[#050814]/88 border-white/6" : "bg-transparent border-transparent")
    : (scrolled ? "bg-white/95 border-slate-200/60 shadow-sm" : "bg-transparent border-transparent");
  const navLinkCls   = isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-blue-600 font-semibold";
  const logoTxtCls   = isDark ? "text-white" : "text-slate-900";
  // Headings / body / muted text
  const txtH         = isDark ? "text-white" : "text-[#0f172a]";
  const txtSub       = isDark ? "text-slate-300" : "text-[#334155]";
  const txtBody      = isDark ? "text-slate-400" : "text-[#475569] leading-relaxed";
  const txtMono      = isDark ? "text-slate-500" : "text-slate-500";
  // Cards with premium floating elevation, crisp borders & hover translation in Light Mode
  const cardCls      = isDark
    ? "bg-white/5 border-white/8 hover:border-blue-500/30 shadow-none"
    : "bg-white border border-slate-200/70 shadow-[0_12px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_35px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:border-blue-500/40 transition-all duration-300";
  const cardAltCls   = isDark
    ? "bg-slate-900/60 border-white/8 hover:border-blue-500/30"
    : "bg-white border border-slate-200/70 shadow-[0_12px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_35px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:border-blue-500/40 transition-all duration-300";
  // Stat bar
  const statBarBg    = isDark ? "bg-blue-950/20 border-white/6" : "bg-gradient-to-r from-blue-50/40 via-white to-blue-50/40 border-y border-slate-200/60";
  // Digital twin viewer panel
  const twinPanel    = isDark ? "bg-white/5 border-white/8" : "bg-white border border-slate-200/70 shadow-[0_16px_36px_rgba(0,0,0,0.03)]";
  // Dark footer enforced globally in both themes
  const footerCls    = "border-t border-slate-800/80 bg-[#0A0E1A]";
  const footerTxt    = "text-slate-400";
  const footerHdg    = "text-white";

  return (
    <div className={`min-h-screen font-sans overflow-x-hidden relative transition-colors duration-300 ${pageBg}`}>
      
      {/* Immersive background particles & sweeps */}
      {isDark && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#050814] to-[#050814] pointer-events-none z-0" />
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none z-0" />
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none z-0" />
        </>
      )}
      {!isDark && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-200/12 via-transparent to-transparent pointer-events-none z-0" />
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-300/06 rounded-full blur-[140px] pointer-events-none z-0" />
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-indigo-300/04 rounded-full blur-[120px] pointer-events-none z-0" />
        </>
      )}
      
      {/* Style for global marquee animations */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-slow {
          animation: marquee 35s linear infinite;
        }
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* ==================== GLOBAL HEADER ==================== */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? `backdrop-blur-md border-b border-solid py-4 ${headerBg}` : `py-6 ${headerBg}`
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xl">🏟</span>
            <span className={`text-lg font-black tracking-widest uppercase ${logoTxtCls}`}>
              ArenaOS <span className="text-blue-500">AI</span>
            </span>
          </div>

          {/* Center Nav Links */}
          <nav className="hidden md:flex items-center gap-5 font-mono text-[11px] font-bold">
            <a href="#" className={`transition-colors ${navLinkCls}`}>Home</a>
            <a href="#features" className={`transition-colors ${navLinkCls}`}>Features</a>
            <a href="#architecture" className={`transition-colors ${navLinkCls}`}>Architecture</a>
            <a href="#experience" className={`transition-colors ${navLinkCls}`}>Technology</a>
            <a href="#contact" className={`transition-colors ${navLinkCls}`}>Contact</a>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3 font-mono text-xs font-bold shrink-0">
            {/* Premium theme toggle pill */}
            <ThemeToggle size="md" />

            {/* Operations Console */}
            <Link
              href="/app"
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-full border border-solid transition-all ${
                isDark
                  ? "border-white/10 text-slate-300 hover:text-white hover:border-white/20 bg-white/5"
                  : "border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 bg-white/70"
              }`}
            >
              <span>🖥️</span><span className="hidden lg:inline">Operations Console</span>
            </Link>

            {/* Fan Companion CTA */}
            <Link
              href="/fan"
              className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition-all shadow shadow-blue-500/20"
            >
              <span>🏟️</span><span>Fan Companion</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ==================== SECTION 1: FULL SCREEN HERO ==================== */}
      <section className="min-h-screen flex flex-col justify-between pt-32 pb-12 px-6 relative z-10 max-w-7xl mx-auto">
        <div /> {/* Spacer */}
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          <div className="lg:col-span-6 space-y-8 text-left">
            <div className="space-y-4">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border border-solid font-mono text-[10px] font-bold uppercase tracking-widest ${
                isDark ? "bg-blue-500/10 border-blue-500/20 text-blue-400" : "bg-blue-100 border-blue-300/60 text-blue-700"
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
                FIFA Smart Stadium Operating System
              </div>
              <h1 className={`text-5xl md:text-7xl font-black tracking-tight leading-none ${txtH}`}>
                ArenaOS <span className="text-blue-500">AI</span>
              </h1>
              <h2 className={`text-xl md:text-2xl font-bold leading-snug ${txtSub}`}>
                The Intelligent Operating System powering the next generation of Smart Stadiums.
              </h2>
              <p className={`text-sm max-w-lg leading-relaxed ${txtBody}`}>
                Connecting fans, operators, AI agents and stadium infrastructure into one unified platform. Engineered for real-time digital twins, predictive safety flows, and smart spectator assistance.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 font-mono text-xs font-bold">
              <a href="#experience" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl transition-all shadow-lg shadow-blue-500/20 text-center cursor-pointer">
                Launch Platform
              </a>
              <a href="#architecture" className={`border border-solid px-8 py-4 rounded-xl transition-all text-center cursor-pointer ${
                isDark ? "bg-white/5 hover:bg-white/10 text-white border-white/10" : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300"
              }`}>
                Explore Architecture
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center relative">
            {/* Animated Football Stadium SVG outlines */}
            <div className="w-full max-w-lg aspect-square relative flex items-center justify-center">
              <div className="absolute inset-0 bg-blue-500/5 rounded-full blur-[80px]" />
              
              <svg viewBox="0 0 500 500" className="w-full h-full max-w-md relative z-10">
                {/* Stadium outer rings */}
                <ellipse cx="250" cy="250" rx="220" ry="110" stroke="#1E293B" strokeWidth="2" fill="none" className="opacity-30" />
                <ellipse cx="250" cy="250" rx="200" ry="90" stroke="#3B82F6" strokeWidth="1.5" fill="none" strokeDasharray="6 6" className="opacity-40 animate-pulse" />
                <ellipse cx="250" cy="250" rx="170" ry="75" stroke="#00F0FF" strokeWidth="2" fill="none" className="opacity-60" />
                
                {/* Stand sections */}
                <ellipse cx="250" cy="250" rx="140" ry="60" stroke="#1E1B4B" strokeWidth="16" fill="none" className="opacity-40" />
                
                {/* Pitch outline */}
                <ellipse cx="250" cy="250" rx="90" ry="38" stroke="#10B981" strokeWidth="2" fill="none" />
                <line x1="250" y1="212" x2="250" y2="288" stroke="#10B981" strokeWidth="1.5" />
                <ellipse cx="250" cy="250" rx="25" ry="11" stroke="#10B981" strokeWidth="1.5" fill="none" />
                
                {/* Floodlights light sweeps */}
                <g className="opacity-30">
                  <line x1="50" y1="80" x2="160" y2="250" stroke="#00F0FF" strokeWidth="1.5" strokeDasharray="4 4" />
                  <line x1="450" y1="80" x2="340" y2="250" stroke="#00F0FF" strokeWidth="1.5" strokeDasharray="4 4" />
                  <line x1="50" y1="420" x2="160" y2="250" stroke="#00F0FF" strokeWidth="1.5" strokeDasharray="4 4" />
                  <line x1="450" y1="420" x2="340" y2="250" stroke="#00F0FF" strokeWidth="1.5" strokeDasharray="4 4" />
                </g>
              </svg>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className={`flex flex-col items-center gap-2 font-mono text-[10px] tracking-widest mt-8 animate-bounce ${txtMono}`}>
          <span>SCROLL TO EXPLORE</span>
          <span className="text-sm">↓</span>
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

      {/* ==================== SECTION 3: THE SMART STADIUM ==================== */}
      <div className={`w-full ${isDark ? "bg-transparent" : "bg-white"} py-14 border-b border-solid ${isDark ? "border-transparent" : "border-slate-200/50"}`}>
        <section className="px-6 relative z-10 max-w-7xl mx-auto space-y-10">
          <div className="text-center space-y-5 max-w-2xl mx-auto">
            <h2 className={`text-3xl md:text-5xl font-black tracking-tight ${txtH}`}>
              The Smart Stadium Architecture
            </h2>
            <div className="w-12 h-1 bg-blue-600 mx-auto rounded-full mt-2" />
            <p className={`text-sm leading-relaxed ${txtBody}`}>
              Every facility, sensor, and transaction is mapped to the ArenaMind™ platform, allowing real-time automation and safety workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Cards */}
            <div className="lg:col-span-3 space-y-4">
              {[
                { title: "Food Orders", desc: "Proximity-based concession schedules.", icon: "🍔" },
                { title: "Parking Space", desc: "Biometric space lock allocation.", icon: "🚗" },
                { title: "Security Scans", desc: "CCTV ingress flow rate controls.", icon: "🛡️" }
              ].map((card, i) => (
                <div key={i} className={`border border-solid rounded-2xl p-5 text-left space-y-2 transition-all duration-300 relative overflow-hidden ${cardCls}`}>
                  <div className={`absolute top-3 right-3 text-lg ${isDark ? "opacity-30" : "opacity-40"}`}>{card.icon}</div>
                  <h4 className={`text-xs font-extrabold uppercase font-mono ${txtH}`}>{card.title}</h4>
                  <p className={`text-[11px] leading-relaxed ${txtBody}`}>{card.desc}</p>
                </div>
              ))}
            </div>

            {/* Center Stadium SVG */}
            <div className="lg:col-span-6 flex justify-center relative aspect-square">
              <div className="absolute inset-0 bg-blue-500/5 rounded-full blur-[80px]" />
              <svg viewBox="0 0 500 500" className="w-full h-full max-w-sm">
                <ellipse cx="250" cy="250" rx="200" ry="100" stroke="#1E293B" strokeWidth="2" fill="none" />
                <ellipse cx="250" cy="250" rx="160" ry="80" stroke="#3B82F6" strokeWidth="2" fill="none" className="opacity-80" />
                
                {/* Pitch */}
                <ellipse cx="250" cy="250" rx="90" ry="40" stroke="#10B981" strokeWidth="2" fill="none" />
                <circle cx="250" cy="250" r="15" stroke="#10B981" strokeWidth="1.5" fill="none" />
                
                {/* Animated connector lines - strengthened */}
                <path d="M 50 150 L 160 210" stroke="#3B82F6" strokeWidth="3" strokeDasharray="4 4" className="opacity-80 animate-pulse" />
                <path d="M 50 250 L 160 250" stroke="#3B82F6" strokeWidth="3" strokeDasharray="4 4" className="opacity-80 animate-pulse" />
                <path d="M 450 150 L 340 210" stroke="#3B82F6" strokeWidth="3" strokeDasharray="4 4" className="opacity-80 animate-pulse" />
                <path d="M 450 250 L 340 250" stroke="#3B82F6" strokeWidth="3" strokeDasharray="4 4" className="opacity-80 animate-pulse" />
              </svg>
            </div>

            {/* Right Cards */}
            <div className="lg:col-span-3 space-y-4">
              {[
                { title: "Navigation Map", desc: "Elevation step-free path models.", icon: "🗺️" },
                { title: "Crowd Flow", desc: "Egress bottlenecks forecasts.", icon: "👥" },
                { title: "Emergency", desc: "Biometric security corridor locks.", icon: "🚨" }
              ].map((card, i) => (
                <div key={i} className={`border border-solid rounded-2xl p-5 text-left space-y-2 transition-all duration-300 relative overflow-hidden ${cardCls}`}>
                  <div className={`absolute top-3 right-3 text-lg ${isDark ? "opacity-30" : "opacity-40"}`}>{card.icon}</div>
                  <h4 className={`text-xs font-extrabold uppercase font-mono ${txtH}`}>{card.title}</h4>
                  <p className={`text-[11px] leading-relaxed ${txtBody}`}>{card.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </section>
      </div>

      {/* ==================== SECTION 4: ONE PLATFORM ==================== */}
      <div id="experience" className={`w-full ${isDark ? "bg-transparent" : "bg-gradient-to-b from-white via-blue-50/20 to-white"} py-12 border-b border-solid ${isDark ? "border-transparent" : "border-slate-200/50"}`}>
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
            <div className={`border border-solid p-8 rounded-3xl space-y-6 text-left shadow-lg transition-all group duration-300 relative overflow-hidden ${
              isDark
                ? "bg-gradient-to-br from-slate-900 to-indigo-950/80 border-white/10 hover:border-blue-500/40"
                : "bg-white border border-slate-200/70 shadow-[0_16px_36px_rgba(0,0,0,0.02)] hover:shadow-[0_24px_50px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 hover:border-blue-500/40 transition-all duration-300"
            }`}>
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

              <Link href="/fan" className="inline-flex items-center gap-2 bg-blue-600 group-hover:bg-blue-700 text-white font-mono text-xs font-bold py-3 px-6 rounded-xl transition-all shadow-md shadow-blue-500/20">
                Launch Fan Experience <span>➔</span>
              </Link>
            </div>

            {/* Operations Card */}
            <div className={`border border-solid p-8 rounded-3xl space-y-6 text-left shadow-lg transition-all group duration-300 relative overflow-hidden ${
              isDark
                ? "bg-gradient-to-br from-slate-900 to-blue-950/80 border-white/10 hover:border-blue-500/40"
                : "bg-white border-slate-200/70 shadow-[0_16px_36px_rgba(0,0,0,0.02)] hover:shadow-[0_24px_50px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 hover:border-blue-500/40 transition-all duration-300"
            }`}>
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

              <Link href="/app" className="inline-flex items-center gap-2 bg-blue-600 group-hover:bg-blue-700 text-white font-mono text-xs font-bold py-3 px-6 rounded-xl transition-all shadow-md shadow-blue-500/20">
                Launch Operations Center <span>➔</span>
              </Link>
            </div>

          </div>
        </section>
      </div>

      {/* ==================== SECTION 5: ARENAMIND ==================== */}
      <div id="architecture" className={`w-full ${isDark ? "bg-transparent" : "bg-white"} py-12 border-b border-solid ${isDark ? "border-transparent" : "border-slate-200/50"}`}>
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Agent column left */}
            <div className="lg:col-span-4 space-y-4">
              {[
                { name: "Navigation Agent", desc: "Tracks elevators state and maps wheelchair routes.", icon: "🧭" },
                { name: "Medical Agent", desc: "Coordinates responder dispatches and clinic wait telemetry.", icon: "🚑" },
                { name: "Security Agent", desc: "Monitors turnstiles gates ingress density alerts.", icon: "🛡️" },
                { name: "Parking Agent", desc: "Saves vehicle location registry upon turnstile scan.", icon: "🚗" }
              ].map((agent, i) => (
                <div key={i} className={`border border-solid rounded-2xl p-4 flex items-start gap-4 ${cardAltCls}`}>
                  <span className={`text-lg p-2 rounded-xl shrink-0 ${isDark ? "bg-blue-500/10 text-blue-400" : "bg-blue-50 text-blue-600"}`}>{agent.icon}</span>
                  <div className="space-y-1 text-left">
                    <h4 className={`text-xs font-extrabold ${txtH}`}>{agent.name}</h4>
                    <p className={`text-[10px] leading-relaxed ${txtBody}`}>{agent.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Central Pulsing brain SVG - scaled up */}
            <div className="lg:col-span-4 flex justify-center relative aspect-square">
              {/* Left connection line indicator */}
              <div className={`hidden lg:block absolute right-full top-1/2 w-12 h-px border-t border-dashed ${isDark ? "border-blue-500/30" : "border-blue-400/50"} -mr-6`} />
              {/* Right connection line indicator */}
              <div className={`hidden lg:block absolute left-full top-1/2 w-12 h-px border-t border-dashed ${isDark ? "border-blue-500/30" : "border-blue-400/50"} -ml-6`} />
              
              <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-[100px]" />
              <div className={`w-80 h-80 rounded-full border-2 border-solid ${isDark ? "border-blue-500/20 bg-blue-950/20" : "border-blue-300/40 bg-gradient-to-br from-blue-50/70 to-indigo-50/70"} flex flex-col items-center justify-center relative animate-pulse`}>
                <div className="w-60 h-60 rounded-full border border-dashed border-cyan-500/30 flex items-center justify-center">
                  <div className="w-36 h-36 rounded-full bg-blue-600/20 flex flex-col items-center justify-center">
                    <span className="text-5xl animate-bounce">🧠</span>
                    <span className="text-[11px] font-mono font-black text-blue-400 tracking-widest mt-1">ARENAMIND</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Agent column right */}
            <div className="lg:col-span-4 space-y-4">
              {[
                { name: "Food Agent", desc: "Pre-order queues wait metrics calculations.", icon: "🍔" },
                { name: "Crowd Agent", desc: "Egress flow density algorithms.", icon: "👥" },
                { name: "Accessibility Agent", desc: "Biometric turnstile check-in assistance.", icon: "♿" },
                { name: "Notification Agent", desc: "Constructs prioritized telemetry logs feeds.", icon: "🔔" }
              ].map((agent, i) => (
                <div key={i} className={`border border-solid rounded-2xl p-4 flex items-start gap-4 ${cardAltCls}`}>
                  <span className={`text-lg p-2 rounded-xl shrink-0 ${isDark ? "bg-blue-500/10 text-blue-400" : "bg-blue-50 text-blue-600"}`}>{agent.icon}</span>
                  <div className="space-y-1 text-left">
                    <h4 className={`text-xs font-extrabold ${txtH}`}>{agent.name}</h4>
                    <p className={`text-[10px] leading-relaxed ${txtBody}`}>{agent.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ==================== SECTION 6: DIGITAL TWIN INTERACTIVE VIEWER ==================== */}
      <div className={`w-full ${isDark ? "bg-transparent" : "bg-gradient-to-b from-white via-slate-100/40 to-white"} py-12 border-b border-solid ${isDark ? "border-transparent" : "border-slate-200/50"}`}>
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

          {/* Tab switcher */}
          <div className="flex flex-wrap justify-center gap-2 font-mono text-[10px] font-bold">
            {[
              { label: "👥 Crowd flow", key: "crowd" },
              { label: "🚗 Parking zones", key: "parking" },
              { label: "🚑 Medical units", key: "medical" },
              { label: "🛡️ Security gates", key: "security" },
              { label: "🍔 Concessions", key: "food" },
              { label: "⚙️ Utilities", key: "utilities" },
              { label: "🚨 Emergency routes", key: "emergency" }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveLayer(tab.key as LayerId)}
                className={`px-4 py-2 rounded-full border border-solid transition-all cursor-pointer ${
                  activeLayer === tab.key
                    ? "bg-blue-600 border-blue-600 text-white shadow shadow-blue-500/20"
                    : isDark
                      ? "bg-white/5 border-white/10 text-slate-400 hover:border-slate-500 hover:text-slate-200"
                      : "bg-white border-slate-200 text-slate-600 hover:border-slate-400 hover:text-slate-800 shadow-sm"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-solid p-8 rounded-3xl ${twinPanel}`}>
            <div className="lg:col-span-8 flex justify-center relative aspect-video">
              <svg viewBox="0 0 600 350" className="w-full h-full max-w-2xl">
                <defs>
                  <linearGradient id="pitchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="#047857" stopOpacity="0.04" />
                  </linearGradient>
                  <linearGradient id="stadiumGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.06" />
                    <stop offset="100%" stopColor="#6366F1" stopOpacity="0.02" />
                  </linearGradient>
                </defs>

                {/* Tech grid coordinates corner labels */}
                <g className="opacity-40 font-mono text-[8px]" fill={isDark ? "#94A3B8" : "#64748B"}>
                  <text x="35" y="40">SYS_TWIN_OK: 98.4%</text>
                  <text x="35" y="52">GPS: 34.5294 N, 58.5301 W</text>
                  <text x="475" y="40">REFRESH: 800MS</text>
                  <text x="475" y="52">LAYERS: ACTIVE</text>
                </g>

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

                {/* Conditional overlay based on activeLayer */}
                {activeLayer === "crowd" && (
                  <ellipse cx="300" cy="175" rx="190" ry="90" stroke="#EF4444" strokeWidth="12" fill="none" strokeDasharray="40 180" className="opacity-80 animate-pulse" />
                )}
                {activeLayer === "parking" && (
                  <ellipse cx="300" cy="175" rx="220" ry="110" stroke="#10B981" strokeWidth="4" fill="none" strokeDasharray="20 40" className="opacity-80 animate-pulse" />
                )}
                {activeLayer === "medical" && (
                  <g fill="#EF4444" className="opacity-90">
                    <circle cx="150" cy="140" r="6" />
                    <circle cx="450" cy="210" r="6" />
                  </g>
                )}
                {activeLayer === "security" && (
                  <ellipse cx="300" cy="175" rx="190" ry="90" stroke="#3B82F6" strokeWidth="14" fill="none" strokeDasharray="10 30" className="opacity-70" />
                )}
                {activeLayer === "food" && (
                  <g fill="#F59E0B" className="opacity-80">
                    <circle cx="200" cy="120" r="5" />
                    <circle cx="400" cy="230" r="5" />
                    <circle cx="300" cy="110" r="5" />
                  </g>
                )}
                {activeLayer === "utilities" && (
                  <ellipse cx="300" cy="175" rx="140" ry="60" stroke="#6366F1" strokeWidth="2" strokeDasharray="5 5" fill="none" />
                )}
                {activeLayer === "emergency" && (
                  <g stroke="#EF4444" strokeWidth="3" fill="none" className="animate-pulse">
                    <path d="M 200 175 Q 300 280 400 175" />
                  </g>
                )}

                {/* Pitch center line & circle */}
                <ellipse cx="300" cy="175" rx="90" ry="40" stroke="#10B981" strokeWidth="2" fill="url(#pitchGrad)" />
                <line x1="300" y1="135" x2="300" y2="215" stroke="#10B981" strokeWidth="1.5" />
                <ellipse cx="300" cy="175" rx="20" ry="9" stroke="#10B981" strokeWidth="1.5" fill="none" />
              </svg>
            </div>

            <div className="lg:col-span-4 text-left space-y-4">
              <h3 className={`text-xl font-bold capitalize ${txtH}`}>{activeLayer} Overlay Telemetry</h3>
              <p className={`text-xs leading-relaxed ${txtBody}`}>
                {activeLayer === "crowd" && "CCTV density sensors indicate high load near Gate B. Dynamic turnstile speeds adjusted."}
                {activeLayer === "parking" && "North Parking A27 locked. Exit queue load rates mapped to parking assistant."}
                {activeLayer === "medical" && "Paramedic dispatches mapped. responder unit 3 dispatched to corridor G."}
                {activeLayer === "security" && "Biometric gate turnstile scanner operational. Gate ingress telemetry checked."}
                {activeLayer === "food" && "Stall B12 Burgers queue bypass active. wait times under 3 minutes."}
                {activeLayer === "utilities" && "Biometric gate energy load and fiber telemetry running at 98.4%."}
                {activeLayer === "emergency" && "Corridor redirection triggers activated. exit route redirected away from stairwell B."}
              </p>
              <div className={`h-px ${isDark ? "bg-white/10" : "bg-slate-200"}`} />
              <div className="font-mono text-[10px] text-blue-500 space-y-1">
                <div>STATUS: ACTIVE</div>
                <div>TELEMETRY REFRESH RATE: 800ms</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ==================== SECTION 7: FEATURES GRID ==================== */}
      <div id="features" className={`w-full ${isDark ? "bg-transparent" : "bg-white"} py-14 border-b border-solid ${isDark ? "border-transparent" : "border-slate-200/50"}`}>
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
              <div key={idx} className={`border border-solid p-6 rounded-2xl text-left space-y-3 transition-all duration-300 ${cardCls}`}>
                <span className="text-2xl block">{feat.icon}</span>
                <h4 className={`text-sm font-bold leading-tight ${txtH}`}>{feat.title}</h4>
                <p className={`text-[11px] leading-relaxed ${txtBody}`}>{feat.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ==================== SECTION 8: HOW AI WORKS ==================== */}
      <div className={`w-full ${isDark ? "bg-transparent" : "bg-gradient-to-b from-white via-blue-50/20 to-white"} py-12 border-b border-solid ${isDark ? "border-transparent" : "border-slate-200/50"}`}>
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
              { step: "1. Spectator", desc: "Enters Gate B", icon: "👤" },
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
      </div>

      {/* ==================== SECTION 9: TECHNOLOGY ==================== */}
      <div className={`w-full ${isDark ? "bg-transparent" : "bg-white"} py-14 border-b border-solid ${isDark ? "border-transparent" : "border-slate-200/50"}`}>
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
      </div>

      {/* ==================== SECTION 10: CHOOSE EXPERIENCE (CTA) ==================== */}
      <div id="contact" className={`w-full ${isDark ? "bg-transparent" : "bg-gradient-to-b from-white to-[#F8FAFC]"} py-12 border-b border-solid ${isDark ? "border-transparent" : "border-slate-200/50"}`}>
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
      </div>

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
          </div>

          <div className="space-y-2">
            <h4 className={`font-bold font-mono uppercase ${footerHdg}`}>Platforms</h4>
            <ul className="space-y-1">
              <li><Link href="/fan" className={`transition-colors ${isDark ? "hover:text-white" : "hover:text-slate-900"}`}>Fan Experience Portal</Link></li>
              <li><Link href="/app" className={`transition-colors ${isDark ? "hover:text-white" : "hover:text-slate-900"}`}>Operations Dashboard</Link></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className={`font-bold font-mono uppercase ${footerHdg}`}>Architecture</h4>
            <ul className="space-y-1">
              <li><a href="#architecture" className={`transition-colors ${isDark ? "hover:text-white" : "hover:text-slate-900"}`}>ArenaMind Core</a></li>
              <li><a href="#features" className={`transition-colors ${isDark ? "hover:text-white" : "hover:text-slate-900"}`}>Capability Registry</a></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className={`font-bold font-mono uppercase ${footerHdg}`}>Platform Info</h4>
            <p className="leading-relaxed">
              Built for FIFA Smart Stadium Innovation. Standardizing turnstiles, clinic responders, and concessions databases.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
