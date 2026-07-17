"use client";

import React from "react";
import PageHeader from "@/features/app/components/PageHeader";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { useToast } from "@/features/app/providers/ToastProvider";
import { useModal } from "@/features/app/providers/ModalProvider";

/**
 * Mock authenticated app landing console view.
 * Renders layout cards, page headers, action buttons, and triggers context toasts/modals.
 */
export default function AppPage() {
  const { addToast } = useToast();
  const { openModal } = useModal();

  const handleTriggerToast = () => {
    addToast("Real-time telemetry link initialized successfully.", "success");
  };

  const handleTriggerModal = () => {
    openModal(
      "Gemini Orchestration Core",
      <div className="space-y-3">
        <p>
          The central Google Gemini model gateway is listening to turnstile streams, parking lot indices, and exit queue telemetry metrics.
        </p>
        <div className="flex items-center space-x-2">
          <Badge variant="ai" size="sm">
            Gemini Core
          </Badge>
          <span className="text-[10px] font-mono text-arena-muted">Latency: 110ms</span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <PageHeader
        title="Operations Command Telemetry"
        description="Monitor smart stadium operations, crowd ingress streams, and AI dispatch routing loops."
        actionSlot={
          <div className="flex items-center space-x-3">
            <Button variant="secondary" size="sm" onClick={handleTriggerToast}>
              Trigger Notification
            </Button>
            <Button variant="primary" size="sm" onClick={handleTriggerModal}>
              Show System Status
            </Button>
          </div>
        }
      />

      {/* Grid of console metrics cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <GlassCard 
          padding="md" 
          rounded="md" 
          border={true} 
          hover={true} 
          className="bg-arena-surface/40 flex flex-col space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Ingress Gate Influx
            </span>
            <Badge variant="live" size="sm">
              Live
            </Badge>
          </div>
          <p className="text-[11px] text-arena-muted leading-relaxed text-left">
            Gate 1, 2, and 5 turnstiles are processing ticket scans smoothly. Sector B flow optimization recommendations active.
          </p>
        </GlassCard>

        <GlassCard 
          padding="md" 
          rounded="md" 
          border={true} 
          hover={true} 
          className="bg-arena-surface/40 flex flex-col space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              AI Agent Registry
            </span>
            <Badge variant="neutral" size="sm">
              8 Online
            </Badge>
          </div>
          <p className="text-[11px] text-arena-muted leading-relaxed text-left">
            Navigation, Crowd, Emergency, Operations, Accessibility, Transportation, Concierge, and Notification agents running.
          </p>
        </GlassCard>

        <GlassCard 
          padding="md" 
          rounded="md" 
          border={true} 
          hover={true} 
          className="bg-arena-surface/40 flex flex-col space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              First-Responder Dispatch
            </span>
            <Badge variant="success" size="sm">
              Stable
            </Badge>
          </div>
          <p className="text-[11px] text-arena-muted leading-relaxed text-left">
            Emergency route planning services stand ready. Automated incident dispatch nodes validated.
          </p>
        </GlassCard>
      </div>
    </div>
  );
}
