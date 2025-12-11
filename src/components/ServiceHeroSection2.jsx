import React, { useRef } from "react";
import { 
  motion, 
  useMotionValue, 
  useTransform, 
  useSpring 
} from "framer-motion";
import { ArrowRight, Code, Smartphone, PenTool, Layers } from "lucide-react";

/* --- 1. MAGNETIC BUTTON HOOK --- */
const useMagnetic = () => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out the mouse movement
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX / 5); // Sensitivity
    y.set(middleY / 5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { ref, x: springX, y: springY, handleMouseMove, handleMouseLeave };
};

/* --- 2. 3D TILT CARD COMPONENT --- */
const TiltCard = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring physics for tilt
  const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXFromCenter = e.clientX - rect.left - width / 2;
    const mouseYFromCenter = e.clientY - rect.top - height / 2;
    x.set(mouseXFromCenter / width);
    y.set(mouseYFromCenter / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
 <motion.div
  onMouseMove={handleMouseMove}
  onMouseLeave={handleMouseLeave}
  style={{
    rotateX,
    rotateY,
    transformStyle: "preserve-3d",
    perspective: "1000px"    // FIX
  }}
  className="
  relative z-10 
  w-[85%] mx-auto 
  aspect-[3/4]          /* Mobile-friendly ratio */
  sm:w-[80%]            
  md:w-[90%]            
  lg:w-full lg:max-w-[500px] lg:aspect-[4/5] 
"
>

      {/* Main Glass Panel */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-2xl border border-white/40 rounded-[2.5rem] shadow-2xl overflow-hidden"
        style={{ transform: "translateZ(20px)" }}
      >
         {/* Internal Image */}
         <img 
            src="/service.png" 
            alt="Services" 
            className="w-full h-full object-cover opacity-90 mix-blend-overlay scale-110"
            style={{ transform: "translateZ(10px)" }}
            onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentNode.style.backgroundColor = '#e2e8f0';
            }}
         />
         
         {/* Decorative Gradient Blob inside card */}
         <div className="absolute top-0 right-0 w-64 h-64 bg-[#FE861B]/20 blur-[60px] rounded-full pointer-events-none" />
      </div>

      {/* Floating Elements (Parallax) */}
      <motion.div 
        style={{ transform: "translateZ(60px)" }}
        className="absolute -right-8 top-16 bg-white p-4 rounded-2xl shadow-xl shadow-slate-200/50 flex items-center gap-3 border border-slate-100 animate-float-slow"
      >
        <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-500">
          <Code size={20} />
        </div>
        <div>
          <p className="text-xs text-slate-400 font-semibold uppercase">Stack</p>
          <p className="text-sm font-bold text-slate-800">Full-Dev</p>
        </div>
      </motion.div>

      <motion.div 
        style={{ transform: "translateZ(80px)" }}
        className="absolute -left-8 bottom-32 bg-white p-4 rounded-2xl shadow-xl shadow-slate-200/50 flex items-center gap-3 border border-slate-100 animate-float-delayed"
      >
        <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center text-[#FE861B]">
          <Smartphone size={20} />
        </div>
        <div>
          <p className="text-xs text-slate-400 font-semibold uppercase">Platform</p>
          <p className="text-sm font-bold text-slate-800">Mobile Apps</p>
        </div>
      </motion.div>

      <motion.div 
        style={{ transform: "translateZ(40px)" }}
        className="absolute right-4 bottom-8 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-xl border border-slate-100 shadow-lg flex items-center gap-2"
      >
         <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
         <span className="text-xs font-bold text-slate-700">System Active</span>
      </motion.div>
    </motion.div>
  );
};

/* --- 3. MAIN COMPONENT --- */
export default function ServiceHeroSections() {
  const { ref, x, y, handleMouseMove, handleMouseLeave } = useMagnetic();

  return (
    <section className="relative w-full py-24 lg:py-32 overflow-hidden bg-slate-50/50">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#1E9CD7]/10 blur-[100px] rounded-full mix-blend-multiply" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#FE861B]/10 blur-[120px] rounded-full mix-blend-multiply" />
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.4]" 
             style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '32px 32px' }} 
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* LEFT — 3D IMAGE VISUAL */}
          <motion.div
            initial={{ opacity: 0, x: -50, rotate: -5 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, type: "spring", bounce: 0.2 }}
            className="relative order-2 lg:order-1"
          >
             <TiltCard />
             {/* Mobile only decorative blob behind */}
             <div className="lg:hidden absolute inset-0 bg-blue-200/20 blur-3xl -z-10 rounded-full" />
          </motion.div>

          {/* RIGHT — CONTENT */}
          <div className="order-1 lg:order-2 flex flex-col justify-center">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-6 flex items-center gap-2"
            >
              <span className="px-3 py-1 rounded-full bg-blue-100 text-[#1E9CD7] text-xs font-bold uppercase tracking-widest border border-blue-200">
                What We Do
              </span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-8"
            >
              Empowering Ideas with <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FE861B] to-[#ff7d56]">
                Modern Innovation.
              </span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="space-y-6 text-lg text-slate-600 leading-relaxed"
            >
              <p>
                At <span className="font-bold text-slate-900">Frontier Wox Technologies</span>, 
                we don't just write code; we craft world-class digital ecosystems that elevate brands and empower exponential growth.
              </p>
              
              <p>
                Our expertise spans the entire digital spectrum:
              </p>

              {/* Enhanced List / Tags */}
              <div className="flex flex-wrap gap-3 py-2">
                 {[
                   { icon: Layers, text: "Custom Web Apps" },
                   { icon: Code, text: "Full-Stack Dev" },
                   { icon: Smartphone, text: "Mobile Apps" },
                   { icon: Layers, text: "CMS Platforms" },
                   { icon: PenTool, text: "Branding" },
                 ].map((item, i) => (
                   <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-sm text-sm font-semibold text-slate-700 hover:border-[#FE861B] hover:text-[#FE861B] transition-colors cursor-default">
                      <item.icon size={16} />
                      {item.text}
                   </div>
                 ))}
              </div>

              <p>
                Whether it's a complex enterprise platform or a visually unforgettable brand identity, we deliver high-value solutions that remain relevant across time.
              </p>
            </motion.div>

            {/* CTA SECTION */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-10"
            >
              <motion.a
                ref={ref}
                href="/contact"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ x, y }}
                className="relative inline-flex items-center justify-center px-10 py-4 bg-slate-900 text-white font-bold rounded-full overflow-hidden group shadow-xl hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get In Touch
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
                
                {/* Button Hover Shine Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />
              </motion.a>
            </motion.div>

          </div>
        </div>
      </div>

      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateZ(60px) translateY(0px); }
          50% { transform: translateZ(60px) translateY(-15px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateZ(80px) translateY(0px); }
          50% { transform: translateZ(80px) translateY(-10px); }
        }
        .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 7s ease-in-out infinite 1s; }
      `}</style>
    </section>
  );
}