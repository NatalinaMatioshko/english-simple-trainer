# English Simple Trainer

Personal A1 English teaching SPA for one-to-one lessons: roadmap, interactive lessons, vocabulary, quizzes, audio drills, and homework submissions.

Built with **React 19 + Vite 8 + TypeScript**, deployed to **GitHub Pages**.

**Current lesson:** Lesson 28 — Everyday things (`this / that / these / those`, everyday objects). Route: `/lesson-28`.

---

## Features

- **Roadmap** — curriculum overview (lessons 1–32), current / completed / next status
- **Lessons 15–28** — full interactive pages (speaking, vocab matching, listening, grammar)
- **Lessons 29–30** — placeholders (routes ready)
- **Homework** — `/hw-25`…`/hw-28` with flashcards and scored quizzes; older `/homework/:id` still used for early lessons
- **Vocab** — dictionary with IPA + Web Speech pronunciation
- **Trainer** — Present Simple / frequency practice decks
- **Self-study / About me** — writing practice saved to Firestore
- **Admin** — teacher view of homework submissions (Google Sign-In)

---

## Run locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173/english-simple-trainer/`

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Vite dev server |
| `npm run build` | Typecheck (`tsc -b`) + production build → `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | ESLint |
| `npm run deploy` | Build, then publish `dist/` to `gh-pages` |

Production base path: `/english-simple-trainer/` (see `vite.config.ts`).

Live: `https://<your-github-username>.github.io/english-simple-trainer/`

---

## Environment variables

Create a `.env.local` file in the project root (not committed):

```env
# Teacher email for /admin/submissions.
# Client-side "wrong account" UX check only.
# Real access control: Firestore Security Rules on request.auth.token.email.
VITE_TEACHER_EMAIL=your-teacher-email@gmail.com
```

If `VITE_TEACHER_EMAIL` is not set, the wrong-account check is skipped; any signed-in Google account may attempt the Firestore read (Rules still deny non-teacher accounts).

---

## Firebase Console setup (before deploy)

**1. Enable Google Sign-In**

`Firebase Console → Authentication → Sign-in method → Google → Enable`

Without this: `auth/operation-not-allowed`.

**2. Authorize GitHub Pages domain**

`Firebase Console → Authentication → Settings → Authorized domains → Add domain`

Add: `<your-github-username>.github.io`

Without this on the live site: `auth/unauthorized-domain`.  
`localhost` is authorized by default.

---

## Project structure

```
src/
  app/            # React Router (App.tsx)
  components/     # Layout, practice cards, roadmap, vocab UI, …
  context/        # Theme (light / dark)
  data/           # Vocab, verbs, HW review decks (hw27/hw28), practice tasks
  hooks/          # Quiz / practice hooks (useScoredQuiz, …)
  pages/          # Route pages: Home, Lessons, Lesson15–30, HW25–30, Vocab, Trainer, Admin…
  services/       # Firestore helpers (e.g. writingSubmissions)
  styles/         # Global + per-lesson CSS
  types/          # Shared TypeScript types
  utils/          # shuffle, text helpers, speech (TTS)
  firebase.ts     # Public Firebase web config
public/
  images/         # Lesson posters, vocab photos, extras
  sounds/         # Unit audio (Roadmap A1 SB R-tracks) + UI sounds
```

---

## Firebase

| Collection | Used for |
|------------|----------|
| `homeworkAnswers` | Homework submissions (teacher admin page) |
| `writingSubmissions` | About me / self-study writing saves |

The Firebase web config in `src/firebase.ts` is intentionally public. Security is enforced via **Firestore Security Rules** in the Firebase Console.

---

## Useful routes

| Path | Page |
|------|------|
| `/` | Home |
| `/lessons` | Lessons list |
| `/lesson-28` | Current lesson (Everyday things) |
| `/hw-28` | Homework for Lesson 28 |
| `/vocab` | Vocabulary |
| `/trainer` | Practice trainer |
| `/homework` | Homework index |
| `/admin/submissions` | Teacher: submissions |
