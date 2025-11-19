// src/components/ServiceProvided.jsx
import React, { useRef, useEffect, useState } from "react";
import {
  Code,
  Palette,
  MonitorSmartphone,
  Layers,
  LayoutDashboard,
  Globe,
  ShoppingCart,
  BookOpen,
  Zap,
} from "lucide-react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";

const services = [
  {
    id: "web-design",
    icon: LayoutDashboard,
    title: "Web Design",
    description:
      "Visually stunning, user-centered interfaces crafted with precision and brand elegance.",
    features: [
      "Responsive layouts for all devices",
      "Design systems & reusable components",
      "Prototyping and rapid iterations",
    ],
    tools: ["Figma", "Sketch", "Design Systems"],
    caseStudies:
      "Designed a lead-converting site for a retail brand — 42% increase in engagement.",
  },
  {
    id: "web-dev",
    icon: Code,
    title: "Web Development",
    description:
      "High-performance, scalable, SEO-ready websites built with modern web technologies.",
    features: [
      "Progressive enhancement & accessibility",
      "Optimized loading and Lighthouse-friendly",
      "CMS or Headless setups as required",
    ],
    tools: ["React", "Next.js", "Node"],
    caseStudies:
      "Built an e-commerce platform serving 10k daily users with near-zero downtime.",
  },
  {
    id: "graphic-design",
    icon: Palette,
    title: "Graphic Design",
    description:
      "Impactful branding, marketing assets, and creative visuals that make your identity unforgettable.",
    features: ["Logo & brand kits", "Marketing creatives", "Print & digital assets"],
    tools: ["Illustrator", "Photoshop"],
    caseStudies: "Brand refresh that improved recall for a local chain.",
  },
  {
    id: "app-dev",
    icon: MonitorSmartphone,
    title: "App Development",
    description: "Beautifully crafted mobile apps for Android & iOS with great UX.",
    features: [
      "Native or cross-platform options",
      "Smooth animations & native interactions",
      "App store submission & CI pipelines",
    ],
    tools: ["React Native", "Flutter"],
    caseStudies:
      "Delivered an on-demand app used by 50k+ installs in first 6 months.",
  },
  {
    id: "cms",
    icon: Layers,
    title: "CMS Development",
    description:
      "Flexible content platforms enabling non-technical teams to publish with ease.",
    features: ["Custom editors", "Role-based access", "Headless APIs"],
    tools: ["Strapi", "WordPress", "Sanity"],
    caseStudies: "CMS migration with zero content loss and faster editorial flow.",
  },
  {
    id: "portfolio-sites",
    icon: Globe,
    title: "Business Portfolio Sites",
    description:
      "High-impact portfolio sites that boost credibility and drive engagement.",
    features: ["Showcase case studies", "Lead capture forms", "SEO-first copy"],
    tools: ["Static sites", "SSR"],
    caseStudies: "Small business portfolio that doubled inbound queries.",
  },
];

/* -------------------------
   VisionCard (enhanced)
   - supports expand/collapse details
   - shows Learn More modal
------------------------- */
function VisionCard({
  service,
  prefersReducedMotion,
  onOpenModal,
}) {
  const { icon: Icon, title, description, features } = service;
  const [expanded, setExpanded] = useState(false);

  // Motion variants
  const cardVariant = {
    hidden: { opacity: 0, y: 18 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.06, duration: 0.48 },
    }),
  };

  const detailsVariants = {
    closed: { height: 0, opacity: 0, transition: { duration: 0.3 } },
    open: { height: "auto", opacity: 1, transition: { duration: 0.4 } },
  };

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      custom={0}
      variants={cardVariant}
      className="relative rounded-[26px] p-[2px] will-change-transform"
    >
      {/* Outer rim */}
      <div className="absolute inset-0 rounded-[26px] bg-gradient-to-br from-white/6 to-white/2 pointer-events-none" />

      {/* Floating subtle particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <span
            key={i}
            className="absolute w-[5px] h-[5px] bg-white/20 rounded-full blur-[2px]"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `scale(${0.8 + Math.random() * 0.8})`,
              opacity: 0.45,
            }}
          />
        ))}
      </div>

      {/* Reflection sweep */}
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/12 to-transparent opacity-30 pointer-events-none rounded-[24px]"
        animate={!prefersReducedMotion ? { x: ["-120%", "120%"] } : {}}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Card surface */}
      <div
        className="
          relative z-10
          bg-black/40 backdrop-blur-3xl border border-white/8 rounded-[24px]
          shadow-[0_18px_60px_rgba(2,6,23,0.38)]
          p-6 sm:p-8 min-h-[220px] flex flex-col
        "
      >
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-white/6 flex items-center justify-center shadow-inner">
            <Icon size={28} className="text-orange-600" aria-hidden />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-semibold text-white text-center mb-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-blue-200 text-center text-sm md:text-sm leading-relaxed mb-4">
          {description}
        </p>

        {/* Expand / quick features */}
        <div className="mt-auto">
          <div className="flex justify-center gap-3 mb-3">
            <button
              onClick={() => setExpanded((s) => !s)}
              aria-expanded={expanded}
              className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/6 text-white text-sm hover:bg-white/10 transition"
            >
              {expanded ? "Hide details" : "View details"}
            </button>

            <button
              onClick={() => onOpenModal(service)}
              className="inline-flex items-center px-3 py-1.5 rounded-full border border-white/10 text-white text-sm hover:bg-white/6 transition"
            >
              Learn more
            </button>
          </div>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={detailsVariants}
                className="overflow-hidden px-2"
                aria-hidden={!expanded}
              >
                <ul className="text-gray-200 text-sm leading-relaxed space-y-2">
                  {features?.map((f, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="mt-1 text-primary">
                        <Zap size={14} />
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.article>
  );
}

/* -------------------------
   Modal (full-screen, accessible)
------------------------- */
function DetailsModal({ open, onClose, service, prefersReducedMotion }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const prevActive = document.activeElement;
    // Focus modal for keyboard users
    dialogRef.current?.focus?.();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      prevActive?.focus?.();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-6 sm:p-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-modal="true"
          role="dialog"
        >
          {/* backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* modal panel */}
          <motion.div
            ref={dialogRef}
            tabIndex={-1}
            className="relative z-10 max-w-3xl w-full rounded-2xl bg-white/6 backdrop-blur-3xl border border-white/8 p-6 sm:p-10 shadow-2xl"
            initial={prefersReducedMotion ? {} : { y: 24, opacity: 0 }}
            animate={prefersReducedMotion ? {} : { y: 0, opacity: 1 }}
            exit={prefersReducedMotion ? {} : { y: 24, opacity: 0 }}
            transition={{ duration: 0.36 }}
          >
            <div className="flex justify-between items-start gap-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-gray-200 mb-4">{service.description}</p>

                <div className="mb-4">
                  <h4 className="text-sm text-white/90 font-semibold mb-2">What we do</h4>
                  <ul className="text-gray-200 space-y-2">
                    {(service.features || []).map((f, i) => (
                      <li key={i} className="flex gap-3 items-start">
                        <span className="text-primary mt-1"><Zap size={16} /></span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm text-white/90 font-semibold mb-2">Tools & tech</h4>
                  <div className="flex flex-wrap gap-2">
                    {(service.tools || []).map((t, i) => (
                      <span
                        key={i}
                        className="text-xs bg-white/6 px-3 py-1 rounded-full text-white/90"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {service.caseStudies && (
                  <div>
                    <h4 className="text-sm text-white/90 font-semibold mb-2">Case study</h4>
                    <p className="text-gray-200 text-sm">{service.caseStudies}</p>
                  </div>
                )}
              </div>

              <div className="shrink-0 hidden sm:block w-[190px]">
                <div className="w-full h-[140px] rounded-xl bg-gradient-to-br from-primary/30 to-blue-300/18 flex items-center justify-center">
                  <BookOpen size={48} className="text-white/80" />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-md bg-white/6 text-white hover:bg-white/10 transition"
              >
                Close
              </button>
              <a
                href="/contact"
                className="px-4 py-2 rounded-md bg-primary text-white hover:brightness-105 transition"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* -------------------------
   Main Exported Component
------------------------- */
export default function ServiceProvided() {
  const prefersReducedMotion = useReducedMotion();
  const [modalOpen, setModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);

  const openModal = (service) => {
    setCurrentService(service);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setCurrentService(null);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-10 -left-20 w-[320px] h-[320px] bg-primary/12 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-[340px] h-[340px] bg-purple-300/18 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-[2]">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-blue-500 font-semibold tracking-wide">WHAT WE PROVIDE</p>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-orange-500 mt-2">
            Our Professional Services
          </h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 88 }}
            transition={{ duration: 0.8 }}
            className="mx-auto mt-4 h-[4px] bg-gradient-to-r from-orange-500 to-blue-600 rounded-full"
          />
        </div>

        {/* Responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((svc, i) => (
            <VisionCard
              key={svc.id}
              service={svc}
              prefersReducedMotion={prefersReducedMotion}
              onOpenModal={openModal}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <DetailsModal
        open={modalOpen}
        service={currentService || services[0]}
        onClose={closeModal}
        prefersReducedMotion={prefersReducedMotion}
      />
    </section>
  );
}
