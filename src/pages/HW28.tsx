import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/app.css";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
import "../styles/lesson26.css";
import { HomeworkSubmit } from "../components/HomeworkSubmit";

const VIDEO_ID = "1mKeXz5Bf7c";

const videoQuiz = [
  {
    id: 1,
    prompt: "Where does his mom work?",
    options: ["in a factory", "in a shop in the mall", "at home"],
    answer: "in a shop in the mall",
  },
  {
    id: 2,
    prompt: "Does she sell clothing for teens?",
    options: ["Yes, she does.", "No, only for adults.", "We don't know."],
    answer: "No, only for adults.",
  },
  {
    id: 3,
    prompt: "What does her brother study?",
    options: ["medicine", "engineering", "art"],
    answer: "engineering",
  },
  {
    id: 4,
    prompt: "Does he live at home?",
    options: ["Yes, he does.", "No — he has a small apartment.", "With friends."],
    answer: "No — he has a small apartment.",
  },
  {
    id: 5,
    prompt: "Who watches her daughter after school?",
    options: ["her dad", "her mom / grandma", "a teacher"],
    answer: "her mom / grandma",
  },
  {
    id: 6,
    prompt: "When does the movie start?",
    options: ["in about ten minutes", "tomorrow", "it already ended"],
    answer: "in about ten minutes",
  },
] as const;

const videoGrammarQuiz = [
  {
    id: 1,
    prompt: "She ___ women's clothing. (sell)",
    options: ["sell", "sells", "selling"],
    answer: "sells",
  },
  {
    id: 2,
    prompt: "He ___ engineering. (study)",
    options: ["study", "studys", "studies"],
    answer: "studies",
  },
  {
    id: 3,
    prompt: "___ she live at home?",
    options: ["Do", "Does", "Is"],
    answer: "Does",
  },
  {
    id: 4,
    prompt: "He ___ have much free time.",
    options: ["don't", "doesn't", "isn't"],
    answer: "doesn't",
  },
] as const;

const videoSpeakPrompts = [
  "What does your mom / dad do?",
  "Where does he / she work?",
  "Does your brother / sister live at home?",
  "Talk about a friend: He / She works… / studies… / lives…",
] as const;

const writingPrompts = [
  "She works in a… / He studies…",
  "Does she/he live at home?",
  "She doesn't… / He doesn't…",
  "What does your … do?",
  "Tell me about a person you know.",
];

function drillSelClass(checked: boolean, value: string, answer: string): string {
  if (!checked) return "l25-cr-sel";
  if (value === answer) return "l25-cr-sel l25-cr-sel--ok";
  if (value) return "l25-cr-sel l25-cr-sel--err";
  return "l25-cr-sel";
}

export default function HW28() {
  const [draft, setDraft] = useState("");
  const [videoAns, setVideoAns] = useState<Record<number, string>>({});
  const [videoChecked, setVideoChecked] = useState(false);
  const [videoGramAns, setVideoGramAns] = useState<Record<number, string>>({});
  const [videoGramChecked, setVideoGramChecked] = useState(false);

  const videoScore = videoQuiz.filter((q) => videoAns[q.id] === q.answer).length;
  const videoGramScore = videoGrammarQuiz.filter((q) => videoGramAns[q.id] === q.answer).length;

  return (
    <div className="lesson22-page">
      <section className="lesson22-hero panel">
        <div className="lesson22-hero-top">
          <div>
            <p className="page-kicker">Homework · Lesson 28</p>
            <h1>Present Simple · he / she / it</h1>
            <p className="lesson22-subtitle">
              Відео-quiz: listening comprehension + third person grammar drill +
              speaking practice.
            </p>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <Link className="lesson22-back-link" to="/lesson-28">
              ← Lesson 28
            </Link>
            <Link className="lesson22-back-link" to="/lessons">
              ← Back to lessons
            </Link>
          </div>
        </div>
        <div className="lesson22-hero-chips">
          <span>video quiz</span>
          <span>he / she / it + -s</span>
          <span>does / doesn't</span>
          <span>speaking</span>
        </div>
      </section>

      {/* ── 1 · Video ── */}
      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">1 · Video · Present Simple · he / she / it</p>
          <h2>Listening quiz · third person singular</h2>
          <p className="lesson22-section-desc">
            Подивись відео (ELLLO A1-06). Послухай короткі діалоги з{" "}
            <strong>he / she / it + -s</strong>. Потім виконай listening quiz і
            grammar check.
          </p>
        </div>

        <div className="l22-video-wrap">
          <iframe
            src={`https://www.youtube.com/embed/${VIDEO_ID}`}
            title="Beginner English Listening Quiz — Present Simple third person singular"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>

        <div className="l25-conf-card" style={{ maxWidth: 640, marginBottom: "1rem" }}>
          <div className="l25-conf-header">Remember</div>
          <div className="l25-conf-fields">
            <p style={{ margin: 0, fontSize: "var(--text-sm)", lineHeight: 1.55 }}>
              <strong>He / She / It</strong> + verb<strong>-s / -es</strong>: She
              sell<strong>s</strong>… · He stud<strong>ies</strong>…
              <br />
              Questions: <em>Does</em> she work…? — Yes, she <em>does</em>. /
              No, she <em>doesn't</em>.
            </p>
          </div>
        </div>

        <h3 className="l22-listen-subtitle">1a · Listening quiz</h3>
        <p className="lesson22-section-desc">Обери правильну відповідь за відео.</p>
        <div className="l26-drill-list">
          {videoQuiz.map((q) => (
            <div key={q.id} className="l26-drill-row">
              <strong className="l26-drill-prompt">
                {q.id}. {q.prompt}
              </strong>
              <select
                value={videoAns[q.id] ?? ""}
                onChange={(e) => {
                  setVideoChecked(false);
                  setVideoAns((p) => ({ ...p, [q.id]: e.target.value }));
                }}
                className={drillSelClass(videoChecked, videoAns[q.id] ?? "", q.answer)}
                aria-label={q.prompt}
              >
                <option value="">___</option>
                {q.options.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button type="button" className="l22-check-btn" onClick={() => setVideoChecked(true)}>
            Check
          </button>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => { setVideoAns({}); setVideoChecked(false); }}
          >
            Reset
          </button>
          {videoChecked && (
            <span className="l22-score">{videoScore} / {videoQuiz.length}</span>
          )}
        </div>

        <h3 className="l22-listen-subtitle" style={{ marginTop: "1.25rem" }}>
          1b · Grammar · third person
        </h3>
        <div className="l26-drill-list">
          {videoGrammarQuiz.map((q) => (
            <div key={q.id} className="l26-drill-row">
              <strong className="l26-drill-prompt">
                {q.id}. {q.prompt}
              </strong>
              <select
                value={videoGramAns[q.id] ?? ""}
                onChange={(e) => {
                  setVideoGramChecked(false);
                  setVideoGramAns((p) => ({ ...p, [q.id]: e.target.value }));
                }}
                className={drillSelClass(videoGramChecked, videoGramAns[q.id] ?? "", q.answer)}
                aria-label={q.prompt}
              >
                <option value="">___</option>
                {q.options.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button type="button" className="l22-check-btn" onClick={() => setVideoGramChecked(true)}>
            Check
          </button>
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => { setVideoGramAns({}); setVideoGramChecked(false); }}
          >
            Reset
          </button>
          {videoGramChecked && (
            <span className="l22-score">{videoGramScore} / {videoGrammarQuiz.length}</span>
          )}
        </div>

        <h3 className="l22-listen-subtitle" style={{ marginTop: "1.25rem" }}>1c · Speak</h3>
        <p className="lesson22-section-desc">
          Відповідай уголос. Використай <em>he / she + -s</em> і{" "}
          <em>does / doesn't</em>.
        </p>
        <div className="lesson22-prompt-grid">
          {videoSpeakPrompts.map((q) => (
            <div key={q} className="lesson22-prompt-card lesson22-prompt-card--task">
              {q}
            </div>
          ))}
        </div>

        <details className="l25-details" style={{ marginTop: "1rem" }}>
          <summary className="l25-details-toggle">📄 Sample ideas from the video</summary>
          <div className="l25-details-body">
            <p><strong>Mom:</strong> She sells women's clothing. She has a small shop in the mall.</p>
            <p><strong>Brother:</strong> He studies engineering. He has a small apartment. He doesn't have much free time.</p>
            <p><strong>Daughter:</strong> Grandma watches her. She walks there after school.</p>
            <p><strong>Movie:</strong> It starts in about ten minutes. Brad Pitt plays a policeman.</p>
          </div>
        </details>

        <p className="l25-cr-hint" style={{ marginTop: "0.85rem" }}>
          Source:{" "}
          <a href={`https://youtu.be/${VIDEO_ID}`} target="_blank" rel="noopener noreferrer">
            ELLLO · Beginner Listening Quiz #6 ↗
          </a>
        </p>
      </section>

      {/* ── 2 · Speaking / Writing ── */}
      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">2 · Speaking / Writing</p>
          <h2>Tell me about someone you know</h2>
          <p className="lesson22-section-desc">
            Напиши <strong>6–8 речень</strong> про людину з сім'ї або друга.
            Використай <em>he / she + -s</em>, <em>does / doesn't</em> і{" "}
            <em>have / has</em>.
          </p>
        </div>

        <div className="l25-conf-card" style={{ maxWidth: 640, marginBottom: "1rem" }}>
          <div className="l25-conf-header">Model</div>
          <div className="l25-conf-fields">
            <p style={{ margin: 0, fontSize: "var(--text-sm)", lineHeight: 1.55 }}>
              My friend's name is Taras. He's from Lviv. He studies engineering at
              university. He lives in a small apartment. He doesn't have a car. He
              likes coffee and football. He doesn't like mornings.
            </p>
          </div>
        </div>

        <div className="lesson22-prompt-grid" style={{ marginBottom: "1rem" }}>
          {writingPrompts.map((p) => (
            <div key={p} className="lesson22-prompt-card lesson22-prompt-card--task">
              {p}
            </div>
          ))}
        </div>

        <label className="lesson22-section-desc" htmlFor="hw28-writing">
          Твій текст (чернетка):
        </label>
        <textarea
          id="hw28-writing"
          className="hw27-textarea"
          rows={8}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="My friend's name is… He / She works… / studies… He / She doesn't…"
        />

        <HomeworkSubmit
          lessonId="28"
          writing={draft}
          quizDone={videoChecked && videoGramChecked}
          quizScore={videoChecked && videoGramChecked ? videoScore + videoGramScore : undefined}
          showListeningCheck={false}
        />
      </section>

      {/* ── 3 · After ── */}
      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">3 · After homework</p>
          <h2>Done?</h2>
          <p className="lesson22-section-desc">
            Повернись до уроку 28 або відкрий урок 29 для продовження.
          </p>
        </div>
        <div className="lesson22-prompt-grid">
          <Link className="lesson22-prompt-card lesson22-prompt-card--task" to="/lesson-28">
            ← Lesson 28
          </Link>
          <Link className="lesson22-prompt-card lesson22-prompt-card--task" to="/lesson-29">
            Lesson 29 →
          </Link>
          <Link className="lesson22-prompt-card lesson22-prompt-card--task" to="/hw-29">
            HW 29 →
          </Link>
          <Link className="lesson22-prompt-card lesson22-prompt-card--task" to="/vocab">
            Vocab →
          </Link>
        </div>
      </section>
    </div>
  );
}
