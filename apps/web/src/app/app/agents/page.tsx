"use client";

import React, { useState, useEffect } from "react";
import PageHeader from "@/features/app/components/PageHeader";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { useRole } from "@/features/app/providers/RoleProvider";
import { useScenario } from "@/features/app/providers/ScenarioProvider";
import { useToast } from "@/features/app/providers/ToastProvider";
import { MetricCard, AgentCard } from "@/features/app/components";
import { apiClient } from "@/services/api/client";
import { useEventStream } from "@/hooks/useEventStream";

// Definitions of all 14 specialized AI agents
interface AgentMeta {
  name: string;
  category: "operations" | "security" | "medical" | "transport" | "sustainability" | "analytics";
  systems: string[];
}

const SPECIALIZED_AGENTS: AgentMeta[] = [
  { name: "CrowdSense AI", category: "operations", systems: ["Gate Turnstiles", "Density cams"] },
  { name: "Navigation AI", category: "operations", systems: ["Friction maps", "Signage logs"] },
  { name: "Emergency AI", category: "medical", systems: ["Seat SOS alarms", "Medical GPS"] },
  { name: "Security AI", category: "security", systems: ["Fence grids", "Backstage locks"] },
  { name: "Transportation AI", category: "transport", systems: ["Bus GPS", "Metro sensors"] },
  { name: "Parking AI", category: "transport", systems: ["Lot sensors", "Barrier cameras"] },
  { name: "Vendor AI", category: "operations", systems: ["POS terminals", "Stock levels"] },
  { name: "Ticketing AI", category: "operations", systems: ["QR scanners", "Ticket database"] },
  { name: "Accessibility AI", category: "medical", systems: ["Ramp status", "Elevator telemetry"] },
  { name: "Weather AI", category: "analytics", systems: ["Radar alerts", "Anemometers"] },
  { name: "Analytics AI", category: "analytics", systems: ["Match timers", "Occupancy database"] },
  { name: "Communication AI", category: "analytics", systems: ["PA broadcasts", "SMS dispatchers"] },
  { name: "Recommendation AI", category: "analytics", systems: ["ArenaMind index", "Priority matrix"] },
  { name: "Sustainability AI", category: "sustainability", systems: ["Grid logs", "Waste container weights"] },
];

const ROLE_COPILOT_PROMPTS: Record<string, { prompt: string; response: string }[]> = {
  operations: [
    { prompt: "Show highest congestion.", response: "CrowdSense AI detects peak congestion at Gate A (96% volume threshold). Recommend opening Gate B and updating dynamic navigation signage." },
    { prompt: "Is utility grid stable?", response: "Sustainability AI logs 100% capacity balance. Water and energy utilities operating within normal margins." }
  ],
  fan: [
    { prompt: "Guide me to my seat.", response: "Ticket QR scanned for Section 104, Row G. The fastest route is via the East Ramp. Elevators are available at Gate B." },
    { prompt: "Where is the nearest restroom?", response: "Accessible restrooms are located 30m behind Sector 104. Queue wait time is currently under 2 minutes." }
  ],
  security: [
    { prompt: "Restricted area activity.", response: "Security AI detected a door state alert at perimeter Zone 4. Security Patrol 2 has been dispatched to contain the coordinate." },
    { prompt: "Check perimeter fence sensor.", response: "All perimeter sensors online and responding at 12ms latency. Fence tension optimal." }
  ],
  medical: [
    { prompt: "Nearest emergency.", response: "Emergency AI logged a distress trigger at Sector 204. Medical Unit 1 has the fastest route via the East concourse." },
    { prompt: "Responder location status.", response: "Medical Responder Unit 1 is active at coordinate [x: 100, y: 55]. Transit ETA is 90 seconds." }
  ],
  transportation: [
    { prompt: "Parking lot status.", response: "Parking AI reports Zone A is full. Barrier controls set to route vehicle flows to East overflow sections." },
    { prompt: "Metro Line 2 status.", response: "Signal delay reported at central station. Shuttle buses activated at exit loops to absorb egress surges." }
  ],
  vendor: [
    { prompt: "Inventory below threshold.", response: "Vendor AI forecasts beverage supply shortage at Concessions Stand 3. Refill dispatch order logged." },
    { prompt: "Demand projection halftime.", response: "halftime volume projected at +40% load. Advise pre-packaging inventory units." }
  ],
};

/**
 * Enterprise AI Intelligence Hub.
 * Coordinates agent health logs, predictions explainability, live activity feeds, and Copilots.
 */
export default function ArenaMindHub() {
  const { role } = useRole();
  const { activeScenario, scenarioDetails } = useScenario();
  const { addToast } = useToast();

  const [copilotHistory, setCopilotHistory] = useState<string[]>([]);
  const [consoleInput, setConsoleInput] = useState("");
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    "ArenaMind OS v3.0 initializing...",
    "Telemetry loops bound successfully.",
    "14 specialized AI agents online.",
    "WebSocket telemetry streaming at 60 FPS.",
  ]);

  // Hook live real-time system events stream
  const { eventHistory } = useEventStream(["*"]);

  useEffect(() => {
    if (eventHistory.length > 0) {
      const top = eventHistory[0];
      const timeStr = new Date(top.timestamp || Date.now()).toLocaleTimeString();
      setConsoleLogs((prev) => [
        ...prev,
        `[${timeStr}] ALERT: ${top.event_type} from ${top.source} | Priority: ${top.priority}`
      ]);
    }
  }, [eventHistory]);

  interface OrchestratorTestResult {
    selected_agent?: string;
    pipeline_result?: {
      overall_risk?: string;
      recommended_actions?: string[];
    };
  }

  const handleCopilotPromptClick = async (prompt: string, presetResponse: string) => {
    setCopilotHistory((prev) => [...prev, `Operator: ${prompt}`, `Copilot: Analyzing incident...`]);
    addToast("Routing request to ArenaMind Orchestrator...", "info");

    try {
      const res = await apiClient.post<OrchestratorTestResult>("/orchestrator/test", {
        request_type: role === "security" ? "security" : role === "medical" ? "medical" : "crowd",
        message: prompt
      });

      const responseText = res.pipeline_result?.recommended_actions?.join(" | ") || presetResponse;
      
      // Stream output characters effect
      let currentText = "";
      let charIndex = 0;
      const interval = setInterval(() => {
        if (charIndex < responseText.length) {
          currentText += responseText[charIndex];
          setCopilotHistory((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = `Copilot: ${currentText}`;
            return updated;
          });
          charIndex++;
        } else {
          clearInterval(interval);
        }
      }, 12);
    } catch (err: unknown) {
      console.error(err);
      const errMsg = err instanceof Error ? err.message : String(err);
      setCopilotHistory((prev) => [...prev, `Copilot: Error contacting orchestration engine: ${errMsg}`]);
    }
  };

  const handleSendConsole = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consoleInput.trim()) return;
    const cmd = consoleInput.trim();
    setConsoleLogs((prev) => [...prev, `> ${cmd}`]);
    setConsoleInput("");

    try {
      setConsoleLogs((prev) => [...prev, `ArenaMind OS: Dispatched command execution query...`]);
      const res = await apiClient.post<OrchestratorTestResult>("/orchestrator/test", {
        request_type: role === "security" ? "security" : role === "medical" ? "medical" : "crowd",
        message: cmd
      });
      const selected = res.selected_agent || "Unknown";
      const risk = res.pipeline_result?.overall_risk || "NORMAL";
      const recs = res.pipeline_result?.recommended_actions?.join(", ") || "None";
      setConsoleLogs((prev) => [
        ...prev,
        `➔ Selected Agent: ${selected}`,
        `➔ Risk Classification: ${risk}`,
        `➔ Recommended Playbook: ${recs}`
      ]);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err);
      setConsoleLogs((prev) => [...prev, `➔ Command Error: ${errMsg}`]);
    }
  };

  // Dynamic values depending on active scenario
  const healthVal = activeScenario === "clear" ? 99.8 : activeScenario === "metro_failure" ? 94.2 : 97.5;
  const latencyVal = activeScenario === "clear" ? 12 : activeScenario === "security_threat" ? 18 : 14;

  return (
    <div className="space-y-6 select-none pb-12 text-left">
      <PageHeader
        title="ArenaMind™ Intelligence Hub"
        description="Stadium Operating System Central Brain. Monitors specialized AI agent loads and simulation triggers."
        actionSlot={
          <div className="flex items-center space-x-3 bg-arena-surface/40 p-2 rounded-xl border border-white/5">
            <span className="text-[10px] font-mono text-arena-muted uppercase font-bold shrink-0">Active Scenario:</span>
            <Badge variant={activeScenario === "clear" ? "live" : "warning"} size="sm">
              {activeScenario.toUpperCase()}
            </Badge>
          </div>
        }
      />

      {/* High-level ArenaMind Telemetry Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard title="ArenaMind Health" value={`${healthVal}%`} change="stable" changeType="stable" subtitle="Decision confidence matrix" />
        <MetricCard title="System Processing Latency" value={`${latencyVal}ms`} changeType="stable" subtitle="Agent communication load" />
        <MetricCard title="Orchestrated Agents" value="14 / 14 Online" changeType="increase" subtitle="Zero downtime connection" />
        <MetricCard title="Active Recommendations" value={activeScenario === "clear" ? "0" : "1"} changeType="stable" subtitle="Pending operator dispatch" />
      </div>

      {/* Main split grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Section: Agent Registry Grid & Decision Explainability (Cols 8) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-arena-muted font-mono block tracking-wider">
              Specialized AI Agents Registry (14)
            </span>
            <span className="text-[8px] font-mono text-arena-muted">WebSocket Sync: Active</span>
          </div>

          {/* Grid of the 14 agents */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {SPECIALIZED_AGENTS.map((agent) => {
              // Adjust status depending on the scenario
              let status: "online" | "busy" | "offline" = "online";
              let latency = 12;
              let task = "Monitoring baseline telemetry streams";

              if (activeScenario === "gate_congestion" && agent.category === "operations") {
                status = "busy";
                latency = 24;
                task = "Resolving Gate A queue capacity bottleneck";
              } else if (activeScenario === "medical_sos" && agent.name === "Emergency AI") {
                status = "busy";
                latency = 18;
                task = "Mapping fastest responder route coordinates";
              } else if (activeScenario === "security_threat" && agent.name === "Security AI") {
                status = "busy";
                latency = 28;
                task = "Locking down Perimeter Zone 4 access gates";
              } else if (activeScenario === "parking_full" && agent.name === "Parking AI") {
                status = "busy";
                latency = 16;
                task = "Rerouting vehicle paths to East sectors";
              } else if (activeScenario === "metro_failure" && agent.category === "transport") {
                status = "busy";
                latency = 20;
                task = "Mitigating passenger queues with shuttle bus dispatches";
              }

              return (
                <AgentCard
                  key={agent.name}
                  name={agent.name}
                  status={status}
                  health={99.8}
                  latency={latency}
                  task={task}
                  connectedSystems={agent.systems}
                  recommendationsCount={status === "busy" ? 1 : 0}
                />
              );
            })}
          </div>

          {/* AI Decision Explainability Section */}
          <div className="space-y-4">
            <span className="text-[10px] uppercase font-bold text-arena-muted font-mono block tracking-wider">
              AI Decision & Explainability Logs
            </span>
            <GlassCard padding="md" rounded="md" border={true} className="bg-arena-surface/30 space-y-4">
              {activeScenario === "clear" ? (
                <p className="text-xs text-arena-muted text-center py-6 select-none">
                  All systems green. No active decisions require operator review.
                </p>
              ) : (
                <div className="space-y-3.5 text-xs text-white/90">
                  <div className="flex items-center space-x-2 pb-2 border-b border-white/5">
                    <Badge variant="warning" size="sm">Override Details</Badge>
                    <span className="font-mono text-[10px] text-arena-muted">Simulation Event Code: {activeScenario.toUpperCase()}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="block text-[8px] uppercase font-bold text-arena-muted/50 font-mono">Trigger Origin</span>
                      <p className="font-semibold text-white mt-0.5">{scenarioDetails.affectedArea}</p>
                    </div>
                    <div>
                      <span className="block text-[8px] uppercase font-bold text-arena-muted/50 font-mono">Contributing Agents</span>
                      <p className="font-semibold text-white mt-0.5">Recommendation AI, CrowdSense AI, Ticketing database</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="block text-[8px] uppercase font-bold text-arena-muted/50 font-mono">AI Analysis Reasoning</span>
                    <p className="text-arena-muted leading-relaxed font-sans">{scenarioDetails.description}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="block text-[8px] uppercase font-bold text-arena-muted/50 font-mono">Expected Outcome Benefit</span>
                    <p className="text-arena-success leading-relaxed font-mono">➔ -12m Queue times, balance ingress vectors, maintain safety margins</p>
                  </div>
                </div>
              )}
            </GlassCard>
          </div>
        </div>

        {/* Right Section: Arena Copilot & Prediction Feed (Cols 4) */}
        <div className="lg:col-span-4 space-y-6">
          <span className="text-[10px] uppercase font-bold text-arena-muted font-mono block tracking-wider">
            Arena Copilot Assistant
          </span>

          {/* Arena Copilot Chatbot Panel */}
          <GlassCard padding="sm" rounded="sm" border={true} className="bg-arena-surface/40 flex flex-col h-[280px] justify-between relative overflow-hidden p-4">
            <div className="overflow-y-auto space-y-3 flex-1 text-xs pr-1 select-text scrollbar-thin">
              {copilotHistory.length === 0 ? (
                <p className="text-arena-muted text-center py-12 select-none">
                  Hi operator. Ask Arena Copilot contextual queries or click presets below.
                </p>
              ) : (
                copilotHistory.map((text, idx) => (
                  <div key={idx} className={idx % 2 === 0 ? "text-right" : "text-left"}>
                    <span className={cn("inline-block px-2.5 py-1.5 rounded-lg leading-relaxed max-w-[90%]", idx % 2 === 0 ? "bg-arena-primary text-white" : "bg-white/5 text-arena-muted")}>
                      {text}
                    </span>
                  </div>
                ))
              )}
            </div>

            {/* Presets based on active role */}
            <div className="border-t border-white/5 pt-3.5 flex flex-wrap gap-1.5 z-10 bg-arena-surface/5 py-1">
              {(ROLE_COPILOT_PROMPTS[role] || ROLE_COPILOT_PROMPTS.operations).map((item) => (
                <button
                  key={item.prompt}
                  onClick={() => handleCopilotPromptClick(item.prompt, item.response)}
                  className="px-2 py-1 rounded bg-white/5 border border-white/5 text-[9px] font-semibold text-white hover:bg-white/10 hover:border-white/10 transition-all cursor-pointer"
                >
                  {item.prompt}
                </button>
              ))}
            </div>
          </GlassCard>

          {/* Prediction Center Feed */}
          <span className="text-[10px] uppercase font-bold text-arena-muted font-mono block tracking-wider">
            Predictive Intelligence Feed
          </span>
          <GlassCard padding="sm" rounded="sm" border={true} className="bg-arena-surface/40 p-3 space-y-3.5">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-[9px] uppercase font-bold text-white font-mono">Prediction Warning</span>
              <Badge variant="warning" size="sm">94.2% Conf</Badge>
            </div>
            <div className="text-xs text-left space-y-2">
              {activeScenario === "gate_congestion" ? (
                <>
                  <p className="font-bold text-white">Crowd congestion projected at Gate A in 10 minutes.</p>
                  <p className="text-[10px] text-arena-muted">Reason: Turnstile scans volume exceed standard influx rate margin.</p>
                </>
              ) : activeScenario === "medical_sos" ? (
                <>
                  <p className="font-bold text-white">First responder arrival estimated in 90 seconds.</p>
                  <p className="text-[10px] text-arena-muted">Reason: Sector 204 emergency coordinates dispatched to responder team.</p>
                </>
              ) : (
                <>
                  <p className="font-bold text-white">Egress traffic volume spikes projected at Metro Station.</p>
                  <p className="text-[10px] text-arena-muted">Reason: Match timer nearing 80th minute mark.</p>
                </>
              )}
            </div>
          </GlassCard>

          {/* AI Command Console (Simulated CLI Terminal) */}
          <span className="text-[10px] uppercase font-bold text-arena-muted font-mono block tracking-wider">
            AI Command Console
          </span>
          <GlassCard padding="none" rounded="sm" border={true} className="bg-black/80 font-mono text-[9px] text-emerald-400 p-3.5 flex flex-col justify-between h-44 overflow-hidden relative border-white/10">
            <div className="overflow-y-auto space-y-1 text-left flex-grow max-h-32 mb-1 scrollbar-thin select-text">
              {consoleLogs.map((log, idx) => (
                <div key={idx} className="leading-relaxed">
                  {log}
                </div>
              ))}
            </div>
            <form onSubmit={handleSendConsole} className="flex border-t border-white/5 pt-1.5 bg-black/5 z-10">
              <span className="text-emerald-500 mr-1 select-none font-bold">&gt;</span>
              <input
                type="text"
                value={consoleInput}
                onChange={(e) => setConsoleInput(e.target.value)}
                placeholder="type help for CLI commands..."
                className="bg-transparent text-emerald-400 text-[9px] w-full focus:outline-none placeholder-emerald-800"
              />
            </form>
          </GlassCard>
        </div>

      </div>
    </div>
  );
}
