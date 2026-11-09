import { useEffect, useMemo, useState } from "react";
import { CheckBar } from "./lesson38/L38Ui";
import { drillSelClass } from "./lesson31/drillSelClass";
import { gapInputClass } from "./lesson31/gapInputClass";
import {
  adjectiveChoices,
  compassGaps,
  holidayWasWere,
  monthGaps,
  ordinalWords,
  pastQuestionOrder,
  questionMatchAnswers,
  questionMatchOptions,
  questionWordOrder,
  reflectStatements54,
  timeWordGaps,
  vocabAlternatives,
} from "../content/lessons/lesson-54/hwCheckReflect";
import { matchesAnyAnswer } from "../utils/text";
import "../styles/lesson25.css";
import "../styles/lesson35.css";

export type Hw54CrStats = {
  allChecked: boolean;
  reflectDone: boolean;
  score: number;
  total: number;
};

type Props = {
  onStats: (stats: Hw54CrStats) => void;
};

function CompassRose() {
  return (
    <svg
      viewBox="0 0 120 120"
      width="140"
      height="140"
      aria-hidden="true"
      style={{ display: "block", margin: "0.5rem 0 1rem" }}
    >
      <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="2" />
      <polygon points="60,10 68,52 60,60 52,52" fill="#c0392b" />
      <polygon points="60,110 52,68 60,60 68,68" fill="#eee" stroke="#999" />
      <polygon points="10,60 52,52 60,60 52,68" fill="#eee" stroke="#999" />
      <polygon points="110,60 68,68 60,60 68,52" fill="#eee" stroke="#999" />
      <text x="54" y="22" fontSize="11" fontWeight="700">
        N
      </text>
      <text x="102" y="64" fontSize="11" fontWeight="700">
        E
      </text>
      <text x="54" y="108" fontSize="11" fontWeight="700">
        S
      </text>
      <text x="6" y="64" fontSize="11" fontWeight="700">
        W
      </text>
    </svg>
  );
}

/** Unit 7 Check and reflect · embedded in HW54 */
export function Hw54CheckReflect({ onStats }: Props) {
  const [compassAns, setCompassAns] = useState<Record<string, string>>({});
  const [compassChecked, setCompassChecked] = useState(false);

  const [vocabAns, setVocabAns] = useState<Record<string, string>>({});
  const [vocabChecked, setVocabChecked] = useState(false);

  const [timeAns, setTimeAns] = useState<Record<string, string>>({});
  const [timeChecked, setTimeChecked] = useState(false);

  const [qOrderAns, setQOrderAns] = useState<Record<string, string>>({});
  const [qOrderChecked, setQOrderChecked] = useState(false);

  const [qMatchAns, setQMatchAns] = useState<Record<string, string>>({});
  const [qMatchChecked, setQMatchChecked] = useState(false);

  const [monthAns, setMonthAns] = useState<Record<string, string>>({});
  const [monthChecked, setMonthChecked] = useState(false);

  const [ordAns, setOrdAns] = useState<Record<string, string>>({});
  const [ordChecked, setOrdChecked] = useState(false);

  const [wasAns, setWasAns] = useState<Record<string, string>>({});
  const [wasChecked, setWasChecked] = useState(false);

  const [adjAns, setAdjAns] = useState<Record<string, string>>({});
  const [adjChecked, setAdjChecked] = useState(false);

  const [pastQAns, setPastQAns] = useState<Record<string, string>>({});
  const [pastQChecked, setPastQChecked] = useState(false);

  const [reflect, setReflect] = useState(() =>
    Array(reflectStatements54.length).fill(""),
  );

  const compassScore = compassGaps.filter((g) =>
    matchesAnyAnswer(compassAns[g.id] ?? "", [...g.answers]),
  ).length;

  const vocabScore = vocabAlternatives.filter((item) => {
    const picks = item.answer.map((_idx, i) => vocabAns[`${item.id}-${i}`] ?? "");
    return picks.every((p, i) => p === item.options[0][item.answer[i]]);
  }).length;

  const timeScore = timeWordGaps.filter((g) =>
    matchesAnyAnswer(timeAns[g.id] ?? "", [...g.answers]),
  ).length;

  const qOrderScore = questionWordOrder.filter(
    (q) => "example" in q && q.example || matchesAnyAnswer(qOrderAns[q.id] ?? "", [...q.answers]),
  ).length;

  const qMatchScore = questionMatchAnswers.filter(
    (m) => (qMatchAns[m.id] ?? "") === m.answer,
  ).length;

  const monthScore = monthGaps.filter((m) =>
    matchesAnyAnswer(monthAns[m.id] ?? "", [...m.answers]),
  ).length;

  const ordScore = ordinalWords.filter((o) =>
    matchesAnyAnswer(ordAns[o.id] ?? "", [...o.answers]),
  ).length;

  const wasScore = holidayWasWere.filter(
    (g) => "example" in g && g.example || matchesAnyAnswer(wasAns[g.id] ?? "", [...g.answers]),
  ).length;

  const adjScore = adjectiveChoices.filter((a) => (adjAns[a.id] ?? "") === a.answer).length;

  const pastQScore = pastQuestionOrder.filter(
    (q) => "example" in q && q.example || matchesAnyAnswer(pastQAns[q.id] ?? "", [...q.answers]),
  ).length;

  const totals = useMemo(
    () => ({
      compass: compassGaps.length,
      vocab: vocabAlternatives.length,
      time: timeWordGaps.length,
      qOrder: questionWordOrder.length,
      qMatch: questionMatchAnswers.length,
      month: monthGaps.length,
      ord: ordinalWords.length,
      was: holidayWasWere.length,
      adj: adjectiveChoices.length,
      pastQ: pastQuestionOrder.length,
    }),
    [],
  );

  const totalItems =
    totals.compass +
    totals.vocab +
    totals.time +
    totals.qOrder +
    totals.qMatch +
    totals.month +
    totals.ord +
    totals.was +
    totals.adj +
    totals.pastQ;

  const totalScore =
    compassScore +
    vocabScore +
    timeScore +
    qOrderScore +
    qMatchScore +
    monthScore +
    ordScore +
    wasScore +
    adjScore +
    pastQScore;

  const allChecked =
    compassChecked &&
    vocabChecked &&
    timeChecked &&
    qOrderChecked &&
    qMatchChecked &&
    monthChecked &&
    ordChecked &&
    wasChecked &&
    adjChecked &&
    pastQChecked;

  const reflectDone = reflect.every((r) => r !== "");

  useEffect(() => {
    onStats({ allChecked, reflectDone, score: totalScore, total: totalItems });
  }, [allChecked, reflectDone, onStats, totalItems, totalScore]);

  return (
  <>
      <section id="hw54-cr" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Check and reflect</p>
          <h2>Unit 7 review</h2>
          <p className="lesson22-section-desc">
            Compass · places · time words · questions · months · was/were · adjectives.
            Після Check заповни Reflect.
          </p>
        </div>
      </section>

      <section className="lesson22-block panel">
        <CrSectionHead kicker="1a" title="Look at the compass and complete the words" />
        <CompassRose />
        <ol className="l22-gap-list">
          {compassGaps.map((g) => {
            const val = compassAns[g.id] ?? "";
            const ok = matchesAnyAnswer(val, [...g.answers]);
            return (
              <li key={g.id}>
                {g.hint}{" "}
                <input
                  className={gapInputClass(compassChecked, val, ok)}
                  value={val}
                  onChange={(e) => {
                    setCompassChecked(false);
                    setCompassAns((p) => ({ ...p, [g.id]: e.target.value }));
                  }}
                />
              </li>
            );
          })}
        </ol>
        <CheckBar
          checked={compassChecked}
          score={compassScore}
          total={totals.compass}
          onCheck={() => setCompassChecked(true)}
          onReset={() => {
            setCompassAns({});
            setCompassChecked(false);
          }}
        />
      </section>

      <section className="lesson22-block panel">
        <CrSectionHead kicker="1b" title="Choose the correct alternatives" />
        <ol className="l22-gap-list">
          {vocabAlternatives.map((item) => (
            <li key={item.id}>
              {item.parts.map((part, pi) => (
                <span key={`${item.id}-p-${pi}`}>
                  {part}{" "}
                  {pi < item.options[0].length ? (
                    <select
                      value={vocabAns[`${item.id}-${pi}`] ?? ""}
                      className={drillSelClass(
                        vocabChecked,
                        vocabAns[`${item.id}-${pi}`] ?? "",
                        item.options[0][item.answer[pi]],
                      )}
                      onChange={(e) => {
                        setVocabChecked(false);
                        setVocabAns((p) => ({
                          ...p,
                          [`${item.id}-${pi}`]: e.target.value,
                        }));
                      }}
                    >
                      <option value="">—</option>
                      {item.options[0].map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : null}{" "}
                </span>
              ))}
            </li>
          ))}
        </ol>
        <CheckBar
          checked={vocabChecked}
          score={vocabScore}
          total={totals.vocab}
          onCheck={() => setVocabChecked(true)}
          onReset={() => {
            setVocabAns({});
            setVocabChecked(false);
          }}
        />
      </section>

      <section className="lesson22-block panel">
        <CrSectionHead
          kicker="1c"
          title="Complete the sentences"
          lead="Box: last · today · weekend · yesterday"
        />
        <ol className="l22-gap-list">
          {timeWordGaps.map((g) => {
            const val = timeAns[g.id] ?? "";
            const ok = matchesAnyAnswer(val, [...g.answers]);
            return (
              <li key={g.id}>
                {g.before}{" "}
                <input
                  className={gapInputClass(timeChecked, val, ok)}
                  value={val}
                  onChange={(e) => {
                    setTimeChecked(false);
                    setTimeAns((p) => ({ ...p, [g.id]: e.target.value }));
                  }}
                />{" "}
                {g.after}
              </li>
            );
          })}
        </ol>
        <CheckBar
          checked={timeChecked}
          score={timeScore}
          total={totals.time}
          onCheck={() => setTimeChecked(true)}
          onReset={() => {
            setTimeAns({});
            setTimeChecked(false);
          }}
        />
      </section>

      <section className="lesson22-block panel">
        <CrSectionHead kicker="2a" title="Put the words in the correct order" lead="Sentence 1 = example." />
        <ol className="l22-gap-list">
          {questionWordOrder.map((q) => {
            const val = "example" in q && q.example ? q.answers[0] : qOrderAns[q.id] ?? "";
            const ok = matchesAnyAnswer(val, [...q.answers]);
            return (
              <li key={q.id}>
                {q.id}. {q.scramble}
                <br />
                <input
                  className={gapInputClass(qOrderChecked, val, ok)}
                  style={{ width: "min(100%, 26rem)", marginTop: "0.35rem" }}
                  value={val}
                  disabled={"example" in q && Boolean(q.example)}
                  onChange={(e) => {
                    setQOrderChecked(false);
                    setQOrderAns((p) => ({ ...p, [q.id]: e.target.value }));
                  }}
                />
              </li>
            );
          })}
        </ol>
        <CheckBar
          checked={qOrderChecked}
          score={qOrderScore}
          total={totals.qOrder}
          onCheck={() => setQOrderChecked(true)}
          onReset={() => {
            setQOrderAns({});
            setQOrderChecked(false);
          }}
        />
      </section>

      <section className="lesson22-block panel">
        <CrSectionHead kicker="2b" title="Match questions 1–6 with answers a–f" />
        <ul className="l31-ex-line" style={{ marginBottom: "0.75rem" }}>
          {questionMatchOptions.map((o) => (
            <li key={o.id}>
              <strong>{o.id}</strong>) {o.text}
            </li>
          ))}
        </ul>
        <ol className="l22-gap-list">
          {questionMatchAnswers.map((m) => (
            <li key={m.id}>
              {m.id}. {m.label}{" "}
              <select
                value={qMatchAns[m.id] ?? ""}
                className={drillSelClass(qMatchChecked, qMatchAns[m.id] ?? "", m.answer)}
                onChange={(e) => {
                  setQMatchChecked(false);
                  setQMatchAns((p) => ({ ...p, [m.id]: e.target.value }));
                }}
              >
                <option value="">—</option>
                {questionMatchOptions.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.id}
                  </option>
                ))}
              </select>
            </li>
          ))}
        </ol>
        <CheckBar
          checked={qMatchChecked}
          score={qMatchScore}
          total={totals.qMatch}
          onCheck={() => setQMatchChecked(true)}
          onReset={() => {
            setQMatchAns({});
            setQMatchChecked(false);
          }}
        />
      </section>

      <section className="lesson22-block panel">
        <CrSectionHead kicker="3a" title="Months of the year" />
        <ol className="l22-gap-list">
          {monthGaps.map((m) => {
            const val = monthAns[m.id] ?? "";
            const ok = matchesAnyAnswer(val, [...m.answers]);
            return (
              <li key={m.id}>
                {m.id}. {m.hint}{" "}
                <input
                  className={gapInputClass(monthChecked, val, ok)}
                  value={val}
                  onChange={(e) => {
                    setMonthChecked(false);
                    setMonthAns((p) => ({ ...p, [m.id]: e.target.value }));
                  }}
                />
              </li>
            );
          })}
        </ol>
        <CheckBar
          checked={monthChecked}
          score={monthScore}
          total={totals.month}
          onCheck={() => setMonthChecked(true)}
          onReset={() => {
            setMonthAns({});
            setMonthChecked(false);
          }}
        />
      </section>

      <section className="lesson22-block panel">
        <CrSectionHead kicker="3b" title="Rewrite the dates as words" lead="2nd → second (example)." />
        <ol className="l22-gap-list">
          <li>2nd → <strong>second</strong> (example)</li>
          {ordinalWords.map((o) => {
            const val = ordAns[o.id] ?? "";
            const ok = matchesAnyAnswer(val, [...o.answers]);
            return (
              <li key={o.id}>
                {o.prompt} →{" "}
                <input
                  className={gapInputClass(ordChecked, val, ok)}
                  value={val}
                  onChange={(e) => {
                    setOrdChecked(false);
                    setOrdAns((p) => ({ ...p, [o.id]: e.target.value }));
                  }}
                />
              </li>
            );
          })}
        </ol>
        <CheckBar
          checked={ordChecked}
          score={ordScore}
          total={totals.ord}
          onCheck={() => setOrdChecked(true)}
          onReset={() => {
            setOrdAns({});
            setOrdChecked(false);
          }}
        />
      </section>

      <section className="lesson22-block panel">
        <CrSectionHead kicker="4" title="Complete with was, were, wasn’t or weren’t" />
        <ol className="l22-gap-list">
          {holidayWasWere.map((g) => {
            const val =
              "example" in g && g.example ? "was" : wasAns[g.id] ?? "";
            const ok = matchesAnyAnswer(val, [...g.answers]);
            return (
              <li key={g.id}>
                {g.before}{" "}
                <input
                  className={gapInputClass(wasChecked, val, ok)}
                  style={{ width: "6.5rem" }}
                  value={val}
                  disabled={"example" in g && Boolean(g.example)}
                  onChange={(e) => {
                    setWasChecked(false);
                    setWasAns((p) => ({ ...p, [g.id]: e.target.value }));
                  }}
                />{" "}
                {g.after}
              </li>
            );
          })}
        </ol>
        <CheckBar
          checked={wasChecked}
          score={wasScore}
          total={totals.was}
          onCheck={() => setWasChecked(true)}
          onReset={() => {
            setWasAns({});
            setWasChecked(false);
          }}
        />
      </section>

      <section className="lesson22-block panel">
        <CrSectionHead kicker="5" title="Choose the correct alternatives" />
        <ol className="l22-gap-list">
          {adjectiveChoices.map((a) => (
            <li key={a.id}>
              {a.before}{" "}
              <select
                value={adjAns[a.id] ?? ""}
                className={drillSelClass(adjChecked, adjAns[a.id] ?? "", a.answer)}
                onChange={(e) => {
                  setAdjChecked(false);
                  setAdjAns((p) => ({ ...p, [a.id]: e.target.value }));
                }}
              >
                <option value="">—</option>
                {a.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>{" "}
              {"after" in a ? a.after : ""}
            </li>
          ))}
        </ol>
        <CheckBar
          checked={adjChecked}
          score={adjScore}
          total={totals.adj}
          onCheck={() => setAdjChecked(true)}
          onReset={() => {
            setAdjAns({});
            setAdjChecked(false);
          }}
        />
      </section>

      <section className="lesson22-block panel">
        <CrSectionHead kicker="6a" title="Make questions" lead="1 = example." />
        <ol className="l22-gap-list">
          {pastQuestionOrder.map((q) => {
            const val = "example" in q && q.example ? q.answers[0] : pastQAns[q.id] ?? "";
            const ok = matchesAnyAnswer(val, [...q.answers]);
            return (
              <li key={q.id}>
                {q.id}. {q.scramble}
                <br />
                <input
                  className={gapInputClass(pastQChecked, val, ok)}
                  style={{ width: "min(100%, 26rem)", marginTop: "0.35rem" }}
                  value={val}
                  disabled={"example" in q && Boolean(q.example)}
                  onChange={(e) => {
                    setPastQChecked(false);
                    setPastQAns((p) => ({ ...p, [q.id]: e.target.value }));
                  }}
                />
              </li>
            );
          })}
        </ol>
        <CheckBar
          checked={pastQChecked}
          score={pastQScore}
          total={totals.pastQ}
          onCheck={() => setPastQChecked(true)}
          onReset={() => {
            setPastQAns({});
            setPastQChecked(false);
          }}
        />
      </section>

      <section id="hw54-reflect" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Reflect</p>
          <h2>How confident do you feel? (1–5)</h2>
        </div>
        <div className="hw35-reflect-list">
          {reflectStatements54.map((s, i) => (
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
  </>
  );
}

function CrSectionHead({
  kicker,
  title,
  lead,
}: {
  kicker: string;
  title: string;
  lead?: string;
}) {
  return (
    <div className="lesson22-section-head">
      <p className="page-kicker">{kicker}</p>
      <h2>{title}</h2>
      {lead ? <p className="lead">{lead}</p> : null}
    </div>
  );
}
