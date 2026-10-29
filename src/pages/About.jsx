import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  ArrowRight, 
  ExternalLink,
  ChevronRight,
  Sparkles
} from "lucide-react";
import Navbar from "../components/Navbar";
import GravitationalVortex from "../components/GravitationalVortex";

gsap.registerPlugin(ScrollTrigger);

/**
 * TAVQO — Complete About Us Page
 * 
 * Strict reference-accurate implementation:
 * - Palette: #03040A (canvas), #0B0C14 / #101019 (surfaces), #F5F3FF (text),
 *   #9B9AAF (muted), #5268FF (electric blue), #635BFF / #7764F8 (violet), fine translucent borders.
 * - Section 01: Hero filling 100svh with full-screen background Gravitational Vortex,
 *   soft gradient mask / overlay for readability, unified oversized two-line "ABOUT \n US"
 *   heading in ivory-white and electric blue-violet (#635BFF) with tight 0.82 line-height,
 *   right-side studio introduction, and far-right identity rail.
 * - Section 02: Studio Snapshot with 4 structured metric panels, asymmetric concentric feature panel,
 *   and full-width audience strip.
 * - Section 03: What We Build with oversized left headline ("DIGITAL SOLUTIONS FOR A SMARTER TOMORROW")
 *   and 6 structured service panels with arrow interactions.
 * - Section 04: What Drives Us with left headline ("WHAT DRIVES US") and 4 horizontal editorial value columns.
 * - Section 05: High-impact Closing Section ("LET'S BUILD WHAT'S NEXT") with dual CTAs and subtle vortex illumination.
 */
export default function About() {
  const containerRef = useRef(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(media.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  // GSAP Cinematic ScrollTrigger Sequence
  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Hero Reveal (immediate on mount)
      gsap.fromTo(
        ".hero-anim",
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.85, 
          stagger: 0.08, 
          ease: "power3.out",
          clearProps: "transform" 
        }
      );

      // 2. Studio Snapshot Grid Reveal
      gsap.fromTo(
        ".snapshot-card",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#snapshot",
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // 3. What We Build Service Panels Reveal
      gsap.fromTo(
        ".service-card",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#what-we-build",
            start: "top 75%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // 4. Values Columns Reveal
      gsap.fromTo(
        ".value-col",
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#values",
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // 5. Closing Section Reveal
      gsap.fromTo(
        ".closing-anim",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#closing",
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // Section 03 Service Panels Data
  const services = [
    {
      num: "01",
      title: "Web & Digital Experiences",
      desc: "Modern, scalable websites and web applications built with precision architecture.",
    },
    {
      num: "02",
      title: "Mobile Applications",
      desc: "User-focused mobile experiences for iOS & Android designed for real-world use cases.",
    },
    {
      num: "03",
      title: "Product Engineering",
      desc: "End-to-end product development with clean, resilient, and scalable software foundations.",
    },
    {
      num: "04",
      title: "AI & Automation",
      desc: "Integrating AI, intelligent workflow automation, and custom LLM solutions that reduce friction.",
    },
    {
      num: "05",
      title: "IoT & Smart Systems",
      desc: "Connected devices, telemetry streaming, and smart systems engineered for real-time operations.",
    },
    {
      num: "06",
      title: "Immersive 3D Experiences",
      desc: "Interactive 3D WebGL scenes, real-time spatial graphics, and distinctive digital interfaces.",
    },
  ];

  // Section 04 Values Data
  const values = [
    {
      num: "01",
      title: "Clarity before complexity.",
      desc: "We focus on real problems and simple, effective solutions that elevate user engagement.",
    },
    {
      num: "02",
      title: "Design with purpose.",
      desc: "Every experience should be meaningful, functional, memorable, and visually unmistakable.",
    },
    {
      num: "03",
      title: "Built to scale.",
      desc: "We engineer solutions that can seamlessly evolve alongside ambitious business trajectories.",
    },
    {
      num: "04",
      title: "People first.",
      desc: "We value genuine transparency, senior-led collaboration, and enduring long-term partnerships.",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen text-[#F5F3FF] overflow-x-hidden selection:bg-[#5268FF]/30 selection:text-white"
      style={{
        backgroundColor: "#03040A",
      }}
    >
      {/* ========================================================= */}
      {/* 0. AMBIENT BACKGROUND GLOW & REFINED ARCHITECTURAL GRID   */}
      {/* ========================================================= */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        {/* Subtle architectural whisper grid */}
        <div 
          className="absolute inset-0 opacity-[0.012]"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.7) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />

        {/* Ambient top-right electric blue / violet atmospheric bloom */}
        <div 
          className="absolute top-[5%] right-[2%] w-[680px] h-[680px] sm:w-[900px] sm:h-[900px] rounded-full blur-[160px] opacity-25"
          style={{
            background: "radial-gradient(circle, #5268FF 0%, #7764F8 40%, transparent 75%)",
          }}
        />

        {/* Subtle mid-page transition illumination */}
        <div 
          className="absolute top-[45%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[140px] opacity-15"
          style={{
            background: "radial-gradient(circle, #7764F8 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ========================================================= */}
      {/* 1. MINIMAL TAVQO NAVBAR (REUSED COMPONENT)                 */}
      {/* ========================================================= */}
      <Navbar currentRoute="about" isRevealed={true} />

      {/* ========================================================= */}
      {/* SECTION 01: HERO SECTION (GENUINELY FULL-SCREEN 100SVH)   */}
      {/* ========================================================= */}
      <section
        id="about-hero"
        className="relative min-h-[100svh] w-full flex flex-col justify-center pt-24 sm:pt-28 pb-12 sm:pb-16 px-6 sm:px-10 lg:px-[6.5vw] overflow-hidden border-b border-white/[0.08]"
      >
        {/* ------------------------------------------------------- */}
        {/* FULL-SCREEN GRAVITATIONAL VORTEX BACKGROUND LAYER       */}
        {/* ------------------------------------------------------- */}
        <div 
          className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
          style={{
            // Mask softly fades toward edges while keeping the full canvas visible
            maskImage: "radial-gradient(ellipse 95% 85% at 60% 50%, black 50%, rgba(0,0,0,0.5) 75%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 95% 85% at 60% 50%, black 50%, rgba(0,0,0,0.5) 75%, transparent 100%)",
          }}
        >
          {/* Luminous gravitational well central core toward the right half */}
          <div 
            className="absolute top-[48%] right-[18%] sm:right-[22%] -translate-y-1/2 w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] rounded-full blur-[65px] opacity-45 pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(184, 164, 255, 0.9) 0%, rgba(99, 91, 255, 0.55) 40%, transparent 75%)",
            }}
          />

          <GravitationalVortex
            background="#03040A"
            baseColor="#4D66FF"
            accentColor="#B8A6FF"
            accentMix={52}
            density={62}
            dotSize={165}
            speed={20}
            direction="inward"
            hoverSpeed={32}
            scale={140}
            tiltX={40}
            tiltY={-6}
            vortex={{ twist: 68, funnel: 65 }}
            style={{
              background: "transparent",
            }}
          />

          {/* Dark gradient overlay on the left to reduce visual intensity behind text */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(to right, #03040A 0%, rgba(3,4,10,0.85) 35%, rgba(3,4,10,0.4) 65%, transparent 100%)",
            }}
          />
        </div>

        {/* ------------------------------------------------------- */}
        {/* HERO FOREGROUND CONTENT (LEFT HEADING + RIGHT INTRO)    */}
        {/* ------------------------------------------------------- */}
        <div className="relative z-10 w-full max-w-7xl mx-auto my-auto py-6 sm:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* LEFT COLUMN: Eyebrow + Exact ABOUT US Heading + Supporting Tagline */}
            <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start text-left hero-anim">
              {/* Eyebrow placed above heading */}
              <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-[#635BFF]/10 border border-[#635BFF]/25 mb-4 sm:mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5268FF] animate-pulse" />
                <span className="text-[11px] sm:text-[11.5px] font-mono tracking-[0.26em] uppercase text-[#A596FF]">
                  01 — ABOUT TAVQO
                </span>
              </div>

              {/* Architectural interconnected heading with single shared U */}
              <h1 
                className="font-sans font-black tracking-tight uppercase text-left select-none inline-grid grid-cols-[auto_auto_auto] grid-rows-[auto_auto] items-start gap-x-1 sm:gap-x-1.5"
                aria-label="About Us"
              >
                {/* Row 1, Col 1: ABO (Ivory White) */}
                <span className="col-start-1 row-start-1 text-[#F5F3FF] text-[clamp(3.8rem,7.4vw,7.8rem)] leading-[0.88] font-black tracking-tight whitespace-nowrap">
                  ABO
                </span>

                {/* Row 1 to Row 2, Col 2: The single shared oversized U (Electric Violet #635BFF) */}
                <span className="col-start-2 row-start-1 row-span-2 text-[#635BFF] text-[clamp(7.6rem,14.8vw,15.6rem)] leading-[0.76] font-black tracking-tighter px-0.5 sm:px-1 select-none">
                  U
                </span>

                {/* Row 1, Col 3: T (Ivory White, completing ABOUT on the upper line) */}
                <span className="col-start-3 row-start-1 text-[#F5F3FF] text-[clamp(3.8rem,7.4vw,7.8rem)] leading-[0.88] font-black tracking-tight whitespace-nowrap">
                  T
                </span>

                {/* Row 2, Col 3: S (Electric Violet #635BFF, completing US beside lower U) */}
                <span className="col-start-3 row-start-2 self-end text-[#635BFF] text-[clamp(3.8rem,7.4vw,7.8rem)] leading-[0.88] font-black tracking-tight whitespace-nowrap pb-1 sm:pb-2">
                  S
                </span>
              </h1>

              {/* Tagline placed immediately below heading */}
              <p className="mt-5 sm:mt-6 text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.22em] text-[#8E8EA8] flex items-center gap-2">
                <span>IDEAS</span>
                <span className="text-[#5268FF]">→</span>
                <span>SYSTEMS</span>
                <span className="text-[#635BFF]">→</span>
                <span className="text-[#A596FF]">EXPERIENCES FOR A SMARTER TOMORROW</span>
              </p>
            </div>

            {/* RIGHT COLUMN: Studio Introduction + Far-Right Identity Rail */}
            <div className="lg:col-span-6 xl:col-span-6 flex flex-col md:flex-row items-start justify-between gap-8 lg:gap-10 hero-anim self-center lg:pl-6 xl:pl-10">
              {/* Studio Positioning Statement */}
              <div className="flex flex-col items-start max-w-md">
                <span className="text-[10.5px] font-mono uppercase tracking-[0.26em] text-[#635BFF] font-semibold block mb-3">
                  A CREATIVE TECHNOLOGY STUDIO
                </span>
                
                <h2 className="text-[18px] sm:text-[21px] lg:text-[22px] font-light leading-[1.32] text-white/95 mb-4">
                  We design, engineer and build digital experiences that solve real problems and create meaningful impact.
                </h2>
                
                <p className="text-[13.5px] sm:text-[14px] leading-relaxed text-[#9B9AAF] font-light mb-6">
                  TAVQO turns ambitious ideas into scalable digital products. We combine thoughtful design, modern engineering and practical technology to create experiences people can use and businesses can grow with.
                </p>

                <a
                  href="#snapshot"
                  className="group inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-white/20 hover:border-[#635BFF] bg-white/[0.04] hover:bg-[#5268FF]/10 text-white text-[13px] font-sans font-medium tracking-wide transition-all duration-300"
                >
                  <span>Our Approach</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#B8A6FF] transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>

              {/* Far-Right Identity Rail */}
              <div className="hidden lg:flex flex-row items-center gap-5 select-none shrink-0 pl-6 border-l border-white/10 self-stretch justify-center">
                <div className="flex flex-col gap-3.5 text-right">
                  {["IDEAS", "DESIGN", "TECHNOLOGY", "PEOPLE"].map((label) => (
                    <span
                      key={label}
                      className="text-[10px] font-mono tracking-[0.26em] uppercase text-[#8888A0] hover:text-white transition-colors duration-300"
                    >
                      {label}
                    </span>
                  ))}
                  <div className="flex items-center justify-end gap-1.5 text-[10px] font-mono tracking-[0.26em] uppercase font-semibold text-[#A596FF]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5268FF] shadow-[0_0_8px_#5268FF]" />
                    <span>REAL IMPACT</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 02: STUDIO SNAPSHOT (ARCHITECTURAL METRIC GRID)   */}
      {/* ========================================================= */}
      <section
        id="snapshot"
        className="relative w-full py-20 sm:py-24 px-6 sm:px-10 lg:px-[6.5vw] border-b border-white/[0.08] bg-[#03040A]"
      >
        <div className="max-w-7xl mx-auto">
          {/* Main Structured 4-Panel + Asymmetric Feature Grid */}
          <div className="border border-white/[0.08] bg-[#03040A] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            
            {/* Panel 1: Experience */}
            <div className="snapshot-card relative p-8 sm:p-10 border-b md:border-b lg:border-b-0 border-r border-white/[0.08] bg-[#03040A] hover:bg-[#080912] transition-colors duration-300 flex flex-col justify-between min-h-[220px]">
              <span className="font-mono text-[11px] text-[#7764F8] uppercase tracking-[0.2em] block mb-6">
                01 / EXPERIENCE
              </span>
              <div>
                <h3 className="font-sans text-[24px] sm:text-[27px] font-bold text-white mb-2 leading-tight">
                  Design. Develop. Deploy.
                </h3>
                <p className="text-[13.5px] text-[#9B9AAF] font-light leading-relaxed">
                  End-to-end digital product capabilities from strategy to cloud deployment.
                </p>
              </div>
            </div>

            {/* Panel 2: Our approach */}
            <div className="snapshot-card relative p-8 sm:p-10 border-b lg:border-b-0 border-r border-white/[0.08] bg-[#03040A] hover:bg-[#080912] transition-colors duration-300 flex flex-col justify-between min-h-[220px]">
              <span className="font-mono text-[11px] text-[#7764F8] uppercase tracking-[0.2em] block mb-6">
                02 / OUR APPROACH
              </span>
              <div>
                <h3 className="font-sans text-[24px] sm:text-[27px] font-bold text-white mb-2 leading-tight">
                  Strategy. Design. Engineering.
                </h3>
                <p className="text-[13.5px] text-[#9B9AAF] font-light leading-relaxed">
                  Thoughtful architecture, human-centered UI/UX, and resilient engineering.
                </p>
              </div>
            </div>

            {/* Panel 3: What we build */}
            <div className="snapshot-card relative p-8 sm:p-10 border-b lg:border-b-0 border-white/[0.08] bg-[#03040A] hover:bg-[#080912] transition-colors duration-300 flex flex-col justify-between min-h-[220px]">
              <span className="font-mono text-[11px] text-[#7764F8] uppercase tracking-[0.2em] block mb-6">
                03 / WHAT WE BUILD
              </span>
              <div>
                <h3 className="font-sans text-[24px] sm:text-[27px] font-bold text-white mb-2 leading-tight">
                  Scalable Systems.
                </h3>
                <p className="text-[13.5px] text-[#9B9AAF] font-light leading-relaxed">
                  Websites, mobile apps, AI automation, IoT systems, and immersive 3D experiences.
                </p>
              </div>
            </div>

            {/* Panel 4: Built for */}
            <div className="snapshot-card relative p-8 sm:p-10 border-t md:border-t-0 border-r border-white/[0.08] bg-[#03040A] hover:bg-[#080912] transition-colors duration-300 flex flex-col justify-between min-h-[220px]">
              <span className="font-mono text-[11px] text-[#7764F8] uppercase tracking-[0.2em] block mb-6">
                04 / BUILT FOR
              </span>
              <div>
                <h3 className="font-sans text-[24px] sm:text-[27px] font-bold text-white mb-2 leading-tight">
                  Ambitious Teams.
                </h3>
                <p className="text-[13.5px] text-[#9B9AAF] font-light leading-relaxed">
                  Startups, growing businesses, product teams, and enterprise digital operations.
                </p>
              </div>
            </div>

            {/* Panel 5: Large Asymmetric Feature Panel (Spans 2 columns on lg) */}
            <div className="snapshot-card relative p-8 sm:p-10 border-t md:border-t-0 lg:col-span-2 bg-[#0B0C14] flex flex-col justify-center overflow-hidden min-h-[220px]">
              {/* Subtle architectural concentric arc line aesthetic */}
              <div 
                className="absolute right-[-10%] bottom-[-50%] w-[380px] h-[380px] rounded-full border border-white/[0.06] pointer-events-none" 
              />
              <div 
                className="absolute right-[-5%] bottom-[-40%] w-[300px] h-[300px] rounded-full border border-white/[0.04] pointer-events-none" 
              />

              <div className="relative z-10 max-w-xl">
                <span className="font-mono text-[10.5px] text-[#7764F8] uppercase tracking-[0.22em] block mb-3">
                  CRAFT & DISTINCTION
                </span>
                <p className="font-sans text-[20px] sm:text-[23px] lg:text-[25px] font-normal leading-[1.35] text-[#F5F3FF]">
                  We bring together the perfect blend of deep technical{" "}
                  <span className="text-[#5268FF] font-medium">expertise</span>, beautiful{" "}
                  <span className="text-[#7764F8] font-medium">design</span> and optimised{" "}
                  <span className="text-[#B8A6FF] font-medium">usability</span>.
                </p>
              </div>
            </div>

          </div>

          {/* Narrow Horizontal Audience Strip (Exact Reference Replication) */}
          <div className="border-x border-b border-white/[0.08] bg-[#060710] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 text-center text-[10.5px] font-mono tracking-[0.2em] uppercase text-[#9B9AAF]">
            <div className="py-4 px-3 border-r border-b sm:border-b-0 border-white/[0.08] text-white/50 flex items-center justify-center">
              TRUSTED BY GROWING BUSINESSES
            </div>
            <div className="py-4 px-3 border-r border-b sm:border-b-0 border-white/[0.08] hover:text-white transition-colors flex items-center justify-center">
              Startups & Founders
            </div>
            <div className="py-4 px-3 border-r border-b sm:border-b-0 border-white/[0.08] hover:text-white transition-colors flex items-center justify-center">
              SMBs & Enterprises
            </div>
            <div className="py-4 px-3 border-r border-white/[0.08] hover:text-white transition-colors flex items-center justify-center">
              Product Teams
            </div>
            <div className="py-4 px-3 col-span-2 sm:col-span-1 hover:text-white transition-colors flex items-center justify-center">
              Innovative Businesses
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 03: WHAT WE BUILD (ASYMMETRICAL SERVICE GRID)     */}
      {/* ========================================================= */}
      <section
        id="what-we-build"
        className="relative w-full py-20 sm:py-28 px-6 sm:px-10 lg:px-[6.5vw] border-b border-white/[0.08] bg-[#03040A]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Left Side: Section Marker & Oversized Statement */}
            <div className="lg:col-span-5 flex flex-col items-start lg:sticky lg:top-36">
              <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-[#7764F8] font-semibold block mb-4">
                02 / WHAT WE BUILD
              </span>

              <h2 className="font-sans font-black text-[42px] sm:text-[54px] md:text-[62px] lg:text-[66px] leading-[0.92] tracking-[-0.035em] uppercase text-white">
                <span className="block text-[#F5F3FF]">DIGITAL</span>
                <span className="block text-[#F5F3FF]">SOLUTIONS</span>
                <span className="block text-[#F5F3FF]">FOR A SMARTER</span>
                <span className="block bg-gradient-to-r from-[#5268FF] via-[#7764F8] to-[#B8A6FF] bg-clip-text text-transparent">
                  TOMORROW.
                </span>
              </h2>

              <p className="mt-6 text-[14px] text-[#9B9AAF] font-light leading-relaxed max-w-sm">
                From concept to deployment, we engineer bespoke digital products that combine spatial craft with scalable modern code.
              </p>
            </div>

            {/* Right Side: 6 Structured Service Panels (3x2 Desktop Grid) */}
            <div className="lg:col-span-7">
              <div className="border border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 bg-[#03040A]">
                {services.map((service, index) => (
                  <div
                    key={service.num}
                    className="service-card group relative p-6 sm:p-7 border-b border-r border-white/[0.08] bg-[#0B0C14]/70 hover:bg-[#101019] transition-all duration-300 flex flex-col justify-between min-h-[220px]"
                  >
                    <div>
                      {/* Number Marker */}
                      <span className="font-mono text-[11px] text-[#7764F8] font-semibold block mb-4">
                        {service.num}
                      </span>
                      
                      {/* Service Title */}
                      <h3 className="font-sans text-[16.5px] sm:text-[17px] font-bold text-white mb-2 leading-snug group-hover:text-[#B8A6FF] transition-colors">
                        {service.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-[12.5px] text-[#9B9AAF] font-light leading-relaxed">
                        {service.desc}
                      </p>
                    </div>

                    {/* Arrow Interaction */}
                    <div className="mt-6 pt-3 border-t border-white/[0.04] flex items-center text-[#7764F8] text-[13px] font-medium">
                      <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                        →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 04: WHAT DRIVES US (HORIZONTAL VALUES LAYOUT)     */}
      {/* ========================================================= */}
      <section
        id="values"
        className="relative w-full py-20 sm:py-28 px-6 sm:px-10 lg:px-[6.5vw] border-b border-white/[0.08] bg-[#03040A]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-12">
            
            {/* Left Column: Heading */}
            <div className="lg:col-span-4 flex flex-col items-start">
              <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-[#7764F8] font-semibold block mb-3">
                03 / OUR VALUES
              </span>

              <h2 className="font-sans font-black text-[44px] sm:text-[56px] lg:text-[64px] leading-[0.92] tracking-[-0.035em] uppercase text-white">
                <span className="block text-[#F5F3FF]">WHAT</span>
                <span className="block bg-gradient-to-r from-[#5268FF] via-[#7764F8] to-[#B8A6FF] bg-clip-text text-transparent">
                  DRIVES US
                </span>
              </h2>
            </div>

            {/* Right Area: 4 Values Columns separated by vertical dividers */}
            <div className="lg:col-span-8">
              <div className="border border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 bg-[#03040A]">
                {values.map((val) => (
                  <div
                    key={val.num}
                    className="value-col group relative p-6 sm:p-7 border-b sm:border-b-0 border-r border-white/[0.08] bg-[#03040A] hover:bg-[#090A12] transition-colors duration-300 flex flex-col justify-between min-h-[220px]"
                  >
                    <div>
                      <span className="font-mono text-[11px] text-[#7764F8] font-semibold block mb-4">
                        {val.num}
                      </span>
                      <h3 className="font-sans text-[17px] font-bold text-white mb-2 leading-snug">
                        {val.title}
                      </h3>
                      <p className="text-[12.5px] text-[#9B9AAF] font-light leading-relaxed">
                        {val.desc}
                      </p>
                    </div>

                    <div className="mt-6 w-5 h-[1px] bg-white/20 group-hover:w-10 group-hover:bg-[#5268FF] transition-all duration-300" />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 05: CLOSING STATEMENT & CONTACT                   */}
      {/* ========================================================= */}
      <section
        id="closing"
        className="relative w-full py-24 sm:py-32 px-6 sm:px-10 lg:px-[6.5vw] border-b border-white/[0.08] bg-[#04050D] overflow-hidden"
      >
        {/* Subtle right-edge gravitational vortex light curves */}
        <div 
          className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full blur-[110px] opacity-20 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #7764F8 0%, #5268FF 40%, transparent 70%)",
          }}
        />
        <div 
          className="absolute right-[-5%] top-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full border border-white/[0.05] pointer-events-none"
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Side: Large Closing Headline */}
            <div className="lg:col-span-7 flex flex-col items-start closing-anim">
              <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-[#7764F8] font-semibold block mb-3">
                04 / COLLABORATION
              </span>

              <h2 className="font-sans font-black text-[46px] sm:text-[62px] lg:text-[76px] leading-[0.92] tracking-[-0.038em] uppercase text-white">
                <span className="block text-[#F5F3FF]">LET'S BUILD</span>
                <span className="block bg-gradient-to-r from-[#5268FF] via-[#7764F8] to-[#B8A6FF] bg-clip-text text-transparent">
                  WHAT'S NEXT.
                </span>
              </h2>

              <p className="mt-4 text-[14px] sm:text-[15px] text-[#9B9AAF] font-light max-w-md leading-relaxed">
                A dedicated creative technology studio partnering with founders, enterprises, and ambitious teams worldwide.
              </p>
            </div>

            {/* Right Side: Split Contact Prompt & Dual CTAs */}
            <div className="lg:col-span-5 p-8 sm:p-10 rounded-2xl border border-white/[0.08] bg-[#0A0B14]/80 backdrop-blur-md closing-anim flex flex-col items-start">
              <h3 className="font-sans text-[20px] sm:text-[22px] font-medium text-white mb-3 leading-snug">
                Have an idea, a project, or a challenge?
              </h3>
              
              <p className="text-[13.5px] text-[#9B9AAF] font-light leading-relaxed mb-6">
                We'd love to hear about it and explore how we can work together to turn it into a high-impact digital benchmark.
              </p>

              <div className="flex flex-wrap items-center gap-3 w-full">
                <a
                  href="/#contact"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-[#5268FF] to-[#7764F8] text-white font-sans text-[13px] font-medium tracking-wide hover:shadow-[0_0_24px_rgba(82,104,255,0.4)] transition-all"
                >
                  <span>Start a Conversation</span>
                  <span>→</span>
                </a>

                <a
                  href="/#contact"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-white/20 hover:border-white/50 text-white font-sans text-[13px] font-medium tracking-wide hover:bg-white/[0.05] transition-all"
                >
                  <span>Contact Us</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. MINIMALIST TAVQO FOOTER                                */}
      {/* ========================================================= */}
      <footer className="w-full py-8 px-6 sm:px-10 lg:px-[6.5vw] bg-[#020206] text-white/60 text-[12px] flex flex-col sm:flex-row items-center justify-between gap-4 font-sans">
        <div className="flex items-center gap-3">
          <span className="text-white font-sans font-medium tracking-[0.2em]">TΛVQO</span>
          <span className="text-white/20">|</span>
          <span>© {new Date().getFullYear()} TAVQO Studio. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-6 text-[#8888A0]">
          <a href="/" className="hover:text-white transition-colors">Home</a>
          <a href="/about" className="text-white font-medium transition-colors">About</a>
          <a href="/#services" className="hover:text-white transition-colors">Services</a>
          <a href="/#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
      </footer>
    </div>
  );
}
