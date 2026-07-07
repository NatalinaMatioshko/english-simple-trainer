export type Profile = {
  id: string;
  name: string;
  age: number;
  country: string;
  city?: string;
  hair: string;
  eyes: string;
  text: string;
};

export type SentenceOrderTask = {
  id: number;
  words: string[];
  answer: string;
};

export type FillInBlankTask = {
  id: number;
  sentence: string;
  answer: string;
};

export type WritingSubmission = {
  name: string;
  age: string;
  country: string;
  city: string;
  hair: string;
  eyes: string;
  text: string;
  createdAt: string;
  page: "about-me" | "self-study";
};
