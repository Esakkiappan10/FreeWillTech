// src/pages/Footer.jsx
import React from "react";
import { Linkedin, Instagram, Mail, MapPin, Phone, ChevronRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { logo } from "../assets/image"; 

const servicesDev = [
  "Web Development",
  "Mobile App Dev",
  "AI & Data Solutions",
  "E-Commerce",
  "Custom Software",
  "CMS Development",
  "EdTech / CBT"
];

const servicesDesign = [
  "Web Design",
  "UI/UX Design",
  "Graphic Design",
  "Branding Services",
  "IT Consulting",
  "Business Portfolios"
];

const companyLinks = [
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Services", href: "/service" },
  { name: "Products", href: "/products" },
  { name: "CSR Initiatives", href: "/csr" },
  { name: "Testimonials", href: "/testimonials" } 
];

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/company/free-w-will-technologies/", color: "hover:bg-[#0077b5] hover:border-[#0077b5]" },
  { icon: Instagram, href: "https://www.instagram.com/freewill_tech/", color: "hover:bg-[#E1306C] hover:border-[#E1306C]" },
  { icon: FaWhatsapp, href: "https://wa.me/916382503265", color: "hover:bg-[#25D366] hover:border-[#25D366]" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#123266] pt-8 pb-7 overflow-hidden font-sans text-slate-400 border-t border-slate-800/50">
      
      {/* --- Ambient Background Glows --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#1E9CD7]/5 rounded-full blur-[100px]" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FE861B]/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-10">
        
        {/* --- TOP ROW: Minimal Logo & Socials --- */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 border-b border-slate-800/50 pb-8">
            
            {/* Minimal Brand Identity */}
            <div className="flex items-center gap-3">
                <img src={logo} alt="Logo" className="w-10 h-10 rounded-full border border-slate-700" />
                <span className="text-xl font-bold text-white tracking-tight">
                    Free Will <span className="text-[#1E9CD7]">Technologies</span>
                </span>
            </div>

            {/* Compact Socials */}
            <div className="flex gap-2">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2.5 rounded-lg bg-slate-800/50 border border-slate-700 text-white transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${social.color}`}
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
        </div>

        {/* --- MAIN COMPACT GRID (2 cols Mobile, 4 cols Desktop) --- */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 mb-12">
          
            {/* COL 1: Dev Services */}
            <div>
                <h3 className="text-white font-bold text-sm mb-4">Development</h3>
                <ul className="space-y-2.5">
                    {servicesDev.map((item, i) => (
                        <li key={i}>
                            <a href="/service" className="text-xs md:text-sm hover:text-[#1E9CD7] transition-colors flex items-center gap-2 group">
                                <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-[#1E9CD7] transition-colors" />
                                {item}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            {/* COL 2: Design Services */}
            <div>
                <h3 className="text-white font-bold text-sm mb-4">Design & Strategy</h3>
                <ul className="space-y-2.5">
                    {servicesDesign.map((item, i) => (
                        <li key={i}>
                            <a href="/service" className="text-xs md:text-sm hover:text-[#FE861B] transition-colors flex items-center gap-2 group">
                                <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-[#FE861B] transition-colors" />
                                {item}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            {/* COL 3: Company */}
            <div>
                <h3 className="text-white font-bold text-sm mb-4">Company</h3>
                <ul className="space-y-2.5">
                    {companyLinks.map((link, i) => (
                        <li key={i}>
                            <a href={link.href} className="text-xs md:text-sm group flex items-center gap-1 hover:text-white transition-colors">
                                <ChevronRight className="w-3 h-3 text-[#1E9CD7] group-hover:translate-x-0.5 transition-transform" />
                                {link.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            {/* COL 4: Contact (Compact) */}
            <div>
                <h3 className="text-white font-bold text-sm mb-4">Get in Touch</h3>
                <div className="space-y-4">
                    <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-[#FE861B] mt-0.5 shrink-0" />
                        <p className="text-xs md:text-sm leading-relaxed">
                          Joseph Startup Centre, Trichy,<br/> Tamil Nadu - 620 002
                        </p>
                    </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-[#FE861B] mt-0.5 shrink-0" />
                        <p className="text-xs md:text-sm leading-relaxed">
                            <span className="text-orange-500 font-bold">Registered Address :</span> 63 B/5, Vallioor<br/>Tirunelveli Dt, Tamil Nadu,<br/> India - 627 117
                        </p>
                    </div>
              

                    <a href="mailto:contact@freewilltech.in" className="flex items-center gap-3 group">
                        <Mail className="w-4 h-4 text-[#1E9CD7] group-hover:text-white transition-colors" />
                        <span className="text-xs md:text-sm group-hover:text-white transition-colors">contact@freewilltech.in</span>
                    </a>

                    <a href="tel:+919626806328" className="flex items-center gap-3 group">
                        <Phone className="w-4 h-4 text-[#1E9CD7] group-hover:text-white transition-colors" />
                        <span className="text-xs md:text-sm group-hover:text-white transition-colors">+91 96268 06328</span>
                    </a>
                </div>
            </div>
        </div>

        {/* --- BOTTOM ROW --- */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-[10px] md:text-xs text-orange-500 border-t border-slate-800/50 pt-3">
          <p>© {currentYear} Free Will Technologies. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}