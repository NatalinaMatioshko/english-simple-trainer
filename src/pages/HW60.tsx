import { useState } from "react";
import { HomeworkSubmit } from "../components/HomeworkSubmit";
import { CheckBar } from "../components/lesson38/L38Ui";
import { gapInputClass } from "../components/lesson31/gapInputClass";
import {
  hobbyPhraseGaps,
  hobbyUaTranslate,
} from "../content/lessons/lesson-60/activities";
import {
  hobbyFlashcards,
  likeIngFlashcards,
} from "../content/lessons/lesson-60/vocabulary";
import { speakEnglish } from "../utils/speech";
import { matchesAnyAnswer } from "../utils/text";
import "../styles/lesson22.css";
import "../styles/lesson25.css";

/** Homework for Lesson 60 — hobbies, verb collocations, like + -ing. */
export default function HW60() {
  const [flipHobby, setFlipHobby] = useState<number[]>([]);
  const [flipLike, setFlipLike] = useState<number[]>([]);

  const toggle = (
    list: number[],
    setList: (next: number[]) => void,
    idx: number,
    speak: string,
  ) => {
    const open = list.includes(idx);
    if (!open) speakEnglish(speak);
    setList(open ? list.filter((i) => i !== idx) : [...list, idx]);
  };

  const [phrases, setPhrases] = useState<Record<string, string>>({});
  const [phrasesChecked, setPhrasesChecked] = useState(false);
  const phrasesScore = hobbyPhraseGaps.filter((item) =>
    matchesAnyAnswer(phrases[item.id] ?? "", [...item.answers]),
  ).length;

  const [ua, setUa] = useState<Record<string, string>>({});
  const [uaChecked, setUaChecked] = useState(false);
  const uaScore = hobbyUaTranslate.filter((item) =>
    matchesAnyAnswer(ua[item.id] ?? "", [...item.answers]),
  ).length;

  const [writing, setWriting] = useState("");

  const appendix = [
    "1b · Verb phrases",
    ...hobbyPhraseGaps.map((item) => {
      const value = phrases[item.id] ?? "";
      return `${value} ${item.after}`.trim();
    }),
    "",
    "2 · UA → EN",
    ...hobbyUaTranslate.map((item) => {
      const value = ua[item.id] ?? "";
      return `${item.ua} → ${value}`.trim();
    }),
  ].join("\n");

  return (
    <div className="page">
      <div className="container">
        <p className="page-kicker">Homework · Lesson 60</p>
        <h1>Hobbies</h1>
        <p className="lead">
          Хобі, дієслова watch / listen / play / read / do / use, і like /
          enjoy / love / hate + -ing.
        </p>

        <section id="hw60-cards" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">1a · Flashcards</p>
            <h2>Hobby phrases</h2>
            <p className="lead">Скажи англійською, потім перевір картку.</p>
          </div>
          <div className="l22-vocab-grid" style={{ marginTop: "0.65rem" }}>
            {hobbyFlashcards.map((card, idx) => {
              const isFlipped = flipHobby.includes(idx);
              return (
                <button
                  key={card.back}
                  type="button"
                  className={`l22-vocab-card${isFlipped ? " l22-vocab-card--flipped" : ""}`}
                  onClick={() =>
                    toggle(flipHobby, setFlipHobby, idx, card.back)
                  }
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

        <section id="hw60-phrases" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">1b · Gaps</p>
            <h2>Complete the phrases</h2>
            <p className="lead">Обери дієслово: watch, listen to, play, read, do, use.</p>
          </div>
          <ol className="hw57-translate">
            {hobbyPhraseGaps.map((item, index) => {
              const value = phrases[item.id] ?? "";
              const ok = matchesAnyAnswer(value, [...item.answers]);
              return (
                <li key={item.id}>
                  <span>
                    {index + 1}. {item.after}
                  </span>
                  <select
                    className={gapInputClass(phrasesChecked, value, ok)}
                    value={value}
                    onChange={(e) =>
                      setPhrases((prev) => ({
                        ...prev,
                        [item.id]: e.target.value,
                      }))
                    }
                  >
                    <option value="">—</option>
                    {item.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  {phrasesChecked && value && !ok ? (
                    <p className="hw57-key">{item.answers[0]}</p>
                  ) : null}
                </li>
              );
            })}
          </ol>
          <CheckBar
            checked={phrasesChecked}
            score={phrasesScore}
            total={hobbyPhraseGaps.length}
            onCheck={() => setPhrasesChecked(true)}
            onReset={() => {
              setPhrases({});
              setPhrasesChecked(false);
            }}
          />
        </section>

        <section id="hw60-like-cards" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">2a · Flashcards</p>
            <h2>like / enjoy / love / hate + -ing</h2>
          </div>
          <div className="l22-vocab-grid" style={{ marginTop: "0.65rem" }}>
            {likeIngFlashcards.map((card, idx) => {
              const isFlipped = flipLike.includes(idx);
              return (
                <button
                  key={card.back}
                  type="button"
                  className={`l22-vocab-card${isFlipped ? " l22-vocab-card--flipped" : ""}`}
                  onClick={() => toggle(flipLike, setFlipLike, idx, card.back)}
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

        <section id="hw60-write" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">2b · Writing</p>
            <h2>About you</h2>
            <p className="lead">
              Напиши 5 речень про себе з like / enjoy / love / hate + -ing.
            </p>
          </div>
          <textarea
            className="l25-writing-area"
            rows={10}
            value={writing}
            onChange={(e) => setWriting(e.target.value)}
            placeholder="I like watching films. I enjoy reading… I love… I hate…"
          />
        </section>

        <section id="hw60-ua" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">3 · Translate</p>
            <h2>UA → EN</h2>
            <p className="lead">Переклади речення. Потім натисни Check.</p>
          </div>
          <ol className="hw57-translate">
            {hobbyUaTranslate.map((item, index) => {
              const value = ua[item.id] ?? "";
              const ok = matchesAnyAnswer(value, [...item.answers]);
              return (
                <li key={item.id}>
                  <span>
                    {index + 1}. {item.ua}
                  </span>
                  <input
                    className={gapInputClass(uaChecked, value, ok)}
                    value={value}
                    onChange={(e) =>
                      setUa((prev) => ({ ...prev, [item.id]: e.target.value }))
                    }
                    autoComplete="off"
                  />
                  {uaChecked && value.trim() && !ok ? (
                    <p className="hw57-key">{item.answers[0]}</p>
                  ) : null}
                </li>
              );
            })}
          </ol>
          <CheckBar
            checked={uaChecked}
            score={uaScore}
            total={hobbyUaTranslate.length}
            onCheck={() => setUaChecked(true)}
            onReset={() => {
              setUa({});
              setUaChecked(false);
            }}
          />
        </section>

        <HomeworkSubmit
          lessonId="60"
          writing={writing}
          appendix={appendix}
          quizDone={phrasesChecked && uaChecked}
          quizScore={phrasesScore + uaScore}
          showListeningCheck={false}
        />
      </div>
    </div>
  );
}
