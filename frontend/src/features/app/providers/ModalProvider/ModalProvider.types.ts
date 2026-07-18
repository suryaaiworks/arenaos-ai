import React from "react";

export interface ModalContextProps {
  isOpen: boolean;
  title: string;
  content: React.ReactNode | null;
  openModal: (title: string, content: React.ReactNode) => void;
  closeModal: () => void;
}

export interface ModalProviderProps {
  children: React.ReactNode;
}
