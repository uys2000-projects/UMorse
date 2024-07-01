import {
  collection,
  doc as doc_,
  getFirestore,
  setDoc as setDoc_,
  addDoc as addDoc_,
  getDoc as getDoc_,
  getDocs as getDocs_,
} from "firebase/firestore/lite";
import { app } from "./firebase";

const db = getFirestore(app);

export const setDoc = function (col: string, doc: string, data: object) {
  const docRef = doc_(db, col, doc);
  return setDoc_(docRef, JSON.parse(JSON.stringify(data)));
};

export const addDoc = function (col: string, data: object) {
  const colRef = collection(db, col);
  return addDoc_(colRef, JSON.parse(JSON.stringify(data)));
};

export const getDoc = function (col: string, doc: string) {
  const docRef = doc_(db, col, doc);
  return getDoc_(docRef);
};

export const getDocs = function (col: string) {
  const colRef = collection(db, col);
  return getDocs_(colRef);
};
