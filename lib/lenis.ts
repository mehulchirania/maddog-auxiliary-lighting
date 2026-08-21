import type Lenis from "lenis";

/**
 * Module-level ref to the site's single Lenis instance. SmoothScroll.tsx owns
 * the instance and sets it here; anything that needs to pause/resume smooth
 * scroll (e.g. Lightbox while a modal is open) reads it via getLenis().
 */
let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenis(): Lenis | null {
  return instance;
}
