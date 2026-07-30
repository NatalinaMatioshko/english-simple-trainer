import { useEffect, useState } from "react";
import { FirebaseError } from "firebase/app";
import { collection, getDocs, query } from "firebase/firestore";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { Loader } from "../components/Loader";
import "../styles/pages.css";

// VITE_TEACHER_EMAIL provides an early client-side "wrong account" check (UX only).
// Actual access is enforced server-side by Firestore Rules on request.auth.token.email.
const TEACHER_EMAIL = import.meta.env.VITE_TEACHER_EMAIL as string | undefined;

const provider = new GoogleAuthProvider();

type AuthPhase = "loading" | "signed-out" | "wrong-account" | "ready";

type FeedItem = {
  id: string;
  source: "homework" | "writing";
  title: string;
  meta: string;
  body: string;
  sortMs: number;
};

function timestampToMs(
  value: unknown,
): number {
  if (
    value &&
    typeof value === "object" &&
    "seconds" in value &&
    typeof (value as { seconds: unknown }).seconds === "number"
  ) {
    return (value as { seconds: number }).seconds * 1000;
  }
  if (typeof value === "string") {
    const ms = Date.parse(value);
    return Number.isNaN(ms) ? 0 : ms;
  }
  return 0;
}

function formatMs(ms: number) {
  if (!ms) return null;
  return new Date(ms).toLocaleString();
}

function signInErrorMessage(err: unknown): string {
  const code =
    err instanceof FirebaseError
      ? err.code
      : err && typeof err === "object" && "code" in err
        ? String((err as { code: unknown }).code)
        : "";
  const message =
    err instanceof Error ? err.message : typeof err === "string" ? err : "";
  const haystack = `${code} ${message}`.toLowerCase();

  if (
    haystack.includes("api_key_invalid") ||
    haystack.includes("api-key-not-valid") ||
    haystack.includes("invalid-api-key")
  ) {
    return "Invalid Firebase API key (API_KEY_INVALID). Paste a new key into VITE_FIREBASE_API_KEY in .env.local and restart Vite. / Невірний API ключ — встав новий у .env.local і перезапусти Vite.";
  }
  if (code === "auth/operation-not-allowed") {
    return "Google Sign-In is disabled. Enable it in Firebase Console → Authentication → Sign-in method. / Увімкни Google у Firebase Console.";
  }
  if (code === "auth/unauthorized-domain") {
    return "This domain is not authorized. Add it in Firebase Console → Authentication → Settings → Authorized domains. / Додай домен у Authorized domains.";
  }
  if (
    code === "auth/popup-closed-by-user" ||
    code === "auth/cancelled-popup-request"
  ) {
    return "Sign-in popup was closed. Try again. / Вікно входу закрито — спробуй ще раз.";
  }
  if (code === "auth/popup-blocked") {
    return "Sign-in popup was blocked by the browser. Allow popups and try again. / Браузер заблокував вікно — дозволь popups.";
  }
  return "Sign-in failed or was cancelled. / Вхід не вдався або скасований.";
}

export default function AdminSubmissions() {
  const [phase, setPhase] = useState<AuthPhase>("loading");
  const [user, setUser] = useState<User | null>(null);
  const [items, setItems] = useState<FeedItem[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [error, setError] = useState("");
  const [signInError, setSignInError] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setError("");
      if (!u) {
        setPhase("signed-out");
        setItems([]);
      } else if (TEACHER_EMAIL && u.email !== TEACHER_EMAIL) {
        setPhase("wrong-account");
        setItems([]);
      } else {
        setPhase("ready");
      }
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (phase !== "ready") return;

    setDataLoading(true);
    const load = async () => {
      try {
        const [hwSnap, writingSnap] = await Promise.all([
          getDocs(query(collection(db, "homeworkAnswers"))),
          getDocs(query(collection(db, "writingSubmissions"))),
        ]);

        const homework: FeedItem[] = hwSnap.docs.map((docSnap) => {
          const d = docSnap.data();
          const sortMs = timestampToMs(d.createdAt);
          const when = formatMs(sortMs);
          return {
            id: `hw-${docSnap.id}`,
            source: "homework",
            title: `${d.studentName || "Unknown student"} — Lesson ${d.lessonId || "?"}`,
            meta: [
              `Test: ${d.testDone ? "Done" : "Not done"}`,
              `Quiz: ${d.quizDone ? "Done" : "Not done"}`,
              typeof d.quizScore === "number" ? `score ${d.quizScore}` : null,
              when,
            ]
              .filter(Boolean)
              .join(" · "),
            body:
              typeof d.writing === "string" && d.writing.trim()
                ? d.writing
                : "No writing answer.",
            sortMs,
          };
        });

        const writing: FeedItem[] = writingSnap.docs.map((docSnap) => {
          const d = docSnap.data();
          const sortMs =
            timestampToMs(d.serverCreatedAt) || timestampToMs(d.createdAt);
          const when = formatMs(sortMs);
          const page =
            d.page === "self-study"
              ? "Self-study"
              : d.page === "about-me"
                ? "About me"
                : "Writing";
          return {
            id: `wr-${docSnap.id}`,
            source: "writing",
            title: `${d.name || "Unknown student"} — ${page}`,
            meta: [
              d.age ? `age ${d.age}` : null,
              [d.city, d.country].filter(Boolean).join(", ") || null,
              when,
            ]
              .filter(Boolean)
              .join(" · "),
            body:
              typeof d.text === "string" && d.text.trim()
                ? d.text
                : "No writing answer.",
            sortMs,
          };
        });

        setItems(
          [...homework, ...writing].sort((a, b) => b.sortMs - a.sortMs),
        );
      } catch {
        setError(
          "Firestore denied access. Verify that the signed-in account matches the teacher email in your Rules, and that writingSubmissions is readable by the teacher.",
        );
      } finally {
        setDataLoading(false);
      }
    };

    load();
  }, [phase]);

  const handleSignIn = async () => {
    setSignInError("");
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      setSignInError(signInErrorMessage(err));
    }
  };

  const handleSignOut = () => void signOut(auth);

  if (phase === "loading") {
    return <Loader label="Checking authentication…" />;
  }

  if (phase === "signed-out") {
    return (
      <div className="page-shell">
        <header className="page-hero panel">
          <p className="page-kicker">Admin</p>
          <h1>Submissions</h1>
          <p className="page-subtitle">
            Sign in with the teacher Google account to view submissions.
          </p>
        </header>
        <section className="panel">
          <button className="action-btn primary" onClick={handleSignIn}>
            Sign in with Google
          </button>
          {signInError && (
            <p className="homework-error" style={{ marginTop: "0.75rem" }}>
              {signInError}
            </p>
          )}
        </section>
      </div>
    );
  }

  if (phase === "wrong-account") {
    return (
      <div className="page-shell">
        <header className="page-hero panel">
          <p className="page-kicker">Admin</p>
          <h1>Submissions</h1>
          <p className="page-subtitle">
            Signed in as <strong>{user?.email}</strong>. This account does not
            have access.
          </p>
        </header>
        <section className="panel">
          <button className="action-btn secondary" onClick={handleSignOut}>
            Sign out and try a different account
          </button>
        </section>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <header className="page-hero panel">
        <p className="page-kicker">Admin</p>
        <h1>Submissions</h1>
        <p className="page-subtitle">
          Signed in as <strong>{user?.email}</strong>
          <br />
          Homework (HW27–30) + About me / Self-study writing.
        </p>
        <button
          className="action-btn secondary"
          style={{ marginTop: "0.75rem" }}
          onClick={handleSignOut}
        >
          Sign out
        </button>
      </header>

      {dataLoading && (
        <Loader variant="inline" label="Loading submissions…" />
      )}

      {error && (
        <section className="panel">
          <p className="homework-error">{error}</p>
        </section>
      )}

      {!dataLoading && !error && (
        <section className="homework-list">
          {items.length === 0 ? (
            <article className="panel homework-card">
              <p>No submissions yet.</p>
            </article>
          ) : (
            items.map((item) => (
              <article className="panel homework-card" key={item.id}>
                <p className="page-kicker" style={{ marginBottom: "0.35rem" }}>
                  {item.source === "homework" ? "Homework" : "Writing"}
                </p>
                <h2>{item.title}</h2>
                <p className="lesson-topic">{item.meta}</p>
                <pre className="homework-pre">{item.body}</pre>
              </article>
            ))
          )}
        </section>
      )}
    </div>
  );
}
