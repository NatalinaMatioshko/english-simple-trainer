import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/lesson18.css";

type FlashcardItem = {
  id: number;
  image: string;
  frontAlt: string;
  back: string;
  type: "time" | "place" | "movement";
};

type SortItem = {
  text: string;
  answer: "in" | "on" | "at";
};

type ChooseItem = {
  sentence: string;
  options: ("in" | "on" | "at" | "to")[];
  answer: "in" | "on" | "at" | "to";
};

type SpeakingPrompt = {
  id: number;
  start: string;
  hint: string;
};

type TfItem = {
  sentence: string;
  answer: boolean;
};

type PairCard = {
  id: number;
  text: string;
  pairKey: string;
};

const IMG_BASE = `${import.meta.env.BASE_URL}images/`;

const getImagePath = (fileName: string) => `${IMG_BASE}${fileName}`;

const flashcards: FlashcardItem[] = [
  {
    id: 1,
    image: "in-the-box.jpg",
    frontAlt: "A toy or object in a box",
    back: "in the box",
    type: "place",
  },
  {
    id: 2,
    image: "on-the-table.jpg",
    frontAlt: "A book or object on a table",
    back: "on the table",
    type: "place",
  },
  {
    id: 3,
    image: "at-school.jpg",
    frontAlt: "A student at school",
    back: "at school",
    type: "place",
  },
  {
    id: 4,
    image: "in-june.jpg",
    frontAlt: "A June calendar image",
    back: "in June",
    type: "time",
  },
  {
    id: 5,
    image: "on-monday.jpg",
    frontAlt: "A Monday calendar image",
    back: "on Monday",
    type: "time",
  },
  {
    id: 6,
    image: "at-7-oclock.jpg",
    frontAlt: "A clock showing seven o’clock",
    back: "at 7 o’clock",
    type: "time",
  },
  {
    id: 7,
    image: "in-on-under.png",
    frontAlt: "Extra lesson flashcard image 1",
    back: "Look and say the phrase",
    type: "place",
  },
  {
    id: 8,
    image: "4-oclock.png",
    frontAlt: "Extra lesson flashcard image 2",
    back: "Look and say the phrase",
    type: "place",
  },
];

const sortItems: SortItem[] = [
  { text: "the morning", answer: "in" },
  { text: "June", answer: "in" },
  { text: "2025", answer: "in" },
  { text: "Monday", answer: "on" },
  { text: "Friday", answer: "on" },
  { text: "my birthday", answer: "on" },
  { text: "7 o’clock", answer: "at" },
  { text: "night", answer: "at" },
  { text: "the weekend", answer: "at" },
];

const chooseItems: ChooseItem[] = [
  {
    sentence: "I wake up ___ 7 o’clock.",
    options: ["in", "on", "at", "to"],
    answer: "at",
  },
  {
    sentence: "I go to the gym ___ Monday.",
    options: ["in", "on", "at", "to"],
    answer: "on",
  },
  {
    sentence: "My mom works ___ a shop.",
    options: ["in", "on", "at", "to"],
    answer: "at",
  },
  {
    sentence: "We have breakfast ___ the morning.",
    options: ["in", "on", "at", "to"],
    answer: "in",
  },
  {
    sentence: "I go ___ work at 9.",
    options: ["in", "on", "at", "to"],
    answer: "to",
  },
  {
    sentence: "They live ___ Kyiv.",
    options: ["in", "on", "at", "to"],
    answer: "in",
  },
];

const speakingPrompts: SpeakingPrompt[] = [
  { id: 1, start: "I go to work at 9.", hint: "Say your real time." },
  { id: 2, start: "I’m in Kyiv.", hint: "Change the city if you want." },
  { id: 3, start: "I study on Monday.", hint: "Say your real study/work day." },
  {
    id: 4,
    start: "I have breakfast in the morning.",
    hint: "Add one more routine action.",
  },
  {
    id: 5,
    start: "I go to the gym on Friday.",
    hint: "Change the day or place.",
  },
  { id: 6, start: "I’m at home at night.", hint: "Make your own sentence." },
];

const tfItems: TfItem[] = [
  { sentence: "We say: at Monday.", answer: false },
  { sentence: "We say: in June.", answer: true },
  { sentence: "We say: at 7 o’clock.", answer: true },
  { sentence: "We say: on the morning.", answer: false },
  { sentence: "We say: to work.", answer: true },
  { sentence: "We say: in school for this lesson target.", answer: false },
];

const pictureQa = [
  {
    image: "in-the-box.jpg",
    q: "Where is the object?",
    a: "It is in the box.",
  },
  {
    image: "on-the-table.jpg",
    q: "Where is the object?",
    a: "It is on the table.",
  },
  {
    image: "at-school.jpg",
    q: "Where is the student?",
    a: "The student is at school.",
  },
];

const raceItems = [
  { prompt: "___ 7 o’clock", answer: "at" },
  { prompt: "___ Monday", answer: "on" },
  { prompt: "___ June", answer: "in" },
  { prompt: "go ___ work", answer: "to" },
  { prompt: "___ home", answer: "at" },
  { prompt: "___ the morning", answer: "in" },
];

const pairCardsBase: PairCard[] = [
  { id: 1, text: "in", pairKey: "in-june" },
  { id: 2, text: "June", pairKey: "in-june" },
  { id: 3, text: "on", pairKey: "on-monday" },
  { id: 4, text: "Monday", pairKey: "on-monday" },
  { id: 5, text: "at", pairKey: "at-7" },
  { id: 6, text: "7 o’clock", pairKey: "at-7" },
  { id: 7, text: "to", pairKey: "to-work" },
  { id: 8, text: "work", pairKey: "to-work" },
];

function shuffle<T>(array: T[]) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function Lesson18() {
  const pageRef = useRef<HTMLDivElement | null>(null);

  const [sortSelected, setSortSelected] = useState<
    Record<string, "in" | "on" | "at" | "">
  >(Object.fromEntries(sortItems.map((item) => [item.text, ""])));

  const [chooseSelected, setChooseSelected] = useState<Record<number, string>>(
    {},
  );
  const [showChooseAnswers, setShowChooseAnswers] = useState(false);

  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  const [tfSelected, setTfSelected] = useState<Record<number, boolean | null>>(
    {},
  );
  const [showTfAnswers, setShowTfAnswers] = useState(false);

  const [pairCards, setPairCards] = useState<PairCard[]>(() =>
    shuffle(pairCardsBase),
  );
  const [selectedPairIds, setSelectedPairIds] = useState<number[]>([]);
  const [matchedPairKeys, setMatchedPairKeys] = useState<string[]>([]);

  useEffect(() => {
    const cards = pageRef.current?.querySelectorAll(".reveal-on-scroll");
    if (!cards) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.14 },
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  const sortScore = useMemo(() => {
    return sortItems.filter((item) => sortSelected[item.text] === item.answer)
      .length;
  }, [sortSelected]);

  const chooseScore = useMemo(() => {
    return chooseItems.filter(
      (item, index) => chooseSelected[index] === item.answer,
    ).length;
  }, [chooseSelected]);

  const tfScore = useMemo(() => {
    return tfItems.filter((item, index) => tfSelected[index] === item.answer)
      .length;
  }, [tfSelected]);

  const toggleFlip = (id: number) => {
    setFlippedCards((prev) =>
      prev.includes(id)
        ? prev.filter((cardId) => cardId !== id)
        : [...prev, id],
    );
  };

  const handlePairClick = (card: PairCard) => {
    if (matchedPairKeys.includes(card.pairKey)) return;
    if (selectedPairIds.includes(card.id)) return;
    if (selectedPairIds.length === 2) return;

    const nextSelected = [...selectedPairIds, card.id];
    setSelectedPairIds(nextSelected);

    if (nextSelected.length === 2) {
      const first = pairCards.find((item) => item.id === nextSelected[0]);
      const second = pairCards.find((item) => item.id === nextSelected[1]);

      if (first && second && first.pairKey === second.pairKey) {
        setMatchedPairKeys((prev) => [...prev, first.pairKey]);
      }

      setTimeout(() => setSelectedPairIds([]), 600);
    }
  };

  const resetPairs = () => {
    setPairCards(shuffle(pairCardsBase));
    setSelectedPairIds([]);
    setMatchedPairKeys([]);
  };

  return (
    <div className="lesson18-page" ref={pageRef}>
      <section className="lesson18-hero panel reveal-on-scroll is-visible">
        <div className="lesson18-hero-top">
          <div>
            <p className="page-kicker">Lesson 18</p>
            <h1>in / on / at / to</h1>
            <p className="lesson18-subtitle">
              Practice prepositions in time, place, and movement through
              pictures, short choices, and speaking about your real routine.
            </p>

            <div className="lesson18-hero-image">
              <img
                src={getImagePath("images8.png")}
                alt="Lesson 18 visual introduction"
              />
            </div>
          </div>

          <Link to="/" className="lesson18-back-link">
            ← Back to roadmap
          </Link>
        </div>

        <div className="lesson18-hero-chips">
          <span>at 7 o’clock</span>
          <span>in June</span>
          <span>on Monday</span>
          <span>at school</span>
          <span>to work</span>
        </div>
      </section>

      <section className="panel lesson18-block reveal-on-scroll">
        <div className="lesson18-section-head">
          <h2>Quick start</h2>
          <p>Answer the questions out loud.</p>
        </div>

        <div className="lesson18-prompt-grid">
          <div className="lesson18-prompt-card">How are you today?</div>
          <div className="lesson18-prompt-card">What time do you wake up?</div>
          <div className="lesson18-prompt-card">
            Where do you usually have breakfast?
          </div>
        </div>
      </section>

      <section className="panel lesson18-block reveal-on-scroll">
        <div className="lesson18-section-head">
          <h2>Sort the phrases</h2>
          <p>Choose the correct preposition for each time phrase.</p>
        </div>

        <div className="lesson18-sort-grid interactive-grid">
          {sortItems.map((item) => {
            const selected = sortSelected[item.text];
            const isCorrect = selected === item.answer;

            return (
              <article className="lesson18-sort-row" key={item.text}>
                <span className="lesson18-sort-text">{item.text}</span>

                <div className="lesson18-choice-row">
                  {(["in", "on", "at"] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`choice-btn ${selected === option ? "selected" : ""}`}
                      onClick={() =>
                        setSortSelected((prev) => ({
                          ...prev,
                          [item.text]: option,
                        }))
                      }
                    >
                      {option}
                    </button>
                  ))}
                </div>

                {selected && (
                  <span
                    className={`lesson18-check ${isCorrect ? "ok" : "bad"}`}
                  >
                    {isCorrect ? "✓" : "Try again"}
                  </span>
                )}
              </article>
            );
          })}
        </div>

        <div className="lesson18-score">
          Score: {sortScore} / {sortItems.length}
        </div>
      </section>

      <section className="panel lesson18-block reveal-on-scroll">
        <div className="lesson18-section-head">
          <h2>Visual flashcards</h2>
          <p>
            Tap a card to flip it. Use the picture first, then say the phrase.
          </p>
        </div>

        <div className="lesson18-flashcards-grid">
          {flashcards.map((card) => {
            const flipped = flippedCards.includes(card.id);

            return (
              <button
                type="button"
                key={card.id}
                className={`flashcard ${flipped ? "is-flipped" : ""}`}
                onClick={() => toggleFlip(card.id)}
              >
                <div className="flashcard-inner">
                  <div className="flashcard-face flashcard-front">
                    <img src={getImagePath(card.image)} alt={card.frontAlt} />
                    <span className="flashcard-tag">{card.type}</span>
                  </div>

                  <div className="flashcard-face flashcard-back">
                    <span>{card.back}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="panel lesson18-block reveal-on-scroll">
        <div className="lesson18-section-head">
          <h2>Choose the right preposition</h2>
          <p>Complete the sentence with in, on, at, or to.</p>
        </div>

        <div className="lesson18-choose-list">
          {chooseItems.map((item, index) => {
            const selected = chooseSelected[index];
            const isCorrect = selected === item.answer;

            return (
              <article className="lesson18-choose-card" key={item.sentence}>
                <p className="lesson18-choose-sentence">{item.sentence}</p>

                <div className="lesson18-choice-row">
                  {item.options.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`choice-btn ${selected === option ? "selected" : ""}`}
                      onClick={() =>
                        setChooseSelected((prev) => ({
                          ...prev,
                          [index]: option,
                        }))
                      }
                    >
                      {option}
                    </button>
                  ))}
                </div>

                {showChooseAnswers && (
                  <div
                    className={`lesson18-answer ${isCorrect ? "ok" : "bad"}`}
                  >
                    Correct answer: <strong>{item.answer}</strong>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        <div className="lesson18-actions">
          <button
            type="button"
            className="main-action"
            onClick={() => setShowChooseAnswers(true)}
          >
            Check answers
          </button>
          <div className="lesson18-score">
            Score: {chooseScore} / {chooseItems.length}
          </div>
        </div>
      </section>

      <section className="panel lesson18-block reveal-on-scroll">
        <div className="lesson18-section-head">
          <h2>Mini speaking: my routine</h2>
          <p>Read the model. Then change it and say it about your real life.</p>
        </div>

        <div className="lesson18-speaking-grid">
          {speakingPrompts.map((item) => (
            <article className="lesson18-speaking-card" key={item.id}>
              <p className="lesson18-speaking-line">{item.start}</p>
              <p className="lesson18-speaking-hint">{item.hint}</p>
            </article>
          ))}
        </div>

        <div className="lesson18-speaking-box">
          <h3>Say 3 sentences about your day</h3>
          <ul>
            <li>I wake up at ...</li>
            <li>I’m in ...</li>
            <li>I study / work on ...</li>
          </ul>
        </div>
      </section>

      <section className="panel lesson18-block reveal-on-scroll">
        <div className="lesson18-section-head">
          <h2>Quick games</h2>
          <p>Short reaction games for speed and confidence.</p>
        </div>

        <div className="lesson18-games-stack">
          <article className="lesson18-game-card">
            <h3>True or false</h3>
            <div className="lesson18-tf-list">
              {tfItems.map((item, index) => {
                const selected = tfSelected[index];
                const isCorrect = selected === item.answer;

                return (
                  <div className="lesson18-tf-row" key={item.sentence}>
                    <span>{item.sentence}</span>

                    <div className="lesson18-choice-row">
                      <button
                        type="button"
                        className={`choice-btn ${selected === true ? "selected" : ""}`}
                        onClick={() =>
                          setTfSelected((prev) => ({ ...prev, [index]: true }))
                        }
                      >
                        True
                      </button>
                      <button
                        type="button"
                        className={`choice-btn ${selected === false ? "selected" : ""}`}
                        onClick={() =>
                          setTfSelected((prev) => ({ ...prev, [index]: false }))
                        }
                      >
                        False
                      </button>
                    </div>

                    {showTfAnswers && (
                      <span
                        className={`lesson18-check ${isCorrect ? "ok" : "bad"}`}
                      >
                        {isCorrect
                          ? "✓"
                          : `Correct: ${item.answer ? "True" : "False"}`}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="lesson18-actions">
              <button
                type="button"
                className="main-action"
                onClick={() => setShowTfAnswers(true)}
              >
                Show answers
              </button>
              <div className="lesson18-score">
                Score: {tfScore} / {tfItems.length}
              </div>
            </div>
          </article>

          <article className="lesson18-game-card">
            <h3>Picture Q&amp;A</h3>
            <div className="lesson18-picture-grid">
              {pictureQa.map((item) => (
                <div className="lesson18-picture-card" key={item.image}>
                  <img src={getImagePath(item.image)} alt={item.q} />
                  <p>
                    <strong>Q:</strong> {item.q}
                  </p>
                  <p>
                    <strong>A:</strong> {item.a}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article className="lesson18-game-card">
            <h3>Race to choose</h3>
            <div className="lesson18-race-grid">
              {raceItems.map((item) => (
                <div className="lesson18-race-pill" key={item.prompt}>
                  <span>{item.prompt}</span>
                  <strong>{item.answer}</strong>
                </div>
              ))}
            </div>
          </article>

          <article className="lesson18-game-card">
            <div className="lesson18-game-head">
              <h3>Find the pair</h3>
              <button
                type="button"
                className="ghost-action"
                onClick={resetPairs}
              >
                Shuffle
              </button>
            </div>

            <div className="lesson18-pair-grid">
              {pairCards.map((card) => {
                const isSelected = selectedPairIds.includes(card.id);
                const isMatched = matchedPairKeys.includes(card.pairKey);

                return (
                  <button
                    type="button"
                    key={card.id}
                    className={`lesson18-pair-card ${
                      isSelected ? "selected" : ""
                    } ${isMatched ? "matched" : ""}`}
                    onClick={() => handlePairClick(card)}
                  >
                    {card.text}
                  </button>
                );
              })}
            </div>
          </article>
        </div>
      </section>

      <section className="panel lesson18-block reveal-on-scroll">
        <div className="lesson18-section-head">
          <h2>Extra practice</h2>
          <p>Use these links for more reading and writing practice.</p>
        </div>

        <div className="lesson18-resources-grid">
          <a
            href="https://test-english.com/reading/a1/top-things-that-i-do-a1-english-reading-test/"
            target="_blank"
            rel="noopener noreferrer"
            className="lesson18-resource-card"
          >
            <div className="lesson18-resource-top">
              <span className="lesson18-resource-badge">Reading</span>
              <span className="lesson18-resource-arrow">↗</span>
            </div>

            <h3>Test-English</h3>
            <p>
              Top things that I do — short A1 reading practice about daily
              routine.
            </p>
          </a>

          <a
            href="https://promova.com/uk/my-plan/appBJb23Byfy5g6CE/379?unit=appBJb23Byfy5g6CE6"
            target="_blank"
            rel="noopener noreferrer"
            className="lesson18-resource-card"
          >
            <div className="lesson18-resource-top">
              <span className="lesson18-resource-badge">Practice</span>
              <span className="lesson18-resource-arrow">↗</span>
            </div>

            <h3>Promova</h3>
            <p>
              Extra app practice for prepositions, routine, and short sentence
              work.
            </p>
          </a>

          <a
            href="https://learnenglishkids.britishcouncil.org/read-write/writing-practice/level-1-writing/my-day"
            target="_blank"
            rel="noopener noreferrer"
            className="lesson18-resource-card"
          >
            <div className="lesson18-resource-top">
              <span className="lesson18-resource-badge">Writing</span>
              <span className="lesson18-resource-arrow">↗</span>
            </div>

            <h3>British Council</h3>
            <p>
              My day — simple writing practice to connect routine and time
              expressions.
            </p>
          </a>
        </div>
      </section>

      <section className="panel lesson18-block reveal-on-scroll">
        <div className="lesson18-section-head">
          <h2>Homework</h2>
          <p>Short writing and speaking for after class.</p>
        </div>

        <div className="lesson18-homework-grid">
          <div className="lesson18-homework-card">
            <h3>Write</h3>
            <ul>
              <li>Write 5 sentences about your day with at / in / on / to.</li>
              <li>Write 5 short questions.</li>
            </ul>
          </div>

          <div className="lesson18-homework-card">
            <h3>Speak</h3>
            <ul>
              <li>Send 1 voice message about your morning routine.</li>
              <li>Use at least 3 prepositions.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
