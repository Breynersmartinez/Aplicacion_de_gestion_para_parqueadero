import React from "react";
import logo from "../assets/StellarCodeLogo.jpg"; // imagen aquí
import "../styles/Login.css";

function Login({ onSwitch }) {
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
      <p>
        <label> ¿No tienes una cuenta? {" "}
        
        <span className="switch-link" onClick={onSwitch}>
          Regístrate aquí
          
        </span>
        </label>
      </p>
    </div>
  );
}

export default Login;