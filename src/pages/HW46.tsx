import { useState } from "react";
import { Link } from "react-router-dom";
import { HomeworkSubmit } from "../components/HomeworkSubmit";
import { CheckBar } from "../components/lesson38/L38Ui";
import { drillSelClass } from "../components/lesson31/drillSelClass";
import {
  albertBellaJobs,
  choreMatchPhrases,
  chorePhotoMatch,
  collocationGaps,
  doesGrammarGaps,
  IMG46,
  listenQuestionGaps,
} from "../content/lessons/lesson-46/activities";
import { choreFlashcards } from "../content/lessons/lesson-46/vocabulary";
import { speakEnglish } from "../utils/speech";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
import "../styles/lesson26.css";
import "../styles/lesson31.css";
import "../styles/lesson42.css";

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

/** Homework for Lesson 46 — Jobs around the house. */
export default function HW46() {
  const [flip, setFlip] = useState<number[]>([]);
  const toggleFlip = (idx: number) => {
    setFlip((prev) => {
      const open = prev.includes(idx);
      if (!open) speakEnglish(choreFlashcards[idx].speak);
      return open ? prev.filter((i) => i !== idx) : [...prev, idx];
    });
  };

  const [matchAns, setMatchAns] = useState(() =>
    Array(chorePhotoMatch.length).fill(""),
  );
  const [matchChecked, setMatchChecked] = useState(false);
  const matchScore = chorePhotoMatch.filter(
    (p, i) => matchAns[i] === p.answer,
  ).length;

  const [colAns, setColAns] = useState<Record<string, string>>({});
  const [colChecked, setColChecked] = useState(false);
  const colScore = collocationGaps.filter((g) =>
    textOk(colAns[g.id] ?? "", g.answers),
  ).length;

  const [whoAns, setWhoAns] = useState(() =>
    Array(albertBellaJobs.length).fill(""),
  );
  const [whoChecked, setWhoChecked] = useState(false);
  const whoScore = albertBellaJobs.filter(
    (item, i) => whoAns[i] === item.correctAnswer,
  ).length;

  const [gapAns, setGapAns] = useState<Record<string, string>>({});
  const [gapChecked, setGapChecked] = useState(false);
  const gapItems = [...listenQuestionGaps, ...doesGrammarGaps.slice(0, 4)];
  const gapScore = gapItems.filter((g) =>
    textOk(gapAns[g.id] ?? "", g.answers),
  ).length;

  const [writeJobs, setWriteJobs] = useState("");
  const [writeQs, setWriteQs] = useState("");

  return (
    <div className="page">
      <div className="container">
        <p className="page-kicker">Homework · Lesson 46</p>
        <h1>Jobs around the house</h1>
        <p className="lead">
          Housework phrases · Does he/she…? · write about home jobs.
        </p>
        <p className="l22-nav">
          <Link to="/lessons/46">← Lesson 46</Link>
          <Link to="/homework">All homework →</Link>
        </p>

        <section className="panel" id="hw46-cards">
          <h2>1 · Housework phrases</h2>
          <p className="muted">Tap: Ukrainian → English.</p>
          <div className="l22-vocab-grid">
            {choreFlashcards.map((card, idx) => {
              const open = flip.includes(idx);
              return (
                <button
                  key={card.back}
                  type="button"
                  className={`l22-vocab-card${open ? " is-flipped" : ""}`}
                  onClick={() => toggleFlip(idx)}
                  aria-pressed={open}
                >
                  <span className="l22-vocab-front">{card.front}</span>
                  <span className="l22-vocab-back">{card.back}</span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="panel" id="hw46-match">
          <h2>2 · Match pictures A–H</h2>
          <p className="muted">Choose the phrase for each picture.</p>
          <div className="l42-match-grid">
            {chorePhotoMatch.map((pic, i) => (
              <div key={pic.id} className="l42-match-card">
                <img src={IMG46(pic.file)} alt={pic.alt} />
                <label className="l26-block">
                  <span className="l26-label">Picture {pic.id}</span>
                  <select
                    className={drillSelClass(
                      matchChecked,
                      matchAns[i],
                      pic.answer,
                    )}
                    value={matchAns[i]}
                    onChange={(e) => {
                      setMatchChecked(false);
                      const next = [...matchAns];
                      next[i] = e.target.value;
                      setMatchAns(next);
                    }}
                    aria-label={`Phrase for picture ${pic.id}`}
                  >
                    <option value="">—</option>
                    {choreMatchPhrases.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.value}. {opt.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            ))}
          </div>
          <CheckBar
            checked={matchChecked}
            score={matchScore}
            total={chorePhotoMatch.length}
            onCheck={() => setMatchChecked(true)}
            onReset={() => {
              setMatchAns(Array(chorePhotoMatch.length).fill(""));
              setMatchChecked(false);
            }}
          />
        </section>

        <section className="panel" id="hw46-col">
          <h2>3 · Complete the phrases</h2>
          <ol className="l22-gap-list">
            {collocationGaps.map((g) => {
              const val = colAns[g.id] ?? "";
              const ok = textOk(val, g.answers);
              return (
                <li key={g.id}>
                  <input
                    className={inputCls(colChecked, val, ok)}
                    value={val}
                    onChange={(e) => {
                      setColChecked(false);
                      setColAns((prev) => ({ ...prev, [g.id]: e.target.value }));
                    }}
                    aria-label={`Verb for ${g.after}`}
                  />{" "}
                  {g.after}
                </li>
              );
            })}
          </ol>
          <CheckBar
            checked={colChecked}
            score={colScore}
            total={collocationGaps.length}
            onCheck={() => setColChecked(true)}
            onReset={() => {
              setColAns({});
              setColChecked(false);
            }}
          />
        </section>

        <section className="panel" id="hw46-who">
          <h2>4 · Albert or Bella?</h2>
          <p className="muted">Who does each job? (from Lesson 46 listening)</p>
          <div className="lw-drill-list">
            {albertBellaJobs.map((item, i) => (
              <div key={item.id} className="lw-drill-row">
                <strong className="lw-drill-prompt">
                  {i + 1}. {item.prompt}
                </strong>
                <select
                  className={drillSelClass(
                    whoChecked,
                    whoAns[i],
                    item.correctAnswer,
                  )}
                  value={whoAns[i]}
                  onChange={(e) => {
                    setWhoChecked(false);
                    const next = [...whoAns];
                    next[i] = e.target.value;
                    setWhoAns(next);
                  }}
                  aria-label={item.prompt}
                >
                  <option value="">—</option>
                  {item.options.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          <CheckBar
            checked={whoChecked}
            score={whoScore}
            total={albertBellaJobs.length}
            onCheck={() => setWhoChecked(true)}
            onReset={() => {
              setWhoAns(Array(albertBellaJobs.length).fill(""));
              setWhoChecked(false);
            }}
          />
        </section>

        <section className="panel" id="hw46-gaps">
          <h2>5 · Do / does / doesn’t</h2>
          <ol className="l22-gap-list">
            {gapItems.map((g) => {
              const val = gapAns[g.id] ?? "";
              const ok = textOk(val, g.answers);
              return (
                <li key={g.id}>
                  {g.before ? <span>{g.before} </span> : null}
                  <input
                    className={inputCls(gapChecked, val, ok)}
                    value={val}
                    onChange={(e) => {
                      setGapChecked(false);
                      setGapAns((prev) => ({ ...prev, [g.id]: e.target.value }));
                    }}
                    aria-label={`Gap ${g.id}`}
                  />{" "}
                  {g.after}
                </li>
              );
            })}
          </ol>
          <CheckBar
            checked={gapChecked}
            score={gapScore}
            total={gapItems.length}
            onCheck={() => setGapChecked(true)}
            onReset={() => {
              setGapAns({});
              setGapChecked(false);
            }}
          />
        </section>

        <section className="panel" id="hw46-write">
          <h2>6 · Write</h2>
          <label className="l26-block">
            <span className="l26-label">
              Write 4–6 sentences about jobs around the house in your family
              (he/she + -s).
            </span>
            <textarea
              className="l26-textarea"
              rows={5}
              value={writeJobs}
              onChange={(e) => setWriteJobs(e.target.value)}
              placeholder="My mum cooks dinner. My dad walks the dog…"
            />
          </label>
          <label className="l26-block">
            <span className="l26-label">
              Write 3 questions with Does…? about a friend.
            </span>
            <textarea
              className="l26-textarea"
              rows={4}
              value={writeQs}
              onChange={(e) => setWriteQs(e.target.value)}
              placeholder="Does she clean the bathroom? Does he cook dinner?"
            />
          </label>
        </section>

        <HomeworkSubmit
          lessonId="46"
          writing={[writeJobs, writeQs].filter(Boolean).join("\n\n")}
          quizDone={matchChecked && colChecked && whoChecked && gapChecked}
          quizScore={matchScore + colScore + whoScore + gapScore}
          showListeningCheck={false}
          title="HW46 · Jobs around the house"
        />
      </div>
    </div>
  );
}
