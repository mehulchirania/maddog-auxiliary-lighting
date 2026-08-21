"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { useReducedMotion } from "motion/react";
import { getLenis } from "@/lib/lenis";

interface LightboxProps {
  src: string;
  alt: string;
  children: React.ReactNode;
  className?: string;
}

export default function Lightbox({ src, alt, children, className = "" }: LightboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll + pause Lenis, handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    getLenis()?.stop();

    // Focus close button on open
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      getLenis()?.start();
      window.removeEventListener("keydown", handleKeyDown);
      // Return focus to trigger
      triggerRef.current?.focus();
    };
  }, [isOpen]);

  const modal = isOpen && mounted ? (
    createPortal(
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Enlarged view: ${alt}`}
        className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/92 backdrop-blur-sm p-4 sm:p-8 transition-opacity ${
          prefersReducedMotion ? "duration-150" : "duration-200"
        }`}
        onClick={() => setIsOpen(false)}
      >
        {/* Modal panel — chrome bar + image, scale/fade in on open */}
        <div
          className="lightbox-panel relative w-[94vw] max-w-7xl h-[92vh] flex flex-col select-none"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Chrome bar */}
          <div className="glass-deep flex items-center justify-between gap-4 px-4 py-3 rounded-b-none shrink-0">
            <span className="text-sm text-white truncate">{alt}</span>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close enlarged view"
              className="shrink-0 w-9 h-9 rounded-full glass flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-transform cursor-pointer shadow-lg"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Image Box */}
          <div className="relative flex-1 rounded-b-[var(--radius-card)] overflow-hidden bg-[var(--color-night-950)] border border-t-0 border-[var(--glass-stroke)]">
            <Image
              src={src}
              alt={alt}
              fill
              sizes="100vw"
              quality={95}
              priority
              className="object-contain"
            />
          </div>
        </div>
      </div>,
      document.body
    )
  ) : null;

  return (
    <>
      <div className={`relative block w-full ${className}`}>
        {children}

        {/* Zoom affordance — the sole interactive trigger. Always visible at
            reduced opacity so it reads as a control, not a hover secret;
            brightens on hover/focus. */}
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label={`View full size: ${alt}`}
          className="glass-deep absolute top-3 right-3 z-10 p-2 rounded-lg opacity-70 hover:opacity-100 focus-visible:opacity-100 transition-opacity text-xs flex items-center justify-center text-white shadow-lg cursor-zoom-in"
        >
          <span className="text-sm leading-none" aria-hidden="true">⤢</span>
        </button>
      </div>

      {modal}
    </>
  );
}
