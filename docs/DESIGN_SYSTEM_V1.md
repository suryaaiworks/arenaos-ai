# ArenaOS AI Design System - Version 1.0 Manual

This manual serves as the technical specification and onboarding reference for the **ArenaOS AI Design System (v1.0)**.

---

## 1. Project Philosophy

Our design system is built to provide maximum visual excellence, performance, and screen-reader accessibility for _The Agentic AI Operating System for Smart Stadiums_.

- **Performance First**: We optimize for speed by keeping components server-rendered by default (RSC), minimizing JavaScript bundles.
- **Consistent Aesthetics**: Enforces the dark, futuristic stadium console theme using strict, centralized Tailwind v4 custom design variables.
- **Accessibility as a Priority**: Every interactive component is designed to conform to WCAG 2.1 AA parameters from day one.

---

## 2. Directory Structure & Architecture

Every component follows the modular subdirectory pattern:

```text
ComponentName/
├── ComponentName.tsx        # UI Component Logic
├── ComponentName.types.ts   # TypeScript Type Interfaces
├── ComponentName.test.tsx   # Testing Suites (placeholder)
└── index.ts                 # Component entry barrel export
```

_Rule_: Never use deep imports. Developers must import from the category level:

```typescript
import { Button } from "@/components/ui"; // Correct
import Button from "@/components/ui/Button/Button"; // Forbidden
```

---

## 3. Server vs. Client Component Rules

- **Server Components (Default)**: Use for structural layouts, borders, dividers, text typography, skeletons, and static overlays. They ship zero JS to the client.
- **Client Components**: Use **only** when browser APIs, state hooks (`useState`, `useEffect`), or Framer Motion hooks (`useReducedMotion`) are required. Add the `"use client"` directive at the very top of the entry file.
- _Rule_: Keep client components at the leaves of the DOM tree. Never put `"use client"` on layout containers unless they coordinate interactive page states.

---

## 4. API & Naming Conventions

- **Unified Properties**: Components must support `className`, `children`, `id`, `style`, and `data-testid` where appropriate.
- **Ref Forwarding**: Interactive inputs and buttons must implement `React.forwardRef` to support standard ref controls.
- **Consistent Parameter Naming**: Use unified naming rules:
  - `disabled` (not `isDisabled`)
  - `loading` (not `isLoading`)

---

## 5. Animation Guidelines (Framer Motion)

- **Isolate Animations**: Motion components must be client components.
- **Reduced-Motion Check**: All Framer Motion wrappers must check the browser's accessibility guidelines (`useReducedMotion`) and disable transitions dynamically.
- **Consistent Easings**: Animations must use the custom ease-out cubic spline (`ease: [0.16, 1, 0.3, 1]`) to maintain a premium feel.

---

## 6. Accessibility & ARIA Standards

- **Semantic HTML**: Use native semantic tags (`<button>`, `<main>`, `<header>`, `<footer>`, `<section>`) instead of generic `div` overrides.
- **Form fields**: Always link inputs to labels (`htmlFor`/`id`). Use `aria-describedby` to associate helper texts and error status reports. Use `aria-invalid="true"` when validations fail.
- **Visible Focus States**: Explicit outline offsets must be configured for tab navigations.
- **Decorative Elements**: Skeletons, spinners, separators, and background textures must set `aria-hidden="true"`.

---

## 7. Testing & Storybook Strategies

- **Testing Readiness**: Code must run without side-effects. Mock test wrappers are kept in `*.test.tsx`.
- **Storybook Integration**: Properties are fully exposed via types, allowing Storybook loaders to import files directly without complex context configurations.

---

## 8. Best Practices & Common Mistakes to Avoid

- _Avoid_: Spreading unvalidated props directly to internal DOM nodes without filtering.
- _Avoid_: Putting raw HEX colors in components instead of using custom CSS variables (like `text-arena-primary`).
- _Do_: Verify lints and compilation checks locally before committing.
