import React, { useRef } from "react";
import { FaWhatsapp, FaArrowRight } from "react-icons/fa";
import { motion, useScroll, useTransform, useSpring, useMotionTemplate, useMotionValue } from "framer-motion";

const ContactWhatsApp = () => {
  const ref = useRef(null);
  
  // Mouse Parallax Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ clientX, clientY, currentTarget }) => {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width;
    const y = (clientY - top) / height;
    mouseX.set(x);
    mouseY.set(y);
  };

  // Parallax Background transforms
  const bgX = useSpring(useTransform(mouseX, [0, 1], ["-2%", "2%"]), { stiffness: 50, damping: 20 });
  const bgY = useSpring(useTransform(mouseY, [0, 1], ["-2%", "2%"]), { stiffness: 50, damping: 20 });

  // Scroll Parallax for the container
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[60vh] md:min-h-[500px] flex items-center justify-center font-[Nunito] mt-20 overflow-hidden group perspective-1000"
    >
      {/* --- DYNAMIC BACKGROUND LAYER --- */}
      <motion.div 
        style={{ x: bgX, y: bgY }}
        className="absolute inset-0 z-0"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{
            backgroundImage: "url('https://ik.imagekit.io/HoneyJoe/freewill%20technologies%20assetss/world-global-cartography-globalization-earth-international-concept.jpg?updatedAt=1744989313390')",
          }}
        />
        {/* Dark overlay with blue tint for "Tech" feel */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-slate-900/70 to-black/90" />
      </motion.div>

      {/* --- TECH GRID & GLOW ORBS --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Moving Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        
        {/* Pulsing Orbs - Adjusted colors for Agro/Tech vibe (Green/Cyan) */}
        <motion.div 
          animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/20 rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1.2, 1, 1.2] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-[100px]" 
        />
      </div>

      {/* --- MAIN GLASS CARD --- */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 w-full max-w-5xl mx-4"
      >
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
          
          {/* Shine effect passing through card */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent opacity-50 pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-14 gap-10">
            
            {/* TEXT CONTENT */}
            <div className="flex-1 text-center md:text-left space-y-6">
              
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="inline-block py-1 px-3 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-widest uppercase mb-4">
                    Instant Support
                  </span>
                  <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight">
                    Let’s build the <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                      future together.
                    </span>
                  </h2>
                </motion.div>
              </div>

              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 1 }}
                className="text-lg text-slate-300 max-w-lg mx-auto md:mx-0 leading-relaxed font-light"
              >
                Got a revolutionary idea? Need clarity on your next agricultural or tech project? We are just one tap away.
              </motion.p>
            </div>

            {/* BUTTON SECTION */}
            <div className="relative">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                className="relative z-20"
              >
                 {/* Glowing Ring Effect behind button */}
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                
                <a
                  href="https://wa.me/919626806328"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex items-center gap-4 bg-slate-900 border border-slate-700 hover:border-emerald-500/50 text-white py-4 px-8 md:py-5 md:px-10 rounded-2xl overflow-hidden group/btn transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* Hover Shimmer Effect */}
                  <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 group-hover/btn:left-[100%] transition-all duration-700 ease-in-out" />
                  
                  <div className="relative flex items-center justify-center w-12 h-12 bg-emerald-500 rounded-full group-hover/btn:scale-110 transition-transform duration-300 shadow-lg shadow-emerald-500/30">
                     <FaWhatsapp className="text-2xl text-white" />
                  </div>
                  
                  <div className="text-left">
                    <p className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">Online Now</p>
                    <p className="text-xl font-bold">Chat on WhatsApp</p>
                  </div>
                  
                  <FaArrowRight className="ml-2 text-slate-500 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all duration-300" />
                </a>
              </motion.div>
            </div>

          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactWhatsApp;