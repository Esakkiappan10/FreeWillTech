// src/TransitionLayer.jsx
import React, { useEffect, useRef, useState } from "react";
import anime from "animejs/lib/anime.es.js";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";


/* Lightweight particle layer (no heavy geometry) */
function ParticleField({ count = 140, spread = 10, speed = 0.18, color = "#ffffff", size = 0.05, seed = 1 }) {
  const ref = useRef();
  const positions = useRef(new Float32Array(count * 3));
  const baseY = useRef(new Float32Array(count));

  useEffect(() => {
    const rng = (i) => {
      const x = Math.sin(i * 12.9898 * seed) * 43758.5453;
      return x - Math.floor(x);
    };

    for (let i = 0; i < count; i++) {
      positions.current[i * 3] = (rng(i) - 0.5) * spread;
      positions.current[i * 3 + 1] = (rng(i + 1) - 0.5) * spread * 0.4;
      positions.current[i * 3 + 2] = (rng(i + 2) - 0.5) * spread * 0.6;
      baseY.current[i] = positions.current[i * 3 + 1];
    }

    if (ref.current?.geometry) {
      ref.current.geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions.current, 3)
      );
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  }, [count, spread, seed]);

  useFrame((state, delta) => {
    if (!ref.current?.geometry) return;

    const arr = ref.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;

      arr[ix] += Math.cos((state.clock.elapsedTime + i) * 0.1 * speed) * 0.0018 * (1 + speed);
      arr[ix + 1] = baseY.current[i] + Math.sin(state.clock.elapsedTime * 0.6 * speed + i) * 0.08 * speed;
      arr[ix + 2] += Math.sin((state.clock.elapsedTime + i) * 0.07 * speed) * 0.003;

      if (arr[ix] > spread * 0.95) arr[ix] = -spread * 0.95;
      if (arr[ix] < -spread * 0.95) arr[ix] = spread * 0.95;
    }

    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.rotation.y += delta * 0.015 * speed;
  });

  return (
    <Points ref={ref} stride={3} frustumCulled>
      <PointMaterial size={size} sizeAttenuation={true} color={color} />
    </Points>
  );
}


/* Canvas scene with layered particle fields for depth (cool color combo: white, orange, blue) */
function TransitionScene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight intensity={0.35} position={[5, 5, 5]} />
      <ParticleField count={160} spread={12} speed={0.14} color="#9fd3ff" size={0.04} seed={2} />
      <ParticleField count={120} spread={9} speed={0.26} color="#ff8a45" size={0.06} seed={3} />
      <ParticleField count={90} spread={7} speed={0.4} color="#ffffff" size={0.08} seed={5} />
    </>
  );
}

/* TransitionLayer: sweep animation (not a circle) */
export default function TransitionLayer({ active = false, duration = 900 }) {
  const sweepRef = useRef(null);
  const containerRef = useRef(null);
  const [prefersReduced, setPrefersReduced] = useState(false);
  const [enabled3D, setEnabled3D] = useState(true);

  // detect reduced motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);
    const handler = () => setPrefersReduced(mq.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  useEffect(() => {
    setEnabled3D(!prefersReduced && window.innerWidth > 900);
  }, [prefersReduced]);

  useEffect(() => {
    const sweep = sweepRef.current;
    if (!sweep) return;

    // Reset
    sweep.style.display = "none";
    sweep.style.transform = "translateX(-105%)";
    sweep.style.opacity = "0";

    if (!active || prefersReduced) {
      if (containerRef.current) containerRef.current.style.pointerEvents = "none";
      return;
    }

    // show and run sweep animation using animejs
    sweep.style.display = "block";
    if (containerRef.current) containerRef.current.style.pointerEvents = "auto";

    const tl = anime.timeline({
      autoplay: true,
      easing: "easeInOutSine",
    });

    // Sweep in (a bright gradient strip travels left->right)
    tl.add({
      targets: sweep,
      translateX: ["-105%", "105%"],
      opacity: [0, 1],
      duration: Math.round(duration * 0.65),
      easing: "easeOutQuad",
    });

    // fade out gently
    tl.add({
      targets: sweep,
      opacity: [1, 0],
      duration: Math.round(duration * 0.35),
      easing: "easeInQuad",
      complete: () => {
        sweep.style.display = "none";
        if (containerRef.current) containerRef.current.style.pointerEvents = "none";
      },
    });

    return () => {
      tl.pause();
      sweep.style.display = "none";
      if (containerRef.current) containerRef.current.style.pointerEvents = "none";
    };
  }, [active, duration, prefersReduced]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "none",
        display: active ? "block" : "none",
      }}
    >
      {/* optional particle canvas (behind sweep) */}
      {enabled3D && (
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <Canvas style={{ width: "100%", height: "100%" }} camera={{ position: [0, 0, 6], fov: 55 }}>
            <TransitionScene />
          </Canvas>
        </div>
      )}

      {/* Vignette + subtle textures */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          mixBlendMode: "screen",
          zIndex: enabled3D ? 9998 : 9997,
        }}
      >
        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, rgba(255,255,255,0.02), rgba(0,0,0,0.45))",
          pointerEvents: "none",
        }} />
      </div>

      {/* Horizontal sweep bar (no circle). this moves L->R across the screen */}
      <div
        ref={sweepRef}
        style={{
          position: "absolute",
          left: 0,
          top: "40%",
          width: "140%",
          height: "26vh",
          transform: "translateX(-105%)",
          display: "none",
          zIndex: 10000,
          pointerEvents: "none",
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(159,211,255,0.12) 20%, rgba(255,138,69,0.16) 50%, rgba(255,255,255,0.02) 80%)",
          filter: "blur(18px) saturate(1.05)",
          borderRadius: "12px",
          boxShadow: "0 20px 80px rgba(0,0,0,0.45)",
          willChange: "transform, opacity"
        }}
      />
    </div>
  );
}
