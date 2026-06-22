import { useEffect, useRef } from "react";
import "../styles/lesson18.css";

const lessonFlow = [
  {
    step: "Warm-up",
    time: "2 min",
    goal: "Start speaking and activate time, place, and routine.",
    content: [
      "How are you today?",
      "What time do you wake up?",
      "Where do you usually have breakfast?",
    ],
  },
  {
    step: "Review 1–17",
    time: "5 min",
    goal: "Bring back Present Simple, do/does, and daily routine.",
    content: [
      "Do you work every day?",
      "Does your mom cook?",
      "I wake up at 8.",
      "I go to work at 10.",
      "She works in a shop.",
      "They live in town.",
    ],
  },
  {
    step: "Prepositions drill",
    time: "10 min",
    goal: "Automate in / at / to in short practical chunks.",
    content: [
      "in the morning",
      "in July",
      "in 2025",
      "on Monday",
      "at 7 o’clock",
      "at night",
      "at the weekend",
      "at work",
      "at home",
      "to work",
      "to the gym",
      "to school",
    ],
  },
  {
    step: "Speaking task",
    time: "10 min",
    goal: "Move prepositions into live speech.",
    content: [
      "I wake up at 7.",
      "I work at a barbershop.",
      "I go to work at 10.",
      "I have breakfast in the morning.",
      "I go to the gym on Monday.",
      "I live in town.",
    ],
  },
  {
    step: "Listening task",
    time: "8 min",
    goal: "Hear the prepositions in short, clear context.",
    content: [
      "Listen and tick the correct preposition.",
      "Listen and answer: Where does he work?",
      "Listen and repeat 3 sentences with in / at / to.",
    ],
  },
  {
    step: "Mini game",
    time: "8 min",
    goal: "Fix the pattern through quick answers.",
    content: [
      "morning → in the morning",
      "Monday → on Monday",
      "gym → at the gym",
      "work → to work",
      "Correct it: I go at work → I go to work",
    ],
  },
  {
    step: "Homework",
    time: "2 min",
    goal: "Send the pattern into writing and speaking after class.",
    content: [
      "Write 5 sentences about your day with at / in / to.",
      "Write 5 short questions.",
      "Send 1 voice message: tell me about your morning routine.",
    ],
  },
];

const quickGroups = [
  {
    title: "Time",
    items: [
      "in the morning",
      "in July",
      "in 2025",
      "on Monday",
      "at 7 o’clock",
      "at night",
    ],
  },
  {
    title: "Place",
    items: [
      "in town",
      "in the room",
      "at work",
      "at the gym",
      "at home",
      "on the table",
    ],
  },
  {
    title: "Movement",
    items: ["to work", "to the gym", "to the shop", "to school"],
  },
];

const teacherNotes = [
  "Check if the student mixes up at and in.",
  "Check if the student automatically uses to with movement.",
  "Check if the student keeps the preposition with routine verbs.",
  "Check if the student can build 3–4 sentences without help.",
];

export default function Lesson18() {
  const pageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cards = pageRef.current?.querySelectorAll(".reveal-on-scroll");
    if (!cards) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.16 },
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="lesson18-page" ref={pageRef}>
      <section className="lesson18-hero panel reveal-on-scroll is-visible">
        <p className="page-kicker">Lesson 18</p>
        <h1>in / at / to in time, place, and movement</h1>
        <p className="lesson18-subtitle">
          Goal: help the student choose the correct preposition quickly in
          simple sentences about routine, location, and direction.
        </p>

        <div className="lesson18-hero-chips">
          <span>at 7 o’clock</span>
          <span>in the morning</span>
          <span>on Monday</span>
          <span>at work</span>
          <span>to school</span>
        </div>
      </section>

      <section className="lesson18-flow panel reveal-on-scroll">
        <div className="lesson18-flow-head">
          <h2>Lesson flow</h2>
          <p>Short, practical, and built for quick automation.</p>
        </div>

        <div className="lesson18-steps">
          {lessonFlow.map((item, index) => (
            <article
              className="lesson18-step-card reveal-on-scroll"
              key={item.step}
            >
              <div className="lesson18-step-top">
                <div>
                  <p className="lesson18-step-number">Step {index + 1}</p>
                  <h3>{item.step}</h3>
                </div>
                <span className="lesson18-time">{item.time}</span>
              </div>

              <p className="lesson18-goal">{item.goal}</p>

              <ul>
                {item.content.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="lesson18-groups">
        {quickGroups.map((group) => (
          <article
            className="panel lesson18-group-card reveal-on-scroll"
            key={group.title}
          >
            <h3>{group.title}</h3>
            <div className="lesson18-pill-list">
              {group.items.map((item) => (
                <span key={item} className="lesson18-pill">
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="lesson18-bottom-grid">
        <article className="panel lesson18-note-card reveal-on-scroll">
          <h3>Speaking bridge</h3>
          <ul>
            <li>I wake up at 7.</li>
            <li>I have breakfast in the morning.</li>
            <li>I go to work at 10.</li>
            <li>I live in town.</li>
            <li>I go to the gym on Monday.</li>
          </ul>
        </article>

        <article className="panel lesson18-note-card reveal-on-scroll">
          <h3>Teacher check</h3>
          <ul>
            {teacherNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </article>
      </section>
    </div>
  );
}
