import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { HomeworkSubmit } from "../components/HomeworkSubmit";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
import "../styles/lesson26.css";

/* ─── Data (duplicated from Lesson 26) ─────────────────────── */

const grammarDrill = [
  {
    from: "I'm a teacher.",
    answer: "He's a teacher.",
    options: ["He's a teacher.", "She's a teacher.", "I'm a teacher."],
  },
  {
    from: "She's a nurse.",
    answer: "Is she a nurse?",
    options: ["Is she a nurse?", "She is a nurse?", "Are she a nurse?"],
  },
  {
    from: "He isn't from the UK.",
    answer: "Where's he from?",
    options: ["Where's he from?", "Where he from?", "Is he from?"],
  },
  {
    from: "It's a small hospital.",
    answer: "Is it a big hospital?",
    options: [
      "Is it a big hospital?",
      "It is a big hospital?",
      "Are it a big hospital?",
    ],
  },
];

const substitutionDrill = [
  {
    cue: "he + doctor",
    answer: "He is a doctor.",
    options: ["He is a doctor.", "She is a doctor.", "They is a doctor."],
  },
  {
    cue: "she + doctor",
    answer: "She is a doctor.",
    options: ["She is a doctor.", "He is a doctor.", "She are a doctor."],
  },
  {
    cue: "it + hospital",
    answer: "It is a hospital.",
    options: ["It is a hospital.", "He is a hospital.", "It are a hospital."],
  },
  {
    cue: "she + nurse",
    answer: "She is a nurse.",
    options: ["She is a nurse.", "She is nurse.", "She are a nurse."],
  },
  {
    cue: "he + pilot",
    answer: "He is a pilot.",
    options: ["He is a pilot.", "He are a pilot.", "He is pilot."],
  },
];

const qaDrill = [
  {
    q: "Is Paul a nurse?",
    answer: "Yes, he is.",
    options: ["Yes, he is.", "No, he isn't.", "Yes, she is."],
  },
  {
    q: "Is Lucy a nurse?",
    answer: "No, she isn't. She's a doctor.",
    options: [
      "No, she isn't. She's a doctor.",
      "Yes, she is.",
      "No, he isn't. He's a doctor.",
    ],
  },
  {
    q: "Is Mila an office worker?",
    answer: "Yes, she is.",
    options: ["Yes, she is.", "No, she isn't.", "Yes, he is."],
  },
  {
    q: "Is the hospital in London?",
    answer: "No, it isn't. It's in Manchester.",
    options: [
      "No, it isn't. It's in Manchester.",
      "Yes, it is.",
      "No, it isn't. It's in London.",
    ],
  },
];

const correctionDrill = [
  {
    wrong: "He are a pilot.",
    answer: "He is a pilot.",
    options: ["He is a pilot.", "He are a pilot.", "He's are a pilot."],
  },
  {
    wrong: "She is doctor.",
    answer: "She is a doctor.",
    options: ["She is a doctor.", "She is doctor.", "She a doctor."],
  },
  {
    wrong: "Is he from UK?",
    answer: "Is he from the UK?",
    options: ["Is he from the UK?", "Is he from UK?", "Is he from a UK?"],
  },
  {
    wrong: "Where she from?",
    answer: "Where's she from?",
    options: ["Where's she from?", "Where she from?", "Where is from she?"],
  },
];

const SOUND = (r: number) =>
  `${import.meta.env.BASE_URL}sounds/RM_A1_SB_U1_R${r}.mp3`;

const r8Track = {
  r: 8,
  exercise: "Dialogue",
  title: "Patrick — job & origin",
  transcript: (
    <p>
      A: So, Patrick, are you a football player?
      <br />
      B: Yes, I'm a football player in the UK.
      <br />
      A: Is it a good team?
      <br />
      B: Yes, it is.
      <br />
      A: Is the manager nice?
      <br />
      B: Yes, he's OK.
      <br />
      A: Is he from the UK?
      <br />
      B: No, he isn't.
      <br />
      A: Where's he from?
      <br />
      B: He's from Argentina.
    </p>
  ) as ReactNode,
};

const r8Gaps = [
  {
    id: 1,
    answer: "football player",
    options: ["doctor", "football player", "pilot", "nurse"],
  },
  {
    id: 2,
    answer: "the UK",
    options: ["the US", "Spain", "the UK", "Argentina"],
  },
  {
    id: 3,
    answer: "Yes, it is",
    options: ["Yes, it is", "No, it isn't"],
  },
  {
    id: 4,
    answer: "No, he isn't",
    options: ["Yes, he is", "No, he isn't"],
  },
  {
    id: 5,
    answer: "Argentina",
    options: ["the UK", "Mexico", "Argentina", "Poland"],
  },
];

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

/* ─── Page ─────────────────────────────────────────────────── */

export default function HW26() {
  const [transformAns, setTransformAns] = useState<string[]>(
    () => Array(grammarDrill.length).fill(""),
  );
  const [transformChecked, setTransformChecked] = useState(false);
  const [subAns, setSubAns] = useState<string[]>(
    () => Array(substitutionDrill.length).fill(""),
  );
  const [subChecked, setSubChecked] = useState(false);
  const [qaAns, setQaAns] = useState<string[]>(
    () => Array(qaDrill.length).fill(""),
  );
  const [qaChecked, setQaChecked] = useState(false);
  const [fixAns, setFixAns] = useState<string[]>(
    () => Array(correctionDrill.length).fill(""),
  );
  const [fixChecked, setFixChecked] = useState(false);
  const [r8Ans, setR8Ans] = useState<Record<number, string>>({});
  const [r8Checked, setR8Checked] = useState(false);
  const [draft, setDraft] = useState("");

  const transformScore = grammarDrill.filter(
    (d, i) => transformAns[i] === d.answer,
  ).length;
  const subScore = substitutionDrill.filter(
    (d, i) => subAns[i] === d.answer,
  ).length;
  const qaScore = qaDrill.filter((d, i) => qaAns[i] === d.answer).length;
  const fixScore = correctionDrill.filter(
    (d, i) => fixAns[i] === d.answer,
  ).length;
  const r8Score = r8Gaps.filter((g) => r8Ans[g.id] === g.answer).length;
  const drillsDone =
    transformChecked && subChecked && qaChecked && fixChecked && r8Checked;
  const drillsScore =
    transformScore + subScore + qaScore + fixScore + r8Score;

  function r8SelClass(id: number, answer: string) {
    return drillSelClass(r8Checked, r8Ans[id] ?? "", answer);
  }

  return (
    <div className="lesson22-page">
      <section className="lesson22-hero panel">
        <div className="lesson22-hero-top">
          <div>
            <p className="page-kicker">Homework · Lesson 26</p>
            <h1>Jobs</h1>
            <p className="lesson22-subtitle">
              Practice: transform · three drills · listen and complete (R8).
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <Link className="lesson22-back-link" to="/lesson-26">
              ← Lesson 26
            </Link>
            <Link className="lesson22-back-link" to="/lessons">
              ← Back to lessons
            </Link>
          </div>
        </div>
        <div className="lesson22-hero-chips">
          <span>He's / She's / It's</span>
          <span>Is he…?</span>
          <span>isn't</span>
          <span>Where's she from?</span>
        </div>
      </section>

      {/* Transform drill */}
      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Grammar</p>
          <h2>Transform drill</h2>
          <p className="lesson22-section-desc">
            Скажи нову репліку вголос, потім обери правильний варіант.
          </p>
        </div>
        <div className="l26-drill-list">
          {grammarDrill.map((d, i) => (
            <div key={d.from} className="l26-drill-row">
              <strong className="l26-drill-prompt">{d.from}</strong>
              <span className="l26-drill-arrow" aria-hidden="true">
                →
              </span>
              <select
                value={transformAns[i]}
                onChange={(e) => {
                  setTransformChecked(false);
                  setTransformAns((prev) => {
                    const next = [...prev];
                    next[i] = e.target.value;
                    return next;
                  });
                }}
                className={drillSelClass(
                  transformChecked,
                  transformAns[i],
                  d.answer,
                )}
                aria-label={`Transform: ${d.from}`}
              >
                <option value="">___</option>
                {d.options.map((o) => (
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
            onClick={() => setTransformChecked(true)}
          >
            Check
          </button>
          {transformChecked && (
            <span className="l22-score">
              {transformScore} / {grammarDrill.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setTransformAns(Array(grammarDrill.length).fill(""));
              setTransformChecked(false);
            }}
          >
            Reset
          </button>
        </div>
      </section>

      {/* Three drills */}
      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Controlled practice</p>
          <h2>Three drills</h2>
          <p className="lesson22-section-desc">
            Обери відповідь. Мета — автоматизм <strong>is / isn't / Is…?</strong>
          </p>
        </div>

        <h3 className="l22-listen-subtitle">1 · Substitution</h3>
        <p className="lesson22-section-desc">
          Збери речення за підказкою (cue).
        </p>
        <div className="l26-drill-list">
          {substitutionDrill.map((d, i) => (
            <div key={d.cue} className="l26-drill-row">
              <strong className="l26-drill-prompt">{d.cue}</strong>
              <span className="l26-drill-arrow" aria-hidden="true">
                →
              </span>
              <select
                value={subAns[i]}
                onChange={(e) => {
                  setSubChecked(false);
                  setSubAns((prev) => {
                    const next = [...prev];
                    next[i] = e.target.value;
                    return next;
                  });
                }}
                className={drillSelClass(subChecked, subAns[i], d.answer)}
                aria-label={`Substitution: ${d.cue}`}
              >
                <option value="">___</option>
                {d.options.map((o) => (
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
            onClick={() => setSubChecked(true)}
          >
            Check
          </button>
          {subChecked && (
            <span className="l22-score">
              {subScore} / {substitutionDrill.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setSubAns(Array(substitutionDrill.length).fill(""));
              setSubChecked(false);
            }}
          >
            Reset
          </button>
        </div>

        <h3 className="l22-listen-subtitle">2 · Question–answer</h3>
        <div className="l26-drill-list">
          {qaDrill.map((item, i) => (
            <div key={item.q} className="l26-drill-row">
              <strong className="l26-drill-prompt">{item.q}</strong>
              <select
                value={qaAns[i]}
                onChange={(e) => {
                  setQaChecked(false);
                  setQaAns((prev) => {
                    const next = [...prev];
                    next[i] = e.target.value;
                    return next;
                  });
                }}
                className={drillSelClass(qaChecked, qaAns[i], item.answer)}
                aria-label={`Answer: ${item.q}`}
              >
                <option value="">___</option>
                {item.options.map((o) => (
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
            onClick={() => setQaChecked(true)}
          >
            Check
          </button>
          {qaChecked && (
            <span className="l22-score">
              {qaScore} / {qaDrill.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setQaAns(Array(qaDrill.length).fill(""));
              setQaChecked(false);
            }}
          >
            Reset
          </button>
        </div>

        <h3 className="l22-listen-subtitle">3 · Correction</h3>
        <p className="lesson22-section-desc">Виправ помилку в реченні.</p>
        <div className="l26-drill-list">
          {correctionDrill.map((item, i) => (
            <div key={item.wrong} className="l26-drill-row">
              <strong className="l26-drill-prompt l26-drill-prompt--wrong">
                {item.wrong}
              </strong>
              <span className="l26-drill-arrow" aria-hidden="true">
                →
              </span>
              <select
                value={fixAns[i]}
                onChange={(e) => {
                  setFixChecked(false);
                  setFixAns((prev) => {
                    const next = [...prev];
                    next[i] = e.target.value;
                    return next;
                  });
                }}
                className={drillSelClass(fixChecked, fixAns[i], item.answer)}
                aria-label={`Fix: ${item.wrong}`}
              >
                <option value="">___</option>
                {item.options.map((o) => (
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
            onClick={() => setFixChecked(true)}
          >
            Check
          </button>
          {fixChecked && (
            <span className="l22-score">
              {fixScore} / {correctionDrill.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setFixAns(Array(correctionDrill.length).fill(""));
              setFixChecked(false);
            }}
          >
            Reset
          </button>
        </div>
      </section>

      {/* R8 Listen and complete */}
      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Listening · R8</p>
          <h2>Patrick — job &amp; origin</h2>
          <p className="lesson22-section-desc">
            Listen and complete the dialogue. Послухай і заповни пропуски.
          </p>
        </div>

        <div className="l25-audio-item">
          <div className="l25-audio-meta">
            <span className="l25-audio-num">R{r8Track.r}</span>
            <div className="l25-audio-info">
              <span className="l25-audio-ex">{r8Track.exercise}</span>
              <span className="l25-audio-title">{r8Track.title}</span>
            </div>
          </div>
          <audio
            controls
            className="l25-audio-ctrl"
            src={SOUND(8)}
            preload="none"
          />
          <details className="l25-details">
            <summary className="l25-details-toggle">📄 Транскрипція</summary>
            <div className="l25-details-body">{r8Track.transcript}</div>
          </details>
        </div>

        <div
          className="l25-conv-card"
          style={{ marginTop: "0.75rem", maxWidth: 560 }}
        >
          <div className="l25-conv-title">Listen and complete</div>
          <div className="l25-dialogue">
            <div className="l25-line">
              <span className="l25-spk l25-spk--a">A</span>
              <span>
                So, Patrick, are you a{" "}
                <select
                  value={r8Ans[1] ?? ""}
                  onChange={(e) => {
                    setR8Checked(false);
                    setR8Ans((p) => ({ ...p, 1: e.target.value }));
                  }}
                  className={r8SelClass(1, r8Gaps[0].answer)}
                  aria-label="Gap 1"
                >
                  <option value="">___</option>
                  {r8Gaps[0].options.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
                ?
              </span>
            </div>
            <div className="l25-line">
              <span className="l25-spk l25-spk--b">B</span>
              <span>
                Yes, I'm a football player in{" "}
                <select
                  value={r8Ans[2] ?? ""}
                  onChange={(e) => {
                    setR8Checked(false);
                    setR8Ans((p) => ({ ...p, 2: e.target.value }));
                  }}
                  className={r8SelClass(2, r8Gaps[1].answer)}
                  aria-label="Gap 2"
                >
                  <option value="">___</option>
                  {r8Gaps[1].options.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
                .
              </span>
            </div>
            <div className="l25-line">
              <span className="l25-spk l25-spk--a">A</span>
              <span>Is it a good team?</span>
            </div>
            <div className="l25-line">
              <span className="l25-spk l25-spk--b">B</span>
              <span>
                <select
                  value={r8Ans[3] ?? ""}
                  onChange={(e) => {
                    setR8Checked(false);
                    setR8Ans((p) => ({ ...p, 3: e.target.value }));
                  }}
                  className={r8SelClass(3, r8Gaps[2].answer)}
                  aria-label="Gap 3"
                >
                  <option value="">___</option>
                  {r8Gaps[2].options.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
                .
              </span>
            </div>
            <div className="l25-line">
              <span className="l25-spk l25-spk--a">A</span>
              <span>Is the manager nice?</span>
            </div>
            <div className="l25-line">
              <span className="l25-spk l25-spk--b">B</span>
              <span>Yes, he's OK.</span>
            </div>
            <div className="l25-line">
              <span className="l25-spk l25-spk--a">A</span>
              <span>Is he from the UK?</span>
            </div>
            <div className="l25-line">
              <span className="l25-spk l25-spk--b">B</span>
              <span>
                <select
                  value={r8Ans[4] ?? ""}
                  onChange={(e) => {
                    setR8Checked(false);
                    setR8Ans((p) => ({ ...p, 4: e.target.value }));
                  }}
                  className={r8SelClass(4, r8Gaps[3].answer)}
                  aria-label="Gap 4"
                >
                  <option value="">___</option>
                  {r8Gaps[3].options.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
                .
              </span>
            </div>
            <div className="l25-line">
              <span className="l25-spk l25-spk--a">A</span>
              <span>Where's he from?</span>
            </div>
            <div className="l25-line">
              <span className="l25-spk l25-spk--b">B</span>
              <span>
                He's from{" "}
                <select
                  value={r8Ans[5] ?? ""}
                  onChange={(e) => {
                    setR8Checked(false);
                    setR8Ans((p) => ({ ...p, 5: e.target.value }));
                  }}
                  className={r8SelClass(5, r8Gaps[4].answer)}
                  aria-label="Gap 5"
                >
                  <option value="">___</option>
                  {r8Gaps[4].options.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
                .
              </span>
            </div>
          </div>
        </div>

        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setR8Checked(true)}
          >
            Check R8
          </button>
          {r8Checked && (
            <span className="l22-score">
              {r8Score} / {r8Gaps.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setR8Ans({});
              setR8Checked(false);
            }}
          >
            Reset
          </button>
        </div>
      </section>

      {/* Online tasks · after grammar */}
      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Extra practice</p>
          <h2>Online tasks</h2>
          <p className="lesson22-section-desc">
            Після граматики — відкрий кожне посилання окремо і виконай усі
            вправи на сторінці.
          </p>
        </div>

        <div className="l26-hw-links">
          <article className="l26-hw-link-card">
            <h3>1 · Countries and nationalities</h3>
            <p>
              Повтори країни та національності (A1). Відкрий посилання, прочитай
              пояснення і зроби <strong>Exercise: 1</strong>.
            </p>
            <a
              className="l22-external-link"
              href="https://test-english.com/vocabulary/a1/countries-and-nationalities-a1-english-vocabulary/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Countries and nationalities — A1 Vocabulary ↗
            </a>
          </article>

          <article className="l26-hw-link-card">
            <h3>2 · this / that / these / those</h3>
            <p>
              Вивчи покажчики <strong>this, that, these, those</strong>. Відкрий
              посилання, прочитай правило і виконай{" "}
              <strong>усі 3 grammar exercises</strong> під текстом.
            </p>
            <a
              className="l22-external-link"
              href="https://test-english.com/grammar-points/a1/this-that-these-those/"
              target="_blank"
              rel="noopener noreferrer"
            >
              this / that / these / those — A1 Grammar ↗
            </a>
          </article>

          <article className="l26-hw-link-card">
            <h3>3 · Writing a personal profile</h3>
            <p>
              Напиши короткий особистий профіль (A1). Відкрий посилання, прочитай
              модель і поради, потім виконай <strong>writing exercises</strong>{" "}
              і напиши свій профіль за зразком (ім'я, звідки ти, job / student,
              сім'я тощо).
            </p>
            <a
              className="l22-external-link"
              href="https://test-english.com/writing/a1/how-to-write-a-personal-profile-a1-english-writing/"
              target="_blank"
              rel="noopener noreferrer"
            >
              How to write a personal profile — A1 Writing ↗
            </a>
          </article>
        </div>
        <p className="lesson22-section-desc" style={{ marginTop: "1rem" }}>
          Після кожної вправи перевір відповіді — натисни <strong>Check</strong>
          .
        </p>
      </section>

      {/* Submit */}
      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Submit</p>
          <h2>Send your homework</h2>
          <p className="lesson22-section-desc">
            Напиши коротко, що було складно / що повториш. Потім надішли
            вчителю.
          </p>
        </div>
        <label className="lesson22-section-desc" htmlFor="hw26-writing">
          Reflection (optional notes):
        </label>
        <textarea
          id="hw26-writing"
          className="hw27-textarea"
          rows={6}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={`Drills: ${
            transformChecked || subChecked || qaChecked || fixChecked || r8Checked
              ? String(drillsScore)
              : "not checked yet"
          }
What was hard: …`}
        />
        <HomeworkSubmit
          lessonId="26"
          writing={[
            draft.trim() || "(no extra notes)",
            `Transform: ${transformChecked ? `${transformScore}/${grammarDrill.length}` : "not finished"}`,
            `Substitution: ${subChecked ? `${subScore}/${substitutionDrill.length}` : "not finished"}`,
            `Q&A: ${qaChecked ? `${qaScore}/${qaDrill.length}` : "not finished"}`,
            `Correction: ${fixChecked ? `${fixScore}/${correctionDrill.length}` : "not finished"}`,
            `R8 listen & complete: ${r8Checked ? `${r8Score}/${r8Gaps.length}` : "not finished"}`,
          ].join("\n")}
          quizDone={drillsDone}
          quizScore={drillsDone ? drillsScore : undefined}
        />
      </section>
    </div>
  );
}
