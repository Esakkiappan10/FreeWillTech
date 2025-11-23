import React, { useEffect, useRef, useState } from "react";
import { Routes, Route, useLocation, BrowserRouter } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import TransitionLayer from "./TransitionLayer";

import Home from "../pages/Home";
import Service from "../pages/Service";
import About from "../pages/About";
import Contact from "../pages/Contact";
import TestimonialPage from "../pages/TestimonialPage";
import CSRSection from "./csr";
import AboutProductsClients from "../pages/product";

const PagePlaceholder = ({ title, color }) => (
  <div className={`min-h-screen flex items-center justify-center ${color} pt-20`}>
    <div className="text-center p-10 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
      <h1 className="text-5xl font-black text-white mb-4">{title}</h1>
      <p className="text-white/80">Page Content Loaded</p>
    </div>
  </div>
);

const RedirectExternal = ({ url }) => {
  useEffect(() => {
    window.location.href = url;
  }, [url]);
  return null;
};

/* =========================================
   ANIMATED ROUTES COMPONENT
   ========================================= */
function AnimatedRoutesContent({ transitionDuration = 1200 }) {
  const location = useLocation();
  const prev = useRef(location.pathname);
  const [transitioning, setTransitioning] = useState(false);
  const timeoutRef = useRef(null);

  // 1. Trigger Transition on Route Change
  useEffect(() => {
    if (prev.current !== location.pathname) {
      setTransitioning(true);
      
      // Clear any existing timeout
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      
      // Reset transition state after duration
      timeoutRef.current = setTimeout(
        () => setTransitioning(false),
        transitionDuration
      );
      
      prev.current = location.pathname;
    }
  }, [location, transitionDuration]);

  // 2. Scroll Reset Logic (Optimized)
  useEffect(() => {
    if (!transitioning) {
       // Reset scroll only after transition creates the "curtain"
       window.scrollTo(0, 0);
    }
  }, [location.pathname, transitioning]);

  return (
    <div 
      className="relative w-full min-h-screen bg-slate-50"
      style={{ isolation: "isolate" }}
    >
      {/* The Shutter Effect Layer */}
      <TransitionLayer active={transitioning} duration={transitionDuration} />

      {/* Page Content Animation */}
      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
        <motion.div
          key={location.pathname}
          // Slight delay to allow shutter to close before swapping content
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            filter: "blur(0px)",
            transition: { 
              duration: 0.6, 
              delay: 0.3, // Wait for columns to cover screen
              ease: "easeOut" 
            }
          }}
          exit={{ 
            opacity: 0,
            filter: "blur(10px)",
            transition: { duration: 0.2 } 
          }}
          className="relative w-full"
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/service" element={<Service />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/testimonials" element={<TestimonialPage />} />
            <Route path="/csr" element={<CSRSection />} />
            <Route path="/products" element={<AboutProductsClients />} />
            <Route 
              path="/resume"
              element={<RedirectExternal url="https://resumebuilder.freewilltech.in/" />}
            />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// 3. Safe Export with Router Context Check
export default function AnimatedRoutes(props) {
    // If we are already inside a Router (e.g. in App.js), direct render
    // If standalone, wrap in BrowserRouter to fix "useLocation" error
    try {
        useLocation();
        return <AnimatedRoutesContent {...props} />;
    } catch (e) {
        return (
            <BrowserRouter>
                <AnimatedRoutesContent {...props} />
            </BrowserRouter>
        );
    }
}