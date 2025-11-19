import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

export default function VisionOSGlassCard({ children, className = "" }) {
  const ref = useRef(null);

  // Motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // 3D tilt transform
  const rotateX = useTransform(y, [-50, 50], [12, -12]);
  const rotateY = useTransform(x, [-50, 50], [-12, 12]);

  // Auto tilt animation
  useEffect(() => {
    const controlsX = animate(x, 20, {
      duration: 5,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    });

    const controlsY = animate(y, -15, {
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    });

    return () => {
      controlsX.stop();
      controlsY.stop();
    };
  }, [x, y]);

  // Mouse override
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
      {/* Outer Glow */}
      <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-white/10 to-white/5 pointer-events-none"></div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(14)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-[4px] h-[4px] bg-white/40 rounded-full blur-[2px]"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: ["0%", "-35%"],
              opacity: [0.1, 0.7, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Glass Reflection Sweep */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-30"
        animate={{ x: ["-150%", "150%"] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "easeInOut",
        }}
      />

      {/* MAIN DARK GLASS */}
      <div
        className="
        relative z-10 
        bg-black/55 
        backdrop-blur-2xl 
        border border-white/15 
        rounded-[26px] 
        shadow-[0_12px_40px_rgba(0,0,0,0.25)]
      "
      >
        {children}
      </div>
    </motion.div>
  );
}
