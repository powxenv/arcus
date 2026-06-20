# DESIGN.md

## Theme
Light mode. Fun, vibrant, warm. Friendly, not aggressive. Bold type, generous whitespace, purposeful color.

## Color palette (OKLCH)

### Neutrals
- `--bg`: oklch(0.985 0.003 75) — warm off-white (not cream)
- `--surface`: oklch(0.995 0.001 75) — near-white for cards
- `--surface-2`: oklch(0.96 0.004 75) — subtle warm gray
- `--ink`: oklch(0.23 0.015 260) — deep cool charcoal
- `--ink-2`: oklch(0.45 0.01 260) — muted text (passes 4.5:1 on bg)
- `--ink-3`: oklch(0.62 0.008 260) — tertiary text (passes 3:1 on bg for large)

### Brand
- `--brand`: oklch(0.55 0.20 28) — warm vermillion (Arcus primary, replaces purple)

### Test colors
- `--solstice`: oklch(0.62 0.19 38) — coral
- `--turing`: oklch(0.58 0.13 225) — teal
- `--pride`: oklch(0.55 0.22 0) — magenta-pink
- `--passage`: oklch(0.55 0.14 165) — green

### States
- `--focus`: oklch(0.55 0.20 28) — brand color for focus rings
- `--hover`: oklch(0.96 0.004 75) — surface-2

## Typography
- One family: system-ui / Inter stack. No display font pairing.
- Fixed rem scale, ratio ~1.2
- Body: 1rem, line-height 1.6
- Headings: 600-800 weight, letter-spacing -0.02em on large

## Components
- Buttons: 12px radius, 0.75rem padding, 600 weight
- Cards: 16px radius, subtle shadow (0 2px 8px rgba(0,0,0,0.06))
- Inputs/pips: 50% radius (circles), clear selected state
- Progress: thin bar, test-colored fill

## Layout
- Max content width: 680px (quiz, results), 960px (home grid)
- Generous vertical spacing: 2-4rem between sections
- Mobile-first, responsive grid for test cards

## Motion
- 200ms ease-out for transitions
- Question transitions: slide + fade, 250ms
- No bounce, no elastic
- `prefers-reduced-motion`: instant transitions

## Iconography
- Emoji as test icons (accessible, universal, fun)
- Minimal icon use elsewhere
