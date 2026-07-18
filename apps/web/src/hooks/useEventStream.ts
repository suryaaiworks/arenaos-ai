import { useEffect, useState, useRef, useCallback } from "react";

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8000/ws/events";
const SSE_URL = process.env.NEXT_PUBLIC_SSE_URL || "http://localhost:8000/api/v1/events/stream";

export interface EventStreamRecord {
  event_type: string;
  source: string;
  priority: string;
  timestamp?: string;
  [key: string]: unknown;
}

export function useEventStream(topics: string[] = ["*"]) {
  const [connected, setConnected] = useState(false);
  const [lastEvent, setLastEvent] = useState<EventStreamRecord | null>(null);
  const [eventHistory, setEventHistory] = useState<EventStreamRecord[]>([]);
  const wsRef = useRef<WebSocket | null>(null);
  const sseRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const heartbeatIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const topicsRef = useRef<string[]>(topics);

  // Sync ref
  useEffect(() => {
    topicsRef.current = topics;
  }, [topics]);

  const handleMessage = useCallback((eventData: EventStreamRecord) => {
    setLastEvent(eventData);
    setEventHistory((prev) => {
      const updated = [eventData, ...prev];
      if (updated.length > 50) {
        updated.pop();
      }
      return updated;
    });
  }, []);

  const connectWS = useCallback(() => {
    if (wsRef.current) return;

    console.log("EventStream: Connecting to WebSocket...");
    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("EventStream: WebSocket connected.");
      setConnected(true);

      // Subscribe to topics
      topicsRef.current.forEach((t) => {
        ws.send(JSON.stringify({ action: "subscribe", topic: t }));
      });

      // Start Heartbeat keep-alive
      if (heartbeatIntervalRef.current) {
        clearInterval(heartbeatIntervalRef.current);
      }
      heartbeatIntervalRef.current = setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ action: "ping" }));
        }
      }, 30000);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.status === "pong") return; // Filter heartbeats
        handleMessage(data);
      } catch (err) {
        console.error("EventStream: Failed to parse WS message payload:", err);
      }
    };

    ws.onerror = (err) => {
      console.error("EventStream: WebSocket error:", err);
    };

    ws.onclose = () => {
      console.log("EventStream: WebSocket disconnected. Scheduling reconnect...");
      wsRef.current = null;
      setConnected(false);
      if (heartbeatIntervalRef.current) {
        clearInterval(heartbeatIntervalRef.current);
      }

      // Fallback to SSE if WS fails, or retry WS with delay
      reconnectTimeoutRef.current = setTimeout(() => {
        connectWS();
      }, 5000);
    };
  }, [handleMessage]);

  const connectSSE = useCallback(() => {
    if (sseRef.current) return;

    console.log("EventStream: WebSocket unavailable. Connecting to SSE fallback...");
    const sse = new EventSource(SSE_URL);
    sseRef.current = sse;

    sse.onopen = () => {
      console.log("EventStream: SSE connected.");
      setConnected(true);
    };

    sse.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        handleMessage(data);
      } catch (err) {
        console.error("EventStream: Failed to parse SSE message payload:", err);
      }
    };

    sse.onerror = (err) => {
      console.error("EventStream: SSE error:", err);
      sse.close();
      sseRef.current = null;
      setConnected(false);

      // Retry SSE reconnection
      reconnectTimeoutRef.current = setTimeout(() => {
        connectSSE();
      }, 5000);
    };
  }, [handleMessage]);

  useEffect(() => {
    // Attempt WebSocket first
    connectWS();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (sseRef.current) {
        sseRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (heartbeatIntervalRef.current) {
        clearInterval(heartbeatIntervalRef.current);
      }
    };
  }, [connectWS]);

  const subscribe = useCallback((topic: string) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ action: "subscribe", topic }));
    }
  }, []);

  const unsubscribe = useCallback((topic: string) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ action: "unsubscribe", topic }));
    }
  }, []);

  return {
    connected,
    lastEvent,
    eventHistory,
    subscribe,
    unsubscribe,
  };
}
