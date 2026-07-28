import { Link } from "react-router-dom";
import "../styles/lesson22.css";

type EmptyHwProps = {
  n: number;
  title: string;
};

function EmptyHwPage({ n, title }: EmptyHwProps) {
  return (
    <div className="lesson22-page">
      <section className="lesson22-hero panel">
        <div className="lesson22-hero-top">
          <div>
            <p className="page-kicker">Homework · Lesson {n}</p>
            <h1>{title}</h1>
            <p className="lesson22-subtitle">Content coming soon.</p>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <Link className="lesson22-back-link" to={`/lesson-${n}`}>
              ← Lesson {n}
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
          <h2>Empty for now</h2>
          <p className="lesson22-section-desc">
            Домашка до Lesson {n} ще порожня. Завдання додамо пізніше.
          </p>
        </div>
      </section>
    </div>
  );
}

export default function HW30() {
  return <EmptyHwPage n={30} title="Transport" />;
}
