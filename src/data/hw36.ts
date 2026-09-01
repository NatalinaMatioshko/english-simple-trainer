/* ── Homework 36 · check: at / to / time ──────────────────────── */

/** at: clock, night, weekend, home, work */
export const hw36At = [
  {
    id: "a1",
    prompt: "I get up ___ 6.",
    options: ["at", "in", "to"],
    answer: "at",
  },
  {
    id: "a2",
    prompt: "She's ___ home now.",
    options: ["at", "to", "in"],
    answer: "at",
  },
  {
    id: "a3",
    prompt: "I don't work ___ a shop. I teach math.",
    options: ["at", "to", "on"],
    answer: "at",
  },
  {
    id: "a4",
    prompt: "We play soccer ___ the weekend.",
    options: ["at", "in", "to"],
    answer: "at",
  },
  {
    id: "a5",
    prompt: "I sleep ___ night.",
    options: ["at", "in", "on"],
    answer: "at",
  },
  {
    id: "a6",
    prompt: "The lesson starts ___ eight o'clock.",
    options: ["at", "on", "to"],
    answer: "at",
  },
] as const;

/** to: go to + place; like / want to + verb (to do) */
export const hw36To = [
  {
    id: "t1",
    prompt: "I go ___ work at 9.",
    options: ["to", "at", "in"],
    answer: "to",
  },
  {
    id: "t2",
    prompt: "I like ___ read on my lunch break.",
    options: ["to", "at", "do"],
    answer: "to",
  },
  {
    id: "t3",
    prompt: "I want ___ do my homework.",
    options: ["to", "at", "in"],
    answer: "to",
  },
  {
    id: "t4",
    prompt: "They go ___ the park for lunch.",
    options: ["to", "at", "on"],
    answer: "to",
  },
  {
    id: "t5",
    prompt: "What do you like ___ do on the weekend?",
    options: ["to", "at", "in"],
    answer: "to",
  },
  {
    id: "t6",
    prompt: "I go ___ school every day.",
    options: ["to", "at", "in"],
    answer: "to",
  },
] as const;

/** час: in the morning · on Monday · at 7 o'clock */
export const hw36Time = [
  {
    id: "h1",
    prompt: "I eat breakfast ___ the morning.",
    options: ["in", "on", "at"],
    answer: "in",
  },
  {
    id: "h2",
    prompt: "I play soccer ___ Saturday.",
    options: ["on", "in", "at"],
    answer: "on",
  },
  {
    id: "h3",
    prompt: "I get up ___ 6 o'clock.",
    options: ["at", "in", "on"],
    answer: "at",
  },
  {
    id: "h4",
    prompt: "We meet ___ the evening.",
    options: ["in", "on", "to"],
    answer: "in",
  },
  {
    id: "h5",
    prompt: "She teaches math ___ Monday.",
    options: ["on", "at", "in"],
    answer: "on",
  },
  {
    id: "h6",
    prompt: "It's 7:00. We say:",
    options: ["at seven o'clock", "in seven o'clock", "on seven o'clock"],
    answer: "at seven o'clock",
  },
] as const;
