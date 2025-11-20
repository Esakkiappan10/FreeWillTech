// AboutCompany.jsx — Two-Column Layout + Option C Mockups + Premium Fonts + Icons
import React, { useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  Code2,
  Smartphone,
  Cpu,
  Palette,
  Cloud,
  Layers,
  CheckCircle,
} from "lucide-react";

// ICON MAP (each service gets the right icon)
const iconMap = {
  "Web Applications": Code2,
  "Mobile Apps": Smartphone,
  "AI & Automation": Cpu,
  "UI / UX Design": Palette,
  "Cloud & DevOps": Cloud,
  "SaaS Products": Layers,
};

const services = [
  { title: "Web Applications", desc: "Robust, scalable web apps built with modern stacks." },
  { title: "Mobile Apps", desc: "Cross-platform native-like experiences that delight users." },
  { title: "AI & Automation", desc: "Intelligent automation and ML-driven features." },
  { title: "UI / UX Design", desc: "Human-centered design, rapid prototyping, and testing." },
  { title: "Cloud & DevOps", desc: "Reliable cloud infra, CI/CD and cost optimization." },
  { title: "SaaS Products", desc: "Product thinking + engineering to launch fast and scale." },
];

const container = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.1, when: "beforeChildren" },
  },
};

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function AboutCompany() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const controls = useAnimation();

  if (inView) controls.start("show");

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 px-6 lg:px-12 bg-gradient-to-b from-white to-slate-50 overflow-hidden font-body"
    >
      {/* Soft Ambient Glows */}
      <div className="absolute -left-20 top-0 w-[350px] h-[350px] bg-[#1E9CD7]/15 rounded-full blur-[110px] -z-10" />
      <div className="absolute -right-20 bottom-0 w-[420px] h-[420px] bg-[#FE861B]/20 rounded-full blur-[140px] -z-10" />

      <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start relative z-10">

        {/* LEFT COLUMN */}
        <motion.div variants={container} initial="hidden" animate={controls} className="space-y-6">

          <motion.p
            variants={item}
            className="text-[#FE861B] text-6xl font-heading font-extrabold tracking-tight"
          >
            About Free Will
          </motion.p>

          <motion.h2
            variants={item}
            className="text-3xl lg:text-[40px] font-heading font-bold leading-tight 
            bg-gradient-to-r from-[#1E9CD7] to-[#FE861B] text-transparent bg-clip-text"
          >
            Crafting modern digital products with precision & scalability.
          </motion.h2>

          <motion.p variants={item} className="text-slate-700 text-xl leading-relaxed max-w-md font-body">
            We blend engineering excellence, product thinking, and elegant design to build systems
            that perform reliably at scale. From idea to launch — and beyond — we deliver solutions
            that accelerate growth and create real-world impact.
          </motion.p>

          <motion.p variants={item} className="text-slate-700 text-xl leading-relaxed max-w-lg font-body">
            <strong className="text-[#FE861B] font-heading">Empowering Innovation. Enabling the Future.</strong>
            We build intelligent web apps, mobile apps, automation solutions, and help startups grow
            with the right technology strategy.
          </motion.p>

          <motion.p variants={item} className="text-slate-700 text-xl leading-relaxed max-w-lg font-body">
            We also bridge education and innovation — training teams, supporting creators,
            and helping organizations evolve in the digital era.
          </motion.p>

          <motion.p variants={item} className="text-orange-500 text-xl font-bold leading-relaxed max-w-lg font-heading">
            We believe in the power of “free will” — the freedom to think, build, and innovate without limits.
          </motion.p>

          {/* CTA */}
          <motion.div variants={item} className="flex gap-4 pt-3 font-alt">
            <a
              href="/contact"
              className="px-6 py-3 bg-[#FE861B] text-white rounded-xl font-semibold shadow-md 
              hover:shadow-xl hover:-translate-y-0.5 transition"
            >
              Contact Us
            </a>
            <a href="/service" className="py-3 text-[#1E9CD7] hover:text-[#FE861B] font-semibold">
              Explore services →
            </a>
          </motion.div>
        </motion.div>

        {/* RIGHT GRID OF CARDS */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-body"
        >
          {services.map((svc, idx) => {
            const Icon = iconMap[svc.title];
            return (
              <motion.div
                key={idx}
                variants={item}
                whileHover={{ scale: 1.03, translateY: -6 }}
                transition={{ type: "spring", stiffness: 150, damping: 18 }}
                className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 
                hover:shadow-2xl transition-all group"
              >
                {/* Soft 3D Mockup Box */}
                <div className="relative mb-4 w-full h-[140px] rounded-xl overflow-hidden shadow-sm bg-white">

                  {/* Gradient BG */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#E5F5FF] via-[#FFF8F2] to-white" />

                  {/* Gradient Accent Card */}
                  <div className="absolute right-4 bottom-4 w-[90px] h-[60px] rounded-lg 
                  bg-gradient-to-br from-[#1E9CD7] to-[#FE861B] opacity-90 shadow-md flex items-center justify-center">
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Icon Badge */}
                  <div className="absolute left-4 top-4 w-8 h-8 bg-white rounded-xl shadow flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-[#1E9CD7]" />
                  </div>
                </div>

                <h4 className="font-heading font-semibold text-blue-500 group-hover:text-[#1E9CD7] transition text-lg">
                  {svc.title}
                </h4>

                <p className="text-slate-600 text-sm mt-1 font-body">{svc.desc}</p>

                <div className="mt-4 flex items-center justify-between font-alt">
                  <a className="text-[#1E9CD7] hover:text-[#FE861B] text-sm font-medium" href="/service">
                    Learn more
                  </a>
                  <button className="text-sm px-3 py-1 border border-slate-200 rounded-md bg-white hover:bg-slate-50">
                    →
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
