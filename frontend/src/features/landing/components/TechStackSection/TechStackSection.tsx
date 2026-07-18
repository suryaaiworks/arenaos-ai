import React from "react";
import { cn } from "@/lib/utils";
import { TechStackSectionProps } from "./TechStackSection.types";
import { TECH_STACK_DATA } from "./TechStackSection.data";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import Chip from "@/components/ui/Chip";
import AnimatedHeading from "@/components/shared/AnimatedHeading";
import MotionWrapper from "@/components/shared/MotionWrapper";

/**
 * Ecosystem Tech Stack details section.
 * Grouped lists presenting layers of code dependencies mapped using reusable Chips and Badges.
 */
export function TechStackSection({
  className = "",
  "data-testid": dataTestId = "tech-stack-section",
  ...props
}: TechStackSectionProps) {
  return (
    <Section
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
              {TECH_STACK_DATA.tag}
            </Badge>
          </MotionWrapper>

          <AnimatedHeading
            title={TECH_STACK_DATA.subtitle}
            align="center"
            level={2}
            animated={true}
          />

          <p className="text-xs md:text-sm text-arena-muted leading-relaxed">
            {TECH_STACK_DATA.description}
          </p>
        </div>

        {/* Categories staggered layout grid */}
        <MotionWrapper variant="stagger" className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {TECH_STACK_DATA.categories.map((category) => (
            <MotionWrapper key={category.title} variant="scale" className="w-full">
              <GlassCard
                padding="md"
                rounded="md"
                border={true}
                hover={true}
                className="bg-arena-surface/40 hover:border-arena-secondary/30 h-full flex flex-col justify-between text-left"
              >
                <div className="flex flex-col space-y-4">
                  {/* Category title header */}
                  <h3 className="text-sm font-bold text-white border-b border-white/5 pb-3 select-none">
                    {category.title}
                  </h3>

                  {/* Reusable Chip elements list */}
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((item) => (
                      <Chip key={item} label={item} variant="solid" clickable={false} />
                    ))}
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

export default TechStackSection;
