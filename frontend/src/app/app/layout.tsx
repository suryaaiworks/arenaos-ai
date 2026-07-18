import {
  ThemeProvider,
  ToastProvider,
  ModalProvider,
  CommandPaletteProvider,
  RoleProvider,
  ScenarioProvider,
  LanguageProvider,
} from "@/features/app/providers";
import AppShell from "@/features/app/layouts/AppShell";

export const metadata = {
  title: "ArenaOS AI Console – Stadium Command Hub",
  description: "Authenticated operations dashboard for smart stadium management.",
};

/**
 * Route Layout for `/app` path group.
 * Wraps dashboard children in theme, toast, modal, role, scenario, and command palette contexts.
 */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ToastProvider>
          <ModalProvider>
            <RoleProvider>
              <ScenarioProvider>
                <CommandPaletteProvider>
                  <AppShell>{children}</AppShell>
                </CommandPaletteProvider>
              </ScenarioProvider>
            </RoleProvider>
          </ModalProvider>
        </ToastProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
