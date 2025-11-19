import React, { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { Briefcase, Rocket, Wrench } from "lucide-react";

const ClientProjects = () => {
  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  // ---------- CLIENTS ----------
  const clients = [
    {
      name: "Dr Julius Caesar",
      desc: "A personalized digital portfolio that highlights skills, achievements, and projects with a clean, modern interface. Designed to impress employers and clients through interactive design and detailed content. Optimized for visibility, performance, and lasting professional impact.",
    },
    {
      name: "Our Lady of Fatima School - Puthur",
      desc: "Clean, attractive ID cards designed to represent students with pride. Features personalized details, photos, and color themes aligned with college branding. Easy to print, long-lasting, and professionally finished.",
    },
    {
      name: "Jayaraj Annapackiam College for Women",
      desc: "Assisted in technical infrastructure setup and workspace software procurement.Supported staff and students in resolving technical issues to maintain uninterrupted digital operations.",
    },
  ];

  // ---------- PRODUCTS ----------
  const products = [
    {
      title: "Resume Builder",
      status: "Live",
      desc: "Create elegant, multi-template professional resumes in seconds with AI assistance.",
      icon: <Briefcase className="text-orange-500 w-6 h-6" />,
      img: "https://www.workruit.com/_next/image/?url=https:%2F%2Fd2rac4ixos46cj.cloudfront.net%2Fwebsiteimages%2Fimages%2Fpng%2FCV_Builder_best.png&w=1080&q=75",
    },
    {
      title: "Portfolio Builder",
      status: "Ongoing",
      desc: "Generate and host your personal portfolio website instantly with interactive sections and animations.",
      icon: <Rocket className="text-orange-500 w-6 h-6" />,
      img: "https://tse1.mm.bing.net/th/id/OIP.2g4_Zqc-IXcapal7GUfWlgHaET?rs=1&pid=ImgDetMain&o=7&rm=3",
    },
  ];

  return (
    <section className="relative py-20 px-4 sm:px-8 lg:px-[8%] bg-gradient-to-br from-[#F8FBFF] to-[#EEF5FF] font-[Nunito] overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-16 left-8 w-72 h-72 bg-green-200/25 blur-[120px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-green-100/20 blur-[130px] rounded-full"></div>

      {/* Clients Section */}
      <div className="text-center mb-14 relative z-10" data-aos="fade-up">
        <h2 className="text-3xl md:text-4xl font-extrabold text-primary-dark">
          Our Clients
        </h2>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          We collaborate with leading institutions and organizations to deliver
          impactful digital solutions.
        </p>
        <div className="mx-auto mt-4 h-1 w-16 bg-green-500 rounded-full"></div>
      </div>

      {/* Clients Grid */}
      <div
        data-aos="fade-up"
        data-aos-delay="100"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20 relative z-10"
      >
        {clients.map((client, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.7 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between text-center"
          >
            <h3 className="text-xl font-bold text-primary-dark mb-3">
              {client.name}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {client.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Products Section */}
      <div
        className="relative z-10 mt-10"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary-dark">
            Our Products
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Explore our in-house innovations that empower professionals and
            students to build their digital identity.
          </p>
          <div className="mx-auto mt-4 h-1 w-16 bg-green-500 rounded-full"></div>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
  {products.map((p, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.2, duration: 0.7 }}
      viewport={{ once: true }}
      className="bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
    >
      <img
        src={p.img}
        alt={p.title}
        className="w-full h-[220px] object-cover"
      />

      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          {p.icon}
          <h3 className="text-xl font-bold text-primary-dark">{p.title}</h3>

          {/* Dynamic Status Color */}
          <span
            className={`ml-auto text-xs font-semibold px-3 py-1 rounded-full ${
              p.status === "Live"
                ? "bg-green-100 text-green-700"
                : p.status === "Ongoing"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {p.status}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4">{p.desc}</p>

        {/* Only show Explore button for Resume Builder */}
        {p.title === "Resume Builder" && (
          <button
            onClick={() => (window.location.href = "https://resumebuilder.freewilltech.in/")}
            className="text-orange-600 font-semibold text-sm hover:underline flex items-center gap-1"
          >
            Explore <Wrench className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.div>
  ))}
</div>
      </div>
    </section>
  );
};

export default ClientProjects;
