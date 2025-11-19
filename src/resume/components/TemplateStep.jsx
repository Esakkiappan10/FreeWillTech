import React from 'react';
import { motion } from 'framer-motion';

const TemplateStep = ({ resumeData, updateResumeData }) => {
  const templates = [
    { id: 'blue', name: 'Modern Blue', description: 'Tech & Business' },
    { id: 'green', name: 'Eco Green', description: 'Environment & Health' },
    { id: 'purple', name: 'Creative Purple', description: 'Design & Marketing' },
    { id: 'red', name: 'Bold Red', description: 'Sales & Leadership' },
    { id: 'teal', name: 'Professional Teal', description: 'Finance & Consulting' },
    { id: 'minimal', name: 'Minimalist', description: 'Classic & Formal' },
    { id: 'classic', name: 'Classic Layout', description: 'Traditional two-column' },
    { id: 'sidebar', name: 'Sidebar Layout', description: 'Modern with profile sidebar' },
    { id: 'creative', name: 'Creative Layout', description: 'Unique design for creatives' },
  ];

  const selectTemplate = (templateId) => {
    updateResumeData({ template: templateId });
  };

  // Function to determine if text should be light or dark based on background
  const getTextColor = (bgColor) => {
    // Convert hex to RGB
    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    };

    const rgb = hexToRgb(bgColor);
    if (!rgb) return '#000000'; // Default to black
    
    // Calculate luminance
    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
    
    // Return light or dark text color based on luminance
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  };

  // Function to generate innovative preview designs
  const renderPreview = (templateId, colors) => {
    const textColor = getTextColor(colors.primary);
    const isLightText = textColor === '#FFFFFF';
    const contrastColor = isLightText ? '#FFFFFF' : '#000000';
    
    switch(templateId) {
      case 'blue': // Modern Blue - Top header with sidebar
        return (
          <>
            <div className="absolute top-0 left-0 right-0 h-3 rounded-t" 
                 style={{ background: colors.primary }}></div>
            <div className="absolute top-4 left-1 w-8 h-1 rounded-sm" 
                 style={{ background: contrastColor, opacity: 0.9 }}></div>
            <div className="absolute top-5.5 left-1 w-6 h-0.5 rounded-sm" 
                 style={{ background: contrastColor, opacity: 0.7 }}></div>
            <div className="absolute top-7 left-1 w-4 h-0.5 rounded-sm" 
                 style={{ background: contrastColor, opacity: 0.5 }}></div>
            <div className="absolute top-9 left-1 w-5 h-0.5 rounded-sm" 
                 style={{ background: contrastColor, opacity: 0.6 }}></div>
            <div className="absolute top-4 right-1 w-2 h-8 rounded-sm" 
                 style={{ background: colors.accent }}></div>
            <div className="absolute bottom-1 left-1 w-3 h-0.5 rounded-sm" 
                 style={{ background: contrastColor, opacity: 0.5 }}></div>
            <div className="absolute bottom-2.5 left-1 w-2 h-0.5 rounded-sm" 
                 style={{ background: contrastColor, opacity: 0.5 }}></div>
          </>
        );
      
      case 'green': // Eco Green - Diagonal split layout
        return (
          <>
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full"
                   style={{ 
                     background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primary} 50%, ${colors.secondary} 50%, ${colors.secondary} 100%)`,
                   }}></div>
            </div>
            <div className="absolute top-3 left-3 w-2 h-2 rounded-full" 
                 style={{ background: contrastColor }}></div>
            <div className="absolute top-5 left-3 w-3 h-1 rounded-sm" 
                 style={{ background: contrastColor, opacity: 0.8 }}></div>
            <div className="absolute top-7 left-3 w-2.5 h-0.5 rounded-sm" 
                 style={{ background: contrastColor, opacity: 0.7 }}></div>
            <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full" 
                 style={{ background: contrastColor }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rotate-45" 
                 style={{ background: colors.accent }}></div>
          </>
        );
      
      case 'purple': // Creative Purple - Asymmetric design
        return (
          <>
            <div className="absolute top-0 left-0 w-3/4 h-full rounded-r-lg" 
                 style={{ background: colors.primary }}></div>
            <div className="absolute top-0 right-0 w-1/4 h-full" 
                 style={{ background: colors.secondary }}></div>
            <div className="absolute top-3 left-3 w-2 h-6 rounded-sm" 
                 style={{ background: contrastColor }}></div>
            <div className="absolute top-4.5 left-3 w-3 h-1 rounded-sm" 
                 style={{ background: contrastColor, opacity: 0.8 }}></div>
            <div className="absolute top-6 left-3 w-2.5 h-0.5 rounded-sm" 
                 style={{ background: contrastColor, opacity: 0.7 }}></div>
            <div className="absolute bottom-3 right-3 w-6 h-2 rounded-sm" 
                 style={{ background: contrastColor }}></div>
            <div className="absolute top-1/2 right-1/4 transform -translate-y-1/2 w-2 h-2 rounded-full" 
                 style={{ background: colors.accent }}></div>
          </>
        );
      
      case 'red': // Bold Red - Centered layout
        return (
          <>
            <div className="absolute top-0 left-0 w-full h-4" 
                 style={{ background: colors.primary }}></div>
            <div className="absolute bottom-0 left-0 w-full h-4" 
                 style={{ background: colors.primary }}></div>
            <div className="absolute top-4 left-3 w-6 h-1 rounded-full" 
                 style={{ background: contrastColor }}></div>
            <div className="absolute top-5.5 left-3 w-4 h-1 rounded-full" 
                 style={{ background: contrastColor, opacity: 0.7 }}></div>
            <div className="absolute top-7 left-3 w-5 h-0.5 rounded-full" 
                 style={{ background: contrastColor, opacity: 0.6 }}></div>
            <div className="absolute bottom-4 right-3 w-3 h-1 rounded-full" 
                 style={{ background: colors.accent }}></div>
          </>
        );
      
      case 'teal': // Professional Teal - Three-column layout
        return (
          <>
            <div className="absolute top-0 left-0 w-1/3 h-full" 
                 style={{ background: colors.primary }}></div>
            <div className="absolute top-0 left-1/3 w-1/3 h-full" 
                 style={{ background: colors.secondary }}></div>
            <div className="absolute top-0 right-0 w-1/3 h-full" 
                 style={{ background: colors.accent }}></div>
            <div className="absolute top-3 left-1/6 w-1 h-3 rounded-sm" 
                 style={{ background: contrastColor }}></div>
            <div className="absolute top-5 left-1/6 w-1 h-1.5 rounded-sm" 
                 style={{ background: contrastColor, opacity: 0.8 }}></div>
            <div className="absolute top-3 left-1/2 w-1 h-3 rounded-sm" 
                 style={{ background: contrastColor }}></div>
            <div className="absolute top-3 right-1/6 w-1 h-3 rounded-sm" 
                 style={{ background: contrastColor }}></div>
          </>
        );
      
      case 'minimal': // Minimalist - Clean lines only
        return (
          <>
            <div className="absolute top-3 left-3 right-3 h-0.5 rounded-full" 
                 style={{ background: '#334155' }}></div>
            <div className="absolute top-5 left-3 w-8 h-0.5 rounded-full" 
                 style={{ background: '#334155' }}></div>
            <div className="absolute top-6.5 left-3 w-6 h-0.5 rounded-full" 
                 style={{ background: '#334155' }}></div>
            <div className="absolute top-8 left-3 w-4 h-0.5 rounded-full" 
                 style={{ background: '#334155' }}></div>
            <div className="absolute top-9.5 left-3 w-5 h-0.5 rounded-full" 
                 style={{ background: '#334155' }}></div>
            <div className="absolute bottom-3 left-3 w-3 h-0.5 rounded-full" 
                 style={{ background: '#334155' }}></div>
            <div className="absolute bottom-4.5 right-3 w-4 h-0.5 rounded-full" 
                 style={{ background: '#334155' }}></div>
          </>
        );
      
      case 'classic':
        return (
          <>
            <div className="h-1/4 w-full rounded-t-sm" 
                 style={{ background: contrastColor, opacity: 0.8 }}></div>
            <div className="flex h-3/4 mt-1">
              <div className="w-1/3 mr-1 rounded-sm" 
                   style={{ background: contrastColor, opacity: 0.6 }}>
                <div className="mt-1 ml-1 w-4/5 h-1 rounded-sm" 
                     style={{ background: colors.accent, opacity: 0.8 }}></div>
                <div className="mt-0.5 ml-1 w-3/5 h-0.5 rounded-sm" 
                     style={{ background: colors.accent, opacity: 0.6 }}></div>
              </div>
              <div className="w-2/3 rounded-sm" 
                   style={{ background: contrastColor, opacity: 0.4 }}>
                <div className="mt-1 ml-1 w-5/6 h-1 rounded-sm" 
                     style={{ background: colors.accent, opacity: 0.8 }}></div>
                <div className="mt-0.5 ml-1 w-4/6 h-0.5 rounded-sm" 
                     style={{ background: colors.accent, opacity: 0.6 }}></div>
                <div className="mt-0.5 ml-1 w-3/6 h-0.5 rounded-sm" 
                     style={{ background: colors.accent, opacity: 0.6 }}></div>
              </div>
            </div>
          </>
        );
      
      case 'sidebar':
        return (
          <>
            <div className="flex h-full">
              <div className="w-1/4 mr-1 rounded-l-sm" 
                   style={{ background: contrastColor, opacity: 0.8 }}>
                <div className="mt-2 mx-auto w-2/3 h-2 rounded-full" 
                     style={{ background: colors.accent, opacity: 0.6 }}></div>
                <div className="mt-1 mx-auto w-1/2 h-0.5 rounded-sm" 
                     style={{ background: colors.accent, opacity: 0.6 }}></div>
              </div>
              <div className="w-3/4 rounded-r-sm" 
                   style={{ background: contrastColor, opacity: 0.4 }}>
                <div className="h-1/4 w-full rounded-tr-sm" 
                     style={{ background: colors.accent, opacity: 0.6 }}></div>
                <div className="mt-1 ml-1 w-5/6 h-0.5 rounded-sm" 
                     style={{ background: colors.accent, opacity: 0.8 }}></div>
                <div className="mt-0.5 ml-1 w-4/6 h-0.5 rounded-sm" 
                     style={{ background: colors.accent, opacity: 0.6 }}></div>
                <div className="mt-0.5 ml-1 w-3/6 h-0.5 rounded-sm" 
                     style={{ background: colors.accent, opacity: 0.6 }}></div>
              </div>
            </div>
          </>
        );
      
      case 'creative':
        return (
          <>
            <div className="h-1/3 w-full rounded-t-sm" 
                 style={{ background: contrastColor, opacity: 0.8 }}></div>
            <div className="h-2/3 w-full rounded-b-sm relative overflow-hidden">
              <div className="absolute -top-2 -right-2 w-12 h-12 rounded-full" 
                   style={{ background: colors.accent, opacity: 0.4 }}></div>
              <div className="absolute top-1 left-2 w-6 h-1 rounded-full" 
                   style={{ background: contrastColor, opacity: 0.6 }}></div>
              <div className="absolute top-2.5 left-2 w-5 h-0.5 rounded-full" 
                   style={{ background: contrastColor, opacity: 0.6 }}></div>
              <div className="absolute top-4 left-2 w-4 h-0.5 rounded-full" 
                   style={{ background: contrastColor, opacity: 0.6 }}></div>
              <div className="absolute bottom-3 right-2 w-3 h-1 rounded-full" 
                   style={{ background: colors.accent, opacity: 0.8 }}></div>
              <div className="absolute bottom-1 left-2 w-2 h-0.5 rounded-full" 
                   style={{ background: colors.accent, opacity: 0.8 }}></div>
            </div>
          </>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-2">
      <motion.h3 
        className="text-xl font-semibold mb-4 text-gray-800 pb-2 flex items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.i 
          className="fas fa-palette text-indigo-500 mr-3"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, type: "spring" }}
        ></motion.i>
        Choose Your Template
      </motion.h3>

      <motion.p 
        className="text-gray-600 mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        Select a template that best matches your personality and industry
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {templates.map((template, index) => {
          const colors = getTemplateColor(template.id);
          const textColor = getTextColor(colors.primary);
          const isStructural = ['classic', 'sidebar', 'creative'].includes(template.id);
          
          return (
            <motion.div
              key={template.id}
              className={`p-4 rounded-xl border cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300 ${
                resumeData.template === template.id
                  ? 'border-indigo-500 ring-2 ring-indigo-300'
                  : 'border-gray-200'
              }`}
              style={{
                backgroundColor: isStructural ? colors.primary : '#FFFFFF',
                color: textColor
              }}
              onClick={() => selectTemplate(template.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex items-start">
                <div className="mr-4 flex-shrink-0">
                  <div
                    className="relative w-12 h-16 rounded overflow-hidden flex-shrink-0"
                    style={{
                      background: !isStructural 
                        ? `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`
                        : colors.secondary,
                      border: template.id === 'minimal' 
                        ? `1px solid ${colors.primary}`
                        : 'none'
                    }}
                  >
                    <div className="absolute inset-0 pointer-events-none">
                      {renderPreview(template.id, colors)}
                    </div>
                  </div>
                </div>
                
                <div className="min-w-0">
                  <h4 className="font-bold truncate">
                    {template.name}
                  </h4>
                  <p 
                    className="text-sm mt-1 truncate"
                    style={{ opacity: 0.9 }}
                  >
                    {template.description}
                  </p>
                  
                  {/* Color preview dots */}
                  <div className="flex mt-2 space-x-1">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: colors.primary }}
                    ></div>
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: colors.secondary }}
                    ></div>
                    {colors.accent && (
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: colors.accent }}
                      ></div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// Enhanced color definitions with better contrast
const getTemplateColor = (templateId) => {
  switch (templateId) {
    case 'blue':
      return { 
        primary: '#1e40af', 
        secondary: '#3b82f6',
        accent: '#60a5fa'
      };
    case 'green':
      return { 
        primary: '#065f46', 
        secondary: '#059669',
        accent: '#34d399'
      };
    case 'purple':
      return { 
        primary: '#5b21b6', 
        secondary: '#7e22ce',
        accent: '#a855f7'
      };
    case 'red':
      return { 
        primary: '#9d174d', 
        secondary: '#db2777',
        accent: '#ec4899'
      };
    case 'teal':
      return { 
        primary: '#0f766e', 
        secondary: '#14b8a6',
        accent: '#2dd4bf'
      };
    case 'minimal':
      return { 
        primary: '#e2e8f0', 
        secondary: '#f1f5f9',
        accent: '#cbd5e1'
      };
    case 'classic':
      return { 
        primary: '#1e293b', 
        secondary: '#334155',
        accent: '#475569'
      };
    case 'sidebar':
      return { 
        primary: '#0f172a', 
        secondary: '#1e293b',
        accent: '#334155'
      };
    case 'creative':
      return { 
        primary: '#4c1d95', 
        secondary: '#5b21b6',
        accent: '#7e22ce'
      };
    default:
      return { 
        primary: '#1e40af', 
        secondary: '#3b82f6',
        accent: '#60a5fa'
      };
  }
};

export default TemplateStep;