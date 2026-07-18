import { TwinSector, TwinMarker } from "./DigitalTwin.types";

export const STADIUM_SECTORS: TwinSector[] = [
  {
    id: "north",
    name: "North Seating Stand",
    occupancy: 93,
    status: "crowded",
    coordinates: "M 50 15 Q 100 10 150 15 L 160 40 Q 100 35 40 40 Z",
  },
  {
    id: "east",
    name: "East Seating Stand",
    occupancy: 89,
    status: "clear",
    coordinates: "M 165 45 Q 190 100 165 155 L 140 145 Q 160 100 140 55 Z",
  },
  {
    id: "south",
    name: "South Seating Stand",
    occupancy: 84,
    status: "clear",
    coordinates: "M 150 185 Q 100 190 50 185 L 40 160 Q 100 165 160 160 Z",
  },
  {
    id: "west",
    name: "West Seating Stand",
    occupancy: 76,
    status: "clear",
    coordinates: "M 35 155 Q 10 100 35 45 L 60 55 Q 40 100 60 145 Z",
  },
];

export const STADIUM_MARKERS: TwinMarker[] = [
  // GATES
  {
    id: "gate_1",
    name: "Gate 1 - Kadapara Road (General)",
    type: "gate",
    status: "ok",
    x: 95,
    y: 15,
    label: "Gate 1 OK",
    stats: "Queue: 430 | Avg Wait: 4m | Scanners: 10/10",
    prediction: "Flow normal, expected steady rate next 20m.",
    opStatus: "OPEN - 3500 tickets processed",
    incidentHistory: "No active incidents"
  },
  {
    id: "gate_2",
    name: "Gate 2 - Metro Ingress (General)",
    type: "gate",
    status: "alert",
    x: 105,
    y: 185,
    label: "Gate 2 Delay",
    stats: "Queue: 830 | Avg Wait: 8m | Scanners: 12/12",
    prediction: "Crowd density high from train arrival. Wait time to increase by 2m.",
    opStatus: "OPEN - Influx Rate: 48/min",
    incidentHistory: "1 ticket scanner reset complete"
  },
  {
    id: "gate_3",
    name: "Gate 3 - Main Entrance (Public)",
    type: "gate",
    status: "critical",
    x: 155,
    y: 135,
    label: "Gate 3 Surge",
    stats: "Queue: 2450 | Avg Wait: 15m | Scanners: 16/16",
    prediction: "Congestion peak predicted for next 12m. Crowd AI recommends rerouting to 3A.",
    opStatus: "OPEN - Ticket validation at 98.7%",
    incidentHistory: "1 queue barrier adjustment active"
  },
  {
    id: "gate_3a",
    name: "Gate 3A - Overflow Entry",
    type: "gate",
    status: "ok",
    x: 145,
    y: 145,
    label: "Gate 3A OK",
    stats: "Queue: 120 | Avg Wait: 2m | Scanners: 8/8",
    prediction: "Can absorb 400 additional arrivals from Gate 3.",
    opStatus: "OPEN - Active dispatch route from Gate 3",
    incidentHistory: "No active incidents"
  },
  {
    id: "gate_4",
    name: "Gate 4 - Main Stand (Corporate)",
    type: "gate",
    status: "ok",
    x: 100,
    y: 55,
    label: "Gate 4 OK",
    stats: "Queue: 80 | Avg Wait: 1.5m | Scanners: 6/6",
    prediction: "Corporate flow minimal; steady.",
    opStatus: "OPEN - VIP accreditation active",
    incidentHistory: "No active incidents"
  },
  {
    id: "gate_4a",
    name: "Gate 4A - Sports Academy",
    type: "gate",
    status: "ok",
    x: 50,
    y: 110,
    label: "Gate 4A OK",
    stats: "Queue: 35 | Avg Wait: 1m | Scanners: 4/4",
    prediction: "Flow minimal; team arrivals complete.",
    opStatus: "OPEN - Restricted access only",
    incidentHistory: "No active incidents"
  },
  {
    id: "gate_4b",
    name: "Gate 4B - General Stand",
    type: "gate",
    status: "ok",
    x: 55,
    y: 50,
    label: "Gate 4B OK",
    stats: "Queue: 180 | Avg Wait: 3m | Scanners: 8/8",
    prediction: "Throughput normal.",
    opStatus: "OPEN - Ticket validation at 99.1%",
    incidentHistory: "No active incidents"
  },
  {
    id: "gate_5",
    name: "Gate 5 - Corporate Entry",
    type: "gate",
    status: "ok",
    x: 25,
    y: 15,
    label: "Gate 5 OK",
    stats: "Queue: 40 | Avg Wait: 1m | Scanners: 4/4",
    prediction: "Flow normal.",
    opStatus: "OPEN - Corporate passes verified",
    incidentHistory: "No active incidents"
  },
  {
    id: "vip_gate",
    name: "VIP Gate - Officials & Media",
    type: "gate",
    status: "ok",
    x: 80,
    y: 40,
    label: "VIP Gate OK",
    stats: "Queue: 12 | Avg Wait: 0.5m | Scanners: 4/4",
    prediction: "Officials, players, and media flow normal.",
    opStatus: "OPEN - VIP security protocol active",
    incidentHistory: "No active incidents"
  },
  
  // PARKING
  {
    id: "vip_parking",
    name: "VIP Hospitality Parking Lot",
    type: "parking",
    status: "ok",
    x: 120,
    y: 40,
    label: "VIP Park: 94%",
    stats: "Occupancy: 94% | 470/500 bays filled",
    prediction: "VIP lot expected to reach 100% capacity in 10m.",
    opStatus: "ACTIVE - Valet routing in place",
    incidentHistory: "No active incidents"
  },
  {
    id: "public_parking",
    name: "Public Parking Area (5000 slots)",
    type: "parking",
    status: "ok",
    x: 60,
    y: 130,
    label: "Public Park: 72%",
    stats: "Occupancy: 72% | 3622/5000 bays filled",
    prediction: "Remaining 1378 slots sufficient for pre-match period.",
    opStatus: "ACTIVE - EV Chargers: 9/18 in use",
    incidentHistory: "Minor congestion near P2 exit resolved"
  },
  
  // MEDICAL
  {
    id: "medical_clinic",
    name: "Medical Clinic Sector 104",
    type: "medical",
    status: "ok",
    x: 140,
    y: 130,
    label: "Clinics Standby",
    stats: "8 Rooms Open | Doctors: 12 | Paramedics: 28",
    prediction: "Medical team standby. Response path clear.",
    opStatus: "OPERATIONAL - response fleet optimized",
    incidentHistory: "1 spectator heat exhaustion resolved"
  },
  {
    id: "medical_sos",
    name: "Emergency SOS Alarm: Seat 204",
    type: "sos",
    status: "critical",
    x: 90,
    y: 20,
    label: "SOS Active",
    stats: "Active SOS | Seat 204, Row G | Response Time: 2m 18s",
    prediction: "Paramedics arriving via Corridor G. Estimate: 45s.",
    opStatus: "DISPATCHED - 2 Paramedics deployed",
    incidentHistory: "Triggered via guest app at 11:42:18"
  },
  
  // SECURITY & CCTV
  {
    id: "cctv_ai",
    name: "AI CCTV Control Center",
    type: "security",
    status: "ok",
    x: 95,
    y: 25,
    label: "124 AI Cameras",
    stats: "Cameras: 124 Online | Bag Scanners: 18 | Metal Detectors: 34",
    prediction: "AI facial recognition scanning matches profile databases. 0 threat matches.",
    opStatus: "OPERATIONAL - active surveillance flow",
    incidentHistory: "No active incidents"
  },
  
  // UTILITIES & FLOODLIGHTS
  {
    id: "substation",
    name: "Grid Power Substation (VYBK)",
    type: "powerGrid",
    status: "ok",
    x: 105,
    y: 175,
    label: "Grid Stable",
    stats: "Load: 2.4 MW | Power Factor: 0.98",
    prediction: "Demand peak expected at kickoff. Generators ready.",
    opStatus: "ACTIVE - Power grid stable",
    incidentHistory: "No active incidents"
  },
  {
    id: "generators",
    name: "Diesel Backup Generator Bay",
    type: "powerGrid",
    status: "ok",
    x: 160,
    y: 60,
    label: "6 Gen Standby",
    stats: "Generators: 6 Backup Ready | Uptime: 100%",
    prediction: "Generator auto-switch latency: <1.2s on grid failure.",
    opStatus: "STANDBY - Fuel level: 100%",
    incidentHistory: "Weekly load testing complete"
  },
  {
    id: "floodlights",
    name: "High Intensity LED Floodlights",
    type: "powerGrid",
    status: "ok",
    x: 170,
    y: 80,
    label: "608 LEDs OK",
    stats: "608 / 608 Online | Luminosity: 2500 Lux",
    prediction: "Zero lighting faults predicted. Systems fully checked.",
    opStatus: "ACTIVE - FIFA Elite Approved Class A",
    incidentHistory: "No active incidents"
  },
  {
    id: "water_pumps",
    name: "Water Distribution Sub-Center",
    type: "equipment",
    status: "ok",
    x: 40,
    y: 60,
    label: "5 Pumps Active",
    stats: "5 Pumps active | Recycled water: 78%",
    prediction: "Water reserves sufficient for 4.5h peak match loads.",
    opStatus: "OPERATIONAL - Pressure: 84 psi",
    incidentHistory: "No active incidents"
  },
  
  // MAINTENANCE
  {
    id: "maint_hotspot",
    name: "Work Order: Concourse Smart Waste Bin",
    type: "maintenance",
    status: "alert",
    x: 45,
    y: 140,
    label: "Waste Bin 78%",
    stats: "Fill Level: 78% | Section 4 Concourse",
    prediction: "Trash overflow predicted in 18 minutes. Dispatching crew.",
    opStatus: "PENDING - Cleaning crew 3 dispatched",
    incidentHistory: "Reported by waste level sensors at 11:42:26"
  }
];
