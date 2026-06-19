import "../styles/lesson17.css";

type Flashcard = {
  image: string;
  word: string;
};

const flashcards: Flashcard[] = [
  { image: "play.webp", word: "play" },
  { image: "have.webp", word: "have" },
  { image: "cook.webp", word: "cook" },
  { image: "buy.webp", word: "buy" },
  { image: "live.webp", word: "live" },
  { image: "drive.webp", word: "drive" },
  { image: "take.webp", word: "take" },
  { image: "have-lunch.webp", word: "have lunch" },
  { image: "wake-up.webp", word: "wake up" },
  { image: "get-up.webp", word: "get up" },
  { image: "have-breakfast.webp", word: "have breakfast" },
  { image: "brush-teeth.webp", word: "brush my teeth" },
  { image: "get-dressed.webp", word: "get dressed" },
  { image: "go-to-work.webp", word: "go to work" },
  { image: "do-homework.webp", word: "do homework" },
  { image: "watch-tv.webp", word: "watch TV" },
  { image: "have-dinner.webp", word: "have dinner" },
  { image: "go-to-sleep.webp", word: "go to sleep" },
];

const imgPath = (fileName: string) =>
  `${import.meta.env.BASE_URL}images/${fileName}`;

export default function VocabularyFlashcards() {
  return (
    <section className="vocab-section">
      <h2>Vocabulary Flashcards</h2>

      <div className="vocab-grid">
        {flashcards.map((card) => (
          <div className="flip-card vocab-card" key={card.word}>
            <div className="flip-card-inner">
              <div className="flip-card-front vocab-front">
                <img
                  src={imgPath(card.image)}
                  alt={card.word}
                  className="vocab-image"
                />
              </div>
              <div className="flip-card-back vocab-back">
                <p>{card.word}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
