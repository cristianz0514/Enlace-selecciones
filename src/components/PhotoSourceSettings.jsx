import React, { useState } from "react";

export default function PhotoSourceSettings() {
  const [token, setToken] = useState(localStorage.getItem("bdfutbol_token") || "");
  const [email, setEmail] = useState(localStorage.getItem("bdfutbol_email") || "");
  const [password, setPassword] = useState(localStorage.getItem("bdfutbol_password") || "");

  function saveSettings() {
    if (token) localStorage.setItem("bdfutbol_token", token);
    else localStorage.removeItem("bdfutbol_token");
    if (email) localStorage.setItem("bdfutbol_email", email);
    else localStorage.removeItem("bdfutbol_email");
    if (password) localStorage.setItem("bdfutbol_password", password);
    else localStorage.removeItem("bdfutbol_password");
    clearPhotoCache();
  }

  function clearPhotoCache() {
    Object.keys(localStorage)
      .filter((key) => key.startsWith("player-photo:"))
      .forEach((key) => localStorage.removeItem(key));
    window.location.reload();
  }

  return (
    <details className="photo-settings">
      <summary>Fuentes de fotos</summary>
      <div>
        <p>BDFutbol se usa primero si agregas token o credenciales. TheSportsDB y Wikimedia quedan como respaldo validado.</p>
        <label>
          Token BDFutbol
          <input value={token} onChange={(event) => setToken(event.target.value)} placeholder="Bearer token opcional" />
        </label>
        <label>
          Email BDFutbol
          <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="email de cuenta" />
        </label>
        <label>
          Password BDFutbol
          <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="password de cuenta" />
        </label>
        <div className="photo-settings-actions">
          <button type="button" onClick={saveSettings}>Guardar y recargar fotos</button>
          <button type="button" onClick={clearPhotoCache}>Limpiar cache</button>
        </div>
      </div>
    </details>
  );
}
