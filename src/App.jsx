import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
    <Router>
      <Navbar />
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection />
              <FeatureSection />
              <Workflow />
              <Pricing />
              <Testimonials />
            
            </>
          } />
          <Route path="/login" element={<Login onSwitch={() => <Navigate to="/signup" />} />} />
          <Route path="/signup" element={<SignUp onSwitch={() => <Navigate to="/login" />} />} />
        </Routes>
        <HeroSection />
              <FeatureSection />
              <Workflow />
              <Pricing />
              <Testimonials />
        <Footer />
      </div>
    </Router>
  );
};

export default App;