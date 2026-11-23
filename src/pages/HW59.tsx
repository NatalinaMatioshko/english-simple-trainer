import { useState } from "react";
import { HomeworkSubmit } from "../components/HomeworkSubmit";
import { CheckBar } from "../components/lesson38/L38Ui";
import { gapInputClass } from "../components/lesson31/gapInputClass";
import { dialogueGaps, placePhotoMatch } from "../content/lessons/lesson-59/activities";
import {
  objectPronounCards,
  placeFlashcards,
} from "../content/lessons/lesson-59/vocabulary";
import { speakEnglish } from "../utils/speech";
import { matchesAnyAnswer } from "../utils/text";
import "../styles/lesson22.css";
import "../styles/lesson25.css";

const placeGaps = [
  { id: "on", before: "The bag is", after: "the table.", answers: ["on"] },
  { id: "in", before: "The flowers are", after: "the bag.", answers: ["in"] },
  { id: "at", before: "The man is", after: "the hotel.", answers: ["at"] },
  {
    id: "next",
    before: "The bag is",
    after: "the chair.",
    answers: ["next to"],
  },
  {
    id: "above",
    before: "The picture is",
    after: "the table.",
    answers: ["above"],
  },
  {
    id: "below",
    before: "The table is",
    after: "the picture.",
    answers: ["below"],
  },
  {
    id: "between",
    before: "The clock is",
    after: "the computer and the books.",
    answers: ["between"],
  },
  {
    id: "front",
    before: "The cup is",
    after: "the cake.",
    answers: ["in front of"],
  },
  {
    id: "behind",
    before: "The cake is",
    after: "the cup.",
    answers: ["behind"],
  },
] as const;

/** Homework for Lesson 59 — place prepositions, object pronouns, a short photo note. */
export default function HW59() {
  const [flipPlace, setFlipPlace] = useState<number[]>([]);
  const [flipPronoun, setFlipPronoun] = useState<number[]>([]);

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

  const [place, setPlace] = useState<Record<string, string>>({});
  const [placeChecked, setPlaceChecked] = useState(false);
  const placeScore = placeGaps.filter((item) =>
    matchesAnyAnswer(place[item.id] ?? "", [...item.answers]),
  ).length;

  const [pronoun, setPronoun] = useState<Record<string, string>>({});
  const [pronounChecked, setPronounChecked] = useState(false);
  const pronounScore = dialogueGaps.filter(
    (item) => (pronoun[item.id] ?? "") === item.answer,
  ).length;

  const [writing, setWriting] = useState("");

  const appendix = [
    "2 · Prepositions",
    ...placeGaps.map((item) => {
      const value = place[item.id] ?? "";
      return `${item.before} ${value} ${item.after}`.trim();
    }),
    "",
    "3 · Pronouns",
    ...dialogueGaps.map((item) => {
      const value = pronoun[item.id] ?? "";
      return `${item.before} ${value} ${item.after}`.trim();
    }),
  ].join("\n");

  return (
    <div className="page">
      <div className="container">
        <p className="page-kicker">Homework · Lesson 59</p>
        <h1>Family photos</h1>
        <p className="lead">
          Прийменники місця, object pronouns і коротка розповідь про людей на
          фото.
        </p>

        <section id="hw59-place-cards" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">1a · Flashcards</p>
            <h2>Prepositions of place</h2>
            <p className="lead">Скажи англійською, потім перевір картку.</p>
          </div>
          <div className="l22-vocab-grid" style={{ marginTop: "0.65rem" }}>
            {placeFlashcards.map((card, idx) => {
              const isFlipped = flipPlace.includes(idx);
              return (
                <button
                  key={card.back}
                  type="button"
                  className={`l22-vocab-card${isFlipped ? " l22-vocab-card--flipped" : ""}`}
                  onClick={() =>
                    toggle(flipPlace, setFlipPlace, idx, card.back)
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

        <section id="hw59-place" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">1b · Gaps</p>
            <h2>Complete the sentences</h2>
            <p className="lead">
              {placePhotoMatch.length} речень з уроку. Напиши прийменник.
            </p>
          </div>
          <ol className="hw57-translate">
            {placeGaps.map((item, index) => (
              <li key={item.id}>
                <span>
                  {index + 1}. {item.before}
                </span>
                <input
                  className={gapInputClass(
                    placeChecked,
                    place[item.id] ?? "",
                    matchesAnyAnswer(place[item.id] ?? "", [...item.answers]),
                  )}
                  value={place[item.id] ?? ""}
                  onChange={(e) =>
                    setPlace((prev) => ({ ...prev, [item.id]: e.target.value }))
                  }
                  autoComplete="off"
                />
                <span>{item.after}</span>
              </li>
            ))}
          </ol>
          <CheckBar
            checked={placeChecked}
            score={placeScore}
            total={placeGaps.length}
            onCheck={() => setPlaceChecked(true)}
            onReset={() => setPlaceChecked(false)}
          />
        </section>

        <section id="hw59-pronoun-cards" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">2a · Flashcards</p>
            <h2>Subject → object</h2>
          </div>
          <div className="l22-vocab-grid" style={{ marginTop: "0.65rem" }}>
            {objectPronounCards.map((card, idx) => {
              const isFlipped = flipPronoun.includes(idx);
              return (
                <button
                  key={card.front}
                  type="button"
                  className={`l22-vocab-card${isFlipped ? " l22-vocab-card--flipped" : ""}`}
                  onClick={() =>
                    toggle(flipPronoun, setFlipPronoun, idx, card.back)
                  }
                  aria-pressed={isFlipped}
                >
                  <div className="l22-vocab-inner">
                    <div className="l22-vocab-face l22-vocab-front">
                      <span className="l22-vocab-label">Subject</span>
                      <strong>{card.front}</strong>
                    </div>
                    <div className="l22-vocab-face l22-vocab-back">
                      <span className="l22-vocab-label">Object</span>
                      <strong>{card.back}</strong>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section id="hw59-pronouns" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">2b · Dialogue</p>
            <h2>Choose the correct alternatives</h2>
            <p className="lead">Jenna і Miguel — ті самі пропуски, що в уроці.</p>
          </div>
          <ol className="hw57-translate">
            {dialogueGaps.map((item, index) => {
              const value = pronoun[item.id] ?? "";
              const wrong = pronounChecked && value && value !== item.answer;
              return (
                <li key={item.id}>
                  <span>
                    {index + 1}. {item.before}
                  </span>
                  <select
                    className={gapInputClass(
                      pronounChecked,
                      value,
                      value === item.answer,
                    )}
                    value={value}
                    onChange={(e) =>
                      setPronoun((prev) => ({
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
                  <span>{item.after}</span>
                  {wrong ? <p className="hw57-key">{item.answer}</p> : null}
                </li>
              );
            })}
          </ol>
          <CheckBar
            checked={pronounChecked}
            score={pronounScore}
            total={dialogueGaps.length}
            onCheck={() => setPronounChecked(true)}
            onReset={() => setPronounChecked(false)}
          />
        </section>

        <section id="hw59-write" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">3 · Writing</p>
            <h2>People in a photo</h2>
            <p className="lead">
              5–7 речень про своє фото або про Photo 1 / Photo 2 з уроку. Хто
              це, де вони стоять, як часто ти їх бачиш. Використай him / her /
              them хоча б двічі.
            </p>
          </div>
          <textarea
            className="l25-writing-area"
            rows={10}
            value={writing}
            onChange={(e) => setWriting(e.target.value)}
            placeholder="This is my mum. She is next to my dad. I see her every day…"
          />
        </section>

        <HomeworkSubmit
          lessonId="59"
          writing={writing}
          appendix={appendix}
          quizDone={placeChecked && pronounChecked}
          quizScore={placeScore + pronounScore}
          showListeningCheck={false}
        />
      </div>
    </div>
  );
}
