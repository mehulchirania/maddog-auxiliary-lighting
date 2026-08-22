import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Dealers & Workshop Network — Maddog",
  description: "Authorized installation partners and direct factory service across India.",
};

const beamLine: React.CSSProperties = {
  background:
    "linear-gradient(180deg, var(--color-beam-bright) 0%, var(--color-beam) 45%, color-mix(in srgb, var(--color-beam) 30%, transparent) 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
};

const HUBS = [
  { city: "Bengaluru", state: "Karnataka", count: 48 },
  { city: "Mumbai & Pune", state: "Maharashtra", count: 36 },
  { city: "Delhi NCR", state: "Delhi / Haryana", count: 32 },
  { city: "Hyderabad", state: "Telangana", count: 24 },
  { city: "Chennai", state: "Tamil Nadu", count: 20 },
  { city: "Kochi & Calicut", state: "Kerala", count: 18 },
];

export default function DealersPage() {
  return (
    <article className="bg-[var(--color-night-950)] text-[var(--color-white)] min-h-screen">
      {/* Hero — full-opacity lineup photo, localized left scrim */}
      <section className="relative min-h-[46svh] w-full flex items-end overflow-hidden border-b border-[var(--glass-stroke)] pt-28 pb-14 sm:pt-32 sm:pb-16">
        <div className="absolute inset-0 z-0">
          <Image
            src="/media/derived/hero-lineup-wide.webp"
            alt="The Maddog auxiliary lighting lineup laid out across a workshop bench"
            fill
            sizes="100vw"
            priority
            className="object-cover object-[center_55%]"
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
          <p className="readout uppercase tracking-[0.28em] text-[0.6875rem]">
            Dealer &amp; workshop network
          </p>
          <h1
            className="mt-4 text-[var(--color-white)] leading-[1.02]"
            style={{
              fontSize: "var(--text-subpage-title)",
              fontWeight: "var(--fw-subpage-title)",
              letterSpacing: "var(--ls-subpage-title)",
            }}
          >
            Authorized
            <br />
            <span style={beamLine}>dealers.</span>
          </h1>
          <p
            className="mt-5 text-[var(--color-grey-300)] max-w-[52ch] leading-relaxed"
            style={{ fontSize: "var(--text-body)" }}
          >
            Over 250+ verified motorcycle workshops across India equipped with genuine Maddog wiring harnesses and leveling rigs.
          </p>
        </div>
      </section>

      <section className="max-w-[60rem] mx-auto px-6 py-16 sm:py-24">
        <Reveal className="max-w-[36rem]">
          <span className="readout block uppercase tracking-[0.22em] text-[0.625rem] text-[var(--color-beam)]">
            Network presence
          </span>
          <h2 className="mt-2.5 text-[1.375rem] font-semibold tracking-[-0.01em] text-[var(--color-white)]">
            Certified installation centers
          </h2>
          <p
            className="mt-3.5 text-[var(--color-grey-300)] leading-relaxed"
            style={{ fontSize: "var(--text-body)" }}
          >
            Maddog works directly with vetted motorcycle performance garages across all major Indian states. Every certified partner is trained in our clean routing standards, torque ratings, and optical leveling protocol.
          </p>
        </Reveal>

        <Reveal className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {HUBS.map((hub) => (
            <div
              key={hub.city}
              className="rounded-[var(--radius-card)] border border-[var(--glass-stroke)] bg-[var(--color-night-900)] p-6"
            >
              <div className="text-[1.125rem] font-semibold tracking-[-0.01em] text-[var(--color-white)]">
                {hub.city}
              </div>
              <div className="readout mt-0.5 uppercase tracking-[0.14em] text-[0.625rem]">
                {hub.state}
              </div>
              <div className="readout mt-4 text-[1.375rem] leading-none text-[var(--color-beam)]">
                {hub.count}
              </div>
              <div className="readout mt-1.5 uppercase tracking-[0.18em] text-[0.5625rem]">
                certified workshops
              </div>
            </div>
          ))}
        </Reveal>

        {/* Beam-tinted panel: warm stroke + a shallow wash so factory service
            reads as the elevated option without a new surface token. */}
        <Reveal className="mt-12">
          <div
            className="rounded-[var(--radius-card)] border p-8"
            style={{
              borderColor: "color-mix(in srgb, var(--color-beam) 18%, transparent)",
              background:
                "linear-gradient(120deg, color-mix(in srgb, var(--color-beam) 5%, transparent) 0%, transparent 60%)",
            }}
          >
            <span className="readout block uppercase tracking-[0.22em] text-[0.625rem] text-[var(--color-beam)]">
              Factory service
            </span>
            <h2 className="mt-2.5 text-[1.375rem] font-semibold tracking-[-0.01em] text-[var(--color-white)]">
              Bengaluru HQ fitting
            </h2>
            <p
              className="mt-3.5 max-w-[60ch] text-[var(--color-grey-300)] leading-relaxed"
              style={{ fontSize: "var(--text-body)" }}
            >
              Riders traveling through or based in Bengaluru can schedule direct factory installation at our Peenya 2nd Phase facility with our engineering team — support@maddog.co.in or WhatsApp (+91 7019130080).
            </p>
          </div>
        </Reveal>
      </section>
    </article>
  );
}
