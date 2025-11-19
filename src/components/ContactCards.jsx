import React, { useEffect } from "react";
import { FaPhoneAlt, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const ContactCards = () => {
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  const contacts = [
    {
      title: "Phone",
      icon: <FaPhoneAlt size={26} />,
      description: "+91 96268 06328",
      href: "tel:+919626806328",
      bgImage:
        "https://ik.imagekit.io/HoneyJoe/freewill%20technologies%20assetss/5118756.jpg?updatedAt=1744995811309",
    },
    {
      title: "LinkedIn",
      icon: <FaLinkedinIn size={26} />,
      description: "linkedin.com/company/free-will-technologies",
      href: "https://www.linkedin.com/company/free-will-technologies/",
      bgImage:
        "https://ik.imagekit.io/HoneyJoe/freewill%20technologies%20assetss/10464412.png?updatedAt=1744995811295",
    },
    {
      title: "Instagram",
      icon: <FaInstagram size={26} />,
      description: "@freewilltechnologies",
      href: "https://www.instagram.com/freewill_tech",
      bgImage:
        "https://ik.imagekit.io/HoneyJoe/freewill%20technologies%20assetss/2227.jpg?updatedAt=1744995811112",
    },
  ];

  return (
    <section className="w-[95%] lg:w-[80%] mx-auto py-12 lg:py-20 font-[Nunito]">
      <div className="text-center mb-12" data-aos="fade-down">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-dark mb-3 drop-shadow-sm">
          Get in Touch
        </h2>
        <p className="text-gray-600 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          Connect with us on the platform you prefer — our team is always ready to assist.
        </p>
        <div className="mx-auto mt-4 h-1 w-20 bg-secondary rounded-full shadow-md"></div>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        data-aos="fade-up"
      >
        {contacts.map((contact, index) => (
          <a
            key={index}
            href={contact.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-[0_20px_40px_rgba(0,0,0,0.25)] 
                       transform hover:-translate-y-2 transition-all duration-700 bg-black/90"
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center scale-105 
                         group-hover:scale-110 transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ backgroundImage: `url(${contact.bgImage})` }}
            ></div>

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/55 to-black/70 
                            group-hover:from-black/65 group-hover:via-black/60 group-hover:to-black/80 
                            transition-all duration-700"></div>

            {/* Light Glow behind icon */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                            w-40 h-40 bg-white/10 rounded-full blur-2xl opacity-40 group-hover:opacity-60 
                            transition duration-700"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-center items-center text-center text-white h-[250px] sm:h-[260px] px-6">
              
              {/* Icon with Gradient Ring */}
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary-dark 
                                rounded-full opacity-60 blur-md group-hover:blur-lg transition-all duration-500"></div>

                <div className="bg-white text-primary-dark p-4 rounded-full shadow-xl 
                                group-hover:scale-110 transition-transform duration-300 relative z-10">
                  {contact.icon}
                </div>
              </div>

              <h3 className="mt-5 text-xl font-bold tracking-wide drop-shadow-sm">
                {contact.title}
              </h3>

              <p className="mt-2 text-sm sm:text-base text-gray-200 group-hover:text-white 
                            opacity-90 tracking-wide transition-all duration-300">
                {contact.description}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default ContactCards;
