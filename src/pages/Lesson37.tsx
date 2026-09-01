import { Link } from "react-router-dom";
import LessonNumberKicker from "../components/LessonNumberKicker";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
import "../styles/lesson26.css";
import "../styles/lesson31.css";

const VERBS = [
  { base: "work", ing: "working" },
  { base: "eat", ing: "eating" },
  { base: "drink", ing: "drinking" },
  { base: "read", ing: "reading" },
  { base: "talk", ing: "talking" },
  { base: "sit", ing: "sitting" },
] as const;

const ASK = [
  "What do you do every day?",
  "What are you doing now?",
  "What do I do every day? (ask your teacher)",
  "What am I doing now? (ask your teacher)",
] as const;

const LOOK = [
  "I'm sitting.",
  "You're talking.",
  "We're speaking English.",
  "I'm not eating. I'm talking.",
] as const;

const LINKS = [
  {
    id: "days",
    kicker: "Extra 1 · Vocabulary",
    title: "Days, months and seasons",
    desc: "Відкрий сторінку, прочитай слова (дні, місяці, пори року) і зроби всі vocabulary exercises. Потім скажи викладачу: який сьогодні день, який місяць і яка пора року.",
    href: "https://test-english.com/vocabulary/a1/days-months-seasons-a1-english-vocabulary/",
    label: "Days, months and seasons — A1 Vocabulary ↗",
    speak: "Today is … . It's … (month). It's … (season).",
  },
  {
    id: "adj",
    kicker: "Extra 2 · Grammar",
    title: "Adjectives",
    desc: "Прочитай правило про прикметники (a big house, The house is big) і виконай усі grammar exercises на сторінці. Потім опиши 3 речі в кімнаті прикметниками.",
    href: "https://test-english.com/grammar-points/a1/adjectives/",
    label: "Adjectives — A1 Grammar ↗",
    speak: "This is a … room. The chair is … . My bag is … .",
  },
  {
    id: "this",
    kicker: "Extra 3 · Grammar",
    title: "this / that / these / those",
    desc: "Прочитай правило (this/these — близько, that/those — далеко) і виконай усі 3 grammar exercises. Потім покажи викладачу предмети: this book, that window, these pens, those chairs.",
    href: "https://test-english.com/grammar-points/a1/this-that-these-those/",
    label: "this / that / these / those — A1 Grammar ↗",
    speak: "This is … . That is … . These are … . Those are … .",
  },
  {
    id: "pc",
    kicker: "Extra 4 · Grammar",
    title: "Present continuous",
    desc: "Після говоріння — коротка практика на сайті. Прочитай am / is / are + -ing і виконай exercises. Не розтягуй це на весь урок.",
    href: "https://test-english.com/grammar-points/a1/present-continuous/",
    label: "Present continuous — A1 Grammar ↗",
    speak: "I'm sitting. You're talking. He's/She's … . It's raining / the sun is shining.",
  },
  {
    id: "pspc",
    kicker: "Extra 5 · Grammar",
    title: "Present simple or Present continuous?",
    desc: "Перевір контраст every day / now на Test-English. Потім ще раз скажи викладачу 2 речення про рутину і 2 про зараз.",
    href: "https://test-english.com/grammar-points/a1/present-simple-present-continuous/",
    label: "Present simple or Present continuous? — A1 Grammar ↗",
    speak: "I usually drink coffee in the morning. Right now I'm talking to my teacher.",
  },
] as const;

export default function Lesson37() {
  return (
    <div className="lesson22-page">
      <section className="lesson22-hero panel">
        <div className="lesson22-hero-top">
          <div>
            <LessonNumberKicker number={37} />
            <h1>Present continuous · now vs every day</h1>
            <p className="lesson22-topic-pill">
              I work every day · I am working now
            </p>
            <p className="lesson22-subtitle">
              Не ще один перевантажений grammar-блок. Мало слів, багато
              говоріння з викладачем, чіткий контраст.
            </p>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <Link className="lesson22-back-link" to="/lessons">
              ← Back to lessons
            </Link>
            <Link
              className="lesson22-back-link lesson22-back-link--ghost"
              to="/lesson-36"
            >
              ← Lesson 36
            </Link>
            <Link
              className="lesson22-back-link lesson22-back-link--ghost"
              to="/vocab"
            >
              Vocab →
            </Link>
          </div>
        </div>
        <div className="lesson22-hero-chips">
          <span>work / working</span>
          <span>eat / eating</span>
          <span>every day</span>
          <span>now</span>
        </div>
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-flow">
          <a href="#l37-contrast">1 Contrast</a>
          <a href="#l37-words">2 Words</a>
          <a href="#l37-same">3 Same verb</a>
          <a href="#l37-ask">4 Ask</a>
          <a href="#l37-look">5 Now</a>
          <a href="#l37-extra">Extra</a>
          <a href="#l37-exit">Exit</a>
        </div>
      </section>

      <section id="l37-contrast" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">1 · Contrast</p>
          <h2>Every day or now?</h2>
          <p className="lesson22-section-desc">
            Прочитай два речення вголос. Потім скажи їх викладачу.
          </p>
        </div>
        <div className="l31-figure-row">
          <div className="l25-conf-card" style={{ flex: 1 }}>
            <div className="l25-conf-header">every day</div>
            <div className="l25-conf-fields">
              <p style={{ margin: 0, fontSize: "1.15rem", lineHeight: 1.45 }}>
                I <strong>work</strong> every day.
              </p>
            </div>
          </div>
          <div className="l25-conf-card" style={{ flex: 1 }}>
            <div className="l25-conf-header">now</div>
            <div className="l25-conf-fields">
              <p style={{ margin: 0, fontSize: "1.15rem", lineHeight: 1.45 }}>
                I <strong>am working</strong> now.
              </p>
            </div>
          </div>
        </div>
        <blockquote className="l23-rule-quote" style={{ marginTop: "1rem" }}>
          <p>
            <strong>Remember.</strong> every day → Present Simple. now → am / is
            / are + <em>-ing</em>.
          </p>
        </blockquote>
      </section>

      <section id="l37-words" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">2 · Tiny vocabulary</p>
          <h2>Six verbs only</h2>
          <p className="lesson22-section-desc">
            Прочитай слово і форму <em>-ing</em>. Цього досить на весь урок.
          </p>
        </div>
        <div className="lesson22-prompt-grid">
          {VERBS.map((v) => (
            <div key={v.base} className="lesson22-prompt-card">
              <strong>{v.base}</strong> → {v.ing}
            </div>
          ))}
        </div>
      </section>

      <section id="l37-same" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">3 · Speak</p>
          <h2>The same verb twice</h2>
          <p className="lesson22-section-desc">
            Take turns with your teacher. Для кожного дієслова скажи{" "}
            <strong>два</strong> речення.
          </p>
        </div>
        <div className="lesson22-prompt-grid">
          {VERBS.map((v) => (
            <div
              key={v.base}
              className="lesson22-prompt-card lesson22-prompt-card--task"
            >
              I {v.base} every day.
              <br />
              I am {v.ing} now.
            </div>
          ))}
        </div>
        <blockquote className="l23-rule-quote" style={{ marginTop: "1rem" }}>
          <p>
            <strong>Model.</strong> You: <em>I drink every day. I am drinking now.</em>{" "}
            Teacher: <em>I talk every day. I am talking now.</em>
          </p>
        </blockquote>
      </section>

      <section id="l37-ask" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">4 · Speak</p>
          <h2>Ask and answer with your teacher</h2>
          <p className="lesson22-section-desc">
            Прочитай питання вголос і відповідай правдою. Потім запитай
            викладача.
          </p>
        </div>
        <div className="lesson22-prompt-grid">
          {ASK.map((q) => (
            <div
              key={q}
              className="lesson22-prompt-card lesson22-prompt-card--task"
            >
              {q}
            </div>
          ))}
        </div>
        <blockquote className="l23-rule-quote" style={{ marginTop: "1rem" }}>
          <p>
            <strong>Model.</strong> Teacher:{" "}
            <em>What do you do every day?</em> You:{" "}
            <em>I work every day. I read every day.</em>
            <br />
            Teacher: <em>What are you doing now?</em> You:{" "}
            <em>I am sitting. I am talking.</em>
          </p>
        </blockquote>
      </section>

      <section id="l37-look" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">5 · Speak</p>
          <h2>Look around · now</h2>
          <p className="lesson22-section-desc">
            Подивись на себе і на викладача. Скажи, що відбувається{" "}
            <strong>зараз</strong>.
          </p>
        </div>
        <div className="lesson22-prompt-grid">
          {LOOK.map((s) => (
            <div key={s} className="lesson22-prompt-card">
              {s}
            </div>
          ))}
        </div>
        <blockquote className="l23-rule-quote" style={{ marginTop: "1rem" }}>
          <p>
            <strong>Then contrast.</strong>{" "}
            <em>I sit at my desk every day. I am sitting now.</em>
          </p>
        </blockquote>
      </section>

      <section id="l37-extra" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Extra · Test-English</p>
          <h2>Practice after speaking</h2>
          <p className="lesson22-section-desc">
            Якщо лишився час або як домашня практика: відкрий посилання, зроби
            вправи, потім коротко скажи викладачу.
          </p>
        </div>
      </section>

      {LINKS.map((item) => (
        <section
          key={item.id}
          id={`l37-${item.id}`}
          className="lesson22-block panel"
        >
          <div className="lesson22-section-head">
            <p className="page-kicker">{item.kicker}</p>
            <h2>{item.title}</h2>
            <p className="lesson22-section-desc">{item.desc}</p>
          </div>
          <article className="l26-hw-link-card">
            <a
              className="l22-external-link"
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.label}
            </a>
          </article>
          <blockquote className="l23-rule-quote" style={{ marginTop: "1rem" }}>
            <p>
              <strong>Speak with your teacher.</strong> <em>{item.speak}</em>
            </p>
          </blockquote>
        </section>
      ))}

      <section id="l37-exit" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">Exit check</p>
          <h2>Can you…?</h2>
        </div>
        <ul className="l22-goals-list">
          <li>
            Say the contrast: I work every day. I am working now.
          </li>
          <li>Do the same with 3 more verbs (eat, drink, read, talk, sit).</li>
          <li>Ask your teacher: What are you doing now?</li>
          <li>Answer: What do you do every day?</li>
        </ul>
        <div className="l25-cr-actions" style={{ marginTop: "1rem" }}>
          <Link className="l22-check-btn" to="/vocab">
            Vocab
          </Link>
          <Link className="l25-cr-mini-btn" to="/trainer">
            Trainer
          </Link>
          <Link className="l25-cr-mini-btn" to="/lesson-36">
            ← Lesson 36
          </Link>
          <Link className="l25-cr-mini-btn" to="/lessons">
            All lessons →
          </Link>
        </div>
      </section>
    </div>
  );
}
