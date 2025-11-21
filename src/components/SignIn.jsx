import React, { useContext, useState } from "react";
import { MyUserContext } from "../context/MyUserProvider";
import { useNavigate } from "react-router";
import "../Auth.css";

export const SignIn = () => {
  const { signInUser, msg } = useContext(MyUserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  const ok = await signInUser(email, password);
  if (ok) navigate("/recipies");
};

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Bejelentkezés</h1>

        {msg && <p className="auth-msg">{msg}</p>}

        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email cím" value={email} onChange={(e)=>setEmail(e.target.value)} required />
          <input type="password" placeholder="Jelszó" value={password} onChange={(e)=>setPassword(e.target.value)} required />
          <button type="submit" className="auth-btn">Belépés</button>
        </form>

        <p>Nincs fiókod? <span className="auth-link" onClick={()=>navigate("/signup")}>Regisztrálj!</span></p>
      </div>
    </div>
  );
};
