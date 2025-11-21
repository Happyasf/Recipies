import React, { useContext } from 'react'
import { RxAvatar } from "react-icons/rx";
import { FaHome } from "react-icons/fa";
import { useNavigate } from 'react-router';
import { MyUserContext } from '../context/MyUserProvider';

export const MyHeader = () => {
  const { user, logoutUser } = useContext(MyUserContext);
  const navigate = useNavigate();

  return (
    <header className='header'>
      <FaHome className="home-icon-btn" onClick={()=>navigate("/")}/>

      {user ? (
        <div className="user-menu">
          <RxAvatar size={32} className="avatar-icon" onClick={()=>navigate("/profile")} title={user.displayName}/>
          <button className="logout-btn" onClick={logoutUser}>Kijelentkezés</button>
        </div>
      ) : (
        <div className="header-auth">
          <button className='gomb' onClick={()=>navigate("/signin")}>SignIn</button>
          <button className='gomb' onClick={()=>navigate("/signup")}>SignUp</button>
        </div>
      )}
    </header>
  );
};
