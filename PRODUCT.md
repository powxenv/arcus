# PRODUCT.md — Arcus

## What it is
Arcus is a personality-assessment product that measures personality as a **curve with a direction**. Every result has a position (where you stand) and a direction (where you're heading). Four independent assessments map energy, thinking, identity, and time; a fifth — the Full Arc — composes all four into one profile. The name is Latin for *arc*.

## Register
**Product.** Design serves the product: users are in a task (taking a test, reading their result). Familiarity is the bar, not novelty. Restrained palette, motion that conveys state, one type family. See `.agents/skills/impeccable/reference/product.md`.

## Surfaces
- `/` Home, `/about`, `/theory`, `/start` — content surfaces explaining the model and the four tests.
- `/assessment/$key` — per-assessment detail page (content-heavy).
- `/assessment/$key/take`, `/arc/take` — question flows (client-rendered).
- `/shared/$token` — the persistent result page (owner view + shareable). **The payoff surface.** This is where the arc visualization lives.

## Palette (from the HeroUI theme)
- Background: `oklch(97.02% 0 0)` — a true near-white, zero chroma (NOT warm cream).
- Accent: `oklch(62.04% .195 253.83)` — a vivid blue. Used for primary actions, the user's own data mark, and current selection only.
- Ink: `--default-foreground` (`--eclipse`, near-black). Muted text on `--default-400/500/600`.
- Surface cards: white (`bg-white`) with `0.5px default-200` borders.
- Access via Tailwind classes (`bg-accent`, `text-default-500`) or CSS vars (`var(--accent)`, `var(--default-200)`).

## Type
DM Sans Variable (one family, multiple weights). Tight tracking (`tracking-tighter` globally). Fixed rem scale (product UI, not fluid). Headlines `text-4xl sm:text-5xl font-black`.

## Design principles
1. **Position + direction is the whole product.** Every result should make both legible. The arc visualization is the namesake feature — keep it faithful to the data, not decorative.
2. **Restraint.** Accent is a mark, not decoration. White surfaces, hairline borders, one accent color.
3. **Honesty over polish.** Results note when a type is a soft fit ("boundary"), when facets pull against each other, and that the synthesis is unvalidated. Never dress up uncertainty.
4. **Data shapes differ by test.** Circumplex tests (Solstice, Pride) have 2-axis geometry; dimensional tests (Turing, Passage) have independent scales. Visualize each faithfully rather than forcing one generic chart.
