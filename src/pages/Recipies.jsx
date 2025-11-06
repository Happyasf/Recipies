import React, { useEffect, useState } from 'react';
import { FaHome, FaPlus } from "react-icons/fa";
import { useNavigate } from 'react-router';
import { Recipiecard } from '../components/Recipiecard';
import { readRecipies } from '../mybackend';
import '../Recipies.css';

export const Recipies = () => {
  const [recipies, setRecipies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    readRecipies(setRecipies);
  }, []);

  return (
    <div className="recipies-page">
      <header className="recipies-header">
        <FaHome className="home-icon" onClick={() => navigate("/")} />
        <h1>Receptek</h1>
      </header>

      <div className="recipies-grid">
        {recipies.length > 0 ? (
          recipies.map(obj => <Recipiecard key={obj.id} {...obj} />)
        ) : (
          <p>Nincsenek még receptek!</p>
        )}
      </div>

      <button className="btn-primary add-btn" onClick={() => navigate("/addnew")}>
        <FaPlus /> Új recept hozzáadása
      </button>
    </div>
  );
};
