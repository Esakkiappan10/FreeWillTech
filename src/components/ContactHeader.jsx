import React from "react";
import { motion } from "framer-motion";
import { 
  Phone, MapPin, Linkedin, Instagram, 
  Home, ChevronRight, ArrowUpRight, Globe ,Mail
} from "lucide-react";

// --- COMPONENT 1: HERO HEADER ---
const ContactHeader = () => {
  return (
    <header className="relative w-full h-[400px] lg:h-[450px] overflow-hidden font-sans flex items-center justify-center">
      
      {/* Background with Parallax Feel */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
          alt="Office Connectivity"
          className="w-full h-full object-cover"
        />
        {/* Professional Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-blue-900/60" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-orange-400 text-xs font-bold tracking-widest uppercase mb-4 backdrop-blur-md">
            24/7 Support
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-xl">
            Let’s <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-orange-400">Connect</span>
          </h1>
        </motion.div>

        {/* Glass Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-lg shadow-2xl"
        >
          <a href="/" className="flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors">
            <Home size={16} /> Home
          </a>
          <ChevronRight size={14} className="text-slate-500" />
          <span className="text-sm font-bold text-white">Contact Us</span>
        </motion.div>
      </div>
    </header>
  );
};

// --- COMPONENT 2: INFO CARDS (Bento Grid) ---
const ContactInfo = () => {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section className="relative w-full py-20 bg-slate-50 -mt-20 z-20 rounded-t-[3rem]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <motion.div 
  variants={container}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true }}
  className="grid grid-cols-1 md:grid-cols-3 gap-6"
>

  {/* =================== HQ CARD =================== */}
{/* =================== HQ CARD =================== */}
<motion.div 
  variants={item}
  className="
    md:col-span-3 group relative 
    p-6 md:p-10 
    bg-white rounded-[2.5rem] 
    border border-slate-100 shadow-xl shadow-slate-200/50 
    hover:shadow-2xl hover:shadow-blue-900/5 
    transition-all duration-500 overflow-hidden
  "
>
  <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-blue-50 rounded-full blur-[70px] -translate-y-1/2 translate-x-1/2 opacity-50 group-hover:opacity-100 transition-opacity" />
  
  <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 relative z-10">
    
    {/* Icon — auto-resizes on mobile */}
    <div className="
      w-16 h-16 md:w-20 md:h-20 
      rounded-3xl bg-blue-600 text-white 
      flex items-center justify-center shrink-0 
      shadow-lg shadow-blue-600/30 
      group-hover:scale-110 transition-transform duration-500
    ">
      <MapPin size={30} className="md:size-9" />
    </div>

    {/* Text section */}
    <div className="flex-1">
      {/* Tags */}
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] md:text-[11px] font-bold uppercase tracking-widest border border-blue-100">
          Campus HQ
        </span>

        <span className="text-slate-400 text-xs md:text-sm font-semibold flex items-center gap-1">
          <Globe size={12} className="md:size-4" /> Tamil Nadu, India
        </span>
      </div>

      <h3 className="text-xl md:text-3xl font-bold text-slate-900 leading-tight mb-1 md:mb-2">
        Joseph StartUp Center
      </h3>

      <p className="text-slate-500 text-sm md:text-lg leading-relaxed max-w-2xl">
        St. Joseph’s College (Autonomous),<br />
        Tiruchirappalli, Tamil Nadu.
      </p>
    </div>

    {/* Map Button */}
    <a 
      href="https://maps.google.com/?q=St. Joseph’s College Tiruchirappalli" 
      target="_blank" 
      rel="noreferrer"
      className="
        px-6 py-3 md:px-8 md:py-4 
        bg-white border border-slate-200 
        rounded-2xl font-bold text-slate-700 
        hover:bg-slate-50 hover:border-slate-300 
        transition-all flex items-center gap-2 
        w-full md:w-auto mt-1 md:mt-0
      "
    >
      View on Map 
      <ArrowUpRight size={16} className="md:size-[18] transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
    </a>

  </div>
</motion.div>


 {/* =================== REGISTERED ADDRESS =================== */}
<motion.div 
  variants={item}
  className="
    md:col-span-3 group relative 
    p-6 md:p-10 
    bg-white rounded-[2.5rem] 
    border border-slate-100 shadow-xl shadow-slate-200/50 
    hover:shadow-2xl hover:shadow-blue-900/5 
    transition-all duration-500 overflow-hidden
  "
>
  <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-blue-50 rounded-full blur-[70px] -translate-y-1/2 translate-x-1/2 opacity-50 group-hover:opacity-100 transition-opacity" />
  
  <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 relative z-10">
    
    {/* Icon (auto-resizes on mobile) */}
    <div className="
      w-16 h-16 md:w-20 md:h-20 
      rounded-3xl bg-blue-600 text-white 
      flex items-center justify-center shrink-0 
      shadow-lg shadow-blue-600/30 
      group-hover:scale-110 transition-transform duration-500
    ">
      <MapPin size={30} className="md:size-9" />
    </div>
    
    <div className="flex-1">
      
      {/* Tags */}
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] md:text-[11px] font-bold uppercase tracking-widest border border-blue-100">
          Registered Address
        </span>
        <span className="text-slate-400 text-xs md:text-sm font-semibold flex items-center gap-1">
          <Globe size={12} className="md:size-4" /> Tamil Nadu, India 
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl md:text-3xl font-bold text-slate-900 mb-1 md:mb-2 leading-tight">
        63 B/5, Vallioor
      </h3>

      {/* Sub text */}
      <p className="text-slate-500 text-sm md:text-lg leading-relaxed max-w-2xl">
        Tirunelveli Dt - 627 117
      </p>
    </div>
  </div>
</motion.div>

  {/* =================== PHONE =================== */}
  <motion.a 
    href="tel:+919626806328"
    variants={item}
    whileHover={{ y: -8 }}
    className="group relative p-8 bg-white rounded-[2rem] border border-slate-100 shadow-lg hover:border-orange-200 transition-all duration-300"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    <div className="relative z-10">
      <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mb-6 group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300">
        <Phone size={28} />
      </div>
      <h4 className="text-lg font-bold text-slate-900 mb-1">Direct Line</h4>
      <p className="text-2xl font-bold text-slate-700 group-hover:text-orange-600 transition-colors">
        +91 96268 06328
      </p>
      <p className="text-sm text-slate-400 mt-2 font-medium">
        Mon–Fri • 9am – 6pm
      </p>
    </div>
  </motion.a>

  {/* =================== LINKEDIN =================== */}
  <motion.a 
    href="https://www.linkedin.com/company/free-will-technologies/"
    target="_blank"
    rel="noreferrer"
    variants={item}
    whileHover={{ y: -8 }}
    className="group relative p-8 bg-white rounded-[2rem] border border-slate-100 shadow-lg hover:border-blue-200 transition-all duration-300"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    <div className="relative z-10">
      <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-6 group-hover:bg-[#0077b5] group-hover:text-white transition-colors duration-300">
        <Linkedin size={28} />
      </div>
      <h4 className="text-lg font-bold text-slate-900 mb-1">Professional Network</h4>
      <p className="text-xl font-bold text-slate-700 group-hover:text-[#0077b5] transition-colors truncate">
        Frontier Wox Technologies
      </p>
      <p className="text-sm text-slate-400 mt-2 font-medium flex items-center gap-1">
        Connect for Collaborations <ArrowUpRight size={14} />
      </p>
    </div>
  </motion.a>

  {/* =================== INSTAGRAM =================== */}
  <motion.a 
    href="https://www.instagram.com/freewill_tech"
    target="_blank"
    rel="noreferrer"
    variants={item}
    whileHover={{ y: -8 }}
    className="group relative p-8 bg-white rounded-[2rem] border border-slate-100 shadow-lg hover:border-pink-200 transition-all duration-300"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    <div className="relative z-10">
      <div className="w-14 h-14 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center mb-6 group-hover:bg-gradient-to-tr group-hover:from-yellow-500 group-hover:via-red-500 group-hover:to-purple-600 group-hover:text-white transition-all duration-300">
        <Instagram size={28} />
      </div>
      <h4 className="text-lg font-bold text-slate-900 mb-1">Life at Frontier Wox</h4>
      <p className="text-xl font-bold text-slate-700 group-hover:text-pink-600 transition-colors">
        @freewill_tech
      </p>
      <p className="text-sm text-slate-400 mt-2 font-medium flex items-center gap-1">
        Follow our Journey <ArrowUpRight size={14} />
      </p>
    </div>
  </motion.a>

  {/* =================== EMAIL (NEW CARD) =================== */}
  <motion.a 
    href="mailto:contact@freewilltech.in"
    variants={item}
    whileHover={{ y: -8 }}
    className="group relative p-8 bg-white rounded-[2rem] border border-slate-100 shadow-lg hover:border-green-200 transition-all duration-300"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

    <div className="relative z-10">
      <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
        <Mail size={28} />
      </div>
      <h4 className="text-lg font-bold text-slate-900 mb-1">Email Us</h4>
      <p className="text-xl font-bold text-slate-700 group-hover:text-green-600 transition-colors truncate">
        contact@freewilltech.in
      </p>
      <p className="text-sm text-slate-400 mt-2 font-medium flex items-center gap-1">
        Send a Message <ArrowUpRight size={14} />
      </p>
    </div>
  </motion.a>

</motion.div>
      </div>
    </section>
  );
};

// --- MAIN EXPORT ---
export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen">
      <ContactHeader />
      <ContactInfo />
    </div>
  );
}