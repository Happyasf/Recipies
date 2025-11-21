import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import axios from "axios";
import { auth, db } from "./firebaseApp";


export const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
};

export const updateUserImage = async (file) => {
  const base64 = await convertToBase64(file);

  const res = await axios.post("http://localhost:5000/api/uploadImage", { image: base64 });
  const url = res.data.url;

  await updateProfile(auth.currentUser, { photoURL: url });
  await updateDoc(doc(db, "users", auth.currentUser.uid), { photoURL: url });

  return url;
};
export const deleteImageFromCloud = async (public_id) => {
  if (!public_id) return;
  try {
    await axios.post("http://localhost:5000/api/deleteImage", { public_id });
  } catch (error) {
    console.log("Cloudinary törlés hiba:", error);
  }
};
