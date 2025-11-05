import React from 'react'
import { FaHome } from "react-icons/fa";
import { useNavigate } from 'react-router';

export const Recipies = () => {

  const navigate = useNavigate()

  return (
    <div style={{minHeight:'100vh', backgroundColor:'lightyellow', position:'relative'}}>
      <div style={{textAlign:'center'}}>Receptek...</div>
      <FaHome onClick={()=>navigate("/")} style={{position:'absolute', top:'5px', left:'5px'}}/>
      <button  onClick={()=>navigate("/addnew")} style={{position:'absolute', bottom:'5px', right:'5px'}}>Új recept hozzáadása</button>
    </div>
  )
}