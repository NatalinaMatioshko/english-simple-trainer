# Content-driven lessons

Foundation for moving off one React page per lesson. Content lives in data files; UI is shared.

Architecture review (Firestore proposal, migration criteria, section matrix):
[`docs/content-platform-architecture.md`](../../docs/content-platform-architecture.md).

## Layout

```
src/types/lesson.ts                 # shared types (discriminated section unions)
src/content/lessonRegistry.ts       # metadata SoT + lazy loaders
src/content/lessons/lesson-XX/      # full lesson content
  lesson.ts
  vocabulary.ts
  activities.ts
  homework.ts                       # metadata → existing /hw-XX route
src/features/lessons/
  LessonPage.tsx                    # /lessons/:lessonId
  LessonRenderer.tsx
  SectionRenderer.tsx
  lessonService.ts                  # local now; swap for Firestore later
  lessonSectionRegistry.ts
  sections/                         # built-in section UIs
  customs/                          # custom componentKey renderers
  lessonWorkspace.css
```

## Lesson id format

Use the numeric string id consistently: `"37"` → route `/lessons/37`, legacy `/lesson-37`.

## Add a standard lesson

1. Create `src/content/lessons/lesson-NN/` with `lesson.ts` (+ vocab/activities/homework as needed).
2. Set `status: "published"` only when ready for students (`draft` / `review` / `archived` stay hidden).
3. Register in [`lessonRegistry.ts`](../content/lessonRegistry.ts):
   - `id`, `number`, `route: "/lessons/NN"`, `legacyRoute: "/lesson-NN"`, `load: () => import(...)`.
4. Add App redirect: `/lesson-NN` → `<Navigate to="/lessons/NN" replace />` (keep the old page file as redirect only).
5. Do **not** duplicate the lesson in `src/data/lessons.ts` — the catalog merges published registry entries via `catalogAdapter`.
6. Point HW back-link to `/lessons/NN` if you update that homework page.

## Section types

| type | Required fields | Use when |
|------|-----------------|----------|
| `text` | `body`, optional `bullets`, `note` | Explanation, checklist, contrast copy |
| `vocabulary` | `items[]` (`term`, optional `gloss`) | Word lists |
| `multipleChoice` | `prompt`, `options`, `correctAnswer` | Single quiz item |
| `multipleChoiceGroup` | `items[]` with prompt/options/correctAnswer | Quiz banks (listening, grammar) |
| `fillBlank` | `items[]` with `before`/`after`/`correctAnswers` (+ optional `options` for select) | Gap fills |
| `wordOrder` | `items[]` with scramble/parts/answer | Drag/tap sentence builder |
| `speakingPrompt` | `prompts[]`, optional `note` | Teacher–student speaking |
| `writingPrompt` | `prompt` | Free writing on the lesson page |
| `homeworkLink` | `path`, `label` | Link to existing `/hw-NN` |
| `custom` | `componentKey`, optional `props` | Non-standard UI |

## Custom keys in use

| componentKey | Purpose |
|--------------|---------|
| `youtube-video` | YouTube embed (`props.videoId`) |
| `lesson37-pictures` | Zoom figures for L37 |
| `homework-fix` | Warm-up “fix the mistakes” with groups/hints |
| `photo-gallery` | Photo grid (`props.images`, alt, emoji fallback) |
| `native-audio` | Public-URL `<audio controls>` (no autoplay) |
| `lesson38-word-map` | Word map mind-map (data via props) |
| `lesson38-grammar-have-got` | Interactive have/has got grammar box |
| `lesson38-friend-speak` | Prepare notes + speak models for L38 |

## Migrated lessons

- **36** — interactive: video, MC groups, select gaps, word order, speaking
- **37** — speaking/static + custom pictures
- **38** — audio, photo gallery, WordMap, grammar box, homework-fix, matching via MC groups

## When to use `custom`

Use `custom` + `componentKey` when the exercise needs unique React (audio players, zoom figures, drag-and-drop, etc.).

1. Implement a component under `features/lessons/customs/`.
2. Register it in `lessonSectionRegistry.ts` → `customSectionComponents`.
3. Reference only the string key from lesson data — never store React elements in content.

## lessonService API

- `getLessonById(id)` — published only; throws `LessonServiceError`
- `getPublishedLessons()` — catalog metadata
- `getLessonsByModule(moduleId)`

Callers should keep using this API so a later Firestore implementation can replace the local loader without UI changes.

## Out of scope (for now)

- Firestore as content source
- Teacher CMS / draft workflow UI
- Mass migration of Lesson15–42
- Rewriting homework pages
