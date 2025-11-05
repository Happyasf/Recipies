import axios from "axios";
import{addDoc, collection, serverTimestamp, Timestamp} from "firebase/firestore"
import imageCompression from "browser-image-compression";
import {db} from "./firebaseApp.js"

const apiKey = import.meta.env.VITE_IMGBB_API_KEY
const imgbburl = "https://api.imgbb.com/1/upload?key="+apiKey
console.log(imgbburl);

const uploadToIMGBB = async(file)=>{
    const myFormData = new FormData()
    myFormData.append("image",file)
    try {
        const response = await axios.post(imgbburl, myFormData)
        const {url,delete_url} = response.data.data
        return {url,delete_url} 
    } catch (error) {
        console.log("Képfeltöltési hiba " + error);
        
    }
}

export const addRecipie = async(recipie,file) =>{
    try {
        let imgUrl = ""
        let deleteUrl = ""
        const compressed = await imageCompression(file,{maxWidthOrHeight:800,useWebWorker:true})

        const result =await uploadToIMGBB(compressed)
        if (result){
            imgUrl = result.url
        }
        const collectionref = collection(db, "recipies")
        await addDoc(collectionref,{...recipie,imgUrl,deleteUrl, timestamp:serverTimestamp()})
    } catch (error) {
        console.log("Nem sikerült hozzáadi " + error);
        
    }
}