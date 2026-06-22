import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import "../styles/pages.css";

type HomeworkForm = {
  studentName: string;
  writing: string;
  testDone: boolean;
  quizDone: boolean;
};

const homeworkInfo: Record<string, { title: string; tasks: string[] }> = {
  "17": {
    title: "Present Simple + Speaking Video",
    tasks: [
      "Writing — 'My Daily Routine'",
      "Reading test on test-english.com",
      "Quiz in the app: complete Lesson17Quiz until Correct",
    ],
  },
  "16": {
    title: "Present Simple Practice",
    tasks: [
      "Write 5 do/does questions about your routine.",
      "Give short answers to each question.",
      "Make 3 questions about your family or friends.",
    ],
  },
  "15": {
    title: "Present Simple + Adverbs of frequency",
    tasks: [
      "Write 5 sentences about your routine using always / usually / often / sometimes / never.",
      "Record yourself answering 5 How often... questions.",
      "Make a mini routine about morning, work/school, evening, and bedtime.",
    ],
  },
};

export default function HomeworkLesson() {
  const { id } = useParams();
  const lessonId = id ?? "";
  const lesson = homeworkInfo[lessonId];

  const [studentName, setStudentName] = useState("");
  const [writing, setWriting] = useState("");
  const [testDone, setTestDone] = useState(false);
  const [quizDone, setQuizDone] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!studentName.trim()) {
      setError("Please enter the student name.");
      return;
    }

    try {
      setSaving(true);
      setSaved(false);
      setError("");

      const payload: HomeworkForm & {
        lessonId: string;
        createdAt: ReturnType<typeof serverTimestamp>;
      } = {
        studentName: studentName.trim(),
        writing: writing.trim(),
        testDone,
        quizDone,
        lessonId,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "homeworkAnswers"), payload);
      setSaved(true);

      setStudentName("");
      setWriting("");
      setTestDone(false);
      setQuizDone(false);
    } catch {
      setError("Failed to save homework. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (!lesson) {
    return (
      <div className="page-shell">
        <header className="page-hero panel">
          <h1>Homework not found</h1>
          <p className="page-subtitle">This homework page does not exist.</p>
        </header>

        <Link className="back-link" to="/homework">
          Back to homework
        </Link>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <header className="page-hero panel">
        <p className="page-kicker">Homework</p>
        <h1>Lesson {lessonId}</h1>
        <p className="page-subtitle">{lesson.title}</p>
      </header>

      <section className="panel homework-detail">
        <h2>Tasks</h2>

        <ol className="homework-steps">
          {lesson.tasks.map((task) => (
            <li key={task}>{task}</li>
          ))}
        </ol>

        <div className="homework-fields">
          <label className="homework-field">
            <span>Student name</span>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Enter your name"
            />
          </label>

          <label className="homework-field">
            <span>Writing answer</span>
            <textarea
              value={writing}
              onChange={(e) => setWriting(e.target.value)}
              placeholder="Write your homework here..."
              rows={10}
            />
          </label>

          <label className="homework-check">
            <input
              type="checkbox"
              checked={testDone}
              onChange={(e) => setTestDone(e.target.checked)}
            />
            <span>I completed the test on test-english.com.</span>
          </label>

          <label className="homework-check">
            <input
              type="checkbox"
              checked={quizDone}
              onChange={(e) => setQuizDone(e.target.checked)}
            />
            <span>I completed Lesson17Quiz until Correct.</span>
          </label>
        </div>

        {error && <p className="homework-error">{error}</p>}
        {saved && (
          <p className="homework-saved">Homework saved successfully.</p>
        )}

        <div className="homework-actions">
          <button
            className="action-btn primary"
            onClick={handleSave}
            type="button"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save homework"}
          </button>
        </div>
      </section>

      <div style={{ marginTop: "1.5rem" }}>
        <Link className="back-link" to="/homework">
          Back to homework
        </Link>
      </div>
    </div>
  );
}
