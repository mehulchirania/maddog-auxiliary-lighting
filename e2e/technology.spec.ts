import { test, expect } from "@playwright/test";
import { collectErrors, expectNoHorizontalOverflow } from "./helpers";

test.describe("technology page — the scroll-trap regression", () => {
  test("wheel-scroll traverses the whole page with no dead zone", async ({ page }) => {
    await page.goto("/technology/");
    await page.waitForLoadState("networkidle");

    const target = await page.evaluate(
      () => document.documentElement.scrollHeight - window.innerHeight
    );
    expect(target).toBeGreaterThan(500);

    // Wheel in steps (Lenis lerps, so give it settle time). The old bug locked
    // scroll partway down; this must reach the bottom.
    let last = -1;
    for (let i = 0; i < 40; i++) {
      await page.mouse.wheel(0, 900);
      await page.waitForTimeout(180);
      const y = await page.evaluate(() => window.scrollY);
      if (y >= target - 40) break;
      last = y;
    }
    const final = await page.evaluate(() => window.scrollY);
    expect(final, `scroll must reach the bottom (stalled at ${last})`).toBeGreaterThanOrEqual(
      target - 40
    );
  });

  test("no scroll-jack remnants: no sticky viewport, no 300vh container", async ({ page }) => {
    await page.goto("/technology/");
    const jack = await page.evaluate(() => {
      const all = [...document.querySelectorAll("main *, article *")];
      const sticky = all.filter((el) => getComputedStyle(el).position === "sticky");
      const vh300 = all.filter((el) => el.className?.toString?.().includes("300vh"));
      return { sticky: sticky.length, vh300: vh300.length };
    });
    expect(jack.vh300).toBe(0);
    expect(jack.sticky).toBe(0);
    // CAD callout cards render statically:
    await expect(page.getByText("Nichia Automotive Emitters")).toBeVisible();
  });

  test("lightbox: icon-only trigger, visible chrome, Escape restores scroll", async ({ page }) => {
    await page.goto("/technology/");
    const triggers = page.locator('button[aria-label^="View full size"]');
    expect(await triggers.count()).toBeGreaterThanOrEqual(2);

    const first = triggers.first();
    await first.scrollIntoViewIfNeeded();
    // Always visible (not hover-gated):
    expect(
      parseFloat(await first.evaluate((el) => getComputedStyle(el).opacity))
    ).toBeGreaterThanOrEqual(0.5);

    await first.click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    // Chrome bar: close button present and focused.
    const close = dialog.getByRole("button", { name: /close/i });
    await expect(close).toBeFocused();
    expect(await page.evaluate(() => document.body.style.overflow)).toBe("hidden");

    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
    expect(await page.evaluate(() => document.body.style.overflow)).not.toBe("hidden");

    // Scroll must still work after close (the original trap).
    const before = await page.evaluate(() => window.scrollY);
    await page.mouse.wheel(0, 600);
    await page.waitForTimeout(400);
    expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(before);
  });

  test("hero: typographic (no undersized/illegible hero image), no skeleton dimming anywhere", async ({
    page,
  }) => {
    const { errors } = collectErrors(page);
    await page.goto("/technology/");
    await expect(page.getByRole("heading", { level: 1, name: "Under the housing." })).toBeVisible();
    // The 8K render is reserved for the Centerpiece section, not the hero band.
    const heroSection = page.locator("article > section").first();
    expect(await heroSection.locator("img").count()).toBe(0);
    // Plan rule: no full-bleed image below 55% opacity anywhere on the page.
    const dimmed = await page.evaluate(() =>
      [...document.querySelectorAll("img")].filter(
        (img) => parseFloat(getComputedStyle(img).opacity) < 0.55
      ).length
    );
    expect(dimmed).toBe(0);
    await expectNoHorizontalOverflow(page);
    expect(errors).toEqual([]);
  });
});
