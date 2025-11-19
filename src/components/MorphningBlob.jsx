// components/MorphingBlob.jsx
import React from "react";

export default function MorphingBlob() {
  return (
    <div className="absolute top-0 left-0 w-full h-full -z-[1] overflow-hidden">
      <div className="blob absolute w-[550px] h-[550px] bg-gradient-to-br from-primary/50 to-indigo-500/50 blur-[120px] opacity-50 animate-blob1 rounded-full" />
      <div className="blob absolute w-[450px] h-[450px] bg-gradient-to-br from-pink-400/40 to-purple-600/40 blur-[140px] opacity-50 animate-blob2 rounded-full" />
    </div>
  );
}
