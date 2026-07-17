# ArenaOS AI Production Readiness Manual - Sprint 1.4

This checklist ensures the **ArenaOS AI** platform meets all criteria for production deployments.

---

## 1. Deployment Checklist

- [ ] **Build Command**: `npm run build` executes successfully.
- [ ] **Production Node**: Node version is matching `>= 18.x`.
- [ ] **Environment Scope**: All production environment triggers are verified in cloud build panels.
- [ ] **Prerender Target**: Confirm `/` static files generation size matches targets (<= 100 kB).

---

## 2. SEO & Metadata Checklist

- [ ] **Title & Description**: layout metadata title matches exact Smart Stadium product terms.
- [ ] **JSON-LD Schema**: verify structured software schema tag renders inside layout.
- [ ] **Sitemap & Robots**: `sitemap.xml` and `robots.txt` reside in public assets.
- [ ] **Preview Images**: `og-image.png` preview graphics exist and render on social media anchors.

---

## 3. Accessibility (WCAG 2.1 AA) Checklist

- [ ] **Landmark semantics**: layouts contain exactly one `<main>`, one `<header>`, one `<footer>`, and heading order matches correct hierarchies.
- [ ] **Keyboard navigators focus rings**: focus rings outlines are clearly visible.
- [ ] **Skip to content**: check skip anchors correctly bypass top banner items.
- [ ] **Aria tags**: Skeletons, spinners, noise frames, and separators set `aria-hidden="true"`.

---

## 4. Performance Optimizations

- [ ] **RSC percentage**: check leaf interactive boundaries use `"use client"` scopes, keeping main page bundles statically rendered on server.
- [ ] **Asset caching**: serve public icons and logos using static caching header configurations on deployment servers.

---

## 5. Browser Compatibility

- [ ] **Google Chrome**: Verified (v100+).
- [ ] **Safari (macOS / iOS)**: Verified (v15+).
- [ ] **Mozilla Firefox**: Verified (v95+).
- [ ] **Microsoft Edge**: Verified (v95+).

---

## 6. Environment Variables

No secrets are required for Sprint 1.0 (landing page). Future database integrations will require:

- `NEXT_PUBLIC_SUPABASE_URL`: Supabase endpoint trigger (Sprint 2).
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase client access key (Sprint 2).
