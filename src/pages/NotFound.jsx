import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

// ============================================================================
// MAIN 404 COMPONENT
// ============================================================================

export default function NotFound() {
  useEffect(() => {
    document.title = "Page Not Found | TAVQO";
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="relative min-h-screen h-screen max-md:h-auto max-md:min-h-screen w-full bg-[#0B0E17] text-[#F5F4FF] overflow-x-hidden overflow-y-hidden max-md:overflow-y-auto font-sans flex flex-col justify-between selection:bg-[#6852E3] selection:text-white">
      
      {/* ------------------------------------------------------------------ */}
      {/* 1. CINEMATIC TOP-DOWN VIOLET SPOTLIGHT (PIXEL-PERFECT REFERENCE)   */}
      {/* ------------------------------------------------------------------ */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none"
      >
        {/* Intense top beam flare right under the navbar */}
        <div
          className="absolute -top-12 left-1/2 -translate-x-1/2 w-[340px] sm:w-[440px] h-[220px] rounded-full blur-[50px] pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(130, 117, 255, 0.55) 0%, rgba(104, 82, 227, 0.3) 45%, transparent 75%)",
          }}
        />

        {/* Downward conical spotlight beam widening across the 404 area */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] sm:w-[920px] md:w-[1100px] h-[580px] pointer-events-none opacity-85"
          style={{
            background:
              "radial-gradient(ellipse 60% 75% at 50% 12%, rgba(104, 82, 227, 0.32) 0%, rgba(81, 69, 217, 0.16) 40%, rgba(20, 18, 48, 0.05) 70%, transparent 88%)",
          }}
        />

        {/* Subtle theatrical cone flare */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[580px] sm:w-[740px] h-[480px] pointer-events-none blur-[40px] opacity-40"
          style={{
            background: "linear-gradient(180deg, rgba(130, 117, 255, 0.35) 0%, rgba(104, 82, 227, 0.12) 60%, transparent 100%)",
            clipPath: "polygon(36% 0%, 64% 0%, 95% 100%, 5% 100%)",
          }}
        />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 2. PRESERVED EXISTING TAVQO NAVBAR                                 */}
      {/* ------------------------------------------------------------------ */}
      <div className="relative z-30 w-full shrink-0">
        <Navbar currentRoute="404" isRevealed={true} />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 3. CENTERED & BALANCED 404 CONTENT (SLIGHTLY UPWARD, FIT VIEWPORT) */}
      {/* ------------------------------------------------------------------ */}
      <main className="relative flex-1 w-full max-w-4xl mx-auto flex flex-col items-center justify-center px-6 pt-16 sm:pt-20 pb-16 sm:pb-20 text-center z-10 my-auto -translate-y-2 sm:-translate-y-4 md:-translate-y-6">
        
        {/* Subtle, restrained entrance animation */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center w-full"
        >
          {/* 404 Numerals (+35–45% Larger, Primary Visual Element, Clean & Outlined) */}
          <div className="relative select-none flex items-center justify-center bg-transparent mb-1 sm:mb-2">
            {/* Subtle Halftone Dot Orb in the center '0' as in reference screenshot */}
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[130px] sm:w-[160px] h-[130px] sm:h-[160px] pointer-events-none opacity-25 select-none z-0"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <pattern id="dot-matrix-404" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                    <circle cx="5" cy="5" r="1.5" fill="#A594FF" />
                  </pattern>
                  <radialGradient id="dot-mask" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#fff" stopOpacity="1" />
                    <stop offset="70%" stopColor="#fff" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                  </radialGradient>
                  <mask id="sphere-mask">
                    <rect width="100" height="100" fill="url(#dot-mask)" />
                  </mask>
                </defs>
                <circle cx="50" cy="50" r="46" fill="url(#dot-matrix-404)" mask="url(#sphere-mask)" />
              </svg>
            </div>

            <span
              className="relative z-10 text-[132px] sm:text-[158px] md:text-[182px] lg:text-[198px] xl:text-[208px] font-sans font-normal leading-[0.9] tracking-[-0.04em] block bg-transparent"
              style={{
                color: "transparent",
                backgroundImage:
                  "linear-gradient(180deg, rgba(190, 175, 255, 0.28) 0%, rgba(110, 85, 245, 0.06) 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextStroke: "1px rgba(165, 148, 255, 0.45)",
                textShadow: "0 0 32px rgba(120, 95, 255, 0.24)",
              }}
            >
              404
            </span>
          </div>

          {/* "Page Not Found" — Strong Visual Presence */}
          <h1 className="font-sans font-semibold text-3xl sm:text-4xl md:text-[42px] lg:text-[46px] text-white tracking-[-0.03em] leading-tight mt-1 sm:mt-2 mb-3 sm:mb-3.5 select-none">
            Page Not Found
          </h1>

          {/* Supporting Description — Readable line height, comfortable width */}
          <p className="font-sans text-[14.5px] sm:text-[15.5px] md:text-[16px] text-[#94A3B8] leading-[1.65] max-w-[440px] mb-6 sm:mb-7 font-normal">
            It seems the page you&apos;re looking for doesn&apos;t exist. Let&apos;s get
            you back on track.
          </p>

          {/* Action Buttons: Primary Violet CTA & Secondary Dark Slate CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
            {/* Primary Action Button */}
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center h-[42px] px-6 rounded-lg bg-[#6852E3] hover:bg-[#5B45D6] text-white font-sans text-[13.5px] sm:text-sm font-medium tracking-normal transition-all duration-200 shadow-[0_2px_14px_rgba(104,82,227,0.35)] hover:shadow-[0_4px_20px_rgba(104,82,227,0.5)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              Return to Homepage
            </Link>

            {/* Secondary Action Button */}
            <Link
              to="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center h-[42px] px-6 rounded-lg bg-[#1E2028] hover:bg-[#282B36] border border-white/[0.08] hover:border-white/20 text-[#D1D5DB] hover:text-white font-sans text-[13.5px] sm:text-sm font-medium tracking-normal transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              Explore Features
            </Link>
          </div>
        </motion.div>

      </main>

    </div>
  );
}
