import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { HomeworkSubmit } from "../components/HomeworkSubmit";
import { hw37Links, hw37Translate } from "../data/hw37";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
import "../styles/lesson26.css";
import "../styles/lesson35.css";

function normText(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/[\u2018\u2019\u02bc']/g, "'")
    .replace(/\s+/g, " ")
    .replace(/[.!?]+$/, "");
}

function textOk(value: string, answers: readonly string[]): boolean {
  const v = normText(value);
  return v !== "" && answers.some((a) => normText(a) === v);
}

function inputCls(checked: boolean, value: string, ok: boolean): string {
  if (!checked) return "l22-gap-input";
  if (ok) return "l22-gap-input is-ok";
  if (value.trim()) return "l22-gap-input is-err";
  return "l22-gap-input";
}

export default function HW37() {
  const [translateAns, setTranslateAns] = useState(() =>
    Array(hw37Translate.length).fill(""),
  );
  const [translateChecked, setTranslateChecked] = useState(false);
  const [linksNote, setLinksNote] = useState("");
  const [draft, setDraft] = useState("");

  const translateScore = hw37Translate.filter((item, i) =>
    textOk(translateAns[i] ?? "", item.answers),
  ).length;
  const translateFilled = translateAns.filter((a) => a.trim().length > 0)
    .length;
  const linksDone = linksNote.trim().length > 0;

  const checks = useMemo(
    () => ({
      translate: translateChecked && translateFilled === hw37Translate.length,
      links: linksDone,
    }),
    [translateChecked, translateFilled, linksDone],
  );

  const allDone = Object.values(checks).every(Boolean);

  return (
    <div className="lesson22-page">
      <section className="lesson22-hero panel">
        <div className="lesson22-hero-top">
          <div>
            <p className="page-kicker">Homework · Lesson 37</p>
            <h1>Translate &amp; practice</h1>
            <p className="lesson22-subtitle">
              Спочатку переклади фрази англійською (Present Simple, Present
              Continuous і прикметники). Потім зроби вправи на Test-English.
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
          <span>every day vs now</span>
          <span>happy / funny / kind</span>
          <span>barber / barbershop</span>
          <span>questions</span>
          <span>Test-English</span>
        </div>
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-flow">
          <a href="#hw37-translate">1 Translate</a>
          <a href="#hw37-links">2 Test-English</a>
          <a href="#hw37-submit">Submit</a>
        </div>
      </section>

      <section id="hw37-translate" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">1 · Translate</p>
          <h2>UA → EN</h2>
          <p className="lesson22-section-desc">
            Напиши англійською. У перемішку:{" "}
            <em>every day / usually</em> (Present Simple),{" "}
            <em>now</em> (Present Continuous), позитивні прикметники (
            <em>happy, funny, kind, friendly…</em>), питання і фрази про
            барбера / барбершоп.
          </p>
        </div>
        <div className="l26-drill-list">
          {hw37Translate.map((item, i) => {
            const val = translateAns[i] ?? "";
            const ok = translateChecked && textOk(val, item.answers);
            return (
              <div key={item.id} className="hw35-fix-row">
                <p className="hw35-fix-wrong">
                  <strong>{i + 1}.</strong> {item.ua}
                </p>
                <input
                  type="text"
                  value={val}
                  onChange={(e) => {
                    setTranslateChecked(false);
                    const next = [...translateAns];
                    next[i] = e.target.value;
                    setTranslateAns(next);
                  }}
                  className={inputCls(translateChecked, val, ok)}
                  placeholder="English…"
                  aria-label={`Translate ${i + 1}`}
                />
                {translateChecked && !ok && (
                  <span className="hw35-tip">{item.answers[0]}</span>
                )}
              </div>
            );
          })}
        </div>
        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setTranslateChecked(true)}
          >
            Check
          </button>
          {translateChecked && (
            <span className="l22-score">
              {translateScore} / {hw37Translate.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setTranslateAns(hw37Translate.map((t) => t.answers[0]));
              setTranslateChecked(true);
            }}
          >
            Show answers
          </button>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setTranslateAns(Array(hw37Translate.length).fill(""));
              setTranslateChecked(false);
            }}
          >
            Reset
          </button>
        </div>
      </section>

      <section id="hw37-links" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">2 · Practice</p>
          <h2>Test-English</h2>
          <p className="lesson22-section-desc">
            Відкрий кожне посилання, зроби vocabulary / grammar exercises.
            Потім коротко напиши, що зробив (дні / прикметники / this-that /
            continuous / simple vs continuous).
          </p>
        </div>
        <div className="l26-hw-links">
          {hw37Links.map((item) => (
            <article key={item.id} className="l26-hw-link-card">
              <h3>{item.title}</h3>
              <a
                className="l22-external-link"
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.label}
              </a>
            </article>
          ))}
        </div>
        <label
          className="lesson22-section-desc"
          htmlFor="hw37-links-note"
          style={{ display: "block", marginTop: "1rem" }}
        >
          After the exercises, write a few sentences:
        </label>
        <textarea
          id="hw37-links-note"
          className="hw27-textarea"
          rows={5}
          value={linksNote}
          onChange={(e) => setLinksNote(e.target.value)}
          placeholder={
            "Today is Monday. It's September. It's autumn.\n" +
            "This is a big room. The chair is new.\n" +
            "I'm sitting. I usually drink coffee in the morning. Right now I'm talking."
          }
          style={{ marginTop: "0.5rem", width: "100%" }}
        />
      </section>

      <section id="hw37-submit" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Submit</p>
          <h2>Send your homework</h2>
          <p className="lesson22-section-desc">
            Перевір переклад, зроби Test-English і надішли вчителю.
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
            "— Translate —",
            ...hw37Translate.map(
              (item, i) =>
                `${i + 1}. ${item.ua} → ${translateAns[i].trim() || "—"}`,
            ),
            "— Test-English —",
            linksNote.trim() || "(not finished)",
          ].join("\n")}
          quizDone={allDone}
          quizScore={allDone ? translateScore : undefined}
          showListeningCheck={false}
          description="Після вправ натисни «Надіслати». Додай ім'я."
        />
      </section>
    </div>
  );
}
