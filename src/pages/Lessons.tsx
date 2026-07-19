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
      "9 блоків для повторення: am/is/are, рутина, at/in/on, 3-тя особа, mixed quiz, sentence builder, fix mistakes і writing.",
    lessonPath: "/self-study",
    practiceOnly: true,
  },
  {
    id: "15",
    title: "Present Simple + Adverbs of frequency",
    level: "A1",
    topic: "Говоріння + частота",
    description:
      "Як сказати не лише what you do, а й how often — always, usually, sometimes, never.",
    lessonPath: "/lesson-15",
    homeworkPath: "/homework/15",
  },
  {
    id: "16",
    title: "Present Simple Practice",
    level: "A1-A2",
    topic: "Speaking drills",
    description:
      "Do / does, short answers, швидкі відповіді та speaking про щоденну рутину.",
    lessonPath: "/lesson-16",
    homeworkPath: "/homework/16",
  },
  {
    id: "17",
    title: "Present Simple + Speaking Video",
    level: "A1-A2",
    topic: "Video lesson",
    description:
      "Відео, повторення патернів Present Simple і швидке говоріння про свій день.",
    lessonPath: "/lesson-17",
    homeworkPath: "/homework/17",
  },
  {
    id: "18",
    title: "in / on / at / to",
    level: "A1-A2",
    topic: "Prepositions",
    description:
      "Прийменники часу, місця й руху: картинки, швидкі вправи та speaking.",
    lessonPath: "/lesson-18",
    homeworkPath: "/homework/18",
  },
  {
    id: "19",
    title: "Do expressions",
    level: "A1-A2",
    topic: "Vocabulary + speaking",
    description:
      "Фрази з do, порівняння do vs make, картки та picture tasks для говоріння.",
    lessonPath: "/lesson-19",
    homeworkPath: "/homework/19",
  },
  {
    id: "about-me",
    title: "About Me",
    level: "A1",
    topic: "To be + have got",
    description:
      "Інтерактивна сторінка: профілі людей, to be, I've got, порядок слів і writing про себе.",
    lessonPath: "/about-me",
    homeworkPath: "/homework",
  },
  {
    id: "20",
    title: "He / She / It + Present Simple",
    level: "A1-A2",
    topic: "Third person",
    description:
      "Flashcards, -s/-es/-ies, вправи I → he/she та speaking про іншу людину.",
    lessonPath: "/lesson-20",
    homeworkPath: "/homework/20",
  },
  {
    id: "21",
    title: "Can + Third Person Review",
    level: "A1-A2",
    topic: "Can / can't + review",
    description:
      "Can для вмінь і прохань, 3-тя особа, Test-English listening і task-based speaking.",
    lessonPath: "/lesson-21",
    homeworkPath: "/homework/21",
  },
  {
    id: "22",
    title: "Present Simple Review + About Me",
    level: "A1-A2",
    topic: "Self-description + routine",
    description:
      "Повтор Present Simple і can, опис себе, картинка парку, listening, лексика рутини та пошук помилок.",
    lessonPath: "/lesson-22",
    homeworkPath: "/homework/22",
  },
  {
    id: "23",
    title: "To be + Articles + Speaking",
    level: "A1-A2",
    topic: "a / an / the",
    description:
      "Активна практика am/is/are, правила артиклів, вправи на вибір і speaking з a/an/the.",
    lessonPath: "/lesson-23",
    homeworkPath: "/homework",
  },
  {
    id: "24",
    title: "Describing People",
    level: "A1-A2",
    topic: "Appearance + personality",
    description:
      "Відео, прикметники зовнішності й характеру, is / has got і speaking — опис людини.",
    lessonPath: "/lesson-24",
    homeworkPath: "/homework",
  },
  {
    id: "25",
    title: "Hello! Countries & Nationalities",
    level: "A1",
    topic: "be: I / you / we / they",
    description:
      "Знайомство і розповідь про себе: 12 країн, am/is/are, short answers, діалоги, читання та рольова гра.",
    lessonPath: "/lesson-25",
    homeworkPath: "/hw-25",
  },
];

export default function Lessons() {
  const practiceLesson = lessons.find(
    (lesson): lesson is Extract<LessonEntry, { practiceOnly: true }> =>
      Boolean(lesson.practiceOnly),
  );
  const regularLessons = [...lessons.filter((lesson) => !lesson.practiceOnly)].reverse();
  const insertAfterIdx = regularLessons.findIndex((l) => l.id === "23");
  const displayLessons = practiceLesson && insertAfterIdx !== -1
    ? [
        ...regularLessons.slice(0, insertAfterIdx + 1),
        practiceLesson,
        ...regularLessons.slice(insertAfterIdx + 1),
      ]
    : practiceLesson
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

        <article className="lesson-card panel lesson-card--resources">
          <div className="lesson-card-top">
            <span className="lesson-badge">Extra</span>
            <span className="lesson-badge secondary">Materials</span>
          </div>

          <h2>Extra resources</h2>
          <p className="lesson-topic">Visual materials</p>
          <p className="lesson-desc">
            16 інфографік і worksheets: phrasal verbs, idioms, WH questions,
            everyday actions, Harry Potter та ін.
          </p>

          <div className="card-actions">
            <Link className="action-btn primary" to="/extra-resources">
              Open visual materials
            </Link>
          </div>
        </article>
      </section>
    </div>
  );
}
