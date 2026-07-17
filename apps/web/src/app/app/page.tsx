"use client";

import React from "react";
import PageHeader from "@/features/app/components/PageHeader";
import Button from "@/components/ui/Button";
import { useRole } from "@/features/app/providers/RoleProvider";
import { useScenario } from "@/features/app/providers/ScenarioProvider";
import { ScenarioId } from "@/features/app/providers/ScenarioProvider/ScenarioProvider.types";
import { useToast } from "@/features/app/providers/ToastProvider";
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
  gate_congestion: "Heavy Ingress Congestion",
  medical_sos: "Medical SOS Alert",
  parking_full: "Parking Lot Full",
  security_threat: "Restricted Zone Breach",
  weather_delay: "Lightning cells warning",
  metro_failure: "Metro Line Delays",
  stock_shortage: "Inventory refills",
};

/**
 * Main authenticated application landing dashboard page.
 * Coordinates views corresponding to the active role and triggers scenario overrides.
 */
export default function AppPage() {
  const { role } = useRole();
  const { activeScenario, setScenario, scenarioDetails, setSelectedObject } = useScenario();
  const { addToast } = useToast();

  const handleSelectScenario = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setScenario(e.target.value as ScenarioId);
  };

  return (
    <div className="space-y-6 select-none pb-12">
      {/* Page Header with Scenario Simulation override selector */}
      <PageHeader
        title={`Smart Stadium Command Hub`}
        description={`Active Perspective: ${role.toUpperCase()} Console. Select simulation events below to test platform intelligence.`}
        actionSlot={
          <div className="flex items-center space-x-3 bg-arena-surface/40 p-2 rounded-xl border border-white/5">
            <span className="text-[10px] font-mono text-arena-muted uppercase font-bold shrink-0">
              SIMULATE EVENT:
            </span>
            <select
              value={activeScenario}
              onChange={handleSelectScenario}
              className="bg-black/60 border border-white/10 rounded-lg text-xs font-semibold px-2 py-1 text-white focus:outline-none focus:border-arena-primary cursor-pointer"
            >
              {(Object.keys(SCENARIO_LABELS) as ScenarioId[]).map((id) => (
                <option key={id} value={id}>
                  {SCENARIO_LABELS[id]}
                </option>
              ))}
            </select>
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

          {role === "operations" && <OperationsDashboard />}
          {role === "security" && <SecurityDashboard />}
          {role === "medical" && <MedicalDashboard />}
          {role === "transportation" && <TransportationDashboard />}
          {role === "vendor" && <VendorDashboard />}
          {role === "volunteer" && <VolunteerDashboard />}
          {role === "executive" && <ExecutiveDashboard />}
          {role === "administrator" && <AdminDashboard />}
          
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

          {activeScenario === "clear" && (
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

