"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [isLit, setIsLit] = useState(false);
  const [stage, setStage] = useState<"unlit" | "turning-on" | "lit">("unlit");

  const turnOn = useCallback(() => {
    if (stage !== "unlit") return;
    setStage("turning-on");
    setIsLit(true);

    // Sequence stages
    setTimeout(() => {
      setStage("lit");
    }, 1200);
  }, [stage]);

  // Reduced motion: start directly in lit state
  useEffect(() => {
    if (prefersReducedMotion) {
      setIsLit(true);
      setStage("lit");
    }
  }, [prefersReducedMotion]);

  // Auto-play on 80px scroll if not already lit
  useEffect(() => {
    if (isLit) return;
    const handleScroll = () => {
      if (window.scrollY > 80) {
        turnOn();
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLit, turnOn]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      turnOn();
    }
  };

  return (
    <section className="relative w-full h-[100svh] min-h-[600px] overflow-hidden bg-[var(--color-night-950)] select-none">
      {/* Background — Cinematic dark mountain lineup of Maddog auxiliary lights */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/media/derived/hero-lineup-wide.webp"
          alt="Maddog Auxiliary Lighting Lineup"
          fill
          priority
          sizes="100vw"
          quality={92}
          className="hidden sm:block object-cover object-right sm:object-center"
          style={{
            filter: prefersReducedMotion
              ? "brightness(1)"
              : `brightness(${isLit ? 1 : 0.28})`,
            transition: prefersReducedMotion
              ? undefined
              : "filter 1.1s cubic-bezier(0.22,1,0.36,1)",
          }}
        />
        <Image
          src="/media/derived/hero-lineup-square.webp"
          alt="Maddog Auxiliary Lighting"
          fill
          priority
          sizes="100vw"
          quality={92}
          className="sm:hidden object-cover object-center"
          style={{
            filter: prefersReducedMotion
              ? "brightness(1)"
              : `brightness(${isLit ? 1 : 0.28})`,
            transition: prefersReducedMotion
              ? undefined
              : "filter 1.1s cubic-bezier(0.22,1,0.36,1)",
          }}
        />
      </div>

      {/* Dark Overlay that lifts when lights turn on */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none bg-[#0a0a0b]"
        initial={false}
        animate={{ opacity: isLit ? 0.35 : 0.88 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 1.1,
          ease: [0.22, 1, 0.36, 1],
          delay: isLit && !prefersReducedMotion ? 0.15 : 0,
        }}
      />

      {/* Beam Light Cone Gradient anchored bottom-left */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 15% 85%, rgba(255, 237, 201, 0.24) 0%, rgba(255, 237, 201, 0.08) 45%, transparent 70%)",
        }}
        initial={false}
        animate={{
          opacity: isLit ? 1 : 0,
          scale: isLit ? 1 : 0.6,
        }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.9,
          ease: [0.22, 1, 0.36, 1],
          delay: isLit && !prefersReducedMotion ? 0.08 : 0,
        }}
      />

      {/* Left-anchored scrim so headline/body text stay legible over the background */}
      <div
        className="absolute inset-y-0 left-0 z-20 w-full sm:w-[65%] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(10,10,11,0.85) 0%, rgba(10,10,11,0.5) 60%, transparent 100%)",
        }}
      />

      {/* Content Container */}
      <div className="relative z-30 h-full max-w-7xl mx-auto px-6 sm:px-12 flex flex-col justify-center">
        <div className="max-w-2xl">
          {/* Headline: "You see it / before you feel it." */}
          <h1 className="font-[560] leading-[1.08] tracking-[-0.035em] text-[clamp(2.4rem,11vw,3.2rem)] sm:text-[length:var(--text-hero)]">
            {isLit ? (
              <motion.span
                initial={prefersReducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.4 }}
                className="block text-[var(--color-white)]"
              >
                <span className="block">You see it</span>
                <span className="block">before you feel it.</span>
              </motion.span>
            ) : (
              <span className="block text-white/15 transition-opacity duration-300">
                <span className="block">You see it</span>
                <span className="block">before you feel it.</span>
              </span>
            )}
          </h1>

          {/* Body line: "5000K TIR optics. Full beam ahead, zero glare oncoming." */}
          {isLit && (
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: prefersReducedMotion ? 0 : 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-6 text-[var(--color-grey-300)] max-w-lg text-lg sm:text-xl font-normal leading-relaxed"
            >
              5000K TIR optics. Full beam ahead, zero glare oncoming.
            </motion.p>
          )}

          {/* Link: "See the difference →" to #compare */}
          {isLit && (
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: prefersReducedMotion ? 0 : 1.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-8"
            >
              <Link
                href="#compare"
                className="inline-flex items-center gap-2 text-[var(--color-white)] underline underline-offset-4 decoration-white/40 hover:decoration-[var(--color-beam)] hover:text-[var(--color-beam)] text-base transition-colors"
              >
                <span>See the difference</span>
                <span aria-hidden="true">→</span>
              </Link>
            </motion.div>
          )}
        </div>
      </div>

      {/* The Master Switch (Bottom-Center) */}
      <AnimatePresence>
        {!isLit && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-3"
          >
            <button
              type="button"
              role="switch"
              aria-checked={isLit}
              aria-label="Turn the lights on"
              onClick={turnOn}
              onKeyDown={handleKeyDown}
              className="glass relative w-[72px] h-[128px] p-2 flex flex-col justify-end cursor-pointer active:scale-95 transition-transform duration-100"
            >
              {/* Switch Track Indicator */}
              <div className="absolute inset-x-0 top-3 flex justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
              </div>

              {/* Thumb */}
              <motion.div
                className="w-14 h-14 rounded-full bg-[var(--color-white)] shadow-lg flex items-center justify-center text-[var(--color-night-950)]"
                animate={
                  isLit
                    ? { y: -56 }
                    : {
                        opacity: [0.7, 1, 0.7],
                      }
                }
                transition={
                  isLit
                    ? { type: "spring", stiffness: 400, damping: 28 }
                    : {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                }
              >
                {/* Lightbulb / Power icon */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
              </motion.div>
            </button>

            <span className="readout text-xs text-white/70">tap to switch on</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
