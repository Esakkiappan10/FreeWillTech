// src/FullPageIntro.jsx
import React, { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * FullPageIntro
 * - Fullscreen intro with GPU particle shader + gentle motion
 * - Auto-reduces particle count on smaller screens
 * - Fade-out when `onFinish` called or after autoDuration
 *
 * Props:
 * - autoDuration (ms) — auto-dismiss after this many ms (default: 4200)
 * - baseColor (vec3 or hex) — tint for particles
 * - onFinish () => void — callback when intro finished
 */
export default function FullPageIntro({
  autoDuration = 4200,
  baseColor = "#5EC3F0",
  onFinish = () => {}
}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => dismiss(), autoDuration);
    return () => clearTimeout(t);
  }, [autoDuration]);

  const dismiss = () => {
    // fade-out handled in component; call callback after short delay
    setVisible(false);
    setTimeout(onFinish, 700);
  };

  return (
    <>
      {/* Intro overlay: absolute full-screen */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99999,
          pointerEvents: visible ? "auto" : "none",
        }}
      >
        <Canvas
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            background: "radial-gradient(ellipse at center, #031026 0%, #000814 60%)",
            transition: "opacity 650ms ease, transform 650ms cubic-bezier(.2,.9,.2,1)",
            opacity: visible ? 1 : 0,
            transform: visible ? "scale(1)" : "scale(1.02)",
            willChange: "opacity, transform",
          }}
          camera={{ position: [0, 0, 6], fov: 55 }}
        >
          <IntroScene baseColor={baseColor} />
        </Canvas>

        {/* Center text + CTA */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            pointerEvents: "none",
            zIndex: 100000,
          }}
        >
          <h1
            style={{
              fontSize: "clamp(28px, 6vw, 56px)",
              color: "white",
              margin: 0,
              fontWeight: 800,
              textAlign: "center",
              pointerEvents: "auto",
              textShadow: "0 10px 40px rgba(0,0,0,0.6)",
              letterSpacing: " -0.02em",
            }}
          >
            Frontier Wox<span style={{ color: "#5EC3F0" }}>Technologies</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.75)", marginTop: 12, pointerEvents: "auto" }}>
            Building next-generation web experiences
          </p>

          {/* CTA button to skip intro */}
          <button
            onClick={() => dismiss()}
            style={{
              marginTop: 22,
              pointerEvents: "auto",
              background:
                "linear-gradient(90deg, rgba(94,195,240,1) 0%, rgba(30,156,215,1) 100%)",
              color: "#001020",
              border: "none",
              padding: "12px 20px",
              borderRadius: 12,
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 10px 40px rgba(7,30,50,0.5)",
            }}
          >
            Enter Site
          </button>
        </div>
      </div>
    </>
  );
}

/* ---------- Scene + optimized GPU particle system ---------- */

function IntroScene({ baseColor }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight intensity={0.35} position={[5, 5, 5]} />
      <GPUPoints baseColor={baseColor} />
    </>
  );
}

/**
 * GPUPoints - single BufferGeometry with custom ShaderMaterial
 * - uses gl_PointSize to control point radius
 * - uses a smooth circular alpha (gl_PointCoord) to create soft discs (cheap glow)
 * - attributes: position, aScale, aHue
 * - updates entirely on GPU except for a global time uniform
 */
function GPUPoints({ baseColor = "#5EC3F0" }) {
  const meshRef = useRef();
  const { gl } = useThree();

  // device adaptive particle count & DPR clamp
  const deviceWidth = typeof window !== "undefined" ? window.innerWidth : 1200;
  const count = useMemo(() => {
    if (deviceWidth > 2000) return 2200;
    if (deviceWidth > 1400) return 1600;
    if (deviceWidth > 1000) return 1100;
    if (deviceWidth > 720) return 700;
    return 260; // mobile
  }, [deviceWidth]);

  // clamp DPR: avoid too-high pixel ratio for performance
  useEffect(() => {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    gl.setPixelRatio(dpr);
  }, [gl]);

  // Precompute buffers once
  const { positions, scales, hues } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const hues = new Float32Array(count);

    // seeded-ish RNG for stable layout
    const rng = (i) => {
      const x = Math.sin(i * 12.9898) * 43758.5453;
      return x - Math.floor(x);
    };

    for (let i = 0; i < count; i++) {
      const fx = (rng(i) - 0.5) * 18; // spread x
      const fy = (rng(i + 1) - 0.5) * 6; // y tighter
      const fz = (rng(i + 2) - 0.5) * 10; // z spread
      positions[i * 3] = fx;
      positions[i * 3 + 1] = fy;
      positions[i * 3 + 2] = fz;

      scales[i] = 0.5 + rng(i + 3) * 1.8; // base scale
      hues[i] = rng(i + 4); // hue factor (0..1)
    }

    return { positions, scales, hues };
  }, [count]);

  // Shader material
  const material = useMemo(() => {
    const vertex = `
      precision mediump float;
      attribute vec3 position;
      attribute float aScale;
      attribute float aHue;
      uniform mat4 modelViewMatrix;
      uniform mat4 projectionMatrix;
      uniform float uTime;
      varying float vHue;
      varying float vDist;
      void main() {
        // subtle per-point motion using time + position
        vec3 pos = position;
        float t = uTime * 0.4;
        pos.x += sin(t + position.y * 0.5 + position.z * 0.6) * 0.06 * aScale;
        pos.y += cos(t * 0.7 + position.x * 0.2) * 0.04 * aScale;
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        // point size attenuates with distance to camera (feel depth)
        float sizeBase = aScale * 18.0;
        float dist = -mvPosition.z;
        float size = sizeBase * (1.6 / (0.6 + dist * 0.08));
        gl_PointSize = clamp(size, 1.0, 72.0);
        vHue = aHue;
        vDist = dist;
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const fragment = `
      precision mediump float;
      uniform vec3 uColor;
      varying float vHue;
      varying float vDist;
      void main() {
        // circular soft disc using gl_PointCoord
        vec2 uv = gl_PointCoord - 0.5;
        float len = length(uv);
        float alpha = smoothstep(0.5, 0.18, len); // soft falloff
        // add subtle rim (thin)
        float rim = smoothstep(0.25, 0.13, len) * 0.55;
        // hue mixing - tint by uColor and hue factor
        vec3 color = uColor * (0.6 + vHue * 0.7) + vec3(0.1 * vHue);
        // distance fade to avoid huge points at camera near
        float fade = clamp(1.0 - (vDist * 0.02), 0.28, 1.0);
        gl_FragColor = vec4(color * fade + rim, alpha * fade);
        // discard tiny fragments to keep alpha right
        if (gl_FragColor.a < 0.01) discard;
      }
    `;

    return new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0.0 },
        uColor: { value: new THREE.Color(baseColor) },
      },
    });
  }, [baseColor]);

  // attach attributes and update uniform time every frame
  useEffect(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
    geo.setAttribute("aHue", new THREE.BufferAttribute(hues, 1));
    // set bounding sphere for frustum culling efficiency
    geo.computeBoundingSphere();

    // create Points and put on ref
    const pts = new THREE.Points(geo, material);
    meshRef.current = pts;

    // add to scene via returned object in render (we push in render below)
    return () => {
      // cleanup: dispose geometry + material
      geo.dispose();
      material.dispose();
      meshRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once

  // render helper: add object to scene via useFrame once scene ready
  const first = useRef(true);
  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const scene = state.scene;
    if (first.current) {
      // attach to scene (only once) so we can keep using points object
      scene.add(meshRef.current);
      first.current = false;
    }
    // update time uniform (global)
    meshRef.current.material.uniforms.uTime.value = state.clock.elapsedTime;
    // gentle scene rotation for motion
    meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.04) * 0.08;
  });

  return null; // We add the Points directly to the scene; no JSX mesh returned (lowest overhead)
}
