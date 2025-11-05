import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./FirebaseConfig";
import { getFirestore } from "firebase/firestore";
import { getAuth} from "firebase/auth";

//saját Firebase App példány, ezzel érjük el az összes szolgáltatást
const app = initializeApp(firebaseConfig);
/*
export const auth=getAuth(app)//ez az objektum felel a Google-s login
export const provider=new GoogleAuthProvider()//a  Google bejelntkezés szolgáltatója létrehozva
*/

export const db=getFirestore(app)//Firestore adatbázis inicializálása