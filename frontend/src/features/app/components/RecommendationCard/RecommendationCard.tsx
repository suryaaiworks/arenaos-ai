import React from "react";
import { cn } from "@/lib/utils";
import { RecommendationCardProps } from "./RecommendationCard.types";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

/**
 * Reusable ArenaMind AI Recommendation Card.
 * Coordinates system warnings, confidence percentages, actions dispatcher hooks.
 */
export function RecommendationCard({
  priority,
  confidence,
  area,
  action,
  reason,
  expectedResult,
  responsibleTeam,
  status = "pending",
  onActionClick,
  className = "",
  ...props
}: RecommendationCardProps) {
  return (
    <GlassCard
      padding="md"
      rounded="md"
      border={true}
      hover={true}
      className={cn(
        "bg-arena-card border-arena-border text-left select-none space-y-4 shadow-xl relative",
        priority === "critical" && "border-arena-danger/30 shadow-arena-danger/5",
        priority === "high" && "border-arena-warning/30 shadow-arena-warning/5",
        className
      )}
      {...props}
    >
      {/* Priority details */}
      <div className="flex items-center justify-between border-b border-arena-border pb-2.5">
        <div className="flex items-center space-x-2">
          <Badge
            variant={
              priority === "critical"
                ? "error"
                : priority === "high"
                ? "warning"
                : priority === "medium"
                ? "neutral"
                : "neutral"
            }
            size="sm"
          >
            {priority.toUpperCase()} PRIORITY
          </Badge>
          <span className="text-[10px] text-arena-muted font-mono">{area}</span>
        </div>
        <span className="text-[10px] text-arena-success font-semibold font-mono">
          {confidence}% Confidence
        </span>
      </div>

      {/* Suggested details */}
      <div className="space-y-1.5 text-left">
        <h4 className="text-xs font-bold text-arena-text leading-relaxed">
          {action}
        </h4>
        {reason && (
          <p className="text-[10px] text-arena-muted leading-relaxed">
            <span className="text-arena-text/75 font-semibold">Reason:</span> {reason}
          </p>
        )}
        {expectedResult && (
          <p className="text-[10px] text-arena-success/80 leading-relaxed font-mono">
            ➔ {expectedResult}
          </p>
        )}
      </div>

      {/* Execute trigger actions */}
      <div className="flex items-center justify-between pt-1 text-[9px] font-mono text-arena-muted">
        <span>Team: {responsibleTeam}</span>
        {onActionClick && status === "pending" && (
          <Button variant="primary" size="sm" onClick={onActionClick} className="px-3 py-1 h-auto text-[10px]">
            Execute Action
          </Button>
        )}
        {status !== "pending" && (
          <Badge variant={status === "resolved" ? "success" : "neutral"} size="sm">
            {status.toUpperCase()}
          </Badge>
        )}
      </div>
    </GlassCard>
  );
}

export default RecommendationCard;
