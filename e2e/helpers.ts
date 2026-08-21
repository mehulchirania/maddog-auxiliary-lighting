import { Page, expect } from "@playwright/test";

// Console errors that predate this build pass (site-wide, appears on every page;
// tracked separately in redesign-audit-fix-2 follow-ups).
const KNOWN_PREEXISTING = [
  /state update on a component that hasn't mounted yet/i,
  /Download the React DevTools/i,
];

export function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() !== "error") return;
    const text = msg.text();
    if (KNOWN_PREEXISTING.some((re) => re.test(text))) return;
    errors.push(text);
  });
  page.on("pageerror", (err) => errors.push(String(err)));
  const failed: string[] = [];
  page.on("response", (res) => {
    if (res.status() >= 400 && res.url().startsWith("http://localhost:3000")) {
      failed.push(`${res.status()} ${res.url()}`);
    }
  });
  return { errors, failed };
}

export async function expectNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
  expect(overflow, "page must not scroll horizontally").toBeLessThanOrEqual(1);
}
