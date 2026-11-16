import { useState, type Dispatch, type SetStateAction } from "react";
import { HomeworkSubmit } from "../components/HomeworkSubmit";
import { CheckBar } from "../components/lesson38/L38Ui";
import { drillSelClass } from "../components/lesson31/drillSelClass";
import { gapInputClass } from "../components/lesson31/gapInputClass";
import { hwCarlaChoices, hwPastType, hwSentenceGaps, storyPhotos } from "../content/lessons/lesson-56/activities";
import { irregularVerbCards } from "../content/lessons/lesson-56/vocabulary";
import {
  hw57ArticleTranslate,
  hw57NegativeTranslate,
  hw57PastTranslate,
  hw57SentenceTranslate,
  type TranslateItem,
} from "../content/lessons/lesson-57/hwTranslate";
import { speakEnglish } from "../utils/speech";
import { matchesAnyAnswer } from "../utils/text";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
import "../styles/lesson26.css";

function verbPairAnswers(back: string): string[] {
  const [infinitive, past] = back.split(" → ");
  if (!past) return [back];
  return [
    back,
    `${infinitive} -> ${past}`,
    `${infinitive} - ${past}`,
    `${infinitive}, ${past}`,
    `${infinitive} ${past}`,
    past,
  ];
}

const verbTest: TranslateItem[] = irregularVerbCards.map((card, index) => ({
  id: `v${index + 1}`,
  prompt: card.front,
  answers: verbPairAnswers(card.back),
}));

function scoreOf(
  items: readonly TranslateItem[],
  answers: Record<string, string>,
): number {
  return items.filter((item) =>
    matchesAnyAnswer(answers[item.id] ?? "", item.answers),
  ).length;
}

function answerLines(
  title: string,
  items: readonly TranslateItem[],
  answers: Record<string, string>,
): string {
  const rows = items
    .map((item) => {
      const value = (answers[item.id] ?? "").trim();
      return value ? `${item.prompt} → ${value}` : "";
    })
    .filter(Boolean);
  return rows.length ? `${title}\n${rows.join("\n")}` : "";
}

function TranslateList({
  items,
  answers,
  checked,
  onChange,
}: {
  items: readonly TranslateItem[];
  answers: Record<string, string>;
  checked: boolean;
  onChange: (id: string, value: string) => void;
}) {
  return (
    <ol className="hw57-translate">
      {items.map((item, index) => {
        const value = answers[item.id] ?? "";
        const ok = matchesAnyAnswer(value, item.answers);
        return (
          <li key={item.id}>
            <span>
              {index + 1}. {item.prompt}
            </span>
            <input
              value={value}
              onChange={(event) => onChange(item.id, event.target.value)}
              className={gapInputClass(checked, value, ok)}
              aria-label={item.prompt}
            />
            {checked && value.trim() && !ok ? (
              <span className="hw57-key">{item.answers[0]}</span>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

/** Homework for Lesson 57 — same tasks as Lesson 56, without the lesson video. */
export default function HW57() {
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

  const [verbAns, setVerbAns] = useState<Record<string, string>>({});
  const [verbChecked, setVerbChecked] = useState(false);
  const verbScore = scoreOf(verbTest, verbAns);

  const [sentAns, setSentAns] = useState<Record<string, string>>({});
  const [sentChecked, setSentChecked] = useState(false);
  const sentScore = scoreOf(hw57SentenceTranslate, sentAns);

  const [pastWriteAns, setPastWriteAns] = useState<Record<string, string>>({});
  const [pastWriteChecked, setPastWriteChecked] = useState(false);
  const pastWriteScore = scoreOf(hw57PastTranslate, pastWriteAns);

  const [artAns, setArtAns] = useState<Record<string, string>>({});
  const [artChecked, setArtChecked] = useState(false);
  const artScore = scoreOf(hw57ArticleTranslate, artAns);

  const [negAns, setNegAns] = useState<Record<string, string>>({});
  const [negChecked, setNegChecked] = useState(false);
  const negScore = scoreOf(hw57NegativeTranslate, negAns);

  const [writing, setWriting] = useState("");

  const setField =
    (
      setter: Dispatch<SetStateAction<Record<string, string>>>,
      unlock: () => void,
    ) =>
    (id: string, value: string) => {
      unlock();
      setter((prev) => ({ ...prev, [id]: value }));
    };

  const appendix = [
    answerLines("2 · Verb test", verbTest, verbAns),
    answerLines("2b · Sentences", hw57SentenceTranslate, sentAns),
    answerLines("4b · Past", hw57PastTranslate, pastWriteAns),
    answerLines("4c · Articles", hw57ArticleTranslate, artAns),
    answerLines("4d · Negatives", hw57NegativeTranslate, negAns),
  ]
    .filter(Boolean)
    .join("\n\n");

  return (
    <div className="page">
      <div className="container">
        <p className="page-kicker">Homework · Lesson 57</p>
        <h1>You had a bad day</h1>
        <p className="lead">
          Неправильні дієслова · речення в Past Simple · Карла did / didn't · коротка
          розповідь про поганий день.
        </p>

        <section id="hw57-pictures" className="lesson22-block panel">
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

        <section id="hw57-cards" className="lesson22-block panel">
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

        <section id="hw57-verb-test" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">2 · Test</p>
            <h2>Irregular verbs</h2>
            <p className="lead">
              Напиши пару англійською: get up → got up. Можна через кому або лише
              форму минулого часу.
            </p>
          </div>
          <TranslateList
            items={verbTest}
            answers={verbAns}
            checked={verbChecked}
            onChange={setField(setVerbAns, () => setVerbChecked(false))}
          />
          <CheckBar
            checked={verbChecked}
            score={verbScore}
            total={verbTest.length}
            onCheck={() => setVerbChecked(true)}
            onReset={() => {
              setVerbChecked(false);
              setVerbAns({});
            }}
          />
        </section>

        <section id="hw57-past" className="lesson22-block panel">
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

        <section id="hw57-gaps" className="lesson22-block panel">
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

        <section id="hw57-sentences-ua" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">2b · Writing</p>
            <h2>Complete the sentences</h2>
            <p className="lead">
              Переклади речення англійською. Дієслово — в Past Simple.
            </p>
          </div>
          <TranslateList
            items={hw57SentenceTranslate}
            answers={sentAns}
            checked={sentChecked}
            onChange={setField(setSentAns, () => setSentChecked(false))}
          />
          <CheckBar
            checked={sentChecked}
            score={sentScore}
            total={hw57SentenceTranslate.length}
            onCheck={() => setSentChecked(true)}
            onReset={() => {
              setSentChecked(false);
              setSentAns({});
            }}
          />
        </section>

        <section id="hw57-carla" className="lesson22-block panel">
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

        <section id="hw57-past-write" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">4b · Writing</p>
            <h2>Write the sentence in the past</h2>
            <p className="lead">Переклади англійською в Past Simple.</p>
          </div>
          <TranslateList
            items={hw57PastTranslate}
            answers={pastWriteAns}
            checked={pastWriteChecked}
            onChange={setField(setPastWriteAns, () => setPastWriteChecked(false))}
          />
          <CheckBar
            checked={pastWriteChecked}
            score={pastWriteScore}
            total={hw57PastTranslate.length}
            onCheck={() => setPastWriteChecked(true)}
            onReset={() => {
              setPastWriteChecked(false);
              setPastWriteAns({});
            }}
          />
        </section>

        <section id="hw57-articles" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">4c · Writing</p>
            <h2>Add a, an or the</h2>
            <p className="lead">
              Переклади англійською і додай a, an або the. an — перед a, e, i, o, u.
              the — цей конкретний предмет або місце.
            </p>
          </div>
          <TranslateList
            items={hw57ArticleTranslate}
            answers={artAns}
            checked={artChecked}
            onChange={setField(setArtAns, () => setArtChecked(false))}
          />
          <CheckBar
            checked={artChecked}
            score={artScore}
            total={hw57ArticleTranslate.length}
            onCheck={() => setArtChecked(true)}
            onReset={() => {
              setArtChecked(false);
              setArtAns({});
            }}
          />
        </section>

        <section id="hw57-negatives" className="lesson22-block panel">
          <div className="lesson22-section-head">
            <p className="page-kicker">4d · Writing</p>
            <h2>Make the sentences negative</h2>
            <p className="lead">
              Переклади заперечення: didn't + дієслово без минулої форми. Артикль
              лишається.
            </p>
          </div>
          <TranslateList
            items={hw57NegativeTranslate}
            answers={negAns}
            checked={negChecked}
            onChange={setField(setNegAns, () => setNegChecked(false))}
          />
          <CheckBar
            checked={negChecked}
            score={negScore}
            total={hw57NegativeTranslate.length}
            onCheck={() => setNegChecked(true)}
            onReset={() => {
              setNegChecked(false);
              setNegAns({});
            }}
          />
        </section>

        <section id="hw57-write" className="lesson22-block panel">
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
          lessonId="57"
          writing={writing}
          appendix={appendix}
          quizDone={
            pastChecked &&
            gapChecked &&
            carlaChecked &&
            verbChecked &&
            sentChecked &&
            pastWriteChecked &&
            artChecked &&
            negChecked
          }
          quizScore={
            pastScore +
            gapScore +
            carlaScore +
            verbScore +
            sentScore +
            pastWriteScore +
            artScore +
            negScore
          }
        />
      </div>
    </div>
  );
}
