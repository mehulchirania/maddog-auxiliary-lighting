import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Warranty & Policy — Maddog",
  description: "18-month direct replacement guarantee and serial verification for Maddog auxiliary lights.",
};

/* Beam-gradient headline line. Deliberately not `.beam-lit` — that sweep is
   capped at 2–3 headlines sitewide and is spent on the home page. */
const beamLine: React.CSSProperties = {
  background:
    "linear-gradient(180deg, var(--color-beam-bright) 0%, var(--color-beam) 45%, color-mix(in srgb, var(--color-beam) 30%, transparent) 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
};

const COVERED = [
  "Emitter failure or chromatic temperature drift outside 5000K tolerance.",
  "Internal moisture ingress or condensation breach across the IP-67 fluorosilicone seal.",
  "Solid-state relay, switch module, or dimmer circuit failure.",
  "Structural failure of CNC machined 6063-T6 billet bracket hardware.",
];

export default function WarrantyPage() {
  return (
    <article className="bg-[var(--color-night-950)] text-[var(--color-white)] min-h-screen">
      {/* Hero — serialized hardware, full opacity, localized left scrim */}
      <section className="relative min-h-[46svh] w-full flex items-end overflow-hidden border-b border-[var(--glass-stroke)] pt-28 pb-14 sm:pt-32 sm:pb-16">
        <div className="absolute inset-0 z-0">
          <Image
            src="/media/derived/hero-bezel-exploded-wide.webp"
            alt="Exploded view of a Maddog light bezel, lens stack and sealed housing"
            fill
            sizes="100vw"
            priority
            className="object-cover object-[58%_45%]"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(10,10,11,0.92) 0%, rgba(10,10,11,0.55) 42%, transparent 72%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(10,10,11,0.5) 0%, transparent 40%, var(--color-night-950) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 w-full">
          <p className="readout uppercase tracking-[0.28em] text-[0.6875rem]">Warranty &amp; policy</p>
          <h1
            className="mt-4 text-[var(--color-white)] leading-[1.02]"
            style={{
              fontSize: "var(--text-subpage-title)",
              fontWeight: "var(--fw-subpage-title)",
              letterSpacing: "var(--ls-subpage-title)",
            }}
          >
            18-month replacement
            <br />
            <span style={beamLine}>guarantee.</span>
          </h1>
          <p
            className="mt-5 text-[var(--color-grey-300)] max-w-[52ch] leading-relaxed"
            style={{ fontSize: "var(--text-body)" }}
          >
            Every Maddog auxiliary light and harness is serialized at our Bangalore facility and backed by an unconditional 18-month replacement warranty.
          </p>
        </div>
      </section>

      {/* Narrow single-column policy stack */}
      <section className="max-w-[36rem] mx-auto px-6 py-16 sm:py-24 flex flex-col gap-14">
        <Reveal>
          <span className="readout block uppercase tracking-[0.22em] text-[0.625rem] text-[var(--color-beam)]">
            Coverage terms
          </span>
          <h2 className="mt-2.5 text-[1.375rem] font-semibold tracking-[-0.01em] text-[var(--color-white)]">
            Unconditional direct replacement
          </h2>
          <p
            className="mt-3.5 text-[var(--color-grey-300)] leading-relaxed"
            style={{ fontSize: "var(--text-body)" }}
          >
            We do not repair or stall with prolonged RMA investigations. If your light or switch fails under normal riding conditions within 18 months of purchase, we replace the unit directly from our Peenya manufacturing facility in Bengaluru.
          </p>
        </Reveal>

        <Reveal>
          <span className="readout block uppercase tracking-[0.22em] text-[0.625rem] text-[var(--color-beam)]">
            Covered conditions
          </span>
          <h2 className="mt-2.5 text-[1.375rem] font-semibold tracking-[-0.01em] text-[var(--color-white)]">
            What is protected
          </h2>
          <ul className="mt-3.5 flex flex-col gap-3">
            {COVERED.map((item) => (
              <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed text-[var(--color-grey-300)]">
                <span aria-hidden className="text-[var(--color-beam)]">
                  •
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <span className="readout block uppercase tracking-[0.22em] text-[0.625rem] text-[var(--color-beam)]">
            Claims process
          </span>
          <h2 className="mt-2.5 text-[1.375rem] font-semibold tracking-[-0.01em] text-[var(--color-white)]">
            How to initiate a claim
          </h2>
          <p
            className="mt-3.5 text-[var(--color-grey-300)] leading-relaxed"
            style={{ fontSize: "var(--text-body)" }}
          >
            Send your serial number and a short video demonstration to our WhatsApp support (+91 7019130080) or via email to support@maddog.co.in. Dispatches for validated claims ship within 24–48 business hours.
          </p>
          <Link
            href="/register-product/"
            className="mt-6 inline-flex h-[46px] items-center rounded-[var(--radius-pill)] bg-[var(--color-white)] px-6 text-[0.9375rem] font-[560] text-[var(--color-night-950)] transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out)] hover:bg-[var(--color-beam)]"
          >
            Register your product
          </Link>
        </Reveal>
      </section>
    </article>
  );
}
