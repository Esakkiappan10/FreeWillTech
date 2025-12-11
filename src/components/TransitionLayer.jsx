import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * NEXT-GEN TRANSITION LAYER
 * Style: Vertical Column Stagger (Shutter Effect)
 * Performance: GPU-accelerated (Transform only)
 * Compatibility: Mobile, Desktop, Tablet
 */

// Configuration for the columns
const COLUMN_COUNT = 5;

// Animation Variants
const anim = {
  initial: {
    y: "100%",
  },
  enter: (i) => ({
    y: "0%",
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1], // Custom Bezier for "Snap" feel
      delay: 0.05 * i, // Stagger effect
    },
  }),
  exit: (i) => ({
    y: "-100%",
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.05 * i,
    },
  }),
};

const textAnim = {
  initial: { opacity: 0 },
  enter: { 
    opacity: 1, 
    transition: { duration: 0.3, delay: 0.3 } 
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2 } 
  }
};

export default function TransitionLayer({ active }) {
  const [isActive, setIsActive] = useState(active);

  // Sync internal state to ensure exit animations play fully
  useEffect(() => {
    if (active) {
      setIsActive(true);
    } else {
      // Small delay to allow exit animation to trigger visually
      const timer = setTimeout(() => setIsActive(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [active]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[9999] pointer-events-none flex flex-col"
    >
      {/* We render the columns always, but animate them based on 'active' prop.
         AnimatePresence handles the mounting/unmounting logic if you prefer,
         but keeping them mounted and transforming is more performant for route swaps.
      */}
      <AnimatePresence mode="wait">
        {active && (
          <>
            {/* 1. THE GRID COLUMNS (The main visual wipe) */}
            <div className="absolute inset-0 flex h-full w-full">
              {[...Array(COLUMN_COUNT)].map((_, i) => (
                <motion.div
                  key={i}
                  variants={anim}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                  custom={i}
                  className="relative h-full w-full bg-slate-900 border-r border-slate-800/50 last:border-r-0"
                >
                  {/* Subtle accent line at the bottom of each column */}
                  <div className="absolute bottom-0 left-0 w-full h-2 bg-[#FE861B]" />
                </motion.div>
              ))}
            </div>

            {/* 2. CENTER LOADER (Brand Pulse) */}
            <motion.div 
              variants={textAnim}
              initial="initial"
              animate="enter"
              exit="exit"
              className="absolute inset-0 flex items-center justify-center z-50"
            >
              <div className="flex flex-col items-center gap-4">
                {/* Modern Spinner */}
                <div className="w-12 h-12 border-4 border-slate-800 border-t-[#FE861B] rounded-full animate-spin" />
                
                {/* Brand Text */}
                <span className="text-white font-bold text-2xl tracking-widest uppercase font-sans">
                  Frontier Wox Tech
                </span>
              </div>
            </motion.div>

            {/* 3. BACKGROUND BACKDROP (Safety layer to hide page glitch) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-slate-900 -z-10"
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}