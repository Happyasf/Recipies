import React from 'react'

import "../Auth.css";
import { useState } from 'react';
import { useNavigate } from 'react-router';

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("A jelszavak nem egyeznek!");
      return;
    }
    console.log("Sign up with:", email, password);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Regisztráció</h1>
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
          <input
            type="password"
            placeholder="Jelszó megerősítése"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className="auth-btn">Regisztráció</button>
        </form>
        <p>
          Már van fiókod?{" "}
          <span onClick={() => navigate("/signin")} className="auth-link">
            Jelentkezz be!
          </span>
        </p>
      </div>
    </div>
  );
};

