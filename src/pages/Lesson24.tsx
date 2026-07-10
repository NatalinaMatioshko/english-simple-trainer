import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/lesson22.css";

const YOUTUBE_VIDEO_ID = "nZLNps2qsNk";

const warmUpPrompts = [
  "Опиши себе в 3 реченнях: вік, зовнішність, характер.",
  "Опиши свого друга: he/she + is / has got.",
  "Як виглядає твій брат або сестра?",
  "Скажи 3 прикметники про людину, яку знаєш.",
];

const appearanceVocab = [
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

export default function Lesson24() {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const [vocabFlipped, setVocabFlipped] = useState<number[]>([]);

  const toggleVocab = (idx: number) =>
    setVocabFlipped((p) =>
      p.includes(idx) ? p.filter((x) => x !== idx) : [...p, idx],
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
              Appearance + personality + has got / is
            </p>
            <p className="lesson22-subtitle">
              Learn words for appearance and character, watch the video, then
              describe people in full sentences — how they look and what they are
              like.
            </p>
            <ul className="l22-goals-list">
              <li>прикметники для зовнішності й характеру;</li>
              <li>is / has got у описі людей;</li>
              <li>відео + speaking про людину з фото або з життя.</li>
            </ul>
          </div>
        </div>
        <div className="lesson22-hero-chips">
          <span>She is tall</span>
          <span>He has got glasses</span>
          <span>friendly</span>
          <span>dark hair</span>
          <span>quiet</span>
          <span>funny</span>
        </div>
      </section>

      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-flow">
          <span>1 Warm-up</span>
          <span>2 Video</span>
          <span>3 Vocabulary</span>
          <span>4 Models</span>
          <span>5 Speaking</span>
        </div>
        <p className="lesson22-section-desc">
          Послідовність:{" "}
          <strong>відео → слова → зразки → опис вголос</strong>.
        </p>
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
      </section>

      <section className="lesson22-block panel reveal-on-scroll">
        <div className="lesson22-section-head">
          <p className="page-kicker">Vocabulary</p>
          <h2>Appearance & personality</h2>
          <p className="lesson22-section-desc">
            Прикметники та слова для опису людей. Натисни картку, щоб
            перевернути, і прочитай вголос.
          </p>
        </div>
        <div className="l22-vocab-grid">
          {appearanceVocab.map((card, idx) => {
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
            Відповідай на кожне питання вголос. Зверни увагу на мітку — appearance,
            to be або has got.
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
            Напиши 6–8 речень про людину, яку добре знаєш: зовнішність + характер
            (is / has got).
          </p>
        </div>
        <Link className="lesson22-back-link" to="/homework">
          Homework page
        </Link>
      </section>
    </div>
  );
}
