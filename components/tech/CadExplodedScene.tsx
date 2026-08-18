"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

const CALLOUTS = [
  {
    step: 1,
    title: "6063-T6 Billet Aluminum Chassis",
    description: "CNC machined from solid aerospace-grade alloy with integrated convective cooling fins.",
    progress: [0.1, 0.25],
    position: "top-[20%] left-[8%] sm:left-[12%]",
  },
  {
    step: 2,
    title: "Nichia Automotive Emitters",
    description: "High-CRI Japanese emitters delivering true 5000K pure daylight white for 50,000+ hours.",
    progress: [0.25, 0.45],
    position: "top-[32%] right-[8%] sm:right-[12%]",
  },
  {
    step: 3,
    title: "Bayer Polycarbonate TIR Lens",
    description: "Total Internal Reflection optics with 96% transmittance for collimated long-throw beam.",
    progress: [0.45, 0.65],
    position: "bottom-[35%] left-[8%] sm:left-[12%]",
  },
  {
    step: 4,
    title: "Fluorosilicone Ingress Seal",
    description: "Dual-lip compression gasket ensuring complete IP-67 dust and high-pressure submersion sealing.",
    progress: [0.65, 0.85],
    position: "bottom-[20%] right-[8%] sm:right-[12%]",
  },
  {
    step: 5,
    title: "Grade 304 Stainless Hardware",
    description: "Vibration-damped stainless mounting brackets engineered for harsh adventure terrain.",
    progress: [0.85, 1.0],
    position: "bottom-[8%] left-[8%] sm:left-[12%]",
  },
];

export default function CadExplodedScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  if (prefersReducedMotion) {
    return (
      <div className="py-16 space-y-12">
        <div className="relative aspect-[16/9] w-full rounded-[var(--radius-card)] overflow-hidden bg-[var(--color-night-900)] border border-white/10 p-8 flex items-center justify-center">
          <Image
            src="/diagrams/cad-exploded.svg"
            alt="Exploded CAD assembly schematic"
            fill
            sizes="100vw"
            className="object-contain p-6"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CALLOUTS.map((item) => (
            <div key={item.title} className="glass p-6">
              <span className="readout text-xs text-[var(--color-beam)]">0{item.step}</span>
              <h3 className="text-white font-medium mt-2">{item.title}</h3>
              <p className="text-sm text-[var(--color-grey-300)] mt-2 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full h-[300vh] bg-[var(--color-night-950)]">
      {/* Sticky CAD Viewport */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex items-center justify-center">
        {/* CAD Schematic Image */}
        <div className="relative w-full max-w-4xl h-[65vh] p-6 flex items-center justify-center">
          <Image
            src="/diagrams/cad-exploded.svg"
            alt="Exploded CAD assembly"
            fill
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-contain"
          />
        </div>

        {/* Scroll Callouts */}
        {CALLOUTS.map((item) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const opacity = useTransform(
            scrollYProgress,
            [item.progress[0] - 0.05, item.progress[0], item.progress[1] - 0.05, item.progress[1]],
            [0, 1, 1, 0.2]
          );

          return (
            <motion.div
              key={item.title}
              style={{ opacity }}
              className={`absolute ${item.position} z-20 max-w-xs`}
            >
              <div className="glass p-5 shadow-2xl backdrop-blur-xl">
                <span className="readout text-xs text-[var(--color-beam)]">
                  Assembly 0{item.step}
                </span>
                <h3 className="text-sm font-semibold text-white mt-1">
                  {item.title}
                </h3>
                <p className="text-xs text-[var(--color-grey-300)] mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
