import { useState } from "react";
import { Link } from "react-router-dom";
import LessonNumberKicker from "../components/LessonNumberKicker";
import WordOrderBoard, {
  initWordOrderRows,
} from "../components/lesson31/WordOrderBoard";
import { drillSelClass } from "../components/lesson31/drillSelClass";
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

export default function Lesson36() {
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

  const listenScore = listenQuiz.filter(
    (q, i) => listenAns[i] === q.answer,
  ).length;
  const gapScore = videoGaps.filter((g, i) => gapAns[i] === g.answer).length;
  const doScore = doDont.filter((q, i) => doAns[i] === q.answer).length;

  return (
    <div className="lesson22-page">
      <section className="lesson22-hero panel">
        <div className="lesson22-hero-top">
          <div>
            <LessonNumberKicker number={36} />
            <h1>Present Simple · daily verbs</h1>
            <p className="lesson22-topic-pill">
              I wake up · I teach · I eat in the park
            </p>
            <p className="lesson22-subtitle">
              ELLLO A1-04. Послухай чотири діалоги з{" "}
              <strong>Present Simple</strong> і відповідай про свою рутину.
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
              to="/lesson-35"
            >
              ← Lesson 35
            </Link>
            <Link
              className="lesson22-back-link lesson22-back-link--ghost"
              to="/lesson-37"
            >
              Lesson 37 →
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
          <span>get up at 6</span>
          <span>teach math</span>
          <span>fix bikes</span>
          <span>play soccer</span>
          <span>do / don&apos;t</span>
        </div>
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-flow">
          <a href="#l36-video">Video</a>
          <a href="#l36-listen">1 Listening</a>
          <a href="#l36-gaps">2 Complete</a>
          <a href="#l36-do">3 do / don&apos;t</a>
          <a href="#l36-order">4 Word order</a>
          <a href="#l36-speak">5 Speaking</a>
          <a href="#l36-exit">Exit</a>
        </div>
      </section>

      <section id="l36-video" className="lesson22-block panel">
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

      <section id="l36-listen" className="lesson22-block panel">
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

      <section id="l36-gaps" className="lesson22-block panel">
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

      <section id="l36-do" className="lesson22-block panel">
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

      <section id="l36-order" className="lesson22-block panel">
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

      <section id="l36-speak" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">5 · Speaking</p>
          <h2>Ask and answer with your teacher</h2>
          <p className="lesson22-section-desc">
            Прочитай питання вголос і відповідай про <strong>себе</strong>.
            Потім запитай викладача.
          </p>
        </div>
        <div className="lesson22-prompt-grid">
          {speakPrompts.map((q) => (
            <div
              key={q}
              className="lesson22-prompt-card lesson22-prompt-card--task"
            >
              {q}
            </div>
          ))}
        </div>
        <blockquote className="l23-rule-quote" style={{ marginTop: "1rem" }}>
          <p>
            <strong>Model.</strong> Teacher: <em>What do you do in the morning?</em>{" "}
            You: <em>I wake up, I take a shower and I eat breakfast.</em>
            <br />
            Teacher: <em>When do you get up?</em> You:{" "}
            <em>I get up at seven.</em>
          </p>
        </blockquote>
      </section>

      <section id="l36-exit" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Exit check</p>
          <h2>Can you…?</h2>
        </div>
        <ul className="l22-goals-list">
          <li>Say 4 things you do in the morning.</li>
          <li>Ask: What do you do during the day / on the weekend?</li>
          <li>Use don&apos;t in one sentence about you.</li>
          <li>Answer a listening question from the video.</li>
        </ul>
        <div className="l25-cr-actions" style={{ marginTop: "1rem" }}>
          <Link className="l22-check-btn" to="/vocab">
            Vocab
          </Link>
          <Link className="l25-cr-mini-btn" to="/trainer">
            Trainer
          </Link>
          <Link className="l25-cr-mini-btn" to="/lesson-37">
            Lesson 37 →
          </Link>
          <Link className="l25-cr-mini-btn" to="/lesson-35">
            ← Lesson 35
          </Link>
          <Link className="l25-cr-mini-btn" to="/lessons">
            All lessons →
          </Link>
        </div>
      </section>
    </div>
  );
}
