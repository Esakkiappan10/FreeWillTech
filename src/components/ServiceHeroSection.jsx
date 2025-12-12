import React, { useRef } from "react";
import { animate, motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowDown, CheckCircle2, Zap, BarChart3, Globe } from "lucide-react";

// --- REVEAL CARD COMPONENT ---
const RevealCard = ({ icon: Icon, title, desc, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Start slightly lower for a longer, smoother rise
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }} // Triggers a bit earlier for smoothness
      transition={{ 
        duration: 0.8, 
        delay, 
        ease: [0.22, 1, 0.36, 1] // "Apple-style" ease-out curve
      }}
      className="p-8 bg-white rounded-[2rem] border border-slate-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_-10px_rgba(37,99,235,0.1)] hover:border-blue-100 transition-all duration-500 group"
    >
      <div className="w-14 h-14 rounded-2xl bg-slate-50 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
        <Icon size={28} />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-500 leading-relaxed text-sm">{desc}</p>
    </motion.div>
  );
};

export default function ServiceHeroSection() {
  const containerRef = useRef(null);
  
  // 1. Raw Scroll Progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // 2. Physics-Smoothed Scroll (The key to "perfect" smoothness)
  const smoothY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // 3. Parallax Transforms based on smoothed scroll
  const yText = useTransform(smoothY, [0, 1], [0, 150]); // Text drifts down
  const yImage = useTransform(smoothY, [0, 1], [0, -80]); // Image drifts up
  const opacityHero = useTransform(smoothY, [0, 0.6], [1, 0]); // Fade out slower
  const scaleImage = useTransform(smoothY, [0, 1], [1, 1.05]); // Micro-zoom

  // Smooth Scroll Function
  const scrollToMore = () => {
    const el = document.getElementById("more");
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.scrollY;
    
    animate(window.scrollY, y, {
      duration: 1.5, // Slower, more luxurious scroll duration
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (value) => window.scrollTo(0, value)
    });
  };

  return (
    // MAIN CONTAINER with Snap
    <div className="w-full h-auto overflow-x-hidden snap-y snap-mandatory bg-white font-sans selection:bg-orange-100 selection:text-orange-900">

      {/* ================= HERO SECTION (Snap Start) ================= */}
      <section
        ref={containerRef}
        className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden snap-start"
      >
        {/* --- DIMMED ATMOSPHERIC BACKGROUND --- */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Blue Glow - Dimmed */}
          <motion.div 
            style={{ y: yText }} 
            className="absolute top-[-10%] left-[-5%] w-[700px] h-[700px] bg-blue-100/30 blur-[150px] rounded-full mix-blend-multiply opacity-60" 
          />
          {/* Orange Glow - Dimmed */}
          <motion.div 
            style={{ y: yImage }} 
            className="absolute bottom-[-10%] right-[-5%] w-[700px] h-[700px] bg-orange-100/30 blur-[150px] rounded-full mix-blend-multiply opacity-60" 
          />
          {/* Subtle Grain/Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
        </div>

        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* LEFT TEXT CONTENT */}
            <motion.div style={{ y: yText, opacity: opacityHero }} className="space-y-10 relative z-20">
              
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="flex items-center gap-3"
              >
                <div className="h-[2px] w-12 bg-gradient-to-r from-blue-500 to-transparent" />
                <span className="text-blue-600 font-bold tracking-[0.25em] uppercase text-xs sm:text-sm">
                  Innovation First
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
                className="text-5xl sm:text-6xl xl:text-8xl font-extrabold text-slate-900 leading-[1.05] tracking-tight"
              >
                Empowering <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-orange-500 animate-gradient-x">
                  Future Growth.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                className="text-lg sm:text-xl text-slate-500 max-w-xl leading-relaxed border-l-4 border-slate-200 pl-6"
              >
                FrontierWox Tech crafts high-impact web platforms, mobile applications, and automation systems 
                built for modern businesses, ensuring reliability and meaningful growth.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                className="flex flex-wrap gap-4"
              >
                <button
                  onClick={scrollToMore}
                  className="group px-8 py-4 bg-slate-900 text-white rounded-full font-bold flex items-center gap-2 hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/30"
                >
                  Learn More 
                  <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
                </button>
                <a
                  href="/contact"
                  className="px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-full font-bold hover:border-orange-500 hover:text-orange-500 transition-all duration-300 shadow-sm"
                >
                  Contact Us
                </a>
              </motion.div>

            </motion.div>

            {/* RIGHT IMAGE (Parallax + Zoom) */}
            <motion.div
              style={{ y: yImage, scale: scaleImage, opacity: opacityHero }}
              className="relative h-[500px] lg:h-[500px] w-full hidden lg:block"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-orange-500/10 rounded-[3rem] blur-3xl" />
              
              <motion.div
                initial={{ clipPath: "inset(100% 0 0 0)" }}
                animate={{ clipPath: "inset(0 0 0 0)" }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }} // Slow, elegant reveal
                className="w-full h-full rounded-[3rem] overflow-hidden relative z-10 border border-white/50 shadow-2xl bg-white"
              >
                <img
                  src="/abouts.png"
                  alt="Team Innovation"
                  className="w-full h-full object-cover object-center"
                />
                {/* Overlay Gradient - Dimmed */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent mix-blend-multiply" />
              </motion.div>

              {/* Floating Badge */}
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, type: "spring", stiffness: 100 }}
                className="absolute -bottom-8 -left-8 bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/50 z-20 max-w-[200px]"
              >
                <div className="text-4xl font-bold text-orange-500 mb-1">99.9%</div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Client Satisfaction</div>
              </motion.div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* ================= MORE CONTENT SECTION (Snap Start) ================= */}
      <section id="more" className="relative min-h-screen pt-32 pb-24 bg-slate-50 snap-start flex items-center border-t border-slate-100">
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
          
          {/* Header */}
          <div className="text-center mb-24">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6"
            >
              Why Choose <span className="text-blue-600">FrontierWox?</span>
            </motion.h2>
            <motion.div 
              initial={{ width: 0 }} 
              whileInView={{ width: 80 }} 
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-1 bg-gradient-to-r from-blue-600 to-orange-500 mx-auto rounded-full" 
            />
          </div>

          {/* Cards Grid - Staggered Reveal */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <RevealCard 
              title="Innovative Tech" 
              desc="We utilize the latest frameworks (React, Node, AI) to build future-proof solutions."
              icon={Zap}
              delay={0.1}
            />
            <RevealCard 
              title="Scalable Design" 
              desc="Systems architecture designed to grow seamlessly with your business needs."
              icon={BarChart3}
              delay={0.2}
            />
            <RevealCard 
              title="Global Standards" 
              desc="Adhering to international coding standards and security protocols."
              icon={Globe}
              delay={0.3}
            />
            <RevealCard 
              title="Reliable Support" 
              desc="24/7 dedicated support team ensuring your digital assets never sleep."
              icon={CheckCircle2}
              delay={0.4}
            />
          </div>

          {/* Large Visual Section */}
          <motion.div 
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-24 w-full h-[400px] md:h-[500px] rounded-[3rem] overflow-hidden relative shadow-2xl group"
          >
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
              alt="Collaboration" 
              className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-slate-900/60 transition-colors duration-500 group-hover:bg-slate-900/50 flex items-center justify-center text-center p-6">
               <div className="relative z-10">
                 <h3 className="text-3xl md:text-5xl font-bold text-white mb-8 drop-shadow-lg">Ready to Transform Your Business?</h3>
                 <a href="/contact" className="px-10 py-5 bg-orange-500 text-white rounded-full font-bold hover:bg-orange-600 transition-all shadow-xl hover:shadow-orange-500/40 hover:-translate-y-1 inline-block">
                    Get Started Today
                 </a>
               </div>
            </div>
          </motion.div>

        </div>
      </section>

    </div>
  );
}