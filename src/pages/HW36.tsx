import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { HomeworkSubmit } from "../components/HomeworkSubmit";
import WordOrderBoard, {
  initWordOrderRows,
} from "../components/lesson31/WordOrderBoard";
import { drillSelClass } from "../components/lesson31/drillSelClass";
import { hw36At, hw36Time, hw36To } from "../data/hw36";
import {
  doDont,
  listenQuiz,
  speakPrompts,
  VIDEO_ID,
  videoGaps,
  wordOrder36,
} from "../data/lesson36";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
import "../styles/lesson26.css";
import "../styles/lesson31.css";

type SelectItem = {
  id: string;
  prompt: string;
  options: readonly string[];
  answer: string;
};

function SelectCheck({
  items,
  ans,
  setAns,
  checked,
  setChecked,
  aria,
}: {
  items: readonly SelectItem[];
  ans: string[];
  setAns: (next: string[]) => void;
  checked: boolean;
  setChecked: (v: boolean) => void;
  aria: string;
}) {
  const score = items.filter((q, i) => ans[i] === q.answer).length;
  return (
    <>
      <div className="l26-drill-list">
        {items.map((q, i) => (
          <div key={q.id} className="l26-drill-row">
            <strong className="l26-drill-prompt">
              {i + 1}. {q.prompt}
            </strong>
            <span className="l26-drill-arrow" aria-hidden="true">
              →
            </span>
            <select
              value={ans[i]}
              onChange={(e) => {
                setChecked(false);
                const next = [...ans];
                next[i] = e.target.value;
                setAns(next);
              }}
              className={drillSelClass(checked, ans[i], q.answer)}
              aria-label={`${aria} ${i + 1}`}
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
            setAns(items.map((q) => q.answer));
            setChecked(true);
          }}
        >
          Show answers
        </button>
        <button
          type="button"
          className="l25-cr-mini-btn"
          onClick={() => {
            setAns(Array(items.length).fill(""));
            setChecked(false);
          }}
        >
          Reset
        </button>
      </div>
    </>
  );
}

function wordOrderScore(
  items: typeof wordOrder36,
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

export default function HW36() {
  const [listenAns, setListenAns] = useState(() =>
    Array(listenQuiz.length).fill(""),
  );
  const [listenChecked, setListenChecked] = useState(false);

  const [gapAns, setGapAns] = useState(() => Array(videoGaps.length).fill(""));
  const [gapChecked, setGapChecked] = useState(false);

  const [doAns, setDoAns] = useState(() => Array(doDont.length).fill(""));
  const [doChecked, setDoChecked] = useState(false);

  const [orderRows, setOrderRows] = useState(() =>
    initWordOrderRows(wordOrder36),
  );
  const [orderChecked, setOrderChecked] = useState(false);

  const [speakAns, setSpeakAns] = useState(() =>
    Array(speakPrompts.length).fill(""),
  );

  const [atAns, setAtAns] = useState(() => Array(hw36At.length).fill(""));
  const [atChecked, setAtChecked] = useState(false);

  const [toAns, setToAns] = useState(() => Array(hw36To.length).fill(""));
  const [toChecked, setToChecked] = useState(false);

  const [timeAns, setTimeAns] = useState(() => Array(hw36Time.length).fill(""));
  const [timeChecked, setTimeChecked] = useState(false);

  const [draft, setDraft] = useState("");

  const listenScore = listenQuiz.filter(
    (q, i) => listenAns[i] === q.answer,
  ).length;
  const gapScore = videoGaps.filter((g, i) => gapAns[i] === g.answer).length;
  const doScore = doDont.filter((q, i) => doAns[i] === q.answer).length;
  const orderScore = wordOrderScore(wordOrder36, orderRows);
  const speakDone = speakAns.every((a) => a.trim().length > 0);
  const atScore = hw36At.filter((q, i) => atAns[i] === q.answer).length;
  const toScore = hw36To.filter((q, i) => toAns[i] === q.answer).length;
  const timeScore = hw36Time.filter((q, i) => timeAns[i] === q.answer).length;

  const checks = useMemo(
    () => ({
      listen: listenChecked,
      gaps: gapChecked,
      doDont: doChecked,
      wordOrder: orderChecked,
      speaking: speakDone,
      at: atChecked,
      to: toChecked,
      time: timeChecked,
    }),
    [
      listenChecked,
      gapChecked,
      doChecked,
      orderChecked,
      speakDone,
      atChecked,
      toChecked,
      timeChecked,
    ],
  );

  const allDone = Object.values(checks).every(Boolean);
  const totalScore =
    listenScore + gapScore + doScore + orderScore + atScore + toScore + timeScore;
  const totalItems =
    listenQuiz.length +
    videoGaps.length +
    doDont.length +
    wordOrder36.length +
    hw36At.length +
    hw36To.length +
    hw36Time.length;

  return (
    <div className="lesson22-page">
      <section className="lesson22-hero panel">
        <div className="lesson22-hero-top">
          <div>
            <p className="page-kicker">Homework · Lesson 36</p>
            <h1>Present Simple · daily verbs</h1>
            <p className="lesson22-subtitle">
              Ті самі завдання з уроку: відео ELLLO A1-04, listening, complete,
              do / don&apos;t, word order і відповіді про свою рутину. Плюс
              перевірка <strong>at</strong>, <strong>to</strong> (to do) і{" "}
              <strong>час</strong>.
            </p>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <Link className="lesson22-back-link" to="/lesson-36">
              ← Lesson 36
            </Link>
            <Link className="lesson22-back-link" to="/lessons">
              ← Back to lessons
            </Link>
          </div>
        </div>
        <div className="lesson22-hero-chips">
          <span>get up at 6</span>
          <span>teach math</span>
          <span>fix bikes</span>
          <span>play soccer</span>
          <span>do / don&apos;t</span>
          <span>at / to</span>
          <span>in the morning</span>
        </div>
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-flow">
          <a href="#hw36-video">Video</a>
          <a href="#hw36-listen">1 Listening</a>
          <a href="#hw36-gaps">2 Complete</a>
          <a href="#hw36-do">3 do / don&apos;t</a>
          <a href="#hw36-order">4 Word order</a>
          <a href="#hw36-speak">5 Speaking</a>
          <a href="#hw36-check">Check · at / to / time</a>
          <a href="#hw36-submit">Submit</a>
        </div>
      </section>

      <section id="hw36-video" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Video · ELLLO A1-04</p>
          <h2>Verbs in the Present Simple</h2>
          <p className="lesson22-section-desc">
            Подивись відео. Чотири короткі розмови: morning, work, lunch,
            weekend. Потім виконай вправи.
          </p>
        </div>
        <div className="l22-video-wrap">
          <iframe
            src={`https://www.youtube.com/embed/${VIDEO_ID}`}
            title="Beginner English Listening Quiz — Verbs in the Present Simple"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
        <div className="l25-conf-card" style={{ maxWidth: 640 }}>
          <div className="l25-conf-header">Remember</div>
          <div className="l25-conf-fields">
            <p
              style={{
                margin: 0,
                fontSize: "var(--text-sm)",
                lineHeight: 1.55,
              }}
            >
              <strong>I / you / we / they</strong> + verb: I{" "}
              <strong>get</strong> up. They <strong>play</strong> soccer.
              <br />
              Questions: <em>What do you do?</em> · <em>When do you get up?</em>
              <br />
              Negative: I <strong>don&apos;t</strong> work at a shop.
            </p>
          </div>
        </div>
      </section>

      <section id="hw36-listen" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">1 · Listening quiz</p>
          <h2>Answer from the video</h2>
          <p className="lesson22-section-desc">
            Послухай ще раз і обери правильну відповідь.
          </p>
        </div>
        <div className="l26-drill-list">
          {listenQuiz.map((q, i) => (
            <div key={q.id} className="l26-drill-row">
              <strong className="l26-drill-prompt">
                {q.id}. {q.prompt}
              </strong>
              <span className="l26-drill-arrow" aria-hidden="true">
                →
              </span>
              <select
                value={listenAns[i]}
                onChange={(e) => {
                  setListenChecked(false);
                  const next = [...listenAns];
                  next[i] = e.target.value;
                  setListenAns(next);
                }}
                className={drillSelClass(listenChecked, listenAns[i], q.answer)}
                aria-label={q.prompt}
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
            onClick={() => setListenChecked(true)}
          >
            Check
          </button>
          {listenChecked && (
            <span className="l22-score">
              {listenScore} / {listenQuiz.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setListenAns(listenQuiz.map((q) => q.answer));
              setListenChecked(true);
            }}
          >
            Show answers
          </button>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setListenAns(Array(listenQuiz.length).fill(""));
              setListenChecked(false);
            }}
          >
            Reset
          </button>
        </div>
      </section>

      <section id="hw36-gaps" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">2 · Complete</p>
          <h2>Complete the sentences</h2>
          <p className="lesson22-section-desc">
            Обери слово з діалогів. Це речення з відео.
          </p>
        </div>
        <div className="l26-drill-list">
          {videoGaps.map((g, i) => (
            <div
              key={g.id}
              className="l26-drill-row"
              style={{ flexWrap: "wrap", gap: "0.35rem" }}
            >
              <strong className="l26-drill-prompt">
                {i + 1}. {g.before}
              </strong>
              <select
                value={gapAns[i]}
                onChange={(e) => {
                  setGapChecked(false);
                  const next = [...gapAns];
                  next[i] = e.target.value;
                  setGapAns(next);
                }}
                className={drillSelClass(gapChecked, gapAns[i], g.answer)}
                aria-label={`Sentence ${i + 1}`}
              >
                <option value="">___</option>
                {g.options.map((o) => (
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
            onClick={() => setGapChecked(true)}
          >
            Check
          </button>
          {gapChecked && (
            <span className="l22-score">
              {gapScore} / {videoGaps.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setGapAns(videoGaps.map((g) => g.answer));
              setGapChecked(true);
            }}
          >
            Show answers
          </button>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setGapAns(Array(videoGaps.length).fill(""));
              setGapChecked(false);
            }}
          >
            Reset
          </button>
        </div>
      </section>

      <section id="hw36-do" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">3 · Grammar</p>
          <h2>do / don&apos;t / does</h2>
          <p className="lesson22-section-desc">
            Обери правильну форму. I / you / we / they →{" "}
            <strong>do / don&apos;t</strong>. He / she / it →{" "}
            <strong>does / doesn&apos;t</strong> + verb-s.
          </p>
        </div>
        <div className="l26-drill-list">
          {doDont.map((q, i) => (
            <div key={q.id} className="l26-drill-row">
              <strong className="l26-drill-prompt">
                {i + 1}. {q.prompt}
              </strong>
              <span className="l26-drill-arrow" aria-hidden="true">
                →
              </span>
              <select
                value={doAns[i]}
                onChange={(e) => {
                  setDoChecked(false);
                  const next = [...doAns];
                  next[i] = e.target.value;
                  setDoAns(next);
                }}
                className={drillSelClass(doChecked, doAns[i], q.answer)}
                aria-label={`Grammar ${i + 1}`}
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
            onClick={() => setDoChecked(true)}
          >
            Check
          </button>
          {doChecked && (
            <span className="l22-score">
              {doScore} / {doDont.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setDoAns(doDont.map((q) => q.answer));
              setDoChecked(true);
            }}
          >
            Show answers
          </button>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setDoAns(Array(doDont.length).fill(""));
              setDoChecked(false);
            }}
          >
            Reset
          </button>
        </div>
      </section>

      <section id="hw36-order" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">4 · Word order</p>
          <h2>Make questions</h2>
          <p className="lesson22-section-desc">
            Постав слова в правильному порядку — це питання з відео.
          </p>
        </div>
        <WordOrderBoard
          items={wordOrder36}
          rows={orderRows}
          setRows={setOrderRows}
          checked={orderChecked}
          setChecked={setOrderChecked}
        />
      </section>

      <section id="hw36-speak" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">5 · Speaking</p>
          <h2>Write about your routine</h2>
          <p className="lesson22-section-desc">
            Прочитай питання вголос і напиши відповіді про{" "}
            <strong>себе</strong>. На уроці розкажи їх викладачу.
          </p>
        </div>
        <div className="lesson22-prompt-grid">
          {speakPrompts.map((q, i) => (
            <label
              key={q}
              className="lesson22-prompt-card lesson22-prompt-card--task"
            >
              {q}
              <textarea
                className="hw27-textarea"
                rows={3}
                value={speakAns[i]}
                onChange={(e) => {
                  const next = [...speakAns];
                  next[i] = e.target.value;
                  setSpeakAns(next);
                }}
                placeholder="I …"
                aria-label={q}
                style={{ marginTop: "0.65rem", width: "100%" }}
              />
            </label>
          ))}
        </div>
        <blockquote className="l23-rule-quote" style={{ marginTop: "1rem" }}>
          <p>
            <strong>Model.</strong>{" "}
            <em>What do you do in the morning?</em> —{" "}
            <em>I wake up, I take a shower and I eat breakfast.</em>
            <br />
            <em>When do you get up?</em> — <em>I get up at seven.</em>
          </p>
        </blockquote>
      </section>

      <section id="hw36-check" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Check · at / to / time</p>
          <h2>at · to · час</h2>
          <p className="lesson22-section-desc">
            Три короткі перевірки: <strong>at</strong> (година, home, weekend),{" "}
            <strong>to</strong> (go to…, like to do) і <strong>час</strong> (in
            the morning / on Monday / at 7 o&apos;clock).
          </p>
        </div>

        <p className="l31-ex-line">
          <strong className="l31-ex-num">A</strong> Choose <strong>at</strong>.
        </p>
        <SelectCheck
          items={hw36At}
          ans={atAns}
          setAns={setAtAns}
          checked={atChecked}
          setChecked={setAtChecked}
          aria="at"
        />

        <p className="l31-ex-line" style={{ marginTop: "1.35rem" }}>
          <strong className="l31-ex-num">B</strong> Choose <strong>to</strong>{" "}
          (go to… / to do).
        </p>
        <SelectCheck
          items={hw36To}
          ans={toAns}
          setAns={setToAns}
          checked={toChecked}
          setChecked={setToChecked}
          aria="to"
        />

        <p className="l31-ex-line" style={{ marginTop: "1.35rem" }}>
          <strong className="l31-ex-num">C</strong> Time — in / on / at.
        </p>
        <SelectCheck
          items={hw36Time}
          ans={timeAns}
          setAns={setTimeAns}
          checked={timeChecked}
          setChecked={setTimeChecked}
          aria="time"
        />
      </section>

      <section id="hw36-submit" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Submit</p>
          <h2>Send your homework</h2>
          <p className="lesson22-section-desc">
            Перевір вправи (Check), напиши відповіді про себе, зроби at / to /
            час і надішли вчителю.
          </p>
        </div>
        <label className="lesson22-section-desc" htmlFor="hw36-writing">
          Notes (optional):
        </label>
        <textarea
          id="hw36-writing"
          className="hw27-textarea"
          rows={5}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Що було складно? Які слова хочеш повторити?"
        />
        <HomeworkSubmit
          lessonId="36"
          writing={[
            draft.trim() || "(no extra notes)",
            `1 · Listening: ${checks.listen ? `${listenScore}/${listenQuiz.length}` : "not finished"}`,
            `2 · Complete: ${checks.gaps ? `${gapScore}/${videoGaps.length}` : "not finished"}`,
            `3 · do / don't: ${checks.doDont ? `${doScore}/${doDont.length}` : "not finished"}`,
            `4 · Word order: ${checks.wordOrder ? `${orderScore}/${wordOrder36.length}` : "not finished"}`,
            "5 · Routine answers:",
            ...speakPrompts.map(
              (q, i) => `  ${q} — ${speakAns[i].trim() || "—"}`,
            ),
            `Check · at: ${checks.at ? `${atScore}/${hw36At.length}` : "not finished"}`,
            `Check · to: ${checks.to ? `${toScore}/${hw36To.length}` : "not finished"}`,
            `Check · time: ${checks.time ? `${timeScore}/${hw36Time.length}` : "not finished"}`,
            allDone
              ? `Total: ${totalScore}/${totalItems}`
              : "Total: incomplete",
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
