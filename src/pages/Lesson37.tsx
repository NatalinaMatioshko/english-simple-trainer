import { Link } from "react-router-dom";
import LessonNumberKicker from "../components/LessonNumberKicker";
import Lesson31Figure from "../components/lesson31/Lesson31Figure";
import "../styles/lesson22.css";
import "../styles/lesson25.css";
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

const SIMPLE_MARKERS = [
  { marker: "every day", model: "I work every day." },
  { marker: "usually", model: "I usually eat." },
  { marker: "often", model: "I often read." },
  { marker: "always", model: "I always sit." },
  { marker: "sometimes", model: "I sometimes talk." },
  { marker: "never", model: "I never drink coffee." },
] as const;

const NOW_MARKERS = [
  { marker: "now", model: "I am working now." },
  { marker: "right now", model: "I am talking right now." },
  { marker: "at the moment", model: "I am sitting at the moment." },
  { marker: "today", model: "I am reading today." },
] as const;

const IMG37 = (file: string) =>
  `${import.meta.env.BASE_URL}images/lesson37/${file}`;

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
              to="/hw-37"
            >
              HW37 →
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
          <span>every day · usually</span>
          <span>now · right now</span>
        </div>
      </section>

      <section className="lesson22-block panel">
        <div className="lesson22-flow">
          <a href="#l37-contrast">1 Contrast</a>
          <a href="#l37-words">2 Words</a>
          <a href="#l37-markers">3 Markers</a>
          <a href="#l37-same">4 Same verb</a>
          <a href="#l37-ask">5 Ask</a>
          <a href="#l37-look">6 Now</a>
          <a href="#l37-pics">7 Pictures</a>
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
            <strong>Remember.</strong> every day / usually / often → Present
            Simple. now / right now / at the moment → am / is / are +{" "}
            <em>-ing</em>.
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

      <section id="l37-markers" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">3 · Speak</p>
          <h2>Time markers</h2>
          <p className="lesson22-section-desc">
            Take turns with your teacher. Викладач каже маркер — ти кажеш
            речення з одним із шести дієслів.
          </p>
        </div>
        <div className="l31-figure-row">
          <div className="l25-conf-card" style={{ flex: 1 }}>
            <div className="l25-conf-header">every day</div>
            <div className="l25-conf-fields">
              <p
                style={{
                  margin: 0,
                  fontSize: "var(--text-sm)",
                  lineHeight: 1.55,
                }}
              >
                <strong>every day</strong> · <strong>usually</strong> ·{" "}
                <strong>often</strong> · <strong>always</strong> ·{" "}
                <strong>sometimes</strong> · <strong>never</strong>
              </p>
            </div>
          </div>
          <div className="l25-conf-card" style={{ flex: 1 }}>
            <div className="l25-conf-header">now</div>
            <div className="l25-conf-fields">
              <p
                style={{
                  margin: 0,
                  fontSize: "var(--text-sm)",
                  lineHeight: 1.55,
                }}
              >
                <strong>now</strong> · <strong>right now</strong> ·{" "}
                <strong>at the moment</strong> · <strong>today</strong>
              </p>
            </div>
          </div>
        </div>
        <p className="lesson22-section-desc" style={{ marginTop: "1rem" }}>
          usually / often / always / sometimes / never — перед дієсловом. every
          day — в кінці.
        </p>
        <div className="lesson22-prompt-grid">
          {[...SIMPLE_MARKERS, ...NOW_MARKERS].map((item) => (
            <div
              key={item.marker}
              className="lesson22-prompt-card lesson22-prompt-card--task"
            >
              <strong>{item.marker}</strong>
              <br />
              {item.model}
            </div>
          ))}
        </div>
        <blockquote className="l23-rule-quote" style={{ marginTop: "1rem" }}>
          <p>
            <strong>Model.</strong> Teacher: <em>usually</em> You:{" "}
            <em>I usually read.</em>
            <br />
            Teacher: <em>right now</em> You: <em>I am sitting right now.</em>
          </p>
        </blockquote>
      </section>

      <section id="l37-same" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">4 · Speak</p>
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
          <p className="page-kicker">5 · Speak</p>
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
          <p className="page-kicker">6 · Speak</p>
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

      <section id="l37-pics" className="lesson22-block panel">
        <div className="lesson22-section-head">
          <p className="page-kicker">7 · Pictures</p>
          <h2>Look and speak</h2>
          <p className="lesson22-section-desc">
            Дві картки в ряд — натисни, щоб збільшити. Ліва: відповідай
            викладачу на питання. Права: скажи 10 речень про зараз (am / is /
            are + -ing).
          </p>
        </div>
        <div className="l31-figure-row">
          <Lesson31Figure
            src={IMG37("speaking-card.png")}
            alt="Speaking card: a family cooking in the kitchen. Questions: Where are the people? What are they doing? What food can you see?"
            caption="Speaking card · tap to zoom"
            variant="worksheet"
          />
          <Lesson31Figure
            src={IMG37("present-continuous.jpg")}
            alt="Present continuous worksheet: ten pictures — play football, sing, read, jump, make a cake, play guitar, cook, ride a bike, fly, make a snowman"
            caption="Present continuous · tap to zoom"
            variant="worksheet"
          />
        </div>
        <blockquote className="l23-rule-quote" style={{ marginTop: "1rem" }}>
          <p>
            <strong>Speak with your teacher.</strong> Full sentences. Left:{" "}
            <em>They are in the kitchen. They are cooking.</em> Right:{" "}
            <em>They are playing football. She is reading a book.</em>
            <br />
            Then contrast: <em>I cook every day. They are cooking now.</em>
          </p>
        </blockquote>
      </section>

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
          <li>
            Use a marker: usually / often / right now / at the moment.
          </li>
        </ul>
        <div className="l25-cr-actions" style={{ marginTop: "1rem" }}>
          <Link className="l22-check-btn" to="/hw-37">
            HW37
          </Link>
          <Link className="l25-cr-mini-btn" to="/vocab">
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
