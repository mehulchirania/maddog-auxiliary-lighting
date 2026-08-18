"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { useReducedMotion } from "motion/react";

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

  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

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
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(false);
          }}
          aria-label="Close enlarged view"
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-11 h-11 rounded-full glass flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-transform cursor-pointer shadow-2xl"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Image Box */}
        <div
          className="relative w-[94vw] h-[92vh] max-w-7xl select-none"
          onClick={(e) => e.stopPropagation()}
        >
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
      </div>,
      document.body
    )
  ) : null;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={`View full size: ${alt}`}
        className={`group relative block w-full text-left cursor-zoom-in ${className}`}
      >
        {children}

        {/* Affordance icon in corner */}
        <span
          aria-hidden="true"
          className="glass-deep absolute top-3 right-3 z-10 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity text-xs flex items-center justify-center text-white shadow-lg pointer-events-none"
        >
          <span className="text-sm leading-none">⤢</span>
        </span>
      </button>

      {modal}
    </>
  );
}
