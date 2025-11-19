import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Icons definition
const icons = {
  email: (
    <svg xmlns="http://www.w3.org/2000/svg"
      style={{ width: '16px', height: '16px', verticalAlign: 'middle', marginRight: '6px', color: '#333' }}
      viewBox="0 0 20 20" fill="currentColor">
      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
    </svg>
  ),
  phone: (
    <svg xmlns="http://www.w3.org/2000/svg"
      style={{ width: '16px', height: '16px', verticalAlign: 'middle', marginRight: '6px', color: '#333' }}
      viewBox="0 0 20 20" fill="currentColor">
      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
    </svg>
  ),
  location: (
    <svg xmlns="http://www.w3.org/2000/svg"
      style={{ width: '16px', height: '16px', verticalAlign: 'middle', marginRight: '6px', color: '#333' }}
      viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
  ),
  linkedin: (
    <svg xmlns="http://www.w3.org/2000/svg"
      style={{ width: '16px', height: '16px', verticalAlign: 'middle', marginRight: '6px', color: '#0077b5' }}
      viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  ),
  github: (
    <svg xmlns="http://www.w3.org/2000/svg"
      style={{ width: '16px', height: '16px', verticalAlign: 'middle', marginRight: '6px', color: '#000' }}
      viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  briefcase: (
    <svg xmlns="http://www.w3.org/2000/svg"
      style={{ width: '18px', height: '18px', verticalAlign: 'middle', marginRight: '6px', color: '#333' }}
      viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
      <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
    </svg>
  ),
  user: (
    <svg xmlns="http://www.w3.org/2000/svg"
      style={{ width: '18px', height: '18px', verticalAlign: 'middle', marginRight: '6px', color: '#333' }}
      viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
    </svg>
  ),
  tools: (
    <svg xmlns="http://www.w3.org/2000/svg"
      style={{ width: '18px', height: '18px', verticalAlign: 'middle', marginRight: '6px', color: '#333' }}
      viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
    </svg>
  ),
  refresh: (
    <svg xmlns="http://www.w3.org/2000/svg"
      style={{ width: '18px', height: '18px', verticalAlign: 'middle', marginRight: '6px', color: '#555' }}
      viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
    </svg>
  )
};


const Preview = forwardRef(({ resumeData, onRefresh }, ref) => {
  const resumeContainerRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useImperativeHandle(ref, () => ({
    downloadResume: handleDownload,
  }));

  const handleRefresh = () => {
    if (window.confirm('Are you sure you want to start a new resume? All current data will be lost.')) {
      onRefresh();
    }
  };

  const handleDownload = async () => {
    if (!resumeContainerRef.current) return;
    
    setIsGenerating(true);
    try {
      const canvas = await html2canvas(resumeContainerRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: null,
        width: 794, // 210mm in pixels (210 * 3.78)
        height: resumeContainerRef.current.scrollHeight,
        windowWidth: 794,
        windowHeight: resumeContainerRef.current.scrollHeight
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let position = 0;
      let pageHeight = imgHeight;
      
      if (imgHeight > 297) { // A4 height in mm
        position = -10;
        pageHeight = imgHeight;
        
        while (position < imgHeight - 297) {
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          position += 287;
          if (position < imgHeight) pdf.addPage();
        }
      } else {
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      }
      
      pdf.save(`${resumeData?.personal?.name || 'resume'}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const colors = {
    blue: { primary: '#1e40af', secondary: '#3b82f6', accent: '#60a5fa' },
    green: { primary: '#065f46', secondary: '#059669', accent: '#34d399' },
    purple: { primary: '#5b21b6', secondary: '#7e22ce', accent: '#a855f7' },
    red: { primary: '#9d174d', secondary: '#db2777', accent: '#ec4899' },
    teal: { primary: '#0f766e', secondary: '#14b8a6', accent: '#2dd4bf' },
    orange: { primary: '#ea580c', secondary: '#f97316', accent: '#8b5cf6' },
    minimal: { primary: '#1e293b', secondary: '#334155', accent: '#64748b' },
    classic: { primary: '#1e293b', secondary: '#334155', accent: '#475569' },
    sidebar: { primary: '#0f172a', secondary: '#1e293b', accent: '#334155' },
    creative: { primary: '#4c1d95', secondary: '#5b21b6', accent: '#7e22ce' }
  }[resumeData.template] || {
    primary: '#1e40af', secondary: '#3b82f6', accent: '#60a5fa'
  };

  const getTextColor = (bgColor) => {
    const color = bgColor.replace('#', '');
    const r = parseInt(color.substr(0, 2), 16);
    const g = parseInt(color.substr(2, 2), 16);
    const b = parseInt(color.substr(4, 2), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? '#000000' : '#ffffff';
  };

  const renderContactItem = (icon, value) => (
    value ? (
      <motion.div 
        className="flex items-center mb-2"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mr-2 flex-shrink-0">{icon}</div>
        <span className="text-sm">{value}</span>
      </motion.div>
    ) : null
  );

  const renderSkills = (skills) => (
    <div className="flex flex-wrap gap-1">
      {skills.map((skill, idx) => (
        <motion.span 
          key={idx}
          className="px-2 py-1 text-xs rounded-md"
          style={{ backgroundColor: colors.accent, color: getTextColor(colors.accent) }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20,
            delay: idx * 0.05
          }}
        >
         {typeof skill === 'object' && skill !== null ? skill.name : skill}
        </motion.span>
      ))}
    </div>
  );

  const renderExperienceType = (type) => {
    if (!type) return null;
    return (
      <span className="text-xs font-medium ml-2 px-2 py-0.5 rounded-full bg-gray-200">
        {type === 'intern' ? 'Internship' : 'Full-time'}
      </span>
    );
  };

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Helper to parse technologies (handles both string and array)
  const parseTechnologies = (technologies) => {
    if (!technologies) return [];
    if (Array.isArray(technologies)) return technologies;
    if (typeof technologies === 'string') {
      return technologies.split(',').map(t => t.trim());
    }
    return [];
  };

const renderContactSection = () => {
  const contactItems = [
    { icon: icons.email, value: resumeData?.personal?.email },
    { icon: icons.phone, value: resumeData?.personal?.phone },
    { icon: icons.location, value: resumeData?.personal?.location },
    { icon: icons.linkedin, value: resumeData?.personal?.linkedin },
    { icon: icons.github, value: resumeData?.personal?.github }
  ].filter(item => item.value);

  if (contactItems.length === 0) return null;

  return (
    <div className="space-y-4 mb-6 text-sm">
      <h2 className="font-bold text-lg mb-3 border-b pb-2">Contact</h2>
      {contactItems.map((item, index) => (
        <div key={index}>
          {renderContactItem(item.icon, item.value)}
        </div>
      ))}
    </div>
  );
};


  const renderSkillsSection = () => {
    const hasSkills = resumeData?.softSkills?.length > 0 || 
                     resumeData?.programmingSkills?.length > 0 || 
                     resumeData?.frameworks?.length > 0;
    
    if (!hasSkills) return null;

    return (
      <div className="mb-6">
        <h2 className="font-bold text-lg mb-3 border-b pb-2">Skills</h2>
        <div className="space-y-2">
          {resumeData?.programmingSkills?.length > 0 && (
            <div>
              <h3 className="font-medium mb-1">Languages</h3>
              {renderSkills(resumeData.programmingSkills)}
            </div>
          )}
          {resumeData?.frameworks?.length > 0 && (
            <div>
              <h3 className="font-medium mb-1">Frameworks</h3>
              {renderSkills(resumeData.frameworks)}
            </div>
          )}
          {resumeData?.softSkills?.length > 0 && (
            <div>
              <h3 className="font-medium mb-1">Soft Skills</h3>
              {renderSkills(resumeData.softSkills)}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderResumeLayout = () => {
    const textColor = getTextColor(colors.primary);
    
    switch (resumeData.template) {
      case 'blue':
        return renderModernBlueLayout(textColor);
      case 'green':
        return renderEcoGreenLayout(textColor);
      case 'purple':
        return renderCreativePurpleLayout(textColor);
      case 'red':
        return renderBoldRedLayout(textColor);
      case 'teal':
        return renderProfessionalTealLayout(textColor);
      case 'minimal':
        return renderMinimalistLayout(textColor);
      case 'classic':
        return renderClassicLayout(textColor);
      case 'sidebar':
        return renderSidebarLayout(textColor);
      case 'creative':
        return renderCreativeLayout(textColor);
      default:
        return renderStandardLayout();
    }
  };

  const renderModernBlueLayout = (textColor) => (
    <div className="resume-content flex flex-col">
      <motion.div 
        className="p-4 text-center"
        style={{ backgroundColor: colors.primary, color: textColor }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <h1 className="text-2xl font-bold mb-1">
          {resumeData?.personal?.name || 'Your Name'}
        </h1>
        <p className="text-base">
          {resumeData?.personal?.title || 'Professional Title'}
        </p>
      </motion.div>
      
      <div className="flex flex-1">
        <motion.div 
          className="w-1/3 p-4"
          style={{ backgroundColor: colors.secondary, color: textColor }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          {renderContactSection()}
          
          {resumeData?.personal?.summary && (
            <div className="mb-6">
              <h2 className="font-bold text-lg mb-3 border-b pb-2">Summary</h2>
              <p className="text-sm">{resumeData.personal.summary}</p>
            </div>
          )}
          
          {renderSkillsSection()}
        </motion.div>
        
        <motion.div 
          className="w-2/3 p-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {resumeData?.experience?.length > 0 && (
            <motion.div 
              className="mb-8"
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
            >
              <h2 className="font-bold text-lg mb-4 flex items-center pb-2 border-b" style={{ borderColor: colors.primary }}>
                <motion.div 
                  className="mr-2 mt-0.5" 
                  style={{ color: colors.primary }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {icons.briefcase}
                </motion.div>
                Experience
              </h2>
              <div className="space-y-4">
                {resumeData.experience.map((exp, index) => (
                  <motion.div 
                    key={index} 
                    className="pl-2"
                    variants={itemVariants}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="flex justify-between items-baseline">
                      <div className="flex items-center">
                        <h3 className="font-bold text-gray-800">{exp.position || 'Position'}</h3>
                        {renderExperienceType(exp.type)}
                      </div>
                      <span className="text-gray-600 text-sm">{exp.duration || 'Duration'}</span>
                    </div>
                    <div className="font-semibold mb-1" style={{ color: colors.primary }}>
                      {exp.company || 'Company'}
                    </div>
                    <p className="text-gray-700">
                      {exp.responsibilities || 'Responsibilities and achievements...'}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
          
          {resumeData?.education?.length > 0 && (
            <motion.div 
              className="mb-8"
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
            >
              <h2 className="font-bold text-lg mb-4 flex items-center pb-2 border-b" style={{ borderColor: colors.primary }}>
                <div className="mr-2" style={{ color: colors.primary }}>
                  {icons.user}
                </div>
                Education
              </h2>
              <div className="space-y-4">
                {resumeData.education.map((edu, index) => (
                  <motion.div 
                    key={index} 
                    className="pl-2"
                    variants={itemVariants}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-gray-800">{edu.degree || 'Degree'}</h3>
                      <span className="text-gray-600 text-sm">{edu.duration || 'Year'}</span>
                    </div>
                    <div className="font-semibold mb-1" style={{ color: colors.primary }}>
                      {edu.institution || 'Institution'}
                    </div>
                    <p className="text-gray-700">
                      {edu.field || 'Field of Study'} {edu.cgpa && `| CGPA: ${edu.cgpa}`}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
          
          {resumeData?.projects?.length > 0 && (
            <motion.div 
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
            >
              <h2 className="font-bold text-lg mb-4 flex items-center pb-2 border-b" style={{ borderColor: colors.primary }}>
                <div className="mr-2" style={{ color: colors.primary }}>
                  {icons.tools}
                </div>
                Projects
              </h2>
              <div className="space-y-4">
                {resumeData.projects.map((project, index) => (
                  <motion.div 
                    key={index} 
                    className="pl-2"
                    variants={itemVariants}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                  >
                    <h3 className="font-bold text-gray-800">{project.name || 'Project Name'}</h3>
                    <p className="text-gray-700">
                      {project.description || 'Project description...'}
                    </p>
                    {project.technologies && (
                      <div className="mt-2">
                        <span className="font-medium">Technologies: </span>
                        {renderSkills(parseTechnologies(project.technologies))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );

  const renderEcoGreenLayout = (textColor) => (
    <div className="resume-content relative overflow-hidden">
      <div className="absolute inset-0 z-0" style={{ 
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primary} 50%, ${colors.secondary} 50%, ${colors.secondary} 100%)`,
      }}></div>
      
      <div className="relative z-10">
        <motion.div 
          className="p-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-1" style={{ color: textColor }}>
            {resumeData?.personal?.name || 'Your Name'}
          </h1>
          <p className="text-xl" style={{ color: textColor }}>
            {resumeData?.personal?.title || 'Professional Title'}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-2 gap-8 p-6">
          <div className="space-y-6">
            <motion.div 
              className="p-4 rounded-lg bg-white bg-opacity-90 shadow"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="font-bold text-lg mb-3 flex items-center">
                <div className="mr-2" style={{ color: colors.primary }}>
                  {icons.user}
                </div>
                About Me
              </h2>
              <p className="text-gray-700">
                {resumeData?.personal?.summary || 'Professional summary...'}
              </p>
            </motion.div>
            
            <motion.div 
              className="p-4 rounded-lg bg-white bg-opacity-90 shadow"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="font-bold text-lg mb-3 flex items-center">
                <div className="mr-2" style={{ color: colors.primary }}>
                  {icons.tools}
                </div>
                Skills
              </h2>
              <div className="space-y-3">
                {resumeData?.programmingSkills?.length > 0 && (
                  <div>
                    <h3 className="font-medium mb-1">Technical</h3>
                    {renderSkills(resumeData.programmingSkills)}
                  </div>
                )}
                {resumeData?.frameworks?.length > 0 && (
                  <div>
                    <h3 className="font-medium mb-1">Frameworks</h3>
                    {renderSkills(resumeData.frameworks)}
                  </div>
                )}
                {resumeData?.softSkills?.length > 0 && (
                  <div>
                    <h3 className="font-medium mb-1">Soft Skills</h3>
                    {renderSkills(resumeData.softSkills)}
                  </div>
                )}
              </div>
            </motion.div>
            
            {resumeData?.education?.length > 0 && (
              <motion.div 
                className="p-4 rounded-lg bg-white bg-opacity-90 shadow"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="font-bold text-lg mb-3 flex items-center">
                  <div className="mr-2" style={{ color: colors.primary }}>
                    {icons.user}
                  </div>
                  Education
                </h2>
                <div className="space-y-4">
                  {resumeData.education.map((edu, index) => (
                    <div key={index} className="mb-3">
                      <div className="flex justify-between">
                        <h3 className="font-bold">{edu.degree || 'Degree'}</h3>
                        <span className="text-gray-600 text-sm">{edu.duration || 'Year'}</span>
                      </div>
                      <div className="font-semibold mb-1" style={{ color: colors.primary }}>
                        {edu.institution || 'Institution'}
                      </div>
                      <p className="text-gray-700 text-sm">
                        {edu.field || 'Field of Study'} {edu.cgpa && `| CGPA: ${edu.cgpa}`}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
          
          <div className="space-y-6">
            {resumeData?.experience?.length > 0 && (
              <motion.div 
                className="p-4 rounded-lg bg-white bg-opacity-90 shadow"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="font-bold text-lg mb-3 flex items-center">
                  <div className="mr-2" style={{ color: colors.primary }}>
                    {icons.briefcase}
                  </div>
                  Experience
                </h2>
                <div className="space-y-4">
                  {resumeData.experience.map((exp, index) => (
                    <div key={index} className="mb-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-bold">{exp.position || 'Position'}</h3>
                          {renderExperienceType(exp.type)}
                        </div>
                        <span className="text-gray-600 text-sm">{exp.duration || 'Duration'}</span>
                      </div>
                      <div className="font-semibold mb-1" style={{ color: colors.primary }}>
                        {exp.company || 'Company'}
                      </div>
                      <p className="text-gray-700 text-sm">
                        {exp.responsibilities || 'Responsibilities and achievements...'}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
            
            {resumeData?.projects?.length > 0 && (
              <motion.div 
                className="p-4 rounded-lg bg-white bg-opacity-90 shadow"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="font-bold text-lg mb-3 flex items-center">
                  <div className="mr-2" style={{ color: colors.primary }}>
                    {icons.tools}
                  </div>
                  Projects
                </h2>
                <div className="space-y-4">
                  {resumeData.projects.map((project, index) => (
                    <div key={index} className="mb-3">
                      <h3 className="font-bold">{project.name || 'Project Name'}</h3>
                      <p className="text-gray-700 text-sm">
                        {project.description || 'Project description...'}
                      </p>
                      {project.technologies && (
                        <div className="mt-2">
                          <span className="font-medium">Technologies: </span>
                          {renderSkills(parseTechnologies(project.technologies))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCreativePurpleLayout = (textColor) => (
    <div className="resume-content flex">
      <motion.div 
        className="w-3/4 p-6"
        style={{ backgroundColor: colors.primary, color: textColor }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h1 className="text-3xl font-bold mb-1">
            {resumeData?.personal?.name || 'Your Name'}
          </h1>
          <p className="text-xl opacity-90">
            {resumeData?.personal?.title || 'Professional Title'}
          </p>
        </motion.div>
        
        {resumeData?.experience?.length > 0 && (
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="font-bold text-xl mb-4 border-b pb-2">Experience</h2>
            <div className="space-y-4">
              {resumeData.experience.map((exp, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-lg">{exp.position || 'Position'}</h3>
                      {renderExperienceType(exp.type)}
                    </div>
                    <span>{exp.duration || 'Duration'}</span>
                  </div>
                  <div className="font-semibold mb-1">
                    {exp.company || 'Company'}
                  </div>
                  <p className="opacity-90">
                    {exp.responsibilities || 'Responsibilities and achievements...'}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
        
        {resumeData?.projects?.length > 0 && (
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="font-bold text-xl mb-4 border-b pb-2">Projects</h2>
            <div className="space-y-4">
              {resumeData.projects.map((project, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-bold text-lg">{project.name || 'Project Name'}</h3>
                  <p className="opacity-90">
                    {project.description || 'Project description...'}
                  </p>
                  {project.technologies && (
                    <div className="mt-2">
                      <span className="font-medium">Technologies: </span>
                      {renderSkills(parseTechnologies(project.technologies))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
      
      <motion.div 
        className="w-1/4 p-6"
        style={{ backgroundColor: colors.secondary, color: textColor }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="font-bold text-lg mb-3 border-b pb-2">Contact</h2>
          <div className="space-y-2 text-sm">
            {renderContactItem(icons.email, resumeData?.personal?.email)}
            {renderContactItem(icons.phone, resumeData?.personal?.phone)}
            {renderContactItem(icons.location, resumeData?.personal?.location)}
            {renderContactItem(icons.linkedin, resumeData?.personal?.linkedin)}
            {renderContactItem(icons.github, resumeData?.personal?.github)}
          </div>
        </motion.div>
        
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="font-bold text-lg mb-3 border-b pb-2">Skills</h2>
          <div className="space-y-3">
            {resumeData?.programmingSkills?.length > 0 && (
              <div>
                <h3 className="font-medium mb-1">Languages</h3>
                {renderSkills(resumeData.programmingSkills)}
              </div>
            )}
            {resumeData?.frameworks?.length > 0 && (
              <div>
                <h3 className="font-medium mb-1">Frameworks</h3>
                {renderSkills(resumeData.frameworks)}
              </div>
            )}
            {resumeData?.softSkills?.length > 0 && (
              <div>
                <h3 className="font-medium mb-1">Soft Skills</h3>
                {renderSkills(resumeData.softSkills)}
              </div>
            )}
          </div>
        </motion.div>
        
        {resumeData?.education?.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="font-bold text-lg mb-3 border-b pb-2">Education</h2>
            <div className="space-y-3">
              {resumeData.education.map((edu, index) => (
                <div key={index} className="mb-3">
                  <h3 className="font-bold">{edu.degree || 'Degree'}</h3>
                  <div className="font-medium mb-1">
                    {edu.institution || 'Institution'}
                  </div>
                  <p className="text-sm opacity-90">
                    {edu.field || 'Field of Study'} {edu.cgpa && `| CGPA: ${edu.cgpa}`}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );

  const renderBoldRedLayout = (textColor) => (
    <div className="resume-content flex flex-col items-center">
      <motion.div 
        className="w-full p-6 text-center"
        style={{ backgroundColor: colors.primary, color: textColor }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-1">
          {resumeData?.personal?.name || 'Your Name'}
        </h1>
        <p className="text-xl">
          {resumeData?.personal?.title || 'Professional Title'}
        </p>
      </motion.div>
      
      <div className="w-4/5 py-8">
        <div className="grid grid-cols-2 gap-8">
          <div>
            {resumeData?.experience?.length > 0 && (
              <motion.div 
                className="mb-8"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
              >
                <h2 className="font-bold text-xl mb-4 flex items-center border-b pb-2" style={{ borderColor: colors.primary }}>
                  <motion.div 
                    className="mr-2" 
                    style={{ color: colors.primary }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {icons.briefcase}
                  </motion.div>
                  Experience
                </h2>
                <div className="space-y-4">
                  {resumeData.experience.map((exp, index) => (
                    <motion.div 
                      key={index} 
                      variants={itemVariants}
                      custom={index}
                      initial="hidden"
                      animate="visible"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-bold">{exp.position || 'Position'}</h3>
                          {renderExperienceType(exp.type)}
                        </div>
                        <span className="text-gray-600">{exp.duration || 'Duration'}</span>
                      </div>
                      <div className="font-semibold mb-1" style={{ color: colors.primary }}>
                        {exp.company || 'Company'}
                      </div>
                      <p className="text-gray-700">
                        {exp.responsibilities || 'Responsibilities and achievements...'}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
            
            {resumeData?.projects?.length > 0 && (
              <motion.div 
                className="mb-8"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
              >
                <h2 className="font-bold text-xl mb-4 flex items-center border-b pb-2" style={{ borderColor: colors.primary }}>
                  <div className="mr-2" style={{ color: colors.primary }}>
                    {icons.tools}
                  </div>
                  Projects
                </h2>
                <div className="space-y-4">
                  {resumeData.projects.map((project, index) => (
                    <motion.div 
                      key={index} 
                      variants={itemVariants}
                      custom={index}
                      initial="hidden"
                      animate="visible"
                    >
                      <h3 className="font-bold">{project.name || 'Project Name'}</h3>
                      <p className="text-gray-700">
                        {project.description || 'Project description...'}
                      </p>
                      {project.technologies && (
                        <div className="mt-2">
                          <span className="font-medium">Technologies: </span>
                          {renderSkills(parseTechnologies(project.technologies))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
          
          <div>
            {resumeData?.education?.length > 0 && (
              <motion.div 
                className="mb-8"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
              >
                <h2 className="font-bold text-xl mb-4 flex items-center border-b pb-2" style={{ borderColor: colors.primary }}>
                  <div className="mr-2" style={{ color: colors.primary }}>
                    {icons.user}
                  </div>
                  Education
                </h2>
                <div className="space-y-4">
                  {resumeData.education.map((edu, index) => (
                    <motion.div 
                      key={index} 
                      variants={itemVariants}
                      custom={index}
                      initial="hidden"
                      animate="visible"
                    >
                      <div className="flex justify-between">
                        <h3 className="font-bold">{edu.degree || 'Degree'}</h3>
                        <span className="text-gray-600">{edu.duration || 'Year'}</span>
                      </div>
                      <div className="font-semibold mb-1" style={{ color: colors.primary }}>
                        {edu.institution || 'Institution'}
                      </div>
                      <p className="text-gray-700">
                        {edu.field || 'Field of Study'} {edu.cgpa && `| CGPA: ${edu.cgpa}`}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
            
            {renderSkillsSection()}
            
            {resumeData?.personal?.summary && (
              <motion.div 
                className="mb-6"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
              >
                <h2 className="font-bold text-xl mb-4 flex items-center border-b pb-2" style={{ borderColor: colors.primary }}>
                  <div className="mr-2" style={{ color: colors.primary }}>
                    {icons.user}
                  </div>
                  Summary
                </h2>
                <p className="text-gray-700">
                  {resumeData.personal.summary}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      
      <motion.div 
        className="w-full p-4 text-center mt-auto"
        style={{ backgroundColor: colors.primary, color: textColor }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex justify-center space-x-4 text-sm">
          {resumeData?.personal?.email && <span>{resumeData.personal.email}</span>}
          {resumeData?.personal?.phone && <span>{resumeData.personal.phone}</span>}
          {resumeData?.personal?.location && <span>{resumeData.personal.location}</span>}
        </div>
      </motion.div>
    </div>
  );

  const renderProfessionalTealLayout = (textColor) => (
    <div className="resume-content">
      <motion.div 
        className="p-6 text-center"
        style={{ backgroundColor: colors.primary, color: textColor }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-1">
          {resumeData?.personal?.name || 'Your Name'}
        </h1>
        <p className="text-xl">
          {resumeData?.personal?.title || 'Professional Title'}
        </p>
      </motion.div>
      
      <div className="grid grid-cols-3 gap-4 p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {renderContactSection()}
          
          {renderSkillsSection()}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="font-bold text-lg mb-3 border-b pb-2" style={{ borderColor: colors.primary }}>Experience</h2>
          <div className="space-y-4">
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="mb-3">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold">{exp.position || 'Position'}</h3>
                    {renderExperienceType(exp.type)}
                  </div>
                  <span className="text-gray-600 text-sm">{exp.duration || 'Duration'}</span>
                </div>
                <div className="font-semibold mb-1" style={{ color: colors.primary }}>
                  {exp.company || 'Company'}
                </div>
                <p className="text-gray-700 text-sm">
                  {exp.responsibilities || 'Responsibilities and achievements...'}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="font-bold text-lg mb-3 border-b pb-2" style={{ borderColor: colors.primary }}>Education</h2>
          <div className="space-y-4">
            {resumeData.education.map((edu, index) => (
              <div key={index} className="mb-3">
                <div className="flex justify-between">
                  <h3 className="font-bold">{edu.degree || 'Degree'}</h3>
                  <span className="text-gray-600 text-sm">{edu.duration || 'Year'}</span>
                </div>
                <div className="font-semibold mb-1" style={{ color: colors.primary }}>
                  {edu.institution || 'Institution'}
                </div>
                <p className="text-gray-700 text-sm">
                  {edu.field || 'Field of Study'} {edu.cgpa && `| CGPA: ${edu.cgpa}`}
                </p>
              </div>
            ))}
          </div>
          
          <h2 className="font-bold text-lg my-3 border-b pb-2" style={{ borderColor: colors.primary }}>Projects</h2>
          <div className="space-y-4">
            {resumeData.projects.map((project, index) => (
              <div key={index} className="mb-3">
                <h3 className="font-bold">{project.name || 'Project Name'}</h3>
                <p className="text-gray-700 text-sm">
                  {project.description || 'Project description...'}
                </p>
                {project.technologies && (
                  <div className="mt-2">
                    <span className="font-medium">Technologies: </span>
                    {renderSkills(parseTechnologies(project.technologies))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );

  const renderMinimalistLayout = (textColor) => (
    <div className="resume-content p-8">
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-1">
          {resumeData?.personal?.name || 'Your Name'}
        </h1>
        <p className="text-xl text-gray-600">
          {resumeData?.personal?.title || 'Professional Title'}
        </p>
        <div className="flex justify-center space-x-4 mt-2 text-sm text-gray-500">
          {resumeData?.personal?.email && <span>{resumeData.personal.email}</span>}
          {resumeData?.personal?.phone && <span>{resumeData.personal.phone}</span>}
          {resumeData?.personal?.location && <span>{resumeData.personal.location}</span>}
        </div>
      </motion.div>
      
      <div className="space-y-8">
        {resumeData?.personal?.summary && (
          <motion.div 
            className="mb-6"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="font-bold text-lg mb-3 border-b pb-2">Summary</h2>
            <p className="text-gray-700">
              {resumeData.personal.summary}
            </p>
          </motion.div>
        )}
        
        {resumeData?.experience?.length > 0 && (
          <motion.div 
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="font-bold text-lg mb-3 border-b pb-2">Experience</h2>
            <div className="space-y-4">
              {resumeData.experience.map((exp, index) => (
                <motion.div 
                  key={index} 
                  variants={itemVariants}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold">{exp.position || 'Position'}</h3>
                      {renderExperienceType(exp.type)}
                    </div>
                    <span className="text-gray-600">{exp.duration || 'Duration'}</span>
                  </div>
                  <div className="font-semibold mb-1 text-gray-700">
                    {exp.company || 'Company'}
                  </div>
                  <p className="text-gray-600">
                    {exp.responsibilities || 'Responsibilities and achievements...'}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
        
        {resumeData?.education?.length > 0 && (
          <motion.div 
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="font-bold text-lg mb-3 border-b pb-2">Education</h2>
            <div className="space-y-4">
              {resumeData.education.map((edu, index) => (
                <motion.div 
                  key={index} 
                  variants={itemVariants}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="flex justify-between">
                    <h3 className="font-bold">{edu.degree || 'Degree'}</h3>
                    <span className="text-gray-600">{edu.duration || 'Year'}</span>
                  </div>
                  <div className="font-semibold mb-1 text-gray-700">
                    {edu.institution || 'Institution'}
                  </div>
                  <p className="text-gray-600">
                    {edu.field || 'Field of Study'} {edu.cgpa && `| CGPA: ${edu.cgpa}`}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
        
        {renderSkillsSection()}
      </div>
    </div>
  );

  const renderClassicLayout = (textColor) => (
    <div className="resume-content p-8">
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-1" style={{ color: colors.primary }}>
          {resumeData?.personal?.name || 'Your Name'}
        </h1>
        <p className="text-xl text-gray-600">
          {resumeData?.personal?.title || 'Professional Title'}
        </p>
        <div className="flex justify-center space-x-4 mt-2 text-sm text-gray-500">
          {resumeData?.personal?.email && <span>{resumeData.personal.email}</span>}
          {resumeData?.personal?.phone && <span>{resumeData.personal.phone}</span>}
          {resumeData?.personal?.location && <span>{resumeData.personal.location}</span>}
        </div>
      </motion.div>
      
      <div className="space-y-8">
        {resumeData?.personal?.summary && (
          <motion.div 
            className="mb-6"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="font-bold text-lg mb-3 pb-2" style={{ borderBottom: `2px solid ${colors.primary}` }}>Summary</h2>
            <p className="text-gray-700">
              {resumeData.personal.summary}
            </p>
          </motion.div>
        )}
        
        {resumeData?.experience?.length > 0 && (
          <motion.div 
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="font-bold text-lg mb-3 pb-2" style={{ borderBottom: `2px solid ${colors.primary}` }}>Experience</h2>
            <div className="space-y-4">
              {resumeData.experience.map((exp, index) => (
                <motion.div 
                  key={index} 
                  variants={itemVariants}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  className="pl-4 border-l-2" 
                  style={{ borderColor: colors.primary }}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold">{exp.position || 'Position'}</h3>
                      {renderExperienceType(exp.type)}
                    </div>
                    <span className="text-gray-600">{exp.duration || 'Duration'}</span>
                  </div>
                  <div className="font-semibold mb-1" style={{ color: colors.primary }}>
                    {exp.company || 'Company'}
                  </div>
                  <p className="text-gray-700">
                    {exp.responsibilities || 'Responsibilities and achievements...'}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
        
        {resumeData?.education?.length > 0 && (
          <motion.div 
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="font-bold text-lg mb-3 pb-2" style={{ borderBottom: `2px solid ${colors.primary}` }}>Education</h2>
            <div className="space-y-4">
              {resumeData.education.map((edu, index) => (
                <motion.div 
                  key={index} 
                  variants={itemVariants}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  className="pl-4 border-l-2" 
                  style={{ borderColor: colors.primary }}
                >
                  <div className="flex justify-between">
                    <h3 className="font-bold">{edu.degree || 'Degree'}</h3>
                    <span className="text-gray-600">{edu.duration || 'Year'}</span>
                  </div>
                  <div className="font-semibold mb-1" style={{ color: colors.primary }}>
                    {edu.institution || 'Institution'}
                  </div>
                  <p className="text-gray-700">
                    {edu.field || 'Field of Study'} {edu.cgpa && `| CGPA: ${edu.cgpa}`}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );

  const renderSidebarLayout = (textColor) => (
    <div className="resume-content flex">
      <motion.div 
        className="w-1/3 p-6"
        style={{ backgroundColor: colors.primary, color: textColor }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h1 className="text-2xl font-bold mb-1">
            {resumeData?.personal?.name || 'Your Name'}
          </h1>
          <p className="text-lg opacity-90">
            {resumeData?.personal?.title || 'Professional Title'}
          </p>
        </motion.div>
        
        <div className="space-y-6">
          {renderContactSection()}
          
          {renderSkillsSection()}
          
          {resumeData?.education?.length > 0 && (
            <div>
              <h2 className="font-bold text-lg mb-3 border-b pb-2">Education</h2>
              <div className="space-y-3">
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="mb-3">
                    <h3 className="font-bold text-sm">{edu.degree || 'Degree'}</h3>
                    <div className="font-medium mb-1">
                      {edu.institution || 'Institution'}
                    </div>
                    <p className="text-xs opacity-90">
                      {edu.duration || 'Year'} | {edu.field || 'Field of Study'} {edu.cgpa && `| CGPA: ${edu.cgpa}`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
      
      <motion.div 
        className="w-2/3 p-6"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {resumeData?.personal?.summary && (
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="font-bold text-lg mb-3 pb-2 border-b" style={{ borderColor: colors.primary }}>Summary</h2>
            <p className="text-gray-700">
              {resumeData.personal.summary}
            </p>
          </motion.div>
        )}
        
        {resumeData?.experience?.length > 0 && (
          <motion.div 
            className="mb-8"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="font-bold text-lg mb-3 pb-2 border-b" style={{ borderColor: colors.primary }}>Experience</h2>
            <div className="space-y-4">
              {resumeData.experience.map((exp, index) => (
                <motion.div 
                  key={index} 
                  variants={itemVariants}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold">{exp.position || 'Position'}</h3>
                      {renderExperienceType(exp.type)}
                    </div>
                    <span className="text-gray-600">{exp.duration || 'Duration'}</span>
                  </div>
                  <div className="font-semibold mb-1" style={{ color: colors.primary }}>
                    {exp.company || 'Company'}
                  </div>
                  <p className="text-gray-700">
                    {exp.responsibilities || 'Responsibilities and achievements...'}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
        
        {resumeData?.projects?.length > 0 && (
          <motion.div 
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="font-bold text-lg mb-3 pb-2 border-b" style={{ borderColor: colors.primary }}>Projects</h2>
            <div className="space-y-4">
              {resumeData.projects.map((project, index) => (
                <motion.div 
                  key={index} 
                  variants={itemVariants}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                >
                  <h3 className="font-bold">{project.name || 'Project Name'}</h3>
                  <p className="text-gray-700">
                    {project.description || 'Project description...'}
                  </p>
                  {project.technologies && (
                    <div className="mt-2">
                      <span className="font-medium">Technologies: </span>
                      {renderSkills(parseTechnologies(project.technologies))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );

  const renderCreativeLayout = (textColor) => (
    <div className="resume-content p-8">
      <motion.div 
        className="mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-1" style={{ color: colors.primary }}>
          {resumeData?.personal?.name || 'Your Name'}
        </h1>
        <p className="text-xl text-gray-600">
          {resumeData?.personal?.title || 'Professional Title'}
        </p>
      </motion.div>
      
      <div className="grid grid-cols-2 gap-8">
        <div>
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="font-bold text-xl mb-4 pb-2 border-b" style={{ borderColor: colors.primary }}>Contact</h2>
            <div className="space-y-3">
              {renderContactItem(icons.email, resumeData?.personal?.email)}
              {renderContactItem(icons.phone, resumeData?.personal?.phone)}
              {renderContactItem(icons.location, resumeData?.personal?.location)}
              {renderContactItem(icons.linkedin, resumeData?.personal?.linkedin)}
              {renderContactItem(icons.github, resumeData?.personal?.github)}
            </div>
          </motion.div>
          
          {resumeData?.personal?.summary && (
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="font-bold text-xl mb-4 pb-2 border-b" style={{ borderColor: colors.primary }}>About Me</h2>
              <p className="text-gray-700">
                {resumeData.personal.summary}
              </p>
            </motion.div>
          )}
          
          {renderSkillsSection()}
        </div>
        
        <div>
          {resumeData?.experience?.length > 0 && (
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="font-bold text-xl mb-4 pb-2 border-b" style={{ borderColor: colors.primary }}>Experience</h2>
              <div className="space-y-4">
                {resumeData.experience.map((exp, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-bold">{exp.position || 'Position'}</h3>
                        {renderExperienceType(exp.type)}
                      </div>
                      <span className="text-gray-600">{exp.duration || 'Duration'}</span>
                    </div>
                    <div className="font-semibold mb-1" style={{ color: colors.primary }}>
                      {exp.company || 'Company'}
                    </div>
                    <p className="text-gray-700">
                      {exp.responsibilities || 'Responsibilities and achievements...'}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
          
          {resumeData?.education?.length > 0 && (
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="font-bold text-xl mb-4 pb-2 border-b" style={{ borderColor: colors.primary }}>Education</h2>
              <div className="space-y-4">
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="mb-3">
                    <div className="flex justify-between">
                      <h3 className="font-bold">{edu.degree || 'Degree'}</h3>
                      <span className="text-gray-600 text-sm">{edu.duration || 'Year'}</span>
                    </div>
                    <div className="font-semibold mb-1" style={{ color: colors.primary }}>
                      {edu.institution || 'Institution'}
                    </div>
                    <p className="text-gray-700 text-sm">
                      {edu.field || 'Field of Study'} {edu.cgpa && `| CGPA: ${edu.cgpa}`}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );

  const renderStandardLayout = () => (
    <div className="resume-content p-8">
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-1" style={{ color: colors.primary }}>
          {resumeData?.personal?.name || 'Your Name'}
        </h1>
        <p className="text-xl text-gray-600">
          {resumeData?.personal?.title || 'Professional Title'}
        </p>
        <div className="flex justify-center space-x-4 mt-2 text-sm text-gray-500">
          {resumeData?.personal?.email && <span>{resumeData.personal.email}</span>}
          {resumeData?.personal?.phone && <span>{resumeData.personal.phone}</span>}
          {resumeData?.personal?.location && <span>{resumeData.personal.location}</span>}
        </div>
      </motion.div>
      
      <div className="space-y-8">
        {resumeData?.personal?.summary && (
          <motion.div 
            className="mb-6"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="font-bold text-lg mb-3 border-b pb-2" style={{ borderColor: colors.primary }}>Summary</h2>
            <p className="text-gray-700">
              {resumeData.personal.summary}
            </p>
          </motion.div>
        )}
        
        {resumeData?.experience?.length > 0 && (
          <motion.div 
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="font-bold text-lg mb-3 border-b pb-2" style={{ borderColor: colors.primary }}>Experience</h2>
            <div className="space-y-4">
              {resumeData.experience.map((exp, index) => (
                <motion.div 
                  key={index} 
                  variants={itemVariants}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold">{exp.position || 'Position'}</h3>
                      {renderExperienceType(exp.type)}
                    </div>
                    <span className="text-gray-600">{exp.duration || 'Duration'}</span>
                  </div>
                  <div className="font-semibold mb-1" style={{ color: colors.primary }}>
                    {exp.company || 'Company'}
                  </div>
                  <p className="text-gray-700">
                    {exp.responsibilities || 'Responsibilities and achievements...'}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
        
        {resumeData?.education?.length > 0 && (
          <motion.div 
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="font-bold text-lg mb-3 border-b pb-2" style={{ borderColor: colors.primary }}>Education</h2>
            <div className="space-y-4">
              {resumeData.education.map((edu, index) => (
                <motion.div 
                  key={index} 
                  variants={itemVariants}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="flex justify-between">
                    <h3 className="font-bold">{edu.degree || 'Degree'}</h3>
                    <span className="text-gray-600">{edu.duration || 'Year'}</span>
                  </div>
                  <div className="font-semibold mb-1" style={{ color: colors.primary }}>
                    {edu.institution || 'Institution'}
                  </div>
                  <p className="text-gray-700">
                    {edu.field || 'Field of Study'} {edu.cgpa && `| CGPA: ${edu.cgpa}`}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );

  return (
    <motion.div 
      className="preview-container flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div 
        ref={resumeContainerRef} 
        className="resume-preview bg-white shadow-lg w-[210mm] min-h-[297mm] overflow-hidden p-[15mm]"
        style={{ 
          boxSizing: 'border-box',
          width: '210mm',
          minHeight: '297mm',
          maxHeight: '297mm',
          overflowY: 'auto'
        }}
      >
        {renderResumeLayout()}
      </div>
    </motion.div>
  );
});

export default Preview;