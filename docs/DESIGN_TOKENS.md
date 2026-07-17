# ArenaOS AI Design Tokens Specification - Version 1.0

This specification maps the exact visual token constants used in the **ArenaOS AI Design System**. These tokens are implemented in `globals.css` and compiled under Tailwind CSS v4 design parameters.

---

## 1. Core Color System

Colors are defined to support the futuristic dark console dashboard.

| Token Name                | Hex Code  | Purpose / Usage                           |
| :------------------------ | :-------- | :---------------------------------------- |
| `--color-arena-bg`        | `#050816` | Main deep background canvas               |
| `--color-arena-surface`   | `#0F172A` | Base surface layout boards, containers    |
| `--color-arena-card`      | `#111827` | Card panels                               |
| `--color-arena-border`    | `#1E293B` | Structural dividers, outline borders      |
| `--color-arena-primary`   | `#4F7CFF` | Primary action highlights, links, buttons |
| `--color-arena-secondary` | `#7C5CFF` | AI, branding glow bubbles, overlays       |
| `--color-arena-success`   | `#22C55E` | Verification indicator green              |
| `--color-arena-warning`   | `#F59E0B` | Warning alert yellow                      |
| `--color-arena-danger`    | `#EF4444` | Danger alert red                          |
| `--color-arena-text`      | `#FFFFFF` | Primary white text                        |
| `--color-arena-muted`     | `#94A3B8` | Subtitle descriptions, secondary details  |

---

## 2. Typography

- **Font Families**:
  - `sans`: `Plus Jakarta Sans`, `Inter`, `sans-serif` (primary body copy, headers).
- **Font Sizes**:
  - `xs`: `12px` (`0.75rem`)
  - `sm`: `14px` (`0.875rem`)
  - `base`: `16px` (`1rem`)
  - `lg`: `18px` (`1.125rem`)
  - `xl`: `20px` (`1.25rem`)
  - `2xl`: `24px` (`1.5rem`)
  - `3xl`: `30px` (`1.875rem`)
  - `4xl`: `36px` (`2.25rem`)
  - `5xl`: `48px` (`3rem`)
  - `6xl`: `60px` (`3.75rem`)
- **Font Weights**:
  - `regular`: `400`
  - `medium`: `500`
  - `semibold`: `600`
  - `bold`: `700`
  - `extrabold`: `800`

---

## 3. Radii (Rounded Corners)

- `rounded-arena-card`: `20px` (standard card borders)
- `rounded-arena-card-lg`: `28px` (large container card boundaries)
- `rounded-lg`: `8px` (small badge boundaries)
- `rounded-full`: `9999px` (perfect circle avatars, spinners)

---

## 4. Shadows & Glows

- `shadow-arena-glow`: `0 0 20px rgba(79, 124, 255, 0.15)` (primary blue glow highlight)
- `shadow-arena-glow-secondary`: `0 0 20px rgba(124, 92, 255, 0.15)` (secondary purple glow)
- `shadow-arena-card`: `0 4px 30px rgba(0, 0, 0, 0.4)` (deep base card layouts)

---

## 5. Spacing Scale

Spacing defaults to standard responsive padding scales.

- `arena-gap`: `24px` (`1.5rem`)
- `arena-gap-lg`: `32px` (`2rem`)

---

## 6. Z-Index Scale

- `z-below`: `-1` (mesh backgrounds)
- `z-base`: `0` (general content)
- `z-card`: `1` (cards, overlays)
- `z-navbar`: `50` (sticky navigation header)
- `z-loading`: `9999` (splash page loader overlays)

---

## 7. Animation Transitions

- **Easing curve**: `cubic-bezier(0.16, 1, 0.3, 1)` (smooth ease-out deceleration curve).
- **Durations**:
  - `fast`: `200ms` (standard button micro-interactions)
  - `medium`: `350ms` (page transitions, card collapses)
  - `slow`: `500ms` (motion reveals)
