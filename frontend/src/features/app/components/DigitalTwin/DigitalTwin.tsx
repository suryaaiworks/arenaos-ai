"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { DigitalTwinProps, TwinLayerId, TwinSector, TwinMarker } from "./DigitalTwin.types";
import { STADIUM_SECTORS, STADIUM_MARKERS } from "./DigitalTwin.data";
import { useScenario } from "../../providers/ScenarioProvider";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";

const LAYER_LABELS: Record<TwinLayerId, string> = {
  crowd: "Crowd Heatmap",
  seats: "Seat Occupancy",
  security: "Restricted Zones",
  medical: "Medical Responders",
  parking: "Parking lots",
  transit: "Transit Hubs",
  concessions: "Concessions status",
  utilities: "Utility grids",
  accessibility: "Wheelchair paths",
};

/**
 * Flagship Interactive 3D Stadium Digital Twin Engine.
 * Implements SVG rendering pipeline, independent layers, dispatch paths, and selector hooks.
 */
export function DigitalTwin({
  activeLayers: initialLayers = ["crowd", "medical", "security", "utilities"],
  onSelectObject,
  className = "",
  ...props
}: DigitalTwinProps) {
  const { activeScenario } = useScenario();
  const [layers, setLayers] = useState<TwinLayerId[]>(initialLayers);
  const [zoom, setZoom] = useState(1);
  const [pitch, setPitch] = useState(58);
  const [rotate, setRotate] = useState(-12);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);

  const [dragMode, setDragMode] = useState<"none" | "rotate" | "pan">("none");
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [initialAngles, setInitialAngles] = useState({ pitch: 58, rotate: -12 });
  const [initialPan, setInitialPan] = useState({ x: 0, y: 0 });
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setDragMode("rotate");
      setDragStart({ x: e.clientX, y: e.clientY });
      setInitialAngles({ pitch, rotate });
    } else if (e.button === 2) {
      e.preventDefault();
      setDragMode("pan");
      setDragStart({ x: e.clientX, y: e.clientY });
      setInitialPan({ x: panX, y: panY });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragMode === "none") return;
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    if (dragMode === "rotate") {
      setRotate(initialAngles.rotate + deltaX * 0.4);
      setPitch(Math.max(20, Math.min(85, initialAngles.pitch - deltaY * 0.4)));
    } else if (dragMode === "pan") {
      setPanX(initialPan.x + deltaX);
      setPanY(initialPan.y + deltaY);
    }
  };

  const handleMouseUp = () => {
    setDragMode("none");
  };

  const handleWheel = (e: React.WheelEvent) => {
    setZoom((z) => Math.max(0.5, Math.min(2.5, z - e.deltaY * 0.001)));
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const toggleLayer = (layerId: TwinLayerId) => {
    setLayers((prev) =>
      prev.includes(layerId) ? prev.filter((l) => l !== layerId) : [...prev, layerId]
    );
  };

  const handleSelectSector = (sector: TwinSector) => {
    setSelectedId(sector.id);
    if (onSelectObject) {
      onSelectObject({
        id: sector.id,
        name: sector.name,
        type: "Stand",
        metrics: {
          Occupancy: `${sector.occupancy}%`,
          Status: sector.occupancy > 90 ? "CROWD CONGESTION" : "OPTIMAL",
          Capacity: "18,500 seats",
          Volunteers: "24 assigned",
        },
      });
    }
  };

  const handleSelectMarker = (marker: TwinMarker) => {
    setSelectedId(marker.id);
    if (onSelectObject) {
      onSelectObject({
        id: marker.id,
        name: marker.name,
        type: marker.type.toUpperCase(),
        metrics: {
          Status: marker.status === "critical" ? "CRITICAL ALERT" : marker.status === "alert" ? "WARNING" : "OPERATIONAL",
          Location: `Coords [${marker.x}, ${marker.y}]`,
          Priority: marker.status === "critical" ? "HIGH" : "NORMAL",
          Details: marker.id === "sos_204" ? "Spectator distress trigger seat 12" : "Telemetry coordinates active",
        },
      });
    }
  };

  return (
    <div className={cn("flex flex-col lg:flex-row gap-6 w-full items-start", className)} {...props}>
      {/* Central Twin Canvas Frame */}
      <GlassCard
        padding="none"
        rounded="md"
        border={true}
        className="flex-1 bg-arena-surface/40 flex flex-col items-center justify-center relative overflow-hidden h-[440px] w-full cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        onContextMenu={handleContextMenu}
        onDoubleClick={() => {
          setZoom(1);
          setPitch(58);
          setRotate(-12);
          setPanX(0);
          setPanY(0);
          setSelectedId(null);
        }}
      >
        {/* Isometric Grid Backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none select-none opacity-40" />

        {/* Viewport Preset Views (Top Left) */}
        <div className="absolute top-4 left-4 flex space-x-1.5 z-20 flex-wrap gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => { e.stopPropagation(); setPitch(0); setRotate(0); setPanX(0); setPanY(0); }}
            className="px-2 h-7 text-[8px] bg-black/60 border-white/10 text-white font-mono"
          >
            TOP
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => { e.stopPropagation(); setPitch(75); setRotate(0); setPanX(0); setPanY(0); }}
            className="px-2 h-7 text-[8px] bg-black/60 border-white/10 text-white font-mono"
          >
            SIDE
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => { e.stopPropagation(); setPitch(45); setRotate(-35); setPanX(0); setPanY(0); }}
            className="px-2 h-7 text-[8px] bg-black/60 border-white/10 text-white font-mono"
          >
            BCAST
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => { e.stopPropagation(); setPitch(75); setRotate(45); setPanX(0); setPanY(0); }}
            className="px-2 h-7 text-[8px] bg-black/60 border-white/10 text-white font-mono"
          >
            BIRD
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => { e.stopPropagation(); setPitch(60); setRotate(-10); setPanX(0); setPanY(0); }}
            className="px-2 h-7 text-[8px] bg-black/60 border-white/10 text-white font-mono"
          >
            OPERATOR
          </Button>
        </div>

        {/* Viewport scale zoom & rotate controls */}
        <div className="absolute top-4 right-4 flex space-x-2 z-20">
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => { e.stopPropagation(); setZoom((z) => Math.min(z + 0.1, 1.5)); }}
            className="p-1 h-8 w-8 text-xs bg-black/60 border-white/10 text-white"
            aria-label="Zoom in digital twin"
          >
            +
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => { e.stopPropagation(); setZoom((z) => Math.max(z - 0.1, 0.7)); }}
            className="p-1 h-8 w-8 text-xs bg-black/60 border-white/10 text-white"
            aria-label="Zoom out digital twin"
          >
            -
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => { e.stopPropagation(); setRotate((r) => r - 15); }}
            className="p-1 h-8 w-8 text-xs bg-black/60 border-white/10 text-white font-mono"
            aria-label="Rotate left"
          >
            ↺
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => { e.stopPropagation(); setRotate((r) => r + 15); }}
            className="p-1 h-8 w-8 text-xs bg-black/60 border-white/10 text-white font-mono"
            aria-label="Rotate right"
          >
            ↻
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setZoom(1);
              setPitch(58);
              setRotate(-12);
              setPanX(0);
              setPanY(0);
              setSelectedId(null);
            }}
            className="px-2 h-8 text-[10px] bg-black/60 border-white/10 text-white font-mono"
          >
            RESET
          </Button>
        </div>

        {/* 3D Transform isometric viewport */}
        <div
          className="relative transition-all duration-300 flex items-center justify-center"
          style={{
            transform: `translate(${panX}px, ${panY}px) scale(${zoom})`,
            perspective: "1000px",
          }}
        >
          <div
            className="relative w-[450px] h-[450px] flex items-center justify-center transition-all duration-300"
            style={{
              transform: `rotateX(${pitch}deg) rotateY(0deg) rotateZ(${rotate}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            {/* SVG Renderer Canvas */}
            <svg
              className="absolute inset-0 w-full h-full overflow-visible"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Pitch Field element */}
              <rect
                x="75"
                y="70"
                width="50"
                height="60"
                className="stroke-emerald-500/50 fill-emerald-950/20"
                strokeWidth="1.5"
                rx="2"
              />
              <circle cx="100" cy="100" r="10" className="stroke-emerald-500/30" strokeWidth="1" />
              <line x1="75" y1="100" x2="125" y2="100" className="stroke-emerald-500/30" strokeWidth="1" />

              {/* Seating stand sectors paths */}
              {STADIUM_SECTORS.map((sector) => {
                const isSelected = selectedId === sector.id;
                const isCrowdOn = layers.includes("crowd");
                
                // Color mapping depending on layers
                let fillVal = "rgba(255, 255, 255, 0.05)";
                if (isCrowdOn) {
                  if (sector.id === "west" || activeScenario === "gate_congestion" && sector.id === "north") {
                    fillVal = "rgba(245, 158, 11, 0.25)"; // occupancy amber
                  } else if (activeScenario === "weather_delay" && sector.id === "south") {
                    fillVal = "rgba(239, 68, 68, 0.25)"; // alert red
                  } else {
                    fillVal = "rgba(16, 185, 129, 0.15)"; // clear green
                  }
                }

                let borderVal = isSelected ? "rgba(59, 130, 246, 0.9)" : "rgba(255, 255, 255, 0.1)";
                if (layers.includes("security") && sector.id === "west") {
                  borderVal = "rgba(239, 68, 68, 0.6)"; // Security boundary alert
                }

                return (
                  <path
                    key={sector.id}
                    d={sector.coordinates}
                    fill={fillVal}
                    stroke={borderVal}
                    strokeWidth={isSelected ? 2 : 1}
                    className="cursor-pointer transition-all hover:fill-white/10"
                    onClick={() => handleSelectSector(sector)}
                  />
                );
              })}

              {/* AI Dispatch flowing paths (stroke-dasharray animated overlay) */}
              {layers.includes("utilities") && activeScenario === "medical_sos" && (
                <path
                  d="M 100 55 Q 130 90 155 135"
                  fill="none"
                  stroke="rgba(239, 68, 68, 0.8)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  className="animate-flow-line"
                />
              )}

              {layers.includes("utilities") && activeScenario === "gate_congestion" && (
                <path
                  d="M 95 15 Q 140 100 105 185"
                  fill="none"
                  stroke="rgba(245, 158, 11, 0.8)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  className="animate-flow-line"
                />
              )}
            </svg>

            {/* Marker elements (floating relative pins translated out of plane) */}
            {STADIUM_MARKERS.map((marker) => {
              // Layer filter checks
              if (marker.type === "parking" && !layers.includes("parking")) return null;
              if (marker.type === "sos" && !layers.includes("medical")) return null;
              if (marker.type === "medical" && !layers.includes("medical")) return null;
              if (marker.type === "security" && !layers.includes("security")) return null;
              if (marker.type === "concession" && !layers.includes("concessions")) return null;

              const isSelected = selectedId === marker.id;
              const isAlert = marker.status === "critical" || marker.status === "alert";

              return (
                <button
                  key={marker.id}
                  onClick={() => handleSelectMarker(marker)}
                  className={cn(
                    "absolute h-2.5 w-2.5 rounded-full border border-white cursor-pointer transition-transform duration-200 select-none",
                    marker.type === "sos" && "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)] animate-pulse",
                    marker.type === "gate" && "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]",
                    marker.type === "medical" && "bg-emerald-500",
                    marker.type === "security" && "bg-blue-500",
                    marker.type === "parking" && "bg-indigo-500",
                    marker.type === "concession" && "bg-purple-500",
                    isSelected && "scale-150 ring-2 ring-white"
                  )}
                  style={{
                    left: `${marker.x - 1.25}%`,
                    top: `${marker.y - 1.25}%`,
                    transform: "translateZ(14px) rotateX(-58deg) rotateY(0deg) rotateZ(12deg)",
                    transformStyle: "preserve-3d",
                  }}
                  aria-label={marker.name}
                >
                  {/* Glowing halo for alert pins */}
                  {isAlert && (
                    <span className="absolute inset-0 rounded-full h-full w-full bg-inherit animate-ping opacity-75" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Legend info panel */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between text-[8px] font-mono text-arena-muted select-none">
          <span>OPERATIONAL DIGITAL TWIN</span>
          <span>CLICK MAP OBJECTS FOR DETAILS</span>
        </div>
      </GlassCard>

      {/* Right Side: Reusable Layer Controls Panel (Cols 3 width equivalent) */}
      <GlassCard
        padding="sm"
        rounded="sm"
        border={true}
        className="w-full lg:w-60 bg-arena-surface/30 p-4 flex flex-col space-y-4 shrink-0 text-left select-none"
      >
        <span className="text-[10px] uppercase font-bold text-arena-muted tracking-wider font-mono">
          Visualization Layers
        </span>
        <div className="flex flex-col space-y-2">
          {(Object.keys(LAYER_LABELS) as TwinLayerId[]).map((layerId) => {
            const isActive = layers.includes(layerId);
            return (
              <button
                key={layerId}
                onClick={() => toggleLayer(layerId)}
                className={cn(
                  "flex items-center space-x-2.5 px-2.5 py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer",
                  isActive
                    ? "bg-arena-primary/10 border-arena-primary/20 text-white"
                    : "bg-transparent border-transparent text-arena-muted hover:text-white hover:bg-white/5"
                )}
              >
                <span
                  className={cn(
                    "h-2 w-2 rounded-full",
                    isActive ? "bg-arena-primary animate-pulse" : "bg-arena-muted/40"
                  )}
                />
                <span>{LAYER_LABELS[layerId]}</span>
              </button>
            );
          })}
        </div>
      </GlassCard>
    </div>
  );
}

export default DigitalTwin;
