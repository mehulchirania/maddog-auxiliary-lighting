# Maddog demo — design audit and redesign handoff

Audit date: 2026-08-16. Measured against the running build at `localhost:3000`, viewport 1440×900.

Everything in Part 1 is measured, not opinion. Methodology: each route loaded in an isolated
same-origin iframe, then walked the DOM reading **computed** styles (not source classes) for
every element with direct text content. Code-level counts come from `grep` across `app/` and
`components/`.

---

## Part 1 — What's actually wrong

### 1.1 The site has no typographic hierarchy at all

This is the single biggest cause of "looks clumsy / not designed", and it's one line of data:

| Metric | Value |
|---|---|
| `font-medium` usages across entire codebase | **4** |
| `font-semibold` usages | **0** |
| `font-bold` usages | **0** |
| Font weights rendered on homepage | **400 only** |

The 74px hero headline is the **same weight** as a 13px caption. Archivo is a variable font
with a 100–900 range and the design uses exactly one value of it. Weight is the primary tool
for hierarchy in modern type systems, and it is entirely unused.

This alone makes large text read as *thin and generic* rather than confident. Fixing only this
would change the site's character more than any other single change.

### 1.2 There is no type scale — 13 competing bespoke ones

| Metric | Value |
|---|---|
| Distinct arbitrary `text-[…]` values in source | **30** |
| Distinct bespoke `clamp()` heading formulas | **13** |
| Distinct font sizes rendered on homepage | **18** (10,11,12,13,14,15,16,17,18,19,22,24,27,46,50,54,58,74) |
| Usages of Tailwind's built-in scale (`text-sm`, `text-base`…) | **0** |

Every component invented its own fluid sizing. There is a `text-[11.5px]` in there. Thirteen
separate `clamp()` formulas means thirteen different opinions about how type should scale.

### 1.3 Six section headings all shout at the same size

Homepage heading sizes, in document order: **74, 50, —, 58, 50, 50, 50, 50, —**

Five sections use an identical 50px/weight-400 heading. Nothing signals which section matters.
A reader scanning the page gets no hierarchy — every band claims equal importance, which is
exactly the "too much stuff" sensation. It isn't the amount of content; it's that none of it is
subordinated.

### 1.4 The homepage is stretched, not dense

| Route | Height | Viewports | Words | px per word |
|---|---|---|---|---|
| `/` | **11,964px** | **13.3** | 826 | 14.5 |
| `/products/rage/` | 5,899px | 6.6 | 253 | **23.3** |
| `/technology/` | 6,176px | 6.9 | 863 | 7.2 |
| `/lights/` | 5,579px | 6.2 | 438 | 12.7 |
| `/proof/` | 2,827px | 3.1 | 283 | 10.0 |
| `/fit/` | 1,518px | 1.7 | 152 | 10.0 |

Thirteen viewports of scrolling for 826 words. The page isn't information-rich, it's inflated —
whitespace substituting for design.

**Worst offenders on the homepage:**

| Band | Height | Viewports | Words | Images |
|---|---|---|---|---|
| `TechnicalTeardown` | **2,567px** | **2.9** | 61 | 4 |
| `RangeBanner` | 720px | 0.8 | **0** | 2 |

Those two bands are **27% of total page height for 61 words**. `RangeBanner` has no heading and
no text at all — nearly a full viewport of pure decoration.

### 1.5 No spacing rhythm

| Metric | Value |
|---|---|
| Distinct section `py-*` values | **8** (12,14,16,20,24,28,32) |
| Distinct `gap-*` values | **12** |
| Distinct computed top-paddings on homepage | **12** |
| Uses of the `--spacing-section` token I defined | **1** (the definition itself — dead code) |

A design system token was created and then never used. Every section picked its own padding.

### 1.6 Motion is a single trick repeated

| Metric | Value |
|---|---|
| `transition-colors` | 27 |
| `transition-transform` | 4 |
| `transition-all` | 1 |
| Distinct durations | 2 (`150`, `300`) |
| Distinct easings | 1 (`ease-out`) |
| `<Reveal>` on homepage | **11** |

All motion is: hover colour fades, plus the *same* fade-up-18px-over-700ms applied eleven times.
Uniform reveal-on-scroll applied to everything is the most recognisable signature of a templated
build. It reads as generic because it *is* generic.

### 1.7 Body text is too small

`text-[13px]` appears **35 times** — the single most-used size in the codebase. Combined with
23 usages of 10–11px text. 13px is a caption size; using it for body copy is a readability
problem before it's an aesthetic one.

### 1.8 Known accessibility defect (pre-existing)

`components/ui/Cta.tsx` solid variant: `bg-signal-500` + `text-bone` = **3.58:1** contrast at
~14px. WCAG AA requires 4.5:1. This is the primary CTA used sitewide (Hero, FitStrip, etc.).
`signal-600` on bone would pass. Not introduced by any single change — it's been there since the
token set was defined.

### 1.9 Information architecture is duplicated and unbalanced

- **Anti-glare content appears twice** — a homepage band *and* a `/technology/` section.
- **The system/wiring content appears twice** — homepage `TheSystem` *and* `/technology/`.
- **`/proof/` doesn't earn a page** — 283 words, 3.1 viewports, and its two components are
  already embedded on the homepage.
- **`/fit/` is the thinnest page (1.7 viewports, 152 words)** despite being positioned as a
  primary navigation concept and the main conversion tool.
- **Products are listed twice on the homepage** — `CategoryGrid` and the range ladder.

The homepage is currently trying to *be* every other page. That's the root of "not categorized
well".

### 1.10 Root cause

Four agents built in parallel against a brief that specified **colour tokens but no type scale,
no spacing scale, and no motion system**. Each component therefore invented its own. The colour
system is consistent because it was specified; everything else is inconsistent because it
wasn't. Any redesign that doesn't start by fixing the *system* will drift again.

---

## Part 2 — Redesign direction

### 2.1 Principle

The brand's credible claim is instrument-grade engineering. The design should feel like
**precision equipment**, not a landing page. Concretely that means: fewer, larger moments;
confident type; restrained motion that responds to input rather than decorating scroll.

The failure mode to avoid is the templated look — full-width hero, three feature cards, fade-up
on everything, gradient accents. The current build has drifted toward that. What pulls it back
is specificity: real spec numbers treated as the visual material, and one signature interaction
that no competitor has.

### 2.2 Type system (replaces all 30 arbitrary values)

Define once in `@theme`, use everywhere. Weight carries hierarchy, not just size.

| Token | Size | Weight | Tracking | Use |
|---|---|---|---|---|
| `display` | `clamp(2.75rem, 5.5vw, 4.5rem)` | **650** | `-0.03em` | Once per page, hero only |
| `h1` | `clamp(2rem, 4vw, 3rem)` | **600** | `-0.02em` | Page titles |
| `h2` | `clamp(1.5rem, 2.6vw, 2.125rem)` | **550** | `-0.015em` | Section heads |
| `h3` | `1.25rem` | **550** | `-0.01em` | Card titles |
| `body-lg` | `1.0625rem` | 400 | — | Ledes |
| `body` | `0.9375rem` | 400 | — | Default copy |
| `caption` | `0.8125rem` | 400 | — | Meta |
| `micro` | `0.6875rem` | 500 | `0.16em` | Eyebrows, uppercase |
| `stat` | `clamp(2rem, 4vw, 3.25rem)` | **500** | `-0.02em` | Spec figures, mono, tabular |

Key changes: section heads drop from 50px→~34px but gain weight 550, so they read *stronger*
while taking less space. Body rises 13px→15px. Nothing between `h2` and `display`.

### 2.3 Spacing system

Three section rhythms only — not eight:

```
--section-sm: 3.5rem   /* tight bands: finder strip, CTA row */
--section:    5.5rem   /* default */
--section-lg: 8rem     /* the one or two hero-scale moments */
```

Inner spacing on a 4pt scale, capped at: `4, 8, 12, 16, 24, 32, 48, 64`. Remove the 12-value
gap sprawl.

### 2.4 Motion system

Replace "fade-up everything" with role-differentiated motion:

| Element | Motion | Duration / easing |
|---|---|---|
| Hero | **None.** Never animate above-the-fold content in | — |
| Section heading | Fade + 8px rise | 400ms `cubic-bezier(.16,1,.3,1)` |
| Grid items | Same, **staggered 60ms** per child | 400ms |
| Images | Scale `1.03 → 1`, no translate | 600ms `ease-out` |
| Spec numbers | Count-up on first view | 900ms, ease-out |
| Hover (cards) | Border + 2px lift | 200ms |

Two rules: nothing moves more than 8px, and nothing above the fold animates in. The current
18px/700ms on everything is both too far and too slow.

**The signature interaction — scroll-linked beam.** As the hero scrolls, drive the beam's reach
from scroll progress so the light extends down the road as you descend. This is brand-specific,
uses the existing SVG geometry, and is the opposite of a template. Gate it behind
`prefers-reduced-motion` and `matchMedia('(min-width: 768px)')`.

### 2.5 Information architecture

**Homepage: 9 bands → 5.** Target ≤6 viewports (from 13.3).

| # | Band | Source | Rationale |
|---|---|---|---|
| 1 | Hero + beam comparison | keep | The signature. Only full-height moment. |
| 2 | Three categories | `CategoryGrid` | Primary navigation into the catalogue |
| 3 | One technical proof moment | condensed `TechnicalTeardown` | Cut 2,567px → ~900px. One render, not four. |
| 4 | Bike finder | `BikeFinderSection` | The conversion tool, given real weight |
| 5 | Closing: proof + pricing stance | merge `Proof` + `NoDiscounts` | Two thin bands become one strong one |

**Moved off the homepage:** `AntiGlare` and `TheSystem` → `/technology/` (where duplicates
already live). `RangeBanner` → delete or fold into the hero; a 720px band with zero words
cannot justify itself.

**Route changes:**

| Route | Action |
|---|---|
| `/lights/` | Keep as-is — strongest page in the build |
| `/products/[slug]/` | Keep. Tighten: 5,899px for 253 words is too sparse |
| `/technology/` | Absorb anti-glare + system content from home; becomes the deep page |
| `/fit/` | **Expand.** Thinnest page but highest commercial value |
| `/proof/` | **Merge into home + `/technology/`.** 283 words doesn't earn a nav slot |

Nav drops from 4 items to 3: Lights · Technology · Bike finder.

### 2.6 Component-level notes

- **Cards** — currently `gap-px` grid with 1px borders reading as a table. Give them real
  separation and a hover lift.
- **`Cta.tsx`** — fix the 3.58:1 contrast (`signal-600`), and add a genuine secondary variant;
  currently outline/quiet are barely differentiated.
- **Spec tiles** — the strongest existing asset. Push further: mono, tabular, weight 500,
  hairline rules between, count-up on reveal.
- **Product gallery** — 5,899px page for 253 words. Tighten to ~4,000px.
- **`SectionHeading.tsx`** — hardcodes `text-fog-300` and has no colour on its `<h2>`, so it
  breaks on light panels and can't be used there. Make it ground-aware (`tone="light" | "dark"`)
  instead of every light panel hand-rolling its own heading markup.

---

## Part 3 — Suggested order of work

1. **Type + spacing tokens in `@theme`** — nothing else lands properly until this exists.
2. **Sweep all 30 arbitrary `text-[…]` values onto the scale.** Mechanical, high impact.
3. **Apply weight hierarchy** (550–650 on headings). Biggest visual return per hour.
4. **Cut homepage 9 bands → 5**, move duplicated content to `/technology/`.
5. **Motion system** — replace uniform `<Reveal>` with role-based variants + stagger.
6. **Scroll-linked beam** — the signature moment. Do this only after 1–5 land.
7. **Fix `Cta` contrast** and the `SectionHeading` ground-awareness.
8. Re-run the contrast + overflow sweeps (Part 4).

Steps 1–3 are roughly half the perceived improvement and are low-risk mechanical changes.

---

## Part 4 — Regression checks to keep

These caught real bugs and should be re-run after any theme or layout change:

- **Contrast sweep.** Walk every element with direct text, compute `color` vs nearest opaque
  ancestor background, flag ratios < 2.5. **The parser must handle `oklab()`** — Tailwind v4
  emits it for any opacity-modified colour (`bg-paper-0/95`), and an `rgb()`-only parser silently
  skips those elements.
- **Overflow sweep.** `documentElement.scrollWidth − clientWidth` at 320/375/768/**1024**/1280/
  1440/1920. The 1024 breakpoint is where the last real overflow bug lived — not the narrowest
  width.
- **Grid `min-width: auto`.** Unpredictable content (long product names, 6-digit lumens) pushes
  grid tracks past their container even with `overflow-x-auto` on a descendant. `min-w-0` on
  item wrappers. See `components/product/HeadlineSpecs.tsx`.
- **Dark wrapper + text colour.** Any `bg-ink-*` wrapper needs an explicit `text-bone`; the
  inverse for `bg-paper-*`. Six wrappers were missing this and rendered invisible headings.

---

## Part 5 — Open questions for you

1. **Is 13.3 viewports acceptable at all, or is ≤6 the target?** Everything in 2.5 assumes ≤6.
2. **Does `/proof/` get merged away, or kept and expanded?** It currently can't justify a nav slot
   at 283 words, but you may have plans for more creator content.
3. **How far to push the scroll-linked beam?** It's the strongest anti-generic move available,
   but it's also the most work and the most likely to feel gimmicky if overdone.
4. **Photography.** Every finding above is within the constraint that all product shots are on
   pure white and there is no rider/lifestyle photography. A single night shoot would unlock the
   hero and remove the need for synthetic road art — that remains the highest-leverage
   non-code investment.
