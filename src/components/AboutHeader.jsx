import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const AboutHeader = () => {
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      easing: "ease-out",
    });
  }, []);

  return (
    <header
      className="relative w-full font-[Nunito] overflow-hidden select-none"
      data-aos="fade-up"
    >
      <div
        className="relative w-full h-[230px] sm:h-[300px] md:h-[360px] lg:h-[420px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://ik.imagekit.io/HoneyJoe/freewill%20technologies%20assetss/about%20us.jpg?updatedAt=1744996046805')",
        }}
      >
        {/* Soft Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/40 backdrop-blur-[1px]" />

        {/* Floating Accent Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-40 animate-pulse" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          {/* Title */}
          <h1
            className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wide drop-shadow-xl"
            data-aos="fade-down"
          >
            About Us
          </h1>

          {/* Breadcrumb */}
          <p
            className="mt-2 text-sm sm:text-base md:text-lg text-gray-200 font-light"
            data-aos="fade-up"
            data-aos-delay="250"
          >
            <span className="text-primary font-semibold hover:opacity-80 transition-all cursor-pointer">
              Home
            </span>
            <span className="mx-2 text-white/70">/</span>
            <span className="opacity-90">About Us</span>
          </p>

          {/* Subtle animated underline */}
          <div
            className="mt-3 h-[3px] w-16 bg-primary/90 rounded-full"
            data-aos="zoom-in"
            data-aos-delay="400"
          />
        </div>
      </div>
    </header>
  );
};

export default AboutHeader;
