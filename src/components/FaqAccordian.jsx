import { Plus, Minus } from "lucide-react";
import { Collapse } from "react-collapse";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const FaqAccodion = ({ title, desc, open, toggle }) => {
  const bodyRef = useRef(null);

  /* Auto-scroll on open (mobile friendliness) */
  useEffect(() => {
    if (open && bodyRef.current) {
      setTimeout(() => {
        bodyRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 120);
    }
  }, [open]);

  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 190, damping: 22 }}
      className={`my-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 ${
        open ? "ring-2 ring-primary/20 shadow-lg" : ""
      }`}
    >
      {/* Header */}
      <button
        onClick={toggle}
        className={`flex items-center justify-between w-full px-5 py-4 rounded-2xl transition-all duration-300 touch-manipulation ${
          open ? "bg-primary/5" : "hover:bg-gray-50"
        }`}
      >
        <span
          className={`text-base sm:text-lg font-[Nunito] font-semibold text-left leading-snug ${
            open ? "text-primary-dark" : "text-gray-800"
          }`}
        >
          {title}
        </span>

        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className={`${
            open ? "text-primary-dark" : "text-gray-500"
          } flex items-center`}
        >
          {open ? <Minus size={20} /> : <Plus size={20} />}
        </motion.div>
      </button>

      {/* Body */}
      <Collapse isOpened={open}>
        <motion.div
          ref={bodyRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="px-5 pb-4 pt-1 text-gray-600 text-[15px] leading-relaxed border-t border-gray-100 bg-white rounded-b-2xl"
        >
          <p className="font-[Nunito] text-[#5f6368]">{desc}</p>
        </motion.div>
      </Collapse>
    </motion.div>
  );
};

export default FaqAccodion;
