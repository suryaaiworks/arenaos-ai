import React from "react";

export interface CommandPaletteContextProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  toggleOpen: () => void;
}

export interface CommandPaletteProviderProps {
  children: React.ReactNode;
}
