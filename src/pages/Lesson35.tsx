import { Link } from "react-router-dom";
import LessonNumberKicker from "../components/LessonNumberKicker";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
import "../styles/lesson31.css";

const PROMOVA_URL =
  "https://promova.com/uk/my-plan/appBJb23Byfy5g6CE/20070?unit=appBJb23Byfy5g6CE9";

export default function Lesson35() {
  return (
    <div className="lesson22-page">
      <section className="lesson22-hero panel">
        <div className="lesson22-hero-top">
          <div>
            <LessonNumberKicker number={35} />
            <h1>Family photos</h1>
            <p className="lesson22-topic-pill">
              family · possessive &apos;s · Whose…?
            </p>
            <p className="lesson22-subtitle">
              Unit 4A. Talk about family with <strong>possessive &apos;s</strong>{" "}
              and <strong>Whose…?</strong>
            </p>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <Link className="lesson22-back-link" to="/lessons">
              ← Back to lessons
            </Link>
            <Link
              className="lesson22-back-link lesson22-back-link--ghost"
              to="/lesson-34"
            >
              ← Lesson 34
            </Link>
            <Link
              className="lesson22-back-link lesson22-back-link--ghost"
              to="/vocab"
            >
              Vocab →
            </Link>
          </div>
        </div>
        <div className="lesson22-hero-chips">
          <span>my sister&apos;s phone</span>
          <span>Whose is it?</span>
          <span>Promova practice</span>
        </div>
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-flow">
          <a href="#l35-promova">Promova</a>
          <a href="#l35-exit">Exit</a>
        </div>
      </section>

      <section id="l35-promova" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">1 · Practice</p>
          <h2>Promova · unit practice</h2>
          <p className="lesson22-section-desc">
            Відкрий урок у Promova і виконай вправи. Потім повернись сюди й
            розкажи викладачу, що було складно.
          </p>
        </div>
        <a
          className="l22-external-link"
          href={PROMOVA_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Відкрити урок у Promova →
        </a>
      </section>

      <section id="l35-exit" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Exit check</p>
          <h2>Can you…?</h2>
        </div>
        <ul className="l22-goals-list">
          <li>Name 6 family words.</li>
          <li>Use possessive &apos;s in 3 sentences.</li>
          <li>Ask and answer a Whose…? question.</li>
        </ul>
        <div className="l25-cr-actions" style={{ marginTop: "1rem" }}>
          <Link className="l22-check-btn" to="/vocab">
            Vocab
          </Link>
          <Link className="l25-cr-mini-btn" to="/trainer">
            Trainer
          </Link>
          <Link className="l25-cr-mini-btn" to="/lesson-34">
            ← Lesson 34
          </Link>
          <Link className="l25-cr-mini-btn" to="/lessons">
            All lessons →
          </Link>
        </div>
      </section>
    </div>
  );
}
