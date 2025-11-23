import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function ServiceHeroSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Smooth Parallax
  const yText = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const yImage = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const fadeScroll = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden bg-white"
    >

      {/* Background Accents */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Blue Glow */}
        <div className="absolute top-[-15%] left-[-10%] w-[700px] h-[700px] bg-[#1E9CD7]/15 blur-[140px] rounded-full" />
        {/* Orange Glow */}
        <div className="absolute bottom-[-15%] right-[-10%] w-[600px] h-[600px] bg-[#FE861B]/15 blur-[140px] rounded-full" />

        {/* Subtle Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:70px_70px] [mask-image:radial-gradient(circle,_black,_transparent_70%)]" />
      </div>

      {/* Content Wrapper */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT — About Text */}
          <motion.div style={{ y: yText }} className="space-y-8">

            {/* Section Label */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="flex items-center gap-3"
            >
              <div className="h-[2px] w-12 bg-gradient-to-r from-[#1E9CD7] to-transparent" />
              <span className="text-[#1E9CD7] font-bold tracking-[0.25em] uppercase text-sm">
                About Free Will
              </span>
            </motion.div>

            {/* Hero Title */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl sm:text-6xl xl:text-7xl font-extrabold text-slate-900 leading-[1.1]"
            >
              Empowering Growth
              <br />
              <span className="bg-gradient-to-r from-[#1E9CD7] via-[#FE861B] to-[#1E9CD7] text-transparent bg-clip-text">
                Through Innovation.
              </span>
            </motion.h1>

            {/* About Paragraph (Based Only on PDF About Section) */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="text-lg sm:text-xl text-slate-600 max-w-xl leading-relaxed border-l-4 border-[#1E9CD7]/40 pl-6"
            >
              Free Will Technologies is a forward-thinking digital solutions company dedicated
              to delivering exceptional technology, design, and innovation. We craft high-impact
              web platforms, mobile applications, automation systems, and creative digital solutions
              built for modern businesses, ensuring reliability, scalability, and meaningful growth.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <a
                href="#more"
                className="px-8 py-4 bg-[#1E9CD7] text-white rounded-full font-bold flex items-center gap-2 hover:bg-[#157ead] transition-all duration-300 shadow-sm"
              >
                Learn More <ArrowDown size={18} />
              </a>

              <a
                href="/contact"
                className="px-8 py-4 border-2 border-slate-300 text-slate-700 rounded-full font-bold hover:border-[#FE861B] hover:text-[#FE861B] transition-all duration-300"
              >
                Contact Us
              </a>
            </motion.div>

          </motion.div>

          {/* RIGHT — Clean Hero Image With Glass Card */}
          <motion.div
            style={{ y: yImage }}
            className="relative h-[500px] lg:h-[700px] w-full hidden lg:block"
          >
            {/* Soft Gradient Frame Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#1E9CD7]/20 to-[#FE861B]/20 rounded-[3rem] blur-3xl opacity-40" />

            {/* Main Image Frame */}
            <motion.div
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              animate={{ clipPath: "inset(0 0 0 0)" }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full rounded-[3rem] overflow-hidden relative z-10 border border-slate-200 shadow-2xl bg-white"
            >
              <img
                src="/about.jpg"
                alt="Our Team"
                className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-[1.4s]"
              />
            </motion.div>
          </motion.div>

        </div>

        {/* Scroll Indicator */}
        <motion.div
          style={{ opacity: fadeScroll }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400"
        >
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-slate-500 to-transparent" />
        </motion.div>

      </div>
    </section>
  );
}
