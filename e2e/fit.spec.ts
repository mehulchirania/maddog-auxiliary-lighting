import { test, expect } from "@playwright/test";
import { collectErrors, expectNoHorizontalOverflow } from "./helpers";

test.describe("fit page — brand marks and kit flow", () => {
  test("typographic hero with the new headline, no hero image", async ({ page }) => {
    await page.goto("/fit/");
    await expect(page.getByRole("heading", { level: 1, name: "Find your fit." })).toBeVisible();
    // First section (hero) must contain no <img>.
    expect(await page.locator("article > section").first().locator("img").count()).toBe(0);
  });

  test("brand grid: real marks for sourced brands, initials fallback, no 404s", async ({
    page,
  }) => {
    const { failed } = collectErrors(page);
    await page.goto("/fit/");
    await page.waitForLoadState("networkidle");

    // KTM tile renders a masked logo (currentColor stencil), not initials text.
    const ktmTile = page.getByRole("button", { name: /^KTM/ });
    const masked = await ktmTile
      .locator("span, div")
      .evaluateAll((els) =>
        els.some((el) => {
          const s = getComputedStyle(el as Element);
          const m = s.maskImage || (s as any).webkitMaskImage || "";
          return m.includes("/media/brands/");
        })
      );
    expect(masked, "KTM must render a masked SVG mark").toBe(true);

    // Royal Enfield falls back to initials.
    await expect(page.getByRole("button", { name: /Royal Enfield/ }).getByText("RE")).toBeVisible();

    // No failed asset loads (covers all /media/brands/*.svg fetches).
    expect(failed).toEqual([]);
  });

  test("selecting a bike scrolls to the recommended-setup panel, not the page bottom", async ({
    page,
  }) => {
    await page.goto("/fit/");
    await page.getByRole("button", { name: /Royal Enfield/ }).click();
    const modelButton = page.locator("button", { hasText: /chassis/i }).first();
    await modelButton.scrollIntoViewIfNeeded();
    await modelButton.click();

    const panel = page.getByRole("region", { name: /setup/i });
    await expect(panel).toBeVisible();
    // The panel's heading must actually be on screen, near the top of the
    // viewport — not scrolled past, which was the original bug.
    await expect
      .poll(async () => {
        const box = await panel.boundingBox();
        return box ? box.y : null;
      }, { timeout: 3000 })
      .not.toBeNull();
    const box = await panel.boundingBox();
    expect(box!.y, "recommended-setup panel should land near the viewport top").toBeLessThan(300);
  });

  test("full kit flow: brand → model → radiogroup pills → add to cart", async ({ page }) => {
    await page.goto("/fit/");
    await page.getByRole("button", { name: /Royal Enfield/ }).click();
    await expect(page.getByText(/\d+ models?$/).first()).toBeVisible();

    // Pick the first model.
    await page
      .locator("button", { hasText: /chassis/i })
      .first()
      .click();
    await expect(page.getByText("Recommended setup")).toBeVisible();
    await expect(page.getByRole("region", { name: /setup/i })).toBeVisible();
    await expect(page.getByRole("button", { name: "Change bike" })).toBeVisible();

    // Kit customizer: radiogroups replace the old native selects.
    expect(await page.locator("select").count()).toBe(0);
    const groups = page.getByRole("radiogroup");
    expect(await groups.count()).toBeGreaterThanOrEqual(1);

    // Keyboard: arrow moves selection within the light group.
    const firstGroup = groups.first();
    const checked = firstGroup.getByRole("radio", { checked: true });
    const before = await checked.textContent();
    await checked.focus();
    await page.keyboard.press("ArrowDown");
    const after = await firstGroup.getByRole("radio", { checked: true }).textContent();
    expect(after).not.toBe(before);

    // Add to cart confirms.
    await page.getByRole("button", { name: /Add Configured Kit to Cart/ }).click();
    await expect(page.getByText(/Kit Added to Cart/)).toBeVisible();
  });

  test("copy pass: no system vocabulary leaks", async ({ page }) => {
    await page.goto("/fit/");
    await page.getByRole("button", { name: /Royal Enfield/ }).click();
    await expect(page.getByText(/Configured Certified Setup/)).toHaveCount(0);
    await expect(page.getByText(/profiles found/)).toHaveCount(0);
    await expect(page.getByText(/profiles mapped/)).toHaveCount(0);
  });

  test("no console errors, no horizontal overflow", async ({ page }) => {
    const { errors } = collectErrors(page);
    await page.goto("/fit/");
    await page.waitForTimeout(1200);
    await expectNoHorizontalOverflow(page);
    expect(errors).toEqual([]);
  });
});
