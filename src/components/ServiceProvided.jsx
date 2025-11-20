// src/components/ServiceProvided.jsx
import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  Code,
  Palette,
  MonitorSmartphone,
  Layers,
  LayoutDashboard,
  Globe,
  BookOpen,
  Zap,
  ShoppingCart,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/**
 * Ultimate, responsive, accessible, font-consistent ServiceProvided
 * - Uses font-heading, font-body, font-alt utility classes (make sure they exist in your CSS)
 * - Mobile-first responsive grid
 * - Reduced-motion friendly
 * - Keyboard-accessible modal with focus management
 * - Clean performance-minded framer-motion variants
 */

/* --------- data --------- */
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
    caseStudies: `We translate brand strategy into pixel-perfect interfaces that guide users to action. 
Our process begins with research and IA, followed by rapid wireframing and high-fidelity prototypes. 
We validate with user testing, iterate on feedback, and hand off a production-ready design system that scales.`,
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
    caseStudies: `We build robust web platforms focused on performance, security and maintainability. 
Our approach uses component-driven development, automated testing, and CI/CD pipelines to ensure stable releases. 
We optimize for SEO and accessibility, then measure and tune performance post-launch for sustained results.`,
  },
  {
    id: "graphic-design",
    icon: Palette,
    title: "Graphic Design",
    description:
      "Impactful branding, marketing assets, and creative visuals that make your identity unforgettable.",
    features: ["Logo & brand kits", "Marketing creatives", "Print & digital assets"],
    tools: ["Illustrator", "Photoshop"],
    caseStudies: `We craft visual identities that express your values and resonate with your audience. 
Starting from concept and mood-boards, we iterate on logo systems, typography, and color palettes. 
Deliverables include adaptable brand kits, marketing templates and production-ready assets for digital and print.`,
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
    caseStudies: `We design and implement mobile experiences with performance and native feel as priorities. 
We map product flows, build modular UI, and integrate with backend APIs while applying rigorous QA. 
After launch we monitor analytics and iterate to improve retention, engagement and conversion.`,
  },
  {
    id: "cms",
    icon: Layers,
    title: "CMS Development",
    description:
      "Flexible content platforms enabling non-technical teams to publish with ease.",
    features: ["Custom editors", "Role-based access", "Headless APIs"],
    tools: ["Strapi", "WordPress", "Sanity"],
    caseStudies: `We deliver CMS solutions that put editors in control without sacrificing performance. 
We design intuitive content models and editorial workflows, implement role-based security, and expose fast APIs. 
Migrations and integrations are executed with careful data validation to avoid downtime and ensure content integrity.`,
  },
  {
    id: "portfolio-sites",
    icon: Globe,
    title: "Business Portfolio Sites",
    description:
      "High-impact portfolio sites that boost credibility and drive engagement.",
    features: ["Showcase case studies", "Lead capture forms", "SEO-first copy"],
    tools: ["Static sites", "SSR"],
    caseStudies: `We create portfolio sites that showcase your work and convert visitors into leads. 
Our process combines strategic storytelling, performance-optimized pages, and conversion-focused CTAs. 
We deliver a fast, SEO-friendly site with analytics and A/B ideas to continuously improve lead flow.`,
  },
];

/* --------- motion variants --------- */
const gridVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.995 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] } },
  hover: { y: -6, scale: 1.02, transition: { type: "spring", stiffness: 220, damping: 18 } },
};

/* --------- small util: trap focus inside modal --------- */
function useFocusTrap(active) {
  const ref = useRef(null);
  useEffect(() => {
    if (!active) return;
    const node = ref.current;
    if (!node) return;
    const focusable = node.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const onKey = (e) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    first?.focus?.();
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);
  return ref;
}

/* --------- VisionCard (refined, responsive) --------- */
function VisionCard({ service, onOpen }) {
  const prefersReducedMotion = useReducedMotion();
  const [expanded, setExpanded] = useState(false);
  const Icon = service.icon || BookOpen;

  return (
    <motion.article
      layout
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={cardVariants}
      whileHover={prefersReducedMotion ? {} : "hover"}
      className="relative group rounded-2xl"
    >
      {/* gradient rim */}
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-orange-500/20 to-blue-600/10 pointer-events-none blur-sm" />

      <div
        className="
          relative z-10 bg-white/4 backdrop-blur-md border border-white/6 rounded-2xl
          shadow-[0_12px_40px_rgba(2,6,23,0.35)] p-5 sm:p-6 flex flex-col h-full
        "
      >
        {/* icon and mockup */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-16 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-orange-500 to-blue-600 text-white shadow-inner">
              <Icon size={20} aria-hidden />
            </div>
            <div>
              <h3 className="font-heading text-lg sm:text-lg font-semibold text-blue-400 leading-tight">
                {service.title}
              </h3>
              <p className="text-sm text-orange-500 font-body">{service.description}</p>
            </div>
          </div>
        </div>

        {/* features (compact on small screens) */}
        <ul className="text-sm text-blue-600 space-y-2 mb-4 font-body">
          {service.features.slice(0, 3).map((f, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-1 text-orange-400"><Zap size={14} /></span>
              <span>{f}</span>
            </li>
          ))}
        </ul>

        {/* footer controls */}
        <div className="mt-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">

            <button
              onClick={() => onOpen(service)}
              className="text-sm px-3 py-1 rounded-full border border-white/8 text-orange-500 hover:bg-white/6 transition font-alt"
            >
              Open
            </button>
          </div>
        </div>

        {/* expandable area */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.36 }}
              className="mt-4 pt-3 border-t border-white/6"
            >
              <div className="text-sm text-blue-600 space-y-2">
                {service.features.map((f, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="mt-1 text-orange-400"><Zap size={14} /></span>
                    <span>{f}</span>
                  </div>
                ))}
                <div className="mt-3 flex flex-wrap gap-2">
                  {(service.tools || []).map((t, ix) => (
                    <span key={ix} className="text-xs px-2 py-1 bg-white/6 rounded-full">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

/* --------- Details Modal (accessible) --------- */
function DetailsModal({ open, onClose, service }) {
  const prefersReducedMotion = useReducedMotion();
  const trapRef = useFocusTrap(open);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const onClickBackdrop = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={overlayRef}
          className="fixed inset-0 z-[60] flex items-center justify-center p-6 sm:p-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClickBackdrop}
          aria-modal="true"
          role="dialog"
        >
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

          <motion.div
            ref={trapRef}
            className="relative z-10 max-w-3xl w-full rounded-2xl bg-white/6 backdrop-blur-3xl border border-white/8 p-6 sm:p-10 shadow-2xl"
            initial={prefersReducedMotion ? {} : { y: 18, opacity: 0 }}
            animate={prefersReducedMotion ? {} : { y: 0, opacity: 1 }}
            exit={prefersReducedMotion ? {} : { y: 18, opacity: 0 }}
            transition={{ duration: 0.36 }}
          >
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1">
                <h3 className="font-heading text-2xl text-white font-bold mb-2">{service.title}</h3>
                <p className="text-slate-200 mb-4">{service.description}</p>

                <div className="mb-4">
                  <h4 className="text-sm text-white/90 font-semibold mb-2">What we do</h4>
                  <ul className="text-slate-200 space-y-2">
                    {(service.features || []).map((f, i) => (
                      <li key={i} className="flex gap-3 items-start">
                        <span className="mt-1 text-orange-400"><Zap size={16} /></span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm text-white/90 font-semibold mb-2">Tools & tech</h4>
                  <div className="flex flex-wrap gap-2">
                    {(service.tools || []).map((t, i) => (
                      <span key={i} className="text-xs text-blue-500 bg-white/6 px-3 py-1 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {service.caseStudies && (
                  <div>
                    <h4 className="text-sm text-white/90 font-semibold mb-2">Description</h4>
                    <p className="text-slate-200 text-sm">{service.caseStudies}</p>
                  </div>
                )}
              </div>

              <div className="w-full sm:w-64 shrink-0">
                <div className="w-full h-44 rounded-lg bg-gradient-to-br from-orange-500/30 to-blue-600/20 flex items-center justify-center">
                  <BookOpen size={48} className="text-white/90" />
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
                className="px-4 py-2 rounded-md bg-orange-500 text-white hover:brightness-95 transition"
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

/* --------- Main Component --------- */
export default function ServiceProvided() {
  const [modalOpen, setModalOpen] = useState(false);
  const [current, setCurrent] = useState(services[0]);
  const prefersReducedMotion = useReducedMotion();

  const openModal = useCallback((svc) => {
    setCurrent(svc);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden font-body">
      {/* ambient glows */}
      <div className="absolute top-10 -left-20 w-[280px] h-[280px] bg-orange-500/8 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-[320px] h-[320px] bg-blue-500/8 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <header className="text-center mb-12">
          <p className="text-blue-500 font-alt font-semibold tracking-wide">WHAT WE PROVIDE</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-orange-500 mt-2">
            Our Professional Services
          </h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 88 }}
            transition={{ duration: 0.9 }}
            className="mx-auto mt-4 h-[4px] bg-gradient-to-r from-orange-500 to-blue-600 rounded-full"
          />
        </header>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView={prefersReducedMotion ? {} : "show"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((svc) => (
            <VisionCard key={svc.id} service={svc} onOpen={openModal} />
          ))}
        </motion.div>
      </div>

      {/* modal */}
      <DetailsModal open={modalOpen} onClose={closeModal} service={current} />
    </section>
  );
}
