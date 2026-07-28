import { Link } from "react-router-dom";
import "../styles/lesson22.css";

type EmptyLessonProps = {
  n: number;
  title: string;
  topic: string;
};

function EmptyLessonPage({ n, title, topic }: EmptyLessonProps) {
  return (
    <div className="lesson22-page">
      <section className="lesson22-hero panel">
        <div className="lesson22-hero-top">
          <div>
            <p className="page-kicker">Lesson {n}</p>
            <h1>{title}</h1>
            <p className="lesson22-topic-pill">{topic}</p>
            <p className="lesson22-subtitle">
              Урок поки порожній. Контент додамо пізніше.
            </p>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <Link className="lesson22-back-link" to={`/hw-${n}`}>
              Homework → Lesson {n}
            </Link>
            <Link className="lesson22-back-link" to="/lessons">
              ← Back to lessons
            </Link>
          </div>
        </div>
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Placeholder</p>
          <h2>Coming soon</h2>
          <p className="lesson22-section-desc">
            Тут зʼявляться вправи та матеріали Lesson {n}.
          </p>
        </div>
      </section>
    </div>
  );
}

export default function Lesson30() {
  return (
    <EmptyLessonPage
      n={30}
      title="Transport"
      topic="go by · take · drive · walk to"
    />
  );
}
