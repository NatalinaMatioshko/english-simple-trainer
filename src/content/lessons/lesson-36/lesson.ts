import type { Lesson } from "../../../types/lesson";
import {
  doDont,
  listenQuiz,
  speakPrompts,
  VIDEO_ID,
  videoGaps,
  wordOrder36,
} from "./activities";
import { lesson36Homework } from "./homework";

export const lesson36: Lesson = {
  id: "36",
  number: 36,
  title: "Present Simple · daily verbs",
  level: "A1",
  moduleId: "a1-present",
  order: 36,
  status: "published",
  estimatedMinutes: 50,
  hasHomework: true,
  topic: "I wake up · I teach · I eat in the park",
  description:
    "ELLLO A1-04: відео Present Simple, listening quiz, complete the sentences, do/don't і speaking про свою рутину з викладачем.",
  chips: [
    "get up at 6",
    "teach math",
    "fix bikes",
    "play soccer",
    "do / don't",
  ],
  legacyRoute: "/lesson-36",
  route: "/lessons/36",
  prevLessonPath: "/lesson-35",
  nextLessonPath: "/lessons/37",
  navLinks: [
    { label: "← Back to lessons", path: "/lessons" },
    { label: "← Lesson 35", path: "/lesson-35", ghost: true },
    { label: "Lesson 37 →", path: "/lessons/37", ghost: true },
    { label: "HW36 →", path: "/hw-36", ghost: true },
    { label: "Vocab →", path: "/vocab", ghost: true },
  ],
  homework: lesson36Homework,
  flow: [
    { href: "#l36-video", label: "Video" },
    { href: "#l36-listen", label: "1 Listening" },
    { href: "#l36-gaps", label: "2 Complete" },
    { href: "#l36-do", label: "3 do / don't" },
    { href: "#l36-order", label: "4 Word order" },
    { href: "#l36-speak", label: "5 Speaking" },
    { href: "#l36-exit", label: "Exit" },
  ],
  sections: [
    {
      type: "custom",
      id: "l36-video",
      kicker: "Video · ELLLO A1-04",
      title: "Verbs in the Present Simple",
      description:
        "Подивись відео. Чотири короткі розмови: morning, work, lunch, weekend. Потім виконай вправи.",
      componentKey: "youtube-video",
      props: {
        videoId: VIDEO_ID,
        iframeTitle:
          "Beginner English Listening Quiz — Verbs in the Present Simple",
      },
    },
    {
      type: "text",
      id: "l36-remember",
      kicker: "Grammar",
      title: "Remember",
      body: "",
      note: "I / you / we / they + verb: I get up. They play soccer. Questions: What do you do? · When do you get up? Negative: I don't work at a shop.",
    },
    {
      type: "multipleChoiceGroup",
      id: "l36-listen",
      kicker: "1 · Listening quiz",
      title: "Answer from the video",
      description: "Послухай ще раз і обери правильну відповідь.",
      items: listenQuiz.map((q) => ({
        id: q.id,
        prompt: q.prompt,
        options: [...q.options],
        correctAnswer: q.correctAnswer,
      })),
    },
    {
      type: "fillBlank",
      id: "l36-gaps",
      kicker: "2 · Complete",
      title: "Complete the sentences",
      description: "Обери слово з діалогів. Це речення з відео.",
      items: videoGaps.map((g) => ({
        id: g.id,
        before: g.before,
        after: g.after,
        correctAnswers: [...g.correctAnswers],
        options: [...g.options],
      })),
    },
    {
      type: "multipleChoiceGroup",
      id: "l36-do",
      kicker: "3 · Grammar",
      title: "do / don't / does",
      description:
        "Обери правильну форму. I / you / we / they → do / don't. He / she / it → does / doesn't + verb-s.",
      items: doDont.map((q) => ({
        id: q.id,
        prompt: q.prompt,
        options: [...q.options],
        correctAnswer: q.correctAnswer,
      })),
    },
    {
      type: "wordOrder",
      id: "l36-order",
      kicker: "4 · Word order",
      title: "Make questions",
      description: "Постав слова в правильному порядку — це питання з відео.",
      items: wordOrder36.map((item) => ({
        scramble: item.scramble,
        parts: [...item.parts],
        answer: item.answer,
      })),
    },
    {
      type: "speakingPrompt",
      id: "l36-speak",
      kicker: "5 · Speaking",
      title: "Ask and answer with your teacher",
      description:
        "Прочитай питання вголос і відповідай про себе. Потім запитай викладача.",
      prompts: [...speakPrompts],
      note: "Model. Teacher: What do you do in the morning? You: I wake up, I take a shower and I eat breakfast. Teacher: When do you get up? You: I get up at seven.",
    },
    {
      type: "text",
      id: "l36-exit",
      kicker: "Exit check",
      title: "Can you…?",
      body: "",
      bullets: [
        "Say 4 things you do in the morning.",
        "Ask: What do you do during the day / on the weekend?",
        "Use don't in one sentence about you.",
        "Answer a listening question from the video.",
      ],
    },
    {
      type: "homeworkLink",
      id: "l36-hw",
      kicker: "Homework",
      title: "Practice after class",
      path: lesson36Homework.path,
      label: lesson36Homework.label,
      summary: lesson36Homework.summary,
    },
  ],
};

export default lesson36;
