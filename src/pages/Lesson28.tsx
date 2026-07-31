import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
import "../styles/lesson28.css";

const IMG = (file: string) =>
  `${import.meta.env.BASE_URL}images/lesson28/${file}`;

/** ELLLO A1-06 · Present Simple third person — bridge before Part 2 */
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

type SpeakingTopic = {
  id: number;
  title: string;
  hint: string;
  questions: string[];
};

/** Everyday activity verbs (poster support for Part 1 speaking) */
const dailyVerbs = [
  { en: "have breakfast", ua: "снідати" },
  { en: "go / walk", ua: "йти" },
  { en: "play", ua: "грати" },
  { en: "write", ua: "писати" },
  { en: "read", ua: "читати" },
  { en: "sleep", ua: "спати" },
  { en: "work", ua: "працювати" },
  { en: "cook", ua: "готувати" },
  { en: "draw", ua: "малювати" },
  { en: "ride / go by bike", ua: "їхати" },
] as const;

const speakingTopics: SpeakingTopic[] = [
  {
    id: 1,
    title: "Personal information",
    hint: "Початок будь-якого speaking",
    questions: [
      "What's your name?",
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
      "What is your pet's name?",
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
      "What don't you like?",
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

const askBackExamples = [
  {
    cue: "My name's Natalie.",
    ask: "What's your name?",
  },
  {
    cue: "I'm from Ukraine.",
    ask: "Where are you from?",
  },
  {
    cue: "I live in Kyiv.",
    ask: "What city do you live in?",
  },
  {
    cue: "I'm a teacher.",
    ask: "What do you do? / What's your job?",
  },
  {
    cue: "I have a sister.",
    ask: "Do you have a sister? / Who is in your family?",
  },
  {
    cue: "I get up at seven.",
    ask: "What time do you get up?",
  },
  {
    cue: "I have a friend. Her name's Tracy.",
    ask: "Do you have a friend? / What's her name?",
  },
  {
    cue: "She lives in Scotland, but she isn't Scottish.",
    ask: "Where does she live? / Is she Scottish?",
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

export default function Lesson28() {
  const [revealedAsk, setRevealedAsk] = useState<Set<number>>(() => new Set());
  const [revealedVerbs, setRevealedVerbs] = useState<Set<number>>(
    () => new Set(),
  );
  const [videoAns, setVideoAns] = useState<Record<number, string>>({});
  const [videoChecked, setVideoChecked] = useState(false);
  const [videoGramAns, setVideoGramAns] = useState<Record<number, string>>({});
  const [videoGramChecked, setVideoGramChecked] = useState(false);

  const toggleAsk = (index: number) => {
    setRevealedAsk((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const toggleVerb = (index: number) => {
    setRevealedVerbs((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const videoScore = videoQuiz.filter((q) => videoAns[q.id] === q.answer)
    .length;
  const videoGramScore = videoGrammarQuiz.filter(
    (q) => videoGramAns[q.id] === q.answer,
  ).length;

  return (
    <div className="lesson22-page lesson28-page">
      <section className="lesson22-hero panel">
        <div className="lesson22-hero-top">
          <div>
            <p className="page-kicker">Lesson 28</p>
            <h1>Speaking · he/she/it</h1>
            <p className="lesson22-topic-pill">
              Present Simple he / she / it · ask back · tell your story
            </p>
            <p className="lesson22-subtitle">
              Speaking: ask back — слухай речення → став питання. Tell your
              story — 4–8 речень на обрану тему. Video bridge ELLLO A1-06 —
              listening quiz + grammar drill he / she / it + does / doesn't.
            </p>
            <div className="chips" style={{ marginTop: "0.75rem" }}>
              <span className="chip">Speaking</span>
              <span className="chip">he / she / it</span>
              <span className="chip">does / doesn't</span>
              <span className="chip">Video quiz</span>
            </div>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <Link className="lesson22-back-link" to="/hw-28">
              Homework → Lesson 28
            </Link>
            <Link className="lesson22-back-link" to="/lessons">
              ← Back to lessons
            </Link>
          </div>
        </div>
      </section>

      <section id="l28-ask-back" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">1 · Ask the question</p>
          <h2>Listen → ask</h2>
          <p className="lesson22-section-desc">
            Вчитель розповідає про себе короткими реченнями. Учень не повторює
            інформацію — він ставить <strong>відповідне питання</strong>.
            Наприклад: вчитель каже <em>My name's Natalie</em> → учень питає
            як її звати. Правильне питання відкрий лише після спроби —
            натисни на картку.
          </p>
        </div>

        <div className="l28-ask-examples">
          {askBackExamples.map((ex, index) => {
            const open = revealedAsk.has(index);
            return (
              <button
                key={ex.cue}
                type="button"
                className={`l28-ask-example${open ? " is-open" : ""}`}
                onClick={() => toggleAsk(index)}
                aria-expanded={open}
              >
                <p className="l28-ask-cue">
                  <span className="l28-ask-tag">Teacher</span>
                  {ex.cue}
                </p>
                <p className="l28-ask-ask">
                  <span className="l28-ask-tag l28-ask-tag--you">You ask</span>
                  {open ? (
                    <span>{ex.ask}</span>
                  ) : (
                    <span className="l28-ask-hidden">натисни, щоб відкрити</span>
                  )}
                </p>
              </button>
            );
          })}
        </div>

        <div className="l28-task-note">
          <strong>Task:</strong> Слухай живі речення від вчителя (про ім'я,
          сім'ю, роботу, рутину, хобі…). Після кожного речення постав одне
          правильне питання. Потім поміняйтесь ролями, якщо працюєте в парі.
        </div>
      </section>

      <section id="l28-speaking" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">2 · Speak about yourself</p>
          <h2>Tell your story</h2>
          <p className="lesson22-section-desc">
            Обери тему нижче. Питання — лише підказки / опори. Не відповідай
            коротко «як на інтерв'ю».{" "}
            <strong>
              Розповідай про себе широко: 4–8 зв'язних речень
            </strong>
            , ніби ти знайомишся з новою людиною. Додавай деталі, причини,
            приклади з життя.
          </p>
        </div>

        <div className="l28-task-note">
          <strong>How to speak:</strong> візьми 2–3 питання з блоку і зроби з
          них одну маленьку історію про себе. Наприклад, замість{" "}
          <em>Yes. / I'm a student.</em> скажи:{" "}
          <em>
            I'm a student. I study English every day, and in the evening I
            usually watch videos or meet my friends.
          </em>
        </div>

        <div className="l28-speak-grid">
          <article className="l28-speak-card l28-speak-card--poster">
            <img
              className="l28-about-me-img"
              src={IMG("all-about-me.jpg")}
              alt="All about me worksheet: name, age, likes, favorites, fun fact"
              width={722}
              height={1024}
              loading="lazy"
            />
          </article>

          {speakingTopics.map((topic) => {
            const head = (
              <header className="l28-speak-card-head">
                <span className="l28-speak-num">{topic.id}</span>
                <div>
                  <h3 className="l28-speak-title">{topic.title}</h3>
                  <p className="l28-speak-hint">{topic.hint}</p>
                </div>
              </header>
            );
            const list = (
              <ol className="l28-speak-list">
                {topic.questions.map((q) => (
                  <li key={q}>{q}</li>
                ))}
              </ol>
            );

            if (topic.id === 1) {
              return (
                <article key={topic.id} className="l28-speak-card">
                  {head}
                  {list}
                </article>
              );
            }

            return (
              <details
                key={topic.id}
                className="l28-speak-card l28-speak-card--collapsible"
              >
                <summary className="l28-speak-summary">
                  {head}
                  <span className="l28-speak-chevron" aria-hidden="true">
                    ▾
                  </span>
                </summary>
                {list}
              </details>
            );
          })}
        </div>
      </section>

      <section id="l28-daily-verbs" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Part 1 · Speaking · Verbs</p>
          <h2>Everyday activities</h2>
          <p className="lesson22-section-desc">
            Подивись на картинки. Це опори для теми{" "}
            <strong>Daily routines</strong> і{" "}
            <strong>Free time and hobbies</strong>. Під постером спочатку видно
            українське слово — натисни, щоб відкрити англійське. Потім обери
            4–6 дій і розкажи про свій день:{" "}
            <em>In the morning I have breakfast… Then I go to work…</em>
          </p>
        </div>

        <figure className="l28-poster l28-poster--wide">
          <img
            src={IMG("daily-verbs.png")}
            alt="Everyday activities: have breakfast, go, play, write, read, sleep, work, cook, draw, ride a bike"
            className="l28-poster-img l28-poster-img--wide"
            width={1024}
            height={559}
            loading="lazy"
            decoding="async"
          />
        </figure>

        <div className="l28-verb-bank" aria-label="Verb bank">
          {dailyVerbs.map((v, index) => {
            const open = revealedVerbs.has(index);
            return (
              <button
                key={v.ua}
                type="button"
                className={`l28-verb-chip${open ? " is-open" : ""}`}
                onClick={() => toggleVerb(index)}
                aria-expanded={open}
              >
                <strong className="l28-verb-ua">{v.ua}</strong>
                {open ? (
                  <span className="l28-verb-en">{v.en}</span>
                ) : (
                  <span className="l28-verb-hint">натисни, щоб відкрити</span>
                )}
              </button>
            );
          })}
        </div>

        <div className="l28-task-note">
          <strong>Speak:</strong> не називай лише слова — зроби маленьку
          історію. Наприклад:{" "}
          <em>
            I usually have breakfast at home. After that I go to work. In the
            evening I cook dinner and then I read or sleep.
          </em>
        </div>
      </section>

      {/* ── Video bridge · Present Simple he/she/it ── */}
      <section id="l28-video" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Video · Present Simple · he / she / it</p>
          <h2>Listening quiz · third person singular</h2>
          <p className="lesson22-section-desc">
            Подивись відео (ELLLO A1-06). Послухай короткі діалоги з{" "}
            <strong>he / she / it + -s</strong>. Потім виконай listening quiz і
            grammar check — місток до Part 2 (everyday things).
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

        <h3 className="l22-listen-subtitle">1 · Listening quiz</h3>
        <p className="lesson22-section-desc">
          Обери правильну відповідь за відео.
        </p>
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
                className={drillSelClass(
                  videoChecked,
                  videoAns[q.id] ?? "",
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
            onClick={() => setVideoChecked(true)}
          >
            Check
          </button>
          {videoChecked && (
            <span className="l22-score">
              {videoScore} / {videoQuiz.length}
            </span>
          )}
        </div>

        <h3 className="l22-listen-subtitle">2 · Grammar · third person</h3>
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
                className={drillSelClass(
                  videoGramChecked,
                  videoGramAns[q.id] ?? "",
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
            onClick={() => setVideoGramChecked(true)}
          >
            Check
          </button>
          {videoGramChecked && (
            <span className="l22-score">
              {videoGramScore} / {videoGrammarQuiz.length}
            </span>
          )}
        </div>

        <h3 className="l22-listen-subtitle">3 · Speak</h3>
        <p className="lesson22-section-desc">
          Відповідай уголос. Використай <em>he / she + -s</em> і{" "}
          <em>does / doesn't</em>.
        </p>
        <div className="lesson22-prompt-grid">
          {videoSpeakPrompts.map((q) => (
            <div
              key={q}
              className="lesson22-prompt-card lesson22-prompt-card--task"
            >
              {q}
            </div>
          ))}
        </div>

        <details className="l25-details" style={{ marginTop: "1rem" }}>
          <summary className="l25-details-toggle">📄 Sample ideas from the video</summary>
          <div className="l25-details-body">
            <p>
              <strong>Mom:</strong> She sells women's clothing. She has a small
              shop in the mall.
            </p>
            <p>
              <strong>Brother:</strong> He studies engineering. He has a small
              apartment. He doesn't have much free time.
            </p>
            <p>
              <strong>Daughter:</strong> Grandma watches her. She walks there
              after school.
            </p>
            <p>
              <strong>Movie:</strong> It starts in about ten minutes. Brad Pitt
              plays a policeman.
            </p>
          </div>
        </details>

        <p className="l25-cr-hint" style={{ marginTop: "0.85rem" }}>
          Source:{" "}
          <a
            href={`https://youtu.be/${VIDEO_ID}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            ELLLO · Beginner Listening Quiz #6 ↗
          </a>
        </p>
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">After class</p>
          <h2>Homework link</h2>
          <p className="lesson22-section-desc">
            Домашка Lesson 28 —{" "}
            <Link className="lesson22-back-link" to="/hw-28">
              Homework · Lesson 28
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
