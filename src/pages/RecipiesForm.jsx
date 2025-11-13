import React from 'react'
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { IoMdClose } from "react-icons/io";
import { useNavigate, useParams } from 'react-router';
import { addRecipe, readRecipe, updateRecipe } from '../myBackend';
import { useEffect } from 'react';

export const RecipiesForm = () => {
  const [name, setName] = useState("")
  const [ingredients, setIngredients] = useState([""])
  const [steps, setSteps] = useState("")
  const [category, setCategory] = useState("")
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [recipie,setRecipie] =useState(null)
  const navigate = useNavigate()
 
  const {id} = useParams()

  console.log(id);
  
  useEffect(()=>{
    if(id){
    readRecipe(id,setRecipie)}
  },[id])

 useEffect(()=>{
  if(recipie){
    setName(recipie.name)
    setCategory(recipie.category)
    setIngredients(recipie.ingredients)
    setSteps(recipie.steps)
    setPreview(recipie.imgUrl)
  }
 },[recipie])
 
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    let inputData = {name,ingredients,steps,category}
    console.log(inputData);
    if(id){
      console.log(recipie.imgUrl);
      
      await updateRecipe(id,!file ? {...inputData,imgUrl:recipie.imgUrl,deleteUrl:recipie.deleteUrl}: inputData,file)
    }else{
      await addRecipe(inputData, file)
    }
    setName('')
    setCategory('')
    setSteps('')
    setIngredients([''])
    setFile(null)
    setLoading(false)
    navigate('/recipies')
  }

  const handleChangeIngredients = (index, value) => {
    const newIngredients = [...ingredients]
    newIngredients[index] = value
    setIngredients(newIngredients)
  }
  const handldeFileChange = (e)=>{
    const selected = e.target.files[0]
    setFile(selected)
    if(selected){
      setPreview(URL.createObjectURL(selected))
    }
  }


  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'lightyellow', position: 'relative' }}>
      <h1 style={{ textAlign: 'center' }}>Új recept feltöltése</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='receptneve' value={name} onChange={(e) => setName(e.target.value)} required />
        <div>
        {ingredients.map((item, index) => 
          <div key={index}>
            <input type="text" value={item} onChange={(e) => handleChangeIngredients(index, e.target.value) } placeholder={`${index+1} hozzávaló: `}/>
          </div>
        )}
        <FaPlus onClick={()=>setIngredients([...ingredients,""])}/>
        </div>
        <textarea value={steps} onChange={(e)=>setSteps(e.target.value)} placeholder='Elkészítés lépései' required></textarea>
        <input type="text" value={category} onChange={(e)=>setCategory(e.target.value)} placeholder='Kategoria' required/>
        <input type="file" accept='image/*' onChange={handldeFileChange}/>
        {preview && <img src={preview} alt='előnézet' style={{maxHeight:200,objectFit:"cover"}}/>}
        <button type='submit'>Mentés</button>
      </form>
      {loading && <div>Loading...</div>}
      <IoMdClose onClick={() => navigate("/recipies")} style={{ position: 'absolute', top: '5px', left: '5px' }} />
    </div>
  )
}