import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
import "../styles/lesson26.css";
import "../styles/lesson27.css";

/* ─── Data ─────────────────────────────────────────────────── */

const IMG = (file: string) =>
  `${import.meta.env.BASE_URL}images/lesson27/${file}`;

const warmUpQs = [
  "What's your name?",
  "Where are you from?",
  "Are you a student or do you work?",
  "What's your job?",
  "Do you have a big family or a small family?",
];

const profileModel = [
  "Hi! My name's Rebecca. Let me tell you about myself! I'm quite short and I am a bit fat, because I love fast food! I have long, brown hair, green eyes and I wear glasses.",
  "I'm quite quiet. I'm not very sociable. I'm a little sensitive. I get upset when people are angry with me. I'm also patient and I try to be kind!",
  "For my hobbies, I really like reading. My favourite kind of book is historical stories. I sometimes write stories and poems too. I don't like sports much. I hate games like basketball, football and hockey because I'm not a fast runner. I'm good at cooking. I love baking cakes and I enjoy eating them too! I also like drawing, but I can't paint very well.",
];

const familyVocab = [
  { en: "mother / mum", ua: "мати / мама" },
  { en: "father / dad", ua: "батько / тато" },
  { en: "parents", ua: "батьки" },
  { en: "brother", ua: "брат" },
  { en: "sister", ua: "сестра" },
  { en: "husband", ua: "чоловік (у шлюбі)" },
  { en: "wife", ua: "дружина" },
  { en: "son", ua: "син" },
  { en: "daughter", ua: "дочка" },
  { en: "children", ua: "діти" },
];

/** Tree blanks — names from the four photos */
const treeNameGaps = [
  { id: "maria", answer: "Maria", label: "my mother/mum · office worker" },
  { id: "jose", answer: "José", label: "my brother · football player" },
  { id: "luisa", answer: "Luisa", label: "my brother's wife · nurse" },
  { id: "alonzo", answer: "Alonzo", label: "my son · student" },
];

const treeNameOptions = ["", "Luisa", "Maria", "Alonzo", "José"];

const photoBank = [
  { name: "Luisa", file: "luisa.jpg", alt: "Woman in medical scrubs — nurse" },
  { name: "Maria", file: "maria.jpg", alt: "Older woman with glasses" },
  { name: "Alonzo", file: "alonzo.jpg", alt: "Young man — student" },
  { name: "José", file: "jose.jpg", alt: "Man with a beard" },
];

const familyRelQs = [
  {
    id: 1,
    before: "Cristina is Umberto's",
    answer: "daughter",
  },
  {
    id: 2,
    before: "José is Luisa's",
    answer: "husband",
  },
  {
    id: 3,
    before: "Esteban is José's",
    answer: "son",
  },
  {
    id: 4,
    before: "Alonzo is Sierra's",
    answer: "brother",
  },
  {
    id: 5,
    before: "Rafael is Alonzo's",
    answer: "father",
  },
  {
    id: 6,
    before: "Cristina is Rafael's",
    answer: "wife",
  },
  {
    id: 7,
    before: "Rosalyn and Esteban are José and Luisa's",
    answer: "children",
  },
  {
    id: 8,
    before: "Umberto and Maria are Cristina and José's",
    answer: "parents",
  },
];

const familyRelOpts = [
  "",
  "daughter",
  "husband",
  "son",
  "brother",
  "father",
  "wife",
  "children",
  "parents",
  "sister",
  "mother",
];

/** Job + place of work pairs (from Cristina's family) */
const jobPlaceItems = [
  {
    id: 1,
    who: "Cristina",
    job: "doctor",
    answer: "in a hospital",
    options: ["in a hospital", "at a school", "in an office", "in a taxi"],
  },
  {
    id: 2,
    who: "Rafael",
    job: "school teacher",
    answer: "at a school",
    options: ["at a school", "in a hospital", "in an office", "on a farm"],
  },
  {
    id: 3,
    who: "Maria",
    job: "office worker",
    answer: "in an office",
    options: ["in an office", "in a hospital", "at a school", "in a shop"],
  },
  {
    id: 4,
    who: "Luisa",
    job: "nurse",
    answer: "in a hospital",
    options: ["in a hospital", "at a school", "in an office", "in a café"],
  },
  {
    id: 5,
    who: "Umberto",
    job: "taxi driver",
    answer: "in a taxi / in the city",
    options: [
      "in a taxi / in the city",
      "in a hospital",
      "at a school",
      "in an office",
    ],
  },
];

const possAdjGaps = [
  { pronoun: "I", answer: "my", example: "___ name is Cristina." },
  { pronoun: "he", answer: "his", example: "___ name is Rafael." },
  { pronoun: "she", answer: "her", example: "___ name is Maria." },
  { pronoun: "they", answer: "their", example: "___ children are students." },
];

const possAdjOpts = ["", "my", "his", "her", "their", "your", "our"];

/** Short reading in chunks */
const readingChunks = [
  {
    id: "a",
    title: "Chunk A · Me",
    text: "Hi, I'm Cristina. I'm from Spain. I'm a doctor. I work in a hospital.",
  },
  {
    id: "b",
    title: "Chunk B · My husband",
    text: "This is my husband. His name is Rafael. He's a school teacher. He works at a school.",
  },
  {
    id: "c",
    title: "Chunk C · My parents",
    text: "My father's name is Umberto. He's a taxi driver. My mother is an office worker. She works in an office.",
  },
  {
    id: "d",
    title: "Chunk D · My children",
    text: "We have two children. Our son's name is Alonzo. Our daughter's name is Sierra. They're students.",
  },
];

const readingQs = [
  {
    id: 1,
    prompt: "Where does Cristina work?",
    answer: "In a hospital.",
    options: ["In a hospital.", "At a school.", "In an office."],
  },
  {
    id: 2,
    prompt: "What is Rafael's job?",
    answer: "He's a school teacher.",
    options: [
      "He's a school teacher.",
      "He's a taxi driver.",
      "He's a doctor.",
    ],
  },
  {
    id: 3,
    prompt: "Is Maria a nurse?",
    answer: "No, she isn't. She's an office worker.",
    options: [
      "No, she isn't. She's an office worker.",
      "Yes, she is.",
      "No, she isn't. She's a doctor.",
    ],
  },
  {
    id: 4,
    prompt: "Are Alonzo and Sierra students?",
    answer: "Yes, they are.",
    options: ["Yes, they are.", "No, they aren't.", "Yes, he is."],
  },
];

const productionPrompts = [
  "My name is… I'm from…",
  "I'm a… / I'm a student. I work in / at…",
  "This is my family.",
  "My father / mother is a… He/She works…",
  "My brother / sister / husband / wife…",
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

export default function Lesson27() {
  const pageRef = useRef<HTMLDivElement | null>(null);

  const [famVocabFlipped, setFamVocabFlipped] = useState<number[]>([]);
  const [treeAns, setTreeAns] = useState<Record<string, string>>({});
  const [treeChecked, setTreeChecked] = useState(false);
  const [relAns, setRelAns] = useState<Record<number, string>>({});
  const [relChecked, setRelChecked] = useState(false);
  const [placeAns, setPlaceAns] = useState<Record<number, string>>({});
  const [placeChecked, setPlaceChecked] = useState(false);
  const [possAns, setPossAns] = useState<string[]>(
    () => Array(possAdjGaps.length).fill(""),
  );
  const [possChecked, setPossChecked] = useState(false);
  const [readAns, setReadAns] = useState<Record<number, string>>({});
  const [readChecked, setReadChecked] = useState(false);
  const [openChunk, setOpenChunk] = useState<string>("a");

  function toggleFamVocab(idx: number) {
    setFamVocabFlipped((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx],
    );
  }

  useEffect(() => {
    const cards = pageRef.current?.querySelectorAll(".reveal-on-scroll");
    if (!cards) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-visible");
        }),
      { threshold: 0.12 },
    );
    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  const treeScore = treeNameGaps.filter((g) => treeAns[g.id] === g.answer)
    .length;
  const relScore = familyRelQs.filter((q) => relAns[q.id] === q.answer).length;
  const placeScore = jobPlaceItems.filter((q) => placeAns[q.id] === q.answer)
    .length;
  const possScore = possAdjGaps.filter((g, i) => possAns[i] === g.answer)
    .length;
  const readScore = readingQs.filter((q) => readAns[q.id] === q.answer).length;

  return (
    <div className="lesson22-page" ref={pageRef}>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="lesson22-hero panel reveal-on-scroll is-visible">
        <div className="lesson22-hero-top">
          <div>
            <p className="page-kicker">Lesson 27</p>
            <h1>About you &amp; your family</h1>
            <p className="lesson22-topic-pill">
              Goal: Tell me about yourself and your family · jobs · place of
              work · possessives
            </p>
            <p className="lesson22-subtitle">
              Profile → family tree → job + place → short reading → speaking.
              Без listening у цьому уроці.
            </p>
            <ul className="l22-goals-list">
              <li>speaking: personal profile + family;</li>
              <li>vocabulary: family · jobs · place of work;</li>
              <li>grammar: possessive 's · my / his / her / their;</li>
              <li>reading: short chunks about Cristina's family.</li>
            </ul>
          </div>
          <Link className="lesson22-back-link" to="/lessons">
            ← Back to lessons
          </Link>
        </div>
        <div className="lesson22-hero-chips">
          <span>I'm a doctor</span>
          <span>I work in a hospital</span>
          <span>my father</span>
          <span>His name is…</span>
          <span>Cristina's husband</span>
        </div>
      </section>

      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-flow">
          <span>1 Warm-up</span>
          <span>2 Profile</span>
          <span>3 Family</span>
          <span>4 Job + place</span>
          <span>5 Reading</span>
          <span>6 Speaking</span>
        </div>
      </section>

      {/* ── 1. Warm-up ───────────────────────────────────────── */}
      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-section-head">
          <p className="page-kicker">1 · Warm-up · 5 min</p>
          <h2>About you</h2>
          <p className="lesson22-section-desc">
            Короткі питання про себе — активуй profile language з homework.
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

      {/* ── 2. Profile speaking from homework ────────────────── */}
      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-section-head">
          <p className="page-kicker">2 · Speaking · personal profile</p>
          <h2>Use your homework as a model</h2>
          <p className="lesson22-section-desc">
            У homework ти писав personal profile. Тепер скажи про себе вголос:
            зовнішність, характер і hobbies. Спочатку подивись модель Rebecca.
          </p>
        </div>

        <div className="l25-conf-card" style={{ maxWidth: 640 }}>
          <div className="l25-conf-header">Model · Rebecca</div>
          <div className="l25-conf-fields">
            {profileModel.map((para) => (
              <p
                key={para.slice(0, 24)}
                style={{ margin: 0, fontSize: "var(--text-sm)", lineHeight: 1.55 }}
              >
                {para}
              </p>
            ))}
          </div>
        </div>

        <div className="lesson22-prompt-grid" style={{ marginTop: "1rem" }}>
          <div className="lesson22-prompt-card lesson22-prompt-card--task">
            Appearance: tall/short, hair, eyes, glasses…
          </div>
          <div className="lesson22-prompt-card lesson22-prompt-card--task">
            Personality: quiet, sociable, kind, patient…
          </div>
          <div className="lesson22-prompt-card lesson22-prompt-card--task">
            Hobbies: like / don't like / good at…
          </div>
        </div>

        <p className="lesson22-section-desc" style={{ marginTop: "1rem" }}>
          Writing model / practice:{" "}
          <a
            className="l22-external-link"
            href="https://test-english.com/writing/a1/how-to-write-a-personal-profile-a1-english-writing/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Personal profile — A1 Writing ↗
          </a>
        </p>
      </section>

      {/* ── 3. Family extension ──────────────────────────────── */}
      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-section-head">
          <p className="page-kicker">3 · Family · extension to profile</p>
          <h2>Cristina's family</h2>
          <p className="lesson22-section-desc">
            Family — не окрема велика тема, а продовження profile: who is in my
            family + jobs.
          </p>
        </div>

        <h3 className="l22-listen-subtitle">Family words</h3>
        <p className="lesson22-section-desc">
          Лицьова — українською, зворот — англійською.
        </p>
        <div className="l22-vocab-grid">
          {familyVocab.map((item, idx) => {
            const flipped = famVocabFlipped.includes(idx);
            return (
              <button
                key={item.en}
                type="button"
                className={`l22-vocab-card ${flipped ? "l22-vocab-card--flipped" : ""}`}
                onClick={() => toggleFamVocab(idx)}
                aria-pressed={flipped}
              >
                <div className="l22-vocab-inner">
                  <div className="l22-vocab-face l22-vocab-front">
                    <span className="l22-vocab-label">Українською</span>
                    <strong>{item.ua}</strong>
                    <span className="l22-vocab-hint">tap to flip</span>
                  </div>
                  <div className="l22-vocab-face l22-vocab-back">
                    <span className="l22-vocab-label">English</span>
                    <strong>{item.en}</strong>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <h3 className="l22-listen-subtitle">1 · Photos &amp; family tree</h3>
        <p className="lesson22-section-desc">
          Подивись на фото. Заповни імена в дереві: Maria, José, Luisa, Alonzo.
        </p>

        <div className="l27-photo-bank" aria-label="People photos">
          {photoBank.map((p) => (
            <figure key={p.name} className="l27-photo-card">
              <img src={IMG(p.file)} alt={p.alt} loading="lazy" width={160} height={160} />
              <figcaption>{p.name}</figcaption>
            </figure>
          ))}
        </div>

        <div className="l27-tree" aria-label="Cristina's family tree">
          {/* Generation 1 — parents */}
          <div className="l27-tree-gen l27-tree-gen--1">
            <article className="l27-person">
              <div className="l27-person-avatar" aria-hidden="true">
                ♂
              </div>
              <strong>Umberto</strong>
              <span>my father/dad</span>
              <em>taxi driver</em>
            </article>
            <span className="l27-heart" aria-hidden="true">
              ♥
            </span>
            <article className="l27-person l27-person--blank">
              <div className="l27-person-avatar" aria-hidden="true">
                ?
              </div>
              <select
                value={treeAns.maria ?? ""}
                onChange={(e) => {
                  setTreeChecked(false);
                  setTreeAns((p) => ({ ...p, maria: e.target.value }));
                }}
                className={drillSelClass(
                  treeChecked,
                  treeAns.maria ?? "",
                  "Maria",
                )}
                aria-label="Mother's name"
              >
                {treeNameOptions.map((o) => (
                  <option key={o || "e"} value={o}>
                    {o || "________"}
                  </option>
                ))}
              </select>
              <span>my mother/mum</span>
              <em>office worker</em>
            </article>
          </div>

          <div className="l27-tree-line" aria-hidden="true" />

          {/* Generation 2 — me + brother */}
          <div className="l27-tree-gen l27-tree-gen--2">
            <div className="l27-couple">
              <article className="l27-person l27-person--me">
                <div className="l27-person-avatar" aria-hidden="true">
                  ♀
                </div>
                <strong>Cristina</strong>
                <span>me</span>
                <em>doctor</em>
              </article>
              <span className="l27-heart" aria-hidden="true">
                ♥
              </span>
              <article className="l27-person">
                <div className="l27-person-avatar" aria-hidden="true">
                  ♂
                </div>
                <strong>Rafael</strong>
                <span>my husband</span>
                <em>school teacher</em>
              </article>
            </div>

            <div className="l27-couple">
              <article className="l27-person l27-person--blank">
                <div className="l27-person-avatar" aria-hidden="true">
                  ?
                </div>
                <select
                  value={treeAns.jose ?? ""}
                  onChange={(e) => {
                    setTreeChecked(false);
                    setTreeAns((p) => ({ ...p, jose: e.target.value }));
                  }}
                  className={drillSelClass(
                    treeChecked,
                    treeAns.jose ?? "",
                    "José",
                  )}
                  aria-label="Brother's name"
                >
                  {treeNameOptions.map((o) => (
                    <option key={o || "e"} value={o}>
                      {o || "________"}
                    </option>
                  ))}
                </select>
                <span>my brother</span>
                <em>football player</em>
              </article>
              <span className="l27-heart" aria-hidden="true">
                ♥
              </span>
              <article className="l27-person l27-person--blank">
                <div className="l27-person-avatar" aria-hidden="true">
                  ?
                </div>
                <select
                  value={treeAns.luisa ?? ""}
                  onChange={(e) => {
                    setTreeChecked(false);
                    setTreeAns((p) => ({ ...p, luisa: e.target.value }));
                  }}
                  className={drillSelClass(
                    treeChecked,
                    treeAns.luisa ?? "",
                    "Luisa",
                  )}
                  aria-label="Brother's wife"
                >
                  {treeNameOptions.map((o) => (
                    <option key={o || "e"} value={o}>
                      {o || "________"}
                    </option>
                  ))}
                </select>
                <span>my brother's wife</span>
                <em>nurse</em>
              </article>
            </div>
          </div>

          <div className="l27-tree-line" aria-hidden="true" />

          {/* Generation 3 — children */}
          <div className="l27-tree-gen l27-tree-gen--3">
            <div className="l27-kids">
              <article className="l27-person l27-person--blank l27-person--sm">
                <div className="l27-person-avatar" aria-hidden="true">
                  ?
                </div>
                <select
                  value={treeAns.alonzo ?? ""}
                  onChange={(e) => {
                    setTreeChecked(false);
                    setTreeAns((p) => ({ ...p, alonzo: e.target.value }));
                  }}
                  className={drillSelClass(
                    treeChecked,
                    treeAns.alonzo ?? "",
                    "Alonzo",
                  )}
                  aria-label="Son's name"
                >
                  {treeNameOptions.map((o) => (
                    <option key={o || "e"} value={o}>
                      {o || "________"}
                    </option>
                  ))}
                </select>
                <span>my son</span>
                <em>student</em>
              </article>
              <article className="l27-person l27-person--sm">
                <div className="l27-person-avatar" aria-hidden="true">
                  ♀
                </div>
                <strong>Sierra</strong>
                <span>my daughter</span>
                <em>student</em>
              </article>
            </div>
            <div className="l27-kids">
              <article className="l27-person l27-person--sm">
                <div className="l27-person-avatar" aria-hidden="true">
                  ♀
                </div>
                <strong>Rosalyn</strong>
                <span>my brother's daughter</span>
                <em>student</em>
              </article>
              <article className="l27-person l27-person--sm">
                <div className="l27-person-avatar" aria-hidden="true">
                  ♂
                </div>
                <strong>Esteban</strong>
                <span>my brother's son</span>
                <em>student</em>
              </article>
            </div>
          </div>
        </div>

        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setTreeChecked(true)}
          >
            Check names
          </button>
          {treeChecked && (
            <span className="l22-score">
              {treeScore} / {treeNameGaps.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setTreeAns({});
              setTreeChecked(false);
            }}
          >
            Reset
          </button>
        </div>

        <h3 className="l22-listen-subtitle">
          Relations · possessive 's
        </h3>
        <p className="lesson22-section-desc">
          Приклад: <em>Rafael is Cristina's husband.</em> Обери правильне слово.
        </p>
        <div className="l26-drill-list">
          {familyRelQs.map((q) => (
            <div key={q.id} className="l26-drill-row">
              <span className="l26-drill-prompt">
                {q.id}. {q.before}{" "}
                <select
                  value={relAns[q.id] ?? ""}
                  onChange={(e) => {
                    setRelChecked(false);
                    setRelAns((p) => ({ ...p, [q.id]: e.target.value }));
                  }}
                  className={drillSelClass(
                    relChecked,
                    relAns[q.id] ?? "",
                    q.answer,
                  )}
                  aria-label={`Sentence ${q.id}`}
                >
                  {familyRelOpts.map((o) => (
                    <option key={o || "e"} value={o}>
                      {o || "___"}
                    </option>
                  ))}
                </select>
                .
              </span>
            </div>
          ))}
        </div>
        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setRelChecked(true)}
          >
            Check
          </button>
          {relChecked && (
            <span className="l22-score">
              {relScore} / {familyRelQs.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setRelAns({});
              setRelChecked(false);
            }}
          >
            Reset
          </button>
        </div>

        <h3 className="l22-listen-subtitle">my / his / her / their</h3>
        <div className="l26-poss-grid">
          {possAdjGaps.map((row, i) => (
            <div key={row.pronoun} className="l26-poss-row">
              <span className="l26-poss-pronoun">{row.pronoun}</span>
              <span className="l26-drill-arrow">→</span>
              <select
                value={possAns[i]}
                onChange={(e) => {
                  setPossChecked(false);
                  setPossAns((prev) => {
                    const next = [...prev];
                    next[i] = e.target.value;
                    return next;
                  });
                }}
                className={drillSelClass(possChecked, possAns[i], row.answer)}
                aria-label={`Possessive for ${row.pronoun}`}
              >
                {possAdjOpts.map((o) => (
                  <option key={o || "e"} value={o}>
                    {o || "___"}
                  </option>
                ))}
              </select>
              <span className="l27-poss-ex">
                {row.example.replace("___", possAns[i] || "___")}
              </span>
            </div>
          ))}
        </div>
        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setPossChecked(true)}
          >
            Check
          </button>
          {possChecked && (
            <span className="l22-score">
              {possScore} / {possAdjGaps.length}
            </span>
          )}
        </div>
      </section>

      {/* ── 4. Jobs + place of work ──────────────────────────── */}
      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-section-head">
          <p className="page-kicker">4 · Jobs + place of work</p>
          <h2>Who works where?</h2>
          <p className="lesson22-section-desc">
            Job і place of work — одна пара:{" "}
            <em>She's a doctor. She works in a hospital.</em>
          </p>
        </div>

        <div className="l25-grammar-box" style={{ marginBottom: "1rem" }}>
          <div className="l25-grammar-label">Model</div>
          <div className="l25-grammar-rows">
            <div className="l25-gr-row l25-gr-row--pos">
              <span className="l25-gr-sign">job</span>
              <div className="l25-gr-cells">
                <span>
                  I'm a <strong>doctor</strong>.
                </span>
                <span>
                  He's a <strong>school teacher</strong>.
                </span>
              </div>
            </div>
            <div className="l25-gr-row l25-gr-row--pos">
              <span className="l25-gr-sign">place</span>
              <div className="l25-gr-cells">
                <span>
                  I work <strong>in a hospital</strong>.
                </span>
                <span>
                  He works <strong>at a school</strong>.
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="l26-drill-list">
          {jobPlaceItems.map((item) => (
            <div key={item.id} className="l26-drill-row">
              <strong className="l26-drill-prompt">
                {item.who} is a {item.job}. He/She works…
              </strong>
              <select
                value={placeAns[item.id] ?? ""}
                onChange={(e) => {
                  setPlaceChecked(false);
                  setPlaceAns((p) => ({ ...p, [item.id]: e.target.value }));
                }}
                className={drillSelClass(
                  placeChecked,
                  placeAns[item.id] ?? "",
                  item.answer,
                )}
                aria-label={`Place for ${item.who}`}
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
            onClick={() => setPlaceChecked(true)}
          >
            Check
          </button>
          {placeChecked && (
            <span className="l22-score">
              {placeScore} / {jobPlaceItems.length}
            </span>
          )}
          <button
            type="button"
            className="l25-cr-mini-btn"
            onClick={() => {
              setPlaceAns({});
              setPlaceChecked(false);
            }}
          >
            Reset
          </button>
        </div>

        <div className="lesson22-prompt-grid" style={{ marginTop: "1rem" }}>
          <div className="lesson22-prompt-card lesson22-prompt-card--task">
            Talk about Cristina: job + place of work.
          </div>
          <div className="lesson22-prompt-card lesson22-prompt-card--task">
            Talk about one person in your family: job + place.
          </div>
        </div>
      </section>

      {/* ── 5. Reading in chunks ─────────────────────────────── */}
      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-section-head">
          <p className="page-kicker">5 · Reading · short chunks</p>
          <h2>Cristina's profile</h2>
          <p className="lesson22-section-desc">
            Читай по одному chunk. Потім відповідай на питання.
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
              onClick={() => setOpenChunk(c.id)}
            >
              {c.title}
            </button>
          ))}
        </div>
        <div className="l27-chunk-panel">
          {readingChunks
            .filter((c) => c.id === openChunk)
            .map((c) => (
              <p key={c.id}>{c.text}</p>
            ))}
        </div>

        <details className="l25-details" style={{ marginTop: "0.75rem" }}>
          <summary className="l25-details-toggle">📄 Full text</summary>
          <div className="l25-details-body">
            {readingChunks.map((c) => (
              <p key={c.id}>{c.text}</p>
            ))}
          </div>
        </details>

        <h3 className="l22-listen-subtitle">Check understanding</h3>
        <div className="l26-drill-list">
          {readingQs.map((q) => (
            <div key={q.id} className="l26-drill-row">
              <strong className="l26-drill-prompt">
                {q.id}. {q.prompt}
              </strong>
              <select
                value={readAns[q.id] ?? ""}
                onChange={(e) => {
                  setReadChecked(false);
                  setReadAns((p) => ({ ...p, [q.id]: e.target.value }));
                }}
                className={drillSelClass(
                  readChecked,
                  readAns[q.id] ?? "",
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
            onClick={() => setReadChecked(true)}
          >
            Check
          </button>
          {readChecked && (
            <span className="l22-score">
              {readScore} / {readingQs.length}
            </span>
          )}
        </div>
      </section>

      {/* ── 6. Mini production ───────────────────────────────── */}
      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-section-head">
          <p className="page-kicker">6 · Mini production · 5–7 min</p>
          <h2>Tell me about yourself and your family</h2>
          <p className="lesson22-section-desc">
            6–8 речень вголос. Використай homework profile + 2–3 речення про
            сім'ю (jobs / place of work).
          </p>
        </div>

        <div className="l25-conf-card" style={{ maxWidth: 560, marginBottom: "1rem" }}>
          <div className="l25-conf-header">Speak · scaffold</div>
          <div className="l25-conf-fields">
            {productionPrompts.map((p) => (
              <p
                key={p}
                style={{ margin: 0, fontSize: "var(--text-sm)", lineHeight: 1.55 }}
              >
                {p}
              </p>
            ))}
          </div>
        </div>

        <div className="lesson22-prompt-grid">
          <div className="lesson22-prompt-card lesson22-prompt-card--task">
            Record / say 30–45 seconds about you + your family.
          </div>
          <div className="lesson22-prompt-card lesson22-prompt-card--task">
            Include: name, from, job/student, one family member + job + place.
          </div>
        </div>
      </section>

      {/* Homework tip */}
      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-section-head">
          <p className="page-kicker">After class</p>
          <h2>Homework link</h2>
          <p className="lesson22-section-desc">
            Продовжуй практику на{" "}
            <Link className="lesson22-back-link" to="/hw-26">
              Homework · Lesson 26
            </Link>{" "}
            (profile writing + drills). Listening для цього уроку додамо пізніше.
          </p>
        </div>
      </section>
    </div>
  );
}
