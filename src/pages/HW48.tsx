import { useState } from "react";
import { HomeworkSubmit } from "../components/HomeworkSubmit";
import { CheckBar } from "../components/lesson38/L38Ui";
import {
  doDoesDrill,
  youAskTeacher,
} from "../content/lessons/lesson-48/activities";
import { weekFlashcards } from "../content/lessons/lesson-48/vocabulary";
import { speakEnglish } from "../utils/speech";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
import "../styles/lesson26.css";

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

/** Homework for Lesson 48 — My week speaking project. */
export default function HW48() {
  const [flip, setFlip] = useState<number[]>([]);
  const toggleFlip = (idx: number) => {
    setFlip((prev) => {
      const open = prev.includes(idx);
      if (!open) speakEnglish(weekFlashcards[idx].speak);
      return open ? prev.filter((i) => i !== idx) : [...prev, idx];
    });
  };

  const [qAns, setQAns] = useState<Record<string, string>>({});
  const [qChecked, setQChecked] = useState(false);
  const qScore = doDoesDrill.filter((d) =>
    textOk(qAns[d.id] ?? "", [d.answer]),
  ).length;

  const [schedule, setSchedule] = useState("");
  const [writeWeek, setWriteWeek] = useState("");
  const [writeQs, setWriteQs] = useState("");

  return (
    <div className="page">
      <div className="container">
        <p className="page-kicker">Homework · Lesson 48</p>
        <h1>My week</h1>
        <p className="lead">
          Schedule · 8 sentences · voice 40–60s · 4 questions for your teacher.
        </p>

        <section id="hw48-cards" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">1 · Flashcards</p>
            <h2>Week chunks</h2>
          </div>
          <div className="l22-vocab-grid" style={{ marginTop: "0.65rem" }}>
            {weekFlashcards.map((card, idx) => {
              const isFlipped = flip.includes(idx);
              return (
                <button
                  key={card.back}
                  type="button"
                  className={`l22-vocab-card${isFlipped ? " l22-vocab-card--flipped" : ""}`}
                  onClick={() => toggleFlip(idx)}
                  aria-pressed={isFlipped}
                >
                  <div className="l22-vocab-inner">
                    <div className="l22-vocab-face l22-vocab-front">
                      <span className="l22-vocab-label">Українською</span>
                      <strong>{card.front}</strong>
                    </div>
                    <div className="l22-vocab-face l22-vocab-back">
                      <span className="l22-vocab-label">English</span>
                      <strong>{card.back}</strong>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section id="hw48-does" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">2 · Do / Does</p>
            <h2>Make the question</h2>
          </div>
          <ol className="l22-gap-list">
            {doDoesDrill.map((d) => {
              const val = qAns[d.id] ?? "";
              const ok = textOk(val, [d.answer]);
              return (
                <li key={d.id}>
                  <span>{d.cue} → </span>
                  <input
                    className={inputCls(qChecked, val, ok)}
                    style={{ width: "min(100%, 22rem)" }}
                    value={val}
                    list={`hw48-d-${d.id}`}
                    onChange={(e) => {
                      setQChecked(false);
                      setQAns((prev) => ({ ...prev, [d.id]: e.target.value }));
                    }}
                  />
                  <datalist id={`hw48-d-${d.id}`}>
                    {d.options.map((o) => (
                      <option key={o} value={o} />
                    ))}
                  </datalist>
                </li>
              );
            })}
          </ol>
          <CheckBar
            checked={qChecked}
            score={qScore}
            total={doDoesDrill.length}
            onCheck={() => setQChecked(true)}
            onReset={() => {
              setQAns({});
              setQChecked(false);
            }}
          />
        </section>

        <section id="hw48-schedule" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">3 · Schedule</p>
            <h2>Fill your weekly schedule</h2>
          </div>
          <label className="l26-block">
            <span className="l26-label">
              Day · work / day off · time · activity (keywords OK).
            </span>
            <textarea
              className="l26-textarea"
              rows={7}
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
              placeholder={`Monday — day off — relax\nTuesday — work — 10–… — barbershop\n…`}
            />
          </label>
        </section>

        <section id="hw48-write" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">4 · Write + voice</p>
            <h2>My week · 8 sentences</h2>
          </div>
          <label className="l26-block">
            <span className="l26-label">
              Write 8 sentences about your week. Use from…to…, at work / go to
              work, usually/often/never, at the weekend.
            </span>
            <textarea
              className="l26-textarea"
              rows={8}
              value={writeWeek}
              onChange={(e) => setWriteWeek(e.target.value)}
              placeholder="I work from Tuesday to Thursday. I work at a barbershop…"
            />
          </label>
          <label className="l26-block">
            <span className="l26-label">
              Write 4 questions about your teacher’s week. Ideas:{" "}
              {youAskTeacher.join(" · ")}
            </span>
            <textarea
              className="l26-textarea"
              rows={4}
              value={writeQs}
              onChange={(e) => setWriteQs(e.target.value)}
              placeholder="What days do you work?…"
            />
          </label>
          <p className="lead" style={{ marginTop: "0.75rem" }}>
            Record a voice message: “My week” — 40–60 seconds. Send to your
            teacher.
          </p>
        </section>

        <HomeworkSubmit
          lessonId="48"
          writing={[schedule, writeWeek, writeQs].filter(Boolean).join("\n\n")}
          quizDone={qChecked}
          quizScore={qScore}
          showListeningCheck={false}
          title="HW48 · My week"
        />
      </div>
    </div>
  );
}
