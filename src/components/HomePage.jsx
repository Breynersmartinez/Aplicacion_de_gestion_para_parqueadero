import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/StellarCodeLogo.jpg";
import "../styles/HomePage.css";

function HomePage() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="homepage-container">
      {/* Header con animación de fondo */}
      <header className="header">
        <div className="header-overlay">
          <img src={logo} alt="StellarCode Logo" className="logo" />
          <h1>Bienvenido a StellarPark</h1>
          <p>Tu solución inteligente para el estacionamiento</p>
        </div>
       
      </header>

 {/* Botón de Iniciar Sesión en la esquina superior derecha */}
 <button className="login-button" onClick={handleLoginClick}>
          Iniciar Sesión
        </button>
      {/* Sección de descripción */}
      <section className="description">
        <h2>¿Qué ofrecemos?</h2>
        <p>
          StellarPark es una plataforma innovadora que te permite encontrar y
          reservar espacios de estacionamiento de manera rápida y segura. Con
          nosotros, olvídate de dar vueltas buscando donde estacionar.
        </p>
      </section>

      {/* Sección de características */}
      <section className="features">
        <h2>Características Principales</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Reserva Rápida</h3>
            <p>Reserva tu espacio en segundos desde cualquier dispositivo.</p>
          </div>
          <div className="feature-card">
            <h3>Pago Seguro</h3>
            <p>Múltiples métodos de pago con total seguridad.</p>
          </div>
          <div className="feature-card">
            <h3>Ubicación en Tiempo Real</h3>
            <p>Encuentra espacios disponibles en tiempo real.</p>
          </div>
        </div>
      </section>

      {/* Sección del mapa */}
      <section className="map">
        <h2>Ubicación</h2>
        <div className="map-container">
          <iframe
            title="Ubicación del parqueadero"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.8332865711604!2d-76.55374192493363!3d3.390850996583784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e30a8832212050d%3A0xb7281223f25ff99b!2sUCC%20Cali!5e0!3m2!1ses-419!2sco!4v1725750216407!5m2!1ses-419!2sco"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>

      {/* Sección de tarifas */}
      <section className="pricing">
        <h2>Tarifas y Métodos de Pago</h2>
        <p>
          Nuestras tarifas son competitivas y ofrecemos múltiples métodos de
          pago para tu conveniencia. Aceptamos tarjetas de crédito, débito y
          pagos móviles.
        </p>
        <div className="pricing-cards">
          <div className="card">
            <h3>Por Hora</h3>
            <p>$5.000 COP</p>
          </div>
          <div className="card">
            <h3>Diario</h3>
            <p>$30.000 COP</p>
          </div>
          <div className="card">
            <h3>Mensual</h3>
            <p>$300.000 COP</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2023 StellarPark. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default HomePage;
