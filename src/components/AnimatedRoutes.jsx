// src/AnimatedRoutes.jsx — Smooth Luma Fade + Route Transitions
import React, { useEffect, useRef, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import TransitionLayer from "./TransitionLayer";

// Pages
import Home from "../pages/Home";
import Service from "../pages/Service";
import About from "../pages/About";
import Contact from "../pages/Contact";
import TestimonialPage from "../pages/TestimonialPage";
import CSRSection from "./csr";
import AboutProductsClients from "../pages/product";

const RedirectExternal = ({ url }) => {
  window.location.href = url;
  return null;
};

export default function AnimatedRoutes({ transitionDuration = 1100 }) {
  const location = useLocation();
  const prev = useRef(location.pathname);

  const [transitioning, setTransitioning] = useState(false);
  const timeoutRef = useRef(null);

  // Handle route-change sweep animation
  useEffect(() => {
    if (prev.current !== location.pathname) {
      setTransitioning(true);

      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(
        () => setTransitioning(false),
        transitionDuration
      );

      prev.current = location.pathname;
    }
  }, [location, transitionDuration]);

  return (
    <>
      {/* GPU sweep layer */}
      <TransitionLayer active={transitioning} duration={transitionDuration} />

      {/* Framer + React Router */}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, filter: "blur(15px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          style={{
            minHeight: "100vh",
            willChange: "opacity, filter",
          }}
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/service" element={<Service />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/testimonials" element={<TestimonialPage/>} />
            <Route path="/csr" element={<CSRSection/>} />
            <Route path="/products" element={<AboutProductsClients/>} />

            <Route
              path="/resume"
              element={
                <RedirectExternal url="https://resumebuilder.freewilltech.in/" />
              }
            />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
