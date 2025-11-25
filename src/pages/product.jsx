import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, Rocket, Wrench, ArrowRight, 
  CheckCircle2, PlayCircle, Users, Building2, 
  Network, ChevronRight, Star 
} from "lucide-react";
import Header from "../layouts/Navbar"; 
import Footer from "../layouts/Footer"; 

// --- COMPONENTS ---

const SectionTag = ({ children, color = "blue" }) => {
  const colorClasses = color === "orange" 
    ? "bg-orange-50 border-orange-100 text-orange-600" 
    : "bg-blue-50 border-blue-100 text-blue-600";
    
  const dotClass = color === "orange" ? "bg-orange-500" : "bg-blue-600";

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-widest mb-6 ${colorClasses}`}>
      <div className={`w-2 h-2 rounded-full animate-pulse ${dotClass}`} />
      {children}
    </div>
  );
};

const ProductCard = ({ title, status, desc, icon: Icon, link, img, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ y: -8 }}
    className="group relative flex flex-col h-full bg-white rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-300 overflow-hidden"
  >
    {/* Image Header */}
    <div className="h-48 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10" />
      <img src={img} alt={title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
      <div className="absolute top-4 right-4 z-20">
        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/90 backdrop-blur-md shadow-sm ${
          status === 'Live' ? 'text-emerald-600' : 'text-orange-600'
        }`}>
          {status}
        </span>
      </div>
    </div>

    {/* Content */}
    <div className="p-8 flex flex-col flex-grow relative z-20">
      <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
        <Icon size={28} />
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">{desc}</p>

      {link ? (
        <a href={link} className="inline-flex items-center text-sm font-bold text-blue-600 group-hover:gap-2 transition-all mt-auto">
          Launch App <ArrowRight size={16} className="ml-1 opacity-0 group-hover:opacity-100" />
        </a>
      ) : (
        <span className="inline-flex items-center text-sm font-bold text-slate-400 mt-auto cursor-not-allowed">
          Coming Soon
        </span>
      )}
    </div>
  </motion.div>
);

export default function AboutProductsClients() {
  const [activeTab, setActiveTab] = useState("academic");

  // Transformed Client Data into the "Console" Structure
  const clientCaseStudies = {
    academic: {
      id: "academic",
      client: "Dr. Julius Caesar",
      category: "Personal Branding",
      title: "Digital Identity System",
      desc: "A complete digital portfolio ecosystem designed for high-profile academics.",
      features: [
        { head: "Interactive Interface", sub: "Seamless navigation of achievements and works." },
        { head: "Publication Archive", sub: "Structured database for research papers and books." },
        { head: "Global Accessibility", sub: "Optimized for speed and SEO worldwide." },
      ],
      icon: Users,
      color: "blue"
    },
    institution: {
      id: "institution",
      client: "Our Lady of Fatima",
      category: "Institutional Tech",
      title: "Smart Campus Identity",
      desc: "High-quality ID card systems aligned with institutional branding and security.",
      features: [
        { head: "Print Optimization", sub: "High-resolution assets for physical ID cards." },
        { head: "Brand Consistency", sub: "Unified design language across all grades." },
        { head: "Bulk Processing", sub: "Systems to handle thousands of student records." },
      ],
      icon: Building2,
      color: "orange"
    },
    infra: {
      id: "infra",
      client: "Jayaraj Annapackiam College",
      category: "Infrastructure",
      title: "Enterprise Networking",
      desc: "Technical setup and workflow enablement for smooth digital operations.",
      features: [
        { head: "Network Architecture", sub: "Robust connectivity solutions for campus." },
        { head: "Workflow Automation", sub: "Digitizing manual administrative tasks." },
        { head: "Scalable Support", sub: "Systems built to grow with the student body." },
      ],
      icon: Network,
      color: "blue"
    }
  };

  const products = [
    {
      title: "Free Will Resume",
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
      title: "Free Will People",
      status: "Enterprise",
      desc: "A complete HRMS: attendance, payroll, onboarding, leave tracking, and automated workflows.",
      icon: Wrench,
      img: "https://th.bing.com/th/id/OIP.6ycs8tJ86UGW1wyqyZSETQHaEK?w=297&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-orange-100 selection:text-orange-900">
      <Header />

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-32 pb-20 lg:pt-35 lg:pb-32 overflow-hidden">
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        
        {/* Soft Gradient Blobs */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100/50 blur-[120px] rounded-full mix-blend-multiply opacity-60 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-100/50 blur-[120px] rounded-full mix-blend-multiply opacity-60" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <SectionTag color="orange">Free Will Technologies</SectionTag>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1]">
              Seamlessly Unify <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-blue-600">
                Digital Excellence
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
              We build next-generation tools with craftsmanship and precision. 
              <strong className="text-slate-900 font-semibold"> Simple. Powerful. Future-Ready.</strong>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="https://wa.me/919626806328"
                className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white rounded-xl font-bold shadow-xl shadow-slate-900/20 hover:bg-slate-800 hover:-translate-y-1 transition-all duration-300"
              >
                Start a Project
              </a>
              <button className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 hover:border-slate-300 flex items-center justify-center gap-2 transition-all duration-300">
                <PlayCircle size={20} className="text-orange-500" /> Watch Our Vision
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= PRODUCTS (Bento Style) ================= */}
      <section className="py-24 bg-slate-50/50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Our Product Ecosystem
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-blue-600 mx-auto rounded-full mb-4" />
            <p className="text-slate-500 max-w-2xl mx-auto">
              Tools crafted with intent — enabling individuals and enterprises to reach their full potential.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((p, i) => (
              <ProductCard 
                key={i}
                {...p}
                delay={i * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================= CLIENTS (Interactive Tabs) ================= */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <SectionTag>Success Stories</SectionTag>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mt-4 max-w-3xl">
              Trusted by Professionals & Institutions
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            {/* Left: Tab Navigation */}
            <div className="lg:w-1/3 flex flex-col gap-4">
              {Object.keys(clientCaseStudies).map((key) => {
                const item = clientCaseStudies[key];
                const isActive = activeTab === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`text-left p-6 rounded-2xl transition-all duration-300 border group ${
                      isActive 
                        ? "bg-white border-blue-200 shadow-xl shadow-blue-900/5 scale-105 z-10" 
                        : "bg-slate-50 border-transparent hover:bg-slate-100 text-slate-400"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl transition-colors ${isActive ? 'bg-blue-600 text-white' : 'bg-white text-slate-400 group-hover:text-blue-500'}`}>
                        <item.icon size={24} />
                      </div>
                      <div>
                        <h3 className={`font-bold text-lg ${isActive ? 'text-slate-900' : 'text-slate-500'}`}>{item.client}</h3>
                        <p className={`text-xs font-bold uppercase tracking-wider mt-1 ${isActive ? 'text-blue-600' : 'text-slate-400'}`}>
                          {item.category}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right: Content Display */}
            <div className="lg:w-2/3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-2xl shadow-slate-200/50 relative overflow-hidden h-full"
                >
                  {/* Decorative Gradient Background */}
                  <div className={`absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[100px] opacity-20 pointer-events-none ${
                    clientCaseStudies[activeTab].color === 'orange' ? 'bg-orange-500' : 'bg-blue-600'
                  }`} />

                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                      <Star className="text-orange-500 fill-orange-500" size={20} />
                      <span className="font-bold text-slate-400 text-sm">Success Story</span>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                      {clientCaseStudies[activeTab].title}
                    </h3>
                    <p className="text-lg text-slate-500 mb-8 leading-relaxed max-w-xl">
                      {clientCaseStudies[activeTab].desc}
                    </p>

                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                      <ul className="space-y-6">
                        {clientCaseStudies[activeTab].features.map((feat, idx) => (
                          <li key={idx} className="flex gap-4 items-start">
                            <div className="mt-1 bg-white border border-slate-200 text-green-600 p-1.5 rounded-full shadow-sm">
                              <CheckCircle2 size={16} />
                            </div>
                            <div>
                              <h4 className="font-bold text-slate-900">{feat.head}</h4>
                              <p className="text-sm text-slate-500 mt-1">{feat.sub}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                       <span className="text-slate-400 text-sm font-semibold">Result: 100% Client Satisfaction</span>
                       <button className="text-blue-600 font-bold flex items-center gap-2 hover:gap-4 transition-all">
                         View Details <ChevronRight size={18} />
                       </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="py-24 bg-[#0F172A] text-white relative overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-500/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Ready to Build the <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-blue-400">
                Future Together?
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10 font-light">
              Join the institutions and professionals scaling their potential with Free Will Technologies.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <a 
                href="https://wa.me/919626806328"
                className="px-10 py-5 bg-blue-600 rounded-2xl font-bold text-lg shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-1 transition-all duration-300"
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