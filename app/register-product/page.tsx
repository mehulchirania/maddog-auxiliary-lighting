import type { Metadata } from "next";
import RegisterForm from "@/components/register/RegisterForm";

export const metadata: Metadata = {
  title: "Register Your Product — Maddog",
  description: "Activate the 18-month replacement warranty on your Maddog auxiliary light.",
};

const beamLine: React.CSSProperties = {
  background:
    "linear-gradient(180deg, var(--color-beam-bright) 0%, var(--color-beam) 45%, color-mix(in srgb, var(--color-beam) 30%, transparent) 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
};

export default function RegisterProductPage() {
  return (
    <article className="bg-[var(--color-night-950)] text-[var(--color-white)] min-h-screen">
      {/* Typographic hero — no image; a single overhead beam glow instead. */}
      <section className="relative overflow-hidden pt-28 sm:pt-36">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-[45%] left-[-10%] right-[-10%] h-[80%]"
          style={{
            background:
              "radial-gradient(50% 60% at 50% 0%, color-mix(in srgb, var(--color-beam) 13%, transparent) 0%, transparent 65%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-12 w-full">
          <p className="readout uppercase tracking-[0.28em] text-[0.6875rem]">Warranty activation</p>
          <h1
            className="mt-4 text-[var(--color-white)] leading-[1.02]"
            style={{
              fontSize: "var(--text-subpage-title)",
              fontWeight: "var(--fw-subpage-title)",
              letterSpacing: "var(--ls-subpage-title)",
            }}
          >
            Register your
            <br />
            <span style={beamLine}>product.</span>
          </h1>
          <p
            className="mt-5 text-[var(--color-grey-300)] max-w-[52ch] leading-relaxed"
            style={{ fontSize: "var(--text-body)" }}
          >
            Activate the 18-month replacement warranty and get priority support if you ever need it.
          </p>
        </div>
      </section>

      <section className="max-w-[36rem] mx-auto px-6 py-16 sm:py-24">
        <RegisterForm />
      </section>
    </article>
  );
}
