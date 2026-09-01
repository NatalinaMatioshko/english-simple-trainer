import { Link } from "react-router-dom";
import "../styles/pages.css";

const homeworkByLesson = [
  {
    id: "36",
    title: "Present Simple · daily verbs",
    href: "/hw-36",
    tasks: [
      {
        type: "text",
        text: "Watch ELLLO A1-04, then listening quiz + complete the sentences",
      },
      {
        type: "text",
        text: "do / don't / does + word-order questions from the video",
      },
      {
        type: "text",
        text: "Write answers about your routine; check at / to (to do) / time",
      },
      {
        type: "text",
        text: "Send results to teacher",
      },
    ],
  },
  {
    id: "35",
    title: "Check and reflect",
    href: "/hw-35",
    tasks: [
      {
        type: "text",
        text: "Task 1: places in town + there is / there are + correct the mistakes",
      },
      {
        type: "text",
        text: "Task 2: adjectives, rewrite sentences, word order + Reflect 1–5",
      },
      {
        type: "text",
        text: "Send results to teacher",
      },
    ],
  },
  {
    id: "34",
    title: "It's expensive!",
    href: "/hw-34",
    tasks: [
      {
        type: "text",
        text: "Task 1: word order + questions about your town + prepare 3 towns",
      },
      {
        type: "text",
        text: "Task 2: check — WH-questions + Present continuous",
      },
      {
        type: "text",
        text: "Send results to teacher",
      },
    ],
  },
  {
    id: "33",
    title: "Is there wifi?",
    href: "/hw-33",
    tasks: [
      {
        type: "text",
        text: "Task 1: Is there / Are there — There is / There are",
      },
      {
        type: "text",
        text: "Task 2: Brighton flat — answer questions + a / an",
      },
      {
        type: "text",
        text: "Send results to teacher",
      },
    ],
  },
  {
    id: "32",
    title: "WH-questions · was / were",
    href: "/hw-32",
    tasks: [
      {
        type: "text",
        text: "Task 1: WH-questions — be/do/does + match answer to question",
      },
      {
        type: "text",
        text: "Task 2: was/were — choose + put words in order",
      },
      {
        type: "text",
        text: "Send results to teacher",
      },
    ],
  },
  {
    id: "31",
    title: "Town & home",
    href: "/hw-31",
    tasks: [
      {
        type: "text",
        text: "Crossword: places · home · adjectives from Lesson 31",
      },
      {
        type: "text",
        text: "Drag match: English → Ukrainian (3 rounds) + sound on drop",
      },
      {
        type: "text",
        text: "Send crossword + match results to teacher",
      },
    ],
  },
  {
    id: "30",
    title: "Check & Reflect practice",
    href: "/hw-30",
    tasks: [
      {
        type: "text",
        text: "Flashcards: phrases with go (go to work / school / bed / shopping…)",
      },
      {
        type: "text",
        text: "Topic stations: All topics · Lessons 1–29 (speak + mini quiz)",
      },
      {
        type: "text",
        text: "Quick correction: Common A1 mistakes (Lesson 30 · exercise 7)",
      },
      {
        type: "text",
        text: "Reflect: How confident are you? (1–5) — окрема форма вчителю",
      },
      {
        type: "text",
        text: "Optional: A1 Level Test → /a1-level-test",
      },
    ],
  },
  {
    id: "29",
    title: "Numbers",
    href: "/hw-29",
    tasks: [
      {
        type: "text",
        text: "Match: numbers 1–10 (картинки → one…ten)",
      },
      {
        type: "text",
        text: "Shop dialogue: Complete the conversation (Rosa / Assistant)",
      },
      {
        type: "text",
        text: "Quiz: numbers · teen/ty & profiles · grammar · WH words (Who…Whom)",
      },
      {
        type: "text",
        text: "Writing: 3 people — age, from, job",
      },
      {
        type: "text",
        text: "Check & Reflect: family · 's · possessives · objects · this/that · numbers · questions",
      },
    ],
  },
  {
    id: "28",
    title: "Everyday things",
    href: "/hw-28",
    tasks: [
      {
        type: "text",
        text: "Flashcards: objects a–l · office · this/that/these/those",
      },
      {
        type: "text",
        text: "Quiz / Test: Vocabulary · Listening (Max & Carla) · Grammar",
      },
      {
        type: "text",
        text: "Writing: 6–8 sentences about things in your room",
      },
    ],
  },
  {
    id: "27",
    title: "About you & your family",
    href: "/hw-27",
    tasks: [
      {
        type: "text",
        text: "Writing: 6–10 sentences about you and your family",
      },
      {
        type: "text",
        text: "Listening: My family — Exercise 1 only (test-english)",
      },
      {
        type: "text",
        text: "Flashcards: Lessons 25–26–27 (countries, jobs, family)",
      },
      {
        type: "text",
        text: "Test: Lessons 25–26–27 checkpoint",
      },
    ],
  },
  {
    id: "26",
    title: "Jobs",
    href: "/hw-26",
    tasks: [
      { type: "text", text: "Transform drill — be: he/she/it" },
      { type: "text", text: "Three drills: substitution, Q–A, correction" },
      { type: "text", text: "Listening R8: Patrick — listen and complete" },
      {
        type: "text",
        text: "Online: Countries and nationalities (test-english vocabulary)",
      },
      {
        type: "text",
        text: "Online: this / that / these / those (test-english grammar)",
      },
      {
        type: "text",
        text: "Online: Write a personal profile (test-english writing)",
      },
    ],
  },
  {
    id: "25",
    title: "Hello! Countries & Nationalities",
    href: "/hw-25",
    tasks: [
      { type: "text", text: "Grammar practice: Complete with the correct form of be" },
      { type: "text", text: "Grammar practice: Fill in 're · are · aren't" },
      { type: "text", text: "Reading: Me and my friends — True or False?" },
      { type: "text", text: "Check & Reflect: sentence ordering, be forms, correct sentences, nationalities, alternatives, fill-in text" },
    ],
  },
  {
    id: "22",
    title: "Present Simple Review + About Me",
    tasks: [
      {
        type: "link",
        label: "Завдання 1–2–3",
        description:
          "Відкрий посилання на Test-English і виконай завдання 1, 2 і 3 про can / can't.",
        href: "https://test-english.com/grammar-points/a1/can-cant/",
      },
      {
        type: "link",
        label: "Завдання 4",
        description:
          "Відкрий посилання і виконай завдання 4: Present Simple, форми to be.",
        href: "https://test-english.com/grammar-points/a1/present-simple-forms-of-to-be/4/",
      },
      {
        type: "link",
        label: "Читання і вправи під ним",
        description:
          "Прочитай текст Guess who? і виконай усі вправи під текстом.",
        href: "https://test-english.com/reading/a1/guess-who-a1-english-reading-test/",
      },
      {
        type: "link",
        label: "Writing about my family",
        description:
          "Відкрий сторінку writing і напиши короткий текст про свою сім'ю за інструкцією на сайті.",
        href: "https://test-english.com/writing/a1/writing-about-my-family/",
      },
    ],
  },
  {
    id: "21",
    title: "Can + Third Person Review",
    tasks: [
      {
        type: "link",
        label: "Test-English — How often do you…? (A1 Listening)",
        href: "https://test-english.com/listening/a1/how-often-do-you-a1-english-listening-test/",
      },
      {
        type: "text",
        text: "Write 8 sentences about a family member using he / she + works, lives, likes, has, goes…",
      },
      {
        type: "text",
        text: "Write 4 questions with Does…? and 4 negative sentences with doesn't.",
      },
      {
        type: "text",
        text: "Write 5 sentences with can and 5 with can't about your real abilities.",
      },
      {
        type: "text",
        text: "Write 3 polite requests: Can you…?",
      },
      {
        type: "text",
        text: "Send a voice message: 5 facts about your brother/sister + compare your routine with theirs.",
      },
    ],
  },
  {
    id: "20",
    title: "He / She / It + Present Simple",
    tasks: [
      {
        type: "text",
        text: "Write 8 sentences about one person (he or she) using -s / -es / -ies forms: works, watches, studies, has…",
      },
      {
        type: "text",
        text: "Write 4 questions with Does he/she…? and short answers.",
      },
      {
        type: "text",
        text: "Write 4 negative sentences with doesn't + base verb.",
      },
      {
        type: "text",
        text: "Describe your mother's or father's daily routine in 6–8 sentences.",
      },
      {
        type: "text",
        text: "Send a short voice message describing a friend or family member (5–7 sentences).",
      },
    ],
  },
  {
    id: "19",
    title: "Do expressions + in / on / at practice",
    tasks: [
      {
        type: "link",
        label: "Test-English — Prepositions of time (page 3)",
        href: "https://test-english.com/grammar-points/a1/at-in-on-prepositions-time/3/",
      },
      {
        type: "link",
        label: "Test-English — Prepositions of place (page 2)",
        href: "https://test-english.com/grammar-points/a1/at-in-on-prepositions-of-place/2/",
      },
      {
        type: "link",
        label: "Test-English — Prepositions of place (page 3)",
        href: "https://test-english.com/grammar-points/a1/at-in-on-prepositions-of-place/3/",
      },
      {
        type: "text",
        text: "Write 6 sentences about your real day using at / in / on, for example: at 7 o’clock, in the morning, on Monday.",
      },
      {
        type: "text",
        text: "Write 6 short collocations: 3 with do and 3 with make, then make your own 2 sentences with them.",
      },
      {
        type: "text",
        text: "Send a short voice message about your routine and use at least 3 prepositions and 2 phrases with do or make.",
      },
    ],
  },
  {
    id: "18",
    title: "in / on / at / to",
    tasks: [
      {
        type: "text",
        text: "Write 6 sentences about your real routine using in / on / at / to.",
      },
      {
        type: "text",
        text: "Make 4 short questions with time and place expressions, for example: What time do you wake up? / Are you at home in the evening?",
      },
      {
        type: "text",
        text: "Send a short voice message about your day and use at least 5 target phrases, for example: at 7 o’clock, on Monday, in the morning, at work, to the gym.",
      },
    ],
  },
  {
    id: "17",
    title: "Present Simple + Speaking Video",
    tasks: [
      { type: "text", text: "Writing — 'My Daily Routine'" },
      { type: "text", text: "Reading test on test-english.com" },
      {
        type: "text",
        text: "Quiz in the app: complete Lesson17Quiz until Correct",
      },
    ],
  },
  {
    id: "16",
    title: "Present Simple Practice",
    tasks: [
      {
        type: "text",
        text: "Write 5 do/does questions about your routine.",
      },
      {
        type: "text",
        text: "Give short answers to each question.",
      },
      {
        type: "text",
        text: "Make 3 questions about your family or friends.",
      },
    ],
  },
  {
    id: "15",
    title: "Present Simple + Adverbs of frequency",
    tasks: [
      {
        type: "text",
        text: "Write 5 sentences about your routine using always / usually / often / sometimes / never.",
      },
      {
        type: "text",
        text: "Record yourself answering 5 How often... questions.",
      },
      {
        type: "text",
        text: "Make a mini routine about morning, work/school, evening, and bedtime.",
      },
    ],
  },
];

export default function Homework() {
  return (
    <div className="page-shell">
      <header className="page-hero panel">
        <p className="page-kicker">Practice</p>
        <h1>Homework</h1>
        <p className="page-subtitle">
          Click a lesson card to open the homework page.
        </p>
      </header>

      <section className="homework-list">
        {homeworkByLesson.map((lesson) => (
          <Link
            key={lesson.id}
            to={"href" in lesson && lesson.href ? lesson.href : `/homework/${lesson.id}`}
            className="panel homework-card homework-card-link"
          >
            <h2>Lesson {lesson.id}</h2>
            <p className="lesson-topic">{lesson.title}</p>

            <ol className="homework-steps">
              {lesson.tasks.map((task, index) => (
                <li key={`${lesson.id}-${index}`}>
                  {task.type === "link" ? (
                    <>
                      <strong>{"label" in task ? task.label : ""}</strong>
                      {"description" in task && task.description
                        ? ` — ${task.description}`
                        : null}
                    </>
                  ) : "text" in task ? (
                    task.text
                  ) : null}
                </li>
              ))}
            </ol>

            <span className="homework-open">Open homework</span>
          </Link>
        ))}
      </section>

      <div className="homework-actions">
        <Link className="back-link" to="/lessons">
          Back to lessons
        </Link>

        <Link className="home-link" to="/">
          Go to home
        </Link>
      </div>
    </div>
  );
}
