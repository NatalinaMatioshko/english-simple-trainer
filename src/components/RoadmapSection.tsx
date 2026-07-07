import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/roadmap.css";

type Lesson = {
  id: number;
  title: string;
  grammar: string;
  vocabulary: string;
  speaking: string;
  listening: string;
  review: string;
  category?:
    | "shopping"
    | "food"
    | "transport"
    | "health"
    | "general"
    | "people";
  status: "completed" | "current" | "next";
  route?: string;
};

type StageSummary = {
  range: string;
  title: string;
  summary: string;
};

const completedPath: StageSummary[] = [
  {
    range: "Lessons 1–4",
    title: "Identity and basics",
    summary:
      "The course began with greetings, self-introduction, to be, personal information, age, country, and simple facts about the student.",
  },
  {
    range: "Lessons 5–10",
    title: "Daily routines and Present Simple",
    summary:
      "The learner moved from identity to action: daily routine verbs, simple questions, short answers, and speaking about everyday life.",
  },
  {
    range: "Lessons 11–17",
    title: "Accuracy and consolidation",
    summary:
      "The course strengthened question forms, prepositions, pictures, listening, and short connected speaking with more confidence.",
  },
  {
    range: "Lessons 18–20",
    title: "Practical accuracy and third person",
    summary:
      "The learner worked on in / on / at / to, do / make collocations, and he / she / it verb forms with flashcards, spelling rules, and speaking about another person.",
  },
];

const nextLessonsSummary: StageSummary[] = [
  {
    range: "Lessons 21–24",
    title: "Can, review, and connected speaking",
    summary:
      "The current step combines can / can't with third person review, vocabulary cards, Test-English listening, and task-based speaking about family and routines.",
  },
  {
    range: "Lessons 25–30",
    title: "Real-life situations",
    summary:
      "The final stage expands into shopping, food, transport, directions, health, and a practical speaking push toward A2 readiness.",
  },
];

const roadmapLessons: Lesson[] = [
  {
    id: 1,
    title: "Greetings and saying who you are",
    grammar: "to be: I am, you are; basic positive sentences",
    vocabulary: "hello, hi, name, from, fine, okay",
    speaking: "Introduce yourself in 3–4 short sentences.",
    listening: "Very short greetings and introduction prompts.",
    review: "Starting point of the course.",
    category: "general",
    status: "completed",
  },
  {
    id: 2,
    title: "Personal information",
    grammar: "to be questions and short answers",
    vocabulary: "age, country, city, phone number, job",
    speaking: "Answer basic questions about yourself.",
    listening: "Listening for name, country, age, and simple details.",
    review: "Lesson 1 introduction language.",
    category: "general",
    status: "completed",
  },
  {
    id: 3,
    title: "Family basics",
    grammar: "my / your, have got basics, simple nouns",
    vocabulary: "mother, father, sister, brother, family",
    speaking: "Say who is in your family.",
    listening: "Short family descriptions.",
    review: "to be, personal information.",
    category: "people",
    status: "completed",
  },
  {
    id: 4,
    title: "Country, job, and simple facts",
    grammar: "to be + jobs and countries; basic statements",
    vocabulary: "teacher, doctor, worker, student, country words",
    speaking: "Say where you are from and what you do.",
    listening: "Simple personal fact listening.",
    review: "Lessons 1–3.",
    category: "general",
    status: "completed",
  },
  {
    id: 5,
    title: "Daily routine vocabulary begins",
    grammar: "Present Simple introduction",
    vocabulary: "wake up, get up, eat, go, sleep",
    speaking: "Name 5 things you do every day.",
    listening: "Short routine phrases.",
    review: "to be and basic facts.",
    category: "general",
    status: "completed",
  },
  {
    id: 6,
    title: "Present Simple for routines",
    grammar: "I / you / we / they in Present Simple",
    vocabulary: "have breakfast, go to work, come home, relax",
    speaking: "Describe your morning or evening routine.",
    listening: "Simple routine-based audio.",
    review: "Routine vocabulary from Lesson 5.",
    category: "general",
    status: "completed",
  },
  {
    id: 7,
    title: "Questions about routine",
    grammar: "do / does questions and short answers",
    vocabulary: "when, what time, where, every day",
    speaking: "Ask and answer simple routine questions.",
    listening: "Short dialogues about daily habits.",
    review: "Present Simple statements.",
    category: "general",
    status: "completed",
  },
  {
    id: 8,
    title: "Time expressions in routine",
    grammar: "at / in / on with time basics",
    vocabulary: "at 7 o’clock, in the morning, on Monday",
    speaking: "Add time expressions to routine sentences.",
    listening: "Listen for time references.",
    review: "Questions and routines.",
    category: "general",
    status: "completed",
  },
  {
    id: 9,
    title: "Place and movement in daily life",
    grammar: "in / at / to with places",
    vocabulary: "at home, at work, in town, to school, to the gym",
    speaking: "Say where you are and where you go.",
    listening: "Simple place and movement listening.",
    review: "Routine verbs and time expressions.",
    category: "general",
    status: "completed",
  },
  {
    id: 10,
    title: "Routine speaking expansion",
    grammar: "Present Simple review in fuller sentences",
    vocabulary: "before, after, then, usually, every day",
    speaking: "Describe your full day in short steps.",
    listening: "A short daily routine text or dialogue.",
    review: "Lessons 5–9.",
    category: "general",
    status: "completed",
  },
  {
    id: 11,
    title: "Mixed review and confidence building",
    grammar: "to be + Present Simple mixed review",
    vocabulary: "daily life, family, personal facts",
    speaking: "Answer mixed personal questions more freely.",
    listening: "Mixed familiar-topic listening.",
    review: "Lessons 1–10.",
    category: "general",
    status: "completed",
  },
  {
    id: 12,
    title: "Short speaking in new contexts",
    grammar: "Present Simple recycling in new situations",
    vocabulary: "home, work, family, free time",
    speaking: "Use familiar grammar in new mini topics.",
    listening: "Listen and choose key information.",
    review: "Mixed routine and personal speaking.",
    category: "general",
    status: "completed",
  },
  {
    id: 13,
    title: "Listening and picture support",
    grammar: "Present Simple comprehension support",
    vocabulary: "daily actions and simple descriptive words",
    speaking: "Describe simple pictures with support.",
    listening: "Short guided listening tasks.",
    review: "Routine language.",
    category: "general",
    status: "completed",
  },
  {
    id: 14,
    title: "Routine correction and stability",
    grammar: "Common Present Simple correction points",
    vocabulary: "frequency words and daily actions",
    speaking: "Say simple routine sentences more accurately.",
    listening: "Spot correct routine information.",
    review: "Lessons 5–13.",
    category: "general",
    status: "completed",
  },
  {
    id: 15,
    title: "Present Simple + adverbs of frequency",
    grammar: "always, usually, often, sometimes, never",
    vocabulary: "routine + frequency expressions",
    speaking: "Say how often you do everyday actions.",
    listening: "Listen for frequency information.",
    review: "Present Simple and routine verbs.",
    category: "general",
    status: "completed",
    route: "/lesson-15",
  },
  {
    id: 16,
    title: "Present Simple practice",
    grammar: "do / does questions and short answers",
    vocabulary: "routine, family, home and work actions",
    speaking: "Ask and answer questions about your routine.",
    listening: "Short routine Q&A listening.",
    review: "Adverbs of frequency and daily life.",
    category: "general",
    status: "completed",
    route: "/lesson-16",
  },
  {
    id: 17,
    title: "Present Simple + speaking video",
    grammar: "Present Simple review with questions and prepositions",
    vocabulary: "daily routine, place, time, movement",
    speaking: "Talk about your day in clearer connected sentences.",
    listening: "Video and platform-based practice.",
    review: "Routine, prepositions, question forms.",
    category: "general",
    status: "completed",
    route: "/lesson-17",
  },
  {
    id: 18,
    title: "in / on / at / to in real-life contexts",
    grammar: "Prepositions of time, place, and movement",
    vocabulary: "home, work, gym, town, morning, Monday",
    speaking: "Build 8 short sentences about routine and movement.",
    listening: "Short audio about going to work or the gym.",
    review: "Daily routine, Present Simple, do/does.",
    category: "general",
    status: "completed",
    route: "/lesson-18",
  },
  {
    id: 19,
    title: "Do / make + visual practice",
    grammar:
      "Common collocations with do and make, with continued preposition review",
    vocabulary:
      "do homework, do research, make dinner, make a plan, make progress",
    speaking:
      "Use collocations in mini answers, flashcards, and picture prompts.",
    listening: "Short teacher-led prompts and repetition practice.",
    review:
      "Routine language, prepositions, picture description, sentence building.",
    category: "general",
    status: "completed",
    route: "/lesson-19",
  },
  {
    id: 20,
    title: "He / She / It + Present Simple",
    grammar: "he / she / it + -s / -es / -ies; does / doesn't; has",
    vocabulary:
      "routine flashcards: wake up, work, watch, study, have breakfast, go to work",
    speaking:
      "Describe a friend or family member using model sentences about work, routine, and likes.",
    listening: "Spot he / she / it forms in short sentences.",
    review: "Lesson 19 prepositions, do/make, Present Simple questions.",
    category: "people",
    status: "completed",
    route: "/lesson-20",
  },
  {
    id: 21,
    title: "Can + Third Person Review",
    grammar:
      "can / can't — ability, request, permission; third person -s / -es / -ies review",
    vocabulary:
      "backpack, book, wallet, TV, house, car, shoes, computer, mobile phone, umbrella",
    speaking:
      "5 facts about a family member; compare your routine with a sibling's; can / can't + Can you…?",
    listening:
      "Test-English: How often do you…? + listen and reconstruct with he / she / it.",
    review:
      "Third person spelling, does/doesn't, rapid transformation, can + base verb.",
    category: "general",
    status: "completed",
    route: "/lesson-21",
  },
  {
    id: 22,
    title: "Present Simple Review + About Me",
    grammar:
      "Present Simple review; he / she / it + -s; can / can't — ability and request",
    vocabulary:
      "wake up, get up, have breakfast, go to work, go home, have lunch, have dinner, go to bed; brother, mother, friend, plant, job, home, work",
    speaking:
      "Describe yourself in 5–7 sentences (UA prompts → EN answers); daily routine questions; mini writing 4–5 sentences.",
    listening:
      "YouTube daily routine video + Test-English How often do you…?; retell in 3–4 sentences.",
    review: "Present Simple, third person, can, to be, Lesson 21 vocabulary.",
    category: "people",
    status: "current",
    route: "/lesson-22",
  },
  {
    id: 23,
    title: "Describing people",
    grammar: "Adjectives, has got / is, simple descriptive structures",
    vocabulary: "tall, short, friendly, quiet, funny, dark hair, glasses",
    speaking: "Describe a person from a photo.",
    listening: "Identify a person from a short description.",
    review: "Family, third person, appearance words.",
    category: "people",
    status: "next",
  },
  {
    id: 24,
    title: "Talking about someone you know",
    grammar: "Present Simple + simple descriptors in connected speech",
    vocabulary: "works, lives, likes, plays, studies, visits",
    speaking: "Give a short mini-presentation about a person you know.",
    listening: "Dialogue about a person’s routine and personality.",
    review: "he / she / it, routines, people language.",
    category: "people",
    status: "next",
  },
  {
    id: 25,
    title: "Shopping 1: food and prices",
    grammar: "like / don’t like, some / any basics",
    vocabulary: "apples, bread, eggs, milk, water, price",
    speaking: "Role play: buy simple food in a shop.",
    listening: "Shop dialogue with prices and items.",
    review: "Numbers, questions, daily life.",
    category: "shopping",
    status: "next",
  },
  {
    id: 26,
    title: "Shopping 2: clothes",
    grammar: "Can I have…?, size, price, try on",
    vocabulary: "shirt, shoes, jacket, size, cheap, expensive",
    speaking: "Shop dialogue for clothes.",
    listening: "Listening in a clothes shop.",
    review: "Clothes, colors, numbers, questions.",
    category: "shopping",
    status: "next",
  },
  {
    id: 27,
    title: "Food and ordering",
    grammar: "I’d like…, do you want…?, Can I have…?",
    vocabulary: "menu, soup, tea, coffee, chicken, bill",
    speaking: "Order in a café.",
    listening: "Short restaurant dialogue.",
    review: "like / don’t like, prices, polite requests.",
    category: "food",
    status: "next",
  },
  {
    id: 28,
    title: "Transport",
    grammar: "go by, take, drive, ride, walk to",
    vocabulary: "bus, train, station, taxi, car, stop, ticket",
    speaking: "Talk about how you go to work or move around town.",
    listening: "Transport listening.",
    review: "in / to, routine, time, movement.",
    category: "transport",
    status: "next",
  },
  {
    id: 29,
    title: "Directions and places",
    grammar: "there is / there are, place prepositions, directions",
    vocabulary: "left, right, next to, opposite, near, bank, café",
    speaking: "Ask for and give directions.",
    listening: "Find a place in town from spoken instructions.",
    review: "Place prepositions and location language.",
    category: "general",
    status: "next",
  },
  {
    id: 30,
    title: "Health and final speaking project",
    grammar: "have got, should basics, mixed A1 review",
    vocabulary: "headache, fever, cough, cold, tired, doctor",
    speaking: "Final self-presentation plus a simple doctor role play.",
    listening: "Health dialogue and mixed listening recap.",
    review: "All previous units.",
    category: "health",
    status: "next",
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
    case "people":
      return "🧑";
    default:
      return "📘";
  }
}

function getStatusLabel(status: Lesson["status"]) {
  switch (status) {
    case "completed":
      return "Completed";
    case "current":
      return "Current";
    default:
      return "Next";
  }
}

export default function RoadmapSection() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [progress, setProgress] = useState(0);

  const currentLesson = useMemo(
    () =>
      roadmapLessons.find((lesson) => lesson.status === "current") ??
      roadmapLessons[0],
    [],
  );

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const updateProgress = () => {
      const maxScroll = Math.max(
        1,
        container.scrollHeight - container.clientHeight,
      );
      const nextProgress = Math.max(
        0,
        Math.min(1, container.scrollTop / maxScroll),
      );
      setProgress(nextProgress);
    };

    updateProgress();
    container.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      container.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const currentIndex = roadmapLessons.findIndex(
      (lesson) => lesson.status === "current",
    );
    const currentCard = cardRefs.current[currentIndex];
    if (!currentCard) return;

    const topOffset = 96;

    const placeCurrentCardInView = () => {
      const top = currentCard.offsetTop - topOffset;
      container.scrollTo({
        top: Math.max(0, top),
        behavior: "auto",
      });
    };

    const timer = window.setTimeout(placeCurrentCardInView, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const supportsObserver = typeof IntersectionObserver !== "undefined";

    if (!supportsObserver) {
      cardRefs.current.forEach((card) => {
        card?.classList.add("is-visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            target.classList.add("is-visible");
          } else if (entry.boundingClientRect.top > 0) {
            target.classList.remove("is-visible");
          }
        });
      },
      {
        root: container,
        threshold: 0.14,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="roadmap-layout">
      <aside className="roadmap-sidebar panel">
        <p className="page-kicker">Learning path</p>
        <h2>Roadmap for Lessons 1–30</h2>
        <p className="roadmap-lead">
          The course moves from self-introduction and <strong>to be</strong> to
          daily routines, prepositions, do/make, family, shopping, transport,
          health, and stronger real-life speaking.
        </p>

        <div className="roadmap-current">
          <span className="roadmap-current-label">Current lesson</span>
          <strong>Lesson {currentLesson.id}</strong>
        </div>

        <div className="roadmap-progress-shell" aria-hidden="true">
          <div
            className="roadmap-progress-fill"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>

        <div className="roadmap-summary-card">
          <h3>Course logic</h3>
          <p>
            First the student learns who they are, then what they do every day,
            then where and when things happen, and after that how to speak about
            other people and everyday real-life situations.
          </p>
        </div>
      </aside>

      <div className="roadmap-viewport">
        <div className="roadmap-scroll" ref={scrollRef}>
          <section className="roadmap-top-block">
            <div className="roadmap-overview-grid">
              <article className="roadmap-overview-card">
                <p className="roadmap-mini-label">Completed path</p>
                <h3>What has already been built</h3>
                <div className="overview-list">
                  {completedPath.map((item) => (
                    <div key={item.range} className="overview-item">
                      <span className="overview-range">{item.range}</span>
                      <h4>{item.title}</h4>
                      <p>{item.summary}</p>
                    </div>
                  ))}
                </div>
              </article>

              <article className="roadmap-overview-card">
                <p className="roadmap-mini-label">Next lessons</p>
                <h3>Where the course goes next</h3>
                <div className="overview-list">
                  {nextLessonsSummary.map((item) => (
                    <div key={item.range} className="overview-item">
                      <span className="overview-range">{item.range}</span>
                      <h4>{item.title}</h4>
                      <p>{item.summary}</p>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </section>

          <section className="roadmap-block">
            <div className="roadmap-block-head">
              <p className="roadmap-mini-label">Full timeline</p>
              <h3>Lessons 1–30</h3>
              <p>
                This is the complete course line from the first lesson to the
                latest discussed stage.
              </p>
            </div>

            <div className="roadmap-track">
              {roadmapLessons.map((lesson, index) => {
                const isCurrent = lesson.status === "current";

                return (
                  <article
                    key={lesson.id}
                    ref={(el) => {
                      cardRefs.current[index] = el;
                    }}
                    className={`roadmap-card ${isCurrent ? "is-current" : ""} status-${lesson.status}`}
                  >
                    <div className="roadmap-node" aria-hidden="true">
                      <span>{lesson.id}</span>
                    </div>

                    <div className="roadmap-panel">
                      <div className="roadmap-panel-top">
                        <div>
                          <p className="roadmap-mini">Lesson {lesson.id}</p>
                          <span className={`roadmap-status ${lesson.status}`}>
                            {getStatusLabel(lesson.status)}
                          </span>
                        </div>

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
                          <strong>Review:</strong> {lesson.review}
                        </li>
                      </ul>

                      {lesson.route && (
                        <Link to={lesson.route} className="roadmap-open-link">
                          Open lesson {lesson.id}
                        </Link>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
