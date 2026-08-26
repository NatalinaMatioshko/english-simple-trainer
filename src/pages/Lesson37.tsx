import { Link } from "react-router-dom";
import LessonNumberKicker from "../components/LessonNumberKicker";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
import "../styles/lesson26.css";

const LINKS = [
  {
    id: "days",
    kicker: "1 · Vocabulary",
    title: "Days, months and seasons",
    desc: "Відкрий сторінку, прочитай слова (дні, місяці, пори року) і зроби всі vocabulary exercises. Потім скажи викладачу: який сьогодні день, який місяць і яка пора року.",
    href: "https://test-english.com/vocabulary/a1/days-months-seasons-a1-english-vocabulary/",
    label: "Days, months and seasons — A1 Vocabulary ↗",
    speak: "Today is … . It's … (month). It's … (season).",
  },
  {
    id: "adj",
    kicker: "2 · Grammar",
    title: "Adjectives",
    desc: "Прочитай правило про прикметники (a big house, The house is big) і виконай усі grammar exercises на сторінці. Потім опиши 3 речі в кімнаті прикметниками.",
    href: "https://test-english.com/grammar-points/a1/adjectives/",
    label: "Adjectives — A1 Grammar ↗",
    speak: "This is a … room. The chair is … . My bag is … .",
  },
  {
    id: "this",
    kicker: "3 · Grammar",
    title: "this / that / these / those",
    desc: "Прочитай правило (this/these — близько, that/those — далеко) і виконай усі 3 grammar exercises. Потім покажи викладачу предмети: this book, that window, these pens, those chairs.",
    href: "https://test-english.com/grammar-points/a1/this-that-these-those/",
    label: "this / that / these / those — A1 Grammar ↗",
    speak: "This is … . That is … . These are … . Those are … .",
  },
  {
    id: "pc",
    kicker: "4 · Grammar",
    title: "Present continuous",
    desc: "Прочитай правило am / is / are + -ing і виконай усі grammar exercises. Потім скажи 4 речення про зараз: що робиш ти, викладач і що відбувається за вікном.",
    href: "https://test-english.com/grammar-points/a1/present-continuous/",
    label: "Present continuous — A1 Grammar ↗",
    speak: "I'm sitting. You're talking. He's/She's … . It's raining / the sun is shining.",
  },
  {
    id: "pspc",
    kicker: "5 · Grammar",
    title: "Present simple or Present continuous?",
    desc: "Прочитай, чим відрізняються Present Simple (рутина) і Present continuous (зараз). Виконай усі grammar exercises. Потім скажи викладачу 2 речення про рутину і 2 про зараз.",
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
            <h1>Review · Test-English practice</h1>
            <p className="lesson22-topic-pill">
              days · adjectives · this/that · Present continuous · simple vs continuous
            </p>
            <p className="lesson22-subtitle">
              Відкрий кожне посилання, зроби вправи на Test-English, потім
              розкажи викладачу короткі речення.
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
          <span>Monday / January / summer</span>
          <span>a big house</span>
          <span>this / that</span>
          <span>I&apos;m sitting</span>
          <span>usually vs now</span>
        </div>
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-flow">
          <a href="#l37-days">1 Days</a>
          <a href="#l37-adj">2 Adjectives</a>
          <a href="#l37-this">3 this / that</a>
          <a href="#l37-pc">4 Present continuous</a>
          <a href="#l37-pspc">5 Simple vs continuous</a>
          <a href="#l37-exit">Exit</a>
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
          <li>Say today&apos;s day, month and season.</li>
          <li>Describe 3 things with adjectives.</li>
          <li>Use this / that / these / those with real objects.</li>
          <li>Make 3 Present continuous sentences about now.</li>
          <li>Say one habit (Present Simple) and one action now (Present continuous).</li>
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
