"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";

const STOCK_CAPTION = "Halogen — 35 m usable light";
const MADDOG_CAPTION = "Rage — 400 m measured spot beam";

function StateChip({ isMaddog }: { isMaddog: boolean }) {
  return (
    <div className="glass-deep flex items-center gap-3 px-4 py-2.5 shadow-xl">
      <span
        className={`px-2 py-0.5 rounded-full text-[11px] font-semibold tracking-wide shrink-0 transition-colors duration-200 ${
          isMaddog
            ? "bg-[var(--color-beam)] text-[var(--color-night-950)]"
            : "bg-white/10 text-[var(--color-grey-300)]"
        }`}
      >
        {isMaddog ? "MADDOG" : "STOCK"}
      </span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isMaddog ? "maddog" : "stock"}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
          className="text-sm text-[var(--color-white)] whitespace-nowrap"
        >
          {isMaddog ? MADDOG_CAPTION : STOCK_CAPTION}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export default function BeamCompare() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isMaddogState, setIsMaddogState] = useState(false);
  const [showConditionToggle, setShowConditionToggle] = useState(false);
  const [condition, setCondition] = useState<"clear" | "fog">("clear");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 26 });

  const maddogOpacity = useTransform(smoothProgress, [0.1, 0.4], [0, 1]);
  const sweepLeft = useTransform(smoothProgress, [0.1, 0.75], ["8%", "92%"]);
  const sweepClip = useTransform(sweepLeft, (v) => `inset(0 calc(100% - ${v}) 0 0)`);
  const progressScaleY = useTransform(smoothProgress, [0, 1], [0, 1]);

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    setIsMaddogState(latest >= 0.45);
    setShowConditionToggle(latest >= 0.65);
  });

  const frame = (
    <div
      className="relative w-full rounded-[var(--radius-card)] overflow-hidden border border-[var(--glass-stroke)] bg-[var(--color-night-900)] shadow-2xl"
      style={{ aspectRatio: "1200 / 470" }}
    >
      {/* Base layer — stock halogen (darkened Lycan road strip) */}
      <div className="absolute inset-0">
        <Image
          src="/media/derived/road-strip-lycan.webp"
          alt="Stock halogen — 35 m usable light on a night road"
          fill
          sizes="(max-width: 1160px) 92vw, 1160px"
          className="object-cover"
          style={{ filter: "brightness(0.4) sepia(0.35) saturate(0.65)" }}
        />
      </div>

      {/* Top layer — Maddog Rage (clean road strip), wiped in via clip-path + eased opacity */}
      <motion.div
        className="absolute inset-0"
        style={
          prefersReducedMotion
            ? undefined
            : { opacity: maddogOpacity, clipPath: sweepClip }
        }
      >
        <Image
          src="/media/derived/road-strip-rage.webp"
          alt="Maddog Rage — 400 m measured spot beam on the same road"
          fill
          sizes="(max-width: 1160px) 92vw, 1160px"
          className="object-cover"
          style={{
            filter:
              condition === "fog"
                ? "sepia(0.7) hue-rotate(-12deg) saturate(1.6)"
                : "none",
          }}
        />
      </motion.div>

      {/* Beam wipe seam */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute top-0 bottom-0 w-[2px] z-10 pointer-events-none"
          style={{
            left: sweepLeft,
            background: "var(--color-beam)",
            boxShadow: "0 0 24px var(--color-beam)",
          }}
        />
      )}

      {/* Condition toggle */}
      {(prefersReducedMotion || showConditionToggle) && (
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20"
        >
          <div className="glass-deep flex items-center gap-1 p-1 shadow-lg">
            <button
              type="button"
              onClick={() => setCondition("clear")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-[var(--dur-fast)] cursor-pointer ${
                condition === "clear"
                  ? "bg-white text-[var(--color-night-950)] font-semibold"
                  : "text-[var(--color-grey-300)] hover:text-white"
              }`}
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => setCondition("fog")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-[var(--dur-fast)] cursor-pointer ${
                condition === "fog"
                  ? "bg-white text-[var(--color-night-950)] font-semibold"
                  : "text-[var(--color-grey-300)] hover:text-white"
              }`}
            >
              Fog
            </button>
          </div>
        </motion.div>
      )}

      {/* Caption chip */}
      <div className="absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 z-20">
        <StateChip isMaddog={prefersReducedMotion ? true : isMaddogState} />
      </div>
    </div>
  );

  if (prefersReducedMotion) {
    return (
      <section id="compare" className="relative w-full bg-[var(--color-night-950)] px-6 py-20 border-b border-[var(--glass-stroke)]">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <h2
            className="text-[var(--color-white)] font-[520] mb-8 self-start"
            style={{ fontSize: "var(--text-statement)", letterSpacing: "var(--ls-statement)" }}
          >
            See the difference.
          </h2>
          <div className="w-full" style={{ maxWidth: "1160px" }}>
            {frame}
          </div>
          <p className="readout mt-5 text-center">
            Measured on the same road, same camera, same exposure.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="compare" ref={containerRef} className="relative w-full h-[190vh] bg-[var(--color-night-950)]">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex flex-col items-center justify-center px-6 sm:px-12">
        {/* Top-Left Statement */}
        <div className="absolute top-8 sm:top-12 left-6 sm:left-12 z-20">
          <h2
            className="text-[var(--color-white)] font-[520] tracking-[-0.025em]"
            style={{ fontSize: "var(--text-statement)" }}
          >
            See the difference.
          </h2>
        </div>

        {/* The measurement frame */}
        <div className="w-full mt-10 sm:mt-12" style={{ maxWidth: "1160px" }}>
          {frame}
        </div>

        <p className="readout mt-4 sm:mt-6 text-center text-xs sm:text-sm">
          Measured on the same road, same camera, same exposure.
        </p>

        {/* Right-Edge Scene Progress Hairline */}
        <div className="absolute top-0 right-0 bottom-0 w-[2px] bg-white/10 z-30 pointer-events-none">
          <motion.div
            className="w-full bg-[var(--color-beam)] origin-top h-full"
            style={{ scaleY: progressScaleY }}
          />
        </div>
      </div>
    </section>
  );
}
