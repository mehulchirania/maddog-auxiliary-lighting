import Container from "@/components/ui/Container";
import Cta from "@/components/ui/Cta";
import BeamCompare from "./BeamCompare";

/**
 * Hero section rules (§2.4):
 * - Nothing above the fold animates in. Reveal wraps removed from headline,
 *   lede and CTAs — they appear instantly at page load.
 * - BeamCompare and the fact grid remain below the fold and still reveal.
 *
 * Type hierarchy:
 * - h1 at display scale (--text-display, --fw-display 650, --ls-display)
 * - lede at body-lg (1.0625rem)
 * - fact values at stat scale (--text-stat, --fw-stat 500)
 * - fact labels use .eyebrow
 */

const FACTS = [
  { value: "5000K", label: "Anti-glare TIR optics" },
  { value: "IP67", label: "Sealed against water and dust" },
  { value: "18 months", label: "Replacement warranty" },
  { value: "Never discounted", label: "Stated pricing policy" },
];

export default function Hero() {
  return (
    <section
      className="bg-ink-900 text-bone relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-20"
      style={{ paddingBottom: "var(--section)" }}
    >
      <Container wide>
        {/* Above-fold content: no animation per §2.4 */}
        <p className="eyebrow">Maddog Industries — Bengaluru</p>
        <h1
          className="font-display mt-5 max-w-4xl leading-[1.03]"
          style={{
            fontSize: "var(--text-display)",
            fontWeight: "var(--fw-display)",
            letterSpacing: "var(--ls-display)",
          }}
        >
          You see it before you feel it.
        </h1>
        <p
          className="text-fog-300 mt-6 max-w-xl leading-relaxed"
          style={{ fontSize: "var(--text-body-lg)" }}
        >
          Maddog was first in India to fit anti-glare TIR optics at 5000K as
          standard, engineered so the beam lands on the road ahead of you, not
          in the eyes of the rider coming the other way.
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <Cta href="/fit/">Find lights for your bike</Cta>
          <Cta href="/lights/" variant="outline">
            See the range
          </Cta>
        </div>

        {/* Below-fold content: reveal is fine */}
        <div className="mt-16 sm:mt-20">
          <BeamCompare />
        </div>

        <dl
          className="border-ink-600 mt-14 grid grid-cols-2 border-t border-l sm:mt-16 sm:grid-cols-4"
        >
          {FACTS.map((f) => (
            <div
              key={f.label}
              className="border-ink-600 border-r border-b px-5 py-5 sm:px-6 sm:py-6"
            >
              <dt className="eyebrow">{f.label}</dt>
              <dd
                className="tnum text-bone mt-2 leading-none"
                style={{
                  fontSize: "var(--text-stat)",
                  fontWeight: "var(--fw-stat)",
                }}
              >
                {f.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
