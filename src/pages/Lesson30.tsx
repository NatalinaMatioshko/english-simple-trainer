import { useMemo, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
import "../styles/lesson26.css";
import "../styles/lesson27.css";
import "../styles/lesson28.css";
import "../styles/lesson30.css";
import {
  canChecklist,
  correctionItems,
  familyCards,
  familyJobMatch,
  jobCards,
  listenQs,
  profileModel,
  profileScaffold,
  readingChunks,
  reflectItems,
  topicStations,
  warmUpQs,
} from "../data/lesson30Review";

const IMG27 = (file: string) =>
  `${import.meta.env.BASE_URL}images/lesson27/${file}`;

const IMG30 = (file: string) =>
  `${import.meta.env.BASE_URL}images/lesson30/${file}`;

const SOUND_U2 = (r: number) =>
  `${import.meta.env.BASE_URL}sounds/Unit_2/RM_A1_SB_U2_R${r}.mp3`;

function drillSelClass(
  checked: boolean,
  value: string,
  answer: string,
): string {
  if (!checked) return "l25-cr-sel";
  if (value === answer) return "l25-cr-sel l25-cr-sel--ok";
  if (value) return "l25-cr-sel l25-cr-sel--err";
  return "l25-cr-sel";
}

function AudioBlock({
  r,
  exercise,
  title,
  transcript,
}: {
  r: number;
  exercise: string;
  title: string;
  transcript: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="l25-audio-item">
      <div className="l25-audio-meta">
        <span className="l25-audio-num">R{r}</span>
        <div className="l25-audio-info">
          <span className="l25-audio-ex">{exercise}</span>
          <span className="l25-audio-title">{title}</span>
        </div>
      </div>
      <audio
        controls
        className="l25-audio-ctrl"
        src={SOUND_U2(r)}
        preload="none"
      />
      <button
        type="button"
        className="l25-cr-mini-btn"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "Hide transcript" : "Transcript"}
      </button>
      {open && <div className="l25-details-body">{transcript}</div>}
    </div>
  );
}

export default function Lesson30() {
  const [openChunk, setOpenChunk] = useState(1);
  const [chunkAns, setChunkAns] = useState<Record<number, string>>({});
  const [chunkChecked, setChunkChecked] = useState(false);

  const [famAns, setFamAns] = useState<Record<number, string>>({});
  const [famChecked, setFamChecked] = useState(false);

  const [listenAns, setListenAns] = useState<Record<number, string>>({});
  const [listenChecked, setListenChecked] = useState(false);

  const [corrAns, setCorrAns] = useState<Record<number, string>>({});
  const [corrChecked, setCorrChecked] = useState(false);

  const [cardOpen, setCardOpen] = useState<Set<string>>(new Set());
  const [jobOpen, setJobOpen] = useState<Set<string>>(new Set());

  const [writing, setWriting] = useState("");
  const [reflect, setReflect] = useState<Record<number, number>>({});
  const [canDone, setCanDone] = useState<Set<number>>(new Set());

  const [topicId, setTopicId] = useState(topicStations[0].id);
  const [topicAns, setTopicAns] = useState<Record<string, string>>({});
  const [topicChecked, setTopicChecked] = useState(false);
  const [topicsDone, setTopicsDone] = useState<Set<string>>(new Set());

  const activeTopic = useMemo(
    () => topicStations.find((t) => t.id === topicId)!,
    [topicId],
  );

  const activeChunk = useMemo(
    () => readingChunks.find((c) => c.id === openChunk)!,
    [openChunk],
  );

  const chunkScore = readingChunks.filter(
    (c) => chunkAns[c.id] === c.answer,
  ).length;
  const famScore = familyJobMatch.filter(
    (q) => famAns[q.id] === q.answer,
  ).length;
  const listenScore = listenQs.filter(
    (q) => listenAns[q.id] === q.answer,
  ).length;
  const corrScore = correctionItems.filter(
    (q) => corrAns[q.id] === q.answer,
  ).length;

  const topicScore = activeTopic.quiz.filter(
    (q) => topicAns[`${topicId}-${q.id}`] === q.answer,
  ).length;

  const toggleCard = (id: string) =>
    setCardOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const toggleJob = (en: string) =>
    setJobOpen((prev) => {
      const next = new Set(prev);
      if (next.has(en)) next.delete(en);
      else next.add(en);
      return next;
    });

  return (
    <div className="lesson22-page">
      {/* ── Hero ── */}
      <section className="lesson22-hero panel">
        <div className="lesson22-hero-top">
          <div>
            <p className="page-kicker">Lesson 30 · A1 foundation</p>
            <h1>Check &amp; Reflect</h1>
            <p className="lesson22-topic-pill">
              All A1 topics: me · family · jobs · nationalities · appearance ·
              routine · do/does · prepositions · do/make · can · articles ·
              objects · numbers · shop
            </p>
            <p className="lesson22-subtitle">
              Урок-рефлексія по <strong>усіх пройдених темах</strong> (L1–29).
              Grammar posters → карта тем → speaking → family/jobs → reading →
              listening → writing → correction → reflect.
            </p>
            <ul className="l22-goals-list">
              <li>пройти всі теми фундаменту A1 по станціях;</li>
              <li>згадати do/does і have/has;</li>
              <li>говорити про себе, сім’ю, роботу, рутину;</li>
              <li>перевірити grammar + vocab у кожному блоці;</li>
              <li>читати / слухати / писати short profile;</li>
              <li>побачити сильні й слабкі теми для наступного циклу.</li>
            </ul>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <Link className="lesson22-back-link" to="/hw-30">
              Homework → Lesson 30
            </Link>
            <Link className="lesson22-back-link" to="/lessons">
              ← Back to lessons
            </Link>
          </div>
        </div>
        <div className="lesson22-hero-chips">
          <span>15 topic stations</span>
          <span>do / does</span>
          <span>have / has</span>
          <span>routine</span>
          <span>shop</span>
        </div>
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-flow">
          <a href="#l30-grammar">Grammar</a>
          <a href="#l30-topics">All topics</a>
          <a href="#l30-warmup">1 Warm-up</a>
          <a href="#l30-profile">2 Profile</a>
          <a href="#l30-family">3 Family &amp; jobs</a>
          <a href="#l30-reading">4 Reading</a>
          <a href="#l30-listening">5 Listening</a>
          <a href="#l30-writing">6 Writing</a>
          <a href="#l30-correction">7 Correction</a>
          <a href="#l30-reflect">Reflect</a>
        </div>
      </section>

      {/* ── Grammar posters ── */}
      <section id="l30-grammar" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Grammar warm-up · A1 essentials</p>
          <h2>Do / Does · Have / Has</h2>
          <p className="lesson22-section-desc">
            Перед speaking швидко згадай допоміжні дієслова Present Simple і
            присвійність. Постери нижче — повна опора; під ними — короткі
            правила.
          </p>
        </div>

        <div className="l28-chart-pair">
          <figure className="l28-chart">
            <figcaption className="l28-chart-cap">Do and Does</figcaption>
            <img
              src={IMG30("do-does.png")}
              alt="Do and Does: use Do with I You We They; Does with He She It; questions and negatives"
              className="l28-chart-img"
              width={900}
              height={1200}
              loading="eager"
              decoding="async"
            />
          </figure>
          <figure className="l28-chart">
            <figcaption className="l28-chart-cap">Has / Have</figcaption>
            <img
              src={IMG30("has-have.png")}
              alt="Has and Have for possession: Have with I You We They; Has with He She It"
              className="l28-chart-img"
              width={900}
              height={1200}
              loading="eager"
              decoding="async"
            />
          </figure>
        </div>

        <div className="l30-gram-boards">
          <article className="l30-gram-board l30-gram-board--do">
            <header className="l30-gram-head">
              <h3>Do</h3>
              <p>I · You · We · They</p>
            </header>
            <ul className="l30-gram-list">
              <li>
                I <strong>do</strong> my homework.
              </li>
              <li>
                <strong>Do</strong> you like pizza?
              </li>
              <li>
                They <strong>do</strong> their chores.
              </li>
            </ul>
            <p className="l30-gram-foot">Present Simple · plural + I / you</p>
          </article>

          <article className="l30-gram-board l30-gram-board--does">
            <header className="l30-gram-head">
              <h3>Does</h3>
              <p>He · She · It</p>
            </header>
            <ul className="l30-gram-list">
              <li>
                She <strong>does</strong> her work.
              </li>
              <li>
                <strong>Does</strong> he play football?
              </li>
              <li>
                It <strong>does</strong> not work.
              </li>
            </ul>
            <p className="l30-gram-foot">Present Simple · he / she / it</p>
          </article>

          <article className="l30-gram-board l30-gram-board--q">
            <header className="l30-gram-head">
              <h3>Questions</h3>
              <p>Do / Does + subject + verb?</p>
            </header>
            <ul className="l30-gram-list">
              <li>
                <strong>Do</strong> you like ice cream?
              </li>
              <li>
                <strong>Does</strong> he live here?
              </li>
              <li>
                <strong>Do</strong> they go to the park?
              </li>
            </ul>
          </article>

          <article className="l30-gram-board l30-gram-board--neg">
            <header className="l30-gram-head">
              <h3>Negatives</h3>
              <p>do / does + not + verb</p>
            </header>
            <ul className="l30-gram-list">
              <li>
                I <strong>do not</strong> (don't) understand.
              </li>
              <li>
                She <strong>doesn't</strong> like cats.
              </li>
              <li>
                We <strong>don't</strong> finish late.
              </li>
            </ul>
          </article>

          <article className="l30-gram-board l30-gram-board--have">
            <header className="l30-gram-head">
              <h3>Have</h3>
              <p>I · You · We · They</p>
            </header>
            <ul className="l30-gram-list">
              <li>
                I <strong>have</strong> a pen.
              </li>
              <li>
                You <strong>have</strong> a new bag.
              </li>
              <li>
                We <strong>have</strong> a meeting.
              </li>
              <li>
                They <strong>have</strong> a nice house.
              </li>
            </ul>
            <p className="l30-gram-foot">Possession / ownership</p>
          </article>

          <article className="l30-gram-board l30-gram-board--has">
            <header className="l30-gram-head">
              <h3>Has</h3>
              <p>He · She · It</p>
            </header>
            <ul className="l30-gram-list">
              <li>
                He <strong>has</strong> a watch.
              </li>
              <li>
                She <strong>has</strong> a beautiful smile.
              </li>
              <li>
                It <strong>has</strong> four legs.
              </li>
            </ul>
            <p className="l30-gram-foot">Possession · singular subjects</p>
          </article>
        </div>

        <div className="l30-gram-summary" role="note">
          <p>
            <strong>Do</strong> → I, you, we, they &nbsp;·&nbsp;{" "}
            <strong>Does</strong> → he, she, it
          </p>
          <p>
            <strong>Have</strong> → I, you, we, they &nbsp;·&nbsp;{" "}
            <strong>Has</strong> → he, she, it
          </p>
        </div>
      </section>

      {/* ── All topics map + stations ── */}
      <section id="l30-topics" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">All topics · Lessons 1–29</p>
          <h2>Topic stations</h2>
          <p className="lesson22-section-desc">
            Обери тему → speaking prompts → mini quiz. Пройди{" "}
            <strong>усі {topicStations.length} станції</strong> — це повна
            перевірка фундаменту A1.
          </p>
        </div>

        <div className="l30-topic-map" role="tablist" aria-label="A1 topics">
          {topicStations.map((t) => {
            const done = topicsDone.has(t.id);
            const active = topicId === t.id;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={active}
                className={`l30-topic-pill${active ? " is-active" : ""}${done ? " is-done" : ""}`}
                onClick={() => {
                  setTopicId(t.id);
                  setTopicChecked(false);
                }}
              >
                <span className="l30-topic-pill-title">{t.title}</span>
                <span className="l30-topic-pill-lessons">{t.lessons}</span>
              </button>
            );
          })}
        </div>

        <p className="l30-topic-progress">
          Stations done: {topicsDone.size} / {topicStations.length}
        </p>

        <div className="l30-topic-panel">
          <div className="l30-topic-panel-head">
            <h3>{activeTopic.title}</h3>
            <span className="l30-topic-badge">{activeTopic.lessons}</span>
          </div>

          <h4 className="l22-listen-subtitle">Speak</h4>
          <div className="lesson22-prompt-grid">
            {activeTopic.speak.map((q) => (
              <div key={q} className="lesson22-prompt-card">
                {q}
              </div>
            ))}
          </div>

          <h4 className="l22-listen-subtitle">Quick check</h4>
          <div className="l26-drill-list">
            {activeTopic.quiz.map((q) => {
              const key = `${topicId}-${q.id}`;
              return (
                <div key={key} className="l26-drill-row">
                  <strong className="l26-drill-prompt">
                    {q.id}. {q.prompt}
                  </strong>
                  <select
                    value={topicAns[key] ?? ""}
                    onChange={(e) => {
                      setTopicChecked(false);
                      setTopicAns((p) => ({ ...p, [key]: e.target.value }));
                    }}
                    className={drillSelClass(
                      topicChecked,
                      topicAns[key] ?? "",
                      q.answer,
                    )}
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
              );
            })}
          </div>

          <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
            <button
              type="button"
              className="l22-check-btn"
              onClick={() => {
                setTopicChecked(true);
                const allOk = activeTopic.quiz.every(
                  (q) => topicAns[`${topicId}-${q.id}`] === q.answer,
                );
                if (allOk) {
                  setTopicsDone((prev) => new Set([...prev, topicId]));
                }
              }}
            >
              Check station
            </button>
            {topicChecked && (
              <span className="l22-score">
                {topicScore} / {activeTopic.quiz.length}
                {topicScore === activeTopic.quiz.length ? " · station ✓" : ""}
              </span>
            )}
            <button
              type="button"
              className="l25-cr-mini-btn"
              onClick={() =>
                setTopicsDone((prev) => new Set([...prev, topicId]))
              }
            >
              Mark spoken ✓
            </button>
          </div>
        </div>
      </section>

      {/* ── 1 Warm-up ── */}
      <section id="l30-warmup" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">1 · Speaking warm-up</p>
          <h2>Very easy questions — no script</h2>
          <p className="lesson22-section-desc">
            Відповідай вголос. Мета — побачити, чи можеш говорити{" "}
            <strong>без опори на текст</strong>.
          </p>
        </div>
        <div className="lesson22-prompt-grid">
          {warmUpQs.map((q) => (
            <div key={q} className="lesson22-prompt-card">
              {q}
            </div>
          ))}
        </div>
      </section>

      {/* ── 2 Profile ── */}
      <section id="l30-profile" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">2 · Speaking · personal profile</p>
          <h2>Tell me about yourself (5–7 sentences)</h2>
          <p className="lesson22-section-desc">
            З пам’яті: name, age, origin, job/studies, family, appearance,
            hobbies. Спочатку модель — потім ти.
          </p>
        </div>

        <div className="l25-conf-card" style={{ maxWidth: 680 }}>
          <div className="l25-conf-header">Model · Olena</div>
          <div className="l25-conf-fields">
            {profileModel.map((para) => (
              <p
                key={para.slice(0, 28)}
                style={{ margin: 0, fontSize: "var(--text-sm)", lineHeight: 1.55 }}
              >
                {para}
              </p>
            ))}
          </div>
        </div>

        <h3 className="l22-listen-subtitle">Scaffold (якщо треба)</h3>
        <div className="lesson22-prompt-grid">
          {profileScaffold.map((s) => (
            <div
              key={s}
              className="lesson22-prompt-card lesson22-prompt-card--task"
            >
              {s}
            </div>
          ))}
        </div>

        <p className="lesson22-section-desc" style={{ marginTop: "1rem" }}>
          Partner task: A говорить 5–7 речень. B ставить 2 питання (
          <em>Where…? / What…? / How old…?</em>). Потім поміняйтесь.
        </p>
      </section>

      {/* ── 3 Family & jobs ── */}
      <section id="l30-family" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">3 · Family &amp; jobs review</p>
          <h2>Photos + job cards</h2>
          <p className="lesson22-section-desc">
            Скажи, хто на фото і ким працює. Потім — job cards: job + place of
            work. Перевір possessives у короткому quiz.
          </p>
        </div>

        <h3 className="l22-listen-subtitle">Family photos (Cristina's family)</h3>
        <div className="l27-photo-bank">
          {familyCards.map((c) => (
            <figure key={c.id} className="l27-photo-card">
              <img
                src={IMG27(c.file)}
                alt={`${c.name} — ${c.job}`}
                loading="lazy"
              />
              <figcaption>
                <strong>{c.prompt}</strong>
                <button
                  type="button"
                  className="l25-cr-mini-btn"
                  style={{ marginTop: "0.35rem" }}
                  onClick={() => toggleCard(c.id)}
                >
                  {cardOpen.has(c.id) ? "Hide" : "Model →"}
                </button>
                {cardOpen.has(c.id) && (
                  <span className="l25-cr-answer l25-cr-answer--green">
                    {c.answerWho} {c.answerJob}
                  </span>
                )}
              </figcaption>
            </figure>
          ))}
        </div>

        <h3 className="l22-listen-subtitle">Job cards — say the job + place</h3>
        <div className="l30-job-grid">
          {jobCards.map((j) => (
            <button
              key={j.en}
              type="button"
              className={`l30-job-card${jobOpen.has(j.en) ? " is-open" : ""}`}
              onClick={() => toggleJob(j.en)}
            >
              <span className="l30-job-title">{j.en}</span>
              {jobOpen.has(j.en) ? (
                <span className="l30-job-place">
                  works {j.place}
                  <br />
                  <em>{j.example}</em>
                </span>
              ) : (
                <span className="l30-job-hint">tap → place of work</span>
              )}
            </button>
          ))}
        </div>

        <h3 className="l22-listen-subtitle">Quick check · possessives &amp; be</h3>
        <div className="l26-drill-list">
          {familyJobMatch.map((q) => (
            <div key={q.id} className="l26-drill-row">
              <strong className="l26-drill-prompt">
                {q.id}. {q.prompt}
              </strong>
              <select
                value={famAns[q.id] ?? ""}
                onChange={(e) => {
                  setFamChecked(false);
                  setFamAns((p) => ({ ...p, [q.id]: e.target.value }));
                }}
                className={drillSelClass(
                  famChecked,
                  famAns[q.id] ?? "",
                  q.answer,
                )}
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
            onClick={() => setFamChecked(true)}
          >
            Check
          </button>
          {famChecked && (
            <span className="l22-score">
              {famScore} / {familyJobMatch.length}
            </span>
          )}
        </div>
      </section>

      {/* ── 4 Reading ── */}
      <section id="l30-reading" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">4 · Reading in chunks</p>
          <h2>Marco's profile</h2>
          <p className="lesson22-section-desc">
            Читай по одному chunk (1–2 речення). Після кожного: відповідай на
            питання → повтори chunk → коротко скажи головну думку.
          </p>
        </div>

        <div className="l27-chunk-tabs" role="tablist">
          {readingChunks.map((c) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={openChunk === c.id}
              className={`l27-chunk-tab${openChunk === c.id ? " is-active" : ""}`}
              onClick={() => {
                setOpenChunk(c.id);
                setChunkChecked(false);
              }}
            >
              {c.title}
            </button>
          ))}
        </div>
        <div className="l27-chunk-panel">
          <p>{activeChunk.text}</p>
        </div>

        <div className="l26-drill-row" style={{ marginTop: "0.75rem" }}>
          <strong className="l26-drill-prompt">{activeChunk.question}</strong>
          <select
            value={chunkAns[openChunk] ?? ""}
            onChange={(e) => {
              setChunkChecked(false);
              setChunkAns((p) => ({ ...p, [openChunk]: e.target.value }));
            }}
            className={drillSelClass(
              chunkChecked,
              chunkAns[openChunk] ?? "",
              activeChunk.answer,
            )}
            aria-label={activeChunk.question}
          >
            <option value="">___</option>
            {activeChunk.options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setChunkChecked(true)}
          >
            Check this chunk
          </button>
          {chunkChecked && (
            <span className="l22-score">
              This chunk:{" "}
              {chunkAns[openChunk] === activeChunk.answer ? "✓" : "✗"} · All:{" "}
              {chunkScore} / {readingChunks.length}
            </span>
          )}
        </div>

        <details className="l25-details" style={{ marginTop: "0.75rem" }}>
          <summary className="l25-details-toggle">📄 Full text</summary>
          <div className="l25-details-body">
            {readingChunks.map((c) => (
              <p key={c.id}>{c.text}</p>
            ))}
          </div>
        </details>

        <p className="l25-cr-hint" style={{ marginTop: "0.75rem" }}>
          After all chunks: summarize Marco in{" "}
          <strong>one or two sentences</strong> (name, job, family).
        </p>
      </section>

      {/* ── 5 Listening ── */}
      <section id="l30-listening" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">5 · Listening</p>
          <h2>Yasemin &amp; Tara — family photo</h2>
          <p className="lesson22-section-desc">
            Послухай <strong>R4</strong> (Unit 2). Лови головну думку: хто в
            сім’ї, звідки, імена. Потім 5 простих питань.
          </p>
        </div>

        <div className="l25-audio-list">
          <AudioBlock
            r={4}
            exercise="Unit 2 · 2.4"
            title="Family photo dialogue"
            transcript={
              <p>
                Y: This is a photo of my family.
                <br />
                T: Wow! Is this your mother and father? What are their names?
                <br />
                Y: My father's name is Emir. He's from Turkey. My mother's
                English. Her name's Linda.
                <br />
                T: OK. So is this your brother?
                <br />
                Y: No, it isn't. That's our friend from Ankara. This is my
                brother here. His name's Ali.
              </p>
            }
          />
        </div>

        <h3 className="l22-listen-subtitle">Check understanding</h3>
        <div className="l26-drill-list">
          {listenQs.map((q) => (
            <div key={q.id} className="l26-drill-row">
              <strong className="l26-drill-prompt">
                {q.id}. {q.prompt}
              </strong>
              <select
                value={listenAns[q.id] ?? ""}
                onChange={(e) => {
                  setListenChecked(false);
                  setListenAns((p) => ({ ...p, [q.id]: e.target.value }));
                }}
                className={drillSelClass(
                  listenChecked,
                  listenAns[q.id] ?? "",
                  q.answer,
                )}
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
              {listenScore} / {listenQs.length}
            </span>
          )}
        </div>
      </section>

      {/* ── 6 Writing ── */}
      <section id="l30-writing" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">6 · Short writing</p>
          <h2>My personal profile</h2>
          <p className="lesson22-section-desc">
            Напиши 8–12 речень про себе, охопивши різні теми: name, age, from /
            nationality, job, family, appearance, routine, free time, can / can't.
            Без підказки або з мінімальною опорою.
          </p>
        </div>
        <label className="lesson22-section-desc" htmlFor="l30-writing-box">
          Your text:
        </label>
        <textarea
          id="l30-writing-box"
          className="hw27-textarea"
          rows={10}
          value={writing}
          onChange={(e) => setWriting(e.target.value)}
          placeholder="My name is… I'm … years old. I'm from… I live in… I'm a… / I work as… In my family… I have… hair. In my free time…"
        />
        <p className="l25-cr-hint" style={{ marginTop: "0.5rem" }}>
          Self-check: скільки речень? Чи є{" "}
          <em>am / is / are</em>? Чи є <em>my / his / her</em>?
        </p>
      </section>

      {/* ── 7 Correction ── */}
      <section id="l30-correction" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">7 · Quick correction</p>
          <h2>Common A1 mistakes</h2>
          <p className="lesson22-section-desc">
            their / they're · your / you're · its / it's · is / are · a / an ·
            jobs · nationality.
          </p>
        </div>

        <ol className="l25-cr-ol">
          {correctionItems.map((item) => {
            const picked = corrAns[item.id] ?? "";
            return (
              <li key={item.id} className="l25-cr-ex8-row">
                <span className="l25-cr-sentence">{item.wrong}</span>
                <span className="l25-cr-choice-group">
                  {item.options.map((opt) => {
                    const isCorrect = opt === item.answer;
                    const isPicked = opt === picked;
                    return (
                      <button
                        key={opt}
                        type="button"
                        className={`l25-cr-chip${
                          corrChecked && isPicked && isCorrect
                            ? " l25-cr-chip--ok"
                            : corrChecked && isPicked && !isCorrect
                              ? " l25-cr-chip--err"
                              : corrChecked && !isPicked && isCorrect
                                ? " l25-cr-chip--missed"
                                : !corrChecked && isPicked
                                  ? " l30-chip-picked"
                                  : ""
                        }`}
                        onClick={() => {
                          setCorrChecked(false);
                          setCorrAns((p) => ({ ...p, [item.id]: opt }));
                        }}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </span>
                {corrChecked && picked === item.answer && (
                  <span className="l25-cr-hint-text"> · {item.tip}</span>
                )}
              </li>
            );
          })}
        </ol>
        <div className="l25-cr-actions">
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setCorrChecked(true)}
          >
            Check answers
          </button>
          {corrChecked && (
            <span className="l22-score">
              {corrScore} / {correctionItems.length}
            </span>
          )}
        </div>
      </section>

      {/* ── Reflect ── */}
      <section id="l30-reflect" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Reflect</p>
          <h2>How confident are you?</h2>
          <p className="lesson22-section-desc">
            1 = not very confident · 5 = very confident. Це покаже, що вже можна
            «закривати», а що повторити в наступному циклі.
          </p>
        </div>

        <ul className="l30-reflect-list">
          {reflectItems.map((text, i) => (
            <li key={text} className="l30-reflect-row">
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

        <h3 className="l22-listen-subtitle">Good A1 result — can you…?</h3>
        <div className="l30-can-list">
          {canChecklist.map((item, i) => {
            const on = canDone.has(i);
            return (
              <button
                key={item}
                type="button"
                className={`l30-can-item${on ? " is-on" : ""}`}
                onClick={() =>
                  setCanDone((prev) => {
                    const next = new Set(prev);
                    if (next.has(i)) next.delete(i);
                    else next.add(i);
                    return next;
                  })
                }
              >
                <span aria-hidden="true">{on ? "✓" : "○"}</span>
                {item}
              </button>
            );
          })}
        </div>

        <div className="l30-note">
          <strong>Realistic A1:</strong> ти можеш говорити про себе і близьких,
          розуміти прості тексти й аудіо, будувати коротке усне повідомлення.
          Помилки нормальні. Не очікуй вільного мовлення чи швидкого native
          speech — фундамент важливіший.
        </div>
      </section>

      {/* ── After ── */}
      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">After class</p>
          <h2>What next?</h2>
          <p className="lesson22-section-desc">
            Повтори слабкі теми (family / jobs / possessives / numbers) і
            продовжуй speaking без перекладу слово-в-слово.
          </p>
        </div>
        <div className="lesson22-prompt-grid">
          <Link
            className="lesson22-prompt-card lesson22-prompt-card--task"
            to="/hw-30"
          >
            Homework 30 →
          </Link>
          <Link
            className="lesson22-prompt-card lesson22-prompt-card--task"
            to="/hw-29"
          >
            HW29 Check &amp; Reflect →
          </Link>
          <Link
            className="lesson22-prompt-card lesson22-prompt-card--task"
            to="/vocab"
          >
            Vocab bank →
          </Link>
          <Link
            className="lesson22-prompt-card lesson22-prompt-card--task"
            to="/lesson-27"
          >
            ← Lesson 27 family
          </Link>
          <Link
            className="lesson22-prompt-card lesson22-prompt-card--task"
            to="/lesson-26"
          >
            ← Lesson 26 jobs
          </Link>
          <Link
            className="lesson22-prompt-card lesson22-prompt-card--task"
            to="/trainer"
          >
            Trainer practice →
          </Link>
        </div>
      </section>
    </div>
  );
}
