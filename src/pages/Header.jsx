// src/pages/Header.jsx
import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, useReducedMotion } from "framer-motion";
import anime from "animejs";
import SplitText from "../components/SplitText";
import { Cpu, Code2, Cloud, ShieldCheck, ArrowRight } from "lucide-react";
import FloatingLines from "../components/FloatingLines";

const isTouch = () =>
  typeof window !== "undefined" &&
  ("ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0);

// Magnetic CTA hover
function useMagnetic(ref, strength = 18) {
  useEffect(() => {
    if (!ref.current || isTouch()) return;
    const el = ref.current;

    const move = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      el.style.transform = `translate(${x / strength}px, ${y / strength}px)`;
    };

    const leave = () => {
      el.style.transform = "translate(0,0) scale(1)";
      el.style.transition = "transform .32s cubic-bezier(.2,.9,.2,1)";
      setTimeout(() => (el.style.transition = ""), 300);
    };

    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);

    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, [ref, strength]);
}

function FloatingBadge({ icon, top, left, right, delay = 0 }) {
  return (
    <motion.div
      className="absolute bg-white/8 backdrop-blur-md p-3 rounded-2xl border border-white/10 shadow-lg"
      style={{ top, left, right }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 0.9, y: -6 }}
      transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay }}
      aria-hidden
    >
      {icon}
    </motion.div>
  );
}

export default function Header() {
  const ctaRef = useRef(null);
  useMagnetic(ctaRef);
  const shouldReduceMotion = useReducedMotion();

  // Parallax 3D tilt on hero card
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-60, 60], [12, -12]);
  const rotateY = useTransform(x, [-60, 60], [-12, 12]);

  const handleTilt = (e) => {
    if (shouldReduceMotion || isTouch()) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - (rect.left + rect.width / 2));
    y.set(e.clientY - (rect.top + rect.height / 2));
  };

  const resetTilt = () => {
    x.set(0);
    y.set(0);
  };

  // CTA Glow Pulse (respects reduced motion)
  useEffect(() => {
    if (shouldReduceMotion) return;
    const animation = anime({
      targets: ".cta-glow",
      boxShadow: [
        "0 0 0px rgba(255,255,255,0)",
        "0 0 22px rgba(88,144,255,0.26)",
        "0 0 44px rgba(88,144,255,0.44)",
        "0 0 22px rgba(88,144,255,0.26)",
      ],
      easing: "easeInOutQuad",
      duration: 3600,
      direction: "alternate",
      loop: true,
    });
    return () => animation.pause();
  }, [shouldReduceMotion]);

  return (
    <header className="relative w-full min-h-screen bg-transparent overflow-hidden" role="banner">

      {/* Subtle Tech Image Layer: low-opacity, mix-blend for compatibility with light backgrounds */}
      <div className="absolute inset-0 -z-20 pointer-events-none opacity-80">
        <img
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=940&q=80"
          alt="abstract technology grid background"
          className="w-full h-full object-cover filter saturate-110 brightness-95"
          style={{ mixBlendMode: "overlay", opacity: 0.12 }}
        />
        {/* Soft radial vignette to keep center content readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/3 to-transparent pointer-events-none" />
      </div>

      {/* Floating Light Background (vector lines) */}
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
          linesGradient={["#cfe8ff",
  "#d9eeff",
  "#e6f3ff",
  "#f0f8ff"]}
          topWavePosition={{ x: 8.2, y: 0.3, rotate: -0.19 }}
          middleWavePosition={{ x: 4.1, y: 0.0, rotate: 0.04 }}
          bottomWavePosition={{ x: 2.0, y: -0.5, rotate: 0.15 }}
          mixBlendMode="screen"
        />

        {/* Gentle overlay to ensure contrast when page background is light */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/6 pointer-events-none" />
      </div>

      {/* Floating Badges */}
      <FloatingBadge icon={<Cpu className="text-blue-300" />} top="8%" left="4%" delay={0} />
      <FloatingBadge icon={<Cloud className="text-sky-300" />} top="68%" left="8%" delay={1} />
      <FloatingBadge icon={<Code2 className="text-indigo-200" />} top="28%" right="6%" delay={0.4} />
      <FloatingBadge icon={<ShieldCheck className="text-emerald-200" />} top="80%" right="12%" delay={1.2} />

      {/* MAIN CONTENT */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 pt-32 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT SIDE */}
<div className="flex flex-col items-start text-left">
  <div className="inline-flex items-center gap-5 bg-white/6 backdrop-blur-md border border-white/6 px-5 py-3 rounded-2xl mb-6">
    <div className="text-sm text-slate-600">
      <p className="text-xs text-white">Working Hours</p>
      <p className="font-semibold text-blue-400">Mon – Fri, 10AM – 7PM</p>
    </div>
    <div className="w-[1px] h-8 bg-white/6" />
    <a href="tel:+919626806328" className="text-white hover:text-slate-900">+91 96268 06328</a>
    <div className="w-[1px] h-8 bg-white/6" />
    <a href="mailto:contact@freewilltech.in" className="text-white hover:text-slate-900">contact@freewilltech.in</a>
  </div>

  <motion.h1
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, ease: "easeOut" }}
    className="text-4xl md:text-5xl lg:text-[56px] leading-tight font-extrabold text-slate-900 text-left w-full"
  >
    Welcome to FreeWill Technologies
  </motion.h1>

  <SplitText
    text="We build intelligent digital solutions designed for modern businesses. Our focus is on creating high-performance products that solve real challenges and deliver measurable results. With strategic technical support, modern engineering practices, and efficient automation, we help organizations accelerate growth and unlock new possibilities. By embracing innovation and continuous learning, we ensure every business stays future-ready and competitive in an ever-evolving digital landscape."
    className="mt-5 text-slate-900 text-lg md:text-xl max-w-2xl leading-normal"
    splitType="words"
    stagger={0.05}
    duration={0.35}
    delay={0.12}
  />

  <div className="mt-8 flex gap-4 items-center w-full">
    <a
      ref={ctaRef}
      href="/contact"
      className="cta-glow inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-semibold rounded-xl shadow-2xl transform-gpu hover:-translate-y-0.5 active:scale-95 transition"
    >
      Contact Us <ArrowRight size={16} />
    </a>

    <a
      href="/service"
      className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-900 rounded-xl hover:bg-slate-50 transition"
    >
      Our Services
    </a>

    <a
      href="/case-studies"
      className="ml-2 text-sm text-slate-900 underline underline-offset-2"
    >
      See case studies
    </a>
  </div>

  <div className="mt-6 flex flex-wrap gap-3 items-center text-xs text-slate-600">
    <span className="px-3 py-1 bg-white/6 rounded-full">SaaS</span>
    <span className="px-3 py-1 bg-white/6 rounded-full">Cloud</span>
    <span className="px-3 py-1 bg-white/6 rounded-full">AI</span>
    <span className="px-3 py-1 bg-white/6 rounded-full">Enterprise</span>
  </div>
</div>


          {/* RIGHT — Hero Card with 3D Tilt + CTA overlay */}
          <motion.div
            onMouseMove={handleTilt}
            onMouseLeave={resetTilt}
            style={{ rotateX, rotateY }}
            className="relative p-4 rounded-3xl bg-white/80 border border-slate-100 backdrop-blur-sm shadow-[0_20px_60px_rgba(2,6,23,0.12)] max-w-[540px] mx-auto transform-gpu"
            whileHover={{ scale: shouldReduceMotion ? 1 : 1.02 }}
          >
            <img
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=940&q=80"
              alt="team collaborating"
              className="rounded-2xl shadow-lg w-full h-[320px] object-cover"
              style={{ mixBlendMode: "normal" }}
            />

          </motion.div>

        </div>
      </div>

      {/* Bottom fade to match page bg when stacked within other sections */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none bg-gradient-to-b from-transparent to-white/10" />
    </header>
  );
}
