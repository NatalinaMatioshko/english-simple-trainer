import { useEffect, useMemo, useState } from "react";
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
import {
  markSubmissionReviewed,
  type SubmissionCollection,
} from "../services/submissionReview";
import "../styles/pages.css";
import "../styles/adminSubmissions.css";

const TEACHER_EMAIL = import.meta.env.VITE_TEACHER_EMAIL as string | undefined;

const provider = new GoogleAuthProvider();

type AuthPhase = "loading" | "signed-out" | "wrong-account" | "ready";
type SourceFilter = "all" | "homework" | "writing";
type StatusFilter = "all" | "new" | "reviewed";

type FeedItem = {
  key: string;
  docId: string;
  collectionName: SubmissionCollection;
  source: "homework" | "writing";
  lessonId: string;
  title: string;
  meta: string;
  body: string;
  reviewed: boolean;
  sortMs: number;
};

function timestampToMs(value: unknown): number {
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
    return "Invalid Firebase API key (API_KEY_INVALID). Paste a new key into VITE_FIREBASE_API_KEY in .env.local and restart Vite.";
  }
  if (code === "auth/operation-not-allowed") {
    return "Google Sign-In is disabled. Enable it in Firebase Console → Authentication → Sign-in method.";
  }
  if (code === "auth/unauthorized-domain") {
    return `This domain is not authorized for Firebase Auth. Open Firebase Console → Authentication → Settings → Authorized domains and add your Vercel domain (e.g. your-project.vercel.app).`;
  }
  if (
    code === "auth/popup-closed-by-user" ||
    code === "auth/cancelled-popup-request"
  ) {
    return "Sign-in popup was closed. Try again.";
  }
  if (code === "auth/popup-blocked") {
    return "Sign-in popup was blocked. Allow popups and try again.";
  }
  if (
    haystack.includes("requested action is invalid") ||
    haystack.includes("auth/invalid-action") ||
    haystack.includes("unauthorized-continue-uri")
  ) {
    return "Google Sign-In rejected this origin. Add Pages domain + english-simple-trainer.firebaseapp.com/* to API key HTTP referrers.";
  }
  if (
    haystack.includes("referrer") ||
    haystack.includes("api_key_http_referrer_blocked")
  ) {
    return "API key HTTP referrer blocked. In Google Cloud Console → Credentials → your Browser key, add your Vercel domain (*.vercel.app/*) and firebaseapp.com/*.";
  }
  return `Sign-in failed (${code || "unknown"}). ${message ? message.slice(0, 120) : "Check browser console for details."}`;
}

export default function AdminSubmissions() {
  const [phase, setPhase] = useState<AuthPhase>("loading");
  const [user, setUser] = useState<User | null>(null);
  const [items, setItems] = useState<FeedItem[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");
  const [signInError, setSignInError] = useState("");
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [lessonFilter, setLessonFilter] = useState("all");
  const [reviewingId, setReviewingId] = useState<string | null>(null);
  const [actionError, setActionError] = useState("");

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
    setError("");
    setWarning("");
    setActionError("");

    const load = async () => {
      const feed: FeedItem[] = [];
      let homeworkOk = false;
      let writingOk = false;

      try {
        const hwSnap = await getDocs(query(collection(db, "homeworkAnswers")));
        homeworkOk = true;
        for (const docSnap of hwSnap.docs) {
          const d = docSnap.data();
          const sortMs = timestampToMs(d.createdAt);
          const when = formatMs(sortMs);
          const lessonId = String(d.lessonId ?? "");
          feed.push({
            key: `hw-${docSnap.id}`,
            docId: docSnap.id,
            collectionName: "homeworkAnswers",
            source: "homework",
            lessonId,
            title: `${d.studentName || "Unknown student"} — Lesson ${lessonId || "?"}`,
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
            reviewed: Boolean(d.reviewed),
            sortMs,
          });
        }
      } catch {
        setError(
          "Cannot read homeworkAnswers (403). Publish teacher read rules or sign in as teacher.",
        );
      }

      try {
        const writingSnap = await getDocs(
          query(collection(db, "writingSubmissions")),
        );
        writingOk = true;
        for (const docSnap of writingSnap.docs) {
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
          feed.push({
            key: `wr-${docSnap.id}`,
            docId: docSnap.id,
            collectionName: "writingSubmissions",
            source: "writing",
            lessonId: page,
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
            reviewed: Boolean(d.reviewed),
            sortMs,
          });
        }
      } catch {
        if (homeworkOk) {
          setWarning(
            "writingSubmissions denied (403). Add teacher read/list in Rules and Publish.",
          );
        } else {
          setError(
            "Firestore denied (403). Check teacher email and Rules for both collections.",
          );
        }
      }

      if (!homeworkOk && !writingOk) {
        setError(
          "Firestore denied (403). Sign in as teacher and publish Rules.",
        );
      }

      setItems(feed.sort((a, b) => b.sortMs - a.sortMs));
      setDataLoading(false);
    };

    void load();
  }, [phase]);

  const lessonOptions = useMemo(() => {
    const set = new Set<string>();
    for (const item of items) {
      if (item.lessonId) set.add(item.lessonId);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  }, [items]);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      if (sourceFilter !== "all" && item.source !== sourceFilter) return false;
      if (statusFilter === "new" && item.reviewed) return false;
      if (statusFilter === "reviewed" && !item.reviewed) return false;
      if (lessonFilter !== "all" && item.lessonId !== lessonFilter) return false;
      return true;
    });
  }, [items, sourceFilter, statusFilter, lessonFilter]);

  const handleSignIn = async () => {
    setSignInError("");
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      setSignInError(signInErrorMessage(err));
    }
  };

  const handleSignOut = () => void signOut(auth);

  const handleMarkReviewed = async (item: FeedItem) => {
    setActionError("");
    setReviewingId(item.key);
    try {
      await markSubmissionReviewed(item.collectionName, item.docId);
      setItems((prev) =>
        prev.map((row) =>
          row.key === item.key ? { ...row, reviewed: true } : row,
        ),
      );
    } catch (err) {
      console.error(err);
      setActionError(
        "Could not mark as reviewed (403?). Publish Rules that allow teacher update of reviewed/reviewedAt only.",
      );
    } finally {
      setReviewingId(null);
    }
  };

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

      {!dataLoading && (
        <section className="panel">
          <div className="admin-filters">
            <label className="admin-filter">
              <span>Source</span>
              <select
                value={sourceFilter}
                onChange={(e) =>
                  setSourceFilter(e.target.value as SourceFilter)
                }
              >
                <option value="all">All</option>
                <option value="homework">Homework</option>
                <option value="writing">Writing</option>
              </select>
            </label>
            <label className="admin-filter">
              <span>Status</span>
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as StatusFilter)
                }
              >
                <option value="all">All</option>
                <option value="new">New</option>
                <option value="reviewed">Reviewed</option>
              </select>
            </label>
            <label className="admin-filter">
              <span>Lesson / page</span>
              <select
                value={lessonFilter}
                onChange={(e) => setLessonFilter(e.target.value)}
              >
                <option value="all">All</option>
                {lessonOptions.map((id) => (
                  <option key={id} value={id}>
                    {id}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <p className="admin-empty" style={{ marginTop: "0.75rem" }}>
            Showing {filtered.length} of {items.length}
          </p>
        </section>
      )}

      {dataLoading && (
        <Loader variant="inline" label="Loading submissions…" />
      )}

      {error && (
        <section className="panel">
          <p className="homework-error">{error}</p>
        </section>
      )}

      {warning && (
        <section className="panel">
          <p className="homework-error" style={{ color: "var(--color-accent)" }}>
            {warning}
          </p>
        </section>
      )}

      {actionError && (
        <section className="panel">
          <p className="homework-error">{actionError}</p>
        </section>
      )}

      {!dataLoading && (
        <section className="homework-list">
          {filtered.length === 0 && !error ? (
            <article className="panel homework-card">
              <p className="admin-empty">No submissions match these filters.</p>
            </article>
          ) : (
            filtered.map((item) => (
              <article className="panel homework-card" key={item.key}>
                <div className="admin-card-top">
                  <p className="page-kicker" style={{ margin: 0 }}>
                    {item.source === "homework" ? "Homework" : "Writing"}
                  </p>
                  <span
                    className={`admin-badge ${item.reviewed ? "admin-badge--done" : "admin-badge--new"}`}
                  >
                    {item.reviewed ? "Reviewed" : "New"}
                  </span>
                </div>
                <h2>{item.title}</h2>
                <p className="lesson-topic">{item.meta}</p>
                <pre className="homework-pre">{item.body}</pre>
                <div className="admin-card-actions">
                  {!item.reviewed && (
                    <button
                      type="button"
                      className="action-btn primary"
                      disabled={reviewingId === item.key}
                      onClick={() => void handleMarkReviewed(item)}
                    >
                      {reviewingId === item.key
                        ? "Saving…"
                        : "Mark as reviewed"}
                    </button>
                  )}
                </div>
              </article>
            ))
          )}
        </section>
      )}
    </div>
  );
}
