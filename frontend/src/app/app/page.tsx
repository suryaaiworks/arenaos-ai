"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import PageHeader from "@/features/app/components/PageHeader";
import Button from "@/components/ui/Button";
import GlassCard from "@/components/ui/GlassCard";
import { useRole } from "@/features/app/providers/RoleProvider";
import { useScenario } from "@/features/app/providers/ScenarioProvider";
import { ScenarioId } from "@/features/app/providers/ScenarioProvider/ScenarioProvider.types";
import { useToast } from "@/features/app/providers/ToastProvider";
import { useEventStream } from "@/hooks/useEventStream";
import {
  StatusCard,
  RecommendationCard,
  AgentCard,
  Timeline,
  DigitalTwin,
  OperationsDashboard,
  SecurityDashboard,
  MedicalDashboard,
  TransportationDashboard,
  VendorDashboard,
  VolunteerDashboard,
  ExecutiveDashboard,
  AdminDashboard,
} from "@/features/app/components";

const SCENARIO_LABELS: Record<ScenarioId, string> = {
  clear: "Clear Operations",
  gate_congestion: "Crowd Surge",
  medical_sos: "VIP Medical Emergency",
  parking_full: "Parking Lot Full",
  security_threat: "Gate Breach",
  weather_delay: "Fire in Food Court",
  metro_failure: "Bomb Threat",
  stock_shortage: "Lost Child",
};

/**
 * Main authenticated application landing dashboard page.
 * Coordinates views corresponding to the active role and triggers scenario overrides.
 */
export default function AppPage() {
  const { role } = useRole();
  const { activeScenario, setScenario, scenarioDetails, setSelectedObject, simulationResult } = useScenario();
  const { addToast } = useToast();
  const { eventHistory } = useEventStream(["*"]);

  const [scenarioDropdownOpen, setScenarioDropdownOpen] = useState(false);
  const scenarioDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (scenarioDropdownRef.current && !scenarioDropdownRef.current.contains(e.target as Node)) {
        setScenarioDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div className="space-y-6 select-none pb-12">
      {/* Page Header with Scenario Simulation override selector */}
      <PageHeader
        title={`Smart Stadium Command Hub`}
        description={`Active Perspective: ${role.toUpperCase()} Console. Select simulation events below to test platform intelligence.`}
        actionSlot={
          <div ref={scenarioDropdownRef} className="relative inline-block text-left select-none z-30">
            <button
              onClick={() => setScenarioDropdownOpen(!scenarioDropdownOpen)}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-white/5 bg-white/5 text-arena-muted hover:text-white hover:bg-white/10 hover:border-white/10 transition-all text-xs font-semibold cursor-pointer focus:outline-none focus-visible:outline-arena-primary"
            >
              <span className="text-[10px] font-mono text-arena-muted uppercase font-bold shrink-0">
                SIMULATE EVENT:
              </span>
              <span className="text-white font-semibold">{SCENARIO_LABELS[activeScenario]}</span>
              <svg className={cn("w-3 h-3 transition-transform", scenarioDropdownOpen && "rotate-180")} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {scenarioDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 z-50 animate-fade-in">
                <GlassCard 
                  padding="sm" 
                  rounded="sm" 
                  border={true} 
                  className="bg-arena-surface border border-white/10 shadow-2xl p-1 text-left flex flex-col space-y-0.5 max-h-80 overflow-y-auto"
                >
                  <span className="text-[9px] uppercase font-bold text-arena-muted tracking-wider px-3 py-1.5 block select-none border-b border-white/5">
                    SELECT SCENARIO
                  </span>
                  {(Object.keys(SCENARIO_LABELS) as ScenarioId[]).map((id) => (
                    <button
                      key={id}
                      onClick={() => {
                        setScenario(id);
                        setScenarioDropdownOpen(false);
                      }}
                      className={cn(
                        "w-full text-left px-3 py-2 text-xs font-semibold rounded-lg transition-all focus:outline-none cursor-pointer",
                        activeScenario === id
                          ? "bg-arena-primary text-white"
                          : "text-arena-muted hover:bg-white/5 hover:text-white"
                      )}
                    >
                      {SCENARIO_LABELS[id]}
                    </button>
                  ))}
                </GlassCard>
              </div>
            )}
          </div>
        }
      />

      {/* Dynamic Simulation Notification Overlay */}
      {activeScenario !== "clear" && (
        <div className="p-4 rounded-xl border border-arena-danger/30 bg-arena-danger/10 animate-pulse text-left flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <span className="text-[9px] uppercase font-bold tracking-widest text-arena-danger font-mono block">
              ACTIVE SIMULATION ALARM: {scenarioDetails.label.toUpperCase()}
            </span>
            <p className="text-xs text-white/95 mt-1">
              {scenarioDetails.description}
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => setScenario("clear")} className="border-arena-danger/40 text-arena-danger hover:bg-arena-danger/20 shrink-0">
            Clear Simulation
          </Button>
        </div>
      )}

      {/* Main Grid: Left Widgets, Center Stadium Twin, Right Operations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Role-specific Dashboard Panel (Cols 3) */}
        <div className="lg:col-span-3 space-y-6">
          <span className="text-[10px] uppercase font-bold text-arena-muted font-mono block tracking-wider text-left">
            Console Metrics
          </span>

          {role === "operations" && <OperationsDashboard className="lg:grid-cols-1" />}
          {role === "security" && <SecurityDashboard className="lg:grid-cols-1" />}
          {role === "medical" && <MedicalDashboard className="lg:grid-cols-1" />}
          {role === "transportation" && <TransportationDashboard className="lg:grid-cols-1" />}
          {role === "vendor" && <VendorDashboard className="lg:grid-cols-1" />}
          {role === "volunteer" && <VolunteerDashboard className="lg:grid-cols-1" />}
          {role === "executive" && <ExecutiveDashboard className="lg:grid-cols-1" />}
          {role === "administrator" && <AdminDashboard className="lg:grid-cols-1" />}
          
          {role === "fan" && (
            <div className="space-y-4">
              <StatusCard title="QR Ticket Pass" statusText="VALID" statusType="success" details="FIFA World Cup 2026 Seat: Section 104, Row G" />
              <Button variant="primary" size="sm" className="w-full text-xs" onClick={() => window.location.href = "/app/ticket"}>
                Open Mobile Companion
              </Button>
            </div>
          )}
        </div>

        {/* Center: The 3D Perspective Digital Twin (Cols 6) */}
        <div className="lg:col-span-6 flex flex-col space-y-6">
          <span className="text-[10px] uppercase font-bold text-arena-muted font-mono block tracking-wider text-left">
            Interactive Digital Twin Blueprint
          </span>
          <DigitalTwin onSelectObject={setSelectedObject} />
        </div>

        {/* Right Side: Operations log & recommendations (Cols 3) */}
        <div className="lg:col-span-3 space-y-6">
          <span className="text-[10px] uppercase font-bold text-arena-muted font-mono block tracking-wider text-left">
            AI Operations logs
          </span>

          {/* Real-time WebSocket/SSE Event log */}
          <div className="p-4 rounded-xl border border-white/5 bg-arena-surface/30 space-y-2 text-left">
            <span className="text-[9px] uppercase font-bold text-arena-primary font-mono block tracking-wider">
              REAL-TIME EVENTS FEED (WebSocket)
            </span>
            <div className="space-y-1.5 max-h-40 overflow-y-auto">
              {eventHistory.length === 0 ? (
                <p className="text-[10px] text-arena-muted italic">Waiting for broadcast feeds...</p>
              ) : (
                eventHistory.slice(0, 5).map((evt, idx) => (
                  <div key={idx} className="border-b border-white/5 pb-1 last:border-0 text-[10px] leading-tight">
                    <span className="text-arena-primary font-mono">[{new Date(evt.timestamp || Date.now()).toLocaleTimeString()}]</span>{" "}
                    <span className="text-white font-semibold">{evt.event_type}</span>{" "}
                    <span className="text-arena-muted">({evt.source})</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {activeScenario === "clear" && eventHistory.length === 0 && (
            <div className="p-4 rounded-xl border border-white/5 bg-arena-surface/30 text-center text-xs text-arena-muted py-12 select-none">
              No active alerts. Platform telemetry optimal.
            </div>
          )}

          {activeScenario === "gate_congestion" && (
            <RecommendationCard
              priority="high"
              confidence={98.2}
              area="Gate A"
              action="Open Gate B & Reroute Fans"
              reason="Gate A queues reached 95% volume capacity."
              expectedResult="-12m queue delay, +20% flow rate"
              responsibleTeam="Crowd Operations"
              onActionClick={() => addToast("Recommendation dispatched: Gate B rerouting triggered.", "success")}
            />
          )}

          {activeScenario === "medical_sos" && (
            <RecommendationCard
              priority="critical"
              confidence={99.8}
              area="Sector 204 Seat 12"
              action="Dispatch Medical Unit 1"
              reason="Spectator SOS alarm triggered."
              expectedResult="Rescue Unit arrival in 120s via East Ramp"
              responsibleTeam="First Responders"
              onActionClick={() => addToast("Recommendation dispatched: Medical Unit 1 deployed.", "success")}
            />
          )}

          {activeScenario === "security_threat" && (
            <RecommendationCard
              priority="high"
              confidence={96.4}
              area="Backstage Gate 4"
              action="Deploy Security Patrol 2"
              reason="Lock intrusion alarm active."
              expectedResult="Lock containment in 90s"
              responsibleTeam="Response Team"
            />
          )}

          {activeScenario === "parking_full" && (
            <RecommendationCard
              priority="medium"
              confidence={94.5}
              area="Zone A Parking"
              action="Redirect to East Overflow"
              reason="Lot occupancy at peak limit."
              expectedResult="Balance traffic flow to exit roads"
              responsibleTeam="Traffic Control"
            />
          )}

          {activeScenario === "weather_delay" && (
            <RecommendationCard
              priority="critical"
              confidence={99.2}
              area="Open Stands Sector E"
              action="Evacuate Stands to Canopies"
              reason="Lightning strike cells detected in 10km grid."
              expectedResult="100% guest shelter in 6m"
              responsibleTeam="Steward Volunteers"
            />
          )}

          {activeScenario === "metro_failure" && (
            <RecommendationCard
              priority="medium"
              confidence={92.5}
              area="Metro Station"
              action="Increase Shuttle Bus frequency"
              reason="Signal line delays expected."
              expectedResult="Mitigate exit crowd queues"
              responsibleTeam="Transit Coordination"
            />
          )}

          {activeScenario === "stock_shortage" && (
            <RecommendationCard
              priority="low"
              confidence={89.2}
              area="Food Stand 3"
              action="Dispatch Stock Refill Cart"
              reason="Inventory margins dropped below threshold."
              expectedResult="Restock beverage units to optimal count"
              responsibleTeam="Concessions Staff"
            />
          )}
        </div>

      </div>

      {/* Real-time incident telemetry log */}
      {simulationResult && (
        <div className="space-y-3">
          <span className="text-[10px] uppercase font-bold text-arena-muted font-mono block tracking-wider text-left">
            Live Incident Telemetry Logs (FastAPI Stream)
          </span>
          <GlassCard padding="sm" rounded="sm" border={true} className="bg-black/40 p-4 text-left">
            <div className="space-y-1 font-mono text-[10px] text-arena-muted max-h-36 overflow-y-auto">
              {simulationResult.incident_timeline?.map((evt: string, idx: number) => (
                <div key={idx} className="flex items-start space-x-2">
                  <span className="text-arena-danger font-bold">➔</span>
                  <span className="text-white/90">{evt}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      )}

      {/* Bottom Segment: Match Timeline */}
      <div className="space-y-3">
        <span className="text-[10px] uppercase font-bold text-arena-muted font-mono block tracking-wider text-left">
          Match Day Timeline
        </span>
        <Timeline currentStepId={activeScenario === "metro_failure" ? "egress" : "ingress"} />
      </div>

      {/* AI Agent Registry Section */}
      <div className="space-y-4">
        <span className="text-[10px] uppercase font-bold text-arena-muted font-mono block tracking-wider text-left">
          Specialized AI Agents Registry
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <AgentCard name="CrowdSense AI" status={activeScenario === "gate_congestion" ? "busy" : "online"} health={99.8} latency={14} task="Monitoring turnstile scan volume" connectedSystems={["Gate A-F cams", "Turnstile APIs"]} recommendationsCount={activeScenario === "gate_congestion" ? 1 : 0} />
          <AgentCard name="Navigation AI" status={activeScenario === "gate_congestion" ? "busy" : "online"} health={99.9} latency={12} task="Calculating shortest egress vectors" connectedSystems={["Friction matrices"]} recommendationsCount={activeScenario === "gate_congestion" ? 1 : 0} />
          <AgentCard name="Emergency AI" status={activeScenario === "medical_sos" ? "busy" : "online"} health={100} latency={11} task="Listening to SOS spectator triggers" connectedSystems={["Seat SOS tags"]} recommendationsCount={activeScenario === "medical_sos" ? 1 : 0} />
          <AgentCard name="Security AI" status={activeScenario === "security_threat" ? "busy" : "online"} health={99.7} latency={15} task="Analyzing perimeter perimeter fence loads" connectedSystems={["Lock status sensors"]} recommendationsCount={activeScenario === "security_threat" ? 1 : 0} />
        </div>
      </div>
    </div>
  );
}

