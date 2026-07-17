import React from "react";
import { cn } from "@/lib/utils";
import { AgentPreviewSectionProps } from "./AgentPreviewSection.types";
import { AGENT_PREVIEW_DATA } from "./AgentPreviewSection.data";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import GlassCard from "@/components/ui/GlassCard";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import AnimatedHeading from "@/components/shared/AnimatedHeading";
import MotionWrapper from "@/components/shared/MotionWrapper";

/**
 * Agent Showcase Section.
 * Renders card visualizations for the 8 venue-assisting AI agents.
 */
export function AgentPreviewSection({
  className = "",
  "data-testid": dataTestId = "agent-preview-section",
  ...props
}: AgentPreviewSectionProps) {
  return (
    <Section
      id="agents-preview"
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
              {AGENT_PREVIEW_DATA.tag}
            </Badge>
          </MotionWrapper>

          <AnimatedHeading
            title={AGENT_PREVIEW_DATA.subtitle}
            align="center"
            level={2}
            animated={true}
          />

          <p className="text-xs md:text-sm text-arena-muted leading-relaxed">
            {AGENT_PREVIEW_DATA.description}
          </p>
        </div>

        {/* Responsive Staggered Grid for 8 agents */}
        <MotionWrapper
          variant="stagger"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full"
        >
          {AGENT_PREVIEW_DATA.agents.map((agent) => (
            <MotionWrapper key={agent.id} variant="scale" className="w-full">
              <GlassCard
                padding="sm"
                rounded="md"
                border={true}
                hover={true}
                className="bg-arena-surface/40 hover:border-arena-secondary/30 h-full flex flex-col justify-between"
              >
                {/* Agent Header Metadata */}
                <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-3">
                  <Avatar initials={agent.initials} size="sm" status={agent.status} />
                  <Badge variant={agent.status === "busy" ? "error" : "success"} size="sm">
                    {agent.status}
                  </Badge>
                </div>

                {/* Agent Description */}
                <div className="flex flex-col space-y-1.5 text-left">
                  <h3 className="text-xs md:text-sm font-bold text-white">{agent.name}</h3>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-arena-secondary">
                    {agent.role}
                  </span>
                  <p className="text-[10px] md:text-xs text-arena-muted leading-relaxed">
                    {agent.description}
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

export default AgentPreviewSection;
