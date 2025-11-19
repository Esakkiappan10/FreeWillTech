import React, { useEffect } from "react";
import {
  Code,
  Palette,
  MonitorSmartphone,
  Layers,
  LayoutDashboard,
  Globe,
} from "lucide-react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const OurService = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  const services = [
    {
      icon: <LayoutDashboard size={38} className="text-secondary" />,
      title: "Web Design",
      description:
        "Crafting visually captivating, user-focused website interfaces that reflect your brand identity and values.",
    },
    {
      icon: <Code size={38} className="text-secondary" />,
      title: "Web Development",
      description:
        "Building robust, responsive, and dynamic websites with modern technologies for seamless digital experiences.",
    },
    {
      icon: <Palette size={38} className="text-secondary" />,
      title: "Graphic Design",
      description:
        "Designing creative brand assets, visuals, and marketing materials that make a lasting impact.",
    },
    {
      icon: <MonitorSmartphone size={38} className="text-secondary" />,
      title: "App Development",
      description:
        "Developing efficient and scalable mobile apps for Android and iOS that boost business engagement.",
    },
    {
      icon: <Layers size={38} className="text-secondary" />,
      title: "CMS-Based Development",
      description:
        "Delivering flexible CMS platforms for effortless management of your content and website structure.",
    },
    {
      icon: <Globe size={38} className="text-secondary" />,
      title: "Business Portfolio Sites",
      description:
        "Creating professional, conversion-focused business portfolios that showcase your work globally.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section
      id="services"
      className="relative bg-[#F5FAFF] py-20 lg:py-28 px-[5%] lg:px-[9%] overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-10 right-0 w-[400px] h-[400px] bg-primary/10 blur-[100px] rounded-full z-0"></div>

      <div className="relative z-10 space-y-12">
        {/* Section Header */}
        <div
          className="space-y-5 text-center lg:text-left"
          data-aos="fade-up"
        >
          <h4 className="font-[Nunito] inline-block border-l-4 border-primary pl-3 text-primary font-semibold tracking-wide uppercase">
            Our Services
          </h4>

          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <h2 className="font-[Nunito] text-3xl sm:text-4xl lg:text-[48px] font-extrabold text-primary-dark leading-tight">
              We Offer a Wide Range of{" "}
              <span className="text-primary">Digital Services</span>
            </h2>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              href="/service"
              className="bg-primary border border-primary px-8 py-3 rounded-lg text-white font-semibold hover:bg-white hover:text-secondary hover:border-secondary transition-all duration-300 shadow-lg"
            >
              See More
            </motion.a>
          </div>
        </div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                scale: 1.03,
                y: -5,
                transition: { type: "spring", stiffness: 200 },
              }}
              className="bg-white border border-primary/10 rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="flex items-center justify-center mb-6 w-14 h-14 rounded-full bg-primary/10 group-hover:bg-secondary/10 transition-all duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-primary mb-3 font-[Nunito]">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base font-[Nunito] leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default OurService;
