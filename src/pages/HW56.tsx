import { useState } from "react";
import { HomeworkSubmit } from "../components/HomeworkSubmit";
import { CheckBar } from "../components/lesson38/L38Ui";
import { drillSelClass } from "../components/lesson31/drillSelClass";
import { gapInputClass } from "../components/lesson31/gapInputClass";
import { hwCarlaChoices, hwPastType, hwSentenceGaps, storyPhotos } from "../content/lessons/lesson-56/activities";
import { irregularVerbCards } from "../content/lessons/lesson-56/vocabulary";
import { speakEnglish } from "../utils/speech";
import { matchesAnyAnswer } from "../utils/text";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
import "../styles/lesson26.css";

/** Homework for Lesson 56 — irregular verbs · past sentences · Carla · a bad day. */
export default function HW56() {
  const [picFlip, setPicFlip] = useState<number[]>([]);
  const togglePic = (idx: number) => {
    setPicFlip((prev) => {
      const open = prev.includes(idx);
      if (!open) speakEnglish(storyPhotos[idx].sentence);
      return open ? prev.filter((i) => i !== idx) : [...prev, idx];
    });
  };

  const [flip, setFlip] = useState<number[]>([]);
  const toggleFlip = (idx: number) => {
    setFlip((prev) => {
      const open = prev.includes(idx);
      if (!open) speakEnglish(irregularVerbCards[idx].speak);
      return open ? prev.filter((i) => i !== idx) : [...prev, idx];
    });
  };

  const [pastAns, setPastAns] = useState<Record<string, string>>({});
  const [pastChecked, setPastChecked] = useState(false);
  const pastScore = hwPastType.filter((item) =>
    matchesAnyAnswer(pastAns[item.id] ?? "", [item.answer]),
  ).length;

  const [gapAns, setGapAns] = useState<Record<string, string>>({});
  const [gapChecked, setGapChecked] = useState(false);
  const gapScore = hwSentenceGaps.filter((g) =>
    matchesAnyAnswer(gapAns[g.id] ?? "", g.answers),
  ).length;

  const [carlaAns, setCarlaAns] = useState<Record<string, string>>({});
  const [carlaChecked, setCarlaChecked] = useState(false);
  const carlaScore = hwCarlaChoices.filter(
    (item) => (carlaAns[item.id] ?? "") === item.answer,
  ).length;

  const [writing, setWriting] = useState("");

  return (
    <div className="page">
      <div className="container">
        <p className="page-kicker">Homework · Lesson 56</p>
        <h1>You had a bad day</h1>
        <p className="lead">
          Неправильні дієслова · речення в Past Simple · Карла did / didn't · коротка
          розповідь про поганий день.
        </p>

        <section id="hw56-pictures" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">1 · Pictures</p>
            <h2>Pictures A–L</h2>
            <p className="lead">Скажи речення англійською, потім натисни, щоб перевірити.</p>
          </div>
          <div className="l22-vocab-grid" style={{ marginTop: "0.65rem" }}>
            {storyPhotos.map((card, idx) => {
              const isFlipped = picFlip.includes(idx);
              return (
                <button
                  key={card.id}
                  type="button"
                  className={`l22-vocab-card l22-vocab-card--photo${isFlipped ? " l22-vocab-card--flipped" : ""}`}
                  onClick={() => togglePic(idx)}
                  aria-pressed={isFlipped}
                >
                  <div className="l22-vocab-inner">
                    <div className="l22-vocab-face l22-vocab-front">
                      <img src={card.src} alt="" />
                      <span className="l22-vocab-hint">tap → English</span>
                    </div>
                    <div className="l22-vocab-face l22-vocab-back">
                      <span className="l22-vocab-label">English</span>
                      <strong>{card.sentence}</strong>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section id="hw56-cards" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">2 · Flashcards</p>
            <h2>Irregular verbs</h2>
            <p className="lead">Спочатку скажи пару англійською, потім натисни, щоб перевірити.</p>
          </div>
          <div className="l22-vocab-grid" style={{ marginTop: "0.65rem" }}>
            {irregularVerbCards.map((card, idx) => {
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
                      <span className="l22-vocab-label">Past simple</span>
                      <strong>{card.back}</strong>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section id="hw56-past" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">3 · Past form</p>
            <h2>Write the past simple</h2>
          </div>
          <ul className="lesson26-gap-list">
            {hwPastType.map((item) => {
              const val = pastAns[item.id] ?? "";
              const ok = matchesAnyAnswer(val, [item.answer]);
              return (
                <li key={item.id}>
                  <span>{item.prompt}</span>{" "}
                  <input
                    value={val}
                    onChange={(e) => {
                      setPastChecked(false);
                      setPastAns((prev) => ({ ...prev, [item.id]: e.target.value }));
                    }}
                    className={gapInputClass(pastChecked, val, ok)}
                    aria-label={`Past form of ${item.prompt}`}
                  />
                </li>
              );
            })}
          </ul>
          <CheckBar
            checked={pastChecked}
            score={pastScore}
            total={hwPastType.length}
            onCheck={() => setPastChecked(true)}
            onReset={() => {
              setPastChecked(false);
              setPastAns({});
            }}
          />
        </section>

        <section id="hw56-gaps" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">4 · Sentences</p>
            <h2>Complete with the past simple</h2>
          </div>
          <ul className="lesson26-gap-list">
            {hwSentenceGaps.map((g) => {
              const val = gapAns[g.id] ?? "";
              const ok = matchesAnyAnswer(val, g.answers);
              return (
                <li key={g.id}>
                  {g.before}{" "}
                  <input
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
            total={hwSentenceGaps.length}
            onCheck={() => setGapChecked(true)}
            onReset={() => {
              setGapChecked(false);
              setGapAns({});
            }}
          />
        </section>

        <section id="hw56-carla" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">5 · Carla</p>
            <h2>Did she, or didn't she?</h2>
          </div>
          <ul className="lesson26-gap-list">
            {hwCarlaChoices.map((item) => {
              const val = carlaAns[item.id] ?? "";
              return (
                <li key={item.id}>
                  {item.prompt.split("___")[0]}
                  <select
                    value={val}
                    onChange={(e) => {
                      setCarlaChecked(false);
                      setCarlaAns((prev) => ({ ...prev, [item.id]: e.target.value }));
                    }}
                    className={drillSelClass(carlaChecked, val, item.answer)}
                    aria-label={item.prompt}
                  >
                    <option value="">—</option>
                    {item.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  {item.prompt.split("___")[1]}
                </li>
              );
            })}
          </ul>
          <CheckBar
            checked={carlaChecked}
            score={carlaScore}
            total={hwCarlaChoices.length}
            onCheck={() => setCarlaChecked(true)}
            onReset={() => {
              setCarlaChecked(false);
              setCarlaAns({});
            }}
          />
        </section>

        <section id="hw56-write" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">6 · Writing</p>
            <h2>A bad day</h2>
            <p className="lead">
              Напиши 6–8 речень про поганий день (справжній або вигаданий). Скажи when, where
              і what happened. Використай неправильні дієслова і хоча б одне didn't.
            </p>
          </div>
          <textarea
            className="l25-writing-area"
            rows={10}
            value={writing}
            onChange={(e) => setWriting(e.target.value)}
            placeholder="I had a bad day last week. I went to…"
          />
        </section>

        <HomeworkSubmit
          lessonId="56"
          writing={writing}
          quizDone={pastChecked && gapChecked && carlaChecked}
          quizScore={pastScore + gapScore + carlaScore}
        />
      </div>
    </div>
  );
}
