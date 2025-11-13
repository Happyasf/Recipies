import axios from "axios";
import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, orderBy, query, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "./firebaseApp"
import imageCompression from "browser-image-compression";
const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
const imgbburl = `https://api.imgbb.com/1/upload?key=${apiKey}`
console.log(imgbburl);

const uploadToIMGBB = async (file) => {
    const myFormData = new FormData()
    myFormData.append("image", file)
    try {
        const resonse = await axios.post(imgbburl, myFormData)
        const { url, delete_url } = resonse.data.data
        return { url, delete_url }
    } catch (error) {
        console.log("Képfeltöltési hiba: " + error);

    }
}

export const addRecipe = async (recipe, file) => {

    try {
        let imgUrl = ""
        let deleteUrl = ""
        const compressed = await imageCompression(file, { maxSizeMB: 1, maxWidthOrHeight: 800, useWebWorker: true })
        const result = await uploadToIMGBB(file)
        if (result) {
            imgUrl = result.url
            deleteUrl = result.delete_url
            console.log(result);

            const collectionref = collection(db, "recipes")
            await addDoc(collectionref, { ...recipe, imgUrl, deleteUrl, timestamp: serverTimestamp() })
        }
    } catch (error) {
        console.log("Nem sikerült hozzáadni!" + error);

    }
}
//receptek realtime olvasása: onsnapshot()
export const readRecipes = async (setRecipes) => {
    const collectionref = collection(db, "recipes")
    const q = query(collectionref, orderBy("timestamp", "desc"))
    const unsubscribe = onSnapshot(q, (snapshot) => {
        setRecipes(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    })
    return unsubscribe
}
//recept törlése id alapján:
export const deleteRecipe = async (id, deleteUrl) => {
    //await axios.get(deleteUrl)
    const docref = doc(db, "recipes", id)
    await deleteDoc(docref)
}
export const readRecipe = async (id, setRecipe) => {
    const docref = doc(db, 'recipes', id)
    const docData = await getDoc(docref)
    setRecipe(docData.data())
}
//update
export const updateRecipe = async (id, updatedData, file) => {
    let imgUrl = updatedData.imgUrl || ''
    let deleteUrl = updatedData.deleteUrl || ''
    try {
        if (file) {
            //az új file eltárolása
            const compressed = await imageCompression(file, { maxSizeMB: 1, maxWidthOrHeight: 800, useWebWorker: true })
            const result = await uploadToIMGBB(compressed)
            if (result) {
                imgUrl = result.url
                deleteUrl = result.delete_url
            }
        }
        const docref = doc(db, 'recipes', id)
        await updateDoc(docref, { ...updatedData, imgUrl, deleteUrl, updatedAt: serverTimestamp() })
    } catch (error) {
        console.log("Hiba a módosításkor: " + error);

    }
}