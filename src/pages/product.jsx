import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform ,AnimatePresence} from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { Briefcase, Rocket, Wrench } from "lucide-react";
import VisionOSGlassCard from "../components/VisionOSGlassCard";
import Footer from "../layouts/Footer";
import Header from "../layouts/Navbar";

export default function AboutProductsClients() {
  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  /* Magnetic CTA Hook */
  const useMagnetic = () => {
    const ref = useRef(null);
    useEffect(() => {
      const el = ref.current;
      if (!el) return;

      const strength = 25;

      const move = (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        el.style.transform = `translate(${x / strength}px, ${y / strength}px)`;
      };

      const reset = () => (el.style.transform = "translate(0,0)");

      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", reset);

      return () => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", reset);
      };
    }, []);
    return ref;
  };

  const magneticRef = useMagnetic();

  /* 3D Tilt Wrapper */
  const Card3D = ({ children }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-50, 50], [8, -8]);
    const rotateY = useTransform(x, [-50, 50], [-8, 8]);

    const handleMove = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      x.set(e.clientX - (rect.left + rect.width / 2));
      y.set(e.clientY - (rect.top + rect.height / 2));
    };

    return (
      <motion.div
        style={{ rotateX, rotateY }}
        onMouseMove={handleMove}
        onMouseLeave={() => {
          x.set(0);
          y.set(0);
        }}
        className="transition-transform"
      >
        {children}
      </motion.div>
    );
  };

  /* Clients */
  const clients = [
    {
      name: "Dr Julius Caesar",
      desc:
        "Complete digital identity system with portfolio, achievements, publication sections & interactive interface.",
    },
    {
      name: "Our Lady of Fatima School",
      desc:
        "High-quality ID card system aligned with institutional branding and print optimization.",
    },
    {
      name: "Jayaraj Annapackiam College",
      desc:
        "Technical setup, networking support, and workflow enablement for smooth digital operations.",
    },
  ];

  /* Products */
  const products = [
  {
    title: "Free Will - Resume Builder",
    status: "Live",
    desc:
      "Smart, elegant, and AI-enhanced resume templates with instant export & professional layouts.",
    icon: <Briefcase className="text-orange-400 w-6 h-6" />,
    img:
      "https://www.workruit.com/_next/image/?url=https:%2F%2Fd2rac4ixos46cj.cloudfront.net%2Fwebsiteimages%2Fimages%2Fpng%2FCV_Builder_best.png&w=1080&q=75",
    link: "https://resumebuilder.freewilltech.in/",
  },
  {
    title: "Free Will - Portfolio Builder",
    status: "Ongoing",
    desc:
      "A one-click personal website generator with animations, smart sections and live hosting.",
    icon: <Rocket className="text-orange-400 w-6 h-6" />,
    img:
      "https://tse1.mm.bing.net/th/id/OIP.2g4_Zqc-IXcapal7GUfWlgHaET?rs=1&pid=ImgDetMain&o=7&rm=3",
  },

  // ⭐ NEW CARD ADDED HERE
  {
    title: "Free Will People - HRMS Portal",
    status: "Ongoing",
    desc:
      "A complete Human Resource Management System featuring attendance, payroll, onboarding, leave tracking, and automated workflows built for modern teams.",
    icon: <Wrench className="text-orange-400 w-6 h-6" />,
    img:
      "https://th.bing.com/th/id/OIP.6ycs8tJ86UGW1wyqyZSETQHaEK?w=297&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
  },
];

const [currentIndex, setCurrentIndex] = React.useState(0);

React.useEffect(() => {
  const interval = setInterval(() => {
    setCurrentIndex((prev) => (prev + 1) % clients.length);
  }, 3200);
  return () => clearInterval(interval);
}, []);


  return (
    <>
      <Header />

      <section className="relative py-24 px-5 sm:px-8 lg:px-[7%] font-[Nunito] overflow-hidden">

        {/* Morphing Blobs */}
        <div className="absolute top-0 left-0 w-[380px] h-[380px] bg-primary/10 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[360px] h-[360px] bg-orange-400/10 blur-[130px] rounded-full animate-pulse"></div>

        {/* ================= ABOUT ================= */}
        <div data-aos="fade-up" className="mb-20 max-w-5xl relative z-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-orange-600">
            About Free Will Technologies
          </h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "90px" }}
            transition={{ duration: 0.8 }}
            className="h-[4px] mt-2 bg-gradient-to-r from-orange-500 to-blue-600 rounded-full"
          ></motion.div>

          <p className="mt-5 text-slate-600 leading-relaxed max-w-3xl">
            We build next-generation digital tools with craftsmanship and
            precision. Every product is designed to feel seamless, powerful, and
            beautifully simple.
          </p>

          <p className="mt-4 text-slate-600 leading-relaxed max-w-3xl">
            We combine engineering, automation, and thoughtful design to create
            experiences that are elegant, reliable, and future-ready.
          </p>

          <motion.a
            ref={magneticRef}
            whileHover={{ scale: 1.07 }}
            className="inline-block mt-6 bg-blue-600 text-white font-semibold py-3 px-7 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer"
          >
            Learn More
          </motion.a>
        </div>

        {/* ================= PRODUCTS ================= */}
        <div data-aos="fade-up" className="mb-20 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-orange-600">
            Our Products
          </h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "90px" }}
            transition={{ duration: 0.8 }}
            className="h-[4px] mt-2 bg-gradient-to-r from-orange-500 to-blue-600 rounded-full"
          ></motion.div>

          <p className="text-slate-600 mt-3 max-w-2xl">
            Tools crafted with intent — simple, fast, intelligent, and elegant.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
            {products.map((p, i) => (
              <Card3D key={i}>
                <VisionOSGlassCard className="rounded-[26px]">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-[210px] object-cover rounded-t-[26px]"
                  />

                  <div className="p-6">
                    <div className="flex items-center gap-3">
                      {p.icon}
                      <h3 className="text-xl font-bold text-white">
                        {p.title}
                      </h3>

                      <span className="ml-auto text-xs bg-white/20 text-orange-400 px-3 py-1 rounded-full">
                        {p.status}
                      </span>
                    </div>

                    <p className="text-gray-200 text-sm mt-3">{p.desc}</p>

                    {p.link && (
                      <button
                        onClick={() => (window.location.href = p.link)}
                        className="text-orange-400 font-semibold text-sm mt-3 hover:underline"
                      >
                        Explore →
                      </button>
                    )}
                  </div>
                </VisionOSGlassCard>
              </Card3D>
            ))}
          </div>
        </div>
         {/* ================= CLIENTS ================= */}
<div data-aos="fade-up" className="relative z-10">
  <h2 className="text-3xl sm:text-4xl font-extrabold text-orange-500">
    Our Clients
  </h2>

  <motion.div
    initial={{ width: 0 }}
    whileInView={{ width: "90px" }}
    transition={{ duration: 0.8 }}
    className="h-[4px] mt-2 bg-gradient-to-r from-primary to-blue-600 rounded-full"
  ></motion.div>

  <p className="text-slate-600 mt-3 max-w-2xl">
    Trusted by institutions and industry professionals.
  </p>

  {/* 🌟 Crossfade Carousel with Transparent Next/Previous Cards */}
<div className="relative w-full mt-12 h-[260px] sm:h-[280px]">
  <div className="absolute inset-0 flex items-center justify-center">
  {/* 🌟 Premium 3-Card Transparent Carousel */}
<div className="relative w-full mt-12 h-[260px] sm:h-[280px] flex items-center justify-center">

  {/* 🔸 LEFT ghost card */}
  <motion.div
    key={"left-" + currentIndex}
    initial={{ opacity: 0, x: -40, scale: 0.8 }}
    animate={{
      opacity: 0.35,
      x: -220,
      scale: 0.85,
    }}
    transition={{ duration: 0.8, ease: "easeInOut" }}
    className="absolute"
  >
    <VisionOSGlassCard className="w-[240px] rounded-[26px]">
      <div className="p-5">
        <h3 className="text-lg font-bold text-orange-500">
          {clients[(currentIndex - 1 + clients.length) % clients.length].name}
        </h3>
        <p className="text-gray-200 text-xs mt-2">
          {clients[(currentIndex - 1 + clients.length) % clients.length].desc}
        </p>
      </div>
    </VisionOSGlassCard>
  </motion.div>

  {/* 🔥 ACTIVE card */}
  <AnimatePresence mode="wait">
    <motion.div
      key={currentIndex}
      initial={{ opacity: 0, scale: 0.9, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -15 }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
      className="absolute z-10"
    >
      <Card3D>
        <VisionOSGlassCard className="w-[300px] sm:w-[340px] rounded-[26px]">
          <div className="p-6">
            <h3 className="text-xl font-bold text-orange-500">
              {clients[currentIndex].name}
            </h3>
            <p className="text-gray-200 text-sm mt-2">
              {clients[currentIndex].desc}
            </p>
          </div>
        </VisionOSGlassCard>
      </Card3D>
    </motion.div>
  </AnimatePresence>

  {/* 🔸 RIGHT ghost card */}
  <motion.div
    key={"right-" + currentIndex}
    initial={{ opacity: 0, x: 40, scale: 0.8 }}
    animate={{
      opacity: 0.35,
      x: 220,
      scale: 0.85,
    }}
    transition={{ duration: 0.8, ease: "easeInOut" }}
    className="absolute"
  >
    <VisionOSGlassCard className="w-[240px] rounded-[26px]">
      <div className="p-5">
        <h3 className="text-lg font-bold text-orange-500">
          {clients[(currentIndex + 1) % clients.length].name}
        </h3>
        <p className="text-gray-200 text-xs mt-2">
          {clients[(currentIndex + 1) % clients.length].desc}
        </p>
      </div>
    </VisionOSGlassCard>
  </motion.div>

</div>

  </div>
</div>

</div>
      </section>

      <Footer />
    </>
  );
}
