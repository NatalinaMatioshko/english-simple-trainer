# Performance & maintainability audit — content-driven lessons

Branch: `chore/performance-content-audit`  
Baseline main: after merge of Lesson 43 (PR #7).  
Date: 2026-09-24

## Goals

Identify the largest sources of technical debt and startup bundle weight after content-driven lessons, and apply only **low-risk** optimizations (no Firebase / content-model / lesson-behavior changes).

## Findings summary

| Finding | Impact | Evidence | Recommended action | Status |
|---|---|---|---|---|
| All Lesson/HW pages static in `App.tsx` | Critical — ~2.4 MB main JS | Vite `index-*.js` ~2415 kB (gzip ~604 kB); 50+ static imports | Route-level `React.lazy` + `Suspense` | Done in this branch |
| Content-driven L36–38/43 bodies already split | Positive | `lessonRegistry` `load()` → `lesson-*.js` chunks 4–11 kB | Keep async `load()` | Keep |
| `lessonSectionRegistry` eagerly imports all customs | High on `/lessons/*` | All custom sections static | Lazy-register customs by `componentKey` | Later PR |
| `vocab.ts` ~109 kB / 3.8k lines pulled via Home | Medium | `Home` imports `vocabCategories` for counts | Lightweight vocab stats module; keep VocabPage lazy | Later PR |
| `lesson42.ts` re-exported L43 travel activities | Medium coupling / chunk bloat | `export { … } from lesson-43/activities` | Import L43 data only from content path | Done in this branch |
| Global CSS ~347 kB (gzip ~57 kB) | Medium | Vite CSS asset | Per-route CSS / purge unused | Later |
| Media: ~111 MB sounds, ~75 MB images, 1 PDF | Bandwidth (not JS) | `public/sounds`, `public/images`, Preposition Geometry PDF | Already URL-lazy; compress / defer later | Later |
| Repository-wide ESLint debt | Maintainability | `npm run lint` → 17 errors, 1 warning | Document; fix in focused PRs | Documented below |

## Baseline Vite build (before lazy routes)

```
dist/assets/index-*.css     ~347 kB │ gzip ~57 kB
dist/assets/lesson-*.js     4 chunks (content-driven) ~4–11 kB each
dist/assets/index-*.js      ~2415 kB │ gzip ~604 kB
Warning: Some chunks are larger than 500 kB after minification
```

Content-driven lesson bodies were already code-split via registry `import()`. Legacy pages were not.

## Vite build after this branch

```
dist/assets/index-*.js      ~809 kB │ gzip ~243 kB   (≈ −66% raw, ≈ −60% gzip vs baseline)
Route chunks: Lesson*/HW*/VocabPage/LessonPage/etc. loaded on demand
Content-driven lesson-*.js chunks retained
Main chunk still >500 kB (Firebase + shared app shell) — further work in next PRs
```

## Changes in this branch

1. **`src/app/App.tsx`** — route-level `React.lazy` for pages + `Suspense` fallback (`RouteFallback`). Shell (`ThemeProvider`, `AuthProvider`, `SiteLayout`) stays eager.
2. **`src/data/lesson42.ts`** — removed dead re-exports of Lesson 43 travel activities (callers already import from `content/lessons/lesson-43/`).
3. **This doc** — audit trail + lint inventory.

## Repository-wide lint issues (unchanged)

`npm run lint` (`eslint .`) reported **18 problems (17 errors, 1 warning)** on baseline. Not fixed in this PR on purpose.

Patterns:

- `react-hooks/set-state-in-effect` — HW25–HW40 flashcard decks, Home inbox, SelfStudyReview, etc.
- `react-refresh/only-export-components` — components that also export helpers/constants
- `@typescript-eslint/no-unused-expressions` — `Lesson24.tsx`
- `react-hooks/exhaustive-deps` — 1 warning (layout / location)

Treat as a separate cleanup track; do not block lesson shipping.

## Recommended next PRs (priority)

1. **Lazy custom section components** in `lessonSectionRegistry` (dynamic `import()` by `componentKey`) so `/lessons/36` does not download L38/L43-only UI.
2. **Vocab stats split** — Home should not import full `vocab.ts`; VocabPage already route-lazy after this PR.
3. **Asset pass** — compress large lesson images; audit unused Unit audio.
4. **Focused lint PR** — fix `set-state-in-effect` in HW flashcard decks with a shared pattern.
5. **CSS code-splitting** — reduce global CSS weight for first paint.

## Out of scope (explicit)

- Firestore as runtime lesson source / CMS
- Firebase Auth, Rules, `studentVocab`, `homeworkAnswers`, `writingSubmissions`, env
- Lesson content / route path / UX redesign
