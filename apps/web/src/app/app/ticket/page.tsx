"use client";

import React, { useState, useEffect } from "react";
import PageHeader from "@/features/app/components/PageHeader";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { useRole } from "@/features/app/providers/RoleProvider";
import { useScenario } from "@/features/app/providers/ScenarioProvider";
import { useToast } from "@/features/app/providers/ToastProvider";
import { StatusCard, DigitalTwin } from "@/features/app/components";

/**
 * Premium Fan Companion Console.
 * Incorporates Wallet-style Digital Ticket, Match Scoreboard center, Concessions wait estimates, and SOS triggers.
 */
export default function FanCompanionPage() {
  const { setRole } = useRole();
  const { activeScenario, setScenario, setSelectedObject } = useScenario();
  const { addToast } = useToast();

  const [countdown, setCountdown] = useState("01:22:45");
  const [sosState, setSosState] = useState<"idle" | "triggered" | "responding">("idle");
  const [eta, setEta] = useState(120);

  // Countdown timer simulation
  useEffect(() => {
    const timer = setInterval(() => {
      const parts = countdown.split(":").map(Number);
      let s = parts[2] - 1;
      let m = parts[1];
      let h = parts[0];

      if (s < 0) {
        s = 59;
        m -= 1;
      }
      if (m < 0) {
        m = 59;
        h -= 1;
      }
      if (h < 0) {
        clearInterval(timer);
        return;
      }

      const pad = (n: number) => n.toString().padStart(2, "0");
      setCountdown(`${pad(h)}:${pad(m)}:${pad(s)}`);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  // ETA countdown simulation when SOS triggers
  useEffect(() => {
    let etaTimer: NodeJS.Timeout;
    if (activeScenario === "medical_sos") {
      setSosState("responding");
      etaTimer = setInterval(() => {
        setEta((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else {
      setSosState("idle");
      setEta(120);
    }
    return () => clearInterval(etaTimer);
  }, [activeScenario]);

  const handleTriggerSOS = () => {
    setScenario("medical_sos");
    addToast("SOS EMERGENCY ALARM SENT. First responders dispatched.", "error");
    if (setSelectedObject) {
      setSelectedObject({
        id: "sos_204",
        name: "Emergency: Seat 204",
        type: "SOS",
        metrics: {
          Status: "CRITICAL ALERT",
          Location: "Sector 204, Row G, Seat 12",
          Responder: "Medical Responder Unit 1",
          ETA: "120 seconds",
        },
      });
    }
  };

  return (
    <div className="space-y-6 select-none pb-12 text-left">
      <PageHeader
        title="FIFA Fan Companion App"
        description="Smart Stadium Ticket Pass & Interactive Navigation Guide."
        actionSlot={
          <Button
            variant="outline"
            size="sm"
            onClick={() => setRole("operations")}
            className="border-white/10 text-white hover:bg-white/5"
          >
            Back to Operator Console
          </Button>
        }
      />

      {/* Main split layout grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Ticket Wallet Pass & Match Center (Cols 5) */}
        <div className="lg:col-span-5 space-y-6">
          <span className="text-[10px] uppercase font-bold text-arena-muted font-mono block tracking-wider">
            Interactive Pass Wallet
          </span>

          {/* Animated Digital Ticket Pass */}
          <GlassCard
            padding="none"
            rounded="md"
            border={true}
            className="bg-gradient-to-br from-indigo-950/45 to-black/90 border-white/10 relative overflow-hidden select-none hover:shadow-indigo-500/5 transition-all p-6 text-white text-left space-y-5"
          >
            {/* Header branding */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-widest text-indigo-400 font-mono font-bold">
                FIFA WORLD CUP PASS
              </span>
              <Badge variant="live" size="sm">Active Ticket</Badge>
            </div>

            {/* Stadium location stats */}
            <div className="grid grid-cols-4 gap-2 text-center border-y border-white/5 py-4">
              <div>
                <span className="block text-[8px] uppercase font-bold text-arena-muted/60 font-mono">Gate</span>
                <span className="text-sm font-extrabold text-white mt-0.5 block">GATE B</span>
              </div>
              <div>
                <span className="block text-[8px] uppercase font-bold text-arena-muted/60 font-mono">Section</span>
                <span className="text-sm font-extrabold text-white mt-0.5 block">S-204</span>
              </div>
              <div>
                <span className="block text-[8px] uppercase font-bold text-arena-muted/60 font-mono">Row</span>
                <span className="text-sm font-extrabold text-white mt-0.5 block">ROW G</span>
              </div>
              <div>
                <span className="block text-[8px] uppercase font-bold text-arena-muted/60 font-mono">Seat</span>
                <span className="text-sm font-extrabold text-white mt-0.5 block">SEAT 12</span>
              </div>
            </div>

            {/* Kickoff countdown overlay */}
            <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
              <span className="text-[9px] uppercase font-bold font-mono text-arena-muted">Kickoff in</span>
              <span className="text-sm font-bold font-mono text-arena-primary tracking-wider">{countdown}</span>
            </div>

            {/* Custom SVG QR Code scan block */}
            <div className="flex items-center justify-between pt-1">
              <div className="space-y-1">
                <span className="text-[9px] uppercase font-bold text-arena-muted font-mono block">MATCHDAY FIXTURE</span>
                <p className="text-xs font-extrabold text-white">Argentina vs France</p>
                <p className="text-[9px] text-arena-muted font-mono">Lusail Iconic Stadium</p>
              </div>
              <div className="h-14 w-14 bg-white p-1 rounded-lg shrink-0 flex items-center justify-center">
                {/* Simulated QR blocks grid using vector paths */}
                <svg className="w-12 h-12 text-black" viewBox="0 0 100 100" fill="currentColor">
                  <rect x="0" y="0" width="30" height="30" />
                  <rect x="70" y="0" width="30" height="30" />
                  <rect x="0" y="70" width="30" height="30" />
                  <rect x="10" y="10" width="10" height="10" fill="white" />
                  <rect x="80" y="10" width="10" height="10" fill="white" />
                  <rect x="10" y="80" width="10" height="10" fill="white" />
                  <rect x="40" y="20" width="20" height="10" />
                  <rect x="35" y="45" width="30" height="30" />
                  <rect x="80" y="80" width="20" height="20" />
                </svg>
              </div>
            </div>
          </GlassCard>

          {/* Match Center Scoreboard Dashboard */}
          <span className="text-[10px] uppercase font-bold text-arena-muted font-mono block tracking-wider">
            Match Center stats
          </span>
          <GlassCard padding="md" rounded="md" border={true} className="bg-arena-surface/40 p-4 space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
              <span className="text-[10px] font-bold text-white uppercase font-mono">LIVE SCOREBOARD</span>
              <span className="text-[10px] font-semibold text-arena-danger animate-pulse font-mono">82:45 (2nd Half)</span>
            </div>
            <div className="flex items-center justify-around py-2">
              <div className="text-center space-y-1">
                <span className="text-2xl font-extrabold text-white">ARG</span>
                <span className="text-[9px] uppercase font-bold text-arena-muted font-mono block">Argentina</span>
              </div>
              <div className="text-3xl font-black text-arena-primary font-mono">2 - 1</div>
              <div className="text-center space-y-1">
                <span className="text-2xl font-extrabold text-white">FRA</span>
                <span className="text-[9px] uppercase font-bold text-arena-muted font-mono block">France</span>
              </div>
            </div>

            {/* Live game logs timelines */}
            <div className="space-y-1.5 text-[9px] font-mono text-arena-muted border-t border-white/5 pt-3">
              <div className="flex items-center justify-between text-left">
                <span>Goal: Messi (23&apos; Pen, 74&apos;)</span>
                <span className="text-white">Goal: Mbappe (62&apos;)</span>
              </div>
              <div className="flex items-center justify-between text-left">
                <span>Yellow: Fernandez (45&apos;)</span>
                <span className="text-white">Yellow: Mbappe (81&apos;)</span>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Right Column: Live maps & transport details (Cols 7) */}
        <div className="lg:col-span-7 space-y-6">
          <span className="text-[10px] uppercase font-bold text-arena-muted font-mono block tracking-wider">
            Live Stadium Navigation Map
          </span>

          {/* Interactive map layers */}
          <DigitalTwin onSelectObject={setSelectedObject} />

          {/* Bottom Grid: Food courts wait lines & transit status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Concessions details */}
            <div className="space-y-3">
              <span className="text-[10px] uppercase font-bold text-arena-muted font-mono block tracking-wider">
                Concessions Wait lines
              </span>
              <div className="space-y-3">
                <StatusCard title="Food Court Stand 3" statusText="3m Wait" statusType="success" details="Beverage stocks normal. Fast checkout lanes active." />
                <StatusCard title="Lusail Merchandise Store" statusText="8m Wait" statusType="warning" details="Peak wait times. Pre-order checkout suggested." />
              </div>
            </div>

            {/* Parking & Transit details */}
            <div className="space-y-3">
              <span className="text-[10px] uppercase font-bold text-arena-muted font-mono block tracking-wider">
                Parking & Transit lines
              </span>
              <div className="space-y-3">
                <StatusCard title="My Parking Slot" statusText="SLOT 42" statusType="success" details="North Parking Lot Zone A. Barrier gate QR ready." />
                <StatusCard title="Metro Line 2" statusText="Normal" statusType="success" details="Signal tracks online. Trains operating at 3m frequencies." />
              </div>
            </div>
          </div>

          {/* SOS Panic Trigger button wrapper */}
          <div className="border-t border-white/5 pt-4 text-left">
            <span className="text-[10px] uppercase font-bold text-arena-muted font-mono block tracking-wider mb-3">
              SOS Emergency Assistance
            </span>
            <GlassCard padding="sm" rounded="sm" border={true} className="bg-arena-danger/5 border-arena-danger/20 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[9px] uppercase font-mono font-bold text-arena-danger block">
                  PANIC DISTRESS DISPATCHER
                </span>
                <p className="text-xs text-white/90">
                  Trigger SOS distress coordinates to dispatch nearest medical responder unit.
                </p>
                {sosState === "responding" && (
                  <p className="text-[10px] text-arena-danger font-mono animate-pulse mt-0.5">
                    ➔ First Responders tracking. Medical Unit 1 ETA: {eta}s
                  </p>
                )}
              </div>
              {sosState === "idle" ? (
                <Button variant="outline" onClick={handleTriggerSOS} className="bg-arena-danger/10 hover:bg-arena-danger/20 border-arena-danger/40 text-arena-danger shrink-0 font-bold">
                  TRIGGER SOS
                </Button>
              ) : (
                <Button variant="outline" onClick={() => setScenario("clear")} className="border-white/10 text-white hover:bg-white/5 shrink-0">
                  Cancel Alarm
                </Button>
              )}
            </GlassCard>
          </div>
        </div>

      </div>
    </div>
  );
}
