import React, { useEffect, createContext, useState } from 'react';
import { 
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth';
import { auth } from "../firebaseApp";

export const myUserContext = createContext();

export const MyUserProvider = ({ children }) => {
  const [msg, setMsg] = useState({});
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
    });
    return () => unsubscribe();
  }, []);

  const signUpUser = async (email, password, displayName) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName });
      await sendEmailVerification(auth.currentUser);

      setMsg({ signUp: "Kattints az emailben kapott aktiváló linkre" });
      logoutUser();

    } catch (e) {
      setMsg({ err: e.message });
    }
  };

  const logoutUser = async () => {
    await signOut(auth);
    setMsg(prev => delete prev.signIn);
  };

  const signInUser = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      const current = auth.currentUser;
      if (!current.emailVerified) {
        setMsg({ err: "Erősítsd meg az email címedet!" });
        logoutUser();
        return;
      }

      setMsg({ signIn: true });

    } catch (error) {
      setMsg({ err: error.message });
    }
  };

  return (
    <myUserContext.Provider value={{ user, signUpUser, logoutUser, signInUser, msg }}>
      {children}
    </myUserContext.Provider>
  );
};
