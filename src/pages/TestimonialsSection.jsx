import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const TestimonialsSection = () => {
  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  const testimonials = Array.from({ length: 15 }, (_, i) => ({
    image: `/testimonials/testimonials${i + 1}.jpg`,
  }));

  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);

  // Auto-slide every 4.5s
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Handle drag/swipe
  const handleDragEnd = (e, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    if (offset < -50 || velocity < -500)
      setIndex((prev) => (prev + 1) % testimonials.length);
    else if (offset > 50 || velocity > 500)
      setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Compute 3 visible items: previous, current, next
  const visibleIndexes = [
    (index - 1 + testimonials.length) % testimonials.length,
    index,
    (index + 1) % testimonials.length,
  ];

  return (
   <section className="relative py-20 px-4 sm:px-8 lg:px-[8%] bg-white font-[Nunito] overflow-hidden">
      {/* Soft White Glow Background */}
      <div className="absolute top-10 left-10 w-60 h-60 bg-gray-200/20 rounded-full blur-[120px] opacity-40"></div>
      <div className="absolute bottom-10 right-10 w-60 h-60 bg-gray-300/20 rounded-full blur-[130px] opacity-40"></div>

      {/* Header */}
      <div className="relative z-10 text-center mb-10" data-aos="fade-up">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary-dark tracking-tight"
        >
          Our Moments & Memories
        </motion.h2>

        <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed">
          What our interns, trainees, and partners share about their experience at{" "}
          <span className="font-bold text-orange-500">Free Will Technologies</span>.
          A gallery of real stories, real journeys, and real growth.
        </p>

        <p className="text-gray-500 mt-2 max-w-xl mx-auto text-xs sm:text-sm md:text-base italic">
          “Empowering learning, inspiring careers, and creating unforgettable moments.”
        </p>

        <div className="mx-auto mt-6 h-1 w-20 bg-secondary rounded-full"></div>
      </div>


      {/* 3-Image Carousel */}
      <div className="relative z-10 w-full flex justify-center overflow-hidden max-w-6xl mx-auto">
        <div className="relative flex justify-center items-center w-full h-[400px] sm:h-[450px]">
          <AnimatePresence mode="wait">
            {visibleIndexes.map((i, position) => {
              const isActive = i === index;
              const offset = position - 1; // -1 = left, 0 = center, 1 = right

              return (
                <motion.img
                  key={i}
                  src={testimonials[i].image}
                  alt={`testimonial-${i + 1}`}
                  className="absolute rounded-3xl shadow-xl border border-gray-200 object-contain bg-white/90 backdrop-blur-md"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    x: offset * 300,
                    opacity: isActive ? 1 : 0.4,
                    scale: isActive ? 1 : 0.9,
                    zIndex: isActive ? 2 : 1,
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  style={{
                    width: "60%",
                    height: "100%",
                  }}
                  draggable={false}
                />
              );
            })}
          </AnimatePresence>

          {/* Drag Layer */}
          <motion.div
            ref={containerRef}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
          />
        </div>
      </div>

      {/* Dots Navigation (3 visible, transparent edges) */}
      <div className="relative z-10 flex justify-center mt-8 overflow-hidden">
        <div className="relative w-[120px] flex justify-center items-center">
          {testimonials.map((_, i) => {
            const distance = Math.abs(i - index);
            const opacity =
              distance === 0 ? 1 : distance === 1 ? 0.5 : 0.15; // fade sides
            const visible =
              distance <= 1 ||
              (index === 0 && i === testimonials.length - 1) ||
              (index === testimonials.length - 1 && i === 0);

            return (
              visible && (
                <motion.button
                  key={i}
                  onClick={() => setIndex(i)}
                  className="mx-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div
                    className={`w-3 h-3 rounded-full transition-all duration-500 ${
                      i === index ? "bg-secondary" : "bg-gray-300"
                    }`}
                    style={{ opacity }}
                  />
                </motion.button>
              )
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
