// src/components/Examples.jsx
import React from 'react';
import { motion } from 'framer-motion';

const exampleData = [
  {
    title: 'Modern Tech',
    description: 'Perfect for developers and engineers',
    gradient: 'from-blue-500 to-indigo-600',
    delay: 0
  },
  {
    title: 'Creative Design',
    description: 'Ideal for designers and artists',
    gradient: 'from-green-500 to-teal-500',
    delay: 0.01
  },
  {
    title: 'Executive',
    description: 'For managers and leadership roles',
    gradient: 'from-purple-500 to-indigo-500',
    delay: 0.02
  }
];

const Examples = () => {
  return (
    <section id="examples" className="py-16 px-4 lg:px-8 max-w-7xl mx-auto">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Resume Samples
      </motion.h2>

      <motion.p
        className="text-gray-600 text-center max-w-2xl mx-auto mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
      >
        See how professionals present their experience with our templates
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {exampleData.map((example, idx) => (
          <motion.div
            key={idx}
            className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transform transition duration-500"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: example.delay }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
          >
            <div className={`h-48 bg-gradient-to-r ${example.gradient} relative`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white w-32 h-40 rounded shadow-inner p-4">
                  <div className="h-2 bg-gray-200 mb-2 rounded"></div>
                  <div className="h-2 bg-gray-200 mb-2 rounded w-3/4"></div>
                  <div className="h-2 bg-gray-200 mb-4 rounded w-1/2"></div>
                  <div className="h-2 bg-gray-200 mb-2 rounded"></div>
                  <div className="h-2 bg-gray-200 mb-2 rounded w-2/3"></div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-gray-800">{example.title}</h3>
              <p className="text-gray-600 text-sm">{example.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Examples;