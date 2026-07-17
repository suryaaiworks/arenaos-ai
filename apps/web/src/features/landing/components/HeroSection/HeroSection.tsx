"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { HeroSectionProps } from "./HeroSection.types";
import { HERO_REDESIGN_DATA } from "./HeroSection.data";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import Badge from "@/components/ui/Badge";
import AnimatedHeading from "@/components/shared/AnimatedHeading";
import Button from "@/components/ui/Button";
import GlassCard from "@/components/ui/GlassCard";
import MotionWrapper from "@/components/shared/MotionWrapper";

/**
 * Premium Hero Section v3.
 * Renders an interactive product preview of the ArenaOS smart stadium telemetry system.
 */
export function HeroSection({
  className = "",
  "data-testid": dataTestId = "hero-section",
  ...props
}: HeroSectionProps) {
  const data = HERO_REDESIGN_DATA;

  return (
    <Section
      spacing="xl"
      className={cn(
        "pt-24 md:pt-32 pb-16 flex flex-col items-center justify-center text-center overflow-hidden relative min-h-screen",
        className
      )}
      data-testid={dataTestId}
      {...props}
    >
      {/* Visual Depth Layers 1-3: Backdrop grid, glows, and noise texture */}
      <div 
        className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:44px_44px] pointer-events-none select-none opacity-50" 
        aria-hidden="true"
      />
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-arena-primary/10 rounded-full blur-[140px] pointer-events-none select-none z-0" 
        aria-hidden="true"
      />
      <div 
        className="absolute top-1/3 left-1/4 w-[600px] h-[400px] bg-arena-secondary/5 rounded-full blur-[110px] pointer-events-none select-none z-0" 
        aria-hidden="true"
      />

      <Container maxWidth="xl" className="flex flex-col items-center space-y-10 z-10 relative">
        {/* Animated Badge Header */}
        <MotionWrapper variant="fade" delay={0.1}>
          <Badge variant="ai" size="md">
            {data.badge}
          </Badge>
        </MotionWrapper>

        {/* Hero Title and Description */}
        <div className="space-y-4 max-w-4xl">
          <AnimatedHeading
            title={
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/60 text-4xl sm:text-6xl font-extrabold tracking-tight">
                {data.title}
              </span>
            }
            subtitle={data.subtitle}
            align="center"
            level={1}
            animated={true}
          />
          <MotionWrapper variant="slide-up" delay={0.2}>
            <p className="text-xs sm:text-sm text-arena-muted max-w-2xl mx-auto leading-relaxed">
              {data.description}
            </p>
          </MotionWrapper>
        </div>

        {/* CTA Buttons */}
        <MotionWrapper
          variant="slide-up"
          delay={0.3}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a href={data.primaryCta.href} className="focus-visible:outline-none">
            <Button variant="primary" size="lg">
              {data.primaryCta.label}
            </Button>
          </a>
          <a href={data.secondaryCta.href} className="focus-visible:outline-none">
            <Button variant="secondary" size="lg">
              {data.secondaryCta.label}
            </Button>
          </a>
        </MotionWrapper>

        {/* Product Preview Showcase (Stadium + Floating Panels) */}
        <MotionWrapper variant="scale" delay={0.4} className="w-full max-w-5xl pt-8">
          <div 
            className="w-full h-auto lg:h-[600px] relative flex flex-col items-center justify-center"
            style={{ perspective: "1300px" }}
          >
            {/* SVG Glowing Connector Lines */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block z-0" 
              style={{ filter: "drop-shadow(0 0 5px rgba(139, 92, 246, 0.3))" }}
              aria-hidden="true"
            >
              {/* Left Side Connectors */}
              <path d="M 180 60 L 460 280" stroke="rgba(245, 158, 11, 0.2)" strokeWidth="1.5" strokeDasharray="3 3" />
              <path d="M 180 180 L 460 280" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="1.5" strokeDasharray="3 3" />
              <path d="M 180 340 L 460 280" stroke="rgba(168, 85, 247, 0.2)" strokeWidth="1.5" strokeDasharray="3 3" />
              <path d="M 180 460 L 460 280" stroke="rgba(249, 115, 22, 0.2)" strokeWidth="1.5" strokeDasharray="3 3" />

              {/* Right Side Connectors */}
              <path d="M 820 60 L 540 280" stroke="rgba(239, 68, 68, 0.2)" strokeWidth="1.5" strokeDasharray="3 3" />
              <path d="M 820 180 L 540 280" stroke="rgba(168, 85, 247, 0.2)" strokeWidth="1.5" strokeDasharray="3 3" />
              <path d="M 820 340 L 540 280" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="1.5" strokeDasharray="3 3" />
              <path d="M 820 460 L 540 280" stroke="rgba(245, 158, 11, 0.2)" strokeWidth="1.5" strokeDasharray="3 3" />
            </svg>

            {/* Smart Stadium Product Preview (3D plane) */}
            <div 
              className="relative w-80 h-80 md:w-96 md:h-96 flex items-center justify-center select-none z-10 transition-transform duration-700 ease-out"
              style={{
                transform: "rotateX(58deg) rotateY(0deg) rotateZ(-12deg)",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Concentric Stadium Base bowl ring */}
              <div 
                className="absolute inset-0 rounded-[48px] border border-white/5 bg-arena-surface/10 shadow-[0_0_60px_rgba(255,255,255,0.02),inset_0_0_40px_rgba(255,255,255,0.02)] flex items-center justify-center"
                style={{ transform: "translateZ(-25px)" }}
              >
                <div className="w-[102%] h-[102%] rounded-[52px] border border-dashed border-white/10 absolute animate-spin" style={{ animationDuration: "160s" }} />
              </div>

              {/* Seating Stands sector overlays with different occupancy telemetry glows */}
              {/* North Stand */}
              <div 
                className="absolute top-2 w-[85%] h-12 rounded-t-[36px] border-t-4 border-amber-500/80 bg-amber-500/10 shadow-[0_-10px_20px_rgba(245,158,11,0.15)] flex items-center justify-center"
                style={{ transform: "translateZ(-10px)" }}
              >
                <span className="text-[7px] font-mono font-bold text-amber-400">N-STAND: 82%</span>
              </div>

              {/* South Stand */}
              <div 
                className="absolute bottom-2 w-[85%] h-12 rounded-b-[36px] border-b-4 border-emerald-500/80 bg-emerald-500/10 shadow-[0_10px_20px_rgba(16,185,129,0.15)] flex items-center justify-center"
                style={{ transform: "translateZ(-10px)" }}
              >
                <span className="text-[7px] font-mono font-bold text-emerald-400">S-STAND: 45%</span>
              </div>

              {/* West Stand */}
              <div 
                className="absolute left-2 h-[80%] w-12 rounded-l-[36px] border-l-4 border-red-500/80 bg-red-500/10 shadow-[-10px_0_20px_rgba(239,68,68,0.15)] flex items-center justify-center"
                style={{ transform: "translateZ(-10px)" }}
              >
                <span className="text-[7px] font-mono font-bold text-red-400 rotate-90">W-STAND: 95%</span>
              </div>

              {/* East Stand */}
              <div 
                className="absolute right-2 h-[80%] w-12 rounded-r-[36px] border-r-4 border-emerald-500/80 bg-emerald-500/10 shadow-[10px_0_20px_rgba(16,185,129,0.15)] flex items-center justify-center"
                style={{ transform: "translateZ(-10px)" }}
              >
                <span className="text-[7px] font-mono font-bold text-emerald-400 -rotate-90">E-STAND: 35%</span>
              </div>

              {/* Concentric inner running track */}
              <div 
                className="absolute w-[68%] h-[68%] rounded-[30px] border border-white/10 bg-black/60 flex items-center justify-center"
                style={{ transform: "translateZ(5px)" }}
              >
                {/* Radar Sweep animation */}
                <div className="absolute inset-0 rounded-[30px] border border-arena-primary/30 animate-pulse" />
              </div>

              {/* Center Soccer/Football Pitch */}
              <div 
                className="absolute w-20 h-32 border border-emerald-500/50 bg-emerald-950/40 rounded shadow-[0_0_30px_rgba(16,185,129,0.2)] flex flex-col justify-between p-2"
                style={{ transform: "translateZ(15px)" }}
              >
                <div className="w-full h-[1px] bg-emerald-500/30 absolute top-1/2 left-0" />
                <div className="w-6 h-6 rounded-full border border-emerald-500/30 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                <span className="text-[6px] font-mono font-bold text-emerald-400/60 uppercase tracking-widest text-center w-full">
                  FIELD
                </span>
              </div>

              {/* Interactive Telemetry Pins pointing upwards */}
              {/* Gate A Alert Pin */}
              <div 
                className="absolute top-[20%] left-[25%] bg-red-500/90 border border-white/20 text-white font-mono text-[7px] px-1 py-0.5 rounded shadow-[0_0_10px_rgba(239,68,68,0.5)] select-none"
                style={{ transform: "translateZ(30px) rotateX(-58deg) rotateY(0deg) rotateZ(12deg)" }}
              >
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-white animate-ping mr-1" />
                GATE A: DELAY
              </div>

              {/* Gate B Normal Pin */}
              <div 
                className="absolute top-[35%] right-[20%] bg-blue-500/90 border border-white/20 text-white font-mono text-[7px] px-1 py-0.5 rounded shadow-[0_0_10px_rgba(59,130,246,0.5)] select-none"
                style={{ transform: "translateZ(30px) rotateX(-58deg) rotateY(0deg) rotateZ(12deg)" }}
              >
                GATE B: OK
              </div>

              {/* First Responder Pin */}
              <div 
                className="absolute bottom-[25%] left-[30%] bg-emerald-500/90 border border-white/20 text-white font-mono text-[7px] px-1 py-0.5 rounded shadow-[0_0_10px_rgba(16,185,129,0.5)] select-none"
                style={{ transform: "translateZ(30px) rotateX(-58deg) rotateY(0deg) rotateZ(12deg)" }}
              >
                MED UNIT 1
              </div>
            </div>

            {/* Desktop Surrounding Dashboard Cards (Absolute) */}
            <div className="absolute inset-0 w-full h-full hidden lg:block z-20 pointer-events-none text-left">
              
              {/* Left Column Cards */}
              {/* Card 1: Crowd Intelligence (Amber Accent) */}
              <div className="absolute top-4 left-4 w-52 pointer-events-auto">
                <GlassCard padding="sm" rounded="sm" border={true} className="border-amber-500/30 hover:border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.1)] bg-arena-surface/90">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                      {data.cards.crowd.title}
                    </span>
                    <span className="flex h-1.5 w-1.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-400" />
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white mb-0.5">{data.cards.crowd.value}</h4>
                  <p className="text-[10px] text-arena-muted">{data.cards.crowd.detail}</p>
                  <div className="mt-2 pt-1 border-t border-white/5 flex justify-between text-[9px] font-mono text-arena-muted/55">
                    <span>Active Telemetry</span>
                    <span className="text-amber-500">{data.cards.crowd.metric}</span>
                  </div>
                </GlassCard>
              </div>

              {/* Card 2: Smart Navigation (Blue Accent) */}
              <div className="absolute top-[26%] left-0 w-52 pointer-events-auto">
                <GlassCard padding="sm" rounded="sm" border={true} className="border-blue-500/30 hover:border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.1)] bg-arena-surface/90">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-wider">
                      {data.cards.navigation.title}
                    </span>
                    <span className="flex h-1.5 w-1.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-400" />
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white mb-0.5">{data.cards.navigation.value}</h4>
                  <p className="text-[10px] text-arena-muted">{data.cards.navigation.detail}</p>
                  <div className="mt-2 pt-1 border-t border-white/5 flex justify-between text-[9px] font-mono text-arena-muted/55">
                    <span>Delays: 0m</span>
                    <span className="text-blue-500">{data.cards.navigation.metric}</span>
                  </div>
                </GlassCard>
              </div>

              {/* Card 3: Match Center (Violet Accent) */}
              <div className="absolute top-[52%] left-0 w-52 pointer-events-auto">
                <GlassCard padding="sm" rounded="sm" border={true} className="border-violet-500/30 hover:border-violet-500/50 shadow-[0_0_15px_rgba(139,92,246,0.1)] bg-arena-surface/90">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono text-violet-400 font-bold uppercase tracking-wider">
                      {data.cards.match.title}
                    </span>
                    <span className="flex h-1.5 w-1.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-violet-400" />
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white mb-0.5">{data.cards.match.value}</h4>
                  <p className="text-[10px] text-arena-muted">{data.cards.match.detail}</p>
                  <div className="mt-2 pt-1 border-t border-white/5 flex justify-between text-[9px] font-mono text-arena-muted/55">
                    <span>Status: Live</span>
                    <span className="text-violet-500">{data.cards.match.metric}</span>
                  </div>
                </GlassCard>
              </div>

              {/* Card 4: Food & Shops (Orange Accent) */}
              <div className="absolute bottom-4 left-4 w-52 pointer-events-auto">
                <GlassCard padding="sm" rounded="sm" border={true} className="border-orange-500/30 hover:border-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.1)] bg-arena-surface/90">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono text-orange-400 font-bold uppercase tracking-wider">
                      {data.cards.food.title}
                    </span>
                    <span className="flex h-1.5 w-1.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-orange-400" />
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white mb-0.5">{data.cards.food.value}</h4>
                  <p className="text-[10px] text-arena-muted">{data.cards.food.detail}</p>
                  <div className="mt-2 pt-1 border-t border-white/5 flex justify-between text-[9px] font-mono text-arena-muted/55">
                    <span>Stands: Open</span>
                    <span className="text-orange-500">{data.cards.food.metric}</span>
                  </div>
                </GlassCard>
              </div>

              {/* Right Column Cards */}
              {/* Card 5: Emergency Center (Red Accent) */}
              <div className="absolute top-4 right-4 w-52 pointer-events-auto">
                <GlassCard padding="sm" rounded="sm" border={true} className="border-red-500/30 hover:border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.1)] bg-arena-surface/90">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-wider">
                      {data.cards.emergency.title}
                    </span>
                    <span className="flex h-1.5 w-1.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-400" />
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white mb-0.5">{data.cards.emergency.value}</h4>
                  <p className="text-[10px] text-arena-muted">{data.cards.emergency.detail}</p>
                  <div className="mt-2 pt-1 border-t border-white/5 flex justify-between text-[9px] font-mono text-arena-muted/55">
                    <span>Dispatch: OK</span>
                    <span className="text-red-500">{data.cards.emergency.metric}</span>
                  </div>
                </GlassCard>
              </div>

              {/* Card 6: Transportation (Purple Accent) */}
              <div className="absolute top-[26%] right-0 w-52 pointer-events-auto">
                <GlassCard padding="sm" rounded="sm" border={true} className="border-purple-500/30 hover:border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.1)] bg-arena-surface/90">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-wider">
                      {data.cards.transport.title}
                    </span>
                    <span className="flex h-1.5 w-1.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-purple-400" />
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white mb-0.5">{data.cards.transport.value}</h4>
                  <p className="text-[10px] text-arena-muted">{data.cards.transport.detail}</p>
                  <div className="mt-2 pt-1 border-t border-white/5 flex justify-between text-[9px] font-mono text-arena-muted/55">
                    <span>Hubs: Connected</span>
                    <span className="text-purple-500">Normal Intervals</span>
                  </div>
                </GlassCard>
              </div>

              {/* Card 7: Operations Center (Green Accent) */}
              <div className="absolute top-[52%] right-0 w-52 pointer-events-auto">
                <GlassCard padding="sm" rounded="sm" border={true} className="border-green-500/30 hover:border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.1)] bg-arena-surface/90">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono text-green-400 font-bold uppercase tracking-wider">
                      {data.cards.operations.title}
                    </span>
                    <span className="flex h-1.5 w-1.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white mb-0.5">{data.cards.operations.value}</h4>
                  <p className="text-[10px] text-arena-muted">{data.cards.operations.detail}</p>
                  <div className="mt-2 pt-1 border-t border-white/5 flex justify-between text-[9px] font-mono text-arena-muted/55">
                    <span>Power: Grid Active</span>
                    <span className="text-green-500">All systems OK</span>
                  </div>
                </GlassCard>
              </div>

              {/* Card 8: Weather Intelligence (Amber Accent) */}
              <div className="absolute bottom-4 right-4 w-52 pointer-events-auto">
                <GlassCard padding="sm" rounded="sm" border={true} className="border-orange-500/30 hover:border-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.1)] bg-arena-surface/90">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono text-orange-400 font-bold uppercase tracking-wider">
                      {data.cards.weather.title}
                    </span>
                    <span className="flex h-1.5 w-1.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-orange-400" />
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white mb-0.5">{data.cards.weather.value}</h4>
                  <p className="text-[10px] text-arena-muted">{data.cards.weather.detail}</p>
                  <div className="mt-2 pt-1 border-t border-white/5 flex justify-between text-[9px] font-mono text-arena-muted/55">
                    <span>Wind: 8km/h</span>
                    <span className="text-orange-500">{data.cards.weather.metric}</span>
                  </div>
                </GlassCard>
              </div>

            </div>
          </div>

          {/* Mobile Product preview grid cards (Stacked grid layout on smaller viewports) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8 px-4 lg:hidden text-left">
            <GlassCard padding="sm" rounded="sm" border={true} className="border-amber-500/20 bg-arena-surface/85">
              <span className="text-[9px] font-mono text-amber-400 font-bold uppercase block mb-1">
                {data.cards.crowd.title}
              </span>
              <h4 className="text-xs font-bold text-white">{data.cards.crowd.value}</h4>
              <p className="text-[10px] text-arena-muted">{data.cards.crowd.detail}</p>
            </GlassCard>

            <GlassCard padding="sm" rounded="sm" border={true} className="border-blue-500/20 bg-arena-surface/85">
              <span className="text-[9px] font-mono text-blue-400 font-bold uppercase block mb-1">
                {data.cards.navigation.title}
              </span>
              <h4 className="text-xs font-bold text-white">{data.cards.navigation.value}</h4>
              <p className="text-[10px] text-arena-muted">{data.cards.navigation.detail}</p>
            </GlassCard>

            <GlassCard padding="sm" rounded="sm" border={true} className="border-violet-500/20 bg-arena-surface/85">
              <span className="text-[9px] font-mono text-violet-400 font-bold uppercase block mb-1">
                {data.cards.match.title}
              </span>
              <h4 className="text-xs font-bold text-white">{data.cards.match.value}</h4>
              <p className="text-[10px] text-arena-muted">{data.cards.match.detail}</p>
            </GlassCard>

            <GlassCard padding="sm" rounded="sm" border={true} className="border-orange-500/20 bg-arena-surface/85">
              <span className="text-[9px] font-mono text-orange-400 font-bold uppercase block mb-1">
                {data.cards.food.title}
              </span>
              <h4 className="text-xs font-bold text-white">{data.cards.food.value}</h4>
              <p className="text-[10px] text-arena-muted">{data.cards.food.detail}</p>
            </GlassCard>

            <GlassCard padding="sm" rounded="sm" border={true} className="border-red-500/20 bg-arena-surface/85">
              <span className="text-[9px] font-mono text-red-400 font-bold uppercase block mb-1">
                {data.cards.emergency.title}
              </span>
              <h4 className="text-xs font-bold text-white">{data.cards.emergency.value}</h4>
              <p className="text-[10px] text-arena-muted">{data.cards.emergency.detail}</p>
            </GlassCard>

            <GlassCard padding="sm" rounded="sm" border={true} className="border-purple-500/20 bg-arena-surface/85">
              <span className="text-[9px] font-mono text-purple-400 font-bold uppercase block mb-1">
                {data.cards.transport.title}
              </span>
              <h4 className="text-xs font-bold text-white">{data.cards.transport.value}</h4>
              <p className="text-[10px] text-arena-muted">{data.cards.transport.detail}</p>
            </GlassCard>
          </div>

          {/* Layer 8: AI Command Console */}
          <div className="mt-8 px-4 text-left">
            <GlassCard 
              padding="sm" 
              rounded="md" 
              border={true} 
              className="bg-arena-surface/90 border border-violet-500/35 shadow-[0_0_20px_rgba(139,92,246,0.2)]"
            >
              {/* Telemetry header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-2.5 mb-3 select-none">
                <span className="text-[9px] font-mono font-bold tracking-widest text-violet-400 uppercase">
                  [SYSTEM METRIC TELEMETRY CONTROLLER]
                </span>
                <span className="flex items-center space-x-1.5">
                  <span className="h-2 w-2 rounded-full bg-arena-success animate-pulse" />
                  <span className="text-[9px] font-mono text-arena-success font-bold">
                    SYSTEM STATUS: {data.orchestrator.statusText}
                  </span>
                </span>
              </div>

              {/* Metrics grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
                <div className="space-y-1">
                  <span className="text-[8px] uppercase font-bold text-arena-muted tracking-wide block">
                    Active AI Agents
                  </span>
                  <p className="text-base font-extrabold text-white">{data.orchestrator.agentsCount}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[8px] uppercase font-bold text-arena-muted tracking-wide block">
                    Latency Interval
                  </span>
                  <p className="text-base font-extrabold text-white">{data.orchestrator.latencyMs}ms</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[8px] uppercase font-bold text-arena-muted tracking-wide block">
                    Confidence Rate
                  </span>
                  <p className="text-base font-extrabold text-arena-success">{data.orchestrator.confidenceRate}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[8px] uppercase font-bold text-arena-muted tracking-wide block">
                    CPU Load / RAM
                  </span>
                  <p className="text-base font-extrabold text-white">
                    {data.orchestrator.cpuLoad} <span className="text-[10px] text-arena-muted font-normal">/ {data.orchestrator.memoryUsage.split(" / ")[0]}</span>
                  </p>
                </div>
                <div className="space-y-1 col-span-2 sm:col-span-4 lg:col-span-1">
                  <span className="text-[8px] uppercase font-bold text-arena-muted tracking-wide block">
                    Telemetry Stream
                  </span>
                  <p className="text-base font-extrabold text-arena-primary">{data.orchestrator.telemetryState}</p>
                </div>
              </div>

              {/* Live console message bar */}
              <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-arena-muted select-none">
                <span>EVENT: {data.orchestrator.currentEvent}</span>
                <span>VOL: {data.orchestrator.requestsPerSec} REQ/S</span>
              </div>
            </GlassCard>
          </div>
        </MotionWrapper>
      </Container>
    </Section>
  );
}

export default HeroSection;
