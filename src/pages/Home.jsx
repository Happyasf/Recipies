import React, { useEffect, useState } from 'react';
import '../Home.css';
import { useNavigate } from 'react-router';
import { readRecipes } from '../myBackend';
import { Recipiecard } from '../components/Recipiecard';

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    readRecipes(setRecipes);
  }, []);

  return (
    <div className="home-page">

      <section className="hero">
        <h1>🥗 ReceptKönyv</h1>
        <p>Főzz, ossz meg & inspirálj másokat!</p>
        <button className="btn-primary" onClick={() => navigate("/addnew")}>
          ➕ Új recept feltöltése
        </button>
      </section>

      <section className="top-recipes">
        <h2>🔥 Top Receptek</h2>

        {recipes.length > 0 ? (
          <div className="home-recipes-grid">
            {recipes.slice(0, 4).map(recipe => <Recipiecard key={recipe.id} {...recipe} />)}
          </div>
        ) : (
          <div className="no-recipes">
            <p>Még nincs recept! Légy te az első! 👩‍🍳👨‍🍳</p>
            <button className="btn-primary" onClick={() => navigate("/addnew")}>➕ Recept hozzáadása</button>
          </div>
        )}
      </section>

    </div>
  );
};
