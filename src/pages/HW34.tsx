import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  lesson31Images,
  prepareTownsC,
  questionGapsC,
  wordOrderC,
} from "../data/lesson31";
import {
  hw34PcBe,
  hw34PcIng,
  hw34PcVsSimple,
  hw34WhForm,
  hw34WhWord,
} from "../data/hw34";
import { HomeworkSubmit } from "../components/HomeworkSubmit";
import Lesson31Figure from "../components/lesson31/Lesson31Figure";
import WordOrderBoard, {
  initWordOrderRows,
} from "../components/lesson31/WordOrderBoard";
import { drillSelClass } from "../components/lesson31/drillSelClass";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
import "../styles/lesson26.css";
import "../styles/lesson31.css";

const IMG31 = (file: string) =>
  `${import.meta.env.BASE_URL}images/lesson31/${file}`;

function wordOrderScore(
  items: typeof wordOrderC,
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

function normIng(raw: string): string {
  return raw.trim().toLowerCase().replace(/[.!?]+$/, "");
}

export default function HW34() {
  const [orderRows, setOrderRows] = useState(() =>
    initWordOrderRows(wordOrderC),
  );
  const [orderChecked, setOrderChecked] = useState(false);

  const [qGapAns, setQGapAns] = useState<Record<string, string>>({});
  const [townNotes, setTownNotes] = useState(["", "", ""]);

  const [whWordAns, setWhWordAns] = useState(() =>
    Array(hw34WhWord.length).fill(""),
  );
  const [whWordChecked, setWhWordChecked] = useState(false);

  const [whFormAns, setWhFormAns] = useState(() =>
    Array(hw34WhForm.length).fill(""),
  );
  const [whFormChecked, setWhFormChecked] = useState(false);

  const [pcBeAns, setPcBeAns] = useState(() => Array(hw34PcBe.length).fill(""));
  const [pcBeChecked, setPcBeChecked] = useState(false);

  const [pcIngAns, setPcIngAns] = useState(() =>
    Array(hw34PcIng.length).fill(""),
  );
  const [pcIngChecked, setPcIngChecked] = useState(false);

  const [pcVsAns, setPcVsAns] = useState(() =>
    Array(hw34PcVsSimple.length).fill(""),
  );
  const [pcVsChecked, setPcVsChecked] = useState(false);

  const [draft, setDraft] = useState("");

  const orderScore = wordOrderScore(wordOrderC, orderRows);
  const whWordScore = hw34WhWord.filter(
    (q, i) => whWordAns[i] === q.answer,
  ).length;
  const whFormScore = hw34WhForm.filter(
    (q, i) => whFormAns[i] === q.answer,
  ).length;
  const pcBeScore = hw34PcBe.filter((q, i) => pcBeAns[i] === q.answer).length;
  const pcIngScore = hw34PcIng.filter(
    (q, i) => normIng(pcIngAns[i] ?? "") === q.answer,
  ).length;
  const pcVsScore = hw34PcVsSimple.filter(
    (q, i) => pcVsAns[i] === q.answer,
  ).length;

  const checks = useMemo(
    () => ({
      wordOrder: orderChecked,
      whWord: whWordChecked,
      whForm: whFormChecked,
      pcBe: pcBeChecked,
      pcIng: pcIngChecked,
      pcVs: pcVsChecked,
    }),
    [
      orderChecked,
      whWordChecked,
      whFormChecked,
      pcBeChecked,
      pcIngChecked,
      pcVsChecked,
    ],
  );

  const allDone = Object.values(checks).every(Boolean);
  const totalScore =
    orderScore +
    whWordScore +
    whFormScore +
    pcBeScore +
    pcIngScore +
    pcVsScore;
  const totalItems =
    wordOrderC.length +
    hw34WhWord.length +
    hw34WhForm.length +
    hw34PcBe.length +
    hw34PcIng.length +
    hw34PcVsSimple.length;

  return (
    <div className="lesson22-page">
      <section className="lesson22-hero panel">
        <div className="lesson22-hero-top">
          <div>
            <p className="page-kicker">Homework · Lesson 34</p>
            <h1>It&apos;s expensive!</h1>
            <p className="lesson22-subtitle">
              Практика з уроку 34: word order, questions about your town,
              prepare &amp; speak. Плюс перевірка{" "}
              <strong>WH-questions</strong> і <strong>Present continuous</strong>
              .
            </p>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <Link className="lesson22-back-link" to="/lesson-34">
              ← Lesson 34
            </Link>
            <Link className="lesson22-back-link" to="/lessons">
              ← Back to lessons
            </Link>
          </div>
        </div>
        <div className="lesson22-hero-chips">
          <span>Word order</span>
          <span>Is there…?</span>
          <span>Describe a town</span>
          <span>WH-questions</span>
          <span>Present continuous</span>
        </div>
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-flow">
          <a href="#hw34-order">9 Word order</a>
          <a href="#hw34-questions">10a Questions</a>
          <a href="#hw34-prepare">11 Prepare</a>
          <a href="#hw34-wh">Check · WH</a>
          <a href="#hw34-pc">Check · PC</a>
          <a href="#hw34-submit">Submit</a>
        </div>
      </section>

      <section id="hw34-order" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">9 · Word order</p>
          <h2>Make sentences</h2>
        </div>
        <p className="l31-ex-line">
          <strong className="l31-ex-num">9</strong> Put the words in the correct
          order to make sentences.
        </p>
        <WordOrderBoard
          items={wordOrderC}
          rows={orderRows}
          setRows={setOrderRows}
          checked={orderChecked}
          setChecked={setOrderChecked}
        />
      </section>

      <section id="hw34-questions" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">10a · Questions</p>
          <h2>Places in your town</h2>
        </div>
        <p className="l31-ex-line">
          <strong className="l31-ex-num">10a</strong> Complete the questions
          about places in your town. Use adjectives.
        </p>
        <div className="l26-drill-list">
          {questionGapsC.map((q, i) => {
            const two = "twoBlanks" in q && q.twoBlanks;
            const mid = "mid" in q ? q.mid : undefined;
            return (
              <div
                key={q.id}
                className="l26-drill-row"
                style={{
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "0.35rem",
                }}
              >
                <strong
                  className="l26-drill-prompt"
                  style={{ flex: "0 0 auto" }}
                >
                  {i + 1}.
                </strong>
                <span>{q.before}</span>
                <input
                  type="text"
                  value={qGapAns[`${q.id}-a`] ?? ""}
                  onChange={(e) =>
                    setQGapAns((prev) => ({
                      ...prev,
                      [`${q.id}-a`]: e.target.value,
                    }))
                  }
                  className="l22-gap-input"
                  placeholder="______"
                  aria-label={`Question ${i + 1} blank 1`}
                  style={{ minWidth: "8rem", flex: "1 1 8rem" }}
                />
                {two && mid != null && (
                  <>
                    <span>{mid}</span>
                    <input
                      type="text"
                      value={qGapAns[`${q.id}-b`] ?? ""}
                      onChange={(e) =>
                        setQGapAns((prev) => ({
                          ...prev,
                          [`${q.id}-b`]: e.target.value,
                        }))
                      }
                      className="l22-gap-input"
                      placeholder="______"
                      aria-label={`Question ${i + 1} blank 2`}
                      style={{ minWidth: "6rem", flex: "1 1 6rem" }}
                    />
                  </>
                )}
                <span>{q.after}</span>
                <span
                  style={{
                    flex: "1 1 100%",
                    color: "var(--color-text-muted)",
                    fontSize: "0.85rem",
                  }}
                >
                  e.g. {q.example}
                </span>
              </div>
            );
          })}
        </div>
        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              const next: Record<string, string> = {};
              for (const q of questionGapsC) {
                if ("twoBlanks" in q && q.twoBlanks) {
                  const [a, b] = q.example.split("·").map((s) => s.trim());
                  next[`${q.id}-a`] = a ?? q.example;
                  next[`${q.id}-b`] = b ?? "";
                } else {
                  next[`${q.id}-a`] = q.example;
                }
              }
              setQGapAns(next);
            }}
          >
            Show examples
          </button>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => setQGapAns({})}
          >
            Reset
          </button>
        </div>
      </section>

      <section id="hw34-prepare" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">11 · Prepare</p>
          <h2>Three towns or cities</h2>
        </div>
        <p className="l31-ex-line">
          <strong className="l31-ex-num">11</strong> Prepare. Choose three towns
          or cities and make notes. Use Exercise 5 from the lesson to help you.
        </p>
        <Lesson31Figure
          src={IMG31(lesson31Images.tokyoFuji)}
          alt="Tokyo skyline with Mount Fuji"
          caption="Speaking cue · describe towns / cities"
          variant="photo"
        />
        <div
          className="l25-wordbox"
          style={{ marginTop: "0.85rem", marginBottom: "0.85rem" }}
        >
          {prepareTownsC.map((t) => (
            <span key={t} className="l25-wordbox-item">
              {t}
            </span>
          ))}
        </div>
        <div className="lesson22-prompt-grid">
          {[0, 1, 2].map((i) => (
            <label key={i} className="lesson22-prompt-card">
              <strong>Town / city {i + 1}</strong>
              <textarea
                value={townNotes[i] ?? ""}
                onChange={(e) => {
                  const v = e.target.value;
                  setTownNotes((prev) => {
                    const next = [...prev];
                    next[i] = v;
                    return next;
                  });
                }}
                rows={4}
                placeholder="shops · restaurants · parks · hotels…"
                style={{
                  width: "100%",
                  marginTop: "0.5rem",
                  resize: "vertical",
                  font: "inherit",
                }}
              />
            </label>
          ))}
        </div>
        <blockquote className="l23-rule-quote" style={{ marginTop: "1rem" }}>
          <p>
            <strong>Ideas.</strong>{" "}
            <em>This town is quiet. There is a small train station…</em> /{" "}
            <em>It&apos;s busy. There are cheap shops and a good market…</em>
          </p>
        </blockquote>
      </section>

      {/* ── Check · WH-questions ─────────────────────────────── */}
      <section id="hw34-wh" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Check · WH-questions</p>
          <h2>Who · What · Where · When · Why · How</h2>
          <p className="lesson22-section-desc">
            Питальне слово + <strong>be</strong> або{" "}
            <strong>do / does</strong> + підмет + дієслово.
          </p>
        </div>

        <p className="l31-ex-line">
          <strong className="l31-ex-num">A</strong> Choose the question word.
        </p>
        <div className="l26-drill-list">
          {hw34WhWord.map((q, i) => (
            <div key={q.id} className="l26-drill-row">
              <strong className="l26-drill-prompt">
                {i + 1}. {q.prompt}
              </strong>
              <span className="l26-drill-arrow" aria-hidden="true">
                →
              </span>
              <select
                value={whWordAns[i]}
                onChange={(e) => {
                  setWhWordChecked(false);
                  const next = [...whWordAns];
                  next[i] = e.target.value;
                  setWhWordAns(next);
                }}
                className={drillSelClass(whWordChecked, whWordAns[i], q.answer)}
                aria-label={`Question word ${i + 1}`}
              >
                <option value="">___</option>
                {q.options.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setWhWordChecked(true)}
          >
            Check
          </button>
          {whWordChecked && (
            <span className="l22-score">
              {whWordScore} / {hw34WhWord.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setWhWordAns(hw34WhWord.map((q) => q.answer));
              setWhWordChecked(true);
            }}
          >
            Show answers
          </button>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setWhWordAns(Array(hw34WhWord.length).fill(""));
              setWhWordChecked(false);
            }}
          >
            Reset
          </button>
        </div>

        <p className="l31-ex-line" style={{ marginTop: "1.35rem" }}>
          <strong className="l31-ex-num">B</strong> Choose the correct question.
        </p>
        <div className="l26-drill-list">
          {hw34WhForm.map((q, i) => (
            <div
              key={q.id}
              className="l26-drill-row"
              style={{ flexWrap: "wrap", gap: "0.35rem" }}
            >
              <strong className="l26-drill-prompt">
                {i + 1}. {q.scramble}
              </strong>
              <span className="l26-drill-arrow" aria-hidden="true">
                →
              </span>
              <select
                value={whFormAns[i]}
                onChange={(e) => {
                  setWhFormChecked(false);
                  const next = [...whFormAns];
                  next[i] = e.target.value;
                  setWhFormAns(next);
                }}
                className={drillSelClass(whFormChecked, whFormAns[i], q.answer)}
                aria-label={`Question form ${i + 1}`}
              >
                <option value="">___</option>
                {q.options.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setWhFormChecked(true)}
          >
            Check
          </button>
          {whFormChecked && (
            <span className="l22-score">
              {whFormScore} / {hw34WhForm.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setWhFormAns(hw34WhForm.map((q) => q.answer));
              setWhFormChecked(true);
            }}
          >
            Show answers
          </button>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setWhFormAns(Array(hw34WhForm.length).fill(""));
              setWhFormChecked(false);
            }}
          >
            Reset
          </button>
        </div>
      </section>

      {/* ── Check · Present continuous ───────────────────────── */}
      <section id="hw34-pc" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Check · Present continuous</p>
          <h2>am / is / are + verb-ing</h2>
          <p className="lesson22-section-desc">
            Дія <strong>зараз</strong>, у момент мовлення.
          </p>
        </div>

        <p className="l31-ex-line">
          <strong className="l31-ex-num">A</strong> Choose am, is or are.
        </p>
        <div className="l26-drill-list">
          {hw34PcBe.map((q, i) => (
            <div key={q.id} className="l26-drill-row">
              <strong className="l26-drill-prompt">
                {i + 1}. {q.before} ___ {q.after}
              </strong>
              <span className="l26-drill-arrow" aria-hidden="true">
                →
              </span>
              <select
                value={pcBeAns[i]}
                onChange={(e) => {
                  setPcBeChecked(false);
                  const next = [...pcBeAns];
                  next[i] = e.target.value;
                  setPcBeAns(next);
                }}
                className={drillSelClass(pcBeChecked, pcBeAns[i], q.answer)}
                aria-label={`be form ${i + 1}`}
              >
                <option value="">___</option>
                <option value="am">am</option>
                <option value="is">is</option>
                <option value="are">are</option>
              </select>
            </div>
          ))}
        </div>
        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setPcBeChecked(true)}
          >
            Check
          </button>
          {pcBeChecked && (
            <span className="l22-score">
              {pcBeScore} / {hw34PcBe.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setPcBeAns(hw34PcBe.map((q) => q.answer));
              setPcBeChecked(true);
            }}
          >
            Show answers
          </button>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setPcBeAns(Array(hw34PcBe.length).fill(""));
              setPcBeChecked(false);
            }}
          >
            Reset
          </button>
        </div>

        <p className="l31-ex-line" style={{ marginTop: "1.35rem" }}>
          <strong className="l31-ex-num">B</strong> Write the -ing form.
        </p>
        <p className="lesson22-section-desc">
          Пам&apos;ятай: <strong>write → writing</strong> (без -e),{" "}
          <strong>run → running</strong> (подвоєна приголосна).
        </p>
        <div className="l31-pc-doing-grid">
          {hw34PcIng.map((q, i) => {
            const val = pcIngAns[i] ?? "";
            const ok = pcIngChecked && normIng(val) === q.answer;
            const err = pcIngChecked && val.trim() !== "" && !ok;
            return (
              <p key={q.id} className="l31-pc-doing-row">
                <strong>{i + 1}.</strong>
                <span>{q.verb} →</span>
                <input
                  type="text"
                  value={val}
                  onChange={(e) => {
                    setPcIngChecked(false);
                    const next = [...pcIngAns];
                    next[i] = e.target.value;
                    setPcIngAns(next);
                  }}
                  className={[
                    "l22-gap-input",
                    ok ? "is-ok" : "",
                    err ? "is-err" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  placeholder="…ing"
                  aria-label={`-ing form of ${q.verb}`}
                />
              </p>
            );
          })}
        </div>
        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setPcIngChecked(true)}
          >
            Check
          </button>
          {pcIngChecked && (
            <span className="l22-score">
              {pcIngScore} / {hw34PcIng.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setPcIngAns(hw34PcIng.map((q) => q.answer));
              setPcIngChecked(true);
            }}
          >
            Show answers
          </button>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setPcIngAns(Array(hw34PcIng.length).fill(""));
              setPcIngChecked(false);
            }}
          >
            Reset
          </button>
        </div>

        <p className="l31-ex-line" style={{ marginTop: "1.35rem" }}>
          <strong className="l31-ex-num">C</strong> Present simple or Present
          continuous?
        </p>
        <div className="l26-drill-list">
          {hw34PcVsSimple.map((q, i) => (
            <div
              key={q.id}
              className="l26-drill-row"
              style={{ flexWrap: "wrap", gap: "0.35rem" }}
            >
              <strong className="l26-drill-prompt">
                {i + 1}. {q.before} ___ {q.after}
              </strong>
              <span className="l26-drill-arrow" aria-hidden="true">
                →
              </span>
              <select
                value={pcVsAns[i]}
                onChange={(e) => {
                  setPcVsChecked(false);
                  const next = [...pcVsAns];
                  next[i] = e.target.value;
                  setPcVsAns(next);
                }}
                className={drillSelClass(pcVsChecked, pcVsAns[i], q.answer)}
                aria-label={`Tense ${i + 1}`}
              >
                <option value="">___</option>
                {q.options.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
              {pcVsChecked && (
                <span
                  style={{
                    flex: "1 1 100%",
                    color: "var(--color-text-muted)",
                    fontSize: "0.85rem",
                  }}
                >
                  {q.tipUa}
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setPcVsChecked(true)}
          >
            Check
          </button>
          {pcVsChecked && (
            <span className="l22-score">
              {pcVsScore} / {hw34PcVsSimple.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setPcVsAns(hw34PcVsSimple.map((q) => q.answer));
              setPcVsChecked(true);
            }}
          >
            Show answers
          </button>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setPcVsAns(Array(hw34PcVsSimple.length).fill(""));
              setPcVsChecked(false);
            }}
          >
            Reset
          </button>
        </div>
      </section>

      <section id="hw34-submit" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Submit</p>
          <h2>Send your homework</h2>
          <p className="lesson22-section-desc">
            Перевір усі вправи (Check), потім надішли вчителю.
          </p>
        </div>
        <label className="lesson22-section-desc" htmlFor="hw34-writing">
          Notes (optional):
        </label>
        <textarea
          id="hw34-writing"
          className="hw27-textarea"
          rows={6}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={`9 word order: ${checks.wordOrder ? `${orderScore}/${wordOrderC.length}` : "—"}
WH · question word: ${checks.whWord ? `${whWordScore}/${hw34WhWord.length}` : "—"}
WH · correct question: ${checks.whForm ? `${whFormScore}/${hw34WhForm.length}` : "—"}
PC · am/is/are: ${checks.pcBe ? `${pcBeScore}/${hw34PcBe.length}` : "—"}
PC · -ing form: ${checks.pcIng ? `${pcIngScore}/${hw34PcIng.length}` : "—"}
PC vs simple: ${checks.pcVs ? `${pcVsScore}/${hw34PcVsSimple.length}` : "—"}`}
        />
        <HomeworkSubmit
          lessonId="34"
          writing={[
            draft.trim() || "(no extra notes)",
            `9 · Word order: ${checks.wordOrder ? `${orderScore}/${wordOrderC.length}` : "not finished"}`,
            `WH · Question word: ${checks.whWord ? `${whWordScore}/${hw34WhWord.length}` : "not finished"}`,
            `WH · Correct question: ${checks.whForm ? `${whFormScore}/${hw34WhForm.length}` : "not finished"}`,
            `PC · am/is/are: ${checks.pcBe ? `${pcBeScore}/${hw34PcBe.length}` : "not finished"}`,
            `PC · -ing form: ${checks.pcIng ? `${pcIngScore}/${hw34PcIng.length}` : "not finished"}`,
            `PC vs Simple: ${checks.pcVs ? `${pcVsScore}/${hw34PcVsSimple.length}` : "not finished"}`,
            `11 · Towns: ${townNotes.filter((t) => t.trim()).length}/3 notes`,
            townNotes
              .map((t, i) => `  Town ${i + 1}: ${t.trim() || "—"}`)
              .join("\n"),
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
