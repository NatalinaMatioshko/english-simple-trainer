export type HomeworkAnswerInput = {
  studentName: string;
  lessonId: string;
  writing: string;
  testDone?: boolean;
  quizDone?: boolean;
  quizScore?: number;
};
