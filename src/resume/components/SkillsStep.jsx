// src/components/steps/SkillsStep.jsx
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SkillCategory = React.memo(({ 
  title, 
  icon, 
  category, 
  items, 
  onArrayChange, 
  onAddItem, 
  onRemoveItem 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.3 }}
      className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm"
    >
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-sm font-semibold flex items-center text-gray-800">
          <i className={`${icon} text-indigo-500 mr-2`}></i>
          {title}
        </h4>
        <motion.button
          onClick={() => onAddItem(category)}
          className="text-indigo-600 hover:text-indigo-800 text-xs flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <i className="fas fa-plus mr-1 text-xs"></i> Add
        </motion.button>
      </div>

      <AnimatePresence>
        {items.map((skill, index) => (
          <motion.div
            key={`${category}-${index}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2 mb-2"
          >
            <input
              type="text"
              value={skill.name}
              onChange={(e) => onArrayChange(category, index, 'name', e.target.value)}
              placeholder="Skill name"
              className="flex-1 rounded-lg p-2 border border-gray-300 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <motion.button
              onClick={() => onRemoveItem(category, index)}
              className="text-red-500 hover:text-red-700 p-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <i className="fas fa-times text-xs"></i>
            </motion.button>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
});

const SkillsStep = ({ resumeData, updateResumeData }) => {
  // Use state for each category to prevent full re-renders
  const [softSkills, setSoftSkills] = useState(resumeData.softSkills || [{ name: '' }]);
  const [programmingSkills, setProgrammingSkills] = useState(resumeData.programmingSkills || [{ name: '' }]);
  const [frameworks, setFrameworks] = useState(resumeData.frameworks || [{ name: '' }]);
  const [certifications, setCertifications] = useState(resumeData.certifications || [{ name: '', issuer: '' }]);

  // Stable callback functions to prevent re-renders
  const handleArrayChange = useCallback((category, index, key, value) => {
    const setterMap = {
      softSkills: setSoftSkills,
      programmingSkills: setProgrammingSkills,
      frameworks: setFrameworks,
      certifications: setCertifications
    };
    
    const setter = setterMap[category];
    if (setter) {
      setter(prev => {
        const updated = [...prev];
        updated[index] = { ...updated[index], [key]: value };
        return updated;
      });
    }
  }, []);

  const handleAddItem = useCallback((category, item = { name: '' }) => {
    const setterMap = {
      softSkills: setSoftSkills,
      programmingSkills: setProgrammingSkills,
      frameworks: setFrameworks,
      certifications: setCertifications
    };
    
    const setter = setterMap[category];
    if (setter) {
      setter(prev => [...prev, item]);
    }
  }, []);

  const handleRemoveItem = useCallback((category, index) => {
    const setterMap = {
      softSkills: setSoftSkills,
      programmingSkills: setProgrammingSkills,
      frameworks: setFrameworks,
      certifications: setCertifications
    };
    
    const setter = setterMap[category];
    if (setter) {
      setter(prev => {
        if (prev.length <= 1) {
          // Return empty object to keep at least one field
          if (category === 'certifications') {
            return [{ name: '', issuer: '' }];
          }
          return [{ name: '' }];
        }
        return prev.filter((_, i) => i !== index);
      });
    }
  }, []);

  // Update parent only when needed
  React.useEffect(() => {
    updateResumeData({
      softSkills,
      programmingSkills,
      frameworks,
      certifications
    });
  }, [softSkills, programmingSkills, frameworks, certifications, updateResumeData]);

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.4 }}
        className="mb-4"
      >
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <i className="fas fa-star text-indigo-500 mr-2"></i>
          Skills & Expertise
        </h3>
        <p className="text-sm text-gray-600 mt-1">Categorize your skills for a professional impression</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SkillCategory 
          title="Soft Skills" 
          icon="fas fa-comments" 
          category="softSkills"
          items={softSkills}
          onArrayChange={handleArrayChange}
          onAddItem={handleAddItem}
          onRemoveItem={handleRemoveItem}
        />
        <SkillCategory 
          title="Programming" 
          icon="fas fa-code" 
          category="programmingSkills"
          items={programmingSkills}
          onArrayChange={handleArrayChange}
          onAddItem={handleAddItem}
          onRemoveItem={handleRemoveItem}
        />
        <SkillCategory 
          title="Frameworks" 
          icon="fas fa-cubes" 
          category="frameworks"
          items={frameworks}
          onArrayChange={handleArrayChange}
          onAddItem={handleAddItem}
          onRemoveItem={handleRemoveItem}
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.4 }}
        className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm"
      >
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-sm font-semibold flex items-center text-gray-800">
            <i className="fas fa-certificate text-indigo-500 mr-2"></i>
            Certifications
          </h4>
          <motion.button
            onClick={() => handleAddItem('certifications', { name: '', issuer: '' })}
            className="text-indigo-600 hover:text-indigo-800 text-xs flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fas fa-plus mr-1 text-xs"></i> Add Certification
          </motion.button>
        </div>

        <AnimatePresence>
          {certifications.map((cert, index) => (
            <motion.div
              key={`cert-${index}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-2 items-center mb-2"
            >
              <input
                type="text"
                placeholder="Certification name"
                value={cert.name}
                onChange={(e) => handleArrayChange('certifications', index, 'name', e.target.value)}
                className="rounded-lg p-2 border border-gray-300 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <input
                type="text"
                placeholder="Issuer"
                value={cert.issuer}
                onChange={(e) => handleArrayChange('certifications', index, 'issuer', e.target.value)}
                className="rounded-lg p-2 border border-gray-300 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <motion.button
                onClick={() => handleRemoveItem('certifications', index)}
                className="text-red-500 hover:text-red-700 p-2 flex justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="fas fa-times text-sm"></i>
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default React.memo(SkillsStep);