import React from "react";
import { cn } from "@/lib/utils";
import { SolutionSectionProps } from "./SolutionSection.types";
import { SOLUTION_DATA } from "./SolutionSection.data";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import AnimatedHeading from "@/components/shared/AnimatedHeading";
import MotionWrapper from "@/components/shared/MotionWrapper";

/**
 * Solution Overview Section.
 * Details the cooperative operations model of ArenaOS AI.
 */
export function SolutionSection({
  className = "",
  "data-testid": dataTestId = "solution-section",
  ...props
}: SolutionSectionProps) {
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
            <Badge variant="ai" size="sm">
              {SOLUTION_DATA.tag}
            </Badge>
          </MotionWrapper>

          <AnimatedHeading
            title={SOLUTION_DATA.subtitle}
            align="center"
            level={2}
            animated={true}
          />

          <p className="text-xs md:text-sm text-arena-muted leading-relaxed">
            {SOLUTION_DATA.description}
          </p>
        </div>

        {/* Workflow steps layout */}
        <MotionWrapper variant="stagger" className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {SOLUTION_DATA.nodes.map((node) => (
            <MotionWrapper key={node.step} variant="scale" className="w-full">
              <GlassCard
                padding="md"
                rounded="md"
                border={true}
                hover={true}
                className="bg-arena-bg/40 relative h-full flex flex-col justify-between hover:border-arena-primary/30"
              >
                {/* Step indicator metadata */}
                <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                  <span className="text-xl md:text-2xl font-extrabold text-arena-primary/40 font-mono select-none">
                    {node.step}
                  </span>
                  <Badge variant="neutral" size="sm">
                    {node.badge}
                  </Badge>
                </div>

                {/* Step detail content */}
                <div className="flex flex-col space-y-2 text-left">
                  <h3 className="text-xs md:text-sm font-bold text-white">{node.title}</h3>
                  <p className="text-[10px] md:text-xs text-arena-muted leading-relaxed">
                    {node.description}
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

export default SolutionSection;
