# English Simple Trainer

A personal English teaching SPA for Present Simple lessons — adverbs of frequency, prepositions, speaking drills, vocabulary flashcards, and homework submissions.

Built with **React 19 + Vite 8 + TypeScript**, deployed to **GitHub Pages**.

---

## Run locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173/english-simple-trainer/`

---

## Build

```bash
npm run build
```

Output goes to `dist/`. The production base path is `/english-simple-trainer/` (configured in `vite.config.ts`).

---

## Deploy to GitHub Pages

```bash
npm run deploy
```

This runs `npm run build` then pushes `dist/` to the `gh-pages` branch via the `gh-pages` package.

Live at: `https://<your-github-username>.github.io/english-simple-trainer/`

---

## Environment variables

Create a `.env.local` file in the project root (not committed to git):

```env
# Teacher email for the /admin/submissions page.
# Used for a client-side "wrong account" UX check only — shows a clear message
# if the wrong Google account is signed in before attempting a Firestore read.
# Real access control is enforced by Firestore Security Rules on request.auth.token.email.
VITE_TEACHER_EMAIL=your-teacher-email@gmail.com
```

If `VITE_TEACHER_EMAIL` is not set, the wrong-account check is skipped and any
signed-in Google account will attempt the Firestore read — which the Rules will deny
if it is not the teacher account.

---

## Firebase Console setup required before deploy

Two manual steps are needed in the Firebase Console for Google Sign-In to work on GitHub Pages:

**1. Enable Google Sign-In provider**

`Firebase Console → Authentication → Sign-in method → Google → Enable`

Without this, `signInWithPopup` throws `auth/operation-not-allowed`.

**2. Add the GitHub Pages domain to Authorized domains**

`Firebase Console → Authentication → Settings → Authorized domains → Add domain`

Add: `<your-github-username>.github.io`

Without this, `signInWithPopup` throws `auth/unauthorized-domain` on the deployed site.
`localhost` is already authorized by default, so local dev works without this step.

---

## Project structure

```
src/
  app/          # App router
  components/   # UI components (layout, study, practice, lesson-specific)
  data/         # Static task and verb data
  hooks/        # Custom exercise hooks
  pages/        # Route-level pages (Lesson15–18, Homework, Admin…)
  styles/       # CSS files
  types/        # Shared TypeScript types
  utils/        # shuffle(), normalize()
public/
  images/       # Lesson images (prepositions, vocabulary)
  sounds/       # Match game sound
```

---

## Firebase

Homework submissions are stored in **Firestore** (`homeworkAnswers` collection).  
The Firebase web config in `src/firebase.ts` is intentionally public — security is enforced via **Firestore Security Rules** in the Firebase Console.
