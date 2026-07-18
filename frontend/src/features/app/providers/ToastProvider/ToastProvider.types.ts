import React from "react";

export interface ToastMessage {
  id: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
}

export interface ToastContextProps {
  toasts: ToastMessage[];
  addToast: (message: string, type: ToastMessage["type"]) => void;
  removeToast: (id: string) => void;
}

export interface ToastProviderProps {
  children: React.ReactNode;
}
