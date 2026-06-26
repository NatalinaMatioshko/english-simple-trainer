type Lesson19Card = {
  en: string;
  ua: string;
  group: string;
};

type Lesson19CardsProps = {
  cards: Lesson19Card[];
  flipped: Record<string, boolean>;
  onToggle: (key: string) => void;
};

export default function Lesson19Cards({
  cards,
  flipped,
  onToggle,
}: Lesson19CardsProps) {
  return (
    <div className="lesson19-cards-grid">
      {cards.map((card, index) => {
        const key = `${card.en}-${index}`;
        const isFlipped = !!flipped[key];

        return (
          <button
            key={key}
            type="button"
            className={`lesson19-flip-card ${isFlipped ? "is-flipped" : ""}`}
            onClick={() => onToggle(key)}
            aria-label={`${card.ua} — ${card.en}`}
          >
            <span className="lesson19-flip-inner">
              <span className="lesson19-flip-face lesson19-flip-front">
                <span className="lesson19-card-group">{card.group}</span>
                <strong>{card.ua}</strong>
              </span>

              <span className="lesson19-flip-face lesson19-flip-back">
                <span className="lesson19-card-group">English</span>
                <strong>{card.en}</strong>
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
