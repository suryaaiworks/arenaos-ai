"use client";

import React, { useState, useEffect } from "react";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useScenario } from "@/features/app/providers/ScenarioProvider";
import { useToast } from "@/features/app/providers/ToastProvider";
import { useTheme } from "@/features/app/providers/ThemeProvider";
import { useTranslation } from "@/features/app/providers/LanguageProvider";
import { ScenarioProvider, ToastProvider, ThemeProvider, LanguageProvider } from "@/features/app/providers";
import { Language } from "@/features/app/providers/LanguageProvider/LanguageProvider.types";

type FanPageId = "home" | "ticket" | "map" | "match" | "food" | "transit" | "copilot" | "notifications" | "profile" | "settings";
type MapViewMode = "2d" | "3d" | "ar" | "crowd" | "heatmap";
type RouteOption = "fastest" | "accessible" | "uncrowded" | "food" | "scenic";

interface NotificationItem {
  id: string;
  type: "match" | "parking" | "weather" | "emergency" | "food" | "rewards" | "navigation" | "medical" | "shopping" | "arenaai";
  title: string;
  body: string;
  time: string;
  read: boolean;
  priority: "high" | "normal" | "low";
  explanation?: string;
  actionText?: string;
}

interface FoodItem {
  name: string;
  category: string;
  rating: string;
  price: number;
  isVeg: boolean;
  badge?: string;
  prepTime: string;
  queueTime: string;
  distance: string;
  stall: string;
  status: string;
  aiPick: boolean;
  desc: string;
  ingredients: string;
  allergens: string;
  socialProof?: string;
  aiReason?: string;
  calories?: string;
}

interface MerchItem {
  name: string;
  rating: string;
  price: number;
  stock: number;
  shop: string;
  distance: string;
  aiPick: boolean;
  isLimited: boolean;
  desc: string;
  material: string;
  socialProof?: string;
  aiReason?: string;
}

function FanAppContent() {
  const { activeScenario, setScenario, setSelectedObject } = useScenario();
  const { addToast } = useToast();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useTranslation();

  const [activePage, setActivePage] = useState<FanPageId>("home");
  const [countdown, setCountdown] = useState("01:22:45");
  const [sosState, setSosState] = useState<"idle" | "triggered" | "responding">("idle");
  const [eta, setEta] = useState(120);
  const [selectedFoodOption, setSelectedFoodOption] = useState<"smart" | "reserve" | "walkin">("smart");
  const [selectedMerchOption, setSelectedMerchOption] = useState<"online" | "reserve" | "walkin">("online");
  const [parkingPhotoSaved, setParkingPhotoSaved] = useState<boolean>(false);
  const [parkingVoiceRecorded, setParkingVoiceRecorded] = useState<boolean>(false);
  const [parkingMapLayer, setParkingMapLayer] = useState<string>("parking");
  const [parkingSaved, setParkingSaved] = useState<boolean>(false);
  const [copilotActionResponse, setCopilotActionResponse] = useState<{
    title: string;
    distance: string;
    walkTime: string;
    queue: string;
    cleanliness?: string;
    accessibility: string;
    route: string;
    apiEndpoint: string;
    agentName: string;
    rawJson: string;
  } | null>({
    title: "Nearest Restroom",
    distance: "82 meters",
    walkTime: "1 minute",
    queue: "Low",
    cleanliness: "98%",
    accessibility: "Yes",
    route: "Blue Route",
    apiEndpoint: "/api/copilot/restroom",
    agentName: "Navigation Agent",
    rawJson: '{\n  "status": "success",\n  "data": {\n    "destination": "Restroom Zone B (North)",\n    "distance_meters": 82,\n    "estimated_walk_seconds": 60,\n    "current_queue_density": "low",\n    "cleanliness_index": 0.98,\n    "wheelchair_accessible": true,\n    "optimal_route": "Blue Route"\n  }\n}'
  });
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [thinkingStep, setThinkingStep] = useState<number>(0);
  const [micActive, setMicActive] = useState<boolean>(false);
  const [placeholderIndex, setPlaceholderIndex] = useState<number>(0);
  const [voiceWorkflowStep, setVoiceWorkflowStep] = useState<string>("");
  const [liveSugIndex, setLiveSugIndex] = useState<number>(0);

  // Settings interactive states
  const [settingsNotifs, setSettingsNotifs] = useState({
    matchEvents: true,
    goalAlerts: true,
    foodReady: true,
    parkingReminder: true,
    emergencyAlerts: true,
    aiRecommendations: true,
    weatherAlerts: false,
    shoppingOffers: true,
  });

  const [settingsAccess, setSettingsAccess] = useState({
    largeText: false,
    reducedMotion: false,
    highContrast: false,
    voiceGuidance: false,
    wheelchairNav: false,
    colorBlind: false,
  });

  const [settingsAi, setSettingsAi] = useState({
    enableCopilot: true,
    voiceAssistant: true,
    smartSuggestions: true,
    predictiveNav: true,
    personalRecs: true,
    autoSeat: true,
    autoParking: true,
    autoResume: false,
  });

  const [settingsNavPref, setSettingsNavPref] = useState({
    fastestRoute: true,
    lessCrowded: true,
    accessibleRoute: false,
    indoorNav: true,
    avoidStairs: false,
    autoReroute: true,
  });

  const [settingsPriv, setSettingsPriv] = useState({
    saveParkingHistory: true,
    rememberFood: true,
    rememberSeat: true,
    rememberShopping: false,
    aiPersonalization: true,
    analytics: true,
  });

  // Global ticket context parameters
  const ticket = {
    gate: "Gate B",
    section: "Sector 204",
    row: "Row G",
    seat: "Seat 12",
    parkingSpace: "A27",
  };

  const [chatInput, setChatInput] = useState("");
  const [windowWidth, setWindowWidth] = useState(1600);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Notifications state
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    { id: "1", type: "match", title: "GOAL! Argentina 2 - 1 France ⚽", body: "Angel Di Maria scores in the 64th minute.", time: "18 mins ago", read: false, priority: "high", explanation: "High ingress noise expected in Sector 204. Decibel peaks near 104dB.", actionText: "View match stats" },
    { id: "2", type: "parking", title: "Parking Spot A27 status optimal 🚗", body: "Heading back to Vehicle A27? Exit route via Gate B is clear.", time: "40 mins ago", read: false, priority: "normal", explanation: "Dynamic traffic sensors indicate low exit queues on Exit Lane 3.", actionText: "Navigate to vehicle" },
    { id: "3", type: "weather", title: "Weather Update: Clear Sky 🌦", body: "Wind speed 8km/h, humidity 40%, temperature 28°C.", time: "1 hour ago", read: true, priority: "low", explanation: "Conditions will remain clear until post-match egress.", actionText: "View forecast" },
    { id: "4", type: "emergency", title: "Responder dispatch in Sector 204 🚑", body: "Field responder units stationed near Row G corridor exits.", time: "2 hours ago", read: true, priority: "high", explanation: "Precautionary crowd flow alignment setup by stadium security.", actionText: "Safety instructions" },
    { id: "5", type: "food", title: "Order #4928 Ready for Pickup 🍔", body: "Stall B12 Burgers has finished preparing your order.", time: "5 mins ago", read: false, priority: "high", explanation: "Pickup counter is currently empty, allowing instant pick.", actionText: "Collect order" },
    { id: "6", type: "navigation", title: "Reroute Alert: Stairwell B Closed 🚪", body: "Maintenance crew conducting safety rails checks.", time: "15 mins ago", read: false, priority: "normal", explanation: "ArenaOS AI recommends elevator pathing instead.", actionText: "Reroute now" },
    { id: "7", type: "medical", title: "First Aid Clinic A Fully Staffed 🩺", body: "No wait times for non-emergency medical assists.", time: "2 hours ago", read: true, priority: "low", explanation: "Heat index advisory. Stay hydrated.", actionText: "View clinic map" },
    { id: "8", type: "shopping", title: "Championship Jersey Reserved 🛍️", body: "Held at Shop B for next 35 minutes.", time: "12 mins ago", read: false, priority: "normal", explanation: "Auto-reserved based on user preference registry settings.", actionText: "Go collect" },
    { id: "9", type: "arenaai", title: "AI Predicts 22m Egress Delay 🧠", body: "Avoid exit corridors immediately after final whistle.", time: "20 mins ago", read: false, priority: "normal", explanation: "Crowd flow models suggest staying in seat for 10m post-match saves transit time.", actionText: "View exit forecast" }
  ]);
  const [notifFilter, setNotifFilter] = useState<string>("all");

  // Food & Merch segmented tabs
  const [storeTab, setStoreTab] = useState<"food" | "merch">("food");

  // Navigation page options
  const [navDestination, setNavDestination] = useState<string>("Seat 12");
  const [mapMode, setMapMode] = useState<MapViewMode>("2d");
  const [routeOption, setRouteOption] = useState<RouteOption>("fastest");
  const [floorLevel, setFloorLevel] = useState<string>("L2");
  const [selectedStadiumSection, setSelectedStadiumSection] = useState<string>(ticket.section);

  // Details Modal States
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [selectedMerch, setSelectedMerch] = useState<MerchItem | null>(null);

  // Search & Filter states
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [sortOption, setSortOption] = useState<string>("ai");

  // Hero banner carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isBannerHovered, setIsBannerHovered] = useState(false);

  const slides = [
    { title: "Official Matchday Food", subtitle: "Reserve hot concessions near Sector 204 with 2-min wait times.", bg: "from-blue-700 via-indigo-700 to-purple-800" },
    { title: "Official FIFA Merchandise", subtitle: "Collect limited edition finals jerseys at Shop B near Gate B.", bg: "from-indigo-700 via-purple-700 to-pink-800" },
    { title: "Arena AI Recommendations", subtitle: "Optimize walk times and concession queues dynamically.", bg: "from-purple-700 via-pink-700 to-rose-800" },
    { title: "Family Combo Offers", subtitle: "Bundle popcorn, sodas, and burgers to save up to ₹150.", bg: "from-pink-700 via-rose-700 to-orange-800" },
    { title: "Fastest Pickup Nearby", subtitle: "Skip counter payment queues with Smart Pay QR passes.", bg: "from-blue-800 via-teal-700 to-emerald-800" },
    { title: "Limited Edition Jerseys", subtitle: "Argentina vs France Championship Jerseys. Only 8 remaining.", bg: "from-amber-700 via-orange-700 to-red-800" }
  ];

  // Live rotating updates simulation
  const [currentLiveUpdate, setCurrentLiveUpdate] = useState(0);
  const liveUpdates = [
    "🟢 Queue dropped from 6 min to 3 min at Stall B12",
    "🔥 12 fans just ordered the Premium Veg Combo",
    "⭐ AI now recommends Pickup Counter B for faster checkout",
    "Cap: Only 5 jerseys remaining at Shop B",
    "Walk: Route updated due to concourse crowd flows",
    "Stall C: Cold drinks now available at Stall C04 with zero queue",
    "Timer: Reservation expires in 18 minutes",
  ];

  // Active orders telemetry simulations
  const [activeFoodOrder, setActiveFoodOrder] = useState<{
    name: string;
    price: number;
    method: string;
    status: "received" | "accepted" | "preparing" | "packing" | "ready" | "collected";
    countdown: number;
    stall: string;
  } | null>(null);

  const [activeMerchReservation, setActiveMerchReservation] = useState<{
    name: string;
    price: number;
    method: string;
    timeLeft: number;
    shop: string;
  } | null>(null);

  // Auto sliding carousel timer
  useEffect(() => {
    if (isBannerHovered) return;
    const bannerTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(bannerTimer);
  }, [isBannerHovered, slides.length]);

  // Live updates rotating ticker timer
  useEffect(() => {
    const updateTimer = setInterval(() => {
      setCurrentLiveUpdate((prev) => (prev + 1) % liveUpdates.length);
    }, 4000);
    return () => clearInterval(updateTimer);
  }, [liveUpdates.length]);

  // Rotate input placeholder texts
  useEffect(() => {
    const placeholderTimer = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % 8);
    }, 3000);
    return () => clearInterval(placeholderTimer);
  }, []);

  // Rotate live suggestions index
  useEffect(() => {
    const sugTimer = setInterval(() => {
      setLiveSugIndex((prev) => (prev + 1) % 5);
    }, 5000);
    return () => clearInterval(sugTimer);
  }, []);

  // Countdown timers simulation loops
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

  // Food order timer countdown simulation
  useEffect(() => {
    if (!activeFoodOrder) return;
    if (activeFoodOrder.countdown <= 0) {
      if (activeFoodOrder.status === "received") {
        setActiveFoodOrder((prev) => prev ? { ...prev, status: "accepted", countdown: 10 } : null);
      } else if (activeFoodOrder.status === "accepted") {
        setActiveFoodOrder((prev) => prev ? { ...prev, status: "preparing", countdown: 25 } : null);
      } else if (activeFoodOrder.status === "preparing") {
        setActiveFoodOrder((prev) => prev ? { ...prev, status: "packing", countdown: 10 } : null);
      } else if (activeFoodOrder.status === "packing") {
        setActiveFoodOrder((prev) => prev ? { ...prev, status: "ready", countdown: 60 } : null);
        addToast(`Your order of ${activeFoodOrder.name} is ready at ${activeFoodOrder.stall}!`, "success");
      }
      return;
    }
    const orderTimer = setTimeout(() => {
      setActiveFoodOrder((prev) => prev ? { ...prev, countdown: prev.countdown - 1 } : null);
    }, 1000);
    return () => clearTimeout(orderTimer);
  }, [activeFoodOrder, addToast]);

  // Merch reservation countdown timer
  useEffect(() => {
    if (!activeMerchReservation) return;
    if (activeMerchReservation.timeLeft <= 0) return;
    const resTimer = setTimeout(() => {
      setActiveMerchReservation((prev) => prev ? { ...prev, timeLeft: prev.timeLeft - 1 } : null);
    }, 1000);
    return () => clearTimeout(resTimer);
  }, [activeMerchReservation]);

  // SOS responder loop
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
        name: `Emergency: ${ticket.section}`,
        type: "SOS",
        metrics: {
          Status: "CRITICAL ALERT",
          Location: `${ticket.section}, ${ticket.row}, ${ticket.seat}`,
          Responder: "Medical Responder Unit 1",
          ETA: "120 seconds",
        },
      });
    }
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const query = chatInput.toLowerCase();
    setChatInput("");

    let key = "seat"; // default
    if (query.includes("parking") || query.includes("car") || query.includes("vehicle")) {
      key = "parking";
    } else if (query.includes("restroom") || query.includes("washroom") || query.includes("toilet") || query.includes("🚻")) {
      key = "restroom";
    } else if (query.includes("food") || query.includes("eat") || query.includes("drink") || query.includes("burger") || query.includes("concession")) {
      key = "food";
    } else if (query.includes("jersey") || query.includes("merchandise") || query.includes("shop") || query.includes("purchase")) {
      key = "merchandise";
    } else if (query.includes("medical") || query.includes("doctor") || query.includes("help") || query.includes("emergency") || query.includes("first aid")) {
      key = "medical";
    } else if (query.includes("exit") || query.includes("leave") || query.includes("gate") || query.includes("out")) {
      key = "exit";
    } else if (query.includes("family") || query.includes("baby") || query.includes("child")) {
      key = "family";
    } else if (query.includes("charge") || query.includes("battery") || query.includes("power")) {
      key = "charging";
    } else if (query.includes("lost") || query.includes("found") || query.includes("wallet")) {
      key = "lost";
    } else if (query.includes("water") || query.includes("refill") || query.includes("drink")) {
      key = "water";
    } else if (query.includes("wheelchair") || query.includes("accessible") || query.includes("elevator") || query.includes("step-free")) {
      key = "accessible";
    }

    triggerCopilotAction(key);
  };

  const triggerCopilotAction = (actionKey: string) => {
    setIsThinking(true);
    setThinkingStep(0);
    addToast(`Triggering AI Workflow: ${actionKey}...`, "info");

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step <= 4) {
        setThinkingStep(step);
      } else {
        clearInterval(interval);
        setIsThinking(false);

        let res = {
          title: "Nearest Restroom",
          distance: "82 meters",
          walkTime: "1 minute",
          queue: "Low",
          cleanliness: "98%",
          accessibility: "Yes",
          route: "Blue Route",
          apiEndpoint: "/api/copilot/restroom",
          agentName: "Navigation Agent",
          rawJson: '{\n  "status": "success",\n  "data": {\n    "destination": "Restroom Zone B (North)",\n    "distance_meters": 82,\n    "estimated_walk_seconds": 60,\n    "current_queue_density": "low",\n    "cleanliness_index": 0.98,\n    "wheelchair_accessible": true,\n    "optimal_route": "Blue Route"\n  }\n}'
        };

        if (actionKey.toLowerCase().includes("food")) {
          res = {
            title: "Food Stall B12 (Burgers)",
            distance: "140 meters",
            walkTime: "2 minutes",
            queue: "Short (3 mins wait)",
            cleanliness: "95%",
            accessibility: "Yes",
            route: "Concourse East Path",
            apiEndpoint: "/api/copilot/food",
            agentName: "Food Agent",
            rawJson: '{\n  "status": "success",\n  "data": {\n    "destination": "Burger Concessions B12",\n    "distance_meters": 140,\n    "estimated_walk_seconds": 120,\n    "current_queue_density": "short",\n    "average_wait_time_minutes": 3,\n    "wheelchair_accessible": true,\n    "optimal_route": "Concourse East Path"\n  }\n}'
          };
        } else if (actionKey.toLowerCase().includes("merchandise") || actionKey.toLowerCase().includes("shop") || actionKey.toLowerCase().includes("store")) {
          res = {
            title: "Official FIFA Shop B",
            distance: "310 meters",
            walkTime: "5 minutes",
            queue: "Medium",
            cleanliness: "96%",
            accessibility: "Yes",
            route: "North Gate Exit Path",
            apiEndpoint: "/api/copilot/merchandise",
            agentName: "Merchandise Agent",
            rawJson: '{\n  "status": "success",\n  "data": {\n    "destination": "Official FIFA Fan Shop B",\n    "distance_meters": 310,\n    "estimated_walk_seconds": 300,\n    "current_queue_density": "medium",\n    "wheelchair_accessible": true,\n    "optimal_route": "North Gate Exit Path"\n  }\n}'
          };
        } else if (actionKey.toLowerCase().includes("medical") || actionKey.toLowerCase().includes("clinic") || actionKey.toLowerCase().includes("emergency") || actionKey.toLowerCase().includes("help")) {
          res = {
            title: "First Aid Clinic A",
            distance: "190 meters",
            walkTime: "3 minutes",
            queue: "None",
            cleanliness: "99%",
            accessibility: "Yes",
            route: "Main Outer Ring Path",
            apiEndpoint: "/api/copilot/medical",
            agentName: "Medical Agent",
            rawJson: '{\n  "status": "success",\n  "data": {\n    "destination": "First Aid Clinic A (Ground)",\n    "distance_meters": 190,\n    "estimated_walk_seconds": 180,\n    "current_queue_density": "none",\n    "wheelchair_accessible": true,\n    "optimal_route": "Main Outer Ring Path"\n  }\n}'
          };
        } else if (actionKey.toLowerCase().includes("parking") || actionKey.toLowerCase().includes("car") || actionKey.toLowerCase().includes("vehicle")) {
          res = {
            title: "North Parking A, Spot A27",
            distance: "280 meters",
            walkTime: "5 minutes",
            queue: "Medium Traffic Exit",
            cleanliness: "N/A",
            accessibility: "Yes",
            route: "Blue Route",
            apiEndpoint: "/api/copilot/parking",
            agentName: "Parking Agent",
            rawJson: '{\n  "status": "success",\n  "data": {\n    "destination": "North Parking A, Spot A27",\n    "distance_meters": 280,\n    "estimated_walk_seconds": 300,\n    "current_queue_density": "medium",\n    "wheelchair_accessible": true,\n    "optimal_route": "Blue Route"\n  }\n}'
          };
        } else if (actionKey.toLowerCase().includes("seat")) {
          res = {
            title: "Sector 204, Row G, Seat 12",
            distance: "50 meters",
            walkTime: "1 minute",
            queue: "Clear corridor",
            cleanliness: "N/A",
            accessibility: "Yes",
            route: "Vomitory Entrance Route",
            apiEndpoint: "/api/copilot/seat",
            agentName: "Navigation Agent",
            rawJson: '{\n  "status": "success",\n  "data": {\n    "destination": "Sector 204, Row G, Seat 12",\n    "distance_meters": 50,\n    "estimated_walk_seconds": 60,\n    "current_queue_density": "clear",\n    "wheelchair_accessible": true,\n    "optimal_route": "Vomitory Entrance Route"\n  }\n}'
          };
        } else if (actionKey.toLowerCase().includes("exit")) {
          res = {
            title: "Gate B Turnstile Exit",
            distance: "220 meters",
            walkTime: "4 minutes",
            queue: "Low Ingress Flow",
            cleanliness: "N/A",
            accessibility: "Yes",
            route: "Concourse Blue Route",
            apiEndpoint: "/api/copilot/exit",
            agentName: "Crowd Intelligence Agent",
            rawJson: '{\n  "status": "success",\n  "data": {\n    "destination": "Gate B Turnstile Exit",\n    "distance_meters": 220,\n    "estimated_walk_seconds": 240,\n    "current_queue_density": "low",\n    "wheelchair_accessible": true,\n    "optimal_route": "Concourse Blue Route"\n  }\n}'
          };
        } else if (actionKey.toLowerCase().includes("water")) {
          res = {
            title: "Drinking Water Station 3",
            distance: "60 meters",
            walkTime: "1 minute",
            queue: "None",
            cleanliness: "98%",
            accessibility: "Yes",
            route: "Main Outer Ring Path",
            apiEndpoint: "/api/copilot/water",
            agentName: "Navigation Agent",
            rawJson: '{\n  "status": "success",\n  "data": {\n    "destination": "Drinking Water Station 3 (North Concourse)",\n    "distance_meters": 60,\n    "estimated_walk_seconds": 60,\n    "current_queue_density": "none",\n    "wheelchair_accessible": true,\n    "optimal_route": "Main Outer Ring Path"\n  }\n}'
          };
        } else if (actionKey.toLowerCase().includes("family") || actionKey.toLowerCase().includes("baby")) {
          res = {
            title: "Baby Care Room North",
            distance: "110 meters",
            walkTime: "2 minutes",
            queue: "Low",
            cleanliness: "99%",
            accessibility: "Yes",
            route: "Concourse West Path",
            apiEndpoint: "/api/copilot/family-room",
            agentName: "Navigation Agent",
            rawJson: '{\n  "status": "success",\n  "data": {\n    "destination": "Baby Care Room North",\n    "distance_meters": 110,\n    "estimated_walk_seconds": 120,\n    "current_queue_density": "low",\n    "wheelchair_accessible": true,\n    "optimal_route": "Concourse West Path"\n  }\n}'
          };
        } else if (actionKey.toLowerCase().includes("accessible") || actionKey.toLowerCase().includes("wheelchair")) {
          res = {
            title: "ADA Elevator Route to Concourse L2",
            distance: "150 meters",
            walkTime: "3 minutes",
            queue: "Low Queue",
            cleanliness: "97%",
            accessibility: "100% Wheelchair Path",
            route: "Elevator Corridor B",
            apiEndpoint: "/api/copilot/accessibility",
            agentName: "Accessibility Agent",
            rawJson: '{\n  "status": "success",\n  "data": {\n    "destination": "ADA Elevator Corridor B",\n    "distance_meters": 150,\n    "estimated_walk_seconds": 180,\n    "current_queue_density": "low",\n    "wheelchair_accessible": true,\n    "optimal_route": "Elevator Corridor B"\n  }\n}'
          };
        } else if (actionKey.toLowerCase().includes("alert")) {
          res = {
            title: "Live Match Notifications Engine",
            distance: "N/A",
            walkTime: "Instant Feed",
            queue: "N/A",
            cleanliness: "N/A",
            accessibility: "Yes",
            route: "Digital Telemetry Sync",
            apiEndpoint: "/api/copilot/alerts",
            agentName: "Crowd Intelligence Agent",
            rawJson: '{\n  "status": "success",\n  "data": {\n    "destination": "Live Match Notifications Engine",\n    "distance_meters": null,\n    "estimated_walk_seconds": 0,\n    "current_queue_density": null,\n    "wheelchair_accessible": true,\n    "optimal_route": "Digital Telemetry Sync"\n  }\n}'
          };
        } else if (actionKey.toLowerCase().includes("lost") || actionKey.toLowerCase().includes("found")) {
          res = {
            title: "Lost & Found Concierge Desk",
            distance: "340 meters",
            walkTime: "6 minutes",
            queue: "Low Queue",
            cleanliness: "97%",
            accessibility: "Yes",
            route: "Main Outer Ring Path",
            apiEndpoint: "/api/copilot/lost-found",
            agentName: "Navigation Agent",
            rawJson: '{\n  "status": "success",\n  "data": {\n    "destination": "Lost & Found Concierge Desk (South Gate)",\n    "distance_meters": 340,\n    "estimated_walk_seconds": 360,\n    "current_queue_density": "low",\n    "wheelchair_accessible": true,\n    "optimal_route": "Main Outer Ring Path"\n  }\n}'
          };
        }

        setCopilotActionResponse(res);
        addToast(`AI Action response updated: ${res.title}`, "success");
      }
    }, 300);
  };

  const toggleReadNotification = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    addToast("Notification dismissed", "info");
  };

  // Mock Food list
  const FOOD_ITEMS: FoodItem[] = [
    { name: "Premium Veg Burger Combo", category: "Burgers", rating: "4.8", price: 189, isVeg: true, badge: "AI Recommended", prepTime: "5 mins", queueTime: "3 mins", distance: "120m", stall: "Stall B12", status: "In Stock", aiPick: true, desc: "A crispy vegetable patty loaded with fresh lettuce, onions, and spicy veggie sauce, served with hot salted potato wedges and a chilled soda.", ingredients: "Potatoes, peas, carrots, veggie mayonnaise, buns, sesame seeds", allergens: "Gluten, Soy", socialProof: "🔥 2,814 fans ordered this today", aiReason: "Closest to your seat (120m) & under 3-min queue", calories: "450 kcal" },
    { name: "Non-Veg Classic Chicken Burger", category: "Burgers", rating: "4.7", price: 229, isVeg: false, badge: "Best Seller", prepTime: "6 mins", queueTime: "5 mins", distance: "120m", stall: "Stall B12", status: "In Stock", aiPick: false, desc: "Tender chicken breast patty grilled to perfection with cheddar cheese slice and garlic sauce.", ingredients: "Chicken patty, garlic paste, buns, cheddar, tomato", allergens: "Milk, Gluten", socialProof: "❤️ Fan Favourite", aiReason: "Highly rated in sector 204", calories: "510 kcal" },
    { name: "Cheese Margherita Pizza Slice", category: "Pizza", rating: "4.6", price: 149, isVeg: true, badge: "Best Value", prepTime: "3 mins", queueTime: "1 min", distance: "180m", stall: "Stall A09", status: "In Stock", aiPick: true, desc: "Fresh sourdough pizza base topped with rich marinara herb sauce and melted mozzarella cheese.", ingredients: "Flour, yeast, tomato pulp, mozzarella, basil", allergens: "Milk, Gluten", socialProof: "⚡ AI recommends this now", aiReason: "Shortest queue time nearby (1 min)", calories: "320 kcal" },
    { name: "Crispy Samosa Plate (2 Pcs)", category: "Snacks", rating: "4.9", price: 99, isVeg: true, badge: "Halftime Special", prepTime: "2 mins", queueTime: "2 mins", distance: "150m", stall: "Stall C04", status: "In Stock", aiPick: false, desc: "Traditional crisp golden pastry cases filled with savory spiced potato and peas stuffing.", ingredients: "Maida, potato, dry spices, green peas, mint chutney", allergens: "Gluten", socialProof: "🏆 Official Matchday Special", aiReason: "Freshly prepared & hot", calories: "280 kcal" },
  ];

  // Mock Merchandise list
  const MERCH_ITEMS: MerchItem[] = [
    { name: "Official Argentina Match Jersey", rating: "4.9", price: 4999, stock: 8, shop: "Shop B", distance: "180m Away", aiPick: true, isLimited: true, desc: "Official tournament home match jersey as worn by Lionel Messi. Features heat-applied badges and lightweight breathable fabrics.", material: "100% Recycled Polyester", socialProof: "🔥 Trending - Only 8 Left", aiReason: "Predictive AI: expected to sell out in 22 mins" },
    { name: "Argentina Replica Jersey V3", rating: "4.7", price: 2499, stock: 45, shop: "Shop B", distance: "180m Away", aiPick: false, isLimited: false, desc: "Standard fan-version tournament replica jersey with embroidered team logos.", material: "Polyester knit fabric", socialProof: "⭐ Popular", aiReason: "Best value apparel choice" },
    { name: "Official Match Football", rating: "4.8", price: 2999, stock: 12, shop: "Shop A", distance: "140m Away", aiPick: true, isLimited: false, desc: "Authentic match ball used on the pitches, featuring high aerodynamic stability.", material: "Polyurethane shell casing", socialProof: "🏆 Licensed Match Item", aiReason: "Available at Shop A with zero queue" },
    { name: "Argentina vs France Finals Scarf", rating: "4.9", price: 999, stock: 15, shop: "Shop C", distance: "210m Away", aiPick: false, isLimited: true, desc: "Commemorative split team final matchday scarf, double-weave styling.", material: "Acrylic yarn fibers", socialProof: "🧢 Limited Edition", aiReason: "Exclusive collector match item" },
    { name: "Smart Sports Water Bottle", rating: "4.5", price: 499, stock: 80, shop: "Shop A", distance: "140m Away", aiPick: false, isLimited: false, desc: "Durable stainless steel double-walled thermal flask keeping beverages cold.", material: "Stainless Steel", socialProof: "🧊 Cold drinks selling fast", aiReason: "Weather check: 28°C temperature recommendation" },
  ];

  // Filtered lists
  const filteredFood = FOOD_ITEMS.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.category.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (categoryFilter === "veg" && !item.isVeg) return false;
    if (categoryFilter === "nonveg" && item.isVeg) return false;
    if (categoryFilter === "aipick" && !item.aiPick) return false;
    return true;
  });

  const filteredMerch = MERCH_ITEMS.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (categoryFilter === "merch" && !item.isLimited) return false;
    return true;
  });

  // Triggering order checkout options
  const handleFoodCheckout = (item: FoodItem, method: string) => {
    setActiveFoodOrder({
      name: item.name,
      price: item.price,
      method: method,
      status: "received",
      countdown: 5,
      stall: item.stall,
    });
    setSelectedFood(null);
    addToast(`Food order placed via ${method === "smart" ? "Smart Pay" : "Reserve Flow"}!`, "success");
  };

  const handleMerchCheckout = (item: MerchItem, method: string) => {
    setActiveMerchReservation({
      name: item.name,
      price: item.price,
      method: method,
      timeLeft: 1800, // 30 minutes
      shop: item.shop,
    });
    setSelectedMerch(null);
    addToast(`Merch reserved via ${method === "online" ? "Buy Online" : "Reserve Flow"}!`, "success");
  };

  const handleNavigateToStall = (stallName: string) => {
    setNavDestination(stallName);
    setActivePage("map");
    addToast(`Navigation route calculated to ${stallName}`, "success");
  };

  // Theme-aware dynamic style mappings
  const isDark = theme === "dark";
  const headerClass = isDark ? "bg-[#050816]/90 border-white/5 shadow-2xl" : "bg-white/95 border-slate-200/80 shadow-md";
  const cardClass = isDark ? "bg-arena-surface/40 border-white/5 text-white shadow-xl" : "bg-white/80 border-slate-200/60 shadow-lg text-[#475569]";
  const inputClass = isDark ? "bg-black/50 border-white/10 text-white" : "bg-slate-100 border-slate-200 text-[#475569]";

  // High contrast text class configurations
  const textHeading = isDark ? "text-white font-extrabold" : "text-[#1E293B] font-extrabold";
  const textBody = isDark ? "text-slate-200" : "text-[#475569] font-medium";
  const textDesc = isDark ? "text-slate-400" : "text-[#64748B]";
  const textMeta = isDark ? "text-slate-300 font-mono text-[10px]" : "text-[#475569] font-mono text-[10px] font-bold";

  return (
    <div className={`min-h-screen flex flex-col text-left select-none pb-16 transition-colors duration-300 ${isDark ? "bg-[#050816] text-white" : "bg-gradient-to-b from-[#EEF4FF] via-white to-[#F8FAFC] text-[#475569]"}`}>
      
      {/* 1. Global Header Bar */}
      <header className={`sticky top-0 z-50 backdrop-blur-md border-b border-solid px-6 py-3.5 transition-all ${headerClass}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo Section */}
          <div className="w-[140px] shrink-0 flex items-center justify-start">
            <span className="text-sm font-black tracking-widest uppercase select-none flex items-center gap-1.5 cursor-pointer" onClick={() => { setActivePage("home"); setMoreMenuOpen(false); }}>
              <span className="text-lg">🏟</span>
              <span className={textHeading}>ArenaOS <span className="text-blue-600">AI</span></span>
            </span>
          </div>

          {/* Navigation Tabs - Center aligned with flex-1 min-width-0 */}
          <div className="flex-1 min-width-0 flex justify-center relative">
            {/* Nav list */}
            <nav className={`hidden lg:flex items-center flex-nowrap font-mono tracking-tight font-bold ${
              windowWidth < 1600 ? "gap-1 text-[12px]" : "gap-3 text-[14px]"
            }`}>
              {/* If screen is >= 1400px, show all 10 items */}
              {windowWidth >= 1400 ? (
                [
                  { icon: "🏠", label: "Home", shortLabel: "Home", key: "home" },
                  { icon: "🎫", label: "My Ticket", shortLabel: "Ticket", key: "ticket" },
                  { icon: "🗺️", label: "Navigation", shortLabel: "Navigate", key: "map" },
                  { icon: "⚽", label: "Live Match", shortLabel: "Match", key: "match" },
                  { icon: "🍔", label: "Food & Shops", shortLabel: "Food", key: "food" },
                  { icon: "🚗", label: "Parking & Return", shortLabel: "Parking", key: "transit" },
                  { icon: "🤖", label: "AI Assistant", shortLabel: "AI", key: "copilot" },
                  { icon: "🔔", label: "Alerts", shortLabel: "Alerts", key: "notifications", hasBadge: true },
                  { icon: "👤", label: "Profile", shortLabel: "Profile", key: "profile" },
                  { icon: "⚙️", label: "Settings", shortLabel: "Settings", key: "settings" }
                ].map((tab) => {
                  const isActive = activePage === tab.key;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => { setActivePage(tab.key as FanPageId); setMoreMenuOpen(false); }}
                      className={`transition-all duration-200 py-1.5 px-3 rounded-full flex items-center gap-1.5 shrink-0 whitespace-nowrap border-none cursor-pointer ${
                        isActive
                          ? "bg-blue-50 text-blue-600 font-extrabold"
                          : "text-slate-500 hover:text-slate-700 hover:bg-slate-100/50"
                      }`}
                    >
                      <span className={`${windowWidth < 1600 ? "text-xs" : "text-sm"}`}>{tab.icon}</span>
                      <span>{windowWidth < 1600 ? tab.shortLabel : tab.label}</span>
                      {tab.hasBadge && notifications.filter(n => !n.read).length > 0 && (
                        <span className="px-1.5 py-0.5 text-[8px] bg-red-500 text-white rounded-full font-sans font-black animate-pulse">
                          {notifications.filter(n => !n.read).length}
                        </span>
                      )}
                    </button>
                  );
                })
              ) : (
                /* Between 1200px - 1400px: Collapse Alerts, Profile, Settings, and Match into More */
                <>
                  {[
                    { icon: "🏠", label: "Home", shortLabel: "Home", key: "home" },
                    { icon: "🎫", label: "My Ticket", shortLabel: "Ticket", key: "ticket" },
                    { icon: "🗺️", label: "Navigation", shortLabel: "Navigate", key: "map" },
                    { icon: "🍔", label: "Food & Shops", shortLabel: "Food", key: "food" },
                    { icon: "🚗", label: "Parking & Return", shortLabel: "Parking", key: "transit" },
                    { icon: "🤖", label: "AI Assistant", shortLabel: "AI", key: "copilot" }
                  ].map((tab) => {
                    const isActive = activePage === tab.key;
                    return (
                      <button
                        key={tab.key}
                        onClick={() => { setActivePage(tab.key as FanPageId); setMoreMenuOpen(false); }}
                        className={`transition-all duration-200 py-1.5 px-3 rounded-full flex items-center gap-1.5 shrink-0 whitespace-nowrap border-none cursor-pointer ${
                          isActive
                            ? "bg-blue-50 text-blue-600 font-extrabold"
                            : "text-slate-500 hover:text-slate-700 hover:bg-slate-100/50"
                        }`}
                      >
                        <span className="text-xs">{tab.icon}</span>
                        <span>{tab.shortLabel}</span>
                      </button>
                    );
                  })}
                  
                  {/* More Dropdown Trigger */}
                  <div className="relative">
                    <button
                      onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                      className={`transition-all duration-200 py-1.5 px-3 rounded-full flex items-center gap-1.5 shrink-0 whitespace-nowrap border-none cursor-pointer ${
                        ["match", "notifications", "profile", "settings"].includes(activePage)
                          ? "bg-blue-50 text-blue-600 font-extrabold"
                          : "text-slate-500 hover:text-slate-700 hover:bg-slate-100/50"
                      }`}
                    >
                      <span className="text-xs">📂</span>
                      <span>More ▾</span>
                      {notifications.filter(n => !n.read).length > 0 && (
                        <span className="px-1.5 py-0.5 text-[8px] bg-red-500 text-white rounded-full font-sans font-black animate-pulse">
                          {notifications.filter(n => !n.read).length}
                        </span>
                      )}
                    </button>
                    
                    {moreMenuOpen && (
                      <div className="absolute top-full right-0 mt-2 bg-white border border-solid border-slate-200 rounded-xl shadow-lg p-2 z-50 flex flex-col gap-1 w-48 text-left text-slate-800 animate-fade-in">
                        {[
                          { icon: "⚽", label: "Live Match", key: "match" },
                          { icon: "🔔", label: "Alerts", key: "notifications", hasBadge: true },
                          { icon: "👤", label: "Profile", key: "profile" },
                          { icon: "⚙️", label: "Settings", key: "settings" }
                        ].map((tab) => {
                          const isActive = activePage === tab.key;
                          return (
                            <button
                              key={tab.key}
                              onClick={() => { setActivePage(tab.key as FanPageId); setMoreMenuOpen(false); }}
                              className={`w-full text-left transition-all duration-200 py-2 px-3 rounded-lg flex items-center justify-between shrink-0 whitespace-nowrap border-none cursor-pointer ${
                                isActive
                                  ? "bg-blue-50 text-blue-600 font-extrabold"
                                  : "hover:bg-slate-100 text-slate-700"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-xs">{tab.icon}</span>
                                <span className="text-xs font-mono">{tab.label}</span>
                              </div>
                              {tab.hasBadge && notifications.filter(n => !n.read).length > 0 && (
                                <span className="px-1.5 py-0.5 text-[8px] bg-red-500 text-white rounded-full font-sans font-black animate-pulse">
                                  {notifications.filter(n => !n.read).length}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </>
              )}
            </nav>
          </div>

            {/* Status section - Right aligned with flex-shrink-0 */}
          <div className="shrink-0 flex items-center justify-end gap-2">
            {/* Theme Toggle pill */}
            <ThemeToggle size="sm" />

            {/* Status Pills: Height 36px, Font 12px, Horiz padding 12px, border 999px */}
            <span className="h-9 px-3 text-xs rounded-full border border-solid border-emerald-500/20 bg-emerald-500/10 text-emerald-500 flex items-center gap-1.5 font-mono font-bold shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span>🟢 Stadium Open</span>
            </span>
            
            <span className="h-9 px-3 text-xs rounded-full border border-solid border-blue-600/20 bg-blue-600/10 text-blue-600 flex items-center gap-1.5 font-mono font-bold shrink-0">
              <span>⚽ Live Match</span>
            </span>
            
            <span className="h-9 px-3 text-xs rounded-full border border-solid border-amber-500/20 bg-amber-500/10 text-amber-600 flex items-center gap-1.5 font-mono font-bold shrink-0">
              <span>🌤️ 28°C</span>
            </span>

            {sosState === "idle" ? (
              <Button
                variant="outline"
                onClick={handleTriggerSOS}
                className="h-9 px-4 text-xs font-extrabold bg-red-500 hover:bg-red-600 border-none text-white rounded-full shadow hover:shadow-red-500/20 transition-all cursor-pointer"
              >
                🚨 SOS
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={() => setScenario("clear")}
                className="h-9 px-4 text-xs font-bold border-red-500 text-red-500 hover:bg-red-500/10 rounded-full animate-pulse cursor-pointer"
              >
                Cancel SOS ({eta}s)
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Global Smart Stadium Live Telemetry Status Bar Ticker */}
      <div className={`border-b border-solid backdrop-blur-md transition-all z-30 sticky top-[68px] overflow-hidden ${
        isDark ? "bg-[#0B0F24]/90 border-white/5 text-white" : "bg-[#EEF4FF]/95 border-slate-200/80 text-[#475569]"
      }`}>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee-slow {
            animation: marquee 35s linear infinite;
          }
          .scrollbar-none::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-none {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
        <div className="w-full overflow-x-auto scrollbar-none py-2.5">
          <div className="flex gap-8 whitespace-nowrap animate-marquee-slow hover:[animation-play-state:paused] cursor-pointer w-max pl-6">
            {[
              { label: "⚽ Match Minute: 72'", color: "bg-red-500/10 text-red-600 border-red-500/20" },
              { label: "🏟️ Stadium Occupancy: 98.4%", color: "bg-purple-500/10 text-purple-600 border-purple-500/20" },
              { label: "🚪 Recommended Exit: Gate B", color: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
              { label: "🍔 Shortest Food Queue: Stall B12", color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" },
              { label: "🚻 Nearest Restroom: Sect 204 L2", color: "bg-pink-500/10 text-pink-600 border-pink-500/20" },
              { label: "🚗 Parking Saved: Spot A27", color: "bg-teal-500/10 text-teal-600 border-teal-500/20" },
              { label: "🌤️ Weather: Clear 28°C", color: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
              { label: "🚑 Emergency Status: Operational", color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 animate-pulse" }
            ].concat([
              { label: "⚽ Match Minute: 72'", color: "bg-red-500/10 text-red-600 border-red-500/20" },
              { label: "🏟️ Stadium Occupancy: 98.4%", color: "bg-purple-500/10 text-purple-600 border-purple-500/20" },
              { label: "🚪 Recommended Exit: Gate B", color: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
              { label: "🍔 Shortest Food Queue: Stall B12", color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" },
              { label: "🚻 Nearest Restroom: Sect 204 L2", color: "bg-pink-500/10 text-pink-600 border-pink-500/20" },
              { label: "🚗 Parking Saved: Spot A27", color: "bg-teal-500/10 text-teal-600 border-teal-500/20" },
              { label: "🌤️ Weather: Clear 28°C", color: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
              { label: "🚑 Emergency Status: Operational", color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 animate-pulse" }
            ]).map((item, idx) => (
              <span key={idx} className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-solid font-mono text-[10px] font-bold ${item.color}`}>
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile view sub-tabs navigator */}
      <div className={`lg:hidden backdrop-blur-md border-y border-solid flex justify-around p-2.5 text-[10px] font-bold sticky top-[102px] z-40 ${headerClass}`}>
        <button onClick={() => setActivePage("home")} className={activePage === "home" ? "text-blue-600" : "text-slate-400"}>Home</button>
        <button onClick={() => setActivePage("ticket")} className={activePage === "ticket" ? "text-blue-600" : "text-slate-400"}>Ticket</button>
        <button onClick={() => setActivePage("map")} className={activePage === "map" ? "text-blue-600" : "text-slate-400"}>Map</button>
        <button onClick={() => setActivePage("match")} className={activePage === "match" ? "text-blue-600" : "text-slate-400"}>Match</button>
        <button onClick={() => setActivePage("food")} className={activePage === "food" ? "text-blue-600" : "text-slate-400"}>Food</button>
        <button onClick={() => setActivePage("copilot")} className={activePage === "copilot" ? "text-blue-600" : "text-slate-400"}>AI</button>
      </div>

      <main className="max-w-7xl mx-auto px-6 pt-8 w-full flex-1 space-y-8">

        {/* ==================== PAGE 1: HOME ==================== */}
        {activePage === "home" && (
          <div className="space-y-8 animate-fade-in text-left">
            
            {/* Vibrant Welcome Hero & Theme Switcher */}
            <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 opacity-10 pointer-events-none select-none bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-white to-transparent" />
              <div className="absolute top-0 right-0 p-4 opacity-5 text-9xl font-black select-none pointer-events-none">🏆</div>
              
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-3">
                  <Badge variant="live" className="bg-amber-400 text-slate-900 border-none font-bold py-1 px-3 rounded-full text-[10px]">
                    ⚽ FIFA STADIUM CONTEXT DETECTED
                  </Badge>
                  <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-none text-white">
                    Welcome to Salt Lake Stadium
                  </h1>
                  <p className="text-xs text-blue-100 max-w-xl font-semibold">
                    Hello Ticket Holder! Your seat in <span className="font-bold underline">{ticket.section}</span> is ready. Walk direct via Gate B turnstiles.
                  </p>

                  {/* Premium Theme Toggle Pill */}
                  <div className="flex items-center gap-3 mt-4">
                    <span className="text-[10px] text-blue-100 font-mono font-bold uppercase tracking-wider">Theme:</span>
                    <ThemeToggle size="sm" />
                    <span className="text-[10px] text-blue-200 font-mono">{isDark ? "🌙 Dark Mode" : "☀️ Light Mode"}</span>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 min-w-[200px] border border-white/10 text-center">
                  <span className="block text-[8px] uppercase tracking-wider font-bold text-blue-200 font-mono">KICKOFF COUNTDOWN</span>
                  <span className="text-3xl font-black font-mono block mt-1 tracking-widest text-yellow-300 drop-shadow-md animate-pulse">
                    {countdown}
                  </span>
                  <span className="text-[10px] text-blue-100 font-medium block mt-1">Argentina vs France</span>
                </div>
              </div>
            </div>

            {/* Fan Journey Progress Stepper */}
            <GlassCard padding="md" rounded="md" border={true} className={`${cardClass} p-5 space-y-4`}>
              <h3 className={`text-xs uppercase font-mono tracking-widest ${textHeading}`}>
                🚶‍♂️ SPECTATOR JOURNEY STATUS
              </h3>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-[10px] font-bold text-slate-400">
                <div className="flex items-center gap-2 text-emerald-500">
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">✓</span>
                  <span>Arrival</span>
                </div>
                <div className="hidden md:block w-full h-0.5 bg-emerald-500" />
                
                <div className="flex items-center gap-2 text-emerald-500">
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">✓</span>
                  <span>Ticket Verified</span>
                </div>
                <div className="hidden md:block w-full h-0.5 bg-emerald-500" />
                
                <div className="flex items-center gap-2 text-emerald-500">
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">✓</span>
                  <span>Security Check</span>
                </div>
                <div className="hidden md:block w-full h-0.5 bg-blue-500 animate-pulse" />
                
                <div className="flex items-center gap-2 text-blue-500">
                  <span className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center animate-ping absolute" />
                  <span className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center relative font-bold">➔</span>
                  <span>Inside Stadium</span>
                </div>
                <div className="hidden md:block w-full h-0.5 bg-slate-300" />
                
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-300 text-slate-600 flex items-center justify-center font-bold">5</span>
                  <span className={textDesc}>Find Seat</span>
                </div>
              </div>
            </GlassCard>

            {/* 12 Smart Quick Actions */}
            <div className="space-y-3">
              <h3 className="text-xs uppercase font-mono tracking-widest text-[#1E293B] font-bold flex items-center gap-1.5">
                ⚡ Reusable Quick Action Cards
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[
                  { title: "Find My Seat", desc: "Step-by-step seat navigation guide", icon: "🎟️", key: "seat" },
                  { title: "Find Parking", desc: "Locate vehicle in North Parking A", icon: "🚗", key: "parking" },
                  { title: "Nearest Restroom", desc: "Find shortest queues concourse restrooms", icon: "🚻", key: "restroom" },
                  { title: "Order Food", desc: "Reserve food counter burger combos", icon: "🍔", key: "food" },
                  { title: "Official Merchandise", desc: "Hold champion jerseys at Fan Shop B", icon: "🛍️", key: "merchandise" },
                  { title: "Medical Help", desc: "First-responder medical support", icon: "🩺", key: "medical" },
                  { title: "Fastest Exit", desc: "Crowd-optimized egress gate routing", icon: "🚪", key: "exit" },
                  { title: "Family Room", desc: "Baby care facilities locator", icon: "👶", key: "family" },
                  { title: "Charging Station", desc: "Device power banks near concessions", icon: "⚡", key: "charging" },
                  { title: "Lost & Found", desc: "Report lost items or view lockbox", icon: "📷", key: "lost" },
                  { title: "Water Refill", desc: "Clean drinking water refilling fountains", icon: "💧", key: "water" },
                  { title: "Wheelchair Route", desc: "Step-free pathing with elevators", icon: "♿", key: "accessible" }
                ].map((act, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setActivePage("copilot");
                      triggerCopilotAction(act.key);
                    }}
                    className="bg-white hover:bg-slate-50 border border-solid border-slate-200 p-4 rounded-2xl shadow-sm text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex items-start gap-3 group cursor-pointer"
                  >
                    <span className="text-xl group-hover:scale-110 transition-transform">{act.icon}</span>
                    <div className="space-y-1">
                      <span className="block font-black text-xs text-[#1E293B]">{act.title}</span>
                      <span className="block text-[10px] text-[#475569] leading-snug">{act.desc}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* AI Insights Widget Panel */}
            <div className="space-y-3">
              <h3 className="text-xs uppercase font-mono tracking-widest text-[#1E293B] font-bold flex items-center gap-1.5">
                🧠 Arena AI Insights Feed
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { text: "Food Court B has only a 2 minute wait time.", type: "Concessions", action: "Order", val: "food", icon: "🍔" },
                  { text: "Gate C is currently the least crowded exit gate corridor.", type: "Navigation", action: "Navigate", val: "exit", icon: "🚪" },
                  { text: "Medical Clinic A has zero patient queue delays currently.", type: "Medical", action: "View", val: "medical", icon: "🩺" },
                  { text: "Parking Exit B is recommended for faster post-match egress.", type: "Transit", action: "Navigate", val: "parking", icon: "🚗" },
                  { text: "Official Jerseys are running low in shop B (8 left).", type: "Shopping", action: "Reserve", val: "merchandise", icon: "🛍️" },
                  { text: "Scattered rain predicted in 20 minutes near outer ring.", type: "Weather", action: "View", val: "weather", icon: "🌦️" }
                ].map((insight, idx) => (
                  <div key={idx} className="bg-white border border-solid border-slate-200 p-4 rounded-2xl text-left space-y-3 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-200">
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-[8px] font-mono text-slate-400 font-bold">
                        <span>{insight.icon} {insight.type.toUpperCase()}</span>
                        <span className="text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">ARENA AI</span>
                      </div>
                      <p className="text-[10px] text-[#475569] font-medium leading-relaxed">
                        {insight.text}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setActivePage("copilot");
                        triggerCopilotAction(insight.val);
                      }}
                      className="w-full text-center py-1.5 text-[9px] font-black rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-all cursor-pointer"
                    >
                      {insight.action} Now ➔
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Segments */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Stadium telemetry stats */}
              <div className="lg:col-span-8 space-y-6">
                <GlassCard padding="md" rounded="md" border={true} className={`${cardClass} p-6 space-y-4`}>
                  <h3 className={`text-xs uppercase font-mono tracking-widest ${textHeading}`}>
                    🏟 STADIUM ANALYTICS Telemetry
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-slate-500/5 p-4 rounded-2xl border border-solid border-slate-200/10 text-center">
                      <span className="block text-xl">🌦</span>
                      <span className="block text-[8px] font-bold text-slate-500 mt-2 font-mono">WEATHER</span>
                      <span className={`block text-xs mt-1 ${textHeading}`}>28°C Clear</span>
                    </div>
                    <div className="bg-slate-500/5 p-4 rounded-2xl border border-solid border-slate-200/10 text-center">
                      <span className="block text-xl">👥</span>
                      <span className="block text-[8px] font-bold text-slate-500 mt-2 font-mono">ATTENDANCE</span>
                      <span className={`block text-xs mt-1 ${textHeading}`}>88,966 / 88.9%</span>
                    </div>
                    <div className="bg-slate-500/5 p-4 rounded-2xl border border-solid border-slate-200/10 text-center">
                      <span className="block text-xl">🚗</span>
                      <span className="block text-[8px] font-bold text-slate-500 mt-2 font-mono">PARKING SPACES</span>
                      <span className={`block text-xs mt-1 ${textHeading}`}>42 Slots Free</span>
                    </div>
                    <div className="bg-slate-500/5 p-4 rounded-2xl border border-solid border-slate-200/10 text-center">
                      <span className="block text-xl">🚇</span>
                      <span className="block text-[8px] font-bold text-slate-500 mt-2 font-mono">METRO FREQ</span>
                      <span className={`block text-xs mt-1 ${textHeading}`}>Every 2 mins</span>
                    </div>
                  </div>
                </GlassCard>

                {/* Player Spotlight card & Rewards Progress ring */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <GlassCard padding="md" rounded="md" border={true} className={`${cardClass} p-5 space-y-3`}>
                    <Badge variant="live" className="bg-amber-400 text-slate-900 border-none font-extrabold text-[9px] tracking-wide">⚽ PLAYER SPOTLIGHT</Badge>
                    <h3 className={`text-sm font-black ${textHeading}`}>Lionel Messi (ARG)</h3>
                    <p className={`text-[10px] leading-relaxed ${textBody}`}>Match stats: 1 goal, 1 assist, 92% pass accuracy. Custom metrics highlight Sector North performance.</p>
                  </GlassCard>
                  
                  <GlassCard padding="md" rounded="md" border={true} className={`${cardClass} p-5 flex items-center justify-between`}>
                    <div className="space-y-1">
                      <Badge variant="info" className="bg-blue-600 text-white border-none font-bold">🎁 REWARDS</Badge>
                      <h3 className={`text-sm font-black ${textHeading}`}>2,450 points</h3>
                      <p className={`text-[10px] ${textDesc}`}>Claim food court vouchers near seat.</p>
                    </div>
                    
                    {/* SVG Progress Ring */}
                    <div className="relative w-16 h-16 shrink-0">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <path className="text-slate-300" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path className="text-emerald-500" strokeDasharray="65, 100" strokeWidth="3.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold font-mono text-emerald-600">
                        65%
                      </div>
                    </div>
                  </GlassCard>
                </div>
              </div>

              {/* Sidebar list items */}
              <div className="lg:col-span-4">
                <GlassCard padding="md" rounded="md" border={true} className={`${cardClass} p-6 space-y-4`}>
                  <h3 className={`text-xs uppercase font-mono tracking-widest ${textHeading}`}>
                    📢 RECENT TELEMETRY ALERTS
                  </h3>
                  <div className="space-y-4">
                    {notifications.slice(0, 3).map((n) => (
                      <div key={n.id} className="border-l-2 border-solid border-blue-500 pl-3 py-1 space-y-1">
                        <span className="text-[8px] font-mono font-bold text-blue-600 uppercase">{n.type} status log</span>
                        <h4 className={`text-xs font-black ${textHeading}`}>{n.title}</h4>
                        <p className={`text-[10px] leading-relaxed ${textBody}`}>{n.body}</p>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </div>

            </div>
          </div>
        )}

        {/* ==================== PAGE 2: DIGITAL TICKET WALLET ==================== */}
        {activePage === "ticket" && (
          <div className="space-y-8 animate-fade-in text-left">
            <GlassCard padding="md" rounded="md" border={true} className={`${cardClass} p-6`}>
              <h2 className={`text-lg font-mono uppercase tracking-widest border-b border-solid border-slate-200/20 pb-2 ${textHeading}`}>
                🎫 DIGITAL WALLET
              </h2>
              <p className={`text-xs mt-2 ${textBody}`}>
                Present this official wallet pass at Gate B turnstile. Keep screen brightness on max setting.
              </p>
            </GlassCard>

            <div className="max-w-md mx-auto space-y-6">
              {/* Apple Wallet Style card */}
              <GlassCard padding="none" rounded="md" border={true} className="bg-gradient-to-br from-blue-700 to-indigo-950 border-none p-6 text-white space-y-6 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none select-none bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-white to-transparent" />
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold font-mono tracking-widest text-blue-300">FIFA STADIUM WALLET</span>
                  <Badge variant="live" size="sm" className="bg-emerald-500/25 border-emerald-500/40 text-emerald-400 font-bold">
                    ACTIVE TICKET
                  </Badge>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center border-y border-white/10 py-4 font-mono">
                  <div>
                    <span className="block text-[8px] uppercase font-bold text-blue-300/80">Gate</span>
                    <span className="text-sm font-extrabold text-white mt-1 block">{ticket.gate}</span>
                  </div>
                  <div>
                    <span className="block text-[8px] uppercase font-bold text-blue-300/80">Sect</span>
                    <span className="text-sm font-extrabold text-white mt-1 block">{ticket.section}</span>
                  </div>
                  <div>
                    <span className="block text-[8px] uppercase font-bold text-blue-300/80">Row</span>
                    <span className="text-sm font-extrabold text-white mt-1 block">{ticket.row}</span>
                  </div>
                  <div>
                    <span className="block text-[8px] uppercase font-bold text-blue-300/80">Seat</span>
                    <span className="text-sm font-extrabold text-white mt-1 block">{ticket.seat}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="block text-[8px] uppercase font-bold text-blue-300/80 font-mono">Fixture Match</span>
                    <span className="text-sm font-extrabold text-white">Argentina vs France</span>
                    <span className="block text-[9px] text-blue-200">Salt Lake Stadium, Kolkata, India</span>
                  </div>
                  
                  {/* Styled QR Code */}
                  <div className="h-20 w-20 bg-white p-1.5 rounded-xl shrink-0 flex items-center justify-center shadow-lg border border-white/10">
                    <svg className="w-16 h-16 text-black" viewBox="0 0 100 100" fill="currentColor">
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

              {/* Reminders & Guides details */}
              <div className="grid grid-cols-2 gap-4">
                <GlassCard padding="sm" rounded="sm" border={true} className={`${cardClass} p-3.5 text-center space-y-1`}>
                  <span className="text-xl block">🔋</span>
                  <h4 className={`text-xs font-black ${textHeading}`}>Keep Battery High</h4>
                  <p className={`text-[9px] ${textDesc}`}>Ensure enough battery for entry NFC scanning at gates.</p>
                </GlassCard>
                <GlassCard padding="sm" rounded="sm" border={true} className={`${cardClass} p-3.5 text-center space-y-1`}>
                  <span className="text-xl block">💡</span>
                  <h4 className={`text-xs font-black ${textHeading}`}>Max Brightness</h4>
                  <p className={`text-[9px] ${textDesc}`}>Turn screen brightness to maximum for optical check-ins.</p>
                </GlassCard>
              </div>
            </div>
          </div>
        )}

        {/* ==================== PAGE 3: STADIUM NAVIGATION ==================== */}
        {activePage === "map" && (
          <div className="space-y-8 animate-fade-in text-left">
            <GlassCard padding="md" rounded="md" border={true} className={`${cardClass} p-6 flex justify-between items-center flex-wrap gap-4`}>
              <div>
                <h2 className={`text-lg font-mono uppercase tracking-widest flex items-center gap-2 ${textHeading}`}>
                  <span>🗺</span>
                  <span>AI NAVIGATION SYSTEM</span>
                </h2>
                <p className={`text-xs mt-1 ${textBody}`}>
                  Active Seat Route: from parking spot <span className="font-bold underline">{ticket.parkingSpace}</span> to seat <span className="font-bold underline">{ticket.seat}</span>. Active Layer: <span className="font-bold text-blue-600 uppercase">{mapMode} Mode</span>.
                </p>
              </div>

              {/* Map View Modes tab selectors */}
              <div className="flex gap-2 bg-slate-500/5 p-1 rounded-full border border-solid border-slate-200/10">
                <button onClick={() => setMapMode("2d")} className={`text-[10px] px-3 py-1.5 rounded-full font-bold transition-all ${mapMode === "2d" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-slate-200"}`}>🗺 2D Map</button>
                <button onClick={() => setMapMode("3d")} className={`text-[10px] px-3 py-1.5 rounded-full font-bold transition-all ${mapMode === "3d" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-slate-200"}`}>🏟 3D Stadium</button>
                <button onClick={() => setMapMode("ar")} className={`text-[10px] px-3 py-1.5 rounded-full font-bold transition-all ${mapMode === "ar" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-slate-200"}`}>🧭 AR Nav</button>
                <button onClick={() => setMapMode("crowd")} className={`text-[10px] px-3 py-1.5 rounded-full font-bold transition-all ${mapMode === "crowd" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-slate-200"}`}>📡 Live Crowd</button>
                <button onClick={() => setMapMode("heatmap")} className={`text-[10px] px-3 py-1.5 rounded-full font-bold transition-all ${mapMode === "heatmap" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-slate-200"}`}>🌡 Heatmap</button>
              </div>
            </GlassCard>

            {/* Destination quick select toolbar */}
            <div className="flex flex-wrap gap-2 items-center p-4 bg-slate-500/5 border border-solid border-slate-200/10 rounded-2xl">
              <span className="text-[9px] font-mono font-bold text-slate-500 uppercase mr-2">Set Destination:</span>
              {[
                { label: "🎫 My Seat", val: "Seat 12" },
                { label: "🍔 Food Stand 3", val: "Food Stand 3" },
                { label: "🚻 Restrooms", val: "Restroom Wing" },
                { label: "🚑 Medical Clinic", val: "Medical Unit" },
                { label: "🚪 Gate B Exit", val: "Gate B Exit" },
                { label: "🅿 Parking A27", val: "Parking spot A27" },
              ].map((btn, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setNavDestination(btn.val);
                    addToast(`Route recalculated to ${btn.val}`, "info");
                  }}
                  className={`text-[9px] font-bold font-mono px-3 py-1.5 rounded-full border border-solid transition-all ${navDestination === btn.val ? "bg-blue-600 border-blue-600 text-white" : "bg-transparent border-slate-200/20 text-slate-400 hover:text-slate-200"}`}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Stadium SVG Model */}
              <div className="lg:col-span-8 bg-black/5 border border-slate-200 border-solid rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden shadow-inner h-96">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none select-none opacity-40" />
                
                {/* Floor Level Switcher */}
                <div className="absolute top-4 left-4 flex flex-col gap-1 z-10 bg-white/80 dark:bg-black/50 p-1 rounded-xl border border-solid border-slate-200/20">
                  {["L3", "L2", "L1", "VIP"].map((floor) => (
                    <button
                      key={floor}
                      onClick={() => setFloorLevel(floor)}
                      className={`text-[9px] font-bold font-mono w-7 h-7 rounded-lg flex items-center justify-center transition-all ${floorLevel === floor ? "bg-blue-600 text-white" : "text-slate-400"}`}
                    >
                      {floor}
                    </button>
                  ))}
                </div>

                {/* Compass Icon */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 dark:bg-black/50 border border-solid border-slate-200/20 flex items-center justify-center text-xs font-mono font-bold text-slate-500">
                  🧭 N
                </div>

                {/* Stadium SVG Seat Blueprint with Route */}
                <svg className="w-80 h-80 drop-shadow-2xl" viewBox="0 0 400 400" fill="none">
                  {/* Outer contour */}
                  <path d="M200 40 C300 40 370 110 370 200 C370 290 300 360 200 360 C100 360 30 290 30 200 C30 110 100 40 200 40 Z" fill="none" stroke="currentColor" strokeWidth="4" className="text-slate-300" />
                  <path d="M200 60 C280 60 340 120 340 200 C340 280 280 340 200 340 C120 340 60 280 60 200 C60 120 120 60 200 60 Z" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-300" strokeDasharray="5,5" />
                  
                  {/* Pitch center */}
                  <rect x="150" y="160" width="100" height="80" rx="4" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-500/60" />
                  <circle cx="200" cy="200" r="20" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-500/60" />
                  
                  {/* Stand sections paths */}
                  <path d="M120 70 L200 130 L280 70" stroke="currentColor" strokeWidth="8" className="text-blue-500 hover:text-blue-600 transition-colors cursor-pointer" onClick={() => setSelectedStadiumSection("North Stand")} />
                  <path d="M330 120 L270 200 L330 280" stroke="currentColor" strokeWidth="8" className="text-indigo-500 hover:text-indigo-600 transition-colors cursor-pointer" onClick={() => setSelectedStadiumSection("East Stand")} />
                  <path d="M120 330 L200 270 L280 330" stroke="currentColor" strokeWidth="8" className="text-purple-500 hover:text-purple-600 transition-colors cursor-pointer" onClick={() => setSelectedStadiumSection("South Stand")} />
                  <path d="M70 120 L130 200 L70 280" stroke="currentColor" strokeWidth="8" className="text-blue-500 hover:text-blue-600 transition-colors cursor-pointer" onClick={() => setSelectedStadiumSection("West Stand")} />
                  
                  {/* Glowing Animated AI Route Path Line */}
                  <path d="M200 350 L200 270 L130 200 L120 110" fill="none" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" strokeDasharray="10,10" className="animate-marquee" />

                  {/* Selected seat indicator pin */}
                  <g className="animate-bounce">
                    <circle cx="120" cy="110" r="6" fill="#EF4444" />
                    <circle cx="120" cy="110" r="12" fill="none" stroke="#EF4444" strokeWidth="2" className="animate-ping" />
                  </g>
                </svg>

                <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-black/80 backdrop-blur-md border border-slate-200 dark:border-white/10 px-3 py-1.5 rounded-xl text-[10px] font-mono text-slate-500 dark:text-arena-muted border-solid shadow-md">
                  📍 Click stands to inspect telemetry. Active stand: <span className="font-extrabold text-blue-600">{selectedStadiumSection}</span>
                </div>
              </div>

              {/* Right Panel: AI Route Summary */}
              <div className="lg:col-span-4 space-y-4">
                <h4 className={`text-xs uppercase font-mono tracking-wider ${textHeading}`}>Route Overview</h4>
                
                {/* AI Route Option tabs */}
                <div className="grid grid-cols-2 gap-2 text-[9px] font-bold font-mono">
                  <button onClick={() => setRouteOption("fastest")} className={`p-2.5 rounded-xl border border-solid text-center ${routeOption === "fastest" ? "bg-blue-600 border-blue-600 text-white" : "border-slate-200/20 text-slate-400"}`}>
                    ⚡ Fastest Route
                  </button>
                  <button onClick={() => setRouteOption("accessible")} className={`p-2.5 rounded-xl border border-solid text-center ${routeOption === "accessible" ? "bg-blue-600 border-blue-600 text-white" : "border-slate-200/20 text-slate-400"}`}>
                    ♿ Accessible
                  </button>
                </div>

                <div className="space-y-3">
                  <div className={`p-4 rounded-2xl border border-solid space-y-2.5 ${cardClass}`}>
                    <span className="text-[10px] font-mono text-blue-600 font-bold block uppercase">DESTINATION METRICS</span>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="block text-slate-400 font-mono text-[9px]">Target Point</span>
                        <span className={`font-extrabold block truncate ${textHeading}`}>{navDestination}</span>
                      </div>
                      <div>
                        <span className="block text-slate-400 font-mono text-[9px]">ETA duration</span>
                        <span className={`font-extrabold block ${textHeading}`}>14:12 AST (4 min)</span>
                      </div>
                      <div>
                        <span className="block text-slate-400 font-mono text-[9px]">Crowd status</span>
                        <span className="font-extrabold text-emerald-500 block">Low Ingress</span>
                      </div>
                      <div>
                        <span className="block text-slate-400 font-mono text-[9px]">Walking Distance</span>
                        <span className={`font-extrabold block ${textHeading}`}>240 meters</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom step-by-step panel */}
            <GlassCard padding="md" rounded="md" border={true} className={`${cardClass} p-5 space-y-4`}>
              <h3 className={`text-xs uppercase font-mono tracking-widest ${textHeading}`}>
                🚶‍♂️ JOURNEY TIMELINE STEPS
              </h3>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-[10px] font-bold text-slate-400">
                <span className="text-emerald-500">🚗 Leave Parking {ticket.parkingSpace}</span>
                <span className="text-slate-300">→</span>
                <span className="text-emerald-500">🚶 Walk to Gate B</span>
                <span className="text-slate-300">→</span>
                <span className="text-emerald-500">🎫 Ticket Scan</span>
                <span className="text-slate-300">→</span>
                <span className="text-emerald-500">🛡 Security check</span>
                <span className="text-slate-300">→</span>
                <span className="text-blue-500">🏟 Enter {ticket.section}</span>
                <span className="text-slate-300">→</span>
                <span className={textHeading}>🪑 Seat 12 reached</span>
              </div>
            </GlassCard>
          </div>
        )}

        {/* ==================== PAGE 4: MATCH CENTER ==================== */}
        {activePage === "match" && (
          <div className="space-y-8 animate-fade-in text-left">
            <GlassCard padding="md" rounded="md" border={true} className={`${cardClass} p-6`}>
              <h2 className={`text-lg font-mono uppercase tracking-widest border-b border-solid border-slate-200/20 pb-2 ${textHeading}`}>
                ⚽ LIVE MATCH CENTER
              </h2>
              <p className={`text-xs mt-2 ${textBody}`}>
                Real-time scoreboard, team momentum meters, and official commentary feeds.
              </p>
            </GlassCard>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Stats card */}
              <div className="lg:col-span-8 space-y-6">
                <GlassCard padding="md" rounded="md" border={true} className={`${cardClass} p-6 space-y-6`}>
                  <div className="flex justify-around items-center text-center">
                    <div className="space-y-1">
                      <span className={`block text-base font-black ${textHeading}`}>Argentina</span>
                      <Badge variant="live" size="sm" className="bg-blue-500 text-white font-bold border-none">ARG</Badge>
                    </div>
                    <div className={`text-4xl font-black font-mono tracking-widest ${textHeading}`}>2 - 1</div>
                    <div className="space-y-1">
                      <span className={`block text-base font-black ${textHeading}`}>France</span>
                      <Badge variant="info" size="sm" className="bg-slate-400 text-white font-bold border-none">FRA</Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-xs font-mono text-slate-500">
                      <span>ARG 52%</span>
                      <span>Possession</span>
                      <span>48% FRA</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden flex shadow-inner">
                      <div className="bg-blue-600 h-full" style={{ width: "52%" }} />
                      <div className="bg-indigo-900 h-full" style={{ width: "48%" }} />
                    </div>
                  </div>
                </GlassCard>

                {/* Team Momentum Chart */}
                <GlassCard padding="md" rounded="md" border={true} className={`${cardClass} p-5 space-y-4`}>
                  <h3 className={`text-xs uppercase font-mono tracking-widest ${textHeading}`}>
                    📈 TEAM MOMENTUM GRAPH
                  </h3>
                  <div className="h-28 bg-slate-500/5 rounded-2xl flex items-end justify-between p-3 border border-solid border-slate-200/10">
                    {[12, 18, 42, 64, 52, 38, 25, 45, 68, 88, 72, 54, 32, 18, 42, 64, 82].map((val, idx) => (
                      <div key={idx} className="w-[4%] bg-blue-500 rounded-t group relative cursor-pointer" style={{ height: `${val}%` }}>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-black text-white text-[8px] font-mono p-1 rounded">
                          {val}%
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </div>

              {/* Event Logs Timeline */}
              <div className="lg:col-span-4">
                <GlassCard padding="md" rounded="md" border={true} className={`${cardClass} p-6 space-y-4 h-full`}>
                  <h4 className={`text-xs uppercase font-mono tracking-wider ${textHeading}`}>Commentary & VAR</h4>
                  <div className="space-y-4 text-xs font-mono">
                    <div className="border-b border-solid border-slate-200/10 pb-3">
                      <span className="text-blue-600 font-bold block">78&apos; SUBSTITUTION</span>
                      <p className="text-slate-500 mt-1">Angel Di Maria leaves pitch. Acuna enters field.</p>
                    </div>
                    <div className="border-b border-solid border-slate-200/10 pb-3">
                      <span className="text-emerald-500 font-bold block">64&apos; GOAL ARGENTINA</span>
                      <p className="text-slate-500 mt-1">Goal scored by Angel Di Maria. Assisted by Lionel Messi.</p>
                    </div>
                    <div>
                      <span className="text-slate-500 font-bold block">45&apos; HALFTIME TIMELINE</span>
                      <p className="text-slate-400 mt-1">VAR confirmation verifies offside checks are clear.</p>
                    </div>
                  </div>
                </GlassCard>
              </div>

            </div>
          </div>
        )}

        {/* ==================== PAGE 5: FOOD & SHOPS ==================== */}
        {activePage === "food" && (
          <div className="space-y-8 animate-fade-in text-left">
            
            {/* Auto sliding hero banner with overlays */}
            <div
              onMouseEnter={() => setIsBannerHovered(true)}
              onMouseLeave={() => setIsBannerHovered(false)}
              className={`bg-gradient-to-r ${slides[currentSlide].bg} rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl transition-all duration-700 h-52 flex flex-col justify-center`}
            >
              <div className="absolute inset-0 opacity-10 pointer-events-none select-none bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-white to-transparent" />
              <div className="relative z-10 space-y-2">
                <Badge variant="live" className="bg-amber-400 text-slate-900 border-none font-bold py-1 px-3 rounded-full text-[10px]">
                  ⚽ WORLD CUP COMMERCE FEATURE
                </Badge>
                <h1 className="text-2xl md:text-3xl font-black tracking-tight leading-none text-white">
                  {slides[currentSlide].title}
                </h1>
                <p className="text-xs text-blue-100 max-w-xl font-semibold">
                  {slides[currentSlide].subtitle}
                </p>
              </div>

              {/* Slide dots indicators */}
              <div className="absolute bottom-4 right-4 flex gap-1.5 z-10">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${currentSlide === idx ? "bg-white scale-125" : "bg-white/30 hover:bg-white/50"}`}
                  />
                ))}
              </div>
            </div>

            {/* Smart Commerce Banner Header */}
            <GlassCard padding="md" rounded="md" border={true} className={`${cardClass} p-6 flex flex-col md:flex-row md:items-center justify-between gap-6`}>
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className={`text-xl uppercase tracking-widest ${textHeading}`}>
                    🛍 Stadium Stores & Smart Commerce
                  </h2>
                  <Badge variant="live" className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 font-bold text-[9px] uppercase">
                    🟢 Arena AI Active
                  </Badge>
                </div>
                <p className={`text-xs font-semibold leading-relaxed ${textBody} max-w-2xl`}>
                  Reserve food near your seat, purchase official merchandise, compare queue times, and let Arena AI recommend the fastest pickup experience.
                </p>

                {/* AI telemetry header badges strip */}
                <div className="flex flex-wrap gap-3 pt-1 text-[9px] font-mono font-bold text-slate-500 dark:text-slate-300">
                  <span className="bg-slate-500/10 px-2.5 py-1 rounded-md">Average Queue: <span className="text-blue-600 font-extrabold">3 mins</span></span>
                  <span className="bg-slate-500/10 px-2.5 py-1 rounded-md">Open Stalls: <span className="text-blue-600 font-extrabold">42</span></span>
                  <span className="bg-slate-500/10 px-2.5 py-1 rounded-md">Official Stores: <span className="text-blue-600 font-extrabold">8</span></span>
                  <span className="bg-slate-500/10 px-2.5 py-1 rounded-md">Orders Today: <span className="text-blue-600 font-extrabold">12,842</span></span>
                </div>
              </div>

              {/* Concessions / Merch switcher */}
              <div className="flex bg-slate-500/5 p-1 rounded-full border border-solid border-slate-200/10 self-start shrink-0">
                <button onClick={() => setStoreTab("food")} className={`text-[10px] px-4 py-2 rounded-full font-bold transition-all ${storeTab === "food" ? "bg-blue-600 text-white shadow" : "text-slate-400 hover:text-slate-200"}`}>
                  🍔 Food & Concessions
                </button>
                <button onClick={() => setStoreTab("merch")} className={`text-[10px] px-4 py-2 rounded-full font-bold transition-all ${storeTab === "merch" ? "bg-blue-600 text-white shadow" : "text-slate-400 hover:text-slate-200"}`}>
                  🧣 Official Merchandise
                </button>
              </div>
            </GlassCard>

            {/* Live Event Timeline strip */}
            <div className="bg-blue-600/10 border border-blue-500/20 rounded-2xl p-3 flex items-center justify-between gap-4 border-solid">
              <span className="text-[9px] font-mono font-bold text-blue-600 uppercase shrink-0">⚡ Arena AI Live Updates:</span>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200 flex-grow animate-pulse">
                {liveUpdates[currentLiveUpdate]}
              </p>
            </div>

            {/* Global AI Recommendation Bar (Horizontal Filter Strip) */}
            <div className="space-y-2">
              <span className="block text-[10px] uppercase font-bold text-slate-500 font-mono tracking-wider">
                Arena AI Recommendations Filter
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "⭐ AI Pick", val: "aipick" },
                  { label: "🌱 Vegetarian", val: "veg" },
                  { label: "🍗 Non-Veg", val: "nonveg" },
                  { label: "💰 Under ₹300", val: "under300" },
                  { label: "📍 Near My Seat", val: "near" },
                  { label: "🚶 Under 2 Min Walk", val: "walk" },
                  { label: "All Products", val: "all" },
                ].map((flt) => (
                  <button
                    key={flt.val}
                    onClick={() => {
                      setCategoryFilter(flt.val);
                      addToast(`Filtered by ${flt.label}`, "info");
                    }}
                    className={`text-[9px] font-bold font-mono px-3.5 py-1.5 rounded-full border border-solid transition-all ${categoryFilter === flt.val ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20" : "bg-transparent border-slate-200/20 text-slate-400 hover:text-slate-200"}`}
                  >
                    {flt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Search & Sort Panel */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-8">
                <input
                  type="text"
                  placeholder="Search concessions: Burger, Pizza, Coffee, Jersey, Football, Cap..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full p-3 rounded-xl border border-solid text-xs font-semibold focus:outline-none focus:border-blue-600 ${inputClass}`}
                />
              </div>

              <div className="md:col-span-4 flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase shrink-0">Sort By:</span>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border border-solid text-xs font-bold focus:outline-none ${inputClass}`}
                >
                  <option value="ai">AI Recommended</option>
                  <option value="price">Price: Low to High</option>
                  <option value="rating">User Rating</option>
                </select>
              </div>
            </div>

            {/* Active order tracker status simulation */}
            {activeFoodOrder && (
              <GlassCard padding="sm" rounded="sm" border={true} className="border-blue-600/30 bg-blue-600/5 p-5 space-y-4">
                <div className="flex justify-between items-center flex-wrap gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="live" size="sm" className="bg-blue-600 text-white border-none font-bold uppercase animate-pulse">
                        LIVE ORDER TRACKING
                      </Badge>
                      <span className="text-xs font-bold font-mono">Counter {activeFoodOrder.stall}</span>
                    </div>
                    <h3 className={`text-sm font-black ${textHeading}`}>{activeFoodOrder.name}</h3>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="block text-[8px] font-mono text-slate-400 uppercase">READY IN</span>
                      <span className="text-lg font-black font-mono text-blue-600">{activeFoodOrder.countdown}s</span>
                    </div>
                    <Button variant="outline" onClick={() => handleNavigateToStall(activeFoodOrder.stall)} className="text-[10px] py-1.5 px-3 font-bold border-blue-500/30 text-blue-600 hover:bg-blue-600/10">
                      Navigate with Arena AI ➔
                    </Button>
                  </div>
                </div>

                {/* Simulated Order Progress timeline */}
                <div className="grid grid-cols-6 gap-2 text-center text-[9px] font-mono font-bold text-slate-400 pt-2 border-t border-solid border-slate-200/10">
                  <div className={activeFoodOrder.status !== "received" ? "text-emerald-500 font-extrabold" : "text-blue-500 animate-pulse font-extrabold"}>
                    <span className="block text-sm">📥</span> Received
                  </div>
                  <div className={["accepted", "preparing", "packing", "ready", "collected"].includes(activeFoodOrder.status) ? (activeFoodOrder.status === "accepted" ? "text-blue-500 animate-pulse font-extrabold" : "text-emerald-500 font-extrabold") : ""}>
                    <span className="block text-sm">✓</span> Accepted
                  </div>
                  <div className={["preparing", "packing", "ready", "collected"].includes(activeFoodOrder.status) ? (activeFoodOrder.status === "preparing" ? "text-blue-500 animate-pulse font-extrabold" : "text-emerald-500 font-extrabold") : ""}>
                    <span className="block text-sm">🍳</span> Preparing
                  </div>
                  <div className={["packing", "ready", "collected"].includes(activeFoodOrder.status) ? (activeFoodOrder.status === "packing" ? "text-blue-500 animate-pulse font-extrabold" : "text-emerald-500 font-extrabold") : ""}>
                    <span className="block text-sm">📦</span> Packing
                  </div>
                  <div className={["ready", "collected"].includes(activeFoodOrder.status) ? (activeFoodOrder.status === "ready" ? "text-blue-500 animate-pulse font-extrabold" : "text-emerald-500 font-extrabold") : ""}>
                    <span className="block text-sm">🔔</span> Ready
                  </div>
                  <div className={activeFoodOrder.status === "collected" ? "text-emerald-500 font-extrabold" : ""}>
                    <span className="block text-sm">🍽</span> Collected
                  </div>
                </div>
              </GlassCard>
            )}

            {activeMerchReservation && (
              <GlassCard padding="sm" rounded="sm" border={true} className="border-emerald-600/30 bg-emerald-600/5 p-5 space-y-3">
                <div className="flex justify-between items-center flex-wrap gap-4">
                  <div className="space-y-1">
                    <Badge variant="live" size="sm" className="bg-emerald-500/20 border-emerald-500/40 text-emerald-400 font-bold uppercase">
                      RESERVATIONS EXPIRING SOON
                    </Badge>
                    <h3 className={`text-sm font-black ${textHeading}`}>{activeMerchReservation.name}</h3>
                    <p className={`text-[10px] ${textDesc}`}>
                      Store Location: <span className="font-extrabold text-emerald-500">{activeMerchReservation.shop}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="block text-[8px] font-mono text-slate-400 uppercase">HOLD EXPIRES IN</span>
                      <span className="text-lg font-black font-mono text-emerald-500">
                        {Math.floor(activeMerchReservation.timeLeft / 60)}m {activeMerchReservation.timeLeft % 60}s
                      </span>
                    </div>
                    <Button variant="outline" onClick={() => handleNavigateToStall(activeMerchReservation.shop)} className="text-[10px] py-1.5 px-3 font-bold border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/10">
                      Navigate with Arena AI ➔
                    </Button>
                  </div>
                </div>
              </GlassCard>
            )}

            {/* Sub-tab 1: Food & Concessions */}
            {storeTab === "food" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredFood.map((item, idx) => (
                  <GlassCard key={idx} padding="none" rounded="md" border={true} className={`${cardClass} p-5 flex flex-col justify-between h-[370px] hover:border-blue-500/30 transition-all hover:-translate-y-1`}>
                    <div className="space-y-2.5 text-left">
                      <div className="flex justify-between items-start">
                        <Badge variant="live" size="sm" className={item.isVeg ? "bg-emerald-500/10 text-emerald-500 border-none font-bold" : "bg-red-500/10 text-red-500 border-none font-bold"}>
                          {item.isVeg ? "🌱 VEG" : "🍗 NON-VEG"}
                        </Badge>
                        {item.aiPick && (
                          <Badge variant="info" size="sm" className="bg-amber-400 text-slate-900 border-none font-extrabold text-[8px] tracking-widest uppercase">
                            ★ AI Pick
                          </Badge>
                        )}
                      </div>

                      <h3 className={`text-sm font-black mt-1 line-clamp-1 ${textHeading}`}>{item.name}</h3>
                      <span className={`${textMeta} block`}>{item.rating} • {item.stall}</span>
                      
                      <p className={`text-[10px] line-clamp-2 leading-relaxed ${textBody}`}>
                        {item.desc}
                      </p>

                      <div className={`grid grid-cols-2 gap-1.5 text-[9px] font-mono pt-2 border-t border-solid border-slate-200/10 ${textDesc}`}>
                        <div>Prep: {item.prepTime}</div>
                        <div>Queue: {item.queueTime}</div>
                        <div>Dist: {item.distance}</div>
                      </div>

                      {/* Social proof indicators */}
                      {item.socialProof && (
                        <div className="text-[9px] font-mono text-blue-600 dark:text-blue-400 font-bold">
                          {item.socialProof}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2 mt-4">
                      {/* Veg burger combo save banner suggestion */}
                      <div className="text-[8px] font-mono bg-blue-600/10 p-1.5 rounded-lg border border-solid border-blue-500/20 text-slate-500 dark:text-slate-300 flex justify-between">
                        <span>🍔 Combo: Burger + Fries + Cola</span>
                        <span className="text-blue-600 font-bold">Save ₹40</span>
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t border-solid border-slate-200/20">
                        <span className={`text-base font-black ${textHeading}`}>₹{item.price}</span>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleNavigateToStall(item.stall)} className="text-[9px] py-1.5 px-2.5 rounded-full font-bold">
                            🗺 Route
                          </Button>
                          <Button variant="primary" size="sm" onClick={() => setSelectedFood(item)} className="text-[9px] py-1.5 px-3 rounded-full font-bold">
                            Inspect
                          </Button>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            )}

            {/* Sub-tab 2: Merchandise */}
            {storeTab === "merch" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredMerch.map((item, idx) => (
                    <GlassCard key={idx} padding="none" rounded="md" border={true} className={`${cardClass} p-5 flex flex-col justify-between h-[370px] hover:border-blue-500/30 transition-all hover:-translate-y-1`}>
                      <div className="space-y-2.5 text-left">
                        <div className="flex justify-between items-start">
                          <Badge variant="live" size="sm" className="bg-blue-600 text-white border-none font-bold text-[8px]">
                            {item.shop}
                          </Badge>
                          {item.isLimited && (
                            <Badge variant="info" size="sm" className="bg-red-500 text-white border-none font-extrabold text-[8px] animate-pulse">
                              ⏳ ONLY {item.stock} LEFT
                            </Badge>
                          )}
                        </div>

                        <h3 className={`text-sm font-black mt-1 line-clamp-1 ${textHeading}`}>{item.name}</h3>
                        <span className={`${textMeta} block`}>{item.rating} • {item.distance}</span>
                        
                        <p className={`text-[10px] line-clamp-2 leading-relaxed ${textBody}`}>
                          {item.desc}
                        </p>

                        <div className={`text-[9px] font-mono pt-2 border-t border-solid border-slate-200/10 ${textDesc}`}>
                          Composition: {item.material}
                        </div>

                        {item.socialProof && (
                          <div className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                            {item.socialProof}
                          </div>
                        )}
                      </div>

                      <div className="flex justify-between items-center pt-3 border-t border-solid border-slate-200/20 mt-4">
                        <span className={`text-base font-black ${textHeading}`}>₹{item.price.toLocaleString("en-IN")}</span>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleNavigateToStall(item.shop)} className="text-[9px] py-1.5 px-2.5 rounded-full font-bold">
                            🗺 Route
                          </Button>
                          <Button variant="primary" size="sm" onClick={() => setSelectedMerch(item)} className="text-[9px] py-1.5 px-3 rounded-full font-bold">
                            Inspect
                          </Button>
                        </div>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* ==================== PAGE 6: AI PARKING & RETURN ASSISTANT ==================== */}
        {activePage === "transit" && (
          <div className="space-y-8 animate-fade-in text-left">
            
            {/* 1. Hero Section */}
            <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-white to-transparent" />
              
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant="live" className="bg-amber-400 text-slate-900 border-none font-bold py-1 px-3 rounded-full text-[10px] uppercase tracking-wider">
                    🤖 AI AUTOMATED RETURN ROUTING ACTIVE
                  </Badge>
                </div>
                <h1 className="text-3xl font-black tracking-tight leading-none text-white">
                  🚗 AI Parking & Return Assistant
                </h1>
                <p className="text-xs text-blue-100 max-w-2xl font-semibold">
                  ArenaOS AI automatically remembers where you parked and provides the fastest AI-powered route back to your vehicle after the match.
                </p>

                {/* Compact Summary Panel */}
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4 bg-black/20 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-xs font-mono">
                  <div>
                    <span className="block text-blue-200 text-[8px] uppercase font-bold">Zone</span>
                    <span className="text-sm font-extrabold text-white">North Parking A</span>
                  </div>
                  <div>
                    <span className="block text-blue-200 text-[8px] uppercase font-bold">Spot</span>
                    <span className="text-sm font-extrabold text-white">A27</span>
                  </div>
                  <div>
                    <span className="block text-blue-200 text-[8px] uppercase font-bold">Floor</span>
                    <span className="text-sm font-extrabold text-white">Ground Level</span>
                  </div>
                  <div>
                    <span className="block text-blue-200 text-[8px] uppercase font-bold">Seat Location</span>
                    <span className="text-sm font-extrabold text-white">Sect 204, G12</span>
                  </div>
                  <div>
                    <span className="block text-blue-200 text-[8px] uppercase font-bold">Walk time</span>
                    <span className="text-sm font-extrabold text-white">4 mins</span>
                  </div>
                  <div>
                    <span className="block text-blue-200 text-[8px] uppercase font-bold">Status</span>
                    <span className="text-emerald-400 font-extrabold">✅ Saved Spot</span>
                  </div>
                </div>

                <div className="text-[10px] text-blue-200 font-semibold italic flex items-center gap-1">
                  ⭐ <span className="underline">Arena AI remembers your parking location automatically.</span>
                </div>
              </div>
            </div>

            {/* Smart Save Experience Panel */}
            <div className="transition-all duration-300">
              {!parkingSaved ? (
                <div className="bg-blue-600/10 border border-solid border-blue-500/30 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono font-bold text-blue-600 uppercase flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
                      📍 Arena AI Location Detection
                    </span>
                    <h4 className="text-sm font-black text-[#0F172A]">Arena AI detected your location at North Parking A, Spot A27.</h4>
                    <p className="text-xs text-[#475569]">Would you like to save this parking spot to your matchday helper memory?</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button variant="outline" onClick={() => addToast("Parking reminder prompt skipped.", "info")} className="text-xs px-4 py-2 border-slate-200 text-[#475569]">
                      Not Now
                    </Button>
                    <Button variant="primary" onClick={() => { setParkingSaved(true); addToast("Parking spot A27 saved to Arena Memory!", "success"); }} className="text-xs px-4 py-2 bg-blue-600 text-white font-bold">
                      Save Parking Location
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="bg-emerald-500/10 border border-solid border-emerald-500/30 text-emerald-800 rounded-2xl p-4 text-xs font-bold flex items-center gap-2">
                  <span>✅</span> Parking location successfully remembered. Arena AI will guide you back after the match.
                </div>
              )}
            </div>

            {/* Main Interactive Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column: My Parking Spot & Return Route */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* 2. My Parking Memory Card */}
                <GlassCard padding="md" rounded="md" border={true} className={`${cardClass} p-5 space-y-4`}>
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm uppercase font-mono tracking-widest text-[#0F172A] font-extrabold flex items-center gap-1.5">
                      <span>🅿</span> My Parking Memory
                    </h3>
                    <span className="text-[8px] bg-blue-600/10 text-blue-600 font-mono font-bold px-2 py-0.5 rounded-full">AI DETECTED</span>
                  </div>

                  <div className="space-y-3 text-xs border-y border-solid border-slate-200/10 py-3">
                    <div className="flex justify-between">
                      <span className={textDesc}>📍 Parking Zone</span>
                      <span className="font-bold text-[#0F172A]">North Parking A</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={textDesc}>🚗 Spot Number</span>
                      <span className="font-bold text-[#0F172A]">A27</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={textDesc}>🕒 Parking Saved</span>
                      <span className="font-bold text-[#0F172A]">5:42 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={textDesc}>🚶 Distance From Current Location</span>
                      <span className="font-bold text-[#0F172A]">280 meters</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={textDesc}>⏱ Estimated Walk</span>
                      <span className="font-bold text-[#0F172A]">5 Minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={textDesc}>📝 Parking Note</span>
                      <span className="font-bold text-[#0F172A]">&quot;Near Blue Pillar B12&quot;</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-solid border-slate-200/10">
                      <span className={textDesc}>Status</span>
                      <span className="font-extrabold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-md text-[10px]">
                        ✅ Saved Successfully
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button onClick={() => addToast("Edit parking memory parameters active.", "info")} className="w-full py-2 text-[10px] font-bold rounded-lg border border-solid border-slate-200 text-[#475569] hover:bg-slate-500/5 transition-all">
                      ✏ Edit Parking Memory
                    </button>
                    <button onClick={() => addToast("Recalculating pedestrian routes...", "success")} className="w-full py-2 text-[10px] font-bold rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-all">
                      📍 Open Route Navigation
                    </button>
                  </div>
                </GlassCard>

                {/* 5. New Forgot Where I Parked Recovery Card */}
                <GlassCard padding="md" rounded="md" border={true} className={`${cardClass} p-5 space-y-3`}>
                  <h3 className="text-sm uppercase font-mono tracking-widest text-[#DC2626] font-extrabold flex items-center gap-1.5">
                    <span>❓</span> Forgot Where I Parked?
                  </h3>
                  <p className="text-[#475569] text-xs leading-relaxed font-medium">
                    ArenaOS AI automatically remembers your parking location even if you forget. Trigger immediate navigation lookup.
                  </p>
                  <button 
                    onClick={() => {
                      setParkingMapLayer("vehicle");
                      addToast("Arena AI recovered your car! Displaying route to spot A27.", "success");
                    }} 
                    className="w-full py-2 text-xs font-black rounded-lg border border-solid border-red-500 text-red-500 hover:bg-red-500/5 transition-all text-center block cursor-pointer"
                  >
                    Find My Vehicle Location
                  </button>
                </GlassCard>

                {/* 8. New Best Time To Leave Card */}
                <GlassCard padding="md" rounded="md" border={true} className={`${cardClass} p-5 space-y-4`}>
                  <h3 className="text-sm uppercase font-mono tracking-widest text-[#0F172A] font-extrabold flex items-center gap-1.5">
                    <span>🧠</span> Best Time To Leave
                  </h3>

                  <div className="space-y-3">
                    {/* Option 1 */}
                    <div className="border-2 border-solid border-blue-600 bg-blue-600/5 p-3 rounded-xl space-y-1 relative">
                      <span className="absolute top-2 right-2 bg-blue-600 text-white text-[8px] font-mono px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">RECOM</span>
                      <span className="block font-black text-xs text-[#0F172A]">Leave Now</span>
                      <div className="flex gap-4 text-[10px] font-mono text-slate-500">
                        <span>Walk: 5 min</span>
                        <span>Crowd: Low</span>
                        <span className="text-amber-500">★★★★★</span>
                      </div>
                    </div>

                    {/* Option 2 */}
                    <div className="border border-solid border-slate-200 p-3 rounded-xl space-y-1">
                      <span className="block font-black text-xs text-[#0F172A]">Leave In 5 Minutes</span>
                      <div className="flex gap-4 text-[10px] font-mono text-slate-500">
                        <span>Walk: 6 min</span>
                        <span>Crowd: Medium</span>
                        <span className="text-amber-500">★★★★☆</span>
                      </div>
                    </div>

                    {/* Option 3 */}
                    <div className="border border-solid border-slate-200 p-3 rounded-xl space-y-1">
                      <span className="block font-black text-xs text-[#0F172A]">Leave In 15 Minutes</span>
                      <div className="flex gap-4 text-[10px] font-mono text-slate-500">
                        <span>Walk: 3 min</span>
                        <span>Crowd: Very Low</span>
                        <span className="text-amber-500">★★★★★</span>
                      </div>
                    </div>
                  </div>
                </GlassCard>

              </div>

              {/* Right Column: Live Maps & Occupancy */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* 7. Large Interactive Stadium & Parking Map */}
                <GlassCard padding="md" rounded="md" border={true} className={`${cardClass} p-5 space-y-4`}>
                  <div className="flex justify-between items-center flex-wrap gap-4">
                    <h3 className="text-sm uppercase font-mono tracking-widest text-[#0F172A] font-extrabold flex items-center gap-1.5">
                      <span>🗺</span> Stadium Parking & Gates map twin
                    </h3>

                    {/* Layer Toggles */}
                    <div className="flex flex-wrap gap-1 bg-slate-500/5 p-1 rounded-lg border border-solid border-slate-200/10">
                      {[
                        { label: "🅿 Parking", val: "parking" },
                        { label: "👥 Crowd", val: "crowd" },
                        { label: "🚪 Gates", val: "gates" },
                        { label: "🚗 Vehicle", val: "vehicle" },
                      ].map((lyr) => (
                        <button
                          key={lyr.val}
                          onClick={() => setParkingMapLayer(lyr.val)}
                          className={`text-[9px] font-bold font-mono px-2.5 py-1 rounded-md transition-all ${
                            parkingMapLayer === lyr.val ? "bg-blue-600 text-white" : "text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          {lyr.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Animated Route Map Canvas */}
                  <div className="bg-black/5 border border-slate-200 border-solid rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden h-80">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-40" />
                    
                    <svg className="w-72 h-72 drop-shadow-lg" viewBox="0 0 400 400" fill="none">
                      {/* Outer boundary stand */}
                      <path d="M200 40 C300 40 370 110 370 200 C370 290 300 360 200 360 C100 360 30 290 30 200 C30 110 100 40 200 40 Z" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-300" />
                      
                      {/* Stand quadrants */}
                      <path d="M120 70 L200 130 L280 70" stroke="currentColor" strokeWidth="5" className="text-slate-300" />
                      <path d="M330 120 L270 200 L330 280" stroke="currentColor" strokeWidth="5" className="text-slate-300" />
                      
                      {/* Gates */}
                      <circle cx="200" cy="50" r="10" fill="#3B82F6" />
                      <text x="195" y="53" fill="white" className="text-[8px] font-bold font-mono">B</text>
                      
                      {/* Parking Lots layout shapes */}
                      <rect x="50" y="300" width="100" height="50" rx="8" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-500/40" />
                      <text x="65" y="325" fill="currentColor" className="text-[9px] font-bold font-mono text-slate-400">Parking A</text>

                      {/* User Seat Spot Pin */}
                      <circle cx="200" cy="130" r="5" fill="#3B82F6" />
                      <circle cx="200" cy="130" r="10" fill="none" stroke="#3B82F6" strokeWidth="1.5" className="animate-ping" />

                      {/* Vehicle Location Pin */}
                      <g className="animate-bounce">
                        <circle cx="100" cy="325" r="5" fill="#EF4444" />
                        <circle cx="100" cy="325" r="12" fill="none" stroke="#EF4444" strokeWidth="2" className="animate-ping" />
                      </g>

                      {/* Animated Glowing Return Route Line */}
                      <path d="M200 130 L200 50 L140 200 L100 325" fill="none" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" strokeDasharray="10,10" className="animate-marquee" />
                    </svg>

                    <div className="absolute bottom-4 left-4 bg-white/95 dark:bg-black/90 border border-slate-200 dark:border-white/10 px-3 py-1.5 rounded-xl text-[10px] font-mono text-slate-500 dark:text-arena-muted shadow-md border-solid">
                      🚗 Dynamic Layer: <span className="font-extrabold text-blue-600 uppercase">{parkingMapLayer} Map</span> active
                    </div>
                  </div>
                </GlassCard>

                {/* 4. Parking Memory Snapshots Voice Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Snapshot card */}
                  <GlassCard padding="sm" rounded="sm" border={true} className={`${cardClass} p-4 space-y-2`}>
                    <span className="text-[8px] font-mono font-bold text-blue-600 uppercase block">📷 Parking Snapshot</span>
                    <div className="h-20 bg-slate-200 rounded-lg flex items-center justify-center text-xs font-mono font-bold text-slate-500 shadow-inner">
                      {parkingPhotoSaved ? "[Snapshot: Pillar B12]" : "[No Photo Snapshot]"}
                    </div>
                    <div className="text-[9px] text-[#475569] font-mono font-bold text-center">
                      {parkingPhotoSaved ? "Blue Pillar B12 • Saved 5:42 PM" : "No snapshot saved"}
                    </div>
                    <button onClick={() => { setParkingPhotoSaved(true); addToast("Update snapshot photo saved successfully!", "success"); }} className="w-full py-1 text-[9px] font-bold rounded border border-solid border-slate-200 text-[#475569] hover:bg-slate-500/5 transition-all">
                      {parkingPhotoSaved ? "Update Photo" : "Take Photo"}
                    </button>
                  </GlassCard>
 
                  {/* Voice memory card */}
                  <GlassCard padding="sm" rounded="sm" border={true} className={`${cardClass} p-4 space-y-2`}>
                    <span className="text-[8px] font-mono font-bold text-blue-600 uppercase block">🎤 Voice Memory</span>
                    <div className="bg-slate-100 p-2 rounded-lg border border-solid border-slate-200 text-[10px] italic">
                      {parkingVoiceRecorded ? '"My vehicle is parked beside the blue pillar."' : '"No voice recording"'}
                    </div>
                    <div className="text-[9px] text-[#475569] font-mono font-bold text-center">
                      {parkingVoiceRecorded ? "Recorded • 5:43 PM" : "No voice memo recorded"}
                    </div>
                    <button onClick={() => { setParkingVoiceRecorded(true); addToast("Voice note saved: 'My car is beside Blue Pillar B12.'", "success"); }} className="w-full py-1 text-[9px] font-bold rounded border border-solid border-slate-200 text-[#475569] hover:bg-slate-500/5 transition-all">
                      {parkingVoiceRecorded ? "Record Again" : "Record Voice"}
                    </button>
                  </GlassCard>

                  {/* Saved location card */}
                  <GlassCard padding="sm" rounded="sm" border={true} className={`${cardClass} p-4 space-y-2 flex flex-col justify-between`}>
                    <div className="space-y-1">
                      <span className="text-[8px] font-mono font-bold text-blue-600 uppercase block">📍 Saved Location</span>
                      <span className="block font-black text-[#0F172A] text-xs">North Parking A</span>
                      <span className="block text-[10px] text-[#475569]">Spot A27</span>
                    </div>
                    <button onClick={() => { setParkingMapLayer("parking"); addToast("Highlighting North Parking spot on twin map.", "info"); }} className="w-full py-1 text-[9px] font-bold rounded bg-blue-600 hover:bg-blue-700 text-white transition-all">
                      Open Map
                    </button>
                  </GlassCard>

                </div>

                {/* Return Route Visualization details */}
                <GlassCard padding="md" rounded="md" border={true} className={`${cardClass} p-5 space-y-4`}>
                  <h3 className="text-xs uppercase font-mono tracking-widest text-[#0F172A] font-extrabold flex items-center gap-1">
                    <span>🗺</span> Return Route Metrics
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono border-b border-solid border-slate-100 pb-3">
                    <div>
                      <span className="block text-slate-400 text-[9px]">Distance</span>
                      <span className="font-extrabold text-[#0F172A]">280 meters</span>
                    </div>
                    <div>
                      <span className="block text-slate-400 text-[9px]">Walking Time</span>
                      <span className="font-extrabold text-[#0F172A]">5 Minutes</span>
                    </div>
                    <div>
                      <span className="block text-slate-400 text-[9px]">Crowd Level</span>
                      <span className="font-extrabold text-emerald-600">Low</span>
                    </div>
                    <div>
                      <span className="block text-slate-400 text-[9px]">Route Status</span>
                      <span className="font-extrabold text-emerald-600">Optimal Route</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                    <div>
                      <span className="block text-slate-400 text-[9px]">AI Confidence</span>
                      <span className="font-extrabold text-blue-600">98%</span>
                    </div>
                    <div>
                      <span className="block text-slate-400 text-[9px]">AI Recommendation</span>
                      <span className="font-extrabold text-blue-600">Follow Blue Route</span>
                    </div>
                  </div>
                </GlassCard>

                {/* 5. Match Exit Assistant */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Occupancy list */}
                  <GlassCard padding="md" rounded="md" border={true} className={`${cardClass} p-5 space-y-4`}>
                    <h3 className="text-xs uppercase font-mono tracking-widest text-[#0F172A] font-extrabold">
                      ⚡ LIVE PARKING OCCUPANCY
                    </h3>
                    <div className="space-y-3 text-xs">
                      <div>
                        <div className="flex justify-between font-mono mb-1">
                          <span className={textBody}>North Parking A</span>
                          <span className="font-bold text-red-500">95% Full</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div className="bg-red-500 h-full" style={{ width: "95%" }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between font-mono mb-1">
                          <span className={textBody}>South Parking B</span>
                          <span className="font-bold text-amber-500">72% Full</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div className="bg-amber-500 h-full" style={{ width: "72%" }} />
                        </div>
                      </div>
                    </div>
                  </GlassCard>

                  {/* Exit details */}
                  <GlassCard padding="md" rounded="md" border={true} className={`${cardClass} p-5 space-y-4`}>
                    <h3 className="text-xs uppercase font-mono tracking-widest text-[#0F172A] font-extrabold flex items-center gap-1">
                      <span>🏁</span> Match Exit Assistant
                    </h3>

                    <div className="space-y-3 text-xs border-y border-solid border-slate-200/10 py-3 font-mono">
                      <div className="flex justify-between">
                        <span className={textDesc}>Recommended Exit</span>
                        <span className="font-bold text-blue-600">Gate B Turnstile</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={textDesc}>Concourse Crowd</span>
                        <span className="font-bold text-amber-500">Medium</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={textDesc}>Walking Time</span>
                        <span className="font-bold text-[#0F172A]">5 Minutes</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={textDesc}>AI Confidence</span>
                        <span className="font-bold text-blue-600">98%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={textDesc}>Est. Exit Transit</span>
                        <span className="font-bold text-[#0F172A]">5 Minutes</span>
                      </div>
                    </div>

                    <button onClick={() => addToast("Route guidance to Exit Gate B active.", "success")} className="w-full py-2.5 text-xs font-bold rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-all">
                      Navigate To Vehicle
                    </button>
                  </GlassCard>

                </div>

              </div>

            </div>

            {/* AI Parking Insights panel */}
            <div className="space-y-2">
              <span className="block text-[10px] uppercase font-bold text-slate-500 font-mono tracking-wider">
                🤖 Arena AI Parking Insights
              </span>
              <div className="flex gap-3 overflow-x-auto pb-1 text-[10px] font-bold font-mono text-slate-500 dark:text-slate-300">
                <span className="bg-slate-500/5 border border-solid border-slate-200/10 px-3.5 py-2 rounded-xl shrink-0">💡 Your vehicle is 280 meters away.</span>
                <span className="bg-slate-500/5 border border-solid border-slate-200/10 px-3.5 py-2 rounded-xl shrink-0">💡 Gate B currently has the fastest exit.</span>
                <span className="bg-slate-500/5 border border-solid border-slate-200/10 px-3.5 py-2 rounded-xl shrink-0">💡 Leaving in 5 minutes saves approximately 3 minutes of walk time.</span>
                <span className="bg-slate-500/5 border border-solid border-slate-200/10 px-3.5 py-2 rounded-xl shrink-0">💡 North Parking is almost full.</span>
                <span className="bg-slate-500/5 border border-solid border-slate-200/10 px-3.5 py-2 rounded-xl shrink-0">💡 Follow the Blue Route for the quickest return.</span>
                <span className="bg-slate-500/5 border border-solid border-slate-200/10 px-3.5 py-2 rounded-xl shrink-0">💡 Rain expected in 20 minutes. Consider leaving slightly earlier.</span>
              </div>
            </div>

            {/* 9. Match End Reminder Float Banner */}
            <div className="bg-gradient-to-r from-red-600 via-rose-600 to-orange-600 text-white rounded-3xl p-5 shadow-xl border border-solid border-red-500/30 flex items-center justify-between flex-wrap gap-4">
              <div className="space-y-1">
                <span className="bg-white/25 px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider font-mono">MATCH ENDING SOON</span>
                <h4 className="text-sm font-extrabold text-white">🏁 Match Ending Soon</h4>
                <p className="text-xs text-red-100 font-medium">Your Parking: North Parking A, Spot A27 • Recommended Exit: Gate B • Est. Walk: 5 Minutes.</p>
                <p className="text-[10px] text-red-200 font-mono italic">AI Recommendation: Leave in approximately 4 minutes for the fastest exit.</p>
              </div>
              <button onClick={() => addToast("Pedestrian return map guide active.", "success")} className="bg-white text-red-600 font-extrabold px-4 py-2 rounded-xl text-xs shadow hover:bg-slate-100 transition-all cursor-pointer">
                Navigate Now
              </button>
            </div>

            {/* 10. Return Journey Timeline */}
            <GlassCard padding="md" rounded="md" border={true} className={`${cardClass} p-5 space-y-4`}>
              <h3 className={`text-xs uppercase font-mono tracking-widest ${textHeading}`}>
                🚗 RETURN JOURNEY TIMELINE STEPS
              </h3>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-[9px] font-bold text-slate-400">
                <span className="text-emerald-500">🚗 Vehicle Parked</span>
                <span className="text-slate-300">→</span>
                <span className="text-emerald-500">🚶 Walk to Stadium</span>
                <span className="text-slate-300">→</span>
                <span className="text-emerald-500">🎫 Ticket Scan</span>
                <span className="text-slate-300">→</span>
                <span className="text-emerald-500">⚽ Watch Match</span>
                <span className="text-slate-300">→</span>
                <span className="text-blue-500 animate-pulse">🚪 Exit Stadium</span>
                <span className="text-slate-300">→</span>
                <span>🗺 AI Navigation</span>
                <span className="text-slate-300">→</span>
                <span>🚗 Reach Vehicle</span>
              </div>
            </GlassCard>

          </div>
        )}

        {/* ==================== PAGE 7: AI VIRTUAL HELPER ==================== */}
        {activePage === "copilot" && (
          <div className="space-y-8 animate-fade-in text-left">
            
            {/* 10. Live Context Bar */}
            <div className="bg-slate-900 text-white rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 border border-solid border-slate-800 shadow-lg text-xs font-mono">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-slate-400">Match:</span>
                  <span className="font-extrabold text-white">72&apos;</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span>🌡️</span>
                  <span className="text-slate-400">Temp:</span>
                  <span className="font-extrabold text-white">28°C</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span>👥</span>
                  <span className="text-slate-400">Crowd:</span>
                  <span className="font-extrabold text-white">Medium</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span>🅿️</span>
                  <span className="text-slate-400">Parking:</span>
                  <span className="font-extrabold text-emerald-400">Spot A27 Saved</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span>🎟️</span>
                  <span className="text-slate-400">Seat:</span>
                  <span className="font-extrabold text-white">Sect 204 G12</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span>🚪</span>
                  <span className="text-slate-400">Gates:</span>
                  <span className="font-extrabold text-emerald-400">Normal Flow</span>
                </div>
              </div>
            </div>

            {/* 6. Personalized Header Hero */}
            <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-white to-transparent" />
              
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="live" className="bg-emerald-400 text-slate-900 border-none font-bold py-1 px-3 rounded-full text-[10px] uppercase tracking-wider">
                      🟢 Arena AI Active
                    </Badge>
                    <span className="text-[10px] text-blue-200 font-mono font-bold uppercase tracking-wider">
                      Today&apos;s Match: Argentina vs France
                    </span>
                  </div>
                  <h1 className="text-3xl font-black tracking-tight leading-none text-white">
                    Good Evening 👋
                  </h1>
                  <div className="flex gap-4 text-xs font-mono text-blue-100 flex-wrap">
                    <span>📍 Seat: Sector 204 • Row G • Seat 12</span>
                    <span>🚗 Parking: Zone North A, Spot A27 (Saved)</span>
                  </div>
                  <p className="text-xs text-blue-100 font-bold italic mt-2">
                    💡 Arena AI has 3 personalized recommendations for you today.
                  </p>
                </div>
              </div>
            </div>

            {/* Main Interactive Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Quick Actions & Memory panels */}
              <div className="lg:col-span-7 space-y-8">
                
                {/* SECTION 1: Quick AI Actions */}
                <div className="space-y-3">
                  <h3 className="text-sm font-mono uppercase tracking-widest text-[#1E293B] font-bold">
                    ⚡ Quick AI Actions
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { icon: "🚻", title: "Find Nearest Restroom", desc: "Nearest clean restroom with shortest queue", key: "restroom" },
                      { icon: "🍔", title: "Order Food", desc: "Find concession stalls near Sector 204", key: "food" },
                      { icon: "🛍", title: "Merchandise Store", desc: "FIFA Store jerseys & accessories", key: "merchandise" },
                      { icon: "🩺", title: "Medical Help", desc: "Trigger first responder medical assistance", key: "medical" },
                      { icon: "🅿", title: "Find My Vehicle", desc: "Fastest return route to North Parking A", key: "parking" },
                      { icon: "🎟", title: "Take Me To My Seat", desc: "Step-by-step seat navigation guide", key: "seat" },
                      { icon: "🚪", title: "Fastest Exit", desc: "Crowd-optimized gate exit routes", key: "exit" },
                      { icon: "💧", title: "Drinking Water", desc: "Locate hydration refill stations", key: "water" },
                      { icon: "👶", title: "Family Room", desc: "Find baby care facilities nearby", key: "family" },
                      { icon: "♿", title: "Accessible Route", desc: "Wheelchair-friendly routes & elevators", key: "accessible" },
                      { icon: "🔔", title: "Match Alerts", desc: "Receive live referee commentary logs", key: "alert" },
                      { icon: "📷", title: "Lost & Found", desc: "Submit reports or locate desk", key: "lost" }
                    ].map((act) => (
                      <button
                        key={act.title}
                        onClick={() => triggerCopilotAction(act.key)}
                        className="bg-white hover:bg-slate-50 border border-solid border-slate-200 p-5 rounded-2xl shadow-sm text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-md flex items-start gap-4 group cursor-pointer"
                      >
                        <span className="text-2xl group-hover:scale-110 transition-transform">{act.icon}</span>
                        <div className="space-y-1">
                          <span className="block font-black text-xs text-[#1E293B]">{act.title}</span>
                          <span className="block text-[10px] text-[#475569] leading-snug">{act.desc}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* SECTION 2: Frequently Asked Questions suggestion chips */}
                <div className="space-y-3">
                  <h3 className="text-sm font-mono uppercase tracking-widest text-[#1E293B] font-bold">
                    ❓ Suggested One-Click Prompts
                  </h3>
                  
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Where is my parking?",
                      "Where is my seat?",
                      "Nearest restroom",
                      "Fastest exit",
                      "Food with shortest wait",
                      "Official merchandise",
                      "Medical clinic",
                      "Baby care room",
                      "Water station",
                      "Wheelchair route",
                      "Lost & Found",
                      "Charging station"
                    ].map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => triggerCopilotAction(prompt)}
                        className="bg-white hover:bg-slate-50 border border-solid border-slate-200 px-3.5 py-2 rounded-full text-[10px] font-mono text-[#2563EB] hover:text-[#1d4ed8] font-bold transition-all cursor-pointer shadow-sm"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 8. Arena AI Memory Section */}
                <GlassCard padding="md" rounded="md" border={true} className={`${cardClass} p-5 space-y-3`}>
                  <h3 className="text-xs font-mono uppercase tracking-widest text-[#1E293B] font-bold flex items-center gap-1.5">
                    <span>🧠</span> Arena AI Memory Context
                  </h3>
                  <p className="text-[10px] text-[#475569] leading-relaxed">
                    ArenaOS AI persistently stores and learns your preferences across matchdays. Matches user profile APIs.
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-[10px] font-mono">
                    <div className="bg-slate-500/5 p-2 rounded-xl border border-solid border-slate-200/10">
                      <span className="block text-slate-400 text-[8px]">SEAT ADDRESS</span>
                      <span className="font-bold text-[#1E293B]">Sect 204 G12</span>
                    </div>
                    <div className="bg-slate-500/5 p-2 rounded-xl border border-solid border-slate-200/10">
                      <span className="block text-slate-400 text-[8px]">PARKING SPOT</span>
                      <span className="font-bold text-[#1E293B]">Zone North A27</span>
                    </div>
                    <div className="bg-slate-500/5 p-2 rounded-xl border border-solid border-slate-200/10">
                      <span className="block text-slate-400 text-[8px]">PREFERRED FOOD</span>
                      <span className="font-bold text-[#1E293B]">Premium Veg Combo</span>
                    </div>
                    <div className="bg-slate-500/5 p-2 rounded-xl border border-solid border-slate-200/10">
                      <span className="block text-slate-400 text-[8px]">ACCESSIBILITY</span>
                      <span className="font-bold text-[#1E293B]">Step-Free Routes</span>
                    </div>
                    <div className="bg-slate-500/5 p-2 rounded-xl border border-solid border-slate-200/10">
                      <span className="block text-slate-400 text-[8px]">FAVORITE TEAM</span>
                      <span className="font-bold text-blue-600">Argentina 🇦🇷</span>
                    </div>
                    <div className="bg-slate-500/5 p-2 rounded-xl border border-solid border-slate-200/10">
                      <span className="block text-slate-400 text-[8px]">PREFERRED EXIT</span>
                      <span className="font-bold text-[#1E293B]">Gate B Turnstile</span>
                    </div>
                    <div className="bg-slate-500/5 p-2 rounded-xl border border-solid border-slate-200/10 col-span-2">
                      <span className="block text-slate-400 text-[8px]">RESERVED MERCHANDISE</span>
                      <span className="font-bold text-indigo-600">Argentina Champion Jersey</span>
                    </div>
                  </div>
                </GlassCard>

                {/* 7. Live Notification Panel Drawer */}
                <GlassCard padding="md" rounded="md" border={true} className={`${cardClass} p-5 space-y-3`}>
                  <h3 className="text-xs font-mono uppercase tracking-widest text-[#1E293B] font-bold flex items-center gap-1.5">
                    <span>🔔</span> Live Concierge Notification Timeline
                  </h3>
                  <div className="space-y-2 text-[10px] font-mono">
                    {[
                      { icon: "✔", text: "Food order is ready for pickup at Stall B12.", time: "1 min ago", status: "success" },
                      { icon: "✔", text: "Match starts in 12 minutes. Stadium seats filling rapidly.", time: "3 mins ago", status: "alert" },
                      { icon: "✔", text: "Gate B crowd ingress level reduced. Clear passage route.", time: "5 mins ago", status: "success" },
                      { icon: "✔", text: "Parking Spot A27 successfully locked in Arena Memory.", time: "10 mins ago", status: "success" },
                      { icon: "✔", text: "Official Jersey reserved at Fan Store Shop B.", time: "12 mins ago", status: "success" },
                      { icon: "✔", text: "Concourse Restroom B12 recently cleaned.", time: "15 mins ago", status: "info" }
                    ].map((notif, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 rounded-lg border border-solid border-slate-200/5 bg-slate-500/5">
                        <div className="flex items-center gap-2">
                          <span className={notif.status === "success" ? "text-emerald-500" : notif.status === "alert" ? "text-amber-500" : "text-blue-500"}>
                            {notif.icon}
                          </span>
                          <span className="text-[#475569]">{notif.text}</span>
                        </div>
                        <span className="text-slate-400 text-[8px]">{notif.time}</span>
                      </div>
                    ))}
                  </div>
                </GlassCard>

              </div>

              {/* Right Column: AI Response Card / Thinking animation & Stadium map */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* 5. AI Thinking Animation */}
                {isThinking ? (
                  <GlassCard padding="md" rounded="md" border={true} className={`${cardClass} p-8 flex flex-col items-center justify-center space-y-4 min-h-[320px] text-center`}>
                    <div className="relative w-16 h-16 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full border-4 border-solid border-blue-200 border-t-blue-600 animate-spin absolute" />
                      <span className="text-xl">🧠</span>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-black text-[#1E293B]">Arena AI is working</h4>
                      <p className="text-xs text-blue-600 font-mono font-bold animate-pulse">
                        {thinkingStep === 0 && "➔ Understanding request..."}
                        {thinkingStep === 1 && "➔ Searching stadium knowledge..."}
                        {thinkingStep === 2 && "➔ Checking live conditions..."}
                        {thinkingStep === 3 && "➔ Optimizing route..."}
                        {thinkingStep === 4 && "➔ Preparing response..."}
                      </p>
                    </div>
                    <div className="w-48 h-1 bg-slate-100 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-full transition-all duration-300" style={{ width: `${(thinkingStep + 1) * 20}%` }} />
                    </div>
                  </GlassCard>
                ) : (
                  <>
                    {/* 2. AI Mission Card */}
                    {copilotActionResponse && (
                      <GlassCard padding="md" rounded="md" border={true} className={`${cardClass} p-5 space-y-4`}>
                        
                        {/* Title header */}
                        <div className="flex justify-between items-center border-b border-solid border-slate-200/10 pb-2">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs">🧠</span>
                            <h4 className="text-xs font-mono uppercase font-bold text-[#1E293B]">
                              Arena AI Mission
                            </h4>
                          </div>
                          <span className="text-[8px] bg-blue-600 text-white font-mono px-2 py-0.5 rounded-full font-bold">
                            {copilotActionResponse.agentName}
                          </span>
                        </div>

                        {/* Mission details */}
                        <div className="space-y-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="text-[9px] font-mono text-slate-400 block uppercase">MISSION INTENT</span>
                              <span className="text-sm font-black text-[#1E293B]">
                                Finding {copilotActionResponse.title}
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="text-[9px] font-mono text-slate-400 block uppercase">AI CONFIDENCE</span>
                              <div className="flex items-center gap-1">
                                <span className="font-extrabold text-blue-600 text-xs">98%</span>
                                <div className="w-12 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                  <div className="bg-blue-600 h-full" style={{ width: "98%" }} />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* 12. AI Action Timeline / workflow checklist */}
                          <div className="bg-slate-500/5 p-3 rounded-2xl border border-solid border-slate-200/10 space-y-2">
                            <span className="block text-[8px] font-mono font-bold text-slate-400 uppercase">MISSION EXECUTION TIMELINE</span>
                            
                            <div className="space-y-2 font-mono text-[9px] text-[#475569]">
                              <div className="flex items-center justify-between">
                                <span className="text-emerald-600 font-bold">✓ 14:02 - Intent Detected</span>
                                <span className="text-slate-400">RAG Check</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-emerald-600 font-bold">✓ 14:02 - Knowledge Retrieved</span>
                                <span className="text-slate-400">Database Hit</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-emerald-600 font-bold">✓ 14:02 - Telemetry Check</span>
                                <span className="text-slate-400">Optimal Ingress</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-emerald-600 font-bold">✓ 14:03 - Route Generated</span>
                                <span className="text-slate-400">Blue Route Path</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-blue-600 font-bold">➔ 14:03 - Navigation Started</span>
                                <span className="text-blue-500 animate-pulse">Running</span>
                              </div>
                            </div>
                          </div>

                          {/* Parameters */}
                          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                            <div className="bg-slate-50 p-2.5 rounded-xl border border-solid border-slate-100">
                              <span className="block text-slate-400 text-[8px]">DESTINATION</span>
                              <span className="font-extrabold text-[#1E293B] block truncate">{copilotActionResponse.title}</span>
                            </div>
                            <div className="bg-slate-50 p-2.5 rounded-xl border border-solid border-slate-100">
                              <span className="block text-slate-400 text-[8px]">DISTANCE</span>
                              <span className="font-extrabold text-[#1E293B]">{copilotActionResponse.distance}</span>
                            </div>
                            <div className="bg-slate-50 p-2.5 rounded-xl border border-solid border-slate-100">
                              <span className="block text-slate-400 text-[8px]">WALKING TIME</span>
                              <span className="font-extrabold text-[#1E293B]">{copilotActionResponse.walkTime}</span>
                            </div>
                            <div className="bg-slate-50 p-2.5 rounded-xl border border-solid border-slate-100">
                              <span className="block text-slate-400 text-[8px]">ROUTE QUALITY</span>
                              <span className="font-extrabold text-emerald-600">Fastest</span>
                            </div>
                          </div>

                          {/* 4. Why This Recommendation Card */}
                          <div className="bg-blue-600/5 border border-solid border-blue-500/20 p-3 rounded-2xl space-y-2">
                            <span className="block text-[8px] font-mono font-bold text-blue-600 uppercase">
                              Why Arena AI Selected This Route
                            </span>
                            <ul className="text-[10px] text-[#475569] space-y-1 list-disc pl-4 leading-relaxed font-medium">
                              <li>42% less crowd corridor queues</li>
                              <li>3 minutes faster than alternate Gate A path</li>
                              <li>Elevator guides available for step-free pathing</li>
                              <li>Corridors recently cleaned and checked</li>
                              <li>No maintenance work detected on this stretch</li>
                            </ul>
                          </div>

                          {/* 3. Live Agent Status card */}
                          <div className="bg-slate-500/5 p-3 rounded-2xl border border-solid border-slate-200/10 space-y-2 text-[9px] font-mono">
                            <span className="block text-slate-400 text-[8px] font-bold uppercase">LIVE AGENT STATUS</span>
                            <div className="grid grid-cols-1 gap-1.5 text-[#475569]">
                              <div className="flex justify-between">
                                <span>🧭 Navigation Agent</span>
                                <span className="text-emerald-600 font-bold">✓ Active</span>
                              </div>
                              <div className="flex justify-between">
                                <span>🧠 Knowledge Agent</span>
                                <span className="text-emerald-600 font-bold">✓ Retrieved Stadium Data</span>
                              </div>
                              <div className="flex justify-between">
                                <span>🚦 Crowd Intelligence</span>
                                <span className="text-emerald-600 font-bold">✓ Route Optimized</span>
                              </div>
                              <div className="flex justify-between">
                                <span>📡 Live Telemetry</span>
                                <span className="text-slate-400">Updated 3s ago</span>
                              </div>
                              <div className="flex justify-between">
                                <span>🤖 Arena Supervisor</span>
                                <span className="text-blue-600 font-bold">Monitoring Flow</span>
                              </div>
                            </div>
                          </div>


                          <div className="flex gap-2">
                            <button
                              onClick={() => addToast("Alternate path calculated successfully.", "success")}
                              className="flex-1 py-2 text-xs font-bold rounded-lg border border-solid border-slate-200 text-[#475569] hover:bg-slate-500/5 transition-all text-center cursor-pointer"
                            >
                              Alternate Route
                            </button>
                            <button
                              onClick={() => addToast(`Route to ${copilotActionResponse.title} active on stadium twins!`, "success")}
                              className="flex-1 py-2 text-xs font-black rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-all text-center cursor-pointer"
                            >
                              Navigate Now
                            </button>
                          </div>
                        </div>
                      </GlassCard>
                    )}
                  </>
                )}

                {/* SECTION 4: Interactive Stadium Map */}
                <GlassCard padding="md" rounded="md" border={true} className={`${cardClass} p-5 space-y-3`}>
                  <div className="flex justify-between items-center font-mono text-[9px] font-bold text-slate-400">
                    <span>🏟️ SALT LAKE DYNAMIC TWIN PATHFINDING</span>
                    <span className="text-emerald-500">LIVE ROUTE STRETCH</span>
                  </div>

                  <div className="bg-black/5 border border-slate-200 border-solid rounded-2xl p-4 flex flex-col items-center justify-center relative overflow-hidden h-44">
                    <svg className="w-48 h-48 drop-shadow-md" viewBox="0 0 400 400" fill="none">
                      <circle cx="200" cy="200" r="120" stroke="currentColor" strokeWidth="2" className="text-slate-300" />
                      <circle cx="200" cy="200" r="3" fill="#2563EB" />
                      
                      {/* route lines */}
                      <path d="M200 200 L260 140 L310 240" fill="none" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" strokeDasharray="6,6" className="animate-marquee" />
                      
                      {/* Destination Pin */}
                      <circle cx="310" cy="240" r="5" fill="#EF4444" />
                      <circle cx="310" cy="240" r="10" fill="none" stroke="#EF4444" strokeWidth="2" className="animate-ping" />

                      {/* User Location */}
                      <circle cx="200" cy="200" r="5" fill="#2563EB" />
                    </svg>

                    <div className="absolute bottom-2 right-2 bg-white/90 border border-slate-200 px-2 py-0.5 rounded text-[8px] font-mono text-[#0f172a] shadow">
                      🎯 Target: {copilotActionResponse?.title || "Concourse"}
                    </div>
                  </div>
                </GlassCard>

              </div>

            </div>

            {/* 14. Dynamic AI Suggestions (rotating live recommendations) */}
            <div className="space-y-2">
              <span className="block text-[10px] uppercase font-bold text-slate-500 font-mono tracking-wider">
                🧠 Rotating Live AI Recommendations
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { text: "Food Court B has only a 2 minute wait time.", action: "Go There", val: "food" },
                  { text: "Gate C is currently the least crowded exit gate.", action: "Navigate", val: "exit" },
                  { text: "Rain expected in 20 minutes. Consider heading to vehicle early.", action: "Navigate", val: "parking" },
                  { text: "Shop B still has official jerseys in stock.", action: "Reserve", val: "merchandise" },
                  { text: "Drinking Water Station 3 is nearby with zero queue.", action: "Navigate", val: "water" }
                ].map((sug, idx) => (
                  <div 
                    key={idx} 
                    className={`bg-white border border-solid border-slate-200 p-4 rounded-2xl text-left space-y-2 flex flex-col justify-between shadow-sm transition-all duration-300 ${
                      liveSugIndex === idx ? "border-blue-600 ring-2 ring-blue-600/10 scale-[1.02]" : "opacity-80"
                    }`}
                  >
                    <p className="text-[10px] text-[#475569] font-medium leading-relaxed">
                      🧠 <span className="font-bold text-[#0f172a]">Arena AI recommendation:</span> {sug.text}
                    </p>
                    <button
                      onClick={() => triggerCopilotAction(sug.val)}
                      className="text-[9px] font-bold text-[#2563EB] hover:text-[#1d4ed8] font-mono text-left cursor-pointer"
                    >
                      {sug.action} ➔
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 15. Voice Assistant Workflow Indicator */}
            {micActive && (
              <GlassCard padding="md" rounded="md" border={true} className={`${cardClass} p-5 space-y-3 border-blue-500 bg-blue-500/5`}>
                <h4 className="text-xs font-mono font-bold text-[#1E293B] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  🎤 Voice Assistant active
                </h4>
                <div className="flex gap-2 justify-between text-[9px] font-mono text-slate-400">
                  <span className={voiceWorkflowStep === "listening" ? "text-blue-600 font-extrabold animate-pulse" : "text-slate-500"}>Listening...</span>
                  <span>→</span>
                  <span className={voiceWorkflowStep === "speech" ? "text-blue-600 font-extrabold animate-pulse" : "text-slate-500"}>Speech Recognition</span>
                  <span>→</span>
                  <span className={voiceWorkflowStep === "intent" ? "text-blue-600 font-extrabold animate-pulse" : "text-slate-500"}>Intent Detection</span>
                  <span>→</span>
                  <span className={voiceWorkflowStep === "planning" ? "text-blue-600 font-extrabold animate-pulse" : "text-slate-500"}>AI Planning</span>
                  <span>→</span>
                  <span className={voiceWorkflowStep === "navigation" ? "text-blue-600 font-extrabold animate-pulse" : "text-slate-500"}>Navigation</span>
                  <span>→</span>
                  <span className={voiceWorkflowStep === "completed" ? "text-emerald-600 font-extrabold" : "text-slate-500"}>Completed</span>
                </div>
              </GlassCard>
            )}

            {/* 11. Rotating placeholder search & Voice mic triggers */}
            <GlassCard padding="md" rounded="md" border={true} className={`${cardClass} p-4 mt-8 space-y-3`}>
              <form onSubmit={handleSendChat} className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setMicActive(true);
                    setVoiceWorkflowStep("listening");
                    addToast("Voice Concierge listening...", "info");
                    
                    setTimeout(() => setVoiceWorkflowStep("speech"), 600);
                    setTimeout(() => setVoiceWorkflowStep("intent"), 1200);
                    setTimeout(() => setVoiceWorkflowStep("planning"), 1800);
                    setTimeout(() => setVoiceWorkflowStep("navigation"), 2400);
                    setTimeout(() => {
                      setVoiceWorkflowStep("completed");
                      setMicActive(false);
                      triggerCopilotAction("restroom");
                      addToast("Voice command 'Where is nearest restroom' executed!", "success");
                    }, 3000);
                  }}
                  className="bg-blue-600/10 hover:bg-blue-600/20 text-[#2563EB] p-3 rounded-xl transition-all cursor-pointer shrink-0"
                  title="Voice Input"
                >
                  🎤
                </button>
                <input
                  type="text"
                  placeholder={[
                    "Ask Arena AI...",
                    "Find nearest restroom...",
                    "Take me to parking...",
                    "Fastest exit...",
                    "Order food...",
                    "Medical help...",
                    "Find my seat...",
                    "Locate water station..."
                  ][placeholderIndex]}
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className={`border rounded-xl p-3 flex-grow text-xs focus:outline-none focus:border-blue-600 ${inputClass}`}
                />
                <Button type="submit" variant="primary" className="text-xs px-5 py-3 rounded-xl font-bold shrink-0 bg-blue-600 text-white">
                  Send
                </Button>
              </form>
            </GlassCard>

            {/* 16. AI Capabilities Section near bottom */}
            <div className="bg-slate-50 border border-solid border-slate-200 rounded-3xl p-6 text-left space-y-4">
              <div className="space-y-1">
                <h4 className="text-xs font-mono uppercase font-bold text-[#1E293B]">
                  Arena AI Capabilities Registry
                </h4>
                <p className="text-[10px] text-[#475569]">
                  Comprehensive registry of available cognitive skills managed by Supervisor Agent routing.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 text-[9px] font-mono font-bold text-slate-500">
                <span className="bg-white border border-solid border-slate-200 px-2 py-1 rounded-md">✓ Navigation Route Planning</span>
                <span className="bg-white border border-solid border-slate-200 px-2 py-1 rounded-md">✓ Food Counter Ordering</span>
                <span className="bg-white border border-solid border-slate-200 px-2 py-1 rounded-md">✓ Merchandise Reservation</span>
                <span className="bg-white border border-solid border-slate-200 px-2 py-1 rounded-md">✓ Parking Memory Assistant</span>
                <span className="bg-white border border-solid border-slate-200 px-2 py-1 rounded-md">✓ First Aid Medical Help</span>
                <span className="bg-white border border-solid border-slate-200 px-2 py-1 rounded-md">✓ Emergency Assistance Alarm</span>
                <span className="bg-white border border-solid border-slate-200 px-2 py-1 rounded-md">✓ Accessibility Elevation Route</span>
                <span className="bg-white border border-solid border-slate-200 px-2 py-1 rounded-md">✓ Lost & Found Registries</span>
                <span className="bg-white border border-solid border-slate-200 px-2 py-1 rounded-md">✓ Crowd Flow Density Control</span>
                <span className="bg-white border border-solid border-slate-200 px-2 py-1 rounded-md">✓ Live Commentary Sync Alerts</span>
              </div>

              <div className="text-[9px] font-mono text-slate-400 flex items-center justify-between border-t border-solid border-slate-200 pt-3">
                <span>STADIUM SYSTEM NODE:</span>
                <span className="font-bold text-[#1E293B]">FIFA Smart Stadium Operating System • ArenaOS AI</span>
              </div>
            </div>

          </div>
        )}

        {/* ==================== PAGE 8: NOTIFICATIONS TIMELINE ==================== */}
        {activePage === "notifications" && (
          <div className="space-y-8 animate-fade-in text-left">
            
            {/* Top Hero Section */}
            <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 opacity-10 pointer-events-none select-none bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-white to-transparent" />
              <div className="absolute top-0 right-0 p-4 opacity-5 text-9xl font-black select-none pointer-events-none">🔔</div>
              
              <div className="relative z-10 space-y-4">
                <div className="space-y-2">
                  <Badge variant="live" className="bg-red-500 text-white border-none font-bold py-1 px-3 rounded-full text-[10px] uppercase tracking-wider">
                    🔔 Live Broadcast Alerts
                  </Badge>
                  <h1 className="text-3xl font-black tracking-tight leading-none text-white">
                    Today&apos;s Alerts
                  </h1>
                  <p className="text-xs text-blue-100 max-w-2xl font-semibold">
                    Dynamic operational safety telemetry, match events, concessions, and AI-predicted egress status feeds.
                  </p>
                </div>

                {/* Summary Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2 text-xs font-mono">
                  <div className="bg-red-500/20 p-3 rounded-2xl border border-solid border-red-500/30">
                    <span className="block text-red-200 text-[8px] uppercase">CRITICAL</span>
                    <span className="font-extrabold text-white text-base">
                      {notifications.filter(n => n.priority === "high" && !n.read).length} Unresolved
                    </span>
                  </div>
                  <div className="bg-amber-500/20 p-3 rounded-2xl border border-solid border-amber-500/30">
                    <span className="block text-amber-200 text-[8px] uppercase">IMPORTANT</span>
                    <span className="font-extrabold text-white text-base">
                      {notifications.filter(n => n.priority === "normal" && !n.read).length} Unresolved
                    </span>
                  </div>
                  <div className="bg-blue-500/20 p-3 rounded-2xl border border-solid border-blue-500/30">
                    <span className="block text-blue-200 text-[8px] uppercase">NORMAL</span>
                    <span className="font-extrabold text-white text-base">
                      {notifications.filter(n => n.priority === "low" && !n.read).length} Unresolved
                    </span>
                  </div>
                  <div className="bg-emerald-500/20 p-3 rounded-2xl border border-solid border-emerald-500/30">
                    <span className="block text-emerald-200 text-[8px] uppercase">RESOLVED</span>
                    <span className="font-extrabold text-white text-base">
                      {notifications.filter(n => n.read).length} Logs
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Smart Filters strip */}
            <div className="space-y-2">
              <span className="block text-[10px] uppercase font-bold text-slate-500 font-mono tracking-wider">
                🔍 Filter Timelines
              </span>
              <div className="flex gap-2 overflow-x-auto pb-1.5 flex-nowrap shrink-0">
                {[
                  { label: "All Logs", val: "all" },
                  { label: "Unread", val: "unread" },
                  { label: "Match", val: "match" },
                  { label: "Parking", val: "parking" },
                  { label: "Navigation", val: "navigation" },
                  { label: "Food", val: "food" },
                  { label: "Emergency", val: "emergency" },
                  { label: "Medical", val: "medical" },
                  { label: "Shopping", val: "shopping" },
                  { label: "Weather", val: "weather" },
                  { label: "Arena AI", val: "arenaai" }
                ].map((f) => (
                  <button
                    key={f.val}
                    onClick={() => {
                      setNotifFilter(f.val);
                      addToast(`Filtering alerts by: ${f.label}`, "info");
                    }}
                    className={`px-4 py-2 rounded-xl text-[10px] font-mono font-bold transition-all shrink-0 cursor-pointer border border-solid ${
                      notifFilter === f.val
                        ? "bg-blue-600 text-white border-blue-600 shadow"
                        : "bg-white hover:bg-slate-50 text-slate-600 border-slate-200 shadow-sm"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Notifications Timeline Checklist */}
            <div className="space-y-4">
              {notifications
                .filter((n) => {
                  if (notifFilter === "all") return true;
                  if (notifFilter === "unread") return !n.read;
                  return n.type === notifFilter;
                })
                .map((n) => {
                  // Determine priority styling
                  let priorityColor = "border-l-blue-500";
                  let badgeColor = "bg-blue-500/10 text-blue-500 border-blue-500/20";
                  if (n.priority === "high") {
                    priorityColor = "border-l-red-500";
                    badgeColor = "bg-red-500/10 text-red-500 border-red-500/20";
                  } else if (n.priority === "normal") {
                    priorityColor = "border-l-amber-500";
                    badgeColor = "bg-amber-500/10 text-amber-500 border-amber-500/20";
                  } else if (n.type === "arenaai") {
                    priorityColor = "border-l-purple-500";
                    badgeColor = "bg-purple-500/10 text-purple-500 border-purple-500/20";
                  }

                  return (
                    <GlassCard
                      key={n.id}
                      padding="md"
                      rounded="md"
                      border={true}
                      className={`${cardClass} p-5 border-l-4 ${priorityColor} ${
                        !n.read ? "bg-blue-500/5 ring-1 ring-blue-500/10" : ""
                      } transition-all duration-300 hover:shadow-md text-left`}
                    >
                      <div className="space-y-4">
                        
                        {/* Priority strip, badge & timestamp */}
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-2">
                            {!n.read && (
                              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" title="Unread Alert" />
                            )}
                            <span className={`text-[8px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full border border-solid ${badgeColor}`}>
                              {n.type}
                            </span>
                            <span className="text-[9px] font-mono text-[#64748B] font-bold">
                              {n.priority.toUpperCase()} PRIORITY
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-[#64748B] font-bold">
                            {n.time}
                          </span>
                        </div>

                        {/* Heading & description body */}
                        <div className="space-y-1">
                          <h3 className={`text-base font-black ${textHeading}`}>
                            {n.title}
                          </h3>
                          <p className={`text-xs leading-relaxed ${textBody}`}>
                            {n.body}
                          </p>
                        </div>

                        {/* AI Explanation details */}
                        {n.explanation && (
                          <div className="bg-slate-500/5 border border-solid border-slate-200/10 p-3 rounded-2xl space-y-1">
                            <span className="block text-[8px] font-mono font-bold text-purple-600 uppercase">
                              🧠 Arena AI Explanation
                            </span>
                            <p className="text-[10px] text-[#475569] leading-relaxed font-medium">
                              {n.explanation}
                            </p>
                          </div>
                        )}

                        {/* Actions block */}
                        <div className="flex items-center justify-between gap-4 border-t border-solid border-slate-200/10 pt-3 flex-wrap">
                          <span className="text-[10px] font-mono text-[#64748B] font-bold">
                            💡 Suggested Action: <span className="text-blue-600 font-extrabold">{n.actionText || "View Alert details"}</span>
                          </span>
                          
                          <div className="flex gap-2">
                            <button
                              onClick={() => addToast(`Triggering alert action: ${n.actionText}`, "success")}
                              className="h-8 rounded-lg px-3.5 text-[10px] font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                            >
                              Navigate
                            </button>
                            <button
                              onClick={() => toggleReadNotification(n.id)}
                              className="h-8 rounded-lg px-3.5 text-[10px] font-bold border border-solid border-slate-200 text-[#475569] hover:bg-slate-500/5 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer bg-white"
                            >
                              {n.read ? "Mark Unread" : "Dismiss"}
                            </button>
                            <button
                              onClick={() => dismissNotification(n.id)}
                              className="h-8 rounded-lg px-3.5 text-[10px] font-bold bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-solid border-red-500/20 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                            >
                              Archive
                            </button>
                          </div>
                        </div>

                      </div>
                    </GlassCard>
                  );
                })}

              {notifications.filter((n) => {
                if (notifFilter === "all") return true;
                if (notifFilter === "unread") return !n.read;
                return n.type === notifFilter;
              }).length === 0 && (
                <GlassCard padding="md" rounded="md" border={true} className={`${cardClass} p-8 text-center`}>
                  <span className="block text-2xl">📭</span>
                  <p className="text-xs text-[#475569] font-bold mt-2">No alerts found matching selected filter.</p>
                </GlassCard>
              )}
            </div>

          </div>
        )}

        {/* ==================== PAGE 9: PROFILE ==================== */}
        {activePage === "profile" && (
          <div className="space-y-8 animate-fade-in text-left">
            
            {/* Top Profile Hero Banner */}
            <div className="bg-gradient-to-r from-[#0F172A] via-[#1E1B4B] to-[#1E293B] rounded-3xl p-8 text-white relative overflow-hidden shadow-md">
              <div className="absolute inset-0 opacity-10 pointer-events-none select-none bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-white to-transparent" />
              <div className="absolute top-0 right-0 p-4 opacity-5 text-9xl font-black select-none pointer-events-none">👤</div>
              
              <div className="relative z-10 space-y-4">
                <div className="space-y-2">
                  <Badge variant="live" className="bg-amber-400 text-slate-900 border-none font-bold py-1 px-3 rounded-full text-[10px] uppercase tracking-wider">
                    👤 Fan Profile Dashboard
                  </Badge>
                  <h1 className="text-3xl font-black tracking-tight leading-none text-white">
                    Welcome back, Surya
                  </h1>
                  <p className="text-xs text-blue-100 max-w-2xl font-semibold">
                    Manage your spectator credentials, loyalty points, past ticket reservations, and connected AI services.
                  </p>
                </div>

                {/* Quick Statistics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-7 gap-3 pt-4 text-[10px] font-mono">
                  {[
                    { label: "ATTENDED", val: "4 Matches" },
                    { label: "LOYALTY POINTS", val: "2,450 pts" },
                    { label: "TOTAL PURCHASES", val: "2 Items" },
                    { label: "FOOD ORDERS", val: "1 Active" },
                    { label: "MERCH RESERVED", val: "1 Jersey" },
                    { label: "AI SESSIONS", val: "6 Routes" },
                    { label: "PARKING SPOT", val: "Spot A27" }
                  ].map((stat, i) => (
                    <div key={i} className="bg-white/5 backdrop-blur-md p-3 rounded-xl border border-solid border-white/10 shadow-sm text-left">
                      <span className="block text-slate-400 text-[8px] uppercase tracking-wider">{stat.label}</span>
                      <span className="font-extrabold text-white block mt-0.5">{stat.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Profile Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: QR ID card, Personal and Ticket Info */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* FIFA QR Fan ID Card */}
                <GlassCard padding="none" rounded="md" border={true} className="bg-white border border-solid border-slate-200 p-6 text-slate-800 space-y-6 shadow-md relative overflow-hidden text-left">
                  <div className="absolute inset-0 opacity-10 pointer-events-none select-none bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-white to-transparent" />
                  
                  {/* Card Header */}
                  <div className="flex justify-between items-center border-b border-solid border-slate-100 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">👤</span>
                      <div>
                        <span className="block text-[8px] font-mono text-slate-400 uppercase tracking-wider">OFFICIAL STADIUM PASS</span>
                        <span className="block text-xs font-black tracking-widest uppercase text-slate-800">FIFA Fan ID Card</span>
                      </div>
                    </div>
                    <span className="text-[8px] bg-blue-50 text-blue-600 border border-solid border-blue-100 font-mono px-2 py-0.5 rounded font-black">
                      GOLD SPEC
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="space-y-3">
                      <div>
                        <span className="block text-[8px] font-mono text-slate-400 uppercase">HOLDER NAME</span>
                        <span className="text-sm font-black text-slate-800">Surya Narayanan</span>
                      </div>
                      <div>
                        <span className="block text-[8px] font-mono text-slate-400 uppercase">MEMBERSHIP ID</span>
                        <span className="text-xs font-mono font-bold text-slate-600">LSL-9842-ARG</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[9px] font-mono">
                        <div>
                          <span className="block text-slate-400 text-[8px]">FAV TEAM</span>
                          <span className="font-bold block truncate text-slate-800">Argentina 🇦🇷</span>
                        </div>
                        <div>
                          <span className="block text-slate-400 text-[8px]">TICKET STATUS</span>
                          <span className="font-bold text-emerald-600">✓ Active</span>
                        </div>
                      </div>
                    </div>

                    {/* QR Code Container */}
                    <div className="bg-white p-2.5 rounded-xl shrink-0 shadow-sm border border-solid border-slate-200">
                      <svg className="w-20 h-20" viewBox="0 0 100 100" fill="none">
                        {/* Mock QR lines */}
                        <rect x="5" y="5" width="25" height="25" stroke="#000" strokeWidth="4" />
                        <rect x="10" y="10" width="15" height="15" fill="#000" />
                        <rect x="70" y="5" width="25" height="25" stroke="#000" strokeWidth="4" />
                        <rect x="75" y="10" width="15" height="15" fill="#000" />
                        <rect x="5" y="70" width="25" height="25" stroke="#000" strokeWidth="4" />
                        <rect x="10" y="75" width="15" height="15" fill="#000" />
                        <path d="M40 10 H60 V20 H40 Z" fill="#000" />
                        <path d="M10 40 H20 V60 H10 Z" fill="#000" />
                        <path d="M45 45 H55 V55 H45 Z" fill="#000" />
                        <path d="M80 40 H90 V60 H80 Z" fill="#000" />
                        <path d="M40 80 H60 V90 H40 Z" fill="#000" />
                        <path d="M75 75 H90 V90 H75 Z" fill="#000" />
                      </svg>
                    </div>
                  </div>

                  {/* Card Footer details */}
                  <div className="border-t border-solid border-slate-100 pt-4 flex justify-between items-center text-[8px] font-mono text-slate-400">
                    <span>MEMBER SINCE: JULY 2026</span>
                    <span>SALT LAKE SMART STADIUM, KOLKATA, INDIA</span>
                  </div>
                </GlassCard>

                {/* Personal Information */}
                <GlassCard padding="md" rounded="md" border={true} className={`${cardClass} p-6 space-y-4`}>
                  <div className="space-y-1">
                    <h3 className="text-xs font-mono uppercase tracking-widest text-[#1E293B] font-bold flex items-center gap-1.5">
                      👤 Personal Details
                    </h3>
                    <p className="text-[10px] text-[#6B7280]">Your verified spectator registration profile data.</p>
                    <div className="h-px bg-slate-100 my-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-[10px] font-mono">
                    <div className="p-3 bg-slate-50 border border-solid border-slate-100 rounded-xl space-y-1">
                      <span className="block text-slate-400 text-[8px] uppercase">EMAIL ADDRESS</span>
                      <span className="font-bold text-[#1F2937] block truncate">surya@fifa.org</span>
                    </div>
                    <div className="p-3 bg-slate-50 border border-solid border-slate-100 rounded-xl space-y-1">
                      <span className="block text-slate-400 text-[8px] uppercase">TELEPHONE</span>
                      <span className="font-bold text-[#1F2937] block">+91 98402 12345</span>
                    </div>
                    <div className="p-3 bg-slate-50 border border-solid border-slate-100 rounded-xl space-y-1">
                      <span className="block text-slate-400 text-[8px] uppercase">PREFERRED LANG</span>
                      <span className="font-bold text-[#1F2937] block">English (US)</span>
                    </div>
                    <div className="p-3 bg-slate-50 border border-solid border-slate-100 rounded-xl space-y-1">
                      <span className="block text-slate-400 text-[8px] uppercase">MEMBERSHIP CLASS</span>
                      <span className="font-bold text-blue-600 block">Gold Spectator</span>
                    </div>
                  </div>
                </GlassCard>

                {/* Ticket Details */}
                <GlassCard padding="md" rounded="md" border={true} className={`${cardClass} p-6 space-y-4`}>
                  <div className="space-y-1">
                    <h3 className="text-xs font-mono uppercase tracking-widest text-[#1E293B] font-bold flex items-center gap-1.5">
                      🎫 Active Ticket Credentials
                    </h3>
                    <p className="text-[10px] text-[#6B7280]">Gate and seat details configured on your Fan ID.</p>
                    <div className="h-px bg-slate-100 my-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-[10px] font-mono">
                    <div className="p-3 bg-slate-50 border border-solid border-slate-100 rounded-xl space-y-1">
                      <span className="block text-slate-400 text-[8px] uppercase">CURRENT MATCH</span>
                      <span className="font-bold text-[#1F2937] block truncate">Argentina vs France</span>
                    </div>
                    <div className="p-3 bg-slate-50 border border-solid border-slate-100 rounded-xl space-y-1">
                      <span className="block text-slate-400 text-[8px] uppercase">INGRESS GATE</span>
                      <span className="font-bold text-blue-600 block">Gate B Turnstile</span>
                    </div>
                    <div className="p-3 bg-slate-50 border border-solid border-slate-100 rounded-xl space-y-1">
                      <span className="block text-slate-400 text-[8px] uppercase">SECTION SEAT</span>
                      <span className="font-bold text-[#1F2937] block">Sec 204, Row G, Seat 12</span>
                    </div>
                    <div className="p-3 bg-slate-50 border border-solid border-slate-100 rounded-xl space-y-1">
                      <span className="block text-slate-400 text-[8px] uppercase">TELEMETRY ACCESS</span>
                      <span className="font-bold text-emerald-600 block">Connected</span>
                    </div>
                  </div>
                </GlassCard>

                {/* Emergency Contacts */}
                <GlassCard padding="md" rounded="md" border={true} className={`${cardClass} p-6 space-y-4`}>
                  <div className="space-y-1">
                    <h3 className="text-xs font-mono uppercase tracking-widest text-[#1E293B] font-bold flex items-center gap-1.5">
                      🚨 Emergency Contacts
                    </h3>
                    <p className="text-[10px] text-[#6B7280]">Urgent medical and safety dispatches coordinates.</p>
                    <div className="h-px bg-slate-100 my-2" />
                  </div>

                  <div className="space-y-2 text-[10px] font-mono text-[#475569]">
                    <div className="flex justify-between p-2.5 rounded-xl bg-red-50/50 border border-solid border-red-100 text-red-600 items-center">
                      <span>Medical Center Clinic A:</span>
                      <span className="font-bold">+974 4404 1111</span>
                    </div>
                    <div className="flex justify-between p-2.5 rounded-xl bg-red-50/50 border border-solid border-red-100 text-red-600 items-center">
                      <span>Safety Marshal Hotline:</span>
                      <span className="font-bold">+974 4404 2222</span>
                    </div>
                  </div>
                </GlassCard>

              </div>

              {/* Right Column: Loyalty, Achievements, Purchases, and timeline */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Loyalty Progress Ring widget */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  <GlassCard padding="md" rounded="md" border={true} className={`${cardClass} p-5 flex items-center justify-between`}>
                    <div className="space-y-1">
                      <Badge variant="live" className="bg-emerald-500 text-slate-900 border-none font-bold">🎁 LOYALTY CLUB</Badge>
                      <h3 className={`text-sm font-black ${textHeading}`}>2,450 points</h3>
                      <p className={`text-[10px] ${textDesc}`}>Get Concessions Vouchers Near Seat 12.</p>
                    </div>
                    
                    {/* SVG Progress Ring */}
                    <div className="relative w-16 h-16 shrink-0">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <path className="text-slate-300" strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path className="text-emerald-500" strokeDasharray="65, 100" strokeWidth="3.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold font-mono text-emerald-600">
                        65%
                      </div>
                    </div>
                  </GlassCard>

                  {/* Arena AI Usage */}
                  <GlassCard padding="md" rounded="md" border={true} className={`${cardClass} p-5 space-y-2`}>
                    <span className="block text-[8px] font-mono font-bold text-purple-600 uppercase">🧠 ARENA AI METRICS</span>
                    <h3 className={`text-xs font-black ${textHeading}`}>Connected Smart Assistant</h3>
                    <p className={`text-[10px] leading-relaxed ${textBody}`}>
                      6 navigation routes optimized, 2 food queue bypasses, 1 parking spot saved to memory.
                    </p>
                  </GlassCard>

                </div>

                {/* Achievements List */}
                <GlassCard padding="md" rounded="md" border={true} className={`${cardClass} p-6 space-y-4`}>
                  <div className="space-y-1">
                    <h3 className="text-xs font-mono uppercase tracking-widest text-[#1E293B] font-bold flex items-center gap-1.5">
                      🏆 Fan Achievements
                    </h3>
                    <p className="text-[10px] text-[#6B7280]">Milestones unlocked during your smart stadium visit.</p>
                    <div className="h-px bg-slate-100 my-2" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px] font-mono">
                    <div className="p-3 bg-slate-50 border border-solid border-slate-100 rounded-xl flex items-center justify-between gap-2">
                      <div className="space-y-0.5">
                        <span className="font-bold text-[#1F2937] block">Early Entry</span>
                        <span className="text-[#6B7280] text-[8px] block">Arrived 2 hours early</span>
                      </div>
                      <span className="text-[8px] bg-emerald-50 text-emerald-600 border border-solid border-emerald-100 font-bold px-2 py-0.5 rounded-full uppercase shrink-0">Completed</span>
                    </div>
                    <div className="p-3 bg-slate-50 border border-solid border-slate-100 rounded-xl flex items-center justify-between gap-2">
                      <div className="space-y-0.5">
                        <span className="font-bold text-[#1F2937] block">Stadium Navigator</span>
                        <span className="text-[#6B7280] text-[8px] block">Completed step-free route</span>
                      </div>
                      <span className="text-[8px] bg-blue-50 text-blue-600 border border-solid border-blue-100 font-bold px-2 py-0.5 rounded-full uppercase shrink-0">Level 2</span>
                    </div>
                    <div className="p-3 bg-slate-50 border border-solid border-slate-100 rounded-xl flex items-center justify-between gap-2">
                      <div className="space-y-0.5">
                        <span className="font-bold text-[#1F2937] block">Explorer</span>
                        <span className="text-[#6B7280] text-[8px] block">Navigated 4 zones</span>
                      </div>
                      <span className="text-[8px] bg-amber-50 text-amber-600 border border-solid border-amber-100 font-bold px-2 py-0.5 rounded-full uppercase shrink-0">Gold Badge</span>
                    </div>
                    <div className="p-3 bg-slate-50 border border-solid border-slate-100 rounded-xl flex items-center justify-between gap-2">
                      <div className="space-y-0.5">
                        <span className="font-bold text-[#1F2937] block">Jersey Collector</span>
                        <span className="text-[#6B7280] text-[8px] block">Finals Jersey reservation</span>
                      </div>
                      <span className="text-[8px] bg-purple-50 text-purple-600 border border-solid border-purple-100 font-bold px-2 py-0.5 rounded-full uppercase shrink-0">Level 1</span>
                    </div>
                  </div>
                </GlassCard>

                {/* Purchase History */}
                <GlassCard padding="md" rounded="md" border={true} className={`${cardClass} p-6 space-y-4`}>
                  <div className="space-y-1">
                    <h3 className="text-xs font-mono uppercase tracking-widest text-[#1E293B] font-bold flex items-center gap-1.5">
                      🛍️ Concession Purchase History
                    </h3>
                    <p className="text-[10px] text-[#6B7280]">Official receipts and item verification tokens.</p>
                    <div className="h-px bg-slate-100 my-2" />
                  </div>

                  <div className="space-y-2.5 text-[10px] font-mono">
                    {[
                      { icon: "🍔", merchant: "Stall B12 Burgers", item: "Burger & Popcorn Combo", time: "14:12", amount: "₹380.00", status: "Paid" },
                      { icon: "🛍️", merchant: "FIFA Fan Shop B", item: "Argentina Finals Jersey", time: "14:03", amount: "₹4,499.00", status: "Reserved" }
                    ].map((tx, idx) => (
                      <div key={idx} className="flex justify-between p-3 rounded-xl bg-slate-50 border border-solid border-slate-100 items-center hover:bg-slate-100/50 transition-all">
                        <div className="flex items-center gap-3">
                          <span className="text-lg w-8 h-8 rounded-lg bg-slate-200/50 flex items-center justify-center">{tx.icon}</span>
                          <div className="space-y-0.5">
                            <span className="font-bold text-[#1F2937] block">{tx.item}</span>
                            <span className="text-slate-400 text-[8px] block">{tx.merchant} • {tx.time}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <span className="font-extrabold text-[#1F2937] block">{tx.amount}</span>
                            <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${
                              tx.status === "Paid" ? "bg-emerald-50 text-emerald-600 border border-solid border-emerald-100" : "bg-blue-50 text-blue-600 border border-solid border-blue-100"
                            }`}>{tx.status}</span>
                          </div>
                          <button
                            onClick={() => addToast(`Opening receipt for ${tx.merchant}...`, "success")}
                            className="text-[9px] font-bold text-blue-600 hover:underline border border-solid border-slate-200 bg-white hover:bg-slate-50 px-2 py-1 rounded-lg cursor-pointer shrink-0"
                          >
                            Receipt
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>

                {/* Recent Activity Timeline */}
                <GlassCard padding="md" rounded="md" border={true} className={`${cardClass} p-6 space-y-4`}>
                  <div className="space-y-1">
                    <h3 className="text-xs font-mono uppercase tracking-widest text-[#1E293B] font-bold flex items-center gap-1.5">
                      📈 Spectator Ingress Timeline
                    </h3>
                    <p className="text-[10px] text-[#6B7280]">Real-time logs from biometric turnstiles and gates.</p>
                    <div className="h-px bg-slate-100 my-2" />
                  </div>
                  
                  <div className="space-y-4 relative pl-5 border-l-2 border-solid border-slate-100 font-mono text-[10px] ml-2">
                    {[
                      { title: "Ingress Turnstile Scan", desc: "Gate B biometric turnstiles check-in success.", time: "14:02", icon: "🚪" },
                      { title: "Parking Slot Saved", desc: "Zone North A, Spot A27 committed to memory registry.", time: "14:10", icon: "🚗" },
                      { title: "Concession order confirmed", desc: "Burger combo payment completed via Smart Pay.", time: "14:12", icon: "🍔" }
                    ].map((step, idx) => (
                      <div key={idx} className="space-y-1 relative group hover:pl-1 transition-all">
                        <span className="absolute -left-[27px] top-0.5 w-3.5 h-3.5 rounded-full bg-white border-2 border-solid border-emerald-500 flex items-center justify-center text-[8px] group-hover:scale-110 transition-transform">
                          {step.icon}
                        </span>
                        <div className="flex justify-between font-bold text-emerald-600">
                          <span>{step.title}</span>
                          <span className="text-[#94A3B8] font-normal">{step.time}</span>
                        </div>
                        <p className="text-[9px] text-[#6B7280] leading-snug">{step.desc}</p>
                      </div>
                    ))}
                  </div>
                </GlassCard>

              </div>

            </div>

          </div>
        )}

        {/* ==================== PAGE 10: SETTINGS ==================== */}
        {activePage === "settings" && (
          <div className="space-y-8 animate-fade-in text-left">
            
            {/* Top Settings Hero Banner */}
            <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 opacity-10 pointer-events-none select-none bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-white to-transparent" />
              <div className="absolute top-0 right-0 p-4 opacity-5 text-9xl font-black select-none pointer-events-none">⚙</div>
              
              <div className="relative z-10 space-y-4">
                <div className="space-y-2">
                  <Badge variant="live" className="bg-blue-400 text-slate-900 border-none font-bold py-1 px-3 rounded-full text-[10px] uppercase tracking-wider">
                    ⚙ Preferences & Settings
                  </Badge>
                  <h1 className="text-3xl font-black tracking-tight leading-none text-white">
                    Preferences & Settings
                  </h1>
                  <p className="text-xs text-blue-100 max-w-2xl font-semibold">
                    Manage your ArenaOS AI experience, accessibility preferences, notifications and personalized stadium services.
                  </p>
                </div>

                {/* Quick Statistics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-6 gap-3 pt-2 text-[10px] font-mono">
                  <div className="bg-slate-500/20 p-2.5 rounded-xl border border-solid border-white/10">
                    <span className="block text-blue-200 text-[8px] uppercase">LANGUAGE</span>
                    <span className="font-extrabold text-white">
                      {language === "en" ? "English" : language === "hi" ? "Hindi" : language === "te" ? "Telugu" : "Arabic"}
                    </span>
                  </div>
                  <div className="bg-slate-500/20 p-2.5 rounded-xl border border-solid border-white/10">
                    <span className="block text-blue-200 text-[8px] uppercase">THEME</span>
                    <span className="font-extrabold text-white uppercase">{theme} Mode</span>
                  </div>
                  <div className="bg-slate-500/20 p-2.5 rounded-xl border border-solid border-white/10">
                    <span className="block text-blue-200 text-[8px] uppercase">NOTIFICATIONS</span>
                    <span className="font-extrabold text-white">
                      {Object.values(settingsNotifs).filter(Boolean).length} / 8 Active
                    </span>
                  </div>
                  <div className="bg-slate-500/20 p-2.5 rounded-xl border border-solid border-white/10">
                    <span className="block text-blue-200 text-[8px] uppercase">ARENA AI STATUS</span>
                    <span className="font-extrabold text-emerald-400">
                      {settingsAi.enableCopilot ? "Active" : "Disabled"}
                    </span>
                  </div>
                  <div className="bg-slate-500/20 p-2.5 rounded-xl border border-solid border-white/10">
                    <span className="block text-blue-200 text-[8px] uppercase">ACCESSIBILITY</span>
                    <span className="font-extrabold text-white">
                      {Object.values(settingsAccess).filter(Boolean).length} Active
                    </span>
                  </div>
                  <div className="bg-slate-500/20 p-2.5 rounded-xl border border-solid border-white/10">
                    <span className="block text-blue-200 text-[8px] uppercase">SAVED PARKING</span>
                    <span className="font-extrabold text-white">Spot A27</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Grid layout of 8 settings categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Category 1: Language */}
              <GlassCard padding="md" rounded="md" border={true} className={`${cardClass} p-5 flex flex-col justify-between h-full space-y-4`}>
                <div className="space-y-3">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-[#1E293B] font-bold flex items-center gap-1.5">
                    🌐 1. System Language
                  </h3>
                  <p className="text-[10px] text-[#64748B] leading-relaxed">
                    Choose your preferred interaction language. This translates all layouts and voice recognition nodes instantly.
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: "English (US)", val: "en" },
                      { label: "Hindi (हिन्दी)", val: "hi" },
                      { label: "Telugu (తెలుగు)", val: "te" },
                      { label: "Arabic (العربية)", val: "ar" }
                    ].map((lang) => (
                      <button
                        key={lang.val}
                        onClick={() => {
                          setLanguage(lang.val as Language);
                          addToast(`Language updated: ${lang.label}`, "success");
                        }}
                        className={`h-9 rounded-xl px-3 text-[10px] font-bold font-mono transition-all duration-200 border border-solid cursor-pointer ${
                          language === lang.val
                            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-600"
                            : "bg-white hover:bg-slate-50 text-[#475569] border-slate-200"
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </div>
              </GlassCard>

              {/* Category 2: Notifications */}
              <GlassCard padding="md" rounded="md" border={true} className={`${cardClass} p-5 flex flex-col justify-between h-full space-y-4`}>
                <div className="space-y-3">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-[#1E293B] font-bold flex items-center gap-1.5">
                    🔔 2. Notification Dispatches
                  </h3>
                  <p className="text-[10px] text-[#64748B] leading-relaxed">
                    Configure real-time push alerts and live event commentary broadcast updates.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] font-mono">
                    {[
                      { label: "Match Events commentary", key: "matchEvents" },
                      { label: "Goal Alerts instantly", key: "goalAlerts" },
                      { label: "Food Ready notifications", key: "foodReady" },
                      { label: "Parking Return Reminders", key: "parkingReminder" },
                      { label: "Emergency Stadium Alerts", key: "emergencyAlerts" },
                      { label: "AI Recommendations", key: "aiRecommendations" },
                      { label: "Weather Alerts (Salt Lake Stadium)", key: "weatherAlerts" },
                      { label: "Exclusive Shopping Offers", key: "shoppingOffers" }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-2 rounded-xl bg-slate-500/5 border border-solid border-slate-200/5 min-h-[38px]">
                        <span className="text-[#475569] leading-snug">{item.label}</span>
                        <label className="relative inline-flex items-center cursor-pointer shrink-0">
                          <input
                            type="checkbox"
                            checked={settingsNotifs[item.key as keyof typeof settingsNotifs]}
                            onChange={(e) => {
                              setSettingsNotifs((prev) => ({ ...prev, [item.key]: e.target.checked }));
                              addToast(`Notification updated: ${item.label}`, "info");
                            }}
                            className="sr-only peer"
                          />
                          <div className="w-8 h-4 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>

              {/* Category 3: Accessibility */}
              <GlassCard padding="md" rounded="md" border={true} className={`${cardClass} p-5 flex flex-col justify-between h-full space-y-4`}>
                <div className="space-y-3">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-[#1E293B] font-bold flex items-center gap-1.5">
                    ♿ 3. Accessibility Options
                  </h3>
                  <p className="text-[10px] text-[#64748B] leading-relaxed">
                    Customize text scaling, visual contrast levels, and step-free layout settings.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] font-mono">
                    {[
                      { label: "Large Text Scaling", key: "largeText" },
                      { label: "Reduced Motion Graphics", key: "reducedMotion" },
                      { label: "High Contrast Mode", key: "highContrast" },
                      { label: "Voice Assistant Guidance", key: "voiceGuidance" },
                      { label: "Step-Free ADA Routes", key: "wheelchairNav" },
                      { label: "Color Blind Friendly", key: "colorBlind" }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-2 rounded-xl bg-slate-500/5 border border-solid border-slate-200/5 min-h-[38px]">
                        <span className="text-[#475569] leading-snug">{item.label}</span>
                        <label className="relative inline-flex items-center cursor-pointer shrink-0">
                          <input
                            type="checkbox"
                            checked={settingsAccess[item.key as keyof typeof settingsAccess]}
                            onChange={(e) => {
                              setSettingsAccess((prev) => ({ ...prev, [item.key]: e.target.checked }));
                              addToast(`Accessibility updated: ${item.label}`, "info");
                            }}
                            className="sr-only peer"
                          />
                          <div className="w-8 h-4 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>

              {/* Category 4: Arena AI Preferences */}
              <GlassCard padding="md" rounded="md" border={true} className={`${cardClass} p-5 flex flex-col justify-between h-full space-y-4`}>
                <div className="space-y-3">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-[#1E293B] font-bold flex items-center gap-1.5">
                    🧠 4. Arena AI Preferences
                  </h3>
                  <p className="text-[10px] text-[#64748B] leading-relaxed">
                    Enable predictive models and automated seat detection algorithms.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] font-mono">
                    {[
                      { label: "Arena Copilot Panel", key: "enableCopilot" },
                      { label: "Voice Assistant listening", key: "voiceAssistant" },
                      { label: "Smart Suggestions ticker", key: "smartSuggestions" },
                      { label: "Predictive Egress routing", key: "predictiveNav" },
                      { label: "Food Recommendations", key: "personalRecs" },
                      { label: "Auto Detect Seat", key: "autoSeat" },
                      { label: "Auto Detect Parking", key: "autoParking" },
                      { label: "Auto Resume Nav state", key: "autoResume" }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-2 rounded-xl bg-slate-500/5 border border-solid border-slate-200/5 min-h-[38px]">
                        <span className="text-[#475569] leading-snug">{item.label}</span>
                        <label className="relative inline-flex items-center cursor-pointer shrink-0">
                          <input
                            type="checkbox"
                            checked={settingsAi[item.key as keyof typeof settingsAi]}
                            onChange={(e) => {
                              setSettingsAi((prev) => ({ ...prev, [item.key]: e.target.checked }));
                              addToast(`AI updated: ${item.label}`, "info");
                            }}
                            className="sr-only peer"
                          />
                          <div className="w-8 h-4 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>

              {/* Category 5: Navigation Preferences */}
              <GlassCard padding="md" rounded="md" border={true} className={`${cardClass} p-5 flex flex-col justify-between h-full space-y-4`}>
                <div className="space-y-3">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-[#1E293B] font-bold flex items-center gap-1.5">
                    🧭 5. Navigation Preferences
                  </h3>
                  <p className="text-[10px] text-[#64748B] leading-relaxed">
                    Tailor twin pathfinding outputs to prefer elevators, speed, or less crowd.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] font-mono">
                    {[
                      { label: "Prefer Fastest Route first", key: "fastestRoute" },
                      { label: "Avoid Crowded corridors", key: "lessCrowded" },
                      { label: "ADA Step-free routes", key: "accessibleRoute" },
                      { label: "Indoor concourse pathing", key: "indoorNav" },
                      { label: "Avoid stairs globally", key: "avoidStairs" },
                      { label: "Auto Reroute on delays", key: "autoReroute" }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-2 rounded-xl bg-slate-500/5 border border-solid border-slate-200/5 min-h-[38px]">
                        <span className="text-[#475569] leading-snug">{item.label}</span>
                        <label className="relative inline-flex items-center cursor-pointer shrink-0">
                          <input
                            type="checkbox"
                            checked={settingsNavPref[item.key as keyof typeof settingsNavPref]}
                            onChange={(e) => {
                              setSettingsNavPref((prev) => ({ ...prev, [item.key]: e.target.checked }));
                              addToast(`Navigation updated: ${item.label}`, "info");
                            }}
                            className="sr-only peer"
                          />
                          <div className="w-8 h-4 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>

              {/* Category 6: Privacy */}
              <GlassCard padding="md" rounded="md" border={true} className={`${cardClass} p-5 flex flex-col justify-between h-full space-y-4`}>
                <div className="space-y-3">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-[#1E293B] font-bold flex items-center gap-1.5">
                    🔒 6. Privacy & Security
                  </h3>
                  <p className="text-[10px] text-[#64748B] leading-relaxed">
                    Manage persistent data storage settings and profile history records.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] font-mono">
                    {[
                      { label: "Save Parking History logs", key: "saveParkingHistory" },
                      { label: "Remember Concession Food", key: "rememberFood" },
                      { label: "Remember Seat ticket #", key: "rememberSeat" },
                      { label: "Remember Payment profiles", key: "rememberShopping" },
                      { label: "AI personalization model", key: "aiPersonalization" },
                      { label: "Stadium Analytics data", key: "analytics" }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-2 rounded-xl bg-slate-500/5 border border-solid border-slate-200/5 min-h-[38px]">
                        <span className="text-[#475569] leading-snug">{item.label}</span>
                        <label className="relative inline-flex items-center cursor-pointer shrink-0">
                          <input
                            type="checkbox"
                            checked={settingsPriv[item.key as keyof typeof settingsPriv]}
                            onChange={(e) => {
                              setSettingsPriv((prev) => ({ ...prev, [item.key]: e.target.checked }));
                              addToast(`Privacy updated: ${item.label}`, "info");
                            }}
                            className="sr-only peer"
                          />
                          <div className="w-8 h-4 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>

              {/* Category 7: Appearance */}
              <GlassCard padding="md" rounded="md" border={true} className={`${cardClass} p-5 flex flex-col justify-between h-full space-y-4`}>
                <div className="space-y-3">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-[#1E293B] font-bold flex items-center gap-1.5">
                    🎨 7. Appearance Customization
                  </h3>
                  <p className="text-[10px] text-[#64748B] leading-relaxed">
                    Choose visual layout modes. Accent swatches show color options.
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: "☀️ Light Mode", val: "light" },
                      { label: "🌙 Dark Mode", val: "dark" },
                    ].map((m) => (
                      <button
                        key={m.val}
                        onClick={() => {
                          setTheme(m.val as "light" | "dark");
                          addToast(`Visual Theme set to: ${m.label}`, "success");
                        }}
                        className={`h-9 rounded-xl px-2 text-[10px] font-bold transition-all duration-200 border border-solid cursor-pointer ${
                          theme === m.val
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white hover:bg-slate-50 text-[#475569] border-slate-200"
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>

                  {/* Accent Color Preview */}
                  <div className="space-y-1">
                    <span className="block text-[8px] font-mono text-slate-400 uppercase">Accent Color Swatches</span>
                    <div className="flex gap-2">
                      <span className="w-5 h-5 rounded-full bg-blue-600 border border-solid border-white/20 cursor-pointer shadow-sm" title="Blue (Selected)" />
                      <span className="w-5 h-5 rounded-full bg-purple-600 border border-solid border-white/20 cursor-pointer shadow-sm" title="Purple" />
                      <span className="w-5 h-5 rounded-full bg-rose-600 border border-solid border-white/20 cursor-pointer shadow-sm" title="Rose" />
                      <span className="w-5 h-5 rounded-full bg-emerald-600 border border-solid border-white/20 cursor-pointer shadow-sm" title="Emerald" />
                    </div>
                  </div>
                </div>

                {/* Reduced Motion Preview */}
                <div className="bg-slate-50 border border-solid border-slate-200 p-2.5 rounded-xl text-[9px] font-mono overflow-hidden mt-2">
                  <span className="block text-slate-400 uppercase text-[8px]">Motion Preview Ticker</span>
                  <div className="text-[#475569] font-bold mt-0.5 animate-pulse">
                    ArenaOS AI Stadium Telemetry Active. Zero queues detected.
                  </div>
                </div>
              </GlassCard>

              {/* Category 8: Account */}
              <GlassCard padding="md" rounded="md" border={true} className={`${cardClass} p-5 flex flex-col justify-between h-full space-y-4`}>
                <div className="space-y-3">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-[#1E293B] font-bold flex items-center gap-1.5">
                    👤 8. Spectator Account
                  </h3>
                  <p className="text-[10px] text-[#64748B] leading-relaxed">
                    Manage ticket integrations, concession order history, and support logs.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] font-mono">
                    <div className="flex justify-between p-2 rounded-xl bg-slate-50 border border-solid border-slate-200">
                      <span className="text-slate-400">🎫 TICKET:</span>
                      <span className="font-bold text-[#1E293B] truncate">Sec 204 Seat 12</span>
                    </div>
                    <div className="flex justify-between p-2 rounded-xl bg-slate-50 border border-solid border-slate-200">
                      <span className="text-slate-400">🚗 PARKING:</span>
                      <span className="font-bold text-[#1E293B] truncate">Spot A27</span>
                    </div>
                    <div className="flex justify-between p-2 rounded-xl bg-slate-50 border border-solid border-slate-200">
                      <span className="text-slate-400">🍔 FOOD:</span>
                      <span className="font-bold text-[#1E293B] truncate">Burger Combo</span>
                    </div>
                    <div className="flex justify-between p-2 rounded-xl bg-slate-50 border border-solid border-slate-200">
                      <span className="text-slate-400">🛍️ MERCH:</span>
                      <span className="font-bold text-[#1E293B] truncate">ARG Jersey</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    onClick={() => addToast("Connecting with Salt Lake Help Desk...", "info")}
                    className="h-9 rounded-xl px-2.5 text-[10px] font-bold border border-solid border-slate-200 text-[#475569] hover:bg-slate-500/5 transition-all cursor-pointer bg-white"
                  >
                    🛠️ Help Center
                  </button>
                  <button
                    onClick={() => addToast("Please enter ticket barcode to report...", "info")}
                    className="h-9 rounded-xl px-2.5 text-[10px] font-bold border border-solid border-slate-200 text-[#475569] hover:bg-slate-500/5 transition-all cursor-pointer bg-white"
                  >
                    ⚠️ Report Issue
                  </button>
                  <button
                    onClick={() => addToast("Support chat session active in Copilot.", "success")}
                    className="h-9 rounded-xl px-2.5 text-[10px] font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow transition-all cursor-pointer"
                  >
                    💡 Arena Support
                  </button>
                  <button
                    onClick={() => {
                      addToast("Logging out of FIFA Smart Stadium ID...", "info");
                      window.location.reload();
                    }}
                    className="h-9 rounded-xl px-2.5 text-[10px] font-bold bg-red-600 text-white hover:bg-red-700 transition-all cursor-pointer"
                  >
                    🚪 Logout
                  </button>
                </div>
              </GlassCard>

            </div>

          </div>
        )}

      </main>

      {/* ==================== 11. DETAILED PRODUCT MODAL: FOOD ==================== */}
      {selectedFood && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white text-slate-800 w-full max-w-4xl p-8 space-y-6 relative animate-fade-in my-8 text-left rounded-3xl shadow-2xl border border-solid border-slate-200">
            
            <button 
              onClick={() => setSelectedFood(null)} 
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 w-8 h-8 rounded-full flex items-center justify-center transition-all font-bold"
              aria-label="Close modal"
            >
              ✕
            </button>

            {/* Modal Title & Price Header */}
            <div className="border-b border-solid border-slate-100 pb-4 flex justify-between items-start flex-wrap gap-4">
              <div className="space-y-1.5">
                <Badge variant="live" className="bg-emerald-600 text-white border-none font-bold py-1 px-3 rounded-full text-[9px] uppercase tracking-wider">
                  {selectedFood.isVeg ? "🌱 VEGETARIAN" : "🍗 NON-VEGETARIAN"}
                </Badge>
                <h2 className="text-[#0F172A] font-bold text-3xl leading-tight">
                  {selectedFood.name}
                </h2>
                <p className="text-[#64748B] font-medium text-xs font-mono">
                  Concession: {selectedFood.stall} • Preparation: {selectedFood.prepTime} • Distance: {selectedFood.distance}
                </p>
              </div>
              <div className="text-right">
                <span className="block text-[10px] font-mono text-[#64748B] uppercase font-bold">Price</span>
                <span className="text-[#0F172A] font-extrabold text-3xl">₹{selectedFood.price}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Product Info & Telemetry */}
              <div className="lg:col-span-6 space-y-5">
                
                {/* Description */}
                <div className="space-y-1.5">
                  <span className="block text-[#2563EB] font-bold text-xs uppercase tracking-wider font-mono">Product Description</span>
                  <p className="text-[#334155] font-medium text-sm leading-relaxed">
                    {selectedFood.desc}
                  </p>
                </div>

                {/* Stock Alert Panel */}
                <div className="bg-[#FEF2F2] border border-solid border-[#FCA5A5] p-4 rounded-2xl text-left space-y-1.5 shadow-sm">
                  <h4 className="text-[#DC2626] font-bold text-sm flex items-center gap-1.5">
                    <span>📦</span> Arena AI Stock Prediction
                  </h4>
                  <p className="text-[#7F1D1D] text-xs leading-relaxed font-medium">
                    Only <span className="font-extrabold">45 servings</span> remaining for this match window. Expected sell out in <span className="font-extrabold">18 minutes</span>. Recommendation: <span className="underline font-bold">Reserve Now</span>.
                  </p>
                </div>

                {/* Arena AI Live Telemetry Panel */}
                <div className="bg-emerald-500/5 border border-solid border-emerald-500/20 p-4 rounded-2xl space-y-3 shadow-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      🤖 Arena AI Live Status
                    </span>
                    <span className="text-[8px] font-mono text-slate-400 font-bold">UPDATES IN REAL-TIME</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="bg-white p-2.5 rounded-xl border border-solid border-slate-100">
                      <span className="block text-[#64748B] text-[9px] font-mono uppercase font-bold">Queue Time</span>
                      <span className="text-[#0F172A] font-extrabold text-sm block mt-0.5">3 mins</span>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-solid border-slate-100">
                      <span className="block text-[#64748B] text-[9px] font-mono uppercase font-bold">Crowd Level</span>
                      <span className="text-[#0F172A] font-extrabold text-sm block mt-0.5">Low</span>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-solid border-slate-100">
                      <span className="block text-[#64748B] text-[9px] font-mono uppercase font-bold">Store Status</span>
                      <span className="text-emerald-600 font-extrabold text-sm block mt-0.5">Open</span>
                    </div>
                  </div>
                </div>

                {/* Feature List */}
                <div className="space-y-2 pt-2 border-t border-solid border-slate-100">
                  <span className="block text-[#1E293B] font-semibold text-xs uppercase tracking-wider font-mono">Concession Trust Badges</span>
                  <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-[#475569]">
                    <div className="flex items-center gap-1">✓ Official FIFA Licensed</div>
                    <div className="flex items-center gap-1">✓ RFID Authenticity</div>
                    <div className="flex items-center gap-1">✓ Ground Floor Pickup</div>
                    <div className="flex items-center gap-1">✓ QR Pickup Available</div>
                  </div>
                </div>

              </div>

              {/* Right Column: Interactive Purchase Options */}
              <div className="lg:col-span-6 space-y-4">
                <span className="block text-[#1E293B] font-semibold text-xs uppercase tracking-wider font-mono">Select Purchase Path:</span>

                {/* Option 1: Smart Order */}
                <div 
                  onClick={() => setSelectedFoodOption("smart")}
                  className={`border border-solid p-4 rounded-2xl transition-all duration-200 relative ${
                    selectedFoodOption === "smart" 
                      ? "bg-gradient-to-br from-blue-50/50 to-indigo-50/50 border-2 border-[#2563EB] shadow-[0_12px_30px_rgba(37,99,235,0.18)]" 
                      : "bg-[#F8FAFC] border-slate-200 hover:bg-[#F1F5F9] cursor-pointer"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-[#0F172A] flex items-center gap-1">
                      ⚡ Smart Order (Pay Online)
                    </span>
                    <span className="bg-blue-600 text-white font-mono text-[8px] px-2 py-0.5 rounded-full font-extrabold uppercase tracking-wide">
                      ⭐ Fastest
                    </span>
                  </div>
                  <p className="text-[#475569] font-normal text-xs leading-normal mt-1.5">
                    Pay securely now. Arena AI instantly sends order to kitchen. QR Pickup Pass generated to bypass payment queues.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-2 text-[9px] font-mono font-bold text-[#64748B] pt-2 border-t border-solid border-slate-200/10 mt-2">
                    <div>ETA: 3 mins</div>
                    <div>Payment: Online Pay</div>
                  </div>
                </div>

                {/* Option 2: Reserve & Pay */}
                <div 
                  onClick={() => setSelectedFoodOption("reserve")}
                  className={`border border-solid p-4 rounded-2xl transition-all duration-200 relative ${
                    selectedFoodOption === "reserve" 
                      ? "bg-gradient-to-br from-blue-50/50 to-indigo-50/50 border-2 border-[#2563EB] shadow-[0_12px_30px_rgba(37,99,235,0.18)]" 
                      : "bg-[#F8FAFC] border-slate-200 hover:bg-[#F1F5F9] cursor-pointer"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-[#0F172A] flex items-center gap-1">
                      📦 Reserve & Pay at Counter
                    </span>
                    <span className="bg-slate-200 text-slate-800 font-mono text-[8px] px-2 py-0.5 rounded-full font-extrabold uppercase tracking-wide">
                      Popular
                    </span>
                  </div>
                  <p className="text-[#475569] font-normal text-xs leading-normal mt-1.5">
                    Lock item stock now. Reservation stays active for 30 minutes. Pay with Cash, Card, or UPI directly at counter B12.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-2 text-[9px] font-mono font-bold text-[#64748B] pt-2 border-t border-solid border-slate-200/10 mt-2">
                    <div>ETA: 5 mins</div>
                    <div>Payment: Store Pay</div>
                  </div>
                </div>

                {/* Option 3: Walk-in */}
                <div 
                  onClick={() => setSelectedFoodOption("walkin")}
                  className={`border border-solid p-4 rounded-2xl transition-all duration-200 relative ${
                    selectedFoodOption === "walkin" 
                      ? "bg-gradient-to-br from-blue-50/50 to-indigo-50/50 border-2 border-[#2563EB] shadow-[0_12px_30px_rgba(37,99,235,0.18)]" 
                      : "bg-[#F8FAFC] border-slate-200 hover:bg-[#F1F5F9] cursor-pointer"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-[#0F172A] flex items-center gap-1">
                      🚶 Buy Directly (Walk-in)
                    </span>
                  </div>
                  <p className="text-[#475569] font-normal text-xs leading-normal mt-1.5">
                    Navigate directly to official stadium store. Purchase normally subject to live queues.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-2 text-[9px] font-mono font-bold text-[#64748B] pt-2 border-t border-solid border-slate-200/10 mt-2">
                    <div>ETA: subject to queue</div>
                    <div>Payment: Any Method</div>
                  </div>
                </div>

                {/* Checkout Trigger Actions */}
                <div className="pt-2">
                  {selectedFoodOption === "smart" && (
                    <button 
                      onClick={() => handleFoodCheckout(selectedFood, "smart")}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold shadow-md hover:shadow-lg transition-all rounded-xl py-3.5 px-6 text-center w-full text-sm block cursor-pointer"
                    >
                      ⚡ Order with Smart Pay (₹{selectedFood.price})
                    </button>
                  )}
                  {selectedFoodOption === "reserve" && (
                    <button 
                      onClick={() => handleFoodCheckout(selectedFood, "reserve")}
                      className="bg-white border border-solid border-blue-600 text-slate-800 hover:bg-blue-50 font-bold transition-all rounded-xl py-3.5 px-6 text-center w-full text-sm block cursor-pointer"
                    >
                      📦 Reserve for 30 Mins (Pay at counter B12)
                    </button>
                  )}
                  {selectedFoodOption === "walkin" && (
                    <button 
                      onClick={() => {
                        handleNavigateToStall(selectedFood.stall);
                        setSelectedFood(null);
                      }}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold shadow-md hover:shadow-lg transition-all rounded-xl py-3.5 px-6 text-center w-full text-sm block cursor-pointer"
                    >
                      🗺 Open Route Map navigation
                    </button>
                  )}
                </div>

              </div>

            </div>

            {/* Related products recommendation cards */}
            <div className="pt-6 border-t border-solid border-slate-200/30 space-y-3">
              <span className="block text-[#1E293B] font-semibold text-xs uppercase tracking-wider font-mono">Fans Also Ordered:</span>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-[#F8FAFC] border border-solid border-slate-200 p-3 rounded-2xl flex justify-between items-center text-xs">
                  <div>
                    <span className="block font-black text-[#0F172A]">Official Scarf</span>
                    <span className="text-[#64748B] font-mono font-bold text-[10px]">₹999</span>
                  </div>
                  <button onClick={() => addToast("Added Scarf combo discount!", "success")} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-2.5 py-1 rounded-lg text-[10px]">
                    + Add
                  </button>
                </div>
                <div className="bg-[#F8FAFC] border border-solid border-slate-200 p-3 rounded-2xl flex justify-between items-center text-xs">
                  <div>
                    <span className="block font-black text-[#0F172A]">Official Cap</span>
                    <span className="text-[#64748B] font-mono font-bold text-[10px]">₹699</span>
                  </div>
                  <button onClick={() => addToast("Added Cap combo discount!", "success")} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-2.5 py-1 rounded-lg text-[10px]">
                    + Add
                  </button>
                </div>
                <div className="bg-[#F8FAFC] border border-solid border-slate-200 p-3 rounded-2xl flex justify-between items-center text-xs">
                  <div>
                    <span className="block font-black text-[#0F172A]">Water Bottle</span>
                    <span className="text-[#64748B] font-mono font-bold text-[10px]">₹499</span>
                  </div>
                  <button onClick={() => addToast("Added Bottle combo discount!", "success")} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-2.5 py-1 rounded-lg text-[10px]">
                    + Add
                  </button>
                </div>
              </div>
            </div>

            {/* Need Help footer section */}
            <div className="pt-4 border-t border-solid border-slate-100 flex justify-between text-xs font-bold text-[#64748B] flex-wrap gap-4 font-mono">
              <span>Need Help? <span onClick={() => { setSelectedFood(null); setActivePage("copilot"); }} className="text-blue-600 hover:underline cursor-pointer">Ask Arena AI</span></span>
              <div className="flex gap-4">
                <span className="hover:text-blue-600 cursor-pointer">Find Similar Products</span>
                <span className="hover:text-blue-600 cursor-pointer">Compare Sizes</span>
                <span className="hover:text-blue-600 cursor-pointer">Check Availability</span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ==================== 12. DETAILED PRODUCT MODAL: MERCHANDISE ==================== */}
      {selectedMerch && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white text-slate-800 w-full max-w-4xl p-8 space-y-6 relative animate-fade-in my-8 text-left rounded-3xl shadow-2xl border border-solid border-slate-200">
            
            <button 
              onClick={() => setSelectedMerch(null)} 
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 w-8 h-8 rounded-full flex items-center justify-center transition-all font-bold"
              aria-label="Close modal"
            >
              ✕
            </button>

            {/* Modal Title & Price Header */}
            <div className="border-b border-solid border-slate-100 pb-4 flex justify-between items-start flex-wrap gap-4">
              <div className="space-y-1.5">
                <Badge variant="info" className="bg-blue-600 text-white border-none font-bold py-1 px-3 rounded-full text-[9px] uppercase tracking-wider">
                  OFFICIAL TOURNAMENT APPAREL
                </Badge>
                <h2 className="text-[#0F172A] font-bold text-3xl leading-tight">
                  {selectedMerch.name}
                </h2>
                <p className="text-[#64748B] font-medium text-xs font-mono">
                  Store Location: {selectedMerch.shop} • Status: In Stock • Distance: {selectedMerch.distance}
                </p>
              </div>
              <div className="text-right">
                <span className="block text-[10px] font-mono text-[#64748B] uppercase font-bold">Price</span>
                <span className="text-[#0F172A] font-extrabold text-3xl">₹{selectedMerch.price.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Product Info & Telemetry */}
              <div className="lg:col-span-6 space-y-5">
                
                {/* Description */}
                <div className="space-y-1.5">
                  <span className="block text-[#2563EB] font-bold text-xs uppercase tracking-wider font-mono">Product Description</span>
                  <p className="text-[#334155] font-medium text-sm leading-relaxed">
                    {selectedMerch.desc}
                  </p>
                </div>

                {/* Stock Alert Panel */}
                <div className="bg-[#FEF2F2] border border-solid border-[#FCA5A5] p-4 rounded-2xl text-left space-y-1.5 shadow-sm">
                  <h4 className="text-[#DC2626] font-bold text-sm flex items-center gap-1.5">
                    <span>📦</span> Arena AI Stock Prediction
                  </h4>
                  <p className="text-[#7F1D1D] text-xs leading-relaxed font-medium">
                    Only <span className="font-extrabold">45 items</span> remaining in Shop B. Expected sell out in <span className="font-extrabold">18 minutes</span>. Recommendation: <span className="underline font-bold">Reserve Now</span>.
                  </p>
                </div>

                {/* Arena AI Live Telemetry Panel */}
                <div className="bg-emerald-500/5 border border-solid border-emerald-500/20 p-4 rounded-2xl space-y-3 shadow-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      🤖 Arena AI Live Status
                    </span>
                    <span className="text-[8px] font-mono text-slate-400 font-bold">UPDATES IN REAL-TIME</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="bg-white p-2.5 rounded-xl border border-solid border-slate-100">
                      <span className="block text-[#64748B] text-[9px] font-mono uppercase font-bold">Queue Time</span>
                      <span className="text-[#0F172A] font-extrabold text-sm block mt-0.5">2 mins</span>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-solid border-slate-100">
                      <span className="block text-[#64748B] text-[9px] font-mono uppercase font-bold">Crowd Level</span>
                      <span className="text-[#0F172A] font-extrabold text-sm block mt-0.5">Low</span>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-solid border-slate-100">
                      <span className="block text-[#64748B] text-[9px] font-mono uppercase font-bold">Store Status</span>
                      <span className="text-emerald-600 font-extrabold text-sm block mt-0.5">Open</span>
                    </div>
                  </div>
                </div>

                {/* Feature List */}
                <div className="space-y-2 pt-2 border-t border-solid border-slate-100">
                  <span className="block text-[#1E293B] font-semibold text-xs uppercase tracking-wider font-mono">Store Trust Badges</span>
                  <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-[#475569]">
                    <div className="flex items-center gap-1">✓ Official FIFA Licensed</div>
                    <div className="flex items-center gap-1">✓ RFID Authenticity</div>
                    <div className="flex items-center gap-1">✓ Ground Floor Pickup</div>
                    <div className="flex items-center gap-1">✓ QR Pickup Available</div>
                  </div>
                </div>

              </div>

              {/* Right Column: Interactive Purchase Options */}
              <div className="lg:col-span-6 space-y-4">
                <span className="block text-[#1E293B] font-semibold text-xs uppercase tracking-wider font-mono">Select Purchase Path:</span>

                {/* Option 1: Smart Order */}
                <div 
                  onClick={() => setSelectedMerchOption("online")}
                  className={`border border-solid p-4 rounded-2xl transition-all duration-200 relative ${
                    selectedMerchOption === "online" 
                      ? "bg-gradient-to-br from-blue-50/50 to-indigo-50/50 border-2 border-[#2563EB] shadow-[0_12px_30px_rgba(37,99,235,0.18)]" 
                      : "bg-[#F8FAFC] border-slate-200 hover:bg-[#F1F5F9] cursor-pointer"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-[#0F172A] flex items-center gap-1">
                      🛒 Buy Online & Collect
                    </span>
                    <span className="bg-blue-600 text-white font-mono text-[8px] px-2 py-0.5 rounded-full font-extrabold uppercase tracking-wide">
                      ⭐ Fastest
                    </span>
                  </div>
                  <p className="text-[#475569] font-normal text-xs leading-normal mt-1.5">
                    Instant checkout. Stock locked instantly. Collect at priority lane counter in Shop B.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-2 text-[9px] font-mono font-bold text-[#64748B] pt-2 border-t border-solid border-slate-200/10 mt-2">
                    <div>ETA: 3 mins</div>
                    <div>Payment: Online Pay</div>
                  </div>
                </div>

                {/* Option 2: Reserve & Pay */}
                <div 
                  onClick={() => setSelectedMerchOption("reserve")}
                  className={`border border-solid p-4 rounded-2xl transition-all duration-200 relative ${
                    selectedMerchOption === "reserve" 
                      ? "bg-gradient-to-br from-blue-50/50 to-indigo-50/50 border-2 border-[#2563EB] shadow-[0_12px_30px_rgba(37,99,235,0.18)]" 
                      : "bg-[#F8FAFC] border-slate-200 hover:bg-[#F1F5F9] cursor-pointer"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-[#0F172A] flex items-center gap-1">
                      📦 Reserve & Pay at Store
                    </span>
                    <span className="bg-slate-200 text-slate-800 font-mono text-[8px] px-2 py-0.5 rounded-full font-extrabold uppercase tracking-wide">
                      Popular
                    </span>
                  </div>
                  <p className="text-[#475569] font-normal text-xs leading-normal mt-1.5">
                    Hold stock for 30 minutes. Complete payment physically when you walk to the shop desk.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-2 text-[9px] font-mono font-bold text-[#64748B] pt-2 border-t border-solid border-slate-200/10 mt-2">
                    <div>ETA: 5 mins</div>
                    <div>Payment: Store Pay</div>
                  </div>
                </div>

                {/* Option 3: Walk-in */}
                <div 
                  onClick={() => setSelectedMerchOption("walkin")}
                  className={`border border-solid p-4 rounded-2xl transition-all duration-200 relative ${
                    selectedMerchOption === "walkin" 
                      ? "bg-gradient-to-br from-blue-50/50 to-indigo-50/50 border-2 border-[#2563EB] shadow-[0_12px_30px_rgba(37,99,235,0.18)]" 
                      : "bg-[#F8FAFC] border-slate-200 hover:bg-[#F1F5F9] cursor-pointer"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-[#0F172A] flex items-center gap-1">
                      🏪 Walk-in Purchase
                    </span>
                  </div>
                  <p className="text-[#475569] font-normal text-xs leading-normal mt-1.5">
                    Navigate directly to official stadium store. Item subject to stock checks on arrival.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-2 text-[9px] font-mono font-bold text-[#64748B] pt-2 border-t border-solid border-slate-200/10 mt-2">
                    <div>ETA: subject to queue</div>
                    <div>Payment: Any Method</div>
                  </div>
                </div>

                {/* Checkout Trigger Actions */}
                <div className="pt-2">
                  {selectedMerchOption === "online" && (
                    <button 
                      onClick={() => handleMerchCheckout(selectedMerch, "online")}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold shadow-md hover:shadow-lg transition-all rounded-xl py-3.5 px-6 text-center w-full text-sm block cursor-pointer"
                    >
                      🛒 Order with Smart Pay (₹{selectedMerch.price.toLocaleString("en-IN")})
                    </button>
                  )}
                  {selectedMerchOption === "reserve" && (
                    <button 
                      onClick={() => handleMerchCheckout(selectedMerch, "reserve")}
                      className="bg-white border border-solid border-blue-600 text-slate-800 hover:bg-blue-50 font-bold transition-all rounded-xl py-3.5 px-6 text-center w-full text-sm block cursor-pointer"
                    >
                      📦 Reserve for 30 Mins (Pay in Shop)
                    </button>
                  )}
                  {selectedMerchOption === "walkin" && (
                    <button 
                      onClick={() => {
                        handleNavigateToStall(selectedMerch.shop);
                        setSelectedMerch(null);
                      }}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold shadow-md hover:shadow-lg transition-all rounded-xl py-3.5 px-6 text-center w-full text-sm block cursor-pointer"
                    >
                      🗺 Open Route Map navigation
                    </button>
                  )}
                </div>

              </div>

            </div>

            {/* Related products recommendation cards */}
            <div className="pt-6 border-t border-solid border-slate-200/30 space-y-3">
              <span className="block text-[#1E293B] font-semibold text-xs uppercase tracking-wider font-mono">Fans Also Bought:</span>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-[#F8FAFC] border border-solid border-slate-200 p-3 rounded-2xl flex justify-between items-center text-xs">
                  <div>
                    <span className="block font-black text-[#0F172A]">Official Scarf</span>
                    <span className="text-[#64748B] font-mono font-bold text-[10px]">₹999</span>
                  </div>
                  <button onClick={() => addToast("Added Scarf combo discount!", "success")} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-2.5 py-1 rounded-lg text-[10px]">
                    + Add
                  </button>
                </div>
                <div className="bg-[#F8FAFC] border border-solid border-slate-200 p-3 rounded-2xl flex justify-between items-center text-xs">
                  <div>
                    <span className="block font-black text-[#0F172A]">Official Cap</span>
                    <span className="text-[#64748B] font-mono font-bold text-[10px]">₹699</span>
                  </div>
                  <button onClick={() => addToast("Added Cap combo discount!", "success")} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-2.5 py-1 rounded-lg text-[10px]">
                    + Add
                  </button>
                </div>
                <div className="bg-[#F8FAFC] border border-solid border-slate-200 p-3 rounded-2xl flex justify-between items-center text-xs">
                  <div>
                    <span className="block font-black text-[#0F172A]">Water Bottle</span>
                    <span className="text-[#64748B] font-mono font-bold text-[10px]">₹499</span>
                  </div>
                  <button onClick={() => addToast("Added Bottle combo discount!", "success")} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-2.5 py-1 rounded-lg text-[10px]">
                    + Add
                  </button>
                </div>
              </div>
            </div>

            {/* Need Help footer section */}
            <div className="pt-4 border-t border-solid border-slate-100 flex justify-between text-xs font-bold text-[#64748B] flex-wrap gap-4 font-mono">
              <span>Need Help? <span onClick={() => { setSelectedMerch(null); setActivePage("copilot"); }} className="text-blue-600 hover:underline cursor-pointer">Ask Arena AI</span></span>
              <div className="flex gap-4">
                <span className="hover:text-blue-600 cursor-pointer">Find Similar Products</span>
                <span className="hover:text-blue-600 cursor-pointer">Compare Sizes</span>
                <span className="hover:text-blue-600 cursor-pointer">Check Availability</span>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default function FanApp() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ToastProvider>
          <ScenarioProvider>
            <FanAppContent />
          </ScenarioProvider>
        </ToastProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
