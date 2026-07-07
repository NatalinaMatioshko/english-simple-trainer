import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/lesson22.css";
import "../styles/lesson19.css";

const LISTENING_TEST_URL =
  "https://test-english.com/listening/a1/how-often-do-you-a1-english-listening-test/";

const YOUTUBE_VIDEO_ID = "uX8Wl75kGm8";

const warmUpPrompts = [
  "How do you feel today?",
  "What did you do this morning?",
  "Is today a busy day or a quiet day?",
  "Say one thing you want to do after the lesson.",
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
  "What time does the person get up?",
  "What do they do in the morning?",
  "Where do they go after breakfast?",
  "What do they do in the evening?",
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
  const [canChoose, setCanChoose] = useState<Record<number, string>>({});
  const [showCanChoose, setShowCanChoose] = useState(false);

  const allVocab = [...routineVocab, ...usefulNouns];

  const toggleVocab = (idx: number) =>
    setVocabFlipped((p) =>
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
              <li>short listening + 1–2 нові словникові блоки.</li>
            </ul>
          </div>
          <div className="lesson22-nav">
            <Link className="lesson22-back-link" to="/">
              ← Roadmap
            </Link>
            <Link
              className="lesson22-back-link lesson22-back-link--ghost"
              to="/lessons"
            >
              All lessons
            </Link>
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
          <span>5 Listening</span>
          <span>6 Vocabulary</span>
          <span>7 Mini writing</span>
        </div>
        <p className="lesson22-section-desc">
          Sequence: <strong>speak → drill → describe yourself → listen → write</strong>{" "}
          — so grammar becomes natural speech about real life.
        </p>
      </section>

      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-section-head">
          <p className="page-kicker">Warm-up</p>
          <h2>Talk about the day</h2>
          <p className="lesson22-section-desc">
            Відповідай вголос англійською. Скажи, як ти себе почуваєш і що вже
            зробила сьогодні.
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
            Transform I → he/she or answer with can. Tap to check the model
            answer after you speak.
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

        <h3 style={{ marginTop: "1.5rem", fontSize: "1rem" }}>Can — choose the word</h3>
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
          Model start: <em>My name is… I'm … years old. I'm from… I live in…</em>
        </p>
      </section>

      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-section-head">
          <p className="page-kicker">Speaking</p>
          <h2>Question practice</h2>
          <p className="lesson22-section-desc">
            Answer each question out loud. Notice the grammar tag — to be, Present
            Simple, or third person -s.
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
              Test-English — adverbs of frequency and daily routines. Open in a
              new tab, complete the tasks, then return here.
            </p>
          </a>
        </div>

        <h3 className="l22-listen-subtitle">Retell in 3–4 sentences</h3>
        <p className="lesson22-section-desc">
          After listening, answer these prompts out loud to build your short
          retell.
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
            Два невеликі блоки — дієслова рутини та корисні іменники. Tap a
            card to flip. Read each example aloud.
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
          {allVocab.length} words total — enough for speaking, not too many to
          remember in one lesson.
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
            <strong>Model</strong>
            I wake up at 7. I have breakfast at home. I go to work at 9. I go
            home at 6. I go to bed at 11.
          </div>
          <div className="lesson22-prompt-card lesson22-prompt-card--task">
            <strong>Extra</strong>
            Add one sentence with <em>can</em>: I can… / I can't…
          </div>
          <div className="lesson22-prompt-card lesson22-prompt-card--task">
            <strong>Third person</strong>
            Write 2 sentences about your mother, brother, or friend (he/she +
            -s).
          </div>
        </div>
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
              <li>Write 5–7 sentences describing yourself (name, age, city, hobbies…).</li>
              <li>Answer all 10 English questions from the lesson in writing.</li>
            </ul>
          </div>
          <div className="l22-homework-card">
            <h3>Routine + can</h3>
            <ul>
              <li>Write 4–5 sentences about your daily routine.</li>
              <li>Write 3 can and 2 can't sentences about real abilities.</li>
            </ul>
          </div>
          <div className="l22-homework-card">
            <h3>Listen + speak</h3>
            <ul>
              <li>Complete the Test-English listening test again.</li>
              <li>Voice message: describe yourself + your routine (1 minute).</li>
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
