import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/lesson19.css";

type SortItem = {
  text: string;
  answer: "can" | "can't";
};

type ChooseItem = {
  sentence: string;
  options: string[];
  answer: string;
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

const sortItems: SortItem[] = [
  { text: "I ___ swim.", answer: "can" },
  { text: "She ___ drive.", answer: "can" },
  { text: "He ___ fly.", answer: "can't" },
  { text: "They ___ speak French.", answer: "can" },
  { text: "I ___ play the piano.", answer: "can't" },
  { text: "We ___ see the stars.", answer: "can" },
  { text: "Dogs ___ talk.", answer: "can't" },
  { text: "Cats ___ jump high.", answer: "can" },
];

const chooseItems: ChooseItem[] = [
  {
    sentence: "___ you help me?",
    options: ["Can", "Can't", "Does", "Do"],
    answer: "Can",
  },
  {
    sentence: "I ___ ride a bike.",
    options: ["can", "can't", "cans", "do"],
    answer: "can",
  },
  {
    sentence: "She ___ speak English very well.",
    options: ["can", "can't", "doesn't", "isn't"],
    answer: "can",
  },
  {
    sentence: "Fish ___ walk.",
    options: ["can", "can't", "don't", "isn't"],
    answer: "can't",
  },
  {
    sentence: "___ he cook?",
    options: ["Can", "Can't", "Does", "Is"],
    answer: "Can",
  },
  {
    sentence: "I ___ hear you — it's too loud.",
    options: ["can", "can't", "don't", "am not"],
    answer: "can't",
  },
];

const speakingPrompts: SpeakingPrompt[] = [
  { id: 1, start: "I can swim.", hint: "Say something you can really do." },
  { id: 2, start: "I can't drive.", hint: "Say something you can't do yet." },
  { id: 3, start: "Can you cook?", hint: "Ask your teacher this question." },
  {
    id: 4,
    start: "She can speak Spanish.",
    hint: "Change the skill or the person.",
  },
  {
    id: 5,
    start: "We can't see well without glasses.",
    hint: "Make your own can't sentence.",
  },
  {
    id: 6,
    start: "Can birds swim?",
    hint: "Ask a question about an animal.",
  },
];

const tfItems: TfItem[] = [
  { sentence: "We say: I cans swim.", answer: false },
  { sentence: "We say: Can you help me?", answer: true },
  { sentence: "We say: She can't to run.", answer: false },
  { sentence: "We say: He can play the guitar.", answer: true },
  { sentence: "We say: Can he swims?", answer: false },
  { sentence: "We say: They can't speak French.", answer: true },
];

const raceItems = [
  { prompt: "___ you dance?", answer: "Can" },
  { prompt: "I ___ fly.", answer: "can't" },
  { prompt: "She ___ cook.", answer: "can" },
  { prompt: "___ fish walk?", answer: "Can" },
  { prompt: "We ___ see you.", answer: "can" },
  { prompt: "He ___ speak Arabic.", answer: "can't" },
];

const pairCardsBase: PairCard[] = [
  { id: 1, text: "I can", pairKey: "swim" },
  { id: 2, text: "swim", pairKey: "swim" },
  { id: 3, text: "I can't", pairKey: "fly" },
  { id: 4, text: "fly", pairKey: "fly" },
  { id: 5, text: "Can you", pairKey: "cook" },
  { id: 6, text: "cook?", pairKey: "cook" },
  { id: 7, text: "She can", pairKey: "drive" },
  { id: 8, text: "drive.", pairKey: "drive" },
];

function shuffle<T>(array: T[]) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function Lesson19() {
  const pageRef = useRef<HTMLDivElement | null>(null);

  const [sortSelected, setSortSelected] = useState<
    Record<string, "can" | "can't" | "">
  >(Object.fromEntries(sortItems.map((item) => [item.text, ""])));

  const [chooseSelected, setChooseSelected] = useState<Record<number, string>>(
    {},
  );
  const [showChooseAnswers, setShowChooseAnswers] = useState(false);

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
    <div className="lesson19-page" ref={pageRef}>
      <section className="lesson19-hero panel reveal-on-scroll is-visible">
        <div className="lesson19-hero-top">
          <div>
            <p className="page-kicker">Lesson 19</p>
            <h1>Can / Can't</h1>
            <p className="lesson19-subtitle">
              Learn to talk about ability — what you can and can't do — through
              sorting, quick choices, speaking, and games.
            </p>
          </div>

          <Link to="/" className="lesson19-back-link">
            ← Back to roadmap
          </Link>
        </div>

        <div className="lesson19-hero-chips">
          <span>I can swim</span>
          <span>She can't fly</span>
          <span>Can you cook?</span>
          <span>Yes, I can</span>
          <span>No, I can't</span>
        </div>
      </section>

      <section className="panel lesson19-block reveal-on-scroll">
        <div className="lesson19-section-head">
          <h2>Quick start</h2>
          <p>Answer the questions out loud.</p>
        </div>

        <div className="lesson19-prompt-grid">
          <div className="lesson19-prompt-card">Can you swim?</div>
          <div className="lesson19-prompt-card">Can you cook well?</div>
          <div className="lesson19-prompt-card">What can you do very well?</div>
        </div>
      </section>

      <section className="panel lesson19-block reveal-on-scroll">
        <div className="lesson19-section-head">
          <h2>Can or can't?</h2>
          <p>Choose the correct word for each sentence.</p>
        </div>

        <div className="lesson19-sort-grid">
          {sortItems.map((item) => {
            const selected = sortSelected[item.text];
            const isCorrect = selected === item.answer;

            return (
              <article className="lesson19-sort-row" key={item.text}>
                <span className="lesson19-sort-text">{item.text}</span>

                <div className="lesson19-choice-row">
                  {(["can", "can't"] as const).map((option) => (
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
                    className={`lesson19-check ${isCorrect ? "ok" : "bad"}`}
                  >
                    {isCorrect ? "✓" : "Try again"}
                  </span>
                )}
              </article>
            );
          })}
        </div>

        <div className="lesson19-score">
          Score: {sortScore} / {sortItems.length}
        </div>
      </section>

      <section className="panel lesson19-block reveal-on-scroll">
        <div className="lesson19-section-head">
          <h2>Choose the right word</h2>
          <p>Complete each sentence with the correct option.</p>
        </div>

        <div className="lesson19-choose-list">
          {chooseItems.map((item, index) => {
            const selected = chooseSelected[index];
            const isCorrect = selected === item.answer;

            return (
              <article className="lesson19-choose-card" key={item.sentence}>
                <p className="lesson19-choose-sentence">{item.sentence}</p>

                <div className="lesson19-choice-row">
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
                    className={`lesson19-answer ${isCorrect ? "ok" : "bad"}`}
                  >
                    Correct answer: <strong>{item.answer}</strong>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        <div className="lesson19-actions">
          <button
            type="button"
            className="main-action"
            onClick={() => setShowChooseAnswers(true)}
          >
            Check answers
          </button>
          <div className="lesson19-score">
            Score: {chooseScore} / {chooseItems.length}
          </div>
        </div>
      </section>

      <section className="panel lesson19-block reveal-on-scroll">
        <div className="lesson19-section-head">
          <h2>Mini speaking: my abilities</h2>
          <p>Read the model. Then change it and say it about your real life.</p>
        </div>

        <div className="lesson19-speaking-grid">
          {speakingPrompts.map((item) => (
            <article className="lesson19-speaking-card" key={item.id}>
              <p className="lesson19-speaking-line">{item.start}</p>
              <p className="lesson19-speaking-hint">{item.hint}</p>
            </article>
          ))}
        </div>

        <div className="lesson19-speaking-box">
          <h3>Say 3 sentences about your abilities</h3>
          <ul>
            <li>I can ...</li>
            <li>I can't ...</li>
            <li>Can you ...?</li>
          </ul>
        </div>
      </section>

      <section className="panel lesson19-block reveal-on-scroll">
        <div className="lesson19-section-head">
          <h2>Quick games</h2>
          <p>Short reaction games for speed and confidence.</p>
        </div>

        <div className="lesson19-games-stack">
          <article className="lesson19-game-card">
            <h3>True or false</h3>
            <div className="lesson19-tf-list">
              {tfItems.map((item, index) => {
                const selected = tfSelected[index];
                const isCorrect = selected === item.answer;

                return (
                  <div className="lesson19-tf-row" key={item.sentence}>
                    <span>{item.sentence}</span>

                    <div className="lesson19-choice-row">
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
                          setTfSelected((prev) => ({
                            ...prev,
                            [index]: false,
                          }))
                        }
                      >
                        False
                      </button>
                    </div>

                    {showTfAnswers && (
                      <span
                        className={`lesson19-check ${isCorrect ? "ok" : "bad"}`}
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

            <div className="lesson19-actions">
              <button
                type="button"
                className="main-action"
                onClick={() => setShowTfAnswers(true)}
              >
                Show answers
              </button>
              <div className="lesson19-score">
                Score: {tfScore} / {tfItems.length}
              </div>
            </div>
          </article>

          <article className="lesson19-game-card">
            <h3>Race to choose</h3>
            <div className="lesson19-race-grid">
              {raceItems.map((item) => (
                <div className="lesson19-race-pill" key={item.prompt}>
                  <span>{item.prompt}</span>
                  <strong>{item.answer}</strong>
                </div>
              ))}
            </div>
          </article>

          <article className="lesson19-game-card">
            <div className="lesson19-game-head">
              <h3>Find the pair</h3>
              <button
                type="button"
                className="ghost-action"
                onClick={resetPairs}
              >
                Shuffle
              </button>
            </div>

            <div className="lesson19-pair-grid">
              {pairCards.map((card) => {
                const isSelected = selectedPairIds.includes(card.id);
                const isMatched = matchedPairKeys.includes(card.pairKey);

                return (
                  <button
                    type="button"
                    key={card.id}
                    className={`lesson19-pair-card ${
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

      <section className="panel lesson19-block reveal-on-scroll">
        <div className="lesson19-section-head">
          <h2>Extra practice</h2>
          <p>Use these links for more reading and writing practice.</p>
        </div>

        <div className="lesson19-resources-grid">
          <a
            href="https://test-english.com/grammar-points/a1/can-cant/"
            target="_blank"
            rel="noopener noreferrer"
            className="lesson19-resource-card"
          >
            <div className="lesson19-resource-top">
              <span className="lesson19-resource-badge">Grammar</span>
              <span className="lesson19-resource-arrow">↗</span>
            </div>
            <h3>Test-English</h3>
            <p>Can / can't — A1 grammar explanation and exercises.</p>
          </a>

          <a
            href="https://learnenglishkids.britishcouncil.org/grammar-practice/can-cant-ability"
            target="_blank"
            rel="noopener noreferrer"
            className="lesson19-resource-card"
          >
            <div className="lesson19-resource-top">
              <span className="lesson19-resource-badge">Practice</span>
              <span className="lesson19-resource-arrow">↗</span>
            </div>
            <h3>British Council Kids</h3>
            <p>Can / can't for ability — fun interactive practice.</p>
          </a>

          <a
            href="https://www.englishclub.com/grammar/verbs-modal_can.php"
            target="_blank"
            rel="noopener noreferrer"
            className="lesson19-resource-card"
          >
            <div className="lesson19-resource-top">
              <span className="lesson19-resource-badge">Reading</span>
              <span className="lesson19-resource-arrow">↗</span>
            </div>
            <h3>EnglishClub</h3>
            <p>Modal verb can — rules, examples, and usage notes.</p>
          </a>
        </div>
      </section>

      <section className="panel lesson19-block reveal-on-scroll">
        <div className="lesson19-section-head">
          <h2>Homework</h2>
          <p>Short writing and speaking for after class.</p>
        </div>

        <div className="lesson19-homework-grid">
          <div className="lesson19-homework-card">
            <h3>Write</h3>
            <ul>
              <li>Write 5 sentences with can and 5 with can't.</li>
              <li>Write 3 questions with Can you...?</li>
            </ul>
          </div>

          <div className="lesson19-homework-card">
            <h3>Speak</h3>
            <ul>
              <li>Send 1 voice message about things you can and can't do.</li>
              <li>Use at least 4 can / can't sentences.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
