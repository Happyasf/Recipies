import axios from "axios";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  getDocs
} from "firebase/firestore";
import { auth, db } from "./firebaseApp";
import imageCompression from "browser-image-compression";
import { deleteImageFromCloud } from "./CloudinaryUtils";

const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
const imgbburl = `https://api.imgbb.com/1/upload?key=${apiKey}`;

// képfeltöltés imgBB-re
const uploadToIMGBB = async (file) => {
  const myFormData = new FormData();
  myFormData.append("image", file);
  try {
    const response = await axios.post(imgbburl, myFormData);
    const { url, delete_url } = response.data.data;
    return { url, delete_url };
  } catch (e) {
    console.log("❌ Képfeltöltési hiba: " + e);
    return null;
  }
};

// ➕ recept hozzáadása
export const addRecipe = async (recipe, file) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      alert("❌ Csak bejelentkezve tölthetsz fel receptet!");
      return;
    }
    let imgUrl = "";
    let deleteUrl = "";

    if (file) {
      const compressed = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 800,
        useWebWorker: true
      });
      const result = await uploadToIMGBB(compressed);
      if (result) {
        imgUrl = result.url;
        deleteUrl = result.delete_url;
      }
    }

    const collectionRef = collection(db, "recipes");
    await addDoc(collectionRef, {
      ...recipe,
      imgUrl,
      deleteUrl,
      userId: user.uid,
      timestamp: serverTimestamp()
    });
  } catch (error) {
    console.log("❌ Nem sikerült hozzáadni: " + error);
  }
};

// 📌 összes recept valós időben
export const readRecipes = async (setRecipes) => {
  const collectionref = collection(db, "recipes");
  const q = query(collectionref, orderBy("timestamp", "desc"));
  const unsub = onSnapshot(q, (shot) => {
    setRecipes(shot.docs.map((d) => ({ ...d.data(), id: d.id })));
  });
  return unsub;
};

// 🗑 recept törlése
export const deleteRecipe = async (id, deleteUrl) => {
  try {
    if (deleteUrl) {
      const public_id = deleteUrl.split("/").pop();
      await deleteImageFromCloud(public_id);
    }
    await deleteDoc(doc(db, "recipes", id));
  } catch (e) {
    console.log("❌ Törlési hiba: " + e);
  }
};

// 📌 egy recept lekérése
export const readRecipe = async (id, setRecipe) => {
  const ref = doc(db, "recipes", id);
  const snap = await getDoc(ref);
  setRecipe(snap.data());
};

// ✏ recept módosítása
export const updateRecipe = async (id, updatedData, file) => {
  let imgUrl = updatedData.imgUrl || "";
  let deleteUrl = updatedData.deleteUrl || "";
  try {
    if (file) {
      const compressed = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 800,
        useWebWorker: true
      });
      const result = await uploadToIMGBB(compressed);
      if (result) {
        imgUrl = result.url;
        deleteUrl = result.delete_url;
      }
    }
    const ref = doc(db, "recipes", id);
    await updateDoc(ref, { ...updatedData, imgUrl, deleteUrl, updatedAt: serverTimestamp() });
  } catch (e) {
    console.log("❌ Módosítási hiba: " + e);
  }
};

// 📌 SAJÁT RECEPTEK
export const readUserRecipes = async (setMyRecipes) => {
  const user = auth.currentUser;
  if (!user) return;

  const collectionRef = collection(db, "recipes");
  const q = query(collectionRef, where("userId", "==", user.uid));
  const snapshot = await getDocs(q);

  setMyRecipes(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
};

// 🧨 összes saját recept törlése (fiók törléskor)
export const deleteAllRecipesOfUser = async () => {
  const user = auth.currentUser;
  if (!user) return;

  const collectionRef = collection(db, "recipes");
  const q = query(collectionRef, where("userId", "==", user.uid));
  const snapshot = await getDocs(q);

  for (const d of snapshot.docs) {
    const data = d.data();
    if (data.deleteUrl) {
      const public_id = data.deleteUrl.split("/").pop();
      await deleteImageFromCloud(public_id);
    }
    await deleteDoc(doc(db, "recipes", d.id));
  }
};
