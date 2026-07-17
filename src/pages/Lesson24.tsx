import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/lesson22.css";
import "../styles/lesson19.css";

const IMG = (name: string) => `${import.meta.env.BASE_URL}images/${name}`;

const YOUTUBE_VIDEO_ID = "nZLNps2qsNk";

const allVocab = [
  { en: "a violin", ua: "скрипка" },
  { en: "a pool", ua: "басейн" },
  { en: "happy", ua: "щасливий" },
  { en: "sad", ua: "сумний" },
  { en: "tired", ua: "втомлений" },
  { en: "scared", ua: "наляканий" },
  { en: "angry", ua: "злий" },
  { en: "nervous", ua: "знервований" },
  { en: "shy", ua: "сором'язливий" },
  { en: "excited", ua: "схвильований (в хорошому сенсі)" },
  { en: "bored", ua: "нудьгуючий" },
  { en: "curly", ua: "кучерявий" },
  { en: "straight", ua: "прямий (про волосся)" },
  { en: "long", ua: "довгий" },
  { en: "fair", ua: "світлий (колір волосся / шкіри)" },
  { en: "tall", ua: "високий" },
  { en: "short", ua: "низький" },
  { en: "young", ua: "молодий" },
  { en: "old", ua: "старий (про людину)" },
  { en: "friendly", ua: "дружній" },
  { en: "quiet", ua: "тихий" },
  { en: "funny", ua: "смішний" },
  { en: "kind", ua: "добрий" },
  { en: "dark hair", ua: "темне волосся" },
  { en: "blonde hair", ua: "світле волосся" },
  { en: "glasses", ua: "окуляри" },
  { en: "a beard", ua: "борода" },
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

const warmUpPrompts = [
  "Опиши себе в 3 реченнях: вік, зовнішність, характер.",
  "Опиши свого друга: he/she + is / has got.",
  "Як виглядає твій брат або сестра?",
  "Скажи 3 прикметники про людину, яку знаєш.",
];

const modelSentences = [
  "She is tall and friendly.",
  "He has got dark hair and glasses.",
  "My mother is kind and quiet.",
  "They are young and funny.",
  "He is short. He has got a beard.",
];

const speakingPromptsUa = [
  "Опиши людину на фото з відео: зовнішність + характер (5–6 речень).",
  "Опиши свого друга: 4 речення з is / has got.",
  "Опиши члена сім'ї: вік, волосся, очі, характер.",
  "Порівняй себе і друга: 2 речення (I am… / He is…).",
];

const speakingPromptsEn = [
  { q: "What does he/she look like?", tag: "appearance" },
  { q: "Is your friend tall or short?", tag: "to be" },
  { q: "Has your brother got glasses?", tag: "has got" },
  { q: "Is your mother friendly?", tag: "to be" },
  { q: "What colour is his/her hair?", tag: "has got / is" },
  { q: "Describe your teacher in 3 sentences.", tag: "mixed" },
];

const videoRetellPrompts = [
  "Хто ці люди на відео?",
  "Як вони виглядають?",
  "Який у них характер?",
  "Що вони роблять або де вони?",
];

type ChooseItem = { sentence: string; options: string[]; answer: string };

type WorkCell = { text: string; fix?: string };
type WorkRow = { grace: WorkCell; owen: WorkCell };

const studentWorkRows: WorkRow[] = [
  {
    grace: { text: "It is Grace.", fix: "Her name is Grace." },
    owen:  { text: "It is Owen.",  fix: "His name is Owen."  },
  },
  {
    grace: { text: "She is nine years old." },
    owen:  { text: "He is eleven years old." },
  },
  {
    grace: { text: "She is from New York City." },
    owen:  { text: "He is from Dallas, Texas." },
  },
  {
    grace: { text: "Her hobby is ballet." },
    owen:  { text: "His is hobyt basball.", fix: "His hobby is baseball." },
  },
  {
    grace: { text: "Her favorite food is bagels." },
    owen:  { text: "His favorite food is barbecue." },
  },
  {
    grace: { text: "Her pet name's Kitten.", fix: "Her pet's name is Kitten." },
    owen:  { text: "His pet is name Parakeet.", fix: "His pet's name is Parakeet." },
  },
  {
    grace: { text: "She loves rides the subway.", fix: "She loves riding the subway." },
    owen:  { text: "He's Colletct baseball cards.", fix: "He collects baseball cards." },
  },
  {
    grace: { text: "Her weekend plan go to the art class.", fix: "Her weekend plan is to go to the art class." },
    owen:  { text: "His plans at the weekend cookout.", fix: "His plan for the weekend is a cookout." },
  },
];

const articleChooseItems: ChooseItem[] = [
  { sentence: "She is ___ teacher.", options: ["a", "an", "the"], answer: "a" },
  { sentence: "He is ___ honest man.", options: ["a", "an", "the"], answer: "an" },
  { sentence: "___ girl has got dark hair.", options: ["A", "An", "The"], answer: "The" },
  { sentence: "I have ___ umbrella.", options: ["a", "an", "the"], answer: "an" },
  { sentence: "She plays ___ violin.", options: ["a", "an", "the"], answer: "the" },
  { sentence: "They are at ___ pool.", options: ["a", "an", "the"], answer: "the" },
  { sentence: "My sister is ___ artist.", options: ["a", "an", "the"], answer: "an" },
  { sentence: "He is ___ tall boy with ___ beard.", options: ["a", "an", "the"], answer: "a" },
];

const articleSpeakingPrompts = [
  "Опиши свою кімнату: 4 речення з a / an / the.",
  "Назви 3 речі в класі з the (the board, the window…).",
  "Скажи: I am ___ student. / She is ___ engineer. / He is ___ old man.",
  "Склади 2 речення: одне з a/an, одне з the.",
];

export default function Lesson24() {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const [vocabFlipped, setVocabFlipped] = useState<number[]>([]);
  const [articleChoose, setArticleChoose] = useState<Record<number, string>>({});
  const [showArticleChoose, setShowArticleChoose] = useState(false);
  const [revealedCells, setRevealedCells] = useState<Set<string>>(new Set());

  const toggleCell = (id: string) =>
    setRevealedCells((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const revealAllCells = () =>
    setRevealedCells(
      new Set(studentWorkRows.flatMap((_, i) => [`${i}-grace`, `${i}-owen`])),
    );

  const hideAllCells = () => setRevealedCells(new Set());

  const toggleVocab = (idx: number) =>
    setVocabFlipped((p) =>
      p.includes(idx) ? p.filter((x) => x !== idx) : [...p, idx],
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
            <p className="page-kicker">Lesson 24</p>
            <h1>Describing People</h1>
            <p className="lesson22-topic-pill">
              Appearance + personality + a / an / the
            </p>
            <p className="lesson22-subtitle">
              Вивчи слова, подивись відео — потім опишеш людей вголос:{" "}
              зовнішність, характер і речі навколо з артиклями.
            </p>
            <ul className="l22-goals-list">
              <li>прикметники для зовнішності й характеру;</li>
              <li>is / has got у описі людей;</li>
              <li>a / an / the у реченнях про людей і речі.</li>
            </ul>
          </div>
        </div>
        <div className="lesson22-hero-chips">
          <span>She is tall</span>
          <span>He has got glasses</span>
          <span>friendly</span>
          <span>dark hair</span>
          <span>a violin</span>
          <span>the pool</span>
        </div>
      </section>

      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-flow">
          <span>1 Vocabulary</span>
          <span>2 Warm-up</span>
          <span>3 Video</span>
          <span>4 Opposites</span>
          <span>5 Models</span>
          <span>6 Speaking</span>
          <span>7 Grammar</span>
          <span>8 Articles</span>
          <span>9 Review</span>
        </div>
        <p className="lesson22-section-desc">
          Послідовність:{" "}
          <strong>слова → відео → протилежності → зразки → говоріння → граматика → артиклі → перевірка помилок</strong>.
        </p>
      </section>

      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-section-head">
          <p className="page-kicker">Vocabulary</p>
          <h2>Words for this lesson</h2>
          <p className="lesson22-section-desc">
            Натисни картку, щоб перевернути. Прочитай вголос і склади речення з{" "}
            <strong>is / has got</strong>.
          </p>
        </div>
        <div className="l22-vocab-grid">
          {allVocab.map((card, idx) => {
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
      </section>

      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-section-head">
          <p className="page-kicker">Warm-up</p>
          <h2>Describe a person</h2>
          <p className="lesson22-section-desc">
            Відповідай вголос <strong>англійською</strong>. Використай is / has
            got і прикметники зовнішності або характеру.
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
          <p className="page-kicker">Video</p>
          <h2>Watch and describe</h2>
          <p className="lesson22-section-desc">
            Подивись відео. Потім опиши людей, яких бачиш: зовнішність,
            вік, характер — <strong>5–6 речень англійською</strong>.
          </p>
        </div>

        <div className="l22-video-wrap">
          <iframe
            src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`}
            title="Describing people — lesson video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>

        <h3 className="l22-listen-subtitle">After the video</h3>
        <p className="lesson22-section-desc">
          Відповідай на підказки вголос, щоб скласти короткий опис людей з
          відео.
        </p>
        <div className="lesson22-prompt-grid">
          {videoRetellPrompts.map((q) => (
            <div
              key={q}
              className="lesson22-prompt-card lesson22-prompt-card--task"
            >
              {q}
            </div>
          ))}
        </div>

        <h3 className="l22-listen-subtitle">Extra listening</h3>
        <p className="lesson22-section-desc">
          Listening test на тему "Describing people" — рівень A1.
        </p>
        <a
          className="l22-external-link"
          href="https://test-english.com/listening/a1/describing-people-a1-english-listening-test/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Describing people — A1 Listening Test ↗
        </a>
      </section>

      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-section-head">
          <p className="page-kicker">Vocabulary</p>
          <h2>Opposites</h2>
          <p className="lesson22-section-desc">
            Пригадай протилежні слова з минулого уроку. Використай їх у описі
            людей: <strong>tall — short, young — old, clean — dirty</strong>.
          </p>
        </div>

        <figure
          className="l22-picture-wrap l22-picture-wrap--native l22-picture-wrap--flush l22-picture-wrap--w576"
        >
          <img
            src={IMG("opposites-l24.jpg")}
            alt="Opposites — small/big, short/tall, fast/slow, happy/sad and more"
            width={650}
            height={940}
            loading="lazy"
            decoding="async"
          />
          <figcaption>
            small — big, short — tall, fast — slow, sad — happy, dirty — clean…
          </figcaption>
        </figure>
      </section>

      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-section-head">
          <p className="page-kicker">Models</p>
          <h2>is / has got — example sentences</h2>
          <p className="lesson22-section-desc">
            Прочитай зразки вголос. Потім зміни їх під свою людину (friend,
            mother, brother…).
          </p>
        </div>
        <div className="lesson22-prompt-grid">
          {modelSentences.map((s) => (
            <div key={s} className="lesson22-prompt-card lesson22-prompt-card--task">
              {s}
            </div>
          ))}
        </div>
      </section>

      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-section-head">
          <p className="page-kicker">Speaking</p>
          <h2>Describe someone you know</h2>
          <p className="lesson22-section-desc">
            Відповідай українськими підказками англійською. Мінімум 4 повні
            речення в кожній відповіді.
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
            Відповідай на кожне питання вголос. Зверни увагу на мітку —
            appearance, to be або has got.
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
          <p className="page-kicker">Grammar</p>
          <h2>A/AN &amp; Plurals in English</h2>
          <p className="lesson22-section-desc">
            Прочитай таблицю, зверни увагу на виділені закінчення і виняткові форми.
          </p>
        </div>

        <div className="l24-chart">
          <div className="l24-chart-title">A/AN &amp; PLURALS IN ENGLISH</div>

          {/* ── REGULAR PLURAL ── */}
          <div className="l24-chart-section">
            <div className="l24-chart-side l24-chart-side--reg">
              <span>REGULAR PLURAL</span>
            </div>
            <div className="l24-chart-inner">
              <div className="l24-chart-cols">
                {/* Singular */}
                <div className="l24-chart-col">
                  <div className="l24-chart-col-head l24-head--sg">SINGULAR</div>
                  {[
                    ["a student", "an apple"],
                    ["a bus", "a box"],
                    ["a baby", "a country"],
                    ["a day", "a toy"],
                    ["a shelf", "a wife"],
                  ].map(([a, b]) => (
                    <div className="l24-chart-cell l24-cell--sg" key={a}>
                      <span>{a}</span>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
                {/* Plural */}
                <div className="l24-chart-col">
                  <div className="l24-chart-col-head l24-head--pl">PLURAL</div>
                  {[
                    [<>student<strong>s</strong></>, <>apple<strong>s</strong></>],
                    [<>bus<strong>es</strong></>, <>box<strong>es</strong></>],
                    [<>bab<strong>ies</strong></>, <>countr<strong>ies</strong></>],
                    [<>day<strong>s</strong></>, <>toy<strong>s</strong></>],
                    [<>shel<strong>ves</strong></>, <>wi<strong>ves</strong></>],
                  ].map(([a, b], i) => (
                    <div className="l24-chart-cell l24-cell--pl" key={i}>
                      <span>{a}</span>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
                {/* Spelling */}
                <div className="l24-chart-col l24-chart-col--wide">
                  <div className="l24-chart-col-head l24-head--sp">SPELLING</div>
                  {[
                    [<><strong>general rule</strong> — add <strong>-s</strong></>],
                    [<>after <strong>-s, -ch, -sh, -x</strong> — add <strong>-es</strong></>],
                    [<>after consonant + <strong>-y</strong> — delete -y, add <strong>-ies</strong></>],
                    [<>after <strong>-ay, -ey, -oy</strong> — add <strong>-s</strong></>],
                    [<>after <strong>-f / -fe</strong> — delete, add <strong>-ves</strong></>],
                  ].map(([rule], i) => (
                    <div className="l24-chart-cell l24-cell--sp" key={i}>
                      <span className="l24-check">✅</span>
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── IRREGULAR PLURAL ── */}
          <div className="l24-chart-section">
            <div className="l24-chart-side l24-chart-side--irr">
              <span>IRREGULAR PLURAL</span>
            </div>
            <div className="l24-chart-inner">
              <div className="l24-chart-cols">
                {/* Singular */}
                <div className="l24-chart-col">
                  <div className="l24-chart-col-head l24-head--sg">SINGULAR</div>
                  {["a man","a woman","a child","a foot","a tooth","a fish","a mouse","a sheep"].map((w) => (
                    <div className="l24-chart-cell l24-cell--sg" key={w}><span>{w}</span></div>
                  ))}
                </div>
                {/* Plural */}
                <div className="l24-chart-col">
                  <div className="l24-chart-col-head l24-head--pl">PLURAL</div>
                  {["men","women","children","feet","teeth","fish","mice","sheep"].map((w) => (
                    <div className="l24-chart-cell l24-cell--pl" key={w}><span>{w}</span></div>
                  ))}
                </div>
                {/* Notes */}
                <div className="l24-chart-col l24-chart-col--wide">
                  <div className="l24-chart-col-head l24-head--notes">NOTES</div>
                  <div className="l24-notes-wrap">
                    <div className="l24-note l24-note--amber">
                      <div className="l24-note-title">✏️ USE AN + SILENT H-</div>
                      <p><strong>an</strong> hour <em>(h is silent)</em></p>
                      <p><strong>a</strong> hat <em>(h is pronounced)</em></p>
                    </div>
                    <div className="l24-note l24-note--amber">
                      <div className="l24-note-title">✏️ USE A + U- PRONOUNCED [ju:]</div>
                      <p><strong>an</strong> umbrella <em>([ʌ], NOT [ju:])</em></p>
                      <p><strong>a</strong> university <em>([ju:])</em></p>
                    </div>
                    <div className="l24-note l24-note--danger">
                      <div className="l24-note-title">⚠️ DO NOT USE A/AN WITH PLURALS</div>
                      <p className="l24-eg-wrong">✗ These are <s>a</s> tables.</p>
                      <p className="l24-eg-right">✓ These are tables.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-section-head">
          <p className="page-kicker">Articles</p>
          <h2>a / an / the — choose</h2>
          <p className="lesson22-section-desc">
            Обери правильний артикль. Пам'ятай:{" "}
            <strong>a</strong> — приголосний звук,{" "}
            <strong>an</strong> — голосний звук,{" "}
            <strong>the</strong> — конкретна або відома річ.
          </p>
        </div>

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
          Check answers
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
          <p className="page-kicker">Review — Lesson 23</p>
          <h2>Student work — find &amp; fix mistakes</h2>
          <p className="lesson22-section-desc">
            Нижче — опис персонажів Grace і Owen. Знайдіть помилки разом.
            Натисніть на речення, щоб перевірити — зелений значить правильно,
            червоний показує виправлення.
          </p>
        </div>

        <p className="lesson22-section-desc" style={{ marginBottom: "0.5rem" }}>
          <em>
            Emma, Jayden, Grace, Owen — опиши кожного в 4–5 реченнях.
          </em>
        </p>

        <div className="l24-work-table">
          <div className="l24-work-head">
            <div className="l24-work-col-head l24-work-col-head--grace">Grace</div>
            <div className="l24-work-col-head l24-work-col-head--owen">Owen</div>
          </div>
          {studentWorkRows.map((row, i) => (
            <div className="l24-work-row" key={i}>
              {(["grace", "owen"] as const).map((col) => {
                const cell = row[col];
                const id = `${i}-${col}`;
                const revealed = revealedCells.has(id);
                const hasError = !!cell.fix;
                return (
                  <button
                    key={col}
                    type="button"
                    className={`l24-work-cell${revealed ? (hasError ? " l24-work-cell--error" : " l24-work-cell--ok") : ""}`}
                    onClick={() => toggleCell(id)}
                    title="Натисніть щоб перевірити"
                  >
                    <span className="l24-work-original">{cell.text}</span>
                    {revealed && (
                      <span className={`l24-work-verdict ${hasError ? "l24-work-verdict--error" : "l24-work-verdict--ok"}`}>
                        {hasError ? <>✗ &rarr; {cell.fix}</> : "✓ Correct"}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div className="l24-work-actions">
          <button type="button" className="l22-btn" onClick={revealAllCells}>
            Показати всі помилки
          </button>
          <button type="button" className="btn secondary" onClick={hideAllCells}>
            Сховати
          </button>
        </div>
      </section>

      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-section-head">
          <p className="page-kicker">Homework</p>
          <h2>After class</h2>
          <p className="lesson22-section-desc">
            Напиши 6–8 речень про людину, яку добре знаєш: зовнішність +
            характер (is / has got) і 3 речення з a / an / the.
          </p>
        </div>
        <Link className="lesson22-back-link" to="/homework">
          Homework page
        </Link>
      </section>
    </div>
  );
}
