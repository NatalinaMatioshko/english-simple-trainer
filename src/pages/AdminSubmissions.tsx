import { useEffect, useState } from "react";
import { FirebaseError } from "firebase/app";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
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

type Submission = {
  id: string;
  studentName?: string;
  lessonId?: string;
  writing?: string;
  testDone?: boolean;
  quizDone?: boolean;
  quizScore?: number;
  createdAt?: { seconds?: number };
};

function formatCreatedAt(createdAt?: { seconds?: number }) {
  if (typeof createdAt?.seconds !== "number") return null;
  return new Date(createdAt.seconds * 1000).toLocaleString();
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
  const [items, setItems] = useState<Submission[]>([]);
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
        const q = query(
          collection(db, "homeworkAnswers"),
          orderBy("createdAt", "desc"),
        );
        const snapshot = await getDocs(q);
        setItems(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<Submission, "id">),
          })),
        );
      } catch {
        setError(
          "Firestore denied access. Verify that the signed-in account matches the teacher email in your Rules.",
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

  // phase === "ready" — teacher confirmed, Firestore read in progress or done
  return (
    <div className="page-shell">
      <header className="page-hero panel">
        <p className="page-kicker">Admin</p>
        <h1>Submissions</h1>
        <p className="page-subtitle">
          Signed in as <strong>{user?.email}</strong>
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
            items.map((item) => {
              const when = formatCreatedAt(item.createdAt);
              return (
                <article className="panel homework-card" key={item.id}>
                  <h2>
                    {item.studentName || "Unknown student"} — Lesson{" "}
                    {item.lessonId || "?"}
                  </h2>
                  <p className="lesson-topic">
                    Test: {item.testDone ? "Done" : "Not done"} | Quiz:{" "}
                    {item.quizDone ? "Done" : "Not done"}
                    {typeof item.quizScore === "number"
                      ? ` (score ${item.quizScore})`
                      : ""}
                    {when ? ` · ${when}` : ""}
                  </p>
                  <pre className="homework-pre">
                    {item.writing?.trim() || "No writing answer."}
                  </pre>
                </article>
              );
            })
          )}
        </section>
      )}
    </div>
  );
}
