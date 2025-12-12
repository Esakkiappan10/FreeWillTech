// src/pages/AboutCompany.jsx
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  MonitorSmartphone,
  Globe,
  Brush,
  Smartphone,
  ShoppingCart,
  BadgeCheck,
  Layout,
  Briefcase,
  GraduationCap,
  Code2,
  PenTool,
  Brain,
  ClipboardCheck,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

// EXPANDED DATA WITH DETAILS & FEATURES
const services = [
  { 
    title: "Web Design", 
    desc: "We craft visually stunning, user-centric interfaces that engage and convert.", 
    icon: Brush,
    features: ["User Research & Personas", "Wireframing & Prototyping", "Interactive UI Animations"]
  },
  { 
    title: "Web Development", 
    desc: "Robust, scalable websites built on modern frameworks for high performance.", 
    icon: Globe,
    features: ["React / Next.js / Vue", "Secure API Integration", "SEO & Speed Optimization"]
  },
  { 
    title: "Mobile App Dev", 
    desc: "Native and cross-platform apps that deliver seamless mobile experiences.", 
    icon: Smartphone,
    features: ["iOS (Swift) & Android (Kotlin)", "Flutter / React Native", "App Store Deployment"]
  },
  { 
    title: "AI & Data Solutions", 
    desc: "Leverage machine learning to automate tasks and gain predictive insights.", 
    icon: Brain,
    features: ["Predictive Analytics", "Custom Chatbots / LLMs", "Process Automation"]
  },
  { 
    title: "E-Commerce", 
    desc: "Feature-rich online stores designed to maximize sales and retention.", 
    icon: ShoppingCart,
    features: ["Shopify / WooCommerce", "Secure Payment Gateways", "Inventory Management"]
  },
  { 
    title: "UI/UX Design", 
    desc: "Human-centered design that solves problems and delights users.", 
    icon: MonitorSmartphone,
    features: ["Usability Testing", "Information Architecture", "Design Systems"]
  },
  { 
    title: "Custom Software", 
    desc: "Tailored software solutions engineered to solve your specific business needs.", 
    icon: Code2,
    features: ["SaaS Product Development", "Legacy System Modernization", "Cloud Architecture"]
  },
  { 
    title: "Graphic Design", 
    desc: "Creative visuals that tell your brand story and capture attention.", 
    icon: PenTool,
    features: ["Marketing Collateral", "Social Media Assets", "Infographics & Illustrations"]
  },
  { 
    title: "Branding Services", 
    desc: "Complete brand identity systems that define who you are.", 
    icon: BadgeCheck,
    features: ["Logo Design", "Brand Guidelines", "Tone of Voice Strategy"]
  },
  { 
    title: "IT Consulting", 
    desc: "Strategic advice to align your technology with your business goals.", 
    icon: ClipboardCheck,
    features: ["Digital Transformation", "Tech Stack Selection", "Security Audits"]
  },
  { 
    title: "CMS Development", 
    desc: "Flexible content management systems that give you full control.", 
    icon: Layout,
    features: ["WordPress / Strapi / Sanity", "Custom Themes", "Easy Content Editing"]
  },
  { 
    title: "EdTech / CBT", 
    desc: "Interactive computer-based training tools for modern education.", 
    icon: GraduationCap,
    features: ["LMS Integration", "Gamified Learning", "Interactive Courseware"]
  },
];

// ANIMATIONS
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

const cardAnim = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { type: "spring", stiffness: 80, damping: 14 } 
  }
};

export default function AboutCompany() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section
      ref={ref}
      id="services"
      className="relative py-16 md:py-32 px-5 md:px-12 bg-slate-50 overflow-hidden font-sans selection:bg-[#1E9CD7] selection:text-white"
    >
      {/* Ambient Background Blurs (Blue & Orange) */}
      <div className="absolute top-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#1E9CD7]/5 rounded-full blur-[80px] md:blur-[100px] pointer-events-none mix-blend-multiply" />
      <div className="absolute bottom-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#FE861B]/5 rounded-full blur-[80px] md:blur-[100px] pointer-events-none mix-blend-multiply" />

      <div className="max-w-[1450px] mx-auto relative z-10">
        
        {/* HEADER SECTION */}
        <div className="mb-12 md:mb-24 text-center max-w-3xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
            >
                <span className="inline-block py-1.5 px-4 rounded-full bg-blue-100/50 border border-blue-200 text-[#1E9CD7] font-bold tracking-wider uppercase text-[10px] md:text-xs mb-5">
                    FrontierWox Tech Expertise
                </span>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.15] tracking-tight mb-6">
                  We build digital <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E9CD7] to-[#FE861B]">
                    products that matter.
                  </span>
                </h2>
                <p className="text-base md:text-lg text-slate-600 leading-relaxed md:px-8">
                  At <strong>FrontierWox Tech</strong>, we move from complex cloud architectures to pixel-perfect design. Our comprehensive services cover every aspect of the digital lifecycle.
                </p>
            </motion.div>
        </div>

        {/* GRID SECTION */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8"
        >
          {services.map((svc, i) => (
            <motion.div
              key={i}
              variants={cardAnim}
              className="group relative bg-white rounded-2xl md:rounded-[2rem] p-6 md:p-8 border border-slate-100 shadow-sm hover:shadow-[0_20px_50px_-12px_rgba(30,156,215,0.15)] transition-all duration-500 flex flex-col h-full"
            >
              {/* Top Bar: Icon & Gradient Line */}
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#F0F9FF] group-hover:bg-[#1E9CD7] transition-colors duration-500 flex items-center justify-center">
                    <svc.icon className="w-6 h-6 md:w-7 md:h-7 text-[#1E9CD7] group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                </div>
                
                {/* Hover Decoration */}
                <div className="w-12 h-1 rounded-full bg-slate-100 group-hover:bg-[#FE861B] transition-colors duration-500" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 group-hover:text-[#1E9CD7] transition-colors duration-300">
                    {svc.title}
                </h3>
                <p className="text-sm md:text-base text-slate-500 mb-6 leading-relaxed">
                    {svc.desc}
                </p>

                {/* Feature List (The "Elaboration") */}
                <ul className="space-y-3 mb-6">
                    {svc.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                             <CheckCircle2 className="w-4 h-4 text-[#FE861B] shrink-0 mt-0.5" />
                             <span>{feat}</span>
                        </li>
                    ))}
                </ul>
              </div>

              {/* Bottom: Call to Action */}
              <div className="pt-4 mt-auto border-t border-slate-50">
                <a
                  href="/service"
                  className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 group-hover:text-[#FE861B] transition-colors cursor-pointer py-1"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
              
              {/* Active Border Gradient (Invisible until hover) */}
              <div className="absolute inset-0 rounded-2xl md:rounded-[2rem] border-2 border-transparent group-hover:border-[#1E9CD7]/10 pointer-events-none transition-colors duration-500" />

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}