# Testing — English Simple Trainer

## Stack

| Layer | Tool |
|---|---|
| Unit / component | Vitest + jsdom + React Testing Library + user-event |
| Browser smoke | Playwright (Chromium desktop + Pixel 5) |
| Matchers | `@testing-library/jest-dom` |

No Jest or Cypress.

## Commands

```bash
# Unit + component (Vitest)
npm test
npm run test:watch
npm run test:coverage

# Typecheck / lint / production build (unchanged)
npx tsc -b
npm run lint
npm run build

# Install Chromium once (required before first E2E run)
npm run test:e2e:install

# Playwright smoke
npm run test:e2e
```

## Layout

- `src/**/*.test.ts(x)` — colocated unit/component tests
- `src/test/setup.ts` — jest-dom + shared mocks (speech)
- `vitest.config.ts` — Vitest + jsdom
- `e2e/*.spec.ts` — Playwright smoke
- `playwright.config.ts` — webServer on Vite `:5173`

## Firebase in tests

- **Unit/component:** do not import the real Firebase app. Tests target lesson registry, section renderers, and L43 customs without Auth.
- **E2E:** Playwright starts Vite with **placeholder** `VITE_FIREBASE_*` values so the app boots. You stay logged out; tests never write to Firestore. Do not point E2E at production credentials.

## Writing the next unit test

1. Colocate next to the module: `FooBar.test.tsx`.
2. Prefer `render` + `getByRole` / `getByLabelText` / `getByText`.
3. Drive interactions with `@testing-library/user-event`.
4. Assert visible text, roles, and `aria-*` — not React state.

Example sketch:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { TickListSection } from "./TickListSection";

it("announces score after Check", async () => {
  const user = userEvent.setup();
  render(<TickListSection section={fixture} />);
  await user.click(screen.getByRole("button", { name: "Check" }));
  expect(screen.getByRole("status")).toHaveTextContent(/correct/i);
});
```

## Writing the next Playwright test

1. Add `e2e/your-flow.spec.ts`.
2. Use `page.getByRole` / `getByLabel` / `getByText`.
3. Keep smoke-level: navigation, one interaction, no visual screenshots.

```ts
import { test, expect } from "@playwright/test";

test("opens Lesson 43 from catalog", async ({ page }) => {
  await page.goto("/lessons");
  await page.getByRole("link", { name: /43\.\s*A long journey/i }).click();
  await expect(page).toHaveURL(/\/lessons\/43$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});
```

## First PR coverage (this foundation)

- lessonService / lessonRegistry published IDs, uniqueness, not-found, unpublished gate
- VocabFlip / TickList / PhotoSentenceMatch accessible behavior
- SectionRenderer unknown type / unknown custom key / valid custom
- E2E: L37 redirect, L43 load, HW round-trip, catalog, VocabFlip keyboard, mobile no horizontal overflow

## Playwright skip note

One case is **skipped on desktop Chromium by design**, not because it is broken:

- Title: `mobile: Lesson 43 has no horizontal document overflow`
- Runs only in the `mobile-chrome` project (Pixel 5 viewport).
- Skip reason in code: `Mobile-only viewport check; skipped on desktop Chromium by design`
- Expectation when you run `npm run test:e2e`: **11 passed, 1 skipped** (the desktop duplicate of that mobile-only test).
