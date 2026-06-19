import { useMemo, useState } from "react";
import "../styles/lesson17.css";

type Pair = {
  id: number;
  word: string;
  image: string;
};

type Card = {
  id: string;
  pairId: number;
  type: "image" | "word";
  word: string;
  image: string;
};

const pairs: Pair[] = [
  { id: 1, word: "play", image: "play.webp" },
  { id: 2, word: "have", image: "have.webp" },
  { id: 3, word: "cook", image: "cook.webp" },
  { id: 4, word: "buy", image: "buy.webp" },
  { id: 5, word: "live", image: "live.webp" },
  { id: 6, word: "drive", image: "drive.webp" },
  { id: 7, word: "take", image: "take.webp" },
];

const imgPath = (fileName: string) =>
  `${import.meta.env.BASE_URL}images/${fileName}`;

const matchSound = `${import.meta.env.BASE_URL}sounds/match.mp3`;

const shuffle = <T,>(array: T[]) => [...array].sort(() => Math.random() - 0.5);

const buildDeck = () =>
  shuffle(
    pairs.flatMap((pair) => [
      {
        id: `${pair.id}-image`,
        pairId: pair.id,
        type: "image" as const,
        word: pair.word,
        image: pair.image,
      },
      {
        id: `${pair.id}-word`,
        pairId: pair.id,
        type: "word" as const,
        word: pair.word,
        image: pair.image,
      },
    ]),
  );

export default function VocabularyMatchGame() {
  const [cards, setCards] = useState<Card[]>(() => buildDeck());
  const [flipped, setFlipped] = useState<string[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [locked, setLocked] = useState(false);

  const matchedCount = useMemo(() => matched.length, [matched]);

  const playMatchSound = () => {
    const audio = new Audio(matchSound);
    audio.play().catch(() => {});
  };

  const resetTurn = () => {
    setFlipped([]);
    setLocked(false);
  };

  const handleCardClick = (card: Card) => {
    if (locked) return;
    if (flipped.includes(card.id)) return;
    if (matched.includes(card.pairId)) return;
    if (flipped.length === 2) return;

    const nextFlipped = [...flipped, card.id];
    setFlipped(nextFlipped);

    if (nextFlipped.length === 2) {
      setLocked(true);

      const first = cards.find((c) => c.id === nextFlipped[0]);
      const second = cards.find((c) => c.id === nextFlipped[1]);

      if (first && second && first.pairId === second.pairId) {
        setTimeout(() => {
          setMatched((prev) =>
            prev.includes(first.pairId) ? prev : [...prev, first.pairId],
          );
          playMatchSound();
          resetTurn();
        }, 850);
      } else {
        setTimeout(() => {
          resetTurn();
        }, 850);
      }
    }
  };

  const restart = () => {
    setCards(buildDeck());
    setFlipped([]);
    setMatched([]);
    setLocked(false);
  };

  return (
    <section className="panel vocab-match">
      <div className="vocab-match-header">
        <div>
          <h2>Match the pairs</h2>
          <p className="vocab-match-note">
            Find the pair: picture + English word.
          </p>
        </div>

        <button
          className="action-btn secondary"
          onClick={restart}
          type="button"
        >
          Restart
        </button>
      </div>

      <div className="vocab-match-stats">
        <span>
          Matched: {matchedCount} / {pairs.length}
        </span>
      </div>

      <div className="match-grid">
        {cards.map((card) => {
          const isOpen =
            flipped.includes(card.id) || matched.includes(card.pairId);

          return (
            <button
              key={card.id}
              className={`match-card ${isOpen ? "flipped" : ""}`}
              onClick={() => handleCardClick(card)}
              type="button"
            >
              <div className="match-card-inner">
                <div className="match-card-front">
                  <span>?</span>
                </div>

                <div className="match-card-back">
                  {card.type === "image" ? (
                    <img src={imgPath(card.image)} alt={card.word} />
                  ) : (
                    <span>{card.word}</span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
