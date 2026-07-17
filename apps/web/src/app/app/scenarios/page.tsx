"use client";

import React, { useState, useEffect } from "react";
import PageHeader from "@/features/app/components/PageHeader";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { useRole } from "@/features/app/providers/RoleProvider";
import { useScenario } from "@/features/app/providers/ScenarioProvider";
import { useToast } from "@/features/app/providers/ToastProvider";
import { ScenarioId } from "@/features/app/providers/ScenarioProvider/ScenarioProvider.types";
import { DigitalTwin, MetricCard } from "@/features/app/components";

interface StoryStep {
  label: string;
  scenario: ScenarioId;
  description: string;
  recommendation?: string;
  effect: string;
}

const STORY_STEPS: StoryStep[] = [
  {
    label: "1. Stadium Gates Open",
    scenario: "clear",
    description: "Match Day ingress begins. Fan flows normal across perimeter check gates.",
    effect: "Turnstile scans reporting 45/min. Digital Twin layers green.",
  },
  {
    label: "2. Influx Ingress Peak",
    scenario: "parking_full",
    description: "North Parking Zone A reaches capacity limit. Vehicles backup towards main loop.",
    recommendation: "Redirect inbound vehicles to East Overflow parking lots.",
    effect: "Digital Twin highlights Parking Zone A as Full.",
  },
  {
    label: "3. Gate A Congestion Alert",
    scenario: "gate_congestion",
    description: "Ingress scanners flag turnstile queues exceeding 95% at Gate A.",
    recommendation: "Open Gate B and push dynamic rerouting notifications to Fan Companion.",
    effect: "Digital Twin highlights Gate A bottleneck and routes redirect paths.",
  },
  {
    label: "4. Fan Navigation Update",
    scenario: "gate_congestion",
    description: "Fan companion dashboards recalculate routes to direct spectators via Gate B.",
    effect: "Gate A queue drops to 40% flow. Turnstile flow balances.",
  },
  {
    label: "5. Match Kickoff",
    scenario: "clear",
    description: "Match day kickoff. Spectators seated. Telemetry baseline stabilises.",
    effect: "98% Seating occupancy. Latency drops to 11ms.",
  },
  {
    label: "6. Spectator SOS Distress",
    scenario: "medical_sos",
    description: "SOS alert triggered in Sector 204. Spectator logs chest pain telemetry.",
    recommendation: "Dispatch Medical Responder Unit 1 via the East concourse route.",
    effect: "Digital Twin overlays red SOS pin and flashes responder dispatch route.",
  },
  {
    label: "7. Situation Resolved",
    scenario: "clear",
    description: "Medical Unit 1 reports patient stabilized and escorted to Sector Clinic.",
    effect: "Incident queue clears. SOS beacon resolves.",
  },
  {
    label: "8. Match End Egress",
    scenario: "metro_failure",
    description: "Final whistle. Spectator exit begins. Signal delay flagged at Metro station.",
    recommendation: "Increase shuttle bus frequencies at exit Gate C loop.",
    effect: "Digital Twin highlights Metro station delay and routes shuttle lines.",
  },
  {
    label: "9. Post-Match Analytics",
    scenario: "clear",
    description: "All exit flows stabilized. System archiving telemetry logs.",
    effect: "99.8% Safety index. Response timeline archived.",
  },
];

/**
 * Match Day Simulation & Demo Center.
 * Coordinates automated story mode steppers, predefined incident scenarios, and presentation viewport toggles.
 */
export default function SimulationCenter() {
  const { setRole } = useRole();
  const { setScenario, setSelectedObject } = useScenario();
  const { addToast } = useToast();

  const [isPlaying, setIsPlaying] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [speed, setSpeed] = useState(3000); // ms per step
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Auto-play stepper simulation loop
  useEffect(() => {
    let playTimer: NodeJS.Timeout;
    if (isPlaying) {
      playTimer = setInterval(() => {
        setActiveStep((step) => {
          const next = step + 1;
          if (next >= STORY_STEPS.length) {
            setIsPlaying(false);
            addToast("Match Day simulation cycle completed.", "success");
            return 0;
          }
          return next;
        });
      }, speed);
    }
    return () => clearInterval(playTimer);
  }, [isPlaying, speed, addToast]);

  // Synchronize global scenario state with the active story step
  useEffect(() => {
    const step = STORY_STEPS[activeStep];
    if (step) {
      setScenario(step.scenario);
      
      // Auto-focus twin objects for presentation impact
      if (setSelectedObject) {
        if (step.scenario === "gate_congestion") {
          setSelectedObject({
            id: "gate_a",
            name: "Gate A Ingress",
            type: "GATE",
            metrics: { Status: "CROWD BOTTLENECK", Capacity: "96% Load", Queue: "18 mins" },
          });
        } else if (step.scenario === "medical_sos") {
          setSelectedObject({
            id: "sos_204",
            name: "Emergency: Seat 204",
            type: "SOS",
            metrics: { Status: "CRITICAL ALERT", Location: "Sector 204", ETA: "90 seconds" },
          });
        } else {
          setSelectedObject(null);
        }
      }
    }
  }, [activeStep, setScenario, setSelectedObject]);

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
    addToast(isPlaying ? "Simulation paused." : "Starting Match Day simulation...", "info");
  };

  const handleReset = () => {
    setIsPlaying(false);
    setActiveStep(0);
    setScenario("clear");
    addToast("Simulation reset to initial state.", "info");
  };

  const currentStepData = STORY_STEPS[activeStep];

  return (
    <div className={`space-y-6 select-none pb-12 text-left ${isPreviewMode ? "fixed inset-0 z-50 bg-arena-bg overflow-y-auto p-8" : ""}`}>
      
      {/* Simulation Center Page Header */}
      <PageHeader
        title="Match Day Simulation Center"
        description="Demo center coordinating automated storyboards, incident presets, and analytics logs."
        actionSlot={
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className="border-white/10 text-white hover:bg-white/5 font-mono text-[10px]"
            >
              {isPreviewMode ? "EXIT PRESENTATION" : "PRESENTATION MODE"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setRole("operations")}
              className="border-white/10 text-white hover:bg-white/5 font-mono text-[10px]"
            >
              OPERATOR PANEL
            </Button>
          </div>
        }
      />

      {/* Main split grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Automated Stepper Story & Preset Library (Cols 5) */}
        <div className="lg:col-span-5 space-y-6">
          <span className="text-[10px] uppercase font-bold text-arena-muted font-mono block tracking-wider">
            Simulation Stepper Controls
          </span>

          {/* Stepper Playback controller panel */}
          <GlassCard padding="md" rounded="md" border={true} className="bg-arena-surface/40 p-5 space-y-5 text-white">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-arena-primary">
                AUTOMATED DEMO TIMELINE
              </span>
              <Badge variant={isPlaying ? "live" : "neutral"} size="sm">
                {isPlaying ? "RUNNING" : "PAUSED"}
              </Badge>
            </div>

            {/* Stepper details */}
            <div className="space-y-2 text-left min-h-[120px]">
              <span className="text-[9px] uppercase font-mono font-bold text-arena-primary block">
                {currentStepData.label}
              </span>
              <p className="text-xs font-bold text-white leading-relaxed">
                {currentStepData.description}
              </p>
              {currentStepData.recommendation && (
                <p className="text-[10px] text-arena-warning font-mono">
                  AI Recommendation: {currentStepData.recommendation}
                </p>
              )}
              <p className="text-[10px] text-arena-success font-mono">
                Outcome: {currentStepData.effect}
              </p>
            </div>

            {/* Player Buttons */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <div className="flex space-x-2">
                <Button variant="primary" size="sm" onClick={handleTogglePlay} className="px-4 text-xs">
                  {isPlaying ? "Pause" : "Play"}
                </Button>
                <Button variant="outline" size="sm" onClick={handleReset} className="border-white/10 text-white hover:bg-white/5 text-xs">
                  Reset
                </Button>
              </div>
              <div className="flex items-center space-x-2 bg-black/40 px-2.5 py-1 rounded-lg border border-white/5 text-[9px] font-mono text-arena-muted">
                <span>Speed:</span>
                <button onClick={() => setSpeed(5000)} className={speed === 5000 ? "text-white font-bold" : ""}>1x</button>
                <button onClick={() => setSpeed(3000)} className={speed === 3000 ? "text-white font-bold" : ""}>2x</button>
                <button onClick={() => setSpeed(1000)} className={speed === 1000 ? "text-white font-bold" : ""}>5x</button>
              </div>
            </div>
          </GlassCard>

          {/* Stepper timeline overview checklist */}
          <span className="text-[10px] uppercase font-bold text-arena-muted font-mono block tracking-wider">
            Match Day Phase Stepper
          </span>
          <GlassCard padding="sm" rounded="sm" border={true} className="bg-arena-surface/30 p-3 space-y-1">
            {STORY_STEPS.map((step, idx) => {
              const isActive = activeStep === idx;
              const isCompleted = activeStep > idx;

              return (
                <button
                  key={step.label}
                  onClick={() => {
                    setIsPlaying(false);
                    setActiveStep(idx);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-between cursor-pointer focus:outline-none ${
                    isActive
                      ? "bg-arena-primary text-white shadow-md shadow-arena-primary/20"
                      : isCompleted
                      ? "text-arena-success hover:bg-white/5"
                      : "text-arena-muted hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span>{step.label}</span>
                  {isActive && <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />}
                  {isCompleted && (
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              );
            })}
          </GlassCard>
        </div>

        {/* Right Column: Digital Twin Canvas & Analytics summary (Cols 7) */}
        <div className="lg:col-span-7 space-y-6">
          <span className="text-[10px] uppercase font-bold text-arena-muted font-mono block tracking-wider">
            Active Simulation Overlay Map
          </span>

          {/* Twin visualization */}
          <DigitalTwin />

          {/* Simulation Analytics summary panel (displays at the end of simulation) */}
          <span className="text-[10px] uppercase font-bold text-arena-muted font-mono block tracking-wider">
            Simulation Analytics Summary
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard title="Avg Incident Resolution" value="90s" change="-30s" changeType="increase" subtitle="First responder dispatcher" />
            <MetricCard title="Queue Delay Mitigated" value="12 mins" change="+20%" changeType="increase" subtitle="Ingress Gate rerouting" />
            <MetricCard title="AI Dispatch Confidence" value="97.4%" changeType="stable" subtitle="ArenaMind recommendations" />
          </div>
        </div>

      </div>
    </div>
  );
}
