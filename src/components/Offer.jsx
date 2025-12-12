// Offer.jsx
import React, { useRef } from "react";
import { Users, Shield, Code, Clock, ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";

const pillars = [
  { 
    title: "Our Team", 
    desc: "Customer-focused professionals delivering exceptional service.", 
    icon: Users, 
    color: "text-blue-500",
    bg: "group-hover:bg-blue-500"
  },
  { 
    title: "Leadership", 
    desc: "Visionary guidance guiding innovation & long-term strategy.", 
    icon: Shield, 
    color: "text-orange-500",
    bg: "group-hover:bg-orange-500"
  },
  { 
    title: "Developers", 
    desc: "Talented engineers building scalable & reliable digital logic.", 
    icon: Code, 
    color: "text-blue-500",
    bg: "group-hover:bg-blue-500"
  },
  { 
    title: "Support", 
    desc: "Dedicated assistance ensuring smooth 24/7 operations.", 
    icon: Clock, 
    color: "text-orange-500",
    bg: "group-hover:bg-orange-500"
  },
];

// Animation Variants
const containerVars = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const cardVars = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 } 
  }
};

export default function Offer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-slate-50 relative overflow-hidden">
      
      {/* --- Background Decor (Liquid Blobs) --- */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-200/30 rounded-full blur-[120px] mix-blend-multiply animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-orange-200/30 rounded-full blur-[120px] mix-blend-multiply animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={isInView ? { opacity: 1, y: 0 } : {}}
             transition={{ duration: 0.6 }}
           >
             <span className="inline-block py-1 px-4 rounded-full bg-white border border-slate-200 text-[#1E9CD7] font-bold tracking-widest uppercase text-xs mb-6 shadow-sm">
               Why Choose Us
             </span>
             <h2 className="text-4xl lg:text-6xl font-extrabold text-slate-900 tracking-tight">
               The Pillars of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E9CD7] to-[#FE861B]">FrontierWox</span>
             </h2>
             <p className="mt-6 text-lg text-slate-500 max-w-2xl mx-auto">
               Foundationally strong, strategically driven, and technically advanced. 
               We are built to support your growth.
             </p>
           </motion.div>
        </div>

        {/* Cards Grid */}
        <motion.div 
          variants={containerVars}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {pillars.map((item, i) => (
            <motion.div
              key={i}
              variants={cardVars}
              whileHover={{ y: -12, scale: 1.02 }}
              className="group relative bg-white p-8 rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 cursor-default overflow-hidden"
            >
              {/* Hover Gradient Border Effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#1E9CD7]/10 rounded-[2rem] transition-colors duration-500 pointer-events-none" />
              
              {/* Subtle Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

              {/* Icon Container */}
              <div className={`w-16 h-16 mb-8 rounded-2xl flex items-center justify-center bg-slate-50 group-hover:bg-gradient-to-br group-hover:from-[#1E9CD7] group-hover:to-[#FE861B] transition-all duration-500 shadow-sm group-hover:shadow-lg group-hover:shadow-orange-500/30`}>
                <item.icon 
                  className={`w-8 h-8 ${item.color} group-hover:text-white transition-colors duration-500 transform group-hover:scale-110 group-hover:rotate-3`} 
                  strokeWidth={1.5}
                />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-[#1E9CD7] transition-colors duration-300">
                {item.title}
              </h3>
              
              <p className="text-slate-500 text-base leading-relaxed mb-6">
                {item.desc}
              </p>

              {/* Interactive Line at Bottom */}
              <div className="w-full h-[2px] bg-slate-100 mt-auto relative overflow-hidden rounded-full">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#1E9CD7] to-[#FE861B] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}