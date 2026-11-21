import { useState } from "react";
import { HwBlockSubmit } from "./HwBlockSubmit";
import { CheckBar } from "./lesson38/L38Ui";
import { drillSelClass } from "./lesson31/drillSelClass";
import { gapInputClass } from "./lesson31/gapInputClass";
import {
  aboutYouVerbs,
  holidayQuestionGaps,
  infinitiveGaps,
  irregularGrid,
  irregularWords,
  morningGaps,
  morningTicks,
  ownAnswerPrompts,
  reflectStatements58,
  schoolPastGaps,
  verbBox,
  verbBoxGaps,
} from "../content/lessons/lesson-58/hwCheckReflect";
import { matchesAnyAnswer } from "../utils/text";
import { useDraftState } from "../utils/useDraftState";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
import "../styles/lesson35.css";

const WS_COLORS = [
  "#fde68a",
  "#bbf7d0",
  "#bfdbfe",
  "#fecaca",
  "#ddd6fe",
  "#fed7aa",
  "#a7f3d0",
  "#bae6fd",
  "#fbcfe8",
  "#fef08a",
  "#c7d2fe",
  "#fde68a",
];

function cellsBetween(
  r1: number,
  c1: number,
  r2: number,
  c2: number,
): [number, number][] | null {
  const dr = r2 - r1;
  const dc = c2 - c1;
  if (dr === 0 && dc === 0) return [[r1, c1]];
  if (dr !== 0 && dc !== 0 && Math.abs(dr) !== Math.abs(dc)) return null;
  const steps = Math.max(Math.abs(dr), Math.abs(dc));
  const sr = dr === 0 ? 0 : dr / Math.abs(dr);
  const sc = dc === 0 ? 0 : dc / Math.abs(dc);
  const cells: [number, number][] = [];
  for (let i = 0; i <= steps; i++) cells.push([r1 + sr * i, c1 + sc * i]);
  return cells;
}

function matchWord(cells: [number, number][]): string | null {
  const key = cells
    .map(([r, c]) => `${r},${c}`)
    .sort()
    .join("|");
  for (const item of irregularWords) {
    const wordKey = item.cells
      .map(([r, c]) => `${r},${c}`)
      .sort()
      .join("|");
    if (key === wordKey) return item.word;
  }
  return null;
}

/** Unit 8 Check and reflect. Each block has its own send button. */
export function Hw58CheckReflect() {
  const [verbs, setVerbs] = useDraftState<Record<string, string>>("hw58-cr-verbs", {});
  const [verbsChecked, setVerbsChecked] = useDraftState("hw58-cr-verbs-checked", false);
  const [trueForMe, setTrueForMe] = useDraftState<Record<string, boolean>>(
    "hw58-cr-true",
    {},
  );

  const [school, setSchool] = useDraftState<Record<string, string>>("hw58-cr-school", {});
  const [schoolChecked, setSchoolChecked] = useDraftState("hw58-cr-school-checked", false);

  const [found, setFound] = useDraftState<string[]>("hw58-cr-ws", ["ate"]);
  const [wsFirst, setWsFirst] = useState<[number, number] | null>(null);
  const [wsHover, setWsHover] = useState<[number, number] | null>(null);

  const [box, setBox] = useDraftState<Record<string, string>>("hw58-cr-box", {});
  const [boxChecked, setBoxChecked] = useDraftState("hw58-cr-box-checked", false);

  const [morning, setMorning] = useDraftState<Record<string, string>>("hw58-cr-morning", {});
  const [morningChecked, setMorningChecked] = useDraftState(
    "hw58-cr-morning-checked",
    false,
  );
  const [morningTrue, setMorningTrue] = useDraftState<Record<string, boolean>>(
    "hw58-cr-morning-true",
    {},
  );

  const [phrases, setPhrases] = useDraftState<Record<string, string>>("hw58-cr-phrases", {});
  const [phrasesChecked, setPhrasesChecked] = useDraftState(
    "hw58-cr-phrases-checked",
    false,
  );

  const [questions, setQuestions] = useDraftState<Record<string, string>>(
    "hw58-cr-questions",
    {},
  );
  const [questionsChecked, setQuestionsChecked] = useDraftState(
    "hw58-cr-questions-checked",
    false,
  );
  const [ownAnswers, setOwnAnswers] = useDraftState<Record<string, string>>(
    "hw58-cr-own",
    {},
  );

  const [reflect, setReflect] = useDraftState<string[]>(
    "hw58-cr-reflect",
    Array(reflectStatements58.length).fill(""),
  );

  const verbScore = aboutYouVerbs.filter((item) =>
    matchesAnyAnswer(verbs[item.id] ?? "", [...item.answers]),
  ).length;
  const schoolScore = schoolPastGaps.filter((item) =>
    matchesAnyAnswer(school[item.id] ?? "", [...item.answers]),
  ).length;
  const foundSet = new Set(found);
  const boxScore = verbBoxGaps.filter((item) => (box[item.id] ?? "") === item.answer).length;
  const morningScore = morningGaps.filter((item) =>
    matchesAnyAnswer(morning[item.id] ?? "", [...item.answers]),
  ).length;
  const phraseScore = infinitiveGaps.filter((item) =>
    matchesAnyAnswer(phrases[item.id] ?? "", [...item.answers]),
  ).length;
  const questionScore = holidayQuestionGaps.filter((item) =>
    matchesAnyAnswer(questions[item.id] ?? "", [...item.answers]),
  ).length;
  const reflectDone = reflect.every((value) => value !== "");

  const preview =
    wsFirst && wsHover ? cellsBetween(wsFirst[0], wsFirst[1], wsHover[0], wsHover[1]) : null;

  function onCell(row: number, col: number) {
    if (!wsFirst) {
      setWsFirst([row, col]);
      setWsHover([row, col]);
      return;
    }
    if (wsFirst[0] === row && wsFirst[1] === col) {
      setWsFirst(null);
      setWsHover(null);
      return;
    }
    const path = cellsBetween(wsFirst[0], wsFirst[1], row, col);
    if (!path) {
      setWsFirst([row, col]);
      setWsHover([row, col]);
      return;
    }
    const word = matchWord(path);
    if (word) {
      setFound((prev) => (prev.includes(word) ? prev : [...prev, word]));
      setWsFirst(null);
      setWsHover(null);
      return;
    }
    setWsFirst([row, col]);
    setWsHover([row, col]);
  }

  return (
    <>
      <section id="hw58-cr" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Check and reflect</p>
          <h2>Unit 8</h2>
          <p className="lead">
            Кожен блок нижче надсилається своєю кнопкою. Відповіді лишаються в
            цьому браузері.
          </p>
        </div>
      </section>

      <section id="hw58-cr-you" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">1a · 1b</p>
          <h2>Complete the sentences with the correct verbs</h2>
          <p className="lead">
            Напиши дієслово. Познач речення, які правдиві для тебе, і скажи їх
            учителю.
          </p>
        </div>
        <ol className="hw57-translate">
          {aboutYouVerbs.map((item, index) => {
            const value = verbs[item.id] ?? "";
            return (
              <li key={item.id}>
                <span>
                  {index + 1}. {item.before}
                </span>
                <input
                  className={gapInputClass(
                    verbsChecked,
                    value,
                    matchesAnyAnswer(value, [...item.answers]),
                  )}
                  value={value}
                  onChange={(event) => {
                    setVerbsChecked(false);
                    setVerbs((prev) => ({ ...prev, [item.id]: event.target.value }));
                  }}
                  aria-label={`Verb ${index + 1}`}
                  autoComplete="off"
                />
                <span>{item.after}</span>
                <label>
                  <input
                    type="checkbox"
                    checked={Boolean(trueForMe[item.id])}
                    onChange={(event) =>
                      setTrueForMe((prev) => ({
                        ...prev,
                        [item.id]: event.target.checked,
                      }))
                    }
                  />{" "}
                  true for me
                </label>
                {verbsChecked &&
                value.trim() &&
                !matchesAnyAnswer(value, [...item.answers]) ? (
                  <p className="hw57-key">{item.answers[0]}</p>
                ) : null}
              </li>
            );
          })}
        </ol>
        <CheckBar
          checked={verbsChecked}
          score={verbScore}
          total={aboutYouVerbs.length}
          onCheck={() => setVerbsChecked(true)}
          onReset={() => setVerbsChecked(false)}
        />
        <HwBlockSubmit
          lessonId="58"
          blockTitle="1 About you"
          checked={verbsChecked}
          score={verbScore}
          total={aboutYouVerbs.length}
          lines={aboutYouVerbs.map((item, index) => {
            const value = (verbs[item.id] ?? "").trim();
            const ticked = Boolean(trueForMe[item.id]);
            if (!value && !ticked) return "";
            return `${index + 1}. ${item.before} ${value || "____"} ${item.after} — ${ticked ? "true for me" : "not ticked"}`;
          })}
        />
      </section>

      <section id="hw58-cr-school" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">2</p>
          <h2>Complete the text with the past simple</h2>
          <p className="lead">
            My school was near my house. I <strong>walked</strong> (walk) to
            school.
          </p>
        </div>
        <ol className="hw57-translate">
          {schoolPastGaps.map((item, index) => {
            const value = school[item.id] ?? "";
            const ok = matchesAnyAnswer(value, [...item.answers]);
            return (
              <li key={item.id}>
                <span>
                  {index + 2}. {item.before}
                </span>
                <input
                  className={gapInputClass(schoolChecked, value, ok)}
                  value={value}
                  onChange={(event) => {
                    setSchoolChecked(false);
                    setSchool((prev) => ({ ...prev, [item.id]: event.target.value }));
                  }}
                  aria-label={`Past form ${index + 2}`}
                  autoComplete="off"
                />
                <span>{item.after}</span>
                {schoolChecked && value.trim() && !ok ? (
                  <p className="hw57-key">{item.answers[0]}</p>
                ) : null}
              </li>
            );
          })}
        </ol>
        <CheckBar
          checked={schoolChecked}
          score={schoolScore}
          total={schoolPastGaps.length}
          onCheck={() => setSchoolChecked(true)}
          onReset={() => setSchoolChecked(false)}
        />
        <HwBlockSubmit
          lessonId="58"
          blockTitle="2 My school"
          checked={schoolChecked}
          score={schoolScore}
          total={schoolPastGaps.length}
          lines={[
            "I walked (walk) to school.",
            ...schoolPastGaps.map((item, index) => {
              const value = (school[item.id] ?? "").trim();
              return value
                ? `${index + 2}. ${item.before} ${value} ${item.after}`
                : "";
            }),
          ]}
        />
      </section>

      <section id="hw58-cr-search" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">3</p>
          <h2>Find the twelve irregular verbs</h2>
          <p className="lead">
            Натисни першу і останню літеру слова. <strong>ate</strong> уже
            знайдено.
          </p>
        </div>
        <div className="l25-ws-wrap" onMouseLeave={() => setWsHover(null)}>
          <div className="l25-ws-grid" style={{ userSelect: "none" }}>
            {irregularGrid.map((row, rowIndex) =>
              row.split("").map((letter, colIndex) => {
                const foundWord = irregularWords.find(
                  (item) =>
                    foundSet.has(item.word) &&
                    item.cells.some(([r, c]) => r === rowIndex && c === colIndex),
                );
                const colorIndex = foundWord
                  ? irregularWords.findIndex((item) => item.word === foundWord.word)
                  : -1;
                const inPreview = preview?.some(
                  ([r, c]) => r === rowIndex && c === colIndex,
                );
                const isFirst = wsFirst?.[0] === rowIndex && wsFirst?.[1] === colIndex;
                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`l25-ws-cell${
                      foundWord ? "" : inPreview ? " l25-ws-sel" : isFirst ? " l25-ws-first" : ""
                    }`}
                    style={
                      foundWord
                        ? { background: WS_COLORS[colorIndex % WS_COLORS.length] }
                        : undefined
                    }
                    onClick={() => onCell(rowIndex, colIndex)}
                    onMouseEnter={() => {
                      if (wsFirst) setWsHover([rowIndex, colIndex]);
                    }}
                  >
                    {letter}
                  </div>
                );
              }),
            )}
          </div>
        </div>
        <div className="l25-ws-legend">
          {irregularWords.map((item) => (
            <span
              key={item.word}
              className={`l25-ws-tag${foundSet.has(item.word) ? " l25-ws-tag--found" : ""}`}
            >
              {foundSet.has(item.word) ? "✓ " : ""}
              {item.word}
            </span>
          ))}
        </div>
        {foundSet.size === irregularWords.length ? (
          <p className="l25-ws-success">Усі 12 дієслів знайдено.</p>
        ) : null}
        <HwBlockSubmit
          lessonId="58"
          blockTitle="3 Wordsearch"
          checked={foundSet.size === irregularWords.length}
          score={foundSet.size}
          total={irregularWords.length}
          lines={irregularWords.map((item) =>
            foundSet.has(item.word) ? item.word : "",
          )}
        />
      </section>

      <section id="hw58-cr-box" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">4</p>
          <h2>Complete the sentences with the verbs in the box</h2>
          <p className="lead">{verbBox.join(" · ")}</p>
        </div>
        <ol className="hw57-translate">
          {verbBoxGaps.map((item, index) => {
            const value = box[item.id] ?? "";
            return (
              <li key={item.id}>
                <span>
                  {index + 1}. {item.before}
                </span>
                <select
                  className={drillSelClass(boxChecked, value, item.answer)}
                  value={value}
                  onChange={(event) => {
                    setBoxChecked(false);
                    setBox((prev) => ({ ...prev, [item.id]: event.target.value }));
                  }}
                  aria-label={`Verb ${index + 1}`}
                >
                  <option value="">—</option>
                  {verbBox.map((verb) => (
                    <option key={verb} value={verb}>
                      {verb}
                    </option>
                  ))}
                </select>
                <span>{item.after}</span>
              </li>
            );
          })}
        </ol>
        <CheckBar
          checked={boxChecked}
          score={boxScore}
          total={verbBoxGaps.length}
          onCheck={() => setBoxChecked(true)}
          onReset={() => setBoxChecked(false)}
        />
        <HwBlockSubmit
          lessonId="58"
          blockTitle="4 Verbs in the box"
          checked={boxChecked}
          score={boxScore}
          total={verbBoxGaps.length}
          lines={verbBoxGaps.map((item, index) => {
            const value = (box[item.id] ?? "").trim();
            return value ? `${index + 1}. ${item.before} ${value} ${item.after}` : "";
          })}
        />
      </section>

      <section id="hw58-cr-morning" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">5a · 5b</p>
          <h2>This morning</h2>
          <p className="lead">
            1. I <strong>got up</strong> (get up) at 7.30. Потім познач речення,
            які правдиві для тебе.
          </p>
        </div>
        <ol className="hw57-translate">
          {morningGaps.map((item, index) => {
            const value = morning[item.id] ?? "";
            const ok = matchesAnyAnswer(value, [...item.answers]);
            return (
              <li key={item.id}>
                <span>
                  {index + 2}. {item.before}
                </span>
                <input
                  className={gapInputClass(morningChecked, value, ok)}
                  value={value}
                  onChange={(event) => {
                    setMorningChecked(false);
                    setMorning((prev) => ({ ...prev, [item.id]: event.target.value }));
                  }}
                  aria-label={`Morning ${index + 2}`}
                  autoComplete="off"
                />
                <span>{item.after}</span>
                {morningChecked && value.trim() && !ok ? (
                  <p className="hw57-key">{item.answers[0]}</p>
                ) : null}
              </li>
            );
          })}
        </ol>
        <div className="hw35-reflect-list">
          {morningTicks.map((item) => (
            <label key={item.id} className="hw35-reflect-row">
              <span>{item.label}</span>
              <input
                type="checkbox"
                checked={Boolean(morningTrue[item.id])}
                onChange={(event) =>
                  setMorningTrue((prev) => ({
                    ...prev,
                    [item.id]: event.target.checked,
                  }))
                }
                aria-label={`${item.label} true for me`}
              />
            </label>
          ))}
        </div>
        <CheckBar
          checked={morningChecked}
          score={morningScore}
          total={morningGaps.length}
          onCheck={() => setMorningChecked(true)}
          onReset={() => setMorningChecked(false)}
        />
        <HwBlockSubmit
          lessonId="58"
          blockTitle="5 This morning"
          checked={morningChecked}
          score={morningScore}
          total={morningGaps.length}
          lines={[
            "1. I got up at 7.30.",
            ...morningGaps.map((item, index) => {
              const value = (morning[item.id] ?? "").trim();
              return value ? `${index + 2}. ${item.before} ${value} ${item.after}` : "";
            }),
            ...morningTicks
              .filter((item) => morningTrue[item.id])
              .map((item) => `true: ${item.label}`),
          ]}
        />
      </section>

      <section id="hw58-cr-phrases" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">6</p>
          <h2>Complete the phrases with infinitive verbs</h2>
        </div>
        <ol className="hw57-translate">
          {infinitiveGaps.map((item, index) => {
            const value = phrases[item.id] ?? "";
            const ok = matchesAnyAnswer(value, [...item.answers]);
            return (
              <li key={item.id}>
                <span>{index + 1}.</span>
                <input
                  className={gapInputClass(phrasesChecked, value, ok)}
                  value={value}
                  onChange={(event) => {
                    setPhrasesChecked(false);
                    setPhrases((prev) => ({ ...prev, [item.id]: event.target.value }));
                  }}
                  aria-label={`Phrase ${index + 1}`}
                  autoComplete="off"
                />
                <span>{item.after}</span>
                {phrasesChecked && value.trim() && !ok ? (
                  <p className="hw57-key">{item.answers[0]}</p>
                ) : null}
              </li>
            );
          })}
        </ol>
        <CheckBar
          checked={phrasesChecked}
          score={phraseScore}
          total={infinitiveGaps.length}
          onCheck={() => setPhrasesChecked(true)}
          onReset={() => setPhrasesChecked(false)}
        />
        <HwBlockSubmit
          lessonId="58"
          blockTitle="6 Infinitives"
          checked={phrasesChecked}
          score={phraseScore}
          total={infinitiveGaps.length}
          lines={infinitiveGaps.map((item, index) => {
            const value = (phrases[item.id] ?? "").trim();
            return value ? `${index + 1}. ${value} ${item.after}` : "";
          })}
        />
      </section>

      <section id="hw58-cr-questions" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">7a · 7b</p>
          <h2>Read the answers and complete the questions</h2>
          <p className="lead">
            1. Q: What time <strong>did you get up</strong> this morning? A: I
            got up at 7.30. Потім напиши свої відповіді і постав питання
            учителю.
          </p>
        </div>
        <ol className="hw57-translate">
          {holidayQuestionGaps.map((item, index) => {
            const value = questions[item.id] ?? "";
            const ok = matchesAnyAnswer(value, [...item.answers]);
            return (
              <li key={item.id}>
                <span>
                  {index + 2}. {item.before}
                </span>
                <input
                  className={gapInputClass(questionsChecked, value, ok)}
                  value={value}
                  onChange={(event) => {
                    setQuestionsChecked(false);
                    setQuestions((prev) => ({
                      ...prev,
                      [item.id]: event.target.value,
                    }));
                  }}
                  aria-label={`Question ${index + 2}`}
                  autoComplete="off"
                />
                <span>{item.after}</span>
                <p className="l22-muted">A: {item.reply}</p>
                {questionsChecked && value.trim() && !ok ? (
                  <p className="hw57-key">{item.answers[0]}</p>
                ) : null}
              </li>
            );
          })}
        </ol>
        <h3 className="l22-listen-subtitle">Your answers</h3>
        <ol className="hw57-translate">
          {ownAnswerPrompts.map((item, index) => (
            <li key={item.id}>
              <span>
                {index + 1}. {item.prompt}
              </span>
              <input
                value={ownAnswers[item.id] ?? ""}
                onChange={(event) =>
                  setOwnAnswers((prev) => ({ ...prev, [item.id]: event.target.value }))
                }
                aria-label={`Your answer ${index + 1}`}
                autoComplete="off"
              />
            </li>
          ))}
        </ol>
        <CheckBar
          checked={questionsChecked}
          score={questionScore}
          total={holidayQuestionGaps.length}
          onCheck={() => setQuestionsChecked(true)}
          onReset={() => setQuestionsChecked(false)}
        />
        <HwBlockSubmit
          lessonId="58"
          blockTitle="7 Questions"
          checked={questionsChecked}
          score={questionScore}
          total={holidayQuestionGaps.length}
          lines={[
            "1. What time did you get up this morning?",
            ...holidayQuestionGaps.map((item, index) => {
              const value = (questions[item.id] ?? "").trim();
              return value
                ? `${index + 2}. ${item.before} ${value} ${item.after}`
                : "";
            }),
            ...ownAnswerPrompts.map((item, index) => {
              const value = (ownAnswers[item.id] ?? "").trim();
              return value ? `My answer ${index + 1}. ${item.prompt} — ${value}` : "";
            }),
          ]}
        />
      </section>

      <section id="hw58-cr-reflect" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Reflect</p>
          <h2>How confident do you feel? (1–5)</h2>
          <p className="lead">1 = not very confident, 5 = very confident.</p>
        </div>
        <div className="hw35-reflect-list">
          {reflectStatements58.map((statement, index) => (
            <label key={statement} className="hw35-reflect-row">
              <span>{statement}</span>
              <select
                className="l25-cr-sel"
                value={reflect[index] ?? ""}
                onChange={(event) => {
                  const next = [...reflect];
                  next[index] = event.target.value;
                  setReflect(next);
                }}
              >
                <option value="">–</option>
                {[1, 2, 3, 4, 5].map((value) => (
                  <option key={value} value={String(value)}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>
        <HwBlockSubmit
          lessonId="58"
          blockTitle="Reflect"
          checked={reflectDone}
          lines={reflectStatements58.map((statement, index) => {
            const value = (reflect[index] ?? "").trim();
            return value ? `${statement}: ${value}` : "";
          })}
        />
      </section>
    </>
  );
}
