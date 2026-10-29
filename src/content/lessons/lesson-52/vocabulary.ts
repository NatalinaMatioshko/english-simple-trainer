/** Lesson 52 · A good day — UA → EN flashcards (months + ordinal numbers) */

export const monthFlashcards = [
  { front: "січень", back: "January", speak: "January" },
  { front: "лютий", back: "February", speak: "February" },
  { front: "березень", back: "March", speak: "March" },
  { front: "квітень", back: "April", speak: "April" },
  { front: "травень", back: "May", speak: "May" },
  { front: "червень", back: "June", speak: "June" },
  { front: "липень", back: "July", speak: "July" },
  { front: "серпень", back: "August", speak: "August" },
  { front: "вересень", back: "September", speak: "September" },
  { front: "жовтень", back: "October", speak: "October" },
  { front: "листопад", back: "November", speak: "November" },
  { front: "грудень", back: "December", speak: "December" },
] as const;

export const ordinalFlashcards = [
  { front: "1st · перший", back: "first", speak: "first" },
  { front: "2nd · другий", back: "second", speak: "second" },
  { front: "3rd · третій", back: "third", speak: "third" },
  { front: "4th · четвертий", back: "fourth", speak: "fourth" },
  { front: "5th · п’ятий", back: "fifth", speak: "fifth" },
  { front: "11th · одинадцятий", back: "eleventh", speak: "eleventh" },
  { front: "12th · дванадцятий", back: "twelfth", speak: "twelfth" },
  { front: "13th · тринадцятий", back: "thirteenth", speak: "thirteenth" },
  { front: "14th · чотирнадцятий", back: "fourteenth", speak: "fourteenth" },
  { front: "15th · п’ятнадцятий", back: "fifteenth", speak: "fifteenth" },
  { front: "20th · двадцятий", back: "twentieth", speak: "twentieth" },
  { front: "21st · двадцять перший", back: "twenty-first", speak: "twenty-first" },
  { front: "22nd · двадцять другий", back: "twenty-second", speak: "twenty-second" },
  { front: "23rd · двадцять третій", back: "twenty-third", speak: "twenty-third" },
  { front: "24th · двадцять четвертий", back: "twenty-fourth", speak: "twenty-fourth" },
  { front: "30th · тридцятий", back: "thirtieth", speak: "thirtieth" },
  { front: "31st · тридцять перший", back: "thirty-first", speak: "thirty-first" },
] as const;

export const goodDayFlashcards = [...monthFlashcards, ...ordinalFlashcards];
