import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Warranty & Policy — Maddog",
  description: "18-month direct replacement guarantee and serial verification for Maddog auxiliary lights.",
};

export default function WarrantyPage() {
  return (
    <article className="bg-[var(--color-night-950)] text-[var(--color-white)] min-h-screen">
      {/* 40svh Dark Hero */}
      <section className="relative h-[40svh] min-h-[300px] w-full flex items-center overflow-hidden border-b border-[var(--glass-stroke)]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/media/derived/hero-hardware-wide.webp"
            alt="Maddog Warranty"
            fill
            sizes="100vw"
            priority
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-night-950)] via-[var(--color-night-950)]/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 w-full">
          <h1
            className="font-[520] text-[var(--color-white)] tracking-tight"
            style={{ fontSize: "var(--text-statement)", letterSpacing: "var(--ls-statement)" }}
          >
            18-month replacement guarantee.
          </h1>
          <p
            className="mt-3 text-[var(--color-grey-300)] max-w-lg leading-relaxed"
            style={{ fontSize: "var(--text-body)" }}
          >
            Every Maddog auxiliary light and harness is serialized at our Bangalore facility and backed by an unconditional 18-month replacement warranty.
          </p>
        </div>
      </section>

      {/* Single 34rem column content */}
      <section className="max-w-[34rem] mx-auto px-6 py-16 sm:py-24 space-y-12">
        <div>
          <span className="readout block mb-2">Coverage Terms</span>
          <h2 className="text-xl font-semibold text-white mb-4">
            Unconditional Direct Replacement
          </h2>
          <p className="text-[var(--color-grey-300)] leading-relaxed text-base">
            We do not repair or stall with prolonged RMA investigations. If your light or switch fails under normal riding conditions within 18 months of purchase, we replace the unit directly from our Peenya manufacturing facility in Bengaluru.
          </p>
        </div>

        <div>
          <span className="readout block mb-2">Covered Conditions</span>
          <h2 className="text-xl font-semibold text-white mb-4">
            What is Protected
          </h2>
          <ul className="space-y-3 text-[var(--color-grey-300)] text-sm leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-[var(--color-beam)]">•</span>
              <span>Emitter failure or chromatic temperature drift outside 5000K tolerance.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--color-beam)]">•</span>
              <span>Internal moisture ingress or condensation breach across the IP-67 fluorosilicone seal.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--color-beam)]">•</span>
              <span>Solid-state relay, switch module, or dimmer circuit failure.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--color-beam)]">•</span>
              <span>Structural failure of CNC machined 6063-T6 billet bracket hardware.</span>
            </li>
          </ul>
        </div>

        <div>
          <span className="readout block mb-2">Claims Process</span>
          <h2 className="text-xl font-semibold text-white mb-4">
            How to Initiate a Claim
          </h2>
          <p className="text-[var(--color-grey-300)] leading-relaxed text-base">
            Send your serial number and a short video demonstration to our WhatsApp support (+91 7019130080) or via email to support@maddog.co.in. Dispatches for validated claims ship within 24–48 business hours.
          </p>
        </div>
      </section>
    </article>
  );
}
