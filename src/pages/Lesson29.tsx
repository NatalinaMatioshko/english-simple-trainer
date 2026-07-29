import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
import "../styles/lesson28.css";
import "../styles/lesson29.css";

const IMG28 = (file: string) =>
  `${import.meta.env.BASE_URL}images/lesson28/${file}`;

const IMG = (file: string) =>
  `${import.meta.env.BASE_URL}images/lesson29/${file}`;

const SOUND = (r: number) =>
  `${import.meta.env.BASE_URL}sounds/Unit_2/RM_A1_SB_U2_R${r}.mp3`;

type SpeakingTopic = {
  id: number;
  title: string;
  hint: string;
  questions: string[];
};

const speakingTopics: SpeakingTopic[] = [
  {
    id: 1,
    title: "Personal information",
    hint: "Початок будь-якого speaking",
    questions: [
      "What’s your name?",
      "How do you spell your name?",
      "Where are you from?",
      "What city do you live in?",
      "How old are you?",
      "Do you study or work?",
      "What do you do?",
    ],
  },
  {
    id: 2,
    title: "Family",
    hint: "Для теми family / relatives",
    questions: [
      "Do you have a family?",
      "Who is in your family?",
      "Do you have a mother, father, sister, or brother?",
      "How many brothers and sisters do you have?",
      "What does your mother do?",
      "What does your father do?",
      "Do you have any nephews or nieces?",
      "Where does your family live?",
      "Is your family big or small?",
      "Who do you live with?",
    ],
  },
  {
    id: 3,
    title: "Appearance",
    hint: "Для опису зовнішності",
    questions: [
      "What do you look like?",
      "Do you have long or short hair?",
      "What colour is your hair?",
      "Do you have blue, green, brown, or grey eyes?",
      "Are you tall or short?",
      "Are you slim or strong?",
      "Do you wear glasses?",
      "What is your favourite clothes style?",
      "Can you describe your best friend?",
      "Can you describe a family member?",
    ],
  },
  {
    id: 4,
    title: "Jobs and work",
    hint: "Для теми професій",
    questions: [
      "What is your job?",
      "Where do you work?",
      "What do you do at work?",
      "Do you like your job?",
      "Is your job interesting or boring?",
      "What does your mother/father/sister/brother do?",
      "Is your work busy?",
      "Do you work from home or in an office?",
      "What time do you start work?",
      "What time do you finish work?",
    ],
  },
  {
    id: 5,
    title: "Daily routines",
    hint: "Для present simple",
    questions: [
      "What time do you get up?",
      "What do you do in the morning?",
      "Do you drink coffee or tea?",
      "Do you have breakfast every day?",
      "What time do you go to work / study?",
      "Do you watch TV in the evening?",
      "What do you do before bed?",
      "What time do you go to sleep?",
      "Do you exercise?",
      "What do you do on weekdays?",
    ],
  },
  {
    id: 6,
    title: "Free time and hobbies",
    hint: "Для hobbies / likes",
    questions: [
      "What do you like doing in your free time?",
      "Do you like reading?",
      "Do you like cooking?",
      "Do you like watching videos on YouTube?",
      "Do you play any sports?",
      "Do you go running or hiking?",
      "Do you meet your friends?",
      "What is your favourite hobby?",
      "How often do you do it?",
      "Do you prefer quiet hobbies or active hobbies?",
    ],
  },
  {
    id: 7,
    title: "Possessions and home",
    hint: "Для have got / there is / there are",
    questions: [
      "Do you have your own room?",
      "What is in your room?",
      "Do you have a laptop, phone, or tablet?",
      "What furniture do you have at home?",
      "Is there a big kitchen in your home?",
      "How many rooms are there in your flat/house?",
      "Who has the biggest room?",
      "What is your favourite thing at home?",
      "Do you have a pet?",
      "What is your pet’s name?",
    ],
  },
  {
    id: 8,
    title: "Places and city",
    hint: "Для city / places / directions",
    questions: [
      "What city do you live in?",
      "What places are there in your city?",
      "Is there a park near your home?",
      "Is there a cafe, school, hospital, or shop near you?",
      "What places do you visit often?",
      "Do you like your city?",
      "What is your favourite place in the city?",
      "Do you know any nice places to walk?",
      "How do you go to work / school?",
      "Can you describe your neighbourhood?",
    ],
  },
  {
    id: 9,
    title: "Countries and nationalities",
    hint: "Для repeat of be + countries",
    questions: [
      "Where are you from?",
      "What nationality are you?",
      "What languages do you speak?",
      "Have you visited another country?",
      "Which countries do you know?",
      "Do you want to visit Japan / Italy / Spain / the UK?",
      "What country would you like to live in?",
      "Is your friend from Ukraine too?",
      "Do you know people from other countries?",
      "What is your favourite country?",
    ],
  },
  {
    id: 10,
    title: "People you know",
    hint: "Для mixed speaking",
    questions: [
      "Tell me about your mother.",
      "Tell me about your brother.",
      "Tell me about your friend.",
      "What does she/he do?",
      "How old is he/she?",
      "Where does he/she live?",
      "What does he/she like?",
      "Is he/she married?",
      "Does he/she have children?",
      "What is he/she like?",
    ],
  },
  {
    id: 11,
    title: "Likes and preferences",
    hint: "Для простого opinion speaking",
    questions: [
      "What do you like?",
      "What don’t you like?",
      "Do you like coffee?",
      "Do you like shopping?",
      "Do you like reading books?",
      "Do you like travelling?",
      "What is your favourite food?",
      "What is your favourite drink?",
      "Which do you prefer: tea or coffee?",
      "Why do you like it?",
    ],
  },
];

/* ── Part 2 · Numbers — data ─────────────────────────────────── */

const numberWords = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
] as const;

const numberBank = numberWords.map((word, i) => ({ value: i + 1, word }));

/** Cards 1–10 (shuffled photo order, each still shows the correct digit) */
const numberPictures = [
  { pos: 1, value: 7 },
  { pos: 2, value: 3 },
  { pos: 3, value: 10 },
  { pos: 4, value: 1 },
  { pos: 5, value: 8 },
  { pos: 6, value: 4 },
  { pos: 7, value: 9 },
  { pos: 8, value: 2 },
  { pos: 9, value: 6 },
  { pos: 10, value: 5 },
] as const;

const teenWords = [
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
] as const;

const tensWords = [
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety",
  "one hundred",
] as const;

/** R11 — listen and choose the number you hear (teen vs. ty confusion) */
const choosePairs = [
  { id: 1, options: ["13", "30"], answer: "13" },
  { id: 2, options: ["14", "40"], answer: "14" },
  { id: 3, options: ["15", "50"], answer: "50" },
  { id: 4, options: ["16", "60"], answer: "16" },
  { id: 5, options: ["17", "70"], answer: "70" },
  { id: 6, options: ["18", "80"], answer: "80" },
  { id: 7, options: ["19", "90"], answer: "19" },
] as const;

type Profile = {
  id: string;
  name: string;
  country: string;
  photo: string;
  fields: {
    age: { label: string; answers: string[] };
    from: { label: string; answers: string[] };
    job: { label: string; answers: string[] };
  };
};

const profiles: Profile[] = [
  {
    id: "anna",
    name: "Anna Chubb",
    country: "Canada",
    photo: "n1.svg",
    fields: {
      age: { label: "Age", answers: ["99"] },
      from: { label: "From", answers: ["canada"] },
      job: { label: "Job", answers: ["teacher", "she's a teacher", "shes a teacher"] },
    },
  },
  {
    id: "bill",
    name: "Bill Gooch",
    country: "the UK",
    photo: "n2.svg",
    fields: {
      age: { label: "Age", answers: ["85"] },
      from: { label: "From", answers: ["the uk", "uk"] },
      job: { label: "Job", answers: ["taxi driver", "he's a taxi driver", "hes a taxi driver"] },
    },
  },
  {
    id: "satoru",
    name: "Satoru Goto",
    country: "Japan",
    photo: "n3.svg",
    fields: {
      age: { label: "Age", answers: ["51"] },
      from: { label: "From", answers: ["japan"] },
      job: {
        label: "Job",
        answers: ["football player", "he's a football player", "hes a football player"],
      },
    },
  },
];

const pronSentences = [
  "What’s your name?",
  "Where’s he from?",
  "He’s a taxi driver.",
  "She’s from Poland.",
  "Who’s that?",
  "What’s his job?",
] as const;

type WriteItem = {
  id: number;
  prompt: string;
  answers: string[];
};

const writeItems: WriteItem[] = [
  {
    id: 1,
    prompt: "He’s from Thailand.",
    answers: ["where is he from", "where's he from"],
  },
  {
    id: 2,
    prompt: "He’s a doctor.",
    answers: ["what is his job", "what's his job"],
  },
  {
    id: 3,
    prompt: "Her name is Lidia Nowicki.",
    answers: ["what is her name", "what's her name"],
  },
  {
    id: 4,
    prompt: "She’s from Kraków in Poland.",
    answers: ["where is she from", "where's she from"],
  },
  {
    id: 5,
    prompt: "They’re from the US.",
    answers: ["where are they from"],
  },
];

type AudioTrackData = {
  r: number;
  exercise: string;
  title: string;
  transcript: ReactNode;
};

const trackR9: AudioTrackData = {
  r: 9,
  exercise: "Vocabulary · 1b",
  title: "Numbers 11–19 — listen and repeat",
  transcript: <p>{teenWords.join(" · ")}</p>,
};

const trackR10: AudioTrackData = {
  r: 10,
  exercise: "Vocabulary · 1c",
  title: "Tens and one hundred — listen and repeat",
  transcript: <p>{tensWords.join(" · ")}</p>,
};

const trackR11: AudioTrackData = {
  r: 11,
  exercise: "Listening · 2",
  title: "Listen and choose the number you hear",
  transcript: (
    <ol>
      {choosePairs.map((p) => (
        <li key={p.id}>
          {p.options.join(" or ")} → <strong>{p.answer}</strong>
        </li>
      ))}
    </ol>
  ),
};

const trackR12: AudioTrackData = {
  r: 12,
  exercise: "Vocabulary · 3",
  title: "twenty-one, twenty-two, twenty-three… — listen and check",
  transcript: (
    <p>
      twenty-one · twenty-two · twenty-three · twenty-four · twenty-five …
    </p>
  ),
};

const trackR13: AudioTrackData = {
  r: 13,
  exercise: "Listening · 4",
  title: "Anna, Bill and Satoru — listen",
  transcript: (
    <p>
      Anna Chubb is ninety-nine. She’s from Canada. She’s a teacher.
      <br />
      Bill Gooch is eighty-five. He’s from the UK. He’s a taxi driver.
      <br />
      Satoru Goto is fifty-one. He’s from Japan. He’s a football player.
    </p>
  ),
};

const trackR14: AudioTrackData = {
  r: 14,
  exercise: "Pronunciation · 6",
  title: "’s in questions — listen and repeat",
  transcript: (
    <ul>
      {pronSentences.map((s) => (
        <li key={s}>{s}</li>
      ))}
    </ul>
  ),
};

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

const selClass = drillSelClass;

function inputStateClass(checked: boolean, hasValue: boolean, ok: boolean) {
  if (!checked || !hasValue) return "";
  return ok ? "is-ok" : "is-err";
}

function normalizeLoose(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/^(he's|she's|it's|a |an |the )/g, "")
    .replace(/[^a-z0-9]/g, "");
}

function normalizeQuestion(s: string): string {
  return s
    .toLowerCase()
    .replace(/[?.!]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export default function Lesson29() {
  const [numAns, setNumAns] = useState<Record<number, string>>({});
  const [numChecked, setNumChecked] = useState(false);

  const [pairAns, setPairAns] = useState<Record<number, string>>({});
  const [pairChecked, setPairChecked] = useState(false);

  const [nextNumAns, setNextNumAns] = useState("");
  const [nextNumChecked, setNextNumChecked] = useState(false);

  const [profileAns, setProfileAns] = useState<Record<string, string>>({});
  const [profileChecked, setProfileChecked] = useState(false);

  const [grammarAns, setGrammarAns] = useState({ q1: "", q2: "" });
  const [grammarChecked, setGrammarChecked] = useState(false);

  const [writeAns, setWriteAns] = useState<Record<number, string>>({});
  const [writeChecked, setWriteChecked] = useState(false);

  const [classmateNames, setClassmateNames] = useState(["", "", ""]);

  const numScore = numberPictures.filter(
    (p) => numAns[p.pos] === numberWords[p.value - 1],
  ).length;

  const pairScore = choosePairs.filter(
    (p) => pairAns[p.id] === p.answer,
  ).length;

  const nextNumOk =
    ["24", "twentyfour"].includes(normalizeLoose(nextNumAns)) &&
    nextNumAns.trim() !== "";

  const profileFieldKeys = profiles.flatMap((p) =>
    (Object.keys(p.fields) as (keyof Profile["fields"])[]).map((field) => ({
      key: `${p.id}-${field}`,
      answers: p.fields[field].answers,
    })),
  );
  const profileScore = profileFieldKeys.filter((f) =>
    f.answers.includes(normalizeLoose(profileAns[f.key] ?? "")),
  ).length;

  const writeScore = writeItems.filter((item) =>
    item.answers
      .map(normalizeQuestion)
      .includes(normalizeQuestion(writeAns[item.id] ?? "")),
  ).length;

  return (
    <div className="lesson22-page lesson28-page">
      <section className="lesson22-hero panel">
        <div className="lesson22-hero-top">
          <div>
            <p className="page-kicker">Lesson 29</p>
            <h1>Numbers</h1>
            <p className="lesson22-topic-pill">
              Question words with be · Numbers 1–100
            </p>
            <p className="lesson22-subtitle">
              Part 1 — speaking (tell your story). Part 2 — numbers 1–100,
              listening about other people, and questions with{" "}
              <em>be</em>.
            </p>
            <div className="chips" style={{ marginTop: "0.75rem" }}>
              <span className="chip">Speaking</span>
              <span className="chip">Numbers</span>
              <span className="chip">Listening</span>
              <span className="chip">Grammar</span>
            </div>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <Link className="lesson22-back-link" to="/hw-29">
              Homework → Lesson 29
            </Link>
            <Link className="lesson22-back-link" to="/lessons">
              ← Back to lessons
            </Link>
          </div>
        </div>
      </section>

      <section id="l29-speaking" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">2 · Speak about yourself</p>
          <h2>Tell your story</h2>
          <p className="lesson22-section-desc">
            Обери тему нижче. Питання — лише підказки / опори. Не відповідай
            коротко «як на інтерв’ю».{" "}
            <strong>
              Розповідай про себе широко: 4–8 зв’язних речень
            </strong>
            , ніби ти знайомишся з новою людиною. Додавай деталі, причини,
            приклади з життя.
          </p>
        </div>

        <div className="l28-task-note">
          <strong>How to speak:</strong> візьми 2–3 питання з блоку і зроби з
          них одну маленьку історію про себе. Наприклад, замість{" "}
          <em>Yes. / I’m a student.</em> скажи:{" "}
          <em>
            I’m a student. I study English every day, and in the evening I
            usually watch videos or meet my friends.
          </em>
        </div>

        <div className="l28-speak-grid">
          <article className="l28-speak-card l28-speak-card--poster">
            <img
              className="l28-about-me-img"
              src={IMG28("all-about-me.jpg")}
              alt="All about me worksheet: name, age, likes, favorites, fun fact"
              width={722}
              height={1024}
              loading="lazy"
            />
          </article>

          {speakingTopics.map((topic) => (
            <article key={topic.id} className="l28-speak-card">
              <header className="l28-speak-card-head">
                <span className="l28-speak-num">{topic.id}</span>
                <div>
                  <h3 className="l28-speak-title">{topic.title}</h3>
                  <p className="l28-speak-hint">{topic.hint}</p>
                </div>
              </header>
              <ol className="l28-speak-list">
                {topic.questions.map((q) => (
                  <li key={q}>{q}</li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </section>

      {/* ── Part 2 — Numbers ────────────────────────────────────── */}

      <section
        id="l29-goals"
        className="lesson22-block panel l29-goals"
        aria-label="Part 2 goals"
      >
        <ul className="l29-goals-list">
          <li>
            <span className="l29-goals-chevron" aria-hidden="true">
              ›
            </span>
            <span>
              <strong>Goal:</strong> questions about other people
            </span>
          </li>
          <li>
            <span className="l29-goals-chevron" aria-hidden="true">
              ›
            </span>
            <span>
              <strong>Grammar:</strong> question words with <em>be</em>
            </span>
          </li>
          <li>
            <span className="l29-goals-chevron" aria-hidden="true">
              ›
            </span>
            <span>
              <strong>Vocabulary:</strong> numbers 1–100
            </span>
          </li>
        </ul>
      </section>

      <section id="l29-numbers-match" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Part 2 · Vocabulary · 1a</p>
          <h2>Numbers 1–10</h2>
          <p className="lesson22-section-desc">
            З’єднай цифру на картці зі словом. Обери правильне слово зі
            списку під кожною карткою.
          </p>
        </div>

        <figure className="l29-scene" style={{ maxWidth: 360 }}>
          <img
            src={IMG("field-scene.png")}
            alt="Decorative illustration — count the objects in the scene"
            loading="lazy"
            decoding="async"
          />
        </figure>

        <div className="l29-word-bank" aria-label="Word bank">
          {numberBank.map((n) => (
            <span key={n.value}>
              {n.value} {n.word}
            </span>
          ))}
        </div>

        <div className="l29-match-grid">
          {numberPictures.map((pic) => {
            const chosen = numAns[pic.pos] ?? "";
            const answer = numberWords[pic.value - 1];
            return (
              <div key={pic.pos} className="l29-match-card">
                <div className="l29-match-frame">
                  <span className="l29-match-num">{pic.pos}</span>
                  <img
                    className="l29-match-img"
                    src={IMG(`n${pic.value}.svg`)}
                    alt={`Number card ${pic.pos}`}
                    loading="lazy"
                  />
                </div>
                <select
                  value={chosen}
                  onChange={(e) => {
                    setNumChecked(false);
                    setNumAns((prev) => ({
                      ...prev,
                      [pic.pos]: e.target.value,
                    }));
                  }}
                  className={selClass(numChecked, chosen, answer)}
                  aria-label={`Word for card ${pic.pos}`}
                >
                  <option value="">select…</option>
                  {numberBank.map((n) => (
                    <option key={n.word} value={n.word}>
                      {n.word}
                    </option>
                  ))}
                </select>
              </div>
            );
          })}
        </div>

        <div className="l25-cr-actions" style={{ marginTop: "1rem" }}>
          <button className="l22-check-btn" onClick={() => setNumChecked(true)}>
            Check answers
          </button>
          <button
            className="btn secondary"
            type="button"
            onClick={() => {
              setNumAns({});
              setNumChecked(false);
            }}
          >
            Reset
          </button>
          {numChecked && (
            <span className="l22-score">
              {numScore} / {numberPictures.length}
            </span>
          )}
        </div>

        <figure className="l29-scene" style={{ marginTop: "1.25rem" }}>
          <img
            src={IMG("numbers-7-10.png")}
            alt="Numbers in real life: 7, 8, 9, 10 shown in everyday photos"
            loading="lazy"
            decoding="async"
          />
          <figcaption className="l28-scene-cap" style={{ marginTop: "0.4rem" }}>
            Numbers in real life
          </figcaption>
        </figure>
      </section>

      <section id="l29-teens" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Part 2 · Vocabulary · 1b</p>
          <h2>Numbers 11–19</h2>
          <p className="lesson22-section-desc">
            Послухай <strong>R9</strong> і повтори числа 11–19 вголос.
          </p>
        </div>

        <div className="l29-chip-row" role="list" aria-label="Numbers 11–19">
          {teenWords.map((w, i) => (
            <span key={w} className="l29-chip l29-chip--teens" role="listitem">
              <strong>{i + 11}</strong> {w}
            </span>
          ))}
        </div>

        <div className="l25-audio-list" style={{ margin: "1rem 0 0" }}>
          <AudioPlayer track={trackR9} />
        </div>
      </section>

      <section id="l29-tens" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Part 2 · Vocabulary · 1c</p>
          <h2>Tens and one hundred</h2>
          <p className="lesson22-section-desc">
            Послухай <strong>R10</strong> і повтори десятки та сто вголос.
          </p>
        </div>

        <div className="l29-chip-row" role="list" aria-label="Tens and one hundred">
          {tensWords.map((w, i) => (
            <span key={w} className="l29-chip l29-chip--tens" role="listitem">
              <strong>{i < 8 ? (i + 2) * 10 : 100}</strong> {w}
            </span>
          ))}
        </div>

        <div className="l25-audio-list" style={{ margin: "1rem 0 0" }}>
          <AudioPlayer track={trackR10} />
        </div>
      </section>

      <section id="l29-listen-choose" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Part 2 · Listening · 2</p>
          <h2>Listen and choose</h2>
          <p className="lesson22-section-desc">
            Числа на -teen (13, 14…) і числа на -ty (30, 40…) звучать схоже.
            Послухай <strong>R11</strong> і обери число, яке ти чуєш.
          </p>
        </div>

        <div className="l25-audio-list" style={{ margin: "0 0 1rem" }}>
          <AudioPlayer track={trackR11} />
        </div>

        <div className="l29-pair-list">
          {choosePairs.map((item) => {
            const chosen = pairAns[item.id] ?? "";
            return (
              <div key={item.id} className="l29-pair-row">
                <span className="l29-pair-num">{item.id}</span>
                <div className="l29-pair-opts">
                  {item.options.map((opt) => {
                    let cls = "l29-pair-btn";
                    if (chosen === opt) cls += " is-selected";
                    if (pairChecked && opt === item.answer) cls += " is-ok";
                    else if (pairChecked && chosen === opt && opt !== item.answer)
                      cls += " is-err";
                    return (
                      <button
                        key={opt}
                        type="button"
                        className={cls}
                        onClick={() => {
                          setPairChecked(false);
                          setPairAns((prev) => ({ ...prev, [item.id]: opt }));
                        }}
                        aria-pressed={chosen === opt}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="l25-cr-actions" style={{ marginTop: "0.85rem" }}>
          <button className="l22-check-btn" onClick={() => setPairChecked(true)}>
            Check answers
          </button>
          <button
            className="btn secondary"
            type="button"
            onClick={() => {
              setPairAns({});
              setPairChecked(false);
            }}
          >
            Reset
          </button>
          {pairChecked && (
            <span className="l22-score">
              {pairScore} / {choosePairs.length}
            </span>
          )}
        </div>
      </section>

      <section id="l29-next-number" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Part 2 · Vocabulary · 3</p>
          <h2>What comes next?</h2>
          <p className="lesson22-section-desc">
            Прочитай послідовність чисел і встав наступне число. Потім
            послухай <strong>R12</strong> і перевір себе.
          </p>
        </div>

        <p className="l29-sequence">
          twenty-one · twenty-two · twenty-three · …
        </p>

        <div className="l29-write-list">
          <div className="l29-write-row">
            <input
              type="text"
              value={nextNumAns}
              onChange={(e) => {
                setNextNumChecked(false);
                setNextNumAns(e.target.value);
              }}
              placeholder="twenty-four / 24"
              className={inputStateClass(
                nextNumChecked,
                nextNumAns.trim() !== "",
                nextNumOk,
              )}
              aria-label="What comes next?"
            />
            {nextNumChecked && !nextNumOk && (
              <p className="l29-write-answer">
                Правильна відповідь: <strong>24 / twenty-four</strong>
              </p>
            )}
          </div>
        </div>

        <div className="l25-cr-actions" style={{ marginTop: "0.75rem" }}>
          <button
            className="l22-check-btn"
            onClick={() => setNextNumChecked(true)}
          >
            Check
          </button>
          <button
            className="btn secondary"
            type="button"
            onClick={() => {
              setNextNumAns("");
              setNextNumChecked(false);
            }}
          >
            Reset
          </button>
        </div>

        <div className="l25-audio-list" style={{ margin: "1rem 0 0" }}>
          <AudioPlayer track={trackR12} />
        </div>
      </section>

      <section id="l29-listening-profiles" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Part 2 · Listening · 4</p>
          <h2>Anna, Bill and Satoru</h2>
          <p className="lesson22-section-desc">
            Послухай діалог <strong>R13</strong>. Скільки років людям? Звідки
            вони? Ким вони працюють? Заповни профілі.
          </p>
        </div>

        <div className="l25-audio-list" style={{ margin: "0 0 1rem" }}>
          <AudioPlayer track={trackR13} />
        </div>

        <div className="l29-profile-grid">
          {profiles.map((p) => (
            <article key={p.id} className="l29-profile">
              <h3>{p.name}</h3>
              {(Object.keys(p.fields) as (keyof Profile["fields"])[]).map(
                (field) => {
                  const key = `${p.id}-${field}`;
                  const value = profileAns[key] ?? "";
                  const ok = p.fields[field].answers.includes(
                    normalizeLoose(value),
                  );
                  return (
                    <label key={key} className="l29-profile-field">
                      {p.fields[field].label}
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => {
                          setProfileChecked(false);
                          setProfileAns((prev) => ({
                            ...prev,
                            [key]: e.target.value,
                          }));
                        }}
                        className={inputStateClass(
                          profileChecked,
                          value.trim() !== "",
                          ok,
                        )}
                        aria-label={`${p.name} — ${p.fields[field].label}`}
                      />
                    </label>
                  );
                },
              )}
            </article>
          ))}
        </div>

        <div className="l25-cr-actions" style={{ marginTop: "0.85rem" }}>
          <button
            className="l22-check-btn"
            onClick={() => setProfileChecked(true)}
          >
            Check answers
          </button>
          <button
            className="btn secondary"
            type="button"
            onClick={() => {
              setProfileAns({});
              setProfileChecked(false);
            }}
          >
            Reset
          </button>
          {profileChecked && (
            <span className="l22-score">
              {profileScore} / {profileFieldKeys.length}
            </span>
          )}
        </div>
      </section>

      <section id="l29-grammar" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Part 2 · Grammar</p>
          <h2>Question words with be</h2>
          <p className="lesson22-section-desc">
            Обери правильний варіант у правилі, використовуючи приклади з
            таблиці нижче.
          </p>
        </div>

        <div className="l29-grammar-box">
          <h3>Rule</h3>
          <p className="l29-grammar-rule">
            Question words (<em>where, what, who, how</em>…) come{" "}
            <select
              value={grammarAns.q1}
              onChange={(e) => {
                setGrammarChecked(false);
                setGrammarAns((p) => ({ ...p, q1: e.target.value }));
              }}
              className={selClass(grammarChecked, grammarAns.q1, "before")}
              aria-label="Question words come before/after be"
            >
              <option value="">___</option>
              <option value="before">before</option>
              <option value="after">after</option>
            </select>{" "}
            <em>be</em>.
          </p>
          <p className="l29-grammar-rule">
            <em>Be</em> comes{" "}
            <select
              value={grammarAns.q2}
              onChange={(e) => {
                setGrammarChecked(false);
                setGrammarAns((p) => ({ ...p, q2: e.target.value }));
              }}
              className={selClass(grammarChecked, grammarAns.q2, "before")}
              aria-label="Be comes before/after the subject"
            >
              <option value="">___</option>
              <option value="before">before</option>
              <option value="after">after</option>
            </select>{" "}
            the subject.
          </p>

          <table className="l29-grammar-table">
            <tbody>
              <tr>
                <td>
                  <strong>Where</strong>
                </td>
                <td>is</td>
                <td>he</td>
                <td>from?</td>
              </tr>
              <tr>
                <td>
                  <strong>What</strong>
                </td>
                <td>is</td>
                <td>her</td>
                <td>name?</td>
              </tr>
              <tr>
                <td>
                  <strong>Who</strong>
                </td>
                <td>is</td>
                <td>that</td>
                <td>man?</td>
              </tr>
              <tr>
                <td>
                  <strong>How old</strong>
                </td>
                <td>are</td>
                <td>they</td>
                <td>?</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="l25-cr-actions">
          <button
            className="l22-check-btn"
            onClick={() => setGrammarChecked(true)}
          >
            Check
          </button>
          {grammarChecked && (
            <span className="l22-score">
              {(grammarAns.q1 === "before" ? 1 : 0) +
                (grammarAns.q2 === "before" ? 1 : 0)}{" "}
              / 2
            </span>
          )}
        </div>
      </section>

      <section id="l29-pronunciation" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Part 2 · Pronunciation · 6</p>
          <h2>’s in questions</h2>
          <p className="lesson22-section-desc">
            Послухай <strong>R14</strong>. Зверни увагу на коротку форму{" "}
            <span className="be">’s</span> (is). Слухай ще раз і повторюй.
          </p>
        </div>

        <ul className="l29-pron-list">
          {pronSentences.map((s) => {
            const idx = s.indexOf("’s");
            if (idx === -1) return <li key={s}>{s}</li>;
            return (
              <li key={s}>
                {s.slice(0, idx)}
                <span className="be">’s</span>
                {s.slice(idx + 2)}
              </li>
            );
          })}
        </ul>

        <div className="l25-audio-list" style={{ margin: "1rem 0 0" }}>
          <AudioPlayer track={trackR14} />
        </div>

        <div className="l28-task-note" style={{ marginTop: "1rem" }}>
          <strong>Task:</strong> Listen again and repeat.
        </div>
      </section>

      <section id="l29-write-questions" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Part 2 · Grammar · 7</p>
          <h2>Write the questions</h2>
          <p className="lesson22-section-desc">
            Прочитай речення-відповідь і напиши питання з правильним{" "}
            <em>question word</em> і <em>be</em>. Можна писати повну (
            <em>What is…?</em>) або скорочену форму (<em>What’s…?</em>).
          </p>
        </div>

        <div className="l29-write-list">
          {writeItems.map((item) => {
            const value = writeAns[item.id] ?? "";
            const ok = item.answers
              .map(normalizeQuestion)
              .includes(normalizeQuestion(value));
            return (
              <div key={item.id} className="l29-write-row">
                <p>
                  <strong>{item.id}.</strong> {item.prompt}
                </p>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => {
                    setWriteChecked(false);
                    setWriteAns((prev) => ({
                      ...prev,
                      [item.id]: e.target.value,
                    }));
                  }}
                  placeholder="Write the question…"
                  className={inputStateClass(
                    writeChecked,
                    value.trim() !== "",
                    ok,
                  )}
                  aria-label={`Question ${item.id}`}
                />
                {writeChecked && !ok && (
                  <p className="l29-write-answer">
                    Наприклад: <strong>{item.answers[0]}</strong>
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="l25-cr-actions" style={{ marginTop: "0.85rem" }}>
          <button
            className="l22-check-btn"
            onClick={() => setWriteChecked(true)}
          >
            Check answers
          </button>
          <button
            className="btn secondary"
            type="button"
            onClick={() => {
              setWriteAns({});
              setWriteChecked(false);
            }}
          >
            Reset
          </button>
          {writeChecked && (
            <span className="l22-score">
              {writeScore} / {writeItems.length}
            </span>
          )}
        </div>
      </section>

      <section id="l29-classmates" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Part 2 · Grammar · 8</p>
          <h2>Ask about people you know</h2>
          <p className="lesson22-section-desc">
            Впиши імена трьох людей з групи (або вигаданих людей). Потім
            постав про кожного 2–3 питання з <em>be</em>, як у прикладі.
          </p>
        </div>

        <div className="l29-family-inputs">
          {classmateNames.map((name, i) => (
            <input
              key={i}
              type="text"
              value={name}
              onChange={(e) => {
                setClassmateNames((prev) => {
                  const next = [...prev];
                  next[i] = e.target.value;
                  return next;
                });
              }}
              placeholder={`Name ${i + 1}`}
              aria-label={`Classmate name ${i + 1}`}
            />
          ))}
        </div>

        <div className="l29-mini-dlg" aria-label="Example">
          <p>
            <strong>A:</strong> <em>Who’s Felipe?</em>
          </p>
          <p>
            <strong>B:</strong> He’s a classmate. He’s from Brazil.
          </p>
          <p>
            <strong>A:</strong> <em>How old is he?</em>
          </p>
          <p>
            <strong>B:</strong> He’s twenty-three.
          </p>
        </div>
      </section>

      <section id="l29-speaking2" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Part 2 · Speaking · 9–10</p>
          <h2>Ask your partner</h2>
          <p className="lesson22-section-desc">
            Робота в парах. Спочатку підготуй 3–4 питання про партнера, потім
            поговоріть.
          </p>
        </div>

        <div className="l28-task-note">
          <strong>9 · Prepare:</strong> Напиши 3–4 питання з{" "}
          <em>be</em> та question words про партнера — вік, звідки він/вона,
          робота/навчання. Наприклад: <em>How old are you? Where are you
          from? What’s your job?</em>
        </div>

        <div className="l28-task-note">
          <strong>10 · Speak:</strong> Задай партнеру свої питання і запиши
          відповіді. Потім розкажи класу 2–3 речення про партнера:{" "}
          <em>
            This is Olena. She’s twenty-five. She’s from Lviv. She’s a
            designer.
          </em>
        </div>
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">After class</p>
          <h2>Homework link</h2>
          <p className="lesson22-section-desc">
            Домашка Lesson 29 —{" "}
            <Link className="lesson22-back-link" to="/hw-29">
              Homework · Lesson 29
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
