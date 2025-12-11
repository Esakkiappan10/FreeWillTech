// GetInTouch.jsx
import React, { useState, useRef } from "react";
import { Mail, Phone, ArrowRight, MapPin } from "lucide-react";
import { motion, useInView } from "framer-motion";

export default function GetInTouch() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = (e) => {
  e.preventDefault();

  const { name, email, phone, service, message } = formData;

  const subject = `New Inquiry from ${name}`;

  // Use \r\n for universal mail app support
  const body = 
    `Name: ${name}\r\n` +
    `Email: ${email}\r\n` +
    `Phone: ${phone}\r\n` +
    `Service Required: ${service}\r\n\r\n` +
    `Message:\r\n${message}`;

  const mailtoLink = `mailto:hr@frontierwox.in?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  // This opens the email client with all fields filled
  window.location.href = mailtoLink;
};


  return (
    <section ref={ref} className="relative py-24 lg:py-32 px-6 bg-white overflow-hidden">
      
      {/* --- Ambient Background (Matching Offer/About) --- */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#1E9CD7]/5 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#FE861B]/5 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" />

      <div className="max-w-[1300px] mx-auto relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* LEFT: Info & Context */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-12"
          >
             <div>
                <span className="inline-block py-1 px-3 rounded-full bg-blue-50 border border-blue-100 text-[#1E9CD7] font-bold tracking-widest uppercase text-[10px] mb-6">
                    Contact Us
                </span>
                <h2 className="text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
                  Let’s start a <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E9CD7] to-[#FE861B]">
                    conversation.
                  </span>
                </h2>
                <p className="text-slate-500 text-lg md:text-xl max-w-md leading-relaxed">
                  Have a project in mind? Share your ideas with us. We help you build something scalable, beautiful, and functional.
                </p>
             </div>

             <div className="space-y-6">
                <ContactCard 
                    icon={Mail} 
                    label="Email Us" 
                    value="hr@frontierwox.in" 
                    href="mailto:hr@frontierwox.in"
                    color="text-[#FE861B]"
                />
                <ContactCard 
                    icon={Phone} 
                    label="Call Us" 
                    value="+91 96268 06328" 
                    href="tel:+919626806328"
                    color="text-[#1E9CD7]"
                />
             </div>
          </motion.div>

          {/* RIGHT: Premium Form */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] border border-slate-100 relative"
          >
             {/* Decorative Corner */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#1E9CD7]/5 to-transparent rounded-tr-[2.5rem] pointer-events-none" />

             <form onSubmit={handleSubmit} className="flex flex-col gap-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-8">
                   <InputGroup name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} />
                   <InputGroup name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                   <InputGroup name="phone" type="tel" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
                   <div className="relative pt-4 group">
                       <select 
                           name="service" 
                           value={formData.service} 
                           onChange={handleChange}
                           required
                           className="w-full bg-transparent border-b border-slate-200 py-3 text-slate-900 font-medium focus:outline-none focus:border-[#1E9CD7] transition-colors appearance-none cursor-pointer"
                       >
                           <option value="" disabled>Select a Service</option>
                           <option value="Web Development">Web Development</option>
                           <option value="App Development">App Development</option>
                           <option value="IT Solutions">IT Solutions</option>
                           <option value="Design & Branding">Design & Branding</option>
                       </select>
                       {/* Animated Line for Select */}
                       <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#1E9CD7] transition-all duration-300 group-focus-within:w-full" />
                   </div>
                </div>

                <div className="pt-4 group relative">
                   <textarea 
                       name="message" 
                       placeholder="Tell us about your project..." 
                       value={formData.message} 
                       onChange={handleChange}
                       required
                       rows={4}
                       className="w-full bg-transparent border-b border-slate-200 py-3 text-slate-900 font-medium focus:outline-none focus:border-[#1E9CD7] transition-colors resize-none placeholder:text-slate-400/80"
                   />
                   <div className="absolute bottom-2 left-0 w-0 h-[2px] bg-[#1E9CD7] transition-all duration-300 group-focus-within:w-full" />
                </div>

                <motion.button
                   whileHover={{ scale: 1.02, y: -2 }}
                   whileTap={{ scale: 0.98 }}
                   type="submit"
                   className="mt-6 py-5 px-8 bg-slate-900 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-[#FE861B] transition-all duration-300 shadow-xl shadow-slate-900/10 hover:shadow-orange-500/20"
                >
                   Send Message <ArrowRight size={20} />
                </motion.button>
             </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// Sub-components for cleaner code

const ContactCard = ({ icon: Icon, label, value, href, color }) => (
    <a href={href} className="flex items-center gap-6 p-5 rounded-3xl bg-slate-50 border border-slate-100 hover:border-blue-100 hover:bg-white hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 group">
        <div className={`w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm ${color} group-hover:scale-110 transition-transform duration-300`}>
            <Icon size={24} />
        </div>
        <div>
            <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">{label}</p>
            <p className="text-slate-900 font-bold text-lg md:text-xl group-hover:text-[#1E9CD7] transition-colors">{value}</p>
        </div>
    </a>
);

const InputGroup = ({ name, type = "text", placeholder, value, onChange }) => (
    <div className="relative pt-4 group">
        <input 
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required
            placeholder={placeholder}
            className="w-full bg-transparent border-b border-slate-200 py-3 text-slate-900 font-medium focus:outline-none focus:border-[#1E9CD7] transition-colors placeholder:text-slate-400/80"
        />
        {/* Animated Line */}
        <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#1E9CD7] transition-all duration-300 group-focus-within:w-full" />
    </div>
);