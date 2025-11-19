// src/components/Features.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaMagic, FaPalette, FaCloudDownloadAlt } from 'react-icons/fa';

const FeatureCard = ({ IconComponent, title, description, delay }) => (
  <motion.div
    className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-100 shadow-md"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{
      y: -8,
      scale: 1.02,
      boxShadow: "0 25px 50px -12px rgba(99, 102, 241, 0.25)",
      transition: { 
        duration: 0.2,
        ease: "easeOut"
      }
    }}
    viewport={{ once: true }}
  >
    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-5">
      <IconComponent className="text-indigo-600 text-xl sm:text-2xl" />
    </div>
    <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{description}</p>
  </motion.div>
);

const Features = () => {
  const features = [
    {
      IconComponent: FaMagic,
      title: "AI-Powered Content",
      description:
        "Our AI suggests powerful action verbs and professional phrases to make your resume stand out."
    },
    {
      IconComponent: FaPalette,
      title: "Beautiful Templates",
      description:
        "Choose from dozens of professionally designed templates that pass ATS scanners."
    },
    {
      IconComponent: FaCloudDownloadAlt,
      title: "Easy Export",
      description:
        "Download as PDF, Word, or share online with a custom link. Perfect for email applications."
    }
  ];

  return (
    <section id="features" className="py-16 mb-20 bg-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-purple-50 opacity-30"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-center mb-4 text-gray-800"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Powerful Features
        </motion.h2>

        <motion.p
          className="text-gray-600 text-center max-w-2xl mx-auto mb-12 text-sm sm:text-base"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Everything you need to create the perfect resume that gets you hired
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              IconComponent={feature.IconComponent}
              title={feature.title}
              description={feature.description}
              delay={0.2 + index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;