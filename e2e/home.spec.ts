import { test, expect } from "@playwright/test";
import { collectErrors, expectNoHorizontalOverflow } from "./helpers";

test.describe("homepage", () => {
  test("hero: load sweep settles at 270m and readout tracks the pointer", async ({ page }) => {
    await page.goto("/");
    const readout = page.locator("text=/\\d+m lit/").first();
    await expect(readout).toBeVisible();

    // Sweep runs 1.1s from x=0.95 (387) to x=0.5 (270). After it settles:
    await expect(readout).toHaveText(/^270m lit$/, { timeout: 4000 });

    // Moving the pointer across the hero must change the number 1:1.
    const hero = page.locator("section").first();
    const box = (await hero.boundingBox())!;
    await page.mouse.move(box.x + box.width * 0.85, box.y + box.height / 2);
    const after = await readout.textContent();
    expect(after).not.toBe("270m lit");
    const n = parseInt(after!, 10);
    expect(n).toBeGreaterThanOrEqual(140);
    expect(n).toBeLessThanOrEqual(400);
  });

  test("hero readouts stay legible at any drag position (glass-deep backing)", async ({
    page,
  }) => {
    await page.goto("/");
    const hero = page.locator("section").first();
    const box = (await hero.boundingBox())!;

    for (const frac of [0.1, 0.5, 0.95]) {
      await page.mouse.move(box.x + box.width * frac, box.y + box.height / 2);
      const readoutBg = await page
        .locator("text=/\\d+m lit/")
        .first()
        .locator("xpath=ancestor::div[contains(@class,'glass-deep')]")
        .evaluate((el) => getComputedStyle(el).backgroundColor);
      // .glass-deep is rgba(10,10,11,0.78) — must not be transparent/absent.
      expect(readoutBg).not.toBe("rgba(0, 0, 0, 0)");
      const alpha = parseFloat(readoutBg.split(",")[3]);
      expect(alpha, `readout backing must stay opaque enough at x=${frac}`).toBeGreaterThan(0.5);
    }
  });

  test("hero copy: instruction paragraph replaced with brand line", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Same light, same road — seen from both sides.")).toBeVisible();
    await expect(page.getByText(/Move across the frame/)).toHaveCount(0);
  });

  test("no comparison UI on the landing page", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Two at a time, side by side.")).toHaveCount(0);
    await expect(page.getByText(/Pick any two/)).toHaveCount(0);
    // The single sanctioned mention is the quiet link:
    await expect(page.getByRole("link", { name: /Compare the full range/ })).toHaveAttribute(
      "href",
      "/lights/"
    );
  });

  test("range grid: 5 category tiles with computed meta lines and valid targets", async ({
    page,
  }) => {
    const { failed } = collectErrors(page);
    await page.goto("/");

    for (const cat of [
      "Aux lights",
      "Phone holders",
      "Switches & harness",
      "Mounts & clamps",
      "Ultraviolette",
    ]) {
      await expect(page.getByText(cat, { exact: false }).first()).toBeVisible();
    }
    // Computed "N products · from ₹X" lines — at least 4 plate-render tiles carry one.
    const metas = page.locator("text=/\\d+ products? · from ₹[\\d,]+/");
    expect(await metas.count()).toBeGreaterThanOrEqual(4);

    // Every tile link must resolve to a real page (no 404 / not-found).
    const hrefs = await page
      .locator("a")
      .evaluateAll((as) =>
        as
          .map((a) => (a as HTMLAnchorElement).getAttribute("href")!)
          .filter((h) => h && (h.startsWith("/products/") || h === "/lights/"))
      );
    const unique = [...new Set(hrefs)];
    expect(unique.length).toBeGreaterThanOrEqual(4);
    for (const href of unique) {
      const res = await page.request.get(href);
      expect(res.status(), `${href} must exist`).toBe(200);
    }
    expect(failed).toEqual([]);
  });

  test("best-seller rail: seamless marquee with aria-hidden duplicate set", async ({ page }) => {
    await page.goto("/");
    const track = page.locator(".rail-track");
    await expect(track).toHaveCount(1);
    const hidden = track.locator('[aria-hidden="true"]');
    expect(await hidden.count()).toBeGreaterThanOrEqual(1);
    // Duplicated links must be untabbable.
    const badTabStops = await track
      .locator('[aria-hidden="true"] a:not([tabindex="-1"])')
      .count();
    expect(badTabStops).toBe(0);
  });

  test("beam-lit headline sweeps once on viewport entry", async ({ page }) => {
    await page.goto("/");
    const h2 = page.locator(".beam-lit").first();
    // Dim before entry:
    await expect(h2).not.toHaveClass(/is-lit/);
    await h2.scrollIntoViewIfNeeded();
    await expect(h2).toHaveClass(/is-lit/, { timeout: 3000 });
    // Settles at the lit end state:
    await expect
      .poll(async () => h2.evaluate((el) => getComputedStyle(el).backgroundPosition), {
        timeout: 3000,
      })
      .toMatch(/^0% /);
  });

  test("range grid headline is also beam-lit", async ({ page }) => {
    await page.goto("/");
    const h2 = page.getByText("Everything the bike needs.");
    await expect(h2).toHaveClass(/beam-lit/);
    await h2.scrollIntoViewIfNeeded();
    await expect(h2).toHaveClass(/is-lit/, { timeout: 3000 });
  });

  test("best-seller rail cards carry an Add to cart control (marquee — logic covered on /lights/)", async ({
    page,
  }) => {
    await page.goto("/");
    const mask = page.locator(".rail-mask");
    await mask.scrollIntoViewIfNeeded();
    const buttons = mask.getByRole("button", { name: "Add to cart" });
    expect(await buttons.count()).toBeGreaterThanOrEqual(6);
  });

  test("brand picker: opens, keyboard-navigates, submits to /fit/", async ({ page }) => {
    await page.goto("/");
    const trigger = page.locator('[aria-haspopup="listbox"]');
    await trigger.scrollIntoViewIfNeeded();
    await trigger.click();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    const options = page.getByRole("option");
    expect(await options.count()).toBeGreaterThanOrEqual(10);

    // Escape closes and returns focus.
    await page.keyboard.press("Escape");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(trigger).toBeFocused();

    // Select KTM and submit.
    await trigger.click();
    await page.getByRole("option", { name: /KTM/ }).click();
    await expect(trigger).toContainText("KTM");
    await page.getByRole("button", { name: /Show my fits/ }).click();
    await page.waitForURL(/\/fit\/\?brand=KTM/);
  });

  test("no console errors, no horizontal overflow", async ({ page }) => {
    const { errors } = collectErrors(page);
    await page.goto("/");
    await page.waitForTimeout(1500);
    await expectNoHorizontalOverflow(page);
    expect(errors).toEqual([]);
  });
});
