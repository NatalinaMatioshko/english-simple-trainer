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
  {
    range: "Lessons 21–25",
    title: "Can, review, and Unit 1A",
    summary:
      "Combined can / can't, Present Simple review, articles a / an, describing people, then Roadmap A1 Unit 1A — countries, nationalities, and be with I / you / we / they.",
  },
];

const nextLessonsSummary: StageSummary[] = [
  {
    range: "Lessons 30–34",
    title: "Unit 3 · My town",
    summary:
      "A1 review, places in town, flats (Is there wifi?), opposite adjectives, and a Present continuous preview with picture exercises.",
  },
  {
    range: "Lessons 35–40",
    title: "Unit 4–5 · Family & daily life",
    summary:
      "Family photos, daily routines, adverbs of frequency, can / can't, Present continuous, and simple vs continuous contrast.",
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
    status: "completed",
    route: "/lesson-22",
  },
  {
    id: 23,
    title: "To be + Articles + Speaking",
    grammar: "am / is / are review; a / an / the — first mention vs specific",
    vocabulary:
      "a book, an apple, a teacher, an umbrella, the sun, the door, the park",
    speaking:
      "Introduce yourself with to be; describe your room with a/an/the; answer EN questions aloud.",
    listening: "Teacher-led oral drills and article choice tasks.",
    review: "to be, Lesson 22 self-description, basic nouns from earlier lessons.",
    category: "general",
    status: "completed",
    route: "/lesson-23",
  },
  {
    id: 24,
    title: "Describing people",
    grammar: "Adjectives, has got / is, simple descriptive structures",
    vocabulary: "tall, short, friendly, quiet, funny, dark hair, glasses",
    speaking: "Describe a person from the video or from your life (5–6 sentences).",
    listening: "YouTube video — watch and describe the people you see.",
    review: "Family, third person, appearance words, to be, articles.",
    category: "people",
    status: "completed",
    route: "/lesson-24",
  },
  {
    id: 25,
    title: "Hello! Countries & Nationalities",
    grammar:
      "am / is / are — I / you / we / they; positive, negative, question forms; short answers with be",
    vocabulary:
      "12 countries and nationalities: Spain, Canada, Japan, the US, Poland, Argentina, Thailand, the UK, Turkey, Mexico, Brazil, Italy",
    speaking:
      "Introduce yourself and others; roleplay conference conversations; describe where people are from.",
    listening:
      "Roadmap A1 R1–R15: country names, stress patterns, introductions, nationalities",
    review: "to be basics, lesson 24 descriptions, articles, simple questions.",
    category: "general",
    status: "completed",
    route: "/lesson-25",
  },
  {
    id: 26,
    title: "Jobs",
    grammar:
      "be: he / she / it — He's / She's / It's, isn't, Is he…?, Where's she from?",
    vocabulary:
      "8 core jobs: football player, doctor, school teacher, pilot, farmer, nurse, taxi driver, office worker (+ Vocabulary Bank)",
    speaking:
      "Ask and answer about jobs and origin; profile cards; mini dialogues (job & where from).",
    listening:
      "R6–R8: job stress, he/she/it short forms, Patrick dialogue (listen and complete)",
    review: "Countries / the UK·the US; to be; articles with jobs (a / an).",
    category: "people",
    status: "completed",
    route: "/lesson-26",
  },
  {
    id: 27,
    title: "About you & your family",
    grammar: "possessive 's; my / his / her / their; job + place of work",
    vocabulary:
      "family (mother, father, brother, sister, husband, wife, son, daughter) · jobs · hospital / school / office",
    speaking:
      "Tell me about yourself and your family — profile from homework + family jobs/places",
    listening:
      "R1–R4: family words, photo captions, they're/their etc., Yasemin & Tara dialogue",
    review: "Lesson 26 jobs; countries; personal profile writing",
    category: "people",
    status: "completed",
    route: "/lesson-27",
  },
  {
    id: 28,
    title: "Speaking · he/she/it",
    grammar: "Present Simple he / she / it: verb -s/-es · does / doesn't",
    vocabulary:
      "Everyday activity verbs (have breakfast, go, play, write, read, sleep, work, cook, draw, ride a bike)",
    speaking:
      "Ask back: listen → ask the question; tell your story (4–8 sentences on chosen topic)",
    listening:
      "Video ELLLO A1-06: listening quiz (6 questions) + grammar drill · does / doesn't",
    review: "Personal info, family, jobs, routines, hobbies (L25–27)",
    category: "general",
    status: "current",
    route: "/lesson-28",
  },
  {
    id: 29,
    title: "Everyday Objects · Numbers",
    grammar:
      "this / that / these / those; question words with be (Who / How old / What / Where / When)",
    vocabulary:
      "Everyday objects a–l (book, phone, desk, key, table, clock, photo, computer, box, chair, cup, pen) · numbers 1–100 (teens / tens)",
    speaking:
      "What’s this/that? / What are these/those?; ask about age, job, nationality; shop dialogue",
    listening:
      "R5–R8: objects match, Max & Carla office, this/these contrast, picture dialogues; R9–R14: numbers, profiles (Anna / Bill / Satoru), 's pronunciation",
    review: "he/she/it (L28); family & jobs (L27); be questions",
    category: "general",
    status: "next",
    route: "/lesson-29",
  },
  {
    id: 30,
    title: "Check & Reflect",
    grammar:
      "Mixed A1: to be · do/does · have/has · possessives · a/an · this/that · can · prepositions · Present Simple",
    vocabulary:
      "Family · jobs · nationalities · appearance · routine · objects · numbers · days of the week · shop phrases (full review)",
    speaking:
      "15 topic stations + personal profile; family/jobs photos; describe a person",
    listening: "R4 Unit 2 — Yasemin & Tara family photo (comprehension)",
    review: "Numbers + question words (L29); ALL Lessons 1–29 topics: identity → shop English",
    category: "general",
    status: "next",
    route: "/lesson-30",
  },
  {
    id: 31,
    title: "My town",
    grammar: "There is/are · isn't/aren't · no/any",
    vocabulary: "places in town",
    speaking: "Describe your town; find differences",
    listening: "there's/isn't/are/aren't; place stress",
    review: "a/an; be; Unit 3A",
    category: "general",
    status: "next",
    route: "/lesson-31",
  },
  {
    id: 32,
    title: "WH-questions · was / were",
    grammar:
      "WH-questions with to be and do/does; was/were — past of to be; Yes/No + WH with was/were",
    vocabulary:
      "Who, What, Where, When, Why, How often; yesterday, last week, at home / at work / at the gym",
    speaking:
      "Ask and answer WH-questions; talk about yesterday / last week with was/were",
    listening: "stress on do/does vs is/are; was vs were",
    review: "Present Simple questions; to be questions; past of to be",
    category: "general",
    status: "next",
    route: "/lesson-32",
  },
  {
    id: 33,
    title: "Is there wifi?",
    grammar:
      "Is there a/an…? / Are there any…?; How many; There is / There are",
    vocabulary: "rooms & things in a home (bathroom, wifi, lift…)",
    speaking:
      "Ask about a flat; answer Ukrainian prompts in English; choose a holiday flat",
    listening: "intonation for Is there…?; Jakub & William flat conversation",
    review: "There is/are (L31); Unit 3B",
    category: "general",
    status: "next",
    route: "/lesson-33",
  },
  {
    id: 34,
    title: "It's expensive! · Present continuous",
    grammar:
      "adjective position (be + adj · adj + noun); Present continuous (am/is/are + -ing)",
    vocabulary:
      "opposite adjectives; action verbs (park, town scenes); word bank for -ing forms",
    speaking:
      "Describe towns; What are they doing? gaps; describe picture scenes to the teacher",
    listening: "R12 adjective sentences; R13 adjective + noun stress",
    review: "There is/are (L31–33); Unit 3C + PC preview",
    category: "general",
    status: "next",
    route: "/lesson-34",
  },
  {
    id: 35,
    title: "English in action · Directions",
    grammar: "Is there a…? / Where's the…?; imperatives for directions",
    vocabulary: "places in town; streets; go straight on, turn left/right, go past, next to",
    speaking: "Give directions from the train station; guess the place",
    listening: "R14 route; R15 useful phrases; R16 three conversations",
    review: "Unit 3D · there is/are (L31–33)",
    category: "general",
    status: "next",
    route: "/lesson-35",
  },
  {
    id: 36,
    title: "From morning to night",
    grammar: "prepositions of time (at, in, on) and place (at, in, to)",
    vocabulary: "daily routine; times of day",
    speaking: "Describe your typical day to the teacher",
    listening: "routine phrases; linking",
    review: "Unit 4B · prepositions",
    category: "general",
    status: "next",
  },
  {
    id: 37,
    title: "Blue Zones",
    grammar: "position of adverbs; expressions of frequency",
    vocabulary: "months; always / usually / sometimes / never",
    speaking: "How often do you…? — ask and answer with the teacher",
    listening: "adverbs and frequency phrases",
    review: "Unit 4C · adverbs",
    category: "general",
    status: "next",
  },
  {
    id: 38,
    title: "Vote for me!",
    grammar: "can / can't",
    vocabulary: "verb phrases (buy a newspaper, send an email…)",
    speaking: "What can you do? — short presentation to the teacher",
    listening: "can / can't sentence stress",
    review: "Unit 5A · ability",
    category: "general",
    status: "next",
  },
  {
    id: 39,
    title: "A quiet life?",
    grammar: "Present continuous — be + verb + -ing (full unit)",
    vocabulary: "noise verbs; action phrases",
    speaking: "Describe what people are doing now",
    listening: "/ŋ/; present continuous in context",
    review: "PC preview (L34); Unit 5B",
    category: "general",
    status: "next",
  },
  {
    id: 40,
    title: "A city for all seasons",
    grammar: "Present simple or Present continuous?",
    vocabulary: "weather and seasons; places in London",
    speaking: "Compare habits vs actions happening now",
    listening: "simple vs continuous contrast",
    review: "Present Simple (L28); Present continuous",
    category: "general",
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
        <h2>Roadmap for Lessons 1–40</h2>
        <p className="roadmap-lead">
          The course moves from self-introduction and <strong>to be</strong> to
          daily routines, countries, jobs, shopping, transport, health, and
          stronger real-life speaking.
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
              <h3>Lessons 1–40</h3>
              <p>
                This is the complete course line from the first lesson through
                Unit 3 (live) and planned Units 4–5.
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
