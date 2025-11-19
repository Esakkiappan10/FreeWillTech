// src/components/steps/ExperienceStep.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ExperienceStep = ({ resumeData, updateResumeData }) => {
  const [activeTab, setActiveTab] = useState('work');
  
  const handleChange = (index, field, value) => {
    const updatedExperience = [...resumeData.experience];
    updatedExperience[index][field] = value;
    updateResumeData({ experience: updatedExperience });
  };

  const toggleInternship = (index) => {
    const updatedExperience = [...resumeData.experience];
    updatedExperience[index].isInternship = !updatedExperience[index].isInternship;
    updateResumeData({ experience: updatedExperience });
  };

  const addExperience = (isInternship = false) => {
    updateResumeData({
      experience: [
        ...resumeData.experience,
        {
          company: '',
          position: '',
          duration: '',
          responsibilities: '',
          isInternship: isInternship
        }
      ]
    });
    
    // Switch to the appropriate tab when adding new experience
    setActiveTab(isInternship ? 'internship' : 'work');
  };

  const removeLastExperience = (isInternship) => {
    if (resumeData.experience.length <= 1) return;
    
    // Find the last experience of the given type
    const experiences = [...resumeData.experience];
    let indexToRemove = -1;
    
    for (let i = experiences.length - 1; i >= 0; i--) {
      if (experiences[i].isInternship === isInternship) {
        indexToRemove = i;
        break;
      }
    }
    
    if (indexToRemove !== -1) {
      experiences.splice(indexToRemove, 1);
      updateResumeData({ experience: experiences });
    }
  };

  // Filter experiences by type
  const workExperiences = resumeData.experience.filter(exp => !exp.isInternship);
  const internships = resumeData.experience.filter(exp => exp.isInternship);

  const renderExperienceCard = (exp, index, originalIndex) => (
    <motion.div
      key={originalIndex}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 relative mb-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      {/* Experience Header */}
      <div className="flex flex-wrap justify-between items-center mb-5 gap-3">
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-700 mr-3">
            Experience Type:
          </span>
          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
            <button
              type="button"
              className={`px-4 py-1.5 text-sm font-medium transition-colors ${
                !exp.isInternship
                  ? 'bg-indigo-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => toggleInternship(originalIndex)}
            >
              Full-time
            </button>
            <div className="h-5 w-px bg-gray-300"></div>
            <button
              type="button"
              className={`px-4 py-1.5 text-sm font-medium transition-colors ${
                exp.isInternship
                  ? 'bg-indigo-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => toggleInternship(originalIndex)}
            >
              Internship
            </button>
          </div>
        </div>
        
        <div className="text-sm font-medium text-gray-500">
          {exp.isInternship ? 'Internship' : 'Work Experience'} #{index + 1}
        </div>
      </div>

      {/* Company and Position */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {exp.isInternship ? 'Organization*' : 'Company*'}
          </label>
          <input
            type="text"
            value={exp.company}
            onChange={(e) => handleChange(originalIndex, 'company', e.target.value)}
            className="w-full bg-white rounded-lg p-3 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
            placeholder={exp.isInternship ? 'Organization Name' : 'Company Name'}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {exp.isInternship ? 'Intern Role*' : 'Position*'}
          </label>
          <input
            type="text"
            value={exp.position}
            onChange={(e) => handleChange(originalIndex, 'position', e.target.value)}
            className="w-full bg-white rounded-lg p-3 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
            placeholder={exp.isInternship ? 'Intern Position' : 'Job Title'}
            required
          />
        </div>
      </div>

      {/* Duration and Tech Stack */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Duration*
          </label>
          <input
            type="text"
            value={exp.duration}
            onChange={(e) => handleChange(originalIndex, 'duration', e.target.value)}
            className="w-full bg-white rounded-lg p-3 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
            placeholder="Jan 2020 - Present"
            required
          />
          <p className="mt-1 text-xs text-gray-500">
            Format: Month Year - Month Year or "Present"
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Technologies Used
          </label>
          <input
            type="text"
            value={exp.technologies || ''}
            onChange={(e) => handleChange(originalIndex, 'technologies', e.target.value)}
            className="w-full bg-white rounded-lg p-3 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
            placeholder={exp.isInternship ? 'Technologies learned' : 'Tech stack used'}
          />
          <p className="mt-1 text-xs text-gray-500">
            Separate technologies with commas
          </p>
        </div>
      </div>

      {/* Responsibilities */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {exp.isInternship ? 'Responsibilities & Learnings*' : 'Responsibilities & Achievements*'}
        </label>
        <textarea
          value={exp.responsibilities}
          onChange={(e) => handleChange(originalIndex, 'responsibilities', e.target.value)}
          className="w-full bg-white rounded-lg p-3 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
          rows="4"
          placeholder={
            exp.isInternship 
              ? 'Describe your responsibilities, key learnings, and projects...' 
              : 'Describe your responsibilities, achievements, and impact...'
          }
          required
        ></textarea>
        <p className="mt-1 text-xs text-gray-500">
          Use bullet points in your descriptions (start each with • or -)
        </p>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-8">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200">
        <button
          className={`px-4 py-3 font-medium text-sm sm:text-base flex items-center ${
            activeTab === 'work' 
              ? 'text-indigo-600 border-b-2 border-indigo-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('work')}
        >
          <i className="fas fa-briefcase mr-2"></i>
          Work Experience {workExperiences.length > 0 && `(${workExperiences.length})`}
        </button>
        
        <button
          className={`px-4 py-3 font-medium text-sm sm:text-base flex items-center ${
            activeTab === 'internship' 
              ? 'text-indigo-600 border-b-2 border-indigo-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('internship')}
        >
          <i className="fas fa-graduation-cap mr-2"></i>
          Internships {internships.length > 0 && `(${internships.length})`}
        </button>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {/* Work Experience Tab */}
        {activeTab === 'work' && (
          <div>
            <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <i className="fas fa-briefcase text-indigo-500 mr-3"></i>
                Work Experience
              </h3>
              
              <div className="flex gap-2">
                <motion.button
                  onClick={() => removeLastExperience(false)}
                  disabled={workExperiences.length === 0}
                  whileHover={workExperiences.length > 0 ? { scale: 1.05 } : {}}
                  whileTap={workExperiences.length > 0 ? { scale: 0.95 } : {}}
                  className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    workExperiences.length === 0 
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                      : 'bg-red-500 hover:bg-red-600 text-white'
                  }`}
                >
                  <i className="fas fa-minus mr-2 text-xs"></i> Remove
                </motion.button>
                
                <motion.button
                  onClick={() => addExperience(false)}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="fas fa-plus mr-2 text-xs"></i> Add Work Experience
                </motion.button>
              </div>
            </div>

            {workExperiences.length === 0 ? (
              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-8 text-center">
                <i className="fas fa-briefcase text-indigo-400 text-4xl mb-4"></i>
                <h4 className="text-lg font-medium text-gray-700 mb-2">No Work Experience Added</h4>
                <p className="text-gray-600 mb-4">Add your professional work experience to showcase your career journey</p>
                <motion.button
                  onClick={() => addExperience(false)}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-medium flex items-center mx-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="fas fa-plus mr-2"></i> Add First Work Experience
                </motion.button>
              </div>
            ) : (
              workExperiences.map((exp, index) => {
                // Find original index in main experience array
                const originalIndex = resumeData.experience.findIndex(
                  e => e === exp
                );
                return renderExperienceCard(exp, index, originalIndex);
              })
            )}
          </div>
        )}

        {/* Internship Tab */}
        {activeTab === 'internship' && (
          <div>
            <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <i className="fas fa-graduation-cap text-indigo-500 mr-3"></i>
                Internships
              </h3>
              
              <div className="flex gap-2">
                <motion.button
                  onClick={() => removeLastExperience(true)}
                  disabled={internships.length === 0}
                  whileHover={internships.length > 0 ? { scale: 1.05 } : {}}
                  whileTap={internships.length > 0 ? { scale: 0.95 } : {}}
                  className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    internships.length === 0 
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                      : 'bg-red-500 hover:bg-red-600 text-white'
                  }`}
                >
                  <i className="fas fa-minus mr-2 text-xs"></i> Remove
                </motion.button>
                
                <motion.button
                  onClick={() => addExperience(true)}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="fas fa-plus mr-2 text-xs"></i> Add Internship
                </motion.button>
              </div>
            </div>

            {internships.length === 0 ? (
              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-8 text-center">
                <i className="fas fa-graduation-cap text-indigo-400 text-4xl mb-4"></i>
                <h4 className="text-lg font-medium text-gray-700 mb-2">No Internships Added</h4>
                <p className="text-gray-600 mb-4">Add your internship experiences to highlight your practical learning</p>
                <motion.button
                  onClick={() => addExperience(true)}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-medium flex items-center mx-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="fas fa-plus mr-2"></i> Add First Internship
                </motion.button>
              </div>
            ) : (
              internships.map((exp, index) => {
                // Find original index in main experience array
                const originalIndex = resumeData.experience.findIndex(
                  e => e === exp
                );
                return renderExperienceCard(exp, index, originalIndex);
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceStep;