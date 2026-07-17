import React from "react";
import { cn } from "@/lib/utils";
import { ArchitectureSectionProps } from "./ArchitectureSection.types";
import { ARCHITECTURE_DATA } from "./ArchitectureSection.data";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import Separator from "@/components/ui/Separator";
import AnimatedHeading from "@/components/shared/AnimatedHeading";
import MotionWrapper from "@/components/shared/MotionWrapper";

/**
 * Platform System Architecture Section.
 * Renders layer modules linked with connector vectors representing system data loops.
 */
export function ArchitectureSection({
  className = "",
  "data-testid": dataTestId = "architecture-section",
  ...props
}: ArchitectureSectionProps) {
  return (
    <Section
      id="architecture"
      spacing="lg"
      className={cn("bg-arena-bg", className)}
      data-testid={dataTestId}
      {...props}
    >
      <Container maxWidth="xl" className="flex flex-col space-y-12">
        {/* Header content description */}
        <div className="flex flex-col items-center space-y-4 text-center max-w-2xl mx-auto">
          <MotionWrapper variant="fade" delay={0.1}>
            <Badge variant="ai" size="sm">
              {ARCHITECTURE_DATA.tag}
            </Badge>
          </MotionWrapper>

          <AnimatedHeading
            title={ARCHITECTURE_DATA.subtitle}
            align="center"
            level={2}
            animated={true}
          />

          <p className="text-xs md:text-sm text-arena-muted leading-relaxed">
            {ARCHITECTURE_DATA.description}
          </p>
        </div>

        {/* Stack connected by vertical separators */}
        <div className="flex flex-col items-center w-full max-w-3xl mx-auto relative">
          {ARCHITECTURE_DATA.layers.map((layer, index) => (
            <React.Fragment key={layer.level}>
              {/* Connector logic */}
              {index > 0 && (
                <div
                  className="flex flex-col items-center h-10 w-[1px] relative"
                  aria-hidden="true"
                >
                  <Separator orientation="vertical" className="bg-arena-primary/30 h-full" />
                  {/* Arrow marker indicator */}
                  <span className="absolute bottom-0 w-1.5 h-1.5 border-r border-b border-arena-primary/50 transform rotate-45" />
                </div>
              )}

              {/* Layer card panel block */}
              <MotionWrapper variant="scale" className="w-full">
                <GlassCard
                  padding="md"
                  rounded="md"
                  border={true}
                  hover={true}
                  className="bg-arena-surface/40 hover:border-arena-primary/40 text-left transition-all duration-300 w-full"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Layer titles & description */}
                    <div className="flex flex-col space-y-1.5">
                      <div className="flex items-center space-x-3">
                        <span className="text-[10px] md:text-xs font-mono font-bold text-arena-primary uppercase tracking-wider">
                          {layer.level}
                        </span>
                        <Badge variant="neutral" size="sm">
                          {layer.subTitle}
                        </Badge>
                      </div>
                      <h3 className="text-sm md:text-base font-bold text-white">{layer.name}</h3>
                      <p className="text-[10px] md:text-xs text-arena-muted leading-relaxed max-w-xl">
                        {layer.description}
                      </p>
                    </div>

                    {/* Tech details badges */}
                    <div className="flex flex-wrap gap-2 md:justify-end md:max-w-xs">
                      {layer.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-[10px] md:text-[11px] font-semibold text-white/80 bg-white/5 border border-white/5 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </MotionWrapper>
            </React.Fragment>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export default ArchitectureSection;
