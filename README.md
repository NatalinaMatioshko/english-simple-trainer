# English Simple Trainer

Personal A1 English teaching SPA for one-to-one lessons: roadmap, interactive lessons, vocabulary, quizzes, audio drills, and homework submissions.

Built with **React 19 + Vite 8 + TypeScript**, deployed to **GitHub Pages**.

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

```bash
cp .env.example .env.local
```

Fill values from **Firebase Console → Project settings → Your apps** (web app).  
`.env.local` is gitignored — do not commit it.

**Next step if Auth fails (`API_KEY_INVALID`):** Google Cloud Console → APIs & Services → Credentials → create/regenerate a Browser key → paste into `VITE_FIREBASE_API_KEY` in `.env.local` → restart `npm run dev` → test `/admin/submissions`.

| Variable | Purpose |
|----------|---------|
| `VITE_TEACHER_EMAIL` | Teacher email for `/admin/submissions` (client UX check only) |
| `VITE_FIREBASE_API_KEY` | Firebase web API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Auth domain |
| `VITE_FIREBASE_PROJECT_ID` | Project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Messaging sender ID |
| `VITE_FIREBASE_APP_ID` | Web app ID |

If `VITE_TEACHER_EMAIL` is not set, the wrong-account check is skipped; any signed-in Google account may attempt the Firestore read (Rules still deny non-teacher accounts).

Missing Firebase `VITE_*` vars throw a clear error at startup.

**GitHub Pages deploy:** `npm run deploy` runs `predeploy` → `npm run build` (`tsc -b` + `vite build`), then `gh-pages -d dist`. Vite bakes `VITE_*` into the bundle at **build time**, so `.env.local` must be present on the machine that runs `npm run deploy` (or inject the same vars in CI before `vite build`). Restrict the API key by HTTP referrer in Google Cloud Console; enforce access with Firestore rules — the web `apiKey` is still visible in the client bundle by design.

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
  firebase.ts     # Firebase init (config from VITE_* env)
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

Config is loaded from `VITE_FIREBASE_*` env vars (see `.env.example`). The web `apiKey` is still public in the client bundle after build — that is expected. Security is enforced via **Firestore Security Rules** and API key HTTP referrer restrictions, not by hiding the key in `.env`.

---

## Useful routes

| Path | Page |
|------|------|
| `/` | Home |
| `/lessons` | Lessons list |
| `/lesson-28` | Everyday things |
| `/hw-28` | Homework · Lesson 28 |
| `/vocab` | Vocabulary |
| `/trainer` | Practice trainer |
| `/homework` | Homework index |
| `/admin/submissions` | Teacher: submissions |
