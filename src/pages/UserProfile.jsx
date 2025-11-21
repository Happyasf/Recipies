import React, { useContext, useState, useEffect } from "react";
import { MyUserContext } from "../context/MyUserProvider";
import { readUserRecipes } from "../myBackend";
import "../UserProfile.css";
import { updateUserImage } from "../CloudinaryUtils";
import DeleteAccountModal from "../components/DeleteAccountModal";

export const UserProfile = () => {
  const { user } = useContext(MyUserContext);
  const { deleteAccount } = useContext(MyUserContext);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [myRecipes, setMyRecipes] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    readUserRecipes(setMyRecipes);
  }, []);

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    setFile(f);
    if (f) setPreview(URL.createObjectURL(f));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    await updateUserImage(file);
    setLoading(false);
    alert("🎉 Profil frissítve!");
  };

  return (
    <div className="profile-container">
      <div className="profile-card">

        <h2>Profil módosítása</h2>

        <div className="profile-info">
          {user?.photoURL && (
            <img className="profile-img" src={user.photoURL} alt="profil" />
          )}
          <div className="profile-data">
            <p><span>Név:</span> {user?.displayName}</p>
            <p><span>Email:</span> {user?.email}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="profile-form">
          <label><strong>Új profilkép feltöltése:</strong></label>

          <label className="file-input-label">
            📎 Válassz képet
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </label>

          <span className="file-name">{file ? file.name : "Nincs fájl kiválasztva"}</span>

          <button className="btn-primary profile-btn" disabled={loading}>
            {loading ? "Mentés..." : "Profil frissítése"}
          </button>

          <button 
            type="button" 
            className="delete-account-btn" 
            onClick={() => setShowModal(true)}
          >
            🗑 Fiók végleges törlése
          </button>

        </form>

        {preview && <img className="profile-img preview-img" src={preview} alt="Előnézet" />}

        {showModal && (
          <DeleteAccountModal
            onClose={() => setShowModal(false)}
            onDelete={(pwd) => deleteAccount(pwd)}
          />
        )}
      </div>
    </div>
  );
};
