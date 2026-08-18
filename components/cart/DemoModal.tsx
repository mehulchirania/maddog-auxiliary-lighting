"use client";

import { useEffect, useRef } from "react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";

export default function DemoModal() {
  const { isDemoModalOpen, setIsDemoModalOpen, cartTotal, cartCount, clearCart } = useCart();
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape
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

  const handleSimulateSuccess = () => {
    clearCart();
    setIsDemoModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true" aria-label="Demo Order Checkout">
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-[#0a0a0b]/85 backdrop-blur-md transition-opacity duration-300"
        onClick={() => setIsDemoModalOpen(false)}
        aria-hidden="true"
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div
          ref={modalRef}
          className="relative transform overflow-hidden rounded-[var(--radius-card)] bg-[var(--color-night-900)] border border-[var(--glass-stroke)] p-6 sm:p-8 text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b border-[var(--glass-stroke)] pb-4 mb-6">
            <div>
              <span className="readout text-xs text-[var(--color-beam)]">Direct Factory Order</span>
              <h3 className="text-xl font-semibold text-white mt-1">
                Demo Checkout Simulator
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setIsDemoModalOpen(false)}
              className="text-[var(--color-grey-500)] hover:text-white p-1 rounded-md transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="space-y-4 text-sm text-[var(--color-grey-300)]">
            <p className="leading-relaxed">
              This Next.js showcase web application demonstrates Maddog&apos;s digital catalog. Orders simulate direct dispatch from our Bengaluru manufacturing facility.
            </p>

            <div className="rounded-xl bg-black/40 border border-[var(--glass-stroke)] p-4 space-y-2">
              <div className="flex justify-between text-xs">
                <span>Items in Order:</span>
                <span className="readout text-white">{cartCount} items</span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-white pt-1 border-t border-white/5">
                <span>Total Amount:</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={handleSimulateSuccess}
              className="w-full py-3 px-6 rounded-full bg-[var(--color-white)] text-[var(--color-night-950)] font-medium text-sm hover:scale-[1.02] active:scale-[0.98] transition-transform cursor-pointer shadow-md"
            >
              Complete Simulation &amp; Reset
            </button>
            <button
              type="button"
              onClick={() => setIsDemoModalOpen(false)}
              className="w-full sm:w-auto py-3 px-6 rounded-full glass text-white text-sm hover:bg-white/10 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
