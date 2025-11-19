import React, { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function ServiceHeroSections() {
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  /* Magnetic Hover CTA */
  const useMagnetic = () => {
    const ref = useRef(null);
    useEffect(() => {
      const el = ref.current;
      if (!el) return;

      const strength = 30;

      const move = (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        el.style.transform = `translate(${x / strength}px, ${y / strength}px)`;
      };

      const reset = () => (el.style.transform = "translate(0,0)");

      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", reset);

      return () => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", reset);
      };
    }, []);
    return ref;
  };

  /* 3D Parallax Image */
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [10, -10]);
  const rotateY = useTransform(x, [-50, 50], [-10, 10]);

  const handleTilt = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - (rect.left + rect.width / 2));
    y.set(e.clientY - (rect.top + rect.height / 2));
  };

  const resetTilt = () => {
    x.set(0);
    y.set(0);
  };

  const ctaRef = useMagnetic();

  return (
    <section className="relative w-[95%] lg:w-[85%] mx-auto py-20 lg:py-24 font-[Nunito] overflow-hidden">
      
      {/* Ambient Glowing Blobs */}
      <div className="absolute -top-20 -left-10 w-[300px] h-[300px] bg-primary/15 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 -right-10 w-[280px] h-[280px] bg-secondary/20 blur-[130px] rounded-full"></div>

      {/* GRID */}
      <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 lg:gap-20 items-center relative z-[2]">

        {/* LEFT — IMAGE WITH DEPTH */}
        <motion.div
          className="relative flex justify-center items-center"
          data-aos="fade-right"
        >
          <motion.div
            onMouseMove={handleTilt}
            onMouseLeave={resetTilt}
            style={{ rotateX, rotateY }}
            className="
              relative bg-white/15 backdrop-blur-xl 
              p-3 rounded-3xl border border-white/20 
              shadow-[0_20px_60px_rgba(0,0,0,0.1)]
              transform-gpu
            "
          >
            <img
              src="/service.png"
              alt="Service Illustration"
              className="rounded-2xl shadow-2xl w-[90%] sm:w-[80%] lg:w-[420px] object-cover"
            />
          </motion.div>

          {/* Background Soft Layer */}
          <div className="absolute inset-0 -z-10 hidden xl:block opacity-30 blur-lg scale-110">
            <img
              src="/service.png"
              className="w-full h-full rounded-3xl object-cover"
              alt=""
            />
          </div>

          {/* Accent Lights */}
          <div className="absolute -bottom-16 -right-12 w-[210px] h-[210px] bg-primary/30 blur-[100px] rounded-full"></div>
          <div className="absolute top-10 -left-16 w-[220px] h-[220px] bg-blue-300/20 blur-[120px] rounded-full"></div>
        </motion.div>

        {/* RIGHT — TEXT */}
        <div
          className="relative z-[3] bg-white/40 backdrop-blur-xl p-8 sm:p-10 lg:p-0 lg:bg-transparent lg:backdrop-blur-none"
          data-aos="fade-left"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-orange-600 leading-relaxed mb-4">
            Empowering Ideas with Modern Digital Innovation
          </h2>

          <p className="text-gray-700 text-lg leading-relaxed mb-5">
            At{" "}
            <span className="font-semibold text-primary">Free Will Technologies</span>,  
            we craft world-class digital solutions that elevate brands and empower growth.
          </p>

          <p className="text-gray-700 text-lg leading-relaxed mb-5">
            From
            <span className="font-semibold text-primary-dark"> custom web apps </span>,
            <span className="font-semibold text-primary-dark"> full-stack development </span>,
            <span className="font-semibold text-primary-dark"> CMS platforms </span>,
            <span className="font-semibold text-primary-dark"> business portfolios </span>,
            to  
            <span className="font-semibold text-primary-dark"> mobile apps </span>,  
            we create high-value digital ecosystems that grow with your business.
          </p>

          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            Our creative wing also delivers premium  
            <span className="font-semibold text-primary-dark"> branding and graphic design </span>  
            that gives your identity a visually unforgettable presence.
          </p>

          <motion.a
            ref={ctaRef}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/contact"
            className="
              inline-block bg-blue-600 text-white font-semibold 
              py-3.5 px-8 rounded-xl shadow-md 
              hover:shadow-2xl transition-all duration-300
            "
          >
            Contact Us
          </motion.a>
        </div>
      </div>
    </section>
  );
}
