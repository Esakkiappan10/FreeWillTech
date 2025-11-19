import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const ContactSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <section className="w-[95%] lg:w-[85%] mx-auto py-14 lg:py-20 font-[Nunito]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

        {/* Contact Form */}
        <div
          data-aos="fade-right"
          className="
            bg-white/80 backdrop-blur-xl 
            p-8 md:p-10 rounded-3xl 
            shadow-[0_15px_40px_rgba(0,0,0,0.08)]
            border border-gray-200/70
            hover:shadow-[0_25px_70px_rgba(0,0,0,0.12)]
            transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
            hover:-translate-y-1
          "
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary-dark mb-3 tracking-tight">
            Get in Touch
          </h2>

          <p className="text-gray-600 mb-8 text-sm md:text-base leading-relaxed">
            Reach out to us anytime — our team is here to support you, answer questions, 
            and help bring your ideas to life.
          </p>

          <form className="space-y-5">

            <input
              type="text"
              placeholder="Your Name"
              required
              className="
                w-full px-5 py-3 text-sm md:text-base
                border border-gray-300/70 rounded-xl
                bg-white/90 backdrop-blur-sm
                focus:outline-none focus:ring-[3px] focus:ring-secondary/40
                hover:border-primary-dark/40
                transition-all duration-300
              "
            />

            <input
              type="email"
              placeholder="Your Email"
              required
              className="
                w-full px-5 py-3 text-sm md:text-base
                border border-gray-300/70 rounded-xl
                bg-white/90 backdrop-blur-sm
                focus:outline-none focus:ring-[3px] focus:ring-secondary/40
                hover:border-primary-dark/40
                transition-all duration-300
              "
            />

            <input
              type="text"
              placeholder="Subject"
              className="
                w-full px-5 py-3 text-sm md:text-base
                border border-gray-300/70 rounded-xl
                bg-white/90 backdrop-blur-sm
                focus:outline-none focus:ring-[3px] focus:ring-secondary/40
                hover:border-primary-dark/40
                transition-all duration-300
              "
            />

            <textarea
              placeholder="Message"
              rows="5"
              required
              className="
                w-full px-5 py-3 text-sm md:text-base
                border border-gray-300/70 rounded-xl
                bg-white/90 backdrop-blur-sm
                focus:outline-none focus:ring-[3px] focus:ring-secondary/40
                hover:border-primary-dark/40
                transition-all duration-300
              "
            ></textarea>

            <button
              type="submit"
              className="
                w-full 
                bg-gradient-to-r from-primary-dark to-blue-500
                hover:from-blue-600 hover:to-blue-900
                text-white font-semibold py-3 px-6 rounded-xl
                shadow-md hover:shadow-lg 
                transition-all duration-400
                active:scale-[0.98]
              "
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Google Map */}
        <div
          data-aos="fade-left"
          className="
            rounded-3xl overflow-hidden 
            shadow-[0_15px_40px_rgba(0,0,0,0.1)]
            hover:shadow-[0_25px_70px_rgba(0,0,0,0.15)]
            transition-all duration-700 
            border border-gray-200/70
            hover:-translate-y-1
            bg-white/40 backdrop-blur-md
            h-[350px] sm:h-[400px] lg:h-[100%] min-h-[400px]
          "
        >
          <iframe
            title="Free Will Technologies Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.720158684828!2d78.68702687481633!3d10.815936158750836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b006fba9c50cb01%3A0x2e0be57ce4fefed6!2sSt.%20Joseph&#39;s%20College%2C%20Tiruchirappalli!5e0!3m2!1sen!2sin!4v1713444320844!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
