import React from "react";
import { motion } from "framer-motion";
import { 
  Target, Eye, Heart, Zap, Shield, Users, Lightbulb 
} from "lucide-react";

/* Values based on your PDF core values section */
const values = [
  { title: "Innovation", desc: "We embrace creativity, curiosity, and constant improvement.", icon: Lightbulb },
  { title: "Integrity", desc: "Transparent, honest, and ethical work — always.", icon: Shield },
  { title: "Excellence", desc: "We deliver quality that stands out and lasts.", icon: Zap },
  { title: "Collaboration", desc: "We believe great results come from working together.", icon: Users },
  { title: "Passion", desc: "Our energy, dedication & enthusiasm drive our outcomes.", icon: Heart },
  { title: "Impact", desc: "We build technology that creates meaningful real-world change.", icon: Target },
];

export default function Mission() {
  return (
    <div id="mission" className="relative bg-white">

      {/* =======================
          SECTION 1 — MISSION
      ========================== */}
      <section className="relative min-h-screen flex items-center py-24 overflow-hidden">
        
        {/* Background accent */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[#1E9CD7]/15 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#FE861B]/15 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* LEFT — Mission Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-16 h-16 bg-[#FE861B]/15 rounded-2xl flex items-center justify-center mb-8">
              <Target className="text-[#FE861B]" size={32} />
            </div>

            <h2 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6">
              Our <span className="text-[#FE861B]">Mission</span>
            </h2>

            <p className="text-xl md:text-2xl leading-relaxed text-slate-600 max-w-xl">
              To deliver smart, scalable, design-driven digital solutions that combine{" "}
              <span className="text-slate-900 font-semibold">engineering excellence</span>  
              {" "}with{" "}
              <span className="text-slate-900 font-semibold">human-centered innovation</span>,
              helping businesses grow, evolve, and stay future-ready.
            </p>
          </motion.div>

          {/* RIGHT — Mission Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.9 }}
            className="relative hidden lg:block h-[600px]"
          >
            <div className="absolute inset-0 rounded-[3rem] bg-white border border-slate-200 shadow-2xl overflow-hidden">
              {/* Soft radial accents */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#FE861B_0%,transparent_45%)] opacity-10" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#1E9CD7_0%,transparent_45%)] opacity-10" />

              {/* Large watermark text */}
              <div className="flex items-center justify-center h-full">
                <h3 className="text-[11rem] font-black text-slate-200 select-none tracking-tight">
                  GOAL
                </h3>
              </div>
            </div>
          </motion.div>

        </div>
      </section>


      {/* =======================
          SECTION 2 — VISION
      ========================== */}
      <section className="relative min-h-screen bg-white py-28 overflow-hidden">

        {/* Background Soft Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1E9CD7]/20 blur-[160px] rounded-full" />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* LEFT — Vision Visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8 }}
            className="relative hidden lg:block h-[600px]"
          >
            <div className="absolute inset-0 bg-white rounded-[3rem] border border-slate-200 shadow-2xl overflow-hidden">
              <img
                src="/about.jpg"
                alt="Vision"
                className="w-full h-full object-cover mix-blend-overlay opacity-40"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Eye size={120} className="text-slate-300" />
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Vision Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-16 h-16 bg-[#1E9CD7]/15 rounded-2xl flex items-center justify-center mb-8">
              <Eye className="text-[#1E9CD7]" size={32} />
            </div>

            <h2 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6">
              Our <span className="text-[#1E9CD7]">Vision</span>
            </h2>

            <p className="text-xl md:text-2xl leading-relaxed text-slate-600 max-w-xl">
              To be a global leader in digital innovation — enabling organizations to{" "}
              <span className="text-slate-900 font-semibold">adapt</span>,{" "}
              <span className="text-slate-900 font-semibold">evolve</span>, and{" "}
              <span className="text-slate-900 font-semibold">thrive</span>{" "}
              using intelligent, future-ready technologies.
            </p>
          </motion.div>

        </div>
      </section>


      {/* =======================
        SECTION 3 — CORE VALUES
      ========================== */}
      <section className="relative py-32 bg-slate-50 px-6">

        {/* Section header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Our Core Values
          </h2>
          <p className="text-xl text-slate-600">
            Principles that define our identity and guide our decisions.
          </p>
        </div>

        {/* Values Grid */}
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((val, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 hover:shadow-2xl transition-all"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1E9CD7] to-[#FE861B] flex items-center justify-center mb-6 shadow-lg">
                <val.icon size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{val.title}</h3>
              <p className="text-slate-500 text-lg">{val.desc}</p>
            </motion.div>
          ))}
        </div>

      </section>
    </div>
  );
}
