import { Link } from "react-router-dom";
import "../styles/pages.css";

type LessonEntry =
  | {
      id: string;
      title: string;
      level: string;
      topic: string;
      description: string;
      lessonPath: string;
      practiceOnly: true;
    }
  | {
      id: string;
      title: string;
      level: string;
      topic: string;
      description: string;
      lessonPath: string;
      homeworkPath: string;
      practiceOnly?: false;
    };

const lessons: LessonEntry[] = [
  {
    id: "practice",
    title: "To be + Present Simple + Routine",
    level: "A1-A2",
    topic: "Самостійна практика",
    description:
      "9 блоків: am/is/are, рутина, at/in/on, I → he/she, -s/-es/-ies, mixed quiz, sentence builder, fix mistakes + письмовий опис себе та сім'ї.",
    lessonPath: "/self-study",
    practiceOnly: true,
  },
  {
    id: "15",
    title: "Present Simple + Adverbs of frequency",
    level: "A1",
    topic: "Speaking",
    description:
      "Учень уже вміє говорити what he does, а тепер вчиться how often he does it.",
    lessonPath: "/lesson-15",
    homeworkPath: "/homework",
  },
  {
    id: "16",
    title: "Present Simple Practice",
    level: "A1-A2",
    topic: "Speaking drills",
    description:
      "Do / does, short answers, quick response, and routine speaking.",
    lessonPath: "/lesson-16",
    homeworkPath: "/homework",
  },
  {
    id: "17",
    title: "Present Simple + Speaking Video",
    level: "A1-A2",
    topic: "Video lesson",
    description: "Watch the video, repeat the patterns, and speak fast.",
    lessonPath: "/lesson-17",
    homeworkPath: "/homework",
  },
  {
    id: "18",
    title: "in / on / at / to",
    level: "A1-A2",
    topic: "Prepositions",
    description:
      "Practice prepositions in time, place, and movement through pictures, quick tasks, and speaking.",
    lessonPath: "/lesson-18",
    homeworkPath: "/homework",
  },
  {
    id: "19",
    title: "Do expressions",
    level: "A1-A2",
    topic: "Vocabulary + speaking",
    description:
      "Learn common phrases with do, compare do vs make, and practise useful everyday expressions with cards and picture tasks.",
    lessonPath: "/lesson-19",
    homeworkPath: "/homework",
  },
  {
    id: "19.1",
    title: "about",
    level: "A1",
    topic: "about",
    description: "about.",
    lessonPath: "/about-me",
    homeworkPath: "/homework",
  },
  {
    id: "20",
    title: "He / She / It + Present Simple",
    level: "A1-A2",
    topic: "Third person",
    description:
      "Flashcards, spelling -s/-es/-ies, I → he/she drills, and speaking about another person.",
    lessonPath: "/lesson-20",
    homeworkPath: "/homework/20",
  },
  {
    id: "21",
    title: "Can + Third Person Review",
    level: "A1-A2",
    topic: "Can / can't + review",
    description:
      "Vocabulary cards, can for ability/request, third person drills, Test-English listening, and task-based speaking.",
    lessonPath: "/lesson-21",
    homeworkPath: "/homework/21",
  },
  {
    id: "22",
    title: "Present Simple Review + About Me",
    level: "A1-A2",
    topic: "Self-description + routine",
    description:
      "Review he/she/it and can, describe yourself in 5–7 sentences, routine vocabulary, YouTube + Test-English listening, mini writing.",
    lessonPath: "/lesson-22",
    homeworkPath: "/homework/22",
  },
];

export default function Lessons() {
  const practiceLesson = lessons.find(
    (lesson): lesson is Extract<LessonEntry, { practiceOnly: true }> =>
      Boolean(lesson.practiceOnly),
  );
  const regularLessons = [...lessons.filter((lesson) => !lesson.practiceOnly)].reverse();
  const displayLessons = practiceLesson
    ? [practiceLesson, ...regularLessons]
    : regularLessons;

  return (
    <div className="page-shell">
      <header className="page-hero panel">
        <p className="page-kicker">Course map</p>
        <h1>Lessons</h1>
        <p className="page-subtitle">
          Choose a lesson card to open the teaching page or jump to homework.
        </p>
      </header>

      <section className="cards-grid">
        {displayLessons.map((lesson) => (
          <article
            className={`lesson-card panel${lesson.practiceOnly ? " lesson-card--practice" : ""}`}
            key={lesson.id}
          >
            <div className="lesson-card-top">
              <span className="lesson-badge">
                {lesson.practiceOnly ? "Practice" : `Lesson ${lesson.id}`}
              </span>
              <span className="lesson-badge secondary">{lesson.level}</span>
            </div>

            <h2>{lesson.title}</h2>
            <p className="lesson-topic">{lesson.topic}</p>
            <p className="lesson-desc">{lesson.description}</p>

            <div className="card-actions">
              <Link className="action-btn primary" to={lesson.lessonPath}>
                {lesson.practiceOnly ? "Start practice" : "Open lesson"}
              </Link>
              {!lesson.practiceOnly && (
                <Link className="action-btn secondary" to={lesson.homeworkPath}>
                  Open homework
                </Link>
              )}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
