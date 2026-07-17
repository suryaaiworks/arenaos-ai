# ArenaOS AI Development Guidelines - Version 1.0

This manual documents the development protocols, coding standards, typescript checks, and review requirements for contributing to the **ArenaOS AI** repository.

---

## 1. Naming Conventions

- **Folders**:
  - Components: PascalCase (e.g. `src/components/ui/Button/`)
  - Features: kebab-case (e.g. `src/features/landing/`)
  - Helper folders: lowercase (e.g. `src/lib/`, `src/hooks/`)
- **Files**:
  - Components: `PascalCase.tsx` (e.g. `Button.tsx`)
  - Types: `PascalCase.types.ts` (e.g. `Button.types.ts`)
  - Tests: `PascalCase.test.tsx` (e.g. `Button.test.tsx`)
  - Utilities: `camelCase.ts` (e.g. `cn.ts`)

---

## 2. Imports and Exports (Barrel Rules)

- **No Deep Imports**: Never import from internal subfolders of other feature modules or component folders.
  - _Incorrect_: `import { Button } from "@/components/ui/Button/Button"`
  - _Correct_: `import { Button } from "@/components/ui"`
- **Export Registries**: Every component directory must house an `index.ts` file executing standard exports:
  ```typescript
  export * from "./Button";
  export * from "./Button.types";
  export { default } from "./Button";
  ```

---

## 3. TypeScript Guidelines

- **Strict Mode Active**: Always keep `"strict": true` active in `tsconfig.json`.
- **Explicit typing**: Do not use `any` typings. If a type parameter is unknown, cast it to `unknown` or use proper generic variables.
- **Props mapping**: Do not declare inline properties inside component parameters. Define an interface inside `*.types.ts` extending native HTML attributes where applicable:
  ```typescript
  export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { ... }
  ```

---

## 4. Accessibility Rules

- **Keyboard tab focus**: Interactive elements must be fully navigable. Style focus offsets using `focus-visible`.
- **Labels Linkage**: Form widgets must have labels linked via `htmlFor` and `id` references.
- **Contrast Rules**: Ensure text elements maintain high contrast ratio boundaries against the `#050816` canvas background.

---

## 5. Performance Guidelines

- **React Server Components (RSC)**: Keep components server-rendered by default. Strip out `"use client"` statements unless event listeners, browser hooks, or Framer Motion properties are explicitly needed.
- **Asset Optimization**: Always load assets via `next/image`. Define static dimensions or set layouts using the `fill` property.

---

## 6. Pull Request & Code Review Checklist

Before creating a pull request or submitting a commit:

- [ ] Working tree is clean (`git status` reports no uncommitted local code edits).
- [ ] No compilation errors when executing strict type checks (`npx tsc --noEmit` returns exit code 0).
- [ ] No syntax errors or styling violations when executing linter formats (`npm run lint` returns exit code 0).
- [ ] Production build compiles cleanly with zero warnings (`npm run build` returns exit code 0).
- [ ] Reusable components are generic and avoid page-specific details.
- [ ] Interactive input items utilize `React.forwardRef` to support standard ref controls.
