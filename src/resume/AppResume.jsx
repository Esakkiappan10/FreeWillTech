// src/App.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Examples from './components/Examples';
import ResumeBuilder from './components/ResumeBuilder';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import AdminLogin from './components/AdminLogin';

function AppResume() {
  const [showBuilder, setShowBuilder] = useState(false);

  const handleStartBuilding = () => {
    setShowBuilder(true);
    window.scrollTo(0, 0);
  };

  return (

      <Routes>
        {/* Main Site */}
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
              <Header onExport={handleStartBuilding} />
              <AnimatePresence mode="wait">
                {!showBuilder ? (
                  <>
                    <Hero onStartBuilding={handleStartBuilding} />
                    <Features />
                    <Examples />
                  </>
                ) : (
                  <ResumeBuilder />
                )}
              </AnimatePresence>
              <Footer />
            </div>
          }
        />

        {/* Admin Login */}
        <Route path="/admin" element={<AdminLogin />} />

        {/* Admin Panel */}
        <Route path="/admin/dashboard" element={<AdminPanel />} />
      </Routes>

  );
}

export default AppResume;
