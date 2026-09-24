/** Shared lesson content model (local now; Firestore-ready later). */

export type PublicationStatus = "draft" | "review" | "published" | "archived";

export type Course = {
  id: string;
  title: string;
  level: string;
};

export type Module = {
  id: string;
  courseId: string;
  title: string;
  order: number;
};

export type VocabularyItem = {
  id: string;
  term: string;
  /** Optional gloss or paired form (e.g. -ing) */
  gloss?: string;
  example?: string;
};

export type Activity =
  | {
      type: "multipleChoice";
      id: string;
      prompt: string;
      options: string[];
      correctAnswer: string;
      explanation?: string;
    }
  | {
      type: "fillBlank";
      id: string;
      before: string;
      after: string;
      correctAnswers: string[];
      hint?: string;
    };

export type HomeworkMeta = {
  path: string;
  label: string;
  summary?: string;
};

export type LessonSectionBase = {
  id: string;
  title: string;
  kicker?: string;
  description?: string;
};

export type TextSection = LessonSectionBase & {
  type: "text";
  body: string;
  /** Optional short model lines shown as cards */
  bullets?: string[];
  note?: string;
};

export type VocabularySection = LessonSectionBase & {
  type: "vocabulary";
  items: VocabularyItem[];
};

export type MultipleChoiceSection = LessonSectionBase & {
  type: "multipleChoice";
  prompt: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
};

export type FillBlankSection = LessonSectionBase & {
  type: "fillBlank";
  /** Optional word box above the gaps */
  chips?: string[];
  items: Array<{
    id: string;
    before: string;
    after: string;
    correctAnswers: string[];
    /** When set, render a select (or buttons) instead of free text */
    options?: string[];
    /** `buttons` = tap alternatives in-line (e.g. has / have) */
    choiceMode?: "select" | "buttons";
    /** Wider text input (sentence writing) */
    wide?: boolean;
  }>;
};

/** Quiz bank: several MC items in one section (listening / grammar drills). */
export type MultipleChoiceGroupSection = LessonSectionBase & {
  type: "multipleChoiceGroup";
  /** Optional word box shown above the quiz */
  chips?: string[];
  items: Array<{
    id: string;
    prompt: string;
    options: string[];
    correctAnswer: string;
  }>;
};

/** Scramble → sentence using shared WordOrderBoard. */
export type WordOrderSection = LessonSectionBase & {
  type: "wordOrder";
  items: Array<{
    scramble: string;
    parts: string[];
    answer: string;
  }>;
};

export type SpeakingPromptSection = LessonSectionBase & {
  type: "speakingPrompt";
  prompts: string[];
  /** Shown as secondary line under each prompt when parallel */
  models?: string[];
  note?: string;
};

export type WritingPromptSection = LessonSectionBase & {
  type: "writingPrompt";
  prompt: string;
  placeholder?: string;
  minChars?: number;
};

export type HomeworkLinkSection = LessonSectionBase & {
  type: "homeworkLink";
  path: string;
  label: string;
  summary?: string;
};

/**
 * Escape hatch for non-standard UI.
 * `componentKey` must be registered in lessonSectionRegistry — never store React nodes in data.
 */
export type CustomSection = LessonSectionBase & {
  type: "custom";
  componentKey: string;
  props?: Record<string, unknown>;
  note?: string;
};

export type LessonSection =
  | TextSection
  | VocabularySection
  | MultipleChoiceSection
  | MultipleChoiceGroupSection
  | FillBlankSection
  | WordOrderSection
  | SpeakingPromptSection
  | WritingPromptSection
  | HomeworkLinkSection
  | CustomSection;

export type LessonNavLink = {
  label: string;
  path: string;
  ghost?: boolean;
};

export type Lesson = {
  id: string;
  number: number;
  title: string;
  level: string;
  moduleId: string;
  order: number;
  status: PublicationStatus;
  estimatedMinutes: number;
  hasHomework: boolean;
  topic?: string;
  description?: string;
  chips?: string[];
  /** Old path e.g. /lesson-37 — for redirects & catalog */
  legacyRoute?: string;
  /** Canonical content-driven path e.g. /lessons/37 */
  route: string;
  prevLessonPath?: string;
  nextLessonPath?: string;
  navLinks?: LessonNavLink[];
  flow?: Array<{ href: string; label: string }>;
  sections: LessonSection[];
  homework?: HomeworkMeta;
};

/** Catalog / registry row (metadata without full sections). */
export type LessonRegistryEntry = {
  id: string;
  number: number;
  title: string;
  level: string;
  moduleId: string;
  order: number;
  status: PublicationStatus;
  estimatedMinutes: number;
  hasHomework: boolean;
  topic?: string;
  description?: string;
  legacyRoute?: string;
  route: string;
  homeworkPath?: string;
  /** Dynamic import of full lesson content */
  load: () => Promise<Lesson>;
};
