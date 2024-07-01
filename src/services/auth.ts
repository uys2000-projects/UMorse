import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as signOut_,
  onAuthStateChanged,
  type NextOrObserver,
  type User,
} from "firebase/auth";

import { app } from "./firebase";

const auth = getAuth(app);

export const authListener = function (callback: NextOrObserver<User>) {
  return onAuthStateChanged(auth, callback);
};

export const signIn = function () {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

export const signOut = function () {
  return signOut_(auth);
};
