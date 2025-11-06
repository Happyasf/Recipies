import React from 'react';
import { useNavigate } from 'react-router';
import '../Home.css';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <h1 className="home-title">🥗 ReceptKönyv</h1>
      <p className="home-subtitle">Főzz, posztolj, inspirálj!</p>
      <button className="btn-primary" onClick={() => navigate("/recipies")}>
        Felfedezem a recepteket
      </button>
    </div>
  );
};
