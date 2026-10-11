# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Critical: Next.js version

This repo runs **Next.js 16.2.9 / React 19.2**. `AGENTS.md` (above) is not boilerplate — APIs and conventions differ from older Next.js. Before writing framework code, read the relevant guide under `node_modules/next/dist/docs/01-app/` (App Router) and heed deprecation notices.

## Commands

```bash
npm run dev      # dev server at http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint (flat config, core-web-vitals + typescript rules)
```

There is no test suite and no test runner configured.

## Architecture

Single-page portfolio site. **The entire page is one route**: [src/app/page.tsx](src/app/page.tsx) stacks, in order, `Navbar`, `Hero`, `PersonalSnapshot` (bento "short version"), `Journey` (chronological work/study/research timeline), `EngineeringImpact` (headline metrics strip), `Projects`, `Skills`, `Research`, `Footer` inside `<main>`, plus site-wide overlays (`CustomCursor`, `PageBurst`, `Blobs`). [src/app/layout.tsx](src/app/layout.tsx) loads `Inter` + `Syne` via `next/font/google` as CSS variables and sets `Metadata`.

- **Narrative**: Tejas Shetty, Australia-based software developer (ANU Master of Computing, AI specialisation, graduated Jun 2026), positioned as "Backend + AI", open to full-time/freelance. Journey runs 2020 (B.E. at M.S. Ramaiah) → 2022 Cuvasol → 2023 ISRO/research → 2024 Axiscades → 2025 Bardar → 2026 ANU graduation. Metrics and paper/citation counts are repeated across `Hero`, `PersonalSnapshot`, `EngineeringImpact`, `Journey`, `Projects` and `Research`; **keep them consistent when editing any one** (e.g. 3 papers · 21 citations, 20–30% latency).
- **Navigation**: `Navbar.tsx` is a floating dock pinned to the bottom centre (not a top bar). A rAF scroll listener picks the active section from the `id`s `journey`, `work`, `skills`, `research`, `contact` and slides a highlight to it. Anything pinned to the viewport bottom (e.g. `ProjectShowcase` panels, `Footer`) must leave ~4rem clear for it.
- **Time-sensitive copy**: status/graduation wording lives in `Hero`, `Journey` (2026 entry) and `PersonalSnapshot` ("Graduated" tile). Revisit these if availability or education status changes.
- **All content is hardcoded in the component that renders it.** e.g. the project list is the `projects` array in [src/components/Projects.tsx](src/components/Projects.tsx). No CMS, no data layer, no API routes. To change site content, edit the arrays/JSX inline.
- **Nearly every component is `"use client"`** — the site is animation-heavy (framer-motion, `requestAnimationFrame` loops, IntersectionObserver reveal-on-scroll).
- **Section theming via `data-cursor-theme`**: each `<section>` sets `data-cursor-theme="work"` etc. (current keys include `hero`, `snapshot`, `experience`, `impact`, `work`, `skills`, `research`). [src/components/CustomCursor.tsx](src/components/CustomCursor.tsx) reads it with `elementFromPoint` + `closest()` to recolor the custom cursor and swap its orbiting icons per section. The theme keys and accent colors live in the `THEMES` map there. Adding a section means adding a matching entry.
- **Reusable interaction primitives** in [src/components/](src/components/): `RevealPanel` / `ExpandPanel` (animated expand from a click origin), `Lightbox` / `ProjectModal` (image viewers), `MagneticIcon` / `IconBurst` / `PageBurst` / `FloatingIcons` (pointer-reactive decoration). SVG icons are all in [src/components/icons/Icons.tsx](src/components/icons/Icons.tsx), including `iconForTag()` which maps a skill/tech string to an icon.
- **Styling**: Tailwind v4 (`@import "tailwindcss"` in [src/app/globals.css](src/app/globals.css), PostCSS plugin `@tailwindcss/postcss`). Palette is CSS custom properties (`--c1`..`--c6`, `--ink`, etc.) in `globals.css`; component code also hardcodes the same hex values inline. Scoped component styles use styled-jsx `<style jsx>`. The native scrollbar is hidden globally (`ScrollProgress`, its curved replacement, is currently commented out in `page.tsx`, so there is no scroll indicator besides the dock); the native cursor is hidden while `CustomCursor` is active.
- **Projects layout**: `Projects.tsx` renders two variants — stacked expandable cards (mobile / `prefers-reduced-motion`) and `ProjectShowcase.tsx`, a sticky horizontal scroll-jack for `lg+`. Both consume the same `panels` array; a new project must be added there and works in both.
- **Dead code**: [src/components/Extras.tsx](src/components/Extras.tsx) is fully commented out and not imported (racing, guitar, hackathon bio). Intentionally excluded; see `design-system/tejas-portfolio/MASTER.md`.
- **Design system**: `design-system/tejas-portfolio/MASTER.md` holds locked decisions (keep warm light theme, keep custom cursor, Inter + Syne). Read it before visual changes.
- **Path alias**: `@/*` → `./src/*`.
- Static assets (project screenshots, CV PDF, profile photo) live in [public/](public/) and are referenced by root-relative path.
