"use client";

import { useState } from "react";
import { products } from "@/lib/products";
import SpecularButton from "@/components/ui/SpecularButton";

const REGISTERABLE = products.filter((p) => p.category === "aux-light" || p.category === "ev-edition");

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
      <div className="glass p-8 sm:p-10 text-center" role="status">
        <span className="readout tracking-[0.16em] text-[var(--color-beam)]">Registered</span>
        <h2 className="mt-3 text-2xl font-semibold text-white">Warranty activated.</h2>
        <p className="mt-3 text-[var(--color-grey-300)] max-w-md mx-auto leading-relaxed">
          Your 18-month replacement warranty is now on file. A confirmation would normally be
          emailed here — this is a demo, so nothing was actually sent.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="cta-link-quiet mt-6 justify-center w-full sm:w-auto"
        >
          Register another product
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass p-8 sm:p-10 flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="text-[var(--color-grey-300)]">Full name</span>
          <input
            required
            type="text"
            placeholder="Rahul Sharma"
            className="h-11 px-3.5 rounded-lg bg-[var(--color-night-800)] border border-[var(--glass-stroke)] text-white text-sm focus:outline-none focus:border-[var(--color-beam)]"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="text-[var(--color-grey-300)]">Phone number</span>
          <input
            required
            type="tel"
            placeholder="98765 43210"
            className="h-11 px-3.5 rounded-lg bg-[var(--color-night-800)] border border-[var(--glass-stroke)] text-white text-sm focus:outline-none focus:border-[var(--color-beam)]"
          />
        </label>
      </div>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="text-[var(--color-grey-300)]">Email address</span>
        <input
          required
          type="email"
          placeholder="you@example.com"
          className="h-11 px-3.5 rounded-lg bg-[var(--color-night-800)] border border-[var(--glass-stroke)] text-white text-sm focus:outline-none focus:border-[var(--color-beam)]"
        />
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="text-[var(--color-grey-300)]">Product</span>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="h-11 px-3.5 rounded-lg bg-[var(--color-night-800)] border border-[var(--glass-stroke)] text-white text-sm focus:outline-none focus:border-[var(--color-beam)] cursor-pointer"
          >
            {REGISTERABLE.map((p) => (
              <option key={p.slug} value={p.slug} className="bg-[var(--color-night-900)]">
                {p.name}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="text-[var(--color-grey-300)]">Purchase date</span>
          <input
            required
            type="date"
            max={new Date().toISOString().slice(0, 10)}
            className="h-11 px-3.5 rounded-lg bg-[var(--color-night-800)] border border-[var(--glass-stroke)] text-white text-sm focus:outline-none focus:border-[var(--color-beam)]"
          />
        </label>
      </div>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="text-[var(--color-grey-300)]">Serial number</span>
        <input
          required
          type="text"
          placeholder="Printed on the laser-marked warranty card in the box"
          className="h-11 px-3.5 rounded-lg bg-[var(--color-night-800)] border border-[var(--glass-stroke)] text-white text-sm focus:outline-none focus:border-[var(--color-beam)]"
        />
      </label>

      <SpecularButton
        type="submit"
        size="md"
        tint="#ffffff"
        tintOpacity={1}
        textColor="#0a0a0b"
        lineColor="#ffffff"
        baseColor="#a3a3a3"
        intensity={1.2}
        className="mt-2 w-full sm:w-auto sm:self-start"
      >
        <span>Activate warranty</span>
      </SpecularButton>

      <p className="readout">Demo form — nothing is submitted or stored.</p>
    </form>
  );
}
