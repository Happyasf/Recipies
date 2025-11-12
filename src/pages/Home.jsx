import React from 'react';
import { useNavigate } from 'react-router';
import '../Home.css';
import { SignIn } from '../components/SignIn';
import { SignUp } from '../components/SignUp';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <SignIn/>
      <SignUp/>
      <h1 className="home-title">🥗 ReceptKönyv</h1>
      <p className="home-subtitle">Főzz, posztolj, inspirálj!</p>
      <button className="btn-primary" onClick={() => navigate("/recipies")}>
        Felfedezem a recepteket
      </button>
    </div>
  );
};
