import { useEffect, useMemo, useRef, useState, type Dispatch, type SetStateAction } from "react";
import { Link } from "react-router-dom";
import "../styles/lesson22.css";
import "../styles/lesson19.css";

const IMG = (name: string) => `${import.meta.env.BASE_URL}images/${name}`;

const YOUTUBE_VIDEO_ID = "zLInXXh3Tbw";

const warmUpPrompts = [
  "Як ти себе почуваєш сьогодні?",
  "Де ти зараз? (at home / at work / in the park…)",
  "Скажи 3 речення про себе з am / is / are.",
  "Склади 2 Yes/No питання: Are you…? / Is your…?",
];

const toBeQuestionCards = ["Хто? Що?", "Який?", "Де?", "Коли?"];

const listeningSpeakingPrompts = [
  "Перекажи Conversation 1: чи жарко в машині? (Yes, I am very hot.)",
  "Скажи 2 Yes/No питання з is / are про свій дім (Is your flat big?)",
  "Відповідь вголос: Are you hungry? → Yes, I am. / No, I'm not.",
  "Склади 3 short answers: Yes, it is. / No, they aren't. / Yes, please.",
];

const adjectivesSpeakingPrompts = [
  "Опиши волосся людини з картинки: long / short / curly / straight / red / dark / fair.",
  "Скажи 3 речення: She is tall. / He is short. / He is thin.",
  "Опиши себе: волосся + зріст (2–3 речення з is).",
  "Опиши друга, використавши 4 прикметники з картинки.",
];

const emotionsVocab = [
  { en: "happy", ua: "щасливий" },
  { en: "sad", ua: "сумний" },
  { en: "tired", ua: "втомлений" },
  { en: "scared", ua: "наляканий" },
  { en: "angry", ua: "злий" },
  { en: "nervous", ua: "знервований" },
  { en: "shy", ua: "сором'язливий" },
  { en: "excited", ua: "схвильований (в хорошому сенсі)" },
  { en: "bored", ua: "нудьгуючий" },
];

const oppositesVocab = [
  { en: "small — big", ua: "маленький — великий" },
  { en: "short — tall", ua: "низький — високий" },
  { en: "low — high", ua: "низько — високо" },
  { en: "day — night", ua: "день — ніч" },
  { en: "fast — slow", ua: "швидкий — повільний" },
  { en: "sad — happy", ua: "сумний — щасливий" },
  { en: "young — old", ua: "молодий — старий" },
  { en: "full — empty", ua: "повний — порожній" },
  { en: "dirty — clean", ua: "брудний — чистий" },
  { en: "light — heavy", ua: "легкий — важкий" },
  { en: "noisy — quiet", ua: "гучний — тихий" },
  { en: "dry — wet", ua: "сухий — мокрий" },
  { en: "thin — fat", ua: "худий — повний" },
  { en: "inside — outside", ua: "всередині — зовні" },
  { en: "tidy — untidy", ua: "охайний — неохайний" },
];

const characterSpeakingPrompts = [
  "Emma — ім'я, вік, місто, хобі, pet (4–5 речень з is / has got / a).",
  "Jayden — хто він, звідки, що любить, weekend plan.",
  "Grace — опиши її в 4 реченнях (ballet, kitten, New York…).",
  "Owen — опиши його в 4 реченнях (baseball, parakeet, Dallas…).",
  "Порівняй двох персонажів: Emma is… / Jayden is… (3 речення).",
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
  { en: "an orange", ua: "апельсин" },
  { en: "a dog", ua: "собака" },
  { en: "the moon", ua: "місяць (конкретний)" },
  { en: "an egg", ua: "яйце" },
  { en: "a university", ua: "університет (звук [j])" },
  { en: "the table", ua: "стіл (той, що тут)" },
  { en: "an ice cream", ua: "морозиво" },
  { en: "the garden", ua: "сад (конкретний)" },
];

const articleSpeakingPrompts = [
  "Опиши свою кімнату: 5 речень з a / an / the.",
  "Що є на столі? 4 короткі речення (a pen, an orange…).",
  "Назви 3 речі вдома з the (the window, the kitchen…).",
];

const articleInfographics = [
  {
    file: "articles-a-an.jpg",
    width: 682,
    height: 1024,
    alt: "a / an — indefinite articles with examples",
    caption:
      "a — приголосний звук: a cat, a book, a pen. an — голосний звук: an apple, an egg, an umbrella.",
  },
  {
    file: "articles-a-an-the.jpg",
    width: 731,
    height: 1024,
    alt: "Articles A, An, The — rules and examples",
    caption:
      "a — один із багатьох (consonant sound). an — голосний звук. the — конкретна річ (the sun, the book on the table).",
  },
  {
    file: "articles-a-an-the-examples.jpg",
    width: 688,
    height: 1024,
    alt: "Articles — more examples with pictures",
    caption:
      "a / an — будь-який один. the — особливий, уже відомий. Більше прикладів: a cat, an umbrella, the moon.",
  },
] as const;

type ChooseItem = { sentence: string; options: string[]; answer: string };

const listeningQuizItems: ChooseItem[] = [
  {
    sentence: "Conversation 1 — In the car. Are they hot or cold?",
    options: ["hot", "cold"],
    answer: "hot",
  },
  {
    sentence: "Conversation 2 — Her house. Is her house new or old?",
    options: ["new", "old"],
    answer: "old",
  },
  {
    sentence:
      "Conversation 3 — In the gym. Are her new shoes cheap or expensive?",
    options: ["cheap", "expensive"],
    answer: "cheap",
  },
  {
    sentence: "Conversation 4 — Pizza shop. Is the pizza shop open or closed?",
    options: ["open", "closed"],
    answer: "open",
  },
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

function VocabFlashcards({
  cards,
  flipped,
  onToggle,
}: {
  cards: { en: string; ua: string }[];
  flipped: number[];
  onToggle: (idx: number) => void;
}) {
  return (
    <div className="l22-vocab-grid">
      {cards.map((card, idx) => {
        const isFlipped = flipped.includes(idx);
        return (
          <button
            key={card.en}
            type="button"
            className={`l22-vocab-card ${isFlipped ? "l22-vocab-card--flipped" : ""}`}
            onClick={() => onToggle(idx)}
            aria-pressed={isFlipped}
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
  );
}

export default function Lesson23() {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const [toBeQuestionsFlipped, setToBeQuestionsFlipped] = useState<number[]>([]);
  const [emotionsFlipped, setEmotionsFlipped] = useState<number[]>([]);
  const [oppositesFlipped, setOppositesFlipped] = useState<number[]>([]);
  const [articleFlipped, setArticleFlipped] = useState<number[]>([]);
  const [articleChoose, setArticleChoose] = useState<Record<number, string>>({});
  const [listenChoose, setListenChoose] = useState<Record<number, string>>({});
  const [showArticleChoose, setShowArticleChoose] = useState(false);
  const [showListenChoose, setShowListenChoose] = useState(false);

  const toggleFlipped =
    (setter: Dispatch<SetStateAction<number[]>>) => (idx: number) =>
      setter((p) =>
        p.includes(idx) ? p.filter((x) => x !== idx) : [...p, idx],
      );

  const articleScore = useMemo(
    () =>
      articleChooseItems.filter((item, i) => articleChoose[i] === item.answer)
        .length,
    [articleChoose],
  );

  const listenScore = useMemo(
    () =>
      listeningQuizItems.filter((item, i) => listenChoose[i] === item.answer)
        .length,
    [listenChoose],
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
            <p className="lesson22-topic-pill">am / is / are → a / an / the</p>
            <p className="lesson22-subtitle">
              Перша половина — <strong>to be</strong> у говорінні та listening.
              Друга — <strong>a / an / the</strong> з правилом, картками та
              вправами.
            </p>
            <ul className="l22-goals-list">
              <li>автоматизувати to be у питаннях і відповідях;</li>
              <li>розуміти, коли a, an або the;</li>
              <li>говорити про людей і предмети з is / are та артиклями.</li>
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
          <span>2 am / is / are</span>
          <span>3 Listening</span>
          <span>4 Adjectives</span>
          <span>5 Emotions</span>
          <span>6 Opposites</span>
          <span>7 Character cards</span>
          <span>8 Articles</span>
        </div>
        <p className="lesson22-section-desc">
          Перша половина — <strong>to be</strong>. Друга — після character
          cards — <strong>артиклі</strong>.
        </p>
      </section>

      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-section-head">
          <p className="page-kicker">Part 1 — To be</p>
          <h2>Warm-up — quick talk</h2>
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
          <p className="page-kicker">Part 1 — To be</p>
          <h2>am / is / are</h2>
          <p className="lesson22-section-desc">На які питання відповідають.</p>
        </div>

        <div className="l22-vocab-grid l23-tobe-questions-grid">
          {toBeQuestionCards.map((question, idx) => {
            const isFlipped = toBeQuestionsFlipped.includes(idx);
            return (
              <button
                key={question}
                type="button"
                className={`l22-vocab-card l23-tobe-question-card ${isFlipped ? "l22-vocab-card--flipped" : ""}`}
                onClick={() => toggleFlipped(setToBeQuestionsFlipped)(idx)}
                aria-pressed={isFlipped}
              >
                <div className="l22-vocab-inner">
                  <div className="l22-vocab-face l22-vocab-front l23-tobe-question-front">
                    <span className="l23-tobe-question-mark" aria-hidden="true">
                      ?
                    </span>
                    <span className="l22-vocab-hint">tap to flip</span>
                  </div>
                  <div className="l22-vocab-face l22-vocab-back l23-tobe-question-back">
                    <strong>{question}</strong>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-section-head">
          <p className="page-kicker">Listening</p>
          <h2>Yes/No questions with be verbs</h2>
          <p className="lesson22-section-desc">
            Прослухай 4 короткі діалоги. Після кожного — обери правильну
            відповідь. Потім скажи short answers вголос:{" "}
            <strong>Yes, I am. / No, it isn't.</strong>
          </p>
        </div>

        <div className="l22-video-wrap">
          <iframe
            src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`}
            title="Be verbs with Yes/No questions — listening quiz"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>

        <h3 className="l22-listen-subtitle">After each conversation</h3>
        <div className="lesson19-choose-list">
          {listeningQuizItems.map((item, index) => {
            const selected = listenChoose[index];
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
                        setListenChoose((p) => ({ ...p, [index]: opt }))
                      }
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {showListenChoose && (
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
          onClick={() => setShowListenChoose(true)}
        >
          Check listening answers
        </button>
        {showListenChoose && (
          <p className="l22-score">
            Score: {listenScore} / {listeningQuizItems.length}
          </p>
        )}

        <h3 className="l22-listen-subtitle">Say it out loud</h3>
        <div className="lesson22-prompt-grid">
          {listeningSpeakingPrompts.map((q) => (
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
          <p className="page-kicker">Vocabulary</p>
          <h2>Emotions</h2>
          <p className="lesson22-section-desc">
            Подивись на картинку. Прочитай прикметники вголос і скажи:{" "}
            <strong>I am happy. / She is tired. / He is nervous.</strong>
          </p>
        </div>

        <figure
          className="l22-picture-wrap l22-picture-wrap--native l22-picture-wrap--flush l22-picture-wrap--w576"
        >
          <img
            src={IMG("emotions-adjectives.jpg")}
            alt="Emotions — happy, sad, tired, scared, angry, nervous, shy, excited, bored"
            width={576}
            height={883}
            loading="lazy"
            decoding="async"
          />
          <figcaption>
            happy, sad, tired, scared, angry, nervous, shy, excited, bored
          </figcaption>
        </figure>

        <h3 style={{ fontSize: "1rem", margin: "0 0 0.75rem" }}>Flashcards</h3>
        <VocabFlashcards
          cards={emotionsVocab}
          flipped={emotionsFlipped}
          onToggle={toggleFlipped(setEmotionsFlipped)}
        />
      </section>

      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-section-head">
          <p className="page-kicker">Vocabulary</p>
          <h2>Opposites</h2>
          <p className="lesson22-section-desc">
            Вивчи пари протилежних слів. Склади речення з to be:{" "}
            <strong>The rabbit is small. The hippo is big.</strong>
          </p>
        </div>

        <figure className="l22-picture-wrap">
          <img
            src={IMG("opposites.png")}
            alt="Opposites — small/big, short/tall, fast/slow, happy/sad and more"
            loading="lazy"
          />
          <figcaption>
            small — big, short — tall, fast — slow, sad — happy…
          </figcaption>
        </figure>

        <h3 style={{ fontSize: "1rem", margin: "0 0 0.75rem" }}>Flashcards</h3>
        <VocabFlashcards
          cards={oppositesVocab}
          flipped={oppositesFlipped}
          onToggle={toggleFlipped(setOppositesFlipped)}
        />
      </section>

      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-section-head">
          <p className="page-kicker">Speaking</p>
          <h2>Character speaking cards</h2>
          <p className="lesson22-section-desc">
            Подивись на картки Emma, Jayden, Grace і Owen. Розкажи про кожного
            вголос <strong>англійською</strong> — to be, has got, a / an.
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
          <p className="page-kicker">Part 2 — Articles</p>
          <h2>a / an / the</h2>
          <p className="lesson22-section-desc">
            Прочитай правило нижче. Потім — картки з прикладами, вправи на вибір
            і speaking з артиклями.
          </p>
        </div>

        <blockquote className="l23-rule-quote">
          <p>
            <strong>a</strong> — перед словами з приголосним звуком:{" "}
            <em>a book, a dog, a university</em>.{" "}
            <strong>an</strong> — перед голосним звуком:{" "}
            <em>an apple, an egg, an hour, an umbrella</em>.{" "}
            <strong>the</strong> — коли предмет конкретний або вже відомий:{" "}
            <em>the sun, the door, the book on the table</em>.
          </p>
          <footer>
            <strong>a / an</strong> — один із багатьох, будь-який.&ensp;
            <strong>the</strong> — той самий, конкретний, уже згаданий.
          </footer>
        </blockquote>

        <h3 className="l22-listen-subtitle">Vowel sounds — a or an?</h3>
        <p className="lesson22-section-desc">
          Для <strong>a / an</strong> важливий не напис літери, а{" "}
          <strong>звук</strong> на початку слова. Тому{" "}
          <em>an hour</em> (h не чути — починається з голосного), але{" "}
          <em>a university</em> (звук [j] — як приголосний). Подивись на
          голосні та довгі звуки нижче — вони допоможуть краще чути початок
          слова.
        </p>

        <div className="l23-vowel-pictures">
          <figure className="l22-picture-wrap l22-picture-wrap--native">
            <img
              src={IMG("long-vowel-sounds.jpg")}
              alt="Phonics Reading — Long Vowel Sounds: ai, ee, ie, oa, ue and more"
              width={722}
              height={1024}
              loading="lazy"
              decoding="async"
            />
            <figcaption>
              Long A: train, cake, hay, eight · Long E: tree, beach, monkey ·
              Long I: pie, pine, light, sky · Long O: goat, rope, snow, toe ·
              Long U: glue, cube, sew
            </figcaption>
          </figure>

          <figure className="l22-picture-wrap l22-picture-wrap--native l22-picture-wrap--flush">
            <img
              src={IMG("vowels-consonants.jpg")}
              alt="Vowels A E I O U and consonants — phonics chart"
              width={739}
              height={1024}
              loading="lazy"
              decoding="async"
            />
            <figcaption>
              Vowels: A, E, I, O, U — голосні звуки. Consonants — усі інші
              літери.
            </figcaption>
          </figure>
        </div>

        <h3 className="l22-listen-subtitle">Articles — three rules in pictures</h3>
        <p className="lesson22-section-desc">
          Три інфографіки поруч: <strong>a / an</strong> для нових речей і{" "}
          <strong>the</strong> для конкретних. Зверни увагу на{" "}
          <em>a university</em> та <em>an hour</em> — знову важливий звук, не
          літера.
        </p>

        <div className="l23-article-pictures">
          {articleInfographics.map((item) => (
            <figure
              className="l22-picture-wrap l22-picture-wrap--native l22-picture-wrap--flush"
              key={item.file}
            >
              <img
                src={IMG(item.file)}
                alt={item.alt}
                width={item.width}
                height={item.height}
                loading="lazy"
                decoding="async"
              />
              <figcaption>{item.caption}</figcaption>
            </figure>
          ))}
        </div>

        <h3 style={{ fontSize: "1rem", margin: "1.5rem 0 0.75rem" }}>
          Examples — flashcards
        </h3>
        <VocabFlashcards
          cards={articleVocab}
          flipped={articleFlipped}
          onToggle={toggleFlipped(setArticleFlipped)}
        />

        <h3 style={{ marginTop: "1.5rem", fontSize: "1rem" }}>
          Choose a / an / the
        </h3>
        <div className="lesson19-choose-list l23-article-choose-list">
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

        <h3 className="l22-listen-subtitle">Speaking with articles</h3>
        <div className="lesson22-prompt-grid">
          {articleSpeakingPrompts.map((q) => (
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
