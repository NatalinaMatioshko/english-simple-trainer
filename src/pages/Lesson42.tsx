import { useState } from "react";
import { Link } from "react-router-dom";
import LessonNumberKicker from "../components/LessonNumberKicker";
import { drillSelClass } from "../components/lesson31/drillSelClass";
import { CheckBar } from "../components/lesson38/L38Ui";
import Unit5AudioBlock from "../components/Unit5AudioBlock";
import {
  activityPics,
  doYouAlts,
  everydaySentences,
  grammarOnAt42,
  IMG42,
  mariQuestions,
  mariText,
  orderWrite42,
  partDayQuiz,
  personalizePrompts,
  picMatchOptions,
  psIForms,
  stressSentences42,
  travelChunks,
  travelGaps2b,
  travelMatchOptions,
  travelPics,
  travelSentences,
  transportPhrases2a,
  transportVerbGroups,
  leaveOpposite,
  heardQuestions3b,
  grammarDoGaps,
  doSoundPairs,
  timDonnaTable,
  u5Scripts,
  weekGaps,
  weekSchedule,
  writeQuestions42,
} from "../data/lesson42";
import { speakEnglish } from "../utils/speech";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
import "../styles/lesson26.css";
import "../styles/lesson31.css";
import "../styles/lesson35.css";
import "../styles/lesson38.css";
import "../styles/lesson42.css";

function U5ListTranscript({ lines }: { lines: readonly string[] }) {
  return (
    <ol>
      {lines.map((line) => (
        <li key={line}>{line}</li>
      ))}
    </ol>
  );
}

function U5DialogTranscript({
  lines,
}: {
  lines: readonly { who: string; text: string }[];
}) {
  return (
    <>
      {lines.map((line, i) => (
        <p key={`${line.who}-${i}`}>
          <strong>{line.who}:</strong> {line.text}
        </p>
      ))}
    </>
  );
}

function normText(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/[\u2018\u2019\u02bc']/g, "'")
    .replace(/\s+/g, " ")
    .replace(/[.!?]+$/, "");
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

/** Underline textbook phrases in Mari's text (longest match first). */
function renderUnderlined(text: string, phrases: readonly string[]) {
  const sorted = [...phrases].sort((a, b) => b.length - a.length);
  const lower = text.toLowerCase();
  const parts: { text: string; mark: boolean }[] = [];
  let i = 0;

  while (i < text.length) {
    let hit: string | null = null;
    for (const phrase of sorted) {
      if (lower.startsWith(phrase.toLowerCase(), i)) {
        // avoid matching "work" inside "don't work" when that span is already passed
        hit = text.slice(i, i + phrase.length);
        break;
      }
    }
    if (hit) {
      parts.push({ text: hit, mark: true });
      i += hit.length;
    } else {
      const last = parts[parts.length - 1];
      if (last && !last.mark) last.text += text[i];
      else parts.push({ text: text[i], mark: false });
      i += 1;
    }
  }

  return parts.map((p, idx) =>
    p.mark ? (
      <u key={idx} className="l42-u">
        {p.text}
      </u>
    ) : (
      <span key={idx}>{p.text}</span>
    ),
  );
}

export default function Lesson42() {
  const [pdIndex, setPdIndex] = useState(0);
  const [pdSelected, setPdSelected] = useState<string | null>(null);
  const [pdWrong, setPdWrong] = useState<string | null>(null);
  const pdItem = partDayQuiz[pdIndex];
  const pdDone = pdSelected === pdItem.answer;
  const pdFinished = pdIndex >= partDayQuiz.length - 1 && pdDone;

  const handlePartDayPick = (opt: string) => {
    if (pdDone) return;
    if (opt === pdItem.answer) {
      setPdWrong(null);
      setPdSelected(opt);
      speakEnglish(opt);
      return;
    }
    setPdWrong(opt);
    window.setTimeout(() => setPdWrong(null), 450);
  };

  const goNextPartDay = () => {
    if (pdIndex >= partDayQuiz.length - 1) return;
    setPdIndex((i) => i + 1);
    setPdSelected(null);
    setPdWrong(null);
  };

  const resetPartDay = () => {
    setPdIndex(0);
    setPdSelected(null);
    setPdWrong(null);
  };

  const [picAns, setPicAns] = useState(() =>
    Array(activityPics.length).fill(""),
  );
  const [picChecked, setPicChecked] = useState(false);
  const picScore = activityPics.filter(
    (p, i) => Number(picAns[i]) === p.answer,
  ).length;

  const [dayWrite, setDayWrite] = useState(() => Array(5).fill(""));
  const [weekWrite, setWeekWrite] = useState(() => Array(3).fill(""));

  const [weekReveal, setWeekReveal] = useState<Record<string, boolean>>({});

  const toggleWeekReveal = (day: string) => {
    setWeekReveal((prev) => ({ ...prev, [day]: !prev[day] }));
  };

  const [gapAns, setGapAns] = useState(() => Array(weekGaps.length).fill(""));
  const [gapChecked, setGapChecked] = useState(false);
  const gapScore = weekGaps.filter((g, i) =>
    textOk(gapAns[i], g.answers),
  ).length;

  const [mariAns, setMariAns] = useState(() =>
    Array(mariQuestions.length).fill(""),
  );
  const [mariChecked, setMariChecked] = useState(false);
  const mariScore = mariQuestions.filter((q, i) =>
    textOk(mariAns[i], q.answers),
  ).length;

  const [altAns, setAltAns] = useState(() => Array(doYouAlts.length).fill(""));
  const [altChecked, setAltChecked] = useState(false);
  const altScore = doYouAlts.filter((g, i) => altAns[i] === g.answer).length;

  const [onAtAns, setOnAtAns] = useState(() =>
    Array(grammarOnAt42.length).fill(""),
  );
  const [onAtChecked, setOnAtChecked] = useState(false);
  const onAtScore = grammarOnAt42.filter((g, i) => onAtAns[i] === g.answer)
    .length;

  const [stressSel, setStressSel] = useState<number[][]>(() =>
    stressSentences42.map((s) => (s.example ? [...s.stressed] : [])),
  );
  const [stressChecked, setStressChecked] = useState(false);
  const stressScore = stressSentences42.filter((s, i) => {
    if (s.example) return true;
    const sel = stressSel[i] ?? [];
    if (sel.length !== s.stressed.length) return false;
    return s.stressed.every((idx) => sel.includes(idx));
  }).length;

  const toggleStressWord = (rowIdx: number, wordIdx: number) => {
    if (stressSentences42[rowIdx]?.example) return;
    setStressChecked(false);
    setStressSel((prev) => {
      const next = prev.map((row) => [...row]);
      const row = next[rowIdx] ?? [];
      next[rowIdx] = row.includes(wordIdx)
        ? row.filter((i) => i !== wordIdx)
        : [...row, wordIdx].sort((a, b) => a - b);
      return next;
    });
  };

  const [qAns, setQAns] = useState(() =>
    Array(writeQuestions42.length).fill(""),
  );
  const [qChecked, setQChecked] = useState(false);
  const qScore = writeQuestions42.filter((item, i) =>
    textOk(qAns[i], item.answers),
  ).length;

  const [orderAns, setOrderAns] = useState(() =>
    Array(orderWrite42.length).fill(""),
  );
  const [orderChecked, setOrderChecked] = useState(false);
  const orderScore = orderWrite42.filter((item, i) =>
    textOk(orderAns[i], item.answers),
  ).length;

  const [trueWrite, setTrueWrite] = useState(() => Array(3).fill(""));
  const [falseWrite, setFalseWrite] = useState(() => Array(3).fill(""));

  const [travelAns, setTravelAns] = useState(() =>
    Array(travelPics.length).fill(""),
  );
  const [travelChecked, setTravelChecked] = useState(false);
  const travelScore = travelPics.filter(
    (p, i) => Number(travelAns[i]) === p.answer,
  ).length;
  const [travelFlip, setTravelFlip] = useState<number[]>([]);

  const toggleTravelFlip = (idx: number) => {
    setTravelFlip((prev) => {
      const open = prev.includes(idx);
      if (!open) speakEnglish(travelChunks[idx].en);
      return open ? prev.filter((i) => i !== idx) : [...prev, idx];
    });
  };

  const [phrase2aAns, setPhrase2aAns] = useState(() =>
    Array(transportPhrases2a.length).fill(""),
  );
  const [phrase2aChecked, setPhrase2aChecked] = useState(false);
  const phrase2aScore = transportPhrases2a.filter(
    (g, i) => phrase2aAns[i] === g.answer,
  ).length;

  const [gap2bAns, setGap2bAns] = useState(() =>
    Array(travelGaps2b.length).fill(""),
  );
  const [gap2bChecked, setGap2bChecked] = useState(false);
  const gap2bScore = travelGaps2b.filter((g, i) =>
    textOk(gap2bAns[i], g.answers),
  ).length;

  const [oppAns, setOppAns] = useState("");
  const [oppChecked, setOppChecked] = useState(false);
  const oppOk = textOk(oppAns, leaveOpposite.answers);

  const [tableAns, setTableAns] = useState(() =>
    Array(timDonnaTable.length).fill(""),
  );
  const [tableChecked, setTableChecked] = useState(false);
  const tableScore = timDonnaTable.filter((g, i) =>
    textOk(tableAns[i], g.answers),
  ).length;

  const [heardTick, setHeardTick] = useState<Record<number, boolean>>({});
  const [heardChecked, setHeardChecked] = useState(false);
  const heardScore = heardQuestions3b.filter(
    (item) => Boolean(heardTick[item.id]) === item.heard,
  ).length;

  const [doGapAns, setDoGapAns] = useState(() =>
    Array(grammarDoGaps.length).fill(""),
  );
  const [doGapChecked, setDoGapChecked] = useState(false);
  const doGapScore = grammarDoGaps.filter((g, i) =>
    textOk(doGapAns[i], g.answers),
  ).length;

  const [doSoundAns, setDoSoundAns] = useState(() =>
    Array(doSoundPairs.length).fill(""),
  );
  const [doSoundChecked, setDoSoundChecked] = useState(false);
  const doSoundScore = doSoundPairs.filter(
    (g, i) => doSoundAns[i] === g.answer,
  ).length;

  return (
    <div className="lesson22-page">
      <section className="lesson22-hero panel">
        <div className="lesson22-hero-top">
          <div>
            <LessonNumberKicker number={42} />
            <h1>My week</h1>
            <p className="lesson22-topic-pill">
              Unit 5A · Present Simple · days · routine
            </p>
            <p className="lesson22-subtitle">
              Everyday activities, days of the week, Mari&apos;s week — then how
              you travel. Speak with your teacher about{" "}
              <strong>your</strong> week.
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
              to="/lesson-41"
            >
              ← Lesson 41
            </Link>
            <Link
              className="lesson22-back-link lesson22-back-link--ghost"
              to="/hw-42"
            >
              HW 42 →
            </Link>
            <Link
              className="lesson22-back-link lesson22-back-link--ghost"
              to="/vocab"
            >
              Vocab →
            </Link>
          </div>
        </div>
        <div className="l42-hero-media">
          <img src={IMG42("mari-train.jpg")} alt="Mari on the bus" />
          <img src={IMG42("pic-e-getup.png")} alt="Get up in the morning" />
        </div>
        <div className="lesson22-hero-chips">
          <span>get up · have breakfast</span>
          <span>on Monday</span>
          <span>I work / I don&apos;t work</span>
          <span>by bus · leave · arrive</span>
        </div>
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-flow">
          <a href="#l42-parts">Parts of day</a>
          <a href="#l42-1">1 Match</a>
          <a href="#l42-2">2 Your day</a>
          <a href="#l42-3">3 Week</a>
          <a href="#l42-4">4 Gaps + write</a>
          <a href="#l42-5">5 Mari</a>
          <a href="#l42-6">6–7 Grammar</a>
          <a href="#l42-order">8 Order</a>
          <a href="#l42-truefalse">9 True/False</a>
          <a href="#l42-7">Part 2 Journey</a>
          <a href="#l42-8">6 Alternatives</a>
          <a href="#l42-9">7 Questions</a>
        </div>
      </section>

      {/* Warm-up · Choose the part of the day */}
      <section id="l42-parts" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Warm-up · Vocabulary</p>
          <h2>Parts of the day</h2>
          <p className="lesson22-section-desc">
            Подивись на картинку і обери правильне слово.
          </p>
        </div>

        <div className="l42-pd-card">
          <p className="l42-pd-prompt">Обери правильне слово</p>
          <p className="l42-pd-progress">
            {pdIndex + 1} / {partDayQuiz.length}
          </p>
          <div className="l42-pd-visual">
            <img
              key={pdItem.id}
              src={IMG42(pdItem.file)}
              alt={pdItem.alt}
              loading="lazy"
            />
          </div>
          <div className="l42-pd-options" role="group" aria-label="Choose the word">
            {pdItem.options.map((opt) => {
              const isCorrectPick = pdDone && opt === pdItem.answer;
              const isWrongPick = pdWrong === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  className={[
                    "l42-pd-opt",
                    isCorrectPick ? "is-correct" : "",
                    isWrongPick ? "is-wrong" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => handlePartDayPick(opt)}
                  disabled={pdDone}
                  aria-pressed={pdSelected === opt}
                >
                  <span>{opt}</span>
                  {isCorrectPick ? (
                    <span className="l42-pd-check" aria-hidden>
                      ✓
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>

          <div className="l42-pd-nav">
            {pdDone && !pdFinished ? (
              <button
                type="button"
                className="l25-cr-mini-btn"
                onClick={goNextPartDay}
              >
                Next →
              </button>
            ) : null}
            {pdDone ? (
              <button
                type="button"
                className="l25-cr-mini-btn"
                onClick={() => speakEnglish(pdItem.answer)}
              >
                🔊 Hear again
              </button>
            ) : null}
            {pdFinished || pdIndex > 0 ? (
              <button
                type="button"
                className="l25-cr-mini-btn"
                onClick={resetPartDay}
              >
                Restart
              </button>
            ) : null}
          </div>
          {pdFinished ? (
            <p className="l42-pd-done">Nice! All six parts of the day.</p>
          ) : null}
        </div>
      </section>

      {/* 1 · Match A–J with sentences 1–10 */}
      <section id="l42-1" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">1 · Vocabulary</p>
          <h2>Match pictures A–J with sentences 1–10</h2>
          <p className="lesson22-section-desc">
            Подивись на картинки. Обери фразу (речення) для кожної картинки.
            Жирні слова в списку — everyday activities.
          </p>
        </div>

        <ol className="l42-sentence-list">
          {everydaySentences.map((s) => (
            <li key={s.n}>
              <strong>{s.n}.</strong>{" "}
              {s.text.split(s.verb).map((part, i, arr) =>
                i < arr.length - 1 ? (
                  <span key={`${s.n}-${i}`}>
                    {part}
                    <strong className="l42-verb">{s.verb}</strong>
                  </span>
                ) : (
                  <span key={`${s.n}-${i}`}>{part}</span>
                ),
              )}
            </li>
          ))}
        </ol>

        <div className="l42-pic-grid">
          {activityPics.map((pic, i) => (
            <figure key={pic.id} className="l42-pic-card">
              <img src={IMG42(pic.file)} alt={pic.label} loading="lazy" />
              <figcaption>
                <strong>{pic.id}</strong>
                <select
                  value={picAns[i]}
                  onChange={(e) => {
                    setPicChecked(false);
                    const next = [...picAns];
                    next[i] = e.target.value;
                    setPicAns(next);
                  }}
                  className={drillSelClass(
                    picChecked,
                    picAns[i],
                    String(pic.answer),
                  )}
                  aria-label={`Picture ${pic.id} → sentence`}
                >
                  <option value="">—</option>
                  {picMatchOptions.map((o) => (
                    <option key={o.n} value={String(o.n)}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </figcaption>
            </figure>
          ))}
        </div>
        <CheckBar
          checked={picChecked}
          score={picScore}
          total={activityPics.length}
          onCheck={() => setPicChecked(true)}
          onReset={() => {
            setPicAns(Array(activityPics.length).fill(""));
            setPicChecked(false);
          }}
        />
        <button
          type="button"
          className="l25-cr-mini-btn"
          style={{ marginTop: "0.4rem" }}
          onClick={() => {
            setPicAns(activityPics.map((p) => String(p.answer)));
            setPicChecked(true);
          }}
        >
          Show answers
        </button>
      </section>

      {/* 2 · Write five sentences about your day */}
      <section id="l42-2" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">2 · Writing</p>
          <h2>Write five sentences about your day</h2>
          <p className="lesson22-section-desc">
            Використай дієслова з вправи 1. Приклад:{" "}
            <em>I get up at 7 o&apos;clock.</em> Потім прочитай їх учителю.
          </p>
        </div>
        <div className="l42-q-list">
          {dayWrite.map((val, i) => (
            <label key={i} className="l42-q-row">
              <span>{i + 1}.</span>
              <input
                type="text"
                className="l22-gap-input"
                value={val}
                onChange={(e) => {
                  const next = [...dayWrite];
                  next[i] = e.target.value;
                  setDayWrite(next);
                }}
                placeholder="I … at …"
                aria-label={`My day sentence ${i + 1}`}
              />
            </label>
          ))}
        </div>
      </section>

      {/* 3 · Week schedule listen */}
      <section id="l42-3" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">3 · Listening</p>
          <h2>Days of the week</h2>
          <p className="lesson22-section-desc">
            Послухай розклад (Unit 5 · R1). Дні виділені кольором. Фрази{" "}
            <em>Say</em> сховані — натисни, щоб відкрити.
          </p>
        </div>
        <Unit5AudioBlock
          r={1}
          exercise="5A · 5.1"
          title="Days of the week"
          transcript={<U5ListTranscript lines={u5Scripts[1]} />}
        />
        <div className="l42-week-table-wrap">
          <table className="l42-week-table">
            <thead>
              <tr>
                <th>Day</th>
                <th>Cue</th>
                <th>Say</th>
              </tr>
            </thead>
            <tbody>
              {weekSchedule.map((row) => {
                const open = Boolean(weekReveal[row.day]);
                const phrase = `On ${row.day}s, I ${row.answer}.`;
                return (
                  <tr key={row.day}>
                    <td>
                      <span
                        className={`l42-day-pill l42-day-${row.day.toLowerCase()}`}
                      >
                        {row.day}
                      </span>
                    </td>
                    <td>{row.cue}</td>
                    <td>
                      <button
                        type="button"
                        className={`l42-reveal-btn${open ? " is-open" : ""}`}
                        onClick={() => toggleWeekReveal(row.day)}
                        aria-expanded={open}
                      >
                        {open ? phrase : "Tap to show"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="l25-cr-actions" style={{ marginTop: "0.65rem" }}>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              const all: Record<string, boolean> = {};
              for (const row of weekSchedule) all[row.day] = true;
              setWeekReveal(all);
            }}
          >
            Show all
          </button>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => setWeekReveal({})}
          >
            Hide all
          </button>
        </div>
        <p className="lesson22-section-desc" style={{ marginTop: "0.75rem" }}>
          Ask your teacher: <em>What do you do on Mondays?</em> Answer about
          yourself too.
        </p>
      </section>

      {/* 4 · Gaps 3b + write 4 */}
      <section id="l42-4" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">3b · Complete</p>
          <h2>On Mondays, I …</h2>
          <p className="lesson22-section-desc">
            Look at the table again. Complete the sentences with the verbs in
            bold in exercise 1.
          </p>
        </div>

        <div className="l42-gap-list">
          {weekGaps.map((g, i) => {
            const ok = textOk(gapAns[i], g.answers);
            return (
              <div key={g.day} className="l42-gap-row">
                <span className="l42-gap-num">{i + 1}</span>
                <p className="l42-gap-line">
                  <strong>{g.dayLabel}</strong> I{" "}
                  <input
                    type="text"
                    value={gapAns[i]}
                    onChange={(e) => {
                      setGapChecked(false);
                      const next = [...gapAns];
                      next[i] = e.target.value;
                      setGapAns(next);
                    }}
                    className={inputCls(gapChecked, gapAns[i], ok)}
                    style={{ width: "7.5rem" }}
                    aria-label={`Gap ${i + 1}`}
                  />{" "}
                  {g.after}
                </p>
                {gapChecked && !ok ? (
                  <span className="hw35-tip">{g.answers[0]}</span>
                ) : null}
                {gapChecked && ok ? (
                  <button
                    type="button"
                    className="l42-gap-hear"
                    onClick={() =>
                      speakEnglish(
                        `${g.dayLabel} I ${g.answers[0]} ${g.after}`,
                      )
                    }
                    aria-label={`Hear sentence ${i + 1}`}
                  >
                    🔊
                  </button>
                ) : null}
              </div>
            );
          })}
        </div>
        <CheckBar
          checked={gapChecked}
          score={gapScore}
          total={weekGaps.length}
          onCheck={() => setGapChecked(true)}
          onReset={() => {
            setGapAns(Array(weekGaps.length).fill(""));
            setGapChecked(false);
          }}
        />
        <button
          type="button"
          className="l25-cr-mini-btn"
          style={{ marginTop: "0.4rem" }}
          onClick={() => {
            setGapAns(weekGaps.map((g) => g.answers[0]));
            setGapChecked(true);
          }}
        >
          Show answers
        </button>

        <div className="l42-gap-listen">
          <p className="lesson22-section-desc">
            <strong>3c</strong> Listen, check and repeat.
          </p>
          <Unit5AudioBlock
            r={2}
            exercise="5A · 5.2"
            title="Listen, check and repeat"
            transcript={<U5ListTranscript lines={u5Scripts[2]} />}
          />
        </div>

        <div className="l42-week-write">
          <div className="lesson22-section-head">
            <p className="page-kicker">4 · Writing</p>
            <h2>Write three sentences about your week</h2>
            <p className="lesson22-section-desc">
              Приклад: <em>On Mondays, I work in a café.</em> Потім прочитай їх
              учителю.
            </p>
          </div>
          <div className="l42-q-list">
            {weekWrite.map((val, i) => (
              <label key={i} className="l42-q-row">
                <span>{i + 1}.</span>
                <input
                  type="text"
                  className="l22-gap-input"
                  value={val}
                  onChange={(e) => {
                    const next = [...weekWrite];
                    next[i] = e.target.value;
                    setWeekWrite(next);
                  }}
                  placeholder="On …days, I …"
                  aria-label={`My week sentence ${i + 1}`}
                />
              </label>
            ))}
          </div>
        </div>
      </section>

      {/* 5 · Mari reading + personalize */}
      <section id="l42-5" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">5 · Reading</p>
          <h2>Mari&apos;s week</h2>
          <p className="lesson22-section-desc">
            <strong>5a</strong> Прочитай текст. Підкреслені місця — факти про
            Mari. Відповідай на питання.
          </p>
        </div>
        <div className="l42-mari-layout">
          <img
            className="l42-mari-photo"
            src={IMG42("mari-train.jpg")}
            alt="Mari"
          />
          <div className="l42-mari-text">
            {mariText.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>
                {renderUnderlined(p, mariText.underlines)}
              </p>
            ))}
          </div>
        </div>
        <div className="l26-drill-list" style={{ marginTop: "1rem" }}>
          {mariQuestions.map((q, i) => (
            <div key={q.id} className="hw35-fix-row">
              <p className="hw35-fix-wrong">
                <strong>{q.id}.</strong> {q.q}
              </p>
              <input
                type="text"
                value={mariAns[i]}
                onChange={(e) => {
                  setMariChecked(false);
                  const next = [...mariAns];
                  next[i] = e.target.value;
                  setMariAns(next);
                }}
                className={inputCls(
                  mariChecked,
                  mariAns[i],
                  textOk(mariAns[i], q.answers),
                )}
                placeholder="English…"
                aria-label={`Mari Q${q.id}`}
              />
              {mariChecked && !textOk(mariAns[i], q.answers) && (
                <span className="hw35-tip">{q.answers[0]}</span>
              )}
            </div>
          ))}
        </div>
        <CheckBar
          checked={mariChecked}
          score={mariScore}
          total={mariQuestions.length}
          onCheck={() => setMariChecked(true)}
          onReset={() => {
            setMariAns(Array(mariQuestions.length).fill(""));
            setMariChecked(false);
          }}
        />
        <button
          type="button"
          className="l25-cr-mini-btn"
          style={{ marginTop: "0.4rem" }}
          onClick={() => {
            setMariAns(mariQuestions.map((q) => q.answers[0]));
            setMariChecked(true);
          }}
        >
          Show answers
        </button>

        <div className="l42-5b" id="l42-5b">
          <h3 className="l22-listen-subtitle">5b · Change the text — true for you</h3>
          <p className="lesson22-section-desc">
            Візьми текст Mari і зміни підкреслені факти. Розкажи вчителю свій
            тиждень (мінімум 6 речень).
          </p>
          <ul className="l42-speak-list">
            {personalizePrompts.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <p className="lesson22-section-desc">
            Teacher questions: <em>What time do you get up?</em> ·{" "}
            <em>What do you do on Saturdays?</em> ·{" "}
            <em>Do you work at the weekend?</em>
          </p>
        </div>
      </section>

      {/* 6 · Grammar + 7a/b sentence stress */}
      <section id="l42-6" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">6 · Grammar</p>
          <h2>Present simple: I / you / we / they</h2>
          <p className="lesson22-section-desc">
            Read the grammar box and choose the correct alternatives. Use
            Exercise 5a (Mari) to help you.
          </p>
        </div>

        <div className="l42-grammar-box">
          <p className="l42-grammar-lead">
            Use the present simple to talk about routines.
          </p>
          <div className="l42-grammar-grid">
            {psIForms.map((row) => (
              <article key={row.form} className="l42-grammar-card">
                <span className="l42-grammar-form">{row.form}</span>
                <p>{row.example}</p>
              </article>
            ))}
          </div>

          <div className="l42-onat-rules">
            <p>
              Use{" "}
              <select
                value={onAtAns[0]}
                onChange={(e) => {
                  setOnAtChecked(false);
                  const next = [...onAtAns];
                  next[0] = e.target.value;
                  setOnAtAns(next);
                }}
                className={drillSelClass(
                  onAtChecked,
                  onAtAns[0],
                  grammarOnAt42[0].answer,
                )}
                aria-label="Gap 1 on or at"
              >
                <option value="">—</option>
                {grammarOnAt42[0].options.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>{" "}
              + times: I go to work{" "}
              <select
                value={onAtAns[1]}
                onChange={(e) => {
                  setOnAtChecked(false);
                  const next = [...onAtAns];
                  next[1] = e.target.value;
                  setOnAtAns(next);
                }}
                className={drillSelClass(
                  onAtChecked,
                  onAtAns[1],
                  grammarOnAt42[1].answer,
                )}
                aria-label="Gap 2 on or at"
              >
                <option value="">—</option>
                {grammarOnAt42[1].options.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>{" "}
              8 o&apos;clock.
            </p>
            <p>
              Use{" "}
              <select
                value={onAtAns[2]}
                onChange={(e) => {
                  setOnAtChecked(false);
                  const next = [...onAtAns];
                  next[2] = e.target.value;
                  setOnAtAns(next);
                }}
                className={drillSelClass(
                  onAtChecked,
                  onAtAns[2],
                  grammarOnAt42[2].answer,
                )}
                aria-label="Gap 3 on or at"
              >
                <option value="">—</option>
                {grammarOnAt42[2].options.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>{" "}
              + days:{" "}
              <select
                value={onAtAns[3]}
                onChange={(e) => {
                  setOnAtChecked(false);
                  const next = [...onAtAns];
                  next[3] = e.target.value;
                  setOnAtAns(next);
                }}
                className={drillSelClass(
                  onAtChecked,
                  onAtAns[3],
                  grammarOnAt42[3].answer,
                )}
                aria-label="Gap 4 On or At"
              >
                <option value="">—</option>
                {grammarOnAt42[3].options.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>{" "}
              Saturdays, I get up at 10 o&apos;clock.
            </p>
            <p>
              Use <em>from … to …</em> for days and times:
            </p>
            <ul className="l42-from-to">
              <li>
                <strong>From</strong> Monday <strong>to</strong> Friday, I get
                up at 7 o&apos;clock.
              </li>
              <li>
                On Wednesdays, I work <strong>from</strong> 2 o&apos;clock{" "}
                <strong>to</strong> 10 o&apos;clock.
              </li>
            </ul>
          </div>
        </div>

        <CheckBar
          checked={onAtChecked}
          score={onAtScore}
          total={grammarOnAt42.length}
          onCheck={() => setOnAtChecked(true)}
          onReset={() => {
            setOnAtAns(Array(grammarOnAt42.length).fill(""));
            setOnAtChecked(false);
          }}
        />
        <button
          type="button"
          className="l25-cr-mini-btn"
          style={{ marginTop: "0.4rem" }}
          onClick={() => {
            setOnAtAns(grammarOnAt42.map((g) => g.answer));
            setOnAtChecked(true);
          }}
        >
          Show answers
        </button>

        <div className="l42-stress-block">
          <div className="lesson22-section-head">
            <p className="page-kicker">7a · Pronunciation</p>
            <h2>Listen and underline the stressed words</h2>
            <p className="lesson22-section-desc">
              Натисни на слова з наголосом. Речення 1 — приклад з книги.
            </p>
          </div>
          <Unit5AudioBlock
            r={3}
            exercise="5A · 5.3"
            title="Sentence stress"
            transcript={<U5ListTranscript lines={u5Scripts[3]} />}
          />
          <ol className="l42-stress-list">
            {stressSentences42.map((item, rowIdx) => {
              const sel = stressSel[rowIdx] ?? [];
              const locked = item.example;
              return (
                <li key={item.id} className="l42-stress-row">
                  <span className="l42-stress-num">{item.id}.</span>
                  <p className="l42-stress-line">
                    {item.words.map((word, wi) => {
                      const on = sel.includes(wi);
                      const should = item.stressed.includes(wi);
                      let cls = "l42-stress-word";
                      if (on) cls += " is-on";
                      if (stressChecked && !locked) {
                        if (on && should) cls += " is-ok";
                        else if (on && !should) cls += " is-err";
                        else if (!on && should) cls += " is-miss";
                      }
                      if (locked && should) cls += " is-example";
                      return (
                        <button
                          key={`${item.id}-${wi}`}
                          type="button"
                          className={cls}
                          disabled={locked}
                          onClick={() => toggleStressWord(rowIdx, wi)}
                          aria-pressed={on}
                        >
                          {word}
                        </button>
                      );
                    })}
                  </p>
                </li>
              );
            })}
          </ol>
          <CheckBar
            checked={stressChecked}
            score={stressScore - 1}
            total={stressSentences42.length - 1}
            onCheck={() => setStressChecked(true)}
            onReset={() => {
              setStressSel(
                stressSentences42.map((s) =>
                  s.example ? [...s.stressed] : [],
                ),
              );
              setStressChecked(false);
            }}
          />
          <button
            type="button"
            className="l25-cr-mini-btn"
            style={{ marginTop: "0.4rem" }}
            onClick={() => {
              setStressSel(stressSentences42.map((s) => [...s.stressed]));
              setStressChecked(true);
            }}
          >
            Show answers
          </button>

          <p className="lesson22-section-desc" style={{ marginTop: "1rem" }}>
            <strong>7b</strong> Listen again and repeat.
          </p>
        </div>
      </section>

      {/* 8 · Word order — type the sentence */}
      <section id="l42-order" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">8 · Writing</p>
          <h2>Put the words in the correct order</h2>
          <p className="lesson22-section-desc">
            Склади речення зі слів і <strong>напиши його сам</strong> у полі.
            Приклад: <em>I get up at six on Mondays.</em> /{" "}
            <em>On Mondays, I get up at six.</em>
          </p>
        </div>
        <div className="l42-q-list">
          {orderWrite42.map((item, i) => {
            const val = orderAns[i];
            const ok = textOk(val, item.answers);
            return (
              <label key={item.scramble} className="l42-q-row">
                <span>
                  {i + 1}. {item.scramble}
                </span>
                <input
                  type="text"
                  className={inputCls(orderChecked, val, ok)}
                  value={val}
                  onChange={(e) => {
                    setOrderChecked(false);
                    const next = [...orderAns];
                    next[i] = e.target.value;
                    setOrderAns(next);
                  }}
                  placeholder="Write the full sentence…"
                  aria-label={`Sentence ${i + 1}`}
                />
                {orderChecked && !ok ? (
                  <span className="hw35-tip">{item.answers[0]}</span>
                ) : null}
              </label>
            );
          })}
        </div>
        <CheckBar
          checked={orderChecked}
          score={orderScore}
          total={orderWrite42.length}
          onCheck={() => setOrderChecked(true)}
          onReset={() => {
            setOrderAns(Array(orderWrite42.length).fill(""));
            setOrderChecked(false);
          }}
        />
        <button
          type="button"
          className="l25-cr-mini-btn"
          style={{ marginTop: "0.4rem" }}
          onClick={() => {
            setOrderAns(orderWrite42.map((item) => item.answers[0]));
            setOrderChecked(true);
          }}
        >
          Show answers
        </button>
      </section>

      {/* 9 · True / false about your week */}
      <section id="l42-truefalse" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">9a · Writing</p>
          <h2>Write three true and three false sentences</h2>
          <p className="lesson22-section-desc">
            Напиши три правдиві і три хибні речення про <strong>свій</strong>{" "}
            тиждень.
          </p>
        </div>

        <div className="l42-tf-grid">
          <div>
            <h3 className="l42-tf-head">True</h3>
            <div className="l42-q-list">
              {trueWrite.map((val, i) => (
                <label key={`t-${i}`} className="l42-q-row">
                  <span>{i + 1}.</span>
                  <input
                    type="text"
                    className="l22-gap-input"
                    value={val}
                    onChange={(e) => {
                      const next = [...trueWrite];
                      next[i] = e.target.value;
                      setTrueWrite(next);
                    }}
                    placeholder="I … on …"
                    aria-label={`True sentence ${i + 1}`}
                  />
                </label>
              ))}
            </div>
          </div>
          <div>
            <h3 className="l42-tf-head l42-tf-head--false">False</h3>
            <div className="l42-q-list">
              {falseWrite.map((val, i) => (
                <label key={`f-${i}`} className="l42-q-row">
                  <span>{i + 1}.</span>
                  <input
                    type="text"
                    className="l22-gap-input"
                    value={val}
                    onChange={(e) => {
                      const next = [...falseWrite];
                      next[i] = e.target.value;
                      setFalseWrite(next);
                    }}
                    placeholder="I … on …"
                    aria-label={`False sentence ${i + 1}`}
                  />
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="l42-tf-speak">
          <div className="lesson22-section-head">
            <p className="page-kicker">9b · Speaking</p>
            <h2>Read your sentences to your teacher</h2>
            <p className="lesson22-section-desc">
              Читай речення по черзі з учителем. Учитель здогадується, які з них
              false. Потім поміняйтесь ролями.
            </p>
          </div>
          <blockquote className="l42-tf-dialog">
            <p>
              <strong>A:</strong> I get up at 6 o&apos;clock on Mondays.
            </p>
            <p>
              <strong>B:</strong> That&apos;s not true!
            </p>
            <p>
              <strong>A:</strong> You&apos;re right. I get up at 7 o&apos;clock
              on Mondays.
            </p>
          </blockquote>
        </div>
      </section>

      {/* Part 2 · A long journey */}
      <section id="l42-7" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Part 2</p>
          <h2>A long journey</h2>
          <p className="lesson22-section-desc">
            Talk about how you travel to work / university.
          </p>
        </div>

        <p className="l31-ex-line">
          <strong className="l31-ex-num">1a</strong> Match photos A–G with
          sentences 1–7.
        </p>
        <ol className="l42-sentence-list">
          {travelSentences.map((s) => (
            <li key={s.n}>
              <strong>{s.n}.</strong> {s.text}
            </li>
          ))}
        </ol>
        <div className="l42-pic-grid l42-travel-pic-grid">
          {travelPics.map((pic, i) => (
            <figure key={pic.id} className="l42-pic-card">
              <img src={IMG42(pic.file)} alt={pic.label} loading="lazy" />
              <figcaption>
                <strong>{pic.id}</strong>
                <select
                  value={travelAns[i]}
                  onChange={(e) => {
                    setTravelChecked(false);
                    const next = [...travelAns];
                    next[i] = e.target.value;
                    setTravelAns(next);
                  }}
                  className={drillSelClass(
                    travelChecked,
                    travelAns[i],
                    String(pic.answer),
                  )}
                  aria-label={`Photo ${pic.id} → sentence`}
                >
                  <option value="">—</option>
                  {travelMatchOptions.map((o) => (
                    <option key={o.n} value={String(o.n)}>
                      {o.n}. {o.label}
                    </option>
                  ))}
                </select>
              </figcaption>
            </figure>
          ))}
        </div>
        <CheckBar
          checked={travelChecked}
          score={travelScore}
          total={travelPics.length}
          onCheck={() => setTravelChecked(true)}
          onReset={() => {
            setTravelAns(Array(travelPics.length).fill(""));
            setTravelChecked(false);
          }}
        />
        <button
          type="button"
          className="l25-cr-mini-btn"
          style={{ marginTop: "0.4rem" }}
          onClick={() => {
            setTravelAns(travelPics.map((p) => String(p.answer)));
            setTravelChecked(true);
          }}
        >
          Show answers
        </button>

        <p className="l31-ex-line" style={{ marginTop: "1.15rem" }}>
          <strong className="l31-ex-num">1b</strong> Listen and repeat.
        </p>
        <Unit5AudioBlock
          r={4}
          exercise="Part 2 · 1b"
          title="Travel sentences · listen and repeat"
          transcript={<U5ListTranscript lines={u5Scripts[4]} />}
        />

        <p className="l31-ex-line" style={{ marginTop: "1.15rem" }}>
          <strong className="l31-ex-num">Vocab</strong> Flip UA → English
        </p>
        <div className="l22-vocab-grid" style={{ marginTop: "0.65rem" }}>
          {travelChunks.map((c, idx) => {
            const isFlipped = travelFlip.includes(idx);
            return (
              <button
                key={c.en}
                type="button"
                className={`l22-vocab-card${isFlipped ? " l22-vocab-card--flipped" : ""}`}
                onClick={() => toggleTravelFlip(idx)}
                aria-pressed={isFlipped}
                aria-label={`${c.ua} · ${c.en}`}
              >
                <div className="l22-vocab-inner">
                  <div className="l22-vocab-face l22-vocab-front">
                    <span className="l22-vocab-label">Українською</span>
                    <strong>{c.ua}</strong>
                    <span className="l22-vocab-hint">tap → English</span>
                  </div>
                  <div className="l22-vocab-face l22-vocab-back">
                    <span className="l22-vocab-label">English</span>
                    <strong>{c.en}</strong>
                    <em>{c.example}</em>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <p className="l31-ex-line" style={{ marginTop: "1rem" }}>
          <strong className="l31-ex-num">1c</strong> Which sentences in 1a are
          true for you? Tell your teacher.
        </p>

        <p className="l31-ex-line" style={{ marginTop: "1.25rem" }}>
          <strong className="l31-ex-num">2a</strong> Complete transport phrases
          1–3 with verbs a–c. Use Exercise 1a to help you.
        </p>
        <div className="l42-verb-groups">
          {transportVerbGroups.map((g) => (
            <span key={g.id} className="l42-verb-group">
              <strong>{g.id}</strong> {g.label}
            </span>
          ))}
        </div>
        <div className="l26-drill-list" style={{ marginTop: "0.65rem" }}>
          {transportPhrases2a.map((g, i) => (
            <div key={g.id} className="l26-drill-row">
              <strong className="l26-drill-prompt">
                {g.id}.{" "}
                <select
                  value={phrase2aAns[i]}
                  onChange={(e) => {
                    setPhrase2aChecked(false);
                    const next = [...phrase2aAns];
                    next[i] = e.target.value;
                    setPhrase2aAns(next);
                  }}
                  className={drillSelClass(
                    phrase2aChecked,
                    phrase2aAns[i],
                    g.answer,
                  )}
                  aria-label={`Phrase ${g.id} verb group`}
                >
                  <option value="">—</option>
                  {transportVerbGroups.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.id}. {opt.label}
                    </option>
                  ))}
                </select>{" "}
                {g.after}
              </strong>
              {phrase2aChecked && phrase2aAns[i] !== g.answer ? (
                <span className="hw35-tip">{g.answerLabel}</span>
              ) : null}
            </div>
          ))}
        </div>
        <CheckBar
          checked={phrase2aChecked}
          score={phrase2aScore}
          total={transportPhrases2a.length}
          onCheck={() => setPhrase2aChecked(true)}
          onReset={() => {
            setPhrase2aAns(Array(transportPhrases2a.length).fill(""));
            setPhrase2aChecked(false);
          }}
        />
        <button
          type="button"
          className="l25-cr-mini-btn"
          style={{ marginTop: "0.4rem" }}
          onClick={() => {
            setPhrase2aAns(transportPhrases2a.map((g) => g.answer));
            setPhrase2aChecked(true);
          }}
        >
          Show answers
        </button>

        <p className="l31-ex-line" style={{ marginTop: "1.25rem" }}>
          <strong className="l31-ex-num">2b</strong> Complete the sentences.
        </p>
        <div className="l42-gap-list">
          {travelGaps2b.map((g, i) => {
            const ok = textOk(gap2bAns[i], g.answers);
            return (
              <div key={g.id} className="l42-gap-row">
                <span className="l42-gap-num">{g.id}</span>
                <p className="l42-gap-line">
                  {g.before}{" "}
                  <input
                    type="text"
                    value={gap2bAns[i]}
                    onChange={(e) => {
                      setGap2bChecked(false);
                      const next = [...gap2bAns];
                      next[i] = e.target.value;
                      setGap2bAns(next);
                    }}
                    className={inputCls(gap2bChecked, gap2bAns[i], ok)}
                    style={{ width: "6.5rem" }}
                    aria-label={`Gap 2b ${g.id}`}
                  />{" "}
                  {g.after}
                </p>
                {gap2bChecked && !ok ? (
                  <span className="hw35-tip">{g.answers[0]}</span>
                ) : null}
              </div>
            );
          })}
        </div>
        <CheckBar
          checked={gap2bChecked}
          score={gap2bScore}
          total={travelGaps2b.length}
          onCheck={() => setGap2bChecked(true)}
          onReset={() => {
            setGap2bAns(Array(travelGaps2b.length).fill(""));
            setGap2bChecked(false);
          }}
        />
        <button
          type="button"
          className="l25-cr-mini-btn"
          style={{ marginTop: "0.4rem" }}
          onClick={() => {
            setGap2bAns(travelGaps2b.map((g) => g.answers[0]));
            setGap2bChecked(true);
          }}
        >
          Show answers
        </button>

        <p className="l31-ex-line" style={{ marginTop: "1.25rem" }}>
          <strong className="l31-ex-num">2c</strong> Read the sentences in 2b
          again. What is the opposite of <em>leave</em>?
        </p>
        <label className="l42-q-row" style={{ marginTop: "0.5rem" }}>
          <span>→</span>
          <input
            type="text"
            className={inputCls(oppChecked, oppAns, oppOk)}
            value={oppAns}
            onChange={(e) => {
              setOppChecked(false);
              setOppAns(e.target.value);
            }}
            placeholder="Write the opposite…"
            aria-label="Opposite of leave"
          />
          {oppChecked && !oppOk ? (
            <span className="hw35-tip">{leaveOpposite.tip}</span>
          ) : null}
        </label>
        <CheckBar
          checked={oppChecked}
          score={oppOk ? 1 : 0}
          total={1}
          onCheck={() => setOppChecked(true)}
          onReset={() => {
            setOppAns("");
            setOppChecked(false);
          }}
        />
        <button
          type="button"
          className="l25-cr-mini-btn"
          style={{ marginTop: "0.4rem" }}
          onClick={() => {
            setOppAns(leaveOpposite.tip);
            setOppChecked(true);
          }}
        >
          Show answer
        </button>

        <p className="l31-ex-line" style={{ marginTop: "1.35rem" }}>
          <strong className="l31-ex-num">3a</strong> Listen and complete the
          table.
        </p>
        <Unit5AudioBlock
          r={5}
          exercise="Part 2 · 3a"
          title="Donna and Tim · travel to work"
          transcript={<U5DialogTranscript lines={u5Scripts[5]} />}
        />
        <div className="l42-tim-donna">
          <div className="l42-td-col">
            <h3 className="l42-td-head">Tim</h3>
            {timDonnaTable
              .filter((r) => r.who === "Tim")
              .map((row) => {
                const i = timDonnaTable.findIndex((r) => r.id === row.id);
                const ok = textOk(tableAns[i], row.answers);
                return (
                  <label key={row.id} className="l42-td-row">
                    <span>
                      <strong className="l42-td-n">{row.id}.</strong>{" "}
                      {row.label}
                    </span>
                    <input
                      type="text"
                      className={inputCls(tableChecked, tableAns[i], ok)}
                      value={tableAns[i]}
                      onChange={(e) => {
                        setTableChecked(false);
                        const next = [...tableAns];
                        next[i] = e.target.value;
                        setTableAns(next);
                      }}
                      aria-label={`Tim gap ${row.id}`}
                    />
                    {tableChecked && !ok ? (
                      <span className="hw35-tip">{row.answers[0]}</span>
                    ) : null}
                  </label>
                );
              })}
          </div>
          <div className="l42-td-col">
            <h3 className="l42-td-head">Donna</h3>
            {timDonnaTable
              .filter((r) => r.who === "Donna")
              .map((row) => {
                const i = timDonnaTable.findIndex((r) => r.id === row.id);
                const ok = textOk(tableAns[i], row.answers);
                return (
                  <label key={row.id} className="l42-td-row">
                    <span>
                      <strong className="l42-td-n">{row.id}.</strong>{" "}
                      {row.label}
                    </span>
                    <input
                      type="text"
                      className={inputCls(tableChecked, tableAns[i], ok)}
                      value={tableAns[i]}
                      onChange={(e) => {
                        setTableChecked(false);
                        const next = [...tableAns];
                        next[i] = e.target.value;
                        setTableAns(next);
                      }}
                      aria-label={`Donna gap ${row.id}`}
                    />
                    {tableChecked && !ok ? (
                      <span className="hw35-tip">{row.answers[0]}</span>
                    ) : null}
                  </label>
                );
              })}
          </div>
        </div>
        <CheckBar
          checked={tableChecked}
          score={tableScore}
          total={timDonnaTable.length}
          onCheck={() => setTableChecked(true)}
          onReset={() => {
            setTableAns(Array(timDonnaTable.length).fill(""));
            setTableChecked(false);
          }}
        />
        <button
          type="button"
          className="l25-cr-mini-btn"
          style={{ marginTop: "0.4rem" }}
          onClick={() => {
            setTableAns(timDonnaTable.map((g) => g.answers[0]));
            setTableChecked(true);
          }}
        >
          Show answers
        </button>

        <p className="l31-ex-line" style={{ marginTop: "1.25rem" }}>
          <strong className="l31-ex-num">3b</strong> Listen again. Tick the
          questions you hear.
        </p>
        <div className="l42-heard-list">
          {heardQuestions3b.map((item) => {
            const on = Boolean(heardTick[item.id]);
            const wrong = heardChecked && on !== item.heard;
            return (
              <label
                key={item.id}
                className={`l42-heard-row${wrong ? " is-err" : ""}${
                  heardChecked && on === item.heard && item.heard ? " is-ok" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={on}
                  onChange={() => {
                    setHeardChecked(false);
                    setHeardTick((prev) => ({
                      ...prev,
                      [item.id]: !prev[item.id],
                    }));
                  }}
                />
                <span>
                  {item.id}. {item.q}
                </span>
                {heardChecked && wrong ? (
                  <span className="hw35-tip">
                    {item.heard ? "You hear this" : "Not in the audio"}
                  </span>
                ) : null}
              </label>
            );
          })}
        </div>
        <CheckBar
          checked={heardChecked}
          score={heardScore}
          total={heardQuestions3b.length}
          onCheck={() => setHeardChecked(true)}
          onReset={() => {
            setHeardTick({});
            setHeardChecked(false);
          }}
        />
        <button
          type="button"
          className="l25-cr-mini-btn"
          style={{ marginTop: "0.4rem" }}
          onClick={() => {
            const next: Record<number, boolean> = {};
            for (const item of heardQuestions3b) next[item.id] = item.heard;
            setHeardTick(next);
            setHeardChecked(true);
          }}
        >
          Show answers
        </button>

        <p className="l31-ex-line" style={{ marginTop: "1.35rem" }}>
          <strong className="l31-ex-num">4</strong> Read and complete the
          grammar box. Use Exercise 3b to help you.
        </p>
        <div className="l42-do-box">
          <h3 className="l42-do-title">
            Present simple questions: I / you / we / they
          </h3>
          <div className="l42-do-grid">
            <div>
              <p className="l42-do-label">Question</p>
              <p className="l42-do-line">
                <strong className="l42-td-n">1.</strong>{" "}
                <input
                  type="text"
                  value={doGapAns[0]}
                  onChange={(e) => {
                    setDoGapChecked(false);
                    const next = [...doGapAns];
                    next[0] = e.target.value;
                    setDoGapAns(next);
                  }}
                  className={inputCls(
                    doGapChecked,
                    doGapAns[0],
                    textOk(doGapAns[0], grammarDoGaps[0].answers),
                  )}
                  style={{ width: "4.5rem" }}
                  aria-label="Grammar gap 1"
                />{" "}
                I / you / we / they <strong>drive</strong> to work?
              </p>
            </div>
            <div>
              <p className="l42-do-label">Short answer</p>
              <p className="l42-do-line">
                + Yes, I / you / we / they{" "}
                <strong className="l42-td-n">2.</strong>{" "}
                <input
                  type="text"
                  value={doGapAns[1]}
                  onChange={(e) => {
                    setDoGapChecked(false);
                    const next = [...doGapAns];
                    next[1] = e.target.value;
                    setDoGapAns(next);
                  }}
                  className={inputCls(
                    doGapChecked,
                    doGapAns[1],
                    textOk(doGapAns[1], grammarDoGaps[1].answers),
                  )}
                  style={{ width: "4.5rem" }}
                  aria-label="Grammar gap 2"
                />
                .
              </p>
              <p className="l42-do-line">
                − No, I / you / we / they{" "}
                <strong className="l42-td-n">3.</strong>{" "}
                <input
                  type="text"
                  value={doGapAns[2]}
                  onChange={(e) => {
                    setDoGapChecked(false);
                    const next = [...doGapAns];
                    next[2] = e.target.value;
                    setDoGapAns(next);
                  }}
                  className={inputCls(
                    doGapChecked,
                    doGapAns[2],
                    textOk(doGapAns[2], grammarDoGaps[2].answers),
                  )}
                  style={{ width: "4.5rem" }}
                  aria-label="Grammar gap 3"
                />
                .
              </p>
            </div>
          </div>
          <p className="l42-do-label" style={{ marginTop: "0.85rem" }}>
            with question words
          </p>
          <div className="l42-do-wh">
            {[3, 4, 5].map((idx) => {
              const g = grammarDoGaps[idx];
              const ok = textOk(doGapAns[idx], g.answers);
              return (
                <p key={g.id} className="l42-do-line">
                  <strong className="l42-td-n">{g.id}.</strong> {g.before}{" "}
                  <input
                    type="text"
                    value={doGapAns[idx]}
                    onChange={(e) => {
                      setDoGapChecked(false);
                      const next = [...doGapAns];
                      next[idx] = e.target.value;
                      setDoGapAns(next);
                    }}
                    className={inputCls(doGapChecked, doGapAns[idx], ok)}
                    style={{ width: "4.5rem" }}
                    aria-label={`Grammar gap ${g.id}`}
                  />{" "}
                  {g.after}
                  {g.id === 4 ? (
                    <span className="l42-do-ans"> I cycle.</span>
                  ) : null}
                  {g.id === 5 ? (
                    <span className="l42-do-ans"> At 6.00.</span>
                  ) : null}
                  {g.id === 6 ? (
                    <span className="l42-do-ans"> At 8.00.</span>
                  ) : null}
                  {doGapChecked && !ok ? (
                    <span className="hw35-tip">{g.answers[0]}</span>
                  ) : null}
                </p>
              );
            })}
          </div>
          {doGapChecked &&
            [0, 1, 2].map((idx) =>
              !textOk(doGapAns[idx], grammarDoGaps[idx].answers) ? (
                <span key={idx} className="hw35-tip" style={{ display: "block" }}>
                  {grammarDoGaps[idx].id}. {grammarDoGaps[idx].answers[0]}
                </span>
              ) : null,
            )}
        </div>
        <CheckBar
          checked={doGapChecked}
          score={doGapScore}
          total={grammarDoGaps.length}
          onCheck={() => setDoGapChecked(true)}
          onReset={() => {
            setDoGapAns(Array(grammarDoGaps.length).fill(""));
            setDoGapChecked(false);
          }}
        />
        <button
          type="button"
          className="l25-cr-mini-btn"
          style={{ marginTop: "0.4rem" }}
          onClick={() => {
            setDoGapAns(grammarDoGaps.map((g) => g.answers[0]));
            setDoGapChecked(true);
          }}
        >
          Show answers
        </button>

        <p className="l31-ex-line" style={{ marginTop: "1.35rem" }}>
          <strong className="l31-ex-num">5</strong> Listen to the conversations.
          Do the words in blue sound the same or different?
        </p>
        <Unit5AudioBlock
          r={6}
          exercise="Part 2 · 5"
          title="Do / do · same or different?"
          transcript={<U5DialogTranscript lines={u5Scripts[6]} />}
        />
        <div className="l42-do-sound-list">
          {doSoundPairs.map((item, i) => (
            <div key={item.id} className="l42-do-sound-card">
              <p>
                <strong>{item.id}.</strong> A:{" "}
                {item.a.split(item.blueA).map((part, pi, arr) =>
                  pi < arr.length - 1 ? (
                    <span key={`${item.id}-a-${pi}`}>
                      {part}
                      <span className="l42-blue">{item.blueA}</span>
                    </span>
                  ) : (
                    <span key={`${item.id}-a-${pi}`}>{part}</span>
                  ),
                )}
              </p>
              <p>
                B:{" "}
                {item.b.split(item.blueB).map((part, pi, arr) =>
                  pi < arr.length - 1 ? (
                    <span key={`${item.id}-b-${pi}`}>
                      {part}
                      <span className="l42-blue">{item.blueB}</span>
                    </span>
                  ) : (
                    <span key={`${item.id}-b-${pi}`}>{part}</span>
                  ),
                )}
              </p>
              <label className="l42-do-sound-pick">
                <select
                  value={doSoundAns[i]}
                  onChange={(e) => {
                    setDoSoundChecked(false);
                    const next = [...doSoundAns];
                    next[i] = e.target.value;
                    setDoSoundAns(next);
                  }}
                  className={drillSelClass(
                    doSoundChecked,
                    doSoundAns[i],
                    item.answer,
                  )}
                  aria-label={`Same or different ${item.id}`}
                >
                  <option value="">—</option>
                  <option value="same">same</option>
                  <option value="different">different</option>
                </select>
              </label>
            </div>
          ))}
        </div>
        <p className="lesson22-section-desc">
          Tip: у питанні <em>Do</em> часто слабке (/də/), у відповіді{" "}
          <em>do</em> — сильне (/duː/).
        </p>
        <CheckBar
          checked={doSoundChecked}
          score={doSoundScore}
          total={doSoundPairs.length}
          onCheck={() => setDoSoundChecked(true)}
          onReset={() => {
            setDoSoundAns(Array(doSoundPairs.length).fill(""));
            setDoSoundChecked(false);
          }}
        />
        <button
          type="button"
          className="l25-cr-mini-btn"
          style={{ marginTop: "0.4rem" }}
          onClick={() => {
            setDoSoundAns(doSoundPairs.map((g) => g.answer));
            setDoSoundChecked(true);
          }}
        >
          Show answers
        </button>
      </section>

      {/* 6 · Choose alternatives */}
      <section id="l42-8" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">6 · Grammar</p>
          <h2>Choose the correct alternatives</h2>
          <p className="lesson22-section-desc">
            Обери правильний варіант у діалогах.
          </p>
        </div>
        <div className="l26-drill-list" style={{ marginTop: "0.85rem" }}>
          {doYouAlts.map((g, i) => (
            <div key={g.id} className="l26-drill-row">
              <strong className="l26-drill-prompt">
                {g.id}. {g.before}{" "}
                <select
                  value={altAns[i]}
                  onChange={(e) => {
                    setAltChecked(false);
                    const next = [...altAns];
                    next[i] = e.target.value;
                    setAltAns(next);
                  }}
                  className={drillSelClass(altChecked, altAns[i], g.answer)}
                  aria-label={`Alt ${g.id}`}
                >
                  <option value="">—</option>
                  {g.options.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>{" "}
                {g.after}
              </strong>
            </div>
          ))}
        </div>
        <CheckBar
          checked={altChecked}
          score={altScore}
          total={doYouAlts.length}
          onCheck={() => setAltChecked(true)}
          onReset={() => {
            setAltAns(Array(doYouAlts.length).fill(""));
            setAltChecked(false);
          }}
        />
        <button
          type="button"
          className="l25-cr-mini-btn"
          style={{ marginTop: "0.4rem" }}
          onClick={() => {
            setAltAns(doYouAlts.map((g) => g.answer));
            setAltChecked(true);
          }}
        >
          Show answers
        </button>
      </section>

      {/* 7 · Write questions */}
      <section id="l42-9" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">7a · Writing</p>
          <h2>Put the words in the correct order</h2>
          <p className="lesson22-section-desc">
            Склади питання і <strong>напиши його сам</strong>. Приклад:{" "}
            <em>What time do you leave home?</em>
          </p>
        </div>
        <div className="l42-q-list">
          {writeQuestions42.map((item, i) => {
            const val = qAns[i];
            const ok = textOk(val, item.answers);
            return (
              <label key={item.scramble} className="l42-q-row">
                <span>
                  {i + 1}. {item.scramble}
                </span>
                <input
                  type="text"
                  className={inputCls(qChecked, val, ok)}
                  value={val}
                  onChange={(e) => {
                    setQChecked(false);
                    const next = [...qAns];
                    next[i] = e.target.value;
                    setQAns(next);
                  }}
                  placeholder="Write the full question…"
                  aria-label={`Question ${i + 1}`}
                />
                {qChecked && !ok ? (
                  <span className="hw35-tip">{item.answers[0]}</span>
                ) : null}
              </label>
            );
          })}
        </div>
        <CheckBar
          checked={qChecked}
          score={qScore}
          total={writeQuestions42.length}
          onCheck={() => setQChecked(true)}
          onReset={() => {
            setQAns(Array(writeQuestions42.length).fill(""));
            setQChecked(false);
          }}
        />
        <button
          type="button"
          className="l25-cr-mini-btn"
          style={{ marginTop: "0.4rem" }}
          onClick={() => {
            setQAns(writeQuestions42.map((item) => item.answers[0]));
            setQChecked(true);
          }}
        >
          Show answers
        </button>

        <div className="l42-tf-speak">
          <div className="lesson22-section-head">
            <p className="page-kicker">7b · Speaking</p>
            <h2>Ask and answer with your teacher</h2>
            <p className="lesson22-section-desc">
              Задай учителю питання з 7a і відповідай сам про свій шлях на
              роботу / університет.
            </p>
          </div>
          <blockquote className="l42-tf-dialog">
            <p>
              <strong>A:</strong> What time do you leave home?
            </p>
            <p>
              <strong>B:</strong> I leave home at 8.00 from Monday to Friday.
            </p>
          </blockquote>
        </div>
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Exit</p>
          <h2>Done for today</h2>
          <p className="lesson22-section-desc">
            Ти можеш сказати: коли встаєш, що робиш у будні / на вихідних, як
            добираєшся і о котрій виходиш / прибуваєш.
          </p>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          <Link className="l25-cr-mini-btn" to="/lesson-41">
            ← Lesson 41
          </Link>
          <Link className="l25-cr-mini-btn" to="/hw-42">
            HW 42
          </Link>
          <Link className="l25-cr-mini-btn" to="/vocab">
            Vocab
          </Link>
          <Link className="l25-cr-mini-btn" to="/">
            Roadmap
          </Link>
        </div>
      </section>
    </div>
  );
}
