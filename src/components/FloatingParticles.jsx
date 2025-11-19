// components/FloatingParticles.jsx
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function Particles() {
  const ref = useRef();
  const count = 120;

  const positions = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 2
      );
    }
    return new Float32Array(arr);
  }, []);

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.08;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#6B7CFF" sizeAttenuation transparent />
    </points>
  );
}

export default function FloatingParticles() {
  return (
    <Canvas className="absolute inset-0 z-[1]" camera={{ position: [0, 0, 6] }}>
      <Particles />
    </Canvas>
  );
}
