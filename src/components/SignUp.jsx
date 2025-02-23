import React from "react";
import logo from "/public/StellarCodeLogo.jpg"; // Añade tu imagen aquí

function SignUp({ onSwitch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para manejar el registro
    console.log("Registrando usuario...");
  };

  return (
    <div className="signup-container">
      <img src={logo} alt="Logo de la empresa" className="logo" />
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre Completo</label>
          <input type="text" required />
        </div>
        <div className="form-group">
          <label>Correo Electrónico</label>
          <input type="email" required />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input type="password" required />
        </div>
        <button type="submit">Registrarse</button>
      </form>
      <p>
        <label >
        ¿Ya tienes una cuenta?{" "}
        <span className="switch-link" onClick={onSwitch}>
          Inicia sesión aquí
        </span>
        </label>
      </p>
    </div>
  );
}

export default SignUp;