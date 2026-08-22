import Image from "next/image";
import Link from "next/link";
import CountUp from "@/components/animations/CountUp";
import Parallax from "@/components/animations/Parallax";
import { aggregate } from "@/lib/proof";

const PROOF_STATS = [
  { to: aggregate.totalReviews, suffix: "", label: "verified reviews" },
  { to: aggregate.creatorCount, suffix: "", label: "yt teardowns" },
  { to: aggregate.warrantyMonths, suffix: " mo", label: "replacement warranty" },
];

/**
 * Act 04 — a single full-bleed banner: one bordered panel with a parallaxed
 * Ultraviolette photo behind a left-to-right dark gradient, all copy bottom-left.
 */
export default function ProofBand() {
  return (
    <section
      className="bg-[var(--color-night-950)] border-t border-[var(--glass-stroke)] overflow-x-clip"
      style={{ paddingTop: "var(--section)", paddingBottom: "var(--section)" }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="reveal relative flex min-h-[540px] items-end overflow-hidden rounded-[var(--radius-card)] border border-[var(--glass-stroke)]">
          {/* Parallax frame carries the vertical overscan so the translate
              never reveals an edge; the panel above clips it. */}
          <Parallax speed={0.14} className="absolute inset-x-0 -inset-y-[8%]">
            <div className="relative h-full w-full">
              <Image
                src="/media/images/maddog-uv-accessories-banner-02.webp"
                alt="Maddog auxiliary lights installed on an Ultraviolette F77 Mach 2 electric motorcycle"
                fill
                sizes="100vw"
                className="object-cover"
                priority={false}
              />
            </div>
          </Parallax>

          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(100deg, color-mix(in srgb, var(--color-night-950) 92%, transparent) 0%, color-mix(in srgb, var(--color-night-950) 45%, transparent) 55%, transparent 100%)",
            }}
          />

          <div className="relative max-w-[46rem] p-8 sm:p-14">
            <span className="readout uppercase tracking-[0.28em] text-[var(--color-grey-300)]">
              04 / Who trusts it
            </span>
            <h2
              className="beam-lit mt-4 uppercase leading-[1.02] tracking-tight"
              style={{
                fontSize: "var(--text-statement)",
                fontWeight: "var(--fw-statement)",
                letterSpacing: "var(--ls-statement)",
              }}
            >
              Factory-fit on the F77 Mach 2
            </h2>
            <p
              className="mt-5 max-w-[46ch] text-[var(--color-grey-300)]"
              style={{ fontSize: "var(--text-body)" }}
            >
              Chosen by Ultraviolette for India&apos;s fastest electric motorcycle.
            </p>

            {/* The proof, counted rather than claimed. */}
            <div className="mt-7 flex flex-wrap gap-x-11 gap-y-6">
              {PROOF_STATS.map((stat) => (
                <div key={stat.label}>
                  <div style={{ fontFamily: "var(--font-mono)" }}>
                    <CountUp
                      to={stat.to}
                      suffix={stat.suffix}
                      duration={1.6}
                      className="block tabular-nums text-[1.75rem] text-[var(--color-beam)]"
                    />
                  </div>
                  <div className="readout mt-1 uppercase tracking-[0.2em] text-[0.6875rem] sm:text-[0.625rem] text-[var(--color-grey-300)]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-7">
              <Link
                href="/proof/"
                className="inline-flex h-[46px] items-center rounded-[var(--radius-pill)] bg-[var(--color-white)] px-6 text-[0.9375rem] font-[560] text-[var(--color-night-950)] transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out)] hover:bg-[var(--color-beam)]"
              >
                Read the reviews
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
