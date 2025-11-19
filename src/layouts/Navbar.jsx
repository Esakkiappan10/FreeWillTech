// Enhanced Premium Compact Unified Navigation Header.jsx
import React, { useState, useEffect, useRef } from "react";
import { Phone, Mail, Menu, X, Linkedin, Instagram } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/fulllogo.png";

/* Touch Detection */
const isTouchDevice = () =>
  "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

/* Magnetic Hover Hook */
function useMagnetic() {
  const ref = useRef(null);

  useEffect(() => {
    if (isTouchDevice()) return;
    const el = ref.current;
    if (!el) return;

    const strength = 26;

    const move = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      el.style.transform = `translate(${x / strength}px, ${y / strength}px)`;
    };

    const reset = () => (el.style.transform = "translate(0,0)");

    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", reset);

    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", reset);
    };
  }, []);

  return ref;
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Products", path: "/products"},
    { name: "Services", path: "/service" },
    { name: "Testimonials", path: "/testimonials" },
     { name: "CSR Activities", path: "/csr" },
    { name: "Contact", path: "/contact" },
    { name: "Resume Builder", path: "/resume" },
  ];

  /* Auto close mobile menu on route change */
  useEffect(() => setOpen(false), [location]);

  return (
    <header className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-100 font-[Nunito] transition-all">
  <div className="max-w-[1400px] mx-auto px-[5%] py-3 flex items-center justify-between gap-4">


        {/* Logo */}
        <Link to="/" className="flex items-center">
          <motion.img
            src={logo}
            alt="FreeWillTech"
            className="h-14 w-auto drop-shadow-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-7 xl:gap-8 items-center text-[14px] font-medium">

          {links.map((l) => {
            const ref = useMagnetic();
            const active = location.pathname === l.path;
            return (
              <li key={l.name} className="relative">
                <Link
                  ref={ref}
                  to={l.path}
                  className={`transition-all ${active ? "text-primary font-semibold" : "text-gray-700 hover:text-primary"}`}
                >
                  <motion.span whileHover={{ scale: 1.12 }}>{l.name}</motion.span>

                  <motion.div
                    className="absolute bottom-[-4px] left-0 h-[2px] bg-primary rounded"
                    initial={{ width: 0 }}
                    animate={{ width: active ? "100%" : 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.25 }}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right Contact Block */}
        <div className="hidden lg:flex items-center gap-5">

          
      <div className="flex items-center gap-3.5">
        <a
          className="social-btn bg-[#E6F2FF] hover:bg-[#1E9CD7]"
          href="https://www.linkedin.com/company/free-will-technologies/"
          target="_blank"
        >
          <Linkedin className="icon text-[#1E9CD7] hover:text-white" />
        </a>

        <a
          className="social-btn bg-[#FFF1F3] hover:bg-[#D1005C]"
          href="https://www.instagram.com/freewill_tech/"
          target="_blank"
        >
          <Instagram className="icon text-[#D1005C] hover:text-white" />
        </a>
      </div>
        </div>

        {/* Mobile Menu Button */}
        <button className="lg:hidden p-2 flex items-center justify-center" onClick={() => setOpen(!open)}>
          {open ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {open && (
         <motion.div
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -10 }}
  className="lg:hidden bg-white/90 backdrop-blur-xl shadow-xl rounded-b-2xl border-t border-gray-200"
>
  <ul className="flex flex-col items-center gap-5 py-7">
              {links.map((l) => (
                <li key={l.name}>
                  <Link
                    to={l.path}
                    className="text-gray-700 text-lg font-medium hover:text-primary transition"
                  >
                    {l.name}
                  </Link>
                </li>
              ))}

              {/* Compact Contact For Mobile */}
              <div className="flex gap-7 mt-4">

                <a href="tel:+919626806328"><Phone className="w-6 h-6 text-primary" /></a>
                <a href="mailto:contact@freewilltech.in"><Mail className="w-6 h-6 text-primary" /></a>
                <a href="https://wa.me/919626806328" target="_blank"><FaWhatsapp className="w-6 h-6 text-green-500" /></a>
              </div>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Social Button Styles */}
      <style>{`
        .social-btn {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          transition: all .3s ease;
        }
        .icon {
          width: 18px;
          height: 18px;
          transition: color .3s ease;
        }
      `}</style>
    </header>
  );
}