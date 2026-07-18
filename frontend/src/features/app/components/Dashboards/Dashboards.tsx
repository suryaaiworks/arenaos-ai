"use client";

import React from "react";
import { useScenario } from "../../providers/ScenarioProvider";
import { MetricCard } from "../MetricCard";
import { StatusCard } from "../StatusCard";

/**
 * Operations Command Center Dashboard.
 */
export function OperationsDashboard() {
  const { activeScenario } = useScenario();
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
      <MetricCard title="Turnstile Flow Rate" value="380/min" change="+40/min" changeType="increase" subtitle="Baseline scanner throughput" />
      <MetricCard title="Gate A Ingress Load" value={activeScenario === "gate_congestion" ? "96%" : "64%"} changeType="stable" subtitle="Turnstile capacity margins" />
      <StatusCard title="Facilities Operations" statusText="Optimal" statusType="success" details="Cleaning checklist and equipment checklists complete." />
    </div>
  );
}

/**
 * Security Command Center Dashboard.
 */
export function SecurityDashboard() {
  const { activeScenario } = useScenario();
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
      <MetricCard title="Threat Matrix Level" value={activeScenario === "security_threat" ? "ELEVATED" : "NORMAL"} changeType="stable" subtitle="Perimeter grids logs secure" />
      <StatusCard title="Restricted Zone 4" statusText={activeScenario === "security_threat" ? "BREACH ALERT" : "LOCKED"} statusType={activeScenario === "security_threat" ? "error" : "success"} details="Perimeter backstage gate state logs" />
      <StatusCard title="CCTV AI Scanner" statusText="Streaming" statusType="success" details="Intrusion filters active at 60 FPS" />
    </div>
  );
}

/**
 * Medical Command Center Dashboard.
 */
export function MedicalDashboard() {
  const { activeScenario } = useScenario();
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
      <StatusCard title="SOS Request Queue" statusText={activeScenario === "medical_sos" ? "1 Active SOS" : "Clear"} statusType={activeScenario === "medical_sos" ? "error" : "success"} details="Spectator initiated alarm status" />
      <MetricCard title="Responder ETA" value={activeScenario === "medical_sos" ? "120s" : "Normal"} changeType="stable" subtitle="Responder path optimized" />
      <StatusCard title="Clinic Bed Loads" statusText="Optimal" statusType="success" details="Field hospital units standby" />
    </div>
  );
}

/**
 * Transport Command Center Dashboard.
 */
export function TransportationDashboard() {
  const { activeScenario } = useScenario();
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
      <MetricCard title="Parking Zone A Occupancy" value={activeScenario === "parking_full" ? "99%" : "84%"} changeType="stable" subtitle="Parking lot barrier gates" />
      <StatusCard title="Metro line delays" statusText={activeScenario === "metro_failure" ? "Signal Delay" : "Normal"} statusType={activeScenario === "metro_failure" ? "error" : "success"} details="Metro schedule coordinate logs" />
      <StatusCard title="Shuttle Bus Fleet" statusText="Deployable" statusType="success" details="Transit overflow buses standby" />
    </div>
  );
}

/**
 * Vendor Command Center Dashboard.
 */
export function VendorDashboard() {
  const { activeScenario } = useScenario();
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
      <StatusCard title="Food Court Stand 3 wait" statusText={activeScenario === "stock_shortage" ? "Queue delay" : "3m wait"} statusType={activeScenario === "stock_shortage" ? "warning" : "success"} details="Refill dispatches active" />
      <MetricCard title="Retail Inventory" value={activeScenario === "stock_shortage" ? "15%" : "85%"} changeType="stable" subtitle="Concessions stand stock margin" />
      <StatusCard title="Sales revenue status" statusText="Optimal" statusType="success" details="Halftime demand curve forecast ready" />
    </div>
  );
}

/**
 * Volunteer Command Center Dashboard.
 */
export function VolunteerDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
      <StatusCard title="Volunteer Tasks Queue" statusText="4 Active" statusType="neutral" details="Seat finder assistance dispatches" />
      <MetricCard title="Attendance Coverage" value="98%" changeType="stable" subtitle="Steward checkin registries optimal" />
      <StatusCard title="PA Announcements link" statusText="Online" statusType="success" details="Dynamic signage broadcasts sync" />
    </div>
  );
}

/**
 * Executive Command Center Dashboard.
 */
export function ExecutiveDashboard() {
  const { activeScenario } = useScenario();
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
      <MetricCard title="Venue Safety Health" value={activeScenario === "clear" ? "99.8%" : "94.2%"} changeType="stable" subtitle="Unified operations index" />
      <MetricCard title="Match Day Attendance" value="84,250" changeType="stable" subtitle="Lusail Stadium seating bowl" />
      <StatusCard title="AI Prediction confidence" statusText="98.2%" statusType="success" details="ArenaMind decision tree active" />
    </div>
  );
}

/**
 * Administration Center Dashboard.
 */
export function AdminDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
      <StatusCard title="User Permissions config" statusText="Audited" statusType="success" details="Role-Based access control logs" />
      <MetricCard title="Model parameters" value="14 Online" changeType="stable" subtitle="AI Agent parameters registry" />
      <StatusCard title="System configuration" statusText="Synchronized" statusType="success" details="Supabase database link status" />
    </div>
  );
}
