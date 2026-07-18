import React from "react";
import { cn } from "@/lib/utils";
import { BenefitsSectionProps } from "./BenefitsSection.types";
import { BENEFITS_DATA } from "./BenefitsSection.data";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import AnimatedHeading from "@/components/shared/AnimatedHeading";
import MotionWrapper from "@/components/shared/MotionWrapper";

/**
 * Venue Stakeholder Benefits Section.
 * Visualizes targeted improvements across audience segments (fans, safety, operations).
 */
export function BenefitsSection({
  className = "",
  "data-testid": dataTestId = "benefits-section",
  ...props
}: BenefitsSectionProps) {
  return (
    <Section
      spacing="lg"
      className={cn("bg-arena-surface/10 border-y border-white/5", className)}
      data-testid={dataTestId}
      {...props}
    >
      <Container maxWidth="xl" className="flex flex-col space-y-12">
        {/* Header content description */}
        <div className="flex flex-col items-center space-y-4 text-center max-w-2xl mx-auto">
          <MotionWrapper variant="fade" delay={0.1}>
            <Badge variant="success" size="sm">
              {BENEFITS_DATA.tag}
            </Badge>
          </MotionWrapper>

          <AnimatedHeading
            title={BENEFITS_DATA.subtitle}
            align="center"
            level={2}
            animated={true}
          />

          <p className="text-xs md:text-sm text-arena-muted leading-relaxed">
            {BENEFITS_DATA.description}
          </p>
        </div>

        {/* Responsive grid of benefits */}
        <MotionWrapper
          variant="stagger"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full"
        >
          {BENEFITS_DATA.benefits.map((benefit) => (
            <MotionWrapper key={benefit.id} variant="scale" className="w-full">
              <GlassCard
                padding="md"
                rounded="md"
                border={true}
                hover={true}
                className="bg-arena-bg/40 hover:border-arena-success/30 h-full flex flex-col justify-between text-left"
              >
                <div className="flex flex-col space-y-3">
                  {/* Target Audience Badge label */}
                  <span className="text-[10px] uppercase font-bold tracking-widest text-arena-success">
                    {benefit.target}
                  </span>

                  {/* Benefit details */}
                  <h3 className="text-sm font-bold text-white leading-tight">{benefit.title}</h3>
                  <p className="text-[10px] md:text-xs text-arena-muted leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </GlassCard>
            </MotionWrapper>
          ))}
        </MotionWrapper>
      </Container>
    </Section>
  );
}

export default BenefitsSection;
