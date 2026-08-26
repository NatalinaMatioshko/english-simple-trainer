import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  adjGaps,
  chooseAlt,
  classroomQs,
  classroomWordBank,
  fixMistakes,
  placeWords,
  reflectStatements,
  rewriteItems,
  thereBeGaps,
  thereBeOptions,
  wordOrder35,
} from "../data/hw35";
import { HomeworkSubmit } from "../components/HomeworkSubmit";
import WordOrderBoard, {
  initWordOrderRows,
} from "../components/lesson31/WordOrderBoard";
import { drillSelClass } from "../components/lesson31/drillSelClass";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
import "../styles/lesson26.css";
import "../styles/lesson31.css";
import "../styles/lesson35.css";

/** Порівняння вільного тексту: регістр, апострофи, é, крапки, пробіли. */
function normText(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/[\u2018\u2019\u02bc]/g, "'")
    .replace(/é/g, "e")
    .replace(/\s+/g, " ")
    .replace(/[.!]+$/, "");
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

function wordOrderScore(
  items: typeof wordOrder35,
  rows: ReturnType<typeof initWordOrderRows>,
) {
  return items.filter((item, i) => {
    const built = rows[i]?.built ?? [];
    const joined = built
      .join(" ")
      .replace(/\s+\?/g, "?")
      .replace(/\s+\./g, ".")
      .trim();
    return joined === item.answer && (rows[i]?.pool.length ?? 0) === 0;
  }).length;
}

export default function HW35() {
  const [placeAns, setPlaceAns] = useState(() =>
    Array(placeWords.length).fill(""),
  );
  const [placeChecked, setPlaceChecked] = useState(false);

  const [thereAns, setThereAns] = useState(() =>
    thereBeGaps.map((g) => (g.example ? g.answer : "")),
  );
  const [thereChecked, setThereChecked] = useState(false);

  const [fixAns, setFixAns] = useState(() =>
    Array(fixMistakes.length).fill(""),
  );
  const [fixChecked, setFixChecked] = useState(false);

  const [altAns, setAltAns] = useState(() => Array(chooseAlt.length).fill(""));
  const [altChecked, setAltChecked] = useState(false);

  const [classAns, setClassAns] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    for (const q of classroomQs) {
      if (!q.example) continue;
      q.segs.forEach((seg, i) => {
        if (seg.kind === "gap") init[`${q.n}-${i}`] = seg.answer;
      });
    }
    return init;
  });
  const [classChecked, setClassChecked] = useState(false);

  const [adjAns, setAdjAns] = useState(() =>
    adjGaps.map((g) => (g.example ? g.answer : "")),
  );
  const [adjChecked, setAdjChecked] = useState(false);

  const [rewriteAns, setRewriteAns] = useState(() =>
    rewriteItems.map((r) => (r.example ? r.answers[0] : "")),
  );
  const [rewriteChecked, setRewriteChecked] = useState(false);

  const [orderRows, setOrderRows] = useState(() =>
    initWordOrderRows(wordOrder35),
  );
  const [orderChecked, setOrderChecked] = useState(false);

  const [reflect, setReflect] = useState(() =>
    Array(reflectStatements.length).fill(""),
  );
  const [draft, setDraft] = useState("");

  const classGapKeys = useMemo(
    () =>
      classroomQs.flatMap((q) =>
        q.segs.flatMap((seg, i) =>
          seg.kind === "gap"
            ? [{ key: `${q.n}-${i}`, answer: seg.answer }]
            : [],
        ),
      ),
    [],
  );

  const placeScore = placeWords.filter((p, i) =>
    textOk(placeAns[i] ?? "", p.answers),
  ).length;
  const thereScore = thereBeGaps.filter(
    (g, i) => thereAns[i] === g.answer,
  ).length;
  const fixScore = fixMistakes.filter((f, i) =>
    textOk(fixAns[i] ?? "", f.answers),
  ).length;
  const altScore = chooseAlt.filter((a, i) => altAns[i] === a.answer).length;
  const classScore = classGapKeys.filter(
    (g) => normText(classAns[g.key] ?? "") === normText(g.answer),
  ).length;
  const adjScore = adjGaps.filter(
    (g, i) => normText(adjAns[i] ?? "") === g.answer,
  ).length;
  const rewriteScore = rewriteItems.filter((r, i) =>
    textOk(rewriteAns[i] ?? "", r.answers),
  ).length;
  const orderScore = wordOrderScore(wordOrder35, orderRows);

  const checks = useMemo(
    () => ({
      places: placeChecked,
      thereBe: thereChecked,
      mistakes: fixChecked,
      alternatives: altChecked,
      classroom: classChecked,
      adjectives: adjChecked,
      rewrite: rewriteChecked,
      wordOrder: orderChecked,
    }),
    [
      placeChecked,
      thereChecked,
      fixChecked,
      altChecked,
      classChecked,
      adjChecked,
      rewriteChecked,
      orderChecked,
    ],
  );

  const allDone = Object.values(checks).every(Boolean);
  const totalScore =
    placeScore +
    thereScore +
    fixScore +
    altScore +
    classScore +
    adjScore +
    rewriteScore +
    orderScore;
  const totalItems =
    placeWords.length +
    thereBeGaps.length +
    fixMistakes.length +
    chooseAlt.length +
    classGapKeys.length +
    adjGaps.length +
    rewriteItems.length +
    wordOrder35.length;

  return (
    <div className="lesson22-page">
      <section className="lesson22-hero panel">
        <div className="lesson22-hero-top">
          <div>
            <p className="page-kicker">Homework · Lesson 35</p>
            <h1>Check and reflect</h1>
            <p className="lesson22-subtitle">
              Підсумкова перевірка Unit 3: місця в місті, there is / there are,
              кімнати й речі, прикметники та питання.
            </p>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <Link className="lesson22-back-link" to="/lesson-35">
              ← Lesson 35
            </Link>
            <Link className="lesson22-back-link" to="/lessons">
              ← Back to lessons
            </Link>
          </div>
        </div>
        <div className="lesson22-hero-chips">
          <span>Places in town</span>
          <span>there is / there are</span>
          <span>Rooms &amp; things</span>
          <span>Adjectives</span>
          <span>Questions</span>
        </div>
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-flow">
          <a href="#hw35-places">1 Places</a>
          <a href="#hw35-there">2 there is/are</a>
          <a href="#hw35-mistakes">3 Mistakes</a>
          <a href="#hw35-alt">4 Alternatives</a>
          <a href="#hw35-classroom">5 Classroom</a>
          <a href="#hw35-adj">6 Adjectives</a>
          <a href="#hw35-rewrite">7 Rewrite</a>
          <a href="#hw35-order">8 Word order</a>
          <a href="#hw35-reflect">Reflect</a>
        </div>
      </section>

      {/* ── 1 · Places in town ───────────────────────────────── */}
      <section id="hw35-places" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">1a · Vocabulary</p>
          <h2>Complete the places in town</h2>
          <p className="lesson22-section-desc">
            Відгадай слово за буквами й допиши його повністю.
          </p>
        </div>
        <div className="l31-pc-doing-grid">
          {placeWords.map((p, i) => {
            const val = placeAns[i] ?? "";
            const ok = placeChecked && textOk(val, p.answers);
            return (
              <p key={p.n} className="l31-pc-doing-row">
                <strong>{p.n}.</strong>
                <span className="hw35-hint">{p.hint}</span>
                <input
                  type="text"
                  value={val}
                  onChange={(e) => {
                    setPlaceChecked(false);
                    const next = [...placeAns];
                    next[i] = e.target.value;
                    setPlaceAns(next);
                  }}
                  className={inputCls(placeChecked, val, ok)}
                  placeholder="word"
                  aria-label={`Place ${p.n}`}
                />
              </p>
            );
          })}
        </div>
        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setPlaceChecked(true)}
          >
            Check
          </button>
          {placeChecked && (
            <span className="l22-score">
              {placeScore} / {placeWords.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setPlaceAns(placeWords.map((p) => p.answers[0]));
              setPlaceChecked(true);
            }}
          >
            Show answers
          </button>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setPlaceAns(Array(placeWords.length).fill(""));
              setPlaceChecked(false);
            }}
          >
            Reset
          </button>
        </div>
        <p className="l31-ex-line" style={{ marginTop: "1.35rem" }}>
          <strong className="l31-ex-num">1b</strong> Ask your teacher about the
          places in your town.
        </p>
        <blockquote className="l23-rule-quote">
          <p>
            <strong>A:</strong> <em>Is there a bank?</em> · <strong>B:</strong>{" "}
            <em>Yes, there is.</em>
          </p>
        </blockquote>
      </section>

      {/* ── 2 · there is / there are ─────────────────────────── */}
      <section id="hw35-there" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">2 · Grammar</p>
          <h2>is, isn&apos;t, are or aren&apos;t</h2>
          <p className="lesson22-section-desc">
            Обери правильну форму. Використовуй скорочені форми. Речення 1 —
            приклад.
          </p>
        </div>
        <div className="l26-drill-list">
          {thereBeGaps.map((g, i) => (
            <div
              key={g.n}
              className="l26-drill-row"
              style={{ flexWrap: "wrap", gap: "0.35rem" }}
            >
              <strong className="l26-drill-prompt">
                {g.n}. {g.before}
              </strong>
              <select
                value={thereAns[i]}
                onChange={(e) => {
                  setThereChecked(false);
                  const next = [...thereAns];
                  next[i] = e.target.value;
                  setThereAns(next);
                }}
                className={drillSelClass(thereChecked, thereAns[i], g.answer)}
                aria-label={`Sentence ${g.n}`}
                disabled={g.example}
              >
                <option value="">___</option>
                {thereBeOptions.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
              <span>{g.after}</span>
            </div>
          ))}
        </div>
        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setThereChecked(true)}
          >
            Check
          </button>
          {thereChecked && (
            <span className="l22-score">
              {thereScore} / {thereBeGaps.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setThereAns(thereBeGaps.map((g) => g.answer));
              setThereChecked(true);
            }}
          >
            Show answers
          </button>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setThereAns(thereBeGaps.map((g) => (g.example ? g.answer : "")));
              setThereChecked(false);
            }}
          >
            Reset
          </button>
        </div>
      </section>

      {/* ── 3 · Correct the mistakes ─────────────────────────── */}
      <section id="hw35-mistakes" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">3 · Grammar</p>
          <h2>Correct the mistakes</h2>
          <p className="lesson22-section-desc">
            У кожному реченні одна помилка. Напиши правильний варіант повністю.
          </p>
        </div>
        <div className="l26-drill-list">
          {fixMistakes.map((f, i) => {
            const val = fixAns[i] ?? "";
            const ok = fixChecked && textOk(val, f.answers);
            return (
              <div key={f.n} className="hw35-fix-row">
                <p className="hw35-fix-wrong">
                  <strong>{f.n}.</strong> <s>{f.wrong}</s>
                </p>
                <input
                  type="text"
                  value={val}
                  onChange={(e) => {
                    setFixChecked(false);
                    const next = [...fixAns];
                    next[i] = e.target.value;
                    setFixAns(next);
                  }}
                  className={inputCls(fixChecked, val, ok)}
                  placeholder="Write the correct sentence…"
                  aria-label={`Correct sentence ${f.n}`}
                />
                {fixChecked && !ok && (
                  <span className="hw35-tip">
                    {f.tipUa} · {f.answers[0]}
                  </span>
                )}
              </div>
            );
          })}
        </div>
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
              {fixScore} / {fixMistakes.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setFixAns(fixMistakes.map((f) => f.answers[0]));
              setFixChecked(true);
            }}
          >
            Show answers
          </button>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setFixAns(Array(fixMistakes.length).fill(""));
              setFixChecked(false);
            }}
          >
            Reset
          </button>
        </div>
      </section>

      {/* ── 4 · Choose the correct alternatives ──────────────── */}
      <section id="hw35-alt" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">4 · Vocabulary</p>
          <h2>Choose the correct alternatives</h2>
          <p className="lesson22-section-desc">
            Обери слово, яке підходить за змістом.
          </p>
        </div>
        <div className="l26-drill-list">
          {chooseAlt.map((a, i) => (
            <div
              key={a.n}
              className="l26-drill-row"
              style={{ flexWrap: "wrap", gap: "0.35rem" }}
            >
              <strong className="l26-drill-prompt">
                {a.n}. {a.before}
              </strong>
              <select
                value={altAns[i]}
                onChange={(e) => {
                  setAltChecked(false);
                  const next = [...altAns];
                  next[i] = e.target.value;
                  setAltAns(next);
                }}
                className={drillSelClass(altChecked, altAns[i], a.answer)}
                aria-label={`Alternative ${a.n}`}
              >
                <option value="">___</option>
                {a.options.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
              <span>{a.after}</span>
            </div>
          ))}
        </div>
        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setAltChecked(true)}
          >
            Check
          </button>
          {altChecked && (
            <span className="l22-score">
              {altScore} / {chooseAlt.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setAltAns(chooseAlt.map((a) => a.answer));
              setAltChecked(true);
            }}
          >
            Show answers
          </button>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setAltAns(Array(chooseAlt.length).fill(""));
              setAltChecked(false);
            }}
          >
            Reset
          </button>
        </div>
      </section>

      {/* ── 5 · Classroom questions ──────────────────────────── */}
      <section id="hw35-classroom" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">5a · Questions</p>
          <h2>Questions about your classroom</h2>
          <p className="lesson22-section-desc">
            Заповни питання словами з рамки. Деякі слова треба використати
            кілька разів. Питання 1 — приклад.
          </p>
        </div>
        <div className="l25-wordbox" style={{ marginBottom: "0.85rem" }}>
          {classroomWordBank.map((w) => (
            <span key={w} className="l25-wordbox-item">
              {w}
            </span>
          ))}
        </div>
        <div className="hw35-q-list">
          {classroomQs.map((q) => (
            <p key={q.n} className="hw35-q-row">
              <strong>{q.n}.</strong>
              {q.segs.map((seg, i) => {
                if (seg.kind === "text")
                  return <span key={`${q.n}-t-${i}`}>{seg.text}</span>;
                const key = `${q.n}-${i}`;
                const val = classAns[key] ?? "";
                const ok =
                  classChecked && normText(val) === normText(seg.answer);
                return (
                  <input
                    key={key}
                    type="text"
                    value={val}
                    onChange={(e) => {
                      setClassChecked(false);
                      setClassAns((prev) => ({
                        ...prev,
                        [key]: e.target.value,
                      }));
                    }}
                    className={`${inputCls(classChecked, val, ok)} hw35-q-input`}
                    placeholder="___"
                    aria-label={`Question ${q.n} word ${i + 1}`}
                    disabled={q.example}
                  />
                );
              })}
            </p>
          ))}
        </div>
        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setClassChecked(true)}
          >
            Check
          </button>
          {classChecked && (
            <span className="l22-score">
              {classScore} / {classGapKeys.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              const next: Record<string, string> = {};
              for (const g of classGapKeys) next[g.key] = g.answer;
              setClassAns(next);
              setClassChecked(true);
            }}
          >
            Show answers
          </button>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              const next: Record<string, string> = {};
              for (const q of classroomQs) {
                if (!q.example) continue;
                q.segs.forEach((seg, i) => {
                  if (seg.kind === "gap") next[`${q.n}-${i}`] = seg.answer;
                });
              }
              setClassAns(next);
              setClassChecked(false);
            }}
          >
            Reset
          </button>
        </div>
        <p className="l31-ex-line" style={{ marginTop: "1.35rem" }}>
          <strong className="l31-ex-num">5b</strong> Ask your teacher the
          questions from 5a and answer theirs.
        </p>
        <blockquote className="l23-rule-quote">
          <p>
            <strong>A:</strong> <em>Is there a TV in our classroom?</em> ·{" "}
            <strong>B:</strong> <em>No, there isn&apos;t.</em>
          </p>
        </blockquote>
      </section>

      {/* ── 6 · Adjectives ───────────────────────────────────── */}
      <section id="hw35-adj" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">6 · Adjectives</p>
          <h2>Complete the sentences with an adjective</h2>
          <p className="lesson22-section-desc">
            Перша літера — підказка. Речення 1 — приклад.
          </p>
        </div>
        <div className="hw35-q-list">
          {adjGaps.map((g, i) => {
            const val = adjAns[i] ?? "";
            const ok = adjChecked && normText(val) === g.answer;
            return (
              <p key={g.n} className="hw35-q-row">
                <strong>{g.n}.</strong>
                <span>{g.before}</span>
                <input
                  type="text"
                  value={val}
                  onChange={(e) => {
                    setAdjChecked(false);
                    const next = [...adjAns];
                    next[i] = e.target.value;
                    setAdjAns(next);
                  }}
                  className={inputCls(adjChecked, val, ok)}
                  placeholder={g.hint}
                  aria-label={`Adjective ${g.n}`}
                  disabled={g.example}
                />
                <span>{g.after}</span>
              </p>
            );
          })}
        </div>
        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setAdjChecked(true)}
          >
            Check
          </button>
          {adjChecked && (
            <span className="l22-score">
              {adjScore} / {adjGaps.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setAdjAns(adjGaps.map((g) => g.answer));
              setAdjChecked(true);
            }}
          >
            Show answers
          </button>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setAdjAns(adjGaps.map((g) => (g.example ? g.answer : "")));
              setAdjChecked(false);
            }}
          >
            Reset
          </button>
        </div>
      </section>

      {/* ── 7 · Rewrite ──────────────────────────────────────── */}
      <section id="hw35-rewrite" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">7 · Grammar</p>
          <h2>Rewrite the sentences</h2>
          <p className="lesson22-section-desc">
            Перепиши речення, починаючи з поданого слова:{" "}
            <em>This is a busy café.</em> → <em>This café is busy.</em> Речення
            1–2 — приклади.
          </p>
        </div>
        <div className="l26-drill-list">
          {rewriteItems.map((r, i) => {
            const val = rewriteAns[i] ?? "";
            const ok = rewriteChecked && textOk(val, r.answers);
            return (
              <div key={r.n} className="hw35-fix-row">
                <p className="hw35-fix-wrong">
                  <strong>{r.n}.</strong> {r.given}
                </p>
                <div className="hw35-rewrite-line">
                  <strong>{r.start}</strong>
                  <input
                    type="text"
                    value={val}
                    onChange={(e) => {
                      setRewriteChecked(false);
                      const next = [...rewriteAns];
                      next[i] = e.target.value;
                      setRewriteAns(next);
                    }}
                    className={inputCls(rewriteChecked, val, ok)}
                    placeholder={`${r.start} …`}
                    aria-label={`Rewrite ${r.n}`}
                    disabled={r.example}
                  />
                </div>
                {rewriteChecked && !ok && (
                  <span className="hw35-tip">{r.answers[0]}</span>
                )}
              </div>
            );
          })}
        </div>
        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setRewriteChecked(true)}
          >
            Check
          </button>
          {rewriteChecked && (
            <span className="l22-score">
              {rewriteScore} / {rewriteItems.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setRewriteAns(rewriteItems.map((r) => r.answers[0]));
              setRewriteChecked(true);
            }}
          >
            Show answers
          </button>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setRewriteAns(
                rewriteItems.map((r) => (r.example ? r.answers[0] : "")),
              );
              setRewriteChecked(false);
            }}
          >
            Reset
          </button>
        </div>
      </section>

      {/* ── 8 · Word order ───────────────────────────────────── */}
      <section id="hw35-order" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">8a · Word order</p>
          <h2>Make questions</h2>
          <p className="lesson22-section-desc">
            Постав слова в правильному порядку, щоб утворити питання.
          </p>
        </div>
        <WordOrderBoard
          items={wordOrder35}
          rows={orderRows}
          setRows={setOrderRows}
          checked={orderChecked}
          setChecked={setOrderChecked}
        />
        <p className="l31-ex-line" style={{ marginTop: "1.35rem" }}>
          <strong className="l31-ex-num">8b</strong> Ask your teacher the
          questions from 8a and answer theirs.
        </p>
        <blockquote className="l23-rule-quote">
          <p>
            <strong>A:</strong> <em>Is your computer new?</em> ·{" "}
            <strong>B:</strong> <em>No, it isn&apos;t. It&apos;s old.</em>
          </p>
        </blockquote>
      </section>

      {/* ── Reflect ──────────────────────────────────────────── */}
      <section id="hw35-reflect" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Reflect</p>
          <h2>How confident do you feel?</h2>
          <p className="lesson22-section-desc">
            Оціни себе від 1 до 5 (1 — зовсім не впевнено, 5 — дуже впевнено).
          </p>
        </div>
        <div className="hw35-reflect-list">
          {reflectStatements.map((s, i) => (
            <label key={s} className="hw35-reflect-row">
              <span>{s}</span>
              <select
                className="l25-cr-sel"
                value={reflect[i]}
                onChange={(e) => {
                  const next = [...reflect];
                  next[i] = e.target.value;
                  setReflect(next);
                }}
              >
                <option value="">–</option>
                {[1, 2, 3, 4, 5].map((v) => (
                  <option key={v} value={String(v)}>
                    {v}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>
      </section>

      {/* ── Submit ───────────────────────────────────────────── */}
      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Submit</p>
          <h2>Send your homework</h2>
          <p className="lesson22-section-desc">
            Перевір усі вправи (Check), заповни Reflect і надішли вчителю.
          </p>
        </div>
        <label className="lesson22-section-desc" htmlFor="hw35-writing">
          Notes (optional):
        </label>
        <textarea
          id="hw35-writing"
          className="hw27-textarea"
          rows={5}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Що було складно? Які слова хочеш повторити?"
        />
        <HomeworkSubmit
          lessonId="35"
          writing={[
            draft.trim() || "(no extra notes)",
            `1a · Places: ${checks.places ? `${placeScore}/${placeWords.length}` : "not finished"}`,
            `2 · is/isn't/are/aren't: ${checks.thereBe ? `${thereScore}/${thereBeGaps.length}` : "not finished"}`,
            `3 · Mistakes: ${checks.mistakes ? `${fixScore}/${fixMistakes.length}` : "not finished"}`,
            `4 · Alternatives: ${checks.alternatives ? `${altScore}/${chooseAlt.length}` : "not finished"}`,
            `5a · Classroom questions: ${checks.classroom ? `${classScore}/${classGapKeys.length}` : "not finished"}`,
            `6 · Adjectives: ${checks.adjectives ? `${adjScore}/${adjGaps.length}` : "not finished"}`,
            `7 · Rewrite: ${checks.rewrite ? `${rewriteScore}/${rewriteItems.length}` : "not finished"}`,
            `8a · Word order: ${checks.wordOrder ? `${orderScore}/${wordOrder35.length}` : "not finished"}`,
            "Reflect (1–5):",
            ...reflectStatements.map(
              (s, i) => `  ${s} — ${reflect[i] || "—"}`,
            ),
            allDone ? `Total: ${totalScore}/${totalItems}` : "Total: incomplete",
          ].join("\n")}
          quizDone={allDone}
          quizScore={allDone ? totalScore : undefined}
          showListeningCheck={false}
          description="Після перевірки всіх вправ натисни «Надіслати». Додай ім'я."
        />
      </section>
    </div>
  );
}
