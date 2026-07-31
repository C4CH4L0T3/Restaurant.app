---
name: Melli's — Brasa Editorial
description: A warm, dark food-broadsheet — monospace ledgers meet a quirky grotesque over ember, wine and gold.
colors:
  ink: "#100c0a"
  ink-2: "#17110d"
  surface: "#1c1510"
  surface-2: "#241a14"
  line: "#392a20"
  cream: "#f4ece0"
  muted: "#b4a08c"
  faint: "#8a7663"
  ember: "#ee6c2b"
  ember-2: "#f28c2a"
  gold: "#e5b567"
  wine: "#7c2f2f"
  wine-2: "#e79a8f"
  leaf: "#86b06a"
typography:
  display:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 8vw, 7rem)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4vw, 3rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Spline Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  mono:
    fontFamily: "Spline Sans Mono, ui-monospace, monospace"
    fontSize: "1.125rem"
    fontWeight: 600
    letterSpacing: "-0.01em"
  label:
    fontFamily: "Spline Sans Mono, ui-monospace, monospace"
    fontSize: "0.68rem"
    fontWeight: 500
    letterSpacing: "0.22em"
rounded:
  sm: "0.5rem"
  md: "0.75rem"
  lg: "1rem"
  xl: "1.5rem"
  xl2: "1.75rem"
  full: "9999px"
spacing:
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1rem"
  lg: "1.5rem"
  section: "6rem"
  container: "80rem"
components:
  button-primary:
    backgroundColor: "{colors.ember}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "0.875rem 1.75rem"
  button-cream:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "0.5rem 1rem"
  button-ghost:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.cream}"
    rounded: "{rounded.full}"
    padding: "0.875rem 1.5rem"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.cream}"
    rounded: "{rounded.xl}"
    padding: "1rem"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.cream}"
    rounded: "{rounded.full}"
    padding: "0.75rem 1rem"
  chip-filter:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.muted}"
    rounded: "{rounded.full}"
    padding: "0.25rem 0.75rem"
---

# Design System: Melli's — Brasa Editorial

## Overview

**Creative North Star: "Brasa Editorial"**

Melli's looks like a food broadsheet printed at midnight next to the grill: a warm, near-black page where the heat of live coals meets the cool precision of a design studio. The emotional job is appetite — the room is dim, the ember glows, the photography is the light source — but the *method* is editorial and technical. Numbers, times, coordinates and micro-labels are set in a monospace "ledger" hand, headlines shout in a quirky grotesque, and sections are seamed together by wavy solid-color contour lines like a topographic map of flavor.

Density is generous and confident, not busy. Surfaces stay flat and matte with hairline seams; the only real light in the system is the ember accent and the photography it frames. It is bold where it counts (monumental uppercase headlines, a single loud accent) and restrained everywhere else (calm neutrals, technical labels, no decorative noise).

This world was chosen *against* the generic "AI dark SaaS" look. It explicitly rejects purple/blue gradient meshes, soft glow blooms as background atmosphere, and safe system fonts.

**Key Characteristics:**
- Warm charred-black canvas, ember as the one loud voice
- Monospace ledger for every number, price and micro-label
- Quirky grotesque headlines, uppercase and monumental
- Wavy solid-color contour lines as section seams (never glows)
- Flat, matte, hairline-bordered surfaces; film-grain texture

## Colors

A warm, low-key palette: charred neutrals carrying cream text, lit by a single ember accent with wine and gold in support and one green reserved for "go".

### Primary
- **Live Ember** (#ee6c2b): The one loud voice. Primary CTAs, the active category pill, key prices, links, focus rings, and the accent word in headlines. Its rarity is the point.
- **Flame Orange** (#f28c2a): A half-step brighter ember (#f28c2a) used only inside gradients and hover shifts of the primary, never on its own.

### Secondary
- **Brioche Gold** (#e5b567): Warm counter-accent for the "más vendido/nuevo" badges, loyalty/reward moments, and the mid-stop of the headline gradient. Softer and more premium than ember.
- **Oxblood Wine** (#7c2f2f): Deep supporting accent for "picante" cues and one of the three contour-line hues. Adds heat without brightness.
- **Ember Blush** (#e79a8f, `wine-2`): The light wine tint — the only legible-on-dark red. Used for "picante" text, error/invalid states, and negative figures (e.g. the 28% commission). Belongs to the wine family; never a standalone new accent.

### Tertiary
- **Open-Sign Green** (#86b06a): Reserved strictly for state — "Abierto ahora", availability dots, success, and positive deltas. Never decorative.

### Neutral
- **Charred Night** (#100c0a): The page. The base background behind everything.
- **Smoked Charcoal** (#17110d): Alternating section bands and drawers/modals.
- **Cast-Iron Brown** (#1c1510): Card and input surfaces (often at ~50% over the page).
- **Seared Umber** (#241a14): Raised sub-surfaces (toggles, insets).
- **Ember Ash** (#392a20): Every hairline — borders, dividers, table rules.
- **Warm Cream** (#f4ece0): Primary text and high-contrast fills (e.g. the cream pill).
- **Toasted Almond** (#b4a08c): Secondary text, descriptions.
- **Faded Cocoa** (#8a7663): Tertiary text, meta, placeholders.

### Named Rules
**The One Ember Rule.** Live Ember covers ≤ 12% of any screen. If two things are ember, one of them is wrong — demote it to cream, a hairline, or gold.
**The Green Means Go Rule.** Open-Sign Green is only ever state (open / available / success / positive). It never styles a heading, button, or decoration.

## Typography

**Display Font:** Bricolage Grotesque (fallback: ui-sans-serif, system-ui)
**Body Font:** Spline Sans (fallback: ui-sans-serif, system-ui)
**Label / Mono Font:** Spline Sans Mono (fallback: ui-monospace, monospace)

**Character:** A quirky contemporary grotesque with real personality, paired with a neutral humanist body and a technical monospace. The tension between the expressive display and the deadpan mono ledger *is* the brand.

### Hierarchy
- **Display** (Bricolage, 800, clamp(2.5rem, 8vw, 7rem), line-height 0.9, tracking -0.03em, UPPERCASE): Hero headlines only. Revealed line-by-line from a mask.
- **Headline** (Bricolage, 600, clamp(2rem, 4vw, 3rem), tracking -0.02em): Section titles ("Arma tu pedido").
- **Title** (Bricolage, 600, 1.125–1.375rem): Card and product names, dialog titles.
- **Body** (Spline Sans, 400, 1rem, line-height 1.6): Descriptions and paragraphs; cap measure ~60ch.
- **Mono** (Spline Sans Mono, 600, 1–2rem, tracking -0.01em): Every price, total, time, count, and KPI value.
- **Label** (Spline Sans Mono, 500, 0.68rem, letter-spacing 0.22em, UPPERCASE): Eyebrows and micro-labels (`.label-mono`), often prefixed with a small ✦ marker.

### Named Rules
**The Mono Ledger Rule.** If it is a number that matters — a price, total, duration, calorie count, rating, KPI — it is set in Spline Sans Mono. The grotesque never sets a price.
**The Shout in Grotesque Rule.** Bricolage is for headlines and titles only; it never sets body copy or labels. The hero shouts in uppercase.

## Layout

Mobile-first, single-column by default, expanding to 2- and 4-column grids at `sm`/`lg`. Content lives in an 80rem (`max-w-7xl`) centered container with 1.25rem gutters. Vertical rhythm is a 4rem→6rem section cadence (`py-16`/`py-24`). Sections alternate between Charred Night and Smoked Charcoal bands to create reading rhythm; the seams between them are contour dividers, not hard edges. Product and review grids scroll horizontally on mobile (snap) and become grids on desktop. Breakpoints follow Tailwind defaults (sm 640, md 768, lg 1024).

## Elevation & Depth

Flat and matte by default. Depth comes from tonal layering (page → section band → card surface → raised sub-surface) and hairline seams, plus a fixed film-grain overlay — **not** from ambient shadows. There are exactly two sources of light: the ember accent and the food photography.

### Shadow Vocabulary
- **Ember Glow** (`box-shadow: 0 0 0 1px rgba(238,108,43,0.4), 0 18px 60px -20px rgba(238,108,43,0.55)`): The primary CTA only. Signals "this is the action."
- **Card Spotlight** (radial ember at cursor, via `.spotlight::after`): Appears on card hover, following the pointer. State, not rest.
- **Glass** (`backdrop-filter: blur(16px) saturate(1.3)` over `ink/72%`): Sticky nav, drawers, floating tags.

### Named Rules
**The Flat-Until-Hot Rule.** Surfaces are flat at rest with a 1px Ember-Ash border. The only glow in the system is the ember-glow on the primary CTA and the card cursor-spotlight — both are responses to importance or hover, never decoration.
**The No-Bloom Rule.** No colored gradient blooms or mesh as background atmosphere. The background is solid Charred Night + grain. (Explicitly rejected as generic.)

## Shapes

Two radii languages. **Actions are fully round:** every button, pill, chip, badge and toggle is a 9999px capsule. **Containers are softly rounded:** cards and modals use large radii (1.5rem `rounded-3xl`, up to 1.75rem `--radius-xl2`; sheets 2rem). Nothing is sharp-cornered except 1px hairline rules. The system's signature geometry is the **wavy contour line**: three interweaving sine-stroked paths in ember/gold/wine that seam one section into the next.

### Named Rules
**The Contour Seam Rule.** Sections are separated by wavy solid-color contour lines (the WaveDivider), never by glows, hard bars, or empty space alone. The wave dips into both adjacent sections.

## Components

### Buttons
- **Shape:** Full capsule (9999px).
- **Primary:** Live Ember fill, ink text, `0.875rem 1.75rem` padding, carries Ember Glow. The single most important action per view.
- **Cream:** Warm Cream fill, ink text — the nav "Pedido" and high-emphasis neutral action.
- **Ghost / Secondary:** Cast-Iron surface at ~40% with a 1px Ember-Ash border, cream text; border brightens to Faded Cocoa on hover.
- **Hover / Focus:** Transform-only (scale 1.02 / translateY -2px, `active:scale-95`), 150–200ms, `cubic-bezier(0.23,1,0.32,1)`. Focus-visible = 2px ember ring, 3px offset. Primary CTAs may be wrapped in a magnetic drift toward the cursor.

### Chips
- **Category pill:** Unselected = Cast-Iron surface, Toasted Almond text, hairline border. Selected = the ember gradient slides underneath via a shared-layout indicator (`layoutId`), text turns ink. Leads with a custom SVG culinary icon.
- **Filter chip:** Unselected hairline/muted; selected inverts to Warm Cream fill with ink text.
- **Diet/tag badge:** Tiny hairline capsule tinted per meaning (ember=top, gold=nuevo, wine=picante, leaf=veggie, cream=sin gluten) with an inline SVG glyph.

### Cards / Containers
- **Corner Style:** 1.5rem (`rounded-3xl`).
- **Background:** Cast-Iron Brown at ~50% over the page band.
- **Border:** 1px Ember Ash hairline, brightening toward ember at ~40% on hover.
- **Shadow Strategy:** Flat at rest (see Elevation). On hover: lift (translateY -6px), ember cursor-spotlight, an ember drop-glow, and the title shifts to ember.
- **Internal Padding:** 1rem (`p-4`).

### Inputs / Fields
- **Style:** Cast-Iron surface, 1px hairline, full-round for search / 0.75rem for text areas, cream text, Faded Cocoa placeholder.
- **Focus:** Border shifts to Ember at ~60%; the leading search icon tints ember. No glow.

### Navigation
- **Style:** Fixed, transparent at top → Glass with a hairline underline once scrolled. Links are Toasted Almond with a `.underline-grow` ember underline that wipes in on hover; cart button is a Warm Cream pill with a spring-popping ember count badge. A 2px ember→gold→ember scroll-progress bar rides the bottom edge.

### Signature Components
- **WaveDivider:** Three interweaving sine-stroked contour lines (ember/gold/wine, solid) that straddle the seam between sections and draw themselves in on scroll (`pathLength`).
- **Preloader:** Full-screen intro — sequenced words rising (BRASA→SABOR→MESA→DIRECTO→MELLI'S), a mono `000→100` counter with an ember progress hairline, then a clip-path wipe reveal. Once per session; skipped for reduced-motion.
- **Pedestal Hero:** A circular product photo floating over a hairline pedestal ellipse, wrapped in slow rotating dashed rings (gold + ember), with a mono annotation tag.
- **Mono micro-label (`.label-mono`):** The recurring editorial eyebrow — uppercase Spline Sans Mono, 0.22em tracking, ✦ marker.

## Do's and Don'ts

### Do:
- **Do** set every price, total, time, count, rating and KPI in Spline Sans Mono (The Mono Ledger Rule).
- **Do** keep Live Ember to ≤12% of a screen and let cream + hairlines carry the rest (The One Ember Rule).
- **Do** seam sections with wavy solid-color contour lines that dip into both sides (The Contour Seam Rule).
- **Do** keep surfaces flat and matte with 1px Ember-Ash hairlines; reserve glow for the primary CTA and card hover.
- **Do** use the custom SVG culinary icon set; set hero headlines in uppercase Bricolage.
- **Do** honor `prefers-reduced-motion` — infinite motion and the preloader must stand down.

### Don't:
- **Don't** use gradient glow blooms or a color mesh as background atmosphere (The No-Bloom Rule — rejected as generic/AI).
- **Don't** use emoji as UI icons; use the SVG set.
- **Don't** set a price or number in the grotesque or a serif — mono only.
- **Don't** add resting drop-shadows to cards, or introduce accent colors outside ember / gold / wine / leaf.
- **Don't** reach for generic fonts (Inter, Roboto, Playfair) or a purple/blue palette.
