import {
  collection,
  doc as doc_,
  getFirestore,
  setDoc as setDoc_,
  addDoc as addDoc_,
  getDoc as getDoc_,
  getDocs as getDocs_,
  deleteDoc as deleteDoc_,
  query,
  orderBy,
  startAfter,
  where,
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

export const getOrderedDocs = function (
  col: string,
  id: string,
  timestamp = 0
) {
  const queryRef = query(
    collection(db, col),
    orderBy("timestamp"),
    where("uid", "==", id),
    startAfter(timestamp)
  );
  return getDocs_(queryRef);
};

export const deleteDoc = function (col: string, doc: string) {
  const docRef = doc_(db, col, doc);
  return deleteDoc_(docRef);
};
