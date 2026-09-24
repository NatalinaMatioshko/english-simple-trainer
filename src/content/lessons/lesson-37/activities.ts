/** Speaking / marker activities for Lesson 37 (content only). */

export const lesson37AskPrompts = [
  "What do you do every day?",
  "What are you doing now?",
  "What do I do every day? (ask your teacher)",
  "What am I doing now? (ask your teacher)",
] as const;

export const lesson37LookPrompts = [
  "I'm sitting.",
  "You're talking.",
  "We're speaking English.",
  "I'm not eating. I'm talking.",
] as const;

export const lesson37SimpleMarkers = [
  { marker: "every day", model: "I work every day." },
  { marker: "usually", model: "I usually eat." },
  { marker: "often", model: "I often read." },
  { marker: "always", model: "I always sit." },
  { marker: "sometimes", model: "I sometimes talk." },
  { marker: "never", model: "I never drink coffee." },
] as const;

export const lesson37NowMarkers = [
  { marker: "now", model: "I am working now." },
  { marker: "right now", model: "I am talking right now." },
  { marker: "at the moment", model: "I am sitting at the moment." },
  { marker: "today", model: "I am reading today." },
] as const;
