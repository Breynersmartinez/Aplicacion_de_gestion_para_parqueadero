import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/StellarCodeLogo.jpg";
import "../styles/Login.css";
import googleLogo from "../assets/google-logo.png";


function Login({ onSwitch }) {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para manejar el inicio de sesión
    console.log("Iniciando sesión...");
  };

  return (
    <div className="login-container">
      <img src={logo} alt="Logo de la empresa" className="logo" />
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Correo Electrónico</label>
          <input type="email" required />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input type="password" required />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
        <button onClick={() => window.location.href = "https://accounts.google.com"} className="google-btn">
                  <img src={googleLogo} alt="Google Logo" className="google-icon" /> Iniciar sesión con Google
                </button>
      <p>
        <label> ¿No tienes una cuenta? {" "}
        <span className="switch-link" onClick={() => navigate('/signup')}>
          Regístrate aquí
        </span>
        </label>
        
      </p>
    </div>
  );
}

export default Login;