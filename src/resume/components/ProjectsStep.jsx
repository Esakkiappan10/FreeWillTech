// src/components/steps/ProjectsStep.jsx
import React from 'react';
import { motion } from 'framer-motion';

const ProjectsStep = ({ resumeData, updateResumeData }) => {
  const handleChange = (index, field, value) => {
    const updatedProjects = [...resumeData.projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value
    };
    updateResumeData({ projects: updatedProjects });
  };

  const addProject = () => {
    updateResumeData({
      projects: [
        ...resumeData.projects,
        {
          title: '',
          duration: '',
          technologies: '',
          description: '',
          link: ''
        }
      ]
    });
  };

  const clearProjects = () => {
    updateResumeData({ projects: [] });
  };

  // New function to remove individual project
  const removeProject = (index) => {
    const updatedProjects = [...resumeData.projects];
    updatedProjects.splice(index, 1);
    updateResumeData({ projects: updatedProjects });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center">
          <i className="fas fa-project-diagram text-indigo-500 mr-3"></i>
          Projects
        </h3>
        
        <div className="flex gap-2">
          <motion.button
            onClick={clearProjects}
            disabled={resumeData.projects.length === 0}
            whileHover={resumeData.projects.length > 0 ? { scale: 1.05 } : {}}
            whileTap={resumeData.projects.length > 0 ? { scale: 0.95 } : {}}
            className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              resumeData.projects.length === 0 
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                : 'bg-red-500 hover:bg-red-600 text-white'
            }`}
          >
            <i className="fas fa-trash-alt mr-2 text-xs"></i> Clear All
          </motion.button>
          
          <motion.button
            onClick={addProject}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fas fa-plus mr-2 text-xs"></i> Add Project
          </motion.button>
        </div>
      </div>

      <div className="space-y-6">
        {resumeData.projects.map((project, index) => (
          <motion.div 
            key={index} 
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="absolute top-5 right-5 flex items-center gap-2">
              <span className="text-sm font-medium text-gray-500">
                Project #{index + 1}
              </span>
              
              {/* Individual remove button */}
              <motion.button
                onClick={() => removeProject(index)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-red-500 hover:text-red-700 transition-colors"
                title="Remove this project"
              >
                <i className="fas fa-times-circle"></i>
              </motion.button>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">Project Title*</label>
              <input
                type="text"
                value={project.title}
                onChange={(e) => handleChange(index, 'title', e.target.value)}
                className="w-full rounded-lg p-3 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
                placeholder="E-commerce Website"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration*</label>
                <input
                  type="text"
                  value={project.duration}
                  onChange={(e) => handleChange(index, 'duration', e.target.value)}
                  className="w-full rounded-lg p-3 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
                  placeholder="Mar 2022 - Jun 2022"
                  required
                />
                <p className="mt-1 text-xs text-gray-500">
                  Format: Month Year - Month Year or "Present"
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Technologies*</label>
                <input
                  type="text"
                  value={project.technologies}
                  onChange={(e) => handleChange(index, 'technologies', e.target.value)}
                  className="w-full rounded-lg p-3 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
                  placeholder="React, Node.js, MongoDB"
                  required
                />
                <p className="mt-1 text-xs text-gray-500">
                  Separate technologies with commas
                </p>
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description*</label>
              <textarea
                value={project.description}
                onChange={(e) => handleChange(index, 'description', e.target.value)}
                className="w-full rounded-lg p-3 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
                rows="4"
                placeholder="Describe the project, your contributions, and achievements..."
                required
              ></textarea>
              <p className="mt-1 text-xs text-gray-500">
                Use bullet points in your descriptions (start each with • or -)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Project Link</label>
              <input
                type="url"
                value={project.link}
                onChange={(e) => handleChange(index, 'link', e.target.value)}
                className="w-full rounded-lg p-3 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
                placeholder="https://github.com/username/project"
              />
              <p className="mt-1 text-xs text-gray-500">
                Include a live demo or repository link
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectsStep;