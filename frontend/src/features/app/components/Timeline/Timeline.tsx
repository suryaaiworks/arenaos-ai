import React from "react";
import { cn } from "@/lib/utils";
import { TimelineProps, TimelineStep } from "./Timeline.types";
import GlassCard from "@/components/ui/GlassCard";

const DEFAULT_STEPS: TimelineStep[] = [
  { id: "parking", label: "Parking Lot Open", time: "12:00", status: "completed" },
  { id: "gates", label: "Gates Open", time: "13:30", status: "completed" },
  { id: "ingress", label: "Fan Ingress Flow", time: "14:00", status: "active" },
  { id: "kickoff", label: "Match Kickoff", time: "15:00", status: "upcoming" },
  { id: "halftime", label: "Half-Time", time: "15:45", status: "upcoming" },
  { id: "egress", label: "Exit Optimization", time: "16:45", status: "upcoming" },
];

/**
 * Reusable Match lifecycle Timeline controller.
 * Renders stadium operations milestones with active state glowing pulses.
 */
export function Timeline({
  steps = DEFAULT_STEPS,
  currentStepId = "ingress",
  className = "",
  ...props
}: TimelineProps) {
  return (
    <GlassCard
      padding="sm"
      rounded="sm"
      border={true}
      className={cn("bg-arena-surface/30 select-none overflow-x-auto w-full", className)}
      {...props}
    >
      <div className="flex items-center space-x-6 min-w-max py-2 px-4">
        {steps.map((step, index) => {
          const isActive = step.id === currentStepId || step.status === "active";
          const isCompleted = step.status === "completed";
          
          return (
            <div key={step.id} className="flex items-center">
              {/* Line connector */}
              {index > 0 && (
                <div
                  className={cn(
                    "w-8 h-[2px] mr-6",
                    isCompleted ? "bg-arena-success/50" : "bg-white/5"
                  )}
                  aria-hidden="true"
                />
              )}

              {/* Node values */}
              <div className="flex items-center space-x-2 text-left">
                <span
                  className={cn(
                    "w-5 h-5 rounded-full flex items-center justify-center font-mono text-[9px] font-bold border shrink-0 transition-all",
                    isCompleted && "bg-arena-success/20 border-arena-success/40 text-arena-success",
                    isActive && "bg-arena-primary/20 border-arena-primary text-white shadow-[0_0_10px_rgba(59,130,246,0.5)] animate-pulse",
                    step.status === "upcoming" && "bg-black/40 border-white/5 text-arena-muted"
                  )}
                >
                  {isCompleted ? (
                    <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </span>
                <div className="flex flex-col text-[10px] leading-tight">
                  <span className={cn("font-bold", isActive ? "text-white" : "text-arena-muted")}>
                    {step.label}
                  </span>
                  <span className="text-[8px] font-mono text-arena-muted/60">{step.time}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}

export default Timeline;
