import React, { useState, useEffect, useRef } from "react";
import { Shader, Particles } from "shaders/react";

/**
 * TAVQO Official Shaders Particles Centerpiece
 * 
 * Powered by https://shaders.com/docs/components/particles
 * Integrates official <Shader> and <Particles /> components
 *
 * Configured according to requirements:
 * - shape: "sphere3D"
 * - count: 6000 (desktop) / 3200 (mobile / reduced motion)
 * - size: 1.5
 * - particleShape: "glow"
 * - colorA: "#8275FF" (violet particles at rest)
 * - colorB: "#DCD6FF" (pale lavender agitated highlights)
 * - agitation: 0.10
 * - damping: 0.45
 * - mouseInfluence: 1.5
 * - mouseRadius: 0.2
 * - exposure: 1.1
 */
export default function ParticleSphere({
  className = "w-full h-full",
  count = 9000,
  size = 1.6,
  particleShape = "dot",
  colorA = "#4030EB",
  colorB = "#D8D0FF",
  agitation = 0.12,
  damping = 0.44,
  mouseInfluence = 1.5,
  mouseRadius = 0.22,
  exposure = 1.22,
}) {
  const [hasGpuError, setHasGpuError] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Detect reduced motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(motionQuery.matches);
    const motionHandler = (e) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener("change", motionHandler);

    // Detect mobile viewport
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      motionQuery.removeEventListener("change", motionHandler);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Adaptive particle count for optimal 60fps performance
  const effectiveCount = prefersReducedMotion
    ? Math.floor(count * 0.35)
    : isMobile
      ? Math.min(count, 4500)
      : count;

  const effectiveAgitation = prefersReducedMotion ? 0.02 : agitation;
  const effectiveMouseInfluence = prefersReducedMotion ? 0 : mouseInfluence;

  if (hasGpuError) {
    // Graceful fallback: subtle glowing atmospheric sphere
    return (
      <div
        className={`relative flex items-center justify-center ${className}`}
        aria-hidden="true"
      >
        <div
          className="w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] rounded-full blur-[50px] opacity-60"
          style={{
            background: "radial-gradient(circle, #8275FF 0%, #11112C 60%, transparent 80%)",
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={`relative aspect-square flex items-center justify-center overflow-visible ${className}`}
      aria-hidden="true"
    >
      <Shader
        className="w-full h-full aspect-square flex items-center justify-center"
        style={{
          width: "100%",
          height: "100%",
          aspectRatio: "1 / 1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
        }}
        onUnavailable={(reason) => {
          console.warn("[TAVQO Hero] Shaders GPU unavailable:", reason);
          setHasGpuError(true);
        }}
      >
        <Particles
          shape={{ type: "sphere3D", radius: 0.42 }}
          count={effectiveCount}
          size={size}
          particleShape={particleShape}
          softness={0.22}
          colorA={colorA}
          colorB={colorB}
          agitation={effectiveAgitation}
          damping={damping}
          spread={0.96}
          mouseInfluence={effectiveMouseInfluence}
          mouseRadius={mouseRadius}
          exposure={exposure}
          scale={1.0}
        />
      </Shader>
    </div>
  );
}
