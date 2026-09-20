# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** tejas-portfolio
**Generated:** 2026-09-18 16:43:53
**Category:** Portfolio/Personal
**Design Dials:** Variance 3/10 (Centered / Minimal) | Motion 6/10 (Standard) | Density 4/10 (Standard)

---

## Locked Decisions (read this first)

The `ui-ux-pro-max` skill's `--design-system` search defaults to a dark/monochrome
"Minimalism & Swiss Style" (or, on other query wordings, "Brutalism") with an
Archivo/Space Grotesk pairing, regardless of query wording — that's the generic
best-fit for the "Portfolio/Personal" category in its data. This project explicitly
overrides that recommendation. The **Color Palette** and **Typography** sections
below have been hand-edited to reflect the real, locked-in decisions rather than the
tool's auto-generated output. Don't regenerate this file from a fresh `--design-system`
run without re-applying these overrides:

1. **Keep the custom-cursor interaction system** (`src/components/CustomCursor.tsx`) as
   the core interaction mechanic — refine its motion, don't replace the mechanism.
2. **Keep the existing light/warm color theme** — cream background, the 6-accent
   palette. Do not pivot to a dark/monochrome palette.
3. **Information architecture is open** — section order/grouping can and did change.
4. **Apply UX-guideline fixes and motion refinement** using the skill's `ux`/`gsap`
   domain data, applied to the site's existing hand-rolled CSS/rAF animation system
   (no new animation library was introduced).
5. `src/components/Extras.tsx` (dead bio content) stays excluded from this pass.
6. **Typography is unchanged** — Inter (body) + Syne (headings) stays, overriding the
   tool's Archivo/Space Grotesk suggestion below.

The **Page Pattern**, **Motion**, **Anti-Patterns**, and **Pre-Delivery Checklist**
sections below *are* kept from the generated run — they were verified accurate and
applicable to this project.

---

## Global Rules

### Color Palette (project override — see Locked Decisions)

Primitives are unchanged from the pre-redesign palette. Text-safe and tint layers
were added during this pass to fix contrast failures without altering the palette's
identity. Source of truth: `src/app/globals.css`.

| Layer | Role | Hex | CSS Variable |
|---|---|---|---|
| Primitive | Background | `#F0ECE2` | `--bg` |
| Primitive | Ink (headings/body) | `#0F0E0C` | `--ink` |
| Primitive | Ink, soft | `#5A5650` | `--ink-soft` |
| Primitive | Ink, faint (decorative/border only) | `#9C958C` | `--ink-faint` |
| Primitive | Ink, muted (meta/caption text) | `#6E6960` | `--ink-muted` |
| Primitive | Border | `#E8E4DC` | `--border` |
| Primitive | Accent — orange | `#FF6B35` | `--c1` |
| Primitive | Accent — blue | `#4361EE` | `--c2` |
| Primitive | Accent — green | `#06D6A0` | `--c3` |
| Primitive | Accent — yellow (decorative only, never text) | `#FFD166` | `--c4` |
| Primitive | Accent — pink | `#EF476F` | `--c5` |
| Primitive | Accent — purple | `#7B2FBE` | `--c6` |
| Text-safe | Orange text | `#C2410C` | `--c1-text` |
| Text-safe | Blue text | `#4338CA` | `--c2-text` |
| Text-safe | Green text | `#047857` | `--c3-text` |
| Text-safe | Pink text | `#BE123C` | `--c5-text` |
| Text-safe | Purple text (alias, already passes) | `#7B2FBE` | `--c6-text` |
| Tint | Orange badge bg | `#FFF2ED` | `--tint-orange` |
| Tint | Blue badge bg | `#EEF1FF` | `--tint-blue` |
| Tint | Green badge bg | `#E8F8F2` | `--tint-green` |
| Tint | Purple badge bg | `#F3EAFF` | `--tint-purple` |
| Tint | Pink badge bg | `#FEE8EF` | `--tint-pink` |

**Section accent map** (one color per storytelling "chapter"):

| Section | Accent |
|---|---|
| Hero | orange `#FF6B35` |
| PersonalSnapshot | pink `#EF476F` |
| Journey | blue `#4361EE` |
| EngineeringImpact | green `#059669` |
| Projects | orange `#FF6B35` |
| Skills | purple `#7B2FBE` |
| Research | pink `#EF476F` |

**Color Notes:** Light/warm, six-accent identity kept intentionally — see Locked
Decisions above. `--c4` yellow is decorative-only (blobs, dots, icon fills); it
cannot clear 4.5:1 as text against `--bg` at any reasonable weight.

### Typography (project override — see Locked Decisions)

- **Heading Font:** Syne (weights 700/800, loaded per-component via `next/font/google`)
- **Body Font:** Inter (CSS variable `--font-inter`, set on `body` in `globals.css`)
- **Note:** the tool's auto-recommendation (Archivo/Space Grotesk) is intentionally
  not used — typography was explicitly out of scope for this redesign pass.

### Spacing Variables

*Density: 4/10 — Standard*

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` / `0.25rem` | Tight gaps |
| `--space-sm` | `8px` / `0.5rem` | Icon gaps, inline spacing |
| `--space-md` | `16px` / `1rem` | Standard padding |
| `--space-lg` | `24px` / `1.5rem` | Section padding |
| `--space-xl` | `32px` / `2rem` | Large gaps |
| `--space-2xl` | `48px` / `3rem` | Section margins |
| `--space-3xl` | `64px` / `4rem` | Hero padding |

### Shadow Depths

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle lift |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | Cards, buttons |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modals, dropdowns |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.15)` | Hero images, featured cards |

---

## Component Specs

> **Note:** the hex values in this generated section (`#2563EB`, `#18181B`, etc.) are
> from the tool's generic scaffold and do **not** match this project's actual palette
> — see the Color Palette table above for the real tokens. This project doesn't use
> generic `.btn-primary`/`.card`/`.input`/`.modal` classes; each component implements
> its own Tailwind + inline-style treatment (see `src/components/`). Kept here only for
> the transition-timing/border-radius conventions, not the literal colors.

### Buttons

```css
/* Primary Button */
.btn-primary {
  background: #2563EB;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: #18181B;
  border: 2px solid #18181B;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}
```

### Cards

```css
.card {
  background: #FAFAFA;
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--shadow-md);
  transition: all 200ms ease;
  cursor: pointer;
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}
```

### Inputs

```css
.input {
  padding: 12px 16px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 200ms ease;
}

.input:focus {
  border-color: #18181B;
  outline: none;
  box-shadow: 0 0 0 3px #18181B20;
}
```

### Modals

```css
.modal-overlay {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.modal {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--shadow-xl);
  max-width: 500px;
  width: 90%;
}
```

---

## Style Guidelines (project override — see Locked Decisions)

**Primary style: Motion-Driven** (not the auto-generated "Minimalism & Swiss Style" —
that entry is enterprise/dashboard-oriented and doesn't fit a personality-forward
portfolio; Motion-Driven is explicitly light-mode-supported and "Best For: Portfolio
sites, storytelling platforms, interactive experiences").

**Keywords:** Animation-heavy, microinteractions, smooth transitions, scroll effects,
entrance animations. **Accessibility:** risk:conditional — requires contrast-text-4.5,
keyboard, visible-focus, reduced-motion (all addressed in this pass, see the fixes
below).

**Secondary, supporting style: Interactive Cursor Design** — directly describes this
site's core mechanic (`CustomCursor.tsx`: custom cursor, magnetic pull, hover
morphing, trail effects). Its accessibility risk is flagged **high**, requiring a
touch fallback — already satisfied: the cursor self-disables on non-fine pointers
(`matchMedia("(pointer: fine)")`), and this pass additionally added a
`prefers-reduced-motion` guard to its rAF loop (see Applied Motion Presets below).

**Key Effects:** Scroll-reveal on IntersectionObserver, hover micro-interactions
(150-300ms), card lift/tilt, magnetic cursor pull (now reserved for one flagship
element site-wide, not applied ambiently), custom cursor theming per section.

### Fixes applied this pass (UX-guideline driven)

| Issue | Fix |
|---|---|
| `--ink-muted` (old value) measured ~2.5:1 on `--bg`, used as real caption text | New darker `--ink-muted` value (~4.6:1); old value kept as `--ink-faint` for decorative use |
| Several accent-as-text usages (badges, eyebrows, tile labels) failed 4.5:1 | New `-text` token siblings (`--c1-text`, `--c2-text`, `--c3-text`, `--c5-text`) |
| `CustomCursor`'s label pill (white text on raw accent bg) failed 4.5:1 for orange/pink/green themes | Split `THEMES` into `accent` (decorative) / `labelBg` (darkened `-text` token) |
| Skills' group blurb was hover-only, no tap/keyboard path | Group label is now a real `<button>` toggling an inline blurb |
| `MagneticIcon` applied to ~40+ elements at once (violates "1-2 focal elements per screen") | Reduced to exactly one instance site-wide (PersonalSnapshot's lead tile) |
| `CustomCursor`'s rAF loop (trail/orbit icons) had no `prefers-reduced-motion` check | Added a `matchMedia` guard; trail/orbit are dropped and the ring/dot stop lagging under reduced motion |
| `PageBurst`'s ripple color map was missing `snapshot`/`impact` and mismatched `skills` | Map corrected to mirror `CustomCursor.THEMES` |
| Small tap targets (Journey detail toggle, Lightbox nav/close, Navbar links) | Padded to ≥44px / added `py-2 -my-2` |
| Tap delay on touch | Global `button, a { touch-action: manipulation }` |

### Page Pattern

**Pattern Name:** Scroll-Triggered Storytelling

- **Conversion Strategy:** Keep the narrative understandable without scroll-driven effects. Use progress indicator. Mobile: simplify animations. Keep DOM reading order complete; disable parallax and scroll-scrub under reduced motion. Pause scroll animation when offscreen or hidden and render each chapter in its final readable state under reduced motion.
- **CTA Placement:** End of each chapter (mini) + Final climax CTA
- **Section Order:** Intro hook > Chapter 1 (problem) > Chapter 2 (journey) > Chapter 3 (solution) > Climax CTA

**Applied to this project's actual sections:**

| Pattern role | Section | Notes |
|---|---|---|
| Intro hook | Hero | |
| — orientation | PersonalSnapshot | Hero-adjacent, not a numbered chapter — its tiles double as anchor links into the chapters below |
| Chapter 1 (journey/problem) | Journey | Moved ahead of Projects so causality reads correctly |
| — bridge/payoff | EngineeringImpact | Stats sourced verbatim from Journey + Projects copy |
| Chapter 2 (solution/proof) | Projects | |
| Supporting evidence | Skills, Research | Research's accent moved purple→pink to avoid a same-color clash with adjacent Skills |
| Climax CTA | Footer | |

---

## Motion

**Scroll Reveal** (Standard) — Trigger: scroll (viewport enter) | Duration: 400-600ms | Easing: `power2.out`

```js
gsap.from(el.children, { opacity: 0, y: 24, duration: 0.5, stagger: 0.08, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%' } });
```

**Framework notes:** In React use useGSAP(() => {...}, { scope: containerRef }) from @gsap/react to auto-cleanup on unmount; Use matchMedia('(prefers-reduced-motion: reduce)') to skip non-essential motion and render the final state immediately

- ✅ Scope the ScrollTrigger to the section container so it doesn't re-scan the whole page
- ❌ Don't stagger more than ~8 children; beyond that the last items feel laggy
- ⚡ Set scroller/markers: false in production; markers is dev-only

---

## Applied Motion Presets (this project)

No animation library was introduced — this project's animation was already hand-rolled
(CSS transitions/keyframes + IntersectionObserver + raw `requestAnimationFrame`), and
that approach was kept. The timing/easing values below are pulled from the skill's
`gsap` domain data and applied as literal CSS values to the existing implementation,
not as GSAP calls.

| Preset (skill source) | Values | Applied to |
|---|---|---|
| Scroll Reveal (Subtle) | `opacity/transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94)`, 12px translate | Every section's IntersectionObserver-triggered reveal: `PersonalSnapshot.tsx` (`.snap-item`, `.tile`), `Journey.tsx` (`.j-head`, `.j-item`), `Projects.tsx` (`.animate-item`), `EngineeringImpact.tsx` (`.impact-item`), `Skills.tsx` (`.s-item`), `Research.tsx` (`.animate-item`) |
| Stagger List (Subtle) | `0.03s` step per item, capped at `Math.min(i,5)*0.03s` | Same files as above, on the per-item `transitionDelay` |
| Hover Micro-interaction (Standard) | lift+scale, `y:-4 scale:1.02`, ~200-300ms, bouncy overshoot kept | `.card-tilt` (`globals.css`) and `.j-card` (`Journey.tsx`) — duration tightened `0.42s → 0.3s`, easing (`cubic-bezier(0.34,1.32,0.64,1)`) kept as the site's tactile signature |
| Hover Micro-interaction (Subtle) | `y:-1 opacity:0.9`, 150-200ms | Skills chip hover — already matched this preset, no change needed |
| Magnetic Hover — anti-pattern note | "Don't apply to more than 1-2 focal elements per screen" | `MagneticIcon` usage reduced from ~40+ call sites (Skills chips, Projects tag chips, 5 PersonalSnapshot tiles) to exactly one (PersonalSnapshot's "Studying" lead tile) |
| Interactive Cursor Design — reduced-motion requirement | `matchMedia('(prefers-reduced-motion: reduce)')` | Added to `CustomCursor.tsx`'s rAF loop — the one motion system in the codebase that CSS-level `prefers-reduced-motion` couldn't reach, since it drives everything via raw `style.transform` writes rather than CSS transitions |

---

## Anti-Patterns (Do NOT Use)

- ❌ Corporate templates
- ❌ Generic layouts

### Additional Forbidden Patterns

- ❌ **Emojis as icons** — Use SVG icons (Heroicons, Lucide, Simple Icons)
- ❌ **Missing cursor:pointer** — All clickable elements must have cursor:pointer
- ❌ **Layout-shifting hovers** — Avoid scale transforms that shift layout
- ❌ **Low contrast text** — Maintain 4.5:1 minimum contrast ratio
- ❌ **Instant state changes** — Always use transitions (150-300ms)
- ❌ **Invisible focus states** — Focus states must be visible for a11y

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons from consistent icon set (Heroicons/Lucide)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No content hidden behind fixed navbars
- [ ] No horizontal scroll on mobile
