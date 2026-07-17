import React from "react";
import { cn } from "@/lib/utils";
import { ProblemSectionProps } from "./ProblemSection.types";
import { PROBLEM_DATA } from "./ProblemSection.data";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import AnimatedHeading from "@/components/shared/AnimatedHeading";
import MotionWrapper from "@/components/shared/MotionWrapper";

/**
 * Problem Statement Section.
 * Visualizes the bottlenecks of traditional, manual stadium configurations.
 */
export function ProblemSection({
  className = "",
  "data-testid": dataTestId = "problem-section",
  ...props
}: ProblemSectionProps) {
  return (
    <Section
      id="features"
      spacing="lg"
      className={cn("bg-arena-bg", className)}
      data-testid={dataTestId}
      {...props}
    >
      <Container maxWidth="xl" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left column problem statement */}
        <div className="lg:col-span-6 flex flex-col space-y-6 text-left">
          <MotionWrapper variant="fade" delay={0.1}>
            <Badge variant="warning" size="sm">
              {PROBLEM_DATA.tag}
            </Badge>
          </MotionWrapper>

          <AnimatedHeading title={PROBLEM_DATA.subtitle} align="left" level={2} animated={true} />

          <p className="text-xs md:text-sm text-arena-muted leading-relaxed max-w-lg">
            {PROBLEM_DATA.description}
          </p>
        </div>

        {/* Right column list of issues */}
        <MotionWrapper variant="stagger" className="lg:col-span-6 flex flex-col space-y-4">
          {PROBLEM_DATA.issues.map((issue) => (
            <MotionWrapper key={issue.id} variant="scale" className="w-full">
              <GlassCard
                padding="sm"
                rounded="md"
                border={true}
                hover={true}
                className="bg-arena-surface/40 hover:border-arena-danger/30 flex items-start gap-4 transition-all duration-300"
              >
                {/* Metric/Time badge */}
                <div className="shrink-0 pt-0.5">
                  <Badge variant={issue.severity} size="sm">
                    {issue.metric}
                  </Badge>
                </div>

                {/* Content description */}
                <div className="flex flex-col space-y-1 text-left">
                  <h3 className="text-xs md:text-sm font-bold text-white">{issue.title}</h3>
                  <p className="text-[10px] md:text-xs text-arena-muted leading-relaxed">
                    {issue.description}
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

export default ProblemSection;
