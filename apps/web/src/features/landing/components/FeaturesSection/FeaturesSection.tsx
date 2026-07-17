import React from "react";
import { cn } from "@/lib/utils";
import { FeaturesSectionProps } from "./FeaturesSection.types";
import { FEATURES_DATA, FeatureItem } from "./FeaturesSection.data";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import AnimatedHeading from "@/components/shared/AnimatedHeading";
import MotionWrapper from "@/components/shared/MotionWrapper";

/**
 * Custom Feature Icons.
 * Pure vector SVG markers mapped to feature nodes.
 */
function FeatureIcon({ name }: { name: FeatureItem["iconName"] }) {
  const iconBaseClass = "w-5 h-5 text-arena-primary";

  if (name === "routing") {
    return (
      <svg
        className={iconBaseClass}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
        />
      </svg>
    );
  }
  if (name === "influx") {
    return (
      <svg
        className={iconBaseClass}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    );
  }
  if (name === "incident") {
    return (
      <svg
        className={iconBaseClass}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    );
  }
  return (
    <svg
      className={iconBaseClass}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 5v2m0 4v2m0 4v2M4 11h16a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2v-6a2 2 0 012-2zM4 5V4a2 2 0 012-2h4a2 2 0 012 2v1H4z"
      />
    </svg>
  );
}

/**
 * Platform Features Grid Section.
 * Showcases foundational operating system capabilities of ArenaOS AI.
 */
export function FeaturesSection({
  className = "",
  "data-testid": dataTestId = "features-section",
  ...props
}: FeaturesSectionProps) {
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
            <Badge variant="info" size="sm">
              {FEATURES_DATA.tag}
            </Badge>
          </MotionWrapper>

          <AnimatedHeading
            title={FEATURES_DATA.subtitle}
            align="center"
            level={2}
            animated={true}
          />

          <p className="text-xs md:text-sm text-arena-muted leading-relaxed">
            {FEATURES_DATA.description}
          </p>
        </div>

        {/* Responsive Features Grid */}
        <MotionWrapper variant="stagger" className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          {FEATURES_DATA.features.map((feature) => (
            <MotionWrapper key={feature.id} variant="scale" className="w-full">
              <GlassCard
                padding="md"
                rounded="md"
                border={true}
                hover={true}
                className="bg-arena-bg/40 hover:border-arena-primary/30 h-full flex flex-col justify-between text-left"
              >
                <div className="flex items-start gap-4">
                  {/* Icon Block */}
                  <div
                    className="shrink-0 p-3 bg-arena-primary/10 rounded-xl border border-arena-primary/20"
                    aria-hidden="true"
                  >
                    <FeatureIcon name={feature.iconName} />
                  </div>

                  {/* Description Details */}
                  <div className="flex flex-col space-y-1.5">
                    <h3 className="text-sm md:text-base font-bold text-white">{feature.title}</h3>
                    <p className="text-[10px] md:text-xs text-arena-muted leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </MotionWrapper>
          ))}
        </MotionWrapper>
      </Container>
    </Section>
  );
}

export default FeaturesSection;
