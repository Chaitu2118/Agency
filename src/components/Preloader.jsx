import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/**
 * TAVQO — Haute Couture Liquid Typography Preloader
 *
 * Typography:
 * - Bespoke luxury serif: "Vegawanty"
 * - Deep near-black background (#060609)
 * - Pure, minimal, art-directed composition with generous negative space (zero AI tropes, zero clunky template labels)
 *
 * Liquid Animation:
 * - Organic multi-harmonic liquid wave flowing horizontally while rising vertically
 * - Clipped strictly inside the Vegawanty letterforms (including counters in A and Q)
 * - Dual-layer fluid depth: translucent electric-violet under-wave + luminous diamond-white/lavender body
 *
 * Timing:
 * - Exactly 5.0 seconds deliberate fill sequence
 * - Decoupled readiness tracking (smooth transition once app is ready and 5s has elapsed)
 * - 450ms illumination hold at 100%
 * - Cinematic upward curtain reveal seamlessly into the live Hero section and glowing particle sphere
 */
const WORDMARK_LETTERS = [
  { char: "T", x: 215 },
  { char: "A", x: 360 },
  { char: "V", x: 500 },
  { char: "Q", x: 640 },
  { char: "O", x: 785 },
];

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const wordmarkGroupRef = useRef(null);
  const waveBodyRef = useRef(null);
  const waveBackRef = useRef(null);
  const crestLineRef = useRef(null);
  const baseLetterRefs = useRef([]);
  const maskLetterRefs = useRef([]);

  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Accessibility Check: prefers-reduced-motion
    const prefersReducedMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    if (prefersReducedMotion) {
      const timer = setTimeout(() => {
        document.body.style.overflow = originalOverflow;
        setIsMounted(false);
        if (onComplete) onComplete();
      }, 450);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = originalOverflow;
      };
    }

    // 2. Application & Font Readiness Tracking
    let isAppReady = false;
    let isCancelled = false;
    let checkInterval = null;
    let rafId = null;

    const markAppReady = () => {
      if (isCancelled || isAppReady) return;
      isAppReady = true;
    };

    const detectReadiness = async () => {
      try {
        if (document.readyState !== "complete") {
          await new Promise((resolve) =>
            window.addEventListener("load", resolve, { once: true })
          );
        }

        if (document.fonts) {
          try {
            await document.fonts.load("155px Vegawanty");
            await document.fonts.ready;
          } catch {
            // continue
          }
        }
      } catch {
        // continue
      }

      // Allow two animation frames for Three.js shaders and DOM layout stabilization
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          markAppReady();
        });
      });
    };

    detectReadiness();

    // Safety timeout: never trap visitor indefinitely
    const safetyTimer = setTimeout(() => {
      markAppReady();
    }, 7000);

    // 3. Staggered Typography Entrance Animation (T A V Q O letters gracefully emerge)
    const allBase = baseLetterRefs.current.filter(Boolean);
    const allMask = maskLetterRefs.current.filter(Boolean);
    const combinedLetters = [...allBase, ...allMask];

    if (combinedLetters.length > 0) {
      gsap.fromTo(
        combinedLetters,
        {
          y: 45,
          opacity: 0,
          scale: 0.92,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.95,
          stagger: (i) => (i % 5) * 0.10, // Stagger T, A, V, Q, O synchronously in base & mask
          ease: "power3.out",
        }
      );
    }

    // 4. Fluid Wave Engine
    // Coordinate space: viewBox="0 0 1000 260"
    // Vegawanty letter bounds: Baseline at y = 175. Cap height reaches y ≈ 60.
    // Water level baseY ranges from 205 (0% fill, below letters) to 48 (100% fill, above letters).
    const startY = 205;
    const endY = 48;
    const progressObj = { value: 0 };
    const startTime = performance.now();

    const renderWave = () => {
      if (isCancelled) return;

      const now = performance.now();
      const t = (now - startTime) / 1000;
      const p = Math.min(1.0, Math.max(0, progressObj.value / 100));

      // Vertical water level
      const baseY = startY - p * (startY - endY);

      // Dampen wave amplitude smoothly as p approaches 100%
      const dampening = p < 0.88 ? 1.0 : Math.max(0, Math.pow((1.0 - p) / 0.12, 1.4));

      // Multi-harmonic wave parameters with broad, rounded curvature
      // Harmonic 1: Primary broad rounded swell
      const a1 = 12.0 * dampening;
      const k1 = 0.016;
      const v1 = t * 2.4;

      // Harmonic 2: Counter-flowing smooth modulation
      const a2 = 5.0 * dampening;
      const k2 = 0.028;
      const v2 = -t * 1.6;

      // Harmonic 3: Gentle macro-swell
      const a3 = 3.0 * dampening;
      const k3 = 0.010;
      const v3 = t * 1.0;

      // Secondary under-wave parameters (translucent volume)
      const b1 = 8.5 * dampening;
      const bk1 = 0.020;
      const bv1 = -t * 1.8;
      const b2 = 3.5 * dampening;
      const bk2 = 0.012;
      const bv2 = t * 1.3;

      const step = 14;
      let d1 = `M -60 280 L -60 ${baseY.toFixed(1)}`;
      let crestD = `M -60 ${baseY.toFixed(1)}`;
      let d2 = `M -60 280 L -60 ${(baseY + 3).toFixed(1)}`;

      for (let x = -60; x <= 1060; x += step) {
        // Main wave surface
        const y1 =
          baseY +
          a1 * Math.sin(x * k1 + v1) +
          a2 * Math.cos(x * k2 + v2) +
          a3 * Math.sin(x * k3 + v3);

        d1 += ` L ${x.toFixed(1)} ${y1.toFixed(1)}`;
        crestD += ` L ${x.toFixed(1)} ${y1.toFixed(1)}`;

        // Secondary under-wave surface
        const y2 =
          baseY +
          3.0 +
          b1 * Math.sin(x * bk1 + bv1) +
          b2 * Math.cos(x * bk2 + bv2);

        d2 += ` L ${x.toFixed(1)} ${y2.toFixed(1)}`;
      }

      d1 += ` L 1060 280 Z`;
      d2 += ` L 1060 280 Z`;

      // Direct DOM updates for butter-smooth 60–120 FPS
      if (waveBodyRef.current) waveBodyRef.current.setAttribute("d", d1);
      if (waveBackRef.current) waveBackRef.current.setAttribute("d", d2);
      if (crestLineRef.current) {
        crestLineRef.current.setAttribute("d", crestD);
        crestLineRef.current.setAttribute(
          "stroke-opacity",
          (dampening * 0.85).toFixed(2)
        );
      }

      rafId = requestAnimationFrame(renderWave);
    };

    rafId = requestAnimationFrame(renderWave);

    // 4. Exact 5-Second Pacing & Motion Choreography
    let hasTriggeredExit = false;

    // Phase 1: 4.15 seconds to rise from 0% to 88%
    // Phase 2: 0.85 seconds to decelerate from 88% to 100%
    // Total visual fill time = exactly 5.0 seconds
    const phase1Duration = 4.15;
    const finalSurgeDuration = 0.85;

    const startExitTransition = () => {
      if (hasTriggeredExit || isCancelled) return;
      hasTriggeredExit = true;

      if (checkInterval) {
        clearInterval(checkInterval);
        checkInterval = null;
      }

      // Final elegant deceleration to 100%
      gsap.to(progressObj, {
        value: 100,
        duration: finalSurgeDuration,
        ease: "power2.out",
        onComplete: () => {
          if (isCancelled) return;

          // Immediately cancel wave RAF loop to free 100% CPU/GPU resources for buttery smooth exit
          cancelAnimationFrame(rafId);

          // Hold the fully illuminated wordmark for 480ms so user can take in the completed typography
          gsap.delayedCall(0.48, () => {
            if (isCancelled || !containerRef.current) return;

            // Master Exit Timeline: 100% GPU-accelerated, silky smooth 60fps curtain sweep
            const exitTl = gsap.timeline({
              onComplete: () => {
                document.body.style.overflow = originalOverflow;
                setIsMounted(false);
                if (onComplete) onComplete();
              },
            });

            // 1. Wordmark graceful upward drift and subtle fade
            if (wordmarkGroupRef.current) {
              exitTl.to(
                wordmarkGroupRef.current,
                {
                  y: -65,
                  scale: 1.015,
                  opacity: 0.55,
                  duration: 1.9,
                  ease: "power2.inOut",
                  force3D: true,
                },
                0
              );
            }

            // 2. Pure GPU-composited curtain lift sweeping the rounded bottom cap from bottom to top
            exitTl.to(
              containerRef.current,
              {
                y: () => -(window.innerHeight + 140),
                duration: 2.0,
                ease: "power2.inOut",
                force3D: true,
              },
              0
            );
          });
        },
      });
    };

    // Phase 1: Slow, hypnotic 4.15s rise to 88%
    gsap.to(progressObj, {
      value: 88,
      duration: phase1Duration,
      ease: "power1.inOut",
      onComplete: () => {
        if (isCancelled) return;

        if (isAppReady) {
          startExitTransition();
        } else {
          // If assets are still compiling, gracefully idle and breathe near 93%
          gsap.to(progressObj, {
            value: 93,
            duration: 2.5,
            ease: "power1.out",
          });

          checkInterval = setInterval(() => {
            if (isAppReady) {
              startExitTransition();
            }
          }, 50);
        }
      },
    });

    return () => {
      isCancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      if (checkInterval) clearInterval(checkInterval);
      clearTimeout(safetyTimer);
      gsap.killTweensOf(progressObj);
      if (containerRef.current) gsap.killTweensOf(containerRef.current);
      if (wordmarkGroupRef.current) gsap.killTweensOf(wordmarkGroupRef.current);
      if (combinedLetters.length) gsap.killTweensOf(combinedLetters);
      document.body.style.overflow = originalOverflow;
    };
  }, [onComplete]);

  if (!isMounted) return null;

  return (
    <div
      ref={containerRef}
      id="tavqo-preloader"
      aria-label="Loading TAVQO"
      role="status"
      aria-live="polite"
      className="fixed inset-2.5 sm:inset-4 lg:inset-6 z-[99999] flex flex-col items-center justify-center rounded-[32px] sm:rounded-[48px] lg:rounded-[60px] select-none will-change-transform overflow-hidden px-6 sm:px-12"
      style={{
        backgroundColor: "rgba(9, 8, 16, 0.82)",
        backdropFilter: "blur(36px) saturate(170%)",
        WebkitBackdropFilter: "blur(36px) saturate(170%)",
        border: "1px solid rgba(255, 255, 255, 0.14)",
        boxShadow:
          "0 35px 120px -20px rgba(0, 0, 0, 0.95), 0 0 60px rgba(139, 92, 246, 0.18), inset 0 1px 1px 0 rgba(255, 255, 255, 0.28)",
        transform: "translateZ(0)",
      }}
    >
      {/* Glassmorphic Specular Ambient Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[85%] h-[220px] pointer-events-none select-none opacity-45 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(167, 139, 250, 0.28) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[320px] h-[160px] pointer-events-none select-none opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(99, 102, 241, 0.22) 0%, transparent 70%)",
        }}
      />

      {/* Editorial Haute-Couture Composition with Generous Negative Space */}
      <div className="relative flex items-center justify-center w-full max-w-[85vw] lg:max-w-[760px] select-none z-10">
        <svg
          ref={wordmarkGroupRef}
          viewBox="0 0 1000 260"
          className="w-full h-auto select-none overflow-visible will-change-transform"
          preserveAspectRatio="xMidYMid meet"
          aria-label="TAVQO wordmark"
        >
          <defs>
            {/* 1. Precise Vector Mask: Vegawanty serif letterforms in white reveal liquid; exterior & counters stay black */}
            <mask id="tavqo-vegawanty-mask">
              <rect x="-80" y="-40" width="1160" height="340" fill="#000000" />
              <g>
                {WORDMARK_LETTERS.map((letter, i) => (
                  <text
                    key={`mask-letter-${i}`}
                    ref={(el) => (maskLetterRefs.current[i] = el)}
                    x={letter.x}
                    y="175"
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontFamily="'Vegawanty', 'Cormorant Garamond', 'Playfair Display', serif"
                    fontWeight="normal"
                    fontSize="155"
                  >
                    {letter.char}
                  </text>
                ))}
              </g>
            </mask>

            {/* 2. Primary Liquid Gradient: Luminous White to Studio Lavender-Violet */}
            <linearGradient id="tavqo-liquid-fill" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="22%" stopColor="#FAF9FF" />
              <stop offset="58%" stopColor="#DDD6FE" />
              <stop offset="85%" stopColor="#998AFF" />
              <stop offset="100%" stopColor="#4F46E5" />
            </linearGradient>

            {/* 3. Secondary Wave Gradient: Electric Violet Translucent Volume */}
            <linearGradient id="tavqo-liquid-back" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.30" />
              <stop offset="50%" stopColor="#6366F1" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#312E81" stopOpacity="0.05" />
            </linearGradient>

            {/* 4. Delicate Meniscus Glow */}
            <filter id="crest-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* LAYER 1: Base Unfilled Wordmark (Deep Charcoal-Violet Silhouette with Staggered Entrance) */}
          <g>
            {WORDMARK_LETTERS.map((letter, i) => (
              <text
                key={`base-letter-${i}`}
                ref={(el) => (baseLetterRefs.current[i] = el)}
                x={letter.x}
                y="175"
                textAnchor="middle"
                fill="#131220"
                stroke="rgba(142, 131, 255, 0.22)"
                strokeWidth="0.8"
                fontFamily="'Vegawanty', 'Cormorant Garamond', 'Playfair Display', serif"
                fontWeight="normal"
                fontSize="155"
              >
                {letter.char}
              </text>
            ))}
          </g>

          {/* LAYER 2: Organic Rising Liquid Waves (Strictly Masked Inside Vegawanty Letterforms) */}
          <g mask="url(#tavqo-vegawanty-mask)">
            {/* Secondary Translucent Fluid Body */}
            <path ref={waveBackRef} fill="url(#tavqo-liquid-back)" />

            {/* Primary Luminous Fluid Body */}
            <path ref={waveBodyRef} fill="url(#tavqo-liquid-fill)" />

            {/* Subtle Surface Meniscus Highlight Line */}
            <path
              ref={crestLineRef}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1.8"
              strokeLinecap="round"
              filter="url(#crest-glow)"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
