import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useMotionTemplate
} from "framer-motion";
import {
  LayoutDashboard,
  Globe,
  Palette,
  Smartphone,
  ShoppingCart,
  Briefcase,
  Layers,
  BookOpen,
  Code,
  PenTool,
  BrainCircuit,
  TrendingUp,
  Award,
  ArrowRight,
  X,
  Zap,
  CheckCircle,
  Sparkles
} from "lucide-react";

/* -----------------------
   DATA: 13 SERVICES
   ----------------------- */
const services = [
  {
    id: "web-design",
    icon: LayoutDashboard,
    color: "from-blue-500 to-indigo-600",
    shadow: "shadow-blue-500/20",
    title: "Web Design",
    short: "Visual Excellence",
    description: "We bring together design experts and creative strategies to craft visually stunning, user-centered interfaces that capture your brand's essence.",
    tags: ["UI Design", "Responsive", "Prototyping"],
    details: "Our design philosophy centers on the user. We create immersive digital experiences that are not only aesthetically pleasing but also intuitive, ensuring your visitors stay engaged and convert."
  },
  {
    id: "web-dev",
    icon: Globe,
    color: "from-emerald-500 to-teal-600",
    shadow: "shadow-emerald-500/20",
    title: "Web Development",
    short: "Scalable Platforms",
    description: "We enable organizations to implement high-performance, scalable, and SEO-ready web architectures built on modern frameworks.",
    tags: ["React/Next.js", "Performance", "Security"],
    details: "Beyond just code, we build digital ecosystems. Our development process ensures your website is fast, secure, and capable of scaling seamlessly as your business grows."
  },
  {
    id: "graphic-design",
    icon: Palette,
    color: "from-pink-500 to-rose-500",
    shadow: "shadow-pink-500/20",
    title: "Graphic Design",
    short: "Visual Identity",
    description: "We deliver impactful branding assets and creative visuals that communicate your message effectively across all media formats.",
    tags: ["Marketing Assets", "Print", "Digital Art"],
    details: "From social media creatives to large-scale print assets, our graphic design services ensure your brand maintains a consistent and powerful visual voice in the market."
  },
  {
    id: "mobile-app",
    icon: Smartphone,
    color: "from-violet-500 to-purple-600",
    shadow: "shadow-violet-500/20",
    title: "Mobile App Development",
    short: "iOS & Android",
    description: "We offer a speedier approach to mobile transformation, building beautifully crafted native and cross-platform apps with seamless UX.",
    tags: ["React Native", "Flutter", "iOS/Android"],
    details: "We map product flows and build modular UI to ensure your mobile application provides a native feel, high performance, and an engaging user experience on every device."
  },
  {
    id: "ecommerce",
    icon: ShoppingCart,
    color: "from-orange-500 to-amber-600",
    shadow: "shadow-orange-500/20",
    title: "E-Commerce",
    short: "Digital Commerce",
    description: "We enable businesses to launch robust online stores with seamless checkout experiences, inventory management, and high-converting funnels.",
    tags: ["Shopify", "WooCommerce", "Payment Gateways"],
    details: "We build digital storefronts engineered for sales. From product discovery to secure checkout, we optimize every step of the customer journey to maximize revenue."
  },
  {
    id: "branding",
    icon: Briefcase,
    color: "from-red-500 to-orange-500",
    shadow: "shadow-red-500/20",
    title: "Branding Services",
    short: "Strategic Identity",
    description: "We develop a comprehensive brand strategy that takes into account your unique business context, ensuring your identity resonates with your audience.",
    tags: ["Logo Design", "Brand Guidelines", "Strategy"],
    details: "Your brand is more than a logo. We craft complete identity systems—including voice, tone, and visual assets—that define your market presence and build lasting trust."
  },
  {
    id: "cms-dev",
    icon: Layers,
    color: "from-slate-600 to-slate-800",
    shadow: "shadow-slate-500/20",
    title: "CMS-Based Development",
    short: "Content Management",
    description: "We offer flexible content platforms that enable non-technical teams to publish and manage content with ease and efficiency.",
    tags: ["WordPress", "Strapi", "Headless CMS"],
    details: "Empower your marketing team. We build custom CMS solutions that are secure, easy to use, and tailored to your specific publishing workflows, putting you in control of your content."
  },
  {
    id: "portfolio-sites",
    icon: Award,
    color: "from-indigo-500 to-blue-500",
    shadow: "shadow-indigo-500/20",
    title: "Business Portfolio",
    short: "Digital Credibility",
    description: "We create professional, high-impact portfolio sites that showcase your organization's strengths, case studies, and achievements.",
    tags: ["Showcase", "Lead Gen", "Authority"],
    details: "Your digital resume matters. We build sleek, professional portfolio sites designed to build credibility with prospective clients and partners, turning visitors into leads."
  },
  {
    id: "cbt",
    icon: BookOpen,
    color: "from-lime-500 to-green-600",
    shadow: "shadow-lime-500/20",
    title: "CBT Solutions",
    short: "E-Learning",
    description: "We conceptualize and implement interactive e-learning modules and LMS platforms for effective employee and student training.",
    tags: ["LMS", "SCORM", "Interactive Learning"],
    details: "Modernize your training. We build engaging, interactive training software that improves information retention and allows you to track progress effectively."
  },
  {
    id: "custom-software",
    icon: Code,
    color: "from-cyan-500 to-blue-600",
    shadow: "shadow-cyan-500/20",
    title: "Custom Software",
    short: "Bespoke Solutions",
    description: "We draw on deep engineering expertise to build bespoke software architectures designed to solve your specific complex business challenges.",
    tags: ["SaaS", "Enterprise", "Architecture"],
    details: "Off-the-shelf software doesn't always fit. We architect custom solutions tailored exactly to your operational needs, driving efficiency and automation where you need it most."
  },
  {
    id: "ui-ux",
    icon: PenTool,
    color: "from-fuchsia-500 to-pink-600",
    shadow: "shadow-fuchsia-500/20",
    title: "UI/UX Design",
    short: "User Experience",
    description: "We identify what matters to your customer, creating intuitive user flows and visually stunning interfaces grounded in behavioral psychology.",
    tags: ["Wireframing", "User Research", "Interaction"],
    details: "Great design solves problems. We utilize data-driven insights to design interfaces that are not just beautiful, but are easy to use and help users achieve their goals effortlessly."
  },
  {
    id: "ai-data",
    icon: BrainCircuit,
    color: "from-sky-500 to-blue-600",
    shadow: "shadow-sky-500/20",
    title: "AI & Data Solutions",
    short: "Intelligent Insights",
    description: "We enable organizations to implement well-thought-out AI and data programs, leveraging machine learning to automate workflows and uncover insights.",
    tags: ["Machine Learning", "Analytics", "Automation"],
    details: "Turn data into a competitive advantage. We integrate AI models and data analytics into your business processes to predict trends, automate tasks, and drive smarter decisions."
  },
  {
    id: "it-consulting",
    icon: TrendingUp,
    color: "from-gray-700 to-gray-900",
    shadow: "shadow-gray-500/20",
    title: "IT Consulting",
    short: "Strategic Roadmaps",
    description: "We offer IT advisory services to help you transform your business technology, providing expert guidance on infrastructure and digital strategy.",
    tags: ["Digital Transformation", "Audit", "Strategy"],
    details: "Navigate the complex tech landscape with confidence. We provide technical audits and strategic roadmaps to ensure your technology stack aligns perfectly with your long-term business goals."
  }
];

/* -----------------------
   UTILITIES
   ----------------------- */
const getGradientColors = (colorKey) => {
  const colorMap = {
    "from-blue-500 to-indigo-600": ["#3b82f6", "#6366f1"],
    "from-emerald-500 to-teal-600": ["#10b981", "#0ea5a4"],
    "from-pink-500 to-rose-500": ["#ec4899", "#f43f5e"],
    "from-violet-500 to-purple-600": ["#8b5cf6", "#7c3aed"],
    "from-orange-500 to-amber-600": ["#f97316", "#f59e0b"],
    "from-red-500 to-orange-500": ["#ef4444", "#fb923c"],
    "from-slate-600 to-slate-800": ["#475569", "#0f172a"],
    "from-indigo-500 to-blue-500": ["#6366f1", "#3b82f6"],
    "from-lime-500 to-green-600": ["#84cc16", "#16a34a"],
    "from-cyan-500 to-blue-600": ["#06b6d4", "#2563eb"],
    "from-fuchsia-500 to-pink-600": ["#d946ef", "#db2777"],
    "from-sky-500 to-blue-600": ["#0ea5e9", "#2563eb"],
    "from-gray-700 to-gray-900": ["#374151", "#111827"]
  };
  return colorMap[colorKey] || ["#3b82f6", "#6366f1"];
};

/* -----------------------
   HOOK: 3D TILT (Touch Aware)
   ----------------------- */
function useCardTilt(ref) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  // Default scale is 1
  const scale = useSpring(1, { stiffness: 300, damping: 30 });

  useEffect(() => {
    // Disable on touch devices to prevent scroll interference
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (!ref.current || isTouch) return;

    const el = ref.current;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      
      const rotateMax = 12; // increased slightly for effect
      const rx = -(py - 0.5) * rotateMax;
      const ry = (px - 0.5) * rotateMax;

      rotateX.set(rx);
      rotateY.set(ry);
      scale.set(1.02); // slight lift
    };

    const onLeave = () => {
      rotateX.set(0);
      rotateY.set(0);
      scale.set(1);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [ref, rotateX, rotateY, scale]);

  return { rotateX, rotateY, scale };
}

/* -----------------------
   COMPONENT: SERVICE CARD
   ----------------------- */
const ServiceCard = ({ service, onClick }) => {
  const ref = useRef(null);
  const { rotateX, rotateY, scale } = useCardTilt(ref);
  const [cFrom, cTo] = getGradientColors(service.color);

  // Mouse position for local "flashlight" effect on hover
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      ref={ref}
      layoutId={`wrapper-${service.id}`}
      onClick={() => onClick(service)}
      onMouseMove={handleMouseMove}
      className="relative h-full perspective-1000 group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      {/* 3D Container */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: "preserve-3d",
        }}
        className="relative h-full bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden"
      >
        
        {/* Hover Flashlight/Glow Effect */}
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                650px circle at ${mouseX}px ${mouseY}px,
                rgba(${parseInt(cFrom.slice(1,3),16)}, ${parseInt(cFrom.slice(3,5),16)}, ${parseInt(cFrom.slice(5,7),16)}, 0.08),
                transparent 80%
              )
            `
          }}
        />

        {/* Gradient Top Line */}
        <div className={`h-1.5 w-full bg-gradient-to-r ${service.color}`} />

        <div className="p-6 md:p-8 flex flex-col h-full relative z-20">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <motion.div
              layoutId={`icon-box-${service.id}`}
              className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 group-hover:text-white group-hover:scale-110 transition-all duration-300 relative overflow-hidden"
            >
              {/* Icon Background Fill on Hover */}
              <div 
                className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} 
              />
              <service.icon size={26} className="relative z-10" />
            </motion.div>

            <motion.div 
               layoutId={`arrow-${service.id}`}
               className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-colors"
            >
              <ArrowRight size={16} />
            </motion.div>
          </div>

          {/* Titles */}
          <motion.h3 
            layoutId={`title-${service.id}`}
            className="text-xl font-bold text-slate-900 mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-900 group-hover:to-slate-600 transition-all"
          >
            {service.title}
          </motion.h3>
          <motion.p 
            layoutId={`short-${service.id}`}
            className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4"
          >
            {service.short}
          </motion.p>

          {/* Description */}
          <motion.p 
            layoutId={`desc-${service.id}`}
            className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-6"
          >
            {service.description}
          </motion.p>

          {/* Tags */}
          <div className="mt-auto pt-4 border-t border-slate-100 flex flex-wrap gap-2">
            {service.tags.slice(0, 2).map((tag, i) => (
              <span key={i} className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-50 px-2 py-1 rounded-md border border-slate-200 group-hover:border-transparent group-hover:bg-white/80 transition-colors">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* -----------------------
   COMPONENT: MODAL
   ----------------------- */
const ExpandedCard = ({ service, onClose }) => {
  const [cFrom, cTo] = getGradientColors(service.color);

  // Lock Body Scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center sm:p-6 md:p-12">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md cursor-pointer"
      />

      {/* Card Modal */}
      <motion.div
        layoutId={`wrapper-${service.id}`}
        className="relative w-full max-w-3xl bg-white rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] sm:max-h-[85vh] z-10"
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-30 w-10 h-10 bg-black/5 hover:bg-black/10 rounded-full flex items-center justify-center text-slate-500 transition-colors backdrop-blur-sm"
        >
          <X size={20} />
        </button>

        {/* Header Section */}
        <div className="relative shrink-0 bg-slate-50 border-b border-slate-100 p-8 sm:p-10 pb-12 overflow-hidden">
            {/* Background Gradient Blob */}
            <div 
              className="absolute -top-[50%] -right-[10%] w-[100%] h-[150%] rounded-full opacity-10 blur-3xl pointer-events-none"
              style={{ background: `linear-gradient(135deg, ${cFrom}, ${cTo})` }}
            />
            
            <div className="relative z-10 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
               <motion.div
                 layoutId={`icon-box-${service.id}`}
                 className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white shadow-xl shadow-blue-900/5`}
               >
                 <service.icon size={36} />
               </motion.div>
               
               <div className="flex-1">
                 <motion.h3 
                   layoutId={`title-${service.id}`}
                   className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2"
                 >
                   {service.title}
                 </motion.h3>
                 <motion.div layoutId={`short-${service.id}`} className="flex items-center gap-2">
                   <span className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${service.color}`} />
                   <span className="text-slate-500 font-bold uppercase tracking-widest text-sm">{service.short}</span>
                 </motion.div>
               </div>
            </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-8 sm:p-10 bg-white">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
           >
             <motion.p layoutId={`desc-${service.id}`} className="text-xl text-slate-700 leading-relaxed font-medium mb-10">
               {service.description}
             </motion.p>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                   <div className="flex items-center gap-2 mb-4">
                      <Zap size={20} className="text-[#FE861B]" />
                      <h4 className="font-bold text-slate-900 uppercase tracking-widest text-xs">Our Strategy</h4>
                   </div>
                   <p className="text-slate-600 text-sm leading-relaxed">
                     {service.details}
                   </p>
                </div>

                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                   <div className="flex items-center gap-2 mb-4">
                      <Sparkles size={20} className="text-[#1E9CD7]" />
                      <h4 className="font-bold text-slate-900 uppercase tracking-widest text-xs">Technologies</h4>
                   </div>
                   <div className="flex flex-wrap gap-2">
                     {service.tags.map(tag => (
                       <span key={tag} className="bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 shadow-sm">
                         {tag}
                       </span>
                     ))}
                   </div>
                </div>
             </div>

             <div className="pt-6 border-t border-slate-100 flex justify-end">
                <a 
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#FE861B] transition-colors shadow-xl shadow-slate-900/10"
                >
                  Start Project <ArrowRight size={18} />
                </a>
             </div>
           </motion.div>
        </div>

      </motion.div>
    </div>,
    document.body
  );
};

/* -----------------------
   MAIN SECTION
   ----------------------- */
export default function ServiceProvided() {
  const [selectedService, setSelectedService] = useState(null);
  const containerRef = useRef(null);

  // Parallax background blobs
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <section ref={containerRef} className="relative py-24 bg-slate-50/50 overflow-hidden font-sans">
      
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute inset-0 opacity-[0.4]" 
              style={{ backgroundImage: 'radial-gradient(#cbd5e1 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }} 
         />
         <motion.div style={{ y: y1 }} className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#1E9CD7]/5 rounded-full blur-[100px]" />
         <motion.div style={{ y: y2 }} className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-[#FE861B]/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-6"
          >
            <Layers size={14} className="text-[#1E9CD7]" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Our Capabilities</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight"
          >
            Services Built for <br className="hidden sm:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FE861B] to-[#ff7d45]">Transformation</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-500 max-w-2xl mx-auto"
          >
            Combining deep industry expertise with cutting-edge technology to deliver comprehensive digital solutions.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className="h-full"
            >
              <ServiceCard 
                service={service} 
                onClick={setSelectedService} 
              />
            </motion.div>
          ))}
        </div>

      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedService && (
          <ExpandedCard 
            service={selectedService} 
            onClose={() => setSelectedService(null)} 
          />
        )}
      </AnimatePresence>

    </section>
  );
}