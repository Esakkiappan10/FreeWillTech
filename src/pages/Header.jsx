// src/pages/Header.jsx
import React, { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import anime from "animejs";
import SplitText from "../components/SplitText";
import { ArrowRight, ArrowDownRight } from "lucide-react";

// Subtle fade up animation
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

// Staggered container for content sequence
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

export default function Header() {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    // 1. Gradient Text Animation
    anime({
      targets: ".gradient-text",
      backgroundPositionX: ["0%", "200%"],
      easing: "linear",
      duration: 8000,
      loop: true,
    });

    // 2. Particle Animation Setup
    const particles = Array.from(document.querySelectorAll(".neon-particle"));
    const animateParticles = () => {
      particles.forEach((p, i) => {
        anime({
          targets: p,
          translateX: anime.random(-30, 30), // Increased range slightly
          translateY: anime.random(-20, 20),
          opacity: anime.random(0.2, 0.6), // Softer opacity
          scale: anime.random(0.7, 1.3),
          easing: "easeInOutQuad",
          duration: anime.random(2000, 4000),
          delay: i * 100,
        });
      });
    };

    animateParticles();
    const id = setInterval(animateParticles, 3500);
    return () => clearInterval(id);
  }, [shouldReduceMotion]);

  return (
    // Main Container: Flex on mobile, Grid on large screens
    <header className="relative w-full min-h-[95vh] lg:min-h-screen flex lg:grid lg:grid-cols-12 items-center overflow-hidden bg-white">

      {/* ================= RIGHT SIDE: SLASHING IMAGE ================= */}
      {/* Mobile: Absolute background with heavy fade.
         Desktop: Absolute right positioning with dynamic clip-path slash.
      */}
      <div
        className="absolute inset-0 z-0 
                   lg:left-auto lg:right-0 lg:w-[55%] lg:h-full
                   pointer-events-none select-none overflow-hidden
                   /* The Agro Slash Clip Path */
                   lg:[clip-path:polygon(15%_0%,_100%_0%,_100%_100%,_0%_100%)]"
      >
        <img
          src="/hero.jpg"
          alt="Hero Background Innovation"
          className="w-full h-full object-cover object-center lg:object-left"
        />

        {/* Image Overlays for readability and style */}
        {/* Mobile Overlay: Heavy white fade */}
        <div className="absolute inset-0 bg-white/80 lg:hidden" />

        {/* Desktop Overlay: Blue tint + subtle gradient fade towards the text */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-l from-[#1E9CD7]/20 via-transparent to-white/90" />
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-white/10" />
      </div>

      {/* ================= BACKGROUND PARTICLES (Left side focus) ================= */}
      <div className="absolute inset-0 z-10 pointer-events-none lg:w-1/2 overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="neon-particle absolute rounded-full blur-[40px] bg-[#1E9CD7]/20"
            style={{
              top: `${Math.random() * 90}%`,
              left: `${Math.random() * 80}%`,
              width: `${30 + Math.random() * 50}px`,
              height: `${30 + Math.random() * 50}px`,
            }}
          />
        ))}
      </div>

      {/* ================= LEFT SIDE: CONTENT ================= */}
      {/* Content is centered on mobile, left-aligned on desktop occupying 6 columns */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-20 w-full px-6 py-16 md:px-12 
                   flex flex-col items-center text-center
                   lg:col-span-6 lg:items-start lg:text-left lg:pl-[10%] lg:pr-0"
      >
        {/* Title */}
        <motion.h1
          variants={fadeUp}
          className="text-4xl sm:text-5xl md:text-6xl xl:text-[5rem] font-extrabold tracking-tighter text-slate-900 leading-[1.1] mb-6"
        >
          We empower growth <br />
          <span className="gradient-text bg-gradient-to-r from-[#1E9CD7] via-[#FE861B] to-[#1E9CD7] bg-clip-text text-transparent bg-[length:200%_auto] pb-2">
            through innovation.
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={fadeUp}
          className="text-lg sm:text-xl md:text-2xl text-slate-600 font-medium max-w-xl mb-8"
        >
          Tech-driven solutions built to inspire, automate, and accelerate
          modern businesses.
        </motion.p>

        {/* Description with SplitText */}
        <motion.div variants={fadeUp} className="max-w-xl mb-10">
          <SplitText
            text="At FreeWill Technologies, we build intelligent web and mobile solutions, empower startups with tech consultation, and create bridges between education and innovation. Together, we’re shaping the future of digital transformation."
            className="text-base sm:text-lg text-slate-500 leading-relaxed font-light"
            splitType="words"
            stagger={0.008}
            duration={0.5}
            delay={0.6}
          />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6"
        >
          <a
            href="/contact"
            className="group relative px-8 py-4 bg-[#1E9CD7] text-white rounded-full overflow-hidden shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-[#FE861B] translate-y-full group-hover:translate-y-0 transition duration-300 ease-in-out" />
            <span className="relative flex items-center gap-2 font-bold text-lg">
              Start a Project <ArrowRight size={20} />
            </span>
          </a>

          <a
            href="/service"
            className="group px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 rounded-full font-bold text-lg hover:border-[#1E9CD7] hover:text-[#1E9CD7] transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
          >
            Explore Services{" "}
            <ArrowDownRight
              size={20}
              className="group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform"
            />
          </a>
        </motion.div>
      </motion.div>
    </header>
  );
}