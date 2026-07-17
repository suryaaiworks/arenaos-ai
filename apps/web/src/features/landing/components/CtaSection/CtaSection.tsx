import React from "react";
import { cn } from "@/lib/utils";
import { CtaSectionProps } from "./CtaSection.types";
import { CTA_DATA } from "./CtaSection.data";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import GlassCard from "@/components/ui/GlassCard";
import AnimatedHeading from "@/components/shared/AnimatedHeading";
import Button from "@/components/ui/Button";
import MotionWrapper from "@/components/shared/MotionWrapper";

/**
 * Reusable Call-To-Action (CTA) panel.
 * Composes a high-contrast card with dual buttons prompting partnership registration.
 */
export function CtaSection({
  className = "",
  "data-testid": dataTestId = "cta-section",
  ...props
}: CtaSectionProps) {
  return (
    <Section
      id="contact"
      spacing="lg"
      className={cn("bg-arena-bg", className)}
      data-testid={dataTestId}
      {...props}
    >
      <Container maxWidth="lg" className="relative">
        {/* Glow backdrop behind card */}
        <div
          className="absolute inset-0 z-0 bg-arena-secondary/10 rounded-arena-card-lg blur-[60px] pointer-events-none select-none"
          aria-hidden="true"
        />

        <MotionWrapper variant="scale" className="w-full relative z-10">
          <GlassCard
            padding="lg"
            rounded="lg"
            border={true}
            hover={false}
            className="bg-arena-surface/85 border border-white/10 shadow-2xl flex flex-col items-center justify-center text-center space-y-6 max-w-3xl mx-auto"
          >
            {/* Tag heading label */}
            <span className="text-[10px] md:text-xs font-semibold uppercase tracking-widest text-arena-secondary select-none">
              {CTA_DATA.title}
            </span>

            <AnimatedHeading
              title={CTA_DATA.subtitle}
              align="center"
              level={2}
              animated={false} // Transition handled by parent scale wrapper animation
            />

            <p className="text-xs md:text-sm text-arena-muted max-w-xl mx-auto leading-relaxed">
              {CTA_DATA.description}
            </p>

            {/* Action buttons list */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <a href={CTA_DATA.primaryButton.href} className="focus-visible:outline-none">
                <Button variant="primary" size="lg">
                  {CTA_DATA.primaryButton.label}
                </Button>
              </a>
              <a href={CTA_DATA.secondaryButton.href} className="focus-visible:outline-none">
                <Button variant="outline" size="lg">
                  {CTA_DATA.secondaryButton.label}
                </Button>
              </a>
            </div>
          </GlassCard>
        </MotionWrapper>
      </Container>
    </Section>
  );
}

export default CtaSection;
