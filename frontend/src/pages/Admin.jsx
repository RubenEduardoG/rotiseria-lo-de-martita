import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

const Admin = () => {
  const { isAuthenticated, login, logout } = useAuth();
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Demo-only: simple password check — in production replace with real auth
    if (password === 'admin123') {
      login('martita-admin-token');
      setPassword('');
    } else {
      alert('Contraseña incorrecta');
    }
  };

  return (
    <div className="admin-page container chalkboard-card">
      <h2>Panel Admin</h2>
      {isAuthenticated ? (
        <div>
          <p>Estás autenticado como admin.</p>
          <button className="btn-primary" onClick={logout}>Cerrar sesión</button>
        </div>
      ) : (
        <form onSubmit={handleLogin} className="admin-form">
          <label>
            Contraseña
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Ingresa la contraseña" />
          </label>
          <div className="form-actions">
            <button type="submit" className="btn-primary">Iniciar sesión</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Admin;
