import { expect, test } from "@playwright/test";

test.describe("content-driven lesson smoke", () => {
  test("/lesson-37 redirects to /lessons/37", async ({ page }) => {
    await page.goto("/lesson-37");
    await expect(page).toHaveURL(/\/lessons\/37\/?$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("direct /lessons/43 loads the lesson", async ({ page }) => {
    await page.goto("/lessons/43");
    await expect(page).toHaveURL(/\/lessons\/43\/?$/);
    await expect(
      page.getByRole("heading", { level: 1, name: /A long journey/i }),
    ).toBeVisible();
  });

  test("Lesson 43 → HW43 → back to lesson", async ({ page }) => {
    await page.goto("/lessons/43");
    await expect(page).toHaveURL(/\/lessons\/43\/?$/);
    await page.getByRole("link", { name: /HW43/i }).first().click();
    await expect(page).toHaveURL(/\/hw-43\/?$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.getByRole("link", { name: /Lesson 43/i }).click();
    await expect(page).toHaveURL(/\/lessons\/43\/?$/);
    await expect(
      page.getByRole("heading", { level: 1, name: /A long journey/i }),
    ).toBeVisible();
  });

  test("Lessons catalog opens Lesson 43", async ({ page }) => {
    await page.goto("/lessons");
    await page.getByRole("link", { name: /43\.\s*A long journey/i }).click();
    await expect(page).toHaveURL(/\/lessons\/43\/?$/);
    await expect(
      page.getByRole("heading", { level: 1, name: /A long journey/i }),
    ).toBeVisible();
  });

  test("Lesson 43 VocabFlip works with keyboard", async ({ page }) => {
    await page.goto("/lessons/43");
    const card = page
      .locator("#l43-vocab")
      .getByRole("button")
      .first();
    await card.focus();
    await expect(card).toBeFocused();
    await expect(card).toHaveAttribute("aria-pressed", "false");
    await page.keyboard.press("Enter");
    await expect(card).toHaveAttribute("aria-pressed", "true");
    await page.keyboard.press("Space");
    await expect(card).toHaveAttribute("aria-pressed", "false");
  });

  test("mobile: Lesson 43 has no horizontal document overflow", async ({
    page,
  }, testInfo) => {
    // Intentionally mobile-only: desktop Chromium is skipped (not a failing test).
    // Horizontal overflow is the regression we care about at ~Pixel 5 width.
    test.skip(
      testInfo.project.name !== "mobile-chrome",
      "Mobile-only viewport check; skipped on desktop Chromium by design",
    );
    await page.goto("/lessons/43");
    await expect(
      page.getByRole("heading", { level: 1, name: /A long journey/i }),
    ).toBeVisible();

    const overflow = await page.evaluate(() => {
      const doc = document.documentElement;
      return {
        scrollWidth: doc.scrollWidth,
        clientWidth: doc.clientWidth,
      };
    });
    expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth + 1);
  });
});
