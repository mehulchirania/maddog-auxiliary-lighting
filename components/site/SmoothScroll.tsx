"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { setLenis } from "@/lib/lenis";

export default function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Observe .reveal elements across the DOM
    const revealElements = document.querySelectorAll(".reveal, .reveal-image");
    // Observe .beam-lit headlines — sweep plays once on viewport entry.
    const beamLitElements = document.querySelectorAll(".beam-lit");

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -5% 0px", threshold: 0.05 }
      );

      revealElements.forEach((el) => observer.observe(el));

      const beamObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-lit");
              beamObserver.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -5% 0px", threshold: 0.05 }
      );

      beamLitElements.forEach((el) => beamObserver.observe(el));
    } else {
      revealElements.forEach((el) => el.classList.add("is-visible"));
      beamLitElements.forEach((el) => el.classList.add("is-lit"));
    }

    // Skip Lenis when prefers-reduced-motion matches
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // lerp closer to 1 catches up to the target scroll position faster
    // (0.1 felt noticeably laggier than native/the reference site);
    // wheelMultiplier slightly above 1 compensates for the residual
    // smoothing delay so overall felt speed doesn't lag native scrolling.
    const lenis = new Lenis({
      lerp: 0.18,
      wheelMultiplier: 1.15,
    });
    setLenis(lenis);

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
