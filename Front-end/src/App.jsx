import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeatureSection from './components/FeatureSection';
import Workflow from './components/Workflow';
import Footer from './components/Footer';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

const App = () => {
  return (
    <Router basename="/Aplicacion_de_gestion_para_parqueadero">
      <Navbar />
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <Routes>
          {/* Ruta principal */}
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <FeatureSection />
                <Workflow />
                <Pricing />
                <Testimonials />
              </>
            }
          />

          {/* Ruta de inicio de sesión */}
          <Route
            path="/login"
            element={<Login onSwitch={() => window.location.href = "/Aplicacion_de_gestion_para_parqueadero/signup"} />}
          />

          {/* Ruta de registro */}
          <Route
            path="/signup"
            element={<SignUp onSwitch={() => window.location.href = "/Aplicacion_de_gestion_para_parqueadero/login"} />}
          />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;