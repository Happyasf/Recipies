import React from 'react'
import { TbLogin2 } from "react-icons/tb";
import { useNavigate } from 'react-router';
import { RxAvatar } from "react-icons/rx";
import { FaHome } from "react-icons/fa";
import { useContext } from 'react';
import { myUserContext } from '../context/MyUserProvider';
export const MyHeader = () => {
  const {user, logoutUser} = useContext(myUserContext)
  console.log(user);
  
    const navigate = useNavigate()
  return (
    <div className='header'>
      <div className='header-left'>
      <FaHome onClick={()=>navigate("/")} style={{position:'absolute', top:'5px', left:'5px', fontSize:"2.5rem"}}/></div>
      {user ? 
      <div className='kijelentkezes'>
        <RxAvatar size={30} title={user.displayName}/>
        <button onClick={()=>logoutUser()}>Kijelentkezés</button>
      </div>  
      :
      <div className='header-right'>
      <button className='gomb' onClick={()=>navigate("/signin")}>SignIn</button>
      <button className='gomb' onClick={()=>navigate("/signup")}>SignUp</button>
      </div>
    }
      
    </div>
  )
}
