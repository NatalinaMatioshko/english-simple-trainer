import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import type { HomeworkAnswerInput } from "../types/homework";

const COLLECTION_NAME = "homeworkAnswers";

export async function saveHomeworkAnswer(payload: HomeworkAnswerInput) {
  const studentName = payload.studentName.trim();
  const writing = payload.writing.trim();
  const lessonId = payload.lessonId.trim();

  if (!studentName || !writing || !lessonId) {
    throw new Error("Missing required homework fields.");
  }

  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    studentName,
    lessonId,
    writing,
    testDone: Boolean(payload.testDone),
    quizDone: Boolean(payload.quizDone),
    ...(typeof payload.quizScore === "number"
      ? { quizScore: payload.quizScore }
      : {}),
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}
