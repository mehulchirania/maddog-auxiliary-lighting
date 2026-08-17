# Maddog redesign — build brief

Shared context for everyone working on this repo. Read it fully before writing code.

## What this is

A **frontend-only demo** of a redesigned maddog.co.in, to be deployed to Vercel and
sent to the client for review. All data is mocked in `lib/`. There is no backend,
no cart, no checkout. "Add to cart" buttons are decorative — style them, wire them
to nothing.

Maddog Industries makes auxiliary motorcycle lights in Bangalore. Real brand, real
products, real specs.

## The design direction — read this twice

**Instrument-grade, not cinema-grade.**

The reference set is Baja Designs, Peak Design, Knipex, Garmin, Leica. Brands whose
premium feel comes from *showing you the engineering*. It is explicitly **NOT**
Apple/DJI lifestyle marketing — no drone-shot mountain roads, no "adventure awaits"
copy, no stock photos of riders silhouetted against sunsets.

Three things make this brand credible, and the design exists to serve them:

1. **The beam.** Maddog has 8000×4000 photometric diagrams no competitor shows well.
   Spec numbers are the hero imagery. Big tabular figures, treated like instrument
   readouts.
2. **The anti-glare position.** Maddog was first in India with anti-glare TIR optics
   at 5000K, explicitly designed so it does not blind oncoming traffic. In a market
   full of blinding grey-import LEDs, "engineered to be seen with, not seen through"
   is the ownable idea.
3. **No discounts, ever.** The brand's own stated policy is "never to overprice nor
   provide discounts and no compromise on quality." Treat this as a feature, never
   hide it. No fake urgency, no strikethrough prices, no "SALE" badges anywhere.

### Tone of copy

Plain, exact, confident. Short sentences. Numbers over adjectives. Never
"unleash", "elevate", "experience", "adventure awaits", "game-changing". If a claim
can be stated as a measurement, state it as a measurement.

Sentence case for headings. Indian English. Prices as `₹12,750`.

## Stack and conventions

- **Next.js 16.3** App Router, **React 19.2**, **TypeScript**, **Tailwind CSS v4**.
- `output: "export"` — static export. **No server actions, no route handlers, no
  dynamic server rendering.** Dynamic routes need `generateStaticParams`.
- `trailingSlash: true` — always write internal links with a trailing slash
  (`/lights/`, `/products/rage/`).
- Next 16 breaking changes: `params` and `searchParams` are **Promises** and must be
  awaited. Use the generated `PageProps<'/route'>` / `LayoutProps<'/'>` type helpers.
  If unsure about an API, read `node_modules/next/dist/docs/` — it is version-matched
  and authoritative. Do not rely on memory of older Next.js.
- Images: `next/image` is configured `unoptimized` (static export). CloudFront is
  allowlisted in `remotePatterns`. Plain `<img>` is also fine; always set explicit
  `width`/`height` or aspect classes to avoid layout shift.
- Tailwind v4 uses `@theme` in `app/globals.css`. There is no `tailwind.config.js`.

## Design tokens

Defined in `app/globals.css`. **Use these — never hardcode hex values.**

| Purpose | Classes |
|---|---|
| Page background | `bg-ink-900` (base), `bg-ink-950` (deepest) |
| Raised surfaces | `bg-ink-850`, `bg-ink-800`, `bg-ink-700` |
| Borders | `border hairline` (the default hairline), `border-ink-600`, `border-ink-500` |
| Primary text | `text-bone` |
| Secondary text | `text-fog-300`, `text-fog-400` |
| Muted / labels | `text-fog-500`, `text-fog-600` |
| Signal accent | `text-signal-500`, `bg-signal-500`, `border-signal-500` |
| Beam / warm white | `text-beam-200`, `bg-beam-200` (5000K colour) |

Helper classes:

- `.tnum` — **use on every spec number.** Monospace, tabular figures so columns align.
- `.eyebrow` — the small uppercase mono label above section headings.
- `.hairline` — the standard 9%-white border colour.
- `.reveal` — handled by `<Reveal>`; don't apply manually.

Signal red is an **accent**, not a fill. Use it for one thing per view — an active
state, a single CTA, a key figure. A red-heavy page is wrong.

## Shared components — use these, don't reinvent

```tsx
import Container from "@/components/ui/Container";        // page gutter; `wide` prop for 1600px
import SectionHeading from "@/components/ui/SectionHeading"; // eyebrow + title + lede
import Cta from "@/components/ui/Cta";                    // variants: solid | outline | quiet
import Reveal from "@/components/ui/Reveal";              // scroll-in animation wrapper
import { cn } from "@/lib/cn";                            // class joiner
```

## Data — all mocked, all real values

```ts
import { products, lights, ladder, getProduct, formatPrice } from "@/lib/products";
import { bikes, brands, bikesForBrand, getBike } from "@/lib/fitment";
import { creators, testimonials, aggregate } from "@/lib/proof";
```

`ladder` is the six aux lights sorted ascending by lumens — Scout, Scout-X, Delta,
Alpha, Lycan, Rage. Note **Rage has more lumens than Lycan but costs less**: Lycan's
premium is independent spot/flood switching plus an included harness and switch. Any
comparison UI must make that legible rather than looking like a pricing error.

**Every spec in `lib/` was taken from the live site. Do not invent, round, or
"improve" any number, price, rating or review count.** The client will read these
closely. If you need a value that isn't in the data, leave it out.

## Layout rhythm

- Sections: `py-24 sm:py-32` (there is also a `section` spacing token = 7rem).
- Full-bleed dark bands alternating with contained content works well here.
- Generous whitespace. This is a premium brand — crowding kills it.
- Headings use `clamp()` for fluid sizing; see `SectionHeading`.

## Accessibility and quality bar

- Real semantic HTML. One `<h1>` per page.
- All interactive elements keyboard-reachable with visible focus.
- `prefers-reduced-motion` is already respected by `.reveal`; honour it in any custom
  animation you add.
- Must look correct at 375px, 768px and 1440px. Mobile is ~85% of Indian traffic —
  **design mobile-first, and never let the page scroll horizontally.**
- Images need real `alt` text.

## Placeholder assets

The night-shoot photography does not exist yet — that's a separate production step.
Where the design calls for a night road scene, **build it synthetically with CSS
gradients / SVG** and make it look deliberate. Do not use stock photos and do not
reference image files that aren't in the repo.

Product photography **is** real and available via the CDN URLs in `lib/products.ts`.

## Rules

- Do not modify files outside the ones assigned to you. Others are working in
  parallel in this same repo.
- Do not edit `app/globals.css`, `app/layout.tsx`, `lib/*`, `components/ui/*`,
  `components/site/*`, or `next.config.ts` — they are shared. If you genuinely need
  a change there, say so in your final report instead of making it.
- Do not add npm dependencies. Everything here is buildable with what's installed.
- Run `npx tsc --noEmit` before you finish and fix any errors in your own files.
