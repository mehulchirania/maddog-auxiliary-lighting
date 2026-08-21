import { test, expect } from "@playwright/test";
import { collectErrors, expectNoHorizontalOverflow } from "./helpers";

const PAGES = [
  { path: "/install/", h1: /./ },
  { path: "/proof/", h1: /./ },
  { path: "/lights/", h1: /./ },
];

test.describe("inner-page heroes — skeleton-look rules", () => {
  test("every hero image renders at full opacity; sources are mutually distinct", async ({
    page,
  }) => {
    const srcs: string[] = [];
    for (const { path } of PAGES) {
      await page.goto(path);
      const img = page.locator("article > section img, main > section img").first();
      await expect(img, `${path} hero image`).toBeVisible();
      expect(
        await img.evaluate((el) => getComputedStyle(el).opacity),
        `${path} hero must not be dimmed`
      ).toBe("1");
      const src = (await img.getAttribute("src")) ?? "";
      srcs.push(src.split("?")[0]);
    }
    expect(new Set(srcs).size, `hero srcs must be distinct: ${srcs.join(", ")}`).toBe(srcs.length);
    // The banned ghost asset appears on no hero:
    expect(srcs.some((s) => s.includes("hero-hardware-wide"))).toBe(false);
  });

  test("technology hero is typographic — no undersized image reused from the Centerpiece section", async ({
    page,
  }) => {
    await page.goto("/technology/");
    const heroSection = page.locator("article > section").first();
    expect(await heroSection.locator("img").count()).toBe(0);
  });

  test("h1s use the page-title scale (outranking section h2s)", async ({ page }) => {
    for (const { path } of PAGES) {
      await page.goto(path);
      const h1 = page.getByRole("heading", { level: 1 }).first();
      const h1Size = parseFloat(await h1.evaluate((el) => getComputedStyle(el).fontSize));
      // --text-page-title bottoms at 2.25rem (36px); statement h2s cap at 3rem (48px).
      // At 1366px wide, page-title resolves to 60px — comfortably above any h2.
      expect(h1Size, `${path} h1 scale`).toBeGreaterThanOrEqual(48);
    }
  });

  test("no console errors, no horizontal overflow on any inner page", async ({ page }) => {
    for (const { path } of PAGES) {
      const { errors } = collectErrors(page);
      await page.goto(path);
      await page.waitForTimeout(800);
      await expectNoHorizontalOverflow(page);
      expect(errors, `console errors on ${path}`).toEqual([]);
    }
  });
});
