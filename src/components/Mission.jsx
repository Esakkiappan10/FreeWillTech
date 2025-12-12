import React from "react";
import { motion } from "framer-motion";
import { 
  Target, 
  Eye, 
  Heart, 
  Zap, 
  Shield, 
  Users, 
  Lightbulb, 
  ArrowRight,
  Layers,
  Cpu,
  Globe
} from "lucide-react";
import { Link } from "react-router-dom";

/* --- ASSETS & DATA --- */
const values = [
  { title: "Innovation", desc: "We embrace creativity, curiosity, and constant improvement.", icon: Lightbulb },
  { title: "Integrity", desc: "Transparent, honest, and ethical work — always.", icon: Shield },
  { title: "Excellence", desc: "We deliver quality that stands out and lasts.", icon: Zap },
  { title: "Collaboration", desc: "We believe great results come from working together.", icon: Users },
  { title: "Passion", desc: "Our energy, dedication & enthusiasm drive our outcomes.", icon: Heart },
  { title: "Impact", desc: "We build technology that creates meaningful real-world change.", icon: Target },
];

const aims = [
  { 
    text: "Nurture a consistent commitment to novel ideas, entrepreneurial experimentation, and bold business models.",
    icon: Lightbulb
  },
  { 
    text: "Encourage the pursuit of human potential and resourcefulness at every level.",
    icon: Users
  },
  { 
    text: "Build technologies that remain relevant across platforms, protocols, and time.",
    icon: Layers
  }
];

const Mission = () => {
  return (
    <div id="mission" className="relative bg-white font-sans text-slate-900 selection:bg-[#FE861B]/30">
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-[#1E9CD7]/5 blur-[120px] rounded-full translate-x-[-40%] translate-y-[-40%]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#FE861B]/5 blur-[100px] rounded-full translate-x-[30%] translate-y-[30%]" />
      </div>

      {/* =======================
          SECTION 1 — MISSION
      ========================== */}
      <section className="relative min-h-[90vh] flex items-center py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* LEFT — Mission Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10"
          >
            <div className="inline-flex items-center space-x-2 bg-slate-100/80 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200 mb-8">
              <Target size={16} className="text-[#FE861B]" />
              <span className="text-sm font-bold text-slate-600 uppercase tracking-wider">Our Core Purpose</span>
            </div>

            <h2 className="text-5xl lg:text-7xl font-extrabold text-slate-900 mb-8 leading-[1.1]">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FE861B] to-[#ffaa40]">Mission</span>
            </h2>

            <div className="space-y-6 text-lg md:text-xl leading-relaxed text-slate-600">
              <p>
                At <span className="font-bold text-slate-900">FrontierWox Tech</span>, our mission is to deliver smart, scalable, and 
                design-driven solutions that bridge the gap between{" "}
                <span className="text-slate-900 font-semibold border-b-2 border-[#FE861B]/30">engineering excellence</span>
                {" "}and{" "}
                <span className="text-slate-900 font-semibold border-b-2 border-[#FE861B]/30">real-world impact</span>.
              </p>
              <p>
                From web and automation to full-scale IT consulting, we fuel digital 
                transformation with <span className="text-slate-900 font-semibold">human-centered innovation</span>
                —empowering businesses to grow, evolve, and stay future-ready with creativity and purpose.
              </p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-11"
            >
            <Link 
  to="/service"
  className="group flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-full font-semibold hover:bg-[#FE861B] transition-colors duration-300 shadow-lg hover:shadow-[#FE861B]/25 w-fit"
>
  Explore Our Services
  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
</Link>

            </motion.div>
          </motion.div>

          {/* RIGHT — Abstract Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] hidden lg:block"
          >
            {/* Abstract Card Composition */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white rounded-[3rem] border border-slate-100 shadow-2xl flex flex-col items-center justify-center overflow-hidden">
               {/* Decorative Grid */}
               <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
               
               {/* Floating Icon Sphere */}
               <motion.div 
                 animate={{ y: [0, -15, 0] }}
                 transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                 className="relative w-48 h-48 bg-gradient-to-tr from-[#FE861B] to-[#ffb36b] rounded-full flex items-center justify-center shadow-2xl shadow-[#FE861B]/30 z-10"
               >
                 <Target size={80} className="text-white drop-shadow-md" />
               </motion.div>

               {/* Orbiting Elements */}
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                 className="absolute w-[340px] h-[340px] border border-slate-200 rounded-full border-dashed"
               />
               <motion.div 
                 animate={{ rotate: -360 }}
                 transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                 className="absolute w-[440px] h-[440px] border border-slate-100 rounded-full"
               />
            </div>
          </motion.div>
        </div>
      </section>


      {/* =======================
          SECTION 2 — VISION
      ========================== */}
      <section className="relative py-24 bg-slate-50/80 backdrop-blur-sm border-y border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* LEFT — Vision Title & Main Statement (Col Span 5) */}
          <div className="lg:col-span-5 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
               <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full border border-slate-200 mb-8 shadow-sm">
                <Eye size={16} className="text-[#1E9CD7]" />
                <span className="text-sm font-bold text-slate-600 uppercase tracking-wider">Our Vision</span>
              </div>

              <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-8">
                Future <span className="text-[#1E9CD7]">Focus</span>
              </h2>

              <p className="text-xl md:text-2xl font-medium leading-relaxed text-slate-700 mb-10">
                To create universally adaptable and ethically built technologies that empower people and organizations across industries.
              </p>

              {/* Decorative Image/Box */}
              <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200 bg-white h-64 relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#1E9CD7]/10 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                   <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-full bg-[#1E9CD7] flex items-center justify-center text-white">
                        <Globe size={24} />
                     </div>
                     <div>
                       <p className="font-bold text-slate-900">Global Scale</p>
                       <p className="text-sm text-slate-500">Adaptable across protocols</p>
                     </div>
                   </div>
                </div>
                {/* Simulated Map or Mesh */}
                <div className="absolute top-0 right-0 p-8 opacity-20">
                   <Cpu size={120} className="text-[#1E9CD7]" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT — Aims List (Col Span 7) */}
          <div className="lg:col-span-7 flex flex-col justify-center h-full">
             <div className="space-y-6">
                {aims.map((aim, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                    className="flex gap-6 p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-[#1E9CD7]/30 transition-all duration-300 group"
                  >
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-[#1E9CD7] transition-colors duration-300">
                      <aim.icon size={24} className="text-slate-400 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-[#1E9CD7] transition-colors">
                        We aim to
                      </h4>
                      <p className="text-slate-600 text-lg leading-relaxed">
                        {aim.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
             </div>
          </div>

        </div>
      </section>


      {/* =======================
          SECTION 3 — CORE VALUES
      ========================== */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Section header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20 max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
              Our Core <span className="text-slate-400">Values</span>
            </h2>
            <p className="text-xl text-slate-500">
              The principles that define our identity, guide our decisions, and fuel our culture of excellence.
            </p>
          </motion.div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((val, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="group relative bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-[#1E9CD7]/10 hover:border-[#1E9CD7]/20 transition-all duration-300 overflow-hidden"
              >
                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1E9CD7]/5 to-[#FE861B]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 group-hover:bg-gradient-to-br group-hover:from-[#1E9CD7] group-hover:to-[#FE861B] group-hover:border-transparent transition-all duration-300">
                    <val.icon size={24} className="text-slate-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-[#1E9CD7] transition-colors">{val.title}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed group-hover:text-slate-600">{val.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}

export default Mission;