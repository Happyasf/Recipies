import React from 'react';
import { MdDeleteForever } from "react-icons/md";
import { FaPen } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import '../Recipiecard.css';
import {deleteRecipe} from '../myBackend'

export const Recipiecard = ({ id, name, imgUrl, deleteUrl }) => {
  const navigate = useNavigate();

  return (
    <div className="recipie-card">
      <img src={imgUrl} alt={name} className="recipie-image" />
      <div className="recipie-content">
        <h2>{name}</h2>
        <div className="recipie-actions">
          <FaPen className="icon edit" onClick={() => navigate(`/edit/${id}`)} />
          <MdDeleteForever className="icon delete" onClick={() => deleteRecipe(id, deleteUrl)} />
        </div>
      </div>
    </div>
  );
};
