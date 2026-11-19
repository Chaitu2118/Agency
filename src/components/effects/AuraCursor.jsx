import { useEffect, useRef } from "react";
import { initFluid } from "./fluidCursor";

/**
 * TAVQO Aura Cursor — Full-Bodied Deep-Indigo Fluid Simulation
 *
 * Restores the complete original aesthetic, fluid momentum, vorticity, and palette,
 * using the optimized native WebGL engine which eliminates initial (0,0) jump streaks
 * and hardcoded magenta highlighting bursts on page load.
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
        dyeResolution: 1024, // Original crisp, high-definition resolution
        densityDissipation: 3.8, // Original balanced dissipation for expressive smoke curls
        velocityDissipation: 2.2, // Original fluid velocity carrying natural momentum
        pressure: 0.1,
        pressureIteration: 22,
        curl: 28, // Original expressive vorticity confinement
        splatRadius: 0.16, // Original prominent fluid silhouette size
        splatForce: 3800, // Original dynamic fluid momentum
        shading: true,
        colorUpdateSpeed: 12,
        paused: false,
        transparent: true,
        backColor: { r: 0, g: 0, b: 0 },
        palette: TAVQO_FLUID_PALETTE,
        colorIntensity: 0.20, // Original rich atmospheric intensity
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
