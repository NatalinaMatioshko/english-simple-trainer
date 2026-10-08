import { useState } from "react";
import { HomeworkSubmit } from "../components/HomeworkSubmit";
import { CheckBar } from "../components/lesson38/L38Ui";
import { drillSelClass } from "../components/lesson31/drillSelClass";
import {
  canGrammarGaps,
  IMG47,
  skillMatchPhrases,
  skillPhotoMatch,
} from "../content/lessons/lesson-47/activities";
import { skillFlashcards } from "../content/lessons/lesson-47/vocabulary";
import { speakEnglish } from "../utils/speech";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
import "../styles/lesson26.css";
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

/** Homework for Lesson 47 — Skills. */
export default function HW47() {
  const [uaFlip, setUaFlip] = useState<number[]>([]);
  const toggleUa = (idx: number) => {
    setUaFlip((prev) => {
      const open = prev.includes(idx);
      if (!open) speakEnglish(skillFlashcards[idx].speak);
      return open ? prev.filter((i) => i !== idx) : [...prev, idx];
    });
  };

  const [matchAns, setMatchAns] = useState(() =>
    Array(skillPhotoMatch.length).fill(""),
  );
  const [matchChecked, setMatchChecked] = useState(false);
  const matchScore = skillPhotoMatch.filter(
    (p, i) => matchAns[i] === p.answer,
  ).length;

  const [gapAns, setGapAns] = useState<Record<string, string>>({});
  const [gapChecked, setGapChecked] = useState(false);
  const gapScore = canGrammarGaps.filter((g) =>
    textOk(gapAns[g.id] ?? "", g.answers),
  ).length;

  const [writeCan, setWriteCan] = useState("");
  const [writeCant, setWriteCant] = useState("");

  return (
    <div className="page">
      <div className="container">
        <p className="page-kicker">Homework · Lesson 47</p>
        <h1>Skills</h1>
        <p className="lead">
          Skill phrases · can / can’t · write about what you can do.
        </p>

        <section id="hw47-cards" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">1 · Flashcards</p>
            <h2>Skills</h2>
            <p className="lesson22-section-desc">
              Tap a card to flip UA → EN.
            </p>
          </div>
          <div className="l22-vocab-grid" style={{ marginTop: "0.65rem" }}>
            {skillFlashcards.map((card, idx) => {
              const isFlipped = uaFlip.includes(idx);
              return (
                <button
                  key={card.back}
                  type="button"
                  className={`l22-vocab-card${isFlipped ? " l22-vocab-card--flipped" : ""}`}
                  onClick={() => toggleUa(idx)}
                  aria-pressed={isFlipped}
                  aria-label={`${card.front} · ${card.back}`}
                >
                  <div className="l22-vocab-inner">
                    <div className="l22-vocab-face l22-vocab-front">
                      <span className="l22-vocab-label">Українською</span>
                      <strong>{card.front}</strong>
                      <span className="l22-vocab-hint">tap → English</span>
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

        <section id="hw47-match" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">2 · Match</p>
            <h2>Photos A–L</h2>
            <p className="lesson22-section-desc">
              Choose the skill for each picture.
            </p>
          </div>
          <div className="l42-pic-grid l42-travel-pic-grid">
            {skillPhotoMatch.map((pic, i) => {
              const value = matchAns[i] ?? "";
              const ok = value === pic.answer;
              return (
                <figure key={pic.id} className="l42-pic-card">
                  <img src={IMG47(pic.file)} alt={pic.alt} loading="lazy" />
                  <figcaption>
                    <strong>{pic.id}</strong>
                    <select
                      value={value}
                      onChange={(e) => {
                        setMatchChecked(false);
                        const next = [...matchAns];
                        next[i] = e.target.value;
                        setMatchAns(next);
                      }}
                      className={drillSelClass(
                        matchChecked,
                        value,
                        pic.answer,
                      )}
                      aria-label={`Photo ${pic.id}`}
                    >
                      <option value="">—</option>
                      {skillMatchPhrases.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.value}. {o.label}
                        </option>
                      ))}
                    </select>
                    {matchChecked ? (
                      <span className={ok ? "ok" : "err"}>
                        {ok
                          ? "✓"
                          : `→ ${skillMatchPhrases.find((p) => p.value === pic.answer)?.label ?? pic.answer}`}
                      </span>
                    ) : null}
                  </figcaption>
                </figure>
              );
            })}
          </div>
          <CheckBar
            checked={matchChecked}
            score={matchScore}
            total={skillPhotoMatch.length}
            onCheck={() => setMatchChecked(true)}
            onReset={() => {
              setMatchAns(Array(skillPhotoMatch.length).fill(""));
              setMatchChecked(false);
            }}
          />
        </section>

        <section id="hw47-gaps" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">3 · Grammar</p>
            <h2>can / can’t · base verb</h2>
          </div>
          <ol className="l22-gap-list">
            {canGrammarGaps.map((g) => {
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
                      setGapAns((prev) => ({
                        ...prev,
                        [g.id]: e.target.value,
                      }));
                    }}
                    aria-label={`Gap ${g.id}`}
                    list={`opts-${g.id}`}
                  />{" "}
                  {g.after}
                  <datalist id={`opts-${g.id}`}>
                    {g.options.map((o) => (
                      <option key={o} value={o} />
                    ))}
                  </datalist>
                </li>
              );
            })}
          </ol>
          <CheckBar
            checked={gapChecked}
            score={gapScore}
            total={canGrammarGaps.length}
            onCheck={() => setGapChecked(true)}
            onReset={() => {
              setGapAns({});
              setGapChecked(false);
            }}
          />
        </section>

        <section id="hw47-write" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">4 · Write</p>
            <h2>What can you do?</h2>
          </div>
          <label className="l26-block">
            <span className="l26-label">
              Write 4–5 sentences about things you can do.
            </span>
            <textarea
              className="l26-textarea"
              rows={5}
              value={writeCan}
              onChange={(e) => setWriteCan(e.target.value)}
              placeholder="I can swim. I can cook fish…"
            />
          </label>
          <label className="l26-block">
            <span className="l26-label">
              Write 3 sentences about things you can’t do. Then write 3 Can
              you…? questions for a friend.
            </span>
            <textarea
              className="l26-textarea"
              rows={5}
              value={writeCant}
              onChange={(e) => setWriteCant(e.target.value)}
              placeholder="I can’t fly a plane. Can you drive?"
            />
          </label>
        </section>

        <HomeworkSubmit
          lessonId="47"
          writing={[writeCan, writeCant].filter(Boolean).join("\n\n")}
          quizDone={matchChecked && gapChecked}
          quizScore={matchScore + gapScore}
          showListeningCheck={false}
          title="HW47 · Skills"
        />
      </div>
    </div>
  );
}
