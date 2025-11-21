import React, { useContext, useState } from "react";
import { MyUserContext } from "../context/MyUserProvider";
import { useNavigate } from "react-router";
import "../Auth.css";

export const SignUp = () => {
  const { signUpUser, msg } = useContext(MyUserContext);
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return alert("❌ A jelszavak nem egyeznek!");
    await signUpUser(email, password, displayName);
    navigate("/signin");
    const ok = await signUpUser(email, password, displayName);
    if (ok) navigate("/signin");
  };
  

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Regisztráció</h1>

        {msg && <p className="auth-msg">{msg}</p>}

        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Felhasználónév" value={displayName} onChange={(e)=>setDisplayName(e.target.value)} required />
          <input type="email" placeholder="Email cím" value={email} onChange={(e)=>setEmail(e.target.value)} required />
          <input type="password" placeholder="Jelszó" value={password} onChange={(e)=>setPassword(e.target.value)} required />
          <input type="password" placeholder="Jelszó megerősítése" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} required />
          <button type="submit" className="auth-btn">Regisztráció</button>
        </form>

        <p>Már van fiókod? <span className="auth-link" onClick={()=>navigate("/signin")}>Lépj be!</span></p>
      </div>
    </div>
  );
};
