import React from "react";
import { motion } from "framer-motion";
import { 
  Phone, Mail, MapPin, Globe, 
  ArrowUpRight, Building2, Smartphone, Linkedin, Instagram 
} from "lucide-react";

// --- ANIMATION VARIANTS ---
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

// --- DATA: FREE WILL TECHNOLOGIES ---
const directContact = [
  {
    title: "Phone",
    value: "+91 96268 06328",
    sub: "Mon-Fri 9am-6pm",
    icon: Smartphone,
    action: "Call Now",
    href: "tel:+919626806328",
    color: "blue"
  },
  {
    title: "Email",
    value: "contact@freewilltech.in",
    sub: "Online Support 24/7",
    icon: Mail,
    action: "Send Email",
    href: "mailto:contact@freewilltech.in",
    color: "orange"
  }
];

export default function ContactCards() {
  return (
    <section className="relative w-full py-24 bg-white font-sans overflow-hidden">
      
      {/* --- BACKGROUND FX --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/50 blur-[120px] rounded-full opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-100/50 blur-[120px] rounded-full opacity-60 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-widest mb-4"
          >
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            Here to Help
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6"
          >
            Let’s Talk About Your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-500">
              Next Big Move
            </span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-500 max-w-2xl mx-auto"
          >
            Whether you need technical expertise, career guidance, or digital transformation, we are just a click away.
          </motion.p>
        </div>

        {/* --- SECTION 1: INSTANT CONTACT (PHONE / EMAIL) --- */}
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24 max-w-4xl mx-auto"
        >
          {directContact.map((contact, i) => (
            <motion.a
              key={i}
              href={contact.href}
              variants={item}
              whileHover={{ y: -5 }}
              className={`group relative flex items-center gap-6 p-8 bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden transition-all duration-300 hover:border-${contact.color}-200`}
            >
              {/* Hover Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-r from-${contact.color}-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              {/* Icon */}
              <div className={`relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 transition-colors duration-300 ${
                contact.color === 'blue' ? 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white' : 'bg-orange-50 text-orange-500 group-hover:bg-orange-500 group-hover:text-white'
              }`}>
                <contact.icon size={32} strokeWidth={1.5} />
              </div>

              {/* Text */}
              <div className="relative z-10">
                <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-1">{contact.title}</p>
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 group-hover:text-blue-900 transition-colors break-all md:break-normal">
                  {contact.value}
                </h3>
                <div className="flex items-center gap-2 mt-2 text-sm font-medium text-slate-500 group-hover:text-slate-700">
                  {contact.action} <ArrowUpRight size={16} />
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

      </div>
    </section>
  );
}