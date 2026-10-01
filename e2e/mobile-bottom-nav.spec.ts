import { expect, test } from "@playwright/test";

type Rect = { top: number; left: number; right: number; bottom: number };

function overlapArea(a: Rect, b: Rect): number {
  const x = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left));
  const y = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
  return x * y;
}

/**
 * Regression: scroll-to-top must sit above MobileNav and not cover its last item.
 * Mobile-only — desktop Chromium is skipped by design.
 */
test.describe("mobile bottom navigation clearance", () => {
  test("scroll-to-top does not overlap MobileNav last link", async ({
    page,
  }, testInfo) => {
    test.skip(
      testInfo.project.name !== "mobile-chrome",
      "Mobile-only dock/scroll-top geometry; skipped on desktop Chromium by design",
    );

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/trainer");
    await expect(
      page.getByRole("navigation", { name: "Мобільна навігація" }),
    ).toBeVisible();

    // Scroll enough for the floating button to appear (threshold: 300px).
    await page.evaluate(() => window.scrollTo(0, 500));
    await expect(
      page.getByRole("button", { name: "Повернутися наверх" }),
    ).toBeVisible();

    const geometry = await page.evaluate(() => {
      const nav = document.querySelector(".mobile-nav");
      const btn = document.querySelector(".scroll-top-btn");
      const links = [
        ...document.querySelectorAll<HTMLElement>(".mobile-nav-link"),
      ];
      const last = links.at(-1);
      if (!nav || !btn || !last) {
        return { ok: false as const, reason: "missing elements" };
      }
      const navRect = nav.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      const lastRect = last.getBoundingClientRect();
      return {
        ok: true as const,
        nav: {
          top: navRect.top,
          left: navRect.left,
          right: navRect.right,
          bottom: navRect.bottom,
        },
        btn: {
          top: btnRect.top,
          left: btnRect.left,
          right: btnRect.right,
          bottom: btnRect.bottom,
        },
        last: {
          top: lastRect.top,
          left: lastRect.left,
          right: lastRect.right,
          bottom: lastRect.bottom,
        },
        gap: navRect.top - btnRect.bottom,
      };
    });

    expect(geometry.ok).toBe(true);
    if (!geometry.ok) return;

    expect(overlapArea(geometry.btn, geometry.last)).toBe(0);
    expect(overlapArea(geometry.btn, geometry.nav)).toBe(0);
    // Button bottom edge must clear the dock (small float tolerance).
    expect(geometry.gap).toBeGreaterThanOrEqual(4);
  });

  test("last nav link remains clickable under scroll-to-top", async ({
    page,
  }, testInfo) => {
    test.skip(
      testInfo.project.name !== "mobile-chrome",
      "Mobile-only dock/scroll-top geometry; skipped on desktop Chromium by design",
    );

    // Use a long window-scrolling page so scroll-to-top appears (threshold: 300).
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/trainer");
    await page.evaluate(() => window.scrollTo(0, 600));
    await expect(
      page.getByRole("button", { name: "Повернутися наверх" }),
    ).toBeVisible();

    const lastLink = page
      .getByRole("navigation", { name: "Мобільна навігація" })
      .getByRole("link")
      .last();

    await expect(lastLink).toBeVisible();
    await lastLink.click();
    await expect(page).toHaveURL(/\/review\/?/);
  });
});
