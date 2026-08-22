import { test, expect } from "@playwright/test";

/**
 * Mobile UI floors. These are regression guards, not design assertions:
 * the redesign is specified by the .dc.html artifacts, but the artifacts were
 * drawn at desktop width and say nothing about touch ergonomics.
 */
const PAGES = [
  "/", "/lights/", "/technology/", "/fit/", "/proof/",
  "/warranty/", "/install/", "/dealers/", "/register-product/",
  "/products/rage/", "/products/claw-lite/",
];

test.describe("mobile UI floors", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("every interactive control is at least 44px tall", async ({ page }) => {
    const bad: string[] = [];
    for (const p of PAGES) {
      await page.goto(p);
      const small = await page.evaluate(() => {
        const out: string[] = [];
        document
          .querySelectorAll<HTMLElement>('a,button,[role="button"],input,select,textarea')
          .forEach((el) => {
            if (el.closest('[aria-hidden="true"]')) return;
            const cs = getComputedStyle(el);
            if (cs.display === "none" || cs.visibility === "hidden") return;
            const b = el.getBoundingClientRect();
            if (b.width === 0 || b.height === 0) return;
            // Width is content-driven for inline links; height is the binding one.
            if (b.height < 44)
              out.push(`${el.tagName}:${(el.textContent || "").trim().slice(0, 24)}`);
          });
        return [...new Set(out)];
      });
      if (small.length) bad.push(`${p} → ${small.join(", ")}`);
    }
    expect(bad, "controls under the 44px touch-target floor").toEqual([]);
  });

  test("no rendered text drops below 11px", async ({ page }) => {
    const bad: string[] = [];
    for (const p of PAGES) {
      await page.goto(p);
      const tiny = await page.evaluate(() => {
        const out: string[] = [];
        document.querySelectorAll<HTMLElement>("p,span,div,li,td,label,a,button,dt,dd,h3").forEach((el) => {
          if (el.children.length) return;
          if (!(el.textContent || "").trim()) return;
          const fs = parseFloat(getComputedStyle(el).fontSize);
          if (fs < 11) out.push(`${fs}px "${(el.textContent || "").trim().slice(0, 24)}"`);
        });
        return [...new Set(out)];
      });
      if (tiny.length) bad.push(`${p} → ${tiny.join(", ")}`);
    }
    expect(bad, "text below the 11px legibility floor").toEqual([]);
  });

  test("no page scrolls horizontally", async ({ page }) => {
    const bad: string[] = [];
    for (const p of PAGES) {
      await page.goto(p);
      const over = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      );
      if (over > 1) bad.push(`${p} → ${over}px`);
    }
    expect(bad, "horizontal overflow at 390px").toEqual([]);
  });
});
