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
 * Premium Hero Section v2.
 * Renders an immersive, layered stadium operations center console backdrop.
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
      {/* Layer 1: Backdrop glows, subtle grid lines, and radial gradients */}
      <div 
        className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none select-none opacity-60" 
        aria-hidden="true"
      />
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-arena-primary/10 rounded-full blur-[150px] pointer-events-none select-none z-0" 
        aria-hidden="true"
      />
      <div 
        className="absolute top-1/3 left-1/3 w-[500px] h-[300px] bg-arena-secondary/5 rounded-full blur-[120px] pointer-events-none select-none z-0" 
        aria-hidden="true"
      />

      <Container maxWidth="xl" className="flex flex-col items-center space-y-10 z-10 relative">
        {/* Announcement Header */}
        <MotionWrapper variant="fade" delay={0.1}>
          <Badge variant="ai" size="md">
            {data.badge}
          </Badge>
        </MotionWrapper>

        {/* Hero Title and Subtitle */}
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

        {/* Layer 2-4: The 3D Console & Floating Telemetry centerpiece */}
        <MotionWrapper variant="scale" delay={0.4} className="w-full max-w-5xl pt-10">
          <div 
            className="w-full h-auto lg:h-[550px] relative flex flex-col items-center justify-center"
            style={{ perspective: "1200px" }}
          >
            {/* SVG Connector Lines (Hidden on Mobile/Tablet) */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block z-0" 
              style={{ filter: "drop-shadow(0 0 4px rgba(0, 149, 255, 0.2))" }}
              aria-hidden="true"
            >
              {/* Top Left -> Stadium Center */}
              <path d="M 180 80 L 460 270" stroke="rgba(245, 158, 11, 0.25)" strokeWidth="1.5" strokeDasharray="4 4" />
              {/* Top Right -> Stadium Center */}
              <path d="M 820 80 L 540 270" stroke="rgba(16, 185, 129, 0.25)" strokeWidth="1.5" strokeDasharray="4 4" />
              {/* Middle Left -> Stadium Center */}
              <path d="M 120 270 L 460 270" stroke="rgba(59, 130, 246, 0.25)" strokeWidth="1.5" strokeDasharray="4 4" />
              {/* Middle Right -> Stadium Center */}
              <path d="M 880 270 L 540 270" stroke="rgba(168, 85, 247, 0.25)" strokeWidth="1.5" strokeDasharray="4 4" />
              {/* Bottom Left -> Stadium Center */}
              <path d="M 180 460 L 460 270" stroke="rgba(34, 197, 94, 0.25)" strokeWidth="1.5" strokeDasharray="4 4" />
              {/* Bottom Right -> Stadium Center */}
              <path d="M 820 460 L 540 270" stroke="rgba(249, 115, 22, 0.25)" strokeWidth="1.5" strokeDasharray="4 4" />
            </svg>

            {/* Smart Stadium 3D representation */}
            <div 
              className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center select-none z-10 transition-transform duration-700 ease-out"
              style={{
                transform: "rotateX(55deg) rotateY(0deg) rotateZ(-12deg)",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Outer boundary ring glow */}
              <div 
                className="absolute inset-0 rounded-full border border-white/5 bg-gradient-to-b from-white/5 to-transparent shadow-[0_0_60px_rgba(255,255,255,0.02)] flex items-center justify-center"
                style={{ transform: "translateZ(-30px)" }}
              >
                {/* Sector dividers outer outline */}
                <div className="w-[102%] h-[102%] rounded-full border border-dashed border-white/10 absolute animate-spin" style={{ animationDuration: "120s" }} />
              </div>

              {/* Concentric Bowl Ring 1 (Outer Bowl) */}
              <div 
                className="absolute w-[90%] h-[90%] rounded-full border border-white/10 bg-arena-surface/40 flex items-center justify-center shadow-[inset_0_0_30px_rgba(255,255,255,0.05),0_0_40px_rgba(0,0,0,0.8)]"
                style={{ transform: "translateZ(-15px)" }}
              >
                {/* Pulse Ring indicator */}
                <div className="absolute inset-0 rounded-full border-2 border-arena-primary/20 animate-ping" style={{ animationDuration: "3s" }} />
              </div>

              {/* Concentric Bowl Ring 2 (Inner Bowl) */}
              <div 
                className="absolute w-[70%] h-[70%] rounded-full border border-white/15 bg-black/60 flex items-center justify-center shadow-[inset_0_0_20px_rgba(255,255,255,0.1)]"
                style={{ transform: "translateZ(0px)" }}
              >
                <div className="absolute w-[95%] h-[95%] rounded-full border border-dashed border-arena-secondary/30 animate-spin" style={{ animationDuration: "40s" }} />
              </div>

              {/* Center Pitch (The Core Field Spot) */}
              <div 
                className="absolute w-20 h-32 border-2 border-arena-success bg-arena-success/20 rounded shadow-[0_0_40px_rgba(34,197,94,0.3)] flex flex-col items-center justify-center"
                style={{ transform: "translateZ(15px)" }}
              >
                {/* Midfield line overlay */}
                <div className="w-full h-[1px] bg-arena-success/50 absolute top-1/2" />
                <div className="w-8 h-8 rounded-full border border-arena-success/50 absolute" />
                <span className="text-[7px] font-mono font-bold tracking-widest text-arena-success animate-pulse z-10">
                  CORE
                </span>
              </div>
            </div>

            {/* Desktop Organic Floating Cards (Absolute) */}
            <div className="absolute inset-0 w-full h-full hidden lg:block z-20 pointer-events-none">
              
              {/* Top Left: Crowd Intelligence (Amber Accent) */}
              <div className="absolute top-4 left-4 w-60 text-left pointer-events-auto">
                <GlassCard padding="sm" rounded="sm" border={true} className="border-amber-500/30 hover:border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.1)] bg-arena-surface/90">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                      {data.cards.crowd.title}
                    </span>
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white mb-0.5">{data.cards.crowd.value}</h4>
                  <p className="text-[10px] text-arena-muted">{data.cards.crowd.detail}</p>
                  <div className="mt-2 pt-1.5 border-t border-white/5 flex justify-between text-[9px] font-mono text-arena-muted/60">
                    <span>Telemetry: Active</span>
                    <span className="text-amber-500">{data.cards.crowd.metric}</span>
                  </div>
                </GlassCard>
              </div>

              {/* Top Right: Emergency AI (Red Accent) */}
              <div className="absolute top-4 right-4 w-60 text-left pointer-events-auto">
                <GlassCard padding="sm" rounded="sm" border={true} className="border-red-500/30 hover:border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.1)] bg-arena-surface/90">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-wider">
                      {data.cards.emergency.title}
                    </span>
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-400" />
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white mb-0.5">{data.cards.emergency.value}</h4>
                  <p className="text-[10px] text-arena-muted">{data.cards.emergency.detail}</p>
                  <div className="mt-2 pt-1.5 border-t border-white/5 flex justify-between text-[9px] font-mono text-arena-muted/60">
                    <span>Hazards: 0</span>
                    <span className="text-red-500">{data.cards.emergency.metric}</span>
                  </div>
                </GlassCard>
              </div>

              {/* Middle Left: Navigation AI (Blue Accent) */}
              <div className="absolute top-1/2 -translate-y-1/2 left-0 w-60 text-left pointer-events-auto">
                <GlassCard padding="sm" rounded="sm" border={true} className="border-blue-500/30 hover:border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.1)] bg-arena-surface/90">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-wider">
                      {data.cards.navigation.title}
                    </span>
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400" />
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white mb-0.5">{data.cards.navigation.value}</h4>
                  <p className="text-[10px] text-arena-muted">{data.cards.navigation.detail}</p>
                  <div className="mt-2 pt-1.5 border-t border-white/5 flex justify-between text-[9px] font-mono text-arena-muted/60">
                    <span>Routing: Optimal</span>
                    <span className="text-blue-500">{data.cards.navigation.metric}</span>
                  </div>
                </GlassCard>
              </div>

              {/* Middle Right: Transport (Purple Accent) */}
              <div className="absolute top-1/2 -translate-y-1/2 right-0 w-60 text-left pointer-events-auto">
                <GlassCard padding="sm" rounded="sm" border={true} className="border-purple-500/30 hover:border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.1)] bg-arena-surface/90">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-wider">
                      {data.cards.transport.title}
                    </span>
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-400" />
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white mb-0.5">{data.cards.transport.value}</h4>
                  <p className="text-[10px] text-arena-muted">{data.cards.transport.detail}</p>
                  <div className="mt-2 pt-1.5 border-t border-white/5 flex justify-between text-[9px] font-mono text-arena-muted/60">
                    <span>Intervals: Stable</span>
                    <span className="text-purple-500">{data.cards.transport.metric}</span>
                  </div>
                </GlassCard>
              </div>

              {/* Bottom Left: Operations (Green Accent) */}
              <div className="absolute bottom-4 left-4 w-60 text-left pointer-events-auto">
                <GlassCard padding="sm" rounded="sm" border={true} className="border-green-500/30 hover:border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.1)] bg-arena-surface/90">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono text-green-400 font-bold uppercase tracking-wider">
                      {data.cards.operations.title}
                    </span>
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white mb-0.5">{data.cards.operations.value}</h4>
                  <p className="text-[10px] text-arena-muted">{data.cards.operations.detail}</p>
                  <div className="mt-2 pt-1.5 border-t border-white/5 flex justify-between text-[9px] font-mono text-arena-muted/60">
                    <span>Uptime: 99.9%</span>
                    <span className="text-green-500">{data.cards.operations.metric}</span>
                  </div>
                </GlassCard>
              </div>

              {/* Bottom Right: Weather Status (Amber Accent) */}
              <div className="absolute bottom-4 right-4 w-60 text-left pointer-events-auto">
                <GlassCard padding="sm" rounded="sm" border={true} className="border-orange-500/30 hover:border-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.1)] bg-arena-surface/90">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono text-orange-400 font-bold uppercase tracking-wider">
                      {data.cards.weather.title}
                    </span>
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-400" />
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white mb-0.5">{data.cards.weather.value}</h4>
                  <p className="text-[10px] text-arena-muted">{data.cards.weather.detail}</p>
                  <div className="mt-2 pt-1.5 border-t border-white/5 flex justify-between text-[9px] font-mono text-arena-muted/60">
                    <span>Index: Stable</span>
                    <span className="text-orange-500">{data.cards.weather.metric}</span>
                  </div>
                </GlassCard>
              </div>

            </div>
          </div>

          {/* Mobile Telemetry Grid (Visible on mobile/tablet, hidden on desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 px-4 lg:hidden text-left">
            {/* Crowd Intelligence Card */}
            <GlassCard padding="sm" rounded="sm" border={true} className="border-amber-500/20 bg-arena-surface/85">
              <span className="text-[9px] font-mono text-amber-400 font-bold uppercase block mb-1">
                {data.cards.crowd.title}
              </span>
              <h4 className="text-xs font-bold text-white">{data.cards.crowd.value}</h4>
              <p className="text-[10px] text-arena-muted">{data.cards.crowd.detail}</p>
            </GlassCard>

            {/* Emergency AI Card */}
            <GlassCard padding="sm" rounded="sm" border={true} className="border-red-500/20 bg-arena-surface/85">
              <span className="text-[9px] font-mono text-red-400 font-bold uppercase block mb-1">
                {data.cards.emergency.title}
              </span>
              <h4 className="text-xs font-bold text-white">{data.cards.emergency.value}</h4>
              <p className="text-[10px] text-arena-muted">{data.cards.emergency.detail}</p>
            </GlassCard>

            {/* Navigation AI Card */}
            <GlassCard padding="sm" rounded="sm" border={true} className="border-blue-500/20 bg-arena-surface/85">
              <span className="text-[9px] font-mono text-blue-400 font-bold uppercase block mb-1">
                {data.cards.navigation.title}
              </span>
              <h4 className="text-xs font-bold text-white">{data.cards.navigation.value}</h4>
              <p className="text-[10px] text-arena-muted">{data.cards.navigation.detail}</p>
            </GlassCard>

            {/* Transport Card */}
            <GlassCard padding="sm" rounded="sm" border={true} className="border-purple-500/20 bg-arena-surface/85">
              <span className="text-[9px] font-mono text-purple-400 font-bold uppercase block mb-1">
                {data.cards.transport.title}
              </span>
              <h4 className="text-xs font-bold text-white">{data.cards.transport.value}</h4>
              <p className="text-[10px] text-arena-muted">{data.cards.transport.detail}</p>
            </GlassCard>

            {/* Operations Card */}
            <GlassCard padding="sm" rounded="sm" border={true} className="border-green-500/20 bg-arena-surface/85">
              <span className="text-[9px] font-mono text-green-400 font-bold uppercase block mb-1">
                {data.cards.operations.title}
              </span>
              <h4 className="text-xs font-bold text-white">{data.cards.operations.value}</h4>
              <p className="text-[10px] text-arena-muted">{data.cards.operations.detail}</p>
            </GlassCard>

            {/* Weather Card */}
            <GlassCard padding="sm" rounded="sm" border={true} className="border-orange-500/20 bg-arena-surface/85">
              <span className="text-[9px] font-mono text-orange-400 font-bold uppercase block mb-1">
                {data.cards.weather.title}
              </span>
              <h4 className="text-xs font-bold text-white">{data.cards.weather.value}</h4>
              <p className="text-[10px] text-arena-muted">{data.cards.weather.detail}</p>
            </GlassCard>
          </div>

          {/* Layer 5: Central Bottom Orchestrator Console stats */}
          <div className="mt-8 px-4">
            <GlassCard 
              padding="sm" 
              rounded="md" 
              border={true} 
              className="bg-arena-surface/90 border border-violet-500/30 shadow-[0_0_20px_rgba(139,92,246,0.15)]"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
                <span className="text-[10px] font-mono font-bold tracking-widest text-violet-400 uppercase">
                  AI Orchestrator Console
                </span>
                <span className="flex items-center space-x-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-arena-success animate-pulse" />
                  <span className="text-[9px] font-mono text-arena-success font-bold">{data.orchestrator.statusText}</span>
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 text-center">
                <div className="space-y-1">
                  <span className="text-[9px] uppercase font-bold text-arena-muted block tracking-wide">
                    Active Agents
                  </span>
                  <p className="text-base font-extrabold text-white">{data.orchestrator.agentsCount}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] uppercase font-bold text-arena-muted block tracking-wide">
                    Latency
                  </span>
                  <p className="text-base font-extrabold text-white">{data.orchestrator.latencyMs}ms</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] uppercase font-bold text-arena-muted block tracking-wide">
                    Confidence
                  </span>
                  <p className="text-base font-extrabold text-arena-success">{data.orchestrator.confidenceRate}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] uppercase font-bold text-arena-muted block tracking-wide">
                    Requests / sec
                  </span>
                  <p className="text-base font-extrabold text-white">{data.orchestrator.requestsPerSec}</p>
                </div>
                <div className="space-y-1 col-span-2 sm:col-span-4 lg:col-span-1">
                  <span className="text-[9px] uppercase font-bold text-arena-muted block tracking-wide">
                    Telemetry status
                  </span>
                  <p className="text-base font-extrabold text-arena-primary">{data.orchestrator.telemetryState}</p>
                </div>
              </div>
            </GlassCard>
          </div>
        </MotionWrapper>
      </Container>
    </Section>
  );
}

export default HeroSection;
