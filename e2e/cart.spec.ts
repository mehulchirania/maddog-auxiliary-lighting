import { test, expect } from "@playwright/test";

test.describe("add to cart — ProductCard", () => {
  test("range catalogue: add to cart opens the drawer and updates the badge, without navigating", async ({
    page,
  }) => {
    await page.goto("/lights/");
    const addBtn = page.getByRole("button", { name: "Add to cart" }).first();
    await addBtn.scrollIntoViewIfNeeded();

    const badgeBefore = await page
      .locator('[aria-label*="Shopping cart"]')
      .getAttribute("aria-label");
    const before = parseInt(badgeBefore?.match(/\d+/)?.[0] ?? "0", 10);

    await addBtn.click();

    // Must not navigate away to the product page.
    await expect(page).toHaveURL(/\/lights\/$/);

    // Confirmation is the cart drawer opening with the item inside it.
    const drawer = page.getByRole("dialog", { name: "Shopping Cart" });
    await expect(drawer).toBeVisible();

    const badgeAfter = page.locator('[aria-label*="Shopping cart"]');
    await expect(badgeAfter).toHaveAttribute("aria-label", new RegExp(`${before + 1} items?`));
  });

  test("clicking the card body (not the button) still navigates to the product page", async ({
    page,
  }) => {
    await page.goto("/lights/");
    const link = page.locator("a[href^='/products/']").first();
    const href = await link.getAttribute("href");
    await link.click();
    await expect(page).toHaveURL(new RegExp(href!.replace(/\//g, "\\/")));
  });
});
