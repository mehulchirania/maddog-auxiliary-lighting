"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/lib/cart";
import { logo } from "@/lib/media";

export default function DemoModal() {
  const { isDemoModalOpen, setIsDemoModalOpen } = useCart();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isDemoModalOpen) {
        setIsDemoModalOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isDemoModalOpen, setIsDemoModalOpen]);

  if (!isDemoModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-modal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink-950/85 backdrop-blur-md transition-opacity"
        onClick={() => setIsDemoModalOpen(false)}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative border hairline bg-ink-900 text-bone max-w-lg w-full rounded-2xl p-6 sm:p-8 shadow-2xl z-10 text-center animate-in fade-in zoom-in-95 duration-200">
        <div className="mx-auto w-12 h-12 rounded-full bg-signal-600/15 border border-signal-500/30 flex items-center justify-center mb-5 text-signal-500">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <span className="eyebrow text-signal-500 mb-2 block">Demo Prototype Notice</span>
        <h2 id="demo-modal-title" className="font-display text-xl sm:text-2xl text-bone font-medium">
          Interactive Design Demonstration
        </h2>

        <p className="text-fog-300 text-sm mt-3 leading-relaxed">
          This web application is an interactive concept redesign for <strong className="text-bone">Maddog Auxiliary Lighting</strong>. E-commerce transaction checkout is intentionally disabled in this demonstration build.
        </p>

        <div className="my-5 p-4 rounded-xl bg-ink-950/80 border hairline text-left space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-fog-400">
            <span className="text-signal-400">✓</span>
            <span>Real 5000K photometric telemetry</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-fog-400">
            <span className="text-signal-400">✓</span>
            <span>Accurate model pricing &amp; 18-mo warranty specs</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-fog-400">
            <span className="text-signal-400">✓</span>
            <span>Motorcycle manufacturer chassis compatibility engine</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setIsDemoModalOpen(false)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md bg-signal-600 hover:bg-signal-700 text-bone px-6 py-2.5 text-sm font-medium transition-colors shadow-sm"
          >
            <span>Continue Exploring</span>
          </button>
          <a
            href="https://maddog.co.in"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md border hairline bg-ink-800 hover:bg-ink-700 text-fog-200 hover:text-bone px-5 py-2.5 text-sm font-medium transition-colors"
          >
            <span>Visit Live Maddog Store ↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}
