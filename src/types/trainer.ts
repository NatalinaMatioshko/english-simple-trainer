export type Mode = "study" | "practice";
export type Theme = "light" | "dark";
export type Filter = "all" | "daily" | "study" | "home" | "social";

export type Verb = {
  base: string;
  third: string;
  ua: string;
  cat: Exclude<Filter, "all">;
};

export type ConjugationTask = {
  sentence: string;
  answer: string;
  hint: string;
};

export type QuestionTask = {
  prompt: string;
  answer: string;
};

export type MixedTask = {
  text: string;
  options: string[];
  correct: string;
};

export type QuizTask = {
  text: string;
  options: string[];
  correct: string;
};

export type Feedback = {
  text: string;
  type: "success" | "error" | "";
};
