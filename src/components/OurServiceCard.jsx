import React from "react";

const OurServiceCard = ({ title, icon, des }) => {
  return (
    <div className="group bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-8 flex flex-col items-center text-center font-[Nunito] hover:-translate-y-1">
      {/* Icon */}
      <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-inner">
        <img
          src={icon}
          alt={title}
          className="w-10 h-10 object-contain group-hover:brightness-110 transition-all duration-300"
        />
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-primary-dark mb-3 group-hover:text-secondary transition-colors duration-300">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 text-sm leading-relaxed">{des}</p>
    </div>
  );
};

export default OurServiceCard;
