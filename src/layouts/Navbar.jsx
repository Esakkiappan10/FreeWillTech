import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Menu, X, Linkedin, Instagram, Mail, Clock, Phone, ChevronRight } from "lucide-react";
import logo from "../assets/fulllogo.png";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/service" },
  { name: "Products", path: "/products" },
  { name: "CSR", path: "/csr" }, 
  { name: "Contact", path: "/contact" },
  { name: "Testimonials", path: "/testimonials" },
  { name: "ResumeBuilder", path: "/resume" },
];

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/company/free-will-technologies/", color: "hover:bg-[#0077b5]" },
  { icon: Instagram, href: "https://www.instagram.com/freewill_tech/", color: "hover:bg-[#E1306C]" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();
  
  // Hide Top Bar on scroll behavior logic
  const topBarHeight = useTransform(scrollY, [0, 50], ["48px", "0px"]);
  const topBarOpacity = useTransform(scrollY, [0, 30], [1, 0]);
  const topBarOverFlow = useTransform(scrollY, [0, 50], ["visible", "hidden"]);

  // Detect scroll for glass effect on main nav
  useEffect(() => {
    const updateScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setIsOpen(false), [location]);

  return (
    <>
      {/* --- TOP BAR (Contact & Socials) --- */}
      <motion.div 
        style={{ height: topBarHeight, opacity: topBarOpacity, overflow: topBarOverFlow }}
        className="bg-[#0B1120] text-slate-300 text-[11px] sm:text-xs font-medium z-[60] relative border-b border-white/5 hidden lg:block"
      >
        <div className="max-w-[1400px] mx-auto px-6 h-full flex justify-between items-center">
          
          {/* Left: Contact Details */}
<div className="flex items-center gap-8 text-[15px] font-semibold">
  <div className="flex items-center gap-3">
    <Clock size={22} className="text-[#FE861B]" />
    <span className="text-[13px] font-semibold">Mon – Fri, 10:00 AM – 7:00 PM</span>
  </div>

  <div className="w-[1px] h-4 bg-slate-700" />

  <a
    href="mailto:contact@freewilltech.in"
    className="flex items-center gap-3 hover:text-white transition-colors"
  >
    <Mail size={22} className="text-[#1E9CD7]" />
    <span className="text-[13px] font-semibold">contact@freewilltech.in</span>
  </a>

  <div className="w-[1px] h-4 bg-slate-700" />

  <a
    href="tel:+919626806328"
    className="flex items-center gap-3 hover:text-white transition-colors"
  >
    <Phone size={22} className="text-[#1E9CD7]" />
    <span className="text-[13px] font-semibold">+91 96268 06328</span>
  </a>
</div>


          {/* Right: Socials */}
          <div className="flex items-center gap-3">
             <span>Follow Us:</span>
             <div className="flex gap-2">
                {socialLinks.map((item, i) => (
                  <a 
                    key={i} 
                    href={item.href} 
                    target="_blank" 
                    rel="noreferrer"
                    className={`p-1 rounded bg-slate-800 text-white transition-colors ${item.color}`}
                  >
                    <item.icon size={19} />
                  </a>
                ))}
             </div>
          </div>

        </div>
      </motion.div>

      {/* --- MAIN NAVIGATION (Sticky) --- */}
      <header
  className={`top-0 z-50 w-full transition-all duration-300
    lg:sticky lg:top-0
    fixed
    ${isScrolled
      ? "bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm h-20"
      : "bg-white/60 backdrop-blur-md h-24"
    }`}
>
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 group">
            <img 
              src={logo} 
              alt="Free Will Technologies" 
              className={`px-12 w-27 transition-all duration-300 ${isScrolled ? "h-12" : "h-24"}`} 
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link 
                  key={link.name} 
                  to={link.path}
                  className="relative px-4 py-2 group"
                >
                  <span className={`relative z-10 text-sm font-semibold transition-colors duration-300 ${
                    isActive ? "text-[#1E9CD7]" : "text-slate-600 group-hover:text-slate-900"
                  }`}>
                    {link.name}
                  </span>
                  
                  {/* Active Indicator */}
                  {isActive && (
                    <motion.div 
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-blue-50 rounded-full -z-0"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  
                  {/* Hover Indicator (if not active) */}
                  {!isActive && (
                     <span className="absolute bottom-1 left-4 right-4 h-[2px] bg-[#FE861B] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-slate-800 hover:bg-slate-100 rounded-full transition-colors"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>

        </div>
      </header>

      {/* --- MOBILE MENU DRAWER --- */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            />
            
            {/* Drawer */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-[280px] bg-white z-50 shadow-2xl lg:hidden flex flex-col"
            >
              {/* Header */}
              <div className="p-6 flex items-center justify-between border-b border-slate-100">
                 <span className="font-bold text-slate-900">Menu</span>
                 <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-slate-50 rounded-full">
                    <X size={20} className="text-slate-500" />
                 </button>
              </div>

              {/* Links */}
              <div className="flex-1 overflow-y-auto p-6 py-8">
                 <ul className="flex flex-col gap-4">
                    {navLinks.map((link, i) => (
                       <motion.li 
                         key={link.name}
                         initial={{ opacity: 0, x: 20 }}
                         animate={{ opacity: 1, x: 0 }}
                         transition={{ delay: i * 0.05 }}
                       >
                          <Link 
                            to={link.path} 
                            className={`text-lg font-medium block py-2 ${
                                location.pathname === link.path ? "text-[#1E9CD7]" : "text-slate-600"
                            }`}
                          >
                             {link.name}
                          </Link>
                       </motion.li>
                    ))}
                 </ul>
              </div>

              {/* Mobile Footer (Contact Info migrated here) */}
              <div className="p-6 bg-slate-50 border-t border-slate-100 space-y-4">
                 <div className="space-y-3 text-sm text-slate-600">
                    <div className="flex items-center gap-3">
                       <Mail size={16} className="text-[#FE861B]" />
                       <span>contact@freewilltech.in</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <Phone size={16} className="text-[#1E9CD7]" />
                       <span>+91 96268 06328</span>
                    </div>
                 </div>

                 <div className="flex gap-2 pt-2">
                    {socialLinks.map((item, i) => (
                        <a key={i} href={item.href} className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600">
                           <item.icon size={18} />
                        </a>
                    ))}
                 </div>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}