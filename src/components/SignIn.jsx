import React from 'react'

import { useState } from "react";
import "../Auth.css";
import { useNavigate } from 'react-router';

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // ide jöhet majd a Firebase auth
    console.log("Sign in with:", email, password);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Bejelentkezés</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email cím"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Jelszó"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="auth-btn">Belépés</button>
        </form>
        <p>
          Nincs fiókod?{" "}
          <span onClick={() => navigate("/signup")} className="auth-link">
            Regisztrálj!
          </span>
        </p>
      </div>
    </div>
  );
};

