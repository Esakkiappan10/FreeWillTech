import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const ContactHeader = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <header
      className="relative w-full font-[Nunito] overflow-hidden"
      data-aos="fade-up"
    >
     {/* Background Image */}
<div className="relative w-full h-[280px] sm:h-[350px] md:h-[420px] lg:h-[500px] overflow-hidden">

  <img
    src="https://th.bing.com/th/id/OIP.yzmdeL4yM8wzTm-EBOtwZQHaEL?w=286&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
    alt="Service Illustration"
    className="w-full h-full object-cover"
  />
      
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Text Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-wide drop-shadow-lg"
            data-aos="fade-down"
          >
            Contact Us
          </h1>

          <p
            className="mt-3 text-sm sm:text-base md:text-lg text-gray-200"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <span className="text-primary font-semibold hover:underline cursor-pointer transition-all duration-300">
              Home
            </span>{" "}
            <span className="mx-2">/</span> Contact
          </p>
        </div>
      </div>
    </header>
  );
};

export default ContactHeader;
