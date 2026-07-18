"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { ModalContextProps, ModalProviderProps } from "./ModalProvider.types";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

/**
 * Dynamic Dialog Modal Provider.
 * Coordinates dynamic console overlays utilizing standard Design System layout elements.
 */
export function ModalProvider({ children }: ModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<React.ReactNode | null>(null);

  const openModal = useCallback((title: string, content: React.ReactNode) => {
    setTitle(title);
    setContent(content);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => {
      setTitle("");
      setContent(null);
    }, 200);
  }, []);

  return (
    <ModalContext.Provider value={{ isOpen, title, content, openModal, closeModal }}>
      {children}
      
      {/* Modal Dialog Overlay container */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="max-w-md w-full animate-scale">
            <GlassCard
              padding="md"
              rounded="md"
              border={true}
              className="bg-arena-surface border border-white/10 shadow-2xl relative space-y-4"
            >
              {/* Header section */}
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  {title}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-arena-muted hover:text-white transition-colors text-lg font-bold p-1 focus:outline-none focus-visible:outline-arena-primary"
                  aria-label="Close dialog"
                >
                  &times;
                </button>
              </div>

              {/* Body Content */}
              <div className="text-xs text-arena-muted leading-relaxed">
                {content}
              </div>

              {/* Action triggers footer */}
              <div className="flex justify-end pt-2">
                <Button variant="secondary" size="sm" onClick={closeModal}>
                  Close
                </Button>
              </div>
            </GlassCard>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}

export default ModalProvider;
