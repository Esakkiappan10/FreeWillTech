import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, Rocket, Wrench, ArrowRight, 
  CheckCircle2, PlayCircle, Users, Building2, 
  Network, ChevronRight, Star, Zap, ShieldCheck, BarChart3 
} from "lucide-react";
import Header from "../layouts/Navbar"; 
import Footer from "../layouts/Footer"; 

// --- SUB-COMPONENTS ---

const SectionTag = ({ children, color = "blue" }) => {
  const colorStyles = {
    blue: "bg-blue-50 border-blue-100 text-blue-600",
    orange: "bg-orange-50 border-orange-100 text-orange-600",
  };
  const dotStyles = {
    blue: "bg-blue-600",
    orange: "bg-orange-500",
  };

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-widest mb-6 ${colorStyles[color]}`}>
      <span className={`relative flex h-2 w-2`}>
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotStyles[color]}`}></span>
        <span className={`relative inline-flex rounded-full h-2 w-2 ${dotStyles[color]}`}></span>
      </span>
      {children}
    </div>
  );
};

// A pure CSS/Framer composition for the Hero right side (No external image dependency)
const HeroGraphic = () => (
  <div className="relative w-full h-[500px] md:h-[530px] flex items-center justify-center perspective-1000">

    {/* Main Dashboard Card */}
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative z-20 w-[90%] md:w-[80%] h-[300px] bg-white rounded-3xl shadow-2xl shadow-blue-900/20 border border-slate-100 overflow-hidden flex flex-col"
    >
      {/* Image */}
      <div className="flex-1 w-full h-full">
        <img
          src="/product.png"
          alt="Hero Visual"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Fake Header */}
      <div className="h-12 border-t border-slate-100 flex items-center px-4 gap-2 bg-white">
        <div className="w-3 h-3 rounded-full bg-red-400" />
        <div className="w-3 h-3 rounded-full bg-amber-400" />
        <div className="w-3 h-3 rounded-full bg-green-400" />
      </div>
    </motion.div>

    {/* Floating Elements */}
    <motion.div 
      animate={{ y: [-10, 10, -10] }}
      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      className="absolute top-10 right-0 md:-right-4 z-30 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3"
    >
      <div className="p-2 bg-green-100 text-green-600 rounded-lg">
        <ShieldCheck size={20} />
      </div>
      <div>
        <div className="text-xs text-slate-400 font-bold uppercase">Security</div>
        <div className="text-sm font-bold text-slate-900">Enterprise Grade</div>
      </div>
    </motion.div>

    <motion.div 
      animate={{ y: [10, -10, 10] }}
      transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
      className="absolute bottom-16 left-0 md:-left-8 z-30 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3"
    >
      <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
        <Zap size={20} />
      </div>
      <div>
        <div className="text-xs text-slate-400 font-bold uppercase">Performance</div>
        <div className="text-sm font-bold text-slate-900">99.9% Uptime</div>
      </div>
    </motion.div>

    {/* Backdrop Blobs */}
    <div className="absolute inset-0 z-0">
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-400/20 blur-[80px] rounded-full mix-blend-multiply animate-pulse" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-orange-400/20 blur-[80px] rounded-full mix-blend-multiply" />
    </div>
  </div>
);


const ProductCard = ({ title, status, desc, icon: Icon, link, img, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ y: -5 }}
    className="group relative flex flex-col h-full bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300 overflow-hidden"
  >
    <div className="h-56 overflow-hidden relative bg-slate-100">
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 opacity-80" />
      <img src={img} alt={title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" />
      <div className="absolute top-4 left-4 z-20">
        <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/95 backdrop-blur shadow-sm border border-slate-100 ${
          status === 'Live' ? 'text-emerald-600' : 'text-orange-600'
        }`}>
          {status}
        </span>
      </div>
    </div>

    <div className="p-8 flex flex-col flex-grow relative z-20 -mt-6">
      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-900 mb-6 shadow-lg shadow-slate-200 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 border border-slate-50">
        <Icon size={30} />
      </div>

      <h3 className="text-2xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-500 text-base leading-relaxed mb-8 flex-grow">{desc}</p>

      {link ? (
        <a href={link} className="inline-flex items-center justify-between w-full px-5 py-3 rounded-xl bg-slate-50 text-slate-700 font-bold text-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
          Launch Application <ArrowRight size={18} />
        </a>
      ) : (
        <div className="inline-flex items-center justify-between w-full px-5 py-3 rounded-xl bg-slate-50 text-slate-400 font-bold text-sm cursor-not-allowed">
          Coming Soon <Star size={18} />
        </div>
      )}
    </div>
  </motion.div>
);

export default function AboutProductsClients() {
  const [activeTab, setActiveTab] = useState("academic");

  const clientCaseStudies = {
    academic: {
      id: "academic",
      client: "Dr. Julius Caesar",
      category: "Personal Branding",
      title: "Digital Identity System",
      desc: "A complete digital portfolio ecosystem designed for high-profile academics to showcase research and impact.",
      features: [
        { head: "Interactive Interface", sub: "Seamless navigation of achievements." },
        { head: "Publication Archive", sub: "Structured database for research." },
        { head: "Global Accessibility", sub: "Optimized for speed worldwide." },
      ],
      icon: Users,
      color: "blue"
    },
    institution: {
      id: "institution",
      client: "Our Lady of Fatima",
      category: "Institutional Tech",
      title: "Smart Campus Identity",
      desc: "High-quality ID card systems aligned with institutional branding and automated security protocols.",
      features: [
        { head: "Print Optimization", sub: "High-res assets for physical cards." },
        { head: "Brand Consistency", sub: "Unified design across grades." },
        { head: "Bulk Processing", sub: "Handling 5000+ student records." },
      ],
      icon: Building2,
      color: "orange"
    },
    infra: {
      id: "infra",
      client: "J.A. College",
      category: "Infrastructure",
      title: "Enterprise Networking",
      desc: "Technical setup and workflow enablement for smooth digital operations in large campuses.",
      features: [
        { head: "Network Architecture", sub: "Robust connectivity solutions." },
        { head: "Workflow Automation", sub: "Digitizing administrative tasks." },
        { head: "Scalable Support", sub: "Built to grow with the student body." },
      ],
      icon: Network,
      color: "blue"
    }
  };

  const products = [
    {
      title: "Frontier Wox Tech Resume",
      status: "Live",
      desc: "Smart, elegant, and AI-enhanced resume templates with instant export & professional layouts.",
      icon: Briefcase,
      img: "https://www.workruit.com/_next/image/?url=https:%2F%2Fd2rac4ixos46cj.cloudfront.net%2Fwebsiteimages%2Fimages%2Fpng%2FCV_Builder_best.png&w=1080&q=75",
      link: "https://resumebuilder.freewilltech.in/",
    },
    {
      title: "Portfolio Builder",
      status: "Beta",
      desc: "A one-click personal website generator with animations, smart sections and live hosting.",
      icon: Rocket,
      img: "https://tse1.mm.bing.net/th/id/OIP.2g4_Zqc-IXcapal7GUfWlgHaET?rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      title: "Frontier Wox People",
      status: "Enterprise",
      desc: "A complete HRMS: attendance, payroll, onboarding, leave tracking, and automated workflows.",
      icon: Wrench,
      img: "https://th.bing.com/th/id/OIP.6ycs8tJ86UGW1wyqyZSETQHaEK?w=297&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    },
  ];

  return (
    <div className="min-h-full bg-white text-slate-900 font-sans selection:bg-orange-100 selection:text-orange-900 overflow-x-hidden">
      <Header />

      {/* ================= HERO SECTION (2-Column & Mobile Optimized) ================= */}
      <section className="relative pt-20 pb-20 lg:pt-35 md:pb-33 overflow-hidden">
        {/* Abstract Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Column: Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center lg:text-left order-1 lg:order-1">

              <SectionTag color="orange">Frontier Wox Technologies</SectionTag>
              
              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1]">
                Unify Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-blue-600">
                  Digital Potential.
                </span>
              </h1>

              <p className="text-lg lg:text-xl text-slate-500 mb-10 leading-relaxed font-light max-w-lg mx-auto lg:mx-0">
                We craft the tools that power the next generation of institutions and professionals. Our creative team also specializes in graphic design to ensure your brand 
looks as strong as it performs. Every solution we deliver is crafted with 
modern tools, strategic thinking, and a commitment to excellence
                <strong className="text-slate-900 font-medium"> Simple. Powerful. Future-Ready.</strong>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a 
                  href="https://wa.me/919626806328"
                  className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-2xl shadow-slate-900/20 hover:bg-slate-800 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Get In Touch <ChevronRight size={18} />
                </a>
              </div>

            </motion.div>

            {/* Right Column: Visual Composition */}
            <div className="order-2 lg:order-2">
               <HeroGraphic />
            </div>

          </div>
        </div>
      </section>

      {/* ================= PRODUCTS (Bento Cards) ================= */}
      <section className="py-24 bg-slate-50/80 border-y border-slate-200/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                Our Product Ecosystem
              </h2>
              <p className="text-lg text-slate-500">
                Tools crafted with intent—enabling seamless operations for individuals and enterprises.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((p, i) => (
              <ProductCard 
                key={i}
                {...p}
                delay={i * 0.15}
              />
            ))}
          </div>
          
          <div className="mt-8 md:hidden text-center">
            <a href="#" className="inline-flex items-center font-bold text-blue-600 gap-2">
              View All Products <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* ================= CLIENTS (Interactive Tabs) ================= */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center lg:text-left">
            <SectionTag>Success Stories</SectionTag>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mt-4 tracking-tight">
              Impact That Matters
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            {/* Left: Tab Navigation */}
            <div className="lg:w-1/3 flex flex-col gap-3">
              {Object.keys(clientCaseStudies).map((key) => {
                const item = clientCaseStudies[key];
                const isActive = activeTab === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`text-left p-5 rounded-2xl transition-all duration-300 border-2 relative overflow-hidden group ${
                      isActive 
                        ? "bg-white border-blue-600 shadow-xl shadow-blue-900/5 lg:translate-x-4" 
                        : "bg-slate-50 border-transparent hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex items-center gap-4 relative z-10">
                      <div className={`p-3 rounded-xl transition-colors ${isActive ? 'bg-blue-600 text-white' : 'bg-white text-slate-400 group-hover:text-blue-500'}`}>
                        <item.icon size={22} />
                      </div>
                      <div>
                        <h3 className={`font-bold text-base md:text-lg ${isActive ? 'text-slate-900' : 'text-slate-500'}`}>{item.client}</h3>
                        <p className={`text-xs font-bold uppercase tracking-wider ${isActive ? 'text-blue-600' : 'text-slate-400'}`}>
                          {item.category}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right: Content Display */}
            <div className="lg:w-2/3 min-h-[500px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-2xl shadow-slate-200/50 relative overflow-hidden h-full flex flex-col justify-between"
                >
                  {/* Decorative Background */}
                  <div className={`absolute -top-24 -right-24 w-96 h-96 rounded-full blur-[80px] opacity-30 pointer-events-none ${
                    clientCaseStudies[activeTab].color === 'orange' ? 'bg-orange-400' : 'bg-blue-500'
                  }`} />

                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="bg-yellow-50 text-yellow-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border border-yellow-100">
                         <Star size={12} fill="currentColor" /> 
                      </div>
                    </div>

                    <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">
                      {clientCaseStudies[activeTab].title}
                    </h3>
                    <p className="text-lg text-slate-500 mb-10 leading-relaxed max-w-2xl">
                      {clientCaseStudies[activeTab].desc}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {clientCaseStudies[activeTab].features.map((feat, idx) => (
                        <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors">
                          <h4 className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-2">
                             <CheckCircle2 size={14} className="text-green-500" /> {feat.head}
                          </h4>
                          <p className="text-sm text-slate-500 pl-6">{feat.sub}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-10 pt-8 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 relative z-10">
                     <div className="flex items-center gap-3">
                        <div className="flex -space-x-2">
                          <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white"/>
                          <div className="w-8 h-8 rounded-full bg-slate-300 border-2 border-white"/>
                        </div>
                        <span className="text-slate-500 text-sm font-medium">Verified Client</span>
                     </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="py-24 bg-[#0B1120] text-white relative overflow-hidden">
        {/* Modern Gradient Mesh */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-500/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight leading-tight">
              Ready to Build the <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-blue-400">
                Future Together?
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-light">
              Join the forward-thinking institutions and professionals scaling their potential with Frontier Wox Technologies.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <a 
                href="https://wa.me/919626806328"
                className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-blue-600/20 hover:shadow-blue-600/40 hover:-translate-y-1 transition-all duration-300"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}