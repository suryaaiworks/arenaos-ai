"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { ToastContextProps, ToastMessage, ToastProviderProps } from "./ToastProvider.types";
import { cn } from "@/lib/utils";

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

/**
 * Custom Toast Alerts Provider.
 * Spawns dynamic, styled alert notifications floating above our dashboard components.
 */
export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback((message: string, type: ToastMessage["type"]) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto-remove toast after 4 seconds
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      
      {/* Toast Render Container Overlay */}
      <div 
        className="fixed bottom-5 right-5 z-[99999] flex flex-col space-y-2 max-w-sm w-full pointer-events-none"
        aria-live="assertive"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            onClick={() => removeToast(toast.id)}
            className={cn(
              "p-4 rounded-xl shadow-lg text-xs font-semibold border backdrop-blur-md pointer-events-auto cursor-pointer flex items-center justify-between transition-all duration-300",
              toast.type === "success" && "bg-arena-success/20 border-arena-success/30 text-white",
              toast.type === "error" && "bg-arena-danger/20 border-arena-danger/30 text-white",
              toast.type === "warning" && "bg-arena-warning/20 border-arena-warning/30 text-white",
              toast.type === "info" && "bg-arena-primary/20 border-arena-primary/30 text-white"
            )}
            role="alert"
          >
            <span>{toast.message}</span>
            <button 
              className="text-white/50 hover:text-white ml-4 font-bold text-sm focus:outline-none"
              aria-label="Dismiss Alert"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export default ToastProvider;
