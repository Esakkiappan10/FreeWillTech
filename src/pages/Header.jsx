// src/pages/Header.jsx
import React, { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import anime from "animejs";
import SplitText from "../components/SplitText";
import { ArrowRight, ArrowDownRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

export default function Header() {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    anime({
      targets: ".gradient-text",
      backgroundPositionX: ["0%", "200%"],
      easing: "linear",
      duration: 8000,
      loop: true,
    });

    const particles = Array.from(document.querySelectorAll(".neon-particle"));
    const animateParticles = () => {
      particles.forEach((p, i) => {
        anime({
          targets: p,
          translateX: anime.random(-20, 20),
          translateY: anime.random(-10, 10),
          opacity: anime.random(0.3, 0.8),
          scale: anime.random(0.7, 1.2),
          easing: "easeInOutQuad",
          duration: anime.random(1500, 3000),
          delay: i * 80,
        });
      });
    };

    animateParticles();
    const id = setInterval(animateParticles, 2500);
    return () => clearInterval(id);
  }, [shouldReduceMotion]);

  return (
    <header className="relative w-full min-h-screen flex flex-col justify-center items-center px-6 py-16 overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero.jpg"
          alt="Hero Background"
          className="w-full h-full object-cover opacity-70 pointer-events-none select-none"
        />
      </div>

      {/* Smooth white fade overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-white/40 via-white/60 to-white/90 pointer-events-none" />

      {/* PARTICLES */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="neon-particle absolute rounded-full blur-2xl bg-[#1E9CD7]/30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
            }}
          />
        ))}
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-30 max-w-[1000px] mx-auto text-center flex flex-col items-center gap-8">

        {/* Title */}
<motion.h1
  variants={fadeUp}
  initial="hidden"
  animate="show"
  className="text-4xl sm:text-5xl lg:text-8=6xl xl:text-[5.5rem] font-extrabold tracking-tighter text-slate-900 leading-[1.05]"
>
  We empower growth <br />
  <span className="gradient-text bg-gradient-to-r from-[#1E9CD7] via-[#FE861B] to-[#1E9CD7] bg-clip-text text-transparent bg-[length:200%_auto]">
    through innovation.
  </span>
</motion.h1>

{/* Subheading */}
<motion.p
  variants={fadeUp}
  initial="hidden"
  animate="show"
  transition={{ delay: 0.2 }}
  className="text-lg sm:text-2xl text-slate-600 font-light max-w-2xl"
>
  Tech-driven solutions built to inspire, automate, and accelerate modern businesses.
</motion.p>

{/* Description */}
<motion.div
  variants={fadeUp}
  initial="hidden"
  animate="show"
  transition={{ delay: 0.35 }}
  className="max-w-2xl"
>
  <SplitText
    text="At Free Will Technologies, we create smart, scalable, design-driven digital solutions. From powerful web & app development to automation, branding, and IT consulting — we help businesses innovate, evolve, and succeed in the digital age."
    className="text-lg md:text-xl text-slate-600 leading-relaxed font-light"
    splitType="words"
    stagger={0.01}
    duration={0.4}
    delay={0.4}
  />
</motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-5 mt-4"
        >
          <a
            href="/contact"
            className="group relative px-8 py-4 bg-[#1E9CD7] text-white rounded-full overflow-hidden shadow-lg hover:shadow-blue-500/40 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-[#FE861B] translate-y-full group-hover:translate-y-0 transition duration-300 ease-in-out" />
            <span className="relative flex items-center gap-2 font-medium text-lg">
              Start a Project <ArrowRight size={20} />
            </span>
          </a>

          <a
            href="/service"
            className="px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-full font-medium text-lg hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
          >
            Explore Services <ArrowDownRight size={20} />
          </a>
        </motion.div>
      </div>
    </header>
  );
}
