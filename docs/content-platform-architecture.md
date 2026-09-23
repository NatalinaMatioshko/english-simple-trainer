# Content platform architecture review

Status: **architecture review only** — no Firestore runtime switch, no teacher CMS.
Verified locally by POCs: Lesson 36, 37, 38 on branch `refactor/content-driven-lessons-foundation`.

Related: [src/content/README.md](../src/content/README.md) (how to add a local content-driven lesson today).

---

## 1. Current verified model

### Lesson

Canonical type: `Lesson` in `src/types/lesson.ts`.

| Field | Role |
|-------|------|
| `id`, `number`, `title`, `level`, `moduleId`, `order` | Identity & catalog sort |
| `status` | `draft` \| `review` \| `published` \| `archived` — student UI loads **published** only |
| `estimatedMinutes`, `hasHomework`, `topic`, `description`, `chips` | Hero / catalog copy |
| `legacyRoute`, `route` | `/lesson-NN` → `/lessons/NN` |
| `prevLessonPath`, `nextLessonPath`, `navLinks`, `flow` | In-lesson navigation |
| `sections: LessonSection[]` | Ordered body |
| `homework?` | Link metadata to existing `/hw-NN` (homework pages stay separate) |

### Lesson metadata

Student catalog does **not** load full sections. Metadata comes from:

1. `lessonRegistry` (`src/content/lessonRegistry.ts`) — SoT for content-driven lessons  
2. `catalogAdapter` → merges into `src/data/lessons.ts` catalog cards  
3. `lessonService.getPublishedLessons()` — published filter + order

Registry rows include `load: () => Promise<Lesson>` for local lazy import. A future remote source replaces `load` / service internals, not the page UI.

### LessonSection discriminated union

Every section has `type` + shared base (`id`, `title`, optional `kicker`, `description`). Built-in types and `custom` form a closed TypeScript union consumed by `SectionRenderer`.

### Reusable section types

Rendered by shared components under `src/features/lessons/sections/`:

`text`, `vocabulary`, `multipleChoice`, `multipleChoiceGroup`, `fillBlank`, `wordOrder`, `speakingPrompt`, `writingPrompt`, `homeworkLink`

### Custom section (`componentKey` + `props`)

```ts
{ type: "custom", componentKey: string, props?: Record<string, unknown>, note?: string }
```

- `componentKey` is a **string** registered in `lessonSectionRegistry.ts`  
- Props are JSON-serializable data only  
- **Never** store React nodes, functions, or class names that imply UI trees in content  

Reusable customs (stable keys meant for ≥2 lessons): e.g. `youtube-video`, `native-audio`, `photo-gallery`, `homework-fix`.  
Lesson-specific customs: e.g. `lesson37-pictures`, `lesson38-word-map`.

### lessonRegistry

Array of `LessonRegistryEntry`: metadata + `homeworkPath` + async `load`. Adding a lesson = content folder + registry row + legacy redirect page.

### lessonService

`src/features/lessons/lessonService.ts` — the only API pages should call:

- `getLessonById(id)` — published; throws `LessonServiceError`
- `getPublishedLessons()` / `getLessonsByModule(moduleId)`

Local implementation today; swap for Firestore behind the same signatures later.

### Dynamic route

- Canonical: `/lessons/:lessonId` → `LessonPage` → `LessonRenderer` → `SectionRenderer`  
- Legacy: `/lesson-NN` → `<Navigate to="/lessons/NN" replace />`  
- Homework remains `/hw-NN` with back-link to `/lessons/NN`

---

## 2. Content type matrix

| type / key | Required fields | Renderer | Used in | Future use | Stability |
|------------|-----------------|----------|---------|------------|-----------|
| `text` | `body`; optional `bullets`, `note` | `TextSection` | L36 remember/exit; L37 contrast/exit; L38 read/contractions/exit | Explanations, goals, model lines | **stable / reusable** |
| `vocabulary` | `items[]` (`id`, `term`, optional `gloss`) | `VocabularySection` | L37 six verbs | Any short word list | **stable / reusable** |
| `multipleChoice` | `prompt`, `options`, `correctAnswer` | `MultipleChoiceSection` | (available; L36+ prefer group) | Single quiz item | **stable / reusable** |
| `multipleChoiceGroup` | `items[]`; optional `chips` | `MultipleChoiceGroupSection` | L36 listen; L38 who/labels/match | Listening banks, photo match via selects | **stable / reusable** |
| `fillBlank` | `items[]` (`before`/`after`/`correctAnswers`); optional `options`, `choiceMode` | `FillBlankSection` | L36 gaps; L38 has/have buttons | Gap drills, alt-choice | **stable / reusable** |
| `wordOrder` | `items[]` (`scramble`, `parts`, `answer`) | `WordOrderSection` | L36; L38 Sofia | Scramble sentences | **stable / reusable** |
| `speakingPrompt` | `prompts[]`; optional `models`, `note` | `SpeakingPromptSection` | L36; L37 | Teacher–student speak lists | **stable / reusable** |
| `writingPrompt` | `prompt`; optional `placeholder` | `WritingPromptSection` | available | Free writing on lesson page | **stable / reusable** |
| `homeworkLink` | `path`, `label`; optional `summary` | `HomeworkLinkSection` | L36–38 | Exit → existing HW route | **stable / reusable** |
| `youtube-video` *(custom)* | `props.videoId`, optional `iframeTitle` | `YoutubeVideoSection` | L36; L38 | ELLLO / listening quiz embeds | **reusable custom** |
| `native-audio` *(custom)* | `props.src`, labels; optional `transcriptLines` | `NativeAudioSection` | L38 R1/R2 | Unit tracks from public/Storage URLs | **reusable custom** |
| `photo-gallery` *(custom)* | `props.images[]` (file, alt, emoji…) | `PhotoGallerySection` | L38 | Unit photo grids / matching context | **reusable custom** |
| `homework-fix` *(custom)* | `props.groups`, `props.lines` | `HomeworkFixSection` | L38 | L40+ warm-up fix banks | **reusable custom** |
| `custom` *(generic)* | `componentKey`, optional `props` | keyed in `customSectionComponents` | L37 pictures; L38 word-map, grammar, friend-speak | Any unique UI | **escape hatch** |

Lesson-specific customs (not generic types): `lesson37-pictures`, `lesson38-word-map`, `lesson38-grammar-have-got`, `lesson38-friend-speak`.

---

## 3. Rules: when to create what

### New generic section type (`type: "…"`)

Create only if **all** hold:

1. Clear reuse in **≥2 lessons** (or imminent next lesson).  
2. Props are a stable, documentable schema (no one-off layout hacks).  
3. One shared React renderer under `sections/`.  

Examples that qualified: `multipleChoiceGroup`, `wordOrder`, `fillBlank` + `choiceMode`.

### New custom `componentKey`

Use when UI is interactive/non-standard but content stays data:

1. Register under `customs/` + `lessonSectionRegistry`.  
2. Prefer a **reusable** key name (`native-audio`) if ≥2 lessons will need it.  
3. Prefer a **lesson-prefixed** key (`lesson38-word-map`) if unique.  
4. Pass all lesson copy/assets via `props` — component must not import lesson banks as SoT.

### Plain `text` / content section

Prefer `text` (or `vocabulary` / speaking lists) when:

- Copy + bullets + note are enough  
- No check/score/state beyond reading  
- Avoid inventing a section type for styling alone

### Separate React feature component

Use a non-section component (e.g. shared `WordMap` UI) when:

- Complex presentation/interaction is shared by a custom section  
- Logic is reusable outside the lesson page  
- Still: **content stays in lesson props**, not hardcoded inside the feature

**Do not** create one mega-custom that wraps an entire lesson.

---

## 4. Proposal: remote content source (design only — not implemented)

### Collections (sketch)

```
courses/{courseId}
  id, title, level, order, status

modules/{moduleId}
  id, courseId, title, order, status

lessons/{lessonId}          # lessonId = "36" | "37" | …
  // metadata + optionally embedded sections (see below)

# optional if sections grow large:
lessons/{lessonId}/sections/{sectionId}
  order, type, …fields
```

Keep ids aligned with today’s string numeric ids (`"38"`).

### Lesson document fields

Mirror `Lesson` metadata + publication:

- `number`, `title`, `level`, `moduleId`, `order`, `status`, `estimatedMinutes`, `hasHomework`  
- `topic`, `description`, `chips`  
- `legacyRoute`, `route`, `navLinks`, `flow`, `prevLessonPath`, `nextLessonPath`  
- `homework: { path, label, summary? }`  
- `updatedAt`, `publishedAt`, `schemaVersion`  
- **sections**: embedded array *or* subcollection (below)  
- **No** React code, CSS class trees as policy, or binary audio/images in Firestore

### Embedded `sections[]` vs subcollection

| Prefer embedded array | Prefer subcollection |
|-----------------------|----------------------|
| Typical A1 lesson (~10–40 sections, each small) | Rare huge banks / teacher partial edits of one section |
| Single read for `getLessonById` | Collaborative CMS editing section-by-section |
| Matches current local model | Only if docs approach size limits |

**Default recommendation:** embed `sections` on the lesson document for A1 trainer size; add subcollection later only if needed. Import tooling should support both via `schemaVersion`.

### Asset strategy

| Asset | Store in Firestore | Store in Storage / CDN / public |
|-------|--------------------|----------------------------------|
| Image/audio **metadata** (path, alt, track label) | Yes | — |
| Binary files (mp3, png) | **No** | Firebase Storage or existing `public/` / CDN |
| YouTube | `videoId` string only | YouTube hosts media |

References in content:

```json
{
  "src": "gs://…/Unit_4/RM_A1_SB_U4_R1.mp3",
  "publicUrl": "https://…",
  "alt": "Photo A — Luca"
}
```

App resolves Storage → download URL at runtime (or seed writes HTTPS URL). Same pattern as today’s `SOUND_U4` / `IMG38` helpers.

### Draft / review / published access

- Field `status` on lesson (and optionally course/module).  
- Student `getLessonById` / catalog: **`published` only** (same as local service).  
- Teachers/admins: query `draft` \| `review` via authenticated claims — **CMS later**, not student SPA.  
- `archived`: hidden from catalog; redirects optional.

### Roles (proposal)

| Role | Lessons | Notes |
|------|---------|-------|
| **student** | read `published` | Existing Auth; no write to lesson content |
| **teacher** | read draft/review/published for assigned course | Future CMS; no student vocab/HW mutation via content APIs |
| **admin** | full content CRUD + publish | Rules + App Check |

Do **not** change Auth/vocab/homework collections as part of content migration.

### Never put React in Firestore

- Content may only reference `type` or `componentKey` strings already shipped in the app build.  
- Unknown `componentKey` → safe fallback UI (already in `SectionRenderer`).  
- New UI requires an **app deploy** that registers the key — remote content cannot invent renderers.  
- Validate payloads with a shared JSON schema / Zod mirror of `LessonSection` before seed or CMS save.

---

## 5. Migration plan

### Gradual lesson migration

1. Author `src/content/lessons/lesson-NN/` from existing page + data.  
2. Register published entry; legacy page → redirect.  
3. Point HW back-link to `/lessons/NN`.  
4. Catalog picks registry via adapter (remove duplicate legacy catalog row automatically).  
5. Manual QA + preview; keep next unmigrated lessons on old pages.

Order suggestion after 36–38: next complex Unit lesson (e.g. 39) or a simpler speaking lesson — keep POC diversity.

### Legacy URLs

Keep forever (or until analytics say unused):

`/lesson-NN` → `/lessons/NN`  
Do not break bookmarks or homework links that still mention legacy paths during transition.

### Adding a new lesson **now** (pre-Firestore)

Follow `src/content/README.md`: content folder → registry → redirect → HW back-link. No Firestore.

### Future import local → Firestore

1. Build `scripts/import-lessons.ts` (or similar): read validated local `Lesson` objects.  
2. Strip non-serializable bits (`load` functions).  
3. Validate against schema (`schemaVersion`).  
4. Write to `lessons/{id}` in a **staging** project first.  
5. Assets: ensure Storage paths exist; rewrite `src` if needed.  
6. Only then point staging `lessonService` at Firestore behind a feature flag.

### Rollback

| Layer | Rollback |
|-------|----------|
| Single lesson | Set registry `status` away from published **or** revert redirect to restore old page from git |
| App release | Redeploy previous build; local service remains default until flag flip |
| After Firestore flag | Flag off → local `lessonRegistry` loaders; Firestore data left intact |
| Data | Import script idempotent by `lessonId` + `schemaVersion`; keep git as authoring SoT until CMS exists |

---

## 6. Criteria before Firestore **runtime** switch

Do **not** switch student production to Firestore until:

1. **≥5–6** lessons of varied shapes in the content model (speaking, interactive, audio/photo/custom). *Today: 3 POCs — not enough alone.*  
2. This doc + `src/types/lesson.ts` treated as the documented schema; optional JSON Schema/Zod export.  
3. **Validated import/seed script** with dry-run + staging.  
4. **Security rules proposal** reviewed (student read published only; no content write from client).  
5. Preview/staging verification of catalog, legacy redirects, HW round-trip, assets.  
6. Explicit **rollback** to local `lessonService` (feature flag or build-time source).  
7. **No regressions** in Firebase Auth, student vocab, homework submissions (those systems untouched by content source swap).

**Next allowed phase (after this review):** Firestore **schema + import tooling** design/implementation in isolation — **without** flipping runtime for students.

---

## Appendix: current POC coverage

| Lesson | Shape exercised |
|--------|-----------------|
| 37 | Speaking / static + lesson-specific custom pictures |
| 36 | Video, MC groups, select gaps, word order, speaking |
| 38 | Audio, photo gallery, WordMap, grammar custom, homework-fix, button gaps |

Enough to **design** remote schema and tooling. Not enough to flip runtime.
