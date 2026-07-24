import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
import "../styles/lesson26.css";

/* ─── Data ─────────────────────────────────────────────────── */

const IMG = (file: string) =>
  `${import.meta.env.BASE_URL}images/lesson26/${file}`;

/** Core jobs a–h (Ex 1b) — order matches the Student's Book */
const jobsCore = [
  { letter: "a", en: "football player", ua: "футболіст" },
  { letter: "b", en: "doctor", ua: "лікар" },
  { letter: "c", en: "school teacher", ua: "шкільний вчитель" },
  { letter: "d", en: "pilot", ua: "пілот" },
  { letter: "e", en: "farmer", ua: "фермер" },
  { letter: "f", en: "nurse", ua: "медсестра / медбрат" },
  { letter: "g", en: "taxi driver", ua: "таксист" },
  { letter: "h", en: "office worker", ua: "офісний працівник" },
];

/** Ex 1c · R6 — tap syllables to underline stress. breakAfter = space after index */
const jobStressItems = [
  {
    en: "football player",
    parts: ["foot", "ball", "player"],
    stressed: [0],
    breakAfter: [1],
  },
  { en: "doctor", parts: ["doc", "tor"], stressed: [0], breakAfter: [] },
  {
    en: "school teacher",
    parts: ["school", "teach", "er"],
    stressed: [0, 1],
    breakAfter: [0],
  },
  { en: "pilot", parts: ["pi", "lot"], stressed: [0], breakAfter: [] },
  { en: "farmer", parts: ["far", "mer"], stressed: [0], breakAfter: [] },
  { en: "nurse", parts: ["nurse"], stressed: [0], breakAfter: [] },
  {
    en: "taxi driver",
    parts: ["tax", "i", "dri", "ver"],
    stressed: [0, 2],
    breakAfter: [1],
  },
  {
    en: "office worker",
    parts: ["off", "ice", "work", "er"],
    stressed: [0, 2],
    breakAfter: [1],
  },
];

/** Vocabulary Bank — extra jobs */
const jobsBank = [
  { en: "student", ua: "студент" },
  { en: "police officer", ua: "поліцейський / поліцейська" },
  { en: "manager", ua: "менеджер, керівник" },
  { en: "soldier", ua: "солдат" },
  { en: "artist", ua: "художник / митець" },
  { en: "writer", ua: "письменник" },
  { en: "tennis player", ua: "тенісист" },
  { en: "shop assistant", ua: "продавець / продавчиня" },
  { en: "bus driver", ua: "водій автобуса" },
  { en: "waiter / waitress", ua: "офіціант / офіціантка" },
  { en: "receptionist", ua: "адміністратор (ресепшн)" },
  { en: "tour guide", ua: "гід / екскурсовод" },
  { en: "engineer", ua: "інженер" },
  { en: "chef", ua: "шеф-кухар" },
  { en: "firefighter", ua: "пожежник" },
  { en: "dentist", ua: "стоматолог" },
];

/** All jobs for one flip-card section: core + Vocabulary Bank */
const jobsVocab = [
  ...jobsCore.map(({ en, ua }) => ({ en, ua })),
  ...jobsBank,
];

const jobLetterByEn = Object.fromEntries(
  jobsCore.map((j) => [j.en, j.letter]),
) as Record<string, string>;

type JobProfile = {
  num: number;
  name: string;
  city: string;
  country: string;
  job: string;
  photo: string;
  alt: string;
};

/** Map profiles 1–8 — textbook cards with photos */
const jobProfiles: JobProfile[] = [
  {
    num: 1,
    name: "Josh King",
    city: "Chicago",
    country: "the US",
    job: "taxi driver",
    photo: IMG("josh-taxi.jpg"),
    alt: "Yellow New York taxi cab",
  },
  {
    num: 2,
    name: "Amy Gardner",
    city: "Norwich",
    country: "the UK",
    job: "farmer",
    photo: IMG("amy-farmer.jpg"),
    alt: "Woman farmer holding chickens on a farm",
  },
  {
    num: 3,
    name: "Lidia Nowak",
    city: "Torun",
    country: "Poland",
    job: "pilot",
    photo: IMG("lidia-pilot.jpg"),
    alt: "Woman pilot in flight suit in a cockpit",
  },
  {
    num: 4,
    name: "Sakura Sato",
    city: "Nagoya",
    country: "Japan",
    job: "office worker",
    photo: IMG("sakura-office.jpg"),
    alt: "Office worker at a desk with a laptop",
  },
  {
    num: 5,
    name: "Yolanda Alvarez",
    city: "Guadalajara",
    country: "Mexico",
    job: "doctor",
    photo: IMG("yolanda-doctor.jpg"),
    alt: "Woman doctor in a white coat with a stethoscope",
  },
  {
    num: 6,
    name: "Santiago Castillo",
    city: "Mendoza",
    country: "Argentina",
    job: "football player",
    photo: IMG("santiago-football.jpg"),
    alt: "Football player kicking a ball on a pitch",
  },
  {
    num: 7,
    name: "Emilio Garcia",
    city: "Valencia",
    country: "Spain",
    job: "nurse",
    photo: IMG("emilio-nurse.jpg"),
    alt: "Male nurse in a white coat with a stethoscope",
  },
  {
    num: 8,
    name: "Mali Arak",
    city: "Chiang Mai",
    country: "Thailand",
    job: "school teacher",
    photo: IMG("mali-teacher.jpg"),
    alt: "School teacher reading a book to children",
  },
];

/** Orthogonal elbow path with soft rounded corners (textbook style) */
function roundedElbow(points: [number, number][], r = 2.4): string {
  if (points.length < 2) return "";
  const fmt = (n: number) => Number(n.toFixed(2));
  let d = `M${fmt(points[0][0])} ${fmt(points[0][1])}`;
  for (let i = 1; i < points.length - 1; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const next = points[i + 1];
    const dx1 = curr[0] - prev[0];
    const dy1 = curr[1] - prev[1];
    const dx2 = next[0] - curr[0];
    const dy2 = next[1] - curr[1];
    const len1 = Math.hypot(dx1, dy1) || 1;
    const len2 = Math.hypot(dx2, dy2) || 1;
    const rr = Math.min(r, len1 / 2, len2 / 2);
    const bx = curr[0] - (dx1 / len1) * rr;
    const by = curr[1] - (dy1 / len1) * rr;
    const ax = curr[0] + (dx2 / len2) * rr;
    const ay = curr[1] + (dy2 / len2) * rr;
    d += ` L${fmt(bx)} ${fmt(by)} Q${fmt(curr[0])} ${fmt(curr[1])} ${fmt(ax)} ${fmt(ay)}`;
  }
  const last = points[points.length - 1];
  d += ` L${fmt(last[0])} ${fmt(last[1])}`;
  return d;
}

/** Pin on map (%) → rounded elbow to card edge (viewBox 0–100) */
const mapConnectors: { num: number; pin: [number, number]; path: string }[] = [
  { num: 1, pin: [20, 30], path: roundedElbow([[20, 30], [20, 18], [33, 18]]) },
  { num: 2, pin: [50, 24], path: roundedElbow([[50, 24], [50, 14], [86, 14]]) },
  { num: 3, pin: [54, 26], path: roundedElbow([[54, 26], [90, 26], [90, 38]]) },
  { num: 4, pin: [82, 32], path: roundedElbow([[82, 32], [90, 32], [90, 58]]) },
  { num: 5, pin: [16, 40], path: roundedElbow([[16, 40], [10, 40], [10, 48]]) },
  { num: 6, pin: [24, 68], path: roundedElbow([[24, 68], [24, 82], [12, 82]]) },
  { num: 7, pin: [48, 34], path: roundedElbow([[48, 34], [48, 82], [43, 82]]) },
  { num: 8, pin: [76, 44], path: roundedElbow([[76, 44], [76, 82], [88, 82]]) },
];

/** Profiles for speaking (reuse map cards) */
const speakProfiles = jobProfiles.map((p) => ({
  name: p.name,
  city: p.city,
  country: p.country,
  job: p.job,
  photo: p.photo,
  alt: p.alt,
}));

const warmUpQs = [
  "What's your job?",
  "What do you do?",
  "Do you know any doctors / nurses / pilots?",
  "Is your friend a teacher?",
];

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

type HospitalQ = {
  id: number;
  prompt: string;
  options: string[];
  answer: string;
};

const hospitalQs: HospitalQ[] = [
  {
    id: 1,
    prompt: "Is the hospital in London?",
    options: ["Yes, it is.", "No, it isn't."],
    answer: "No, it isn't.",
  },
  {
    id: 2,
    prompt: "Is Paul from the UK?",
    options: ["Yes, he is.", "No, he isn't."],
    answer: "Yes, he is.",
  },
  {
    id: 3,
    prompt: "Is Mila a doctor?",
    options: [
      "No, she isn't a doctor. She's a nurse.",
      "No, she isn't a doctor. She's an office worker.",
    ],
    answer: "No, she isn't a doctor. She's an office worker.",
  },
];

const exitQs = [
  "Is she a doctor?",
  "Is he from Spain?",
  "What's his job?",
];

const SOUND = (r: number) =>
  `${import.meta.env.BASE_URL}sounds/RM_A1_SB_U1_R${r}.mp3`;

type AudioTrackData = {
  r: number;
  exercise: string;
  title: string;
  transcript: React.ReactNode;
};

const tracksUnit1B: AudioTrackData[] = [
  {
    r: 6,
    exercise: "Pronunciation",
    title: "Jobs — stressed syllables",
    transcript: (
      <>
        <ol>
          {jobStressItems.map((j) => (
            <li key={j.en}>
              {j.parts.map((p, i) => (
                <span key={p + i}>
                  {j.stressed.includes(i) ? <u>{p}</u> : p}
                  {j.breakAfter.includes(i) ? " " : ""}
                </span>
              ))}
            </li>
          ))}
        </ol>
      </>
    ),
  },
  {
    r: 7,
    exercise: "Grammar",
    title: "be: he/she/it — short forms",
    transcript: (
      <ol>
        <li>She's a doctor.</li>
        <li>He's a nurse.</li>
        <li>It's a small hospital.</li>
        <li>Where's she from?</li>
        <li>She isn't a doctor.</li>
        <li>Mila's an office worker.</li>
      </ol>
    ),
  },
  {
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
    ),
  },
];

/** R8 · listen and complete (Patrick dialogue) */
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

function AudioPlayer({ track }: { track: AudioTrackData }) {
  return (
    <div className="l25-audio-item">
      <div className="l25-audio-meta">
        <span className="l25-audio-num">R{track.r}</span>
        <div className="l25-audio-info">
          <span className="l25-audio-ex">{track.exercise}</span>
          <span className="l25-audio-title">{track.title}</span>
        </div>
      </div>
      <audio
        controls
        className="l25-audio-ctrl"
        src={SOUND(track.r)}
        preload="none"
      />
      <details className="l25-details">
        <summary className="l25-details-toggle">📄 Транскрипція</summary>
        <div className="l25-details-body">{track.transcript}</div>
      </details>
    </div>
  );
}

/* ─── Page ─────────────────────────────────────────────────── */

export default function Lesson26() {
  const pageRef = useRef<HTMLDivElement | null>(null);

  const [vocabFlipped, setVocabFlipped] = useState<number[]>([]);
  /** Ex 1b answers: letter a–h per profile */
  const [jobAns, setJobAns] = useState<string[]>(Array(8).fill(""));
  const [jobChecked, setJobChecked] = useState(false);
  /** Ex 1c: selected syllable indexes per job */
  const [stressSel, setStressSel] = useState<number[][]>(
    () => jobStressItems.map(() => []),
  );
  const [stressChecked, setStressChecked] = useState(false);
  const [hospAns, setHospAns] = useState<Record<number, string>>({});
  const [hospChecked, setHospChecked] = useState(false);
  const [r8Ans, setR8Ans] = useState<Record<number, string>>({});
  const [r8Checked, setR8Checked] = useState(false);
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

  function toggleVocab(idx: number) {
    setVocabFlipped((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx],
    );
  }

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

  function toggleStressSyl(jobIdx: number, sylIdx: number) {
    setStressChecked(false);
    setStressSel((prev) => {
      const next = prev.map((row) => [...row]);
      const row = next[jobIdx];
      next[jobIdx] = row.includes(sylIdx)
        ? row.filter((i) => i !== sylIdx)
        : [...row, sylIdx].sort((a, b) => a - b);
      return next;
    });
  }

  function sameIdxSet(a: number[], b: number[]) {
    if (a.length !== b.length) return false;
    return a.every((v, i) => v === b[i]);
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

  const jobScore = jobAns.filter(
    (v, i) => v === jobLetterByEn[jobProfiles[i].job],
  ).length;
  const stressScore = jobStressItems.filter((j, i) =>
    sameIdxSet(stressSel[i] ?? [], j.stressed),
  ).length;
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
  const hospScore = hospitalQs.filter((q) => hospAns[q.id] === q.answer).length;
  const r8Score = r8Gaps.filter((g) => r8Ans[g.id] === g.answer).length;

  function r8SelClass(id: number, answer: string) {
    const v = r8Ans[id] ?? "";
    if (!r8Checked) return "l25-cr-sel";
    if (v === answer) return "l25-cr-sel l25-cr-sel--ok";
    if (v) return "l25-cr-sel l25-cr-sel--err";
    return "l25-cr-sel";
  }

  return (
    <div className="lesson22-page" ref={pageRef}>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="lesson22-hero panel reveal-on-scroll is-visible">
        <div className="lesson22-hero-top">
          <div>
            <p className="page-kicker">Lesson 26</p>
            <h1>Jobs</h1>
            <p className="lesson22-topic-pill">
              Goal: ask and answer about jobs · Grammar: be he/she/it ·
              Vocabulary: jobs
            </p>
            <p className="lesson22-subtitle">
              One-to-one план: warm-up → jobs + stress → be he/she/it → drills →
              profile speaking → hospital reading → quick review.
            </p>
            <ul className="l22-goals-list">
              <li>vocabulary: jobs;</li>
              <li>grammar: be — he / she / it;</li>
              <li>speaking: ask and answer about jobs;</li>
              <li>reading: Green Cross Hospital staff;</li>
              <li>pronunciation: stress in job words.</li>
            </ul>
          </div>
          <Link className="lesson22-back-link" to="/lessons">
            ← Back to lessons
          </Link>
        </div>
        <div className="lesson22-hero-chips">
          <span>She's a doctor</span>
          <span>He's a nurse</span>
          <span>Is he a pilot?</span>
          <span>Yes, he is</span>
          <span>Where's she from?</span>
        </div>
      </section>

      {/* ── Flow ─────────────────────────────────────────────── */}
      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-flow">
          <span>0 Review</span>
          <span>1 Warm-up</span>
          <span>2 Vocab</span>
          <span>3 Grammar</span>
          <span>4 Drills</span>
          <span>5 Speaking</span>
          <span>6 Reading</span>
          <span>7 Review</span>
        </div>
        <p className="lesson22-section-desc">
          Менше matching — більше усного результату. Кожен блок → speaking.
        </p>
      </section>

      {/* ── 0. Review previous lesson ─────────────────────────── */}
      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-section-head">
          <p className="page-kicker">Review · Lesson 25</p>
          <h2>Countries, nationalities &amp; languages</h2>
          <p className="lesson22-section-desc">
            Перед jobs — коротке повторення минулого уроку. Listening test A1:
            країни, національності та мови.
          </p>
        </div>
        <a
          className="l22-external-link"
          href="https://test-english.com/listening/a1/countries-nationalities-and-languages-a1-english-listening-test/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Countries, nationalities and languages — A1 Listening Test ↗
        </a>
      </section>

      {/* ── 1. Warm-up · 5 min ───────────────────────────────── */}
      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-section-head">
          <p className="page-kicker">1 · Warm-up · 5 min</p>
          <h2>Jobs around you</h2>
          <p className="lesson22-section-desc">
            Відповідай вголос. Це активує <strong>be + jobs</strong> без теорії.
          </p>
        </div>
        <div className="lesson22-prompt-grid">
          {warmUpQs.map((q) => (
            <div key={q} className="lesson22-prompt-card">
              {q}
            </div>
          ))}
        </div>
        <div className="l25-wordbox" style={{ marginTop: "1rem" }}>
          <span className="l25-wordbox-item">I'm a …</span>
          <span className="l25-wordbox-item">I'm a student</span>
          <span className="l25-wordbox-item">Yes, he/she is</span>
          <span className="l25-wordbox-item">No, he/she isn't</span>
        </div>

        <blockquote className="l23-rule-quote" style={{ marginTop: "1.25rem" }}>
          <p>
            <strong>Quick reminder · countries.</strong> Перед більшістю країн{" "}
            <em>the</em> не ставимо: <em>Spain, Japan, Poland, Ukraine</em>.{" "}
            Але з <em>the</em> кажемо назви з «Kingdom / States» і деякі острови:{" "}
            <em>the UK, the US, the Maldives</em>. Приклад:{" "}
            <em>I'm from Ukraine</em> · <em>He's from the UK</em>.
          </p>
        </blockquote>
      </section>

      {/* ── 2. Vocabulary · Jobs ──────────────────────────────── */}
      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-section-head">
          <p className="page-kicker">Vocabulary</p>
          <h2>Jobs</h2>
          <p className="lesson22-section-desc">
            Лицьова — українською, зворот — англійською. Далі вправи 1a–1c
            (map, jobs a–h, stress R6) → like / not like.
          </p>
        </div>

        <div className="l22-vocab-grid">
          {jobsVocab.map((item, idx) => {
            const flipped = vocabFlipped.includes(idx);
            return (
              <button
                key={item.en}
                type="button"
                className={`l22-vocab-card ${flipped ? "l22-vocab-card--flipped" : ""}`}
                onClick={() => toggleVocab(idx)}
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

        {/* ── Ex 1a ─────────────────────────────────────────── */}
        <h3 className="l22-listen-subtitle">1a · Where are the people from?</h3>
        <p className="lesson22-section-desc">
          Look at the map and the profiles. Where are the people from?
        </p>
        <p className="lesson22-section-desc">
          Подивись на карту й профілі. Скажи вголос:{" "}
          <em>He's / She's from …</em>
        </p>

        {/* ── Ex 1b ─────────────────────────────────────────── */}
        <h3 className="l22-listen-subtitle">1b · Complete the jobs</h3>
        <p className="lesson22-section-desc">
          Complete 1–8 in the profiles with jobs <strong>a–h</strong>. Дивись на
          фото і обери літеру.
        </p>
        <div className="l26-job-bank" aria-label="Jobs a–h">
          {jobsCore.map((j) => (
            <span key={j.letter} className="l26-job-bank-item">
              <strong>{j.letter}</strong> {j.en}
            </span>
          ))}
        </div>

        <div className="l26-map-stage" aria-label="World map with job profiles">
          <img
            className="l26-map-bg"
            src={IMG("world-map.png")}
            alt=""
            aria-hidden="true"
          />
          <svg
            className="l26-map-svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {mapConnectors.map((c) => (
              <path key={c.num} className="l26-map-line" d={c.path} />
            ))}
          </svg>
          {mapConnectors.map((c) => (
            <span
              key={`dot-${c.num}`}
              className="l26-map-dot"
              style={{ left: `${c.pin[0]}%`, top: `${c.pin[1]}%` }}
              aria-hidden="true"
            />
          ))}

          {jobProfiles.map((p, i) => {
            const v = jobAns[i];
            const correct = jobLetterByEn[p.job];
            const ok = v === correct;
            return (
              <article
                key={p.num}
                className={`l26-map-card l26-map-card--${p.num}`}
              >
                <div className="l26-profile-photo-wrap">
                  <img
                    className="l26-profile-photo"
                    src={p.photo}
                    alt={p.alt}
                    loading="lazy"
                    width={264}
                    height={172}
                  />
                </div>
                <p className="l26-profile-name">Name: {p.name}</p>
                <div className="l26-profile-body">
                  <div className="l26-profile-row">
                    <span className="l26-profile-label">Job:</span>
                    <sup className="l26-profile-num">{p.num}</sup>
                    <select
                      value={v}
                      onChange={(e) => {
                        setJobChecked(false);
                        setJobAns((prev) => {
                          const n = [...prev];
                          n[i] = e.target.value;
                          return n;
                        });
                      }}
                      className={`l26-profile-blank${
                        jobChecked
                          ? ok
                            ? " l25-cr-sel--ok"
                            : v
                              ? " l25-cr-sel--err"
                              : ""
                          : ""
                      }`}
                      aria-label={`Job for ${p.name}`}
                    >
                      <option value="">________</option>
                      {jobsCore.map((j) => (
                        <option key={j.letter} value={j.letter}>
                          {j.letter}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="l26-profile-row">
                    <span className="l26-profile-label">City:</span>
                    <span>{p.city}</span>
                  </div>
                  <div className="l26-profile-row">
                    <span className="l26-profile-label">Country:</span>
                    <span>{p.country}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="l25-cr-actions" style={{ marginTop: "1rem" }}>
          <button
            className="l22-check-btn"
            onClick={() => setJobChecked(true)}
          >
            Check 1b
          </button>
          {jobChecked && <span className="l22-score">{jobScore} / 8</span>}
          <button
            className="l25-cr-mini-btn"
            onClick={() => {
              setJobAns(Array(8).fill(""));
              setJobChecked(false);
            }}
          >
            Reset
          </button>
        </div>

        {/* ── Ex 1c ─────────────────────────────────────────── */}
        <h3 className="l22-listen-subtitle">1c · Stress · R6</h3>
        <p className="lesson22-section-desc">
          Listen and underline the stressed syllables in the jobs in Exercise
          1b. Then listen again and repeat.
        </p>
        <p className="lesson22-section-desc">
          Натисни наголос(и) у кожному слові — як підкреслення в підручнику.
          Приклад: <u>foot</u>ball player.
        </p>
        <audio
          controls
          src={SOUND(6)}
          preload="none"
          className="l25-audio-ctrl"
          style={{ marginBottom: "0.75rem" }}
        />
        <div className="l26-stress-list">
          {jobStressItems.map((j, ji) => {
            const sel = stressSel[ji] ?? [];
            const ok = sameIdxSet(sel, j.stressed);
            return (
              <div key={j.en} className="l26-stress-row">
                <span className="l26-stress-letter">
                  {jobsCore[ji].letter}
                </span>
                <div className="l26-stress-parts">
                  {j.parts.map((part, pi) => {
                    const on = sel.includes(pi);
                    const should = j.stressed.includes(pi);
                    let cls = "l26-stress-syl";
                    if (on) cls += " l26-stress-syl--on";
                    if (stressChecked) {
                      if (should && on) cls += " l26-stress-syl--ok";
                      else if (on && !should) cls += " l26-stress-syl--err";
                      else if (should && !on) cls += " l26-stress-syl--miss";
                    }
                    return (
                      <span key={`${j.en}-${pi}`} className="l26-stress-chunk">
                        <button
                          type="button"
                          className={cls}
                          onClick={() => toggleStressSyl(ji, pi)}
                          aria-pressed={on}
                        >
                          {part}
                        </button>
                        {j.breakAfter.includes(pi) ? (
                          <span className="l26-stress-gap"> </span>
                        ) : null}
                      </span>
                    );
                  })}
                </div>
                {stressChecked && (
                  <span
                    className={
                      ok ? "l26-stress-mark l26-stress-mark--ok" : "l26-stress-mark"
                    }
                    aria-hidden="true"
                  >
                    {ok ? "✓" : "✗"}
                  </span>
                )}
              </div>
            );
          })}
        </div>
        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            className="l22-check-btn"
            onClick={() => setStressChecked(true)}
          >
            Check 1c
          </button>
          {stressChecked && (
            <span className="l22-score">{stressScore} / 8</span>
          )}
          <button
            className="l25-cr-mini-btn"
            onClick={() => {
              setStressSel(jobStressItems.map(() => []));
              setStressChecked(false);
            }}
          >
            Reset
          </button>
        </div>

        <div className="lesson22-prompt-grid" style={{ marginTop: "1rem" }}>
          <div className="lesson22-prompt-card lesson22-prompt-card--task">
            Which jobs do you know in English?
          </div>
          <div className="lesson22-prompt-card lesson22-prompt-card--task">
            Which of these jobs do you like / not like?
          </div>
        </div>
      </section>

      {/* ── 3. Grammar · 8–10 min ─────────────────────────────── */}
      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-section-head">
          <p className="page-kicker">3 · Grammar · 8–10 min</p>
          <h2>be: he / she / it</h2>
          <p className="lesson22-section-desc">
            Коротко: model → drill. Без довгої теорії.
          </p>
        </div>

        <div className="l25-grammar-box">
          <div className="l25-grammar-label">be: he / she / it</div>
          <div className="l25-grammar-rows">
            <div className="l25-gr-row l25-gr-row--pos">
              <span className="l25-gr-sign">+</span>
              <div className="l25-gr-cells">
                <span>
                  <strong>He's</strong> a doctor.
                </span>
                <span>
                  <strong>She's</strong> a nurse.
                </span>
                <span>
                  <strong>It's</strong> a small hospital.
                </span>
              </div>
            </div>
            <div className="l25-gr-row l25-gr-row--q">
              <span className="l25-gr-sign">?</span>
              <div className="l25-gr-cells">
                <span>
                  <strong>Is he</strong> a pilot?
                </span>
                <span className="l25-gr-answer">
                  Yes, <strong>he is</strong>. / No, <strong>he isn't</strong>.
                </span>
              </div>
            </div>
            <div className="l25-gr-row l25-gr-row--neg">
              <span className="l25-gr-sign">−</span>
              <div className="l25-gr-cells">
                <span>
                  He <strong>isn't</strong> from the UK.
                </span>
                <span>
                  She <strong>isn't</strong> a doctor.
                </span>
              </div>
            </div>
            <div className="l25-gr-row l25-gr-row--where">
              <span className="l25-gr-sign">where</span>
              <div className="l25-gr-cells">
                <span>
                  <strong>Where's</strong> she from?
                </span>
                <span className="l25-gr-answer">She's from Spain.</span>
              </div>
            </div>
          </div>
          <div className="l25-short-forms">
            <span className="l25-sf-label">Short forms:</span>
            <span>
              <strong>He's</strong> = He is
            </span>
            <span>
              <strong>She's</strong> = She is
            </span>
            <span>
              <strong>It's</strong> = It is
            </span>
            <span>
              <strong>isn't</strong> = is not
            </span>
          </div>
        </div>

        <h3 className="l22-listen-subtitle">Transform drill</h3>
        <p className="lesson22-section-desc">
          Скажи нову репліку вголос, потім обери правильний варіант.
        </p>
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

        <div className="l25-audio-list" style={{ marginTop: "1rem" }}>
          {tracksUnit1B
            .filter((t) => t.r === 7)
            .map((t) => (
              <AudioPlayer key={t.r} track={t} />
            ))}
        </div>
      </section>

      {/* ── 4. Controlled practice · 10 min ───────────────────── */}
      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-section-head">
          <p className="page-kicker">4 · Controlled practice · 10 min</p>
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

      {/* ── 5. Speaking · 10–12 min ───────────────────────────── */}
      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-section-head">
          <p className="page-kicker">5 · Speaking · 10–12 min</p>
          <h2>Profile speaking</h2>
          <p className="lesson22-section-desc">
            Обери картку. Скажи <strong>4–5 речень</strong>: ім'я, job, місто,
            країна, місце роботи. Потім — comparison з собою / сім'єю.
          </p>
        </div>

        <div className="l26-profile-grid">
          {speakProfiles.map((p) => (
            <article key={p.name} className="l26-profile-card">
              <div className="l26-profile-photo-wrap">
                <img
                  className="l26-profile-photo"
                  src={p.photo}
                  alt={p.alt}
                  loading="lazy"
                  width={264}
                  height={172}
                />
              </div>
              <p className="l26-profile-name">Name: {p.name}</p>
              <div className="l26-profile-body">
                <div className="l26-profile-row">
                  <span className="l26-profile-label">Job:</span>
                  <strong>{p.job}</strong>
                </div>
                <div className="l26-profile-row">
                  <span className="l26-profile-label">City:</span>
                  <span>{p.city}</span>
                </div>
                <div className="l26-profile-row">
                  <span className="l26-profile-label">Country:</span>
                  <span>{p.country}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="l25-conf-card" style={{ maxWidth: 520, marginTop: "1rem" }}>
          <div className="l25-conf-header">Model</div>
          <div className="l25-conf-fields">
            <p style={{ margin: 0, fontSize: "var(--text-sm)", lineHeight: 1.55 }}>
              This is Amy. She's a farmer. She's from Norwich in the UK. She
              works on a farm. She likes her job.
            </p>
            <p style={{ margin: 0, fontSize: "var(--text-sm)", lineHeight: 1.55 }}>
              <strong>Comparison:</strong> She's a farmer. My sister is a nurse.
              She's from the UK. I'm from Ukraine.
            </p>
          </div>
        </div>

        <h3 className="l22-listen-subtitle">Mini dialogue · job &amp; origin</h3>
        <div className="l25-conv-grid">
          <div className="l25-conv-card">
            <div className="l25-conv-title">Model</div>
            <div className="l25-dialogue">
              <div className="l25-line">
                <span className="l25-spk l25-spk--a">A</span>
                <span>Is she a doctor?</span>
              </div>
              <div className="l25-line">
                <span className="l25-spk l25-spk--b">B</span>
                <span>No, she isn't. She's a farmer.</span>
              </div>
              <div className="l25-line">
                <span className="l25-spk l25-spk--a">A</span>
                <span>Where's she from?</span>
              </div>
              <div className="l25-line">
                <span className="l25-spk l25-spk--b">B</span>
                <span>She's from the UK.</span>
              </div>
            </div>
          </div>
          <div className="l25-conv-card">
            <div className="l25-conv-title">Patrick (R8)</div>
            <div className="l25-dialogue">
              <div className="l25-line">
                <span className="l25-spk l25-spk--a">A</span>
                <span>Is he from the UK?</span>
              </div>
              <div className="l25-line">
                <span className="l25-spk l25-spk--b">B</span>
                <span>No, he isn't.</span>
              </div>
              <div className="l25-line">
                <span className="l25-spk l25-spk--a">A</span>
                <span>Where's he from?</span>
              </div>
              <div className="l25-line">
                <span className="l25-spk l25-spk--b">B</span>
                <span>He's from Argentina.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Reading / listening · 5–7 min ──────────────────── */}
      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-section-head">
          <p className="page-kicker">6 · Reading / listening · 5–7 min</p>
          <h2>Green Cross Hospital</h2>
          <p className="lesson22-section-desc">
            Read → yes/no → underline he/she/it → say who works there. Потім
            одразу speaking.
          </p>
        </div>

        <div className="l25-conf-card" style={{ maxWidth: 480, marginBottom: "1rem" }}>
          <div className="l25-conf-header">✚ Green Cross Hospital</div>
          <div className="l25-conf-fields">
            <p style={{ fontSize: "var(--text-sm)", lineHeight: 1.55, margin: 0 }}>
              <strong>About us.</strong> Green Cross Hospital is a small
              hospital. It's in Manchester in the UK.
            </p>
            <p style={{ fontSize: "var(--text-sm)", lineHeight: 1.55, margin: 0 }}>
              <strong>Lucy Brown</strong> — Lucy is from London. She's a doctor.
            </p>
            <p style={{ fontSize: "var(--text-sm)", lineHeight: 1.55, margin: 0 }}>
              <strong>Paul Turner</strong> — Paul is from Manchester. He's a
              nurse.
            </p>
            <p style={{ fontSize: "var(--text-sm)", lineHeight: 1.55, margin: 0 }}>
              <strong>Mila Kowalski</strong> — Mila is from Toronto. She's an
              office worker at the hospital.
            </p>
          </div>
          <div className="l25-conf-roles">
            <span className="l25-conf-role">Lucy → doctor</span>
            <span className="l25-conf-role">Paul → nurse</span>
            <span className="l25-conf-role">Mila → office worker</span>
          </div>
        </div>

        <div className="l22-self-grid">
          {hospitalQs.map((q) => (
            <div key={q.id} className="l22-self-card" style={{ gap: "0.5rem" }}>
              <strong>
                {q.id}. {q.prompt}
              </strong>
              <select
                value={hospAns[q.id] ?? ""}
                onChange={(e) =>
                  setHospAns((prev) => ({ ...prev, [q.id]: e.target.value }))
                }
                className={`l25-cr-sel${
                  hospChecked
                    ? hospAns[q.id] === q.answer
                      ? " l25-cr-sel--ok"
                      : hospAns[q.id]
                        ? " l25-cr-sel--err"
                        : ""
                    : ""
                }`}
              >
                <option value="">select…</option>
                {q.options.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <div className="l25-cr-actions">
          <button
            className="l22-check-btn"
            onClick={() => setHospChecked(true)}
          >
            Check
          </button>
          {hospChecked && (
            <span className="l22-score">
              {hospScore} / {hospitalQs.length}
            </span>
          )}
        </div>

        <div className="lesson22-prompt-grid" style={{ marginTop: "1rem" }}>
          <div className="lesson22-prompt-card lesson22-prompt-card--task">
            Underline he / she / it forms in the text.
          </div>
          <div className="lesson22-prompt-card lesson22-prompt-card--task">
            Say who works in the hospital.
          </div>
        </div>

        <h3 className="l22-listen-subtitle">Audio · R8 · Patrick</h3>
        <p className="lesson22-section-desc">
          Listen and complete the dialogue. Послухай і заповни пропуски.
        </p>
        <div className="l25-audio-list">
          {tracksUnit1B
            .filter((t) => t.r === 8)
            .map((t) => (
              <AudioPlayer key={t.r} track={t} />
            ))}
        </div>

        <div className="l25-conv-card" style={{ marginTop: "0.75rem", maxWidth: 560 }}>
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

      {/* ── 7. Review · 3 min ─────────────────────────────────── */}
      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-section-head">
          <p className="page-kicker">7 · Review · 3 min</p>
          <h2>Quick recap + exit questions</h2>
          <p className="lesson22-section-desc">
            jobs · he/she/it · + / − / ?
          </p>
        </div>

        <div className="lesson22-hero-chips" style={{ marginBottom: "1rem" }}>
          <span>jobs</span>
          <span>He's / She's / It's</span>
          <span>isn't</span>
          <span>Is he…?</span>
          <span>Yes, he is</span>
        </div>

        <div className="lesson22-prompt-grid">
          {exitQs.map((q) => (
            <div
              key={q}
              className="lesson22-prompt-card lesson22-prompt-card--task"
            >
              {q}
            </div>
          ))}
        </div>
      </section>

      {/* ── Homework ──────────────────────────────────────────── */}
      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-section-head">
          <p className="page-kicker">Homework</p>
          <h2>After class</h2>
          <p className="lesson22-section-desc">
            1) <strong>5 sentences</strong> про відому людину / друга.
            <br />
            2) <strong>5 questions</strong> with be (Is he…? / Where's she
            from?).
            <br />
            3) <strong>Voice message</strong> 30–45 сек.
          </p>
        </div>
        <div className="l25-conf-card" style={{ maxWidth: 480 }}>
          <div className="l25-conf-header">Example</div>
          <div className="l25-conf-fields">
            <p style={{ margin: 0, fontSize: "var(--text-sm)", lineHeight: 1.55 }}>
              My father is a doctor. He works in Kyiv. He isn't a teacher. Is
              your mother a nurse? Yes, she is.
            </p>
          </div>
        </div>
        <p className="lesson22-section-desc" style={{ marginTop: "0.75rem" }}>
          Усі слова уроку також у{" "}
          <Link className="lesson22-back-link" to="/vocab">
            Vocab → Jobs
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
