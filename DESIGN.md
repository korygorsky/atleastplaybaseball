# Design

## Intent

Editorial restraint over persuasion. This is a document, not a campaign page. The reading experience should feel closer to a well-typeset newspaper correction than to an advocacy site. Cool neutrals plus a single blue accent read as civic, not partisan.

## Voice in visual form

Restraint is the argument. The mission depends on being believed — and visual restraint signals that the site is not trying to move the reader with design, only with evidence. That means:

- Flat radii, no gradients, no glassy effects.
- No stock imagery. The only illustrations are the simple thematic motifs (diamond, turtle, paddle-bat) rendered as minimal SVG.
- No "shocking fact" callouts, no stat-counters, no urgency patterns.
- One accent color. Rideau blue does all the work.

Ornamentation would undercut the thesis that we are just showing the record.

## Tokens

All tokens live in [src/styles/colors_and_type.css](src/styles/colors_and_type.css). Use the variables — do not hardcode values.

### Color

- **Neutrals:** `--paper` `#F7F5F0`, `--paper-sunk` `#EFEBE2`, `--ink` `#1C1D1F` through `--ink-05`. `--ink-60` is deliberately darkened for AAA contrast on paper — do not lighten it.
- **Accent:** `--rideau` `#3E6B7A`, `--rideau-deep` `#2D4F5B`, `--rideau-wash` `#E4ECEF`. This is the only accent. Do not introduce a second.
- **Category pills:** substantive, skeptical, cultural, coded, pushback. All cool-leaning. Never warm, never alarming — the classification is meant to inform, not accuse.
- **Data-viz ramp:** `--viz-1` through `--viz-5`, a single-hue Rideau ramp. No rainbow scales.

### Type

- **Source Serif 4** — body prose.
- **Instrument Serif** — display/italic pull-quotes.
- **Inter** — headings, eyebrows, UI.
- **JetBrains Mono** — data, counts, timestamps.

The scale is fluid (`clamp()`) from `--fz-eyebrow` (12px) through `--fz-display` (up to 64px). There are no breakpoint jumps — sizes interpolate with viewport width.

Line-height: `--lh-body` 1.6, `--lh-heading` 1.15, `--lh-tight` 1.05. Tracking: `--tr-tight` -0.02em for headings, `--tr-eyebrow` 0.12em for eyebrows.

### Spacing

8px rhythm, `--s-1` (4px) through `--s-10` (128px). Use the scale; do not invent values.

### Measure

- `--measure-prose` 640px — body copy.
- `--measure-wide` 960px — wider editorial blocks.
- `--measure-full` 1200px — page container cap.

### Radius

`--r-0` 0, `--r-1` 2px. Editorial = flat. No rounded cards.

### Motion

`--dur-hover` 150ms, `--dur-nav` 200ms, `--dur-reveal` 400ms. Easing is `--ease-out` — no springs, no bounces. Respect `prefers-reduced-motion`.

### Focus

`--focus-ring` is a 2px Rideau outline at 2px offset, applied to every focusable element via `*:focus-visible`. Do not remove it per-component.

## Component patterns

- One `.astro` component per numbered section (01–10), composed in `src/pages/index.astro`.
- Data for list-like sections (Concerns, Questions, etc.) lives in the component's frontmatter, not inline JSX.
- Styles are scoped to each `.astro` component. Only truly global rules live in [src/styles/site.css](src/styles/site.css).
- Minimal client JS — any interactivity is a small inline script at the bottom of the component.

## Accessibility

- AAA contrast on body copy (the `--ink-60` value exists at this level deliberately).
- Focus ring on every interactive element.
- `prefers-reduced-motion` disables transitions and reveal animations.
- All images and motifs have `alt` text or are marked decorative.
- Form errors are announced, not just colored.

## What this design will never do

- No dark-mode toggle. The paper metaphor is load-bearing.
- No stock imagery or photography.
- No gradients, no glassmorphism, no neumorphism.
- No emoji in body copy or UI.
- No marketing-style "hero stat" counters.
- No second accent color, no warm alarm colors.
- No sticky CTAs, no modals, no newsletter capture, no social share bar.

If a design choice would make the site feel like it is trying to sell the reader something, it is wrong for this project.
