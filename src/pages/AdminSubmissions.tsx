import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import "../styles/pages.css";

type Submission = {
  id: string;
  studentName?: string;
  lessonId?: string;
  writing?: string;
  testDone?: boolean;
  quizDone?: boolean;
  createdAt?: {
    seconds?: number;
  };
};

export default function AdminSubmissions() {
  const [items, setItems] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadSubmissions = async () => {
      try {
        const q = query(
          collection(db, "homeworkAnswers"),
          orderBy("createdAt", "desc"),
        );

        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Submission, "id">),
        }));

        setItems(data);
      } catch {
        setError("Failed to load submissions.");
      } finally {
        setLoading(false);
      }
    };

    loadSubmissions();
  }, []);

  return (
    <div className="page-shell">
      <header className="page-hero panel">
        <p className="page-kicker">Admin</p>
        <h1>Submissions</h1>
        <p className="page-subtitle">All saved homework answers.</p>
      </header>

      {loading && (
        <section className="panel">
          <p>Loading submissions...</p>
        </section>
      )}

      {error && (
        <section className="panel">
          <p className="homework-error">{error}</p>
        </section>
      )}

      {!loading && !error && (
        <section className="homework-list">
          {items.length === 0 ? (
            <article className="panel homework-card">
              <p>No submissions yet.</p>
            </article>
          ) : (
            items.map((item) => (
              <article className="panel homework-card" key={item.id}>
                <h2>
                  {item.studentName || "Unknown student"} — Lesson{" "}
                  {item.lessonId || "?"}
                </h2>

                <p className="lesson-topic">
                  Test: {item.testDone ? "Done" : "Not done"} | Quiz:{" "}
                  {item.quizDone ? "Done" : "Not done"}
                </p>

                <pre className="homework-pre">
                  {item.writing?.trim() || "No writing answer."}
                </pre>
              </article>
            ))
          )}
        </section>
      )}
    </div>
  );
}
