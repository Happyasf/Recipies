// src/firebase/auth.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  updateProfile
} from "firebase/auth";
import { auth, db } from "../firebaseApp";
import { doc, setDoc } from "firebase/firestore";

export const signUpUser = async (email, password, displayName) => {
  const userCred = await createUserWithEmailAndPassword(auth, email, password);

  await setDoc(doc(db, "users", userCred.user.uid), {
    uid: userCred.user.uid,
    displayName,
    email,
    photoURL: "",
    createdAt: Date.now()
  });


  await updateProfile(userCred.user, { displayName });

  await sendEmailVerification(userCred.user);

  return userCred;
};

export const signInUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};
