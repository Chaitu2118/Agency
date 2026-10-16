import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParticleSphere from "./effects/ParticleSphere";
import { FlipFadeText } from "@/components/ui/flip-fade-text";
import AuraCursor from "./effects/AuraCursor";

gsap.registerPlugin(ScrollTrigger);

/**
 * TAVQO — Reference-Accurate Cinematic Creative Technology Hero
 * 
 * Strict specifications from prompt:
 * 1. Palette: #050508 (canvas), #11112C (deep indigo), #5147FF (atmospheric violet),
 *    #8E83FF (electric lavender), #F5F4FF (primary text), #B4B2C6 (secondary), #77758B (muted),
 *    rgba(211, 205, 255, 0.20) (subtle borders).
 * 2. Dramatic upper-left violet illumination + central soft atmospheric bloom.
 * 3. Oversized background typography ("TAVQO", 24-34vw, ~0.045 opacity, near-black indigo).
 * 4. Central Headline: "Building Digital \n Solutions That Matter" with "Digital" & "Solutions" emphasized.
 * 5. Reserved central 3D particle sphere area with controlled contrast.
 * 6. Lower-left mission statement (max-w-[430px]) + Outlined Pill CTA ("Start Your Project ↗").
 * 7. Lower-right three compact metrics: 50+ (Projects Delivered), 100% (Client Satisfaction), 24/7 (Support Availability).
 * 8. Height: 100svh on desktop, 7vw gutters, zero cards, architectural precision.
 */
export default function Hero({ isRevealed = true }) {
  const heroRef = useRef(null);
  const sphereWrapperRef = useRef(null);
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setShouldReduceMotion(media.matches);
    const handler = (e) => setShouldReduceMotion(e.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  // Scroll-driven particle sphere descent from Hero into Services
  useEffect(() => {
    const sphereEl = sphereWrapperRef.current;
    if (!sphereEl) return;

    if (shouldReduceMotion) return;

    const mm = gsap.matchMedia();

    // Desktop & Tablet (> 768px): Smooth center to left transition
    mm.add("(min-width: 768px)", () => {
      // 1. Single smooth glide from center (0vw) to left (-30vw)
      gsap.fromTo(
        sphereEl,
        {
          x: "0vw",
          y: "0vh",
          scale: 1.0,
          opacity: 1,
        },
        {
          x: "-30vw",
          y: "3.5vh",
          scale: 0.84,
          opacity: 1,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            endTrigger: "#services",
            end: "top top",
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        }
      );

      // 2. The sphere stays 100% visible throughout Services, fading smoothly as AverageIsExpensive enters
      gsap.fromTo(
        sphereEl,
        { opacity: 1 },
        {
          opacity: 0,
          scale: 0.5,
          ease: "power2.in",
          scrollTrigger: {
            trigger: "#average-is-expensive",
            start: "top 80%",
            end: "top 30%",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        }
      );
    });

    // Mobile (< 768px): Smooth scale down
    mm.add("(max-width: 767px)", () => {
      gsap.fromTo(
        sphereEl,
        {
          x: "0vw",
          y: "0vh",
          scale: 1.0,
          opacity: 1,
        },
        {
          x: "0vw",
          y: "0vh",
          scale: 0.65,
          opacity: 1,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            endTrigger: "#services",
            end: "top top",
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        }
      );

      gsap.fromTo(
        sphereEl,
        { opacity: 1 },
        {
          opacity: 0,
          scale: 0.4,
          ease: "power1.in",
          scrollTrigger: {
            trigger: "#average-is-expensive",
            start: "top 80%",
            end: "top 30%",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        }
      );
    });

    return () => {
      mm.revert();
    };
  }, [shouldReduceMotion]);

  // GSAP One-time Elegant Entrance Sequence (0.8s - 1.2s)
  useEffect(() => {
    if (!isRevealed) return;

    if (shouldReduceMotion) {
      gsap.set(
        [
          ".hero-headline-wrap",
          ".hero-mission-wrap",
          ".hero-metrics-wrap",
        ],
        { opacity: 1, y: 0, clearProps: "all" }
      );
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Central headline enters with subtle upward translation
      tl.fromTo(
        ".hero-headline-wrap",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9 },
        0.25
      )
        // 3. Lower-left mission statement and CTA appear
        .fromTo(
          ".hero-mission-wrap",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.45
        )
        // 4. Lower-right metrics fade in with slight stagger
        .fromTo(
          ".hero-metric-item",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
          0.55
        );
    }, heroRef);

    return () => ctx.revert();
  }, [isRevealed, shouldReduceMotion]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[100svh] w-full flex flex-col justify-between pt-24 sm:pt-28 pb-8 sm:pb-10 lg:pb-12 px-6 sm:px-10 lg:px-[6.5vw] overflow-x-clip select-text cursor-none"
      style={{
        backgroundColor: "#050508",
        color: "#F5F4FF",
        cursor: "none",
      }}
    >
      {/* ========================================================= */}
      {/* 1. REFINED ATMOSPHERIC ILLUMINATION & VOLUMETRIC SPOTLIGHT */}
      {/* ========================================================= */}
      
      {/* Concentrated upper-left volumetric spotlight beam with smooth falloff */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[10%] -left-[6%] w-[38vw] h-[70vh] max-w-[560px] select-none z-0"
        style={{
          background:
            "conic-gradient(from 125deg at 0% 0%, transparent 0deg, rgba(81, 71, 255, 0.60) 12deg, rgba(165, 155, 255, 0.85) 24deg, rgba(81, 71, 255, 0.35) 36deg, transparent 48deg)",
          filter: "blur(32px)",
          transform: "rotate(-10deg)",
          transformOrigin: "0% 0%",
          opacity: 0.65,
        }}
      />

      {/* Core bright light streak entering from top-left */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[3%] -left-[3%] w-[26vw] h-[48vh] max-w-[380px] select-none z-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(142, 131, 255, 0.70) 22%, rgba(81, 71, 255, 0.25) 48%, transparent 70%)",
          filter: "blur(18px)",
          transform: "rotate(-5deg)",
          transformOrigin: "0% 0%",
          opacity: 0.60,
        }}
      />

      {/* Subtle indigo atmosphere around sphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[44%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] h-[440px] rounded-full blur-[90px] opacity-25 select-none z-0"
        style={{
          background:
            "radial-gradient(circle, #382ad8 0%, #130f42 55%, transparent 75%)",
        }}
      />

      {/* Subtle edge falloff vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 select-none z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 92% 88% at 50% 50%, transparent 55%, rgba(5, 5, 8, 0.70) 100%)",
        }}
      />

      {/* Subtle cinematic SVG film grain texture */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.035] z-[1] select-none"
      >
        <filter id="hero-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-grain)" />
      </svg>

      {/* ========================================================= */}
      {/* 2. OVERSIZED TAVQO MONUMENTAL ARCHITECTURAL WORDMARK       */}
      {/* ========================================================= */}
      <div
        aria-hidden="true"
        className="hero-bg-typo pointer-events-none absolute top-[44%] -translate-y-1/2 inset-x-0 flex items-center justify-center select-none z-[2] px-6 sm:px-8 w-full"
      >
        <div className="relative flex items-center justify-center select-none w-full max-w-full text-center">
          <FlipFadeText
            words={["TAVQO"]}
            letterDuration={0.65}
            staggerDelay={0.08}
            className="w-full flex items-center justify-center py-0"
            textClassName="flex items-center justify-center font-extrabold uppercase select-none leading-none tracking-[-0.035em] whitespace-nowrap text-transparent"
            letterStyle={{
              fontSize: "clamp(54px, 17vw, 275px)",
              fontFamily: '"Plus Jakarta Sans", "Manrope", sans-serif',
              lineHeight: 1,
              letterSpacing: "-0.035em",
            }}
            renderChar={(char, index, total) => (
              <span className="relative inline-block select-none leading-none">
                {/* Base Layer: Solid Architectural Indigo-to-Charcoal Gradient Surface */}
                <span
                  className="block select-none font-extrabold uppercase leading-none"
                  style={{
                    fontFamily: '"Plus Jakarta Sans", "Manrope", sans-serif',
                    fontSize: "inherit",
                    lineHeight: 1,
                    letterSpacing: "inherit",
                    background:
                      "linear-gradient(125deg, #353872 0%, #26295a 18%, #1c1d42 42%, #14142e 70%, #0d0e1c 100%)",
                    backgroundSize: `${total * 100}% 100%`,
                    backgroundPosition: `${(index / Math.max(1, total - 1)) * 100}% 0`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    filter:
                      "drop-shadow(0 24px 50px rgba(0, 0, 0, 0.95)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.8))",
                  }}
                >
                  {char}
                </span>

                {/* Internal Highlight Layer: Ambient light catching upper letter surfaces */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 block select-none pointer-events-none font-extrabold uppercase leading-none"
                  style={{
                    fontFamily: '"Plus Jakarta Sans", "Manrope", sans-serif',
                    fontSize: "inherit",
                    lineHeight: 1,
                    letterSpacing: "inherit",
                    background:
                      "linear-gradient(180deg, rgba(200, 192, 255, 0.28) 0%, rgba(130, 120, 240, 0.12) 22%, transparent 50%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    mixBlendMode: "screen",
                  }}
                >
                  {char}
                </span>

                {/* Directional Illumination: Gentle catchlight from upper-left beam */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 block select-none pointer-events-none font-extrabold uppercase leading-none"
                  style={{
                    fontFamily: '"Plus Jakarta Sans", "Manrope", sans-serif',
                    fontSize: "inherit",
                    lineHeight: 1,
                    letterSpacing: "inherit",
                    background:
                      "linear-gradient(120deg, rgba(175, 165, 255, 0.35) 0%, rgba(135, 125, 245, 0.18) 18%, rgba(65, 58, 160, 0.08) 38%, transparent 60%)",
                    backgroundSize: `${total * 100}% 100%`,
                    backgroundPosition: `${(index / Math.max(1, total - 1)) * 100}% 0`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    mixBlendMode: "screen",
                  }}
                >
                  {char}
                </span>

                {/* Ultra-Fine Restrained Violet Rim Reflection */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 block select-none pointer-events-none font-extrabold uppercase leading-none"
                  style={{
                    fontFamily: '"Plus Jakarta Sans", "Manrope", sans-serif',
                    fontSize: "inherit",
                    lineHeight: 1,
                    letterSpacing: "inherit",
                    WebkitTextStroke: "0.5px rgba(195, 188, 255, 0.10)",
                    WebkitTextFillColor: "transparent",
                    mixBlendMode: "screen",
                  }}
                >
                  {char}
                </span>
              </span>
            )}
          />
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. TRAVELING VISUAL (SHADERS PARTICLES 3D SPHERE)         */}
      {/* Travels seamlessly from Hero into Services via ScrollTrigger */}
      {/* ========================================================= */}
      <div
        id="hero-traveling-sphere-wrap"
        className="fixed inset-0 z-[15] pointer-events-none flex items-center justify-center will-change-transform"
        aria-hidden="true"
      >
        {/* Particle sphere container: Compact 1:1 ~420px apparent diameter on desktop */}
        <div
          ref={sphereWrapperRef}
          className="w-[420px] h-[420px] sm:w-[460px] sm:h-[460px] lg:w-[500px] lg:h-[500px] aspect-square flex items-center justify-center pointer-events-auto will-change-transform"
        >
          <ParticleSphere
            className="w-full h-full aspect-square"
            count={9500}
            size={1.75}
            particleShape="dot"
            colorA="#7E6FFF"
            colorB="#E4E0FF"
            agitation={0.10}
            damping={0.46}
            mouseInfluence={1.5}
            mouseRadius={0.22}
            exposure={1.30}
          />
        </div>
      </div>

      {/* ========================================================= */}
      {/* 4. AURA CURSOR (LUMINOUS VIOLET LIQUID-SMOKE PLASMA TRAIL) */}
      {/* ========================================================= */}
      <AuraCursor containerRef={heroRef} />

      {/* ========================================================= */}
      {/* 4. MAIN HEADLINE — THE HERO'S VISUAL ANCHOR               */}
      {/* ========================================================= */}
      <div className="relative z-10 w-full max-w-[780px] mx-auto flex-grow flex flex-col items-center justify-center text-center my-auto pt-4 pb-2">
        <div className="hero-headline-wrap max-w-[760px] mx-auto">
          <h1 className="font-sans text-[44px] sm:text-[56px] md:text-[66px] lg:text-[74px] font-light tracking-[-0.035em] leading-[1.08] text-white select-none">
            <div className="block">
              <span
                className="font-light"
                style={{
                  textShadow: "0 2px 24px rgba(0, 0, 0, 0.9)",
                }}
              >
                Building{" "}
              </span>
              <span
                className="font-normal italic text-white"
                style={{
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  fontStyle: "italic",
                  textShadow: "0 2px 24px rgba(0, 0, 0, 0.9), 0 0 35px rgba(130, 117, 255, 0.45)",
                }}
              >
                Digital
              </span>
            </div>
            <div className="block mt-1.5 sm:mt-2.5">
              <span
                className="font-normal italic text-white"
                style={{
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  fontStyle: "italic",
                  textShadow: "0 2px 24px rgba(0, 0, 0, 0.9), 0 0 35px rgba(130, 117, 255, 0.45)",
                }}
              >
                Solutions
              </span>
              <span
                className="font-light"
                style={{
                  textShadow: "0 2px 24px rgba(0, 0, 0, 0.9)",
                }}
              >
                {" "}That Matter
              </span>
            </div>
          </h1>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 5. LOWER SPLIT: MISSION (LEFT) & METRICS (RIGHT)          */}
      {/* ========================================================= */}
      <div className="relative z-10 w-full flex flex-col md:flex-row items-start md:items-end justify-between gap-8 sm:gap-10 pt-4">

        {/* LOWER-LEFT: Mission Statement & Primary CTA */}
        <div className="hero-mission-wrap max-w-[420px] space-y-5 sm:space-y-6">
          <p className="text-[14px] sm:text-[14.5px] font-sans text-[#A2A1B8] font-normal leading-[1.55] tracking-[-0.01em]">
            We design, develop and scale digital products,<br className="hidden sm:inline" />
            intelligent systems and connected experiences<br className="hidden sm:inline" />
            that solve real-world problems and create lasting impact.
          </p>

          <div>
            <a
              href="#contact"
              className="group inline-flex items-center gap-3.5 px-6 py-3.5 sm:px-7 sm:py-3.5 rounded-full text-[13.5px] font-sans font-medium tracking-[0.04em] text-white border border-[rgba(211,205,255,0.28)] hover:border-[#8E83FF] bg-gradient-to-r from-[#11112C] to-[#1a1748] transition-all duration-300 shadow-[0_0_20px_rgba(81,71,255,0.2)] hover:shadow-[0_0_30px_rgba(142,131,255,0.4)] active:scale-[0.98] focus-visible:outline-none"
            >
              <span>Start Your Project</span>
              <span className="w-6 h-6 rounded-full bg-white/15 group-hover:bg-[#8E83FF] flex items-center justify-center text-[12px] font-bold text-white transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </a>
          </div>
        </div>

        {/* LOWER-RIGHT: Three Compact Business Metrics (Side-by-side layout) */}
        <div className="hero-metrics-wrap flex items-center gap-3 sm:gap-4 lg:gap-6 self-stretch md:self-end justify-between md:justify-end">
          {/* Metric 1 */}
          <div className="hero-metric-item flex items-center gap-3">
            <span className="font-sans text-[28px] sm:text-[32px] lg:text-[36px] font-semibold text-white leading-none tracking-tight">
              50+
            </span>
            <span className="text-[11px] sm:text-[11.5px] lg:text-[12px] font-sans text-[#8E8E9F] leading-[1.25] text-left block">
              Projects<br />Delivered
            </span>
          </div>

          {/* Divider 1 */}
          <div className="h-8 sm:h-9 w-[1px] bg-white/20 shrink-0 mx-1 sm:mx-2 lg:mx-3" />

          {/* Metric 2 */}
          <div className="hero-metric-item flex items-center gap-3">
            <span className="font-sans text-[28px] sm:text-[32px] lg:text-[36px] font-semibold text-white leading-none tracking-tight">
              100%
            </span>
            <span className="text-[11px] sm:text-[11.5px] lg:text-[12px] font-sans text-[#8E8E9F] leading-[1.25] text-left block">
              Client<br />Satisfaction
            </span>
          </div>

          {/* Divider 2 */}
          <div className="h-8 sm:h-9 w-[1px] bg-white/20 shrink-0 mx-1 sm:mx-2 lg:mx-3" />

          {/* Metric 3 */}
          <div className="hero-metric-item flex items-center gap-3">
            <span className="font-sans text-[28px] sm:text-[32px] lg:text-[36px] font-semibold text-white leading-none tracking-tight">
              24/7
            </span>
            <span className="text-[11px] sm:text-[11.5px] lg:text-[12px] font-sans text-[#8E8E9F] leading-[1.25] text-left block">
              Support<br />Available
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
