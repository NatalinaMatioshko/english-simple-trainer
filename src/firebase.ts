import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDI0kWfBloxHGUFJNAtuB0THAFacet-G7Q",
  authDomain: "english-simple-trainer.firebaseapp.com",
  projectId: "english-simple-trainer",
  storageBucket: "english-simple-trainer.firebasestorage.app",
  messagingSenderId: "788677527740",
  appId: "1:788677527740:web:2a07de2c1e1d94d62ee8b9",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
