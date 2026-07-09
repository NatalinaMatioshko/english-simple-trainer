import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/lesson22.css";
import "../styles/lesson19.css";

const LISTENING_TEST_URL =
  "https://test-english.com/listening/a1/how-often-do-you-a1-english-listening-test/";

const YOUTUBE_VIDEO_ID = "uX8Wl75kGm8";

const IMG = (name: string) => `${import.meta.env.BASE_URL}images/${name}`;

const warmUpPrompts = [
  "Як ти себе почуваєш сьогодні?",
  "Що ти вже зробив(ла) сьогодні вранці?",
  "Сьогодні насичений день чи спокійний?",
  "Скажи одну річ, яку хочеш зробити після уроку.",
];

const thirdPersonCanDrills = [
  { prompt: "I work in an office.", answer: "She works in an office." },
  { prompt: "I can cook.", answer: "He can cook." },
  { prompt: "I get up at 7.", answer: "She gets up at 7." },
  { prompt: "I can't drive.", answer: "He can't drive." },
  { prompt: "My friend studies English.", answer: "She studies English." },
  { prompt: "Can you swim?", answer: "Can she swim? / Yes, she can." },
  { prompt: "I go to work at 9.", answer: "He goes to work at 9." },
  { prompt: "I can speak Ukrainian.", answer: "She can speak Ukrainian." },
];

const selfQuestionsUa = [
  "Як тебе звати?",
  "Скільки тобі років?",
  "Звідки ти? (Місто або країна)",
  "Де ти зараз живеш?",
  "Якого кольору твої очі і волосся?",
  "Які твої улюблені заняття або хобі?",
  "Чим ти займаєшся? (Наприклад, робота чи навчання)",
  "Яка твоя улюблена їжа або напій?",
  "Який твій улюблений колір?",
  "Чи у тебе є брат чи сестра?",
];

const selfQuestionsEn = [
  { q: "What is your name?", tag: "to be" },
  { q: "How old are you?", tag: "to be" },
  { q: "Where are you from?", tag: "to be" },
  { q: "Where do you live?", tag: "Present Simple" },
  { q: "What do you do every day?", tag: "Present Simple" },
  { q: "What is your favorite color?", tag: "to be" },
  { q: "What time do you get up?", tag: "Present Simple" },
  { q: "Is your family big or small?", tag: "to be" },
  { q: "What does your best friend do?", tag: "Present Simple with -s" },
  { q: "Are you a student or do you work?", tag: "to be / Present Simple" },
];

const routineVocab = [
  { en: "wake up", ua: "прокидатися", example: "I wake up at 7." },
  { en: "get up", ua: "вставати", example: "I get up at 7:15." },
  { en: "have breakfast", ua: "снідати", example: "I have breakfast at home." },
  { en: "go to work", ua: "йти на роботу", example: "She goes to work at 9." },
  { en: "go home", ua: "повертатися додому", example: "He goes home at 6." },
  { en: "have lunch", ua: "обідати", example: "We have lunch at 1." },
  { en: "have dinner", ua: "вечеряти", example: "I have dinner at 7." },
  { en: "go to bed", ua: "лежати спати", example: "I go to bed at 11." },
];

const usefulNouns = [
  { en: "brother", ua: "брат", example: "My brother works in IT." },
  { en: "mother", ua: "мама", example: "My mother lives in Kyiv." },
  { en: "friend", ua: "друг", example: "My friend studies English." },
  { en: "plant", ua: "рослина", example: "I have a plant at home." },
  { en: "job", ua: "робота (посада)", example: "I like my job." },
  { en: "home", ua: "домівка", example: "I go home after work." },
  { en: "work", ua: "робота (місце)", example: "I go to work by bus." },
];

const listenRetellPrompts = [
  "О котрій людина прокидається?",
  "Що вона робить вранці?",
  "Куди вона йде після сніданку?",
  "Що вона робить увечері?",
];

const parkSpeakingPrompts = [
  "Опиши загально, що відбувається в парку (5–7 речень).",
  "Що робить сім'я за пікнічним столом?",
  "Що роблять хлопці на тенісному корті?",
  "Хто годує качок і де?",
  "Що робить чоловік у солом'яному капелюсі?",
  "Хто лізе на дерево і чому?",
  "Що робить жінка біля куща з трояндами?",
];

const parkVocab = [
  { en: "park", ua: "парк" },
  { en: "play tennis", ua: "грати в теніс" },
  { en: "picnic", ua: "пікнік" },
  { en: "eat", ua: "їсти" },
  { en: "feed", ua: "годувати" },
  { en: "duck", ua: "качка" },
  { en: "pond", ua: "ставок" },
  { en: "bridge", ua: "міст" },
  { en: "boat", ua: "човник" },
  { en: "lawnmower", ua: "газонокосарка" },
  { en: "mow the lawn", ua: "косити газон" },
  { en: "hike", ua: "йти в похід" },
  { en: "walk", ua: "гуляти" },
  { en: "backpack", ua: "рюкзак" },
  { en: "listen to music", ua: "слухати музику" },
  { en: "headphones", ua: "навушники" },
  { en: "tennis court", ua: "тенісний корт" },
  { en: "racket", ua: "ракетка" },
  { en: "net", ua: "сітка" },
  { en: "jump", ua: "стрибати" },
  { en: "climb", ua: "лазити (на дерево)" },
  { en: "tree", ua: "дерево" },
  { en: "kite", ua: "повітряний змій" },
  { en: "rose", ua: "троянда" },
  { en: "flowers", ua: "квіти" },
  { en: "look at", ua: "дивитися на" },
  { en: "sandwich", ua: "сендвіч" },
  { en: "salad", ua: "салат" },
  { en: "family", ua: "сім'я" },
  { en: "straw hat", ua: "солом'яний капелюх" },
];

const petroAboutParagraphs = [
  `My name is Petro. I am thirty seven years old. I is from Sevastopol, but now live near (in?) Kyiv. I work in the barbershop, and I study English. My teacher is very good. She all time created interesting lessons and exercises for me in the website.`,
  `I wake up at seven o'clock every morning. I get up at half past nine today. But usually I get up at eleven past nine in the morning.`,
  `I do exercise and have a shower. I have a breakfast and before I brush my teeth, then  I go to work in the barbershop. At the work I do hearcuts and I wash hear my clients.`,
  `I go home at eight o'clock. I have a dinner and go watch cinema on my laptop. I speak with my girlfriend.  And then I play video games with my friend. I go to bed at forty three pm.`,
];

const petroMistakeKey = [
  { wrong: "thirty seven", fix: "thirty-seven", tag: "spelling" },
  { wrong: "I is from", fix: "I am from", tag: "to be" },
  { wrong: "but now live", fix: "but now I live", tag: "missing subject" },
  { wrong: "near (in?) Kyiv", fix: "in Kyiv", tag: "preposition" },
  { wrong: "in the barbershop", fix: "at a barbershop", tag: "preposition" },
  {
    wrong: "She all time created",
    fix: "She always creates",
    tag: "Present Simple",
  },
  { wrong: "in the website", fix: "on the website", tag: "preposition" },
  {
    wrong: "eleven past nine",
    fix: "ten past nine / quarter past nine",
    tag: "time",
  },
  { wrong: "I do exercise", fix: "I do exercises / I exercise", tag: "routine" },
  { wrong: "have a breakfast", fix: "have breakfast", tag: "article" },
  {
    wrong: "have a breakfast and before I brush my teeth, then I go",
    fix: "I brush my teeth, have breakfast, then I go",
    tag: "word order",
  },
  { wrong: "At the work", fix: "At work", tag: "preposition" },
  { wrong: "hearcuts", fix: "haircuts", tag: "spelling" },
  {
    wrong: "wash hear my clients",
    fix: "wash my clients' hair",
    tag: "spelling",
  },
  { wrong: "have a dinner", fix: "have dinner", tag: "article" },
  { wrong: "go watch cinema", fix: "watch films / watch movies", tag: "vocabulary" },
  { wrong: "forty three pm", fix: "eleven pm / at 11 pm", tag: "time" },
];

type ChooseItem = { sentence: string; options: string[]; answer: string };

const canChooseItems: ChooseItem[] = [
  {
    sentence: "___ you help me, please?",
    options: ["Can", "Does", "Do", "Is"],
    answer: "Can",
  },
  {
    sentence: "She ___ speak English very well.",
    options: ["can", "cans", "does", "is"],
    answer: "can",
  },
  {
    sentence: "He ___ drive a car yet.",
    options: ["can't", "doesn't", "isn't", "don't"],
    answer: "can't",
  },
  {
    sentence: "My brother ___ cook pasta.",
    options: ["can", "cans", "does", "is"],
    answer: "can",
  },
  {
    sentence: "___ I sit here?",
    options: ["Can", "Do", "Does", "Am"],
    answer: "Can",
  },
  {
    sentence: "Fish ___ walk on land.",
    options: ["can't", "don't", "doesn't", "isn't"],
    answer: "can't",
  },
];

export default function Lesson22() {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const [drillOpen, setDrillOpen] = useState<number[]>([]);
  const [vocabFlipped, setVocabFlipped] = useState<number[]>([]);
  const [parkVocabFlipped, setParkVocabFlipped] = useState<number[]>([]);
  const [canChoose, setCanChoose] = useState<Record<number, string>>({});
  const [showCanChoose, setShowCanChoose] = useState(false);
  const [showPetroKey, setShowPetroKey] = useState(false);
  const [petroNotes, setPetroNotes] = useState("");

  const allVocab = [...routineVocab, ...usefulNouns];

  const toggleVocab = (idx: number) =>
    setVocabFlipped((p) =>
      p.includes(idx) ? p.filter((x) => x !== idx) : [...p, idx],
    );

  const toggleParkVocab = (idx: number) =>
    setParkVocabFlipped((p) =>
      p.includes(idx) ? p.filter((x) => x !== idx) : [...p, idx],
    );

  const toggleDrill = (idx: number) =>
    setDrillOpen((p) =>
      p.includes(idx) ? p.filter((x) => x !== idx) : [...p, idx],
    );

  const canChooseScore = useMemo(
    () =>
      canChooseItems.filter((item, i) => canChoose[i] === item.answer).length,
    [canChoose],
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
            <p className="page-kicker">Lesson 22</p>
            <h1>Present Simple Review + Can + About Me</h1>
            <p className="lesson22-topic-pill">
              Talking about yourself and daily routines
            </p>
            <p className="lesson22-subtitle">
              Review <strong>Present Simple</strong>, practise{" "}
              <strong>he / she / it</strong> and <strong>can / can't</strong>,
              then speak about yourself, your routine, and people you know —
              with short listening and light new vocabulary.
            </p>
            <ul className="l22-goals-list">
              <li>автоматизувати he / she / it;</li>
              <li>потренувати can;</li>
              <li>говорити про себе та свою рутину;</li>
              <li>коротке listening + 1–2 нові словникові блоки.</li>
            </ul>
          </div>
        </div>
        <div className="lesson22-hero-chips">
          <span>I get up at 7</span>
          <span>She goes to work</span>
          <span>I can swim</span>
          <span>He can't drive</span>
          <span>My name is…</span>
          <span>What do you do?</span>
        </div>
      </section>

      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-flow">
          <span>1 Warm-up</span>
          <span>2 Third person + can</span>
          <span>3 About me (UA)</span>
          <span>4 Questions (EN)</span>
          <span>5 Picture</span>
          <span>6 Listening</span>
          <span>7 Vocabulary</span>
          <span>8 Mini writing</span>
          <span>9 Find mistakes</span>
        </div>
        <p className="lesson22-section-desc">
          Послідовність:{" "}
          <strong>говоріння → вправи → опис → listening → письмо</strong> — щоб
          граматика стала живою мовою про реальне життя.
        </p>
      </section>

      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-section-head">
          <p className="page-kicker">Warm-up</p>
          <h2>Talk about the day</h2>
          <p className="lesson22-section-desc">
            Відповідай вголос <strong>англійською</strong>. Скажи, як ти себе
            почуваєш і що вже зробив(ла) сьогодні вранці.
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
          <p className="page-kicker">Quick drill</p>
          <h2>Third person + can</h2>
          <p className="lesson22-section-desc">
            Перетвори <strong>I → he/she</strong> або відповідай з can. Скажи
            вголос, потім натисни, щоб перевірити зразок.
          </p>
        </div>
        <div className="l22-drill-list">
          {thirdPersonCanDrills.map((item, idx) => (
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
          Can — choose the word
        </h3>
        <div className="lesson19-choose-list">
          {canChooseItems.map((item, index) => {
            const selected = canChoose[index];
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
                        setCanChoose((p) => ({ ...p, [index]: opt }))
                      }
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {showCanChoose && (
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
          onClick={() => setShowCanChoose(true)}
        >
          Check can answers
        </button>
        {showCanChoose && (
          <p className="l22-score">
            Score: {canChooseScore} / {canChooseItems.length}
          </p>
        )}
      </section>

      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-section-head">
          <p className="page-kicker">Speaking</p>
          <h2>Describe yourself in 5–7 sentences</h2>
          <p className="lesson22-section-desc">
            Вчитель ставить питання українською — ти відповідаєш{" "}
            <strong>англійською</strong>, повними реченнями. Не одне слово — а
            ціле речення.
          </p>
        </div>
        <div className="lesson22-prompt-grid">
          {selfQuestionsUa.map((q) => (
            <div key={q} className="lesson22-prompt-card">
              {q}
            </div>
          ))}
        </div>
        <p className="lesson22-section-desc" style={{ marginTop: "1rem" }}>
          Зразок початку:{" "}
          <em>My name is… I'm … years old. I'm from… I live in…</em>
        </p>
      </section>

      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-section-head">
          <p className="page-kicker">Speaking</p>
          <h2>Question practice</h2>
          <p className="lesson22-section-desc">
            Відповідай на кожне питання вголос. Зверни увагу на мітку граматики
            — to be, Present Simple або third person -s.
          </p>
        </div>
        <div className="l22-self-grid">
          {selfQuestionsEn.map((item) => (
            <div key={item.q} className="l22-self-card">
              <strong>{item.q}</strong>
              <span>{item.tag}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-section-head">
          <p className="page-kicker">Speaking</p>
          <h2>Describe the picture</h2>
          <p className="lesson22-section-desc">
            Подивись на картинку парку. Опиши вголос <strong>англійською</strong>,
            що бачиш: хто що робить, де все відбувається, які предмети на
            зображенні. Почни з загального опису, потім додай деталі.
          </p>
        </div>

        <figure className="l22-picture-wrap">
          <img
            src={IMG("people-in-the-park.png")}
            alt="People in the park — picnic, tennis, ducks, lawnmower"
            loading="lazy"
          />
          <figcaption>
            Опиши сцену в 5–7 реченнях англійською.
          </figcaption>
        </figure>

        <h3 className="l22-park-vocab-title">Mini vocabulary</h3>
        <p className="lesson22-section-desc">
          Слова з картинки — натисни картку, щоб перевернути, і використай їх,
          коли описуєш сцену англійською.
        </p>
        <div className="l22-vocab-grid">
          {parkVocab.map((card, idx) => {
            const flipped = parkVocabFlipped.includes(idx);
            return (
              <button
                key={card.en}
                type="button"
                className={`l22-vocab-card ${flipped ? "l22-vocab-card--flipped" : ""}`}
                onClick={() => toggleParkVocab(idx)}
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

        <div className="lesson22-prompt-grid">
          {parkSpeakingPrompts.map((q) => (
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
          <p className="page-kicker">Listening</p>
          <h2>Short daily routine listening</h2>
          <p className="lesson22-section-desc">
            Спочатку — відео. Потім — онлайн-тест. Після прослуховування
            перекажи рутину в <strong>3–4 реченнях</strong>.
          </p>
        </div>

        <div className="l22-video-wrap">
          <iframe
            src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`}
            title="Daily routine listening video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>

        <div className="l22-listen-external">
          <a
            href={LISTENING_TEST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="lesson19-resource-card l22-listen-link"
          >
            <div className="lesson19-resource-top">
              <span className="lesson19-resource-badge">A1 Listening</span>
              <span className="lesson19-resource-arrow">↗</span>
            </div>
            <h3>How often do you…?</h3>
            <p>
              Test-English — прислівники частоти та щоденна рутина. Відкрий у
              новій вкладці, виконай завдання, потім повернись сюди.
            </p>
          </a>
        </div>

        <h3 className="l22-listen-subtitle">Retell in 3–4 sentences</h3>
        <p className="lesson22-section-desc">
          Після прослуховування відповідай на ці підказки вголос, щоб скласти
          короткий переказ.
        </p>
        <div className="lesson22-prompt-grid">
          {listenRetellPrompts.map((q) => (
            <div key={q} className="lesson22-prompt-card lesson22-prompt-card--task">
              {q}
            </div>
          ))}
        </div>
      </section>

      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-section-head">
          <p className="page-kicker">Vocabulary</p>
          <h2>Routine verbs + useful words</h2>
          <p className="lesson22-section-desc">
            Два невеликі блоки — дієслова рутини та корисні іменники. Натисни
            картку, щоб перевернути. Прочитай кожен приклад вголос.
          </p>
        </div>

        <h3 style={{ fontSize: "1rem", marginBottom: "0.75rem" }}>
          Daily routine verbs
        </h3>
        <div className="l22-vocab-grid">
          {routineVocab.map((card, idx) => {
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
                    <em>{card.example}</em>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <h3 style={{ fontSize: "1rem", margin: "1.5rem 0 0.75rem" }}>
          Useful nouns
        </h3>
        <div className="l22-vocab-grid">
          {usefulNouns.map((card, idx) => {
            const globalIdx = routineVocab.length + idx;
            const flipped = vocabFlipped.includes(globalIdx);
            return (
              <button
                key={card.en}
                type="button"
                className={`l22-vocab-card ${flipped ? "l22-vocab-card--flipped" : ""}`}
                onClick={() => toggleVocab(globalIdx)}
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
                    <em>{card.example}</em>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        <p className="lesson22-section-desc" style={{ marginTop: "1rem" }}>
          Усього {allVocab.length} слів — достатньо для говоріння, не забагато,
          щоб запам'ятати за один урок.
        </p>
      </section>

      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-section-head">
          <p className="page-kicker">Mini writing</p>
          <h2>Your daily routine</h2>
          <p className="lesson22-section-desc">
            Напиши <strong>4–5 речень</strong> про свій типовий день. Використай
            дієслова з блоку vocabulary: wake up, get up, have breakfast, go to
            work…
          </p>
        </div>
        <div className="lesson22-prompt-grid">
          <div className="lesson22-prompt-card lesson22-prompt-card--task">
            <strong>Зразок</strong>
            I wake up at 7. I have breakfast at home. I go to work at 9. I go
            home at 6. I go to bed at 11.
          </div>
          <div className="lesson22-prompt-card lesson22-prompt-card--task">
            <strong>Додатково</strong>
            Додай одне речення з <em>can</em>: I can… / I can't…
          </div>
          <div className="lesson22-prompt-card lesson22-prompt-card--task">
            <strong>3-тя особа</strong>
            Напиши 2 речення про маму, брата або друга (he/she + -s).
          </div>
        </div>
      </section>

      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-section-head">
          <p className="page-kicker">Error hunt</p>
          <h2>Find the mistakes — About me</h2>
          <p className="lesson22-section-desc">
            Прочитай текст про Петра. У ньому є помилки граматики, лексики,
            прийменників і часу. Знайди їх <strong>самостійно</strong> — у
            зошиті або в полі нижче. Потім натисни кнопку, щоб перевірити себе.
          </p>
        </div>

        <article className="l22-error-text panel">
          <h3 className="l22-error-text-title">About me</h3>
          {petroAboutParagraphs.map((para) => (
            <p key={para.slice(0, 24)}>{para}</p>
          ))}
        </article>

        <div className="l22-error-notes">
          <label htmlFor="petro-mistakes-notes">
            Твої знайдені помилки (необов'язково)
          </label>
          <textarea
            id="petro-mistakes-notes"
            value={petroNotes}
            onChange={(e) => setPetroNotes(e.target.value)}
            placeholder={"1. I is → I am\n2. in the website → on the website\n..."}
            spellCheck={false}
          />
        </div>

        <div className="ss-actions">
          <button
            type="button"
            className="l22-btn"
            onClick={() => setShowPetroKey(true)}
          >
            I've finished — show answer key
          </button>
          <button
            type="button"
            className="l22-btn l22-btn--ghost"
            onClick={() => {
              setShowPetroKey(false);
              setPetroNotes("");
            }}
          >
            Reset
          </button>
        </div>

        {showPetroKey && (
          <div className="l22-error-key">
            <p className="l22-score">
              Answer key — {petroMistakeKey.length} mistakes to find
            </p>
            <ol className="l22-error-key-list">
              {petroMistakeKey.map((item) => (
                <li key={item.wrong}>
                  <span className="l22-error-key-wrong">{item.wrong}</span>
                  <span className="l22-error-key-arrow">→</span>
                  <span className="l22-error-key-fix">{item.fix}</span>
                  <span className="l22-error-key-tag">{item.tag}</span>
                </li>
              ))}
            </ol>
            <p className="lesson22-section-desc" style={{ marginTop: "1rem" }}>
              Перепиши текст правильно в 8–10 реченнях — як домашнє завдання або
              в кінці уроку.
            </p>
          </div>
        )}
      </section>

      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-section-head">
          <p className="page-kicker">Homework</p>
          <h2>After class</h2>
        </div>
        <div className="l22-homework-grid">
          <div className="l22-homework-card">
            <h3>About me</h3>
            <ul>
              <li>
                Напиши 5–7 речень про себе (ім'я, вік, місто, хобі…).
              </li>
              <li>
                Письмово відповідай на усі 10 англійських питань з уроку.
              </li>
            </ul>
          </div>
          <div className="l22-homework-card">
            <h3>Routine + can</h3>
            <ul>
              <li>Напиши 4–5 речень про свою щоденну рутину.</li>
              <li>
                Напиши 3 речення з can і 2 з can't про реальні вміння.
              </li>
            </ul>
          </div>
          <div className="l22-homework-card">
            <h3>Listen + speak</h3>
            <ul>
              <li>Перепиши текст Петра правильно (8–10 речень).</li>
              <li>Ще раз пройди тест Test-English з listening.</li>
              <li>
                Голосове повідомлення: опиши себе та свою рутину (1 хвилина).
              </li>
            </ul>
          </div>
        </div>
        <div
          style={{
            marginTop: "1.25rem",
            display: "flex",
            gap: "0.75rem",
            flexWrap: "wrap",
          }}
        >
          <Link className="lesson22-back-link" to="/trainer">
            Open trainer
          </Link>
          <Link
            className="lesson22-back-link lesson22-back-link--ghost"
            to="/homework/22"
          >
            Homework page
          </Link>
        </div>
      </section>
    </div>
  );
}
