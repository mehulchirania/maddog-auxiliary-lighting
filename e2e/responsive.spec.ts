import { test, expect } from "@playwright/test";
import { collectErrors, expectNoHorizontalOverflow } from "./helpers";

// Runs under both projects; the "mobile" project (Pixel 7) is the interesting one.
test.describe("responsive + reduced motion", () => {
  test("homepage holds together at viewport width", async ({ page }) => {
    const { errors } = collectErrors(page);
    await page.goto("/");
    await page.waitForTimeout(1500);
    await expectNoHorizontalOverflow(page);
    // Key sections all present.
    for (const text of ["The range", "Best sellers", "Ultraviolette", "Built for what you ride"]) {
      await expect(page.getByText(text, { exact: false }).first()).toBeVisible();
    }
    expect(errors).toEqual([]);
  });

  test("fit page holds together at viewport width", async ({ page }) => {
    await page.goto("/fit/");
    await expectNoHorizontalOverflow(page);
    await expect(page.getByRole("heading", { name: "Built for what you ride." })).toBeVisible();
  });

  test("reduced motion: no sweep, static lit headlines", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    // Hero skips the load sweep → x stays 0.5 → 270m immediately and stays.
    await expect(page.locator("text=/\\d+m lit/").first()).toHaveText("270m lit");
    await page.waitForTimeout(1300);
    await expect(page.locator("text=/\\d+m lit/").first()).toHaveText("270m lit");
    // Beam-lit renders the lit end state with no animation.
    const h2 = page.locator(".beam-lit").first();
    await h2.scrollIntoViewIfNeeded();
    const style = await h2.evaluate((el) => {
      const s = getComputedStyle(el);
      return { pos: s.backgroundPosition, anim: s.animationName };
    });
    // Resolved 0% serializes as "0px" in computed styles — both mean the lit end state.
    expect(style.pos).toMatch(/^0(%|px) /);
    expect(style.anim).toBe("none");
  });
});
