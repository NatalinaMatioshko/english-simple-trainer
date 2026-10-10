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
    title: "Can, review, and countries",
    summary:
      "Combined can / can't, Present Simple review, articles a / an, describing people, then countries, nationalities, and be with I / you / we / they.",
  },
  {
    range: "Lessons 26–30",
    title: "Jobs, family, objects, and A1 check",
    summary:
      "Jobs with he / she / it, family and possessives, Present Simple speaking, everyday objects and numbers, then a full A1 check and reflect.",
  },
  {
    range: "Lessons 31–37",
    title: "Town, questions, and now vs every day",
    summary:
      "There is / are and places in town, WH-questions and was / were, flats, adjectives with a Present continuous preview, directions, Present Simple daily verbs, then speaking: I work every day / I am working now.",
  },
  {
    range: "Lessons 38–44",
    title: "Have got, time, week, Past Simple, food",
    summary:
      "Have / has got and travel pack, dos and don’ts, telling the time, My week + travel chunks, Past Simple preview (yesterday), then Food and drink with frequency adverbs and ordering in a café.",
  },
];

const nextLessonsSummary: StageSummary[] = [
  {
    range: "Lessons 46–48",
    title: "Housework, skills, requests",
    summary:
      "Housework questions with does, can / can’t for skills, then make polite requests.",
  },
  {
    range: "Lessons 49–52",
    title: "Places, was/were, tickets",
    summary:
      "Wh- questions about places, good days with was/were and dates, ask how events were, then buy travel tickets.",
  },
  {
    range: "Lessons 53–56",
    title: "Past Simple stories",
    summary:
      "Regular and irregular Past Simple, questions about holidays, then greet people in real situations.",
  },
  {
    range: "Lessons 57–64",
    title: "Photos, hobbies, plans",
    summary:
      "Family photos and object pronouns, hobbies with like + -ing, study habits with because, goals with would like, then going to plans, seasons, and invitations.",
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
    title: "Present Simple + Adverbs of frequency",
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
    title: "Present Simple Practice",
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
    title: "Present Simple + Speaking Video",
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
    title: "in / on / at / to",
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
    title: "Do expressions",
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
    title: "Describing People",
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
      "R1–R15: country names, stress patterns, introductions, nationalities",
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
    status: "completed",
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
    status: "completed",
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
    listening: "R4 — Yasemin & Tara family photo (comprehension)",
    review: "Numbers + question words (L29); ALL Lessons 1–29 topics: identity → shop English",
    category: "general",
    status: "completed",
    route: "/lesson-30",
  },
  {
    id: 31,
    title: "My town",
    grammar: "There is / are · isn't / aren't · no / any",
    vocabulary: "places in town: café, park, station, supermarket, school…",
    speaking: "Describe your town to the teacher; find differences on the map",
    listening: "there's / isn't / are / aren't; place-name stress",
    review: "a / an; be; places in town",
    category: "general",
    status: "completed",
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
    status: "completed",
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
    review: "There is/are (L31); flats and rooms",
    category: "general",
    status: "completed",
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
    review: "There is/are (L31–33); PC preview",
    category: "general",
    status: "completed",
    route: "/lesson-34",
  },
  {
    id: 35,
    title: "English in action · Directions",
    grammar: "Is there a…? / Where's the…?; imperatives for directions",
    vocabulary: "places in town; streets; go straight on, turn left/right, go past, next to",
    speaking: "Give directions from the train station; guess the place",
    listening: "R14 route; R15 useful phrases; R16 three conversations",
    review: "Directions · there is/are (L31–33)",
    category: "general",
    status: "completed",
    route: "/lesson-35",
  },
  {
    id: 36,
    title: "Present Simple · daily verbs",
    grammar: "Present Simple I/you: do / don't; Wh- questions",
    vocabulary: "wake up, get dressed, teach, fix, sell, eat, read, play soccer",
    speaking: "Talk about morning, work, lunch and weekend with the teacher",
    listening: "ELLLO A1-04 four conversations (YouTube quiz)",
    review: "Present Simple (L28); directions (L35)",
    category: "general",
    status: "completed",
    route: "/lessons/36",
  },
  {
    id: 37,
    title: "Present continuous · now vs every day",
    grammar: "I work every day. / I am working now.",
    vocabulary: "work, eat, drink, read, talk, sit",
    speaking:
      "Ask your teacher and answer: What do you do every day? What are you doing now?",
    listening: "Picture speaking: kitchen scene + Present continuous cards",
    review: "Present Simple daily verbs (L36); PC preview (L34). Extra practice on HW37.",
    category: "general",
    status: "completed",
    route: "/lessons/37",
  },
  {
    id: 38,
    title: "You've got a friend",
    grammar: "have / has got (+ −); I've / He's contractions",
    vocabulary: "hair, eyes, beard, in his/her 20s",
    speaking: "Describe yourself and a friend with your teacher",
    listening: "R1–R2: describing people, contractions",
    review: "Describing People (L24); now vs every day (L37)",
    category: "people",
    status: "completed",
    route: "/lessons/38",
  },
  {
    id: 39,
    title: "Have you got it?",
    grammar: "Have / Has … got?; Yes, I have / No, I haven't",
    vocabulary: "bag, passport, tickets, camera, money",
    speaking: "Ask Have you got…? Talk about what is in your bag.",
    listening: "R3–R5: travel, Sam & Zara",
    review: "have / has got (L38); objects (L29)",
    category: "people",
    status: "completed",
    route: "/lesson-39",
  },
  {
    id: 40,
    title: "Dos and don'ts",
    grammar: "Imperatives: Visit… / Don't go…",
    vocabulary: "try, go to, visit, take, drink, see; London & Rome",
    speaking: "Give dos and don'ts for London / your city to your teacher",
    listening: "R9–R10: verb phrases, imperative stress",
    review: "Have you got…? (L39); describing people writing (L38 HW)",
    category: "people",
    status: "completed",
    route: "/lesson-40",
  },
  {
    id: 41,
    title: "What's the time?",
    grammar: "Telling the time: o'clock · past · to · quarter · half",
    vocabulary: "What time is it? / It's at…; digital clocks",
    speaking: "Ask and answer about clocks with your teacher",
    listening: "R11–R12: time dialogues · useful phrases",
    review: "Dos and don'ts (L40); numbers",
    category: "general",
    status: "completed",
    route: "/lesson-41",
  },
  {
    id: 42,
    title: "My week",
    grammar: "Present Simple I/you/we/they · Do you…?",
    vocabulary: "everyday activities; days; go by bus · leave · arrive",
    speaking: "Describe your week and how you travel — with your teacher",
    listening: "R1–R8: week schedule · Mari · travel",
    review: "Time (L41); days; Present Simple routines",
    category: "general",
    status: "completed",
    route: "/lesson-42",
  },
  {
    id: 43,
    title: "A long journey",
    grammar: "Past Simple preview: yesterday · -ed · went / had / got up",
    vocabulary: "travel chunks: leave · arrive · take a taxi · walk home",
    speaking: "Say five sentences about yesterday with your teacher",
    listening: "Travel · Do you…? dialogues",
    review: "My week (L42); Present Simple routines",
    category: "transport",
    status: "completed",
    route: "/lessons/43",
  },
  {
    id: 44,
    title: "Food and drink · Order in a café",
    grammar: "Frequency adverbs · he/she + -s · café phrases (I’d like…)",
    vocabulary: "tea, coffee, bread, eggs, cheese, fish, meat, salad, sandwiches…",
    speaking: "Talk about food habits; order food and a drink in a café",
    listening: "R10–R16: Tom’s habits · café dialogue",
    review: "Past Simple bridge (L43); Present Simple -s",
    category: "food",
    status: "completed",
    route: "/lessons/44",
  },
  {
    id: 45,
    title: "Good and bad habits",
    grammar: "Present Simple he/she/it · time expressions",
    vocabulary:
      "in the morning, in the afternoon, in the evening, at night, at the weekend, every day, every week · habit",
    speaking: "Talk about another person’s habits with your teacher",
    listening: "Verb endings /s/ /z/ /ɪz/ · habit dialogues",
    review: "Frequency (L44); he/she + -s",
    category: "general",
    status: "completed",
    route: "/lessons/45",
  },
  {
    id: 46,
    title: "Jobs around the house",
    grammar: "Present Simple questions: Does he/she…?",
    vocabulary: "housework: cook, clean, wash, tidy, do the shopping…",
    speaking: "Ask and answer about things people often do at home",
    listening: "Strong and weak does · short housework talks",
    review: "Habits (L45); does / doesn’t",
    category: "general",
    status: "completed",
    route: "/lessons/46",
  },
  {
    id: 47,
    title: "Skills",
    grammar: "can / can’t for ability",
    vocabulary: "skills: swim, drive, cook, speak, play…",
    speaking: "Ask and answer about things you can and can’t do",
    listening: "Strong and weak can · ability dialogues",
    review: "can / can’t (L21); housework questions (L46)",
    category: "general",
    status: "current",
    route: "/lessons/47",
  },
  {
    id: 48,
    title: "Review · My week",
    grammar: "Present Simple · he/she + -s · Does…? · frequency",
    vocabulary: "on Monday · in the morning · at night · at work · go home",
    speaking: "6 sentences about your week + 1–2 Does…? questions",
    listening: "Quick time drill · teacher Q&A",
    review: "Habits (L45); housework questions (L46); skills (L47)",
    category: "general",
    status: "next",
    route: "/lessons/48",
  },
  {
    id: 49,
    title: "Review · Yesterday",
    grammar: "Past Simple · was · went / had / got up · -ed",
    vocabulary: "got up · had breakfast · went to work · was at work · went home",
    speaking: "5–7 sentences about yesterday (morning → evening)",
    listening: "Story check with teacher",
    review: "Past Simple start (L43); My week (L48)",
    category: "general",
    status: "next",
    route: "/lessons/49",
  },
  {
    id: 50,
    title: "English in action · Make requests",
    grammar: "Can I…? / Can you…? · polite requests",
    vocabulary: "open, close, help, pass, wait, come in…",
    speaking: "Make and respond to requests with your teacher",
    listening: "Request dialogues · intonation",
    review: "can / can’t (L47); Yesterday story (L49)",
    category: "general",
    status: "next",
  },
  {
    id: 51,
    title: "Questions · day & work",
    grammar: "Where / What time / When + do you…?",
    vocabulary: "day · work · familiar week phrases",
    speaking: "Ask about a typical day with your teacher",
    listening: "Short question–answer drills",
    review: "My week (L48); requests (L50)",
    category: "general",
    status: "next",
  },
  {
    id: 52,
    title: "A good day",
    grammar: "was / were · there was / there were",
    vocabulary: "months · dates · good-day phrases",
    speaking: "Talk about good days in the past",
    listening: "wasn’t / weren’t · event descriptions",
    review: "Yesterday story (L49); was/were preview (L32)",
    category: "general",
    status: "next",
  },
  {
    id: 53,
    title: "How was it?",
    grammar: "was / were questions · there was / were questions",
    vocabulary: "adjectives for events: great, awful, interesting, boring…",
    speaking: "Ask and answer about past events",
    listening: "Strong and weak was / were · event chats",
    review: "A good day (L52)",
    category: "general",
    status: "next",
  },
  {
    id: 54,
    title: "English in action · Buy travel tickets",
    grammar: "Ticket phrases · How much…? · single / return",
    vocabulary: "train, bus, ticket, platform, departure…",
    speaking: "Buy tickets in a role-play with your teacher",
    listening: "Ticket-office dialogues",
    review: "Travel (L43); How was it? (L53)",
    category: "transport",
    status: "next",
  },
  {
    id: 55,
    title: "When I was young",
    grammar: "Past Simple regular verbs (-ed)",
    vocabulary: "verb phrases about childhood / school",
    speaking: "Give a short talk about when you were young",
    listening: "-ed endings /t/ /d/ /ɪd/",
    review: "was/were (L52–53); regular -ed (L43)",
    category: "general",
    status: "next",
  },
  {
    id: 56,
    title: "You had a bad day",
    grammar: "Past Simple irregular verbs · didn’t",
    vocabulary: "common irregulars: had, went, saw, bought, left…",
    speaking: "Talk about a bad day with your teacher",
    listening: "Silent letter in didn’t · bad-day stories",
    review: "When I was young (L55); irregular preview (L43)",
    category: "general",
    status: "next",
  },
  {
    id: 57,
    title: "Good places",
    grammar: "Past Simple questions (Did you…?)",
    vocabulary: "holiday activities: swim, visit, stay, travel…",
    speaking: "Talk about a holiday",
    listening: "Linking sounds · holiday dialogues",
    review: "Irregular Past (L56)",
    category: "general",
    status: "next",
  },
  {
    id: 58,
    title: "English in action · Greet people",
    grammar: "Hello / Hi / Nice to meet you · How are you?",
    vocabulary: "greeting and leave-taking phrases",
    speaking: "Greet people in short role-plays",
    listening: "Greeting dialogues",
    review: "Good places (L57); social English",
    category: "people",
    status: "next",
  },
  {
    id: 59,
    title: "Family photos",
    grammar: "Object pronouns (me, him, her, us, them)",
    vocabulary: "prepositions of place: next to, behind, in front of…",
    speaking: "Talk about the people in a photo",
    listening: "Weak object pronouns · photo descriptions",
    review: "Family (L27); describing people (L38)",
    category: "people",
    status: "next",
  },
  {
    id: 60,
    title: "Hobbies",
    grammar: "like / enjoy / love / hate + -ing",
    vocabulary: "hobbies: reading, swimming, cooking, gaming…",
    speaking: "Ask and answer about things you like doing",
    listening: "Weak -ing · hobby chats",
    review: "Family photos (L59); everyday activities",
    category: "general",
    status: "next",
  },
  {
    id: 61,
    title: "Study habits",
    grammar: "why / because",
    vocabulary: "learning a language · study phrases",
    speaking: "Ask and answer about study habits",
    listening: "because in short answers · study talks",
    review: "Hobbies (L60)",
    category: "general",
    status: "next",
  },
  {
    id: 62,
    title: "English in action · Suggestions",
    grammar: "Let’s… / Why don’t we…? · responding to suggestions",
    vocabulary: "free-time suggestions",
    speaking: "Make and respond to suggestions with your teacher",
    listening: "Suggestion dialogues",
    review: "Study habits (L61)",
    category: "general",
    status: "next",
  },
  {
    id: 63,
    title: "Goals",
    grammar: "would like / would love to",
    vocabulary: "dreams and wishes · collocations",
    speaking: "Ask and answer about dreams and wishes",
    listening: "’d like · goal dialogues",
    review: "Suggestions (L62)",
    category: "general",
    status: "next",
  },
  {
    id: 64,
    title: "Party time",
    grammar: "be going to (plans)",
    vocabulary: "party vocabulary: invite, decorate, bring, celebrate…",
    speaking: "Talk about plans for a party",
    listening: "going to · party plans",
    review: "Goals (L63)",
    category: "general",
    status: "next",
  },
  {
    id: 65,
    title: "My plans",
    grammar: "be going to questions",
    vocabulary: "seasons · time expressions for the year",
    speaking: "Ask and answer about plans for the year",
    listening: "Linking words · plan dialogues",
    review: "Party time (L64)",
    category: "general",
    status: "next",
  },
  {
    id: 66,
    title: "English in action · Invitations",
    grammar: "Would you like to…? · Yes, I’d love to / Sorry, I can’t",
    vocabulary: "invitation phrases",
    speaking: "Make and respond to invitations with your teacher",
    listening: "Invitation dialogues",
    review: "My plans (L65); course wrap-up speaking",
    category: "people",
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

function centerCardInScroller(container: HTMLElement, card: HTMLElement) {
  if (container.scrollHeight - container.clientHeight > 8) {
    const containerRect = container.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const delta =
      cardRect.top -
      containerRect.top -
      container.clientHeight / 2 +
      cardRect.height / 2;
    const previousBehavior = container.style.scrollBehavior;
    container.style.scrollBehavior = "auto";
    container.scrollTop = Math.max(0, container.scrollTop + delta);
    container.style.scrollBehavior = previousBehavior;
    return;
  }

  card.scrollIntoView({ block: "center", inline: "nearest", behavior: "auto" });
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
    let timer = 0;

    const placeCurrentCardInView = () => {
      const currentCard = cardRefs.current[currentIndex];
      if (!currentCard || container.clientHeight < 40) return;
      centerCardInScroller(container, currentCard);
    };

    const attempt = (left: number) => {
      placeCurrentCardInView();
      if (left <= 0) return;
      timer = window.setTimeout(() => attempt(left - 1), 60);
    };

    const start = () => {
      window.clearTimeout(timer);
      attempt(6);
    };

    start();

    const details = container.closest("details");
    const onToggle = () => {
      if (details && !details.open) return;
      start();
    };
    details?.addEventListener("toggle", onToggle);

    return () => {
      window.clearTimeout(timer);
      details?.removeEventListener("toggle", onToggle);
    };
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
        <h2>Roadmap for Lessons 1–64</h2>
        <p className="roadmap-lead">
          The course moves from self-introduction and <strong>to be</strong> to
          daily routines, town English, have got, time and the week, a first
          Past Simple step, food and café English — then habits, skills,
          past stories, hobbies, and future plans.
        </p>

        <div className="roadmap-current">
          <span className="roadmap-current-label">Current lesson</span>
          <strong>Lesson {currentLesson.id}</strong>
          <p className="roadmap-current-title">{currentLesson.title}</p>
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
            then where and when things happen. Next come habits and skills,
            stronger Past Simple stories, photos and hobbies, then goals and
            plans with going to.
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
              <h3>Lessons 1–64</h3>
              <p>
                Interactive lessons are live through Jobs around the house
                (Lesson 46). Lessons 47–64 are the planned path ahead.
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
