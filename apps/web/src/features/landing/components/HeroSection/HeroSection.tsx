import React from "react";
import { cn } from "@/lib/utils";
import { HeroSectionProps } from "./HeroSection.types";
import { HERO_DATA } from "./HeroSection.data";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import Badge from "@/components/ui/Badge";
import AnimatedHeading from "@/components/shared/AnimatedHeading";
import Button from "@/components/ui/Button";
import GlassCard from "@/components/ui/GlassCard";
import Skeleton from "@/components/ui/Skeleton";
import Avatar from "@/components/ui/Avatar";
import MotionWrapper from "@/components/shared/MotionWrapper";

/**
 * Premium Hero Section.
 * Implements the responsive branding spotlight and interactive OS dashboard visual.
 */
export function HeroSection({
  className = "",
  "data-testid": dataTestId = "hero-section",
  ...props
}: HeroSectionProps) {
  return (
    <Section
      spacing="xl"
      className={cn(
        "pt-28 md:pt-36 flex flex-col items-center justify-center text-center",
        className
      )}
      data-testid={dataTestId}
      {...props}
    >
      <Container maxWidth="xl" className="flex flex-col items-center space-y-8 z-10">
        {/* Animated Badge Header */}
        <MotionWrapper variant="fade" delay={0.1}>
          <Badge variant="ai" size="md">
            {HERO_DATA.badge}
          </Badge>
        </MotionWrapper>

        {/* Large Premium Headline */}
        <AnimatedHeading
          title={
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/60">
              {HERO_DATA.subtitle}
            </span>
          }
          subtitle={HERO_DATA.description}
          align="center"
          level={1}
          animated={true}
        />

        {/* Action triggers */}
        <MotionWrapper
          variant="slide-up"
          delay={0.3}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a href={HERO_DATA.primaryCta.href} className="focus-visible:outline-none">
            <Button variant="primary" size="lg">
              {HERO_DATA.primaryCta.label}
            </Button>
          </a>
          <a href={HERO_DATA.secondaryCta.href} className="focus-visible:outline-none">
            <Button variant="secondary" size="lg">
              {HERO_DATA.secondaryCta.label}
            </Button>
          </a>
        </MotionWrapper>

        {/* AI Dashboard Preview Placeholder */}
        <MotionWrapper variant="scale" delay={0.4} className="w-full max-w-4xl pt-12 relative">
          {/* Radial glow backdrop */}
          <div
            className="absolute inset-0 z-0 bg-arena-primary/10 rounded-arena-card-lg blur-[80px] pointer-events-none select-none"
            aria-hidden="true"
          />

          <GlassCard
            padding="sm"
            rounded="lg"
            className="z-10 relative border border-white/10 shadow-2xl bg-arena-surface/80"
          >
            {/* Mock Header Menu bar */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4 px-4">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-arena-danger" aria-hidden="true" />
                <span className="w-2.5 h-2.5 rounded-full bg-arena-warning" aria-hidden="true" />
                <span className="w-2.5 h-2.5 rounded-full bg-arena-success" aria-hidden="true" />
                <span className="text-[10px] text-arena-muted font-mono tracking-wider ml-4 uppercase">
                  {HERO_DATA.mockUi.title}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="live" size="sm">
                  Active
                </Badge>
              </div>
            </div>

            {/* Dashboard Mock Grid Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 text-left">
              {/* Stat Card 1 */}
              <GlassCard
                padding="sm"
                rounded="sm"
                border={true}
                hover={false}
                className="bg-arena-bg/40"
              >
                <span className="text-[10px] uppercase font-bold text-arena-muted tracking-wider">
                  ACTIVE AI AGENTS
                </span>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-2xl font-extrabold text-white">
                    {HERO_DATA.mockUi.activeAgents}
                  </span>
                  <div className="flex -space-x-2" aria-hidden="true">
                    <Avatar initials="N" size="xs" status="online" />
                    <Avatar initials="C" size="xs" status="online" />
                    <Avatar initials="E" size="xs" status="busy" />
                  </div>
                </div>
              </GlassCard>

              {/* Stat Card 2 */}
              <GlassCard
                padding="sm"
                rounded="sm"
                border={true}
                hover={false}
                className="bg-arena-bg/40"
              >
                <span className="text-[10px] uppercase font-bold text-arena-muted tracking-wider">
                  STREAM CONCURRENCY
                </span>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-2xl font-extrabold text-white">
                    {HERO_DATA.mockUi.concurrencyRate}
                  </span>
                  <span className="text-[10px] text-arena-success font-semibold">Stable</span>
                </div>
              </GlassCard>

              {/* Stat Card 3 */}
              <GlassCard
                padding="sm"
                rounded="sm"
                border={true}
                hover={false}
                className="bg-arena-bg/40"
              >
                <span className="text-[10px] uppercase font-bold text-arena-muted tracking-wider">
                  SYSTEM TELEMETRY
                </span>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-2xl font-extrabold text-arena-success">
                    {HERO_DATA.mockUi.systemHealth}
                  </span>
                  <span className="text-[10px] text-arena-muted font-mono">
                    {HERO_DATA.mockUi.tasksProcessed}
                  </span>
                </div>
              </GlassCard>
            </div>

            {/* Simulated Agent Terminal Console */}
            <div className="p-4 pt-0">
              <GlassCard
                padding="sm"
                rounded="sm"
                border={true}
                hover={false}
                className="bg-black/40 font-mono text-[10px] text-arena-muted space-y-2 border-dashed border-white/5"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-arena-primary font-bold">[SYSTEM]</span>
                  <span>Orchestration controller loaded...</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-arena-secondary font-bold">[GEMINI]</span>
                  <span>
                    Agent thread: Navigation query received: &quot;Optimize Section 104 exit
                    flow.&quot;
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-arena-success font-bold">[AGENT-01]</span>
                  <span>Rerouting volunteers to Section 104. Gate 3 status updated to open.</span>
                </div>
                <div className="flex items-center space-x-3 pt-2" aria-hidden="true">
                  <Skeleton variant="text" width="60%" height="8px" />
                  <Skeleton variant="text" width="30%" height="8px" />
                </div>
              </GlassCard>
            </div>
          </GlassCard>
        </MotionWrapper>
      </Container>
    </Section>
  );
}

export default HeroSection;
