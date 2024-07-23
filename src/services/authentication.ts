import { FirebaseAuthentication } from "@capacitor-firebase/authentication";

export const signInWithGoogle = async () => {
  return (await FirebaseAuthentication.signInWithGoogle()).credential?.idToken;
};

export const signOut = async () => {
  return await FirebaseAuthentication.signOut();
};
