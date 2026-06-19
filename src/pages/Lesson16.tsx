import { useMemo, useState } from "react";

const warmUp = [
  "How are you today?",
  "What time did you wake up?",
  "What did you do this morning?",
];

const doDoesDrill = [
  { subject: "I", question: "Do I work?" },
  { subject: "you", question: "Do you study?" },
  { subject: "he", question: "Does he play?" },
  { subject: "she", question: "Does she live?" },
  { subject: "it", question: "Does it rain?" },
  { subject: "we", question: "Do we go?" },
  { subject: "they", question: "Do they watch?" },
];

const shortAnswers = [
  "Do you drink coffee?",
  "Do you play games?",
  "Do you listen to music?",
  "Does your brother watch TV?",
  "Does your mom cook every day?",
  "Does your friend live near you?",
];

const routinePrompts = [
  "Does the teacher read books?",
  "Does your brother wake up early?",
  "Does your mom cook every day?",
  "Do your friends play video games?",
  "Do you go to the gym?",
];

const speedStatements = [
  "She works at home.",
  "They play football.",
  "He likes coffee.",
  "We watch TV in the evening.",
  "I study English every day.",
  "My sister reads books at night.",
  "The dog sleeps on the sofa.",
  "We cook dinner on Sundays.",
  "He listens to music in the car.",
  "They drive to work.",
];

const homeworkIdeas = [
  "Write 5 do/does questions about your routine.",
  "Answer them with short answers.",
  "Make 3 questions about your family or friends.",
];

export default function Lesson16() {
  const [warmIndex, setWarmIndex] = useState(0);
  const [doIndex, setDoIndex] = useState(0);
  const [shortIndex, setShortIndex] = useState(0);
  const [routineIndex, setRoutineIndex] = useState(0);
  const [speedIndex, setSpeedIndex] = useState(0);

  const currentWarm = warmUp[warmIndex];
  const currentDo = doDoesDrill[doIndex];
  const currentShort = shortAnswers[shortIndex];
  const currentRoutine = routinePrompts[routineIndex];
  const currentSpeed = speedStatements[speedIndex];

  const lessonFlow = useMemo(
    () => [
      "Warm-up",
      "Speaking drill: do/does",
      "Short answers",
      "Picture / routine prompts",
      "Speed round",
      "Mini speaking challenge",
    ],
    [],
  );

  return (
    <div className="page-shell">
      <header className="page-hero panel lesson-hero">
        <p className="page-kicker">Lesson 16</p>
        <h1>Present Simple Practice</h1>
        <p className="page-subtitle">
          Do / does, short answers, speaking drills, and quick response.
        </p>

        <div className="lesson-flow">
          {lessonFlow.map((item) => (
            <span className="lesson-badge" key={item}>
              {item}
            </span>
          ))}
        </div>
      </header>

      <section className="cards-grid lesson16-grid">
        <article className="panel lesson-card big-card">
          <h2>Warm-up</h2>
          <p className="big-prompt">{currentWarm}</p>
          <div className="card-actions">
            <button
              className="action-btn primary"
              onClick={() => setWarmIndex((p) => (p + 1) % warmUp.length)}
            >
              Next
            </button>
          </div>
        </article>

        <article className="panel lesson-card big-card">
          <h2>Do / Does</h2>
          <p className="big-prompt">{currentDo.subject}</p>
          <p className="lesson-desc">{currentDo.question}</p>
          <div className="card-actions">
            <button
              className="action-btn primary"
              onClick={() => setDoIndex((p) => (p + 1) % doDoesDrill.length)}
            >
              Next
            </button>
          </div>
        </article>

        <article className="panel lesson-card big-card">
          <h2>Short Answers</h2>
          <p className="big-prompt">{currentShort}</p>
          <p className="lesson-desc">Yes / No answer</p>
          <div className="card-actions">
            <button
              className="action-btn primary"
              onClick={() =>
                setShortIndex((p) => (p + 1) % shortAnswers.length)
              }
            >
              Next
            </button>
          </div>
        </article>

        <article className="panel lesson-card big-card">
          <h2>Routine Prompts</h2>
          <p className="big-prompt">{currentRoutine}</p>
          <p className="lesson-desc">Make the question and answer it.</p>
          <div className="card-actions">
            <button
              className="action-btn primary"
              onClick={() =>
                setRoutineIndex((p) => (p + 1) % routinePrompts.length)
              }
            >
              Next
            </button>
          </div>
        </article>

        <article className="panel lesson-card big-card">
          <h2>Speed Round</h2>
          <p className="big-prompt">{currentSpeed}</p>
          <p className="lesson-desc">Turn it into a question.</p>
          <div className="card-actions">
            <button
              className="action-btn primary"
              onClick={() =>
                setSpeedIndex((p) => (p + 1) % speedStatements.length)
              }
            >
              Next
            </button>
          </div>
        </article>

        <article className="panel lesson-card big-card">
          <h2>Mini speaking challenge</h2>
          <ul className="home-list">
            <li>Make 3 questions about your routine.</li>
            <li>Answer them with short answers.</li>
            <li>Speak without long pauses.</li>
          </ul>
        </article>
      </section>

      <section className="panel homework-card">
        <h2>Homework</h2>
        <ol className="homework-steps">
          {homeworkIdeas.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>
    </div>
  );
}
