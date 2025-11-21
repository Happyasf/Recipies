import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { IoMdClose } from "react-icons/io";
import { useNavigate, useParams } from 'react-router';
import { addRecipe, readRecipe, updateRecipe } from '../myBackend';
import "../RecipiesForm.css";

export const RecipiesForm = () => {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [steps, setSteps] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) readRecipe(id, setRecipe);
  }, [id]);

  useEffect(() => {
    if (recipe) {
      setName(recipe.name);
      setCategory(recipe.category);
      setIngredients(recipe.ingredients);
      setSteps(recipe.steps);
      setPreview(recipe.imgUrl);
    }
  }, [recipe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const inputData = { name, ingredients, steps, category };
    if (id) {
      await updateRecipe(id, file ? inputData : { ...inputData, imgUrl: recipe.imgUrl, deleteUrl: recipe.deleteUrl }, file);
    } else {
      await addRecipe(inputData, file);
    }
    navigate('/recipies');
  };

  return (
    <div className="form-wrapper">
      
      <div className="form-card">
        <h1>{id ? "Recept szerkesztése" : "Új recept hozzáadása"}</h1>

        <form onSubmit={handleSubmit}>

          <label>Recept neve:</label>
          <input type="text" placeholder='Pl: Rántott hús'
            value={name} onChange={(e) => setName(e.target.value)} required />

          <label>Hozzávalók:</label>
          {ingredients.map((item, index) => (
            <input key={index} type="text" placeholder={`${index + 1}. hozzávaló`}
              value={item} onChange={(e) => {
                const newIng = [...ingredients];
                newIng[index] = e.target.value;
                setIngredients(newIng);
              }} />
          ))}
          <button type="button" className="add-ing-btn"
            onClick={() => setIngredients([...ingredients, ""])}><FaPlus /> Új hozzávaló</button>

          <label>Elkészítés lépései:</label>
          <textarea placeholder="Írd le részletesen..." value={steps}
            onChange={(e) => setSteps(e.target.value)} required />

          <label>Kategória:</label>
          <input type="text" placeholder='Pl: Leves, Sült, Édesség'
            value={category} onChange={(e) => setCategory(e.target.value)} required />

          <label>Recept képe:</label>
          <input type="file" accept='image/*' onChange={(e) => {
            setFile(e.target.files[0]);
            setPreview(URL.createObjectURL(e.target.files[0]));
          }} />

          {preview && <img src={preview} alt='Előnézet' className="preview-img" />}

          <button type='submit' className="save-btn" disabled={loading}>
            {loading ? "Mentés..." : "Mentés"}
          </button>

        </form>

      </div>

      <IoMdClose onClick={() => navigate("/recipies")} className="close-btn" />

    </div>
  );
};
