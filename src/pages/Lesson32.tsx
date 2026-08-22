import { useState } from "react";
import { Link } from "react-router-dom";
import LessonNumberKicker from "../components/LessonNumberKicker";
import {
  beOrDoDrill,
  beChartRows,
  coreQuestions,
  doChartRows,
  doDoesPairs,
  exitChecks,
  fixWhLines,
  howAdjExamples,
  interviewGrid,
  matchAnswerQ,
  qBuilderExamples,
  qBuilderRows,
  qBuilderVerbs,
  qBuilderWh,
  questionWordCards,
  qwasiExamples,
  scrambleQs,
  speakPrompts,
  wasWereDrill,
  wasWereExamples,
  wasWereMatch,
  wasWereScramble,
  wasWereSpeakPrompts,
  whatNounExamples,
  whWords,
  yesNoExamples,
} from "../data/lesson32";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
import "../styles/lesson26.css";
import "../styles/lesson32.css";

type DrillItem = {
  prompt?: string;
  scramble?: string;
  answer?: string;
  options: readonly string[];
  correct?: string;
};

function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/['']/g, "'")
    .replace(/[?.!,]+$/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function isFixOk(value: string, answers: readonly string[]): boolean {
  const n = normalize(value);
  return answers.some((a) => normalize(a) === n);
}

function selClass(checked: boolean, value: string, answer: string): string {
  if (!checked || !value) return "l26-drill-select";
  return value === answer
    ? "l26-drill-select is-ok"
    : "l26-drill-select is-err";
}

function SelectDrill({
  items,
  answers,
  setAnswers,
  checked,
  setChecked,
  getPrompt,
  getAnswer,
}: {
  items: readonly DrillItem[];
  answers: string[];
  setAnswers: (next: string[]) => void;
  checked: boolean;
  setChecked: (v: boolean) => void;
  getPrompt: (d: DrillItem, i: number) => string;
  getAnswer: (d: DrillItem) => string;
}) {
  const score = items.filter((d, i) => answers[i] === getAnswer(d)).length;
  return (
    <>
      <div className="l26-drill-list">
        {items.map((d, i) => {
          const prompt = getPrompt(d, i);
          const answer = getAnswer(d);
          return (
            <div key={`${prompt}-${i}`} className="l26-drill-row">
              <strong className="l26-drill-prompt">{prompt}</strong>
              <span className="l26-drill-arrow" aria-hidden="true">
                →
              </span>
              <select
                value={answers[i]}
                onChange={(e) => {
                  setChecked(false);
                  const next = [...answers];
                  next[i] = e.target.value;
                  setAnswers(next);
                }}
                className={selClass(checked, answers[i], answer)}
                aria-label={prompt}
              >
                <option value="">___</option>
                {d.options.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>
          );
        })}
      </div>
      <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
        <button
          type="button"
          className="l22-check-btn"
          onClick={() => setChecked(true)}
        >
          Check
        </button>
        {checked && (
          <span className="l22-score">
            {score} / {items.length}
          </span>
        )}
        <button
          type="button"
          className="l25-cr-mini-btn"
          onClick={() => {
            setAnswers(Array(items.length).fill(""));
            setChecked(false);
          }}
        >
          Reset
        </button>
      </div>
    </>
  );
}

export default function Lesson32() {
  const [beDoAns, setBeDoAns] = useState(() =>
    Array(beOrDoDrill.length).fill(""),
  );
  const [beDoChecked, setBeDoChecked] = useState(false);
  const [scrambleAns, setScrambleAns] = useState(() =>
    Array(scrambleQs.length).fill(""),
  );
  const [scrambleChecked, setScrambleChecked] = useState(false);
  const [matchAns, setMatchAns] = useState(() =>
    Array(matchAnswerQ.length).fill(""),
  );
  const [matchChecked, setMatchChecked] = useState(false);
  const [fixAns, setFixAns] = useState<Record<string, string>>(() =>
    Object.fromEntries(fixWhLines.map((l) => [l.id, l.wrong])),
  );
  const [fixChecked, setFixChecked] = useState(false);
  const [fixShow, setFixShow] = useState(false);

  const [wwAns, setWwAns] = useState(() =>
    Array(wasWereDrill.length).fill(""),
  );
  const [wwChecked, setWwChecked] = useState(false);
  const [wwScrambleAns, setWwScrambleAns] = useState(() =>
    Array(wasWereScramble.length).fill(""),
  );
  const [wwScrambleChecked, setWwScrambleChecked] = useState(false);
  const [wwMatchAns, setWwMatchAns] = useState(() =>
    Array(wasWereMatch.length).fill(""),
  );
  const [wwMatchChecked, setWwMatchChecked] = useState(false);

  const fixScore = fixWhLines.filter((l) =>
    isFixOk(fixAns[l.id] ?? "", l.answers),
  ).length;






  return (
    <div className="lesson22-page">
      <section className="lesson22-hero panel">
        <div className="lesson22-hero-top">
          <div>
            <LessonNumberKicker number={32} />
            <h1>WH-questions · was / were</h1>
            <p className="lesson22-topic-pill">
              Who · What · Where · When · Why · How often · do / does / to be ·
              was / were
            </p>
            <p className="lesson22-subtitle">
              Частина 1: WH-питання з <strong>to be</strong> або{" "}
              <strong>do / does</strong>. Частина 2: минулий час{" "}
              <strong>to be</strong> — <strong>was / were</strong>.
            </p>

          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <Link className="lesson22-back-link" to="/lessons">
              ← Back to lessons
            </Link>
            <Link
              className="lesson22-back-link lesson22-back-link--ghost"
              to="/lesson-31"
            >
              ← Lesson 31
            </Link>
            <Link
              className="lesson22-back-link lesson22-back-link--ghost"
              to="/lesson-33"
            >
              Lesson 33 →
            </Link>
            <Link
              className="lesson22-back-link lesson22-back-link--ghost"
              to="/vocab"
            >
              Vocab →
            </Link>
          </div>
        </div>
        <div className="lesson22-hero-chips">
          <span>Who is he?</span>
          <span>What does she do?</span>
          <span>I was tired yesterday.</span>
          <span>Where were you yesterday?</span>
        </div>
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-flow">
          <a href="#l32-rules">Правила</a>
          <a href="#l32-core">1 WH core</a>
          <a href="#l32-rule">2 WH rule</a>
          <a href="#l32-practice">3 WH practice</a>
          <a href="#l32-fix">4 Fix</a>
          <a href="#l32-speak">5 WH speaking</a>
          <a href="#l32-was">6 Was/were</a>
          <a href="#l32-was-practice">7 Practice</a>
          <a href="#l32-was-speak">8 Speaking</a>
          <a href="#l32-exit">Exit</a>
        </div>
      </section>

      {/* ── Правила · порядок слів у питаннях ───────────────── */}
      <section id="l32-rules" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Start here · Правила</p>
          <h2>Порядок слів у питаннях Present Simple</h2>
          <p className="lesson22-section-desc">
            Формула <strong>QWASI</strong> і дві схеми: питання з{" "}
            <strong>be</strong> та з <strong>do / does</strong>.
          </p>
        </div>

        <div className="l32r-stack">
          <div>
            <p className="l32r-lead">
              Порядок слів в англійському питанні в Present Simple —{" "}
              <strong>QWASI</strong>:{" "}
              <strong>(питальне слово)</strong> +{" "}
              <strong>допоміжне дієслово</strong> + <strong>підмет</strong> +{" "}
              <strong>інфінітив</strong>.
            </p>
            <div className="l32r-formula" aria-label="Формула QWASI">
              <span className="l32r-chip l32r-qw">
                <b>Q</b>
                <small>питальне слово</small>
              </span>
              <span className="l32r-chip l32r-aux">
                <b>A</b>
                <small>допоміжне</small>
              </span>
              <span className="l32r-chip l32r-subj">
                <b>S</b>
                <small>підмет</small>
              </span>
              <span className="l32r-chip l32r-tail">
                <b>I</b>
                <small>інфінітив</small>
              </span>
            </div>
            <div className="l32r-ex">
              {qwasiExamples.map((q) => (
                <p key={q}>{q}</p>
              ))}
            </div>
          </div>

          <div>
            <p className="l32r-lead">
              У <strong>так / ні</strong> питаннях (загальних){" "}
              <strong>немає</strong> питального слова — починаємо з do / does.
            </p>
            <div className="l32r-ex">
              {yesNoExamples.map((q) => (
                <p key={q}>{q}</p>
              ))}
            </div>
          </div>

          <div className="l32r-chart-box">
            <p className="l32r-chart-title">
              Present Simple questions ·{" "}
              <span>питання з be</span>
            </p>
            <div className="l32r-chart" role="table" aria-label="Питання з be">
              <div className="l32r-chart-head" role="row">
                <span className="l32r-col l32r-qw">Питальне слово</span>
                <span className="l32r-col l32r-aux">Допоміжне be</span>
                <span className="l32r-col l32r-subj">Підмет</span>
                <span className="l32r-col l32r-tail">Прикм. · іменник тощо</span>
              </div>
              {beChartRows.map((row) => (
                <div
                  key={`${row.aux}-${row.subject}-${row.tail}`}
                  className="l32r-row"
                  role="row"
                >
                  <span
                    className={`l32r-cell l32r-qw${row.qw ? "" : " is-empty"}`}
                    data-label="Питальне"
                  >
                    {row.qw || "—"}
                  </span>
                  <span className="l32r-cell l32r-aux" data-label="Be">
                    {row.aux}
                  </span>
                  <span className="l32r-cell l32r-subj" data-label="Підмет">
                    {row.subject}
                  </span>
                  <span
                    className={`l32r-cell l32r-tail${row.tail ? "" : " is-empty"}`}
                    data-label="Далі"
                  >
                    {row.tail || "—"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="l32r-chart-box">
            <p className="l32r-chart-title">
              Present Simple questions ·{" "}
              <span>питання з do</span>
            </p>
            <div className="l32r-chart" role="table" aria-label="Питання з do">
              <div className="l32r-chart-head" role="row">
                <span className="l32r-col l32r-qw">Питальне слово</span>
                <span className="l32r-col l32r-aux">Допоміжне дієслово</span>
                <span className="l32r-col l32r-subj">Підмет</span>
                <span className="l32r-col l32r-tail">Інфінітив</span>
              </div>
              {doChartRows.map((row) => (
                <div
                  key={`${row.aux}-${row.subject}-${row.tail}`}
                  className="l32r-row"
                  role="row"
                >
                  <span
                    className={`l32r-cell l32r-qw${row.qw ? "" : " is-empty"}`}
                    data-label="Питальне"
                  >
                    {row.qw || "—"}
                  </span>
                  <span className="l32r-cell l32r-aux" data-label="Do/does">
                    {row.aux}
                  </span>
                  <span className="l32r-cell l32r-subj" data-label="Підмет">
                    {row.subject}
                  </span>
                  <span className="l32r-cell l32r-tail" data-label="Інфінітив">
                    {row.tail}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="l32q-box">
            <p className="l32r-chart-title">
              Збери питання · <span>крок за кроком</span>
            </p>
            <div className="l32q-table">
              <span className="l32q-head l32r-qw">
                Wh-питання
                <small>wh- question</small>
              </span>
              <span className="l32q-head l32r-aux">
                Допоміжне
                <small>helping verb</small>
              </span>
              <span className="l32q-head l32r-subj">
                Підмет
                <small>subject</small>
              </span>
              <span className="l32q-head l32r-tail">
                Основне дієслово
                <small>main verb</small>
              </span>
              <span className="l32q-head l32r-c4">?</span>

              <div
                className="l32q-cell l32q-cell--wh l32r-qw"
                data-label="Wh-питання"
              >
                {qBuilderWh.map((w) => (
                  <span key={w}>{w}</span>
                ))}
              </div>

              {qBuilderRows.map((row, i) => (
                <div
                  key={`aux-${row.aux}${row.auxTail}-${i}`}
                  className={`l32q-cell l32q-cell--aux l32q-r${i + 1} l32r-aux`}
                  data-label="Допоміжне"
                >
                  <span>
                    {row.aux}
                    {row.auxTail && (
                      <span className="l32q-hl">{row.auxTail}</span>
                    )}
                  </span>
                </div>
              ))}

              {qBuilderRows.map((row, i) => (
                <div
                  key={`subj-${row.subjects.join("-")}`}
                  className={`l32q-cell l32q-cell--subj l32q-r${i + 1} l32r-subj`}
                  data-label="Підмет"
                >
                  {row.subjects.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
              ))}

              <div
                className="l32q-cell l32q-cell--main l32r-tail"
                data-label="Основне дієслово"
              >
                {qBuilderVerbs.map((v) => (
                  <span key={v}>{v}</span>
                ))}
              </div>

              <div
                className="l32q-cell l32q-cell--q l32r-c4"
                data-label="Знак питання"
                aria-hidden="true"
              >
                ?
              </div>
            </div>

            <div className="l32q-examples">
              <span className="l32q-examples-label">Приклади</span>
              <ul>
                {qBuilderExamples.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </div>

            <p className="l32r-note" style={{ marginTop: "0.85rem" }}>
              Читай зліва направо: береш слово з кожної колонки — і питання
              готове. <strong>Do</strong> для <strong>I / you / we / they</strong>,{" "}
              <strong>Does</strong> для <strong>he / she / it</strong>. Основне
              дієслово завжди в початковій формі.
            </p>
          </div>

          <div>
            <h3 className="l32r-sub">
              Питання з <em>am / is / are</em>
            </h3>
            <p className="l32r-note">
              Коли основне дієслово — <strong>be</strong>, ми ставимо{" "}
              <strong>am / is / are</strong> як допоміжне{" "}
              <strong>перед</strong> підметом. Порядок тоді{" "}
              <strong>QWAS</strong>: (питальне слово) + am/is/are + підмет.
              Інфінітива немає.
            </p>
          </div>

          <div>
            <h3 className="l32r-sub">
              Питання з <em>do / does</em>
            </h3>
            <p className="l32r-lead">
              Якщо дієслово <strong>не</strong> be — беремо{" "}
              <strong>do / does</strong>.{" "}
              <strong>does</strong> з <strong>he / she / it</strong>,{" "}
              <strong>do</strong> з <strong>I / you / we / they</strong>. Після
              підмета — основне дієслово в{" "}
              <strong>початковій формі</strong> (без{" "}
              <strong>-s / -es</strong>).
            </p>
            <div className="l32r-vs">
              {doDoesPairs.map((pair) => (
                <div key={pair.ok} style={{ display: "contents" }}>
                  <div className="l32r-vs-item is-ok">
                    <span className="l32r-vs-mark" aria-hidden="true">
                      ✓
                    </span>
                    <span>{pair.ok}</span>
                  </div>
                  <div className="l32r-vs-item is-err">
                    <span className="l32r-vs-mark" aria-hidden="true">
                      ✗
                    </span>
                    <span>{pair.err}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="l32r-sub">Питальні слова · граматична таблиця</h3>
            <div className="l32r-qw-grid">
              {questionWordCards.map((card, i) => (
                <article
                  key={card.word}
                  className={`l32r-qw-card l32r-c${(i % 4) + 1}`}
                >
                  <div className="l32r-qw-top">
                    <span className="l32r-qw-word">{card.word}</span>
                    <span className="l32r-qw-tag">{card.cat}</span>
                  </div>
                  <span className="l32r-qw-ua">{card.ua}</span>
                  <p className="l32r-qw-qa">
                    <b>A:</b> {card.q}
                    <br />
                    <b>B:</b> {card.a}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="l32r-pair-grid">
            <div className="l32r-pair-card l32r-c1">
              <h3>What + іменник</h3>
              <p>
                Часто ставимо <strong>what + іменник</strong>: what time, what
                colour, what size…
              </p>
              <ul className="l32r-pair-list">
                {whatNounExamples.map((item) => (
                  <li key={item.q}>
                    <b>{item.hl}</b>
                    {item.q.slice(item.hl.length)}
                  </li>
                ))}
              </ul>
            </div>
            <div className="l32r-pair-card l32r-c2">
              <h3>How + прикметник / прислівник</h3>
              <p>
                Також <strong>how + adj / adv</strong>: how often, how old, how
                tall…
              </p>
              <ul className="l32r-pair-list">
                {howAdjExamples.map((item) => (
                  <li key={item.q}>
                    <b>{item.hl}</b>
                    {item.q.slice(item.hl.length)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Part 1 · WH-questions ─────────────────────────────── */}
      <section id="l32-core" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Part 1 · Start here</p>
          <h2>WH-questions</h2>
          <p className="lesson22-section-desc">
            WH-questions + <strong>do / does / to be</strong> — не новий час.
          </p>
        </div>

        <div className="l32-core-list">
          {coreQuestions.map((item) => (
            <div key={item.q} className="l32-core-item">
              <p className="l32-core-q">{item.q}</p>
              <span className="l32-core-tag">
                {item.kind === "be" ? "to be" : "do / does"}
              </span>
              <p className="l32-core-a">{item.a}</p>
            </div>
          ))}
        </div>

        <div className="l22-vocab-grid" style={{ marginTop: "1.25rem" }}>
          {whWords.map((w) => (
            <div key={w.en} className="l22-vocab-card" style={{ cursor: "default" }}>
              <strong>{w.en}</strong>
              <span style={{ color: "var(--color-text-muted)" }}>{w.ua}</span>
              <span style={{ fontSize: "0.85rem" }}>{w.example}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="l32-rule" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Part 1 · Grammar</p>
          <h2>to be · або · do / does</h2>
        </div>
        <div className="l32-rule-grid">
          <div className="l32-rule-card">
            <h3>to be</h3>
            <p>
              <code>Who / What / Where + am / is / are …?</code>
              <br />
              Who <strong>is</strong> he?
              <br />
              What <strong>is</strong> your job?
              <br />
              Where <strong>are</strong> you?
            </p>
          </div>
          <div className="l32-rule-card">
            <h3>do / does + verb</h3>
            <p>
              <code>WH + do/does + subject + verb …?</code>
              <br />
              What <strong>does</strong> she <strong>do</strong>?
              <br />
              Where <strong>does</strong> he <strong>live</strong>?
              <br />
              Why <strong>do</strong> you <strong>study</strong> English?
              <br />
              How often <strong>do</strong> you <strong>work</strong>?
            </p>
          </div>
        </div>
        <p className="lesson22-section-desc" style={{ marginTop: "1rem" }}>
          <strong>he / she / it</strong> → <em>does</em> + інфінітив (do, live,
          start). <strong>I / you / we / they</strong> → <em>do</em> + інфінітив.
        </p>
      </section>

      <section id="l32-practice" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Part 1 · Practice</p>
          <h2>Choose · order · match</h2>
        </div>

        <h3 className="l22-listen-subtitle">is / do / does</h3>
        <SelectDrill
          items={beOrDoDrill}
          answers={beDoAns}
          setAnswers={setBeDoAns}
          checked={beDoChecked}
          setChecked={setBeDoChecked}
          getPrompt={(d) => d.prompt ?? ""}
          getAnswer={(d) => d.answer ?? ""}
        />

        <h3 className="l22-listen-subtitle">Put the words in order</h3>
        <SelectDrill
          items={scrambleQs}
          answers={scrambleAns}
          setAnswers={setScrambleAns}
          checked={scrambleChecked}
          setChecked={setScrambleChecked}
          getPrompt={(d) => d.scramble ?? ""}
          getAnswer={(d) => d.answer ?? ""}
        />

        <h3 className="l22-listen-subtitle">Match the answer → question</h3>
        <SelectDrill
          items={matchAnswerQ}
          answers={matchAns}
          setAnswers={setMatchAns}
          checked={matchChecked}
          setChecked={setMatchChecked}
          getPrompt={(d) => `Answer: ${d.answer ?? ""}`}
          getAnswer={(d) => d.correct ?? ""}
        />
      </section>

      <section id="l32-fix" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Part 1 · Fix the mistakes</p>
          <h2>Correct the questions</h2>
        </div>
        {fixWhLines.map((line) => {
          const value = fixAns[line.id] ?? "";
          const ok = isFixOk(value, line.answers);
          const showState = fixChecked;
          return (
            <div key={line.id} className="l32-fix-line">
              <label className="l32-fix-wrong" htmlFor={`l32-${line.id}`}>
                {line.wrong}
              </label>
              <input
                id={`l32-${line.id}`}
                type="text"
                className={`l32-fix-input${
                  showState ? (ok ? " is-ok" : " is-err") : ""
                }`}
                value={value}
                onChange={(e) => {
                  setFixChecked(false);
                  setFixAns((prev) => ({ ...prev, [line.id]: e.target.value }));
                }}
                spellCheck={false}
              />
              {fixShow && (
                <div>
                  <span className="l32-fix-tip">{line.tipUa}</span>
                  <div className="l32-fix-answer">✓ {line.answers[0]}</div>
                </div>
              )}
            </div>
          );
        })}
        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setFixChecked(true)}
          >
            Check
          </button>
          {fixChecked && (
            <span className="l22-score">
              {fixScore} / {fixWhLines.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => setFixShow((v) => !v)}
          >
            {fixShow ? "Hide answers" : "Show answers"}
          </button>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setFixAns(
                Object.fromEntries(fixWhLines.map((l) => [l.id, l.wrong])),
              );
              setFixChecked(false);
              setFixShow(false);
            }}
          >
            Reset
          </button>
        </div>
      </section>

      <section id="l32-speak" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Part 1 · Speaking</p>
          <h2>Ask and answer</h2>
          <p className="lesson22-section-desc">
            Став викладачу WH-питання та відповідай на його питання. Використовуй{" "}
            <strong>is/are</strong> або <strong>do/does</strong>.
          </p>
        </div>

        <div className="l32-interview">
          {interviewGrid.map((w) => (
            <div key={w} className="l32-interview-card">
              {w}
            </div>
          ))}
        </div>

        <div className="lesson22-prompt-grid" style={{ marginTop: "1.25rem" }}>
          {speakPrompts.map((p) => (
            <div key={p} className="lesson22-prompt-card">
              {p}
            </div>
          ))}
        </div>

        <blockquote className="l23-rule-quote" style={{ marginTop: "1.25rem" }}>
          <p>
            <strong>Model.</strong> A: Who is he? — B: He&apos;s my brother.
            <br />
            A: What does he do? — B: He&apos;s a driver. / He drives a truck.
            <br />
            A: Where does he live? — B: He lives in Odesa.
            <br />
            A: How often do you work? — B: I work five days a week.
          </p>
        </blockquote>
      </section>

      {/* ── Part 2 · Was / Were ───────────────────────────────── */}
      <section id="l32-was" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Part 2 · Was / were</p>
          <h2>Past of to be</h2>
          <p className="lesson22-section-desc">
            <strong>was / were</strong> — минулий час дієслова{" "}
            <em>to be</em> (am / is / are → was / were).
          </p>
        </div>

        <div className="l32-rule-grid">
          <div className="l32-rule-card">
            <h3>was</h3>
            <p>
              <code>I / he / she / it → was</code>
              <br />
              I <strong>was</strong> tired yesterday.
              <br />
              She <strong>was</strong> at work.
              <br />
              He <strong>was</strong> at the gym.
            </p>
          </div>
          <div className="l32-rule-card">
            <h3>were</h3>
            <p>
              <code>you / we / they → were</code>
              <br />
              You <strong>were</strong> at home.
              <br />
              They <strong>were</strong> at home.
              <br />
              We <strong>were</strong> late last week.
            </p>
          </div>
        </div>

        <h3 className="l22-listen-subtitle">Forms</h3>
        <div className="l32-rule-grid">
          <div className="l32-rule-card">
            <h3>+</h3>
            <p>
              I <strong>was</strong> tired.
              <br />
              They <strong>were</strong> at home.
            </p>
          </div>
          <div className="l32-rule-card">
            <h3>? Yes / No</h3>
            <p>
              <strong>Was</strong> he at the gym?
              <br />
              <strong>Were</strong> you at work?
            </p>
          </div>
        </div>
        <div className="l32-rule-grid" style={{ marginTop: "0.85rem" }}>
          <div className="l32-rule-card">
            <h3>? WH + was / were</h3>
            <p>
              Where <strong>were</strong> you yesterday?
              <br />
              Where <strong>was</strong> she last week?
            </p>
          </div>
          <div className="l32-rule-card">
            <h3>Час</h3>
            <p>
              yesterday · last week · last night
              <br />
              at home · at work · at the gym
            </p>
          </div>
        </div>

        <h3 className="l22-listen-subtitle">Key examples</h3>
        <div className="l32-core-list">
          {wasWereExamples.map((item) => (
            <div key={item.en} className="l32-core-item">
              <p className="l32-core-q">{item.en}</p>
              <span className="l32-core-tag">
                {item.form === "affirmative"
                  ? "+"
                  : item.form === "yesno"
                    ? "Yes/No"
                    : "WH"}
              </span>
              <p className="l32-core-a">{item.ua}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="l32-was-practice" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Part 2 · Practice</p>
          <h2>was / were · order · match</h2>
        </div>

        <h3 className="l22-listen-subtitle">Choose was or were</h3>
        <SelectDrill
          items={wasWereDrill}
          answers={wwAns}
          setAnswers={setWwAns}
          checked={wwChecked}
          setChecked={setWwChecked}
          getPrompt={(d) => d.prompt ?? ""}
          getAnswer={(d) => d.answer ?? ""}
        />

        <h3 className="l22-listen-subtitle">Put the words in order</h3>
        <SelectDrill
          items={wasWereScramble}
          answers={wwScrambleAns}
          setAnswers={setWwScrambleAns}
          checked={wwScrambleChecked}
          setChecked={setWwScrambleChecked}
          getPrompt={(d) => d.scramble ?? ""}
          getAnswer={(d) => d.answer ?? ""}
        />

        <h3 className="l22-listen-subtitle">Match the answer → question</h3>
        <SelectDrill
          items={wasWereMatch}
          answers={wwMatchAns}
          setAnswers={setWwMatchAns}
          checked={wwMatchChecked}
          setChecked={setWwMatchChecked}
          getPrompt={(d) => `Answer: ${d.answer ?? ""}`}
          getAnswer={(d) => d.correct ?? ""}
        />
      </section>

      <section id="l32-was-speak" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Part 2 · Speaking</p>
          <h2>Yesterday · last week</h2>
          <p className="lesson22-section-desc">
            Говори про минуле з <strong>was / were</strong>: at home, at work,
            at the gym, yesterday, last week.
          </p>
        </div>

        <div className="lesson22-prompt-grid">
          {wasWereSpeakPrompts.map((p) => (
            <div key={p} className="lesson22-prompt-card">
              {p}
            </div>
          ))}
        </div>

        <blockquote className="l23-rule-quote" style={{ marginTop: "1.25rem" }}>
          <p>
            <strong>Model.</strong> A: Where were you yesterday? — B: I was at
            home. / I was at work.
            <br />
            A: Was he at the gym? — B: Yes, he was. / No, he wasn&apos;t.
            <br />
            A: Were they at home last week? — B: Yes, they were.
            <br />
            A: I was tired yesterday. — B: Me too. / I wasn&apos;t tired.
          </p>
        </blockquote>
      </section>

      {/* ── Exit ─────────────────────────────────────────────── */}
      <section id="l32-exit" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Exit check</p>
          <h2>Can you…?</h2>
        </div>
        <ul className="l22-goals-list">
          {exitChecks.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        <div className="l25-cr-actions" style={{ marginTop: "1rem" }}>
          <Link className="l22-check-btn" to="/vocab">
            Vocab
          </Link>
          <Link className="l25-cr-mini-btn" to="/trainer">
            Trainer
          </Link>
          <Link className="l25-cr-mini-btn" to="/hw-32">
            HW32 recap
          </Link>
          <Link className="l25-cr-mini-btn" to="/hw-31">
            HW31 crossword
          </Link>
          <Link className="l25-cr-mini-btn" to="/lesson-31">
            ← Lesson 31
          </Link>
          <Link className="l25-cr-mini-btn" to="/lesson-33">
            Lesson 33 →
          </Link>
        </div>
      </section>
    </div>
  );
}
