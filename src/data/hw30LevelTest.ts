import type { QuizTask } from "../types/trainer";
import { topicStations } from "./lesson30Review";

/** A1 level / placement test — full foundation (L1–29), one continuous run */

export type Hw30LevelTask = QuizTask & {
  topicId: string;
  topic: string;
};

export type A1BandId = "pre-a1" | "a1-low" | "a1" | "a1-strong";

export type A1LevelBand = {
  id: A1BandId;
  label: string;
  labelUa: string;
  cefr: string;
  minPercent: number;
  color: string;
  advice: string;
};

/** Score bands for A1 placement (percent correct) */
export const a1LevelBands: A1LevelBand[] = [
  {
    id: "pre-a1",
    label: "Pre-A1",
    labelUa: "Нижче A1",
    cefr: "Pre-A1",
    minPercent: 0,
    color: "#b45309",
    advice:
      "Повтори основи: to be, прості питання, сім'я, числа. Пройди Lesson 30 topic stations ще раз і спробуй тест знову.",
  },
  {
    id: "a1-low",
    label: "Emerging A1",
    labelUa: "A1 початковий",
    cefr: "A1−",
    minPercent: 45,
    color: "#ca8a04",
    advice:
      "Ти вже на рівні A1, але є прогалини. Повтори слабкі теми в Lesson 30 і HW27–29, потім пройди тест ще раз.",
  },
  {
    id: "a1",
    label: "A1",
    labelUa: "A1",
    cefr: "A1",
    minPercent: 65,
    color: "#16a34a",
    advice:
      "Добрий результат: рівень A1 підтверджено. Можна закріпити shop / numbers / this–those і рухатися до A2.",
  },
  {
    id: "a1-strong",
    label: "Strong A1",
    labelUa: "Міцний A1",
    cefr: "A1+",
    minPercent: 85,
    color: "#0f766e",
    advice:
      "Відмінно! Міцний A1 — готовий/готова починати A2 (transport, places, more grammar).",
  },
];

export const a1LevelTasks: Hw30LevelTask[] = topicStations.flatMap((station) =>
  station.quiz.map((q) => ({
    text: q.prompt,
    options: [...q.options],
    correct: q.answer,
    topicId: station.id,
    topic: station.title,
  })),
);

export function getA1LevelBand(score: number, total: number): {
  band: A1LevelBand;
  percent: number;
} {
  const percent = total > 0 ? Math.round((score / total) * 100) : 0;
  let band = a1LevelBands[0];
  for (const b of a1LevelBands) {
    if (percent >= b.minPercent) band = b;
  }
  return { band, percent };
}

/** Minimum score to count as “A1 confirmed” */
export function a1PassScore(total: number): number {
  return Math.ceil(total * 0.65);
}
