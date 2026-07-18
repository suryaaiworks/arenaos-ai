import React from "react";
import { cn } from "@/lib/utils";
import { TrustedTechSectionProps } from "./TrustedTechSection.types";
import { TRUSTED_TECH_DATA } from "./TrustedTechSection.data";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import MotionWrapper from "@/components/shared/MotionWrapper";

/**
 * Reusable Technology Stack showcase section.
 * Renders a grid listing frameworks and tools powering the ArenaOS AI console.
 */
export function TrustedTechSection({
  className = "",
  "data-testid": dataTestId = "trusted-tech-section",
  ...props
}: TrustedTechSectionProps) {
  return (
    <Section
      id="technology"
      spacing="md"
      className={cn("bg-arena-surface/10 border-y border-white/5", className)}
      data-testid={dataTestId}
      {...props}
    >
      <Container maxWidth="xl" className="flex flex-col items-center space-y-8">
        {/* Section title header */}
        <div className="flex flex-col items-center space-y-2 text-center">
          <span className="text-[10px] md:text-xs font-semibold uppercase tracking-widest text-arena-primary">
            Technology Stack
          </span>
          <h2 className="text-xl md:text-2xl font-extrabold text-white">
            Powered by Enterprise-Grade Ecosystems
          </h2>
        </div>

        {/* Responsive Staggered Grid */}
        <MotionWrapper
          variant="stagger"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 w-full"
        >
          {TRUSTED_TECH_DATA.map((tech) => (
            <MotionWrapper key={tech.name} variant="scale" className="w-full">
              <GlassCard
                padding="sm"
                rounded="sm"
                border={true}
                hover={true}
                className="flex flex-col items-center justify-center text-center space-y-2 bg-arena-surface/50 h-24 hover:border-arena-primary/30"
              >
                <span className="text-sm font-bold text-white select-none">{tech.name}</span>
                <Badge variant={tech.category === "ai" ? "ai" : "neutral"} size="sm">
                  {tech.badgeText}
                </Badge>
              </GlassCard>
            </MotionWrapper>
          ))}
        </MotionWrapper>
      </Container>
    </Section>
  );
}

export default TrustedTechSection;
