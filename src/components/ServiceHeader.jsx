import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const ServiceHeader = () => {
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
      <div
        className="w-full h-[280px] sm:h-[350px] md:h-[420px] lg:h-[500px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://ik.imagekit.io/HoneyJoe/freewill%20technologies%20assetss/Service_banner.jpg?updatedAt=1744961442259')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wide drop-shadow-lg"
            data-aos="fade-down"
          >
            Our Services
          </h1>
          <p
            className="text-sm sm:text-base md:text-lg text-gray-200 mt-3"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <span className="text-primary font-semibold hover:underline cursor-pointer transition-all duration-300">
              Home
            </span>{" "}
            <span className="mx-2">/</span> Services
          </p>
        </div>
      </div>
    </header>
  );
};

export default ServiceHeader;
