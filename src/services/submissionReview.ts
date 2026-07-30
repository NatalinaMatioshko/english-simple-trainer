import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export type SubmissionCollection = "homeworkAnswers" | "writingSubmissions";

export async function markSubmissionReviewed(
  collectionName: SubmissionCollection,
  docId: string,
) {
  await updateDoc(doc(db, collectionName, docId), {
    reviewed: true,
    reviewedAt: serverTimestamp(),
  });
}
