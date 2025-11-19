// src/components/Hero.js
import React from 'react';
import { motion } from 'framer-motion';

const Hero = ({ onStartBuilding }) => {
  return (
    <section id="hero" className="text-center py-20 mb-16 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-100 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-indigo-100 rounded-full blur-3xl opacity-30"></div>
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-6 text-gray-800"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Create Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Professional Resume</span> in Minutes
        </motion.h1>
        
        <motion.p 
          className="text-xl text-gray-600 mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Stand out from the crowd with our beautifully designed resume templates. Easy to use and trusted by professionals worldwide.
        </motion.p>
        
        <div className="flex flex-wrap justify-center gap-4 hero-buttons">
          <motion.button 
            onClick={onStartBuilding}
            className="px-8 py-4 rounded-xl text-lg font-semibold text-white shadow-xl"
            style={{ 
              background: 'linear-gradient(90deg, #fd6405ff 0%, #fe6e07ff 100%)',
              boxShadow: '0 10px 25px -5px rgba(252, 115, 11, 0.5)'
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: '0 15px 30px -5px rgba(249, 125, 0, 0.7)' 
            }}
            whileTap={{ scale: 0.98 }}
          >
            <i className="fas fa-bolt mr-2"></i> Start Building Now
          </motion.button>
          
          <motion.button 
            className="px-8 py-4 rounded-xl text-lg font-semibold text-white shadow-xl"
            style={{ 
              background: 'linear-gradient(90deg, #4b5563 0%, #1f2937 100%)',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)'
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: '0 15px 30px -5px rgba(0, 0, 0, 0.3)' 
            }}
            whileTap={{ scale: 0.98 }}
          >
            <i className="fas fa-eye mr-2"></i> View Samples
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Hero;