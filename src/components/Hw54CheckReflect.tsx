import { useEffect, useMemo } from "react";
import { HwBlockSubmit } from "./HwBlockSubmit";
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
import { useDraftState } from "../utils/useDraftState";
import "../styles/lesson25.css";
import "../styles/lesson35.css";

export type Hw54CrStats = {
  allChecked: boolean;
  reflectDone: boolean;
  score: number;
  total: number;
};

type Props = {
  onStats?: (stats: Hw54CrStats) => void;
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
  const [compassAns, setCompassAns] = useDraftState<Record<string, string>>("hw54-cr-compass", {});
  const [compassChecked, setCompassChecked] = useDraftState("hw54-cr-compass-checked", false);

  const [vocabAns, setVocabAns] = useDraftState<Record<string, string>>("hw54-cr-vocab", {});
  const [vocabChecked, setVocabChecked] = useDraftState("hw54-cr-vocab-checked", false);

  const [timeAns, setTimeAns] = useDraftState<Record<string, string>>("hw54-cr-time", {});
  const [timeChecked, setTimeChecked] = useDraftState("hw54-cr-time-checked", false);

  const [qOrderAns, setQOrderAns] = useDraftState<Record<string, string>>("hw54-cr-qorder", {});
  const [qOrderChecked, setQOrderChecked] = useDraftState("hw54-cr-qorder-checked", false);

  const [qMatchAns, setQMatchAns] = useDraftState<Record<string, string>>("hw54-cr-qmatch", {});
  const [qMatchChecked, setQMatchChecked] = useDraftState("hw54-cr-qmatch-checked", false);

  const [monthAns, setMonthAns] = useDraftState<Record<string, string>>("hw54-cr-months", {});
  const [monthChecked, setMonthChecked] = useDraftState("hw54-cr-months-checked", false);

  const [ordAns, setOrdAns] = useDraftState<Record<string, string>>("hw54-cr-dates", {});
  const [ordChecked, setOrdChecked] = useDraftState("hw54-cr-dates-checked", false);

  const [wasAns, setWasAns] = useDraftState<Record<string, string>>("hw54-cr-was", {});
  const [wasChecked, setWasChecked] = useDraftState("hw54-cr-was-checked", false);

  const [adjAns, setAdjAns] = useDraftState<Record<string, string>>("hw54-cr-adj", {});
  const [adjChecked, setAdjChecked] = useDraftState("hw54-cr-adj-checked", false);

  const [pastQAns, setPastQAns] = useDraftState<Record<string, string>>("hw54-cr-pastq", {});
  const [pastQChecked, setPastQChecked] = useDraftState("hw54-cr-pastq-checked", false);

  const [reflect, setReflect] = useDraftState<string[]>(
    "hw54-cr-reflect",
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
    onStats?.({ allChecked, reflectDone, score: totalScore, total: totalItems });
  }, [allChecked, reflectDone, onStats, totalItems, totalScore]);

  return (
  <>
      <section id="hw54-cr" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Check and reflect</p>
          <h2>Unit 7 review</h2>
          <p className="lesson22-section-desc">
            Compass · places · time words · questions · months · was/were · adjectives.
            Кожну групу можна надіслати окремо.
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
        <HwBlockSubmit
          lessonId="54"
          blockTitle="Check 1 · places and time"
          checked={compassChecked && vocabChecked && timeChecked}
          score={compassScore + vocabScore + timeScore}
          total={totals.compass + totals.vocab + totals.time}
          lines={[
            ...headed(
              "1a Compass",
              compassGaps.map((g) => {
                const val = (compassAns[g.id] ?? "").trim();
                return val ? `${g.hint} → ${val}` : "";
              }),
            ),
            ...headed(
              "1b Places",
              vocabAlternatives.map((item) => {
                const bits = item.parts.map((part, pi) => {
                  const choice =
                    pi < item.answer.length
                      ? (vocabAns[`${item.id}-${pi}`] ?? "").trim()
                      : "";
                  return choice ? `${part} ${choice}` : "";
                });
                return bits.some(Boolean) ? bits.filter(Boolean).join(" · ") : "";
              }),
            ),
            ...headed(
              "1c Time words",
              timeWordGaps.map((g) => {
                const val = (timeAns[g.id] ?? "").trim();
                return val ? `${g.before} ${val} ${g.after}` : "";
              }),
            ),
          ]}
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
        <HwBlockSubmit
          lessonId="54"
          blockTitle="Check 2 · questions"
          checked={qOrderChecked && qMatchChecked}
          score={qOrderScore + qMatchScore}
          total={totals.qOrder + totals.qMatch}
          lines={[
            ...headed(
              "2a Word order",
              questionWordOrder.map((q) => {
                const val = (
                  "example" in q && q.example ? q.answers[0] : (qOrderAns[q.id] ?? "")
                ).trim();
                return val ? `${q.scramble} → ${val}` : "";
              }),
            ),
            ...headed(
              "2b Match",
              questionMatchAnswers.map((m) => {
                const val = (qMatchAns[m.id] ?? "").trim();
                return val ? `${m.id}. ${m.label} → ${val}` : "";
              }),
            ),
          ]}
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
        <HwBlockSubmit
          lessonId="54"
          blockTitle="Check 3 · months and dates"
          checked={monthChecked && ordChecked}
          score={monthScore + ordScore}
          total={totals.month + totals.ord}
          lines={[
            ...headed(
              "3a Months",
              monthGaps.map((m) => {
                const val = (monthAns[m.id] ?? "").trim();
                return val ? `${m.hint} → ${val}` : "";
              }),
            ),
            ...headed(
              "3b Dates",
              ordinalWords.map((o) => {
                const val = (ordAns[o.id] ?? "").trim();
                return val ? `${o.prompt} → ${val}` : "";
              }),
            ),
          ]}
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
        <HwBlockSubmit
          lessonId="54"
          blockTitle="Check 4 · was/were, adjectives, questions"
          checked={wasChecked && adjChecked && pastQChecked}
          score={wasScore + adjScore + pastQScore}
          total={totals.was + totals.adj + totals.pastQ}
          lines={[
            ...headed(
              "4 was / were",
              holidayWasWere.map((g) => {
                const val = (
                  "example" in g && g.example ? "was" : (wasAns[g.id] ?? "")
                ).trim();
                return val ? `${g.before} ${val} ${g.after}` : "";
              }),
            ),
            ...headed(
              "5 Adjectives",
              adjectiveChoices.map((a) => {
                const val = (adjAns[a.id] ?? "").trim();
                return val
                  ? `${a.before} ${val}${"after" in a && a.after ? ` ${a.after}` : ""}`
                  : "";
              }),
            ),
            ...headed(
              "6a Past questions",
              pastQuestionOrder.map((q) => {
                const val = (
                  "example" in q && q.example ? q.answers[0] : (pastQAns[q.id] ?? "")
                ).trim();
                return val ? `${q.scramble} → ${val}` : "";
              }),
            ),
          ]}
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
        <HwBlockSubmit
          lessonId="54"
          blockTitle="Reflect"
          checked={reflectDone}
          lines={reflectStatements54.map((statement, i) => {
            const val = (reflect[i] ?? "").trim();
            return val ? `${statement}: ${val}` : "";
          })}
        />
      </section>
  </>
  );
}

function headed(title: string, lines: string[]): string[] {
  const filled = lines.filter(Boolean);
  return filled.length ? [title, ...filled] : [];
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
