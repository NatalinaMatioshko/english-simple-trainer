import { useEffect, useMemo, useRef, useState } from "react";
import "../styles/roadmap.css";

type Lesson = {
  id: number;
  title: string;
  grammar: string;
  vocabulary: string;
  speaking: string;
  listening: string;
  review: string;
  category?: "shopping" | "food" | "transport" | "health" | "general";
};

const roadmapLessons: Lesson[] = [
  {
    id: 18,
    title: "in / at / to in real-life contexts",
    grammar: "Prepositions of time, place, and movement",
    vocabulary: "home, work, gym, town, morning, Monday",
    speaking: "Build 8 short sentences about routine and movement.",
    listening: "Short audio about going to work or the gym.",
    review: "Daily routine, Present Simple, do/does.",
    category: "general",
  },
  {
    id: 19,
    title: "Third person singular -s",
    grammar: "he / she / it + verbs",
    vocabulary: "works, lives, watches, goes, has",
    speaking: "Tell about a friend or family member in 5 sentences.",
    listening: "Listen and spot he / she / it forms.",
    review: "Present Simple questions and routine verbs.",
    category: "general",
  },
  {
    id: 20,
    title: "Long listening: daily life",
    grammar: "Present Simple review",
    vocabulary: "everyday actions",
    speaking: "Retell a short audio in 3–4 sentences.",
    listening: "Longer audio with gist and details.",
    review: "Routines, prepositions, short answers.",
    category: "general",
  },
  {
    id: 21,
    title: "Family and relationships",
    grammar: "Possessives, is / has",
    vocabulary: "mother, father, sister, brother, cousin",
    speaking: "Describe your family photo.",
    listening: "Listen to someone describe family.",
    review: "to be, possessives, questions.",
    category: "general",
  },
  {
    id: 22,
    title: "Describing people",
    grammar: "Adjectives, has got",
    vocabulary: "tall, short, kind, friendly",
    speaking: "Guess who is being described.",
    listening: "Identify a person from a short listening.",
    review: "Family, is / has, questions.",
    category: "general",
  },
  {
    id: 23,
    title: "Talking about someone you know",
    grammar: "Present Simple + simple descriptors",
    vocabulary: "works, lives, likes, plays",
    speaking: "Mini presentation about a friend.",
    listening: "Dialog about a person’s routine.",
    review: "he / she / it, routines, hobbies.",
    category: "general",
  },
  {
    id: 24,
    title: "Shopping 1: food and prices",
    grammar: "like / don’t like, some / any basics",
    vocabulary: "apples, bread, eggs, milk, price",
    speaking: "Role play: buy food.",
    listening: "Shop dialogue.",
    review: "Numbers, questions, daily life.",
    category: "shopping",
  },
  {
    id: 25,
    title: "Shopping 2: clothes",
    grammar: "Can I have…?, size, price, try on",
    vocabulary: "shirt, size, cheap, expensive",
    speaking: "Shop dialogue for clothes.",
    listening: "British Council shopping audio.",
    review: "Clothes, colors, numbers, questions.",
    category: "shopping",
  },
  {
    id: 26,
    title: "Food and ordering",
    grammar: "I’d like…, do you want…",
    vocabulary: "menu, soup, tea, coffee, chicken",
    speaking: "Order in a café.",
    listening: "Short restaurant dialogue.",
    review: "like / don’t like, numbers, prices.",
    category: "food",
  },
  {
    id: 27,
    title: "Transport",
    grammar: "go by, take, drive, ride",
    vocabulary: "bus, train, station, taxi, car",
    speaking: "Talk about how you go to work.",
    listening: "Transport listening.",
    review: "in / to, routine, time.",
    category: "transport",
  },
  {
    id: 28,
    title: "Directions and places",
    grammar: "there is / there are, prepositions",
    vocabulary: "left, right, next to, opposite",
    speaking: "Ask and give directions.",
    listening: "Find a place in town.",
    review: "Place prepositions, locations.",
    category: "general",
  },
  {
    id: 29,
    title: "Health and symptoms",
    grammar: "have got, should basics",
    vocabulary: "headache, fever, cough, cold",
    speaking: "Role play doctor and patient.",
    listening: "Health dialogue.",
    review: "Questions, have got, body words.",
    category: "health",
  },
  {
    id: 30,
    title: "Review + speaking project",
    grammar: "Mixed review",
    vocabulary: "Mixed",
    speaking: "5-minute self-presentation.",
    listening: "Mixed listening recap.",
    review: "All previous units.",
    category: "general",
  },
];

function getCategoryIcon(category: Lesson["category"]) {
  switch (category) {
    case "shopping":
      return "🛍️";
    case "food":
      return "🍽️";
    case "transport":
      return "🚌";
    case "health":
      return "💊";
    default:
      return "📘";
  }
}

export default function RoadmapSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeLesson, setActiveLesson] = useState<number>(18);
  const [progress, setProgress] = useState(0);

  const lessonIds = useMemo(
    () => roadmapLessons.map((lesson) => lesson.id),
    [],
  );

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const total = rect.height + windowHeight;
      const passed = windowHeight - rect.top;
      const nextProgress = Math.max(0, Math.min(1, passed / total));
      setProgress(nextProgress);

      let closestId = lessonIds[0];
      let closestDistance = Infinity;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.top + cardRect.height / 2;
        const viewportCenter = windowHeight / 2;
        const distance = Math.abs(cardCenter - viewportCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestId = roadmapLessons[index].id;
        }

        if (cardRect.top < windowHeight * 0.88) {
          card.classList.add("is-visible");
        }
      });

      setActiveLesson(closestId);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [lessonIds]);

  return (
    <section className="roadmap-scroll-section" ref={sectionRef}>
      <div className="roadmap-sticky-head">
        <div className="roadmap-head-top">
          <div>
            <p className="page-kicker">Learning path</p>
            <h2>Roadmap for Lessons 18–30</h2>
            <p className="roadmap-lead">
              Scroll through the next stage of the course and follow the
              transition from grammar review to shopping, food, transport,
              health, and final speaking confidence.
            </p>
          </div>

          <div className="roadmap-current">
            <span className="roadmap-current-label">Active lesson</span>
            <strong>Lesson {activeLesson}</strong>
          </div>
        </div>

        <div className="roadmap-progress-shell" aria-hidden="true">
          <div
            className="roadmap-progress-fill"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>
      </div>

      <div className="roadmap-track">
        {roadmapLessons.map((lesson, index) => {
          const isActive = activeLesson === lesson.id;
          return (
            <article
              key={lesson.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className={`roadmap-card ${index % 2 === 0 ? "left" : "right"} ${
                isActive ? "is-active" : ""
              }`}
            >
              <div className="roadmap-node">
                <span>{lesson.id}</span>
              </div>

              <div className="roadmap-panel">
                <div className="roadmap-panel-top">
                  <p className="roadmap-mini">Lesson {lesson.id}</p>
                  <span className="roadmap-icon" aria-hidden="true">
                    {getCategoryIcon(lesson.category)}
                  </span>
                </div>

                <h3>{lesson.title}</h3>

                <div className="roadmap-chip-row">
                  <span className="chip grammar">Grammar</span>
                  <span className="chip speaking">Speaking</span>
                  <span className="chip listening">Listening</span>
                  <span className="chip review">Review</span>
                </div>

                <ul className="roadmap-points">
                  <li>
                    <strong>Grammar:</strong> {lesson.grammar}
                  </li>
                  <li>
                    <strong>Vocabulary:</strong> {lesson.vocabulary}
                  </li>
                  <li>
                    <strong>Speaking:</strong> {lesson.speaking}
                  </li>
                  <li>
                    <strong>Listening:</strong> {lesson.listening}
                  </li>
                  <li>
                    <strong>Review 1–17:</strong> {lesson.review}
                  </li>
                </ul>
              </div>
            </article>
          );
        })}

        <article className="roadmap-a2-card is-visible">
          <div className="roadmap-a2-badge">Ready for A2</div>
          <h3>What success looks like</h3>
          <ul className="roadmap-points">
            <li>
              <strong>Speaking:</strong> The student can speak in short
              connected sentences about daily life, shopping, food, transport,
              and health.
            </li>
            <li>
              <strong>Listening:</strong> The student understands short
              practical dialogues and can catch main meaning plus key details.
            </li>
            <li>
              <strong>Grammar:</strong> Core A1 grammar feels automatic more
              often, especially Present Simple, questions, prepositions, and
              basic functional phrases.
            </li>
            <li>
              <strong>Confidence:</strong> The student reacts faster and needs
              less translation support.
            </li>
          </ul>
        </article>
      </div>
    </section>
  );
}
