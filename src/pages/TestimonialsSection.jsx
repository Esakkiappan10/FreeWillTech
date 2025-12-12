import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Quote, ChevronLeft, ChevronRight, Star, 
  Trophy, Users, CheckCircle, Sparkles 
} from "lucide-react";

const testimonials = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  image: `/testimonials/testimonials${i + 1}.jpg`,
  role: "Web Developer",
  rating: 5,
}));

// --- STATS DATA ---
const stats = [
  { label: "Interns Trained", value: "15+", icon: Users, color: "blue" },
  { label: "Skills Developed", value: "10+", icon: Users, color: "orange" },
];

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(0);

  // --- LOGIC ---
  const paginate = useCallback((newDirection) => {
    setDirection(newDirection);
    setIndex((prev) => (prev + newDirection + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => paginate(1), 5000);
    return () => clearInterval(timer);
  }, [isPaused, paginate]);

  // Handle Drag
  const handleDragEnd = (e, { offset, velocity }) => {
    const swipe = offset.x;
    if (swipe < -50 || velocity.x < -500) paginate(1);
    else if (swipe > 50 || velocity.x > 500) paginate(-1);
  };

  // Get visible indices
  const getIndex = (offset) => (index + offset + testimonials.length) % testimonials.length;

  return (
    <section 
      className="relative py-24 bg-white font-sans overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* --- BACKGROUND FX --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-100/40 blur-[120px] rounded-full mix-blend-multiply opacity-60 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-100/40 blur-[120px] rounded-full mix-blend-multiply opacity-60 animate-pulse delay-700" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* --- HEADER & STATS SPLIT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-20">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-widest mb-6"
            >
              <Sparkles size={12} className="text-orange-500" />
              <span>Wall of Excellence</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-4"
            >
              Real Stories. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-500">
                Real Transformation.
              </span>
            </motion.h2>
            
            <p className="text-lg text-slate-500 max-w-lg leading-relaxed">
              Discover how <span className="font-bold text-slate-900">FrontierWox Tech</span> shapes careers. From interns to full-stack engineers, hear it from the people who lived it.
            </p>
          </div>

          {/* Stats Row to fill whitespace */}
         <div className="grid grid-cols-2 gap-4">
  {stats.map((stat, i) => (
    <motion.div 
      key={i}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.1 }}
      className="bg-white/60 backdrop-blur-sm border border-slate-200 py-6 px-4 rounded-2xl text-center shadow-sm"
    >

      {/* ICON — special Star icon only for 2nd item */}
      <div 
        className={`mx-auto w-10 h-10 rounded-full flex items-center justify-center mb-2 
          bg-${stat.color}-50 text-${stat.color}-600`}
      >
        {i === 1 ? (
          <Star size={20} className="text-yellow-500" />
        ) : (
          <stat.icon size={20} />
        )}
      </div>

      {/* VALUE */}
      <div className="text-xl md:text-2xl font-bold text-slate-900">
        {stat.value}
      </div>

      {/* LABEL */}
      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
        {stat.label}
      </div>

    </motion.div>
  ))}
</div>
        </div>

        {/* --- 3D CAROUSEL --- */}
        <div className="relative w-full h-[550px] md:h-[600px] flex items-center justify-center perspective-[1000px]">
          <AnimatePresence initial={false} mode="popLayout" custom={direction}>
            {[-1, 0, 1].map((offset) => {
              const itemIndex = getIndex(offset);
              const item = testimonials[itemIndex];
              const isActive = offset === 0;

              return (
                <Card 
                  key={`${item.id}-${index}`} // Unique key for seamless loop
                  item={item}
                  isActive={isActive}
                  offset={offset}
                  onDragEnd={handleDragEnd}
                />
              );
            })}
          </AnimatePresence>

           {/* Navigation Buttons (Floating) */}
           <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between items-center px-2 md:px-0 pointer-events-none z-50 max-w-4xl mx-auto w-full">
            <button 
              onClick={() => paginate(-1)}
              className="pointer-events-auto w-12 h-12 rounded-full bg-white border border-slate-200 shadow-xl text-slate-700 flex items-center justify-center hover:scale-110 hover:border-blue-500 hover:text-blue-600 transition-all active:scale-95 group"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button 
              onClick={() => paginate(1)}
              className="pointer-events-auto w-12 h-12 rounded-full bg-white border border-slate-200 shadow-xl text-slate-700 flex items-center justify-center hover:scale-110 hover:border-orange-500 hover:text-orange-600 transition-all active:scale-95 group"
            >
              <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* --- BOTTOM PROGRESS --- */}
        <div className="mt-8 flex justify-center items-center gap-2">
            {testimonials.map((_, i) => (
                <button
                    key={i}
                    onClick={() => {
                        setDirection(i > index ? 1 : -1);
                        setIndex(i);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                        i === index ? "w-10 bg-slate-800" : "w-2 bg-slate-300 hover:bg-slate-400"
                    }`}
                />
            ))}
        </div>

      </div>
    </section>
  );
}

// --- CARD COMPONENT ---
const Card = ({ item, isActive, offset, onDragEnd }) => {
  // 3D Variants
  const variants = {
    center: {
      x: 0,
      scale: 1,
      opacity: 1,
      zIndex: 20,
      rotateY: 0,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    left: {
      x: -320, // Push left
      scale: 0.85,
      opacity: 0.6,
      zIndex: 10,
      rotateY: 15, // Tilt inward
      filter: "blur(2px)",
      transition: { duration: 0.5 }
    },
    right: {
      x: 320, // Push right
      scale: 0.85,
      opacity: 0.6,
      zIndex: 10,
      rotateY: -15, // Tilt inward
      filter: "blur(2px)",
      transition: { duration: 0.5 }
    },
    enter: (direction) => ({
      x: direction > 0 ? 320 : -320,
      opacity: 0,
      scale: 0.5,
      zIndex: 0
    }),
    exit: (direction) => ({
      x: direction < 0 ? 320 : -320,
      opacity: 0,
      scale: 0.5,
      zIndex: 0
    })
  };

  const position = offset === 0 ? "center" : offset === -1 ? "left" : "right";

  return (
    <motion.div
      layout
      variants={variants}
      initial="enter"
      animate={position}
      exit="exit"
      custom={offset}
      drag={isActive ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={onDragEnd}
      className={`
        absolute 
        w-[300px] sm:w-[360px] md:w-[400px] 
        aspect-[3/4] 
        rounded-[2.5rem] 
        shadow-[0_20px_60px_-10px_rgba(0,0,0,0.2)] 
        bg-white border border-white/20 overflow-hidden
        ${isActive ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'}
      `}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* --- IMAGE --- */}
      <div className="absolute inset-0 h-full w-full">
        <img 
          src={item.image} 
          alt={item.name} 
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
          draggable={false}
        />
        {/* Gradient Mesh Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90" />
      </div>

      {/* --- CONTENT --- */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 text-white z-20">
        
        {/* Top Badge (Only visible on active) */}
        {isActive && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-6 left-6 flex gap-2"
          >
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider border border-white/10">
              {item.program}
            </span>
          </motion.div>
        )}

        <div className="h-px w-full bg-white/20 mb-6" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="flex flex-col">
                <h4 className="text-xl font-bold">{item.name}</h4>
                <span className="text-sm text-blue-300 font-semibold">{item.role}</span>
             </div>
          </div>
          <div className="flex gap-1">
             {[...Array(item.rating)].map((_, i) => (
               <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
             ))}
          </div>
        </div>

        {/* Progress Bar (Visual) */}
        {isActive && (
           <motion.div 
             className="absolute bottom-0 left-0 h-1.5 bg-gradient-to-r from-orange-500 to-blue-600"
             initial={{ width: "0%" }}
             animate={{ width: "100%" }}
             transition={{ duration: 5, ease: "linear" }}
           />
        )}
      </div>
    </motion.div>
  );
};