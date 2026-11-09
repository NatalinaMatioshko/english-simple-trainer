import { useState } from "react";
import { HomeworkSubmit } from "../components/HomeworkSubmit";
import { CheckBar } from "../components/lesson38/L38Ui";
import { drillSelClass } from "../components/lesson31/drillSelClass";
import { gapInputClass } from "../components/lesson31/gapInputClass";
import {
  edSoundGroups,
  hwEdSort,
  hwSchoolGaps,
  hwTrueFalsePrompts,
  wordMap3aWords,
} from "../content/lessons/lesson-55/activities";
import { verbPhraseCards } from "../content/lessons/lesson-55/vocabulary";
import { speakEnglish } from "../utils/speech";
import { matchesAnyAnswer } from "../utils/text";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
import "../styles/lesson26.css";

const edLabels: Record<string, string> = {
  t: "/t/",
  d: "/d/",
  id: "/ɪd/",
};

/** Homework for Lesson 55 — verb phrases · -ed · past sentences · childhood writing. */
export default function HW55() {
  const [flip, setFlip] = useState<number[]>([]);
  const toggleFlip = (idx: number) => {
    setFlip((prev) => {
      const open = prev.includes(idx);
      if (!open) speakEnglish(verbPhraseCards[idx].speak);
      return open ? prev.filter((i) => i !== idx) : [...prev, idx];
    });
  };

  const [mapAns, setMapAns] = useState<Record<string, string>>({});
  const [mapChecked, setMapChecked] = useState(false);
  const mapScore = wordMap3aWords.filter(
    (w) => (mapAns[w.word] ?? "") === w.answer,
  ).length;

  const [edAns, setEdAns] = useState<Record<string, string>>({});
  const [edChecked, setEdChecked] = useState(false);
  const edScore = hwEdSort.filter((w) => (edAns[w.word] ?? "") === w.answer).length;

  const [gapAns, setGapAns] = useState<Record<string, string>>({});
  const [gapChecked, setGapChecked] = useState(false);
  const gapScore = hwSchoolGaps.filter((g) =>
    matchesAnyAnswer(gapAns[g.id] ?? "", g.answers),
  ).length;

  const [writing, setWriting] = useState("");

  return (
    <div className="page">
      <div className="container">
        <p className="page-kicker">Homework · Lesson 55</p>
        <h1>When I was young</h1>
        <p className="lead">
          Verb phrases · звуки -ed · школа в минулому · чотири речення про дитинство ·
          коротка письмова розповідь.
        </p>

        <section id="hw55-cards" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">1 · Flashcards</p>
            <h2>Verb phrases</h2>
            <p className="lead">Спочатку скажи англійською, потім натисни, щоб перевірити.</p>
          </div>
          <div className="l22-vocab-grid" style={{ marginTop: "0.65rem" }}>
            {verbPhraseCards.map((card, idx) => {
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

        <section id="hw55-map" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">2 · Word map</p>
            <h2>Which verb? travel · watch · live · play · talk</h2>
          </div>
          <ul className="lesson26-gap-list">
            {wordMap3aWords.map((w) => (
              <li key={w.word}>
                <span>{w.word}</span>
                <select
                  value={mapAns[w.word] ?? ""}
                  onChange={(e) => {
                    setMapChecked(false);
                    setMapAns((prev) => ({ ...prev, [w.word]: e.target.value }));
                  }}
                  className={drillSelClass(
                    mapChecked,
                    mapAns[w.word] ?? "",
                    w.answer,
                  )}
                  aria-label={`Verb for ${w.word}`}
                >
                  <option value="">—</option>
                  <option value="travel">travel</option>
                  <option value="watch">watch</option>
                  <option value="live">live</option>
                  <option value="play">play</option>
                  <option value="talk">talk</option>
                </select>
              </li>
            ))}
          </ul>
          <CheckBar
            checked={mapChecked}
            score={mapScore}
            total={wordMap3aWords.length}
            onCheck={() => setMapChecked(true)}
            onReset={() => {
              setMapChecked(false);
              setMapAns({});
            }}
          />
        </section>

        <section id="hw55-ed" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">3 · -ed sounds</p>
            <h2>Sort the verbs</h2>
          </div>
          <ul className="lesson26-gap-list">
            {hwEdSort.map((w) => (
              <li key={w.word}>
                <span>{w.word}</span>
                <select
                  value={edAns[w.word] ?? ""}
                  onChange={(e) => {
                    setEdChecked(false);
                    setEdAns((prev) => ({ ...prev, [w.word]: e.target.value }));
                  }}
                  className={drillSelClass(edChecked, edAns[w.word] ?? "", w.answer)}
                >
                  <option value="">—</option>
                  {edSoundGroups.map((g) => (
                    <option key={g.id} value={g.id}>
                      {edLabels[g.id] ?? g.label}
                    </option>
                  ))}
                </select>
              </li>
            ))}
          </ul>
          <CheckBar
            checked={edChecked}
            score={edScore}
            total={hwEdSort.length}
            onCheck={() => setEdChecked(true)}
            onReset={() => {
              setEdChecked(false);
              setEdAns({});
            }}
          />
        </section>

        <section id="hw55-gaps" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">4 · Past Simple</p>
            <h2>Complete the sentences</h2>
          </div>
          <ul className="lesson26-gap-list">
            {hwSchoolGaps.map((g) => {
              const val = gapAns[g.id] ?? "";
              const ok = matchesAnyAnswer(val, g.answers);
              return (
                <li key={g.id}>
                  {g.before}{" "}
                  <input
                    type="text"
                    value={val}
                    onChange={(e) => {
                      setGapChecked(false);
                      setGapAns((prev) => ({ ...prev, [g.id]: e.target.value }));
                    }}
                    className={gapInputClass(gapChecked, val, ok)}
                    aria-label={`Gap ${g.id}`}
                  />{" "}
                  {g.after}
                </li>
              );
            })}
          </ul>
          <CheckBar
            checked={gapChecked}
            score={gapScore}
            total={hwSchoolGaps.length}
            onCheck={() => setGapChecked(true)}
            onReset={() => {
              setGapChecked(false);
              setGapAns({});
            }}
          />
        </section>

        <section id="hw55-write" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">5 · Writing</p>
            <h2>Childhood sentences + short talk</h2>
            <p className="lead">
              Напиши чотири речення з вправи 9a (два правдиві, два неправдиві) і коротку
              розповідь (5–7 речень) про те, яким ти був/була малим.
            </p>
          </div>
          <ul className="lesson25-note-list">
            {hwTrueFalsePrompts.map((p) => (
              <li key={p.id}>
                <strong>{p.hint}</strong> — e.g. {p.example}
              </li>
            ))}
          </ul>
          <textarea
            className="l25-writing-area"
            rows={12}
            value={writing}
            onChange={(e) => setWriting(e.target.value)}
            placeholder="Four true/false sentences + When I was young…"
          />
        </section>

        <HomeworkSubmit
          lessonId="55"
          writing={writing}
          quizDone={mapChecked && edChecked && gapChecked}
          quizScore={mapScore + edScore + gapScore}
        />
      </div>
    </div>
  );
}
