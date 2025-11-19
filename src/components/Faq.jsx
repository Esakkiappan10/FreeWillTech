// src/pages/Faq.jsx
import React, { useState, useRef, useEffect } from "react";
import { Phone } from "lucide-react";
import { motion, useAnimation, useInView } from "framer-motion";
import FaqAccodion from "./FaqAccordian";
import { profile3 } from "../assets/image";

const accordionData = [
  {
    title: "What services does Free Will Technologies offer?",
    desc: "We provide Web Design, Web & Mobile App Development, Graphic Design, CMS-based Development, and Business Portfolio Sites. Our solutions are tailored to each client using modern technologies.",
  },
  {
    title: "Do you develop custom business portfolio websites?",
    desc: "Yes — we create professional, elegant, and high-performing portfolio websites that strengthen brand identity and help businesses showcase their work effectively.",
  },
  {
    title: "Can Free Will Technologies revamp my existing website?",
    desc: "Absolutely. Whether it’s UI/UX improvements, performance upgrades, SEO fixes, or a complete redesign, we modernize websites to align with today’s standards.",
  },
  {
    title: "What technologies do you use for development?",
    desc: "We use React, Node.js, Express, MongoDB, MySQL, and Flutter to build fast, scalable, and reliable digital products.",
  },
];

/* motion variants */
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { delay, duration: 0.6, ease: "easeOut" } },
});

export default function Faq() {
  const [open, setOpen] = useState(null);

  const toggle = (index) => setOpen((prev) => (prev === index ? null : index));

  const rootRef = useRef(null);
  const inView = useInView(rootRef, { once: true, margin: "-120px" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("show");
  }, [inView, controls]);

  return (
    <section
      ref={rootRef}
      className="relative py-16 lg:py-24 font-[Nunito] overflow-visible"
      aria-labelledby="faq-heading"
    >
      {/* Ambient Background Lights */}
      <div className="absolute -left-20 top-0 w-[320px] h-[320px] bg-primary/10 blur-[120px] rounded-full -z-10" />
      <div className="absolute right-0 bottom-10 w-[420px] h-[420px] bg-orange-400/10 blur-[150px] rounded-full -z-10" />

      <div className="w-[90%] lg:w-[85%] xl:w-[80%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

        {/* LEFT — Image + Contact Card (Vision Pro Style) */}
        <motion.div
          className="relative flex justify-center items-start"
          variants={fadeUp(0.05)}
          initial="hidden"
          animate={controls}
        >
          {/* Image */}
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.2)] bg-white/10 backdrop-blur-xl border border-white/20"
          >
            <img
              src={profile3}
              alt="Team Illustration"
              className="w-[92%] md:w-[80%] object-cover rounded-2xl mx-auto"
            />
          </motion.div>

          {/* Contact Card */}
          <motion.div
            className="absolute bottom-[-40px] right-0 md:right-6 lg:right-[-10px] p-6 md:p-7 rounded-2xl bg-gradient-to-br from-[#3e4fef] to-[#3344da] shadow-2xl w-[92%] sm:w-[78%] md:w-[68%] lg:w-[70%] text-white"
            variants={fadeUp(0.16)}
          >
            <h3 className="text-lg sm:text-xl font-bold leading-tight">
              Contact Us For a{" "}
              <span className="text-orange-600">Free Learning</span> Consultation
            </h3>

            <div className="mt-4 flex items-center gap-3 w-fit px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-700 rounded-xl shadow-md">
              <Phone className="stroke-white w-5 h-5" />
              <a href="tel:+919626806328" className="text-white font-medium text-sm sm:text-base">
                +91 96268 06328
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT — FAQ TEXT */}
        <motion.div variants={fadeUp(0.12)} initial="hidden" animate={controls}>
          
          {/* Section Indicator */}
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/30 rounded-full">
              <div className="h-3 w-3 bg-blue-500 rounded-full shadow-md" />
            </div>
            <p className="text-blue-500 font-bold text-xs sm:text-sm uppercase tracking-wide">
              FAQ
            </p>
          </div>

          {/* Heading + SVG Underline */}
          <div className="relative w-fit mb-6">
            <motion.h2
              id="faq-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#f87d02] leading-tight"
              variants={fadeUp(0.16)}
            >
              Frequently Asked Questions
            </motion.h2>

            {/* Animated underline */}
            <motion.svg
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 1.6, ease: "easeOut" }}
              className="absolute left-0 bottom-[-10px]"
              width="260"
              height="24"
              viewBox="0 0 260 24"
            >
              <motion.path
                d="M5 15C55 5 205 5 255 15"
                stroke="url(#faqGrad)"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="faqGrad" x1="0" x2="260" y1="0" y2="0">
                  <stop offset="0%" stopColor="#1E9CD7" />
                  <stop offset="100%" stopColor="#1473A6" />
                </linearGradient>
              </defs>
            </motion.svg>
          </div>

          {/* Subtitle */}
          <motion.p
            className="text-gray-600 mb-6 text-sm sm:text-base max-w-prose leading-relaxed"
            variants={fadeUp(0.20)}
          >
            Find clear answers to common questions — from services to tech stacks.  
            Need something specific? Our team replies within one business day.
          </motion.p>

          {/* ACCORDION LIST */}
          <motion.div
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            {accordionData.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp(0.24 + i * 0.05)}
                whileTap={{ scale: 0.995 }}
              >
                <FaqAccodion
                  open={open === i}
                  title={item.title}
                  desc={item.desc}
                  toggle={() => toggle(i)}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Buttons */}
          <motion.div
            className="mt-8 flex flex-col sm:flex-row gap-4"
            variants={fadeUp(0.32)}
          >
            <a
              href="/contact"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold shadow-lg hover:-translate-y-1 transition"
            >
              Contact Us
            </a>

            <a
              href="/contact#careers"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 text-[#0f172a] font-medium hover:bg-slate-50 transition"
            >
              Join our team
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
