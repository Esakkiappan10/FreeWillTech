import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { ShieldAlert, Users, GraduationCap, ChevronLeft, ChevronRight, Quote } from "lucide-react";

// --- SUB-COMPONENTS ---

const ImpactCard = ({ title, quote, desc, icon: Icon, color }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group relative p-8 bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden"
    >
      {/* Hover Gradient Background */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 bg-${color}-500`} />
      
      {/* Icon */}
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 ${
        color === 'orange' ? 'bg-orange-50 text-orange-500 group-hover:bg-orange-500 group-hover:text-white' :
        color === 'blue' ? 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white' :
        'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white'
      }`}>
        <Icon size={28} />
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
      
      <div className="flex gap-2 mb-4 opacity-70">
         <Quote size={14} className={`transform scale-x-[-1] text-${color}-500`} />
         <p className="text-xs font-bold uppercase tracking-wider text-slate-400 italic">{quote}</p>
      </div>

      <p className="text-slate-500 text-sm leading-relaxed">
        {desc}
      </p>
    </motion.div>
  );
};

export default function CSRShowcase() {
  const [index, setIndex] = useState(0);
  const images = Array.from({ length: 10 }, (_, i) => `/csr/csr${i + 1}.jpg`); // Ensure these images exist in public/csr/
  const sliderRef = useRef(null);

  // Auto Slide
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  const nextSlide = () => setIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <section className="relative w-full py-24 bg-white font-sans overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-40 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/50 blur-[120px] rounded-full mix-blend-multiply opacity-60 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-100/50 blur-[120px] rounded-full mix-blend-multiply opacity-60" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* ================= HEADER SECTION ================= */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-widest mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            Social Responsibility
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-6"
          >
            Empowering Through <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-blue-600">
              Digital Awareness
            </span>
          </motion.h2>

          <motion.p 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="text-lg text-slate-500"
          >
             Making a difference in the lives of students and the community through education, safety, and technology.
          </motion.p>
        </div>

        {/* ================= PILLARS (Reference Style Cards) ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
           <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
             <ImpactCard 
               title="Education Assistance"
               quote="Knowledge is the first line of defense"
               color="blue"
               icon={GraduationCap}
               desc="Educating the youth on recognizing online fraud and digital hygiene. We believe that informed students are the strongest firewall against cyber crime."
             />
           </motion.div>

           <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
             <ImpactCard 
               title="Community Safety"
               quote="Prevention is better than cure"
               color="orange"
               icon={ShieldAlert}
               desc="Promoting the official Cyber Crime Helpline (Dial 1930). We provide the tools and knowledge necessary for immediate action against digital threats."
             />
           </motion.div>

           <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
             <ImpactCard 
               title="Collaboration"
               quote="Together we secure the future"
               color="emerald"
               icon={Users}
               desc="Partnering with institutions like St. Joseph’s College to create a united front. Bridging the gap between industry expertise and academic learning."
             />
           </motion.div>
        </div>

        {/* ================= FEATURED EVENT (Split Layout) ================= */}
        <div className="bg-slate-50 rounded-[3rem] p-8 md:p-16 border border-slate-100 shadow-inner overflow-hidden relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
            
            {/* TEXT CONTENT */}
            <motion.div 
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl md:text-4xl font-bold text-slate-900 mb-6">
                Cyber Crime <span className="text-blue-600">Awareness Drive</span>
              </h3>
              
              <div className="w-20 h-1.5 bg-gradient-to-r from-orange-500 to-blue-600 rounded-full mb-8" />

              <div className="prose prose-lg text-slate-600 leading-relaxed">
                <p className="mb-6">
                  <span className="font-bold text-orange-600">Free Will Technologies</span>, in collaboration with the 
                  <span className="font-semibold text-slate-900"> PG & Research Department of Computer Science </span> 
                  at St. Joseph’s College (Autonomous), Tiruchirappalli, successfully conducted a comprehensive awareness program.
                </p>
                <p className="mb-8">
                  The event focused on real-life demonstrations of phishing attacks, social engineering, and financial fraud protection. Students were trained on how to use the national helpline <span className="inline-block px-2 py-0.5 bg-emerald-100 text-emerald-700 font-bold rounded">Dial 1930</span> effectively.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                <div className="px-6 py-3 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center gap-3">
                  <span className="text-2xl">📅</span>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase">Date</p>
                    <p className="font-semibold text-slate-800">30 Sept 2025</p>
                  </div>
                </div>
                <div className="px-6 py-3 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center gap-3">
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase">Location</p>
                    <p className="font-semibold text-slate-800">St. Joseph’s College, Trichy</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* IMAGE CAROUSEL (Interactive) */}
            <div className="relative w-full aspect-[4/3] lg:aspect-square max-h-[500px]">
              <div className="absolute inset-0 bg-white p-3 rounded-[2rem] shadow-2xl shadow-slate-300/50 rotate-3 transition-transform duration-500 hover:rotate-0">
                <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden bg-slate-100">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={index}
                      src={images[index]}
                      alt={`CSR Event ${index + 1}`}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </AnimatePresence>
                  
                  {/* Slider Controls */}
                  <div className="absolute bottom-6 right-6 flex gap-2 z-20">
                    <button onClick={prevSlide} className="p-3 bg-white/90 backdrop-blur-md rounded-full hover:bg-white text-slate-800 shadow-lg transition-all active:scale-95">
                      <ChevronLeft size={20} />
                    </button>
                    <button onClick={nextSlide} className="p-3 bg-white/90 backdrop-blur-md rounded-full hover:bg-white text-slate-800 shadow-lg transition-all active:scale-95">
                      <ChevronRight size={20} />
                    </button>
                  </div>

                  {/* Progress Bar */}
                  <div className="absolute bottom-0 left-0 h-1 bg-orange-500/20 w-full">
                     <motion.div 
                       className="h-full bg-orange-500"
                       initial={{ width: "0%" }}
                       animate={{ width: "100%" }}
                       key={index} // Reset animation on slide change
                       transition={{ duration: 5, ease: "linear" }}
                     />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Quote (Reference Style) */}
        <div className="mt-20 text-center">
           <Quote size={40} className="mx-auto text-blue-100 mb-6" />
           <p className="text-2xl md:text-3xl font-serif text-slate-400 italic">
             "A digitally literate society is a safer society."
           </p>
        </div>

      </div>
    </section>
  );
}