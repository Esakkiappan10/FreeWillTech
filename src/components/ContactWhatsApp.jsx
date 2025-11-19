import React, { useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const ContactWhatsApp = () => {
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <section
      className="relative w-full h-[45vh] md:h-[45vh] bg-cover bg-center flex items-center justify-center font-[Nunito] mt-20 overflow-hidden"
      style={{
        backgroundImage:
          "url('https://ik.imagekit.io/HoneyJoe/freewill%20technologies%20assetss/world-global-cartography-globalization-earth-international-concept.jpg?updatedAt=1744989313390')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      {/* Vision Pro Floating Depth Orbs */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-10 right-10 w-[240px] h-[240px] bg-secondary/30 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-10 left-10 w-[220px] h-[220px] bg-primary/30 blur-[120px] rounded-full animate-pulse" />
      </div>

      {/* VisionOS Glass Depth Panels */}
      <div className="absolute inset-0 flex justify-center items-center -z-10 opacity-50">
        <div className="w-[70%] h-[70%] bg-white/5 backdrop-blur-2xl rounded-[40px] shadow-[0_0_80px_rgba(255,255,255,0.06)]"></div>
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-20 text-center text-white px-6" data-aos="fade-up">
        
        {/* Heading with Animated SVG Underline */}
        <div className="inline-block relative">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-2xl"
          >
            Let’s Connect on WhatsApp
          </motion.h2>

          {/* SVG Underline */}
          <motion.svg
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1.6, ease: "easeOut" }}
            className="absolute left-0 right-0 mx-auto bottom-[-8px]"
            width="260"
            height="22"
            viewBox="0 0 260 22"
            fill="none"
          >
            <motion.path
              d="M5 15C55 5 205 5 255 15"
              stroke="url(#grad)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="grad" x1="0" x2="260" y1="0" y2="0">
                <stop offset="0%" stopColor="#00F0FF" />
                <stop offset="100%" stopColor="#5A5CFF" />
              </linearGradient>
            </defs>
          </motion.svg>
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-6 mb-8 text-base sm:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed"
        >
          Have an idea that needs clarity? Want to discuss a project or explore 
          collaboration? Message us instantly on WhatsApp — fast, seamless, and direct.
        </motion.p>

        {/* WhatsApp Button */}
        <motion.a
          href="https://wa.me/919626806328"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.08, boxShadow: "0 0 40px rgba(0,255,120,0.5)" }}
          whileTap={{ scale: 0.94 }}
          className="inline-flex items-center gap-3 bg-secondary text-black font-semibold py-3.5 px-8 rounded-2xl shadow-xl 
          hover:shadow-3xl transition-all duration-300 hover:-translate-y-1 active:scale-95"
        >
          <FaWhatsapp className="text-3xl animate-pulse" />
          Chat on WhatsApp
        </motion.a>
      </div>

      {/* Soft upper-lower fade overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/40 opacity-70 pointer-events-none"></div>
    </section>
  );
};

export default ContactWhatsApp;
