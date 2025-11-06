import axios from "axios";
import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, orderBy, query, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore"
import imageCompression from "browser-image-compression";
import { db } from "./firebaseApp.js"

const apiKey = import.meta.env.VITE_IMGBB_API_KEY
const imgbburl = "https://api.imgbb.com/1/upload?key=" + apiKey
console.log(imgbburl);

const uploadToIMGBB = async (file) => {
    const myFormData = new FormData()
    myFormData.append("image", file)
    try {
        const response = await axios.post(imgbburl, myFormData)
        const { url, delete_url } = response.data.data
        return { url, delete_url }
    } catch (error) {
        console.log("Képfeltöltési hiba " + error);

    }
}

export const addRecipie = async (recipie, file) => {
    try {
        let imgUrl = ""
        let deleteUrl = ""
        const compressed = await imageCompression(file, { maxWidthOrHeight: 800, useWebWorker: true })

        const result = await uploadToIMGBB(compressed)
        if (result) {
            imgUrl = result.url
            deleteUrl = result.delete_url
        }
        const collectionref = collection(db, "recipies")
        await addDoc(collectionref, { ...recipie, imgUrl, deleteUrl, timestamp: serverTimestamp() })
    } catch (error) {
        console.log("Nem sikerült hozzáadi " + error);

    }
}
export const readRecipies = async (setRecipies) => {
    const collectionref = collection(db, "recipies")
    const q = query(collectionref, orderBy("timestamp", "desc"))
    const unsubscribe = onSnapshot(q, (snapshot) => {
        setRecipies(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    })
    return unsubscribe
}

export const readRecipie = async (id, setRecipie) => {
    console.log(id);

    const docRef = doc(db, 'recipes', id)
    const docData = await getDoc(docRef)
    setRecipie(docData.data())

}

export const deleteRecipie = async (id, deleteUrl) => {
    // await axios.get(deleteUrl)
    console.log(id);

    const docRef = doc(db, "recipies", id)
    await deleteDoc(docRef)
}
export const updateRecipie = async (id, updatedData, file) => {
    console.log(id, updatedData, file);

    const imgUrl = updatedData.imgUrl || ''
    const deleteUrl = updatedData.deleteUrl || ''
    console.log(imgUrl,deleteUrl);
    
    try {
        if (file) {
            const compressed = await imageCompression(file, { maxWidthOrHeight: 800, useWebWorker: true })
            const result = await uploadToIMGBB(compressed)
            if (result) {
                imgUrl = result.url
            }
        }
        const docref = doc(db, "recipies", id)

        await updateDoc(docref, { ...updatedData, imgUrl, deleteUrl, timestamp: serverTimestamp() })


    } catch (error) {
        console.log("modositashiba " + error);

    }
}