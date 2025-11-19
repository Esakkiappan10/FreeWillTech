// src/pages/Header.jsx
import React, { useEffect, useRef } from "react";
import { motion, useReducedMotion, useMotionValue, useTransform } from "framer-motion";
import anime from "animejs";
import SplitText from "../components/SplitText";
import FloatingLines from "../components/FloatingLines";
import { Cpu, Code2, Cloud, ShieldCheck, ArrowRight } from "lucide-react";

// Detect touch devices
const isTouch = () =>
  typeof window !== "undefined" &&
  ("ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0);

// Neon AI Particles Behind CTA
function NeonParticles() {
  useEffect(() => {
    const particles = Array.from(document.querySelectorAll(".neon-particle"));

    const animate = () => {
      particles.forEach((p, i) => {
        anime({
          targets: p,
          translateX: anime.random(-20, 20),
          translateY: anime.random(-10, 10),
          opacity: anime.random(0.3, 1),
          scale: anime.random(0.7, 1.4),
          easing: "easeInOutQuad",
          duration: anime.random(1000, 2400),
          delay: i * 80,
        });
      });
    };

    animate();
    const id = setInterval(animate, 2500);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      {Array.from({ length: 22 }).map((_, i) => (
        <div
          key={i}
          className="neon-particle absolute rounded-full blur-xl"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${8 + Math.random() * 12}px`,
            height: `${8 + Math.random() * 12}px`,
            background: `radial-gradient(circle, rgba(0,180,255,0.9), transparent)`,
            opacity: 0.4,
          }}
        />
      ))}
    </div>
  );
}

export default function Header() {
  const ctaRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Animated gradient headline
  const gradientAnimation = {
      background:
  "linear-gradient(90deg, #ff7a18, #ff9e2c, #3ba3f8, #1e71ff, #ff7a18)",
    backgroundSize: "300% 300%",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  useEffect(() => {
    if (shouldReduceMotion) return;
    anime({
      targets: ".gradient-text",
      backgroundPositionX: ["0%", "200%"],
      easing: "linear",
      duration: 9000,
      loop: true,
    });
  }, [shouldReduceMotion]);

  // CTA Glow Pulse
  useEffect(() => {
    if (shouldReduceMotion) return;
    const animation = anime({
      targets: ".cta-glow",
      boxShadow: [
        "0 0 0px rgba(0,200,255,0)",
        "0 0 28px rgba(0,200,255,0.5)",
        "0 0 48px rgba(0,200,255,0.35)",
      ],
      easing: "easeInOutQuad",
      duration: 2600,
      direction: "alternate",
      loop: true,
    });
    return () => animation.pause();
  }, [shouldReduceMotion]);

  return (
    <header className="relative w-full min-h-screen bg-transparent overflow-hidden">

      {/* Floating tech lines (existing) */}
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-[100%]">
        <FloatingLines
          enabledWaves={["top", "middle", "bottom"]}
          lineCount={[11, 11, 18]}
          lineDistance={[5, 2, 4]}
          animationSpeed={0.65}
          interactive={true}
          parallax={true}
          bendStrength={-0.19}
          bendRadius={7.2}
          mouseDamping={0.09}
          lineThickness={0.4}
          linesGradient={["#cfe8ff","#d9eeff","#e6f3ff","#f0f8ff"]}
          topWavePosition={{ x: 8.2, y: 0.3, rotate: -0.19 }}
          middleWavePosition={{ x: 4.1, y: 0.0, rotate: 0.04 }}
          bottomWavePosition={{ x: 2.0, y: -0.5, rotate: 0.15 }}
          mixBlendMode="screen"
        />
      </div>

      {/* Main container */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 pt-24 md:pt-32 pb-20 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT SIDE */}
          <div className="flex flex-col items-start text-left gap-6">

           {/* Working Hours */}
<div className="flex flex-wrap items-center gap-4 md:gap-6 bg-white/10 backdrop-blur-md border border-white/10 px-5 py-4 rounded-2xl w-fit">
  
  {/* Block 1 */}
  <div className="flex flex-col">
    <p className="text-[11px] uppercase tracking-wide text-white/80">Working Hours</p>
    <p className="font-semibold text-blue-300 text-sm">Mon – Fri, 10AM – 7PM</p>
  </div>

  {/* Divider */}
  <div className="hidden md:block w-px h-8 bg-white/10" />

  {/* Block 2 */}
  <div className="flex flex-col">
    <p className="text-[11px] uppercase tracking-wide text-white/80">Mail</p>
    <a
      href="mailto:contact@freewilltech.in"
      className="font-semibold text-blue-300 text-sm hover:text-blue-200 transition"
    >
      contact@freewilltech.in
    </a>
  </div>

  {/* Divider */}
  <div className="hidden md:block w-px h-8 bg-white/10" />

  {/* Block 3 */}
  <div className="flex flex-col">
    <p className="text-[11px] uppercase tracking-wide text-white/80">Contact No</p>
    <a
      href="tel:+919626806328"
      className="font-semibold text-blue-300 text-sm hover:text-blue-200 transition"
    >
      +91 96268 06328
    </a>
  </div>

</div>


            {/* Animated gradient headline */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="gradient-text text-4xl md:text-5xl lg:text-[56px] font-extrabold leading-tight"
              style={gradientAnimation}
            >
              Welcome to Free Will Technologies
            </motion.h1>

            {/* Description */}
            <SplitText
              text="We build intelligent digital solutions designed for modern businesses. Our focus is on creating high-performance products that solve real challenges and deliver measurable results. With strategic technical support, modern engineering practices, and efficient automation, we help organizations accelerate growth and unlock new possibilities. By embracing innovation and continuous learning, we ensure every business stays future-ready and competitive in an ever-evolving digital landscape."
              className="text-slate-900 text-base md:text-xl max-w-[600px] leading-relaxed text-left"
              splitType="words"
              stagger={0.05}
              duration={0.35}
              delay={0.12}
            />

            {/* CTA Button with neon particles */}
            <div className="mt-6 relative w-fit">
              <NeonParticles />

              <a
                ref={ctaRef}
                href="/contact"
                className="cta-glow relative inline-flex items-center gap-3 px-7 py-3 
                bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-semibold rounded-xl 
                shadow-xl hover:-translate-y-0.5 active:scale-95 transition"
              >
                Contact Us <ArrowRight size={16} />
              </a>
            </div>

            <a href="/service" className="inline-flex items-center text-sky-300 gap-2 px-4 py-2 border border-slate-300 rounded-xl">
              Our Services
            </a>

          </div>

          {/* RIGHT — Hero Image */}
          <motion.div
            className="relative p-3 md:p-4 rounded-3xl bg-white/80 border border-slate-100 
            backdrop-blur-sm shadow-[0_20px_60px_rgba(2,6,23,0.12)] w-full max-w-[520px] mx-auto"
          >
            <img
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=940&q=80"
              alt="team collaborating"
              className="rounded-2xl shadow-lg w-full h-[320px] object-cover"
            />
          </motion.div>

        </div>
      </div>
    </header>
  );
}
