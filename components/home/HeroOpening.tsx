import Image from "next/image";
import Link from "next/link";
import CountUp from "@/components/animations/CountUp";

/**
 * The four numbers the whole page argues for, stated once at the bottom of the
 * opening frame. Every figure is a published Maddog spec: Rage is 11,600 lm /
 * 400 m throw, the whole range is 5000K, everything carries the 18-month
 * replacement warranty.
 */
const HERO_STATS = [
  { to: 11600, suffix: "", label: "raw lumens · Rage" },
  { to: 400, suffix: " m", label: "throw @ 1 lux" },
  { to: 5000, suffix: "K", label: "pure daylight white" },
  { to: 18, suffix: " mo", label: "replacement warranty" },
];

/**
 * Act 0 — the landing frame. Full viewport, centred, type over the beam photo.
 *
 * This is deliberately separate from the anti-glare drag-compare that follows
 * it: the compare module is an interactive demonstration and needs its own
 * section heading, whereas this frame's only job is the brand statement and
 * the two ways into the site.
 */
export default function HeroOpening() {
  return (
    <section className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-[var(--color-night-950)] px-6 pt-32 pb-12 text-center sm:px-8">
      {/* Beam photo, overscanned so the gradient never reveals an edge */}
      <div className="absolute inset-x-0 -inset-y-[6%]">
        <Image
          src="/media/derived/road-strip-rage.webp"
          alt="A night road lit by a Maddog Rage beam"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "center 62%" }}
        />
      </div>

      {/* Vertical scrim — dark at the top for the nav, resolving to solid
          ground at the bottom so the readout strip sits on flat colour. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in srgb, var(--color-night-950) 92%, transparent) 0%, color-mix(in srgb, var(--color-night-950) 52%, transparent) 38%, color-mix(in srgb, var(--color-night-950) 34%, transparent) 62%, var(--color-night-950) 100%)",
        }}
      />

      {/* Beam wash rising off the road */}
      <div
        className="pointer-events-none absolute inset-x-[-10%] bottom-[-30%] h-[70%]"
        style={{
          background:
            "radial-gradient(50% 60% at 50% 100%, color-mix(in srgb, var(--color-beam) 22%, transparent) 0%, color-mix(in srgb, var(--color-beam) 5%, transparent) 45%, transparent 70%)",
        }}
      />

      <div className="relative flex w-full flex-col items-center">
        <span className="readout inline-flex max-w-full items-center justify-center gap-3 uppercase text-[0.6875rem] sm:text-[0.625rem] tracking-[0.22em] text-[var(--color-grey-300)] sm:tracking-[0.28em]">
          <span aria-hidden="true" className="hidden h-px w-7 shrink-0 bg-[var(--glass-stroke)] sm:block" />
          <span className="min-w-0">Maddog Industries · Bengaluru · Auxiliary lighting</span>
          <span aria-hidden="true" className="hidden h-px w-7 shrink-0 bg-[var(--glass-stroke)] sm:block" />
        </span>

        <h1
          className="mt-8 uppercase leading-[0.92] text-[var(--color-white)]"
          style={{
            fontSize: "var(--text-display)",
            fontWeight: "var(--fw-display)",
            letterSpacing: "var(--ls-display)",
            fontStretch: "calc(var(--wdth-display) * 1%)",
          }}
        >
          {/* Two beats, each its own block so the break never lands
              mid-phrase ("Light the / road. Not the rider."). Within a beat the
              text may still wrap — on a 360px screen it has to. */}
          <span className="block">Light the road.</span>
          <span
            className="block"
            style={{
              backgroundImage:
                "linear-gradient(180deg, var(--color-beam-bright) 0%, var(--color-beam) 45%, color-mix(in srgb, var(--color-beam) 30%, transparent) 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Not the rider.
          </span>
        </h1>

        <p
          className="mt-8 max-w-[52ch] leading-[1.65] text-[var(--color-grey-200)]"
          style={{ fontSize: "1.0625rem", textShadow: "0 1px 12px rgba(6,5,7,0.8)" }}
        >
          Anti-glare TIR optics at 5000K, machined from 6063-T6 billet. First in
          India engineered with a hard cutoff — the road lights up, oncoming
          eyes don&rsquo;t.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3.5">
          <Link
            href="/lights/"
            className="inline-flex h-[50px] items-center gap-2.5 rounded-[var(--radius-pill)] bg-[var(--color-white)] px-7 text-[0.9375rem] font-[560] text-[var(--color-night-950)] transition-colors duration-[var(--dur-fast)] hover:bg-[var(--color-beam)]"
          >
            Explore the range <span aria-hidden="true">→</span>
          </Link>
          <Link
            href="/technology/"
            className="inline-flex h-[50px] items-center rounded-[var(--radius-pill)] border border-[var(--glass-stroke)] bg-[color-mix(in_srgb,var(--color-night-900)_50%,transparent)] px-7 text-[0.9375rem] text-[var(--color-white)] backdrop-blur-md transition-colors duration-[var(--dur-fast)] hover:border-[color-mix(in_srgb,var(--color-beam)_50%,transparent)] hover:text-[var(--color-beam)]"
          >
            The anti-glare story
          </Link>
        </div>
      </div>

      {/* Readout strip, pinned to the bottom of the opening frame */}
      <div className="relative mt-auto w-full max-w-[1100px] pt-16">
        <div className="grid grid-cols-2 border-t border-[var(--glass-stroke)] lg:grid-cols-4">
          {HERO_STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`px-2 pt-5 pb-1 text-left ${
                i % 2 === 0 ? "border-r border-[var(--glass-stroke)]" : ""
              } ${i < 2 ? "border-b border-[var(--glass-stroke)] lg:border-b-0" : ""} ${
                i === 2 ? "lg:border-r lg:border-[var(--glass-stroke)]" : ""
              }`}
            >
              <div style={{ fontFamily: "var(--font-mono)" }}>
                <CountUp
                  to={stat.to}
                  suffix={stat.suffix}
                  duration={1.6}
                  className="block tabular-nums text-[1.375rem] text-[var(--color-white)] sm:text-[1.5rem]"
                />
              </div>
              <div className="readout mt-1 uppercase text-[0.6875rem] sm:text-[0.625rem] tracking-[0.22em]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
