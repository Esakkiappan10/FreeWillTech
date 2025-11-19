const StarBorder = ({
  as: Component = "div",
  className = "",
  color = "rgba(255,255,255,0.8)",
  speed = "6s",
  thickness = 2,
  children,
  ...rest
}) => {
  return (
    <Component
      className={`relative inline-block overflow-hidden rounded-[24px] ${className}`}
      style={{ padding: `${thickness}px`, ...rest.style }}
      {...rest}
    >
      {/* STAR TRAILS */}
      <div
        className="absolute w-[300%] h-[50%] opacity-70 bottom-[-12px] right-[-240%] rounded-full animate-star-movement-bottom z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 12%)`,
          animationDuration: speed,
        }}
      ></div>

      <div
        className="absolute w-[300%] h-[50%] opacity-70 top-[-12px] left-[-240%] rounded-full animate-star-movement-top z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 12%)`,
          animationDuration: speed,
        }}
      ></div>

      {/* PURE TRANSPARENT GLASS BACKGROUND */}
      <div className="
        relative z-10 
        bg-white/15 
        backdrop-blur-xl 
        border border-white/40 
        rounded-[24px] 
        shadow-[0_8px_28px_rgba(0,0,0,0.05)]
      ">
        {children}
      </div>
    </Component>
  );
};

export default StarBorder;
