import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/lesson22.css";
import "../styles/lesson19.css";

const IMG = (name: string) => `${import.meta.env.BASE_URL}images/${name}`;

const warmUpPrompts = [
  "Як ти себе почуваєш сьогодні?",
  "Де ти зараз? (at home / at work / in the park…)",
  "Скажи 3 речення про себе з am / is / are.",
  "Назви 3 речі в кімнаті з a / an / the.",
];

const toBeDrills = [
  { prompt: "I am a student.", answer: "She is a student." },
  { prompt: "We are at home.", answer: "They are at home." },
  { prompt: "He is from Lviv.", answer: "Are you from Lviv?" },
  { prompt: "I am not tired.", answer: "She is not tired. / She isn't tired." },
  { prompt: "Are they friends?", answer: "Yes, they are. / No, they aren't." },
  { prompt: "My name is Anna.", answer: "Her name is Anna." },
  { prompt: "I am 25 years old.", answer: "He is 25 years old." },
  { prompt: "You are very kind.", answer: "My teacher is very kind." },
];

const articleRules = [
  {
    title: "a",
    text: "Перед словами, що починаються з приголосного звуку: a book, a dog, a university.",
  },
  {
    title: "an",
    text: "Перед словами, що починаються з голосного звуку: an apple, an egg, an hour, an umbrella.",
  },
  {
    title: "the",
    text: "Коли предмет конкретний або вже відомий: the book on the table, the sun, the teacher.",
  },
];

const articleVocab = [
  { en: "a book", ua: "книга (одна, будь-яка)" },
  { en: "an apple", ua: "яблуко" },
  { en: "a teacher", ua: "вчитель" },
  { en: "an umbrella", ua: "парасолька" },
  { en: "the sun", ua: "сонце (конкретне)" },
  { en: "the door", ua: "двері (ті, що тут)" },
  { en: "a car", ua: "автомобіль" },
  { en: "an hour", ua: "година" },
  { en: "the park", ua: "парк (той, про який говоримо)" },
  { en: "a friend", ua: "друг" },
];

const characterSpeakingPrompts = [
  "Emma — ім'я, вік, місто, хобі, pet (4–5 речень з is / has got / a).",
  "Jayden — хто він, звідки, що любить, weekend plan.",
  "Grace — опиши її в 4 реченнях (ballet, kitten, New York…).",
  "Owen — опиши його в 4 реченнях (baseball, parakeet, Dallas…).",
  "Порівняй двох персонажів: Emma is… / Jayden is… (3 речення).",
];

const adjectivesSpeakingPrompts = [
  "Опиши волосся людини з картинки: long / short / curly / straight / red / dark / fair.",
  "Скажи 3 речення: She is tall. / He is short. / He is thin.",
  "Опиши себе: волосся + зріст (2–3 речення з is).",
  "Опиши друга, використавши 4 прикметники з картинки.",
];

const speakingPromptsUa = [
  "Опиши свою кімнату: 5 речень з a / an / the.",
  "Представся: ім'я, вік, місто — 4 речення з to be.",
  "Опиши свого друга: 3 речення з he/she + is.",
  "Що є на столі? 4 короткі речення (a pen, an orange…).",
  "Порівняй: I am… / My brother is… (2 речення).",
];

const speakingPromptsEn = [
  { q: "What is your job?", tag: "to be" },
  { q: "Where are you now?", tag: "to be" },
  { q: "Is your flat big or small?", tag: "to be" },
  { q: "Do you have a car or a bike?", tag: "a / an" },
  { q: "What is the weather like today?", tag: "the" },
  { q: "Are you hungry or thirsty?", tag: "to be" },
];

type ChooseItem = { sentence: string; options: string[]; answer: string };

const toBeChooseItems: ChooseItem[] = [
  { sentence: "I ___ a student.", options: ["am", "is", "are"], answer: "am" },
  { sentence: "She ___ from Kyiv.", options: ["am", "is", "are"], answer: "is" },
  { sentence: "We ___ ready.", options: ["am", "is", "are"], answer: "are" },
  { sentence: "___ you tired?", options: ["Am", "Is", "Are"], answer: "Are" },
  { sentence: "It ___ cold today.", options: ["am", "is", "are"], answer: "is" },
  { sentence: "They ___ my friends.", options: ["am", "is", "are"], answer: "are" },
];

const articleChooseItems: ChooseItem[] = [
  {
    sentence: "I have ___ apple.",
    options: ["a", "an", "the"],
    answer: "an",
  },
  {
    sentence: "She is ___ teacher.",
    options: ["a", "an", "the"],
    answer: "a",
  },
  {
    sentence: "___ sun is bright today.",
    options: ["A", "An", "The"],
    answer: "The",
  },
  {
    sentence: "He needs ___ umbrella.",
    options: ["a", "an", "the"],
    answer: "an",
  },
  {
    sentence: "This is ___ book I told you about.",
    options: ["a", "an", "the"],
    answer: "the",
  },
  {
    sentence: "I live in ___ flat near the park.",
    options: ["a", "an", "the"],
    answer: "a",
  },
  {
    sentence: "It's ___ hour before the lesson.",
    options: ["a", "an", "the"],
    answer: "an",
  },
  {
    sentence: "Open ___ door, please.",
    options: ["a", "an", "the"],
    answer: "the",
  },
];

export default function Lesson23() {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const [drillOpen, setDrillOpen] = useState<number[]>([]);
  const [vocabFlipped, setVocabFlipped] = useState<number[]>([]);
  const [toBeChoose, setToBeChoose] = useState<Record<number, string>>({});
  const [articleChoose, setArticleChoose] = useState<Record<number, string>>({});
  const [showToBeChoose, setShowToBeChoose] = useState(false);
  const [showArticleChoose, setShowArticleChoose] = useState(false);

  const toggleVocab = (idx: number) =>
    setVocabFlipped((p) =>
      p.includes(idx) ? p.filter((x) => x !== idx) : [...p, idx],
    );

  const toggleDrill = (idx: number) =>
    setDrillOpen((p) =>
      p.includes(idx) ? p.filter((x) => x !== idx) : [...p, idx],
    );

  const toBeScore = useMemo(
    () =>
      toBeChooseItems.filter((item, i) => toBeChoose[i] === item.answer).length,
    [toBeChoose],
  );

  const articleScore = useMemo(
    () =>
      articleChooseItems.filter((item, i) => articleChoose[i] === item.answer)
        .length,
    [articleChoose],
  );

  useEffect(() => {
    const cards = pageRef.current?.querySelectorAll(".reveal-on-scroll");
    if (!cards) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12 },
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="lesson22-page" ref={pageRef}>
      <section className="lesson22-hero panel reveal-on-scroll is-visible">
        <div className="lesson22-hero-top">
          <div>
            <p className="page-kicker">Lesson 23</p>
            <h1>To be + Articles + Speaking</h1>
            <p className="lesson22-topic-pill">a / an / the + active to be practice</p>
            <p className="lesson22-subtitle">
              Practise <strong>am / is / are</strong> in speaking and drills, then
              learn <strong>a / an / the</strong> with quick exercises and oral
              description tasks.
            </p>
            <ul className="l22-goals-list">
              <li>автоматизувати to be у питаннях і відповідях;</li>
              <li>розуміти, коли a, an або the;</li>
              <li>говорити про себе, людей і предмети з артиклями.</li>
            </ul>
          </div>
        </div>
        <div className="lesson22-hero-chips">
          <span>I am…</span>
          <span>She is…</span>
          <span>We are…</span>
          <span>a book</span>
          <span>an apple</span>
          <span>the sun</span>
        </div>
      </section>

      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-flow">
          <span>1 Warm-up</span>
          <span>2 To be drill</span>
          <span>3 To be quiz</span>
          <span>4 Articles</span>
          <span>5 Article quiz</span>
          <span>6 Adjectives</span>
          <span>7 Character cards</span>
          <span>8 Speaking</span>
        </div>
        <p className="lesson22-section-desc">
          Послідовність:{" "}
          <strong>говоріння → to be → артиклі → speaking</strong> — спочатку
          форма, потім живі речення.
        </p>
      </section>

      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-section-head">
          <p className="page-kicker">Warm-up</p>
          <h2>To be — quick talk</h2>
          <p className="lesson22-section-desc">
            Відповідай вголос <strong>англійською</strong>. Використай am / is /
            are у повних реченнях.
          </p>
        </div>
        <div className="lesson22-prompt-grid">
          {warmUpPrompts.map((q) => (
            <div key={q} className="lesson22-prompt-card">
              {q}
            </div>
          ))}
        </div>
      </section>

      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-section-head">
          <p className="page-kicker">Active practice</p>
          <h2>To be — transform & respond</h2>
          <p className="lesson22-section-desc">
            Перетвори речення або дай відповідь. Скажи вголос, потім натисни,
            щоб перевірити зразок.
          </p>
        </div>
        <div className="l22-drill-list">
          {toBeDrills.map((item, idx) => (
            <button
              key={item.prompt}
              type="button"
              className={`l22-drill-row ${drillOpen.includes(idx) ? "l22-drill-row--open" : ""}`}
              onClick={() => toggleDrill(idx)}
            >
              <span className="l22-drill-i">{item.prompt}</span>
              <span className="l22-drill-sep">→</span>
              <span className="l22-drill-she">
                {drillOpen.includes(idx) ? item.answer : "tap after you say it"}
              </span>
            </button>
          ))}
        </div>

        <h3 style={{ marginTop: "1.5rem", fontSize: "1rem" }}>
          To be — choose am / is / are
        </h3>
        <div className="lesson19-choose-list">
          {toBeChooseItems.map((item, index) => {
            const selected = toBeChoose[index];
            const isCorrect = selected === item.answer;
            return (
              <article className="lesson19-choose-card" key={item.sentence}>
                <p className="lesson19-choose-sentence">{item.sentence}</p>
                <div className="lesson19-choice-row">
                  {item.options.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      className={`choice-btn ${selected === opt ? "selected" : ""}`}
                      onClick={() =>
                        setToBeChoose((p) => ({ ...p, [index]: opt }))
                      }
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {showToBeChoose && (
                  <div
                    className={`lesson19-answer ${isCorrect ? "ok" : "bad"}`}
                  >
                    Correct: <strong>{item.answer}</strong>
                  </div>
                )}
              </article>
            );
          })}
        </div>
        <button
          type="button"
          className="l22-btn"
          style={{ marginTop: "0.75rem" }}
          onClick={() => setShowToBeChoose(true)}
        >
          Check to be answers
        </button>
        {showToBeChoose && (
          <p className="l22-score">
            Score: {toBeScore} / {toBeChooseItems.length}
          </p>
        )}
      </section>

      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-section-head">
          <p className="page-kicker">New topic</p>
          <h2>Articles — a / an / the</h2>
          <p className="lesson22-section-desc">
            Короткі правила нижче. Потім — картки з прикладами і вправи на
            вибір.
          </p>
        </div>

        <div className="l22-can-rules">
          {articleRules.map((rule) => (
            <div className="l22-can-rule" key={rule.title}>
              <h4>{rule.title}</h4>
              <p>{rule.text}</p>
            </div>
          ))}
        </div>

        <h3 style={{ fontSize: "1rem", margin: "1.5rem 0 0.75rem" }}>
          Examples — flashcards
        </h3>
        <div className="l22-vocab-grid">
          {articleVocab.map((card, idx) => {
            const flipped = vocabFlipped.includes(idx);
            return (
              <button
                key={card.en}
                type="button"
                className={`l22-vocab-card ${flipped ? "l22-vocab-card--flipped" : ""}`}
                onClick={() => toggleVocab(idx)}
                aria-pressed={flipped}
              >
                <div className="l22-vocab-inner">
                  <div className="l22-vocab-face l22-vocab-front">
                    <span className="l22-vocab-label">Українська</span>
                    <strong>{card.ua}</strong>
                    <span className="l22-vocab-hint">tap to flip</span>
                  </div>
                  <div className="l22-vocab-face l22-vocab-back">
                    <span className="l22-vocab-label">English</span>
                    <strong>{card.en}</strong>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <h3 style={{ marginTop: "1.5rem", fontSize: "1rem" }}>
          Articles — choose a / an / the
        </h3>
        <div className="lesson19-choose-list">
          {articleChooseItems.map((item, index) => {
            const selected = articleChoose[index];
            const isCorrect = selected === item.answer;
            return (
              <article className="lesson19-choose-card" key={item.sentence}>
                <p className="lesson19-choose-sentence">{item.sentence}</p>
                <div className="lesson19-choice-row">
                  {item.options.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      className={`choice-btn ${selected === opt ? "selected" : ""}`}
                      onClick={() =>
                        setArticleChoose((p) => ({ ...p, [index]: opt }))
                      }
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {showArticleChoose && (
                  <div
                    className={`lesson19-answer ${isCorrect ? "ok" : "bad"}`}
                  >
                    Correct: <strong>{item.answer}</strong>
                  </div>
                )}
              </article>
            );
          })}
        </div>
        <button
          type="button"
          className="l22-btn"
          style={{ marginTop: "0.75rem" }}
          onClick={() => setShowArticleChoose(true)}
        >
          Check article answers
        </button>
        {showArticleChoose && (
          <p className="l22-score">
            Score: {articleScore} / {articleChooseItems.length}
          </p>
        )}
      </section>

      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-section-head">
          <p className="page-kicker">Vocabulary</p>
          <h2>Describing people — adjectives</h2>
          <p className="lesson22-section-desc">
            Подивись на картинку з прикметниками. Прочитай слова вголос і
            склади речення з <strong>is / has got</strong>: She is tall. / He has
            got curly hair.
          </p>
        </div>

        <figure className="l22-picture-wrap">
          <img
            src={IMG("describing-people-adjectives.png")}
            alt="Describing people adjectives — long, short, curly, tall, thin, glasses"
            loading="lazy"
          />
          <figcaption>
            long, short, curly, straight, tall, thin, glasses… — використай у
            speaking.
          </figcaption>
        </figure>

        <div className="lesson22-prompt-grid">
          {adjectivesSpeakingPrompts.map((q) => (
            <div
              key={q}
              className="lesson22-prompt-card lesson22-prompt-card--task"
            >
              {q}
            </div>
          ))}
        </div>
      </section>

      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-section-head">
          <p className="page-kicker">Speaking</p>
          <h2>Character speaking cards</h2>
          <p className="lesson22-section-desc">
            Подивись на картки Emma, Jayden, Grace і Owen. Розкажи про кожного
            вголос <strong>англійською</strong> — to be, a / an / the, has got.
          </p>
        </div>

        <figure className="l22-picture-wrap">
          <img
            src={IMG("character-speaking-cards.png")}
            alt="Character speaking cards — Emma, Jayden, Grace, Owen"
            loading="lazy"
          />
          <figcaption>
            Emma, Jayden, Grace, Owen — опиши кожного в 4–5 реченнях.
          </figcaption>
        </figure>

        <div className="lesson22-prompt-grid">
          {characterSpeakingPrompts.map((q) => (
            <div
              key={q}
              className="lesson22-prompt-card lesson22-prompt-card--task"
            >
              {q}
            </div>
          ))}
        </div>
      </section>

      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-section-head">
          <p className="page-kicker">Speaking</p>
          <h2>To be + articles out loud</h2>
          <p className="lesson22-section-desc">
            Відповідай українськими підказками англійською. У реченнях
            обов'язково to be або a / an / the.
          </p>
        </div>
        <div className="lesson22-prompt-grid">
          {speakingPromptsUa.map((q) => (
            <div
              key={q}
              className="lesson22-prompt-card lesson22-prompt-card--task"
            >
              {q}
            </div>
          ))}
        </div>
      </section>

      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-section-head">
          <p className="page-kicker">Speaking</p>
          <h2>Question practice</h2>
          <p className="lesson22-section-desc">
            Відповідай на кожне питання вголос. Зверни увагу на мітку — to be
            або артикль.
          </p>
        </div>
        <div className="l22-self-grid">
          {speakingPromptsEn.map((item) => (
            <div key={item.q} className="l22-self-card">
              <strong>{item.q}</strong>
              <span>{item.tag}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-section-head">
          <p className="page-kicker">Homework</p>
          <h2>After class</h2>
          <p className="lesson22-section-desc">
            Напиши 6 речень про свій день з to be і 6 речень про речі вдома з
            a / an / the.
          </p>
        </div>
        <Link className="lesson22-back-link" to="/homework">
          Homework page
        </Link>
      </section>
    </div>
  );
}
