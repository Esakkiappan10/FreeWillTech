import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

export default function VisionOSGlassCard({ children, className = "" }) {
  const ref = useRef(null);

  // 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-50, 50], [12, -12]);
  const rotateY = useTransform(x, [-50, 50], [-12, 12]);

  /* ----------------------------------
     AUTO TILT ANIMATION (subtle)
  ---------------------------------- */
  useEffect(() => {
    const rotX = animate(x, 20, {
      duration: 5,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    });

    const rotY = animate(y, -15, {
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    });

    return () => {
      rotX.stop();
      rotY.stop();
    };
  }, []);

  /* ----------------------------------
     MOUSE OVERRIDE
  ------------------------------------ */
  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - (rect.left + rect.width / 2));
    y.set(e.clientY - (rect.top + rect.height / 2));
  };

  const resetTilt = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative rounded-[28px] p-[2px] ${className}`}
      style={{ rotateX, rotateY }}
      onMouseMove={handleMove}
      onMouseLeave={resetTilt}
    >
      {/* ===========================
          ORANGE → BLUE GRADIENT RIM
         =========================== */}
      <div
        className="absolute -inset-px rounded-[30px] pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,128,45,0.35), rgba(30,144,213,0.35))",
          filter: "blur(12px)",
        }}
      />

      {/* ===========================
          OUTER GLOW
      ============================ */}
      <div
        className="absolute -inset-1 rounded-[30px] pointer-events-none"
        style={{
          boxShadow:
            "0 18px 45px rgba(30,144,213,0.15), 0 25px 65px rgba(255,128,45,0.12)",
        }}
      />

      {/* ===========================
          FLOATING ORBS (orange + blue)
      ============================ */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(14)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-[5px] h-[5px] rounded-full blur-[3px]"
            style={{
              background:
                Math.random() > 0.5
                  ? "rgba(255,128,45,0.55)" // orange particle
                  : "rgba(30,144,213,0.55)", // blue particle
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: ["0%", "-35%"],
              opacity: [0.15, 0.9, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* ===========================
          GLASS REFLECTION SWEEP
      ============================ */}
      <motion.div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,128,45,0.4), rgba(30,144,213,0.4), transparent)",
        }}
        animate={{ x: ["-150%", "150%"] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "easeInOut",
        }}
      />

      {/* ===========================
         MAIN DARK GLASS SURFACE
      ============================ */}
      <div
        className="
          relative z-10 
          bg-black/20
          backdrop-blur-2xl 
          border border-white/10 
          rounded-[26px]
          shadow-[0_12px_40px_rgba(0,0,0,0.35)]
        "
      >
        {children}
      </div>
    </motion.div>
  );
}
