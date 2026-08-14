import { useEffect, useMemo, useState } from "react";
import {
  countChoiceSlots,
  cr1Family,
  cr1FamilyBank,
  cr2Possessive,
  cr3FlatIndices,
  cr3PossessiveAdj,
  cr4Mistakes,
  cr5Scramble,
  cr6Demonstratives,
  cr6FlatIndices,
  cr7aNumbers,
  cr7bAges,
  cr8aQuestions,
  crReflectItems,
  normalizeCrAnswer,
  type CrChoiceLine,
} from "../data/hw29CheckReflect";

function scoreChoiceLines(
  items: CrChoiceLine[],
  flatIndices: number[][],
  values: (string | null)[],
): { ok: number; total: number } {
  let ok = 0;
  let total = 0;
  items.forEach((parts, si) => {
    let choiceIdx = 0;
    for (const part of parts) {
      if (typeof part === "string") continue;
      const fi = flatIndices[si]![choiceIdx++]!;
      total += 1;
      if (values[fi] === part.answer) ok += 1;
    }
  });
  return { ok, total };
}

export type Hw29CheckReflectResult = {
  summary: string;
  reflectDone: boolean;
  reflectAvg?: number;
};

type Props = {
  onResultChange?: (result: Hw29CheckReflectResult) => void;
};
function ChoiceExercise({
  items,
  flatIndices,
  values,
  setValues,
}: {
  items: CrChoiceLine[];
  flatIndices: number[][];
  values: (string | null)[];
  setValues: (fn: (prev: (string | null)[]) => (string | null)[]) => void;
}) {
  return (
    <ol className="l25-cr-ol">
      {items.map((parts, si) => {
        let choiceIdx = 0;
        return (
          <li key={si} className="l25-cr-ex8-row">
            {parts.map((part, pi) => {
              if (typeof part === "string")
                return <span key={pi}>{part}</span>;
              const fi = flatIndices[si][choiceIdx++];
              const picked = values[fi];
              return (
                <span key={pi} className="l25-cr-choice-group">
                  {part.choices.map((ch) => {
                    const isCorrect = ch === part.answer;
                    const isPicked = ch === picked;
                    return (
                      <button
                        key={ch}
                        type="button"
                        onClick={() =>
                          setValues((prev) => {
                            const n = [...prev];
                            n[fi] = ch;
                            return n;
                          })
                        }
                        className={`l25-cr-chip${
                          isPicked && isCorrect
                            ? " l25-cr-chip--ok"
                            : isPicked && !isCorrect
                              ? " l25-cr-chip--err"
                              : !isPicked && picked !== null && isCorrect
                                ? " l25-cr-chip--missed"
                                : ""
                        }`}
                      >
                        {ch}
                      </button>
                    );
                  })}
                </span>
              );
            })}
          </li>
        );
      })}
    </ol>
  );
}

function inputClass(checked: boolean, value: string, answer: string): string {
  const base = "l26-profile-blank";
  if (!checked) return base;
  if (normalizeCrAnswer(value) === normalizeCrAnswer(answer))
    return `${base} l25-cr-sel--ok`;
  if (value.trim()) return `${base} l25-cr-sel--err`;
  return base;
}

export default function Hw29CheckReflect({ onResultChange }: Props) {
  const cr3Slots = useMemo(() => countChoiceSlots(cr3PossessiveAdj), []);
  const cr6Slots = useMemo(() => countChoiceSlots(cr6Demonstratives), []);

  const [ex1, setEx1] = useState<Record<number, string>>({});
  const [ex1Checked, setEx1Checked] = useState(false);

  const [ex2, setEx2] = useState<Record<number, string>>({});
  const [ex2Checked, setEx2Checked] = useState(false);

  const [ex3, setEx3] = useState<(string | null)[]>(() =>
    Array(cr3Slots).fill(null),
  );

  const [ex4Open, setEx4Open] = useState<Set<number>>(new Set());

  const [ex5, setEx5] = useState<Record<number, string>>({});
  const [ex5Checked, setEx5Checked] = useState(false);

  const [ex6, setEx6] = useState<(string | null)[]>(() =>
    Array(cr6Slots).fill(null),
  );

  const [ex7a, setEx7a] = useState<Record<number, string>>({});
  const [ex7aChecked, setEx7aChecked] = useState(false);

  const [ex7b, setEx7b] = useState<Record<number, string>>({});
  const [ex7bChecked, setEx7bChecked] = useState(false);

  const [ex8Open, setEx8Open] = useState<Set<number>>(new Set());

  const [reflect, setReflect] = useState<Record<number, number>>({});

  const ex1Score = cr1Family.filter(
    (item, i) => !item.example && ex1[i] === item.answer,
  ).length;
  const ex1Total = cr1Family.filter((item) => !item.example).length;

  const ex2Score = cr2Possessive.filter(
    (item, i) =>
      !item.example &&
      normalizeCrAnswer(ex2[i] ?? "") === normalizeCrAnswer(item.answer),
  ).length;
  const ex2Total = cr2Possessive.filter((item) => !item.example).length;

  const ex3Score = scoreChoiceLines(cr3PossessiveAdj, cr3FlatIndices, ex3);

  const ex5Score = cr5Scramble.filter(
    (item, i) =>
      !item.example &&
      normalizeCrAnswer(ex5[i] ?? "") === normalizeCrAnswer(item.answer),
  ).length;
  const ex5Total = cr5Scramble.filter((item) => !item.example).length;

  const ex6Score = scoreChoiceLines(cr6Demonstratives, cr6FlatIndices, ex6);

  const ex7aScore = cr7aNumbers.filter(
    (item, i) =>
      !item.example &&
      normalizeCrAnswer(ex7a[i] ?? "") === normalizeCrAnswer(item.answer),
  ).length;
  const ex7aTotal = cr7aNumbers.filter((item) => !item.example).length;

  const ex7bScore = cr7bAges.filter(
    (item, i) =>
      !item.example &&
      normalizeCrAnswer(ex7b[i] ?? "") === normalizeCrAnswer(item.answer),
  ).length;
  const ex7bTotal = cr7bAges.filter((item) => !item.example).length;

  const reflectRated = crReflectItems.filter((_, i) => reflect[i] != null).length;
  const reflectDone = reflectRated === crReflectItems.length;
  const reflectAvg = reflectDone
    ? Math.round(
        (crReflectItems.reduce((s, _, i) => s + (reflect[i] ?? 0), 0) /
          crReflectItems.length) *
          10,
      ) / 10
    : undefined;

  useEffect(() => {
    if (!onResultChange) return;
    const lines = [
      "HW29 · Check & Reflect",
      `1 Family: ${ex1Checked ? `${ex1Score}/${ex1Total}` : "not checked"}`,
      `2 Possessive 's: ${ex2Checked ? `${ex2Score}/${ex2Total}` : "not checked"}`,
      `3 Possessive adj: ${ex3Score.ok}/${ex3Score.total} correct`,
      `4 Mistakes: opened ${ex4Open.size}/${cr4Mistakes.length}`,
      `5 Scramble: ${ex5Checked ? `${ex5Score}/${ex5Total}` : "not checked"}`,
      `6 Demonstratives: ${ex6Score.ok}/${ex6Score.total} correct`,
      `7a Numbers: ${ex7aChecked ? `${ex7aScore}/${ex7aTotal}` : "not checked"}`,
      `7b Ages: ${ex7bChecked ? `${ex7bScore}/${ex7bTotal}` : "not checked"}`,
      `8a Answers opened: ${ex8Open.size}/${cr8aQuestions.length}`,
      `Reflect: ${reflectRated}/${crReflectItems.length}${
        typeof reflectAvg === "number" ? ` · avg ${reflectAvg}/5` : ""
      }`,
      ...crReflectItems.map(
        (text, i) => `  · ${text}: ${reflect[i] ?? "—"}`,
      ),
    ];
    onResultChange({
      summary: lines.join("\n"),
      reflectDone,
      reflectAvg,
    });
  }, [
    onResultChange,
    ex1Checked,
    ex1Score,
    ex1Total,
    ex2Checked,
    ex2Score,
    ex2Total,
    ex3Score.ok,
    ex3Score.total,
    ex4Open,
    ex5Checked,
    ex5Score,
    ex5Total,
    ex6Score.ok,
    ex6Score.total,
    ex7aChecked,
    ex7aScore,
    ex7aTotal,
    ex7bChecked,
    ex7bScore,
    ex7bTotal,
    ex8Open,
    reflect,
    reflectRated,
    reflectDone,
    reflectAvg,
  ]);

  return (
    <section className="lesson22-block panel">
      <div className="lesson22-section-head">
        <p className="page-kicker">Check &amp; Reflect</p>
        <h2>Unit review</h2>
        <p className="lesson22-section-desc">
          Перевір себе — сімейні слова, possessive <em>'s</em>, everyday
          objects, numbers і питання.
        </p>
      </div>

      {/* ── 1 Family ── */}
      <div className="l25-cr-block">
        <span className="l25-cr-num">1</span>
        <div className="l25-cr-body">
          <p className="l25-cr-instr">
            Complete the sentences with the correct family word.
          </p>
          <p className="l25-cr-bank">
            {cr1FamilyBank.map((w) => (
              <span key={w}>{w}</span>
            ))}
          </p>
          <ol className="l25-cr-ol">
            {cr1Family.map((item, i) => (
              <li key={i} className="l25-cr-nat-row">
                <span>
                  {item.prompt}{" "}
                </span>
                {item.example ? (
                  <strong>{item.answer}.</strong>
                ) : (
                  <>
                    <select
                      value={ex1[i] ?? ""}
                      onChange={(e) => {
                        setEx1Checked(false);
                        setEx1((prev) => ({ ...prev, [i]: e.target.value }));
                      }}
                      className={`l25-cr-sel${
                        ex1Checked
                          ? ex1[i] === item.answer
                            ? " l25-cr-sel--ok"
                            : ex1[i]
                              ? " l25-cr-sel--err"
                              : ""
                          : ""
                      }`}
                    >
                      <option value="">___</option>
                      {cr1FamilyBank.map((w) => (
                        <option key={w} value={w}>
                          {w}
                        </option>
                      ))}
                    </select>
                    .
                  </>
                )}
              </li>
            ))}
          </ol>
          <div className="l25-cr-actions">
            <button
              type="button"
              className="l22-check-btn"
              onClick={() => setEx1Checked(true)}
            >
              Check answers
            </button>
            {ex1Checked && (
              <span className="l22-score">
                {ex1Score} / {ex1Total}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── 2 Possessive 's ── */}
      <div className="l25-cr-block">
        <span className="l25-cr-num">2</span>
        <div className="l25-cr-body">
          <p className="l25-cr-instr">
            Correct the phrases. Use the possessive <em>'s</em>.
          </p>
          <ol className="l25-cr-ol">
            {cr2Possessive.map((item, i) => (
              <li key={i} className="l25-cr-nat-row">
                <span>
                  {item.from} →{" "}
                </span>
                {item.example ? (
                  <strong>{item.answer}</strong>
                ) : (
                  <input
                    type="text"
                    value={ex2[i] ?? ""}
                    onChange={(e) => {
                      setEx2Checked(false);
                      setEx2((prev) => ({ ...prev, [i]: e.target.value }));
                    }}
                    className={inputClass(ex2Checked, ex2[i] ?? "", item.answer)}
                    placeholder="…"
                    aria-label={`Possessive ${i + 1}`}
                    style={{ minWidth: "12rem" }}
                  />
                )}
              </li>
            ))}
          </ol>
          <div className="l25-cr-actions">
            <button
              type="button"
              className="l22-check-btn"
              onClick={() => setEx2Checked(true)}
            >
              Check answers
            </button>
            {ex2Checked && (
              <span className="l22-score">
                {ex2Score} / {ex2Total}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── 3 Possessive adjectives ── */}
      <div className="l25-cr-block">
        <span className="l25-cr-num">3</span>
        <div className="l25-cr-body">
          <p className="l25-cr-instr">Choose the correct alternatives.</p>
          <ChoiceExercise
            items={cr3PossessiveAdj}
            flatIndices={cr3FlatIndices}
            values={ex3}
            setValues={setEx3}
          />
        </div>
      </div>

      {/* ── 4 Mistakes ── */}
      <div className="l25-cr-block">
        <span className="l25-cr-num">4</span>
        <div className="l25-cr-body">
          <p className="l25-cr-instr">Correct the mistakes in the sentences.</p>
          <ol className="l25-cr-ol">
            {cr4Mistakes.map((item, i) => (
              <li key={i} className="l25-cr-order-row">
                <span className="l25-cr-sentence">{item.wrong}</span>
                <button
                  type="button"
                  className="l25-cr-mini-btn"
                  onClick={() =>
                    setEx4Open((prev) => {
                      const next = new Set(prev);
                      if (next.has(i)) next.delete(i);
                      else next.add(i);
                      return next;
                    })
                  }
                >
                  {ex4Open.has(i) ? "Hide" : "Correct →"}
                </button>
                {ex4Open.has(i) && (
                  <span className="l25-cr-answer l25-cr-answer--green">
                    {item.correct}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* ── 5 Scramble ── */}
      <div className="l25-cr-block">
        <span className="l25-cr-num">5</span>
        <div className="l25-cr-body">
          <p className="l25-cr-instr">
            Put the letters in the correct order to make everyday objects. The
            first letter is given.
          </p>
          <ol className="l25-cr-ol">
            {cr5Scramble.map((item, i) => (
              <li key={i} className="l25-cr-nat-row">
                <span className="l25-cr-jumbled">{item.letters}</span>
                <span> → </span>
                {item.example ? (
                  <strong>{item.answer}</strong>
                ) : (
                  <input
                    type="text"
                    value={ex5[i] ?? ""}
                    onChange={(e) => {
                      setEx5Checked(false);
                      setEx5((prev) => ({ ...prev, [i]: e.target.value }));
                    }}
                    className={inputClass(
                      ex5Checked,
                      ex5[i] ?? "",
                      item.answer,
                    )}
                    placeholder={`${item.hint}…`}
                    aria-label={`Object ${i + 1}`}
                    style={{ minWidth: "8rem" }}
                  />
                )}
              </li>
            ))}
          </ol>
          <div className="l25-cr-actions">
            <button
              type="button"
              className="l22-check-btn"
              onClick={() => setEx5Checked(true)}
            >
              Check answers
            </button>
            {ex5Checked && (
              <span className="l22-score">
                {ex5Score} / {ex5Total}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── 6 Demonstratives ── */}
      <div className="l25-cr-block">
        <span className="l25-cr-num">6</span>
        <div className="l25-cr-body">
          <p className="l25-cr-instr">Choose the correct alternatives.</p>
          <ChoiceExercise
            items={cr6Demonstratives}
            flatIndices={cr6FlatIndices}
            values={ex6}
            setValues={setEx6}
          />
        </div>
      </div>

      {/* ── 7a Numbers ── */}
      <div className="l25-cr-block">
        <span className="l25-cr-num">7a</span>
        <div className="l25-cr-body">
          <p className="l25-cr-instr">
            Write the correct numbers in words.
          </p>
          <ol className="l25-cr-ol">
            {cr7aNumbers.map((item, i) => (
              <li key={i} className="l25-cr-nat-row">
                <span>
                  {item.expr}{" "}
                </span>
                {item.example ? (
                  <strong>{item.answer}</strong>
                ) : (
                  <input
                    type="text"
                    value={ex7a[i] ?? ""}
                    onChange={(e) => {
                      setEx7aChecked(false);
                      setEx7a((prev) => ({ ...prev, [i]: e.target.value }));
                    }}
                    className={inputClass(
                      ex7aChecked,
                      ex7a[i] ?? "",
                      item.answer,
                    )}
                    placeholder="…"
                    aria-label={`Number ${i + 1}`}
                    style={{ minWidth: "10rem" }}
                  />
                )}
              </li>
            ))}
          </ol>
          <div className="l25-cr-actions">
            <button
              type="button"
              className="l22-check-btn"
              onClick={() => setEx7aChecked(true)}
            >
              Check answers
            </button>
            {ex7aChecked && (
              <span className="l22-score">
                {ex7aScore} / {ex7aTotal}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── 7b Ages ── */}
      <div className="l25-cr-block">
        <span className="l25-cr-num">7b</span>
        <div className="l25-cr-body">
          <p className="l25-cr-instr">
            Read the first sentence. Then complete the second sentence.
          </p>
          <ol className="l25-cr-ol">
            {cr7bAges.map((item, i) => (
              <li key={i} className="l25-cr-nat-row">
                <span>
                  {item.first} {item.secondStart}{" "}
                </span>
                {item.example ? (
                  <strong>{item.answer}.</strong>
                ) : (
                  <>
                    <input
                      type="text"
                      value={ex7b[i] ?? ""}
                      onChange={(e) => {
                        setEx7bChecked(false);
                        setEx7b((prev) => ({ ...prev, [i]: e.target.value }));
                      }}
                      className={inputClass(
                        ex7bChecked,
                        ex7b[i] ?? "",
                        item.answer,
                      )}
                      placeholder="… years old"
                      aria-label={`Age ${i + 1}`}
                      style={{ minWidth: "12rem" }}
                    />
                    .
                  </>
                )}
              </li>
            ))}
          </ol>
          <div className="l25-cr-actions">
            <button
              type="button"
              className="l22-check-btn"
              onClick={() => setEx7bChecked(true)}
            >
              Check answers
            </button>
            {ex7bChecked && (
              <span className="l22-score">
                {ex7bScore} / {ex7bTotal}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── 8a Word order ── */}
      <div className="l25-cr-block">
        <span className="l25-cr-num">8a</span>
        <div className="l25-cr-body">
          <p className="l25-cr-instr">
            Put the words in the correct order to make questions.
          </p>
          <ol className="l25-cr-ol">
            {cr8aQuestions.map((item, i) => (
              <li key={i} className="l25-cr-order-row">
                <span className="l25-cr-jumbled">{item.words}</span>
                <button
                  type="button"
                  className="l25-cr-mini-btn"
                  onClick={() =>
                    setEx8Open((prev) => {
                      const next = new Set(prev);
                      if (next.has(i)) next.delete(i);
                      else next.add(i);
                      return next;
                    })
                  }
                >
                  {ex8Open.has(i) ? "Hide" : "Answer"}
                </button>
                {ex8Open.has(i) && (
                  <span className="l25-cr-answer">{item.answer}</span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* ── 8b Speaking ── */}
      <div className="l25-cr-block">
        <span className="l25-cr-num">8b</span>
        <div className="l25-cr-body">
          <p className="l25-cr-instr">
            Work in pairs. Ask and answer the questions in Exercise 8a.
          </p>
          <p className="l25-cr-hint">
            A: What is your father's job? — B: He's a…
          </p>
        </div>
      </div>

      {/* ── Reflect ── */}
      <div className="l25-cr-block" style={{ borderBottom: "none" }}>
        <span className="l25-cr-num">★</span>
        <div className="l25-cr-body">
          <p className="l25-cr-instr">
            <strong>Reflect</strong> — How confident do you feel? Write 1–5 (1 =
            not very confident, 5 = very confident).
          </p>
          <ul className="l25-cr-ol" style={{ listStyle: "none", padding: 0 }}>
            {crReflectItems.map((text, i) => (
              <li
                key={i}
                className="l25-cr-nat-row"
                style={{
                  justifyContent: "space-between",
                  gap: "0.75rem",
                  flexWrap: "wrap",
                }}
              >
                <span>{text}</span>
                <span className="l25-cr-btns" role="group" aria-label={text}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      className={`l25-cr-is-btn${
                        reflect[i] === n ? " l25-cr-is-btn--ok" : ""
                      }`}
                      onClick={() =>
                        setReflect((prev) => ({ ...prev, [i]: n }))
                      }
                    >
                      {n}
                    </button>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
