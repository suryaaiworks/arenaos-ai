import { TwinSector, TwinMarker } from "./DigitalTwin.types";

export const STADIUM_SECTORS: TwinSector[] = [
  {
    id: "north",
    name: "North Seating Stand",
    occupancy: 82,
    status: "clear",
    coordinates: "M 50 15 Q 100 10 150 15 L 160 40 Q 100 35 40 40 Z",
  },
  {
    id: "east",
    name: "East Seating Stand",
    occupancy: 35,
    status: "clear",
    coordinates: "M 165 45 Q 190 100 165 155 L 140 145 Q 160 100 140 55 Z",
  },
  {
    id: "south",
    name: "South Seating Stand",
    occupancy: 64,
    status: "clear",
    coordinates: "M 150 185 Q 100 190 50 185 L 40 160 Q 100 165 160 160 Z",
  },
  {
    id: "west",
    name: "West Seating Stand",
    occupancy: 91,
    status: "crowded",
    coordinates: "M 35 155 Q 10 100 35 45 L 60 55 Q 40 100 60 145 Z",
  },
];

export const STADIUM_MARKERS: TwinMarker[] = [
  { id: "gate_a", name: "Gate A Ingress", type: "gate", status: "alert", x: 95, y: 15, label: "Gate A Delay" },
  { id: "gate_b", name: "Gate B Ingress", type: "gate", status: "ok", x: 105, y: 185, label: "Gate B OK" },
  { id: "sos_204", name: "Emergency: Seat 204", type: "sos", status: "critical", x: 155, y: 135, label: "SOS Active" },
  { id: "med_unit_1", name: "Medical Responder Unit 1", type: "medical", status: "ok", x: 100, y: 55, label: "Med Unit 1" },
  { id: "sec_patrol_2", name: "Security Patrol 2", type: "security", status: "ok", x: 50, y: 110, label: "Patrol 2" },
  { id: "food_court_3", name: "Concessions Food Stand 3", type: "concession", status: "ok", x: 55, y: 50, label: "Food 3" },
  { id: "parking_a", name: "North Parking Zone A", type: "parking", status: "alert", x: 25, y: 15, label: "Parking A" },
];
