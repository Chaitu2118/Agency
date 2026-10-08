import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import TheTavqoLogo from "./TheTavqoLogo";

/**
 * THE TAVQO — Luxury Botanical Emblem & Logo Reveal
 *
 * TIMELINE SPECIFICATION:
 * 0.00s - 0.40s: Clean warm ivory background (#FDF7EE). Empty, serene screen.
 * 0.35s - 1.20s: Progressive organic reveal of the Tavqo emblem (scale 0.76 -> 1, opacity 0 -> 1)
 *                Handcrafted staggered emergence: stems -> bronze leaves -> delicate highlights.
 * 1.00s - 1.80s: Central emblem settles with premium easing (power3.out, subtle organic deceleration).
 * 1.50s - 2.30s: "The Tavqo" vector serif wordmark reveals upward (opacity 0 -> 1, y: 12px -> 0).
 * 2.20s - 2.70s: Restrained finishing botanical hairline accent rule delicately extends.
 * 2.70s - 3.40s: Continuous FLIP transition: centered logo glides & scales into navbar logo position
 *                while navbar slides in and homepage hero reveals progressively.
 *
 * Mobile adaptation:
 * Scaled logo, reduced distances, animation completes in < 3.0s.
 *
 * Accessibility:
 * Respects prefers-reduced-motion (skips intro immediately).
 */
export default function CinematicIntro({ onStartReveal, onComplete, forcePlay = true }) {
  const overlayRef = useRef(null);
  const logoWrapperRef = useRef(null);
  const logoSvgRef = useRef(null);
  const accentLineRef = useRef(null);

  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window !== "undefined") {
      return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return true;
  });

  useEffect(() => {
    // 1. Accessibility: Check reduced motion preference
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const overlay = overlayRef.current;
    const logoWrapper = logoWrapperRef.current;
    const logoSvg = logoSvgRef.current;

    if (!overlay || !logoWrapper || !logoSvg) return;

    // Safety fallback timeout: user can NEVER be trapped
    const safetyTimeout = setTimeout(() => {
      if (overlay) overlay.style.display = "none";
      setIsVisible(false);
      if (onStartReveal) onStartReveal();
      if (onComplete) onComplete();
    }, 4500);

    // If reduced motion is requested: skip cinematic animation immediately
    if (prefersReducedMotion) {
      clearTimeout(safetyTimeout);
      overlay.style.display = "none";
      if (onStartReveal) onStartReveal();
      if (onComplete) onComplete();
      return;
    }

    const isMobile = window.innerWidth < 640;

    // SVG element groups from TheTavqoLogo
    const emblemGroup = logoSvg.querySelector("#tavqo-emblem-group");
    const stemsGroup = logoSvg.querySelector("#tavqo-stems-group");
    const leavesGroup = logoSvg.querySelector("#tavqo-leaves-group");
    const highlightsGroup = logoSvg.querySelector("#tavqo-highlights-group");
    const wordmarkGroup = logoSvg.querySelector("#tavqo-wordmark-group");
    const accentLine = logoSvg.querySelector("#tavqo-accent-line");

    // -------------------------------------------------------------
    // Initial states: quiet, clean, serene
    // -------------------------------------------------------------
    gsap.set(logoWrapper, {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
    });

    // Central emblem starts slightly smaller, ready for organic emergence
    gsap.set(emblemGroup, {
      opacity: 0,
      scale: isMobile ? 0.82 : 0.76,
      transformOrigin: "75% 50%",
    });

    gsap.set(stemsGroup, {
      opacity: 0,
    });

    gsap.set(leavesGroup, {
      opacity: 0,
    });

    gsap.set(highlightsGroup, {
      opacity: 0,
    });

    gsap.set(wordmarkGroup, {
      opacity: 0,
      y: isMobile ? 8 : 12,
      transformOrigin: "center center",
    });

    if (accentLine) {
      gsap.set(accentLine, {
        opacity: 0,
        scaleX: 0,
        transformOrigin: "center center",
      });
    }

    // -------------------------------------------------------------
    // MASTER CINEMATIC GSAP TIMELINE
    // -------------------------------------------------------------
    const tl = gsap.timeline({
      onComplete: () => {
        clearTimeout(safetyTimeout);
        setIsVisible(false);
        if (onComplete) onComplete();
      },
    });

    if (isMobile) {
      // ===========================================================
      // MOBILE SEQUENCE (Kept under 3.0s total)
      // ===========================================================
      // 0.00s - 0.30s: Serene warm ivory screen (#FDF7EE)

      // 0.30s - 0.95s: Organic emblem reveal
      tl.to(
        emblemGroup,
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        0.3
      );

      tl.to(
        stemsGroup,
        {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        0.3
      );

      tl.to(
        leavesGroup,
        {
          opacity: 1,
          duration: 0.45,
          ease: "power2.out",
        },
        0.48
      );

      tl.to(
        highlightsGroup,
        {
          opacity: 1,
          duration: 0.35,
          ease: "power2.out",
        },
        0.65
      );

      // 1.15s - 1.70s: Wordmark reveals upward
      tl.to(
        wordmarkGroup,
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power3.out",
        },
        1.15
      );

      // 1.65s - 2.05s: Subtle restrained accent line
      if (accentLine) {
        tl.to(
          accentLine,
          {
            opacity: 0.65,
            scaleX: 1,
            duration: 0.4,
            ease: "power2.out",
          },
          1.65
        );
      }

      // 2.25s - 2.85s: Continuous FLIP transition into navbar
      tl.call(
        () => {
          if (onStartReveal) onStartReveal();
        },
        null,
        2.25
      );

      tl.add(() => {
        const navLogoEl = document.getElementById("tavqo-nav-logo");
        if (navLogoEl && logoWrapper) {
          const navRect = navLogoEl.getBoundingClientRect();
          const introRect = logoWrapper.getBoundingClientRect();

          const scaleFactor = Math.max(0.2, navRect.width / introRect.width);
          const deltaX =
            navRect.left + navRect.width / 2 - (introRect.left + introRect.width / 2);
          const deltaY =
            navRect.top + navRect.height / 2 - (introRect.top + introRect.height / 2);

          gsap.to(logoWrapper, {
            x: deltaX,
            y: deltaY,
            scale: scaleFactor,
            duration: 0.6,
            ease: "power3.inOut",
          });
        } else {
          gsap.to(logoWrapper, {
            y: -140,
            scale: 0.6,
            opacity: 0,
            duration: 0.6,
            ease: "power3.inOut",
          });
        }
      }, 2.25);

      tl.to(
        overlay,
        {
          opacity: 0,
          duration: 0.6,
          ease: "power2.inOut",
        },
        2.3
      );
    } else {
      // ===========================================================
      // DESKTOP & TABLET TIMELINE (Exact specification)
      // ===========================================================

      // -----------------------------------------------------------
      // 0.00s - 0.40s: Warm ivory background. Screen is quiet and empty.
      // -----------------------------------------------------------

      // -----------------------------------------------------------
      // 0.35s - 1.20s: Begin revealing the central Tavqo emblem.
      // scale: 0.76 -> 1.0, opacity: 0 -> 1.
      // Staggered emergence of structural stems -> foliage leaves -> accents.
      // -----------------------------------------------------------
      tl.to(
        emblemGroup,
        {
          opacity: 1,
          scale: 1,
          duration: 1.05,
          ease: "power3.out",
        },
        0.35
      );

      // Staggered botanical groups: Stems first
      tl.to(
        stemsGroup,
        {
          opacity: 1,
          duration: 0.65,
          ease: "power2.out",
        },
        0.35
      );

      // Warm bronze leaves bloom next
      tl.to(
        leavesGroup,
        {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        },
        0.58
      );

      // Delicate warm cream botanical highlights emerge
      tl.to(
        highlightsGroup,
        {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        0.82
      );

      // -----------------------------------------------------------
      // 1.00s - 1.80s: Central emblem settles with premium easing
      // Subtle micro-organic settle
      // -----------------------------------------------------------
      tl.to(
        emblemGroup,
        {
          scale: 1.005,
          duration: 0.45,
          ease: "sine.inOut",
        },
        1.1
      );

      tl.to(
        emblemGroup,
        {
          scale: 1.0,
          duration: 0.35,
          ease: "power2.out",
        },
        1.55
      );

      // -----------------------------------------------------------
      // 1.50s - 2.30s: Reveal the "The Tavqo" title/wordmark.
      // Upward movement (y: 12px -> 0) and opacity: 0 -> 1.
      // Uses the authentic vector wordmark artwork from the SVG.
      // -----------------------------------------------------------
      tl.to(
        wordmarkGroup,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
        },
        1.5
      );

      // -----------------------------------------------------------
      // 2.20s - 2.70s: Subtle restrained finishing moment.
      // Thin botanical hairline accent rule extends gently (scaleX: 0 -> 1).
      // Extremely restrained. No glow, no flare, no particles.
      // -----------------------------------------------------------
      if (accentLine) {
        tl.to(
          accentLine,
          {
            opacity: 0.7,
            scaleX: 1,
            duration: 0.45,
            ease: "power2.out",
          },
          2.2
        );
      }

      // -----------------------------------------------------------
      // 2.70s - 3.40s: Transition from logo reveal into actual website.
      // Coordinated FLIP transform: Centered logo smoothly glides & scales
      // directly to the top navbar logo position.
      // Website and hero content reveal simultaneously.
      // -----------------------------------------------------------
      tl.call(
        () => {
          if (onStartReveal) onStartReveal();
        },
        null,
        2.7
      );

      tl.add(() => {
        const navLogoEl = document.getElementById("tavqo-nav-logo");
        if (navLogoEl && logoWrapper) {
          const navRect = navLogoEl.getBoundingClientRect();
          const introRect = logoWrapper.getBoundingClientRect();

          const scaleFactor = Math.max(0.2, navRect.width / introRect.width);
          const deltaX =
            navRect.left + navRect.width / 2 - (introRect.left + introRect.width / 2);
          const deltaY =
            navRect.top + navRect.height / 2 - (introRect.top + introRect.height / 2);

          gsap.to(logoWrapper, {
            x: deltaX,
            y: deltaY,
            scale: scaleFactor,
            duration: 0.7,
            ease: "power3.inOut",
          });
        } else {
          // Fallback if navLogoEl is not rendered yet
          gsap.to(logoWrapper, {
            y: -180,
            scale: 0.65,
            opacity: 0,
            duration: 0.7,
            ease: "power3.inOut",
          });
        }
      }, 2.7);

      tl.to(
        overlay,
        {
          opacity: 0,
          duration: 0.7,
          ease: "power2.inOut",
        },
        2.72
      );
    }

    return () => {
      clearTimeout(safetyTimeout);
      tl.kill();
    };
  }, [forcePlay, onStartReveal, onComplete]);

  if (!isVisible) return null;

  return (
    <div
      ref={overlayRef}
      id="tavqo-intro-overlay"
      aria-label="The Tavqo Brand Introduction"
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[99999] bg-[#FDF7EE] flex items-center justify-center overflow-hidden select-none"
      style={{
        backgroundColor: "#FDF7EE",
        willChange: "opacity",
      }}
    >
      {/* Subtle organic handcrafted paper grain texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.028]"
        style={{
          backgroundImage: `radial-gradient(rgba(71, 38, 14, 0.45) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Centered The Tavqo Logo Container */}
      <div
        ref={logoWrapperRef}
        id="tavqo-intro-centered-logo"
        className="relative z-10 w-[88vw] max-w-[760px] sm:max-w-[780px] px-6 flex items-center justify-center"
        style={{
          willChange: "transform, opacity",
          transformOrigin: "center center",
        }}
      >
        <TheTavqoLogo
          ref={logoSvgRef}
          showAccentLine={true}
          accentLineRef={accentLineRef}
          className="w-full h-auto drop-shadow-[0_2px_12px_rgba(71,38,14,0.04)]"
        />
      </div>

      {/* Discreet luxury skip button */}
      <button
        type="button"
        onClick={() => {
          if (overlayRef.current) overlayRef.current.style.display = "none";
          setIsVisible(false);
          if (onStartReveal) onStartReveal();
          if (onComplete) onComplete();
        }}
        className="absolute bottom-6 right-6 z-20 text-[11px] font-sans font-medium tracking-[0.18em] uppercase text-[#503017]/60 hover:text-[#47260E] px-4 py-1.5 rounded-full border border-[#9F6D44]/25 hover:border-[#9F6D44]/50 bg-[#FDF7EE]/80 backdrop-blur-md transition-all opacity-60 hover:opacity-100 focus:opacity-100 focus:outline-none"
      >
        Skip ⇥
      </button>
    </div>
  );
}
