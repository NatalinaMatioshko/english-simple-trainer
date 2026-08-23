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
      homeworkPath?: string;
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
  {
    id: "26",
    title: "Jobs",
    level: "A1",
    topic: "be: he/she/it · jobs",
    description:
      "Ask and answer about jobs: warm-up, 8 jobs + stress, be he/she/it drills, profile speaking, Green Cross Hospital, homework.",
    lessonPath: "/lesson-26",
    homeworkPath: "/hw-26",
  },
  {
    id: "27",
    title: "About you & your family",
    level: "A1",
    topic: "profile · family · jobs · place of work · possessives",
    description:
      "Tell me about yourself and your family: profile, family tree, Unit 2 R1–R4 listening, job+place, reading chunks, speaking.",
    lessonPath: "/lesson-27",
    homeworkPath: "/hw-27",
  },
  {
    id: "28",
    title: "Speaking · he/she/it",
    level: "A1",
    topic: "Present Simple he / she / it · ask back · tell your story",
    description:
      "Speaking: ask back + tell your story. Video bridge ELLLO A1-06: listening quiz + grammar drill he/she/it. HW: video quiz + writing.",
    lessonPath: "/lesson-28",
    homeworkPath: "/hw-28",
  },
  {
    id: "29",
    title: "Everyday Objects · Numbers",
    level: "A1",
    topic: "this/that/these/those · everyday objects · numbers 1–100",
    description:
      "Part 1b: objects a–l, Max & Carla, demonstratives R5–R8. Part 2: numbers 1–100, question words with be, profiles R9–R14, shop dialogue. HW: flashcards + quiz.",
    lessonPath: "/lesson-29",
    homeworkPath: "/hw-29",
  },
  {
    id: "30",
    title: "Check & Reflect",
    level: "A1",
    topic: "Numbers review · days of the week · A1 full review",
    description:
      "Review: numbers + question words (L29) · days of the week · повна перевірка A1: speaking · reading · R4 · writing. HW: go flashcards · topic stations · quick correction. Separate A1 Level Test.",
    lessonPath: "/lesson-30",
    homeworkPath: "/hw-30",
  },
  {
    id: "31",
    title: "My town",
    level: "A1",
    topic: "places · there is/are · There's / There are",
    description:
      "Unit 3A: My town — places + There is/are, isn't/aren't, no/any. Listening, map match, grammar drills, speaking. HW: crossword.",
    lessonPath: "/lesson-31",
    homeworkPath: "/hw-31",
  },
  {
    id: "32",
    title: "WH-questions · was / were",
    level: "A1",
    topic:
      "Who · What · Where · When · Why · How often · do / does / to be · was / were",
    description:
      "Part 1: WH-questions + do/does/to be (не новий час). Part 2: was/were (past of to be). Practice + speaking. HW: recap drills. Unit 3B → Lesson 33 · Unit 3C → Lesson 34.",
    lessonPath: "/lesson-32",
    homeworkPath: "/hw-32",
  },
  {
    id: "33",
    title: "Is there wifi?",
    level: "A1",
    topic: "rooms · Is there…? · Are there any…? · How many…?",
    description:
      "Unit 3B: Is there wifi? — rooms & things in a home, Is/Are there, How many, flat listening (Jakub & William), grammar & speaking for one student.",
    lessonPath: "/lesson-33",
    homeworkPath: "/hw-33",
  },
  {
    id: "34",
    title: "It's expensive! · Present continuous",
    level: "A1",
    topic:
      "Unit 3C · opposite adjectives · North Norfolk · Present continuous",
    description:
      "Unit 3C: opposite adjectives, reading, adjective position, stress & speaking. Plus Present continuous rules, What are they doing?, and picture description (one student).",
    lessonPath: "/lesson-34",
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
              <span
                className="lesson-badge"
                aria-label={
                  lesson.practiceOnly ? "Practice" : `Lesson ${lesson.id}`
                }
              >
                {lesson.practiceOnly ? "Practice" : lesson.id}
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
              {!lesson.practiceOnly && lesson.homeworkPath && (
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
