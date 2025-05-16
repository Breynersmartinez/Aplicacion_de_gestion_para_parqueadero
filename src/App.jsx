import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeatureSection from './components/FeatureSection';
import Workflow from './components/Workflow';
import Footer from './components/Footer';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import AdminHomeDashboard from './pages/AdminHomeDashboard';
import LoginClient from './pages/LoginClient';
import ClientDashboard from './pages/ClientDashboard';
import ClientSignUp from './pages/ClientSignUp';

// Importar los componentes necesarios
// Importar las páginas necesarias
const App = () => {
  return (
    <Router >
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


        {/* Ruta de inicio de sesión Cliente */}
          <Route path="/loginClient" element={<LoginClient />} />

       <Route path="/clientSignUp" element={<ClientSignUp />} />


        {/* Ruta de inicio de sesión */}
        <Route path="/login" element={<Login />} />
        

        <Route path="/AdminHomeDashboard" element={<AdminHomeDashboard />} />
   

        {/* Ruta para el panel de administración */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
     
           {/* Ruta para el panel de administración de usuarios*/}
        <Route path="/client-dashboard" element={<ClientDashboard />} />
    
      </Routes>
    </Router>
  );
};

export default App;