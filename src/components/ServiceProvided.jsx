import React, { useRef } from "react";
import {
  Code,
  Palette,
  MonitorSmartphone,
  Layers,
  LayoutDashboard,
  Globe,
} from "lucide-react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

const services = [
  {
    icon: LayoutDashboard,
    title: "Web Design",
    description:
      "Visually stunning, user-centered interfaces crafted with precision and brand elegance.",
  },
  {
    icon: Code,
    title: "Web Development",
    description:
      "High-performance, scalable, SEO-ready websites built with cutting-edge technology.",
  },
  {
    icon: Palette,
    title: "Graphic Design",
    description:
      "Impactful branding, marketing assets, and creative visuals that make your identity unforgettable.",
  },
  {
    icon: MonitorSmartphone,
    title: "App Development",
    description:
      "Beautifully crafted mobile apps for Android & iOS with superior user experience.",
  },
  {
    icon: Layers,
    title: "CMS Development",
    description:
      "Flexible and intelligent CMS platforms enabling seamless content control and growth.",
  },
  {
    icon: Globe,
    title: "Business Portfolio Sites",
    description:
      "High-impact portfolio sites that boost credibility and drive engagement.",
  },
];

/* VisionOS 3D Glass Card — Darker Glass Variant */
const VisionCard = ({ children }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-50, 50], [10, -10]);
  const rotateY = useTransform(x, [-50, 50], [-10, 10]);

  // Auto floating animation
  React.useEffect(() => {
    const controlX = animate(x, 18, {
      duration: 4.6,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    });

    const controlY = animate(y, -12, {
      duration: 5.4,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    });

    return () => {
      controlX.stop();
      controlY.stop();
    };
  }, [x, y]);

  const handleMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - (rect.left + rect.width / 2));
    y.set(e.clientY - (rect.top + rect.height / 2));
  };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY }}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileHover={{ scale: 1.025 }}
      className="relative rounded-[26px] p-[2px] transition-transform will-change-transform"
    >
      {/* Outer subtle rim (very soft) */}
      <div className="absolute inset-0 rounded-[26px] bg-gradient-to-br from-white/6 to-white/2 pointer-events-none" />

      {/* Floating particles (slightly brighter for contrast on darker glass) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-[4px] h-[4px] bg-white/30 rounded-full blur-[3px]"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `scale(${0.8 + Math.random() * 0.8})`,
            }}
            animate={{
              y: ["0%", "-38%"],
              opacity: [0.15, 0.7, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Reflection sweep — reduced intensity for darker glass */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/16 to-transparent opacity-30 pointer-events-none"
        animate={{ x: ["-120%", "120%"] }}
        transition={{
          duration: 3.6,
          repeat: Infinity,
          repeatDelay: 2.2,
          ease: "easeInOut",
        }}
      />

      {/* Dark Glass Surface */}
      <div
        className="
          relative z-10
          bg-black/40
          backdrop-blur-3xl
          border border-white/8
          rounded-[24px]
          shadow-[0_18px_60px_rgba(2,6,23,0.42)]
          p-8
          min-h-[280px]
        "
      >
        {children}
      </div>
    </motion.div>
  );
};

export default function ServiceProvided() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden font-[Nunito]">
      {/* Background glows */}
      <div className="absolute top-10 -left-20 w-[320px] h-[320px] bg-primary/12 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-[340px] h-[340px] bg-purple-300/18 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-[8%] relative z-[2]">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-semibold tracking-wide">WHAT WE PROVIDE</p>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mt-2">
            Our Professional Services
          </h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 88 }}
            transition={{ duration: 0.8 }}
            className="mx-auto mt-4 h-[4px] bg-gradient-to-r from-primary to-blue-600 rounded-full"
          />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <VisionCard key={i}>
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    className="w-16 h-16 rounded-full bg-white/6 flex items-center justify-center shadow-inner"
                  >
                    <Icon size={34} className="text-primary" />
                  </motion.div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white text-center mb-3">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-200 text-center text-sm md:text-base leading-relaxed">
                  {service.description}
                </p>
              </VisionCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
