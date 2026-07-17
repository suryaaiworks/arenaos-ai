# ArenaOS AI Design System Documentation

Welcome to the **ArenaOS AI Design System** – the user interface framework for _The Agentic AI Operating System for Smart Stadiums_.

This document outlines the engineering philosophy, structure, configurations, and accessibility parameters that govern our frontend components.

---

## 1. Component Philosophy

Our design system is built to serve a large, multi-developer workspace operating on a complex AI-agent platform. Every component is engineered using three core pillars:

1.  **Isolation (Atomic Design)**: Components are self-contained. A component holds its types, tests, logic, and exports within a single directory. It has no side-effects or page-level dependencies.
2.  **RSC by Default (Performance First)**: We render every layout structure, border, separator, skeleton, and static overlay on the server. Client-side hydration is strictly reserved for user interactivity or animations.
3.  **Strict Type Safety & Ref Forwarding**: Interfaces inherit standard HTML element structures, and interactive forms use `React.forwardRef` to support standard ref manipulations and focus triggers.

---

## 2. Directory Architecture

Every component follows a strict folder structure:

```text
ComponentName/
├── ComponentName.tsx        # React Component logic
├── ComponentName.types.ts   # TypeScript interfaces & custom properties
├── ComponentName.test.tsx   # Testing placeholder
└── index.ts                 # Barrel exports registry
```

_Rules_:

- Never import directly from subfolders (e.g. `import Button from "@/components/ui/Button/Button"`).
- Always use barrel exports (e.g. `import Button from "@/components/ui/Button"`).

---

## 3. Design Tokens (Tailwind CSS v4)

All visual values must inherit variables declared in `globals.css`.

### Colors

- `bg-arena-bg`: `#050816` (Deep canvas background)
- `bg-arena-surface`: `#0F172A` (Surface panel backgrounds)
- `bg-arena-card`: `#111827` (Card panels)
- `border-arena-border`: `#1E293B` (Dividers and border lines)
- `text-arena-primary`: `#4F7CFF` (Primary blue highlights)
- `text-arena-secondary`: `#7C5CFF` (Secondary purple overlays)
- `text-arena-success`: `#22C55E` (System validation success status)
- `text-arena-warning`: `#F59E0B` (Alert status warning)
- `text-arena-danger`: `#EF4444` (System alert danger status)

### Borders & Shadows

- `rounded-arena-card`: `20px`
- `rounded-arena-card-lg`: `28px`
- `shadow-arena-glow`: Glowing blue outer shadows.
- `shadow-arena-card`: Soft deep black shadows.

---

## 4. API Standardization

For API consistency, components share unified property names.

### Naming Conventions

- `disabled` (not `isDisabled`): Used consistently across Button, Input, Textarea, and animations.
- `loading` (not `isLoading`): Used on Button components.
- `variant`: Specifies styles (e.g. primary, secondary, outline).
- `size`: Specifies dimensions (e.g. xs, sm, md, lg, xl).

### Shell Component Properties

All reusable container structures support the following properties:

- `className`: Standard custom utility overrides.
- `children`: Standard React elements structure.
- `id`: Anchor target.
- `style`: Native inline style parameters.
- `data-testid`: Automation test identifier hook.

---

## 5. Accessibility (a11y) Standards

Every component is audit-verified against **WCAG 2.1 AA** targets:

1.  **Form fields**: Associate label elements with inputs via `htmlFor` and `id`. Set `aria-invalid="true"` when errors are present.
2.  **Help labels**: Use `aria-describedby` to link input panels with description or error texts.
3.  **Keyboard navigation**: Support standard Space and Enter click-events on chips and buttons.
4.  **Visible focus outlines**: Style explicit `focus-visible` rings on all input fields and action targets.
5.  **Screen reader hiding**: Decorative indicators (Skeletons, dividers, background meshes) must have `aria-hidden="true"`.

---

## 6. Animation Standards

Animations are handled via `Framer Motion` inside isolated Client Components.

- **Reduced-Motion Check**: Motion wrappers listen to `useReducedMotion` hooks, disabling active animation transitions automatically for users with motion sensitivity.
- **Curves**: Transitions must use defined ease-out cubic splines (`ease: [0.16, 1, 0.3, 1]`) to create a smooth, premium feel.

---

## 7. Testing & Storybook Strategies

- **Jest/Vitest Setup**: Place test code inside `ComponentName.test.tsx` (using `describe`, `it`, and `expect` mocks).
- **Storybook Setup**: Keep component properties fully clean of hidden side effects, allowing Storybook loaders to import files directly.

---

## 8. Contribution Guidelines

1.  **Run Verifications**: Prior to making a commit, developers must run formatting and compilation checks:
    ```bash
    npm run lint
    npx tsc --noEmit
    npm run build
    ```
2.  **No Page Logic**: Never write page-specific routes or logic inside `components/ui/`, `components/layout/`, or `components/shared/`.
