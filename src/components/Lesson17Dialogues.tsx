import "../styles/lesson17.css";

const dialogues = [
  {
    title: "Dialogue 1 — About basketball",
    cards: [
      {
        question: "Do you play sports?",
        answer: "Yes, I do. I really love basketball.",
      },
      {
        question: "Do you play on a team?",
        answer: "Yes, but we do not play in winter.",
      },
      {
        question: "Oh, do you play in summer?",
        answer: "Yes, we play in spring and summer.",
      },
      {
        question: "Do you play at the gym in town?",
        answer: "No, we play at a high school.",
      },
    ],
  },
  {
    title: "Dialogue 2 — About pets",
    cards: [
      {
        question: "Do you have any pets?",
        answer: "Yes, I have a cat.",
      },
      {
        question: "What about you?",
        answer: "I don't have a cat, but I have a dog.",
      },
      {
        question: "Nice. Do you have a big yard?",
        answer: "Yes, I have a big yard, so it is perfect for my dog.",
      },
      {
        question: "Yeah, I don't have a yard, so I can only have a cat.",
        answer: "Yes, that makes sense.",
      },
    ],
  },
  {
    title: "Dialogue 3 — About cooking",
    cards: [
      {
        question: "Do you cook much?",
        answer: "Yes, I cook all the time.",
      },
      {
        question: "Do you cook?",
        answer: "No, I don't like to cook very much.",
      },
      {
        question: "Oh, so do you buy your dinner?",
        answer: "Yes, I buy it at the supermarket.",
      },
      {
        question: "Do you buy dinner every night?",
        answer: "Yes, I never cook.",
      },
      {
        question: "Wow, that is expensive.",
        answer: "Yes, it can be.",
      },
    ],
  },
  {
    title: "Dialogue 4 — About where you live and work",
    cards: [
      {
        question: "Do you live downtown?",
        answer: "Yes, I live near the train station.",
      },
      {
        question: "Do you take the train to work?",
        answer: "Yes, most days.",
      },
      {
        question: "What about you?",
        answer: "I live far away, so I drive to work.",
      },
      {
        question: "Do you have a nice car?",
        answer: "No, my car is old, but I like it.",
      },
    ],
  },
];

export default function Lesson17Dialogues() {
  return (
    <section className="dialogue-section">
      {dialogues.map((dialogue) => (
        <article className="panel dialogue-block" key={dialogue.title}>
          <h2>{dialogue.title}</h2>

          <div className="dialogue-grid">
            {dialogue.cards.map((card) => (
              <div className="flip-card" key={card.question}>
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <p>{card.question}</p>
                  </div>
                  <div className="flip-card-back">
                    <p>{card.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </article>
      ))}
    </section>
  );
}
