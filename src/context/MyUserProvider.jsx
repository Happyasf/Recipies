import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from "firebase/auth";
import { EmailAuthProvider, reauthenticateWithCredential, deleteUser } from "firebase/auth";

import { auth, db } from "../firebaseApp";
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { deleteAllRecipesOfUser } from "../myBackend";

export const MyUserContext = createContext();

export const MyUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (current) => {
      setUser(current);
    });
    return () => unsubscribe();
  }, []);

  const signUpUser = async (email, password, displayName) => {
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);

    
    await updateProfile(auth.currentUser, { displayName });

   
    await setDoc(doc(db, "users", cred.user.uid), {
      uid: cred.user.uid,
      displayName,
      email,
      photoURL: "",
      createdAt: Date.now(),
    });

    
    await sendEmailVerification(auth.currentUser);

    setMsg("📩 Erősítsd meg az emailedet!");

    
    setTimeout(() => logoutUser(), 3000);
    return true;

  } catch (e) {
    setMsg("🚫 " + e.message);
    return false;
  }
};


const signInUser = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);

    const current = auth.currentUser;

    // 🔒 Email megerősítés ellenőrzése
    if (!current.emailVerified) {
      logoutUser();
      setMsg("📌 Előbb erősítsd meg az email címedet!");
      return false; // ⚠️ RETURN MUST BE FALSE HERE!
    }

    setMsg("👌 Sikeres bejelentkezés!");
    return true; // ⚠️ MUST RETURN TRUE HERE!

  } catch (e) {
    setMsg("🚫 " + e.message);
    return false; // ⚠️ ERROR MUST RETURN FALSE
  }
};

const deleteAccount = async (password) => {
  try {
    const user = auth.currentUser;
    if (!user) return alert("Jelentkezz be előbb!");

    const cred = EmailAuthProvider.credential(user.email, password);
    await reauthenticateWithCredential(user, cred);

    await deleteAllRecipesOfUser();
    await deleteDoc(doc(db, "users", user.uid));
    await deleteUser(user);

    alert("❌ A fiók végleg törölve lett!");
    window.location.href = "/";

  } catch (e) {
    alert("❌ Hibás jelszó vagy újra kell jelentkezned!");
  }
};




  const logoutUser = async () => {
    await signOut(auth);
  };
 

  return (
    <MyUserContext.Provider value={{ user, signUpUser, logoutUser, signInUser, deleteAccount, msg }}>

      {children}
    </MyUserContext.Provider>
  );




};
