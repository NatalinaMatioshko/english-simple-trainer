import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import type { WritingSubmission } from "../components/AboutMePage/types";

const COLLECTION_NAME = "writingSubmissions";

export const saveAboutMeSubmission = async (payload: WritingSubmission) => {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...payload,
    serverCreatedAt: serverTimestamp(),
  });

  return docRef.id;
};
