import React from "react";
import { motion } from "framer-motion";

export default function AboutHero({ style = "apple" }) {
  const base =
    "relative w-[94%] lg:w-[80%] mx-auto py-24 font-[Nunito] flex flex-col lg:flex-row items-center gap-14";

  /* STYLE THEMES */
  const themes = {
    cyberpunk: `
      bg-black 
      text-cyan-300 
      border-l-[5px] border-cyan-400 
      neon-shadow
    `,
    apple: `
      bg-white 
      text-slate-800 
      border-l-[4px] border-slate-200 
    `,
    glass: `
      bg-white/10 
      backdrop-blur-xl 
      text-white 
      border border-white/20 
      rounded-3xl 
      shadow-[0_8px_40px_rgba(255,255,255,0.1)]
    `,
  };

  /* IMAGE STYLE LOGIC BASED ON THEME */
  const imageFrame =
    style === "cyberpunk"
      ? "border border-cyan-400 shadow-[0_0_40px_rgba(0,255,255,0.5)]"
      : style === "glass"
      ? "border border-white/20 shadow-xl backdrop-blur-2xl"
      : "shadow-xl border border-slate-200";

  return (
    <section className={`${base} ${themes[style]}`}>
      {/* LEFT TEXT */}
      <div className="px-5 py-4 flex-1 space-y-7 lg:pr-14">

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className={`
            text-4xl sm:text-5xl lg:text-6xl font-extrabold 
            leading-tight 
            ${
              style === "cyberpunk"
                ? "bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
                : style === "glass"
                ? "text-white drop-shadow-xl"
                : "text-slate-900"
            }
          `}
        >
          About FreeWill Technologies
        </motion.h1>

        {/* SUBTITLE */}
        <motion.p
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-xl font-light opacity-90 max-w-xl"
        >
          Innovation engineered with precision — and designed for the world ahead.
        </motion.p>

        {/* PARAGRAPHS */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="leading-relaxed text-lg max-w-2xl opacity-90 space-y-5"
        >
          <p>
            FreeWill Technologies blends engineering, creativity, and emerging
            intelligence to build products that feel modern, intuitive, and alive.
          </p>

          <p>
            Our work goes beyond functionality — we design digital ecosystems that
            adapt, learn, and elevate the people who use them.
          </p>

          <p>
            We think boldly, experiment fearlessly, and craft technology with
            intention. Every project is a collaboration between vision and
            possibility.
          </p>

          <p>
            We believe that the future belongs to companies who create with purpose,
            move with clarity, and innovate without boundaries.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.a
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          href="#contact"
          className={`
            inline-block mt-4 font-semibold py-3.5 px-8 rounded-xl transition-all duration-300
            ${
              style === "cyberpunk"
                ? "bg-cyan-400 text-black shadow-[0_0_25px_rgba(0,255,255,0.6)]"
                : style === "glass"
                ? "bg-white/20 backdrop-blur-xl border border-white/30 text-white hover:bg-white/30"
                : "bg-slate-900 text-white shadow-lg hover:shadow-xl"
            }
          `}
        >
          Contact Us
        </motion.a>
      </div>

      {/* RIGHT — PROFESSIONAL IMAGE */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className={`flex-1 flex justify-center`}
      >
        <div
          className={`rounded-3xl overflow-hidden p-2 ${imageFrame} bg-white/5`}
        >
          <img
            src="/about.jpg"
            alt="FreeWill Team"
            className="rounded-2xl object-cover w-[330px] sm:w-[370px] lg:w-[420px]"
          />
        </div>
      </motion.div>
    </section>
  );
}
