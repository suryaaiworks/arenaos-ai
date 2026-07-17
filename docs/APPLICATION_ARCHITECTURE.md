# ArenaOS AI Application Architecture Manual - Sprint 2.0

This manual documents the authenticated console dashboard layouts, context providers, responsive rules, and future expansion routes.

---

## 1. Directory Structure (`features/app/`)
The authenticated workspace is modularly isolated inside `src/features/app/`:
```text
features/app/
├── components/         # Layout subcomponents (Sidebar, Header, breadcrumbs)
├── layouts/            # Central grid shell (AppShell)
├── navigation/         # Mock navigation links lists
├── providers/          # Toast, modal, theme, and command contexts
└── index.ts            # Entry barrel exporting structures
```

---

## 2. Provider Hierarchy
Context provider layers wrap the layout tree inside `apps/web/src/app/app/layout.tsx`:
```text
<ThemeProvider>
  <ToastProvider>
    <ModalProvider>
      <CommandPaletteProvider>
        <AppShell>
          {children}
        </AppShell>
      </CommandPaletteProvider>
    </ModalProvider>
  </ToastProvider>
</ThemeProvider>
```
*   **ThemeProvider**: Manages the locked dark theme dashboard variables.
*   **ToastProvider**: Places absolute overlays on the bottom-right corner for messages.
*   **ModalProvider**: Renders center dialog boxes in response to actions.
*   **CommandPaletteProvider**: Binds global shortcuts (Ctrl+K) to launch searchable console tools.

---

## 3. App Layout Grid Hierarchy
The `AppShell` component coordinates layouts using a split sidebar structure:
```text
+-------------------------------------------------------------+
| Sidebar      | Header (Breadcrumb, Search, Alert, Profile)  |
| (Collapsible)|----------------------------------------------|
|              | ContentArea                 | UtilityPanel   |
|              | (Scrollable main canvas)    | (Right Logs    |
|              |                             |  - hidden XL)  |
+-------------------------------------------------------------+
```

---

## 4. Responsive & Accessibility Strategy
-   **Responsive Collapse**:
    -   Sidebars shrink from `w-64` to `w-20` on trigger clicks.
    -   `UtilityPanel` hides on screens smaller than the desktop breakpoint (`hidden xl:flex`).
-   **Keyboard focus traps**: Modals and dropdown profile lists trap tab navigations.
-   **Aria annotations**: Live region targets `aria-live="assertive"` notify assistive tools of new toast notifications.
