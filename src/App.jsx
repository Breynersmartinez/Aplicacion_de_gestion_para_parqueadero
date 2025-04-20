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
import AdminDashboard from './pages/AdminDashboard';

const App = () => {
  return (
    <Router basename="/Aplicacion_de_gestion_para_parqueadero">
      <Routes>
        {/* Ruta principal */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <div className="max-w-7xl mx-auto pt-20 px-6">
                <HeroSection />
                <FeatureSection />
                <Workflow />
                <Pricing />
                <Testimonials />
              </div>
              <Footer />
            </>
          }
        />

        {/* Ruta de inicio de sesión */}
        <Route path="/login" element={<Login />} />
        
        {/* Ruta para el panel de administración */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;