// src/_HeaderParticles.jsx
import React, { useRef, useEffect, useState } from "react";
import { Points, PointMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export function ParticleLayer({
  count = 180,
  spread = 10,
  speed = 0.18,
  color = "#ffffff",
  size = 0.05,
  seed = 1,
}) {
  const pointsRef = useRef();
  const positionsRef = useRef(null);
  const baseY = useRef(null);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const small = window.innerWidth < 720;
    if (small) {
      setReady(false);
      return;
    }

    const pos = new Float32Array(count * 3);
    const base = new Float32Array(count);

    const seeded = (i) => {
      const x = Math.sin(i * 12.9898 * seed) * 43758.5453;
      return x - Math.floor(x);
    };

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (seeded(i) - 0.5) * spread * 1.4;
      pos[i * 3 + 1] = (seeded(i + 1) - 0.5) * spread * 0.45;
      pos[i * 3 + 2] = (seeded(i + 2) - 0.5) * spread * 0.9;
      base[i] = pos[i * 3 + 1];
    }

    positionsRef.current = pos;
    baseY.current = base;

    setReady(true);
  }, [count, spread, seed]);

  useFrame((state, delta) => {
    if (!ready) return;
    if (!pointsRef.current) return;

    const posAttr = pointsRef.current.geometry?.attributes?.position;
    if (!posAttr) return;

    const arr = posAttr.array;
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      arr[ix] += Math.cos((state.clock.elapsedTime + i) * 0.09 * speed) * 0.0026 * (1 + speed);
      arr[ix + 1] = baseY.current[i] + Math.sin(state.clock.elapsedTime * 0.6 * speed + i) * 0.10 * speed;
      arr[ix + 2] += Math.sin((state.clock.elapsedTime + i) * 0.07 * speed) * 0.0033;

      if (arr[ix] > spread * 0.9) arr[ix] = -spread * 0.9;
      if (arr[ix] < -spread * 0.9) arr[ix] = spread * 0.9;
    }

    posAttr.needsUpdate = true;
    pointsRef.current.rotation.y += delta * 0.01 * speed;
  });

  // FINAL FIX:
  // Do NOT render ANYTHING until ready and positions exist
  if (!ready || !positionsRef.current) return null;

  return (
    <Points ref={pointsRef} positions={positionsRef.current} stride={3} frustumCulled>
      <PointMaterial size={size} sizeAttenuation color={color} />
    </Points>
  );
}
