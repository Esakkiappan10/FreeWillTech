import React from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Mail, Phone } from "lucide-react";

export default function ContactSection() {
  
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section className="relative w-full py-24 bg-white font-sans overflow-hidden">
      
      {/* --- BACKGROUND FX --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/50 blur-[120px] rounded-full mix-blend-multiply opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-100/50 blur-[120px] rounded-full mix-blend-multiply opacity-60 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-widest mb-4"
          >
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            Get In Touch
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6"
          >
            Let's Start a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-500">Conversation</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-500 max-w-2xl mx-auto"
          >
            Have a project in mind or need technical support? Our team is ready to bring your ideas to life.
          </motion.p>
        </div>

        {/* --- MAIN GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* LEFT: FORM */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 relative overflow-hidden"
          >
             {/* Decor line */}
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-orange-500" />

            <form className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                  />
                </motion.div>
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="yourmail@example.com"
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                  />
                </motion.div>
              </div>

              <motion.div variants={itemVariants} className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Subject</label>
                <input
                  type="text"
                  placeholder="Project Inquiry / Support"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Message</label>
                <textarea
                  placeholder="Tell us about your project..."
                  rows="5"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 resize-none"
                ></textarea>
              </motion.div>

              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all duration-300"
              >
                Send Message <Send size={18} />
              </motion.button>
            </form>
          </motion.div>

          {/* RIGHT: MAP & INFO */}
          <motion.div 
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="relative h-full min-h-[500px] lg:min-h-auto rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-200 group"
          >
            {/* GOOGLE MAP IFRAME */}
            <iframe
              title="Free Will Technologies Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4660.23688817826!2d78.68875519222385!3d10.828409151135602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baaf52960c0703f%3A0x85c6e9b436f50934!2sFree%20Will%20Technologies!5e0!3m2!1sen!2sin!4v1763567644985!5m2!1sen!2sin" 
              style={{ border: 0, filter: "grayscale(20%) contrast(1.2)" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full transition-all duration-700 group-hover:filter-none"
            ></iframe>

            {/* FLOATING INFO CARD */}
            <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/90 backdrop-blur-xl border border-white/50 rounded-3xl shadow-2xl">
              <div className="flex flex-col gap-4">
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Our Location</h4>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                      St. Joseph’s College (Autonomous),<br /> Tiruchirappalli, Tamil Nadu
                    </p>
                  </div>
                </div>

                <div className="h-px w-full bg-slate-200" />

                <div className="grid grid-cols-2 gap-4">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                        <Mail size={16} />
                      </div>
                      <div className="overflow-hidden">
                        <h4 className="font-bold text-slate-900 text-xs">Email</h4>
                        <p className="text-slate-500 text-[10px] truncate">contact@freewilltech.in</p>
                      </div>
                   </div>

                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                        <Phone size={16} />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-xs">Phone</h4>
                        <p className="text-slate-500 text-[10px]">+91 96268 06328</p>
                      </div>
                   </div>
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}