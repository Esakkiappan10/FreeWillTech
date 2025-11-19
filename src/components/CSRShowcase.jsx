import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

export default function CSRShowcase() {
  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  const images = Array.from({ length: 10 }, (_, i) => `/csr/csr${i + 1}.jpg`);
  const [index, setIndex] = useState(0);
  const sliderRef = useRef(null);

  // Auto Slide
  useEffect(() => {
    const timer = setInterval(
      () => setIndex((prev) => (prev + 1) % images.length),
      4500
    );
    return () => clearInterval(timer);
  }, [images.length]);

  const handleDragEnd = (_, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -60 || velocity < -500)
      setIndex((prev) => (prev + 1) % images.length);
    else if (offset > 60 || velocity > 500)
      setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="w-[94%] md:w-[90%] lg:w-[85%] mx-auto py-20 font-[Nunito] relative">

      {/* Soft Ambient Glows */}
      <div className="absolute top-0 -left-20 w-[260px] h-[260px] bg-emerald-200/15 blur-[140px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 -right-20 w-[260px] h-[260px] bg-blue-300/10 blur-[150px] rounded-full pointer-events-none"></div>

      {/* CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

        {/* LEFT TEXT BLOCK */}
        <div data-aos="fade-right">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-600 leading-tight">
            Cyber Crime Awareness Drive
          </h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 120 }}
            transition={{ duration: 0.8 }}
            className="h-[4px] mt-3 bg-gradient-to-r from-green-600 to-emerald-500 rounded-full"
          />

          <p className="text-slate-600 mt-6 leading-relaxed text-[16px] md:text-[17px] max-w-xl">
            <span className="text-orange-500">Free Will Technologies </span>, in collaboration with the 
            <span className="font-semibold text-slate-900">
              {" "}PG & Research Department of Computer Science
            </span>{" "}
            at St. Joseph’s College (Autonomous), Tiruchirappalli,
            conducted a Cyber Crime Awareness Program on
            <span className="font-semibold text-green-700"> 30 September 2025</span>.
            <br /><br />
            The event educated the community on recognizing online fraud,
            safe internet practices, and the official cybercrime helpline —
            <span className="font-semibold text-emerald-700"> Dial 1930</span>.
            <br /><br />
            Real-life demonstrations and practical awareness sessions helped
            participants strengthen their digital safety skills.
          </p>

          <div className="mt-6 flex items-center gap-8 text-green-700 font-semibold text-[15px]">
            <span className="flex items-center gap-2">📅 30-09-2025</span>
            <span className="flex items-center gap-2">📍 Tiruchirappalli</span>
          </div>
        </div>

        {/* RIGHT IMAGE SLIDER */}
        <div data-aos="fade-left" className="py-12 flex justify-center lg:justify-end w-full">
          <div
            className="
              w-[90%] sm:w-[75%] md:w-[70%] lg:w-[90%] 
              aspect-[4/3] 
              rounded-3xl 
              shadow-[0_25px_80px_rgba(0,0,0,0.08)]
              overflow-hidden 
              bg-white/70 
              backdrop-blur-xl 
              border border-slate-200
            "
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={index}
                src={images[index]}
                alt={`CSR ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover rounded-3xl"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.55 }}
              />
            </AnimatePresence>

            <motion.div
              ref={sliderRef}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
            />
          </div>
        </div>

      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-6 gap-3">
        {images.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setIndex(i)}
            whileHover={{ scale: 1.2 }}
            className={`w-3 h-3 rounded-full transition-all ${
              i === index
                ? "bg-green-600 scale-125 shadow-md shadow-green-400/50"
                : "bg-gray-300"
            }`}
          />
        ))}
      </div>

    </section>
  );
}
