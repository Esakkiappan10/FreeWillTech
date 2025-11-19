import React from "react";
import { Clock4, Phone, Mail, Linkedin, Instagram } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const TopNav = () => {
  return (
    <div className="hidden lg:block bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between py-3 px-[5%] text-sm font-[Nunito]">
        {/* Left Section */}
        <div className="flex items-center gap-8">
          {/* Working Hours */}
          <div className="flex items-center gap-2 border-r pr-6">
            <Clock4 className="text-primary-dark w-5 h-5" />
            <div>
              <p className="text-gray-500 text-xs">Mon – Fri:</p>
              <p className="font-semibold text-gray-800">10 AM – 7 PM</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-2 border-r pr-6">
            <Phone className="text-primary-dark w-5 h-5" />
            <div>
              <p className="text-gray-500 text-xs">Call Us:</p>
              <p className="font-semibold text-gray-800">+91 96268 06328</p>
            </div>
          </div>

          {/* Mail */}
          <div className="flex items-center gap-2">
            <Mail className="text-primary-dark w-5 h-5" />
            <div>
              <p className="text-gray-500 text-xs">Email:</p>
              <p className="font-semibold text-gray-800">hr@freewilltech.in</p>
            </div>
          </div>
        </div>

        {/* Right Section – Social Icons */}
        <div className="flex items-center gap-3">
          <a
            href="https://www.linkedin.com/company/free-will-technologies/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 flex items-center justify-center rounded-md bg-[#E6F2FF] hover:bg-[#1E9CD7] transition-all duration-300"
            title="LinkedIn"
          >
            <Linkedin className="w-4 h-4 text-[#1E9CD7] hover:text-white transition-colors" />
          </a>

          <a
            href="https://www.instagram.com/freewill_tech/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 flex items-center justify-center rounded-md bg-[#FFF1F3] hover:bg-[#D1005C] transition-all duration-300"
            title="Instagram"
          >
            <Instagram className="w-4 h-4 text-[#D1005C] hover:text-white transition-colors" />
          </a>

          <a
            href="https://wa.me/919626806328"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 flex items-center justify-center rounded-md bg-[#E8FFF2] hover:bg-[#25D366] transition-all duration-300"
            title="WhatsApp"
          >
            <FaWhatsapp className="w-4 h-4 text-[#25D366] hover:text-white transition-colors" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
