import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
import "../styles/lesson28.css";

const IMG = (file: string) =>
  `${import.meta.env.BASE_URL}images/lesson28/${file}`;

type SpeakingTopic = {
  id: number;
  title: string;
  hint: string;
  questions: string[];
};

/** Word bank a–l (from the Student's Book matching task) */
const objectBank = [
  { letter: "a", en: "a book", file: "book.jpg" },
  { letter: "b", en: "a phone", file: "phone.jpg" },
  { letter: "c", en: "a desk", file: "desk.jpg" },
  { letter: "d", en: "a key", file: "key.jpg" },
  { letter: "e", en: "a table", file: "table.jpg" },
  { letter: "f", en: "a clock", file: "clock.jpg" },
  { letter: "g", en: "a photo", file: "photo.jpg" },
  { letter: "h", en: "a computer", file: "computer.jpg" },
  { letter: "i", en: "a box", file: "box.jpg" },
  { letter: "j", en: "a chair", file: "chair.jpg" },
  { letter: "k", en: "a cup", file: "cup.jpg" },
  { letter: "l", en: "a pen", file: "pen.jpg" },
] as const;

/** Pictures 1–12 (shuffled order for matching) */
const objectPictures = [
  { num: 1, letter: "j" },
  { num: 2, letter: "a" },
  { num: 3, letter: "h" },
  { num: 4, letter: "k" },
  { num: 5, letter: "d" },
  { num: 6, letter: "f" },
  { num: 7, letter: "e" },
  { num: 8, letter: "l" },
  { num: 9, letter: "b" },
  { num: 10, letter: "i" },
  { num: 11, letter: "g" },
  { num: 12, letter: "c" },
] as const;

const bankByLetter = Object.fromEntries(
  objectBank.map((item) => [item.letter, item]),
);

/** Close-up mystery photos 1–8 (What’s number…?) */
const closeupPhotos = [
  { num: 1, en: "a pen", file: "closeups/1-pen.jpg" },
  { num: 2, en: "a clock", file: "closeups/2-clock.jpg" },
  { num: 3, en: "a bench", file: "closeups/3-bench.jpg" },
  { num: 4, en: "a book", file: "closeups/4-book.jpg" },
  { num: 5, en: "coffee", file: "closeups/5-coffee.jpg" },
  { num: 6, en: "a key", file: "closeups/6-key.jpg" },
  { num: 7, en: "a box", file: "closeups/7-box.jpg" },
  { num: 8, en: "a phone", file: "closeups/8-phone.jpg" },
] as const;

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
  {
    id: 12,
    title: "Future / plans",
    hint: "Трохи advanced speaking",
    questions: [
      "What are your plans for this week?",
      "What are you doing tonight?",
      "What are you doing this weekend?",
      "Are you meeting anyone?",
      "Are you going anywhere?",
      "Do you want to travel soon?",
      "What place do you want to visit next?",
      "What are you going to do after the lesson?",
      "Do you have any goals for this month?",
      "What do you want to learn next?",
    ],
  },
];

const askBackExamples = [
  {
    cue: "My name’s Natalie.",
    ask: "What’s your name?",
  },
  {
    cue: "I’m from Ukraine.",
    ask: "Where are you from?",
  },
  {
    cue: "I live in Kyiv.",
    ask: "What city do you live in?",
  },
  {
    cue: "I’m a teacher.",
    ask: "What do you do? / What’s your job?",
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
    cue: "I have a friend. Her name’s Tracy.",
    ask: "Do you have a friend? / What’s her name?",
  },
  {
    cue: "She lives in Scotland, but she isn’t Scottish.",
    ask: "Where does she live? / Is she Scottish?",
  },
];

export default function Lesson28() {
  const [revealedAsk, setRevealedAsk] = useState<Set<number>>(() => new Set());
  const [photoAns, setPhotoAns] = useState<string[]>(() =>
    Array(objectPictures.length).fill(""),
  );
  const [photoChecked, setPhotoChecked] = useState(false);

  const toggleAsk = (index: number) => {
    setRevealedAsk((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const photoScore = photoAns.filter(
    (v, i) => v === objectPictures[i].letter,
  ).length;

  return (
    <div className="lesson22-page lesson28-page">
      <section className="lesson22-hero panel">
        <div className="lesson22-hero-top">
          <div>
            <p className="page-kicker">Lesson 28</p>
            <h1>Shopping 2: clothes</h1>
            <p className="lesson22-topic-pill">
              Can I have…? · size · price · try on
            </p>
            <p className="lesson22-subtitle">
              Part 1 — speaking (ask back + tell your story). Part 2 —
              vocabulary: match pictures with words.
            </p>
            <div className="chips" style={{ marginTop: "0.75rem" }}>
              <span className="chip">Speaking</span>
              <span className="chip">Vocabulary</span>
              <span className="chip">Things</span>
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
            Наприклад: вчитель каже <em>My name’s Natalie</em> → учень питає
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
          <strong>Task:</strong> Слухай живі речення від вчителя (про ім’я,
          сім’ю, роботу, рутину, хобі…). Після кожного речення постав одне
          правильне питання. Потім поміняйтесь ролями, якщо працюєте в парі.
        </div>
      </section>

      <section id="l28-speaking" className="lesson22-block panel">
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

      <section id="l28-things-photos" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Part 2 · Vocabulary · 1</p>
          <h2>Match 1–12 in the pictures with a–l</h2>
          <p className="lesson22-section-desc">
            Подивись на картинки. Обери літеру <strong>a–l</strong> під кожним
            фото. Слова — у банку нижче.
          </p>
        </div>

        <div className="l28-word-bank" aria-label="Word bank a–l">
          {objectBank.map((item) => (
            <span key={item.letter} className="l28-word-bank-item">
              <strong>{item.letter}</strong> {item.en}
            </span>
          ))}
        </div>

        <div className="l28-match-grid">
          {objectPictures.map((pic, i) => {
            const item = bankByLetter[pic.letter];
            const v = photoAns[i];
            const ok = v === pic.letter;
            return (
              <div key={pic.num} className="l28-match-card">
                <span className="l28-match-num">{pic.num}</span>
                <div className="l28-match-frame">
                  <img
                    className="l28-match-img"
                    src={IMG(item.file)}
                    alt={`Picture ${pic.num}`}
                    loading="lazy"
                  />
                </div>
                <select
                  value={v}
                  onChange={(e) => {
                    setPhotoChecked(false);
                    setPhotoAns((prev) => {
                      const next = [...prev];
                      next[i] = e.target.value;
                      return next;
                    });
                  }}
                  className={`l28-match-sel${
                    photoChecked
                      ? ok
                        ? " l25-cr-sel--ok"
                        : v
                          ? " l25-cr-sel--err"
                          : ""
                      : ""
                  }`}
                  aria-label={`Letter for picture ${pic.num}`}
                >
                  <option value="">select…</option>
                  {objectBank.map((b) => (
                    <option key={b.letter} value={b.letter}>
                      {b.letter}
                    </option>
                  ))}
                </select>
              </div>
            );
          })}
        </div>

        <div className="l25-cr-actions" style={{ marginTop: "1rem" }}>
          <button
            className="l22-check-btn"
            onClick={() => setPhotoChecked(true)}
          >
            Check answers
          </button>
          <button
            className="btn secondary"
            type="button"
            onClick={() => {
              setPhotoAns(Array(objectPictures.length).fill(""));
              setPhotoChecked(false);
            }}
          >
            Reset
          </button>
          {photoChecked && (
            <span className="l22-score">
              {photoScore} / {objectPictures.length}
            </span>
          )}
        </div>
      </section>

      <section id="l28-things-scene" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Part 2 · Vocabulary · 2</p>
          <h2>What’s number…?</h2>
          <p className="lesson22-section-desc">
            Подивись на картинку. Питай про номери:{" "}
            <strong>A:</strong> <em>What’s number 1?</em> — відповідь:{" "}
            <em>It’s a clock.</em>
          </p>
        </div>

        <figure className="l28-scene">
          <img
            src={IMG("things-scene.png")}
            alt="Office meeting room with numbered things: clock, chair, table, pen, cup, phone"
            className="l28-scene-img"
            loading="lazy"
          />
        </figure>
      </section>

      <section id="l28-closeups" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Part 2 · Vocabulary · 3</p>
          <h2>What’s number…? · close-ups</h2>
          <p className="lesson22-section-desc">
            Подивись на макро-фото. Питай і відповідай:{" "}
            <strong>A:</strong> <em>What’s number 1?</em>{" "}
            <strong>B:</strong> <em>It’s a pen.</em>
          </p>
        </div>

        <div className="l28-closeup-grid">
          {closeupPhotos.map((item) => (
            <figure key={item.num} className="l28-closeup-card">
              <span className="l28-closeup-num">{item.num}</span>
              <img
                src={IMG(item.file)}
                alt={`Close-up ${item.num}`}
                className="l28-closeup-img"
                loading="lazy"
              />
            </figure>
          ))}
        </div>
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
