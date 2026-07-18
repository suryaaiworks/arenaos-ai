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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left w-full">
      <MetricCard title="Turnstile Flow Rate" value="380/min" change="+40/min" changeType="increase" subtitle="Baseline scanner throughput" />
      <MetricCard title="Gate 3 Ingress Load" value={activeScenario === "gate_congestion" ? "96%" : "64%"} changeType="stable" subtitle="Turnstile capacity margins" />
      <StatusCard title="Facilities Operations" statusText="Optimal" statusType="success" details="Smart cleaning and equipment checklists online." />
      <MetricCard title="AI Agent Health" value="99.8%" changeType="stable" subtitle="Agent core platform uptime" />
    </div>
  );
}

/**
 * Security Command Center Dashboard.
 */
export function SecurityDashboard() {
  const { activeScenario } = useScenario();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left w-full">
      <MetricCard title="Threat Level" value={activeScenario === "security_threat" ? "ELEVATED" : "LOW"} changeType="stable" subtitle="Perimeter grids secure" />
      <StatusCard title="VIP Gate Security" statusText={activeScenario === "security_threat" ? "BREACH ALERT" : "SECURED"} statusType={activeScenario === "security_threat" ? "error" : "success"} details="Officials/Players perimeter gate logs" />
      <StatusCard title="AI CCTV Scanners" statusText="124 Online" statusType="success" details="Facial recognition, 18 bag scanners, 34 metal detectors active" />
      <MetricCard title="Security Personnel" value="468 Deployed" changeType="stable" subtitle="Total on-duty field officers" />
    </div>
  );
}

/**
 * Medical Command Center Dashboard.
 */
export function MedicalDashboard() {
  const { activeScenario } = useScenario();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left w-full">
      <StatusCard title="SOS Requests" statusText={activeScenario === "medical_sos" ? "1 Active SOS" : "0 Active"} statusType={activeScenario === "medical_sos" ? "error" : "success"} details="Active spectator emergency triggers" />
      <MetricCard title="Avg Response Time" value={activeScenario === "medical_sos" ? "120s" : "2m 18s"} changeType="stable" subtitle="Clinics dispatch route optimized" />
      <StatusCard title="Medical Rooms" statusText="8 Clinics Standby" statusType="success" details="8 medical rooms, 24 AED stations active" />
      <MetricCard title="Ambulances & Crew" value="6 Standby" changeType="stable" subtitle="12 Doctors and 28 Paramedics active" />
    </div>
  );
}

/**
 * Transport Command Center Dashboard.
 */
export function TransportationDashboard() {
  const { activeScenario } = useScenario();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left w-full">
      <MetricCard title="VIP Parking Occupancy" value={activeScenario === "parking_full" ? "98%" : "94%"} changeType="stable" subtitle="VIP Parking Lot" />
      <MetricCard title="Public Parking Occupancy" value={activeScenario === "parking_full" ? "99%" : "72%"} changeType="stable" subtitle="1378 slots remaining" />
      <StatusCard title="Metro Ingress Crowd" statusText={activeScenario === "metro_failure" ? "Signal Delay" : "Gate 2 Metro Influx High"} statusType={activeScenario === "metro_failure" ? "error" : "success"} details="Kolkata Metro station shuttle loops active" />
      <MetricCard title="EV Chargers status" value="9 / 18 Chargers" changeType="stable" subtitle="EV charging stations in-use" />
    </div>
  );
}

/**
 * Vendor Command Center Dashboard.
 */
export function VendorDashboard() {
  const { activeScenario } = useScenario();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left w-full">
      <StatusCard title="Average Concessions Wait" statusText={activeScenario === "stock_shortage" ? "6m wait" : "4m wait"} statusType={activeScenario === "stock_shortage" ? "warning" : "success"} details="Burger queue: 3m | Pizza: 5m | Coffee: 2m" />
      <MetricCard title="Concessions Stock" value={activeScenario === "stock_shortage" ? "15%" : "85%"} changeType="stable" subtitle="Inventory across food stands" />
      <StatusCard title="Orders Today" statusText="18,234 Orders" statusType="success" details="Point-of-sale transactions synced" />
      <MetricCard title="Food Courts Status" value="16 Courts Online" changeType="stable" subtitle="16 active concessions blocks" />
    </div>
  );
}

/**
 * Volunteer Command Center Dashboard.
 */
export function VolunteerDashboard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left w-full">
      <StatusCard title="Volunteer Tasks Queue" statusText="4 Active" statusType="neutral" details="Seat finder assistance dispatches" />
      <MetricCard title="Steward Coverage" value="98%" changeType="stable" subtitle="Steward check-in registers online" />
      <StatusCard title="PA Audio Broadcasts" statusText="Online" statusType="success" details="Dynamic stadium audio & signage sync" />
      <MetricCard title="Active Marshals" value="120 On-Duty" changeType="stable" subtitle="On-duty marshal deployment" />
    </div>
  );
}

/**
 * Executive Command Center Dashboard.
 */
export function ExecutiveDashboard() {
  const { activeScenario } = useScenario();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left w-full">
      <MetricCard title="Venue Safety Health" value={activeScenario === "clear" ? "99.8%" : "94.2%"} changeType="stable" subtitle="Unified operations index" />
      <MetricCard title="Match Day Attendance" value="84,250" changeType="stable" subtitle="Salt Lake Stadium seating bowl" />
      <StatusCard title="AI Prediction confidence" statusText="98.2%" statusType="success" details="ArenaMind decision tree active" />
      <MetricCard title="Est. Total Revenue" value="$2.4M" changeType="stable" subtitle="Ticket, concessions, & retail metrics" />
    </div>
  );
}

/**
 * Administration Center Dashboard.
 */
export function AdminDashboard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left w-full">
      <StatusCard title="User Permissions config" statusText="Audited" statusType="success" details="Role-Based access control logs" />
      <MetricCard title="Model parameters" value="14 Online" changeType="stable" subtitle="AI Agent parameters registry" />
      <StatusCard title="System configuration" statusText="Synchronized" statusType="success" details="Supabase database link status" />
      <MetricCard title="API Server Latency" value="12ms" changeType="stable" subtitle="Database dial connection checks" />
    </div>
  );
}

/**
 * AI Agents Registry Command Center Dashboard.
 */
export function AIAgentsDashboard() {
  const { activeScenario } = useScenario();
  
  let healthValue = "99.8%";
  let healthType: "success" | "warning" | "error" = "success";
  if (activeScenario === "security_threat") {
    healthValue = "97.2%";
    healthType = "warning";
  }

  let memoryValue = "4.2GB / 8GB";
  if (activeScenario === "gate_congestion") {
    memoryValue = "6.8GB / 8GB";
  } else if (activeScenario === "medical_sos") {
    memoryValue = "5.1GB / 8GB";
  }

  let toolsRate = "1,420/hr";
  if (activeScenario === "gate_congestion") {
    toolsRate = "2,840/hr";
  } else if (activeScenario === "weather_delay") {
    toolsRate = "3,110/hr";
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left w-full">
      <MetricCard title="Registered AI Agents" value="38 Active" changeType="stable" subtitle="2 Busy / 0 Offline" />
      <StatusCard title="Avg Agent Health" statusText={healthValue} statusType={healthType} details="Heartbeat loops healthy" />
      <MetricCard title="Memory Pool" value={memoryValue} changeType="stable" subtitle="Unified memory space usage" />
      <MetricCard title="Tool Executions" value={toolsRate} changeType="stable" subtitle="Function call rate per hour" />
    </div>
  );
}

/**
 * Gate Influx Command Center Dashboard.
 */
export function GateInfluxDashboard() {
  const { activeScenario } = useScenario();

  let occupancyVal = "78%";
  let queueVal = "3m wait";
  let queueType: "success" | "warning" | "error" = "success";
  
  if (activeScenario === "gate_congestion") {
    occupancyVal = "98%";
    queueVal = "18m wait";
    queueType = "error";
  } else if (activeScenario === "security_threat") {
    occupancyVal = "89%";
    queueVal = "11m wait";
    queueType = "warning";
  }

  let scannersText = "24 Active";
  let scannersType: "success" | "warning" | "error" = "success";
  if (activeScenario === "security_threat") {
    scannersText = "20 Active / 4 Alert";
    scannersType = "error";
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left w-full">
      <MetricCard title="Gate 3 Ingress Occupancy" value={occupancyVal} changeType="stable" subtitle="Gate 3 Main Public Entrance capacity" />
      <StatusCard title="Queue Waiting Time" statusText={queueVal} statusType={queueType} details="Average turnstile validation wait" />
      <StatusCard title="Security Scanners Status" statusText={scannersText} statusType={scannersType} details="Turnstiles validation & metal detectors" />
      <MetricCard title="Throughput & Tickets" value="98.7% Validated" changeType="stable" subtitle="Ticket check / validation rate" />
    </div>
  );
}

/**
 * Power & Utilities Command Center Dashboard.
 */
export function PowerUtilitiesDashboard() {
  const { activeScenario } = useScenario();

  let loadValue = "2.4 MW";
  let genText = "6 Backup / 100%";
  let genType: "success" | "warning" | "error" = "success";
  let hvacText = "Optimal";
  let hvacType: "success" | "warning" | "error" = "success";
  let waterText = "5 Pumps Active / Normal";

  if (activeScenario === "weather_delay") {
    loadValue = "3.8 MW";
    genText = "ACTIVE / 92%";
    genType = "warning";
    hvacText = "Smoke alert Sector S";
    hvacType = "error";
    waterText = "Low pressure Sector S";
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left w-full">
      <MetricCard title="Power Grid Load" value={loadValue} changeType="stable" subtitle="Salt Lake Stadium grid loop usage" />
      <StatusCard title="UPS & Generators" statusText={genText} statusType={genType} details="Backup power generators & UPS check" />
      <StatusCard title="HVAC Stadium Cooling" statusText={hvacText} statusType={hvacType} details="Environmental temperature loops" />
      <MetricCard title="Water System" value={waterText} changeType="stable" subtitle="5 core pumps, recycling 78% water" />
    </div>
  );
}

/**
 * Facility Maintenance Command Center Dashboard.
 */
export function FacilityMaintenanceDashboard() {
  const { activeScenario } = useScenario();

  let maintValue = "8 Active";
  let cleaningText = "14 Deployed";
  let wasteVal = "34% Fill";

  if (activeScenario === "weather_delay") {
    maintValue = "18 Active";
  } else if (activeScenario === "gate_congestion") {
    cleaningText = "24 Deployed";
    wasteVal = "78% Fill";
  }

  let fixturesText = "99.2% OK";
  let fixturesType: "success" | "warning" | "error" = "success";
  if (activeScenario === "security_threat") {
    fixturesText = "96.4% OK";
    fixturesType = "warning";
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left w-full">
      <MetricCard title="Maintenance Requests" value={maintValue} changeType="stable" subtitle="Active work order queues status" />
      <MetricCard title="Cleaning Crew" value={cleaningText} changeType="stable" subtitle="Dynamic crew members allocation logs" />
      <StatusCard title="Light Fixture Status" statusText={fixturesText} statusType={fixturesType} details="608 High Intensity LEDs" />
      <MetricCard title="Waste Tank Fill" value={wasteVal} changeType="stable" subtitle="Waste level across smart receptacles" />
    </div>
  );
}
