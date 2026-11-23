import { useState } from "react";
import { HomeworkSubmit } from "../components/HomeworkSubmit";
import { CheckBar } from "../components/lesson38/L38Ui";
import { drillSelClass } from "../components/lesson31/drillSelClass";
import { gapInputClass } from "../components/lesson31/gapInputClass";
import {
  belowUnderMini,
  petroBadDayGaps,
  petroBadDayPassage,
  placePhotoMatch,
  placeUaTranslate,
} from "../content/lessons/lesson-59/activities";
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

function petroGapAnswers(gap: (typeof petroBadDayGaps)[number]): string[] {
  return gap.answers ? [...gap.answers] : [gap.answer];
}

function initPetroFixes(): Record<string, string> {
  return Object.fromEntries(petroBadDayGaps.map((g) => [g.id, g.wrong]));
}

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

  const [uaPlace, setUaPlace] = useState<Record<string, string>>({});
  const [uaChecked, setUaChecked] = useState(false);
  const uaScore = placeUaTranslate.filter((item) =>
    matchesAnyAnswer(uaPlace[item.id] ?? "", [...item.answers]),
  ).length;

  const [belowUnder, setBelowUnder] = useState<Record<string, string>>({});
  const [belowUnderChecked, setBelowUnderChecked] = useState(false);
  const belowUnderScore = belowUnderMini.filter((item) =>
    matchesAnyAnswer(belowUnder[item.id] ?? "", [...item.answers]),
  ).length;

  const [petroFixes, setPetroFixes] = useState<Record<string, string>>(initPetroFixes);
  const [petroChecked, setPetroChecked] = useState(false);
  const petroScore = petroBadDayGaps.filter((gap) =>
    matchesAnyAnswer(petroFixes[gap.id] ?? "", petroGapAnswers(gap)),
  ).length;

  const [writing, setWriting] = useState("");

  const correctedStory = petroBadDayPassage
    .map((seg) =>
      seg.type === "text" ? seg.value : (petroFixes[seg.id] ?? seg.wrong),
    )
    .join("");

  const appendix = [
    "1b · Preposition gaps",
    ...placeGaps.map((item) => {
      const value = place[item.id] ?? "";
      return `${item.before} ${value} ${item.after}`.trim();
    }),
    "",
    "1c · UA → EN",
    ...placeUaTranslate.map((item) => {
      const value = uaPlace[item.id] ?? "";
      return `${item.ua} → ${value}`.trim();
    }),
    "",
    "1d · below / under / over / above",
    ...belowUnderMini.map((item) => {
      const value = belowUnder[item.id] ?? "";
      return `${item.before} ${value} ${item.after}`.trim();
    }),
    "",
    "3 · Corrected bad-day story",
    ...petroBadDayGaps.map((gap) => {
      const chosen = petroFixes[gap.id] ?? gap.wrong;
      return `${gap.wrong} → ${chosen}`;
    }),
    "",
    correctedStory.trim(),
  ].join("\n");

  return (
    <div className="page">
      <div className="container">
        <p className="page-kicker">Homework · Lesson 59</p>
        <h1>Family photos</h1>
        <p className="lead">
          Прийменники місця (UA → EN, below/under), object pronouns, виправлення
          попереднього ДЗ і коротка розповідь про людей на фото.
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
              {placePhotoMatch.length} речень з уроку. Напиши лише прийменник.
            </p>
          </div>
          <ol className="hw59-prep-gaps">
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
                  onChange={(e) => {
                    setPlaceChecked(false);
                    setPlace((prev) => ({
                      ...prev,
                      [item.id]: e.target.value,
                    }));
                  }}
                  autoComplete="off"
                  size={Math.max(item.answers[0].length, 4)}
                  aria-label={`Preposition ${index + 1}`}
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
            onReset={() => {
              setPlace({});
              setPlaceChecked(false);
            }}
          />
          <button
            type="button"
            className="l25-cr-mini-btn"
            style={{ marginTop: "0.4rem" }}
            onClick={() => {
              setPlace(
                Object.fromEntries(
                  placeGaps.map((item) => [item.id, item.answers[0]]),
                ),
              );
              setPlaceChecked(true);
            }}
          >
            Show answers
          </button>
        </section>

        <section id="hw59-place-ua" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">1c · Translate</p>
            <h2>Prepositions of place · UA → EN</h2>
            <p className="lead">
              Нові речення з прийменниками місця. Переклади англійською, потім
              натисни Check.
            </p>
          </div>
          <ol className="hw57-translate">
            {placeUaTranslate.map((item, index) => {
              const value = uaPlace[item.id] ?? "";
              const ok = matchesAnyAnswer(value, [...item.answers]);
              const wrong = uaChecked && value.trim() && !ok;
              return (
                <li key={item.id}>
                  <span>
                    {index + 1}. {item.ua}
                  </span>
                  <input
                    className={gapInputClass(uaChecked, value, ok)}
                    value={value}
                    onChange={(e) => {
                      setUaChecked(false);
                      setUaPlace((prev) => ({
                        ...prev,
                        [item.id]: e.target.value,
                      }));
                    }}
                    autoComplete="off"
                    aria-label={`Translate: ${item.ua}`}
                  />
                  {wrong ? <p className="hw57-key">{item.answers[0]}</p> : null}
                </li>
              );
            })}
          </ol>
          <CheckBar
            checked={uaChecked}
            score={uaScore}
            total={placeUaTranslate.length}
            onCheck={() => setUaChecked(true)}
            onReset={() => {
              setUaPlace({});
              setUaChecked(false);
            }}
          />
          <button
            type="button"
            className="l25-cr-mini-btn"
            style={{ marginTop: "0.4rem" }}
            onClick={() => {
              setUaPlace(
                Object.fromEntries(
                  placeUaTranslate.map((item) => [item.id, item.answers[0]]),
                ),
              );
              setUaChecked(true);
            }}
          >
            Show answers
          </button>
        </section>

        <section id="hw59-below-under" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">1d · Mini-test</p>
            <h2>below / under · over / above</h2>
            <p className="lead">
              Прочитай коротку підказку. Потім обери слово:{" "}
              <strong>below · under · over · above</strong>.
            </p>
          </div>

          <div className="l25-grammar-box" style={{ marginTop: "0.75rem" }}>
            <div className="l25-grammar-label">Tip · місце</div>
            <div className="l25-grammar-rows">
              <div className="l25-gr-row l25-gr-row--pos">
                <span className="l25-gr-sign">під</span>
                <div className="l25-gr-cells">
                  <span>
                    <strong>under</strong> — прямо під чимось / часто «накрито»:
                    The cat is <em>under</em> the table.
                  </span>
                  <span>
                    <strong>below</strong> — нижче / на рівні (не обов’язково
                    накрито): Write your name <em>below</em> the line. · It is{" "}
                    <em>below</em> zero.
                  </span>
                </div>
              </div>
              <div className="l25-gr-row l25-gr-row--where">
                <span className="l25-gr-sign">над</span>
                <div className="l25-gr-cells">
                  <span>
                    <strong>over</strong> ≈ <em>над</em> у більшості повсякденних
                    речень: The plane is flying <em>over</em> the city. · Put the
                    blanket <em>over</em> the baby.
                  </span>
                  <span>
                    <strong>above</strong> = вище / над — на стіні, в небі або на
                    рівні (вище, часто без дотику): The picture is <em>above</em>{" "}
                    the sofa. · A bird <em>above</em> us in the sky.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <ol className="hw59-prep-gaps">
            {belowUnderMini.map((item, index) => (
              <li key={item.id}>
                <span>
                  {index + 1}. {item.before}
                </span>
                <input
                  className={gapInputClass(
                    belowUnderChecked,
                    belowUnder[item.id] ?? "",
                    matchesAnyAnswer(
                      belowUnder[item.id] ?? "",
                      [...item.answers],
                    ),
                  )}
                  value={belowUnder[item.id] ?? ""}
                  onChange={(e) => {
                    setBelowUnderChecked(false);
                    setBelowUnder((prev) => ({
                      ...prev,
                      [item.id]: e.target.value,
                    }));
                  }}
                  autoComplete="off"
                  size={Math.max(item.answers[0].length, 5)}
                  aria-label={`below under over above ${index + 1}`}
                />
                <span>{item.after}</span>
              </li>
            ))}
          </ol>
          <CheckBar
            checked={belowUnderChecked}
            score={belowUnderScore}
            total={belowUnderMini.length}
            onCheck={() => setBelowUnderChecked(true)}
            onReset={() => {
              setBelowUnder({});
              setBelowUnderChecked(false);
            }}
          />
          <button
            type="button"
            className="l25-cr-mini-btn"
            style={{ marginTop: "0.4rem" }}
            onClick={() => {
              setBelowUnder(
                Object.fromEntries(
                  belowUnderMini.map((item) => [item.id, item.answers[0]]),
                ),
              );
              setBelowUnderChecked(true);
            }}
          >
            Show answers
          </button>
        </section>

        <section id="hw59-pronoun-cards" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">2 · Flashcards</p>
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
          <p style={{ marginTop: "0.85rem" }}>
            <a
              className="l22-external-link"
              href="https://test-english.com/grammar-points/a1/object-pronouns/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Test-English: Object pronouns ↗
            </a>
          </p>
        </section>

        <section id="hw59-correct" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">3 · Correct</p>
            <h2>Fix your previous homework</h2>
            <p className="lead">
              Це твоє попереднє ДЗ (історія про bad day). Помилки підсвічені —
              обери правильний варіант у кожному місці. Потім натисни Check.
            </p>
          </div>
          <div className="hw59-story-passage" aria-label="Bad-day story with gaps">
            {petroBadDayPassage.map((seg, index) => {
              if (seg.type === "text") {
                return <span key={`t-${index}`}>{seg.value}</span>;
              }
              const value = petroFixes[seg.id] ?? seg.wrong;
              const okAnswers = petroGapAnswers(seg);
              const ok = matchesAnyAnswer(value, okAnswers);
              return (
                <span key={seg.id} className="hw59-story-gap">
                  <select
                    className={drillSelClass(
                      petroChecked,
                      ok ? seg.answer : value,
                      seg.answer,
                    )}
                    value={value}
                    onChange={(e) => {
                      setPetroChecked(false);
                      setPetroFixes((prev) => ({
                        ...prev,
                        [seg.id]: e.target.value,
                      }));
                    }}
                    aria-label={`Fix: ${seg.wrong}`}
                  >
                    {seg.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </span>
              );
            })}
          </div>
          {petroChecked ? (
            <ol className="hw59-story-explain" aria-label="Why each correction is right">
              {petroBadDayGaps.map((gap, index) => (
                <li key={gap.id}>
                  <span className="hw59-story-explain-pair">
                    {index + 1}. {gap.wrong} → {gap.answer}
                  </span>
                  <span className="hw59-story-explain-why"> · {gap.explain}</span>
                </li>
              ))}
            </ol>
          ) : null}
          <CheckBar
            checked={petroChecked}
            score={petroScore}
            total={petroBadDayGaps.length}
            onCheck={() => setPetroChecked(true)}
            onReset={() => {
              setPetroFixes(initPetroFixes());
              setPetroChecked(false);
            }}
          />
          <button
            type="button"
            className="l25-cr-mini-btn"
            style={{ marginTop: "0.4rem" }}
            onClick={() => {
              setPetroFixes(
                Object.fromEntries(
                  petroBadDayGaps.map((gap) => [gap.id, gap.answer]),
                ),
              );
              setPetroChecked(true);
            }}
          >
            Show answers
          </button>
        </section>

        <section id="hw59-write" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">4 · Writing</p>
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
          quizDone={
            placeChecked && uaChecked && belowUnderChecked && petroChecked
          }
          quizScore={
            placeScore + uaScore + belowUnderScore + petroScore
          }
          showListeningCheck={false}
        />
      </div>
    </div>
  );
}
