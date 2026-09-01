import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { HomeworkSubmit } from "../components/HomeworkSubmit";
import { hw37Links } from "../data/hw37";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
import "../styles/lesson26.css";

export default function HW37() {
  const [notes, setNotes] = useState(() =>
    Array(hw37Links.length).fill(""),
  );
  const [draft, setDraft] = useState("");

  const written = notes.filter((n) => n.trim().length > 0).length;
  const allWritten = written === hw37Links.length;

  const checks = useMemo(
    () => ({ speaking: allWritten }),
    [allWritten],
  );

  return (
    <div className="lesson22-page">
      <section className="lesson22-hero panel">
        <div className="lesson22-hero-top">
          <div>
            <p className="page-kicker">Homework · Lesson 37</p>
            <h1>Test-English practice</h1>
            <p className="lesson22-subtitle">
              П&apos;ять сторінок Test-English: days, adjectives, this/that,
              Present continuous і simple vs continuous. Після кожної напиши
              короткі речення.
            </p>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <Link className="lesson22-back-link" to="/lesson-37">
              ← Lesson 37
            </Link>
            <Link className="lesson22-back-link" to="/lessons">
              ← Back to lessons
            </Link>
          </div>
        </div>
        <div className="lesson22-hero-chips">
          <span>Monday / January</span>
          <span>a big house</span>
          <span>this / that</span>
          <span>I&apos;m sitting</span>
          <span>usually vs now</span>
        </div>
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-flow">
          {hw37Links.map((item, i) => (
            <a key={item.id} href={`#hw37-${item.id}`}>
              {i + 1} {item.title.split(" ")[0]}
            </a>
          ))}
          <a href="#hw37-submit">Submit</a>
        </div>
      </section>

      {hw37Links.map((item, i) => (
        <section
          key={item.id}
          id={`hw37-${item.id}`}
          className="lesson22-block panel"
        >
          <div className="lesson22-section-head">
            <p className="page-kicker">{item.kicker}</p>
            <h2>{item.title}</h2>
            <p className="lesson22-section-desc">{item.desc}</p>
          </div>
          <article className="l26-hw-link-card">
            <a
              className="l22-external-link"
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.label}
            </a>
          </article>
          <label className="lesson22-section-desc" htmlFor={`hw37-note-${item.id}`}>
            Write your sentences:
          </label>
          <textarea
            id={`hw37-note-${item.id}`}
            className="hw27-textarea"
            rows={3}
            value={notes[i]}
            onChange={(e) => {
              const next = [...notes];
              next[i] = e.target.value;
              setNotes(next);
            }}
            placeholder={item.prompt}
            style={{ marginTop: "0.5rem", width: "100%" }}
          />
        </section>
      ))}

      <section id="hw37-submit" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Submit</p>
          <h2>Send your homework</h2>
          <p className="lesson22-section-desc">
            Зроби вправи на Test-English, напиши речення і надішли вчителю.
          </p>
        </div>
        <label className="lesson22-section-desc" htmlFor="hw37-writing">
          Notes (optional):
        </label>
        <textarea
          id="hw37-writing"
          className="hw27-textarea"
          rows={4}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Що було складно?"
        />
        <HomeworkSubmit
          lessonId="37"
          writing={[
            draft.trim() || "(no extra notes)",
            ...hw37Links.map(
              (item, i) =>
                `${item.title}: ${notes[i].trim() || "not finished"}`,
            ),
          ].join("\n")}
          quizDone={checks.speaking}
          quizScore={checks.speaking ? written : undefined}
          showListeningCheck={false}
          description="Після вправ натисни «Надіслати». Додай ім'я."
        />
      </section>
    </div>
  );
}
