import { useState } from "react";

export default function DeleteAccountModal({ onClose, onDelete }) {
  const [pwd, setPwd] = useState("");

  return (
    <div className="modal-bg">
      <div className="modal-card">
        <h3>Fiók végleges törlése</h3>
        <p>Biztosan törölni szeretnéd? Ez a művelet nem visszavonható!</p>

        <input
          type="password"
          placeholder="Jelszó megerősítéshez"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          className="modal-input"
        />

        <div className="modal-buttons">
          <button className="btn-cancel" onClick={onClose}>Mégsem</button>
          <button className="btn-delete" onClick={() => onDelete(pwd)}>Törlés</button>
        </div>
      </div>
    </div>
  );
}
