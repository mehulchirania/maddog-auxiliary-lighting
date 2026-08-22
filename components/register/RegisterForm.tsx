"use client";

import { useState } from "react";
import { products } from "@/lib/products";
import SpecularButton from "@/components/ui/SpecularButton";

const REGISTERABLE = products.filter((p) => p.category === "aux-light" || p.category === "ev-edition");

const LABEL = "readout block uppercase tracking-[0.2em] text-[0.6875rem] sm:text-[0.625rem]";
const FIELD =
  "mt-2 h-12 w-full rounded-xl border border-[var(--glass-stroke)] bg-[var(--color-night-800)] px-4 text-[var(--color-white)] text-[1rem] outline-none transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out)] focus:border-[var(--color-beam)]";

export default function RegisterForm() {
  const [submitted, setSubmitted] = useState(false);
  const [model, setModel] = useState(REGISTERABLE[0]?.slug ?? "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo only — no backend. Mirrors the same "simulate success" convention
    // as the cart's Demo Checkout Simulator; nothing is actually submitted.
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        role="status"
        className="rounded-[var(--radius-card)] border p-10 text-center"
        style={{
          borderColor: "color-mix(in srgb, var(--color-beam) 30%, transparent)",
          background:
            "linear-gradient(120deg, color-mix(in srgb, var(--color-beam) 6%, transparent) 0%, transparent 60%)",
        }}
      >
        <div className="readout text-[2rem] leading-none text-[var(--color-beam)]" aria-hidden>
          ✓
        </div>
        <h2 className="mt-4 text-[1.375rem] font-semibold text-[var(--color-white)]">
          Warranty activated
        </h2>
        <p
          className="mx-auto mt-3 max-w-md leading-relaxed text-[var(--color-grey-300)]"
          style={{ fontSize: "var(--text-body)" }}
        >
          Your serial is on file. Keep your invoice — replacements ship from Peenya within 24–48
          business hours of a validated claim. This is a demo, so nothing was actually sent.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="cta-link-quiet mt-6 w-full justify-center sm:w-auto"
        >
          Register another product
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-[var(--radius-card)] border border-[var(--glass-stroke)] bg-[var(--color-night-900)] p-8 sm:p-9"
    >
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        <label className="block">
          <span className={LABEL}>Full name</span>
          <input required type="text" placeholder="As on the invoice" className={FIELD} />
        </label>
        <label className="block">
          <span className={LABEL}>Phone number</span>
          <input required type="tel" placeholder="+91" className={FIELD} />
        </label>
      </div>

      <label className="block">
        <span className={LABEL}>Email address</span>
        <input required type="email" placeholder="you@example.com" className={FIELD} />
      </label>

      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        <label className="block">
          <span className={LABEL}>Product</span>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className={`${FIELD} cursor-pointer px-3`}
          >
            {REGISTERABLE.map((p) => (
              <option key={p.slug} value={p.slug} className="bg-[var(--color-night-900)]">
                {p.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className={LABEL}>Purchase date</span>
          <input
            required
            type="date"
            max={new Date().toISOString().slice(0, 10)}
            className={FIELD}
          />
        </label>
      </div>

      <div>
        <label className="block">
          <span className={LABEL}>Laser-marked serial number</span>
          <input
            required
            type="text"
            placeholder="e.g. MDR-2025-04471"
            className={`${FIELD} text-[0.9375rem] tracking-[0.06em] text-[var(--color-beam)]`}
            style={{ fontFamily: "var(--font-mono)" }}
          />
        </label>
        <p className="readout mt-2 tracking-[0.06em] text-[0.6875rem] sm:text-[0.625rem]">
          Etched on the chassis, next to the warranty card QR.
        </p>
      </div>

      <SpecularButton
        type="submit"
        size="md"
        tint="#ffffff"
        tintOpacity={1}
        textColor="#0a0a0b"
        lineColor="#ffffff"
        baseColor="#a3a3a3"
        intensity={1.2}
        className="mt-1.5 w-full"
      >
        <span>Activate warranty</span>
      </SpecularButton>

      <p className="readout text-center uppercase tracking-[0.14em] text-[0.6875rem] sm:text-[0.625rem]">
        18 months · direct replacement · no questions stalled
      </p>
    </form>
  );
}
