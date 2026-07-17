import React from "react";
import { ThemeProvider, ToastProvider, ModalProvider, CommandPaletteProvider } from "@/features/app/providers";
import AppShell from "@/features/app/layouts/AppShell";

export const metadata = {
  title: "ArenaOS AI Console – Stadium Command Hub",
  description: "Authenticated operations dashboard for smart stadium management.",
};

/**
 * Route Layout for `/app` path group.
 * Wraps dashboard children in theme, toast, modal, and command palette contexts.
 */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <ModalProvider>
          <CommandPaletteProvider>
            <AppShell>{children}</AppShell>
          </CommandPaletteProvider>
        </ModalProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
