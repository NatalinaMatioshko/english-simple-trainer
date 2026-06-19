import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/pages.css";

type HomeworkData = {
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

const defaultHomework: HomeworkData = {
  writing: "",
  testDone: false,
  quizDone: false,
};

const getStorageKey = (id: string) => `homework-${id}`;

const readHomework = (id: string): HomeworkData => {
  const raw = localStorage.getItem(getStorageKey(id));
  if (!raw) return defaultHomework;

  try {
    return JSON.parse(raw) as HomeworkData;
  } catch {
    return defaultHomework;
  }
};

export default function HomeworkLesson() {
  const { id } = useParams();
  const lessonId = id ?? "";
  const lesson = homeworkInfo[lessonId];
  const storageKey = useMemo(() => getStorageKey(lessonId), [lessonId]);

  const initialData = readHomework(lessonId);

  const [writing, setWriting] = useState(() => initialData.writing);
  const [testDone, setTestDone] = useState(() => initialData.testDone);
  const [quizDone, setQuizDone] = useState(() => initialData.quizDone);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    const data: HomeworkData = {
      writing,
      testDone,
      quizDone,
    };

    localStorage.setItem(storageKey, JSON.stringify(data));
    setSaved(true);
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

        {lessonId === "17" && (
          <div className="homework-fields">
            <label className="homework-field">
              <span>Writing — My Daily Routine</span>
              <textarea
                value={writing}
                onChange={(e) => setWriting(e.target.value)}
                placeholder="Write 7–10 sentences about your daily routine..."
                rows={10}
              />
            </label>

            <label className="homework-check">
              <input
                type="checkbox"
                checked={testDone}
                onChange={(e) => setTestDone(e.target.checked)}
              />
              <span>
                I completed the test on test-english.com and sent a screenshot.
              </span>
            </label>

            <label className="homework-check">
              <input
                type="checkbox"
                checked={quizDone}
                onChange={(e) => setQuizDone(e.target.checked)}
              />
              <span>
                I completed all 8 questions in Lesson17Quiz until Correct.
              </span>
            </label>
          </div>
        )}

        {lessonId !== "17" && (
          <div className="homework-note">
            <p>This page is ready for lesson-specific tasks.</p>
          </div>
        )}

        <div className="homework-actions">
          <button
            className="action-btn primary"
            onClick={handleSave}
            type="button"
          >
            Save homework
          </button>

          {saved && <span className="homework-saved">Saved</span>}
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
