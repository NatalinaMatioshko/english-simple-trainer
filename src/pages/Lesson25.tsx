import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/lesson22.css";
import "../styles/lesson19.css";
import "../styles/lesson25.css";

/* ─── Data ─────────────────────────────────────────────────── */

const countriesVocab = [
  { country: "Spain", nat: "Spanish" },
  { country: "Canada", nat: "Canadian" },
  { country: "Japan", nat: "Japanese" },
  { country: "the US", nat: "American" },
  { country: "Poland", nat: "Polish" },
  { country: "Argentina", nat: "Argentinian" },
  { country: "Thailand", nat: "Thai" },
  { country: "the UK", nat: "British" },
  { country: "Turkey", nat: "Turkish" },
  { country: "Mexico", nat: "Mexican" },
  { country: "Brazil", nat: "Brazilian" },
  { country: "Italy", nat: "Italian" },
];

type FillItem = {
  id: number;
  prompt: string;
  options: string[];
  answer: string;
};

const conv4aItems: FillItem[] = [
  {
    id: 1,
    prompt: 'Juan: "I\'m from [1]___. How about you?"',
    options: ["Mexico", "Canada", "the UK"],
    answer: "Mexico",
  },
  {
    id: 2,
    prompt: "Akiko: \"I'm from [2]___. I'm a university teacher.\"",
    options: ["Japan", "Brazil", "Turkey"],
    answer: "Japan",
  },
  {
    id: 3,
    prompt: 'Lucy: "I\'m from [3]___. Are you from Spain?"',
    options: ["the UK", "Poland", "Italy"],
    answer: "the UK",
  },
  {
    id: 4,
    prompt: "Barbara: \"No, I'm not. I'm from [4]___.\"",
    options: ["Argentina", "Turkey", "the US"],
    answer: "Argentina",
  },
];

const roleplayCards = [
  { name: "Diego Castillo", city: "Buenos Aires", country: "Argentina" },
  { name: "Ana Santos", city: "São Paulo", country: "Brazil" },
  { name: "Sofia Romano", city: "Milan", country: "Italy" },
  { name: "Aleksander Nowicki", city: "Warsaw", country: "Poland" },
];

/* ─── Audio tracks ──────────────────────────────────────────── */

const SOUND = (r: number) =>
  `${import.meta.env.BASE_URL}sounds/RM_A1_SB_U1_R${r}.mp3`;

type AudioTrackData = {
  r: number;
  exercise: string;
  title: string;
  transcript: React.ReactNode;
};

const tracksR1to5: AudioTrackData[] = [
  {
    r: 1,
    exercise: "Ex 1b",
    title: "Countries 1–12 — listen and check",
    transcript: (
      <>
        <p>Відповіді (порядок на записі):</p>
        <ol>
          <li>Canada</li>
          <li>the UK</li>
          <li>the US</li>
          <li>Spain</li>
          <li>Poland</li>
          <li>Turkey</li>
          <li>Japan</li>
          <li>Thailand</li>
          <li>Argentina</li>
          <li>Mexico</li>
          <li>Brazil</li>
          <li>Italy</li>
        </ol>
      </>
    ),
  },
  {
    r: 2,
    exercise: "Ex 2a",
    title: "Country names — listen and complete the stress table",
    transcript: (
      <>
        <p>
          Країни на записі (в алфавітному порядку — розстав у таблицю
          наголосів):
        </p>
        <p>
          Argentina · Brazil · Canada · Italy · Japan · Mexico · Poland · Spain
          · Thailand · Turkey
        </p>
        <p>
          <em>Підказка: Poland → Oo, Japan → oO</em>
        </p>
      </>
    ),
  },
  {
    r: 3,
    exercise: "Ex 4a",
    title: "Two conversations at a language conference",
    transcript: (
      <>
        <p>
          <strong>Conversation 1</strong> — Juan (J) &amp; Akiko (A)
        </p>
        <p>
          J: Hello, I'm Juan. Nice to meet you.
          <br />
          A: Nice to meet you, too. I'm Akiko.
          <br />
          J: Hi. Are you here for the conference?
          <br />
          A: Yes, I am. Are you a teacher?
          <br />
          J: No, I'm not. I'm the manager of a language school.
          <br />
          A: Where are you from?
          <br />
          J: I'm from <strong>Mexico</strong>. How about you?
          <br />
          A: I'm from <strong>Japan</strong>. I'm a university teacher.
        </p>
        <p>
          <strong>Conversation 2</strong> — Barbara (B) &amp; Lucy (L)
        </p>
        <p>
          B: Hi, are you Lucy?
          <br />
          L: Yes, I am. Barbara?
          <br />
          B: Yes, I'm Barbara. Nice to meet you. Sorry, am I late?
          <br />
          L: No, you aren't.
          <br />
          B: Great. So where are you from, Lucy?
          <br />
          L: I'm from <strong>the UK</strong>. Are you from Spain?
          <br />
          B: No, I'm not. I'm from <strong>Argentina</strong>.
        </p>
      </>
    ),
  },
  {
    r: 4,
    exercise: "Ex 6a",
    title: "Short forms — pronunciation",
    transcript: (
      <>
        <p>Вимова скорочених форм:</p>
        <ol>
          <li>I'm from Mexico.</li>
          <li>I'm not a teacher.</li>
          <li>You're on time.</li>
          <li>You aren't late.</li>
        </ol>
      </>
    ),
  },
  {
    r: 5,
    exercise: "Ex 7b",
    title: "Dialogue — listen and check",
    transcript: (
      <>
        <p>
          <strong>Elif (E) &amp; Laura (L)</strong>
        </p>
        <p>
          E: Hello. Are you here for the conference?
          <br />
          L: Yes, I am. I'm Laura.
          <br />
          E: I'm Elif.
          <br />
          L: Nice to meet you.
          <br />
          E: Nice to meet you, too. Are you from the US?
          <br />
          L: No, I'm not. I'm from Toronto in Canada. Where are you from?
          <br />
          E: I'm from Ankara in Turkey.
        </p>
      </>
    ),
  },
];

const tracksR9to15: AudioTrackData[] = [
  {
    r: 9,
    exercise: "1C Ex 1",
    title: "What's your name? — 4 ways to answer",
    transcript: (
      <>
        <p>
          <strong>Interviewer &amp; Jason (J)</strong> — 4 різні способи назвати
          себе:
        </p>
        <ol>
          <li>
            I: What's your name?
            <br />
            J: <strong>I'm called Jason.</strong>
          </li>
          <li>
            I: What's your name?
            <br />
            J: <strong>Jason.</strong>
          </li>
          <li>
            I: What's your name?
            <br />
            J: <strong>My name's Jason.</strong>
          </li>
          <li>
            I: What's your name?
            <br />
            J: <strong>It's Jason.</strong>
          </li>
        </ol>
      </>
    ),
  },
  {
    r: 10,
    exercise: "1C Ex 2",
    title: "Registration — name, country, job",
    transcript: (
      <>
        <p>
          <strong>Dialogue 1 — Dan</strong>
        </p>
        <p>
          R: Hi! What's your name?
          <br />
          D: My name? It's <strong>Dan</strong>. D-A-N.
          <br />
          R: Hi Dan! Where are you from?
          <br />
          D: I come from <strong>the US</strong>.<br />
          R: And what's your job?
          <br />
          D: I'm a <strong>student</strong>.
        </p>
        <p>
          <strong>Dialogue 2 — Sara</strong>
        </p>
        <p>
          R: Hello, come in! What's your name?
          <br />
          S: Hi! It's <strong>Sara</strong>. S-A-R-A.
          <br />
          R: And where are you from?
          <br />
          S: <strong>The UK</strong>.<br />
          R: And what's your job, Sara?
          <br />
          S: I'm a <strong>teacher</strong>.
        </p>
        <p>
          <strong>Dialogue 3 — Jim</strong>
        </p>
        <p>
          R: Good morning, how are you?
          <br />
          J: Fine, thank you.
          <br />
          R: So what's your name?
          <br />
          J: <strong>Jim</strong>. J-I-M.
          <br />
          R: And where are you from, Jim?
          <br />
          J: I come from <strong>Canada</strong>.<br />
          R: And what's your job?
          <br />
          J: I'm a <strong>nurse</strong>.
        </p>
      </>
    ),
  },
  {
    r: 11,
    exercise: "Ex 2a",
    title: "Nationalities — stressed syllables (a–l)",
    transcript: (
      <>
        <p>Національності (a–l) — знайди наголошений склад:</p>
        <ol type="a">
          <li>Thai</li>
          <li>British</li>
          <li>Polish</li>
          <li>Spanish</li>
          <li>Turkish</li>
          <li>Mexican</li>
          <li>Japanese</li>
          <li>Italian</li>
          <li>American</li>
          <li>Canadian</li>
          <li>Brazilian</li>
          <li>Argentinian</li>
        </ol>
      </>
    ),
  },
  {
    r: 12,
    exercise: "Ex 2c",
    title: "Country → nationality stress — same (S) or different (D)?",
    transcript: (
      <>
        <p>
          1. She's from Argentina. She's Argentinian.
          <br />
          2. She's from Canada. She's Canadian.
          <br />
          3. He's from Japan. He's Japanese.
          <br />
          4. She's from Mexico. She's Mexican.
          <br />
          5. He's from Poland. He's Polish.
        </p>
        <p>
          <em>Відповіді: 1-S · 2-D · 3-D · 4-S · 5-S</em>
        </p>
      </>
    ),
  },
  {
    r: 13,
    exercise: "Ex 5b",
    title: "be: you/we/they — short forms",
    transcript: (
      <>
        <p>Вимова скорочень:</p>
        <ol>
          <li>They aren't in the UK now.</li>
          <li>They're at an American university.</li>
          <li>We aren't all British.</li>
          <li>We're from all over the world.</li>
        </ol>
      </>
    ),
  },
  {
    r: 14,
    exercise: "Ex 6",
    title: "At the school — registration conversation",
    transcript: (
      <>
        <p>
          <strong>
            Julia (J) — school manager &amp; Selin (S) — new student
          </strong>
        </p>
        <p>
          J: Hello. Are you a new student?
          <br />
          S: Yes, I am.
          <br />
          J: I'm the manager of the school. My name is Julia. It's very nice to
          meet you.
          <br />
          S: Nice to meet you, too. I'm Selin.
          <br />
          J: Where are you from, Selin?
          <br />
          S: I'm from Turkey.
          <br />
          J: Great. Well, welcome to our school. Can I take your contact
          details?
          <br />
          S: Sure.
          <br />
          J: How do you spell your first name?
          <br />
          S: S-E-L-I-N.
          <br />
          J: And what's your family name?
          <br />
          S: My family name is Atakan. That's A-T-A-K-A-N.
          <br />
          J: And what's your phone number?
          <br />
          S: My number is 020-555-7645.
          <br />
          J: Sorry, can you say that again?
          <br />
          S: 020-555-7645.
          <br />
          J: Thank you. And what's your email address?
          <br />
          S: My email address is selin2000@dmail.com.
          <br />
          J: Is that 'dmail.com'?
          <br />
          S: Yes.
          <br />
          J: OK. Thank you.
        </p>
      </>
    ),
  },
  {
    r: 15,
    exercise: "Ex 7",
    title: "Spelling your name & contact details",
    transcript: (
      <>
        <p>
          <strong>A &amp; B — Dieter Neumann</strong>
        </p>
        <p>
          A: What's your name?
          <br />
          B: Dieter Neumann.
          <br />
          A: How do you spell your first name?
          <br />
          B: D-I-E-T-E-R.
          <br />
          A: And what's your family name again?
          <br />
          B: Neumann. That's N-E-U-M-A-N-N.
          <br />
          A: What's your phone number?
          <br />
          B: It's 07700 900617.
          <br />
          A: Sorry, can you say that again?
          <br />
          B: 07700 900617.
          <br />
          A: And what's your email address?
          <br />
          B: It's dietern@intertalk.com.
        </p>
      </>
    ),
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

/* ─── 1A Flags & Stress data ─────────────────────────────────── */

const flagData = [
  { num: 1,  code: "ca", country: "Canada"    },
  { num: 2,  code: "gb", country: "the UK"    },
  { num: 3,  code: "us", country: "the US"    },
  { num: 4,  code: "es", country: "Spain"     },
  { num: 5,  code: "pl", country: "Poland"    },
  { num: 6,  code: "tr", country: "Turkey"    },
  { num: 7,  code: "jp", country: "Japan"     },
  { num: 8,  code: "th", country: "Thailand"  },
  { num: 9,  code: "ar", country: "Argentina" },
  { num: 10, code: "mx", country: "Mexico"    },
  { num: 11, code: "br", country: "Brazil"    },
  { num: 12, code: "it", country: "Italy"     },
];

const flagSelectOpts = [
  "", "Argentina", "Brazil", "Canada", "Italy", "Japan",
  "Mexico", "Poland", "Spain", "Thailand", "Turkey", "the UK", "the US",
];

type StressColId = "o" | "Oo" | "oO" | "Ooo" | "ooOo";

const stressAnswerMap: Record<string, StressColId> = {
  Spain:     "o",
  Poland:    "Oo",
  Turkey:    "Oo",
  Thailand:  "Oo",
  Japan:     "oO",
  Brazil:    "oO",
  Mexico:    "Ooo",
  Canada:    "Ooo",
  Italy:     "Ooo",
  Argentina: "ooOo",
};

type StressTblCol = {
  id: StressColId;
  countries: string[];
  given: string[];
};

const stressTableCols: StressTblCol[] = [
  { id: "o",    countries: ["Spain"],                        given: [] },
  { id: "Oo",   countries: ["Poland", "Turkey", "Thailand"], given: [] },
  { id: "oO",   countries: ["Japan", "Brazil"],              given: [] },
  { id: "Ooo",  countries: ["Mexico", "Canada", "Italy"],    given: [] },
  { id: "ooOo", countries: ["Argentina"],                    given: [] },
];

/* ─── Check & Reflect data ──────────────────────────────────── */

type CellPos = [number, number];

const wsGrid = [
  "PLBRAZILLM",
  "OTUXOPRNNE",
  "LURITALYKX",
  "ARGENTINAI",
  "NKJAPANSFC",
  "DEKZZONBTO",
  "BYUSPAINKC",
  "THAILANDRS",
  "UKVSJJKPKN",
  "CANADAIBBE",
];

const wsWordCells: [string, CellPos[]][] = [
  [
    "BRAZIL",
    [
      [0, 2],
      [0, 3],
      [0, 4],
      [0, 5],
      [0, 6],
      [0, 7],
    ],
  ],
  [
    "POLAND",
    [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
      [5, 0],
    ],
  ],
  [
    "ITALY",
    [
      [2, 3],
      [2, 4],
      [2, 5],
      [2, 6],
      [2, 7],
    ],
  ],
  [
    "ARGENTINA",
    [
      [3, 0],
      [3, 1],
      [3, 2],
      [3, 3],
      [3, 4],
      [3, 5],
      [3, 6],
      [3, 7],
      [3, 8],
    ],
  ],
  [
    "JAPAN",
    [
      [4, 2],
      [4, 3],
      [4, 4],
      [4, 5],
      [4, 6],
    ],
  ],
  [
    "SPAIN",
    [
      [6, 3],
      [6, 4],
      [6, 5],
      [6, 6],
      [6, 7],
    ],
  ],
  [
    "THAILAND",
    [
      [7, 0],
      [7, 1],
      [7, 2],
      [7, 3],
      [7, 4],
      [7, 5],
      [7, 6],
      [7, 7],
    ],
  ],
  [
    "CANADA",
    [
      [9, 0],
      [9, 1],
      [9, 2],
      [9, 3],
      [9, 4],
      [9, 5],
    ],
  ],
  [
    "TURKEY",
    [
      [1, 1],
      [2, 1],
      [3, 1],
      [4, 1],
      [5, 1],
      [6, 1],
    ],
  ],
  [
    "MEXICO",
    [
      [0, 9],
      [1, 9],
      [2, 9],
      [3, 9],
      [4, 9],
      [5, 9],
    ],
  ],
];

const WS_COLORS = [
  "#fde68a",
  "#bbf7d0",
  "#bfdbfe",
  "#fecaca",
  "#ddd6fe",
  "#fed7aa",
  "#a7f3d0",
  "#bae6fd",
  "#fbcfe8",
  "#fef08a",
];
const wsCellColorMap: Record<string, string> = {};
wsWordCells.forEach(([, cells], i) =>
  cells.forEach(([r, c]) => {
    wsCellColorMap[`${r},${c}`] = WS_COLORS[i];
  }),
);


// ── Word search helpers ──────────────────────────────────────

function wsCellsBetween(
  r1: number, c1: number,
  r2: number, c2: number
): [number, number][] | null {
  const dr = r2 - r1;
  const dc = c2 - c1;
  if (dr === 0 && dc === 0) return [[r1, c1]];
  if (dr !== 0 && dc !== 0 && Math.abs(dr) !== Math.abs(dc)) return null;
  const steps = Math.max(Math.abs(dr), Math.abs(dc));
  const sr = dr === 0 ? 0 : dr / Math.abs(dr);
  const sc = dc === 0 ? 0 : dc / Math.abs(dc);
  const cells: [number, number][] = [];
  for (let i = 0; i <= steps; i++) cells.push([r1 + sr * i, c1 + sc * i]);
  return cells;
}

function wsMatchWord(cells: [number, number][]): string | null {
  const key = cells.map(([r, c]) => `${r},${c}`).sort().join("|");
  for (const [word, wc] of wsWordCells) {
    const wKey = (wc as [number, number][]).map(([r, c]) => `${r},${c}`).sort().join("|");
    if (key === wKey) return word;
  }
  return null;
}

function StressDots({ colId }: { colId: string }) {
  return (
    <span className="l25-stbl-dots">
      {colId.split("").map((ch, i) => (
        <span key={i} className={ch === "O" ? "l25-dot-big" : "l25-dot-sm"} />
      ))}
    </span>
  );
}

export default function Lesson25() {
  const pageRef = useRef<HTMLDivElement | null>(null);

  const [vocabFlipped, setVocabFlipped] = useState<number[]>([]);
  const [conv4a, setConv4a] = useState<Record<number, string>>({});
  const [showConv4a, setShowConv4a] = useState(false);

  // 1A flags & stress
  const [flagAns, setFlagAns] = useState<string[]>(Array(12).fill(""));
  const [flagChecked, setFlagChecked] = useState(false);
  const [stressInputs, setStressInputs] = useState<Record<string, string[]>>(
    Object.fromEntries(
      stressTableCols.map(c => [c.id, Array(c.countries.length - c.given.length).fill("")])
    )
  );
  const [stressTableChecked, setStressTableChecked] = useState(false);

  // Check & Reflect — word search
  const [wsFirst,   setWsFirst]   = useState<[number, number] | null>(null);
  const [wsHover,   setWsHover]   = useState<[number, number] | null>(null);
  const [wsFound,   setWsFound]   = useState<Set<string>>(new Set());
  const [wsShowAll, setWsShowAll] = useState(false);

  function handleWsClick(r: number, c: number) {
    if (wsShowAll) return;
    if (!wsFirst) { setWsFirst([r, c]); setWsHover([r, c]); return; }
    if (wsFirst[0] === r && wsFirst[1] === c) { setWsFirst(null); setWsHover(null); return; }
    const path = wsCellsBetween(wsFirst[0], wsFirst[1], r, c);
    if (!path) { setWsFirst([r, c]); setWsHover([r, c]); return; }
    const word = wsMatchWord(path);
    if (word) { setWsFound(prev => new Set([...prev, word])); setWsFirst(null); setWsHover(null); }
    else      { setWsFirst([r, c]); setWsHover([r, c]); }
  }

  const toggleVocab = (idx: number) =>
    setVocabFlipped((p) =>
      p.includes(idx) ? p.filter((x) => x !== idx) : [...p, idx],
    );

  const conv4aScore = useMemo(
    () => conv4aItems.filter((i) => conv4a[i.id] === i.answer).length,
    [conv4a],
  );

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

  return (
    <div className="lesson22-page" ref={pageRef}>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="lesson22-hero panel reveal-on-scroll is-visible">
        <div className="lesson22-hero-top">
          <div>
            <p className="page-kicker">Lesson 25</p>
            <h1>Hello! Countries &amp; Nationalities</h1>
            <p className="lesson22-topic-pill">
              be: I / you / we / they · countries · speaking
            </p>
            <p className="lesson22-subtitle">
              Привітання, знайомство та розповідь про себе — з правильними
              формами <strong>am / is / are</strong> та словником країн і
              національностей.
            </p>
            <ul className="l22-goals-list">
              <li>12 країн і їхні національності;</li>
              <li>be: I/you та be: you/we/they;</li>
              <li>short questions &amp; answers;</li>
              <li>говоріння про себе та рольова гра.</li>
            </ul>
          </div>
        </div>
        <div className="lesson22-hero-chips">
          <span>I'm from Mexico</span>
          <span>Are you a teacher?</span>
          <span>Yes, I am</span>
          <span>We're British</span>
          <span>They aren't doctors</span>
        </div>
      </section>
      {/* ── Flow ─────────────────────────────────────────────── */}
      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-flow">
          <span>1 Countries</span>
          <span>2 be: I/you</span>
          <span>3 Conversations</span>
          <span>4 be: we/they</span>
          <span>5 Reading</span>
          <span>6 Speaking</span>
        </div>
        <p className="lesson22-section-desc">
          Послідовність:{" "}
          <strong>
            країни → граматика → діалоги → вправи → читання → говоріння
          </strong>
          .
        </p>
      </section>
      {/* ── 1a. Flags matching ───────────────────────────────── */}
      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-section-head">
          <p className="page-kicker">Vocabulary · 1a</p>
          <h2>Match flags 1–12 with the countries</h2>
          <p className="lesson22-section-desc">
            Обери назву країни під кожним прапором. Потім послухай запис і перевір.
          </p>
        </div>

        <div className="l25-1a-bank">
          {flagSelectOpts.filter(Boolean).map(c => (
            <span key={c} className="l25-1a-word">{c}</span>
          ))}
        </div>

        <div className="l25-flag-grid">
          {flagData.map((f, i) => {
            const v  = flagAns[i];
            const ok = v === f.country;
            return (
              <div key={f.num} className="l25-flag-card">
                <span className="l25-flag-num">{f.num}</span>
                <img
                  src={`https://flagcdn.com/w80/${f.code}.png`}
                  srcSet={`https://flagcdn.com/w160/${f.code}.png 2x`}
                  alt={`Flag ${f.num}`}
                  className="l25-flag-img"
                  loading="lazy"
                />
                <select
                  value={v}
                  onChange={e =>
                    setFlagAns(prev => {
                      const n = [...prev];
                      n[i] = e.target.value;
                      return n;
                    })
                  }
                  className={`l25-cr-sel l25-flag-sel${
                    flagChecked
                      ? ok ? " l25-cr-sel--ok" : v ? " l25-cr-sel--err" : ""
                      : ""
                  }`}
                >
                  {flagSelectOpts.map(o => (
                    <option key={o} value={o}>{o || "select…"}</option>
                  ))}
                </select>
              </div>
            );
          })}
        </div>

        <div className="l25-cr-actions" style={{ marginTop: "1rem" }}>
          <audio
            controls
            src={SOUND(1)}
            preload="none"
            className="l25-audio-ctrl"
            style={{ flex: 1 }}
          />
          <button
            className="l22-check-btn"
            onClick={() => setFlagChecked(true)}
          >
            Check answers
          </button>
          {flagChecked && (
            <span className="l22-score">
              {flagAns.filter((v, i) => v === flagData[i].country).length} / 12
            </span>
          )}
        </div>
      </section>

      {/* ── 2a. Word stress — countries ──────────────────────── */}
      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-section-head">
          <p className="page-kicker">Pronunciation · 2a</p>
          <h2>Word stress — country names</h2>
          <p className="lesson22-section-desc">
            Послухай запис і впиши назви країн у правильну колонку таблиці.
          </p>
        </div>

        <audio
          controls
          src={SOUND(2)}
          preload="none"
          className="l25-audio-ctrl"
          style={{ marginBottom: "1rem" }}
        />

        <p className="l25-stbl-wordbank">
          Argentina · Brazil · Canada · Italy · Japan · Mexico · Poland · Spain · Thailand · Turkey
        </p>

        <div className="l25-stbl-wrap">
          <div className="l25-stbl-grid">
            {stressTableCols.map(col => {
              const freeAnswers = col.countries.filter(c => !col.given.includes(c));
              const inputs = stressInputs[col.id] ?? [];
              return (
                <div key={col.id} className="l25-stbl-col">
                  <div className="l25-stbl-head">
                    <span className="l25-stbl-id">{col.id}</span>
                    <StressDots colId={col.id} />
                  </div>
                  {col.given.map(g => (
                    <div key={g} className="l25-stbl-given">{g}</div>
                  ))}
                  {inputs.map((val, ri) => {
                    const ok = freeAnswers.some(
                      c => c.toLowerCase() === val.trim().toLowerCase()
                    );
                    return (
                      <input
                        key={ri}
                        type="text"
                        value={val}
                        placeholder="…"
                        onChange={e => {
                          const v = e.target.value;
                          setStressInputs(prev => {
                            const arr = [...(prev[col.id] ?? [])];
                            arr[ri] = v;
                            return { ...prev, [col.id]: arr };
                          });
                        }}
                        className={`l25-stbl-input${
                          stressTableChecked
                            ? ok
                              ? " l25-stbl-ok"
                              : val.trim()
                              ? " l25-stbl-err"
                              : ""
                            : ""
                        }`}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        <div className="l25-cr-actions">
          <button
            className="l22-check-btn"
            onClick={() => setStressTableChecked(true)}
          >
            Check
          </button>
          {stressTableChecked && (
            <span className="l22-score">
              {stressTableCols.reduce((sum, col) => {
                const freeAnswers = col.countries.filter(c => !col.given.includes(c));
                const inputs = stressInputs[col.id] ?? [];
                return (
                  sum +
                  inputs.filter(v =>
                    freeAnswers.some(c => c.toLowerCase() === v.trim().toLowerCase())
                  ).length
                );
              }, 0)}{" "}
              / {stressTableCols.reduce((s, c) => s + c.countries.length - c.given.length, 0)}
            </span>
          )}
          <button
            className="l25-cr-mini-btn"
            onClick={() => {
              setStressInputs(
                Object.fromEntries(
                  stressTableCols.map(c => [c.id, Array(c.countries.length - c.given.length).fill("")])
                )
              );
              setStressTableChecked(false);
            }}
          >
            Reset
          </button>
        </div>
      </section>

      {/* ── 1. Countries & Nationalities vocab ───────────────── */}
      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-section-head">
          <p className="page-kicker">Vocabulary</p>
          <h2>Countries &amp; Nationalities</h2>
          <p className="lesson22-section-desc">
            Натисни картку, щоб побачити національність. Прочитай вголос і
            склади речення: <strong>I'm from Mexico. I'm Mexican.</strong>
          </p>
        </div>
        <div className="l22-vocab-grid">
          {countriesVocab.map((item, idx) => {
            const flipped = vocabFlipped.includes(idx);
            return (
              <button
                key={item.country}
                type="button"
                className={`l22-vocab-card ${flipped ? "l22-vocab-card--flipped" : ""}`}
                onClick={() => toggleVocab(idx)}
                aria-pressed={flipped}
              >
                <div className="l22-vocab-inner">
                  <div className="l22-vocab-face l22-vocab-front">
                    <span className="l22-vocab-label">Country</span>
                    <strong>{item.country}</strong>
                    <span className="l22-vocab-hint">tap to flip</span>
                  </div>
                  <div className="l22-vocab-face l22-vocab-back">
                    <span className="l22-vocab-label">Nationality</span>
                    <strong>{item.nat}</strong>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>
      {/* ── 2. Grammar: be I and you ──────────────────────────── */}
      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-section-head">
          <p className="page-kicker">Grammar</p>
          <h2>be: I and you</h2>
          <p className="lesson22-section-desc">
            Переглянь таблицю. Згадай короткі форми та короткі відповіді.
          </p>
        </div>

        <div className="l25-grammar-box">
          <div className="l25-grammar-label">be: I and you</div>
          <div className="l25-grammar-rows">
            <div className="l25-gr-row l25-gr-row--pos">
              <span className="l25-gr-sign">+</span>
              <div className="l25-gr-cells">
                <span>
                  <strong>I'm</strong> Juan.
                </span>
                <span>
                  <strong>I'm</strong> a university teacher.
                </span>
                <span>
                  <strong>You're</strong> on time.
                </span>
              </div>
            </div>
            <div className="l25-gr-row l25-gr-row--q">
              <span className="l25-gr-sign">?</span>
              <div className="l25-gr-cells">
                <span>
                  <strong>Am I</strong> late?
                </span>
                <span className="l25-gr-answer">
                  + Yes, <strong>you are</strong>. &nbsp;− No,{" "}
                  <strong>you aren't</strong>.
                </span>
              </div>
            </div>
            <div className="l25-gr-row l25-gr-row--q">
              <span className="l25-gr-sign">?</span>
              <div className="l25-gr-cells">
                <span>
                  <strong>Are you</strong> a teacher?
                </span>
                <span className="l25-gr-answer">
                  + Yes, <strong>I am</strong>. &nbsp;− No,{" "}
                  <strong>I'm not</strong>.
                </span>
              </div>
            </div>
            <div className="l25-gr-row l25-gr-row--q">
              <span className="l25-gr-sign">?</span>
              <div className="l25-gr-cells">
                <span>
                  <strong>Are you</strong> from Spain?
                </span>
              </div>
            </div>
            <div className="l25-gr-row l25-gr-row--where">
              <span className="l25-gr-sign">where</span>
              <div className="l25-gr-cells">
                <span>
                  <strong>Where are you</strong> from?
                </span>
                <span className="l25-gr-answer">
                  <strong>I'm</strong> from Mexico.
                </span>
              </div>
            </div>
          </div>
          <div className="l25-short-forms">
            <span className="l25-sf-label">Short forms:</span>
            <span>
              <strong>I'</strong>m = I am
            </span>
            <span>
              <strong>You'</strong>re = you are
            </span>
            <span>
              <strong>aren'</strong>t = are not
            </span>
          </div>
        </div>
      </section>
      {/* ── 3. Conversations 1 & 2 ───────────────────────────── */}
      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-section-head">
          <p className="page-kicker">Listening · 4a</p>
          <h2>Conversations at a language conference</h2>
          <p className="lesson22-section-desc">
            Послухай два діалоги. Заповни пропуски правильними назвами країн.
          </p>
        </div>

        <audio
          controls
          src={SOUND(3)}
          preload="none"
          className="l25-audio-ctrl"
          style={{ marginBottom: "1rem" }}
        />

        <div className="l25-conv-grid">
          {/* Conversation 1 */}
          <div className="l25-conv-card">
            <div className="l25-conv-title">Conversation 1</div>
            <div className="l25-dialogue">
              <div className="l25-line">
                <span className="l25-spk l25-spk--a">J</span>
                <span>Hello, I'm Juan. Nice to meet you.</span>
              </div>
              <div className="l25-line">
                <span className="l25-spk l25-spk--b">A</span>
                <span>Nice to meet you, too. I'm Akiko.</span>
              </div>
              <div className="l25-line">
                <span className="l25-spk l25-spk--a">J</span>
                <span>Hi. Are you here for the conference?</span>
              </div>
              <div className="l25-line">
                <span className="l25-spk l25-spk--b">A</span>
                <span>Yes, I am. Are you a teacher?</span>
              </div>
              <div className="l25-line">
                <span className="l25-spk l25-spk--a">J</span>
                <span>No, I'm not. I'm the manager of a language school.</span>
              </div>
              <div className="l25-line">
                <span className="l25-spk l25-spk--b">A</span>
                <span>Where are you from?</span>
              </div>
              <div className="l25-line">
                <span className="l25-spk l25-spk--a">J</span>
                <span>
                  {"I'm from "}
                  <select
                    value={conv4a[1] ?? ""}
                    onChange={e => setConv4a(p => ({ ...p, 1: e.target.value }))}
                    className={`l25-cr-sel${showConv4a ? conv4a[1] === conv4aItems[0].answer ? " l25-cr-sel--ok" : conv4a[1] ? " l25-cr-sel--err" : "" : ""}`}
                  >
                    <option value="">___</option>
                    {conv4aItems[0].options.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                  {". How about you?"}
                </span>
              </div>
              <div className="l25-line">
                <span className="l25-spk l25-spk--b">A</span>
                <span>
                  {"I'm from "}
                  <select
                    value={conv4a[2] ?? ""}
                    onChange={e => setConv4a(p => ({ ...p, 2: e.target.value }))}
                    className={`l25-cr-sel${showConv4a ? conv4a[2] === conv4aItems[1].answer ? " l25-cr-sel--ok" : conv4a[2] ? " l25-cr-sel--err" : "" : ""}`}
                  >
                    <option value="">___</option>
                    {conv4aItems[1].options.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                  {". I'm a university teacher."}
                </span>
              </div>
            </div>
          </div>

          {/* Conversation 2 */}
          <div className="l25-conv-card">
            <div className="l25-conv-title">Conversation 2</div>
            <div className="l25-dialogue">
              <div className="l25-line">
                <span className="l25-spk l25-spk--a">B</span>
                <span>Hi, are you Lucy?</span>
              </div>
              <div className="l25-line">
                <span className="l25-spk l25-spk--b">L</span>
                <span>Yes, I am. Barbara?</span>
              </div>
              <div className="l25-line">
                <span className="l25-spk l25-spk--a">B</span>
                <span>
                  Yes, I'm Barbara. Nice to meet you. Sorry, am I late?
                </span>
              </div>
              <div className="l25-line">
                <span className="l25-spk l25-spk--b">L</span>
                <span>No, you aren't.</span>
              </div>
              <div className="l25-line">
                <span className="l25-spk l25-spk--a">B</span>
                <span>Great. So where are you from, Lucy?</span>
              </div>
              <div className="l25-line">
                <span className="l25-spk l25-spk--b">L</span>
                <span>
                  {"I'm from "}
                  <select
                    value={conv4a[3] ?? ""}
                    onChange={e => setConv4a(p => ({ ...p, 3: e.target.value }))}
                    className={`l25-cr-sel${showConv4a ? conv4a[3] === conv4aItems[2].answer ? " l25-cr-sel--ok" : conv4a[3] ? " l25-cr-sel--err" : "" : ""}`}
                  >
                    <option value="">___</option>
                    {conv4aItems[2].options.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                  {". Are you from Spain?"}
                </span>
              </div>
              <div className="l25-line">
                <span className="l25-spk l25-spk--a">B</span>
                <span>
                  {"No, I'm not. I'm from "}
                  <select
                    value={conv4a[4] ?? ""}
                    onChange={e => setConv4a(p => ({ ...p, 4: e.target.value }))}
                    className={`l25-cr-sel${showConv4a ? conv4a[4] === conv4aItems[3].answer ? " l25-cr-sel--ok" : conv4a[4] ? " l25-cr-sel--err" : "" : ""}`}
                  >
                    <option value="">___</option>
                    {conv4aItems[3].options.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                  {"."}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="l22-check-btn"
            onClick={() => setShowConv4a(true)}
          >
            Check answers
          </button>
          {showConv4a && (
            <span className="l22-score">
              {conv4aScore} / {conv4aItems.length}
            </span>
          )}
        </div>
      </section>
      {/* ── 5. Roleplay speaking cards ────────────────────────── */}{" "}
      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-section-head">
          <p className="page-kicker">Speaking</p>
          <h2>Roleplay — conference introductions</h2>
          <p className="lesson22-section-desc">
            Обери персонажа і розкажи про нього вголос. Потім поміняйся з
            партнером:{" "}
            <em>Hello, I'm Diego. I'm from Buenos Aires in Argentina.</em>
          </p>
        </div>
        <div className="l25-roleplay-grid">
          {roleplayCards.map((card) => (
            <div key={card.name} className="l25-roleplay-card">
              <div className="l25-roleplay-name">{card.name}</div>
              <div className="l25-roleplay-detail">
                <span>📍</span> {card.city}
              </div>
              <div className="l25-roleplay-detail">
                <span>🌍</span> {card.country}
              </div>
            </div>
          ))}
        </div>

        <h3 className="l22-listen-subtitle">Conference card — about you</h3>
        <p className="lesson22-section-desc">
          Склади речення про себе: ім'я, місто, країна, роль.
        </p>
        <div className="l25-conf-card">
          <div className="l25-conf-header">
            10th International Language Conference
          </div>
          <div className="l25-conf-fields">
            <div className="l25-conf-field">
              <span>Name:</span>
              <span className="l25-conf-blank" />
            </div>
            <div className="l25-conf-field">
              <span>City:</span>
              <span className="l25-conf-blank" />
            </div>
            <div className="l25-conf-field">
              <span>Country:</span>
              <span className="l25-conf-blank" />
            </div>
          </div>
          <div className="l25-conf-roles">
            {[
              "student",
              "school teacher",
              "university teacher",
              "language school teacher",
              "manager",
            ].map((r) => (
              <span key={r} className="l25-conf-role">
                ☐ {r}
              </span>
            ))}
          </div>
        </div>
        <div className="lesson22-prompt-grid" style={{ marginTop: "1rem" }}>
          {[
            "Hello, I'm ___. Nice to meet you.",
            "I'm from ___ in ___. Where are you from?",
            "Are you a student / teacher / manager?",
            "Yes, I am. / No, I'm not. I'm a ___.",
          ].map((q) => (
            <div
              key={q}
              className="lesson22-prompt-card lesson22-prompt-card--task"
            >
              {q}
            </div>
          ))}
        </div>
      </section>
      {/* ── 6. Grammar: be you / we / they ───────────────────── */}
      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-section-head">
          <p className="page-kicker">Grammar</p>
          <h2>be: you / we / they</h2>
          <p className="lesson22-section-desc">
            Тепер — форми для двох і більше людей. Зверни увагу на короткі
            відповіді.
          </p>
        </div>

        <div className="l25-grammar-box">
          <div className="l25-grammar-label">be: you / we / they</div>
          <div className="l25-grammar-rows">
            <div className="l25-gr-row l25-gr-row--pos">
              <span className="l25-gr-sign">+</span>
              <div className="l25-gr-cells">
                <span>
                  <strong>You're</strong> British.
                </span>
                <span>
                  <strong>We're</strong> office workers.
                </span>
                <span>
                  <strong>They're</strong> nurses.
                </span>
              </div>
            </div>
            <div className="l25-gr-row l25-gr-row--neg">
              <span className="l25-gr-sign">−</span>
              <div className="l25-gr-cells">
                <span>
                  <strong>You aren't</strong> American.
                </span>
                <span>
                  <strong>We aren't</strong> football players.
                </span>
                <span>
                  <strong>They aren't</strong> doctors.
                </span>
              </div>
            </div>
            <div className="l25-gr-row l25-gr-row--q">
              <span className="l25-gr-sign">?</span>
              <div className="l25-gr-cells">
                <span>
                  <strong>Are you</strong> British?
                </span>
                <span className="l25-gr-answer">
                  Yes, <strong>we are</strong>. / No, <strong>we aren't</strong>
                  .
                </span>
              </div>
            </div>
            <div className="l25-gr-row l25-gr-row--q">
              <span className="l25-gr-sign">?</span>
              <div className="l25-gr-cells">
                <span>
                  <strong>Are we</strong> a good team?
                </span>
                <span className="l25-gr-answer">
                  Yes, <strong>you are</strong>. / No,{" "}
                  <strong>you aren't</strong>.
                </span>
              </div>
            </div>
            <div className="l25-gr-row l25-gr-row--q">
              <span className="l25-gr-sign">?</span>
              <div className="l25-gr-cells">
                <span>
                  <strong>Are they</strong> in the UK?
                </span>
                <span className="l25-gr-answer">
                  Yes, <strong>they are</strong>. / No,{" "}
                  <strong>they aren't</strong>.
                </span>
              </div>
            </div>
            <div className="l25-gr-row l25-gr-row--where">
              <span className="l25-gr-sign">who</span>
              <div className="l25-gr-cells">
                <span>
                  <strong>Who are</strong> they?
                </span>
                <span className="l25-gr-answer">
                  <strong>They're</strong> my friends.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ── Listening 1A: R4–R5 ──────────────────────────────── */}
      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-section-head">
          <p className="page-kicker">Listening · 1A Hello</p>
          <h2>Audio exercises — R4–R5</h2>
          <p className="lesson22-section-desc">
            Прослухай треки. Після кожного — розгорни транскрипцію для
            перевірки.
          </p>
        </div>
        <div className="l25-audio-list">
          {tracksR1to5.slice(3).map((t) => (
            <AudioPlayer key={t.r} track={t} />
          ))}
        </div>
      </section>
      {/* ── Listening 1C: R9–R15 ─────────────────────────────── */}
      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-section-head">
          <p className="page-kicker">Listening · 1C Nationalities</p>
          <h2>Audio exercises — R9–R15</h2>
          <p className="lesson22-section-desc">
            Прослухай треки до секції "Nationalities". Після кожного — розгорни
            транскрипцію.
          </p>
        </div>
        <div className="l25-audio-list">
          {tracksR9to15.map((t) => (
            <AudioPlayer key={t.r} track={t} />
          ))}
        </div>
      </section>
      {/* ── 9. Mini speaking – about yourself ────────────────── */}
      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-section-head">
          <p className="page-kicker">Speaking</p>
          <h2>Introduce yourself</h2>
          <p className="lesson22-section-desc">
            Відповідай вголос повними реченнями. Використай{" "}
            <strong>I'm / I'm from / I'm a</strong>.
          </p>
        </div>
        <div className="lesson22-prompt-grid">
          {[
            "What's your name?",
            "Where are you from? (country and city)",
            "Are you a student or a teacher?",
            "Are you from a big city or a small town?",
            "Introduce a friend: She/He is ___, from ___, she/he's a ___.",
          ].map((q) => (
            <div
              key={q}
              className="lesson22-prompt-card lesson22-prompt-card--task"
            >
              {q}
            </div>
          ))}
        </div>

        <h3 className="l22-listen-subtitle">Question practice</h3>
        <div className="l22-self-grid">
          {[
            { q: "Are you from the UK?", tag: "be + you" },
            { q: "Is your teacher British?", tag: "be + she/he" },
            { q: "Are you and your friends students?", tag: "be + we" },
            { q: "Where are they from?", tag: "be + they" },
            { q: "Am I late?", tag: "be + I" },
            { q: "Are we in the right class?", tag: "be + we" },
          ].map((item) => (
            <div key={item.q} className="l22-self-card">
              <strong>{item.q}</strong>
              <span>{item.tag}</span>
            </div>
          ))}
        </div>
      </section>
      {/* ── Check and Reflect ────────────────────────────────── */}
      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-section-head">
          <p className="page-kicker">Check &amp; Reflect</p>
          <h2>Review exercises</h2>
          <p className="lesson22-section-desc">
            Перевір себе — виконай усі вправи з розділу "Check and Reflect".
          </p>
        </div>

        {/* Ex 1 — word search */}
        <div className="l25-cr-block">
          <span className="l25-cr-num">1</span>
          <div className="l25-cr-body">
            <p className="l25-cr-instr">Find the ten countries in the wordsearch.</p>
            <p className="l25-cr-bank">
              Argentina · Brazil · Canada · Italy · Japan · Mexico · Poland · Spain · Thailand · Turkey
            </p>

            <div className="l25-ws-wrap" onMouseLeave={() => setWsHover(null)}>
              <div className="l25-ws-grid" style={{ userSelect: "none" }}>
                {wsGrid.map((row, r) =>
                  row.split("").map((letter, c) => {
                    const key = `${r},${c}`;

                    // found word color
                    let foundBg: string | undefined;
                    wsWordCells.forEach(([word, wc], wi) => {
                      if (wsFound.has(word) && (wc as [number,number][]).some(([wr,wc2]) => wr===r && wc2===c))
                        foundBg = WS_COLORS[wi];
                    });

                    // reveal-all color
                    const revealBg = !foundBg && wsShowAll ? wsCellColorMap[key] : undefined;

                    // hover preview path
                    const previewPath = wsFirst && wsHover
                      ? wsCellsBetween(wsFirst[0], wsFirst[1], wsHover[0], wsHover[1])
                      : null;
                    const inPreview = !foundBg && !revealBg && previewPath?.some(([pr,pc]) => pr===r && pc===c);
                    const isFirst   = !foundBg && !revealBg && wsFirst?.[0]===r && wsFirst?.[1]===c;

                    const bg = foundBg ?? revealBg;
                    return (
                      <div
                        key={key}
                        className={`l25-ws-cell${
                          bg          ? ""               :
                          inPreview   ? " l25-ws-sel"    :
                          isFirst     ? " l25-ws-first"  : ""
                        }`}
                        style={bg ? { background: bg } : undefined}
                        onClick={() => handleWsClick(r, c)}
                        onMouseEnter={() => { if (wsFirst) setWsHover([r, c]); }}
                      >
                        {letter}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Legend */}
            <div className="l25-ws-legend">
              {wsWordCells.map(([word], i) => (
                <span
                  key={word}
                  className={`l25-ws-tag${wsFound.has(word) ? " l25-ws-tag--found" : ""}`}
                  style={wsFound.has(word) || wsShowAll ? { background: WS_COLORS[i] } : undefined}
                >
                  {wsFound.has(word) && "✓ "}{word}
                </span>
              ))}
            </div>

            {wsFound.size === wsWordCells.length && (
              <p className="l25-ws-success">🎉 All {wsWordCells.length} words found!</p>
            )}

            <div className="l25-cr-actions">
              <button
                className="l25-cr-mini-btn"
                onClick={() => {
                  setWsFound(new Set());
                  setWsFirst(null);
                  setWsHover(null);
                  setWsShowAll(false);
                }}
              >
                Reset
              </button>
              <button
                className="l22-check-btn"
                onClick={() => setWsShowAll(v => !v)}
              >
                {wsShowAll ? "Hide answers" : "Reveal all"}
              </button>
              <span className="l22-score">{wsFound.size} / {wsWordCells.length}</span>
            </div>
          </div>
        </div>
      </section>
      {/* ── Homework ──────────────────────────────────────────── */}
      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-section-head">
          <p className="page-kicker">Homework</p>
          <h2>After class</h2>
          <p className="lesson22-section-desc">
            Напиши 5 речень про себе (ім'я, місто, країна, робота/навчання) і 5
            речень про друга або члена сім'ї — з am / is / are.
          </p>
        </div>
        <Link className="lesson22-back-link" to="/hw-25">
          Домашнє завдання · Lesson 25 →
        </Link>
        <Link className="lesson22-back-link" to="/homework" style={{ marginTop: "0.5rem" }}>
          Homework page
        </Link>
      </section>
    </div>
  );
}
