import { Plus, Minus } from "lucide-react";
import { Collapse } from "react-collapse";

const FaqAccodion = ({ title, desc, open, toggle }) => {
  return (
    <div
      className={`my-4 bg-white border border-gray-100 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ${
        open ? "ring-2 ring-primary/30" : ""
      }`}
    >
      {/* Accordion Header */}
      <button
        onClick={toggle}
        className={`flex items-center justify-between w-full px-5 py-4 rounded-xl transition-all duration-300 focus:outline-none ${
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
        <div
          className={`transition-transform duration-300 ${
            open ? "rotate-180 text-primary-dark" : "rotate-0 text-gray-500"
          }`}
        >
          {open ? <Minus size={20} /> : <Plus size={20} />}
        </div>
      </button>

      {/* Accordion Body */}
      <Collapse isOpened={open}>
        <div className="px-5 pb-4 pt-1 text-gray-600 text-sm sm:text-[15px] leading-relaxed border-t border-gray-100 bg-white rounded-b-xl">
          <p className="font-[Nunito] text-[#5f6368]">
            {desc}
          </p>
        </div>
      </Collapse>
    </div>
  );
};

export default FaqAccodion;
