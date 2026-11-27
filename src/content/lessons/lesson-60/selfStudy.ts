/**
 * Self-study homework for Hobbies (Lesson 60 topic)
 * when there is no live lesson with the teacher.
 * Extra blocks follow Unit 9 Check and reflect (place, pronouns, hobbies).
 */

/** Mini review lines shown at the top of the page. */
export const selfStudyReviewTips = [
  "like / enjoy / love / hate + verb-ing",
  "I like watching films.",
  "Object pronouns: me, him, her, it, us, them",
  "Place: on, in, at, next to, between, in front of, behind, above, below",
] as const;

/** Check & reflect · 1 · prepositions of place (cues instead of pictures). */
export const checkReflectPrepositions = [
  {
    id: "pr1",
    cue: "ball · top of the table",
    before: "It’s",
    after: "the table.",
    answers: ["on"],
  },
  {
    id: "pr2",
    cue: "ball · under the table",
    before: "It’s",
    after: "the table.",
    answers: ["below"],
  },
  {
    id: "pr3",
    cue: "man · beside the door",
    before: "He’s",
    after: "the door.",
    answers: ["next to"],
  },
  {
    id: "pr4",
    cue: "man · bus stop",
    before: "He’s",
    after: "the bus stop.",
    answers: ["at"],
  },
  {
    id: "pr5",
    cue: "ball · in the middle of two tables",
    before: "It’s",
    after: "the tables.",
    answers: ["between"],
  },
  {
    id: "pr6",
    cue: "man · facing the TV",
    before: "He’s",
    after: "the TV.",
    answers: ["in front of"],
  },
  {
    id: "pr7",
    cue: "ball · at the back of the TV",
    before: "It’s",
    after: "the TV.",
    answers: ["behind"],
  },
  {
    id: "pr8",
    cue: "ball · inside the window frame",
    before: "It’s",
    after: "the window.",
    answers: ["in"],
  },
  {
    id: "pr9",
    cue: "ball · higher than the window",
    before: "It’s",
    after: "the window.",
    answers: ["above"],
  },
] as const;

export const checkReflectPrepOptions = [
  "above",
  "at",
  "behind",
  "below",
  "between",
  "in",
  "in front of",
  "next to",
  "on",
] as const;

/** Check & reflect · 2 · object pronouns. */
export const checkReflectPronouns = [
  {
    id: "op1",
    before: "My grandfather is 82. I speak to",
    after: "on the telephone every day.",
    answers: ["him"],
  },
  {
    id: "op2",
    before: "This is a photo of my dog. Do you like",
    after: "?",
    answers: ["it"],
  },
  {
    id: "op3",
    before: "That’s my sister. Do you know",
    after: "?",
    answers: ["her"],
  },
  {
    id: "op4",
    before: "We are in the photo. Can you see",
    after: "?",
    answers: ["us"],
  },
  {
    id: "op5",
    before: "My friends are here. I really like",
    after: ".",
    answers: ["them"],
  },
  {
    id: "op6",
    before: "This bag is heavy. Please help",
    after: ".",
    answers: ["me"],
  },
] as const;

export const checkReflectPronounOptions = [
  "her",
  "him",
  "it",
  "me",
  "them",
  "us",
] as const;

/** Check & reflect · 3a · verb collocations. */
export const checkReflectCollocations = [
  {
    id: "vc1",
    before: "I",
    after: "music on the bus.",
    answers: ["listen to"],
  },
  {
    id: "vc2",
    before: "I",
    after: "a book in the evening.",
    answers: ["read"],
  },
  {
    id: "vc3",
    before: "I",
    after: "exercise in the morning.",
    answers: ["do"],
  },
  {
    id: "vc4",
    before: "I",
    after: "the internet every day.",
    answers: ["use"],
  },
  {
    id: "vc5",
    before: "I",
    after: "video games with my friends.",
    answers: ["play"],
  },
  {
    id: "vc6",
    before: "I",
    after: "films at the weekend.",
    answers: ["watch"],
  },
] as const;

export const checkReflectCollocationOptions = [
  "do",
  "listen to",
  "play",
  "read",
  "use",
  "watch",
] as const;

/** Check & reflect · 3b · tick if true for you (no score). */
export const checkReflectTrueForYou = [
  "I listen to music on the bus.",
  "I read a book in the evening.",
  "I do exercise in the morning.",
  "I use the internet every day.",
  "I play video games with my friends.",
  "I watch films at the weekend.",
] as const;

/**
 * Check & reflect · 4 · love/hate/enjoy + -ing
 * Student fills both verb parts where needed.
 */
export const checkReflectLikeIng = [
  {
    id: "li1",
    prompt: "I ______ ______ books at the weekend. (love / read)",
    answers: [
      "love reading",
      "I love reading",
      "love reading books",
    ],
  },
  {
    id: "li2",
    prompt: "I ______ ______ homework in the evening. (hate / do)",
    answers: ["hate doing", "I hate doing"],
  },
  {
    id: "li3",
    prompt: "He ______ ______ football on TV. (enjoy / watch)",
    answers: ["enjoys watching", "he enjoys watching"],
  },
  {
    id: "li4",
    prompt: "What sports ______ you ______? (enjoy / watch)",
    answers: [
      "do you enjoy watching",
      "do enjoy watching",
      "What sports do you enjoy watching",
    ],
  },
] as const;

/** Reflect · confidence 1–5. */
export const checkReflectSkills = [
  "Talking about people in a photo",
  "Asking and answering about likes and dislikes",
  "Talking about my hobbies with like / enjoy / love / hate + -ing",
  "Using prepositions of place (on, in, next to…)",
] as const;

/**
 * Practice · put the verb in the -ing form.
 * Fresh items (not a copy of lesson Ex.8 / HW60).
 */
export const selfStudyIngGaps = [
  {
    id: "ing1",
    before: "I like",
    after: "photos at the weekend. (take)",
    answers: ["taking"],
  },
  {
    id: "ing2",
    before: "She enjoys",
    after: "in the park. (run)",
    answers: ["running"],
  },
  {
    id: "ing3",
    before: "They hate",
    after: "the kitchen. (clean)",
    answers: ["cleaning"],
  },
  {
    id: "ing4",
    before: "We love",
    after: "to music in the car. (listen)",
    answers: ["listening"],
  },
  {
    id: "ing5",
    before: "He doesn’t like",
    after: "homework in the evening. (do)",
    answers: ["doing"],
  },
  {
    id: "ing6",
    before: "Do you enjoy",
    after: "? (cook)",
    answers: ["cooking"],
  },
  {
    id: "ing7",
    before: "My friend loves",
    after: "video games. (play)",
    answers: ["playing"],
  },
  {
    id: "ing8",
    before: "I don’t enjoy",
    after: "newspapers. (read)",
    answers: ["reading"],
  },
] as const;

/** Guided stems — student writes a full sentence about themselves. */
export const selfStudySentenceStems = [
  {
    id: "w1",
    prompt: "I like …",
    hint: "like + -ing",
  },
  {
    id: "w2",
    prompt: "I enjoy …",
    hint: "enjoy + -ing",
  },
  {
    id: "w3",
    prompt: "I love …",
    hint: "love + -ing",
  },
  {
    id: "w4",
    prompt: "I hate … / I don’t like …",
    hint: "hate / don’t like + -ing",
  },
  {
    id: "w5",
    prompt: "At the weekend I like …",
    hint: "weekend hobby",
  },
  {
    id: "w6",
    prompt: "In the evening I enjoy …",
    hint: "evening hobby",
  },
] as const;

/** UA → EN · new set for self-study (different from HW60). */
export const selfStudyUaTranslate = [
  {
    id: "u1",
    ua: "Я люблю плавати.",
    answers: [
      "I like swimming.",
      "I like going swimming.",
      "I like swimming",
      "I like going swimming",
    ],
  },
  {
    id: "u2",
    ua: "Вона насолоджується танцями.",
    answers: [
      "She enjoys dancing.",
      "She enjoys dancing",
    ],
  },
  {
    id: "u3",
    ua: "Він ненавидить прибирати ванну.",
    answers: [
      "He hates cleaning the bathroom.",
      "He hates cleaning the bathroom",
    ],
  },
  {
    id: "u4",
    ua: "Ми любимо готувати вечерю.",
    answers: [
      "We like cooking dinner.",
      "We love cooking dinner.",
      "We like cooking dinner",
      "We love cooking dinner",
    ],
  },
  {
    id: "u5",
    ua: "Ти любиш фотографувати?",
    answers: [
      "Do you like taking photos?",
      "Do you like photographing?",
      "Do you like taking photos",
      "Do you enjoy taking photos?",
      "Do you enjoy taking photos",
    ],
  },
  {
    id: "u6",
    ua: "Вони не люблять дивитися телевізор.",
    answers: [
      "They don't like watching TV.",
      "They do not like watching TV.",
      "They don't like watching television.",
      "They don't like watching TV",
      "They do not like watching TV",
    ],
  },
  {
    id: "u7",
    ua: "Я обожнюю слухати подкасти.",
    answers: [
      "I love listening to podcasts.",
      "I love listening to podcasts",
    ],
  },
  {
    id: "u8",
    ua: "Вона любить читати в ліжку.",
    answers: [
      "She likes reading in bed.",
      "She loves reading in bed.",
      "She likes reading in bed",
      "She loves reading in bed",
    ],
  },
  {
    id: "u9",
    ua: "М’яч на столі.",
    answers: ["The ball is on the table.", "It's on the table.", "It is on the table."],
  },
  {
    id: "u10",
    ua: "Він біля дверей.",
    answers: [
      "He is next to the door.",
      "He's next to the door.",
      "He is beside the door.",
      "He's beside the door.",
    ],
  },
  {
    id: "u11",
    ua: "Я розмовляю з ним щодня.",
    answers: [
      "I speak to him every day.",
      "I talk to him every day.",
      "I speak with him every day.",
    ],
  },
  {
    id: "u12",
    ua: "Ти любиш їх?",
    answers: [
      "Do you like them?",
      "Do you like them",
    ],
  },
] as const;
