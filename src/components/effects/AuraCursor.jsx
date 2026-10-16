import { useEffect, useRef } from "react";
import { initFluid } from "smokey-fluid-cursor";

/**
 * TAVQO Aura Cursor — Subtle Deep-Indigo Fluid Simulation
 *
 * Muted, dark indigo tones matching the #050508 & #11112C background canvas.
 * Restrained intensity ensures the fluid remains subtle and smoky without over-shining.
 */
const TAVQO_FLUID_PALETTE = [
  "#382AD8", // Deep indigo atmospheric tone
  "#2D248E", // Background indigo shadow
  "#26295A", // Dark architectural indigo (from wordmark surface)
  "#1C1D42", // Deep background indigo
  "#18163B", // Near-black midnight indigo
];

export default function AuraCursor({
  className = "pointer-events-none absolute inset-0 z-[4] overflow-hidden",
  containerRef,
}) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Accessibility & reduced motion
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    // 2. Disable on touch-first / coarse pointer devices
    if (
      window.matchMedia &&
      window.matchMedia("(pointer: coarse)").matches
    ) {
      return;
    }

    const container = wrapperRef.current || containerRef?.current || document.body;
    if (!container) return;

    // Guarantee no stale or duplicate canvases exist
    const staleCanvases = document.querySelectorAll("#tavqo-aura-cursor");
    staleCanvases.forEach((c) => c.remove());

    let fluidInstance = null;

    try {
      fluidInstance = initFluid({
        id: "tavqo-aura-cursor",
        container,
        position: "absolute",
        simResolution: 128,
        dyeResolution: 1024,
        densityDissipation: 3.8, // Balanced dissipation allows smoke to swirl and drift gracefully
        velocityDissipation: 2.2, // Fluid velocity carries the animation with natural momentum
        pressure: 0.1,
        pressureIteration: 22,
        curl: 28, // Expressive vorticity confinement for pronounced curls & eddies
        splatRadius: 0.16, // Increased size for a prominent, fluid silhouette
        splatForce: 3800, // Dynamic fluid momentum
        shading: true,
        colorUpdateSpeed: 12,
        paused: false,
        transparent: true,
        backColor: { r: 0, g: 0, b: 0 },
        palette: TAVQO_FLUID_PALETTE,
        colorIntensity: 0.20, // Subdued, soft background-matched intensity
        pointerEvents: false,
        zIndex: 4,
        maxDpr: 2,
        pauseOnHidden: true,
        respectReducedMotion: true,
      });
    } catch (err) {
      console.warn("[TAVQO] AuraCursor WebGL initialization failed:", err);
    }

    return () => {
      if (fluidInstance) {
        fluidInstance.dispose();
        fluidInstance = null;
      }
      const lingering = document.querySelectorAll("#tavqo-aura-cursor");
      lingering.forEach((c) => c.remove());
    };
  }, [containerRef]);

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      className={className}
      style={{
        pointerEvents: "none",
        userSelect: "none",
      }}
    />
  );
}
