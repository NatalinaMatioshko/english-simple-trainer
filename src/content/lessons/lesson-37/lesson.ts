import type { Lesson } from "../../../types/lesson";
import {
  lesson37AskPrompts,
  lesson37LookPrompts,
  lesson37NowMarkers,
  lesson37SimpleMarkers,
} from "./activities";
import { lesson37Homework } from "./homework";
import { lesson37Vocabulary } from "./vocabulary";

const markerPrompts = [
  ...lesson37SimpleMarkers,
  ...lesson37NowMarkers,
].map((item) => `${item.marker}\n${item.model}`);

const sameVerbPrompts = lesson37Vocabulary.map(
  (v) => `I ${v.term} every day.\nI am ${v.gloss} now.`,
);

export const lesson37: Lesson = {
  id: "37",
  number: 37,
  title: "Present continuous · now vs every day",
  level: "A1",
  moduleId: "a1-present",
  order: 37,
  status: "published",
  estimatedMinutes: 45,
  hasHomework: true,
  topic: "I work every day · I am working now",
  description:
    "Контраст every day vs now: work/eat/drink/read/talk/sit, маркери часу, speaking з викладачем і дві picture cards.",
  chips: [
    "work / working",
    "eat / eating",
    "every day · usually",
    "now · right now",
  ],
  legacyRoute: "/lesson-37",
  route: "/lessons/37",
  prevLessonPath: "/lessons/36",
  nextLessonPath: "/lessons/38",
  navLinks: [
    { label: "← Back to lessons", path: "/lessons" },
    { label: "← Lesson 36", path: "/lessons/36", ghost: true },
    { label: "HW37 →", path: "/hw-37", ghost: true },
    { label: "Lesson 38 →", path: "/lessons/38", ghost: true },
    { label: "Vocab →", path: "/vocab", ghost: true },
  ],
  homework: lesson37Homework,
  flow: [
    { href: "#l37-contrast", label: "1 Contrast" },
    { href: "#l37-words", label: "2 Words" },
    { href: "#l37-markers", label: "3 Markers" },
    { href: "#l37-same", label: "4 Same verb" },
    { href: "#l37-ask", label: "5 Ask" },
    { href: "#l37-look", label: "6 Now" },
    { href: "#l37-pics", label: "7 Pictures" },
    { href: "#l37-exit", label: "Exit" },
  ],
  sections: [
    {
      type: "text",
      id: "l37-contrast",
      kicker: "1 · Contrast",
      title: "Every day or now?",
      description: "Прочитай два речення вголос. Потім скажи їх викладачу.",
      body: "",
      bullets: ["I work every day.", "I am working now."],
      note: "Remember. every day / usually / often → Present Simple. now / right now / at the moment → am / is / are + -ing.",
    },
    {
      type: "vocabulary",
      id: "l37-words",
      kicker: "2 · Tiny vocabulary",
      title: "Six verbs only",
      description: "Прочитай слово і форму -ing. Цього досить на весь урок.",
      items: lesson37Vocabulary,
    },
    {
      type: "speakingPrompt",
      id: "l37-markers",
      kicker: "3 · Speak",
      title: "Time markers",
      description:
        "Take turns with your teacher. Викладач каже маркер — ти кажеш речення з одним із шести дієслів.",
      prompts: markerPrompts,
      note: "usually / often / always / sometimes / never — перед дієсловом. every day — в кінці. Model: Teacher: usually → You: I usually read. Teacher: right now → You: I am sitting right now.",
    },
    {
      type: "speakingPrompt",
      id: "l37-same",
      kicker: "4 · Speak",
      title: "The same verb twice",
      description:
        "Take turns with your teacher. Для кожного дієслова скажи два речення.",
      prompts: sameVerbPrompts,
      note: "Model. You: I drink every day. I am drinking now. Teacher: I talk every day. I am talking now.",
    },
    {
      type: "speakingPrompt",
      id: "l37-ask",
      kicker: "5 · Speak",
      title: "Ask and answer with your teacher",
      description:
        "Прочитай питання вголос і відповідай правдою. Потім запитай викладача.",
      prompts: [...lesson37AskPrompts],
      note: "Model. Teacher: What do you do every day? You: I work every day. I read every day. Teacher: What are you doing now? You: I am sitting. I am talking.",
    },
    {
      type: "speakingPrompt",
      id: "l37-look",
      kicker: "6 · Speak",
      title: "Look around · now",
      description:
        "Подивись на себе і на викладача. Скажи, що відбувається зараз.",
      prompts: [...lesson37LookPrompts],
      note: "Then contrast. I sit at my desk every day. I am sitting now.",
    },
    {
      type: "custom",
      id: "l37-pics",
      kicker: "7 · Pictures",
      title: "Look and speak",
      description:
        "Дві картки в ряд — натисни, щоб збільшити. Ліва: відповідай викладачу на питання. Права: скажи 10 речень про зараз (am / is / are + -ing).",
      componentKey: "lesson37-pictures",
      note: "Speak with your teacher. Full sentences. Left: They are in the kitchen. They are cooking. Right: They are playing football. She is reading a book. Then contrast: I cook every day. They are cooking now.",
    },
    {
      type: "text",
      id: "l37-exit",
      kicker: "Exit check",
      title: "Can you…?",
      body: "",
      bullets: [
        "Say the contrast: I work every day. I am working now.",
        "Do the same with 3 more verbs (eat, drink, read, talk, sit).",
        "Ask your teacher: What are you doing now?",
        "Use a marker: usually / often / right now / at the moment.",
      ],
    },
    {
      type: "homeworkLink",
      id: "l37-hw",
      kicker: "Homework",
      title: "Practice after class",
      path: lesson37Homework.path,
      label: lesson37Homework.label,
      summary: lesson37Homework.summary,
    },
  ],
};

export default lesson37;
