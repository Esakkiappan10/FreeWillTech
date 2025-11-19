import React from "react";
import { Users, Shield, Code, Clock } from "lucide-react";
import { motion } from "framer-motion";

const whoWeAre = [
  {
    title: "Our Team",
    description:
      "Customer-focused professionals delivering exceptional service and support.",
    icon: Users,
    color: "#1E9CD7", // Blue
  },
  {
    title: "Our Leadership",
    description:
      "Experienced leaders guiding our vision, innovation, and long-term strategy.",
    icon: Shield,
    color: "#FE861B", // Orange
  },
  {
    title: "Our Developers",
    description:
      "Talented engineers building scalable and reliable digital solutions.",
    icon: Code,
    color: "#1E9CD7", // Blue
  },
  {
    title: "Our Support Staff",
    description:
      "Dedicated assistance ensuring smooth 24/7 operations for every client.",
    icon: Clock,
    color: "#FE861B", // Orange
  },
];

/* Animations */
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const cardAnim = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

export default function Offer() {
  return (
    <section className="w-[95%] lg:w-[85%] mx-auto py-20 lg:py-28 font-[Nunito] relative">

      {/* Section Header */}
      <div className="text-center mb-14 relative z-[5]">
        <p className="text-primary font-bold tracking-wide mb-3 uppercase">
          WE OFFER BEST IT SERVICES
        </p>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-orange-500 mb-6">
          Who We Are
        </h1>

        <div className="mx-auto h-1 w-28 bg-gradient-to-r from-[#dc8d04] to-[#FE861B] rounded-full shadow-md" />
      </div>

      {/* Cards */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-[5]"
      >
        {whoWeAre.map((card, i) => {
          const Icon = card.icon;

          return (
            <motion.div
              key={i}
              variants={cardAnim}
              whileHover={{
                scale: 1.06,
                rotateX: 4,
                rotateY: -4,
                boxShadow: "0px 18px 35px rgba(0,0,0,0.13)",
              }}
              transition={{ type: "spring", stiffness: 170, damping: 14 }}
              className="group bg-white/90 backdrop-blur-xl border border-slate-200 rounded-2xl p-8 text-center shadow-md hover:border-[#1E9CD7]/40 transition-all duration-300 transform-gpu"
            >
              {/* Icon Bubble */}
              <div
                className="flex justify-center items-center w-16 h-16 rounded-full mx-auto mb-5 shadow-inner"
                style={{ background: `${card.color}20` }}
              >
                <Icon
                  className="w-10 h-10"
                  style={{ color: card.color }}
                />
              </div>

              {/* Title */}
              <h3
                className="text-lg md:text-xl font-bold group-hover:text-transparent group-hover:bg-clip-text 
                group-hover:bg-gradient-to-r group-hover:from-[#1E9CD7] group-hover:to-[#FE861B] transition mb-3"
              >
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
