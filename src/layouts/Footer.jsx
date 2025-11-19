// Footer.jsx
import React from "react";
import { Linkedin, Instagram } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { logo } from "../assets/image";

export default function Footer() {
  return (
    <footer className="relative backdrop-blur-xl bg-white/60 border-t border-gray-200/60 text-gray-700 py-12">

      <div className="max-w-[1300px] mx-auto px-[5%]">

        {/* Top Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          {/* Brand */}
          <div className="flex items-center gap-4">
            <img
              src={logo}
              alt="FreeWill"
              className="w-14 h-14 rounded-full shadow-md bg-white/90"
            />
            <div>
              <div className="font-extrabold text-lg text-orange-500">
                Free Will Technologies
              </div>
              <div className="text-xs text-gray-500">
                Honest, transparent, results-driven.
              </div>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/company/free-will-technologies/"
              target="_blank"
              className="p-3 rounded-xl bg-white shadow-sm border border-gray-200 hover:bg-[#1E9CD7]/10 hover:border-[#1E9CD7] hover:scale-110 transition-all"
            >
              <Linkedin className="w-4 h-4 text-[#1E9CD7]" />
            </a>

            <a
              href="https://www.instagram.com/freewill_tech/"
              target="_blank"
              className="p-3 rounded-xl bg-white shadow-sm border border-gray-200 hover:bg-[#FE861B]/10 hover:border-[#FE861B] hover:scale-110 transition-all"
            >
              <Instagram className="w-4 h-4 text-[#FE861B]" />
            </a>

            <a
              href="https://wa.me/916382503265"
              target="_blank"
              className="p-3 rounded-xl bg-white shadow-sm border border-gray-200 hover:bg-[#25D366]/10 hover:border-[#25D366] hover:scale-110 transition-all"
            >
              <FaWhatsapp className="w-4 h-4 text-[#25D366]" />
            </a>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-300/40 my-8" />

        {/* Bottom Text */}
        <div className="text-center text-sm text-blue-700">
          © {new Date().getFullYear()} Free Will Technologies — All rights reserved.
        </div>
      </div>
    </footer>
  );
}
