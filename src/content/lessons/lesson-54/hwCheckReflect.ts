/** HW54 · Check and reflect (end of Unit 7 · Lessons 51–54) */

export const compassGaps = [
  { id: "n", hint: "n______", answers: ["north", "North"] },
  { id: "e", hint: "e______", answers: ["east", "East"] },
  { id: "s", hint: "s______", answers: ["south", "South"] },
  { id: "w", hint: "w______", answers: ["west", "West"] },
] as const;

/** 1b · each item: pick first and second word */
export const vocabAlternatives = [
  {
    id: "1",
    parts: ["It’s a nice day. There isn’t a", "in the"],
    options: [
      ["sky", "cloud"],
      ["cloud", "sky"],
    ],
    answer: [1, 1],
  },
  {
    id: "2",
    parts: ["We swim in the", "and walk in the"],
    options: [
      ["lake", "fields"],
      ["fields", "lake"],
    ],
    answer: [0, 1],
  },
  {
    id: "3",
    parts: ["There’s an", "in the", ". You can go there by boat."],
    options: [
      ["island", "hill"],
      ["sea", "the mountain"],
    ],
    answer: [0, 0],
  },
  {
    id: "4",
    parts: ["You can see the high", "in the north."],
    options: [["mountains", "flowers"]],
    answer: [0],
  },
] as const;

export const timeWordGaps = [
  {
    id: "1",
    before: "There was a big party in our office",
    after: ".",
    answers: ["yesterday", "Yesterday"],
  },
  {
    id: "2",
    before: "It was my birthday",
    after: "Tuesday. It was my 21st!",
    answers: ["last", "Last"],
  },
  {
    id: "3",
    before: "Is there a train to Brussels",
    after: "?",
    answers: ["today", "Today"],
  },
  {
    id: "4",
    before: "There was a Ryan Gosling film at the cinema last",
    after: ". It was great!",
    answers: ["weekend", "Weekend"],
  },
] as const;

export const questionWordOrder = [
  {
    id: "1",
    scramble: "does / What / do / a taxi driver ?",
    answers: ["What does a taxi driver do?", "What does a taxi driver do"],
    example: true,
  },
  {
    id: "2",
    scramble: "is / the / White House / Where ?",
    answers: ["Where is the White House?", "Where is the White House"],
  },
  {
    id: "3",
    scramble: "was / Pelé / Who ?",
    answers: ["Who was Pelé?", "Who was Pele?", "Who was Pelé", "Who was Pele"],
  },
  {
    id: "4",
    scramble: "is / Valentine’s Day / When ?",
    answers: [
      "When is Valentine's Day?",
      "When is Valentine’s Day?",
      "When is Valentine's Day",
      "When is Valentine’s Day",
    ],
  },
  {
    id: "5",
    scramble: "in August / many / How / days / are / there ?",
    answers: [
      "How many days are there in August?",
      "How many days are there in August",
    ],
  },
  {
    id: "6",
    scramble: "got / How / rooms / the Taj Mahal / many / has ?",
    answers: [
      "How many rooms has the Taj Mahal got?",
      "How many rooms has the Taj Mahal got",
    ],
  },
] as const;

export const questionMatchAnswers = [
  { id: "1", label: "What does a taxi driver do?", answer: "e" },
  { id: "2", label: "Where is the White House?", answer: "c" },
  { id: "3", label: "Who was Pelé?", answer: "f" },
  { id: "4", label: "When is Valentine’s Day?", answer: "d" },
  { id: "5", label: "How many days are there in August?", answer: "b" },
  { id: "6", label: "How many rooms has the Taj Mahal got?", answer: "a" },
] as const;

export const questionMatchOptions = [
  { id: "a", text: "120" },
  { id: "b", text: "31" },
  { id: "c", text: "It’s in Washington DC." },
  { id: "d", text: "14th February" },
  { id: "e", text: "He/She drives a car." },
  { id: "f", text: "a footballer" },
] as const;

export const monthGaps = [
  { id: "1", hint: "J____", answers: ["January", "january"] },
  { id: "2", hint: "F____", answers: ["February", "february"] },
  { id: "3", hint: "M____", answers: ["March", "march"] },
  { id: "4", hint: "A____", answers: ["April", "april"] },
  { id: "5", hint: "M____", answers: ["May", "may"] },
  { id: "6", hint: "J____", answers: ["June", "june"] },
  { id: "7", hint: "J____", answers: ["July", "july"] },
  { id: "8", hint: "A____", answers: ["August", "august"] },
  { id: "9", hint: "S____", answers: ["September", "september"] },
  { id: "10", hint: "O____", answers: ["October", "october"] },
  { id: "11", hint: "N____", answers: ["November", "november"] },
  { id: "12", hint: "D____", answers: ["December", "december"] },
] as const;

export const ordinalWords = [
  { id: "2", prompt: "11th", answers: ["eleventh", "Eleventh"] },
  { id: "3", prompt: "23rd", answers: ["twenty-third", "twenty third", "Twenty-third"] },
  { id: "4", prompt: "19th", answers: ["nineteenth", "Nineteenth"] },
  { id: "5", prompt: "30th", answers: ["thirtieth", "Thirtieth"] },
  { id: "6", prompt: "12th", answers: ["twelfth", "Twelfth"] },
  { id: "7", prompt: "8th", answers: ["eighth", "Eighth"] },
  { id: "8", prompt: "27th", answers: ["twenty-seventh", "twenty seventh", "Twenty-seventh"] },
  { id: "9", prompt: "5th", answers: ["fifth", "Fifth"] },
  { id: "10", prompt: "31st", answers: ["thirty-first", "thirty first", "Thirty-first"] },
] as const;

export const holidayWasWere = [
  {
    id: "1",
    before: "I",
    after: "on holiday last week with my friend Kate.",
    answers: ["was", "Was"],
    example: true,
  },
  {
    id: "2",
    before: "We",
    after: "in Spain and our hotel",
    answers: ["were", "Were"],
  },
  {
    id: "3",
    before: "We were in Spain and our hotel",
    after: "really good.",
    answers: ["was", "Was"],
  },
  {
    id: "4",
    before: "There",
    after: "a lot of people at the hotel – six or seven – and it",
    answers: ["were", "Were"],
  },
  {
    id: "5",
    before: "There were a lot of people at the hotel – six or seven – and it",
    after: "quiet.",
    answers: ["wasn't", "Wasn't", "was not", "Was not"],
  },
  {
    id: "6",
    before: "There",
    after: "a restaurant at the hotel but there",
    answers: ["was", "Was"],
  },
  {
    id: "7",
    before: "There was a restaurant at the hotel but there",
    after: "really good restaurants in the town centre.",
    answers: ["were", "Were"],
  },
  {
    id: "8",
    before: "The town",
    after: "never quiet.",
    answers: ["was", "Was"],
  },
  {
    id: "9",
    before: "It",
    after: "always busy.",
    answers: ["was", "Was"],
  },
] as const;

export const adjectiveChoices = [
  {
    id: "1",
    before: "My friend has got a new car. It's really",
    options: ["fast", "slow"],
    answer: "fast",
  },
  {
    id: "2",
    before: "My father is 89. He’s",
    options: ["a young", "an old"],
    answer: "an old",
  },
  {
    id: "3",
    before: "The homework",
    options: ["wasn't easy", "difficult"],
    answer: "wasn't easy",
  },
  {
    id: "4",
    before: "In Canada, it’s really",
    after: "in January and February.",
    options: ["hot", "cold"],
    answer: "cold",
  },
  {
    id: "5",
    before: "It was a really",
    after: "meeting! We were there for nine hours!",
    options: ["short", "long"],
    answer: "long",
  },
  {
    id: "6",
    before: "Mount Everest is 8,848 metres. It’s a",
    after: "mountain.",
    options: ["high", "low"],
    answer: "high",
  },
  {
    id: "7",
    before: "It was late at night and it was",
    options: ["light", "dark"],
    answer: "dark",
  },
  {
    id: "8",
    before: "We've got",
    after: "drinks; tea and coffee.",
    options: ["hot", "cold"],
    answer: "hot",
  },
  {
    id: "9",
    before: "The dog’s",
    after: "It’s got a ball.",
    options: ["happy", "sad"],
    answer: "happy",
  },
] as const;

export const pastQuestionOrder = [
  {
    id: "1",
    scramble: "last / Were / night / you / home / at ?",
    answers: ["Were you at home last night?", "Were you at home last night"],
    example: true,
  },
  {
    id: "2",
    scramble: "name / your / was / What / first teacher’s ?",
    answers: [
      "What was your first teacher's name?",
      "What was your first teacher’s name?",
    ],
  },
  {
    id: "3",
    scramble: "expensive / Was / your / phone ?",
    answers: ["Was your phone expensive?", "Was your phone expensive"],
  },
  {
    id: "4",
    scramble: "were / Where / you / 8.00 a.m. / at ?",
    answers: [
      "Where were you at 8.00 a.m.?",
      "Where were you at 8.00 a.m",
      "Where were you at 8 a.m.?",
    ],
  },
  {
    id: "5",
    scramble: "there / a / difficult / Was / question / in class ?",
    answers: [
      "Was there a difficult question in class?",
      "Was there a difficult question in class",
    ],
  },
  {
    id: "6",
    scramble: "students / there / last week / were / How / in class / many ?",
    answers: [
      "How many students were there in class last week?",
      "How many students were there in class last week",
    ],
  },
] as const;

export const reflectStatements54 = [
  "I can ask and answer about a place.",
  "I can talk about good days.",
  "I can ask and answer about past events.",
  "I can buy travel tickets.",
] as const;
