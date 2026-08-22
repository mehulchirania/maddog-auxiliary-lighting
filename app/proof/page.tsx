import type { Metadata } from "next";
import Image from "next/image";
import CountUp from "@/components/animations/CountUp";
import Parallax from "@/components/animations/Parallax";
import CreatorWall from "@/components/proof/CreatorWall";
import Testimonials from "@/components/proof/Testimonials";
import Reveal from "@/components/ui/Reveal";
import { aggregate, creators } from "@/lib/proof";

export const metadata: Metadata = {
  title: "Proof & Reviews — Maddog Auxiliary Lighting",
  description:
    "82 verified reviews and 18 independent creator teardowns across India, with an 18-month replacement warranty on every product.",
};

/* Beam-gradient headline line, matching /warranty/. Deliberately not
   `.beam-lit` — that sweep is capped at 2–3 headlines sitewide and is
   already spent on the home page. */
const beamLine: React.CSSProperties = {
  background:
    "linear-gradient(180deg, var(--color-beam-bright) 0%, var(--color-beam) 45%, color-mix(in srgb, var(--color-beam) 30%, transparent) 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
};

const STATS = [
  { to: aggregate.totalReviews, suffix: "", label: "verified reviews" },
  { to: aggregate.creatorCount, suffix: "", label: "independent creators" },
  { to: aggregate.warrantyMonths, suffix: " mo", label: "replacement warranty" },
  { to: aggregate.lifespanHours, suffix: "+ h", label: "emitter lifespan" },
];

export default function ProofPage() {
  return (
    <article className="bg-[var(--color-night-950)] text-[var(--color-white)] min-h-screen overflow-x-clip">
      {/* ── Typographic hero + stat readout strip ──
          No hero photograph here on purpose: the Ultraviolette band directly
          below is the page's single strongest image and reusing it (or a
          cropped duplicate) at the top would spend it twice. */}
      <section className="relative overflow-hidden pt-32 pb-0 sm:pt-44">
        <div
          className="pointer-events-none absolute -left-[10%] -right-[10%] -top-[45%] h-[80%]"
          style={{
            background:
              "radial-gradient(50% 60% at 50% 0%, color-mix(in srgb, var(--color-beam) 13%, transparent) 0%, transparent 65%)",
          }}
          aria-hidden
        />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-12">
          <Reveal className="flex items-center gap-4">
            <span className="h-px w-7 bg-[var(--glass-stroke)]" aria-hidden />
            <span className="readout text-[0.6875rem] uppercase tracking-[0.28em]">
              Proof · pulled from the live site, unedited
            </span>
          </Reveal>

          <h1
            className="mt-6 text-[var(--color-white)] uppercase"
            style={{
              fontSize: "var(--text-page-title)",
              fontWeight: "var(--fw-page-title)",
              letterSpacing: "var(--ls-page-title)",
              lineHeight: 0.92,
            }}
          >
            Take their
            <br />
            <span style={beamLine}>word for it.</span>
          </h1>

          <Reveal className="mt-10 w-full max-w-[1100px] border-t border-[var(--glass-stroke)]">
            <dl className="grid grid-cols-2 sm:grid-cols-4">
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  className={`px-2 pt-5 ${
                    i < STATS.length - 1 ? "sm:border-r sm:border-[var(--glass-stroke)]" : ""
                  }`}
                >
                  <dd className="readout text-[1.75rem] leading-none text-[var(--color-beam)]">
                    <CountUp to={s.to} suffix={s.suffix} />
                  </dd>
                  <dt className="readout mt-2 text-[0.6875rem] sm:text-[0.625rem] uppercase tracking-[0.22em]">
                    {s.label}
                  </dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ── Ultraviolette OEM-proof band ── */}
      <section className="pt-[var(--section)]">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="relative flex min-h-[440px] items-end overflow-hidden rounded-[var(--radius-card)] border border-[var(--glass-stroke)]">
            <Parallax speed={0.12} className="absolute inset-x-0 -inset-y-[8%]">
              <div className="relative h-full w-full">
                <Image
                  src="/media/images/maddog-uv-accessories-banner-02.webp"
                  alt="Maddog auxiliary lights fitted to an Ultraviolette F77 Mach 2 electric motorcycle"
                  fill
                  sizes="100vw"
                  priority
                  className="object-cover object-[30%_55%]"
                />
              </div>
            </Parallax>
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(100deg, color-mix(in srgb, var(--color-night-950) 90%, transparent) 0%, color-mix(in srgb, var(--color-night-950) 40%, transparent) 55%, transparent 100%)",
              }}
              aria-hidden
            />
            <Reveal className="relative max-w-2xl p-8 sm:p-12">
              <span className="readout text-[0.6875rem] uppercase tracking-[0.28em] text-[var(--color-grey-300)]">
                OEM proof
              </span>
              <h2
                className="mt-3.5 uppercase text-[var(--color-white)]"
                style={{
                  fontSize: "var(--text-statement)",
                  fontWeight: "var(--fw-statement)",
                  letterSpacing: "var(--ls-statement)",
                  lineHeight: 1.02,
                }}
              >
                Chosen by Ultraviolette for the F77 Mach 2
              </h2>
              <p
                className="mt-4 text-[var(--color-grey-300)] leading-relaxed"
                style={{ fontSize: "var(--text-body)" }}
              >
                Factory-fit optics on India&rsquo;s fastest electric motorcycle — the strongest
                review a lighting company can get.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="pt-[var(--section)]">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <Reveal className="mb-8">
            <span className="readout text-[0.6875rem] uppercase tracking-[0.28em]">
              From the product pages
            </span>
            <h2
              className="mt-4 uppercase text-[var(--color-white)]"
              style={{
                fontSize: "var(--text-statement)",
                fontWeight: "var(--fw-statement)",
                letterSpacing: "var(--ls-statement)",
                lineHeight: 1,
              }}
            >
              Real riders, real reviews
            </h2>
          </Reveal>
          <Testimonials />
        </div>
      </section>

      {/* ── Creator wall marquee ── */}
      <section className="pt-[var(--section)] pb-[var(--section)]">
        <Reveal className="max-w-7xl mx-auto mb-8 px-6 sm:px-12">
          <span className="readout text-[0.6875rem] uppercase tracking-[0.28em]">On YouTube</span>
          <h2
            className="mt-4 uppercase text-[var(--color-white)]"
            style={{
              fontSize: "var(--text-statement)",
              fontWeight: "var(--fw-statement)",
              letterSpacing: "var(--ls-statement)",
              lineHeight: 1,
            }}
          >
            {creators.length} independent teardowns
          </h2>
        </Reveal>
        <CreatorWall />
      </section>
    </article>
  );
}
